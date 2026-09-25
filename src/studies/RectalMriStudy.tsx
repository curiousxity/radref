import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'MERCURY Study Group. Extramural depth of tumor invasion at thin-section MR in patients with rectal cancer: results of the MERCURY study. Radiology 2007.', doi: '10.1148/radiol.2431051825' },
  { citation: 'Taylor FG et al. Preoperative MRI assessment of circumferential resection margin predicts disease-free survival and local recurrence (MERCURY). J Clin Oncol 2014.', doi: '10.1200/JCO.2012.45.3258' },
  { citation: 'ESGAR. MRI to guide clinical management of rectal cancer: updated consensus recommendations from ESGAR, part I primary staging. Eur Radiol 2026.', doi: '10.1007/s00330-025-12274-w' },
  { citation: 'Nougaret S et al. The use of MR imaging in treatment planning for patients with rectal carcinoma: DISTANCE. Radiology 2013.', doi: '10.1148/radiol.13121361' },
  { citation: 'Smith NJ et al. MRI for detection of extramural vascular invasion in rectal cancer. AJR 2008.', doi: '10.2214/AJR.08.1298' },
  { citation: 'Lord AC et al. Assessment of the 2020 NICE criteria for preoperative radiotherapy in patients with rectal cancer treated by surgery alone in comparison with proven MRI prognostic factors. Lancet Oncol 2022.', doi: '10.1016/S1470-2045(22)00214-5' },
  { citation: 'Beets-Tan RGH et al. MRI for clinical management of rectal cancer: ESGAR consensus 2016. Eur Radiol 2018.', doi: '10.1007/s00330-017-5026-2' },
  { citation: 'Rutegård MK et al. Evaluation of MRI characterisation of histopathologically matched lymph nodes and other mesorectal nodal structures in rectal cancer. Eur Radiol 2025.', doi: '10.1007/s00330-025-11361-2' },
  { citation: 'Ogura A et al. Neoadjuvant (chemo)radiotherapy with total mesorectal excision only is not sufficient to prevent lateral local recurrence in enlarged nodes (Lateral Node Study). J Clin Oncol 2019.', doi: '10.1200/JCO.18.00032' },
  { citation: 'Lambregts DMJ et al. Current controversies in TNM for the radiological staging of rectal cancer. Eur Radiol 2022.', doi: '10.1007/s00330-022-08591-z' },
  { citation: 'Hope TA et al. Rectal cancer lexicon: consensus statement from the Society of Abdominal Radiology rectal and anal cancer disease-focused panel. Abdom Radiol 2019.', doi: '10.1007/s00261-019-02170-5' },
  { citation: 'Lee S et al. Rectal cancer lexicon 2023 revised and updated consensus statement from the Society of Abdominal Radiology. Abdom Radiol 2023.', doi: '10.1007/s00261-023-03893-2' },
  { citation: 'Horvat N et al. MRI of rectal cancer: tumor staging, imaging techniques, and management. RadioGraphics 2019.', doi: '10.1148/rg.2019180114' },
  { citation: 'Fraum TJ et al. The optimized rectal cancer MRI protocol: choosing the right sequences, sequence parameters, and preparatory strategies. Abdom Radiol 2023.', doi: '10.1007/s00261-023-03850-z' },
]

const reportTemplate = `Location: __ cm from [anal verge/anorectal junction]; length __ cm;
  clock position __; [above/straddles/below] peritoneal reflection
Morphology: [polypoid/annular/semi-annular]; mucinous [yes/no]
T category: __ ; extramural depth __ mm
Sphincter/anal canal: [not involved / layers involved]
MRF: [clear / involved]; shortest distance __ mm at __ o'clock,
  due to [tumor/EMVI/deposit/irregular node]
EMVI: [absent/present]
Mesorectal nodes/deposits: [describe]; lateral nodes: side, site, short axis
Impression: mrT__ N[0/possibly +/+], MRF [+/-], EMVI [+/-], [anal+]`

/* Option sets, shared by the fields and the report wording. */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const landmarkField = {
  options: [
    { value: 'av', label: 'Anal verge' },
    { value: 'arj', label: 'Anorectal junction' },
  ],
}

const reflectionField = {
  options: [
    { value: 'above', label: 'Above' },
    { value: 'straddles', label: 'Straddles' },
    { value: 'below', label: 'Below' },
  ],
}

const morphologyField = {
  options: [
    { value: 'polypoid', label: 'Polypoid' },
    { value: 'annular', label: 'Annular' },
    { value: 'semi', label: 'Semi-annular' },
  ],
}

const muscleField = {
  options: [
    { value: 'intact', label: 'Intact' },
    { value: 'strands', label: 'Thin spiky strands only' },
    { value: 'breach', label: 'Broad or nodular breach' },
  ],
}

const t4Field = {
  options: [
    { value: 'none', label: 'No' },
    { value: 't4a', label: 'T4a: peritoneal reflection' },
    { value: 't4b', label: 'T4b: organ or muscle' },
  ],
}

const mrfCauseField = {
  options: [
    { value: 'tumor', label: 'Tumor' },
    { value: 'emvi', label: 'EMVI' },
    { value: 'deposit', label: 'Tumor deposit' },
    { value: 'irregular', label: 'Irregular node' },
  ],
}

