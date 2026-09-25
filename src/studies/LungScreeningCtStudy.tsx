import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { initialLungRadsForm, lungRads } from '../logic/lungrads'
import type { LungRadsForm, NoduleType, PriorCategory, Timepoint } from '../logic/lungrads'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

/* DOIs, confirmed in PubMed metadata (September 2026). */
const LUNGRADS = '10.1016/j.jacr.2023.09.009'
const NLST = '10.1056/NEJMoa1102873'
const NELSON = '10.1056/NEJMoa1911793'
const USPSTF = '10.1001/jama.2021.1117'
const PINSKY = '10.7326/M14-2086'
const BROCK = '10.1056/NEJMoa1214726'
const PFN = '10.1148/radiol.12112351'
const INFECTION = '10.2214/AJR.25.33279'
const PRACTICE = '10.1097/RTI.0000000000000097'
const LIMITS = '10.1148/rg.2017170051'
const UPDATE = '10.1148/rg.230037'
const RCNA = '10.1016/j.rcl.2024.12.007'

const references: LessonReference[] = [
  { citation: 'American College of Radiology. Lung-RADS v2022: assessment categories and notes 1–16. Released November 2022. (The rulebook: the table this lesson follows, free on the ACR Lung-RADS page.)' },
  { citation: 'Christensen J et al. ACR Lung-RADS v2022: assessment categories and management recommendations. J Am Coll Radiol 2024;21:473–488. (Also published in Chest 2024;165:738–753.)', doi: LUNGRADS },
  { citation: 'National Lung Screening Trial Research Team; Aberle DR et al. Reduced lung-cancer mortality with low-dose computed tomographic screening. N Engl J Med 2011;365:395–409.', doi: NLST },
  { citation: 'de Koning HJ et al. Reduced lung-cancer mortality with volume CT screening in a randomized trial (NELSON). N Engl J Med 2020;382:503–513.', doi: NELSON },
  { citation: 'US Preventive Services Task Force; Krist AH et al. Screening for lung cancer: US Preventive Services Task Force recommendation statement. JAMA 2021;325:962–970.', doi: USPSTF },
  { citation: 'Pinsky PF et al. Performance of Lung-RADS in the National Lung Screening Trial: a retrospective assessment. Ann Intern Med 2015;162:485–491.', doi: PINSKY },
  { citation: 'McWilliams A et al. Probability of cancer in pulmonary nodules detected on first screening CT. N Engl J Med 2013;369:910–919. (The Brock / PanCan model that note 13 points to.)', doi: BROCK },
  { citation: 'de Hoop B et al. Pulmonary perifissural nodules on CT scans: rapid growth is not a predictor of malignancy. Radiology 2012;265:611–616.', doi: PFN },
  { citation: 'Arora S et al. Real-world use and outcomes of Lung-RADS v1.1 category 4B versus Lung-RADS v2022 category 0 for suspected infectious or inflammatory findings on lung cancer screening CT. AJR 2025;225:e2533279.', doi: INFECTION },
  { citation: 'Kazerooni EA et al. ACR-STR practice parameter for the performance and reporting of lung cancer screening thoracic CT: 2014. J Thorac Imaging 2014;29:310–316.', doi: PRACTICE },
  { citation: 'Martin MD et al. Lung-RADS: pushing the limits. RadioGraphics 2017;37:1975–1993.', doi: LIMITS },
  { citation: 'Martin MD et al. Update: Lung-RADS 2022. RadioGraphics 2023;43:e230037.', doi: UPDATE },
  { citation: 'Agrawal R et al. Lung-RADS v2022 update. Radiol Clin North Am 2025;63:507–516.', doi: RCNA },
]

const reportTemplate = `Exam: Low-dose CT chest for lung cancer screening, [baseline / annual] screen.
Comparison: [prior CT, date / prior CT being located / none].
Lungs: [fully evaluable / limited: reason].
Nodules: [none / only benign nodules: calcified or fat-containing].
Dominant nodule (most suspicious): [solid / part-solid / nonsolid / airway];
  location, series/image; long x short axis __ x __ mm, mean __ mm
  (one decimal); solid component __ mm; [baseline / new / growing / stable]
  (prior mean __ mm, __ months ago); suspicious features.
Other nodules: [describe].
Other findings: [describe]; S modifier if clinically significant.
Impression: Lung-RADS [0-4X][ with S modifier]: [descriptor].
  [Management], timed from the date of this exam.`

/* Option sets, shared by the fields and the report wording. */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const roundField = {
  options: [
    { value: 'baseline', label: 'Baseline (first screen)' },
    { value: 'annual', label: 'Annual (later screen)' },
  ],
}

const comparisonField = {
  options: [
    { value: 'available', label: 'Prior CT compared' },
    { value: 'pending', label: 'Prior CT being located' },
    { value: 'none', label: 'No prior CT' },
  ],
}

const nodulesField = {
  options: [
    { value: 'none', label: 'No lung nodules' },
    { value: 'benign', label: 'Only benign nodules' },
    { value: 'present', label: 'Nodule(s) to classify' },
  ],
}

const benignField = {
  options: [
    { value: 'calcified', label: 'Complete, central, popcorn or concentric ring calcification' },
    { value: 'fat', label: 'Fat-containing' },
  ],
}

const infectionField = {
  options: [
    { value: 'consolidation', label: 'Segmental or lobar consolidation' },
    { value: 'multiple', label: 'Multiple new nodules (more than six)' },
    { value: 'large', label: 'Large solid nodule (≥ 8 mm) appearing in a short interval' },
    { value: 'context', label: 'New nodules in a clinical context such as immunocompromise' },
  ],
}

const typeField: { options: (Option & { value: Exclude<NoduleType, 'infectious'> })[] } = {
  options: [
    { value: 'solid', label: 'Solid' },
    { value: 'partSolid', label: 'Part-solid' },
    { value: 'groundGlass', label: 'Nonsolid (ground glass)' },
    { value: 'airway', label: 'Airway nodule' },
  ],
}

const airwayLevelField = {
  options: [
    { value: 'subsegmental', label: 'Subsegmental' },
    { value: 'segmentalOrMoreProximal', label: 'Segmental or more proximal' },
  ],
}

const timepointField: { options: (Option & { value: Timepoint })[] } = {
  options: [
    { value: 'baseline', label: 'Baseline' },
    { value: 'new', label: 'New' },
    { value: 'growing', label: 'Growing' },
    { value: 'stable', label: 'Stable or decreased' },
  ],
}

const priorCategoryField = {
  options: [
    { value: 'none', label: 'Not on short-interval follow-up' },
    { value: '3', label: 'Category 3 (6-month LDCT)' },
    { value: '4A', label: 'Category 4A (3-month LDCT)' },
    { value: '4B', label: 'Category 4B' },
  ],
}

const suspiciousField = {
  options: [
    { value: 'spiculation', label: 'Spiculation' },
    { value: 'nodes', label: 'Lymphadenopathy' },
    { value: 'metastases', label: 'Frank metastatic disease' },
    { value: 'doubling', label: 'Ground-glass nodule doubled in size in 1 year' },
  ],
}

