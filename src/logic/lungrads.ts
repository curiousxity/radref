/**
 * Lung-RADS v2022 category for the dominant screening-CT finding, shared by the Lung-RADS
 * calculator and the lung screening CT study. The rules follow the ACR Lung-RADS v2022
 * table and its notes (Christensen et al., J Am Coll Radiol 2024;21:473-488).
 */

export type NoduleType = 'solid' | 'partSolid' | 'groundGlass' | 'airway' | 'infectious'
export type Timepoint = 'baseline' | 'new' | 'growing' | 'stable'
/** The category a stable nodule was being followed as ('none': not on short-interval follow-up). */
export type PriorCategory = 'none' | '3' | '4A' | '4B'

export type LungRadsForm = {
  noduleType: NoduleType
  timepoint: Timepoint
  meanDiameterMm: string
  solidComponentMm: string
  airwaySegment: 'subsegmental' | 'segmentalOrMoreProximal'
  /** Note 11c: air within the airway abnormality, favoring secretions, with no underlying soft-tissue nodule. */
  airwayBenignFeatures: boolean
  inflammatoryPattern: boolean
  verySuspicious: boolean
  priorCategory: PriorCategory
}

export const initialLungRadsForm: LungRadsForm = {
  noduleType: 'solid',
  timepoint: 'baseline',
  meanDiameterMm: '',
  solidComponentMm: '',
  airwaySegment: 'subsegmental',
  airwayBenignFeatures: false,
  inflammatoryPattern: false,
  verySuspicious: false,
  priorCategory: 'none',
}

export type LungRadsResult = { category: string; reason: string; management: string; impression: string }

function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const ANNUAL = '12-month screening LDCT.'
const SIX_MONTH = '6-month LDCT is recommended.'
const THREE_MONTH = '3-month LDCT is recommended.'
const THREE_MONTH_PET = '3-month LDCT is recommended; PET/CT may be considered, as there is a solid nodule or solid component of 8 mm or more.'
const FOUR_B = 'Diagnostic chest CT with or without contrast; PET/CT may be considered if there is a solid nodule or solid component of 8 mm or more; tissue sampling; and/or referral for further clinical evaluation. Management depends on clinical evaluation, patient preference, and probability of malignancy.'

function r2(reason: string, impression: string): LungRadsResult {
  return { category: 'Lung-RADS 2', reason, management: ANNUAL, impression: `${impression} Lung-RADS 2. Continue annual screening LDCT in 12 months.` }
}

function r3(reason: string, impression: string): LungRadsResult {
  return { category: 'Lung-RADS 3', reason, management: SIX_MONTH, impression: `${impression} Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.` }
}

function r4a(reason: string, impression: string, pet = false): LungRadsResult {
  return { category: 'Lung-RADS 4A', reason, management: pet ? THREE_MONTH_PET : THREE_MONTH, impression: `${impression} Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.` }
}

function r4b(reason: string, impression: string, management = FOUR_B): LungRadsResult {
  return { category: 'Lung-RADS 4B', reason, management, impression: `${impression} Lung-RADS 4B. Recommend diagnostic evaluation.` }
}

/** Stepped management for a stable or decreased solid or part-solid nodule. */
function stable(prior: PriorCategory, kind: string): LungRadsResult {
  if (prior === '4A') {
    return r3('A category 4A lesion that is stable or decreased in size at 3-month follow-up CT is category 3.', `Stable ${kind} pulmonary nodule at 3-month follow-up.`)
  }
  if (prior === '4B') {
    return r4b(
      'A category 4B lesion returns to category 2 only when it is proven benign after appropriate diagnostic workup; stability alone is not a step-down rule.',
      `Stable ${kind} pulmonary nodule under category 4B workup.`,
    )
  }
  if (prior === '3') {
    return r2('A category 3 lesion that is stable or decreased in size at 6-month follow-up CT is category 2.', `Stable ${kind} pulmonary nodule at 6-month follow-up.`)
  }
  return r2('Stable or decreased nodule, not on short-interval follow-up: category 2.', `Stable ${kind} pulmonary nodule.`)
}

