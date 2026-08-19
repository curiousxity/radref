export type CalculatorItem = {
  path: string
  name: string
  description: string
}

export type CalculatorCategory = {
  name: string
  items: CalculatorItem[]
}

export const categories: CalculatorCategory[] = [
  {
    name: 'Chest',
    items: [
      { path: '/lungrads', name: 'Lung-RADS', description: 'Screening LDCT nodule category, management, and impression text.' },
      { path: '/pe-rads', name: 'PE-RADS', description: 'Acute PE reporting with clot-location hierarchy, modifiers, and impression text.' },
    ],
  },
  {
    name: 'Abdomen',
    items: [
      { path: '/lirads', name: 'LI-RADS', description: 'CT and MRI liver lesion category with impression text.' },
      { path: '/bosniak', name: 'Bosniak 2019', description: 'Cystic renal mass class, management, and impression text.' },
      { path: '/pancreatic-cyst', name: 'Pancreatic cyst', description: 'Incidental pancreatic cyst surveillance and escalation thresholds.' },
      { path: '/incidental', name: 'Incidental', description: 'ACR-style workup for adrenal, pancreatic, and renal incidentalomas.' },
      { path: '/adrenal-washout', name: 'Adrenal washout', description: 'APW and RPW with adenoma thresholds and impression text.' },
    ],
  },
  {
    name: 'Pelvis / OB-GYN',
    items: [
      { path: '/orads', name: 'O-RADS', description: 'Adnexal lesion risk on ultrasound or MRI, with modality-aware inputs.' },
      { path: '/pi-rads', name: 'PI-RADS', description: 'Prostate MRI zonal assessment, v2.1, with impression text.' },
      { path: '/early-pregnancy-loss', name: 'Early pregnancy loss', description: 'SRU criteria for diagnostic versus suspicious first-trimester findings.' },
    ],
  },
  {
    name: 'Neck',
    items: [
      { path: '/tirads', name: 'TI-RADS', description: 'Thyroid nodule scoring, description, and report-ready impression.' },
    ],
  },
  {
    name: 'Trauma',
    items: [
      { path: '/aast-organ-injury', name: 'AAST grading', description: 'AAST 2018 injury grades for spleen, liver, and kidney.' },
    ],
  },
  {
    name: 'Vascular',
    items: [
      { path: '/vascular-diameters', name: 'Vessel diameters', description: 'Adult vessel caliber, ectasia, and aneurysm thresholds.' },
    ],
  },
  {
    name: 'Labs & scores',
    items: [
      { path: '/meld', name: 'MELD', description: 'MELD 3.0 with optional MELD-Na comparison and impression text.' },
    ],
  },
  {
    name: 'Formulas',
    items: [
      { path: '/ellipsoid-volume', name: 'Ellipsoid volume', description: 'Organ or lesion volume from three axes, with optional PSA density.' },
      { path: '/carotid-stenosis', name: 'Carotid stenosis', description: 'NASCET percentage stenosis with the ECST equivalent and impression text.' },
      { path: '/adrenal-chemical-shift', name: 'Adrenal chemical shift', description: 'Opposed-phase signal intensity index and adrenal-to-spleen ratio.' },
      { path: '/doppler-indices', name: 'Doppler indices', description: 'Resistive index, pulsatility index, and systolic/diastolic ratio.' },
    ],
  },
  {
    name: 'Safety',
    items: [
      { path: '/contrast-reactions', name: 'Contrast reactions', description: 'Reaction severity triage with bedside actions and chart text.' },
      { path: '/contrast-premedication', name: 'Contrast premedication', description: 'Oral and accelerated IV regimens for a prior contrast reaction.' },
      { path: '/contrast-extravasation', name: 'Contrast extravasation', description: 'Extravasation triage with surgical consult flags and documentation text.' },
      { path: '/ir-anticoagulation', name: 'Periprocedural anticoagulation', description: 'SIR 2019 hold and restart times by procedure bleeding risk and agent.' },
    ],
  },
]

export const calculators: CalculatorItem[] = categories.flatMap((category) => category.items)
