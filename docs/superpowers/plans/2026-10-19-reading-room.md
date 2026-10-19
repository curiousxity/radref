# Reading-room Redesign and Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the whole site and the 16 anatomy viewers in the "reading room" (B) design language, with a light/dark theme that follows the system and can be overridden.

**Architecture:** Theme state is one `localStorage` key read by a pre-paint script in `index.html` and in each anatomy document, applied as `data-theme` on `<html>`. Colours live only as tokens in `src/styles.css` (light on `:root`, dark under `[data-theme="dark"]`) and in a new shared `public/anatomy/shared/radref.css`. Calculators move from `<select>` to a shared `ChoiceGroup` radio component without changing any form value.

**Tech Stack:** React 19, TypeScript, Vite 8, vitest 5 (node environment, no DOM library), vite-plugin-pwa.

**Spec:** `docs/superpowers/specs/2026-10-19-reading-room-design.md`

## Global Constraints

- No change to any clinical rule, threshold, option value, report text or citation. Existing tests must pass unchanged.
- Every existing calculator option stays, with its current wording; nothing abbreviated or merged.
- Anatomical structure colours and in-scene highlight colours keep their current values.
- No CDN or webfont URLs anywhere; nothing fetched at runtime. Offline precache as today.
- Theme key: `radref-theme`, values `light` | `dark`; absent = follow `prefers-color-scheme`. Every `localStorage` access in try/catch.
- No theme flash on load.
- Contrast: text 4.5:1, large text and UI 3:1, in both themes. Touch targets ≥ 44 px.
- Palette — dark: bg `#0b0d0e`, surface `#141719`, hairline `#1d2123`, control border `#262b2e`, text `#e6e8e9`, muted `#8d9599`, accent `#3fb8a8`. Light: bg `#fbfbfa`, surface `#ffffff`, hairline `#e3e5e6`, control border `#d5d9da`, text `#111415`, muted `#5f676b`, accent `#0e6b63`.
- Type: system sans everywhere, system mono for labels/data. Source Serif 4 removed.
- 3D viewport and in-canvas overlays stay dark in both themes.
- Do not start the dev server or a browser (CLAUDE.md). Gate every task on `npm run lint && npm test && npm run build`.
- Work on `design-update`; do not merge or push.

## Review Focus

- `localStorage` throws (private mode, blocked storage): the theme still resolves from the system, the toggle still works for the session, no crash. → pinned in Task 1.
- A stored value that is neither `light` nor `dark` (hand-edited, old version): treated as "follow system". → pinned in Task 1.
- Toggling the theme while an anatomy viewer is embedded: the viewer switches without reload (cross-document `storage` event). → pinned by the theme-script presence test in Task 8, plus the manual check offered at the end.
- Recent list with a path that no longer exists in the registry (removed or renamed page): it is skipped, not rendered as a broken row. → pinned in Task 4.
- Keyboard use of a segmented group (arrow keys wrap, Home/End): focus and selection move as a radio group. → pinned in Task 6.

---

### Task 1: Theme core, pre-paint script, toggle

**Files:**
- Create: `src/lib/theme.ts`, `src/lib/theme.test.ts`
- Modify: `index.html`, `src/components/ThemeToggle.tsx`

**Interfaces:**
- Produces: `THEME_KEY = 'radref-theme'`; `type Theme = 'light' | 'dark'`; `parseStoredTheme(raw: string | null): Theme | null`; `resolveTheme(stored: Theme | null, prefersDark: boolean): Theme`; `readStoredTheme(storage?: Pick<Storage, 'getItem'>): Theme | null` (returns null if access throws); `writeStoredTheme(theme: Theme, storage?: Pick<Storage, 'setItem'>): void` (swallows errors); `applyTheme(theme: Theme, doc?: Document): void` (sets `data-theme` on `<html>` and the content of `meta[name=theme-color]` to the active bg); `THEME_COLORS: Record<Theme, string>` = `{ light: '#fbfbfa', dark: '#0b0d0e' }`. `ThemeToggle` (no props).

- [ ] **Step 1: Write the failing tests** in `src/lib/theme.test.ts`:
  - `parseStoredTheme('dark') === 'dark'`, `('light') === 'light'`, `('blue') === null`, `(null) === null`.
  - `resolveTheme(null, true) === 'dark'`, `resolveTheme(null, false) === 'light'`, `resolveTheme('light', true) === 'light'`.
  - `readStoredTheme({ getItem: () => { throw new Error('blocked') } }) === null`.
  - `writeStoredTheme('dark', { setItem: () => { throw new Error('blocked') } })` does not throw.
