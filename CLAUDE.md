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

The site uses no webfont: system sans (`--font-sans`) for all text, headings included,
and system mono (`--font-mono`) for labels and data. Weight and size carry the heading
hierarchy; small labels (eyebrows, metric labels, group headings, table heads, tabs)
are mono, uppercase and letter-spaced. Source Serif 4 is gone: the font file, its licence
and `public/fonts/` were deleted once nothing referenced them. The anatomy viewers use the
same two stacks through `--rr-font-sans` / `--rr-font-mono` in their shared stylesheet
(see Anatomy section). `src/styles.test.ts` fails if `src/styles.css` gains a
`@font-face` or a `Source Serif` reference again, and `src/anatomy.test.ts` does the same
for the viewers.

## Colour

The look is "reading room": follows the system theme, with a toggle; hairline rules instead of bordered cards, teal
as the only accent. Every colour is a token in `src/styles.css`: the light palette on
`:root`, the dark palette in a `[data-theme="dark"]` block that redefines every
`--color-*` token. No colour literal belongs anywhere else in the file, shadows and the
always-dark anatomy viewport (`--color-viewport`) included; `src/styles.test.ts` checks
both rules. Page-specific colour needs (the fifth metatarsal figures' `--color-figure-*`)
get their own tokens rather than literals.

- Light: bg #fbfbfa, surface #ffffff, hairline #e3e5e6, control border #838b8f, text
  #111415, muted #5f676b, primary and accent #0e6b63 (the logo teal).
- Dark: bg #0b0d0e, surface #141719, hairline #1d2123, control border #626b70, text
  #e6e8e9, muted #8d9599, primary and accent #3fb8a8. `--color-primary-dark` is the
  hover state, so in the dark palette it is lighter than primary. Good/warn have dark
  variants (#5ec48a, #f08070) that keep 4.5:1 on the dark background.
- Text on a primary fill uses `--color-on-primary` (white in light, near-black in dark).
- `--color-border` outlines controls (inputs, selects, outlined buttons) and is darker than
  the mockup's #d5d9da / #262b2e so it keeps 3:1; dividers and rules use `--color-hairline`.

`data-theme` on `<html>` is set before first paint by the inline script in `index.html`
and afterwards by `src/lib/theme.ts` (`radref-theme` in `localStorage`, `light` | `dark`;
absent means follow `prefers-color-scheme`). `index.html` has two `theme-color` metas,
one per `prefers-color-scheme`, and `applyTheme` points both at the active background;
`THEME_COLORS` in `src/lib/theme.ts` must equal the two `--color-bg` values (a test
checks). The manifest's `theme_color` and `background_color` stay on the light
background (#fbfbfa), since manifests have no dark variant. If the palette changes,
change all of these together, and redraw the icons if the logo changes.

## Theme

Summary of the theme plumbing (details in Colour and Anatomy section):

- Key `radref-theme` in `localStorage`, values `light` | `dark`; absent key = follow system (`prefers-color-scheme`). Every access, including the remove, is in try/catch.
- `index.html` sets `data-theme` and the `theme-color` metas before first paint; `src/lib/theme.ts` owns it afterwards, and `src/components/ThemeToggle.tsx` is the header button.
- The toggle has three states and cycles System → Light → Dark → System (`nextThemeChoice`). System removes the key (`clearStoredTheme`) and follows `prefers-color-scheme` live; Light and Dark store the key. Its icon shows the current choice (half-filled circle, sun, moon) and its label says the choice and what a tap does ("Theme: system. Switch to light"). It also listens for `storage` events, so another tab or a viewer changing or removing the key is followed.
- Anatomy viewers are separate documents: each inlines the pre-paint snippet from `public/members/anatomy/shared/radref.css` and links that stylesheet. The embedded frame follows the site's theme.
- The 3D viewport (`--color-viewport` and in-canvas overlays) stays dark in both themes.

## Version

Every page ends with a footer line such as "Version 1.0.0 · built 2026-10-23 · 9cc2037", so
anyone can tell which build a phone (or an offline install) is running.

- The number goes up by itself with every deploy: major and minor come from `version` in
  `package.json`, and the patch number is the count of commits on main's first-parent history
  (`appVersion` in `src/lib/version.ts`, fed by `gitCommitCount` in `vite.config.ts`), so each merge
  or push to main shows a higher number. Bump major or minor by hand when a release is worth naming,
  with `npm version <x.y.0> --no-git-tag-version`; the patch in `package.json` is ignored. Only the
  GitHub Action deploys main (full history, `fetch-depth: 0`). Cloudflare's own Git build, which
  cloned shallow, was disabled on 2026-10-28 (Worker radref → Settings → Builds → "Disable builds",
  repo still connected); a shallow build still runs `git fetch --unshallow` first. Without history,
  or outside git, it falls back to the `package.json` version (seen live on 2026-10-28 as "1.0.0"
  after the shallow Cloudflare build overwrote the Action's "1.0.158").
- The build day (UTC) and short git commit are stamped in at build time by `define` in
  `vite.config.ts` (`__APP_VERSION__`, `__BUILD_DATE__`, `__BUILD_COMMIT__`, declared in
  `src/buildInfo.d.ts`). Outside a git checkout the commit falls back to `GITHUB_SHA`, then
  is left out.
- `versionLine` in `src/lib/version.ts` formats the line; `src/lib/version.test.ts` pins it
  and checks that `package.json` carries a real number.

## Members pages (Cloudflare Access)

Studies, 3D anatomy and protocols are for signed-in members; calculators and classifications stay
public (the author's decision, 2026-10-28). Everything members-only lives under `/members/`, the one
path Cloudflare Access guards:

- In the registry, those pages load with `membersPage(...)`, the rest with `lazyPage(...)`;
  `src/data/calculators.test.ts` pins which kind uses which. A new study, anatomy or protocol page
  must use `membersPage`.
- `vite.config.ts` builds each `membersPage` import, and every module only members pages reach
  (found by walking the module graph from the entry), into `dist/members/assets/`. The
  `radref-members-split` plugin fails the build if members-only code lands in a public chunk or a
  public chunk imports a members chunk.
- Members static files: `public/members/anatomy/` (the viewers) and `public/members/calvarium/`.
  The example scans in `public/scans/` stay public: several are shared with classification pages,
  and all are open-access CC BY figures.
- Without a session the chunk fetch is redirected to the Access login and fails, so `membersPage`
  renders `MembersOnly` (`src/components/MembersOnly.tsx`) with a "Sign in" link to
  `/members/signin/?to=<page>`. Access asks for the sign-in there, then
  `public/members/signin/index.html` returns the reader to the page; it accepts only a same-site
  path (pinned in `calculators.test.ts`).
- Access is set up in the Cloudflare dashboard, not in this repo (2026-10-28): Zero Trust Free,
  team `nameless-smoke-e0f8`; self-hosted application "radref" on `radref.hash.immo/members/*`;
  Allow policy "Rad Ref members" listing members' emails; login by email one-time PIN (or a
  Cloudflare account). To add a member, add their email to that policy. Without an Access
  application `/members/` would be open.

## Offline / PWA

The site is a PWA via `vite-plugin-pwa` (configured in `vite.config.ts`), so it can be installed to a phone home screen and used with no network connection after the first visit.

- Service worker precaches all built assets (`registerType: 'autoUpdate'`) and falls back to `index.html` for client-side routes when offline.
- Each page is a separate chunk, loaded on first navigation to its route (`lazyPage` and `membersPage` in `src/data/calculators.ts`). The Workbox `globPatterns` include `**/*.js`, so every public chunk is precached and offline navigation still works. `members/**` is in `globIgnores`, since without a session those files are an Access redirect; a `runtimeCaching` rule (network first, 200s only) keeps each members file once it has been fetched while signed in, so a members page opened once works offline after that. `/members/anatomy/online/` and `/members/signin/` are left out of that rule.
- Manifest icons live in `public/` (`pwa-192.png`, `pwa-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `favicon-48.png`) and are generated from the "RR" logo mark (`public/logo-mark.png`, transparent cutout; `public/logo-mark-header.png`, kept but no longer rendered: the header now draws a CSS "RR" mark). Regenerate all of them, the PNG included, together if the logo changes, keeping the maskable icon's content inside the safe zone (~50% of canvas, since it also carries background padding).
- No backend calls exist anywhere in the app, so full offline precaching is safe with no stale-data concerns.
- `public/references/` holds reference PDFs shared unchanged under their licence (AO Spine's
  subaxial and thoracolumbar posters, CC BY-NC-ND 4.0, linked from the AO Spine page). `pdf` is not in
  `globPatterns`, so they need a connection, and `/^\/references\//` is in
  `navigateFallbackDenylist`: opening one is a navigation, which the service worker would otherwise
  answer with the React shell.
- The calvarial lesions page's scans (about 210 KB, in `public/members/calvarium/`) are members
  files, so they work offline once the page has been opened signed in; keep any new photo small and
  greyscale.
  The example scans on the other pages (`public/scans/<page>/`, below) are precached (`jpg` is in `globPatterns`);
  each page's set is 100 to 260 KB, about 1660 KB in all (2026-10-28). Use about 340 px for
  ultrasound, whose speckle compresses poorly.
- The anatomy viewers' shared stylesheet, `public/members/anatomy/shared/radref.css`, is a members
  file, cached with the first viewer opened. `woff2` is still in `globPatterns`, but no font ships any more, so it
  matches nothing; a self-hosted font added later would be precached without a config change.
- `navigateFallbackDenylist: [/^\/members\//, ...]` is required in the Workbox config. An
  iframe load counts as a navigation, so without it the service worker answers the
  anatomy frame's request with the React shell and the viewer renders the whole app
  inside itself; the sign-in page must also reach the network so Access can step in. Any future
  standalone HTML page needs the same treatment.

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

## Copy boxes: report sections

The author decided (2026-10-25) that every calculator's copy-and-paste text is split into the
standard report sections, correctly capitalised and punctuated:

- `CopyBlock`'s `label` is a `ReportSection` (`src/components/reportText.ts`): **Findings** (what
  was measured or seen), **Impression** (the category or diagnosis, with no follow-up advice in
  it) and **Recommendation** (follow-up and management, with the guideline's interval). The
  contrast and IR anticoagulation pages write a **Chart note**. Studies keep **Report** and
  **Report template**. `src/components/reportText.test.ts` fails if a page uses any other label.
- `formatReportText` tidies every calculator section before it is shown and copied: a capital
  letter at the start of each line (words like eGFR are left alone) and a full stop at the end.
  Study reports and templates are left as written.
- Logic that a study shares keeps the study's output: the Fleischner result has `impression` and
  `recommendation`, and the incidental lung nodule study joins them back into one paragraph.
- The pancreatic cyst calculator and the incidental findings page's pancreatic cyst tool use the
  ACR 2017 intervals from the pancreatic cysts study's lesson (`acrSurveillance` in
  `src/logic/pancreaticCyst.ts`), shared with that study.
- Every calculator's follow-up intervals were checked against the guidelines' full text on
  2026-10-25 (`docs/REMAINING_TASKS.md`, "Calculator follow-up intervals", which also lists the
  questions still open for the author). The early pregnancy loss rules
  (`src/logic/earlyPregnancyLoss.ts`) and the incidental adrenal and renal tools
  (`src/logic/incidentalAdrenal.ts`, `src/logic/incidentalRenal.ts`, rebuilt from the ACR white
  papers' flowcharts) live in `src/logic/` with tests. O-RADS US gives the v2022 chart's management
  for every category, with a classic benign lesion type.

## Current calculators

- TI-RADS
- LI-RADS
- O-RADS
- Incidental findings (adrenal, pancreatic cyst, renal mass; ACR white paper flowcharts)
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
- Fifth metatarsal fractures (quick reference: Lawrence-Botte zones, Torg grading, mimics; schematic inline SVG figures, each paired with CC BY radiographs from `src/data/scans/fifthMetatarsal.ts` except the dancer's fracture, for which no open image was found)
- Calvarial lesions (teaching page, a study in the Neuro region, at `/studies/calvarium`; `/calvarium` redirects: normal variants, lucent and dense skull vault lesions compared, schematic inline SVG cross-sections plus CT and MRI panels cropped from CC BY 4.0 open-access reviews (and, for the burr hole and osteomyelitis, three CC BY 4.0 case reports; for the layers, a CC BY 2.0 radiograph of a vault biopsy), credited per image with each source's licence; image list in `src/data/calvariumImages.ts`, files in `public/members/calvarium/`, checked by `src/pages/calvarium.test.ts`; drafted from the cited reviews, not yet reviewed by the author)
- Hearing loss on temporal bone CT (teaching page, a study in the Head and neck region, at `/studies/hearing-loss-ct`; `/hearing-loss-ct` redirects: adult SNHL findings drawn on one inner ear cutaway (`src/components/InnerEarAnatomy.tsx`, shapes in `innerEarShapes.ts`, colours `--color-ear-*`), report wording, cochlear implant checklist; CT panels cropped from CC BY open-access figures, credited per image with each source's exact licence version; image list in `src/data/scans/hearingLoss.ts` (files in `public/scans/hearing-loss/`), shared with the temporal bone CT study; claims checked against the databases, with open questions for the author; unchecked draft, see `docs/superpowers/research/2026-10-28-hearing-loss-ct-sources.md`)
- Early pregnancy loss (SRU criteria, diagnostic versus suspicious findings)
- Contrast reactions (severity triage, bedside actions, chart text)
- Contrast premedication (oral and accelerated IV regimens)
- Contrast extravasation (triage, surgical consult flags, documentation text)
- Schatzker (tibial plateau fracture types I-VI, with Markhardt's IIIA and IIIB; logic shared in `src/logic/schatzker.ts`; unchecked draft)
- Neer (proximal humerus fracture parts; logic shared in `src/logic/neer.ts`; unchecked draft)
- Mason (radial head fracture types I-IV with Johnston's type IV; logic shared in `src/logic/mason.ts`; unchecked draft)
- Mayfield (perilunate injury stages I-IV; logic shared in `src/logic/mayfield.ts`; unchecked draft)
- Scaphoid fracture, Herbert (types A1-D2; logic shared in `src/logic/herbert.ts`; unchecked draft)
- Palmer TFCC (traumatic 1A-1D, degenerative 2A-2E; logic shared in `src/logic/palmer.ts`; unchecked draft)
- Kienböck, Lichtman (stages I-IV with IIIA, IIIB and IIIC; logic shared in `src/logic/lichtman.ts`; unchecked draft)
- Hawkins (talar neck fracture types I-IV with Canale-Kelly type IV; logic shared in `src/logic/hawkins.ts`; unchecked draft)
- Sanders (intra-articular calcaneal fracture types I-IV from the posterior facet lines on CT; logic shared in `src/logic/sanders.ts`; unchecked draft)
- Lisfranc, Myerson (tarsometatarsal fracture-dislocation types A-C2; logic shared in `src/logic/myerson.ts`; unchecked draft)
- AO Spine (subaxial cervical and thoracolumbar types A0-C, facets, neurology, modifiers; logic shared in `src/logic/aospine.ts`; unchecked draft)
- Young-Burgess (pelvic ring types LC I-III, APC I-III, VS, CMI, with usual stability; logic shared in `src/logic/youngburgess.ts`; unchecked draft)
- Letournel (acetabular fracture, five elementary and five associated types from the CT questions; logic shared in `src/logic/letournel.ts`; unchecked draft)

The registry in `src/data/calculators.ts` is the source of truth; keep this list in step
with it when adding a calculator.

## Anatomy section

The `kind: 'anatomy'` items are interactive 3D references rather than calculators:

- Otic capsule (temporal bone labyrinth, middle ear, facial nerve canal)
- Ossicular chain (malleus/incus/stapes, with a slice reconstructed through the model)
- Shoulder (rotator cuff, labrum, glenohumeral ligaments, instability lesion sites)
- Knee (cruciates, collaterals, menisci, posterolateral corner)
- Wrist (carpus, TFCC, intrinsic ligaments, extensor compartments, carpal tunnel)
- Ankle (mortise and hindfoot, lateral/deltoid/syndesmotic ligaments, tendons)

Online-only (in `public/members/anatomy/online/`, see below):

- TMJ, skull base foramina and cranial nerves, suprahyoid neck spaces, larynx
- Cervical spine trauma, brachial plexus, lumbar spine, pelvis and SI joints
- Elbow, foot

All are standalone HTML documents in `public/members/anatomy/`, kept as their own documents rather
than ported to React: each carries its own structure colours and its own renderer (all but
the ossicular chain use three.js; that one has a hand-written software renderer on a 2D
canvas). The React pages under `src/pages/` are thin wrappers that declare their
content to `AnatomyReferencePage`, which lays out the shared header/viewer/notes
shell and frames the document via `AnatomyViewer` - an iframe plus a full-screen
link. A new reference is a content declaration, not new markup.
`scrollsInFrame` is required on every one: all but the otic capsule are long
scrolling documents, where the embed is the worse phone experience, so
`AnatomyViewer` promotes the full-screen link and appends the sentence saying so.

All their dependencies are vendored so the PWA still works offline: three.js r128 sits
in `public/members/anatomy/vendor/` with its MIT licence, and they use system fonts only (every
Google Fonts link was removed). Keep it that way - no CDN or webfont URLs belong in
these files. Geometry is inlined in each document; none of them fetch
anything at runtime. The musculoskeletal bone meshes come from BodyParts3D (Database
Center for Life Science, CC BY-SA 2.1 JP), attributed in each document.

The cached anatomy files come to roughly 2.4 MB (the ankle alone is ~1 MB). Since the
members split they are not precached but kept once opened (Offline / PWA, above). Put new
large viewers in `online/` (below), which is never stored.

### Shared style and theme

Every viewer's chrome (header, panels, controls, notes) comes from one stylesheet,
`public/members/anatomy/shared/radref.css`, linked as `shared/radref.css` from the top level and
`../shared/radref.css` from `online/`. It holds the site palette as `--rr-*` tokens (the
same values as the `--color-*` tokens in `src/styles.css`; change them together), the
system sans and mono stacks, and `:where()` base styles that give buttons, selects and
sliders a 44px hit area.

- **Theme.** Each viewer inlines, unchanged, the pre-paint script quoted at the top of
  `radref.css`, right after `<title>` and before the stylesheet link. It sets
  `data-theme` on `<html>` from `radref-theme` in `localStorage` (or
  `prefers-color-scheme`), so there is no theme flash, and it listens for the `storage`
  event, so an embedded viewer switches when the main page's toggle is flipped.
- **Chrome variables.** Each viewer keeps its own variable names, but its chrome ones (page,
  panel, line, ink, muted, UI accent) point at `--rr-*` tokens, with a comment in `:root`
  saying which is which. Status text that used a structure colour uses `--rr-warn` /
  `--rr-good` instead, while swatches and borders keep the structure colour.
- **The viewport is always dark.** The canvas element's scope (`#stage`, `#viewer`, `#cw`
  and so on) sets `color-scheme:dark` and `color:var(--rr-view-text)`, and redeclares the
  theme tokens and the file's own chrome names to the `--rr-view-*` values, so HUDs,
  drawers and floating labels drawn over the scene stay dark in both themes. Renderer
  clear colours are untouched. The brachial plexus "Light background" button and the
  larynx `lightBg` box are opt-in and change only the scene, not the chrome.
- **Structure and scene colours keep their values.** `src/anatomy.test.ts` checks every
  viewer against `src/anatomy-colours.json`, a snapshot of each file's CSS colour
  variables and script colour literals taken before the restyle. Only names in that file's
  `CHROME` list may change. Where one variable served both UI and scene, the scene half
  kept the old value under a `-scene` name (e.g. `--accent-scene`), pinned in the same
  test. A new viewer must be added to `FILES` and `CHROME` in `src/anatomy.test.ts`, and to
  the snapshot with `npm run snapshot:anatomy -- <path under public/members/anatomy/>`
  (`scripts/snapshot-anatomy-colours.mjs`), run before the viewer is restyled. The script
  only adds new files; it refuses to regenerate an existing entry, since those are the
  pre-restyle baseline.

### Online-only anatomy

`public/members/anatomy/online/` holds viewers that are deliberately never stored for offline use (left out of the members
`runtimeCaching` rule in `vite.config.ts`): together they are ~8 MB. They still use the vendored three.js
(`../vendor/three.min.js`) and follow the same rules otherwise. `AnatomyViewer`
detects the `online/` prefix on `file`: it adds a "needs an internet connection"
sentence to the hint, and while `navigator.onLine` is false it shows an offline notice in
place of the iframe, which would otherwise show the browser's own error page. To make one available offline again, move it up a directory
and drop the prefix from its page's `file`. They still fall under
`navigateFallbackDenylist`, since the pattern covers all of `/members/`.

## Example scans

Lessons and quick references show real example scans through `ScanFigures`
(`src/components/ScanFigures.tsx`), which renders a list of `ScanImage`s with their credit.

- Each page has a list in `src/data/scans/<page>.ts`, exported as `<page>Scans`, and its files in
  `public/scans/<page-in-kebab-case>/`. The papers are in `src/data/scans/sources.ts`, each with
  its exact CC BY version.
- `src/data/scans/scans.test.ts` checks every list: the file exists, is under 40 KB, sits in the
  page's folder, and names a CC BY version, a DOI and a figure; and some page uses every image
  as `<page>Scans.<key>` (so import the list under its own name, not an alias).
- Studies put them in a Learn section's `body`; no framework change is needed.
- Sources, licence evidence and crop notes are in
  `docs/superpowers/research/2026-10-28-example-scans.md`. Only CC BY with a stated version is
  used (no NC or ND); one panel per file, cropped, greyscale.

## Registry: regions, kinds and related links

`src/data/calculators.ts` is the single registry for routes, the menu, search, the home page
and the region pages.

- Body region is the main way in (the author's decision, 2026-10-28). Every item sets a `region`
  from `regions` (Neuro, Head and neck, Chest, Abdomen, Pelvis, Spine, Shoulder, Elbow, Wrist and
  hand, Hip, Knee, Ankle and foot, General) and a `kind` (study, classification, calculator,
  anatomy, protocol). The home page lists the regions; each has a page at `/regions/<slug>`
  (`RegionPage`) and a menu dropdown listing its items under a heading per kind, in `kinds`
  order. The kind is a label (search results, related cards), not a section of its own.
- `alsoIn` lists the item under further regions too (the pelvis CT study and Letournel under
  both Pelvis and Hip; the skull base pages and carotid stenosis under Neuro as well as Head and
  neck; the brachial plexus under Shoulder as well as Spine). General holds what belongs to no
  one region: contrast safety, IR anticoagulation, vessel diameters and the formulas.
- The list is ordered by region, then kind; within a kind, list order is the order shown. Bone
  and joint classifications go in their joint's region, and a test pins where they sit.
- Teaching pages that are not built on `StudyPage` are still `kind: 'study'` (the calvarial
  lesions and hearing loss pages, moved under `/studies/` 2026-10-28). A page that moves keeps
  its old path working through `movedPaths` in `src/data/calculators.ts`, which `App.tsx` turns
  into redirects. Companion calculators share a region (adrenal washout and chemical shift under
  Abdomen); a test pins it.
- Items may set `related`, a list of paths. `RelatedLinks` shows those items as cards
  under the page, in both directions, so declare each link on one side only (usually on
  the lesson, e.g. the prostate lesson lists `/pi-rads`). `App.tsx` renders it after every
  routed page, so pages never import it themselves.

The site copy (home headline, search labels, manifest and meta
descriptions) presents it as calculators, lessons and 3D anatomy. Keep it that way
when adding a new kind of content.

## Studies section

The studies (`kind: 'study'`, first under each region) have one page per exam
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
FESS, temporal bone CT, suprahyoid neck CT and MRI, larynx CT and MRI, skull base MRI and CT (all three unchecked drafts,
below). Drafted from the guidelines (ankle MRI from the published
papers in its reference list) rather than from the site author's
notes, and labelled as unreviewed drafts in their source note until the author signs
them off: thyroid ultrasound (ACR TI-RADS 2017), liver CT and MRI (LI-RADS v2018), lung
screening CT (Lung-RADS v2022), incidental lung nodule CT (Fleischner 2017), ankle MRI.

Unchecked drafts: knee MRI, shoulder MRI, elbow MRI, wrist MRI, foot MRI, diabetic foot MRI,
spine CT for pain or injury, pelvis CT for pain or injury and pediatric elbow radiographs (and the Schatzker, Neer, Mason, Mayfield, Herbert, Palmer, Lichtman, Hawkins,
Sanders, Myerson, AO Spine, Young-Burgess and Letournel calculators) were written in October 2026 in a cloud session that could not reach PubMed or Crossref, so their
citations were from memory. The claims are listed in
`docs/superpowers/research/2026-10-23-knee-mri-sources.md`,
`2026-10-23-shoulder-mri-sources.md`, `2026-10-23-elbow-mri-sources.md`,
`2026-10-23-wrist-mri-sources.md`, `2026-10-23-wrist-calculators-sources.md`,
`2026-10-23-foot-mri-sources.md`, `2026-10-23-foot-calculators-sources.md`,
`2026-10-23-diabetic-foot-mri-sources.md`, `2026-10-23-spine-calculators-sources.md`,
`2026-10-23-spine-trauma-ct-sources.md`, `2026-10-23-pelvis-calculators-sources.md`,
`2026-10-23-pelvis-ct-sources.md` and
`2026-10-23-pediatric-elbow-sources.md`, with each claim's verdict and quoted evidence. The author chose
to deploy them before that check (2026-10-23), so they are live with the "Unchecked draft"
note. The foot, diabetic
foot and spine drafts followed later the same day and were deployed the same way. The pelvis
drafts followed after that and were deployed on 2026-10-24, after their sources check.

The check was done on 2026-10-23 on a computer, for all of these drafts. Every reference was
matched on PubMed and Crossref, citation errors were fixed, and the DOIs and `<Cite>` links
were added (a few pre-1980 papers have no DOI; their study tests exempt them by name). Where
a claim differed from its paper, the author chose to match the paper's wording and rule.
Most papers are paywalled, so claims that no abstract or open full text states are kept,
by the author's choice, with a source note that still starts "Unchecked draft" and names
them; the tests pin a DOI on every reference and the note's first words. What is still
unchecked is tracked in `docs/REMAINING_TASKS.md`; it needs the full text.

The author is supplying the full texts in batches (`docs/PAPERS_NEEDED.md`). The first batch, on
2026-10-25, checked the Neer, Mason, Mayfield, Schatzker, Sanders, Young-Burgess, Letournel and
thoracolumbar AO Spine wording, and the second the Lichtman, Hawkins, Gartland, Goutallier, Ellman and
Denis wording, and the third the subaxial AO Spine, Schatzker, suprahyoid neck space and paediatric
elbow wording, mostly against Clin Orthop Relat Res "Classifications in Brief" reviews of the
original papers; where the site differed, the author chose the newer source
(`docs/REMAINING_TASKS.md`, "Calculator papers from the author"). The verdicts are in a "Second
check" section at the end of each sources document.

Head and neck: the author decided (2026-10-25) that the head and neck viewers get a study each
and no calculator, one study per region covering several exams and histories, chosen in step
1. The suprahyoid neck study (`/studies/suprahyoid-neck`: CT or MRI for a mass, CT for
infection) was written on 2026-10-25 without PubMed, then checked the same day once the
environment allowed PubMed, Crossref and Europe PMC (`eutils.ncbi.nlm.nih.gov`,
`api.crossref.org`, `www.ebi.ac.uk`). It is in the second state above: DOIs and `<Cite>` links
(Estrera 1983 and Russo 1997 have none), claims that differed matched to their papers by the
author's choice, and a source note still starting "Unchecked draft" for the claims no abstract
states. Its claims, with verdicts and quoted evidence, are in
`docs/superpowers/research/2026-10-25-suprahyoid-neck-sources.md`. The author had it merged and
deployed on 2026-10-25 with the larynx and skull base studies. The larynx study (`/studies/larynx`: CT or MRI for a known
cancer, CT for hoarseness) was written the same day with the databases reachable, every claim
read in an abstract or open full text before it went in
(`docs/superpowers/research/2026-10-25-larynx-sources.md`); the T4a cartilage wording was checked
later that day against Joshi's AJCC table, which differed for subglottic tumours (matched to the
paper by the author's choice). Its source note still starts "Unchecked draft" only because the
author has not reviewed it. The skull base study (`/studies/skull-base`:
MRI for a cranial nerve palsy, MRI for perineural spread, CT for a skull base mass) was written
the same way the same day (`docs/superpowers/research/2026-10-25-skull-base-sources.md`); Russo
1997, Nemzek 1998 and Eldevik 2000 have no DOI. Its note starts "Unchecked draft" only because the
author has not reviewed it. The environment also allows `api.unpaywall.org` (free copies of paywalled papers),
`doi.org`, `pmc.ncbi.nlm.nih.gov` and `cdn.ncbi.nlm.nih.gov` (PubMed Central pages and the table
and figure images inside them); `europepmc.org` itself refuses automated requests, so use the
Europe PMC API on `www.ebi.ac.uk`.

How it is built:

- Each study is data: `src/studies/<Name>Study.tsx` declares a `StudyDefinition`
  (`src/study/types.ts`) and renders it with `StudyPage`. The framework in `src/study/`
  (`StudyPage`, `ReportBuilder`, `QuizPanel`) owns all layout and behaviour, so a new
  study is a content declaration, not new markup. Read the doc comments in `types.ts`
  before writing one.
- Rules in `derive`/`build` must come from the lesson text or from a shared calculator
  in `src/logic/`, with the lesson's thresholds. Never add thresholds or management
  advice the lesson does not state. When a study and a calculator apply the same rules
  (PI-RADS, Bosniak, O-RADS), reuse one implementation from `src/logic/`. `pirads.ts`, `bosniak.ts`, `tirads.ts`, `lirads.ts`, `lungrads.ts`, `fleischner.ts`, `schatzker.ts`, `neer.ts`, `mason.ts`, `mayfield.ts`, `herbert.ts`, `palmer.ts`, `lichtman.ts`, `hawkins.ts`, `sanders.ts`, `myerson.ts`, `aospine.ts`, `youngburgess.ts` and `letournel.ts` are each shared by a calculator and a study, so a fix there changes both, and `src/logic/*.test.ts` pins them against their guidelines. (`orads.ts` backs the O-RADS calculator only; the adnexal MRI study implements the lesson's O-RADS MRI algorithm itself.)
- Routes live under `/studies/<slug>`, and the tab is in the query string (`?tab=learn`).
  `/lessons/<slug>` redirects there; the pages were briefly called lessons.
- Cite inline with `<Cite doi="...">` (`src/components/LessonPage.tsx`, which also holds
  the shared reference list).

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
