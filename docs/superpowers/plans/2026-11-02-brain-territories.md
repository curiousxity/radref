# Brain Vascular Territories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A members-only teaching page at `/studies/brain-territories` with an interactive axial map of the brain's arterial and venous territories, sections on each territory group, border zones, variants, venous drainage and dural venous sinus thrombosis, and CC BY example scans.

**Architecture:** A teaching page like `CalvariumPage` (not `StudyPage`). The map is one React component drawing generated SVG: each structure is a superellipse, each territory a sector of it cut along rays from an origin, so neighbours share edges exactly; only the patient's right side is drawn and mirrored. Territory data, geometry and colours are pure modules with tests; the page cites every claim from a sources document written first.

**Tech Stack:** React 19, TypeScript, Vite, vitest (node environment, `react-dom/server` for render tests), inline SVG, CSS tokens in `src/styles.css`.

**Spec:** `docs/superpowers/specs/2026-11-02-brain-territories-design.md`

## Global Constraints

- Route `/studies/brain-territories`, `kind: 'study'`, region `'Neuro'`, `component: membersPage(...)`, `related: ['/carotid-stenosis']`.
- Every colour is a `--color-*` token defined in both `:root` and `[data-theme="dark"]` in `src/styles.css`; no colour literal anywhere else in that file (`src/styles.test.ts`).
- Every territory fill keeps at least 3:1 contrast against `--color-figure-bg` in its palette.
- System fonts only; small labels mono, uppercase, letter-spaced (CLAUDE.md, Typography).
- 44 px minimum touch targets for every control.
- Every claim on the page is read in an abstract or open full text first and logged in `docs/superpowers/research/2026-11-02-brain-territories-sources.md`; a claim that disagrees with its paper goes to the author, not reworded quietly.
- No "not yet reviewed by the site author" note; a note starts "Unchecked draft" only if some claim was not read in its paper.
- Scans: CC BY with a stated version only (no NC, ND, SA; not Radiopaedia), one greyscale panel per file, under 40 KB, `public/scans/brain-territories/<kebab>.jpg`, list exported as `brainTerritoriesScans` from `src/data/scans/brainTerritories.ts`.
- No dev server or browser checks unless the author asks; verify with `npm test`, `npm run lint`, `npm run build`, plus static SVG renders viewed as PNG (Task 2).
- Commits end with the attribution lines from the session's system reminder.

## File map

| File | Responsibility |
|---|---|
| `docs/superpowers/research/2026-11-02-brain-territories-sources.md` | References, claims, verdicts, quotes (Task 1) |
| `src/components/brainTerritoryGeometry.ts` | Superellipse reach, sector and blob path builders (Task 2) |
| `src/components/brainTerritoryShapes.ts` | Families, levels, territories (Task 2) |
| `src/components/brainTerritoryShapes.test.ts` | Data, token and contrast checks (Task 2) |
| `src/styles.css` | `--color-territory-*` tokens, `.bt-*` rules (Tasks 2, 3) |
| `src/components/BrainTerritoryMap.tsx` | The interactive figure (Task 3) |
| `src/components/BrainTerritoryMap.test.tsx` | Render and selection-logic tests (Task 3) |
| `src/pages/BrainTerritoriesPage.tsx` | The page (Task 4) |
| `src/pages/brainTerritories.test.ts` | Page rules (Task 4) |
| `src/data/calculators.ts`, `src/data/calculators.test.ts` | Registry entry and test (Task 4) |
| `src/data/scans/brainTerritories.ts`, `src/data/scans/sources.ts`, `public/scans/brain-territories/` | Scans (Task 5) |
| `docs/superpowers/research/2026-10-28-example-scans.md` | Scan licences and crop notes (Task 5) |
| `CLAUDE.md` | Page list, registry and scans notes (Task 6) |

---

### Task 1: Sources and claims

**Files:**
- Create: `docs/superpowers/research/2026-11-02-brain-territories-sources.md`

**Interfaces:**
- Produces: a reference table (`T-R1`…) with citation, PMID, DOI and how it was read, and a claims table (`T-C1`…) with section, claim as it will read on the page, reference, verdict (`read: abstract`, `read: full text`, `differs`, `not stated`) and the quoted sentence. Tasks 2 and 4 take territory assignments and wording only from claims with a `read` verdict.

The databases reachable from this environment: `eutils.ncbi.nlm.nih.gov`, `api.crossref.org`, `www.ebi.ac.uk` (Europe PMC API; `europepmc.org` itself refuses automated requests), `api.unpaywall.org`, `doi.org`, `pmc.ncbi.nlm.nih.gov`.

- [ ] **Step 1: Confirm the anchor papers on Crossref and PubMed**

Candidates (confirm each DOI before it goes in the table; replace any that do not match):

- Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of human brain: brainstem and cerebellum. Neurology 1996;47(5):1125–1135 (expected DOI `10.1212/wnl.47.5.1125`).
- Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of the human brain: cerebral hemispheres. Neurology 1998;50(6):1699–1708 (expected DOI `10.1212/wnl.50.6.1699`).
- Liu CF et al. Digital 3D brain MRI arterial territories atlas. Sci Data 2023 (open, CC BY).
- Mangla R et al. Border zone infarcts: pathophysiologic and imaging characteristics. RadioGraphics 2011.
- Lazzaro NA et al. Artery of Percheron infarction: imaging patterns and clinical spectrum. AJNR 2010.
- Canedo-Antelo M et al. Radiologic clues to cerebral venous thrombosis. Insights Imaging 2019 (open, CC BY).
- Leach JL et al. Imaging of cerebral venous thrombosis: current techniques, spectrum of findings, and diagnostic pitfalls. RadioGraphics 2006.
- Rhoton AL. The posterior fossa veins. Neurosurgery 2000 (galenic, petrosal and tentorial groups).
- A current guideline or statement on cerebral venous thrombosis imaging (search PubMed).

```bash
curl -s "https://api.crossref.org/works?query.bibliographic=Tatu+Arterial+territories+of+human+brain+brainstem+cerebellum&rows=3" | python3 -c "import json,sys; [print(i['DOI'], i['title'][0], i.get('published',{}).get('date-parts')) for i in json.load(sys.stdin)['message']['items']]"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=Tatu+L[au]+arterial+territories"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=<PMID>"
```

- [ ] **Step 2: Search for open reviews to fill the gaps**

For each section without an open full text source, search Europe PMC for open-access reviews and read their full text:

```bash
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=25&query=%22venous%20territories%22%20AND%20OPEN_ACCESS:y"
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/fullTextXML" > "$SCRATCH/ft/<PMCID>.xml"
```

Topics: hemispheric territories and their variability; lenticulostriate, Heubner, AChA, thalamic arteries; brainstem territories by level; PICA, AICA, SCA; cortical and internal border zones; fetal PCA, artery of Percheron, azygos ACA; lacunes; superficial, deep and posterior fossa venous drainage; venous infarct patterns by sinus or vein; sinus thrombosis direct and indirect signs on CT and MRI; mimics (arachnoid granulations, hypoplastic or atretic transverse sinus, flow gaps on TOF MRV, high-riding jugular bulb, high haematocrit).

- [ ] **Step 3: Log the claims the map needs**

For every territory in Task 2's tables, one claim: which structure lies in which territory at which level. For the venous map, one claim per drainage region. Where sources disagree (venous drainage especially), record each and mark which the drawing follows (the most recent open review, per the spec).

- [ ] **Step 4: Log the claims the sections need**

Per section of the spec's page structure: what each territory supplies, what its infarct looks like, each named syndrome, each border zone and variant pattern, each venous pattern, each sinus thrombosis sign and mimic. Write each claim in the words it will have on the page.

- [ ] **Step 5: List what was left out**

A closing section "Left out" with each claim that no read source states, and any claim where the page and paper differ, flagged as "for the author".

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/research/2026-11-02-brain-territories-sources.md
git commit -m "Brain territories: sources and claims"
```

If any claim is marked "for the author", stop and ask the author before Task 4.

---

### Task 2: Territory data, geometry and colours

**Files:**
- Create: `src/components/brainTerritoryGeometry.ts`
- Create: `src/components/brainTerritoryShapes.ts`
- Create: `src/components/brainTerritoryShapes.test.ts`
- Modify: `src/styles.css` (token blocks only)

**Interfaces:**
- Consumes: Task 1's claims for every territory's `name` and `supply` and its place at each level.
- Produces:
  - `brainTerritoryGeometry.ts`: `type Oval = { cx: number; cy: number; a: number; b: number; n: number }`, `type Point = { x: number; y: number }`, `reach(o: Oval, from: Point, deg: number): number`, `sector(o: Oval, from: Point, start: number, end: number, inner?: number, outer?: number): string`, `outline(o: Oval): string`, `blob(cx: number, cy: number, rx: number, ry: number, rot?: number): string`.
  - `brainTerritoryShapes.ts`: `type Mode = 'arterial' | 'venous'`, `type LevelId`, `type Family`, `type Territory = { id: string; family: Family; name: string; supply: string; d: string }`, `type Part`, `type Level`, `FAMILIES: Record<Family, FamilyInfo>`, `LEVELS: Level[]`, `VIEW`.

- [ ] **Step 1: Write the failing data test**

`src/components/brainTerritoryShapes.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { reach, sector } from './brainTerritoryGeometry'
import { FAMILIES, LEVELS } from './brainTerritoryShapes'
import type { Family } from './brainTerritoryShapes'

