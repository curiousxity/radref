import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the foot X-ray study (`src/studies/FootXrayStudy.tsx`). */
export const footXrayScans = {
  lisfrancFractureDislocation: {
    src: '/scans/foot-xray/lisfranc-fracture-dislocation.jpg',
    alt: 'AP radiograph of the foot: arrowheads on a widened gap between the first and second metatarsal bases, a black arrow at the middle cuneiform and white arrows at fractures of the third and fourth metatarsal bases',
    caption: 'Lisfranc fracture-dislocation on the AP view: widening of the space between the first and second metatarsal bases (arrowheads), the second metatarsal base out of line with the middle cuneiform (black arrow on its medial margin), and fractures of the bases of the third and fourth metatarsals (white arrows).',
    source: S.wong2015,
    figure: 'Fig. 5a',
  },
  lisfrancMalalignment: {
    src: '/scans/foot-xray/lisfranc-malalignment.jpg',
    alt: 'AP radiograph of the foot with a dashed line along the medial margin of the second metatarsal that does not continue along the medial margin of the middle cuneiform',
    caption: 'A Lisfranc fracture-dislocation in another patient: the dashed lines show the second metatarsal base out of line with the middle cuneiform (they should be in the same line), with widening of the space between the first and second metatarsal bases.',
    source: S.wong2015,
    figure: 'Fig. 5d',
  },
  lisfrancLateralDislocation: {
    src: '/scans/foot-xray/lisfranc-lateral-dislocation.jpg',
    alt: 'AP radiograph of the left foot: the bases of the lesser metatarsals are shifted laterally off the cuneiforms and cuboid at the tarsometatarsal joints',
    caption: 'Lisfranc injury in a 34-year-old man after a fall: the AP radiograph shows partial incongruity of the tarsometatarsal joint with lateral dislocation.',
    source: S.kim2021,
    figure: 'Fig. 1B',
  },
  bohlerReduced: {
    src: '/scans/foot-xray/bohler-reduced.jpg',
    alt: 'Lateral radiograph of the hindfoot with a calcaneal fracture and two nearly parallel lines drawn across the top of the calcaneus, marking a Böhler angle of 2°',
    caption: 'Preoperative lateral radiograph of a calcaneal fracture with Böhler\'s angle drawn: it measures 2° (after surgery, 35°).',
    source: S.sturzJantsch2025,
    figure: 'Fig. 1a',
  },
  bohlerNormal: {
    src: '/scans/foot-xray/bohler-normal.jpg',
    alt: 'Weight-bearing lateral radiograph of a normal hindfoot with lines A and B drawn from the posterior facet to the anterior process and to the tuberosity, forming a 30° Böhler angle',
    caption: 'Measuring Böhler\'s angle on a weight-bearing lateral radiograph: a line from the tip of the anterior process to the top of the posterior facet (A) and a line from the posterior facet to the top of the tuberosity (B), here 30°. Normal values range from 25° to 40°; under 25° suggests depression of the articular surface.',
    source: S.crone2026,
    figure: 'Fig. 7',
  },
  talarFractureLateral: {
    src: '/scans/foot-xray/talar-fracture-lateral.jpg',
    alt: 'Lateral radiograph of the ankle and hindfoot: a white arrow at the fractured talus; T marks the tibia and F the fibula',
    caption: 'Talar fracture with a bimalleolar fracture in a 57-year-old man after a motorcycle accident, on the lateral plain film (arrow, talus; T, tibia; F, fibula). CT confirmed a talar neck fracture.',
    source: S.chen2020,
    figure: 'Fig. 2',
  },
  hawkinsSign: {
    src: '/scans/foot-xray/hawkins-sign.jpg',
    alt: 'AP radiograph of the ankle after fixation of bimalleolar and talar fractures: a white arrow at the medial talar dome below the medial malleolus',
    caption: 'The same patient 3 months after surgery: the Hawkins sign is noted on the AP view (arrow).',
    source: S.chen2020,
    figure: 'Fig. 8A',
  },
  metatarsalStressFracture: {
    src: '/scans/foot-xray/metatarsal-stress-fracture.jpg',
    alt: 'Dorsoplantar radiograph of the forefoot: two white arrowheads beside the shaft of the second metatarsal, along a thin layer of periosteal new bone',
    caption: 'Stress fracture of the right second metatarsal in a 17-year-old: the dorsoplantar radiograph, taken one month later, shows periosteal appositions along the second metatarsal (arrowheads).',
    source: S.palka2025,
    figure: 'Fig. 9A',
  },
} satisfies Record<string, ScanImage>
