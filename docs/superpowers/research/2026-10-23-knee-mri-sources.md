# Knee MRI study and Schatzker calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: references matched, claims partly verified (2026-10-23)

Checked on a computer on 2026-10-23 by the ankle method (`2026-10-19-ankle-mri-sources.md`):
each paper matched in PubMed (E-utilities `esearch`/`esummary`), its DOI resolved on Crossref,
and a claim marked verified only when its wording was read in the PubMed abstract (`efetch
rettype=abstract`) or in open full text. All 19 references matched, and every citation as
written from memory agrees with its PubMed record (authors, title, journal, year, volume,
pages); the candidate DOIs were all right. Only Crema (K14, PMC6939857) has open full text;
Schatzker 1979 (K1) has no abstract in PubMed and no DOI on Crossref. Unpaywall refuses the
placeholder address the method allows, so it was not consulted; the RSNA and AJR publisher
pages return 403. The rest are abstract-only, so claims that rest on detail beyond the
abstract stay unchecked.

The author chose (2026-10-23): add the DOIs now and switch the citations to `<Cite doi>`
links, but keep the claims that no abstract or open text states, with the pages' "Unchecked
draft" note, until they can be checked; and rewrite every claim found wrong or different to
the paper's own wording, changing a rule where the paper's threshold differs. Schatzker 1979
(K1) has no DOI, so it stays plain text and the test exempts it by name.

### Applied to the code (2026-10-23)

`src/studies/KneeMriStudy.tsx`, `src/pages/SchatzkerPage.tsx` and `src/logic/schatzker.ts`,
with their tests:

- DOIs on every reference but K1, and `<Cite>` links for every inline citation but Schatzker
  1979. The source notes still start "Unchecked draft", now saying the references are matched
  and naming the claims still unchecked. The test that pinned "no DOI on any reference" now
  pins a DOI on every reference except K1.
- K13's title takes PubMed's hyphen ("...inclination-initial experience").
- **K3-3** rule changed. Was: "Medial meniscal extrusion of 3 mm or more is associated with
  severe degeneration, extensive tearing and root tears" (chip at `>= 3`). Now: "Medial
  meniscal extrusion of more than 3 mm was associated with severe degeneration, extensive
  tearing and root tears; extrusion of 3 mm or less was the minor group" (chip and impression
  line at `> 3`), per Costa (K5).
- **K9-1** reworded. Was: "the MPFL is commonly injured, often at its femoral attachment, and
  the inferomedial patella may have an osteochondral injury". Now: "the medial retinaculum was
  disrupted at its patellar insertion in 76% of examinations; where the femoral origin of the
  MPFL could be seen, 49% showed injury; and 70% had an osteochondral injury of the
  inferomedial patella", per Elias (K12). The quiz explanation likewise.
- **K9-2** reworded, threshold unchanged. Was: "below 11° ... indicates trochlear dysplasia".
  Now: "below 11° ... was a diagnostic test for patellar instability, with a sensitivity of 93%
  and a specificity of 87%", per Carrillon (K13). Chip: "Below the 11° threshold for patellar
  instability"; impression: "Lateral trochlear inclination N°, below the 11° threshold for
  patellar instability."; quiz answer likewise. "On the first axial image that shows trochlear
  cartilage" is kept, unchecked.
- **SZ-3** extended. A pure depression of the lateral plateau now has an optional site: lateral
  gives type IIIA ("compression fracture of the lateral plateau"), central gives IIIB
  ("compression fracture of the central plateau"); without the site it stays type III. Added
  to the shared logic, the calculator (a "Where is the depression?" question and table rows)
  and the study (a "Where is the depression" field), cited to Markhardt (K2).
- SZ-1 to SZ-7 now cite Markhardt (K2), which states them, alongside Schatzker (K1), which has
  no abstract.

## References

