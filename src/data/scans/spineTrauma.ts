import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT for the spine trauma CT study and the AO Spine page. */
export const spineTraumaScans = {
  a1: {
    src: '/scans/spine-trauma/a1.jpg',
    alt: 'Sagittal CT: a vertebral body with only its upper endplate fractured',
    caption: 'Type A1 (wedge-compression): only the upper endplate is involved (box).',
    source: S.zhangJ2023,
    figure: 'Fig. 1A',
  },
  a4: {
    src: '/scans/spine-trauma/a4.jpg',
    alt: 'Sagittal CT: a burst vertebral body with both endplates fractured',
    caption: 'Type A4 (complete burst): both endplates and the posterior wall involved (box).',
    source: S.zhangJ2023,
    figure: 'Fig. 1D',
  },
  chance: {
    src: '/scans/spine-trauma/chance.jpg',
    alt: 'Sagittal bone-window CT of the lumbar spine: a horizontal fracture through all three columns of L3',
    caption: 'Chance-type flexion-distraction injury: a horizontal fracture line through all three columns at L3; 53-year-old after a seat-belt injury.',
    source: S.galluzzo2026,
    figure: 'Fig. 1a',
  },
  dishExtension: {
    src: '/scans/spine-trauma/dish-extension.jpg',
    alt: 'Sagittal CT of a fused thoracic spine: the column is broken and shifted at T3-T4',
    caption: 'Hyperextension fracture in diffuse idiopathic skeletal hyperostosis: T3-T4 subluxation through the fused spine.',
    source: S.yoshihara2011,
    figure: 'Fig. 1',
  },
  translation: {
    src: '/scans/spine-trauma/translation.jpg',
    alt: 'Sagittal CT: complete fracture-dislocation between T8 and T9 with the lower spine displaced',
    caption: 'Type C translation: complete fracture-dislocation between T8 and T9, displaced by about one vertebral body width.',
    source: S.song2026,
    figure: 'Fig. 2B',
  },
  jefferson: {
    src: '/scans/spine-trauma/jefferson.jpg',
    alt: 'Axial CT through C1: the ring of the atlas is broken in several places',
    caption: 'Jefferson fracture: burst of the left anterior arch and both posterior arches of C1 (arrows).',
    source: S.utz2014,
    figure: 'Fig. 6a',
  },
  hangman: {
    src: '/scans/spine-trauma/hangman.jpg',
    alt: 'Axial CT through C2: fractures through both pedicles',
    caption: 'Hangman fracture: bilateral disruption of the C2 pedicles (arrows).',
    source: S.utz2014,
    figure: 'Fig. 7b',
  },
  odontoid: {
    src: '/scans/spine-trauma/odontoid.jpg',
    alt: 'Sagittal CT: a fracture across the base of the odontoid process',
    caption: 'Type II odontoid fracture: minimally displaced fracture of the base of the dens (arrow).',
    source: S.utz2014,
    figure: 'Fig. 9b',
  },
  jumpedFacet: {
    src: '/scans/spine-trauma/jumped-facet.jpg',
    alt: 'Sagittal CT of the cervical spine: the C6 inferior facet has jumped in front of the C7 facet',
    caption: 'Jumped facet: anterior displacement of the C6 inferior articular facet in front of the C7 superior facet (arrow).',
    source: S.utz2014,
    figure: 'Fig. 14a',
  },
} satisfies Record<string, ScanImage>
