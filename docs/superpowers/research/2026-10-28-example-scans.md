# Example scans across the site: sources and licences

Started 2026-10-28. The author asked for real images of pathology across the site, page by page in
the order of the survey: paediatric elbow, Bosniak and renal mass, LI-RADS, O-RADS and adnexal MRI,
TI-RADS, Schatzker, AAST, Lung-RADS and Fleischner, PI-RADS, then the pelvis and foot fractures.

How each image is chosen and made:

- Open access, licensed CC BY with a stated version. The version comes from the article's licence
  statement (Europe PMC or PMC full-text XML), checked against Crossref. NC, ND and figures with no
  stated version are skipped, as are figures whose caption says they are reproduced from elsewhere.
- One panel per file, cropped and converted to single-channel greyscale, under 40 KB, in
  `public/scans/<page>/`. Figures come from the Europe PMC supplementary-files API.
- Coloured annotations that would vanish in greyscale are noted below; where it helped, the grey
  was taken from the red channel, which leaves grey pixels unchanged and keeps red marks visible.
- The caption follows the source figure's caption; the alt text describes the cropped panel.

## Paediatric elbow (`src/data/scans/pediatricElbow.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| ossificationCentres | Schmid A et al. Eur Radiol 2022;32:5045-5052 (PMC9279276) | Fig. 1a | "Creative Commons Attribution 4.0 International License" / by/4.0 | normal 10-year-old, centres lettered |
| fatPads | Lahfafa A, Dermesropian F. J Belg Soc Radiol 2020;104:53 (PMC7500228) | Fig. 1 (lateral) | "Creative Commons Attribution 4.0 International License (CC-BY 4.0)" / by/4.0 | figure has no caption in the XML; caption quotes the case text ("positive fat pad sign due to joint effusion (arrows)") |
| anteriorHumeralLine | Duffy S et al. Eur J Orthop Surg Traumatol 2021;31:871-881 (PMC8233294) | Fig. 2 | CC BY 4.0 / by/4.0 | grey from the red channel so the yellow dotted line stays visible |
| monteggia | Choi MH et al. Medicina 2025;61:1457 (PMC12388813) | Fig. 1A (lateral) | CC BY (by/4.0) / by/4.0 | small (150 px) in the source |
| supracondylarType1-3 | Booker M et al. Curr Rev Musculoskelet Med 2025;18:48-53 (PMC11775363) | Figs. 1A, 2B, 3A | CC BY 4.0 / by/4.0 | lateral views |
| lateralCondyle | Hill CE, Cooke S. Open Orthop J 2017;11:1380-1393 (PMC5721346) | Fig. 8 | "CC-BY 4.0" / by/4.0 | Jakob type 3 |
| medialEpicondyleEntrapped | Lahfafa 2020 | Fig. 1 (AP) | as above | caption from the case text |
| radialNeck | Hill and Cooke 2017 | Fig. 11 (lateral) | as above | Judet type IV |
| dislocation | Alanezi M et al. J Surg Case Rep 2026;rjag022 (PMC12840581) | Fig. 1b | CC BY (by/4.0) / by/4.0 | posteromedial, with a lateral condyle fragment |

Not used: Wintges 2024 Fig. 2 (radiocapitellar lines told apart only by colour, and inverted);
Topalis 2021 (Cureus, no licence version in the article or Crossref); Li and Zhang 2025
("reproduced with permission from Elsevier").

## Renal mass study and Bosniak page (`src/data/scans/renalMass.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| bosniak1 | Ćulap S et al. Diagnostics 2025;15:1326 (PMC12154464) | Fig. 2B | CC BY (by/4.0) / by/4.0 | the paper's case later turned malignant; the caption says so |
| bosniak2 | Dev R et al. Cureus 2024;16:e59956 (PMC11161908) | Fig. 2C | "CC-BY 4.0" / none | |
| bosniak2f | Dev 2024 | Fig. 3C | as above | |
| bosniak4 | Xu Z et al. Front Oncol 2026;16:1755717 (PMC13318590) | Fig. 2B | CC BY, license_ref by/4.0 / by/4.0 | coronal, nodule arrowed |
| angiomyolipoma | Ahmed A et al. Cureus 2024;16:e55410 (PMC10985555) | Fig. 1B | "CC-BY 4.0" / none | |
| clearCell | Bellin M et al. Cancers 2024;16:1926 (PMC11120239) | Fig. 5A | CC BY (by/4.0) / by/4.0 | T2-weighted MRI |
| papillary | Comune R et al. Diagnostics 2025;15:906 (PMC11988733) | Fig. 5b | CC BY (by/4.0) / by/4.0 | arterial phase, ROI labels are the authors' |
| oncocytoma | Qu J et al. BMC Med Imaging 2023;23:16 (PMC9881251) | Fig. 1a | "Creative Commons Attribution 4.0 International License" / by/4.0 | stellate central area |

No Bosniak III example yet. Dev 2024 Fig. 5 is captioned "Bosniak III" but describes an enhancing
nodule, which v2019 may call IV; Sebastià 2026 Fig. 5 shows thick septa but its authors class it IV;
Bertolotto 2026 Fig. 7b is probably CEUS. Dev 2024 Fig. 1 (Bosniak I) shows polycystic kidneys and
was not used; Dev Fig. 4 calls an angiomyolipoma "Bosniak III" and was not used.

## LI-RADS study and calculator (`src/data/scans/liverLirads.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| aphe, washout, capsule | Prajapati T et al. Cureus 2026;18:e113706 (PMC13526276) | Fig. 5A, 5B, 5D | "CC-BY 4.0" / none | one LR-5 observation in three phases; the authors' coloured arrows are grey |
| tumourInVein | Prajapati 2026 | Fig. 3A | as above | |
| lrM | Schima W, Heiken J. Cancer Imaging 2018;18:14 (PMC5978995) | Fig. 13a | "Creative Commons Attribution 4.0 International License" / by/4.0 | small in the source (188 px) |
| lr1Cyst | Schima 2018 | Fig. 4b | as above | |
| lr2Haemangioma | Schima 2018 | Fig. 5a | as above | |

No CC BY flash-filling haemangioma was found.

## O-RADS calculator and adnexal mass MRI study (`src/data/scans/orads.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| haemorrhagicCyst, endometriomaUs, dermoidUs, multilocularCyst, papillaryProjection | Timmerman D et al. (IOTA) Ultrasound Obstet Gynecol 2026;67:702-724 (PMC13136064) | Figs. 11n, 3b, 13e, 18b, 4b | "open access article under the terms of the http://creativecommons.org/licenses/by/4.0/ License" / by/4.0 | greyscale panels of schematic/greyscale/Doppler triplets; small (about 230 px) in the source |
| endometriomaMri, dermoidMriT1, dermoidMriFatSat | Nikolić O et al. (ESUR) Insights Imaging 2026;17:51 (PMC12909720) | Figs. 3F, 3L, 3M | CC BY 4.0 / by/4.0 | burned-in scan date and time cropped off L and M |
| fibroma | Nougaret S et al. Insights Imaging 2024;15:45 (PMC10866854) | Fig. 7a | CC BY 4.0 / by/4.0 | |

No O-RADS MRI score 5 example yet: Nougaret Fig. 16 has garbled panel letters and curves told apart
only by colour. Sayasneh 2015 (Int J Oncol) looks CC BY 3.0 in its licence URL but its text says
Attribution-NonCommercial, so it was not used. Note for the helper script: IOTA captions embed tiny
inline graphics, so a figure's own image is its `<graphic>`, not the first `xlink:href`.

## TI-RADS calculator and thyroid ultrasound study (`src/data/scans/tirads.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| cystic, mixed, hyperechoic, hypoechoic, veryHypoechoic, tallerThanWide, lobulated, irregular, extrathyroidal, punctateFoci, macrocalcification, peripheralCalcification, tr5 | Pires AT et al. The 2017 ACR TI-RADS: pictorial essay. Radiol Bras 2022;55:47-53 (PMC8864691) | Figs. 1, 2, 4, 6, 8, 9, 10, 11, 12, 14, 15, 16, 21 | "Creative Commons Attribution License" (no version), license_ref by/4.0 / by/4.0 | whole images, scanner calipers and settings only; 340 px wide to keep the set near 230 KB |
| cometTail | Cannella R et al. RADS ALPHABET. Insights Imaging 2026;17:9 (PMC12796044) | Fig. 11A | CC BY 4.0 / by/4.0 | |

No spongiform example with ACR scoring: Sereke 2021 and de Macedo 2018 label theirs "TI-RADS 2" under
other systems.

## Schatzker page (`src/data/scans/schatzker.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| type1 | Ristow I et al. Eur Radiol 2025;35:5418-5426 (PMC12350421) | Fig. 2E (CT column) | CC BY 4.0 / by/4.0 | nondisplaced; small CT tile |
| type2 | Deng X et al. J Orthop Surg Res 2021;16:117 (PMC7868009) | Fig. 2c | CC BY 4.0 / by/4.0 | trimmed to leave out a burned-in protocol label |
| type5 | Biz C et al. Diagnostics 2025;15:1304 (PMC12155256) | Fig. 3E | CC BY (by/4.0) / by/4.0 | |
| type6 | Deng X et al. J Orthop Surg Res 2021;16:502 (PMC8365966) | Fig. 2 (AP) | CC BY 4.0 / by/4.0 | cropped to the knee |
| type6Ct | Ristow 2025 | Fig. 3E (CT column) | as above | |

No types III or IV yet. Ristow Fig. 2D is labelled type III but is nondisplaced, which would mislead
for a type defined by depression; Pizzoli 2023 Fig. 5 and Liu 2023 Fig. 3 show radiographs and 3D
renders that do not show the type clearly; PlaTiF (Sci Data 2026) Fig. 4 has one radiograph per type
but each is about 100 px wide.

## AAST organ injury page (`src/data/scans/aast.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| liverGrade2, liverGrade5, spleenGrade3, kidneyInfarct, kidneyDevascularised | Mohammad SA et al. Pediatr Radiol 2025;55:2018-2036 (PMC12513975) | Figs. 4a, 4d, 9a, 13a, 14 | CC BY 4.0 / by/4.0 | children; ages are in the captions |
| spleenPseudoaneurysm | Crone A et al. Emerg Radiol 2025;33:305-310 (PMC13079506) | Fig. 2A | CC BY 4.0 / by/4.0 | adult |
| kidneyUrineLeak | Berday Y et al. Cureus 2025;17:e96501 (PMC12696761) | Fig. 3B | "CC-BY 4.0" / none | adult, delayed phase |

Most adult CC BY trauma figures found were case reports with coloured arrows; the paediatric review
gave the clearest graded examples.

## Lung-RADS, Fleischner and the lung screening study (`src/data/scans/lungNodules.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| solid, perifissural, cysticNodule | Cannella R et al. Insights Imaging 2026;17:9 (PMC12796044) | Figs. 6C, 6B, 6D | CC BY 4.0 / by/4.0 | low-dose CT, Lung-RADS categories in the caption |
| partSolid, groundGlass, groundGlassLater | Revel MP et al. ESR Essentials. Eur Radiol 2025;36:2064-2073 (PMC12963080) | Figs. 3A, 4C, 4D | CC BY 4.0 / by/4.0 | |
| popcorn, spiculated | Baratella E et al. Tomography 2025;11:28 (PMC11946818) | Figs. 2a, 9c | CC BY (by/4.0) / by/4.0 | Figs. 8 and 10 of this paper are "courtesy of" others and were not used |
| endobronchial | Teishikata T et al. Gen Thorac Cardiovasc Surg Cases 2026;5:44 (PMC13637399) | Fig. 1A | CC BY 4.0 / by/4.0 | |

Not used: Revel Fig. 2A (burned-in volumetry readouts); Revel Fig. 3C ("multilocular cyst") did not
read clearly as a cyst once cropped.

