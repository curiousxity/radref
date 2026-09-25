import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { calculateTirads } from '../logic/tirads'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'
import type { Composition, EchogenicFocus, Echogenicity, Margin, Shape, TiradsForm, TiradsResult } from '../types/tirads'

const WHITE_PAPER = '10.1016/j.jacr.2017.01.046'
const LEXICON = '10.1016/j.jacr.2015.07.011'
const USERS_GUIDE = '10.1148/radiol.2017171240'
const MIDDLETON = '10.2214/AJR.16.17613'
const BIOPSY_REDUCTION = '10.1148/radiol.2018172572'
const INTEROBSERVER = '10.2214/AJR.17.19192'
const SONOGRAPHERS = '10.1016/j.ultrasmedbio.2020.04.019'
const AI_TIRADS = '10.1148/radiol.2019182128'

const references: LessonReference[] = [
  { citation: 'Tessler FN et al. ACR Thyroid Imaging, Reporting and Data System (TI-RADS): white paper of the ACR TI-RADS Committee. J Am Coll Radiol 2017;14:587-595.', doi: WHITE_PAPER },
  { citation: 'Grant EG et al. Thyroid ultrasound reporting lexicon: white paper of the ACR Thyroid Imaging, Reporting and Data System (TIRADS) Committee. J Am Coll Radiol 2015;12:1272-1279.', doi: LEXICON },
  { citation: 'Tessler FN, Middleton WD, Grant EG. Thyroid Imaging Reporting and Data System (TI-RADS): a user\'s guide. Radiology 2018;287:29-36.', doi: USERS_GUIDE },
  { citation: 'Middleton WD et al. Multiinstitutional analysis of thyroid nodule risk stratification using the American College of Radiology Thyroid Imaging Reporting and Data System. AJR 2017;208:1331-1341.', doi: MIDDLETON },
  { citation: 'Hoang JK et al. Reduction in thyroid nodule biopsies and improved accuracy with American College of Radiology Thyroid Imaging Reporting and Data System. Radiology 2018;287:185-193.', doi: BIOPSY_REDUCTION },
  { citation: 'Hoang JK et al. Interobserver variability of sonographic features used in the American College of Radiology Thyroid Imaging Reporting and Data System. AJR 2018;211:162-167.', doi: INTEROBSERVER },
  { citation: 'Wildman-Tobriner B et al. Using the American College of Radiology Thyroid Imaging Reporting and Data System at the point of care: sonographer performance and interobserver variability. Ultrasound Med Biol 2020;46:1928-1933.', doi: SONOGRAPHERS },
  { citation: 'Wildman-Tobriner B et al. Using artificial intelligence to revise ACR TI-RADS risk stratification of thyroid nodules: diagnostic accuracy and utility. Radiology 2019;292:112-119.', doi: AI_TIRADS },
]

const reportTemplate = `Nodule __: [right lobe/left lobe/isthmus], [upper/mid/lower]
Size: __ x __ x __ cm (axial max x axial perpendicular x sagittal)
Composition: __ (_ pts); echogenicity: __ (_ pts); shape: __ (_ pts);
  margin: __ (_ pts); echogenic foci: __ (_ pts)
ACR TI-RADS: TR_ (_ points)
Comparison: prior __ x __ x __ cm; [significant enlargement / no
  significant enlargement]; TI-RADS level [unchanged/increased]
Cervical lymph nodes: [no abnormal nodes / abnormal: features, site]
Impression: Nodule __, [site], __ cm, ACR TI-RADS TR_ (_ points):
  [FNA / follow-up ultrasound at __ / no FNA]. [FNA of suspicious node.]`

/* Option sets, shared by the fields and the report wording. */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const sideField = {
  options: [
    { value: 'right', label: 'Right lobe' },
    { value: 'left', label: 'Left lobe' },
    { value: 'isthmus', label: 'Isthmus' },
  ],
}

const levelField = {
  options: [
    { value: 'upper', label: 'Upper' },
    { value: 'mid', label: 'Mid' },
    { value: 'lower', label: 'Lower' },
  ],
}

const compositionField = {
  options: [
    { value: 'cystic', label: 'Cystic or almost completely cystic' },
    { value: 'spongiform', label: 'Spongiform' },
    { value: 'mixed', label: 'Mixed cystic and solid' },
    { value: 'solid', label: 'Solid or almost completely solid' },
    { value: 'unknown', label: 'Cannot be determined (shadowing calcification)' },
  ],
}

const echogenicityField = {
  options: [
    { value: 'anechoic', label: 'Anechoic' },
    { value: 'hyperechoic', label: 'Hyperechoic' },
    { value: 'isoechoic', label: 'Isoechoic' },
    { value: 'hypoechoic', label: 'Hypoechoic' },
    { value: 'veryHypoechoic', label: 'Very hypoechoic' },
    { value: 'unknown', label: 'Cannot be determined' },
  ],
}

const shapeField = {
  options: [
    { value: 'widerThanTall', label: 'Wider-than-tall' },
    { value: 'tallerThanWide', label: 'Taller-than-wide' },
  ],
}

const marginField = {
  options: [
    { value: 'smooth', label: 'Smooth' },
    { value: 'illDefined', label: 'Ill-defined' },
    { value: 'lobulated', label: 'Lobulated or irregular' },
    { value: 'extrathyroidal', label: 'Extrathyroidal extension' },
    { value: 'unknown', label: 'Cannot be determined' },
  ],
}

const eteField = {
  options: [
    { value: 'extensive', label: 'Frank invasion' },
    { value: 'minimal', label: 'Suspected (abutment, bulge)' },
  ],
}

const fociPresentField = {
  options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ],
}

const fociField = {
  options: [
    { value: 'comet', label: 'Large comet-tail artifacts (in cystic parts)' },
    { value: 'macrocalcification', label: 'Macrocalcifications (shadowing)' },
    { value: 'rimCalcification', label: 'Peripheral (rim) calcifications' },
    { value: 'punctate', label: 'Punctate echogenic foci' },
  ],
}

const levelChangeField = {
  options: [
    { value: 'same', label: 'Same or lower' },
    { value: 'increased', label: 'Increased' },
  ],
}

const nodeStatusField = {
  options: [
    { value: 'normal', label: 'No abnormal nodes' },
    { value: 'abnormal', label: 'Abnormal node(s)' },
  ],
}

const nodeFeatureField = {
  options: [
    { value: 'globular', label: 'Globular shape' },
    { value: 'hilum', label: 'Loss of the echogenic hilum' },
    { value: 'flow', label: 'Peripheral rather than hilar flow' },
    { value: 'cystic', label: 'Heterogeneous with cystic parts' },
    { value: 'foci', label: 'Punctate echogenic foci' },
  ],
}

/* Scoring, through the site's calculator so the calculator and this study agree. */

/** The zero-point answer in every category. Adding one real answer to it gives that answer's points. */
const zeroForm: TiradsForm = {
  laterality: '',
  pole: '',
  sizeCm: '',
  composition: 'cystic',
  echogenicity: 'anechoic',
  shape: 'widerThanTall',
  margin: 'smooth',
  echogenicFoci: [],
}

function isSpongiform(values: Values): boolean {
  return str(values, 'composition') === 'spongiform'
}

