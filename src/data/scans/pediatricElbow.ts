import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiographs for the paediatric elbow study's Learn tab (`src/studies/PediatricElbowStudy.tsx`). */
export const pediatricElbowScans = {
  ossificationCentres: {
    src: '/scans/pediatric-elbow/ossification-centres.jpg',
    alt: 'AP radiograph of a normal elbow in a 10-year-old girl, with the six ossification centres lettered',
    caption: 'Normal elbow at 10 years, with all six centres: capitellum (A), radial head (B), internal epicondyle (C), trochlea (D), olecranon (E) and external epicondyle (F).',
    source: S.schmid2022,
    figure: 'Fig. 1a',
  },
  // Lahfafa's Fig. 1 has no caption in the full text; the captions here quote the case report's
  // description of it.
  fatPads: {
    src: '/scans/pediatric-elbow/fat-pads.jpg',
    alt: 'Lateral radiograph of a child’s elbow with arrows at the displaced fat pads in front of and behind the distal humerus',
    caption: 'A positive fat pad sign due to joint effusion (arrows).',
    source: S.lahfafa2020,
    figure: 'Fig. 1',
  },
  anteriorHumeralLine: {
    src: '/scans/pediatric-elbow/anterior-humeral-line.jpg',
    alt: 'Lateral radiograph of a child’s elbow with a dotted line along the front of the humerus passing in front of the capitellum',
    caption: 'The anterior humeral line (dotted) passes in front of the capitellum, suggesting posterior (extension) displacement of the distal humerus.',
    source: S.duffy2021,
    figure: 'Fig. 2',
  },
  monteggia: {
    src: '/scans/pediatric-elbow/monteggia.jpg',
    alt: 'Lateral radiograph of a 3-year-old’s elbow: the radial head lies in front of the capitellum, and the proximal ulna is broken',
    caption: 'Bado type I Monteggia fracture in a 3-year-old: anterior dislocation of the radial head with a fracture of the proximal ulna.',
    source: S.choi2025,
    figure: 'Fig. 1A',
  },
  supracondylarType1: {
    src: '/scans/pediatric-elbow/supracondylar-type-1.jpg',
    alt: 'Lateral radiograph of a child’s elbow with an undisplaced supracondylar fracture',
    caption: 'Supracondylar fracture, type 1 (lateral view).',
    source: S.booker2025,
    figure: 'Fig. 1A',
  },
  supracondylarType2: {
    src: '/scans/pediatric-elbow/supracondylar-type-2.jpg',
    alt: 'Lateral radiograph of a child’s elbow: the distal fragment is tilted back with the posterior cortex still in contact',
    caption: 'Supracondylar fracture, type 2 (lateral view).',
    source: S.booker2025,
    figure: 'Fig. 2B',
  },
  supracondylarType3: {
    src: '/scans/pediatric-elbow/supracondylar-type-3.jpg',
    alt: 'Lateral radiograph of a child’s elbow: the distal humerus is completely displaced from the shaft',
    caption: 'Supracondylar fracture, type 3 (lateral view).',
    source: S.booker2025,
    figure: 'Fig. 3A',
  },
  lateralCondyle: {
    src: '/scans/pediatric-elbow/lateral-condyle.jpg',
    alt: 'AP radiograph of a child’s elbow: the lateral condyle fragment is displaced and rotated',
    caption: 'Lateral condyle fracture, Jakob type 3.',
    source: S.hill2017,
    figure: 'Fig. 8',
  },
  medialEpicondyleEntrapped: {
    src: '/scans/pediatric-elbow/medial-epicondyle-entrapped.jpg',
    alt: 'AP radiograph of a child’s elbow with the ossification centres circled and medial soft-tissue swelling marked',
    caption: 'The medial epicondyle (I, dashed) is displaced and entrapped in the joint between the coronoid process and the trochlea; capitellum (C) and radius (R) centres are in place, with medial soft tissue swelling (arrowheads).',
    source: S.lahfafa2020,
    figure: 'Fig. 1',
  },
  radialNeck: {
    src: '/scans/pediatric-elbow/radial-neck.jpg',
    alt: 'Lateral radiograph of a child’s elbow: the radial head is tipped off the neck',
    caption: 'Radial neck fracture, Judet type IV.',
    source: S.hill2017,
    figure: 'Fig. 11',
  },
  dislocation: {
    src: '/scans/pediatric-elbow/dislocation.jpg',
    alt: 'Lateral radiograph of a child’s left elbow: the olecranon lies behind the distal humerus',
    caption: 'Elbow dislocation: posterior displacement of the olecranon, here with a lateral condyle fragment.',
    source: S.alanezi2026,
    figure: 'Fig. 1b',
  },
} satisfies Record<string, ScanImage>
