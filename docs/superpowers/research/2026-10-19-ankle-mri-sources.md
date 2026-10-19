# Ankle MRI study: sources and claims

Date: 2026-10-19 · Branch: `design-update` · Task 1 of the ankle MRI study plan.

This file is the evidence base for the ankle MRI study (`/studies/ankle-mri`). The lesson
(Task 2), the report builder (Task 3) and the quiz (Task 4) may use **only** claims marked
**verified = yes**, and may cite **only** the references listed here.

## How this was checked

- Every reference was matched in PubMed (E-utilities `esearch`/`esummary`) and its DOI was
  resolved on Crossref (`api.crossref.org/works/<doi>`). Title, authors, journal, year,
  volume and pages below are taken from those records. All 15 DOIs resolve to the paper named.
- A claim is **verified** only when its wording was read in the paper's abstract (PubMed
  `efetch rettype=abstract`) or in its full text (PubMed Central open-access XML, fetched
  with `efetch db=pmc`). The quoted text is copied from those sources.
- **Location** gives where the sentence sits: "Abstract" for abstract-only papers, or the
  section heading / table / figure caption in the PMC full text.
- **Provenance** flags when a review states a number on the strength of its own cited
  reference ("cites [n]"). Such a claim is still verified (the paper states it), but the
  author should know the number is second-hand.
- Publisher full text for the paywalled papers (Radiology, AJR, RSNA) could not be read
  (Cloudflare block). For those, only abstract wording is used.

## References

| # | Citation | PMID | DOI | Read |
|---|---|---|---|---|
| R1 | Sawant YN, Sanghvi D. Magnetic resonance imaging of ankle ligaments: a pictorial essay. Indian J Radiol Imaging. 2018;28(4):419-426. | 30662202 | 10.4103/ijri.IJRI_77_16 | Full text (PMC6319113) |
| R2 | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11(1):97. | 32804284 | 10.1186/s13244-020-00900-8 | Full text (PMC7431516) |
| R3 | Walther M, Gottschalk O, Madry H, et al. Etiology, classification, diagnostics, and conservative management of osteochondral lesions of the talus. 2023 recommendations of the Working Group "Clinical Tissue Regeneration" of the German Society of Orthopedics and Traumatology. Cartilage. 2023;14(3):292-304. | 37082983 | 10.1177/19476035231161806 | Full text (PMC10601568) |
| R4 | Oae K, Takao M, Naito K, Uchio Y, Kono T, Ishida J, Ochi M. Injury of the tibiofibular syndesmosis: value of MR imaging for diagnosis. Radiology. 2003;227(1):155-161. | 12616009 | 10.1148/radiol.2271011865 | Abstract |
| R5 | Kimura Y, Yamashiro T, Saito Y, Kitsukawa K, Niki H, Mimura H. MRI findings of spring ligament injury: association with surgical findings and flatfoot deformity. Acta Radiol Open. 2020;9(12):2058460120980145. | 33403126 | 10.1177/2058460120980145 | Full text (PMC7739123) |
| R6 | Rosenberg ZS, Cheung Y, Jahss MH, Noto AM, Norman A, Leeds NE. Rupture of posterior tibial tendon: CT and MR imaging with surgical correlation. Radiology. 1988;169(1):229-235. | 3420263 | 10.1148/radiology.169.1.3420263 | Abstract |
| R7 | Davda K, Malhotra K, O'Donnell P, Singh D, Cullen N. Peroneal tendon disorders. EFORT Open Rev. 2017;2(6):281-292. | 28736620 | 10.1302/2058-5241.2.160047 | Full text (PMC5508858) |
| R8 | Huuskonen M, Borkmann S, Bengtsson A, Sobecki P, Józwiak R, Solidakis N, Szaro P. Radiological features accompanying peroneus brevis split rupture revealed on magnetic resonance imaging: a cohort study. J Foot Ankle Res. 2023;16(1):10. | 36864523 | 10.1186/s13047-023-00604-4 | Full text (PMC9979459) |
| R9 | Szaro P, Nilsson-Helander K, Carmont M. MRI of the Achilles tendon: a comprehensive pictorial review. Part two. Eur J Radiol Open. 2021;8:100343. | 33850972 | 10.1016/j.ejro.2021.100343 | Full text (PMC8039832) |
| R10 | Lavery KP, McHale KJ, Rossy WH, Theodore G. Ankle impingement. J Orthop Surg Res. 2016;11(1):97. | 27608626 | 10.1186/s13018-016-0430-x | Full text (PMC5016963) |
| R11 | Lektrakul N, Chung CB, Lai Ym, Theodorou DJ, Yu J, Haghighi P, Trudell D, Resnick D. Tarsal sinus: arthrographic, MR imaging, MR arthrographic, and pathologic findings in cadavers and retrospective study data in patients with sinus tarsi syndrome. Radiology. 2001;219(3):802-810. | 11376274 | 10.1148/radiology.219.3.r01jn31802 | Abstract |
| R12 | Erickson SJ, Quinn SF, Kneeland JB, Smith JW, Johnson JE, Carrera GF, Shereff MJ, Hyde JS, Jesmanowicz A. MR imaging of the tarsal tunnel and related spaces: normal and abnormal findings with anatomic correlation. AJR Am J Roentgenol. 1990;155(2):323-328. | 2115260 | 10.2214/ajr.155.2.2115260 | Abstract |
| R13 | Draghi F, Gitto S, Bortolotto C, Draghi AG, Ori Belometti G. Imaging of plantar fascia disorders: findings on plain radiography, ultrasound and magnetic resonance imaging. Insights Imaging. 2017;8(1):69-78. | 27957702 | 10.1007/s13244-016-0533-2 | Full text (PMC5265197) |
| R14 | Balen PF, Helms CA. Association of posterior tibial tendon injury with spring ligament injury, sinus tarsi abnormality, and plantar fasciitis on MR imaging. AJR Am J Roentgenol. 2001;176(5):1137-1143. | 11312167 | 10.2214/ajr.176.5.1761137 | Abstract |
| R15 | Berkowitz JF, Kier R, Rudicel S. Plantar fasciitis: MR imaging. Radiology. 1991;179(3):665-667. | 2027971 | 10.1148/radiology.179.3.2027971 | Abstract |

Notes on the set:

- R3 reproduces the Hepple MRI staging of osteochondral lesions (Hepple S, Winson IG, Glew D,
  Foot Ankle Int 1999;20(12):789-793, DOI 10.1177/107110079902001206). Hepple's own abstract
  does not list the stages, so the staging is attributed to R3, which states it in its Table 5.
  Hepple 1999 is **not** in the reference list; cite R3.
- R2 publishes as article number 97 with no page range (Insights Imaging is continuous-
  publication); R10 likewise. R13's Crossref issue date is December 2016 (online); the print
  issue is 2017;8(1).
- Left out after checking: Szaro et al. Achilles Part one (10.1016/j.ejro.2021.100342; dropped
  to stay within 15, its usable content repeats Part two); Bureau 2000 posterior impingement
  (10.1148/radiology.215.2.r00ma01497; covered by R2 and R10); Wang 2005 peroneal Radiographics
  (abstract has no grading); Hepple 1999 (see above); Perrich 2009 (abstract has no content);
  Schweitzer & Karasick 2000 Achilles (no abstract); Rosenberg 2000 RSNA review (abstract is
  general). Any of these can be added later only after the same check.

## Claims table

Columns: **ID** · **Claim** · **Rule** (exact threshold or grade wording, if any) · **Source** ·
**Quote** (with location) · **Verified**.

