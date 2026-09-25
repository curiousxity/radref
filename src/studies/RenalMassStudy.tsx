import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { classify, initialBosniakForm } from '../logic/bosniak'
import type { BosniakForm } from '../logic/bosniak'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Silverman SG et al. Bosniak classification of cystic renal masses, version 2019: an update proposal and needs assessment. Radiology 2019.', doi: '10.1148/radiol.2019182646' },
  { citation: 'McGrath TA et al. Bosniak classification of cystic renal masses version 2019: proportion of malignancy by class and subclass - systematic review and meta-analysis. AJR 2025.', doi: '10.2214/AJR.24.32342' },
  { citation: 'McGrath TA et al. Evaluation of class II cystic renal masses proposed in Bosniak classification version 2019: a systematic review of supporting evidence. Abdom Radiol 2021.', doi: '10.1007/s00261-021-03180-y' },
  { citation: 'Pedrosa I, Cadeddu JA. How we do it: managing the indeterminate renal mass with the MRI clear cell likelihood score. Radiology 2022.', doi: '10.1148/radiol.210034' },
  { citation: 'Shetty AS et al. Renal mass imaging with MRI clear cell likelihood score: a user\'s guide. RadioGraphics 2023.', doi: '10.1148/rg.220209' },
  { citation: 'Schieda N et al. Multicenter evaluation of multiparametric MRI clear cell likelihood scores in solid indeterminate small renal masses. Radiology 2022.', doi: '10.1148/radiol.211680' },
  { citation: 'Davenport MS et al. Reporting standards for the imaging-based diagnosis of renal masses on CT and MRI: a national survey of academic abdominal radiologists and urologists. Abdom Radiol 2017.', doi: '10.1007/s00261-016-0962-x' },
  { citation: 'Davenport MS et al. Standardized report template for indeterminate renal masses at CT and MRI: a collaborative product of the SAR Disease-Focused Panel on Renal Cell Carcinoma. Abdom Radiol 2019.', doi: '10.1007/s00261-018-1851-2' },
  { citation: 'Herts BR et al. Management of the incidental renal mass on CT: a white paper of the ACR Incidental Findings Committee. J Am Coll Radiol 2018.', doi: '10.1016/j.jacr.2017.04.028' },
]

const reportTemplate = `Renal mass: [Right/Left], [upper/inter/lower pole], [anterior/posterior], [% exophytic].
Size: __ × __ × __ cm (prior: __ on [date]).
Composition: Cystic (Bosniak v2019 class __) / Solid.
Macroscopic fat: Present/Absent.   Calcification: Present/Absent.
Enhancement: __ HU unenhanced → __ HU nephrographic (Δ __ HU) / MRI: present on subtraction.
[MRI solid mass] ccLS: __.
Relationship to collecting system/renal sinus: __ mm / abuts / invades.
Renal vein/IVC: No thrombus / thrombus extending to __.
Perinephric/sinus fat, adrenal: __.
Nodes/metastases: __.
Vascular anatomy: __ renal arteries; left renal vein normal/circumaortic/retroaortic.
Contralateral kidney: __.
Impression: Most likely diagnosis + Bosniak/ccLS + stage features.`

/* ---------- Fields ---------- */

const yesNo: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const presentAbsent: Option[] = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
]

const fModality = { id: 'modality', label: 'Modality', kind: 'choice', required: true, options: [{ value: 'ct', label: 'CT' }, { value: 'mri', label: 'MRI' }] } satisfies Field
const fFat = { id: 'fat', label: 'Macroscopic fat', kind: 'choice', required: true, options: presentAbsent, help: 'Regions below -10 HU on unenhanced CT, or signal loss on fat-suppressed MRI.' } satisfies Field
const fCalc = { id: 'calc', label: 'Calcification', kind: 'choice', options: presentAbsent } satisfies Field

const fComposition = {
  id: 'composition',
  label: 'Composition',
  kind: 'choice',
  required: true,
  options: [
    { value: 'cystic', label: 'Cystic' },
    { value: 'solid', label: 'Solid' },
  ],
  help: 'Solid if more than about 25% of it is enhancing tissue.',
} satisfies Field
const fSubtraction = { id: 'subtraction', label: 'Enhancement on subtraction (post minus pre)', kind: 'choice', options: presentAbsent } satisfies Field

const isCt = (v: Values) => str(v, 'modality') !== 'mri'
const isMri = (v: Values) => str(v, 'modality') === 'mri'
const notSolid = (v: Values) => str(v, 'composition') !== 'solid'
const notCystic = (v: Values) => str(v, 'composition') !== 'cystic'

const fWallEnh = { id: 'bEnh', label: 'Enhancing wall or septa', kind: 'choice', options: yesNo } satisfies Field
const fWall = {
  id: 'bWall',
  label: 'Wall thickness',
  kind: 'choice',
  options: [
    { value: 'none', label: 'No visible wall' },
    { value: 'thin', label: 'Thin (≤2 mm)' },
    { value: 'minimallyThick', label: 'Minimally thickened (3 mm)' },
    { value: 'thick', label: 'Thick (≥4 mm)' },
  ],
} satisfies Field
const fIrregular = { id: 'bIrreg', label: 'Enhancing wall or septal irregularity', kind: 'choice', options: yesNo } satisfies Field
const fSeptaCount = {
  id: 'bSepta',
  label: 'Septa',
  kind: 'choice',
  options: [
    { value: 'none', label: 'None' },
    { value: 'few', label: '1-3' },
    { value: 'many', label: '≥4' },
  ],
} satisfies Field
const fSeptaThick = {
  id: 'bSeptaThick',
  label: 'Septa thickness',
  kind: 'choice',
  options: [
    { value: 'thin', label: 'Thin (≤2 mm)' },
    { value: 'minimallyThick', label: 'Minimally thickened (3 mm)' },
    { value: 'thick', label: 'Thick (≥4 mm)' },
  ],
} satisfies Field
const fProtrusion = {
  id: 'bNodule',
  label: 'Enhancing protrusion',
  kind: 'choice',
  options: [
    { value: 'none', label: 'None' },
    { value: 'irregularity', label: 'Irregularity (obtuse ≤3 mm)' },
    { value: 'nodule', label: 'Nodule (obtuse ≥4 mm or acute any size)' },
  ],
} satisfies Field
const fT1Bright = { id: 'bT1', label: 'Heterogeneously T1-bright on unenhanced fat-suppressed T1', kind: 'choice', options: yesNo } satisfies Field
const fHomogeneous = { id: 'homog', label: 'Homogeneous lesion (no wall, septa or nodule features)', kind: 'choice', options: yesNo } satisfies Field
const fT2Csf = { id: 'homogT2', label: 'Very bright on T2, like CSF', kind: 'choice', options: yesNo } satisfies Field

const fT2 = {
  id: 't2',
  label: 'T2 signal compared with renal cortex',
  kind: 'choice',
  options: [
    { value: 'bright', label: 'Bright' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'dark', label: 'Dark' },
  ],
} satisfies Field
const fCm = {
  id: 'cmEnh',
  label: 'Corticomedullary enhancement',
  kind: 'choice',
  options: [
    { value: 'intense', label: 'Intense' },
    { value: 'mild', label: 'Mild' },
  ],
} satisfies Field
const fMicroFat = { id: 'microFat', label: 'Microscopic fat (opposed-phase signal drop)', kind: 'choice', options: presentAbsent } satisfies Field
const fSei = { id: 'sei', label: 'Segmental enhancement inversion', kind: 'choice', options: presentAbsent } satisfies Field
const fCcls = {
  id: 'ccls',
  label: 'ccLS',
  kind: 'choice',
  options: ['1', '2', '3', '4', '5'].map((value) => ({ value, label: value })),
} satisfies Field