## PI-RADS calculator and prostate MRI study (`src/data/scans/pirads.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| pzT2, pzAdc, pzDce | Cannella R et al. Insights Imaging 2026;17:9 (PMC12796044) | Figs. 10A, 10B, 10D | CC BY 4.0 / by/4.0 | one PI-RADS 5 PZ lesion on three sequences |
| tzErasedCharcoal, bphNodule | Żurowska A et al. Cancers 2023;15:3682 (PMC10378330) | Figs. 10a, 8A (panel a) | CC BY (by/4.0) / by/4.0 | panel labels below the images cropped off |
| extraprostaticExtension | Agrotis G et al. Insights Imaging 2026;17:182 (PMC13350576) | Fig. 3A | CC BY 4.0 / by/4.0 | no arrow in the source; the caption describes the finding |

No seminal vesicle invasion yet: Agrotis Fig. 5 has localiser lines across the T2 panel and did not
show the finding clearly when cropped. Sonkaya 2026 Fig. 2 is covered in ROI overlays.

## Pelvic and foot fracture pages (`youngBurgess.ts`, `letournel.ts`, `sanders.ts`, `hawkins.ts`, `lisfranc.ts`)

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| youngBurgess.apc | Algaith A et al. J Clin Med 2026;15:1729 (PMC12986503) | Fig. 2A | CC BY (by/4.0) / by/4.0 | |
| youngBurgess.lc | Leite-Moreira JP et al. Cureus 2026;18:e111097 (PMC13380300) | Fig. 1 | "CC-BY 4.0" / none | LC III; coloured arrows now grey |
| letournel.bothColumnSpur | Zhang R et al. Sci Rep 2017;7:8044 (PMC5556078) | Fig. 2B | CC BY 4.0 / by/4.0 | |
| letournel.posteriorWall | Singh NS et al. Cureus 2026;18:e114457 (PMC13570461) | Fig. 9a | "CC-BY 4.0" / none | 3D CT |
| sanders.type2-4 | Luo G et al. Int Orthop 2026;50:1787-1797 (PMC13407454) | Fig. 1 A2, B2, C2 | CC BY 4.0 / by/4.0 | figure label kept as 1A/1B/1C, the sub-panel named in the caption |
| hawkins.type2b, type3 | Meunier A et al. Acta Orthop 2021;92:455-460 (PMC8381918) | Fig. 2A, 2B | CC BY (by/4.0) / by/4.0 | one of two 3D views each |
| lisfranc.fleck | Chukwuma E et al. Cureus 2026;18:e101889 (PMC12917927) | Fig. 2A | "CC-BY 4.0" / none | |
| lisfranc.diastasis | Crone AM et al. Skeletal Radiol 2026;55:1487-1511 (PMC13198512) | Fig. 19 | CC BY 4.0 / by/4.0 | weightbearing |

Not found or not used: a clean vertical shear pelvis (only a composite with surgical photographs);
Hawkins types I and II; Biz 2019's Hawkins IV radiograph is about 170 px; the PLOS One T-shaped
acetabulum panels are too small to crop.

## Hearing loss CT page and temporal bone CT study (`hearingLoss.ts`, `temporalBone.ts`)

The hearing loss page's twelve scans moved here from `src/data/hearingLossImages.ts` on 2026-10-28;
their sources and licence evidence are in `2026-10-28-hearing-loss-ct-sources.md`. The temporal bone
CT study shows six of them (otosclerosis, SCD, EVA, fracture, pneumolabyrinth) and these:

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| atticCholesteatoma, cholesteatomaDwi, canalWallDown | Touska P, Connor SEJ. ESR Essentials: imaging of middle ear cholesteatoma. Eur Radiol 2025;35:2053-2064 (PMC11913933) | Figs. 1D, 4B, 2B | CC BY 4.0 / by/4.0 | |
| lateralCanalFistula | Gulati M et al. Insights Imaging 2019;10:92 (PMC6775179) | Fig. 11 | CC BY 4.0 / by/4.0 | |
| coalescentMastoiditis | Saat R et al. Clin Neuroradiol 2021;31:589-597 (PMC8463380) | Fig. 3d | CC BY 4.0 / by/4.0 | |
| incompletePartition2 | Chow TH et al. Neuroradiology 2026;68:2087-2102 (PMC13407937) | Fig. 12 | CC BY 4.0 / by/4.0 | |
| jugularBulb, aberrantCarotid | Ostrander BT et al. Front Radiol 2026;6:1784554 (PMC13230221) | Figs. 9A, 9B | CC BY (by/4.0) / by/4.0 | text labels, no arrows |
| exostoses, cholesterolGranuloma | Kloth C et al. Tomography 2023;9:2190-2210 (PMC10747582) | Figs. 5A, 17A | CC BY (by/4.0) / by/4.0 | |

Not used: Zhong 2023 glomus tympanicum (the CT panel is a whole-skull slice with the small mass
unmarked); Arias Rodríguez 2025 malignant otitis externa (small panel, red arrow lost in grey).

## Spine trauma, AO Spine, Neer, Lichtman and pancreatic cysts (2026-10-28)

| List | Source (PMCID) | Figures | Licence: article / Crossref |
|---|---|---|---|
| spineTrauma.a1, a4 | Zhang J et al. Front Endocrinol 2023;14:1132725 (PMC10083489) | 1A, 1D | CC BY (no version) / by/4.0 |
| spineTrauma.chance | Galluzzo A et al. BJR Case Rep 2026;12:uaag015 (PMC13117600) | 1a | by/4.0 / by/4.0 |
| spineTrauma.dishExtension | Yoshihara H et al. Patient Saf Surg 2011;5:25 (PMC3212916) | 1 | by/2.0 in the licence link / none |
| spineTrauma.translation | Song A et al. Front Surg 2026;12:1704439 (PMC12979509) | 2B | CC BY (no version) / by/4.0 |
| spineTrauma.jefferson, hangman, odontoid, jumpedFacet | Utz M et al. Insights Imaging 2014;5:67-75 (PMC3948906) | 6a, 7b, 9b, 14a | CC BY (no version) / by/2.0 |
| neer.twoPart | Lian Y et al. BMC Musculoskelet Disord 2022;23:957 (PMC9636662) | 1A | 4.0 / 4.0 |
| neer.threePart | Chen C et al. J Orthop Surg Res 2020;15:364 (PMC7456013) | 1b | 4.0 / 4.0 |
| neer.fourPartValgus | Zhou H, Cheng L. J Clin Med 2025;14:6660 (PMC12470890) | 2A | 4.0 / 4.0 |
| neer.greaterTuberosity | Nóbrega Catelas D et al. Eur J Orthop Surg Traumatol 2024;34:2541-2547 (PMC11291518) | 2A | 4.0 / 4.0 |
| lichtman.stage1 | Singh A, Reese R. Cureus 2024 (PMC11142385) | 1 | "CC-BY 4.0" / none |
| lichtman.stage2, stage4 | Afshar A et al. Trauma Case Rep 2025;56:101138 (PMC11874712) | 1, 2 (AP) | by/4.0 / by/4.0 |
| lichtman.stage3a, stage3b | Chojnowski K et al. J Clin Med 2022;11:664 (PMC8836398) | 2a, 3a | 4.0 / 4.0 |
| pancreaticCysts (four) | Danti G et al. J Clin Med 2026;15:585 (PMC12841895) | 3, 5b, 8a, 1b | 4.0 / 4.0 |
| pancreaticCysts.spn | Khristenko E et al. Eur J Radiol Open 2024;12:100576 (PMC11176946) | 2A | by/4.0 / by/4.0 |

Not used: Dhaliwal 2023 burst (too dark); Chang 2019 atlanto-occipital dissociation (burned-in
text); Park 2025 main-duct IPMN (panels too small); Danti Fig. 8b mural nodule (unreadable when
cropped). No Kienböck ring sign or A2 split fracture found.

## MSK MRI studies (2026-10-28)

Ankle, foot, diabetic foot, knee, shoulder, elbow and wrist MRI: 60 images, one or two under each
Learn section where a good open figure exists. Same rules as above. Licence versions were checked in
the article XML and on Crossref; the three Cureus articles have no Crossref licence and state the
version in the article. For Ahmad 2022, Mercouris 2023, Kothari 2023, Dong 2012, Metikala 2022 and
Tischler 2014 the version is only in the licence link, as for the IOTA paper. Three figures come from
Springer's full-size copy (static-content.springer.com) because the PMC copy was too small or
missing; the figure and caption are the same. Where the authors' arrows were coloured, the grey was
taken from the red channel (or, for one blue arrow, the blue channel), which leaves grey pixels
unchanged. Two captions drop a sentence of the source's that would confuse here (the talar lesion's
"early inactive osteopenia"; the tibialis posterior's "MRI showed tendinopathy").

### Ankle MRI (`src/data/scans/ankleMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| talarOsteochondralLesion | bones | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97 (PMC7431516) | Fig. 18A | CC BY 4.0 | grey from the red channel |
| atflTear | lateral-ligaments | González-Gutiérrez O, Roldan-Valadez E, Molina-Gonzalez M, Garcia-de-Bustamante Martin-Romo, López-Montoya LO, Gonzalez-Trejo AP, et al. Imaging anatomy of the ankle in normal and pathological states: a clinically focused pictorial review. Cureus. 2025;17(10):e93882 (PMC12585092) | Fig. 9C | CC BY 4.0 |  |
| aitflTear | syndesmosis | González-Gutiérrez O, Roldan-Valadez E, Molina-Gonzalez M, Garcia-de-Bustamante Martin-Romo, López-Montoya LO, Gonzalez-Trejo AP, et al. Imaging anatomy of the ankle in normal and pathological states: a clinically focused pictorial review. Cureus. 2025;17(10):e93882 (PMC12585092) | Fig. 9A | CC BY 4.0 |  |
| springLigamentTear | medial-ligaments | Andres L, Donners R, Harder D, Burssens A, Nüesch C, Krähenbühl N. Association between weightbearing CT and MRI findings in progressive collapsing foot deformity. Foot Ankle Int. 2024;45(5):526-534 (PMC11083736) | Fig. 3B | CC BY 4.0 |  |
| tibialisPosteriorTear | medial-tendons | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97 (PMC7431516) | Fig. 8B | CC BY 4.0 | grey from the red channel |
| peronealSplitTear | lateral-tendons | Bokwa-Dąbrowska K, Mocanu D, Romanus I, Zych R, Huuskonen M, Szaro P. Peroneus brevis split tear – a challenging diagnosis: a pictorial review of magnetic resonance and ultrasound imaging – Part 2: imaging with magnetic resonance and ultrasound. Eur J Radiol Open. 2025;14:100627 (PMC11733185) | Fig. 9b | CC BY 4.0 | grey from the red channel |
| achillesRupture | posterior | Ortiz A, Diaz C. Nonoperative management of an acute complete Achilles tendon rupture with mesenchymal stem cells and extracellular vesicles: a case report. Cureus. 2026;18(10):e118122 (PMC13679634) | Fig. 1A | CC BY 4.0 | grey from the red channel |
| tarsalTunnelGanglion | spaces | Dong Q, Jacobson JA, Jamadar DA, Gandikota G, Brandon C, Morag Y, et al. Entrapment neuropathies in the upper and lower limbs: anatomy and MRI features. Radiol Res Pract. 2012;2012:230679 (PMC3483739) | Fig. 20b | CC BY 3.0 |  |
| plantarFasciitis | plantar | Kothari EA, Padgett AM, Young SM, Ray J, Shah A, Conklin MJ. A review of pediatric heel pain. Cureus. 2023;15(1):e34228 (PMC9960861) | Fig. 5 | CC BY 3.0 | grey from the red channel |