const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8')
const LIGHT = (css.match(/:root\s*\{[^}]*\}/g) ?? []).join('\n')
const DARK = (css.match(/\[data-theme="dark"\]\s*\{[^}]*\}/g) ?? []).join('\n')

function token(block: string, name: string): string | undefined {
  return block.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-f]{6})\\s*;`, 'i'))?.[1]
}

// WCAG relative luminance and contrast ratio.
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('brain territory geometry', () => {
  const oval = { cx: 100, cy: 100, a: 50, b: 80, n: 2.5 }

  test('reach finds the edge of the oval', () => {
    expect(reach(oval, { x: 100, y: 100 }, 0)).toBeCloseTo(80, 1)
    expect(reach(oval, { x: 100, y: 100 }, 90)).toBeCloseTo(50, 1)
  })

  test('a sector is a closed path of finite numbers', () => {
    const d = sector(oval, { x: 110, y: 100 }, 300, 60, 0.4, 1)
    expect(d.startsWith('M')).toBe(true)
    expect(d.endsWith('Z')).toBe(true)
    expect(d).not.toMatch(/NaN|Infinity/)
  })
})

describe('brain territory data', () => {
  test('six axial levels, each with arterial and venous territories', () => {
    expect(LEVELS.map((level) => level.id)).toEqual(['medulla', 'pons', 'midbrain', 'basal-ganglia', 'corona-radiata', 'centrum-semiovale'])
    for (const level of LEVELS) {
      expect(level.parts.flatMap((part) => part.arterial).length, level.id).toBeGreaterThan(0)
      expect(level.parts.flatMap((part) => part.venous).length, level.id).toBeGreaterThan(0)
    }
  })

  test('each territory is in its own mode, has a unique id and a finite path', () => {
    for (const level of LEVELS) {
      for (const mode of ['arterial', 'venous'] as const) {
        const territories = level.parts.flatMap((part) => part[mode])
        expect(new Set(territories.map((t) => t.id)).size, `${level.id} ${mode}`).toBe(territories.length)
        for (const t of territories) {
          expect(FAMILIES[t.family].mode, t.id).toBe(mode)
          expect(t.d, t.id).not.toMatch(/NaN|Infinity/)
          expect(t.name.length, t.id).toBeGreaterThan(3)
          expect(t.supply.length, t.id).toBeGreaterThan(3)
        }
      }
      for (const zone of level.borderZones) expect(zone.family, zone.id).toBe('borderZone')
    }
  })

  test('every family is drawn at some level', () => {
    const used = new Set<Family>(LEVELS.flatMap((level) => [...level.parts.flatMap((p) => [...p.arterial, ...p.venous]), ...level.borderZones]).map((t) => t.family))
    expect([...used].sort()).toEqual((Object.keys(FAMILIES) as Family[]).sort())
  })

  // Each fill is separated from its neighbours by a line in the figure background colour, so
  // keeping 3:1 against that colour keeps every boundary visible in both themes.
  test.each(Object.entries(FAMILIES))('%s has a token in both palettes with 3:1 on the figure background', (_, info) => {
    for (const block of [LIGHT, DARK]) {
      const fill = token(block, info.token)
      const bg = token(block, '--color-figure-bg')
      expect(fill, info.token).toBeDefined()
      expect(contrast(fill!, bg!), info.token).toBeGreaterThanOrEqual(3)
    }
  })
})
```

- [ ] **Step 2: Run it to see it fail**

Run: `cd ~/Developer/radref && npx vitest run src/components/brainTerritoryShapes.test.ts`
Expected: FAIL, cannot resolve `./brainTerritoryGeometry`.

- [ ] **Step 3: Write the geometry module**

`src/components/brainTerritoryGeometry.ts`:

```ts
/*
 * Path builders for the vascular territories map. Each structure is a superellipse
 * (|x/a|^n + |y/b|^n = 1); each territory is the part of one between two rays from an origin,
 * between two fractions of the distance to the edge. Neighbouring territories built from the same
 * oval, origin and fractions share their edges exactly. Angles are degrees clockwise from
 * anterior (up) as viewed.
 */

export type Oval = { cx: number; cy: number; a: number; b: number; n: number }
export type Point = { x: number; y: number }

const round = (v: number) => Math.round(v * 10) / 10

function inside(o: Oval, x: number, y: number) {
  return Math.abs((x - o.cx) / o.a) ** o.n + Math.abs((y - o.cy) / o.b) ** o.n <= 1
}

function direction(deg: number): Point {
  const t = (deg * Math.PI) / 180
  return { x: Math.sin(t), y: -Math.cos(t) }
}

/** Distance from `from` (inside the oval) to its edge along the ray at `deg`. */
export function reach(o: Oval, from: Point, deg: number): number {
  const dir = direction(deg)
  let lo = 0
  let hi = 2 * Math.max(o.a, o.b) + Math.hypot(from.x - o.cx, from.y - o.cy)
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (inside(o, from.x + dir.x * mid, from.y + dir.y * mid)) lo = mid
    else hi = mid
  }
  return lo
}

function at(o: Oval, from: Point, deg: number, fraction: number): Point {
  const dir = direction(deg)
  const r = reach(o, from, deg) * fraction
  return { x: from.x + dir.x * r, y: from.y + dir.y * r }
}

function path(points: Point[]) {
  return `M${points.map((p) => `${round(p.x)} ${round(p.y)}`).join(' L')} Z`
}

/**
 * The part of the oval clockwise from `start` to `end`, between `inner` and `outer` fractions of
 * the reach. With `inner` 0 the sector closes at the origin; a full turn with `inner` above 0 is a
 * ring, drawn as one keyhole outline.
 */
export function sector(o: Oval, from: Point, start: number, end: number, inner = 0, outer = 1): string {
  const span = (((end - start) % 360) + 360) % 360 || 360
  const steps = Math.max(2, Math.ceil(span / 3))
  const angles = Array.from({ length: steps + 1 }, (_, i) => start + (span * i) / steps)
  const points = angles.map((deg) => at(o, from, deg, outer))
  if (inner > 0) points.push(...angles.reverse().map((deg) => at(o, from, deg, inner)))
  else if (span < 360) points.push(from)
  return path(points)
}

/** The whole oval's edge. */
export function outline(o: Oval): string {
  return sector(o, { x: o.cx, y: o.cy }, 0, 360)
}

/** An ellipse rotated by `rot` degrees, as a path, for the deep nuclei and ventricles. */
export function blob(cx: number, cy: number, rx: number, ry: number, rot = 0): string {
  const t = (rot * Math.PI) / 180
  const points = Array.from({ length: 48 }, (_, i) => {
    const u = (i / 48) * 2 * Math.PI
    const x = rx * Math.cos(u)
    const y = ry * Math.sin(u)
    return { x: cx + x * Math.cos(t) - y * Math.sin(t), y: cy + x * Math.sin(t) + y * Math.cos(t) }
  })
  return path(points)
}
```

- [ ] **Step 4: Write the shapes module**

`src/components/brainTerritoryShapes.ts`. The angles below are the starting layout; change any territory's place, `name` or `supply` to match Task 1's claims (the sources document is the authority, not this plan). The view is 400 × 460, anterior up, midline x = 200; the drawn side is the patient's right (viewer's left, as on a scan), so for a hemisphere 90° is medial and 270° lateral, and for a midline structure the drawn half spans 180°–360°.

