/** PI-RADS v2.1 overall category for one lesion, shared by the calculator and the prostate MRI study. */
export type Zone = 'peripheral' | 'transition'
export type Score = 1 | 2 | 3 | 4 | 5

export type PiradsForm = {
  zone: Zone
  laterality: 'left' | 'right' | 'bilateral' | 'midline'
  location: string
  dwiScore: Score
  t2Score: Score
  dcePositive: boolean
  sizeCm: string
  epeOrInvasive: boolean
}

export function classify(form: PiradsForm) {
  const size = form.sizeCm === '' ? NaN : parseFloat(form.sizeCm)
  const reasons: string[] = []
  let category: Score

  if (form.zone === 'peripheral') {
    if (form.dwiScore === 3) {
      if (form.dcePositive) {
        category = 4
        reasons.push('DWI score 3 with positive DCE upgrades the lesion to PI-RADS 4.')
      } else {
        category = 3
        reasons.push('DWI score 3 with negative DCE remains PI-RADS 3.')
      }
    } else {
      category = form.dwiScore
      reasons.push(`DWI score ${form.dwiScore} corresponds to overall PI-RADS ${form.dwiScore}.`)
    }
  } else {
    if (form.t2Score === 2) {
      if (form.dwiScore >= 4) {
        category = 3
        reasons.push('T2 score 2 with DWI 4 or 5 is upgraded to PI-RADS 3 in version 2.1.')
      } else {
        category = 2
        reasons.push('T2 score 2 corresponds to PI-RADS 2.')
      }
    } else if (form.t2Score === 3) {
      if (form.dwiScore === 5) {
        category = 4
        reasons.push('T2 score 3 with DWI 5 is upgraded to PI-RADS 4.')
      } else {
        category = 3
        reasons.push('T2 score 3 corresponds to PI-RADS 3.')
      }
    } else {
      category = form.t2Score
      reasons.push(`T2 score ${form.t2Score} corresponds to overall PI-RADS ${form.t2Score}.`)
    }
  }

  // v2.1 defines a sequence score of 5 as a 4 that is >= 1.5 cm or shows definite EPE, so the
  // upgrade applies only when the driving sequence (DWI in the PZ, T2 in the TZ) scored 4 itself.
  // A category that reached 4 by an upgrade (PZ DWI 3 + DCE, TZ T2 3 + DWI 5) stays 4.
  const drivingScore = form.zone === 'peripheral' ? form.dwiScore : form.t2Score
  if (category === 4 && drivingScore === 4 && ((!Number.isNaN(size) && size >= 1.5) || form.epeOrInvasive)) {
    category = 5
    if (!Number.isNaN(size) && size >= 1.5 && form.epeOrInvasive) {
      reasons.push('Lesion measures 1.5 cm or greater and shows definite extraprostatic extension/invasive behavior, upgrading to PI-RADS 5.')
    } else if (!Number.isNaN(size) && size >= 1.5) {
      reasons.push('Lesion measures 1.5 cm or greater, upgrading to PI-RADS 5.')
    } else {
      reasons.push('Lesion shows definite extraprostatic extension/invasive behavior, upgrading to PI-RADS 5.')
    }
  }

  const tone: 'good' | 'accent' | 'warn' = category <= 2 ? 'good' : category === 3 ? 'accent' : 'warn'

  const lateralityLabel = form.laterality === 'bilateral' ? 'Bilateral' : form.laterality === 'midline' ? 'Midline' : form.laterality.charAt(0).toUpperCase() + form.laterality.slice(1)
  const zoneLabel = form.zone === 'peripheral' ? 'peripheral-zone' : 'transition-zone'
  const locationText = form.location.trim()
  const sizeText = !Number.isNaN(size) ? ` measuring ${size} cm` : ''
  const sequenceText =
    form.zone === 'peripheral'
      ? `DWI score ${form.dwiScore}${form.dwiScore === 3 ? `, DCE ${form.dcePositive ? 'positive' : 'negative'}` : ''}`
      : `T2 score ${form.t2Score}, DWI score ${form.dwiScore}`

  const impression = `${lateralityLabel}${locationText ? ` ${locationText}` : ''} ${zoneLabel} lesion${sizeText} (${sequenceText}). Overall assessment: PI-RADS ${category}.`

  const summary = reasons.join(' ')

  return { category, tone, summary, impression }
}
