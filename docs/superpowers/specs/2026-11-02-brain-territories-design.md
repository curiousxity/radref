# Brain vascular territories

Date: 2026-11-02 · Branch: `claude/brain-territories`

## Intent

A teaching page on the vascular territories of the brain, arterial and venous, with dural venous
sinus thrombosis patterns (the author's request, 2026-11-02). It is a reference to look a lesion's
territory up in, not a report form, so it is built like the calvarial lesions page rather than on
`StudyPage`: no Report or Quiz tab.

## Goals

1. `/studies/brain-territories`, `kind: 'study'`, region Neuro, loaded with `membersPage`, with
   `related: ['/carotid-stenosis']` declared on the page.
2. One interactive territory map (below) covering the hemispheres, brainstem and cerebellum,
   arterial and venous.
3. Sections on each territory group, border zones, variants and lacunes, venous drainage, and
   dural venous sinus thrombosis, each with CC BY example scans where an open image exists.
4. Written with PubMed, Crossref and Europe PMC reachable: every reference matched and every claim
   read in an abstract or open full text before it goes in, in
   `docs/superpowers/research/2026-11-02-brain-territories-sources.md`. A claim that does not match
   its paper goes to the author rather than being reworded. If every claim is read, the source note
   does not start "Unchecked draft".

## Non-goals

- No Report form, no quiz, no calculator.
- No sagittal or coronal view in this round (axial only).
- No clinical management (thrombolysis windows, anticoagulation): the page says where, not what to
  do.
- Clinical syndromes are named only where a cited source names them for that territory.
- No change to any 3D viewer.

## Page structure

`src/pages/BrainTerritoriesPage.tsx`, sections in this order:

1. **Map**: `BrainTerritoryMap` (below).
2. **Hemispheres**: ACA, MCA (M1 perforators; superior and inferior divisions), PCA, AChA; the
   lenticulostriate arteries, recurrent artery of Heubner and thalamoperforators. Per territory:
   what it supplies and what an infarct there looks like, with a scan.
3. **Brainstem and cerebellum**: anteromedial (paramedian), anterolateral, lateral and dorsal
   territories at the medulla, pons and midbrain, by source artery (Tatu 1996); PICA, AICA and SCA
   on the cerebellum. The lateral medullary (Wallenberg) pattern and others only where sourced.
4. **Border zones, variants and lacunes**: cortical (external) and internal border zones; fetal
   PCA, artery of Percheron, azygos ACA; lacunes in the perforator territories. The infarct pattern
   each gives.
5. **Venous drainage**: superficial (superior sagittal sinus and cortical veins, vein of Labbé,
   superficial middle cerebral vein), deep (internal cerebral veins, basal veins of Rosenthal, vein
   of Galen, straight sinus) and posterior fossa. Which parenchymal pattern points to which
   occluded sinus or vein (parasagittal from the superior sagittal sinus, temporal from the
   transverse sinus or Labbé, bilateral thalami from the deep system), and that it crosses arterial
   boundaries. How much venous territories vary between people, as the sources state it.
6. **Dural venous sinus thrombosis**: direct signs (dense sinus and cord sign on CT, empty delta on
   contrast CT or CT venography, loss of flow void, clot signal by age on T1 and T2, blooming on
   SWI or T2*, filling defect on CT or MR venography); indirect signs (venous infarct, haemorrhage,
   oedema); mimics (arachnoid granulations, hypoplastic or atretic transverse sinus, flow gaps on
   time-of-flight MRV, high-riding jugular bulb, dense sinus from high haematocrit or dehydration).
7. **References**: the shared list from `LessonPage`, inline `<Cite doi="...">`.

## Map component

- `src/components/BrainTerritoryMap.tsx`, with shapes in `src/components/brainTerritoryShapes.ts`
  (as `InnerEarAnatomy` and `innerEarShapes.ts`). Schematic, not a scan plane; the caption says so
  and names Tatu as the source of the arterial maps.
- **Levels**: six axial levels, picked with a segmented control: medulla, pons, midbrain, basal
  ganglia and thalamus, corona radiata, centrum semiovale. Brainstem levels include the cerebellum
  where it is in the slice.
- **Mode**: an Arterial / Venous toggle. Both modes share each level's outline and ventricles, so
  the two maps line up. In arterial mode a Border zones switch overlays the cortical and internal
  border zones.
- **Colour**: by parent vessel, the same at every level (the MCA is one colour throughout).
  Perforator territories have their own colours. Brainstem sub-territories take their source
  artery's colour, and selecting one names it exactly (e.g. "Anteromedial pons: basilar paramedian
  branches"). About ten `--color-territory-*` tokens for arterial and up to seven for venous (superficial: superior sagittal sinus, superficial middle cerebral vein, vein of Labbé; deep; posterior fossa: Rhoton's galenic, petrosal and tentorial groups), in both
  palettes in `src/styles.css`, no literals (`src/styles.test.ts`); each keeps at least 3:1 against
  its neighbours' boundary lines and the outline.
- **Selection**: the legend under the figure is a row of buttons and is also the selector.
  Selecting a territory, from the legend or by tapping the drawing, highlights it, dims the rest,
  shows its name and supply in a caption line, and links to its section. Keyboard reachable; colour
  is never the only cue, since the name is shown. Only territories present at the current level
  are listed.
- **Mobile**: the figure fills the content width; level picker and toggle are 44 px targets.

## Example scans

- `src/data/scans/brainTerritories.ts`, exported as `brainTerritoriesScans`, files in
  `public/scans/brain-territories/`; papers added to `src/data/scans/sources.ts`.
- The existing rules: CC BY with a stated version only (no NC, ND or SA, so not Radiopaedia), one
  greyscale panel per file, under 40 KB, DOI and figure named; `scans.test.ts` checks them.
- Target: one infarct per main arterial territory, each border zone, the artery of Percheron, each
  venous infarct or haemorrhage pattern, and each sinus thrombosis sign and mimic. Where no open
  image is found, the caption says so (as the fifth metatarsal page does for the dancer's
  fracture), and the gap is listed in the research document.
- Sources, licence evidence and crop notes go in
  `docs/superpowers/research/2026-10-28-example-scans.md`, under a new heading.

## Sources

- Arterial maps: Tatu L, Moulin T, Bogousslavsky J, Duvernoy H. Arterial territories of human
  brain: brainstem and cerebellum. Neurology 1996; and cerebral hemispheres, Neurology 1998. DOIs
  confirmed on Crossref before use.
- Border zones, variants, lacunes, venous anatomy and cerebral venous thrombosis imaging:
  open-access reviews found on PubMed and Europe PMC, preferred where the full text is free
  (Unpaywall).
- The research document lists every claim with its source, verdict and the quoted sentence.

## Tests

- `src/pages/brainTerritories.test.ts`:
  - every level has an outline and both arterial and venous territory shapes;
  - every territory id used in the shapes has a legend entry, a token in both palettes and a
    section anchor on the page;
  - every reference has a DOI;
  - the source note's first words (pinned, as the other teaching pages do).
- `scans.test.ts`, `calculators.test.ts` (membersPage) and `styles.test.ts` cover the rest.
- `npm test` and `npm run build` pass. No dev server unless the author asks.

## Docs

- CLAUDE.md: an entry in the page list (as for calvarial lesions), the Neuro teaching pages in
  "Registry", and the scan list in "Example scans".

## Calls made for the builder

- Path `/studies/brain-territories` (short, matches the file names).
- Colour by parent vessel rather than by sub-territory, so the map reads at a glance and the name
  carries the detail.
- Venous mode draws drainage regions as the cited sources draw them; if they disagree, the drawing
  follows the most recent open review and the text says they vary.