| # | Citation (corrected to PubMed) | PMID | DOI | Read |
|---|---|---|---|---|
| K1 | Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104. | 445923 | none found on Crossref | No abstract |
| K2 | Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597. | 19325067 | 10.1148/rg.292085078 | Abstract |
| K3 | De Smet AA, Tuite MJ. Use of the "two-slice-touch" rule for the MRI diagnosis of meniscal tears. AJR Am J Roentgenol. 2006;187(4):911-914. | 16985134 | 10.2214/AJR.05.1354 | Abstract |
| K4 | Nguyen JC, De Smet AA, Graf BK, Rosas HG. MR imaging-based diagnosis and classification of meniscal tears. Radiographics. 2014;34(4):981-999. | 25019436 | 10.1148/rg.344125202 | Abstract |
| K5 | Costa CR, Morrison WB, Carrino JA. Medial meniscus extrusion on knee MRI: is extent associated with severity of degeneration or type of tear? AJR Am J Roentgenol. 2004;183(1):17-23. | 15208101 | 10.2214/ajr.183.1.1830017 | Abstract |
| K6 | Silverman JM, Mink JH, Deutsch AL. Discoid menisci of the knee: MR imaging appearance. Radiology. 1989;173(2):351-354. | 2798867 | 10.1148/radiology.173.2.2798867 | Abstract |
| K7 | Sanders TG, Medynski MA, Feller JF, Lawhorn KW. Bone contusion patterns of the knee at MR imaging: footprint of the mechanism of injury. Radiographics. 2000;20 Spec No:S135-S151. | 11046168 | 10.1148/radiographics.20.suppl_1.g00oc19s135 | Abstract |
| K8 | Gentili A, Seeger LL, Yao L, Do HM. Anterior cruciate ligament tear: indirect signs at MR imaging. Radiology. 1994;193(3):835-840. | 7972834 | 10.1148/radiology.193.3.7972834 | Abstract |
| K9 | Campos JC, Chung CB, Lektrakul N, Pedowitz R, Trudell D, Yu J, Resnick D. Pathogenesis of the Segond fracture: anatomic and MR imaging evidence of an iliotibial tract or anterior oblique band avulsion. Radiology. 2001;219(2):381-386. | 11323461 | 10.1148/radiology.219.2.r01ma23381 | Abstract |
| K10 | Schweitzer ME, Tran D, Deely DM, Hume EL. Medial collateral ligament injuries: evaluation of multiple signs, prevalence and location of associated bone bruises, and assessment with MR imaging. Radiology. 1995;194(3):825-829. | 7862987 | 10.1148/radiology.194.3.7862987 | Abstract |
| K11 | Recondo JA, Salvador E, Villanúa JA, Barrera MC, Gervás C, Alústiza JM. Lateral stabilizing structures of the knee: functional anatomy and injuries assessed with MR imaging. Radiographics. 2000;20 Spec No:S91-S102. | 11046165 | 10.1148/radiographics.20.suppl_1.g00oc02s91 | Abstract |
| K12 | Elias DA, White LM, Fithian DC. Acute lateral patellar dislocation at MR imaging: injury patterns of medial patellar soft-tissue restraints and osteochondral injuries of the inferomedial patella. Radiology. 2002;225(3):736-743. | 12461254 | 10.1148/radiol.2253011578 | Abstract |
| K13 | Carrillon Y, Abidi H, Dejour D, Fantino O, Moyen B, Tran-Minh VA. Patellar instability: assessment on MR images by measuring the lateral trochlear inclination-initial experience. Radiology. 2000;216(2):582-585. | 10924589 | 10.1148/radiology.216.2.r00au07582 | Abstract |
| K14 | Crema MD, Roemer FW, Marra MD, Burstein D, Gold GE, Eckstein F, Baum T, Mosher TJ, Carrino JA, Guermazi A. Articular cartilage in the knee: current MR imaging techniques and applications in clinical practice and research. Radiographics. 2011;31(1):37-61. | 21257932 | 10.1148/rg.311105084 | Full text (PMC6939857) |
| K15 | Kijowski R, Blankenbaker DG, Shinki K, Fine JP, Graf BK, De Smet AA. Juvenile versus adult osteochondritis dissecans of the knee: appropriate MR imaging criteria for instability. Radiology. 2008;248(2):571-578. | 18552309 | 10.1148/radiol.2482071234 | Abstract |
| K16 | Lecouvet FE, van de Berg BC, Maldague BE, Lebon CJ, Jamart J, Saleh M, Noël H, Malghem J. Early irreversible osteonecrosis versus transient lesions of the femoral condyles: prognostic value of subchondral bone and marrow changes on MR imaging. AJR Am J Roentgenol. 1998;170(1):71-77. | 9423603 | 10.2214/ajr.170.1.9423603 | Abstract |
| K17 | Bencardino JT, Beltran J, Feldman MI, Rose DJ. MR imaging of complications of anterior cruciate ligament graft reconstruction. Radiographics. 2009;29(7):2115-2126. | 19926766 | 10.1148/rg.297095036 | Abstract |
| K18 | Campbell SE, Sanders TG, Morrison WB. MR imaging of meniscal cysts: incidence, location, and clinical significance. AJR Am J Roentgenol. 2001;177(2):409-413. | 11461872 | 10.2214/ajr.177.2.1770409 | Abstract |
| K19 | Lee JH, Weissman BN, Nikpoor N, Aliabadi P, Sosman JL. Lipohemarthrosis of the knee: a review of recent experiences. Radiology. 1989;173(1):189-191. | 2781006 | 10.1148/radiology.173.1.2781006 | Abstract |

