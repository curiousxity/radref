# Haemorrhage on MRI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A members-only reference page at `/studies/haemorrhage-mri` with three tables (intracerebral haematoma by stage, subdural haematoma by stage, subarachnoid haemorrhage and microbleeds), each followed by CC BY example scans.

**Architecture:** A `LessonPage`-style page like `BrainTerritoriesPage` and `CalvariumPage` (not `StudyPage`): a header, three `info-card` sections each holding one `.table-wrap` / `.ref-table` table built from a typed row array in the page file, a `ScanFigures` row under each table, and the shared references list. Every cell comes from a sources document written first.

**Tech Stack:** React 19, TypeScript, Vite, vitest (node environment; page tests read the source file as text, as `src/pages/brainTerritories.test.ts` does).

**Spec:** `docs/superpowers/specs/2026-11-02-haemorrhage-mri-design.md`

## Global Constraints

- Route `/studies/haemorrhage-mri`, name `'Haemorrhage on MRI'`, `kind: 'study'`, region `'Neuro'`, `component: membersPage(...)`, `related: ['/studies/brain-territories']`.
- Tables only: no prose sections, no physics essay, no interactive figure, no clinical management, no bleed scores, no mnemonic unless a cited source gives it.
- Every table cell and note is read in an abstract or open full text first and logged in `docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md`. A cell no read source supports is left out (written as "—" or the row dropped), not guessed.
- Where sources give different time ranges for a stage, the table uses one cited source's ranges and the note under it says others differ.
- No "not yet reviewed by the site author" note; the source note starts "Unchecked draft" only if some cell was not read in its paper.
- British spelling (haemorrhage, haematoma, oedema, haemosiderin); keywords include the US spellings too.
- Scans: CC BY with a stated version only (no NC, ND, SA; not Radiopaedia), one greyscale panel per file (red arrows may be kept via the red channel), under 40 KB, caption kept to the source figure's caption, `public/scans/haemorrhage-mri/<kebab>.jpg`, list exported as `haemorrhageMriScans` from `src/data/scans/haemorrhageMri.ts`.
- No new colours or CSS unless unavoidable; any colour is a `--color-*` token in both palettes (`src/styles.test.ts`).
- No dev server or browser checks unless the author asks; verify with `npm test`, `npm run lint`, `npm run build`.
- Stage files by name (never `git add -A` or `.`). Commits end with:
  `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>` and
  `Claude-Session: https://claude.ai/code/session_011rwybb3GtYmo5mYP8S4Dns`. Do not push.

## File map

| File | Responsibility |
|---|---|
| `docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md` | References, cells, verdicts, quotes (Task 1) |
| `src/pages/HaemorrhageMriPage.tsx` | The page and its three tables (Task 2) |
| `src/pages/haemorrhageMri.test.ts` | Page rules (Task 2) |
| `src/data/calculators.ts`, `src/data/calculators.test.ts` | Registry entry and test (Task 2) |
| `src/data/scans/haemorrhageMri.ts`, `src/data/scans/sources.ts`, `public/scans/haemorrhage-mri/` | Scans (Task 3) |
| `docs/superpowers/research/2026-10-28-example-scans.md` | Scan licences and crop notes (Task 3) |
| `CLAUDE.md` | Page list and registry (Task 2); scans precache figure (Task 3) |

Scratch space for all tasks: `SCRATCH=/private/tmp/claude-501/-Users-mohammedezuddin-Desktop/b36b186a-069b-4746-ba9f-7987a851b445/scratchpad`, in a new `hm-*` folder per task. The image tools from the brain territories work are in `$SCRATCH/bt-tools/` (`crop.py`) and `$SCRATCH/venv` (Pillow).

---

### Task 1: Sources and cells

**Files:**
- Create: `docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md`

**Interfaces:**
- Produces: a reference table (`H-R1`…: citation, PMID, DOI, how read) and a cells table (`H-C1`…: table, row, column, the cell text as it will read on the page, reference, verdict `read: abstract` / `read: full text` / `differs` / `not stated`, and the quoted sentence). Task 2 takes cell wording only from rows with a `read` verdict. The document also records which source's time ranges each table uses, a "Where the sources disagree" section and a "Left out" section.

