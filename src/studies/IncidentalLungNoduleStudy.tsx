import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { assessFleischner, initialFleischnerForm, roundMm } from '../logic/fleischner'
import type { FleischnerForm, FleischnerResult, NoduleType } from '../logic/fleischner'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const MACMAHON = '10.1148/radiol.2017161659'
const BANKIER = '10.1148/radiol.2017162894'
const BUENO = '10.1148/rg.2018180017'

const references: LessonReference[] = [
  { citation: 'MacMahon H et al. Guidelines for management of incidental pulmonary nodules detected on CT images: from the Fleischner Society 2017. Radiology 2017;284:228–243. (The rulebook: the table, the reasoning behind each row, and the exclusions.)', doi: MACMAHON },
  { citation: 'Bankier AA et al. Recommendations for measuring pulmonary nodules at CT: a statement from the Fleischner Society. Radiology 2017;285:584–600. (How to measure, and what counts as growth.)', doi: BANKIER },
  { citation: 'Bueno J, Landeras L, Chung JH. Updated Fleischner Society guidelines for managing incidental pulmonary nodules: common questions and challenging scenarios. RadioGraphics 2018;38:1337–1350. (Eight worked scenarios with images.)', doi: BUENO },
]

const reportTemplate = `Technique: [complete chest / partial (abdomen, neck, cardiac)] CT;
  thinnest sections __ mm; comparison: [earliest prior, date / none]
Nodule: [single / multiple] [solid / pure ground-glass / part-solid];
  location __ (series __, image __)
Size: __ × __ mm (mean __ mm, rounded to the nearest mm);
  solid component __ mm (part-solid)
Morphology: [smooth / lobulated / spiculated / cystic components];
  benign features [calcification pattern / fat / typical lymph node]
Change: [new / stable since __ / grown from __ to __ mm / smaller]
Risk: [low / high] (solid nodules only)
Impression: [type] nodule, __ mm. Per Fleischner Society 2017
  recommendations, [management]. (Or: outside the scope of the
  guideline because [screening / under 35 / immunocompromised / cancer].)`

/* Option sets, shared by the fields and the report wording. */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const settingField = {
  options: [
    { value: 'incidental', label: 'Incidental (any other indication)' },
    { value: 'screening', label: 'Lung cancer screening' },
  ],
}

const ageField = {
  options: [
    { value: 'yes', label: '35 or older' },
    { value: 'no', label: 'Under 35' },
  ],
}

const coverageField = {
  options: [
    { value: 'complete', label: 'Complete chest CT' },
    { value: 'partial', label: 'Partial (abdomen, neck, cardiac)' },
  ],
}

const benignField = {
  options: [
    { value: 'calcified', label: 'Benign calcification (e.g. central, laminar)' },
    { value: 'fat', label: 'Macroscopic fat (e.g. hamartoma)' },
    { value: 'lymph-node', label: 'Typical intrapulmonary lymph node (perifissural)' },
  ],
}

const typeField = {
  options: [
    { value: 'solid', label: 'Solid' },
    { value: 'groundGlass', label: 'Pure ground glass' },
    { value: 'partSolid', label: 'Part solid' },
  ],
}

const countField = {
  options: [
    { value: 'single', label: 'Single' },
    { value: 'multiple', label: 'Multiple' },
  ],
}

const featureField = {
  options: [
    { value: 'spiculated', label: 'Spiculated' },
    { value: 'lobulated', label: 'Lobulated' },
    { value: 'cystic', label: 'Cystic components or bubbly lucencies' },
    { value: 'fissure', label: 'Displaces the adjacent fissure' },
  ],
}

const priorField = {
  options: [
    { value: 'none', label: 'No prior imaging' },
    { value: 'new', label: 'New since prior' },
    { value: 'stable', label: 'Stable' },
    { value: 'grown', label: 'Grown' },
    { value: 'smaller', label: 'Smaller or resolved' },
  ],
}

const riskField = {
  options: [
    { value: 'low', label: 'Low (<5%)' },
    { value: 'high', label: 'High (5% or more)' },
  ],
}

const riskFactorField = {
  options: [
    { value: 'smoking', label: 'Smoking: 30 pack-years or more, current or quit within 15 years' },
    { value: 'carcinogen', label: 'Asbestos, uranium or radon exposure' },
    { value: 'family', label: 'Family history of lung cancer' },
    { value: 'older', label: 'Older age' },
    { value: 'upper', label: 'Upper lobe location' },
    { value: 'emphysema', label: 'Emphysema' },
    { value: 'fibrosis', label: 'Pulmonary fibrosis' },
  ],
}

/* Rules the guideline states. */

/** Table 1 footnote: "Dimensions are average of long and short axes, rounded to the nearest millimeter." */
function meanDiameter(values: Values): number | undefined {
  const long = num(values, 'long')
  const short = num(values, 'short')
  if (long === undefined || short === undefined) return undefined
  return roundMm((long + short) / 2)
}

/** "Measurements should be expressed to the nearest whole millimeter" (Bankier, via Bueno). */
function solidComponent(values: Values): number | undefined {
  const solid = num(values, 'solid')
  return solid === undefined ? undefined : roundMm(solid)
}

function isPartSolidSingle(values: Values): boolean {
  return str(values, 'type') === 'partSolid' && str(values, 'count') === 'single'
}

/**
 * Scope: "at least 35 years old"; "not intended for use in patients with known primary cancers
 * ... nor ... in immunocompromised patients"; screening follows Lung-RADS.
 */
function exclusions(values: Values): string[] {
  const out: string[] = []
  if (str(values, 'setting') === 'screening') out.push('lung cancer screening CT')
  if (str(values, 'age35') === 'no') out.push('patient under 35')
  if (str(values, 'immuno') === 'yes') out.push('immunocompromised')
  if (str(values, 'cancer') === 'yes') out.push('known primary cancer')
  return out
}