```ts
import { blob, outline, sector } from './brainTerritoryGeometry'
import type { Oval, Point } from './brainTerritoryGeometry'

/*
 * Schematic axial levels for the vascular territories map (BrainTerritoryMap). Not a scan plane:
 * shapes and sizes are simplified. Only the patient's right side (the viewer's left) is drawn;
 * the map mirrors it about the midline. Where each territory sits follows Tatu et al. 1996 and
 * 1998 for the arteries and the sources in
 * docs/superpowers/research/2026-11-02-brain-territories-sources.md for the veins.
 */

export const VIEW = { width: 400, height: 460, midline: 200 }

export type Mode = 'arterial' | 'venous'
export type LevelId = 'medulla' | 'pons' | 'midbrain' | 'basal-ganglia' | 'corona-radiata' | 'centrum-semiovale'

export type Family =
  | 'aca' | 'mca' | 'pca' | 'acha' | 'lenticulostriate' | 'heubner' | 'thalamic'
  | 'vertebral' | 'basilar' | 'pica' | 'aica' | 'sca'
  | 'superior' | 'sylvian' | 'labbe' | 'deep' | 'galenic' | 'petrosal' | 'tentorial'
  | 'borderZone'

export type FamilyInfo = {
  label: string
  mode: Mode
  /** The colour token; perforator families use their parent's colour with stripes. */
  token: string
  striped?: boolean
  /** The page section (element id) that teaches it. */
  section: string
}

export const FAMILIES: Record<Family, FamilyInfo> = {
  aca: { label: 'Anterior cerebral artery', mode: 'arterial', token: '--color-territory-aca', section: 'aca' },
  mca: { label: 'Middle cerebral artery', mode: 'arterial', token: '--color-territory-mca', section: 'mca' },
  pca: { label: 'Posterior cerebral artery', mode: 'arterial', token: '--color-territory-pca', section: 'pca' },
  acha: { label: 'Anterior choroidal artery', mode: 'arterial', token: '--color-territory-acha', section: 'acha' },
  lenticulostriate: { label: 'Lenticulostriate arteries', mode: 'arterial', token: '--color-territory-mca', striped: true, section: 'perforators' },
  heubner: { label: 'Recurrent artery of Heubner', mode: 'arterial', token: '--color-territory-aca', striped: true, section: 'perforators' },
  thalamic: { label: 'Thalamic arteries', mode: 'arterial', token: '--color-territory-pca', striped: true, section: 'perforators' },
  vertebral: { label: 'Vertebral and anterior spinal arteries', mode: 'arterial', token: '--color-territory-vertebral', section: 'brainstem' },
  basilar: { label: 'Basilar artery branches', mode: 'arterial', token: '--color-territory-basilar', section: 'brainstem' },
  pica: { label: 'Posterior inferior cerebellar artery', mode: 'arterial', token: '--color-territory-pica', section: 'cerebellum' },
  aica: { label: 'Anterior inferior cerebellar artery', mode: 'arterial', token: '--color-territory-aica', section: 'cerebellum' },
  sca: { label: 'Superior cerebellar artery', mode: 'arterial', token: '--color-territory-sca', section: 'cerebellum' },
  superior: { label: 'Superior sagittal sinus', mode: 'venous', token: '--color-territory-superior', section: 'venous-superficial' },
  sylvian: { label: 'Superficial middle cerebral vein', mode: 'venous', token: '--color-territory-sylvian', section: 'venous-superficial' },
  labbe: { label: 'Vein of Labbé and transverse sinus', mode: 'venous', token: '--color-territory-labbe', section: 'venous-superficial' },
  deep: { label: 'Deep venous system', mode: 'venous', token: '--color-territory-deep', section: 'venous-deep' },
  galenic: { label: 'Galenic group', mode: 'venous', token: '--color-territory-galenic', section: 'venous-posterior-fossa' },
  petrosal: { label: 'Petrosal group', mode: 'venous', token: '--color-territory-petrosal', section: 'venous-posterior-fossa' },
  tentorial: { label: 'Tentorial group', mode: 'venous', token: '--color-territory-tentorial', section: 'venous-posterior-fossa' },
  borderZone: { label: 'Border zones', mode: 'arterial', token: '--color-territory-border-zone', section: 'border-zones' },
}

export type Territory = { id: string; family: Family; name: string; supply: string; d: string }

/** One structure at a level: a cerebral hemisphere, the brainstem, a cerebellar hemisphere. */
export type Part = {
  outline: string
  /** Midline parts (the brainstem) are drawn half and mirrored, but outlined once, whole. */
  whole?: boolean
  /** CSF round the part, painted before it so it hides what lies beneath. */
  cistern?: string
  arterial: Territory[]
  venous: Territory[]
}

export type Level = {
  id: LevelId
  label: string
  parts: Part[]
  /** Ventricles, drawn over the territories, right side only (mirrored). */
  ventricles: string[]
  /** Overlay for the Border zones switch, arterial mode only. */
  borderZones: Territory[]
}

const t = (id: string, family: Family, name: string, supply: string, d: string): Territory => ({ id, family, name, supply, d })

// --- Supratentorial: one hemisphere oval per level, origin beside the lateral ventricle. ---

const hemisphere = (b: number, a = 88): Oval => ({ cx: 105, cy: 230, a, b, n: 2.6 })

function supratentorial(id: LevelId, label: string, o: Oval, from: Point, split: {
  arterial: [Family, string, string, number, number, number?, number?][]
  venous: [Family, string, string, number, number, number?, number?][]
  deep?: { arterial: Territory[]; venous: Territory[] }
  ventricles: string[]
  borderZones: Territory[]
}): Level {
  const build = (rows: [Family, string, string, number, number, number?, number?][], mode: string) =>
    rows.map(([family, name, supply, start, end, inner = 0, outer = 1], i) => t(`${id}-${mode}-${family}-${i}`, family, name, supply, sector(o, from, start, end, inner, outer)))
  return {
    id,
    label,
    parts: [
      { outline: outline(o), arterial: build(split.arterial, 'a'), venous: build(split.venous, 'v') },
      ...(split.deep ? [{ outline: '', arterial: split.deep.arterial, venous: split.deep.venous }] : []),
    ],
    ventricles: split.ventricles,
    borderZones: split.borderZones,
  }
}

const CS = hemisphere(150, 80)
const CS_FROM = { x: 135, y: 230 }
const CR = hemisphere(175)
const CR_FROM = { x: 150, y: 230 }
const BG = hemisphere(190)
const BG_FROM = { x: 120, y: 230 }

const centrumSemiovale = supratentorial('centrum-semiovale', 'Centrum semiovale', CS, CS_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal and parietal convexity', 'Cortical branches of the ACA', 345, 155],
    ['pca', 'PCA: medial parieto-occipital', 'Cortical branches of the PCA', 155, 190],
    ['mca', 'MCA: lateral convexity', 'Cortical branches of the MCA', 190, 345],
  ],
  venous: [
    ['superior', 'Convexity and its white matter', 'Superficial cortical veins to the superior sagittal sinus', 0, 360, 0.45, 1],
    ['deep', 'Deep white matter', 'Deep medullary veins to the subependymal veins', 0, 360, 0, 0.45],
  ],
  ventricles: [],
  borderZones: [
    t('cs-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(CS, CS_FROM, 335, 355, 0.55, 1)),
    t('cs-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(CS, CS_FROM, 180, 200, 0.55, 1)),
    t('cs-z-int', 'borderZone', 'Internal border zone', 'Between the deep and superficial medullary arteries', sector(CS, CS_FROM, 200, 330, 0.3, 0.42)),
  ],
})

const coronaRadiata = supratentorial('corona-radiata', 'Corona radiata', CR, CR_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal and parietal', 'Cortical branches of the ACA', 350, 145, 0.4],
    ['pca', 'PCA: occipital', 'Cortical branches of the PCA', 145, 200, 0.4],
    ['mca', 'MCA: lateral hemisphere', 'Cortical branches of the MCA', 200, 350, 0.4],
    ['lenticulostriate', 'Corona radiata', 'Lenticulostriate arteries from the MCA', 0, 360, 0, 0.4],
  ],
  venous: [
    ['superior', 'Convexity', 'Superficial cortical veins to the superior sagittal sinus', 290, 220, 0.45, 1],
    ['sylvian', 'Lateral convexity near the Sylvian fissure', 'Superficial middle cerebral vein', 220, 290, 0.45, 1],
    ['deep', 'Deep white matter', 'Deep medullary veins to the subependymal veins', 0, 360, 0, 0.45],
  ],
  ventricles: [blob(178, 225, 9, 55, 0)],
  borderZones: [
    t('cr-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(CR, CR_FROM, 340, 360, 0.55, 1)),
    t('cr-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(CR, CR_FROM, 190, 210, 0.55, 1)),
    t('cr-z-int', 'borderZone', 'Internal border zone', 'Between the lenticulostriate and medullary arteries', sector(CR, CR_FROM, 200, 340, 0.38, 0.48)),
  ],
})

const basalGanglia = supratentorial('basal-ganglia', 'Basal ganglia and thalamus', BG, BG_FROM, {
  arterial: [
    ['aca', 'ACA: medial frontal', 'Cortical branches of the ACA', 0, 105],
    ['pca', 'PCA: occipital lobe', 'Cortical branches of the PCA', 105, 205],
    ['mca', 'MCA: lateral frontal, insula, lateral temporal and parietal', 'Cortical branches of the MCA', 205, 360],
  ],
  venous: [
    ['superior', 'Medial frontal and parietal', 'Superficial cortical veins to the superior sagittal sinus', 330, 150],
    ['labbe', 'Posterior temporal and lateral occipital', 'Vein of Labbé to the transverse sinus', 150, 230],
    ['sylvian', 'Insula and perisylvian cortex', 'Superficial middle cerebral vein to the sphenoparietal or cavernous sinus', 230, 330],
  ],
  deep: {
    arterial: [
      t('bg-a-heubner', 'heubner', 'Caudate head and anterior limb of the internal capsule', 'Recurrent artery of Heubner (ACA)', blob(168, 168, 14, 22, -10)),
      t('bg-a-ls', 'lenticulostriate', 'Lentiform nucleus and upper internal capsule', 'Lenticulostriate arteries (MCA)', blob(145, 215, 17, 34, 12)),
      t('bg-a-acha', 'acha', 'Posterior limb of the internal capsule', 'Anterior choroidal artery (ICA)', blob(165, 245, 6, 26, -25)),
      t('bg-a-thal', 'thalamic', 'Thalamus', 'Thalamic branches of the PCA and posterior communicating artery', blob(182, 262, 15, 26, -8)),
    ],
    venous: [
      t('bg-v-deep-caudate', 'deep', 'Caudate head', 'Thalamostriate vein to the internal cerebral vein', blob(168, 168, 14, 22, -10)),
      t('bg-v-deep-lentiform', 'deep', 'Lentiform nucleus', 'Deep veins to the basal vein of Rosenthal and internal cerebral vein', blob(145, 215, 17, 34, 12)),
      t('bg-v-deep-thal', 'deep', 'Thalamus', 'Internal cerebral vein to the vein of Galen and straight sinus', blob(182, 262, 15, 26, -8)),
    ],
  },
  ventricles: [blob(186, 170, 8, 18, -10), blob(197, 255, 3, 26, 0), blob(185, 330, 7, 14, 20)],
  borderZones: [
    t('bg-z-am', 'borderZone', 'Cortical border zone, ACA and MCA', 'Between the ACA and MCA cortical branches', sector(BG, BG_FROM, 350, 10, 0.6, 1)),
    t('bg-z-mp', 'borderZone', 'Cortical border zone, MCA and PCA', 'Between the MCA and PCA cortical branches', sector(BG, BG_FROM, 195, 215, 0.6, 1)),
  ],
})

// --- Infratentorial and the midbrain level. ---

function midline(o: Oval, from: Point, rows: [Family, string, string, number, number][], venous: [Family, string, string, number, number][], prefix: string, cistern?: Oval): Part {
  const build = (r: [Family, string, string, number, number][], m: string) =>
    r.map(([family, name, supply, start, end], i) => t(`${prefix}-${m}-${i}`, family, name, supply, sector(o, from, start, end)))
  return { outline: outline(o), whole: true, cistern: cistern && outline(cistern), arterial: build(rows, 'a'), venous: build(venous, 'v') }
}

function side(o: Oval, from: Point, rows: [Family, string, string, number, number][], venous: [Family, string, string, number, number][], prefix: string): Part {
  const build = (r: [Family, string, string, number, number][], m: string) =>
    r.map(([family, name, supply, start, end], i) => t(`${prefix}-${m}-${i}`, family, name, supply, sector(o, from, start, end)))
  return { outline: outline(o), arterial: build(rows, 'a'), venous: build(venous, 'v') }
}

const MED = { cx: 200, cy: 175, a: 34, b: 30, n: 2.2 }
const MED_CB = { cx: 135, cy: 285, a: 72, b: 70, n: 2.3 }
const medulla: Level = {
  id: 'medulla',
  label: 'Medulla',
  parts: [
    side(MED_CB, { x: 140, y: 280 }, [
      ['aica', 'Anterior inferior cerebellum and flocculus', 'Anterior inferior cerebellar artery', 300, 20],
      ['pica', 'Inferior cerebellar hemisphere and inferior vermis', 'Posterior inferior cerebellar artery', 20, 300],
    ], [
      ['petrosal', 'Anterior cerebellum', 'Petrosal group to the superior petrosal sinus', 300, 20],
      ['tentorial', 'Inferior and posterior cerebellum', 'Tentorial group to the transverse sinus and torcular', 20, 300],
    ], 'med-cb'),
    midline(MED, { x: 200, y: 175 }, [
      ['vertebral', 'Anteromedial medulla', 'Anterior spinal artery', 340, 360],
      ['vertebral', 'Anterolateral medulla', 'Anterior spinal and vertebral arteries', 300, 340],
      ['pica', 'Lateral medulla', 'Posterior inferior cerebellar and vertebral arteries', 230, 300],
      ['pica', 'Dorsal medulla', 'Posterior inferior cerebellar and posterior spinal arteries', 180, 230],
    ], [
      ['petrosal', 'Medulla', 'Anterior medullary veins to the petrosal group', 180, 360],
    ], 'med-bs', { cx: 200, cy: 175, a: 40, b: 36, n: 2.2 }),
  ],
  ventricles: [blob(200, 215, 14, 7, 0)],
  borderZones: [],
}

const PONS = { cx: 200, cy: 190, a: 50, b: 42, n: 2.2 }
const PONS_CB = { cx: 130, cy: 300, a: 75, b: 72, n: 2.3 }
const PONS_TEMP = { cx: 95, cy: 110, a: 50, b: 62, n: 2.2 }
const pons: Level = {
  id: 'pons',
  label: 'Pons',
  parts: [
    side(PONS_TEMP, { x: 100, y: 115 }, [
      ['mca', 'Lateral temporal lobe', 'Cortical branches of the MCA', 210, 20],
      ['pca', 'Inferior and medial temporal lobe', 'Cortical branches of the PCA', 20, 210],
    ], [
      ['labbe', 'Temporal lobe', 'Vein of Labbé to the transverse sinus', 0, 360],
    ], 'pons-temp'),
    side(PONS_CB, { x: 135, y: 295 }, [
      ['aica', 'Middle cerebellar peduncle and anterior cerebellum', 'Anterior inferior cerebellar artery', 300, 30],
      ['sca', 'Superior cerebellar hemisphere', 'Superior cerebellar artery', 180, 300],
      ['pica', 'Posteromedial cerebellum', 'Posterior inferior cerebellar artery', 30, 180],
    ], [
      ['petrosal', 'Anterior cerebellum', 'Petrosal group to the superior petrosal sinus', 300, 30],
      ['tentorial', 'Lateral and posterior cerebellum', 'Tentorial group to the transverse sinus', 180, 300],
      ['galenic', 'Superior vermis and medial cerebellum', 'Galenic group to the vein of Galen', 30, 180],
    ], 'pons-cb'),
    midline(PONS, { x: 200, y: 190 }, [
      ['basilar', 'Anteromedial pons', 'Paramedian branches of the basilar artery', 330, 360],
      ['basilar', 'Anterolateral pons', 'Short circumferential branches of the basilar artery', 280, 330],
      ['aica', 'Lateral pons', 'Anterior inferior cerebellar artery', 220, 280],
      ['sca', 'Dorsal pons', 'Superior cerebellar artery', 180, 220],
    ], [
      ['petrosal', 'Pons', 'Anterior pontomesencephalic and transverse pontine veins to the petrosal group', 180, 360],
    ], 'pons-bs', { cx: 200, cy: 190, a: 56, b: 48, n: 2.2 }),
  ],
  ventricles: [blob(200, 240, 12, 6, 0)],
  borderZones: [],
}

const MID_H = hemisphere(190)
const MID = { cx: 200, cy: 240, a: 40, b: 38, n: 2.2 }
const midbrain: Level = {
  id: 'midbrain',
  label: 'Midbrain',
  parts: [
    side(MID_H, { x: 115, y: 230 }, [
      ['aca', 'Gyrus rectus and medial orbital frontal', 'ACA', 10, 75],
      ['acha', 'Uncus and anterior hippocampus', 'Anterior choroidal artery', 95, 125],
      ['pca', 'Medial temporal and occipital lobes', 'Cortical branches of the PCA', 125, 215],
      ['mca', 'Lateral frontal and temporal lobes', 'Cortical branches of the MCA', 215, 10],
      ['mca', 'Medial frontal behind the gyrus rectus', 'MCA and ACA', 75, 95],
    ], [
      ['superior', 'Frontal lobe', 'Frontal cortical veins to the superior sagittal sinus', 330, 90],
      ['deep', 'Medial temporal lobe', 'Basal vein of Rosenthal', 90, 170],
      ['labbe', 'Lateral and inferior temporal and occipital', 'Vein of Labbé to the transverse sinus', 170, 260],
      ['sylvian', 'Temporal pole and lateral frontal', 'Superficial middle cerebral vein', 260, 330],
    ], 'mid-h'),
    midline(MID, { x: 200, y: 240 }, [
      ['pca', 'Anteromedial midbrain', 'Paramedian branches of the PCA and basilar tip', 330, 360],
      ['acha', 'Anterolateral midbrain', 'Anterior choroidal and collicular arteries', 280, 330],
      ['pca', 'Lateral midbrain', 'Collicular and posterior medial choroidal arteries', 225, 280],
      ['sca', 'Dorsal midbrain', 'Superior cerebellar and collicular arteries', 180, 225],
    ], [
      ['deep', 'Midbrain', 'Peduncular veins to the basal vein of Rosenthal', 180, 360],
    ], 'mid-bs', { cx: 200, cy: 240, a: 50, b: 50, n: 2.2 }),
  ],
  ventricles: [blob(200, 268, 3, 4, 0), blob(170, 175, 6, 10, 0)],
  borderZones: [],
}

/** Lowest first, as the level picker lists them. */
export const LEVELS: Level[] = [medulla, pons, midbrain, basalGanglia, coronaRadiata, centrumSemiovale]
```

