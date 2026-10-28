/**
 * CT panels for the adult hearing loss page. Like the calvarial lesions page, each scan is one
 * panel cropped, unchanged apart from conversion to greyscale, from a figure in an open-access
 * paper published under a CC BY licence, credited with its figure and the source's exact licence.
 * The arrows and panel letters are the original authors'. The files were fetched with the Europe
 * PMC supplementary-files API and live in `public/hearing-loss/`. An entry without `src` would be
 * a planned slot the page skips; `src/pages/hearingLoss.test.ts` checks each file exists and stays
 * small.
 */

export type HearingLossImage = {
  /** Path under `public/`; an entry without one is a planned slot the page skips. */
  src?: string
  alt: string
  /** What the arrows point at, from the source figure's caption. */
  caption: string
  source: keyof typeof HEARING_LOSS_SOURCES
  figure: string
}

export const HEARING_LOSS_SOURCES = {
  // The article says "Creative Commons Attribution License"; the publisher's Crossref record gives
  // the version (creativecommons.org/licenses/by/2.0).
  purohit: { short: 'Purohit et al. 2014', doi: '10.1007/s13244-014-0313-9', licence: 'CC BY 2.0' },
  // The rest state CC BY 4.0 in the article's licence statement and in Crossref, except Salata,
  // whose article says only "Creative Commons Attribution License"; Crossref gives 4.0.
  ostrander: { short: 'Ostrander et al. 2026', doi: '10.3389/fradi.2026.1784554', licence: 'CC BY 4.0' },
  kohler: { short: 'Kohler et al. 2024', doi: '10.3390/tomography10050056', licence: 'CC BY 4.0' },
  maillot: { short: 'Maillot et al. 2016', doi: '10.1007/s13244-016-0490-9', licence: 'CC BY 4.0' },
  salata: { short: 'Salata et al. 2019', doi: '10.1590/0100-3984.2016.0213', licence: 'CC BY 4.0' },
  ge: { short: 'Ge et al. 2020', doi: '10.1186/s41016-020-00191-4', licence: 'CC BY 4.0' },
  dorner: { short: 'Dörner et al. 2024', doi: '10.1007/s10143-024-02419-8', licence: 'CC BY 4.0' },
  vlachodimitropoulos: { short: 'Vlachodimitropoulos et al. 2026', doi: '10.4102/sajr.v30i1.3278', licence: 'CC BY 4.0' },
  pontesMadruga: { short: 'Pontes-Madruga et al. 2022', doi: '10.1016/j.bjorl.2020.05.027', licence: 'CC BY 4.0' },
} as const

export const CC_BY = 'CC BY'

export const hearingLossImages = {
  fenestral: {
    src: '/hearing-loss/fenestral.jpg',
    alt: 'Axial CT of the left ear: a small lucent plaque just in front of the oval window',
    caption: 'Fenestral otosclerosis: demineralised plaque at the fissula ante fenestram (arrow), the left ear of a patient with bilateral disease.',
    source: 'purohit',
    figure: 'Fig. 2b',
  },
  cochlear: {
    src: '/hearing-loss/cochlear.jpg',
    alt: 'Axial CT of the left ear: a lucent ring around the cochlea, inside its dense bony capsule',
    caption: 'Cochlear otosclerosis: the pericochlear "double ring" (arrow), the left ear of a patient with bilateral disease.',
    source: 'purohit',
    figure: 'Fig. 12b',
  },
  cochlearCleft: {
    src: '/hearing-loss/cochlear-cleft.jpg',
    alt: 'Axial CT of the right ear in a child: a small curved lucency beside the cochlea',
    caption: 'Cochlear cleft (arrow), a normal variant that can be mistaken for an otosclerotic focus.',
    source: 'purohit',
    figure: 'Fig. 7a',
  },
  paget: {
    src: '/hearing-loss/paget.jpg',
    alt: 'Axial CT of the skull base: low-density otic capsules on both sides, with the whole skull base involved',
    caption: 'Paget disease: low-density otic capsules on both sides (arrows) can mimic otosclerosis; the diffuse skull base involvement shows the true cause.',
    source: 'purohit',
    figure: 'Fig. 16',
  },
  fibrousDysplasia: {
    src: '/hearing-loss/fibrous-dysplasia.jpg',
    alt: 'Axial CT of the left temporal bone: expanded bone of hazy ground-glass density throughout it',
    caption: 'Monostotic fibrous dysplasia extending to all parts of the temporal bone and stopping at its sutures (arrowheads).',
    source: 'pontesMadruga',
    figure: 'Fig. 2',
  },
  labyrinthitisOssificans: {
    src: '/hearing-loss/labyrinthitis-ossificans.jpg',
    alt: 'Magnified axial CT: the cochlea and lateral semicircular canal are filled with bone instead of fluid',
    caption: 'Labyrinthitis ossificans: extensive ossification of the cochlea (C) and lateral semicircular canal (LSCC); V vestibule, IAC internal auditory canal, M malleus, I incus.',
    source: 'ostrander',
    figure: 'Fig. 6',
  },
  pneumolabyrinth: {
    src: '/hearing-loss/pneumolabyrinth.jpg',
    alt: 'Axial CT: a small black bubble of air inside the vestibule',
    caption: 'Pneumolabyrinth: air in the vestibule (star), here without a temporal bone fracture.',
    source: 'maillot',
    figure: 'Fig. 10b',
  },
  eva: {
    src: '/hearing-loss/eva.jpg',
    alt: 'Axial CT of one ear: a wide channel running back from the vestibule to the back of the petrous bone',
    caption: 'Enlarged vestibular aqueduct (arrow), one side of a bilateral case.',
    source: 'salata',
    figure: 'Fig. 7',
  },
  fracture: {
    src: '/hearing-loss/fracture.jpg',
    alt: 'Axial CT of the right temporal bone: a fracture line running into the vestibule, with air in it',
    caption: 'Transverse fracture: the line runs from the vestibular aqueduct into the vestibule (lower arrow), with pneumolabyrinth (upper arrow).',
    source: 'kohler',
    figure: 'Fig. 1a',
  },
  elst: {
    src: '/hearing-loss/elst.jpg',
    alt: 'Axial CT of the skull base: a large expansile destructive lesion of the left temporal bone reaching the posterior fossa',
    caption: 'Endolymphatic sac tumour: an expansile lytic lesion of the left mastoid and middle ear extending back into the posterior cranial fossa.',
    source: 'ge',
    figure: 'Fig. 1a',
  },
  iac: {
    src: '/hearing-loss/iac.jpg',
    alt: 'Axial CT through both internal auditory canals in a patient with a small vestibular schwannoma',
    caption: 'A small vestibular schwannoma with marked widening of the internal auditory canal; compare the two sides.',
    source: 'dorner',
    figure: 'Fig. 1D',
  },
  scd: {
    src: '/hearing-loss/scd.jpg',
    alt: 'CT reformatted in the plane of the superior semicircular canal: a gap in the bone over the top of the canal',
    caption: 'Superior canal dehiscence on a Pöschl reformat: the bony defect over the canal (arrow).',
    source: 'vlachodimitropoulos',
    figure: 'Fig. 1a',
  },
} satisfies Record<string, HearingLossImage>
