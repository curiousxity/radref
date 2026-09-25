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
  /** Subheading this item sits under within its category, on the home page and in the menu. */
  group?: string
  /**
   * Paths of closely related items, e.g. a lesson and the calculator that applies it.
   * Declare a link on one side only; `relatedTo` makes it two-way.
   */
  related?: string[]
}

export type CalculatorCategory = {
  name: string
  items: CalculatorItem[]
  /** What one item in this category is called on the home page. Defaults to 'calculator'. */
  itemLabel?: string
  /** One line under the category heading on the home page. */
  blurb?: string
}

export const categories: CalculatorCategory[] = [
  {
    name: 'Studies',
    itemLabel: 'study',
    blurb: 'One page per exam: build the report step by step, learn the method with the papers behind each rule, then test yourself. Personal teaching notes compiled from the cited literature. Check the current guideline before applying to a patient.',
    items: [
      { path: '/studies/rectal-mri', name: 'Rectal MRI', group: 'Abdomen and pelvis', description: 'Staging a new rectal cancer: MRF, T stage, EMVI, nodes, low tumors, and a structured report.', keywords: ['rectum', 'rectal cancer', 'colorectal', 'mri', 'staging', 'mesorectal fascia', 'mrf', 'crm', 'emvi', 'tumor deposit', 'lateral lymph node', 'esgar', 'mercury', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/RectalMriStudy'), 'RectalMriStudyPage') },
      { path: '/studies/prostate-mri', name: 'Prostate MRI', group: 'Abdomen and pelvis', related: ['/pi-rads', '/ellipsoid-volume'], description: 'Zonal anatomy, what each sequence answers, PZ and TZ scoring, EPE grading, mimics.', keywords: ['prostate', 'pi-rads', 'pirads', 'mri', 'peripheral zone', 'transition zone', 'extraprostatic extension', 'epe', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/ProstateMriStudy'), 'ProstateMriStudyPage') },
      { path: '/studies/renal-mass', name: 'Renal mass CT and MRI', group: 'Abdomen and pelvis', related: ['/bosniak', '/incidental'], description: 'The enhancement rule, Bosniak v2019, clear cell likelihood score, staging, surgical anatomy.', keywords: ['kidney', 'renal', 'renal cell carcinoma', 'rcc', 'bosniak', 'cystic', 'clear cell likelihood', 'ccls', 'nephrectomy', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/RenalMassStudy'), 'RenalMassStudyPage') },
      { path: '/studies/adnexal-mri', name: 'Adnexal mass MRI', group: 'Abdomen and pelvis', related: ['/orads', '/adnexal-cyst'], description: 'The O-RADS MRI algorithm step by step, the score table, pathologies by score, and the misclassified cases.', keywords: ['ovary', 'ovarian', 'adnexal', 'o-rads', 'orads', 'mri', 'gynecologic', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/AdnexalMriStudy'), 'AdnexalMriStudyPage') },
      { path: '/studies/pancreatic-mass-ct', name: 'Pancreatic mass CT', group: 'Abdomen and pelvis', related: ['/studies/pancreatic-cysts'], description: 'Finding the isoattenuating tumor, the differential, NCCN vessel staging, the SAR/APA template.', keywords: ['pancreas', 'pancreatic cancer', 'adenocarcinoma', 'pdac', 'resectability', 'nccn', 'sar', 'apa', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/PancreaticMassCtStudy'), 'PancreaticMassCtStudyPage') },
      { path: '/studies/pancreatic-cysts', name: 'Pancreatic cysts', group: 'Abdomen and pelvis', related: ['/pancreatic-cyst', '/incidental'], description: 'ACR 2017, Fukuoka 2017 and Kyoto 2024: worrisome features, growth, follow-up schedules.', keywords: ['pancreas', 'ipmn', 'mucinous', 'cyst', 'fukuoka', 'kyoto', 'worrisome features', 'high-risk stigmata', 'surveillance', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/PancreaticCystsStudy'), 'PancreaticCystsStudyPage') },
      { path: '/studies/ct-colonography', name: 'CT colonography', group: 'Abdomen and pelvis', description: 'Technique checks, 2D and 3D reading, polyp interrogation and measurement, the C-RADS 2023 categories.', keywords: ['colon', 'colonography', 'ctc', 'virtual colonoscopy', 'c-rads', 'polyp', 'colorectal', 'screening', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/CtColonographyStudy'), 'CtColonographyStudyPage') },
      { path: '/studies/epilepsy-mri', name: 'Epilepsy MRI', group: 'Neuro', description: 'HARNESS-MRI, the hippocampus-first search pattern, FCD hunting, LEATs, pitfalls, and the report.', keywords: ['brain', 'epilepsy', 'seizure', 'harness', 'hippocampal sclerosis', 'mesial temporal sclerosis', 'focal cortical dysplasia', 'fcd', 'leat', 'neuro', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/EpilepsyMriStudy'), 'EpilepsyMriStudyPage') },
      { path: '/studies/sinus-ct', name: 'Sinus CT before FESS', group: 'Head and neck', related: ['/skull-base'], description: 'Lund-Mackay, the three drainage pathways, and the CLOSE danger-zone checklist.', keywords: ['sinus', 'paranasal', 'fess', 'endoscopic sinus surgery', 'lund-mackay', 'ostiomeatal', 'keros', 'close', 'head and neck', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/SinusCtStudy'), 'SinusCtStudyPage') },
      { path: '/studies/temporal-bone-ct', name: 'Temporal bone CT', group: 'Head and neck', related: ['/otic-capsule', '/ossicular-chain'], description: 'Outside-in reading order, the FLOATS danger-zone checklist, the main pathologies, the template.', keywords: ['temporal bone', 'ear', 'middle ear', 'inner ear', 'cholesteatoma', 'otosclerosis', 'ossicles', 'floats', 'dehiscence', 'head and neck', 'lesson', 'teaching', 'report', 'template', 'quiz'], component: lazyPage(() => import('../studies/TemporalBoneCtStudy'), 'TemporalBoneCtStudyPage') },
    ],
  },
  {
    name: 'Chest',
    items: [
      { path: '/lungrads', name: 'Lung-RADS', description: 'Screening LDCT nodule category, management, and impression text.', keywords: ['lung', 'pulmonary nodule', 'screening', 'ldct', 'chest ct'], component: lazyPage(() => import('../pages/LungRadsPage'), 'LungRadsPage') },
      { path: '/fleischner', name: 'Fleischner 2017', related: ['/lungrads'], description: 'Incidental pulmonary nodule follow-up on CT, by nodule type, size, and risk.', keywords: ['lung', 'pulmonary nodule', 'incidental', 'ground-glass', 'part-solid', 'subsolid', 'follow-up'], component: lazyPage(() => import('../pages/FleischnerPage'), 'FleischnerPage') },
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
      { path: '/adrenal-washout', name: 'Adrenal washout', related: ['/adrenal-chemical-shift', '/incidental'], description: 'APW and RPW with adenoma thresholds and impression text.', keywords: ['adrenal', 'adenoma', 'apw', 'rpw', 'washout', 'hounsfield'], component: lazyPage(() => import('../pages/AdrenalWashoutPage'), 'AdrenalWashoutPage') },
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
      { path: '/otic-capsule', name: 'Otic capsule', group: 'Head and neck', description: 'Rotatable temporal bone: cochlea, vestibule, semicircular canals, and the facial nerve canal.', keywords: ['temporal bone', 'ear', 'inner ear', 'labyrinth', 'cochlea', 'vestibule', 'semicircular canal', 'facial nerve', 'petrous', 'otic capsule', 'otosclerosis', 'anatomy', '3d'], component: lazyPage(() => import('../pages/OticCapsulePage'), 'OticCapsulePage') },
      { path: '/ossicular-chain', name: 'Ossicular chain', group: 'Head and neck', description: 'Malleus, incus, and stapes in the tympanic cavity, with a reconstructed slice through the model.', keywords: ['temporal bone', 'ear', 'middle ear', 'ossicles', 'ossicular', 'malleus', 'incus', 'stapes', 'eardrum', 'tympanic', 'stapedius', 'tensor tympani', 'cholesteatoma', 'conductive hearing loss', 'anatomy', '3d'], component: lazyPage(() => import('../pages/OssicularChainPage'), 'OssicularChainPage') },
      { path: '/tmj', name: 'TMJ', group: 'Head and neck', description: 'Both TMJs with disc, capsule and masticators, a jaw-opening slider, oblique planes and click, lock and fracture mechanisms.', keywords: ['anatomy', '3d', 'tmj', 'temporomandibular joint', 'jaw', 'mandible', 'condyle', 'articular disc', 'disc displacement', 'wilkes', 'closed lock', 'condylar fracture', 'dislocation', 'ankylosis', 'head and neck', 'musculoskeletal', 'msk'], component: lazyPage(() => import('../pages/TmjPage'), 'TmjPage') },
      { path: '/skull-base', name: 'Skull base', group: 'Head and neck', description: 'Skull base foramina with all twelve cranial nerves routed through them, plus perineural spread, jugular foramen masses and fractures.', keywords: ['anatomy', '3d', 'skull base', 'foramina', 'cranial nerves', 'perineural spread', 'jugular foramen', 'clivus', 'cavernous sinus', 'pterygopalatine fossa', 'foramen ovale', 'carotid canal', 'chordoma', 'paraganglioma', 'head and neck', 'neuro'], component: lazyPage(() => import('../pages/SkullBasePage'), 'SkullBasePage') },
      { path: '/suprahyoid-spaces', name: 'Suprahyoid neck spaces', group: 'Head and neck', description: 'Ten suprahyoid neck spaces around the skull base, with a live slice and parapharyngeal fat-shift mass localiser.', keywords: ['anatomy', '3d', 'head and neck', 'neuro', 'suprahyoid', 'neck spaces', 'parapharyngeal', 'masticator', 'carotid space', 'parotid', 'retropharyngeal', 'perivertebral', 'submandibular', 'sublingual', 'buccal', 'harnsberger', 'fat shift', 'deep lobe'], component: lazyPage(() => import('../pages/SuprahyoidSpacesPage'), 'SuprahyoidSpacesPage') },
      { path: '/larynx', name: 'Larynx', group: 'Head and neck', description: 'Laryngeal subsites, pre-epiglottic and paraglottic fat, and cartilage invasion, stepped through AJCC 8th T staging.', keywords: ['anatomy', '3d', 'larynx', 'laryngeal cancer', 'glottic', 'supraglottic', 'subglottic', 't staging', 'ajcc', 'paraglottic space', 'pre-epiglottic space', 'cartilage invasion', 'thyroid cartilage', 'cricoid', 'vocal cord', 'head and neck'], component: lazyPage(() => import('../pages/LarynxPage'), 'LarynxPage') },
      { path: '/cervical-spine', name: 'Cervical spine', group: 'Spine and brachial plexus', description: 'Occiput to T1 with craniocervical ligaments and cord, eleven gradable trauma patterns and six injury mechanisms.', keywords: ['anatomy', '3d', 'spine', 'neuro', 'cervical spine', 'c-spine', 'trauma', 'craniocervical junction', 'atlanto-occipital dissociation', 'odontoid', 'jefferson', 'hangman', 'facet dislocation', 'ao spine', 'slic', 'vertebral artery', 'spinal cord injury', 'ligaments'], component: lazyPage(() => import('../pages/CervicalSpinePage'), 'CervicalSpinePage') },
      { path: '/brachial-plexus', name: 'Brachial plexus', group: 'Spine and brachial plexus', description: 'Brachial plexus from C5–T1 roots to terminal nerves, with outlet tunnels, live axial slice and traction mechanisms.', keywords: ['anatomy', '3d', 'brachial plexus', 'plexus', 'nerve', 'neurography', 'roots', 'trunks', 'cords', 'thoracic outlet', 'parsonage-turner', 'avulsion', 'scalene', 'costoclavicular', 'musculoskeletal', 'msk', 'neuro'], component: lazyPage(() => import('../pages/BrachialPlexusPage'), 'BrachialPlexusPage') },
      { path: '/lumbar-spine', name: 'Lumbar spine', group: 'Spine and brachial plexus', description: 'Rotatable L1–S1 spine with canal, foramina and roots: grade herniation, stenosis, listhesis and Modic change.', keywords: ['lumbar spine', 'spine', 'disc', 'disc herniation', 'fardon', 'spinal stenosis', 'schizas', 'foraminal stenosis', 'spondylolisthesis', 'spondylolysis', 'pars', 'meyerding', 'modic', 'nerve root', 'musculoskeletal', 'msk', 'neuro', 'anatomy', '3d'], component: lazyPage(() => import('../pages/LumbarSpinePage'), 'LumbarSpinePage') },
      { path: '/pelvis-si', name: 'Pelvis and SI joints', group: 'Pelvis and limbs', description: 'Rotatable pelvis and SI joints: pelvic ring, sacral and acetabular fracture patterns, and sacroiliitis lesions.', keywords: ['pelvis', 'pelvic ring', 'sacroiliac joint', 'si joint', 'sacroiliitis', 'asas', 'sacrum', 'denis', 'young-burgess', 'acetabulum', 'letournel', 'judet', 'inlet', 'outlet', 'fracture', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/PelvisSiPage'), 'PelvisSiPage') },
      { path: '/shoulder', name: 'Shoulder', group: 'Pelvis and limbs', description: 'Rotator cuff, labrum and glenohumeral ligaments, with the lesion sites of instability and impingement marked.', keywords: ['shoulder', 'glenohumeral', 'rotator cuff', 'supraspinatus', 'infraspinatus', 'subscapularis', 'teres minor', 'labrum', 'slap', 'bankart', 'hill-sachs', 'biceps', 'acromioclavicular', 'ac joint', 'impingement', 'dislocation', 'adhesive capsulitis', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/ShoulderPage'), 'ShoulderPage') },
      { path: '/elbow', name: 'Elbow', group: 'Pelvis and limbs', description: 'Collateral ligaments, flexor and extensor origins, nerves and fat pads, with ten playable injury mechanisms.', keywords: ['elbow', 'ucl', 'lucl', 'lateral ulnar collateral', 'radial head', 'capitellum', 'coronoid', 'olecranon', 'fat pad', 'supracondylar', 'terrible triad', 'epicondylitis', 'tennis elbow', 'distal biceps', 'cubital tunnel', 'ulnar nerve', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/ElbowPage'), 'ElbowPage') },
      { path: '/wrist', name: 'Wrist', group: 'Pelvis and limbs', description: 'The eight carpal bones with the TFCC, intrinsic ligaments, extensor compartments and carpal tunnel.', keywords: ['wrist', 'carpus', 'carpal', 'scaphoid', 'lunate', 'triquetrum', 'hamate', 'capitate', 'tfcc', 'scapholunate', 'lunotriquetral', 'perilunate', 'mayfield', 'foosh', 'distal radius', 'carpal tunnel', 'guyon', 'median nerve', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/WristPage'), 'WristPage') },
      { path: '/knee', name: 'Knee', group: 'Pelvis and limbs', description: 'Cruciates, collaterals, menisci and the posterolateral corner, with the mechanisms that injure each group.', keywords: ['knee', 'acl', 'pcl', 'mcl', 'lcl', 'cruciate', 'collateral', 'meniscus', 'meniscal', 'patella', 'mpfl', 'patellar tendon', 'popliteus', 'posterolateral corner', 'iliotibial', 'pivot shift', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/KneePage'), 'KneePage') },
      { path: '/ankle', name: 'Ankle', group: 'Pelvis and limbs', description: 'Mortise, hindfoot and the lateral, deltoid and syndesmotic ligaments, with the tendons that pass the malleoli.', keywords: ['ankle', 'hindfoot', 'talus', 'calcaneus', 'malleolus', 'mortise', 'atfl', 'cfl', 'ptfl', 'deltoid ligament', 'spring ligament', 'syndesmosis', 'high ankle sprain', 'achilles', 'peroneal', 'tibialis posterior', 'plantar fascia', 'sinus tarsi', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/AnklePage'), 'AnklePage') },
      { path: '/foot', name: 'Foot', group: 'Pelvis and limbs', description: 'Lisfranc complex, plantar fascia, plantar plates and interdigital nerves, with graded pathologies.', keywords: ['foot', 'forefoot', 'midfoot', 'hindfoot', 'lisfranc', 'tarsometatarsal', 'metatarsal', 'stress fracture', 'plantar fascia', 'plantar fasciitis', 'plantar plate', 'morton neuroma', 'charcot', 'neuroarthropathy', 'meary line', 'musculoskeletal', 'msk', 'anatomy', '3d'], component: lazyPage(() => import('../pages/FootPage'), 'FootPage') },
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

const byPath = new Map(calculators.map((item) => [item.path, item]))

/** Items linked to `path` from either side, in registry order. */
export function relatedTo(path: string): IndexedCalculator[] {
  const own = byPath.get(path)?.related ?? []
  return calculators.filter(
    (item) => item.path !== path && (own.includes(item.path) || (item.related ?? []).includes(path)),
  )
}

/** What one item in a category is called, e.g. 'lesson'. Defaults to 'calculator'. */
export function itemLabelFor(categoryName: string) {
  return categories.find((category) => category.name === categoryName)?.itemLabel ?? 'calculator'
}

/** Consecutive runs of items sharing a `group`; ungrouped items form an unnamed run. */
export function groupItems<T extends { group?: string }>(items: T[]): { name?: string; items: T[] }[] {
  const runs: { name?: string; items: T[] }[] = []
  for (const item of items) {
    const last = runs[runs.length - 1]
    if (last && last.name === item.group) last.items.push(item)
    else runs.push({ name: item.group, items: [item] })
  }
  return runs
}

/** Every entered word must appear somewhere in the item, so extra words narrow the list. */
export function matchesQuery(item: IndexedCalculator, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return true
  const haystack = [item.name, item.description, item.category, ...(item.keywords ?? [])].join(' ').toLowerCase()
  return words.every((word) => haystack.includes(word))
}