const fPrior = { id: 'prior', label: 'Prior imaging', kind: 'choice', required: true, options: [{ value: 'none', label: 'None available' }, { value: 'yes', label: 'Available' }] } satisfies Field

const fVein = {
  id: 'vein',
  label: 'Renal vein/IVC',
  kind: 'choice',
  required: true,
  options: [
    { value: 'none', label: 'No thrombus' },
    { value: 'renal', label: 'Tumor in the renal vein or its branches' },
    { value: 'ivcBelow', label: 'Thrombus in the IVC below the diaphragm' },
    { value: 'ivcAbove', label: 'Thrombus in the IVC above the diaphragm' },
    { value: 'ivcWall', label: 'Invading the IVC wall' },
  ],
} satisfies Field
const fFatAdrenal = {
  id: 'periFat',
  label: 'Perinephric/sinus fat, adrenal',
  kind: 'choice',
  required: true,
  options: [
    { value: 'clear', label: 'No invasion' },
    { value: 'involved', label: 'Involved' },
  ],
} satisfies Field
const fExtension = {
  id: 'extension',
  label: 'Which',
  kind: 'multi',
  options: [
    { value: 'perinephric', label: 'Perinephric fat' },
    { value: 'sinus', label: 'Renal sinus fat' },
    { value: 'gerota', label: 'Beyond Gerota fascia' },
    { value: 'adrenal', label: 'Direct invasion of the ipsilateral adrenal' },
  ],
} satisfies Field
const fNodes = {
  id: 'nodes',
  label: 'Retroperitoneal nodes',
  kind: 'choice',
  required: true,
  options: [
    { value: 'none', label: 'Not enlarged' },
    { value: 'enlarged', label: 'Enlarged' },
  ],
} satisfies Field
const fMets = {
  id: 'mets',
  label: 'Metastases',
  kind: 'choice',
  required: true,
  options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ],
} satisfies Field
const fMetSites = {
  id: 'metSites',
  label: 'Metastatic sites',
  kind: 'multi',
  options: [
    { value: 'lung', label: 'Lung bases' },
    { value: 'liver', label: 'Liver' },
    { value: 'bone', label: 'Bone' },
    { value: 'adrenal', label: 'Adrenals' },
    { value: 'pancreas', label: 'Pancreas' },
    { value: 'kidney', label: 'Contralateral kidney' },
  ],
} satisfies Field

const fSide = { id: 'side', label: 'Side', kind: 'choice', options: [{ value: 'Right', label: 'Right' }, { value: 'Left', label: 'Left' }] } satisfies Field
const fPole = {
  id: 'pole',
  label: 'Polar location',
  kind: 'choice',
  options: [
    { value: 'upper', label: 'Upper pole' },
    { value: 'inter', label: 'Interpolar' },
    { value: 'lower', label: 'Lower pole' },
  ],
} satisfies Field
const fAp = { id: 'ap', label: 'Anterior or posterior', kind: 'choice', options: [{ value: 'anterior', label: 'Anterior' }, { value: 'posterior', label: 'Posterior' }] } satisfies Field
const fCollecting = {
  id: 'collecting',
  label: 'Relationship to collecting system/renal sinus',
  kind: 'choice',
  options: [
    { value: 'distance', label: 'Separate (distance)' },
    { value: 'abuts', label: 'Abuts' },
    { value: 'invades', label: 'Invades' },
  ],
} satisfies Field
const fLrv = {
  id: 'lrv',
  label: 'Left renal vein',
  kind: 'choice',
  options: [
    { value: 'normal', label: 'Normal' },
    { value: 'circumaortic', label: 'Circumaortic' },
    { value: 'retroaortic', label: 'Retroaortic' },
  ],
} satisfies Field
const fContra = {
  id: 'contra',
  label: 'Contralateral kidney',
  kind: 'choice',
  options: [
    { value: 'normal', label: 'Present and normal' },
    { value: 'abnormal', label: 'Abnormal' },
    { value: 'absent', label: 'Absent' },
  ],
} satisfies Field

/* ---------- Rules ---------- */

type EnhancementRule = { delta: number; verdict: 'enhances' | 'equivocal' | 'none' }

/** CT, unenhanced to nephrographic: ≥20 HU enhances, 10-19 HU equivocal, <10 HU does not enhance. */
function ctEnhancement(v: Values): EnhancementRule | undefined {
  const pre = num(v, 'huPre')
  const post = num(v, 'huNephro')
  if (pre === undefined || post === undefined) return undefined
  // Round away float noise (35.3 - 15.3), then classify on the unrounded change and
  // truncate for display, so e.g. 19.96 HU reads 19.9 and is not shown as 20 while equivocal.
  const raw = Math.round((post - pre) * 1e6) / 1e6
  return { delta: Math.trunc(raw * 10) / 10, verdict: raw >= 20 ? 'enhances' : raw >= 10 ? 'equivocal' : 'none' }
}

const enhancementWords: Record<EnhancementRule['verdict'], string> = {
  enhances: 'enhances',
  equivocal: 'equivocal, possible pseudoenhancement',
  none: 'does not enhance',
}

/** Macroscopic fat without calcification is essentially an AML; fat plus calcification is a warning sign. */
function fatRule(v: Values): 'aml' | 'warning' | undefined {
  if (str(v, 'fat') !== 'present') return undefined
  if (str(v, 'calc') === 'absent') return 'aml'
  if (str(v, 'calc') === 'present') return 'warning'
  return undefined
}

/** Homogeneous class II lesions in v2019: -9 to 20 HU unenhanced, ≥70 HU unenhanced, 21-30 HU portal venous, or CSF-like T2. */
function homogeneousClassII(v: Values): string | undefined {
  if (str(v, 'homog') !== 'yes') return undefined
  const pre = num(v, 'huPre')
  const pv = num(v, 'huPv')
  if (isCt(v)) {
    if (pre !== undefined && pre >= -9 && pre <= 20) return 'homogeneous, -9 to 20 HU unenhanced'
    if (pre !== undefined && pre >= 70) return 'homogeneous, ≥70 HU unenhanced (hyperdense cyst)'
    if (pv !== undefined && pv >= 21 && pv <= 30) return 'homogeneous, 21-30 HU portal venous'
  }
  if (isMri(v) && str(v, 'homogT2') === 'yes') return 'homogeneous, very bright on T2 like CSF'
  return undefined
}

type BosniakOutcome = { klass: string; basis: string }

/** Bosniak v2019 class for a cystic mass, from the shared calculator logic. */
function bosniak(v: Values): BosniakOutcome | undefined {
  if (str(v, 'composition') !== 'cystic') return undefined
  const homogeneous = homogeneousClassII(v)
  if (homogeneous) return { klass: 'II', basis: homogeneous }
  if (!str(v, 'bEnh') || !str(v, 'bWall')) return undefined
  const septa = (str(v, 'bSepta') || 'none') as BosniakForm['septaCount']
  const form: BosniakForm = {
    ...initialBosniakForm,
    cysticRenalMass: true,
    enhancingPresent: str(v, 'bEnh') === 'yes',
    wallThickness: str(v, 'bWall') as BosniakForm['wallThickness'],
    wallIrregularity: str(v, 'bIrreg') === 'yes',
    septaCount: septa,
    septaThickness: septa === 'none' ? 'thin' : ((str(v, 'bSeptaThick') || 'thin') as BosniakForm['septaThickness']),
    calcificationOnly: str(v, 'calc') === 'present',
    enhancingNodule: (str(v, 'bNodule') || 'none') as BosniakForm['enhancingNodule'],
    t1HyperintenseUnenhanced: isMri(v) && str(v, 'bT1') === 'yes',
  }
  const result = classify(form)
  // classify() returns "Indeterminate" when the inputs fit no branch; that is not a class.
  if (!result.category.startsWith('Bosniak ')) return undefined
  return { klass: result.category.replace(/^Bosniak /, ''), basis: result.reason }
}

