import type { LiradsForm, LiradsResult } from '../types/lirads'

function parseSize(sizeCm: string) {
  const n = Number(sizeCm)
  return Number.isFinite(n) ? n : 0
}

function getSizeBand(size: number) {
  if (size < 1) return 'lt10'
  if (size < 2) return '10to19'
  return 'gte20'
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

export function calculateLirads(form: LiradsForm): LiradsResult {
  const size = parseSize(form.sizeCm)
  const sizeBand = getSizeBand(size)
  const features = featureList(form)
  const sizeText = size > 0 ? `${size.toFixed(1)} cm observation` : 'Observation size not entered'
  const majorCount = [form.aphe, form.washout, form.capsule, form.thresholdGrowth].filter(Boolean).length

  if (form.studyQuality === 'nc') {
    return { category: 'LR-NC', categoryReason: 'Image quality is insufficient for categorization.', impression: `${sizeText}. LI-RADS NC due to noncategorizable examination quality.`, features, recommendation: 'Repeat or alternative diagnostic imaging should be considered.' }
  }
  if (form.riskStatus !== 'highRisk') {
    return { category: 'LR-1', categoryReason: 'CT/MRI LI-RADS is intended for high-risk patients.', impression: `${sizeText}. LI-RADS diagnostic categorization is not applicable in this clinical setting.`, features, recommendation: 'Use non-LI-RADS liver lesion assessment for this patient population.' }
  }
  if (form.tumorInVein === 'yes') {
    return { category: 'LR-TIV', categoryReason: 'Enhancing soft tissue in vein is present.', impression: `${sizeText} with tumor in vein. LI-RADS TIV.`, features, recommendation: 'Urgent multidisciplinary oncologic evaluation is recommended.' }
  }
  if (form.malignantNonHcc === 'yes') {
    return { category: 'LR-M', categoryReason: 'The observation has malignant features not specific for HCC.', impression: `${sizeText} with malignant imaging features not specific for HCC. LI-RADS M.`, features, recommendation: 'Biopsy or additional characterization is typically appropriate.' }
  }

  if (sizeBand === '10to19' && form.aphe && form.washout) {
    return { category: 'LR-5', categoryReason: '10-19 mm lesion with APHE and washout meets LR-5 criteria.', impression: `${sizeText} with ${features.join(', ')}. Overall appearance is diagnostic of HCC by imaging criteria, compatible with LI-RADS 5.`, features, recommendation: 'Treat as HCC in the appropriate at-risk setting.' }
  }
  if (sizeBand === '10to19' && form.aphe && form.thresholdGrowth) {
    return { category: 'LR-5', categoryReason: '10-19 mm lesion with APHE and threshold growth meets LR-5 criteria.', impression: `${sizeText} with ${features.join(', ')}. Overall appearance is diagnostic of HCC by imaging criteria, compatible with LI-RADS 5.`, features, recommendation: 'Treat as HCC in the appropriate at-risk setting.' }
  }
  if (sizeBand === 'gte20' && form.aphe && (form.washout || form.capsule || form.thresholdGrowth)) {
    return { category: 'LR-5', categoryReason: 'Observation 20 mm or larger with APHE and an additional major feature meets LR-5 criteria.', impression: `${sizeText} with ${features.join(', ')}. Overall appearance is diagnostic of HCC by imaging criteria, compatible with LI-RADS 5.`, features, recommendation: 'Treat as HCC in the appropriate at-risk setting.' }
  }

  if (form.aphe && sizeBand === 'lt10' && majorCount >= 1) {
    return { category: 'LR-4', categoryReason: 'Subcentimeter lesion with APHE and additional major features is suspicious but not LR-5.', impression: `${sizeText}${features.length ? ` with ${features.join(', ')}` : ''}. Overall appearance is probably HCC, compatible with LI-RADS 4.`, features, recommendation: 'Short-interval follow-up or multidisciplinary discussion is appropriate.' }
  }
  if (form.aphe && sizeBand === '10to19' && (form.capsule || majorCount >= 2)) {
    return { category: 'LR-4', categoryReason: '10-19 mm lesion with APHE has suspicious major features but does not meet LR-5 criteria.', impression: `${sizeText}${features.length ? ` with ${features.join(', ')}` : ''}. Overall appearance is probably HCC, compatible with LI-RADS 4.`, features, recommendation: 'Short-interval follow-up or multidisciplinary discussion is appropriate.' }
  }
  if (form.aphe || form.washout || form.capsule || form.thresholdGrowth) {
    return { category: 'LR-3', categoryReason: 'Observation has one or more major features but does not meet higher-category criteria.', impression: `${sizeText}${features.length ? ` with ${features.join(', ')}` : ''}. Intermediate probability for HCC, compatible with LI-RADS 3.`, features, recommendation: 'Repeat diagnostic imaging in 3 to 6 months is typically recommended.' }
  }
  return { category: 'LR-2', categoryReason: 'No major suspicious features are present.', impression: `${sizeText}. Probably benign appearance, compatible with LI-RADS 2.`, features, recommendation: 'Routine surveillance based on clinical context is appropriate.' }
}
