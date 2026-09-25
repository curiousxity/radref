import { describe, expect, it } from 'vitest'
import { classify, initialBosniakForm, type BosniakForm } from './bosniak'

/*
 * Bosniak v2019 (Silverman et al., Radiology 2019;292:475-488, doi:10.1148/radiol.2019182646).
 * Thin is <= 2 mm, minimally thickened 3 mm, thick >= 4 mm; few septa 1-3, many >= 4.
 */
const cat = (over: Partial<BosniakForm>) => classify({ ...initialBosniakForm, ...over }).category
const enh = { enhancingPresent: true }

describe('Bosniak 2019: scope', () => {
  // The classification applies to cystic masses (< about 25% enhancing tissue).
  it('is not applicable to a mass that is not cystic', () => {
    expect(cat({ cysticRenalMass: false, enhancingNodule: 'nodule' })).toBe('Not applicable')
  })
})

describe('Bosniak 2019: class I', () => {
  // Class I: "well-defined, thin (<= 2 mm), smooth wall; homogeneous simple fluid; no septa or
  // calcifications; the wall may enhance".
  it.each([
    ['nonenhancing thin wall', {}],
    ['thin smooth wall that enhances', enh],
  ])('%s is Bosniak I', (_label, over) => {
    expect(cat(over)).toBe('Bosniak I')
  })

  /*
   * GUIDELINE CONTRADICTION: an imperceptible wall is within "thin (<= 2 mm)", so a
   * nonenhancing simple cyst with no visible wall and no septa or calcification is class I.
   * The logic requires wallThickness 'thin' for class I and returns Bosniak II.
   */
  it('a nonenhancing cyst with no visible wall and no septa is Bosniak I', () => {
    expect(cat({ wallThickness: 'none' })).toBe('Bosniak I')
  })
})

describe('Bosniak 2019: class II', () => {
  // Class II: "thin (<= 2 mm) smooth wall with few (1-3) thin septa; septa and wall may enhance;
  // may have calcification of any type"; nonenhancing masses are class II.
  it.each([
    ['few thin enhancing septa', { ...enh, septaCount: 'few' as const }],
    ['few thin nonenhancing septa', { septaCount: 'few' as const }],
    ['calcification, no septa', { calcificationOnly: true }],
    ['calcification with an enhancing thin wall', { ...enh, calcificationOnly: true }],
    ['few septa with calcification', { septaCount: 'few' as const, calcificationOnly: true }],
    // IIF features are all "enhancing"; without enhancement a minimally thick wall is not IIF.
    ['nonenhancing minimally thick wall', { wallThickness: 'minimallyThick' as const }],
  ])('%s is Bosniak II', (_label, over) => {
    expect(cat(over)).toBe('Bosniak II')
  })
})

describe('Bosniak 2019: class IIF', () => {
  // Class IIF: "smooth minimally thickened (3 mm) enhancing wall, or smooth minimal thickening
  // (3 mm) of one or more enhancing septa, or many (>= 4) smooth thin (<= 2 mm) enhancing septa";
  // MRI: "heterogeneously hyperintense at unenhanced fat-saturated T1-weighted imaging".
  it.each([
    ['minimally thick enhancing wall', { ...enh, wallThickness: 'minimallyThick' as const }],
    ['few minimally thick enhancing septa', { ...enh, septaCount: 'few' as const, septaThickness: 'minimallyThick' as const }],
    ['many thin enhancing septa', { ...enh, septaCount: 'many' as const }],
    ['heterogeneous T1 hyperintensity, no enhancement', { t1HyperintenseUnenhanced: true }],
  ])('%s is Bosniak IIF', (_label, over) => {
    expect(cat(over)).toBe('Bosniak IIF')
  })

  /*
   * GUIDELINE CONTRADICTION: heterogeneous T1 hyperintensity is a IIF feature in its own right,
   * and a class I or II wall "may enhance", so an enhancing thin wall does not cancel it. The
   * logic only counts the T1 feature when enhancement is absent and returns Bosniak I.
   */
  it('heterogeneous T1 hyperintensity with an enhancing thin wall is Bosniak IIF', () => {
    expect(cat({ ...enh, t1HyperintenseUnenhanced: true })).toBe('Bosniak IIF')
  })
})

describe('Bosniak 2019: class III', () => {
  // Class III: "one or more enhancing thick (>= 4 mm width) or enhancing irregular (displaying
  // <= 3 mm obtuse-margined convex protrusion[s]) walls or septa".
  it.each([
    ['enhancing thick wall', { ...enh, wallThickness: 'thick' as const }],
    ['enhancing thick septa', { ...enh, septaCount: 'few' as const, septaThickness: 'thick' as const }],
    ['enhancing wall irregularity', { ...enh, wallIrregularity: true }],
    ['obtuse protrusion <= 3 mm', { ...enh, enhancingNodule: 'irregularity' as const }],
    ['many septa, one thick', { ...enh, septaCount: 'many' as const, septaThickness: 'thick' as const }],
  ])('%s is Bosniak III', (_label, over) => {
    expect(cat(over)).toBe('Bosniak III')
  })

  it('a thick wall without enhancement is not class III', () => {
    expect(cat({ wallThickness: 'thick' })).not.toBe('Bosniak III')
  })
})

describe('Bosniak 2019: class IV', () => {
  // Class IV: "one or more enhancing nodule(s) (>= 4 mm convex protrusion with obtuse margins, or
  // a convex protrusion of any size that has acute margins)".
  it.each([
    ['nodule alone', { enhancingNodule: 'nodule' as const }],
    ['nodule with a thick wall', { ...enh, enhancingNodule: 'nodule' as const, wallThickness: 'thick' as const }],
  ])('%s is Bosniak IV', (_label, over) => {
    expect(cat(over)).toBe('Bosniak IV')
  })
})
