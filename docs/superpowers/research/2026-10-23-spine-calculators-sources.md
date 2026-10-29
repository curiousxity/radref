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

## Second check, 2026-10-25: papers supplied by the author

Read in full: AO Spine Thoracolumbar Injury Classification System poster. © 2020 AO Foundation, AO
Spine, CC BY-NC-ND 4.0 (citing Vaccaro 2013 and Kepler 2015). By the author's choice it is hosted
unchanged at `public/references/aospine-thoracolumbar-poster.pdf` and linked from the AO Spine page.
It covers the thoracolumbar system only; the subaxial claims (AO-6, AO-7, the subaxial AO-8 to AO-10)
are unchanged and unchecked.

| ID | Verdict | Evidence |
|----|---------|----------|
| AO-1 | yes, A0 changed | A0 "Minor, nonstructural fractures, which do not compromise the structural integrity of the spinal column such as transverse process or spinous process fractures"; the algorithm gives no fracture as "No injury". The calculator gave A0 for no fracture at all; it now asks about a process fracture. A1-A4 match ("Fracture of a single endplate without involvement of the posterior wall", etc.). |
| AO-2 | partly, changed | B1 "Monosegmental pure osseous failure of the posterior tension band. The classical Chance fracture." B2 "Bony and/or ligamentary failure of the posterior tension band together with a Type A fracture. Type A fracture should be classified separately." B3: "Anterior structures, especially the ALL are ruptured but there is a posterior hinge". Wording updated. |
| AO-3 | yes, reworded | "Displacement or dislocation ... Can be combined with subtypes of A or B." |
| AO-4 | yes | The algorithm asks displacement first (C), then anterior tension band (B3), then posterior osseoligamentous (B2), then monosegmental osseous (B1), then the body. |
| AO-5 | yes, notation changed | "Type A fracture should be classified separately"; nomenclature examples "T8-T9: C (T9: A3; N3; M2)" and "L1: A4 (N0; M1)". The thoracolumbar code now follows that form; subaxial keeps the site's own. |
| AO-8 (TL) | yes, reworded | "N2 Radicular symptoms", "N3 Incomplete spinal cord injury or any degree of cauda equina injury". |
| AO-9 (TL) | partly, changed | "+ Continued spinal cord compression", listed with the grades and not tied to N3. Thoracolumbar now allows "+" with any grade. |
| AO-10 (TL) | partly, changed | M1 "an indeterminate injury to the tension band based on spinal imaging with or without MRI" (was "on imaging or examination"); M2 "a patient-specific comorbidity ... Examples ... ankylosing spondylitis or burns affecting the skin overlying the injured spine" (was "ankylosing spondylitis or DISH"). |

## Third check, 2026-10-25: second batch from the author

