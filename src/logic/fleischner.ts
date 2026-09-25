/**
 * Fleischner Society 2017 management of incidental pulmonary nodules on CT (MacMahon et al.,
 * Radiology 2017, doi:10.1148/radiol.2017161659). Shared by the Fleischner calculator and the
 * incidental lung nodule study, so a fix here changes both.
 */

export type NoduleType = 'solid' | 'groundGlass' | 'partSolid'
export type Count = 'single' | 'multiple'
export type Risk = 'low' | 'high'
export type Tone = 'neutral' | 'good' | 'warn' | 'accent'

export type FleischnerForm = {
  noduleType: NoduleType
  count: Count
  risk: Risk
  sizeMm: string
  solidComponentMm: string
  /** Long axis in mm, when known, so the solid component can be checked against it. */
  longAxisMm?: string
  screeningExam: boolean
  ageUnder35: boolean
  immunosuppressed: boolean
  knownPrimaryCancer: boolean
  benignFeatures: boolean
  perifissural: boolean
}

export const initialFleischnerForm: FleischnerForm = {
  noduleType: 'solid',
  count: 'single',
  risk: 'low',
  sizeMm: '',
  solidComponentMm: '',
  screeningExam: false,
  ageUnder35: false,
  immunosuppressed: false,
  knownPrimaryCancer: false,
  benignFeatures: false,
  perifissural: false,
}

export type FleischnerResult = {
  category: string
  tone: Tone
  summary: string
  management: string
  impression: string | null
}

type Outcome = {
  category: string
  tone: Tone
  summary: string
  management: string
  recommendation: string
}

