# Wrist calculators (Mayfield, Herbert, Palmer, Lichtman): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the four wrist calculators (`/mayfield`, `/herbert`, `/palmer`,
`/lichtman`) and their shared logic in `src/logic/` (`mayfield.ts`, `herbert.ts`,
`palmer.ts`, `lichtman.ts`), which the wrist MRI study also uses. The study's own claims are
in `2026-10-23-wrist-mri-sources.md`.

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esummary`), its DOI resolved on Crossref, and a
claim marked verified only when its wording was read in the PubMed abstract (`efetch`). None
of the four has a PMC copy; Unpaywall could not be used (it refuses the placeholder address)
and the journal pages are paywalled. As expected for classic papers, the abstracts say that a
classification exists and how it is organised, but not the wording of each stage, type or
class, so most claims below stay unchecked. All four citations, as written from memory,
matched their PubMed records.

The author chose (2026-10-23) to deploy before the check, and that claims which cannot be
verified (paywalled) stay as they are, marked unchecked.

The author decided (2026-10-23), after this check: add the DOIs and `<Cite doi>` links now,
keeping the "Unchecked draft" source notes, which now name what is still unchecked; rewrite
the claims marked "for the author" to the paper's wording, or drop what no listed paper states.
Applied: the four pages carry the DOI on their reference and a `<Cite>` link in "Source:", and
LI-1 and LI-4 are changed (below). `src/logic/wristClassifications.test.ts` quotes each claim
by ID, and the verified ones (MF-1, MF-4, MF-5) by the abstract's sentence.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| W1 | Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241. | 7400560 | 10.1016/s0363-5023(80)80007-4 | Abstract |
| W2 | Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123. | 6693468 | 10.1302/0301-620X.66B1.6693468 | Abstract |
| W3 | Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606. | 2666492 | 10.1016/0363-5023(89)90174-3 | Abstract |
| W4 | Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck's disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908. | 908720 | 10.2106/00004623-197759070-00011 | Abstract |

Notes on the set:

- No citation needed correcting. The three candidate DOIs (W1, W2, W3) were right.
- W4: PubMed has no DOI; it was found by a Crossref bibliographic search and the record
  matches authors, volume, issue and pages. Crossref titles it only "Kienböck's disease"; the
  pages keep PubMed's full title.
- W4 is from 1977, before clinical MRI, so it cannot be the source for "MRI shows stage I"
  (LI-1, LI-4). For the author.
- LI-3 (who split stage III into IIIA and IIIB) is not settled. The 1982 update by the same
  group (Lichtman DM, Alexander AH, Mack GR, Gunther SF. J Hand Surg Am. 1982;7(4):343-347;
  PMID 7150434) was looked at, but its abstract mentions stages I to III only, with no IIIA or
  IIIB, so no paper has been added. For the author.

What the abstracts do say:

- W1: "These dislocations occurred in a sequential fashion due to progressive and specific
  ligamentous disruptions and were classified according to the degree of perilunar
  instability (PLI). Stage I perilunar instability (scapholunate diastasis) had the least
  degree of carpal instability. Lunate dislocations (stage IV PLI) had the highest degree of
  carpal instability." Also: "The mechanism of injury was extension, ulnar deviation, and
  intercarpal supination."
- W2: "A classification of scaphoid fractures is proposed. The indications for operation
  included not only acute unstable fractures, but also fractures with delayed healing and
  those with established non-union".
- W3: "The classification recognizes both traumatic and degenerative lesions. Traumatic
  lesions are classified according to their location. Degenerative lesions are classified by
  the location and severity of degenerative changes of the triangular fibrocartilage complex,
  ulnar head, ulnocarpal bones and lunotriquetral ligament."
- W4: "delay in diagnosis and prolonged treatment by plaster immobilization led to
  progressive collapse of the lunate"; "Four clinical and roentgenographic stages were
  identified".

## Claims

### Mayfield (W1)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| MF-1 | Stage I is scapholunate disruption (scapholunate dissociation). | SL disrupted → I | yes. W1 abstract: "Stage I perilunar instability (scapholunate diastasis)". |
| MF-2 | Stage II adds capitolunate disruption: the capitate dislocates from the lunate (perilunate dislocation). | + capitolunate → II | no: stage II is not described in the W1 abstract. Kept, unchecked. |
| MF-3 | Stage III extends through the lunotriquetral joint (lunotriquetral dissociation; called midcarpal dislocation in some texts). | + LT → III | no: stage III is not described in the W1 abstract. Kept, unchecked. |
| MF-4 | Stage IV is dislocation of the lunate from the radius. | lunate dislocated → IV | yes. W1 abstract: "Lunate dislocations (stage IV PLI) had the highest degree of carpal instability." (That the lunate dislocates from the radius is not spelled out.) |
| MF-5 | The stages are progressive: each includes the injuries of the stages before it. The page and study give the highest stage marked and list unmarked earlier stages as a "check the images" note (the site's handling). | highest stage; gaps listed | partly. W1 abstract: "These dislocations occurred in a sequential fashion due to progressive and specific ligamentous disruptions". The "highest stage, gaps listed" handling is the site's own. |

The Mayfield page also says that a scaphoid fracture can take the place of the
scapholunate tear (a greater arc injury). no: not in the W1 abstract (which mentions radial
styloid avulsion fractures and scaphoid rotation, but no scaphoid fracture). Kept, unchecked.

### Herbert (W2)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| HB-1 | Type A (acute stable): A1 fracture of the tubercle, A2 incomplete fracture through the waist. | — | no: the types are not in the W2 abstract. Kept, unchecked. |
| HB-2 | Type B (acute unstable): B1 distal oblique, B2 complete waist, B3 proximal pole, B4 trans-scaphoid perilunate fracture-dislocation. | — | no: as HB-1. Kept, unchecked. |
| HB-3 | Type C is delayed union. | — | no: as HB-1 (the abstract mentions "fractures with delayed healing" but not as a type). Kept, unchecked. |
| HB-4 | Type D is established non-union: D1 fibrous, D2 sclerotic (pseudarthrosis). | — | no: as HB-1 (the abstract mentions "established non-union" but not D1 or D2). Kept, unchecked. |
| HB-5 | The groups: A acute stable, B acute unstable, C delayed union, D non-union. | — | partly. W2 abstract: "acute unstable fractures, but also fractures with delayed healing and those with established non-union". "Acute stable" and the letters A to D are not stated. Kept. |

Not included: the comminuted type B5 found in later versions (the page says so). Whether it
is in W2 cannot be told from the abstract; unchecked.

### Palmer (W3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| PA-1 | Class 1 (traumatic): 1A central perforation; 1B ulnar avulsion, with or without ulnar styloid fracture; 1C distal avulsion (from the lunate or triquetrum); 1D radial avulsion, with or without sigmoid notch fracture. | — | no: the subclasses are not in the W3 abstract, which says only "Traumatic lesions are classified according to their location." Kept, unchecked. |
| PA-2 | Class 2 (degenerative): 2A TFCC wear; 2B with lunate and/or ulnar chondromalacia; 2C TFCC perforation with chondromalacia; 2D adds lunotriquetral ligament perforation; 2E adds ulnocarpal arthritis. | — | no: the subclasses are not in the W3 abstract; it confirms only that degenerative lesions are graded by changes of the TFCC, ulnar head, ulnocarpal bones and lunotriquetral ligament. Kept, unchecked. |
| PA-3 | Class 1 is traumatic and class 2 degenerative, the class 2 stages being progressive stages of ulnocarpal abutment. | — | partly. W3 abstract: "The classification recognizes both traumatic and degenerative lesions"; degenerative lesions "are classified by the location and severity of degenerative changes". "Progressive stages of ulnocarpal abutment" is not stated. Kept. |

### Lichtman (W4 and its later modification)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| LI-1 | Stage I: normal radiographs (MRI shows the lunate abnormality); II: lunate sclerosis without collapse; IV: collapse with degenerative changes of the radiocarpal or midcarpal joint. | — | partly. W4 abstract: "Four clinical and roentgenographic stages were identified"; the content of each stage is not stated. For the author: the MRI part cannot come from W4 (1977, before clinical MRI). Kept, unchecked. Changed: stage I in `src/logic/lichtman.ts` is now "normal radiographs" (was "normal radiographs, with the lunate abnormal only on MRI"); the Lichtman page lede says "The stages are clinical and radiographic; stage I has normal radiographs" (was "stage I is found on MRI"), and its first question reads "Lunate abnormal on imaging?" (was "on MRI or radiographs"). The rule is unchanged: an abnormal lunate without sclerosis is stage I. |
| LI-2 | Stage III is split into IIIA (lunate collapse with carpal height and alignment kept) and IIIB (with carpal collapse and fixed scaphoid rotation). | collapse + carpal collapse → IIIB, else IIIA | no: IIIA and IIIB are not in the W4 abstract (and LI-3 says they are not in W4). Kept, unchecked. |
| LI-3 | The IIIA/IIIB split is a later modification, not in W4. Find who made it and when, and add that paper. | — | no: not settled. The 1982 update (PMID 7150434) abstract mentions stages I to III only. No source added; for the author. |
| LI-4 | MRI finds stage I disease that radiographs miss. | — | no: not in the W4 abstract, and W4 (1977) predates clinical MRI, so it cannot be the source. For the author: needs its own paper. Kept, unchecked. Changed: dropped from the Lichtman page, the lesson and the quiz, since no listed paper states it (see LI-1). |

Not included: stage IIIC (coronal fracture of the lunate), from a later modification. The
page says so. Not checked (no paper cited for it).

## Second check, 2026-10-25: papers supplied by the author

Read in full: Kennedy SA, Allan CH. In brief: Mayfield et al. classification: carpal dislocations
and progressive perilunar instability. Clin Orthop Relat Res. 2012;470(4):1243-1245.
doi:10.1007/s11999-012-2275-x, which reproduces Mayfield's table. Mayfield 1980 itself is still unread
(the zip supplied held letters from the same J Hand Surg issue, not the paper).

| ID | Verdict | Evidence |
|----|---------|----------|
| MF-1 | yes | "In the first stage of this classification, the scapholunate articulation is disrupted". |
| MF-2 | no, changed | "The second stage of progression involves capitolunate joint disruption in addition to the scapholunate injury ... Radiographs may show capitate subluxation or dislocation." The site called stage II the perilunate dislocation; now "scapholunate and capitolunate disruption, with the capitate subluxed or dislocated" (the author chose the newer source). |
| MF-3 | no, changed | "The third stage of progression is perilunate dislocation ... The lunotriquetral joint is now also disrupted. Radiographically, the capitate is dislocated dorsally". Stage III now carries the name perilunate dislocation. |
| MF-4 | yes, detail added | "the radiolunate joint is disrupted and the lunate is dislocated volarly from the lunate fossa". |
| MF-5 | yes | "four distinct stages ... The progressive ligamentous injury around the lunate was referred to as progressive perilunar instability". |

## Third check, 2026-10-25: second batch from the author

Read in full: Kennedy C, Abrams R. In brief: the Lichtman classification for Kienböck disease. Clin
Orthop Relat Res. 2019;477(6):1516-1520. doi:10.1097/CORR.0000000000000595. Where it differed, the
author's rule (the newer source) applied.

| ID | Verdict | Evidence |
|----|---------|----------|
| LI-1 | yes, reworded | Stage I "normal architecture and lunate density but may show a linear or compression fracture"; II "increased density in the lunate on plain radiographs without a change in the shape, size, or relationship to other carpal bones"; III "collapse of the lunate with proximal migration of the capitate"; IV "pancarpal arthritis, including radiocarpal arthritis" (KDAC). IV said "radiocarpal or midcarpal"; now the review's words. |
| LI-2 | yes, reworded | "Stages IIIA (without fixed scaphoid rotation) and IIIB (with fixed scaphoid rotation)"; "radioscaphoid angle < 60° classified as Stage IIIA and ... > 60° classified as Stage IIIB"; IIIB "often seen with a cortical 'ring sign'". |
| LI-3 | settled | "Stage III was modified in 1993 and divided into two stages, IIIA and IIB" (Lichtman and Degnan, Hand Clin 1993), not in the 1982 update. "Stage IIIC representing a coronal fracture of the lunate" was added later (Lichtman 2010, 2016). IIIC is now a stage in the calculator and the study. |
| LI-4 | yes | "The original classification was later modified in 1993 ... with Stage I including decreased T1 signal on MRI". Stage I has its MRI finding back, credited to 1993. Stage 0 (2010) is mentioned on the page only. |

## Fourth check, 2026-10-25: Herbert

Read in full: Tysver T, Jawa A. In brief: fractures in brief: scaphoid fractures. Clin Orthop Relat Res.
2010;468(9):2553-2555. doi:10.1007/s11999-010-1261-4. It names the Herbert classification and cites
Herbert and Fisher 1984 but does not give the A to D types, so HB-1 to HB-n stay unchecked. The author
suggested AO Surgery Reference's free Herbert classification page; `surgeryreference.aofoundation.org`
is not reachable from this environment, so it needs a PDF or the host allowed.

## Fifth check, 2026-10-25: fourth batch from the author

Read: AO Surgery Reference, "Classifications for fractures of carpal bones: Herbert classification for
scaphoid fractures" (Dráč P, Kastelec M, Suarez FA; citing Herbert's 1990 book), saved as a PDF by
the author. It has no DOI, so it is cited on the Herbert page only (the wrist study's tests require a
DOI on every reference).

| ID | Verdict | Evidence |
|----|---------|----------|
| HB-1 | yes | "A1 – fracture of the scaphoid tubercle"; "A2 – nondisplaced crack of the wrist [waist] (incomplete fracture)". |
| HB-2 | yes, B5 added | "B1 – distal oblique fracture; B2 – complete waist fracture; B3 – proximal pole fracture; B4 – fracture dislocation; B5 – comminuted fracture". The calculator had no B5; it is added. B4 keeps "trans-scaphoid perilunate fracture-dislocation". |
| HB-3, HB-4 | yes | "C – delayed union"; "D – established nonunion; D1 – fibrous nonunion; D2 – sclerotic nonunion (pseudoarthrosis)". |
| HB-5 | yes | "A – acute stable (may be treated conservatively)"; "B – acute unstable (indicated for surgery)". |
