import type { OradsForm, OradsResult } from '../types/orads'

function parseSize(sizeCm: string) {
  const n = Number(sizeCm)
  return Number.isFinite(n) ? n : 0
}

function getFeatures(form: OradsForm) {
  const features: string[] = []
  if (form.solidComponent) features.push('solid component')
  if (form.papillaryProjections > 0) features.push(`${form.papillaryProjections} papillary projection${form.papillaryProjections > 1 ? 's' : ''}`)
  if (form.locules > 1) features.push(`${form.locules} locules`)
  if (form.ascites) features.push('ascites')
  if (form.peritonealDisease) features.push('peritoneal disease')
  if (form.enhancingSolidTissue) features.push('enhancing solid tissue')
  if (form.fat) features.push('fat')
  if (form.hemorrhagic) features.push('hemorrhagic content')
  if (form.diffusionRestriction) features.push('diffusion restriction')
  return features
}

export function calculateOrads(form: OradsForm): OradsResult {
  const size = parseSize(form.sizeCm)
  const features = getFeatures(form)

  if (form.modality === 'us') {
    if (form.peritonealDisease || form.ascites) {
      return { category: 'O-RADS 5', reason: 'Ascites or peritoneal disease confers high risk.', impression: 'O-RADS US 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
    }
    // O-RADS US v2022 (Strachowski et al., Radiology 2023). Colour score runs 1 (no flow) to 4;
    // a 0 from older forms is read as 1.
    const cs = form.colorScore === '0' ? 1 : Number(form.colorScore)
    const unilocular = form.cystType === 'simple' || form.cystType === 'nonsimple'
    if (form.cystType === 'simple' && form.menopausal === 'premenopausal' && size <= 3 && !form.solidComponent && form.papillaryProjections === 0) {
      return { category: 'O-RADS 1', reason: 'Simple cyst of 3 cm or less in a premenopausal patient is a follicle (normal ovary).', impression: 'O-RADS US 1: normal premenopausal ovary (follicle).', recommendation: 'No further management.', features }
    }
    if (form.cystType === 'simple' && size < 10 && !form.solidComponent && form.papillaryProjections === 0) {
      return { category: 'O-RADS 2', reason: 'Simple cyst smaller than 10 cm without suspicious features.', impression: 'O-RADS US 2: almost certainly benign.', recommendation: 'Management depends on size and menopausal status.', features }
    }
    if (form.cystType === 'nonsimple' && size < 10 && !form.solidComponent && form.papillaryProjections === 0) {
      return { category: 'O-RADS 2', reason: 'Nonsimple unilocular cyst smaller than 10 cm without suspicious features.', impression: 'O-RADS US 2: almost certainly benign.', recommendation: 'Management depends on size and menopausal status.', features }
    }
    if (form.cystType === 'classicBenign') {
      if (size >= 10) return { category: 'O-RADS 3', reason: 'Classic benign lesion of 10 cm or more is low risk.', impression: 'O-RADS US 3: low risk of malignancy.', recommendation: 'Follow-up imaging may be appropriate.', features }
      return { category: 'O-RADS 2', reason: 'Classic benign lesion smaller than 10 cm.', impression: 'O-RADS US 2: almost certainly benign.', recommendation: 'Manage according to symptoms and size.', features }
    }
    if (form.cystType === 'solid') {
      if (!form.smoothContour) return { category: 'O-RADS 5', reason: 'Solid lesion with an irregular outer contour is high risk at any color score.', impression: 'O-RADS US 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
      if (cs === 4) return { category: 'O-RADS 5', reason: 'Smooth solid lesion with color score 4 is high risk.', impression: 'O-RADS US 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
      if (cs >= 2) return { category: 'O-RADS 4', reason: 'Smooth solid lesion with color score 2 or 3 is intermediate risk.', impression: 'O-RADS US 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation and MRI may be appropriate.', features }
      return { category: 'O-RADS 3', reason: 'Smooth solid lesion with color score 1 is low risk.', impression: 'O-RADS US 3: low risk of malignancy.', recommendation: 'Follow-up imaging may be appropriate.', features }
    }
    if (form.papillaryProjections >= 4) {
      return { category: 'O-RADS 5', reason: 'Four or more papillary projections indicate high risk.', impression: 'O-RADS US 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
    }
    if (form.papillaryProjections >= 1 && form.papillaryProjections <= 3) {
      return { category: 'O-RADS 4', reason: 'One to three papillary projections confer intermediate risk.', impression: 'O-RADS US 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation and MRI may be appropriate.', features }
    }
    if (form.cystType === 'multilocular') {
      if (form.solidComponent) {
        if (cs >= 3) return { category: 'O-RADS 5', reason: 'Multilocular cyst with a solid component and color score 3 or 4 is high risk.', impression: 'O-RADS US 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
        return { category: 'O-RADS 4', reason: 'Multilocular cyst with a solid component and color score 1 or 2 is intermediate risk.', impression: 'O-RADS US 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation and MRI may be appropriate.', features }
      }
      if (size < 10 && cs <= 3) {
        return { category: 'O-RADS 3', reason: 'Multilocular cyst smaller than 10 cm with color score 1 to 3 is low risk.', impression: 'O-RADS US 3: low risk of malignancy.', recommendation: 'Follow-up imaging may be appropriate.', features }
      }
      return { category: 'O-RADS 4', reason: 'Multilocular cyst of 10 cm or more, or with color score 4, is intermediate risk.', impression: 'O-RADS US 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation is appropriate.', features }
    }
    if (unilocular && form.solidComponent) {
      return { category: 'O-RADS 4', reason: 'Unilocular cyst with a solid component is intermediate risk at any size and color score.', impression: 'O-RADS US 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation and MRI may be appropriate.', features }
    }
    return { category: 'O-RADS 3', reason: 'Low-risk morphology without high-risk features.', impression: 'O-RADS US 3: low risk of malignancy.', recommendation: 'Short-interval follow-up may be appropriate.', features }
  }

  if (form.modality === 'mri') {
    if (form.peritonealDisease) {
      return { category: 'O-RADS 5', reason: 'Peritoneal disease is present on MRI.', impression: 'O-RADS MRI 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
    }
    if (!form.enhancingSolidTissue && (form.fat || form.hemorrhagic)) {
      return { category: 'O-RADS 2', reason: 'Benign fat-containing or hemorrhagic lesion without enhancing solid tissue.', impression: 'O-RADS MRI 2: very low risk of malignancy.', recommendation: 'Usually benign; manage clinically.', features }
    }
    if (!form.enhancingSolidTissue && form.enhancement === 'none') {
      return { category: 'O-RADS 2', reason: 'No wall or internal enhancement is identified.', impression: 'O-RADS MRI 2: very low risk of malignancy.', recommendation: 'Usually benign; manage clinically.', features }
    }
    if (form.enhancingSolidTissue && form.enhancement === 'marked') {
      return { category: 'O-RADS 5', reason: 'Enhancing solid tissue with marked enhancement is high risk.', impression: 'O-RADS MRI 5: high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.', features }
    }
    // The curve sets the score of enhancing solid tissue; diffusion restriction does not raise it.
    if (form.enhancingSolidTissue && form.enhancement === 'moderate') {
      return { category: 'O-RADS 4', reason: 'Enhancing solid tissue with an intermediate-risk (moderate) enhancement curve is intermediate risk.', impression: 'O-RADS MRI 4: intermediate risk of malignancy.', recommendation: 'Specialist evaluation is appropriate.', features }
    }
    return { category: 'O-RADS 3', reason: 'Indeterminate lesion without high-risk MRI features.', impression: 'O-RADS MRI 3: low risk of malignancy.', recommendation: 'Follow-up imaging or specialist review may be appropriate.', features }
  }

  return { category: 'O-RADS 0', reason: 'Incomplete evaluation.', impression: 'O-RADS 0: incomplete evaluation.', recommendation: 'Complete the study or obtain additional imaging.', features }
}