Notes on the set:

- No citation needed correcting: every one matched its PubMed record as written, and every
  candidate DOI resolved on Crossref to the same paper.
- K1: PubMed writes the title "1968--1975"; the page's "1968-1975" is the same. PubMed has no
  abstract, and Crossref has no DOI for it (bibliographic search and the CORR 1979 DOI range
  found nothing), so the Schatzker types are checked against Markhardt (K2) instead, which
  describes them in its abstract.
- K13: PubMed and Crossref title it "...lateral trochlear inclination-initial experience"
  (hyphen); the draft's em dash is a typographic variant only.
- K2's abstract splits type III into IIIA (lateral) and IIIB (central); see SZ-3.

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Schatzker calculator (also used by step 2)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| SZ-1 | Type I is a pure split (cleavage) fracture of the lateral plateau. | lateral + split → I | K1 | yes, against K2 (K1 has no abstract). K2 abstract: "lateral plateau fracture without depression (type I)". |
| SZ-2 | Type II is a split combined with depression of the lateral plateau. | lateral + split and depression → II | K1 | yes, against K2. K2 abstract: "lateral plateau fracture with depression (type II)". |
| SZ-3 | Type III is a pure depression of the lateral plateau, without a split; lateral is IIIA and central IIIB (Markhardt). | lateral + depression → III; with site lateral → IIIA, central → IIIB | K1, K2 | partly, against K2. K2 abstract: "compression fracture of the lateral (type IIIA) or central (type IIIB) plateau". "Without a split" matches; for the author: K2 subdivides type III into IIIA and IIIB, which the calculator does not. |
| SZ-4 | Type IV is a fracture of the medial plateau. Sources differ on whether type IV is a split, a depression, or either; record the original wording. | medial → IV | K1, K2 | partly, against K2. K2 abstract: "medial plateau fracture (type IV)" and "The fracture-dislocation mechanism of type IV fractures increases the likelihood of injury to the peroneal nerve or popliteal vessels". Whether IV is a split, a depression or either is not in the abstract, and the original wording (K1) has no abstract. Unchecked. |
| SZ-5 | Type V is a bicondylar fracture. | both plateaus → V | K1 | yes, against K2. K2 abstract: "bicondylar plateau fracture (type V)". |
| SZ-6 | Type VI is a plateau fracture with dissociation of the metaphysis from the diaphysis. | dissociation → VI, whatever the plateaus | K1 | yes, against K2. K2 abstract: "plateau fracture with diaphyseal discontinuity (type VI)". "Whatever the plateaus" is the site's reading. |
| SZ-7 | CT and MRI are more accurate than radiographs for Schatzker classification, and changed surgical plans made from radiographs. | — | K2 | yes. K2 abstract: "Many investigators have found that surgical plans based on plain radiographic findings were modified after preoperative computed tomography (CT) or magnetic resonance (MR) imaging" and "CT and MR imaging are more accurate than plain radiography for Schatzker classification of tibial plateau fractures". |

