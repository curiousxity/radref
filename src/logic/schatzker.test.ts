import { describe, expect, test } from 'vitest'
import { schatzker, schatzkerSentence } from './schatzker'

/*
 * Each case quotes its claim from docs/superpowers/research/2026-10-23-knee-mri-sources.md.
 * Schatzker et al. (Clin Orthop Relat Res 1979) has no abstract on PubMed, so the types are
 * checked against the abstract of Markhardt et al. (Radiographics 2009), quoted per case. How
 * type IV is broken (SZ-4) is still unchecked.
 */

const type = (input: Parameters<typeof schatzker>[0]) => schatzker(input)?.type

describe('Schatzker types (unchecked)', () => {
  test('lateral plateau: split, split with depression, depression', () => {
    // SZ-1: "lateral plateau fracture without depression (type I)" (Markhardt).
    expect(type({ plateau: 'lateral', pattern: 'split', dissociation: false })).toBe('I')
    // SZ-2: "lateral plateau fracture with depression (type II)" (Markhardt).
    expect(type({ plateau: 'lateral', pattern: 'split-depression', dissociation: false })).toBe('II')
    // SZ-3: "compression fracture of the lateral (type IIIA) or central (type IIIB) plateau"
    // (Markhardt). Without the site it stays type III.
    expect(type({ plateau: 'lateral', pattern: 'depression', dissociation: false })).toBe('III')
  })

  test('a pure depression is IIIA when lateral and IIIB when central', () => {
    // SZ-3: "compression fracture of the lateral (type IIIA) or central (type IIIB) plateau"
    // (Markhardt). The draft had type III only; the subtypes are added because the paper gives them.
    expect(type({ plateau: 'lateral', pattern: 'depression', depressionSite: 'lateral', dissociation: false })).toBe('IIIA')
    expect(type({ plateau: 'lateral', pattern: 'depression', depressionSite: 'central', dissociation: false })).toBe('IIIB')
    expect(schatzker({ plateau: 'lateral', pattern: 'depression', depressionSite: 'central', dissociation: false })?.description).toBe('compression fracture of the central plateau')
    // The site is read only for a pure depression.
    expect(type({ plateau: 'lateral', pattern: 'split-depression', depressionSite: 'central', dissociation: false })).toBe('II')
    expect(type({ plateau: 'lateral', pattern: 'depression', depressionSite: 'central', dissociation: true })).toBe('VI')
  })

  test('medial plateau is type IV, whatever the pattern', () => {
    // SZ-4: "medial plateau fracture (type IV)" (Markhardt).
    expect(type({ plateau: 'medial', dissociation: false })).toBe('IV')
    expect(type({ plateau: 'medial', pattern: 'depression', dissociation: false })).toBe('IV')
  })

  test('both plateaus is type V', () => {
    // SZ-5: "bicondylar plateau fracture (type V)" (Markhardt).
    expect(type({ plateau: 'both', dissociation: false })).toBe('V')
  })

  test('metaphyseal-diaphyseal dissociation is type VI, whatever the plateaus', () => {
    // SZ-6: "plateau fracture with diaphyseal discontinuity (type VI)" (Markhardt).
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
