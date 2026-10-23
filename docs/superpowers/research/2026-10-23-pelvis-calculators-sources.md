# Pelvis calculators (Young-Burgess, Letournel): sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the two pelvis calculators (`/young-burgess`, `/letournel`) and their shared
logic in `src/logic/` (`youngburgess.ts`, `letournel.ts`), which the pelvis CT study also uses.
The study's own claims are in `2026-10-23-pelvis-ct-sources.md`.

## Status: nothing here is verified

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. The citations and the wording of every type are **from memory**. Every row
is **to check**. The pages say "Unchecked draft" in their source note, their references have
no DOI, and `src/logic/pelvisClassifications.test.ts` quotes each claim by ID.

## How to check (on a computer)

Same method as the ankle (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or full text. If a paper's wording differs, correct the descriptions in the logic
file and the test in the same commit, saying why. Then add the DOIs to the pages' references
and reword their source notes.

The 3D pelvis viewer (`public/anatomy/online/pelvis-si.html`) lists PMIDs, checked on PubMed
when it was built, for some of the same papers: Young 1986 (PMID 3726125, DOI
10.1148/radiology.160.2.3726125), Burgess 1990 (PMID 2381002), Khurana 2014 (PMID 25208283, DOI
10.1148/rg.345135113), Letournel 1980 (PMID 7418327), Durkee 2006 (PMID 16985135, DOI
10.2214/AJR.05.1269) and Scheinfeld 2015 (PMID 25763739, DOI 10.1148/rg.352140098). Use them as
a starting point, not as proof of the claims below.

## References

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| PC1 | Young JW, Burgess AR, Brumback RJ, Poka A. Pelvic fractures: value of plain radiography in early assessment and management. Radiology. 1986;160(2):445-451. | 10.1148/radiology.160.2.3726125 (from the viewer) | Young-Burgess |
| PC2 | Burgess AR, Eastridge BJ, Young JW, et al. Pelvic ring disruptions: effective classification system and treatment protocols. J Trauma. 1990;30(7):848-856. | — | Young-Burgess |
| PC3 | Khurana B, Sheehan SE, Sodickson AD, Weaver MJ. Pelvic ring fractures: what the orthopedic surgeon wants to know. RadioGraphics. 2014;34(5):1317-1333. | 10.1148/rg.345135113 (from the viewer) | Diastasis, stability |
| PC4 | Judet R, Judet J, Letournel E. Fractures of the acetabulum: classification and surgical approaches for open reduction. Preliminary report. J Bone Joint Surg Am. 1964;46:1615-1646. | — | Letournel |
| PC5 | Letournel E. Acetabulum fractures: classification and management. Clin Orthop Relat Res. 1980;(151):81-106. | — | Letournel |
| PC6 | Durkee NJ, Jacobson J, Jamadar D, et al. Classification of common acetabular fractures: radiographic and CT appearances. AJR Am J Roentgenol. 2006;187(4):915-925. | 10.2214/AJR.05.1269 (from the viewer) | The CT questions |
| PC7 | Scheinfeld MH, Dym AA, Spektor M, et al. Acetabular fractures: what radiologists should know and how 3D CT can aid classification. RadioGraphics. 2015;35(2):555-577. | 10.1148/rg.352140098 (from the viewer) | The CT questions |

## Claims

### Young-Burgess (PC1 to PC3)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| YB-1 | LC I: sacral compression on the side of impact with transverse (horizontal) pubic rami fractures. LC II: with an iliac wing (crescent) fracture on the side of impact. LC III: lateral compression on the side of impact with an open book (AP compression) of the other side, the windswept pelvis. Does LC II also cover a posterior sacroiliac disruption without an iliac fracture? | lateral → LC I; with crescent → LC II; other side opened → LC III | to check |
| YB-2 | APC I: slight widening of the symphysis or the anterior sacroiliac joint, ligaments stretched but intact. APC II: widened anterior sacroiliac joint, anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact. APC III: complete sacroiliac disruption, posterior ligaments torn too. | SI anterior → II; SI complete → III; symphysis only → I | to check |
| YB-3 | Vertical shear: vertical displacement of a hemipelvis, anteriorly and posteriorly. | vertical, no LC → VS | to check |
| YB-4 | Combined mechanical injury: a combination of patterns, most often lateral compression with vertical shear. | vertical with LC → CMI. Other combinations are not detected (the site's reading). | to check |
| YB-5 | Vertical displacement names the type before lateral or AP compression (the site's ordering). | hierarchy | to check |
| YB-6 | A symphyseal diastasis over 2.5 cm usually means APC II or worse. Is 2.5 cm in Young or Burgess, or only in later reviews (PC3)? Exactly 2.5 cm is read as not over. | > 25 mm → prompt | to check |
| YB-7 | The calculator grades AP compression by the worse sacroiliac joint (the site's reading). | — | to check |
| YB-8 | Stability as usually taught: LC I and APC I stable; LC II, LC III and APC II rotationally unstable, vertically stable; APC III and VS rotationally and vertically unstable; CMI unstable. Where is this stated (PC2, PC3)? | "Usually" column and chip | to check |
| YB-9 | The pelvic ring rarely breaks in one place only: an anterior injury should send the reader to the posterior ring (PC3). Text only. | — | to check |

### Letournel (PC4 to PC7)

| ID | Claim | Rule | Verified |
|---|---|---|---|
| LT-1 | Five elementary types (posterior wall, posterior column, anterior wall, anterior column, transverse) and five associated types (posterior column and wall, transverse and posterior wall, T-shaped, anterior column or wall with posterior hemitransverse, both-column). | — | to check |
| LT-2 | Elementary type wording, as in `ltDescriptions`. In particular: does a posterior column fracture break the obturator ring, and is a transverse fracture's obturator ring intact? | — | to check |
| LT-3 | Associated type wording, as in `ltDescriptions`. | — | to check |
| LT-4 | The iliopectineal line belongs to the anterior column and the ilioischial line to the posterior column (PC6). | lines → column | to check |
| LT-5 | A both-column fracture leaves no joint surface attached to the intact ilium; the spur sign is the ilium left behind, on the obturator oblique view. | no surface on ilium → BC | to check |
| LT-6 | With both lines broken, an intact obturator ring means a transverse fracture (with or without a posterior wall fragment). | obturator intact → T or TPW | to check |
| LT-7 | With both lines and the obturator ring broken and joint surface on the ilium: a vertical stem through the ischiopubic part is T-shaped; an anterior fracture with a posterior hemitransverse is ACPHT (PC6, PC7). | — | to check |
| LT-8 | A posterior wall fragment beside a T-shaped, hemitransverse or both-column fracture is written as an addition, not a new type (the site's notation). | — | to check |
| LT-9 | An anterior column or wall fracture with a posterior wall fragment is not one of the ten types. | no type | to check |