/** The lesson's "usual action" column for each class. */
const usualAction: Record<string, string> = {
  I: 'Benign, nothing',
  II: 'Benign, nothing',
  IIF: 'Follow-up imaging',
  III: 'Surgery or surveillance discussion',
  IV: 'Treat as malignant',
}

type Pattern = { name: string; favoured: string; score: string }

/** The lesson's classic ccLS patterns. Only the patterns it lists; anything else is left unlabelled. */
function cclsPattern(v: Values): Pattern | undefined {
  // ccLS applies to solid masses without macroscopic fat, on MRI.
  if (!isMri(v) || str(v, 'fat') === 'present') return undefined
  const t2 = str(v, 't2')
  const cm = str(v, 'cmEnh')
  if (t2 === 'bright' && cm === 'intense') return { name: 'Clear cell RCC pattern', favoured: 'clear cell RCC', score: 'ccLS 4-5' }
  if (t2 === 'dark' && cm === 'mild') return { name: 'Papillary RCC pattern', favoured: 'papillary RCC', score: 'ccLS 1' }
  if (t2 === 'dark' && cm === 'intense') return { name: 'Fat-poor AML pattern', favoured: 'fat-poor AML', score: 'low ccLS' }
  if (t2 === 'intermediate' && str(v, 'sei') === 'present') return { name: 'Oncocytoma/chromophobe pattern', favoured: 'oncocytoma or chromophobe RCC', score: '' }
  return undefined
}

function maxSize(v: Values): number | undefined {
  const dims = ['size1', 'size2', 'size3'].map((id) => num(v, id)).filter((n): n is number => n !== undefined)
  return dims.length ? Math.max(...dims) : undefined
}

/** AJCC 8th T stage as the lesson simplifies it. */
function tStage(v: Values): { stage: string; note: string } | undefined {
  const size = maxSize(v)
  const vein = str(v, 'vein')
  const fat = str(v, 'periFat')
  const ext = fat === 'involved' ? list(v, 'extension') : []
  if (ext.includes('gerota') || ext.includes('adrenal')) return { stage: 'T4', note: '' }
  if (vein === 'ivcAbove' || vein === 'ivcWall') return { stage: 'T3c', note: '' }
  if (vein === 'ivcBelow') return { stage: 'T3b', note: '' }
  if (vein === 'renal' || ext.includes('perinephric') || ext.includes('sinus')) return { stage: 'T3a', note: '' }
  if (size === undefined) return undefined
  const bySize = size <= 4 ? 'T1a' : size <= 7 ? 'T1b' : size <= 10 ? 'T2a' : 'T2b'
  const confined = vein === 'none' && fat === 'clear'
  return { stage: bySize, note: confined ? '' : 'extension not yet stated' }
}

/** Stage features go in the impression when the mass looks like cancer: solid, or Bosniak III-IV. */
function looksMalignant(v: Values) {
  const b = bosniak(v)
  return (str(v, 'composition') === 'solid' && fatRule(v) !== 'aml') || b?.klass === 'III' || b?.klass === 'IV'
}

/** Lower-cases only the first letter, so "IVC" and "Gerota" keep their capitals. */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)

/* ---------- Report ---------- */