Notes for the implementer:
- `outline: ''` on the deep-nuclei part means no outline; the map skips empty outlines.
- The midbrain hemisphere's sector `['mca', ..., 75, 95]` exists so the hemisphere is tiled with no gap; replace its name and supply with what Task 1 found, or widen its neighbours and drop it.

- [ ] **Step 5: Add the colour tokens**

In `src/styles.css`, add to the `:root` block after the `--color-ear-*` tokens:

```css
  --color-territory-aca: #b5477a;
  --color-territory-mca: #2f7fc1;
  --color-territory-pca: #2e9461;
  --color-territory-acha: #b06f18;
  --color-territory-vertebral: #8a6d3b;
  --color-territory-basilar: #7a5bc4;
  --color-territory-pica: #c2522d;
  --color-territory-aica: #1f8f99;
  --color-territory-sca: #6b8f1f;
  --color-territory-superior: #3a6ea5;
  --color-territory-sylvian: #3f8f7f;
  --color-territory-labbe: #a5673a;
  --color-territory-deep: #8e4fa0;
  --color-territory-galenic: #b04a5a;
  --color-territory-petrosal: #5c7f3a;
  --color-territory-tentorial: #5f64a8;
  --color-territory-border-zone: #111415;
```

and to the `[data-theme="dark"]` block after its `--color-ear-*` tokens:

