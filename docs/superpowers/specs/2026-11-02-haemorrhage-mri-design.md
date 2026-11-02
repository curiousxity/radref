# Haemorrhage on MRI

Date: 2026-11-02 · Branch: `claude/brain-territories`

## Intent

A reference page on how intracranial blood looks on MRI as it ages (the author's request,
2026-11-02). It is a lookup, so it is tables only: no prose sections, no Report or Quiz tab. It is
built on `LessonPage` like the brain territories and calvarial lesions pages, not on `StudyPage`.

## Goals

1. `/studies/haemorrhage-mri`, name "Haemorrhage on MRI", `kind: 'study'`, region Neuro, loaded with
   `membersPage`, with `related: ['/studies/brain-territories']` declared on the registry entry
   (`relatedTo` makes it two-way). Keywords include both spellings (haemorrhage, hemorrhage).
2. Three tables, each followed by a row of CC BY example scans where an open image exists.
3. Written with PubMed, Crossref and Europe PMC reachable: every reference matched and every table
   cell read in an abstract or open full text before it goes in, in
   `docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md`. A cell no read source
   supports is left out, not guessed. If every cell is read, the source note does not start
   "Unchecked draft".

## Non-goals

- No prose sections, no physics essay, no interactive figure.
- No clinical management, no aetiology work-up, no bleed scores (ICH volume, spot sign).
- No mnemonic unless a cited source gives it.

## Page structure

`src/pages/HaemorrhageMriPage.tsx`, in this order:

1. A one-line intro.
2. **Intracerebral haematoma** table. Rows: hyperacute, acute, early subacute, late subacute,
   chronic. Columns: stage; time from the bleed; blood product (oxyhaemoglobin, deoxyhaemoglobin,
   intracellular methaemoglobin, extracellular methaemoglobin, haemosiderin and ferritin); T1; T2;
   SWI/GRE; CT. Signal in words ("bright", "dark", "like brain") against grey matter, as the sources
   give it. A note under the table states that the time ranges differ between sources and, if the
   sources say so, that signal depends on field strength and sequence.
3. **Subdural haematoma** table. Rows: acute, subacute, chronic. Columns: stage, time, CT, T1, T2,
   FLAIR. A note on mixed-age collections from rebleeding and on membranes, if sourced.
4. **Subarachnoid haemorrhage and microbleeds** table. Rows: acute subarachnoid haemorrhage
   (FLAIR, SWI, and the fall in CT sensitivity over days); superficial siderosis; cerebral
   microbleeds (blooming dots on SWI/GRE, the size cut-off, lobar against deep distribution, and
   mimics such as calcification). FLAIR mimics of subarachnoid blood (such as supplemental oxygen)
   only if a read source states them. Columns: finding, appearance, what it points to.
5. Source note and **References** (the shared list from `LessonPage`, inline `<Cite doi="...">`).

Each table has a `<caption>` and `<th scope>` headers and sits in the existing `.table-wrap` /
`.ref-table` pattern (horizontal scroll on a phone, as on the Fleischner and calvarium pages). Each
table section has an id so the scan rows and links can anchor to it.

## Example scans

- `src/data/scans/haemorrhageMri.ts`, exported as `haemorrhageMriScans`, files in
  `public/scans/haemorrhage-mri/`; papers added to `src/data/scans/sources.ts`.
- The existing rules: CC BY with a stated version only, one greyscale panel per file (red arrows
  may be kept via the red channel), under 40 KB, DOI and figure named, caption kept to the source
  figure's caption; `scans.test.ts` checks them.
- Target: each haematoma stage on its telling sequence (e.g. hyperacute or acute on T2, late
  subacute bright on T1, a chronic haemosiderin rim on SWI or T2*); an acute, a subacute and a
  chronic subdural; subarachnoid blood on FLAIR; superficial siderosis; microbleeds on SWI. Where
  no open image is found, the page says so under the table and the gap is listed in the research
  document.
- Sources, licence evidence and crop notes go in
  `docs/superpowers/research/2026-10-28-example-scans.md`, under a new heading.

## Tests

- `src/pages/haemorrhageMri.test.ts`: the three table ids; the five haematoma stage rows in order;
  the subdural rows; every reference has a DOI; the source note's first words.
- `scans.test.ts`, `calculators.test.ts` (membersPage, the teaching-page list) and
  `styles.test.ts` cover the rest.
- `npm test`, `npm run lint` and `npm run build` pass. No dev server unless the author asks.

## Docs

- CLAUDE.md: an entry in the page list, the Neuro teaching pages in "Registry", the scan list and
  precache figure in "Example scans".

## Calls made for the builder

- Path `/studies/haemorrhage-mri`, British spelling as elsewhere on the site.
- Members only, like the other teaching pages.
- Where sources give different time ranges for a stage, the table uses one cited source's ranges
  and the note under it says others differ; the research document records which.