- [ ] **Step 2: Run** `npx vitest run src/lib/theme.test.ts` — expect FAIL (module missing).
- [ ] **Step 3: Implement `src/lib/theme.ts`** with the interface above.
- [ ] **Step 4: Run** the test — expect PASS.
- [ ] **Step 5: `index.html`**: replace the single `theme-color` meta with two (`media="(prefers-color-scheme: light)"` → `#fbfbfa`, `media="(prefers-color-scheme: dark)"` → `#0b0d0e`); add an inline `<script>` in `<head>` before any stylesheet that reads `radref-theme` in try/catch, falls back to `matchMedia('(prefers-color-scheme: dark)')`, and sets `document.documentElement.dataset.theme`. Keep it dependency-free (it duplicates `resolveTheme` deliberately; comment says so). `applyTheme` overwrites both metas' content when the user overrides.
- [ ] **Step 6: Rewrite `ThemeToggle`**: initial state from `document.documentElement.dataset.theme`; on click flip, `writeStoredTheme`, `applyTheme`. Icon-only 44 px button (sun when dark, moon when light, inline stroke SVG `aria-hidden`), `aria-label="Switch to light mode"` / `"Switch to dark mode"`. Also subscribe to `matchMedia` change and apply it only while nothing is stored.
- [ ] **Step 7: Verify** `npm run lint && npm test && npm run build` — all pass.
- [ ] **Step 8: Commit** `Add the theme core, pre-paint script and toggle`.

### Task 2: Tokens and site-wide restyle

**Files:**
- Modify: `src/styles.css`, `CLAUDE.md` (Typography, Colour sections)
- Create: `src/styles.test.ts`

**Interfaces:**
- Produces: CSS tokens used by every later task: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-hairline`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-dark`, `--color-primary-soft`, `--color-accent`, `--color-good`, `--color-good-soft`, `--color-warn`, `--color-warn-soft`, `--font-sans`, `--font-mono`. `--font-serif` is removed.

- [ ] **Step 1: Write the failing test** `src/styles.test.ts` (reads `src/styles.css` with `node:fs`):
  - `test('colour literals only appear in the token blocks')`: strip the `:root { … }` and `[data-theme="dark"] { … }` blocks; assert no `#[0-9a-f]{3,8}\b` and no `rgba?\(` remain anywhere else (shadow colours become tokens too, e.g. `--color-shadow`).
  - `test('dark theme defines every colour token')`: the set of `--color-*` names in `:root` equals the set in `[data-theme="dark"]`.
  - `test('no serif face')`: the file contains neither `Source Serif` nor `@font-face`.
- [ ] **Step 2: Run** `npx vitest run src/styles.test.ts` — expect FAIL.
- [ ] **Step 3: Restyle `src/styles.css`**: palette from Global Constraints; good/warn dark variants that pass 4.5:1 on dark bg; hairline rows instead of bordered cards (`info-card`, `tool-card`, `ref-table`, `lesson-key`, study tabs, quiz, badges, copy block); headings in `--font-sans` with weight and size carrying hierarchy; mono uppercase labels as in the mockup; `--header-h` adjusted to the compact header. Move every literal colour (including the fifth metatarsal `.fm-*` rules, which already use tokens) into tokens.
- [ ] **Step 4: Delete** `public/fonts/` font file reference from CSS only. Do **not** delete the font file yet (anatomy files still use it until Task 9).
- [ ] **Step 5: Run** the test — expect PASS.
- [ ] **Step 6: Update `CLAUDE.md`** Typography (system sans + mono; serif retired) and Colour (both palettes, `data-theme`, two `theme-color` metas; manifest stays light).
- [ ] **Step 7: Verify** lint, test, build. Commit `Restyle the site in the reading-room palette with a dark theme`.

### Task 3: Header and menu

**Files:**
- Modify: `src/App.tsx`, `src/components/CategoryNav.tsx`, `src/styles.css`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 1).

- [ ] **Step 1:** In `App.tsx` replace the raster logo and two-line title with the mono "RR" outline mark (a styled `<span aria-hidden="true">`) and "Rad Ref" text; the link keeps `aria-label="Rad Ref home"`. Header right side: `ThemeToggle` then the menu button, both 44 px icon buttons; the menu button gets `aria-label` `Open menu` / `Close menu` and keeps `aria-expanded`/`aria-controls`.
- [ ] **Step 2:** Restyle the dropdown menu (`.nav-dropdown*`, `.nav-group-label`, `.nav-results`) to hairline rows with mono group labels. No behaviour change in `CategoryNav`.
- [ ] **Step 3: Verify** lint, test, build. Commit `Compact reading-room header with the theme toggle`.

