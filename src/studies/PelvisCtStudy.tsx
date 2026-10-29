import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ltAssociated, ltDescriptions, ltElementary, ltExtraWall, ltIsAssociated, ltNames, ltSentence, ltTypes } from '../logic/letournel'
import type { LtType } from '../logic/letournel'
import { diastasisOver, ybDescriptions, ybSentence, ybStability, ybTypes } from '../logic/youngburgess'
import type { YbType } from '../logic/youngburgess'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23). Most
 * of the papers are paywalled, so claims are verified against abstracts and reviews read in full
 * (Alton and Gee, Rizkalla, Halawi, Leone, Durkee, Gänsslen); parts of the Letournel
 * elementary-type wording and Roy-Camille's own use of the U or H shape are still unread (see
 * the sourceNote). The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-pelvis-ct-sources.md (P claims); the Young-Burgess and
 * Letournel wording is in 2026-10-23-pelvis-calculators-sources.md (YB and LT claims). Rule
 * chips and warnings carry their claim IDs.
 */

const YOUNG_DOI = '10.1148/radiology.160.2.3726125'
const BURGESS_DOI = '10.1097/00005373-199007000-00015'
const DALAL_DOI = '10.1097/00005373-198907000-00012'
const KHURANA_DOI = '10.1148/rg.345135113'
const ALTON_DOI = '10.1007/s11999-014-3693-8'
const HALAWI_DOI = '10.1016/j.jcot.2015.08.002'
const LEONE_DOI = '10.3390/diagnostics12020384'
const DENIS_DOI = '10.1097/00003086-198802000-00010'
const RIZKALLA_DOI = '10.1097/CORR.0000000000000861'
const ROY_CAMILLE_DOI = '10.1097/00007632-198511000-00011'
const LYDERS_DOI = '10.3174/ajnr.A1666'
const JUDET_DOI = '10.2106/00004623-196446080-00001'
const LETOURNEL_DOI = '10.1097/00003086-198009000-00012'
const DURKEE_DOI = '10.2214/AJR.05.1269'
const SCHEINFELD_DOI = '10.1148/rg.352140098'
const KELLOCK_DOI = '10.2214/AJR.19.21510'
const GANSSLEN_DOI = '10.1007/s00402-024-05599-6'

const YOUNG = <Cite doi={YOUNG_DOI}>Young et al., Radiology 1986</Cite>
const BURGESS = <Cite doi={BURGESS_DOI}>Burgess et al., J Trauma 1990</Cite>
const DALAL = <Cite doi={DALAL_DOI}>Dalal et al., J Trauma 1989</Cite>
const KHURANA = <Cite doi={KHURANA_DOI}>Khurana et al., RadioGraphics 2014</Cite>
const ALTON = <Cite doi={ALTON_DOI}>Alton and Gee, Clin Orthop Relat Res 2014</Cite>
const HALAWI = <Cite doi={HALAWI_DOI}>Halawi, J Clin Orthop Trauma 2015</Cite>
const LEONE = <Cite doi={LEONE_DOI}>Leone et al., Diagnostics 2022</Cite>
const DENIS = <Cite doi={DENIS_DOI}>Denis et al., Clin Orthop Relat Res 1988</Cite>
const RIZKALLA = <Cite doi={RIZKALLA_DOI}>Rizkalla et al., Clin Orthop Relat Res 2019</Cite>
const ROY_CAMILLE = <Cite doi={ROY_CAMILLE_DOI}>Roy-Camille et al., Spine 1985</Cite>
const LYDERS = <Cite doi={LYDERS_DOI}>Lyders et al., AJNR 2010</Cite>
const JUDET = <Cite doi={JUDET_DOI}>Judet et al., J Bone Joint Surg Am 1964</Cite>
const LETOURNEL = <Cite doi={LETOURNEL_DOI}>Letournel, Clin Orthop Relat Res 1980</Cite>
const DURKEE = <Cite doi={DURKEE_DOI}>Durkee et al., AJR 2006</Cite>
const SCHEINFELD = <Cite doi={SCHEINFELD_DOI}>Scheinfeld et al., RadioGraphics 2015</Cite>
const KELLOCK = <Cite doi={KELLOCK_DOI}>Kellock et al., AJR 2019</Cite>
const GANSSLEN = <Cite doi={GANSSLEN_DOI}>Gänsslen et al., Arch Orthop Trauma Surg 2024</Cite>