/**
 * "Assign 2 points if composition cannot be determined because of calcification", i.e.
 * "assume that the nodule is solid" (white paper, Fig. 1 and Echogenic Foci).
 */
function compositionFor(value: string): Composition | undefined {
  if (value === 'unknown') return 'solid'
  return compositionField.options.some((o) => o.value === value) ? (value as Composition) : undefined
}

/** "Assign 1 point if echogenicity cannot be determined": the same points as iso- or hyperechoic. */
function echogenicityFor(value: string): Echogenicity | undefined {
  if (value === 'unknown') return 'isoechoic'
  return echogenicityField.options.some((o) => o.value === value) ? (value as Echogenicity) : undefined
}

/** "Assign 0 points if margin cannot be determined": the same points as smooth. */
function marginFor(value: string): Margin | undefined {
  if (value === 'unknown') return 'smooth'
  return marginField.options.some((o) => o.value === value) ? (value as Margin) : undefined
}

function shapeFor(value: string): Shape | undefined {
  return shapeField.options.some((o) => o.value === value) ? (value as Shape) : undefined
}

/** Large comet-tail artifacts score 0, the same as no foci, so they are not passed on. */
function fociFor(values: Values): EchogenicFocus[] {
  if (str(values, 'foci-present') !== 'present') return []
  return list(values, 'foci').filter((f): f is EchogenicFocus => f === 'macrocalcification' || f === 'rimCalcification' || f === 'punctate')
}

/** The points one answer carries, from the calculator. */
function pointsOf(partial: Partial<TiradsForm>): number {
  return calculateTirads({ ...zeroForm, ...partial }).points
}

/** Maximum of the three measured axes, in cm. Undefined until one is entered. */
function maxSize(values: Values): number | undefined {
  const sizes = ['dim-ap', 'dim-perp', 'dim-long'].map((id) => num(values, id)).filter((n): n is number => n !== undefined)
  return sizes.length > 0 ? Math.max(...sizes) : undefined
}

/**
 * The calculator's result, or undefined until every scored category is answered.
 * "Spongiform ... Do not add further points for other categories" (white paper, Fig. 1), so
 * for a spongiform nodule only the composition is scored and the other categories are zero.
 */
function score(values: Values): TiradsResult | undefined {
  const composition = compositionFor(str(values, 'composition'))
  if (!composition) return undefined
  const size = maxSize(values)
  const sizeCm = size === undefined ? '' : String(size)
  if (composition === 'spongiform') return calculateTirads({ ...zeroForm, composition, sizeCm })
  const echogenicity = echogenicityFor(str(values, 'echogenicity'))
  const shape = shapeFor(str(values, 'shape'))
  const margin = marginFor(str(values, 'margin'))
  const fociAnswered = str(values, 'foci-present') !== ''
  if (!echogenicity || !shape || !margin || !fociAnswered) return undefined
  return calculateTirads({ ...zeroForm, composition, echogenicity, shape, margin, echogenicFoci: fociFor(values), sizeCm })
}

/* Size thresholds from the chart (Fig. 1) and the follow-up timing, for the report wording. */

const thresholds: Record<'TR3' | 'TR4' | 'TR5', { fna: number; follow: number; timing: string }> = {
  TR3: { fna: 2.5, follow: 1.5, timing: 'follow-up imaging may be performed at 1, 3 and 5 years' },
  TR4: { fna: 1.5, follow: 1.0, timing: 'scans at 1, 2, 3 and 5 years' },
  TR5: { fna: 1.0, follow: 0.5, timing: 'scans every year for up to 5 years' },
}

/** TR5 nodules of 5-9 mm: "biopsy ... may be appropriate under certain circumstances". */
function isSmallTr5(values: Values): boolean {
  const result = score(values)
  const size = maxSize(values)
  return result?.category === 'TR5' && size !== undefined && size >= 0.5 && size < 1
}

function management(values: Values): string {
  const result = score(values)
  const size = maxSize(values)
  if (!result || size === undefined) return ''
  if (result.category === 'TR1') return 'No FNA (TR1, benign).'
  if (result.category === 'TR2') return 'No FNA (TR2, not suspicious).'
  const t = thresholds[result.category]
  if (result.fna) return `FNA recommended (${result.category} FNA threshold ${t.fna.toFixed(1)} cm).`
  if (result.followUp) {
    const microcarcinoma = isSmallTr5(values)
      ? ' Biopsy of a 5-9 mm TR5 nodule may be appropriate in certain circumstances, by shared decision making between the referring physician and the patient.'
      : ''
    return `Follow-up ultrasound recommended (${result.category}: follow if ${t.follow.toFixed(1)} cm or more, FNA if ${t.fna.toFixed(1)} cm or more); ${t.timing}.${microcarcinoma}`
  }
  return `Below the ${result.category} follow-up size (${t.follow.toFixed(1)} cm): no FNA or follow-up.`
}

/* Comparison with earlier scans. */

type Growth = { dims: number; volume: number | undefined; significant: boolean }

/**
 * "Significant enlargement is defined as a 20% increase in at least two nodule dimensions
 * and a minimal increase of 2 mm, or a 50% or greater increase in volume" (white paper).
 * Each axis is compared with the same axis on the prior scan. Volume is taken as the
 * product of the three axes, whose ratio is the ellipsoid volume ratio.
 */
function growth(values: Values): Growth | undefined {
  const pairs: [string, string][] = [['dim-ap', 'prior-ap'], ['dim-perp', 'prior-perp'], ['dim-long', 'prior-long']]
  const measured = pairs
    .map(([now, before]) => [num(values, now), num(values, before)] as const)
    .filter((pair): pair is readonly [number, number] => pair[0] !== undefined && pair[1] !== undefined && pair[1] > 0)
  if (measured.length < 2) return undefined
  const eps = 1e-9
  const dims = measured.filter(([now, before]) => now >= before * 1.2 - eps && now - before >= 0.2 - eps).length
  const volume = measured.length === 3
    ? measured.reduce((acc, [now]) => acc * now, 1) / measured.reduce((acc, [, before]) => acc * before, 1)
    : undefined
  const significant = dims >= 2 || (volume !== undefined && volume >= 1.5 - eps)
  return { dims, volume, significant }
}

function levelIncreased(values: Values): boolean {
  return str(values, 'level-change') === 'increased'
}

function abnormalNodes(values: Values): boolean {
  return str(values, 'nodes') === 'abnormal'
}

/* Fields. Declared once so the report can read their labels. */

const notSpongiform = (v: Values) => !isSpongiform(v)

