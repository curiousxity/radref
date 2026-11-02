import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the elbow X-ray study (`src/studies/ElbowXrayStudy.tsx`). */
export const elbowXrayScans = {
  fatPads: {
    src: '/scans/elbow-xray/fat-pads.jpg',
    alt: 'Lateral radiograph of an adult right elbow flexed at 90 degrees, with a white arrow at the lifted anterior fat pad in front of the distal humerus and a dark arrow at the visible posterior fat pad behind it',
    caption: 'Joint effusion with no visible fracture in a 19-year-old woman: the displaced fat pads are seen anteriorly (white arrow) and posteriorly (dark arrow).',
    source: S.huhtanen2022,
    figure: 'Fig. 8c',
  },
  terribleTriad: {
    src: '/scans/elbow-xray/terrible-triad.jpg',
    alt: 'Lateral radiograph of a left elbow with the ulna and radius displaced behind the distal humerus, a broken radial head and a fragment off the front of the ulna',
    caption: 'Terrible triad injury: the preoperative lateral view shows posterior dislocation of the left elbow with fractures of the radial head and coronoid process.',
    source: S.wang2023,
    figure: 'Fig. 2a',
  },
  coronoid: {
    src: '/scans/elbow-xray/coronoid.jpg',
    alt: 'Lateral radiograph of a reduced left elbow with a small separate bone fragment lying in front of the joint, off the tip of the coronoid process',
    caption: 'Coronoid fracture on the post-reduction lateral view of the left elbow of a 37-year-old man with a terrible triad injury; CT classed it as Regan-Morrey type I.',
    source: S.barati2023,
    figure: 'Fig. 1',
  },
  doubleArc: {
    src: '/scans/elbow-xray/double-arc.jpg',
    alt: 'Lateral radiograph of the elbow with two concentric curved lines in front of the distal humerus, marked by a large arrow on the outer arc and a small arrow on the inner arc',
    caption: 'The double-arc sign of a coronal shear fracture: the larger arc (large arrow) is the capitellum and the smaller arc (small arrow) the trochlea.',
    source: S.bellato2022,
    figure: 'Fig. 5',
  },
  monteggiaPosterior: {
    src: '/scans/elbow-xray/monteggia-posterior.jpg',
    alt: 'Lateral radiograph of a right elbow with an arrow at the radial head displaced behind the capitellum and another arrow at a fracture of the proximal ulna',
    caption: 'Monteggia type IID fracture-dislocation in a 67-year-old woman: a fracture of the proximal ulna involving the coronoid and olecranon (lower arrow), with posterior displacement and fracture of the radial head (upper arrow).',
    source: S.uchoa2024,
    figure: 'Fig. 1a',
  },
  monteggiaAnterior: {
    src: '/scans/elbow-xray/monteggia-anterior.jpg',
    alt: 'Lateral radiograph of an adult forearm and elbow with labelled arrows at the radial head dislocated in front of the capitellum, an angulated fracture of the ulnar shaft and a comminuted olecranon fracture',
    caption: 'Monteggia lesion in a 39-year-old man after an all-terrain vehicle accident: anterior dislocation of the radial head, with an apex-anterior fracture of the ulnar shaft (with a butterfly fragment) and a comminuted fracture of the olecranon.',
    source: S.moldovan2025,
    figure: 'Fig. 1',
  },
  galeazzi: {
    src: '/scans/elbow-xray/galeazzi.jpg',
    alt: 'Lateral radiograph of an adult right wrist and distal forearm with an angulated fracture of the distal radial shaft and the ulnar head displaced out of line with the radius at the wrist',
    caption: 'Pronation-type Galeazzi fracture-dislocation of the right wrist in a 57-year-old woman: lateral view in the emergency room.',
    source: S.zaher2024,
    figure: 'Fig. 1b',
  },
} satisfies Record<string, ScanImage>
