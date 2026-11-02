import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** CT and MRI for the brain vascular territories page. */
export const brainTerritoriesScans = {
  acaInfarct: {
    src: '/scans/brain-territories/aca-infarct.jpg',
    alt: 'Axial diffusion-weighted MRI high in the head: a bright patch in the right frontal lobe beside the midline, marked by an arrow',
    caption: 'Acute infarct in the right anterior cerebral artery territory (arrow); the cause in this series was ACA dissection.',
    source: S.sano2025,
    figure: 'Fig. 2A',
  },
  mcaInfarct: {
    src: '/scans/brain-territories/mca-infarct.jpg',
    alt: 'Axial CT: a dark area of low density in the left frontal lobe and insula, on the right of the image',
    caption: 'Left middle cerebral artery infarct on CT, 72 hours after admission.',
    source: S.john2008,
    figure: 'Fig. 2',
  },
  pcaInfarct: {
    src: '/scans/brain-territories/pca-infarct.jpg',
    alt: 'Axial CT: low density in the left occipital lobe, behind the lateral ventricle on the right of the image',
    caption: 'Left posterior cerebral artery territory infarct on plain CT, in a man with atrial fibrillation.',
    source: S.nouh2014,
    figure: 'Fig. 3C',
  },
  achaInfarct: {
    src: '/scans/brain-territories/acha-infarct.jpg',
    alt: 'Axial diffusion-weighted MRI: a bright oval lesion beside the left lateral ventricle, on the right of the image',
    caption: 'Acute infarct in the left basal ganglia on DWI, in the territory of the left anterior choroidal artery.',
    source: S.tsika2024,
    figure: 'Fig. 1b',
  },
  thalamicInfarct: {
    src: '/scans/brain-territories/thalamic-infarct.jpg',
    alt: 'Axial diffusion-weighted MRI: a bright spot in the lateral right thalamus (arrow) and another at the right occipital pole (arrowhead)',
    caption:
      'Infarct in the thalamogeniculate artery territory (arrow) with another in the same posterior cerebral artery territory (arrowhead), on DWI, from PCA occlusion.',
    source: S.renard2014,
    figure: 'Fig. 2a',
  },
  lateralMedullary: {
    src: '/scans/brain-territories/lateral-medullary.jpg',
    alt: 'Axial diffusion-weighted MRI of the posterior fossa: a small bright spot in the right side of the medulla, marked by an arrow',
    caption: 'Subacute infarct in the right lateral medulla on DWI (arrow), in a patient with Wallenberg syndrome.',
    source: S.xin2020,
    figure: 'Fig. 1b',
  },
  paramedianPontine: {
    src: '/scans/brain-territories/paramedian-pontine.jpg',
    alt: 'Axial diffusion-weighted MRI: a bright oval lesion in the front of the pons, just right of the midline, marked by an arrow',
    caption: 'Right ventral pontine infarct on DWI (arrow).',
    source: S.nouh2014,
    figure: 'Fig. 4A',
  },
  picaInfarct: {
    src: '/scans/brain-territories/pica-infarct.jpg',
    alt: 'Axial diffusion-weighted MRI: most of the right cerebellar hemisphere and the vermis are bright',
    caption:
      'Massive right cerebellar hemispheric and vermian infarct on DWI; panel C of the same figure shows a cut-off right posterior inferior cerebellar artery.',
    source: S.nouh2014,
    figure: 'Fig. 4D',
  },
  scaInfarct: {
    src: '/scans/brain-territories/sca-infarct.jpg',
    alt: 'Axial diffusion-weighted MRI at the level of the pons: the right cerebellar hemisphere is bright',
    caption: 'Acute infarct of the right cerebellar hemisphere and vermis on DWI, from occlusion of the right superior cerebellar artery.',
    source: S.gollwitzer2025,
    figure: 'Fig. 1A',
  },
  corticalBorderZone: {
    src: '/scans/brain-territories/cortical-border-zone.jpg',
    alt: 'Axial diffusion-weighted MRI: small bright cortical spots in the right frontal and right parieto-occipital regions',
    caption:
      'External (cortical) border zone infarcts between the right MCA and ACA and between the right MCA and PCA on DWI, with a symptomatic internal carotid stenosis.',
    source: S.dogariu2023,
    figure: 'Fig. 2b',
  },
  internalBorderZone: {
    src: '/scans/brain-territories/internal-border-zone.jpg',
    alt: 'Axial diffusion-weighted MRI: a chain of bright spots in the left deep white matter, in a line beside the lateral ventricle',
    caption: 'Confluent deep (internal) border zone infarct on axial DWI.',
    source: S.dogariu2023,
    figure: 'Fig. 3',
  },
  percheron: {
    src: '/scans/brain-territories/percheron.jpg',
    alt: 'Axial diffusion-weighted MRI: two bright areas in the medial thalami, one either side of the third ventricle',
    caption: 'Artery of Percheron infarct: restricted diffusion in both paramedian thalami on DWI.',
    source: S.kichloo2019,
    figure: 'Fig. 2',
  },
  lacune: {
    src: '/scans/brain-territories/lacune.jpg',
    alt: 'Coronal T2-weighted MRI: a small fluid-bright cavity in the putamen on the left of the image, marked by a black arrow',
    caption: 'Lacune in the putamen (arrow) on coronal T2.',
    source: S.furtner2021,
    figure: 'Fig. 5b',
  },
  parasagittalVenousInfarct: {
    src: '/scans/brain-territories/parasagittal-venous-infarct.jpg',
    alt: 'Axial CT: a small bright haemorrhage in the right frontal lobe near the midline, marked by an arrow',
    caption:
      'Right frontal parasagittal haemorrhage on plain CT (arrow), one of bilateral frontal parasagittal haemorrhages from superior sagittal sinus thrombosis.',
    source: S.li2021,
    figure: 'Fig. 6A',
  },
  temporalVenousInfarct: {
    src: '/scans/brain-territories/temporal-venous-infarct.jpg',
    alt: 'Axial FLAIR MRI: a bright area in the posterior right temporal lobe, on the left of the image',
    caption:
      'Vasogenic oedema of a venous infarct in the posterior right temporal lobe on FLAIR; MR angiography of the same patient showed no flow in the right transverse sinus.',
    source: S.oliveira2022,
    figure: 'Fig. 4B',
  },
  deepVenousThalami: {
    src: '/scans/brain-territories/deep-venous-thalami.jpg',
    alt: 'Axial FLAIR MRI: both thalami are swollen and bright, marked by two arrows',
    caption: 'Vasogenic oedema in both thalami on FLAIR (arrows), from thrombosis of the deep cerebral veins.',
    source: S.renard2014,
    figure: 'Fig. 7a',
  },
  denseSinus: {
    src: '/scans/brain-territories/dense-sinus.jpg',
    alt: 'Axial plain CT of the posterior fossa: a bright crescent where the right transverse sinus meets the sigmoid sinus, on the left of the image',
    caption: 'Dense sinus: spontaneously dense thrombus at the junction of the right lateral (transverse) and sigmoid sinuses on plain CT.',
    source: S.sadik2022,
    figure: 'Fig. 15',
  },
  cordSign: {
    src: '/scans/brain-territories/cord-sign.jpg',
    alt: 'Coronal plain CT: a short bright line at the vertex just under the skull, marked by an arrow',
    caption: 'Cord sign: a dense, occluded cortical vein on coronal plain CT (arrow).',
    source: S.oliveira2022,
    figure: 'Fig. 2',
  },
  emptyDelta: {
    src: '/scans/brain-territories/empty-delta.jpg',
    alt: 'Axial contrast-enhanced T1 MRI: at the back of the head, a bright triangle of sinus wall around a dark centre in the superior sagittal sinus',
    caption: 'Empty delta sign: a central triangular filling defect in the superior sagittal sinus on contrast-enhanced 3D T1 MRI.',
    source: S.oliveira2022,
    figure: 'Fig. 5A',
  },
  venographyDefect: {
    src: '/scans/brain-territories/venography-defect.jpg',
    alt: 'Coronal CT angiogram: the right transverse sinus, on the left of the image, does not fill with contrast; an arrow points to it',
    caption: 'Filling defect in the right transverse sinus on coronal CT angiography (arrow), on the side of a chronic mastoiditis.',
    source: S.oliveira2022,
    figure: 'Fig. 9B',
  },
  swiBlooming: {
    src: '/scans/brain-territories/swi-blooming.jpg',
    alt: 'Axial T2* gradient-echo MRI at the vertex: several dark, thick cortical veins against bright brain',
    caption: 'Dark cortical veins at the vertex on T2* gradient echo, suggesting cortical vein thrombi.',
    source: S.sadik2022,
    figure: 'Fig. 9b',
  },
  arachnoidGranulation: {
    src: '/scans/brain-territories/arachnoid-granulation.jpg',
    alt: 'Plain CT: a small dark notch of fluid density inside the left transverse sinus, marked by an arrow',
    caption: 'Arachnoid granulation of normal CSF attenuation in the left transverse sinus on plain CT (arrow).',
    source: S.delgado2026,
    figure: 'Fig. 5a',
  },
  hypoplasticTransverse: {
    src: '/scans/brain-territories/hypoplastic-transverse.jpg',
    alt: 'Coronal phase-contrast MR venogram: a large right transverse sinus and almost no left one',
    caption: 'Hypoplastic left lateral (transverse) sinus: no filling on phase-contrast venography.',
    source: S.sadik2022,
    figure: 'Fig. 22b',
  },
  flowGap: {
    src: '/scans/brain-territories/flow-gap.jpg',
    alt: 'Axial time-of-flight MR venogram: gaps in the signal along both transverse sinuses',
    caption:
      'Flow gaps on time-of-flight venography in parts of both transverse sinuses; contrast-enhanced venography of the same patient did not confirm them.',
    source: S.zedde2025,
    figure: 'Fig. 9a',
  },
} satisfies Record<string, ScanImage>
