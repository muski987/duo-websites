# PROJECT.md · DUO website

## Brief
DUO's own portfolio, rebuilt from scratch in Oct 2026. It is aimed at clients paying $2,000–3,000, in Mumbai and abroad.
Domain: https://duowebsites.in (deploy there when the site is finished). Old site (reference only): https://duo-websites.vercel.app/

## Design direction (approved 2026-10-23)
Doc: https://claude.ai/artifact/AUigbGZauD9jRXcLb3XDaq
- Idea: the gold underline from the DUO logo appears in the hero, the nav, the headings, the process line and contact.
- Colours: #121212 / #F5F3EF / #8A8A85 / gold #DEB075 (taken from the logo).
- Type: Montserrat ExtraBold (display, labels) and Instrument Sans (body), both self-hosted.
- Motion (v1.2, Keshav asked for richer homepage animation on 2026-10-23):
  - Intro: the logo builds in the centre (line, letters, tagline), then the wordmark flies into the hero. Shortened on repeat visits.
  - Hero scroll: D, U and O drift apart and the gold line stretches across the page (pinned on desktop).
  - Screenshots: a gold line draws along the bottom, then rises and opens the image.
  - Process and contact lines draw as you scroll.
  - Page wipe: an ink panel with a gold edge between pages.
  - Everything is off under prefers-reduced-motion.
- Honesty: no team-size claims, no invented projects or stats.