const mrfStatusField = {
  options: [
    { value: 'clear', label: 'Clear' },
    { value: 'involved', label: 'Involved' },
  ],
}

const emviField = {
  options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
  ],
}

const nodeFeatureField = {
  options: [
    { value: 'round', label: 'Round' },
    { value: 'irregular', label: 'Irregular border' },
    { value: 'mixed', label: 'Mixed signal' },
  ],
}

const nConfidenceField = {
  options: [
    { value: 'n0', label: 'cN0' },
    { value: 'possible', label: 'Possibly cN+' },
    { value: 'npos', label: 'cN+' },
  ],
}

const lateralSideField = {
  options: [
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' },
    { value: 'bilateral', label: 'Bilateral' },
  ],
}

const lateralSiteField = {
  options: [
    { value: 'obturator', label: 'Obturator' },
    { value: 'internal', label: 'Internal iliac' },
  ],
}

const distantNodeField = {
  options: [
    { value: 'common', label: 'Common iliac' },
    { value: 'external', label: 'External iliac' },
    { value: 'inguinal', label: 'Inguinal' },
  ],
}

const layerField = {
  options: [
    { value: 'is', label: 'Internal sphincter' },
    { value: 'ias', label: 'Intersphincteric space' },
    { value: 'es', label: 'External sphincter' },
    { value: 'levator', label: 'Levator' },
  ],
}

/* Rules the lesson states. */

/** Step 2: "T3a under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm." */
function t3Substage(depth: number): string {
  if (depth < 1) return 'T3a'
  if (depth <= 5) return 'T3b'
  if (depth <= 15) return 'T3c'
  return 'T3d'
}

/** The T category, or '' when the wall has not been assessed. T4 overrides the depth. */
function tCategory(values: Values): string {
  const t4 = str(values, 't4')
  if (t4 === 't4b') return 'T4b'
  if (t4 === 't4a') return 'T4a'
  const muscle = str(values, 'muscle')
  if (muscle === 'intact' || muscle === 'strands') return 'T1–2'
  if (muscle === 'breach') {
    const depth = num(values, 'emd')
    return depth === undefined ? 'T3' : t3Substage(depth)
  }
  return ''
}

/**
 * Step 3: "1 mm or less means involved", counting tumor, a vein with tumor or an irregular
 * nodule. "A smooth node touching the fascia does not count", so it is not offered as the
 * closest structure. Undefined when not measured.
 */
function mrfByDistance(values: Values): 'involved' | 'clear' | undefined {
  const distance = num(values, 'mrf-dist')
  if (distance === undefined) return undefined
  return distance <= 1 ? 'involved' : 'clear'
}

/**
 * Step 5 (ESGAR): short axis 9 mm or more suspicious; 5–8 mm needs two of round, irregular
 * border, mixed signal; under 5 mm needs all three. Undefined when no size is entered.
 */
function nodeSuspicious(values: Values): boolean | undefined {
  const size = num(values, 'node-size')
  if (size === undefined) return undefined
  const features = list(values, 'node-features').length
  if (size >= 9) return true
  if (size >= 5) return features >= 2
  return features >= 3
}

function anal(values: Values): boolean {
  return str(values, 'anal') === 'yes'
}

/** Step 5: common and external iliac nodes, and inguinal nodes unless the tumor reaches the anal canal, are M1. */
function m1Nodes(values: Values): string[] {
  return list(values, 'distant-nodes')
    .filter((site) => site !== 'inguinal' || !anal(values))
    .map((site) => optionLabel(distantNodeField, site).toLowerCase())
}

function lateralSuspicious(values: Values): boolean | undefined {
  const size = num(values, 'lat-size')
  return size === undefined ? undefined : size >= 7
}

function mrfStatus(values: Values): string {
  return str(values, 'mrf') || mrfByDistance(values) || ''
}

/* Fields. Declared once so the report can read their labels. */

