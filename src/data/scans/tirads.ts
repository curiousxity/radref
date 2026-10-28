import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Thyroid ultrasound for the TI-RADS calculator and the thyroid ultrasound study. */
export const tiradsScans = {
  cystic: {
    src: '/scans/tirads/cystic.jpg',
    alt: 'Ultrasound: a completely cystic thyroid nodule',
    caption: 'Completely cystic: not scored further, 0 points, TR1.',
    source: S.pires2022,
    figure: 'Fig. 1',
  },
  mixed: {
    src: '/scans/tirads/mixed.jpg',
    alt: 'Ultrasound: a nodule of mixed solid and cystic parts',
    caption: 'Mixed solid-cystic: only the solid part is scored for echogenicity, margin and foci.',
    source: S.pires2022,
    figure: 'Fig. 2',
  },
  hyperechoic: {
    src: '/scans/tirads/hyperechoic.jpg',
    alt: 'Ultrasound: a solid nodule brighter than the thyroid around it',
    caption: 'Hyperechoic (1 point); solid, smooth, wider than tall: TR3.',
    source: S.pires2022,
    figure: 'Fig. 4',
  },
  hypoechoic: {
    src: '/scans/tirads/hypoechoic.jpg',
    alt: 'Ultrasound: a smooth solid nodule darker than the thyroid around it',
    caption: 'Hypoechoic (2 points), less echogenic than the thyroid; smooth margins: TR4.',
    source: S.pires2022,
    figure: 'Fig. 6',
  },
  veryHypoechoic: {
    src: '/scans/tirads/very-hypoechoic.jpg',
    alt: 'Ultrasound: a nodule as dark as the strap muscles in front of it',
    caption: 'Markedly hypoechoic (3 points): compare it with the neck muscles.',
    source: S.pires2022,
    figure: 'Fig. 8',
  },
  tallerThanWide: {
    src: '/scans/tirads/taller-than-wide.jpg',
    alt: 'Ultrasound: a hypoechoic nodule taller than it is wide',
    caption: 'Taller than wide (3 points); solid and hypoechoic: TR5.',
    source: S.pires2022,
    figure: 'Fig. 9',
  },
  lobulated: {
    src: '/scans/tirads/lobulated.jpg',
    alt: 'Ultrasound: a solid nodule with a rounded bulge on its front margin',
    caption: 'Lobulated margin (2 points), with a rounded lobulation at the front: TR4.',
    source: S.pires2022,
    figure: 'Fig. 10',
  },
  irregular: {
    src: '/scans/tirads/irregular.jpg',
    alt: 'Ultrasound: a solid nodule whose medial margin forms a sharp angle',
    caption: 'Irregular margin (2 points): note the acute angle at the medial margin. TR4.',
    source: S.pires2022,
    figure: 'Fig. 11',
  },
  extrathyroidal: {
    src: '/scans/tirads/extrathyroidal.jpg',
    alt: 'Ultrasound: a nodule breaking through the front edge of the thyroid',
    caption: 'Extrathyroidal extension (3 points): the nodule extends beyond the front of the thyroid. TR5.',
    source: S.pires2022,
    figure: 'Fig. 12',
  },
  cometTail: {
    src: '/scans/tirads/comet-tail.jpg',
    alt: 'Ultrasound: an anechoic nodule with bright foci trailing comet-tail artefacts',
    caption: 'Large comet-tail artefacts (0 points), in a TR2 nodule.',
    source: S.cannella2026,
    figure: 'Fig. 11A',
  },
  macrocalcification: {
    src: '/scans/tirads/macrocalcification.jpg',
    alt: 'Ultrasound: a nodule with a bright curved calcification and a dark shadow behind it',
    caption: 'Macrocalcification (1 point): note the intense acoustic shadowing. TR4.',
    source: S.pires2022,
    figure: 'Fig. 15',
  },
  peripheralCalcification: {
    src: '/scans/tirads/peripheral-calcification.jpg',
    alt: 'Ultrasound: a solid nodule with bright calcific foci along its edge',
    caption: 'Peripheral (rim) calcifications (2 points): TR4.',
    source: S.pires2022,
    figure: 'Fig. 16',
  },
  punctateFoci: {
    src: '/scans/tirads/punctate-foci.jpg',
    alt: 'Ultrasound: a solid hypoechoic nodule with tiny bright dots scattered through it',
    caption: 'Punctate echogenic foci (3 points): TR5.',
    source: S.pires2022,
    figure: 'Fig. 14',
  },
  tr5: {
    src: '/scans/tirads/tr5.jpg',
    alt: 'Ultrasound: a small hypoechoic nodule, measured with calipers, taller than it is wide',
    caption: 'Solid, hypoechoic and taller than wide: 7 points, TR5.',
    source: S.pires2022,
    figure: 'Fig. 21',
  },
} satisfies Record<string, ScanImage>