### Foot MRI (`src/data/scans/footMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| calcaneonavicularCoalition | hindfoot | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97 (PMC7431516) | Fig. 24B | CC BY 4.0 | grey from the red channel |
| navicularStressFracture | hindfoot | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97 (PMC7431516) | Fig. 14b | CC BY 4.0 | grey from the red channel |
| lisfrancRupture | lisfranc | Liu Y, Wan H, Lu W, Ding XL. Clinical efficacy analysis of elastic fixation for isolated ligamentous Lisfranc injuries. BMC Surg. 2025;26:38 (PMC12817689) | Fig. 1d | CC BY 4.0 | grey from the red channel; publisher's full-size figure |
| metatarsalStressFracture | metatarsals | Palka O, Guillin R, Lecigne R, Combes D. Radiological approach to metatarsalgia in current practice: an educational review. Insights Imaging. 2025;16:94 (PMC12041408) | Fig. 9B | CC BY 4.0 | grey from the red channel |
| freibergInfraction | metatarsals | Palka O, Guillin R, Lecigne R, Combes D. Radiological approach to metatarsalgia in current practice: an educational review. Insights Imaging. 2025;16:94 (PMC12041408) | Fig. 10A | CC BY 4.0 | grey from the red channel |
| sesamoiditis | hallux | Palka O, Guillin R, Lecigne R, Combes D. Radiological approach to metatarsalgia in current practice: an educational review. Insights Imaging. 2025;16:94 (PMC12041408) | Fig. 3C | CC BY 4.0 | grey from the red channel |
| plantarPlateTear | lesser-mtp | Palka O, Guillin R, Lecigne R, Combes D. Radiological approach to metatarsalgia in current practice: an educational review. Insights Imaging. 2025;16:94 (PMC12041408) | Fig. 8B | CC BY 4.0 | grey from the red channel |
| mortonNeuroma | interspaces | Dong Q, Jacobson JA, Jamadar DA, Gandikota G, Brandon C, Morag Y, et al. Entrapment neuropathies in the upper and lower limbs: anatomy and MRI features. Radiol Res Pract. 2012;2012:230679 (PMC3483739) | Fig. 22b | CC BY 3.0 |  |
| osPeroneumPeroneusLongusSplit | tendons | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97 (PMC7431516) | Fig. 22B | CC BY 4.0 | grey from the red channel |

### Diabetic foot MRI (`src/data/scans/diabeticFootMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| sinusTract | soft-tissue | Rosskopf AB, Loupatatzis C, Pfirrmann CWA, Böni T, Berli MC. The Charcot foot: a pictorial review. Insights Imaging. 2019;10:77 (PMC6682845) | Fig. 20b | CC BY 4.0 | grey from the red channel |
| abscess | soft-tissue | Lauri C, Leone A, Cavallini M, Signore A, Giurato L, Uccioli L. Diabetic foot infections: the diagnostic challenges. J Clin Med. 2020;9(6):1779 (PMC7355769) | Fig. 3 | CC BY 4.0 |  |
| calcanealOsteomyelitis | bone | Alaia EF, Chhabra A, Simpfendorfer CS, Cohen M, Mintz DN, Vossen JA, Zoga AC, Fritz J, Spritzer CE, Armstrong DG, Morrison WB. MRI nomenclature for musculoskeletal infection. Skeletal Radiol. 2021;50(12):2319-2347 (PMC8789645) | Fig. 15A | CC BY 4.0 |  |
| hazyReticularT1 | bone | Tiegs-Heiden CA, Anderson TC, Collins MS, Johnson MP, Osmon DR, Wenger DE. Outcomes in patients with clinically suspected pedal osteomyelitis based on bone marrow signal pattern on MRI. J Bone Jt Infect. 2023;8(2):99-107 (PMC10134750) | Fig. 3A | CC BY 4.0 |  |
| septicArthritis | joints | Alaia EF, Chhabra A, Simpfendorfer CS, Cohen M, Mintz DN, Vossen JA, Zoga AC, Fritz J, Spritzer CE, Armstrong DG, Morrison WB. MRI nomenclature for musculoskeletal infection. Skeletal Radiol. 2021;50(12):2319-2347 (PMC8789645) | Fig. 9A | CC BY 4.0 |  |
| ghostSignT1 | charcot | Rosskopf AB, Loupatatzis C, Pfirrmann CWA, Böni T, Berli MC. The Charcot foot: a pictorial review. Insights Imaging. 2019;10:77 (PMC6682845) | Fig. 21b | CC BY 4.0 |  |
| ghostSignContrast | charcot | Rosskopf AB, Loupatatzis C, Pfirrmann CWA, Böni T, Berli MC. The Charcot foot: a pictorial review. Insights Imaging. 2019;10:77 (PMC6682845) | Fig. 21c | CC BY 4.0 |  |

### Knee MRI (`src/data/scans/kneeMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| pivotShiftBruise | bones | Ubl ST, Vieider RP, Seilern und Aspang J, Siemoneit SF, Pfeiffer TR, Gaebler C, Platzgummer H. Bone bruise patterns after noncontact anterior cruciate ligament tears differ between alpine skiers and pivoting sports athletes. Am J Sports Med. 2025;53(7):1606-1613 (PMC12125494) | Fig. 3D | CC BY 4.0 |  |
| bucketHandleTear | medial-meniscus | Koutserimpas C, Matzaroglou C, Kaliarntas K, Billis E, Arkoudis NA, Triantafyllou G, Piagkou M, Gliatis J. Double posterior cruciate ligament sign. Reports (Basel). 2026;9(2):120 (PMC13108129) | Fig. 1A | CC BY 4.0 |  |
| meniscalExtrusion | medial-meniscus | Nguyen JC, Gorbachova T, Flores DV, Casagranda BU, Chalian M, Kani KK, Mills MK, Nwawka OK, Shea KG, Spindler KP, Stevens KJ, Weaver JS, Zoga AC, Boutin RD. Standardized MRI nomenclature for knee meniscal lesions: SSR consensus panel report. Skeletal Radiol. 2026;55(8):1711-1732 (PMC13424353) | Fig. 18 | CC BY 4.0 |  |
| discoidMeniscus | lateral-meniscus | Lefevre N, Naouri JF, Herman S, Gerometta A, Klouche S, Bohu Y. A current review of the meniscus imaging: proposition of a useful tool for its radiologic analysis. Radiol Res Pract. 2016;2016:8329296 (PMC4766355) | Fig. 16b | CC BY 4.0 |  |
| aclTear | acl | Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee-practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599 (PMC11399221) | Fig. 2A | CC BY 4.0 | grey from the red channel |
| mclTear | mcl | Cristiani R, van de Bunt F, Kvist J, Stålman A. High prevalence of associated injuries in anterior cruciate ligament tears: a detailed magnetic resonance imaging analysis of 254 patients. Skeletal Radiol. 2024;53(11):2417-2427 (PMC11410909) | Fig. 1a | CC BY 4.0 | grey from the red channel |
| patellarDislocation | extensor | Jibri Z, Jamieson P, Rakhra KS, Sampaio ML, Dervin G. Patellar maltracking: an update on the diagnosis and treatment strategies. Insights Imaging. 2019;10:65 (PMC6570735) | Fig. 7 | CC BY 4.0 |  |
| osteochondralDefect | cartilage | Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee-practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599 (PMC11399221) | Fig. 4A | CC BY 4.0 | grey from the red channel |
| bakerCyst | synovium | Vanhoenacker F, De Vos N, Van Dyck P. Common mistakes and pitfalls in magnetic resonance imaging of the knee. J Belg Soc Radiol. 2016;100(1):99 (PMC6100447) | Fig. 23A | CC BY 4.0 |  |

### Shoulder MRI (`src/data/scans/shoulderMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| hillSachsLesion | bones | Kadi R, Milants A, Shahabpour M. Shoulder anatomy and normal variants. J Belg Soc Radiol. 2017;101(Suppl 2):3 (PMC6251069) | Fig. 4b | CC BY 4.0 |  |
| supraspinatusFullTear | cuff | Yubran AP, Pesquera LC, Juan ELS, Saralegui FI, Canga AC, Camara AC, Valdivieso GM, Pisanti Lopez C. Rotator cuff tear patterns: MRI appearance and its surgical relevance. Insights Imaging. 2024;15:61 (PMC10899560) | Fig. 10b | CC BY 4.0 |  |
| goutallierGrade4 | cuff | Yubran AP, Pesquera LC, Juan ELS, Saralegui FI, Canga AC, Camara AC, Valdivieso GM, Pisanti Lopez C. Rotator cuff tear patterns: MRI appearance and its surgical relevance. Insights Imaging. 2024;15:61 (PMC10899560) | Fig. 23e | CC BY 4.0 |  |
| subscapularisTear | subscapularis | Ahmad ZY, Diaz LE, Roemer FW, Goud A, Guermazi A. Imaging review of subscapularis tendon and rotator interval pathology. Radiol Res Pract. 2022;2022:4009829 (PMC8767392) | Fig. 5a | CC BY 4.0 |  |
| bicepsDislocation | biceps | Ahmad ZY, Diaz LE, Roemer FW, Goud A, Guermazi A. Imaging review of subscapularis tendon and rotator interval pathology. Radiol Res Pract. 2022;2022:4009829 (PMC8767392) | Fig. 5b | CC BY 4.0 |  |
| bankartLesion | labrum | Pouliart N, Doering S, Shahabpour M. What can the radiologist do to help the surgeon manage shoulder instability? J Belg Soc Radiol. 2016;100(1):105 (PMC6100640) | Fig. 5 | CC BY 4.0 | grey from the red channel |
| slapTear | labrum | Mercouris P, Mercouris M. Superior labrum anterior to posterior lesions: Part 2 - Classification with arthroscopic correlation. SA J Radiol. 2023;27(1):2707 (PMC10879901) | Fig. 4c | CC BY 4.0 |  |
| haglLesion | capsule | Pouliart N, Doering S, Shahabpour M. What can the radiologist do to help the surgeon manage shoulder instability? J Belg Soc Radiol. 2016;100(1):105 (PMC6100640) | Fig. 11b | CC BY 4.0 | grey from the blue channel (the arrow is blue) |
| paralabralCystDenervation | nerves | Mangi MD, Zadow S, Lim W. Nerve entrapment syndromes of the upper limb: a pictorial review. Insights Imaging. 2022;13:166 (PMC9556688) | Fig. 4b | CC BY 4.0 |  |
| sublabralRecess | variants | Kadi R, Milants A, Shahabpour M. Shoulder anatomy and normal variants. J Belg Soc Radiol. 2017;101(Suppl 2):3 (PMC6251069) | Fig. 13a | CC BY 4.0 |  |

### Elbow MRI (`src/data/scans/elbowMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| capitellarOcd | bones | Matković A, Ferenc T, Dimnjaković D, Jurjević N, Vidjak V, Matković BR. Diagnostics (Basel). 2024;14(9):916 (PMC11083537) | Fig. 1b | CC BY 4.0 |  |
| uclTear | ucl | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. Insights Imaging. 2019;10:43 (PMC6447645) | Fig. 14a | CC BY 4.0 |  |
| luclTear | lateral-ligaments | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. Insights Imaging. 2019;10:43 (PMC6447645) | Fig. 24 | CC BY 4.0 |  |
| flexorTendinosis | flexor | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. Insights Imaging. 2019;10:43 (PMC6447645) | Fig. 10b | CC BY 4.0 |  |
| commonExtensorTear | extensor | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. Insights Imaging. 2019;10:43 (PMC6447645) | Fig. 9c | CC BY 4.0 |  |
| bicepsPartialTear | biceps | Nayyar S, Quirno M, Hasan S, Rybak L, Meislin RJ. Case Rep Radiol. 2011;2011:515912 (PMC3350064) | Fig. 1 | CC BY 3.0 |  |
| bicepsRetraction | biceps | Metikala S, Portnoff B, Herickhoff P. Cureus. 2022;14(5):e25172 (PMC9206879) | Fig. 2a | CC BY 3.0 |  |
| ulnarNeuritis | nerves | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. Insights Imaging. 2019;10:43 (PMC6447645) | Fig. 11a | CC BY 4.0 |  |

