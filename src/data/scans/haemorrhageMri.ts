import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** MRI for the haemorrhage on MRI page. */
export const haemorrhageMriScans = {
  hyperacuteHaematoma: {
    src: '/scans/haemorrhage-mri/hyperacute-haematoma.jpg',
    alt: 'Axial FLAIR MRI: a round bright haematoma in the right frontal lobe, on the left of the image',
    caption: 'Hyperacute intracerebral haemorrhage on T2 FLAIR.',
    source: S.penckofer2024,
    figure: 'Fig. 1A',
  },
  acuteHaematoma: {
    src: '/scans/haemorrhage-mri/acute-haematoma.jpg',
    alt: 'Axial T2-weighted MRI: a large haematoma deep in the left hemisphere beside the third ventricle, on the right of the image, mostly dark with a bright rim',
    caption: 'Acute intracerebral haemorrhage on T2-weighted MRI (the source labels it T2 FLAIR).',
    source: S.penckofer2024,
    figure: 'Fig. 1A',
  },
  lateSubacuteHaematoma: {
    src: '/scans/haemorrhage-mri/late-subacute-haematoma.jpg',
    alt: 'Axial T1-weighted MRI: a small round bright haematoma in the left parietal white matter beside the midline, on the right of the image',
    caption: 'Late subacute intracerebral haemorrhage on T1.',
    source: S.penckofer2024,
    figure: 'Fig. 1A',
  },
  chronicHaematoma: {
    src: '/scans/haemorrhage-mri/chronic-haematoma.jpg',
    alt: 'T2-weighted MRI: a small cavity in the right basal ganglia, on the left of the image, bright inside with a dark rim, beside the lateral ventricle',
    caption: 'Chronic hypertensive intraparenchymal bleed in the right basal ganglia on T2: bright, with a haemosiderin-stained rim.',
    source: S.patra2019,
    figure: 'Fig. 7B',
  },
  chronicSubdural: {
    src: '/scans/haemorrhage-mri/chronic-subdural.jpg',
    alt: 'Axial FLAIR MRI: bright crescent-shaped collections over both hemispheres, marked by arrows; the right one, on the left of the image, is uneven in signal',
    caption: 'Bilateral chronic subdural haematomas, bright on T2 FLAIR at 3 T (arrows).',
    source: S.kuczynski2026,
    figure: 'Fig. 6',
  },
  sahFlair: {
    src: '/scans/haemorrhage-mri/sah-flair.jpg',
    alt: 'Axial FLAIR MRI high in the head: a bright line in a right frontal sulcus, on the left of the image, marked by an arrow',
    caption: 'Cortical subarachnoid haemorrhage on FLAIR: bright signal in a right frontal sulcus (arrow), in a 74-year-old woman with cerebral amyloid angiopathy.',
    source: S.weidauer2023,
    figure: 'Fig. 6b',
  },
  superficialSiderosis: {
    src: '/scans/haemorrhage-mri/superficial-siderosis.jpg',
    alt: 'Axial SWI at the level of the midbrain: a dark line coats the surface of the midbrain and cerebellum; an arrowhead points to it beside the midbrain',
    caption: 'Superficial siderosis on SWI: pial signal loss in the posterior fossa (arrowhead), in a 59-year-old man with progressive gait ataxia.',
    source: S.weidauer2023,
    figure: 'Fig. 5b',
  },
  microbleeds: {
    src: '/scans/haemorrhage-mri/microbleeds.jpg',
    alt: 'Axial SWI high in the head: many small round dark dots through both hemispheres and dark lines along some sulci; an arrowhead marks a larger dark focus in the left frontal lobe, on the right of the image',
    caption:
      'Multiple microbleeds and cortical superficial siderosis on SWI, in a 72-year-old man with cerebral amyloid angiopathy; the arrowhead marks residual intracerebral bleeding in the left frontal lobe.',
    source: S.weidauer2023,
    figure: 'Fig. 7g',
  },
} satisfies Record<string, ScanImage>
