# AO Spine calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the AO Spine calculator (`/ao-spine`) and its shared logic
(`src/logic/aospine.ts`), which the spine trauma CT study also uses. The author chose AO Spine
(2026-10-23) instead of the SLIC and TLICS scores first listed for the spine; upper cervical
(C0–C2) AO Spine is not included. The study's own claims are in
`2026-10-23-spine-trauma-ct-sources.md`.

## Status: nothing here is verified

Written in a cloud session whose network blocks PubMed, PubMed Central, Crossref, doi.org
and Europe PMC. Every citation and every type's wording is **from memory** and **to check**.
The page says "Unchecked draft", its references have no DOI, and
`src/logic/aospine.test.ts` quotes each claim by ID.

## How to check (on a computer)

Same method as the ankle (`2026-10-19-ankle-mri-sources.md`). AO Spine also publishes the
classification sheets on its website; use them to read the exact wording, but cite the
papers. If the wording differs, correct `aospine.ts` and its test in the same commit, saying
why, then add the DOIs and reword the source note.

## References

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| S1 | Vaccaro AR, Oner C, Kepler CK, et al. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037. | — | Thoracolumbar |
| S2 | Vaccaro AR, Koerner JD, Radcliff KE, et al. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184. | 10.1007/s00586-015-3831-3 (from the 3D cervical spine viewer, PMID 25716661; unconfirmed here) | Subaxial cervical |

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| AO-1 | Type A, compression: A0 no or minor fracture (process, lamina) not affecting stability; A1 wedge-compression of one endplate; A2 split or pincer of both endplates; A3 incomplete burst (one endplate and the posterior wall); A4 complete burst (both endplates and the posterior wall). Same in both systems? | endplates and wall → A0–A4; wall with no endplate → no type | to check |
| AO-2 | Type B, tension band: B1 posterior tension band through bone only (transosseous, Chance); B2 posterior tension band through the ligaments, with or without bone; B3 anterior tension band (hyperextension). | — | to check |
| AO-3 | Type C: translation or displacement in any direction. | — | to check |
| AO-4 | The most severe injury names the type: C over B over A. The order B3 over B2 over B1 is the site's reading (it follows the thoracolumbar injury score's points); check it. | hierarchy | to check |
| AO-5 | A B or C injury also carries the type of its vertebral body fracture. The bracket notation, B2 (A3), is the site's own; check how the papers write it. | — | to check |
| AO-6 | Subaxial facet injuries: F1 undisplaced, fragment under 1 cm and under 40% of the lateral mass; F2 1 cm or more, 40% or more, or displaced; F3 floating lateral mass; F4 pathological subluxation or perched or dislocated facet. The boundary (exactly 1 cm, exactly 40%) is read as F2; check the paper's wording. | — | to check |
| AO-7 | The same facet injury on both sides is written with "BL". | — | to check |
| AO-8 | Neurology N0 intact, N1 transient deficit resolved, N2 radiculopathy (radicular symptoms), N3 incomplete cord injury (thoracolumbar: or cauda equina), N4 complete cord injury, NX cannot be examined. | — | to check |
| AO-9 | "+" marks ongoing cord compression with an incomplete deficit. Is it in both systems, and only with N3? | "+" added to N3 only | to check |
| AO-10 | Subaxial modifiers: M1 posterior capsuloligamentous complex injury without complete disruption; M2 critical disc herniation; M3 stiffening or metabolic bone disease (DISH, AS, OPLL); M4 vertebral artery abnormality. Thoracolumbar modifiers: M1 indeterminate tension band injury; M2 patient-specific comorbidity. | — | to check |
| AO-11 | Neurology comes from the examination, not the images (the page says so). | — | to check |
| AO-12 | Upper cervical (C0–C2) injuries have their own AO Spine system and are not covered here. | — | to check |
