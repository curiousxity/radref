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

## Sixth check, 2026-10-29: open sources

The original papers are still paywalled. The Bone & Joint page for Herbert and Fisher 1984 shows
only the abstract, and its PDF link returns the sign-in page. Elsevier (Mayfield 1980, Palmer 1989)
returns a redirect or challenge page. Open full texts were read in Europe PMC (`fullTextXML`). Two
were added as second citations, each matched on Crossref: Chen NC, Jupiter JB, Jebson PJL.
Sports-related wrist injuries in adults. Sports Health. 2009;1(6):469-477.
doi:10.1177/1941738109347981 (PMC3445150), on the Mayfield page; and von Borstel D, Wang M, Small K,
Nozaki T, Yoshioka H. High-resolution 3T MR imaging of the triangular fibrocartilage complex. Magn
Reson Med Sci. 2017;16(1):3-15. doi:10.2463/mrms.rev.2016-0011 (PMC5600038), on the Palmer page.

| ID | Verdict | Evidence |
|----|---------|----------|
| Greater-arc sentence | yes (substance) | Chen 2009: "A perilunate dislocation results from the disruption of the scapholunate ligament, then extension of the injury through the capito-lunate articulation and the lunotriquetral ligament. One variation of a perilunate dislocation is a fracture dislocation through the scaphoid, rather than an injury through the scapholunate ligament." Chen does not use the name "greater arc". It is in Dvorsky et al. (J Hand Surg Glob Online 2025, PMC12355994): "Greater arc injuries ... may produce fractures of the scaphoid, capitate, or radial styloid. The scaphoid is the most common carpal bone fracture in PLDs, referred to as a trans-scaphoid perilunate injury". Okoro et al. (Life 2023, PMC10381215) has: "each stage may occur as a greater arc injury, which has a trans-osseous ... path ... instead of the previously described transligamentous path ... Stage 1 transscaphoid injury ... the proximal pole maintains its relationship to the lunate with an intact SLL". Dvorsky and Okoro are not cited, because both call stage II the perilunate dislocation (the page follows Mayfield and Kennedy and Allan: stage III). Chen added inline and in the source note. |
| MF-2, MF-3 | unchanged | Settled on 2026-10-25 against Kennedy and Allan. **For the author**: open reviews number the stages differently. Dvorsky 2025: "A stage II injury ... involves disruption of the capitolunate joint. This stage represents the classic form of a PLD"; Sharma et al. (Indian J Radiol Imaging 2025, PMC12169939): "Stage II is perilunate dislocation"; Okoro 2023: "The second stage consists of perilunate dislocation", with stage III "often referred to as a midcarpal dislocation". Page: stage III "perilunate dislocation". Kept, following Kennedy and Allan. |
| HB-1 to HB-4 | unchanged | Settled on 2026-10-25 against AO Surgery Reference. Steinmann and Adams (Scaphoid fractures and nonunions: diagnosis and treatment. J Orthop Sci 2006;11:424-431, doi:10.1007/s00776-006-1025-x, PMC2780658) give the same list and cite Herbert and Fisher 1984 (their ref. 1) for it. They word two types differently: "B2 (displaced or mobile fractures of the waist)" (page: "complete fracture of the waist", as AO), and "Type C fractures are those that demonstrate delayed union after >6 weeks of plaster immobilization". |
| B5 in Herbert 1984? | partly | Steinmann and Adams 2006 list "B5 (comminuted fractures)" and attribute the classification to Herbert and Fisher 1984. AO Surgery Reference attributes its list, B5 included, to Herbert's 1990 book. Neither quotes the 1984 paper, so this stays open until it is read. |
| PA-1 | partly | von Borstel 2017, Table 3, "Palmer classification categorizing triangular fibrocartilage complex (TFCC) lesions as traumatic (type 1) or degenerative (type 2)": "1A: Central perforation"; "1B: Ulnar avulsion with or without distal ulnar fracture"; "1C: Distal avulsion"; "1D: Radial avulsion with or without sigmoid notch fracture". The same table, "Reproduced with permission from Palmer", is in Margulies et al. (J Hand Microsurg 2021, PMC8041499). 1A and 1D match. **For the author**: 1B: page "ulnar avulsion, with or without a fracture of the ulnar styloid"; table "Ulnar avulsion with or without distal ulnar fracture". 1C: page "distal avulsion (from the lunate or triquetrum)"; table "Distal avulsion", which von Borstel's text describes as "traumatic tears of the TFCC in its periphery, specifically involving the ulnolunate or ulnotriquetral ligaments". Kept. The source note now names both. |
| PA-2 | yes | von Borstel 2017, Table 3: "2A: TFCC wear"; "2B: TFCC wear with lunate and/or ulnar chondromalacia"; "2C: TFCC perforation with lunate and/or ulnar chondromalacia"; "2D: TFCC perforation with lunate and/or ulnar chondromalacia and lunotriquetral ligament perforation"; "2E: TFCC perforation with lunate and/or ulnar chondromalacia, lunotriquetral ligament perforation, and ulnocarpal arthritis". Word for word as the page. |
| PA-3 | yes | von Borstel 2017: "Class 2C lesions demonstrate the progression of degenerative changes"; "Class 2D lesions represent even further progression"; "Class 2E lesions represent the final stages of the ulnar impaction syndrome". Cited beside Palmer on the page's "stages of ulnocarpal abutment" line. |
| LI-2 to LI-4, IIIC | unchanged | Settled on 2026-10-25 against Kennedy and Abrams (IIIA/IIIB split 1993, Lichtman and Degnan; IIIC from Lichtman 2010 and 2016). Vassa et al. (Pol J Radiol 2020, PMC7509702), Table 3, agrees: "IIIa Collapse of lunate bone, radioscaphoid angle < 60°"; "IIIb ... > 60°"; "IIIc Collapse of lunate bone, coronal lunate fracture (chronic)". |

