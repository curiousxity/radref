import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI for the PI-RADS calculator and the prostate MRI study. */
export const piradsScans = {
  pzT2: {
    src: '/scans/pirads/pz-t2.jpg',
    alt: 'Axial T2-weighted MRI of the prostate: a dark area in the right peripheral zone',
    caption: 'Peripheral zone lesion in the right lobe on T2 (arrow)…',
    source: S.cannella2026,
    figure: 'Fig. 10A',
  },
  pzAdc: {
    src: '/scans/pirads/pz-adc.jpg',
    alt: 'ADC map: the same area is markedly dark',
    caption: '…markedly hypointense on the ADC map…',
    source: S.cannella2026,
    figure: 'Fig. 10B',
  },
  pzDce: {
    src: '/scans/pirads/pz-dce.jpg',
    alt: 'Dynamic contrast-enhanced MRI: early enhancement in the same area',
    caption: '…with positive DCE: PI-RADS 5 (arrows).',
    source: S.cannella2026,
    figure: 'Fig. 10D',
  },
  tzErasedCharcoal: {
    src: '/scans/pirads/tz-erased-charcoal.jpg',
    alt: 'Axial T2-weighted MRI: a lens-shaped, smudgy dark area in the right transition zone',
    caption: 'Transition zone cancer: a lenticular hypointense lesion with an "erased charcoal" appearance in the right TZ and anterior horn of the PZ (arrow); PI-RADS 5.',
    source: S.zurowska2023,
    figure: 'Fig. 10a',
  },
  bphNodule: {
    src: '/scans/pirads/bph-nodule.jpg',
    alt: 'Axial T2-weighted MRI: a round nodule with a complete dark rim in the transition zone',
    caption: 'Typical completely encapsulated BPH nodule (arrow; panel a): PI-RADS 1.',
    source: S.zurowska2023,
    figure: 'Fig. 8A',
  },
  extraprostaticExtension: {
    src: '/scans/pirads/extraprostatic-extension.jpg',
    alt: 'Axial T2-weighted MRI: an anterior dark lesion breaking through into the fat in front of the prostate',
    caption: 'Anterior cancer with established extraprostatic extension: low T2 signal disrupting the anterior fibromuscular stroma and extending 9 mm into the periprostatic fat.',
    source: S.agrotis2026,
    figure: 'Fig. 3A',
  },
} satisfies Record<string, ScanImage>
