# Knee MRI study and Schatzker calculator: sources and claims

Date: 2026-10-23 · Branch: `claude/sleepy-dijkstra-4w0dpd`

## Status: nothing here is verified yet

This file was written in a cloud session whose network blocks PubMed, PubMed Central,
Crossref, doi.org and Europe PMC. The author chose (2026-10-23) to draft the knee pages
anyway and check them later on a computer. So:

- Every reference below was chosen and written **from memory**. Titles, authors, years,
  volumes and pages may be wrong, and a paper may not say what is attributed to it.
- Every claim row is **Verified = to check**. None of them has been read in an abstract or
  full text.
- The site code marks this state: the references have no `doi`, inline citations are plain
  text (no `<Cite>` links), and the source note on both pages starts with "Unchecked draft".
  Tests in `src/studies/KneeMriStudy.test.ts` and `src/logic/schatzker.test.ts` pin that, so
  the unchecked state cannot be lost by accident.
- The author chose (2026-10-23) to deploy these pages before the check; they stay labelled "Unchecked draft" on the live site until it is done.

## How to check (on a computer)

Follow the ankle method (`2026-10-19-ankle-mri-sources.md`, "How this was checked"):

1. For each reference, find it on PubMed (`esearch`/`esummary`) and resolve its DOI on
   Crossref. Correct the citation text in this file and in the code
   (`src/studies/KneeMriStudy.tsx`, `src/pages/SchatzkerPage.tsx`). Drop a reference that
   cannot be matched, and every claim that rests on it.
2. For each claim, read the abstract (`efetch rettype=abstract`) or open full text (PMC).
   Mark it **yes** with the quote and its location, or **no** with what the paper says.
3. A claim marked **no**: remove the rule or chip and keep a descriptive field, and list it
   in an "Omitted claims for the author" section at the end of this file. Do not quietly
   reword it (CLAUDE.md, Studies section).