export function parseSize(value: string) {
  if (value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

export function fmt(value: number) {
  return String(Number(value.toFixed(1)))
}

/**
 * "Measurements should be rounded to the nearest millimeter. Fractional millimeter measurements are
 * not recommended ... Thus, the size threshold (<6 mm) corresponds to a rounded measurement of 5 mm
 * or less" (MacMahon 2017). Every threshold below is applied to the rounded value.
 */
export function roundMm(value: number) {
  return Math.round(Number(value.toFixed(3)))
}

function pending(summary: string): FleischnerResult {
  return { category: 'Awaiting input', tone: 'neutral', summary, management: '', impression: null }
}

function classify(form: FleischnerForm, size: number, solid: number | null): Outcome | null {
  const highRisk = form.risk === 'high'

  if (form.noduleType === 'solid') {
    if (form.count === 'single') {
      if (size < 6) {
        return highRisk
          ? {
              category: 'Optional CT at 12 months',
              tone: 'accent',
              summary: 'Single solid nodule smaller than 6 mm (<100 mm³) in a high-risk patient.',
              management: 'Optional CT at 12 months. Follow-up is most worthwhile with suspicious morphology, upper lobe location, or other risk factors.',
              recommendation: 'optional follow-up CT at 12 months.',
            }
          : {
              category: 'No routine follow-up',
              tone: 'good',
              summary: 'Single solid nodule smaller than 6 mm (<100 mm³) in a low-risk patient.',
              management: 'No routine follow-up is required.',
              recommendation: 'no routine imaging follow-up is required.',
            }
      }

      if (size <= 8) {
        return {
          category: 'CT at 6-12 months',
          tone: 'accent',
          summary: 'Single solid nodule 6 to 8 mm (100-250 mm³).',
          management: highRisk
            ? 'CT at 6-12 months, then CT at 18-24 months.'
            : 'CT at 6-12 months, then consider CT at 18-24 months.',
          recommendation: highRisk
            ? 'follow-up CT at 6-12 months, then CT at 18-24 months.'
            : 'follow-up CT at 6-12 months, then consider CT at 18-24 months.',
        }
      }

      return {
        category: 'CT at 3 months, PET/CT, or sampling',
        tone: 'warn',
        summary: 'Single solid nodule larger than 8 mm (>250 mm³).',
        management: 'Consider CT at 3 months, PET/CT, or tissue sampling, weighing size, morphology, comorbidity, and patient preference.',
        recommendation: 'consider follow-up CT at 3 months, PET/CT, or tissue sampling.',
      }
    }

    if (size < 6) {
      return highRisk
        ? {
            category: 'Optional CT at 12 months',
            tone: 'accent',
            summary: 'Multiple solid nodules, all smaller than 6 mm, in a high-risk patient.',
            management: 'Optional CT at 12 months.',
            recommendation: 'optional follow-up CT at 12 months.',
          }
        : {
            category: 'No routine follow-up',
            tone: 'good',
            summary: 'Multiple solid nodules, all smaller than 6 mm, in a low-risk patient.',
            management: 'No routine follow-up is required.',
            recommendation: 'no routine imaging follow-up is required.',
          }
    }

    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Multiple solid nodules with at least one 6 mm or larger. Management follows the most suspicious nodule.',
      management: highRisk
        ? 'CT at 3-6 months, then CT at 18-24 months, guided by the most suspicious nodule.'
        : 'CT at 3-6 months, then consider CT at 18-24 months, guided by the most suspicious nodule.',
      recommendation: highRisk
        ? 'follow-up CT at 3-6 months, then CT at 18-24 months, guided by the most suspicious nodule.'
        : 'follow-up CT at 3-6 months, then consider CT at 18-24 months, guided by the most suspicious nodule.',
    }
  }

  if (form.count === 'multiple') {
    if (size < 6) {
      return {
        category: 'CT at 3-6 months',
        tone: 'accent',
        summary: 'Multiple subsolid nodules, all smaller than 6 mm. These are often infectious or inflammatory.',
        management: 'CT at 3-6 months. If stable, consider CT at 2 and 4 years.',
        recommendation: 'follow-up CT at 3-6 months; if stable, consider CT at 2 and 4 years.',
      }
    }

    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Multiple subsolid nodules with at least one 6 mm or larger.',
      management: 'CT at 3-6 months. Subsequent management is based on the most suspicious nodule.',
      recommendation: 'follow-up CT at 3-6 months, with subsequent management based on the most suspicious nodule.',
    }
  }

  if (form.noduleType === 'groundGlass') {
    if (size < 6) {
      return {
        category: 'No routine follow-up',
        tone: 'good',
        summary: 'Single pure ground-glass nodule smaller than 6 mm.',
        management: 'No routine follow-up. In selected patients with suspicious morphology or other risk factors, CT at 2 and 4 years may be considered.',
        recommendation: 'no routine imaging follow-up is required.',
      }
    }

    return {
      category: 'CT at 6-12 months',
      tone: 'accent',
      summary: 'Single pure ground-glass nodule 6 mm or larger.',
      management: 'CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years.',
      recommendation: 'follow-up CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years.',
    }
  }

  if (size < 6) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'Single subsolid nodule smaller than 6 mm. A nodule this small is generally not classified as part-solid.',
      management: 'No routine follow-up is required.',
      recommendation: 'no routine imaging follow-up is required.',
    }
  }

  if (solid === null) return null

  if (solid < 6) {
    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Single part-solid nodule 6 mm or larger with a solid component smaller than 6 mm.',
      management: 'CT at 3-6 months to confirm persistence. If unchanged and the solid component remains smaller than 6 mm, annual CT for 5 years.',
      recommendation: 'follow-up CT at 3-6 months to confirm persistence; if unchanged and the solid component remains smaller than 6 mm, annual CT for 5 years.',
    }
  }

  /*
   * "For solitary part-solid nodules with a solid component 6 mm or larger, a short-term follow-up
   * CT scan at 3–6 months should be considered to evaluate for persistence of the nodule. For
   * nodules with particularly suspicious morphology (ie, lobulated margins or cystic components), a
   * growing solid component, or a solid component larger than 8 mm, PET/CT, biopsy, or resection
   * are recommended." Table 1: persistent ones "should be considered highly suspicious".
   */
  if (solid <= 8) {
    return {
      category: 'CT at 3-6 months; highly suspicious if persistent',
      tone: 'warn',
      summary: 'Single part-solid nodule with a solid component of 6 to 8 mm. A persistent one is highly suspicious.',
      management: 'Consider short-term CT at 3-6 months to evaluate persistence. PET/CT, biopsy, or resection are recommended for particularly suspicious morphology (lobulated margins or cystic components) or a growing solid component.',
      recommendation: 'consider short-term follow-up CT at 3-6 months to evaluate persistence. A persistent part-solid nodule with a solid component of 6 mm or larger is highly suspicious; PET/CT, biopsy, or resection are recommended for particularly suspicious morphology or a growing solid component.',
    }
  }

  return {
    category: 'PET/CT, biopsy, or resection',
    tone: 'warn',
    summary: 'Single part-solid nodule with a solid component larger than 8 mm, which is highly suspicious.',
    management: 'PET/CT, biopsy, or resection are recommended. A short-term CT at 3-6 months to evaluate persistence should be considered for any solid component of 6 mm or larger.',
    recommendation: 'the solid component is larger than 8 mm; PET/CT, biopsy, or resection are recommended.',
  }
}

