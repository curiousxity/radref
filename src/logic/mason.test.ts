import { describe, expect, test } from 'vitest'
import { brobergMorrey, mason, masonSentence } from './mason'

/*
 * Each case quotes its claim from docs/superpowers/research/2026-10-23-elbow-mri-sources.md.
 * None of these claims has been checked against Mason (Br J Surg 1954), Johnston (Ulster Med J
 * 1962) or Broberg and Morrey (J Bone Joint Surg Am 1986) yet: the wording is from memory,
 * pending the check on a computer.
 */

const type = (input: Parameters<typeof mason>[0]) => mason(input)?.type

describe('Mason types (unchecked)', () => {
  test("Mason's three original types", () => {
    // MA-1: "Type I is a fissure or marginal fracture without displacement."
    expect(type({ pattern: 'undisplaced', dislocation: false })).toBe('I')
    // MA-2: "Type II is a marginal sector fracture with displacement."
    expect(type({ pattern: 'displaced', dislocation: false })).toBe('II')
    // MA-3: "Type III is a comminuted fracture involving the whole head."
    expect(type({ pattern: 'comminuted', dislocation: false })).toBe('III')
  })

  test("Johnston's type IV: any radial head fracture with an elbow dislocation", () => {
    // MA-4: "Johnston added type IV, a radial head fracture with dislocation of the elbow."
    for (const pattern of ['undisplaced', 'displaced', 'comminuted'] as const) {
      expect(type({ pattern, dislocation: true })).toBe('IV')
    }
    expect(type({ dislocation: true })).toBe('IV')
    expect(mason({ dislocation: true })?.modified).toBe(true)
    expect(mason({ pattern: 'displaced', dislocation: false })?.modified).toBe(false)
  })

  test('undecided until the answers decide it', () => {
    expect(type({})).toBeUndefined()
    // Without the dislocation answer, any pattern could still be type IV.
    expect(type({ pattern: 'undisplaced' })).toBeUndefined()
    expect(type({ dislocation: false })).toBeUndefined()
  })
})

describe('Broberg-Morrey thresholds (unchecked)', () => {
  // MA-5: "Type I: displacement of less than 2 mm."
  // MA-6: "Type II: displacement of 2 mm or more, involving 30% or more of the head."
  test('at the 2 mm and 30% boundaries', () => {
    expect(brobergMorrey(1.9)).toBe('I')
    expect(brobergMorrey(1.9, 50)).toBe('I')
    expect(brobergMorrey(2, 30)).toBe('II')
    expect(brobergMorrey(2, 29)).toBeUndefined()
    expect(brobergMorrey(2)).toBeUndefined()
    expect(brobergMorrey(undefined, 40)).toBeUndefined()
  })
})

describe('Mason report sentence', () => {
  test('names the type and its description; type IV names the modification', () => {
    expect(masonSentence(mason({ pattern: 'displaced', dislocation: false })!))
      .toBe('Radial head fracture, Mason type II: marginal sector fracture with displacement.')
    expect(masonSentence(mason({ pattern: 'comminuted', dislocation: true })!))
      .toBe('Radial head fracture with dislocation of the elbow, Mason type IV (Johnston modification).')
  })
})
