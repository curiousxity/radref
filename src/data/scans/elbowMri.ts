import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the elbow mri study (`src/studies/ElbowMriStudy.tsx`). */
export const elbowMriScans = {
  capitellarOcd: {
    src: '/scans/elbow-mri/capitellar-ocd.jpg',
    alt: 'Coronal fat-suppressed proton-density MRI of the elbow with a focal defect in the articular surface of the capitellum and bright edema in the bone beneath it.',
    caption: 'Osteochondritis dissecans of the capitellum on a coronal fat-suppressed proton-density MR image: a full-thickness chondral defect of the capitellum with edema of the subchondral bone.',
    source: S.matkovic2024,
    figure: 'Fig. 1b',
  },
  uclTear: {
    src: '/scans/elbow-mri/ucl-tear.jpg',
    alt: 'Coronal fat-suppressed proton-density MRI of the elbow with fluid replacing the proximal ulnar collateral ligament at the medial epicondyle, plus bright marrow in the radial head and capitellum.',
    caption: 'Acute full-thickness proximal tear of the anterior bundle of the ulnar (medial) collateral ligament after a fall on the outstretched arm, on coronal fat-suppressed proton-density MRI (grey arrow on the right of the image, at the medial epicondyle). The asterisk marks flexor digitorum superficialis muscle edema, and the two white arrows on the left mark radial head and posterior capitellar contusions.',
    source: S.acosta2019,
    figure: 'Fig. 14a',
  },
  luclTear: {
    src: '/scans/elbow-mri/lucl-tear.jpg',
    alt: 'Coronal fat-suppressed proton-density MRI of the elbow with a large fluid collection lateral to the capitellum where the lateral ligaments and extensor tendon have pulled off the lateral epicondyle.',
    caption: 'Posterolateral rotatory instability, stage 2, on coronal fat-suppressed proton-density MRI: complete detachment of the proximal lateral ulnar collateral ligament, the radial collateral ligament proper and the common extensor tendon from the lateral epicondyle (short arrow), with retraction of the LUCL (arrowhead) and of the common extensor tendon (long arrow). Joint fluid extravasates through the tear (asterisk).',
    source: S.acosta2019,
    figure: 'Fig. 24',
  },
  flexorTendinosis: {
    src: '/scans/elbow-mri/flexor-tendinosis.jpg',
    alt: 'Coronal fat-suppressed proton-density MRI of the medial elbow showing a thickened common flexor tendon origin of intermediate signal at the medial epicondyle, with bright edema in the adjacent muscle.',
    caption: 'Common flexor tendinosis in a 45-year-old man with medial elbow pain, on coronal fat-suppressed proton-density MRI: intermediate signal within a diffusely thickened common flexor tendon origin (arrow), with edema in the flexor digitorum superficialis and palmaris longus muscles (asterisk).',
    source: S.acosta2019,
    figure: 'Fig. 10b',
  },
  commonExtensorTear: {
    src: '/scans/elbow-mri/common-extensor-tear.jpg',
    alt: 'Coronal fat-suppressed proton-density MRI of the lateral elbow with a bright fluid-filled gap where the common extensor tendon should attach to the lateral epicondyle.',
    caption: 'Full-thickness tear of the common extensor tendon at its lateral epicondyle origin in a patient with lateral elbow pain, on coronal fat-suppressed proton-density MRI (arrow).',
    source: S.acosta2019,
    figure: 'Fig. 9c',
  },
  bicepsPartialTear: {
    src: '/scans/elbow-mri/biceps-partial-tear.jpg',
    alt: 'Sagittal STIR MRI of the elbow and proximal forearm showing a thickened, bright distal biceps tendon near the radial tuberosity, with a fluid-filled bursa in front of it.',
    caption: 'High-grade partial tear of the distal biceps tendon on sagittal STIR MRI: the tendon is thickened with increased signal (solid white arrow), with fluid in the bicipitoradial bursa (dashed white arrow) and osseous changes at the radial tuberosity (black arrow).',
    source: S.nayyar2011,
    figure: 'Fig. 1',
  },
  bicepsRetraction: {
    src: '/scans/elbow-mri/biceps-retraction.jpg',
    alt: 'Sagittal T2-weighted MRI of the arm with a fluid-filled gap in front of the elbow where the distal biceps tendon has torn and retracted, and a measuring line about 98 mm long.',
    caption: 'Chronic full-thickness rupture of the distal biceps tendon on sagittal T2-weighted MRI, with the tendon retracted and a gap of about 10 cm; the measuring line (98.21 mm) spans the gap.',
    source: S.metikala2022,
    figure: 'Fig. 2a',
  },
  ulnarNeuritis: {
    src: '/scans/elbow-mri/ulnar-neuritis.jpg',
    alt: 'Axial fat-suppressed proton-density MRI of the elbow at the cubital tunnel with an enlarged, bright ulnar nerve behind the medial epicondyle.',
    caption: 'Ulnar neuropathy in a 60-year-old woman with pain, muscle weakness and paresthesias: axial fat-suppressed proton-density MRI shows an enlarged, hyperintense ulnar nerve in the cubital tunnel (arrow).',
    source: S.acosta2019,
    figure: 'Fig. 11a',
  },
} satisfies Record<string, ScanImage>
