import { describe, expect, it } from 'vitest'
import type { LiradsForm } from '../types/lirads'
import { calculateLirads, LIRADS_MANAGEMENT, liradsTableCategory } from './lirads'

/*
 * ACR CT/MRI LI-RADS v2018 diagnostic table (Chernyak et al., Radiology 2018;289:816-830,
 * doi:10.1148/radiol.2018181494). Additional major features: nonperipheral "washout",
 * enhancing "capsule", threshold growth.
 */
const t = (sizeMm: number, aphe: boolean, washout = false, capsule = false, thresholdGrowth = false) =>
  liradsTableCategory({ sizeMm, aphe, washout, capsule, thresholdGrowth })

describe('LI-RADS v2018 table: no arterial phase hyperenhancement', () => {
  // No APHE: < 20 mm LR-3 with none or one feature, LR-4 with >= 2; >= 20 mm LR-3 with none, LR-4 with >= 1.
  it.each([
    [19, [false, false, false], 'LR-3'],
    [19, [true, false, false], 'LR-3'],
    [19, [false, true, false], 'LR-3'],
    [19, [false, false, true], 'LR-3'],
    [19, [true, true, false], 'LR-4'],
    [19, [true, true, true], 'LR-4'],
    [20, [false, false, false], 'LR-3'],
    [20, [true, false, false], 'LR-4'],
    [20, [false, true, false], 'LR-4'],
    [20, [false, false, true], 'LR-4'],
  ] as const)('%s mm, [washout, capsule, growth] %o is %s', (size, [w, c, g], expected) => {
    expect(t(size, false, w, c, g)).toBe(expected)
  })
})

describe('LI-RADS v2018 table: nonrim APHE', () => {
  // < 10 mm: LR-3 with none, LR-4 with >= 1. 10-19 mm: LR-3 with none; one feature LR-4 if
  // "capsule", LR-5 if "washout" or threshold growth; LR-5 with >= 2. >= 20 mm: LR-4 with none,
  // LR-5 with >= 1.
  it.each([
    [9, [false, false, false], 'LR-3'],
    [9, [true, false, false], 'LR-4'],
    [9, [false, false, true], 'LR-4'],
    [9, [true, true, true], 'LR-4'],
    [10, [false, false, false], 'LR-3'],
    [10, [false, true, false], 'LR-4'],
    [10, [true, false, false], 'LR-5'],
    [10, [false, false, true], 'LR-5'],
    [19, [false, true, false], 'LR-4'],
    [19, [true, true, false], 'LR-5'],
    [19, [false, true, true], 'LR-5'],
    [20, [false, false, false], 'LR-4'],
    [20, [false, true, false], 'LR-5'],
    [20, [true, false, false], 'LR-5'],
    [20, [false, false, true], 'LR-5'],
  ] as const)('%s mm, [washout, capsule, growth] %o is %s', (size, [w, c, g], expected) => {
    expect(t(size, true, w, c, g)).toBe(expected)
  })
})

const form: LiradsForm = {
  modality: 'ct',
  riskStatus: 'highRisk',
  studyQuality: 'diagnostic',
  sizeCm: '2.5',
  aphe: true,
  washout: true,
  capsule: false,
  thresholdGrowth: false,
  tumorInVein: 'no',
  malignantNonHcc: 'no',
}
const calc = (over: Partial<LiradsForm>) => calculateLirads({ ...form, ...over })

describe('LI-RADS v2018: algorithm order before the table', () => {
  // LI-RADS applies only to patients at high risk for HCC (cirrhosis, chronic HBV, current or prior HCC).
  it('does not categorize a patient outside the population', () => {
    expect(calc({ riskStatus: 'notApplicable' }).category).toBe('N/A')
  })
  // "Untreated observation ... cannot be categorized due to image degradation or omission": LR-NC.
  it('an uncategorizable study is LR-NC', () => {
    expect(calc({ studyQuality: 'nc', tumorInVein: 'yes' }).category).toBe('LR-NC')
  })
  // Tumor in vein is assessed before LR-M and the table.
  it('tumor in vein is LR-TIV, ahead of LR-M', () => {
    expect(calc({ tumorInVein: 'yes', malignantNonHcc: 'yes' }).category).toBe('LR-TIV')
  })
  it('an LR-M appearance is LR-M, ahead of the table', () => {
    expect(calc({ malignantNonHcc: 'yes' }).category).toBe('LR-M')
  })
  it('waits for a size before applying the table', () => {
    expect(calc({ sizeCm: '' }).category).toBe('N/A')
  })
  // Size is entered in cm; the table thresholds are 10 and 20 mm.
  it.each([
    ['0.9', 'LR-4'],
    ['1.0', 'LR-5'],
  ])('APHE + washout at %s cm is %s', (sizeCm, expected) => {
    expect(calc({ sizeCm }).category).toBe(expected)
  })
  it('gives the core management for the category', () => {
    expect(calc({}).recommendation).toBe(LIRADS_MANAGEMENT['LR-5'])
  })
})
