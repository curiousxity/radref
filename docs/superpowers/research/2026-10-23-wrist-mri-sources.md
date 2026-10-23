# Wrist MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: nothing here is verified yet

This file was written in a cloud session whose network blocks PubMed, PubMed Central,
Crossref, doi.org and Europe PMC. The author chose (2026-10-23) to draft the pages anyway and
check them later on a computer. So:

- Every reference below was chosen and written **from memory**. Titles, authors, years,
  volumes and pages may be wrong, and a paper may not say what is attributed to it.
- Every claim row is **Verified = to check**. None of them has been read in an abstract or
  full text.
- The site code marks this state: the references have no `doi`, inline citations are plain
  text (no `<Cite>` links), and the study's source note starts with "Unchecked draft".
  `src/studies/WristMriStudy.test.ts` pins that, so the unchecked state cannot be lost by
  accident.
- The four wrist classifications (Mayfield, Herbert, Palmer, Lichtman) live in shared logic
  (`src/logic/mayfield.ts`, `herbert.ts`, `palmer.ts`, `lichtman.ts`). Their wording is claimed
  in `2026-10-23-wrist-calculators-sources.md` (claims MF-, HB-, PA-, LI-); this file refers to
  those IDs rather than repeating them.
- Do not merge this branch to `main` before the check, because `main` deploys.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`, "How this was checked"):

1. For each reference, find it on PubMed (`esearch`/`esummary`) and resolve its DOI on
   Crossref. Correct the citation text in this file and in `src/studies/WristMriStudy.tsx`.
   Drop a reference that cannot be matched, and every claim that rests on it.
2. For each claim, read the abstract (`efetch rettype=abstract`) or open full text (PMC).
   Mark it **yes** with the quote and its location, or **no** with what the paper says.
3. A claim marked **no**: remove the rule or chip and keep a descriptive field, and list it in
   an "Omitted claims for the author" section at the end of this file. Do not quietly reword
   it (CLAUDE.md, Studies section).
4. Once every claim is settled: add `doi` to each reference, switch the plain-text citations
   to `<Cite doi>`, change the source note to the ankle wording, and update the tests that pin
   the unchecked state, saying in the commit why they changed.

## References

Candidate DOIs are from memory and **unconfirmed**; most are left blank rather than guessed.

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| R1 | Linscheid RL, Dobyns JH, Beabout JW, Bryan RS. Traumatic instability of the wrist. Diagnosis, classification, and pathomechanics. J Bone Joint Surg Am. 1972;54(8):1612-1632. | — | DISI, VISI, scapholunate angle |
| R2 | Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241. | 10.1016/s0363-5023(80)80007-4 (unconfirmed) | Mayfield stages (claims MF-) |
| R3 | Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123. | — | Herbert types (claims HB-) |
| R4 | Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606. | 10.1016/0363-5023(89)90174-3 (unconfirmed) | Palmer classes (claims PA-) |
| R5 | Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck's disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908. | — | Lichtman stages (claims LI-) |
| R6 | Gaebler C, Kukla C, Breitenseher M, Trattnig S, Mittlboeck M, Vécsei V. Magnetic resonance imaging of occult scaphoid fractures. J Trauma. 1996;41(1):73-76. | — | Occult scaphoid fracture |
| R7 | Imaeda T, Nakamura R, Shionoya K, Makino N. Ulnar impaction syndrome: MR imaging findings. Radiology. 1996;201(2):495-500. | 10.1148/radiology.201.2.8888248 (unconfirmed) | Ulnar impaction |
| R8 | Cerezal L, del Piñal F, Abascal F, García-Valtuille R, Pereda T, Canga A. Imaging findings in ulnar-sided wrist impaction syndromes. Radiographics. 2002;22(1):105-121. | 10.1148/radiographics.22.1.g02ja01105 (unconfirmed) | Ulnar impaction versus Kienböck |
| R9 | Viegas SF, Wagner K, Patterson R, Peterson P. Medial (hamate) facet of the lunate. J Hand Surg Am. 1990;15(4):564-571. | — | Lunate type II |
| R10 | Zanetti M, Linkous MD, Gilula LA, Hodler J. Characteristics of triangular fibrocartilage defects in symptomatic and contralateral asymptomatic wrists. Radiology. 2000;216(3):840-845. | — | TFCC defects in asymptomatic wrists |
| R11 | Theumann NH, Pfirrmann CW, Antonio GE, Chung CB, Gilula LA, Trudell DJ, Resnick D. Extrinsic carpal ligaments: normal MR arthrographic appearance in cadavers. Radiology. 2003;226(1):171-179. | — | Extrinsic ligaments |
| R12 | Glajchen N, Schweitzer M. MRI features in de Quervain's tenosynovitis of the wrist. Skeletal Radiol. 1996;25(1):63-65. | — | de Quervain |
| R13 | Costa CR, Morrison WB, Carrino JA. MRI features of intersection syndrome of the forearm. AJR Am J Roentgenol. 2003;181(5):1245-1249. | — | Intersection syndrome |
| R14 | Mesgarzadeh M, Schneck CD, Bonakdarpour A, Mitra A, Conaway D. Carpal tunnel: MR imaging. Part II. Carpal tunnel syndrome. Radiology. 1989;171(3):749-754. | — | Median nerve signs |
| R15 | Zeiss J, Jakab E, Khimji T, Imbriglia J. The ulnar tunnel at the wrist (Guyon's canal): normal MR anatomy and variants. AJR Am J Roentgenol. 1992;158(5):1081-1085. | — | Guyon canal, accessory muscles |
| R16 | Berger RA. The gross and histologic anatomy of the scapholunate interosseous ligament. J Hand Surg Am. 1996;21(2):170-178. | — | Scapholunate ligament parts |
| R17 | Vo P, Wright T, Hayden F, Dell P, Chidgey L. Evaluating dorsal wrist pain: MRI diagnosis of occult dorsal wrist ganglion. J Hand Surg Am. 1995;20(4):667-670. | — | Occult dorsal ganglion |
| R18 | Conway WF, Destouet JM, Gilula LA, Bellinghausen HW, Weeks PM. The carpal boss: an overview of radiographic evaluation. Radiology. 1985;156(1):29-31. | — | Carpal boss, os styloideum |

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Step 1: history, technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| — | The protocol checklist (three planes, fat-suppressed fluid-sensitive imaging, a T1-weighted sequence) is the site's own, presented with no citation. | — | — | site's own |
| W1-1 | A fall on the outstretched hand is the usual mechanism of scaphoid fracture and of perilunate injury. | descriptive | R2, R6 | to check |

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W2-1 | MRI shows occult scaphoid fractures in patients whose initial radiographs are normal. | descriptive | R6 | to check |
| W2-2 | Herbert types A1–D2 and their groups. | via shared logic | R3 (claims HB-) | to check |
| W2-3 | Lichtman stages I–IV; stage I has normal radiographs, and MRI is the test that shows it. | via shared logic | R5 (claims LI-) | to check |
| W2-4 | Ulnar impaction gives focal abnormal signal in the ulnar (medial) part of the proximal lunate, sometimes also in the triquetrum and ulnar head, and goes with positive ulnar variance. | focal ulnar-side lunate signal + positive variance → fits ulnar impaction; + negative variance → warning | R7, R8 | to check |
| W2-5 | Kienböck disease is distinguished from ulnar impaction by diffuse rather than focal lunate signal. | diffuse → Kienböck pattern (Lichtman field shown) | R8 | to check |

### Step 3: scapholunate ligament and DISI

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W3-1 | The scapholunate ligament has dorsal, proximal (membranous) and volar parts; the dorsal part is the strongest. | descriptive | R16 | to check |
| W3-2 | The normal scapholunate angle is 30° to 60°; above 60° suggests dorsal intercalated segment instability (DISI), below 30° volar intercalated segment instability (VISI). | 30–60° normal; > 60° DISI; < 30° VISI | R1 | to check (Linscheid measured on lateral radiographs; check whether these bounds and the use on sagittal MRI hold) |

### Step 4: lunotriquetral ligament and VISI

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W4-1 | Lunotriquetral ligament disruption goes with VISI. | descriptive | R1 | to check |

### Step 5: perilunate injury

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W5-1 | Mayfield's progressive perilunar instability: stages I–IV, radial to ulnar. | via shared logic | R2 (claims MF-) | to check |
| W5-2 | In the sequence the scapholunate is disrupted first, unless the injury passes through the scaphoid (a greater-arc injury), so a stage III or IV injury with an intact scapholunate ligament and no scaphoid fracture is inconsistent. | warning | R2 | to check |

### Step 6: TFCC and ulnar variance

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W6-1 | Palmer classes 1A–1D (traumatic) and 2A–2E (degenerative). | via shared logic | R4 (claims PA-) | to check |
| W6-2 | Palmer 2D and 2E include perforation of the lunotriquetral ligament, so either with an intact lunotriquetral ligament is inconsistent. | warning | R4 (claims PA-) | to check |
| W6-3 | TFC defects are also found in the asymptomatic contralateral wrist, so a defect is not by itself the cause of pain. | descriptive | R10 | to check |

### Step 7: extrinsic ligaments

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W7-1 | The dorsal and volar extrinsic ligaments can be identified on MR arthrography. | descriptive | R11 | to check |

### Step 8: extensor compartments

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W8-1 | de Quervain tenosynovitis: thickening of the abductor pollicis longus and extensor pollicis brevis tendons with increased signal within and around them. | descriptive | R12 | to check |
| W8-2 | Intersection syndrome: peritendinous edema where the first compartment crosses the second, proximal to Lister's tubercle. | descriptive | R13 | to check |

### Step 9: flexor tendons and carpal tunnel

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W9-1 | MRI signs of carpal tunnel syndrome: swelling of the median nerve (at the pisiform), flattening (at the hamate), palmar bowing of the flexor retinaculum, and increased T2 signal in the nerve. | descriptive | R14 | to check |

### Step 10: Guyon canal

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W10-1 | The Guyon canal contents, and variants including accessory muscles, are shown on MRI. | descriptive | R15 | to check |

### Step 11: ganglia and synovium

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W11-1 | MRI finds occult dorsal ganglia in patients with dorsal wrist pain. | descriptive | R17 | to check |

### Step 12: variants (each gets its own impression line, by the author's decision)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| W12-1 | A type II lunate has a medial facet that articulates with the hamate. | descriptive | R9 | to check |
| W12-2 | The carpal boss is a bony prominence at the base of the second and third metacarpals, sometimes an os styloideum. | descriptive | R18 | to check |
| W12-3 | Accessory muscles occur in and around the Guyon canal. | descriptive | R15 | to check |

Ulnar variance is reported as a descriptor (positive, neutral, negative), not as a variant
line. A bifid median nerve and a persistent median artery are offered as variants without a
cited rule.
