import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiographs and 3D CT for the Letournel page (`src/pages/LetournelPage.tsx`). */
export const letournelScans = {
  bothColumnSpur: {
    src: '/scans/letournel/both-column-spur.jpg',
    alt: 'Obturator oblique radiograph of the hip: a bony spur projecting above the acetabulum',
    caption: 'Both-column fracture: the spur sign (arrow) and false congruence of the joint (dotted line).',
    source: S.zhang2017,
    figure: 'Fig. 2B',
  },
  posteriorWall: {
    src: '/scans/letournel/posterior-wall.jpg',
    alt: '3D CT reconstruction: a fragment broken off the back of the acetabulum with the femoral head dislocated behind it',
    caption: 'Posterior wall fracture with posterior hip dislocation (3D CT).',
    source: S.singh2026,
    figure: 'Fig. 9a',
  },
} satisfies Record<string, ScanImage>
