import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, LearnSection, Option, QuizQuestion, ReportStep, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Megibow AJ et al. Management of incidental pancreatic cysts: a white paper of the ACR Incidental Findings Committee. J Am Coll Radiol 2017;14:911–923.', doi: '10.1016/j.jacr.2017.03.010' },
  { citation: 'Ohtsuka T, Fernandez-del Castillo C, et al. International evidence-based Kyoto guidelines for the management of IPMN of the pancreas. Pancreatology 2024;24:255–270. (open access)', doi: '10.1016/j.pan.2023.12.009' },
  { citation: 'Tanaka M et al. Revisions of international consensus Fukuoka guidelines for the management of IPMN of the pancreas. Pancreatology 2017;17:738–753.', doi: '10.1016/j.pan.2017.07.007' },
  { citation: 'European Study Group on Cystic Tumours of the Pancreas. European evidence-based guidelines on pancreatic cystic neoplasms. Gut 2018;67:789–804. (The third major guideline; uses ≥40 mm and MPD 5–9.9 mm as relative indications.)', doi: '10.1136/gutjnl-2018-316027' },
  { citation: 'Vege SS et al. AGA guideline on asymptomatic neoplastic pancreatic cysts. Gastroenterology 2015;148:819–822.', doi: '10.1053/j.gastro.2015.01.015' },
  { citation: 'Sahani DV et al. Cystic pancreatic lesions: a simple imaging-based classification. RadioGraphics 2005;25:1471–1484.', doi: '10.1148/rg.256045161' },
  { citation: 'Freeny PC, Saunders MD. Moving beyond morphology: characterization and management of cystic pancreatic lesions. Radiology 2014;272:345–363.', doi: '10.1148/radiol.14131126' },
  { citation: 'Kang MJ et al. Size of main-duct dilatation in IPMN. World J Surg 2015;39:2006–2013. (Source of the ACR 7 mm threshold.)', doi: '10.1007/s00268-015-3062-0' },
  { citation: 'Zelga P et al. Number of worrisome features and risk of malignancy in IPMN. J Am Coll Surg 2022;234:1021–1030.', doi: '10.1097/XCS.0000000000000176' },
  { citation: 'Brook OR et al. Delayed growth in incidental pancreatic cysts. Radiology 2016;278:752–761.', doi: '10.1148/radiol.2015140972' },
  { citation: 'Pandey P et al. Follow-up of incidentally detected pancreatic cystic neoplasms: do baseline MRI and CT features predict growth? Radiology 2019;292:647–654.', doi: '10.1148/radiol.2019181686' },
  { citation: 'Han Y et al. Progression of BD-IPMN associates with cyst size. Gastroenterology 2018;154:576–584.', doi: '10.1053/j.gastro.2017.10.013' },
  { citation: 'Oyama H et al. Long-term risk of malignancy in BD-IPMN. Gastroenterology 2020;158:226–237.', doi: '10.1053/j.gastro.2019.08.032' },
  { citation: 'Marchegiani G et al. Surveillance for presumed BD-IPMN: stability, size, and age identify targets for discontinuation. Gastroenterology 2023;165:1016–1024.', doi: '10.1053/j.gastro.2023.06.022' },
  { citation: 'Chernyak V et al. Incidental pancreatic cystic lesions: relationship with PDAC and all-cause mortality. Radiology 2015;274:161–169.', doi: '10.1148/radiol.14140796' },
  { citation: 'Jais B et al. Serous cystic neoplasm of the pancreas: multinational study of 2622 patients. Gut 2016;65:305–312.', doi: '10.1136/gutjnl-2015-309638' },
  { citation: 'Pozzi-Mucelli RM et al. Pancreatic MRI for surveillance of cystic neoplasms: short versus comprehensive protocol. Eur Radiol 2017;27:41–50.', doi: '10.1007/s00330-016-4377-4' },
]

const reportTemplate = `Pancreas:
Cyst location: __ (uncinate / head / neck / body / tail).
Size: __ mm long axis (series __, image __). Prior: __ mm on [date].
Growth: none / __% (meets / does not meet ACR growth definition); rate ~__ mm/yr.
Morphology: unilocular / multilocular / microcystic / cyst-by-cyst; wall thin / thickened;
  septations; calcification (central / peripheral / none).
Communication with MPD: present / absent / indeterminate.
MPD maximum caliber: __ mm at __; abrupt caliber change with upstream atrophy: yes / no.
Mural nodule or solid component: none / __ mm, enhancing / non-enhancing.
Other cysts: number, largest __ mm at __; each without worrisome features.
Remainder of gland: no focal hypoenhancing mass; no duct stricture; biliary tree normal.
Nodes: none enlarged.

Impression:
__ mm [presumed branch-duct IPMN / indeterminate cyst, presumed mucinous /
  serous cystadenoma] in the pancreatic __.
Worrisome features: none / [list, count]. High-risk stigmata: none / [list].
Stable since [date] / new / enlarged.
Recommendation: [interval and modality] per ACR 2017 incidental pancreatic cyst
  recommendations — or — EUS/FNA and surgical consultation advised because of [feature].`

const DOI = {
  acr: '10.1016/j.jacr.2017.03.010',
  kyoto: '10.1016/j.pan.2023.12.009',
  kang: '10.1007/s00268-015-3062-0',
  zelga: '10.1097/XCS.0000000000000176',
  brook: '10.1148/radiol.2015140972',
  pandey: '10.1148/radiol.2019181686',
}

/* Options. Value ids are short and stable; labels are the report wording. */

const PROTOCOL: Option[] = [
  { value: 'mri', label: 'Contrast-enhanced MRI/MRCP' },
  { value: 'ppct', label: 'Pancreas-protocol CT' },
  { value: 'pvct', label: 'Portal-phase CT only' },
  { value: 'other', label: 'Other / incidental exam' },
]
const YES_NO: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]
const LOCATION: Option[] = [
  { value: 'uncinate', label: 'uncinate' },
  { value: 'head', label: 'head' },
  { value: 'neck', label: 'neck' },
  { value: 'body', label: 'body' },
  { value: 'tail', label: 'tail' },
]
const MORPHOLOGY: Option[] = [
  { value: 'uni', label: 'unilocular' },
  { value: 'multi', label: 'multilocular' },
  { value: 'micro', label: 'microcystic' },
  { value: 'cbc', label: 'cyst-by-cyst' },
]
const WALL: Option[] = [
  { value: 'thin', label: 'thin' },
  { value: 'thick', label: 'thickened / enhancing' },
]
const SEPTA: Option[] = [
  { value: 'no', label: 'none' },
  { value: 'yes', label: 'present' },
]
const CALC: Option[] = [
  { value: 'none', label: 'none' },
  { value: 'central', label: 'central' },
  { value: 'peripheral', label: 'peripheral' },
]
const CYST_TYPE: Option[] = [
  { value: 'bd', label: 'presumed branch-duct IPMN' },
  { value: 'muc', label: 'indeterminate cyst, presumed mucinous' },
  { value: 'sca', label: 'serous cystadenoma' },
  { value: 'other', label: 'other (specify)' },
]
const COMM: Option[] = [
  { value: 'present', label: 'present' },
  { value: 'absent', label: 'absent' },
  { value: 'indet', label: 'indeterminate' },
]
const NODULE: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'nodule', label: 'Mural nodule' },
  { value: 'solid', label: 'Solid component' },
]
const ENHANCE: Option[] = [
  { value: 'enh', label: 'enhancing' },
  { value: 'nonenh', label: 'non-enhancing' },
]
const CLINICAL: Option[] = [
  { value: 'jaundice', label: 'Obstructive jaundice' },
  { value: 'ca199', label: 'Elevated CA19-9' },
  { value: 'pancreatitis', label: 'Pancreatitis' },
  { value: 'diabetes', label: 'New-onset or worsening diabetes within the past year' },
  { value: 'cytology', label: 'Suspicious or positive cytology (EUS-FNA)' },
]
const PRIOR_STATUS: Option[] = [
  { value: 'first', label: 'No prior imaging' },
  { value: 'new', label: 'New since prior' },
]
const ABSENT_PRESENT: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const BILIARY: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'dilated', label: 'Dilated' },
]
const NODES: Option[] = [
  { value: 'none', label: 'None enlarged' },
  { value: 'enlarged', label: 'Enlarged' },
]
const MULTIPLICITY: Option[] = [
  { value: 'single', label: 'Single cyst' },
  { value: 'multiple', label: 'Multiple cysts' },
]
const OTHERS_WF: Option[] = [
  { value: 'yes', label: 'Each without WF' },
  { value: 'no', label: 'WF in another cyst' },
]
const REC_SOURCE: Option[] = [
  { value: 'acr', label: 'ACR 2017' },
  { value: 'kyoto', label: 'Kyoto 2024' },
  { value: 'custom', label: 'Write my own' },
]

function label(options: Option[], value: string) {
  return optionLabel({ options }, value)
}

/** Millimetres without trailing zeros, e.g. 1.5, 12. */
function mm(n: number) {
  return String(Math.round(n * 10) / 10)
}

/* Rules from the lesson. */

type Growth = { pct: number; threshold: number; meets: boolean; rate?: number }

/**
 * ACR growth by size on the prior study: under 0.5 cm, 100% increase in long axis;
 * 0.5 to under 1.5 cm, 50%; 1.5 cm and larger, 20%.
 */
function growth(v: Values): Growth | undefined {
  const size = num(v, 'size')
  const prior = num(v, 'priorSize')
  if (size === undefined || prior === undefined || prior <= 0) return undefined
  const pct = ((size - prior) / prior) * 100
  const threshold = prior < 5 ? 100 : prior < 15 ? 50 : 20
  const months = num(v, 'interval')
  const rate = months !== undefined && months > 0 ? (size - prior) / (months / 12) : undefined
  return { pct, threshold, meets: pct >= threshold, rate }
}

