import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Option, StudyDefinition, Values } from '../study/types'

/*
 * O-RADS MRI scoring follows this lesson's own step-by-step algorithm and score table.
 * `calculateOrads` in src/logic/orads.ts is not reused: its MRI branch grades enhancement as
 * none/moderate/marked and uses diffusion restriction, with no time-intensity curve types,
 * no T2-dark/DWI-dark rule and no 30-40 s fallback, so it does not match the lesson.
 */

const references: LessonReference[] = [
  { citation: 'ACR O-RADS MRI documents (free PDFs): the Risk Score table and the Governing Concepts, May 2024 revision.' },
  { citation: 'Sadowski EA et al. Radiology 2022;303:35–47. The committee\'s illustrated guide. Read this first.', doi: '10.1148/radiol.204371' },
  { citation: 'Reinhold C et al. J Am Coll Radiol 2021;18:713–729. The lexicon. Read once, then keep for definitions.', doi: '10.1016/j.jacr.2020.12.022' },
  { citation: 'Thomassin-Naggara I et al. JAMA Netw Open 2020;3(1):e1919896. The validation study (EURAD).', doi: '10.1001/jamanetworkopen.2019.19896' },
  { citation: 'Thomassin-Naggara I et al. Eur Radiol 2021;31:9588–9599. The misclassified cases.', doi: '10.1007/s00330-021-08054-x' },
  { citation: 'Wengert GJ et al. Radiology 2022;303:566–575. Why you should draw the curve.', doi: '10.1148/radiol.210342' },
  { citation: 'Tong A et al. RadioGraphics 2026;46(9):e250197. Protocol.', doi: '10.1148/rg.250197' },
  { citation: 'Kılıçkap G. Diagn Interv Radiol 2025;31:171–179. Meta-analysis.', doi: '10.4274/dir.2024.242784' },
  { citation: 'Corwin MT et al. Radiology 2014;271:126–132. The T2 dark spot sign for endometrioma.', doi: '10.1148/radiol.13131394' },
  { citation: 'Sebastià C et al. Radiología 2022;64:542–551. From theory to practice, case-based.', doi: '10.1016/j.rxeng.2022.07.003' },
]

const reportTemplate = `Clinical: age, menopausal status (state it explicitly; the score depends on it),
  CA-125 if known, why the ultrasound was indeterminate.
Technique: sequences; whether DCE was performed and the myometrium was in the field.
  If no DCE, say the score is based on 30–40 s post-contrast imaging.

Findings, for each adnexal lesion separately:
  1. Side, origin (ovarian / tubal / paraovarian / uncertain) and why.
  2. Size in three dimensions.
  3. Architecture: unilocular, multilocular, solid, mixed.
  4. Fluid type(s) and whether there is fat.
  5. Wall and septa: thin/thick, smooth/irregular, enhancing or not.
  6. Enhancing solid tissue: present or absent. If present: type (papillary
     projection / nodule / irregular septum / larger solid), size, T2 and DWI
     signal, curve type vs myometrium (or enhancement vs myometrium at 30–40 s).
  7. Contralateral ovary.
Also: uterus and endometrium (thickened endometrium + ovarian mass hints at a
  hormone-producing tumor), free fluid (simple vs complex, amount), peritoneum
  and omentum, pelvic and retroperitoneal nodes, hydronephrosis, bone marrow on T1.

Impression:
  Lesion by lesion: most likely diagnosis if you have one, then
    "O-RADS MRI [score] — [risk category]".
  If several lesions, state which one drives management.
  Management line: score 2 → no imaging follow-up (or routine gynecology);
    score 3 → gynecology referral, follow-up or surgery at their discretion;
    score 4 or 5 → gynecologic oncology referral.`

/* Options */

const contrastOptions: Option[] = [
  { value: 'dce', label: 'DCE performed' },
  { value: 'single', label: 'Single 30–40 s series' },
  { value: 'none', label: 'No contrast' },
]
const yesNo: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const qualityOptions: Option[] = [
  { value: 'complete', label: 'Complete' },
  { value: 'incomplete', label: 'Incomplete' },
]
const menoOptions: Option[] = [
  { value: 'pre', label: 'Premenopausal' },
  { value: 'post', label: 'Postmenopausal' },
]
const lesionOptions: Option[] = [
  { value: 'lesion', label: 'Adnexal lesion' },
  { value: 'physio', label: 'Follicle / hemorrhagic cyst / corpus luteum' },
  { value: 'none', label: 'No lesion (normal ovaries)' },
]
const physioOptions: Option[] = [
  { value: 'follicle', label: 'Follicle' },
  { value: 'hemorrhagic', label: 'Hemorrhagic cyst' },
  { value: 'cl', label: 'Corpus luteum' },
]
const sideOptions: Option[] = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
]
const originOptions: Option[] = [
  { value: 'ovarian', label: 'Ovarian' },
  { value: 'tubal', label: 'Tubal' },
  { value: 'paraovarian', label: 'Paraovarian' },
  { value: 'uncertain', label: 'Uncertain' },
]
const originSignOptions: Option[] = [
  { value: 'claw', label: 'Sits inside the ovary, with a beak or claw of ovarian tissue around it' },
  { value: 'vein', label: 'Ovarian vein traced to the mass' },
  { value: 'separate', label: 'Ipsilateral ovary seen separately and normal' },
  { value: 'tubular', label: 'Tubular, folded structure' },
  { value: 'bridging', label: 'Bridging vessel to the uterus' },
  { value: 'conforms', label: 'Conforms to the space around a normal ovary' },
]
const peritoneumOptions: Option[] = [
  { value: 'none', label: 'No peritoneal disease' },
  { value: 'implants', label: 'Peritoneal nodules, thickened enhancing peritoneum or omental implants' },
]
const freeFluidOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'simple', label: 'Simple' },
  { value: 'complex', label: 'Complex' },
]
const amountOptions: Option[] = [
  { value: 'small', label: 'Small' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'large', label: 'Large' },
]
const architectureOptions: Option[] = [
  { value: 'unilocular', label: 'Unilocular' },
  { value: 'multilocular', label: 'Multilocular' },
  { value: 'solid', label: 'Solid' },
  { value: 'mixed', label: 'Mixed' },
]
const fluidOptions: Option[] = [
  { value: 'simple', label: 'Simple' },
  { value: 'hemorrhagic', label: 'Hemorrhagic / proteinaceous' },
  { value: 'endometriotic', label: 'Endometriotic' },
  { value: 'mucinous', label: 'Mucinous' },
]
const presentAbsent: Option[] = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
]
const clueOptions: Option[] = [
  { value: 'shading', label: 'T2 shading' },
  { value: 'darkSpots', label: 'T2 dark spots (old clot)' },
  { value: 'chemShift', label: 'Chemical-shift artifact at the edges' },
  { value: 'stainedGlass', label: 'Different signal in each locule ("stained glass")' },
]
const thicknessOptions: Option[] = [
  { value: 'thin', label: 'Thin' },
  { value: 'thick', label: 'Thick' },
]
const contourOptions: Option[] = [
  { value: 'smooth', label: 'Smooth' },
  { value: 'irregular', label: 'Irregular' },
]
const enhancingOptions: Option[] = [
  { value: 'yes', label: 'Enhancing' },
  { value: 'no', label: 'Not enhancing' },
]
const septaOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'irregular', label: 'Irregular' },
]
const solidTypeOptions: Option[] = [
  { value: 'papillary', label: 'Papillary projection' },
  { value: 'nodule', label: 'Mural nodule' },
  { value: 'septum', label: 'Irregular septum or irregular wall thickening' },
  { value: 'larger', label: 'Larger solid component' },
]
const dermoidOptions: Option[] = [
  { value: 'minimal', label: 'Septations or minimal Rokitansky nodule enhancement' },
  { value: 'large', label: 'A large amount of enhancing soft tissue' },
]
const signalOptions: Option[] = [
  { value: 'dark', label: 'Homogeneously dark' },
  { value: 'notDark', label: 'Intermediate or bright' },
]
const curveOptions: Option[] = [
  { value: '1', label: 'Type 1 (low risk)' },
  { value: '2', label: 'Type 2 (intermediate)' },
  { value: '3', label: 'Type 3 (high risk)' },
]
const singleOptions: Option[] = [
  { value: 'le', label: '≤ myometrium' },
  { value: 'gt', label: '> myometrium' },
]
const endometriumOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'thickened', label: 'Thickened' },
]
const hydroOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'bilateral', label: 'Bilateral' },
]

/* Rules from the lesson */

const riskCategory: Record<number, string> = {
  0: 'Incomplete',
  1: 'Normal ovaries',
  2: 'Almost certainly benign',
  3: 'Low risk',
  4: 'Intermediate',
  5: 'High risk',
}
const ppv: Record<number, string> = { 2: '<0.5%', 3: '~5%', 4: '~50%', 5: '~90%' }
const management: Record<number, string> = {
  2: 'No imaging follow-up (or routine gynecology).',
  3: 'Gynecology referral, follow-up or surgery at their discretion.',
  4: 'Gynecologic oncology referral.',
  5: 'Gynecologic oncology referral.',
}

