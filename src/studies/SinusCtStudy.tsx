import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: "O'Brien WT et al. The preoperative sinus CT: avoiding a \"CLOSE\" call with surgical complications. Radiology 2016;281:10–21. (The core paper; excellent figures for each CLOSE item.)", doi: '10.1148/radiol.2016152230' },
  { citation: 'Vaid S et al. An imaging checklist for pre-FESS CT: framing a surgically relevant report. Clin Radiol 2011;66:459–470. (Structured report; case figures for Onodi/optic nerve, carotid septa, low fovea.)', doi: '10.1016/j.crad.2010.11.010' },
  { citation: 'Lund VJ, Mackay IS. Staging in rhinosinusitis. Rhinology 1993;31:183–184.' },
  { citation: 'Keros P. On the practical value of differences in the level of the lamina cribrosa of the ethmoid. Z Laryngol Rhinol Otol 1962;41:809–813. (Original Keros classification.)' },
  { citation: 'Wormald PJ et al. The International Frontal Sinus Anatomy Classification (IFAC) and Classification of the Extent of Endoscopic Frontal Sinus Surgery (EFSS). Int Forum Allergy Rhinol 2016;6:677–696. (Frontal recess cell naming.)', doi: '10.1002/alr.21738' },
  { citation: 'Hoang JK et al. Multiplanar sinus CT: a systematic approach to imaging before functional endoscopic sinus surgery. AJR 2010;194:W527–536. (Good multiplanar teaching cases.)', doi: '10.2214/AJR.09.3584' },
  { citation: 'Almhanedi H et al. Surgeon versus radiologist: an inter-rater reliability analysis of the CLOSE checklist for preoperative CT sinus assessment. Eur Arch Otorhinolaryngol 2025;282:837–842.', doi: '10.1007/s00405-024-09083-0' },
  { citation: 'Lee TY et al. Improving CT sinus reporting for endoscopic sinus surgery using the CLOSE criteria: a quality improvement project. Cureus 2025;17:e96762.', doi: '10.7759/cureus.96762' },
]

const OBRIEN = '10.1148/radiol.2016152230'
const VAID = '10.1016/j.crad.2010.11.010'
const WORMALD = '10.1002/alr.21738'
const LEE = '10.7759/cureus.96762'

const reportTemplate = `CT SINUS WITHOUT CONTRAST — PRE-FESS

TECHNIQUE: Thin-section axial with coronal and sagittal reformats, bone and soft-tissue windows.

DISEASE EXTENT:
  Frontal: R __ / L __        Anterior ethmoid: R __ / L __
  Posterior ethmoid: R __ / L __   Maxillary: R __ / L __
  Sphenoid: R __ / L __        OMC: R __ / L __
  Lund-Mackay: __/24
  Character: mucosal thickening / polypoid / hyperdense material / fluid level / osteitis

DRAINAGE PATHWAYS:
  Septum: deviation (direction, spur, contact)
  Middle turbinates: concha bullosa / paradoxical
  Uncinate: attachment (lamina / skull base / middle turbinate), pneumatized
  OMC: patent / obstructed by ___
  Frontal recess: patent / narrowed by (agger nasi, supra agger, suprabulla, frontal cells)
  Sphenoethmoidal recess: patent / obstructed
  Haller cells: present / absent

CRITICAL ANATOMY (CLOSE):
  C — Olfactory fossa depth: R __ mm (Keros __) / L __ mm (Keros __); asymmetry; skull-base dehiscence: none
  L — Lamina papyracea: intact / dehiscent (side, slice)
  O — Onodi cell: absent / present (side); optic nerve dehiscent: yes/no
  S — Sphenoid pneumatization: sellar/presellar/conchal; ICA dehiscence: none; optic nerve dehiscence: none; septum attaching to carotid canal: none
  E — Anterior ethmoidal artery: within skull base / below skull base (mesentery), side

PRIOR SURGERY: none / describe

OTHER: orbits, brain, nasopharynx, dental disease

IMPRESSION:
  1. Disease summary (pattern + severity).
  2. Obstructed pathways and cause.
  3. Surgical-risk anatomy, listed explicitly (e.g., "Keros type III on the right; anterior ethmoidal artery below the skull base bilaterally; left Onodi cell with dehiscent optic nerve").
  4. Any red flag (unilateral disease, bone destruction) with recommendation.`

const TECHNIQUE = 'Thin-section axial with coronal and sagittal reformats, bone and soft-tissue windows.'

/* ---------- Options and small helpers ---------- */

type Side = 'r' | 'l'
const SIDES: Side[] = ['r', 'l']
const SIDE_NAME: Record<Side, string> = { r: 'right', l: 'left' }
const SIDE_CAP: Record<Side, string> = { r: 'Right', l: 'Left' }

/** For a variant that can be absent, one-sided or bilateral. */
const SIDED: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'r', label: 'Right' },
  { value: 'l', label: 'Left' },
  { value: 'b', label: 'Bilateral' },
]

function sidedText(value: string): string {
  if (value === 'r') return 'right'
  if (value === 'l') return 'left'
  if (value === 'b') return 'bilateral'
  return 'none'
}

function sideHas(value: string, side: Side) {
  return value === 'b' || value === side
}

const SINUS_SCORE: Option[] = [
  { value: '0', label: '0 clear' },
  { value: '1', label: '1 partial' },
  { value: '2', label: '2 complete' },
]
const OMC_SCORE: Option[] = [
  { value: '0', label: '0 open' },
  { value: '2', label: '2 blocked' },
]

/** Template order for DISEASE EXTENT. */
const AREAS = [
  { key: 'front', label: 'Frontal' },
  { key: 'aeth', label: 'Anterior ethmoid' },
  { key: 'peth', label: 'Posterior ethmoid' },
  { key: 'max', label: 'Maxillary' },
  { key: 'sph', label: 'Sphenoid' },
  { key: 'omc', label: 'OMC' },
] as const

const lmId = (key: string, side: Side) => `lm_${key}_${side}`

const CHARACTER: Option[] = [
  { value: 'mucosal', label: 'Mucosal thickening' },
  { value: 'polypoid', label: 'Polypoid' },
  { value: 'hyperdense', label: 'Hyperdense material' },
  { value: 'fluid', label: 'Fluid level' },
  { value: 'osteitis', label: 'Osteitis' },
]

const SEPTUM: Option[] = [
  { value: 'none', label: 'No deviation' },
  { value: 'r', label: 'To the right' },
  { value: 'l', label: 'To the left' },
]
const PRESENT: Option[] = [
  { value: 'no', label: 'None' },
  { value: 'yes', label: 'Present' },
]
const UNCINATE_ATTACH: Option[] = [
  { value: 'lamina', label: 'Lamina papyracea' },
  { value: 'base', label: 'Skull base' },
  { value: 'mt', label: 'Middle turbinate' },
]
const PATENT: Option[] = [
  { value: 'patent', label: 'Patent' },
  { value: 'obstructed', label: 'Obstructed' },
]
const FRONTAL_PATENT: Option[] = [
  { value: 'patent', label: 'Patent' },
  { value: 'narrowed', label: 'Narrowed' },
]
const OMC_CAUSE: Option[] = [
  { value: 'septum', label: 'Septal deviation or spur' },
  { value: 'cb', label: 'Concha bullosa' },
  { value: 'para', label: 'Paradoxical middle turbinate' },
  { value: 'haller', label: 'Haller cell' },
  { value: 'bulla', label: 'Large ethmoid bulla' },
  { value: 'uncinate', label: 'Uncinate pneumatization or lateralized uncinate' },
]
const FRONTAL_CAUSE: Option[] = [
  { value: 'agger', label: 'Agger nasi' },
  { value: 'supraagger', label: 'Supra agger cell' },
  { value: 'suprabulla', label: 'Suprabulla cell' },
  { value: 'frontal', label: 'Frontal cell' },
]

