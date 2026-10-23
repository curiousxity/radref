# Wrist calculators (Mayfield, Herbert, Palmer, Lichtman): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the four wrist calculators (`/mayfield`, `/herbert`, `/palmer`,
`/lichtman`) and their shared logic in `src/logic/` (`mayfield.ts`, `herbert.ts`,
`palmer.ts`, `lichtman.ts`), which the wrist MRI study also uses. The study's own claims are
in `2026-10-23-wrist-mri-sources.md`.

## Status: nothing here is verified

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. The citations and the wording of every stage, type and class are **from
memory**. Every row is **to check**. The pages say "Unchecked draft" in their source note,
their references have no DOI, and `src/logic/wristClassifications.test.ts` quotes each claim
by ID. The author chose (2026-10-23) to deploy before the check; the pages stay labelled "Unchecked draft" on the live site until it is done.

## How to check (on a computer)

Same method as the ankle (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or full text. These are classic papers, so the classification tables may be in
figures or the full text only. If a paper's wording differs, correct the descriptions in the
logic file and the test in the same commit, saying why. Then add the DOIs to the pages'
references and reword their source notes.

## References

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| W1 | Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241. | 10.1016/s0363-5023(80)80007-4 (unconfirmed) | Mayfield |
| W2 | Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123. | 10.1302/0301-620X.66B1.6693468 (unconfirmed) | Herbert |
| W3 | Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606. | 10.1016/0363-5023(89)90174-3 (unconfirmed) | Palmer |
| W4 | Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck's disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908. | — | Lichtman |

## Claims

### Mayfield (W1)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| MF-1 | Stage I is scapholunate disruption (scapholunate dissociation). | SL disrupted → I | to check |
| MF-2 | Stage II adds capitolunate disruption: the capitate dislocates from the lunate (perilunate dislocation). | + capitolunate → II | to check |
| MF-3 | Stage III extends through the lunotriquetral joint (lunotriquetral dissociation; called midcarpal dislocation in some texts). | + LT → III | to check |
| MF-4 | Stage IV is dislocation of the lunate from the radius. | lunate dislocated → IV | to check |
| MF-5 | The stages are progressive: each includes the injuries of the stages before it. The page and study give the highest stage marked and list unmarked earlier stages as a "check the images" note (the site's handling). | highest stage; gaps listed | to check |

The Mayfield page also says that a scaphoid fracture can take the place of the
scapholunate tear (a greater arc injury). Check that W1 says so, or remove the sentence.

### Herbert (W2)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| HB-1 | Type A (acute stable): A1 fracture of the tubercle, A2 incomplete fracture through the waist. | — | to check |
| HB-2 | Type B (acute unstable): B1 distal oblique, B2 complete waist, B3 proximal pole, B4 trans-scaphoid perilunate fracture-dislocation. | — | to check |
| HB-3 | Type C is delayed union. | — | to check |
| HB-4 | Type D is established non-union: D1 fibrous, D2 sclerotic (pseudarthrosis). | — | to check |
| HB-5 | The groups: A acute stable, B acute unstable, C delayed union, D non-union. | — | to check |

Not included: the comminuted type B5 found in later versions (the page says so). Check
whether it is in W2.

### Palmer (W3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| PA-1 | Class 1 (traumatic): 1A central perforation; 1B ulnar avulsion, with or without ulnar styloid fracture; 1C distal avulsion (from the lunate or triquetrum); 1D radial avulsion, with or without sigmoid notch fracture. | — | to check |
| PA-2 | Class 2 (degenerative): 2A TFCC wear; 2B with lunate and/or ulnar chondromalacia; 2C TFCC perforation with chondromalacia; 2D adds lunotriquetral ligament perforation; 2E adds ulnocarpal arthritis. | — | to check |
| PA-3 | Class 1 is traumatic and class 2 degenerative, the class 2 stages being progressive stages of ulnocarpal abutment. | — | to check |

### Lichtman (W4 and its later modification)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| LI-1 | Stage I: normal radiographs (MRI shows the lunate abnormality); II: lunate sclerosis without collapse; IV: collapse with degenerative changes of the radiocarpal or midcarpal joint. | — | to check |
| LI-2 | Stage III is split into IIIA (lunate collapse with carpal height and alignment kept) and IIIB (with carpal collapse and fixed scaphoid rotation). | collapse + carpal collapse → IIIB, else IIIA | to check |
| LI-3 | The IIIA/IIIB split is a later modification, not in W4. Find who made it and when, and add that paper. | — | to check |
| LI-4 | MRI finds stage I disease that radiographs miss. | — | to check |

Not included: stage IIIC (coronal fracture of the lunate), from a later modification. The
page says so.
