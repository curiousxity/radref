import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiographs and 3D CT for the Neer page (`src/pages/NeerPage.tsx`). */
export const neerScans = {
  twoPart: {
    src: '/scans/neer/two-part.jpg',
    alt: 'AP radiograph of the shoulder: a displaced fracture through the surgical neck of the humerus',
    caption: 'Displaced two-part fracture of the surgical neck; 69-year-old.',
    source: S.lian2022,
    figure: 'Fig. 1A',
  },
  threePart: {
    src: '/scans/neer/three-part.jpg',
    alt: '3D CT reconstruction of the shoulder: a three-part fracture of the proximal humerus',
    caption: 'Three-part fracture on 3D CT; 79-year-old.',
    source: S.chenC2020,
    figure: 'Fig. 1b',
  },
  fourPartValgus: {
    src: '/scans/neer/four-part-valgus.jpg',
    alt: 'AP radiograph of the shoulder: an impacted proximal humerus fracture with the head tilted into valgus',
    caption: 'Valgus-impacted four-part fracture, with the medial hinge preserved.',
    source: S.zhou2025,
    figure: 'Fig. 2A',
  },
  greaterTuberosity: {
    src: '/scans/neer/greater-tuberosity.jpg',
    alt: 'AP radiograph of the shoulder: a small fragment pulled off the greater tuberosity',
    caption: 'Greater tuberosity fracture, avulsion type (circled).',
    source: S.catelas2024,
    figure: 'Fig. 2A',
  },
} satisfies Record<string, ScanImage>
