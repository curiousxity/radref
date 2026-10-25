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

const US_RISK: Record<UsCategory, string> = {
  1: 'normal premenopausal ovary (follicle).',
  2: 'almost certainly benign.',
  3: 'low risk of malignancy.',
  4: 'intermediate risk of malignancy.',
  5: 'high risk of malignancy.',
}

/*
 * Management from the O-RADS US v2022 Assessment Categories chart (ACR, November 2022). Category
 * 2's follow-ups carry footnote *: "If smaller (≥10–15% decrease in average linear dimension), no
 * further surveillance. If stable, follow-up US at 24 months from initial exam. If enlarging
 * (≥10–15% increase in average linear dimension), consider follow-up US at 12 and 24 months from
 * initial exam, then management per gynecology." Category 3's carries footnote **: "If stable,
 * follow-up at 12 and 24 months from initial exam, then as clinically indicated."
 */
const PER_ORADS = 'per O-RADS US v2022'
const SIZE_NEEDED = 'Enter the size: the O-RADS US follow-up depends on it.'
const NO_FOLLOW_UP = `No imaging follow-up, ${PER_ORADS}.`
const AFTER_FOLLOW_UP = 'If smaller (a 10-15% or greater decrease in average linear dimension), no further surveillance; if stable, follow-up US at 24 months from the initial exam; if enlarging, consider follow-up US at 12 and 24 months from the initial exam, then management per gynecology.'
const followUpUs = (months: number) => `Follow-up US in ${months} months, ${PER_ORADS}. ${AFTER_FOLLOW_UP}`

const US_MANAGEMENT: Record<1 | 3 | 4 | 5, string> = {
  1: `No further management, ${PER_ORADS}.`,
  3: `If not surgically excised, consider follow-up US within 6 months; if stable, follow-up at 12 and 24 months from the initial exam, then as clinically indicated. Management by a gynecologist, ${PER_ORADS}.`,
  4: `Imaging options include an US specialist (if available), MRI with an O-RADS MRI score, or the gyn-oncologist's protocol. Management by a gynecologist with gyn-oncologist consultation, or solely by a gyn-oncologist, ${PER_ORADS}.`,
  5: `Imaging per the gyn-oncologist's protocol; management by a gyn-oncologist, ${PER_ORADS}.`,
}
const SOLID_LOW_RISK = `If not surgically excised, consider follow-up US within 6 months; if stable, follow-up at 12 and 24 months from the initial exam, then as clinically indicated. As the lesion is solid, an US specialist (if available) or MRI with an O-RADS MRI score may be considered. Management by a gynecologist, ${PER_ORADS}.`

/*
 * The v2022 "Classic Benign Lesions" table. Footnote † on its 12-month follow-ups: "If stable,
 * consider US follow-up at 24 months from initial exam, then as clinically indicated." Its general
 * rule: "If sonographic features are only suggestive, and overall assessment is uncertain, consider
 * follow-up US within 3 months."
 */
const CLASSIC_AFTER = 'If stable, consider US follow-up at 24 months from the initial exam, then as clinically indicated.'
const CLASSIC_UNCERTAIN = 'If the sonographic features are only suggestive and the overall assessment is uncertain, consider follow-up US within 3 months.'
const CONFIRM = 'options to confirm include follow-up US in 2-3 months, an US specialist (if available) or MRI with an O-RADS MRI score'
const EXTRAOVARIAN: OradsForm['classicType'][] = ['paraovarian', 'inclusion', 'hydrosalpinx']

function classicManagement(form: OradsForm, size: number): string {
  const pre = form.menopausal === 'premenopausal'
  const plan = (() => {
    switch (form.classicType) {
      case 'hemorrhagic':
        if (!pre) return `Early postmenopausal (under 5 years): ${CONFIRM}. Late postmenopausal (5 years or more): a hemorrhagic cyst should not occur; recategorize using other lexicon descriptors, ${PER_ORADS}.`
        if (size <= 0) return SIZE_NEEDED
        return size <= 5 ? NO_FOLLOW_UP : `Follow-up US in 2-3 months, ${PER_ORADS}.`
      case 'dermoid':
        if (size <= 0) return SIZE_NEEDED
        return size <= 3
          ? `May consider follow-up US in 12 months, ${PER_ORADS}. ${CLASSIC_AFTER}`
          : `If not surgically excised, follow-up US in 12 months, ${PER_ORADS}. ${CLASSIC_AFTER}`
      case 'endometrioma':
        return pre
          ? `If not surgically excised, follow-up US in 12 months, ${PER_ORADS}. ${CLASSIC_AFTER}`
          : `On the initial exam, ${CONFIRM}; then, if not surgically excised, follow-up US in 12 months, ${PER_ORADS}. ${CLASSIC_AFTER}`
      default:
        return `No imaging follow-up; gynecologist as needed for clinical issues, ${PER_ORADS}.`
    }
  })()
  return `${plan} ${CLASSIC_UNCERTAIN}`
}