export function assessFleischner(form: FleischnerForm): FleischnerResult {
  if (form.screeningExam) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 does not apply to nodules found on lung cancer screening CT.',
      management: 'Assign a Lung-RADS category instead of a Fleischner recommendation.',
      impression: 'Pulmonary nodule detected on lung cancer screening CT. Managed with Lung-RADS rather than the Fleischner Society incidental nodule guideline.',
    }
  }

  if (form.ageUnder35) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 applies to patients 35 years and older: lung cancer is rare in younger patients, and infection is more likely than cancer.',
      management: 'Decide case by case. Infectious causes are more likely than cancer, and use of serial CT should be minimized.',
      impression: 'Incidental pulmonary nodule in a patient younger than 35 years, outside the scope of the Fleischner Society 2017 guideline. Management should be decided case by case; infection is more likely than cancer, and use of serial CT should be minimized.',
    }
  }

  if (form.immunosuppressed) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 excludes immunosuppressed patients, in whom nodules are more likely to be infectious.',
      management: 'Manage according to the specific clinical situation. Active infection should be considered, and short-term follow-up may be appropriate.',
      impression: 'Incidental pulmonary nodule in an immunosuppressed patient, outside the scope of the Fleischner Society 2017 guideline. Active infection should be considered; management depends on the specific clinical situation, and short-term follow-up may be appropriate.',
    }
  }

  if (form.knownPrimaryCancer) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 excludes patients with a known primary cancer, where nodules are assessed as potential metastases.',
      management: 'Manage according to the specific clinical situation.',
      impression: 'Pulmonary nodule in a patient with a known primary malignancy, who is at risk for metastases; outside the scope of the Fleischner Society 2017 guideline. Management depends on the specific clinical situation.',
    }
  }

  if (form.benignFeatures) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'A benign calcification pattern or macroscopic fat identifies the nodule as benign.',
      management: 'No imaging follow-up is required for this nodule.',
      impression: 'Pulmonary nodule with benign features (benign calcification pattern or macroscopic fat). No imaging follow-up is required.',
    }
  }

  if (form.perifissural) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'A solid perifissural nodule with typical intrapulmonary lymph node morphology does not require follow-up.',
      management: 'No imaging follow-up is required for this nodule.',
      impression: 'Perifissural pulmonary nodule with morphology typical of an intrapulmonary lymph node. No imaging follow-up is required.',
    }
  }

  const rawSize = parseSize(form.sizeMm)
  if (rawSize === null) {
    return pending('Enter the mean nodule diameter, the average of the long- and short-axis measurements, to get a Fleischner recommendation.')
  }

  const size = roundMm(rawSize)
  if (size < 1) return pending('The mean diameter rounds to 0 mm. Check the measurement.')

  const rawSolid = parseSize(form.solidComponentMm)
  const solid = rawSolid === null ? null : roundMm(rawSolid)
  /*
   * The solid component is its own maximal diameter, so it may exceed the mean diameter but not the
   * long axis. Without the long axis, the most it can be is twice the mean.
   */
  const longAxis = parseSize(form.longAxisMm ?? '')
  const solidLimit = longAxis === null ? size * 2 : roundMm(longAxis)
  if (solid !== null && solid > solidLimit) {
    return pending('The solid component cannot be larger than the nodule itself. Check both measurements.')
  }

  const outcome = classify(form, size, solid)
  if (!outcome) {
    return pending('Enter the solid component diameter to complete the part-solid assessment.')
  }

  const typeWord = form.noduleType === 'solid' ? 'solid' : form.noduleType === 'groundGlass' ? 'pure ground-glass' : 'part-solid'
  const riskPhrase = form.noduleType === 'solid' ? ` in a patient at ${form.risk} risk for lung cancer` : ''
  const solidPhrase =
    form.noduleType === 'partSolid' && form.count === 'single' && solid !== null ? ` with ${/^(8|11|18)(D|$)/.test(fmt(solid)) ? 'an' : 'a'} ${fmt(solid)} mm solid component` : ''
  const lead =
    form.count === 'single'
      ? `Incidental ${typeWord} pulmonary nodule measuring ${fmt(size)} mm${solidPhrase}${riskPhrase}.`
      : `Multiple incidental ${typeWord} pulmonary nodules${riskPhrase}, largest measuring ${fmt(size)} mm.`

  return {
    category: outcome.category,
    tone: outcome.tone,
    summary: outcome.summary,
    management: outcome.management,
    impression: `${lead} Per Fleischner Society 2017 recommendations, ${outcome.recommendation}`,
  }
}

