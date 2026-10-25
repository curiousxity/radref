/**
 * The incidental renal mass flowcharts (Herts et al., "Management of the Incidental Renal Mass on
 * CT: A White Paper of the ACR Incidental Findings Committee", J Am Coll Radiol 2018;15:264-273,
 * Figs. 1-5 and their notes). Used by the incidental findings page's renal tool. `impression` is
 * the finding and `recommendation` the Recommendation section.
 */
import type { IncidentalResult, IncidentalTone } from './incidentalAdrenal'

/** Fig. 1: unenhanced CT only; Fig. 2: contrast-enhanced CT only; Figs. 3-4: CT or MRI without and with contrast. */
export type RenalExam = 'unenhanced' | 'enhanced' | 'protocol'
/** Figs. 1-2: too small to characterize (TSTC), homogeneous, or heterogeneous. */
export type RenalAppearance = 'tstc' | 'homogeneous' | 'heterogeneous'
/** Figs. 3-4: the mass once characterized on a without-and-with-contrast exam. */
export type RenalCharacterized = 'tstc' | 'bosniakI-II' | 'bosniakIIF' | 'bosniakIII-IV' | 'solid'

export type RenalForm = {
  sizeCm: string
  /** A region of interest below -10 HU (Fig. 5). */
  fat: boolean
  fatCalcification: boolean
  fatMultipleOrGrowing: boolean
  fatSymptoms: boolean
  exam: RenalExam
  appearance: RenalAppearance
  characterized: RenalCharacterized
  /** A TSTC mass that is well circumscribed, homogeneous and visually much lower (or, unenhanced, much higher) than parenchyma. */
  tstcBenignLooking: boolean
  /** Density of a homogeneous mass on the CT, in HU. */
  densityHu: string
  /** No change in imaging features and average growth of 3 mm a year or less, for at least 5 years. */
  stableFiveYears: boolean
}

export const initialRenalForm: RenalForm = {
  sizeCm: '',
  fat: false,
  fatCalcification: false,
  fatMultipleOrGrowing: false,
  fatSymptoms: false,
  exam: 'enhanced',
  appearance: 'homogeneous',
  characterized: 'solid',
  tstcBenignLooking: false,
  densityHu: '',
  stableFiveYears: false,
}

const PER = 'per the ACR Incidental Findings Committee renal mass white paper (2018)'
const NO_WORKUP = `No further workup, ${PER}.`
// Figs. 1-2 note 4: "MRI is preferred for characterizing smaller masses (<1.5 cm) and for
// detecting enhancement in suspected hypovascular masses."
const CHARACTERIZE = `Recommend renal mass protocol MRI or CT without and with IV contrast (MRI is preferred for masses smaller than 1.5 cm), ${PER}.`
const TSTC_FOLLOW_UP = `Renal mass protocol MRI (preferred) or CT without and with IV contrast within 6-12 months, ${PER}.`

