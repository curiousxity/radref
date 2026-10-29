import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the foot mri study (`src/studies/FootMriStudy.tsx`). */
export const footMriScans = {
  calcaneonavicularCoalition: {
    src: '/scans/foot-mri/calcaneonavicular-coalition.jpg',
    alt: 'Sagittal fat-suppressed MR image of the hindfoot and midfoot with a solid arrow on a calcaneonavicular coalition and a dashed arrow on adjacent bone marrow edema.',
    caption: 'Calcaneonavicular coalition (solid arrow) with adjacent bone marrow edema (dashed arrow), in a 51-year-old woman with diffuse pain in the ankle and Chopart joints and suspected osteoarthritis.',
    source: S.szaro2020,
    figure: 'Fig. 24B',
  },
  navicularStressFracture: {
    src: '/scans/foot-mri/navicular-stress-fracture.jpg',
    alt: 'T1-weighted MR image through the hindfoot and midfoot with arrow 2 on a stress fracture of the navicular bone.',
    caption: 'T1-weighted coronal image in an 18-year-old woman with diffuse pain at the navicular: stress fracture of the navicular bone (2). The T2-weighted fat-suppressed panel of the same figure shows extensive bone marrow edema.',
    source: S.szaro2020,
    figure: 'Fig. 14b',
  },
  lisfrancRupture: {
    src: '/scans/foot-mri/lisfranc-rupture.jpg',
    alt: 'Oblique axial MRI of the midfoot with an arrow on disrupted, bright tissue between the medial cuneiform and the base of the second metatarsal.',
    caption: 'Complete rupture of the Lisfranc ligament (arrow). In the same patient, radiographs and CT showed a widened gap between the medial cuneiform and the second metatarsal base, with an avulsion fracture at the base.',
    source: S.liu2025,
    figure: 'Fig. 1d',
  },
  metatarsalStressFracture: {
    src: '/scans/foot-mri/metatarsal-stress-fracture.jpg',
    alt: 'T1-weighted MR image of the forefoot with an arrow on a low-signal fracture line in the proximal fourth metatarsal shaft.',
    caption: 'T1-weighted image in a 68-year-old man: edematous intraosseous signal in the proximal third of the fourth metatarsal shaft, surrounding a serpiginous low-signal line (arrow), the appearance of a semi-recent stress fracture.',
    source: S.palka2025,
    figure: 'Fig. 9B',
  },
  freibergInfraction: {
    src: '/scans/foot-mri/freiberg-infraction.jpg',
    alt: 'Fat-suppressed T2-weighted MR image of the forefoot with an arrow on a deformed second metatarsal head with bone edema.',
    caption: 'T2-weighted fat-suppressed image in a 21-year-old woman with late degenerative-stage Freiberg disease of the second metatarsal: deformity and hypertrophy of the head with edematous bone signal (arrow).',
    source: S.palka2025,
    figure: 'Fig. 10A',
  },
  sesamoiditis: {
    src: '/scans/foot-mri/sesamoiditis.jpg',
    alt: 'Sagittal T2-weighted MR image of the first metatarsophalangeal joint with an arrow on a high-signal bipartite medial sesamoid and an arrowhead on synovitis.',
    caption: 'Sagittal T2-weighted image in a 65-year-old woman with months of unexplained foot pain: increased signal in the posterior part of a bipartite medial sesamoid (arrow), with reactive synovitis and soft-tissue inflammation (arrowhead), in favour of medial hallux sesamoiditis.',
    source: S.palka2025,
    figure: 'Fig. 3C',
  },
  plantarPlateTear: {
    src: '/scans/foot-mri/plantar-plate-tear.jpg',
    alt: 'Sagittal fat-suppressed T2-weighted MR image of the second toe with an arrow on a ruptured plantar plate and a star on the second metatarsal head.',
    caption: 'Sagittal fat-suppressed T2-weighted image in a 34-year-old woman with second ray syndrome: rupture of the plantar plate (arrow) with dorsal subluxation of the proximal phalanx, synovitis, and high subchondral signal on the plantar side of the second metatarsal head (star).',
    source: S.palka2025,
    figure: 'Fig. 8B',
  },
  mortonNeuroma: {
    src: '/scans/foot-mri/morton-neuroma.jpg',
    alt: 'Coronal T1-weighted MR image across the metatarsal heads with an arrow on an intermediate-signal mass in the third intermetatarsal space.',
    caption: 'Morton neuroma in a 38-year-old patient: coronal T1-weighted image showing a tear-drop-shaped soft-tissue mass of intermediate signal in the third intermetatarsal space (arrow).',
    source: S.dong2012,
    figure: 'Fig. 22b',
  },
  osPeroneumPeroneusLongusSplit: {
    src: '/scans/foot-mri/os-peroneum-peroneus-longus-split.jpg',
    alt: 'Sagittal fat-suppressed MR image of the lateral hindfoot with arrow 1 on a split peroneus longus tendon and arrow 2 on an os peroneum with bone marrow edema.',
    caption: 'Split rupture of the peroneus longus tendon (1) at the level of an os peroneum with bone marrow edema (2), in a 32-year-old handball player with lateral ankle pain after a match.',
    source: S.szaro2020,
    figure: 'Fig. 22B',
  },
} satisfies Record<string, ScanImage>