const references: LessonReference[] = [
  { citation: 'Young JW, Burgess AR, Brumback RJ, Poka A. Pelvic fractures: value of plain radiography in early assessment and management. Radiology. 1986;160(2):445-451.', doi: YOUNG_DOI },
  { citation: 'Burgess AR, Eastridge BJ, Young JW, Ellison TS, Ellison PS Jr, Poka A, Bathon GH, Brumback RJ. Pelvic ring disruptions: effective classification system and treatment protocols. J Trauma. 1990;30(7):848-856.', doi: BURGESS_DOI },
  { citation: 'Dalal SA, Burgess AR, Siegel JH, Young JW, Brumback RJ, Poka A, Dunham CM, Gens D, Bathon H. Pelvic fracture in multiple trauma: classification by mechanism is key to pattern of organ injury, resuscitative requirements, and outcome. J Trauma. 1989;29(7):981-1002.', doi: DALAL_DOI },
  { citation: 'Khurana B, Sheehan SE, Sodickson AD, Weaver MJ. Pelvic ring fractures: what the orthopedic surgeon wants to know. RadioGraphics. 2014;34(5):1317-1333.', doi: KHURANA_DOI },
  { citation: 'Alton TB, Gee AO. Classifications in brief: Young and Burgess classification of pelvic ring injuries. Clin Orthop Relat Res. 2014;472(8):2338-2342.', doi: ALTON_DOI },
  { citation: 'Halawi MJ. Pelvic ring injuries: emergency assessment and management. J Clin Orthop Trauma. 2015;6(4):252-258.', doi: HALAWI_DOI },
  { citation: 'Leone E, Garipoli A, Ripani U, Lanzetti RM, Spoliti M, Creta D, Giannace C, Galluzzo A, Trinci M, Galluzzo M. Imaging review of pelvic ring fractures and its complications in high-energy trauma. Diagnostics (Basel). 2022;12(2):384.', doi: LEONE_DOI },
  { citation: 'Denis F, Davis S, Comfort T. Sacral fractures: an important problem. Retrospective analysis of 236 cases. Clin Orthop Relat Res. 1988;(227):67-81.', doi: DENIS_DOI },
  { citation: 'Rizkalla JM, Lines T, Nimmons S. Classifications in brief: the Denis classification of sacral fractures. Clin Orthop Relat Res. 2019;477(9):2178-2181.', doi: RIZKALLA_DOI },
  { citation: 'Roy-Camille R, Saillant G, Gagna G, Mazel C. Transverse fracture of the upper sacrum. Suicidal jumper\'s fracture. Spine (Phila Pa 1976). 1985;10(9):838-845.', doi: ROY_CAMILLE_DOI },
  { citation: 'Lyders EM, Whitlow CT, Baker MD, Morris PP. Imaging and treatment of sacral insufficiency fractures. AJNR Am J Neuroradiol. 2010;31(2):201-210.', doi: LYDERS_DOI },
  { citation: 'Judet R, Judet J, Letournel E. Fractures of the acetabulum: classification and surgical approaches for open reduction. Preliminary report. J Bone Joint Surg Am. 1964;46:1615-1646.', doi: JUDET_DOI },
  { citation: 'Letournel E. Acetabulum fractures: classification and management. Clin Orthop Relat Res. 1980;(151):81-106.', doi: LETOURNEL_DOI },
  { citation: 'Gänsslen A, Tonetti J, Pohlemann T. Algorithms in acetabular fracture classifications. Arch Orthop Trauma Surg. 2024;144(10):4655-4665.', doi: GANSSLEN_DOI },
  { citation: 'Durkee NJ, Jacobson J, Jamadar D, Karunakar MA, Morag Y, Hayes C. Classification of common acetabular fractures: radiographic and CT appearances. AJR Am J Roentgenol. 2006;187(4):915-925.', doi: DURKEE_DOI },
  { citation: 'Scheinfeld MH, Dym AA, Spektor M, Avery LL, Dym RJ, Amanatullah DF. Acetabular fractures: what radiologists should know and how 3D CT can aid classification. RadioGraphics. 2015;35(2):555-577.', doi: SCHEINFELD_DOI },
  { citation: 'Kellock TT, Khurana B, Mandell JC. Diagnostic performance of CT for occult proximal femoral fractures: a systematic review and meta-analysis. AJR Am J Roentgenol. 2019;213(6):1324-1330.', doi: KELLOCK_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

const ybTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Injury</th><th>Usually taught as</th></tr>
      </thead>
      <tbody>
        {ybTypes.map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(ybDescriptions[t])}</td><td>{ybStability[t]}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const ltTable = (types: LtType[]) => (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Fracture</th></tr>
      </thead>
      <tbody>
        {types.map((t) => (
          <tr key={t}><td className="vessel-name">{upperFirst(ltNames[t])}</td><td>{upperFirst(ltDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

/** P3-1: neurological deficit by Denis zone in Denis's series, rounded. */
const DENIS_DEFICIT: Record<string, number> = { '1': 6, '2': 28, '3': 57 }

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the pelvis CT that arrives with pain, or pain after an injury. The order, the protocol checklist and the pointers from the history are this site's own.</p>
        <p>Check for thin sections with coronal and sagittal reformats, read in bone and soft-tissue windows. Three-dimensional reconstructions help classify an acetabular fracture ({SCHEINFELD}).</p>
        <p>After a high-energy injury, read the whole ring, both acetabula and the soft tissues, and look for active bleeding. After a low-energy fall in an older patient, the hips, the pubic rami and the sacrum deserve the closest look. With pain and no injury, look for insufficiency fractures of the sacrum and the pubic bones (step 3).</p>
      </>
    ),
  },
  {
    id: 'ring',
    title: 'Step 2. Pelvic ring',
    body: (
      <>
        <p>The pelvic ring is classified by the force that broke it ({YOUNG}; {BURGESS}; {LEONE}). Lateral compression drives one hemipelvis inwards: the sacrum is compressed and the pubic rami break horizontally. AP compression opens the ring like a book: the symphysis widens, then the ligaments in front of the sacroiliac joint tear, then those behind it. Vertical shear pushes one hemipelvis upwards. The Young-Burgess calculator on this site applies the same rules.</p>
        {ybTable}
        <p>The ring rarely breaks in one place only: when the front is broken, look hard at the sacrum and the sacroiliac joints ({KHURANA}; {HALAWI}).</p>
        <p>A symphyseal diastasis over 2.5 cm usually means the pelvic floor ligaments and the front of the sacroiliac joint are torn, APC II or worse: in Young's original description, 2.5 cm was what separated APC I from APC II ({ALTON}; {LEONE}). A fracture of the L5 transverse process is a marker of vertical instability ({KHURANA}; {LEONE}).</p>
        <p>Stability is not part of the Young-Burgess system itself; the last column is how the types are usually taught alongside it ({ALTON}).</p>
        <p>The type predicted the pattern of organ injury and the resuscitation needed in Dalal's series of patients with multiple injuries: needs rose with the grade of AP compression, and APC III needed the most fluid in the first 24 hours ({DALAL}).</p>
      </>
    ),
  },
  {
    id: 'sacrum',
    title: 'Step 3. Sacrum and insufficiency fractures',
    body: (
      <>
        <p>Give a sacral fracture its Denis zone ({DENIS}): zone 1 lateral to the sacral foramina, zone 2 through the foramina, zone 3 medial to them, into the central canal. Neurological deficit rose with the zone, from about 6% in zone 1 to about 28% in zone 2 and about 57% in zone 3 (5.9%, 28.4% and 56.7%; {RIZKALLA}).</p>
        <p>A transverse fracture of the upper sacrum joined to vertical fractures on both sides (the U- or H-shaped fracture, the suicidal jumper's fracture) separates the spine from the pelvis ({ROY_CAMILLE}; {LEONE}). This lumbopelvic dissociation is highly unstable, and Denis's zones leave it out ({RIZKALLA}).</p>
        <p>Insufficiency fractures of the sacrum run vertically through the sacral ala, parallel to the sacroiliac joints, on one side or both about equally often, sometimes with a horizontal component through the sacral bodies. On CT they show as sclerosis or fracture lines, and they often come with insufficiency fractures of the pubic rami ({LYDERS}).</p>
      </>
    ),
  },
  {
    id: 'acetabulum',
    title: 'Step 4. Acetabulum',
    body: (
      <>
        <p>Name an acetabular fracture by Judet and Letournel ({JUDET}; {LETOURNEL}). The acetabulum sits between an anterior column, whose radiographic line is the iliopectineal line, and a posterior column, whose line is the ilioischial line ({DURKEE}). There are five elementary types:</p>
        {ltTable(ltElementary)}
        <p>and five associated types, made of two or more elementary ones ({GANSSLEN}):</p>
        {ltTable(ltAssociated)}
        <p>On CT, ask which column lines are broken, whether there is a posterior wall fragment, whether the obturator ring is broken, and whether any joint surface stays on the intact ilium ({DURKEE}; {SCHEINFELD}; {GANSSLEN}). With both lines broken and the obturator ring intact, the fracture is transverse; with the ring broken too, a fracture running up into the iliac wing is both-column and one that does not is T-shaped ({DURKEE}). A both-column fracture leaves no joint surface on the intact ilium; the spur sign is the sciatic buttress left behind, a shard of bone pointing backwards at the level of the acetabular roof ({DURKEE}). An isolated posterior wall fracture leaves the iliopectineal line intact, but its fragment can break the ilioischial line ({DURKEE}). The Letournel calculator on this site asks the same questions.</p>
        <p>Then describe the femoral head (concentric, subluxed or dislocated), intra-articular fragments, marginal impaction and the articular gap or step. These descriptors are this site's checklist.</p>
      </>
    ),
  },
  {
    id: 'hips',
    title: 'Step 5. Proximal femora',
    body: (
      <>
        <p>Look at both femoral heads, necks and trochanters. After a low-energy fall, a hip fracture may not show on radiographs. CT finds most of them (a summary sensitivity of 94% and specificity of 100% against MRI or clinical follow-up), but when concern about a hip fracture continues despite a normal CT, MRI should be performed ({KELLOCK}).</p>
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 6. Bleeding, bladder and soft tissues',
    body: (
      <>
        <p>On a contrast-enhanced CT, look for active arterial extravasation, a blush of contrast that grows on later images, and for the size of the pelvic hematoma. Look at the bladder and the urethra region for injury. This checklist is this site's own; so is putting active bleeding first in the impression.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    body: (
      <>
        <p>Give active bleeding first, then the ring injury with its type, the sacral fracture with its zone, the acetabular fracture with its type and the femoral head, and the hips.</p>
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
const noYes: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]
const sides: Option[] = [
  { value: 'Right', label: 'Right' },
  { value: 'Left', label: 'Left' },
  { value: 'Both', label: 'Both' },
]

const ringPresent = (v: Values) => str(v, 'ring') === 'present'
const sacrumPresent = (v: Values) => ['traumatic', 'insufficiency'].includes(str(v, 'sacrum'))
const acetPresent = (v: Values) => str(v, 'acet') === 'present'
const hipPresent = (v: Values) => !['', 'none'].includes(str(v, 'hip'))

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain, no injury given' },
    { value: 'low', label: 'Low-energy injury, such as a fall from standing' },
    { value: 'high', label: 'High-energy injury' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'Thin sections with coronal and sagittal reformats, in bone and soft-tissue windows.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'reformats', label: 'Coronal and sagittal reformats' },
    { value: 'soft', label: 'Soft-tissue window' },
  ] },

  ring: { id: 'ring', kind: 'choice', label: 'Pelvic ring disruption', required: true, options: nonePresent },
  ringType: { id: 'ring-type', kind: 'choice', label: 'Young-Burgess type', showIf: ringPresent, help: 'As in the Young-Burgess calculator.', options: ybTypes.map((t) => ({ value: t, label: `${t}: ${ybDescriptions[t]}` })) },
  ringText: { id: 'ring-text', kind: 'text', label: 'Ring injury (describe)', placeholder: 'e.g. right sacral ala impaction, right superior and inferior rami', showIf: ringPresent },
  diastasis: { id: 'diastasis', kind: 'number', label: 'Symphyseal diastasis', unit: 'mm', min: 0, max: 150, step: 1, showIf: ringPresent },
  l5: { id: 'l5', kind: 'choice', label: 'L5 transverse process fracture', showIf: ringPresent, options: noYes },

  sacrum: { id: 'sacrum', kind: 'choice', label: 'Sacral fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'traumatic', label: 'Traumatic fracture' },
    { value: 'insufficiency', label: 'Insufficiency fracture' },
  ] },
  sacrumSide: { id: 'sacrum-side', kind: 'choice', label: 'Side', showIf: sacrumPresent, options: sides },
  sacrumZone: { id: 'sacrum-zone', kind: 'choice', label: 'Denis zone (the most medial)', showIf: sacrumPresent, options: [
    { value: '1', label: 'Zone 1: lateral to the foramina' },
    { value: '2', label: 'Zone 2: through the foramina' },
    { value: '3', label: 'Zone 3: medial to the foramina, into the canal' },
  ] },
  sacrumTransverse: { id: 'sacrum-transverse', kind: 'choice', label: 'Transverse line joining vertical fractures on both sides (H or U shape)', showIf: sacrumPresent, options: noYes },

  acet: { id: 'acet', kind: 'choice', label: 'Acetabular fracture', required: true, options: nonePresent },
  acetSide: { id: 'acet-side', kind: 'choice', label: 'Side', showIf: acetPresent, options: sides.slice(0, 2) },
  acetType: { id: 'acet-type', kind: 'choice', label: 'Letournel type', showIf: acetPresent, help: 'As in the Letournel calculator.', options: ltTypes.map((t) => ({ value: t, label: `${upperFirst(ltNames[t])} (${ltIsAssociated(t) ? 'associated' : 'elementary'})` })) },
  acetWall: { id: 'acet-wall', kind: 'choice', label: 'Posterior wall fragment as well', showIf: (v) => acetPresent(v) && ['TS', 'ACPHT', 'BC'].includes(str(v, 'acet-type')), options: noYes },
  acetHead: { id: 'acet-head', kind: 'choice', label: 'Femoral head', showIf: acetPresent, options: [
    { value: 'concentric', label: 'Concentric' },
    { value: 'subluxed', label: 'Subluxed' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  acetFeatures: { id: 'acet-features', kind: 'multi', label: 'Also', showIf: acetPresent, options: [
    { value: 'fragments', label: 'Intra-articular fragments' },
    { value: 'impaction', label: 'Marginal impaction' },
  ] },
  acetGap: { id: 'acet-gap', kind: 'number', label: 'Largest articular gap or step', unit: 'mm', min: 0, max: 100, step: 1, showIf: acetPresent },

  hip: { id: 'hip', kind: 'choice', label: 'Proximal femur', required: true, options: [
    { value: 'none', label: 'No fracture' },
    { value: 'head', label: 'Femoral head fracture' },
    { value: 'neck', label: 'Femoral neck fracture' },
    { value: 'intertrochanteric', label: 'Intertrochanteric fracture' },
    { value: 'subtrochanteric', label: 'Subtrochanteric fracture' },
    { value: 'trochanter', label: 'Greater trochanter fracture only' },
    { value: 'dislocation', label: 'Hip dislocation without fracture' },
  ] },
  hipSide: { id: 'hip-side', kind: 'choice', label: 'Side', showIf: hipPresent, options: sides },
  hipText: { id: 'hip-text', kind: 'text', label: 'Describe (optional)', placeholder: 'e.g. displaced, subcapital', showIf: hipPresent },

  extravasation: { id: 'extravasation', kind: 'choice', label: 'Active arterial extravasation', required: true, options: [
    { value: 'no', label: 'None' },
    { value: 'yes', label: 'Present' },
    { value: 'unenhanced', label: 'Not assessable (no contrast)' },
  ] },
  extravasationText: { id: 'extravasation-text', kind: 'text', label: 'Where', placeholder: 'e.g. right internal iliac branch, beside the sacroiliac joint', showIf: (v) => str(v, 'extravasation') === 'yes' },
  hematoma: { id: 'hematoma', kind: 'choice', label: 'Pelvic hematoma', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'large', label: 'Large' },
  ] },
  bladder: { id: 'bladder', kind: 'choice', label: 'Bladder', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'injury', label: 'Injury suspected' },
    { value: 'not-assessed', label: 'Not assessed' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. degenerative change of both hips' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-bleeding', label: 'No active bleeding' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

function ringType(values: Values): YbType | undefined {
  const value = str(values, 'ring-type')
  return ringPresent(values) && (ybTypes as string[]).includes(value) ? value as YbType : undefined
}

function acetType(values: Values): LtType | undefined {
  const value = str(values, 'acet-type')
  return acetPresent(values) && (ltTypes as string[]).includes(value) ? value as LtType : undefined
}

function diastasis(values: Values): number | undefined {
  return ringPresent(values) ? num(values, 'diastasis') : undefined
}

const VERTICALLY_STABLE: YbType[] = ['LC I', 'LC II', 'LC III', 'APC I', 'APC II']

/* Rule chips. */

function deriveRing(values: Values): Derived[] {
  if (!ringPresent(values)) return []
  const out: Derived[] = []
  const type = ringType(values)
  // YB-8: stability as usually taught.
  if (type) out.push({ label: 'Young-Burgess', value: `${type}: usually ${ybStability[type]}`, tone: ybStability[type] === 'stable' ? 'neutral' : 'warn' })
  // YB-6: diastasis over 2.5 cm.
  const gap = diastasis(values)
  if (gap !== undefined) out.push(diastasisOver(gap) ? { label: 'Symphysis', value: 'Over 2.5 cm: usually APC II or worse', tone: 'warn' } : { label: 'Symphysis', value: 'Within 2.5 cm' })
  // P2-2: L5 transverse process fracture marks vertical instability.
  if (str(values, 'l5') === 'yes') out.push({ label: 'L5 transverse process', value: 'Fracture: a marker of vertical instability', tone: 'warn' })
  return out
}

function deriveSacrum(values: Values): Derived[] {
  if (!sacrumPresent(values)) return []
  const out: Derived[] = []
  // P3-1: neurological deficit by Denis zone.
  const zone = str(values, 'sacrum-zone')
  if (zone in DENIS_DEFICIT) out.push({ label: 'Denis', value: `Zone ${zone}: neurological deficit in about ${DENIS_DEFICIT[zone]}% in Denis's series`, tone: zone === '1' ? 'neutral' : 'warn' })
  // P3-2, P3-3: the H or U shape.
  if (str(values, 'sacrum-transverse') === 'yes') {
    out.push(str(values, 'sacrum') === 'insufficiency'
      ? { label: 'Pattern', value: 'Insufficiency fracture with a horizontal component through the sacral bodies', tone: 'warn' }
      : { label: 'Pattern', value: 'U- or H-shaped: the spine is separated from the pelvis', tone: 'warn' })
  }
  return out
}

function deriveAcetabulum(values: Values): Derived[] {
  const type = acetType(values)
  if (!type) return []
  // LT-1 to LT-3 via the shared logic.
  return [{ label: 'Letournel', value: `${upperFirst(ltNames[type])} (${ltIsAssociated(type) ? 'associated' : 'elementary'})`, tone: 'warn' }]
}

function deriveHips(values: Values): Derived[] {
  // P5-1: with ongoing concern despite a normal CT, MRI should be performed.
  if (str(values, 'hip') === 'none' && str(values, 'history') !== 'high' && str(values, 'history') !== '') {
    return [{ label: 'Occult hip fracture', value: 'If concern continues despite a normal CT, MRI should be performed' }]
  }
  return []
}

function deriveSoftTissues(values: Values): Derived[] {
  // The site's own order: active bleeding goes first in the impression.
  return str(values, 'extravasation') === 'yes' ? [{ label: 'Active bleeding', value: 'Goes first in the impression', tone: 'warn' }] : []
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
    protocol === 'complete' && 'Technique: thin sections with coronal and sagittal reformats, bone and soft-tissue windows',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
  ]
}

function ringLines(values: Values): (string | false | undefined)[] {
  const ring = str(values, 'ring')
  const type = ringType(values)
  const gap = diastasis(values)
  return [
    ring === 'none' && 'Pelvic ring: intact',
    ring === 'present' && `Pelvic ring: ${join([type && `Young-Burgess ${type}`, str(values, 'ring-text'), gap !== undefined && `symphyseal diastasis ${gap} mm`, str(values, 'l5') === 'yes' && 'L5 transverse process fracture'], ', ') || 'disrupted'}`,
  ]
}

function sacrumLines(values: Values): (string | false)[] {
  const sacrum = str(values, 'sacrum')
  const zone = str(values, 'sacrum-zone')
  return [
    sacrum === 'none' && 'Sacrum: no fracture',
    sacrumPresent(values) && `Sacrum: ${join([picked(values, fields.sacrum), lowerFirst(str(values, 'sacrum-side')), zone && `Denis zone ${zone}`, str(values, 'sacrum-transverse') === 'yes' && 'with a transverse line (H or U shape)'], ', ')}`,
  ]
}

function acetabulumLines(values: Values): (string | false)[] {
  const acet = str(values, 'acet')
  const type = acetType(values)
  const gap = num(values, 'acet-gap')
  const features = chosen(values, fields.acetFeatures)
  return [
    acet === 'none' && 'Acetabula: no fracture',
    acet === 'present' && `Acetabulum: ${join([
      str(values, 'acet-side') && `${lowerFirst(str(values, 'acet-side'))}`,
      type && `Letournel ${ltNames[type]}${ltExtraWall(type, str(values, 'acet-wall') === 'yes') ? ' with a posterior wall fragment' : ''}`,
      str(values, 'acet-head') && `femoral head ${picked(values, fields.acetHead)}`,
      ...features,
      gap !== undefined && `articular gap or step ${gap} mm`,
    ], ', ') || 'fracture'}`,
  ]
}

function hipLines(values: Values): (string | false)[] {
  const hip = str(values, 'hip')
  return [
    hip === 'none' && 'Proximal femora: no fracture',
    hipPresent(values) && `Proximal femur: ${join([lowerFirst(str(values, 'hip-side')), picked(values, fields.hip), str(values, 'hip-text')], ', ')}`,
  ]
}

function softTissueLines(values: Values): string[] {
  return [
    choiceLine(values, fields.extravasation, str(values, 'extravasation') === 'yes' && str(values, 'extravasation-text')),
    choiceLine(values, fields.hematoma),
    choiceLine(values, fields.bladder),
  ]
}

/* The impression: active bleeding first, then the bones from the ring outwards. */

function sideWord(values: Values, id: string): string {
  const side = str(values, id)
  return side === 'Both' ? 'Bilateral' : side
}

function findings(values: Values): string[] {
  const out: string[] = []
  if (str(values, 'extravasation') === 'yes') out.push(`Active arterial extravasation${str(values, 'extravasation-text') ? `: ${str(values, 'extravasation-text')}` : ''}.`)

  if (ringPresent(values)) {
    const type = ringType(values)
    const gap = diastasis(values)
    const extras = join([gap !== undefined && `symphyseal diastasis ${gap} mm`, str(values, 'l5') === 'yes' && 'L5 transverse process fracture'], ', ')
    if (type) out.push(`${ybSentence(type).slice(0, -1)}${extras ? `; ${extras}` : ''}.`)
    else out.push(`Pelvic ring injury${str(values, 'ring-text') ? `: ${str(values, 'ring-text')}` : ''}${extras ? `; ${extras}` : ''}.`)
  }

  if (sacrumPresent(values)) {
    const insufficiency = str(values, 'sacrum') === 'insufficiency'
    const zone = str(values, 'sacrum-zone')
    const side = sideWord(values, 'sacrum-side')
    const shape = str(values, 'sacrum-transverse') === 'yes' && (insufficiency ? 'with a horizontal component through the sacral bodies' : 'U- or H-shaped, separating the spine from the pelvis')
    const head = `${side ? `${side} sacral` : 'Sacral'} ${insufficiency ? 'insufficiency fracture' : 'fracture'}`
    out.push(`${head}${zone ? `, Denis zone ${zone}` : ''}${shape ? `, ${shape}` : ''}.`)
  }

  if (acetPresent(values)) {
    const type = acetType(values)
    const side = str(values, 'acet-side') || undefined
    const head = str(values, 'acet-head')
    const extras = join([head && head !== 'concentric' && `femoral head ${head}`, ...chosen(values, fields.acetFeatures)], ', ')
    const base = type ? ltSentence(type, str(values, 'acet-wall') === 'yes', side).slice(0, -1) : `${side ? `${side} acetabular` : 'Acetabular'} fracture`
    out.push(`${base}${extras ? `; ${extras}` : ''}.`)
  }

  if (hipPresent(values)) {
    const kind = str(values, 'hip')
    const side = sideWord(values, 'hip-side')
    const label = optionLabel(fields.hip, kind)
    const text = str(values, 'hip-text')
    out.push(`${side ? `${side} ${lowerFirst(label)}` : label}${text ? `, ${text}` : ''}.`)
  }

  if (str(values, 'hematoma') === 'large') out.push('Large pelvic hematoma.')
  if (str(values, 'bladder') === 'injury') out.push('Bladder injury suspected.')
  return out
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
    return complete(values) ? `Impression: ${lines(limited, 'No acute fracture or dislocation of the pelvis or hips.')}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = [
    ringPresent(values) && 'pelvic ring injury',
    sacrumPresent(values) && 'sacral fracture',
    acetPresent(values) && 'acetabular fracture',
    hipPresent(values) && str(values, 'hip') !== 'dislocation' && 'proximal femoral fracture',
  ].filter((item): item is string => Boolean(item))
  if (negatives.includes('no-fracture') && fractures.length > 0) out.push(`Impression says no fracture, but these are entered: ${fractures.join(', ')}.`)
  if (negatives.includes('no-bleeding') && str(values, 'extravasation') === 'yes') out.push('Impression says no active bleeding, but active arterial extravasation is entered.')

  const type = ringType(values)
  const gap = diastasis(values)
  // YB-6 against YB-2: a wide diastasis with APC I entered.
  if (type === 'APC I' && gap !== undefined && diastasisOver(gap)) out.push(`Symphyseal diastasis ${gap} mm is over 2.5 cm, which usually means APC II or worse, but APC I is entered: look again at the front of the sacroiliac joints.`)
  // P2-2 against YB-8: an L5 marker with a vertically stable type.
  if (type && VERTICALLY_STABLE.includes(type) && str(values, 'l5') === 'yes') out.push(`An L5 transverse process fracture marks vertical instability, but ${type} is usually vertically stable: look again for vertical displacement.`)
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...ringLines(values),
    ...sacrumLines(values),
    ...acetabulumLines(values),
    ...hipLines(values),
    ...softTissueLines(values),
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
    teach: <p>Thin sections with coronal and sagittal reformats, in bone and soft-tissue windows; 3D reconstructions help with the acetabulum ({SCHEINFELD}). The protocol checklist and the pointers from the history are this site's own.</p>,
    fields: [fields.history, fields.protocol, fields.protocolMissing],
  },
  {
    id: 'ring',
    title: 'Step 2. Pelvic ring',
    learn: 'ring',
    teach: (
      <>
        <p>Young-Burgess types by force vector ({YOUNG}; {BURGESS}). A diastasis over 2.5 cm usually means APC II or worse; an L5 transverse process fracture marks vertical instability ({KHURANA}; {LEONE}).</p>
        {ybTable}
      </>
    ),
    fields: [fields.ring, fields.ringType, fields.ringText, fields.diastasis, fields.l5],
    derive: deriveRing,
  },
  {
    id: 'sacrum',
    title: 'Step 3. Sacrum and insufficiency fractures',
    learn: 'sacrum',
    teach: <p>Denis zones 1 to 3, lateral to, through and medial to the foramina, with deficit rising from about 6% to 57% ({DENIS}; {RIZKALLA}). A U- or H-shaped fracture separates the spine from the pelvis ({ROY_CAMILLE}; {RIZKALLA}). Insufficiency fractures run vertically through the ala, on one side or both ({LYDERS}).</p>,
    fields: [fields.sacrum, fields.sacrumSide, fields.sacrumZone, fields.sacrumTransverse],
    derive: deriveSacrum,
  },
  {
    id: 'acetabulum',
    title: 'Step 4. Acetabulum',
    learn: 'acetabulum',
    teach: <p>Which column lines are broken, a posterior wall fragment, the obturator ring, and any joint surface left on the intact ilium decide the Letournel type ({DURKEE}; {SCHEINFELD}). Then the femoral head, fragments, impaction and the articular gap.</p>,
    fields: [fields.acet, fields.acetSide, fields.acetType, fields.acetWall, fields.acetHead, fields.acetFeatures, fields.acetGap],
    derive: deriveAcetabulum,
  },
  {
    id: 'hips',
    title: 'Step 5. Proximal femora',
    learn: 'hips',
    teach: <p>When concern about a hip fracture continues despite a normal CT, MRI should be performed ({KELLOCK}).</p>,
    fields: [fields.hip, fields.hipSide, fields.hipText],
    derive: deriveHips,
  },
  {
    id: 'soft-tissues',
    title: 'Step 6. Bleeding, bladder and soft tissues',
    learn: 'soft-tissues',
    teach: <p>Active arterial extravasation, the size of the hematoma, and the bladder. This checklist is this site's own.</p>,
    fields: [fields.extravasation, fields.extravasationText, fields.hematoma, fields.bladder],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    learn: 'impression',
    teach: <p>Active bleeding first, then the ring, sacrum, acetabulum and hips.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'pelvis-ct',
  name: 'Pelvis CT for pain or injury',
  lede: 'Read a pelvis CT for pain or injury: Young-Burgess ring injuries, sacral fractures and insufficiency fractures, Letournel acetabular types, the hips, active bleeding, and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, and the claims are checked against abstracts and reviews read in full, except parts of the Letournel elementary-type wording (the posterior column fracture running through the greater sciatic notch, the anterior wall fragment breaking the middle of the iliopectineal line, the anterior column fracture starting at the anterior border of the ilium) and whether Roy-Camille himself described the U or H shape.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'lc1',
      question: 'A pelvic CT after a side impact shows compression of the right sacral ala and horizontal fractures of the right pubic rami. What is the Young-Burgess type?',
      options: ['LC I', 'LC II', 'APC I', 'Vertical shear'],
      answer: 0,
      explanation: <p>LC I is sacral compression on the side of impact with transverse (horizontal) pubic rami fractures; LC II breaks the posterior ring on that side through the ilium (a crescent fracture-dislocation) or the sacroiliac joint ({YOUNG}; {ALTON}; {LEONE}).</p>,
    },
    {
      id: 'lc3',
      question: 'Lateral compression of one side comes with an open book of the other side. What is it called?',
      options: ['APC III', 'LC III, the windswept pelvis', 'Combined mechanical injury', 'LC II'],
      answer: 1,
      explanation: <p>LC III is lateral compression on the side of impact with AP compression of the other side, the windswept pelvis ({YOUNG}; {BURGESS}; {LEONE}).</p>,
    },
    {
      id: 'apc2',
      question: 'The symphysis is widened and the front of the right sacroiliac joint is open, but the back is closed. What is the type?',
      options: ['APC I', 'APC II', 'APC III', 'LC I'],
      answer: 1,
      explanation: <p>APC II tears the anterior sacroiliac, sacrospinous and sacrotuberous ligaments and leaves the posterior sacroiliac ligaments intact. APC III tears them too ({YOUNG}; {LEONE}).</p>,
    },
    {
      id: 'diastasis',
      question: 'What symphyseal diastasis usually means the pelvic floor ligaments are torn (APC II or worse)?',
      options: ['Over 1 cm', 'Over 2.5 cm', 'Over 5 cm', 'Any widening'],
      answer: 1,
      explanation: <p>A diastasis over 2.5 cm usually means APC II or worse; 2.5 cm separated APC I from APC II in Young's original description ({ALTON}; {KHURANA}).</p>,
    },
    {
      id: 'l5',
      question: 'Which finding is a marker of vertical instability of the pelvic ring?',
      options: ['A horizontal pubic ramus fracture', 'An L5 transverse process fracture', 'Sacral ala buckling', 'A small pelvic hematoma'],
      answer: 1,
      explanation: <p>A fracture of the L5 transverse process is a marker of vertical instability ({KHURANA}; {LEONE}).</p>,
    },
    {
      id: 'denis',
      question: 'A sacral fracture runs through the sacral foramina. What is its Denis zone, and roughly how often was there a neurological deficit?',
      options: ['Zone 1, about 6%', 'Zone 2, about 28%', 'Zone 3, about 57%', 'Zone 2, about 57%'],
      answer: 1,
      explanation: <p>Zone 1 is lateral to the foramina, zone 2 through them, zone 3 medial to them. Deficit rose from about 6% to about 28% and about 57% ({DENIS}; {RIZKALLA}).</p>,
    },
    {
      id: 'insufficiency',
      question: 'An older woman has buttock pain and no injury. Where do sacral insufficiency fractures usually run?',
      options: ['Horizontally through S4', 'Vertically through the sacral ala, parallel to the sacroiliac joints', 'Through the coccyx', 'Through the S1 body only'],
      answer: 1,
      explanation: <p>They run vertically through the sacral ala, parallel to the sacroiliac joints, on one side or both, sometimes with a horizontal component through the sacral bodies ({LYDERS}).</p>,
    },
    {
      id: 'transverse',
      question: 'Both the iliopectineal and the ilioischial lines are broken, and the obturator ring is intact. Which Letournel type is it?',
      options: ['Both-column', 'T-shaped', 'Transverse', 'Posterior column'],
      answer: 2,
      explanation: <p>With both column lines broken and the obturator ring intact, the fracture is transverse; a T-shaped fracture breaks the obturator ring ({DURKEE}).</p>,
    },
    {
      id: 'both-column',
      question: 'What defines a both-column acetabular fracture?',
      options: ['Any fracture of both columns', 'No joint surface left attached to the intact ilium', 'A posterior wall fragment with a transverse fracture', 'An intact obturator ring'],
      answer: 1,
      explanation: <p>Both columns are separated from each other and from the ilium, so no joint surface stays on the intact ilium; the spike of ilium left behind is the spur sign ({LETOURNEL}; {SCHEINFELD}; {GANSSLEN}).</p>,
    },
    {
      id: 'occult-hip',
      question: 'After a fall from standing, CT shows no hip fracture but the patient still cannot bear weight. What does the lesson suggest?',
      options: ['No further imaging', 'MRI, because CT can miss an occult hip fracture', 'A repeat CT the same day', 'Radiographs only'],
      answer: 1,
      explanation: <p>CT had a summary sensitivity of 94% for an occult proximal femoral fracture; with ongoing concern despite a normal CT, MRI should be performed ({KELLOCK}).</p>,
    },
  ],
}

export function PelvisCtStudyPage() {
  return <StudyPage study={study} />
}
