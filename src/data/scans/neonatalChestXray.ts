import { SCAN_SOURCES as S } from './sources'
import type { ScanImage } from './types'

/** Radiograph examples for the neonatal chest X-ray study (`src/studies/NeonatalChestXrayStudy.tsx`). */
export const neonatalChestXrayScans = {
  ettLandmarks: {
    src: '/scans/neonatal-chest-xray/ett-landmarks.jpg',
    alt: 'Frontal chest radiograph of a preterm baby with a nasotracheal tube; a bar across the top of the chest joins the clavicles, a shaded bar marks the tube position and a star marks the carina',
    caption: 'Correct nasotracheal tube placement in a baby born at 26 weeks. The bar across the top joins the clavicles, the star marks the carina, and the shaded bar between them is the optimal tube position.',
    source: S.tippmann2026,
    figure: 'Fig. 1',
  },
  ettRightBronchus: {
    src: '/scans/neonatal-chest-xray/ett-right-bronchus.jpg',
    alt: 'Frontal chest radiograph of a preterm baby: the endotracheal tube tip lies in the right main bronchus and the whole left lung is white and collapsed',
    caption: 'Born at 29 weeks (745 g): the tip of the endotracheal tube lies in the right bronchus (arrow), and selective intubation has caused complete collapse of the left lung.',
    source: S.dominguez2018,
    figure: 'Fig. 1',
  },
  umbilicalCatheters: {
    src: '/scans/neonatal-chest-xray/umbilical-catheters.jpg',
    alt: 'Frontal chest radiograph of a newborn with labelled umbilical venous and arterial catheters, both tips at the level of the eighth thoracic vertebra',
    caption: 'Optimal position of umbilical catheters on the first day of life: the umbilical venous catheter tip and the umbilical arterial catheter tip both lie at T8.',
    source: S.judd2026,
    figure: 'Fig. 1A',
  },
  uvcLateral: {
    src: '/scans/neonatal-chest-xray/uvc-lateral.jpg',
    alt: 'Lateral chest and upper abdominal radiograph of a newborn with an arrow at the tip of an umbilical venous catheter at the level of the diaphragm',
    caption: 'Lateral view: the umbilical venous catheter tip (arrow) lies at the junction of the inferior vena cava and the right atrium, at the level of the diaphragm. On this baby\'s frontal film the tip had appeared to lie in the right atrium.',
    source: S.alDajani2023,
    figure: 'Fig. 3',
  },
  uvcInLiver: {
    src: '/scans/neonatal-chest-xray/uvc-in-liver.jpg',
    alt: 'Frontal chest and abdominal radiograph of a newborn: an umbilical venous catheter runs straight up the right side of the abdomen and ends low, over the liver',
    caption: 'On day 3 the umbilical venous catheter tip has migrated down to the T12 level, likely in the liver parenchyma.',
    source: S.sohane2025,
    figure: 'Fig. 5B',
  },
  piccInLiver: {
    src: '/scans/neonatal-chest-xray/picc-in-liver.jpg',
    alt: 'Frontal abdominal radiograph of a newborn with labelled PICC and UVC: the PICC turns into a vein in the liver below the diaphragm',
    caption: 'Before repositioning: the umbilical venous catheter tip lies at T9, while the PICC runs into an intrahepatic vein below the diaphragm (T10 to T11), its tip ending within the liver.',
    source: S.song2026b,
    figure: 'Fig. 2A',
  },
  rdsGrade2: {
    src: '/scans/neonatal-chest-xray/rds-grade2.jpg',
    alt: 'Frontal chest radiograph of a preterm baby with diffuse granular opacity of both lungs; the heart and diaphragm outlines are still distinct',
    caption: 'Respiratory distress syndrome, grade 2: more prominent opacification of relatively well-expanded lungs, with more air bronchograms, and the heart and diaphragm contours still distinct.',
    source: S.lovrenski2025,
    figure: 'Fig. 2B',
  },
  transientTachypnoea: {
    src: '/scans/neonatal-chest-xray/transient-tachypnoea.jpg',
    alt: 'Frontal chest radiograph of a term newborn with mildly hyperinflated lungs, streaky perihilar markings and asterisks and a pointer on the lungs',
    caption: 'Transient tachypnoea of the newborn: straightened ribs and wider intercostal spaces from mild hyperinflation, streaky infiltrates (asterisks), fluid in the horizontal fissure (white pointer) and perihilar streaking.',
    source: S.chavan2022,
    figure: 'Fig. 1',
  },
  meconiumAspiration: {
    src: '/scans/neonatal-chest-xray/meconium-aspiration.jpg',
    alt: 'Frontal chest radiograph of a newborn with diffuse patchy opacities through both lungs and an endotracheal tube',
    caption: 'Meconium aspiration: diffuse patchy opacification of the lungs.',
    source: S.olicker2021,
    figure: 'Fig. 2',
  },
  supinePneumothorax: {
    src: '/scans/neonatal-chest-xray/supine-pneumothorax.jpg',
    alt: 'Frontal supine chest radiograph of a newborn: the left upper chest is darker than the right and the left heart border is sharply outlined',
    caption: 'Left-sided pneumothorax, with two-sided pneumonia, in a newborn; a central catheter from the left arm ends in the superior vena cava.',
    source: S.hammon2019,
    figure: 'Fig. 3c',
  },
  interstitialEmphysema: {
    src: '/scans/neonatal-chest-xray/interstitial-emphysema.jpg',
    alt: 'Frontal chest and abdominal radiograph of a very preterm baby: the left lung is full of small bubbly lucencies and the mediastinum is pushed slightly to the right',
    caption: 'Day 5 of life, on nasal CPAP: severe, diffuse left-sided pulmonary interstitial emphysema with mild mediastinal shift to the right.',
    source: S.lei2019,
    figure: 'Fig. 2',
  },
  spinnakerSail: {
    src: '/scans/neonatal-chest-xray/spinnaker-sail.jpg',
    alt: 'Frontal chest radiograph of a term newborn: air in the mediastinum lifts the right thymic lobe off the heart, labelled T for thymus and H for heart, with arrows',
    caption: 'Spontaneous pneumomediastinum on day 2: the spinnaker-sail sign. The lateral arrow marks the edge of the fascia over the thymus and pericardium, which traps the leaked air; the two medial arrows mark air trapped behind it. T, thymus; H, heart.',
    source: S.zamlout2025,
    figure: 'Fig. 1A',
  },
} satisfies Record<string, ScanImage>