const LAMINA: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'dehiscent', label: 'Dehiscent' },
]
const LAMINA_SIDE: Option[] = SIDED.filter((option) => option.value !== 'none')
const LAMINA_OTHER: Option[] = [
  { value: 'bowing', label: 'Medial bowing' },
  { value: 'fracture', label: 'Prior fracture' },
  { value: 'fat', label: 'Orbital fat herniating into the ethmoid' },
]
const ONODI: Option[] = [
  { value: 'absent', label: 'Absent' },
  { value: 'present', label: 'Present' },
]
const YES_NO: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]
const PNEUMATIZATION: Option[] = [
  { value: 'sellar', label: 'Sellar' },
  { value: 'presellar', label: 'Presellar' },
  { value: 'conchal', label: 'Conchal' },
]
const PROTRUSION: Option[] = [
  { value: 'vidian', label: 'Vidian canal' },
  { value: 'rotundum', label: 'Foramen rotundum' },
]
const AEA: Option[] = [
  { value: 'in', label: 'Within skull base' },
  { value: 'below', label: 'Below skull base (mesentery)' },
]
const PRIOR: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'yes', label: 'Prior surgery' },
]
const PATTERN: Option[] = [
  { value: 'crs', label: 'Chronic rhinosinusitis' },
  { value: 'polyp', label: 'Nasal polyposis' },
  { value: 'afs', label: 'Allergic fungal sinusitis' },
  { value: 'fb', label: 'Fungal ball (mycetoma)' },
  { value: 'muco', label: 'Mucocele' },
  { value: 'sss', label: 'Silent sinus syndrome' },
  { value: 'acute', label: 'Acute sinusitis' },
  { value: 'odont', label: 'Odontogenic sinusitis' },
]
const MUCO_EXT: Option[] = [
  { value: 'orbital', label: 'Orbital extension' },
  { value: 'intracranial', label: 'Intracranial extension' },
]
const RED_FLAG: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'yes', label: 'Present' },
]
const RED_FLAGS: Option[] = [
  { value: 'unilateral', label: 'Unilateral disease' },
  { value: 'destruction', label: 'Bone destruction (not remodeling)' },
  { value: 'extension', label: 'Extension outside the sinus' },
  { value: 'ppf', label: 'Invasion of the pterygopalatine fossa' },
  { value: 'orbit', label: 'Invasion of the orbit' },
]

function labelOf(options: Option[], value: string) {
  return optionLabel({ options }, value)
}

/** Lowercased for running text, keeping eponyms (Haller) capitalized. */
function lowerLabel(label: string) {
  return /^(Haller|Onodi)\b/.test(label) ? label : label.toLowerCase()
}

function labelsOf(options: Option[], values: string[]) {
  return values.map((value) => lowerLabel(labelOf(options, value)))
}