const fields = {
  sigmoid: { id: 'sigmoid', kind: 'choice', label: 'Starts above the sigmoid take-off?', options: yesNo, help: 'Above the take-off it is a sigmoid cancer.' },
  height: { id: 'height', kind: 'number', label: 'Height to lower edge of tumor', unit: 'cm', min: 0, required: true },
  landmark: { id: 'landmark', kind: 'choice', label: 'Measured from', ...landmarkField, required: true },
  length: { id: 'length', kind: 'number', label: 'Tumor length', unit: 'cm', min: 0, required: true },
  clock: { id: 'clock', kind: 'text', label: 'Clock position', placeholder: 'e.g. 2 to 7 o\'clock', help: '12 o\'clock is anterior.', required: true },
  reflection: { id: 'reflection', kind: 'choice', label: 'Anterior peritoneal reflection', ...reflectionField, required: true },
  morphology: { id: 'morphology', kind: 'choice', label: 'Morphology', ...morphologyField },
  mucinous: { id: 'mucinous', kind: 'choice', label: 'Mucinous (very bright on T2)?', options: yesNo },
  muscle: { id: 'muscle', kind: 'choice', label: 'Dark muscle line', ...muscleField, required: true },
  emd: { id: 'emd', kind: 'number', label: 'Extramural depth beyond the muscle', unit: 'mm', min: 0, required: true, showIf: (v) => str(v, 'muscle') === 'breach', help: 'T3a <1, T3b 1–5, T3c >5–15, T3d >15 mm.' },
  t4: { id: 't4', kind: 'choice', label: 'T4?', ...t4Field },
  t4Organ: { id: 't4-organ', kind: 'text', label: 'Organ or muscle invaded', placeholder: 'e.g. levator, prostate', showIf: (v) => str(v, 't4') === 't4b' },
  mrfDist: { id: 'mrf-dist', kind: 'number', label: 'Shortest distance to MRF', unit: 'mm', min: 0, required: true, help: '1 mm or less means involved.' },
  mrfClock: { id: 'mrf-clock', kind: 'text', label: 'At clock position', placeholder: 'e.g. 3 o\'clock', required: true },
  mrfCause: { id: 'mrf-cause', kind: 'choice', label: 'Closest structure', ...mrfCauseField, help: 'A smooth node touching the fascia does not count.' },
  mrf: { id: 'mrf', kind: 'choice', label: 'MRF', ...mrfStatusField, required: true },
  emvi: { id: 'emvi', kind: 'choice', label: 'EMVI', ...emviField, required: true },
  nodeSize: { id: 'node-size', kind: 'number', label: 'Most suspicious mesorectal node, short axis', unit: 'mm', min: 0 },
  nodeFeatures: { id: 'node-features', kind: 'multi', label: 'Its features', ...nodeFeatureField, showIf: (v) => num(v, 'node-size') !== undefined },
  nodeText: { id: 'node-text', kind: 'text', label: 'Mesorectal nodes (describe)', placeholder: 'e.g. three nodes, largest 6 mm, left lateral', multiline: true },
  nConfidence: { id: 'n-conf', kind: 'choice', label: 'Node call', ...nConfidenceField, required: true },
  deposits: { id: 'deposits', kind: 'choice', label: 'Tumor deposits', ...emviField },
  depositText: { id: 'deposit-text', kind: 'text', label: 'Deposits (describe)', placeholder: 'number, site', showIf: (v) => str(v, 'deposits') === 'present' },
  lateral: { id: 'lateral', kind: 'choice', label: 'Lateral nodes seen?', options: yesNo },
  latSide: { id: 'lat-side', kind: 'choice', label: 'Side', ...lateralSideField, showIf: (v) => str(v, 'lateral') === 'yes' },
  latSite: { id: 'lat-site', kind: 'choice', label: 'Site', ...lateralSiteField, showIf: (v) => str(v, 'lateral') === 'yes' },
  latSize: { id: 'lat-size', kind: 'number', label: 'Largest lateral node, short axis', unit: 'mm', min: 0, showIf: (v) => str(v, 'lateral') === 'yes', help: '7 mm or more is suspicious.' },
  distantNodes: { id: 'distant-nodes', kind: 'multi', label: 'Suspicious nodes outside the regional field', ...distantNodeField, help: 'These count as M1, not N (inguinal only if the tumor does not reach the anal canal).' },
  analCanal: { id: 'anal', kind: 'choice', label: 'Anal canal involved?', options: yesNo },
  layers: { id: 'layers', kind: 'multi', label: 'Layers involved', ...layerField },
  lowest: { id: 'lowest', kind: 'text', label: 'How far down it goes', placeholder: 'e.g. to the upper third of the anal canal' },
} satisfies Record<string, Field>

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function locationLine(values: Values): string {
  const height = num(values, 'height')
  const landmark = str(values, 'landmark')
  const length = num(values, 'length')
  const clock = str(values, 'clock')
  const reflection = str(values, 'reflection')
  const body = join([
    height !== undefined && `${height} cm from ${landmark ? optionLabel(landmarkField, landmark).toLowerCase() : '[landmark not stated]'}`,
    length !== undefined && `length ${length} cm`,
    clock && `clock position ${clock}`,
    reflection && `${optionLabel(reflectionField, reflection).toLowerCase()} peritoneal reflection`,
  ])
  return body && `Location: ${body}`
}

function morphologyLine(values: Values): string {
  const morphology = str(values, 'morphology')
  const mucinous = str(values, 'mucinous')
  const body = join([
    morphology && optionLabel(morphologyField, morphology).toLowerCase(),
    mucinous && `mucinous ${mucinous}`,
  ])
  return body && `Morphology: ${body}`
}

function tLine(values: Values): string {
  const t = tCategory(values)
  const depth = num(values, 'emd')
  const organ = str(values, 't4-organ')
  const body = join([
    t && `${t}${t === 'T4b' && organ ? ` (${organ})` : ''}`,
    depth !== undefined && str(values, 'muscle') === 'breach' && `extramural depth ${depth} mm`,
  ])
  return body && `T category: ${body}`
}

function sphincterLine(values: Values): string {
  const analValue = str(values, 'anal')
  const layers = list(values, 'layers').map((layer) => optionLabel(layerField, layer).toLowerCase())
  const lowest = str(values, 'lowest')
  if (!analValue && layers.length === 0 && !lowest) return ''
  if (analValue === 'no' && layers.length === 0 && !lowest) return 'Sphincter/anal canal: not involved'
  const body = join([
    layers.length > 0 && `layers involved: ${layers.join(', ')}`,
    analValue === 'yes' && 'anal canal involved',
    analValue === 'no' && 'anal canal not involved',
    lowest && `lowest extent ${lowest}`,
  ])
  return `Sphincter/anal canal: ${body}`
}