### Step 1: technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K1-1 | A fat-fluid level in the knee (lipohaemarthrosis) indicates an intra-articular fracture. | fat-fluid level → intra-articular fracture | K19 | yes. K19 abstract: "The presence of a fat-fluid level in the knee indicated fracture in all patients in whom it was seen. The absence of such a level, however, did not exclude intraarticular fracture." (A radiograph series, not MRI.) |

The protocol checklist (three planes, fluid-sensitive fat-suppressed imaging, a T1 or
non-fat-suppressed sequence) is the site's own and is presented as such, with no citation.

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K2-1 | Pivot shift: contusions of the lateral femoral condyle (near the terminal sulcus) and the posterolateral tibial plateau; the footprint of an ACL tear. | pattern → ACL tear | K7 | partly. K7 abstract: "The classic bone marrow edema pattern seen following the pivot shift injury involves the posterolateral tibial plateau and the midportion of the lateral femoral condyle." The abstract says "midportion", not "near the terminal sulcus", and does not name the ACL; unchecked beyond that. |
| K2-2 | Dashboard injury: contusion of the anterior proximal tibia; points to PCL injury. | pattern → PCL | K7 | partly. K7 abstract: "Edema occurs in the anterior aspect of the proximal tibia following the dashboard injury." The PCL link is not in the abstract; unchecked. |
| K2-3 | Hyperextension: "kissing" contusions of the anterior tibia and anterior femoral condyles; ACL, PCL and posterolateral corner at risk. | pattern → cruciates, PLC | K7 | partly. K7 abstract: "Hyperextension results in the 'kissing' contusion pattern involving the anterior aspect of the proximal tibia and distal femur." The ligaments at risk (ACL, PCL, PLC) are not in the abstract; unchecked. |
| K2-4 | Clip injury (valgus): contusion of the lateral femoral condyle, sometimes the medial femoral condyle from avulsion; points to MCL injury. | pattern → MCL | K7 | partly. K7 abstract: "The clip injury results in a prominent area of edema involving the lateral femoral condyle and a smaller area of edema involving the medial femoral condyle." "From avulsion" and the MCL link are not in the abstract; unchecked. |
| K2-5 | Lateral patellar dislocation: contusions of the inferomedial patella and the anterolateral lateral femoral condyle. | pattern → patellar dislocation, MPFL | K7, K12 | yes. K7 abstract: "lateral patellar dislocation results in edema involving the inferomedial patella and anterior aspect of the lateral femoral condyle." K12 abstract: "contusions of the lateral femoral condyle (66 [80%] of 82 examinations)"; MPFL injury, see K9-1. |
| K2-6 | A Segond fracture is an avulsion at the lateral tibial rim, caused by the iliotibial tract or the anterior oblique band of the LCL, and is associated with ACL tear. | Segond + intact ACL → warning | K9 | partly. K9 abstract: "A firm band of tissue, the AOB, extended from the fibular collateral ligament to the midportion of the lateral tibia, the typical site of a Segond fracture" and "fibers of the ITT and AOB are important factors in the pathogenesis of the Segond fracture." The association with ACL tear is not in the abstract; unchecked. |
| K2-7 | Subchondral low-signal area on T2-weighted images thicker than 4 mm or longer than 14 mm predicts an irreversible lesion (osteonecrosis); thinner and shorter areas predict a transient one. | > 4 mm thick or > 14 mm long → irreversible | K16 | yes for the thresholds. K16 abstract: "Initial MR imaging characteristics indicative of an early irreversible osteonecrosis included a subchondral area of low signal intensity on T2-weighted images with a thickness of more than 4 mm ... or a length of more than 14 mm". That thinner and shorter areas predict a transient lesion is the converse, not stated in the abstract. |
| K2-8 | In osteochondritis dissecans, MRI criteria for instability differ between juvenile and adult lesions: a high-T2 rim behind the fragment signals instability in adults, while in juveniles it does so only with a second outer low-T2 rim, or with multiple breaks in the subchondral bone plate. | descriptive only, no chip | K15 | partly. K15 abstract: "Previously described MR imaging criteria for OCD instability have high specificity for adult but not juvenile lesions of the knee"; the criteria tested are "high T2 signal intensity rim, surrounding cysts, high T2 signal intensity cartilage fracture line, and fluid-filled osteochondral defect". The juvenile-specific criteria (second outer low-T2 rim, multiple breaks in the subchondral plate) are not in the abstract; unchecked. |