```css
  --color-territory-aca: #d978a3;
  --color-territory-mca: #5fa6e3;
  --color-territory-pca: #5cc28e;
  --color-territory-acha: #e0a24f;
  --color-territory-vertebral: #c4a271;
  --color-territory-basilar: #a68cf0;
  --color-territory-pica: #ec8461;
  --color-territory-aica: #4fc2cc;
  --color-territory-sca: #a3c454;
  --color-territory-superior: #6f9fd6;
  --color-territory-sylvian: #6cc2b0;
  --color-territory-labbe: #d69a6a;
  --color-territory-deep: #c086d3;
  --color-territory-galenic: #e07d8c;
  --color-territory-petrosal: #93b86b;
  --color-territory-tentorial: #9599dc;
  --color-territory-border-zone: #e6e8e9;
```

- [ ] **Step 6: Run the tests**

Run: `npx vitest run src/components/brainTerritoryShapes.test.ts src/styles.test.ts`
Expected: PASS. If a contrast case fails, darken (light) or lighten (dark) that token until it passes; keep hues apart.

- [ ] **Step 7: Render each level and look at it**

A throwaway script in the scratchpad (not committed) writes each level and mode as a plain SVG, using the token values above, and converts it to PNG with Quick Look:

```bash
SCRATCH=/private/tmp/claude-501/-Users-mohammedezuddin-Desktop/b36b186a-069b-4746-ba9f-7987a851b445/scratchpad
mkdir -p "$SCRATCH/bt-render"
cat > "$SCRATCH/bt-render/render.test.ts" <<'EOF'
import { writeFileSync } from 'node:fs'
import { test } from 'vitest'
import { FAMILIES, LEVELS, VIEW } from '/Users/mohammedezuddin/Developer/radref/src/components/brainTerritoryShapes'
const css = (await import('node:fs')).readFileSync('/Users/mohammedezuddin/Developer/radref/src/styles.css', 'utf8')
const light = css.match(/:root\s*\{[^}]*\}/)![0]
const colour = (token: string) => light.match(new RegExp(`${token}\\s*:\\s*(#[0-9a-f]{6})`))![1]
test('render', () => {
  for (const level of LEVELS) for (const mode of ['arterial', 'venous'] as const) {
    const mirror = `matrix(-1 0 0 1 ${VIEW.width} 0)`
    const body = level.parts.map((p) => {
      const ts = p[mode].map((t) => `<path d="${t.d}" fill="${colour(FAMILIES[t.family].token)}" stroke="#eceeef" stroke-width="1.5"/>`).join('')
      return `${p.cistern ? `<path d="${p.cistern}" fill="#eceeef"/>` : ''}<g>${ts}</g><g transform="${mirror}">${ts}</g>${p.outline ? `<path d="${p.outline}" fill="none" stroke="#5f676b"/>` : ''}${p.outline && !p.whole ? `<path transform="${mirror}" d="${p.outline}" fill="none" stroke="#5f676b"/>` : ''}`
    }).join('')
    const vents = level.ventricles.map((d) => `<path d="${d}" fill="#eceeef"/><path transform="${mirror}" d="${d}" fill="#eceeef"/>`).join('')
    const zones = mode === 'arterial' ? level.borderZones.map((z) => `<path d="${z.d}" fill="none" stroke="#111415" stroke-dasharray="3 2"/>`).join('') : ''
    writeFileSync(`${process.env.OUT}/${level.id}-${mode}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.width} ${VIEW.height}" width="800" height="920"><rect width="100%" height="100%" fill="#eceeef"/>${body}${vents}${zones}</svg>`)
  }
})
EOF
cd ~/Developer/radref && OUT="$SCRATCH/bt-render" npx vitest run --root / "$SCRATCH/bt-render/render.test.ts"
cd "$SCRATCH/bt-render" && for f in *.svg; do qlmanage -t -s 800 -o . "$f" >/dev/null 2>&1; done; ls *.png
```

Read each PNG with the Read tool. Check: hemispheres tiled with no gaps or overlaps, ACA a medial strip, MCA lateral, PCA posterior; deep nuclei in the right places; brainstem halves meet at the midline; cerebellum behind the brainstem; ventricles sensible; border zones on the boundaries. Adjust angles, ovals and blobs in `brainTerritoryShapes.ts` and re-render until each level reads correctly. (If `vitest --root /` refuses the path, copy the script into `src/components/` as `bt-render.test.ts`, run it, and delete it before committing.)

- [ ] **Step 8: Commit**

```bash
git add src/components/brainTerritoryGeometry.ts src/components/brainTerritoryShapes.ts src/components/brainTerritoryShapes.test.ts src/styles.css
git commit -m "Brain territories: map geometry, six axial levels and territory colours"
```

---

### Task 3: The interactive map

**Files:**
- Create: `src/components/BrainTerritoryMap.tsx`
- Create: `src/components/BrainTerritoryMap.test.tsx`
- Modify: `src/styles.css` (rules after the `.ear-anatomy` block)

**Interfaces:**
- Consumes: `FAMILIES`, `LEVELS`, `VIEW`, `Family`, `Level`, `Mode`, `Territory` from Task 2; `ChoiceGroup` from `src/components/ChoiceGroup.tsx` (`label`, `value`, `options: { value, label }[]`, `onChange`, `layout`).
- Produces: `export function BrainTerritoryMap()` (no props); `export function territoriesShown(level: Level, mode: Mode, zones: boolean): Territory[]`; `export function familiesShown(level: Level, mode: Mode, zones: boolean): Family[]`.

- [ ] **Step 1: Write the failing test**

`src/components/BrainTerritoryMap.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, test } from 'vitest'
import { BrainTerritoryMap, familiesShown, territoriesShown } from './BrainTerritoryMap'
import { LEVELS } from './brainTerritoryShapes'

const level = (id: string) => LEVELS.find((l) => l.id === id)!

describe('brain territory map', () => {
  test('border zones show only in arterial mode with the switch on', () => {
    const bg = level('basal-ganglia')
    expect(familiesShown(bg, 'arterial', false)).not.toContain('borderZone')
    expect(familiesShown(bg, 'arterial', true)).toContain('borderZone')
    expect(familiesShown(bg, 'venous', true)).not.toContain('borderZone')
  })

  test('the legend lists each family at the level once, in drawing order', () => {
    const families = familiesShown(level('pons'), 'arterial', false)
    expect(new Set(families).size).toBe(families.length)
    expect(families).toEqual(expect.arrayContaining(['basilar', 'aica', 'sca', 'pica', 'mca', 'pca']))
    expect(families).not.toContain('aca')
  })

  test('territoriesShown has every part of the level for the mode', () => {
    const mid = level('midbrain')
    expect(territoriesShown(mid, 'venous', false).length).toBe(mid.parts.flatMap((p) => p.venous).length)
  })

  test('it renders the basal ganglia level by default with a legend button per family', () => {
    const html = renderToStaticMarkup(<BrainTerritoryMap />)
    expect(html).toContain('Basal ganglia and thalamus')
    const families = familiesShown(level('basal-ganglia'), 'arterial', false)
    expect(html.match(/class="bt-key"/g)?.length).toBe(families.length)
    expect(html).toContain('Tap a territory')
  })
})
```

- [ ] **Step 2: Run it to see it fail**

Run: `npx vitest run src/components/BrainTerritoryMap.test.tsx`
Expected: FAIL, cannot resolve `./BrainTerritoryMap`.

- [ ] **Step 3: Write the component**

`src/components/BrainTerritoryMap.tsx`:

```tsx
import { useState } from 'react'
import { ChoiceGroup } from './ChoiceGroup'
import { FAMILIES, LEVELS, VIEW } from './brainTerritoryShapes'
import type { Family, Level, LevelId, Mode, Territory } from './brainTerritoryShapes'

