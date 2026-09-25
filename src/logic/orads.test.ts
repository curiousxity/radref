import { describe, expect, it } from 'vitest'
import type { OradsForm } from '../types/orads'
import { calculateOrads } from './orads'

/*
 * O-RADS US v2022 (Strachowski et al., Radiology 2023;308:e230685, doi:10.1148/radiol.230685)
 * and the O-RADS MRI score (Thomassin-Naggara et al., JAMA Netw Open 2020;3:e1919896,
 * doi:10.1001/jamanetworkopen.2019.19896).
 */
const us: OradsForm = {
  modality: 'us',
  menopausal: 'postmenopausal',
  sizeCm: '5',
  cystType: 'simple',
  solidComponent: false,
  papillaryProjections: 0,
  locules: 1,
  smoothContour: true,
  ascites: false,
  peritonealDisease: false,
  colorScore: '1',
  enhancingSolidTissue: false,
  fat: false,
  hemorrhagic: false,
  diffusionRestriction: false,
  enhancement: 'none',
}
const cat = (over: Partial<OradsForm>) => calculateOrads({ ...us, ...over }).category

describe('O-RADS US v2022: almost certainly benign (2) and low risk (3)', () => {
  // O-RADS 2: simple cyst, or nonsimple unilocular cyst with smooth inner margin, < 10 cm;
  // classic benign lesions < 10 cm. O-RADS 3: unilocular cyst >= 10 cm.
  it.each([
    ['simple cyst 9.9 cm', { sizeCm: '9.9' }, 'O-RADS 2'],
    ['simple cyst 10 cm', { sizeCm: '10' }, 'O-RADS 3'],
    ['nonsimple unilocular 9.9 cm', { cystType: 'nonsimple' as const, sizeCm: '9.9' }, 'O-RADS 2'],
    ['nonsimple unilocular 10 cm', { cystType: 'nonsimple' as const, sizeCm: '10' }, 'O-RADS 3'],
    ['classic benign lesion 5 cm', { cystType: 'classicBenign' as const }, 'O-RADS 2'],
  ])('%s is %s', (_label, over, expected) => {
    expect(cat(over)).toBe(expected)
  })

  /*
   * GUIDELINE CONTRADICTION: O-RADS 1 is the normal premenopausal ovary, including a follicle
   * (simple cyst <= 3 cm). The logic never returns O-RADS 1 and ignores menopausal status.
   */
  it('a 3 cm simple cyst in a premenopausal patient is O-RADS 1', () => {
    expect(cat({ menopausal: 'premenopausal', sizeCm: '3' })).toBe('O-RADS 1')
  })

  /* GUIDELINE CONTRADICTION: classic benign lesions >= 10 cm are O-RADS 3; the logic gives 2 at any size. */
  it('a 10 cm classic benign lesion is O-RADS 3', () => {
    expect(cat({ cystType: 'classicBenign', sizeCm: '10' })).toBe('O-RADS 3')
  })
})

describe('O-RADS US v2022: multilocular cysts without solid component', () => {
  // Multilocular, smooth, < 10 cm, CS 1-3: O-RADS 3. Multilocular >= 10 cm or CS 4: O-RADS 4.
  it.each([
    ['9.9', '1', 'O-RADS 3'],
    ['9.9', '3', 'O-RADS 3'],
    ['9.9', '4', 'O-RADS 4'],
    ['10', '1', 'O-RADS 4'],
  ] as const)('%s cm, CS %s is %s', (sizeCm, colorScore, expected) => {
    expect(cat({ cystType: 'multilocular', locules: 3, sizeCm, colorScore })).toBe(expected)
  })
})

describe('O-RADS US v2022: cysts with papillary projections or solid component', () => {
  // Unilocular cyst with 1-3 papillary projections: O-RADS 4; >= 4 papillary projections: O-RADS 5.
  it.each([
    [1, 'O-RADS 4'],
    [3, 'O-RADS 4'],
    [4, 'O-RADS 5'],
  ])('%s papillary projections is %s', (papillaryProjections, expected) => {
    expect(cat({ papillaryProjections, solidComponent: true })).toBe(expected)
  })

  /*
   * GUIDELINE CONTRADICTION: a unilocular cyst with a (nonpapillary) solid component is O-RADS 4,
   * and a multilocular cyst with a solid component is O-RADS 4 at CS 1-2. The logic ignores the
   * solid component outside papillary projections and returns O-RADS 3 for both.
   */
  it('unilocular cyst with a solid component is O-RADS 4', () => {
    expect(cat({ cystType: 'nonsimple', solidComponent: true })).toBe('O-RADS 4')
  })
  it('multilocular cyst < 10 cm with a solid component, CS 1, is O-RADS 4', () => {
    expect(cat({ cystType: 'multilocular', locules: 3, solidComponent: true, colorScore: '1' })).toBe('O-RADS 4')
  })
})

