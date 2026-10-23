import type { LessonReference } from '../components/LessonPage'
import { aoBodies, aoDescriptions, aoFacetCode, aoFacetDescriptions, aoFacets, aoSentence, aoTypes } from '../logic/aospine'
import type { AoBody, AoFacet, AoRegion, AoType } from '../logic/aospine'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. PubMed and Crossref could not be reached when this was written, so every
 * citation below is from memory and every claim is waiting to be checked against its paper.
 * The claims table is docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md
 * (T claims); the AO Spine wording is claimed in 2026-10-23-spine-calculators-sources.md
 * (AO claims). Rule chips and warnings carry their claim IDs. Until the check, citations are
 * plain text rather than <Cite> links, and the references have no DOI.
 */

const VACCARO_TL = 'Vaccaro et al., Spine 2013'
const VACCARO_CX = 'Vaccaro et al., Eur Spine J 2016'
const ROJAS = 'Rojas et al., AJNR 2007'
const SPENCE = 'Spence et al., J Bone Joint Surg Am 1970'
const DICKMAN = 'Dickman et al., Neurosurgery 1996'
const ANDERSON = "Anderson and D'Alonzo, J Bone Joint Surg Am 1974"
const BURLEW = 'Burlew et al., J Trauma Acute Care Surg 2012'
const LAREDO = 'Laredo et al., Radiology 1995'
const GENANT = 'Genant et al., J Bone Miner Res 1993'
const WESTERVELD = 'Westerveld et al., Eur Spine J 2009'