### Step 1: technique and global look (sequences, effusion, overall marrow)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| T1 | An ankle protocol covers three orthogonal planes, with fat-suppressed T2 or PD imaging and at least one T1 sequence for marrow. | Required: 3 planes; FS T2/PD; ≥1 T1 | R2 | "An MR protocol for ankle imaging should include sequences in all three orthogonal planes and an axial oblique plane if the flexor tendons need more detailed analysis. FS imaging with T2- or proton-density (PD) weighted images is mandatory, as is the inclusion of at least one T1-weighted sequence for bone marrow evaluation." (Imaging protocol) | yes |
| T2 | Bone marrow oedema is low signal on T1 and high signal on fluid-sensitive (STIR/FS) sequences. | — | R2 | "Magnetic resonance imaging (MRI) after ankle trauma often shows alteration of bone marrow signal with a low signal on T1-weighted and a high signal on T2-weighted and fluid-sensitive sequences (like short tau inversion-recovery (STIR) or fat-suppressed (FS) sequences). This is known as bone marrow edema (BME) or bone bruise" (What is bone marrow edema?) | yes |
| T3 | BME is unspecific but sensitive, and its distribution guides a systematic read. | — | R2 | "The presence of BME is an unspecific but sensitive sign of primary pathology and may act as a guide to correct and systematic interpretation of the MR examination." (Abstract) | yes |
| T4 | Effusion graded in three levels by anterior/posterior recess appearance. | Effusion 1: "No gap between the talus and the adjacent fat pad in the anterior joint recess". Effusion 2: "Fluid creating a gap between the talus and the adjacent fat pad in the anterior joint recess, as well as fluid expansion of the posterior recess". Effusion 3: "If fluid also created a gap between the anterior tibia and adjacent fat pad" | R8 | "No gap between the talus and the adjacent fat pad in the anterior joint recess was defined as no effusion (coded as Effusion 1). Fluid creating a gap between the talus and the adjacent fat pad in the anterior joint recess, as well as fluid expansion of the posterior recess, was defined as moderate effusion (coded as Effusion 2). If fluid also created a gap between the anterior tibia and adjacent fat pad, it was defined as severe effusion (coded as Effusion 3)." (Methods: Other variables included and evaluated). Provenance: this is the study's own coding scheme, not a validated grading. | yes (descriptive only, no chip) |
| T5 | Sawant's protocol table (sequences and parameters). | — | R1 | Table 1 ("Imaging protocol") is an image in the PMC record; its contents could not be read as text. | no: table not readable |

### Step 2: bones and marrow (occult/stress fracture, bruise pattern, OLT, ossicles)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| B1 | BME distribution points to the mechanism; inversion gives a medial talus/medial malleolus contrecoup pattern with small lateral malleolus avulsion oedema; eversion the inverse. | — | R2 | "With an inversion injury (Figs. 2 and 6), an extensive reticular BME is visible in the medial part of the ankle joint, mainly in the medial and postero-medial part of the talus and medial malleolus, because of a contrecoup injury. Usually, small areas of BME are visible on the avulsion side in the lateral malleolus. An eversion injury usually causes an inverse BME distribution." (Ligament and articular capsule rupture) | yes |
| B2 | Abstract statement of the inversion pattern. | — | R2 | "The BME pattern following an inversion injury involves the lateral malleolus, the medial part of the talar body, and the medial part of the distal tibia." (Abstract) | yes |
| B3 | Geographic BME in the medial talar trochlea may indicate deltoid avulsion. | — | R2 | "A geographic BME in the medial part of the talar trochlea may indicate an avulsion of the deltoid ligament [8, 9]." (Ligament and articular capsule rupture). Provenance: cites [8, 9]. | yes |
| B4 | Costa-Paz BME types I-III. | Type I: "Diffuse or reticular BME, at some distance from the articular cartilage". Type II: "Localized or geographic BME, often with a convex margin and contiguous to the articular cartilage or bony outline". Type III: "The BME often has slight deformation or disruption of the bony outline" | R2 | "Costa—Paz et al. [10] classify BME into three types:" with list items "Type I: Diffuse or reticular BME, at some distance from the articular cartilage", "Type II: Localized or geographic BME, often with a convex margin and contiguous to the articular cartilage or bony outline", "Type III: The BME often has slight deformation or disruption of the bony outline" and "type I usually corresponds to an injury from a contrecoup mechanism ... type II usually indicates trauma to the ligament attachment, articular capsule, or retinaculum ... Type III is often associated with a fracture or osteochondral lesion" (Bone marrow edema after overuse, minor or major trauma). Provenance: cites Costa-Paz [10]. | yes |
| B5 | No hypointense T1 line excludes a complete fracture. | No T1 hypointense line → not a complete fracture | R2 | "The absence of a hypointense line on T1-weighted images excludes a complete fracture which needs a different treatment (Fig. 3)." (Bone marrow edema after overuse, minor or major trauma) | yes |
| B6 | Stress fracture appearance: linear low signal perpendicular to the load axis with surrounding BME; periosteal oedema is the first sign. | — | R2 | "Linear low-signal disturbances oriented perpendicular to the load axis, usually surrounded by extensive BME, are consistent with stress fracture (Fig. 14). A slight periosteal edema is the first sign of stress fracture which, in the absence of treatment, is followed by BME in the medullary cavity." (Stress fracture) | yes |
| B7 | Common stress reaction sites: distal tibia, distal fibula, calcaneus; overuse lesions in subchondral talar trochlea. | — | R2 | "Overuse lesions occur in relatively constant locations like the subchondral part of talar trochlea. Stress reaction can often be seen in the distal tibia, distal fibula, or the calcaneus." (Bone marrow edema after overuse, minor or major trauma) | yes |
| B8 | Overuse/traumatic BME usually resolves in about 3 months; symptoms usually settle by 6 weeks. | — | R2 | "BME associated with overuse or trauma (Fig. 2) usually resolves after a few months (usually 3 months); however, the clinical symptoms disappear sooner, usually after 6 weeks [6, 8, 9]." (Bone marrow edema after overuse, minor or major trauma). Provenance: cites [6, 8, 9]. | yes |
| B9 | Hepple MRI staging of osteochondral lesions of the talus. | I: "Articular cartilage damage only". IIA: "Cartilage damage with underlying fracture and surrounding bony edema". IIB: "IIA without bony edema". III: "Detached but undisplaced fragment". IV: "Detached and displaced fragment". V: "Subchondral cyst formation" | R3 | Table 5, "Hepple Classification (MRI)", rows as quoted in the Rule column; body: "The Hepple et al. 57 classification is based on the initial classification system of Berndt and Harty but introduces additional traumatic, cystic, or idiopathic subtypes of OLTs ( Table 5 )." (Classification). Provenance: R3 reproduces Hepple 1999 [57]. | yes |
| B10 | OLTs lie mostly on the medial or lateral talar dome. | — | R3 | "Elias et al. 32 ... reported that 96.2% of all lesions affected either the medial (62.8%) or the lateral (33.4%) talar dome, with 53% of the lesions located at the central third of the medial talar dome." (Etiology and Location). Provenance: cites [32]. | yes |
| B11 | MRI tends to overestimate the bony defect because of oedema; CT shows bony width and depth precisely. | — | R3 | "Regarding bone pathologies, MRI tends to overestimate the defect size due to the bone edema pattern, whereas CT gives a precise picture of the width and depth of a bony defect and any other bony pathology." (Diagnostics: Imaging) | yes |
| B12 | An intact cartilage surface on MRI may not be true; MRI specificity for cartilage grading is low. | — | R3 | "the sensitivity of MRI was 91% and specificity was 55% for the Outerbridge grading scale ... An intact cartilage surface reported by the radiologist in MRI may not necessarily represent the truth." (Diagnostics: Imaging). Provenance: cites Staats et al. [49]. | yes |
| B13 | Risk factors for OLT progression on MRI: depth, subchondral cyst, extent of BME; follow-up imaging at 12 months. | — | R3 | "Risk factors for progression are the depth of the lesion on MRI, subchondral cyst formation, and the extent of bone marrow edema. ... A follow-up imaging after 12 months helps not to miss any progression." (Abstract, Conclusion) | yes |
| B14 | Recommended OLT classifications are Berndt-Harty modified by Loomer, Giannini, ICRS and Outerbridge (Hepple is described but not in the recommendation list). | — | R3 | "Statement: The descriptive classification system of Berndt and Harty, modified by Loomer, can still be recommended, as well as the Giannini Classification, ICRS Classification, and Outerbridge Classification." (Classification) | yes |
| B15 | An unstable osteochondral lesion is a fragment that loses contact, displaces or separates. | — | R2 | "An unstable osteochondral lesion is a bone fragment which loses contact, displaces, or separates from the bone into the surrounding joint fluid [8, 19]." (Cartilage and subchondral bone) | yes |
| B16 | BME in an accessory bone suggests it is symptomatic; commonest are os peroneum, os naviculare accessorium, os trigonum; when symptomatic, BME is in both os trigonum and adjacent talus. | — | R2 | "BME in an accessory bone shows that it is probably a symptomatic accessory bone. ... The most common accessory bones are the os peroneum, os naviculare accessorium, and os trigonum. ... BME usually occurs both in the os trigonum and the adjacent part of the talus (Fig. 21) if it is symptomatic [21]." (Accessory bones) | yes |
| B17 | Serpentine marrow line (double-line sign) indicates bone infarct. | — | R2 | "A bone marrow signal alteration in the form of a serpentine line indicates a bone infarct [9, 11]. On T2-weighted images, this line usually comprises two components; a low signal located internally and a high signal externally. These correspond to infarct and hyperemia, respectively, called a double line sign" (Avascular necrosis and bone infarction) | yes |
| B18 | Coalition: calcaneonavicular and talocalcaneal (middle facet) are the commonest; fibrous coalition can give BME. | — | R2 | "Two of the most common coalitions are between the calcaneus and the navicular bone or between the middle facet of the talus and the calcaneus [22, 24]" and "The distortion in fibrous coalition results in overuse and subsequent BME." (Tarsal coalition) | yes |

