import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Foot radiographs for the Lisfranc (Myerson) page (`src/pages/MyersonPage.tsx`). */
export const lisfrancScans = {
  fleck: {
    src: '/scans/lisfranc/fleck.jpg',
    alt: 'AP radiograph of the foot: a small bone fragment circled between the first and second metatarsal bases',
    caption: 'Lisfranc ligament avulsion fracture, the "fleck" (circled).',
    source: S.chukwuma2026,
    figure: 'Fig. 2A',
  },
  diastasis: {
    src: '/scans/lisfranc/diastasis.jpg',
    alt: 'Weightbearing radiograph of the foot: a 4 mm gap between the medial cuneiform and the second metatarsal base',
    caption: 'Lisfranc diastasis on a weightbearing radiograph: the gap between the medial cuneiform and second metatarsal base measures 4 mm.',
    source: S.crone2026,
    figure: 'Fig. 19',
  },
} satisfies Record<string, ScanImage>