/** `acr` holds ACR-only worrisome features, kept out of the Kyoto count. */
type Features = { wf: string[]; hrs: string[]; acr: string[]; notes: string[] }

/**
 * Worrisome features and high-risk stigmata in Kyoto 2024 terms (the list whose count the
 * lesson puts in the impression), plus the two ACR-only items: a non-enhancing mural
 * nodule (ACR worrisome) and an enhancing solid component (ACR high-risk).
 */
function features(v: Values): Features {
  const wf: string[] = []
  const hrs: string[] = []
  const acr: string[] = []
  const notes: string[] = []
  const size = num(v, 'size')
  const mpd = num(v, 'mpd')
  const nodule = str(v, 'nodule')
  const enhance = str(v, 'enhance')
  const noduleSize = num(v, 'noduleSize')
  const clinical = list(v, 'clinical')
  const location = str(v, 'location')

  if (clinical.includes('jaundice')) {
    if (location === 'head' || location === 'uncinate') hrs.push('obstructive jaundice with a head cyst')
    else notes.push('Obstructive jaundice is a high-risk stigma with a head cyst; this cyst is not marked as in the head.')
  }
  if (nodule === 'nodule' && enhance === 'enh') {
    if (noduleSize === undefined) notes.push('Enhancing mural nodule: state its size (Kyoto: 5 mm or more is a high-risk stigma).')
    else if (noduleSize >= 5) hrs.push(`enhancing mural nodule ${mm(noduleSize)} mm`)
    else wf.push(`enhancing mural nodule ${mm(noduleSize)} mm`)
  }
  if (nodule === 'solid' && enhance === 'enh') hrs.push('enhancing solid component')
  if (nodule === 'solid' && enhance === 'nonenh') notes.push('Non-enhancing solid component: the lesson does not classify it (it notes a nodule and a solid component are hard to tell apart and both count as high-risk). Describe it and decide the recommendation yourself.')
  if (mpd !== undefined && mpd >= 10) hrs.push(`main pancreatic duct ${mm(mpd)} mm`)
  if (clinical.includes('cytology')) hrs.push('suspicious or positive cytology')

  if (size !== undefined && size >= 30 && str(v, 'type') !== 'sca') wf.push(`cyst ${mm(size)} mm`)
  if (str(v, 'wall') === 'thick') wf.push('thickened/enhancing wall')
  if (nodule === 'nodule' && enhance === 'nonenh') acr.push('non-enhancing mural nodule')
  if (mpd !== undefined && mpd >= 5 && mpd < 10) {
    wf.push(`main pancreatic duct ${mm(mpd)} mm`)
    if (mpd < 7) notes.push(`MPD ${mm(mpd)} mm is worrisome by Kyoto (5–9 mm) but below the ACR 7 mm cutoff: report the number.`)
  }
  if (str(v, 'abrupt') === 'yes') wf.push('abrupt caliber change with upstream atrophy')
  if (str(v, 'nodes') === 'enlarged') wf.push('lymphadenopathy')
  if (clinical.includes('ca199')) wf.push('elevated CA19-9')
  const g = growth(v)
  if (g?.rate !== undefined && g.rate >= 2.5) wf.push(`growth ${mm(g.rate)} mm/yr`)
  if (clinical.includes('pancreatitis')) wf.push('pancreatitis')
  if (clinical.includes('diabetes')) wf.push('new-onset or worsening diabetes within the past year')
  return { wf, hrs, acr, notes }
}

/** Zelga et al.: risk of high-grade dysplasia or cancer by number of worrisome features. */
function zelgaRisk(count: number) {
  if (count <= 0) return undefined
  return count === 1 ? '22%' : count === 2 ? '34%' : count === 3 ? '59%' : '100%'
}

/**
 * The ACR "universal override" printed on every chart: any mural nodule, wall thickening,
 * MPD dilation of 7 mm or more, or biliary obstruction/jaundice prompts immediate EUS/FNA
 * and surgical evaluation regardless of cyst size or growth.
 */
function acrOverride(v: Values): string[] {
  const reasons: string[] = []
  const mpd = num(v, 'mpd')
  if (str(v, 'nodule') === 'nodule') reasons.push('mural nodule')
  if (str(v, 'wall') === 'thick') reasons.push('wall thickening')
  if (mpd !== undefined && mpd >= 7) reasons.push(`main pancreatic duct ${mm(mpd)} mm`)
  if (list(v, 'clinical').includes('jaundice')) reasons.push('biliary obstruction/jaundice')
  else if (str(v, 'biliary') === 'dilated') reasons.push('biliary dilatation')
  return reasons
}

function acrChart(v: Values): string | undefined {
  const size = num(v, 'size')
  const age = num(v, 'age')
  if (age !== undefined && age >= 80) return 'Chart 4 (80 or older)'
  if (size === undefined) return undefined
  if (size < 15) return 'Chart 1 (under 1.5 cm)'
  if (size <= 25) return str(v, 'comm') === 'present' ? 'Chart 2A (1.5–2.5 cm, communicating)' : 'Chart 2B (1.5–2.5 cm, communication absent or unknown)'
  return 'Chart 3 (over 2.5 cm)'
}

const PER_ACR = 'per ACR 2017 incidental pancreatic cyst recommendations'
const IMAGING = 'Contrast-enhanced MRI or pancreas-protocol CT'

/** Confident SCA: no surveillance for malignancy; over 4 cm or symptomatic may need resection. */
function scaRecommendation(v: Values): string {
  const size = num(v, 'size')
  if (size === undefined) return 'Serous cystadenoma with classic features: no surveillance for malignancy needed; an SCA over 4 cm or symptomatic may need resection because of expected growth.'
  if (size > 40) return 'Serous cystadenoma over 4 cm: resection may be needed because of expected growth; follow-up depends on symptoms.'
  const asym = str(v, 'symptomatic') === 'no' ? 'and asymptomatic' : 'and if asymptomatic'
  return `Serous cystadenoma with classic features: no surveillance for malignancy needed. ${size < 40 ? 'Below 4 cm' : 'Not over 4 cm'} ${asym}, no surgical referral.`
}

function acrRecommendation(v: Values, f: Features, warnings: string[]): string {
  if (str(v, 'symptomatic') === 'yes') {
    return 'The ACR 2017 incidental cyst algorithm does not apply to a symptomatic patient; referral advised.'
  }
  const size = num(v, 'size')
  const age = num(v, 'age')
  const g = growth(v)
  const prior = num(v, 'priorSize')
  const surgicalCandidate = age !== undefined && age >= 80 ? ' if the patient is a surgical candidate' : ''

  const periph = size !== undefined && size > 25 && str(v, 'calc') === 'peripheral' ? ['peripheral calcification'] : []
  // High-risk stigmata first; skip the override items they already name.
  const covered = (reason: string) =>
    (reason === 'mural nodule' && f.hrs.some((h) => h.includes('mural nodule'))) ||
    (reason === 'biliary obstruction/jaundice' && f.hrs.some((h) => h.includes('jaundice')))
  const reasons = [...new Set([...f.hrs, ...acrOverride(v).filter((r) => !covered(r)), ...periph])]
  if (reasons.length > 0) {
    if (str(v, 'type') === 'sca') warnings.push('Serous cystadenoma marked, but the ACR universal override or a high-risk stigma applies: the recommendation follows the override.')
    return `EUS/FNA and surgical consultation advised${surgicalCandidate} because of ${reasons.join(', ')}.`
  }
  if (str(v, 'type') === 'sca') return scaRecommendation(v)
  if (str(v, 'abrupt') === 'yes') {
    return `Pancreas-protocol CT or MRI with pancreatic phase, and EUS, advised${surgicalCandidate} because of an abrupt caliber change with upstream atrophy (worrisome feature; possible concomitant adenocarcinoma).`
  }

  if (age !== undefined && age >= 80) {
    if (size !== undefined && size < 5) return `White-dot cyst in a patient 80 or older: follow-up only if the patient would be a surgical candidate, and then a single follow-up at 2 years at most, ${PER_ACR}.`
    return size !== undefined && size <= 25
      ? `Follow-up or EUS/FNA only if the patient is a surgical candidate; if so, imaging every 2 years twice, stopping if stable, ${PER_ACR} (Chart 4).`
      : `Follow-up or EUS/FNA advised only if the patient is a surgical candidate, ${PER_ACR} (Chart 4).`
  }
  if (size === undefined) return ''

  if (size < 15) {
    if (g?.meets) return `Growth by the ACR definition: increase imaging frequency to yearly or EUS/FNA, ${PER_ACR} (Chart 1).`
    if (size < 5) return `Single follow-up at 2 years; stop if stable, ${PER_ACR} (Chart 1, white-dot cyst).`
    if (age === undefined) {
      warnings.push('State the patient age: the ACR Chart 1 interval depends on it (under 65, 65–79, 80 or older).')
      return ''
    }
    if (age < 65) return `${IMAGING} yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years, ${PER_ACR} (Chart 1).`
    return `${IMAGING} every 2 years for 5 rounds; stop if still under 1.5 cm over 10 years, ${PER_ACR} (Chart 1).`
  }

  if (size <= 25) {
    if (g?.meets && (prior === undefined || prior < 20)) warnings.push('Growth by the ACR definition (20%) in a Chart 2 cyst: the lesson gives EUS/FNA only for a cyst of 2 cm or more with definable growth; decide the next step.')
    if (g?.meets && prior !== undefined && prior >= 20) return `EUS/FNA advised because of definable growth in a cyst of 2 cm or more, ${PER_ACR} (Chart 2).`
    if (str(v, 'comm') === 'present') {
      return size < 20
        ? `${IMAGING} yearly for 5 years, then every 2 years for 4 years, ${PER_ACR} (Chart 2A); EUS/FNA at detection is an acceptable alternative.`
        : `${IMAGING} every 6 months for 2 years, yearly for 2, then every 2 years for 6, ${PER_ACR} (Chart 2A); EUS/FNA at detection is an acceptable alternative.`
    }
    return `${IMAGING} every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or EUS/FNA to establish whether it is mucinous, ${PER_ACR} (Chart 2B).`
  }

  // Chart 3: low-risk only when every low-risk item is actually stated.
  const mpd = num(v, 'mpd')
  const unknown = [
    str(v, 'nodule') !== 'none' && 'mural nodule',
    str(v, 'wall') !== 'thin' && 'wall',
    (mpd === undefined || mpd >= 5) && 'duct caliber',
    str(v, 'calc') === '' && 'calcification',
  ].filter((item): item is string => Boolean(item))
  if (unknown.length === 0) {
    return `Low-risk by imaging (no mural nodule, no wall thickening, normal-caliber duct, no peripheral calcification): careful follow-up, or EUS/FNA at detection, ${PER_ACR} (Chart 3).`
  }
  warnings.push(`ACR Chart 3 risk not established (${unknown.join(', ')}): low-risk needs no mural nodule, no wall thickening, a normal-caliber duct and no peripheral calcification.`)
  return `Cyst over 2.5 cm: low-risk cysts can be carefully followed and high-risk cysts go to EUS/FNA and surgical evaluation; EUS/FNA at detection is an option, ${PER_ACR} (Chart 3).`
}