/*
 * The vascular territories map: one schematic axial level at a time, coloured by arterial supply
 * or venous drainage. The legend buttons are the keyboard route and the selector; tapping the
 * drawing selects the same thing with the exact sub-territory named. Shapes and their sources are
 * in brainTerritoryShapes.ts.
 */

export function territoriesShown(level: Level, mode: Mode, zones: boolean): Territory[] {
  const drawn = level.parts.flatMap((part) => part[mode])
  return mode === 'arterial' && zones ? [...drawn, ...level.borderZones] : drawn
}

export function familiesShown(level: Level, mode: Mode, zones: boolean): Family[] {
  return [...new Set(territoriesShown(level, mode, zones).map((t) => t.family))]
}

function paint(family: Family) {
  return FAMILIES[family].striped ? `url(#bt-stripe-${family})` : `var(${FAMILIES[family].token})`
}

function swatch(family: Family) {
  const colour = `var(${FAMILIES[family].token})`
  if (family === 'borderZone') return { background: `repeating-linear-gradient(45deg, ${colour} 0 2px, var(--color-figure-bg) 2px 5px)` }
  return FAMILIES[family].striped
    ? { background: `repeating-linear-gradient(45deg, ${colour} 0 4px, var(--color-figure-bg) 4px 6px)` }
    : { background: colour }
}

type Selection = { family: Family; territory?: Territory }

const MIRROR = `matrix(-1 0 0 1 ${VIEW.width} 0)`

