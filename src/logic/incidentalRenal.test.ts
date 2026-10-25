import { describe, expect, it } from 'vitest'
import { classifyRenal, initialRenalForm } from './incidentalRenal'
import type { RenalForm } from './incidentalRenal'

/*
 * Herts 2018, Figs. 1-5. The tool used to give no follow-up interval and did not use the
 * examination, the density or the size thresholds. The author's decision (2026-10-25): follow-up
 * intervals go in the calculators, so the tool now follows the flowcharts.
 */
const at = (over: Partial<RenalForm>) => classifyRenal({ ...initialRenalForm, ...over })

describe('ACR 2018 incidental renal mass: CT without a full renal protocol (Figs. 1 and 2)', () => {
  it.each([
    ['unenhanced, 20 HU', { exam: 'unenhanced' as const, densityHu: '20' }, 'Likely benign cyst'],
    ['unenhanced, 21 HU', { exam: 'unenhanced' as const, densityHu: '21' }, 'Indeterminate'],
    ['unenhanced, 70 HU', { exam: 'unenhanced' as const, densityHu: '70' }, 'Hemorrhagic or proteinaceous cyst'],
    ['enhanced, 20 HU', { densityHu: '20' }, 'Benign cyst'],
    ['enhanced, 70 HU', { densityHu: '70' }, 'Indeterminate'],
    ['heterogeneous', { appearance: 'heterogeneous' as const }, 'Indeterminate, heterogeneous'],
  ])('%s: %s', (_label, over, expected) => {
    expect(at(over).category).toBe(expected)
  })

  // "Indeterminate: WO&W MR (preferred) or WO&W CT within 6-12 months."
  it('follows an inconclusive mass too small to characterize at 6-12 months', () => {
    expect(at({ appearance: 'tstc' }).recommendation).toContain('within 6-12 months')
    expect(at({ appearance: 'tstc', tstcBenignLooking: true }).recommendation).toContain('No further workup')
  })
})

describe('ACR 2018 incidental renal mass: characterized on a renal protocol (Figs. 3 and 4)', () => {
  const protocol = { exam: 'protocol' as const }
  // Fig. 3: "WO&W CT or WO&W MRI at 6 and 12 months, then yearly for 5 yrs".
  it('follows a Bosniak IIF mass at 6 and 12 months, then yearly for 5 years', () => {
    expect(at({ ...protocol, characterized: 'bosniakIIF' }).recommendation).toContain('at 6 and 12 months, then yearly for 5 years')
  })

  // Fig. 4: "Solid mass < 1.0 cm ... beginning at 6-12 months, then yearly for 5 yrs"; "1.0 - 4.0 cm:
  // Refer for management; consider biopsy"; "> 4.0 cm: Refer for management".
  it.each([
    ['0.9', 'beginning at 6-12 months, then yearly for 5 years'],
    ['1', 'Refer for management; consider biopsy'],
    ['4', 'Refer for management; consider biopsy'],
    ['4.1', 'Refer for management,'],
  ])('solid mass of %s cm: %s', (sizeCm, expected) => {
    expect(at({ ...protocol, sizeCm }).recommendation).toContain(expected)
  })
})

describe('ACR 2018 incidental renal mass: fat (Fig. 5)', () => {
  const fat = { fat: true }
  it.each([
    ['3.9 cm', { sizeCm: '3.9' }, 'No further workup'],
    ['4 cm', { sizeCm: '4' }, 'Refer for management'],
    ['with calcification', { fatCalcification: true }, 'CT or MRI without and with IV contrast'],
    ['symptomatic', { fatSymptoms: true }, 'Refer to urology'],
  ])('%s: %s', (_label, over, expected) => {
    expect(at({ ...fat, ...over }).recommendation).toContain(expected)
  })
})

// Figs. 1-2 note 5: a mass unchanged, growing 3 mm a year or less, for at least 5 years "does not
// need further workup".
it('needs no further workup after 5 years of stability', () => {
  expect(at({ densityHu: '40', stableFiveYears: true }).recommendation).toContain('No further workup')
})
