import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the hand X-ray study (`src/studies/HandXrayStudy.tsx`). */
export const handXrayScans = {
  cmcFractureDislocationOblique: {
    src: '/scans/hand-xray/cmc-fracture-dislocation-oblique.jpg',
    alt: 'Oblique radiograph of the hand with four black arrows along the carpometacarpal joints of the index to little fingers, where the metacarpal bases overlap the distal carpal row',
    caption: 'Oblique radiograph of the hand of a 21-year-old man after a motorcycle accident, showing fracture-dislocations of the second to fifth carpometacarpal joints (arrows).',
    source: S.valdesMedina2026,
    figure: 'Fig. 2',
  },
  cmcDorsalDislocationLateral: {
    src: '/scans/hand-xray/cmc-dorsal-dislocation-lateral.jpg',
    alt: 'Lateral radiograph of the hand and wrist: the bases of the finger metacarpals sit behind (dorsal to) the distal carpal row instead of in line with it',
    caption: 'Lateral radiograph showing dorsal dislocation at the carpometacarpal joints, in a 22-year-old man after a motor vehicle accident (fracture-dislocation of the second to fifth rays).',
    source: S.kalatzis2024,
    figure: 'Fig. 1',
  },
  boxerFractureOblique: {
    src: '/scans/hand-xray/boxer-fracture-oblique.jpg',
    alt: 'Oblique radiograph of the hand with an arrow at a fracture of the neck of the fifth metacarpal, the head tipped towards the palm',
    caption: 'Boxer\'s fracture: oblique radiograph showing an extra-articular, comminuted fracture of the neck of the fifth metacarpal with volar angulation (arrow).',
    source: S.hussain2020,
    figure: 'Fig. 2',
  },
  bennettFracture: {
    src: '/scans/hand-xray/bennett-fracture.jpg',
    alt: 'Radiograph of the thumb with two white arrows at an oblique fracture through the base of the first metacarpal entering the joint',
    caption: 'Bennett fracture: an oblique intra-articular fracture at the base of the first metacarpal (arrows).',
    source: S.wong2015b,
    figure: 'Fig. 7',
  },
  rolandoFracture: {
    src: '/scans/hand-xray/rolando-fracture.jpg',
    alt: 'AP radiograph of the thumb base with two white arrows at a comminuted fracture of the base of the first metacarpal, subluxed at the joint with the trapezium',
    caption: 'Rolando fracture with subluxation of the carpometacarpal joint of the first metacarpal, AP radiograph (arrows), in a 34-year-old.',
    source: S.florek2024,
    figure: 'Fig. 1',
  },
  pipDorsalFractureSubluxation: {
    src: '/scans/hand-xray/pip-dorsal-fracture-subluxation.jpg',
    alt: 'Lateral radiograph of the little finger with a white arrow at the dorsally subluxed PIP joint and a black arrow at a small fragment from the volar base of the middle phalanx',
    caption: 'Dorsal fracture-subluxation of the PIP joint of the little finger in a 27-year-old man: lateral radiograph showing dorsal subluxation of the joint (white arrow) with a bony avulsion from the base of the middle phalanx (black arrow).',
    source: S.barrached2023,
    figure: 'Fig. 1B',
  },
  bonyMallet: {
    src: '/scans/hand-xray/bony-mallet.jpg',
    alt: 'Lateral radiograph of a finger with a small bone fragment pulled off the dorsal base of the distal phalanx at the DIP joint',
    caption: 'Bony mallet finger: lateral radiograph with a dorsal fragment avulsed from the base of the distal phalanx.',
    source: S.stumpfe2023,
    figure: 'Fig. 1b',
  },
  thumbUclAvulsion: {
    src: '/scans/hand-xray/thumb-ucl-avulsion.jpg',
    alt: 'PA radiograph of the thumb with a white arrow at a small fracture fragment at the ulnar corner of the base of the proximal phalanx',
    caption: 'Bony avulsion of the thumb ulnar collateral ligament: palmodorsal radiograph showing a minimally displaced fracture at the ulnar base of the proximal phalanx (arrow).',
    source: S.manneck2021,
    figure: 'Fig. 3b',
  },
  foreignBody: {
    src: '/scans/hand-xray/foreign-body.jpg',
    alt: 'AP radiograph of the fingers with a small bright metallic dot in the soft tissue beside the middle finger\'s PIP joint and a black arrow at erosion of the proximal phalanx',
    caption: 'Retained metallic foreign body in a 72-year-old man with pain for 2 years after hitting his hand on a solid object: AP radiograph showing the metal fragment in the soft tissues of the middle finger at the PIP joint, with erosion of the proximal phalanx (arrow).',
    source: S.sabir2024,
    figure: 'Fig. 1a',
  },
} satisfies Record<string, ScanImage>
