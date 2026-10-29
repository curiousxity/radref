import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT for the hearing loss CT page and the temporal bone CT study. */
export const hearingLossScans = {
  fenestral: {
    src: '/scans/hearing-loss/fenestral.jpg',
    alt: 'Axial CT of the left ear: a small lucent plaque just in front of the oval window',
    caption: 'Fenestral otosclerosis: demineralised plaque at the fissula ante fenestram (arrow), the left ear of a patient with bilateral disease.',
    source: S.purohit2014,
    figure: 'Fig. 2b',
  },
  cochlear: {
    src: '/scans/hearing-loss/cochlear.jpg',
    alt: 'Axial CT of the left ear: a lucent ring around the cochlea, inside its dense bony capsule',
    caption: 'Cochlear otosclerosis: the pericochlear "double ring" (arrow), the left ear of a patient with bilateral disease.',
    source: S.purohit2014,
    figure: 'Fig. 12b',
  },
  cochlearCleft: {
    src: '/scans/hearing-loss/cochlear-cleft.jpg',
    alt: 'Axial CT of the right ear in a child: a small curved lucency beside the cochlea',
    caption: 'Cochlear cleft (arrow), a normal variant that can be mistaken for an otosclerotic focus.',
    source: S.purohit2014,
    figure: 'Fig. 7a',
  },
  paget: {
    src: '/scans/hearing-loss/paget.jpg',
    alt: 'Axial CT of the skull base: low-density otic capsules on both sides, with the whole skull base involved',
    caption: 'Paget disease: low-density otic capsules on both sides (arrows) can mimic otosclerosis; the diffuse skull base involvement shows the true cause.',
    source: S.purohit2014,
    figure: 'Fig. 16',
  },
  fibrousDysplasia: {
    src: '/scans/hearing-loss/fibrous-dysplasia.jpg',
    alt: 'Axial CT of the left temporal bone: expanded bone of hazy ground-glass density throughout it',
    caption: 'Monostotic fibrous dysplasia extending to all parts of the temporal bone and stopping at its sutures (arrowheads).',
    source: S.pontesMadruga2022,
    figure: 'Fig. 2',
  },
  labyrinthitisOssificans: {
    src: '/scans/hearing-loss/labyrinthitis-ossificans.jpg',
    alt: 'Magnified axial CT: the cochlea and lateral semicircular canal are filled with bone instead of fluid',
    caption: 'Labyrinthitis ossificans: extensive ossification of the cochlea (C) and lateral semicircular canal (LSCC); V vestibule, IAC internal auditory canal, M malleus, I incus.',
    source: S.ostrander2026,
    figure: 'Fig. 6',
  },
  pneumolabyrinth: {
    src: '/scans/hearing-loss/pneumolabyrinth.jpg',
    alt: 'Axial CT: a small black bubble of air inside the vestibule',
    caption: 'Pneumolabyrinth: air in the vestibule (star), here without a temporal bone fracture.',
    source: S.maillot2016,
    figure: 'Fig. 10b',
  },
  eva: {
    src: '/scans/hearing-loss/eva.jpg',
    alt: 'Axial CT of one ear: a wide channel running back from the vestibule to the back of the petrous bone',
    caption: 'Enlarged vestibular aqueduct (arrow), one side of a bilateral case.',
    source: S.salata2019,
    figure: 'Fig. 7',
  },
  fracture: {
    src: '/scans/hearing-loss/fracture.jpg',
    alt: 'Axial CT of the right temporal bone: a fracture line running into the vestibule, with air in it',
    caption: 'Transverse fracture: the line runs from the vestibular aqueduct into the vestibule (lower arrow), with pneumolabyrinth (upper arrow).',
    source: S.kohler2024,
    figure: 'Fig. 1a',
  },
  elst: {
    src: '/scans/hearing-loss/elst.jpg',
    alt: 'Axial CT of the skull base: a large expansile destructive lesion of the left temporal bone reaching the posterior fossa',
    caption: 'Endolymphatic sac tumour: an expansile lytic lesion of the left mastoid and middle ear extending back into the posterior cranial fossa.',
    source: S.ge2020,
    figure: 'Fig. 1a',
  },
  iac: {
    src: '/scans/hearing-loss/iac.jpg',
    alt: 'Axial CT through both internal auditory canals in a patient with a small vestibular schwannoma',
    caption: 'A small vestibular schwannoma with marked widening of the internal auditory canal; compare the two sides.',
    source: S.dorner2024,
    figure: 'Fig. 1D',
  },
  scd: {
    src: '/scans/hearing-loss/scd.jpg',
    alt: 'CT reformatted in the plane of the superior semicircular canal: a gap in the bone over the top of the canal',
    caption: 'Superior canal dehiscence on a Pöschl reformat: the bony defect over the canal (arrow).',
    source: S.vlachodimitropoulos2026,
    figure: 'Fig. 1a',
  },
  labyrinthineFistula: {
    src: '/scans/hearing-loss/labyrinthine-fistula.jpg',
    alt: 'Coronal CT of one temporal bone: soft tissue in the attic against the lateral semicircular canal, whose bony wall is partly missing (arrow)',
    caption: 'Labyrinthine fistula: cholesteatoma has destroyed part of the lateral semicircular canal, leaving a bony defect (arrow) with soft tissue around it.',
    source: S.miwa2026,
    figure: 'Fig. 1c',
  },
  labyrinthineFistulaAxial: {
    src: '/scans/hearing-loss/labyrinthine-fistula-axial.jpg',
    alt: 'Axial CT of one temporal bone: the lateral semicircular canal surrounded by soft tissue in an opacified middle ear and mastoid, with an arrow at the canal',
    caption: 'Labyrinthine fistula from cholesteatoma: erosion of the lateral semicircular canal (arrow) on preoperative CT.',
    source: S.thangavelu2022,
    figure: 'Fig. 5',
  },
} satisfies Record<string, ScanImage>