const sField = {
  options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Significant finding (S)' },
  ],
}

/* Rules the lesson states. */

/**
 * Note 4: "measure both the long and short axis to one decimal point in mm, and report mean
 * nodule diameter to one decimal point." Worked in tenths so 6.1 and 5.8 give 6.0, not 5.9.
 */
function meanDiameter(values: Values): number | undefined {
  const long = num(values, 'long')
  const short = num(values, 'short')
  if (long === undefined || short === undefined) return undefined
  return Math.round((Math.round(long * 10) + Math.round(short * 10)) / 2) / 10
}

function mm(value: number): string {
  return value.toFixed(1)
}

function noduleType(values: Values): Exclude<NoduleType, 'infectious'> | '' {
  const type = str(values, 'nodule-type')
  return typeField.options.find((option) => option.value === type)?.value ?? ''
}

function timepoint(values: Values): Timepoint | '' {
  const value = str(values, 'timepoint')
  return timepointField.options.find((option) => option.value === value)?.value ?? ''
}

function infectious(values: Values): boolean {
  return list(values, 'infection').length > 0
}

function hasNodule(values: Values): boolean {
  return str(values, 'nodules') === 'present'
}

/**
 * Note 6: growth is "an increase in mean diameter size of > 1.5 mm within a 12-month
 * interval." Undefined unless both the prior mean and the interval are entered.
 */
function growth(values: Values): { change: number; grew: boolean | undefined } | undefined {
  const current = meanDiameter(values)
  const prior = num(values, 'prior-mean')
  const months = num(values, 'interval')
  if (current === undefined || prior === undefined || months === undefined) return undefined
  const change = Math.round((current - prior) * 10) / 10
  if (change <= 1.5) return { change, grew: months <= 12 ? false : undefined }
  return { change, grew: months <= 12 ? true : undefined }
}

/** Note 8: growth over several screens that never reaches > 1.5 mm in any 12 months. */
function slowGrowth(values: Values): boolean {
  return str(values, 'slow') === 'yes'
}

function priorCategory(values: Values): PriorCategory {
  const prior = str(values, 'prior-cat')
  return prior === '3' || prior === '4A' || prior === '4B' ? prior : 'none'
}

/** The inputs of the shared calculator (`src/logic/lungrads.ts`), from this form. */
function calculatorForm(values: Values): LungRadsForm {
  const mean = meanDiameter(values)
  const solid = num(values, 'solid')
  return {
    ...initialLungRadsForm,
    noduleType: noduleType(values) || 'solid',
    timepoint: timepoint(values) || 'baseline',
    meanDiameterMm: mean === undefined ? '' : String(mean),
    solidComponentMm: solid === undefined ? '' : String(solid),
    airwaySegment: str(values, 'airway-level') === 'segmentalOrMoreProximal' ? 'segmentalOrMoreProximal' : 'subsegmental',
    airwayBenignFeatures: str(values, 'airway-air') === 'yes',
    inflammatoryPattern: infectious(values),
    verySuspicious: list(values, 'suspicious').length > 0,
    priorCategory: priorCategory(values),
  }
}

type Assessment = { category: string; management: string; reason: string }

const DESCRIPTORS: Record<string, string> = {
  'Lung-RADS 0': 'incomplete',
  'Lung-RADS 1': 'negative',
  'Lung-RADS 2': 'benign based on imaging features or indolent behavior',
  'Lung-RADS 3': 'probably benign',
  'Lung-RADS 4A': 'suspicious',
  'Lung-RADS 4B': 'very suspicious',
  'Lung-RADS 4X': 'very suspicious',
}

const ANNUAL = '12-month screening LDCT.'
const FOUR_B = 'Diagnostic chest CT with or without contrast; PET/CT may be considered if there is a ≥ 8 mm solid nodule or solid component; tissue sampling; and/or referral for further clinical evaluation.'

/**
 * The exam's category. The table's steps that come before the nodule (notes 9, 10, category 1)
 * and the two nodule rules the calculator has no input for (juxtapleural nodules, note 8 slow
 * growth) are applied here; every other nodule goes through the shared calculator unchanged.
 * Undefined while the inputs it needs are missing, rather than guessing a size of 0.
 */
function assess(values: Values): Assessment | undefined {
  if (str(values, 'comparison') === 'pending') {
    return { category: 'Lung-RADS 0', management: 'Comparison to prior chest CT; a new category is assigned when it is available.', reason: 'Note 9: waiting on prior exams makes Lung-RADS 0 temporary.' }
  }
  if (str(values, 'evaluable') === 'no') {
    return { category: 'Lung-RADS 0', management: 'Additional lung cancer screening CT imaging needed.', reason: 'Part or all of the lungs cannot be evaluated.' }
  }
  if (infectious(values)) {
    const result = lungRads(calculatorForm(values))
    return { category: result.category, management: result.management, reason: result.reason }
  }
  const nodules = str(values, 'nodules')
  if (nodules === 'none') return { category: 'Lung-RADS 1', management: ANNUAL, reason: 'No lung nodules.' }
  if (nodules === 'benign') return { category: 'Lung-RADS 1', management: ANNUAL, reason: 'Nodules with benign features only (calcification pattern or fat).' }
  if (nodules !== 'present') return undefined

  const type = noduleType(values)
  const mean = meanDiameter(values)
  const when = timepoint(values)
  if (!type || !when) return undefined
  if (type !== 'airway' && mean === undefined) return undefined
  if (type === 'partSolid' && num(values, 'solid') === undefined) return undefined

  if (type === 'solid' && str(values, 'juxtapleural') === 'yes' && mean !== undefined && mean < 10 && (when === 'baseline' || when === 'new')) {
    return { category: 'Lung-RADS 2', management: ANNUAL, reason: 'Juxtapleural solid nodule < 10 mm at baseline or new, with smooth margins and oval, lentiform or triangular shape.' }
  }
  if ((type === 'solid' || type === 'partSolid') && slowGrowth(values)) {
    const x = list(values, 'suspicious').length > 0
    return {
      category: x ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
      management: `${FOUR_B} Slow-growing nodules may not be PET-avid, so biopsy, if feasible, or surgical evaluation may be most appropriate.`,
      reason: 'Note 8: slow growth over multiple screens without > 1.5 mm in any 12 months is suspicious.',
    }
  }
  const result = lungRads(calculatorForm(values))
  return { category: result.category, management: result.management, reason: result.reason }
}

/**
 * Cases the v2022 table leaves to the reader's judgment, listed under "check before signing"
 * so the category is not signed without a look.
 */
function guidelineChecks(values: Values, result: Assessment | undefined): string[] {
  if (!result || !hasNodule(values) || infectious(values) || str(values, 'comparison') === 'pending' || str(values, 'evaluable') === 'no') return []
  const out: string[] = []
  const type = noduleType(values)
  const when = timepoint(values)
  if ((type === 'solid' || type === 'partSolid') && when === 'stable' && !slowGrowth(values) && str(values, 'prior-cat') === '4B') {
    out.push('A 4B lesion stays 4B while stable; it becomes category 2 only if proven benign after appropriate diagnostic workup.')
  }
  if (type === 'airway' && str(values, 'airway-level') === 'subsegmental' && when === 'growing') {
    out.push('The table gives category 2 for a subsegmental airway nodule at baseline, new or stable; it has no row for a growing one.')
  }
  if (type === 'airway' && str(values, 'airway-level') === 'segmentalOrMoreProximal' && str(values, 'airway-air') === 'yes') {
    out.push('Air in a segmental or more proximal airway abnormality favors secretions and may be category 2 only with no underlying soft-tissue nodule (note 11c).')
  }
  return out
}