The databases reachable from this environment: `eutils.ncbi.nlm.nih.gov`, `api.crossref.org`, `www.ebi.ac.uk` (Europe PMC API; `europepmc.org` itself refuses automated requests), `api.unpaywall.org`, `doi.org`, `pmc.ncbi.nlm.nih.gov`.

- [ ] **Step 1: Confirm the anchor papers**

Candidates (confirm each DOI on Crossref and PMID on PubMed before it goes in the table; replace any that do not match; prefer open full text where one covers the same ground):

- Bradley WG Jr. MR appearance of hemorrhage in the brain. Radiology 1993;189(1):15-26.
- Parizel PM et al. Intracranial hemorrhage: principles of CT and MRI interpretation. Eur Radiol 2001;11(9):1770-1783.
- Kidwell CS, Wintermark M. Imaging of intracranial haemorrhage. Lancet Neurol 2008;7(3):256-267.
- Greenberg SM et al. Cerebral microbleeds: a guide to detection and interpretation. Lancet Neurol 2009;8(2):165-174.
- Duering M et al. Neuroimaging standards for research into small vessel disease — advances since 2013 (STRIVE-2). Lancet Neurol 2023.
- Charidimou A et al. The Boston criteria version 2.0 for cerebral amyloid angiopathy. Lancet Neurol 2022 (superficial siderosis, lobar microbleeds).
- Mitchell P et al. Detection of subarachnoid haemorrhage with magnetic resonance imaging. J Neurol Neurosurg Psychiatry 2001.
- A subdural haematoma MRI ageing source (e.g. Fobben ES et al., AJR 1989; or an open review).

```bash
curl -s "https://api.crossref.org/works?query.bibliographic=Bradley+MR+appearance+of+hemorrhage+in+the+brain&rows=3" | python3 -c "import json,sys; [print(i['DOI'], i['title'][0], i.get('published',{}).get('date-parts')) for i in json.load(sys.stdin)['message']['items']]"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=Bradley+WG[au]+hemorrhage+brain+MR"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=<PMID>"
```

- [ ] **Step 2: Find open reviews with full text**

Search Europe PMC for open-access reviews whose full text gives the stage tables (many pictorial reviews reproduce one):

```bash
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=25&query=(%22intracerebral%20hemorrhage%22%20OR%20%22intracranial%20hemorrhage%22)%20AND%20(MRI%20OR%20%22magnetic%20resonance%22)%20AND%20(evolution%20OR%20stages%20OR%20ageing%20OR%20aging)%20AND%20OPEN_ACCESS:y"
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/fullTextXML" > "$SCRATCH/hm-sources/<PMCID>.xml"
```

Topics: haematoma stages, times and blood products; T1, T2, SWI/GRE and CT appearance per stage; dependence on field strength and sequence; subdural haematoma ageing on CT and MRI (including FLAIR), mixed-age collections and membranes; subarachnoid blood on FLAIR and SWI and the fall of CT sensitivity with time; superficial siderosis; microbleeds (definition, size cut-off, lobar against deep, mimics such as calcification and flow voids); FLAIR sulcal hyperintensity mimics (supplemental oxygen, propofol, artefact), only as stated.

- [ ] **Step 3: Log the haematoma cells**

