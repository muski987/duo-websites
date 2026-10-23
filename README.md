# DUO website

Static site: plain HTML, CSS and JS, with GSAP for animation. There is no build step.

## Run locally
In the VS Code terminal, inside this folder:

    npm run dev

Then open http://localhost:3000. There's nothing to install first, because the site has no build step. You can also use the **Live Server** extension. Don't open `index.html` by double-clicking it, because the paths start with `/` and need a server.

## Edit
- Text and projects: `index.html`
- Styles and colours: `assets/css/style.css` (colours are at the top, under `:root`)
- Animations: `assets/js/main.js`
- Project screenshots: replace the files in `assets/img/work/`, keeping the same names, at 1600×1000 JPG under 250 KB

After changing CSS or JS, bump the `?v=1.1.0` number in every HTML file (for example to `1.1.1`) so visitors don't get the old cached file.

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. In Vercel, choose New Project, import the repo, set Framework to "Other", and leave the build command empty.
3. Add the custom domain under Settings → Domains.

## Credits
Fonts: Montserrat and Instrument Sans, SIL Open Font License (see `assets/fonts/`). GSAP 3.13 (free licence).
