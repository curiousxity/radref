import { describe, expect, test } from 'vitest'
import { brobergMorrey, brobergMorreySentence, mason, masonFindings, masonSentence } from './mason'

/*
 * Each case quotes its claim from docs/superpowers/research/2026-10-23-elbow-mri-sources.md.
 * Types I to III are checked against Mason's table as Iannuzzi and Leopold reproduce it (Clin
 * Orthop Relat Res 2012), type IV against Johnston (Ulster Med J 1962). The thresholds are not in
 * the 1986 Broberg and Morrey paper, read in full; the reviews credit their 1987 paper (Clin
 * Orthop Relat Res 1987;216:109-119), which is paywalled, and are checked against a review that
 * states them (van der Windt et al., EFORT Open Rev 2024; 2026-10-29). The Broberg-Morrey
 * result is labelled as that modification: other versions (Hotchkiss's) have no size requirement.
 */

const type = (input: Parameters<typeof mason>[0]) => mason(input)?.type

describe('Mason types', () => {
  test("Mason's three original types", () => {
    // MA-1: "Type 1 Fissure or marginal fractures without displacement" (Mason's table, as
    // Iannuzzi and Leopold 2012 reproduce it).
    expect(type({ pattern: 'undisplaced', dislocation: false })).toBe('I')
    // MA-2: "Type 2 Marginal sector fractures with displacement".
    expect(type({ pattern: 'displaced', dislocation: false })).toBe('II')
    // MA-3: "Type 3 Comminuted fractures involving the whole head of the radius".
    expect(type({ pattern: 'comminuted', dislocation: false })).toBe('III')
  })

  test("Johnston's type IV: any radial head fracture with an elbow dislocation", () => {
    // MA-4: "Type IV. Fracture of the radial head associated with dislocation of the elbow"
    // (Johnston 1962).
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

describe('Broberg-Morrey modification', () => {
  // MA-5, MA-6 (van der Windt et al. 2024): a partial fracture "must be of sufficient size (at
  // least 30% of the articular surface) and displacement (at least 2 mm) to be considered a
  // displaced fracture (Mason type II, as opposed to nondisplaced Mason type I)". By the author's
  // decision (2026-10-29), a fragment displaced 2 mm or more but under 30% is type I under this
  // modification; it used to be left undecided.
  test('at the 2 mm and 30% boundaries', () => {
    expect(brobergMorrey(1.9)).toBe('I')
    expect(brobergMorrey(1.9, 50)).toBe('I')
    expect(brobergMorrey(2, 30)).toBe('II')
    expect(brobergMorrey(2, 29)).toBe('I')
    expect(brobergMorrey(5, 10)).toBe('I')
    // Not decided while the share of the articular surface is missing.
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

describe('measured findings', () => {
  // Displacement, articular surface and a mechanical block are recorded separately; van der
  // Windt et al. 2024: "Displacement (>2 mm) of fragments in radial head fractures without a
  // mechanical block to pronation/supination is not a clear indication for surgery".
  test('one line per measurement entered, and the modification named', () => {
    expect(masonFindings({})).toEqual([])
    expect(masonFindings({ displacementMm: 3, surfacePercent: 20, mechanicalBlock: false })).toEqual([
      'Fragment displacement: 3 mm.',
      'Articular surface involved: 20%.',
      'Mechanical block to forearm rotation: absent.',
    ])
    expect(masonFindings({ mechanicalBlock: true })).toEqual(['Mechanical block to forearm rotation: present.'])
    expect(brobergMorreySentence('I')).toBe('Broberg-Morrey modification: type I.')
  })
})
