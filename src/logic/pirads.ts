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

  // v2.1 upgrades the driving sequence's score, not the category: a 4 that is >= 1.5 cm or
  // shows definite EPE is scored 5 (DWI in the PZ, T2 in the TZ). A category that reaches 4
  // through DCE or a TZ DWI upgrade is therefore never lifted to 5 by size.
  const big = !Number.isNaN(size) && size >= 1.5
  const drivingRaw = form.zone === 'peripheral' ? form.dwiScore : form.t2Score
  const upgraded = drivingRaw === 4 && (big || form.epeOrInvasive)
  if (upgraded) {
    const sequence = form.zone === 'peripheral' ? 'DWI' : 'T2'
    const why = big && form.epeOrInvasive
      ? 'measures 1.5 cm or greater and shows definite extraprostatic extension/invasive behavior'
      : big ? 'measures 1.5 cm or greater' : 'shows definite extraprostatic extension/invasive behavior'
    reasons.push(`Lesion ${why}, so the ${sequence} score of 4 becomes 5.`)
  }
  const dwi: Score = form.zone === 'peripheral' && upgraded ? 5 : form.dwiScore
  const t2: Score = form.zone === 'transition' && upgraded ? 5 : form.t2Score

  if (form.zone === 'peripheral') {
    if (dwi === 3) {
      if (form.dcePositive) {
        category = 4
        reasons.push('DWI score 3 with positive DCE upgrades the lesion to PI-RADS 4.')
      } else {
        category = 3
        reasons.push('DWI score 3 with negative DCE remains PI-RADS 3.')
      }
    } else {
      category = dwi
      reasons.push(`DWI score ${dwi} corresponds to overall PI-RADS ${dwi}.`)
    }
  } else {
    if (t2 === 2) {
      if (dwi >= 4) {
        category = 3
        reasons.push('T2 score 2 with DWI 4 or 5 is upgraded to PI-RADS 3 in version 2.1.')
      } else {
        category = 2
        reasons.push('T2 score 2 corresponds to PI-RADS 2.')
      }
    } else if (t2 === 3) {
      if (dwi === 5) {
        category = 4
        reasons.push('T2 score 3 with DWI 5 is upgraded to PI-RADS 4.')
      } else {
        category = 3
        reasons.push('T2 score 3 corresponds to PI-RADS 3.')
      }
    } else {
      category = t2
      reasons.push(`T2 score ${t2} corresponds to overall PI-RADS ${t2}.`)
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