One `H-C` row per cell of the haematoma table: rows Hyperacute, Acute, Early subacute, Late subacute, Chronic; columns Time, Blood product, T1, T2, SWI/GRE, CT. Signal in words against grey matter ("bright", "dark", "like brain", or the source's own words, e.g. "dark rim"). Choose one source for the time ranges (prefer one that gives all five) and record the others' ranges under "Where the sources disagree". Log the note under the table (ranges differ; field strength and sequence, if a source says so).

- [ ] **Step 4: Log the subdural cells**

Rows Acute, Subacute, Chronic; columns Time, CT, T1, T2, FLAIR. Then the note: mixed-age collections from rebleeding and membranes, only as stated.

- [ ] **Step 5: Log the subarachnoid haemorrhage and microbleed rows**

Rows Acute subarachnoid haemorrhage, Superficial siderosis, Cerebral microbleeds, and (only if stated) FLAIR mimics of subarachnoid blood; columns Finding, Appearance, What it points to.

- [ ] **Step 6: List what was left out**

A "Left out" section: each cell no read source states (it will be "—" or the row dropped on the page), and any mnemonic or textbook phrasing not found in a source.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md
git commit -m "Haemorrhage on MRI: sources and cells"
```

---

### Task 2: The page, its registry entry and its docs

**Files:**
- Create: `src/pages/HaemorrhageMriPage.tsx`
- Create: `src/pages/haemorrhageMri.test.ts`
- Modify: `src/data/calculators.ts` (Neuro block, after the `/studies/brain-territories` line)
- Modify: `src/data/calculators.test.ts` (the "reference pages are studies" loop)
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: Task 1's cells; `Cite`, `LessonReferences`, `LessonReference` from `src/components/LessonPage.tsx`.
- Produces: `export function HaemorrhageMriPage()`; section ids `haematoma`, `subdural`, `sah-microbleeds` (Task 3 puts a `ScanFigures` row at the end of each); a `DOI` object and `const references: LessonReference[]`.

- [ ] **Step 1: Write the failing tests**

`src/pages/haemorrhageMri.test.ts`:

```ts
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const page = readFileSync(new URL('./HaemorrhageMriPage.tsx', import.meta.url), 'utf8')

describe('haemorrhage on MRI page', () => {
  test('has the three table sections, each table named by its heading', () => {
    for (const id of ['haematoma', 'subdural', 'sah-microbleeds']) {
      expect(page, id).toContain(`id="${id}"`)
      expect(page, id).toContain(`aria-labelledby="${id}-title"`)
      expect(page, id).toContain(`id="${id}-title"`)
    }
  })

  test('the haematoma stages are in order', () => {
    const stages = ['Hyperacute', 'Acute', 'Early subacute', 'Late subacute', 'Chronic']
    const at = stages.map((stage) => page.indexOf(`stage: '${stage}'`))
    expect(at.every((i) => i > 0), JSON.stringify(at)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  test('the subdural stages are in order', () => {
    const block = page.slice(page.indexOf('const subduralStages'))
    const at = ['Acute', 'Subacute', 'Chronic'].map((stage) => block.indexOf(`stage: '${stage}'`))
    expect(at.every((i) => i > 0), JSON.stringify(at)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  test('every reference has a DOI', () => {
    const start = page.indexOf('const references')
    const block = page.slice(start, page.indexOf('\n]', start))
    const citations = block.match(/citation:/g)?.length ?? 0
    expect(citations).toBeGreaterThan(3)
    expect(block.match(/doi: /g)?.length).toBe(citations)
  })

  // Every cell was read in its paper first (docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md).
  test('the source note does not mark the page as an unchecked draft', () => {
    expect(page).not.toContain('Unchecked draft')
    expect(page).toContain('every statement was read in its source first')
  })
})
```

Add one `test` per key cell once the page is written, each quoting its source sentence in a comment, as `src/pages/brainTerritories.test.ts` does. At least: late subacute bright on T1 (extracellular methaemoglobin); chronic haemosiderin dark on T2 and SWI; hyperacute oxyhaemoglobin; microbleed size cut-off; subarachnoid blood bright on FLAIR.

In `src/data/calculators.test.ts`, change the teaching-pages loop to:

```ts
    for (const path of ['/studies/calvarium', '/studies/hearing-loss-ct', '/studies/brain-territories', '/studies/haemorrhage-mri']) {
```

- [ ] **Step 2: Run them to see them fail**

Run: `npx vitest run src/pages/haemorrhageMri.test.ts src/data/calculators.test.ts`
Expected: FAIL (file not found; path not in registry).

- [ ] **Step 3: Write the page**

`src/pages/HaemorrhageMriPage.tsx`. Every cell comes from a Task 1 cell with a `read` verdict; a cell without one is `'—'`. A cell from a different source than its table's lead line carries its own `<Cite>`, which is why cells are `ReactNode`.

```tsx
import type { ReactNode } from 'react'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

// Every cell below was read in its paper first (abstract or open full text); the cells, their
// verdicts and the quoted sentences are in
// docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md.
const DOI = {
  // one key per reference from the sources document
}

const references: LessonReference[] = [
  // { citation: '…', doi: DOI.x }, in the order first cited
]

type HaematomaStage = { stage: string; time: ReactNode; product: ReactNode; t1: ReactNode; t2: ReactNode; swi: ReactNode; ct: ReactNode }
type SubduralStage = { stage: string; time: ReactNode; ct: ReactNode; t1: ReactNode; t2: ReactNode; flair: ReactNode }
type OtherBleed = { finding: string; appearance: ReactNode; pointsTo: ReactNode }

const haematomaStages: HaematomaStage[] = [
  // { stage: 'Hyperacute', time: '…', product: '…', t1: '…', t2: '…', swi: '…', ct: '…' },
  // Acute, Early subacute, Late subacute, Chronic, in that order
]

const subduralStages: SubduralStage[] = [
  // Acute, Subacute, Chronic, in that order
]

const otherBleeds: OtherBleed[] = [
  // Acute subarachnoid haemorrhage, Superficial siderosis, Cerebral microbleeds (and FLAIR mimics only if sourced)
]

export function HaemorrhageMriPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>Haemorrhage on MRI</h2>
          <p>{/* one sentence: how blood changes on MRI as it ages, for dating a bleed */}</p>
          <p className="source-note">
            Written on 2026-11-02 with the paper databases reachable; every statement was read in its source first. The scans are panels from
            open-access figures published under CC BY licences, credited under each.
          </p>
        </div>
      </section>

      <section className="info-card" id="haematoma">
        <h3 id="haematoma-title">Intracerebral haematoma</h3>
        <p className="fm-lead">{/* "From <Cite>…</Cite>; signal against grey matter." */}</p>
        <div className="table-wrap">
          <table className="ref-table" aria-labelledby="haematoma-title">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Time</th>
                <th scope="col">Blood product</th>
                <th scope="col">T1</th>
                <th scope="col">T2</th>
                <th scope="col">SWI / GRE</th>
                <th scope="col">CT</th>
              </tr>
            </thead>
            <tbody>
              {haematomaStages.map((row) => (
                <tr key={row.stage}>
                  <th scope="row" className="vessel-name">{row.stage}</th>
                  <td>{row.time}</td>
                  <td>{row.product}</td>
                  <td>{row.t1}</td>
                  <td>{row.t2}</td>
                  <td>{row.swi}</td>
                  <td>{row.ct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source-note">{/* the ranges differ between sources; field strength and sequence, if sourced */}</p>
      </section>

      <section className="info-card" id="subdural">
        <h3 id="subdural-title">Subdural haematoma</h3>
        {/* same pattern: lead line, table (Stage, Time, CT, T1, T2, FLAIR), note */}
      </section>

      <section className="info-card" id="sah-microbleeds">
        <h3 id="sah-microbleeds-title">Subarachnoid haemorrhage and microbleeds</h3>
        {/* same pattern: lead line, table (Finding, Appearance, What it points to) */}
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
```

`.ref-table td.vessel-name` styles the first column in `src/styles.css`; the row header is a `th`, so check whether `.ref-table th.vessel-name` needs adding there (`.ref-table thead th` is the only `th` rule; a `tbody th` would otherwise pick up default bold centred styling). If it does, add one rule beside the `td.vessel-name` one, using existing tokens only:

```css
.ref-table tbody th { padding: 0.65rem 0.75rem 0.65rem 0; text-align: left; border-bottom: 1px solid var(--color-hairline); vertical-align: top; font-weight: 600; color: var(--color-text); white-space: nowrap; }
```

The comments mark what each part must say; replace every one with the sourced text. No comment placeholders stay in the committed file.

- [ ] **Step 4: Add the registry entry**

In `src/data/calculators.ts`, after the `/studies/brain-territories` line:

```ts
  { path: '/studies/haemorrhage-mri', region: 'Neuro', kind: 'study', name: 'Haemorrhage on MRI', related: ['/studies/brain-territories'], description: 'How intracranial blood looks on MRI as it ages: intracerebral and subdural haematoma stages, subarachnoid blood and microbleeds, in tables with example scans.', keywords: ['haemorrhage', 'hemorrhage', 'haematoma', 'hematoma', 'intracerebral haemorrhage', 'ich', 'bleed', 'blood', 'ageing blood', 'aging blood', 'hyperacute', 'acute', 'subacute', 'chronic', 'oxyhaemoglobin', 'deoxyhaemoglobin', 'methaemoglobin', 'methemoglobin', 'haemosiderin', 'hemosiderin', 'ferritin', 't1', 't2', 'swi', 'gre', 't2*', 'blooming', 'subdural', 'sdh', 'subarachnoid', 'sah', 'flair', 'superficial siderosis', 'microbleeds', 'cerebral microbleeds', 'cmb', 'mri', 'neuro', 'brain', 'lesson', 'teaching'], component: membersPage(() => import('../pages/HaemorrhageMriPage'), 'HaemorrhageMriPage') },
```

- [ ] **Step 5: Update CLAUDE.md**

- In "Current calculators", after the vascular territories entry, add: "- Haemorrhage on MRI (reference page, a study in the Neuro region, at `/studies/haemorrhage-mri`: three tables, intracerebral haematoma by stage on T1, T2, SWI/GRE and CT, subdural haematoma by stage, subarachnoid haemorrhage and microbleeds, each with CC BY scans from `src/data/scans/haemorrhageMri.ts`; every cell read first, see `docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md`)".
- In "Registry", in the bullet on teaching pages not built on `StudyPage`, add the haemorrhage page.

- [ ] **Step 6: Write the key-cell tests and run everything**

Add the key-cell tests from Step 1 with the page's exact wording. Run: `npm test && npm run lint && npm run build`
Expected: all PASS; the `radref-members-split` plugin does not complain.

- [ ] **Step 7: Commit**

```bash
git add src/pages/HaemorrhageMriPage.tsx src/pages/haemorrhageMri.test.ts src/data/calculators.ts src/data/calculators.test.ts CLAUDE.md
# and src/styles.css if Step 3 added the row-header rule
git commit -m "Haemorrhage on MRI: reference page in Neuro, haematoma, subdural, subarachnoid and microbleed tables"
```

---

### Task 3: Example scans

**Files:**
- Create: `src/data/scans/haemorrhageMri.ts`
- Create: `public/scans/haemorrhage-mri/*.jpg`
- Modify: `src/data/scans/sources.ts` (a `// Haemorrhage on MRI` block)
- Modify: `src/pages/HaemorrhageMriPage.tsx` (a `ScanFigures` row at the end of each section)
- Modify: `docs/superpowers/research/2026-10-28-example-scans.md` (new section)
- Modify: `CLAUDE.md` (the scans precache figure, if it changes)

**Interfaces:**
- Consumes: `ScanImage`, `ScanSource` from `src/data/scans/types.ts`; `ScanFigures` from `src/components/ScanFigures.tsx` (`images: ScanImage[]`, `wide?: boolean`); `SCAN_SOURCES`; the section ids from Task 2.
- Produces: `export const haemorrhageMriScans = { <key>: ScanImage, … } satisfies Record<string, ScanImage>`. `scans.test.ts` requires every key to appear in a page as `haemorrhageMriScans.<key>`.

Target keys (use those for which a good image is found): `hyperacuteHaematoma`, `acuteHaematoma`, `earlySubacuteHaematoma`, `lateSubacuteHaematoma`, `chronicHaematoma`, `acuteSubdural`, `subacuteSubdural`, `chronicSubdural`, `sahFlair`, `superficialSiderosis`, `microbleeds`. A single figure showing one haematoma on several sequences may give several keys (one panel per file).

- [ ] **Step 1: Find candidate figures**

Start with the open reviews from Task 1, then search Europe PMC with figure-caption queries:

```bash
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=25&resultType=core&query=FIG:%22late%20subacute%22%20AND%20FIG:(hematoma%20OR%20haematoma)%20AND%20OPEN_ACCESS:y%20AND%20LICENSE:%22cc%20by%22" | python3 -c "import json,sys; [print(r.get('pmcid'), r.get('license'), r['title']) for r in json.load(sys.stdin)['resultList']['result']]"
curl -s "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/fullTextXML" > "$SCRATCH/hm-scans/dl/<PMCID>.xml"
curl -sL "https://www.ebi.ac.uk/europepmc/webservices/rest/<PMCID>/supplementaryFiles" -o "$SCRATCH/hm-scans/dl/<PMCID>.zip"
```

Read each candidate's licence statement (`<license>`, `<ali:license_ref>`) and Crossref `license`; reject NC, ND, SA, no stated version, and any figure "reproduced from" or "used with permission". Record every search, candidate, verdict and crop box in `$SCRATCH/hm-scans/notes.md`.

- [ ] **Step 2: Crop, convert and view each panel**

```bash
mkdir -p ~/Developer/radref/public/scans/haemorrhage-mri
"$SCRATCH/venv/bin/python" -I "$SCRATCH/bt-tools/crop.py" "$SCRATCH/hm-scans/dl/<PMCID>/<fig>.jpg" ~/Developer/radref/public/scans/haemorrhage-mri/late-subacute-haematoma.jpg <l> <t> <r> <b>
```

Read every output JPG with the Read tool: one panel, the finding plainly visible, the authors' arrows kept, burned-in patient or scanner text cropped off. A weak match is a rejection.

- [ ] **Step 3: Add the sources and the list**

In `src/data/scans/sources.ts`, a `// Haemorrhage on MRI` block, one entry per paper, with any licence-version note in the comment above the block as the brain territories block has. `src/data/scans/haemorrhageMri.ts`:

```ts
import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI and CT for the haemorrhage on MRI page. */
export const haemorrhageMriScans = {
  // lateSubacuteHaematoma: { src: '/scans/haemorrhage-mri/late-subacute-haematoma.jpg', alt: '…', caption: '…', source: S.x, figure: 'Fig. 2b' },
} satisfies Record<string, ScanImage>
```

Captions keep to the source figure's caption: patient background from the case text is allowed, claims from other figures or the article text are not.

- [ ] **Step 4: Show them on the page**

In `src/pages/HaemorrhageMriPage.tsx`, import `ScanFigures` and `haemorrhageMriScans`; at the end of each section, `<ScanFigures images={[haemorrhageMriScans.x, …]} />` in table-row order. For targets with no image, one line after the row: `<p className="source-note">No open-access image of … was found.</p>`. Add the scans sentence to the source note only if it is not already there.

- [ ] **Step 5: Document the scans**

In `docs/superpowers/research/2026-10-28-example-scans.md`, append "## Haemorrhage on MRI (2026-11-02)" with the same table as the brain territories section (Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes) and a "Still without an image" line. If the total of `public/scans/` changes the "about 7000 KB" figure in CLAUDE.md, update it and the "largest sets" list there.

- [ ] **Step 6: Run the tests and build**

Run: `npm test && npm run lint && npm run build`
Expected: all PASS; `scans.test.ts` passes for `haemorrhageMriScans`.

- [ ] **Step 7: Commit**

```bash
git add src/data/scans/haemorrhageMri.ts src/data/scans/sources.ts public/scans/haemorrhage-mri src/pages/HaemorrhageMriPage.tsx docs/superpowers/research/2026-10-28-example-scans.md
# and CLAUDE.md if Step 5 changed it
git commit -m "Haemorrhage on MRI: example MRI and CT from CC BY open-access figures"
```
