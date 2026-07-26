# Rad Refcalculators

A mobile-friendly React + TypeScript starter for radiology calculators including TI-RADS, LI-RADS, and O-RADS.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Git setup

This repository includes:

- `.gitignore` for Node, Vite, TypeScript, and editor clutter
- `.gitattributes` for consistent line endings
- `PUSH_CHECKLIST.md` with GitHub and Cloudflare Pages steps

## Cloudflare Pages deployment

Use Cloudflare Pages with these settings:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: `None` or React/Vite if offered

This project includes a `public/_redirects` file with:

```text
/* /index.html 200
```

That rewrite allows direct visits to routes like `/tirads`, `/lirads`, and `/orads` in a single-page app.

## Notes

- Static site, no backend required
- Good fit for free, low-volume hosting
- Copy buttons use the Clipboard API with browser fallback logic