### Task 4: Registry tags and recent items

**Files:**
- Modify: `src/data/calculators.ts`, `src/App.tsx`
- Create: `src/lib/recent.ts`, `src/lib/recent.test.ts`, `src/data/calculators.test.ts` (or extend if it exists)

**Interfaces:**
- Produces: `CalculatorItem.tag?: string`; `RECENT_KEY = 'radref-recent'`; `RECENT_MAX = 6`; `pushRecent(list: string[], path: string, max?: number): string[]` (moves `path` to the front, dedupes, truncates); `readRecent(storage?): string[]` (guarded; invalid JSON → `[]`); `writeRecent(list: string[], storage?): void` (guarded); `recentItems(paths: string[]): IndexedCalculator[]` (drops paths not in the registry, keeps order).

- [ ] **Step 1: Write failing tests** `src/lib/recent.test.ts`:
  - `pushRecent(['/a','/b'], '/b') ⇒ ['/b','/a']`; `pushRecent(['/a','/b','/c'], '/d', 3) ⇒ ['/d','/a','/b']`.
  - `readRecent({ getItem: () => 'not json' }) ⇒ []`; `readRecent({ getItem: () => { throw new Error() } }) ⇒ []`.
  - `recentItems(['/tirads', '/gone']).map(i => i.path) ⇒ ['/tirads']`.
- [ ] **Step 2:** Add to `src/data/calculators.test.ts`: `test('tags are short')` — every `tag` defined is ≤ 12 characters and non-empty.
- [ ] **Step 3: Run** both — expect FAIL.
- [ ] **Step 4: Implement** `src/lib/recent.ts`; add `tag?: string` with a doc comment ("short mono label shown on the home row; only a version or source the page itself states"). Fill tags from what each page states, e.g. TI-RADS `ACR 2017`, Lung-RADS `v2022`, LI-RADS `v2018`, Bosniak `2019`, Fleischner `2017`, PE-RADS `v2026`, PI-RADS `v2.1`, AAST `2018`, Adnexal cyst `SRU 2019`, IR anticoagulation `SIR 2019`, MELD `3.0`, anatomy items `3D`. Leave the tag off where the page states no version.
- [ ] **Step 5:** In `App.tsx`, on `location.pathname` change, if the path is a registry item, `writeRecent(pushRecent(readRecent(), path))`.
- [ ] **Step 6: Run** tests — PASS. Verify lint, build. Commit `Add home-row tags and a recent-items list`.

### Task 5: Tabbed home page

**Files:**
- Modify: `src/pages/HomePage.tsx`, `src/styles.css`
- Create: `src/pages/homeTabs.ts`, `src/pages/homeTabs.test.ts`

**Interfaces:**
- Consumes: `recentItems`, `readRecent` (Task 4), `CalculatorItem.tag`.
- Produces: `type HomeTab = 'calculators' | 'studies' | 'anatomy' | 'recent'`; `parseHomeTab(value: string | null): HomeTab` (default `'calculators'`); `categoriesForTab(tab: Exclude<HomeTab,'recent'>, categories: CalculatorCategory[]): CalculatorCategory[]` (`studies` → the Studies category, `anatomy` → Anatomy, `calculators` → all others, in registry order).

- [ ] **Step 1: Write failing tests**: `parseHomeTab('studies') === 'studies'`, `parseHomeTab('bogus') === 'calculators'`, `parseHomeTab(null) === 'calculators'`; `categoriesForTab('calculators', categories)` contains neither `Studies` nor `Anatomy` and contains `Trauma`; `categoriesForTab('anatomy', categories).map(c => c.name)` equals `['Anatomy']`.
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** `homeTabs.ts` — PASS.
- [ ] **Step 4: Rebuild `HomePage`**: search field at top (label kept for screen readers, `/` hint shown only at ≥ 900 px and focusing the field on `/` keypress when focus is not in an input); `role="tablist"` row of four tabs mirroring `StudyPage`'s pattern, tab in `?tab=` (omitted for `calculators`); per tab, mono uppercase group labels (category name, or `group` for Studies/Anatomy) and hairline rows: name left, `tag` right in mono. Recent tab uses `recentItems(readRecent())` with an empty state ("Pages you open appear here."). Searching replaces tab content with result rows (category shown as the tag). Keep category blurbs, `InstallButton` and the search count line, restyled.
- [ ] **Step 5: Verify** lint, test, build. Commit `Turn the home page into a tabbed index`.

### Task 6: ChoiceGroup and the TI-RADS calculator