### Step 3: lateral ligaments (ATFL, CFL, PTFL)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| L1 | Acute ligament injury graded as interstitial, partial or complete tear, with definitions. | Interstitial: "Hyperintense signal within the ligament on PD and T2W images due to presence of edema or hemorrhage". Partial: "Partial discontinuity of ligaments reaching up to the surface but not involving the entire thickness of ligament". Complete: "Discontinuity involving the entire thickness of ligament and is seen as fluid filled defect and retraction" | R1 | "Acute ligament injuries can be graded as interstitial, partial, or complete tear." followed by the three definitions quoted (Pathology: Acute Injury; Interstitial tears; Partial tears; Complete tears) | yes |
| L2 | Acute injury signs: blurred margins, irregular contour, discontinuous/wavy/lax fibres, loss of normal low signal; loss of striations in PTFL, deep deltoid and AITFL. | — | R1 | "MRI shows blurred margins, irregular contours, discontinuous/wavy/lax fibers, inhomogeneous signal, or loss of normal hypointense signal within the ligament. Certain ligaments such as PTFL, deep components of the deltoid ligament, and AITFL show loss of normal striations due to presence of edema and hemorrhage." (Acute Injury) | yes |
| L3 | Chronic injury: attenuated/thin or thick ligament, irregular contour, no oedema. | — | R1 | "MRI shows an attenuated, thin - hypoplastic, or alternately a thick - hyperplastic ligament with irregular contours and absence of edema or hemorrhage." (Chronic Injury) | yes |
| L4 | Grade 1-3 lateral ligament (ATFL, CFL) injury wording. | Grade 1: "interstitial ligament injury which manifests on PD-weighted or fat-suppressed PD-weighted MR images as mild intraligamentous signal hyperintensity, ill-definition of the ligament and pericapsular edema". Grade 2: "a focal ligament fiber" [sic]. Grade 3: "complete ligament fiber discontinuity" | R8 | "Abnormalities of the ATFL and CFL were assessed as one of three grades [20]: grade 1 is interstitial ligament injury which manifests on PD-weighted or fat-suppressed PD-weighted MR images as mild intraligamentous signal hyperintensity, ill-definition of the ligament and pericapsular edema; grade 2 was assessed as a focal ligament fiber; grade 3 was complete ligament fiber discontinuity [20]." (Methods: Other variables included and evaluated). Provenance: cites [20]. The grade 2 wording is incomplete in the paper (presumably focal fibre disruption); use it only as printed or not at all. | yes (grades 1 and 3); grade 2 wording defective. Not a chip: lateral ligament chips use L1 only |
| L5 | Normal thickness: ATFL 2-3 mm, CFL 2 mm. | ATFL 2-3 mm; CFL 2 mm | R1 | "Normal thickness of ATFL is 2 – 3 mm, and CFL is 2 mm." (Anatomy: Lateral ligaments) | yes |
| L6 | ATFL is the weakest and most often injured; PTFL is the strongest and least injured; inversion is ~85% of sprains. | — | R1 | "Inversion injury accounts for 85% of ankle sprain ... Of these, ATFL being the weakest is more prone to injury[78]" and figure caption: "Normal posterior talofibular ligament ... Intracapsular, extrasynovial, strongest, deepest, and least injured of lateral ligaments." (Pathology; Figure 3 caption). Provenance: cites [5, 6, 7, 8]. | yes |
| L7 | ATFL and PTFL are best seen axially; an oblique coronal (CFL view) helps the CFL. | — | R1 | "Use of oblique coronal plane (CFL view) helps in better evaluation of anatomy and pathology (injury) of CFL as compared to orthogonal plane.[1]" and caption "Anterior talofibular ligament and posterior talofibular ligament best identified on axial images, where talar dome (T) is oblong, fibula (F) is 'C'/crescent shaped." (Lateral ligaments) | yes |
| L8 | Normal PTFL, deep deltoid and AITFL are striated/heterogeneous (not a tear). | — | R1 | "Notable exceptions include posterior talofibular, deep components of the deltoid ligament, and anterior inferior tibiofibular ligament that show heterogeneous signal and striations because of the interspersed fat between their fascicles." (Pathology) | yes |
| L9 | Peroneal tendinosis and PB longitudinal tear commonly accompany lateral ligament injury. | — | R1 | "Peroneal tendinosis is commonly seen with ATFL injury followed by CFL and PTFL injury[17] ... Partial longitudinal tear of peroneus brevis tendon is commonly associated with lateral ankle sprain.[18]" (Important Associations) | yes |
| L10 | ATFL/CFL tear rates did not differ between PB split and control groups. | — | R8 | "there was no significant difference in occurrence of ATFL or CFL ruptures." (Discussion) | yes |

### Step 4: syndesmosis (AITFL, PITFL, interosseous membrane)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| S1 | MRI criteria for syndesmotic ligament disruption: discontinuity (criterion 1), or wavy/curved contour or non-visualisation (criterion 2). | Disruption = "ligament discontinuity (criterion 1) or either a wavy or curved ligament contour or nonvisualization of the ligament (criterion 2)" | R4 | "When MR imaging revealed ligament discontinuity (criterion 1) or either a wavy or curved ligament contour or nonvisualization of the ligament (criterion 2), the injury was considered to be a ligament disruption." (Abstract, Materials and Methods) | yes |
| S2 | Using both criteria: AITFL sensitivity 100%, specificity 93%, accuracy 97%; PITFL 100/100/100%. | — | R4 | "When an MR imaging diagnosis was based on criteria 1 and 2, the diagnosis of AITFL disruption was made with a sensitivity of 100%, a specificity of 93%, and an accuracy of 97%, whereas the diagnosis of PITFL disruption was made with a sensitivity of 100%, a specificity of 100%, and an accuracy of 100%." (Abstract, Results) | yes |
| S3 | Tibiofibular recess fluid normally 5-7 mm; >12 mm is definitely abnormal and suggests acute syndesmotic injury. | Normal 5-7 mm; > 12 mm abnormal | R1 | "Fluid in Tibiofibular recess normally measures 5–7 mm." (Syndesmotic ligaments) and "Fluid in the tibiofibular recess measuring >12 mm is definitely abnormal and suggestive of acute injury to syndesmotic ligaments or high ankle sprains[1415]" (Pathology, text following 'Complete tears'). Provenance: cites [14, 15]. Note: 7-12 mm is not classified by the paper; the Figure 15 caption describes a 10 mm recess with torn ligaments. | yes |
| S4 | A 45° oblique plane shows AITFL/PITFL better than orthogonal planes; they are best identified axially where the talar dome is square and the fibula round. | — | R1 | "A 45° oblique plane is superior in demonstrating their normal integrity/pathologies as compared to orthogonal imaging.[3]" and caption "best identified on axial images, where the talar dome (T) is square shaped, and Fibula is round" (first quote: body text, Syndesmotic ligaments; second quote: Figure 7 caption). Provenance: the oblique-plane sentence cites [3]. | yes |
| S5 | AITFL and PITFL are injured together. | — | R1 | "Anterior and posterior inferior tibiofibular ligaments are injured simultaneously.[2]" (Syndesmotic ligaments). Provenance: cites [2]. Note: R4 found 28 AITFL vs 5 PITFL disruptions at arthroscopy, so "simultaneously" is not universal; state it as R1's statement only. | yes |
| S6 | High ankle sprains: 7% of routine sprains, 40% of athletes' injuries. | — | R1 | "High ankle/syndesmotic sprains account for 7% of routine ankle sprains and 40% of injuries in athletes." (Pathology). Provenance: cites [12, 13]. | yes |
| S7 | Interosseous membrane: MRI appearance or injury criteria. | — | — | None of the read texts describes MRI findings of interosseous membrane injury. R1 names it ("Interosseus membrane or ligament (IOL)") and says only AITFL and PITFL "can be easily identified on routine MRI". | no: not stated in any source |