function build(v: Values) {
  const warnings: string[] = []
  const mri = isMri(v)
  const composition = str(v, 'composition')
  const enh = ctEnhancement(v)
  const b = bosniak(v)
  const fatVerdict = fatRule(v)
  const pattern = cclsPattern(v)
  const stage = tStage(v)
  const ccls = str(v, 'ccls')

  const location = [
    str(v, 'side'),
    str(v, 'pole') && optionLabel(fPole, str(v, 'pole')).toLowerCase(),
    str(v, 'ap'),
    num(v, 'exophytic') !== undefined && `${num(v, 'exophytic')}% exophytic`,
  ].filter(Boolean)

  const dims = ['size1', 'size2', 'size3'].map((id) => num(v, id)).filter((n): n is number => n !== undefined)
  let sizeLine = ''
  if (dims.length) {
    const prior = str(v, 'prior')
    const priorText =
      prior === 'none'
        ? ' (no prior imaging for comparison)'
        : prior === 'yes' && (str(v, 'priorSize') || str(v, 'priorDate'))
          ? ` (prior: ${str(v, 'priorSize') ? `${str(v, 'priorSize')} cm` : '__'}${str(v, 'priorDate') ? ` on ${str(v, 'priorDate')}` : ''})`
          : ''
    sizeLine = `Size: ${dims.join(' × ')} cm${priorText}.`
  }

  const compositionLine =
    composition === 'cystic'
      ? `Composition: Cystic${b ? ` (Bosniak v2019 class ${b.klass})` : ''}.`
      : composition === 'solid'
        ? 'Composition: Solid.'
        : ''

  const fatCalc = [
    str(v, 'fat') && `Macroscopic fat: ${optionLabel(fFat, str(v, 'fat'))}.`,
    str(v, 'calc') && `Calcification: ${optionLabel(fCalc, str(v, 'calc'))}.`,
  ].filter(Boolean).join(' ')

  let enhancementLine = ''
  if (!mri && enh) {
    enhancementLine = `Enhancement: ${num(v, 'huPre')} HU unenhanced to ${num(v, 'huNephro')} HU nephrographic (change ${enh.delta > 0 ? '+' : ''}${enh.delta} HU), ${enhancementWords[enh.verdict]}.`
  } else if (!mri && composition !== 'solid' && str(v, 'homog') === 'yes' && num(v, 'huPv') !== undefined) {
    enhancementLine = `Enhancement: not assessable without unenhanced images; ${num(v, 'huPv')} HU portal venous.`
  } else if (mri && str(v, 'subtraction')) {
    enhancementLine = `Enhancement: ${str(v, 'subtraction') === 'present' ? 'present' : 'absent'} on subtraction.`
  }

  const cclsLine = mri && composition === 'solid' && ccls ? `ccLS: ${ccls}.` : ''

  const collecting = str(v, 'collecting')
  const collectingLine = collecting
    ? `Relationship to collecting system/renal sinus: ${
        collecting === 'distance'
          ? num(v, 'collectingMm') !== undefined
            ? `${num(v, 'collectingMm')} mm`
            : 'separate'
          : collecting === 'abuts'
            ? 'abuts'
            : 'invades'
      }.`
    : ''

  const vein = str(v, 'vein')
  const veinLine = vein
    ? `Renal vein/IVC: ${vein === 'none' ? 'No thrombus' : optionLabel(fVein, vein)}${vein !== 'none' && str(v, 'veinExtent') ? `, extending to ${str(v, 'veinExtent')}` : ''}.`
    : ''

  const periFat = str(v, 'periFat')
  const ext = list(v, 'extension').map((value) => lowerFirst(optionLabel(fExtension, value)))
  const periLine = periFat
    ? `Perinephric/sinus fat, adrenal: ${periFat === 'clear' ? 'No invasion' : ext.length ? `Involvement of ${ext.join(', ')}` : 'Involved'}.`
    : ''

  const nodes = str(v, 'nodes')
  const mets = str(v, 'mets')
  const sites = list(v, 'metSites').map((value) => optionLabel(fMetSites, value).toLowerCase())
  const nodeParts = [
    nodes === 'none' && 'No enlarged retroperitoneal nodes.',
    nodes === 'enlarged' && `Enlarged retroperitoneal nodes${str(v, 'nodeDetail') ? `: ${str(v, 'nodeDetail')}` : ''}.`,
    mets === 'none' && 'No metastases.',
    mets === 'present' && `Metastases${sites.length ? `: ${sites.join(', ')}` : ''}.`,
  ].filter(Boolean)
  const nodesLine = nodeParts.length ? `Nodes/metastases: ${nodeParts.join(' ')}` : ''

  const arteries = num(v, 'arteries')
  const vascParts = [
    arteries !== undefined && `${arteries} renal ${arteries === 1 ? 'artery' : 'arteries'}${str(v, 'earlyBranch') === 'yes' ? ' with early branching' : ''}`,
    str(v, 'lrv') && `left renal vein ${str(v, 'lrv')}`,
  ].filter(Boolean)
  const vascLine = vascParts.length ? `Vascular anatomy: ${vascParts.join('; ')}.` : ''

  const contra = str(v, 'contra')
  const contraLine = contra
    ? `Contralateral kidney: ${optionLabel(fContra, contra)}${contra === 'abnormal' && str(v, 'contraDetail') ? `, ${str(v, 'contraDetail')}` : ''}.`
    : ''

  /* Impression: most likely diagnosis + Bosniak/ccLS + stage features. */
  const side = str(v, 'side') ? `${str(v, 'side').toLowerCase()} ` : ''
  let diagnosis = str(v, 'diagnosis')
  if (!diagnosis) {
    if (fatVerdict === 'aml') diagnosis = `Fat-containing ${side}renal mass without calcification, consistent with angiomyolipoma`
    else if (composition === 'cystic') diagnosis = `Cystic ${side}renal mass`
    else if (composition === 'solid') diagnosis = `Solid ${side}renal mass${pattern ? `, ${pattern.favoured} favored` : ''}`
  }
  const classParts = [
    composition === 'cystic' && b && `Bosniak v2019 class ${b.klass}`,
    mri && composition === 'solid' && ccls && `ccLS ${ccls}`,
  ].filter(Boolean)
  const stageParts: string[] = []
  if (looksMalignant(v) && stage) {
    stageParts.push(`radiologic stage ${stage.stage}${stage.note ? ` (${stage.note})` : ''}`)
    if (vein && vein !== 'none') stageParts.push(lowerFirst(optionLabel(fVein, vein)))
    if (nodes === 'enlarged') stageParts.push('enlarged retroperitoneal nodes')
    if (mets === 'present') stageParts.push('metastases')
  }
  const impressionBody = [diagnosis, ...classParts, ...stageParts].filter(Boolean).join(', ')
  const fatWarning = fatVerdict === 'warning' ? 'Macroscopic fat with calcification is a warning sign: rarely, RCC can engulf fat.' : ''

  /* Contradictions the rules can see. */
  const minHu = num(v, 'minHu')
  if (!mri && minHu !== undefined && minHu < -10 && str(v, 'fat') === 'absent') warnings.push(`Macroscopic fat marked absent but a region measures ${minHu} HU (below -10 HU).`)
  if (!mri && minHu !== undefined && minHu >= -10 && str(v, 'fat') === 'present') warnings.push(`Macroscopic fat marked present but the lowest region measured is ${minHu} HU (not below -10 HU).`)
  if (composition === 'solid' && enh?.verdict === 'none') warnings.push(`Marked solid but the measured change is ${enh.delta} HU (<10 HU, does not enhance).`)
  if (composition === 'solid' && mri && str(v, 'subtraction') === 'absent') warnings.push('Marked solid but no enhancement on subtraction.')
  if (mri && composition === 'solid' && ccls && str(v, 'fat') === 'present') warnings.push('ccLS applies to solid masses without macroscopic fat.')
  if (mri && composition === 'solid' && ccls && pattern?.name === 'Clear cell RCC pattern' && Number(ccls) < 4) warnings.push(`Clear cell pattern (T2-bright, intense enhancement) usually scores ccLS 4-5; ccLS ${ccls} entered.`)
  if (mri && composition === 'solid' && ccls && pattern?.name === 'Papillary RCC pattern' && ccls !== '1') warnings.push(`Papillary pattern (T2-dark, mild enhancement) usually scores ccLS 1; ccLS ${ccls} entered.`)
  if (str(v, 'homog') === 'yes' && (str(v, 'bNodule') === 'nodule' || str(v, 'bNodule') === 'irregularity' || str(v, 'bSepta') === 'few' || str(v, 'bSepta') === 'many')) {
    warnings.push('Marked homogeneous but septa or protrusions are entered.')
  }
  if (composition === 'cystic' && !b) warnings.push('Bosniak class not yet determined: enter wall enhancement and wall thickness, or the homogeneous-lesion criteria. If they are entered, the inputs fit no single Bosniak v2019 branch.')
  if (dims.length && str(v, 'prior') === 'yes' && !str(v, 'priorSize')) warnings.push('Prior imaging marked available but the prior size is not entered, so the report has no comparison.')

  const text = lines(
    location.length > 0 && `Renal mass: ${location.join(', ')}.`,
    sizeLine,
    compositionLine,
    fatCalc,
    enhancementLine,
    cclsLine,
    collectingLine,
    veinLine,
    periLine,
    nodesLine,
    vascLine,
    contraLine,
    (impressionBody || fatWarning) && `Impression: ${[impressionBody && `${impressionBody}.`, fatWarning].filter(Boolean).join(' ')}`,
  )

  return { text, warnings }
}

/* ---------- Learn ---------- */

const learnOverview = (
  <>
    <p>Renal mass imaging comes down to three questions:</p>
    <ol className="plain-list">
      <li><strong>Is it a real mass, or just a simple cyst?</strong></li>
      <li><strong>If it's a mass, is it cystic or solid, and does it contain fat?</strong></li>
      <li><strong>If it looks like cancer, what does the surgeon need to know?</strong></li>
    </ol>
    <p>The protocol exists so you can answer all three.</p>
  </>
)

const learnProtocol = (
  <>
    <h4>CT renal mass protocol</h4>
    <ul className="plain-list">
      <li><strong>Unenhanced:</strong> your baseline. You measure HU here, and you look for fat and calcium. Without it, you can't prove enhancement.</li>
      <li><strong>Corticomedullary phase (~30–40 s), optional:</strong> the cortex is bright here. It helps show how "hot" a solid mass is and maps the arteries for surgery.</li>
      <li><strong>Nephrographic phase (~90–120 s):</strong> the most important phase. The whole kidney enhances evenly, so masses stand out, and this is where you measure enhancement.</li>
      <li><strong>Excretory phase, optional:</strong> shows the collecting system, which matters for partial nephrectomy planning.</li>
      <li><strong>Technique:</strong> thin slices, ideally ≤3 mm. Place the ROI in the central two-thirds of the mass and keep it away from the edges.</li>
    </ul>
    <div className="lesson-key">
      <p><strong>The enhancement rule (CT)</strong>, measured from unenhanced to nephrographic:</p>
      <ul className="plain-list">
        <li><strong>≥20 HU rise:</strong> enhances, so it's a mass.</li>
        <li><strong>10–19 HU:</strong> equivocal. Often this is <strong>pseudoenhancement</strong>, a beam-hardening artifact that makes small cysts inside the kidney look like they enhance.</li>
        <li><strong>{'<'}10 HU:</strong> does not enhance.</li>
      </ul>
    </div>
    <h4>MRI renal mass protocol</h4>
    <ul className="plain-list">
      <li><strong>T2 (HASTE/SSFSE):</strong> separates simple fluid from solid tissue. T2 signal is a key clue for the tumor subtype.</li>
      <li><strong>T1 in-phase/opposed-phase:</strong> signal drop on opposed-phase means <em>microscopic</em> fat. Typical of clear cell RCC and some fat-poor AMLs.</li>
      <li><strong>DWI:</strong> supportive only. Never used alone.</li>
      <li><strong>T1 fat-sat before and after contrast (dynamic):</strong> corticomedullary, nephrographic, and excretory phases.</li>
      <li><strong>Subtraction images:</strong> the most important MRI trick. A cyst that is bright on T1 (blood or protein) can look like it "enhances." Subtraction (post minus pre) shows whether real enhancement is present.</li>
    </ul>
    <p>Choose MRI when the CT is indeterminate, the patient can't get iodinated contrast, the lesion is T1-bright, or you want to apply the clear cell likelihood score (Part 4).</p>
  </>
)

