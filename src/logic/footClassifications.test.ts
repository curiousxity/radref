import { describe, expect, test } from 'vitest'
import { hawkins, hawkinsDescriptions, hawkinsGaps, hawkinsSentence, hawkinsTypes } from './hawkins'
import { myerson, myersonDescriptions, myersonGroup, myersonSentence, myersonTypes } from './myerson'
import { sanders, sandersDescription, sandersGroup, sandersSentence, sandersTypes } from './sanders'

/*
 * The three foot classifications. Each case quotes its claim from
 * docs/superpowers/research/2026-10-23-foot-calculators-sources.md by ID. The papers are
 * matched on PubMed, but only the claims marked verified there were read in an abstract; the
 * rest of the wording is still from memory.
 */

describe('Hawkins', () => {
  test('each type from its joints', () => {
    // HK-1: "Type I injuries include vertical fractures of the neck of the talus with a minimally
    // displaced fracture line" (Alton et al. 2015)."
    expect(hawkins({ displaced: false })).toBe('I')
    expect(hawkins({})).toBe('I')
    // HK-2: "Type II: displaced, with subluxation or dislocation of the subtalar joint."
    expect(hawkins({ displaced: true, subtalar: true })).toBe('II')
    // HK-3: "Type III: the body dislocated from both the subtalar and the ankle joint."
    expect(hawkins({ displaced: true, subtalar: true, ankle: true })).toBe('III')
    // HK-4: "Type IV is a talar neck fracture with subtalar, tibiotalar, and talonavicular
    // dislocations" (Alton et al. 2015, Fig. 1).
    expect(hawkins({ displaced: true, subtalar: true, ankle: true, talonavicular: true })).toBe('IV')
  })

  test('an undisplaced fracture is type I whatever joints are marked', () => {
    expect(hawkins({ displaced: false, subtalar: true, ankle: true })).toBe('I')
    expect(hawkinsGaps({ displaced: false, ankle: true })).toEqual([])
  })

  // HK-6: Hawkins named no type for a displaced fracture with every joint in place.
  test('a displaced fracture with no joint marked has no type', () => {
    expect(hawkins({ displaced: true })).toBeUndefined()
    expect(hawkinsGaps({ displaced: true })).toEqual([])
  })

  // HK-5: each type includes the joint injuries of the types before it. Alton et al. 2015, Fig. 1:
  // "(B) Type II is a talar neck fracture with subtalar dislocation", "(C) Type III is a talar neck
  // fracture with subtalar and tibiotalar dislocations", "(D) Type IV ... with subtalar,
  // tibiotalar, and talonavicular dislocations". Listing the unmarked ones is the site's handling.
  test('the highest type wins, and the unmarked earlier types are listed', () => {
    expect(hawkins({ displaced: true, ankle: true })).toBe('III')
    expect(hawkinsGaps({ displaced: true, ankle: true })).toEqual(['II'])
    expect(hawkinsGaps({ displaced: true, talonavicular: true })).toEqual(['II', 'III'])
    expect(hawkinsGaps({ displaced: true, subtalar: true, ankle: true, talonavicular: true })).toEqual([])
  })

  test('every type has a description and a sentence', () => {
    for (const type of hawkinsTypes) expect(hawkinsDescriptions[type]).toBeTruthy()
    // Was "undisplaced"; the review says "minimally displaced", with both joints reduced.
    expect(hawkinsSentence('I')).toBe('Talar neck fracture, Hawkins type I: undisplaced or minimally displaced fracture of the talar neck, with the subtalar and ankle joints in place.')
    // The author's decision (2026-10-29): type IV names all three joints, as Alton's figure does.
    // Was "as type III, with subluxation or dislocation of the talar head at the talonavicular joint".
    expect(hawkinsDescriptions.IV).toBe('displaced fracture with subtalar and tibiotalar (ankle) dislocation, plus subluxation or dislocation of the talar head at the talonavicular joint')
  })
})