### Step 5: medial ligaments (deltoid, spring)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| M1 | Deltoid components: superficial (tibiocalcaneal, tibionavicular, tibiospring) and deep (anterior and posterior tibiotalar). | — | R1 | "Tibiocalcaneal ligament (TCL), Tibionavicular ligament (TNL), and Tibiospring ligament (TSL)" (Superficial component) and "Anterior tibiotalar ligament (ATTL) and Posterior tibiotalar ligament (PTTL)" (Deep component) | yes |
| M2 | Normal thickness: TNL 1-2 mm, TSL 2 mm (1-4), PTTL 6-11 mm (thickest). | TNL 1-2 mm; TSL 2 mm (1-4 mm); PTTL 6-11 mm | R1 | "Normal thickness of TNL is 1–2 mm, and TSL is 2 mm (1–4mm). The PTTL is thickest ligament and normally measures 6–11 mm." (Deep component) | yes |
| M3 | Spring ligament complex: superomedial, medioplantar oblique, inferoplantar longitudinal; normal SM 3 mm (2-5), IPL 4 mm (2-6). | SM 3 mm (2-5 mm); IPL 4 mm (2-6 mm) | R1 | "The spring ligament complex consists of superomedial (SM), medioplantar oblique (MPO), and inferoplantar longitudinal (IPL) components ... Normal thickness of SM component is 3 mm (2–5 mm), and IPL component is 4 mm (2–6 mm)." (Syndesmotic ligaments section) | yes |
| M4 | Discontinuity and abnormally high signal of the superomedial CNL are reliable MRI signs of spring ligament injury. | — | R5 | "Discontinuity and abnormally high signal intensity are reliable MRI findings for spring ligament injury and related disorders, such as flatfoot deformity and PTT injury." (Abstract, Conclusion); "Discontinuity and abnormally high signal intensity of the superomedial calcaneonavicular ligament (SmCNL) on MRI were more frequently observed in patients with spring ligament injury than in controls (p < 0.001)." (Abstract, Results) | yes |
| M5 | Spring injury findings were judged by waviness, abnormal high signal and discontinuity. | — | R5 | "The presence or absence of abnormal MRI findings in the spring ligament complex (SmCNL, MpoCNL, and IplCNL ...) was judged by waviness, abnormally high signal intensity, and discontinuity." (Methods: Image analysis) | yes |
| M6 | PTT, tibiospring and spring ligament injuries occur together (shared arch support). | — | R1 | "Tibialis posterior tendon injuries are seen simultaneously with tibiospring and spring ligament complex injuries because of their synergistic action in maintaining the medial plantar arch[1920]" (Important Associations) | yes |
| M7 | Spring ligament abnormal in 92% of advanced PTT injury vs 28% of normal PTT. | — | R14 | "The spring ligament was abnormal in 23 (92%) of 25 patients with a posterior tibial tendon injury and seven (28%) of 25 patients with a normal posterior tibial tendon (p < 0.0001)." (Abstract, Results) | yes |
| M8 | Eversion injuries affect the deltoid, ~5% of sprains. | — | R1 | "Eversion injuries commonly affect the medial deltoid ligament complex, accounting for approximately 5% of ankle sprains" (Pathology). Provenance: cites [10, 11]. | yes |
| M9 | A numeric thickness cut-off for an abnormal spring ligament. | — | — | R5 reports a thickened SmCNL of "maximum 9 mm" in one figure caption only; no source gives a threshold. | no: no threshold stated |

### Step 6: medial tendons (tibialis posterior, FDL, FHL)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| MT1 | PTT ruptures classified as type 1, 2 or 3; MRI sensitivity 95%, specificity 100% for rupture. | — | R6 | "Each case was classified radiographically and surgically as normal or a type 1, type 2, or type 3 rupture. The sensitivity and specificity of CT were 90% and 100%, respectively, while those of MR imaging were 95% and 100%." (Abstract) | yes (existence of types and accuracy only) |
| MT2 | Definitions of Rosenberg PTT rupture types 1-3 (e.g. hypertrophied, attenuated, gap). | — | R6 | The abstract names the types but does not define them; the full text is paywalled and could not be read. | **no: definitions not seen; do not build chips on them** |
| MT3 | MRI shows tendon outline, vertical splits, fluid, oedema and degenerated tissue better than CT. | — | R6 | "MR imaging provided greater definition of tendon outline, vertical splits, synovial fluid, edema, and degenerated tissue." (Abstract) | yes |
| MT4 | MRI criteria used for PTT injury: abnormally high signal, thickening, and/or an obvious tear. | PTT injury = "abnormally high signal intensity, thickening, and/or an obvious tear" | R5 | "The presence or absence of PTT injury was determined by the same two radiologists in cooperation based on the criteria of abnormally high signal intensity, thickening, and/or an obvious tear." (Methods: Image analysis). Provenance: the study's working criteria. | yes |
| MT5 | Advanced PTT injury is associated with spring ligament and sinus tarsi abnormalities; two or more associated abnormalities in 80%. | — | R14 | "Advanced posterior tibial tendon injury has a high association with spring ligament and sinus tarsi abnormalities on MR imaging. ... Patients with posterior tibial tendon injury often have abnormalities of two or more associated structures." and "Two or more associated abnormalities were present in 20 (80%) of 25 patients with posterior tibial tendon injury and four (16%) of 25 patients with a normal posterior tibial tendon" (Abstract) | yes |
| MT6 | Reticular BME in the posterior medial malleolus accompanies PTT dysfunction. | — | R2 | "Reticular BME in the posterior half of the medial malleolus is seen with dysfunction of the tibialis posterior tendon (Fig. 8); BME in the posterior half of the lateral malleolus with pathology in the peroneal tendons (Fig. 9)" (Tendinopathy and enthesopathy). Provenance: cites [17, 18]. | yes |
| MT7 | Tarsal tunnel contents include TP, FDL and FHL tendons (also step 10). | — | R12 | "MR images showed the flexor retinaculum and the structures passing deep to the retinaculum: the tibialis posterior tendon, flexor digitorum longus tendon, flexor hallucis longus tendon, and the posterior tibial neurovascular bundle." (Abstract) | yes |
| MT8 | FHL sheath fluid occurs in posterior impingement (also step 8). | — | R2 | "The os trigonum and talus often articulate. The mobility produces a folding of the joint capsule, occurrence of joint fluid, and conflict with the synovial sheath of the flexor hallucis longus tendon or Kager's fat pad." (Accessory bones) | yes |
| MT9 | Grading of FDL or FHL tears; a normal-size ratio of PTT to FDL. | — | — | Not stated in any listed reference. (A PTT "roughly twice" FDL size was seen in Kawabata 2024, which is not in this list.) | no: not in listed sources |

