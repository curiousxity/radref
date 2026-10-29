# Foot MRI study: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

- The three foot classifications (Hawkins, Sanders, Myerson) live in shared logic
  (`src/logic/hawkins.ts`, `sanders.ts`, `myerson.ts`). Their wording is claimed in
  `2026-10-23-foot-calculators-sources.md` (claims HK-, SA-, MY-); this file refers to those
  IDs rather than repeating them.
- The plantar fascia step makes no claim of its own: it points to the ankle MRI study, step
  11, whose papers were checked in September 2026. The fifth metatarsal zones likewise point
  to the fifth metatarsal page.

## Status: references matched, claims partly verified (2026-10-23)

The draft was written from memory in a cloud session that could not reach PubMed. It was
checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esearch`/`esummary`), its DOI resolved on Crossref
(by `query.bibliographic` search for the three papers PubMed lists without a DOI), and a claim
marked verified only when its wording was read in the PubMed abstract (`efetch
rettype=abstract`). All 14 references were found, and every citation matches its PubMed
record. None has a PMC copy; Unpaywall refused the placeholder address used for the check, so
no open copy was found, and the RSNA, AJR and JBJS publisher pages were not tried (they return
403). Everything here is abstract-only. Hawkins 1970 (R1) has no abstract in PubMed, and three
review articles (R9 Ashman, R13 Sanders and Rathur, and the anatomy of R5 Castro) give only a
general abstract, so the claims resting on them cannot be verified yet.

The author decided (2026-10-23): add the DOIs and switch the citations to `<Cite doi>` links;
keep the claims that no abstract states, with the "Unchecked draft" source note, until they can
be checked; and rewrite every claim that differs from its paper to the paper's own wording,
moving a citation to the paper that states it. Applied the same day (see "Changes applied"
at the end). `src/studies/FootMriStudy.test.ts` now pins a DOI on every reference and keeps
the "Unchecked draft" prefix.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| R1 | Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002. | 5479485 | 10.2106/00004623-197052050-00013 | No abstract |
| R2 | Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156. | 417084 | 10.2106/00004623-197860020-00001 | Abstract |
| R3 | Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95. | 8472475 | 10.1097/00003086-199305000-00012 | Abstract (truncated at 250 words) |
| R4 | Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242. | 3710321 | 10.1177/107110078600600504 | Abstract |
| R5 | Castro M, Melão L, Canella C, Weber M, Negrão P, Trudell D, Resnick D. Lisfranc joint ligamentous complex: MRI with anatomic correlation in cadavers. AJR Am J Roentgenol. 2010;195(6):W447-W455. | 21098178 | 10.2214/AJR.10.4674 | Abstract |
| R6 | Raikin SM, Elias I, Dheer S, Besser MP, Morrison WB, Zoga AC. Prediction of midfoot instability in the subtle Lisfranc injury. Comparison of magnetic resonance imaging with intraoperative findings. J Bone Joint Surg Am. 2009;91(4):892-899. | 19339574 | 10.2106/JBJS.H.01075 | Abstract |
| R7 | Newman JS, Newberg AH. Congenital tarsal coalition: multimodality evaluation with emphasis on CT and MR imaging. Radiographics. 2000;20(2):321-332. | 10715334 | 10.1148/radiographics.20.2.g00mc03321 | Abstract |
| R8 | Miller TT, Staron RB, Feldman F, Parisien M, Glucksman WJ, Gandolfo LH. The symptomatic accessory tarsal navicular bone: assessment with MR imaging. Radiology. 1995;195(3):849-853. | 7754020 | 10.1148/radiology.195.3.7754020 | Abstract |
| R9 | Ashman CJ, Klecker RJ, Yu JS. Forefoot pain involving the metatarsal region: differential diagnosis with MR imaging. Radiographics. 2001;21(6):1425-1440. | 11706214 | 10.1148/radiographics.21.6.g01nv071425 | Abstract (general) |
| R10 | Zanetti M, Strehle JK, Zollinger H, Hodler J. Morton neuroma and fluid in the intermetatarsal bursae on MR images of 70 asymptomatic volunteers. Radiology. 1997;203(2):516-520. | 9114115 | 10.1148/radiology.203.2.9114115 | Abstract |
| R11 | Bencardino J, Rosenberg ZS, Beltran J, Liu X, Marty-Delfaut E. Morton's neuroma: is it always symptomatic? AJR Am J Roentgenol. 2000;175(3):649-653. | 10954445 | 10.2214/ajr.175.3.1750649 | Abstract |
| R12 | Umans H, Srinivasan R, Elsinger E, Wilde GE. MRI of lesser metatarsophalangeal joint plantar plate tears and associated adjacent interspace lesions. Skeletal Radiol. 2014;43(10):1361-1368. | 24880715 | 10.1007/s00256-014-1920-8 | Abstract |
| R13 | Sanders TG, Rathur SK. Imaging of painful conditions of the hallucal sesamoid complex and plantar capsular structures of the first metatarsophalangeal joint. Radiol Clin North Am. 2008;46(6):1079-1092. | 19038614 | 10.1016/j.rcl.2008.09.001 | Abstract (general) |
| R14 | Sobel M, Pavlov H, Geppert MJ, Thompson FM, DiCarlo EF, Davis WH. Painful os peroneum syndrome: a spectrum of conditions responsible for plantar lateral foot pain. Foot Ankle Int. 1994;15(3):112-124. | 7951939 | 10.1177/107110079401500306 | Abstract (truncated at 250 words) |

Notes on the set:

- Every citation as drafted matches PubMed (authors, title, journal, year, volume, issue,
  pages); no text needs correcting. PubMed abbreviates the page ranges (e.g. 991-1002, 143-56);
  the full ranges above agree with Crossref.
- R1, R2, R3: PubMed has no DOI. The DOIs were found on Crossref by bibliographic search and
  their Crossref records match title, authors, volume, issue and pages.
- R7: PubMed adds "quiz 526-7, 532" after the pages; the page can keep 321-332.
- R10: the candidate DOI from the foot viewer (10.1148/radiology.203.2.9114115) is confirmed.
- R11: Crossref's title field holds only "Morton's Neuroma"; PubMed's full title is the one
  used.
- The 5 mm neuroma threshold (F7-4) is stated in R10's abstract, not R11's. The draft asked
  whether it came from "Zanetti et al., AJR 1997": that paper exists (Zanetti M, Ledermann T,
  Zollinger H, Hodler J. Efficacy of MR imaging in patients suspected of having Morton's
  neuroma. AJR Am J Roentgenol. 1997;168(2):529-532. PMID 9016241, DOI
  10.2214/ajr.168.2.9016241) but was not read for this check; the 5 mm sentence quoted below is
  from R10 (Radiology 1997).

## Claims

### Step 1. History, technique and the global look

No claims. The search order, the protocol checklist and the pointers from the history
(twisting injury → Lisfranc and fifth metatarsal base; fall or crush → talus and calcaneus;
pain alone → stress injury and forefoot) are the site's own and say so on the page.

### Step 2. Hindfoot and midfoot bones

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F2-1 | Talar neck fractures are typed by Hawkins (R1), type IV by Canale and Kelly (R2); osteonecrosis risk rises with type (HK-7); the Hawkins sign (HK-8). | Hawkins chip, from shared logic | partly. The rising risk is in R2's abstract: "Avascular necrosis of the talar body occurred in 52 per cent of the fractures (in two of thirteen non-displaced fractures, in half of the fractures with subluxation or dislocation of the subtalar joint, and in sixteen of nineteen fractures with complete dislocation of the body of the talus)." Type IV and the Hawkins sign are not in R2's abstract, and R1 has none. See HK-1 to HK-8. Rest unchecked. |
| F2-2 | Intra-articular calcaneal fractures are typed by Sanders on coronal CT (SA-1); MRI shows the fracture but the type belongs to CT. | Sanders chip, from shared logic | partly. R3 abstract: "a classification for intraarticular calcaneal fractures was developed, based on standardized coronal and transverse computed tomography (CT) scans of both feet." The widest-facet image (SA-1) is not in the abstract; "the type belongs to CT" is the site's own reading of a CT-based classification. |
| F2-3 | The commonest tarsal coalitions are calcaneonavicular and talocalcaneal (middle facet); coalitions are osseous or non-osseous (fibrous or cartilaginous), and MRI shows non-osseous ones, with irregular joint margins and marrow edema on both sides (R7). | — | partly. R7 abstract: "Calcaneonavicular and talocalcaneal coalitions are encountered most frequently"; "Tarsal coalitions may be osseous, cartilaginous, or fibrous"; CT and MR "allow differentiation of osseous from nonosseous coalitions"; "Short-inversion-time inversion recovery MR images may reveal bone marrow edema along the margins of the abnormal articulation". Not in the abstract: "middle facet" and "irregular joint margins"; the abstract says edema "along the margins", not "on both sides". Rest unchecked. |

### Step 3. Lisfranc complex

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F3-1 | The Lisfranc ligament complex has dorsal, interosseous and plantar ligaments; the interosseous (medial cuneiform to second metatarsal base) is the Lisfranc ligament proper and the strongest (R5). | — | no: not in abstract. R5's abstract names only "the Lisfranc and plantar Lisfranc ligaments" and gives no anatomy or strength. Kept, unchecked. |
| F3-2 | The plantar ligament runs from the medial cuneiform to the bases of the second and third metatarsals (R5). | — | not in R5's abstract; stated in R6's. R6 abstract: "disruption of the plantar ligament between the first cuneiform and the bases of the second and third metatarsals (the pC1-M2M3 ligament)". For the author: the page cites Castro (R5) for it; the sentence that can be read is Raikin's (R6). |
| F3-3 | In subtle Lisfranc injuries, disruption of the plantar ligament on MRI predicted midfoot instability at surgery (R6). Did R6 count a sprain (grade 2) as well as a rupture? The page fires the chip for a tear only. | plantar torn → warn chip, impression clause | yes. R6 abstract: "The strongest predictor of instability was disruption of the plantar ligament between the first cuneiform and the bases of the second and third metatarsals (the pC1-M2M3 ligament), with a sensitivity, specificity, and positive predictive value of 94%, 75%, and 94%, respectively." On the question, R6 counts a grade-2 sprain: "Rupture or grade-2 sprain of the plantar ligament between the first cuneiform and the bases of the second and third metatarsals is highly suggestive of an unstable midfoot". For the author: the chip fires for a tear only, narrower than the paper. |
| F3-4 | Fracture-dislocations are typed by Myerson (R4, MY-). | Myerson chip, from shared logic | no: not in abstract. R4's abstract gives outcomes and treatment but not the classification. See MY-1 to MY-6. |

### Step 4. Metatarsals

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F4-1 | Metatarsal stress injury shows as marrow edema without a fracture line (stress reaction) or with a low-signal fracture line (stress fracture), commonest in the second and third metatarsals (R9). | — | no: not in abstract. R9's abstract only lists "stress fracture, stress response" among the disorders. Kept, unchecked. |
| F4-2 | Freiberg infraction is osteonecrosis of a metatarsal head, most often the second, with flattening of the head (R9). | — | no: not in abstract. R9's abstract only names "Freiberg infraction". Kept, unchecked. |

### Step 5. First MTP joint and sesamoids

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F5-1 | Turf toe is an injury of the plantar capsule and plantar plate of the first MTP joint, from forced dorsiflexion (R13). | — | no: not in abstract (R13's abstract is a general outline). Kept, unchecked. |
| F5-2 | A fractured sesamoid has sharp, irregular margins; a bipartite sesamoid has smooth, corticated margins, is often bilateral, and is usually the medial (tibial) one (R13). | — | no: not in abstract. Kept, unchecked. |
| F5-3 | Marrow edema in a sesamoid without a fracture line fits sesamoiditis (R13). | — | no: not in abstract (R9's abstract names sesamoiditis only). Kept, unchecked. |

### Step 6. Lesser MTP joints and plantar plates

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F6-1 | Lesser MTP plantar plate tears are commonest at the second MTP joint (R12). | — | yes. R12 abstract: "A total of 40 PP tears were identified: 36 at the second and 4 at the third MTP" and "MTP PP tears occurred in 40% of our cases, 90% of which occurred at the second MTP." (The study looked at the second and third joints only.) |
| F6-2 | A plantar plate tear often comes with a lesion in the adjacent intermetatarsal space, pericapsular fibrosis, that can look like a Morton neuroma (R12). | plate tear at joint n + neuroma in space n − 1 or n → warning | partly. R12 abstract: of 21 second MTP tears in women, "all of which also had second IS lesions: pericapsular fibrosis (16), bursitis (4), and ganglion (1)"; in men 14 of 15, "pericapsular fibrosis (8)"; "There was no definite second IS neuroma adjacent to any second MTP PP tear"; "Almost all coexisted with non-neuromatous second IS lesions." That the fibrosis can look like a neuroma is not in the abstract, and only the second space beside the second joint was reported (not space n − 1). Rest unchecked. |

### Step 7. Intermetatarsal spaces

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F7-1 | A Morton neuroma is commonest in the third space, then the second; it lies plantar to the deep transverse intermetatarsal ligament, with low to intermediate signal on T1- and T2-weighted images (R9). | — | partly, from R11 rather than R9. R11 abstract: "MR imaging criteria for Morton's neuroma included a low- to intermediate-signal-intensity soft-tissue mass in the intermetatarsal space." The site (third, then second) and the relation to the ligament are not in the R9 or R11 abstracts. Rest unchecked. |
| F7-2 | Neuroma-like lesions were found in about a third of 70 volunteers without symptoms (R10). | under 5 mm → neutral chip | yes. R10 abstract: "In 70 asymptomatic subjects ... Twenty-four Morton neuromas were diagnosed in 21 subjects (prevalence, 30%)." (R11 found 33% in patients without symptoms: "The prevalence of Morton's neuroma in patients with no clinical evidence of this condition was 33% (19/57).") |
| F7-3 | In the same volunteers, fluid up to 3 mm in transverse diameter was found in the first three intermetatarsal bursae (R10). | spaces 1–3: ≤ 3 mm good chip and no impression line; > 3 mm warn chip; space 4 neutral chip and an impression line | yes for the rule, with a wording difference. R10 abstract: "The prevalence of fluid in the intermetatarsal bursa was 20%, 47%, 49%, and 0% for the first through fourth intermetatarsal spaces. The transverse diameter of the fluid collection was 1-4 mm" and "Fluid collections in the first three intermetatarsal bursae with a transverse diameter of 3 mm or less can be considered physiologic." For the author: the fluid found measured 1 to 4 mm, not "up to 3 mm"; 3 mm is the paper's cut-off for physiological fluid. None was found in the fourth space, which fits the space-4 line. |
| F7-4 | Neuromas of 5 mm or more in transverse diameter were the ones that went with symptoms (R11). Is the 5 mm from R11, or from R10 or Zanetti et al., AJR 1997? Move the citation if so. | ≥ 5 mm → warn chip | **WRONG as cited, for the author.** R11 sets no 5 mm cut-off and stresses overlap: "Slightly larger lesions were observed in the symptomatic group, although significant overlap was noted between the two groups. The mean transverse diameter of symptomatic neuromas was 5.3 mm ... compared with 4.1 mm ... for asymptomatic neuromas; this difference was marginally significant (p = 0.05)" and "The MR imaging diagnosis of Morton's neuroma does not imply symptomatology." The 5 mm is in R10: "The diagnosis of Morton neuroma at MR imaging may be relevant only when the transverse diameter is 5 mm or more and can be correlated to clinical findings", with volunteers' neuromas "3-7 mm (mean, 4.5 mm) versus 4-8 mm (mean, 5.6 mm) in symptomatic subjects". So R10 supports 5 mm as a threshold of relevance, not that neuromas of 5 mm or more "were the ones that went with symptoms". Used in the step 7 text, the "Neuroma size" chip, the step 7 teach line and a quiz question and explanation in `src/studies/FootMriStudy.tsx`. |

### Step 9. Tendons and their ossicles

| ID | Claim | Rule | Verified |
|---|---|---|---|
| F9-1 | Painful os peroneum syndrome is a spectrum: fracture or separation of the os peroneum, fraying or rupture of the peroneus longus beside it, and an enlarged peroneal tubercle (R14). | abnormal os peroneum → impression line | yes. R14 abstract: the syndrome "results from a spectrum of conditions that includes one or more of the following: (1) an acute os peroneum fracture or a diastasis of a multipartite os peroneum ... (2) chronic (healing or healed) os peroneum fracture or diastasis ... (3) attrition or partial rupture of the peroneus longus tendon, proximal or distal to the os peroneum; (4) frank rupture of the peroneus longus tendon ... and/or (5) the presence of a gigantic peroneal tubercle on the lateral aspect of the calcaneus". |
| F9-2 | In patients with pain at the tibialis posterior insertion, MRI showed marrow edema in the accessory navicular, sometimes across its synchondrosis (R8). | edema → impression line "suggests it is the source of pain" | partly. R8 abstract: "A bone marrow edema pattern (BMEP) was noted in the accessory navicular bones of the five patients with focal pain and in the adjacent navicular tuberosities of three of them. The two patients with vague pain showed no osseous or soft-tissue abnormalities" and "The BMEP in a symptomatic accessory navicular bone is indicative of chronic stress and/or osteonecrosis." The patients had "focal medial foot pain", not pain stated at the tibialis posterior insertion; the abstract says the edema extended into the adjacent navicular tuberosity, not "across its synchondrosis". Seven patients only. Rest unchecked. |

### Step 10. Variants

No claims. Each variant gets its own impression line: the author's decision (2026-10-23),
applied as in the ankle, knee, shoulder and wrist.

## Changes applied (2026-10-23)

By the author's decision above, in `src/studies/FootMriStudy.tsx` and its test:

- All 14 references carry their DOI, and the inline citations are `<Cite doi>` links. The
  source note still starts "Unchecked draft" and names the claims not yet checked.
- F2-3: now in R7's wording: "Calcaneonavicular and talocalcaneal coalitions (the latter at
  the middle facet) are encountered most frequently. A coalition may be osseous, cartilaginous
  or fibrous, and CT and MRI tell osseous from non-osseous coalitions. On MRI look for irregular
  joint margins, and on STIR images for bone marrow edema along the margins of the abnormal
  articulation." Was "marrow edema on both sides". "Middle facet" and "irregular joint margins"
  stay, unchecked.
- F3-2: cited to Raikin (R6), not Castro, in R6's wording: "runs between the first cuneiform and
  the bases of the second and third metatarsals". Field help changed from "Medial cuneiform" to
  "First cuneiform".
- F3-3: the chip and the impression clause now fire for a grade-2 sprain as well as a tear, per
  R6. The plantar ligament field has its own options (intact, sprain grade 1, sprain grade 2,
  torn). Chip: "Rupture or grade-2 sprain: highly suggestive of an unstable midfoot" (was "Torn:
  predicted midfoot instability at surgery"). Impression clause: "highly suggestive of an
  unstable midfoot" (was "a finding that predicted midfoot instability at surgery"). The learn
  text, teach line and quiz say the plantar ligament was "the strongest predictor".
- F7-1: the signal part moved to Bencardino (R11) in its wording: "a low- to
  intermediate-signal-intensity soft-tissue mass in the intermetatarsal space" (was "low to
  intermediate signal on T1- and T2-weighted images", cited to Ashman). The site and the
  ligament stay with Ashman, unchecked.
- F7-4: now Zanetti (R10), not Bencardino: "The diagnosis of Morton neuroma at MR imaging may be
  relevant only when the transverse diameter is 5 mm or more and can be correlated to clinical
  findings." Chip at 5 mm or more: "5 mm or more: may be relevant if it can be correlated to
  clinical findings" (was "the size that went with symptoms"); under 5 mm: "Under 5 mm: below
  the size at which the diagnosis may be relevant" (was "neuromas this size are also found in
  feet without symptoms"). The 5 mm boundary is unchanged. Teach line and quiz reworded to match.
- F7-3: now "fluid in the intermetatarsal bursae measured 1 to 4 mm in transverse diameter, and
  none was found in the fourth space. Fluid collections in the first three bursae with a
  transverse diameter of 3 mm or less can be considered physiologic" (was "fluid up to 3 mm ...
  was found"). Chips: "3 mm or less: can be considered physiologic", "More than 3 mm: beyond the
  size considered physiologic", and for the fourth space "Fourth space: volunteers without
  symptoms had none here". The rule and its 3 mm boundary are unchanged.
- F9-2: now in R8's wording: "In patients with focal medial foot pain, MRI showed a bone marrow
  edema pattern in the accessory navicular, and in some also in the adjacent navicular
  tuberosity; in a symptomatic accessory navicular it is indicative of chronic stress and/or
  osteonecrosis." Was pain "at the tibialis posterior insertion" and edema "across the
  synchondrosis". The option now reads "Present, with marrow edema in it (and perhaps the
  adjacent navicular tuberosity)". The impression line "which suggests it is the source of pain"
  became "in a symptomatic accessory navicular this indicates chronic stress or osteonecrosis".
- Unchanged and still unchecked: F2-1 (Hawkins sign, type IV), F3-1, F3-4, F4-1, F4-2, F5-1 to
  F5-3, and the "can look like a Morton neuroma" half of F6-2 (its warning stays).

## Third check, 2026-10-28: R11 read in full

R11 (Bencardino et al., AJR 2000) was read in full on the AJR site.

- F7-1: yes for the parts cited to R11. Methods: neuromas were diagnosed as "a soft-tissue mass
  within the intermetatarsal space that had low to intermediate signal intensity on T1-weighted
  MR images and a more variable but usually low to intermediate signal intensity on T2-weighted
  MR images". The site order is in R11 too: "the third and second spaces were the most commonly
  involved sites" (19 third, 12 second, 2 first in the symptomatic group). The nerve's course
  under the intermetatarsal ligament is in R11's Fig. 1 legend; the page keeps that part with
  Ashman (R9). No change to the page.
- F7-4 (already moved to Zanetti, R10): R11's discussion agrees: Zanetti "established a threshold
  of 5 mm (in transverse diameter) beyond which the lesion is most likely symptomatic", while R11
  itself found "significant overlap" (mean 5.3 mm symptomatic, 4.1 mm silent, p = 0.05).

## Fourth check, 2026-10-28: R5 read in full

R5 (Castro et al., AJR 2010) was read in full on the AJR site, in a browser.

| ID | Verdict | Evidence |
|----|---------|----------|
| F3-1 | yes | The ligaments are grouped "into three groups: dorsal, interosseous, and plantar"; "The Lisfranc ligament is the medial (first) interosseous ligament, C1-M2, and the largest of the three interosseous ligaments"; biomechanically "the Lisfranc ligament is stronger and stiffer than the plantar Lisfranc ligament and ... the dorsal ligament is significantly weaker than the Lisfranc/plantar complex". |
| F3-2 | yes | "The second plantar ligament, C1-M2,3, was designated the plantar Lisfranc ligament"; it arises from C1 and splits into "a superficial component that inserts on the base of M3 and a deeper band that attaches at the base of M2". The page's citation of Castro for this is now backed by Castro itself. |

## Fifth check, 2026-10-29: open sources

The RSNA pages for Newman 2000, Ashman 2001, Zanetti 1997 and Miller 1995 return 403 to curl
(and Ashman to WebFetch), so their figure legends were not read. Open reviews were read in full from
Europe PMC (`fullTextXML`) instead. New references, each checked against Crossref and now cited
beside the original on the page:

- Burge AJ, Gold SL, Potter HG. Imaging of sports-related midfoot and forefoot injuries. Sports
  Health. 2012;4(6):518-534. doi:10.1177/1941738112459489 (PMC3497949).
- Nwawka OK, Hayashi D, Diaz LE, Goud AR, Arndt WF, Roemer FW, Malguria N, Guermazi A. Sesamoids
  and accessory ossicles of the foot: anatomical variability and related pathology. Insights
  Imaging. 2013;4(5):581-593. doi:10.1007/s13244-013-0277-1 (PMC3781258).
- Aparisi Gómez MP, Aparisi F, Bartoloni A, Ferrando Fons MA, Battista G, Guglielmi G,
  Bazzocchi A. Anatomical variation in the ankle and foot: from incidental finding to inductor
  of pathology. Part II: midfoot and forefoot. Insights Imaging. 2019;10(1):69.
  doi:10.1186/s13244-019-0747-1 (PMC6667607; Crossref spells the title "midfooot").
- Gorbachova T. Magnetic resonance imaging of the ankle and foot. Pol J Radiol.
  2020;85:e532-e549. doi:10.5114/pjr.2020.99472 (PMC7571512).
- Kumar S, Mangi MD, Zadow S, Lim W. Nerve entrapment syndromes of the lower limb: a pictorial
  review. Insights Imaging. 2023;14(1):166. doi:10.1186/s13244-023-01514-6 (PMC10545616).
- Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a
  pictorial essay. Insights Imaging. 2020;11(1):97. doi:10.1186/s13244-020-00900-8 (PMC7431516).
- For the Myerson types (F3-4): Diebal AR, Westrick RB, Alitz C, Gerber JP. Lisfranc injury in a
  West Point cadet. Sports Health. 2013;5(3):281-285. doi:10.1177/1941738113477991 (PMC3658402);
  and Tzatzairis T, Firth G, Parker L. Adolescent Lisfranc injury treated with TightRope™: a case
  report and review of literature. World J Orthop. 2019;10(2):115-122.
  doi:10.5312/wjo.v10.i2.115 (PMC6379736). Both are case reports whose review sections tabulate
  the types; the quotes are in the calculators doc, fourth check.

| ID | Verdict | Evidence |
|----|---------|----------|
| F2-1, F2-2 | yes (already) | Settled by Alton 2015 and Jiménez-Almonte 2019, which the page already cites beside Hawkins and Sanders. |
| F2-3 | partly | Middle facet, Szaro 2020: "Two of the most common coalitions are between the calcaneus and the navicular bone or between the middle facet of the talus and the calcaneus." **For the author:** in Marth et al., Eur Radiol 2024 (PMC11126476), talocalcaneal coalitions "were located either in the middle facet (10.7%), in the middle and posterior facet (50.0%), or in the posterior facet only (5.3%)", so most also took in the posterior facet; the page says "(the latter at the middle facet)". Irregular joint margins: only implied there ("the absence of bone deformities, irregularities, and bone marrow edema indicates that the abnormality is actually an anatomical variant, rather than a TC"); still unchecked. |
| F3-1 | yes (already) | Settled in the fourth check (Castro, read in full). |
| F3-4 | yes | Diebal table, row "1986 Myerson et al": types A, B1, B2, C1, C2; the EFORT review (Moracia-Ochagavía and Rodríguez-Merchán 2019, PMC6667981) captions its figure "The 1986 Myerson classification for Lisfranc fracture-dislocations". Type wording: calculators doc, MY-1 to MY-6. |
| F4-1 | yes | Burge: "low-grade stress reactions manifest as focal marrow edema on MRI but tend to be occult on radiography. A frank stress fracture appears as a discrete linear low-signal abnormality with surrounding marrow edema"; "Given the increased stresses experienced by the second and third metatarsals during walking and running, these metatarsals are at greatest risk for stress fracture." |
| F4-2 | yes | Burge: "Freiberg infraction is an osteonecrosis of the metatarsal head ... Radiographs demonstrate flattening and sclerosis of the metatarsal head, with the second metatarsal head being the most commonly affected." (A 2025 review, J Korean Soc Radiol, PMC12710284, says "the second and third metatarsal heads".) |
| F5-1 | yes | Burge: "Hyperdorsiflexion injury to the plantar plate of the first MTP joint, colloquially termed 'turf toe'"; the first MTP plantar plate complex "incorporates the hallux sesamoids in addition to the plantar capsule and plantar aponeurosis"; findings include "capsular disruption". Gorbachova agrees: "a spectrum of traumatic injuries of the capsuloligamentous structures of the first metatarsophalangeal (MTP) joint, typically resulting from a hyperextension injury". |
| F5-2 | yes | Nwawka, Table 2: a fractured medial sesamoid shows "a sharp, radiolucent, uncorticated line between the two fragments"; a bipartite one "Two corticated components"; Table 3, fracture: "Irregular bony fragment with poorly corticated margins"; text: "The medial sesamoid commonly shows bipartite variation." Aparisi Gómez: "Note the smooth, rounded contours of the bipartite components"; "It is more common to find medial bipartite sesamoids than lateral sesamoids. Medial bipartite sesamoids can be bilateral in a frequency ranging from 22 to 85%"; in a fracture "there is usually a sharp parting line". |
| F5-3 | yes | Nwawka, Table 3, sesamoiditis: "Bone marrow oedema isolated to the sesamoid without changes in the metatarsal head on MRI". **For the author (no change made):** the same sources say the pattern is not specific: Nwawka's figure legend, "These results suggest bony sesamoiditis or stress reaction", and its Table 3 gives a "bone marrow oedema pattern (early)" for osteonecrosis; Burge, "Sesamoid stress reaction and sesamoiditis both manifest as hyperintense signal on fluid sensitive images, though sesamoiditis more commonly involves both sesamoids". The page says only "fits sesamoiditis". |
| F6-2 | yes, for the unread half | Gorbachova: "Pericapsular fibrosis associated with plantar plate and capsular tears can mimic Morton's neuroma [81]. In such cases, an eccentric location of the mass, adherent to the capsule rather than centered over the interdigital space, as well as a presence of primary and secondary signs of plantar plate tear provide helpful diagnostic clues." Also Park et al., Diagnostics 2025 (PMC12427879): "Indirect signs—such as pericapsular fibrosis and capsular thickening—can resemble Morton's neuroma and must be carefully differentiated." The warning's reach (space n − 1 or n) stays the site's own; Umans reported only the second space beside the second joint. |
| F7-1 | yes | Site, Gorbachova: "The most common locations are the interspace between the third and fourth toes (third web space), followed by the interspace between the second and third toes" (agrees with R11, third check). Ligament, Kumar: "Entrapment of the digital nerves can occur in the intermetatarsal space between the metatarsal heads, plantar to the intermetatarsal ligaments [10]. The entrapment leads to perineural fibrosis of the digital nerve, a condition known as Morton's neuroma". (Also J Ultrason 2023, PMC10668940: "These nerves are located plantar to the intermetatarsal ligament".) |

Changes applied: the eight references above added (24 in all; the test pins 24), each cited
beside the original paper where it states the claim (steps 2, 3, 4, 5, 6 and 7, their teach
lines and the matching quiz explanations). No claim was reworded. The source note now names
only what is still unchecked: irregular joint margins in a coalition, and whether Myerson named
any pattern beyond A to C2 (MY-6).

Needs a browser: https://pubs.rsna.org/doi/full/10.1148/radiographics.20.2.g00mc03321 (Newman,
irregular joint margins, F2-3) and https://pubs.rsna.org/doi/full/10.1148/radiographics.21.6.g01nv071425
(Ashman, F4-1, F4-2, F7-1 as cited) both returned 403.
