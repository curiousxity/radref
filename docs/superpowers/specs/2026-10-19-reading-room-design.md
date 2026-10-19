# Reading-room redesign and dark mode

Date: 2026-10-19 · Branch: `design-update` · Mockup: direction B on the design canvas
(https://claude.ai/artifact/4meUZxkiz3HDD8mnUAGPGe, artboards "B · Home, dark" and
"B · TI-RADS, light").

## Intent

The site is used on a phone in the middle of a read, often in a dark reading room. The
current design (bordered cards, serif headings, light only) feels busy and is glaring in
the dark. The author chose direction B, "Reading room": dark-first, a dense index with
hairline dividers, system sans with small mono labels, and teal as the only accent. They
want it delivered in one pass, and they want the 3D anatomy viewers to share the same
design language as the main site.

## Goals

1. A dark mode across the whole site, including the anatomy viewers.
2. Restyle every page in the B language: fewer boxes, hairlines instead of bordered cards,
   denser rows, one accent.
3. New home page structure: a tabbed index, as in the B mockup.
4. New calculator input style: segmented button rows instead of dropdowns, with the result
   pinned in a strip at the top.
5. The 16 anatomy viewers share the site's chrome (colours, type, controls) through one
   shared stylesheet.

## Non-goals

- No change to any clinical rule, threshold, report text or citation. `npm test` must pass
  unchanged; if a test has to change, that is a sign the change went too far.
- No change to what the anatomy viewers do: their controls, menus, geometry and renderers
  stay as they are.
- No new features (no favourites, accounts or settings page beyond the theme toggle).

## Anti-goals (a failure even if it works)

- Anatomical colour coding changed. Bone, ligament, tendon, nerve, vessel, fracture,
  inflammation and similar structure colours carry meaning in each viewer's legend and must
  keep their current values.
- Anything that breaks offline use: no CDN or webfont URLs, nothing fetched at runtime.
- A theme flash: the page must not paint light and then switch to dark on load.
- Text or controls that fail contrast in either theme (4.5:1 text, 3:1 large text and UI),
  or touch targets under 44 px.

## Decisions made with the author

- Direction B, all at once (not split into a restyle pass and a layout pass).
- The 3D viewport (the canvas area around each model) stays dark in both themes, like a
  reading-room monitor. Only the viewer's chrome (header, panels, menus, notes) follows
  the theme.
- The anatomy viewers adopt the site's design language through a shared stylesheet.

## Design calls (made by me, open to the author's correction)

- **Theme selection**: follows the phone's `prefers-color-scheme` by default. A sun/moon
  button in the site header overrides it, stored in `localStorage` under one key (for
  example `radref-theme`: `light` | `dark`; absent means follow the system). Wrap every
  `localStorage` access in try/catch, as `QuizPanel` does.
- **No flash**: a small inline script in `index.html` sets `data-theme` on `<html>` before
  first paint. The existing unused `src/components/ThemeToggle.tsx` is replaced by a toggle
  that reads and writes the stored choice.
- **Type**: system sans for everything, system mono for labels and data, matching the
  mockup. Source Serif 4 is no longer used. Remove the `@font-face`, the font file and its
  licence once nothing references it (the anatomy files reference it too, see below), and
  update the Typography section of `CLAUDE.md`.
- **Status bar**: `theme-color` gets two `<meta>` tags with `media` queries for light and
  dark, and the toggle updates the active one when the user overrides. The manifest
  `theme_color` / `background_color` stay on the light background (manifests have no dark
  variant). Update the Colour section of `CLAUDE.md`.
- **Palette** (from the mockup; tune for contrast as needed). Dark: background `#0b0d0e`,
  raised surface `#141719`, hairline `#1d2123`, control border `#262b2e`, text `#e6e8e9`,
  muted `#8d9599`, accent `#3fb8a8`. Light: background `#fbfbfa`, surface `#ffffff`,
  hairline `#e3e5e6`, control border `#d5d9da`, text `#111415`, muted `#5f676b`, accent
  `#0e6b63` (the logo teal). Keep good/warn tones, with dark-mode versions that pass
  contrast. All as tokens on `:root` with a `[data-theme="dark"]` override in
  `src/styles.css`; no colour literals outside the token block.
- **Logo**: the header uses the mono "RR" outline mark from the mockup in place of the
  raster `logo-mark-header.png`. The PWA icons are not redrawn.

## The main site

### Shell (`src/App.tsx`, `CategoryNav`)

- Compact header: RR mark and "Rad Ref" on the left; the theme toggle and the menu button
  on the right, both 44 px icon buttons with `aria-label`s. The dropdown menu restyles to
  hairline rows with mono group labels.

### Home page (`src/pages/HomePage.tsx`)

- Search field at the top (with a `/` keyboard hint on wide screens), then a tab row:
  **Calculators | Studies | Anatomy | Recent**.
- Calculators tab: every non-Studies, non-Anatomy category as a mono uppercase group label,
  then one row per item: name on the left, a short mono tag on the right. Studies and
  Anatomy tabs: their items grouped by their existing `group` field.
- Tags: add an optional `tag` field to `CalculatorItem` in `src/data/calculators.ts`
  (for example `v2022`, `ACR 2017`, `SRU 2019`, `3D`). Use only versions and sources the
  page itself already states; leave the tag empty where it does not.