describe('O-RADS US v2022: solid lesions', () => {
  // Solid smooth: CS 1 O-RADS 3, CS 2-3 O-RADS 4, CS 4 O-RADS 5. Solid irregular: O-RADS 5.
  it.each([
    ['2', 'O-RADS 4'],
    ['4', 'O-RADS 5'],
  ] as const)('smooth solid lesion, CS %s is %s', (colorScore, expected) => {
    expect(cat({ cystType: 'solid', colorScore })).toBe(expected)
  })

  /*
   * GUIDELINE CONTRADICTION: the logic maps solid lesions by color score alone (CS 1-2 -> 4,
   * CS 3-4 -> 5) and ignores the contour, so a smooth solid lesion at CS 1 or CS 3, and an
   * irregular one at low color score, are miscategorized.
   */
  it('smooth solid lesion, CS 1 is O-RADS 3', () => {
    expect(cat({ cystType: 'solid', colorScore: '1' })).toBe('O-RADS 3')
  })
  it('smooth solid lesion, CS 3 is O-RADS 4', () => {
    expect(cat({ cystType: 'solid', colorScore: '3' })).toBe('O-RADS 4')
  })
  it('irregular solid lesion, CS 1 is O-RADS 5', () => {
    expect(cat({ cystType: 'solid', colorScore: '1', smoothContour: false })).toBe('O-RADS 5')
  })
})

describe('O-RADS US v2022: high risk (5) from ascites or peritoneal nodules', () => {
  it.each([
    ['ascites', { ascites: true }],
    ['peritoneal disease', { peritonealDisease: true }],
  ])('%s makes even a simple cyst O-RADS 5', (_label, over) => {
    expect(cat(over)).toBe('O-RADS 5')
  })
})

describe('O-RADS MRI', () => {
  const mri = (over: Partial<OradsForm>) => cat({ modality: 'mri', ...over })
  // Score 2: no enhancing solid tissue (simple/endometriotic fluid, lipid content). Score 3:
  // solid tissue with a low-risk curve. Score 4: intermediate-risk curve. Score 5: high-risk
  // curve, or peritoneal carcinomatosis.
  it.each([
    ['nonenhancing cyst', {}, 'O-RADS 2'],
    ['lipid, no enhancing solid tissue', { fat: true, enhancement: 'minimal' as const }, 'O-RADS 2'],
    ['hemorrhagic, no enhancing solid tissue', { hemorrhagic: true, enhancement: 'minimal' as const }, 'O-RADS 2'],
    ['solid tissue, low-risk (minimal) enhancement', { enhancingSolidTissue: true, enhancement: 'minimal' as const }, 'O-RADS 3'],
    ['solid tissue, intermediate (moderate) enhancement', { enhancingSolidTissue: true, enhancement: 'moderate' as const }, 'O-RADS 4'],
    ['solid tissue, high-risk (marked) enhancement', { enhancingSolidTissue: true, enhancement: 'marked' as const }, 'O-RADS 5'],
    ['peritoneal disease', { peritonealDisease: true }, 'O-RADS 5'],
  ])('%s is %s', (_label, over, expected) => {
    expect(mri(over)).toBe(expected)
  })

  /*
   * GUIDELINE CONTRADICTION: in the O-RADS MRI score the category of enhancing solid tissue is set
   * by its enhancement curve; DWI only lowers the score (dark T2 and dark DWI solid tissue is 2).
   * The logic raises low-risk (minimal) enhancement with diffusion restriction to O-RADS 4.
   */
  it('solid tissue with low-risk enhancement stays O-RADS 3 with diffusion restriction', () => {
    expect(mri({ enhancingSolidTissue: true, enhancement: 'minimal', diffusionRestriction: true })).toBe('O-RADS 3')
  })
})

describe('O-RADS US v2022: branches added with the v2022 corrections', () => {
  // O-RADS 1 is only the premenopausal follicle (simple cyst <= 3 cm).
  it.each([
    ['premenopausal simple cyst 3.1 cm', { menopausal: 'premenopausal' as const, sizeCm: '3.1' }, 'O-RADS 2'],
    ['postmenopausal simple cyst 3 cm', { sizeCm: '3' }, 'O-RADS 2'],
    ['classic benign lesion 9.9 cm', { cystType: 'classicBenign' as const, sizeCm: '9.9' }, 'O-RADS 2'],
    // Multilocular with a solid component: CS 1-2 O-RADS 4, CS 3-4 O-RADS 5.
    ['multilocular with solid component, CS 2', { cystType: 'multilocular' as const, locules: 3, solidComponent: true, colorScore: '2' as const }, 'O-RADS 4'],
    ['multilocular with solid component, CS 3', { cystType: 'multilocular' as const, locules: 3, solidComponent: true, colorScore: '3' as const }, 'O-RADS 5'],
    // Solid irregular is O-RADS 5 at any color score.
    ['irregular solid lesion, CS 4', { cystType: 'solid' as const, colorScore: '4' as const, smoothContour: false }, 'O-RADS 5'],
    // A legacy color score of 0 is read as 1 (no flow).
    ['smooth solid lesion, legacy CS 0', { cystType: 'solid' as const, colorScore: '0' as const }, 'O-RADS 3'],
  ])('%s is %s', (_label, over, expected) => {
    expect(cat(over)).toBe(expected)
  })
})
