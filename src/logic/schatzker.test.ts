import { describe, expect, test } from 'vitest'
import { schatzker, schatzkerSentence } from './schatzker'

/*
 * Each case quotes its claim from docs/superpowers/research/2026-10-23-knee-mri-sources.md.
 * None of these claims has been checked against Schatzker et al. (Clin Orthop Relat Res
 * 1979) yet: the wording is from memory, pending the check on a computer.
 */

const type = (input: Parameters<typeof schatzker>[0]) => schatzker(input)?.type

describe('Schatzker types (unchecked)', () => {
  test('lateral plateau: split, split with depression, depression', () => {
    // SZ-1: "Type I is a pure split (cleavage) fracture of the lateral plateau."
    expect(type({ plateau: 'lateral', pattern: 'split', dissociation: false })).toBe('I')
    // SZ-2: "Type II is a split combined with depression of the lateral plateau."
    expect(type({ plateau: 'lateral', pattern: 'split-depression', dissociation: false })).toBe('II')
    // SZ-3: "Type III is a pure depression of the lateral plateau, without a split."
    expect(type({ plateau: 'lateral', pattern: 'depression', dissociation: false })).toBe('III')
  })

  test('medial plateau is type IV, whatever the pattern', () => {
    // SZ-4: "Type IV is a fracture of the medial plateau."
    expect(type({ plateau: 'medial', dissociation: false })).toBe('IV')
    expect(type({ plateau: 'medial', pattern: 'depression', dissociation: false })).toBe('IV')
  })

  test('both plateaus is type V', () => {
    // SZ-5: "Type V is a bicondylar fracture."
    expect(type({ plateau: 'both', dissociation: false })).toBe('V')
  })

  test('metaphyseal-diaphyseal dissociation is type VI, whatever the plateaus', () => {
    // SZ-6: "Type VI is a plateau fracture with dissociation of the metaphysis from the diaphysis."
    expect(type({ plateau: 'lateral', pattern: 'split', dissociation: true })).toBe('VI')
    expect(type({ plateau: 'both', dissociation: true })).toBe('VI')
    expect(type({ dissociation: true })).toBe('VI')
  })

  test('undecided until the answers decide it', () => {
    expect(type({})).toBeUndefined()
    // Without the dissociation answer, a lateral split could still be type VI.
    expect(type({ plateau: 'lateral', pattern: 'split' })).toBeUndefined()
    expect(type({ plateau: 'lateral', dissociation: false })).toBeUndefined()
    expect(type({ dissociation: false })).toBeUndefined()
  })
})

describe('Schatzker report sentence', () => {
  test('names the type and its description, with the depression depth when given', () => {
    const result = schatzker({ plateau: 'lateral', pattern: 'split-depression', dissociation: false })!
    expect(schatzkerSentence(result)).toBe('Tibial plateau fracture, Schatzker type II: split with depression of the lateral plateau.')
    expect(schatzkerSentence(result, 6)).toBe('Tibial plateau fracture, Schatzker type II: split with depression of the lateral plateau, articular depression 6 mm.')
  })
})