type Score = { score: number | null; why: string }

function hasLesion(v: Values) {
  return str(v, 'lesion') !== 'none'
}
function maxDimension(v: Values) {
  const dims = ['size1', 'size2', 'size3'].map((id) => num(v, id)).filter((n): n is number => n !== undefined)
  return dims.length ? Math.max(...dims) : undefined
}
function isFat(v: Values) {
  return str(v, 'fat') === 'present'
}
function solidPresent(v: Values) {
  return str(v, 'solid') === 'present'
}
/** Solid tissue that goes through the T2/DWI and curve steps (fat-containing lesions have their own line). */
function solidToGrade(v: Values) {
  return hasLesion(v) && solidPresent(v) && !isFat(v)
}
function darkDark(v: Values) {
  return str(v, 't2') === 'dark' && str(v, 'dwi') === 'dark'
}

/** Step 2: "Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5"; table: "any peritoneal/omental implants". */
function peritonealScore(v: Values): Score | null {
  return str(v, 'peritoneum') === 'implants' ? { score: 5, why: 'peritoneal or omental implants' } : null
}

/** Score 1: no lesion, or follicle / hemorrhagic cyst / corpus luteum ≤3 cm in a premenopausal woman. */
function normalScore(v: Values): Score | null {
  const lesion = str(v, 'lesion')
  if (lesion === 'none') return { score: 1, why: 'no lesion' }
  if (lesion !== 'physio' || str(v, 'meno') !== 'pre') return null
  const size = maxDimension(v)
  if (size === undefined) return { score: null, why: 'enter the size: score 1 applies up to 3 cm' }
  return size <= 3 ? { score: 1, why: 'physiologic finding ≤3 cm in a premenopausal woman' } : null
}

/** Step 4 (2024 revision) and the table's fat-containing lines. */
function fatScore(v: Values): Score | null {
  if (!isFat(v)) return null
  const solid = str(v, 'solid')
  if (solid === 'absent') return { score: 2, why: 'fat-containing lesion without enhancing solid tissue' }
  if (solid !== 'present') return null
  const tissue = str(v, 'dermoidTissue')
  if (tissue === 'minimal') return { score: 2, why: 'characteristic mature teratoma; septations or minimal Rokitansky nodule enhancement do not upgrade to 4' }
  if (tissue === 'large') return { score: 4, why: 'fat-containing lesion with a large amount of enhancing soft tissue' }
  return { score: null, why: 'say how much enhancing soft tissue the fat-containing lesion has' }
}

/** Steps 5 and 6. */
function solidScore(v: Values): Score | null {
  if (!solidToGrade(v)) return null
  const t2 = str(v, 't2')
  const dwi = str(v, 'dwi')
  if (darkDark(v)) return { score: 2, why: 'solid tissue dark on T2 and dark on high-b DWI' }
  if (!t2 || !dwi) return { score: null, why: 'grade the solid tissue on T2 and DWI' }
  const contrast = str(v, 'contrast')
  if (contrast === 'dce') {
    const curve = str(v, 'curve')
    if (!curve) return { score: null, why: 'choose the curve type against the myometrium' }
    return { score: Number(curve) + 2, why: `solid tissue with a type ${curve} curve` }
  }
  if (contrast === 'single') {
    const single = str(v, 'single')
    if (single === 'le') return { score: 4, why: 'solid tissue enhancing ≤ myometrium at 30–40 s (no DCE)' }
    if (single === 'gt') return { score: 5, why: 'solid tissue enhancing > myometrium at 30–40 s (no DCE)' }
    return { score: null, why: 'compare the solid tissue with the myometrium at 30–40 s' }
  }
  if (contrast === 'none') return { score: null, why: 'enhancement of the solid tissue cannot be judged without contrast' }
  return { score: null, why: 'state the contrast technique' }
}

/** Step 7: tubes and paraovarian cysts. */
function tubeScore(v: Values): Score | null {
  if (str(v, 'solid') !== 'absent') return null
  const origin = str(v, 'origin')
  const fluids = list(v, 'fluids')
  const thick = str(v, 'wallThick')
  if (origin === 'tubal') {
    if (thick === 'thick' || fluids.some((f) => f !== 'simple')) return { score: 3, why: 'hydrosalpinx with non-simple fluid or a thick wall' }
    if (fluids.length && thick === 'thin' && str(v, 'wallContour') === 'smooth' && str(v, 'tubeFolds') === 'present') {
      return { score: 2, why: 'dilated tube with simple fluid, thin smooth wall and folds, no solid tissue' }
    }
    return { score: null, why: 'simple hydrosalpinx needs simple fluid, a thin smooth wall and folds' }
  }
  if (origin === 'paraovarian') {
    if (thick === 'thin') return { score: 2, why: 'paraovarian cyst with a thin wall and no solid tissue' }
    return { score: null, why: 'the lesson scores a paraovarian cyst only when it has a thin wall' }
  }
  return null
}

/** Score table lines for lesions without enhancing solid tissue. */
function cysticScore(v: Values): Score | null {
  if (str(v, 'solid') !== 'absent' || isFat(v)) return null
  const arch = str(v, 'architecture')
  const fluids = list(v, 'fluids')
  if (arch === 'unilocular') {
    const enh = str(v, 'wallEnh')
    if (enh === 'no') return { score: 2, why: 'unilocular cyst with no wall enhancement' }
    if (enh === 'yes' && str(v, 'wallContour') === 'smooth') {
      if (!fluids.length) return { score: null, why: 'name the fluid type' }
      if (fluids.some((f) => f === 'hemorrhagic' || f === 'mucinous')) {
        return { score: 3, why: 'unilocular proteinaceous/hemorrhagic/mucinous cyst with a smooth enhancing wall' }
      }
      return { score: 2, why: 'unilocular simple or endometriotic cyst with a smooth enhancing wall' }
    }
    return { score: null, why: 'describe the wall (smooth or irregular, enhancing or not)' }
  }
  if (arch === 'multilocular') {
    if (str(v, 'septa') === 'smooth') return { score: 3, why: 'multilocular cyst without fat, with smooth septa' }
    return { score: null, why: 'the score table covers a multilocular cyst with smooth septa' }
  }
  return null
}

function oradsMri(v: Values): Score {
  if (str(v, 'quality') === 'incomplete') return { score: 0, why: 'incomplete study (missing key sequences, motion, lesion cut off)' }
  const peritoneal = peritonealScore(v)
  if (peritoneal) return peritoneal
  if (!str(v, 'lesion')) return { score: null, why: 'say whether there is an adnexal lesion' }
  const normal = normalScore(v)
  if (normal) return normal
  if (!str(v, 'meno')) return { score: null, why: 'state the menopausal status' }
  if (!str(v, 'solid')) return { score: null, why: 'say whether enhancing solid tissue is present' }
  const byRule = fatScore(v) ?? solidScore(v) ?? tubeScore(v) ?? cysticScore(v)
  return byRule ?? { score: null, why: 'this combination is not covered by the rules in the lesson; review the architecture and solid tissue' }
}

function scoreChip(result: Score | null): Derived[] {
  if (!result) return []
  if (result.score === null) return [{ label: 'O-RADS MRI', value: `Not yet: ${result.why}`, tone: 'neutral' }]
  return [{ label: 'O-RADS MRI', value: `${result.score}: ${result.why}`, tone: result.score >= 4 ? 'warn' : 'good' }]
}

function label(options: Option[], v: Values, id: string) {
  const value = str(v, id)
  return value ? optionLabel({ options }, value) : ''
}
function labels(options: Option[], v: Values, id: string) {
  return list(v, id).map((value) => optionLabel({ options }, value))
}
function lower(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1)
}
function upper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
/** Free text without trailing full stops, so the report does not end a sentence twice. */
function txt(v: Values, id: string) {
  return str(v, id).replace(/[.\s]+$/, '')
}
/** An ovarian mass, as opposed to a physiologic finding or a tubal/paraovarian lesion. */
function ovarianMass(v: Values) {
  return str(v, 'lesion') === 'lesion' && !['tubal', 'paraovarian'].includes(str(v, 'origin'))
}

/* Report */

