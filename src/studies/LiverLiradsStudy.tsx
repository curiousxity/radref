import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { LIRADS_MANAGEMENT, liradsTableCategory } from '../logic/lirads'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'American College of Radiology. CT/MRI LI-RADS v2018 Core. ACR, 2018. (The rulebook: algorithm, diagnostic table, definitions, management and reporting tables, FAQs. Free on the ACR LI-RADS page.)' },
  { citation: 'American College of Radiology. LI-RADS CT/MRI Nonradiation Treatment Response Algorithm (TRA) v2024 Core. ACR, 2024. (Replaces the v2018 treatment response table; a separate radiation TRA covers TARE and SBRT.)' },
  { citation: 'Chernyak V et al. Liver Imaging Reporting and Data System (LI-RADS) version 2018: imaging of hepatocellular carcinoma in at-risk patients. Radiology 2018;289:816–830.', doi: '10.1148/radiol.2018181494' },
  { citation: 'Kielar AZ et al. LI-RADS 2017: an update. J Magn Reson Imaging 2018;47:1459–1474.', doi: '10.1002/jmri.26027' },
  { citation: 'Aslam A et al. CT/MRI LI-RADS 2024 update: treatment response assessment. Radiology 2024;313:e232408.', doi: '10.1148/radiol.232408' },
  { citation: 'Kielar A et al. Locoregional therapies for hepatocellular carcinoma and the new LI-RADS treatment response algorithm. Abdom Radiol 2018;43:218–230.', doi: '10.1007/s00261-017-1281-6' },
  { citation: 'Caraiani C et al. CT/MRI LI-RADS v2018 vs. CEUS LI-RADS v2017: can things be put together? Biology (Basel) 2021;10:412.', doi: '10.3390/biology10050412' },
  { citation: 'Cerny M et al. LI-RADS version 2018 ancillary features at MRI. RadioGraphics 2018;38:1973–2001.', doi: '10.1148/rg.2018180052' },
  { citation: 'Fowler KJ et al. LI-RADS M (LR-M): definite or probable malignancy, not specific for hepatocellular carcinoma. Abdom Radiol 2018;43:149–157.', doi: '10.1007/s00261-017-1196-2' },
  { citation: 'van der Pol CB et al. Accuracy of the Liver Imaging Reporting and Data System in computed tomography and magnetic resonance image analysis of hepatocellular carcinoma or overall malignancy: a systematic review. Gastroenterology 2019;156:976–986.', doi: '10.1053/j.gastro.2018.11.020' },
  { citation: 'Tang A et al. Evidence supporting LI-RADS major features for CT- and MR imaging-based diagnosis of hepatocellular carcinoma: a systematic review. Radiology 2018;286:29–48.', doi: '10.1148/radiol.2017170554' },
  { citation: 'Santillan C et al. LI-RADS categories: concepts, definitions, and criteria. Abdom Radiol 2018;43:101–110.', doi: '10.1007/s00261-017-1334-x' },
  { citation: 'Cunha GM et al. How to use LI-RADS to report liver CT and MRI observations. RadioGraphics 2021;41:1352–1367.', doi: '10.1148/rg.2021200205' },
]

const reportTemplate = `Technique: multiphase [CT / MRI, extracellular agent or gadobenate / MRI, gadoxetate];
  arterial phase [late / early]; limitations [none / describe].
LI-RADS: applies ([cirrhosis / chronic hepatitis B / current or prior HCC]).
Observation [#]: segment __; __ mm (series __, image __).
  Tumor in vein: [absent / present: vein __].
  Major features: [nonrim APHE], [nonperipheral "washout"], [enhancing "capsule"],
  [threshold growth: __ mm to __ mm in __ months] / none.
  LR-M features: [targetoid: __ / nontargetoid: __] / none.
  Ancillary features: favoring malignancy __; favoring benignity __.
  Change since prior: __ (prior category LR-__).
Treated lesion [#]: segment __ (series __, image __); pretreatment LR-__, __ mm;
  treated with __; masslike enhancement [none / uncertain / present], __ mm.
Impression: Observation [#], segment __, __ mm: LR-__ (meaning of category).
  [Management from the LI-RADS/AASLD table.]
  [LR-M or LR-TIV: most likely etiology.] [Treated: LR-TR __ (v2024).]
  No observation: "There are no reportable LI-RADS observations."`

/* Option sets, shared by the fields and the report wording. */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const riskField = {
  options: [
    { value: 'cirrhosis', label: 'Cirrhosis' },
    { value: 'hbv', label: 'Chronic hepatitis B' },
    { value: 'hcc', label: 'Current or prior HCC (including transplant candidates and recipients)' },
    { value: 'unsure', label: 'Not sure the patient has cirrhosis' },
    { value: 'none', label: 'None of these risk factors' },
    { value: 'excluded', label: 'Excluded: under 18, congenital hepatic fibrosis, or vascular cause of cirrhosis' },
  ],
}

const modalityField = {
  options: [
    { value: 'ct', label: 'CT' },
    { value: 'eca', label: 'MRI, extracellular or gadobenate' },
    { value: 'hba', label: 'MRI, gadoxetate' },
  ],
}

const statusField = {
  options: [
    { value: 'untreated', label: 'Untreated' },
    { value: 'treated', label: 'Treated (locoregional)' },
  ],
}

const presentField = {
  options: [
    { value: 'yes', label: 'Yes, one to report' },
    { value: 'none', label: 'No reportable observation' },
  ],
}

const ncField = {
  options: [
    { value: 'ok', label: 'Categorizable' },
    { value: 'nc', label: 'Key phase missing or degraded' },
  ],
}

const tivField = {
  options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Enhancing tissue in vein' },
  ],
}

const benignField = {
  options: [
    { value: 'no', label: 'Neither' },
    { value: 'lr2', label: 'Probably benign' },
    { value: 'lr1', label: 'Definitely benign' },
  ],
}

const targetoidField = {
  options: [
    { value: 'rim', label: 'Rim APHE' },
    { value: 'peripheral', label: 'Peripheral "washout"' },
    { value: 'central', label: 'Delayed central enhancement' },
    { value: 'restriction', label: 'Targetoid restriction (DWI)' },
    { value: 'tphbp', label: 'Targetoid transitional or hepatobiliary phase appearance' },
  ],
}

const nontargetoidField = {
  options: [
    { value: 'infiltrative', label: 'Infiltrative appearance' },
    { value: 'marked-dwi', label: 'Marked diffusion restriction' },
    { value: 'necrosis', label: 'Necrosis or severe ischemia' },
    { value: 'other', label: 'Other feature suggesting non-HCC malignancy (specify in report)' },
  ],
}

const apheField = {
  options: [
    { value: 'no', label: 'No APHE' },
    { value: 'yes', label: 'Nonrim APHE' },
  ],
}

const growthField = {
  options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
    { value: 'noprior', label: 'No prior CT/MRI' },
  ],
}

const afMalignantField = {
  options: [
    { value: 'us', label: 'US visibility as discrete nodule' },
    { value: 'subthreshold', label: 'Subthreshold growth' },
    { value: 'corona', label: 'Corona enhancement' },
    { value: 'fat-sparing', label: 'Fat sparing in solid mass' },
    { value: 'dwi', label: 'Restricted diffusion' },
    { value: 't2', label: 'Mild-moderate T2 hyperintensity' },
    { value: 'iron-sparing', label: 'Iron sparing in solid mass' },
    { value: 'tp', label: 'Transitional phase hypointensity' },
    { value: 'hbp', label: 'Hepatobiliary phase hypointensity' },
    { value: 'nonenhancing-capsule', label: 'Nonenhancing "capsule" (favors HCC)' },
    { value: 'nodule-in-nodule', label: 'Nodule-in-nodule (favors HCC)' },
    { value: 'mosaic', label: 'Mosaic architecture (favors HCC)' },
    { value: 'blood', label: 'Blood products in mass (favors HCC)' },
    { value: 'fat', label: 'Fat in mass, more than adjacent liver (favors HCC)' },
  ],
}

const afBenignField = {
  options: [
    { value: 'stable', label: 'Size stability 2 years or more' },
    { value: 'reduction', label: 'Size reduction' },
    { value: 'blood-pool', label: 'Parallels blood pool' },
    { value: 'vessels', label: 'Undistorted vessels' },
    { value: 'iron', label: 'Iron in mass, more than liver' },
    { value: 'marked-t2', label: 'Marked T2 hyperintensity' },
    { value: 'hbp-iso', label: 'Hepatobiliary phase isointensity' },
  ],
}

const priorCategoryField = {
  options: [
    { value: 'none', label: 'No prior or not seen' },
    { value: 'LR-1', label: 'LR-1' },
    { value: 'LR-2', label: 'LR-2' },
    { value: 'LR-3', label: 'LR-3' },
    { value: 'LR-4', label: 'LR-4' },
    { value: 'LR-5', label: 'LR-5' },
    { value: 'LR-M', label: 'LR-M' },
    { value: 'LR-TIV', label: 'LR-TIV' },
  ],
}

const treatmentField = {
  options: [
    { value: 'thermal', label: 'Thermal ablation (RFA, MWA, cryoablation)' },
    { value: 'pea', label: 'Percutaneous ethanol ablation' },
    { value: 'embolization', label: 'TAE, cTACE or DEB-TACE' },
    { value: 'surgical', label: 'Surgical margin after resection' },
    { value: 'radiation', label: 'TARE or SBRT (radiation-based)' },
  ],
}

const pretreatmentField = {
  options: [
    { value: 'LR-5', label: 'LR-5' },
    { value: 'LR-4', label: 'LR-4' },
    { value: 'LR-M', label: 'LR-M' },
    { value: 'LR-TIV', label: 'LR-TIV' },
    { value: 'LR-3', label: 'LR-3' },
    { value: 'biopsy-hcc', label: 'Biopsy-proven HCC' },
    { value: 'uncertain', label: 'Uncertain or not available' },
  ],
}