function hasBenignFeature(values: Values): boolean {
  const benign = list(values, 'benign')
  return benign.includes('calcified') || benign.includes('fat')
}

function isLymphNode(values: Values): boolean {
  return list(values, 'benign').includes('lymph-node')
}

/**
 * "A spiculated border, displacement of the adjacent fissure, or a history of cancer increase the
 * possibility of malignancy, and a follow-up examination in 6–12 months should be considered."
 */
function atypicalLymphNode(values: Values): boolean {
  const features = list(values, 'features')
  return isLymphNode(values) && (features.includes('spiculated') || features.includes('fissure'))
}

/** Perifissural with lymph node morphology and none of the features that undo it. */
function typicalLymphNode(values: Values): boolean {
  return isLymphNode(values) && !atypicalLymphNode(values)
}

/** Excluded or benign: the guideline answers without a size. */
function shortCircuit(values: Values): boolean {
  return exclusions(values).length > 0 || hasBenignFeature(values) || typicalLymphNode(values)
}

/**
 * The shared Fleischner calculator applied to this form. Undefined until the inputs it needs
 * are in, so a missing risk category never defaults silently to low risk.
 */
function assessment(values: Values): FleischnerResult | undefined {
  const form: FleischnerForm = {
    ...initialFleischnerForm,
    screeningExam: str(values, 'setting') === 'screening',
    ageUnder35: str(values, 'age35') === 'no',
    immunosuppressed: str(values, 'immuno') === 'yes',
    knownPrimaryCancer: str(values, 'cancer') === 'yes',
    benignFeatures: hasBenignFeature(values),
    perifissural: typicalLymphNode(values),
  }
  if (shortCircuit(values)) return assessFleischner(form)
  const type = str(values, 'type')
  const count = str(values, 'count')
  const risk = str(values, 'risk')
  const mean = meanDiameter(values)
  if (!type || !count || mean === undefined) return undefined
  if (type === 'solid' && !risk) return undefined
  const solid = solidComponent(values)
  const long = num(values, 'long')
  return assessFleischner({
    ...form,
    noduleType: type as NoduleType,
    count: count === 'multiple' ? 'multiple' : 'single',
    risk: risk === 'high' ? 'high' : 'low',
    sizeMm: String(mean),
    solidComponentMm: solid === undefined ? '' : String(solid),
    longAxisMm: long === undefined ? '' : String(long),
  })
}

function isPending(result: FleischnerResult | undefined): boolean {
  return !result || result.impression === null
}

/** "All CT scans of the thorax ... contiguous thin sections (≤1.5 mm, typically 1.0 mm)." */
function thickSections(values: Values): boolean {
  const thickness = num(values, 'thickness')
  return thickness !== undefined && thickness > 1.5
}

/**
 * Incomplete thoracic CT: "<6 mm, we do not recommend any further investigation"; "6–8-mm ...
 * follow-up CT of the complete chest after an appropriate interval (3–12 months depending on
 * clinical risk)"; "large or very suspicious ... proceeding with a complete thoracic CT" (Bueno
 * reads "large" as larger than 8 mm).
 */
function partialCtAdvice(values: Values): string | undefined {
  if (str(values, 'coverage') !== 'partial' || shortCircuit(values)) return undefined
  const mean = meanDiameter(values)
  if (mean === undefined) return undefined
  if (mean < 6) return 'No further investigation for a nodule under 6 mm.'
  if (mean <= 8) return 'Follow-up CT of the complete chest at 3–12 months, depending on clinical risk, unless a prior study shows stability.'
  return 'Proceed with a complete thoracic CT.'
}

function hasPriorSize(values: Values): boolean {
  return ['stable', 'grown', 'smaller'].includes(str(values, 'prior'))
}

/** Change in mean diameter since the prior, in whole millimetres. */
function sizeChange(values: Values): number | undefined {
  const mean = meanDiameter(values)
  const prior = num(values, 'prior-size')
  if (mean === undefined || prior === undefined || !hasPriorSize(values)) return undefined
  return mean - Math.round(prior)
}

/** The Fleischner measurement statement's growth threshold: 2 mm (Bankier, via Bueno). */
function hasGrown(change: number | undefined): boolean {
  return change !== undefined && change >= 2
}

/**
 * "We recommend optionally discontinuing follow-up of well-defined solid nodules with benign
 * morphology at 12–18 months if the nodule is accurately measurable and unequivocally stable."
 */
function mayStopFollowUp(values: Values): boolean {
  const months = num(values, 'prior-months')
  const features = list(values, 'features')
  return (
    str(values, 'type') === 'solid' &&
    str(values, 'prior') === 'stable' &&
    months !== undefined &&
    months >= 12 &&
    !thickSections(values) &&
    !features.includes('spiculated') &&
    !features.includes('lobulated') &&
    !hasGrown(sizeChange(values))
  )
}

/** Risk factors present, as labels, for the low-risk contradiction check (Table 1: "Consider all relevant risk factors"). */
function highRiskSigns(values: Values): string[] {
  const factors = list(values, 'risk-factors').map((factor) => optionLabel(riskFactorField, factor).toLowerCase())
  if (list(values, 'features').includes('spiculated')) factors.push('spiculated margin')
  return factors
}

/* Fields. Declared once so the report can read their labels. */

