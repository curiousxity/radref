import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the ankle X-ray study (`src/studies/AnkleXrayStudy.tsx`). */
export const ankleXrayScans = {
  weberA: {
    src: '/scans/ankle-xray/weber-a.jpg',
    alt: 'Mortise radiograph of the right ankle: a small displaced fracture of the tip of the lateral malleolus below the level of the syndesmosis, marked with a white arrow',
    caption: 'Mortise view of the right ankle: a displaced Weber A lateral malleolar fracture (white arrow), with normal lateral, superior and medial clear spaces.',
    source: S.surmanowicz2025,
    figure: 'Fig. 1',
  },
  weberB: {
    src: '/scans/ankle-xray/weber-b.jpg',
    alt: 'Mortise radiograph of the right ankle: an oblique fracture of the distal fibula at the level of the tibial plafond, marked with a white arrow',
    caption: 'Mortise view of the right ankle: a displaced Weber B lateral malleolar fracture (white arrow), with normal lateral, superior and medial clear spaces.',
    source: S.surmanowicz2025,
    figure: 'Fig. 2',
  },
  weberC: {
    src: '/scans/ankle-xray/weber-c.jpg',
    alt: 'Mortise radiograph of the right ankle: a fibular fracture above the syndesmosis (white arrow), a widened gap between tibia and fibula (chevron) and a widened medial clear space (curved arrow)',
    caption: 'Mortise view of the right ankle: a displaced Weber C lateral malleolar fracture (white arrow), with widening of the medial clear space (curved arrow) and of the lateral clear space (chevron), but a normal superior clear space.',
    source: S.surmanowicz2025,
    figure: 'Fig. 3',
  },
  clearSpaces: {
    src: '/scans/ankle-xray/clear-spaces.jpg',
    alt: 'Mortise radiograph of a normal ankle with three short double-headed arrows marking the tibiofibular, superior and medial clear spaces',
    caption: 'How the clear spaces are measured: the medial clear space (solid line) between the medial border of the talus and the medial malleolus at the level of the talar dome, the lateral (distal tibiofibular) clear space (dotted line) between the fibular notch and the medial edge of the fibula, and the superior clear space (dashed line) from the top of the talar dome to the plafond.',
    source: S.surmanowicz2025,
    figure: 'Fig. 4',
  },
  tfcsWidening: {
    src: '/scans/ankle-xray/tfcs-widening.jpg',
    alt: 'Mortise radiograph of the ankle taken through a splint, with a horizontal line labelled 7 mm across a widened gap between the distal tibia and fibula',
    caption: 'Widening of the tibiofibular clear space on a mortise radiograph in a 20-year-old man after a fall: the tibiofibular distance measures 7 mm, and the medial clear space is also widened, indicating deltoid ligament insufficiency as well.',
    source: S.crone2026,
    figure: 'Fig. 5b',
  },
  stressView: {
    src: '/scans/ankle-xray/stress-view.jpg',
    alt: 'Mortise ankle radiograph taken under external rotation stress, with a dotted measurement line labelled 5.0 mm across the medial clear space',
    caption: 'External rotation stress radiograph (mortise) in a supination-external rotation ankle fracture: the medial clear space widens to 5.0 mm (B). On the unstressed mortise view of the same ankle (panel A, not shown) it measured 3.7 mm.',
    source: S.zeni2023,
    figure: 'Fig. 1B',
  },
  maisonneuveFibula: {
    src: '/scans/ankle-xray/maisonneuve-fibula.jpg',
    alt: 'Frontal radiograph of the upper leg below the knee: an oblique fracture line through the proximal fibular shaft, marked with a white arrowhead',
    caption: 'Frontal radiograph of the tibia in a 42-year-old man injured during a parachute landing: a spiral fracture of the proximal fibula (white arrowhead). With his medial and posterior malleolar fractures, the findings are consistent with a Maisonneuve fracture.',
    source: S.tafti2020,
    figure: 'Fig. 10c',
  },
  maisonneuveAnkle: {
    src: '/scans/ankle-xray/maisonneuve-ankle.jpg',
    alt: 'Oblique mortise radiograph of the ankle with a white arrow at a fine fracture of the medial malleolus; the distal fibula shows no fracture',
    caption: 'Oblique mortise view of the same patient\'s ankle: a nondisplaced fracture of the medial malleolus (white arrow). The fibular fracture is in the proximal shaft, off this film.',
    source: S.tafti2020,
    figure: 'Fig. 10b',
  },
  posteriorMalleolus: {
    src: '/scans/ankle-xray/posterior-malleolus.jpg',
    alt: 'Lateral radiograph of the ankle and hindfoot: a white arrow at a small fracture fragment of the posterior lip of the distal tibia',
    caption: 'Lateral radiograph of the ankle in the same 42-year-old man: a mildly displaced fracture of the posterior malleolus (white arrow).',
    source: S.tafti2020,
    figure: 'Fig. 10a',
  },
  lateralProcessCt: {
    src: '/scans/ankle-xray/lateral-process-ct.jpg',
    alt: 'Coronal CT of the ankle: a separate fragment from the lateral process of the talus beneath the tip of the fibula, with soft-tissue swelling around the medial malleolus',
    caption: 'CT of a 29-year-old man after a bicycle accident: fracture of the lateral process of the talus, with soft-tissue swelling around the medial malleolus. His AP and lateral radiographs showed only obscure fracture lines of the lateral process.',
    source: S.jin2022,
    figure: 'Fig. 1c',
  },
} satisfies Record<string, ScanImage>