const references: LessonReference[] = [
  { citation: 'Vaccaro AR, Oner C, Kepler CK, Dvorak M, Schnake K, Bellabarba C, Reinhold M, Aarabi B, Kandziora F, Chapman J, Shanmuganathan R, Fehlings M, Vialle L. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037.' },
  { citation: 'Vaccaro AR, Koerner JD, Radcliff KE, Oner FC, Reinhold M, Schnake KJ, Kandziora F, Fehlings MG, Dvorak MF, Aarabi B, Rajasekaran S, Schroeder GD, Kepler CK, Vialle LR. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184.' },
  { citation: 'Rojas CA, Bertozzi JC, Martinez CR, Whitlow J. Reassessment of the craniocervical junction: normal values on CT. AJNR Am J Neuroradiol. 2007;28(9):1819-1823.' },
  { citation: 'Spence KF Jr, Decker S, Sell KW. Bursting atlantal fracture associated with rupture of the transverse ligament. J Bone Joint Surg Am. 1970;52(3):543-549.' },
  { citation: 'Dickman CA, Greene KA, Sonntag VK. Injuries involving the transverse atlantal ligament: classification and treatment guidelines based upon experience with 39 injuries. Neurosurgery. 1996;38(1):44-50.' },
  { citation: 'Anderson LD, D\'Alonzo RT. Fractures of the odontoid process of the axis. J Bone Joint Surg Am. 1974;56(8):1663-1674.' },
  { citation: 'Burlew CC, Biffl WL, Moore EE, Barnett CC, Johnson JL, Bensard DD. Blunt cerebrovascular injuries: redefining screening criteria in the era of noninvasive diagnosis. J Trauma Acute Care Surg. 2012;72(2):330-335.' },
  { citation: 'Laredo JD, Lakhdar F, Bellaïche L, Hamze B, Champsaur P, Morvan G. Acute vertebral collapse: CT findings in benign and malignant nontraumatic cases. Radiology. 1995;194(1):41-48.' },
  { citation: 'Genant HK, Wu CY, van Kuijk C, Nevitt MC. Vertebral fracture assessment using a semiquantitative technique. J Bone Miner Res. 1993;8(9):1137-1148.' },
  { citation: 'Westerveld LA, Verlaan JJ, Oner FC. Spinal fractures in patients with ankylosing spinal disorders: a systematic review of the literature on treatment, neurological status and complications. Eur Spine J. 2009;18(2):145-156.' },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

const aoTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Injury</th></tr>
      </thead>
      <tbody>
        {aoTypes.map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(aoDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const facetTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Facet</th><th>Injury</th></tr>
      </thead>
      <tbody>
        {aoFacets.map((f) => (
          <tr key={f}><td className="vessel-name">{f}</td><td>{upperFirst(aoFacetDescriptions[f])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the spine CT that arrives with pain, or pain after an injury. The order, the protocol checklist and the pointers from the history are this site's own.</p>
        <p>Check for thin sections with sagittal and coronal reformats, read in bone and soft-tissue windows. Say which part of the spine was covered.</p>
        <p>After a high-energy injury, read every level for fractures, alignment and the tension bands. After a low-energy fall in an older patient, the craniocervical junction and C2 deserve the closest look. With pain and no injury, look hardest at bone quality and at any vertebral collapse (step 6).</p>
        <p>Note an ankylosed spine (diffuse idiopathic skeletal hyperostosis or ankylosing spondylitis) first. Fractures in an ankylosed spine often follow minor trauma, are most common in the cervical spine, and often come with a neurological deficit ({WESTERVELD}).</p>
      </>
    ),
  },
  {
    id: 'ccj',
    title: 'Step 2. Craniocervical junction and C1–C2',
    body: (
      <>
        <p>Measure the basion–dens interval and the atlantodental interval. On CT in adults the basion–dens interval was at most 8.5 mm and the atlantodental interval at most 2 mm ({ROJAS}). Larger values raise the question of craniocervical or atlantoaxial injury.</p>
        <p>Look at the occipital condyles and the ring of C1. When C1 is fractured, add the overhang of both lateral masses over C2: more than 6.9 mm in total suggested rupture of the transverse ligament ({SPENCE}). That figure comes from open-mouth radiographs, and the rule can miss ligament injuries that MRI shows directly ({DICKMAN}).</p>
        <p>Give an odontoid fracture its Anderson and D'Alonzo type ({ANDERSON}): type I through the tip, type II through the base of the dens, type III extending into the body of C2. Then look at the rest of C2, including the pars interarticularis.</p>
      </>
    ),
  },
  {
    id: 'subaxial',
    title: 'Step 3. Subaxial cervical spine (C3–C7)',
    body: (
      <>
        <p>Classify each injured level by AO Spine ({VACCARO_CX}). The most severe injury names the type, C over B over A. The AO Spine calculator on this site applies the same rules.</p>
        {aoTable}
        <p>Then each facet joint, right and left ({VACCARO_CX}):</p>
        {facetTable}
        <p>The AO Spine code also carries neurology and modifiers. Neurology comes from the examination, so the report leaves it out; an ankylosed spine is modifier M3 ({VACCARO_CX}).</p>
      </>
    ),
  },
  {
    id: 'thoracolumbar',
    title: 'Step 4. Thoracolumbar spine',
    body: (
      <>
        <p>Classify each injured level by AO Spine in the same way ({VACCARO_TL}). A burst fracture breaks the posterior wall (A3, A4), a B injury breaks a tension band, and a C injury is displaced. In the thoracolumbar system an ankylosed spine is modifier M2 ({VACCARO_TL}).</p>
      </>
    ),
  },
  {
    id: 'vessels',
    title: 'Step 5. Vertebral arteries',
    body: (
      <>
        <p>Some cervical spine fractures put the vertebral arteries at risk. The expanded Denver screening criteria for blunt cerebrovascular injury include cervical spine fractures with subluxation, fractures extending into a foramen transversarium, and fractures of C1 to C3 ({BURLEW}). When one is present, say so in the report.</p>
      </>
    ),
  },
  {
    id: 'collapse',
    title: 'Step 6. Vertebral collapse without major trauma',
    body: (
      <>
        <p>Grade the height loss of a collapsed vertebra by Genant: grade 1 about 20–25%, grade 2 about 25–40%, grade 3 more than 40% ({GENANT}).</p>
        <p>Then decide whether the collapse looks osteoporotic or malignant. Features of benign collapse on CT include fracture lines in cancellous bone without destruction and a retropulsed fragment of the posterior wall. Features of malignant collapse include destruction of the anterolateral or posterior cortex, destruction of cancellous bone, destruction of a pedicle, and an epidural or focal paraspinal mass ({LAREDO}).</p>
      </>
    ),
  },
  {
    id: 'canal',
    title: 'Step 7. Canal and soft tissues',
    body: (
      <>
        <p>Look at the canal for narrowing by a retropulsed fragment or by displacement, and at the prevertebral soft tissues in the neck. This site's note: CT does not show the cord, the discs or the ligaments well, so say so when the question is about them.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    body: (
      <>
        <p>Give each injured level with its type, then the craniocervical measurements that are out of range, then any vertebral artery screening criterion. List the findings from the top of the spine down.</p>
      </>
    ),
  },
]

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function picked(values: Values, field: { id: string; options: Option[] }): string {
  const value = str(values, field.id)
  return value ? lowerFirst(optionLabel(field, value)) : ''
}

function chosen(values: Values, field: { id: string; options: Option[] }): string[] {
  return list(values, field.id).map((value) => lowerFirst(optionLabel(field, value)))
}

const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const typeOptions: Option[] = aoTypes.map((t) => ({ value: t, label: `${t}: ${aoDescriptions[t]}` }))
const bodyOptions: Option[] = aoBodies.filter((b) => b !== 'A0').map((b) => ({ value: b, label: `${b}: ${aoDescriptions[b]}` }))
const facetOptions: Option[] = [
  { value: 'none', label: 'No facet injury' },
  ...aoFacets.map((f) => ({ value: f, label: `${f}: ${aoFacetDescriptions[f]}` })),
]

const cervicalCovered = (v: Values) => ['cervical', 'whole'].includes(str(v, 'coverage'))
const thoracolumbarCovered = (v: Values) => ['thoracolumbar', 'whole'].includes(str(v, 'coverage'))
const isBorC = (v: Values, id: string) => /^[BC]/.test(str(v, id))

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain, no injury given' },
    { value: 'low', label: 'Low-energy injury, such as a fall from standing' },
    { value: 'high', label: 'High-energy injury' },
  ] },
  coverage: { id: 'coverage', kind: 'choice', label: 'Coverage', required: true, options: [
    { value: 'cervical', label: 'Cervical spine' },
    { value: 'thoracolumbar', label: 'Thoracolumbar spine' },
    { value: 'whole', label: 'Whole spine' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'Thin sections with sagittal and coronal reformats, in bone and soft-tissue windows.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'reformats', label: 'Sagittal and coronal reformats' },
    { value: 'soft', label: 'Soft-tissue window' },
  ] },
  ankylosis: { id: 'ankylosis', kind: 'choice', label: 'Ankylosed spine', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'dish', label: 'Diffuse idiopathic skeletal hyperostosis (DISH)' },
    { value: 'as', label: 'Ankylosing spondylitis' },
  ] },

  bdi: { id: 'bdi', kind: 'number', label: 'Basion–dens interval', unit: 'mm', min: 0, max: 40, step: 0.1, showIf: cervicalCovered },
  adi: { id: 'adi', kind: 'number', label: 'Atlantodental interval', unit: 'mm', min: 0, max: 20, step: 0.1, showIf: cervicalCovered, help: 'Adult values on CT.' },
  condyle: { id: 'condyle', kind: 'choice', label: 'Occipital condyle fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  c1: { id: 'c1', kind: 'choice', label: 'C1 fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  c1Overhang: { id: 'c1-overhang', kind: 'number', label: 'Combined lateral mass overhang', unit: 'mm', min: 0, max: 30, step: 0.1, showIf: (v) => cervicalCovered(v) && str(v, 'c1') === 'present', help: 'Both lateral masses of C1 over C2, added together.' },
  dens: { id: 'dens', kind: 'choice', label: 'Odontoid fracture', required: true, showIf: cervicalCovered, options: [
    { value: 'none', label: 'None' },
    { value: 'I', label: 'Type I: through the tip' },
    { value: 'II', label: 'Type II: through the base of the dens' },
    { value: 'III', label: 'Type III: extending into the body of C2' },
  ] },
  c2: { id: 'c2', kind: 'choice', label: 'Other C2 fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  c2Text: { id: 'c2-text', kind: 'text', label: 'C2 fracture (describe)', placeholder: 'e.g. bilateral pars fractures', showIf: (v) => cervicalCovered(v) && str(v, 'c2') === 'present' },

  cx: { id: 'cx', kind: 'choice', label: 'Subaxial cervical injury', required: true, showIf: cervicalCovered, options: nonePresent },
  cxLevel: { id: 'cx-level', kind: 'text', label: 'Level', placeholder: 'e.g. C5–C6', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present' },
  cxType: { id: 'cx-type', kind: 'choice', label: 'AO Spine type', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', help: 'As in the AO Spine calculator.', options: typeOptions },
  cxBody: { id: 'cx-body', kind: 'choice', label: 'Vertebral body fracture', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present' && isBorC(v, 'cx-type'), options: bodyOptions },
  cxFacetRight: { id: 'cx-facet-right', kind: 'choice', label: 'Right facet', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', options: facetOptions },
  cxFacetLeft: { id: 'cx-facet-left', kind: 'choice', label: 'Left facet', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', options: facetOptions },

  tl: { id: 'tl', kind: 'choice', label: 'Thoracolumbar injury', required: true, showIf: thoracolumbarCovered, options: nonePresent },
  tlLevel: { id: 'tl-level', kind: 'text', label: 'Level', placeholder: 'e.g. L1', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present' },
  tlType: { id: 'tl-type', kind: 'choice', label: 'AO Spine type', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present', help: 'As in the AO Spine calculator.', options: typeOptions },
  tlBody: { id: 'tl-body', kind: 'choice', label: 'Vertebral body fracture', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present' && isBorC(v, 'tl-type'), options: bodyOptions },

  foramen: { id: 'foramen', kind: 'choice', label: 'Fracture into a foramen transversarium', required: true, showIf: cervicalCovered, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  collapse: { id: 'collapse', kind: 'choice', label: 'Vertebral collapse without major trauma', required: true, options: nonePresent },
  collapseLevel: { id: 'collapse-level', kind: 'text', label: 'Level', placeholder: 'e.g. T12', showIf: (v) => str(v, 'collapse') === 'present' },
  heightLoss: { id: 'height-loss', kind: 'number', label: 'Height loss', unit: '%', min: 0, max: 100, step: 1, showIf: (v) => str(v, 'collapse') === 'present', help: 'Against the expected height of the vertebra.' },
  collapseFeatures: { id: 'collapse-features', kind: 'multi', label: 'Features', showIf: (v) => str(v, 'collapse') === 'present', options: [
    { value: 'lines', label: 'Fracture lines in cancellous bone, no destruction' },
    { value: 'retropulsion', label: 'Retropulsed fragment of the posterior wall' },
    { value: 'cortex', label: 'Destruction of the anterolateral or posterior cortex' },
    { value: 'cancellous', label: 'Destruction of cancellous bone' },
    { value: 'pedicle', label: 'Pedicle destruction' },
    { value: 'epidural', label: 'Epidural mass' },
    { value: 'paraspinal', label: 'Focal paraspinal mass' },
  ] },

  canal: { id: 'canal', kind: 'choice', label: 'Spinal canal', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'narrowed', label: 'Narrowed by a fragment or displacement' },
  ] },
  canalText: { id: 'canal-text', kind: 'text', label: 'Canal narrowing (describe)', placeholder: 'e.g. 40% at L1', showIf: (v) => str(v, 'canal') === 'narrowed' },
  prevertebral: { id: 'prevertebral', kind: 'choice', label: 'Prevertebral soft tissues', showIf: cervicalCovered, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'swollen', label: 'Swollen' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. rib fractures' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-malalignment', label: 'No malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

const MALIGNANT = ['cortex', 'cancellous', 'pedicle', 'epidural', 'paraspinal']
const BENIGN = ['lines', 'retropulsion']

/** T6-1: Genant grade from the height loss; 0 under 20%. */
function genantGrade(heightLoss: number): 0 | 1 | 2 | 3 {
  if (heightLoss < 20) return 0
  if (heightLoss <= 25) return 1
  if (heightLoss <= 40) return 2
  return 3
}

type Injury = { region: AoRegion; level: string; type?: AoType; body?: AoBody; facet?: string; modifiers: string[] }

function facetValue(values: Values, id: string): AoFacet | undefined {
  const value = str(values, id)
  return (aoFacets as string[]).includes(value) ? value as AoFacet : undefined
}

/** The injury at one region, only when it is covered and entered. */
function injury(values: Values, region: AoRegion): Injury | undefined {
  const prefix = region === 'subaxial' ? 'cx' : 'tl'
  const covered = region === 'subaxial' ? cervicalCovered(values) : thoracolumbarCovered(values)
  if (!covered || str(values, prefix) !== 'present') return undefined
  const typeValue = str(values, `${prefix}-type`)
  const type = (aoTypes as string[]).includes(typeValue) ? typeValue as AoType : undefined
  const bodyValue = str(values, `${prefix}-body`)
  const body = type && /^[BC]/.test(type) && (aoBodies as string[]).includes(bodyValue) ? bodyValue as AoBody : undefined
  const facet = region === 'subaxial' ? aoFacetCode(facetValue(values, 'cx-facet-right'), facetValue(values, 'cx-facet-left')) : ''
  // AO-10: an ankylosed spine is M3 in the subaxial system and M2 in the thoracolumbar one.
  const ankylosed = !['', 'none'].includes(str(values, 'ankylosis'))
  const modifiers = ankylosed ? [region === 'subaxial' ? 'M3' : 'M2'] : []
  return { region, level: str(values, `${prefix}-level`), ...(type ? { type } : {}), ...(body ? { body } : {}), ...(facet ? { facet } : {}), modifiers }
}

function injurySentence(item: Injury): string {
  if (!item.type) return `${item.region === 'subaxial' ? 'Subaxial cervical' : 'Thoracolumbar'} spine injury${item.level ? ` at ${item.level}` : ''}.`
  return aoSentence({ region: item.region, morphology: { type: item.type, ...(item.body ? { body: item.body } : {}) }, ...(item.facet ? { facet: item.facet } : {}), modifiers: item.modifiers }, item.level || undefined)
}

/** T5-1: the expanded Denver criteria that this form can see. */
function denverReasons(values: Values): string[] {
  if (!cervicalCovered(values)) return []
  const cx = injury(values, 'subaxial')
  const subluxation = cx && (cx.type === 'C' || [facetValue(values, 'cx-facet-right'), facetValue(values, 'cx-facet-left')].includes('F4'))
  return [
    (str(values, 'c1') === 'present' || !['', 'none'].includes(str(values, 'dens')) || str(values, 'c2') === 'present') && 'C1–C3 fracture',
    str(values, 'foramen') === 'yes' && 'fracture into a foramen transversarium',
    subluxation && 'subluxation',
  ].filter((reason): reason is string => Boolean(reason))
}

const over = (values: Values, id: string, limit: number) => {
  const value = num(values, id)
  return cervicalCovered(values) && value !== undefined && value > limit ? value : undefined
}

/* Rule chips. */

function deriveCcj(values: Values): Derived[] {
  if (!cervicalCovered(values)) return []
  const out: Derived[] = []
  // T2-1: on CT in adults, BDI at most 8.5 mm and ADI at most 2 mm.
  const bdi = num(values, 'bdi')
  if (bdi !== undefined) out.push(bdi > 8.5 ? { label: 'Basion–dens', value: 'Above 8.5 mm', tone: 'warn' } : { label: 'Basion–dens', value: 'Within 8.5 mm', tone: 'good' })
  const adi = num(values, 'adi')
  if (adi !== undefined) out.push(adi > 2 ? { label: 'Atlantodental', value: 'Above 2 mm', tone: 'warn' } : { label: 'Atlantodental', value: 'Within 2 mm', tone: 'good' })
  // T2-2, T2-3: combined overhang over 6.9 mm suggests transverse ligament rupture.
  const overhang = num(values, 'c1-overhang')
  if (str(values, 'c1') === 'present' && overhang !== undefined) {
    out.push(overhang > 6.9
      ? { label: 'Transverse ligament', value: 'Overhang above 6.9 mm: rupture likely', tone: 'warn' }
      : { label: 'Transverse ligament', value: 'Overhang within 6.9 mm: the rule can miss a rupture that MRI shows' })
  }
  return out
}

function deriveRegion(region: AoRegion) {
  return (values: Values): Derived[] => {
    const item = injury(values, region)
    if (!item) return []
    const out: Derived[] = []
    if (item.type) out.push({ label: 'AO Spine', value: `${item.type}${item.body ? ` (${item.body})` : ''}${item.facet ? `; ${item.facet}` : ''}`, tone: item.type === 'A0' ? 'neutral' : 'warn' })
    // T1-1, AO-10: fractures in an ankylosed spine.
    if (item.modifiers.length > 0) out.push({ label: 'Ankylosed spine', value: `Modifier ${item.modifiers[0]}; fractures here often follow minor trauma`, tone: 'warn' })
    return out
  }
}

function deriveVessels(values: Values): Derived[] {
  const reasons = denverReasons(values)
  return reasons.length > 0 ? [{ label: 'Vertebral arteries', value: `Screening criterion met: ${reasons.join(', ')}`, tone: 'warn' }] : []
}

function deriveCollapse(values: Values): Derived[] {
  if (str(values, 'collapse') !== 'present') return []
  const out: Derived[] = []
  const loss = num(values, 'height-loss')
  if (loss !== undefined) {
    const grade = genantGrade(loss)
    out.push(grade === 0 ? { label: 'Genant', value: 'Under 20%: below grade 1' } : { label: 'Genant', value: `Grade ${grade}`, tone: 'warn' })
  }
  // T6-2: features of malignant and benign collapse.
  const features = list(values, 'collapse-features')
  if (features.some((f) => MALIGNANT.includes(f))) out.push({ label: 'Collapse', value: 'Features of malignant collapse', tone: 'warn' })
  else if (features.some((f) => BENIGN.includes(f))) out.push({ label: 'Collapse', value: 'Features of benign (osteoporotic) collapse', tone: 'good' })
  return out
}

/* Report lines. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  return [
    choiceLine(values, fields.history),
    choiceLine(values, fields.coverage),
    protocol === 'complete' && 'Technique: thin sections with sagittal and coronal reformats, bone and soft-tissue windows',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.ankylosis),
  ]
}

function cervicalLines(values: Values): (string | false | undefined)[] {
  if (!cervicalCovered(values)) return []
  const bdi = num(values, 'bdi')
  const adi = num(values, 'adi')
  const overhang = num(values, 'c1-overhang')
  const cx = injury(values, 'subaxial')
  return [
    bdi !== undefined && `Basion–dens interval: ${bdi} mm`,
    adi !== undefined && `Atlantodental interval: ${adi} mm`,
    choiceLine(values, fields.condyle),
    choiceLine(values, fields.c1, str(values, 'c1') === 'present' && overhang !== undefined && `combined lateral mass overhang ${overhang} mm`),
    choiceLine(values, fields.dens),
    choiceLine(values, fields.c2, str(values, 'c2') === 'present' && str(values, 'c2-text')),
    str(values, 'cx') === 'none' && 'Subaxial cervical spine: no injury',
    cx && `Subaxial cervical spine: ${join([cx.level, cx.type && `AO Spine ${cx.type}${cx.body ? ` (${cx.body})` : ''}`, cx.facet], ', ') || 'injury'}`,
    choiceLine(values, fields.foramen),
    choiceLine(values, fields.prevertebral),
  ]
}

function thoracolumbarLines(values: Values): (string | false | undefined)[] {
  if (!thoracolumbarCovered(values)) return []
  const tl = injury(values, 'thoracolumbar')
  return [
    str(values, 'tl') === 'none' && 'Thoracolumbar spine: no injury',
    tl && `Thoracolumbar spine: ${join([tl.level, tl.type && `AO Spine ${tl.type}${tl.body ? ` (${tl.body})` : ''}`], ', ') || 'injury'}`,
  ]
}

function collapseLines(values: Values): (string | false)[] {
  const collapse = str(values, 'collapse')
  const loss = num(values, 'height-loss')
  const features = chosen(values, fields.collapseFeatures)
  return [
    collapse === 'none' && 'Vertebral collapse: none',
    collapse === 'present' && `Vertebral collapse: ${join([str(values, 'collapse-level'), loss !== undefined && `${loss}% height loss`, features.length > 0 && features.join(', ')], ', ') || 'present'}`,
    choiceLine(values, fields.canal, str(values, 'canal') === 'narrowed' && str(values, 'canal-text')),
  ]
}

/* The impression, from the top of the spine down. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const bdi = over(values, 'bdi', 8.5)
  if (bdi !== undefined) out.push(`Basion–dens interval ${bdi} mm, above the 8.5 mm upper limit on CT.`)
  const adi = over(values, 'adi', 2)
  if (adi !== undefined) out.push(`Atlantodental interval ${adi} mm, above the 2 mm upper limit in adults on CT.`)
  if (cervicalCovered(values)) {
    if (str(values, 'condyle') === 'present') out.push('Occipital condyle fracture.')
    if (str(values, 'c1') === 'present') {
      const overhang = num(values, 'c1-overhang')
      out.push(`C1 fracture${overhang !== undefined && overhang > 6.9 ? `, with combined lateral mass overhang of ${overhang} mm suggesting transverse ligament rupture` : ''}.`)
    }
    const dens = str(values, 'dens')
    if (dens && dens !== 'none') out.push(`Odontoid fracture, Anderson and D'Alonzo type ${dens}.`)
    if (str(values, 'c2') === 'present') out.push(`C2 fracture${str(values, 'c2-text') ? `: ${str(values, 'c2-text')}` : ''}.`)
  }
  const cx = injury(values, 'subaxial')
  if (cx) out.push(injurySentence(cx))
  const reasons = denverReasons(values)
  if (reasons.length > 0) out.push(`Meets the expanded Denver screening criteria for blunt cerebrovascular injury (${reasons.join(', ')}).`)
  const tl = injury(values, 'thoracolumbar')
  if (tl) out.push(injurySentence(tl))

  if (str(values, 'collapse') === 'present') {
    const level = str(values, 'collapse-level')
    const loss = num(values, 'height-loss')
    const grade = loss !== undefined ? genantGrade(loss) : 0
    const features = list(values, 'collapse-features')
    const kind = features.some((f) => MALIGNANT.includes(f)) ? ', with features of malignant collapse' : features.some((f) => BENIGN.includes(f)) ? ', with features of benign (osteoporotic) collapse' : ''
    out.push(`Vertebral collapse${level ? ` of ${level}` : ''}${grade > 0 ? `, Genant grade ${grade} (${loss}% height loss)` : ''}${kind}.`)
  }
  if (str(values, 'canal') === 'narrowed') out.push(`Spinal canal narrowed${str(values, 'canal-text') ? `: ${str(values, 'canal-text')}` : ''}.`)
  if (cervicalCovered(values) && str(values, 'prevertebral') === 'swollen') out.push('Prevertebral soft-tissue swelling.')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

function normalImpression(values: Values): string {
  const where = { cervical: 'cervical spine', thoracolumbar: 'thoracolumbar spine', whole: 'spine' }[str(values, 'coverage')] ?? 'spine'
  return `No acute fracture or malalignment of the ${where}.`
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = findings(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives)}`
    return complete(values) ? `Impression: ${lines(limited, normalImpression(values))}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const cervical = cervicalCovered(values)
  const fractures = [
    cervical && str(values, 'condyle') === 'present' && 'occipital condyle fracture',
    cervical && str(values, 'c1') === 'present' && 'C1 fracture',
    cervical && !['', 'none'].includes(str(values, 'dens')) && 'odontoid fracture',
    cervical && str(values, 'c2') === 'present' && 'C2 fracture',
    injury(values, 'subaxial') && 'subaxial cervical injury',
    injury(values, 'thoracolumbar') && 'thoracolumbar injury',
    str(values, 'collapse') === 'present' && 'vertebral collapse',
  ].filter((item): item is string => Boolean(item))
  const cx = injury(values, 'subaxial')
  const tl = injury(values, 'thoracolumbar')
  const malalignment = [
    over(values, 'bdi', 8.5) !== undefined && 'basion–dens interval above 8.5 mm',
    over(values, 'adi', 2) !== undefined && 'atlantodental interval above 2 mm',
    cx?.type === 'C' && 'subaxial type C',
    cx && [facetValue(values, 'cx-facet-right'), facetValue(values, 'cx-facet-left')].includes('F4') && 'F4 facet',
    tl?.type === 'C' && 'thoracolumbar type C',
  ].filter((item): item is string => Boolean(item))
  if (negatives.includes('no-fracture') && fractures.length > 0) out.push(`Impression says no fracture, but these are entered: ${fractures.join(', ')}.`)
  if (negatives.includes('no-malalignment') && malalignment.length > 0) out.push(`Impression says no malalignment, but these are entered: ${malalignment.join(', ')}.`)
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...cervicalLines(values),
    ...thoracolumbarLines(values),
    ...collapseLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    learn: 'technique',
    teach: <p>Note an ankylosed spine first: its fractures often follow minor trauma and come with neurological deficit ({WESTERVELD}). The protocol checklist and the pointers from the history are this site's own.</p>,
    fields: [fields.history, fields.coverage, fields.protocol, fields.protocolMissing, fields.ankylosis],
  },
  {
    id: 'ccj',
    title: 'Step 2. Craniocervical junction and C1–C2',
    learn: 'ccj',
    teach: <p>On adult CT, basion–dens at most 8.5 mm and atlantodental at most 2 mm ({ROJAS}). C1 lateral mass overhang over 6.9 mm in total suggests transverse ligament rupture ({SPENCE}), though MRI shows ruptures the rule misses ({DICKMAN}). Odontoid types I–III ({ANDERSON}).</p>,
    fields: [fields.bdi, fields.adi, fields.condyle, fields.c1, fields.c1Overhang, fields.dens, fields.c2, fields.c2Text],
    derive: deriveCcj,
  },
  {
    id: 'subaxial',
    title: 'Step 3. Subaxial cervical spine (C3–C7)',
    learn: 'subaxial',
    teach: (
      <>
        <p>AO Spine types ({VACCARO_CX}):</p>
        {aoTable}
      </>
    ),
    fields: [fields.cx, fields.cxLevel, fields.cxType, fields.cxBody, fields.cxFacetRight, fields.cxFacetLeft],
    derive: deriveRegion('subaxial'),
  },
  {
    id: 'thoracolumbar',
    title: 'Step 4. Thoracolumbar spine',
    learn: 'thoracolumbar',
    teach: <p>The same AO Spine types; an ankylosed spine is modifier M2 here ({VACCARO_TL}).</p>,
    fields: [fields.tl, fields.tlLevel, fields.tlType, fields.tlBody],
    derive: deriveRegion('thoracolumbar'),
  },
  {
    id: 'vessels',
    title: 'Step 5. Vertebral arteries',
    learn: 'vessels',
    teach: <p>Screening criteria include cervical fractures with subluxation, into a foramen transversarium, or of C1 to C3 ({BURLEW}).</p>,
    fields: [fields.foramen],
    derive: deriveVessels,
  },
  {
    id: 'collapse',
    title: 'Step 6. Vertebral collapse without major trauma',
    learn: 'collapse',
    teach: <p>Genant grades: about 20–25%, 25–40%, over 40% ({GENANT}). Cortical, cancellous or pedicle destruction and an epidural or paraspinal mass suggest malignant collapse ({LAREDO}).</p>,
    fields: [fields.collapse, fields.collapseLevel, fields.heightLoss, fields.collapseFeatures],
    derive: deriveCollapse,
  },
  {
    id: 'canal',
    title: 'Step 7. Canal and soft tissues',
    learn: 'canal',
    teach: <p>Canal narrowing and prevertebral swelling. CT does not show the cord, discs or ligaments well.</p>,
    fields: [fields.canal, fields.canalText, fields.prevertebral],
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    learn: 'impression',
    teach: <p>Each injured level with its type, the measurements out of range, then any vertebral artery criterion, from the top down.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'spine-trauma-ct',
  name: 'Spine CT for pain or injury',
  lede: 'Read a spine CT for pain or injury: the craniocervical junction and C1–C2, AO Spine types in the neck and the thoracolumbar spine, the vertebral arteries, collapse without major trauma, and the report.',
  sourceNote: 'Unchecked draft: written while PubMed could not be reached, so no citation or claim on this page has been checked against its paper yet. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'bdi',
      question: 'On adult CT, what is the upper limit of the basion–dens interval in this lesson?',
      options: ['2 mm', '5 mm', '8.5 mm', '12 mm'],
      answer: 2,
      explanation: <p>On CT in adults the basion–dens interval was at most 8.5 mm, and the atlantodental interval at most 2 mm ({ROJAS}).</p>,
    },
    {
      id: 'spence',
      question: 'A C1 burst fracture has lateral masses overhanging C2 by 4 mm on each side. What does the rule of Spence suggest?',
      options: ['An intact transverse ligament', 'Rupture of the transverse ligament, since the total is over 6.9 mm', 'An odontoid fracture', 'Nothing; the rule is for children'],
      answer: 1,
      explanation: <p>A combined overhang of more than 6.9 mm suggested transverse ligament rupture ({SPENCE}). The rule can miss ruptures that MRI shows ({DICKMAN}).</p>,
    },
    {
      id: 'odontoid',
      question: 'An odontoid fracture runs through the base of the dens. What is the Anderson and D\'Alonzo type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>Type I is through the tip, type II through the base of the dens, type III into the body of C2 ({ANDERSON}).</p>,
    },
    {
      id: 'ao-a3',
      question: 'A thoracolumbar fracture involves the superior endplate and the posterior wall. What is its AO Spine type?',
      options: ['A1', 'A2', 'A3', 'A4'],
      answer: 2,
      explanation: <p>A3 is an incomplete burst fracture, through a single endplate and the posterior wall; A4 involves both endplates ({VACCARO_TL}).</p>,
    },
    {
      id: 'ao-hierarchy',
      question: 'A burst fracture comes with translation of the vertebra above. How is it typed?',
      options: ['A4', 'B2', 'C', 'A4 and B2 together, with no main type'],
      answer: 2,
      explanation: <p>The most severe injury names the type, and translation in any direction is type C ({VACCARO_TL}).</p>,
    },
    {
      id: 'facet',
      question: 'In the subaxial cervical spine, a perched facet is which facet injury?',
      options: ['F1', 'F2', 'F3', 'F4'],
      answer: 3,
      explanation: <p>F4 is pathological subluxation, or a perched or dislocated facet ({VACCARO_CX}).</p>,
    },
    {
      id: 'ankylosed',
      question: 'What does the lesson say about fractures in an ankylosed spine?',
      options: ['They need high-energy trauma', 'They often follow minor trauma, are commonest in the neck, and often come with neurological deficit', 'They are always stable', 'They only occur in the lumbar spine'],
      answer: 1,
      explanation: <p>Fractures in ankylosing spinal disorders often follow minor trauma, are most common in the cervical spine, and often come with a neurological deficit ({WESTERVELD}).</p>,
    },
    {
      id: 'denver',
      question: 'Which cervical fracture meets the expanded Denver screening criteria for blunt cerebrovascular injury?',
      options: ['A C6 spinous process fracture', 'A fracture extending into a foramen transversarium', 'A T1 transverse process fracture', 'An L1 compression fracture'],
      answer: 1,
      explanation: <p>The criteria include cervical fractures with subluxation, fractures into a foramen transversarium, and fractures of C1 to C3 ({BURLEW}).</p>,
    },
    {
      id: 'genant',
      question: 'A vertebral body has lost 35% of its height. What is the Genant grade?',
      options: ['Grade 1', 'Grade 2', 'Grade 3', 'Not a fracture'],
      answer: 1,
      explanation: <p>Grade 1 is about 20–25%, grade 2 about 25–40%, grade 3 more than 40% ({GENANT}).</p>,
    },
    {
      id: 'malignant',
      question: 'Which CT feature suggests that a vertebral collapse is malignant rather than osteoporotic?',
      options: ['A retropulsed fragment of the posterior wall', 'Fracture lines in cancellous bone without destruction', 'Destruction of a pedicle', 'Loss of height under 20%'],
      answer: 2,
      explanation: <p>Destruction of the cortex, cancellous bone or a pedicle, and an epidural or focal paraspinal mass, suggest malignant collapse; a retropulsed posterior wall fragment suggests benign collapse ({LAREDO}).</p>,
    },
  ],
}

export function SpineTraumaCtStudyPage() {
  return <StudyPage study={study} />
}