function build(v: Values) {
  const warnings: string[] = []
  const lesion = hasLesion(v)
  const result = oradsMri(v)

  const age = num(v, 'age')
  const meno = str(v, 'meno')
  const patient = [age !== undefined && `${age}-year-old`, meno && lower(label(menoOptions, v, 'meno'))].filter(Boolean).join(' ')
  const clinical = [
    patient && upper(`${patient}${age !== undefined ? ' woman' : ''}`),
    str(v, 'ca125') && `CA-125 ${txt(v, 'ca125')}`,
    str(v, 'indication') && `Ultrasound indeterminate: ${txt(v, 'indication')}`,
  ].filter(Boolean)

  const contrast = str(v, 'contrast')
  const technique = [
    upper(txt(v, 'sequences')),
    contrast === 'dce' && `DCE performed${str(v, 'myometrium') === 'yes' ? ', myometrium in the field of view' : str(v, 'myometrium') === 'no' ? ', myometrium not in the field of view' : ''}`,
    contrast === 'single' && 'No DCE; the score is based on 30–40 s post-contrast imaging',
    contrast === 'none' && 'No intravenous contrast',
    str(v, 'quality') === 'incomplete' && `Incomplete study${str(v, 'qualityNote') ? `: ${txt(v, 'qualityNote')}` : ''}`,
  ].filter(Boolean)

  const side = str(v, 'side')
  const origin = str(v, 'origin')
  const signs = labels(originSignOptions, v, 'originSigns').map(lower)
  const why = [...signs, txt(v, 'originNote')].filter(Boolean).join('; ')
  const dims = ['size1', 'size2', 'size3'].map((id) => num(v, id)).filter((n): n is number => n !== undefined)
  const fluids = labels(fluidOptions, v, 'fluids').map(lower)
  const clues = labels(clueOptions, v, 'clues')
  const fat = str(v, 'fat')

  const wallParts = [label(thicknessOptions, v, 'wallThick'), label(contourOptions, v, 'wallContour'), label(enhancingOptions, v, 'wallEnh')]
    .filter(Boolean)
    .map(lower)
  const septa = str(v, 'architecture') !== 'unilocular' ? str(v, 'septa') : ''

  let solidLine = ''
  const solid = str(v, 'solid')
  if (solid === 'absent') solidLine = 'Enhancing solid tissue: absent.'
  if (solid === 'present') {
    const types = labels(solidTypeOptions, v, 'solidTypes').map(lower)
    const size = num(v, 'solidSize')
    const parts = [
      types.join(', '),
      size !== undefined && `${size} mm`,
      isFat(v) && str(v, 'dermoidTissue') && lower(label(dermoidOptions, v, 'dermoidTissue')),
      solidToGrade(v) && str(v, 't2') && `T2 ${lower(label(signalOptions, v, 't2'))}`,
      solidToGrade(v) && str(v, 'dwi') && `high-b DWI ${lower(label(signalOptions, v, 'dwi'))}`,
      solidToGrade(v) && !darkDark(v) && contrast === 'dce' && str(v, 'curve') && `type ${str(v, 'curve')} time-intensity curve vs myometrium`,
      solidToGrade(v) && !darkDark(v) && contrast === 'single' && str(v, 'single') && `enhancement ${label(singleOptions, v, 'single')} at 30–40 s`,
    ].filter(Boolean)
    solidLine = `Enhancing solid tissue: present${parts.length ? ` (${parts.join('; ')})` : ''}.`
  }

  const originWord = origin && origin !== 'uncertain' ? lower(label(originOptions, v, 'origin')) : 'adnexal'
  const physio = str(v, 'lesion') === 'physio' ? str(v, 'physio') : ''
  const lesionName = upper(
    [
      side && lower(label(sideOptions, v, 'side')),
      physio ? `${!origin || origin === 'uncertain' ? 'ovarian' : originWord} ${lower(label(physioOptions, v, 'physio'))}` : `${originWord} lesion`,
    ]
      .filter(Boolean)
      .join(' '),
  )

  const findingItems = lines(
        (side || origin) && `  1. Side and origin: ${[side && lower(label(sideOptions, v, 'side')), origin && `${lower(label(originOptions, v, 'origin'))}${origin === 'uncertain' ? ' origin' : ''}`].filter(Boolean).join(', ')}${why ? ` (${why})` : ''}.`,
        dims.length > 0 && `  2. Size: ${dims.join(' x ')} cm.`,
        str(v, 'architecture') && `  3. Architecture: ${lower(label(architectureOptions, v, 'architecture'))}.`,
        (fluids.length > 0 || fat) && `  4. ${[fluids.length > 0 && `Fluid: ${fluids.join(', ')}`, clues.length > 0 && clues.join(', '), fat === 'present' && 'fat present', fat === 'absent' && 'no fat'].filter((part): part is string => Boolean(part)).map(upper).join('. ')}.`,
        (wallParts.length > 0 || septa) && `  5. ${[wallParts.length > 0 && `Wall ${wallParts.join(', ')}`, septa && `septa: ${lower(label(septaOptions, v, 'septa'))}`].filter(Boolean).join('; ').replace(/^./, (c) => c.toUpperCase())}.`,
        solidLine && `  6. ${solidLine}`,
        origin === 'tubal' && str(v, 'tubeFolds') && `  Tubal folds: ${lower(label(presentAbsent, v, 'tubeFolds'))}.`,
        str(v, 'contra') && `  7. Contralateral ovary: ${txt(v, 'contra')}.`,
  )
  // Name the lesion only once the finding is chosen or something about it is entered.
  const namedLesion = lesion && (findingItems !== '' || str(v, 'lesion') !== '')
  const findings = !lesion ? 'No adnexal lesion. Normal ovaries.' : !namedLesion ? '' : findingItems ? lines(`${lesionName}:`, findingItems) : `${lesionName}.`

  const freeFluid = str(v, 'freeFluid')
  const fluidAmount = freeFluid !== 'none' ? str(v, 'fluidAmount') : ''
  const endometrium = str(v, 'endometrium')
  const hydro = str(v, 'hydro')
  const also = lines(
    (str(v, 'uterus') || endometrium) && `Uterus and endometrium: ${[txt(v, 'uterus'), endometrium && `endometrium ${lower(label(endometriumOptions, v, 'endometrium'))}`].filter(Boolean).join('; ')}.`,
    freeFluid && `Free fluid: ${freeFluid === 'none' ? 'none' : `${fluidAmount ? `${fluidAmount}, ` : ''}${freeFluid}`}.`,
    str(v, 'peritoneum') && `Peritoneum and omentum: ${str(v, 'peritoneum') === 'none' ? 'no peritoneal or omental disease' : `peritoneal/omental implants${str(v, 'peritonealSites') ? ` (${txt(v, 'peritonealSites')})` : ''}`}.`,
    str(v, 'nodes') && `Pelvic and retroperitoneal nodes: ${txt(v, 'nodes')}.`,
    hydro && `Hydronephrosis: ${hydro === 'none' ? 'none' : lower(label(hydroOptions, v, 'hydro'))}.`,
    str(v, 'marrow') && `Bone marrow on T1: ${txt(v, 'marrow')}.`,
    str(v, 'other') && str(v, 'other'),
  )

  const diagnosis = txt(v, 'diagnosis')
  const scoreText =
    result.score === null ? 'O-RADS MRI [score not derived]' : `O-RADS MRI ${result.score} — ${lower(riskCategory[result.score])}`
  const lesionCount = num(v, 'lesionCount') ?? 0
  const impression = lines(
    `${namedLesion ? `${lesionName}: ` : ''}${diagnosis ? `most likely ${diagnosis}. ` : ''}${scoreText}.`,
    lesionCount > 1 && str(v, 'otherLesions') && `Other lesions: ${str(v, 'otherLesions')}`,
    lesionCount > 1 && str(v, 'drives') && `Lesion driving management: ${txt(v, 'drives')}.`,
    endometrium === 'thickened' && ovarianMass(v) && 'Thickened endometrium with an ovarian mass, which hints at a hormone-producing tumor.',
    result.score !== null && management[result.score] && `Management: ${lower(management[result.score])}`,
  )

  const text = lines(
    clinical.length > 0 && `Clinical: ${clinical.join('. ')}.`,
    technique.length > 0 && `Technique: ${technique.join('. ')}.`,
    '',
    (findings || also) && 'Findings:',
    findings,
    also,
    '',
    'Impression:',
    impression,
  )
    // lines() drops the empty spacer strings, so add the blank lines back before each heading.
    .replace(/\nFindings:/, '\n\nFindings:')
    .replace(/\nImpression:/, '\n\nImpression:')

  if (result.score === null) warnings.push(`O-RADS MRI score not derived: ${result.why}.`)
  if (contrast === 'none' && str(v, 'quality') !== 'incomplete') warnings.push('No contrast: the minimum protocol includes DCE, or a single 30–40 s post-contrast series as the fallback. Consider O-RADS MRI 0 (incomplete).')
  if (contrast === 'dce' && str(v, 'myometrium') === 'no') warnings.push('DCE without the myometrium in the field: the myometrium is the reference tissue for the curve.')
  if (str(v, 'lesion') === 'physio' && meno === 'post') warnings.push('Score 1 (follicle, hemorrhagic cyst or corpus luteum ≤3 cm) applies to a premenopausal woman only.')
  if (str(v, 'lesion') === 'physio' && meno === 'pre' && (maxDimension(v) ?? 0) > 3) warnings.push('Score 1 applies only up to 3 cm, so this is scored as a lesion (a follicle or simple cyst above 3 cm in a premenopausal woman is score 2, not score 1).')
  const signList = list(v, 'originSigns')
  if (lesion && signList.includes('separate') && (signList.includes('claw') || signList.includes('vein') || origin === 'ovarian')) {
    warnings.push('Ipsilateral ovary marked separate and normal (probably not ovarian), but the origin or another sign says ovarian.')
  }
  if (lesion && solid === 'absent' && (str(v, 'wallContour') === 'irregular' || septa === 'irregular') && !isFat(v)) {
    warnings.push('Irregular wall or septum marked, but solid tissue absent: an enhancing irregular septation or irregular wall thickening is solid tissue in the lexicon.')
  }
  if (lesion && solid === 'absent' && str(v, 'architecture') === 'solid' && !isFat(v)) warnings.push('Architecture marked solid but enhancing solid tissue marked absent.')
  if (lesionCount > 1 && !str(v, 'drives')) warnings.push('Several lesions: state which one drives management.')
  if (lesionCount > 1) warnings.push('Each lesion is characterized separately: this form scores one lesion; add the others under Step 8.')

  return { text, warnings }
}

