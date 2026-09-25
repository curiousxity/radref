import { describe, expect, it } from 'vitest'
import { initialLungRadsForm, lungRads, type LungRadsForm, type Timepoint } from './lungrads'

/*
 * ACR Lung-RADS v2022 (Christensen et al., J Am Coll Radiol 2024;21:473-488,
 * doi:10.1016/j.jacr.2023.09.009). Sizes are mean diameter in mm.
 */
const cat = (over: Partial<LungRadsForm>) => lungRads({ ...initialLungRadsForm, ...over }).category
const solid = (timepoint: Timepoint, size: string) => cat({ noduleType: 'solid', timepoint, meanDiameterMm: size })

describe('Lung-RADS v2022: solid nodules', () => {
  // Baseline: 2 < 6 mm; 3 6 to < 8 mm; 4A 8 to < 15 mm; 4B >= 15 mm.
  // New: 2 < 4 mm; 3 4 to < 6 mm; 4A 6 to < 8 mm; 4B >= 8 mm.
  // Growing: 4A < 8 mm; 4B >= 8 mm.
  it.each([
    ['baseline', '5.9', 'Lung-RADS 2'],
    ['baseline', '6', 'Lung-RADS 3'],
    ['baseline', '7.9', 'Lung-RADS 3'],
    ['baseline', '8', 'Lung-RADS 4A'],
    ['baseline', '14.9', 'Lung-RADS 4A'],
    ['baseline', '15', 'Lung-RADS 4B'],
    ['new', '3.9', 'Lung-RADS 2'],
    ['new', '4', 'Lung-RADS 3'],
    ['new', '5.9', 'Lung-RADS 3'],
    ['new', '6', 'Lung-RADS 4A'],
    ['new', '7.9', 'Lung-RADS 4A'],
    ['new', '8', 'Lung-RADS 4B'],
    ['growing', '7.9', 'Lung-RADS 4A'],
    ['growing', '8', 'Lung-RADS 4B'],
  ] as const)('%s %s mm is %s', (timepoint, size, expected) => {
    expect(solid(timepoint, size)).toBe(expected)
  })
})

describe('Lung-RADS v2022: part-solid nodules', () => {
  // Baseline: 2 < 6 mm total; 3 >= 6 mm total with solid component < 6 mm; 4A solid component
  // 6 to < 8 mm; 4B solid component >= 8 mm. New < 6 mm total: 3. New or growing with solid
  // component < 4 mm: 4A; >= 4 mm: 4B.
  it.each([
    ['baseline', '5.9', '5', 'Lung-RADS 2'],
    ['baseline', '6', '5.9', 'Lung-RADS 3'],
    ['baseline', '10', '6', 'Lung-RADS 4A'],
    ['baseline', '10', '7.9', 'Lung-RADS 4A'],
    ['baseline', '10', '8', 'Lung-RADS 4B'],
    ['new', '5.9', '3', 'Lung-RADS 3'],
    ['new', '6', '3.9', 'Lung-RADS 4A'],
    ['new', '6', '4', 'Lung-RADS 4B'],
    ['growing', '10', '3.9', 'Lung-RADS 4A'],
    ['growing', '10', '4', 'Lung-RADS 4B'],
  ] as const)('%s %s mm total, %s mm solid is %s', (timepoint, size, solidMm, expected) => {
    expect(cat({ noduleType: 'partSolid', timepoint, meanDiameterMm: size, solidComponentMm: solidMm })).toBe(expected)
  })
})

describe('Lung-RADS v2022: nonsolid (ground-glass) nodules', () => {
  // 2: < 30 mm at any timepoint, or >= 30 mm stable or slowly growing. 3: >= 30 mm baseline or new.
  it.each([
    ['baseline', '29.9', 'Lung-RADS 2'],
    ['growing', '29.9', 'Lung-RADS 2'],
    ['baseline', '30', 'Lung-RADS 3'],
    ['new', '30', 'Lung-RADS 3'],
    ['stable', '30', 'Lung-RADS 2'],
  ] as const)('%s %s mm is %s', (timepoint, size, expected) => {
    expect(cat({ noduleType: 'groundGlass', timepoint, meanDiameterMm: size })).toBe(expected)
  })
})

describe('Lung-RADS v2022: airway nodules', () => {
  // 2: subsegmental airway nodule. 4A: segmental or more proximal, baseline or new.
  // 4B: segmental or more proximal, stable or growing. Note 11c: air within the abnormality
  // favoring secretions may be category 2.
  it.each([
    [{ airwaySegment: 'subsegmental' as const, timepoint: 'new' as const }, 'Lung-RADS 2'],
    [{ airwaySegment: 'segmentalOrMoreProximal' as const, timepoint: 'baseline' as const }, 'Lung-RADS 4A'],
    [{ airwaySegment: 'segmentalOrMoreProximal' as const, timepoint: 'new' as const }, 'Lung-RADS 4A'],
    [{ airwaySegment: 'segmentalOrMoreProximal' as const, timepoint: 'stable' as const }, 'Lung-RADS 4B'],
    [{ airwaySegment: 'segmentalOrMoreProximal' as const, timepoint: 'growing' as const }, 'Lung-RADS 4B'],
    [{ airwaySegment: 'segmentalOrMoreProximal' as const, timepoint: 'stable' as const, airwayBenignFeatures: true }, 'Lung-RADS 2'],
  ])('%o is %s', (over, expected) => {
    expect(cat({ noduleType: 'airway', ...over })).toBe(expected)
  })
})

describe('Lung-RADS v2022: stepped management of stable nodules', () => {
  // "Category 3 lesions that are stable or decreased in size at 6-month follow-up CT may be
  // categorized as category 2"; category 4A stable at 3-month follow-up is category 3;
  // category 4B returns to 2 only when proven benign.
  it.each([
    ['none', 'Lung-RADS 2'],
    ['3', 'Lung-RADS 2'],
    ['4A', 'Lung-RADS 3'],
    ['4B', 'Lung-RADS 4B'],
  ] as const)('stable solid nodule followed as %s is %s', (priorCategory, expected) => {
    expect(cat({ noduleType: 'solid', timepoint: 'stable', meanDiameterMm: '10', priorCategory })).toBe(expected)
  })
})

describe('Lung-RADS v2022: category 0 and 4X', () => {
  // Category 0: "findings suggestive of an inflammatory or infectious process", 1-3 month LDCT.
  it('an infectious or inflammatory pattern is category 0', () => {
    const r = lungRads({ ...initialLungRadsForm, meanDiameterMm: '20', inflammatoryPattern: true })
    expect(r.category).toBe('Lung-RADS 0')
    expect(r.management).toBe('1-3 month LDCT.')
  })
  // Note: category 3 or 4 nodules with additional features that increase the suspicion for
  // lung cancer are 4X.
  it.each([
    ['7', 'Lung-RADS 4X'],
    ['10', 'Lung-RADS 4X'],
    ['20', 'Lung-RADS 4X'],
    ['5', 'Lung-RADS 2'],
  ])('a very suspicious baseline %s mm solid nodule is %s', (size, expected) => {
    expect(cat({ noduleType: 'solid', meanDiameterMm: size, verySuspicious: true })).toBe(expected)
  })
  // 4A management: "3-month LDCT; PET/CT may be considered if there is a >= 8 mm solid nodule or solid component".
  it('a baseline 8 mm solid nodule mentions PET/CT', () => {
    expect(lungRads({ ...initialLungRadsForm, meanDiameterMm: '8' }).management).toContain('PET/CT')
  })
})