const masslikeField = {
  options: [
    { value: 'ne', label: 'Cannot be assessed (degraded or missing phase)' },
    { value: 'none', label: 'No masslike enhancement' },
    { value: 'uncertain', label: 'Uncertain (presence or morphology)' },
    { value: 'present', label: 'Masslike enhancement (any degree, any phase)' },
  ],
}

const trAncillaryField = {
  options: [
    { value: 'dwi', label: 'Diffusion restriction (any degree)' },
    { value: 't2', label: 'Mild-moderate T2 hyperintensity' },
  ],
}

/* Rules the guideline states. */

type Category = 'LR-NC' | 'LR-1' | 'LR-2' | 'LR-3' | 'LR-4' | 'LR-5' | 'LR-M' | 'LR-TIV'
type TrCategory = 'LR-TR Nonevaluable' | 'LR-TR Nonviable' | 'LR-TR Equivocal' | 'LR-TR Viable'

const ORDINAL: Category[] = ['LR-1', 'LR-2', 'LR-3', 'LR-4', 'LR-5']

const MEANING: Record<Category, string> = {
  'LR-NC': 'not categorizable',
  'LR-1': 'definitely benign',
  'LR-2': 'probably benign',
  'LR-3': 'intermediate probability of malignancy',
  'LR-4': 'probably HCC',
  'LR-5': 'definitely HCC',
  'LR-M': 'probably or definitely malignant, not necessarily HCC',
  'LR-TIV': 'tumor in vein',
}

/** Core p14 management, shared with the site's LI-RADS calculator. */
const MANAGEMENT: Record<Category, string> = LIRADS_MANAGEMENT

/** Nonradiation TRA v2024 core, "LI-RADS TRA-based management". */
const TR_MANAGEMENT: Record<TrCategory, string> = {
  'LR-TR Nonevaluable': 'Repeat imaging in 3 months, with the same or a different modality as appropriate.',
  'LR-TR Nonviable': 'Continue monitoring in 3 months, with the same or a different modality as appropriate.',
  'LR-TR Equivocal': 'Continue monitoring in 3 months, with the same or a different modality as appropriate.',
  'LR-TR Viable': 'Multidisciplinary discussion for consensus management, which often includes retreatment.',
}

function isTreated(values: Values) {
  return str(values, 'status') === 'treated'
}

function hasObservation(values: Values) {
  return str(values, 'present') !== 'none'
}

/** Untreated, categorizable observation: the steps after "not categorizable". */
function untreatedActive(values: Values) {
  return hasObservation(values) && !isTreated(values) && str(values, 'nc') !== 'nc'
}

function tivPresent(values: Values) {
  return str(values, 'tiv') === 'present'
}

function benignChoice(values: Values): 'LR-1' | 'LR-2' | undefined {
  const benign = str(values, 'benign')
  if (benign === 'lr1') return 'LR-1'
  if (benign === 'lr2') return 'LR-2'
  return undefined
}

/** Steps 5 to 6 apply unless the observation was called benign (a tumor in vein is never benign). */
function malignancyStepsShown(values: Values) {
  return untreatedActive(values) && (tivPresent(values) || !benignChoice(values))
}

function applies(values: Values) {
  const risk = str(values, 'risk')
  return risk !== 'none' && risk !== 'excluded'
}

/** "Threshold growth: size increase of a mass by ≥ 50% in ≤ 6 months" (core p20). Undefined unless both sizes and the interval are entered. */
function growthByNumbers(values: Values): boolean | undefined {
  const size = num(values, 'size')
  const prior = num(values, 'prior-size')
  const months = num(values, 'prior-months')
  if (size === undefined || prior === undefined || months === undefined || prior <= 0) return undefined
  return (size - prior) / prior >= 0.5 && months <= 6
}

function majorFeatures(values: Values) {
  return {
    aphe: str(values, 'aphe') === 'yes',
    washout: str(values, 'washout') === 'yes',
    capsule: str(values, 'capsule') === 'yes',
    growth: str(values, 'growth') === 'yes',
  }
}

/**
 * The CT/MRI v2018 diagnostic table (core p8), from the shared logic the LI-RADS calculator uses.
 * "If unsure about the presence of any major feature: characterize that feature as absent", so
 * anything not marked yes counts as absent.
 */
function tableCategory(values: Values): Category | undefined {
  const size = num(values, 'size')
  if (size === undefined) return undefined
  const { aphe, washout, capsule, growth } = majorFeatures(values)
  return liradsTableCategory({ sizeMm: size, aphe, washout, capsule, thresholdGrowth: growth })
}

/**
 * The parenchymal observation's category before ancillary features, ignoring tumor in vein:
 * core p8 order (LR-1, LR-2, LR-M, then the table). A targetoid mass is LR-M; a nontargetoid
 * mass with an LR-M feature is LR-M only if it does not meet LR-5 criteria (core p22).
 */
function baseCategory(values: Values): Category | undefined {
  if (str(values, 'nc') === 'nc') return 'LR-NC'
  const benign = benignChoice(values)
  if (benign && !tivPresent(values)) return benign
  if (list(values, 'lrm-target').length > 0) return 'LR-M'
  const table = tableCategory(values)
  if (list(values, 'lrm-other').length > 0 && table !== 'LR-5') return 'LR-M'
  return table
}

type Adjustment = { category: Category; note?: string }

/**
 * Step 2 (core p9): one or more ancillary features favoring malignancy upgrade by one category
 * up to LR-4, never to LR-5; one or more favoring benignity downgrade by one; both present,
 * do not adjust.
 */
function applyAncillary(category: Category, values: Values): Adjustment {
  const index = ORDINAL.indexOf(category)
  if (index < 0) return { category }
  const malignant = list(values, 'af-malignant').length > 0
  const benign = list(values, 'af-benign').length > 0
  if (malignant && benign) return { category, note: 'Conflicting ancillary features: category not adjusted' }
  if (malignant) {
    if (index <= 2) return { category: ORDINAL[index + 1], note: `Upgraded from ${category} by ancillary features` }
    if (category === 'LR-4') return { category, note: 'Ancillary features cannot upgrade to LR-5' }
    return { category }
  }
  if (benign && index > 0) return { category: ORDINAL[index - 1], note: `Downgraded from ${category} by ancillary features` }
  return { category }
}

/** The final diagnostic category, or undefined when LI-RADS does not apply or inputs are missing. */
function finalCategory(values: Values): Category | undefined {
  if (!hasObservation(values) || isTreated(values) || !applies(values)) return undefined
  if (str(values, 'nc') === 'nc') return 'LR-NC'
  if (tivPresent(values)) return 'LR-TIV'
  const base = baseCategory(values)
  return base && applyAncillary(base, values).category
}

/**
 * Core p21 and the ACR LI-RADS FAQ: "LR-TIV contiguous with LR-M parenchymal mass, may be due to
 * non-HCC malignancy"; "LR-TIV contiguous with LR-5 parenchymal mass, definitely due to HCC";
 * otherwise "probably due to HCC".
 */
function tivEtiology(values: Values): string {
  const mass = baseCategory(values)
  if (mass === 'LR-M') return 'may be due to non-HCC malignancy'
  if (mass === 'LR-5') return 'definitely due to HCC'
  return 'probably due to HCC'
}

/** Core p23, LR-M reporting: the most probable etiology among the common causes. */
function lrmEtiology(values: Values): string {
  if (list(values, 'lrm-other').includes('infiltrative')) return 'probably represents HCC'
  if (str(values, 'hepatocellular') === 'yes') return 'may represent HCC with atypical features or cHCC-CCA'
  if (list(values, 'lrm-target').length > 0) return 'most likely represents iCCA, cHCC-CCA, or HCC with atypical features'
  return 'etiology uncertain'
}

/** Nonradiation TRA v2024, steps 1 and 2. Undefined after radiation-based treatment (a different algorithm). */
function trCategory(values: Values): TrCategory | undefined {
  if (str(values, 'tr-type') === 'radiation') return undefined
  const masslike = str(values, 'tr-masslike')
  if (masslike === 'ne') return 'LR-TR Nonevaluable'
  if (masslike === 'none') return 'LR-TR Nonviable'
  if (masslike === 'present') return 'LR-TR Viable'
  // The two ancillary features are MRI only (TRA v2024), so they do not upgrade on CT.
  const upgrade = str(values, 'modality') !== 'ct' && list(values, 'tr-af').length > 0
  if (masslike === 'uncertain') return upgrade ? 'LR-TR Viable' : 'LR-TR Equivocal'
  return undefined
}

/**
 * For the downgrade check (core p18: "If downgrading from prior exam, provide rationale").
 * LR-M and LR-TIV on the prior rank with LR-5; undefined for anything else.
 */
function rank(category: string): number | undefined {
  if (category === 'LR-M' || category === 'LR-TIV') return 4
  const index = ORDINAL.indexOf(category as Category)
  return index < 0 ? undefined : index
}

/* Fields. Declared once so the report can read their labels. */

