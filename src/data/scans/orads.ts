import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Ultrasound and MRI for the O-RADS calculator and the adnexal mass MRI study. */
export const oradsScans = {
  haemorrhagicCyst: {
    src: '/scans/orads/haemorrhagic-cyst.jpg',
    alt: 'Transvaginal ultrasound: an ovarian cyst with an echogenic clot along one wall',
    caption: 'Haemorrhagic cyst containing a blood clot (star).',
    source: S.timmerman2026,
    figure: 'Fig. 11n',
  },
  endometriomaUs: {
    src: '/scans/orads/endometrioma-us.jpg',
    alt: 'Transvaginal ultrasound: a cyst with uniform low-level echoes and a small outlined deposit on its wall',
    caption: 'Ovarian endometrioma with sludge on the inner wall (dotted outline).',
    source: S.timmerman2026,
    figure: 'Fig. 3b',
  },
  dermoidUs: {
    src: '/scans/orads/dermoid-us.jpg',
    alt: 'Transvaginal ultrasound: a bright rounded mass with a dark acoustic shadow behind it',
    caption: 'Dermoid cyst: shadowing behind a "white ball".',
    source: S.timmerman2026,
    figure: 'Fig. 13e',
  },
  multilocularCyst: {
    src: '/scans/orads/multilocular-cyst.jpg',
    alt: 'Transvaginal ultrasound: a cyst divided by thin septa into several locules',
    caption: 'Multilocular cyst with four locules.',
    source: S.timmerman2026,
    figure: 'Fig. 18b',
  },
  papillaryProjection: {
    src: '/scans/orads/papillary-projection.jpg',
    alt: 'Transvaginal ultrasound: a small cyst with a solid frond projecting into it from the wall',
    caption: 'Papillary projection: solid tissue protruding into the cyst cavity, 3 mm or more high.',
    source: S.timmerman2026,
    figure: 'Fig. 4b',
  },
  endometriomaMri: {
    src: '/scans/orads/endometrioma-mri.jpg',
    alt: 'Axial fat-suppressed T1-weighted MRI: a bright adnexal cyst with a darker dependent layer',
    caption: 'Endometrioma on fat-suppressed T1: the "shading sign" (arrow), from recurrent haemorrhage.',
    source: S.nikolic2026,
    figure: 'Fig. 3F',
  },
  dermoidMriT1: {
    src: '/scans/orads/dermoid-mri-t1.jpg',
    alt: 'Axial T1-weighted MRI: a bright right adnexal mass',
    caption: 'Mature cystic teratoma on T1 (arrow)…',
    source: S.nikolic2026,
    figure: 'Fig. 3L',
  },
  dermoidMriFatSat: {
    src: '/scans/orads/dermoid-mri-fat-sat.jpg',
    alt: 'Axial fat-suppressed T1-weighted MRI: the same mass has lost its bright signal',
    caption: '…and on fat-suppressed post-contrast T1, where its fat signal is suppressed (arrow).',
    source: S.nikolic2026,
    figure: 'Fig. 3M',
  },
  fibroma: {
    src: '/scans/orads/fibroma-t2.jpg',
    alt: 'Axial T2-weighted MRI of the pelvis: a dark solid right ovarian mass',
    caption: 'Ovarian fibroma, O-RADS MRI 2: solid tissue dark on T2 (arrow), and dark on DWI in the same paper.',
    source: S.nougaret2024,
    figure: 'Fig. 7a',
  },
} satisfies Record<string, ScanImage>
