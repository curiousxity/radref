import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, QuizQuestion, ReportStep, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part I. Anatomy and inflammatory and neoplastic processes. Radiology 2013;269:17–33.', doi: '10.1148/radiol.13120733' },
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part II. Traumatic, postoperative, and noninflammatory nonneoplastic conditions. Radiology 2015;276:655–672.', doi: '10.1148/radiol.2015140800' },
  { citation: 'Cavaliere M et al. CT-structured reporting in middle ear opacification: surgical results and clinical considerations from a large retrospective analysis. Front Neurol 2021;12:615356. Open access; contains the checklist and Figure 2 cases.', doi: '10.3389/fneur.2021.615356' },
  { citation: 'Baráth K et al. Neuroradiology of cholesteatomas. AJNR 2011;32:221–229.', doi: '10.3174/ajnr.A2052' },
  { citation: 'Lingam RK, Bassett P. A meta-analysis on the diagnostic performance of non-echoplanar DWI in detecting middle ear cholesteatoma: 10 years on. Otol Neurotol 2017;38:521–528.', doi: '10.1097/MAO.0000000000001353' },
  { citation: 'Lee TC et al. CT grading of otosclerosis. AJNR 2009;30:1435–1439.', doi: '10.3174/ajnr.A1558' },
  { citation: 'Belden CJ et al. CT evaluation of bone dehiscence of the superior semicircular canal as a cause of sound- and/or pressure-induced vertigo. Radiology 2003;226:337–343.', doi: '10.1148/radiol.2262010897' },
  { citation: 'Vijayasekaran S et al. When is the vestibular aqueduct enlarged? AJNR 2007;28:1133–1138.', doi: '10.3174/ajnr.A0495' },
  { citation: 'Sennaroglu L, Saatci I. A new classification for cochleovestibular malformations. Laryngoscope 2002;112:2230–2241.', doi: '10.1097/00005537-200212000-00019' },
  { citation: 'Sennaroğlu L, Bajin MD. Classification and current management of inner ear malformations. Balkan Med J 2017;34:397–411. Open access.', doi: '10.4274/balkanmedj.2017.0367' },
  { citation: 'Sennaroglu L, Sarac S, Ergin T. Surgical results of cochlear implantation in malformed cochlea. Otol Neurotol 2006;27:615–623.', doi: '10.1097/01.mao.0000224090.94882.b4' },
  { citation: 'Joshi VM et al. CT and MR imaging of the inner ear and brain in children with congenital sensorineural hearing loss. RadioGraphics 2012;32:683–698.', doi: '10.1148/rg.323115073' },
  { citation: 'Ishman SL, Friedland DR. Temporal bone fractures: traditional classification and clinical relevance. Laryngoscope 2004;114:1734–1741.', doi: '10.1097/00005537-200410000-00011' },
  { citation: 'Little SC, Kesser BW. Radiographic classification of temporal bone fractures: clinical predictability using a new system. Arch Otolaryngol Head Neck Surg 2006;132:1300–1304.', doi: '10.1001/archotol.132.12.1300' },
  { citation: 'Razek AA, Huang BY. Lesions of the petrous apex: classification and findings at CT and MR imaging. RadioGraphics 2012;32:151–173.', doi: '10.1148/rg.321105758' },
]

const DOI = {
  juliano1: '10.1148/radiol.13120733',
  juliano2: '10.1148/radiol.2015140800',
  cavaliere: '10.3389/fneur.2021.615356',
  barath: '10.3174/ajnr.A2052',
  lingam: '10.1097/MAO.0000000000001353',
  lee: '10.3174/ajnr.A1558',
  belden: '10.1148/radiol.2262010897',
  vijay: '10.3174/ajnr.A0495',
  senn2002: '10.1097/00005537-200212000-00019',
  senn2006: '10.1097/01.mao.0000224090.94882.b4',
  joshi: '10.1148/rg.323115073',
  ishman: '10.1097/00005537-200410000-00011',
  little: '10.1001/archotol.132.12.1300',
  razek: '10.1148/rg.321105758',
}

const reportTemplate = `CT TEMPORAL BONES WITHOUT CONTRAST

TECHNIQUE: Thin-section helical axial with coronal reformats, bone algorithm;
Pöschl/Stenvers reformats of the superior semicircular canals.

RIGHT / LEFT (report each ear fully)

EAC: patent / soft tissue / wall erosion: none
TM & SCUTUM: scutum sharp / blunted / eroded
MIDDLE EAR: clear / opacified — epitympanum / mesotympanum / hypotympanum /
  sinus tympani / facial recess / aditus / antrum
  Character: fluid-like / mass-like soft tissue, non-dependent
OSSICLES: malleus ___ / incus (body, long process) ___ / stapes ___
  Tympanosclerosis: none
MASTOID: pneumatized / sclerotic; opacified: no; septal breakdown: none;
  Körner's septum: absent
FACIAL NERVE CANAL: labyrinthine ___ / geniculate ___ / tympanic ___ /
  second genu ___ / mastoid ___ ; dehiscence: none; course: normal
LABYRINTH: cochlea 2.5 turns, modiolus present; vestibule normal;
  semicircular canals intact; lateral canal fistula: none;
  superior canal dehiscence (Pöschl/Stenvers): none;
  vestibular aqueduct: normal (midpoint __ mm); otic capsule density: normal;
  fenestral / retrofenestral lucency: none; oval and round windows: patent
TEGMEN: tympani intact / thinned / dehiscent; mastoideum intact
VESSELS: sigmoid sinus position normal / anterior; sigmoid plate intact;
  jugular bulb: normal / high-riding / dehiscent; carotid canal: intact,
  normal course; foramen spinosum present
PETROUS APEX: symmetrically aerated / non-aerated marrow / lesion: none
IAC: normal caliber, symmetric
EUSTACHIAN TUBE REGION: clear / opacified
PRIOR SURGERY: none / describe (canal wall up/down, prosthesis, implant)
OTHER: TMJ, visible brain, skull base

IMPRESSION:
1. Disease summary: what, where, how far (e.g., "right attic cholesteatoma
   extending into the aditus and antrum").
2. What is eroded, ossicle by ossicle.
3. Surgical-risk anatomy, listed explicitly, including negatives
   (e.g., "dehiscent tympanic facial nerve segment; lateral canal fistula
   with intact endosteum; tegmen intact; jugular bulb high-riding but
   covered; sigmoid sinus normal position").
4. Recommendation: DWI MRI / contrast study / CTA as indicated.`

/* ---------- Fields: each ear is reported fully, so every ear field exists twice ---------- */

type Side = 'r' | 'l'
const SIDES: Side[] = ['r', 'l']
const SIDE: Record<Side, string> = { r: 'Right', l: 'Left' }
const k = (s: Side, key: string) => `${s}_${key}`

type Extra = { help?: string; showIf?: (v: Values) => boolean; required?: boolean }

const o = (value: string, label: string): Option => ({ value, label })

function choice(id: string, label: string, options: Option[], extra: Extra = {}): Field {
  return { kind: 'choice', id, label, options, ...extra }
}
function multi(id: string, label: string, options: Option[], extra: Extra = {}): Field {
  return { kind: 'multi', id, label, options, ...extra }
}
function measure(id: string, label: string, unit: string, extra: Extra = {}): Field {
  return { kind: 'number', id, label, unit, min: 0, step: 0.1, ...extra }
}
function text(id: string, label: string, extra: Extra & { placeholder?: string; multiline?: boolean } = {}): Field {
  return { kind: 'text', id, label, ...extra }
}

function sideOn(v: Values, s: Side) {
  const sides = str(v, 'sides')
  return sides === '' || sides === 'both' || sides === s
}
function activeSides(v: Values) {
  return SIDES.filter((s) => sideOn(v, s))
}

/** One set of fields per ear, labelled "Right: ..." / "Left: ...", shown only for the ears being reported. */
function perEar(make: (s: Side) => Field[]): Field[] {
  return SIDES.flatMap((s) =>
    make(s).map((field) => ({
      ...field,
      label: `${SIDE[s]}: ${field.label}`,
      showIf: (v: Values) => sideOn(v, s) && (field.showIf?.(v) ?? true),
    }) as Field),
  )
}

/** Chips per ear, labelled with the side. */
function perEarDerive(make: (v: Values, s: Side) => Derived[]) {
  return (v: Values) => activeSides(v).flatMap((s) => make(v, s).map((d) => ({ ...d, label: `${SIDE[s]}: ${d.label}` })))
}

const SIDES_OPTS = [o('both', 'Both ears'), o('r', 'Right only'), o('l', 'Left only')]
const NO_YES = [o('no', 'No'), o('yes', 'Yes')]
const NONE_PRESENT = [o('none', 'None'), o('present', 'Present')]
const EAC = [o('patent', 'Patent'), o('soft', 'Soft tissue'), o('narrow', 'Narrowed / atretic')]
const SCUTUM = [o('sharp', 'Sharp'), o('blunted', 'Blunted'), o('eroded', 'Eroded')]
const ME = [o('clear', 'Clear'), o('opacified', 'Opacified')]
const ME_COMP = [
  o('epi', 'Epitympanum'),
  o('meso', 'Mesotympanum'),
  o('hypo', 'Hypotympanum'),
  o('st', 'Sinus tympani'),
  o('fr', 'Facial recess'),
  o('aditus', 'Aditus'),
  o('antrum', 'Antrum'),
]
const ME_CHAR = [o('fluid', 'Fluid-like'), o('mass', 'Mass-like, non-dependent')]
const CLEAR_OPAQUE = [o('clear', 'Clear'), o('opacified', 'Opacified')]
const OSS = [o('intact', 'Intact'), o('eroded', 'Eroded'), o('absent', 'Absent')]
const OSSICLES = [
  { key: 'malleus', name: 'malleus' },
  { key: 'incusBody', name: 'incus body' },
  { key: 'incusLp', name: 'incus long process' },
  { key: 'stapes', name: 'stapes' },
]
const PNEUMA = [o('pneumatized', 'Pneumatized'), o('sclerotic', 'Sclerotic'), o('contracted', 'Contracted')]
const ABSENT_PRESENT = [o('absent', 'Absent'), o('present', 'Present')]
const FACIAL_SEG = [o('intact', 'Intact'), o('dehiscent', 'Dehiscent')]
const FACIAL_SEGMENTS = [
  { key: 'lab', name: 'labyrinthine' },
  { key: 'gen', name: 'geniculate' },
  { key: 'tymp', name: 'tympanic' },
  { key: 'genu', name: 'second genu' },
  { key: 'mast', name: 'mastoid' },
]
const FACIAL_COURSE = [o('normal', 'Normal'), o('anterior', 'Anteriorly displaced'), o('other', 'Other abnormal course')]
const COCHLEA = [
  o('normal', 'Normal (2.5 turns, modiolus present)'),
  o('michel', 'Michel (no inner ear)'),
  o('aplasia', 'Cochlear aplasia'),
  o('cc', 'Common cavity'),
  o('ip1', 'Incomplete partition type I'),
  o('hypo', 'Cochlear hypoplasia'),
  o('ip2', 'Incomplete partition type II'),
]
const VESTIBULE = [o('normal', 'Normal'), o('dilated', 'Dilated'), o('cystic', 'Cystic')]
const SCC = [o('intact', 'Intact'), o('abnormal', 'Abnormal')]
const FISTULA = [o('none', 'None'), o('incomplete', 'Incomplete (thinned wall)'), o('complete', 'Complete (breached)')]
const SSCD_SITE = [o('arcuate', 'Under the arcuate eminence'), o('sps', 'At the superior petrosal sinus')]
const CAPSULE = [o('normal', 'Normal'), o('lucent', 'Lucent')]
const RETRO = [
  o('none', 'None'),
  o('basal', 'Patchy, basal turn'),
  o('apical', 'Patchy, middle/apical turns'),
  o('both', 'Patchy, basal and middle/apical'),
  o('diffuse', 'Diffuse confluent'),
]
const OVAL = [o('patent', 'Patent'), o('fixed', 'Fixed'), o('eroded', 'Eroded'), o('obliterated', 'Obliterated')]
const ROUND = [o('patent', 'Patent'), o('obliterated', 'Obliterated')]
const SIGMOID = [o('normal', 'Normal position'), o('anterior', 'Anterior (procident)')]
const INTACT_DEHISCENT = [o('intact', 'Intact'), o('dehiscent', 'Dehiscent')]
const JB = [o('normal', 'Normal'), o('high', 'High-riding, covered'), o('dehiscent', 'Dehiscent')]
const CAROTID = [o('normal', 'Intact, normal course'), o('dehiscent', 'Dehiscent'), o('aberrant', 'Aberrant ICA')]
const SPINOSUM = [o('present', 'Present'), o('absent', 'Absent')]
const TEGMEN = [o('intact', 'Intact'), o('thinned', 'Thinned'), o('dehiscent', 'Dehiscent')]
const TEGMEN_CONTENT = [o('none', 'Nothing passing through'), o('soft', 'Soft tissue'), o('mening', 'Meningocele')]
const APEX = [
  o('aerated', 'Symmetrically aerated'),
  o('marrow', 'Non-aerated marrow'),
  o('fluid', 'Trapped fluid in an aerated apex'),
  o('lesion', 'Lesion'),
]
const IAC = [o('normal', 'Normal caliber, symmetric'), o('asym', 'Asymmetric caliber'), o('defect', 'Defective fundus / absent canal')]
const JF = [o('smooth', 'Smooth'), o('motheaten', 'Moth-eaten')]
const OCS = [o('sparing', 'Otic capsule sparing'), o('violating', 'Otic capsule violating')]
const OSS_DISLOC = [o('none', 'None'), o('is', 'Incudostapedial'), o('im', 'Incudomalleolar'), o('other', 'Other')]
const SURGERY_TYPES = [
  o('cwu', 'Canal wall up mastoidectomy'),
  o('cwd', 'Canal wall down mastoidectomy'),
  o('prosthesis', 'Ossicular prosthesis (PORP/TORP)'),
  o('ci', 'Cochlear implant'),
]
const PROSTHESIS = [o('inline', 'In line'), o('displaced', 'Displaced')]
const CI_POS = [o('intra', 'Intracochlear, basal turn onward'), o('foldover', 'Tip fold-over'), o('extra', 'Extracochlear')]

