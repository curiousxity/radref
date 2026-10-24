import { describe, expect, test } from 'vitest'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from './herbert'
import { lichtman, lichtmanSentence, lichtmanStages } from './lichtman'
import { mayfield, mayfieldGaps, mayfieldSentence } from './mayfield'
import { palmerClasses, palmerKind, palmerSentence } from './palmer'

/*
 * The four wrist classifications. Each case quotes its claim from
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md by ID. The papers are
 * matched on PubMed, but only the claims marked verified there were read in an abstract; the
 * rest of the wording is still from memory.
 */

describe('Mayfield (unchecked)', () => {
  test('each stage from its structure', () => {
    // MF-1: "Stage I perilunar instability (scapholunate diastasis)" (Mayfield 1980, abstract).
    expect(mayfield({ scapholunate: true })?.stage).toBe('I')
    // MF-2: "Stage II: the capitate dislocates from the lunate (perilunate dislocation)."
    expect(mayfield({ scapholunate: true, capitolunate: true })?.stage).toBe('II')
    // MF-3: "Stage III: the injury extends through the lunotriquetral joint."
    expect(mayfield({ scapholunate: true, capitolunate: true, lunotriquetral: true })?.stage).toBe('III')
    // MF-4: "Lunate dislocations (stage IV PLI)" (Mayfield 1980, abstract).
    expect(mayfield({ scapholunate: true, capitolunate: true, lunotriquetral: true, lunateDislocated: true })?.stage).toBe('IV')
  })

  test('nothing disrupted is no stage', () => {
    expect(mayfield({})).toBeUndefined()
    expect(mayfield({ scapholunate: false, capitolunate: false })).toBeUndefined()
  })

  // MF-5: "These dislocations occurred in a sequential fashion due to progressive and specific
  // ligamentous disruptions" (Mayfield 1980, abstract). Listing the gaps is the site's handling.
  test('the highest stage wins, and the unmarked earlier stages are listed', () => {
    const input = { lunotriquetral: true }
    expect(mayfield(input)?.stage).toBe('III')
    expect(mayfieldGaps(input)).toEqual(['I', 'II'])
    expect(mayfieldGaps({ scapholunate: true, capitolunate: true, lunotriquetral: true, lunateDislocated: true })).toEqual([])
    expect(mayfieldGaps({ scapholunate: true, lunateDislocated: true })).toEqual(['II', 'III'])
  })

  test('report sentence', () => {
    expect(mayfieldSentence(mayfield({ scapholunate: true })!)).toBe('Perilunate injury, Mayfield stage I: scapholunate disruption (scapholunate dissociation).')
  })
})

describe('Herbert (unchecked)', () => {
  // HB-5: "A acute stable, B acute unstable, C delayed union, D non-union."
  test('groups', () => {
    expect(herbertTypes.map(herbertGroup)).toEqual([
      'acute stable', 'acute stable', 'acute unstable', 'acute unstable', 'acute unstable', 'acute unstable', 'delayed union', 'non-union', 'non-union',
    ])
  })

  test('every type has a description and a sentence', () => {
    for (const type of herbertTypes) expect(herbertDescriptions[type]).toBeTruthy()
    // HB-2: "B2: complete fracture of the waist."
    expect(herbertSentence('B2')).toBe('Scaphoid fracture, Herbert type B2 (acute unstable): complete fracture of the waist.')
  })
})

describe('Palmer (unchecked)', () => {
  // PA-3: "Class 1 lesions are traumatic and class 2 degenerative."
  test('class 1 is traumatic, class 2 degenerative', () => {
    expect(palmerClasses.filter((c) => palmerKind(c) === 'traumatic')).toEqual(['1A', '1B', '1C', '1D'])
    expect(palmerClasses.filter((c) => palmerKind(c) === 'degenerative')).toEqual(['2A', '2B', '2C', '2D', '2E'])
  })

  test('report sentence', () => {
    // PA-1: "1B: ulnar avulsion, with or without a fracture of the ulnar styloid."
    expect(palmerSentence('1B')).toBe('TFCC lesion, Palmer 1B (traumatic): ulnar avulsion, with or without a fracture of the ulnar styloid.')
  })
})

describe('Lichtman (unchecked)', () => {
  test('stages from the findings', () => {
    // LI-1: "Stage I: normal radiographs." (Unchecked; the 1977 abstract says only "Four
    // clinical and roentgenographic stages were identified".)
    expect(lichtman({ abnormal: true })).toBe('I')
    // LI-1: "Stage II: sclerosis without collapse."
    expect(lichtman({ abnormal: true, sclerosis: true })).toBe('II')
    // LI-2: "IIIA: collapse with carpal height maintained; IIIB: with carpal collapse."
    expect(lichtman({ sclerosis: true, collapse: true, carpalCollapse: false })).toBe('IIIA')
    expect(lichtman({ sclerosis: true, collapse: true, carpalCollapse: true })).toBe('IIIB')
    // LI-1: "Stage IV: degenerative changes of the radiocarpal or midcarpal joint."
    expect(lichtman({ collapse: true, carpalCollapse: true, arthritis: true })).toBe('IV')
  })

  test('undecided until the findings decide it', () => {
    expect(lichtman({})).toBeUndefined()
    // Collapse without the carpal-collapse answer could be IIIA or IIIB.
    expect(lichtman({ collapse: true })).toBeUndefined()
  })

  // LI-1, LI-4: the 1977 paper predates clinical MRI, so it cannot be the source for "abnormal
  // only on MRI", and no other listed paper states it; stage I now says only what the stage
  // wording claims, normal radiographs.
  test('stage I does not claim MRI from the 1977 paper', () => {
    expect(lichtmanSentence('I')).toBe('Kienböck disease, Lichtman stage I: normal radiographs.')
  })

  test('report sentence for every stage', () => {
    for (const stage of lichtmanStages) expect(lichtmanSentence(stage)).toMatch(new RegExp(`^Kienböck disease, Lichtman stage ${stage}: .+\\.$`))
  })
})
