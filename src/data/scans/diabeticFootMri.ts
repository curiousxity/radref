import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the diabetic foot mri study (`src/studies/DiabeticFootMriStudy.tsx`). */
export const diabeticFootMriScans = {
  sinusTract: {
    src: '/scans/diabetic-foot-mri/sinus-tract.jpg',
    alt: 'Sagittal STIR MRI of a Charcot foot with a bright track running from a plantar skin ulcer up to the cuboid, marked by a star, and arrowheads on marrow edema in the hindfoot bones',
    caption: 'Sagittal STIR image of a patient with a plantar ulcer beneath the cuboid in a rocker-bottom Charcot foot: infection spreads contiguously from the skin as a sinus tract (arrow at the sole) to the cuboid (white star). Arrowheads mark bone marrow edema from active Charcot disease.',
    source: S.rosskopf2019,
    figure: 'Fig. 20b',
  },
  abscess: {
    src: '/scans/diabetic-foot-mri/abscess.jpg',
    alt: 'Sagittal contrast-enhanced fat-suppressed T1 MRI of the forefoot showing a small ring-enhancing collection next to the first metatarsal head, with enhancing marrow marked by asterisks',
    caption: 'Post-contrast fat-suppressed T1-weighted image in a 57-year-old diabetic man with a forefoot ulcer: a thick rim-enhancing dorsal abscess lies next to the first metatarsal head (long arrow), and a sinus tract with rim-like enhancement (small arrow) extends near the first proximal interphalangeal joint. Enhancement in the first metatarsal and proximal phalanx (asterisks) indicates osteomyelitis.',
    source: S.lauri2020,
    figure: 'Fig. 3',
  },
  calcanealOsteomyelitis: {
    src: '/scans/diabetic-foot-mri/calcaneal-osteomyelitis.jpg',
    alt: 'Sagittal T1-weighted MRI of the hindfoot with a large heel ulcer reaching the calcaneus and confluent dark marrow replacing the fat of the calcaneus',
    caption: 'Sagittal T1-weighted image in a diabetic woman: a large ulcer at the plantar heel (arrows) communicates with the inferior calcaneus, and the normal fatty marrow of the calcaneus is replaced (arrowheads), representing osteomyelitis.',
    source: S.alaia2021,
    figure: 'Fig. 15A',
  },
  hazyReticularT1: {
    src: '/scans/diabetic-foot-mri/hazy-reticular-t1.jpg',
    alt: 'Coronal T1-weighted MRI of the forefoot with patchy, hazy low signal in the fourth metatarsal head where marrow fat is still partly visible',
    caption: 'Coronal T1-weighted image of the forefoot in a man with prior fourth- and fifth-toe amputations and a recurrent ulcer: hazy reticulated low T1 signal in the fourth metatarsal head, with relative preservation of marrow fat signal (arrow).',
    source: S.tiegsHeiden2023,
    figure: 'Fig. 3A',
  },
  septicArthritis: {
    src: '/scans/diabetic-foot-mri/septic-arthritis.jpg',
    alt: 'Coronal fat-suppressed T2 MRI of a toe with bright edema around the proximal interphalangeal joint capsule and surrounding soft tissues',
    caption: 'Coronal T2 fat-suppressed image of the second digit: marked edema of the proximal interphalangeal joint capsule and surrounding soft tissues from synovitis due to septic arthritis (arrows). In the same patient, T1 marrow replacement next to an erosion indicated osteomyelitis.',
    source: S.alaia2021,
    figure: 'Fig. 9A',
  },
  ghostSignT1: {
    src: '/scans/diabetic-foot-mri/ghost-sign-t1.jpg',
    alt: 'Sagittal T1-weighted MRI of a Charcot hindfoot in which the outline of the talus has faded into a diffuse dark area, marked by a ring of arrows',
    caption: 'Charcot foot complicated by osteomyelitis: on the sagittal T1-weighted image, diffuse marrow change in the talus makes its bony contours disappear (arrows). This is the first half of the ghost sign; compare the post-contrast image.',
    source: S.rosskopf2019,
    figure: 'Fig. 21b',
  },
  ghostSignContrast: {
    src: '/scans/diabetic-foot-mri/ghost-sign-contrast.jpg',
    alt: 'Sagittal contrast-enhanced fat-suppressed T1 MRI of the same Charcot hindfoot in which the outline of the talus is visible again, marked by a ring of arrows',
    caption: 'Same foot after contrast (sagittal fat-suppressed T1): the bone contours of the talus reappear (arrows). Disappearance on T1 with reappearance after contrast is the ghost sign, which the authors note is described as pathognomonic for osteomyelitis in the Charcot foot but has not been evaluated for accuracy.',
    source: S.rosskopf2019,
    figure: 'Fig. 21c',
  },
} satisfies Record<string, ScanImage>