### Step 7: lateral tendons (peroneus brevis and longus, SPR, variants)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| P1 | Circumferential fluid >3 mm in the common peroneal sheath is highly specific for tenosynovitis. | > 3 mm circumferential fluid → highly specific for tenosynovitis | R7 | "Circumferential fluid within the common peroneal tendon sheath wider than 3 mm is highly specific for peroneal tenosynovitis (Fig. 8).31" (Imaging studies). Provenance: cites [31]. | yes |
| P2 | Tendinosis/tenosynovitis: increased signal in the tendon and fluid around it, best on T2 or axial PD. | — | R7 | "Tendinosis and tenosynovitis are best visualised on T2-weighted or axial proton density weighted images and are characterised by increased signal intensity within the tendon and fluid signal surrounding the tendon." (Imaging studies) | yes |
| P3 | Magic angle: tendons curving round the malleolus at 55° give artefactual signal; long TE and plantar flexion reduce it. | — | R7 | "The 'magic' angle effect must be considered before the diagnosis of a peroneal tendon tear is excluded. This occurs as the tendons follow a curved path around the lateral malleolus, rendering tendon fibres 55° to the magnetic axis, resulting in artefactual signal.32 ... T2-weighted images (or any sequence with a long echo time) placing the foot in plantar flexion are helpful in reducing this artefact.16" (Imaging studies) | yes |
| P4 | Pathology falls into three groups: tendinopathy/tenosynovitis, subluxation/dislocation, splits/tears. | — | R7 | "Pathology of the tendons falls into three broad categories: tendinopathy, tendon subluxation and dislocation, and tendon splits and tears.2" (Introduction) | yes |
| P5 | SPR injury grades (Eckert and Davis I-III, Oden IV). | I: "avulsion of the retinaculum from the lateral malleolus, with the tendons lying between the bone and periosteum". II: "the fibrocartilaginous ridge was avulsed with the retinaculum, the tendons are located between the fibrocartilaginous ridge and the fibula". III: "a thin cortical fragment of bone is avulsed from the fibula". IV: "the SPR is torn from its posterior attachment to the calcaneus and deep investing fascia of the Achilles tendon, the tendon lies superficial to the peroneal retinaculum" | R7 | "In 1976, Eckert and Davis35 evaluated 73 patients with injury to the SPR and classified three types of injury. Grade I injuries, (51%) were characterised by avulsion of the retinaculum from the lateral malleolus ... In 1987, Oden36 added grade IV ..." (Peroneal subluxation and dislocation). Provenance: a surgical classification cited from [35, 36]; R7 does not give MRI criteria for each grade. | yes (descriptive only, no chip: surgical grading, MRI application not stated) |
| P6 | Intrasheath subluxation types A and B (Raikin). | A: the tendons switch positions "without a tear in the tendons or disruption of the superior peroneal retinaculum". B: "the peroneus longus tendon subluxates through a longitudinal split tear within the peroneus brevis tendon" | R7 | "Raikin et al46 defines two types: type A involves the peroneus brevis and longus tendon snapping over one another and switching their relative positions ... without a tear in the tendons or disruption of the superior peroneal retinaculum. In the other subtype (type B), the peroneus longus tendon subluxates through a longitudinal split tear within the peroneus brevis tendon" (Intrasheath subluxation). Provenance: cites [46]. | yes |
| P7 | Brandes-Smith zones of peroneal tears: A under the SPR, B at the inferior retinaculum, C at the cuboid notch (longus). | A: "tears occurring under the superior retinaculum"; B: "the region of the inferior peroneal retinaculum"; C: "at the cuboid notch and is the region where longus pathology occurs most often" | R7 | Bulleted list after "the Brandes Smith27 classification is useful for both brevis and longus tears:" (Peroneal tendon splits and tears). Provenance: cites [27]. | yes |
| P8 | Low-lying peroneus brevis, Davda definition: muscle belly below the superior margin of the SPR; up to 33%; foot position changes it. | "the muscle belly extends below the superior margin of the SPR" | R7 | "A low lying peroneus muscle brevis is relatively common, seen in up to 33% of individuals. It is diagnosed when the muscle belly extends below the superior margin of the SPR. However, what constitutes a low lying muscle belly is unclear as the level of the musculotendinous junction is affected by foot position" (Anatomical variations) | yes |
| P9 | Low-lying peroneus brevis, Huuskonen definition: belly seen at least at the level of the PTFL attachment. | "the muscle belly was seen at least at the level of the lateral malleolus at the level where the posterior talofibular ligament (PTFL) attaches" | R8 | "The PB was considered low-lying if the muscle belly was seen at least at the level of the lateral malleolus at the level where the posterior talofibular ligament (PTFL) attaches." (Methods: Other variables included and evaluated). Note: differs from P8; keep both, do not merge. | yes |
| P10 | Peroneus quartus: separate muscle/tendon posteromedial to the peroneals, separated by fat; 6.6-21.7% of cadavers; with low-lying PB can crowd the groove. | — | R7 | "The peroneus quartus muscle typically originates from the peroneus brevis muscle belly in the distal one-third of the leg and descends posteromedial to the peroneal tendons." and "The presence of the muscle is relatively common, occurring in 6.6% to 21.7% of cadaveric specimens15,17 and it appears on an ultrasound scan (USS) and MRI as a discrete muscle or tendon structure, separated from the adjacent peroneus muscles by a fat plane (Fig. 6). Both the low lying brevis and quartus anomalies can overcrowd the retromalleolar groove, causing laxity of the SPR and is associated with longitudinal splitting, tenosynovitis and dislocation.16" (Anatomical variations). Provenance: prevalence cites R7 refs [15] Zammit & Singh 2003 and [17] Sobel et al. 1990 (not in this list). | yes |
| P11 | Peroneal tubercle >5 mm high is linked to longus impingement/stenosing tenosynovitis. | > 5 mm tubercle height | R7 | "Prominence of the tubercle of > 5 mm in height is reported to be related to peroneus longus impingement and stenosing tenosynovitis, as it passes under the inferior retinaculum.8" (Anatomy). Provenance: "is reported", cites R7 ref [8], Bruce WD, Christofersen MR, Phillips DL. Stenosing tenosynovitis and impingement of the peroneal tendons associated with hypertrophy of the peroneal tubercle. Foot Ankle Int 1999;20:464-467 (as listed in R7's references; not itself in this list). | yes |
| P12 | Prominent peroneal tubercle, Huuskonen definition: length exceeds the width of each peroneal tendon. | tubercle length > width of each peroneal tendon | R8 | "If the length of the peroneal tubercle, measured from the lateral margin of the calcaneus, exceeded the width of each peroneal tendon it was defined as prominent." (Methods: Other variables included and evaluated) | yes |
| P13 | BME in the posterior half of the lateral malleolus is significantly more common with PB split rupture. | — | R8 | "The most significant result of the current study is that bone marrow edema in the posterior half of the lateral malleolus is significantly common in patients with a peroneus split rupture." (Discussion) | yes |
| P14 | The commonest site of PB split is at the tip of the lateral malleolus; MRI alone is reportedly not sufficient to diagnose split tears. | — | R8 | "The most common site of PB split rupture is located at the level of the tip of the apex of the lateral malleolus." (Discussion); "Despite its utility [13], MRI alone is reportedly not yet sufficient in diagnosing peroneal split tears [8]." (Background) | yes |
| P15 | Axial and oblique images are most useful for the tendons, with all three planes used. | — | R8 | "While axial and oblique images are the most useful in elucidating pathology in the tendons, all three orthogonal planes should be utilized [9, 12, 14]." (Background) | yes |
| P16 | MRI morphology of a PB split tear (C-shaped, boomerang, bisected tendon). | — | — | No listed source describes split-tear morphology on MRI; R8 defines its split group clinically/surgically ("a radiologically and clinically proved identifiable longitudinal tear", Methods: Assignment to experimental and control groups). | no: not stated |
| P17 | Os peroneum: may be uni-, bi- or multipartite; painful os peroneum syndrome spans fracture to entrapment. | — | R7 | "Its morphology varies and, similar to other sesamoids within the body, it may be uni-, bi- or multi-partite. ... Painful os peroneum syndrome (POPS) is a term coined by Sobel et al10 to describe a spectrum of pathology of the os varying from acute fracture to a hypertrophied peroneal tubercle" (Anatomy) | yes |

### Step 8: posterior (Achilles, retrocalcaneal bursa, Haglund, posterior impingement)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| A1 | Midportion tendinopathy is the commonest Achilles disorder; focal fluid signal indicates microtears that may progress to partial and complete rupture. | — | R9 | "The most common disorder affecting the Achilles tendon is midportion tendinopathy. A focal fluid signal indicates microtears, which may progress to partial and complete rupture." (Abstract) | yes |
| A2 | Tendinosis sign: fusiform midportion thickening with increased signal. | — | R9 | "The common sign of tendinosis is fusiform thickening of the midportion of the Achilles tendon with increased signal [9] (Fig. 2)." (Midportion tendinopathy) | yes |
| A3 | Progressing tendinopathy gives intrasubstance or surface ruptures; complete rupture may be end-stage degeneration. | — | R9 | "If the tendinopathy progresses, intrasubstance or surface ruptures may occur (Fig. 5). A complete rupture of the Achilles tendon may be the end-stage of degeneration [11]." (Midportion tendinopathy) | yes |
| A4 | Total rupture: commonest at the midportion, 5-6 cm from the insertion; frayed ends with a gap. | — | R9 | "The most common site of a rupture is at the midportion of the tendon at 5–6 cm from the insertion" (Rupture of the Achilles tendon) and "Total ruptures occur most commonly at the midportion of the tendon, and the ends of the tendon are frayed with a gap between the tendon ends" (Total ruptures) | yes |
| A5 | Gap measurement: sagittal and coronal sections; significant diastasis may indicate surgery. | — | R9 | "This may be most apparent on sagittal sections, however, assessing the coronal section is also helpful (Fig. 23)." and "Significant diastasis between the stumps of the tendon may be an indication for surgery [34,35]." (Total ruptures). No numeric diastasis threshold is given. | yes (no threshold) |
| A6 | Distal rupture within 2 cm of the insertion is rare. | within 2 cm of insertion = distal | R9 | "The distal total rupture of the Achilles tendon within 2 cm of the insertion is fortunately rare [36]." (Total ruptures) | yes |
| A7 | Haglund's syndrome: posterosuperior calcaneal prominence impinging the tendon; BME in the prominence + retrocalcaneal bursitis + insertional tendinopathy. | — | R9 | "If the bony prominence on the posterosuperior part of the calcaneus causes impingement of the Achilles tendon, the condition is called Haglund's syndrome." (Insertional tendinopathy) and "The presence of bone marrow edema within the bone deformation, retrocalcaneal bursitis and insertional tendinopathy comprise Haglund's syndrome and help in the selection of patients for surgery [17,19]" (MRI assessment of surgical treatment of Haglund's syndrome) | yes |
| A8 | Early Haglund's may show only retrocalcaneal bursitis and small insertional signal change. | — | R9 | "The MRI manifestations of the Haglund's syndrome may initially be subtle, such as retrocalcaneal bursitis, and only small signal changes within the Achilles tendon insertion are seen (Fig. 10)." (Insertional tendinopathy) | yes |
| A9 | Paratenonitis: high paratenon signal, may accompany tendinopathy or occur alone. | — | R9 | "Paratenonitis is an inflammatory reaction of the paratenon ... Paratenonitis may accompany Achilles tendon tendinopathy or be a separate pathology (Fig. 1)." (Paratenonitis) | yes |
| A10 | After repair or nonoperative care, fluid signal in the tendon indicates re-rupture; higher signal alone is common. | — | R9 | "After nonoperative management or surgical repair of the Achilles tendon, areas of fluid signal is pathologic because it indicates re-rupture. A higher signal in the postoperative Achilles tendon is a common finding" (Abstract) | yes |
| A11 | Posterior impingement: os trigonum or elongated posterior talar process; BME in it, Kager's fat pad oedema and posterior recess effusion are frequent. | — | R2 | "An elongated posterior process of the talus or an os trigonum causes posterior ankle impingement. BME found in the posterior process of the talus or in the os trigonum, edema in Kager's fat pad, and effusion in the posterior ankle recess are frequent findings [20, 21]." (Impingement) | yes |
| A12 | The trigonal process is the commonest cause of posterior impingement; Stieda process = elongated tubercle; marrow signal in it suggests acute injury or chronic stress fracture. | — | R10 | "Pathology associated with the lateral (trigonal) process of the posterior talus is the most common cause of posterior impingement (Fig. 1). ... A Stieda process refers to an elongated tubercle." (Posterior impingement) and "Increased marrow signal intensity at the trigonal process or os trigonum is suggestive of an acute injury or chronic stress fracture [44]." (Imaging) | yes |
| A13 | Calcaneal BME at the Achilles insertion can reflect overuse. | — | R2 | "Overuse of the insertion of the Achilles tendon or plantar fascia may appear as BME in the calcaneus [3]." (Bone marrow edema after overuse, minor or major trauma) | yes |
| A14 | Numeric Achilles thickness threshold or partial-tear percentage grading. | — | — | Not stated in R9 or any other listed source. | no: not stated |