## The author's decisions, 2026-10-29

The author decided the open "for the author" items for Mayfield, Palmer and Herbert (decisions 15 to
17), then sent fuller wording with suggested sources. Each quote below was read in the source; where
a suggestion went beyond the source, the page keeps to the source (listed after the table). New
references, read in full in Europe PMC (`fullTextXML`) and matched on Crossref:

- Dvorsky JL, Rosenberry S, Da Costa A, Green A, Fowler J. A review of perilunate wrist dislocations. J Hand Surg Glob Online. 2025;7(5):100803. doi:10.1016/j.jhsg.2025.100803 (PMC12355994). Mayfield page.
- Sharma M, Choudhury SR, Sinha A, Prakash M. Multimodality imaging in wrist fractures and dislocations. Indian J Radiol Imaging. 2025;35(3):374-386. doi:10.1055/s-0044-1801268 (PMC12169939). Mayfield page.
- Vassa R, Garg A, Omar IM. Magnetic resonance imaging of the wrist and hand. Pol J Radiol. 2020;85:e461-e488. doi:10.5114/pjr.2020.99034 (PMC7509702). Palmer page.
- Steinmann SP, Adams JE. Scaphoid fractures and nonunions: diagnosis and treatment. J Orthop Sci. 2006;11(4):424-431. doi:10.1007/s00776-006-1025-x (PMC2780658). Herbert page.

