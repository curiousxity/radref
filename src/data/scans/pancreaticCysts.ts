import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and MRI for the pancreatic cysts study and the pancreatic cyst page. */
export const pancreaticCystsScans = {
  serousCystadenoma: {
    src: '/scans/pancreatic-cysts/serous-cystadenoma.jpg',
    alt: 'Portal venous CT: a lesion in the pancreatic body made of many tiny cysts with thin septa',
    caption: 'Microcystic serous cystadenoma: thin, partly calcified septa giving a "honeycomb" appearance (arrow).',
    source: S.danti2026,
    figure: 'Fig. 3',
  },
  branchDuctIpmn: {
    src: '/scans/pancreatic-cysts/branch-duct-ipmn.jpg',
    alt: 'MR cholangiopancreatography: a cyst in the uncinate process connected to the main pancreatic duct',
    caption: 'Branch-duct IPMN: the cyst in the uncinate process communicates with the main pancreatic duct on MRCP.',
    source: S.danti2026,
    figure: 'Fig. 5b',
  },
  mucinousCystic: {
    src: '/scans/pancreatic-cysts/mucinous-cystic.jpg',
    alt: 'Contrast-enhanced CT: a cyst-like lesion in the pancreatic tail with a calcified wall',
    caption: 'Mucinous cystic lesion of the pancreatic tail with a calcified wall (arrow), in a 49-year-old woman.',
    source: S.danti2026,
    figure: 'Fig. 8a',
  },
  spn: {
    src: '/scans/pancreatic-cysts/spn.jpg',
    alt: 'T2-weighted MRI: a mostly cystic mass in the pancreatic tail with a dark rim',
    caption: 'Solid pseudopapillary neoplasm in the tail of a 27-year-old woman: predominantly cystic with a continuous T2-dark capsule (arrow).',
    source: S.khristenko2024,
    figure: 'Fig. 2A',
  },
  pseudocyst: {
    src: '/scans/pancreatic-cysts/pseudocyst.jpg',
    alt: 'MRI: a round, well-defined cyst in the tail of the pancreas',
    caption: 'Pseudocyst: a well-defined round cystic lesion in the pancreatic tail on MRI four weeks after the first CT (arrow).',
    source: S.danti2026,
    figure: 'Fig. 1b',
  },
} satisfies Record<string, ScanImage>