### Step 9: anterior (anterior tendons, anterior and anterolateral impingement)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| N1 | Impingement syndromes are grouped by site: anterior, anterolateral, anteromedial, posterior, posteromedial, posterolateral, syndesmotic. | — | R10 | "Specific anterior, anterolateral, anteromedial, posterior, posteromedial, posterolateral, and syndesmotic impingements have been described [1, 2]. However, these pathologies are generally grouped into anterior and posterior impingement syndromes for simplicity." (Background) | yes |
| N2 | On MRI look for bone oedema, effusion, synovitis, tenosynovitis, chondral injury; anterolateral gutter may hold hypertrophic synovium or fibrosis. | — | R10 | "Images should be evaluated for bone edema, effusion, synovitis, tenosynovitis, and concomitant chondral injury (Fig. 3). In anterior soft tissue impingement, the anterolateral gutter may contain hypertrophic synovium or fibrosis." (Imaging) | yes |
| N3 | MRI accuracy for soft-tissue impingement is variable: sensitivity 42-89%, specificity 75-100%. | — | R10 | "The efficacy of MRI in evaluating soft tissue impingement lesions is variable, with reported sensitivities 42–89 % and specificities 75–100 % [45–50]." (Imaging) | yes |
| N4 | Chronic ATFL tear: scar/granulation in the anterolateral gutter resembles a "meniscus" and can cause anterolateral impingement; similar in anteromedial/posteromedial. | — | R1 | "In chronic ATFL tear, granulation/scar tissue or fibrosis in the anterolateral gutter resembles a "meniscus" and can lead to clinical anterolateral impingement syndrome [Figure 16]. Similar findings can be seen in anteromedial and posteromedial impingement syndromes [Figure 17]." (Impingement Syndrome) | yes |
| N5 | Anterior bony impingement: tibial and talar osteophytes ("kissing" osteophytes often do not actually abut). | — | R10 | "Although they are often referred to as "kissing osteophytes", these tibial and talar spurs surprisingly often do not actually overlap and abut. Evaluation of preoperative CT scans has shown that talar spurs generally lie medial to the midline of the talar dome and tibial spurs are generally located laterally [9]." (Etiology and pathoanatomy: Anterior impingement). Provenance: CT finding [9]. | yes |
| N6 | Anterior soft tissue causes: post-traumatic bands, thickened anterior tibiofibular ligament, plica. | — | R10 | "Post-traumatic fibrous bands [13], thickened anterior tibiofibular ligaments [14, 15], and synovial plica [16], have also been identified as causative factors." (Anterior impingement) | yes |
| N7 | Contrast 3D-FSPGR is superior for anterolateral impingement. | — | R1 | "Post contrast fat-suppressed 3D-FSPGR ... sequence of the ankle is superior and accurate in assessing anterolateral impingement syndrome by better delineation of synovial thickening/inflammation and granulation tissue.[8]" (Impingement Syndrome). Provenance: cites [8]. | yes |
| N8 | Anterior tendons (tibialis anterior, EHL, EDL): any MRI finding or grading. | — | — | None of the listed sources discusses the anterior tendons. A descriptive field is possible; no rule, chip or lesson statement can be cited. | no: not stated in any source |