const learnReading = (
  <>
    <div className="lesson-step">
      <h4>Step 1. Is there macroscopic fat?</h4>
      <ul className="plain-list">
        <li>Look for regions below −10 HU on unenhanced CT, or signal loss on fat-suppressed MRI.</li>
        <li>If fat is present and there is <strong>no calcification</strong>, it is essentially an angiomyolipoma (AML).</li>
        <li>Fat <em>plus</em> calcification is a warning sign. Rarely, RCC can engulf fat.</li>
      </ul>
    </div>
    <div className="lesson-step">
      <h4>Step 2. Cystic or solid?</h4>
      <ul className="plain-list">
        <li>In Bosniak v2019, a mass is <strong>solid</strong> if more than about 25% of it is enhancing tissue.</li>
        <li>Anything less is <strong>cystic</strong>, and you use the Bosniak classification (Part 3).</li>
      </ul>
    </div>
    <div className="lesson-step">
      <h4>Step 3. If cystic, classify it with Bosniak</h4>
      <p>You look at the wall, the septa, and any nodules.</p>
    </div>
    <div className="lesson-step">
      <h4>Step 4. If solid, try to narrow the subtype</h4>
      <p>The main question is clear cell RCC versus everything else (papillary RCC, oncocytoma, fat-poor AML, chromophobe RCC). On MRI, this is what the ccLS does.</p>
    </div>
    <div className="lesson-step">
      <h4>Step 5. Stage it</h4>
      <p>See Part 5.</p>
    </div>
    <div className="lesson-step">
      <h4>Step 6. Surgical anatomy</h4>
      <p>See Part 5.</p>
    </div>
  </>
)

const learnBosniak = (
  <>
    <p>The 2019 update came from the SAR Disease-Focused Panel. It added MRI, defined terms precisely, and moved more benign lesions into lower-risk classes (<Cite doi="10.1148/radiol.2019182646">Silverman et al., Radiology 2019</Cite>).</p>
    <p><strong>Measurement words you need:</strong></p>
    <ul className="plain-list">
      <li><strong>Wall/septa thickness:</strong> thin ≤2 mm, minimally thickened 3 mm, thick ≥4 mm.</li>
      <li><strong>Protrusion:</strong> "obtuse" forms a wide angle with the wall. "Acute" is a sharp angle, like a knob sticking out.</li>
      <li><strong>Nodule:</strong> an obtuse protrusion of ≥4 mm, <strong>or</strong> an acute protrusion of any size.</li>
    </ul>
    <div className="table-wrap">
      <table className="ref-table">
        <thead><tr><th>Class</th><th>What you see (simplified)</th><th>Usual action</th></tr></thead>
        <tbody>
          <tr><td><strong>I</strong></td><td>Thin smooth wall, simple fluid, no septa/calcium</td><td>Benign, nothing</td></tr>
          <tr><td><strong>II</strong></td><td>1–3 thin septa; fine calcium; or homogeneous lesions like: −9 to 20 HU unenhanced, ≥70 HU unenhanced (hyperdense cyst), 21–30 HU portal venous; very bright on T2 like CSF</td><td>Benign, nothing</td></tr>
          <tr><td><strong>IIF</strong></td><td>≥4 thin smooth septa; OR minimally thickened (3 mm) smooth wall/septa; OR (MRI) heterogeneously T1-bright</td><td>Follow-up imaging</td></tr>
          <tr><td><strong>III</strong></td><td>Thick (≥4 mm) or irregular (obtuse protrusion ≤3 mm) enhancing wall/septa</td><td>Surgery or surveillance discussion</td></tr>
          <tr><td><strong>IV</strong></td><td>One or more enhancing <strong>nodules</strong></td><td>Treat as malignant</td></tr>
        </tbody>
      </table>
    </div>
    <p><strong>How often each class is actually cancer.</strong> A 2025 meta-analysis pooled 975 cystic masses (<Cite doi="10.2214/AJR.24.32342">McGrath et al., AJR 2025</Cite>): class I 0%, class II ~9%, class IIF ~26%, class III ~80%, class IV ~88%.</p>
    <p>The IIF number depends heavily on how "truth" was defined. It was about 41% when the reference was surgery, but only about 2% when it was imaging follow-up. Surgical series only include the suspicious-looking IIF masses that someone chose to resect, so they overstate the risk.</p>
    <p><strong>Evidence for the new class II homogeneous lesions.</strong> A systematic review found 0 cancers among 1,454 homogeneous lesions measuring 9–20 HU unenhanced, 0 among 454 lesions at 21–30 HU portal venous, and 0 among 32 hyperdense (≥70 HU) lesions. The "too small to characterize" category has no supporting data and rests on expert opinion (<Cite doi="10.1007/s00261-021-03180-y">McGrath et al., Abdom Radiol 2021</Cite>).</p>
  </>
)

const learnCcls = (
  <>
    <p><strong>Why it matters:</strong> about 1 in 5 small solid renal masses (≤4 cm) is benign. Clear cell RCC is the most common subtype and the one most likely to behave aggressively (<Cite doi="10.1148/radiol.210034">Pedrosa & Cadeddu, Radiology 2022</Cite>).</p>
    <p>The ccLS is a 1–5 score for how likely the mass is to be clear cell RCC (1 = very unlikely, 5 = very likely). It applies to solid masses <strong>without</strong> macroscopic fat.</p>
    <p><strong>Main features, in order:</strong></p>
    <ol className="plain-list">
      <li><strong>T2 signal compared with renal cortex.</strong> Bright favors clear cell. Dark favors papillary RCC or fat-poor AML.</li>
      <li><strong>Corticomedullary enhancement.</strong> Intense enhancement favors clear cell. Mild enhancement favors papillary.</li>
      <li><strong>Microscopic fat</strong> (opposed-phase signal drop). Pushes the score toward clear cell, or toward fat-poor AML if the mass is T2-dark.</li>
    </ol>
    <p><strong>Supporting features:</strong></p>
    <ul className="plain-list">
      <li><strong>Segmental enhancement inversion:</strong> one part enhances early and another enhances late, and they swap. Suggests oncocytoma or chromophobe RCC.</li>
      <li>Arterial-to-delayed enhancement ratio.</li>
      <li>Diffusion restriction.</li>
    </ul>
    <p>These come from the case-based user's guide by <Cite doi="10.1148/rg.220209">Shetty et al., RadioGraphics 2023</Cite>. It walks through real examples of every score and is the best single paper to read alongside cases.</p>
    <div className="lesson-key">
      <p><strong>Classic patterns to recognize:</strong></p>
      <ul className="plain-list">
        <li><strong>Clear cell RCC:</strong> T2-bright + intense early enhancement ± microscopic fat → ccLS 4–5.</li>
        <li><strong>Papillary RCC:</strong> T2-dark, homogeneous, mild/slow enhancement → ccLS 1.</li>
        <li><strong>Fat-poor AML:</strong> T2-dark + avid enhancement ± microscopic fat → low ccLS. Suggest this diagnosis in the report.</li>
        <li><strong>Oncocytoma/chromophobe:</strong> intermediate T2, segmental enhancement inversion.</li>
      </ul>
    </div>
    <p><strong>How well it works.</strong> In a 5-center study of 250 solid small renal masses (<Cite doi="10.1148/radiol.211680">Schieda et al., Radiology 2022</Cite>), a score of ≥4 had about 75% sensitivity and 78% specificity for clear cell RCC; a score of ≤2 had an 88% negative predictive value; agreement between readers was moderate (κ 0.58). In plain terms: ccLS is useful, but it does not replace biopsy when the answer would change management.</p>
  </>
)

