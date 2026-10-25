/**
 * The incidental adrenal mass flowchart (Mayo-Smith et al., "Management of Incidental Adrenal
 * Masses: A White Paper of the ACR Incidental Findings Committee", J Am Coll Radiol
 * 2017;14:1038-1044, Fig. 1 and its text). Used by the incidental findings page's adrenal tool.
 * `impression` is the finding and `recommendation` the Recommendation section.
 */

export type AdrenalPrior = 'none' | 'stable' | 'growing'

export type AdrenalForm = {
  sizeCm: string
  /** Unenhanced CT density; blank when not measured. */
  densityHu: string
  /** Myelolipoma (macroscopic fat), no enhancement (cyst or hemorrhage) or a benign calcified mass. */
  benignFeatures: boolean
  /** Prior imaging: none, stable for 1 year or more, or new or enlarging. */
  prior: AdrenalPrior
  /** History of cancer, with no other metastatic disease (an "isolated" adrenal mass). */
  cancerHistory: boolean
}

export const initialAdrenalForm: AdrenalForm = { sizeCm: '', densityHu: '', benignFeatures: false, prior: 'none', cancerHistory: false }

export type IncidentalTone = 'good' | 'accent' | 'warn' | 'neutral'
export type IncidentalResult = { category: string; tone: IncidentalTone; reason: string; impression: string; recommendation: string }

const PER = 'per the ACR Incidental Findings Committee adrenal white paper (2017)'
// Fig. 1 note 1: "Consider biochemical assays to determine functional status and exclude
// pheochromocytoma before biopsy/resection."
const BIOCHEMISTRY = 'Consider biochemical assays to determine functional status and exclude pheochromocytoma before biopsy or resection.'
// "A dedicated adrenal CT protocol is the imaging examination of choice"; "Reduced dose NCCT
// ≤10 HU = benign adenoma"; "APW/RPW ≥60/40%: Benign adenoma, no F/U"; "APW/RPW <60/40%: Imaging
// F/U, Bx, PET-CT, or resection depending on clinical scenario".
const ADRENAL_CT = 'Dedicated adrenal CT: an unenhanced density of 10 HU or less is a benign adenoma; above 10 HU, an absolute washout of 60% or more or a relative washout of 40% or more is a benign adenoma, and lower washout calls for imaging follow-up, biopsy, PET/CT or resection depending on the clinical scenario'

function parse(value: string): number | null {
  if (value.trim() === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function result(category: string, tone: IncidentalTone, reason: string, impression: string, recommendation: string): IncidentalResult {
  return { category, tone, reason, impression, recommendation }
}

export function classifyAdrenal(form: AdrenalForm): IncidentalResult {
  const size = parse(form.sizeCm)
  const hu = parse(form.densityHu)

  if (size === null || size <= 0) {
    return result('Awaiting size', 'neutral', 'Enter the size: the adrenal flowchart starts from it.', '', '')
  }
  // "In general, an incidental adrenal mass that is <1 cm in the short axis need not be pursued."
  if (size < 1) {
    return result('Smaller than 1 cm', 'good', 'An incidental adrenal mass smaller than 1 cm in the short axis need not be pursued.',
      'Adrenal nodule smaller than 1 cm.', `No further evaluation, ${PER}.`)
  }
  // "Myelolipoma, No enhancement, Ca++ = Benign, no F/U."
  if (form.benignFeatures) {
    return result('Benign', 'good', 'Diagnostic benign imaging features (myelolipoma, no enhancement, or a benign calcified mass).',
      `Adrenal mass measuring ${size} cm with diagnostic benign imaging features.`, `No follow-up imaging, ${PER}.`)
  }
  // "≤10 HU or ↓ signal on CS-MR = Benign adenoma, no F/U" ... "regardless of size".
  if (hu !== null && hu <= 10) {
    return result('Benign adenoma', 'good', 'An unenhanced density of 10 HU or less is diagnostic of a lipid-rich adenoma, regardless of size.',
      `Adrenal mass measuring ${size} cm with an unenhanced density of ${hu} HU, compatible with a benign adenoma.`, `No follow-up imaging, ${PER}.`)
  }
  // "≥4 cm: No Cancer Hx: Consider resection; + Cancer Hx: Consider Bx or PET-CT."
  if (size >= 4) {
    return form.cancerHistory
      ? result('4 cm or more, cancer history', 'warn', 'Indeterminate adrenal mass of 4 cm or more in a patient with a history of cancer.',
        `Indeterminate adrenal mass measuring ${size} cm.`, `Consider biopsy or PET/CT, ${PER}. ${BIOCHEMISTRY}`)
      : result('4 cm or more', 'warn', 'Indeterminate adrenal mass of 4 cm or more with no cancer history: possible adrenal cortical carcinoma.',
        `Indeterminate adrenal mass measuring ${size} cm.`, `Consider surgical resection (without biopsy), ${PER}. ${BIOCHEMISTRY}`)
  }
  // 1 to <4 cm with prior imaging: "Stable ≥1 year: Benign, no F/U"; "New or enlarging: No Cancer
  // Hx: Consider F/U adrenal CT or resection; + Cancer Hx: Consider Bx or PET-CT."
  if (form.prior === 'stable') {
    return result('Benign (stable)', 'good', 'An indeterminate adrenal mass stable for 1 year or more is very likely benign.',
      `Adrenal mass measuring ${size} cm, stable for 1 year or more.`, `No follow-up imaging, ${PER}.`)
  }
  if (form.prior === 'growing') {
    return form.cancerHistory
      ? result('New or enlarging, cancer history', 'warn', 'A new or enlarging adrenal mass in a patient with a history of cancer.',
        `New or enlarging indeterminate adrenal mass measuring ${size} cm.`, `Consider biopsy or PET/CT, ${PER}. ${BIOCHEMISTRY}`)
      : result('New or enlarging', 'warn', 'A new or enlarging indeterminate adrenal mass with no cancer history.',
        `New or enlarging indeterminate adrenal mass measuring ${size} cm.`, `Consider follow-up adrenal CT or resection, depending on the rate of growth, ${PER}. ${BIOCHEMISTRY}`)
  }
  // No prior imaging, cancer history, isolated mass: "Adrenal CT".
  if (form.cancerHistory) {
    return result('Indeterminate, cancer history', 'accent', 'Indeterminate adrenal mass of 1 to less than 4 cm in a patient with a history of cancer, with no prior imaging.',
      `Indeterminate adrenal mass measuring ${size} cm.`, `${ADRENAL_CT}, ${PER}.`)
  }
  // "1-2 cm, Probably benign: Consider 12 month F/U adrenal CT"; ">2cm, <4cm: Adrenal CT", and "6- to
  // 12-month follow-up CT to document stability or resection may be considered" when adrenal CT
  // cannot make a specific benign diagnosis.
  if (size <= 2) {
    return result('Probably benign', 'good', 'Indeterminate adrenal mass of 1 to 2 cm with no cancer history and no prior imaging: almost certainly benign.',
      `Indeterminate adrenal mass measuring ${size} cm, probably benign.`, `Consider follow-up adrenal CT in 12 months to document stability, ${PER}.`)
  }
  return result('Indeterminate, over 2 cm', 'accent', 'Indeterminate adrenal mass of more than 2 to less than 4 cm with no cancer history and no prior imaging.',
    `Indeterminate adrenal mass measuring ${size} cm.`,
    `${ADRENAL_CT}; if no specific benign diagnosis can be made, 6- to 12-month follow-up CT to document stability or resection may be considered, ${PER}.`)
}