function label(options: Option[], v: Values, id: string) {
  const value = str(v, id)
  return value ? optionLabel({ options }, value) : ''
}
const lc = (s: string) => (s && !s.startsWith('Michel') ? s.charAt(0).toLowerCase() + s.slice(1) : s)
const lbl = (options: Option[], v: Values, id: string) => lc(label(options, v, id))

/* ---------- Rules the lesson states ---------- */

function boneErosion(v: Values, s: Side) {
  return (
    ['blunted', 'eroded'].includes(str(v, k(s, 'scutum'))) ||
    OSSICLES.some((oss) => ['eroded', 'absent'].includes(str(v, k(s, oss.key)))) ||
    str(v, k(s, 'eacErosion')) === 'present' ||
    ['incomplete', 'complete'].includes(str(v, k(s, 'fistula')))
  )
}

const opacified = (v: Values, s: Side) => str(v, k(s, 'me')) === 'opacified'
const postoperative = (v: Values, s: Side) => str(v, k(s, 'surgery')) === 'yes'
/* Trauma: middle ear fluid is hemotympanum, so the cholesteatoma rules do not apply. */
const fracture = (v: Values, s: Side) => str(v, k(s, 'fracture')) === 'present'

/** "What makes the diagnosis on CT is a non-dependent soft-tissue mass plus bone erosion in a typical location." */
const cholesteatomaPattern = (v: Values, s: Side) => opacified(v, s) && str(v, k(s, 'meChar')) === 'mass' && boneErosion(v, s)

/** "If there is no mass-like tissue and no scutum erosion, say 'no CT evidence of cholesteatoma; DWI MRI if clinically suspected.'" */
const noCholesteatoma = (v: Values, s: Side) =>
  opacified(v, s) && !postoperative(v, s) && !fracture(v, s) && str(v, k(s, 'meChar')) === 'fluid' && str(v, k(s, 'scutum')) === 'sharp'

/** "When CT is uncertain (opacified postoperative ear, or an opaque middle ear without erosion), the answer is non-echo-planar DWI MRI." */
const ctUncertain = (v: Values, s: Side) =>
  opacified(v, s) && !fracture(v, s) && !noCholesteatoma(v, s) && (!boneErosion(v, s) || postoperative(v, s))

const coalescent = (v: Values, s: Side) => str(v, k(s, 'septa')) === 'present'

/** Symons/Fanning grading as validated by Lee et al. */
function otosclerosisGrade(v: Values, s: Side) {
  const retro = str(v, k(s, 'retro'))
  if (retro === 'diffuse') return '3'
  if (retro === 'basal') return '2A'
  if (retro === 'apical') return '2B'
  if (retro === 'both') return '2C'
  if (str(v, k(s, 'fenestral')) === 'present') return '1'
  return ''
}

/** Vijayasekaran: midpoint width >= 1.0 mm or opercular width >= 2.0 mm is enlarged. */
function aqueduct(v: Values, s: Side): 'enlarged' | 'normal' | '' {
  const mid = num(v, k(s, 'vaMid'))
  const op = num(v, k(s, 'vaOp'))
  if ((mid !== undefined && mid >= 1.0) || (op !== undefined && op >= 2.0)) return 'enlarged'
  if (mid !== undefined || op !== undefined) return 'normal'
  return ''
}

const surgeryHas = (v: Values, s: Side, type: string) => str(v, k(s, 'surgery')) === 'yes' && list(v, k(s, 'surgeryTypes')).includes(type)
const noeSetting = (v: Values, s: Side) =>
  str(v, k(s, 'eac')) === 'soft' && str(v, k(s, 'eacErosion')) === 'present' && str(v, k(s, 'noe')) === 'yes'

function dehiscentSegments(v: Values, s: Side) {
  return FACIAL_SEGMENTS.filter((seg) => str(v, k(s, `fn_${seg.key}`)) === 'dehiscent').map((seg) => seg.name)
}

function recommendations(v: Values, s: Side): string[] {
  const recs: string[] = []
  if (surgeryHas(v, s, 'cwd') && str(v, k(s, 'cavity')) === 'present') recs.push('DWI MRI for cavity soft tissue (recurrence vs debris)')
  else if (ctUncertain(v, s)) recs.push(`non-echo-planar DWI MRI (${postoperative(v, s) ? 'opacified postoperative ear' : 'opaque middle ear without erosion'})`)
  if (coalescent(v, s)) recs.push('contrast-enhanced CT or MRI (coalescent mastoiditis)')
  if (fracture(v, s) && str(v, k(s, 'fxCarotid')) === 'yes') recs.push('CTA (fracture involves the carotid canal)')
  if (str(v, k(s, 'iac')) === 'defect') recs.push('MRI (possible absent cochlear nerve)')
  if (str(v, k(s, 'jf')) === 'motheaten') recs.push('MRI (moth-eaten jugular foramen margin)')
  if (noeSetting(v, s)) recs.push('MRI to map the skull base marrow (necrotizing otitis externa)')
  return recs
}

/* ---------- Initial values: every FLOATS item starts at its "none"/normal option ---------- */

const EAR_DEFAULTS: Record<string, string> = {
  eacErosion: 'none',
  et: 'clear',
  malleus: 'intact',
  incusBody: 'intact',
  incusLp: 'intact',
  stapes: 'intact',
  tympanosclerosis: 'none',
  pneuma: 'pneumatized',
  mastoidOpac: 'no',
  septa: 'none',
  korner: 'absent',
  fn_lab: 'intact',
  fn_gen: 'intact',
  fn_tymp: 'intact',
  fn_genu: 'intact',
  fn_mast: 'intact',
  fnCourse: 'normal',
  cochlea: 'normal',
  vestibule: 'normal',
  scc: 'intact',
  fistula: 'none',
  sscd: 'none',
  capsule: 'normal',
  fenestral: 'none',
  retro: 'none',
  oval: 'patent',
  round: 'patent',
  sigmoid: 'normal',
  sigPlate: 'intact',
  jb: 'normal',
  carotid: 'normal',
  spinosum: 'present',
  tegTymp: 'intact',
  tegMast: 'intact',
  lowTegmen: 'no',
  apex: 'aerated',
  iac: 'normal',
  surgery: 'none',
}

const initial: Values = {
  sides: 'both',
  reformats: 'yes',
  ...Object.fromEntries(SIDES.flatMap((s) => Object.entries(EAR_DEFAULTS).map(([key, value]) => [k(s, key), value]))),
}

/* ---------- Report steps ---------- */

