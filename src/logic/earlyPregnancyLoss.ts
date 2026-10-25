/**
 * SRU consensus criteria for early pregnancy loss (Doubilet et al., N Engl J Med 2013;369:1443-1451,
 * Tables 2 and 3): findings diagnostic of pregnancy failure, findings suspicious for it, and the
 * follow-up the paper gives for suspicious findings. `reportLine` is the Impression and
 * `management` the Recommendation.
 */

export type InitialFinding = 'noYolkSac' | 'yolkSacPresent' | 'msdUnder12' | 'msdOver12'

export type EarlyPregnancyForm = {
  embryoVisible: boolean
  crlMm: string
  heartbeatPresent: boolean
  cardiacActivityPreviouslyDocumented: boolean
  gestSacVisible: boolean
  msdMm: string
  lmpWeeks6OrMore: boolean
  isFollowUp: boolean
  daysSinceInitialScan: string
  initialFinding: InitialFinding
  sacFailedToDouble: boolean
  emptyAmnionSign: boolean
  expandedAmnionSign: boolean
  yolkStalkSign: boolean
  enlargedYolkSac: boolean
  smallSacRelativeToEmbryo: boolean
}

export const initialEarlyPregnancyForm: EarlyPregnancyForm = {
  embryoVisible: true,
  crlMm: '',
  heartbeatPresent: true,
  cardiacActivityPreviouslyDocumented: false,
  gestSacVisible: true,
  msdMm: '',
  lmpWeeks6OrMore: false,
  isFollowUp: false,
  daysSinceInitialScan: '',
  initialFinding: 'noYolkSac',
  sacFailedToDouble: false,
  emptyAmnionSign: false,
  expandedAmnionSign: false,
  yolkStalkSign: false,
  enlargedYolkSac: false,
  smallSacRelativeToEmbryo: false,
}

export function classifyEarlyPregnancyLoss(form: EarlyPregnancyForm) {
  const crl = form.crlMm === '' ? NaN : parseFloat(form.crlMm)
  const msd = form.msdMm === '' ? NaN : parseFloat(form.msdMm)
  const days = form.daysSinceInitialScan === '' ? NaN : parseFloat(form.daysSinceInitialScan)

  const diagnostic: string[] = []
  const suspicious: string[] = []

  if (form.embryoVisible) {
    if (!form.heartbeatPresent) {
      if (form.cardiacActivityPreviouslyDocumented) {
        diagnostic.push('Cessation of previously documented embryonic cardiac activity.')
      }
      if (form.isFollowUp && !Number.isNaN(days) && days >= 7) {
        diagnostic.push(`Embryo without cardiac activity on the initial scan and on repeat scan ${days} days later (≥7 days).`)
      }
      if (!Number.isNaN(crl)) {
        if (crl >= 7) {
          diagnostic.push(`Crown-rump length ${crl} mm (≥7 mm) with no cardiac activity.`)
        } else if (diagnostic.length === 0) {
          suspicious.push(`Crown-rump length ${crl} mm (<7 mm) with no cardiac activity.`)
        }
      }
      if (form.expandedAmnionSign) {
        suspicious.push('Expanded amnion sign: embryo present with visible amnion but no cardiac activity.')
      }
    }
  } else {
    if (!form.gestSacVisible) {
      if (form.lmpWeeks6OrMore) {
        suspicious.push('No embryo visualized at 6 weeks or more after the last menstrual period.')
      }
    } else if (!Number.isNaN(msd)) {
      if (msd >= 25) {
        diagnostic.push(`Mean sac diameter ${msd} mm (≥25 mm) with no embryo.`)
      } else if (msd >= 16) {
        suspicious.push(`Mean sac diameter ${msd} mm (16-24 mm) with no embryo.`)
      } else if (form.isFollowUp && !Number.isNaN(days)) {
        if (form.initialFinding === 'noYolkSac') {
          if (days >= 14) diagnostic.push(`No embryo with heartbeat ${days} days (≥14 days) after a scan showing a gestational sac without a yolk sac.`)
          else if (days >= 7) suspicious.push(`No embryo with heartbeat ${days} days (7-13 days) after a scan showing a gestational sac without a yolk sac.`)
        } else if (form.initialFinding === 'yolkSacPresent') {
          if (days >= 11) diagnostic.push(`No embryo with heartbeat ${days} days (≥11 days) after a scan showing a gestational sac with a yolk sac.`)
          else if (days >= 7) suspicious.push(`No embryo with heartbeat ${days} days (7-10 days) after a scan showing a gestational sac with a yolk sac.`)
        } else if (form.initialFinding === 'msdUnder12') {
          if (days >= 14 && form.sacFailedToDouble) {
            diagnostic.push(`Mean sac diameter <12 mm on the initial scan failed to double in size on a scan ${days} days later (≥14 days).`)
          }
        } else if (form.initialFinding === 'msdOver12') {
          if (days >= 7) diagnostic.push(`Mean sac diameter ≥12 mm on the initial scan with no embryo cardiac activity on a scan ${days} days later (≥7 days).`)
        }
      }
      if (diagnostic.length === 0 && suspicious.length === 0 && form.lmpWeeks6OrMore) {
        suspicious.push('No embryo visualized at 6 weeks or more after the last menstrual period.')
      }
    }
  }

  if (form.emptyAmnionSign) suspicious.push('Empty amnion sign: no embryo visualized when an amnion is seen adjacent to the yolk sac.')
  if (form.yolkStalkSign) suspicious.push('Yolk stalk sign: yolk sac separated from the embryo with crown-rump length ≤5 mm.')
  if (form.enlargedYolkSac) suspicious.push('Enlarged yolk sac, greater than 7 mm.')
  if (form.smallSacRelativeToEmbryo) suspicious.push('Small gestational sac relative to the embryo (mean sac diameter minus crown-rump length <5 mm).')

  let category: string
  let tone: 'good' | 'accent' | 'warn'
  let reportLine: string
  let management: string

  if (diagnostic.length > 0) {
    category = 'Diagnostic of early pregnancy loss'
    tone = 'warn'
    reportLine = 'Findings are diagnostic of early pregnancy loss.'
    management = 'Findings meet SRU consensus criteria for pregnancy loss; imaging follow-up is not required to establish nonviability. Correlate with clinical context before intervention.'
  } else if (suspicious.length > 0) {
    category = 'Suspicious for early pregnancy loss'
    tone = 'accent'
    reportLine = 'Findings are suspicious for early pregnancy loss.'
    management = 'Follow-up transvaginal ultrasound in 7 to 10 days is recommended to reassess viability; avoid intervention based on suspicious findings alone.'
  } else {
    category = 'No diagnostic or suspicious findings'
    tone = 'good'
    reportLine = 'No sonographic findings diagnostic of or suspicious for early pregnancy loss at this time.'
    management = 'Continue routine early pregnancy dating and viability assessment as clinically indicated.'
  }

  const reasons = [...diagnostic, ...suspicious]
  const summary = reasons.length ? reasons.join(' ') : 'No criteria for early pregnancy loss are met based on the entered findings.'
  const impression = `${summary} ${reportLine}`

  return { category, tone, summary, reportLine, management, impression }
}
