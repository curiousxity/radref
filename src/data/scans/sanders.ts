import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Coronal CT for the Sanders page (`src/pages/SandersPage.tsx`). */
export const sandersScans = {
  type2: {
    src: '/scans/sanders/type-2.jpg',
    alt: 'Coronal CT of the calcaneus: one fracture line through the posterior facet',
    caption: 'Sanders type II on coronal CT (panel A2).',
    source: S.luo2026,
    figure: 'Fig. 1A',
  },
  type3: {
    src: '/scans/sanders/type-3.jpg',
    alt: 'Coronal CT of the calcaneus: two fracture lines through the posterior facet',
    caption: 'Sanders type III on coronal CT (panel B2).',
    source: S.luo2026,
    figure: 'Fig. 1B',
  },
  type4: {
    src: '/scans/sanders/type-4.jpg',
    alt: 'Coronal CT of the calcaneus: a comminuted posterior facet in several pieces',
    caption: 'Sanders type IV on coronal CT (panel C2).',
    source: S.luo2026,
    figure: 'Fig. 1C',
  },
} satisfies Record<string, ScanImage>
