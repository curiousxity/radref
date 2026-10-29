import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiographs for the fifth metatarsal page (`src/pages/FifthMetatarsalPage.tsx`). */
export const fifthMetatarsalScans = {
  zones: {
    src: '/scans/fifth-metatarsal/zones.jpg',
    alt: 'Oblique radiograph of the fifth metatarsal with lines dividing the base into zones 1, 2 and 3',
    caption: 'The Lawrence and Botte zones on an oblique radiograph: 1, tuberosity; 2, Jones; 3, proximal diaphysis.',
    source: S.rikken2020,
    figure: 'Fig. 1',
  },
  zone1: {
    src: '/scans/fifth-metatarsal/zone-1.jpg',
    alt: 'Radiograph of the lateral midfoot: a fracture through the tip of the fifth metatarsal tuberosity, arrowed',
    caption: 'A fracture at the base of the fifth metatarsal after a twisting injury (arrow).',
    source: S.alZayer2025,
    figure: 'Fig. 1',
  },
  zone2: {
    src: '/scans/fifth-metatarsal/zone-2.jpg',
    alt: 'Radiograph of the fifth metatarsal: a transverse lucent line across the metaphyseal-diaphyseal junction',
    caption: 'Jones fracture in a 19-year-old sumo wrestler, at presentation.',
    source: S.hoshino2019,
    figure: 'Fig. 1a',
  },
  zone3: {
    src: '/scans/fifth-metatarsal/zone-3.jpg',
    alt: 'Radiograph of the lateral foot: a thin transverse line across the proximal shaft of the fifth metatarsal',
    caption: 'Transverse stress fracture of the proximal fifth metatarsal in an elite athlete (not arrowed in the original).',
    source: S.sauer2017,
    figure: 'Fig. 2',
  },
  apophysis: {
    src: '/scans/fifth-metatarsal/apophysis.jpg',
    alt: 'Child’s foot radiograph: a box drawn around the normal apophysis beside the fifth metatarsal base',
    caption: 'The normal apophysis in an 8-year-old, boxed as a fracture by an AI detection tool: a false positive.',
    source: S.ziegner2025,
    figure: 'Fig. 2',
  },
  osVesalianum: {
    src: '/scans/fifth-metatarsal/os-vesalianum.jpg',
    alt: 'Oblique radiograph: a small round ossicle just proximal to the fifth metatarsal tuberosity, arrowed',
    caption: 'An incidental small os vesalianum (arrow).',
    source: S.aparisiGomez2019,
    figure: 'Fig. 16',
  },
  osPeroneum: {
    src: '/scans/fifth-metatarsal/os-peroneum.jpg',
    alt: 'Lateral radiograph: a small ossicle under the cuboid, marked with a curved arrow',
    caption: 'An incidental os peroneum (curved arrow).',
    source: S.aparisiGomez2019,
    figure: 'Fig. 7',
  },
  ununitedFragment: {
    src: '/scans/fifth-metatarsal/ununited-fragment.jpg',
    alt: 'Oblique radiograph: a rounded fragment off the fifth metatarsal tuberosity with a fracture line between them',
    caption: 'An old non-united fracture fragment of the apophysis (black arrow), with the fracture line visible (white arrow); it can resemble an os vesalianum.',
    source: S.aparisiGomez2019,
    figure: 'Fig. 17',
  },
} satisfies Record<string, ScanImage>