| ID | Decision | Change on the page |
|----|----------|--------------------|
| MF-2, MF-3 (15) | Name the disrupted structures rather than "perilunate = stage III": I scapholunate disruption; II capitolunate disruption, with dorsal displacement or dislocation of the capitate relative to the lunate; III additional lunotriquetral disruption; IV lunate dislocation from the lunate fossa of the radius. Say that reviews differ on which stage is the perilunate dislocation, citing both sides. | `src/logic/mayfield.ts`: I "scapholunate disruption" (was "... (scapholunate dissociation)"); II "capitolunate disruption, with dorsal displacement or dislocation of the capitate relative to the lunate" (was "scapholunate and capitolunate disruption, with the capitate subluxed or dislocated"); III "additional lunotriquetral disruption" (was "perilunate dislocation: the disruption extends through the lunotriquetral joint, with the capitate dislocated dorsally"); IV "lunate dislocation, volarly from the lunate fossa of the radius". Mayfield page: capitolunate question "(capitate displaced or dislocated dorsally relative to the lunate)"; new paragraph "Reviews differ on which stage they call the perilunate dislocation. Some give the name to stage II, where the capitate dislocates dorsally while the lunate stays aligned with the radius (Dvorsky; Sharma); others to stage III (Kennedy and Allan). This page names the disrupted structures instead: stage III specifically adds lunotriquetral disruption."; source note and reference note updated. Tests: `src/logic/wristClassifications.test.ts` "the stages name the disrupted structures, not the perilunate dislocation". Quotes: Kennedy and Allan 2012, "In the first stage of this classification, the scapholunate articulation is disrupted", "capitolunate joint disruption in addition to the scapholunate injury ... Radiographs may show capitate subluxation or dislocation", "The third stage of progression is perilunate dislocation ... The lunotriquetral joint is now also disrupted", "the radiolunate joint is disrupted and the lunate is dislocated volarly from the lunate fossa"; Dvorsky 2025, "A stage II injury ... involves disruption of the capitolunate joint. This stage represents the classic form of a PLD, in which the lunate remains aligned with the distal radius, whereas the capitate and remaining carpal bones dislocate dorsally", and stage IV "causes the lunate to dislocate volarly into the carpal tunnel"; Sharma 2025, "Stage II is perilunate dislocation ..., wherein the lunate remains aligned with the distal radius, but the surrounding carpus is dislocated (mostly dorsally) with disruption of the capitolunate ligament and joints", "Stage III results from lunotriquetral joint disruption". |
| PA-1 (16) | 1B and 1C use the table labels, with the anatomy separately; do not present the systematic review's "± ulnar styloid fracture" as the same quotation. | `src/logic/palmer.ts`: 1B "ulnar avulsion, with or without a distal ulnar fracture" (was "... with or without a fracture of the ulnar styloid"); 1C "distal avulsion, involving the carpal attachments of the TFCC (at the lunate or triquetrum)" (was "distal avulsion (from the lunate or triquetrum)"). Palmer page: "Unchecked draft" and the "not yet checked" sentence dropped from the source note; new paragraph "1B and 1C carry the labels of Palmer's table: 1B ulnar avulsion, with or without a distal ulnar fracture, and 1C distal avulsion (von Borstel). The carpal attachments torn in 1C are those at the lunate and triquetrum, through the ulnolunate and ulnotriquetral ligaments (Vassa)." Quotes: von Borstel 2017, Table 3, "1B: Ulnar avulsion with or without distal ulnar fracture", "1C: Distal avulsion"; the same in Margulies et al. 2021, Table 1 ("Reproduced with permission from Palmer"), "B) Ulnar avulsion with or without distal ulnar fracture", "C) Distal avulsion"; von Borstel's text, 1C lesions "represent traumatic tears of the TFCC in its periphery, specifically involving the ulnolunate or ulnotriquetral ligaments"; Vassa 2020, "Class IC lesions are traumatic avulsions from the peripheral volar attachments at the lunate or triquetral bones, specifically the ulnolunate and ulnotriquetral ligaments", and its Table 4, "1C Distal avulsion (origin of ulnolunate and ulnotriquetral ligaments)". |
| HB-1 to HB-4 (17) | Keep AO's "complete waist fracture" for B2; add a sentence that the formulations differ, without making displacement part of the AO-based definition. | `src/logic/herbert.ts`: B2 "complete waist fracture", AO's words (was "complete fracture of the waist"). Herbert page, under the table: "The wording of B2 varies between sources. AO Surgery Reference lists it as a complete waist fracture; Steinmann and Adams give it as displaced or mobile fractures of the waist (Steinmann and Adams). This page keeps AO's wording, which does not name displacement." Steinmann and Adams added to the references. Quotes: AO Surgery Reference, "B2 – complete waist fracture" (fifth check); Steinmann and Adams 2006, "Type B (acute unstable fractures) include subtypes B1 (oblique fractures of the distal third); B2 (displaced or mobile fractures of the waist); type B3 (proximal pole fractures); type B4 (fracture dislocations); and B5 (comminuted fractures)". |
| B5 in Herbert 1984? | Stays unread. | The Herbert page keeps "Unchecked draft" and now says "Still unchecked: whether the 1984 paper itself has B5 (Steinmann and Adams list B5 and credit the 1984 paper, but do not quote it)". |

