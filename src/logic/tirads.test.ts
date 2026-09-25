import { describe, expect, it } from 'vitest'
import type { EchogenicFocus, TiradsForm } from '../types/tirads'
import { calculateTirads } from './tirads'

/*
 * ACR TI-RADS (Tessler et al., J Am Coll Radiol 2017;14:587-595, doi:10.1016/j.jacr.2017.01.046).
 * Points: composition cystic/spongiform 0, mixed 1, solid 2; echogenicity anechoic 0,
 * hyper/isoechoic 1, hypoechoic 2, very hypoechoic 3; shape wider-than-tall 0, taller-than-wide 3;
 * margin smooth/ill-defined 0, lobulated or irregular 2, extrathyroidal extension 3; echogenic
 * foci none 0, macrocalcifications 1, peripheral (rim) 2, punctate 3, summed.
 * Levels: TR1 0 points, TR2 2, TR3 3, TR4 4-6, TR5 7 or more.
 */
const zero: TiradsForm = {
  laterality: '',
  pole: '',
  sizeCm: '',
  composition: 'cystic',
  echogenicity: 'anechoic',
  shape: 'widerThanTall',
  margin: 'smooth',
  echogenicFoci: [],
}
const run = (over: Partial<TiradsForm>) => calculateTirads({ ...zero, ...over })

describe('ACR TI-RADS: points per feature', () => {
  it.each([
    ['composition', { composition: 'mixed' as const }, 1],
    ['composition', { composition: 'solid' as const }, 2],
    ['echogenicity', { echogenicity: 'hyperechoic' as const }, 1],
    ['echogenicity', { echogenicity: 'isoechoic' as const }, 1],
    ['echogenicity', { echogenicity: 'hypoechoic' as const }, 2],
    ['echogenicity', { echogenicity: 'veryHypoechoic' as const }, 3],
    ['shape', { shape: 'tallerThanWide' as const }, 3],
    ['margin', { margin: 'illDefined' as const }, 0],
    ['margin', { margin: 'lobulated' as const }, 2],
    ['margin', { margin: 'extrathyroidal' as const }, 3],
    ['foci', { echogenicFoci: ['macrocalcification'] as EchogenicFocus[] }, 1],
    ['foci', { echogenicFoci: ['rimCalcification'] as EchogenicFocus[] }, 2],
    ['foci', { echogenicFoci: ['punctate'] as EchogenicFocus[] }, 3],
    // Echogenic foci: "Add points for each type" - they are summed.
    ['foci', { echogenicFoci: ['macrocalcification', 'rimCalcification', 'punctate'] as EchogenicFocus[] }, 6],
  ])('%s %o scores %s', (_label, over, points) => {
    expect(run(over).points).toBe(points)
  })

  // Spongiform: "Do not add further points for other categories" (Fig. 1).
  it('a spongiform nodule scores 0 whatever else is selected', () => {
    const r = run({ composition: 'spongiform', echogenicity: 'veryHypoechoic', shape: 'tallerThanWide', margin: 'extrathyroidal', echogenicFoci: ['punctate'] })
    expect(r.points).toBe(0)
    expect(r.category).toBe('TR1')
  })
})

describe('ACR TI-RADS: level from total points', () => {
  // TR1 0 points, TR2 2 points, TR3 3 points, TR4 4-6 points, TR5 >= 7 points.
  // A 1-point total is not listed in the chart; the logic places it in TR1.
  it.each([
    [{}, 0, 'TR1'],
    [{ composition: 'mixed' as const }, 1, 'TR1'],
    [{ composition: 'solid' as const }, 2, 'TR2'],
    [{ composition: 'solid' as const, echogenicity: 'isoechoic' as const }, 3, 'TR3'],
    [{ composition: 'solid' as const, echogenicity: 'hypoechoic' as const }, 4, 'TR4'],
    [{ composition: 'solid' as const, echogenicity: 'hypoechoic' as const, margin: 'lobulated' as const }, 6, 'TR4'],
    [{ composition: 'solid' as const, echogenicity: 'hypoechoic' as const, shape: 'tallerThanWide' as const }, 7, 'TR5'],
  ])('%o is %s points, %s', (over, points, category) => {
    const r = run(over)
    expect(r.points).toBe(points)
    expect(r.category).toBe(category)
  })
})

const TR3 = { composition: 'solid' as const, echogenicity: 'isoechoic' as const }
const TR4 = { composition: 'solid' as const, echogenicity: 'hypoechoic' as const }
const TR5 = { composition: 'solid' as const, echogenicity: 'hypoechoic' as const, shape: 'tallerThanWide' as const }

describe('ACR TI-RADS: FNA and follow-up thresholds', () => {
  // TR3: FNA if >= 2.5 cm, follow if >= 1.5 cm. TR4: FNA if >= 1.5 cm, follow if >= 1 cm.
  // TR5: FNA if >= 1 cm, follow if >= 0.5 cm. TR1 and TR2: no FNA.
  it.each([
    ['TR3', TR3, '1.4', false, false],
    ['TR3', TR3, '1.5', true, false],
    ['TR3', TR3, '2.4', true, false],
    ['TR3', TR3, '2.5', true, true],
    ['TR4', TR4, '0.9', false, false],
    ['TR4', TR4, '1.0', true, false],
    ['TR4', TR4, '1.4', true, false],
    ['TR4', TR4, '1.5', true, true],
    ['TR5', TR5, '0.4', false, false],
    ['TR5', TR5, '0.5', true, false],
    ['TR5', TR5, '0.9', true, false],
    ['TR5', TR5, '1.0', true, true],
    ['TR1', {}, '5.0', false, false],
    ['TR2', { composition: 'solid' as const }, '5.0', false, false],
  ])('%s at %s cm: follow-up %s, FNA %s', (_level, over, sizeCm, followUp, fna) => {
    const r = run({ ...over, sizeCm: sizeCm as string })
    expect(r.followUp).toBe(followUp)
    expect(r.fna).toBe(fna)
  })

  // Follow-up schedules: TR3 at 1, 3 and 5 years; TR4 at 1, 2, 3 and 5 years; TR5 annually up to 5 years.
  it.each([
    [TR3, '1.5', '1, 3, and 5 years'],
    [TR4, '1.0', '1, 2, 3, and 5 years'],
    [TR5, '0.5', 'annually for up to 5 years'],
  ])('%o at %s cm is followed at %s', (over, sizeCm, schedule) => {
    expect(run({ ...over, sizeCm }).recommendation).toContain(schedule)
  })

  it('withholds the size-banded advice for TR3 and above until a size is entered', () => {
    const r = run(TR5)
    expect(r.sizeMissing).toBe(true)
    expect(r.fna).toBe(false)
    expect(r.recommendation).toMatch(/^Enter the maximum size/)
    expect(r.impression).not.toContain('Enter the maximum size')
  })
})