/* Fields. Declared once so the report can read their labels. */

const fields = {
  round: { id: 'round', kind: 'choice', label: 'Screening round', ...roundField, required: true },
  comparison: { id: 'comparison', kind: 'choice', label: 'Comparison', ...comparisonField, required: true, help: 'Waiting on a prior makes the exam Lung-RADS 0 until it arrives.' },
  priorDate: { id: 'prior-date', kind: 'text', label: 'Prior CT date', placeholder: 'e.g. 2025-09-12', showIf: (v) => str(v, 'comparison') === 'available' },
  evaluable: { id: 'evaluable', kind: 'choice', label: 'Whole of both lungs evaluable?', options: yesNo, required: true },
  limitation: { id: 'limitation', kind: 'text', label: 'What limits it', placeholder: 'e.g. lung bases not covered, severe motion', required: true, showIf: (v) => str(v, 'evaluable') === 'no' },
  nodules: { id: 'nodules', kind: 'choice', label: 'Lung nodules', ...nodulesField, required: true },
  benign: { id: 'benign', kind: 'multi', label: 'Benign features', ...benignField, showIf: (v) => str(v, 'nodules') === 'benign' },
  infection: { id: 'infection', kind: 'multi', label: 'Findings suggesting an infectious or inflammatory process', ...infectionField, help: 'Any of these: Lung-RADS 0 with 1–3 month LDCT. Tree-in-bud or a new < 3 cm ground-glass nodule may not need it.' },
  infectionText: { id: 'infection-text', kind: 'text', label: 'Describe them', placeholder: 'e.g. right lower lobe segmental consolidation', showIf: infectious },
  type: { id: 'nodule-type', kind: 'choice', label: 'Dominant nodule type', ...typeField, required: true, showIf: hasNodule, help: 'Code the exam on the nodule with the highest degree of suspicion.' },
  location: { id: 'location', kind: 'text', label: 'Location and series/image', placeholder: 'e.g. RUL, series 4 image 112', required: true, showIf: hasNodule },
  juxtapleural: { id: 'juxtapleural', kind: 'choice', label: 'Juxtapleural, smooth, oval/lentiform/triangular?', options: yesNo, showIf: (v) => hasNodule(v) && noduleType(v) === 'solid', help: 'Perifissural, costal, perimediastinal or peridiaphragmatic: category 2 if < 10 mm at baseline or new.' },
  airwayLevel: { id: 'airway-level', kind: 'choice', label: 'Airway level', ...airwayLevelField, required: true, showIf: (v) => hasNodule(v) && noduleType(v) === 'airway' },
  airwayAir: { id: 'airway-air', kind: 'choice', label: 'Air within it, favoring secretions, no soft-tissue nodule?', options: yesNo, showIf: (v) => hasNodule(v) && noduleType(v) === 'airway' && str(v, 'airway-level') === 'segmentalOrMoreProximal' },
  long: { id: 'long', kind: 'number', label: 'Long axis', unit: 'mm', min: 0, step: 0.1, required: true, showIf: (v) => hasNodule(v) && noduleType(v) !== 'airway', help: 'To one decimal, in whichever plane shows the true size.' },
  short: { id: 'short', kind: 'number', label: 'Short axis', unit: 'mm', min: 0, step: 0.1, required: true, showIf: (v) => hasNodule(v) && noduleType(v) !== 'airway' },
  solid: { id: 'solid', kind: 'number', label: 'Solid component, mean diameter', unit: 'mm', min: 0, step: 0.1, required: true, showIf: (v) => hasNodule(v) && noduleType(v) === 'partSolid', help: 'Solid part 6 / 8 mm at baseline; 4 mm when new or growing.' },
  timepoint: { id: 'timepoint', kind: 'choice', label: 'Compared with the prior screen', ...timepointField, required: true, showIf: hasNodule, help: 'Baseline means the first screen. Size thresholds also apply when a nodule enlarges into a higher band.' },
  priorMean: { id: 'prior-mean', kind: 'number', label: 'Prior mean diameter', unit: 'mm', min: 0, step: 0.1, showIf: (v) => hasNodule(v) && ['growing', 'stable'].includes(timepoint(v)) },
  interval: { id: 'interval', kind: 'number', label: 'Months since that prior', unit: 'months', min: 0, showIf: (v) => hasNodule(v) && ['growing', 'stable'].includes(timepoint(v)), help: 'Growth is > 1.5 mm in mean diameter within 12 months.' },
  slow: { id: 'slow', kind: 'choice', label: 'Slow growth over several screens?', options: yesNo, showIf: (v) => hasNodule(v) && ['growing', 'stable'].includes(timepoint(v)) && noduleType(v) !== 'airway', help: 'Growth across exams that never reaches > 1.5 mm in any 12 months.' },
  priorCat: { id: 'prior-cat', kind: 'choice', label: 'Category it was being followed as', ...priorCategoryField, showIf: (v) => hasNodule(v) && timepoint(v) === 'stable' && ['solid', 'partSolid'].includes(noduleType(v)), help: 'Stepped management: 3 stable at 6 months → 2; 4A stable at 3 months → 3.' },
  suspicious: { id: 'suspicious', kind: 'multi', label: 'Features that increase suspicion (4X)', ...suspiciousField, showIf: hasNodule },
  otherNodules: { id: 'other-nodules', kind: 'text', label: 'Other nodules', placeholder: 'e.g. two solid nodules < 4 mm, unchanged', multiline: true },
  s: { id: 's', kind: 'choice', label: 'Findings unrelated to lung cancer', ...sField, required: true, help: 'Not for findings already known and under evaluation.' },
  sText: { id: 's-text', kind: 'text', label: 'Describe the S finding', placeholder: 'e.g. 5.2 cm ascending aortic aneurysm', multiline: true, required: true, showIf: (v) => str(v, 's') === 'present' },
  otherFindings: { id: 'other-findings', kind: 'text', label: 'Other findings', placeholder: 'e.g. mild centrilobular emphysema', multiline: true },
} satisfies Record<string, Field>

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function lowerLabel(field: { options: Option[] }, value: string): string {
  return optionLabel(field, value).toLowerCase()
}

function examLine(values: Values): string {
  const round = str(values, 'round')
  return `Exam: Low-dose CT chest for lung cancer screening${round ? `, ${round} screen` : ''}.`
}

function comparisonLine(values: Values): string {
  const comparison = str(values, 'comparison')
  const date = str(values, 'prior-date')
  if (comparison === 'available') return `Comparison: prior CT${date ? ` dated ${date}` : ''}.`
  if (comparison === 'pending') return 'Comparison: prior CT being located.'
  if (comparison === 'none') return 'Comparison: none.'
  return ''
}

