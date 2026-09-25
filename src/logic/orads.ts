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

type UsCategory = 1 | 2 | 3 | 4 | 5

/** The wording each O-RADS US category carries, so every branch that reaches it reads the same. */
const US_TEXT: Record<UsCategory, { risk: string; recommendation: string }> = {
  1: { risk: 'normal premenopausal ovary (follicle).', recommendation: 'No further management.' },
  2: { risk: 'almost certainly benign.', recommendation: 'Management depends on size and menopausal status.' },
  3: { risk: 'low risk of malignancy.', recommendation: 'Follow-up imaging may be appropriate.' },
  4: { risk: 'intermediate risk of malignancy.', recommendation: 'Specialist evaluation and MRI may be appropriate.' },
  5: { risk: 'high risk of malignancy.', recommendation: 'Gynecologic oncology referral is recommended.' },
}

export function calculateOrads(form: OradsForm): OradsResult {
  const size = parseSize(form.sizeCm)
  const features = getFeatures(form)

  if (form.modality === 'us') {
    // O-RADS US v2022 (Strachowski et al., Radiology 2023).
    const result = (category: UsCategory, reason: string, recommendation = US_TEXT[category].recommendation): OradsResult => ({
      category: `O-RADS ${category}`,
      reason,
      impression: `O-RADS US ${category}: ${US_TEXT[category].risk}`,
      recommendation,
      features,
    })
    const cs = Number(form.colorScore)
    const noSolid = !form.solidComponent && form.papillaryProjections === 0

    if (form.peritonealDisease || form.ascites) return result(5, 'Ascites or peritoneal disease confers high risk.')
    if (form.cystType === 'simple' && form.menopausal === 'premenopausal' && size <= 3 && noSolid) {
      return result(1, 'Simple cyst of 3 cm or less in a premenopausal patient is a follicle (normal ovary).')
    }
    if (form.cystType === 'simple' && size < 10 && noSolid) return result(2, 'Simple cyst smaller than 10 cm without suspicious features.')
    if (form.cystType === 'nonsimple' && size < 10 && noSolid) return result(2, 'Nonsimple unilocular cyst smaller than 10 cm without suspicious features.')
    if (form.cystType === 'classicBenign') {
      if (size >= 10) return result(3, 'Classic benign lesion of 10 cm or more is low risk.')
      return result(2, 'Classic benign lesion smaller than 10 cm.', 'Manage according to symptoms and size.')
    }
    if (form.cystType === 'solid') {
      if (!form.smoothContour) return result(5, 'Solid lesion with an irregular outer contour is high risk at any color score.')
      if (cs === 4) return result(5, 'Smooth solid lesion with color score 4 is high risk.')
      if (cs >= 2) return result(4, 'Smooth solid lesion with color score 2 or 3 is intermediate risk.')
      return result(3, 'Smooth solid lesion with color score 1 is low risk.')
    }
    if (form.papillaryProjections >= 4) return result(5, 'Four or more papillary projections indicate high risk.')
    if (form.papillaryProjections >= 1) return result(4, 'One to three papillary projections confer intermediate risk.')
    if (form.cystType === 'multilocular') {
      if (form.solidComponent) {
        if (cs >= 3) return result(5, 'Multilocular cyst with a solid component and color score 3 or 4 is high risk.')
        return result(4, 'Multilocular cyst with a solid component and color score 1 or 2 is intermediate risk.')
      }
      if (size < 10 && cs <= 3) return result(3, 'Multilocular cyst smaller than 10 cm with color score 1 to 3 is low risk.')
      return result(4, 'Multilocular cyst of 10 cm or more, or with color score 4, is intermediate risk.')
    }
    if ((form.cystType === 'simple' || form.cystType === 'nonsimple') && form.solidComponent) {
      return result(4, 'Unilocular cyst with a solid component is intermediate risk at any size and color score.')
    }
    return result(3, 'Low-risk morphology without high-risk features.', 'Short-interval follow-up may be appropriate.')
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
