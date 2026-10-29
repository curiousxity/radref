import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Examples for the Herbert page (`src/pages/HerbertPage.tsx`). */
export const herbertScans = {
  typeA1: {
    src: '/scans/herbert/type-a1.jpg',
    alt: 'Radiograph of the radial side of the wrist with two white arrowheads marking a fracture line across the scaphoid tubercle',
    caption: 'Type A1, tubercle fracture: radiograph of a stable scaphoid fracture of the tubercle (arrowheads) in a 33-year-old woman.',
    source: S.neubauer2026,
    figure: 'Fig. 2A',
  },
  typeA2: {
    src: '/scans/herbert/type-a2.jpg',
    alt: 'Sagittal-oblique cone beam CT of the scaphoid with a white arrow at a thin fracture line entering the dorsal cortex of the mid-third and stopping short of the volar cortex',
    caption: 'Type A2, incomplete waist fracture: sagittal-oblique cone beam CT showing an incomplete acute fracture on the dorsal aspect of the scaphoid mid-third (arrow), occult on radiographs.',
    source: S.dietrich2026,
    figure: 'Fig. 1b',
  },
  typeB1: {
    src: '/scans/herbert/type-b1.jpg',
    alt: 'Sagittal CT of the scaphoid with two white arrowheads at either end of an oblique fracture through the distal part of the bone',
    caption: 'Type B1, oblique distal fracture: CT of an extended oblique type B1 scaphoid fracture (arrowheads) in a 28-year-old man; only part of the fracture line is visible on CT.',
    source: S.neubauer2026,
    figure: 'Fig. 3C',
  },
  typeB2: {
    src: '/scans/herbert/type-b2.jpg',
    alt: 'Coronal CT of the scaphoid with a white arrowhead at a transverse fracture line across the waist',
    caption: 'Type B2, complete waist fracture: CT of a slightly displaced transverse type B2 scaphoid fracture (arrowhead) in a 45-year-old man; it was not visible on radiographs, which were suboptimal because of pain.',
    source: S.neubauer2026,
    figure: 'Fig. 3H',
  },
  typeB3: {
    src: '/scans/herbert/type-b3.jpg',
    alt: 'Sagittal-oblique CT of the scaphoid with a white arrow at a gapped fracture through the proximal pole, its dorsal margin displaced',
    caption: 'Type B3, proximal pole fracture: sagittal-oblique CT along the scaphoid\'s long axis showing a proximal pole fracture with significant displacement of the dorsal fracture margin (arrow).',
    source: S.dietrich2026,
    figure: 'Fig. 2c',
  },
  typeB4: {
    src: '/scans/herbert/type-b4.jpg',
    alt: 'Posteroanterior wrist radiograph with disrupted carpal alignment, a fractured scaphoid and overlapping carpal bones',
    caption: 'Type B4, trans-scaphoid perilunate fracture-dislocation: posteroanterior radiograph from the imaging series of a trans-scaphoid perilunate fracture-dislocation.',
    source: S.rachunekMedved2025,
    figure: 'Fig. 1b',
  },
  typeD2: {
    src: '/scans/herbert/type-d2.jpg',
    alt: 'Posteroanterior wrist radiograph with two white arrows at a lucent gap across the scaphoid with sclerotic margins',
    caption: 'Type D2, sclerotic non-union: posteroanterior radiograph of an untreated scaphoid non-union with sclerosis of the fracture margins (arrows).',
    source: S.okoro2023,
    figure: 'Fig. 6b',
  },
  typeB5: {
    src: '/scans/herbert/type-b5.jpg',
    alt: 'Coronal CT of the wrist cropped to the carpus, showing the scaphoid above the distal radius broken into several pieces, with small separate fragments along its radial border.',
    caption: 'Herbert type B5: preoperative coronal CT of a comminuted fracture of the scaphoid body, which the authors classify as Herbert type B5. The fragments are not marked in the source.',
    source: S.marzella2024,
    figure: 'Fig. 2',
  },
} satisfies Record<string, ScanImage>
