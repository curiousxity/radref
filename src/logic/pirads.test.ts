import { describe, expect, it } from 'vitest'
import { classify, type PiradsForm, type Score } from './pirads'

/*
 * PI-RADS v2.1 overall assessment (Turkbey et al., Eur Urol 2019;76:340-351,
 * doi:10.1016/j.eururo.2019.02.033). Each case pins one cell of the v2.1 tables.
 */
const base: PiradsForm = {
  zone: 'peripheral',
  laterality: 'left',
  location: '',
  dwiScore: 1,
  t2Score: 1,
  dcePositive: false,
  sizeCm: '',
  epeOrInvasive: false,
}
const pz = (dwiScore: Score, dcePositive = false, extra: Partial<PiradsForm> = {}) =>
  classify({ ...base, zone: 'peripheral', dwiScore, dcePositive, ...extra }).category
const tz = (t2Score: Score, dwiScore: Score, extra: Partial<PiradsForm> = {}) =>
  classify({ ...base, zone: 'transition', t2Score, dwiScore, ...extra }).category

describe('PI-RADS v2.1: peripheral zone is DWI-dominant', () => {
  // PZ table: the DWI score is the overall category, except DWI 3 with positive DCE, which is 4.
  it.each([
    [1, false, 1],
    [1, true, 1],
    [2, false, 2],
    [2, true, 2],
    [3, false, 3],
    [3, true, 4],
    [4, false, 4],
    [4, true, 4],
    [5, false, 5],
    [5, true, 5],
  ] as const)('DWI %s, DCE positive %s is PI-RADS %s', (dwi, dce, expected) => {
    expect(pz(dwi, dce)).toBe(expected)
  })

  it('ignores the T2 score in the peripheral zone', () => {
    expect(pz(2, false, { t2Score: 5 })).toBe(2)
  })
})

describe('PI-RADS v2.1: transition zone is T2-dominant', () => {
  // TZ table: T2 1 is 1; T2 2 is 2 unless DWI >= 4, then 3; T2 3 is 3 unless DWI 5, then 4;
  // T2 4 is 4 and T2 5 is 5 whatever the DWI.
  it.each([
    [1, 1, 1],
    [1, 5, 1],
    [2, 1, 2],
    [2, 3, 2],
    [2, 4, 3],
    [2, 5, 3],
    [3, 1, 3],
    [3, 4, 3],
    [3, 5, 4],
    [4, 1, 4],
    [4, 5, 4],
    [5, 1, 5],
    [5, 5, 5],
  ] as const)('T2 %s, DWI %s is PI-RADS %s', (t2, dwi, expected) => {
    expect(tz(t2, dwi)).toBe(expected)
  })

  it('ignores DCE in the transition zone', () => {
    expect(tz(3, 3, { dcePositive: true })).toBe(3)
  })
})

describe('PI-RADS v2.1: 4 versus 5 by size and extraprostatic extension', () => {
  // DWI (PZ) and T2 (TZ) score 5: "Same as 4 but >= 1.5 cm in greatest dimension or definite
  // extraprostatic extension/invasive behavior".
  it.each([
    ['1.4', false, 4],
    ['1.5', false, 5],
    ['', true, 5],
    ['1.4', true, 5],
  ] as const)('PZ DWI 4 at %s cm, EPE %s is PI-RADS %s', (sizeCm, epe, expected) => {
    expect(pz(4, false, { sizeCm, epeOrInvasive: epe })).toBe(expected)
  })

  it.each([
    ['1.4', 4],
    ['1.5', 5],
  ] as const)('TZ T2 4 at %s cm is PI-RADS %s', (sizeCm, expected) => {
    expect(tz(4, 3, { sizeCm })).toBe(expected)
  })

  it('does not upgrade a category below 4 by size', () => {
    expect(pz(3, false, { sizeCm: '2.0' })).toBe(3)
  })

  /*
   * GUIDELINE CONTRADICTION: the size rule belongs to the DWI (PZ) or T2 (TZ) score of 5, so
   * it cannot lift a category 4 that came from DWI 3 + positive DCE, or from TZ T2 3 + DWI 5.
   * The v2.1 tables give those combinations overall 4 at any size. The logic upgrades any
   * category 4 of 1.5 cm or more to 5.
   */
  it('PZ DWI 3 with positive DCE stays PI-RADS 4 at 1.5 cm', () => {
    expect(pz(3, true, { sizeCm: '1.5' })).toBe(4)
  })
  it('TZ T2 3 with DWI 5 stays PI-RADS 4 at 1.5 cm', () => {
    expect(tz(3, 5, { sizeCm: '1.5' })).toBe(4)
  })
})

describe('PI-RADS v2.1: impression', () => {
  it('states the sequence scores and the overall category', () => {
    const { impression } = classify({ ...base, dwiScore: 3, dcePositive: true, location: 'mid-gland posterolateral', sizeCm: '1.1' })
    expect(impression).toBe('Left mid-gland posterolateral peripheral-zone lesion measuring 1.1 cm (DWI score 3, DCE positive). Overall assessment: PI-RADS 4.')
  })
  it.each([
    [2, 'good'],
    [3, 'accent'],
    [4, 'warn'],
  ] as const)('PI-RADS from DWI %s has tone %s', (dwi, tone) => {
    expect(classify({ ...base, dwiScore: dwi }).tone).toBe(tone)
  })
})