## Stack
Static HTML/CSS/JS with GSAP and ScrollTrigger (local files), deployed on Vercel (Keshav's account).

## Open items
- [x] Client logos added as white knock-outs (assets/img/clients/). The originals are kept in project files under brand/client-logos-original/.
- [ ] Screen recordings of each project go in `raw-media/` (gitignored). They'll be cut into the hero montage and the case study videos.
- [x] Hero reveal video (v1.6): `assets/video/studio.mp4`, a black-and-white loop (1.3 MB) of 4 Pexels stock mood clips only (5473806, 13522169, 7581246, 14157413), with 0.8 s crossfades. Project recordings are shown only in the Work section and the case studies. Caption: "Design & development / Mumbai, India · working worldwide".
- [x] v1.6: the nav turns solid after scrolling, the work media reveal starts earlier, and better frames were picked for all work images.
- [x] v1.7: the Work section panels show each client's white logo (assets/img/clients) instead of a screenshot; the small logo above each project name was removed so it isn't shown twice. Contact has a "Fill the project form" button linking to the Google Form https://forms.gle/XCRPEVhUxZXFAvqr5.
- [x] v1.8: Keshav wants client logos in their original colours, never white or transparent. Work panels and case-study headers now use `assets/img/brands/{slug}.jpg` (cropped originals) on each logo's own background colour (`--brand-bg`). `assets/img/clients/*.png` (white knock-outs) are no longer used.
- [x] v2.0 (from Keshav's reference reels, 2026-10-23): opening loader types DUO over a filling gold underline (ref: AMBER site). Work is a curved 3D carousel (`.reel`, ref: Ciro Energy cans) where the front card plays the site recording and side cards show original logos, with a brand-colour glow; arrows, keys, drag. Process is pinned sideways "chapters" 01–05 with an index and gold progress line (ref: KAGE scroll; only the scroll style, not the 3D look). Both fall back to plain lists without JS or with reduced motion.
- [x] v2.1 hero video: `assets/video/hero-reel.mp4`, the "Need a website? / Portfolio / E-commerce / SaaS / Agency / Everything" reel (owner OK per Keshav), cut to 11.5 s without the ITDAX ending, cursor blurred out, shown in colour. Source is a 490px screen recording (copy in project files raw-media), so it is soft on big screens; swap in the original download when Keshav has it. The red stripe mark on the laptop screen in the reel may be the source brand's.
- [x] v3.0 (2026-10-23): Keshav picked the light cream theme from mockup B. Colours are swapped in `:root` (`--ink` is now the cream page #f3efe7, `--paper` the near-black type, gold darkened to #b9874a for contrast). Nav has links left, DUO centred, "Mumbai · Worldwide" and a pill button to the Google Form on the right. Pill buttons, rounded media, and a "Brands we've built for" logo strip after Work. All v2 motion kept.
- [x] v3.1 (2026-10-23): placeholders filled from the live sites (growmedex.com, hookmgmt.in, cityrental.vercel.app, titanstudios.vercel.app); years set to 2026 from their footers. Work order is now City Rental, Titan Studios, Hook Media Management, GrowMedex. "Upcoming" shows two unnamed clothing brands (names and demos private until launch).
- [x] v3.5 (2026-10-23): hero reel AI-upscaled 4x (Real-ESRGAN general x4v3) from the 490px screen recording, encoded at 1600x1362, crf 21. Video and poster URLs now carry ?v= too. v3.2–v3.4: case media reveal restored, compact type, centred loader.
- [x] v3.6 (2026-10-23, approved by Keshav after the review): process is one pinned screen (gold line lights 5 steps; vertical on phone); founders show photos (assets/img/team/muskan.jpg, sai.jpg; B&W, colour on hover); "Start a project" row after Work; upcoming cards animate; brand logos link to case studies with a cursor video preview on desktop; nav shows live Mumbai time; side reel cards show one card per side with the logo in the visible strip; brand strip uses *-strip.jpg copies on pure white so multiply hides the box; case pages put the second view in a browser frame. Hero reel stays as is and no packages (Keshav's call).
- [x] SEO (2026-10-23): titles and descriptions rewritten per page; robots meta, canonical, full Open Graph + Twitter tags with per-page 1200x630 share images (assets/img/og.png, og-{slug}.jpg, light theme); JSON-LD (home: ProfessionalService with founders, services, Mumbai address, Instagram, plus WebSite; case pages: CreativeWork + BreadcrumbList); hero h1 carries hidden text "DUO, web design and development studio in Mumbai"; internal links use clean /work/{slug} URLs (no .html redirects); sitemap.xml + robots.txt Sitemap line; .vercelignore keeps mock/, raw-media/, PROJECT.md, README.md off the live site; vercel.json adds trailingSlash false and a 1-day image cache. After deploy: verify duowebsites.in in Google Search Console (Domain property, DNS TXT), submit sitemap.xml, set www to redirect to the apex domain in Vercel, and create a Google Business Profile only if Keshav wants it (needs a real address or service-area setup).
- [x] v3.7 (2026-10-26): fifth project "Hook Creator Collabs" (internal CRM for Hook). Reel card 05/05 with a crossfade screen reel (assets/video/hook-creator-collabs.mp4) and case page work/hook-creator-collabs.html: problem, solution, captioned screenshot gallery (.shots, WebP + JPG at 800/1600 in assets/img/work/hook-creator-collabs/), features, stack, outcome. No live app or repo links (private tool): status reads "Internal tool — demo on request". Screenshots were cropped to remove the browser bar (it showed the app URL) and the taskbar, and personal emails/usernames are blurred. Next-project chain: GrowMedex -> Hook Creator Collabs -> City Rental.
- [ ] Phone frames on case pages: CSS and JS are ready (add `has-phone` to `.case-devices` and a `<div class="phone"><img ...></div>`), but `assets/img/work/*-mobile.jpg` are still placeholders. Needs real 390px-wide phone screenshots of each client site (the live sites are blocked from the build environment).
- [ ] Unused files `assets/img/work/*-mobile.jpg` can be deleted. Was: `assets/img/studio.jpg` placeholder. Needed: a landscape photo or 6–10 s video of Muskan and Sai at work. It's shown black and white automatically. For video, see the comment in index.html (MP4 under 4 MB, no audio).
- [x] Real screenshots and recordings for all 4 projects (v1.5). They're cut from Keshav's screen recordings and the browser bar/taskbar is cropped. The GrowMedex drug-search part is left out on purpose.
- [ ] GrowMedex: one-line description and year
- [ ] Hook Media Management: industry, description and year
- [ ] Permission from GrowMedex and Hook Media Management to show their work
- [ ] Confirm the domain (duowebsites.com?), then update canonical and og:url in index.html
- [ ] Confirm the services list
- [x] Case-study pages built (work/*.html). They still need brief, direction, features, year and 2 more screenshots each (inner page 1600×1000, phone 780×1600)
- [ ] Optional: "Studio concepts" (self-initiated work, clearly labelled)
