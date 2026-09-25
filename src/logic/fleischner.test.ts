import { describe, expect, it } from 'vitest'
import { assessFleischner, initialFleischnerForm, roundMm, type FleischnerForm } from './fleischner'

/*
 * Fleischner Society 2017 (MacMahon et al., Radiology 2017;284:228-243,
 * doi:10.1148/radiol.2017161659), Table 1. Sizes are mean diameter, rounded to the nearest mm.
 */
const run = (over: Partial<FleischnerForm>) => assessFleischner({ ...initialFleischnerForm, ...over })
const cat = (over: Partial<FleischnerForm>) => run(over).category

describe('Fleischner 2017: rounding', () => {
  // "the size threshold (<6 mm) corresponds to a rounded measurement of 5 mm or less".
  it.each([
    [5.4, 5],
    [5.5, 6],
    [8.4, 8],
    [8.5, 9],
  ])('%s mm rounds to %s mm', (raw, rounded) => {
    expect(roundMm(raw)).toBe(rounded)
  })
})

describe('Fleischner 2017: single solid nodule', () => {
  // < 6 mm: low risk no routine follow-up, high risk optional CT at 12 months.
  // 6-8 mm: CT at 6-12 months, then consider (low) or CT (high) at 18-24 months.
  // > 8 mm: consider CT at 3 months, PET/CT, or tissue sampling.
  it.each([
    ['5.4', 'low', 'No routine follow-up'],
    ['5.4', 'high', 'Optional CT at 12 months'],
    ['5.5', 'low', 'CT at 6-12 months'],
    ['8.4', 'high', 'CT at 6-12 months'],
    ['8.5', 'low', 'CT at 3 months, PET/CT, or sampling'],
  ] as const)('%s mm, %s risk: %s', (sizeMm, risk, expected) => {
    expect(cat({ sizeMm, risk })).toBe(expected)
  })
  it.each([
    ['low', 'CT at 6-12 months, then consider CT at 18-24 months.'],
    ['high', 'CT at 6-12 months, then CT at 18-24 months.'],
  ] as const)('6-8 mm, %s risk: %s', (risk, management) => {
    expect(run({ sizeMm: '7', risk }).management).toBe(management)
  })
})

describe('Fleischner 2017: multiple solid nodules', () => {
  // < 6 mm: low risk no routine follow-up, high risk optional CT at 12 months.
  // >= 6 mm: CT at 3-6 months, then consider (low) or CT (high) at 18-24 months.
  it.each([
    ['5', 'low', 'No routine follow-up'],
    ['5', 'high', 'Optional CT at 12 months'],
    ['6', 'low', 'CT at 3-6 months'],
    ['12', 'high', 'CT at 3-6 months'],
  ] as const)('%s mm, %s risk: %s', (sizeMm, risk, expected) => {
    expect(cat({ count: 'multiple', sizeMm, risk })).toBe(expected)
  })
})

describe('Fleischner 2017: subsolid nodules', () => {
  // Single ground glass: < 6 mm no routine follow-up; >= 6 mm CT at 6-12 months, then every 2 years until 5 years.
  // Single part solid: < 6 mm no routine follow-up; >= 6 mm with solid component < 6 mm CT at 3-6 months,
  // then annually for 5 years; solid component >= 6 mm CT at 3-6 months, persistent highly suspicious;
  // solid component > 8 mm PET/CT, biopsy, or resection.
  // Multiple: < 6 mm CT at 3-6 months, then consider at 2 and 4 years; >= 6 mm CT at 3-6 months.
  it.each([
    [{ noduleType: 'groundGlass' as const, sizeMm: '5' }, 'No routine follow-up'],
    [{ noduleType: 'groundGlass' as const, sizeMm: '6' }, 'CT at 6-12 months'],
    [{ noduleType: 'partSolid' as const, sizeMm: '5', solidComponentMm: '3' }, 'No routine follow-up'],
    [{ noduleType: 'partSolid' as const, sizeMm: '10', solidComponentMm: '5' }, 'CT at 3-6 months'],
    [{ noduleType: 'partSolid' as const, sizeMm: '10', solidComponentMm: '6' }, 'CT at 3-6 months; highly suspicious if persistent'],
    [{ noduleType: 'partSolid' as const, sizeMm: '10', solidComponentMm: '8' }, 'CT at 3-6 months; highly suspicious if persistent'],
    [{ noduleType: 'partSolid' as const, sizeMm: '12', solidComponentMm: '9' }, 'PET/CT, biopsy, or resection'],
    [{ noduleType: 'groundGlass' as const, count: 'multiple' as const, sizeMm: '5' }, 'CT at 3-6 months'],
    [{ noduleType: 'partSolid' as const, count: 'multiple' as const, sizeMm: '7' }, 'CT at 3-6 months'],
  ])('%o: %s', (over, expected) => {
    expect(cat(over)).toBe(expected)
  })

  it('multiple subsolid nodules < 6 mm: consider CT at 2 and 4 years if stable', () => {
    expect(run({ noduleType: 'groundGlass', count: 'multiple', sizeMm: '5' }).management).toContain('2 and 4 years')
  })
  it('a single part-solid nodule >= 6 mm waits for the solid component', () => {
    expect(cat({ noduleType: 'partSolid', sizeMm: '10' })).toBe('Awaiting input')
  })
})

describe('Fleischner 2017: scope and benign features', () => {
  // The guidelines do not apply to lung cancer screening, patients younger than 35 years,
  // immunocompromised patients, or patients with known primary cancer.
  it.each([
    ['screening', { screeningExam: true }],
    ['age under 35', { ageUnder35: true }],
    ['immunosuppressed', { immunosuppressed: true }],
    ['known primary cancer', { knownPrimaryCancer: true }],
  ])('%s is outside Fleischner scope', (_label, over) => {
    expect(cat({ sizeMm: '10', ...over })).toBe('Outside Fleischner scope')
  })
  // Benign calcification or fat, and perifissural nodules with typical morphology, need no follow-up.
  it.each([
    ['benign features', { benignFeatures: true }],
    ['typical perifissural nodule', { perifissural: true }],
  ])('%s: no routine follow-up at any size', (_label, over) => {
    expect(cat({ sizeMm: '9', ...over })).toBe('No routine follow-up')
  })
  it('waits for a size', () => {
    expect(cat({})).toBe('Awaiting input')
  })
})