function mrfLine(values: Values): string {
  const status = mrfStatus(values)
  const distance = num(values, 'mrf-dist')
  const clock = str(values, 'mrf-clock')
  const cause = str(values, 'mrf-cause')
  const where = distance !== undefined ? `shortest distance ${distance} mm${clock ? ` at ${clock}` : ''}` : clock && `closest at ${clock}`
  const causeLabel = optionLabel(mrfCauseField, cause)
  const due = cause && `due to ${cause === 'emvi' ? causeLabel : causeLabel.toLowerCase()}`
  const body = join([status, join([where, due], ', ')])
  return body && `MRF: ${body}`
}

function nodesLine(values: Values): string {
  const described = str(values, 'node-text')
  const size = num(values, 'node-size')
  const features = list(values, 'node-features').map((f) => optionLabel(nodeFeatureField, f).toLowerCase())
  const deposits = str(values, 'deposits')
  const depositText = str(values, 'deposit-text')
  const mesorectal = join(
    [
      described,
      size !== undefined && `most suspicious node ${size} mm short axis${features.length > 0 ? `, ${features.join(', ')}` : ''}`,
      deposits === 'absent' && 'no tumor deposits',
      deposits === 'present' && `tumor deposits present${depositText ? `: ${depositText}` : ''}`,
    ],
    '; ',
  )
  let lateral = ''
  if (str(values, 'lateral') === 'no') lateral = 'lateral nodes: none'
  if (str(values, 'lateral') === 'yes') {
    const side = str(values, 'lat-side')
    const site = str(values, 'lat-site')
    const latSize = num(values, 'lat-size')
    lateral = `lateral nodes: ${join([
      side && optionLabel(lateralSideField, side).toLowerCase(),
      site && optionLabel(lateralSiteField, site).toLowerCase(),
      latSize !== undefined && `${latSize} mm short axis${latSize >= 7 ? ' (suspicious)' : ''}`,
    ], ', ') || 'present'}`
  }
  const distant = list(values, 'distant-nodes').map((site) => optionLabel(distantNodeField, site).toLowerCase())
  const outside = distant.length > 0 && `suspicious ${distant.join(', ')} node(s)`
  const body = join([mesorectal, lateral, outside])
  return body && `Mesorectal nodes/deposits: ${body}`
}