function parse(value: string): number | null {
  if (value.trim() === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function result(category: string, tone: IncidentalTone, reason: string, impression: string, recommendation: string): IncidentalResult {
  return { category, tone, reason, impression, recommendation }
}

/** Fig. 5: a renal mass with a region of interest below -10 HU. */
function fatContaining(form: RenalForm, size: number | null): IncidentalResult {
  if (form.fatCalcification) {
    return result('Suspected renal cell carcinoma', 'warn', 'A renal mass with both fat and calcification should be considered a renal cell carcinoma.',
      'Renal mass containing fat and calcification, suspicious for renal cell carcinoma.', `CT or MRI without and with IV contrast for full characterization and staging, ${PER}.`)
  }
  if (form.fatSymptoms) {
    return result('Symptomatic angiomyolipoma', 'warn', 'Patients with symptomatic AMLs (hematuria, flank pain, spontaneous bleeding) should be referred to urology regardless of size.',
      'Fat-containing renal mass compatible with angiomyolipoma, in a symptomatic patient.', `Refer to urology, ${PER}.`)
  }
  if (form.fatMultipleOrGrowing) {
    return result('Multiple or growing angiomyolipomas', 'accent', 'Multiple AMLs, or growth on old studies.',
      'Fat-containing renal masses compatible with angiomyolipomas, multiple or growing.',
      `Refer for management; patients with multiple AMLs or other stigmata of tuberous sclerosis should be evaluated for tuberous sclerosis complex, ${PER}.`)
  }
  if (size === null || size <= 0) return result('Awaiting size', 'neutral', 'Enter the size: an angiomyolipoma of 4 cm or more is referred.', '', '')
  if (size >= 4) {
    return result('Angiomyolipoma, 4 cm or more', 'warn', 'An AML of 4 cm or more has potential for clinical symptoms and an increased risk of spontaneous hemorrhage.',
      `Fat-containing renal mass measuring ${size} cm, compatible with angiomyolipoma.`, `Refer for management (prophylactic treatment), ${PER}.`)
  }
  return result('Angiomyolipoma', 'good', 'A solitary sporadic AML smaller than 4 cm without documented growth.',
    `Fat-containing renal mass measuring ${size} cm, compatible with angiomyolipoma.`,
    `No further workup; an AML with an aneurysm larger than 5 mm should be referred for prophylactic treatment, ${PER}.`)
}

function tstc(form: RenalForm, size: string): IncidentalResult {
  return form.tstcBenignLooking
    ? result('Likely benign cyst', 'good', 'A well-circumscribed homogeneous mass too small to characterize, visually much lower (or, unenhanced, much higher) than renal parenchyma, is probably a benign cyst.',
      `Renal lesion${size}, too small to characterize, likely a benign cyst.`, NO_WORKUP)
    : result('Indeterminate, too small to characterize', 'accent', 'A mass too small to characterize that is inconclusive on subjective evaluation.',
      `Indeterminate renal lesion${size}, too small to characterize.`, TSTC_FOLLOW_UP)
}

export function classifyRenal(form: RenalForm): IncidentalResult {
  const size = parse(form.sizeCm)
  const sizeText = size !== null && size > 0 ? ` measuring ${size} cm` : ''

  if (form.fat) return fatContaining(form, size)

  // Figs. 1-2 note 5: "any renal mass that has been without change in imaging features and has had
  // an average growth of ≤3 mm per year for at least 5 years is likely of no clinical significance
  // and does not need further workup."
  if (form.stableFiveYears) {
    return result('Stable for 5 years or more', 'good', 'Without change in imaging features and with average growth of 3 mm a year or less for at least 5 years: likely of no clinical significance.',
      `Renal mass${sizeText}, stable for at least 5 years.`, NO_WORKUP)
  }

  if (form.exam !== 'protocol') {
    if (form.appearance === 'tstc') return tstc(form, sizeText)
    if (form.appearance === 'heterogeneous') {
      return result('Indeterminate, heterogeneous', 'accent', 'A heterogeneous mass (thick or irregular wall, mural nodule, septa or calcification) warrants full characterization.',
        `Indeterminate heterogeneous renal mass${sizeText}.`, CHARACTERIZE)
    }
    const hu = parse(form.densityHu)
    if (hu === null) return result('Awaiting density', 'neutral', 'Enter the density: a homogeneous mass is managed by its attenuation.', '', '')
    if (hu < -10) return result('Fat attenuation', 'neutral', 'A region of interest below -10 HU is fat: tick "Contains fat".', '', '')
    if (hu <= 20) {
      return form.exam === 'unenhanced'
        ? result('Likely benign cyst', 'good', 'A homogeneous mass of -10 to 20 HU on unenhanced CT is a likely benign cyst.',
          `Homogeneous renal lesion${sizeText} of ${hu} HU, likely a benign cyst.`, NO_WORKUP)
        : result('Benign cyst', 'good', 'A homogeneous mass of -10 to 20 HU on contrast-enhanced CT is a benign simple cyst.',
          `Homogeneous renal lesion${sizeText} of ${hu} HU, compatible with a benign cyst.`, NO_WORKUP)
    }
    if (form.exam === 'unenhanced' && hu >= 70) {
      return result('Hemorrhagic or proteinaceous cyst', 'good', 'A homogeneous mass of 70 HU or more on unenhanced CT is a hemorrhagic or proteinaceous cyst, unlikely to be neoplastic.',
        `Homogeneous renal lesion${sizeText} of ${hu} HU, compatible with a hemorrhagic or proteinaceous cyst.`, NO_WORKUP)
    }
    return form.exam === 'unenhanced'
      ? result('Indeterminate', 'accent', 'A homogeneous mass of 21 to 69 HU on unenhanced CT is indeterminate.',
        `Indeterminate homogeneous renal mass${sizeText} of ${hu} HU.`, CHARACTERIZE)
      : result('Indeterminate', 'accent', 'A homogeneous mass above 20 HU on contrast-enhanced CT may be a solid or complicated cystic mass.',
        `Indeterminate homogeneous renal mass${sizeText} of ${hu} HU, solid or complicated cystic.`, CHARACTERIZE)
  }

  switch (form.characterized) {
    case 'tstc':
      return tstc(form, sizeText)
    // Fig. 3.
    case 'bosniakI-II':
      return result('Benign cyst (Bosniak I or II)', 'good', 'Bosniak I and II cystic masses are reliably benign and need no follow-up.',
        `Benign Bosniak I or II cystic renal mass${sizeText}.`, NO_WORKUP)
    case 'bosniakIIF':
      return result('Bosniak IIF', 'accent', 'Bosniak IIF cystic masses are followed for morphologic change.',
        `Bosniak IIF cystic renal mass${sizeText}.`,
        `CT or MRI without and with IV contrast at 6 and 12 months, then yearly for 5 years; refer for management if there is morphologic change, and no further workup if there is none, ${PER}.`)
    case 'bosniakIII-IV':
      return result('Bosniak III or IV', 'warn', 'Bosniak III and IV cystic masses should be referred for treatment; surveillance of Bosniak III is an acceptable alternative with limited life expectancy, comorbidities or high surgical risk.',
        `Bosniak III or IV cystic renal mass${sizeText}.`, `Refer for management, ${PER}.`)
  }

  // Fig. 4: solid masses by "largest diameter in any plane".
  if (size === null || size <= 0) return result('Awaiting size', 'neutral', 'Enter the size: a solid renal mass is managed by its largest diameter.', '', '')
  if (size < 1) {
    return result('Small renal neoplasm, under 1 cm', 'accent', 'A solid mass smaller than 1 cm is likely indolent: active surveillance.',
      `Solid renal mass measuring ${size} cm, a small renal neoplasm.`,
      `Follow-up MRI (preferred) or CT without and with IV contrast beginning at 6-12 months, then yearly for 5 years; refer for management (consider biopsy) if there is growth (4 mm a year or more on average) or morphologic change, ${PER}.`)
  }
  if (size <= 4) {
    return result('Small renal neoplasm, 1 to 4 cm', 'warn', 'About 80% of solid renal masses of 1 to 4 cm are malignant.',
      `Solid renal mass measuring ${size} cm, a small renal neoplasm.`, `Refer for management; consider biopsy, ${PER}.`)
  }
  return result('Renal neoplasm, over 4 cm', 'warn', 'About 90% of solid renal masses larger than 4 cm are malignant.',
    `Solid renal mass measuring ${size} cm, a renal neoplasm.`, `Refer for management, ${PER}.`)
}
