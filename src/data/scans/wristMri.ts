import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI examples for the wrist mri study (`src/studies/WristMriStudy.tsx`). */
export const wristMriScans = {
  occultScaphoidFracture: {
    src: '/scans/wrist-mri/occult-scaphoid-fracture.jpg',
    alt: 'Coronal MRI of the wrist with bright marrow edema filling the scaphoid and a dark fracture line marked by an arrow.',
    caption: 'A radiographically occult scaphoid fracture: the coronal MR image shows a hypointense fracture line (arrow) with diffuse bone marrow oedema in the scaphoid.',
    source: S.dietrich2026,
    figure: 'Fig. 1c',
  },
  kienbock: {
    src: '/scans/wrist-mri/kienbock.jpg',
    alt: 'Coronal T1-weighted MRI of the wrist with a small, uniformly dark lunate among normally bright carpal bones, and two arrows near the lunate and the distal ulna.',
    caption: 'Kienböck disease on coronal T1-weighted MRI of the left wrist: decreased signal intensity in the lunate, representing osteonecrosis (upper arrow). The lower arrow marks negative ulnar variance.',
    source: S.thomas2025,
    figure: 'Fig. 2a',
  },
  scapholunateTear: {
    src: '/scans/wrist-mri/scapholunate-tear.jpg',
    alt: 'Coronal STIR MRI of the wrist with a widened, fluid-filled gap between the scaphoid and the lunate, labelled S, L, C and R, and an arrow at the torn ligament.',
    caption: 'Scapholunate dissociation on coronal STIR MRI: complete tear of the scapholunate ligament (arrow) with widening of the scapholunate interval. S, scaphoid; L, lunate; C, capitate; R, radius.',
    source: S.tischler2014,
    figure: 'Fig. 2c',
  },
  tfccTear: {
    src: '/scans/wrist-mri/tfcc-tear.jpg',
    alt: 'Coronal fat-saturated T2-weighted MRI of the wrist with an arrow at the ulnar attachment of the triangular fibrocartilage and arrowheads over bright marrow in the ulnar styloid.',
    caption: 'Peripheral tear of the triangular fibrocartilage complex on coronal T2-weighted fat-saturated MRI (arrow), with bone marrow edema in the ulnar styloid (arrowheads).',
    source: S.nevalainen2023,
    figure: 'Fig. 1a',
  },
  ecuSubluxation: {
    src: '/scans/wrist-mri/ecu-subluxation.jpg',
    alt: 'Axial fat-saturated T2-weighted MRI of the distal forearm with the extensor carpi ulnaris tendon displaced from its groove and surrounded by fluid, and arrowheads over edema in the ulna.',
    caption: 'Extensor carpi ulnaris tendon subluxation with tenosynovitis (dashed arrow) on axial T2-weighted fat-saturated MRI, with ulnar styloid bone marrow edema (arrowheads), in a patient with a peripheral TFCC tear.',
    source: S.nevalainen2023,
    figure: 'Fig. 1b',
  },
  carpalTunnelSyndrome: {
    src: '/scans/wrist-mri/carpal-tunnel-syndrome.jpg',
    alt: 'Axial fat-saturated T2-weighted MRI of the wrist at the pisiform (P) with a swollen, bright median nerve under the flexor retinaculum marked by a black arrow.',
    caption: 'Surgically proven carpal tunnel syndrome: axial T2-weighted fat-saturated MRI at the level of the pisiform (P) shows thickening and increased signal intensity of the median nerve (arrow).',
    source: S.dong2012,
    figure: 'Fig. 13b',
  },
  guyonGanglion: {
    src: '/scans/wrist-mri/guyon-ganglion.jpg',
    alt: 'Axial MRI of the wrist with a bright, well-defined cyst on the ulnar side next to the ulnar nerve, marked by two arrows, one labelled UN.',
    caption: 'A ganglion cyst in Guyon\'s canal on axial MRI (unlabelled arrow) compressing the ulnar nerve (arrow labelled UN).',
    source: S.saran2025,
    figure: 'Fig. 7a',
  },
  dorsalGanglion: {
    src: '/scans/wrist-mri/dorsal-ganglion.jpg',
    alt: 'Coronal MRI of the dorsal wrist with a large, smooth, bright fluid-filled cyst over the carpus, marked by a thick arrow.',
    caption: 'A large dorsal wrist ganglion (arrow) on coronal 3D proton-density SPAIR MRI.',
    source: S.ferreiraBranco2024,
    figure: 'Fig. 2b',
  },
} satisfies Record<string, ScanImage>
