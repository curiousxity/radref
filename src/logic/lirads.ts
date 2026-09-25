import type { LiradsForm, LiradsResult } from '../types/lirads'

/** A category the CT/MRI v2018 diagnostic table can give. */
export type LiradsTableCategory = 'LR-3' | 'LR-4' | 'LR-5'

export type LiradsTableInput = {
  /** Observation size in mm. */
  sizeMm: number
  /** Nonrim arterial phase hyperenhancement. */
  aphe: boolean
  washout: boolean
  capsule: boolean
  thresholdGrowth: boolean
}

/**
 * The ACR CT/MRI LI-RADS v2018 diagnostic table (core p8). "If unsure about the presence of any
 * major feature: characterize that feature as absent", so callers pass true only when present.
 * Additional major features are nonperipheral "washout", enhancing "capsule" and threshold growth.
 * - No APHE: < 20 mm LR-3 with none or one, LR-4 with two or more; >= 20 mm LR-3 with none,
 *   LR-4 with one or more.
 * - Nonrim APHE: < 10 mm LR-3 with none, LR-4 with one or more; 10-19 mm LR-3 with none, one
 *   feature LR-4 if enhancing "capsule" or LR-5 if "washout" or threshold growth, LR-5 with two or
 *   more; >= 20 mm LR-4 with none, LR-5 with one or more.
 * The table applies only after LR-NC, LR-TIV, LR-1/LR-2 and LR-M have been excluded (core p8).
 */
export function liradsTableCategory({ sizeMm, aphe, washout, capsule, thresholdGrowth }: LiradsTableInput): LiradsTableCategory {
  const count = [washout, capsule, thresholdGrowth].filter(Boolean).length
  if (!aphe) {
    if (sizeMm < 20) return count >= 2 ? 'LR-4' : 'LR-3'
    return count >= 1 ? 'LR-4' : 'LR-3'
  }
  if (sizeMm < 10) return count >= 1 ? 'LR-4' : 'LR-3'
  if (sizeMm < 20) {
    if (count === 0) return 'LR-3'
    if (count === 1) return capsule ? 'LR-4' : 'LR-5'
    return 'LR-5'
  }
  return count >= 1 ? 'LR-5' : 'LR-4'
}

/** Core p14, "Suggested imaging workup options and time intervals" (AASLD and LI-RADS in consensus). */
export const LIRADS_MANAGEMENT = {
  'LR-NC': 'Repeat or alternative diagnostic imaging in 3 months or less.',
  'LR-1': 'Return to surveillance in 6 months.',
  'LR-2': 'Return to surveillance in 6 months; consider repeat diagnostic imaging in 6 months or less.',
  'LR-3': 'Repeat or alternative diagnostic imaging in 3 to 6 months.',
  'LR-4': 'Multidisciplinary discussion for tailored workup, which may include biopsy.',
  'LR-5': 'HCC confirmed by imaging criteria; multidisciplinary discussion for consensus management.',
  'LR-M': 'Multidisciplinary discussion for tailored workup, which often includes biopsy.',
  'LR-TIV': 'Multidisciplinary discussion for tailored workup, which may include biopsy.',
} as const

/** Size in mm from the calculator's cm entry, or undefined if blank or not a positive number. */
function parseSizeMm(sizeCm: string): number | undefined {
  if (sizeCm.trim() === '') return undefined
  const n = Number(sizeCm)
  return Number.isFinite(n) && n > 0 ? n * 10 : undefined
}

function featureList(form: LiradsForm) {
  const list: string[] = []
  if (form.aphe) list.push('non-rim APHE')
  if (form.washout) list.push('nonperipheral washout')
  if (form.capsule) list.push('enhancing capsule')
  if (form.thresholdGrowth) list.push('threshold growth')
  if (form.tumorInVein === 'yes') list.push('tumor in vein')
  if (form.malignantNonHcc === 'yes') list.push('non-HCC malignant appearance')
  return list
}

const TABLE_MEANING: Record<LiradsTableCategory, string> = {
  'LR-3': 'Intermediate probability of malignancy, compatible with LI-RADS 3.',
  'LR-4': 'Probably HCC, compatible with LI-RADS 4.',
  'LR-5': 'Definitely HCC by imaging criteria, compatible with LI-RADS 5.',
}

export function calculateLirads(form: LiradsForm): LiradsResult {
  const sizeMm = parseSizeMm(form.sizeCm)
  const features = featureList(form)
  const sizeText = sizeMm !== undefined ? `${(sizeMm / 10).toFixed(1)} cm observation` : 'Observation size not entered'
  const withFeatures = `${sizeText}${features.length ? ` with ${features.join(', ')}` : ''}`

  if (form.riskStatus !== 'highRisk') {
    return { category: 'N/A', categoryReason: 'CT/MRI LI-RADS applies only to patients with cirrhosis, chronic hepatitis B, or current or prior HCC (core p6). No category is assigned.', impression: `${sizeText}. LI-RADS categories do not apply in this patient; give the most likely diagnosis or differential instead.`, features, recommendation: 'Use non-LI-RADS liver lesion assessment for this patient population.' }
  }
  if (form.studyQuality === 'nc') {
    return { category: 'LR-NC', categoryReason: 'Image quality is insufficient for categorization.', impression: `${sizeText}. LI-RADS NC due to noncategorizable examination quality.`, features, recommendation: LIRADS_MANAGEMENT['LR-NC'] }
  }
  if (form.tumorInVein === 'yes') {
    return { category: 'LR-TIV', categoryReason: 'Unequivocal enhancing soft tissue in vein is present.', impression: `${withFeatures}. LI-RADS TIV.`, features, recommendation: LIRADS_MANAGEMENT['LR-TIV'] }
  }
  if (form.malignantNonHcc === 'yes') {
    return { category: 'LR-M', categoryReason: 'Targetoid mass, or nontargetoid mass with LR-M features that does not meet LR-5 criteria.', impression: `${withFeatures}. Probably or definitely malignant, not HCC specific, compatible with LI-RADS M.`, features, recommendation: LIRADS_MANAGEMENT['LR-M'] }
  }
  if (sizeMm === undefined) {
    return { category: 'N/A', categoryReason: 'Enter the observation size: the diagnostic table depends on it.', impression: 'Observation size not entered; category pending.', features, recommendation: 'Enter the size to see the category and the suggested workup.' }
  }

  const category = liradsTableCategory({ sizeMm, aphe: form.aphe, washout: form.washout, capsule: form.capsule, thresholdGrowth: form.thresholdGrowth })
  const reason = `v2018 diagnostic table: ${form.aphe ? 'nonrim APHE' : 'no APHE'}, ${sizeMm < 10 ? 'under 10 mm' : sizeMm < 20 ? '10-19 mm' : '20 mm or more'}, ${[form.washout, form.capsule, form.thresholdGrowth].filter(Boolean).length} additional major feature(s).${features.length === 0 ? ' A definitely or probably benign observation is LR-1 or LR-2 instead; that is a judgment made before the table.' : ''}`
  return { category, categoryReason: reason, impression: `${withFeatures}. ${TABLE_MEANING[category]}`, features, recommendation: LIRADS_MANAGEMENT[category] }
}