After these, nothing on the Mayfield or Palmer page is left unread: Palmer drops "Unchecked draft"
(the Mayfield page had already dropped it). The Herbert page keeps it for B5 only.

Suggested wording the sources did not support, kept closer to the source:

- PA-1, 1B: the suggested label "Ulnar avulsion, with or without an associated distal ulnar fracture". Both reproductions of Palmer's table read "with or without distal ulnar fracture", without "associated", so the page drops it. The systematic review suggested as a contrast (McNamara CT, Colakoglu S, Iorio ML. J Hand Microsurg. 2020;12(2):116-122. doi:10.1055/s-0040-1713580, PMC7410809) could be read in its abstract only, which does not give the 1B wording, so its "± ulnar styloid fracture" is not checked and it is not cited.
- PA-1, 1C: the suggested label "Distal avulsion, involving the carpal attachments of the TFCC". The tables give only "Distal avulsion"; the gloss is on the page as the author asked, resting on Vassa's "peripheral volar attachments at the lunate or triquetral bones" rather than on the table.
- HB-2: the suggested "displaced or mobile complete fractures of the waist" (or "Some reviews specify displaced or mobile complete waist fractures"). No source read combines "complete" with "displaced or mobile". Europe PMC full-text searches for the phrase found nothing; Steinmann and Adams 2006, Hu et al. (Orthop Surg 2022, PMC9732583: "type B2 is displaced or mobile fractures of waist") and a 2024 Rev Bras Ortop table (PMC11624938: "B2 Displaced or mobile, waist") all leave out "complete", while AO's wording appears in an observational study (Ther Clin Risk Manag 2018, PMC6016271: "B2 (complete waist fractures)"). The page therefore quotes Steinmann and Adams's own words.

### Follow-up sources from the author, 2026-10-29

The author sent replacement sources for the Palmer and Herbert gaps. Neither could be read, so
neither page changed.

| ID | Source | Verdict | Change on the page |
|----|--------|---------|--------------------|
| PA-1 | McNamara CT, Colakoglu S, Iorio ML. A systematic review and analysis of Palmer type I triangular fibrocartilage complex injuries: outcomes of treatment. J Hand Microsurg. 2020;12(2):116-122. doi:10.1055/s-0040-1713580 (PMC7410809) | not read. Europe PMC has no open full text (`fullTextXML` returns 500), and PMC and Thieme answer with a browser challenge; the PubMed abstract does not give the class wording. Its Table 1 ("1B Ulnar avulsion (± ulnar styloid fracture)") is unchecked. | None. 1B keeps von Borstel's table label, "with or without a distal ulnar fracture". |
| HB-2 | Cheung JP, Tang CY, Fung BK. Current management of acute scaphoid fractures: a review. Hong Kong Med J. 2014;20(1):52-58. doi:10.12809/hkmj134146 (Crossref and PubMed 24323670; the DOI suggested, 10.12809/hkmj133918, does not resolve on Crossref) | not read. hkmj.org answers 403 with a browser challenge; the PubMed abstract does not give the types. "B2 (displaced or mobile complete fractures of the waist)" is unchecked. | None. The page keeps AO's "complete waist fracture" and Steinmann and Adams's "displaced or mobile fractures of the waist". |
