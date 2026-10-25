import { describe, expect, it } from 'vitest'
import { classifyEarlyPregnancyLoss, initialEarlyPregnancyForm } from './earlyPregnancyLoss'

const form = { ...initialEarlyPregnancyForm, embryoVisible: false }

/*
 * Doubilet 2013, Table 3 footnote: "When there are findings suspicious for pregnancy failure,
 * follow-up ultrasonography at 7 to 10 days to assess the pregnancy for viability is generally
 * appropriate." The page said 7 to 14 days; checked against the paper on 2026-10-25.
 */
describe('early pregnancy loss: follow-up for suspicious findings', () => {
  it('recommends follow-up ultrasound in 7 to 10 days', () => {
    const r = classifyEarlyPregnancyLoss({ ...form, msdMm: '20' })
    expect(r.category).toBe('Suspicious for early pregnancy loss')
    expect(r.management).toContain('7 to 10 days')
  })

  it('needs no imaging follow-up once findings are diagnostic', () => {
    const r = classifyEarlyPregnancyLoss({ ...form, msdMm: '25' })
    expect(r.category).toBe('Diagnostic of early pregnancy loss')
    expect(r.management).toContain('imaging follow-up is not required')
  })
})

// Table 2: no embryo with heartbeat 11 days or more after a scan showing a sac with a yolk sac is
// diagnostic; Table 3: 7 to 10 days is suspicious.
describe('early pregnancy loss: yolk sac follow-up scan', () => {
  const yolk = { ...form, msdMm: '10', isFollowUp: true, initialFinding: 'yolkSacPresent' as const }
  it.each([
    ['10', 'Suspicious for early pregnancy loss'],
    ['11', 'Diagnostic of early pregnancy loss'],
  ])('%s days later is %s', (days, expected) => {
    expect(classifyEarlyPregnancyLoss({ ...yolk, daysSinceInitialScan: days }).category).toBe(expected)
  })
})