const fields = {
  setting: { id: 'setting', kind: 'choice', label: 'Why was the CT done?', ...settingField, required: true },
  age: { id: 'age35', kind: 'choice', label: 'Patient age', ...ageField, required: true },
  immuno: { id: 'immuno', kind: 'choice', label: 'Immunocompromised?', options: yesNo, required: true },
  cancer: { id: 'cancer', kind: 'choice', label: 'Known primary cancer?', options: yesNo, required: true },
  coverage: { id: 'coverage', kind: 'choice', label: 'Lung coverage', ...coverageField, required: true },
  thickness: { id: 'thickness', kind: 'number', label: 'Thinnest sections available', unit: 'mm', min: 0, step: 0.1, required: true, help: '1.5 mm or less (typically 1.0 mm) to characterize and measure.' },
  benign: { id: 'benign', kind: 'multi', label: 'Benign features', ...benignField, help: 'Check calcium and fat on thin non-sharpened (soft-tissue) images.' },
  type: { id: 'type', kind: 'choice', label: 'Nodule type', ...typeField, required: true, help: 'Subsolid if part of it disappears on soft-tissue windows.' },
  count: { id: 'count', kind: 'choice', label: 'Number of nodules', ...countField, required: true },
  location: { id: 'location', kind: 'text', label: 'Location', placeholder: 'e.g. right upper lobe, series 4 image 112' },
  features: { id: 'features', kind: 'multi', label: 'Morphology', ...featureField },
  long: { id: 'long', kind: 'number', label: 'Long axis (largest nodule if several)', unit: 'mm', min: 0, required: true, help: 'On the axial, coronal or sagittal image where it is largest, lung window.' },
  short: { id: 'short', kind: 'number', label: 'Short axis, same image', unit: 'mm', min: 0, required: true },
  solid: { id: 'solid', kind: 'number', label: 'Solid component, largest diameter', unit: 'mm', min: 0, required: true, showIf: isPartSolidSingle, help: 'Under 6 mm, 6–8 mm, or over 8 mm decides the row.' },
  dominant: { id: 'dominant', kind: 'text', label: 'Most suspicious nodule, if not the largest', placeholder: 'e.g. 5 mm spiculated left upper lobe nodule', showIf: (v) => str(v, 'count') === 'multiple' },
  prior: { id: 'prior', kind: 'choice', label: 'Compared with prior imaging', ...priorField, required: true },
  priorDate: { id: 'prior-date', kind: 'text', label: 'Earliest prior compared', placeholder: 'e.g. CT 12 March 2024', showIf: (v) => str(v, 'prior') !== '' && str(v, 'prior') !== 'none' },
  priorMonths: { id: 'prior-months', kind: 'number', label: 'Interval since that prior', unit: 'months', min: 0, showIf: hasPriorSize },
  priorSize: { id: 'prior-size', kind: 'number', label: 'Mean diameter then', unit: 'mm', min: 0, showIf: hasPriorSize, help: 'Growth is an increase of 2 mm or more.' },
  risk: { id: 'risk', kind: 'choice', label: 'Clinical risk (ACCP)', ...riskField, required: true, showIf: (v) => str(v, 'type') === 'solid', help: 'High combines the ACCP intermediate (5–65%) and high (>65%) groups.' },
  riskFactors: { id: 'risk-factors', kind: 'multi', label: 'Risk factors present', ...riskFactorField },
} satisfies Record<string, Field>

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function techniqueLine(values: Values): string {
  const coverage = str(values, 'coverage')
  const thickness = num(values, 'thickness')
  const prior = str(values, 'prior')
  const priorDate = str(values, 'prior-date')
  const comparison = prior === 'none' ? 'comparison: none' : prior && `comparison: ${priorDate || 'prior imaging'}`
  const body = join([
    coverage && optionLabel(coverageField, coverage),
    thickness !== undefined && `thinnest sections ${thickness} mm`,
    comparison,
  ])
  return body && `Technique: ${body}`
}

function noduleLine(values: Values): string {
  const type = str(values, 'type')
  const count = str(values, 'count')
  const location = str(values, 'location')
  const typeWord = type === 'groundGlass' ? 'pure ground-glass' : type === 'partSolid' ? 'part-solid' : type
  const what = count === 'multiple' ? `multiple ${typeWord ? `${typeWord} ` : ''}nodules` : typeWord ? `single ${typeWord} nodule` : ''
  const body = join([what, location && `location ${location}`])
  return body && `Nodule: ${body}`
}

function sizeLine(values: Values): string {
  const long = num(values, 'long')
  const short = num(values, 'short')
  const mean = meanDiameter(values)
  const solid = solidComponent(values)
  const dims = long !== undefined && short !== undefined ? `${long} × ${short} mm (mean ${mean} mm)` : long !== undefined ? `${long} mm long axis` : ''
  const body = join([
    dims && (str(values, 'count') === 'multiple' ? `largest ${dims}` : dims),
    solid !== undefined && str(values, 'type') === 'partSolid' && `solid component ${solid} mm`,
  ])
  return body && `Size: ${body}`
}

function morphologyLine(values: Values): string {
  const features = list(values, 'features').map((f) => optionLabel(featureField, f).toLowerCase())
  const benign = list(values, 'benign').map((b) => optionLabel(benignField, b).toLowerCase())
  const body = join([features.length > 0 && features.join(', '), benign.length > 0 && `benign features: ${benign.join(', ')}`])
  return body && `Morphology: ${body}`
}

function changeLine(values: Values): string {
  const prior = str(values, 'prior')
  if (!prior || prior === 'none') return ''
  const date = str(values, 'prior-date')
  const months = num(values, 'prior-months')
  const priorSize = num(values, 'prior-size')
  const mean = meanDiameter(values)
  const since = join([date && `since ${date}`, months !== undefined && `${months} months`], ', ')
  if (prior === 'new') return `Change: new${date ? ` since ${date}` : ''}`
  if (prior === 'stable') return `Change: stable${since ? ` (${since})` : ''}`
  const sizes = priorSize !== undefined && mean !== undefined ? ` from ${Math.round(priorSize)} to ${mean} mm` : ''
  return `Change: ${prior === 'grown' ? 'grown' : 'smaller'}${sizes}${since ? ` (${since})` : ''}`
}

function riskLine(values: Values): string {
  const risk = str(values, 'risk')
  const factors = list(values, 'risk-factors').map((f) => optionLabel(riskFactorField, f).toLowerCase())
  const body = join([risk && optionLabel(riskField, risk).toLowerCase(), factors.length > 0 && `risk factors: ${factors.join(', ')}`])
  return body && `Risk: ${body}`
}