/** "a", "a and b", "a, b and c". */
function joinAnd(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

function capitalize(text: string) {
  return text ? text[0].toUpperCase() + text.slice(1) : text
}

/* ---------- Rules ---------- */

/** Lund-Mackay (Rhinology 1993): sinuses 0/1/2, OMC 0/2, maximum 24. */
function lundMackay(values: Values) {
  let total = 0
  let scored = 0
  const sideTotal: Record<Side, number> = { r: 0, l: 0 }
  const sideScored: Record<Side, number> = { r: 0, l: 0 }
  for (const area of AREAS) {
    for (const side of SIDES) {
      const score = num(values, lmId(area.key, side))
      if (score === undefined) continue
      total += score
      scored += 1
      sideTotal[side] += score
      sideScored[side] += 1
    }
  }
  return { total, scored, complete: scored === AREAS.length * 2, sideTotal, sideScored }
}

/** Disease on one side with the other side fully scored as clear. */
function unilateralSide(values: Values): Side | undefined {
  const lm = lundMackay(values)
  if (lm.sideTotal.r > 0 && lm.sideScored.l === AREAS.length && lm.sideTotal.l === 0) return 'r'
  if (lm.sideTotal.l > 0 && lm.sideScored.r === AREAS.length && lm.sideTotal.r === 0) return 'l'
  return undefined
}

/** Keros: type I <=3 mm, type II 4-7 mm, type III >7 mm, as the lesson states it. */
function keros(depth: number | undefined): string | undefined {
  if (depth === undefined) return undefined
  if (depth <= 3) return 'I'
  if (depth >= 4 && depth <= 7) return 'II'
  if (depth > 7) return 'III'
  return undefined
}

function kerosText(depth: number | undefined): string {
  const type = keros(depth)
  if (type) return `Keros ${type}`
  if (depth !== undefined) return 'between Keros I and II'
  return ''
}

/* ---------- Fields ---------- */

const lmFields: Field[] = AREAS.flatMap((area) =>
  SIDES.map<Field>((side) => ({
    id: lmId(area.key, side),
    label: `${area.label}, ${SIDE_NAME[side]}`,
    kind: 'choice',
    options: area.key === 'omc' ? OMC_SCORE : SINUS_SCORE,
  })),
)

const omcFields: Field[] = SIDES.flatMap<Field>((side) => [
  { id: `omc_${side}`, label: `OMC, ${SIDE_NAME[side]}`, kind: 'choice', options: PATENT },
  {
    id: `omc_${side}_by`,
    label: `${SIDE_CAP[side]} OMC obstructed by`,
    kind: 'multi',
    options: OMC_CAUSE,
    showIf: (v) => str(v, `omc_${side}`) === 'obstructed',
  },
  {
    id: `omc_${side}_other`,
    label: `${SIDE_CAP[side]} OMC, other cause`,
    kind: 'text',
    placeholder: 'e.g. polypoid mucosa',
    showIf: (v) => str(v, `omc_${side}`) === 'obstructed',
  },
])

const frontalFields: Field[] = SIDES.flatMap<Field>((side) => [
  { id: `fr_${side}`, label: `Frontal recess, ${SIDE_NAME[side]}`, kind: 'choice', options: FRONTAL_PATENT },
  {
    id: `fr_${side}_by`,
    label: `${SIDE_CAP[side]} frontal recess narrowed by`,
    kind: 'multi',
    options: FRONTAL_CAUSE,
    showIf: (v) => str(v, `fr_${side}`) === 'narrowed',
  },
  {
    id: `fr_${side}_other`,
    label: `${SIDE_CAP[side]} frontal recess, other cause`,
    kind: 'text',
    showIf: (v) => str(v, `fr_${side}`) === 'narrowed',
  },
])

/* ---------- Report text ---------- */

function section(title: string, body: string) {
  return body ? `${title}\n${body}` : ''
}

/** "R x / L y", or '' if neither side entered. */
function rl(label: string, r: string, l: string) {
  if (!r && !l) return ''
  return `  ${label}: R ${r || 'not stated'} / L ${l || 'not stated'}`
}

function diseaseExtent(values: Values) {
  const lm = lundMackay(values)
  const rows = AREAS.map((area) => {
    const options = area.key === 'omc' ? OMC_SCORE : SINUS_SCORE
    const score = (side: Side) => {
      const value = str(values, lmId(area.key, side))
      if (!value) return ''
      const [n, ...word] = labelOf(options, value).split(' ')
      return `${n} (${word.join(' ')})`
    }
    return rl(area.label, score('r'), score('l'))
  })
  const character = list(values, 'character')
  return lines(
    ...rows,
    lm.complete && `  Lund-Mackay: ${lm.total}/24`,
    character.length > 0 && `  Character: ${labelsOf(CHARACTER, character).join(', ')}`,
  )
}

function septumLine(values: Values) {
  const dev = str(values, 'sept_dev')
  const spur = str(values, 'sept_spur')
  const contact = str(values, 'sept_contact')
  if (!dev && !spur) return ''
  const parts = [dev === 'none' ? 'no deviation' : dev ? `deviated to the ${SIDE_NAME[dev as Side]}` : '']
  if (spur) parts.push(spur === 'yes' ? 'spur' : 'no spur')
  if (contact) parts.push(contact === 'yes' ? 'contact' : 'no contact')
  return `  Septum: ${parts.filter(Boolean).join(', ')}`
}

function turbinateLine(values: Values) {
  const cb = str(values, 'mt_cb')
  const para = str(values, 'mt_para')
  if (!cb && !para) return ''
  const parts: string[] = []
  if (cb) parts.push(`concha bullosa: ${sidedText(cb)}`)
  if (para) parts.push(`paradoxical: ${sidedText(para)}`)
  return `  Middle turbinates: ${parts.join('; ')}`
}

function uncinateLine(values: Values) {
  const r = str(values, 'unc_att_r')
  const l = str(values, 'unc_att_l')
  const pneum = str(values, 'unc_pneum')
  if (!r && !l && !pneum) return ''
  const parts: string[] = []
  if (r || l) {
    const att = (value: string) => (value ? labelOf(UNCINATE_ATTACH, value).toLowerCase() : 'not stated')
    parts.push(`attachment R ${att(r)} / L ${att(l)}`)
  }
  if (pneum) parts.push(`pneumatized: ${sidedText(pneum)}`)
  return `  Uncinate: ${parts.join('; ')}`
}

function causes(values: Values, prefix: string, options: Option[]) {
  const chosen = labelsOf(options, list(values, `${prefix}_by`))
  const other = str(values, `${prefix}_other`)
  if (other) chosen.push(other)
  return chosen
}

function omcText(values: Values, side: Side) {
  const state = str(values, `omc_${side}`)
  if (state !== 'obstructed') return state
  const by = causes(values, `omc_${side}`, OMC_CAUSE)
  return by.length ? `obstructed by ${joinAnd(by)}` : 'obstructed'
}

function frontalText(values: Values, side: Side) {
  const state = str(values, `fr_${side}`)
  if (state !== 'narrowed') return state
  const by = causes(values, `fr_${side}`, FRONTAL_CAUSE)
  return by.length ? `narrowed by ${joinAnd(by)}` : 'narrowed'
}

function hallerLine(values: Values) {
  const haller = str(values, 'haller')
  if (!haller) return ''
  return `  Haller cells: ${haller === 'none' ? 'absent' : `present (${sidedText(haller)})`}`
}

function drainage(values: Values) {
  return lines(
    septumLine(values),
    turbinateLine(values),
    uncinateLine(values),
    rl('OMC', omcText(values, 'r'), omcText(values, 'l')),
    rl('Frontal recess', frontalText(values, 'r'), frontalText(values, 'l')),
    rl('Sphenoethmoidal recess', str(values, 'ser_r'), str(values, 'ser_l')),
    hallerLine(values),
  )
}

function depthText(values: Values, side: Side) {
  const depth = num(values, `olf_${side}`)
  if (depth === undefined) return `${side === 'r' ? 'R' : 'L'} not stated`
  return `${side === 'r' ? 'R' : 'L'} ${depth} mm (${kerosText(depth)})`
}

function closeBlock(values: Values) {
  const asym = str(values, 'olf_asym')
  const fovea = str(values, 'fovea_low')
  const sb = str(values, 'sb_dehisc')
  const sbWhere = str(values, 'sb_dehisc_where')
  const hasDepth = num(values, 'olf_r') !== undefined || num(values, 'olf_l') !== undefined
  const c = [
    hasDepth && `Olfactory fossa depth: ${depthText(values, 'r')} / ${depthText(values, 'l')}`,
    asym && `asymmetry: ${asym === 'yes' ? 'present' : 'none'}`,
    fovea && `low-lying or medially sloping fovea: ${sidedText(fovea)}`,
    sb && `skull-base dehiscence: ${sb === 'yes' ? (sbWhere ? `present (${sbWhere})` : 'present') : 'none'}`,
  ].filter(Boolean)

  const lamina = str(values, 'lamina')
  const laminaSide = str(values, 'lamina_side')
  const laminaWhere = str(values, 'lamina_where')
  const laminaOther = labelsOf(LAMINA_OTHER, list(values, 'lamina_other'))
  let l = ''
  if (lamina === 'intact') l = 'intact'
  if (lamina === 'dehiscent') {
    const detail = [laminaSide && sidedText(laminaSide), laminaWhere].filter(Boolean).join(', ')
    l = detail ? `dehiscent (${detail})` : 'dehiscent'
  }
  if (laminaOther.length) l = [l, laminaOther.join(', ')].filter(Boolean).join('; ')

  const onodi = str(values, 'onodi')
  const onodiSide = str(values, 'onodi_side')
  const onodiOptic = str(values, 'onodi_optic')
  let o = ''
  if (onodi === 'absent') o = 'absent'
  if (onodi === 'present') {
    o = onodiSide ? `present (${sidedText(onodiSide)})` : 'present'
    if (onodiOptic) o += `; optic nerve dehiscent: ${onodiOptic}`
  }

  const pneum = str(values, 'sph_pneum')
  const ica = str(values, 'sph_ica')
  const optic = str(values, 'sph_optic')
  const septum = str(values, 'sph_septum')
  const protrusion = labelsOf(PROTRUSION, list(values, 'sph_protrusion'))
  const s = [
    pneum && `Sphenoid pneumatization: ${pneum}`,
    ica && `ICA dehiscence: ${sidedText(ica)}`,
    optic && `optic nerve dehiscence: ${sidedText(optic)}`,
    septum && `septum attaching to carotid canal: ${sidedText(septum)}`,
    protrusion.length > 0 && `protrusion into the sinus: ${protrusion.join(', ')}`,
  ].filter(Boolean)

  const aea = (side: Side) => {
    const value = str(values, `aea_${side}`)
    return value ? labelOf(AEA, value).toLowerCase() : ''
  }

  return lines(
    c.length > 0 && `  C — ${capitalize(c.join('; '))}`,
    l && `  L — Lamina papyracea: ${l}`,
    o && `  O — Onodi cell: ${o}`,
    s.length > 0 && `  S — ${capitalize(s.join('; '))}`,
    (aea('r') || aea('l')) && `  E — Anterior ethmoidal artery: R ${aea('r') || 'not stated'} / L ${aea('l') || 'not stated'}`,
  )
}

/** Where a sided variant is present, as "on the right" / "bilaterally". */
function where(value: string) {
  if (value === 'b') return 'bilaterally'
  if (value === 'r' || value === 'l') return `on the ${SIDE_NAME[value]}`
  return ''
}

function sidedFromPair(r: boolean, l: boolean) {
  if (r && l) return 'b'
  if (r) return 'r'
  if (l) return 'l'
  return 'none'
}

function impressionDisease(values: Values) {
  const lm = lundMackay(values)
  const patterns = labelsOf(PATTERN, list(values, 'pattern'))
  const site = str(values, 'pattern_site')
  const muco = labelsOf(MUCO_EXT, list(values, 'muco_ext'))
  const parts: string[] = []
  if (patterns.length) {
    let text = capitalize(joinAnd(patterns))
    if (site) text += `, ${site}`
    if (muco.length) text += `, with ${joinAnd(muco)}`
    parts.push(`${text}.`)
  }
  if (lm.complete) parts.push(lm.total === 0 ? 'Paranasal sinuses clear (Lund-Mackay 0/24).' : `Lund-Mackay ${lm.total}/24.`)
  return parts.join(' ')
}

function impressionPathways(values: Values) {
  const blocked: string[] = []
  for (const side of SIDES) {
    if (str(values, `omc_${side}`) === 'obstructed') blocked.push(`${SIDE_NAME[side]} OMC ${omcText(values, side)}`)
    if (str(values, `fr_${side}`) === 'narrowed') blocked.push(`${SIDE_NAME[side]} frontal recess ${frontalText(values, side)}`)
    if (str(values, `ser_${side}`) === 'obstructed') blocked.push(`${SIDE_NAME[side]} sphenoethmoidal recess obstructed`)
  }
  if (blocked.length) return `${capitalize(blocked.join('; '))}.`
  const allEntered = SIDES.every((side) => str(values, `omc_${side}`) && str(values, `fr_${side}`) && str(values, `ser_${side}`))
  return allEntered ? 'Ostiomeatal complexes, frontal recesses and sphenoethmoidal recesses patent bilaterally.' : ''
}

function impressionRisk(values: Values) {
  const risks: string[] = []
  const clear: string[] = []

  const kr = keros(num(values, 'olf_r'))
  const kl = keros(num(values, 'olf_l'))
  const dr = num(values, 'olf_r')
  const dl = num(values, 'olf_l')
  let kerosSentence = ''
  if (dr !== undefined || dl !== undefined) {
    const rText = dr !== undefined ? (kr ? `type ${kr}` : 'between type I and II') : 'not stated'
    const lText = dl !== undefined ? (kl ? `type ${kl}` : 'between type I and II') : 'not stated'
    const text = rText === lText && dr !== undefined ? `Keros ${rText} bilaterally` : `Keros ${rText} on the right, ${lText} on the left`
    if (kr === 'III' || kl === 'III') risks.push(text)
    else kerosSentence = `${text}.`
  }
  if (str(values, 'olf_asym') === 'yes') risks.push('asymmetric olfactory fossa depth')
  const fovea = str(values, 'fovea_low')
  if (fovea && fovea !== 'none') risks.push(`low-lying or medially sloping fovea ethmoidalis ${where(fovea)}`)

  const sb = str(values, 'sb_dehisc')
  if (sb === 'yes') {
    const at = str(values, 'sb_dehisc_where')
    risks.push(`skull-base dehiscence${at ? ` (${at})` : ''}`)
  } else if (sb === 'no') clear.push('no skull-base dehiscence')

  const lamina = str(values, 'lamina')
  if (lamina === 'dehiscent') {
    const side = str(values, 'lamina_side')
    risks.push(`lamina papyracea dehiscence${side ? ` ${where(side)}` : ''}`)
  } else if (lamina === 'intact') clear.push('lamina papyracea intact')

  const onodi = str(values, 'onodi')
  if (onodi === 'present') {
    const side = str(values, 'onodi_side')
    const optic = str(values, 'onodi_optic') === 'yes' ? ' with dehiscent optic nerve' : ''
    risks.push(`Onodi cell${side ? ` ${where(side)}` : ''}${optic}`)
  } else if (onodi === 'absent') clear.push('no Onodi cell')

  const ica = str(values, 'sph_ica')
  const optic = str(values, 'sph_optic')
  if (ica && ica !== 'none') risks.push(`internal carotid artery dehiscence into the sphenoid ${where(ica)}`)
  if (optic && optic !== 'none') risks.push(`optic nerve dehiscence into the sphenoid ${where(optic)}`)
  if (ica === 'none' && optic === 'none') clear.push('no ICA or optic nerve dehiscence')
  else if (ica === 'none') clear.push('no ICA dehiscence')
  else if (optic === 'none') clear.push('no optic nerve dehiscence')

  const septum = str(values, 'sph_septum')
  if (septum && septum !== 'none') risks.push(`sphenoid intersinus septum attaching to the carotid canal ${where(septum)}`)
  else if (septum === 'none') clear.push('no sphenoid septum attaching to the carotid canal')

  const ar = str(values, 'aea_r')
  const al = str(values, 'aea_l')
  const below = sidedFromPair(ar === 'below', al === 'below')
  if (below !== 'none') risks.push(`anterior ethmoidal artery below the skull base ${where(below)}`)
  if (ar === 'in' && al === 'in') clear.push('anterior ethmoidal arteries within the skull base')
  else if (ar === 'in' || al === 'in') clear.push(`${ar === 'in' ? 'right' : 'left'} anterior ethmoidal artery within the skull base`)

  if (!risks.length && !clear.length && !kerosSentence) return ''
  const parts: string[] = []
  if (kerosSentence) parts.push(kerosSentence)
  if (risks.length) parts.push(`Surgical-risk anatomy: ${risks.join('; ')}.`)
  if (clear.length) parts.push(`${capitalize(clear.join('; '))}.`)
  return parts.join(' ')
}

function impressionRedFlag(values: Values) {
  const rf = str(values, 'rf')
  if (rf === 'none') return 'No red flag features for tumor.'
  if (rf !== 'yes') return ''
  const flags = labelsOf(RED_FLAGS, list(values, 'rf_list'))
  return `${flags.length ? `Red flag${flags.length > 1 ? 's' : ''} for tumor: ${joinAnd(flags)}` : 'Red flag features for tumor'}. MRI recommended.`
}

function build(values: Values) {
  const warnings: string[] = []
  const lm = lundMackay(values)

  // OMC scoring and OMC patency describe the same thing.
  for (const side of SIDES) {
    const score = str(values, lmId('omc', side))
    const state = str(values, `omc_${side}`)
    if (score === '2' && state === 'patent') warnings.push(`${SIDE_CAP[side]} OMC scored 2 (blocked) in Lund-Mackay but marked patent.`)
    if (score === '0' && state === 'obstructed') warnings.push(`${SIDE_CAP[side]} OMC scored 0 (open) in Lund-Mackay but marked obstructed.`)
  }

  // An OMC cause should match the variant recorded for that side.
  const causeChecks: { cause: string; field: string; name: string }[] = [
    { cause: 'cb', field: 'mt_cb', name: 'concha bullosa' },
    { cause: 'para', field: 'mt_para', name: 'paradoxical middle turbinate' },
    { cause: 'haller', field: 'haller', name: 'Haller cell' },
    { cause: 'uncinate', field: 'unc_pneum', name: 'uncinate pneumatization' },
  ]
  for (const side of SIDES) {
    if (str(values, `omc_${side}`) !== 'obstructed') continue
    const by = list(values, `omc_${side}_by`)
    for (const check of causeChecks) {
      const recorded = str(values, check.field)
      if (check.cause === 'uncinate') {
        if (by.includes('uncinate') && recorded === 'none') warnings.push(`${SIDE_CAP[side]} OMC blocked by the uncinate, but uncinate pneumatization is marked none; check whether it is lateralized.`)
        continue
      }
      if (by.includes(check.cause) && recorded && !sideHas(recorded, side)) {
        warnings.push(`${SIDE_CAP[side]} OMC blocked by ${check.name}, but no ${SIDE_NAME[side]} ${check.name} is recorded.`)
      }
    }
    if (by.includes('septum') && str(values, 'sept_dev') === 'none' && str(values, 'sept_spur') === 'no') {
      warnings.push(`${SIDE_CAP[side]} OMC blocked by the septum, but no septal deviation or spur is recorded.`)
    }
  }

  const kr = keros(num(values, 'olf_r'))
  const kl = keros(num(values, 'olf_l'))
  if (kr && kl && kr !== kl && str(values, 'olf_asym') === 'no') {
    warnings.push(`Keros type differs between sides (R ${kr}, L ${kl}) but olfactory fossa asymmetry is marked none.`)
  }
  for (const side of SIDES) {
    const depth = num(values, `olf_${side}`)
    if (depth !== undefined && !keros(depth)) {
      warnings.push(`${SIDE_CAP[side]} olfactory fossa depth ${depth} mm falls between the lesson's Keros I (3 mm or less) and II (4-7 mm) bands; state the type you assign.`)
    }
  }

  const uni = unilateralSide(values)
  if (uni && str(values, 'rf') === 'none') {
    warnings.push(`Disease is scored on the ${SIDE_NAME[uni]} only; unilateral disease is a red flag for tumor, but red flags are marked none.`)
  }
  if (uni && str(values, 'rf') === '') {
    warnings.push(`Disease is scored on the ${SIDE_NAME[uni]} only; unilateral disease is a red flag for tumor, but red flags are not stated.`)
  }
  if (uni && str(values, 'rf') === 'yes' && !list(values, 'rf_list').includes('unilateral')) {
    warnings.push(`Disease is scored on the ${SIDE_NAME[uni]} only, but unilateral disease is not ticked as a red flag.`)
  }
  if (list(values, 'pattern').includes('acute')) {
    warnings.push('Acute sinusitis: check for orbital cellulitis, subperiosteal abscess and intracranial extension. These are a different report.')
  }
  if (!lm.complete && lm.scored > 0) {
    warnings.push(`Lund-Mackay: ${lm.scored} of 12 areas scored; the total is written only when all are scored.`)
  }

  const prior = str(values, 'prior')
  const priorText = str(values, 'prior_text')
  const priorLine = prior === 'none' ? 'PRIOR SURGERY: none' : prior === 'yes' ? `PRIOR SURGERY: ${priorText || 'present'}` : ''
  const other = str(values, 'other')
  const technique = str(values, 'technique')

  const impression = [impressionDisease(values), impressionPathways(values), impressionRisk(values), impressionRedFlag(values)]
    .filter(Boolean)
    .map((item, index) => `  ${index + 1}. ${item}`)
    .join('\n')

  const blocks = [
    'CT SINUS WITHOUT CONTRAST — PRE-FESS',
    technique && `TECHNIQUE: ${technique}`,
    section('DISEASE EXTENT:', diseaseExtent(values)),
    section('DRAINAGE PATHWAYS:', drainage(values)),
    section('CRITICAL ANATOMY (CLOSE):', closeBlock(values)),
    priorLine,
    other && `OTHER: ${other}`,
    section('IMPRESSION:', impression),
  ].filter(Boolean)

  return { text: blocks.join('\n\n'), warnings }
}

/* ---------- Study ---------- */

const study: StudyDefinition = {
  slug: 'sinus-ct',
  name: 'CT sinus before FESS',
  lede: 'Disease burden, blocked drainage pathways, and the CLOSE danger-zone checklist the surgeon needs before endoscopic sinus surgery.',
  sourceNote: "Built around O'Brien et al. (Radiology 2016) and the Vaid et al. pre-FESS checklist (Clin Radiol 2011).",
  references,
  referencesNote: 'Citations checked against PubMed in September 2026. The Lund-Mackay and Keros papers have no DOI.',
  report: {
    initial: {
      technique: TECHNIQUE,
      olf_asym: 'no',
      fovea_low: 'none',
      sb_dehisc: 'no',
      lamina: 'intact',
      onodi: 'absent',
      sph_ica: 'none',
      sph_optic: 'none',
      sph_septum: 'none',
      aea_r: 'in',
      aea_l: 'in',
    },
    steps: [
      {
        id: 'setup',
        title: 'Set up before you look at anything',
        learn: 'set-up',
        teach: (
          <ul className="plain-list">
            <li><strong>Bone window, coronal first.</strong> Coronals mirror what the endoscopist sees. Then axial, then sagittal.</li>
            <li><strong>Don't skip sagittal.</strong> It's the plane that shows the frontal recess and the slope of the skull base.</li>
            <li><strong>Scroll front to back</strong> (frontal sinus → ethmoids → sphenoid), because that is the surgeon's path.</li>
            <li><strong>Check soft-tissue window</strong> once, for hyperdense material (fungus, blood) and for anything outside the sinuses.</li>
          </ul>
        ),
        fields: [
          { id: 'technique', label: 'Technique', kind: 'text', multiline: true },
        ],
      },
      {
        id: 'burden',
        title: 'Part A. Disease burden (Lund-Mackay)',
        learn: 'step-by-step',
        teach: (
          <>
            <p>Score each of six areas per side: maxillary, anterior ethmoid, posterior ethmoid, frontal, sphenoid, and ostiomeatal complex (OMC). Sinuses: 0 = clear, 1 = partial opacification, 2 = complete. OMC: 0 = open, 2 = blocked. Maximum 24 (Lund & Mackay, Rhinology 1993).</p>
            <p>You don't have to put the number in every report, but scoring forces you to look at every sinus, which is the point. Also note the <em>character</em> of the opacification: mucosal thickening vs. fluid level vs. polyp vs. hyperdense material.</p>
          </>
        ),
        fields: [
          ...lmFields,
          { id: 'character', label: 'Character', kind: 'multi', options: CHARACTER },
        ],
        derive: (values) => {
          const lm = lundMackay(values)
          const out: Derived[] = []
          if (lm.scored > 0) {
            out.push({
              label: 'Lund-Mackay',
              value: lm.complete ? `${lm.total}/24` : `${lm.total} so far (${lm.scored} of 12 areas)`,
            })
          }
          const uni = unilateralSide(values)
          if (uni) out.push({ label: 'Distribution', value: `Unilateral (${SIDE_NAME[uni]}): red flag`, tone: 'warn' })
          return out
        },
      },
      {
        id: 'pathways',
        title: "Part B. Drainage pathways (what's blocked and why)",
        learn: 'step-by-step',
        teach: (
          <>
            <p>There are three "doors" the surgeon opens. For each: is it open, and if not, what closes it?</p>
            <ol className="plain-list">
              <li><strong>Ostiomeatal complex</strong> (drains maxillary, anterior ethmoid, frontal). On coronal, find the uncinate process, the ethmoid bulla, the infundibulum between them, and the middle meatus.</li>
              <li><strong>Frontal recess</strong> (drains frontal sinus). Best seen on sagittal. Name the cells crowding it: agger nasi, supra agger cells, suprabulla cells, and frontal cells (IFAC, <Cite doi={WORMALD}>Wormald et al. 2016</Cite>).</li>
              <li><strong>Sphenoethmoidal recess</strong> (drains posterior ethmoid and sphenoid). Axial and sagittal.</li>
            </ol>
            <p>Also comment on the <strong>uncinate's superior attachment</strong>: to the lamina papyracea (most common; the frontal sinus then drains medial to it), to the skull base, or to the middle turbinate. It changes where the surgeon cuts.</p>
          </>
        ),
        fields: [
          { id: 'sept_dev', label: 'Septal deviation', kind: 'choice', options: SEPTUM },
          { id: 'sept_spur', label: 'Septal spur', kind: 'choice', options: PRESENT },
          {
            id: 'sept_contact',
            label: 'Contact (pushing the middle turbinate laterally)',
            kind: 'choice',
            options: PRESENT,
            showIf: (v) => (str(v, 'sept_dev') !== '' && str(v, 'sept_dev') !== 'none') || str(v, 'sept_spur') === 'yes',
          },
          { id: 'mt_cb', label: 'Concha bullosa (air in the middle turbinate)', kind: 'choice', options: SIDED },
          { id: 'mt_para', label: 'Paradoxical middle turbinate', kind: 'choice', options: SIDED },
          { id: 'unc_att_r', label: 'Uncinate superior attachment, right', kind: 'choice', options: UNCINATE_ATTACH },
          { id: 'unc_att_l', label: 'Uncinate superior attachment, left', kind: 'choice', options: UNCINATE_ATTACH },
          { id: 'unc_pneum', label: 'Uncinate pneumatized', kind: 'choice', options: SIDED },
          ...omcFields,
          ...frontalFields,
          { id: 'ser_r', label: 'Sphenoethmoidal recess, right', kind: 'choice', options: PATENT },
          { id: 'ser_l', label: 'Sphenoethmoidal recess, left', kind: 'choice', options: PATENT },
          { id: 'haller', label: 'Haller (infraorbital ethmoid) cells', kind: 'choice', options: SIDED },
        ],
        derive: (values) => {
          const out: Derived[] = []
          for (const side of SIDES) {
            if (str(values, `unc_att_${side}`) === 'lamina') {
              out.push({ label: `${SIDE_CAP[side]} frontal sinus`, value: 'Drains medial to the uncinate' })
            }
          }
          const blocked = SIDES.flatMap((side) => [
            str(values, `omc_${side}`) === 'obstructed' && `${side.toUpperCase()} OMC`,
            str(values, `fr_${side}`) === 'narrowed' && `${side.toUpperCase()} frontal recess`,
            str(values, `ser_${side}`) === 'obstructed' && `${side.toUpperCase()} SER`,
          ]).filter((item): item is string => Boolean(item))
          if (blocked.length) out.push({ label: 'Blocked', value: blocked.join(', '), tone: 'warn' })
          return out
        },
      },
      {
        id: 'close',
        title: 'Part C. Danger zones (CLOSE)',
        learn: 'step-by-step',
        teach: (
          <>
            <p>CLOSE is the mnemonic from <Cite doi={OBRIEN}>O'Brien et al. (Radiology 2016)</Cite>. State <strong>"none"</strong> explicitly for each CLOSE item rather than staying silent (the surgeon can't tell silence from oversight).</p>
            <ul className="plain-list">
              <li><strong>C.</strong> Measure the olfactory fossa depth on coronal, from the fovea ethmoidalis down to the cribriform plate. Keros type I is ≤3 mm, type II is 4–7 mm, and type III is {'>'}7 mm. Deeper fossa = higher CSF-leak risk. Also report asymmetry, a low-lying or medially sloping fovea, and any dehiscence.</li>
              <li><strong>L.</strong> Trace the medial orbital wall on every coronal slice. A dehiscent lamina is where the surgeon enters the orbit.</li>
              <li><strong>O.</strong> A posterior ethmoid cell above or lateral to the sphenoid: the optic nerve runs in its wall. Look for a horizontal septum above the sphenoid on coronal, confirm on sagittal. Say whether the optic nerve is dehiscent into it.</li>
              <li><strong>S.</strong> Grade pneumatization and check the walls for ICA and optic nerve dehiscence. Note intersinus septa that attach to the carotid canal (<Cite doi={VAID}>Vaid et al.</Cite>).</li>
              <li><strong>E.</strong> Is the anterior ethmoidal artery in the skull base (safe) or hanging free in a mesentery below the roof (at risk: cutting it causes orbital hematoma)?</li>
            </ul>
            <p>Bonus items surgeons value: the extent of prior surgery (which walls are already gone: middle turbinate, uncinate, bulla).</p>
          </>
        ),
        fields: [
          { id: 'olf_r', label: 'Olfactory fossa depth, right', kind: 'number', unit: 'mm', min: 0, step: 0.5, required: true, help: 'Keros I ≤3 mm, II 4–7 mm, III >7 mm' },
          { id: 'olf_l', label: 'Olfactory fossa depth, left', kind: 'number', unit: 'mm', min: 0, step: 0.5, required: true },
          { id: 'olf_asym', label: 'Asymmetry between sides', kind: 'choice', options: PRESENT, required: true },
          { id: 'fovea_low', label: 'Low-lying or medially sloping fovea', kind: 'choice', options: SIDED, required: true },
          { id: 'sb_dehisc', label: 'Skull-base dehiscence', kind: 'choice', options: PRESENT, required: true },
          { id: 'sb_dehisc_where', label: 'Skull-base dehiscence, location', kind: 'text', showIf: (v) => str(v, 'sb_dehisc') === 'yes' },
          { id: 'lamina', label: 'Lamina papyracea', kind: 'choice', options: LAMINA, required: true },
          { id: 'lamina_side', label: 'Dehiscent lamina, side', kind: 'choice', options: LAMINA_SIDE, showIf: (v) => str(v, 'lamina') === 'dehiscent', required: true },
          { id: 'lamina_where', label: 'Dehiscent lamina, slice', kind: 'text', placeholder: 'e.g. series 3 image 42', showIf: (v) => str(v, 'lamina') === 'dehiscent' },
          { id: 'lamina_other', label: 'Other medial orbital wall findings', kind: 'multi', options: LAMINA_OTHER },
          { id: 'onodi', label: 'Onodi cell', kind: 'choice', options: ONODI, required: true },
          { id: 'onodi_side', label: 'Onodi cell, side', kind: 'choice', options: LAMINA_SIDE, showIf: (v) => str(v, 'onodi') === 'present', required: true },
          { id: 'onodi_optic', label: 'Optic nerve dehiscent into the Onodi cell', kind: 'choice', options: YES_NO, showIf: (v) => str(v, 'onodi') === 'present', required: true },
          { id: 'sph_pneum', label: 'Sphenoid pneumatization', kind: 'choice', options: PNEUMATIZATION, required: true },
          { id: 'sph_ica', label: 'ICA dehiscence', kind: 'choice', options: SIDED, required: true },
          { id: 'sph_optic', label: 'Optic nerve dehiscence (sphenoid)', kind: 'choice', options: SIDED, required: true },
          { id: 'sph_septum', label: 'Septum attaching to carotid canal', kind: 'choice', options: SIDED, required: true },
          { id: 'sph_protrusion', label: 'Protrusion into the sphenoid', kind: 'multi', options: PROTRUSION },
          { id: 'aea_r', label: 'Anterior ethmoidal artery, right', kind: 'choice', options: AEA, required: true },
          { id: 'aea_l', label: 'Anterior ethmoidal artery, left', kind: 'choice', options: AEA, required: true },
          { id: 'prior', label: 'Prior surgery', kind: 'choice', options: PRIOR },
          { id: 'prior_text', label: 'Prior surgery, which walls are already gone', kind: 'text', placeholder: 'e.g. middle turbinate, uncinate, bulla', showIf: (v) => str(v, 'prior') === 'yes' },
        ],
        derive: (values) => {
          const out: Derived[] = []
          for (const side of SIDES) {
            const depth = num(values, `olf_${side}`)
            if (depth === undefined) continue
            const type = keros(depth)
            out.push({
              label: `${SIDE_CAP[side]} Keros`,
              value: type ? `Type ${type}` : 'Between I (≤3 mm) and II (4–7 mm)',
              tone: type === 'III' || !type ? 'warn' : 'neutral',
            })
          }
          const below = sidedFromPair(str(values, 'aea_r') === 'below', str(values, 'aea_l') === 'below')
          if (below !== 'none') out.push({ label: 'Anterior ethmoidal artery', value: `At risk ${where(below)}`, tone: 'warn' })
          if (str(values, 'onodi') === 'present' && str(values, 'onodi_optic') === 'yes') {
            out.push({ label: 'Onodi cell', value: 'Dehiscent optic nerve', tone: 'warn' })
          }
          return out
        },
      },
      {
        id: 'pathology',
        title: "Pathologies you'll meet, and the words to use",
        learn: 'pathologies',
        teach: (
          <ul className="plain-list">
            <li><strong>Allergic fungal sinusitis</strong>: multiple sinuses filled with <strong>hyperdense</strong> material on soft-tissue window, expanded sinuses, thinned walls. Flag it: the surgeon will plan wider clearance and expect eosinophilic mucin.</li>
            <li><strong>Nasal polyposis</strong> remodels bone (smooth, not destroyed).</li>
            <li><strong>Mucocele</strong>: note orbital or intracranial extension.</li>
            <li><strong>Red flags for tumor</strong>: <em>unilateral</em> disease, bone <em>destruction</em> (not remodeling), extension outside the sinus, invasion of the pterygopalatine fossa or orbit. Recommend MRI.</li>
            <li><strong>Odontogenic sinusitis</strong>: unilateral maxillary disease with a periapical lucency or oroantral communication. Say so; the treatment is different.</li>
          </ul>
        ),
        fields: [
          { id: 'pattern', label: 'Pattern', kind: 'multi', options: PATTERN },
          { id: 'pattern_site', label: 'Site', kind: 'text', placeholder: 'e.g. left maxillary', showIf: (v) => list(v, 'pattern').length > 0 },
          { id: 'muco_ext', label: 'Mucocele extension', kind: 'multi', options: MUCO_EXT, showIf: (v) => list(v, 'pattern').includes('muco') },
          { id: 'rf', label: 'Red flags for tumor', kind: 'choice', options: RED_FLAG },
          { id: 'rf_list', label: 'Red flags present', kind: 'multi', options: RED_FLAGS, showIf: (v) => str(v, 'rf') === 'yes' },
        ],
        derive: (values) => {
          const out: Derived[] = []
          const patterns = list(values, 'pattern')
          if (str(values, 'rf') === 'yes') out.push({ label: 'Red flag', value: 'Recommend MRI', tone: 'warn' })
          if (patterns.includes('afs')) out.push({ label: 'Allergic fungal', value: 'Flag it for the surgeon', tone: 'warn' })
          if (patterns.includes('odont')) out.push({ label: 'Odontogenic', value: 'Say so: treatment differs', tone: 'warn' })
          if (patterns.includes('acute')) out.push({ label: 'Acute', value: 'Different report', tone: 'warn' })
          return out
        },
      },
      {
        id: 'other',
        title: 'Other findings',
        learn: 'report-contents',
        teach: (
          <p>The Vaid et al. checklist ends with the bony margins of the sinuses and the brain, orbit, and nasopharynx (<Cite doi={VAID}>Clin Radiol 2011</Cite>). Put the danger anatomy in the impression, not buried in findings.</p>
        ),
        fields: [
          { id: 'other', label: 'Other: orbits, brain, nasopharynx, dental disease', kind: 'text', multiline: true },
        ],
      },
    ],
    build,
  },
  learn: [
    {
      id: 'overview',
      title: 'Overview',
      body: <p>This is one of the most protocol-friendly reads in radiology, because the surgeon wants a fixed set of answers every time.</p>,
    },
    {
      id: 'surgeon-question',
      title: '1. What the surgeon is actually asking you',
      body: (
        <>
          <p>Think of the pre-FESS CT as answering three questions, in this order:</p>
          <ol className="plain-list">
            <li><strong>Where is the disease and how much?</strong> (so they know what to operate on)</li>
            <li><strong>Which drainage pathways are blocked, and what's blocking them?</strong> (so they know what to open)</li>
            <li><strong>Where are the dangerous walls?</strong> (so they don't go through the skull base, the orbit, or an artery)</li>
          </ol>
          <p>Question 3 is where reports most often fail. Preoperative CT gives radiologists the chance to identify anatomic variants that predispose patients to major surgical complications, but these critical variants are not consistently evaluated or documented on preoperative reports. The fix is the <strong>CLOSE</strong> mnemonic from O'Brien et al. (Radiology 2016): Cribriform plate, Lamina papyracea, Onodi cell, Sphenoid sinus pneumatization, and (anterior) Ethmoidal artery. Missing these can lead to CSF leaks, orbital injury, or hemorrhage from the anterior ethmoidal or internal carotid arteries.</p>
        </>
      ),
    },
    {
      id: 'set-up',
      title: '2. Set up before you look at anything',
      body: (
        <ul className="plain-list">
          <li><strong>Bone window, coronal first.</strong> Coronals mirror what the endoscopist sees. Then axial, then sagittal.</li>
          <li><strong>Don't skip sagittal.</strong> It's the plane that shows the frontal recess and the slope of the skull base.</li>
          <li><strong>Scroll front to back</strong> (frontal sinus → ethmoids → sphenoid), because that is the surgeon's path.</li>
          <li><strong>Check soft-tissue window</strong> once, for hyperdense material (fungus, blood) and for anything outside the sinuses.</li>
        </ul>
      ),
    },
    {
      id: 'step-by-step',
      title: '3. Step-by-step read',
      body: (
        <>
          <div className="lesson-step">
            <h4>Part A. Disease burden (Lund-Mackay)</h4>
            <p>Score each of six areas per side: maxillary, anterior ethmoid, posterior ethmoid, frontal, sphenoid, and ostiomeatal complex (OMC).</p>
            <ul className="plain-list">
              <li>Sinuses: 0 = clear, 1 = partial opacification, 2 = complete.</li>
              <li>OMC: 0 = open, 2 = blocked.</li>
              <li>Maximum 24 (Lund & Mackay, Rhinology 1993).</li>
            </ul>
            <p>You don't have to put the number in every report, but scoring forces you to look at every sinus, which is the point. Also note the <em>character</em> of the opacification: mucosal thickening vs. fluid level vs. polyp vs. hyperdense material (see section 4).</p>
          </div>

          <div className="lesson-step">
            <h4>Part B. Drainage pathways (what's blocked and why)</h4>
            <p>There are three "doors" the surgeon opens. For each: is it open, and if not, what closes it?</p>
            <p><strong>1. Ostiomeatal complex</strong> (drains maxillary, anterior ethmoid, frontal). On coronal, find the uncinate process, the ethmoid bulla, the infundibulum between them, and the middle meatus. Common blockers:</p>
            <ul className="plain-list">
              <li>Septal deviation or spur pushing the middle turbinate laterally</li>
              <li>Concha bullosa (air in the middle turbinate)</li>
              <li>Paradoxical middle turbinate (curves the wrong way)</li>
              <li>Haller (infraorbital ethmoid) cell narrowing the infundibulum from above</li>
              <li>Large ethmoid bulla</li>
              <li>Uncinate pneumatization or lateralized uncinate</li>
            </ul>
            <p><strong>2. Frontal recess</strong> (drains frontal sinus). Best seen on sagittal. Name the cells crowding it: agger nasi, supra agger cells, suprabulla cells, and frontal cells that push up into the sinus. The modern naming system is the International Frontal Sinus Anatomy Classification (IFAC, Wormald et al. 2016). Variants here are frequent, and suprabulla and supra agger cells are both common.</p>
            <p><strong>3. Sphenoethmoidal recess</strong> (drains posterior ethmoid and sphenoid). Axial and sagittal. Look for opacification of the recess and the sphenoid ostium.</p>
            <p>Also comment on the <strong>uncinate's superior attachment</strong>: to the lamina papyracea (most common; the frontal sinus then drains medial to it), to the skull base, or to the middle turbinate. It changes where the surgeon cuts.</p>
          </div>

          <div className="lesson-step">
            <h4>Part C. Danger zones (CLOSE)</h4>
            <p><strong>C — Cribriform plate / skull base.</strong> Measure the depth of the olfactory fossa on coronal: from the level of the fovea ethmoidalis (ethmoid roof) down to the cribriform plate. Keros type I is ≤3 mm, type II is 4–7 mm, and type III is {'>'}7 mm. Deeper fossa = taller, thinner lateral lamella = higher CSF-leak risk. Also report <strong>asymmetry</strong> between sides (a surgeon operating with one side's depth in mind can breach the lower side), a <strong>low-lying or medially sloping fovea</strong>, and any <strong>dehiscence</strong> of the skull base.</p>
            <p><strong>L — Lamina papyracea.</strong> Trace the medial orbital wall on every coronal slice. Look for dehiscence, medial bowing, or prior fracture. Also note orbital fat herniating into the ethmoid. A dehiscent lamina is where the surgeon enters the orbit.</p>
            <p><strong>O — Onodi cell (sphenoethmoidal cell).</strong> A posterior ethmoid cell that sits above or lateral to the sphenoid. Why it matters: the optic nerve runs in its wall, so the surgeon expecting sphenoid finds nerve instead. Best seen on coronal (look for a horizontal septum above the sphenoid) and confirmed on sagittal. Say whether the optic nerve is dehiscent into it.</p>
            <p><strong>S — Sphenoid sinus pneumatization.</strong> Grade it (sellar, presellar, conchal) and, more importantly, check the walls for bulges and dehiscence of the <strong>internal carotid artery</strong> and <strong>optic nerve</strong>. Note <strong>intersinus septa that attach to the carotid canal</strong>: if the surgeon breaks that septum, the carotid can tear. Vaid et al. illustrate exactly this, including a hyperpneumatized sphenoid with an endosinal foramen rotundum and bilateral optic nerve dehiscence. Also check the vidian canal and foramen rotundum for protrusion into the sinus.</p>
            <p><strong>E — Anterior ethmoidal artery.</strong> On coronal, find the notch in the medial orbital wall just behind the frontal recess/anterior ethmoid; the artery crosses the ethmoid roof there. Key question: is it <strong>in the skull base</strong> (safe) or <strong>hanging free in a mesentery below the roof</strong> (at risk: cutting it causes orbital hematoma, and the vessel can retract into the orbit). The gap between the artery and the roof usually goes with a well-pneumatized supraorbital region.</p>
            <div className="lesson-key">
              <p><strong>Bonus items surgeons value:</strong> the extent of prior surgery (which walls are already gone: middle turbinate, uncinate, bulla), and a general description of osteitis or bony thickening, which makes surgery harder and suggests chronic disease.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'pathologies',
      title: "4. Pathologies you'll meet, and the words to use",
      body: (
        <ul className="plain-list">
          <li><strong>Chronic rhinosinusitis</strong>: mucosal thickening, often with osteitis. The classic pair is complete maxillary opacification with central increased attenuation from inspissated secretions and/or fungal colonization, plus thickened sclerotic sinus walls from chronic inflammation.</li>
          <li><strong>Nasal polyposis</strong>: bilateral polypoid soft tissue filling the nasal cavity and ethmoids; widened infundibula and thinned/remodeled bone (smooth, not destroyed).</li>
          <li><strong>Allergic fungal sinusitis</strong>: multiple sinuses filled with <strong>hyperdense</strong> material on soft-tissue window, expanded sinuses, thinned walls; often young, atopic patients. Flag it: the surgeon will plan wider clearance and expect eosinophilic mucin.</li>
          <li><strong>Fungal ball (mycetoma)</strong>: single sinus (usually maxillary), hyperdense with tiny calcifications, thickened wall.</li>
          <li><strong>Mucocele</strong>: completely opacified, expanded sinus with remodeled walls; frontal and ethmoid most common. Note orbital or intracranial extension.</li>
          <li><strong>Silent sinus syndrome</strong>: small, opacified maxillary sinus with inward-bowed walls and enophthalmos.</li>
          <li><strong>Acute sinusitis complications</strong>: air-fluid levels are the acute sign; check for orbital cellulitis, subperiosteal abscess, and intracranial extension. These are a different report.</li>
          <li><strong>Red flags for tumor</strong>: <em>unilateral</em> disease, bone <em>destruction</em> (not remodeling), extension outside the sinus, invasion of the pterygopalatine fossa or orbit. Recommend MRI.</li>
          <li><strong>Odontogenic sinusitis</strong>: unilateral maxillary disease with a periapical lucency or oroantral communication. Say so; the treatment is different.</li>
        </ul>
      ),
    },
    {
      id: 'report-contents',
      title: '5. What the report should contain',
      body: (
        <>
          <p>Vaid et al. (Clin Radiol 2011) proposed a surgical checklist that maps neatly onto a template: nasal septum; middle turbinate and uncinate process; OMC and maxillary sinus; frontal sinus drainage pathway and frontal sinus; anterior ethmoid sinuses; basal lamella; posterior ethmoid and sphenoid sinuses; anterior skull base; anterior ethmoidal artery; lamina papyracea; bony margins of the sinuses; brain, orbit, and nasopharynx.</p>
          <CopyBlock label="Report template" text={reportTemplate} />
          <div className="lesson-key">
            <p>Two habits that make the report useful: state <strong>"none"</strong> explicitly for each CLOSE item rather than staying silent (the surgeon can't tell silence from oversight), and put the danger anatomy in the impression, not buried in findings. Implementing the CLOSE checklist substantially improved the quality and consistency of CT sinus reporting in the quality-improvement study below.</p>
          </div>
        </>
      ),
    },
  ],
  quiz: [
    {
      id: 'keros-type',
      question: 'The olfactory fossa measures 8 mm deep on coronal. Which Keros type is it?',
      options: ['Type I', 'Type II', 'Type III', 'Keros only applies to asymmetric fossae'],
      answer: 2,
      explanation: <p>Keros type I is ≤3 mm, type II is 4–7 mm, and type III is {'>'}7 mm. Deeper fossa = taller, thinner lateral lamella = higher CSF-leak risk (<Cite doi={OBRIEN}>O'Brien et al.</Cite>).</p>,
    },
    {
      id: 'lund-mackay-omc',
      question: 'How is the ostiomeatal complex scored in Lund-Mackay?',
      options: ['0, 1 or 2, like the sinuses', '0 if open, 2 if blocked', 'It is not scored; only the six sinuses are', '1 if open, 2 if blocked'],
      answer: 1,
      explanation: <p>Sinuses score 0 = clear, 1 = partial opacification, 2 = complete; the OMC scores 0 = open or 2 = blocked. Six areas per side give a maximum of 24 (Lund & Mackay, Rhinology 1993).</p>,
    },
    {
      id: 'onodi',
      question: 'Why does an Onodi cell matter to the surgeon?',
      options: [
        'It drains the frontal sinus, so it must be opened first',
        'The anterior ethmoidal artery hangs in its roof',
        'It narrows the infundibulum from above',
        'The optic nerve runs in its wall, so the surgeon expecting sphenoid finds nerve instead',
      ],
      answer: 3,
      explanation: <p>An Onodi cell is a posterior ethmoid cell above or lateral to the sphenoid; the optic nerve runs in its wall. Look for a horizontal septum above the sphenoid on coronal, confirm on sagittal, and say whether the optic nerve is dehiscent into it (<Cite doi={OBRIEN}>O'Brien et al.</Cite>). Narrowing the infundibulum from above is the Haller cell.</p>,
    },
    {
      id: 'aea',
      question: 'The anterior ethmoidal artery hangs free in a mesentery below the ethmoid roof. What is the risk?',
      options: [
        'None: that position is the safe one',
        'Cutting it causes orbital hematoma, and the vessel can retract into the orbit',
        'CSF leak through the cribriform plate',
        'Carotid tear',
      ],
      answer: 1,
      explanation: <p>In the skull base the artery is safe; hanging free in a mesentery below the roof it is at risk: cutting it causes orbital hematoma, and the vessel can retract into the orbit. The gap usually goes with a well-pneumatized supraorbital region (<Cite doi={OBRIEN}>O'Brien et al.</Cite>).</p>,
    },
    {
      id: 'sphenoid-septum',
      question: 'Which sphenoid finding warns that breaking a septum could tear the carotid?',
      options: ['Conchal pneumatization', 'An endosinal foramen rotundum', 'An intersinus septum attaching to the carotid canal', 'Sphenoethmoidal recess opacification'],
      answer: 2,
      explanation: <p>Note intersinus septa that attach to the carotid canal: if the surgeon breaks that septum, the carotid can tear (<Cite doi={VAID}>Vaid et al.</Cite>).</p>,
    },
    {
      id: 'red-flag',
      question: 'Which appearance is a red flag for tumor, prompting a recommendation for MRI?',
      options: [
        'Bilateral polypoid soft tissue with widened infundibula and smooth, thinned bone',
        'Unilateral disease with bone destruction',
        'Multiple expanded sinuses filled with hyperdense material',
        'A small opacified maxillary sinus with inward-bowed walls',
      ],
      answer: 1,
      explanation: <p>Red flags for tumor are unilateral disease, bone destruction (not remodeling), extension outside the sinus, and invasion of the pterygopalatine fossa or orbit: recommend MRI. Polyposis remodels bone smoothly; hyperdense expanded sinuses suggest allergic fungal sinusitis; the small inward-bowed sinus is silent sinus syndrome.</p>,
    },
    {
      id: 'afs',
      question: 'A young atopic patient has multiple expanded sinuses filled with hyperdense material on soft-tissue window, with thinned walls. What should the report call it?',
      options: ['Allergic fungal sinusitis', 'Fungal ball (mycetoma)', 'Mucocele', 'Acute sinusitis'],
      answer: 0,
      explanation: <p>That is allergic fungal sinusitis. Flag it: the surgeon will plan wider clearance and expect eosinophilic mucin. A fungal ball is a single sinus (usually maxillary), hyperdense with tiny calcifications and a thickened wall.</p>,
    },
    {
      id: 'state-none',
      question: 'Why state "none" explicitly for each CLOSE item?',
      options: [
        'Billing requires every item to be coded',
        'It shortens the report',
        'The Lund-Mackay score is invalid without it',
        "The surgeon can't tell silence from oversight",
      ],
      answer: 3,
      explanation: <p>State "none" explicitly for each CLOSE item rather than staying silent (the surgeon can't tell silence from oversight), and put the danger anatomy in the impression. Implementing the CLOSE checklist substantially improved the quality and consistency of CT sinus reporting (<Cite doi={LEE}>Lee et al., Cureus 2025</Cite>).</p>,
    },
  ],
}

export function SinusCtStudyPage() {
  return <StudyPage study={study} />
}