function lungsLine(values: Values): string {
  const evaluable = str(values, 'evaluable')
  if (evaluable === 'yes') return 'Lungs: fully evaluable.'
  if (evaluable === 'no') return sentence(`Lungs: limited${str(values, 'limitation') ? `: ${str(values, 'limitation')}` : ''}`)
  return ''
}

function nodulesLine(values: Values): string {
  const nodules = str(values, 'nodules')
  if (nodules === 'none') return 'Nodules: none.'
  if (nodules === 'benign') {
    const kinds = list(values, 'benign').map((kind) => (kind === 'fat' ? 'fat-containing' : 'benign calcification pattern'))
    return `Nodules: only benign nodules${kinds.length > 0 ? ` (${kinds.join(', ')})` : ''}.`
  }
  return ''
}

function dominantLine(values: Values): string {
  if (!hasNodule(values)) return ''
  const type = noduleType(values)
  const mean = meanDiameter(values)
  const long = num(values, 'long')
  const short = num(values, 'short')
  const solid = num(values, 'solid')
  const when = timepoint(values)
  const prior = num(values, 'prior-mean')
  const months = num(values, 'interval')
  const suspicious = list(values, 'suspicious').map((feature) => lowerLabel(suspiciousField, feature))
  const body = join(
    [
      type && lowerLabel(typeField, type),
      type === 'airway' && str(values, 'airway-level') && `${lowerLabel(airwayLevelField, str(values, 'airway-level'))} airway`,
      type === 'airway' && str(values, 'airway-level') === 'segmentalOrMoreProximal' && str(values, 'airway-air') === 'yes' && 'containing air, favoring secretions, no soft-tissue nodule',
      str(values, 'location'),
      long !== undefined && short !== undefined && mean !== undefined && `${mm(long)} x ${mm(short)} mm, mean ${mm(mean)} mm`,
      type === 'partSolid' && solid !== undefined && `solid component ${mm(solid)} mm`,
      type === 'solid' && str(values, 'juxtapleural') === 'yes' && 'juxtapleural, smooth, oval/lentiform/triangular',
      when && `${lowerLabel(timepointField, when)}${prior !== undefined ? ` (prior mean ${mm(prior)} mm${months !== undefined ? `, ${months} months ago` : ''})` : ''}`,
      slowGrowth(values) && 'slow growth over several screens',
      suspicious.length > 0 && `suspicious features: ${suspicious.join(', ')}`,
    ],
    ', ',
  )
  return body && `Dominant nodule: ${body}.`
}

function infectionLine(values: Values): string {
  if (!infectious(values)) return ''
  const found = list(values, 'infection').map((finding) => lowerLabel(infectionField, finding))
  const text = str(values, 'infection-text')
  return `Findings suggesting infection or inflammation: ${join([found.join(', '), text])}.`
}

/** Free text as a sentence: ends with a full stop unless it already ends in punctuation. */
function sentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function otherLines(values: Values): string {
  const s = str(values, 's')
  return lines(
    str(values, 'other-nodules') && sentence(`Other nodules: ${str(values, 'other-nodules')}`),
    s === 'present' && sentence(`Other findings (S): ${str(values, 's-text') || '[describe]'}`),
    str(values, 'other-findings') && sentence(`Other findings: ${str(values, 'other-findings')}`),
  )
}

function impression(values: Values, result: Assessment | undefined): string {
  if (!result) return ''
  const s = str(values, 's') === 'present'
  const descriptor = DESCRIPTORS[result.category] ?? ''
  const head = `Impression: ${result.category}${s ? ' with S modifier' : ''}${descriptor ? `: ${descriptor}` : ''}.`
  return lines(
    head,
    `Management: ${result.management} Follow-up is timed from the date of this exam.`,
    s && 'S: manage the significant finding as appropriate to it.',
  )
}

function warnings(values: Values, result: Assessment | undefined): string[] {
  const out: string[] = []
  const round = str(values, 'round')
  const comparison = str(values, 'comparison')
  const when = timepoint(values)
  const long = num(values, 'long')
  const short = num(values, 'short')
  const mean = meanDiameter(values)
  const solid = num(values, 'solid')
  const change = growth(values)

  if (hasNodule(values)) {
    if (round === 'baseline' && when && when !== 'baseline') out.push(`Baseline screen, but the nodule is marked ${when}. New, growing and stable need a prior screen.`)
    if (comparison === 'none' && when && when !== 'baseline') out.push(`No prior CT, but the nodule is marked ${when}.`)
    if (round === 'annual' && comparison === 'available' && when === 'baseline') out.push('Annual screen with a prior compared, but the nodule is marked baseline. Baseline thresholds are for the first screen; use new, growing or stable.')
    if (long !== undefined && short !== undefined && short > long) out.push('Short axis is longer than the long axis.')
    if (noduleType(values) === 'partSolid' && solid !== undefined && mean !== undefined && solid > mean) out.push('Solid component is larger than the whole nodule.')
    if (change?.grew === true && when === 'stable') out.push(`Mean diameter rose ${mm(change.change)} mm within 12 months: that is growth (> 1.5 mm), but the nodule is marked stable.`)
    if (change?.grew === false && when === 'growing' && !slowGrowth(values)) out.push(`Mean diameter rose ${mm(change.change)} mm within 12 months: not growth by the > 1.5 mm rule. If it has crept up over several screens, mark slow growth.`)
    if (change?.grew === undefined && change && change.change > 1.5) out.push('The interval is over 12 months, so check each 12-month interval for > 1.5 mm growth.')
  }
  if (infectious(values) && hasNodule(values) && ['solid', 'partSolid'].includes(noduleType(values))) {
    out.push('Infectious findings make this Lung-RADS 0. A new solid or part-solid nodule that looks more like cancer than infection and meets 4B size may be classified 4B instead (note 10b).')
  }
  return [...out, ...guidelineChecks(values, result)]
}

function build(values: Values) {
  const result = assess(values)
  const text = lines(
    examLine(values),
    comparisonLine(values),
    lungsLine(values),
    nodulesLine(values),
    dominantLine(values),
    infectionLine(values),
    otherLines(values),
    impression(values, result),
  )
  return { text, warnings: warnings(values, result) }
}

/* Step-level rule chips. */

function deriveExam(values: Values): Derived[] {
  const out: Derived[] = []
  if (str(values, 'comparison') === 'pending') out.push({ label: 'Waiting on a prior', value: 'Lung-RADS 0 (temporary)', tone: 'warn' })
  if (str(values, 'evaluable') === 'no') out.push({ label: 'Lungs not fully evaluable', value: 'Lung-RADS 0', tone: 'warn' })
  return out
}

function deriveLungs(values: Values): Derived[] {
  const out: Derived[] = []
  const nodules = str(values, 'nodules')
  if (infectious(values)) out.push({ label: 'Infectious or inflammatory', value: 'Lung-RADS 0: 1–3 month LDCT', tone: 'warn' })
  else if (nodules === 'none' || nodules === 'benign') out.push({ label: nodules === 'none' ? 'No nodules' : 'Benign features', value: 'Lung-RADS 1', tone: 'good' })
  return out
}