### Step 10: spaces and nerves (sinus tarsi, tarsal tunnel)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| SP1 | Sinus tarsi syndrome findings on MRI include cervical and interosseous talocalcaneal ligament tears, ganglia and PVNS. | — | R11 | "In 18 patients, the diagnosis was confirmed at MR imaging, which depicted ITCL and CL tears in 11 patients, isolated CL tears in three patients, ganglia in three patients, and pigmented villonodular synovitis in one patient." (Abstract, Results) | yes |
| SP2 | Reconstructed planes along and perpendicular to the ligaments help assess sinus tarsi structures. | — | R11 | "Cadaveric study results indicate that initial and reconstructed MR arthrograms along and perpendicular to the ligament axes are potentially useful for further evaluation of individual tarsal sinus structures." (Abstract, Conclusion). Note: this concerns MR arthrography in cadavers. | yes |
| SP3 | Sinus tarsi abnormal in 72% of advanced PTT injury vs 36% with normal PTT. | — | R14 | "The sinus tarsi was abnormal in 18 (72%) of 25 patients with posterior tibial tendon injury and nine (36%) of 25 patients with a normal posterior tibial tendon (p < 0.0132)." (Abstract, Results) | yes |
| SP4 | Tarsal tunnel: flexor retinaculum roof; contents TP, FDL, FHL and the posterior tibial neurovascular bundle; medial calcaneal, medial and lateral plantar nerves shown. | — | R12 | "In all normal subjects, MR images showed the flexor retinaculum and the structures passing deep to the retinaculum: the tibialis posterior tendon, flexor digitorum longus tendon, flexor hallucis longus tendon, and the posterior tibial neurovascular bundle. The medial calcaneal sensory branch(es) and the medial and lateral plantar nerves also were delineated." (Abstract) | yes |
| SP5 | Causes found in symptomatic tarsal tunnel patients: neurilemomas, tenosynovitis, FHL sheath ganglion, post-traumatic fibrosis and neuroma. | — | R12 | "Mechanical causes of compression were shown in all six symptomatic patients. The pathologic entities included two neurilemomas, tenosynovitis involving all three tendons, a ganglion cyst arising from the flexor hallucis longus tendon sheath, posttraumatic fibrosis, and post-traumatic fibrosis with associated posttraumatic neuroma." (Abstract) | yes |
| SP6 | Sinus tarsi soft tissue appearance (fat replaced by fluid or fibrosis) as a diagnostic sign. | — | — | Not stated in R11 or R14 abstracts; R14 does not define "sinus tarsi abnormality" in its abstract. | no: definition not seen |
| SP7 | Varicosities as a tarsal tunnel cause. | — | — | Seen only in Rodríguez-Merchán 2021 (not in this list). | no: not in listed sources |

### Step 11: plantar (plantar fascia)

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| PF1 | MRI findings of plantar fasciitis: thickening (most often at the calcaneal origin), intermediate T1 / high fluid signal, adjacent soft tissue oedema, calcaneal marrow oedema at the attachment. | — | R13 | "MRI findings of plantar fasciitis include: thickening of the PF, most commonly at its calcaneal origin; intrasubstance areas of intermediate signal on T1-weighted sequences and increased signal on fluid-sensitive sequences; oedema in the adjacent soft tissue; bone marrow oedema of the calcaneal attachment of the PF suggestive of enthesopathy (Figs. 2 and 3) [2, 4]." (Magnetic resonance imaging) | yes |
| PF2 | MRI findings of acute tear: complete or partial interruption, fluid-bright signal at the site, surrounding soft-tissue high signal. | — | R13 | "MRI findings of acute PF tear are complete or partial interruption of the low signal of the PF and signal changes at the site of lesion including high signal on fluid-sensitive sequences and intermediate signal on T1-weighted sequences. High-signal intensity may be an additional finding on fluid-sensitive sequences in the soft tissues surrounding the site of rupture" (Magnetic resonance imaging) | yes |
| PF3 | Plantar fibroma: lobulated low-signal mass on T1 and T2, distal two-thirds, usually central bundle. | — | R13 | "the common MRI appearance of plantar fibroma is a lobulated mass of low signal intensity on both T1- and T2-weighted sequences due to its fibrous nature (Fig. 5)" and "It tends to involve the distal two thirds of the PF, usually in its central bundle" (Magnetic resonance imaging; General features of PF disorders) | yes |
| PF4 | Normal fascia: thin low-signal band on T1 and fluid-sensitive images. | — | R13 | Figure 1 caption (Anatomy and function of the PF): "On MRI, the normal PF (arrows) is seen as a thin band of low signal intensity on both T1-weighted (d) and fluid-sensitive (e) images" | yes |
| PF5 | MRI thickness in plantar fasciitis vs controls: 7.40 vs 3.22 mm (sagittal); 9 of 10 feet showed increased intrasubstance signal. | — | R15 | "Maximum thickness of the plantar fascia was significantly increased (P less than .0001) in patients with plantar fasciitis (sagittal, 7.40 mm +/- 1.17, and coronal, 7.56 mm +/- 1.01) compared with age- and sex-matched volunteers (sagittal, 3.22 mm +/- 0.44, and coronal, 3.44 mm +/- 0.53) ... nine of 10 feet with plantar fasciitis had areas of moderately increased signal intensity in the substance of the fascia." (Abstract). Eight patients; group means, not a cut-off. | yes (means only) |
| PF6 | An MRI thickness cut-off for plantar fasciitis (e.g. > 4 mm). | — | R13 | R13 gives "more than 4–5 mm" for **lateral radiographs** and "increased thickness over 4 mm" for **ultrasound**; neither is an MRI threshold. R15 gives means only. | **no: no MRI cut-off in any source; no chip** |
| PF7 | Ultrasound is first line and MRI second line for the plantar fascia. | — | R13 | "Ultrasound and MRI respectively represent the first- and second-line modalities for diagnosis." (Key points) | yes |
| PF8 | Plantar fascia abnormal in 32% of advanced PTT injury vs 9% (not significant); low association. | — | R14 | "The plantar fascia was abnormal in seven (32%) of 22 patients with posterior tibial tendon injury and two (9%) of 22 patients with a normal posterior tibial tendon (p < 0.0768). ... There was a low association between advanced posterior tibial tendon injury and plantar fascia abnormality." (Abstract) | yes |

### Step 12: other findings and impression

| ID | Claim | Rule | Source | Quote and location | Verified |
|---|---|---|---|---|---|
| I1 | Ligament and tendon injuries are most often simultaneous; bone contusion, osteochondral lesion and effusion are other common associations (supports cross-step consistency checks). | — | R1 | "Ligaments and adjacent tendons have synergistic functions, and their injuries are most often simultaneous. ... Bone contusion, osteochondral lesion, and joint effusion are other common associations [Figure 19]." (Important Associations) | yes |
| I2 | Stable sprains are treated conservatively; those with osteochondral lesions arthroscopically; unstable severe sprains with reconstruction. | — | R1 | "Most of the ankle sprains are stable and are treated conservatively ... Those associated with osteochondral lesions are treated with arthroscopic repair. Severe ankle sprain injuries with instability are treated with surgical reconstruction of ligaments." (Conclusion). Management statement from a pictorial essay; use only as background, not as advice in the report. | yes |
| I3 | Grading of overall injury severity needs clinical correlation (drawer, inversion/eversion tests). | — | R1 | "Depending on the MRI features and the clinical co-relates (Drawers test, inversion and eversion tests), it is possible for the clinicians to grade the ankle injury from mild to severe and also assess instability." (Conclusion) | yes |
| I4 | A diffuse BME pattern raises AVN, inflammation or stress fracture, so history matters. | — | R2 | "Early avascular necrosis, inflammation, or stress fracture may lead to more diffuse BME; therefore, a detailed medical history is crucial for correct diagnosis." (Abstract) | yes |
| I5 | Asymptomatic OLTs are common (42% of professional soccer players); MRI findings alone do not justify prophylactic surgery. | — | R3 | "Bezuglov et al. 64 reviewed a cohort of 37 asymptomatic professional soccer players and found osteochondral lesions in 42% of the athletes." and "Based on MRI findings alone, there is no need to urge patients with minimal or no symptoms for prophylactic surgery." (Natural Progression) | yes |
| I6 | A fixed impression template or management recommendation for ankle MRI. | — | — | No listed source gives an impression format; the template is the study's own structure, not a cited rule. | no: not stated |

## Counts

| Step | Verified | Unverified |
|---|---|---|
| 1 Technique and global look | 4 | 1 |
| 2 Bones and marrow | 18 | 0 |
| 3 Lateral ligaments | 10 (L4 grade 2 wording defective) | 0 |
| 4 Syndesmosis | 6 | 1 |
| 5 Medial ligaments | 8 | 1 |
| 6 Medial tendons | 7 | 2 |
| 7 Lateral tendons | 16 | 1 |
| 8 Posterior | 13 | 1 |
| 9 Anterior | 7 | 1 |
| 10 Spaces and nerves | 5 | 2 |
| 11 Plantar | 7 | 1 |
| 12 Impression | 5 | 1 |
| **Total** | **106** | **12** |

## Rules a builder may turn into chips (all verified)

Only these carry a threshold or a grade worded by a listed source:

