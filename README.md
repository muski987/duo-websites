# DUO website

Source for [duowebsites.in](https://duowebsites.in), the site of DUO, a web design and development studio in Mumbai.

## Stack
- Plain HTML, CSS and JavaScript. There is no framework and no build step.
- Animation with [GSAP](https://gsap.com) 3.13 and ScrollTrigger, served from `assets/vendor/`.
- Self-hosted fonts (Montserrat and Instrument Sans) in `assets/fonts/`.
- Hosted on Vercel. `vercel.json` sets clean URLs, cache headers and security headers.

## Structure
```
index.html            Home page: work, services, process, studio, FAQ, contact
work/*.html           One case study page per project
404.html
assets/css/style.css  All styles (colours are tokens under :root)
assets/js/main.js     Motion and video behaviour
assets/img/, assets/video/
sitemap.xml, robots.txt
```

## Run locally
```
npm run dev
```
Then open http://localhost:3000. Paths start with `/`, so open the site through a local server, not by double-clicking `index.html`.

## Caching
CSS, JS, fonts, images and videos are cached for a long time. When you change `style.css` or `main.js`, bump the `?v=` number on every HTML page. When you replace an image or video, give it a new file name or a `?v=`.

## Credits
Fonts: Montserrat and Instrument Sans, SIL Open Font License. GSAP 3.13 under its standard free licence.

© DUO. All rights reserved. Client logos and project recordings belong to their owners and are shown with permission.
