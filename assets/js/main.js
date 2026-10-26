// DUO · main.js
// Every motion comes from the logo: the gold line draws, the DUO letters rise,
// and the line is what fills while the site loads and moves you between pages.

(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  setupMenu();
  setupActiveNav();
  setupNavBackground();
  mumbaiClock();
  cursorPreview();

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    // No autoplaying video for people who asked for less motion; the poster frame stays.
    document.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  }
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  var ease = 'power3.out';

  var arrivedByWipe = setupPageWipe();

  var hero = document.querySelector('.hero');
  if (hero) {
    // The scroll scene is set up first so the pin spacing exists before any #anchor jump.
    heroScrollScene();
    playIntro(function () {});
  } else {
    gsap.set('.nav', { opacity: 1 });
  }

  // Headings: each line rises out of its mask.
  gsap.utils.toArray('.line > span').forEach(function (el) {
    gsap.to(el, {
      y: 0,
      yPercent: 0,
      duration: 1.1,
      ease: ease,
      scrollTrigger: { trigger: el.parentNode, start: 'top 88%', once: true }
    });
  });

  // The gold line draws under each section heading.
  gsap.utils.toArray('.rule:not(.hero__rule):not(.next__rule):not(.contact__rule)').forEach(function (el) {
    gsap.to(el, {
      scaleX: 1,
      duration: 0.9,
      delay: 0.3,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // The contact line is tied to scroll.
  if (document.querySelector('.contact__rule')) {
    gsap.to('.contact__rule', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.contact__rule', start: 'top 95%', end: 'top 55%', scrub: 0.6 }
    });
  }

  // Case study recordings: a gold line runs across the bottom, then rises and opens the frame.
  gsap.utils.toArray('.case-media .project__media, .shot .project__media').forEach(function (media) {
    var line = document.createElement('span');
    line.className = 'media-line';
    line.setAttribute('aria-hidden', 'true');
    media.appendChild(line);
    gsap.set(line, { y: function () { return media.offsetHeight - 3; }, scaleX: 0 });
    gsap.timeline({ scrollTrigger: { trigger: media, start: 'top 98%', once: true } })
      .to(line, { scaleX: 1, duration: 0.35, ease: 'power2.inOut' })
      .fromTo(media, { clipPath: 'inset(99.5% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power3.inOut' })
      .to(line, { y: 0, duration: 0.85, ease: 'power3.inOut' }, '<')
      .to(line, { opacity: 0, duration: 0.3 });
  });

  // Case pages: the phone rises a little faster than the page, so it sits in front of the browser.
  gsap.utils.toArray('.case-devices .phone').forEach(function (phone) {
    gsap.fromTo(phone, { y: 70 }, {
      y: -30,
      ease: 'none',
      scrollTrigger: { trigger: phone.parentNode, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  workList();
  processSteps();

  // Service rows slide in one after another. Only movement, never hidden: the text stays
  // readable even if the reveal never runs (full-page captures, or no scroll yet).
  gsap.utils.toArray('.service').forEach(function (row) {
    gsap.from(row.children, {
      y: 30,
      duration: 0.9,
      stagger: 0.1,
      ease: ease,
      scrollTrigger: { trigger: row, start: 'top 88%', once: true }
    });
  });

  // Fonts change line heights, so measure again once they are in.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  // ---------------------------------------------------------------------------

  // Opening: DUO types itself letter by letter over a gold underline that fills as the page loads,
  // then the cover lifts and the hero letters rise. Repeat visits skip straight to the hero.
  function playIntro(done) {
    var heroIn = function (delay) {
      return gsap.timeline({ defaults: { ease: ease }, onComplete: done, delay: delay || 0 })
        .to('.hero__letter', { y: 0, yPercent: 0, duration: 1, stagger: 0.08 })
        .to('.hero__rule', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.5')
        .to(['.hero__tag', '.hero__label', '.hero__foot', '.nav'], { opacity: 1, duration: 0.6, stagger: 0.05 }, '-=0.3');
    };

    var seen = false;
    try { seen = sessionStorage.getItem('duo-intro') === '1'; sessionStorage.setItem('duo-intro', '1'); } catch (e) {}
    // Phones skip the typed DUO loader so the agency line shows straight away.
    var phone = window.matchMedia('(max-width: 820px)').matches;
    if (seen || arrivedByWipe || phone || window.scrollY > 40) {
      heroIn(arrivedByWipe ? 0.35 : 0);
      return;
    }

    var loader = document.createElement('div');
    loader.className = 'loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML =
      '<div class="loader__inner">' +
        '<div class="loader__word"><span>D</span><span>U</span><span>O</span></div>' +
        '<div class="loader__track"><span class="loader__fill"></span></div>' +
      '</div>';
    document.body.appendChild(loader);
    document.documentElement.style.overflow = 'hidden';

    var letters = loader.querySelectorAll('.loader__word span');
    var fill = loader.querySelector('.loader__fill');
    var loaded = document.readyState === 'complete';
    window.addEventListener('load', function () { loaded = true; });

    var tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    letters.forEach(function (l, i) {
      tl.set(l, { opacity: 1 }, 0.35 + i * 0.32)
        .to(fill, { scaleX: (i + 1) / 3 * 0.86, duration: 0.3 }, 0.35 + i * 0.32);
    });
    tl.addLabel('typed', '+=0.1');

    // Hold on the last letter until the page has loaded (never longer than 2.5 s), then finish the line.
    var waited = 0;
    tl.call(function check() {
      if (loaded || waited >= 2.5) return finish();
      tl.pause();
      waited += 0.1;
      gsap.delayedCall(0.1, check);
    }, null, 'typed');

    function finish() {
      gsap.timeline({
        onComplete: function () {
          loader.remove();
          document.documentElement.style.overflow = '';
        }
      })
        .to(fill, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' })
        .to(loader.querySelector('.loader__inner'), { yPercent: -40, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .to(loader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.2')
        .add(function () { heroIn(); }, '-=0.45');
    }
  }

  // Scrolling away from the hero: D and O slide off the sides, U sinks and fades,
  // the gold line stretches across, and the founders' photo/video comes up behind.
  function heroScrollScene() {
    var heroEl = document.querySelector('.hero');
    var clips = gsap.utils.toArray('.hero__clip');
    var rule = document.querySelector('.hero__rule');
    var base = document.querySelector('.hero__base');
    var media = document.querySelector('.hero__media');
    var caption = document.querySelector('.hero__caption');
    var small = window.matchMedia('(max-width: 820px)').matches;

    // The video only downloads and plays once the letters start moving away.
    var video = media && media.querySelector('video');
    var heroOnScreen = true;
    var lastProgress = 0;
    function syncVideo(self) {
      if (!video) return;
      if (self) lastProgress = self.progress;
      var visible = lastProgress > 0.2 && heroOnScreen;
      if (visible && video.paused) video.play().catch(function () {});
      if (!visible && !video.paused) video.pause();
    }
    if (video && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        heroOnScreen = entries[0].isIntersecting;
        syncVideo();
      }).observe(heroEl);
    }

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: heroEl,
        start: 'top top',
        end: small ? '+=110%' : '+=160%',
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: syncVideo
      }
    });

    tl.to(clips[0], { x: function () { return -(clips[0].offsetLeft + clips[0].offsetWidth + 40); }, ease: 'power2.in', duration: 1 }, 0)
      .to(clips[2], { x: function () { return heroEl.offsetWidth - clips[2].offsetLeft + 40; }, ease: 'power2.in', duration: 1 }, 0)
      .to(clips[1], { yPercent: 70, opacity: 0, ease: 'power1.in', duration: 1 }, 0)
      .fromTo(rule, { scaleX: 1 }, { scaleX: function () { return base.offsetWidth / rule.offsetWidth; }, duration: 0.8, immediateRender: false }, 0)
      .fromTo('.hero__tag', { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, 0)
      .fromTo(['.hero__label', '.hero__foot'], { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 0.5, immediateRender: false }, 0);

    if (media) {
      tl.fromTo(media, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power1.out', immediateRender: false }, 0.5)
        .to(rule, { opacity: 0, duration: 0.3 }, 1.1);
    }
    if (caption) {
      tl.fromTo(caption, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, immediateRender: false }, 1.15);
    }
  }

  // Work: the five projects stack down the page. Each card loads and plays its site recording
  // while it is on screen; until then it shows the client's logo.
  function workList() {
    var items = document.querySelectorAll('.reel__item');
    if (!items.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var item = entry.target;
        var video = item.querySelector('video.reel__video');
        if (!video) return;
        if (entry.isIntersecting) {
          if (!video.getAttribute('src')) video.src = video.dataset.src;
          video.play().then(function () { item.classList.add('is-playing'); }).catch(function () {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    items.forEach(function (item) { io.observe(item); });
  }

  // Process: a gold line runs through the five steps and lights each one as it passes.
  // On desktop the section holds the screen for one scroll's length; on a phone the line runs down.
  function processSteps() {
    var box = document.querySelector('.steps');
    if (!box) return;
    var section = box.closest('.process');
    var steps = box.querySelectorAll('.step');
    var fill = box.querySelector('.steps__fill');
    box.classList.add('is-live');

    function light(p) {
      steps.forEach(function (s, i) { s.classList.toggle('is-on', p >= i / steps.length + 0.02); });
    }

    var mm = gsap.matchMedia();
    mm.add('(min-width: 821px)', function () {
      section.classList.add('is-pinned');
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=90%',
        pin: true,
        scrub: 0.6,
        onUpdate: function (self) {
          gsap.set(fill, { scaleX: self.progress });
          light(self.progress);
        }
      });
      return function () { section.classList.remove('is-pinned'); };
    });
    mm.add('(max-width: 820px)', function () {
      ScrollTrigger.create({
        trigger: box,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: 0.6,
        onUpdate: function (self) {
          gsap.set(fill, { scaleY: self.progress });
          light(self.progress);
        }
      });
    });
  }

  // Local time in Mumbai, so a client abroad sees our time of day at a glance.
  function mumbaiClock() {
    var clocks = document.querySelectorAll('.clock');
    if (!clocks.length) return;
    var format = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' });
    function tick() {
      var now = format.format(new Date());
      clocks.forEach(function (c) { c.textContent = now; });
    }
    tick();
    setInterval(tick, 15000);
  }

  // Brand logos: on a desktop pointer, the site's recording follows the cursor while you hover.
  function cursorPreview() {
    var links = document.querySelectorAll('[data-preview]');
    if (!links.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var box = document.createElement('div');
    box.className = 'preview';
    box.setAttribute('aria-hidden', 'true');
    var video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    box.appendChild(video);
    document.body.appendChild(box);
    var x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    function follow() {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      box.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(follow) : 0;
    }
    links.forEach(function (link) {
      link.addEventListener('mouseenter', function (e) {
        var src = link.getAttribute('data-preview');
        if (video.getAttribute('src') !== src) video.setAttribute('src', src);
        video.play().catch(function () {});
        if (!box.classList.contains('is-on')) { cx = x = e.clientX; cy = y = e.clientY; follow(); }
        box.classList.add('is-on');
      });
      link.addEventListener('mouseleave', function () {
        box.classList.remove('is-on');
        video.pause();
      });
    });
    window.addEventListener('mousemove', function (e) {
      x = e.clientX;
      y = e.clientY;
      if (!raf && box.classList.contains('is-on')) raf = requestAnimationFrame(follow);
    });
  }

  // Moving between pages: an ink panel with a gold edge sweeps up over the page,
  // and the next page starts covered and sweeps it away.
  function setupPageWipe() {
    var wipe = document.createElement('div');
    wipe.className = 'wipe';
    wipe.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wipe);

    var arriving = false;
    try { arriving = sessionStorage.getItem('duo-wipe') === '1'; sessionStorage.removeItem('duo-wipe'); } catch (e) {}

    if (arriving) {
      gsap.set(wipe, { yPercent: 0 });
      gsap.to(wipe, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.1 });
    } else {
      gsap.set(wipe, { yPercent: 100 });
    }
    // The head script covers the page until this panel exists.
    document.documentElement.classList.remove('is-wiping');

    // Coming back with the browser's back button can restore a covered page.
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) gsap.set(wipe, { yPercent: 100 });
    });

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      e.preventDefault();
      try { sessionStorage.setItem('duo-wipe', '1'); } catch (err) {}
      gsap.fromTo(wipe, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: function () { location.href = url.href; }
      });
    });

    return arriving;
  }
})();

function setupMenu() {
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('a').focus();
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
}

// Underline the nav link of the section on screen.
function setupActiveNav() {
  var links = document.querySelectorAll('.nav__links a');
  if (!('IntersectionObserver' in window) || !links.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + entry.target.id));
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
}

// The nav gets a solid background once the page moves, so content never shows through behind it.
function setupNavBackground() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function update() { nav.classList.toggle('is-solid', window.scrollY > 40); }
  update();
  window.addEventListener('scroll', update, { passive: true });
}