/** Category 2 cysts: the chart's follow-up by size and menopausal status. */
function cystManagement(form: OradsForm, size: number): string {
  if (size <= 0) return SIZE_NEEDED
  const pre = form.menopausal === 'premenopausal'
  if (form.cystType === 'simple') {
    if (size <= 3) return NO_FOLLOW_UP
    if (size <= 5) return pre ? NO_FOLLOW_UP : followUpUs(12)
    return followUpUs(12)
  }
  if (size <= 3) return pre ? NO_FOLLOW_UP : followUpUs(12)
  return followUpUs(6)
}

export function calculateOrads(form: OradsForm): OradsResult {
  const size = parseSize(form.sizeCm)
  const features = getFeatures(form)

  if (form.modality === 'us') {
    // O-RADS US v2022 (Strachowski et al., Radiology 2023).
    const result = (category: UsCategory, reason: string, recommendation = US_MANAGEMENT[category as 1 | 3 | 4 | 5]): OradsResult => ({
      category: `O-RADS ${category}`,
      reason,
      impression: `O-RADS US ${category}: ${US_RISK[category]}`,
      recommendation,
      features,
    })
    const cs = Number(form.colorScore)
    const noSolid = !form.solidComponent && form.papillaryProjections === 0

    if (form.peritonealDisease || form.ascites) return result(5, 'Ascites or peritoneal disease confers high risk.')
    if (form.cystType === 'simple' && form.menopausal === 'premenopausal' && size <= 3 && noSolid) {
      return result(1, 'Simple cyst of 3 cm or less in a premenopausal patient is a follicle (normal ovary).')
    }
    if (form.cystType === 'simple' && size < 10 && noSolid) return result(2, 'Simple cyst smaller than 10 cm without suspicious features.', cystManagement(form, size))
    // "Unilocular cyst, irregular, any size" is category 3.
    if (form.cystType === 'nonsimple' && form.irregularWall && noSolid) return result(3, 'Unilocular cyst with an irregular inner wall is low risk at any size.')
    if (form.cystType === 'nonsimple' && size < 10 && noSolid) return result(2, 'Nonsimple unilocular cyst smaller than 10 cm without suspicious features.', cystManagement(form, size))
    if (form.cystType === 'classicBenign') {
      // "Typical benign extraovarian lesion ... Any size" is category 2; an ovarian one of 10 cm or more is 3.
      if (EXTRAOVARIAN.includes(form.classicType)) return result(2, 'Classic benign extraovarian lesion, at any size.', classicManagement(form, size))
      if (size >= 10) return result(3, 'Classic benign ovarian lesion of 10 cm or more is low risk.')
      return result(2, 'Classic benign ovarian lesion smaller than 10 cm.', classicManagement(form, size))
    }
    if (form.cystType === 'solid') {
      if (!form.smoothContour) return result(5, 'Solid lesion with an irregular outer contour is high risk at any color score.')
      if (cs === 4) return result(5, 'Smooth solid lesion with color score 4 is high risk.')
      if (cs >= 2) return result(4, 'Smooth solid lesion with color score 2 or 3 is intermediate risk.')
      return result(3, 'Smooth solid lesion with color score 1 is low risk.', SOLID_LOW_RISK)
    }
    if (form.papillaryProjections >= 4) return result(5, 'Four or more papillary projections indicate high risk.')
    if (form.papillaryProjections >= 1) return result(4, 'One to three papillary projections confer intermediate risk.')
    if (form.cystType === 'multilocular') {
      if (form.solidComponent) {
        if (cs >= 3) return result(5, 'Multilocular cyst with a solid component and color score 3 or 4 is high risk.')
        return result(4, 'Multilocular cyst with a solid component and color score 1 or 2 is intermediate risk.')
      }
      // v2022 chart: "Bilocular cyst without solid component(s): Irregular, any size, any CS" and
      // "Multilocular cyst without solid component(s): ... Irregular, any size, any CS" are 4; a
      // "Bilocular, smooth cyst" under 10 cm is 2 (managed with the non-simple cysts), and a smooth
      // "Uni- or bilocular cyst ... ≥10 cm" is 3.
      const bilocular = form.locules === 2
      if (form.irregularWall) {
        return result(4, `${bilocular ? 'Bilocular' : 'Multilocular'} cyst with an irregular inner wall is intermediate risk at any size and color score.`)
      }
      if (bilocular) {
        return size < 10
          ? result(2, 'Smooth bilocular cyst smaller than 10 cm without a solid component.', cystManagement(form, size))
          : result(3, 'Smooth bilocular cyst of 10 cm or more is low risk.')
      }
      if (size < 10 && cs <= 3) return result(3, 'Multilocular cyst smaller than 10 cm with color score 1 to 3 is low risk.')
      return result(4, 'Multilocular cyst of 10 cm or more, or with color score 4, is intermediate risk.')
    }
    if ((form.cystType === 'simple' || form.cystType === 'nonsimple') && form.solidComponent) {
      return result(4, 'Unilocular cyst with a solid component is intermediate risk at any size and color score.')
    }
    return result(3, 'Low-risk morphology without high-risk features.')
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
