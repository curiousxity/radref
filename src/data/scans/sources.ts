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
} as const satisfies Record<string, ScanSource>
