import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Examples for the Mason page (`src/pages/MasonPage.tsx`). */
export const masonScans = {
  type1: {
    src: '/scans/mason/type1.jpg',
    alt: 'Frontal radiograph of a right elbow, cropped to the joint, showing a faint undisplaced fissure line in the radial head articular surface with no step.',
    caption: 'Mason type I: anteroposterior radiograph of a radial head fracture. The fracture line is faint and is not marked in the source.',
    source: S.nietschke2018,
    figure: 'Fig. 1a',
  },
  type2: {
    src: '/scans/mason/type2.jpg',
    alt: 'Frontal radiograph of the elbow showing the lateral part of the radial head broken off and displaced, with a step in the articular surface.',
    caption: 'Mason type II: anteroposterior radiograph of a Mason type II radial head fracture.',
    source: S.muller2023,
    figure: 'Fig. 1A',
  },
  type2Ct: {
    src: '/scans/mason/type2-ct.jpg',
    alt: 'Axial CT through the proximal radioulnar joint showing the radial head split into two parts by a fracture line with a gap between the fragments.',
    caption: 'Mason type II: axial CT of a Mason type II radial head fracture, from a case the source also shows on preoperative radiographs.',
    source: S.harbrecht2021,
    figure: 'Fig. 7c',
  },
  type3: {
    src: '/scans/mason/type3.jpg',
    alt: 'Frontal radiograph of the elbow showing the radial head broken into several fragments across its whole width.',
    caption: 'Mason type III: anteroposterior radiograph of a comminuted radial head fracture.',
    source: S.scoscina2023,
    figure: 'Fig. 1a',
  },
  type4: {
    src: '/scans/mason/type4.jpg',
    alt: 'Lateral radiograph of the elbow showing the forearm bones dislocated posteriorly from the distal humerus, with a fractured radial head.',
    caption: 'Mason type IV: lateral radiograph of a Mason type IV injury, which the source defines as a radial head fracture with posterior dislocation.',
    source: S.jordan2017,
    figure: 'Fig. 4',
  },
} satisfies Record<string, ScanImage>
