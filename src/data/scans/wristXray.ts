import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the wrist X-ray study (`src/studies/WristXrayStudy.tsx`). */
export const wristXrayScans = {
  trueLateral: {
    src: '/scans/wrist-xray/true-lateral.jpg',
    alt: 'Lateral wrist radiograph with three vertical dashed lines through the capitate (C), pisiform (P) and distal scaphoid pole (S), the pisiform line falling between the other two',
    caption: 'A true lateral radiograph: the palmar cortex of the pisiform (P) lies over the central third of the interval between the palmar cortices of the distal scaphoid pole (S) and the capitate head (C), the scaphopisocapitate alignment.',
    source: S.clark2025,
    figure: 'Fig. 1',
  },
  gilulaArcs: {
    src: '/scans/wrist-xray/gilula-arcs.jpg',
    alt: 'PA wrist radiograph with three numbered dashed curves: arc 1 along the proximal carpal row\'s proximal surfaces, arcs 2 and 3 close together along the midcarpal joint',
    caption: 'Gilula\'s arcs on a PA radiograph: arc 1 outlines the proximal surfaces and arc 2 the distal surfaces of the scaphoid, lunate and triquetrum; arc 3 outlines the proximal surfaces of the capitate and hamate.',
    source: S.okoro2023,
    figure: 'Fig. 1',
  },
  collesLateral: {
    src: '/scans/wrist-xray/colles-lateral.jpg',
    alt: 'Lateral wrist radiograph with two white arrows at a transverse fracture of the distal radial metaphysis, the distal fragment tilted slightly dorsally',
    caption: 'Colles fracture: lateral radiograph of a transverse distal radial metaphyseal fracture (arrows) with no intra-articular extension and mild dorsal angulation of the distal fragment, the angulation that distinguishes it from a Smith fracture.',
    source: S.wong2015b,
    figure: 'Fig. 5a',
  },
  scaphoidUlnarDeviation: {
    src: '/scans/wrist-xray/scaphoid-ulnar-deviation.jpg',
    alt: 'Posteroanterior ulnar-deviated radiograph of the carpus with a rectangular box drawn over the scaphoid, where a faint fracture line crosses the bone',
    caption: 'Occult scaphoid fracture on a posteroanterior ulnar-deviation radiograph, outlined by the box an AI detection program drew; the case was indeterminate on radiographs and the fracture was confirmed on CT.',
    source: S.hernaizFerrer2025,
    figure: 'Fig. 4a',
  },
  occultScaphoidFollowUp: {
    src: '/scans/wrist-xray/occult-scaphoid-follow-up.jpg',
    alt: 'AP wrist radiograph with a white arrow at a lucent fracture line across the scaphoid',
    caption: 'Repeat AP radiograph 12 days after the injury, in a 26-year-old man with wrist pain after an assault, showing an obvious scaphoid fracture (arrow); on the first AP radiograph a subtle lucency had been overlooked, and the first scaphoid view was negative.',
    source: S.jarraya2013,
    figure: 'Fig. 3c',
  },
  triquetralDorsalFracture: {
    src: '/scans/wrist-xray/triquetral-dorsal-fracture.jpg',
    alt: 'Lateral wrist radiograph with two white arrows at a small bone chip just behind the dorsal surface of the proximal carpal row',
    caption: 'Dorsal triquetral fracture in a 30-year-old man: the lateral radiograph shows a chip fracture off the dorsal aspect of the triquetrum (arrows), while the AP radiograph looked normal.',
    source: S.jarraya2013,
    figure: 'Fig. 4b',
  },
  scaphoidFatStripe: {
    src: '/scans/wrist-xray/scaphoid-fat-stripe.jpg',
    alt: 'AP wrist radiograph with a thick white arrow at the scaphoid and a thin arrow at the swollen soft tissue on the radial side of the wrist',
    caption: 'AP radiograph in a 53-year-old man after a fall from 2 m: a fracture of the scaphoid neck (thick arrow), with dense, oedematous soft tissue on the lateral side of the wrist obliterating the scaphoid fat stripe (thin arrow).',
    source: S.miyahara2022,
    figure: 'Fig. 6',
  },
} satisfies Record<string, ScanImage>
