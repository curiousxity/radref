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