4. Once every claim is settled: add `doi` to each reference, switch the plain-text
   citations to `<Cite doi>`, change the source note to the ankle wording ("Draft lesson
   compiled from the papers below; citations checked against PubMed in <month year>. Not yet
   reviewed by the site author."), and update the tests that pin the unchecked state, saying
   in the commit why they changed.

## References

Candidate DOIs are from memory and **unconfirmed**; they are here to speed up the check, not
to be trusted.

| # | Citation (from memory) | Candidate DOI | Used for |
|---|---|---|---|
| K1 | Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104. | — (likely none) | Schatzker types |
| K2 | Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597. | 10.1148/rg.292085078 (unconfirmed) | Schatzker on CT/MRI |
| K3 | De Smet AA, Tuite MJ. Use of the "two-slice-touch" rule for the MRI diagnosis of meniscal tears. AJR Am J Roentgenol. 2006;187(4):911-914. | 10.2214/AJR.05.1354 (unconfirmed) | Meniscal tear rule |
| K4 | Nguyen JC, De Smet AA, Graf BK, Rosas HG. MR imaging-based diagnosis and classification of meniscal tears. Radiographics. 2014;34(4):981-999. | 10.1148/rg.344125202 (unconfirmed) | Tear types |
| K5 | Costa CR, Morrison WB, Carrino JA. Medial meniscus extrusion on knee MRI: is extent associated with severity of degeneration or type of tear? AJR Am J Roentgenol. 2004;183(1):17-23. | 10.2214/ajr.183.1.1830017 (unconfirmed) | Extrusion 3 mm |
| K6 | Silverman JM, Mink JH, Deutsch AL. Discoid menisci of the knee: MR imaging appearance. Radiology. 1989;173(2):351-354. | 10.1148/radiology.173.2.2798867 (unconfirmed) | Discoid criterion |
| K7 | Sanders TG, Medynski MA, Feller JF, Lawhorn KW. Bone contusion patterns of the knee at MR imaging: footprint of the mechanism of injury. Radiographics. 2000;20 Spec No:S135-S151. | 10.1148/radiographics.20.suppl_1.g00oc19s135 (unconfirmed) | Bruise patterns |
| K8 | Gentili A, Seeger LL, Yao L, Do HM. Anterior cruciate ligament tear: indirect signs at MR imaging. Radiology. 1994;193(3):835-840. | 10.1148/radiology.193.3.7972834 (unconfirmed) | ACL indirect signs |
| K9 | Campos JC, Chung CB, Lektrakul N, Pedowitz R, Trudell D, Yu J, Resnick D. Pathogenesis of the Segond fracture: anatomic and MR imaging evidence of an iliotibial tract or anterior oblique band avulsion. Radiology. 2001;219(2):381-386. | 10.1148/radiology.219.2.r01ma23381 (unconfirmed) | Segond |
| K10 | Schweitzer ME, Tran D, Deely DM, Hume EL. Medial collateral ligament injuries: evaluation of multiple signs, prevalence and location of associated bone bruises, and assessment with MR imaging. Radiology. 1995;194(3):825-829. | — | MCL |
| K11 | Recondo JA, Salvador E, Villanúa JA, Barrera MC, Gervás C, Alústiza JM. Lateral stabilizing structures of the knee: functional anatomy and injuries assessed with MR imaging. Radiographics. 2000;20 Spec No:S91-S102. | — | Lateral side, PLC |
| K12 | Elias DA, White LM, Fithian DC. Acute lateral patellar dislocation at MR imaging: injury patterns of medial patellar soft-tissue restraints and osteochondral injuries of the inferomedial patella. Radiology. 2002;225(3):736-743. | — | Patellar dislocation |
| K13 | Carrillon Y, Abidi H, Dejour D, Fantino O, Moyen B, Tran-Minh VA. Patellar instability: assessment on MR images by measuring the lateral trochlear inclination—initial experience. Radiology. 2000;216(2):582-585. | — | Trochlear inclination |
| K14 | Crema MD, Roemer FW, Marra MD, Burstein D, Gold GE, Eckstein F, Baum T, Mosher TJ, Carrino JA, Guermazi A. Articular cartilage in the knee: current MR imaging techniques and applications in clinical practice and research. Radiographics. 2011;31(1):37-61. | — | Cartilage |
| K15 | Kijowski R, Blankenbaker DG, Shinki K, Fine JP, Graf BK, De Smet AA. Juvenile versus adult osteochondritis dissecans of the knee: appropriate MR imaging criteria for instability. Radiology. 2008;248(2):571-578. | — | OCD instability |
| K16 | Lecouvet FE, van de Berg BC, Maldague BE, Lebon CJ, Jamart J, Saleh M, Noël H, Malghem J. Early irreversible osteonecrosis versus transient lesions of the femoral condyles: prognostic value of subchondral bone and marrow changes on MR imaging. AJR Am J Roentgenol. 1998;170(1):71-77. | — | Subchondral lesion |
| K17 | Bencardino JT, Beltran J, Feldman MI, Rose DJ. MR imaging of complications of anterior cruciate ligament graft reconstruction. Radiographics. 2009;29(7):2115-2126. | — | ACL graft |
| K18 | Campbell SE, Sanders TG, Morrison WB. MR imaging of meniscal cysts: incidence, location, and clinical significance. AJR Am J Roentgenol. 2001;177(2):409-413. | — | Parameniscal cyst |
| K19 | Lee JH, Weissman BN, Nikpoor N, Aliabadi P, Sosman JL. Lipohemarthrosis of the knee: a review of recent experiences. Radiology. 1989;173(1):189-191. | — | Fat-fluid level |

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade, if any) · **Source** ·
**Verified**. Rule chips and warnings in the code carry the claim ID in a comment.

### Schatzker calculator (also used by step 2)

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| SZ-1 | Type I is a pure split (cleavage) fracture of the lateral plateau. | lateral + split → I | K1 | to check |
| SZ-2 | Type II is a split combined with depression of the lateral plateau. | lateral + split and depression → II | K1 | to check |
| SZ-3 | Type III is a pure depression of the lateral plateau, without a split. | lateral + depression → III | K1 | to check |
| SZ-4 | Type IV is a fracture of the medial plateau. Sources differ on whether type IV is a split, a depression, or either; record the original wording. | medial → IV | K1, K2 | to check |
| SZ-5 | Type V is a bicondylar fracture. | both plateaus → V | K1 | to check |
| SZ-6 | Type VI is a plateau fracture with dissociation of the metaphysis from the diaphysis. | dissociation → VI, whatever the plateaus | K1 | to check |
| SZ-7 | CT and MRI are more accurate than radiographs for Schatzker classification, and changed surgical plans made from radiographs. | — | K2 | to check |

### Step 1: technique and global look

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K1-1 | A fat-fluid level in the knee (lipohaemarthrosis) indicates an intra-articular fracture. | fat-fluid level → intra-articular fracture | K19 | to check |

The protocol checklist (three planes, fluid-sensitive fat-suppressed imaging, a T1 or
non-fat-suppressed sequence) is the site's own and is presented as such, with no citation.