### Wrist MRI (`src/data/scans/wristMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| occultScaphoidFracture | bones | Dietrich TJ, Teh J, Schmitt R, et al. Eur Radiol. 2026;36(10):7584-7598 (PMC13710594) | Fig. 1c | CC BY 4.0 | publisher's full-size figure |
| kienbock | bones | Thomas M, Richa P, Ibrahim J, Habib F, Savarese R. Cureus. 2025;17(4):e82322 (PMC12081065) | Fig. 2a | CC BY 4.0 | grey from the red channel |
| scapholunateTear | scapholunate | Tischler BT, Diaz LE, Murakami AM, Roemer FW, Goud AR, Arndt WF, Guermazi A. Insights Imaging. 2014;5(4):407-417 (PMC4141341) | Fig. 2c | CC BY 4.0 |  |
| tfccTear | tfcc | Nevalainen MT, Zoga AC, Rivlin M, Morrison WB, Roedl JB. Eur Radiol. 2023;33(5):3172-3177 (PMC10121535) | Fig. 1a | CC BY 4.0 |  |
| ecuSubluxation | extensors | Nevalainen MT, Zoga AC, Rivlin M, Morrison WB, Roedl JB. Eur Radiol. 2023;33(5):3172-3177 (PMC10121535) | Fig. 1b | CC BY 4.0 |  |
| carpalTunnelSyndrome | flexors | Dong Q, Jacobson JA, Jamadar DA, Gandikota G, Brandon C, Morag Y, Fessell DP, Kim SM. Radiol Res Pract. 2012;2012:230679 (PMC3483739) | Fig. 13b | CC BY 3.0 |  |
| guyonGanglion | guyon | Saran S, Reddy PS, Shirodkar K, Shah AB, Agarwal A, Shah A, Iyengar KP, Botchu R. Diagnostics (Basel). 2025;15(5):592 (PMC11899079) | Fig. 7a | CC BY 4.0 | grey from the red channel |
| dorsalGanglion | ganglia | Ferreira Branco D, Botti P, Bouvet C, Abs B, Buzzi M, Beaulieu JY, Poletti PA, Bouredoucen H, Boudabbous S. Eur Radiol. 2024;34(12):7856-7863 (PMC11557617) | Fig. 2b | CC BY 4.0 | publisher's full-size figure |

No image yet (many filled on 2026-10-29; see "Filling the gaps" below):

- Ankle: technique, anterior and impression (spares: Huuskonen 2023 Fig. 5d effusion, Szaro 2020
  Fig. 19 anterior impingement). Sawant, Davda, Kimura and Walther, cited in the study, are CC BY-NC
  or BY-NC-SA.
- Foot: accessory navicular with oedema, turf toe; technique, fascia (the ankle study has plantar
  fasciitis), variants, impression. Lim 2022 (plantar Lisfranc sprain) is too small in PMC and its
  publisher copy could not be fetched. Palka 2025 Fig. 7 calls a Morton neuroma bright on T2, against
  the study's low-to-intermediate signal; Dong 2012 Fig. 22 was used instead.
- Diabetic foot: technique, impression; an active Charcot (stage 0) panel, Rosskopf 2019 Fig. 14b,
  is a spare. Rosskopf Fig. 21's legend calls panel b STIR; its text and the image show T1.
- Knee: lipohemarthrosis, PCL, posterolateral corner, ACL graft and cyclops lesion, impression
  (spares: Parkar and Adriaensen 2024 Figs. 2C Segond, 2D/2E posterolateral corner; Vanhoenacker
  2016 Fig. 29 parameniscal cyst). Ubl 2025 says "lateral tibial plateau" where the study's bruise
  table says posterolateral; the caption keeps the source's words. Nguyen 2026 (meniscal extrusion)
  is the SSR consensus, not the study's Nguyen RadioGraphics 2014 reference.
- Shoulder: technique, subacromial and AC joint, GLAD, repaired cuff (Sugaya), impression; the Buford
  complex, sublabral foramen and os acromiale. Stecco 2008 is CC BY 2.0 at Crossref but the article
  says only "© Springer-Verlag 2008", so it was not used.
- Elbow: the UCL T-sign (every figure found was NC, NC-SA, NC-ND or unlicensed), triceps and
  brachialis, bursae, variants (Acosta Batlle 2019 Fig. 6, an anconeus epitrochlearis, is a spare).
  Two rejected captions bear on the capitellar OCD stability sentence (E2-6): PMC10814069 Fig. 4C and
  Acosta Batlle Fig. 32 use interface fluid and cartilage disruption as stability signs.
- Wrist: lunotriquetral, perilunate and extrinsic ligaments, de Quervain and intersection syndrome,
  variants (a bifid median nerve, PMC9947498 Fig. 3B, is too small).

## Mason, Mayfield, Herbert and Palmer (2026-10-28)

Each page gets an "Examples" card above its references. The source names the type itself, in
its caption, its text or the authors' label inside the panel; where only the injury is named (e.g.
"perilunate dislocation" for Mayfield III), the page's own definition makes the same mapping. Same
licence and crop rules as above. Several figures are the publisher's full-size copy
(static-content.springer.com or MDPI) because the PMC copy was too small; the figure is the same.

### Mason (`src/data/scans/mason.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | How the source names it |
|---|---|---|---|---|---|
| type1 | I | Nietschke R, Burkhart KJ, Hollinger B, Dehlinger FI, Zimmerer A, Schneider MM. Reasons for surgical revision after conservatively treated radial head fractures—retrospective study of 70 patients. Obere Extremität. 2018;13(2):112-120 (PMC5976694) | Fig. 1a | CC BY 4.0 | Fig. 1 caption: "Radiographs (two planes) of a radial head fracture (Mason I)". Text: "The classification according to Mason [31], later modified according to Johnston, is the most commonly used classification system ... |
| type2 | II | Müller M, Mann V, Zapf J, Kirchhoff K, Zyskowski M, Biberthaler P, Kirchhoff C, Wurm M. Functional Postoperative Outcome for 92 Cases of Radial Head Fractures: A PROM-Based Retrospective Study. J Clin Med. 2023;12(18):5870 (PMC10532215) | Fig. 1A | CC BY 4.0 | Fig. 1 caption: "(A,B) Mason type II fracture in AP and lateral oblique view". Text: "Fractures with a displacement of 2 mm or more without signs of comminution are classified as type II fractures." |
| type2Ct | II | Harbrecht A, Hackl M, Leschinger T, Wegmann K, Seybold D, Müller LP. Radial head fractures with interposed capitellar cartilage fragment–hindrance to bone healing–a case series. Arch Orthop Trauma Surg. 2021;141(9):1615-1624 (PMC8354868) | Fig. 7c | CC BY 4.0 | Fig. 7 caption: "a, b Preoperative radiographs (lateral and oblique) of a Mason type II fracture (Case 3). c CT-scan in axial view and d in sagittal view". Text: "Fractures were categorized according to the modified ... |
| type3 | III | Scoscina D, Facco G, Luciani P, Setaro N, Senesi L, Martiniani M, Gigante AP. Mason type III fractures of the radial head: ORIF, resection or prosthetic replacement? Musculoskelet Surg. 2023;107(2):223-230 (PMC10192170) | Fig. 1a | CC BY 4.0 | Fig. 1 caption: "Anteroposterior (a) and lateral (b) X-ray and 3D CT (c, d) images of a patient with Mason type III radial head fracture". Text: "type III are comminuted fractures involving the whole radial head". |
| type4 | IV | Jordan RW, Jones ADR. Radial Head Fractures. Open Orthop J. 2017;11:1405-1416 (PMC5721345) | Fig. 4 | CC BY 4.0 | Fig. 4 caption: "AP and lateral views of a Mason type IV injury." Table 1 (Mason classification): "Type IV / Fracture associated with posterior dislocation". |

### Mayfield (`src/data/scans/mayfield.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | How the source names it |
|---|---|---|---|---|---|
| stage1 | I | Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging Diagnosis and Management of Carpal Trauma and Instability—An Illustrated Guide. Life (Basel). 2023;13(7):1426 (PMC10381215) | Fig. 27a | CC BY 4.0 | Caption: '(a) PA wrist radiograph showing scapholunate joint widening (arrow).' Article text: 'the injury progresses through four distinct stages ... The first stage consists of scapholunate dissociation (Figure ... |
| stage1Mri | I | Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging Diagnosis and Management of Carpal Trauma and Instability—An Illustrated Guide. Life (Basel). 2023;13(7):1426 (PMC10381215) | Fig. 27b | CC BY 4.0 | Caption: '(b) Coronal T1 FS MR arthrogram in a different patient showing disruption of the scapholunate ligament (arrow).' Article text: 'the injury progresses through four distinct stages ... The first stage ... |
| stage3 | III | Sakaria S, Reyes M, Chandan P, Schwartz G. Dorsal Perilunate Dislocation Coupled With a Distal Radius Fracture: A Report of a Rare Case. Cureus. 2026;18(2):e103218 (PMC12974986) | Fig. 1B | CC BY 4.0 | Caption: 'Preoperative posterior-anterior view (A) and lateral view (B) of the right wrist demonstrate a comminuted intra-articular displaced fracture of the distal radius with a die-punch fragment along with a ... |
| stage4 | IV | Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging Diagnosis and Management of Carpal Trauma and Instability—An Illustrated Guide. Life (Basel). 2023;13(7):1426 (PMC10381215) | Fig. 30b | CC BY 4.0 | Caption: '(b) Lateral wrist radiograph showing an anteriorly dislocated lunate which is anteriorly rotated ~90°.' Article text: 'The fourth and final stage of injury results in tears/disruptions of all the ligaments ... |
| greaterArc | Greater arc | Rachunek-Medved K, Medved F, Besz W, Illg C, Lauer H, Krauß S, Daigeler A, Thiel JT. Do perilunate dislocations and fracture-dislocations result in different radiological outcomes following wrist alignment reconstruction? A single-center retrospective study including 51 patients with perilunate injuries. Arch Orthop Trauma Surg. 2025;145(1):106 (PMC11698771) | Fig. 1b | CC BY 4.0 | Caption: 'X-ray series in lateral and PA projections, along with corresponding CT scans with three-dimensional reconstructions of a ligamentous-only perilunate dislocation (a) and a trans-scaphoid perilunate ... |

