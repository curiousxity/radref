import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** 3D CT for the Hawkins page (`src/pages/HawkinsPage.tsx`). */
export const hawkinsScans = {
  type2b: {
    src: '/scans/hawkins/type-2b.jpg',
    alt: '3D CT reconstruction of the ankle: a displaced talar neck fracture',
    caption: 'Hawkins type 2b (3D CT).',
    source: S.meunier2021,
    figure: 'Fig. 2A',
  },
  type3: {
    src: '/scans/hawkins/type-3.jpg',
    alt: '3D CT reconstruction of the ankle: a talar neck fracture with the body of the talus dislocated',
    caption: 'Hawkins type 3 (3D CT).',
    source: S.meunier2021,
    figure: 'Fig. 2B',
  },
} satisfies Record<string, ScanImage>