### Step 3 and 4: menisci

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K3-1 | Two-slice-touch: abnormal signal touching the meniscal surface on two or more images is diagnosed as a tear; on one image only, the positive predictive value is lower and it is a possible tear. | ≥ 2 images → tear; 1 image → possible tear | K3 | yes. K3 abstract: "This rule classifies a meniscus as torn if there are two or more MR images with abnormal findings and as possibly torn if there is only one MR image with an abnormal finding" and "When using the two-slice-touch rule, we had an increased positive predictive value for diagnosing menisci as torn". |
| K3-2 | Tear types: horizontal, longitudinal (vertical), radial, root, complex, and displaced tears (including bucket-handle and flap). | descriptive | K4 | yes, except "flap". K4 abstract: "Tear patterns include horizontal, longitudinal, radial, root, complex, displaced, and bucket-handle tears." Flap tears are not named in the abstract. |
| K3-3 | Medial meniscal extrusion of more than 3 mm is associated with severe degeneration, extensive tearing and root tears (was: 3 mm or more). | > 3 mm → associated with those (was ≥ 3 mm) | K5 | Rewritten to the paper (2026-10-23). Was **WRONG at the boundary**. K5 abstract: extrusion was "divided into minor (</= 3 mm) and major (> 3 mm) extrusion", and "Substantial medial meniscus extrusion (> 3 mm) is associated with severe meniscal degeneration, extensive tear, complex tear, large radial tear, and tear involving the meniscal root." The associations are right, but the threshold is more than 3 mm, with 3 mm itself in the minor group; the chip fires at 3 mm or more (`src/studies/KneeMriStudy.tsx`, `extrusion >= 3`, pinned in `KneeMriStudy.test.ts`, "medial meniscal extrusion at 3 mm"). |
| K4-1 | Discoid lateral meniscus: continuity between the anterior and posterior horns (a "bow-tie") on three or more consecutive 5-mm sagittal images. | ≥ 3 consecutive 5-mm images → discoid | K6 | yes. K6 abstract: "A discoid meniscus was said to be present if three or more 5-mm-thick contiguous sagittal images demonstrated continuity of the meniscus between the anterior and posterior horns." ("Bow-tie" is not in the abstract.) |
| K4-2 | Parameniscal cysts are usually associated with a meniscal tear. | cyst + intact meniscus on that side → warning | K18 | yes. K18 abstract: "Meniscal cysts showed direct contact with an adjacent meniscal tear in 107 (98%) of 109 cases, with the tear showing a horizontal component in 96 (90%) of 107 cases." |

