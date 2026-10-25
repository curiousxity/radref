import { describe, expect, it } from 'vitest'
import { acrSurveillance, classifyPancreaticCyst } from './pancreaticCyst'
import type { PancreaticCystForm } from './pancreaticCyst'

/*
 * ACR 2017 incidental pancreatic cyst surveillance (Megibow et al., J Am Coll Radiol 2017), as the
 * pancreatic cysts study's lesson gives it:
 * - Chart 1 (< 1.5 cm): "Under 65 at presentation: image yearly for 5 years, then every 2 years
 *   for 2 more; stop if stable over a minimum of 9 years." "Age 65–79: image every 2 years for 5
 *   rounds; stop if still under 1.5 cm over 10 years." "White dot" cysts (< 5 mm): "a single
 *   follow-up at 2 years showing stability is enough to stop".
 * - Chart 2A, duct communication proven: "1.5–1.9 cm → yearly for 5 years then every 2 years for
 *   4 years; 2.0–2.5 cm → every 6 months for 2 years, yearly for 2, then every 2 years for 6".
 * - Chart 2B, communication absent or unknown: "image every 6 months for 2 years, then yearly for
 *   2, then every 2 years for 3 rounds, or go straight to EUS/FNA".
 * - Chart 4 (80 or older): "≤2.5 cm → image every 2 years twice and stop if stable".
 */
describe('ACR 2017 surveillance intervals', () => {
  it.each([
    [4, 'under65', 'absentOrUnknown', 'Single follow-up at 2 years'],
    [5, 'under65', 'absentOrUnknown', 'yearly for 5 years, then every 2 years for 2 more'],
    [14, '65to79', 'absentOrUnknown', 'every 2 years for 5 rounds'],
    [15, '65to79', 'present', 'yearly for 5 years, then every 2 years for 4 years'],
    [19, 'under65', 'present', 'yearly for 5 years, then every 2 years for 4 years'],
    [20, 'under65', 'present', 'every 6 months for 2 years, yearly for 2, then every 2 years for 6'],
    [25, '65to79', 'absentOrUnknown', 'every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds'],
    [26, '65to79', 'absentOrUnknown', 'Cyst over 2.5 cm'],
    [25, '80plus', 'absentOrUnknown', 'imaging every 2 years twice'],
    [26, '80plus', 'absentOrUnknown', 'advised only if the patient is a surgical candidate'],
  ] as const)('%s mm, %s, communication %s: %s', (sizeMm, age, communication, expected) => {
    expect(acrSurveillance(sizeMm, age, communication)).toContain(expected)
  })
})

const base: PancreaticCystForm = {
  sizeCm: '',
  ageBand: '65-79',
  ductCommunication: 'indeterminate',
  growth: false,
  worrisomeFeatures: false,
  highRiskStigmata: false,
  alternativeDiagnosis: 'none',
  symptomsOrPancreatitis: false,
}

// The calculator used its own looser intervals ("annual imaging for 5 years is a practical first
// surveillance pathway" under 65, "every 2 years for 5 years" at 65-79, no interval at all for 1.5
// to 2.5 cm), which did not match the lesson's ACR charts. The author's decision (2026-10-25):
// follow-up intervals go in the calculators, so the calculator now shares the study's intervals.
describe('pancreatic cyst calculator', () => {
  it('follows a small cyst at the ACR Chart 1 interval for its age', () => {
    const r = classifyPancreaticCyst({ ...base, sizeCm: '1.2', ageBand: '<65' })
    expect(r.category).toBe('Under 1.5 cm (ACR Chart 1)')
    expect(r.impression).toBe('Incidental pancreatic cyst measuring 1.2 cm, without high-risk stigmata or worrisome features.')
    expect(r.management).toContain('yearly for 5 years, then every 2 years for 2 more')
  })

  it('uses duct communication for a 1.5 to 2.5 cm cyst', () => {
    expect(classifyPancreaticCyst({ ...base, sizeCm: '2.2', ductCommunication: 'yes' }).category).toBe('1.5 to 2.5 cm, communicating (ACR Chart 2A)')
    expect(classifyPancreaticCyst({ ...base, sizeCm: '2.2', ductCommunication: 'no' }).category).toBe('1.5 to 2.5 cm (ACR Chart 2B)')
  })

  it('waits for a size, and escalates before any interval', () => {
    expect(classifyPancreaticCyst(base).management).toBe('')
    const r = classifyPancreaticCyst({ ...base, sizeCm: '1', highRiskStigmata: true })
    expect(r.impression).toBe('Incidental pancreatic cyst demonstrates high-risk features.')
    expect(r.management).toBe('Recommend EUS/FNA and pancreatic surgical or specialty consultation.')
  })
})