- B4 Costa-Paz BME types I-III (R2); B5 no T1 line excludes complete fracture (R2).
- B9 Hepple OLT stages I-V (R3, Table 5).
- L1 interstitial/partial/complete ligament tear (R1). This is the lateral ligament grading to use; L4 (Huuskonen grades 1-3) is not a chip (grade 2 wording is defective in the paper).
- L5, M2, M3 normal ligament thicknesses (R1).
- S1 Oae criteria 1 and 2 (R4); S3 tibiofibular recess > 12 mm abnormal, 5-7 mm normal (R1).
- P1 peroneal sheath fluid > 3 mm (R7); P6 intrasheath types A/B (R7); P7 Brandes-Smith zones (R7); P8/P9 low-lying PB (two definitions); P11 tubercle > 5 mm (R7); P12 prominent tubercle (R8).
- A6 distal rupture within 2 cm (R9); A7 Haglund's syndrome triad (R9).

Not available as chips: PTT tear types (MT2), plantar fascia MRI cut-off (PF6), Achilles
thickness or gap thresholds (A5, A14), spring ligament cut-off (M9), anterior tendons (N8),
interosseous membrane (S7), Huuskonen lateral ligament grades (L4).

Descriptive only (verified wording may describe a finding in the lesson or a report field, but no
rule chip): effusion levels (T4, one study's coding) and SPR grades I-IV (P5, a surgical
classification with no MRI criteria). Anterior tendons (N8) and interosseous membrane (S7) are
descriptive fields with no claims behind them.

## Omitted claims for the author

Everything below was left out of the ankle MRI study as a chip, a rule or a lesson claim
because no listed paper states it, or because the paper's wording does not support the rule.
Each item gives the claim, the paper, and what the paper says or why it was left out. Where a
descriptive field or help text remains, that is noted. Please say whether any should be added
from a source you hold.

### Rules the papers do not support

| Claim | Paper | What the paper says, or why it was left out |
|---|---|---|
| Normal-thickness chips for ATFL (2-3 mm), CFL (2 mm), tibionavicular (1-2 mm), tibiospring (2 mm, 1-4), posterior tibiotalar (6-11 mm), spring superomedial (3 mm, 2-5) and inferoplantar (4 mm, 2-6) | R1 (L5, M2, M3) | R1 states these as normal dimensions, not as abnormal thresholds. A chip saying "within range" or "outside range" would turn a description into a diagnostic rule. They are kept as field help text. The CFL value is a single figure (2 mm), not a range. |
| Normal 5-7 mm tibiofibular recess chip, and any call for 7-12 mm | R1 (S3) | R1 gives 5-7 mm as normal and more than 12 mm as definitely abnormal. It says nothing about 7-12 mm, so there is no chip below 5 mm or between 7 and 12 mm. 5-7 mm stays in help text. |
| Warning when recess > 12 mm or peroneal sheath fluid > 3 mm is entered with normal ligaments or tendons | R1 (S3), R7 (P1) | Deliberately no contradiction warning. R1 says > 12 mm "suggests" acute injury and R7 says > 3 mm is "highly specific" for tenosynovitis, so both are probabilistic. A warning would be clinical inference, not an internal inconsistency. The report instead prints "Findings as above." rather than the normal impression when one of these chips fires. |
| Tibialis posterior tear types (Rosenberg types 1-3) | R6 (MT2) | The abstract names type 1, 2 and 3 ruptures but does not define them, and the full text is paywalled and could not be read. The tear-type field is generic (partial, longitudinal split, complete) with no chip. The lesson gives only the 95% sensitivity and 100% specificity. |
| FDL or FHL tear grading, or a PTT-to-FDL size ratio | none (MT9) | Not stated in any listed paper. |
| Plantar fascia MRI thickness cut-off (for example > 4 mm) | R13, R15 (PF6) | R13 gives "more than 4-5 mm" for lateral radiographs and "over 4 mm" for ultrasound, neither an MRI threshold. R15 gives group means only (7.40 mm against 3.22 mm sagittal, eight patients). The thickness field has help text saying no MRI cut-off exists in the cited papers. |
| Spring ligament thickness cut-off for abnormal | R5 (M9) | R5 mentions a thickened superomedial band of "maximum 9 mm" in one figure caption only. No threshold is stated. Spring ligament status is a normal or abnormal choice with descriptive findings (waviness, high signal, discontinuity), no chip. |
| Superior peroneal retinaculum grades I-IV as MRI chips | R7 (P5) | R7 quotes Eckert and Davis grades I-III and Oden grade IV as a surgical classification and gives no MRI criteria for each. Shown as descriptive options with no grade numbers in the report field and no chip (the lesson lists grades I-IV as descriptions). |
| Effusion levels (none, moderate, severe) as a graded chip | R8 (T4) | The three levels are one cohort's own coding, not a validated grade. Kept as a descriptive field with help text saying so. |
| Huuskonen lateral ligament grades 1-3 | R8 (L4) | Grade 2 is truncated in the paper ("grade 2 was assessed as a focal ligament fiber"), presumably focal fibre disruption. Grades 1 and 3 are readable but a three-grade chip cannot be built on a defective middle grade. Lateral ligament chips use Sawant's interstitial, partial and complete (L1) instead. |
| Deltoid ligament chips for the interstitial, partial and complete grading | R1 (L1) | Sawant's grading is worded for ankle ligaments generally, but the sources table lists the lateral ligaments as the use. The deltoid shares the option set and the report wording, with no chip. |
| Spring ligament or sinus tarsi "abnormality" definition | R14, R11 (SP6) | R14's abstract does not define sinus tarsi abnormality, and R11 does not state fat replacement or fibrosis as a sign. Both are normal or abnormal choices with descriptive findings only. |
| MRI morphology of a peroneus brevis split (C-shaped, boomerang, bisected) | none (P16) | No listed paper describes it. R8 defines its split group clinically and surgically, and says MRI alone is reportedly not yet sufficient for split tears, which the lesson states. |
| Achilles thickness threshold, partial-tear percentage grade, or a number for a "significant" gap | R9 (A5, A14) | R9 says significant diastasis "may be an indication for surgery" and gives no number. The lesson and the gap field's help text say so. The only Achilles number used is distal rupture within 2 cm (A6). |

### Structures with no source

| Item | What is there instead |
|---|---|
| Anterior tendons (tibialis anterior, extensor hallucis longus, extensor digitorum longus) (N8) | No listed paper discusses them. The lesson only names them, and the report has a normal or abnormal choice with free text. |
| Varicosities as a tarsal tunnel cause (SP7) | Rodríguez-Merchán 2021, not a listed paper. Left out of the lesson and report because no listed paper states it. |
| Interosseous membrane (S7) | R1 names it but gives no MRI findings or injury criteria. The lesson has one sentence, "Also look at the interosseous membrane.", and the report has a normal or abnormal choice with free text. |
| Sawant's protocol table (T5) | Table 1 is an image in the PMC record and could not be read. The technique section uses R2's protocol statement only. |
| A fixed impression template or management advice (I6) | No paper gives one. The impression format is the study's own structure. The management sentence from R1 (I2) appears in the lesson as attributed background only, never in the report. |

### Wording choices for the author to check

- The low-lying peroneus brevis has two definitions (Davda, R7; Huuskonen, R8). Both are kept
  as separate chips, and neither is called the standard. The prominent peroneal tubercle
  likewise keeps the > 5 mm height (R7) and Huuskonen's length-against-width definition
  (R8) apart.
- Hepple (R3 Table 5) is reproduced as written, but R3's own recommended classifications
  are Berndt and Harty (Loomer), Giannini, ICRS and Outerbridge. The lesson says so. Hepple's
  1999 paper is not in the reference list because its abstract does not list the stages.
- Several figures are second-hand (the paper quotes another study): 96.2% of lesions on the
  talar dome, the 91% and 55% Outerbridge figures, and the 42% asymptomatic soccer players
  (R3); the 6.6-21.7% quartus prevalence and the 5 mm tubercle (R7); and the BME 3-month and
  6-week resolution times (R2). The lesson words them as quoted.
- Small paraphrases flagged in review: the contrast 3D-FSPGR is "reported to be superior"
  (R1 says "superior and accurate"); the Rosenberg 95% and 100% are given "for tibialis
  posterior rupture" (the abstract gives them for the normal and type 1-3 classification
  against surgery).
- Costa-Paz types (R2) carry the source's own frequency words: type I and II "usually", type
  III "often".