### Step 5 and 6: cruciates

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K5-1 | Indirect signs of ACL tear include lateral compartment bone contusion, anterior tibial translation, uncovering of the posterior horn of the lateral meniscus and buckling of the PCL. | descriptive, no thresholds | K8 | yes. K8 abstract lists "bone contusions in lateral compartment", "anterior displacement of tibia more than 7 mm", "posterior displacement of lateral meniscus more than 3.5 mm", "PCL angle less than 107 degrees" and "PCL bowing ratio more than 0.39", and concludes "Because the specificity is high, the presence of indirect signs corroborates the diagnosis of ACL tear. Because the sensitivity is low, the absence of these signs does not exclude the diagnosis of ACL tear." The page uses no thresholds, as stated. |
| K5-2 | ACL graft complications on MRI include graft tear, arthrofibrosis (including the localised "cyclops" lesion), tunnel widening and tunnel cysts, and graft impingement. | descriptive | K17 | partly. K17 abstract: "Late failures ... likely are related to new trauma and graft tearing. Other complications of ACL reconstruction include roof impingement, postoperative stiffness, tunnel widening due to cyst formation, iliotibial band friction syndrome, hardware failure, and infection." Arthrofibrosis and the "cyclops" lesion are not named in the abstract (it says "postoperative stiffness"); unchecked. |

No PCL rule is used; the PCL step is descriptive (intact, partial, complete).

### Step 7 and 8: collaterals and posterolateral corner

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K7-1 | MCL injury is assessed by the integrity of the fibres and the oedema around them, and is associated with bone bruises (the paper reports where). | descriptive | K10 | partly. K10 abstract: "The most sensitive signs were fascial edema and loss of demarcation from adjacent fat" and "MR grading systems may not be accurate for classification of MCL injuries." The bone-bruise locations are not in the abstract; unchecked. |
| K8-1 | The lateral stabilising structures are the LCL, biceps femoris tendon, popliteus tendon and iliotibial tract, with the posterolateral corner structures. | descriptive | K11 | yes. K11 abstract: "Anterolateral stabilization is provided by the capsule and iliotibial tract. Posterolateral stabilization is provided by the arcuate ligament complex, which comprises the lateral collateral ligament; biceps femoris tendon; popliteus muscle and tendon; popliteal meniscal and popliteal fibular ligaments; oblique popliteal, arcuate, and fabellofibular ligaments; and lateral gastrocnemius muscle." |

### Step 9: extensor mechanism and patellofemoral joint

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K9-1 | After acute lateral patellar dislocation, the medial retinaculum was disrupted at its patellar insertion in 76%, the MPFL femoral origin was injured in 49% of those seen, and 70% had an osteochondral injury of the inferomedial patella (was: MPFL commonly injured, often at the femoral attachment). | descriptive | K12 | Rewritten to the paper (2026-10-23). Was partly. K12 abstract: "Seventy-six percent (62 of 82 examinations) showed medial retinacular disruption at its patellar insertion; 30% (25 of 82), at its midsubstance. The MPFL femoral origin was identified in 87% (71 of 82); of these, 49% (35 of 71) showed injury" and "At the inferomedial patella, 70% (57 of 82) of LPD examinations showed osteochondral injury". The osteochondral part is right; "often at the femoral attachment" holds for about half of visible origins, but the most frequent site in the abstract is the medial retinaculum at its patellar insertion. |
| K9-2 | A lateral trochlear inclination below 11° on the first axial image showing cartilage was a diagnostic test for patellar instability (was: indicates trochlear dysplasia). | < 11° → below the threshold for patellar instability | K13 | Rewritten to the paper (2026-10-23); the measurement level stays unchecked. Was partly. K13 abstract: "Below a threshold value fixed at 11 degrees, LTI appears to be an excellent diagnostic test of PI with a sensitivity of 0.93 (28/30), a specificity of 0.87 (26/30)". The abstract tests patellar instability, not trochlear dysplasia as such, and "the first axial image showing cartilage" is not in it; unchecked. |

### Step 10: cartilage

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K10-1 | Cartilage lesions on MRI are described by depth: signal change only, partial thickness under half, partial thickness half or more, and full thickness. | descriptive | K14 | partly. K14 full text: "MR imaging techniques for morphologic assessment of cartilage in the knee provide accurate information about processes such as fissuring and focal or diffuse partial- or full-thickness cartilage loss. In clinical practice, cartilage lesions in the knee are commonly graded with a modified Noyes or Outerbridge scale". The four depth grades with the half-thickness split are not set out in K14, which points to those scales (its refs 11 and 12). |