describe('Sanders (unchecked)', () => {
  // SA-3: "Type I fractures include all minimally displaced (≤ 2 mm) articular fractures,
  // regardless of the number of fracture lines and fragments present" (Jiménez-Almonte 2019).
  // The description said "undisplaced"; the review's wording is "minimally displaced (≤ 2 mm)".
  test('undisplaced is type I, however many lines', () => {
    expect(sanders({ displaced: false, lines: ['A'] })).toBe('I')
    expect(sanders({ displaced: false, lines: ['A', 'B', 'C'] })).toBe('I')
    expect(sanders({ displaced: false, comminuted: true })).toBe('I')
  })

  test('no line and no comminution marked is no type yet', () => {
    expect(sanders({})).toBeUndefined()
    expect(sanders({ displaced: true, lines: [] })).toBeUndefined()
  })

  // SA-4: "Type II were two-part or split fractures; Type III were three-part or split
  // depression fractures; and Type IV were four-part or highly comminuted articular fractures"
  // (Sanders 1993, abstract). SA-5: the subtype letters name the lines.
  test('displaced: the type from the number of lines, the subtype from which', () => {
    expect(sanders({ displaced: true, lines: ['A'] })).toBe('IIA')
    expect(sanders({ displaced: true, lines: ['B'] })).toBe('IIB')
    expect(sanders({ displaced: true, lines: ['C'] })).toBe('IIC')
    expect(sanders({ displaced: true, lines: ['A', 'B'] })).toBe('IIIAB')
    expect(sanders({ displaced: true, lines: ['C', 'A'] })).toBe('IIIAC')
    expect(sanders({ displaced: true, lines: ['B', 'C'] })).toBe('IIIBC')
    expect(sanders({ displaced: true, lines: ['A', 'B', 'C'] })).toBe('IV')
    expect(sanders({ displaced: true, lines: ['A'], comminuted: true })).toBe('IV')
  })

  test('groups, descriptions and sentence', () => {
    expect(sandersTypes.map(sandersGroup)).toEqual(['I', 'II', 'II', 'II', 'III', 'III', 'III', 'IV'])
    // The wording is the abstract's (SA-4). Was "with a centrally depressed fragment" and "four-part
    // or more comminuted", from memory; the paper names type III "split depression".
    expect(sandersDescription('IIIAC')).toBe('three-part or split depression fracture of the posterior facet (lines A and C)')
    expect(sandersDescription('IV')).toBe('four-part or highly comminuted fracture of the posterior facet')
    expect(sandersDescription('I')).toBe('minimally displaced (2 mm or less) articular fracture, whatever the number of fracture lines')
    expect(sandersSentence('IIB')).toBe('Intra-articular calcaneal fracture, Sanders type IIB: two-part or split fracture of the posterior facet (line B).')
  })
})

describe('Myerson (unchecked)', () => {
  test('each type from the displacement pattern', () => {
    // MY-1: "Dislocation of M1-M5 in the same direction" (Tzatzairis 2019).
    expect(myerson({ first: 'with-lesser', lesser: 'all' })).toBe('A')
    // MY-2: B1 "Medial dislocation involving only the M1 joint" (Tzatzairis); B2 "Lateral
    // dislocations—involving any of the 4 lateral metatarsals" (Diebal 2013), so some or all four.
    expect(myerson({ first: 'medial', lesser: 'none' })).toBe('B1')
    expect(myerson({ first: 'none', lesser: 'some' })).toBe('B2')
    expect(myerson({ first: 'none', lesser: 'all' })).toBe('B2')
    // MY-3: C1 "Divergent, incomplete dislocation involving M1 and some of the lateral
    // metatarsals"; C2 "Divergent, complete dislocation involving M1 and all of the lateral
    // metatarsals" (Tzatzairis).
    expect(myerson({ first: 'medial', lesser: 'some' })).toBe('C1')
    expect(myerson({ first: 'medial', lesser: 'all' })).toBe('C2')
  })

  // MY-6: patterns Myerson did not name get no type.
  test('nothing displaced, or an unnamed pattern, is no type', () => {
    expect(myerson({ first: 'none', lesser: 'none' })).toBeUndefined()
    expect(myerson({ first: 'with-lesser', lesser: 'some' })).toBeUndefined()
    expect(myerson({ first: 'with-lesser', lesser: 'none' })).toBeUndefined()
  })

  // MY-4: "A total incongruity, B partial incongruity, C divergent."
  test('groups and sentence', () => {
    expect(myersonTypes.map(myersonGroup)).toEqual(['total incongruity', 'partial incongruity', 'partial incongruity', 'divergent', 'divergent'])
    expect(myersonSentence('B1')).toBe('Tarsometatarsal (Lisfranc) fracture-dislocation, Myerson type B1 (partial incongruity): the first metatarsal displaced medially.')
  })

  // The author's decision (2026-10-29): standardise A, B2 and C1. Was A "all five metatarsals
  // displaced in one direction, laterally or dorsoplantar (homolateral)", B2 "one or more of the
  // lesser metatarsals displaced laterally", C1 "the first metatarsal displaced medially and some
  // of the lesser metatarsals laterally". Second round (2026-10-29): B2 says alignment, not that
  // the first joint is "in place" (it was "one or more of metatarsals 2 to 5 displaced laterally
  // (partial lateral incongruity), with the first tarsometatarsal joint in place"). Gupta 2008:
  // B2 is "lateral dislocation of the second to fifth metatarsals"; Fig. 7, "The alignment of the
  // first metatarsal and first cuneiform appears to be within normal limits".
  test('A, B2 and C1 wording', () => {
    expect(myersonDescriptions.A).toBe('all five metatarsals displaced together in the same direction')
    expect(myersonSentence('B2')).toBe('Tarsometatarsal (Lisfranc) fracture-dislocation, Myerson type B2 (partial incongruity): lateral displacement of one or more of metatarsals 2 to 5, with maintained alignment of the first metatarsal with the medial cuneiform.')
    expect(myersonDescriptions.B2).not.toMatch(/intact|in place|preserved/)
    expect(myersonDescriptions.C1).toBe('the first metatarsal displaced medially and some, but not all, of metatarsals 2 to 5 laterally (partial divergence)')
  })
})
