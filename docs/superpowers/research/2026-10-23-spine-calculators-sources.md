# AO Spine calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

Evidence base for the AO Spine calculator (`/ao-spine`) and its shared logic
(`src/logic/aospine.ts`), which the spine trauma CT study also uses. The author chose AO Spine
(2026-10-23) instead of the SLIC and TLICS scores first listed for the spine; upper cervical
(C0–C2) AO Spine is not included. The study's own claims are in
`2026-10-23-spine-trauma-ct-sources.md`.

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
both papers matched in PubMed (E-utilities `esearch`/`esummary`), their DOIs resolved on
Crossref, and a claim marked verified only when its wording was read in the PubMed abstract
(`efetch`) or in open full text. Neither paper has open full text (no PMC copy, none in Europe
PMC; Unpaywall refused the placeholder address, so it gave no answer). The two abstracts name
the three morphology types and say that facet, neurology and modifier grades exist, but give
none of the subtypes, grades or modifiers. So only AO-3 is verified, a few are partly
verified, and the rest cannot be verified yet. The AO Spine classification sheets were not
read; by this method they would not count as verification.

The author's standing choice (2026-10-23): claims that cannot be verified (paywalled) stay as
they are, marked unchecked, with the page's "Unchecked draft" note. Nothing was found WRONG.

The author decided (2026-10-23): add the DOIs now. Applied the same day: `doi` on both
references of the AO Spine page, `<Cite>` links in its source note, and the source note,
the references note and the `aospine.ts` header reworded to say the papers are matched but
the subtypes, facet grades, neurology grades and modifiers are still unchecked. No wording or
rule in `aospine.ts` changed, since no claim was WRONG or flagged for the author.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| S1 | Vaccaro AR, Oner C, Kepler CK, et al. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037. | 23970107 | 10.1097/BRS.0b013e3182a8a381 | Abstract |
| S2 | Vaccaro AR, Koerner JD, Radcliff KE, et al. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184. | 25716661 | 10.1007/s00586-015-3831-3 | Abstract |

Notes on the set:

- Both citations written from memory matched PubMed and Crossref. S2's DOI and PMID, taken
  from the 3D cervical spine viewer, are confirmed. S2 appeared online in February 2015; the
  print year, 2016, is the one cited.

## Claims

| ID | Claim | Rule | Verified |
|---|---|---|---|
| AO-1 | Type A, compression: A0 no or minor fracture (process, lamina) not affecting stability; A1 wedge-compression of one endplate; A2 split or pincer of both endplates; A3 incomplete burst (one endplate and the posterior wall); A4 complete burst (both endplates and the posterior wall). Same in both systems? | endplates and wall → A0–A4; wall with no endplate → no type | partly. S1 abstract: "type A (compression)"; S2 abstract: "three injury morphology types similar to the TL system: compression injuries (A)". The subtypes A0–A4 are not in either abstract, so whether they are the same in both is unchecked. |
| AO-2 | Type B, tension band: B1 posterior tension band through bone only (transosseous, Chance); B2 posterior tension band through the ligaments, with or without bone; B3 anterior tension band (hyperextension). | — | partly. S1 abstract: "type B (tension band disruption)"; S2 abstract: "tension band injuries (B)". B1–B3 are not in either abstract. |
| AO-3 | Type C: translation or displacement in any direction. | — | yes, except "in any direction". S1 abstract: "type C (displacement/translation) injuries"; S2 abstract: "translational injuries (C)". "In any direction" is not in either abstract. |
| AO-4 | The most severe injury names the type: C over B over A. The order B3 over B2 over B1 is the site's reading (it follows the thoracolumbar injury score's points); check it. | hierarchy | no: not in either abstract (full text paywalled). Kept, unchecked. |
| AO-5 | A B or C injury also carries the type of its vertebral body fracture. The bracket notation, B2 (A3), is the site's own; check how the papers write it. | — | no: not in either abstract. Kept, unchecked. |
| AO-6 | Subaxial facet injuries: F1 undisplaced, fragment under 1 cm and under 40% of the lateral mass; F2 1 cm or more, 40% or more, or displaced; F3 floating lateral mass; F4 pathological subluxation or perched or dislocated facet. The boundary (exactly 1 cm, exactly 40%) is read as F2; check the paper's wording. | — | partly. S2 abstract: "with additional descriptions for facet injuries". F1–F4, the 1 cm and 40% figures and the boundary are not in the abstract; unchecked. |
| AO-7 | The same facet injury on both sides is written with "BL". | — | no: not in the S2 abstract. Kept, unchecked. |
| AO-8 | Neurology N0 intact, N1 transient deficit resolved, N2 radiculopathy (radicular symptoms), N3 incomplete cord injury (thoracolumbar: or cauda equina), N4 complete cord injury, NX cannot be examined. | — | partly. S1 abstract: "a grading system for the neurological status"; S2 abstract: "neurologic status". The grades are not in either abstract; unchecked. |
| AO-9 | "+" marks ongoing cord compression with an incomplete deficit. Is it in both systems, and only with N3? | "+" added to N3 only | no: not in either abstract. Kept, unchecked. |
| AO-10 | Subaxial modifiers: M1 posterior capsuloligamentous complex injury without complete disruption; M2 critical disc herniation; M3 stiffening or metabolic bone disease (DISH, AS, OPLL); M4 vertebral artery abnormality. Thoracolumbar modifiers: M1 indeterminate tension band injury; M2 patient-specific comorbidity. | — | partly. S1 abstract: "description of relevant patient-specific modifiers"; S2 abstract: "patient-specific modifiers". The M1–M4 definitions are not in either abstract; unchecked. |
| AO-11 | Neurology comes from the examination, not the images (the page says so). | — | no: not in either abstract. Kept, unchecked. |
| AO-12 | Upper cervical (C0–C2) injuries have their own AO Spine system and are not covered here. | — | no: neither abstract mentions the upper cervical spine. Kept, unchecked. |