### Step 11: synovium, cysts and fat pads

Uses K4-2 (parameniscal cysts). Popliteal cyst, synovitis and Hoffa fat pad fields are
descriptive, with no cited rule.

### Variants (impression lines, by the author's decision)

Discoid lateral meniscus (K4-1), bipartite patella and fabella each get their own
impression line. Bipartite patella and fabella have no cited rule; they are recorded as
present or absent.

## Second check, 2026-10-25: papers supplied by the author

Read in full: Zeltser DW, Leopold SS. Classifications in brief: Schatzker classification of tibial
plateau fractures. Clin Orthop Relat Res. 2013;471(2):371-374. doi:10.1007/s11999-012-2451-z.

| ID | Verdict | Evidence |
|----|---------|----------|
| SZ-1, SZ-2, SZ-5, SZ-6 | yes | "split fracture of the lateral tibial plateau (Type I), split depression of the lateral tibial plateau (Type II), ... bicondylar tibial plateau fracture (Type V), and dissociation between the metaphysis and diaphysis (Type VI)". |
| SZ-3 | yes | "central depression of the lateral plateau (Type III)". |
| SZ-4 | partly | "split of the medial tibial plateau (Type IV)". The site still counts any medial plateau fracture as IV, as Markhardt's "medial plateau fracture" does; the page now says the review calls it a split. For the author. |

## Fourth check, 2026-10-25: third batch from the author

Read in full: Markhardt 2009 (K2), and Slattery C, Kweon CY. Classifications in brief: Outerbridge
classification of chondral lesions. Clin Orthop Relat Res. 2018;476(10):2101-2104.
doi:10.1007/s11999.0000000000000255.

| ID | Verdict | Evidence |
|----|---------|----------|
| SZ-1 | yes, detail added | "a wedge-shaped pure cleavage fracture of the lateral tibial plateau, originally defined as having less than 4 mm of depression or displacement"; "Schatzker et al originally defined depression as measuring greater than 4 mm". The 4 mm is now on the page and in the study's text. |
| SZ-3 | yes | "those with lateral depression (type IIIA) ... and those with central depression (type IIIB)"; type III "a pure compression fracture of the lateral tibial plateau". |
| SZ-4 | yes, reworded | "a medial tibial plateau fracture with a split or depressed component". The author confirmed (2026-10-25) that type IV is not restricted to a split: any isolated medial plateau fracture, split, depressed or both. Wording now "fracture of the medial plateau, split or depressed". |
| SZ-5 | yes | "a wedge fracture of the medial and lateral tibial plateau, often with an inverted 'Y' appearance"; distinguished from VI "by the maintenance of metaphyseal-diaphyseal continuity". |
| K10-1 | still no source | Outerbridge is an arthroscopic grading (softening and swelling; fissuring by diameter; exposed subchondral bone), not the MRI depth grades the study uses (signal change, under half, half or more, full thickness). As the author noted, the depth grades are a modified MRI system that needs its own citation; the candidate is Recht MP, Goodwin DW, Winalski CS, White LM. MRI of articular cartilage: revisiting current status and future directions. AJR. 2005;185(4):899-914. doi:10.2214/AJR.05.0099 (abstract does not state the grades; on the fourth batch). |

## Fifth check, 2026-10-25: fourth batch from the author

Read in full: Recht 2005 (now K-R, cited in the study). It does not give the four depth grades either:
it says only that a traumatic cartilage lesion's "description should include the location, size, and
depth of the lesion and the presence or absence of associated chondral fragments", and that a defect
"should prompt careful inspection of the joint for a displaced intraarticular chondral body". That
sentence is now in the cartilage step, cited to Recht. K10-1 (the under-half / half-or-more split)
still has no source. The author chose to keep the four grades as they are (2026-10-25).
