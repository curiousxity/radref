# Foot MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: nothing here is verified yet

This file was written in a cloud session whose network blocks PubMed, PubMed Central,
Crossref, doi.org and Europe PMC. So:

- Every reference below was chosen and written **from memory**. Titles, authors, years,
  volumes and pages may be wrong, and a paper may not say what is attributed to it.
- Every claim row is **Verified = to check**. None of them has been read in an abstract or
  full text.
- The site code marks this state: the references have no `doi`, inline citations are plain
  text (no `<Cite>` links), and the study's source note starts with "Unchecked draft".
  `src/studies/FootMriStudy.test.ts` pins that, so the unchecked state cannot be lost by
  accident.
- The three foot classifications (Hawkins, Sanders, Myerson) live in shared logic
  (`src/logic/hawkins.ts`, `sanders.ts`, `myerson.ts`). Their wording is claimed in
  `2026-10-23-foot-calculators-sources.md` (claims HK-, SA-, MY-); this file refers to those
  IDs rather than repeating them.
- The plantar fascia step makes no claim of its own: it points to the ankle MRI study, step
  11, whose papers were checked in September 2026. The fifth metatarsal zones likewise point
  to the fifth metatarsal page.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`, "How this was checked"):

1. For each reference, find it on PubMed (`esearch`/`esummary`) and resolve its DOI on
   Crossref. Correct the citation text in this file and in `src/studies/FootMriStudy.tsx`.
   Drop a reference that cannot be matched, and every claim that rests on it.
2. For each claim, read the abstract (`efetch rettype=abstract`) or open full text (PMC).
   Mark it **yes** with the quote and its location, or **no** with what the paper says.
3. A claim marked **no**: remove the rule or chip and keep a descriptive field, and list it in
   an "Omitted claims for the author" section at the end of this file. Do not quietly reword
   it (CLAUDE.md, Studies section).
4. Once every claim is settled: add `doi` to each reference, switch the plain-text citations
   to `<Cite doi>`, change the source note to the ankle wording, and update the tests that pin
   the unchecked state, saying in the commit why they changed.

The 3D foot viewer (`public/anatomy/online/foot.html`) lists PMIDs and DOIs for some of the
same papers (Zanetti 1997: PMID 9114115, DOI 10.1148/radiology.203.2.9114115). Use them as
a starting point, not as proof.

## References

Candidate DOIs are from memory and **unconfirmed**; most are left blank rather than guessed.

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| R1 | Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002. | — | Hawkins types (HK-), osteonecrosis, Hawkins sign |
| R2 | Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156. | — | Hawkins type IV |
| R3 | Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95. | — | Sanders types (SA-) |
| R4 | Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242. | — | Myerson types (MY-) |
| R5 | Castro M, Melão L, Canella C, Weber M, Negrão P, Trudell D, Resnick D. Lisfranc joint ligamentous complex: MRI with anatomic correlation in cadavers. AJR Am J Roentgenol. 2010;195(6):W447-W455. | — | Lisfranc ligament anatomy |
| R6 | Raikin SM, Elias I, Dheer S, Besser MP, Morrison WB, Zoga AC. Prediction of midfoot instability in the subtle Lisfranc injury. Comparison of magnetic resonance imaging with intraoperative findings. J Bone Joint Surg Am. 2009;91(4):892-899. | — | Plantar ligament and instability |
| R7 | Newman JS, Newberg AH. Congenital tarsal coalition: multimodality evaluation with emphasis on CT and MR imaging. Radiographics. 2000;20(2):321-332. | — | Tarsal coalition |
| R8 | Miller TT, Staron RB, Feldman F, Parisien M, Glucksman WJ, Gandolfo LH. The symptomatic accessory tarsal navicular bone: assessment with MR imaging. Radiology. 1995;195(3):849-853. | — | Accessory navicular |
| R9 | Ashman CJ, Klecker RJ, Yu JS. Forefoot pain involving the metatarsal region: differential diagnosis with MR imaging. Radiographics. 2001;21(6):1425-1440. | — | Stress injury, Freiberg, Morton neuroma site and signal |
| R10 | Zanetti M, Strehle JK, Zollinger H, Hodler J. Morton neuroma and fluid in the intermetatarsal bursae on MR images of 70 asymptomatic volunteers. Radiology. 1997;203(2):516-520. | 10.1148/radiology.203.2.9114115 (from the foot viewer, unconfirmed) | Neuromas and bursal fluid without symptoms |
| R11 | Bencardino J, Rosenberg ZS, Beltran J, Liu X, Marty-Delfaut E. Morton's neuroma: is it always symptomatic? AJR Am J Roentgenol. 2000;175(3):649-653. | — | 5 mm neuroma size |
| R12 | Umans H, Srinivasan R, Elsinger E, Wilde GE. MRI of lesser metatarsophalangeal joint plantar plate tears and associated adjacent interspace lesions. Skeletal Radiol. 2014;43(10):1361-1368. | — | Plantar plate tears, pericapsular fibrosis |
| R13 | Sanders TG, Rathur SK. Imaging of painful conditions of the hallucal sesamoid complex and plantar capsular structures of the first metatarsophalangeal joint. Radiol Clin North Am. 2008;46(6):1079-1092. | — | Turf toe, sesamoids |
| R14 | Sobel M, Pavlov H, Geppert MJ, Thompson FM, DiCarlo EF, Davis WH. Painful os peroneum syndrome: a spectrum of conditions responsible for plantar lateral foot pain. Foot Ankle Int. 1994;15(3):112-124. | — | Painful os peroneum syndrome |

## Claims

### Step 1. History, technique and the global look

No claims. The search order, the protocol checklist and the pointers from the history
(twisting injury → Lisfranc and fifth metatarsal base; fall or crush → talus and calcaneus;
pain alone → stress injury and forefoot) are the site's own and say so on the page.

### Step 2. Hindfoot and midfoot bones

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F2-1 | Talar neck fractures are typed by Hawkins (R1), type IV by Canale and Kelly (R2); osteonecrosis risk rises with type (HK-7); the Hawkins sign (HK-8). | Hawkins chip, from shared logic | to check |
| F2-2 | Intra-articular calcaneal fractures are typed by Sanders on coronal CT (SA-1); MRI shows the fracture but the type belongs to CT. | Sanders chip, from shared logic | to check |
| F2-3 | The commonest tarsal coalitions are calcaneonavicular and talocalcaneal (middle facet); coalitions are osseous or non-osseous (fibrous or cartilaginous), and MRI shows non-osseous ones, with irregular joint margins and marrow edema on both sides (R7). | — | to check |

### Step 3. Lisfranc complex

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F3-1 | The Lisfranc ligament complex has dorsal, interosseous and plantar ligaments; the interosseous (medial cuneiform to second metatarsal base) is the Lisfranc ligament proper and the strongest (R5). | — | to check |
| F3-2 | The plantar ligament runs from the medial cuneiform to the bases of the second and third metatarsals (R5). | — | to check |
| F3-3 | In subtle Lisfranc injuries, disruption of the plantar ligament on MRI predicted midfoot instability at surgery (R6). Did R6 count a sprain (grade 2) as well as a rupture? The page fires the chip for a tear only. | plantar torn → warn chip, impression clause | to check |
| F3-4 | Fracture-dislocations are typed by Myerson (R4, MY-). | Myerson chip, from shared logic | to check |

### Step 4. Metatarsals

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F4-1 | Metatarsal stress injury shows as marrow edema without a fracture line (stress reaction) or with a low-signal fracture line (stress fracture), commonest in the second and third metatarsals (R9). | — | to check |
| F4-2 | Freiberg infraction is osteonecrosis of a metatarsal head, most often the second, with flattening of the head (R9). | — | to check |

### Step 5. First MTP joint and sesamoids

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F5-1 | Turf toe is an injury of the plantar capsule and plantar plate of the first MTP joint, from forced dorsiflexion (R13). | — | to check |
| F5-2 | A fractured sesamoid has sharp, irregular margins; a bipartite sesamoid has smooth, corticated margins, is often bilateral, and is usually the medial (tibial) one (R13). | — | to check |
| F5-3 | Marrow edema in a sesamoid without a fracture line fits sesamoiditis (R13). | — | to check |

### Step 6. Lesser MTP joints and plantar plates

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F6-1 | Lesser MTP plantar plate tears are commonest at the second MTP joint (R12). | — | to check |
| F6-2 | A plantar plate tear often comes with a lesion in the adjacent intermetatarsal space, pericapsular fibrosis, that can look like a Morton neuroma (R12). | plate tear at joint n + neuroma in space n − 1 or n → warning | to check |

### Step 7. Intermetatarsal spaces

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F7-1 | A Morton neuroma is commonest in the third space, then the second; it lies plantar to the deep transverse intermetatarsal ligament, with low to intermediate signal on T1- and T2-weighted images (R9). | — | to check |
| F7-2 | Neuroma-like lesions were found in about a third of 70 volunteers without symptoms (R10). | under 5 mm → neutral chip | to check |
| F7-3 | In the same volunteers, fluid up to 3 mm in transverse diameter was found in the first three intermetatarsal bursae (R10). | spaces 1–3: ≤ 3 mm good chip and no impression line; > 3 mm warn chip; space 4 neutral chip and an impression line | to check |
| F7-4 | Neuromas of 5 mm or more in transverse diameter were the ones that went with symptoms (R11). Is the 5 mm from R11, or from R10 or Zanetti et al., AJR 1997? Move the citation if so. | ≥ 5 mm → warn chip | to check |

### Step 9. Tendons and their ossicles

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F9-1 | Painful os peroneum syndrome is a spectrum: fracture or separation of the os peroneum, fraying or rupture of the peroneus longus beside it, and an enlarged peroneal tubercle (R14). | abnormal os peroneum → impression line | to check |
| F9-2 | In patients with pain at the tibialis posterior insertion, MRI showed marrow edema in the accessory navicular, sometimes across its synchondrosis (R8). | edema → impression line "suggests it is the source of pain" | to check |

### Step 10. Variants

No claims. Each variant gets its own impression line: the author's decision (2026-10-23),
applied as in the ankle, knee, shoulder and wrist.