const steps: ReportStep[] = [
  {
    id: 'exam',
    title: 'Exam details',
    learn: 'technique',
    teach: (
      <ul className="plain-list">
        <li><strong>Acquisition:</strong> thin-section (≤0.6 mm) helical CT, bone algorithm. Contrast is not needed for chronic ear disease, hearing loss or trauma.</li>
        <li><strong>Pöschl plane</strong> (parallel to the superior semicircular canal) is the plane for superior canal dehiscence; the <strong>Stenvers plane</strong> (perpendicular to it) confirms what Pöschl suggests.</li>
        <li><strong>Compare with the other side constantly.</strong> Most "danger zone" findings are easiest to call when the other ear is normal, which is why the template reports each ear fully.</li>
      </ul>
    ),
    fields: [
      choice('sides', 'Ears reported', SIDES_OPTS, { required: true }),
      choice('reformats', 'Pöschl/Stenvers reformats obtained', NO_YES, { help: 'Superior canal dehiscence is called only on these.' }),
    ],
  },
  {
    id: 'eac',
    title: 'Step 1. External auditory canal (EAC)',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>Patent? Soft tissue? Bone erosion of the canal walls (think necrotizing otitis externa or EAC cholesteatoma)? Congenital narrowing or atresia?</p>
        <p>Necrotizing otitis externa is soft tissue in the EAC that erodes the canal floor and spreads to the skull base in an elderly diabetic or immunocompromised patient. Look for bone erosion around the EAC, the stylomastoid foramen and the TMJ region. Say so and recommend MRI to map the skull base marrow.</p>
      </>
    ),
    fields: perEar((s) => [
      choice(k(s, 'eac'), 'EAC', EAC, { required: true }),
      choice(k(s, 'eacErosion'), 'Canal wall erosion', NONE_PRESENT),
      choice(k(s, 'noe'), 'Elderly diabetic or immunocompromised patient', NO_YES, {
        showIf: (v) => str(v, k(s, 'eac')) === 'soft' && str(v, k(s, 'eacErosion')) === 'present',
      }),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      if (str(v, k(s, 'eac')) === 'soft' && str(v, k(s, 'eacErosion')) === 'present') {
        out.push({
          label: 'EAC',
          value: noeSetting(v, s) ? 'Necrotizing otitis externa pattern: recommend MRI' : 'Think necrotizing otitis externa or EAC cholesteatoma',
          tone: 'warn',
        })
      }
      return out
    }),
  },
  {
    id: 'scutum',
    title: 'Step 2. Tympanic membrane and scutum',
    learn: 'reading-pathway',
    teach: (
      <p>The scutum is the sharp bony spur at the top of the eardrum on coronal images (lateral wall of the epitympanum). A blunted or eroded scutum is the classic first sign of a pars flaccida cholesteatoma, which starts in Prussak's space, pushes the ossicles <strong>medially</strong>, then grows backward into the aditus and antrum.</p>
    ),
    fields: perEar((s) => [choice(k(s, 'scutum'), 'Scutum', SCUTUM, { required: true })]),
    derive: perEarDerive((v, s) =>
      ['blunted', 'eroded'].includes(str(v, k(s, 'scutum')))
        ? [{ label: 'Scutum', value: 'Classic first sign of pars flaccida cholesteatoma', tone: 'warn' }]
        : [],
    ),
  },
  {
    id: 'middle-ear',
    title: 'Step 3. Middle ear, compartment by compartment',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>Epitympanum (attic), mesotympanum, hypotympanum, plus the two hidden corners: the <strong>sinus tympani</strong> and the <strong>facial recess</strong>. Say which compartments are opaque and whether the opacity has a mass-like shape or is just fluid.</p>
        <p>CT cannot tell cholesteatoma from granulation tissue or fluid by density; what makes the diagnosis on CT is a <strong>non-dependent soft-tissue mass plus bone erosion</strong> in a typical location. If there is no mass-like tissue and no scutum erosion, say "no CT evidence of cholesteatoma; DWI MRI if clinically suspected." When CT is uncertain, non-echo-planar DWI is the answer (pooled sensitivity 0.91, specificity 0.92, <Cite doi={DOI.lingam}>Lingam and Bassett</Cite>).</p>
        <p>Eustachian tube status was almost never reported despite being surgically relevant (<Cite doi={DOI.cavaliere}>Cavaliere</Cite>).</p>
      </>
    ),
    fields: perEar((s) => [
      choice(k(s, 'me'), 'Middle ear', ME, { required: true }),
      multi(k(s, 'meComp'), 'Opacified compartments', ME_COMP, { showIf: (v) => opacified(v, s) }),
      choice(k(s, 'meChar'), 'Character', ME_CHAR, { showIf: (v) => opacified(v, s), required: true }),
      choice(k(s, 'et'), 'Eustachian tube region', CLEAR_OPAQUE),
    ]),
    derive: perEarDerive((v, s) => {
      if (cholesteatomaPattern(v, s)) return [{ label: 'CT pattern', value: 'Non-dependent mass plus bone erosion: cholesteatoma', tone: 'warn' }]
      if (noCholesteatoma(v, s)) return [{ label: 'CT pattern', value: 'No CT evidence of cholesteatoma; DWI MRI if clinically suspected', tone: 'good' }]
      if (ctUncertain(v, s)) return [{ label: 'CT pattern', value: 'CT uncertain: non-echo-planar DWI MRI', tone: 'neutral' }]
      return []
    }),
  },
  {
    id: 'ossicles',
    title: 'Step 4. Ossicles, individually',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>The incus long process is the most vulnerable to erosion because of its thin blood supply; the stapes is the smallest and most often ignored. Name each ossicle as intact, eroded, or absent.</p>
        <p>In <Cite doi={DOI.cavaliere}>Cavaliere et al.</Cite>, the stapes was never mentioned in any of 301 outside reports yet was eroded in 131 patients at surgery. Never write "ossicular chain erosion" without naming which ossicle. Tympanosclerosis (calcified plaques around the ossicles) fixes them.</p>
      </>
    ),
    fields: perEar((s) => [
      ...OSSICLES.map((oss) => choice(k(s, oss.key), oss.name.charAt(0).toUpperCase() + oss.name.slice(1), OSS)),
      choice(k(s, 'tympanosclerosis'), 'Tympanosclerosis', NONE_PRESENT),
    ]),
    derive: perEarDerive((v, s) => {
      const eroded = OSSICLES.filter((oss) => ['eroded', 'absent'].includes(str(v, k(s, oss.key)))).map((oss) => oss.name)
      return eroded.length ? [{ label: 'Eroded or absent', value: eroded.join(', '), tone: 'warn' }] : []
    }),
  },
  {
    id: 'mastoid',
    title: 'Step 5. Mastoid',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>How well aerated is it (well pneumatized, sclerotic, or contracted)? A sclerotic mastoid means a smaller working space. Are the septa between air cells intact? Loss of septa with a confluent cavity means coalescent mastoiditis; say "recommend contrast-enhanced CT or MRI" when you see coalescence.</p>
        <p>Fluid in the mastoid alone is common and often meaningless. Note a <strong>Körner's septum</strong>, which can make the surgeon think they have reached the antrum when they have not.</p>
      </>
    ),
    fields: perEar((s) => [
      choice(k(s, 'pneuma'), 'Pneumatization', PNEUMA),
      choice(k(s, 'mastoidOpac'), 'Mastoid opacified', NO_YES),
      choice(k(s, 'septa'), 'Septal breakdown', NONE_PRESENT),
      choice(k(s, 'korner'), "Körner's septum", ABSENT_PRESENT),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      if (coalescent(v, s)) out.push({ label: 'Mastoid', value: 'Coalescent mastoiditis: contrast CT or MRI', tone: 'warn' })
      else if (str(v, k(s, 'mastoidOpac')) === 'yes') out.push({ label: 'Mastoid', value: 'Fluid alone, septa intact: often meaningless', tone: 'neutral' })
      if (str(v, k(s, 'pneuma')) === 'sclerotic') out.push({ label: 'Access', value: 'Sclerotic mastoid: smaller working space', tone: 'neutral' })
      return out
    }),
  },
  {
    id: 'facial',
    title: 'Step 6. Facial nerve canal, segment by segment',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>Labyrinthine, geniculate ganglion, tympanic (below the lateral canal, above the oval window), second genu, mastoid. The tympanic segment above the oval window is the most common site of dehiscence, both congenital and from cholesteatoma. Coronal images through the oval window are the key view.</p>
        <p>Report an abnormal course (anteriorly displaced nerve in ear malformations, a known hazard in cochlear implant surgery per <Cite doi={DOI.senn2006}>Sennaroglu</Cite>). Facial canal erosion was mentioned in 18 outside reports but found in 76 patients at surgery (<Cite doi={DOI.cavaliere}>Cavaliere</Cite>).</p>
      </>
    ),
    fields: perEar((s) => [
      ...FACIAL_SEGMENTS.map((seg) => choice(k(s, `fn_${seg.key}`), `Facial canal, ${seg.name}`, FACIAL_SEG)),
      choice(k(s, 'fnCourse'), 'Facial nerve course', FACIAL_COURSE),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      const segs = dehiscentSegments(v, s)
      if (segs.length) out.push({ label: 'Facial canal dehiscence', value: segs.join(', '), tone: 'warn' })
      if (str(v, k(s, 'fnCourse')) === 'anterior') out.push({ label: 'Facial course', value: 'Anteriorly displaced: cochlear implant hazard', tone: 'warn' })
      return out
    }),
  },
  {
    id: 'inner-ear',
    title: 'Step 7. Inner ear (otic capsule)',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>Cochlea: 2.5 turns with an intact modiolus. The lateral semicircular canal is the most exposed part of the inner ear during mastoid surgery: a thinned wall is an incomplete fistula, a breach with soft tissue in the lumen a complete fistula.</p>
        <p>Superior canal dehiscence: call it only on thin-section Pöschl and Stenvers reformats (1-mm scans had a PPV of about 50%, 0.5-mm reformats 93%, <Cite doi={DOI.belden}>Belden</Cite>). Report the gap length and whether it is under the arcuate eminence or at the superior petrosal sinus.</p>
        <p>Vestibular aqueduct: midpoint ≥1.0 mm or opercular width ≥2.0 mm is enlarged (<Cite doi={DOI.vijay}>Vijayasekaran</Cite>). Every IP-II ear had an enlarged aqueduct and no IP-I ear did (<Cite doi={DOI.senn2002}>Sennaroglu and Saatci</Cite>).</p>
        <p>Otosclerosis grade (<Cite doi={DOI.lee}>Lee et al.</Cite>): 1 fenestral only; 2 patchy cochlear (2A basal turn, 2B middle/apical, 2C both); 3 diffuse confluent cochlear.</p>
      </>
    ),
    fields: perEar((s) => [
      choice(k(s, 'cochlea'), 'Cochlea (Sennaroglu)', COCHLEA),
      choice(k(s, 'vestibule'), 'Vestibule', VESTIBULE),
      choice(k(s, 'scc'), 'Semicircular canals', SCC),
      choice(k(s, 'fistula'), 'Lateral canal fistula', FISTULA),
      choice(k(s, 'sscd'), 'Superior canal dehiscence (Pöschl/Stenvers)', NONE_PRESENT),
      measure(k(s, 'sscdLen'), 'Dehiscence length', 'mm', { showIf: (v) => str(v, k(s, 'sscd')) === 'present' }),
      choice(k(s, 'sscdSite'), 'Dehiscence site', SSCD_SITE, { showIf: (v) => str(v, k(s, 'sscd')) === 'present' }),
      measure(k(s, 'vaMid'), 'Vestibular aqueduct midpoint width', 'mm', { help: 'Enlarged if ≥1.0 mm' }),
      measure(k(s, 'vaOp'), 'Vestibular aqueduct opercular width', 'mm', { help: 'Enlarged if ≥2.0 mm' }),
      choice(k(s, 'capsule'), 'Otic capsule density', CAPSULE),
      choice(k(s, 'fenestral'), 'Fenestral lucency (fissula ante fenestram)', NONE_PRESENT),
      choice(k(s, 'retro'), 'Retrofenestral (cochlear) lucency', RETRO),
      choice(k(s, 'oval'), 'Oval window', OVAL),
      choice(k(s, 'round'), 'Round window', ROUND),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      const va = aqueduct(v, s)
      if (va) out.push({ label: 'Vestibular aqueduct', value: va === 'enlarged' ? 'Enlarged' : 'Normal', tone: va === 'enlarged' ? 'warn' : 'good' })
      const grade = otosclerosisGrade(v, s)
      if (grade) out.push({ label: 'Otosclerosis', value: `Grade ${grade}`, tone: 'warn' })
      const fistula = str(v, k(s, 'fistula'))
      if (fistula === 'incomplete' || fistula === 'complete') out.push({ label: 'Lateral canal', value: `${fistula === 'complete' ? 'Complete' : 'Incomplete'} fistula`, tone: 'warn' })
      const cochlea = str(v, k(s, 'cochlea'))
      if (cochlea && cochlea !== 'normal') out.push({ label: 'Malformation', value: label(COCHLEA, v, k(s, 'cochlea')), tone: 'warn' })
      return out
    }),
  },
  {
    id: 'vessels',
    title: 'Step 8. Vessels',
    learn: 'floats',
    teach: (
      <>
        <p>Carotid canal (intact bone between it and the middle ear), jugular bulb (how high, and is there bone between it and the middle ear), sigmoid sinus (how far forward it sits). A jugular bulb reaching the level of the round window, or lacking a bony cover, is what the surgeon wants to know.</p>
        <p>Aberrant ICA, dehiscent jugular bulb and persistent stapedial artery (absent foramen spinosum plus an enlarged tympanic facial canal) are the "do not biopsy" lesions. In <Cite doi={DOI.cavaliere}>Cavaliere</Cite>, jugular bulb position was never described and no report stated that a vascular variant was absent.</p>
      </>
    ),
    fields: perEar((s) => [
      choice(k(s, 'sigmoid'), 'Sigmoid sinus', SIGMOID),
      choice(k(s, 'sigPlate'), 'Sigmoid plate', INTACT_DEHISCENT),
      choice(k(s, 'jb'), 'Jugular bulb', JB),
      choice(k(s, 'carotid'), 'Carotid canal', CAROTID),
      choice(k(s, 'spinosum'), 'Foramen spinosum', SPINOSUM),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      if (['aberrant', 'dehiscent'].includes(str(v, k(s, 'carotid'))) || str(v, k(s, 'jb')) === 'dehiscent') {
        out.push({ label: 'Vascular variant', value: 'Do not biopsy', tone: 'warn' })
      }
      if (str(v, k(s, 'spinosum')) === 'absent') {
        out.push({ label: 'Foramen spinosum absent', value: 'Persistent stapedial artery if tympanic facial canal enlarged', tone: 'warn' })
      }
      return out
    }),
  },
  {
    id: 'roof',
    title: 'Step 9. Roof and walls',
    learn: 'reading-pathway',
    teach: (
      <>
        <p>Tegmen tympani and tegmen mastoideum: intact, thinned, or dehiscent, and whether there is soft tissue or a meningocele passing through. Thin is normal; a gap on two planes is dehiscence. If the bone looks absent on one thick slice, check the thin data in a second plane before calling it.</p>
        <p>Petrous apex: the commonest "lesion" is not a lesion, but asymmetric pneumatization or trapped fluid in an aerated apex (<Cite doi={DOI.razek}>Razek and Huang</Cite>).</p>
      </>
    ),
    fields: perEar((s) => {
      const dehiscent = (v: Values) => str(v, k(s, 'tegTymp')) === 'dehiscent' || str(v, k(s, 'tegMast')) === 'dehiscent'
      return [
        choice(k(s, 'tegTymp'), 'Tegmen tympani', TEGMEN),
        choice(k(s, 'tegMast'), 'Tegmen mastoideum', TEGMEN),
        choice(k(s, 'tegContent'), 'Through the tegmen gap', TEGMEN_CONTENT, { showIf: dehiscent }),
        choice(k(s, 'tegPlanes'), 'Gap confirmed on two planes', NO_YES, { showIf: dehiscent }),
        choice(k(s, 'lowTegmen'), 'Low-lying tegmen', NO_YES),
        choice(k(s, 'apex'), 'Petrous apex', APEX),
        text(k(s, 'apexLesion'), 'Petrous apex lesion', { showIf: (v) => str(v, k(s, 'apex')) === 'lesion', placeholder: 'e.g. expansile, smooth margins' }),
      ]
    }),
    derive: perEarDerive((v, s) => {
      const apex = str(v, k(s, 'apex'))
      return apex === 'marrow' || apex === 'fluid' ? [{ label: 'Petrous apex', value: 'Not a lesion (commonest finding)', tone: 'good' }] : []
    }),
  },
  {
    id: 'iac',
    title: 'Step 10. Internal auditory canal and the rest of the skull base',
    learn: 'reading-pathway',
    teach: (
      <p>IAC caliber (compare sides), jugular foramen margins (smooth vs moth-eaten), and a glance at the visible brain. A defective fundus or absent canal means a possible absent cochlear nerve, which needs MRI. If the bone between jugular foramen and middle ear is eroded with a moth-eaten margin, it is a glomus jugulotympanicum; recommend MRI.</p>
    ),
    fields: perEar((s) => [
      choice(k(s, 'iac'), 'IAC', IAC),
      choice(k(s, 'jf'), 'Jugular foramen margins', JF),
    ]),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      if (str(v, k(s, 'iac')) === 'defect') out.push({ label: 'IAC', value: 'Possible absent cochlear nerve: MRI', tone: 'warn' })
      if (str(v, k(s, 'jf')) === 'motheaten') out.push({ label: 'Jugular foramen', value: 'Glomus jugulotympanicum pattern: MRI', tone: 'warn' })
      return out
    }),
  },
  {
    id: 'trauma',
    title: 'Trauma: fracture',
    learn: 'pathologies',
    teach: (
      <>
        <p>Stop using "longitudinal vs transverse" as the main descriptor. Otic capsule–violating fractures carried 5× the facial nerve injury, 25× the sensorineural loss and 8× the CSF otorrhea of sparing fractures (<Cite doi={DOI.little}>Little and Kesser</Cite>); CSF leak was 9.8 times more common when the fracture involved the petrous bone (<Cite doi={DOI.ishman}>Ishman and Friedland</Cite>). So the first line is: <strong>otic capsule sparing or violating.</strong></p>
        <p>Then: fracture through the facial canal (which segment), ossicular dislocation (incudostapedial is most common), carotid canal involvement (recommend CTA), tegmen breach (CSF leak risk), hemotympanum, and pneumolabyrinth (a window fracture or otic capsule fracture).</p>
      </>
    ),
    fields: perEar((s) => {
      const fx = (v: Values) => fracture(v, s)
      return [
        choice(k(s, 'fracture'), 'Fracture', NONE_PRESENT),
        choice(k(s, 'ocs'), 'Otic capsule', OCS, { showIf: fx, required: true }),
        multi(k(s, 'fxFacial'), 'Through the facial canal', FACIAL_SEGMENTS.map((seg) => o(seg.key, seg.name)), { showIf: fx }),
        choice(k(s, 'fxOss'), 'Ossicular dislocation', OSS_DISLOC, { showIf: fx }),
        choice(k(s, 'fxCarotid'), 'Carotid canal involved', NO_YES, { showIf: fx }),
        choice(k(s, 'fxTegmen'), 'Tegmen breached', NO_YES, { showIf: fx }),
        choice(k(s, 'fxHemo'), 'Hemotympanum', NO_YES, { showIf: fx }),
        choice(k(s, 'fxPneumolab'), 'Pneumolabyrinth', NO_YES, { showIf: fx }),
        choice(k(s, 'fxPneumoceph'), 'Pneumocephalus', NO_YES, { showIf: fx }),
      ]
    }),
    derive: perEarDerive((v, s) => {
      if (!fracture(v, s)) return []
      const out: Derived[] = []
      if (str(v, k(s, 'ocs')) === 'violating') out.push({ label: 'Otic capsule violating', value: 'Higher facial nerve, SNHL and CSF leak risk', tone: 'warn' })
      if (str(v, k(s, 'fxCarotid')) === 'yes') out.push({ label: 'Carotid canal', value: 'Recommend CTA', tone: 'warn' })
      if (str(v, k(s, 'fxTegmen')) === 'yes') out.push({ label: 'Tegmen breach', value: 'CSF leak risk', tone: 'warn' })
      if (str(v, k(s, 'fxPneumolab')) === 'yes') out.push({ label: 'Pneumolabyrinth', value: 'Window or otic capsule fracture', tone: 'warn' })
      return out
    }),
  },
  {
    id: 'surgery',
    title: 'Prior surgery',
    learn: 'pathologies',
    teach: (
      <ul className="plain-list">
        <li><strong>Canal wall down:</strong> soft tissue in the cavity is the question, recurrence vs debris. DWI MRI answers it.</li>
        <li><strong>Ossicular prostheses</strong> (PORP, TORP): report whether it is in line between the eardrum/malleus and the stapes or oval window, or displaced.</li>
        <li><strong>Cochlear implant:</strong> the electrode should spiral inside the cochlea from the basal turn onward. Report tip fold-over or extracochlear position.</li>
      </ul>
    ),
    fields: perEar((s) => {
      const has = (type: string) => (v: Values) => surgeryHas(v, s, type)
      return [
        choice(k(s, 'surgery'), 'Prior surgery', [o('none', 'None'), o('yes', 'Yes')]),
        multi(k(s, 'surgeryTypes'), 'Procedure', SURGERY_TYPES, { showIf: (v) => str(v, k(s, 'surgery')) === 'yes' }),
        choice(k(s, 'cavity'), 'Soft tissue in the cavity', NONE_PRESENT, { showIf: has('cwd') }),
        choice(k(s, 'prosthesis'), 'Prosthesis position', PROSTHESIS, { showIf: has('prosthesis') }),
        choice(k(s, 'ci'), 'Electrode position', CI_POS, { showIf: has('ci') }),
        text(k(s, 'surgeryOther'), 'Other postoperative detail', { showIf: (v) => str(v, k(s, 'surgery')) === 'yes' }),
      ]
    }),
    derive: perEarDerive((v, s) => {
      const out: Derived[] = []
      if (surgeryHas(v, s, 'cwd') && str(v, k(s, 'cavity')) === 'present') out.push({ label: 'Cavity soft tissue', value: 'DWI MRI: recurrence vs debris', tone: 'warn' })
      if (surgeryHas(v, s, 'ci') && ['foldover', 'extra'].includes(str(v, k(s, 'ci')))) out.push({ label: 'Electrode', value: label(CI_POS, v, k(s, 'ci')), tone: 'warn' })
      return out
    }),
  },
  {
    id: 'other',
    title: 'Other findings and impression',
    learn: 'template',
    teach: (
      <p>Write "none" for each danger item rather than staying silent, and move the danger anatomy into the impression. The impression answers the three questions: what and where the disease is and how far it extends, what is eroded ossicle by ossicle, and the surgical-risk anatomy including negatives. Rule-derived findings and recommendations are added automatically.</p>
    ),
    fields: [
      text('other', 'Other (TMJ, visible brain, skull base)', { multiline: true }),
      text('summary', 'Disease summary: what, where, how far', { multiline: true, placeholder: 'e.g. right attic cholesteatoma extending into the aditus and antrum' }),
      text('recOther', 'Additional recommendation'),
    ],
  },
]