const learnStaging = (
  <>
    <p><strong>Staging (AJCC 8th T-stage, simplified):</strong></p>
    <ul className="plain-list">
      <li><strong>T1a:</strong> ≤4 cm. <strong>T1b:</strong> 4–7 cm. <strong>T2a:</strong> 7–10 cm. <strong>T2b:</strong> {'>'}10 cm. All confined to the kidney.</li>
      <li><strong>T3a:</strong> tumor in the renal vein or its branches, or in perinephric or renal sinus fat.</li>
      <li><strong>T3b:</strong> thrombus in the IVC below the diaphragm.</li>
      <li><strong>T3c:</strong> thrombus in the IVC above the diaphragm, or invading the IVC wall.</li>
      <li><strong>T4:</strong> beyond Gerota fascia, or directly invading the ipsilateral adrenal.</li>
    </ul>
    <p>Also look for retroperitoneal nodes (especially enlarged ones) and metastases: lung bases, liver, bone, adrenals, pancreas, and the contralateral kidney.</p>
    <p><strong>What the surgeon needs:</strong></p>
    <ul className="plain-list">
      <li><strong>Relationship to the collecting system and renal sinus.</strong> Decides whether partial nephrectomy is feasible.</li>
      <li><strong>Exophytic vs endophytic, anterior vs posterior, polar location.</strong> The elements of the RENAL nephrometry score.</li>
      <li><strong>Vascular anatomy:</strong> number of renal arteries, early branching, circumaortic or retroaortic left renal vein.</li>
      <li><strong>The other kidney:</strong> present and normal? This matters a great deal if you're recommending nephrectomy.</li>
    </ul>
  </>
)

const learnReport = (
  <>
    <p>A national survey of radiologists and urologists agreed these items are essential (<Cite doi="10.1007/s00261-016-0962-x">Davenport et al., Abdom Radiol 2017</Cite>): size with comparison to priors, cystic vs solid, presence of fat, enhancement, radiologic stage, and Bosniak class for cystic masses. Urologists also wanted the nephrometry features. Most urologists preferred <strong>no management recommendations</strong> for solid masses or Bosniak III–IV. The SAR panel then turned these items into a formal template by expert consensus (<Cite doi="10.1007/s00261-018-1851-2">Davenport et al., Abdom Radiol 2019</Cite>).</p>
    <CopyBlock label="Report template" text={reportTemplate} />
    <p><strong>For incidental masses on routine CT</strong> (not renal protocol studies), use the ACR Incidental Findings algorithm. It tells you when a lesion can be called benign and when it needs dedicated imaging (<Cite doi="10.1016/j.jacr.2017.04.028">Herts et al., JACR 2018</Cite>).</p>
  </>
)

const learnCases = (
  <>
    <p>Illustrative scenarios built on the rules above.</p>
    <ol className="plain-list">
      <li><strong>2 cm homogeneous lesion, 15 HU unenhanced, 18 HU nephrographic.</strong> Bosniak II (9–20 HU homogeneous). The 3 HU change is not enhancement. No follow-up.</li>
      <li><strong>3 cm cystic lesion with 5 thin smooth septa.</strong> Bosniak IIF (≥4 thin septa). Follow-up imaging.</li>
      <li><strong>Cystic lesion with a 5 mm obtuse enhancing bump on the wall.</strong> Bosniak IV (obtuse protrusion ≥4 mm counts as a nodule).</li>
      <li><strong>2.5 cm solid mass: T2-dark, mild enhancement, no fat.</strong> ccLS 1. Papillary RCC is favored; clear cell is unlikely.</li>
      <li><strong>2.5 cm solid mass: T2-bright, intense corticomedullary enhancement, opposed-phase signal drop.</strong> ccLS 5. Clear cell RCC.</li>
      <li><strong>Incidental 1.5 cm lesion at 16 HU on portal venous CT with no unenhanced images.</strong> Homogeneous 21–30 HU on portal venous is Bosniak II. A homogeneous lesion below that range is also considered benign under v2019.</li>
    </ol>
  </>
)

/* ---------- Study ---------- */