function kyotoRecommendation(v: Values, f: Features, warnings: string[]): string {
  const size = num(v, 'size')
  const nodule = str(v, 'nodule')
  if (f.hrs.length > 0) return `Surgical evaluation advised in a fit patient because of high-risk stigmata (${f.hrs.join(', ')}), per Kyoto 2024.`
  if (f.wf.length > 0) {
    const many = f.wf.length > 1 ? ' Multiple worrisome features push toward surgery.' : ''
    return `EUS (with contrast and/or FNA where available) advised because of ${f.wf.join(', ')}, per Kyoto 2024.${many}`
  }
  if (nodule === 'nodule' && (str(v, 'enhance') === '' || (str(v, 'enhance') === 'enh' && num(v, 'noduleSize') === undefined))) {
    warnings.push('Mural nodule: state its enhancement and size before applying Kyoto 2024.')
    return ''
  }
  if (str(v, 'type') === 'sca') return scaRecommendation(v)
  if (size === undefined) return ''
  if (size < 20) return 'MRI surveillance at 6 months, then every 18 months if stable, per Kyoto 2024; stopping may be considered after 5 stable years.'
  if (size < 30) return 'MRI surveillance at 6 months twice, then yearly, per Kyoto 2024.'
  return 'MRI surveillance every 6 months, per Kyoto 2024.'
}

function recommendation(v: Values, f: Features, warnings: string[]): string {
  const source = str(v, 'recSource')
  if (source === 'custom') return str(v, 'recText')
  if (source === 'kyoto') return kyotoRecommendation(v, f, warnings)
  const rec = acrRecommendation(v, f, warnings)
  // Kyoto worrisome features the ACR charts do not act on.
  const kyotoOnly = f.wf.filter((w) => !/^cyst |thickened|main pancreatic duct|abrupt/.test(w))
  if (kyotoOnly.length > 0 && !rec.startsWith('EUS/FNA') && !rec.startsWith('The ACR')) {
    warnings.push(`Worrisome features outside the ACR chart logic (${kyotoOnly.join(', ')}): Kyoto sends worrisome features to EUS.`)
  }
  return rec
}

function count(items: string[]) {
  return items.length === 0 ? 'none' : `${items.length} (${items.join('; ')})`
}

/* Report steps. */

