import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and MRI for the temporal bone CT study; it also shows the hearing loss scans. */
export const temporalBoneScans = {
  atticCholesteatoma: {
    src: '/scans/temporal-bone/attic-cholesteatoma.jpg',
    alt: 'Coronal CT of the right temporal bone: soft tissue filling the upper middle ear with the scutum worn away',
    caption: 'Pars flaccida cholesteatoma: soft tissue filling the lateral epitympanum (arrowheads), eroding the scutum (outlined arrow) and the incus (small arrow).',
    source: S.touska2025,
    figure: 'Fig. 1D',
  },
  lateralCanalFistula: {
    src: '/scans/temporal-bone/lateral-canal-fistula.jpg',
    alt: 'Axial CT: the bony wall of the lateral semicircular canal is eroded where it meets middle ear soft tissue',
    caption: 'Erosion of the lateral wall of the lateral semicircular canal (arrow): a labyrinthine fistula.',
    source: S.gulati2019,
    figure: 'Fig. 11',
  },
  cholesteatomaDwi: {
    src: '/scans/temporal-bone/cholesteatoma-dwi.jpg',
    alt: 'Coronal non-echoplanar diffusion-weighted MRI: a bright spot in the left middle ear',
    caption: 'Left posterior epitympanic cholesteatoma, bright on coronal non-EPI DWI (arrow).',
    source: S.touska2025,
    figure: 'Fig. 4B',
  },
  coalescentMastoiditis: {
    src: '/scans/temporal-bone/coalescent-mastoiditis.jpg',
    alt: 'CT of the left mastoid: the bony septa are destroyed and the inner and outer cortex are breached',
    caption: 'Coalescent mastoiditis: destruction of the septa (asterisk), the inner cortical table (arrow) and the outer cortical table (arrowhead).',
    source: S.saat2021,
    figure: 'Fig. 3d',
  },
  incompletePartition2: {
    src: '/scans/temporal-bone/incomplete-partition-2.jpg',
    alt: 'Axial CT: a cochlea with a cystic apex, a large vestibule and a wide vestibular aqueduct',
    caption: 'Incomplete partition type II: cystic cochlear apex (arrow), enlarged vestibule (arrowhead) and dilated vestibular aqueduct (curved arrow).',
    source: S.chow2026,
    figure: 'Fig. 12',
  },
  jugularBulb: {
    src: '/scans/temporal-bone/jugular-bulb.jpg',
    alt: 'Coronal CT: the jugular bulb rises into the floor of the middle ear with no bone over it',
    caption: 'Dehiscent high-riding jugular bulb (JB) protruding into the tympanic cavity (TC).',
    source: S.ostrander2026,
    figure: 'Fig. 9A',
  },
  aberrantCarotid: {
    src: '/scans/temporal-bone/aberrant-carotid.jpg',
    alt: 'Axial CT angiogram: the internal carotid artery runs across the cochlear promontory in the middle ear',
    caption: 'Aberrant internal carotid artery (ICA) crossing the cochlear promontory (CP).',
    source: S.ostrander2026,
    figure: 'Fig. 9B',
  },
  exostoses: {
    src: '/scans/temporal-bone/exostoses.jpg',
    alt: 'Coronal CT: bony bumps narrowing both external auditory canals',
    caption: 'Exostoses of both external auditory canals (arrows), in a long-time surfer and sailor.',
    source: S.kloth2023,
    figure: 'Fig. 5A',
  },
  cholesterolGranuloma: {
    src: '/scans/temporal-bone/cholesterol-granuloma.jpg',
    alt: 'Axial T1-weighted MRI without contrast: a bright lesion at the left petrous apex',
    caption: 'Cholesterol granuloma at the left petrous apex, bright on T1 before contrast (arrow).',
    source: S.kloth2023,
    figure: 'Fig. 17A',
  },
  canalWallDown: {
    src: '/scans/temporal-bone/canal-wall-down.jpg',
    alt: 'Axial CT: the posterior wall of the ear canal is missing and the mastoid opens into it as one cavity',
    caption: 'Canal wall down mastoidectomy: the posterior EAC wall is deficient, forming a single cavity (outlined arrow).',
    source: S.touska2025,
    figure: 'Fig. 2B',
  },
} satisfies Record<string, ScanImage>
