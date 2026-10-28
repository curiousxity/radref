import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Trauma CT for the AAST organ injury page (`src/pages/AastOrganInjuryPage.tsx`). Most are children. */
export const aastScans = {
  liverGrade2: {
    src: '/scans/aast/liver-grade-2.jpg',
    alt: 'Portal venous phase axial CT of a teenager: a thin linear tear at the edge of the right lobe of the liver',
    caption: 'Liver grade II: a thin linear capsular laceration 1–3 cm deep (arrow), in an 18-year-old.',
    source: S.mohammad2025,
    figure: 'Fig. 4a',
  },
  liverGrade5: {
    src: '/scans/aast/liver-grade-5.jpg',
    alt: 'Portal venous phase axial CT of a child: a large haematoma replacing most of the right lobe of the liver',
    caption: 'Liver grade V: an intraparenchymal haematoma over 10 cm (asterisk) disrupting more than 75% of the right lobe, with a deep laceration (arrow); 11-year-old.',
    source: S.mohammad2025,
    figure: 'Fig. 4d',
  },
  spleenGrade3: {
    src: '/scans/aast/spleen-grade-3.jpg',
    alt: 'Contrast-enhanced axial CT of a child: a laceration crossing the spleen',
    caption: 'Spleen grade III: a laceration over 3 cm running from one capsular surface to the other (arrow); 9-year-old.',
    source: S.mohammad2025,
    figure: 'Fig. 9a',
  },
  spleenPseudoaneurysm: {
    src: '/scans/aast/spleen-pseudoaneurysm.jpg',
    alt: 'Arterial phase axial CT: a bright curving collection of contrast inside the spleen',
    caption: 'Spleen grade IV: a curvilinear contrast collection in the spleen (arrow), a pseudoaneurysm, on the arterial phase; 84-year-old.',
    source: S.crone2025,
    figure: 'Fig. 2A',
  },
  kidneyUrineLeak: {
    src: '/scans/aast/kidney-urine-leak.jpg',
    alt: 'Delayed phase axial CT: excreted contrast leaking out beside a tear in the lower pole of the left kidney',
    caption: 'Kidney grade IV: contrast extravasation on the delayed phase beside the lower-pole laceration (arrow).',
    source: S.berday2025,
    figure: 'Fig. 3B',
  },
  kidneyInfarct: {
    src: '/scans/aast/kidney-infarct.jpg',
    alt: 'Coronal contrast-enhanced CT of a child: a non-enhancing area in the upper pole of the right kidney',
    caption: 'Upper-pole renal infarct (circle) after transection of the right renal artery (grade V); an aberrant second artery kept the rest of the kidney perfused. 11-year-old.',
    source: S.mohammad2025,
    figure: 'Fig. 13a',
  },
  kidneyDevascularised: {
    src: '/scans/aast/kidney-devascularised.jpg',
    alt: 'Venous phase axial CT of a child: an enlarged right kidney that does not enhance at all',
    caption: 'Kidney grade V: an enlarged, completely devascularised right kidney (black arrows) with a filling defect in the renal vein (white arrow); 2-year-old.',
    source: S.mohammad2025,
    figure: 'Fig. 14',
  },
} satisfies Record<string, ScanImage>
