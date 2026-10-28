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
