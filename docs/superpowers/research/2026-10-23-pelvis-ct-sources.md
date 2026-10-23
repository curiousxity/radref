# Pelvis CT for pain or injury: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

The author chose (2026-10-23): pelvis CT, a "pain or injury" history, and both Young-Burgess
and Letournel as calculators. Their wording is claimed in
`2026-10-23-pelvis-calculators-sources.md` (YB and LT claims); this file holds the study's own.

## Status: nothing here is verified yet

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. Every reference is **from memory** and every claim is **to check**. The
site code marks this state: no `doi` on the references, plain-text citations, and a source
note starting "Unchecked draft", pinned by `src/studies/PelvisCtStudy.test.ts`.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`): match each paper on PubMed,
resolve its DOI on Crossref, and mark a claim verified only when its wording is read in the
abstract or open full text. A claim marked **no** loses its rule, keeps a descriptive field,
and goes to the author in an "Omitted claims for the author" section; it is not quietly
reworded. Then add the DOIs, switch to `<Cite doi>`, reword the source note and update the
tests that pin the unchecked state.

The 3D pelvis viewer lists PMIDs for some of the same papers (Dalal 1989: PMID 2746708; Denis
1988: PMID 3338224; Roy-Camille 1985: PMID 4089659, DOI 10.1097/00007632-198511000-00011;
Lyders 2010: PMID 19762463, PMC7964142; and those in the calculators file). Use them as a
starting point, not as proof.

## References

| # | Citation (from memory) | Used for |
|---|---|---|
| P-R1 | Young JW, Burgess AR, Brumback RJ, Poka A. Pelvic fractures: value of plain radiography in early assessment and management. Radiology. 1986;160(2):445-451. | Young-Burgess (YB claims) |
| P-R2 | Burgess AR, Eastridge BJ, Young JW, et al. Pelvic ring disruptions: effective classification system and treatment protocols. J Trauma. 1990;30(7):848-856. | Young-Burgess (YB claims) |
| P-R3 | Dalal SA, Burgess AR, Siegel JH, et al. Pelvic fracture in multiple trauma: classification by mechanism is key to pattern of organ injury, resuscitative requirements, and outcome. J Trauma. 1989;29(7):981-1002. | Type predicts injuries and fluid needs |
| P-R4 | Khurana B, Sheehan SE, Sodickson AD, Weaver MJ. Pelvic ring fractures: what the orthopedic surgeon wants to know. RadioGraphics. 2014;34(5):1317-1333. | Diastasis, L5 transverse process |
| P-R5 | Denis F, Davis S, Comfort T. Sacral fractures: an important problem. Retrospective analysis of 236 cases. Clin Orthop Relat Res. 1988;(227):67-81. | Denis zones |
| P-R6 | Roy-Camille R, Saillant G, Gagna G, Mazel C. Transverse fracture of the upper sacrum. Suicidal jumper's fracture. Spine. 1985;10(9):838-845. | U- or H-shaped fracture |
| P-R7 | Lyders EM, Whitlow CT, Baker MD, Morris PP. Imaging and treatment of sacral insufficiency fractures. AJNR Am J Neuroradiol. 2010;31(2):201-210. | Insufficiency fractures |
| P-R8 | Judet R, Judet J, Letournel E. Fractures of the acetabulum. J Bone Joint Surg Am. 1964;46:1615-1646. | Letournel (LT claims) |
| P-R9 | Letournel E. Acetabulum fractures: classification and management. Clin Orthop Relat Res. 1980;(151):81-106. | Letournel (LT claims) |
| P-R10 | Durkee NJ, Jacobson J, Jamadar D, et al. Classification of common acetabular fractures: radiographic and CT appearances. AJR. 2006;187(4):915-925. | The CT questions |
| P-R11 | Scheinfeld MH, Dym AA, Spektor M, et al. Acetabular fractures: what radiologists should know and how 3D CT can aid classification. RadioGraphics. 2015;35(2):555-577. | 3D CT, the CT questions |
| P-R12 | Rehman H, Clement RG, Perks F, White TO. Imaging of occult hip fractures: CT or MRI? Injury. 2016;47(6):1297-1301. The least certain reference here: check authors, title and pages, and whether a better source exists (an ACR Appropriateness Criteria document on acute hip pain after a fall). | Occult hip fracture |

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| P1-1 | Three-dimensional CT reconstructions help classify acetabular fractures (P-R11). | text only | to check |
| P2-1 | In Dalal's series, the Young-Burgess type predicted the pattern of organ injury and the resuscitation needed; AP compression injuries needed the most fluid (P-R3). Check the exact finding. | text only | to check |
| P2-2 | A fracture of the L5 transverse process is a marker of vertical instability (P-R4, or another source?). | chip; warning with a vertically stable type (YB-8) | to check |
| P3-1 | Denis zones: 1 lateral to the sacral foramina, 2 through them, 3 medial to them into the canal. Neurological deficit about 6%, 28% and 57% (P-R5; recalled as 5.9%, 28.4% and 56.7%). | chip with the rounded figure | to check |
| P3-2 | A transverse upper sacral fracture with vertical fractures on both sides (U or H shape, the suicidal jumper's fracture) separates the spine from the pelvis (P-R6). Is "spinopelvic dissociation" Roy-Camille's term or later? | chip and impression clause | to check |
| P3-3 | Sacral insufficiency fractures run vertically through the sacral ala, parallel to the sacroiliac joints, often on both sides, sometimes with a horizontal limb (H shape); on CT sclerotic bands or fracture lines; often with pubic fractures (P-R7). | chip and impression clause | to check |
| P5-1 | MRI found occult hip fractures that CT missed, so MRI is the more sensitive test when CT is negative and the hip still hurts (P-R12). | chip after pain or a low-energy fall with no hip fracture | to check |

Not sourced, and labelled as the site's own on the page: the order of the steps, the protocol
checklist, the pointers from the history, the acetabular descriptors (femoral head,
fragments, impaction, gap), the bleeding, hematoma and bladder checklist, and putting active
bleeding first in the impression.