const fields = {
  number: { id: 'number', kind: 'number', label: 'Nodule number', min: 1, step: 1, help: 'Number every nodule you follow, in sequence.' },
  side: { id: 'side', kind: 'choice', label: 'Side', ...sideField, required: true },
  level: { id: 'level', kind: 'choice', label: 'Level', ...levelField, required: true, showIf: (v) => str(v, 'side') !== 'isthmus' },
  position: { id: 'position', kind: 'text', label: 'Further position (if needed)', placeholder: 'e.g. posterior, medial' },
  priorFna: { id: 'prior-fna', kind: 'choice', label: 'Prior FNA or ethanol ablation of this nodule?', options: yesNo, help: 'Either can make it look suspicious later.' },
  dimAp: { id: 'dim-ap', kind: 'number', label: 'Maximum dimension, axial image', unit: 'cm', min: 0, step: 0.1, required: true },
  dimPerp: { id: 'dim-perp', kind: 'number', label: 'Perpendicular to it, same axial image', unit: 'cm', min: 0, step: 0.1, required: true },
  dimLong: { id: 'dim-long', kind: 'number', label: 'Maximum longitudinal, sagittal image', unit: 'cm', min: 0, step: 0.1, required: true, help: 'Include the halo, if there is one.' },
  composition: { id: 'composition', kind: 'choice', label: 'Composition', ...compositionField, required: true, help: 'Spongiform means more than 50% small cystic spaces.' },
  echogenicity: { id: 'echogenicity', kind: 'choice', label: 'Echogenicity (of the solid part)', ...echogenicityField, required: true, showIf: notSpongiform, help: 'Very hypoechoic is compared with the strap muscles.' },
  shape: { id: 'shape', kind: 'choice', label: 'Shape, on a transverse image', ...shapeField, required: true, showIf: notSpongiform },
  margin: { id: 'margin', kind: 'choice', label: 'Margin', ...marginField, required: true, showIf: notSpongiform },
  ete: { id: 'ete', kind: 'choice', label: 'Extension beyond the thyroid border', ...eteField, showIf: (v) => notSpongiform(v) && str(v, 'margin') === 'extrathyroidal' },
  fociPresent: { id: 'foci-present', kind: 'choice', label: 'Echogenic foci', ...fociPresentField, required: true, showIf: notSpongiform },
  foci: { id: 'foci', kind: 'multi', label: 'Which ones (all that apply)', ...fociField, showIf: (v) => notSpongiform(v) && str(v, 'foci-present') === 'present' },
  reproducible: { id: 'reproducible', kind: 'choice', label: 'Can it be measured reproducibly on follow-up?', options: yesNo, required: true, showIf: isSmallTr5 },
  critical: { id: 'critical', kind: 'choice', label: 'Abuts the trachea or next to the tracheoesophageal groove?', options: yesNo, required: true, showIf: isSmallTr5 },
  priorDate: { id: 'prior-date', kind: 'text', label: 'Prior study used for comparison', placeholder: 'e.g. US 12 March 2025' },
  priorAp: { id: 'prior-ap', kind: 'number', label: 'Prior maximum axial dimension', unit: 'cm', min: 0, step: 0.1 },
  priorPerp: { id: 'prior-perp', kind: 'number', label: 'Prior perpendicular axial dimension', unit: 'cm', min: 0, step: 0.1 },
  priorLong: { id: 'prior-long', kind: 'number', label: 'Prior longitudinal dimension', unit: 'cm', min: 0, step: 0.1 },
  levelChange: { id: 'level-change', kind: 'choice', label: 'TI-RADS level compared with before', ...levelChangeField },
  years: { id: 'years', kind: 'number', label: 'Years since this nodule was first followed', unit: 'years', min: 0, step: 0.5 },
  nodes: { id: 'nodes', kind: 'choice', label: 'Cervical lymph nodes', ...nodeStatusField, required: true },
  nodeFeatures: { id: 'node-features', kind: 'multi', label: 'Abnormal features', ...nodeFeatureField, showIf: abnormalNodes },
  nodeSite: { id: 'node-site', kind: 'text', label: 'Site and size of the abnormal node(s)', placeholder: 'e.g. right level 4, 1.2 cm', showIf: abnormalNodes },
  other: { id: 'other', kind: 'text', label: 'Other nodules and findings', placeholder: 'e.g. two further TR2 nodules, not enumerated', multiline: true },
} satisfies Record<string, Field>

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

/**
 * One decimal, or two when the entry has them, so a 1.49 cm nodule is never printed as the
 * 1.5 cm threshold it falls below.
 */
function cm(n: number): string {
  const r = Math.round(n * 100) / 100
  return Math.abs(r * 10 - Math.round(r * 10)) < 1e-9 ? r.toFixed(1) : r.toFixed(2)
}

function pts(n: number): string {
  return `${n} ${n === 1 ? 'pt' : 'pts'}`
}

function pointsText(n: number): string {
  return `${n} ${n === 1 ? 'point' : 'points'}`
}

function nodeName(values: Values): string {
  const n = num(values, 'number')
  return n === undefined ? 'Nodule' : `Nodule ${n}`
}

function site(values: Values): string {
  const side = str(values, 'side')
  const level = str(values, 'level')
  const position = str(values, 'position')
  return join([
    side && optionLabel(sideField, side).toLowerCase(),
    level && `${optionLabel(levelField, level).toLowerCase()} pole`,
    position,
  ], ', ')
}

function sizeText(values: Values): string {
  const dims = ['dim-ap', 'dim-perp', 'dim-long'].map((id) => num(values, id))
  if (dims.every((d) => d === undefined)) return ''
  return dims.map((d) => (d === undefined ? '__' : cm(d))).join(' x ') + ' cm'
}

function featuresLine(values: Values): string {
  const composition = str(values, 'composition')
  if (!composition) return ''
  const compositionPoints = pointsOf({ composition: compositionFor(composition) })
  const compositionText = `Composition: ${optionLabel(compositionField, composition).toLowerCase()} (${pts(compositionPoints)})`
  if (isSpongiform(values)) return `${compositionText}; no further points added for other categories`
  const echo = str(values, 'echogenicity')
  const shape = str(values, 'shape')
  const margin = str(values, 'margin')
  const ete = str(values, 'ete')
  const fociPresent = str(values, 'foci-present')
  const foci = list(values, 'foci')
  const fociText = fociPresent === 'none' || (fociPresent === 'present' && foci.length === 0)
    ? 'echogenic foci: none (0 pts)'
    : fociPresent === 'present' && `echogenic foci: ${foci.map((f) => optionLabel(fociField, f).replace(/ \(.*\)$/, '').toLowerCase()).join(', ')} (${pts(pointsOf({ echogenicFoci: fociFor(values) }))})`
  return join([
    compositionText,
    echo && `echogenicity: ${optionLabel(echogenicityField, echo).toLowerCase()} (${pts(pointsOf({ echogenicity: echogenicityFor(echo) }))})`,
    shape && `shape: ${optionLabel(shapeField, shape).toLowerCase()} (${pts(pointsOf({ shape: shapeFor(shape) }))})`,
    margin && `margin: ${optionLabel(marginField, margin).toLowerCase()}${ete === 'extensive' ? ', frank invasion' : ete === 'minimal' ? ', suspected minimal' : ''} (${pts(pointsOf({ margin: marginFor(margin) }))})`,
    fociText,
  ])
}

function comparisonLine(values: Values): string {
  const priorDims = ['prior-ap', 'prior-perp', 'prior-long'].map((id) => num(values, id))
  const priorDate = str(values, 'prior-date')
  const g = growth(values)
  const change = str(values, 'level-change')
  const priorSize = priorDims.some((d) => d !== undefined) && `prior ${priorDims.map((d) => (d === undefined ? '__' : cm(d))).join(' x ')} cm`
  const body = join([
    priorDate && `compared with ${priorDate}`,
    priorSize,
    g && (g.significant ? 'significant enlargement' : 'no significant enlargement'),
    change && `TI-RADS level ${change === 'increased' ? 'increased' : 'not increased'}`,
  ])
  return body && `Comparison: ${body}`
}

