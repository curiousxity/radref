/**
 * ACR 2017 surveillance for an incidental pancreatic cyst with no high-risk stigma, worrisome
 * feature, symptom or growth (Megibow et al., J Am Coll Radiol 2017;14:911-923, Charts 1-4).
 * Shared by the pancreatic cyst calculator and the pancreatic cysts study, whose lesson these
 * intervals come from.
 */

export const PER_ACR = 'per ACR 2017 incidental pancreatic cyst recommendations'
export const ACR_IMAGING = 'Contrast-enhanced MRI or pancreas-protocol CT'

/**
 * Chart 3, low risk by imaging (Megibow 2017, Fig. 3): "Reimage q6mos x 4"; "Stable over initial 2
 * years: Reimage q1y x 2, then q2y x 3"; "STOP if stable over 10 years".
 */
export const CHART3_LOW_RISK = `${ACR_IMAGING} every 6 months for 2 years; if stable, yearly for 2 years, then every 2 years for 3 rounds, stopping if stable over 10 years`

export type AcrAgeBand = 'under65' | '65to79' | '80plus'
/** Main pancreatic duct communication: 'present' is Chart 2A, anything else Chart 2B. */
export type AcrCommunication = 'present' | 'absentOrUnknown'

/**
 * The follow-up for a cyst of this size (largest diameter in mm), age band and duct
 * communication. A cyst over 2.5 cm gets Chart 3's (or Chart 4's) schedule for a low-risk cyst,
 * stated as conditional, since the low-risk test needs the wall, mural nodule, duct calibre and
 * calcification.
 */
export function acrSurveillance(sizeMm: number, age: AcrAgeBand, communication: AcrCommunication): string {
  if (age === '80plus') {
    if (sizeMm < 5) return `White-dot cyst in a patient 80 or older: follow-up only if the patient would be a surgical candidate, and then a single follow-up at 2 years at most, ${PER_ACR}.`
    return sizeMm <= 25
      ? `Follow-up or EUS/FNA only if the patient is a surgical candidate; if so, imaging every 2 years twice, stopping if stable, ${PER_ACR} (Chart 4).`
      : `Follow-up or EUS/FNA only if the patient is a surgical candidate; if so, a low-risk cyst over 2.5 cm is imaged every 2 years twice, stopping if stable, and a high-risk cyst goes to EUS/FNA and surgical consultation, ${PER_ACR} (Chart 4).`
  }
  if (sizeMm < 15) {
    if (sizeMm < 5) return `Single follow-up at 2 years; stop if stable, ${PER_ACR} (Chart 1, white-dot cyst).`
    if (age === 'under65') return `${ACR_IMAGING} yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years, ${PER_ACR} (Chart 1).`
    return `${ACR_IMAGING} every 2 years for 5 rounds; stop if stable over 10 years, ${PER_ACR} (Chart 1).`
  }
  if (sizeMm <= 25) {
    if (communication === 'present') {
      return sizeMm < 20
        ? `${ACR_IMAGING} yearly for 5 years, then every 2 years for 4 years, ${PER_ACR} (Chart 2A); EUS/FNA at detection is an acceptable alternative.`
        : `${ACR_IMAGING} every 6 months for 2 years, yearly for 2, then every 2 years for 6, ${PER_ACR} (Chart 2A); EUS/FNA at detection is an acceptable alternative.`
    }
    return `${ACR_IMAGING} every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or EUS/FNA to establish whether it is mucinous, ${PER_ACR} (Chart 2B).`
  }
  return `Cyst over 2.5 cm: if low risk by imaging, ${CHART3_LOW_RISK}; a high-risk cyst goes to EUS/FNA and surgical evaluation. EUS/FNA at detection is an option, ${PER_ACR} (Chart 3).`
}

/* The pancreatic cyst calculator. */

export type AgeBand = '<65' | '65-79' | '80+'
export type DuctCommunication = 'yes' | 'no' | 'indeterminate'
export type AlternativeDiagnosis = 'none' | 'serous' | 'pseudocyst' | 'otherBenign'

