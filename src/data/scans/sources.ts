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
} as const satisfies Record<string, ScanSource>
