# CLAUDE.md

## Project

Rad Refcalculators is a mobile-friendly React + TypeScript reference site for radiology calculators, including TI-RADS, LI-RADS, and O-RADS.

## Stack

- Vite
- React
- TypeScript
- Static asset deployment on Cloudflare

## Local commands

```bash
npm install
npm run dev
npm run build
```

## Development workflow

Do not start the dev server or a browser to visually test/verify every change. Rely on `npm run build` (type-check) and code review instead. Only launch the dev server and check in a browser when explicitly asked to.

## Offline / PWA

The site is a PWA via `vite-plugin-pwa` (configured in `vite.config.ts`), so it can be installed to a phone home screen and used with no network connection after the first visit.

- Service worker precaches all built assets (`registerType: 'autoUpdate'`) and falls back to `index.html` for client-side routes when offline.
- Manifest icons live in `public/` (`pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `favicon-48.png`) and are generated from the "RR" logo mark (`public/logo-mark.png`, transparent cutout; `public/logo-mark-header.png`, the in-header raster). Regenerate all of them together if the logo changes, keeping the maskable icon's content inside the safe zone (~50% of canvas, since it also carries background padding).
- No backend calls exist anywhere in the app, so full offline precaching is safe with no stale-data concerns.

## Deployment notes

This project currently deploys through Cloudflare using Wrangler-based static assets rather than classic Cloudflare Pages-only redirects. For SPA routing in this deployment mode, rely on Wrangler static asset SPA handling instead of a Pages-style `_redirects` rewrite rule.[cite:221][cite:225][cite:226]

### Important routing rule

Do **not** keep a `public/_redirects` file with:

```text
/* /index.html 200
```

In a Wrangler static-assets deployment, that rule can be rejected as an infinite loop, while `assets.not_found_handling = "single-page-application"` already provides the SPA fallback behavior needed for React routes.[cite:221]

### Preferred deployment behavior

- Build command: `npm run build`[cite:211]
- Output directory: `dist`[cite:211]
- GitHub-connected deploys are supported by Cloudflare Pages and Cloudflare Git integration.[cite:178][cite:182][cite:188]
- Custom domains are configured in the Cloudflare project dashboard under **Custom domains**.[cite:170]

## Git workflow

Initial push of an existing local project to GitHub can follow the standard sequence below.[cite:179]

```bash
git init -b main
git add .
git commit -m "Initial commit: radiology calculator site"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

Routine updates:

```bash
git add .
git commit -m "Update calculators"
git push
```

## Files to keep out of Git

Typical ignored files for this project include:

- `node_modules/`
- `dist/`
- `.env*`
- editor folders like `.vscode/` and `.idea/`
- `*.tsbuildinfo`

## Product direction

The intended use is fast, phone-friendly access to radiology decision support and report-ready text generation. Prefer:

- large touch targets
- sticky or visible result panels on mobile
- copyable impression text
- guideline-based logic for each calculator
- lightweight static hosting with minimal operational overhead

## Current calculators

- TI-RADS
- LI-RADS
- O-RADS
- Incidental findings (adrenal, pancreatic cyst, renal mass)
- Lung-RADS
- Bosniak 2019
- Pancreatic cyst surveillance
- MELD (MELD 3.0 default, MELD-Na option)
- Vascular diameter reference (quick-reference table, not a calculator)
- Adrenal washout (APW/RPW calculator)
- PE-RADS v2026 (published July 2026 — revisit as the framework matures)
- Ellipsoid volume (shape-factor selectable, optional PSA density)
- Carotid stenosis (NASCET, with ECST equivalent)
- Adrenal chemical shift (signal intensity index, adrenal-to-spleen ratio)
- Doppler indices (RI, PI, S/D ratio)
- Periprocedural anticoagulation for IR (SIR 2019 consensus, hold/restart by bleeding risk)

## Next development priorities

- tighten edge-case rule completeness
- add more radiology calculators and quick references
- maintain a consistent report-output UX across calculators
- keep deployment simple and free for low-volume use
