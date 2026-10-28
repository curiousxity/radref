import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Pelvic radiographs for the Young-Burgess page (`src/pages/YoungBurgessPage.tsx`). */
export const youngBurgessScans = {
  apc: {
    src: '/scans/young-burgess/apc.jpg',
    alt: 'AP pelvic radiograph: the pubic symphysis is widely separated',
    caption: 'Anteroposterior compression ("open book"): the disrupted symphysis measures 60 mm.',
    source: S.algaith2026,
    figure: 'Fig. 2A',
  },
  lc: {
    src: '/scans/young-burgess/lc.jpg',
    alt: 'AP pelvic radiograph: a fracture of the left iliac wing and fractures of the pubic rami on both sides',
    caption: 'Lateral compression type III: a left crescent iliac fracture and bilateral iliopubic and ischiopubic rami fractures (arrows).',
    source: S.leiteMoreira2026,
    figure: 'Fig. 1',
  },
} satisfies Record<string, ScanImage>