const fields = {
  risk: { id: 'risk', kind: 'choice', label: 'Risk factor for HCC', ...riskField, required: true, help: 'Cirrhosis, chronic hepatitis B, or current or prior HCC.' },
  extrahepatic: { id: 'extrahepatic', kind: 'choice', label: 'Active extrahepatic primary malignancy?', options: yesNo, help: 'If so, assign LR-5 with caution.' },
  modality: { id: 'modality', kind: 'choice', label: 'Multiphase exam', ...modalityField, required: true },
  status: { id: 'status', kind: 'choice', label: 'Untreated or treated', ...statusField, required: true },
  present: { id: 'present', kind: 'choice', label: 'Reportable observation?', ...presentField, required: true },
  obsId: { id: 'obs-id', kind: 'text', label: 'Identifier', placeholder: 'e.g. 1', help: 'Keep the same number on every exam.', required: true, showIf: hasObservation },
  segment: { id: 'segment', kind: 'text', label: 'Segment', placeholder: 'e.g. 7', required: true, showIf: hasObservation },
  size: { id: 'size', kind: 'number', label: 'Size, outer edge to outer edge', unit: 'mm', min: 0, required: true, showIf: (v) => hasObservation(v) && !isTreated(v), help: 'Include the capsule. Avoid arterial phase and DWI if the margins show on another phase.' },
  image: { id: 'image', kind: 'text', label: 'Series and image of the measurement', placeholder: 'e.g. series 8, image 42', required: true, showIf: hasObservation },
  nc: { id: 'nc', kind: 'choice', label: 'Can it be categorized?', ...ncField, required: true, showIf: (v) => hasObservation(v) && !isTreated(v) },
  ncReason: { id: 'nc-reason', kind: 'text', label: 'Technical limitation', placeholder: 'e.g. arterial phase too early, motion', required: true, showIf: (v) => hasObservation(v) && !isTreated(v) && str(v, 'nc') === 'nc' },
  tiv: { id: 'tiv', kind: 'choice', label: 'Tumor in vein', ...tivField, required: true, showIf: untreatedActive, help: 'Unequivocal enhancing soft tissue in a vein, with or without a mass.' },
  tivVein: { id: 'tiv-vein', kind: 'text', label: 'Vein(s) involved', placeholder: 'e.g. right portal vein', required: true, showIf: (v) => untreatedActive(v) && tivPresent(v) },
  benign: { id: 'benign', kind: 'choice', label: 'Definitely or probably benign?', ...benignField, required: true, showIf: (v) => untreatedActive(v) && !tivPresent(v) },
  benignDx: { id: 'benign-dx', kind: 'text', label: 'Most likely benign entity', placeholder: 'e.g. hemangioma, arterioportal shunt', showIf: (v) => untreatedActive(v) && !tivPresent(v) && benignChoice(v) !== undefined },
  lrmTarget: { id: 'lrm-target', kind: 'multi', label: 'Targetoid features', ...targetoidField, showIf: malignancyStepsShown, help: 'Any one makes a targetoid mass LR-M.' },
  lrmOther: { id: 'lrm-other', kind: 'multi', label: 'Nontargetoid LR-M features', ...nontargetoidField, showIf: malignancyStepsShown, help: 'LR-M only if the mass does not meet LR-5 criteria.' },
  hepatocellular: { id: 'hepatocellular', kind: 'choice', label: 'Any feature of hepatocellular origin?', options: yesNo, showIf: (v) => malignancyStepsShown(v) && (list(v, 'lrm-target').length > 0 || list(v, 'lrm-other').length > 0), help: 'Fat, iron or blood in mass, nodule-in-nodule, mosaic, nonenhancing capsule, T1 hyperintensity, HBP hyperintensity.' },
  aphe: { id: 'aphe', kind: 'choice', label: 'Arterial phase hyperenhancement', ...apheField, required: true, showIf: malignancyStepsShown, help: 'Rim APHE is an LR-M feature, not APHE for the table.' },
  washout: { id: 'washout', kind: 'choice', label: 'Nonperipheral "washout"', options: yesNo, required: true, showIf: malignancyStepsShown },
  capsule: { id: 'capsule', kind: 'choice', label: 'Enhancing "capsule"', options: yesNo, required: true, showIf: malignancyStepsShown },
  growth: { id: 'growth', kind: 'choice', label: 'Threshold growth', ...growthField, required: true, showIf: malignancyStepsShown, help: '50% or more size increase of a mass in 6 months or less, against prior CT or MRI.' },
  priorSize: { id: 'prior-size', kind: 'number', label: 'Prior size (same phase, sequence and plane)', unit: 'mm', min: 0, showIf: (v) => malignancyStepsShown(v) && str(v, 'growth') !== 'noprior' },
  priorMonths: { id: 'prior-months', kind: 'number', label: 'Interval since prior', unit: 'months', min: 0, showIf: (v) => malignancyStepsShown(v) && str(v, 'growth') !== 'noprior' },
  afMalignant: { id: 'af-malignant', kind: 'multi', label: 'Ancillary features favoring malignancy', ...afMalignantField, showIf: (v) => untreatedActive(v) && !tivPresent(v) },
  afBenign: { id: 'af-benign', kind: 'multi', label: 'Ancillary features favoring benignity', ...afBenignField, showIf: (v) => untreatedActive(v) && !tivPresent(v) },
  priorCategory: { id: 'prior-category', kind: 'choice', label: 'Category on the prior exam', ...priorCategoryField, showIf: (v) => hasObservation(v) && !isTreated(v) },
  change: { id: 'change', kind: 'text', label: 'Change since prior', placeholder: 'e.g. new; 12 mm to 19 mm', showIf: hasObservation },
  trType: { id: 'tr-type', kind: 'choice', label: 'Most recent treatment', ...treatmentField, required: true, showIf: (v) => hasObservation(v) && isTreated(v) },
  trPreCategory: { id: 'tr-pre-category', kind: 'choice', label: 'Pretreatment category', ...pretreatmentField, required: true, showIf: (v) => hasObservation(v) && isTreated(v) },
  trPreSize: { id: 'tr-pre-size', kind: 'number', label: 'Pretreatment size', unit: 'mm', min: 0, required: true, showIf: (v) => hasObservation(v) && isTreated(v) },
  trMasslike: { id: 'tr-masslike', kind: 'choice', label: 'Masslike enhancement in the lesion or along its margin', ...masslikeField, required: true, showIf: (v) => hasObservation(v) && isTreated(v) && str(v, 'tr-type') !== 'radiation' },
  trAf: { id: 'tr-af', kind: 'multi', label: 'In the area of uncertain enhancement (MRI only)', ...trAncillaryField, showIf: (v) => hasObservation(v) && isTreated(v) && str(v, 'tr-masslike') === 'uncertain', help: 'Optional: either one upgrades Equivocal to Viable.' },
  trSize: { id: 'tr-size', kind: 'number', label: 'Largest masslike enhancing component', unit: 'mm', min: 0, required: true, showIf: (v) => hasObservation(v) && isTreated(v) && ['uncertain', 'present'].includes(str(v, 'tr-masslike')), help: 'Single longest dimension, not crossing nonenhancing areas.' },
  other: { id: 'other', kind: 'text', label: 'Other findings', placeholder: 'e.g. other observations in aggregate, nodes, ascites', multiline: true },
} satisfies Record<string, Field>

/* The report. */

/** Lower-cases the first letter for mid-sentence use, leaving acronyms such as "US" alone. */
function lowerFirst(text: string): string {
  return text.length > 1 && text[1] === text[1].toLowerCase() ? text[0].toLowerCase() + text.slice(1) : text
}

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

const MODALITY_TEXT: Record<string, string> = {
  ct: 'CT',
  eca: 'MRI with an extracellular agent or gadobenate',
  hba: 'MRI with gadoxetate',
}

const RISK_TEXT: Record<string, string> = {
  cirrhosis: 'cirrhosis',
  hbv: 'chronic hepatitis B',
  hcc: 'current or prior HCC',
}

const TREATMENT_TEXT: Record<string, string> = {
  thermal: 'thermal ablation',
  pea: 'percutaneous ethanol ablation',
  embolization: 'transarterial embolization or chemoembolization',
  surgical: 'resection (surgical margin)',
  radiation: 'radiation-based therapy (TARE or SBRT)',
}

const MASSLIKE_TEXT: Record<string, string> = {
  ne: 'cannot be assessed',
  none: 'none',
  uncertain: 'uncertain',
  present: 'present',
}

function techniqueLine(values: Values): string {
  const modality = str(values, 'modality')
  const reason = str(values, 'nc-reason')
  const body = join([
    modality && `multiphase ${MODALITY_TEXT[modality]}`,
    str(values, 'nc') === 'nc' && reason && `limited by ${reason}`,
  ])
  return body && `Technique: ${body}`
}

function riskLine(values: Values): string {
  const risk = str(values, 'risk')
  if (!risk) return ''
  if (risk === 'none' || risk === 'excluded') return 'LI-RADS: does not apply in this patient; LI-RADS categories are not assigned.'
  if (risk === 'unsure') return 'LI-RADS: cirrhosis not established; categories below are conditional.'
  return `LI-RADS v2018: applies (${RISK_TEXT[risk]}).`
}

function observationHead(values: Values): string {
  const id = str(values, 'obs-id') || '[#]'
  const segment = str(values, 'segment')
  const image = str(values, 'image')
  const size = num(values, 'size')
  const place = join([segment && `segment ${segment}`, !isTreated(values) && size !== undefined && `${size} mm`], ', ')
  const where = join([place, image && `(${image})`], ' ')
  return `${isTreated(values) ? 'Treated lesion' : 'Observation'} ${id}${where ? `: ${where}` : ''}`
}

function majorLine(values: Values): string {
  if (!malignancyStepsShown(values)) return ''
  const answered = ['aphe', 'washout', 'capsule', 'growth'].some((id) => str(values, id))
  if (!answered) return ''
  const { aphe, washout, capsule, growth } = majorFeatures(values)
  const names = [aphe && 'nonrim APHE', washout && 'nonperipheral "washout"', capsule && 'enhancing "capsule"', growth && 'threshold growth'].filter((f): f is string => Boolean(f))
  const prior = num(values, 'prior-size')
  const months = num(values, 'prior-months')
  const size = num(values, 'size')
  const growthDetail = growth && prior !== undefined && months !== undefined && size !== undefined ? ` (${prior} mm to ${size} mm in ${months} months)` : ''
  return `  Major features: ${names.length > 0 ? names.join(', ') + growthDetail : 'none'}`
}

