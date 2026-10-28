import type { ScanSource } from './types'

/**
 * Papers whose figures are cropped for the example scans. Each licence is the exact version from
 * the article's licence statement (Europe PMC or PMC full-text XML), matched against Crossref;
 * where they differ or one is silent, the comment says so.
 */
export const SCAN_SOURCES = {
  // Paediatric elbow
  lahfafa2020: { short: 'Lahfafa and Dermesropian 2020', doi: '10.5334/jbsr.2180', licence: 'CC BY 4.0' },
  duffy2021: { short: 'Duffy et al. 2021', doi: '10.1007/s00590-021-02932-2', licence: 'CC BY 4.0' },
  choi2025: { short: 'Choi et al. 2025', doi: '10.3390/medicina61081457', licence: 'CC BY 4.0' },
  booker2025: { short: 'Booker et al. 2025', doi: '10.1007/s12178-024-09937-4', licence: 'CC BY 4.0' },
  hill2017: { short: 'Hill and Cooke 2017', doi: '10.2174/1874325001711011380', licence: 'CC BY 4.0' },
  schmid2022: { short: 'Schmid et al. 2022', doi: '10.1007/s00330-022-08670-1', licence: 'CC BY 4.0' },
  alanezi2026: { short: 'Alanezi et al. 2026', doi: '10.1093/jscr/rjag022', licence: 'CC BY 4.0' },
  // Renal mass and Bosniak. The Cureus articles state "CC-BY 4.0" in their licence statement;
  // Crossref has no licence for them.
  culap2025: { short: 'Ćulap et al. 2025', doi: '10.3390/diagnostics15111326', licence: 'CC BY 4.0' },
  dev2024: { short: 'Dev et al. 2024', doi: '10.7759/cureus.59956', licence: 'CC BY 4.0' },
  xu2026: { short: 'Xu et al. 2026', doi: '10.3389/fonc.2026.1755717', licence: 'CC BY 4.0' },
  bellin2024: { short: 'Bellin et al. 2024', doi: '10.3390/cancers16101926', licence: 'CC BY 4.0' },
  ahmed2024: { short: 'Ahmed et al. 2024', doi: '10.7759/cureus.55410', licence: 'CC BY 4.0' },
  comune2025: { short: 'Comune et al. 2025', doi: '10.3390/diagnostics15070906', licence: 'CC BY 4.0' },
  qu2023: { short: 'Qu et al. 2023', doi: '10.1186/s12880-023-00972-0', licence: 'CC BY 4.0' },
  // LI-RADS. Prajapati (Cureus) states "CC-BY 4.0"; Crossref has no licence for it.
  schima2018: { short: 'Schima and Heiken 2018', doi: '10.1186/s40644-018-0149-5', licence: 'CC BY 4.0' },
  prajapati2026: { short: 'Prajapati et al. 2026', doi: '10.7759/cureus.113706', licence: 'CC BY 4.0' },
  // O-RADS US and MRI. The IOTA paper's licence statement gives the version only in its URL.
  timmerman2026: { short: 'Timmerman et al. (IOTA) 2026', doi: '10.1002/uog.70191', licence: 'CC BY 4.0' },
  nougaret2024: { short: 'Nougaret et al. 2024', doi: '10.1186/s13244-023-01577-5', licence: 'CC BY 4.0' },
  nikolic2026: { short: 'Nikolić et al. (ESUR) 2026', doi: '10.1186/s13244-025-02174-4', licence: 'CC BY 4.0' },
  // TI-RADS. Pires's licence statement gives no version; its licence URL and Crossref give 4.0.
  pires2022: { short: 'Pires et al. 2022', doi: '10.1590/0100-3984.2020.0141', licence: 'CC BY 4.0' },
  cannella2026: { short: 'Cannella et al. 2026', doi: '10.1186/s13244-025-02154-8', licence: 'CC BY 4.0' },
  // Schatzker
  ristow2025: { short: 'Ristow et al. 2025', doi: '10.1007/s00330-025-11522-3', licence: 'CC BY 4.0' },
  deng2021a: { short: 'Deng et al. 2021a', doi: '10.1186/s13018-021-02265-0', licence: 'CC BY 4.0' },
  biz2025: { short: 'Biz et al. 2025', doi: '10.3390/diagnostics15111304', licence: 'CC BY 4.0' },
  deng2021b: { short: 'Deng et al. 2021b', doi: '10.1186/s13018-021-02660-7', licence: 'CC BY 4.0' },
  // AAST. Berday (Cureus) states "CC-BY 4.0"; Crossref has no licence for it.
  mohammad2025: { short: 'Mohammad et al. 2025', doi: '10.1007/s00247-025-06321-3', licence: 'CC BY 4.0' },
  crone2025: { short: 'Crone et al. 2025', doi: '10.1007/s10140-025-02421-7', licence: 'CC BY 4.0' },
  berday2025: { short: 'Berday et al. 2025', doi: '10.7759/cureus.96501', licence: 'CC BY 4.0' },
  // Lung nodules (Cannella 2026 is above, under TI-RADS)
  revel2025: { short: 'Revel et al. 2025', doi: '10.1007/s00330-025-11910-9', licence: 'CC BY 4.0' },
  baratella2025: { short: 'Baratella et al. 2025', doi: '10.3390/tomography11030028', licence: 'CC BY 4.0' },
  teishikata2026: { short: 'Teishikata et al. 2026', doi: '10.1186/s44215-026-00280-3', licence: 'CC BY 4.0' },
  // PI-RADS (Cannella 2026 is above, under TI-RADS)
  zurowska2023: { short: 'Żurowska et al. 2023', doi: '10.3390/cancers15143682', licence: 'CC BY 4.0' },
  agrotis2026: { short: 'Agrotis et al. 2026', doi: '10.1186/s13244-026-02346-w', licence: 'CC BY 4.0' },
  // Pelvic and foot fractures. Cureus articles state "CC-BY 4.0" (no Crossref licence).
  algaith2026: { short: 'Algaith et al. 2026', doi: '10.3390/jcm15051729', licence: 'CC BY 4.0' },
  leiteMoreira2026: { short: 'Leite-Moreira et al. 2026', doi: '10.7759/cureus.111097', licence: 'CC BY 4.0' },
  zhang2017: { short: 'Zhang et al. 2017', doi: '10.1038/s41598-017-08724-1', licence: 'CC BY 4.0' },
  singh2026: { short: 'Singh et al. 2026', doi: '10.7759/cureus.114457', licence: 'CC BY 4.0' },
  luo2026: { short: 'Luo et al. 2026', doi: '10.1007/s00264-026-06927-8', licence: 'CC BY 4.0' },
  meunier2021: { short: 'Meunier et al. 2021', doi: '10.1080/17453674.2021.1915017', licence: 'CC BY 4.0' },
  chukwuma2026: { short: 'Chukwuma et al. 2026', doi: '10.7759/cureus.101889', licence: 'CC BY 4.0' },
  crone2026: { short: 'Crone et al. 2026', doi: '10.1007/s00256-026-05188-1', licence: 'CC BY 4.0' },
  // Hearing loss CT.
  // The article says "Creative Commons Attribution License"; the publisher's Crossref record gives
  // the version (creativecommons.org/licenses/by/2.0).
  purohit2014: { short: 'Purohit et al. 2014', doi: '10.1007/s13244-014-0313-9', licence: 'CC BY 2.0' },
  // The rest state CC BY 4.0 in the article's licence statement and in Crossref, except Salata,
  // whose article says only "Creative Commons Attribution License"; Crossref gives 4.0.
  ostrander2026: { short: 'Ostrander et al. 2026', doi: '10.3389/fradi.2026.1784554', licence: 'CC BY 4.0' },
  kohler2024: { short: 'Kohler et al. 2024', doi: '10.3390/tomography10050056', licence: 'CC BY 4.0' },
  maillot2016: { short: 'Maillot et al. 2016', doi: '10.1007/s13244-016-0490-9', licence: 'CC BY 4.0' },
  salata2019: { short: 'Salata et al. 2019', doi: '10.1590/0100-3984.2016.0213', licence: 'CC BY 4.0' },
  ge2020: { short: 'Ge et al. 2020', doi: '10.1186/s41016-020-00191-4', licence: 'CC BY 4.0' },
  dorner2024: { short: 'Dörner et al. 2024', doi: '10.1007/s10143-024-02419-8', licence: 'CC BY 4.0' },
  vlachodimitropoulos2026: { short: 'Vlachodimitropoulos et al. 2026', doi: '10.4102/sajr.v30i1.3278', licence: 'CC BY 4.0' },
  pontesMadruga2022: { short: 'Pontes-Madruga et al. 2022', doi: '10.1016/j.bjorl.2020.05.027', licence: 'CC BY 4.0' },
  // Temporal bone CT study
  touska2025: { short: 'Touska and Connor 2025', doi: '10.1007/s00330-024-11021-x', licence: 'CC BY 4.0' },
  gulati2019: { short: 'Gulati et al. 2019', doi: '10.1186/s13244-019-0782-y', licence: 'CC BY 4.0' },
  saat2021: { short: 'Saat et al. 2021', doi: '10.1007/s00062-020-00931-0', licence: 'CC BY 4.0' },
  chow2026: { short: 'Chow et al. 2026', doi: '10.1007/s00234-026-04055-z', licence: 'CC BY 4.0' },
  kloth2023: { short: 'Kloth et al. 2023', doi: '10.3390/tomography9060170', licence: 'CC BY 4.0' },
  // Spine trauma. Utz's licence statement gives no version; its Crossref record gives 2.0. Yoshihara
  // gives 2.0 in its licence link; Crossref has none. Zhang and Song (Frontiers) give 4.0 in Crossref.
  zhangJ2023: { short: 'Zhang et al. 2023', doi: '10.3389/fendo.2023.1132725', licence: 'CC BY 4.0' },
  galluzzo2026: { short: 'Galluzzo et al. 2026', doi: '10.1093/bjrcr/uaag015', licence: 'CC BY 4.0' },
  yoshihara2011: { short: 'Yoshihara et al. 2011', doi: '10.1186/1754-9493-5-25', licence: 'CC BY 2.0' },
  song2026: { short: 'Song et al. 2026', doi: '10.3389/fsurg.2025.1704439', licence: 'CC BY 4.0' },
  utz2014: { short: 'Utz et al. 2014', doi: '10.1007/s13244-013-0304-2', licence: 'CC BY 2.0' },
  // Neer
  lian2022: { short: 'Lian et al. 2022', doi: '10.1186/s12891-022-05931-4', licence: 'CC BY 4.0' },
  chenC2020: { short: 'Chen et al. 2020', doi: '10.1186/s13018-020-01846-9', licence: 'CC BY 4.0' },
  zhou2025: { short: 'Zhou and Cheng 2025', doi: '10.3390/jcm14186660', licence: 'CC BY 4.0' },
  catelas2024: { short: 'Nóbrega Catelas et al. 2024', doi: '10.1007/s00590-024-03969-9', licence: 'CC BY 4.0' },
  // Lichtman. Singh (Cureus) states "CC-BY 4.0"; Crossref has none.
  singhA2024: { short: 'Singh and Reese 2024', doi: '10.7759/cureus.59467', licence: 'CC BY 4.0' },
  afshar2025: { short: 'Afshar et al. 2025', doi: '10.1016/j.tcr.2025.101138', licence: 'CC BY 4.0' },
  chojnowski2022: { short: 'Chojnowski et al. 2022', doi: '10.3390/jcm11030664', licence: 'CC BY 4.0' },
  // Pancreatic cysts
  danti2026: { short: 'Danti et al. 2026', doi: '10.3390/jcm15020585', licence: 'CC BY 4.0' },
  khristenko2024: { short: 'Khristenko et al. 2024', doi: '10.1016/j.ejro.2024.100576', licence: 'CC BY 4.0' },
} as const satisfies Record<string, ScanSource>
