import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the ankle mri study (`src/studies/AnkleMriStudy.tsx`). */
export const ankleMriScans = {
  talarOsteochondralLesion: {
    src: '/scans/ankle-mri/talar-osteochondral-lesion.jpg',
    alt: 'Coronal MR image of the ankle with arrow 1 on an osteochondral lesion of the talar dome and arrows 2 on subchondral bone marrow edema.',
    caption: 'Stable, non-displaced osteochondral lesion of the talus (1) with subchondral bone marrow edema (2), in a 29-year-old man with 4 months of medial ankle pain.',
    source: S.szaro2020,
    figure: 'Fig. 18A',
  },
  atflTear: {
    src: '/scans/ankle-mri/atfl-tear.jpg',
    alt: 'Axial fat-saturated MR image at the level of the proximal talus with a black arrow on a torn anterior talofibular ligament and asterisks on soft-tissue edema.',
    caption: 'Axial dual proton fat-saturated image at the level of the proximal talus in a 37-year-old man after inversion trauma: complete tear of the superior fibres of the anterior talofibular ligament (arrow), with surrounding soft-tissue edema (asterisks).',
    source: S.gonzalezGutierrez2025,
    figure: 'Fig. 9C',
  },
  aitflTear: {
    src: '/scans/ankle-mri/aitfl-tear.jpg',
    alt: 'Axial fat-saturated MR image at the level of the distal tibiofibular syndesmosis with a black arrow on a torn anterior tibiofibular ligament.',
    caption: 'Axial dual proton fat-saturated image at the level of the distal tibiofibular syndesmosis in the same 37-year-old man after inversion trauma: tear of the anterior tibiofibular ligament (arrow).',
    source: S.gonzalezGutierrez2025,
    figure: 'Fig. 9A',
  },
  springLigamentTear: {
    src: '/scans/ankle-mri/spring-ligament-tear.jpg',
    alt: 'Coronal fat-saturated proton density MR image of the hindfoot with a white arrow on a torn tibiospring ligament and a black arrow on a torn spring ligament.',
    caption: 'PD-weighted fat-saturated coronal image in a patient with progressive collapsing foot deformity: complete tear of the tibiospring ligament with residual proximal fibres (white arrow) and a torn spring ligament (black arrow).',
    source: S.andres2024,
    figure: 'Fig. 3B',
  },
  tibialisPosteriorTear: {
    src: '/scans/ankle-mri/tibialis-posterior-tear.jpg',
    alt: 'Axial MR image of the ankle with arrow 1 on a partially ruptured tibialis posterior tendon and arrow 2 on bone marrow edema in the medial malleolus.',
    caption: 'Partial rupture of the tibialis posterior tendon (1) and bone marrow edema in the medial malleolus (2), in a 65-year-old man with chronic ankle pain 3 weeks after trauma.',
    source: S.szaro2020,
    figure: 'Fig. 8B',
  },
  peronealSplitTear: {
    src: '/scans/ankle-mri/peroneal-split-tear.jpg',
    alt: 'Fat-suppressed proton density MR image below the lateral malleolus with arrows on a split peroneus brevis tendon, its tenosynovitis and a normal peroneus longus.',
    caption: 'Proton density-weighted fat-suppressed image in a patient with chronic lateral ankle pain: peroneus brevis split tear just below the level of the lateral malleolus with the boomerang sign (straight arrow), tenosynovitis (dashed arrow) and a normal peroneus longus tendon (curved arrow).',
    source: S.bokwaDabrowska2025,
    figure: 'Fig. 9b',
  },
  achillesRupture: {
    src: '/scans/ankle-mri/achilles-rupture.jpg',
    alt: 'Fat-suppressed sagittal MR image of the ankle with an arrow on a fluid-filled gap in a ruptured Achilles tendon above the calcaneal insertion.',
    caption: 'Fat-suppressed sagittal 3.0-T image in the acute phase: full-thickness rupture of the Achilles tendon about 6.1 cm proximal to the calcaneal insertion, with a 3.7 cm gap occupied by high-signal inflammatory fluid (arrow).',
    source: S.ortiz2026,
    figure: 'Fig. 1A',
  },
  tarsalTunnelGanglion: {
    src: '/scans/ankle-mri/tarsal-tunnel-ganglion.jpg',
    alt: 'Axial fat-saturated T2-weighted MR image of the ankle with arrowheads on a multilobulated cyst in the tarsal tunnel and an arrow on the adjacent tibial nerve.',
    caption: 'Tarsal tunnel syndrome caused by a ganglion cyst in a 32-year-old patient: axial T2-weighted fat-saturated image showing a multilobulated cystic structure in the tarsal tunnel (arrowheads) next to the tibial nerve (arrow).',
    source: S.dong2012,
    figure: 'Fig. 20b',
  },
  plantarFasciitis: {
    src: '/scans/ankle-mri/plantar-fasciitis.jpg',
    alt: 'Sagittal T1-weighted MR image of the ankle and heel with an arrow on a thickened proximal plantar fascia just beyond its calcaneal origin.',
    caption: 'Sagittal T1-weighted image of the ankle showing moderate thickening of the plantar fascia proximally, just distal to its origin, indicative of plantar fasciitis.',
    source: S.kothari2023,
    figure: 'Fig. 5',
  },
  anteriorImpingementOsteophytes: {
    src: '/scans/ankle-mri/anterior-impingement-osteophytes.jpg',
    alt: 'Sagittal fat-suppressed MR image of the ankle with two arrows on osteophytes at the anterior margin of the distal tibia and the talar neck.',
    caption: 'Anterior impingement in a 22-year-old soccer player with chronic anterior ankle pain and no specific injury: osteophytes (arrows) with bone marrow edema.',
    source: S.szaro2020,
    figure: 'Fig. 19',
  },
  anteriorFibrousBandImpingement: {
    src: '/scans/ankle-mri/anterior-fibrous-band-impingement.jpg',
    alt: 'Axial proton-density fat-saturated MR image of the ankle with an arrow on a thin dark band crossing fluid in the anterior joint recess and an asterisk on the effusion.',
    caption: 'Web impingement after an ankle sprain: a fibrous band (arrow) traverses the anterior talocrural recess, with joint effusion (asterisk). Arthroscopy confirmed a fibrous band spanning the recess.',
    source: S.soualili2025,
    figure: 'Fig. 3b',
  },
} satisfies Record<string, ScanImage>