**Files:**
- Create: `src/components/ChoiceGroup.tsx`, `src/components/choiceKeys.ts`, `src/components/choiceKeys.test.ts`
- Modify: `src/logic/tirads.ts` (export the points tables only), `src/pages/TiradsPage.tsx`, `src/styles.css`

**Interfaces:**
- Produces: `nextChoiceIndex(current: number, key: string, count: number): number | null` (ArrowRight/ArrowDown +1 wrapping, ArrowLeft/ArrowUp −1 wrapping, Home 0, End count−1, else null); `ChoiceGroup<T extends string>(props: { label: string; value: T; options: { value: T; label: string; detail?: string }[]; onChange: (value: T) => void; layout?: 'row' | 'stack' })` rendering `role="radiogroup"` with `aria-label`, buttons `role="radio"` `aria-checked`, roving `tabIndex`, `detail` shown right-aligned in mono (used for points). `export const tiradsPoints = { composition, echogenicity, shape, margin, focus }` from `src/logic/tirads.ts` (the existing private tables, values unchanged).

- [ ] **Step 1: Write failing tests** `choiceKeys.test.ts`: `(0,'ArrowRight',3)=1`, `(2,'ArrowRight',3)=0`, `(0,'ArrowLeft',3)=2`, `(1,'Home',3)=0`, `(0,'End',3)=2`, `(0,'a',3)=null`. Add to `src/logic/tirads.test.ts`: `tiradsPoints.composition.solid === 2`, `tiradsPoints.echogenicity.veryHypoechoic === 3` (values from the ACR table already pinned in that file).
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** `choiceKeys.ts`, the export, and `ChoiceGroup` (`layout='stack'` = full-width buttons in a one- or two-column grid; `row` = joined segmented row). **Step 4: Run** — PASS.
- [ ] **Step 5: TI-RADS page**: composition, echogenicity, shape, margin become `ChoiceGroup layout="stack"` with every current option and its current label, `detail` = `+N` from `tiradsPoints`. Laterality and pole stay `<select>`. Echogenic foci stay checkboxes, each label suffixed with its points. Intro becomes the compact title row (name, mono `ACR 2017` tag, description, source note kept). Result card restyled as the strip: large mono category, points, recommendation; copy blocks below.
- [ ] **Step 6: Verify** lint, test (TI-RADS tests unchanged and passing), build. Commit `Add ChoiceGroup and move TI-RADS to segmented inputs`.

### Task 7: Remaining calculators

**Files:**
- Modify: the 16 other pages with `<select>`: `AastOrganInjuryPage`, `AdnexalCystPage`, `BosniakPage`, `ContrastPremedicationPage`, `EarlyPregnancyLossPage`, `EllipsoidVolumePage`, `FleischnerPage`, `IncidentalPage`, `IrAnticoagulationPage`, `LiradsPage`, `LungRadsPage`, `MeldPage`, `OradsPage`, `PERadsPage`, `PancreaticCystPage`, `PiRadsPage` (all under `src/pages/`).

**Interfaces:**
- Consumes: `ChoiceGroup` (Task 6).

- [ ] **Step 1:** Per page, convert a `<select>` to `ChoiceGroup` when it has ≤ 5 options whose labels fit the stack layout; otherwise keep the `<select>` (restyled by Task 2). Same `value`s, same `onChange` state updates, same labels. Use `layout="row"` only when every label is one or two short words. Apply the compact title row and result-strip classes from Task 6.
- [ ] **Step 2:** After each few pages, `npm test` — every existing study and logic test passes unchanged. If one fails, the conversion changed a value: fix the page, not the test.
- [ ] **Step 3: Verify** lint, test, build. Commit `Move the calculators to segmented inputs`.

### Task 8: Shared anatomy stylesheet and guard test

**Files:**
- Create: `public/anatomy/shared/radref.css`, `src/anatomy.test.ts`, `src/anatomy-colours.json`

**Interfaces:**
- Produces: shared tokens `--rr-bg`, `--rr-surface`, `--rr-hairline`, `--rr-border`, `--rr-text`, `--rr-muted`, `--rr-accent`, `--rr-font-sans`, `--rr-font-mono` (theme-following, on `:root` and `[data-theme="dark"]`), and `--rr-view-bg`, `--rr-view-surface`, `--rr-view-text`, `--rr-view-muted`, `--rr-view-border` (always dark, for in-canvas overlays and the viewport). Base rules for `button`, `select`, `input[type=range]`, `input[type=checkbox]` and a `.rr-overlay` class. A pre-paint snippet each document inlines (Task 9) that reads `radref-theme`, applies `data-theme`, and listens for `storage` events on that key.