function nodesLine(values: Values): string {
  const status = str(values, 'nodes')
  if (!status) return ''
  if (status === 'normal') return 'Cervical lymph nodes: no abnormal nodes'
  const features = list(values, 'node-features').map((f) => optionLabel(nodeFeatureField, f).toLowerCase())
  const detail = join([features.length > 0 && features.join(', '), str(values, 'node-site')])
  return `Cervical lymph nodes: abnormal${detail ? `: ${detail}` : ''}`
}

function impression(values: Values): string {
  const result = score(values)
  const size = maxSize(values)
  const where = site(values)
  const head = result
    ? `${nodeName(values)}${where ? `, ${where}` : ''}${size !== undefined ? `, ${cm(size)} cm` : ''}: ACR TI-RADS ${result.category} (${pointsText(result.points)}).`
    : ''
  const g = growth(values)
  const years = num(values, 'years')
  const extras = [
    management(values),
    isSmallTr5(values) && str(values, 'reproducible') && `It ${str(values, 'reproducible') === 'yes' ? 'can' : 'cannot'} be measured reproducibly on follow-up.`,
    isSmallTr5(values) && str(values, 'critical') && (str(values, 'critical') === 'yes' ? 'It abuts the trachea or lies next to the tracheoesophageal groove.' : 'It does not abut the trachea or the tracheoesophageal groove.'),
    g?.significant && 'Significant enlargement since the prior study.',
    levelIncreased(values) && !result?.fna && 'TI-RADS level has increased: next ultrasound in 1 year, regardless of the initial level.',
    years !== undefined && years >= 5 && g && !g.significant && !result?.fna && !levelIncreased(values) && 'Followed for 5 years without significant enlargement: imaging can stop if the size is unchanged.',
    years !== undefined && years >= 5 && g?.significant && !result?.fna && 'Significant enlargement at 5 years while still below the FNA size: continued follow-up is probably warranted.',
    abnormalNodes(values) && 'Abnormal cervical lymph node: FNA of the suspicious node recommended.',
  ]
  const body = lines(head, ...extras)
  return body && `Impression: ${body}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const composition = str(values, 'composition')
  const echo = str(values, 'echogenicity')
  const result = score(values)
  if (echo === 'anechoic' && composition && composition !== 'cystic' && !isSpongiform(values)) {
    out.push('Anechoic applies to cystic or almost completely cystic nodules. For a mixed nodule, score the echogenicity of the solid part.')
  }
  if (composition === 'cystic' && echo && echo !== 'anechoic') {
    out.push('A cystic or almost completely cystic nodule is scored anechoic (0 points). Check the echogenicity.')
  }
  if (composition === 'unknown' && echo && echo !== 'unknown' && echo !== 'isoechoic' && echo !== 'hyperechoic') {
    out.push('Composition hidden by shadowing calcification: the white paper assumes solid (2 points) and assigns 1 point for echogenicity. Check the echogenicity answer.')
  }
  if (result && result.points === 1) {
    out.push('1 point total: the chart lists TR1 at 0 points and TR2 at 2, and says every nodule other than a 0-point one merits at least 2 points. Check the composition and echogenicity; this total is shown as TR1.')
  }
  if (str(values, 'margin') === 'extrathyroidal' && str(values, 'ete') === 'minimal' && result && result.points - 3 <= 2) {
    out.push('Suspected minimal extrathyroidal extension in an otherwise benign-appearing nodule: the white paper advises caution in reporting it.')
  }
  const ap = num(values, 'dim-ap')
  const perp = num(values, 'dim-perp')
  if (ap !== undefined && perp !== undefined && perp > ap) {
    out.push('The perpendicular axial measurement is larger than the "maximum" axial dimension. Swap them or remeasure.')
  }
  if (abnormalNodes(values) && list(values, 'node-features').length === 0) {
    out.push('Abnormal node marked, but no abnormal feature selected.')
  }
  return out
}

function build(values: Values) {
  const where = site(values)
  const result = score(values)
  const size = sizeText(values)
  const text = lines(
    where && `${nodeName(values)}: ${where}`,
    size && `Size: ${size} (axial max x axial perpendicular x sagittal)`,
    featuresLine(values),
    result && `ACR TI-RADS: ${result.category} (${pointsText(result.points)})`,
    str(values, 'prior-fna') === 'yes' && 'Prior FNA or ethanol ablation of this nodule.',
    comparisonLine(values),
    nodesLine(values),
    str(values, 'other') && `Other: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* Step-level rule chips. */

function deriveLocation(values: Values): Derived[] {
  return str(values, 'prior-fna') === 'yes'
    ? [{ label: 'Prior FNA or ablation', value: 'May look suspicious afterwards', tone: 'warn' }]
    : []
}

function deriveSize(values: Values): Derived[] {
  const size = maxSize(values)
  return size === undefined ? [] : [{ label: 'Maximum diameter', value: `${cm(size)} cm` }]
}

function deriveComposition(values: Values): Derived[] {
  const composition = str(values, 'composition')
  if (!composition) return []
  const out: Derived[] = [{ label: 'Composition', value: pts(pointsOf({ composition: compositionFor(composition) })) }]
  if (composition === 'spongiform') out.push({ label: 'Spongiform', value: 'No further points: TR1', tone: 'good' })
  if (composition === 'unknown') out.push({ label: 'Shadowing', value: 'Assume solid (2) and 1 pt echogenicity' })
  return out
}

function deriveEchogenicity(values: Values): Derived[] {
  const echo = str(values, 'echogenicity')
  return echo ? [{ label: 'Echogenicity', value: pts(pointsOf({ echogenicity: echogenicityFor(echo) })) }] : []
}

function deriveShape(values: Values): Derived[] {
  const shape = str(values, 'shape')
  if (!shape) return []
  const points = pointsOf({ shape: shapeFor(shape) })
  return [{ label: 'Shape', value: pts(points), tone: points > 0 ? 'warn' : 'neutral' }]
}

function deriveMargin(values: Values): Derived[] {
  const margin = str(values, 'margin')
  if (!margin) return []
  const out: Derived[] = [{ label: 'Margin', value: pts(pointsOf({ margin: marginFor(margin) })) }]
  if (str(values, 'ete') === 'extensive') out.push({ label: 'Frank invasion', value: 'Highly reliable sign of malignancy', tone: 'warn' })
  return out
}

function deriveFoci(values: Values): Derived[] {
  const present = str(values, 'foci-present')
  if (!present) return []
  const out: Derived[] = [{ label: 'Echogenic foci', value: pts(pointsOf({ echogenicFoci: fociFor(values) })) }]
  if (list(values, 'foci').includes('comet')) out.push({ label: 'Large comet-tail', value: 'Colloid: 0 pts', tone: 'good' })
  return out
}

function deriveCategory(values: Values): Derived[] {
  const result = score(values)
  if (!result) return []
  const tone: Derived['tone'] = result.category === 'TR4' || result.category === 'TR5' ? 'warn' : result.category === 'TR3' ? 'neutral' : 'good'
  const out: Derived[] = [
    { label: 'Points', value: String(result.points) },
    { label: 'ACR TI-RADS', value: result.category, tone },
  ]
  if (maxSize(values) === undefined) {
    if (result.category !== 'TR1' && result.category !== 'TR2') out.push({ label: 'Management', value: 'Enter the size (Step 2)' })
    else out.push({ label: 'Management', value: 'No FNA' })
    return out
  }
  out.push({
    label: 'Management',
    value: result.fna ? 'FNA' : result.followUp ? 'Follow-up ultrasound' : result.category === 'TR1' || result.category === 'TR2' ? 'No FNA' : 'Below follow-up size',
    tone: result.fna ? 'warn' : 'neutral',
  })
  if (isSmallTr5(values)) out.push({ label: 'TR5, 5-9 mm', value: 'FNA may be appropriate: shared decision' })
  return out
}

function deriveComparison(values: Values): Derived[] {
  const out: Derived[] = []
  const g = growth(values)
  if (g) {
    out.push({
      label: 'Growth (ACR)',
      value: g.significant ? 'Significant enlargement' : 'Not significant',
      tone: g.significant ? 'warn' : 'good',
    })
    if (g.volume !== undefined) out.push({ label: 'Volume change', value: `${g.volume >= 1 ? '+' : ''}${Math.round((g.volume - 1) * 100)}%` })
  }
  if (levelIncreased(values)) out.push({ label: 'Level increased', value: 'Next ultrasound in 1 year', tone: 'warn' })
  const years = num(values, 'years')
  if (years !== undefined && years >= 5 && g && !(levelIncreased(values) && !g.significant)) {
    out.push(g.significant
      ? { label: '5 years', value: 'Enlarged: continued follow-up probably warranted', tone: 'warn' }
      : { label: '5 years', value: 'Can stop if size unchanged', tone: 'good' })
  }
  return out
}

function deriveNodes(values: Values): Derived[] {
  return abnormalNodes(values) ? [{ label: 'Suspicious node', value: 'FNA of the node', tone: 'warn' }] : []
}

/* The lesson, section by section. */

const pointsTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>0 points</th>
          <th>1 point</th>
          <th>2 points</th>
          <th>3 points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="vessel-name">Composition (choose 1)</td>
          <td>Cystic or almost completely cystic; spongiform</td>
          <td>Mixed cystic and solid</td>
          <td>Solid or almost completely solid; cannot be determined because of calcification</td>
          <td>-</td>
        </tr>
        <tr>
          <td className="vessel-name">Echogenicity (choose 1)</td>
          <td>Anechoic</td>
          <td>Hyperechoic or isoechoic; cannot be determined</td>
          <td>Hypoechoic</td>
          <td>Very hypoechoic</td>
        </tr>
        <tr>
          <td className="vessel-name">Shape (choose 1)</td>
          <td>Wider-than-tall</td>
          <td>-</td>
          <td>-</td>
          <td>Taller-than-wide</td>
        </tr>
        <tr>
          <td className="vessel-name">Margin (choose 1)</td>
          <td>Smooth; ill-defined; cannot be determined</td>
          <td>-</td>
          <td>Lobulated or irregular</td>
          <td>Extrathyroidal extension</td>
        </tr>
        <tr>
          <td className="vessel-name">Echogenic foci (all that apply)</td>
          <td>None; large comet-tail artifacts</td>
          <td>Macrocalcifications</td>
          <td>Peripheral (rim) calcifications</td>
          <td>Punctate echogenic foci</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const levelsTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Level</th>
          <th>Points</th>
          <th>FNA if</th>
          <th>Follow if</th>
          <th>Follow-up timing</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="vessel-name">TR1 benign</td>
          <td>0</td>
          <td>No FNA</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td className="vessel-name">TR2 not suspicious</td>
          <td>2</td>
          <td>No FNA</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td className="vessel-name">TR3 mildly suspicious</td>
          <td>3</td>
          <td>2.5 cm or more</td>
          <td>1.5 cm or more</td>
          <td>May be at 1, 3 and 5 years</td>
        </tr>
        <tr>
          <td className="vessel-name">TR4 moderately suspicious</td>
          <td>4 to 6</td>
          <td>1.5 cm or more</td>
          <td>1 cm or more</td>
          <td>1, 2, 3 and 5 years</td>
        </tr>
        <tr>
          <td className="vessel-name">TR5 highly suspicious</td>
          <td>7 or more</td>
          <td>1 cm or more</td>
          <td>0.5 cm or more</td>
          <td>Every year for up to 5 years</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const learn = [
  {
    id: 'big-idea',
    title: 'The big idea',
    body: (
      <>
        <p>Thyroid nodules are everywhere: up to 68% of adults have one on high-resolution ultrasound. Most are benign, and even many cancers under 1 cm behave indolently. In the United States, overdiagnosis accounted for 70% to 80% of thyroid cancer cases in women and 45% in men between 2003 and 2007 (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        <p>So your report does not answer "is this cancer?" It answers: <strong>does this nodule need FNA, follow-up ultrasound, or nothing?</strong> ACR TI-RADS turns five ultrasound features into points, the points into a level from TR1 to TR5, and the level plus the maximum diameter into a recommendation. The committee said plainly that diagnosing every thyroid malignancy should not be the goal.</p>
        <p>The levels carry these cancer risks in the committee's data: no more than 2% for TR1 and TR2, 5% for TR3, 5% to 20% for TR4, and at least 20% for TR5 (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>). In 3,422 nodules (352 malignant), the aggregate risk of malignancy increased as the point total rose from 0 to 10 (<Cite doi={MIDDLETON}>Middleton et al., AJR 2017</Cite>).</p>
        <p>Applied to 100 proven nodules by eight radiologists, ACR TI-RADS cut the nodules recommended for biopsy from a mean of 80 to 57, and raised specificity from 20% to 44% while sensitivity went from 95% to 92%. Most cancers not sent for biopsy still met criteria for follow-up: only 3 of 120 malignancy encounters got neither (<Cite doi={BIOPSY_REDUCTION}>Hoang et al., Radiology 2018</Cite>).</p>
        <div className="lesson-key">
          <p>The recommendations are guidance, not standards. The decision to do FNA also weighs the referring physician's preference and the patient's risk factors, anxiety, comorbidities and life expectancy (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>). ACR TI-RADS is for adults.</p>
        </div>
      </>
    ),
  },
  {
    id: 'images',
    title: 'Which images to trust',
    body: (
      <>
        <p>Every feature is read from gray-scale images, in a set plane:</p>
        <ul className="plain-list">
          <li><strong>Shape</strong> is judged on a transverse (axial) image: height is measured parallel to the sound beam, width perpendicular to it. It is usually obvious by eye and rarely needs formal measurements.</li>
          <li><strong>Size</strong> comes from three axes: the maximum dimension on an axial image, the maximum dimension perpendicular to it on the same image, and the maximum longitudinal dimension on a sagittal image. Include the halo if there is one. For an obliquely oriented nodule these may differ from the shape measurements; that rarely matters.</li>
          <li><strong>Echogenicity</strong> is compared with the adjacent thyroid, except "very hypoechoic", which is compared with the strap muscles.</li>
          <li><strong>Color Doppler</strong> has not been shown to reliably separate benign from malignant nodules. Use it to tell tissue from debris: flow in a solid component means tissue. Debris may layer or move when the patient changes position.</li>
          <li>Video clips help show how nodules relate to each other and to nearby structures.</li>
        </ul>
        <p>Elastography is promising but is not part of ACR TI-RADS (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>). The terms themselves come from the ACR lexicon (<Cite doi={LEXICON}>Grant et al., JACR 2015</Cite>).</p>
        <div className="lesson-key">
          <p>Ask about any prior FNA or ethanol ablation: both can make a nodule look suspicious on a later scan (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        </div>
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Step-by-step search pattern',
    body: (
      <>
        <p>Pick one answer in each of the first four categories and every answer that applies in the fifth, then add the points (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        {pointsTable}

        <div className="lesson-step">
          <h4>Step 1. Find it and label it</h4>
          <p>Number every nodule you will follow, in sequence, and label its location: right, left or isthmus; upper, mid or lower; and, if needed, lateral, medial, anterior or posterior. Follow no more than four nodules, those with the highest point scores that are below the FNA size; the rest can be reassessed on later scans without being listed.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Measure in three axes</h4>
          <p>Maximum axial, perpendicular axial on the same image, and maximum longitudinal on sagittal, including any halo. The <strong>maximum dimension</strong> decides whether the nodule is biopsied or followed, so measure the same way every time.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Composition</h4>
          <ul className="plain-list">
            <li>Cystic or almost completely cystic: 0. These are almost universally benign.</li>
            <li>Spongiform: 0, and <strong>do not add points from the other categories</strong>. Spongiform means more than 50% small cystic spaces. A few scattered cysts in an otherwise solid nodule do not make it spongiform.</li>
            <li>Mixed cystic and solid: 1. Score the other features on the solid part. Solid material that is eccentric with an acute angle to the wall is suspicious, as is solid material that is hypoechoic, lobulated or has punctate echogenic foci.</li>
            <li>Solid or almost completely solid: 2. If shadowing calcification hides the inside, assume solid (2) and give 1 point for echogenicity.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Echogenicity</h4>
          <p>Anechoic 0 (only for cystic or almost completely cystic nodules, which would otherwise score 3 for looking very hypoechoic); hyperechoic or isoechoic 1; hypoechoic 2; very hypoechoic (darker than the strap muscles) 3. If you cannot tell, give 1.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Shape</h4>
          <p>Taller-than-wide on a transverse image scores 3. It is an insensitive but highly specific sign of malignancy.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Margin</h4>
          <ul className="plain-list">
            <li>Smooth 0; ill-defined 0; cannot be determined 0. A halo is not scored.</li>
            <li>Lobulated or irregular 2: a spiculated or jagged edge, with or without protrusions into the thyroid around it.</li>
            <li>Extrathyroidal extension 3. Frank invasion of soft tissue or vessels is a highly reliable sign of malignancy. Minimal extension (abutment, contour bulge, lost echogenic border) is controversial: be cautious reporting it, especially in an otherwise benign-looking nodule.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Echogenic foci (all that apply)</h4>
          <ul className="plain-list">
            <li>None, or large comet-tail artifacts (V-shaped, more than 1 mm, in cystic parts; they mean colloid): 0.</li>
            <li>Macrocalcifications (coarse, shadowing): 1.</li>
            <li>Peripheral (rim) calcifications, complete or incomplete: 2. Interrupted rim calcification with soft tissue pushing out counts as a lobulated margin, for another 2 points.</li>
            <li>Punctate echogenic foci (smaller, non-shadowing, may have small comet tails in solid parts): 3. In a spongiform nodule they are the back walls of tiny cysts and add nothing.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Add the points, then apply the size</h4>
          <p>0 points is TR1, 2 is TR2, 3 is TR3, 4 to 6 is TR4, 7 or more is TR5. Then compare the maximum diameter with that level's FNA and follow-up sizes (see Categories and management).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 9. Compare with earlier scans</h4>
          <p>Significant enlargement is a 20% increase in at least two dimensions with a minimum increase of 2 mm, or a 50% or greater increase in volume. Growth can be missed against the last scan alone, so also look at earlier ones. If the TI-RADS level has gone up, the next scan is in 1 year, whatever the starting level.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 10. Cervical lymph nodes</h4>
          <p>Every thyroid ultrasound includes the neck nodes. Suspicious features: a globular shape, loss of the echogenic hilum, peripheral rather than hilar flow, heterogeneity with cystic parts, and punctate echogenic foci. FNA a suspicious node, in addition to up to two nodules that meet TI-RADS criteria (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        </div>
      </>
    ),
  },
  {
    id: 'categories',
    title: 'Categories and management',
    body: (
      <>
        {levelsTable}
        <p>A nodule can score 0 and be TR1, but every other nodule gets at least 2 points: a mixed cystic and solid nodule (1 point) always gains at least 1 more for the echogenicity of its solid part. There is no TR0 and there are no subcategories (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        <ul className="plain-list">
          <li><strong>Why the high size cutoffs?</strong> Ultrasound tends to measure nodules larger than pathology does. In 205 papillary cancers, the mean was 2.65 cm on ultrasound against 1.97 cm on pathology. SEER data showed a slight rise in distant metastases at 2.5 cm.</li>
          <li><strong>Follow-up</strong> intervals under 1 year are not warranted, except for proven cancers under active surveillance. Imaging can stop at 5 years if the size has not changed. A nodule that has grown significantly but is still below its FNA size at 5 years probably needs continued follow-up.</li>
          <li><strong>TR5 nodules of 5 to 9 mm</strong> are followed every year. Because some specialists offer active surveillance, ablation or lobectomy for papillary microcarcinoma, FNA may be appropriate in some circumstances, by shared decision making. The report should then say whether the nodule can be measured reproducibly, and whether it abuts the trachea or lies next to the tracheoesophageal groove (the recurrent laryngeal nerve).</li>
          <li><strong>How many to biopsy:</strong> no more than two, those with the highest point totals that meet FNA criteria, even if they are not the largest. Size is not the primary criterion, and the term "dominant nodule" is discouraged. A gland replaced by many confluent, similar nodules usually does not need FNA.</li>
        </ul>
        <p>The committee did not address follow-up of nodules already sampled; repeat biopsy is guided by the prior Bethesda result (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
      </>
    ),
  },
  {
    id: 'report',
    title: 'What the report must contain',
    body: (
      <>
        <ul className="plain-list">
          <li>Each followed nodule numbered, with its location.</li>
          <li>Three measurements, with the maximum dimension clear.</li>
          <li>The five features, the point total and the TR level.</li>
          <li>The recommendation: FNA, follow-up ultrasound (with its timing) or none.</li>
          <li>Comparison with earlier scans, not just the last one, using the ACR definition of growth.</li>
          <li>The cervical lymph nodes.</li>
          <li>For a 5-9 mm TR5 nodule: whether it can be measured reproducibly and whether it abuts the trachea or the tracheoesophageal groove.</li>
        </ul>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>ACR TI-RADS was built to work as a structured template in voice recognition reporting (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>). "Ill-defined" is in the margin list so that a margin field is never left empty (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
      </>
    ),
  },
  {
    id: 'pitfalls',
    title: 'Pitfalls and mimics',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>Calling a solid nodule spongiform</strong> because of a few scattered cysts. Spongiform needs more than 50% small cystic spaces, and scoring it drops the nodule to 0.</li>
          <li><strong>Scoring the foci in a spongiform nodule.</strong> Small echogenic foci there are the back walls of tiny cysts and add nothing.</li>
          <li><strong>Large comet tails versus punctate foci.</strong> Large V-shaped comet tails (more than 1 mm) in cystic parts mean colloid and score 0; punctate foci in solid parts score 3.</li>
          <li><strong>Ill-defined is not irregular.</strong> Ill-defined scores 0; lobulated or irregular (jagged, spiculated, protrusions) scores 2. Irregularity is hard to see in an ill-defined nodule, in a heterogeneous gland, or where nodules abut.</li>
          <li><strong>Minimal extrathyroidal extension.</strong> Pathologists agree poorly on it and its significance is debated. Frank invasion is what the 3 points are for.</li>
          <li><strong>Debris or hemorrhage mistaken for a solid part.</strong> Flow on color Doppler shows tissue; layering or movement with position shows debris.</li>
          <li><strong>Prior FNA or ethanol ablation</strong> can make a benign nodule look suspicious.</li>
          <li><strong>Benign Hashimoto patterns</strong>: a uniformly hyperechoic "white knight" nodule and a giraffe-hide pattern are reliably benign, but are not part of the chart (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</li>
        </ul>
        <p>Readers disagree most on margin and on echogenic foci other than macrocalcifications (kappa 0.25 to 0.39). Agreement on biopsy recommendations was fair (kappa 0.22) from readers' own practice, and moderate (0.51) once ACR TI-RADS was applied (<Cite doi={INTEROBSERVER}>Hoang et al., AJR 2018</Cite>). Sonographers showed only slight agreement on margin (kappa 0.18) and large comet-tail artifacts (0.08) (<Cite doi={SONOGRAPHERS}>Wildman-Tobriner et al., Ultrasound Med Biol 2020</Cite>).</p>
      </>
    ),
  },
  {
    id: 'cases',
    title: 'Cases and further reading',
    body: (
      <ul className="plain-list">
        <li><strong>Tessler et al., JACR 2017.</strong> The white paper, with the chart and its explanatory notes; online figures show a falsely "spongiform" nodule and the three measurements. <Cite doi={WHITE_PAPER}>doi:{WHITE_PAPER}</Cite></li>
        <li><strong>Tessler, Middleton and Grant, Radiology 2018.</strong> A user's guide to applying ACR TI-RADS in practice. <Cite doi={USERS_GUIDE}>doi:{USERS_GUIDE}</Cite></li>
        <li><strong>Grant et al., JACR 2015.</strong> The lexicon behind every term in the chart. <Cite doi={LEXICON}>doi:{LEXICON}</Cite></li>
        <li><strong>Hoang et al., AJR 2018.</strong> The 100 nodules eight radiologists disagreed on, feature by feature. <Cite doi={INTEROBSERVER}>doi:{INTEROBSERVER}</Cite></li>
        <li><strong>Wildman-Tobriner et al., Radiology 2019.</strong> An AI-optimized point scheme that set six features to zero points and raised specificity from 47% to 65% for an expert reader; it is not the ACR chart. <Cite doi={AI_TIRADS}>doi:{AI_TIRADS}</Cite></li>
      </ul>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'thyroid-us',
  name: 'Thyroid ultrasound (TI-RADS)',
  lede: 'Score a thyroid nodule feature by feature, apply the size thresholds, and write the report with the recommendation in the impression.',
  sourceNote: 'Draft lesson compiled from the ACR TI-RADS white paper (2017) and the papers below; citations checked against PubMed in September 2026. Not yet reviewed by the site author.',
  references,
  report: {
    steps: [
      {
        id: 'location',
        title: 'Step 1. Find it and label it',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Number every nodule you will follow, in sequence, and label its location: right, left or isthmus; upper, mid or lower; and, if needed, lateral, medial, anterior or posterior. Follow no more than four nodules, those with the highest point scores below the FNA size (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
            <p>Ask about prior FNA or ethanol ablation: both can make a nodule look suspicious later.</p>
          </>
        ),
        fields: [fields.number, fields.side, fields.level, fields.position, fields.priorFna],
        derive: deriveLocation,
      },
      {
        id: 'size',
        title: 'Step 2. Measure in three axes',
        learn: 'images',
        teach: (
          <p>Maximum dimension on an axial image, maximum dimension perpendicular to it on the same image, and maximum longitudinal dimension on a sagittal image. Include the halo. The maximum dimension decides whether the nodule is biopsied or followed (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        ),
        fields: [fields.dimAp, fields.dimPerp, fields.dimLong],
        derive: deriveSize,
      },
      {
        id: 'composition',
        title: 'Step 3. Composition',
        learn: 'search-pattern',
        teach: (
          <ul className="plain-list">
            <li>Cystic or almost completely cystic 0; spongiform 0; mixed cystic and solid 1; solid or almost completely solid 2.</li>
            <li>Spongiform: more than 50% small cystic spaces. <strong>Do not add further points for other categories.</strong> A few scattered cysts in a solid nodule do not make it spongiform.</li>
            <li>Mixed: score the other features on the solid part.</li>
            <li>Shadowing calcification hiding the inside: assume solid (2) and give 1 point for echogenicity (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</li>
          </ul>
        ),
        fields: [fields.composition],
        derive: deriveComposition,
      },
      {
        id: 'echogenicity',
        title: 'Step 4. Echogenicity',
        learn: 'search-pattern',
        teach: (
          <p>Anechoic 0 (cystic or almost completely cystic nodules only); hyperechoic or isoechoic 1; hypoechoic 2; very hypoechoic 3. Compare with the adjacent thyroid, except very hypoechoic, which is darker than the strap muscles. If you cannot tell, give 1 (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        ),
        fields: [fields.echogenicity],
        derive: deriveEchogenicity,
      },
      {
        id: 'shape',
        title: 'Step 5. Shape',
        learn: 'search-pattern',
        teach: (
          <p>On a transverse image, compare height (parallel to the beam) with width (perpendicular to it). Taller-than-wide scores 3: insensitive, but highly specific for malignancy. It is usually obvious by eye (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        ),
        fields: [fields.shape],
        derive: deriveShape,
      },
      {
        id: 'margin',
        title: 'Step 6. Margin',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Smooth 0, ill-defined 0, cannot be determined 0; lobulated or irregular (jagged, spiculated, protrusions) 2; extrathyroidal extension 3. A halo is not scored.</p>
            <p>Frank invasion is a highly reliable sign of malignancy. Minimal extension (abutment, bulge, lost border) is controversial: be cautious reporting it in an otherwise benign-looking nodule (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>). Margin is the feature readers agree on least (<Cite doi={INTEROBSERVER}>Hoang et al., AJR 2018</Cite>).</p>
          </>
        ),
        fields: [fields.margin, fields.ete],
        derive: deriveMargin,
      },
      {
        id: 'foci',
        title: 'Step 7. Echogenic foci (all that apply)',
        learn: 'search-pattern',
        teach: (
          <ul className="plain-list">
            <li>None, or large comet-tail artifacts (V-shaped, more than 1 mm, in cystic parts; colloid): 0.</li>
            <li>Macrocalcifications (coarse, shadowing): 1.</li>
            <li>Peripheral (rim) calcifications: 2. Interrupted rim with soft tissue pushing out also counts as a lobulated margin.</li>
            <li>Punctate echogenic foci (non-shadowing): 3 (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</li>
          </ul>
        ),
        fields: [fields.fociPresent, fields.foci],
        derive: deriveFoci,
      },
      {
        id: 'category',
        title: 'Step 8. Add the points, then apply the size',
        learn: 'categories',
        teach: (
          <>
            <p>0 points TR1, 2 TR2, 3 TR3, 4 to 6 TR4, 7 or more TR5. FNA if TR3 is 2.5 cm or more, TR4 1.5 cm or more, TR5 1 cm or more. Follow if TR3 is 1.5 cm or more, TR4 1 cm or more, TR5 0.5 cm or more. TR1 and TR2: no FNA (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
            <p>For a 5-9 mm TR5 nodule, FNA may be appropriate by shared decision making; say whether it can be measured reproducibly and whether it abuts the trachea or the tracheoesophageal groove.</p>
          </>
        ),
        fields: [fields.reproducible, fields.critical],
        derive: deriveCategory,
      },
      {
        id: 'comparison',
        title: 'Step 9. Compare with earlier scans',
        learn: 'categories',
        teach: (
          <>
            <p>Significant enlargement: a 20% increase in at least two dimensions with a minimum increase of 2 mm, or a 50% or greater increase in volume. Compare with earlier scans too, not only the last one.</p>
            <p>If the level has gone up, the next scan is in 1 year. Imaging can stop at 5 years if the size is unchanged (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
          </>
        ),
        fields: [fields.priorDate, fields.priorAp, fields.priorPerp, fields.priorLong, fields.levelChange, fields.years],
        derive: deriveComparison,
      },
      {
        id: 'nodes',
        title: 'Step 10. Cervical lymph nodes',
        learn: 'search-pattern',
        teach: (
          <p>Every thyroid ultrasound includes the neck nodes. Suspicious: globular shape, loss of the echogenic hilum, peripheral rather than hilar flow, heterogeneity with cystic parts, punctate echogenic foci. FNA a suspicious node, in addition to up to two nodules that meet TI-RADS criteria (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>
        ),
        fields: [fields.nodes, fields.nodeFeatures, fields.nodeSite, fields.other],
        derive: deriveNodes,
      },
    ],
    build,
  },
  learn,
  quiz: [
    {
      id: 'spongiform-foci',
      question: 'A 2.2 cm nodule is more than 50% small cystic spaces, isoechoic, with a few tiny echogenic foci. What is its ACR TI-RADS level?',
      options: ['TR1', 'TR2', 'TR4', 'TR5'],
      answer: 0,
      explanation: <p>Spongiform scores 0 and no further points are added for other categories. Small echogenic foci in a spongiform nodule probably represent the back walls of minute cysts and should not add to the total (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'tr4-size',
      question: 'A solid, hypoechoic, wider-than-tall nodule with smooth margins and no echogenic foci measures 1.2 cm. What do you recommend?',
      options: ['FNA', 'Follow-up ultrasound', 'No FNA or follow-up', 'Repeat ultrasound in 6 months'],
      answer: 1,
      explanation: <p>Solid 2 + hypoechoic 2 = 4 points, TR4. TR4 is followed at 1 cm or more and sampled at 1.5 cm or more, so 1.2 cm gets follow-up at 1, 2, 3 and 5 years. Intervals under 1 year are not warranted (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'tr3-thresholds',
      question: 'What are the FNA and follow-up sizes for a TR3 nodule?',
      options: ['FNA 1.5 cm, follow 1 cm', 'FNA 1 cm, follow 0.5 cm', 'FNA 2 cm, follow 1 cm', 'FNA 2.5 cm, follow 1.5 cm'],
      answer: 3,
      explanation: <p>TR3: FNA if 2.5 cm or more, follow if 1.5 cm or more. The committee set these higher than other systems partly because ultrasound tends to measure nodules larger than pathology does (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'growth',
      question: 'By ACR TI-RADS, which change counts as significant enlargement?',
      options: ['Any increase of 2 mm in one dimension', 'A 20% increase in at least two dimensions with a minimum increase of 2 mm, or a 50% or greater increase in volume', 'A 10% increase in volume', 'A 50% increase in the maximum dimension only'],
      answer: 1,
      explanation: <p>Significant enlargement is a 20% increase in at least two dimensions with a minimal increase of 2 mm, or a 50% or greater increase in volume. Review earlier scans as well as the last one, or growth can be missed (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'shadowing',
      question: 'Dense shadowing calcification prevents you from assessing a nodule\'s composition and echogenicity. How do you score those two categories?',
      options: ['0 and 0: cannot be scored', 'Mixed (1) and hypoechoic (2)', 'Solid (2) and 1 point for echogenicity', 'Solid (2) and very hypoechoic (3)'],
      answer: 2,
      explanation: <p>It is best to assume the nodule is solid and assign 2 points for composition and 1 point for echogenicity (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'how-many',
      question: 'Four nodules in one gland meet FNA criteria. Which should be sampled?',
      options: ['The two with the highest point totals', 'The largest ("dominant") nodule', 'All four', 'The two largest'],
      answer: 0,
      explanation: <p>Target no more than two nodules with the highest ACR TI-RADS point totals that meet FNA criteria, even if they are not the largest. Size should not be the primary criterion, and the term "dominant nodule" is discouraged (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'tr5-small',
      question: 'A TR5 nodule measures 7 mm. Which statement matches ACR TI-RADS?',
      options: ['FNA is required: TR5 is always sampled', 'No follow-up: it is under 1 cm', 'Surgery referral without FNA', 'Follow it every year for up to 5 years; FNA may be appropriate by shared decision making'],
      answer: 3,
      explanation: <p>TR5 is followed at 0.5 cm or more and sampled at 1 cm or more. For 5-9 mm TR5 nodules, biopsy may be appropriate in some circumstances; the report should say whether the nodule can be measured reproducibly and whether it abuts the trachea or the tracheoesophageal groove (<Cite doi={WHITE_PAPER}>Tessler et al., JACR 2017</Cite>).</p>,
    },
    {
      id: 'margin-agreement',
      question: 'In the study of eight radiologists reading 100 nodules, which features had the poorest agreement?',
      options: ['Shape and macrocalcifications', 'Composition and echogenicity', 'Margin and echogenic foci other than macrocalcifications', 'Size and shape'],
      answer: 2,
      explanation: <p>Margin and echogenic foci other than macrocalcifications had fair agreement only (kappa 0.25 to 0.39); shape (0.61) and macrocalcifications (0.73) agreed best. Applying ACR TI-RADS still improved agreement on biopsy recommendations from 0.22 to 0.51 (<Cite doi={INTEROBSERVER}>Hoang et al., AJR 2018</Cite>).</p>,
    },
  ],
}

export function ThyroidUsStudyPage() {
  return <StudyPage study={study} />
}
