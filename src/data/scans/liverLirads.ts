import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Multiphase CT and MRI for the LI-RADS study (`src/studies/LiverLiradsStudy.tsx`) and calculator. */
export const liverLiradsScans = {
  aphe: {
    src: '/scans/liver-lirads/aphe.jpg',
    alt: 'Arterial-phase axial CT of a cirrhotic liver: a right-lobe observation brighter than the liver around it',
    caption: 'Nonrim arterial phase hyperenhancement in an observation over 2 cm (arrow); LR-5.',
    source: S.prajapati2026,
    figure: 'Fig. 5A',
  },
  washout: {
    src: '/scans/liver-lirads/washout.jpg',
    alt: 'Portal venous phase axial CT: the same observation is now darker than the liver',
    caption: 'The same observation: nonperipheral washout on the portal venous phase (arrow).',
    source: S.prajapati2026,
    figure: 'Fig. 5B',
  },
  capsule: {
    src: '/scans/liver-lirads/capsule.jpg',
    alt: 'Delayed-phase axial CT: the observation is dark with a bright rim around it',
    caption: 'The same observation on the delayed phase: washout and an enhancing capsule (arrow).',
    source: S.prajapati2026,
    figure: 'Fig. 5D',
  },
  tumourInVein: {
    src: '/scans/liver-lirads/tumour-in-vein.jpg',
    alt: 'Arterial-phase axial CT: a large heterogeneous right-lobe mass with enhancing tissue extending into the portal vein',
    caption: 'LR-TIV: enhancing soft tissue in the portal veins, contiguous with a large LR-5 observation in the right lobe (arrows).',
    source: S.prajapati2026,
    figure: 'Fig. 3A',
  },
  lrM: {
    src: '/scans/liver-lirads/lr-m.jpg',
    alt: 'Arterial-phase MRI: a right-lobe lesion with a bright rim and a darker centre',
    caption: 'LR-M: peripheral (rim) arterial phase hyperenhancement; proven cholangiocarcinoma.',
    source: S.schima2018,
    figure: 'Fig. 13a',
  },
  lr1Cyst: {
    src: '/scans/liver-lirads/lr-1-cyst.jpg',
    alt: 'Venous-phase axial CT: a large round water-density cyst in the left lobe and a small one in the right lobe',
    caption: 'LR-1: a large calcified cyst in the left lateral segment and a smaller cyst in the right lobe (arrows).',
    source: S.schima2018,
    figure: 'Fig. 4b',
  },
  lr2Haemangioma: {
    src: '/scans/liver-lirads/lr-2-haemangioma.jpg',
    alt: 'Arterial-phase axial CT: a subcapsular right-lobe lesion with nodules of enhancement at its edge',
    caption: 'LR-2, probable haemangioma: peripheral nodular enhancement and capsular retraction (arrow), filling in on the venous phase.',
    source: S.schima2018,
    figure: 'Fig. 5a',
  },
} satisfies Record<string, ScanImage>