/* ---------- Report text ---------- */

function joinParts(parts: (string | false | undefined)[], sep = '; ') {
  return parts.filter((p): p is string => Boolean(p)).join(sep)
}

function fractureLine(v: Values, s: Side) {
  if (!fracture(v, s)) return ''
  const facial = FACIAL_SEGMENTS.filter((seg) => list(v, k(s, 'fxFacial')).includes(seg.key)).map((seg) => seg.name)
  const oss = str(v, k(s, 'fxOss'))
  return `FRACTURE: ${joinParts([
    lbl(OCS, v, k(s, 'ocs')) || 'otic capsule involvement not stated',
    facial.length > 0 && `through the facial canal (${facial.join(', ')} segment${facial.length > 1 ? 's' : ''})`,
    oss === 'none' && 'no ossicular dislocation',
    oss && oss !== 'none' && `${lbl(OSS_DISLOC, v, k(s, 'fxOss'))} dislocation`,
    str(v, k(s, 'fxCarotid')) === 'yes' && 'involves the carotid canal',
    str(v, k(s, 'fxCarotid')) === 'no' && 'carotid canal spared',
    str(v, k(s, 'fxTegmen')) === 'yes' && 'tegmen breached',
    str(v, k(s, 'fxTegmen')) === 'no' && 'tegmen not breached',
    str(v, k(s, 'fxHemo')) === 'yes' && 'hemotympanum',
    str(v, k(s, 'fxPneumolab')) === 'yes' && 'pneumolabyrinth',
    str(v, k(s, 'fxPneumolab')) === 'no' && 'no pneumolabyrinth',
    str(v, k(s, 'fxPneumoceph')) === 'yes' && 'pneumocephalus',
  ])}`
}

