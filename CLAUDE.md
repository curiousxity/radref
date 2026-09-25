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
npm test
```

## Tests

`npm test` runs vitest (`vitest.config.ts`, kept apart from `vite.config.ts` so the PWA
plugin is not loaded). Tests live next to what they test as `*.test.ts` and pin the
clinical rules: each study's thresholds at their boundaries and each calculator's
categories, with a comment quoting the lesson or guideline sentence each case comes
from. The deploy workflow runs `npm test` before building, so a changed threshold fails
the deploy rather than reaching the site.

- Study tests go through `src/study/testing.ts`: `studyOf(Page)` gets the definition,
  `report(study, values)` gives exactly what the Report tab shows (hidden-field answers
  dropped, "not stated" warnings added, via `computeReport` in `src/study/report.ts`),
  and `chips(study, stepId, values)` gives a step's rule chips. `RectalMriStudy.test.ts`
  is the model to copy.
- A change to a rule should change a test in the same commit. If a test has to change,
  say in the commit why the old expectation was wrong.

## Development workflow

Do not start the dev server or a browser to visually test/verify every change. Rely on `npm run build` (type-check) and code review instead. Only launch the dev server and check in a browser when explicitly asked to.

## Typography

The display face is Source Serif 4 (variable, weights 200-900), self-hosted at
`public/fonts/source-serif-4-latin-wght-normal.woff2` with its licence alongside
it. It is vendored rather than pulled from Google Fonts so the PWA keeps working
with no network; `woff2` is in the Workbox `globPatterns` so the file is
precached. Only the latin subset ships (~50 KB) - add another subset file and a
matching `@font-face` in `src/styles.css` if non-latin text is ever needed.
Body and UI text stay on the system sans stack, labels and data on the system
mono stack.

## Colour

The palette follows the "RR" logo's teal. The tokens are on `:root` in
`src/styles.css`: `--color-primary` #0e6b63 (the logo's teal), `--color-primary-dark`,
`--color-primary-soft`, and `--color-accent` #13887a (focus rings and callout rules;
it keeps 3:1 against the page background). The site is light-only. The manifest's
`theme_color` and `background_color` and the `theme-color` meta in `index.html` are
set to `--color-bg` (#eef0f1), so the phone status bar and splash screen blend with the
sticky header. If the palette changes, change all of these together, and redraw the
icons if the logo changes.

## Offline / PWA

The site is a PWA via `vite-plugin-pwa` (configured in `vite.config.ts`), so it can be installed to a phone home screen and used with no network connection after the first visit.

- Service worker precaches all built assets (`registerType: 'autoUpdate'`) and falls back to `index.html` for client-side routes when offline.
- Each calculator page is a separate chunk, loaded on first navigation to its route (`lazyPage` in `src/data/calculators.ts`). The Workbox `globPatterns` include `**/*.js`, so every chunk is precached and offline navigation still works.
- Manifest icons live in `public/` (`pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `favicon-48.png`) and are generated from the "RR" logo mark (`public/logo-mark.png`, transparent cutout; `public/logo-mark-header.png`, the in-header raster). Regenerate all of them together if the logo changes, keeping the maskable icon's content inside the safe zone (~50% of canvas, since it also carries background padding).
- No backend calls exist anywhere in the app, so full offline precaching is safe with no stale-data concerns.
- `navigateFallbackDenylist: [/^\/anatomy\//]` is required in the Workbox config. An
  iframe load counts as a navigation, so without it the service worker answers the
  anatomy frame's request with the React shell and the viewer renders the whole app
  inside itself. Any future standalone HTML page needs the same treatment.

## Deployment notes

This project currently deploys through Cloudflare using Wrangler-based static assets rather than classic Cloudflare Pages-only redirects. For SPA routing in this deployment mode, rely on Wrangler static asset SPA handling instead of a Pages-style `_redirects` rewrite rule.[cite:221][cite:225][cite:226]

### Important routing rule

Do **not** keep a `public/_redirects` file with:

```text
/* /index.html 200
```

In a Wrangler static-assets deployment, that rule can be rejected as an infinite loop, while `assets.not_found_handling = "single-page-application"` already provides the SPA fallback behavior needed for React routes.[cite:221]

### How it actually deploys

Live at <https://radref.hash.immo>. Pushing to `main` triggers
`.github/workflows/deploy.yml`, which lints, runs `npm test` and `npm run build`, and
publishes with Wrangler. `npx wrangler deploy` does the same by hand.

- Build command: `npm run build`
- Output directory: `dist`
- The custom domain is declared as a `[[routes]]` block in `wrangler.toml`, not
  set in the dashboard, so it is version-controlled and any deploy recreates
  it.
- `workers.dev` and preview URLs are off, so the custom domain is the only way
  in.

See `PUSH_CHECKLIST.md` for the required repository secrets and post-deploy
checks.

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
- Fleischner 2017 (incidental pulmonary nodule follow-up; Lung-RADS covers screening LDCT)
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
- Simple adnexal cyst follow-up (SRU 2019 consensus, size bands and report wording)
- PI-RADS v2.1 (zonal assessment, single lesion; logic shared in `src/logic/pirads.ts`)
- AAST 2018 organ injury grading (spleen, liver, kidney)
- Early pregnancy loss (SRU criteria, diagnostic versus suspicious findings)
- Contrast reactions (severity triage, bedside actions, chart text)
- Contrast premedication (oral and accelerated IV regimens)
- Contrast extravasation (triage, surgical consult flags, documentation text)

The registry in `src/data/calculators.ts` is the source of truth; keep this list in step
with it when adding a calculator.

## Anatomy section

The Anatomy category holds interactive 3D references rather than calculators:

- Otic capsule (temporal bone labyrinth, middle ear, facial nerve canal)
- Ossicular chain (malleus/incus/stapes, with a slice reconstructed through the model)
- Shoulder (rotator cuff, labrum, glenohumeral ligaments, instability lesion sites)
- Knee (cruciates, collaterals, menisci, posterolateral corner)
- Wrist (carpus, TFCC, intrinsic ligaments, extensor compartments, carpal tunnel)
- Ankle (mortise and hindfoot, lateral/deltoid/syndesmotic ligaments, tendons)

Online-only (in `public/anatomy/online/`, see below):

- TMJ, skull base foramina and cranial nerves, suprahyoid neck spaces, larynx
- Cervical spine trauma, brachial plexus, lumbar spine, pelvis and SI joints
- Elbow, foot

All are standalone HTML documents in `public/anatomy/`, kept verbatim rather than
ported to React: they carry their own palette and their own renderer (all but the
ossicular chain use three.js; that one has a hand-written software renderer on a 2D
canvas). The React pages under `src/pages/` are thin wrappers that declare their
content to `AnatomyReferencePage`, which lays out the shared header/viewer/notes
shell and frames the document via `AnatomyViewer` - an iframe plus a full-screen
link. A new reference is a content declaration, not new markup.
`scrollsInFrame` is required on every one: all but the otic capsule are long
scrolling documents, where the embed is the worse phone experience, so
`AnatomyViewer` promotes the full-screen link and appends the sentence saying so.

All their dependencies are vendored so the PWA still works offline: three.js r128 sits
in `public/anatomy/vendor/` with its MIT licence, and every Google Fonts link was
replaced by an `@font-face` pointing at the site's already-precached Source Serif 4,
with the system sans stack underneath it. Keep it that way - no CDN or webfont URLs
belong in these files. Geometry is inlined in each document; none of them fetch
anything at runtime. The musculoskeletal bone meshes come from BodyParts3D (Database
Center for Life Science, CC BY-SA 2.1 JP), attributed in each document.

The precached anatomy files come to roughly 2.4 MB (the ankle alone is ~1 MB, still
under Workbox's 2 MiB per-file default). Put new large viewers in `online/` (below)
rather than growing the precache.

### Online-only anatomy

`public/anatomy/online/` holds viewers that are deliberately left out of the offline
precache (`globIgnores: ['anatomy/online/**']` in `vite.config.ts`): together they are
~8 MB, too much to push to every install. They still use the vendored three.js
(`../vendor/three.min.js`) and follow the same rules otherwise. `AnatomyViewer`
detects the `online/` prefix on `file`: it adds a "needs an internet connection"
sentence to the hint, and while `navigator.onLine` is false it shows an offline notice in
place of the iframe, which would otherwise show the browser's own error page. To make one available offline again, move it up a directory
and drop the prefix from its page's `file`. They still fall under
`navigateFallbackDenylist`, since the pattern covers all of `/anatomy/`.

## Registry: groups and related links

`src/data/calculators.ts` is the single registry for routes, the menu, search and the
home page.

- Categories may set `itemLabel` (Anatomy uses `'reference'`, Studies `'study'`), so the
  home-page count reads "16 references" rather than "16 calculators". They may also set a
  `blurb`, shown under the category heading.
- Items may set `group`, which becomes a subheading on the home page and a label in the
  menu dropdown. Anatomy is grouped by region (head and neck, spine and brachial plexus,
  pelvis and limbs), and Studies by body area. `groupItems` groups consecutive items, so
  keep each group's items together in the list.
- Items may set `related`, a list of paths. `RelatedLinks` shows those items as cards
  under the page, in both directions, so declare each link on one side only (usually on
  the lesson, e.g. the prostate lesson lists `/pi-rads`). `App.tsx` renders it after every
  routed page, so pages never import it themselves.

The site copy (header subtitle, home headline, search labels, manifest and meta
descriptions) presents it as calculators, lessons and 3D anatomy. Keep it that way
when adding a new kind of content.

## Studies section

The Studies category (first on the home page and in the menu) has one page per exam
type, each with three tabs:

- **Report**: a form that walks the lesson's own search pattern step by step. Each step
  has a collapsible "Why and how" panel quoting the lesson and its papers, rule chips
  that apply the lesson's thresholds (e.g. extramural depth to T3a-d), and the report
  text builds itself in the lesson's template format, with a "check before signing"
  list for missing required items and contradictions.
- **Learn**: the lesson itself, verbatim, section by section, with its reference list.
- **Quiz**: self-check questions from the lesson. The best score is kept in
  `localStorage` (guarded, per-viewer only). Nothing typed into the Report form is
  stored anywhere, so no patient detail outlives the page.

Studies: rectal MRI, prostate MRI (PI-RADS v2.1), renal mass CT and MRI, adnexal mass
MRI (O-RADS MRI), pancreatic mass CT, pancreatic cysts (ACR 2017, Fukuoka 2017, Kyoto
2024), CT colonography (C-RADS 2023), epilepsy MRI (HARNESS-MRI), sinus CT before
FESS, temporal bone CT. Drafted from the guidelines rather than from the site author's
notes, and labelled as unreviewed drafts in their source note until the author signs
them off: thyroid ultrasound (ACR TI-RADS 2017), liver CT and MRI (LI-RADS v2018), lung
screening CT (Lung-RADS v2022), incidental lung nodule CT (Fleischner 2017).

How it is built:

- Each study is data: `src/studies/<Name>Study.tsx` declares a `StudyDefinition`
  (`src/study/types.ts`) and renders it with `StudyPage`. The framework in `src/study/`
  (`StudyPage`, `ReportBuilder`, `QuizPanel`) owns all layout and behaviour, so a new
  study is a content declaration, not new markup. Read the doc comments in `types.ts`
  before writing one.
- Rules in `derive`/`build` must come from the lesson text or from a shared calculator
  in `src/logic/`, with the lesson's thresholds. Never add thresholds or management
  advice the lesson does not state. When a study and a calculator apply the same rules
  (PI-RADS, Bosniak, O-RADS), reuse one implementation from `src/logic/`: `pirads.ts` and `bosniak.ts` are shared by the calculators and the prostate and renal studies, so a fix there changes both.
- Routes live under `/studies/<slug>`, and the tab is in the query string (`?tab=learn`).
  `/lessons/<slug>` redirects there; the pages were briefly called lessons.
- Cite inline with `<Cite doi="...">` (`src/components/LessonPage.tsx`, which also holds
  the shared reference list and caveat).

In September 2026 every citation was checked against PubMed. DOIs were added or
corrected, citation text was fixed to match the real papers, and plain-text citations
were linked where the paper could be matched with confidence. Claims that did not match
their papers were corrected with the author's approval. A new study should get the
same check before it ships, and any claim that doesn't match its paper should go to the
author rather than be quietly reworded.

## Next development priorities

- tighten edge-case rule completeness
- add more radiology calculators and quick references
- maintain a consistent report-output UX across calculators
- keep deployment simple and free for low-volume use