function deriveNodule(values: Values): Derived[] {
  if (!hasNodule(values)) return []
  const out: Derived[] = []
  const mean = meanDiameter(values)
  if (noduleType(values) === 'solid' && str(values, 'juxtapleural') === 'yes') {
    out.push(mean !== undefined && mean >= 10
      ? { label: 'Juxtapleural rule', value: 'Not met: 10 mm or more', tone: 'warn' }
      : { label: 'Juxtapleural rule', value: 'Category 2 if < 10 mm, baseline or new', tone: 'good' })
  }
  return out
}

function deriveMeasure(values: Values): Derived[] {
  const out: Derived[] = []
  const mean = meanDiameter(values)
  if (mean !== undefined) out.push({ label: 'Mean diameter', value: `${mm(mean)} mm` })
  const solid = num(values, 'solid')
  if (noduleType(values) === 'partSolid' && solid !== undefined) out.push({ label: 'Solid component', value: `${mm(solid)} mm` })
  return out
}

function deriveCompare(values: Values): Derived[] {
  const out: Derived[] = []
  const change = growth(values)
  if (change) {
    if (change.grew === true) out.push({ label: `Change +${mm(change.change)} mm`, value: 'Growth (> 1.5 mm in ≤ 12 months)', tone: 'warn' })
    else if (change.grew === false) out.push({ label: `Change ${change.change >= 0 ? '+' : ''}${mm(change.change)} mm`, value: 'Not growth by definition', tone: 'good' })
    else out.push({ label: `Change +${mm(change.change)} mm`, value: 'Over more than 12 months', tone: 'neutral' })
  }
  if (slowGrowth(values)) {
    out.push(noduleType(values) === 'groundGlass'
      ? { label: 'Slow-growing GGN', value: 'May stay category 2', tone: 'neutral' }
      : { label: 'Slow-growing solid/part-solid', value: 'Lung-RADS 4B', tone: 'warn' })
  }
  const prior = str(values, 'prior-cat')
  if (timepoint(values) === 'stable' && prior === '3') out.push({ label: 'Stepped management', value: '3 stable at 6 months → 2', tone: 'good' })
  if (timepoint(values) === 'stable' && prior === '4A') out.push({ label: 'Stepped management', value: '4A stable at 3 months → 3', tone: 'neutral' })
  if (timepoint(values) === 'stable' && prior === '4B') out.push({ label: 'Stepped management', value: '4B → 2 only if proven benign', tone: 'warn' })
  return out
}

function deriveCategory(values: Values): Derived[] {
  const result = assess(values)
  if (!result) return []
  const tone = result.category.includes('4') ? 'warn' : result.category.includes('3') || result.category.includes('0') ? 'neutral' : 'good'
  const s = str(values, 's') === 'present'
  return [{ label: 'Category', value: `${result.category}${s ? ' S' : ''}`, tone }]
}

/* The lesson, section by section. */