function lrmLine(values: Values): string {
  if (!malignancyStepsShown(values)) return ''
  const target = list(values, 'lrm-target').map((f) => lowerFirst(optionLabel(targetoidField, f).replace(' (DWI)', '')))
  const other = list(values, 'lrm-other').map((f) => lowerFirst(optionLabel(nontargetoidField, f).replace(' (specify in report)', '')))
  if (target.length === 0 && other.length === 0) return ''
  return `  LR-M features: ${join([target.length > 0 && `targetoid (${target.join(', ')})`, other.length > 0 && `nontargetoid (${other.join(', ')})`])}`
}

function ancillaryLine(values: Values): string {
  const malignant = list(values, 'af-malignant').map((f) => lowerFirst(optionLabel(afMalignantField, f).replace(' (favors HCC)', '')))
  const benign = list(values, 'af-benign').map((f) => lowerFirst(optionLabel(afBenignField, f)))
  if (malignant.length === 0 && benign.length === 0) return ''
  return `  Ancillary features: ${join([malignant.length > 0 && `favoring malignancy: ${malignant.join(', ')}`, benign.length > 0 && `favoring benignity: ${benign.join(', ')}`])}`
}

function untreatedFindings(values: Values): string {
  const tiv = str(values, 'tiv')
  const benignDx = str(values, 'benign-dx')
  const change = str(values, 'change')
  const prior = str(values, 'prior-category')
  return lines(
    observationHead(values),
    str(values, 'nc') === 'nc' && '  Not categorizable: key phase missing or degraded.',
    tiv === 'absent' && '  Tumor in vein: absent.',
    tiv === 'present' && `  Tumor in vein: present${str(values, 'tiv-vein') ? `, ${str(values, 'tiv-vein')}` : ''}.`,
    !tivPresent(values) && benignChoice(values) && `  ${benignChoice(values) === 'LR-1' ? 'Definitely' : 'Probably'} benign${benignDx ? `: ${benignDx}` : ''}.`,
    majorLine(values),
    lrmLine(values),
    ancillaryLine(values),
    (change || (prior && prior !== 'none')) && `  Change since prior: ${join([change, prior && prior !== 'none' && `prior category ${prior}`])}`,
  )
}

function treatedFindings(values: Values): string {
  const type = str(values, 'tr-type')
  const pre = str(values, 'tr-pre-category')
  const preSize = num(values, 'tr-pre-size')
  const masslike = str(values, 'tr-masslike')
  const size = num(values, 'tr-size')
  const af = list(values, 'tr-af').map((f) => lowerFirst(optionLabel(trAncillaryField, f)))
  const change = str(values, 'change')
  return lines(
    observationHead(values),
    (pre || preSize !== undefined) && `  Pretreatment: ${join([pre && optionLabel(pretreatmentField, pre), preSize !== undefined && `${preSize} mm`], ', ')}`,
    type && `  Treated with: ${TREATMENT_TEXT[type]}`,
    masslike && `  Masslike enhancement: ${MASSLIKE_TEXT[masslike]}${size !== undefined ? `, ${size} mm` : ''}`,
    af.length > 0 && `  Ancillary features favoring viability: ${af.join(', ')}`,
    change && `  Change since prior: ${change}`,
  )
}

