import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the knee X-ray study (`src/studies/KneeXrayStudy.tsx`). */
export const kneeXrayScans = {
  segond: {
    src: '/scans/knee-xray/segond.jpg',
    alt: 'Frontal radiograph of a right knee with an arrow at a thin sliver of bone lifted off the lateral rim of the tibial plateau, just below the joint line',
    caption: 'Segond fracture in a 59-year-old woman: an avulsion fracture of the lateral tibial plateau with minimal displacement (arrow), on the AP view.',
    source: S.adwan2025,
    figure: 'Fig. 1',
  },
  arcuateSign: {
    src: '/scans/knee-xray/arcuate-sign.jpg',
    alt: 'Frontal radiograph of a left knee showing a small displaced bone fragment pulled off the top of the fibular head, lateral to the tibial plateau',
    caption: 'Avulsion fracture of the fibular head (the arcuate sign), on the preoperative AP view.',
    source: S.paul2025,
    figure: 'Fig. 8a',
  },
  lateralFemoralNotch: {
    src: '/scans/knee-xray/lateral-femoral-notch.jpg',
    alt: 'Lateral radiograph of the knee zoomed on the lateral femoral condyle, with a line drawn across a depression in its articular surface and a short perpendicular tick measuring its depth, marked by a black arrow',
    caption: 'Deep lateral femoral notch sign in an ACL-deficient knee: the depth is measured from a line drawn over the condyle (long line) to the deepest point of the depression (short perpendicular line, black arrow).',
    source: S.lodewijks2019,
    figure: 'Fig. 1',
  },
  patellaAlta: {
    src: '/scans/knee-xray/patella-alta.jpg',
    alt: 'Lateral radiograph of a right knee in flexion with the patella riding high above the femoral condyles, well above its usual place in the trochlea',
    caption: 'Patella alta on the lateral view of the right knee of a 31-year-old man, consistent with complete rupture of the patellar tendon.',
    source: S.wood2026,
    figure: 'Fig. 1',
  },
  patellarFracture: {
    src: '/scans/knee-xray/patellar-fracture.jpg',
    alt: 'Lateral radiograph of a flexed left knee with the patella broken transversely into a large upper fragment and a small lower fragment pulled far apart, with a measuring line between them',
    caption: 'Transverse patellar fracture in a 52-year-old man who tripped on uneven pavement: lateral view with 56 mm of distraction between the fragments (measured line).',
    source: S.potla2023,
    figure: 'Fig. 1',
  },
  bipartitePatella: {
    src: '/scans/knee-xray/bipartite-patella.jpg',
    alt: 'Frontal radiograph of a left knee with an arrow at a small well-corticated bone fragment lying above the upper outer corner of the patella',
    caption: 'Separation of a Saupe type III bipartite patella in a 61-year-old man after a fall; the arrow marks the separated anterosuperior patellar fragment.',
    source: S.kroustalakis2025,
    figure: 'Fig. 1a',
  },
  hoffa: {
    src: '/scans/knee-xray/hoffa.jpg',
    alt: 'Lateral radiograph of a left knee with an arrow at the back of the femoral condyles, where a coronal fracture has displaced the posterior part of the lateral condyle',
    caption: 'Lateral Hoffa fracture in a 61-year-old man after a fall from a truck bed: the lateral view shows displacement and comminution of the articular surface, with the fracture line marked (arrow).',
    source: S.kitamura2023,
    figure: 'Fig. 1b',
  },
} satisfies Record<string, ScanImage>