- [ ] **Step 1: Snapshot before any anatomy edit.** One-off node script (not committed) writes `src/anatomy-colours.json`: for each of the 16 files, every custom property whose value is a hex or `rgb()` colour, as `{ "<file>": { "--name": "<value>" } }`, read from the current `HEAD` versions.
- [ ] **Step 2: Write `src/anatomy.test.ts`** (node fs, iterates the 16 files). The first three are written as `test.todo` with their assertions in a comment until Task 9 flips them; the fourth is live:
  - `test('links the shared stylesheet')`: top-level files contain `href="shared/radref.css"`, `online/` files `href="../shared/radref.css"`.
  - `test('follows the site theme')`: contains `radref-theme` and `addEventListener('storage'`.
  - `test('no remote fonts or CDNs')`: no `https://`/`http://` in `<link>` or `<script src>`, no `fonts.googleapis`, no `Source Serif`.
  - `test('structure colours unchanged')`: for every variable in the snapshot, the file still defines it with the same value, unless the name is in that file's `CHROME` allowlist declared in the test (one array per file; each entry is a chrome variable deliberately remapped in Task 9).
- [ ] **Step 3: Run** `npx vitest run src/anatomy.test.ts` — three todos reported, the colour test PASSES (nothing edited yet).
- [ ] **Step 4: Write `radref.css`** per the interface.
- [ ] **Step 5: Verify** lint, test, build. Commit `Add the shared anatomy stylesheet and its guard test`.

### Task 9: Migrate the 16 anatomy viewers

**Files:**
- Modify: `public/anatomy/{otic-capsule,ossicular-chain,shoulder,knee,wrist,ankle}.html`, `public/anatomy/online/{tmj,skull-base,suprahyoid-spaces,larynx,cervical-spine,brachial-plexus,lumbar-spine,pelvis-si,elbow,foot}.html`, `src/anatomy.test.ts`, `CLAUDE.md` (Anatomy section, Typography), `vite.config.ts` only if the shared CSS is not precached.
- Delete: `public/fonts/source-serif-4-latin-wght-normal.woff2` and its licence, once `grep -r "source-serif" public src` is empty.

**Interfaces:**
- Consumes: `radref.css` tokens (Task 8).

- [ ] **Step 1:** Flip the Task 8 `test.todo`s to real tests. Run — FAIL for all 16.
- [ ] **Step 2: Per file**, in order of the list above, one commit per 2–4 files:
  - add the stylesheet `<link>` and the pre-paint/storage snippet in `<head>`;
  - remove the Source Serif `@font-face` and point the file's font variables at `--rr-font-sans` / `--rr-font-mono`;
  - point its chrome variables (bg, panel, ink, line, dim/muted, UI accent; names differ per file) at the `--rr-*` tokens for chrome around the canvas, and at `--rr-view-*` for overlays inside the viewport (e.g. `.hud`, `.mechs`, `.lbl` in `knee.html`); add each remapped name to that file's `CHROME` allowlist in the test;
  - where one variable serves both UI and scene (ankle `--accent` with emissive `0xE0A100`, tmj `--accent` slice plane `#4fb8c9`, skull base `--cyan`/`--amber`, otic capsule `--cyan`), keep the old value under a new scene variable and move only the UI use to `--rr-accent`;
  - leave the renderer clear colour dark; `larynx.html` `lightBg` and `brachial-plexus.html` `#bgBtn` keep working, default off, and change only the scene background (larynx stops rewriting `--bg`, `--ink`, `--panel`).
  - Run `npx vitest run src/anatomy.test.ts` — that file's cases PASS.
- [ ] **Step 3:** Delete the font file and licence; update `CLAUDE.md` (Anatomy: shared stylesheet, theme snippet, viewport always dark; Typography: font removed; Offline: the woff2 note).
- [ ] **Step 4: Verify** lint, test, build; confirm `dist/sw.js` precache list contains `anatomy/shared/radref.css`. Commit.

### Task 10: Final pass

- [ ] **Step 1:** Grep for leftovers: `--font-serif`, `logo-mark-header.png` (keep the file if the manifest or anything else uses it), `theme-toggle` class without styles, hard-coded colours in `.tsx` `style=` attributes (`EarlyPregnancyLossPage` has two) → move to tokens.
- [ ] **Step 2:** Update `CLAUDE.md` "Current calculators" only if a name changed (none expected) and add a short "Theme" section (key, pre-paint script, anatomy snippet).
- [ ] **Step 3: Verify** `npm run lint && npm test && npm run build`. Commit.
- [ ] **Step 4:** Report to the author and offer a browser check of both themes (home, TI-RADS, a study, the fifth metatarsal page, an embedded and a full-screen anatomy viewer, toggling while embedded) before any merge.