function base(form: LungRadsForm): LungRadsResult {
  const size = num(form.meanDiameterMm)
  const solid = num(form.solidComponentMm)
  const when = form.timepoint

  if (form.noduleType === 'infectious' || form.inflammatoryPattern) {
    return {
      category: 'Lung-RADS 0',
      reason: 'Findings suggestive of an infectious or inflammatory process are category 0.',
      management: '1-3 month LDCT.',
      impression: 'Findings suggestive of an infectious or inflammatory process. Lung-RADS 0. Recommend 1-3 month low-dose chest CT follow-up.',
    }
  }

  if (form.noduleType === 'airway') {
    if (form.airwaySegment === 'subsegmental') {
      return r2('Subsegmental airway nodule (baseline, new or stable) is category 2.', 'Subsegmental airway nodule.')
    }
    if (form.airwayBenignFeatures) {
      return r2('Air within a segmental or more proximal airway abnormality often favors secretions; with no underlying soft-tissue nodule it may be category 2.', 'Segmental airway abnormality containing air, favoring secretions.')
    }
    if (when === 'stable' || when === 'growing') {
      return r4b(
        'Segmental or more proximal airway nodule that is stable or growing (persisting at 3-month follow-up) is category 4B.',
        'Persistent segmental or more proximal airway nodule.',
        `${FOUR_B} A persistent airway nodule is typically evaluated with bronchoscopy.`,
      )
    }
    return r4a('Segmental or more proximal airway nodule at baseline or new is category 4A.', 'Segmental or more proximal airway nodule.')
  }

  if (form.noduleType === 'groundGlass') {
    if (size < 30) return r2('Nonsolid nodule < 30 mm (baseline, new, growing or stable) is category 2.', 'Nonsolid pulmonary nodule.')
    if (when === 'stable') return r2('Nonsolid nodule of 30 mm or more that is stable or slowly growing is category 2.', 'Stable large nonsolid pulmonary nodule.')
    if (when === 'growing') return r3('Growing nonsolid nodule of 30 mm or more: the table lists only baseline or new (category 3) and stable or slowly growing (category 2); category 3 is kept.', 'Growing large nonsolid pulmonary nodule.')
    return r3('Nonsolid nodule of 30 mm or more at baseline or new is category 3.', 'Large nonsolid pulmonary nodule.')
  }

  if (form.noduleType === 'solid') {
    if (when === 'baseline') {
      if (size < 6) return r2('Baseline solid nodule < 6 mm is category 2.', 'Small solid pulmonary nodule.')
      if (size < 8) return r3('Baseline solid nodule 6 to < 8 mm is category 3.', 'Solid pulmonary nodule measuring 6 to less than 8 mm.')
      if (size < 15) return r4a('Baseline solid nodule 8 to < 15 mm is category 4A.', 'Solid pulmonary nodule measuring 8 to less than 15 mm.', true)
      return r4b('Baseline solid nodule of 15 mm or more is category 4B.', 'Large solid pulmonary nodule.')
    }
    if (when === 'new') {
      if (size < 4) return r2('New solid nodule < 4 mm is category 2.', 'New very small solid pulmonary nodule.')
      if (size < 6) return r3('New solid nodule 4 to < 6 mm is category 3.', 'New solid pulmonary nodule measuring 4 to less than 6 mm.')
      if (size < 8) return r4a('New solid nodule 6 to < 8 mm is category 4A.', 'New solid pulmonary nodule measuring 6 to less than 8 mm.')
      return r4b('New solid nodule of 8 mm or more is category 4B.', 'New large solid pulmonary nodule.')
    }
    if (when === 'growing') {
      if (size < 8) return r4a('Growing solid nodule < 8 mm is category 4A.', 'Growing solid pulmonary nodule.')
      return r4b('Growing solid nodule of 8 mm or more is category 4B.', 'Growing solid pulmonary nodule.')
    }
    return stable(form.priorCategory, 'solid')
  }

  if (form.noduleType === 'partSolid') {
    if (when === 'baseline') {
      if (size < 6) return r2('Baseline part-solid nodule < 6 mm total mean diameter is category 2.', 'Small part-solid pulmonary nodule.')
      if (solid < 6) return r3('Baseline part-solid nodule of 6 mm or more with solid component < 6 mm is category 3.', 'Part-solid pulmonary nodule with small solid component.')
      if (solid < 8) return r4a('Baseline part-solid nodule with solid component 6 to < 8 mm is category 4A.', 'Part-solid pulmonary nodule with solid component measuring 6 to less than 8 mm.')
      return r4b('Baseline part-solid nodule with solid component of 8 mm or more is category 4B.', 'Part-solid pulmonary nodule with large solid component.')
    }
    if (when === 'new' && size < 6) {
      return r3('New part-solid nodule < 6 mm total mean diameter is category 3.', 'New small part-solid pulmonary nodule.')
    }
    if (when === 'new' || when === 'growing') {
      const label = when === 'new' ? 'New' : 'Growing'
      if (solid < 4) return r4a(`${label} part-solid nodule with solid component < 4 mm is category 4A.`, `${label} part-solid pulmonary nodule.`)
      return r4b(`${label} part-solid nodule with solid component of 4 mm or more is category 4B.`, `${label} part-solid pulmonary nodule with solid component of 4 mm or more.`)
    }
    return stable(form.priorCategory, 'part-solid')
  }

  return {
    category: 'Lung-RADS 0',
    reason: 'Incomplete classification.',
    management: 'Review inputs and correlate with the official Lung-RADS table.',
    impression: 'Incomplete Lung-RADS assessment.',
  }
}

/**
 * Note 14: category 3 or 4 nodules with additional features or imaging findings that
 * increase the suspicion for lung cancer are category 4X, managed as 4B.
 */
export function lungRads(form: LungRadsForm): LungRadsResult {
  const result = base(form)
  if (!form.verySuspicious || !['Lung-RADS 3', 'Lung-RADS 4A', 'Lung-RADS 4B'].includes(result.category)) return result
  return {
    category: 'Lung-RADS 4X',
    reason: `${result.reason} Additional features that increase the suspicion for lung cancer make a category 3 or 4 nodule 4X.`,
    management: FOUR_B,
    impression: result.impression.replace(/Lung-RADS (3|4A|4B)\. Recommend .*$/, 'Lung-RADS 4X. Recommend diagnostic evaluation.'),
  }
}
