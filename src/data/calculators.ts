import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

/**
 * Each calculator page is its own chunk, fetched on first navigation to its route.
 * Workbox precaches every built .js file, so the chunks are still available offline.
 */
function lazyPage<M extends Record<string, unknown>>(load: () => Promise<M>, name: keyof M) {
  return lazy(async () => ({ default: (await load())[name] as ComponentType }))
}


export type CalculatorItem = {
  path: string
  name: string
  description: string
  /** Extra search terms: synonyms, organs, acronyms, and criteria names. */
  keywords?: string[]
  /** The page rendered at `path`. Listing it here is what registers the route. */
  component: LazyExoticComponent<ComponentType>
}

export type CalculatorCategory = {
  name: string
  items: CalculatorItem[]
  /** What one item in this category is called on the home page. Defaults to 'calculator'. */
  itemLabel?: string
}

export const categories: CalculatorCategory[] = [
  {
    name: 'Chest',
    items: [
      { path: '/lungrads', name: 'Lung-RADS', description: 'Screening LDCT nodule category, management, and impression text.', keywords: ['lung', 'pulmonary nodule', 'screening', 'ldct', 'chest ct'], component: lazyPage(() => import('../pages/LungRadsPage'), 'LungRadsPage') },
      { path: '/fleischner', name: 'Fleischner 2017', description: 'Incidental pulmonary nodule follow-up on CT, by nodule type, size, and risk.', keywords: ['lung', 'pulmonary nodule', 'incidental', 'ground-glass', 'part-solid', 'subsolid', 'follow-up'], component: lazyPage(() => import('../pages/FleischnerPage'), 'FleischnerPage') },
      { path: '/pe-rads', name: 'PE-RADS', description: 'Acute PE reporting with clot-location hierarchy, modifiers, and impression text.', keywords: ['pulmonary embolism', 'pe', 'ctpa', 'clot', 'chest'], component: lazyPage(() => import('../pages/PERadsPage'), 'PERadsPage') },
    ],
  },
  {
    name: 'Abdomen',
    items: [
      { path: '/lirads', name: 'LI-RADS', description: 'CT and MRI liver lesion category with impression text.', keywords: ['liver', 'hepatocellular carcinoma', 'hcc', 'cirrhosis', 'hepatic'], component: lazyPage(() => import('../pages/LiradsPage'), 'LiradsPage') },
      { path: '/bosniak', name: 'Bosniak 2019', description: 'Cystic renal mass class, management, and impression text.', keywords: ['renal', 'kidney', 'cystic', 'cyst'], component: lazyPage(() => import('../pages/BosniakPage'), 'BosniakPage') },
      { path: '/pancreatic-cyst', name: 'Pancreatic cyst', description: 'Incidental pancreatic cyst surveillance and escalation thresholds.', keywords: ['pancreas', 'ipmn', 'mucinous', 'surveillance'], component: lazyPage(() => import('../pages/PancreaticCystPage'), 'PancreaticCystPage') },
      { path: '/incidental', name: 'Incidental', description: 'ACR-style workup for adrenal, pancreatic, and renal incidentalomas.', keywords: ['incidentaloma', 'adrenal', 'pancreas', 'renal', 'kidney', 'workup'], component: lazyPage(() => import('../pages/IncidentalPage'), 'IncidentalPage') },
      { path: '/adrenal-washout', name: 'Adrenal washout', description: 'APW and RPW with adenoma thresholds and impression text.', keywords: ['adrenal', 'adenoma', 'apw', 'rpw', 'washout', 'hounsfield'], component: lazyPage(() => import('../pages/AdrenalWashoutPage'), 'AdrenalWashoutPage') },
    ],
  },
  {
    name: 'Pelvis / OB-GYN',
    items: [
      { path: '/orads', name: 'O-RADS', description: 'Adnexal lesion risk on ultrasound or MRI, with modality-aware inputs.', keywords: ['ovary', 'ovarian', 'adnexal', 'gynecologic'], component: lazyPage(() => import('../pages/OradsPage'), 'OradsPage') },
      { path: '/pi-rads', name: 'PI-RADS', description: 'Prostate MRI zonal assessment, v2.1, with impression text.', keywords: ['prostate', 'prostatic', 'mri', 'peripheral zone', 'transition zone'], component: lazyPage(() => import('../pages/PiRadsPage'), 'PiRadsPage') },
      { path: '/early-pregnancy-loss', name: 'Early pregnancy loss', description: 'SRU criteria for diagnostic versus suspicious first-trimester findings.', keywords: ['miscarriage', 'gestational sac', 'first trimester', 'obstetric', 'sru', 'crown rump'], component: lazyPage(() => import('../pages/EarlyPregnancyLossPage'), 'EarlyPregnancyLossPage') },
      { path: '/adnexal-cyst', name: 'Adnexal cyst follow-up', description: 'SRU 2019 follow-up intervals and report wording for simple adnexal cysts.', keywords: ['ovary', 'ovarian', 'adnexal', 'simple cyst', 'follicle', 'paraovarian', 'paratubal', 'sru', 'follow-up', 'surveillance', 'cyst'], component: lazyPage(() => import('../pages/AdnexalCystPage'), 'AdnexalCystPage') },
    ],
  },
  {
    name: 'Neck',
    items: [
      { path: '/tirads', name: 'TI-RADS', description: 'Thyroid nodule scoring, description, and report-ready impression.', keywords: ['thyroid', 'nodule', 'neck', 'acr'], component: lazyPage(() => import('../pages/TiradsPage'), 'TiradsPage') },
    ],
  },
  {
    name: 'Anatomy',
    itemLabel: 'reference',
    items: [
      { path: '/otic-capsule', name: 'Otic capsule', description: 'Rotatable temporal bone: cochlea, vestibule, semicircular canals, and the facial nerve canal.', keywords: ['temporal bone', 'ear', 'inner ear', 'labyrinth', 'cochlea', 'vestibule', 'semicircular canal', 'facial nerve', 'petrous', 'otic capsule', 'otosclerosis', 'anatomy', '3d'], component: lazyPage(() => import('../pages/OticCapsulePage'), 'OticCapsulePage') },
      { path: '/ossicular-chain', name: 'Ossicular chain', description: 'Malleus, incus, and stapes in the tympanic cavity, with a reconstructed slice through the model.', keywords: ['temporal bone', 'ear', 'middle ear', 'ossicles', 'ossicular', 'malleus', 'incus', 'stapes', 'eardrum', 'tympanic', 'stapedius', 'tensor tympani', 'cholesteatoma', 'conductive hearing loss', 'anatomy', '3d'], component: lazyPage(() => import('../pages/OssicularChainPage'), 'OssicularChainPage') },
    ],
  },
  {
    name: 'Trauma',
    items: [
      { path: '/aast-organ-injury', name: 'AAST grading', description: 'AAST 2018 injury grades for spleen, liver, and kidney.', keywords: ['trauma', 'spleen', 'splenic', 'liver', 'hepatic', 'kidney', 'renal', 'laceration', 'injury grade'], component: lazyPage(() => import('../pages/AastOrganInjuryPage'), 'AastOrganInjuryPage') },
    ],
  },
  {
    name: 'Vascular',
    items: [
      { path: '/vascular-diameters', name: 'Vessel diameters', description: 'Adult vessel caliber, ectasia, and aneurysm thresholds.', keywords: ['aorta', 'aortic', 'aneurysm', 'artery', 'ectasia', 'caliber'], component: lazyPage(() => import('../pages/VascularDiameterPage'), 'VascularDiameterPage') },
    ],
  },
  {
    name: 'Labs & scores',
    items: [
      { path: '/meld', name: 'MELD', description: 'MELD 3.0 with optional MELD-Na comparison and impression text.', keywords: ['liver', 'cirrhosis', 'transplant', 'sodium', 'bilirubin', 'creatinine', 'inr'], component: lazyPage(() => import('../pages/MeldPage'), 'MeldPage') },
    ],
  },
  {
    name: 'Formulas',
    items: [
      { path: '/ellipsoid-volume', name: 'Ellipsoid volume', description: 'Organ or lesion volume from three axes, with optional PSA density.', keywords: ['volume', 'prostate', 'psa density', 'size', 'measurement'], component: lazyPage(() => import('../pages/EllipsoidVolumePage'), 'EllipsoidVolumePage') },
      { path: '/carotid-stenosis', name: 'Carotid stenosis', description: 'NASCET percentage stenosis with the ECST equivalent and impression text.', keywords: ['carotid', 'nascet', 'ecst', 'ica', 'stroke', 'stenosis'], component: lazyPage(() => import('../pages/CarotidStenosisPage'), 'CarotidStenosisPage') },
      { path: '/adrenal-chemical-shift', name: 'Adrenal chemical shift', description: 'Opposed-phase signal intensity index and adrenal-to-spleen ratio.', keywords: ['adrenal', 'adenoma', 'in-phase', 'opposed-phase', 'signal intensity index', 'mri'], component: lazyPage(() => import('../pages/AdrenalChemicalShiftPage'), 'AdrenalChemicalShiftPage') },
      { path: '/doppler-indices', name: 'Doppler indices', description: 'Resistive index, pulsatility index, and systolic/diastolic ratio.', keywords: ['resistive index', 'pulsatility index', 'ri', 'pi', 'ultrasound', 'waveform'], component: lazyPage(() => import('../pages/DopplerIndicesPage'), 'DopplerIndicesPage') },
    ],
  },
  {
    name: 'Safety',
    items: [
      { path: '/contrast-reactions', name: 'Contrast reactions', description: 'Reaction severity triage with bedside actions and chart text.', keywords: ['allergy', 'anaphylaxis', 'epinephrine', 'iodinated', 'gadolinium', 'hives', 'safety'], component: lazyPage(() => import('../pages/ContrastReactionsPage'), 'ContrastReactionsPage') },
      { path: '/contrast-premedication', name: 'Contrast premedication', description: 'Oral and accelerated IV regimens for a prior contrast reaction.', keywords: ['steroid', 'prednisone', 'methylprednisolone', 'allergy', 'premed'], component: lazyPage(() => import('../pages/ContrastPremedicationPage'), 'ContrastPremedicationPage') },
      { path: '/contrast-extravasation', name: 'Contrast extravasation', description: 'Extravasation triage with surgical consult flags and documentation text.', keywords: ['infiltration', 'iv', 'swelling', 'compartment syndrome'], component: lazyPage(() => import('../pages/ContrastExtravasationPage'), 'ContrastExtravasationPage') },
      { path: '/ir-anticoagulation', name: 'Periprocedural anticoagulation', description: 'SIR 2019 hold and restart times by procedure bleeding risk and agent.', keywords: ['warfarin', 'heparin', 'doac', 'apixaban', 'rivaroxaban', 'clopidogrel', 'aspirin', 'procedure', 'sir', 'hold'], component: lazyPage(() => import('../pages/IrAnticoagulationPage'), 'IrAnticoagulationPage') },
    ],
  },
]

export type IndexedCalculator = CalculatorItem & { category: string }

export const calculators: IndexedCalculator[] = categories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.name })),
)

/** Every entered word must appear somewhere in the item, so extra words narrow the list. */
export function matchesQuery(item: IndexedCalculator, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true
  const haystack = [item.name, item.description, item.category, ...(item.keywords ?? [])].join(' ').toLowerCase()
  return words.every((word) => haystack.includes(word))
}
