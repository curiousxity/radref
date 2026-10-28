import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT for the Lung-RADS and Fleischner pages and the lung screening study. */
export const lungNodulesScans = {
  solid: {
    src: '/scans/lung-nodules/solid.jpg',
    alt: 'Axial low-dose CT: a small round solid nodule in the right lower lobe',
    caption: 'Solid nodule, 7 mm (arrow): Lung-RADS 3.',
    source: S.cannella2026,
    figure: 'Fig. 6C',
  },
  partSolid: {
    src: '/scans/lung-nodules/part-solid.jpg',
    alt: 'Axial low-dose CT: a hazy nodule with a denser centre and spiculated edges',
    caption: 'Part-solid nodule with spiculations (arrows).',
    source: S.revel2025,
    figure: 'Fig. 3A',
  },
  groundGlass: {
    src: '/scans/lung-nodules/ground-glass.jpg',
    alt: 'Axial CT: a faint hazy nodule in the apex of the right upper lobe',
    caption: 'Pure ground-glass nodule in the apical right upper lobe…',
    source: S.revel2025,
    figure: 'Fig. 4C',
  },
  groundGlassLater: {
    src: '/scans/lung-nodules/ground-glass-later.jpg',
    alt: 'Axial CT three years later: the same nodule is larger and has a denser part',
    caption: '…three years later: it has grown and developed a solid portion posteriorly.',
    source: S.revel2025,
    figure: 'Fig. 4D',
  },
  perifissural: {
    src: '/scans/lung-nodules/perifissural.jpg',
    alt: 'Axial low-dose CT: a small triangular nodule attached to a fissure',
    caption: 'Perifissural solid nodule, triangular and under 10 mm (arrow), likely an intrapulmonary lymph node: Lung-RADS 2.',
    source: S.cannella2026,
    figure: 'Fig. 6B',
  },
  popcorn: {
    src: '/scans/lung-nodules/popcorn-calcification.jpg',
    alt: 'Axial CT: a small smooth nodule with coarse popcorn calcification',
    caption: 'Hamartoma: a small smooth nodule with fat and typical popcorn calcifications.',
    source: S.baratella2025,
    figure: 'Fig. 2a',
  },
  spiculated: {
    src: '/scans/lung-nodules/spiculated.jpg',
    alt: 'Axial CT in an emphysematous lung: a spiculated nodule in the right upper lobe',
    caption: 'Spiculated malignant nodule with a small eccentric calcification, in severe centrilobular emphysema.',
    source: S.baratella2025,
    figure: 'Fig. 9c',
  },
  cysticNodule: {
    src: '/scans/lung-nodules/cystic-nodule.jpg',
    alt: 'Axial low-dose CT: a solid nodule along the wall of a thin-walled cyst in the left lower lobe',
    caption: 'Solid nodule with a thin-walled cyst, 18 mm (arrow): Lung-RADS 4B; adenocarcinoma at biopsy.',
    source: S.cannella2026,
    figure: 'Fig. 6D',
  },
  endobronchial: {
    src: '/scans/lung-nodules/endobronchial.jpg',
    alt: 'Axial contrast-enhanced CT: a rounded nodule filling the lumen of a left lower lobe bronchus',
    caption: 'Endobronchial nodule: a 3.0 cm nodule protruding into the lumen of a left lower lobe bronchus (arrow).',
    source: S.teishikata2026,
    figure: 'Fig. 1A',
  },
} satisfies Record<string, ScanImage>