const steps: ReportStep[] = [
  {
    id: 'protocol',
    title: 'Step 1. Check the protocol and gather all old scans',
    learn: 'read',
    teach: (
      <>
        <p>The <Cite doi={DOI.acr}>ACR paper</Cite> accepts either contrast-enhanced MRI or pancreas-protocol CT for follow-up. On MRI you want fat-suppressed T2, thin-slice 3D MRCP, and contrast-enhanced T1 in arterial, early portal, and late portal phases.</p>
        <p>Then look at <em>everything</em> old: chest CT, spine CT or MRI, PET/CT, abdominal ultrasound. Use the date of the earliest prior as the baseline for the follow-up clock, and name that baseline date in the report.</p>
        <p>The ACR flowcharts apply only to asymptomatic adults with an incidentally found cyst; with jaundice, weight loss, a palpable mass, steatorrhea, or an elevated amylase the algorithm does not apply and the patient should be referred.</p>
      </>
    ),
    fields: [
      { id: 'protocol', label: 'Exam', kind: 'choice', options: PROTOCOL },
      { id: 'age', label: 'Patient age', kind: 'number', unit: 'years', min: 0, max: 120, help: 'Sets the ACR chart: under 65, 65–79, 80 or older.' },
      { id: 'symptomatic', label: 'Symptoms (jaundice, weight loss, palpable mass, steatorrhea, raised amylase)?', kind: 'choice', options: YES_NO },
      { id: 'baseline', label: 'Baseline date (earliest prior showing the pancreas)', kind: 'text', placeholder: 'e.g. 2019-03-02 chest CT' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (str(v, 'protocol') === 'pvct') out.push({ label: 'Protocol', value: 'Single phase, not optimized', tone: 'warn' })
      if (str(v, 'symptomatic') === 'yes') out.push({ label: 'ACR algorithm', value: 'Does not apply: refer', tone: 'warn' })
      const chart = acrChart(v)
      if (chart) out.push({ label: 'ACR', value: chart })
      return out
    },
  },
  {
    id: 'name',
    title: 'Step 2. Try to give the cyst a name',
    learn: 'read',
    teach: (
      <>
        <p>Every incidental cyst is presumed to be mucinous (usually a small IPMN) unless it has definitive features of something else, such as a serous cystadenoma.</p>
        <ul className="plain-list">
          <li>Central calcification points to SCA; peripheral calcification points to MCN, and is more strongly linked with frank malignancy.</li>
          <li>MCNs live in the tail; branch-duct IPMNs are most often in the head and uncinate.</li>
          <li>SCA: honeycomb or sponge of tiny cysts with a central scar. BD-IPMN: grape-like cluster, "cyst by cyst".</li>
        </ul>
        <p>Cysts under 10 mm are difficult or impossible to characterize, and 1–3 cm cysts are often indeterminate unless you can prove duct communication. "Indeterminate, presumed mucinous" is an acceptable answer.</p>
      </>
    ),
    fields: [
      { id: 'location', label: 'Cyst location', kind: 'choice', options: LOCATION, required: true },
      { id: 'morphology', label: 'Morphology', kind: 'choice', options: MORPHOLOGY, required: true },
      { id: 'wall', label: 'Wall', kind: 'choice', options: WALL },
      { id: 'septa', label: 'Septations', kind: 'choice', options: SEPTA },
      { id: 'calc', label: 'Calcification', kind: 'choice', options: CALC },
      { id: 'type', label: 'Presumed diagnosis', kind: 'choice', options: CYST_TYPE, required: true },
      { id: 'typeOther', label: 'Diagnosis', kind: 'text', placeholder: 'e.g. solid pseudopapillary neoplasm', showIf: (v) => str(v, 'type') === 'other' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const calc = str(v, 'calc')
      if (calc === 'central') out.push({ label: 'Central calcification', value: 'Points to SCA' })
      if (calc === 'peripheral') out.push({ label: 'Peripheral calcification', value: 'Points to MCN', tone: 'warn' })
      const size = num(v, 'size')
      if (size !== undefined && size < 10) out.push({ label: 'Under 10 mm', value: 'Hard to characterize' })
      return out
    },
  },
  {
    id: 'duct',
    title: 'Step 3. Does it communicate with the main pancreatic duct?',
    learn: 'read',
    teach: (
      <>
        <p>This is the single most useful thing you can establish, because it converts "indeterminate cyst" into "branch-duct IPMN." Scroll the thin MRCP source images, not just the MIP, and look for a thin neck connecting the cyst to the duct.</p>
        <p>From <Cite doi={DOI.kyoto}>Kyoto</Cite>: a cyst larger than 5 mm that communicates with the main duct is a BD-IPMN (rule out pseudocyst if there is a pancreatitis or trauma history).</p>
        <p>Record the widest main duct diameter even if it's away from the cyst. Kyoto: 5–9 mm worrisome, 10 mm or more high-risk; the ACR uses a 7 mm cutoff (<Cite doi={DOI.kang}>Kang et al.</Cite>). A small fusiform bulge where the cyst neck inserts is not main-duct involvement.</p>
      </>
    ),
    fields: [
      { id: 'comm', label: 'Communication with MPD', kind: 'choice', options: COMM, required: true },
      { id: 'mpd', label: 'MPD maximum caliber', kind: 'number', unit: 'mm', min: 0, step: 0.1, required: true, help: 'Kyoto: 5–9 mm worrisome, 10 mm or more high-risk. ACR: 7 mm.' },
      { id: 'mpdSite', label: 'Where measured', kind: 'text', placeholder: 'e.g. body' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const size = num(v, 'size')
      if (str(v, 'comm') === 'present' && size !== undefined && size > 5) out.push({ label: 'Kyoto definition', value: 'BD-IPMN' })
      const mpd = num(v, 'mpd')
      if (mpd !== undefined) {
        if (mpd >= 10) out.push({ label: 'MPD', value: 'High-risk stigma (10 mm or more)', tone: 'warn' })
        else if (mpd >= 7) out.push({ label: 'MPD', value: 'Worrisome (Kyoto 5–9 mm; ACR 7 mm)', tone: 'warn' })
        else if (mpd >= 5) out.push({ label: 'MPD', value: 'Worrisome by Kyoto, below ACR 7 mm', tone: 'warn' })
        else out.push({ label: 'MPD', value: 'Below 5 mm', tone: 'good' })
      }
      return out
    },
  },
  {
    id: 'measure',
    title: 'Step 4. Measure the cyst the standard way',
    learn: 'read',
    teach: (
      <p>Record one measurement: the greatest length of the cyst in its long axis on either the axial or coronal image, and state the series and image numbers. The <Cite doi={DOI.acr}>ACR</Cite> chose this single-axis method over 3D volumes because it's more reproducible. Consistency matters more than precision: you'll be comparing your number against someone else's two years from now.</p>
    ),
    fields: [
      { id: 'size', label: 'Long axis', kind: 'number', unit: 'mm', min: 0, step: 0.1, required: true },
      { id: 'series', label: 'Series', kind: 'text' },
      { id: 'image', label: 'Image', kind: 'text' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const size = num(v, 'size')
      if (size === undefined) return out
      if (size >= 30 && str(v, 'type') !== 'sca') out.push({ label: 'Size', value: 'Worrisome (3 cm or more)', tone: 'warn' })
      const chart = acrChart(v)
      if (chart) out.push({ label: 'ACR', value: chart })
      return out
    },
  },
  {
    id: 'features',
    title: 'Step 5. Hunt for worrisome features and high-risk stigmata',
    learn: 'read',
    teach: (
      <>
        <p>Use the exact phrases "worrisome features" and "high-risk stigmata"; clinicians who treat pancreatic disease universally understand them.</p>
        <ul className="plain-list">
          <li><strong>High-risk stigmata:</strong> obstructive jaundice with a head cyst; enhancing mural nodule 5 mm or more (ACR: enhancing solid component); MPD 10 mm or more; Kyoto adds suspicious or positive cytology.</li>
          <li><strong>Worrisome features (Kyoto):</strong> cyst 3 cm or more; enhancing nodule under 5 mm; thickened/enhancing wall; MPD 5–9 mm; abrupt caliber change with atrophy; lymphadenopathy; elevated CA19-9; growth 2.5 mm/year or more; pancreatitis; new-onset or worsening diabetes within the past year. ACR also lists a non-enhancing mural nodule.</li>
        </ul>
        <p>A mural nodule matters most if it <strong>enhances</strong>, because that means it's tissue, not mucin or debris. The features add up: <Cite doi={DOI.zelga}>Zelga et al.</Cite> found the risk of high-grade dysplasia or cancer rises to 22% with one, 34% with two, 59% with three, and 100% with four or more. Count them and put the count in your impression.</p>
      </>
    ),
    fields: [
      { id: 'nodule', label: 'Mural nodule or solid component', kind: 'choice', options: NODULE, required: true, help: 'Say "none" explicitly: silence reads as "not looked for."' },
      { id: 'enhance', label: 'Enhancement', kind: 'choice', options: ENHANCE, required: true, showIf: (v) => str(v, 'nodule') !== '' && str(v, 'nodule') !== 'none' },
      { id: 'noduleSize', label: 'Nodule or solid component size', kind: 'number', unit: 'mm', min: 0, step: 0.1, required: true, showIf: (v) => str(v, 'nodule') !== '' && str(v, 'nodule') !== 'none' },
      { id: 'clinical', label: 'Clinical features, if known', kind: 'multi', options: CLINICAL },
    ],
    derive: (v) => {
      const f = features(v)
      const out: Derived[] = [
        { label: 'Worrisome features', value: String(f.wf.length), tone: f.wf.length > 0 ? 'warn' : 'good' },
        { label: 'High-risk stigmata', value: String(f.hrs.length), tone: f.hrs.length > 0 ? 'warn' : 'good' },
      ]
      const risk = zelgaRisk(f.wf.length)
      if (risk) out.push({ label: 'HGD or cancer (Zelga)', value: risk, tone: 'warn' })
      return out
    },
  },
  {
    id: 'growth',
    title: 'Step 6. Decide whether it has grown (and how fast)',
    learn: 'read',
    teach: (
      <>
        <p>The <Cite doi={DOI.acr}>ACR</Cite> uses percentages that scale with size: cysts under 0.5 cm, growth = 100% increase in long axis; 0.5 to under 1.5 cm, 50%; 1.5 cm and larger, 20%. A rate above 2 mm/year helps separate aggressive from indolent cysts.</p>
        <p><Cite doi={DOI.kyoto}>Kyoto</Cite> uses a single rate: 2.5 mm/year or more is worrisome (replacing the old 5 mm per 2 years).</p>
        <p>A 1 mm change over four and a half years is measurement noise (<Cite doi={DOI.pandey}>Pandey et al.</Cite>); don't call that growth. But beware delayed growth after years of stability (<Cite doi={DOI.brook}>Brook et al.</Cite>).</p>
      </>
    ),
    fields: [
      { id: 'priorSize', label: 'Prior long axis', kind: 'number', unit: 'mm', min: 0, step: 0.1 },
      { id: 'priorDate', label: 'Prior date', kind: 'text', placeholder: 'e.g. 2024-01-15', showIf: (v) => num(v, 'priorSize') !== undefined },
      { id: 'interval', label: 'Interval since prior', kind: 'number', unit: 'months', min: 0, showIf: (v) => num(v, 'priorSize') !== undefined, help: 'For the growth rate in mm/yr.' },
      { id: 'priorStatus', label: 'No prior measurement', kind: 'choice', options: PRIOR_STATUS, required: true, showIf: (v) => num(v, 'priorSize') === undefined },
    ],
    derive: (v) => {
      const g = growth(v)
      if (!g) return []
      const out: Derived[] = [
        { label: 'Change', value: `${g.pct >= 0 ? '+' : ''}${Math.round(g.pct)}%` },
        { label: `ACR growth (${g.threshold}%)`, value: g.meets ? 'Meets' : 'Does not meet', tone: g.meets ? 'warn' : 'good' },
      ]
      if (g.rate !== undefined) {
        out.push({ label: 'Rate', value: `${mm(g.rate)} mm/yr`, tone: g.rate >= 2.5 ? 'warn' : g.rate > 2 ? 'warn' : 'neutral' })
        if (g.rate >= 2.5) out.push({ label: 'Kyoto', value: 'Worrisome (2.5 mm/yr or more)', tone: 'warn' })
        else if (g.rate > 2) out.push({ label: 'ACR', value: 'Above ~2 mm/yr', tone: 'warn' })
      }
      const size = num(v, 'size')
      const prior = num(v, 'priorSize')
      if (size !== undefined && prior !== undefined && prior < 15 && size >= 15 && size <= 25) out.push({ label: 'Now 1.5 cm or more', value: 'Moves to ACR Chart 2', tone: 'warn' })
      return out
    },
  },
  {
    id: 'gland',
    title: 'Step 7. Look at the rest of the gland',
    learn: 'read',
    teach: (
      <>
        <p>A cyst raises the cancer risk of the <em>whole pancreas</em>. <Cite doi={DOI.kyoto}>Kyoto</Cite> calls it dual carcinogenesis: a ductal adenocarcinoma can arise elsewhere in the same gland, with a yearly incidence of about 0.4–1.0%.</p>
        <p>On every follow-up: trace the main duct from tail to ampulla for any new narrowing, look for upstream dilation and atrophy, and look for any new hypoenhancing area in the pancreatic phase. In Kyoto's Figure 6 case the cyst was a red herring; the duct stricture was the finding.</p>
      </>
    ),
    fields: [
      { id: 'abrupt', label: 'Abrupt caliber change with upstream atrophy', kind: 'choice', options: YES_NO },
      { id: 'mass', label: 'Focal hypoenhancing mass', kind: 'choice', options: ABSENT_PRESENT },
      { id: 'massText', label: 'Mass description', kind: 'text', placeholder: 'size, location', showIf: (v) => str(v, 'mass') === 'present' },
      { id: 'stricture', label: 'Duct stricture', kind: 'choice', options: ABSENT_PRESENT },
      { id: 'biliary', label: 'Biliary tree', kind: 'choice', options: BILIARY },
      { id: 'nodes', label: 'Nodes', kind: 'choice', options: NODES },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (str(v, 'abrupt') === 'yes') out.push({ label: 'Abrupt caliber change', value: 'Worrisome: possible concomitant adenocarcinoma', tone: 'warn' })
      if (str(v, 'nodes') === 'enlarged') out.push({ label: 'Lymphadenopathy', value: 'Worrisome', tone: 'warn' })
      return out
    },
  },
  {
    id: 'multiple',
    title: 'Step 8. If there are several cysts',
    learn: 'read',
    teach: (
      <p>Report multiplicity; use the cyst with the longest dimension as the index lesion, but check every cyst for growth and worrisome features on each exam. Multifocal BD-IPMN is common (around 20–40%) and multifocality itself does not raise the risk; management follows whichever lesion is highest-risk.</p>
    ),
    fields: [
      { id: 'multiplicity', label: 'Multiplicity', kind: 'choice', options: MULTIPLICITY, required: true },
      { id: 'otherCount', label: 'Number of other cysts', kind: 'number', min: 1, step: 1, showIf: (v) => str(v, 'multiplicity') === 'multiple' },
      { id: 'otherSize', label: 'Largest other cyst', kind: 'number', unit: 'mm', min: 0, step: 0.1, showIf: (v) => str(v, 'multiplicity') === 'multiple' },
      { id: 'otherSite', label: 'Its location', kind: 'text', placeholder: 'e.g. tail', showIf: (v) => str(v, 'multiplicity') === 'multiple' },
      { id: 'othersWf', label: 'Other cysts', kind: 'choice', options: OTHERS_WF, showIf: (v) => str(v, 'multiplicity') === 'multiple' },
    ],
    derive: (v) => {
      const size = num(v, 'size')
      const other = num(v, 'otherSize')
      if (str(v, 'multiplicity') !== 'multiple' || size === undefined || other === undefined || other <= size) return []
      return [{ label: 'Index lesion', value: 'Another cyst is longer', tone: 'warn' }]
    },
  },
  {
    id: 'followup',
    title: 'What happens next: the follow-up schedules',
    learn: 'followup',
    teach: (
      <>
        <p>Most radiologists write the recommendation from the <Cite doi={DOI.acr}>ACR white paper</Cite> and describe features in Fukuoka/Kyoto language. Name the source you're following so the clinician knows where the number came from.</p>
        <p><strong>ACR universal override:</strong> any mural nodule, wall thickening, MPD dilation 7 mm or more, or biliary obstruction/jaundice prompts immediate EUS/FNA and surgical evaluation regardless of cyst size or growth.</p>
        <p><strong><Cite doi={DOI.kyoto}>Kyoto</Cite>:</strong> any high-risk stigma → surgery in a fit patient; worrisome feature(s) → EUS; neither → surveillance by size (under 20 mm: 6 months, then every 18 months; 20 to under 30 mm: 6 months twice, then yearly).</p>
      </>
    ),
    fields: [
      { id: 'recSource', label: 'Recommendation per', kind: 'choice', options: REC_SOURCE },
      { id: 'recText', label: 'Recommendation', kind: 'text', multiline: true, showIf: (v) => str(v, 'recSource') === 'custom' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const override = acrOverride(v)
      if (override.length > 0) out.push({ label: 'ACR override', value: 'EUS/FNA and surgical evaluation', tone: 'warn' })
      const chart = acrChart(v)
      if (chart) out.push({ label: 'ACR', value: chart })
      return out
    },
  },
  {
    id: 'other',
    title: 'Other findings',
    fields: [{ id: 'otherFindings', label: 'Other findings', kind: 'text', multiline: true }],
  },
]

/* The report, in the lesson template's order and wording. */

function build(v: Values) {
  const f = features(v)
  const g = growth(v)
  const warnings = [...f.notes]
  const size = num(v, 'size')
  const prior = num(v, 'priorSize')
  const priorDate = str(v, 'priorDate')
  const location = str(v, 'location')
  const type = str(v, 'type')
  const comm = str(v, 'comm')
  const mpd = num(v, 'mpd')
  const nodule = str(v, 'nodule')
  const noduleSize = num(v, 'noduleSize')
  const enhance = str(v, 'enhance')
  const baseline = str(v, 'baseline')

  const series = str(v, 'series')
  const image = str(v, 'image')
  const ref = series || image ? ` (${[series && `series ${series}`, image && `image ${image}`].filter(Boolean).join(', ')})` : ''
  const sizeLine = size !== undefined
    ? `Size: ${mm(size)} mm long axis${ref}.${prior !== undefined ? ` Prior: ${mm(prior)} mm${priorDate ? ` on ${priorDate}` : ''}.` : ''}`
    : ''

  let growthLine = ''
  if (g) {
    const pct = g.pct <= 0 ? 'none' : `${Math.round(g.pct)}%`
    const meets = g.meets ? 'meets' : 'does not meet'
    growthLine = `Growth: ${pct} (${meets} ACR growth definition)${g.rate !== undefined && g.rate > 0 ? `; rate ~${mm(g.rate)} mm/yr` : ''}.`
  }

  const morph = [
    str(v, 'morphology') && label(MORPHOLOGY, str(v, 'morphology')),
    str(v, 'wall') && `wall ${label(WALL, str(v, 'wall'))}`,
    str(v, 'septa') && (str(v, 'septa') === 'yes' ? 'septations' : 'no septations'),
    str(v, 'calc') && `calcification ${label(CALC, str(v, 'calc'))}`,
  ].filter(Boolean)
  const morphLine = morph.length > 0 ? `Morphology: ${morph.join('; ')}.` : ''

  const mpdSite = str(v, 'mpdSite')
  const abrupt = str(v, 'abrupt')
  const mpdParts = [
    mpd !== undefined && `MPD maximum caliber: ${mm(mpd)} mm${mpdSite ? ` at ${mpdSite}` : ''}`,
    abrupt && `abrupt caliber change with upstream atrophy: ${abrupt === 'yes' ? 'yes' : 'no'}`,
  ].filter(Boolean)
  const mpdLine = mpdParts.length > 0 ? `${mpdParts.join('; ')}.`.replace(/^abrupt/, 'Abrupt') : ''

  let noduleLine = ''
  if (nodule === 'none') noduleLine = 'Mural nodule or solid component: none.'
  else if (nodule) {
    const what = nodule === 'solid' ? 'solid component' : 'mural nodule'
    const detail = [noduleSize !== undefined && `${mm(noduleSize)} mm`, enhance && label(ENHANCE, enhance)].filter(Boolean).join(', ')
    noduleLine = `Mural nodule or solid component: ${what}${detail ? `, ${detail}` : ''}.`
  }

  let othersLine = ''
  if (str(v, 'multiplicity') === 'single') othersLine = 'Other cysts: none.'
  if (str(v, 'multiplicity') === 'multiple') {
    const n = num(v, 'otherCount')
    const otherSize = num(v, 'otherSize')
    const otherSite = str(v, 'otherSite')
    const wf = str(v, 'othersWf')
    const parts = [
      n !== undefined ? String(n) : 'multiple',
      otherSize !== undefined && `largest ${mm(otherSize)} mm${otherSite ? ` at ${otherSite}` : ''}`,
    ].filter(Boolean).join(', ')
    const tail = wf === 'yes' ? '; each without worrisome features' : wf === 'no' ? '; another cyst has worrisome features' : ''
    othersLine = `Other cysts: ${parts}${tail}.`
    if (otherSize !== undefined && size !== undefined && otherSize > size) {
      warnings.push('Another cyst is longer than the index cyst: the lesson uses the cyst with the longest dimension as the index lesion.')
    }
    if (wf === 'no') warnings.push('A non-index cyst has worrisome features: management follows whichever lesion is highest-risk. Describe it in Other findings.')
  }

  const mass = str(v, 'mass')
  const stricture = str(v, 'stricture')
  const biliary = str(v, 'biliary')
  const gland = [
    mass === 'none' && 'no focal hypoenhancing mass',
    mass === 'present' && `focal hypoenhancing mass${str(v, 'massText') ? ` (${str(v, 'massText')})` : ''}`,
    stricture === 'none' && 'no duct stricture',
    stricture === 'present' && 'duct stricture',
    biliary === 'normal' && 'biliary tree normal',
    biliary === 'dilated' && 'biliary tree dilated',
  ].filter(Boolean)
  const glandLine = gland.length > 0 ? `Remainder of gland: ${gland.join('; ')}.` : ''
  const nodes = str(v, 'nodes')
  const nodesLine = nodes === 'none' ? 'Nodes: none enlarged.' : nodes === 'enlarged' ? 'Nodes: enlarged.' : ''

  /* Impression. */
  const typeText = type === 'other' ? str(v, 'typeOther') || 'cyst' : type ? label(CYST_TYPE, type) : 'cyst'
  const headline = size !== undefined || type || location
    ? `${size !== undefined ? `${mm(size)} mm ` : ''}${typeText}${location ? ` in the pancreatic ${location}` : ''}.`
    : ''
  const assessed = size !== undefined || mpd !== undefined || f.wf.length > 0 || f.hrs.length > 0
  const acrLine = f.acr.length > 0 ? ` ACR worrisome feature: ${f.acr.join('; ')}.` : ''
  const featureLine = (assessed || f.acr.length > 0) && `Worrisome features: ${count(f.wf)}. High-risk stigmata: ${f.hrs.length === 0 ? 'none' : f.hrs.join('; ')}.${acrLine}`

  let statusLine = ''
  if (g && size !== undefined && prior !== undefined) {
    const since = priorDate || baseline
    const over = num(v, 'interval') !== undefined ? ` over ${mm(num(v, 'interval') as number)} months` : ''
    if (g.meets) statusLine = `Enlarged from ${mm(prior)} to ${mm(size)} mm${over}${since ? ` since ${since}` : ''}, meets ACR growth definition.`
    else if (size > prior) statusLine = `Increased from ${mm(prior)} to ${mm(size)} mm${over}, below ACR growth threshold.`
    else if (size < prior) statusLine = `Decreased from ${mm(prior)} to ${mm(size)} mm${over}.`
    else statusLine = `Stable since ${baseline || priorDate || 'prior'}.`
    if (prior < 15 && size >= 15) statusLine = `${statusLine.replace(/\.$/, '')}; now 1.5 cm or more.`
  } else if (str(v, 'priorStatus') === 'new') statusLine = 'New since prior.'
  else if (str(v, 'priorStatus') === 'first') statusLine = 'No prior imaging for comparison.'

  const protocolNote = str(v, 'protocol') === 'pvct' ? 'Note: single-phase portal-venous CT, not optimized for pancreatic evaluation.' : ''
  const rec = recommendation(v, f, warnings)
  const recLine = rec ? `Recommendation: ${rec}` : ''

  /* Contradictions the rules can see. */
  if (type === 'bd' && comm === 'absent') warnings.push('Presumed BD-IPMN but communication marked absent: communication is the defining feature.')
  if (type === 'muc' && comm === 'present' && size !== undefined && size > 5) warnings.push('Communication present: by the Kyoto definition a communicating cyst over 5 mm is a BD-IPMN.')
  if (type === 'sca' && comm === 'present') warnings.push('Serous cystadenoma marked but communication present: SCAs do not talk to the main duct.')
  if (type === 'sca' && str(v, 'calc') === 'peripheral') warnings.push('Serous cystadenoma marked but calcification is peripheral: peripheral calcification points to MCN.')
  if (prior !== undefined && !priorDate && !baseline) warnings.push('Name the baseline date used for the surveillance clock.')
  if (str(v, 'recSource') === 'kyoto' && str(v, 'symptomatic') === 'yes') warnings.push('Symptomatic patient: the lesson says to refer rather than apply an incidental-cyst schedule.')
  if (str(v, 'mass') === 'present') warnings.push('Focal hypoenhancing mass: the cyst schedules do not cover it; make sure the recommendation addresses the mass.')
  if (str(v, 'biliary') === 'dilated' && !list(v, 'clinical').includes('jaundice')) warnings.push('Biliary tree dilated: the ACR override names biliary obstruction/jaundice; confirm obstruction.')
  if (type === 'other') warnings.push('The cyst schedules are for presumed mucinous cysts; solid pseudopapillary neoplasm and cystic NET generally go to surgery.')
  if (str(v, 'stricture') === 'present' && str(v, 'abrupt') !== 'yes') warnings.push('Duct stricture marked: check for an abrupt caliber change with upstream atrophy (a worrisome feature).')

  const text = lines(
    'Pancreas:',
    location && `Cyst location: ${location}.`,
    sizeLine,
    growthLine,
    morphLine,
    comm && `Communication with MPD: ${label(COMM, comm)}.`,
    mpdLine,
    noduleLine,
    othersLine,
    glandLine,
    nodesLine,
    str(v, 'otherFindings') && `\nOther findings:\n${str(v, 'otherFindings')}`,
    '',
    'Impression:',
    headline,
    featureLine,
    statusLine,
    protocolNote,
    recLine,
  ).replace(/Impression:/, '\nImpression:')

  return { text, warnings }
}

const learn: LearnSection[] = [
  {
    id: 'big-picture',
    title: 'Part 1. The big picture: which document does what',
    body: (
      <>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Document</th><th>Who wrote it</th><th>What it's for</th><th>When you use it</th></tr></thead>
            <tbody>
              <tr><td><strong>ACR white paper</strong> (Megibow, JACR 2017)</td><td>ACR Incidental Findings Committee (radiologists + a GI + a surgeon)</td><td>How to <em>follow</em> a cyst found by accident that can't be named</td><td>Asymptomatic adult, cyst found on a scan done for something else</td></tr>
              <tr><td><strong>Fukuoka 2017</strong> (Tanaka, Pancreatology 2017)</td><td>International Association of Pancreatology (IAP)</td><td>How to manage a known or presumed <strong>IPMN</strong></td><td>Surgeons and GI doctors use this; you borrow its vocabulary</td></tr>
              <tr><td><strong>Kyoto 2024</strong> (Ohtsuka, Pancreatology 2024)</td><td>IAP revision of Fukuoka</td><td>Same, updated with evidence reviews and a simpler follow-up schedule</td><td>Current version; replaces Fukuoka</td></tr>
            </tbody>
          </table>
        </div>
        <div className="lesson-key">
          <p>The one idea that unifies all three: every incidental cyst is presumed to be mucinous (usually a small IPMN) unless it has definitive features of something else, such as a serous cystadenoma, or aspiration proves otherwise. That's why almost all of these get followed.</p>
          <p>Malignancy occurs virtually only in mucinous cysts (IPMN and MCN). Serous cystadenomas and pseudocysts essentially never turn into cancer. So the whole reading job boils down to: <em>Is it mucinous? If so, does it show signs of high-grade dysplasia or cancer?</em></p>
        </div>
      </>
    ),
  },
  {
    id: 'read',
    title: 'Part 2. How to read the study, step by step',
    body: (
      <>
        <div className="lesson-step">
          <h4>Step 1. Check the protocol and gather all old scans</h4>
          <p>The ACR paper accepts either contrast-enhanced MRI or pancreas-protocol CT for follow-up; MRI avoids cumulative radiation but has not been shown to be better than pancreas-protocol CT for finding worrisome features or cancer. On MRI you want fat-suppressed T2, thin-slice 3D MRCP, and contrast-enhanced T1 in arterial, early portal, and late portal phases. The 3D MRCP source images are what let you see duct communication.</p>
          <p>Then look at <em>everything</em> old. The ACR paper stresses comparing with prior studies where the pancreas is often visible (chest CT, spine CT or MRI, PET/CT, abdominal ultrasound) and using the date of the earliest prior as the baseline for the follow-up clock. A cyst that's been stable on a 6-year-old chest CT has already served most of its surveillance sentence.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Try to give the cyst a name</h4>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Cyst type</th><th>Who gets it</th><th>Where</th><th>Look</th><th>Talks to the main duct?</th><th>Calcification</th></tr></thead>
              <tbody>
                <tr><td><strong>Branch-duct IPMN</strong></td><td>~55% female, 60s–70s</td><td>30% body/tail (so mostly head/uncinate)</td><td>Grape-like cluster, "cyst by cyst"</td><td><strong>Yes</strong> (the defining feature)</td><td>No</td></tr>
                <tr><td><strong>Mucinous cystic neoplasm (MCN)</strong></td><td>&gt;95% female, 40s–50s</td><td>95% body/tail</td><td>"Cyst in cyst," thick capsule, orange-like</td><td>Rarely (~20%)</td><td>Rare, curvilinear in wall</td></tr>
                <tr><td><strong>Serous cystadenoma (SCA)</strong></td><td>~70% female, 60s–70s</td><td>Half body/tail</td><td>Honeycomb / sponge of tiny cysts, central scar</td><td>No</td><td>30–40%, central</td></tr>
                <tr><td><strong>Pseudocyst</strong></td><td>&lt;25% female, 40s–50s</td><td>65% body/tail</td><td>Unilocular, thick wall, debris</td><td>Common</td><td>No</td></tr>
              </tbody>
            </table>
          </div>
          <p>Two memory hooks: central calcification points to SCA; peripheral calcification points to MCN, and peripheral calcification in an MCN is more strongly linked with frank malignancy. Also: MCNs live in the tail; branch-duct IPMNs are most often in the head and uncinate.</p>
          <p>Rarer ones worth knowing: solid pseudopapillary neoplasm (young women, mixed solid-cystic with blood products), cystic neuroendocrine tumor (thick enhancing rim, often hypervascular), lymphoepithelial cyst, simple epithelial cyst. Solid pseudopapillary neoplasm and cystic NET usually have features that suggest the specific diagnosis and generally go to surgery.</p>
          <p>Be realistic about your limits: cysts under 10 mm are difficult or impossible to characterize, and 1–3 cm cysts are often indeterminate unless you can prove duct communication. "Indeterminate, presumed mucinous" is an acceptable answer.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Does it communicate with the main pancreatic duct?</h4>
          <p>This is the single most useful thing you can establish, because it converts "indeterminate cyst" into "branch-duct IPMN." CT with 3D reformats and MRI/MRCP are excellent for this and equivalent to EUS. Scroll the thin MRCP source images, not just the MIP. Look for a thin neck connecting the cyst to the duct.</p>
          <p>Definitions to use in your report, from Kyoto: a cyst larger than 5 mm that communicates with the main duct is a BD-IPMN (rule out pseudocyst if there is a pancreatitis or trauma history); main-duct IPMN is segmental or diffuse dilation of the main duct over 5 mm without another cause; mixed type meets both criteria.</p>
          <p>Then measure the main duct. For any BD-IPMN, record the widest main duct diameter even if it's away from the cyst, because a dilated main duct is a suspicious feature that should be investigated promptly. One trap: the duct can show a small fusiform bulge right where the cyst neck inserts in a pure branch-duct IPMN; that local bump is not main-duct involvement.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Measure the cyst the standard way</h4>
          <p>Record one measurement: the greatest length of the cyst in its long axis on either the axial or coronal image, and state the series and image numbers. Save the measurement image to PACS. The ACR chose this simple single-axis method over 3D volumes because it's more reproducible from reader to reader. Consistency matters more than precision here; you'll be comparing your number against someone else's number two years from now.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Hunt for worrisome features and high-risk stigmata</h4>
          <p>These are the shared vocabulary. Use the exact phrases in your report; the ACR explicitly encourages the terms "worrisome features" and "high-risk stigmata" because clinicians who treat pancreatic disease universally understand them.</p>
          <p>Plain-language definitions first:</p>
          <ul className="plain-list">
            <li><strong>Mural nodule</strong> = a bump growing from the inside of the cyst wall into the cyst. It matters most if it <strong>enhances</strong>, because that means it's tissue, not mucin or debris.</li>
            <li><strong>Solid component</strong> = a solid mass in the pancreas tissue next to the cyst. A mural nodule usually means a non-invasive lesion, while a solid component in the parenchyma suggests invasive cancer or a separate adenocarcinoma; in practice the two are hard to tell apart and both count as high-risk.</li>
            <li><strong>Thickened/enhancing wall</strong> = wall that's visibly thick or lights up with contrast.</li>
            <li><strong>Abrupt caliber change</strong> = the duct suddenly narrows at one spot with the gland beyond it shrunken (atrophic). A sign of a possible hidden tumor at the narrowing.</li>
          </ul>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th></th><th>ACR 2017</th><th>Fukuoka 2017</th><th>Kyoto 2024</th></tr></thead>
              <tbody>
                <tr><td><strong>High-risk stigmata</strong> (→ surgical evaluation)</td><td>Obstructive jaundice with head cyst; enhancing solid component; MPD ≥10 mm</td><td>Obstructive jaundice with head cyst; enhancing mural nodule ≥5 mm; MPD ≥10 mm</td><td>Same three <strong>plus</strong> suspicious or positive cytology (if EUS-FNA was done)</td></tr>
                <tr><td><strong>Worrisome features</strong> (→ EUS/FNA, closer look)</td><td>Cyst ≥3 cm; thickened/enhancing wall; non-enhancing mural nodule; <strong>MPD ≥7 mm</strong></td><td>Cyst ≥3 cm; enhancing nodule &lt;5 mm; thickened/enhancing wall; MPD 5–9 mm; abrupt caliber change with atrophy; lymphadenopathy; elevated CA19-9; growth ≥5 mm in 2 years; pancreatitis</td><td>Same as Fukuoka but growth becomes <strong>≥2.5 mm/year</strong>, and <strong>new-onset or worsening diabetes within the past year</strong> is added</td></tr>
              </tbody>
            </table>
          </div>
          <p>Two differences to notice:</p>
          <ol className="plain-list">
            <li><strong>The duct threshold.</strong> Fukuoka/Kyoto use 5–9 mm as worrisome; the ACR recommends a simpler 7 mm cutoff, based on Kang et al. (World J Surg 2015). If you report the actual millimeter number, the clinician can apply whichever they prefer. A 6 mm duct is "worrisome" by Kyoto and "normal-ish" by ACR: say the number.</li>
            <li><strong>Nodule enhancement.</strong> Kyoto puts enhancing nodules ≥5 mm in high-risk; ACR's 2017 table only listed "enhancing solid component." Describe what you see: size of the nodule, whether it enhances.</li>
          </ol>
          <p>Why 5 mm and 10 mm? Kyoto admits these are imperfect: an enhancing nodule ≥5 mm has sensitivity 73–100% and specificity 73–85% for high-grade dysplasia or cancer, but a nodule alone has only an odds ratio of about 1.2–3.2 in recent nomogram studies; the committee discussed raising the nodule cutoff to 10 mm and lowering the worrisome duct threshold but kept the old numbers for lack of strong evidence.</p>
          <div className="lesson-key">
            <p><strong>The features add up.</strong> This is the most important new emphasis in Kyoto. Zelga et al. found the risk of high-grade dysplasia or cancer rises stepwise with the number of worrisome features: 22% with one, 34% with two, 59% with three, and 100% with four or more. So count them and put the count in your impression.</p>
          </div>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Decide whether it has grown (and how fast)</h4>
          <p>Growth is the main thing surveillance watches for, so the definition matters. The ACR uses percentages that scale with size, because a 2 mm change on a 4 mm cyst is huge and on a 30 mm cyst is noise: cysts under 0.5 cm, growth = 100% increase in long axis; 0.5 to under 1.5 cm, 50% increase; 1.5 cm and larger, 20% increase. Report the growth rate when you can, since a rate above 2 mm/year helps separate aggressive from indolent cysts.</p>
          <p>Kyoto uses a single rate: ≥2.5 mm/year is worrisome. Reported thresholds in the literature range from about 1 to 3.5 mm/year, and 2.5 mm/year was the most frequently reported, so it replaced the old 5 mm per 2 years.</p>
          <p>A literature case that shows the reverse: in Pandey et al. (Radiology 2019), a 53-year-old man's two head and body cysts measured 4.9 and 4.6 mm in January 2013; MRI 55 months later showed 5.7 and 5.9 mm, no growth by ACR criteria. A 1 mm change over four and a half years is measurement noise. Don't call that growth.</p>
          <p>Beware delayed growth, though. Brook et al. (Radiology 2016) documented cysts that sat still for years and then grew, which argues against stopping after a short stable period (the paper gives the older ACR rule as stopping after 1 year of stability). The current ACR schedule runs to 9–10 years.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Look at the rest of the gland</h4>
          <p>This is the step most people skip. A cyst raises the cancer risk of the <em>whole pancreas</em>, not just the cyst. Kyoto calls it dual carcinogenesis: the cyst itself can progress, and separately a ductal adenocarcinoma can arise elsewhere in the same gland, with a yearly incidence of about 0.4–1.0% and a risk roughly 3–5 times the age-matched population.</p>
          <p>Kyoto's own illustrative case (their Figure 6): MRCP showed a 10 mm BD-IPMN in the body; 14 months later the cyst was unchanged but a new main-duct stricture with upstream dilation appeared; CT then showed an 18 mm hypodense solid lesion in the tail, which proved to be a tubular adenocarcinoma with no connection to the cyst. The cyst was a red herring. The duct stricture was the finding.</p>
          <p>So on every follow-up: trace the main duct from tail to ampulla for any new narrowing, look for upstream dilation and atrophy, and look for any new hypoenhancing area in the pancreatic phase. The ACR notes that the pancreatic-phase contrast sequence improves detection of a second cancer elsewhere in the gland, one argument for keeping contrast in the follow-up protocol.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. If there are several cysts</h4>
          <p>Report multiplicity; use the cyst with the longest dimension as the index lesion, but check every cyst for growth and worrisome features on each exam, since these can appear in any of them. Multifocal BD-IPMN is common (around 20–40%) and multifocality itself does not raise the risk; management follows whichever lesion is highest-risk.</p>
        </div>
      </>
    ),
  },
  {
    id: 'followup',
    title: 'Part 3. What happens next: the follow-up schedules',
    body: (
      <>
        <h4>ACR 2017: sorted by size and age</h4>
        <p>The ACR flowcharts apply only to asymptomatic adults with an incidentally found cyst; if the patient has jaundice, weight loss, a palpable mass, steatorrhea, or an elevated amylase, the algorithm does not apply and the patient should be referred.</p>
        <p><strong>Cysts under 1.5 cm (Chart 1)</strong></p>
        <ul className="plain-list">
          <li>Under 65 at presentation: image yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years.</li>
          <li>Age 65–79: image every 2 years for 5 rounds; stop if still under 1.5 cm over 10 years.</li>
          <li>"White dot" cysts (&lt;5 mm on T2): a single follow-up at 2 years showing stability is enough to stop; some radiologists don't report these at all in patients over 75–80.</li>
          <li>If it grows: move up in frequency (yearly) or go to EUS/FNA. If it reaches 1.5 cm, switch to Chart 2.</li>
        </ul>
        <p><strong>Cysts 1.5–2.5 cm (Chart 2)</strong></p>
        <ul className="plain-list">
          <li>2A, duct communication proven (BD-IPMN): 1.5–1.9 cm → yearly for 5 years then every 2 years for 4 years; 2.0–2.5 cm → every 6 months for 2 years, yearly for 2, then every 2 years for 6. EUS/FNA at detection is an acceptable alternative.</li>
          <li>2B, communication absent or unknown: either image every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or go straight to EUS/FNA to find out whether it's mucinous.</li>
          <li>Growth here is 20%. Any cyst ≥2 cm that shows definable growth will be at least 2.4 cm, and for those EUS/FNA is advised.</li>
        </ul>
        <p><strong>Cysts over 2.5 cm (Chart 3)</strong></p>
        <ul className="plain-list">
          <li>Many centers do EUS/FNA on every cyst this size at detection.</li>
          <li>Sort by imaging risk. Low-risk = no mural nodule, no wall thickening, normal-caliber duct, no peripheral calcification; high-risk = any of mural nodule, wall thickening, MPD ≥7 mm, or peripheral calcification.</li>
          <li>Low-risk cysts can be carefully followed, even if 3 cm or more; high-risk cysts go immediately to EUS/FNA and surgical evaluation.</li>
          <li>Confident SCA: follow-up depends on symptoms; an SCA over 4 cm or symptomatic may need resection because of expected growth.</li>
        </ul>
        <p><strong>Patients 80 or older at presentation (Chart 4)</strong></p>
        <ul className="plain-list">
          <li>Follow-up or EUS/FNA is advised only if the patient is a surgical candidate; ≤2.5 cm → image every 2 years twice and stop if stable.</li>
          <li>Follow-up generally stops once a patient reaches 80, and for most patients the ACR advocates a 9–10-year follow-up window.</li>
        </ul>
        <div className="lesson-key">
          <p><strong>The universal override</strong> (printed on every chart): appearance of any mural nodule, wall thickening, MPD dilation ≥7 mm, or biliary obstruction/jaundice should prompt immediate EUS/FNA and surgical evaluation regardless of cyst size or growth.</p>
        </div>

        <h4>Kyoto 2024: sorted by risk, then size</h4>
        <ol className="plain-list">
          <li><strong>Any high-risk stigma</strong> → surgery in a fit patient. EUS-FNA should not be done when HRS are obvious on CT/MRI, since surgery will happen regardless.</li>
          <li><strong>Worrisome feature(s), no HRS</strong> → EUS (with contrast and/or FNA where available) to look for a nodule or get cytology; multiple WF push toward surgery, and nomograms can help.</li>
          <li><strong>Neither</strong> → surveillance by size:
            <ul className="plain-list">
              <li>Under 20 mm: once at 6 months, then every 18 months if stable. 20 to under 30 mm: 6 months twice, then yearly. 30 mm or more: every 6 months.</li>
              <li>Stopping is allowed for cysts under 20 mm with no morphologic change and no worrisome features after 5 years, taking into account the patient's condition and life expectancy, but this may not apply to younger patients or those with familial or genetic risk. Because a concomitant adenocarcinoma always remains possible, the guideline offers two options after 5 stable years: stop, or continue.</li>
              <li>MRI with physical exam, tumor markers, and diabetes screening is the preferred surveillance; CT and EUS are added when MRI shows a change.</li>
            </ul>
          </li>
        </ol>
        <p>Why the size tiers? Progression to a worrisome feature is about 4.8% for cysts under 10 mm (median 54 months), 10% for 10–20 mm, and 48.8% for 20–30 mm at a median of only 23 months. Bigger cysts move faster.</p>

        <h4>Which one do you cite?</h4>
        <p>For an incidental cyst in a US practice, most radiologists write the recommendation from the ACR white paper and describe features in Fukuoka/Kyoto language, because the GI doctor or surgeon who takes over will manage it by Kyoto. The intervals conflict a little; the honest approach is to name the source you're following ("per ACR 2017 recommendations") so the clinician knows where the number came from. Check whether your groups have adopted a house standard; many have templated one of the two.</p>
      </>
    ),
  },
  {
    id: 'report',
    title: 'Part 4. What the report must contain',
    body: (
      <>
        <p>The ACR lists six mandatory elements: cyst morphology and location; size; possible communication with the main duct; presence of worrisome features and/or high-risk stigmata; growth on follow-up; and multiplicity. A template that covers all six plus the Kyoto extras:</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>Three writing habits that help:</p>
        <ul className="plain-list">
          <li><strong>State the actual millimeter numbers</strong> for duct and nodule rather than only the label, so a reader on either guideline can apply their threshold.</li>
          <li><strong>Say "none" explicitly</strong> for nodule and duct dilation. Silence reads as "not looked for."</li>
          <li><strong>Name the baseline date</strong> you used for the surveillance clock, especially if it came from an old chest CT.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cases',
    title: 'Part 5. Practice cases',
    body: (
      <>
        <ol className="plain-list">
          <li><strong>58-year-old, 9 mm cyst in the pancreatic head on a CT for kidney stones. No priors. MRCP: thin neck to the main duct, MPD 2 mm.</strong> Branch-duct IPMN, no WF, no HRS. Under 1.5 cm, under 65 → ACR: yearly MRI ×5, then every 2 years ×2, stop if stable after ≥9 years. Kyoto: 6 months, then every 18 months, consider stopping after 5 stable years.</li>
          <li><strong>71-year-old, 22 mm unilocular cyst in the tail, thin wall, no septa, no communication seen. Duct 3 mm.</strong> Indeterminate, presumed mucinous; in a woman in the tail, MCN is the front-runner, but you can't prove it. ACR Chart 2B: every 6 months ×4, yearly ×2, every 2 years ×3, or EUS/FNA now. No WF (22 mm is under 30, nothing else). Kyoto: 6 months twice then yearly.</li>
          <li><strong>64-year-old, 3.4 cm multicystic lesion in the head with a 7 mm enhancing nodule, MPD 6 mm.</strong> Enhancing nodule ≥5 mm = <strong>high-risk stigma</strong> (Kyoto), plus cyst ≥3 cm and MPD 5–9 mm = two worrisome features. ACR: high-risk by imaging → EUS/FNA and surgical consultation now. The nodule alone decides it; don't bury it under the size discussion.</li>
          <li><strong>Follow-up: cyst was 12 mm two years ago, now 15 mm.</strong> For a cyst that was 0.5 to &lt;1.5 cm, growth = 50%. 12 → 15 is 25%: does <em>not</em> meet the ACR growth definition. But it has crossed 1.5 cm, so it moves to Chart 2. Rate 1.5 mm/year, below both the ACR ~2 mm/yr and Kyoto 2.5 mm/yr flags. Report: "increased from 12 to 15 mm over 24 months, below ACR growth threshold; now ≥1.5 cm."</li>
          <li><strong>Follow-up: 11 mm cyst stable for 3 years, but the MPD in the body now measures 4 mm with a short stricture and mild atrophy of the tail. Portal-phase CT only.</strong> The cyst is boring. The duct is not. This is the Kyoto Figure 6 pattern: abrupt caliber change with distal atrophy is a worrisome feature and a warning of a possible concomitant adenocarcinoma at the stricture. Recommend pancreas-protocol CT or MRI with pancreatic phase, and EUS. Note the exam was single-phase and not optimized.</li>
          <li><strong>82-year-old, 4 mm T2-bright dot in the body, no priors.</strong> ACR: white-dot cyst in a patient over 80. One follow-up at 2 years is the maximum you'd suggest; many radiologists would mention it without recommending follow-up given age. Follow-up only if the patient would be a surgical candidate.</li>
          <li><strong>45-year-old, 2.8 cm lobulated microcystic lesion in the body with a central scar and central calcification, no communication, duct normal.</strong> A serous cystadenoma with classic features, one of the few you can name confidently. No surveillance for malignancy needed. Below 4 cm and asymptomatic → no surgical referral. Say so plainly; this patient should not be put on a 10-year schedule.</li>
        </ol>
      </>
    ),
  },
]

const quiz: QuizQuestion[] = [
  {
    id: 'acr-duct',
    question: 'Which main pancreatic duct caliber does the ACR 2017 white paper use as its worrisome cutoff?',
    options: ['5 mm', '10 mm', '7 mm', '9 mm'],
    answer: 2,
    explanation: (
      <p>Fukuoka/Kyoto use 5–9 mm as worrisome; the ACR recommends a simpler 7 mm cutoff, based on <Cite doi={DOI.kang}>Kang et al.</Cite> A 6 mm duct is "worrisome" by Kyoto and "normal-ish" by ACR, so say the number.</p>
    ),
  },
  {
    id: 'growth-12-15',
    question: 'A cyst measured 12 mm two years ago and 15 mm now. By the ACR definition, has it grown?',
    options: [
      'Yes: it increased by 25%, above the 20% threshold',
      'No: for a cyst of 0.5 to under 1.5 cm, growth is a 50% increase, and 25% falls short',
      'Yes: any increase of 3 mm or more counts as growth',
      'No: growth only counts once the rate exceeds 5 mm per year',
    ],
    answer: 1,
    explanation: (
      <p>For a cyst that was 0.5 to under 1.5 cm, growth = 50%. 12 → 15 is 25%: it does not meet the ACR growth definition. But it has crossed 1.5 cm, so it moves to Chart 2. Rate 1.5 mm/year, below both the ACR ~2 mm/yr and Kyoto 2.5 mm/yr flags.</p>
    ),
  },
  {
    id: 'nodule-7',
    question: 'In Kyoto 2024 terms, how do you classify a 7 mm enhancing mural nodule in a 3.4 cm head cyst?',
    options: [
      'Worrisome feature, so EUS is the next step',
      'Not significant unless it has grown',
      'Worrisome only if the duct is also dilated',
      'High-risk stigma',
    ],
    answer: 3,
    explanation: (
      <p>An enhancing nodule of 5 mm or more is a high-risk stigma in <Cite doi={DOI.kyoto}>Kyoto</Cite>, plus cyst 3 cm or more and MPD 5–9 mm as two worrisome features. The nodule alone decides it; don't bury it under the size discussion.</p>
    ),
  },
  {
    id: 'central-calc',
    question: 'Central calcification in a microcystic lesion with a central scar points to which diagnosis?',
    options: ['Serous cystadenoma', 'Mucinous cystic neoplasm', 'Branch-duct IPMN', 'Pseudocyst'],
    answer: 0,
    explanation: (
      <p>Central calcification points to SCA; peripheral calcification points to MCN, and peripheral calcification in an MCN is more strongly linked with frank malignancy. A classic SCA needs no surveillance for malignancy and should not be put on a 10-year schedule.</p>
    ),
  },
  {
    id: 'zelga',
    question: 'In Zelga et al., what was the risk of high-grade dysplasia or cancer with three worrisome features?',
    options: ['22%', '34%', '59%', '100%'],
    answer: 2,
    explanation: (
      <p><Cite doi={DOI.zelga}>Zelga et al.</Cite> found the risk rises stepwise with the number of worrisome features: 22% with one, 34% with two, 59% with three, and 100% with four or more. So count them and put the count in your impression.</p>
    ),
  },
  {
    id: 'kyoto-rate',
    question: 'What growth rate does Kyoto 2024 treat as a worrisome feature?',
    options: ['5 mm in 2 years', '1 mm per year', '20% per year', '2.5 mm per year or more'],
    answer: 3,
    explanation: (
      <p>Reported thresholds in the literature range from about 1 to 3.5 mm/year, and 2.5 mm/year was the most frequently reported, so <Cite doi={DOI.kyoto}>Kyoto</Cite> replaced the old 5 mm per 2 years with it.</p>
    ),
  },
  {
    id: 'stricture',
    question: 'An 11 mm cyst has been stable for 3 years, but the body duct now shows a short stricture with mild tail atrophy. What matters most?',
    options: [
      'The cyst: stability for 3 years means it can be discharged',
      'The duct: an abrupt caliber change with distal atrophy is a worrisome feature and a warning of a possible concomitant adenocarcinoma',
      'Neither: a 4 mm duct is below every threshold',
      'The cyst: it now needs EUS/FNA because of its size',
    ],
    answer: 1,
    explanation: (
      <p>The cyst is boring. The duct is not. This is the <Cite doi={DOI.kyoto}>Kyoto</Cite> Figure 6 pattern: recommend pancreas-protocol CT or MRI with pancreatic phase, and EUS, and note if the exam was single-phase and not optimized.</p>
    ),
  },
  {
    id: 'baseline',
    question: 'Which date should start the follow-up clock for an incidental cyst?',
    options: [
      'The date of the current exam',
      'The date of the earliest prior study where the pancreas is visible, even a chest CT',
      'The date of the first dedicated pancreas MRI',
      'The date the patient turned 65',
    ],
    answer: 1,
    explanation: (
      <p>The <Cite doi={DOI.acr}>ACR paper</Cite> stresses comparing with prior studies where the pancreas is often visible and using the date of the earliest prior as the baseline. A cyst that's been stable on a 6-year-old chest CT has already served most of its surveillance sentence.</p>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'pancreatic-cysts',
  name: 'Pancreatic cyst reporting',
  lede: 'ACR 2017 white paper plus Fukuoka 2017 / Kyoto 2024: which document does what, how to read the study, the feature lists, growth, follow-up schedules, and the report.',
  sourceNote: 'Numbers below were checked against the full text of the ACR 2017 white paper and the 2024 Kyoto guideline.',
  references,
  referencesNote: "The two confusing bits of this topic: the ACR and Kyoto intervals don't match, and the ACR's 7 mm duct number sits between Kyoto's 5 and 10. Reporting raw measurements plus the named source is the way around both.",
  report: {
    steps,
    build,
    initial: {
      recSource: 'acr',
      nodule: 'none',
      abrupt: 'no',
      mass: 'none',
      stricture: 'none',
      biliary: 'normal',
      nodes: 'none',
    },
  },
  learn,
  quiz,
}

export function PancreaticCystsStudyPage() {
  return <StudyPage study={study} />
}