function impression(values: Values): string {
  const t = tCategory(values)
  const n = str(values, 'n-conf')
  const nText = n === 'n0' ? 'N0' : n === 'possible' ? 'possibly N+' : n === 'npos' ? 'N+' : ''
  const mrf = mrfStatus(values)
  const emvi = str(values, 'emvi')
  const head = join(
    [
      join([t && `mr${t}`, nText], ' '),
      mrf && `MRF ${mrf === 'involved' ? '+' : '-'}`,
      emvi && `EMVI ${emvi === 'present' ? '+' : '-'}`,
      anal(values) && 'anal+',
    ],
    ', ',
  )
  const m1 = m1Nodes(values)
  const extras = [
    str(values, 'sigmoid') === 'yes' && 'Tumor starts above the sigmoid take-off: sigmoid cancer.',
    str(values, 'mucinous') === 'yes' && 'Mucinous tumor.',
    str(values, 'deposits') === 'present' && 'Tumor deposits present.',
    lateralSuspicious(values) === true && `Suspicious lateral node (${num(values, 'lat-size')} mm short axis).`,
    m1.length > 0 && `Suspicious ${m1.join(', ')} node(s): M1, not N.`,
  ]
  const body = lines(head, ...extras)
  return body && `Impression: ${body}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const byDistance = mrfByDistance(values)
  const status = str(values, 'mrf')
  const distance = num(values, 'mrf-dist')
  if (status === 'clear' && byDistance === 'involved') out.push(`MRF marked clear but the shortest distance is ${distance} mm (1 mm or less means involved).`)
  if (status === 'involved' && byDistance === 'clear') out.push(`MRF marked involved but the shortest distance is ${distance} mm (more than 1 mm).`)
  const layers = list(values, 'layers')
  if ((layers.includes('es') || layers.includes('levator')) && str(values, 't4') !== 't4b') {
    out.push('External sphincter or levator involved: that is T4b (skeletal muscle), but T4b is not selected.')
  }
  if (nodeSuspicious(values) === true && str(values, 'n-conf') === 'n0') {
    out.push('The most suspicious mesorectal node meets the ESGAR size/feature rule, but the node call is cN0.')
  }
  if (str(values, 't4') === 't4a' && str(values, 'reflection') === 'below') {
    out.push('T4a (reaches the peritoneal reflection) selected, but the tumor is marked below the reflection.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    locationLine(values),
    morphologyLine(values),
    tLine(values),
    sphincterLine(values),
    mrfLine(values),
    str(values, 'emvi') && `EMVI: ${str(values, 'emvi')}`,
    nodesLine(values),
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* Step-level rule chips. */

function deriveLocation(values: Values): Derived[] {
  const out: Derived[] = []
  if (str(values, 'sigmoid') === 'yes') out.push({ label: 'Site', value: 'Sigmoid cancer, not rectal', tone: 'warn' })
  if (str(values, 'mucinous') === 'yes') out.push({ label: 'Mucinous', value: 'Responds worse to treatment', tone: 'warn' })
  return out
}

function deriveT(values: Values): Derived[] {
  const t = tCategory(values)
  if (!t) return []
  const out: Derived[] = [{ label: 'T category', value: `mr${t}`, tone: t === 'T1–2' ? 'good' : 'warn' }]
  if (str(values, 'muscle') === 'strands' && t === 'T1–2') out.push({ label: 'Strands alone', value: 'Usually just scarring' })
  const depth = num(values, 'emd')
  if (str(values, 'muscle') === 'breach' && depth !== undefined && depth > 5) {
    out.push({ label: 'Depth > 5 mm', value: 'Usually means pre-op treatment', tone: 'warn' })
  }
  return out
}

function deriveMrf(values: Values): Derived[] {
  const byDistance = mrfByDistance(values)
  if (!byDistance) return []
  return [{ label: 'MRF by distance', value: byDistance === 'involved' ? 'Involved (1 mm or less)' : 'Clear (more than 1 mm)', tone: byDistance === 'involved' ? 'warn' : 'good' }]
}

function deriveEmvi(values: Values): Derived[] {
  return str(values, 'emvi') === 'present' ? [{ label: 'EMVI', value: 'Predicts distant metastases', tone: 'warn' }] : []
}

function deriveNodes(values: Values): Derived[] {
  const out: Derived[] = []
  const suspicious = nodeSuspicious(values)
  if (suspicious !== undefined) {
    out.push({ label: 'Mesorectal node (ESGAR)', value: suspicious ? 'Suspicious' : 'Criteria not met', tone: suspicious ? 'warn' : 'good' })
  }
  const lateral = lateralSuspicious(values)
  if (lateral !== undefined && str(values, 'lateral') === 'yes') {
    out.push({ label: 'Lateral node', value: lateral ? 'Suspicious (7 mm or more)' : 'Under 7 mm', tone: lateral ? 'warn' : 'good' })
  }
  const m1 = m1Nodes(values)
  if (m1.length > 0) out.push({ label: 'Outside the field', value: 'M1, not N', tone: 'warn' })
  if (list(values, 'distant-nodes').includes('inguinal') && anal(values)) {
    out.push({ label: 'Inguinal', value: 'Not M1: tumor reaches anal canal' })
  }
  return out
}

function deriveLow(values: Values): Derived[] {
  const out: Derived[] = []
  if (anal(values)) out.push({ label: 'Anal canal', value: 'anal+', tone: 'warn' })
  const layers = list(values, 'layers')
  if (layers.includes('es') || layers.includes('levator')) out.push({ label: 'Skeletal muscle', value: 'T4b', tone: 'warn' })
  return out
}

/* The lesson, section by section, verbatim. */

const learn = [
  {
    id: 'big-idea',
    title: 'The big idea',
    body: (
      <>
        <p>Rectal MRI is mostly one job done three ways: staging a new rectal cancer, restaging after treatment, and mapping perianal fistulas. This lesson covers the first, staging a new cancer, because everything else builds on it.</p>
        <p>The surgeon removes the rectum inside its fatty envelope, the mesorectum. The thin wrapper around that fat is the <strong>mesorectal fascia (MRF)</strong>, and that is the surgical cutting plane. Your report answers one question: can the surgeon cut along that plane and stay clear of tumor, or does the patient need chemo/radiation first?</p>
        <p>The MERCURY study showed MRI can answer this. MRI measured tumor spread beyond the wall to within 0.5 mm of pathology (<Cite doi="10.1148/radiol.2431051825">MERCURY, Radiology 2007</Cite>). A tumor within 1 mm of the MRF on MRI predicted local recurrence (hazard ratio 3.5) better than TNM stage did (<Cite doi="10.1200/JCO.2012.45.3258">Taylor et al., J Clin Oncol 2014</Cite>).</p>
      </>
    ),
  },
  {
    id: 'images',
    title: 'Which images to trust',
    body: (
      <>
        <p>The key series is the <strong>thin-slice T2 (3 mm or less, no fat sat), angled perpendicular to the tumor</strong>. If the angle is off, the wall looks falsely thick and you overstage. Sagittal T2 is for height and length. Coronal T2 is for low tumors and the sphincter. One large field-of-view series covers the pelvic side walls and groin nodes.</p>
        <p>DWI helps you find a small tumor, but the 2026 ESGAR update says it adds little to T stage, MRF, or node calls. Contrast is not needed, and rectal gel is no longer recommended (<Cite doi="10.1007/s00330-025-12274-w">ESGAR consensus update, Eur Radiol 2026</Cite>).</p>
        <div className="lesson-key">
          <p>On T2, normal wall shows a bright submucosa and a dark muscle layer (muscularis propria), with bright fat outside. Tumor is intermediate gray, brighter than muscle and darker than fat. A very bright tumor is mucinous. Say so in the report, because mucinous tumors respond worse to treatment.</p>
        </div>
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Step-by-step search pattern',
    body: (
      <>
        <p>The "DISTANCE" checklist is a helpful memory aid (<Cite doi="10.1148/radiol.13121361">Nougaret et al., Radiology 2013</Cite>).</p>

        <div className="lesson-step">
          <h4>Step 1. Find it and measure height (sagittal)</h4>
          <ul className="plain-list">
            <li>Measure from the anal verge or the anorectal junction to the lower edge of the tumor, and say which landmark you used.</li>
            <li>Give the tumor length and the clock-face position (12 o'clock is anterior).</li>
            <li>Say whether it is above, across, or below the anterior peritoneal reflection.</li>
            <li>The upper limit of the rectum is the <strong>sigmoid take-off</strong>, where the bowel sweeps forward away from the sacrum. A tumor starting above that is a sigmoid cancer.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. T stage (angled axial T2)</h4>
          <p>Follow the dark muscle line around the tumor.</p>
          <ul className="plain-list">
            <li>Line intact: T1 or T2. MRI cannot reliably separate the two, so report "T1–2."</li>
            <li>Gray tumor pushing through the line into fat with a broad or nodular front: T3. Thin spiky strands alone are usually just scarring.</li>
            <li>Measure how far tumor goes past the muscle: T3a under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm. More than 5 mm usually means pre-op treatment.</li>
            <li>T4a: reaches the peritoneal reflection. T4b: invades an organ or skeletal muscle (levator, puborectalis, external sphincter).</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 3. MRF distance</h4>
          <p>Measure the shortest gap between tumor and MRF, and give the clock position.</p>
          <ul className="plain-list">
            <li><strong>1 mm or less means involved.</strong> The old "threatened, 1–2 mm" category was dropped.</li>
            <li>Also count the MRF as involved if tumor in a vein or an irregular nodule is within 1 mm of it.</li>
            <li>A smooth node touching the fascia does not count.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. EMVI (tumor in veins outside the wall)</h4>
          <p>Look for a tubular structure leaving the tumor that carries tumor signal instead of a black flow void, often widened or irregular (<Cite doi="10.2214/AJR.08.1298">Smith et al., AJR 2008</Cite>). EMVI predicts distant metastases. In a surgery-only cohort, EMVI, tumor deposits, and MRF involvement sorted risk better than T and N stage (<Cite doi="10.1016/S1470-2045(22)00214-5">Lord et al., Lancet Oncol 2022</Cite>).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Nodes</h4>
          <p>Size alone is weak. The ESGAR rules are:</p>
          <ul className="plain-list">
            <li>Short axis 9 mm or more: suspicious.</li>
            <li>5–8 mm: needs two bad features (round, irregular border, mixed signal).</li>
            <li>Under 5 mm: needs all three (<Cite doi="10.1007/s00330-017-5026-2">Beets-Tan et al., Eur Radiol 2018</Cite>).</li>
          </ul>
          <p>These rules have only about 54% sensitivity (<Cite doi="10.1007/s00330-025-11361-2">Rutegård et al., Eur Radiol 2025</Cite>). So the 2026 update tells you to give a confidence level: cN0, possibly cN+, or cN+.</p>
          <p><strong>Lateral nodes</strong> (obturator, internal iliac): a short axis of 7 mm or more is suspicious. In a cohort of 1,216 patients, those with lateral nodes of 7 mm or more had a 19.5% lateral recurrence rate without node dissection, versus 5.7% with it (<Cite doi="10.1200/JCO.18.00032">Ogura et al., J Clin Oncol 2019</Cite>). Common and external iliac nodes and inguinal nodes (unless the tumor reaches the anal canal) count as M1, not N.</p>
          <p>Irregular nodules sitting along a vein with no node shape are <strong>tumor deposits</strong>. Describe them separately.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Low tumors (coronal)</h4>
          <p>State which layers are involved: internal sphincter, intersphincteric space, external sphincter or levator. Also state how far down it goes. This decides whether the sphincter can be saved. Add "anal+" if the anal canal is involved (<Cite doi="10.1007/s00330-022-08591-z">Lambregts et al., Eur Radiol 2022</Cite>).</p>
        </div>
      </>
    ),
  },
  {
    id: 'report',
    title: 'What the report must contain',
    body: (
      <>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>The terms follow the Society of Abdominal Radiology lexicon (<Cite doi="10.1007/s00261-019-02170-5">2019</Cite>, <Cite doi="10.1007/s00261-023-03893-2">2023 update</Cite>).</p>
      </>
    ),
  },
  {
    id: 'cases',
    title: 'Cases to look at',
    body: (
      <>
        <p>Open these alongside the lesson; each one has labeled images.</p>
        <ul className="plain-list">
          <li><strong>Horvat et al., RadioGraphics 2019</strong> (free full text). Labeled cases of every T stage, MRF involvement, EMVI, and nodes. <Cite doi="10.1148/rg.2019180114">doi:10.1148/rg.2019180114</Cite></li>
          <li><strong>Lambregts et al., Eur Radiol 2022</strong> (free). Built on 41 image cases that 321 readers disagreed on. A good map of the traps. <Cite doi="10.1007/s00330-022-08591-z">doi:10.1007/s00330-022-08591-z</Cite></li>
          <li><strong>Fraum et al., Abdom Radiol 2023</strong>. Good versus bad image quality, with examples. <Cite doi="10.1007/s00261-023-03850-z">doi:10.1007/s00261-023-03850-z</Cite></li>
        </ul>
      </>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'rectal-mri',
  name: 'Rectal MRI: staging a new rectal cancer',
  lede: 'A step-by-step reading routine, the findings that change management, and what the report must say.',
  sourceNote: 'References are linked by DOI. Guidance reflects the 2026 ESGAR update and the Society of Abdominal Radiology lexicon.',
  references,
  report: {
    steps: [
      {
        id: 'height',
        title: 'Step 1. Find it and measure height (sagittal)',
        learn: 'search-pattern',
        teach: (
          <>
            <ul className="plain-list">
              <li>Measure from the anal verge or the anorectal junction to the lower edge of the tumor, and say which landmark you used.</li>
              <li>Give the tumor length and the clock-face position (12 o'clock is anterior).</li>
              <li>Say whether it is above, across, or below the anterior peritoneal reflection.</li>
              <li>The upper limit of the rectum is the <strong>sigmoid take-off</strong>. A tumor starting above that is a sigmoid cancer.</li>
            </ul>
            <p>Tumor is intermediate gray on T2. A very bright tumor is mucinous. Say so in the report, because mucinous tumors respond worse to treatment.</p>
          </>
        ),
        fields: [fields.sigmoid, fields.height, fields.landmark, fields.length, fields.clock, fields.reflection, fields.morphology, fields.mucinous],
        derive: deriveLocation,
      },
      {
        id: 't-stage',
        title: 'Step 2. T stage (angled axial T2)',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Follow the dark muscle line around the tumor, on the thin-slice T2 angled perpendicular to the tumor. If the angle is off, the wall looks falsely thick and you overstage.</p>
            <ul className="plain-list">
              <li>Line intact: T1 or T2. MRI cannot reliably separate the two, so report "T1–2."</li>
              <li>Broad or nodular front into fat: T3. Thin spiky strands alone are usually just scarring.</li>
              <li>T3a under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm. More than 5 mm usually means pre-op treatment.</li>
              <li>T4a: reaches the peritoneal reflection. T4b: invades an organ or skeletal muscle (levator, puborectalis, external sphincter).</li>
            </ul>
            <p>MRI measured extramural spread to within 0.5 mm of pathology (<Cite doi="10.1148/radiol.2431051825">MERCURY, Radiology 2007</Cite>).</p>
          </>
        ),
        fields: [fields.muscle, fields.emd, fields.t4, fields.t4Organ],
        derive: deriveT,
      },
      {
        id: 'mrf',
        title: 'Step 3. MRF distance',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Measure the shortest gap between tumor and MRF, and give the clock position.</p>
            <ul className="plain-list">
              <li><strong>1 mm or less means involved.</strong> The old "threatened, 1–2 mm" category was dropped.</li>
              <li>Also count the MRF as involved if tumor in a vein or an irregular nodule is within 1 mm of it.</li>
              <li>A smooth node touching the fascia does not count.</li>
            </ul>
            <p>A tumor within 1 mm of the MRF on MRI predicted local recurrence (hazard ratio 3.5) better than TNM stage did (<Cite doi="10.1200/JCO.2012.45.3258">Taylor et al., J Clin Oncol 2014</Cite>).</p>
          </>
        ),
        fields: [fields.mrfDist, fields.mrfClock, fields.mrfCause, fields.mrf],
        derive: deriveMrf,
      },
      {
        id: 'emvi',
        title: 'Step 4. EMVI (tumor in veins outside the wall)',
        learn: 'search-pattern',
        teach: (
          <p>Look for a tubular structure leaving the tumor that carries tumor signal instead of a black flow void, often widened or irregular (<Cite doi="10.2214/AJR.08.1298">Smith et al., AJR 2008</Cite>). EMVI predicts distant metastases. In a surgery-only cohort, EMVI, tumor deposits, and MRF involvement sorted risk better than T and N stage (<Cite doi="10.1016/S1470-2045(22)00214-5">Lord et al., Lancet Oncol 2022</Cite>).</p>
        ),
        fields: [fields.emvi],
        derive: deriveEmvi,
      },
      {
        id: 'nodes',
        title: 'Step 5. Nodes',
        learn: 'search-pattern',
        teach: (
          <>
            <p>Size alone is weak. The ESGAR rules: short axis 9 mm or more is suspicious; 5–8 mm needs two bad features (round, irregular border, mixed signal); under 5 mm needs all three (<Cite doi="10.1007/s00330-017-5026-2">Beets-Tan et al., Eur Radiol 2018</Cite>).</p>
            <p>These rules have only about 54% sensitivity (<Cite doi="10.1007/s00330-025-11361-2">Rutegård et al., Eur Radiol 2025</Cite>), so give a confidence level: cN0, possibly cN+, or cN+.</p>
            <p>Lateral nodes (obturator, internal iliac): 7 mm or more short axis is suspicious (<Cite doi="10.1200/JCO.18.00032">Ogura et al., J Clin Oncol 2019</Cite>). Common and external iliac nodes and inguinal nodes (unless the tumor reaches the anal canal) count as M1, not N. Irregular nodules along a vein with no node shape are tumor deposits; describe them separately.</p>
          </>
        ),
        fields: [
          fields.nodeSize,
          fields.nodeFeatures,
          fields.nodeText,
          fields.nConfidence,
          fields.deposits,
          fields.depositText,
          fields.lateral,
          fields.latSide,
          fields.latSite,
          fields.latSize,
          fields.distantNodes,
        ],
        derive: deriveNodes,
      },
      {
        id: 'low',
        title: 'Step 6. Low tumors (coronal)',
        learn: 'search-pattern',
        teach: (
          <p>State which layers are involved: internal sphincter, intersphincteric space, external sphincter or levator. Also state how far down it goes. This decides whether the sphincter can be saved. Add "anal+" if the anal canal is involved (<Cite doi="10.1007/s00330-022-08591-z">Lambregts et al., Eur Radiol 2022</Cite>).</p>
        ),
        fields: [fields.analCanal, fields.layers, fields.lowest],
        derive: deriveLow,
      },
    ],
    build,
  },
  learn,
  quiz: [
    {
      id: 'emd-7',
      question: 'Tumor extends 7 mm beyond the muscularis propria, with no T4 features. What is the T category?',
      options: ['mrT3a', 'mrT3b', 'mrT3c', 'mrT3d'],
      answer: 2,
      explanation: <p>T3a is under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm. More than 5 mm usually means pre-op treatment. MRI measures this depth to within 0.5 mm of pathology (<Cite doi="10.1148/radiol.2431051825">MERCURY, Radiology 2007</Cite>).</p>,
    },
    {
      id: 'mrf-1-5',
      question: 'The shortest distance from tumor to the mesorectal fascia is 1.5 mm. How do you report the MRF?',
      options: ['Involved', 'Clear', 'Threatened', 'Indeterminate; restage after treatment'],
      answer: 1,
      explanation: <p>1 mm or less means involved. The old "threatened, 1–2 mm" category was dropped, so 1.5 mm is clear. A tumor within 1 mm of the MRF predicted local recurrence better than TNM stage (<Cite doi="10.1200/JCO.2012.45.3258">Taylor et al., J Clin Oncol 2014</Cite>).</p>,
    },
    {
      id: 'mrf-node',
      question: 'Which of these, lying within 1 mm of the MRF, does NOT make the MRF involved?',
      options: ['Tumor in a vein (EMVI)', 'An irregular nodule', 'The primary tumor itself', 'A smooth node touching the fascia'],
      answer: 3,
      explanation: <p>Count the MRF as involved if tumor, tumor in a vein, or an irregular nodule is within 1 mm of it. A smooth node touching the fascia does not count.</p>,
    },
    {
      id: 'spicules',
      question: 'On angled axial T2, the dark muscle line is intact apart from thin spiky strands into the fat. What do you report?',
      options: ['T1–2', 'T3a', 'T3b', 'T2, distinct from T1'],
      answer: 0,
      explanation: <p>T3 needs gray tumor pushing through the line with a broad or nodular front. Thin spiky strands alone are usually just scarring. With the line intact, MRI cannot reliably separate T1 from T2, so report "T1–2."</p>,
    },
    {
      id: 'node-6',
      question: 'A 6 mm (short axis) mesorectal node is round with an irregular border but uniform signal. By the ESGAR rules it is:',
      options: ['Not suspicious: under 9 mm', 'Not suspicious: needs all three features', 'Suspicious: 5–8 mm with two bad features', 'Suspicious: any node over 5 mm'],
      answer: 2,
      explanation: <p>Short axis 9 mm or more is suspicious; 5–8 mm needs two bad features (round, irregular border, mixed signal); under 5 mm needs all three (<Cite doi="10.1007/s00330-017-5026-2">Beets-Tan et al., Eur Radiol 2018</Cite>). Because these rules have only about 54% sensitivity, give a confidence level: cN0, possibly cN+, or cN+.</p>,
    },
    {
      id: 'lateral-7',
      question: 'What short-axis size makes a lateral (obturator or internal iliac) node suspicious?',
      options: ['5 mm or more', '7 mm or more', '9 mm or more', '10 mm or more'],
      answer: 1,
      explanation: <p>Lateral nodes of 7 mm or more are suspicious. In 1,216 patients, those with lateral nodes of 7 mm or more had a 19.5% lateral recurrence rate without node dissection, versus 5.7% with it (<Cite doi="10.1200/JCO.18.00032">Ogura et al., J Clin Oncol 2019</Cite>).</p>,
    },
    {
      id: 'ext-iliac',
      question: 'A suspicious external iliac node is seen in a mid-rectal cancer. How is it staged?',
      options: ['N1', 'N2', 'Lateral node, reported as N', 'M1, not N'],
      answer: 3,
      explanation: <p>Common and external iliac nodes, and inguinal nodes unless the tumor reaches the anal canal, count as M1, not N. Only obturator and internal iliac nodes are lateral nodes.</p>,
    },
    {
      id: 'protocol',
      question: 'According to the 2026 ESGAR update, which statement about the protocol is correct?',
      options: ['DWI is essential for T stage and MRF', 'Rectal gel should be used routinely', 'Contrast is not needed', 'Fat-saturated T2 is the key series'],
      answer: 2,
      explanation: <p>The key series is thin-slice T2 (3 mm or less, no fat sat) angled perpendicular to the tumor. DWI helps find a small tumor but adds little to T stage, MRF or node calls. Contrast is not needed, and rectal gel is no longer recommended (<Cite doi="10.1007/s00330-025-12274-w">ESGAR consensus update, Eur Radiol 2026</Cite>).</p>,
    },
  ],
}

export function RectalMriStudyPage() {
  return <StudyPage study={study} />
}