const study: StudyDefinition = {
  slug: 'renal-mass',
  name: 'Renal mass protocol CT and MRI',
  lede: 'Why each phase exists, the enhancement rule, Bosniak v2019, the clear cell likelihood score, and what the surgeon needs in the report.',
  sourceNote: 'References are linked by DOI. Bosniak v2019 (Silverman et al.), ccLS (Pedrosa, Schieda, Shetty), and the SAR reporting consensus (Davenport et al.).',
  references,
  report: {
    steps: [
      {
        id: 'fat',
        title: 'Step 1. Is there macroscopic fat?',
        learn: 'reading',
        teach: (
          <ul className="plain-list">
            <li>Look for regions below −10 HU on unenhanced CT, or signal loss on fat-suppressed MRI.</li>
            <li>If fat is present and there is <strong>no calcification</strong>, it is essentially an angiomyolipoma (AML).</li>
            <li>Fat <em>plus</em> calcification is a warning sign. Rarely, RCC can engulf fat.</li>
          </ul>
        ),
        fields: [
          fModality,
          { id: 'minHu', label: 'Lowest region in the mass, unenhanced', kind: 'number', unit: 'HU', showIf: isCt, help: 'Below -10 HU is macroscopic fat.' },
          fFat,
          fCalc,
        ],
        derive: (v) => {
          const out: Derived[] = []
          const minHu = num(v, 'minHu')
          if (isCt(v) && minHu !== undefined) {
            out.push({ label: 'Lowest HU', value: minHu < -10 ? 'Below -10 HU: macroscopic fat' : 'Not below -10 HU', tone: 'neutral' })
          }
          const verdict = fatRule(v)
          if (verdict === 'aml') out.push({ label: 'Fat, no calcification', value: 'Essentially AML', tone: 'good' })
          if (verdict === 'warning') out.push({ label: 'Fat plus calcification', value: 'Warning: RCC can engulf fat', tone: 'warn' })
          return out
        },
      },
      {
        id: 'composition',
        title: 'Step 2. Cystic or solid?',
        learn: 'reading',
        teach: (
          <>
            <ul className="plain-list">
              <li>In Bosniak v2019, a mass is <strong>solid</strong> if more than about 25% of it is enhancing tissue. Anything less is <strong>cystic</strong>.</li>
              <li>CT, unenhanced to nephrographic: <strong>≥20 HU rise</strong> enhances; <strong>10–19 HU</strong> is equivocal, often <strong>pseudoenhancement</strong>; <strong>{'<'}10 HU</strong> does not enhance.</li>
              <li>Place the ROI in the central two-thirds of the mass and keep it away from the edges.</li>
              <li>MRI: a T1-bright cyst (blood or protein) can look like it "enhances." Subtraction (post minus pre) shows whether real enhancement is present.</li>
            </ul>
          </>
        ),
        fields: [
          fComposition,
          { id: 'huPre', label: 'Unenhanced attenuation', kind: 'number', unit: 'HU', showIf: isCt, required: true },
          { id: 'huNephro', label: 'Nephrographic attenuation', kind: 'number', unit: 'HU', showIf: isCt, required: true },
          { ...fSubtraction, showIf: isMri, required: true },
        ],
        derive: (v) => {
          const enh = ctEnhancement(v)
          if (!isCt(v) || !enh) return []
          return [{
            label: `Change ${enh.delta > 0 ? '+' : ''}${enh.delta} HU`,
            value: enh.verdict === 'enhances' ? 'Enhances (≥20 HU)' : enh.verdict === 'equivocal' ? 'Equivocal (10-19 HU), possible pseudoenhancement' : 'Does not enhance (<10 HU)',
            tone: enh.verdict === 'equivocal' ? 'warn' : 'neutral',
          }]
        },
      },
      {
        id: 'bosniak',
        title: 'Step 3. If cystic, classify it with Bosniak',
        learn: 'bosniak',
        teach: (
          <>
            <p>You look at the wall, the septa, and any nodules (<Cite doi="10.1148/radiol.2019182646">Silverman et al., Radiology 2019</Cite>).</p>
            <ul className="plain-list">
              <li><strong>Wall/septa thickness:</strong> thin ≤2 mm, minimally thickened 3 mm, thick ≥4 mm.</li>
              <li><strong>Nodule:</strong> an obtuse protrusion of ≥4 mm, <strong>or</strong> an acute protrusion of any size.</li>
              <li>Class II also includes homogeneous lesions: −9 to 20 HU unenhanced, ≥70 HU unenhanced (hyperdense cyst), 21–30 HU portal venous; very bright on T2 like CSF.</li>
            </ul>
          </>
        ),
        fields: [
          { ...fHomogeneous, showIf: notSolid },
          { id: 'huPv', label: 'Portal venous attenuation (no unenhanced images)', kind: 'number', unit: 'HU', showIf: (v) => notSolid(v) && isCt(v) && str(v, 'homog') === 'yes' },
          { ...fT2Csf, showIf: (v) => notSolid(v) && isMri(v) && str(v, 'homog') === 'yes' },
          { ...fWallEnh, showIf: notSolid },
          { ...fWall, showIf: notSolid },
          { ...fIrregular, showIf: notSolid },
          { ...fSeptaCount, showIf: notSolid },
          { ...fSeptaThick, showIf: (v) => notSolid(v) && (str(v, 'bSepta') === 'few' || str(v, 'bSepta') === 'many') },
          { ...fProtrusion, showIf: notSolid },
          { ...fT1Bright, showIf: (v) => notSolid(v) && isMri(v) },
        ],
        derive: (v) => {
          const b = bosniak(v)
          if (!b) return []
          return [
            { label: 'Bosniak v2019', value: `Class ${b.klass}`, tone: b.klass === 'III' || b.klass === 'IV' ? 'warn' : b.klass === 'I' || b.klass === 'II' ? 'good' : 'neutral' },
            ...(usualAction[b.klass] ? [{ label: 'Usual action', value: usualAction[b.klass] } satisfies Derived] : []),
          ]
        },
      },
      {
        id: 'subtype',
        title: 'Step 4. If solid, try to narrow the subtype',
        learn: 'ccls',
        teach: (
          <>
            <p>The main question is clear cell RCC versus everything else (papillary RCC, oncocytoma, fat-poor AML, chromophobe RCC). On MRI, this is what the ccLS does. It applies to solid masses <strong>without</strong> macroscopic fat (<Cite doi="10.1148/rg.220209">Shetty et al., RadioGraphics 2023</Cite>).</p>
            <ul className="plain-list">
              <li><strong>Clear cell RCC:</strong> T2-bright + intense early enhancement ± microscopic fat → ccLS 4–5.</li>
              <li><strong>Papillary RCC:</strong> T2-dark, homogeneous, mild/slow enhancement → ccLS 1.</li>
              <li><strong>Fat-poor AML:</strong> T2-dark + avid enhancement ± microscopic fat → low ccLS. Suggest this diagnosis in the report.</li>
              <li><strong>Oncocytoma/chromophobe:</strong> intermediate T2, segmental enhancement inversion.</li>
            </ul>
            <p>ccLS is useful, but it does not replace biopsy when the answer would change management (<Cite doi="10.1148/radiol.211680">Schieda et al., Radiology 2022</Cite>).</p>
          </>
        ),
        fields: [
          { ...fT2, showIf: (v) => notCystic(v) && isMri(v) },
          { ...fCm, showIf: (v) => notCystic(v) && isMri(v) },
          { ...fMicroFat, showIf: (v) => notCystic(v) && isMri(v) },
          { ...fSei, showIf: (v) => notCystic(v) && isMri(v) },
          { ...fCcls, showIf: (v) => notCystic(v) && isMri(v) },
          { id: 'diagnosis', label: 'Most likely diagnosis (for the impression)', kind: 'text', placeholder: 'Leave blank to use the derived wording' },
        ],
        derive: (v) => {
          if (!isMri(v) || str(v, 'composition') === 'cystic') return []
          const pattern = cclsPattern(v)
          return pattern ? [{ label: 'Classic pattern', value: `${pattern.name}${pattern.score ? `, ${pattern.score}` : ''}`, tone: 'neutral' }] : []
        },
      },
      {
        id: 'stage',
        title: 'Step 5. Stage it',
        learn: 'staging',
        teach: (
          <ul className="plain-list">
            <li><strong>T1a:</strong> ≤4 cm. <strong>T1b:</strong> 4–7 cm. <strong>T2a:</strong> 7–10 cm. <strong>T2b:</strong> {'>'}10 cm. All confined to the kidney.</li>
            <li><strong>T3a:</strong> tumor in the renal vein or its branches, or in perinephric or renal sinus fat. <strong>T3b:</strong> thrombus in the IVC below the diaphragm. <strong>T3c:</strong> above the diaphragm, or invading the IVC wall.</li>
            <li><strong>T4:</strong> beyond Gerota fascia, or directly invading the ipsilateral adrenal.</li>
            <li>Also look for retroperitoneal nodes and metastases: lung bases, liver, bone, adrenals, pancreas, and the contralateral kidney.</li>
          </ul>
        ),
        fields: [
          { id: 'size1', label: 'Size, first dimension', kind: 'number', unit: 'cm', required: true },
          { id: 'size2', label: 'Size, second dimension', kind: 'number', unit: 'cm' },
          { id: 'size3', label: 'Size, third dimension', kind: 'number', unit: 'cm' },
          fPrior,
          { id: 'priorSize', label: 'Prior size', kind: 'text', placeholder: 'e.g. 2.1 × 1.9', showIf: (v) => str(v, 'prior') === 'yes' },
          { id: 'priorDate', label: 'Prior date', kind: 'text', showIf: (v) => str(v, 'prior') === 'yes' },
          fVein,
          { id: 'veinExtent', label: 'Thrombus extending to', kind: 'text', showIf: (v) => Boolean(str(v, 'vein')) && str(v, 'vein') !== 'none' },
          fFatAdrenal,
          { ...fExtension, showIf: (v) => str(v, 'periFat') === 'involved' },
          fNodes,
          { id: 'nodeDetail', label: 'Nodes: location and size', kind: 'text', showIf: (v) => str(v, 'nodes') === 'enlarged' },
          fMets,
          { ...fMetSites, showIf: (v) => str(v, 'mets') === 'present' },
        ],
        derive: (v) => {
          const stage = tStage(v)
          // Staging is for a mass that looks like cancer, not a benign cyst or an AML.
          if (!stage || (str(v, 'composition') && !looksMalignant(v))) return []
          return [{ label: 'AJCC 8th T', value: `${stage.stage}${stage.note ? ` (${stage.note})` : ''}`, tone: stage.stage.startsWith('T3') || stage.stage === 'T4' ? 'warn' : 'neutral' }]
        },
      },
      {
        id: 'anatomy',
        title: 'Step 6. Surgical anatomy',
        learn: 'staging',
        teach: (
          <ul className="plain-list">
            <li><strong>Relationship to the collecting system and renal sinus.</strong> Decides whether partial nephrectomy is feasible.</li>
            <li><strong>Exophytic vs endophytic, anterior vs posterior, polar location.</strong> The elements of the RENAL nephrometry score.</li>
            <li><strong>Vascular anatomy:</strong> number of renal arteries, early branching, circumaortic or retroaortic left renal vein.</li>
            <li><strong>The other kidney:</strong> present and normal? This matters a great deal if you're recommending nephrectomy.</li>
          </ul>
        ),
        fields: [
          fSide,
          fPole,
          fAp,
          { id: 'exophytic', label: 'Exophytic portion', kind: 'number', unit: '%', min: 0, max: 100 },
          fCollecting,
          { id: 'collectingMm', label: 'Distance to collecting system/renal sinus', kind: 'number', unit: 'mm', showIf: (v) => str(v, 'collecting') === 'distance' },
          { id: 'arteries', label: 'Renal arteries', kind: 'number', min: 0, step: 1 },
          { id: 'earlyBranch', label: 'Early branching', kind: 'choice', options: yesNo },
          fLrv,
          fContra,
          { id: 'contraDetail', label: 'Contralateral kidney: detail', kind: 'text', showIf: (v) => str(v, 'contra') === 'abnormal' },
        ],
      },
    ],
    build,
  },
  learn: [
    { id: 'overview', title: 'Overview', body: learnOverview },
    { id: 'protocol', title: 'Part 1. The protocol (why each phase exists)', body: learnProtocol },
    { id: 'reading', title: 'Part 2. Step-by-step reading', body: learnReading },
    { id: 'bosniak', title: 'Part 3. Bosniak v2019 (cystic masses), simplified', body: learnBosniak },
    { id: 'ccls', title: 'Part 4. Solid masses on MRI: clear cell likelihood score (ccLS)', body: learnCcls },
    { id: 'staging', title: 'Part 5. Staging and surgical anatomy', body: learnStaging },
    { id: 'report', title: 'Part 6. What the report should include', body: learnReport },
    { id: 'cases', title: 'Practice cases', body: learnCases },
  ],
  quiz: [
    {
      id: 'delta-hu',
      question: 'A small intrarenal lesion measures 22 HU unenhanced and 36 HU nephrographic. How do you read the change?',
      options: ['Enhances, so it is a mass', 'Does not enhance', 'Equivocal, often pseudoenhancement', 'Cannot be assessed without a corticomedullary phase'],
      answer: 2,
      explanation: <p>A 14 HU rise falls in the 10–19 HU band, which is equivocal. Often this is pseudoenhancement, a beam-hardening artifact that makes small cysts inside the kidney look like they enhance. Only a rise of ≥20 HU means it enhances.</p>,
    },
    {
      id: 'solid-threshold',
      question: 'In Bosniak v2019, when is a renal mass called solid rather than cystic?',
      options: ['When any enhancing tissue is present', 'When more than about 25% of it is enhancing tissue', 'When more than about 50% of it is enhancing tissue', 'When it measures over 20 HU unenhanced'],
      answer: 1,
      explanation: <p>A mass is solid if more than about 25% of it is enhancing tissue. Anything less is cystic, and you use the Bosniak classification (<Cite doi="10.1148/radiol.2019182646">Silverman et al., Radiology 2019</Cite>).</p>,
    },
    {
      id: 'nodule',
      question: 'A cystic mass has a 5 mm obtuse enhancing bump on its wall. Which Bosniak v2019 class?',
      options: ['II', 'IIF', 'III', 'IV'],
      answer: 3,
      explanation: <p>A nodule is an obtuse protrusion of ≥4 mm, or an acute protrusion of any size. One or more enhancing nodules is class IV. An obtuse protrusion of ≤3 mm is only irregularity, class III (<Cite doi="10.1148/radiol.2019182646">Silverman et al., Radiology 2019</Cite>).</p>,
    },
    {
      id: 'fat-calcium',
      question: 'A renal mass contains regions below −10 HU and also contains calcification. What does the lesson say?',
      options: ['Fat plus calcification is a warning sign: rarely, RCC can engulf fat', 'It is essentially an angiomyolipoma', 'Calcification excludes macroscopic fat', 'Assign ccLS 1'],
      answer: 0,
      explanation: <p>Fat without calcification is essentially an AML. Fat plus calcification is a warning sign, because RCC can rarely engulf fat.</p>,
    },
    {
      id: 'fat-poor-aml',
      question: 'A solid mass on MRI is T2-dark with avid enhancement and no macroscopic fat. Which diagnosis should you suggest in the report?',
      options: ['Clear cell RCC', 'Oncocytoma', 'Fat-poor AML', 'Hemorrhagic cyst'],
      answer: 2,
      explanation: <p>T2-dark + avid enhancement ± microscopic fat is the fat-poor AML pattern, with a low ccLS; suggest this diagnosis in the report. T2-dark with mild enhancement would favor papillary RCC instead (<Cite doi="10.1148/rg.220209">Shetty et al., RadioGraphics 2023</Cite>).</p>,
    },
    {
      id: 't3c',
      question: 'Tumor thrombus extends into the IVC above the diaphragm. What T stage?',
      options: ['T3a', 'T3c', 'T3b', 'T4'],
      answer: 1,
      explanation: <p>T3b is thrombus in the IVC below the diaphragm. T3c is thrombus in the IVC above the diaphragm, or invading the IVC wall. T4 is beyond Gerota fascia or direct invasion of the ipsilateral adrenal.</p>,
    },
    {
      id: 'subtraction',
      question: 'A cystic lesion is bright on unenhanced T1. What tells you whether it truly enhances?',
      options: ['Subtraction images (post minus pre)', 'DWI', 'Opposed-phase signal drop', 'T2 signal compared with cortex'],
      answer: 0,
      explanation: <p>A cyst that is bright on T1 (blood or protein) can look like it "enhances." Subtraction, the most important MRI trick, shows whether real enhancement is present. DWI is supportive only and never used alone.</p>,
    },
    {
      id: 'management',
      question: 'In the national survey, what did most urologists prefer for solid masses and Bosniak III–IV?',
      options: ['A recommendation for biopsy', 'A recommendation for surveillance intervals', 'The RENAL nephrometry score in the impression', 'No management recommendations'],
      answer: 3,
      explanation: <p>Most urologists preferred no management recommendations for solid masses or Bosniak III–IV. They did want the nephrometry features (<Cite doi="10.1007/s00261-016-0962-x">Davenport et al., Abdom Radiol 2017</Cite>).</p>,
    },
  ],
}

export function RenalMassStudyPage() {
  return <StudyPage study={study} />
}
