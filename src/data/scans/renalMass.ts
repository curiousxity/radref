import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and MRI for the renal mass study (`src/studies/RenalMassStudy.tsx`) and the Bosniak page. */
export const renalMassScans = {
  bosniak1: {
    src: '/scans/renal-mass/bosniak-1.jpg',
    alt: 'Contrast-enhanced axial CT: a large round water-density cyst in the left kidney with no septa or solid part',
    caption: 'Bosniak I features: a large cyst with no septa or solid component and no enhancement. This paper reports the rare case of such a cyst later turning malignant.',
    source: S.culap2025,
    figure: 'Fig. 2B',
  },
  bosniak2: {
    src: '/scans/renal-mass/bosniak-2.jpg',
    alt: 'Nephrographic-phase axial CT: a small homogeneous cyst in the left kidney with a speck of calcium in its wall',
    caption: 'Bosniak II: homogeneous fluid density, an eccentric speck of calcification along the posterior wall, and an imperceptible, non-enhancing wall.',
    source: S.dev2024,
    figure: 'Fig. 2C',
  },
  bosniak2f: {
    src: '/scans/renal-mass/bosniak-2f.jpg',
    alt: 'Nephrographic-phase axial CT: a right renal cyst whose front wall is slightly thickened and enhancing',
    caption: 'Bosniak IIF: the anterior wall is minimally thickened and enhances (double arrows), with an eccentric calcification speck (single arrow).',
    source: S.dev2024,
    figure: 'Fig. 3C',
  },
  bosniak4: {
    src: '/scans/renal-mass/bosniak-4.jpg',
    alt: 'Coronal contrast-enhanced CT: a cystic mass in the upper left kidney with an enhancing soft-tissue nodule on its inner edge',
    caption: 'Bosniak IV: a cystic mass with a markedly enhancing soft-tissue nodule on its inner edge (arrows); cystic renal cell carcinoma.',
    source: S.xu2026,
    figure: 'Fig. 2B',
  },
  angiomyolipoma: {
    src: '/scans/renal-mass/angiomyolipoma.jpg',
    alt: 'Axial CT: large exophytic masses of fat density arising from the right kidney',
    caption: 'Angiomyolipoma: exophytic fat-density masses in the right kidney.',
    source: S.ahmed2024,
    figure: 'Fig. 1B',
  },
  clearCell: {
    src: '/scans/renal-mass/clear-cell-rcc.jpg',
    alt: 'T2-weighted MRI: a large heterogeneous right renal mass, brighter than the kidney',
    caption: 'Clear cell renal cell carcinoma: a large heterogeneous mass with areas of high T2 signal compared with the renal parenchyma.',
    source: S.bellin2024,
    figure: 'Fig. 5A',
  },
  papillary: {
    src: '/scans/renal-mass/papillary-rcc.jpg',
    alt: 'Coronal arterial-phase CT: a round lower-pole right renal lesion that barely enhances',
    caption: 'Papillary renal cell carcinoma: minimal arterial enhancement (79 HU against 36 HU unenhanced).',
    source: S.comune2025,
    figure: 'Fig. 5b',
  },
  oncocytoma: {
    src: '/scans/renal-mass/oncocytoma.jpg',
    alt: 'Contrast-enhanced axial CT: a right renal mass with a star-shaped low-density centre',
    caption: 'Oncocytoma: the central hypodense area has a typical stellate pattern (arrow).',
    source: S.qu2023,
    figure: 'Fig. 1a',
  },
} satisfies Record<string, ScanImage>
