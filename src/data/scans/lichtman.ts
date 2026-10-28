import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiographs and MRI for the Lichtman (Kienböck) page (`src/pages/LichtmanPage.tsx`). */
export const lichtmanScans = {
  stage1: {
    src: '/scans/lichtman/stage-1.jpg',
    alt: 'Coronal T1-weighted MRI of the wrist: the lunate is dark throughout',
    caption: 'Diffuse low T1 signal in the lunate with normal radiographs: the stage I MRI finding.',
    source: S.singhA2024,
    figure: 'Fig. 1',
  },
  stage2: {
    src: '/scans/lichtman/stage-2.jpg',
    alt: 'PA radiograph of the wrist: a dense, sclerotic lunate of normal shape',
    caption: 'Stage II: increased density and sclerosis of the lunate, with positive ulnar variance.',
    source: S.afshar2025,
    figure: 'Fig. 1',
  },
  stage3a: {
    src: '/scans/lichtman/stage-3a.jpg',
    alt: 'PA radiograph of the wrist: the lunate has collapsed but carpal height is kept',
    caption: 'Stage IIIA: collapse of the lunate with carpal height preserved.',
    source: S.chojnowski2022,
    figure: 'Fig. 2a',
  },
  stage3b: {
    src: '/scans/lichtman/stage-3b.jpg',
    alt: 'PA radiograph of the wrist: a collapsed lunate with the carpus unstable and the scaphoid rotated',
    caption: 'Stage IIIB: lunate collapse with carpal instability and scaphoid rotation.',
    source: S.chojnowski2022,
    figure: 'Fig. 3a',
  },
  stage4: {
    src: '/scans/lichtman/stage-4.jpg',
    alt: 'PA radiograph of the wrist: a collapsed lunate with arthritis of the radiocarpal joint',
    caption: 'Stage IV: lunate collapse with advanced degeneration of the radiocarpal and radioulnar joints.',
    source: S.afshar2025,
    figure: 'Fig. 2',
  },
} satisfies Record<string, ScanImage>