const learn: StudyDefinition['learn'] = [
  {
    id: 'big-idea',
    title: 'The big idea',
    body: (
      <>
        <p>A screening CT answers one question: <strong>does this person go back to annual screening, or do they need something sooner?</strong> Lung-RADS turns that into a single category for the whole exam, coded on the one nodule with the highest degree of suspicion, with a management line attached to each category (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>
        <p>Why it matters: in the NLST, 53,454 people at high risk were randomized to three annual low-dose CTs or chest radiographs. Low-dose CT cut lung-cancer deaths by 20.0% (<Cite doi={NLST}>NLST, NEJM 2011</Cite>). In NELSON, the 10-year rate ratio for lung-cancer death in screened men was 0.76 (<Cite doi={NELSON}>de Koning et al., NEJM 2020</Cite>). The USPSTF now recommends annual LDCT from age 50 to 80 for people with a 20 pack-year history who smoke or quit within the past 15 years (<Cite doi={USPSTF}>USPSTF, JAMA 2021</Cite>).</p>
        <p>The cost of screening is false positives. In the NLST, 24.2% of CT screens were positive and 96.4% of those were false positives, using any noncalcified nodule of 4 mm or more as positive (<Cite doi={NLST}>NLST, NEJM 2011</Cite>). Applied back to the NLST, Lung-RADS cut the baseline false-positive rate from 26.6% to 12.8%, at the price of a lower baseline sensitivity (84.9% versus 93.5%) (<Cite doi={PINSKY}>Pinsky et al., Ann Intern Med 2015</Cite>).</p>
        <div className="lesson-key">
          <p>Categories 1 and 2 are a negative screen; categories 3 and 4 are a positive screen. A negative screen does not mean the person does not have lung cancer (note 3).</p>
        </div>
      </>
    ),
  },
  {
    id: 'images',
    title: 'Technique: which images to trust',
    body: (
      <>
        <p>This is a low-dose exam. NLST scans used multidetector scanners with at least four channels, at an average effective dose of 1.5 mSv, against roughly 8 mSv for a diagnostic chest CT (<Cite doi={NLST}>NLST, NEJM 2011</Cite>). The technical standard for the exam is the ACR–STR practice parameter (<Cite doi={PRACTICE}>Kazerooni et al., J Thorac Imaging 2014</Cite>); follow your department's protocol.</p>
        <p>Two technique rules are part of Lung-RADS itself:</p>
        <ul className="plain-list">
          <li><strong>Coverage.</strong> If part or all of the lungs cannot be evaluated, the exam is Lung-RADS 0 and needs additional screening CT imaging.</li>
          <li><strong>Measurement.</strong> Measure the long and short axis to one decimal point in mm and report the mean to one decimal point. The two axes may be in any plane, whichever shows the true size of the nodule. Volumes, if you have them, go to the nearest whole mm³ (note 4).</li>
        </ul>
        <div className="lesson-key">
          <p>Always look for the prior. If a prior screening or diagnostic CT is being located, the exam is Lung-RADS 0, and that category is temporary until the comparison arrives and a new one is assigned (note 9).</p>
        </div>
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Step-by-step search pattern',
    body: (
      <>
        <p>Every step below feeds one decision: the category of the most suspicious finding.</p>

        <div className="lesson-step">
          <h4>Step 1. Before you read: round, comparison, coverage</h4>
          <ul className="plain-list">
            <li>Is this the baseline (first) screen or a later annual screen? Baseline thresholds apply only to the first screen.</li>
            <li>Find the prior CT. Waiting on it: Lung-RADS 0, temporary (note 9).</li>
            <li>Are both lungs fully covered and readable? If not: Lung-RADS 0, additional imaging.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Survey the lungs</h4>
          <ul className="plain-list">
            <li>No nodules, or only nodules with benign features (complete, central, popcorn or concentric ring calcification, or fat): Lung-RADS 1.</li>
            <li>Look for a pattern that suggests infection or inflammation: segmental or lobar consolidation, more than six new nodules, a large solid nodule (≥ 8 mm) appearing in a short interval, or new nodules in a context such as immunocompromise. These may be Lung-RADS 0 with a 1–3 month LDCT, and at that follow-up you assign a new category from the most suspicious nodule (note 10a).</li>
            <li>Tree-in-bud nodules or new ground-glass nodules under 3 cm may not warrant short-term follow-up (note 10c).</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Pick the dominant nodule and name its type</h4>
          <ul className="plain-list">
            <li>Solid, part-solid, nonsolid (ground glass), or airway. The exam is coded on the nodule with the highest degree of suspicion (note 1).</li>
            <li><strong>Juxtapleural nodules</strong> (perifissural, costal pleural, perimediastinal, peridiaphragmatic) that are solid, smooth, and oval, lentiform or triangular are category 2 if under 10 mm mean diameter at baseline or when new.</li>
            <li><strong>Airway nodules</strong>: subsegmental ones are category 2; segmental or more proximal ones are 4A at baseline or when new, and 4B if they persist at 3-month follow-up (note 11). Air inside a segmental abnormality favors secretions: with no soft-tissue nodule under it, it may be category 2 (note 11c).</li>
            <li><strong>Cysts</strong>: a thin-walled unilocular cyst (uniform wall under 2 mm) is benign and not classified. A thick-walled (2 mm or more) or multilocular cyst is an atypical cyst, managed by its own rules (note 12). A cavitary nodule, where the wall is the dominant feature, is measured and managed as a solid nodule.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Measure it</h4>
          <p>Long and short axis to one decimal, mean to one decimal (note 4). For a part-solid nodule, measure the whole nodule and the solid component: the solid component drives the category.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Compare: baseline, new, growing, or stable</h4>
          <ul className="plain-list">
            <li><strong>Growth</strong> is an increase in mean diameter of more than 1.5 mm within a 12-month interval (note 6).</li>
            <li>Size thresholds apply at first detection and whenever a nodule enlarges into a higher size band. A nodule that crosses a threshold is reclassified by size even if it does not meet the growth definition (note 5).</li>
            <li>A solid or part-solid nodule that grows over several screens but never by more than 1.5 mm in any 12 months is suspicious and may be 4B. It may not be PET-avid, so biopsy or surgical evaluation may be best (note 8). A ground-glass nodule growing that slowly may stay category 2 until it develops a solid component (note 7).</li>
            <li><strong>Stepped management</strong>: a category 3 lesion stable or smaller at the 6-month CT becomes category 2; a 4A lesion stable or smaller at the 3-month CT becomes category 3 (airway nodules excepted). A 4B lesion proven benign after workup becomes category 2.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Suspicious features, other findings, and the category</h4>
          <ul className="plain-list">
            <li>A category 3 or 4 nodule with extra features that raise suspicion, such as spiculation, lymphadenopathy, frank metastatic disease, or a ground-glass nodule that doubles in size in a year, is <strong>4X</strong>. 4X is a category, not a modifier (note 14).</li>
            <li>Add the <strong>S modifier</strong> to categories 0–4 for a clinically significant or potentially significant finding unrelated to lung cancer. Findings already known and under evaluation do not need it (note 15).</li>
            <li>Time the follow-up from the date of the exam you are reading (note 2).</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'categories',
    title: 'The categories and their management',
    body: (
      <>
        <p>The Lung-RADS v2022 table, condensed. Sizes are mean diameters (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Category</th><th>Findings</th><th>Management</th><th>Prevalence</th></tr></thead>
            <tbody>
              <tr><td>0 Incomplete</td><td>Prior CT being located; part or all of the lungs cannot be evaluated; findings suggesting an infectious or inflammatory process</td><td>Comparison to prior; additional screening CT; 1–3 month LDCT</td><td>~1%</td></tr>
              <tr><td>1 Negative</td><td>No nodules; nodules with benign calcification or fat</td><td>12-month screening LDCT</td><td>39%</td></tr>
              <tr><td>2 Benign</td><td>Juxtapleural &lt; 10 mm (baseline or new, benign shape); solid &lt; 6 mm at baseline or new &lt; 4 mm; part-solid &lt; 6 mm total at baseline; nonsolid &lt; 30 mm (baseline, new or growing) or ≥ 30 mm stable or slowly growing; subsegmental airway nodule (baseline, new or stable); category 3 stable at 6 months; 4B proven benign</td><td>12-month screening LDCT</td><td>45%</td></tr>
              <tr><td>3 Probably benign</td><td>Solid 6 to &lt; 8 mm at baseline or new 4 to &lt; 6 mm; part-solid ≥ 6 mm total with solid part &lt; 6 mm at baseline, or new &lt; 6 mm total; nonsolid ≥ 30 mm at baseline or new; thick-walled cyst with a growing cystic component; 4A stable at 3 months (not airway)</td><td>6-month LDCT</td><td>9%</td></tr>
              <tr><td>4A Suspicious</td><td>Solid 8 to &lt; 15 mm at baseline, growing &lt; 8 mm, or new 6 to &lt; 8 mm; part-solid ≥ 6 mm total with solid part 6 to &lt; 8 mm at baseline, or new or growing solid part &lt; 4 mm; segmental or more proximal airway nodule at baseline or new; thick-walled or multilocular cyst at baseline, or a cyst that becomes multilocular</td><td>3-month LDCT; PET/CT may be considered if there is a ≥ 8 mm solid nodule or solid component</td><td>4%</td></tr>
              <tr><td>4B Very suspicious</td><td>Solid ≥ 15 mm at baseline, or new or growing ≥ 8 mm; part-solid with solid part ≥ 8 mm at baseline, or new or growing solid part ≥ 4 mm; segmental airway nodule stable or growing; atypical cyst with growing wall or nodularity, or increased loculation or new opacity; slow-growing solid or part-solid nodule</td><td>Diagnostic chest CT with or without contrast; PET/CT may be considered if there is a ≥ 8 mm solid nodule or solid component; tissue sampling; and/or referral. Depends on clinical evaluation, patient preference and probability of malignancy</td><td>2%</td></tr>
              <tr><td>4X</td><td>Category 3 or 4 nodule with features that increase suspicion</td><td>As 4B</td><td>&lt; 1%</td></tr>
              <tr><td>S (modifier)</td><td>Significant finding unrelated to lung cancer</td><td>As appropriate to the finding</td><td>10%</td></tr>
            </tbody>
          </table>
        </div>
        <p>For 4B, the table asks you to weigh comorbidities, patient preference and the risk of malignancy, and encourages the McWilliams (Brock) assessment tool (note 13). That model's predictors are older age, female sex, family history, emphysema, larger size, upper lobe, part-solid type, fewer nodules, and spiculation (<Cite doi={BROCK}>McWilliams et al., NEJM 2013</Cite>).</p>
        <p>v2022 did not change the solid or subsolid size thresholds; it added the rules for atypical cysts, juxtapleural and airway nodules, and infectious findings, clarified growth and the S modifier, and introduced stepped management (<Cite doi={RCNA}>Agrawal et al., Radiol Clin North Am 2025</Cite>).</p>
        <p>Once lung cancer is diagnosed, further imaging is staging, not screening (note 16).</p>
      </>
    ),
  },
  {
    id: 'report',
    title: 'What the report must contain',
    body: (
      <>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Every screening report ends with one category for the exam, coded on the most suspicious nodule, and the management that goes with it, timed from the date of this exam. Give the dominant nodule's two axes and mean to one decimal, its type, and how it compares with the prior.</p>
        </div>
      </>
    ),
  },
  {
    id: 'pitfalls',
    title: 'Pitfalls and mimics',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>Perifissural nodules.</strong> In NELSON, 19.7% of baseline nodules were perifissural and none turned out to be malignant, even though 15.5% grew before the first follow-up (<Cite doi={PFN}>de Hoop et al., Radiology 2012</Cite>). Growth alone does not make one suspicious; that is why v2022 calls a smooth, lentiform juxtapleural solid nodule under 10 mm category 2.</li>
          <li><strong>Overusing category 0 for infection.</strong> Among 11,348 screening exams read with v2022, category 0 for suspected infection was used in 0.8%, and none of those exams were malignant. The most common findings behind it were ground-glass nodules or opacities (43%) and tree-in-bud nodules (13%), for which v2022 says short-term follow-up may not be warranted (<Cite doi={INFECTION}>Arora et al., AJR 2025</Cite>).</li>
          <li><strong>Calling growth on measurement noise.</strong> Growth needs more than 1.5 mm in mean diameter within 12 months. Anything less is not growth, unless a solid or part-solid nodule creeps up across several screens (then consider 4B, note 8).</li>
          <li><strong>Secretions in an airway.</strong> Air within a segmental abnormality, with no soft-tissue nodule under it, favors secretions. Multiple tubular subsegmental abnormalities favor infection (note 11).</li>
          <li><strong>Using X as a modifier.</strong> 4X is its own category; S is the only modifier.</li>
          <li><strong>S for known findings.</strong> A finding already known and under evaluation does not need S; an unexpected worrying change in it does (note 15b).</li>
          <li><strong>Multiple cysts.</strong> They may point to another diagnosis, such as Langerhans cell histiocytosis or lymphangioleiomyomatosis, and are not classified in Lung-RADS unless other concerning features are present (note 12h). Fluid-filled cysts may be infectious and are not classified either (note 12g).</li>
          <li><strong>What Lung-RADS misses.</strong> In the NLST, the cancers the original Lung-RADS would have missed were, at baseline, solid or part-solid nodules under 6 mm or ground-glass nodules under 20 mm (the v1.0 threshold; it is now 30 mm), and after baseline, ground-glass nodules under 20 mm or preexisting solid nodules that were not growing (<Cite doi={PINSKY}>Pinsky et al., Ann Intern Med 2015</Cite>). A negative screen is not a clean bill of health.</li>
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
          <li><strong>Christensen et al., JACR 2024.</strong> The committee's own account of v2022 and the evidence behind each change. <Cite doi={LUNGRADS}>doi:{LUNGRADS}</Cite></li>
          <li><strong>Martin et al., RadioGraphics 2017.</strong> Fifteen screening scenarios where the rules are unclear, with the authors' recommendations. <Cite doi={LIMITS}>doi:{LIMITS}</Cite></li>
          <li><strong>Martin et al., RadioGraphics 2023.</strong> The update to that article for v2022. <Cite doi={UPDATE}>doi:{UPDATE}</Cite></li>
          <li><strong>Agrawal et al., Radiol Clin North Am 2025.</strong> A review of the v2022 changes. <Cite doi={RCNA}>doi:{RCNA}</Cite></li>
          <li><strong>McWilliams et al., NEJM 2013.</strong> The Brock model the 4B note recommends. <Cite doi={BROCK}>doi:{BROCK}</Cite></li>
        </ul>
      </>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'lung-screening-ct',
  name: 'Lung screening CT (Lung-RADS)',
  lede: 'Read a screening LDCT step by step: comparison, nodule type, mean diameter, growth, the Lung-RADS category and its management.',
  sourceNote: 'Draft lesson compiled from the ACR Lung-RADS v2022 table and notes (November 2022) and the papers below; citations checked against PubMed in September 2026. Not yet reviewed by the site author.',
  references,
  referencesNote: 'Note numbers in the lesson ("note 6") are the numbered notes under the ACR Lung-RADS v2022 table.',
  report: {
    steps: [
      {
        id: 'exam',
        title: 'Step 1. Before you read: round, comparison, coverage',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>Baseline thresholds apply only to the first screen.</li>
              <li>If a prior screening or diagnostic CT is being located, the exam is Lung-RADS 0, and that category is temporary until the comparison arrives (note 9).</li>
              <li>If part or all of the lungs cannot be evaluated, the exam is Lung-RADS 0 and needs additional screening CT imaging.</li>
            </ul>
            <p>The rules are the ACR Lung-RADS v2022 table (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>
          </>
        ),
        fields: [fields.round, fields.comparison, fields.priorDate, fields.evaluable, fields.limitation],
        derive: deriveExam,
      },
      {
        id: 'lungs',
        title: 'Step 2. Survey the lungs',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>No nodules, or only nodules with complete, central, popcorn or concentric ring calcification, or fat: Lung-RADS 1.</li>
              <li>Segmental or lobar consolidation, more than six new nodules, a large solid nodule (≥ 8 mm) appearing in a short interval, or new nodules in a context such as immunocompromise: Lung-RADS 0 with a 1–3 month LDCT may be recommended (note 10a).</li>
              <li>Tree-in-bud nodules or new ground-glass nodules under 3 cm may not warrant short-term follow-up (note 10c).</li>
            </ul>
            <p>In one series, none of the exams given category 0 for infection were malignant, and many were ground-glass or tree-in-bud findings for which v2022 says short-term follow-up may not be warranted (<Cite doi={INFECTION}>Arora et al., AJR 2025</Cite>).</p>
          </>
        ),
        fields: [fields.nodules, fields.benign, fields.infection, fields.infectionText],
        derive: deriveLungs,
      },
      {
        id: 'nodule',
        title: 'Step 3. Pick the dominant nodule and name its type',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>Code the exam on the nodule with the highest degree of suspicion (note 1).</li>
              <li>Juxtapleural nodules that are solid, smooth, and oval, lentiform or triangular are category 2 if under 10 mm at baseline or new. In NELSON none of 794 perifissural nodules were malignant (<Cite doi={PFN}>de Hoop et al., Radiology 2012</Cite>).</li>
              <li>Airway nodules: subsegmental ones are category 2; segmental or more proximal ones are 4A at baseline or new, and 4B if they persist at 3 months. Air inside a segmental abnormality favors secretions (note 11).</li>
              <li>A thin-walled cyst (wall under 2 mm) is not classified. Thick-walled or multilocular cysts follow the atypical-cyst rules (note 12), which this form does not cover.</li>
            </ul>
          </>
        ),
        fields: [fields.type, fields.location, fields.juxtapleural, fields.airwayLevel, fields.airwayAir],
        derive: deriveNodule,
      },
      {
        id: 'measure',
        title: 'Step 4. Measure it',
        learn: 'search-pattern',
        teach: (
          <p>Measure both the long and short axis to one decimal point in mm, in whichever plane shows the true size, and report the mean to one decimal point (note 4). For a part-solid nodule the solid component drives the category: 6 and 8 mm at baseline, 4 mm when new or growing.</p>
        ),
        fields: [fields.long, fields.short, fields.solid],
        derive: deriveMeasure,
      },
      {
        id: 'compare',
        title: 'Step 5. Compare: baseline, new, growing, or stable',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>Growth is an increase in mean diameter of more than 1.5 mm within 12 months (note 6).</li>
              <li>A nodule that enlarges into a higher size band is reclassified by size, even without meeting the growth definition (note 5).</li>
              <li>Slow growth across screens is suspicious for a solid or part-solid nodule (may be 4B, note 8), but a ground-glass nodule growing that slowly may stay category 2 (note 7).</li>
              <li>Stepped management: 3 stable at 6 months becomes 2; 4A stable at 3 months becomes 3.</li>
            </ul>
          </>
        ),
        fields: [fields.timepoint, fields.priorMean, fields.interval, fields.slow, fields.priorCat],
        derive: deriveCompare,
      },
      {
        id: 'category',
        title: 'Step 6. Suspicious features, other findings, and the category',
        learn: 'categories',
        teach: (
          <>
            <ul className="plain-list">
              <li>A category 3 or 4 nodule with spiculation, lymphadenopathy, frank metastatic disease, or a ground-glass nodule that doubles in size in a year is 4X, a category in its own right (note 14).</li>
              <li>Add S for a significant finding unrelated to lung cancer, but not for one already known and under evaluation (note 15).</li>
              <li>For 4B, the table suggests weighing the McWilliams (Brock) risk model (<Cite doi={BROCK}>McWilliams et al., NEJM 2013</Cite>).</li>
            </ul>
            <p>The nodule category comes from the site's Lung-RADS calculator, which applies the same v2022 table. Cases the table leaves to judgment are listed under "Check before signing".</p>
          </>
        ),
        fields: [fields.suspicious, fields.otherNodules, fields.s, fields.sText, fields.otherFindings],
        derive: deriveCategory,
      },
    ],
    build,
  },
  learn,
  quiz: [
    {
      id: 'mean-baseline',
      question: 'Baseline screen. A solid nodule measures 7.4 x 5.9 mm. What is the category?',
      options: ['Lung-RADS 2', 'Lung-RADS 3', 'Lung-RADS 4A', 'Lung-RADS 4B'],
      answer: 1,
      explanation: <p>The mean is (7.4 + 5.9) / 2 = 6.65, reported as 6.7 mm. A baseline solid nodule of 6 to under 8 mm is category 3, with a 6-month LDCT. Report the mean to one decimal, not the long axis (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>,
    },
    {
      id: 'growth',
      question: 'How does Lung-RADS v2022 define nodule growth?',
      options: ['Any measurable increase since the last screen', 'An increase of 20% in long-axis diameter', 'An increase in mean diameter of more than 1.5 mm within 12 months', 'A volume doubling time under 400 days'],
      answer: 2,
      explanation: <p>Growth is an increase in mean diameter of more than 1.5 mm within a 12-month interval (note 6). Slow growth that never meets this in any 12 months is handled separately: suspicious for solid and part-solid nodules, often still category 2 for ground glass (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>,
    },
    {
      id: 'new-solid',
      question: 'Annual screen. A new solid nodule has a mean diameter of 4.5 mm. What is the category?',
      options: ['Lung-RADS 2', 'Lung-RADS 4A', 'Lung-RADS 4B', 'Lung-RADS 3'],
      answer: 3,
      explanation: <p>New solid nodules have lower thresholds than baseline ones: under 4 mm is 2, 4 to under 6 mm is 3, 6 to under 8 mm is 4A, and 8 mm or more is 4B (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>,
    },
    {
      id: 'juxtapleural',
      question: 'Baseline screen. An 8.0 mm mean solid nodule sits on the major fissure, with smooth margins and a lentiform shape. What is the category?',
      options: ['Lung-RADS 2', 'Lung-RADS 3', 'Lung-RADS 4A', 'Lung-RADS 0'],
      answer: 0,
      explanation: <p>A juxtapleural solid nodule under 10 mm at baseline or new, with smooth margins and an oval, lentiform or triangular shape, is category 2. In NELSON none of 794 perifissural nodules were malignant, although 15.5% grew (<Cite doi={PFN}>de Hoop et al., Radiology 2012</Cite>).</p>,
    },
    {
      id: 'stepped-4a',
      question: 'A 4A solid nodule is unchanged on its 3-month LDCT. What now?',
      options: ['Lung-RADS 2, annual screening', 'Lung-RADS 3, LDCT in 6 months', 'Lung-RADS 4A, another 3-month LDCT', 'Lung-RADS 4B, tissue sampling'],
      answer: 1,
      explanation: <p>Stepped management: a 4A lesion stable or smaller at the 3-month CT becomes category 3 (6-month LDCT), and a category 3 lesion stable at 6 months becomes category 2. Airway nodules are the exception: a segmental one that persists at 3 months becomes 4B (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>,
    },
    {
      id: 'infection',
      question: 'Which of these does v2022 say may NOT warrant Lung-RADS 0 with a short-term follow-up?',
      options: ['Segmental or lobar consolidation', 'More than six new nodules', 'Tree-in-bud nodules', 'A new solid nodule of 8 mm or more appearing in a short interval'],
      answer: 2,
      explanation: <p>Tree-in-bud nodules and new ground-glass nodules under 3 cm may not warrant short-term follow-up (note 10c). In practice, ground-glass and tree-in-bud findings were among the most common reasons for category 0, and none of those exams were malignant (<Cite doi={INFECTION}>Arora et al., AJR 2025</Cite>).</p>,
    },
    {
      id: 'slow-solid',
      question: 'A solid nodule has grown across four annual screens but never by more than 1.5 mm in any 12 months. How is it classified?',
      options: ['Lung-RADS 2: it does not meet the growth definition', 'Lung-RADS 3', 'Lung-RADS 4A', 'Lung-RADS 4B'],
      answer: 3,
      explanation: <p>A slow-growing solid or part-solid nodule is suspicious and may be classified 4B. It may not be PET-avid, so biopsy, if feasible, or surgical evaluation may be the most appropriate next step (note 8; <Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>).</p>,
    },
    {
      id: 'part-solid',
      question: 'Baseline screen. A part-solid nodule is 12 mm total mean diameter with a 7 mm solid component. What is the category?',
      options: ['Lung-RADS 4A', 'Lung-RADS 3', 'Lung-RADS 4B', 'Lung-RADS 2'],
      answer: 0,
      explanation: <p>For part-solid nodules at baseline the solid component drives the category: under 6 mm is 3, 6 to under 8 mm is 4A, and 8 mm or more is 4B (<Cite doi={LUNGRADS}>Christensen et al., JACR 2024</Cite>). Part-solid type is also one of the predictors of cancer in the Brock model (<Cite doi={BROCK}>McWilliams et al., NEJM 2013</Cite>).</p>,
    },
  ],
}

export function LungScreeningCtStudyPage() {
  return <StudyPage study={study} />
}