function earBlock(v: Values, s: Side) {
  const body = earLines(v, s)
  return body ? `${SIDE[s].toUpperCase()}:\n${body}` : ''
}

function earLines(v: Values, s: Side) {
  const eac = lbl(EAC, v, k(s, 'eac'))
  const eacErosion = str(v, k(s, 'eacErosion'))
  const me = str(v, k(s, 'me'))
  const comps = ME_COMP.filter((c) => list(v, k(s, 'meComp')).includes(c.value)).map((c) => lc(c.label))
  const meChar = str(v, k(s, 'meChar'))
  const ossicles = OSSICLES.map((oss) => {
    const status = lbl(OSS, v, k(s, oss.key))
    return status && `${oss.name} ${status}`
  })
  const segs = FACIAL_SEGMENTS.map((seg) => {
    const status = lbl(FACIAL_SEG, v, k(s, `fn_${seg.key}`))
    return status && `${seg.name} ${status}`
  })
  const dehiscent = dehiscentSegments(v, s)
  const anyFacial = segs.some(Boolean)
  const cochlea = str(v, k(s, 'cochlea'))
  const sscd = str(v, k(s, 'sscd'))
  const sscdLen = num(v, k(s, 'sscdLen'))
  const va = aqueduct(v, s)
  const vaMid = num(v, k(s, 'vaMid'))
  const vaOp = num(v, k(s, 'vaOp'))
  const fen = str(v, k(s, 'fenestral'))
  const retro = str(v, k(s, 'retro'))
  const grade = otosclerosisGrade(v, s)
  const oval = str(v, k(s, 'oval'))
  const round = str(v, k(s, 'round'))
  const tegContent = str(v, k(s, 'tegContent'))
  const apex = str(v, k(s, 'apex'))
  const types = SURGERY_TYPES.filter((t) => list(v, k(s, 'surgeryTypes')).includes(t.value)).map((t) => lc(t.label))

  const lucency =
    fen === 'none' && retro === 'none'
      ? 'fenestral / retrofenestral lucency: none'
      : joinParts([
        fen && `fenestral lucency: ${fen === 'present' ? 'present' : 'none'}`,
        retro && `retrofenestral lucency: ${lbl(RETRO, v, k(s, 'retro'))}`,
        grade && `otosclerosis grade ${grade}`,
      ])

  return lines(
    fractureLine(v, s),
    (eac || eacErosion) && `EAC: ${joinParts([eac, eacErosion && `wall erosion: ${eacErosion}`])}`,
    str(v, k(s, 'scutum')) && `TM & SCUTUM: scutum ${lbl(SCUTUM, v, k(s, 'scutum'))}`,
    me === 'clear' && 'MIDDLE EAR: clear',
    me === 'opacified' && `MIDDLE EAR: opacified${comps.length ? ` — ${comps.join(', ')}` : ''}`,
    me === 'opacified' && meChar && `  Character: ${meChar === 'mass' ? 'mass-like soft tissue, non-dependent' : 'fluid-like'}`,
    ossicles.some(Boolean) && `OSSICLES: ${joinParts(ossicles, ' / ')}`,
    str(v, k(s, 'tympanosclerosis')) && `  Tympanosclerosis: ${str(v, k(s, 'tympanosclerosis'))}`,
    `MASTOID: ${joinParts([
      lbl(PNEUMA, v, k(s, 'pneuma')),
      str(v, k(s, 'mastoidOpac')) && `opacified: ${str(v, k(s, 'mastoidOpac'))}`,
      str(v, k(s, 'septa')) && `septal breakdown: ${str(v, k(s, 'septa'))}`,
      str(v, k(s, 'korner')) && `Körner's septum: ${str(v, k(s, 'korner'))}`,
    ])}`.replace(/^MASTOID: $/, ''),
    (anyFacial || str(v, k(s, 'fnCourse'))) &&
      `FACIAL NERVE CANAL: ${joinParts([
        anyFacial && joinParts(segs, ' / '),
        anyFacial && `dehiscence: ${dehiscent.length ? dehiscent.join(', ') : 'none'}`,
        str(v, k(s, 'fnCourse')) && `course: ${lbl(FACIAL_COURSE, v, k(s, 'fnCourse'))}`,
      ])}`,
    `LABYRINTH: ${joinParts([
      cochlea === 'normal' && 'cochlea 2.5 turns, modiolus present',
      cochlea && cochlea !== 'normal' && `cochlea: ${lbl(COCHLEA, v, k(s, 'cochlea'))}`,
      str(v, k(s, 'vestibule')) && `vestibule ${lbl(VESTIBULE, v, k(s, 'vestibule'))}`,
      str(v, k(s, 'scc')) && `semicircular canals ${lbl(SCC, v, k(s, 'scc'))}`,
      str(v, k(s, 'fistula')) && `lateral canal fistula: ${lbl(FISTULA, v, k(s, 'fistula'))}`,
      sscd === 'none' && 'superior canal dehiscence (Pöschl/Stenvers): none',
      sscd === 'present' &&
        `superior canal dehiscence (Pöschl/Stenvers): present${joinParts([sscdLen !== undefined && `${sscdLen} mm`, lbl(SSCD_SITE, v, k(s, 'sscdSite'))], ', ').replace(/^(.)/, ', $1')}`,
      va && `vestibular aqueduct: ${va} (${joinParts([vaMid !== undefined && `midpoint ${str(v, k(s, 'vaMid'))} mm`, vaOp !== undefined && `opercular ${str(v, k(s, 'vaOp'))} mm`], ', ')})`,
      str(v, k(s, 'capsule')) && `otic capsule density: ${lbl(CAPSULE, v, k(s, 'capsule'))}`,
      lucency,
      oval === 'patent' && round === 'patent'
        ? 'oval and round windows: patent'
        : joinParts([oval && `oval window: ${oval}`, round && `round window: ${round}`]),
    ])}`.replace(/^LABYRINTH: $/, ''),
    (str(v, k(s, 'tegTymp')) || str(v, k(s, 'tegMast'))) &&
      `TEGMEN: ${joinParts([
        str(v, k(s, 'tegTymp')) && `tympani ${str(v, k(s, 'tegTymp'))}`,
        str(v, k(s, 'tegMast')) && `mastoideum ${str(v, k(s, 'tegMast'))}`,
        tegContent && tegContent !== 'none' && `${lbl(TEGMEN_CONTENT, v, k(s, 'tegContent'))} through the defect`,
        str(v, k(s, 'lowTegmen')) === 'yes' && 'low-lying tegmen',
      ])}`,
    `VESSELS: ${joinParts([
      str(v, k(s, 'sigmoid')) && `sigmoid sinus position ${str(v, k(s, 'sigmoid')) === 'normal' ? 'normal' : 'anterior (procident)'}`,
      str(v, k(s, 'sigPlate')) && `sigmoid plate ${str(v, k(s, 'sigPlate'))}`,
      str(v, k(s, 'jb')) && `jugular bulb: ${lbl(JB, v, k(s, 'jb'))}`,
      str(v, k(s, 'carotid')) && `carotid canal: ${lbl(CAROTID, v, k(s, 'carotid'))}`,
      str(v, k(s, 'spinosum')) && `foramen spinosum ${str(v, k(s, 'spinosum'))}`,
    ])}`.replace(/^VESSELS: $/, ''),
    apex && `PETROUS APEX: ${apex === 'lesion' ? `lesion${str(v, k(s, 'apexLesion')) ? `: ${str(v, k(s, 'apexLesion'))}` : ''}` : `${lbl(APEX, v, k(s, 'apex'))}; lesion: none`}`,
    (str(v, k(s, 'iac')) || str(v, k(s, 'jf'))) &&
      `IAC: ${joinParts([lbl(IAC, v, k(s, 'iac')), str(v, k(s, 'jf')) && `jugular foramen margins ${lbl(JF, v, k(s, 'jf'))}`])}`,
    str(v, k(s, 'et')) && `EUSTACHIAN TUBE REGION: ${str(v, k(s, 'et'))}`,
    str(v, k(s, 'surgery')) === 'none' && 'PRIOR SURGERY: none',
    str(v, k(s, 'surgery')) === 'yes' &&
      `PRIOR SURGERY: ${joinParts([
        types.length > 0 && types.join(', '),
        surgeryHas(v, s, 'cwd') && str(v, k(s, 'cavity')) && `cavity soft tissue: ${str(v, k(s, 'cavity'))}`,
        surgeryHas(v, s, 'prosthesis') && str(v, k(s, 'prosthesis')) && `prosthesis ${lbl(PROSTHESIS, v, k(s, 'prosthesis'))}`,
        surgeryHas(v, s, 'ci') && str(v, k(s, 'ci')) && `electrode ${lbl(CI_POS, v, k(s, 'ci'))}`,
        str(v, k(s, 'surgeryOther')),
      ]) || 'yes'}`,
  )
}

function diseaseStatements(v: Values, s: Side): string[] {
  const out: string[] = []
  const comps = ME_COMP.filter((c) => list(v, k(s, 'meComp')).includes(c.value)).map((c) => lc(c.label))
  const where = comps.length ? ` involving the ${comps.join(', ')}` : ''
  if (fracture(v, s)) out.push(`${lbl(OCS, v, k(s, 'ocs')) || 'temporal bone'} fracture`)
  if (cholesteatomaPattern(v, s)) out.push(`non-dependent soft-tissue mass with bone erosion${where}, the CT pattern of cholesteatoma`)
  if (noCholesteatoma(v, s)) out.push(`middle ear opacification${where}; no CT evidence of cholesteatoma; DWI MRI if clinically suspected`)
  if (str(v, k(s, 'eac')) === 'soft' && str(v, k(s, 'eacErosion')) === 'present') {
    out.push(noeSetting(v, s) ? 'EAC soft tissue with canal wall erosion, in keeping with necrotizing otitis externa' : 'EAC soft tissue with canal wall erosion (necrotizing otitis externa or EAC cholesteatoma)')
  }
  if (coalescent(v, s)) out.push('coalescent mastoiditis')
  const grade = otosclerosisGrade(v, s)
  if (grade) out.push(`otosclerosis, grade ${grade}`)
  if (str(v, k(s, 'sscd')) === 'present') {
    const len = num(v, k(s, 'sscdLen'))
    out.push(`superior semicircular canal dehiscence${joinParts([len !== undefined && `${len} mm`, lbl(SSCD_SITE, v, k(s, 'sscdSite'))], ', ').replace(/^(.)/, ', $1')}`)
  }
  const cochlea = str(v, k(s, 'cochlea'))
  if (cochlea && cochlea !== 'normal') out.push(lbl(COCHLEA, v, k(s, 'cochlea')))
  if (aqueduct(v, s) === 'enlarged') out.push('enlarged vestibular aqueduct')
  if (str(v, k(s, 'iac')) === 'defect') out.push('defective IAC fundus / absent canal, possible absent cochlear nerve')
  if (str(v, k(s, 'jf')) === 'motheaten') out.push('moth-eaten jugular foramen margin')
  if (str(v, k(s, 'apex')) === 'lesion') out.push(`petrous apex lesion${str(v, k(s, 'apexLesion')) ? `: ${str(v, k(s, 'apexLesion'))}` : ''}`)
  if (surgeryHas(v, s, 'cwd') && str(v, k(s, 'cavity')) === 'present') out.push('soft tissue in the canal wall down cavity')
  if (surgeryHas(v, s, 'prosthesis') && str(v, k(s, 'prosthesis')) === 'displaced') out.push('displaced ossicular prosthesis')
  if (surgeryHas(v, s, 'ci') && ['foldover', 'extra'].includes(str(v, k(s, 'ci')))) out.push(`cochlear implant electrode ${lbl(CI_POS, v, k(s, 'ci'))}`)
  return out
}

function erosionStatement(v: Values, s: Side) {
  const ossicles = OSSICLES.map((oss) => {
    const status = lbl(OSS, v, k(s, oss.key))
    return status && `${oss.name} ${status}`
  })
  const fx = str(v, k(s, 'fxOss'))
  return joinParts([
    ...ossicles,
    fracture(v, s) && fx && fx !== 'none' && `${lbl(OSS_DISLOC, v, k(s, 'fxOss'))} dislocation`,
    ['blunted', 'eroded'].includes(str(v, k(s, 'scutum'))) && `scutum ${str(v, k(s, 'scutum'))}`,
    str(v, k(s, 'eacErosion')) === 'present' && 'EAC wall eroded',
    str(v, k(s, 'tympanosclerosis')) === 'present' && 'tympanosclerosis',
  ])
}

function riskStatement(v: Values, s: Side) {
  const dehiscent = dehiscentSegments(v, s)
  const anyFacial = FACIAL_SEGMENTS.some((seg) => str(v, k(s, `fn_${seg.key}`)))
  const course = str(v, k(s, 'fnCourse'))
  const fistula = str(v, k(s, 'fistula'))
  const oval = str(v, k(s, 'oval'))
  const fxFacial = FACIAL_SEGMENTS.filter((seg) => list(v, k(s, 'fxFacial')).includes(seg.key)).map((seg) => seg.name)
  return joinParts([
    anyFacial && (dehiscent.length ? `dehiscent ${dehiscent.join(', ')} facial nerve segment${dehiscent.length > 1 ? 's' : ''}` : 'no facial canal dehiscence'),
    fracture(v, s) && fxFacial.length > 0 && `fracture through the facial canal (${fxFacial.join(', ')})`,
    course && `facial nerve course ${lbl(FACIAL_COURSE, v, k(s, 'fnCourse'))}`,
    fistula === 'none' && 'no lateral canal fistula',
    fistula === 'incomplete' && 'incomplete lateral canal fistula (bony wall thinned)',
    fistula === 'complete' && 'complete lateral canal fistula (wall breached, soft tissue in the lumen)',
    oval && oval !== 'patent' && `oval window ${oval}`,
    str(v, k(s, 'tegTymp')) && `tegmen tympani ${str(v, k(s, 'tegTymp'))}`,
    str(v, k(s, 'tegMast')) && `tegmen mastoideum ${str(v, k(s, 'tegMast'))}`,
    str(v, k(s, 'lowTegmen')) === 'yes' && 'low-lying tegmen',
    fracture(v, s) && str(v, k(s, 'fxTegmen')) === 'yes' && 'tegmen breached by fracture (CSF leak risk)',
    str(v, k(s, 'sigPlate')) && `sigmoid plate ${str(v, k(s, 'sigPlate'))}`,
    str(v, k(s, 'sigmoid')) && `sigmoid sinus ${str(v, k(s, 'sigmoid')) === 'normal' ? 'normal position' : 'anteriorly positioned (procident)'}`,
    str(v, k(s, 'jb')) === 'normal' && 'jugular bulb normal',
    str(v, k(s, 'jb')) === 'high' && 'jugular bulb high-riding but covered',
    str(v, k(s, 'jb')) === 'dehiscent' && 'dehiscent jugular bulb (do not biopsy)',
    str(v, k(s, 'carotid')) === 'normal' && 'carotid canal intact',
    str(v, k(s, 'carotid')) === 'dehiscent' && 'dehiscent internal carotid artery (do not biopsy)',
    str(v, k(s, 'carotid')) === 'aberrant' && 'aberrant internal carotid artery (do not biopsy)',
    str(v, k(s, 'spinosum')) === 'absent' && 'absent foramen spinosum (persistent stapedial artery if the tympanic facial canal is enlarged)',
    str(v, k(s, 'pneuma')) && `mastoid ${lbl(PNEUMA, v, k(s, 'pneuma'))}`,
    str(v, k(s, 'korner')) === 'present' && "Körner's septum present",
    str(v, k(s, 'et')) && `Eustachian tube region ${str(v, k(s, 'et'))}`,
  ])
}

function build(v: Values) {
  const sides = activeSides(v)
  const warnings: string[] = []
  const tag = (s: Side, body: string) => `${SIDE[s]}: ${body}`

  const summary = str(v, 'summary').replace(/[.;,\s]+$/, '')
  const disease = [summary && `${summary.charAt(0).toUpperCase()}${summary.slice(1)}.`, ...sides.map((s) => {
    const items = diseaseStatements(v, s)
    return items.length ? tag(s, `${items.join('; ')}.`) : ''
  })].filter(Boolean)
  const erosion = sides.map((s) => {
    const body = erosionStatement(v, s)
    return body ? tag(s, `${body}.`) : ''
  }).filter(Boolean)
  const risk = sides.map((s) => {
    const body = riskStatement(v, s)
    return body ? tag(s, `${body}.`) : ''
  }).filter(Boolean)
  const recOther = str(v, 'recOther').replace(/[.;,\s]+$/, '')
  const recs = [
    ...sides.map((s) => {
      const r = recommendations(v, s)
      return r.length ? `Recommendation, ${lc(SIDE[s])} ear: ${r.join('; ')}.` : ''
    }),
    recOther && `${recOther.charAt(0).toUpperCase()}${recOther.slice(1)}.`,
  ].filter(Boolean)

  const impression = [
    disease.join(' '),
    erosion.join(' '),
    risk.join(' '),
    recs.join(' '),
  ].filter((item): item is string => Boolean(item))

  const technique = str(v, 'reformats') === 'no'
    ? 'TECHNIQUE: Thin-section helical axial with coronal reformats, bone algorithm.'
    : 'TECHNIQUE: Thin-section helical axial with coronal reformats, bone algorithm; Pöschl/Stenvers reformats of the superior semicircular canals.'

  const text = [
    'CT TEMPORAL BONES WITHOUT CONTRAST',
    technique,
    ...sides.map((s) => earBlock(v, s)),
    str(v, 'other') && `OTHER: ${str(v, 'other')}`,
    impression.length > 0 && `IMPRESSION:\n${impression.map((item, i) => `${i + 1}. ${item}`).join('\n')}`,
  ].filter(Boolean).join('\n\n')

  for (const s of sides) {
    const side = SIDE[s]
    if (str(v, k(s, 'sscd')) === 'present' && str(v, 'reformats') === 'no') {
      warnings.push(`${side}: superior canal dehiscence called without Pöschl/Stenvers reformats; call it only on thin-section Pöschl and Stenvers reformats.`)
    }
    const tegDehiscent = str(v, k(s, 'tegTymp')) === 'dehiscent' || str(v, k(s, 'tegMast')) === 'dehiscent'
    if (tegDehiscent && str(v, k(s, 'tegPlanes')) === 'no') {
      warnings.push(`${side}: tegmen dehiscence not confirmed on two planes; thin is normal, a gap on two planes is dehiscence.`)
    }
    const va = aqueduct(v, s)
    if (str(v, k(s, 'cochlea')) === 'ip2' && va === 'normal') {
      warnings.push(`${side}: IP-II with a normal-width vestibular aqueduct; every IP-II ear in Sennaroglu and Saatci had an enlarged aqueduct. Recheck the partition or the measurement.`)
    }
    if (str(v, k(s, 'cochlea')) === 'ip1' && va === 'enlarged') {
      warnings.push(`${side}: IP-I with an enlarged vestibular aqueduct; no IP-I ear in Sennaroglu and Saatci had one. Recheck the partition or the measurement.`)
    }
    if (str(v, k(s, 'capsule')) === 'normal' && (str(v, k(s, 'fenestral')) === 'present' || !['', 'none'].includes(str(v, k(s, 'retro'))))) {
      warnings.push(`${side}: otic capsule density marked normal but a fenestral or retrofenestral lucency is recorded.`)
    }
    if (fracture(v, s) && str(v, k(s, 'fxTegmen')) === 'yes' && str(v, k(s, 'tegTymp')) === 'intact' && str(v, k(s, 'tegMast')) === 'intact') {
      warnings.push(`${side}: fracture breaches the tegmen but both tegmen tympani and mastoideum are marked intact.`)
    }
    if (surgeryHas(v, s, 'cwu') && surgeryHas(v, s, 'cwd')) {
      warnings.push(`${side}: both canal wall up and canal wall down mastoidectomy selected.`)
    }
    const form = str(v, k(s, 'cochlea'))
    if (form === 'michel' && (str(v, k(s, 'vestibule')) === 'normal' || str(v, k(s, 'scc')) === 'intact')) {
      warnings.push(`${side}: Michel (no inner ear) recorded with a normal vestibule or intact semicircular canals.`)
    }
    if ((form === 'cc' || form === 'ip1') && str(v, k(s, 'vestibule')) === 'normal') {
      warnings.push(`${side}: ${form === 'cc' ? 'common cavity (cochlea and vestibule are one cyst)' : 'IP-I (cochlea and vestibule both cystic)'} recorded with a normal vestibule.`)
    }
    const cochlea = str(v, k(s, 'cochlea'))
    if (cochlea && cochlea !== 'normal' && !str(v, k(s, 'fnCourse'))) {
      warnings.push(`${side}: malformed ear without a stated facial nerve course; a pre-implant report must state facial nerve course and cochlear partition.`)
    }
  }
  if (/ossicular (chain )?erosion/i.test(str(v, 'summary'))) {
    warnings.push('Never write "ossicular chain erosion" without naming which ossicle.')
  }

  return { text, warnings }
}

/* ---------- Learn: the lesson, verbatim ---------- */

const learn: LearnSection[] = [
  {
    id: 'three-questions',
    title: '1. Why temporal bone CT is hard, and the three questions that make it simple',
    body: (
      <>
        <p>The temporal bone packs the hearing organ, the balance organ, the facial nerve, the carotid artery, and two big veins into a space the size of a walnut. The temptation is to look at everything at once, which is how things get missed. Instead, treat every study as answering three surgical questions:</p>
        <ol className="plain-list">
          <li><strong>What is the disease and where is it?</strong> (Which compartment, how far it extends.)</li>
          <li><strong>What has it eroded?</strong> (Ossicles one by one, tegmen, facial canal, labyrinth.)</li>
          <li><strong>What anatomy will the surgeon hit on the way in?</strong> (Facial nerve, sigmoid sinus, jugular bulb, carotid, low tegmen.)</li>
        </ol>
        <p>There is good evidence that general radiologists under-answer questions 2 and 3. Cavaliere et al. (Front Neurol 2021) compared 301 outside CT reports with surgical findings: facial canal erosion was mentioned in 18 reports but found in 76 patients at surgery; the stapes was never mentioned in any report yet was eroded in 131 patients; jugular bulb position was never described; and no report ever stated that a vascular variant was <em>absent</em>. Using a structured checklist raised agreement with surgery from "fair" (kappa 0.40) to "substantial" (kappa 0.68). That paper is the temporal-bone equivalent of the CLOSE paper: the checklist below is built from it plus the two-part Radiology review by Juliano, Ginat and Moonis.</p>
      </>
    ),
  },
  {
    id: 'technique',
    title: '2. Technique and how to look',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>Acquisition:</strong> thin-section (≤0.6 mm) helical CT, bone algorithm. Contrast is not needed for chronic ear disease, hearing loss or trauma. Contrast (or MRI) is added for suspected abscess, tumor, or skull base osteomyelitis.</li>
          <li><strong>Planes:</strong> axial and coronal are the workhorses. Two extra oblique reformats matter:
            <ul className="plain-list">
              <li><strong>Pöschl plane</strong> (parallel to the superior semicircular canal): shows the whole arc of the superior canal in one image. This is the plane for superior canal dehiscence.</li>
              <li><strong>Stenvers plane</strong> (perpendicular to the superior canal): cross-section of the canal roof; confirms what Pöschl suggests.</li>
            </ul>
          </li>
          <li><strong>Compare with the other side constantly.</strong> Most "danger zone" findings (dehiscent facial canal, thin tegmen) are easiest to call when the other ear is normal.</li>
        </ul>
        <div className="lesson-key">
          <p>One caution from the literature: partial-volume averaging on thicker slices creates fake dehiscences. Belden et al. (Radiology 2003) showed that apparent superior canal dehiscence on 1-mm scans had a positive predictive value of only about 50%, which rose to 93% with 0.5-mm slices reformatted in the plane of the canal. The same principle applies to the tegmen and facial canal: if the bone looks absent on one thick slice, check the thin data in a second plane before calling it.</p>
        </div>
      </>
    ),
  },
  {
    id: 'reading-pathway',
    title: '3. The reading pathway: outside in',
    body: (
      <>
        <p>Go through the same structures in the same order every time. Outside-in works because it follows the way disease spreads and the way the surgeon enters.</p>

        <div className="lesson-step">
          <h4>Step 1. External auditory canal (EAC)</h4>
          <p>Patent? Soft tissue? Bone erosion of the canal walls (think necrotizing otitis externa or EAC cholesteatoma)? Congenital narrowing or atresia?</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Tympanic membrane and scutum</h4>
          <p>The scutum is the sharp bony spur at the top of the eardrum on coronal images (lateral wall of the epitympanum). A blunted or eroded scutum is the classic first sign of a pars flaccida cholesteatoma.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Middle ear, compartment by compartment</h4>
          <p>The middle ear is a box with three levels: epitympanum (attic, above the eardrum), mesotympanum (level with the eardrum), hypotympanum (below). Two hidden corners matter to the surgeon: the <strong>sinus tympani</strong> (posteromedial pocket behind the stapes, hard to see from the ear canal) and the <strong>facial recess</strong>. Say which compartments are opaque and whether the opacity has a mass-like shape or is just fluid.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Ossicles, individually</h4>
          <p>Malleus (head in attic, handle in TM), incus (body in attic, long process going down to the stapes; the long process is the most vulnerable to erosion because of its thin blood supply), stapes (the smallest and most often ignored). On axial images the malleus head and incus body form the "ice cream cone": malleus head is the scoop, incus body and short process the cone. Name each ossicle as intact, eroded, or absent.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Mastoid</h4>
          <p>How well aerated is it (well pneumatized, sclerotic, or contracted)? Opacified? Are the septa between air cells intact? Loss of septa with a confluent cavity means coalescent mastoiditis. Note a <strong>Körner's septum</strong> (a bony plate splitting the mastoid into lateral and medial parts, which can make the surgeon think they have reached the antrum when they have not).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Facial nerve canal, segment by segment</h4>
          <p>Labyrinthine segment (from the IAC to the geniculate ganglion), geniculate ganglion, tympanic (horizontal) segment running just below the lateral semicircular canal and above the oval window, second genu, and mastoid (vertical) segment down to the stylomastoid foramen. The tympanic segment above the oval window is the most common site of dehiscence, both congenital and from cholesteatoma. Coronal images through the oval window are the key view.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Inner ear (otic capsule)</h4>
          <p>Cochlea: 2.5 turns, with an intact central modiolus. Vestibule. Three semicircular canals. Vestibular aqueduct (thin channel running from the vestibule to the posterior petrous surface). Oval and round windows. Look for the density of the otic capsule itself (normally the densest bone in the body); lucency in it is otosclerosis or, in children, dysplasia.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Vessels</h4>
          <p>Carotid canal (vertical then horizontal segments, with intact bone between it and the middle ear), jugular bulb (how high, and is there bone between it and the middle ear), sigmoid sinus (how far forward it sits relative to the mastoid).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 9. Roof and walls</h4>
          <p>Tegmen tympani (roof over the middle ear) and tegmen mastoideum (roof over the mastoid). Thin is normal; a gap on two planes is dehiscence. Petrous apex: symmetric aeration, or fat, or a lesion?</p>
        </div>

        <div className="lesson-step">
          <h4>Step 10. Internal auditory canal and the rest of the skull base</h4>
          <p>IAC caliber (compare sides), jugular foramen margins (smooth vs moth-eaten), and a glance at the visible brain.</p>
        </div>
      </>
    ),
  },
  {
    id: 'floats',
    title: '4. The danger-zone checklist: FLOATS',
    body: (
      <>
        <p>CLOSE is a published mnemonic; there is no equally established one for the temporal bone, so this is a teaching device assembled from the Cavaliere checklist and the Juliano reviews. The habit is the same as for sinuses: state each item explicitly, including "none" or "normal," because the surgeon cannot tell silence from oversight.</p>
        <ul className="plain-list">
          <li><strong>F — Facial nerve canal.</strong> Report dehiscence by segment (tympanic, second genu, mastoid). Report an abnormal course (anteriorly displaced nerve in ear malformations, a known hazard in cochlear implant surgery per Sennaroglu). Report the geniculate ganglion if there is trauma.</li>
          <li><strong>L — Labyrinth.</strong> Is there a fistula into the lateral semicircular canal? It is the most exposed part of the inner ear during mastoid surgery. Describe whether the bony wall is thinned (incomplete fistula) or clearly breached with soft tissue in the lumen (complete fistula). Also cover superior canal dehiscence on Pöschl/Stenvers and the oval window (fixed, eroded, or obliterated).</li>
          <li><strong>O — Ossicles.</strong> Each one by name. The surgeon decides the type of reconstruction based on which ossicles survive.</li>
          <li><strong>A — Aeration and access.</strong> Mastoid pneumatization (a sclerotic mastoid means a smaller working space), Körner's septum, low-lying tegmen, and Eustachian tube region (opacified or not). Cavaliere's group found that pneumatization pattern and Eustachian tube status were almost never reported despite being surgically relevant.</li>
          <li><strong>T — Tegmen.</strong> Tegmen tympani and tegmen mastoideum: intact, thinned, or dehiscent, and whether there is soft tissue or a meningocele passing through. Also the sigmoid plate (bone between mastoid and sigmoid sinus).</li>
          <li><strong>S — Sinus and vessels.</strong> Anteriorly positioned (procident) sigmoid sinus; high-riding or dehiscent jugular bulb (a jugular bulb reaching the level of the round window, or lacking a bony cover, is what the surgeon wants to know); aberrant or dehiscent internal carotid artery; persistent stapedial artery. These are also the "do not biopsy" lesions: a bluish mass behind the eardrum can be a vessel.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'pathologies',
    title: '5. The pathologies you must recognize',
    body: (
      <>
        <h4>Cholesteatoma</h4>
        <p>A collection of skin (keratin) trapped in the middle ear that grows and erodes bone. CT is very sensitive to soft tissue but cannot tell cholesteatoma from granulation tissue or fluid by density; what makes the diagnosis on CT is a <strong>non-dependent soft-tissue mass plus bone erosion</strong> in a typical location.</p>
        <ul className="plain-list">
          <li><strong>Pars flaccida (attic) type, most common:</strong> starts in Prussak's space (the small pocket between the top of the eardrum and the malleus neck). Blunts the scutum, pushes the ossicles <strong>medially</strong>, then grows backward into the aditus and antrum.</li>
          <li><strong>Pars tensa type:</strong> starts posterosuperior, lies <strong>medial</strong> to the ossicles and pushes them laterally, erodes the incus long process and stapes early, and likes to hide in the sinus tympani.</li>
          <li><strong>Congenital cholesteatoma:</strong> a smooth round mass behind an intact eardrum in a child, typically anterior mesotympanum, no history of otitis.</li>
        </ul>
        <p>Report extent, each ossicle, and every FLOATS item. When CT is uncertain (opacified postoperative ear, or an opaque middle ear without erosion), the answer is <strong>non-echo-planar diffusion-weighted MRI</strong>: cholesteatoma is bright on DWI. In the meta-analysis by Lingam and Bassett (Otol Neurotol 2017), pooled sensitivity was 0.91 and specificity 0.92 across 26 studies, and it is now widely used instead of second-look surgery. The Baráth AJNR review covers the MRI protocol.</p>

        <h4>Chronic otitis media without cholesteatoma</h4>
        <p>Mucosal thickening, fluid, tympanosclerosis (calcified plaques in the eardrum or around the ossicles, which fix them), and ossicular erosion can all occur without cholesteatoma. If there is no mass-like tissue and no scutum erosion, say "no CT evidence of cholesteatoma; DWI MRI if clinically suspected."</p>

        <h4>Acute mastoiditis and its complications</h4>
        <p>Fluid in the mastoid alone is common and often meaningless (it is present in many head CTs). Mastoiditis becomes surgical when the air-cell <strong>septa dissolve</strong> (coalescent mastoiditis). Then look outward for: subperiosteal abscess (lateral), Bezold abscess (through the mastoid tip into the neck), sigmoid sinus thrombosis and epidural abscess (posterior, needs contrast), and labyrinthitis or petrous apicitis (medial). Say "recommend contrast-enhanced CT or MRI" when you see coalescence.</p>

        <h4>Otosclerosis</h4>
        <p>Abnormal spongy bone replacing the normally dense otic capsule. Two patterns:</p>
        <ul className="plain-list">
          <li><strong>Fenestral:</strong> a small lucent spot just in front of the oval window (the fissula ante fenestram). Causes conductive hearing loss by fixing the stapes. Look for it on axial images at the level of the oval window; compare sides.</li>
          <li><strong>Retrofenestral (cochlear):</strong> a lucent halo around the cochlea ("double ring"). Causes sensorineural loss.</li>
        </ul>
        <p>The Symons/Fanning grading, validated by Lee et al. (AJNR 2009) with excellent reader agreement: grade 1 fenestral only; grade 2 patchy cochlear disease (2A basal turn, 2B middle/apical turns, 2C both); grade 3 diffuse confluent cochlear involvement. Grade matters because cochlear disease affects surgical options.</p>

        <h4>Superior semicircular canal dehiscence (SSCD)</h4>
        <p>Missing bone over the top of the superior canal, so sound and pressure move the inner ear fluid abnormally (vertigo with loud sounds, hearing your own eyeballs move). Call it only on thin-section Pöschl and Stenvers reformats, for the reason explained above. Report length of the gap and whether it is under the arcuate eminence or at the superior petrosal sinus.</p>

        <h4>Congenital inner ear malformations (pediatric sensorineural loss, cochlear implant work-up)</h4>
        <p>Use the Sennaroglu classification, because surgeons use it. From most to least severe: Michel (no inner ear), cochlear aplasia, common cavity (cochlea and vestibule are one cyst), incomplete partition type I (cochlea and vestibule both cystic, no modiolus, no enlarged aqueduct), cochlear hypoplasia, incomplete partition type II (the classic Mondini: 1.5 turns with a cystic apex, mildly dilated vestibule, <strong>enlarged vestibular aqueduct</strong>).</p>
        <p>Enlarged vestibular aqueduct is the most common CT-visible cause of pediatric sensorineural loss. Vijayasekaran et al. (AJNR 2007) measured normal children and set the cutoff: midpoint width ≥1.0 mm or opercular width ≥2.0 mm is enlarged. Also report the IAC (a defective fundus or absent canal means a possible absent cochlear nerve, which needs MRI). The Joshi RadioGraphics article walks through all of this with pictures.</p>

        <h4>Trauma</h4>
        <p>Stop using "longitudinal vs transverse" as the main descriptor. Two independent studies showed it predicts complications poorly: Ishman and Friedland (Laryngoscope 2004) found CSF leak was 9.8 times more common when the fracture involved the petrous bone, and Little and Kesser (Arch Otolaryngol 2006) found otic capsule–violating fractures carried 5× the facial nerve injury, 25× the sensorineural loss and 8× the CSF otorrhea of otic capsule–sparing fractures. So the first line of your report is: <strong>otic capsule sparing or violating.</strong> Then: fracture through the facial canal (which segment), ossicular dislocation (incudostapedial is most common; incudomalleolar separation looks like the ice cream fallen off the cone), carotid canal involvement (recommend CTA), tegmen breach (CSF leak risk), hemotympanum, and any pneumocephalus or pneumolabyrinth (air inside the inner ear means a window fracture or otic capsule fracture).</p>

        <h4>Vascular variants and "do not biopsy" masses</h4>
        <ul className="plain-list">
          <li><strong>Aberrant internal carotid artery:</strong> the carotid runs through the middle ear across the cochlear promontory. Clues: absent bone over the vertical carotid segment, a tubular density crossing the promontory, enlarged inferior tympanic canaliculus.</li>
          <li><strong>Dehiscent jugular bulb:</strong> the jugular bulb bulges into the hypotympanum with no sigmoid plate covering it.</li>
          <li><strong>Persistent stapedial artery:</strong> absent foramen spinosum plus an enlarged tympanic facial canal.</li>
          <li><strong>Paraganglioma (glomus tympanicum):</strong> a soft-tissue mass on the promontory with an intact jugular plate. If the bone between jugular foramen and middle ear is eroded with a moth-eaten (permeative) margin, it is a glomus jugulotympanicum; recommend MRI.</li>
        </ul>

        <h4>Petrous apex</h4>
        <p>Razek and Huang (RadioGraphics 2012) organize it well. The commonest "lesion" is not a lesion: asymmetric pneumatization (fatty marrow on one side looks bright on T1 MRI) or trapped fluid in an aerated apex. Real lesions: cholesterol granuloma (expansile, smooth margins, T1 and T2 bright on MRI), epidermoid/cholesteatoma (expansile, DWI bright), petrous apicitis (air cells opacified with erosive margins, in a septic patient), and tumors (chondrosarcoma, chordoma, metastasis).</p>

        <h4>Necrotizing (malignant) otitis externa</h4>
        <p>Soft tissue in the EAC that erodes the canal floor and spreads to the skull base in an elderly diabetic or immunocompromised patient. On CT, look for bone erosion around the EAC, the stylomastoid foramen and the temporomandibular joint region. Say so and recommend MRI to map the skull base marrow.</p>

        <h4>The postoperative ear</h4>
        <ul className="plain-list">
          <li><strong>Canal wall up mastoidectomy:</strong> mastoid air cells removed, posterior EAC wall kept.</li>
          <li><strong>Canal wall down:</strong> posterior EAC wall removed, so mastoid and ear canal become one cavity. Soft tissue in the cavity is the question: recurrence vs debris. DWI MRI answers it.</li>
          <li><strong>Ossicular prostheses</strong> (PORP, TORP): bright metal or ceramic. Report whether it is in line between the eardrum/malleus and the stapes or oval window, or displaced.</li>
          <li><strong>Cochlear implant:</strong> electrode should spiral inside the cochlea in the basal turn onward. Report tip fold-over (electrode curls back on itself, seen on axial) or extracochlear position.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cases',
    title: '6. Cases from the literature to anchor the patterns',
    body: (
      <ul className="plain-list">
        <li><strong>Tegmen and facial canal erosion by cholesteatoma:</strong> Cavaliere et al. Figure 2 shows, side by side, the coronal CT and the surgical view of a tegmen interruption, an eroded tympanic facial segment, and a lateral canal fistula. It makes the "thin line on CT equals exposed nerve at surgery" idea concrete.</li>
        <li><strong>SSCD, real vs fake:</strong> Belden et al. show six patients whose "dehiscence" on 1-mm scans disappeared on 0.5-mm reformats. The case series to remember before you call a dehiscence.</li>
        <li><strong>Enlarged vestibular aqueduct with IP-II:</strong> Sennaroglu and Saatci (Laryngoscope 2002) document that every IP-II ear had an enlarged aqueduct and no IP-I ear did, which is why measuring the aqueduct helps you classify the cochlea.</li>
        <li><strong>Facial nerve displacement in malformed ears:</strong> Sennaroglu, Sarac and Ergin (Otol Neurotol 2006) describe a dehiscent, anteriorly placed facial nerve in an IP-I ear that forced a change in surgical approach, and CSF gushers in four of twenty implanted malformed ears. This is why your pre-implant report must state facial nerve course and cochlear partition.</li>
        <li><strong>Otic capsule–violating fracture outcomes:</strong> Little and Kesser's series is the reference to quote when a trauma clinician asks why you did not say "transverse."</li>
      </ul>
    ),
  },
  {
    id: 'template',
    title: '7. A workable structured template',
    body: (
      <>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Two habits carry over from the sinus lesson: write "none" for each danger item rather than staying silent, and move the danger anatomy into the impression. A third habit is specific to this study: never write "ossicular chain erosion" without naming which ossicle, since the Cavaliere data show that is exactly where general reports fall short.</p>
        </div>
      </>
    ),
  },
]

/* ---------- Quiz ---------- */

const quiz: QuizQuestion[] = [
  {
    id: 'cholesteatoma-ct',
    question: 'On CT, what makes the diagnosis of cholesteatoma?',
    options: [
      'Soft tissue of low density compared with fluid',
      'Any opacification of the epitympanum',
      'A non-dependent soft-tissue mass plus bone erosion in a typical location',
      'Fluid in the mastoid air cells',
    ],
    answer: 2,
    explanation: (
      <p>CT cannot tell cholesteatoma from granulation tissue or fluid by density; what makes the diagnosis is a non-dependent soft-tissue mass plus bone erosion in a typical location. When CT is uncertain, non-echo-planar DWI MRI is the answer (<Cite doi={DOI.lingam}>Lingam and Bassett</Cite>).</p>
    ),
  },
  {
    id: 'trauma-first-line',
    question: 'What should be the first descriptor in a temporal bone fracture report?',
    options: [
      'Longitudinal vs transverse',
      'Otic capsule sparing vs violating',
      'Whether there is hemotympanum',
      'Fracture length in millimetres',
    ],
    answer: 1,
    explanation: (
      <p>Longitudinal vs transverse predicts complications poorly. Otic capsule–violating fractures carried 5× the facial nerve injury, 25× the sensorineural loss and 8× the CSF otorrhea of sparing fractures (<Cite doi={DOI.little}>Little and Kesser</Cite>).</p>
    ),
  },
  {
    id: 'eva-cutoff',
    question: 'Which vestibular aqueduct measurement is enlarged by the Vijayasekaran cutoff?',
    options: [
      'Midpoint width 0.8 mm, opercular width 1.6 mm',
      'Midpoint width 0.9 mm, opercular width 1.9 mm',
      'Midpoint width 0.7 mm, opercular width 1.5 mm',
      'Midpoint width 1.0 mm, opercular width 1.8 mm',
    ],
    answer: 3,
    explanation: (
      <p>Midpoint width ≥1.0 mm or opercular width ≥2.0 mm is enlarged (<Cite doi={DOI.vijay}>Vijayasekaran et al.</Cite>). Either criterion is enough.</p>
    ),
  },
  {
    id: 'sscd-thin',
    question: 'Why should superior canal dehiscence be called only on thin-section Pöschl and Stenvers reformats?',
    options: [
      'On 1-mm scans the positive predictive value was only about 50%, rising to 93% with 0.5-mm reformats in the canal plane',
      'Axial images cannot show the superior canal at all',
      'Dehiscence is only symptomatic when longer than 5 mm',
      'Pöschl reformats remove the need to compare with the other side',
    ],
    answer: 0,
    explanation: (
      <p>Partial-volume averaging on thicker slices creates fake dehiscences (<Cite doi={DOI.belden}>Belden et al.</Cite>). The same principle applies to the tegmen and facial canal: check the thin data in a second plane before calling it.</p>
    ),
  },
  {
    id: 'facial-site',
    question: 'Where is the most common site of facial nerve canal dehiscence?',
    options: [
      'Labyrinthine segment',
      'Mastoid segment near the stylomastoid foramen',
      'Tympanic segment above the oval window',
      'Geniculate ganglion',
    ],
    answer: 2,
    explanation: (
      <p>The tympanic segment above the oval window is the most common site of dehiscence, both congenital and from cholesteatoma. Coronal images through the oval window are the key view.</p>
    ),
  },
  {
    id: 'mastoiditis',
    question: 'A mastoid is opacified. What finding makes the mastoiditis surgical and prompts a contrast study?',
    options: [
      'Fluid in the mastoid air cells',
      'Dissolution of the air-cell septa (coalescent mastoiditis)',
      'A sclerotic mastoid',
      "A Körner's septum",
    ],
    answer: 1,
    explanation: (
      <p>Fluid in the mastoid alone is common and often meaningless. Mastoiditis becomes surgical when the septa dissolve; say "recommend contrast-enhanced CT or MRI" when you see coalescence.</p>
    ),
  },
  {
    id: 'otosclerosis-grade',
    question: 'Patchy lucency around the middle and apical cochlear turns, without diffuse confluent involvement, is which otosclerosis grade?',
    options: ['Grade 1', 'Grade 2A', 'Grade 3', 'Grade 2B'],
    answer: 3,
    explanation: (
      <p>Symons/Fanning grading, validated by <Cite doi={DOI.lee}>Lee et al.</Cite>: grade 1 fenestral only; grade 2 patchy cochlear disease (2A basal turn, 2B middle/apical turns, 2C both); grade 3 diffuse confluent cochlear involvement.</p>
    ),
  },
  {
    id: 'stapedial',
    question: 'Which pair of CT findings suggests a persistent stapedial artery?',
    options: [
      'Absent foramen spinosum plus an enlarged tympanic facial canal',
      'High-riding jugular bulb and absent sigmoid plate',
      'Absent bone over the vertical carotid segment and a tubular density on the promontory',
      'Moth-eaten jugular foramen margin and a promontory mass',
    ],
    answer: 0,
    explanation: (
      <p>Persistent stapedial artery: absent foramen spinosum plus an enlarged tympanic facial canal. Absent bone over the vertical carotid segment with a tubular density crossing the promontory is an aberrant ICA; a moth-eaten jugular foramen margin is a glomus jugulotympanicum. All are "do not biopsy" territory.</p>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'temporal-bone-ct',
  name: 'Temporal bone CT',
  lede: 'The three surgical questions, an outside-in reading order, a danger-zone checklist, the main pathologies, and a structured template. Built the same way as the sinus lesson.',
  sourceNote: 'References were checked against PubMed; DOI links are in the last section.',
  references,
  report: { steps, build, initial },
  learn,
  quiz,
}

export function TemporalBoneCtStudyPage() {
  return <StudyPage study={study} />
}
