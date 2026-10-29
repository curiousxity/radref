import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Examples for the Palmer page (`src/pages/PalmerPage.tsx`). */
export const palmerScans = {
  class1a: {
    src: '/scans/palmer/class1a.jpg',
    alt: 'Coronal wrist MRI with a white box over the triangular fibrocartilage, panel letter A and label IA',
    caption: 'Palmer 1A, central perforation: coronal MRI of a traumatic TFCC injury labelled IA by the authors, with the lesion boxed.',
    source: S.zhao2024,
    figure: 'Fig. 1A',
  },
  class1b: {
    src: '/scans/palmer/class1b.jpg',
    alt: 'Coronal fat-suppressed T2-weighted wrist MRI with an arrow at the ulnar fovea pointing to the torn TFCC attachment',
    caption: 'Palmer 1B, ulnar avulsion: coronal fat-suppressed T2-weighted MRI showing complete avulsion of the deep radioulnar ligament at the ulnar fovea (arrow).',
    source: S.wang2026,
    figure: 'Fig. 2A',
  },
  class1c: {
    src: '/scans/palmer/class1c.jpg',
    alt: 'Coronal wrist MRI with a white box at the ulnar side of the carpus, panel letter E and label IC',
    caption: 'Palmer 1C, distal avulsion: coronal MRI of a traumatic TFCC injury labelled IC by the authors, with the lesion boxed.',
    source: S.zhao2024,
    figure: 'Fig. 1E',
  },
  class1d: {
    src: '/scans/palmer/class1d.jpg',
    alt: 'Coronal wrist MRI with a white box over the triangular fibrocartilage region, panel letter F and label ID',
    caption: 'Palmer 1D, radial avulsion: coronal MRI of a traumatic TFCC injury labelled ID by the authors, with the lesion boxed.',
    source: S.zhao2024,
    figure: 'Fig. 1F',
  },
  class2d: {
    src: '/scans/palmer/class2d.jpg',
    alt: 'Ultrasound of the ulnar side of the wrist with the ulna, radius, lunate, triquetrum and ECU tendon labelled, showing a gap in a thin articular disc (arrowhead) and a disrupted lunotriquetral ligament (arrow).',
    caption: 'Palmer class 2D: ultrasound showing a large central tear of a thin articular disc (arrowhead) and rupture of the lunotriquetral ligament (arrow). The source, using an ultrasound grading modified from Palmer\'s, calls this a class 2D TFCC injury.',
    source: S.wu2019,
    figure: 'Fig. 16C',
  },
} satisfies Record<string, ScanImage>