### Step 2: bones and marrow

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K2-1 | Pivot shift: contusions of the lateral femoral condyle (near the terminal sulcus) and the posterolateral tibial plateau; the footprint of an ACL tear. | pattern → ACL tear | K7 | to check |
| K2-2 | Dashboard injury: contusion of the anterior proximal tibia; points to PCL injury. | pattern → PCL | K7 | to check |
| K2-3 | Hyperextension: "kissing" contusions of the anterior tibia and anterior femoral condyles; ACL, PCL and posterolateral corner at risk. | pattern → cruciates, PLC | K7 | to check |
| K2-4 | Clip injury (valgus): contusion of the lateral femoral condyle, sometimes the medial femoral condyle from avulsion; points to MCL injury. | pattern → MCL | K7 | to check |
| K2-5 | Lateral patellar dislocation: contusions of the inferomedial patella and the anterolateral lateral femoral condyle. | pattern → patellar dislocation, MPFL | K7, K12 | to check |
| K2-6 | A Segond fracture is an avulsion at the lateral tibial rim, caused by the iliotibial tract or the anterior oblique band of the LCL, and is associated with ACL tear. | Segond + intact ACL → warning | K9 | to check |
| K2-7 | Subchondral low-signal area on T2-weighted images thicker than 4 mm or longer than 14 mm predicts an irreversible lesion (osteonecrosis); thinner and shorter areas predict a transient one. | > 4 mm thick or > 14 mm long → irreversible | K16 | to check |
| K2-8 | In osteochondritis dissecans, MRI criteria for instability differ between juvenile and adult lesions: a high-T2 rim behind the fragment signals instability in adults, while in juveniles it does so only with a second outer low-T2 rim, or with multiple breaks in the subchondral bone plate. | descriptive only, no chip | K15 | to check |

### Step 3 and 4: menisci

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K3-1 | Two-slice-touch: abnormal signal touching the meniscal surface on two or more images is diagnosed as a tear; on one image only, the positive predictive value is lower and it is a possible tear. | ≥ 2 images → tear; 1 image → possible tear | K3 | to check |
| K3-2 | Tear types: horizontal, longitudinal (vertical), radial, root, complex, and displaced tears (including bucket-handle and flap). | descriptive | K4 | to check |
| K3-3 | Medial meniscal extrusion of 3 mm or more is associated with severe degeneration, extensive tearing and root tears. | ≥ 3 mm → associated with those | K5 | to check |
| K4-1 | Discoid lateral meniscus: continuity between the anterior and posterior horns (a "bow-tie") on three or more consecutive 5-mm sagittal images. | ≥ 3 consecutive 5-mm images → discoid | K6 | to check |
| K4-2 | Parameniscal cysts are usually associated with a meniscal tear. | cyst + intact meniscus on that side → warning | K18 | to check |

### Step 5 and 6: cruciates

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K5-1 | Indirect signs of ACL tear include lateral compartment bone contusion, anterior tibial translation, uncovering of the posterior horn of the lateral meniscus and buckling of the PCL. | descriptive, no thresholds | K8 | to check |
| K5-2 | ACL graft complications on MRI include graft tear, arthrofibrosis (including the localised "cyclops" lesion), tunnel widening and tunnel cysts, and graft impingement. | descriptive | K17 | to check |

No PCL rule is used; the PCL step is descriptive (intact, partial, complete).

### Step 7 and 8: collaterals and posterolateral corner

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K7-1 | MCL injury is assessed by the integrity of the fibres and the oedema around them, and is associated with bone bruises (the paper reports where). | descriptive | K10 | to check |
| K8-1 | The lateral stabilising structures are the LCL, biceps femoris tendon, popliteus tendon and iliotibial tract, with the posterolateral corner structures. | descriptive | K11 | to check |

### Step 9: extensor mechanism and patellofemoral joint

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K9-1 | After acute lateral patellar dislocation, the medial patellofemoral ligament is commonly injured (often at the femoral attachment), with osteochondral injury of the inferomedial patella. | descriptive | K12 | to check |
| K9-2 | A lateral trochlear inclination below 11° on the first axial image showing cartilage indicates trochlear dysplasia. | < 11° → dysplasia | K13 | to check |

### Step 10: cartilage

| ID | Claim | Rule | Source | Verified |
|---|---|---|---|---|
| K10-1 | Cartilage lesions on MRI are described by depth: signal change only, partial thickness under half, partial thickness half or more, and full thickness. | descriptive | K14 | to check |

### Step 11: synovium, cysts and fat pads

Uses K4-2 (parameniscal cysts). Popliteal cyst, synovitis and Hoffa fat pad fields are
descriptive, with no cited rule.

### Variants (impression lines, by the author's decision)

Discoid lateral meniscus (K4-1), bipartite patella and fabella each get their own
impression line. Bipartite patella and fabella have no cited rule; they are recorded as
present or absent.