### Herbert (`src/data/scans/herbert.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | How the source names it |
|---|---|---|---|---|---|
| typeA1 | A1 | Neubauer C, Schuppert C, Reidelbach CS, Zajonc H, Simunovic F, Goerke SM, Bamberg F, Wirtz S, Russe MF, Diallo TD, Neubauer J. Single-sequence low-field 3D T1-weighted MRI for scaphoid fracture detection compared to radiography: prospective diagnostic accuracy pilot study. Emerg Radiol. 2026;33(4):775-784 (PMC13433498) | Fig. 2A | CC BY 4.0 | Caption: 'a stable scaphoid fracture of the tubercle type A1 in a 33-year-old female patient (A-D)'. Text: stability 'as displayed for category A1 and A2 versus instability ... B1-4 by Schmitt and Rosenthal after ... |
| typeA2 | A2 | Dietrich TJ, Teh J, Schmitt R, Blum A, Hesse N, Lalam RK, et al. Interdisciplinary consensus statements on imaging of scaphoid fractures. Eur Radiol. 2026;36(10):7584-7598 (PMC13710594) | Fig. 1b | CC BY 4.0 | Caption: 'Sagittal-oblique MPR image parallel to the scaphoid's longitudinal axis on cone beam CT, demonstrating an incomplete acute fracture on the dorsal aspect of the mid-third (arrow)'. Mapping: mid-third = ... |
| typeB1 | B1 | Neubauer C, Schuppert C, Reidelbach CS, Zajonc H, Simunovic F, Goerke SM, Bamberg F, Wirtz S, Russe MF, Diallo TD, Neubauer J. Single-sequence low-field 3D T1-weighted MRI for scaphoid fracture detection compared to radiography: prospective diagnostic accuracy pilot study. Emerg Radiol. 2026;33(4):775-784 (PMC13433498) | Fig. 3C | CC BY 4.0 | Caption: 'An extended oblique B1 type fracture in a 28-year-old male patient is shown in panels A-E' and 'X-ray (A, F, K), CT (B/C, G/H, L/M)'. Matches page B1 'distal oblique fracture' (the source says oblique; it ... |
| typeB2 | B2 | Neubauer C, Schuppert C, Reidelbach CS, Zajonc H, Simunovic F, Goerke SM, Bamberg F, Wirtz S, Russe MF, Diallo TD, Neubauer J. Single-sequence low-field 3D T1-weighted MRI for scaphoid fracture detection compared to radiography: prospective diagnostic accuracy pilot study. Emerg Radiol. 2026;33(4):775-784 (PMC13433498) | Fig. 3H | CC BY 4.0 | Caption: 'a slightly displaced transverse fracture type B2 in a 45-year-old male patient in F-J' and 'the type B2 and B3 fractures are not visualized by X-ray (F/K)'. Source names type B2; page B2 is 'complete ... |
| typeB3 | B3 | Dietrich TJ, Teh J, Schmitt R, Blum A, Hesse N, Lalam RK, et al. Interdisciplinary consensus statements on imaging of scaphoid fractures. Eur Radiol. 2026;36(10):7584-7598 (PMC13710594) | Fig. 2c | CC BY 4.0 | Caption: 'Sagittal-oblique MPR image parallel to the scaphoid's longitudinal axis, showing a proximal pole scaphoid fracture with significant displacement of the dorsal fracture margin (arrow)'. Matches page B3 ... |
| typeB4 | B4 | Rachunek-Medved K, Medved F, Besz W, Illg C, Lauer H, Krauß S, Daigeler A, Thiel JT. Do perilunate dislocations and fracture-dislocations result in different radiological outcomes following wrist alignment reconstruction? A single-center retrospective study including 51 patients with perilunate injuries. Arch Orthop Trauma Surg. 2025;145(1):106 (PMC11698771) | Fig. 1b | CC BY 4.0 | Caption: 'X-ray series in lateral and PA projections, along with corresponding CT scans with three-dimensional reconstructions of a ligamentous-only perilunate dislocation (a) and a trans-scaphoid perilunate ... |
| typeD2 | D2 | Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging Diagnosis and Management of Carpal Trauma and Instability—An Illustrated Guide. Life (Basel). 2023;13(7):1426 (PMC10381215) | Fig. 6b | CC BY 4.0 | Caption 6b: 'PA radiograph of the wrist in a different patient showing a more obvious nonunion, again with sclerosis of the fracture margins (arrows) in an untreated injury'; 6a (same figure): 'sclerosis and ... |

### Palmer (`src/data/scans/palmer.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | How the source names it |
|---|---|---|---|---|---|
| class1a | 1A | Zhao X, Yu A, Zhao H, Qiu Y. Diagnostic value of MRI in traumatic triangular fibrocartilage complex injuries: a retrospective study. BMC Musculoskelet Disord. 2024;25:63 (PMC10787402) | Fig. 1A | CC BY 4.0 | Fig. 1 caption: 'MRI images of the traumatic TFCC injuries according to Palmer's classification.' Panel A is labelled 'IA' in the image. The article text uses Palmer 1A for this class ('subtyped into four types ... |
| class1b | 1B | Wang W, Zhang Y, Liu J, Xu H, Xu X, Chen P, Liu H, Fu H, Zhao X, Qi C. Ulnar styloid abduction angle: a novel radiological predictor of Palmer Type IB tears of the triangular fibrocartilage complex. Front Med (Lausanne). 2026;13:1842984 (PMC13377355) | Fig. 2A | CC BY 4.0 | Fig. 2 caption: 'Representative high-resolution 3.0T MRI of a typical Palmer Type IB TFCC tear. (A) Coronal fat-suppressed T2-weighted image demonstrates a complete avulsion of the deep radioulnar ligament at the ... |
| class1c | 1C | Zhao X, Yu A, Zhao H, Qiu Y. Diagnostic value of MRI in traumatic triangular fibrocartilage complex injuries: a retrospective study. BMC Musculoskelet Disord. 2024;25:63 (PMC10787402) | Fig. 1E | CC BY 4.0 | Fig. 1 caption: 'MRI images of the traumatic TFCC injuries according to Palmer's classification.' Panel E is labelled 'IC' in the image; Table 6 lists 'IC 1 (1)' (one arthroscopy-confirmed Palmer 1C case). |
| class1d | 1D | Zhao X, Yu A, Zhao H, Qiu Y. Diagnostic value of MRI in traumatic triangular fibrocartilage complex injuries: a retrospective study. BMC Musculoskelet Disord. 2024;25:63 (PMC10787402) | Fig. 1F | CC BY 4.0 | Fig. 1 caption: 'MRI images of the traumatic TFCC injuries according to Palmer's classification.' Panel F is labelled 'ID' in the image; Table 6 lists 'ID 4 (2)'. |

Not found, and mismatches (Herbert B5 and Palmer 2D filled on 2026-10-29; see below):

- Mason: no subtle type I seen only as a fat pad sign. Not used because they contradict the page:
  Laun 2015 calls a fracture with posterior dislocation "type III" (the page's IV); Liu 2018 and
  other Hotchkiss-based papers call a comminuted fracture "type II" (the page's III); Haasters 2019
  calls a fracture displaced under 2 mm type I (the page's I is undisplaced). The type I radiograph
  (Nietschke) has no arrow and a faint line; its caption says so.
- Mayfield: no stage II. Okoro 2023 names the stages differently (II "perilunate dislocation", III
  "midcarpal dislocation"), so it is used only for stages I and IV, where it agrees with the page.
  The greater-arc example and Herbert B4 are the same Rachunek-Medved radiograph.
- Herbert: no B5 (Fukuda 2024 is too small), C (Farkash 2015 too small, burned-in date) or D1 (no
  radiograph or CT figure says fibrous). Neubauer 2026 uses the Krimmer modification, whose A2 is a
  non-displaced waist fracture rather than the page's incomplete one, so A2 comes from Dietrich 2026
  (an incomplete mid-third fracture). Neubauer's Fig. 3 caption says the B1 fracture is "partially
  visible (G/H)", probably a typo for B/C.
- Palmer: no class 2 (degenerative). von Borstel 2017 has captioned 1A, 1B, 1C+2A and 2D figures
  but is CC BY-NC-ND; Cerezal 2026's Palmer schematics are "used with permission". Zhao 2024's 1A,
  1C and 1D are named by the authors' labels in the panels, not in the caption.

## Filling the gaps (2026-10-29)

A second pass over the sections and types above that had no image. Same licence and crop rules;
every crop was viewed. Images join the section's existing row, or the classification page's
Examples card.

### Ankle MRI (`src/data/scans/ankleMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| anteriorImpingementOsteophytes | anterior | Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11:97. (PMC7431516) | Fig. 19 | CC BY 4.0 | grey from the red channel |
| anteriorFibrousBandImpingement | anterior | Soualili A, Arfi A, Retal H, Khabet MK, Kadi R. Web Impingement Syndrome of the Ankle: A Rare Cause of Persistent Post-traumatic Pain. Cureus. 2025;17(11):e97012. (PMC12709089) | Fig. 3b | CC BY 4.0 | grey from the red channel |

### Diabetic foot MRI (`src/data/scans/diabeticFootMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| activeCharcotStir | charcot | Rosskopf AB, Loupatatzis C, Pfirrmann CWA, Böni T, Berli MC. The Charcot foot: a pictorial review. Insights Imaging. 2019;10:77. (PMC6682845) | Fig. 14b | CC BY 4.0 | publisher's full-size figure |

### Knee MRI (`src/data/scans/kneeMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| pclTear | pcl | Gensior TJ, Mester B, Achtnich A, Winkler PW, Henkelmann R, Hepp P, Glaab R, Krause M, Frosch KH, Zellner J, Schoepp C. Anatomic repair and ligament bracing as an alternative treatment option for acute combined PCL injuries involving the posteromedial or posterolateral corner—results of a multicentre study. Arch Orthop Trauma Surg. 2023;143(12):7123-7132. (PMC10635947) | Fig. 1a | CC BY 4.0 | publisher's full-size figure |
| lclTear | lateral-side | Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee—practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599. (PMC11399221) | Fig. 2D | CC BY 4.0 | grey from the red channel; publisher's full-size figure |
| posterolateralCorner | lateral-side | Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee—practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599. (PMC11399221) | Fig. 2E | CC BY 4.0 | grey from the red channel; publisher's full-size figure |
| segondFracture | bones | Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee—practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599. (PMC11399221) | Fig. 2C | CC BY 4.0 | grey from the red channel; publisher's full-size figure |
| cyclopsLesion | acl | Tsukamoto J, Fujisaki A, Futatsuya K, Koreeda Y, Kajio K, Inoue S, Hayashida Y, Sakai A, Hisaoka M, Oda Y, Aoki T. Imaging findings of intra-articular tumor/tumor-like lesions based on pathologic correlation. Jpn J Radiol. 2026;44(5):866-881. (PMC13144220) | Fig. 17a | CC BY 4.0 | publisher's full-size figure |
| parameniscalCyst | synovium | Vanhoenacker F, De Vos N, Van Dyck P. Common Mistakes and Pitfalls in Magnetic Resonance Imaging of the Knee. J Belg Soc Radiol. 2016;100(1):99. (PMC6100447) | Fig. 29 | CC BY 4.0 |  |

### Shoulder MRI (`src/data/scans/shoulderMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| subacromialBursitis | subacromial | Albano D, Gitto S, Messina C, Rizzo A, Giorgino R, Perfetti C, Albano GD, Abdelmaguid KIA, Arodia SI, Ambrogi F, Vanzulli A, Sconfienza LM. Can we use MRI for timing estimation of rotator cuff tears? Radiol Med. 2026;131(10):1867-1876. (PMC13668910) | Fig. 1c | CC BY 4.0 | publisher's full-size figure |
| acJointOsteoarthritis | subacromial | Gulati A, Adler B, Belair JA. Involvement of the acromion in cases of distal clavicular osteolysis. Skeletal Radiol. 2026;55(1):215-222. (PMC12627108) | Fig. 6d | CC BY 4.0 | grey from the red channel; publisher's full-size figure |
| supraspinatusPartialArticular | cuff | Yubran AP, Pesquera LC, Juan ELS, Saralegui FI, Canga AC, Camara AC, Valdivieso GM, Pisanti Lopez C. Rotator cuff tear patterns: MRI appearance and its surgical relevance. Insights Imaging. 2024;15:61. (PMC10899560) | Fig. 6b | CC BY 4.0 | publisher's full-size figure |
| patteStage3 | cuff | Albano D, Gitto S, Messina C, Rizzo A, Giorgino R, Perfetti C, Albano GD, Abdelmaguid KIA, Arodia SI, Ambrogi F, Vanzulli A, Sconfienza LM. Can we use MRI for timing estimation of rotator cuff tears? Radiol Med. 2026;131(10):1867-1876. (PMC13668910) | Fig. 1b | CC BY 4.0 | publisher's full-size figure |
| sugayaType4Retear | repair | Focsa LC, Adi F, Rousseau MA, Boyer P. The use of a suture bridge technique for arthroscopic rotator cuff repair in patients under 40 years of age resulted in successful tendon healing, pain relief, improved shoulder function, and high patient satisfaction at a minimum of 5-year follow-up. Arthrosc Sports Med Rehabil. 2025;7(1):101009. (PMC11873479) | Fig. 4b | CC BY 4.0 | publisher's full-size figure |
| sugayaType1Healed | repair | Focsa LC, Adi F, Rousseau MA, Boyer P. The use of a suture bridge technique for arthroscopic rotator cuff repair in patients under 40 years of age resulted in successful tendon healing, pain relief, improved shoulder function, and high patient satisfaction at a minimum of 5-year follow-up. Arthrosc Sports Med Rehabil. 2025;7(1):101009. (PMC11873479) | Fig. 3b | CC BY 4.0 | publisher's full-size figure |
| bufordComplex | variants | Pouliart N, Doering S, Shahabpour M. What can the radiologist do to help the surgeon manage shoulder instability? J Belg Soc Radiol. 2016;100(1):105. (PMC6100640) | Fig. 3a | CC BY 4.0 | grey from the red channel |
| sublabralForamen | variants | Mercouris P, Mercouris M. Superior labrum anterior to posterior lesions: Part 1 - Imaging and anatomy with arthroscopic classification. S Afr J Radiol. 2023;27(1):2706. (PMC10623653) | Fig. 12a | CC BY 4.0 |  |
| glenoidChondralLesion | cartilage | Gonçalves DVC, Ratti MAS, Guimarães JB, Ormond Filho AG, Ribas LHBV. Glenohumeral cartilage lesions: reviewing diagnostic imaging strategies and preoperative evaluation. Radiol Bras. 2026;59:e20250132. (PMC13563660) | Fig. 3a | CC BY 4.0 |  |

### Elbow MRI (`src/data/scans/elbowMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| tricepsAvulsion | triceps-brachialis | Froom RJ, Wang Y, Martin B, Hackett TR. Traumatic Triceps and Medial Ulnar Collateral Ligament Rupture in an Adolescent Mogul Skier: A Case Report. Cureus. 2024;16(5):e61026. (PMC11194329) | Fig. 2b | CC BY 4.0 | grey from the red channel |
| olecranonBursitis | bursae | Tsukamoto J, Fujisaki A, Futatsuya K, Koreeda Y, Kajio K, Inoue S, Hayashida Y, Sakai A, Hisaoka M, Oda Y, Aoki T. Imaging findings of intra-articular tumor/tumor-like lesions based on pathologic correlation. Jpn J Radiol. 2026;44(5):866-881. (PMC13144220) | Fig. 3c | CC BY 4.0 | publisher's full-size figure |
| anconeusEpitrochlearis | variants | Acosta Batlle J, Cerezal L, López Parra MD, Alba B, Resano S, Blázquez Sánchez J. The elbow: review of anatomy and common collateral ligament complex pathology using MRI. Insights Imaging. 2019;10(1):43. (PMC6447645) | Fig. 6b | CC BY 4.0 | grey from the red channel; publisher's full-size figure |

### Wrist MRI (`src/data/scans/wristMri.ts`)

| Key | Section | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| lunotriquetralTear | lunotriquetral | Dallaudière B, Moreau-Durieux MH, Larbi A, Perozziello A, Huot P, Meyer P, Pesquer L. Effects of Axial Traction during Direct MR-Arthrography of the Wrist in Sports Injuries. J Belg Soc Radiol. 2016;100(1):72. (PMC5854454) | Fig. 3b | CC BY 4.0 |  |
| radioscaphocapitateTear | extrinsic | Shahabpour M, Abid W, Van Overstraeten L, De Maeseneer M. Wrist Trauma: More Than Bones. J Belg Soc Radiol. 2021;105(1):90. (PMC8719475) | Fig. 2c | CC BY 4.0 | publisher's full-size figure |
| bifidMedianNerve | variants | Mangi MD, Zadow S, Lim W. Nerve entrapment syndromes of the upper limb: a pictorial review. Insights Imaging. 2022;13(1):166. (PMC9556688) | Fig. 11b | CC BY 4.0 | publisher's full-size figure |
| osStyloideum | variants | Nevalainen MT, Roedl JB, Morrison WB, Zoga AC. MRI of a painful carpal boss: variations at the extensor carpi radialis brevis insertion and imaging findings in regional traumatic and overuse injuries. Skeletal Radiol. 2019;48(7):1079-1085. (PMC6525668) | Fig. 1c | CC BY 4.0 | publisher's full-size figure |

### Herbert (`src/data/scans/herbert.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| typeB5 | B5 | Marzella L, Filistad S, Lazzerini A, Cannella A, Sassara G, Caruso L, De Vitis R. Volar locking and angular stability plate for treatment of comminuted scaphoid fractures: a case series of 44 cases. Eur J Orthop Surg Traumatol. 2024;34(8):4001-4008. (PMC11519103) | Fig. 2 | CC BY 4.0 | publisher's full-size figure |

### Palmer (`src/data/scans/palmer.ts`)

| Key | Type | Source (PMCID) | Figure | Licence | Notes |
|---|---|---|---|---|---|
| class2d | 2D | Wu WT, Chang KV, Mezian K, Naňka O, Yang YC, Hsu YC, Hsu PC, Özçakar L. Ulnar Wrist Pain Revisited: Ultrasound Diagnosis and Guided Injection for Triangular Fibrocartilage Complex Injuries. J Clin Med. 2019;8(10):1540. (PMC6832410) | Fig. 16C | CC BY 4.0 | ultrasound |

Still without an image:

- Ankle: technique, impression. Huuskonen 2023 Fig. 5d (effusion only) was not needed.
- Foot: accessory navicular (Soltanolkotabi 2022 Fig. 8a names "mild edema" at the synchondrosis,
  but the oedema can't be seen, so it was not used; Akdemir 2026 Fig. 2E has no arrows), turf toe
  (Limaye 2024 Fig. 1 is a blurred arthrogram with no arrow), fascia and variants (the text names
  nothing to show; os trigonum MRIs found would suit the ankle's posterior section instead).
- Knee: lipohemarthrosis (taught only in technique). Spares: Ghosh 2026 Fig. 6A (grade III PCL
  tear, small), Dhanda 2010 Fig. 1A (cyclops, CC BY 2.0).
- Shoulder: a true GLAD lesion (Pouliart Fig. 8 is 400 px and its blue arrows vanish in grey; the
  cartilage step shows a glenoid chondral lesion instead), os acromiale (Kadi Fig. 9 is CT
  arthrography; You 2019's captions cite other papers; Vaz 2018 has no Crossref licence and swaps its
  panel labels). Kadi's Buford and sublabral foramen figures say "Courtesy of", so were not used.
- Elbow: the UCL T-sign (Acosta Batlle 2019, Powell 2021 and Folco 2024 describe it in the text
  but have no figure of it; the rest are NC or ND), brachialis.
- Wrist: de Quervain and intersection syndrome (Zhari 2015 is blurred, unmarked, and has its
  CC BY 2.0 only in the licence URL), perilunate on MRI. Okoro 2023 Fig. 30b (a lunate dislocation
  radiograph) would fit but is not MRI and is already the Mayfield stage IV example.
- Mason: type I seen only as a fat pad sign (two "Mason type I" papers in Acta Orthop are CC BY-NC).
- Mayfield: stage II (every captioned figure found was stage III or IV). Filled later the same
  day: Okoro 2023 Fig. 28 (see "Second gap search").
- Herbert: C, D1 (Wang 2020 has D1 patients but only graphs; PMC13307208 uses a D1–D4 scheme whose
  D2 differs from the page's).
- Palmer: 2A, 2B, 2C, 2E (Wang and Ding 2026's 2C image is arthroscopic; Cerezal 2026 is "used with
  permission"; von Borstel 2017 is CC BY-NC-ND).

Notes and mismatches:

- Wu 2019 (Palmer 2D) is ultrasound and uses a grading "modified from" Palmer's; its 2A–2E match the
  page, its class 1 does not (1C radial, 1D horizontal, plus a 1E), so it is used only for 2D. Its
  Fig. 16A labels a peripheral tear "Class 2B", against the page's 2B (wear, no perforation).
- Herbert B5 (Marzella 2024): the text says the comminuted fractures "should be classified like
  Type B5 of Herbert (Figs. 1 and 2)"; the source has no arrows.
- Mayfield stage IV is used loosely elsewhere: PMC13451638 for a perilunate fracture-dislocation,
  PMC13631426 for a volar transradial injury. Okoro 2023 Fig. 28 calls the perilunate dislocation
  stage II (the site's III). PMC6661091 calls a fracture displaced under 2 mm Mason I (the page's I
  is undisplaced). None of these was used.
- Segond fracture: the knee study says the fragment is pulled off by the iliotibial tract or the
  anterior oblique band of the LCL; Parkar's text names the iliotibial band and the anterolateral
  capsule. The figure caption names neither, so the image caption doesn't conflict.
- Parameniscal cyst sits under synovium, the only section that mentions it.
- Tsukamoto 2026 Fig. 3 (olecranon bursitis) calls panel c axial, but it is sagittal; the caption
  names no plane. Focsa 2025 and Albano 2026 say "Sugaya stage" and "Patte 3"; the study says type
  and stage.
- Gensior 2023 Fig. 1a (PCL) has no arrows; its legend names an intraligamentous tear.

## Second gap search (2026-10-29, later)

Searched again for turf toe, os acromiale, Mayfield II, Herbert C and D1, Palmer 2A–2C and 2E, and a
labyrinthine fistula. Searches and rejected candidates are in the agents' notes (scratchpad
`gaps2/*/notes.md`); the outcome:

| Page | Key | Source | Licence |
|------|-----|--------|---------|
| Shoulder MRI (variants) | osAcromiale | Vaz and Trippia 2018, Radiol Bras, Fig. 6b (axial fat-suppressed T2) | CC BY 4.0 in the article's licence URL (PMC XML); Crossref has no licence record, which is a gap, not a conflict. Reconsidered from the first search: the source caption swaps its panel labels (it calls panel B coronal; it is axial), so the site's caption follows the image, not the label. |
| Hearing loss CT (labyrinthine fistula) | labyrinthineFistula | Miwa et al. 2026, Clin Case Rep, Fig. 1c (coronal CT; RED=1 for the yellow arrow) | CC BY 4.0, article and Crossref |
| Hearing loss CT (labyrinthine fistula) | labyrinthineFistulaAxial | Thangavelu et al. 2022, Eur Arch Otorhinolaryngol, Fig. 5 (axial CT) | CC BY 4.0, article and Crossref |
| Mayfield | stage2 | Okoro et al. 2023, Life, Fig. 28 (sagittal CT: "dorsal dislocation of the capitate in stage two perilunate dislocation") | CC BY 4.0, article and Crossref |

Not used:
- Herbert C: Chammas et al. 2023 (J Orthop Traumatol, CC BY 4.0) Fig. 1c shows "delayed union of a
  scaphoid waist fracture", but after screw fixation, with no time from injury, and the source names
  no Herbert type, so calling it type C would be an inference. Left out; offered to the author.

Still without an image: turf toe (about 30 figure-legend searches and ~370 CC BY articles' captions
scanned; the only candidate, Limaye 2024 Fig. 1, shows no visible defect), Herbert C (above) and D1
(fibrous non-union appears only in surgical photos and text), Palmer 2A, 2B, 2C and 2E (about 250
TFCC and ulnar impaction papers' captions scanned; Yan 2022's figure names no class, Wang and Ding
2026 Fig. 1b is low-resolution with burned-in labels, Vassa 2020 is CC BY-NC-ND, Cerezal 2026 is
"used with permission").

## The seven X-ray studies (2026-11-02)

Example radiographs for the neonatal chest study and the six adult injury studies, made the same way
as above (CC BY with a stated version, one panel per file, greyscale, under 40 KB). The injury studies
show adults only; the neonatal study, newborns. Each image sits in the learn section (step) that
teaches it. Searches, crop boxes and rejected candidates are in the agents' notes (scratchpad
`xs/*/notes.md`).

Reused from other pages, not copied: `schatzker.type6` (knee, plateau); `mason.type1` and `type3`
(elbow, bones); `mayfield.stage1` (wrist, alignment) and `stage4` (wrist, carpus);
`fifthMetatarsal.zone1` (ankle, bones; its source calls it an ankle film); `lisfranc.diastasis`
(foot, alignment), `lisfranc.fleck` (foot, midfoot), and `fifthMetatarsal.zones`, `zone2` and `zone3`
(foot, metatarsals).

### Neonatal chest X-ray (`src/data/scans/neonatalChestXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| ettLandmarks | lines | Tippmann et al. 2026 (PMC12971967) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| ettRightBronchus | lines | Dominguez and Alvares 2018 (PMC5846321) | Fig. 1 | CC BY 4.0; Crossref none |
| umbilicalCatheters | lines | Judd et al. 2026 (PMC12807581) | Fig. 1A | CC BY 4.0; Crossref by/4.0 |
| uvcLateral | lines | Al-Dajani et al. 2023 (PMC10560078) | Fig. 3 | CC BY 3.0; Crossref none |
| uvcInLiver | lines | Sohane et al. 2025 (PMC12426201) | Fig. 5B | CC BY 4.0; Crossref by/4.0 |
| piccInLiver | lines | Song et al. 2026 (PMC13057524) | Fig. 2A | CC BY 4.0; Crossref by/4.0 |
| rdsGrade2 | lungs | Lovrenski et al. 2025 (PMC12226615) | Fig. 2B | CC BY 4.0; Crossref by/4.0 |
| transientTachypnoea | lungs | Chavan et al. 2022 (PMC9079322) | Fig. 1 | CC BY 3.0; Crossref none |
| meconiumAspiration | lungs | Olicker et al. 2021 (PMC8005197) | Fig. 2 | CC BY 4.0; Crossref by/4.0 |
| supinePneumothorax | air-leak | Hammon et al. 2019 (PMC6322299) | Fig. 3c | CC BY 4.0; Crossref by/4.0 |
| interstitialEmphysema | air-leak | Lei et al. 2019 (PMC6676513) | Fig. 2 | CC BY 4.0; Crossref by/4.0 |
| spinnakerSail | air-leak | Zamlout et al. 2025 (PMC11995531) | Fig. 1A | CC BY 4.0; Crossref by/4.0 |

### Knee X-ray (`src/data/scans/kneeXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| segond | avulsions | Adwan et al. 2025 (PMC12007960) | Fig. 1 | CC BY 4.0; Crossref none |
| arcuateSign | avulsions | Paul et al. 2025 (PMC12124724) | Fig. 8a | CC BY 4.0; Crossref by/4.0 |
| lateralFemoralNotch | alignment | Lodewijks et al. 2019 (PMC6394542) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| patellaAlta | alignment | Wood et al. 2026 (PMC13135814) | Fig. 1 | CC BY 4.0; Crossref none |
| patellarFracture | patella | Potla et al. 2023 (PMC10630152) | Fig. 1 | CC BY 3.0; Crossref none |
| bipartitePatella | patella | Kroustalakis et al. 2025 (PMC12701556) | Fig. 1a | CC BY 4.0; Crossref none |
| hoffa | femur | Kitamura et al. 2023 (PMC10072071) | Fig. 1b | CC BY 3.0; Crossref none |

### Elbow X-ray (`src/data/scans/elbowXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| fatPads | soft-tissues | Huhtanen et al. 2022 (PMC9276721) | Fig. 8c | CC BY 4.0; Crossref by/4.0 |
| terribleTriad | bones | Wang et al. 2023 (PMC10356941) | Fig. 2a | CC BY 4.0; Crossref by/4.0 |
| coronoid | bones | Barati et al. 2023 (PMC10704758) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| doubleArc | bones | Bellato et al. 2022 (PMC8788494) | Fig. 5 | CC BY 4.0; Crossref by/4.0 |
| monteggiaPosterior | bones | Uchôa and Uchôa 2024 (PMC11328982) | Fig. 1a | CC BY 4.0; Crossref none |
| monteggiaAnterior | alignment | Moldovan 2025 (PMC12028828) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| galeazzi | bones | Zaher et al. 2024 (PMC11323951) | Fig. 1b | CC BY 4.0; Crossref none |

### Wrist X-ray (`src/data/scans/wristXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| trueLateral | technique | Clark et al. 2025 (PMC12328503) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| gilulaArcs | alignment | Okoro et al. 2023 (PMC10381215) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| collesLateral | radius | Wong et al. 2015 (PMC4519440) | Fig. 5a | CC BY 4.0; Crossref by/4.0 |
| scaphoidUlnarDeviation | scaphoid | Hernáiz Ferrer et al. 2025 (PMC12546487) | Fig. 4a | CC BY 4.0; Crossref by/4.0 |
| occultScaphoidFollowUp | scaphoid | Jarraya et al. 2013 (PMC3613077) | Fig. 3c | CC BY 3.0; Crossref by/3.0 |
| triquetralDorsalFracture | carpus | Jarraya et al. 2013 (PMC3613077) | Fig. 4b | CC BY 3.0; Crossref by/3.0 |
| scaphoidFatStripe | soft-tissues | Miyahara et al. 2022 (PMC8993176) | Fig. 6 | CC BY 4.0; Crossref by/4.0 |

### Hand X-ray (`src/data/scans/handXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| cmcFractureDislocationOblique | alignment | Valdés-Medina et al. 2026 (PMC12981997) | Fig. 2 | CC BY 4.0; Crossref none |
| cmcDorsalDislocationLateral | alignment | Kalatzis et al. 2024 (PMC11707556) | Fig. 1 | CC BY 4.0; Crossref none |
| boxerFractureOblique | metacarpals | Hussain et al. 2020 (PMC7451089) | Fig. 2 | CC BY 3.0; Crossref none |
| bennettFracture | metacarpals | Wong et al. 2015 (PMC4519440) | Fig. 7 | CC BY 4.0; Crossref by/4.0 |
| rolandoFracture | metacarpals | Florek et al. 2024 (PMC11493467) | Fig. 1 | CC BY 4.0; Crossref none |
| pipDorsalFractureSubluxation | phalanges | Barrached et al. 2023 (PMC10670557) | Fig. 1B | CC BY 3.0; Crossref none |
| bonyMallet | phalanges | Stumpfe et al. 2023 (PMC10896929) | Fig. 1b | CC BY 4.0; Crossref by/4.0 |
| thumbUclAvulsion | phalanges | Manneck et al. 2021 (PMC7811990) | Fig. 3b | CC BY 4.0; Crossref by/4.0 |
| foreignBody | soft-tissues | Sabir and Akkaya 2024 (PMC11371867) | Fig. 1a | CC BY 4.0; Crossref by/4.0 |

### Ankle X-ray (`src/data/scans/ankleXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| weberA | bones | Surmanowicz et al. 2025 (PMC12385429) | Fig. 1 | CC BY 4.0; Crossref by/4.0 |
| weberB | bones | Surmanowicz et al. 2025 (PMC12385429) | Fig. 2 | CC BY 4.0; Crossref by/4.0 |
| weberC | bones | Surmanowicz et al. 2025 (PMC12385429) | Fig. 3 | CC BY 4.0; Crossref by/4.0 |
| clearSpaces | alignment | Surmanowicz et al. 2025 (PMC12385429) | Fig. 4 | CC BY 4.0; Crossref by/4.0 |
| tfcsWidening | alignment | Crone et al. 2026 (PMC13198512) | Fig. 5b | CC BY 4.0; Crossref by/4.0 |
| stressView | alignment | Zeni et al. 2023 (PMC10209918) | Fig. 1B | CC BY 3.0; Crossref none |
| maisonneuveFibula | bones | Tafti et al. 2020 (PMC7537486) | Fig. 10c | CC BY 3.0; Crossref none |
| maisonneuveAnkle | bones | Tafti et al. 2020 (PMC7537486) | Fig. 10b | CC BY 3.0; Crossref none |
| posteriorMalleolus | bones | Tafti et al. 2020 (PMC7537486) | Fig. 10a | CC BY 3.0; Crossref none |
| lateralProcessCt | bones | Jin et al. 2022 (PMC9533565) | Fig. 1c | CC BY 4.0; Crossref by/4.0 |

### Foot X-ray (`src/data/scans/footXray.ts`)

| Key | Section | Source (PMCID) | Figure | Licence |
|---|---|---|---|---|
| lisfrancFractureDislocation | alignment | Wong et al. 2015 (PMC4512960) | Fig. 5a | CC BY 4.0; Crossref by/4.0 |
| lisfrancMalalignment | alignment | Wong et al. 2015 (PMC4512960) | Fig. 5d | CC BY 4.0; Crossref by/4.0 |
| lisfrancLateralDislocation | midfoot | Kim et al. 2021 (PMC7982150) | Fig. 1B | CC BY 4.0; Crossref by/4.0 |
| bohlerReduced | alignment | Sturz-Jantsch et al. 2025 (PMC12346960) | Fig. 1a | CC BY 4.0; Crossref by/4.0 |
| bohlerNormal | alignment | Crone et al. 2026 (PMC13198512) | Fig. 7 | CC BY 4.0; Crossref by/4.0 |
| talarFractureLateral | hindfoot | Chen et al. 2020 (PMC7328999) | Fig. 2 | CC BY 4.0; Crossref by/4.0 |
| hawkinsSign | hindfoot | Chen et al. 2020 (PMC7328999) | Fig. 8A | CC BY 4.0; Crossref by/4.0 |
| metatarsalStressFracture | metatarsals | Palka et al. 2025 (PMC12041408) | Fig. 9A | CC BY 4.0; Crossref by/4.0 |

Where an image differs from the study's text (the captions follow the source):
- ettLandmarks uses the clavicle line as the upper limit, which the study (after Blayney) calls
  variable from film to film; it is also a nasotracheal tube.
- interstitialEmphysema arose on nasal CPAP, without mechanical ventilation.
- umbilicalCatheters calls a UVC tip at T8 "optimal": within D'Andrea's T8–T9, just above Verheij's
  T9–T10.
- patellaAlta is a patellar tendon rupture, not a lower-pole avulsion; the source contradicts itself
  on the side, and the image matches its Fig. 1.
- bipartitePatella is a traumatic separation of a Saupe III fragment, which the source calls
  "anterosuperior".
- doubleArc: the source names the smaller arc the trochlea, where the study says the lateral trochlear
  ridge. monteggiaAnterior gives no Bado type, because its author questions type I.
- hawkinsSign is at 3 months; the study gives 6 to 8 weeks for the sign to appear.
- talarFractureLateral is captioned "talar fracture" in the source; the neck fracture is named in its
  CT caption.
- metatarsalStressFracture is in a 17-year-old with closed physes.
- thumbUclAvulsion is undisplaced; boxerFractureOblique's source says "volar angulation" (the study's
  apex dorsal); foreignBody is a chronic retained fragment.
- lateralProcessCt is CT: the paper's radiograph shows only "obscure" lines with no arrow.

Not used: knee lipohaemarthrosis (Wong 2015 Part 2, Fig. 2b; 234 px, the fat-fluid level not
visible at that size), the hand volar plate fleck (Lee 2021, Fig. 4A; small and unmarked), a
terrible triad figure in the Open Orthopaedics Journal (Bentham Open, on predatory-publisher lists),
Torg radiographs in PMC5155254 (CC BY-NC), and Myerson divergent and homolateral patterns in
PMC8762863 (about 200 px; the full-size copy was not reachable).

Still without an image: the knee's horizontal-beam lateral with a lipohaemarthrosis, the reverse
Segond and tibial spine or PCL avulsions; the radiocapitellar view; radial inclination drawn on a PA;
the ankle effusion (teardrop) sign; Torg types; the neonatal UAC's loop through the pelvis.

## Brain territories (2026-11-02)

CT and MRI for the brain vascular territories page (`src/data/scans/brainTerritories.ts`), made as
above (CC BY with a stated version, one panel per file, greyscale, under 40 KB, in
`public/scans/brain-territories/`). Each image sits under the section of
`src/pages/BrainTerritoriesPage.tsx` that teaches its finding, and its caption keeps to the source
figure's caption. The figure leads came from the appendix of
`2026-11-02-brain-territories-sources.md`; the gaps there were searched again (Europe PMC, including
figure captions with `FIG:`). Searches, crop boxes and rejected candidates are in the scratchpad
`bt-scans/notes.md`.

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| acaInfarct | Sano et al. Cureus 2025;17:e80688 (PMC12000702) | Fig. 2A | "CC-BY 4.0" / none | right ACA territory; the series is of ACA dissection; red arrow kept via the red channel |
| mcaInfarct | John et al. J Med Case Rep 2008;2:148 (PMC2396650) | Fig. 2 | CC BY (by/2.0 link) / by/2.0 | CT 72 h after admission; burned-in patient and scanner text cropped off |
| pcaInfarct, paramedianPontine, picaInfarct | Nouh et al. Front Neurol 2014;5:30 (PMC3985033) | Figs. 3C, 4A, 4D | "CC BY", PMC licence link by/3.0 / none | the PICA caption names the cut-off PICA only as panel C of the same figure |
| achaInfarct | Tsika et al. Neurol Int 2024;16:289 (PMC10961810) | Fig. 1b | CC BY (by/4.0) / by/4.0 | left AChA territory, DWI |
| thalamicInfarct | Renard et al. Behav Neurol 2014;2014:154631 (PMC4101959) | Fig. 2a | CC BY (by/3.0) / by/3.0 | thalamogeniculate territory (arrow) with a PCA cortical infarct (arrowhead) |
| deepVenousThalami | Renard 2014 | Fig. 7a | as above | bilateral thalamic oedema, deep venous thrombosis |
| lateralMedullary | Xin et al. BMC Neurol 2020;20:211 (PMC7249651) | Fig. 1b | CC BY 4.0 / by/4.0 | red arrow kept via the red channel; burned-in text of panel A cropped off |
| scaInfarct | Gollwitzer et al. J Clin Med 2025;14:8229 (PMC12653350) | Fig. 1A | CC BY (by/4.0) / by/4.0 | SCA occlusion shown in panel B |
| corticalBorderZone, internalBorderZone | Dogariu et al. J Med Life 2023;16:842-850 (PMC10478671) | Figs. 2b, 3 | CC BY 3.0 / by/4.0 | article and Crossref differ; the article's 3.0 is used; Fig. 2b is small (217 px) |
| percheron | Kichloo et al. J Investig Med High Impact Case Rep 2019;7 (PMC6689919) | Fig. 2 | CC BY 4.0 / TDM only | |
| lacune | Furtner and Prayer. Wien Med Wochenschr 2021;171:274-281 (PMC8397686) | Fig. 5b | CC BY 4.0 / by/4.0 | coronal T2; the axial FLAIR (5a) is too dark to show it |
| parasagittalVenousInfarct | Li et al. Front Radiol 2021;1:687045 (PMC10365275) | Fig. 6A | "CC BY" / by/4.0 | small in the source (140 px); red arrow kept via the red channel |
| temporalVenousInfarct, cordSign, emptyDelta, venographyDefect | Oliveira et al. Radiol Bras 2022;55:54-61 (PMC8864687) | Figs. 4B, 2, 5A, 9B | CC BY (by/4.0) / by/4.0 | orange arrows kept via the red channel |
| denseSinus, swiBlooming, hypoplasticTransverse | Sadik et al. Life 2022;12:1215 (PMC9410175) | Figs. 15, 9b, 22b | CC BY (by/4.0) / by/4.0 | no arrows in these figures |
| arachnoidGranulation | Delgado et al. Insights Imaging 2026;17:230 (PMC13588991) | Fig. 5a | CC BY 4.0 / by/4.0 | figures are WebP in the supplementary files |
| flowGap | Zedde and Pascarella. Neurol Int 2025;17:9 (PMC11767902) | Fig. 9a | CC BY (by/4.0) / by/4.0 | contrast-enhanced venography (9b) did not confirm the gaps |
| mcaSuperiorDivision | Kim et al. Neuroradiology 2026;68:965-974 (PMC13139282) | Fig. 4c | CC BY 4.0 / by/4.0 | case 1, left MCA superior division infarct on DWI; small in the source (191 px) |
| heubnerInfarct | De Lorenzo et al. BMC Neurol 2023;23:399 (PMC10631111) | Fig. 1 | CC BY 4.0 / by/4.0 | upper right (FLAIR) panel; the caption names the Heubner territory (arrow with asterisk); the other arrow is an MCA lesion |
| midbrainInfarct | Sakai et al. Cureus 2025;17:e93448 (PMC12571697) | Fig. 1a | "CC-BY 4.0" / none | right rostral paramedian midbrain on DWI; the paper names no artery |
| flowVoidLoss, t1BrightClot, dwiBrightClot | Karagulle et al. Diagnostics 2026;16:1771 (PMC13298027) | Figs. 2C, 2B, 2E | "CC BY", by/4.0 link / by/4.0 | one patient, left transverse sinus thrombosis; panels about 240 px in the source |
| polycythaemiaDenseSinus | Gayathri et al. J Pediatr Neurosci 2010;5:27 (PMC2964806) | Fig. 2 | "CC BY", PMC licence link by/2.0 / none | case 2 (tetralogy of Fallot, haematocrit 66%); the sinuses enhanced on contrast CT (Fig. 4) but there was no venography and the authors say clot must be ruled out, so the caption claims neither; burned-in date and labels cropped off |

Not used: Canedo-Antelo 2019 (RadioGraphics, not CC BY); Nouh Fig. 3A (lateral medullary FLAIR, no
arrow and the lesion not visible at the source's size); Yilmaz 2016, Heubner infarct (PMC4884235;
PMC gives by/2.5 but Crossref by-nc/4.0); Markus and de Leeuw 2022, Fig. 1b lacune (PMC9806465; captioned
"Copyright Hugh Markus"); Stringer 2020 review, Fig. 3 (PMC7803876; the caption's left-to-right order
does not match the panels); Pereira 2025 Wallenberg case (PMC12634019; its "DWI" panel is a T2
image); Kaplanoğlu 2023 arachnoid granulations (Eurasian J Med, CC BY-NC); Abdrabou 2025 dense torcula
from a high haematocrit (PMC12125052, Fig. 3A; 230 px, the density and the ROI label not readable);
Sadik Fig. 23 (arachnoid granulation not visible without an arrow); Delgado Fig. 1a (zoomed views,
little anatomy; Sadik Fig. 15 used instead); Takada 2025 and Yanusha 2025 MCA infarcts (faint DWI;
photographed film with burned-in text).

Gap search (2026-11-02, later; searches, candidates and crop boxes in the scratchpad
`bt-gaps/notes.md`): the MCA superior division, Heubner, midbrain, flow-void, T1, DWI and
polycythaemia images above were added. Not used: Happonen 2023 (PMC10297083, Fig. 2; CC BY 4.0, but
its T2 flow-void panel is subtler than Karagulle's, so one patient's set was kept); Alattas 2022
(PMC9761486; small coloured arrows on a busy figure); Iyer 2025 dehydration CT (PMC12398339, Fig. 2;
no arrow, the density is slight and the brain is diffusely abnormal); the Sci Rep 2021 plateau study
(PMC7954789, Fig. 3a; 135 px panels); Babici 2023 caudate infarct (PMC10693717; clear, but the paper
does not put it in the Heubner territory); Carranza 2025 Claude syndrome (PMC12334073; lesion faint),
Weber syndrome case 2022 (PMC9142634; faint, no arrow), Haymes 2021 (PMC8500245; DWI too dark);
inferior-division candidates PMC12358175 (multifocal infarcts) and PMC11669874 (motion artefact, per
its caption).

Still without an image: an infarct of the MCA inferior division alone (the page says so). The
high-riding jugular bulb is not on the page, so none was sought.

## Haemorrhage on MRI (2026-11-02)

MRI for the haemorrhage on MRI page (`src/data/scans/haemorrhageMri.ts`), made as above (CC BY with
a stated version, one panel per file, greyscale, under 40 KB, in `public/scans/haemorrhage-mri/`).
Each row of images sits under the table of `src/pages/HaemorrhageMriPage.tsx` it illustrates, in
table-row order, and each caption keeps to the source figure's caption and to the table's cell. The
figure leads came from the appendix of `2026-11-02-haemorrhage-mri-sources.md`; the gaps were
searched in Europe PMC, including figure captions with `FIG:`. Larger copies of the same figures
were taken from the publishers (Frontiers, Springer) where Europe PMC's were small. Searches, crop
boxes and rejected candidates are in the scratchpad `hm-scans/notes.md`.

| Key | Source (PMCID) | Figure | Licence: article / Crossref | Notes |
|---|---|---|---|---|
| hyperacuteHaematoma, acuteHaematoma, lateSubacuteHaematoma | Penckofer et al. Front Neurosci 2024;18:1408288 (PMC11111865) | Fig. 1A (panels A2, B2, D1) | CC BY 4.0 / by/4.0 | plainly different patients; the caption gives no patient details; B2 is labelled T2 FLAIR but the CSF is bright, so the caption says T2-weighted and gives the source's label |
| chronicHaematoma | Patra et al. Indian J Crit Care Med 2019;23:S104-S114 (PMC6707490) | Fig. 7B | CC BY 4.0 / none | right basal ganglia, T2; figure taken from PMC (the Europe PMC supplementary files failed) |
| chronicSubdural | Kuczyński et al. J Clin Med 2026;15:4134 (PMC13258658) | Fig. 6 | "CC BY", by/4.0 link / by/4.0 | "Own material"; green arrows kept via the green channel; orientation letters and ruler cropped off |
| sahFlair, superficialSiderosis, microbleeds | Weidauer et al. Clin Neuroradiol 2023;33:293-306 (PMC10220152) | Figs. 6b, 5b, 7g | CC BY 4.0 / by/4.0 | three patients; the convexity SAH is from CAA (no open aneurysmal SAH on FLAIR was found); the dates above Fig. 6 cropped off |

Not used: Penckofer Fig. 1A C1/C2 (early subacute; a small midline brainstem lesion, faint on T1)
and E1/E2 (chronic; a small dark focus on GRE, no arrow, could be taken for a microbleed); Hasan 2022
Fig. 3A (PMC9393587; clear, but carries an arrowhead its caption does not explain, so Kuczyński's
was used); Tabibkhooei 2021 (PMC7879972, Fig. 3a; CC BY 4.0, a T1-bright rim the authors call
early subacute, but their case text says a CT on the admission day showed no bleed and the MRI was on
the second day, so the bleed was at most about 2 days old, inside the page's acute row, where T1 is
like brain); Patra Fig. 4 (subacute subdural, labelled T1 but the cortex is brighter than the white
matter, as on FLAIR); Arai 2024 acute subdural (PMC11297714, Fig. 1C; the MRI was about a week
after the fall, past the page's 3-day acute window); Pineda 2024 (PMC11168240; bright on T2, in
intracranial hypotension); the Clin Case Rep 2026 and Cureus 2025 subdurals (PMC13051822,
PMC12535179; bright on T2 or T1, against the page's acute row); Iliescu 2015 (PMC4556906; a
neuroradiologycases.com watermark, no licence version); the Turk J Haematol 2012 subdurals
(PMC3986758; burned-in patient text, no licence version); Ahmad 2021 (PMC8325620; thin rims with
measurement text); Padarti 2023 cavernoma bleed (PMC9996543; a small dot); Sporns 2020
paediatric review (PMC7290500, Fig. 3; T2* and contrast T1 only); the Alzheimers Dement 2023 CAA
panels (PMC10916950, Fig. 1A; dark, low contrast).

Still without an image: an early subacute intracerebral haematoma, and an acute or subacute subdural
haematoma on MRI (the page says so).