function impression(values: Values): string {
  const result = assessment(values)
  if (!result || result.impression === null) return ''
  const partial = partialCtAdvice(values)
  const change = sizeChange(values)
  const dominant = str(values, 'dominant')
  const extras = [
    !shortCircuit(values) && thickSections(values) && `Sections thicker than 1.5 mm: consider a short-term follow-up CT with contiguous thin sections as a baseline for future comparison.`,
    partial && `Nodule seen on an incomplete thoracic CT. ${partial}`,
    hasGrown(change) && `Interval growth of ${change} mm in mean diameter.`,
    mayStopFollowUp(values) && 'Stable for 12 months or more: if the nodule is well defined with benign morphology, accurately measurable and unequivocally stable, follow-up may optionally be discontinued.',
    dominant && `Management follows the most suspicious nodule: ${dominant}.`,
    atypicalLymphNode(values) && 'Perifissural nodule with a spiculated border or displaced fissure: follow-up CT at 6–12 months should be considered.',
  ]
  return `Impression: ${lines(result.impression, ...extras)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const long = num(values, 'long')
  const short = num(values, 'short')
  const type = str(values, 'type')
  if (long !== undefined && short !== undefined && short > long) out.push('The short axis is larger than the long axis. Check the measurements.')
  const result = assessment(values)
  if (result && result.impression === null) out.push(result.summary)
  if (isLymphNode(values) && type && type !== 'solid') {
    out.push(`A typical intrapulmonary lymph node is a solid nodule, but the nodule is marked ${optionLabel(typeField, type).toLowerCase()}.`)
  }
  const signs = highRiskSigns(values)
  if (type === 'solid' && str(values, 'risk') === 'low' && signs.length > 0) {
    out.push(`Low risk is selected, but these risk factors are present: ${signs.join(', ')}. The guideline says to consider all relevant risk factors.`)
  }
  const change = sizeChange(values)
  if (str(values, 'prior') === 'stable' && hasGrown(change)) out.push(`Marked stable, but the mean diameter is ${change} mm larger than on the prior (2 mm or more is growth).`)
  if (str(values, 'prior') === 'grown' && change !== undefined && change < 2) out.push(`Marked grown, but the mean diameter has changed by ${change} mm (under the 2 mm growth threshold).`)
  return out
}

function build(values: Values) {
  const text = lines(
    techniqueLine(values),
    noduleLine(values),
    sizeLine(values),
    morphologyLine(values),
    changeLine(values),
    riskLine(values),
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* Step-level rule chips. */

function deriveScope(values: Values): Derived[] {
  const excluded = exclusions(values)
  if (excluded.length > 0) return [{ label: 'Fleischner 2017', value: `Does not apply: ${excluded.join(', ')}`, tone: 'warn' }]
  const answered = ['setting', 'age35', 'immuno', 'cancer'].every((id) => str(values, id) !== '')
  return answered ? [{ label: 'Fleischner 2017', value: 'Applies', tone: 'good' }] : []
}

function deriveImages(values: Values): Derived[] {
  const out: Derived[] = []
  const thickness = num(values, 'thickness')
  if (thickness !== undefined) {
    out.push(
      thickSections(values)
        ? { label: 'Sections', value: 'Too thick: consider short-term thin-section CT as a baseline', tone: 'warn' }
        : { label: 'Sections', value: 'Thin enough (1.5 mm or less)', tone: 'good' },
    )
  }
  const partial = partialCtAdvice(values)
  if (partial) out.push({ label: 'Incomplete chest CT', value: partial, tone: 'neutral' })
  return out
}

function deriveBenign(values: Values): Derived[] {
  const out: Derived[] = []
  if (hasBenignFeature(values)) out.push({ label: 'Benign features', value: 'No follow-up for this nodule', tone: 'good' })
  if (isLymphNode(values)) {
    out.push(
      atypicalLymphNode(values)
        ? { label: 'Perifissural', value: 'Atypical: consider CT at 6–12 months', tone: 'warn' }
        : { label: 'Perifissural', value: 'No follow-up, even above 6 mm', tone: 'good' },
    )
  }
  return out
}

function deriveType(values: Values): Derived[] {
  const out: Derived[] = []
  const type = str(values, 'type')
  const features = list(values, 'features')
  if (str(values, 'count') === 'multiple') out.push({ label: 'Multiple', value: 'Manage by the most suspicious nodule (may not be the largest)' })
  if (type === 'solid' && features.includes('spiculated')) out.push({ label: 'Spiculation', value: 'Risk factor (odds ratio 2.2–2.5)', tone: 'warn' })
  if (type === 'partSolid' && (features.includes('lobulated') || features.includes('cystic'))) {
    out.push({ label: 'Part solid', value: 'Particularly suspicious morphology', tone: 'warn' })
  }
  if (type !== 'solid' && type !== '') out.push({ label: 'Subsolid', value: 'Risk category does not change management' })
  return out
}

function deriveSize(values: Values): Derived[] {
  const mean = meanDiameter(values)
  if (mean === undefined) return []
  const type = str(values, 'type')
  const out: Derived[] = [{ label: 'Mean diameter', value: `${mean} mm (rounded)` }]
  if (type === 'solid') out.push({ label: 'Size band', value: mean < 6 ? 'Under 6 mm (<100 mm³)' : mean <= 8 ? '6–8 mm (100–250 mm³)' : 'Over 8 mm (>250 mm³)', tone: mean > 8 ? 'warn' : 'neutral' })
  if (type === 'groundGlass' || type === 'partSolid') out.push({ label: 'Size band', value: mean < 6 ? 'Under 6 mm' : '6 mm or more' })
  if (type === 'partSolid' && mean < 6) out.push({ label: 'Part solid under 6 mm', value: 'Treat like ground glass' })
  const solid = solidComponent(values)
  if (isPartSolidSingle(values) && mean >= 6 && solid !== undefined) {
    if (solid > 8) out.push({ label: 'Solid component', value: 'Over 8 mm: PET/CT, biopsy or resection recommended', tone: 'warn' })
    else if (solid >= 6) out.push({ label: 'Solid component', value: '6–8 mm: consider CT at 3–6 months; highly suspicious if persistent', tone: 'warn' })
    else out.push({ label: 'Solid component', value: 'Under 6 mm' })
  }
  return out
}

function derivePrior(values: Values): Derived[] {
  const out: Derived[] = []
  const change = sizeChange(values)
  if (change !== undefined) {
    out.push(
      hasGrown(change)
        ? { label: 'Change', value: `+${change} mm: growth (2 mm or more)`, tone: 'warn' }
        : { label: 'Change', value: `${change > 0 ? '+' : ''}${change} mm: under the 2 mm growth threshold`, tone: 'good' },
    )
  }
  if (mayStopFollowUp(values)) out.push({ label: 'Stable 12 months or more', value: 'Follow-up may optionally stop (well-defined, benign morphology)', tone: 'good' })
  return out
}

function deriveResult(values: Values): Derived[] {
  const result = assessment(values)
  if (isPending(result) || !result) return []
  const tone = result.tone === 'good' || result.tone === 'warn' ? result.tone : 'neutral'
  return [
    { label: 'Fleischner 2017', value: result.category, tone },
    { label: 'Management', value: result.management },
  ]
}

/* The lesson, section by section. */

const learn: StudyDefinition['learn'] = [
  {
    id: 'big-idea',
    title: 'The big idea',
    body: (
      <>
        <p>Almost every chest CT, and many abdominal, neck and cardiac CTs, show a small lung nodule. Nearly all are benign. Your report answers one question: <strong>does this nodule need another CT, and when?</strong></p>
        <p>The Fleischner Society 2017 guideline answers it from four things: nodule type (solid, pure ground glass, part solid), size, number (single or multiple), and, for solid nodules only, the patient's risk (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>). The threshold for recommending follow-up is an estimated cancer risk of about 1% or more. Intervals are given as ranges, such as 6–12 months, on purpose: they leave room for the patient's risk factors and preferences.</p>
        <div className="lesson-key">
          <p>Before you use it, check that it applies. The guideline is for <strong>incidental</strong> nodules in adults <strong>35 or older</strong>. It does not apply to lung cancer screening (use Lung-RADS), to immunocompromised patients, or to patients with a known primary cancer. Under 35, infection is more likely than cancer, and the guideline says serial CT should be minimized.</p>
        </div>
      </>
    ),
  },
  {
    id: 'images',
    title: 'Which images to trust',
    body: (
      <>
        <p>Use <strong>contiguous thin sections, 1.5 mm or less (typically 1.0 mm)</strong>, with coronal and sagittal reconstructions. The guideline asks for this on every adult chest CT (grade 1A). Thick sections blur small nodules: they can hide a solid component, fat or calcium, and a 5 mm section can make a part-solid nodule look like pure ground glass. If the first scan had only thick sections, consider a short-term thin-section CT as a baseline for comparison (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
        <ul className="plain-list">
          <li><strong>Type:</strong> judge solid versus subsolid on thin sections. A nodule that partly disappears on soft-tissue windows is subsolid; the part that stays visible is solid. Judge the extent of the solid component on lung windows with a sharp filter.</li>
          <li><strong>Calcium and fat:</strong> measure Hounsfield units on the thinnest <em>non-sharpened</em> (soft-tissue) series with a small region of interest, not a point value. Sharp filters give falsely high values.</li>
          <li><strong>Follow-up scans:</strong> use a low-dose technique (CTDIvol no more than 3 mGy in a standard-size patient) and the same section thickness and reconstruction filter each time.</li>
          <li><strong>Priors:</strong> always compare, including the earliest available study (grade 1A).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Step-by-step search pattern',
    body: (
      <>
        <div className="lesson-step">
          <h4>Step 1. Does Fleischner apply?</h4>
          <ul className="plain-list">
            <li>Incidental nodule, patient 35 or older: yes.</li>
            <li>Screening CT: no, use Lung-RADS.</li>
            <li>Immunocompromised, or known primary cancer: no. Manage by the clinical situation.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Check the images</h4>
          <p>Thin sections (1.5 mm or less) and coronal and sagittal reconstructions. If the nodule is on a partial chest CT (abdomen, neck, heart): under 6 mm needs nothing further; 6–8 mm needs a complete chest CT at 3–12 months depending on risk, unless a prior shows stability; a large or very suspicious nodule needs a complete chest CT now (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>). Bueno et al. read "large" as over 8 mm (<Cite doi={BUENO}>RadioGraphics 2018</Cite>).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Is it plainly benign?</h4>
          <ul className="plain-list">
            <li>A benign calcification pattern (central or laminar, as in a healed granuloma) or fat (a hamartoma): no follow-up.</li>
            <li>A <strong>perifissural nodule</strong>: small, solid, next to a fissure or pleura, triangular or oval on axial images, flat or lentiform on coronal or sagittal images, often with a fine line to the pleura. That is an intrapulmonary lymph node, and needs no follow-up <strong>even if it is over 6 mm</strong>. In NELSON, 20% of nodules were perifissural and 16% of those grew, but none was malignant.</li>
            <li>But location alone does not prove it. A spiculated border, a displaced fissure, or a cancer history: consider CT at 6–12 months.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Type and number</h4>
          <p>Solid, pure ground glass, or part solid; single or multiple. With several nodules, manage by the <strong>most suspicious</strong> one, which may not be the largest, and keep an eye on the others. Record spiculation (odds ratio 2.2–2.5 for cancer in screening), lobulation and cystic components.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Measure</h4>
          <ul className="plain-list">
            <li>Measure the long axis and the short axis <strong>on the same image</strong>, axial, coronal or sagittal, whichever shows the nodule largest.</li>
            <li>Size is their <strong>average, rounded to the nearest whole millimetre</strong>. No fractions. So "under 6 mm" means a rounded 5 mm or less.</li>
            <li>For nodules over 10 mm, also record both axes.</li>
            <li>Part solid: also measure the solid component. The measurement statement asks for its maximal diameter once it is over 3 mm (<Cite doi={BANKIER}>Bankier et al., Radiology 2017</Cite>, as summarized by <Cite doi={BUENO}>Bueno et al.</Cite>).</li>
            <li>Volumetry: 100 mm³ and 250 mm³ stand in for 6 mm and 8 mm. Use the same software version to judge growth.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Compare with priors</h4>
          <p>Growth is an increase of <strong>2 mm or more</strong> (<Cite doi={BANKIER}>Bankier et al., Radiology 2017</Cite>, as summarized by <Cite doi={BUENO}>Bueno et al.</Cite>). One volume doubling is a 26% increase in diameter. Most solid cancers double in 100–400 days; subsolid adenocarcinomas take 3–5 years on average, which is why subsolid nodules are followed for longer. A well-defined solid nodule with benign morphology that is unequivocally stable at 12–18 months can optionally stop being followed.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Risk, then the row</h4>
          <p>Risk only matters for solid nodules. The guideline uses the American College of Chest Physicians groups: <strong>low risk</strong> is an estimated cancer risk under 5% (young, less smoking, small, smooth, not upper lobe). <strong>High risk</strong> combines the intermediate (5–65%) and high (over 65%) groups: older age, heavy smoking, larger size, irregular or spiculated margins, upper lobe. A history of 30 pack-years or more, still smoking or having quit within the past 15 years (the NLST entry threshold), indicates high risk. Asbestos, uranium, radon, family history, emphysema and fibrosis add risk too. Then read the row off the table.</p>
        </div>
      </>
    ),
  },
  {
    id: 'categories',
    title: 'Categories and management',
    body: (
      <>
        <p>This is Table 1 of the guideline, with its comments (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>). Sizes are the average of long and short axes, rounded to the nearest millimetre.</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Nodule</th><th>Under 6 mm (&lt;100 mm³)</th><th>6–8 mm (100–250 mm³)</th><th>Over 8 mm (&gt;250 mm³)</th></tr></thead>
            <tbody>
              <tr><td><strong>Solid, single, low risk</strong></td><td>No routine follow-up</td><td>CT at 6–12 months, then consider CT at 18–24 months</td><td>Consider CT, PET/CT, or tissue sampling at 3 months</td></tr>
              <tr><td><strong>Solid, single, high risk</strong></td><td>Optional CT at 12 months</td><td>CT at 6–12 months, then CT at 18–24 months</td><td>Consider CT, PET/CT, or tissue sampling at 3 months</td></tr>
              <tr><td><strong>Solid, multiple, low risk</strong></td><td>No routine follow-up</td><td>CT at 3–6 months, then consider CT at 18–24 months</td><td>CT at 3–6 months, then consider CT at 18–24 months</td></tr>
              <tr><td><strong>Solid, multiple, high risk</strong></td><td>Optional CT at 12 months</td><td>CT at 3–6 months, then at 18–24 months</td><td>CT at 3–6 months, then at 18–24 months</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Subsolid nodule</th><th>Under 6 mm</th><th>6 mm or more</th></tr></thead>
            <tbody>
              <tr><td><strong>Ground glass, single</strong></td><td>No routine follow-up</td><td>CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years</td></tr>
              <tr><td><strong>Part solid, single</strong></td><td>No routine follow-up</td><td>CT at 3–6 months to confirm persistence. If unchanged and the solid component remains under 6 mm, annual CT for 5 years</td></tr>
              <tr><td><strong>Subsolid, multiple</strong></td><td>CT at 3–6 months. If stable, consider CT at 2 and 4 years</td><td>CT at 3–6 months. Then manage by the most suspicious nodule</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="plain-list">
          <li><strong>Solid under 6 mm, high risk:</strong> the risk is under 1% even in high-risk patients, but suspicious morphology or an upper lobe location can raise it to 1–5%, which is why 12-month CT is optional. Do not do it sooner: a small cancer rarely advances in 12 months, and an early "no change" scan can falsely reassure.</li>
          <li><strong>Solid over 8 mm:</strong> the average cancer risk at 8 mm is about 3%, higher in some patients. At this size, management should be strongly influenced by how the nodule looks, not by size alone.</li>
          <li><strong>Ground glass under 6 mm:</strong> in selected suspicious nodules, consider CT at 2 and 4 years. Up to 10% grow and nearly 1% become adenocarcinoma over many years.</li>
          <li><strong>Part solid, solid component 6 mm or more:</strong> a persistent one is highly suspicious. The text says to consider short-term CT at 3–6 months to check persistence, and recommends PET/CT, biopsy or resection for particularly suspicious morphology (lobulated margins, cystic components), a growing solid component, or a solid component over 8 mm.</li>
          <li><strong>Multiple subsolid, 6 mm or more:</strong> consider infection first; if persistent after 3–6 months, consider multiple primary adenocarcinomas.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'report',
    title: 'What the report must contain',
    body: (
      <>
        <p>The report must let the next reader redo your decision: the scope (incidental, age, no exclusion), the type, the size as the rounded mean with both axes, the solid component for part-solid nodules, the comparison, the risk for solid nodules, and the recommendation in the guideline's words, with the guideline named.</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>Keep the range the guideline gives ("CT at 6–12 months"). It is deliberate: it lets the clinician and patient choose within it.</p>
      </>
    ),
  },
  {
    id: 'pitfalls',
    title: 'Pitfalls and mimics',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>Apical and subpleural scars.</strong> They look nodular on axial images. A pleural base, an elongated shape, straight or concave margins, and similar opacities nearby favor a scar. Check coronal and sagittal images. The costophrenic angles scar too.</li>
          <li><strong>Perifissural nodules.</strong> Do not follow a typical one; do follow one that is spiculated or displaces the fissure.</li>
          <li><strong>Type is hard.</strong> In one study, all the experienced readers classified a nodule correctly as solid or subsolid in only 58% of cases. Look on thin sections and soft-tissue windows before you pick a row.</li>
          <li><strong>Transient subsolid nodules.</strong> Transient infection causes ground-glass and part-solid nodules that resolve; that is why the first follow-up confirms persistence. A large solid component can also be transient.</li>
          <li><strong>Rounding.</strong> A 5.4 mm average is 5 mm, below the threshold; a 5.5 mm average is 6 mm. Fractional millimetres imply accuracy you do not have.</li>
          <li><strong>Multiple nodules.</strong> The most suspicious one sets management, not the largest. Metastases favor a peripheral, lower-zone distribution and a wide range of sizes, and most grow within 3 months.</li>
          <li><strong>Thick-section or partial CT.</strong> Thick sections can hide fat, calcium or a solid component: consider a short-term thin-section CT as a baseline. On a partial CT, apply the size rules for incomplete scans (Step 2).</li>
          <li><strong>Young patients.</strong> Under 35 the guideline does not apply, infection is more likely than cancer, and serial CT should be minimized.</li>
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
          <li><strong>MacMahon et al., Radiology 2017.</strong> The guideline itself; its figures show a hamartoma, calcified granulomas, a perifissural lymph node, a spiculated cancer, and ground-glass nodules that grew or resolved. <Cite doi={MACMAHON}>doi:{MACMAHON}</Cite></li>
          <li><strong>Bankier et al., Radiology 2017.</strong> The companion statement on measuring nodules, organized as practical questions with a summary table. <Cite doi={BANKIER}>doi:{BANKIER}</Cite></li>
          <li><strong>Bueno et al., RadioGraphics 2018.</strong> Eight challenging scenarios: when optional follow-up applies, a growing solid component, multiple subsolid nodules, atypical perifissural nodules, and cystic lesions. <Cite doi={BUENO}>doi:{BUENO}</Cite></li>
        </ul>
      </>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'incidental-lung-nodule',
  name: 'Incidental lung nodule CT (Fleischner)',
  lede: 'Whether the guideline applies, how to type and measure the nodule, the Fleischner 2017 row, and what the report must say.',
  sourceNote: 'Draft lesson compiled from the Fleischner Society 2017 guideline (MacMahon et al., Radiology 2017) and the papers below; citations checked against PubMed in September 2026. Not yet reviewed by the site author.',
  references,
  referencesNote: 'The measurement statement (Bankier et al.) is cited for the 2 mm growth threshold and the solid-component measurement as summarized by Bueno et al.; its full text was not checked for this draft.',
  report: {
    steps: [
      {
        id: 'scope',
        title: 'Step 1. Does Fleischner apply?',
        learn: 'big-idea',
        teach: (
          <p>The guideline is for incidental nodules in adults at least 35 years old. It is not intended for patients with known primary cancers, who are at risk for metastases, or for immunocompromised patients, who are at risk for infection; for screening CT, use Lung-RADS (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>). Under 35, infection is more likely than cancer and serial CT should be minimized.</p>
        ),
        fields: [fields.setting, fields.age, fields.immuno, fields.cancer],
        derive: deriveScope,
      },
      {
        id: 'images',
        title: 'Step 2. Check the images',
        learn: 'images',
        teach: (
          <>
            <p>Use contiguous thin sections (1.5 mm or less, typically 1.0 mm) with coronal and sagittal reconstructions. If the first scan had only thick sections, consider a short-term thin-section CT as a baseline (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
            <p>On a partial chest CT: under 6 mm needs nothing further; 6–8 mm needs a complete chest CT at 3–12 months depending on risk; a large or very suspicious nodule needs a complete chest CT now (over 8 mm, in <Cite doi={BUENO}>Bueno et al.</Cite>).</p>
          </>
        ),
        fields: [fields.coverage, fields.thickness],
        derive: deriveImages,
      },
      {
        id: 'benign',
        title: 'Step 3. Is it plainly benign?',
        learn: 'search-pattern',
        teach: (
          <p>A benign calcification pattern or fat needs no follow-up; measure HU on thin non-sharpened images. A typical perifissural nodule (triangular or oval, lentiform on reconstructions, fine line to the pleura) is an intrapulmonary lymph node and needs no follow-up even over 6 mm. A spiculated border or displaced fissure: consider CT at 6–12 months (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
        ),
        fields: [fields.benign],
        derive: deriveBenign,
      },
      {
        id: 'type',
        title: 'Step 4. Type and number',
        learn: 'search-pattern',
        teach: (
          <p>Solid, pure ground glass or part solid, judged on thin sections: what disappears on soft-tissue windows is ground glass. With several nodules, the most suspicious one (not always the largest) sets management. Spiculation carries an odds ratio of 2.2–2.5 for cancer (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
        ),
        fields: [fields.type, fields.count, fields.location, fields.features],
        derive: deriveType,
      },
      {
        id: 'size',
        title: 'Step 5. Measure',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Long and short axes on the same image, whichever plane shows the nodule largest. Size is their average, rounded to the nearest whole millimetre, so "under 6 mm" means 5 mm or less (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
            <p>Part solid: measure the solid component's maximal diameter (<Cite doi={BANKIER}>Bankier et al.</Cite>, via <Cite doi={BUENO}>Bueno et al.</Cite>). A part-solid nodule under 6 mm is treated like ground glass. With a solid component of 6 mm or more, consider CT at 3–6 months for persistence; a persistent one is highly suspicious. PET/CT, biopsy or resection is recommended for a solid component over 8 mm, a growing one, or lobulated margins or cystic components.</p>
          </>
        ),
        fields: [fields.long, fields.short, fields.solid, fields.dominant],
        derive: deriveSize,
      },
      {
        id: 'prior',
        title: 'Step 6. Compare with priors',
        learn: 'search-pattern',
        teach: (
          <p>Always compare, including the earliest study. Growth is an increase of 2 mm or more (<Cite doi={BANKIER}>Bankier et al.</Cite>, via <Cite doi={BUENO}>Bueno et al.</Cite>). A well-defined solid nodule with benign morphology, unequivocally stable at 12–18 months, can optionally stop being followed; subsolid nodules are followed longer (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
        ),
        fields: [fields.prior, fields.priorDate, fields.priorMonths, fields.priorSize],
        derive: derivePrior,
      },
      {
        id: 'risk',
        title: 'Step 7. Risk, then the row',
        learn: 'categories',
        teach: (
          <p>Risk changes the row only for solid nodules. Low risk is under 5% (ACCP); high risk combines the intermediate (5–65%) and high (over 65%) groups. Thirty pack-years or more, still smoking or quit within 15 years, indicates high risk; so do older age, heavy smoking, spiculation and upper lobe location (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>
        ),
        fields: [fields.risk, fields.riskFactors],
        derive: deriveResult,
      },
    ],
    build,
  },
  learn,
  quiz: [
    {
      id: 'solid-5-low',
      question: 'A single 5 mm solid nodule in a 50-year-old never-smoker, seen on a CT for abdominal pain with thin sections through the lung bases. What does Fleischner 2017 recommend?',
      options: ['CT at 6–12 months', 'Optional CT at 12 months', 'No routine follow-up', 'CT at 3 months'],
      answer: 2,
      explanation: <p>Solid nodules under 6 mm need no routine follow-up in low-risk patients: their cancer risk is well under 1% (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>). On a partial chest CT, under 6 mm needs no further investigation either.</p>,
    },
    {
      id: 'rounding',
      question: 'A solid nodule measures 7 mm × 4 mm on the same image. Which size do you use for the guideline?',
      options: ['6 mm: the average rounded to the nearest millimetre', '5.5 mm: the exact average', '4 mm: the short axis', '7 mm: the long axis'],
      answer: 0,
      explanation: <p>Size is the average of long and short axes on the same image, rounded to the nearest whole millimetre. Fractional millimetres imply more accuracy than you have (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
    {
      id: 'scope',
      question: 'Which patient is inside the scope of the Fleischner 2017 guideline?',
      options: ['A 30-year-old with an incidental 7 mm nodule', 'A 60-year-old on chemotherapy for lymphoma', 'A 62-year-old on a lung cancer screening CT', 'A 70-year-old with an incidental nodule on a cardiac CT'],
      answer: 3,
      explanation: <p>It covers incidental nodules in adults 35 or older, including nodules on partial chest CTs. It excludes screening (use Lung-RADS), immunocompromised patients and patients with known cancer (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
    {
      id: 'pfn',
      question: 'A 7 mm triangular solid nodule abuts the right minor fissure, is lentiform on the coronal image and has a fine line to the pleura. What do you recommend?',
      options: ['CT at 6–12 months, as for any 6–8 mm solid nodule', 'No follow-up: typical intrapulmonary lymph node', 'PET/CT', 'CT at 3 months'],
      answer: 1,
      explanation: <p>A perifissural nodule with lymph node morphology needs no follow-up, even if it is over 6 mm. In NELSON, 16% of perifissural nodules grew but none was malignant. A spiculated border or displaced fissure would change that to CT at 6–12 months (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
    {
      id: 'ggn-8',
      question: 'A single 8 mm pure ground-glass nodule. What is the recommendation?',
      options: ['CT at 3 months', 'No routine follow-up', 'CT at 6–12 months to confirm persistence, then every 2 years until 5 years', 'PET/CT'],
      answer: 2,
      explanation: <p>Ground-glass nodules 6 mm or more get CT at 6–12 months, then every 2 years until 5 years. The old 3-month first follow-up was dropped because earlier CT is unlikely to change the outcome of these indolent lesions (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
    {
      id: 'risk-subsolid',
      question: 'For which nodule type does the patient\'s clinical risk category change the Fleischner recommendation?',
      options: ['Pure ground glass', 'Solid', 'Part solid', 'All three'],
      answer: 1,
      explanation: <p>The risk categories apply to solid nodules. Smoking's link to adenocarcinoma, which accounts for nearly all subsolid cancers, is not clearly defined, so the subsolid recommendations are independent of the usual risk categories (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
    {
      id: 'growth',
      question: 'By the Fleischner measurement statement, what is the smallest increase in size that counts as growth?',
      options: ['0.5 mm', '1 mm', '1.5 mm', '2 mm'],
      answer: 3,
      explanation: <p>A 2 mm threshold for growth was proposed in the Fleischner measurement statement (<Cite doi={BANKIER}>Bankier et al., Radiology 2017</Cite>, summarized in <Cite doi={BUENO}>Bueno et al., RadioGraphics 2018</Cite>). Measurements are to the nearest whole millimetre.</p>,
    },
    {
      id: 'solid-high-5',
      question: 'A 5 mm spiculated solid nodule in the right upper lobe of a heavy smoker. Why is the optional follow-up at 12 months rather than at 3 months?',
      options: ['Small cancers rarely advance in stage over 12 months, and an early "no change" scan can falsely reassure', 'Radiation dose is too high at 3 months', 'Nodules under 6 mm cannot be measured on follow-up', 'Upper lobe nodules are benign'],
      answer: 0,
      explanation: <p>Suspicious morphology or an upper lobe location can raise the risk of a nodule under 6 mm to 1–5%, so CT at 12 months may be considered. Earlier follow-up is not recommended: such small nodules, if malignant, rarely advance in stage over 12 months, and a short-term scan showing no change may give false reassurance (<Cite doi={MACMAHON}>MacMahon et al., Radiology 2017</Cite>).</p>,
    },
  ],
}

export function IncidentalLungNoduleStudyPage() {
  return <StudyPage study={study} />
}