export function BrainTerritoryMap() {
  const [levelId, setLevelId] = useState<LevelId>('basal-ganglia')
  const [mode, setMode] = useState<Mode>('arterial')
  const [zones, setZones] = useState(false)
  const [selected, setSelected] = useState<Selection | null>(null)

  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0]
  const shown = territoriesShown(level, mode, zones)
  const families = familiesShown(level, mode, zones)
  // A selection survives a change of level or mode only if it is still on the map.
  const active = selected && families.includes(selected.family)
    ? { family: selected.family, territory: selected.territory && shown.includes(selected.territory) ? selected.territory : undefined }
    : null

  const state = (t: Territory) => (active ? (t.family === active.family ? ' bt-on' : ' bt-dim') : '')
  const stripes = [...new Set(shown.map((t) => t.family))].filter((f) => FAMILIES[f].striped)

  // Both sides draw the same Territory object, so a tap on either selects the one in `shown`.
  const draw = (t: Territory, key: string, zone = false) => (
    <path
      key={key}
      d={t.d}
      className={`${zone ? 'bt-zone' : 'bt-t'}${state(t)}`}
      style={zone ? undefined : { fill: paint(t.family) }}
      onClick={() => setSelected({ family: t.family, territory: t })}
    />
  )

  return (
    <div className="bt-map">
      <div className="bt-controls">
        <ChoiceGroup label="Level" layout="stack" value={levelId} onChange={setLevelId}
          options={LEVELS.map((l) => ({ value: l.id, label: l.label }))} />
        <ChoiceGroup label="Show" layout="row" value={mode} onChange={setMode}
          options={[{ value: 'arterial', label: 'Arterial' }, { value: 'venous', label: 'Venous' }]} />
        {mode === 'arterial' && (
          <button type="button" className="choice-option bt-zones-toggle" aria-pressed={zones} onClick={() => setZones(!zones)}>
            Border zones {zones ? 'on' : 'off'}
          </button>
        )}
      </div>

      <svg className="bt-svg" viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-labelledby="bt-title">
        <title id="bt-title">{`${level.label}: ${mode} territories, schematic axial level`}</title>
        <defs>
          {stripes.map((f) => (
            <pattern key={f} id={`bt-stripe-${f}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="6" height="6" style={{ fill: `var(${FAMILIES[f].token})` }} />
              <line x1="0" y1="0" x2="0" y2="6" className="bt-stripe" />
            </pattern>
          ))}
          <pattern id="bt-zone-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <line x1="0" y1="0" x2="0" y2="5" className="bt-hatch" />
          </pattern>
        </defs>
        {level.parts.map((part, i) => (
          <g key={i}>
            {part.cistern && <path d={part.cistern} className="bt-csf" />}
            <g>{part[mode].map((t) => draw(t, t.id))}</g>
            <g transform={MIRROR}>{part[mode].map((t) => draw(t, `${t.id}-l`))}</g>
            {part.outline && <path d={part.outline} className="bt-outline" />}
            {part.outline && !part.whole && <path d={part.outline} className="bt-outline" transform={MIRROR} />}
          </g>
        ))}
        {level.ventricles.map((d) => (
          <g key={d}>
            <path d={d} className="bt-csf" />
            <path d={d} className="bt-csf" transform={MIRROR} />
          </g>
        ))}
        {mode === 'arterial' && zones && level.borderZones.map((z) => (
          <g key={z.id}>
            {draw(z, z.id, true)}
            <g transform={MIRROR}>{draw(z, `${z.id}-l`, true)}</g>
          </g>
        ))}
        <text x="12" y="24" className="bt-side">R</text>
        <text x={VIEW.width - 12} y="24" className="bt-side bt-side-end">L</text>
      </svg>

      <p className="bt-caption" aria-live="polite">
        {active ? (
          <>
            <strong>{active.territory?.name ?? FAMILIES[active.family].label}</strong>
            {active.territory && <> · {active.territory.supply}</>}{' '}
            <a href={`#${FAMILIES[active.family].section}`}>Read more</a>
          </>
        ) : 'Tap a territory or pick one below.'}
      </p>

      <ul className="bt-legend">
        {families.map((f) => (
          <li key={f}>
            <button type="button" className="bt-key" aria-pressed={active?.family === f}
              onClick={() => setSelected(active?.family === f ? null : { family: f })}>
              <span className="bt-swatch" style={swatch(f)} aria-hidden="true" />
              {FAMILIES[f].label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 4: Add the styles**

In `src/styles.css`, after the `.ear-anatomy` rules:

```css
/* Vascular territories map (BrainTerritoryMap). Fills come from --color-territory-* tokens. */
.bt-map { display: grid; gap: 0.75rem; }
.bt-controls { display: grid; gap: 0.25rem; }
.bt-controls .choice-group--stack { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.bt-zones-toggle { justify-content: center; margin-top: 0.5rem; }
.bt-zones-toggle[aria-pressed='true'] { border-color: var(--color-primary); background: var(--color-primary-soft); box-shadow: inset 0 0 0 1px var(--color-primary); }
.bt-svg { display: block; width: 100%; max-width: 32rem; height: auto; margin: 0 auto; background: var(--color-figure-bg); border: 1px solid var(--color-hairline); border-radius: var(--radius-sm); }
.bt-svg .bt-t { stroke: var(--color-figure-bg); stroke-width: 1.5; stroke-linejoin: round; cursor: pointer; transition: opacity 120ms; }
.bt-svg .bt-dim { opacity: 0.28; }
.bt-svg .bt-t.bt-on { stroke: var(--color-text); stroke-width: 2; }
.bt-svg .bt-zone { fill: url(#bt-zone-hatch); stroke: var(--color-territory-border-zone); stroke-width: 1.5; stroke-dasharray: 4 3; cursor: pointer; }
.bt-svg .bt-hatch { stroke: var(--color-territory-border-zone); stroke-width: 1.6; }
.bt-svg .bt-stripe { stroke: var(--color-figure-bg); stroke-width: 2; }
.bt-svg .bt-csf { fill: var(--color-figure-bg); }
.bt-svg .bt-outline { fill: none; stroke: var(--color-text-muted); stroke-width: 1.5; pointer-events: none; }
.bt-svg .bt-side { font-family: var(--font-mono); font-size: 14px; font-weight: 600; fill: var(--color-text-muted); }
.bt-svg .bt-side-end { text-anchor: end; }
.bt-caption { min-height: 2.8em; margin: 0; font-size: 0.92rem; line-height: 1.45; }
.bt-caption a { color: var(--color-primary); text-decoration: underline; text-underline-offset: 2px; }
.bt-legend { display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr)); gap: 0.4rem; margin: 0; padding: 0; list-style: none; }
.bt-key { display: flex; align-items: center; gap: 0.6rem; width: 100%; min-height: 44px; padding: 0.4rem 0.7rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); font: inherit; font-size: 0.86rem; text-align: left; cursor: pointer; }
.bt-key[aria-pressed='true'] { border-color: var(--color-primary); box-shadow: inset 0 0 0 1px var(--color-primary); }
.bt-swatch { flex: none; width: 1.1rem; height: 1.1rem; border-radius: 3px; }
```

- [ ] **Step 5: Run the tests**

Run: `npx vitest run src/components/BrainTerritoryMap.test.tsx src/components/brainTerritoryShapes.test.ts src/styles.test.ts`
Expected: PASS.

- [ ] **Step 6: Type-check and lint**

Run: `npm run lint && npx tsc -b`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/BrainTerritoryMap.tsx src/components/BrainTerritoryMap.test.tsx src/styles.css
git commit -m "Brain territories: interactive map with level picker, arterial and venous modes and border zones"
```

---

### Task 4: The page and its registry entry

**Files:**
- Create: `src/pages/BrainTerritoriesPage.tsx`
- Create: `src/pages/brainTerritories.test.ts`
- Modify: `src/data/calculators.ts` (Neuro block, after the calvarial lesions entry)
- Modify: `src/data/calculators.test.ts` (the "reference pages are studies" test)

**Interfaces:**
- Consumes: `BrainTerritoryMap`; `FAMILIES` (its `section` values are the page's element ids: `aca`, `mca`, `pca`, `acha`, `perforators`, `brainstem`, `cerebellum`, `border-zones`, `venous-superficial`, `venous-deep`, `venous-posterior-fossa`); `Cite`, `LessonReferences`, `LessonReference` from `src/components/LessonPage.tsx`; Task 1's claims.
- Produces: `export function BrainTerritoriesPage()`; references in a `DOI` object and `references: LessonReference[]` (Task 5 adds scan sources and `ScanFigures`).

- [ ] **Step 1: Write the failing tests**

`src/pages/brainTerritories.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { FAMILIES } from '../components/brainTerritoryShapes'

const page = readFileSync(new URL('./BrainTerritoriesPage.tsx', import.meta.url), 'utf8')

describe('brain territories page', () => {
  // The map's "Read more" links go to these sections.
  test('every territory family has its section on the page', () => {
    for (const section of new Set(Object.values(FAMILIES).map((f) => f.section))) {
      expect(page, section).toContain(`id="${section}"`)
    }
  })

  test('every reference has a DOI', () => {
    const block = page.slice(page.indexOf('const references'), page.indexOf(']', page.indexOf('const references')))
    const citations = block.match(/citation:/g)?.length ?? 0
    expect(citations).toBeGreaterThan(5)
    expect(block.match(/doi: /g)?.length).toBe(citations)
  })

  // Every claim was read in its paper first (docs/superpowers/research/2026-11-02-brain-territories-sources.md).
  test('the source note does not mark the page as an unchecked draft', () => {
    expect(page).not.toContain('Unchecked draft')
    expect(page).toContain('The drawings are schematics')
  })

  test('the sinus thrombosis section has the mimics', () => {
    for (const mimic of ['arachnoid granulation', 'hypoplastic', 'flow gap', 'jugular bulb', 'haematocrit']) {
      expect(page.toLowerCase(), mimic).toContain(mimic)
    }
  })
})
```

Add one more `test` per key claim once the page is written, each quoting its source sentence in a comment, as `src/pages/hearingLoss.test.ts` does (at least: the artery of Percheron pattern, the empty delta sign, the vein of Labbé pattern, bilateral thalami with deep venous thrombosis, the lateral medullary territory).

In `src/data/calculators.test.ts`, change the teaching-pages loop to:

```ts
    for (const path of ['/studies/calvarium', '/studies/hearing-loss-ct', '/studies/brain-territories']) {
```

and update the comment above it to "The calvarial lesions, hearing loss and brain territories pages are teaching pages…".

- [ ] **Step 2: Run them to see them fail**

Run: `npx vitest run src/pages/brainTerritories.test.ts src/data/calculators.test.ts`
Expected: FAIL (file not found; path not in registry).

- [ ] **Step 3: Write the page**

`src/pages/BrainTerritoriesPage.tsx`, structured as below. Every sentence of prose comes from a claim with a `read` verdict in the sources document, cited inline with `<Cite doi={DOI.x}>`. Use `info-card` sections with `id`s exactly as listed.

```tsx
import { BrainTerritoryMap } from '../components/BrainTerritoryMap'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const DOI = {
  tatu1996: '10.1212/wnl.47.5.1125', // confirm in Task 1
  tatu1998: '10.1212/wnl.50.6.1699', // confirm in Task 1
  // …one key per reference from the sources document
}

const references: LessonReference[] = [
  { citation: 'Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of human brain: brainstem and cerebellum. Neurology. 1996;47(5):1125-1135.', doi: DOI.tatu1996 },
  { citation: 'Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of the human brain: cerebral hemispheres. Neurology. 1998;50(6):1699-1708.', doi: DOI.tatu1998 },
  // …the rest, in the order first cited
]

export function BrainTerritoriesPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>Vascular territories of the brain</h2>
          <p>{/* two or three sentences: what the page is for (placing an infarct or a venous lesion), and that territories vary between people */}</p>
          <p className="source-note">
            Written on 2026-11-02 with the paper databases reachable; every statement was read in its source first. The drawings are schematics,
            not to scale, after Tatu et al. for the arteries. The scans are panels from open-access figures published under CC BY licences, credited under each.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Map</h3>
        <figure className="fm-figure">
          <BrainTerritoryMap />
          <figcaption>Schematic axial levels, not scan planes; the patient's right is on the left, as on a scan. Arterial territories after <Cite doi={DOI.tatu1998}>Tatu et al. (1998)</Cite> and <Cite doi={DOI.tatu1996}>(1996)</Cite>.</figcaption>
        </figure>
      </section>

      <section className="info-card" id="hemispheres">
        <h3>The cerebral hemispheres</h3>
        <h4 className="fm-subhead" id="aca">Anterior cerebral artery</h4>
        {/* supply, infarct appearance, scan (Task 5) */}
        <h4 className="fm-subhead" id="mca">Middle cerebral artery</h4>
        {/* M1 perforators, superior and inferior divisions, infarct appearance, scan */}
        <h4 className="fm-subhead" id="pca">Posterior cerebral artery</h4>
        <h4 className="fm-subhead" id="acha">Anterior choroidal artery</h4>
        <h4 className="fm-subhead" id="perforators">Deep perforators</h4>
        {/* lenticulostriates, Heubner, thalamic arteries */}
      </section>

      <section className="info-card" id="brainstem">
        <h3>Brainstem</h3>
        {/* anteromedial, anterolateral, lateral, dorsal at each level; sourced syndromes */}
      </section>

      <section className="info-card" id="cerebellum">
        <h3>Cerebellum</h3>
        {/* PICA, AICA, SCA */}
      </section>

      <section className="info-card" id="border-zones">
        <h3>Border zones, variants and lacunes</h3>
        {/* cortical and internal border zones; fetal PCA, artery of Percheron, azygos ACA; lacunes */}
      </section>

      <section className="info-card" id="venous">
        <h3>Venous drainage</h3>
        <h4 className="fm-subhead" id="venous-superficial">Superficial veins</h4>
        <h4 className="fm-subhead" id="venous-deep">Deep veins</h4>
        <h4 className="fm-subhead" id="venous-posterior-fossa">Posterior fossa veins</h4>
        {/* which pattern points to which sinus or vein; crosses arterial boundaries; variability */}
      </section>

      <section className="info-card" id="sinus-thrombosis">
        <h3>Dural venous sinus thrombosis</h3>
        {/* direct signs, indirect signs, mimics (arachnoid granulations, hypoplastic or atretic transverse sinus, flow gaps on TOF MRV, high-riding jugular bulb, high haematocrit) */}
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
```

The comments in this block mark what each section must say; replace every one with the sourced prose (lists in `plain-list`, short paragraphs in `fm-lead`). No comment placeholders stay in the committed file.

- [ ] **Step 4: Add the registry entry**

In `src/data/calculators.ts`, after the `/studies/calvarium` line:

```ts
  { path: '/studies/brain-territories', region: 'Neuro', kind: 'study', name: 'Vascular territories of the brain', related: ['/carotid-stenosis'], description: 'Arterial and venous territories on an interactive axial map, border zones and variants, venous infarct patterns and dural venous sinus thrombosis.', keywords: ['vascular territories', 'arterial territories', 'venous territories', 'stroke', 'infarct', 'aca', 'mca', 'pca', 'anterior choroidal', 'lenticulostriate', 'heubner', 'thalamoperforator', 'percheron', 'fetal pca', 'watershed', 'border zone', 'lacune', 'brainstem', 'pica', 'aica', 'sca', 'wallenberg', 'lateral medullary', 'venous infarct', 'cerebral venous thrombosis', 'cvt', 'dural venous sinus thrombosis', 'superior sagittal sinus', 'transverse sinus', 'vein of labbe', 'internal cerebral vein', 'straight sinus', 'empty delta', 'cord sign', 'arachnoid granulation', 'neuro', 'brain', 'lesson', 'teaching'], component: membersPage(() => import('../pages/BrainTerritoriesPage'), 'BrainTerritoriesPage') },
```

- [ ] **Step 5: Write the key-claim tests and run everything**

Add the key-claim tests from Step 1 with the page's exact wording. Run: `npm test`
Expected: all PASS.

- [ ] **Step 6: Build**

Run: `npm run lint && npm run build`
Expected: no errors; the `radref-members-split` plugin does not complain (the map and its data are reached only from a members page).

- [ ] **Step 7: Commit**

```bash
git add src/pages/BrainTerritoriesPage.tsx src/pages/brainTerritories.test.ts src/data/calculators.ts src/data/calculators.test.ts
git commit -m "Brain territories: teaching page in Neuro, arterial and venous territories and sinus thrombosis"
```

---

### Task 5: Example scans

**Files:**
- Create: `src/data/scans/brainTerritories.ts`
- Create: `public/scans/brain-territories/*.jpg`
- Modify: `src/data/scans/sources.ts` (a `// Brain territories` block)
- Modify: `src/pages/BrainTerritoriesPage.tsx` (`ScanFigures` in each section)
- Modify: `docs/superpowers/research/2026-10-28-example-scans.md` (new section)

**Interfaces:**
- Consumes: `ScanImage`, `ScanSource` from `src/data/scans/types.ts`; `ScanFigures` from `src/components/ScanFigures.tsx` (`images: ScanImage[]`, `wide?: boolean`); `SCAN_SOURCES`.
- Produces: `export const brainTerritoriesScans = { <key>: ScanImage, … }`. `scans.test.ts` requires every key to appear in a page as `brainTerritoriesScans.<key>`.

Target keys (use those for which an image is found): `acaInfarct`, `mcaInfarct`, `pcaInfarct`, `achaInfarct`, `lacune`, `thalamicInfarct`, `percheron`, `lateralMedullary`, `paramedianPontine`, `picaInfarct`, `scaInfarct`, `corticalBorderZone`, `internalBorderZone`, `parasagittalVenousInfarct`, `temporalVenousInfarct`, `deepVenousThalami`, `denseSinus`, `cordSign`, `emptyDelta`, `swiBlooming`, `venographyDefect`, `arachnoidGranulation`, `hypoplasticTransverse`, `flowGap`.

- [ ] **Step 1: Set up the image tools in the scratchpad**

```bash
SCRATCH=/private/tmp/claude-501/-Users-mohammedezuddin-Desktop/b36b186a-069b-4746-ba9f-7987a851b445/scratchpad
python3 -m venv "$SCRATCH/venv" && "$SCRATCH/venv/bin/pip" install -q pillow
mkdir -p "$SCRATCH/bt-scans/dl" "$SCRATCH/bt-tools"
```

`$SCRATCH/bt-tools/crop.py` (kept out of the download folder; run with `-I`):

```python
import sys
from PIL import Image

# crop.py <source> <dest.jpg> <left> <top> <right> <bottom> [red] [width]
src, dest, l, t, r, b = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:7])
red = 'red' in sys.argv[7:]
width = next((int(a) for a in sys.argv[7:] if a.isdigit()), 420)
img = Image.open(src).convert('RGB').crop((l, t, r, b))
# Grey from the red channel keeps red arrows visible and leaves grey pixels unchanged.
grey = img.getchannel('R') if red else img.convert('L')
if grey.width > width:
    grey = grey.resize((width, round(grey.height * width / grey.width)), Image.LANCZOS)
for q in (82, 75, 68, 60, 52):
    grey.save(dest, 'JPEG', quality=q, optimize=True, progressive=True)
    import os
    if os.path.getsize(dest) < 40_000:
        break
print(dest, grey.size, os.path.getsize(dest))
```

- [ ] **Step 2: Find candidate figures**

For each target key, search Europe PMC for CC BY open-access papers, starting with the open reviews from Task 1 (e.g. Canedo-Antelo 2019 for the venous keys):

```bash
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=25&resultType=core&query=%22artery%20of%20percheron%22%20AND%20OPEN_ACCESS:y%20AND%20LICENSE:%22cc%20by%22" | python3 -c "import json,sys; [print(r.get('pmcid'), r.get('license'), r['title']) for r in json.load(sys.stdin)['resultList']['result']]"
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/fullTextXML" > "$SCRATCH/bt-scans/dl/<PMCID>.xml"
```

Read each candidate's licence statement in the XML (`<license>` and `<ali:license_ref>`) and its figure captions; check Crossref `license` for the DOI. Skip NC, ND, no stated version, and any figure "reproduced from" or "used with permission". Download the figures:

```bash
curl -sL "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/supplementaryFiles" -o "$SCRATCH/bt-scans/dl/<PMCID>.zip"
mkdir -p "$SCRATCH/bt-scans/dl/<PMCID>" && unzip -o -q "$SCRATCH/bt-scans/dl/<PMCID>.zip" -d "$SCRATCH/bt-scans/dl/<PMCID>"
```

Record every search, candidate, verdict and crop box in `$SCRATCH/bt-scans/notes.md`.

- [ ] **Step 3: Crop, convert and view each panel**

```bash
mkdir -p ~/Developer/radref/public/scans/brain-territories
"$SCRATCH/venv/bin/python" -I "$SCRATCH/bt-tools/crop.py" "$SCRATCH/bt-scans/dl/<PMCID>/<fig>.jpg" ~/Developer/radref/public/scans/brain-territories/percheron.jpg <l> <t> <r> <b>
```

Read every output JPG with the Read tool and check that it shows the finding, has one panel, and keeps the authors' arrows.

- [ ] **Step 4: Add the sources and the list**

In `src/data/scans/sources.ts`, a `// Brain territories` block with one entry per paper, e.g.:

```ts
  // Brain territories
  canedoAntelo2019: { short: 'Canedo-Antelo et al. 2019', doi: '10.1186/s13244-019-0766-1', licence: 'CC BY 4.0' },
```

`src/data/scans/brainTerritories.ts`:

```ts
import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and MRI for the brain vascular territories page. */
export const brainTerritoriesScans = {
  emptyDelta: {
    src: '/scans/brain-territories/empty-delta.jpg',
    alt: 'Axial contrast CT: a triangle of enhancing dura around a dark clot in the superior sagittal sinus',
    caption: 'Empty delta sign: enhancing sinus walls around non-enhancing thrombus in the superior sagittal sinus (arrow).',
    source: S.canedoAntelo2019,
    figure: 'Fig. 3b',
  },
  // …one entry per image, caption from the source figure's caption
} satisfies Record<string, ScanImage>
// (`satisfies` keeps the keys literal for scans.test.ts while checking each entry.)
```

(The example entry's source, figure and wording must match the real figure; replace it if that paper's figure differs.)

- [ ] **Step 5: Show them on the page**

In `src/pages/BrainTerritoriesPage.tsx`:

```tsx
import { ScanFigures } from '../components/ScanFigures'
import { brainTerritoriesScans } from '../data/scans/brainTerritories'
```

Under each subsection, `<ScanFigures images={[brainTerritoriesScans.acaInfarct]} />` (several keys per call where a section has several). Where a target has no open image, add `<p className="source-note">No open-access image of … was found.</p>` there instead.

- [ ] **Step 6: Document the scans**

In `docs/superpowers/research/2026-10-28-example-scans.md`, append a section "## Brain territories (2026-11-02)" with the same table as the others (Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes) and a line listing targets with no open image.

- [ ] **Step 7: Run the tests and build**

Run: `npm test && npm run lint && npm run build`
Expected: all PASS; `scans.test.ts` passes for `brainTerritoriesScans`.

- [ ] **Step 8: Commit**

```bash
git add src/data/scans/brainTerritories.ts src/data/scans/sources.ts public/scans/brain-territories src/pages/BrainTerritoriesPage.tsx docs/superpowers/research/2026-10-28-example-scans.md
git commit -m "Brain territories: example CT and MRI from CC BY open-access figures"
```

---

### Task 6: Docs and final check

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md**

- In "Current calculators", after the calvarial lesions entry, add: "- Vascular territories of the brain (teaching page, a study in the Neuro region, at `/studies/brain-territories`: interactive axial map (`src/components/BrainTerritoryMap.tsx`, shapes in `brainTerritoryShapes.ts` built by `brainTerritoryGeometry.ts`, colours `--color-territory-*`) of arterial and venous territories at six levels, with border zones; sections on each territory, variants, venous drainage and dural venous sinus thrombosis; CT and MRI from CC BY figures in `src/data/scans/brainTerritories.ts`; every claim read first, see `docs/superpowers/research/2026-11-02-brain-territories-sources.md`)".
- In "Registry", in the bullet on teaching pages not built on `StudyPage`, add the brain territories page.
- In "Example scans", no change is needed beyond the research doc unless the page reuses another page's images; if so, say which.

- [ ] **Step 2: Full check**

Run: `npm test && npm run lint && npm run build`
Expected: all PASS.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "CLAUDE.md: the brain territories page"
```

- [ ] **Step 4: Hand back**

Report what was built, how many scans were found and which targets had none, any claim marked "for the author", and ask whether to push the branch and open a PR.