/* Learn sections: the lesson, verbatim */

const learn = [
  {
    id: 'where-it-fits',
    title: '1. Where O-RADS MRI fits',
    body: (
      <>
        <p>O-RADS MRI is a problem-solving tool. Its job is to take a mass that ultrasound couldn't sort out and put it into one of five risk buckets so the gynecologist knows who should operate (if anyone).</p>
        <p>The system assumes an average-risk patient with no acute symptoms, and clinical management directed by the treating physician supersedes imaging-based recommendations. So it is <em>not</em> for: torsion, tubo-ovarian abscess, ruptured ectopic, or a patient already known to have ovarian cancer (that's staging, a different job).</p>
        <p>The score grew out of the French "AdnexMR" score of 2013 (<Cite doi="10.1148/radiol.13121161">Thomassin-Naggara, Radiology 2013</Cite>). The validating paper is the EURAD study: <Cite doi="10.1001/jamanetworkopen.2019.19896">Thomassin-Naggara et al., JAMA Network Open 2020;3(1):e1919896</Cite>, a prospective multicenter study of roughly 1,300 women across 15 European centers. That paper is the reason the risk numbers in the table below exist.</p>
      </>
    ),
  },
  {
    id: 'scanner',
    title: '2. What you need on the scanner',
    body: (
      <>
        <p>You cannot score properly without the right sequences. The three "money" sequences are T2, T1 with and without fat saturation, and dynamic contrast (DCE). Deviating from the recommended minimum protocol may change the diagnostic performance of the score. The minimum protocol:</p>
        <ul className="plain-list">
          <li><strong>T2 without fat sat</strong> in at least two planes (sagittal and axial; add coronal if the ovary is hard to find). This is your anatomy map.</li>
          <li><strong>T1 without fat sat</strong>: shows blood, protein and fat as bright.</li>
          <li><strong>T1 with fat sat</strong>: tells fat apart from blood. Fat goes dark; blood stays bright.</li>
          <li><strong>DWI with a high b value (b800–1000)</strong> plus ADC.</li>
          <li><strong>DCE (dynamic contrast)</strong>: a 3D fat-sat T1 repeated every few seconds for about 4 minutes after injection, with the uterus in the field of view. You need the myometrium as your reference tissue. If you can't do DCE, a single post-contrast series at 30–40 seconds is the fallback, but the score changes slightly (explained below).</li>
          <li>Field of view large enough to cover the whole lesion and the lower peritoneum.</li>
        </ul>
        <p>A 2026 RadioGraphics article walks through the protocol in detail: <Cite doi="10.1148/rg.250197">Tong A, Kim N, Patel-Lippmann K, Nougaret S, et al. Optimizing the MRI pelvis protocol for O-RADS MRI. RadioGraphics 2026;46(9):e250197</Cite>. Worth reading once with your MR technologist.</p>
      </>
    ),
  },
  {
    id: 'algorithm',
    title: '3. How to read the study: the step-by-step algorithm',
    body: (
      <>
        <p>Think of it as a funnel. Each step either assigns a score and stops, or sends you to the next step.</p>

        <div className="lesson-step">
          <h4>Step 0. Before you look at the lesion, note two things</h4>
          <p>Categorize the patient as pre- or postmenopausal (≥1 year of amenorrhea). Then count the lesions: with multiple or bilateral lesions, each lesion is characterized separately, and management follows the lesion with the highest score.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 1. Is it actually ovarian/adnexal?</h4>
          <p>This is where most beginner errors happen. Find both ovaries on T2 (look for the follicles). Then ask:</p>
          <ul className="plain-list">
            <li>Does the mass sit <em>inside</em> the ovary, stretching it (the "beak" or "claw" of ovarian tissue around it)? → ovarian.</li>
            <li>Is the ovary seen separately and normal? → probably not ovarian. Think fibroid (look for a bridging vessel to the uterus), hydrosalpinx (tubular, folded), paraovarian cyst, peritoneal inclusion cyst (conforms to the space around a normal ovary), or a bowel/nerve/lymph node lesion.</li>
            <li>Trace the ovarian vein from the mass upward. If it leads to the mass, that's a strong sign the mass is ovarian.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Is there peritoneal disease?</h4>
          <p>Look at the pouch of Douglas, paracolic gutters, omentum, liver surface, and diaphragm on your widest images. Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5, regardless of what the ovarian mass itself looks like. Don't be fooled by a small amount of simple free fluid in a premenopausal woman; that's normal.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. What is the lesion made of?</h4>
          <p>Decide whether it's cystic, solid, or mixed. For the cystic part, name the fluid:</p>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Fluid type</th><th>T1</th><th>T1 fat-sat</th><th>T2</th><th>Clues</th></tr></thead>
              <tbody>
                <tr><td>Simple</td><td>dark</td><td>dark</td><td>very bright</td><td>follicle, serous cystadenoma</td></tr>
                <tr><td>Hemorrhagic / proteinaceous</td><td>bright</td><td>stays bright</td><td>variable</td><td>hemorrhagic cyst, mucinous</td></tr>
                <tr><td>Endometriotic</td><td>very bright</td><td>stays bright</td><td>dark or "shading"</td><td>T2 shading, T2 dark spots (old clot)</td></tr>
                <tr><td>Lipid (fat)</td><td>bright</td><td><strong>goes dark</strong></td><td>bright</td><td>dermoid; chemical-shift artifact at edges</td></tr>
                <tr><td>Mucinous</td><td>slightly bright</td><td>stays bright</td><td>slightly less bright than water</td><td>often multilocular with different signal in each locule ("stained glass")</td></tr>
              </tbody>
            </table>
          </div>
          <p>Fat is your most important find here. Fluid, fatty, or endometriotic content places the lesion in O-RADS 2 as long as there is no wall enhancement or solid tissue.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Is there enhancing solid tissue? (The single most important question.)</h4>
          <p>"Solid tissue" has a specific meaning in the lexicon (<Cite doi="10.1016/j.jacr.2020.12.022">Reinhold et al., J Am Coll Radiol 2021;18:713–729</Cite>). It means an <em>enhancing</em> component that is one of: a papillary projection (a branching frond growing from a wall or septum), a mural nodule, an irregular septation or irregular wall thickening, or a larger solid component.</p>
          <p>It does <strong>not</strong> mean: smooth, thin wall or smooth septa (even if they enhance); clot or debris (bright on T1, does not enhance; use subtraction images to prove it); fat or a Rokitansky nodule in a dermoid. The 2024 revision is explicit: characteristic mature teratomas may contain septations or minimal enhancement of Rokitansky nodules, and these do not upgrade the lesion to O-RADS 4.</p>
          <p>If there is <strong>no</strong> enhancing solid tissue, you score by fluid and wall (see the score table): most of these land in 2 or 3.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. If there IS solid tissue, look at it on T2 and DWI first</h4>
          <p>Solid tissue that is dark on T2 and dark on high-b DWI is O-RADS 2. This is the fibroma/fibrothecoma/cystadenofibroma/Brenner rule. Dense fibrous tissue has few cells and little water, so it is dark on both. "Dark" means homogeneously as dark as skeletal muscle. If any part is intermediate or bright on either sequence, this rule does not apply; move on.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Everything else with solid tissue: the enhancement curve</h4>
          <p>Draw a region of interest on the most enhancing part of the solid tissue and one on the outer myometrium. Compare the two curves:</p>
          <ul className="plain-list">
            <li><strong>Type 1 (low risk)</strong>: slow, gradual rise, never as steep as the myometrium, no plateau → <strong>O-RADS 3</strong></li>
            <li><strong>Type 2 (intermediate)</strong>: rises faster than type 1 but still less steeply than the myometrium, then flattens (plateau) → <strong>O-RADS 4</strong></li>
            <li><strong>Type 3 (high risk)</strong>: rises as fast as or faster than the myometrium, then plateaus or washes out → <strong>O-RADS 5</strong></li>
          </ul>
          <p>If you only have a single post-contrast series at 30–40 s (no DCE): solid tissue enhancing ≤ myometrium is O-RADS 4; enhancing more than the myometrium is O-RADS 5. Without DCE you lose the ability to call a curve "low risk" (score 3), which is why DCE matters.</p>
          <p>A practical point from the EURAD group: drawing the curve is more accurate than eyeballing it (<Cite doi="10.1148/radiol.210342">Wengert et al., Radiology 2022;303:566–575</Cite>). Take the extra minute.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Tubes and paraovarian lesions have their own lines</h4>
          <p>A dilated tube with simple fluid, thin smooth wall and folds, no solid tissue → 2. Non-simple fluid or a thick wall → 3. A paraovarian cyst with a thin wall and no solid tissue → 2.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Assign the score, and remember rule 5 of the governing concepts</h4>
          <p>Some lesions can be confidently diagnosed on MRI regardless of the score; in those cases the final diagnosis can be reported (e.g., dysgerminoma, granulosa cell tumor, lymphoma, peritoneal pseudocyst). The score is a risk estimate, not a substitute for a diagnosis you can actually make.</p>
        </div>
      </>
    ),
  },
  {
    id: 'score-table',
    title: '4. The score table',
    body: (
      <>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Score</th><th>Risk category</th><th>PPV for malignancy</th><th>What lands here</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>Incomplete</td><td>—</td><td>Missing key sequences, motion, lesion cut off</td></tr>
              <tr><td>1</td><td>Normal ovaries</td><td>—</td><td>No lesion; follicle ≤3 cm, hemorrhagic cyst ≤3 cm, or corpus luteum ≤3 cm in a premenopausal woman</td></tr>
              <tr><td>2</td><td>Almost certainly benign</td><td>{'<'}0.5%</td><td>Unilocular cyst of any fluid with no wall enhancement; unilocular simple or endometriotic cyst with smooth enhancing wall; fat-containing lesion without enhancing solid tissue; T2-dark/DWI-dark solid; simple hydrosalpinx; paraovarian cyst</td></tr>
              <tr><td>3</td><td>Low risk</td><td>~5%</td><td>Unilocular proteinaceous/hemorrhagic/mucinous cyst with smooth enhancing wall; multilocular cyst (no fat) with smooth septa; solid tissue with type 1 curve; hydrosalpinx with non-simple fluid or thick wall</td></tr>
              <tr><td>4</td><td>Intermediate</td><td>~50%</td><td>Solid tissue with type 2 curve; solid tissue enhancing ≤ myometrium at 30–40 s if no DCE; fat-containing lesion with a lot of enhancing soft tissue</td></tr>
              <tr><td>5</td><td>High risk</td><td>~90%</td><td>Solid tissue with type 3 curve; solid tissue enhancing {'>'} myometrium at 30–40 s; any peritoneal/omental implants</td></tr>
            </tbody>
          </table>
        </div>
        <p>The primary source for this table is the ACR document (O-RADS MRI Risk Stratification and Management System) and the committee guide: <Cite doi="10.1148/radiol.204371">Sadowski EA, Thomassin-Naggara I, Rockall A, et al. Radiology 2022;303(1):35–47</Cite>. A 2025 meta-analysis (<Cite doi="10.4274/dir.2024.242784">Kılıçkap G, Diagn Interv Radiol 2025;31(3):171–179</Cite>) pooled the published studies of its diagnostic performance.</p>
      </>
    ),
  },
  {
    id: 'pathologies',
    title: '5. The pathologies, organized by where they land',
    body: (
      <>
        <p>The "one-look" signature for each, then the trap.</p>

        <h4>Score 1–2: the things you should be able to dismiss</h4>
        <ul className="plain-list">
          <li><em>Follicle / simple cyst.</em> Water signal, thin wall, no enhancement of anything inside. Trap: size. Above 3 cm in a premenopausal woman it becomes a score 2 lesion, not score 1; same look, different label.</li>
          <li><em>Corpus luteum.</em> Thick, crenulated, strongly enhancing wall, often T1-bright inside. Trap: it looks worrying on a single post-contrast image. The crenulated wall pattern and a premenopausal patient give it away.</li>
          <li><em>Hemorrhagic cyst.</em> T1 bright, stays bright on fat-sat, no enhancing solid. Trap: retracting clot mimics a mural nodule. Subtraction images settle it; clot does not enhance.</li>
          <li><em>Endometrioma.</em> Very bright T1, dark or "shaded" T2, often multiple, often kissing ovaries stuck behind the uterus. The "T2 dark spot" sign (tiny black foci of old clot within the cyst) is very specific for endometrioma over hemorrhagic cyst (<Cite doi="10.1148/radiol.13131394">Corwin et al., Radiology 2014</Cite>). Trap 1: in pregnancy, decidualized endometriomas grow T2-bright, vascular mural nodules that enhance; they look like score 4 but the nodules match the endometrium's signal and the patient is pregnant. Trap 2: any <em>true</em> enhancing solid tissue in an endometrioma, especially in a woman over 40, has to be scored honestly; endometriosis-associated clear cell and endometrioid carcinomas arise here.</li>
          <li><em>Mature teratoma (dermoid).</em> Fat that drops out on fat-sat, chemical-shift artifact, hair/sebum levels, a Rokitansky nodule (usually with tooth or fat). Score 2. Trap: fatty lesions with a large amount of enhancing soft tissue are score 4 because of the risk of immature teratoma or other malignancy. Also struma ovarii, a multilocular cyst with very T2-dark, T1-bright, strongly enhancing locules (colloid), is a look you should recognize.</li>
          <li><em>Fibroma / fibrothecoma / cystadenofibroma / Brenner.</em> The T2-dark, DWI-dark solid rule. Fibromas can produce ascites and even pleural effusion (Meigs syndrome); don't let the fluid push you to score 5 unless there are actual peritoneal nodules. Trap: telling a fibroma from a pedunculated subserosal fibroid. Look for the bridging-vessel sign to the uterus (fibroid) versus ovarian tissue draped around the mass (fibroma).</li>
          <li><em>Hydrosalpinx.</em> Tubular, serpentine, "cogwheel" folds on cross-section, separate ovary. Score 2 if simple.</li>
          <li><em>Peritoneal inclusion cyst.</em> Fluid that takes the shape of the pelvis, with a normal ovary sitting inside it like a spider in a web. Almost always a post-surgical or post-inflammatory pelvis. Per rule 5, you can simply name it.</li>
        </ul>

        <h4>Score 3: the "probably fine but someone should look" group</h4>
        <ul className="plain-list">
          <li><em>Serous or mucinous cystadenoma.</em> Unilocular non-simple fluid with a smooth enhancing wall, or multilocular with smooth thin septa. The multilocular "stained glass" mucinous cystadenoma can be enormous.</li>
          <li><em>Cystadenofibroma with a type 1 curve.</em> Sometimes the fibrous tissue isn't dark enough for the score 2 rule; a slow curve puts it at 3.</li>
          <li><em>Hydrosalpinx with proteinaceous fluid or thick wall.</em> Often old PID.</li>
        </ul>

        <h4>Score 4: the coin-flip group (~50%)</h4>
        <p>This is mostly <em>borderline tumors</em> and their benign look-alikes. Papillary projections with a type 2 curve are the classic borderline picture; serous borderline tumors are the commonest cause of a score 4 lesion. The benign look-alikes are cystadenofibromas and serous cystadenomas whose solid tissue happens to enhance at an intermediate rate. Score 4 means "I can't tell you, a gynecologic oncologist needs to decide." That's an honest and useful answer.</p>

        <h4>Score 5: high-grade cancers and metastases</h4>
        <ul className="plain-list">
          <li><em>High-grade serous carcinoma.</em> Bilateral, solid-cystic, irregular, type 3 curve, peritoneal disease, ascites. Often the ovaries themselves are small and the omental cake is the biggest finding.</li>
          <li><em>Krukenberg / metastases.</em> Bilateral solid ovarian masses; look for the primary (stomach, colon, breast, appendix). Solid tissue that is T2-dark from mucin-producing signet-ring stroma can trick you toward the score 2 rule, but it is heterogeneous, not homogeneously dark, and DWI is bright.</li>
          <li><em>Granulosa cell tumor.</em> "Sponge-like" multicystic solid mass, often with hemorrhage, in a perimenopausal woman, sometimes with a thickened endometrium from estrogen. Name it (rule 5).</li>
          <li><em>Dysgerminoma.</em> Young patient, lobulated solid mass with T2-dark fibrovascular septa that enhance. Name it.</li>
        </ul>

        <h4>Where the score gets it wrong: cases from the literature</h4>
        <p>The most useful paper is the EURAD group's analysis of its own misses: <Cite doi="10.1007/s00330-021-08054-x">Thomassin-Naggara I, Belghitti M, Milon A, et al. O-RADS MRI score: analysis of misclassified cases in a prospective multicentric European cohort. Eur Radiol 2021;31(12):9588–9599</Cite>. They went back through every lesion the score got wrong. The recurring themes: (1) missed or misjudged solid tissue (calling clot solid, or missing a small papillary projection); (2) curves drawn on the wrong tissue; (3) mucinous lesions with heterogeneous locules being under- or over-called; and (4) lesions of non-ovarian origin. Reading the illustrated cases in that paper does more for your eye than any table.</p>
        <p>The Barcelona group's practical review (Sebastià C, Cabedo L, Fusté P, Muntmany M, Nicolau C. The O-RADS MRI score for the characterization of indeterminate ovarian masses: from theory to practice. Radiología 2022;64:542–551) is a good second case-based read, and the Canadian Association of Radiologists hosts an English PDF of it.</p>
      </>
    ),
  },
  {
    id: 'report',
    title: '6. What the report should include',
    body: (
      <>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>If you can name the lesion (fibroma, dermoid, peritoneal inclusion cyst, dysgerminoma), say so. That's often more useful to the clinician than the number.</p>
        </div>
      </>
    ),
  },
  {
    id: 'case',
    title: 'A case to try',
    body: (
      <>
        <p>A 34-year-old premenopausal woman. A 6 cm left ovarian unilocular cyst. It is bright on T1 and stays bright on T1 fat-sat; on T2 it is intermediate with a few tiny very dark dots. The wall is smooth and enhances thinly. There is a 1 cm crescent-shaped structure along one wall that is bright on T1, dark on T2, and shows no signal change on the subtraction images. No free fluid, normal right ovary.</p>
        <p>What's your score, and which single finding decided it?</p>
      </>
    ),
  },
]

/* Report steps */

const study: StudyDefinition = {
  slug: 'adnexal-mri',
  name: 'Adnexal mass MRI (O-RADS MRI)',
  lede: 'A short series of yes/no questions that sorts an indeterminate adnexal mass into one of five risk buckets.',
  sourceNote: 'Use the ACR O-RADS MRI Risk Score v1 (2020), with the governing concepts revised in May 2024. There is no v2 yet.',
  references,
  learn,
  report: {
    build,
    steps: [
      {
        id: 'exam',
        title: 'Clinical and technique',
        learn: 'scanner',
        teach: (
          <>
            <p>O-RADS MRI is a problem-solving tool for a mass that ultrasound couldn't sort out. It assumes an average-risk patient with no acute symptoms, so it is <em>not</em> for torsion, tubo-ovarian abscess, ruptured ectopic, or known ovarian cancer.</p>
            <p>The three "money" sequences are T2, T1 with and without fat saturation, and DCE, with the uterus in the field of view: you need the myometrium as your reference tissue. If you can't do DCE, a single post-contrast series at 30–40 seconds is the fallback, but the score changes slightly (<Cite doi="10.1148/rg.250197">Tong et al., RadioGraphics 2026</Cite>).</p>
          </>
        ),
        fields: [
          { id: 'age', label: 'Age', kind: 'number', unit: 'years', min: 0, max: 120, step: 1 },
          { id: 'ca125', label: 'CA-125 if known', kind: 'text', placeholder: 'e.g. 35 U/mL' },
          { id: 'indication', label: 'Why the ultrasound was indeterminate', kind: 'text' },
          { id: 'sequences', label: 'Sequences', kind: 'text', placeholder: 'e.g. sagittal and axial T2, T1 with and without fat sat, DWI b1000 with ADC' },
          { id: 'contrast', label: 'Contrast', kind: 'choice', options: contrastOptions, required: true },
          { id: 'myometrium', label: 'Myometrium in the field of view', kind: 'choice', options: yesNo, required: true, showIf: (v) => str(v, 'contrast') === 'dce' },
          { id: 'quality', label: 'Study', kind: 'choice', options: qualityOptions, help: 'Incomplete = missing key sequences, motion, lesion cut off (O-RADS MRI 0).' },
          { id: 'qualityNote', label: 'What is missing', kind: 'text', showIf: (v) => str(v, 'quality') === 'incomplete' },
        ],
        derive: (v) => (str(v, 'quality') === 'incomplete' ? [{ label: 'O-RADS MRI', value: '0: incomplete', tone: 'warn' }] : []),
      },
      {
        id: 'step0',
        title: 'Step 0. Before you look at the lesion, note two things',
        learn: 'algorithm',
        teach: (
          <p>Categorize the patient as pre- or postmenopausal (≥1 year of amenorrhea). Then count the lesions: with multiple or bilateral lesions, each lesion is characterized separately, and management follows the lesion with the highest score. Score 1 is no lesion, or a follicle, hemorrhagic cyst or corpus luteum ≤3 cm in a premenopausal woman. A follicle or simple cyst above 3 cm in a premenopausal woman becomes a score 2 lesion, not score 1.</p>
        ),
        fields: [
          { id: 'meno', label: 'Menopausal status', kind: 'choice', options: menoOptions, required: true, help: 'Postmenopausal = ≥1 year of amenorrhea. State it explicitly; the score depends on it.' },
          { id: 'lesionCount', label: 'Number of adnexal lesions', kind: 'number', min: 0, step: 1 },
          { id: 'lesion', label: 'Finding', kind: 'choice', options: lesionOptions, required: true },
          { id: 'physio', label: 'Which', kind: 'choice', options: physioOptions, showIf: (v) => str(v, 'lesion') === 'physio' },
        ],
        derive: (v) => scoreChip(normalScore(v)),
      },
      {
        id: 'step1',
        title: 'Step 1. Is it actually ovarian/adnexal?',
        learn: 'algorithm',
        teach: (
          <>
            <p>This is where most beginner errors happen. Find both ovaries on T2 (look for the follicles). Then ask:</p>
            <ul className="plain-list">
              <li>Does the mass sit <em>inside</em> the ovary, stretching it (the "beak" or "claw")? → ovarian.</li>
              <li>Is the ovary seen separately and normal? → probably not ovarian. Think fibroid (bridging vessel to the uterus), hydrosalpinx (tubular, folded), paraovarian cyst, peritoneal inclusion cyst (conforms to the space around a normal ovary).</li>
              <li>Trace the ovarian vein from the mass upward. If it leads to the mass, that's a strong sign the mass is ovarian.</li>
            </ul>
            <p>Lesions of non-ovarian origin are one of the recurring themes in the misclassified cases (<Cite doi="10.1007/s00330-021-08054-x">Thomassin-Naggara et al., Eur Radiol 2021</Cite>).</p>
          </>
        ),
        fields: [
          { id: 'side', label: 'Side', kind: 'choice', options: sideOptions, required: true, showIf: hasLesion },
          { id: 'origin', label: 'Origin', kind: 'choice', options: originOptions, required: true, showIf: hasLesion },
          { id: 'originSigns', label: 'Why (signs of origin)', kind: 'multi', options: originSignOptions, showIf: hasLesion },
          { id: 'originNote', label: 'Other reason for the origin', kind: 'text', showIf: hasLesion },
          { id: 'size1', label: 'Size, dimension 1', kind: 'number', unit: 'cm', min: 0, required: true, showIf: hasLesion },
          { id: 'size2', label: 'Size, dimension 2', kind: 'number', unit: 'cm', min: 0, showIf: hasLesion },
          { id: 'size3', label: 'Size, dimension 3', kind: 'number', unit: 'cm', min: 0, showIf: hasLesion },
          { id: 'contra', label: 'Contralateral ovary', kind: 'text', placeholder: 'e.g. normal', required: true, showIf: hasLesion },
        ],
        derive: (v) =>
          list(v, 'originSigns').includes('vein') || list(v, 'originSigns').includes('claw')
            ? [{ label: 'Origin', value: 'Signs favor ovarian', tone: 'neutral' }]
            : list(v, 'originSigns').includes('separate')
              ? [{ label: 'Origin', value: 'Ovary separate and normal: probably not ovarian', tone: 'neutral' }]
              : [],
      },
      {
        id: 'step2',
        title: 'Step 2. Is there peritoneal disease?',
        learn: 'algorithm',
        teach: (
          <p>Look at the pouch of Douglas, paracolic gutters, omentum, liver surface, and diaphragm on your widest images. Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5, regardless of what the ovarian mass itself looks like. Don't be fooled by a small amount of simple free fluid in a premenopausal woman; that's normal. Fibromas can produce ascites and even pleural effusion (Meigs syndrome); don't let the fluid push you to score 5 unless there are actual peritoneal nodules.</p>
        ),
        fields: [
          { id: 'peritoneum', label: 'Peritoneum and omentum', kind: 'choice', options: peritoneumOptions, required: true },
          { id: 'peritonealSites', label: 'Where', kind: 'text', showIf: (v) => str(v, 'peritoneum') === 'implants' },
          { id: 'freeFluid', label: 'Free fluid', kind: 'choice', options: freeFluidOptions },
          { id: 'fluidAmount', label: 'Amount', kind: 'choice', options: amountOptions, showIf: (v) => ['simple', 'complex'].includes(str(v, 'freeFluid')) },
        ],
        derive: (v) => {
          const out = scoreChip(peritonealScore(v))
          if (str(v, 'freeFluid') === 'simple' && str(v, 'fluidAmount') === 'small' && str(v, 'meno') === 'pre') {
            out.push({ label: 'Free fluid', value: 'Small simple fluid, premenopausal: normal', tone: 'good' })
          }
          return out
        },
      },
      {
        id: 'step3',
        title: 'Step 3. What is the lesion made of?',
        learn: 'algorithm',
        teach: (
          <>
            <p>Decide whether it's cystic, solid, or mixed. For the cystic part, name the fluid: simple (T1 dark, T2 very bright); hemorrhagic/proteinaceous (T1 bright, stays bright on fat-sat); endometriotic (very bright T1, dark or "shading" T2, T2 dark spots); lipid (T1 bright, <strong>goes dark</strong> on fat-sat, chemical-shift artifact); mucinous (often multilocular, "stained glass").</p>
            <p>Fat is your most important find here. Fluid, fatty, or endometriotic content places the lesion in O-RADS 2 as long as there is no wall enhancement or solid tissue. The "T2 dark spot" sign is very specific for endometrioma over hemorrhagic cyst (<Cite doi="10.1148/radiol.13131394">Corwin et al., Radiology 2014</Cite>).</p>
          </>
        ),
        fields: [
          { id: 'architecture', label: 'Architecture', kind: 'choice', options: architectureOptions, required: true, showIf: hasLesion },
          { id: 'fluids', label: 'Fluid type(s)', kind: 'multi', options: fluidOptions, showIf: hasLesion },
          { id: 'fat', label: 'Fat (drops out on T1 fat-sat)', kind: 'choice', options: presentAbsent, required: true, showIf: hasLesion },
          { id: 'clues', label: 'Signal clues', kind: 'multi', options: clueOptions, showIf: hasLesion },
        ],
        derive: (v) => {
          const out: Derived[] = []
          if (!hasLesion(v)) return out
          if (list(v, 'clues').includes('darkSpots')) out.push({ label: 'T2 dark spots', value: 'Favors endometrioma over hemorrhagic cyst', tone: 'neutral' })
          if (isFat(v)) out.push({ label: 'Fat', value: 'O-RADS 2 if no enhancing solid tissue', tone: 'neutral' })
          return out
        },
      },
      {
        id: 'step4',
        title: 'Step 4. Is there enhancing solid tissue? (The single most important question.)',
        learn: 'algorithm',
        teach: (
          <>
            <p>"Solid tissue" means an <em>enhancing</em> papillary projection, mural nodule, irregular septation or irregular wall thickening, or a larger solid component (<Cite doi="10.1016/j.jacr.2020.12.022">Reinhold et al., J Am Coll Radiol 2021</Cite>).</p>
            <p>It does <strong>not</strong> mean: smooth, thin wall or smooth septa (even if they enhance); clot or debris (bright on T1, does not enhance; use subtraction images to prove it); fat or a Rokitansky nodule in a dermoid. Characteristic mature teratomas may contain septations or minimal enhancement of Rokitansky nodules, and these do not upgrade the lesion to O-RADS 4; fatty lesions with a large amount of enhancing soft tissue are score 4.</p>
            <p>If there is <strong>no</strong> enhancing solid tissue, you score by fluid and wall: most of these land in 2 or 3.</p>
          </>
        ),
        fields: [
          { id: 'wallThick', label: 'Wall', kind: 'choice', options: thicknessOptions, showIf: hasLesion },
          { id: 'wallContour', label: 'Wall contour', kind: 'choice', options: contourOptions, showIf: hasLesion },
          { id: 'wallEnh', label: 'Wall enhancement', kind: 'choice', options: enhancingOptions, showIf: hasLesion },
          { id: 'septa', label: 'Septa', kind: 'choice', options: septaOptions, showIf: (v) => hasLesion(v) && str(v, 'architecture') !== 'unilocular' },
          { id: 'solid', label: 'Enhancing solid tissue', kind: 'choice', options: presentAbsent, required: true, showIf: hasLesion },
          { id: 'solidTypes', label: 'Type', kind: 'multi', options: solidTypeOptions, showIf: (v) => hasLesion(v) && solidPresent(v) },
          { id: 'solidSize', label: 'Solid tissue size', kind: 'number', unit: 'mm', min: 0, showIf: (v) => hasLesion(v) && solidPresent(v) },
          { id: 'dermoidTissue', label: 'Enhancing soft tissue in the fat-containing lesion', kind: 'choice', options: dermoidOptions, showIf: (v) => hasLesion(v) && solidPresent(v) && isFat(v) },
        ],
        derive: (v) => {
          if (!hasLesion(v)) return []
          const fat = fatScore(v)
          if (fat) return scoreChip(fat)
          const cystic = tubeScore(v) ?? cysticScore(v)
          if (cystic) return scoreChip(cystic)
          if (solidPresent(v)) return [{ label: 'Solid tissue', value: 'Go to Step 5 (T2 and DWI)', tone: 'neutral' }]
          return []
        },
      },
      {
        id: 'step5',
        title: 'Step 5. If there IS solid tissue, look at it on T2 and DWI first',
        learn: 'algorithm',
        teach: (
          <p>Solid tissue that is dark on T2 and dark on high-b DWI is O-RADS 2: the fibroma/fibrothecoma/cystadenofibroma/Brenner rule. Dense fibrous tissue has few cells and little water, so it is dark on both. "Dark" means homogeneously as dark as skeletal muscle. If any part is intermediate or bright on either sequence, this rule does not apply; move on. Krukenberg stroma can be T2-dark but is heterogeneous, not homogeneously dark, and DWI is bright.</p>
        ),
        fields: [
          { id: 't2', label: 'Solid tissue on T2', kind: 'choice', options: signalOptions, showIf: solidToGrade, help: 'Dark = homogeneously as dark as skeletal muscle.' },
          { id: 'dwi', label: 'Solid tissue on high-b DWI', kind: 'choice', options: signalOptions, showIf: solidToGrade },
        ],
        derive: (v) => {
          if (!solidToGrade(v) || !str(v, 't2') || !str(v, 'dwi')) return []
          return darkDark(v)
            ? scoreChip({ score: 2, why: 'T2-dark/DWI-dark solid tissue' })
            : [{ label: 'T2/DWI dark rule', value: 'Does not apply: go to the curve', tone: 'neutral' }]
        },
      },
      {
        id: 'step6',
        title: 'Step 6. Everything else with solid tissue: the enhancement curve',
        learn: 'algorithm',
        teach: (
          <>
            <p>Draw a region of interest on the most enhancing part of the solid tissue and one on the outer myometrium:</p>
            <ul className="plain-list">
              <li><strong>Type 1</strong>: slow, gradual rise, never as steep as the myometrium, no plateau → O-RADS 3</li>
              <li><strong>Type 2</strong>: rises faster than type 1 but less steeply than the myometrium, then plateaus → O-RADS 4</li>
              <li><strong>Type 3</strong>: rises as fast as or faster than the myometrium, then plateaus or washes out → O-RADS 5</li>
            </ul>
            <p>With only a single series at 30–40 s: enhancing ≤ myometrium is O-RADS 4; more than the myometrium is O-RADS 5. Drawing the curve is more accurate than eyeballing it (<Cite doi="10.1148/radiol.210342">Wengert et al., Radiology 2022</Cite>).</p>
          </>
        ),
        fields: [
          { id: 'curve', label: 'Curve type vs myometrium', kind: 'choice', options: curveOptions, showIf: (v) => solidToGrade(v) && !darkDark(v) && str(v, 'contrast') === 'dce' },
          { id: 'single', label: 'Enhancement at 30–40 s', kind: 'choice', options: singleOptions, showIf: (v) => solidToGrade(v) && !darkDark(v) && str(v, 'contrast') === 'single' },
        ],
        derive: (v) => {
          if (!solidToGrade(v) || darkDark(v)) return []
          if (!str(v, 'contrast')) return [{ label: 'Curve', value: 'Set the contrast technique first', tone: 'neutral' }]
          const result = solidScore(v)
          return result && result.score !== null ? scoreChip(result) : []
        },
      },
      {
        id: 'step7',
        title: 'Step 7. Tubes and paraovarian lesions have their own lines',
        learn: 'algorithm',
        teach: (
          <p>A dilated tube with simple fluid, thin smooth wall and folds, no solid tissue → 2. Non-simple fluid or a thick wall → 3. A paraovarian cyst with a thin wall and no solid tissue → 2. Hydrosalpinx: tubular, serpentine, "cogwheel" folds on cross-section, separate ovary.</p>
        ),
        fields: [
          { id: 'tubeFolds', label: 'Folds (cogwheel on cross-section)', kind: 'choice', options: presentAbsent, showIf: (v) => hasLesion(v) && str(v, 'origin') === 'tubal' },
        ],
        derive: (v) => {
          if (!hasLesion(v)) return []
          const origin = str(v, 'origin')
          if (origin !== 'tubal' && origin !== 'paraovarian') return [{ label: 'Step 7', value: 'Applies to tubal or paraovarian lesions', tone: 'neutral' }]
          return scoreChip(tubeScore(v))
        },
      },
      {
        id: 'step8',
        title: 'Step 8. Assign the score, and remember rule 5 of the governing concepts',
        learn: 'score-table',
        teach: (
          <>
            <p>Some lesions can be confidently diagnosed on MRI regardless of the score; in those cases the final diagnosis can be reported (e.g., dysgerminoma, granulosa cell tumor, lymphoma, peritoneal pseudocyst). If you can name the lesion (fibroma, dermoid, peritoneal inclusion cyst, dysgerminoma), say so. That's often more useful to the clinician than the number.</p>
            <p>With several lesions, state which one drives management: it follows the lesion with the highest score. PPV for malignancy: 2 {'<'}0.5%, 3 ~5%, 4 ~50%, 5 ~90% (<Cite doi="10.1148/radiol.204371">Sadowski et al., Radiology 2022</Cite>).</p>
          </>
        ),
        fields: [
          { id: 'diagnosis', label: 'Most likely diagnosis', kind: 'text', placeholder: 'e.g. endometrioma, dermoid, fibroma' },
          { id: 'otherLesions', label: 'Other lesions, each with its own score', kind: 'text', multiline: true, showIf: (v) => (num(v, 'lesionCount') ?? 0) > 1 },
          { id: 'drives', label: 'Lesion that drives management', kind: 'text', showIf: (v) => (num(v, 'lesionCount') ?? 0) > 1 },
        ],
        derive: (v) => {
          const result = oradsMri(v)
          if (result.score === null) return scoreChip(result)
          const out: Derived[] = [
            { label: 'O-RADS MRI', value: `${result.score} — ${riskCategory[result.score]}`, tone: result.score >= 4 ? 'warn' : 'good' },
          ]
          if (ppv[result.score]) out.push({ label: 'PPV', value: ppv[result.score], tone: 'neutral' })
          if (management[result.score]) out.push({ label: 'Management', value: management[result.score], tone: 'neutral' })
          return out
        },
      },
      {
        id: 'other',
        title: 'Other findings',
        learn: 'report',
        teach: (
          <p>Also report the uterus and endometrium (thickened endometrium + ovarian mass hints at a hormone-producing tumor), free fluid (simple vs complex, amount), peritoneum and omentum, pelvic and retroperitoneal nodes, hydronephrosis, and bone marrow on T1.</p>
        ),
        fields: [
          { id: 'uterus', label: 'Uterus', kind: 'text' },
          { id: 'endometrium', label: 'Endometrium', kind: 'choice', options: endometriumOptions },
          { id: 'nodes', label: 'Pelvic and retroperitoneal nodes', kind: 'text', placeholder: 'e.g. no enlarged nodes' },
          { id: 'hydro', label: 'Hydronephrosis', kind: 'choice', options: hydroOptions },
          { id: 'marrow', label: 'Bone marrow on T1', kind: 'text', placeholder: 'e.g. normal' },
          { id: 'other', label: 'Other findings', kind: 'text', multiline: true },
        ],
        derive: (v) =>
          str(v, 'endometrium') === 'thickened' && ovarianMass(v)
            ? [{ label: 'Endometrium', value: 'Thickened + ovarian mass: hints at a hormone-producing tumor', tone: 'warn' }]
            : [],
      },
    ],
  },
  quiz: [
    {
      id: 't2-dwi-dark',
      question: 'Enhancing solid tissue is homogeneously as dark as skeletal muscle on T2 and dark on high-b DWI. What is the score?',
      options: ['O-RADS MRI 4', 'O-RADS MRI 3', 'O-RADS MRI 2', 'Depends on the curve type'],
      answer: 2,
      explanation: <p>Solid tissue that is dark on T2 and dark on high-b DWI is O-RADS 2: the fibroma/fibrothecoma/cystadenofibroma/Brenner rule. Dense fibrous tissue has few cells and little water. If any part is intermediate or bright on either sequence, the rule does not apply and you move on to the curve.</p>,
    },
    {
      id: 'no-dce',
      question: 'No DCE was performed. On a single post-contrast series at 30–40 s, the solid tissue enhances less than the myometrium. What is the score?',
      options: ['O-RADS MRI 3', 'O-RADS MRI 4', 'O-RADS MRI 5', 'O-RADS MRI 2'],
      answer: 1,
      explanation: <p>With only a single series at 30–40 s, solid tissue enhancing ≤ myometrium is O-RADS 4; more than the myometrium is O-RADS 5. Without DCE you lose the ability to call a curve "low risk" (score 3), which is why DCE matters.</p>,
    },
    {
      id: 'peritoneal',
      question: 'Ascites and thickened, enhancing peritoneum with nodules, and an ovarian mass that looks like a simple cyst. What is the score?',
      options: ['O-RADS MRI 2, scored on the cyst', 'O-RADS MRI 3', 'O-RADS MRI 0, incomplete', 'O-RADS MRI 5'],
      answer: 3,
      explanation: <p>Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5, regardless of what the ovarian mass itself looks like. A small amount of simple free fluid in a premenopausal woman, by contrast, is normal.</p>,
    },
    {
      id: 'clot',
      question: 'Which of these is NOT solid tissue in the O-RADS MRI lexicon?',
      options: ['A T1-bright wall structure with no signal change on subtraction images', 'An enhancing papillary projection', 'An enhancing irregular septation', 'An enhancing mural nodule'],
      answer: 0,
      explanation: <p>Solid tissue is an <em>enhancing</em> papillary projection, mural nodule, irregular septation or irregular wall thickening, or larger solid component. Clot or debris is bright on T1 and does not enhance; subtraction images prove it (<Cite doi="10.1016/j.jacr.2020.12.022">Reinhold et al., J Am Coll Radiol 2021</Cite>). Calling clot solid is one of the recurring misclassifications (<Cite doi="10.1007/s00330-021-08054-x">Thomassin-Naggara et al., Eur Radiol 2021</Cite>).</p>,
    },
    {
      id: 'curve-2',
      question: 'The solid tissue curve rises faster than type 1 but less steeply than the myometrium, then plateaus. What score and roughly what PPV for malignancy?',
      options: ['O-RADS MRI 3, ~5%', 'O-RADS MRI 5, ~90%', 'O-RADS MRI 4, ~50%', 'O-RADS MRI 2, <0.5%'],
      answer: 2,
      explanation: <p>That is a type 2 (intermediate) curve: O-RADS 4, PPV ~50%. Papillary projections with a type 2 curve are the classic borderline picture. Drawing the curve is more accurate than eyeballing it (<Cite doi="10.1148/radiol.210342">Wengert et al., Radiology 2022</Cite>).</p>,
    },
    {
      id: 'dermoid',
      question: 'A fat-containing ovarian lesion has a large amount of enhancing soft tissue. What is the score?',
      options: ['O-RADS MRI 2: fat means dermoid', 'O-RADS MRI 4', 'O-RADS MRI 3', 'O-RADS MRI 5'],
      answer: 1,
      explanation: <p>Fatty lesions with a large amount of enhancing soft tissue are score 4 because of the risk of immature teratoma or other malignancy. By contrast, septations or minimal enhancement of Rokitansky nodules in a characteristic mature teratoma do not upgrade it (2024 revision).</p>,
    },
    {
      id: 'hemorrhagic-unilocular',
      question: 'A unilocular hemorrhagic/proteinaceous cyst with a smooth enhancing wall and no solid tissue. What is the score?',
      options: ['O-RADS MRI 3', 'O-RADS MRI 2', 'O-RADS MRI 4', 'O-RADS MRI 1'],
      answer: 0,
      explanation: <p>In the score table, a unilocular proteinaceous/hemorrhagic/mucinous cyst with a smooth enhancing wall is O-RADS 3. A unilocular simple or endometriotic cyst with a smooth enhancing wall, or a unilocular cyst of any fluid with no wall enhancement, is O-RADS 2 (<Cite doi="10.1148/radiol.204371">Sadowski et al., Radiology 2022</Cite>).</p>,
    },
    {
      id: 'meigs',
      question: 'A T2-dark, DWI-dark solid ovarian mass with ascites and pleural effusion, but no peritoneal nodules. What should you do with the fluid?',
      options: ['Upgrade to O-RADS 5 for ascites', 'Call it O-RADS 0', 'Upgrade to O-RADS 4', 'Do not let it push you to 5; fibromas can produce ascites (Meigs)'],
      answer: 3,
      explanation: <p>Fibromas can produce ascites and even pleural effusion (Meigs syndrome); don't let the fluid push you to score 5 unless there are actual peritoneal nodules. The T2-dark, DWI-dark solid rule still applies.</p>,
    },
  ],
}

export function AdnexalMriStudyPage() {
  return <StudyPage study={study} />
}
