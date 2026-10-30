import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Examples for the Mayfield page (`src/pages/MayfieldPage.tsx`). */
export const mayfieldScans = {
  stage1: {
    src: '/scans/mayfield/stage1.jpg',
    alt: 'Frontal (PA) wrist radiograph with an arrow pointing to a widened gap between the scaphoid and the lunate.',
    caption: 'Stage I, scapholunate dissociation: PA radiograph showing widening of the scapholunate joint (arrow).',
    source: S.okoro2023,
    figure: 'Fig. 27a',
  },
  stage1Mri: {
    src: '/scans/mayfield/stage1-mri.jpg',
    alt: 'Coronal fat-suppressed MR arthrogram of the wrist with an arrow at the scapholunate interval, where the ligament is disrupted.',
    caption: 'Stage I, scapholunate ligament disruption: coronal T1 fat-suppressed MR arthrogram showing disruption of the scapholunate ligament (arrow).',
    source: S.okoro2023,
    figure: 'Fig. 27b',
  },
  stage3: {
    src: '/scans/mayfield/stage3.jpg',
    alt: 'Lateral wrist radiograph with an arrow at the lunate, showing the capitate no longer sitting in line with the lunate.',
    caption: 'Perilunate dislocation (stage II or III, as reviews label it differently): lateral radiograph of a dorsal perilunate dislocation showing loss of collinearity between the lunate and the capitate (arrow). The same wrist also had a comminuted distal radius fracture.',
    source: S.sakaria2026,
    figure: 'Fig. 1B',
  },
  stage4: {
    src: '/scans/mayfield/stage4.jpg',
    alt: 'Lateral wrist radiograph showing the lunate tipped forward out of the radius, in the tipped teacup position.',
    caption: 'Stage IV, lunate dislocation: lateral radiograph showing an anteriorly dislocated lunate, rotated about 90° (the \'tipped teacup\' appearance).',
    source: S.okoro2023,
    figure: 'Fig. 30b',
  },
  greaterArc: {
    src: '/scans/mayfield/greater-arc.jpg',
    alt: 'Frontal (PA) wrist radiograph of a trans-scaphoid perilunate fracture-dislocation, with a fractured scaphoid and disrupted carpal alignment.',
    caption: 'Greater arc injury: PA radiograph of a trans-scaphoid perilunate fracture-dislocation.',
    source: S.rachunekMedved2025,
    figure: 'Fig. 1b',
  },
  stage2: {
    src: '/scans/mayfield/stage2.jpg',
    alt: 'Sagittal CT of the wrist showing the lunate still seated on the distal radius while the capitate has left the lunate\'s concavity and sits dorsal to it.',
    caption: 'Stage II, capitolunate disruption: sagittal CT showing dorsal dislocation of the capitate in a stage two perilunate dislocation.',
    source: S.okoro2023,
    figure: 'Fig. 28',
  },
} satisfies Record<string, ScanImage>