- Recent: the last few items the viewer opened, stored in `localStorage` (paths only,
  guarded). Empty state when there are none.
- The selected tab is in the query string (`?tab=studies`), as study pages already do, so
  it survives back navigation.
- Searching replaces the tab content with matching rows in the same style.
- Category blurbs, the install button and the count labels stay, restyled.

### Calculator pages (`src/pages/*Page.tsx` that use `page-calculator`)

- Replace `<select>` inputs with a shared segmented-button component (for example
  `src/components/ChoiceGroup.tsx`: a radio group rendered as joined buttons, with keyboard
  arrow support and `aria-checked`). Use it where the options are a few short labels; long
  or wordy option lists stay as a restyled `<select>`. Option values and the state they set
  do not change, so the logic and tests are untouched.
- Every existing option stays, with its current wording; nothing is abbreviated or merged
  (the mockup's "Hyper/iso" and "An-" were sketch shorthand, not approved wording). Where
  labels are long, the buttons wrap into a stacked or two-column grid of full-width
  buttons rather than one joined row. This applies to TI-RADS too.
- TI-RADS shows each feature's points beside its label, as in the mockup. Other calculators
  show no per-option points unless they already compute them.
- Page header: the site header (RR mark, theme toggle, menu) stays on every page, so the
  toggle is always reachable; there is no per-route back bar. The current intro block
  becomes a compact title row (name, mono source tag such as `ACR 2017`) with the
  description below it. Source links and source notes stay; they are citations.
- On a phone, the result strip pins at the top (it already does through `.sticky-card`),
  restyled as the mockup's category strip: large mono category, summary line, thresholds.
  The impression and copy button follow it.

### Study, lesson and reference pages

- Restyled through the shared classes (`info-card`, `ref-table`, `lesson-key`, study tabs,
  quiz) in both themes. No markup changes beyond what the restyle needs.
- The fifth metatarsal figures already use tokens; check their fills and strokes read in
  dark mode.

## The anatomy viewers (`public/anatomy/*.html`, `public/anatomy/online/*.html`)

- Add one stylesheet, `public/anatomy/shared/radref.css`, holding the B chrome tokens for
  both themes, the system sans and mono stacks, and base styles for buttons, selects,
  sliders, menus and panels. Each of the 16 documents links it with a relative path. Check
  that the precache picks it up (it matches `**/*.css`) and that the online viewers reach
  it (`../shared/radref.css`).
- In each document, point its own chrome variables (each file names them differently:
  `--bg`, `--panel`, `--ink`, `--line`, `--accent`, `--dim`, `--paper` and so on) at the
  shared tokens, and replace header, button and panel styling that conflicts with the
  shared look. Leave every structure colour variable at its current value.
- The 3D canvas background stays dark in both themes. All viewports already clear to a dark
  colour (ankle `0x1E2A38`, wrist `0x23282e`, knee dark), so this mostly needs no change.
- Chrome drawn over the canvas (HUD panels, mechanism bars, floating structure labels,
  e.g. `.hud`, `.mechs`, `.lbl` in `knee.html`) stays dark in both themes, because it sits
  on the dark scene. `radref.css` therefore has two scopes: theme-following chrome tokens,
  and an always-dark viewport scope for in-canvas overlays.
- The existing opt-in light-background controls (`#bgBtn` in `online/brachial-plexus.html`,
  the `lightBg` checkbox in `online/larynx.html`) stay, defaulting to dark. They change
  only the scene, not the chrome: larynx's switch must stop rewriting `--bg`, `--ink` and
  `--panel`, and change the scene background alone.
- Accent colours used inside the scene (selected-mesh glow such as ankle's `0xE0A100`,
  tmj's slice-plane colour `#4fb8c9`, skull base and otic capsule highlights) count as
  structure colours and keep their values. Where a file uses one variable for both UI and
  scene, split it: the UI use moves to the shared accent, the scene keeps the old value
  under its own variable.
- Theme: a few lines of script in each document read the same `localStorage` key and
  `prefers-color-scheme`, set `data-theme` on their `<html>`, and listen for the `storage`
  event, so an embedded viewer switches when the user flips the toggle on the main page
  (same origin). Opened full-screen, a viewer follows the same stored choice.
- Replace the Source Serif `@font-face` in each document with the shared sans stack.
- These files stay standalone documents with no CDN or webfont URLs, per `CLAUDE.md`.
  Update the Anatomy section of `CLAUDE.md` to describe the shared stylesheet.

## Constraints

- Static, offline PWA; no backend; everything precached as today.
- `npm run lint`, `npm test` and `npm run build` must pass; the deploy runs all three.
- Do not start the dev server or a browser unless the author asks (`CLAUDE.md`). The
  author should be offered a browser check of both themes before merging, since this is a
  visual change.
- Work on `design-update`; merge to `main` only when the author says so.

## Left to the builder

- Exact spacing, type scale and component sizes, within the mockup's character.
- Which `<select>` inputs become segmented groups (the rule: few, short options).
- How to sequence the work and how to split commits.
- Per-viewer details of mapping each document's variable names onto the shared tokens.