/** The calculator's inputs: size in cm and the age band. */
export type PancreaticCystForm = {
  sizeCm: string
  ageBand: AgeBand
  ductCommunication: DuctCommunication
  growth: boolean
  worrisomeFeatures: boolean
  highRiskStigmata: boolean
  alternativeDiagnosis: AlternativeDiagnosis
  symptomsOrPancreatitis: boolean
}

function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const AGE: Record<AgeBand, AcrAgeBand> = { '<65': 'under65', '65-79': '65to79', '80+': '80plus' }

/**
 * The escalations (an alternative diagnosis, high-risk stigmata, symptoms, growth or worrisome
 * features) come first; otherwise the cyst is followed at the ACR 2017 interval for its size, age
 * band and duct communication, shared with the pancreatic cysts study (`acrSurveillance`).
 * `impression` is the finding and `management` the Recommendation section.
 */
export function classifyPancreaticCyst(form: PancreaticCystForm) {
  const size = num(form.sizeCm)

  if (form.alternativeDiagnosis !== 'none') {
    return {
      category: 'Alternative benign diagnosis',
      reason: 'The lesion has features suggesting a benign alternative diagnosis rather than a presumed mucinous incidental cyst.',
      management: 'Manage according to the specific diagnosis rather than the incidental pancreatic cyst algorithm.',
      impression: 'Pancreatic cystic lesion has features favoring an alternative benign diagnosis.',
    }
  }

  if (form.highRiskStigmata) {
    return {
      category: 'High risk',
      reason: 'High-risk stigmata warrant escalation beyond routine surveillance.',
      management: 'Recommend EUS/FNA and pancreatic surgical or specialty consultation.',
      impression: 'Incidental pancreatic cyst demonstrates high-risk features.',
    }
  }

  if (form.symptomsOrPancreatitis) {
    return {
      category: 'Symptomatic / special consideration',
      reason: 'Symptoms or pancreatitis can change management and may warrant specialty evaluation.',
      management: 'Consider pancreatic specialty referral and individualized management rather than routine surveillance alone.',
      impression: 'Pancreatic cyst is associated with symptoms or pancreatitis.',
    }
  }

  if (form.worrisomeFeatures || form.growth) {
    return {
      category: 'Worrisome',
      reason: 'Growth or worrisome features should prompt closer evaluation than standard surveillance.',
      management: 'Recommend EUS/FNA or closer interval follow-up, with pancreatic specialty referral as appropriate.',
      impression: 'Incidental pancreatic cyst has growth and/or worrisome imaging features.',
    }
  }

  if (size <= 0) {
    return {
      category: 'Awaiting size',
      reason: 'Enter the cyst size: the ACR surveillance interval depends on it.',
      management: '',
      impression: '',
    }
  }

  const sizeMm = Math.round(size * 10)
  const communicating = form.ductCommunication === 'yes'
  const category =
    form.ageBand === '80+' ? 'Age 80 or older (ACR Chart 4)'
      : sizeMm < 5 ? 'White-dot cyst (ACR Chart 1)'
        : sizeMm < 15 ? 'Under 1.5 cm (ACR Chart 1)'
          : sizeMm <= 25 ? (communicating ? '1.5 to 2.5 cm, communicating (ACR Chart 2A)' : '1.5 to 2.5 cm (ACR Chart 2B)')
            : 'Large cyst, over 2.5 cm (ACR Chart 3)'
  const duct = form.ductCommunication === 'yes' ? ', communicating with the main pancreatic duct'
    : form.ductCommunication === 'no' ? ', without main pancreatic duct communication' : ''
  return {
    category,
    reason: 'No high-risk stigmata, worrisome features, growth or symptoms: follow-up by size and age.',
    management: acrSurveillance(sizeMm, AGE[form.ageBand], communicating ? 'present' : 'absentOrUnknown'),
    impression: `Incidental pancreatic cyst measuring ${size} cm${duct}, without high-risk stigmata or worrisome features.`,
  }
}
