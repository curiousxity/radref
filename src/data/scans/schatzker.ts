import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and radiographs for the Schatzker page (`src/pages/SchatzkerPage.tsx`). */
export const schatzkerScans = {
  type1: {
    src: '/scans/schatzker/type-1.jpg',
    alt: 'Coronal CT of the knee: a thin undisplaced fracture line through the lateral tibial plateau',
    caption: 'Type I, nondisplaced, on coronal CT (arrowhead).',
    source: S.ristow2025,
    figure: 'Fig. 2E',
  },
  type2: {
    src: '/scans/schatzker/type-2.jpg',
    alt: 'Coronal CT of the knee: the lateral tibial plateau is split, widened and depressed',
    caption: 'Type II: lateral plateau fracture with widening of the plateau and articular depression (coronal CT).',
    source: S.deng2021a,
    figure: 'Fig. 2c',
  },
  type5: {
    src: '/scans/schatzker/type-5.jpg',
    alt: 'Coronal CT of the knee: fractures through both the medial and lateral tibial plateaus',
    caption: 'Type V: bicondylar fracture (coronal CT).',
    source: S.biz2025,
    figure: 'Fig. 3E',
  },
  type6: {
    src: '/scans/schatzker/type-6.jpg',
    alt: 'AP radiograph of the knee: both plateaus broken and the proximal tibial metaphysis fractured from the shaft',
    caption: 'Type VI: widening of the plateau and comminution of the articular surface, with a metaphyseal fracture.',
    source: S.deng2021b,
    figure: 'Fig. 2',
  },
  type6Ct: {
    src: '/scans/schatzker/type-6-ct.jpg',
    alt: 'Coronal CT of the knee: a displaced fracture through both plateaus extending into the metaphysis',
    caption: 'Type VI: displaced bicondylar fracture (coronal CT).',
    source: S.ristow2025,
    figure: 'Fig. 3E',
  },
} satisfies Record<string, ScanImage>