function impressionBody(values: Values): string {
  if (!hasObservation(values)) return 'There are no reportable LI-RADS observations. Return to surveillance in 6 months.'
  const id = str(values, 'obs-id') || '[#]'
  const segment = str(values, 'segment')
  if (isTreated(values)) {
    if (str(values, 'tr-type') === 'radiation') return `Treated lesion ${id}: after radiation-based treatment, apply the LI-RADS radiation TRA (not built into this form).`
    const tr = trCategory(values)
    if (!tr) return ''
    const pre = str(values, 'tr-pre-category')
    const preSize = num(values, 'tr-pre-size')
    const size = num(values, 'tr-size')
    const previously = join([pre && optionLabel(pretreatmentField, pre), preSize !== undefined && `${preSize} mm`], ', ')
    return `Treated lesion ${id}${segment ? `, segment ${segment}` : ''}: ${tr}${size !== undefined && tr !== 'LR-TR Nonviable' && tr !== 'LR-TR Nonevaluable' ? ` ${size} mm` : ''} (v2024)${previously ? ` (previously ${previously})` : ''}. ${TR_MANAGEMENT[tr]}`
  }
  if (!applies(values)) return ''
  const category = finalCategory(values)
  if (!category) return ''
  const size = num(values, 'size')
  const head = `Observation ${id}${segment ? `, segment ${segment}` : ''}${size !== undefined ? `, ${size} mm` : ''}`
  let label: string = `${category}, ${MEANING[category]}`
  if (category === 'LR-TIV') {
    const mass = baseCategory(values)
    label = `LR-TIV, ${tivEtiology(values)}${mass && mass !== 'LR-NC' ? `, contiguous with ${mass} parenchymal mass` : ''}`
  }
  if (category === 'LR-M') label = `LR-M, ${MEANING['LR-M']}; ${lrmEtiology(values)}`
  const conditional = str(values, 'risk') === 'unsure'
  const statement = conditional ? `If the patient has cirrhosis or chronic hepatitis B, this meets criteria for ${label}.` : `${label}.`
  return `${head}: ${statement} ${MANAGEMENT[category]}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const risk = str(values, 'risk')
  if (risk === 'none' || risk === 'excluded') {
    out.push('LI-RADS does not apply in this patient: give your best diagnosis or differential instead of a category.')
  }
  const category = finalCategory(values)
  if (category === 'LR-5' && str(values, 'extrahepatic') === 'yes') {
    out.push('Active extrahepatic malignancy: assign LR-5 with caution. If in doubt, categorize as LR-M rather than LR-5.')
  }
  const byNumbers = growthByNumbers(values)
  const growth = str(values, 'growth')
  if (malignancyStepsShown(values) && byNumbers === true && growth === 'no') {
    out.push('The sizes entered meet threshold growth (50% or more in 6 months or less), but threshold growth is marked no. Apply it only if the observation is unequivocally a mass.')
  }
  if (malignancyStepsShown(values) && byNumbers === false && growth === 'yes') {
    out.push('Threshold growth is marked yes, but the sizes and interval entered do not reach 50% in 6 months or less (that is subthreshold growth, an ancillary feature).')
  }
  if (benignChoice(values) === 'LR-2' && !tivPresent(values) && (num(values, 'size') ?? 0) >= 20) {
    out.push('A distinctive nodule without malignant features is LR-2 only under 20 mm; at 20 mm or more it is LR-3 or higher. (A probable cyst, hemangioma or perfusion alteration can still be LR-2.)')
  }
  const prior = str(values, 'prior-category')
  const priorRank = rank(prior)
  const currentRank = category && ORDINAL.includes(category) ? ORDINAL.indexOf(category) : undefined
  if (priorRank !== undefined && currentRank !== undefined && priorRank > currentRank) {
    out.push(`Downgrading from ${prior} on the prior exam: give the rationale in the report.`)
  }
  if (isTreated(values) && str(values, 'modality') === 'ct' && list(values, 'tr-af').length > 0) {
    out.push('Ancillary features favoring viability apply only to MRI; there are none for CT, so they were not used to upgrade the category.')
  }
  if (isTreated(values) && str(values, 'tr-type') === 'radiation') {
    out.push('After TARE or SBRT, use the LI-RADS radiation TRA: masslike enhancement that is stable or decreasing is "nonprogressing", not viable.')
  }
  return out
}

function build(values: Values) {
  const findings = hasObservation(values) && str(values, 'present') ? (isTreated(values) ? treatedFindings(values) : untreatedFindings(values)) : ''
  const impression = str(values, 'present') ? impressionBody(values) : ''
  const other = str(values, 'other')
  const text = lines(
    techniqueLine(values),
    riskLine(values),
    findings,
    other && `Other findings: ${other}`,
    impression && `Impression: ${impression}`,
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* Step-level rule chips. */

function tone(category: Category): Derived['tone'] {
  if (category === 'LR-1' || category === 'LR-2') return 'good'
  if (category === 'LR-3' || category === 'LR-NC') return 'neutral'
  return 'warn'
}

function deriveApplies(values: Values): Derived[] {
  const out: Derived[] = []
  const risk = str(values, 'risk')
  if (risk === 'none' || risk === 'excluded') out.push({ label: 'LI-RADS', value: 'Does not apply', tone: 'warn' })
  else if (risk === 'unsure') out.push({ label: 'LI-RADS', value: 'Conditional category' })
  else if (risk) out.push({ label: 'LI-RADS', value: 'Applies', tone: 'good' })
  if (str(values, 'modality') === 'hba') out.push({ label: 'Gadoxetate', value: '"Washout" in portal venous phase only' })
  if (isTreated(values)) out.push({ label: 'Algorithm', value: 'Treatment response (TRA v2024)' })
  return out
}

function deriveObservation(values: Values): Derived[] {
  if (!hasObservation(values)) return [{ label: 'Impression', value: 'No reportable LI-RADS observations', tone: 'good' }]
  if (!isTreated(values) && str(values, 'nc') === 'nc') return [{ label: 'Category', value: 'LR-NC', tone: 'neutral' }]
  const size = num(values, 'size')
  if (size === undefined || isTreated(values)) return []
  const band = size < 10 ? 'under 10 mm' : size < 20 ? '10–19 mm' : '20 mm or more'
  return [{ label: 'Size band', value: band }]
}

function deriveTiv(values: Values): Derived[] {
  if (!untreatedActive(values) || !tivPresent(values)) return []
  return [
    { label: 'Category', value: 'LR-TIV', tone: 'warn' },
    { label: 'Etiology', value: tivEtiology(values) },
  ]
}

function deriveBenign(values: Values): Derived[] {
  const benign = benignChoice(values)
  if (!untreatedActive(values) || tivPresent(values) || !benign) return []
  return [{ label: 'Before ancillary features', value: benign, tone: 'good' }]
}

function deriveLrm(values: Values): Derived[] {
  if (!malignancyStepsShown(values)) return []
  const target = list(values, 'lrm-target').length > 0
  const other = list(values, 'lrm-other').length > 0
  if (!target && !other) return []
  const table = tableCategory(values)
  if (!target && table === 'LR-5') return [{ label: 'LR-M', value: 'No: meets LR-5 criteria', tone: 'warn' }]
  if (!target && table === undefined) return [{ label: 'LR-M', value: 'Yes, unless it meets LR-5 (enter size)', tone: 'warn' }]
  return [
    { label: 'Category', value: 'LR-M', tone: 'warn' },
    { label: 'Most likely', value: lrmEtiology(values) },
  ]
}

function deriveMajor(values: Values): Derived[] {
  if (!malignancyStepsShown(values)) return []
  const out: Derived[] = []
  const table = tableCategory(values)
  if (table) out.push({ label: 'Diagnostic table', value: table, tone: tone(table) })
  const byNumbers = growthByNumbers(values)
  if (byNumbers !== undefined) out.push({ label: 'Growth by numbers', value: byNumbers ? 'Threshold growth' : 'Below threshold', tone: byNumbers ? 'warn' : 'neutral' })
  const size = num(values, 'size')
  const { aphe, washout, capsule, growth } = majorFeatures(values)
  if (table === 'LR-5' && size !== undefined && size >= 10 && size < 20 && aphe && washout && !capsule && !growth) {
    out.push({ label: 'OPTN (USA)', value: 'LR-5 but not OPTN Class 5' })
  }
  return out
}

function deriveAncillary(values: Values): Derived[] {
  if (!untreatedActive(values) || tivPresent(values)) return []
  const base = baseCategory(values)
  if (!base) return []
  const adjusted = applyAncillary(base, values)
  const out: Derived[] = []
  if (adjusted.note) out.push({ label: 'Ancillary features', value: adjusted.note, tone: 'neutral' })
  return out
}

function deriveFinal(values: Values): Derived[] {
  if (!hasObservation(values)) return [{ label: 'Management', value: 'Return to surveillance in 6 months', tone: 'good' }]
  if (isTreated(values)) {
    const tr = trCategory(values)
    if (!tr) return str(values, 'tr-type') === 'radiation' ? [{ label: 'Algorithm', value: 'Use the radiation TRA', tone: 'warn' }] : []
    return [{ label: 'Category', value: tr, tone: tr === 'LR-TR Viable' ? 'warn' : tr === 'LR-TR Nonviable' ? 'good' : 'neutral' }]
  }
  if (!applies(values)) return [{ label: 'Category', value: 'Not assigned: LI-RADS does not apply', tone: 'warn' }]
  const category = finalCategory(values)
  if (!category) return []
  return [
    { label: 'Final category', value: category, tone: tone(category) },
    { label: 'Management', value: MANAGEMENT[category] },
  ]
}

/* The lesson, section by section. */

const learn = [
  {
    id: 'big-idea',
    title: 'The big idea',
    body: (
      <>
        <p>In a patient with cirrhosis, hepatocellular carcinoma (HCC) is one of the few cancers you can diagnose on imaging alone, with no biopsy, when the appearance is characteristic (<Cite doi="10.1002/jmri.26027">Kielar et al., J Magn Reson Imaging 2018</Cite>). That puts the diagnosis in your hands. So each observation in your report answers one question: <strong>how likely is this to be HCC, another cancer, or nothing?</strong></p>
        <p>LI-RADS answers it with a category, from LR-1 (definitely benign) to LR-5 (definitely HCC), plus LR-M (malignant but not necessarily HCC), LR-TIV (tumor in vein) and LR-NC (not categorizable). LI-RADS is four algorithms: surveillance US, diagnosis with CT, MRI or CEUS, and treatment response with CT or MRI (<Cite doi="10.1148/radiol.2018181494">Chernyak et al., Radiology 2018</Cite>). This lesson is the CT/MRI diagnostic algorithm, version 2018, plus the treated lesion.</p>
        <p>The categories mean what they say. Pooled across 17 studies, 94% of LR-5 observations were HCC, 74% of LR-4, 38% of LR-3 and 13% of LR-2; no LR-1 was malignant. LR-M was 93% malignant but only 36% HCC, and LR-TIV was 92% malignant (<Cite doi="10.1053/j.gastro.2018.11.020">van der Pol et al., Gastroenterology 2019</Cite>).</p>
        <div className="lesson-key">
          <p>Before you start, check who LI-RADS is for. Apply it to patients with <strong>cirrhosis, chronic hepatitis B, or current or prior HCC</strong> (including adult transplant candidates and recipients). Do not apply it under 18, without those risk factors, or in cirrhosis from congenital hepatic fibrosis or a vascular disorder (hereditary hemorrhagic telangiectasia, Budd-Chiari, chronic portal vein occlusion, cardiac congestion, diffuse nodular regenerative hyperplasia). Those conditions grow benign nodules that look like HCC (ACR CT/MRI LI-RADS v2018 core).</p>
        </div>
        <p>Not sure the patient has cirrhosis? You can give a conditional category: "25 mm mass with APHE and washout appearance. If the patient has cirrhosis or chronic hepatitis B, this meets criteria for LR-5" (v2018 core FAQ).</p>
      </>
    ),
  },
  {
    id: 'images',
    title: 'Technique: which images to trust',
    body: (
      <>
        <p>LI-RADS needs a <strong>multiphase</strong> exam. Single-phase CT or MRI cannot show all the major features, so give your best diagnosis instead and suggest multiphase imaging if a category would help (v2018 core FAQ).</p>
        <ul className="plain-list">
          <li><strong>CT</strong>: arterial phase (late arterial strongly preferred) and portal venous phase are required; delayed phase is suggested, and a precontrast series after treatment.</li>
          <li><strong>MRI with an extracellular agent or gadobenate</strong>: T1 in- and opposed-phase, T2, and precontrast, arterial (late arterial strongly preferred), portal venous and delayed phases. DWI and subtraction are optional.</li>
          <li><strong>MRI with gadoxetate</strong>: the same, but with a transitional phase (2 to 5 minutes) and a hepatobiliary phase (about 20 minutes) after the portal venous phase.</li>
        </ul>
        <p>Late arterial phase is preferred because HCC usually enhances more then than in the early arterial phase, and some HCCs only hyperenhance in the late arterial phase (v2018 core). Cirrhosis can delay contrast arrival and mistime the arterial phase (<Cite doi="10.1002/jmri.26027">Kielar et al., 2018</Cite>).</p>
        <div className="lesson-key">
          <p><strong>The gadoxetate rule.</strong> With gadoxetate, "washout" counts only in the portal venous phase. Hypointensity in the transitional phase can come from the liver taking up the agent rather than the lesion washing out, so it is only an ancillary feature favoring malignancy. Accepting it as washout would call some cholangiocarcinomas and hemangiomas LR-5 (<Cite doi="10.1002/jmri.26027">Kielar et al., 2018</Cite>).</p>
        </div>
        <p>Small observations are the hard ones. In one study quoted in that review, MRI found 100% of HCCs over 20 mm, 84% of those 10 to 20 mm and only 32% under 10 mm. Large-volume ascites degrades MRI; CT may be the better choice then (<Cite doi="10.1002/jmri.26027">Kielar et al., 2018</Cite>).</p>
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Step-by-step search pattern',
    body: (
      <>
        <p>The v2018 core runs every untreated observation through the same order: not categorizable, then tumor in vein, then benign, then LR-M, and only then the diagnostic table. Follow that order and you will not call a cholangiocarcinoma LR-5.</p>

        <div className="lesson-step">
          <h4>Step 1. Does LI-RADS apply? (patient and exam)</h4>
          <p>Check the risk factor and that the exam is multiphase CT or MRI. Do not assign a category to a path-proven malignancy or a path-proven benign non-hepatocellular lesion such as a hemangioma; report the pathology instead. A treated observation goes to the treatment response algorithm (last step).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Find the observation and measure it</h4>
          <p>An "observation" is any area distinctive from background liver. It may be a real lesion or a pseudolesion, which is why LI-RADS avoids the word "lesion" until you are sure.</p>
          <ul className="plain-list">
            <li>Measure the largest outer-edge-to-outer-edge dimension, <strong>including the capsule</strong>.</li>
            <li>Use the phase, sequence and plane where the margins are clearest. Avoid the arterial phase and DWI if the margins show elsewhere: the arterial phase overestimates size and DWI distorts it.</li>
            <li>Give the observation a number you keep on every exam, and the series and image of the measurement.</li>
            <li>If a key phase is missing or degraded so badly that the answer could be anything from LR-1 to LR-5, it is <strong>LR-NC</strong>. Do not use LR-NC if you can narrow it to LR-1 vs LR-2, or LR-4 vs LR-5 vs LR-M, or if only ancillary features are unreadable.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Tumor in vein</h4>
          <p><strong>Unequivocal enhancing soft tissue in a vein</strong>, whether or not you can see a parenchymal mass, is LR-TIV. An occluded vein with ill-defined walls or restricted diffusion, or one next to a malignant mass, or heterogeneous vein enhancement suggests it but does not prove it; look harder for enhancing tissue. If unsure, do not call LR-TIV.</p>
          <p>Say what probably caused it: "may be due to non-HCC malignancy" if it touches an LR-M mass, "definitely due to HCC" if it touches an LR-5 mass, otherwise "probably due to HCC." In North America, tumor in vein is a relative contraindication to resection and an absolute contraindication to transplantation outside investigational protocols (<Cite doi="10.1002/jmri.26027">Kielar et al., 2018</Cite>). It used to be called LR-5V; it was renamed because cholangiocarcinoma and other cancers can grow into veins too.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Definitely or probably benign?</h4>
          <p>LR-1 and LR-2 are judgment calls, not table cells. Typical entities: cyst, hemangioma, perfusion alteration such as an arterioportal shunt, focal fat or fat sparing, hypertrophic pseudomass, confluent fibrosis or focal scar. Definite ones are LR-1, probable ones LR-2. Spontaneous disappearance is LR-1.</p>
          <p>A <strong>distinctive solid nodule under 20 mm</strong> with no major feature, no LR-M feature and no ancillary feature of malignancy (for example T1 hyperintense, T2 hypointense, siderotic or hepatobiliary-phase hyperintense) is LR-2. At 20 mm or more, the same nodule is LR-3 or higher. Nodules that look like FNH or adenoma are usually LR-3, cautiously LR-2, never LR-1: those are diagnoses of exclusion in these patients (v2018 core).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. LR-M features (is it targetoid?)</h4>
          <p>A <strong>targetoid</strong> mass has concentric layers, usually a cellular rim around fibrosis or ischemia. On dynamic phases that means rim APHE, peripheral "washout", or delayed central enhancement; on DWI, targetoid restriction; on transitional or hepatobiliary phase, a targetoid appearance. Any targetoid mass is LR-M.</p>
          <p>A <strong>nontargetoid</strong> mass is LR-M if it has an infiltrative appearance, marked diffusion restriction, necrosis or severe ischemia, or another feature you think suggests a non-HCC cancer, but only if it does not meet LR-5 criteria (v2018 core). LR-M exists to keep LR-5 specific for HCC without losing sensitivity for cancer (<Cite doi="10.1007/s00261-017-1196-2">Fowler et al., Abdom Radiol 2018</Cite>).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Major features and the diagnostic table</h4>
          <ul className="plain-list">
            <li><strong>Nonrim APHE</strong>: arterial phase enhancement, not rim-like, unequivocally greater than liver in whole or in part.</li>
            <li><strong>Nonperipheral "washout"</strong>: a visually assessed drop in enhancement from an earlier to a later phase, ending darker than liver in the portal venous or delayed phase (portal venous only with gadoxetate). It can apply even without APHE.</li>
            <li><strong>Enhancing "capsule"</strong>: a smooth, uniform, sharp rim around most or all of the observation, thicker or more conspicuous than the fibrosis around background nodules, enhancing in the portal venous, delayed or transitional phase.</li>
            <li><strong>Threshold growth</strong>: size increase of a mass by 50% or more in 6 months or less. Only for something unequivocally a mass (not a possible perfusion alteration), only against a prior CT or MRI (not US or CEUS), measured on the same phase, sequence and plane.</li>
          </ul>
          <p>Count the additional features (washout, capsule, threshold growth) and read the table below. <strong>If unsure whether a major feature is there, call it absent.</strong></p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Ancillary features (optional)</h4>
          <p>Ancillary features can improve detection, raise confidence, or adjust the category. One or more favoring malignancy upgrade by one category, up to LR-4; they can never make LR-5. One or more favoring benignity downgrade by one. If both kinds are present, do not adjust (<Cite doi="10.1148/rg.2018180052">Cerny et al., RadioGraphics 2018</Cite>). The absence of a feature never moves the category.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Tiebreak and final check</h4>
          <p>If unsure between two categories, choose the one reflecting <strong>lower certainty</strong>: LR-4 over LR-5, LR-M over LR-5, LR-2 over LR-1. This keeps LR-5 and LR-1 at 100% certainty. Then ask whether the category seems reasonable. The core's example: a rim-enhancing observation that shrinks on its own without treatment is more likely a sclerosing hemangioma than LR-M.</p>
        </div>

        <div className="lesson-step">
          <h4>Treated lesion: treatment response</h4>
          <p>After locoregional treatment, stop using the diagnostic table. Since 2024 LI-RADS has two treatment response algorithms: nonradiation (ablation, ethanol, embolization, and the surgical margin after resection) and radiation (TARE, SBRT). The nonradiation algorithm has one feature of viability, <strong>masslike enhancement</strong> (any degree, any phase) in the lesion or along its margin. Diffusion restriction or mild-moderate T2 hyperintensity in an area of uncertain enhancement (MRI only) can upgrade Equivocal to Viable (<Cite doi="10.1148/radiol.232408">Aslam et al., Radiology 2024</Cite>). See the categories section.</p>
        </div>
      </>
    ),
  },
  {
    id: 'categories',
    title: 'The categories and what to do next',
    body: (
      <>
        <p>The CT/MRI diagnostic table (v2018 core). Read across by APHE and size, down by the number of additional major features: nonperipheral "washout", enhancing "capsule", threshold growth.</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Additional features</th><th>No APHE, &lt; 20 mm</th><th>No APHE, ≥ 20 mm</th><th>Nonrim APHE, &lt; 10 mm</th><th>Nonrim APHE, 10–19 mm</th><th>Nonrim APHE, ≥ 20 mm</th></tr></thead>
            <tbody>
              <tr><td>None</td><td>LR-3</td><td>LR-3</td><td>LR-3</td><td>LR-3</td><td>LR-4</td></tr>
              <tr><td>One</td><td>LR-3</td><td>LR-4</td><td>LR-4</td><td>LR-4 if capsule; LR-5 if washout or threshold growth</td><td>LR-5</td></tr>
              <tr><td>Two or more</td><td>LR-4</td><td>LR-4</td><td>LR-4</td><td>LR-5</td><td>LR-5</td></tr>
            </tbody>
          </table>
        </div>
        <p>What changed in 2018: a 10–19 mm observation with nonrim APHE and nonperipheral washout alone is now LR-5, matching AASLD; the old LR-5us and LR-5g labels are gone; threshold growth is only 50% in 6 months or less. A new observation of 10 mm or more, or 100% growth over more than 6 months, is now subthreshold growth, an ancillary feature (<Cite doi="10.3390/biology10050412">Caraiani et al., Biology 2021</Cite>). In the USA, that 10–19 mm APHE-plus-washout LR-5 does not count as OPTN Class 5 for transplant exception points.</p>
        <p>Management, as suggested by AASLD and LI-RADS in consensus (v2018 core):</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Category</th><th>Meaning</th><th>Next step</th></tr></thead>
            <tbody>
              <tr><td>No observation</td><td>Negative</td><td>Return to surveillance in 6 months</td></tr>
              <tr><td>LR-NC</td><td>Not categorizable</td><td>Repeat or alternative diagnostic imaging in 3 months or less</td></tr>
              <tr><td>LR-1</td><td>Definitely benign</td><td>Return to surveillance in 6 months</td></tr>
              <tr><td>LR-2</td><td>Probably benign</td><td>Return to surveillance in 6 months; consider repeat diagnostic imaging in 6 months or less</td></tr>
              <tr><td>LR-3</td><td>Intermediate probability of malignancy</td><td>Repeat or alternative diagnostic imaging in 3 to 6 months</td></tr>
              <tr><td>LR-4</td><td>Probably HCC</td><td>Multidisciplinary discussion for tailored workup; may include biopsy</td></tr>
              <tr><td>LR-5</td><td>Definitely HCC</td><td>HCC confirmed; multidisciplinary discussion for consensus management</td></tr>
              <tr><td>LR-M</td><td>Probably or definitely malignant, not necessarily HCC</td><td>Multidisciplinary discussion for tailored workup; often includes biopsy</td></tr>
              <tr><td>LR-TIV</td><td>Tumor in vein</td><td>Multidisciplinary discussion for tailored workup; may include biopsy</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>Treated lesions</strong> (nonradiation TRA v2024 core):</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Category</th><th>Criterion</th><th>Next step</th></tr></thead>
            <tbody>
              <tr><td>LR-TR Nonevaluable</td><td>Masslike enhancement cannot be assessed (degraded or missing phases, gross arterial mistiming)</td><td>Repeat imaging in 3 months</td></tr>
              <tr><td>LR-TR Nonviable</td><td>No masslike enhancement: complete disappearance, no lesional enhancement, smooth perilesional enhancement, or perfusional change</td><td>Continue monitoring in 3 months</td></tr>
              <tr><td>LR-TR Equivocal</td><td>Uncertain masslike enhancement (presence or morphology)</td><td>Continue monitoring in 3 months</td></tr>
              <tr><td>LR-TR Viable</td><td>Masslike enhancement, any degree, any phase; or uncertain enhancement plus diffusion restriction or mild-moderate T2 hyperintensity there (MRI)</td><td>Multidisciplinary discussion for consensus management; often includes retreatment</td></tr>
            </tbody>
          </table>
        </div>
        <p>Measure the largest masslike enhancing component in one dimension, not crossing nonenhancing areas. Report the pretreatment category and size too, as in "LR-TR Viable 2.3 cm (previously LR-5, 5.2 cm)" (<Cite doi="10.1007/s00261-017-1281-6">Kielar et al., Abdom Radiol 2018</Cite>). Radiologic nonviability does not exclude microscopic tumor.</p>
      </>
    ),
  },
  {
    id: 'report',
    title: 'What the report must contain',
    body: (
      <>
        <p>LI-RADS offers two report formats: one continuous paragraph, or a structured list of keywords and findings (<Cite doi="10.1148/rg.2021200205">Cunha et al., RadioGraphics 2021</Cite>). The v2018 core sets what must be there:</p>
        <ul className="plain-list">
          <li>No observation: say "There are no reportable LI-RADS observations" in the impression.</li>
          <li>LR-NC: in findings and impression, with the technical limitation and a workup suggestion.</li>
          <li>LR-1 and LR-2: may be summarized in aggregate (category range and rough number); in the impression only if it was a suspicious US nodule or LR-4, LR-5 or LR-M before. If you are downgrading from a prior exam, give the rationale.</li>
          <li>LR-3, LR-4, LR-5, LR-M: in findings and impression, with the major features, growth, the ancillary features you used, and change since prior. For LR-M, the likely cause.</li>
          <li>LR-TIV: in findings and impression, with the likely cause, the veins involved, and the category of any parenchymal mass.</li>
          <li>Every reported observation: an identifier kept on every exam, and the series and image where it was measured.</li>
        </ul>
        <p>For LR-M, the core suggests the likely cause: infiltrative appearance, "probably represents HCC"; any feature of hepatocellular origin (fat, iron, blood, nodule-in-nodule, mosaic, nonenhancing capsule, T1 or hepatobiliary-phase hyperintensity), "may represent HCC with atypical features or cHCC-CCA"; targetoid, "most likely represents iCCA, cHCC-CCA, or HCC with atypical features"; otherwise, "etiology uncertain."</p>
        <p>Avoid wording that compels a biopsy. The core suggests phrases like "Options for diagnostic workup include ___ and possibly biopsy."</p>
        <CopyBlock label="Report template" text={reportTemplate} />
      </>
    ),
  },
  {
    id: 'pitfalls',
    title: 'Pitfalls and mimics',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>Perfusion alterations</strong> (arterioportal shunts and other pseudolesions) cause APHE and can mimic HCC. Unlike HCC, they are not masslike, and they lack washout and capsule, so they rarely reach LR-5 (<Cite doi="10.1002/jmri.26027">Kielar et al., 2018</Cite>). Do not apply threshold growth if an observation might be a pseudolesion.</li>
          <li><strong>Rim APHE is not a capsule.</strong> Rim APHE is a targetoid LR-M feature (v2018 core). Rim enhancement is most marked in the arterial phase, while a capsule enhances in the portal venous or later phases (<Cite doi="10.3390/biology10050412">Caraiani et al., 2021</Cite>).</li>
          <li><strong>Transitional-phase hypointensity on gadoxetate is not washout.</strong> See the technique section.</li>
          <li><strong>Measuring on the arterial phase</strong> overestimates size and can push an observation into a higher band.</li>
          <li><strong>LR-M does not mean "not HCC."</strong> About a third of LR-M observations are HCC (<Cite doi="10.1053/j.gastro.2018.11.020">van der Pol et al., 2019</Cite>). LR-3 and LR-4 do not exclude non-HCC cancer either.</li>
          <li><strong>Nodule-in-nodule</strong>: if the inner nodule has LR-5 features such as APHE and washout, the whole observation is LR-5, not an ancillary feature (<Cite doi="10.3390/biology10050412">Caraiani et al., 2021</Cite>).</li>
          <li><strong>Regenerative and dysplastic nodules</strong> can never be LR-1, because imaging cannot exclude a malignant focus. FNH-like and adenoma-like nodules are usually LR-3.</li>
          <li><strong>Another cancer elsewhere</strong> lowers the positive predictive value of LR-5, especially a hypervascular primary. If in doubt, call it LR-M and consider more imaging and a multidisciplinary discussion (v2018 core FAQ).</li>
          <li><strong>Imaging too soon after radiation-based treatment</strong>: lesions can keep APHE and even grow slightly for months after TARE or SBRT. Use the radiation algorithm, not the nonradiation one.</li>
          <li><strong>Infiltrative HCC</strong> can be large and still hard to see. Tumor in vein is often the first clue; obscured veins, heterogeneous signal and architectural distortion are others. Benign perfusion, fat or iron changes can look infiltrative but do not invade veins or distort the liver.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cases',
    title: 'Cases and further reading',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>ACR CT/MRI LI-RADS v2018 core</strong> (free on the ACR site). The algorithm, table, definitions and a long FAQ. Read the FAQ pages on LR-2 distinctive nodules and LR-NC.</li>
          <li><strong>Chernyak et al., Radiology 2018</strong>. The overview of all four algorithms and why the 2018 update happened. <Cite doi="10.1148/radiol.2018181494">doi:10.1148/radiol.2018181494</Cite></li>
          <li><strong>Cerny et al., RadioGraphics 2018</strong>. Every ancillary feature at MRI, with images. <Cite doi="10.1148/rg.2018180052">doi:10.1148/rg.2018180052</Cite></li>
          <li><strong>Tang et al., Radiology 2018</strong>. The evidence behind each major feature and the LR-M features. <Cite doi="10.1148/radiol.2017170554">doi:10.1148/radiol.2017170554</Cite></li>
          <li><strong>Santillan et al., Abdom Radiol 2018</strong>. The categories one by one. <Cite doi="10.1007/s00261-017-1334-x">doi:10.1007/s00261-017-1334-x</Cite></li>
          <li><strong>Cunha et al., RadioGraphics 2021</strong>. How to write the report, with two case-based templates. <Cite doi="10.1148/rg.2021200205">doi:10.1148/rg.2021200205</Cite></li>
          <li><strong>Kielar et al., Abdom Radiol 2018</strong> (free full text). Expected appearances after each locoregional therapy. <Cite doi="10.1007/s00261-017-1281-6">doi:10.1007/s00261-017-1281-6</Cite></li>
        </ul>
      </>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'liver-lirads',
  name: 'Liver CT and MRI (LI-RADS)',
  lede: 'One observation at a time in a patient at risk for HCC: who LI-RADS is for, the algorithm in order, the diagnostic table, ancillary features, treated lesions, and the report.',
  sourceNote: 'Draft lesson compiled from the ACR CT/MRI LI-RADS v2018 core, the 2024 nonradiation treatment response algorithm and the papers below; citations checked against PubMed in September 2026. Not yet reviewed by the site author.',
  references,
  referencesNote: 'The two ACR core documents have no DOI; they are free on the ACR LI-RADS page. Check there for any version newer than v2018 (diagnosis) and v2024 (treatment response).',
  report: {
    steps: [
      {
        id: 'applies',
        title: 'Step 1. Does LI-RADS apply? (patient and exam)',
        learn: 'big-idea',
        teach: (
          <>
            <p>Apply CT/MRI LI-RADS to patients with <strong>cirrhosis, chronic hepatitis B, or current or prior HCC</strong>, including adult transplant candidates and recipients. Not under 18, not without those risk factors, and not in cirrhosis from congenital hepatic fibrosis or a vascular disorder such as Budd-Chiari (ACR v2018 core).</p>
            <p>It needs a multiphase CT or MRI. With gadoxetate, "washout" counts only in the portal venous phase; transitional-phase hypointensity is an ancillary feature (<Cite doi="10.1002/jmri.26027">Kielar et al., J Magn Reson Imaging 2018</Cite>).</p>
            <p>Another active primary cancer lowers the positive predictive value of LR-5. If in doubt, call it LR-M.</p>
          </>
        ),
        fields: [fields.risk, fields.extrahepatic, fields.modality, fields.status],
        derive: deriveApplies,
      },
      {
        id: 'observation',
        title: 'Step 2. Find the observation and measure it',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>Largest outer-edge-to-outer-edge dimension, <strong>including the capsule</strong>, on the phase, sequence and plane where the margins are clearest. Avoid arterial phase and DWI if the margins show elsewhere.</li>
              <li>Keep the same identifier on every exam, and give the series and image.</li>
              <li>LR-NC only if a missing or degraded phase leaves the answer anywhere from benign to malignant. Not if you can narrow it to LR-1 vs LR-2, or LR-4 vs LR-5 vs LR-M.</li>
            </ul>
          </>
        ),
        fields: [fields.present, fields.obsId, fields.segment, fields.size, fields.image, fields.nc, fields.ncReason],
        derive: deriveObservation,
      },
      {
        id: 'tiv',
        title: 'Step 3. Tumor in vein',
        learn: 'search-pattern',
        teach: (
          <>
            <p><strong>Unequivocal enhancing soft tissue in a vein</strong>, with or without a visible mass, is LR-TIV. An occluded vein that is ill-defined, restricts diffusion, or touches a malignant mass only suggests it. If unsure, do not call LR-TIV.</p>
            <p>Say the likely cause: "may be due to non-HCC malignancy" next to an LR-M mass, "definitely due to HCC" next to an LR-5 mass, otherwise "probably due to HCC." Keep going through the steps to categorize any parenchymal mass.</p>
          </>
        ),
        fields: [fields.tiv, fields.tivVein],
        derive: deriveTiv,
      },
      {
        id: 'benign',
        title: 'Step 4. Definitely or probably benign?',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Cyst, hemangioma, perfusion alteration, focal fat or sparing, hypertrophic pseudomass, confluent fibrosis: LR-1 if definite, LR-2 if probable.</p>
            <p>A distinctive solid nodule under 20 mm with no major feature, no LR-M feature and no ancillary feature of malignancy is LR-2; at 20 mm or more it is LR-3 or higher. FNH-like or adenoma-like nodules are usually LR-3, never LR-1 (ACR v2018 core).</p>
          </>
        ),
        fields: [fields.benign, fields.benignDx],
        derive: deriveBenign,
      },
      {
        id: 'lrm',
        title: 'Step 5. LR-M features (is it targetoid?)',
        learn: 'search-pattern',
        teach: (
          <>
            <p><strong>Targetoid</strong> (rim APHE, peripheral "washout", delayed central enhancement, targetoid restriction or targetoid transitional/hepatobiliary appearance): LR-M.</p>
            <p><strong>Nontargetoid</strong> with infiltrative appearance, marked diffusion restriction, necrosis or severe ischemia, or another non-HCC feature: LR-M <em>only if it does not meet LR-5</em>.</p>
            <p>LR-M keeps LR-5 specific for HCC without losing sensitivity for cancer (<Cite doi="10.1007/s00261-017-1196-2">Fowler et al., Abdom Radiol 2018</Cite>). About a third of LR-M observations are HCC (<Cite doi="10.1053/j.gastro.2018.11.020">van der Pol et al., Gastroenterology 2019</Cite>).</p>
          </>
        ),
        fields: [fields.lrmTarget, fields.lrmOther, fields.hepatocellular],
        derive: deriveLrm,
      },
      {
        id: 'major',
        title: 'Step 6. Major features and the diagnostic table',
        learn: 'categories',
        teach: (
          <>
            <ul className="plain-list">
              <li><strong>Nonrim APHE</strong>: unequivocally brighter than liver in the arterial phase, in whole or in part, not rim-like.</li>
              <li><strong>Nonperipheral "washout"</strong>: ends darker than liver in the portal venous or delayed phase (portal venous only with gadoxetate).</li>
              <li><strong>Enhancing "capsule"</strong>: smooth, uniform, sharp enhancing rim in the portal venous, delayed or transitional phase.</li>
              <li><strong>Threshold growth</strong>: 50% or more in 6 months or less, of a mass, against prior CT or MRI.</li>
            </ul>
            <p>10–19 mm with APHE: one extra feature gives LR-4 if it is capsule, LR-5 if washout or threshold growth. 20 mm or more with APHE: any extra feature gives LR-5, none gives LR-4. No APHE never reaches LR-5. If unsure a feature is there, call it absent.</p>
          </>
        ),
        fields: [fields.aphe, fields.washout, fields.capsule, fields.growth, fields.priorSize, fields.priorMonths],
        derive: deriveMajor,
      },
      {
        id: 'ancillary',
        title: 'Step 7. Ancillary features (optional)',
        learn: 'search-pattern',
        teach: (
          <p>One or more favoring malignancy upgrade by one category, up to LR-4, never to LR-5. One or more favoring benignity downgrade by one. Both kinds present: do not adjust (<Cite doi="10.1148/rg.2018180052">Cerny et al., RadioGraphics 2018</Cite>). If unsure a feature is there, call it absent.</p>
        ),
        fields: [fields.afMalignant, fields.afBenign],
        derive: deriveAncillary,
      },
      {
        id: 'treated',
        title: 'Treated lesion: treatment response (TRA v2024)',
        learn: 'categories',
        teach: (
          <>
            <p>After ablation, ethanol, embolization, or at a surgical margin, the nonradiation algorithm has one feature of viability: <strong>masslike enhancement</strong>, any degree, any phase. None is Nonviable; uncertain is Equivocal (Viable if diffusion restriction or mild-moderate T2 hyperintensity sits in that area, MRI only); present is Viable. If unsure, choose Equivocal (ACR nonradiation TRA v2024; <Cite doi="10.1148/radiol.232408">Aslam et al., Radiology 2024</Cite>).</p>
            <p>Report the pretreatment category and size with the current category, e.g. "LR-TR Viable 2.3 cm (previously LR-5, 5.2 cm)" (<Cite doi="10.1007/s00261-017-1281-6">Kielar et al., Abdom Radiol 2018</Cite>). After TARE or SBRT use the radiation algorithm.</p>
          </>
        ),
        fields: [fields.trType, fields.trPreCategory, fields.trPreSize, fields.trMasslike, fields.trAf, fields.trSize],
      },
      {
        id: 'final',
        title: 'Step 8. Tiebreak, final check and comparison',
        learn: 'report',
        teach: (
          <>
            <p>If unsure between two categories, choose the one reflecting lower certainty: LR-4 over LR-5, LR-M over LR-5. Then ask whether the category seems reasonable; if not, reevaluate.</p>
            <p>Report LR-3 and above in findings and impression with the features and change since prior. If you downgrade from a prior exam, give the rationale (ACR v2018 core).</p>
          </>
        ),
        fields: [fields.priorCategory, fields.change, fields.other],
        derive: deriveFinal,
      },
    ],
    build,
  },
  learn,
  quiz: [
    {
      id: 'lr5-washout',
      question: 'A 15 mm observation in a patient with cirrhosis has nonrim APHE and nonperipheral washout, no capsule, no prior. What is the LI-RADS v2018 category?',
      options: ['LR-3', 'LR-4', 'LR-5', 'LR-M'],
      answer: 2,
      explanation: <p>In v2018, 10–19 mm with nonrim APHE and nonperipheral washout is LR-5, matching AASLD; before 2018 it needed ultrasound visibility (LR-5us) (<Cite doi="10.3390/biology10050412">Caraiani et al., Biology 2021</Cite>). In the USA it does not count as OPTN Class 5.</p>,
    },
    {
      id: 'lr4-capsule',
      question: 'A 15 mm observation has nonrim APHE and an enhancing capsule only. What is the category?',
      options: ['LR-4', 'LR-5', 'LR-3', 'LR-M'],
      answer: 0,
      explanation: <p>In the 10–19 mm column with APHE and exactly one additional feature, capsule gives LR-4, while washout or threshold growth give LR-5 (ACR v2018 core; <Cite doi="10.3390/biology10050412">Caraiani et al., 2021</Cite>).</p>,
    },
    {
      id: 'threshold-growth',
      question: 'Which meets the v2018 definition of threshold growth?',
      options: ['Any new observation of 10 mm or more', '100% size increase over 12 months', 'Any unequivocal size increase', 'Size increase of a mass by 50% or more in 6 months or less'],
      answer: 3,
      explanation: <p>v2018 simplified threshold growth to 50% or more in 6 months or less, the same as AASLD and OPTN. A new 10 mm observation or 100% growth over more than 6 months is now subthreshold growth, an ancillary feature (<Cite doi="10.3390/biology10050412">Caraiani et al., 2021</Cite>).</p>,
    },
    {
      id: 'af-cap',
      question: 'A 25 mm observation has nonrim APHE, no washout, no capsule and no growth (LR-4). It restricts diffusion and is mildly T2 hyperintense. What is the final category?',
      options: ['LR-5', 'LR-4', 'LR-M', 'LR-3'],
      answer: 1,
      explanation: <p>Ancillary features favoring malignancy upgrade by one category only up to LR-4; they cannot make LR-5 (<Cite doi="10.1148/rg.2018180052">Cerny et al., RadioGraphics 2018</Cite>). LR-5 needs major features.</p>,
    },
    {
      id: 'gadoxetate',
      question: 'On gadoxetate MRI, an APHE observation is isointense in the portal venous phase and hypointense at 3 minutes. How do you treat the 3-minute hypointensity?',
      options: ['As nonperipheral washout', 'As an enhancing capsule', 'As an ancillary feature favoring malignancy, not washout', 'As a targetoid LR-M feature'],
      answer: 2,
      explanation: <p>With gadoxetate, washout counts only in the portal venous phase. Transitional-phase hypointensity may reflect the liver taking up the agent, so it is an ancillary feature favoring malignancy; counting it as washout would call some cholangiocarcinomas and hemangiomas LR-5 (<Cite doi="10.1002/jmri.26027">Kielar et al., J Magn Reson Imaging 2018</Cite>).</p>,
    },
    {
      id: 'targetoid',
      question: 'A 30 mm mass has rim APHE, peripheral washout and delayed central enhancement. What is the category?',
      options: ['LR-M', 'LR-5', 'LR-4', 'LR-TIV'],
      answer: 0,
      explanation: <p>A targetoid mass is LR-M. LR-M keeps LR-5 specific for HCC without losing sensitivity for cancer (<Cite doi="10.1007/s00261-017-1196-2">Fowler et al., Abdom Radiol 2018</Cite>). It does not exclude HCC: about a third of LR-M observations are HCC (<Cite doi="10.1053/j.gastro.2018.11.020">van der Pol et al., Gastroenterology 2019</Cite>).</p>,
    },
    {
      id: 'tiebreak',
      question: 'You cannot decide between LR-5 and LR-M. Which do you assign?',
      options: ['LR-5, the more specific category', 'LR-M', 'LR-4', 'LR-NC'],
      answer: 1,
      explanation: <p>The tiebreaking rule picks the category reflecting lower certainty, so LR-M over LR-5 (and LR-4 over LR-5). This keeps LR-5 at 100% certainty for HCC (ACR v2018 core). In pooled data, 94% of LR-5 observations were HCC (<Cite doi="10.1053/j.gastro.2018.11.020">van der Pol et al., 2019</Cite>).</p>,
    },
    {
      id: 'population',
      question: 'In which patient should CT/MRI LI-RADS categories NOT be assigned?',
      options: ['Chronic hepatitis B without cirrhosis', 'Prior HCC after liver transplant', 'Cirrhosis from Budd-Chiari syndrome', 'Alcohol-related cirrhosis'],
      answer: 2,
      explanation: <p>LI-RADS does not apply to cirrhosis from vascular disorders such as Budd-Chiari, hereditary hemorrhagic telangiectasia or chronic portal vein occlusion, because they form benign nodules that look like HCC. It does apply in chronic hepatitis B even without cirrhosis, and in current or prior HCC including after transplant (<Cite doi="10.1002/jmri.26027">Kielar et al., J Magn Reson Imaging 2018</Cite>).</p>,
    },
  ],
}

export function LiverLiradsStudyPage() {
  return <StudyPage study={study} />
}