Read in full: Vu C, Gendelberg D. Classifications in brief: AO thoracolumbar classification system.
Clin Orthop Relat Res. 2020;478(2):434-440. doi:10.1097/CORR.0000000000001086. It agrees with the
poster on the types, the order, N0 to NX and "+" ("a '+' is designated for continued spinal cord
compression", not tied to N3). Two small differences, kept as the poster has them, since the poster
is AO Spine's own and the two are the same age:

- M1: "indeterminate injuries to tension bands based on imaging or a physical examination" (the
  poster says imaging, with or without MRI).
- Notation: "each injury can be classified separately, with the more severe injury written first ...
  T5–T6 B2; T6 A1" (the poster puts the secondary injury in brackets: "C (T9: A3; N3; M2)").

M2 examples in the review: "ankylosing spondylitis, skin injuries overlying a fracture, or
rheumatologic conditions"; table: "rheumatoid arthritis, osteoporosis, or ankylosing spondylitis".

## Fourth check, 2026-10-25: third batch from the author

Read in full: AO Spine Subaxial Injury Classification System poster. © 2020 AO Foundation, AO Spine, CC
BY-NC-ND 4.0 (citing Vaccaro 2015/2016). Hosted unchanged at
`public/references/aospine-subaxial-poster.pdf`, linked beside the thoracolumbar poster.

| ID | Verdict | Evidence |
|----|---------|----------|
| AO-1 (subaxial) | yes, A0 reworded | A0 "No bony injury or minor injury such as an isolated lamina fracture or spinous process fracture"; the algorithm gives no process fracture as "No injury". The page asks about a lamina or spinous process in the neck. A1-A4 match. |
| AO-2 (subaxial) | yes | B1 "Physical separation through fractured bony structures only"; B2 "Complete disruption of the posterior capsuloligamentous or bony capsuloligamentous structures together with a vertebral body, disc, and/or facet injury"; B3 "Physical disruption or separation of the anterior structures (bone/disc) with tethering of the posterior elements". |
| AO-3 | yes | "Translational injury in any axis: displacement or translation of one vertebral body relative to another in any direction". |
| AO-6 | yes | F1 "Nondisplaced facet fracture with fragment <1cm in height, <40% of lateral mass"; F2 "Facet fracture with potential for instability: with fragment >1cm, > than 40% lateral mass, or displaced"; F3 "Floating lateral mass"; F4 "Pathologic subluxation or perched/dislocated facet". Exactly 1 cm or 40% is not stated; still read as F2. "If there are multiple injuries to the same facet ... only the highest level facet injury is classified." |
| AO-7 | yes | "BL Bilateral injury". |
| AO-8 (subaxial) | yes, changed | Same grades as the thoracolumbar poster: "N2 Radicular symptoms", "N3 Incomplete spinal cord injury or any degree of cauda equina injury" (was "radiculopathy" and "incomplete spinal cord injury"). |
| AO-9 (subaxial) | yes, changed | "+ Continued spinal cord compression", tied to no grade (was N3 only). |
| AO-10 (subaxial) | yes, OLF added | M1 "Posterior Capsuloligamentous Complex injury without complete disruption"; M2 "Critical disc herniation"; M3 "Stiffening/metabolic bone disease (ie DISH, AS, OPLL, OLF)"; M4 "Vertebral artery abnormality". |
| AO-5 (subaxial) | yes, notation changed | "C6-C7: C (C7: A1)"; "C6-C7: B2 (F4, F2, N2, M3)"; "If only facet injuries are identified – no A, B, or C injury –, they are listed first after the level of injury." The subaxial code now follows this, commas inside the brackets; facet-only injuries are coded. |

## Fifth check, 2026-10-29: posters re-read and open sources

The to-do list (`docs/REMAINING_TASKS.md`) still lists AO-4, AO-5, AO-7, AO-9, AO-11 and AO-12 as
unchecked. Four of those were already settled by the posters (second and fourth checks above); the to-do
is stale for them. Its "AO-7 (the 1 cm / 40% boundary)" mixes two claims: AO-7 is the "BL" notation,
settled; the boundary is part of AO-6 and is still open. Open full text read from Europe PMC.

| ID | Verdict | Evidence |
|----|---------|----------|
| AO-4 | yes (already, both systems) | Thoracolumbar: second check. The subaxial poster's algorithm is the same: "Displacement/Dislocation" YES → "C Translation"; else "Tension band injury" → "Anterior" → "B3 Hyperextension", "Posterior" → "Osseoligamentous disruption" → "B2", "Mono-segmental osseous disruption" → "B1 Pure transosseous disruption"; else the vertebral body. Also Divi SN, Schroeder GD, Oner FC, et al. Global Spine J. 2019;9(1 Suppl):77S-88S. doi:10.1177/2192568219827260 (PMC6512201): "Each region is classified according to a hierarchical system with increasing levels of injury or instability. If multiple injuries to the spine exist in a single patient, the worst injury is listed first". |
| AO-5 | yes (already, both systems) | Second check (thoracolumbar: "Type A fracture should be classified separately"; "T8-T9: C (T9: A3; N3; M2)") and fourth check (subaxial: "C6-C7: C (C7: A1)"). |
| AO-6, the exact 1 cm / 40% boundary | no, still unread | Every open source uses strict signs on both sides, so exactly 1 cm or 40% is in neither grade. Subaxial poster: F1 "<1cm in height, <40% of lateral mass"; F2 ">1cm, > than 40% lateral mass, or displaced". Cabrera JP, et al. Global Spine J. 2023;13(2):344-352 (PMC9972275): "F1. Non-displaced facet fracture; fragment of less than 1 cm and less than 40% of the lateral mass. F2. Facet fracture with potential for instability; fragment of >1 cm or >40% of the lateral mass or displaced fragment." Kweh BTS, Vaccaro AR, et al. Global Spine J. 2026 (PMC12882831): "F2 facet fractures involving greater than 1 centimetre bony fragmentation or greater than 40% of the lateral mass". Still read as F2 (the site's reading); needs Vaccaro 2016's full text. |
| AO-7 | yes (already) | Fourth check: "BL Bilateral injury". |
| AO-9 | yes (already), **one point for the author** | Second and fourth checks: "+ Continued spinal cord compression", listed with the grades on both posters, tied to none. Divi 2019 (PMC6512201): "The plus sign (+) modifier is used to signify continued spinal cord compression in a patient with a neurological injury." The calculator asks about compression for any grade, so it can write "N0+". Keep, or offer "+" only with a deficit (N1 to N4)? Nothing changed. |
| AO-11 | yes, citation added | Divi 2019 (PMC6512201): "Morphologic classification is based on radiologic exams and described separately for different regions ... Neurology is denoted starting with N and describes the neurologic status at the initial clinical examination at the emergency room." Cited on the AO Spine page after "Neurology comes from the examination, not the images." |
| AO-12 | yes | Divi 2019 (PMC6512201): "The current AOSpine Trauma classification subdivides the spinal column into 4 regions: the upper cervical spine (C0-C2), subaxial cervical spine (C3-C7), thoracolumbar spine (T1-L5), and the sacral spine (S1-S5, including coccyx)." The page states this only through its region label, "Subaxial cervical (C3–C7)", so no citation was added. |

Applied: Divi 2019 added to the AO Spine page's references (checked on Crossref) and cited for AO-11;
the page's source note, the `aospine.ts` header and the test labels now name the exact 1 cm / 40%
boundary (AO-6) as the one point still unchecked. No rule or wording changed.
