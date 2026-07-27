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
      { path: '/lungrads', name: 'Lung-RADS', description: 'Screening LDCT nodule categorization with management and impression text.' },
      { path: '/pe-rads', name: 'PE-RADS', description: 'PE-RADS v2026 structured reporting helper for acute pulmonary embolism with clot-location hierarchy, modifiers, and copyable impression text.' },
    ],
  },
  {
    name: 'Abdomen',
    items: [
      { path: '/lirads', name: 'LI-RADS', description: 'CT/MRI liver lesion categorization with copyable impression text.' },
      { path: '/bosniak', name: 'Bosniak 2019', description: 'Cystic renal mass classification with management and impression text.' },
      { path: '/pancreatic-cyst', name: 'Pancreatic cyst', description: 'Dedicated incidental pancreatic cyst surveillance and escalation logic.' },
      { path: '/incidental', name: 'Incidental', description: 'ACR-style helpers for adrenal incidentalomas, pancreatic cysts, and renal masses.' },
      { path: '/adrenal-washout', name: 'Adrenal washout', description: 'APW/RPW washout calculator with adenoma thresholds and copyable impression text.' },
    ],
  },
  {
    name: 'Pelvis / OB-GYN',
    items: [
      { path: '/orads', name: 'O-RADS', description: 'US and MRI adnexal lesion stratification with modality-aware inputs.' },
      { path: '/pi-rads', name: 'PI-RADS', description: 'PI-RADS v2.1 zonal assessment category calculator for prostate MRI with copyable impression text.' },
      { path: '/early-pregnancy-loss', name: 'Early pregnancy loss', description: 'SRU consensus criteria for diagnostic vs. suspicious first-trimester ultrasound findings, with copyable impression text.' },
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
      { path: '/aast-organ-injury', name: 'AAST grading', description: 'Quick-reference AAST Organ Injury Scale (2018) grades for spleen, liver, and kidney trauma.' },
    ],
  },
  {
    name: 'Vascular',
    items: [
      { path: '/vascular-diameters', name: 'Vessel diameters', description: 'Quick-reference adult vessel caliber, ectasia, and aneurysm thresholds.' },
    ],
  },
  {
    name: 'Labs & scores',
    items: [
      { path: '/meld', name: 'MELD', description: 'MELD 3.0 by default with optional MELD-Na comparison and copyable impression text.' },
    ],
  },
  {
    name: 'Safety',
    items: [
      { path: '/contrast-reactions', name: 'Contrast reactions', description: 'Acute contrast reaction severity triage with bedside action guidance and copyable chart/report text.' },
      { path: '/contrast-premedication', name: 'Contrast premedication', description: 'Elective oral and accelerated IV premedication regimens for prior contrast reactions, with copyable plan text.' },
      { path: '/contrast-extravasation', name: 'Contrast extravasation', description: 'Exam-based triage for contrast extravasation injuries with urgent surgical consultation flags and copyable documentation text.' },
    ],
  },
]

export const calculators: CalculatorItem[] = categories.flatMap((category) => category.items)
