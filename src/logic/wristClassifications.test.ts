import { describe, expect, test } from 'vitest'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from './herbert'
import { lichtman, lichtmanSentence, lichtmanStages } from './lichtman'
import { mayfield, mayfieldGaps, mayfieldSentence } from './mayfield'
import { palmerClasses, palmerKind, palmerSentence } from './palmer'

/*
 * The four wrist classifications. Each case quotes its claim from
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md by ID. The papers are
 * matched on PubMed; the wording was read in their abstracts or in the reviews and references
 * that reproduce their tables (Kennedy and Allan, AO Surgery Reference, von Borstel, Kennedy and
 * Abrams). Still unread: whether Herbert and Fisher's 1984 paper itself has type B5.
 */

describe('Mayfield', () => {
  test('each stage from its structure', () => {
    // MF-1: "Stage I perilunar instability (scapholunate diastasis)" (Mayfield 1980, abstract).
    expect(mayfield({ scapholunate: true })?.stage).toBe('I')
    // MF-2: "The second stage of progression involves capitolunate joint disruption in addition
    // to the scapholunate injury" (Kennedy and Allan 2012, reproducing Mayfield's table).
    expect(mayfield({ scapholunate: true, capitolunate: true })?.stage).toBe('II')
    // MF-3: "The lunotriquetral joint is now also disrupted" (Kennedy and Allan 2012).
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
    expect(mayfieldSentence(mayfield({ scapholunate: true })!)).toBe('Perilunate injury, Mayfield stage I: scapholunate disruption.')
    expect(mayfieldSentence(mayfield({ scapholunate: true, capitolunate: true, lunotriquetral: true })!)).toBe('Perilunate injury, Mayfield stage III: additional lunotriquetral disruption.')
  })

  // The reviews differ on which stage is the perilunate dislocation: "This stage [II] represents
  // the classic form of a PLD" (Dvorsky 2025); "Stage II is perilunate dislocation" (Sharma 2025);
  // "The third stage of progression is perilunate dislocation" (Kennedy and Allan 2012). The
  // author's decision (2026-10-29): name the disrupted structures, not the dislocation. Stage II
  // carries the dorsal capitate: "the capitate and remaining carpal bones dislocate dorsally"
  // (Dvorsky 2025).
  test('the stages name the disrupted structures, not the perilunate dislocation', () => {
    for (const input of [{ scapholunate: true }, { capitolunate: true }, { lunotriquetral: true }, { lunateDislocated: true }]) {
      expect(mayfield(input)?.description).not.toContain('perilunate')
    }
    expect(mayfield({ scapholunate: true, capitolunate: true })?.description).toBe('capitolunate disruption, with dorsal displacement or dislocation of the capitate relative to the lunate')
    expect(mayfield({ lunateDislocated: true })?.description).toBe('lunate dislocation, volarly from the lunate fossa of the radius')
  })
})

describe('Herbert', () => {
  // HB-5, AO Surgery Reference: "A – acute stable", "B – acute unstable", "C – delayed union",
  // "D – established nonunion". B5, "comminuted fracture", was missing from the type list.
  test('groups', () => {
    expect(herbertTypes.map(herbertGroup)).toEqual([
      'acute stable', 'acute stable', 'acute unstable', 'acute unstable', 'acute unstable', 'acute unstable', 'acute unstable', 'delayed union', 'non-union', 'non-union',
    ])
  })

  test('every type has a description and a sentence', () => {
    for (const type of herbertTypes) expect(herbertDescriptions[type]).toBeTruthy()
    // HB-2, AO Surgery Reference: "B2 – complete waist fracture". Steinmann and Adams 2006 word it
    // "displaced or mobile fractures of the waist"; the author kept AO's wording (2026-10-29).
    expect(herbertSentence('B2')).toBe('Scaphoid fracture, Herbert type B2 (acute unstable): complete waist fracture.')
  })
})

describe('Palmer', () => {
  // PA-3: "Class 1 lesions are traumatic and class 2 degenerative."
  test('class 1 is traumatic, class 2 degenerative', () => {
    expect(palmerClasses.filter((c) => palmerKind(c) === 'traumatic')).toEqual(['1A', '1B', '1C', '1D'])
    expect(palmerClasses.filter((c) => palmerKind(c) === 'degenerative')).toEqual(['2A', '2B', '2C', '2D', '2E'])
  })

  test('report sentence', () => {
    // PA-1, von Borstel 2017, Table 3 (Palmer's table): "1B: Ulnar avulsion with or without
    // distal ulnar fracture". The old wording said "a fracture of the ulnar styloid", which is
    // narrower than the table.
    expect(palmerSentence('1B')).toBe('TFCC lesion, Palmer 1B (traumatic): ulnar avulsion, with or without a distal ulnar fracture.')
    // PA-1, Table 3: "1C: Distal avulsion"; Vassa 2020: "traumatic avulsions from the peripheral
    // volar attachments at the lunate or triquetral bones".
    expect(palmerSentence('1C')).toBe('TFCC lesion, Palmer 1C (traumatic): distal avulsion, involving the carpal attachments of the TFCC (at the lunate or triquetrum).')
  })
})

describe('Lichtman', () => {
  // Quotes from Kennedy and Abrams, Clin Orthop Relat Res 2019.
  test('stages from the findings', () => {
    // LI-1: "Stage I was described as having normal architecture and lunate density".
    expect(lichtman({ abnormal: true })).toBe('I')
    // LI-1: "Stage II shows increased density in the lunate on plain radiographs without a
    // change in the shape, size, or relationship to other carpal bones."
    expect(lichtman({ abnormal: true, sclerosis: true })).toBe('II')
    // LI-2: "Stages IIIA (without fixed scaphoid rotation) and IIIB (with fixed scaphoid rotation)".
    expect(lichtman({ sclerosis: true, collapse: true, carpalCollapse: false })).toBe('IIIA')
    expect(lichtman({ sclerosis: true, collapse: true, carpalCollapse: true })).toBe('IIIB')
    // LI-3: "the addition of Stage IIIC representing a coronal fracture of the lunate". The
    // calculator left IIIC out while it had no source.
    expect(lichtman({ collapse: true, coronalFracture: true })).toBe('IIIC')
    expect(lichtman({ collapse: true, carpalCollapse: true, coronalFracture: true })).toBe('IIIC')
    expect(lichtman({ coronalFracture: true })).toBeUndefined()
    // LI-1: "Stage IV includes pancarpal arthritis, including radiocarpal arthritis."
    expect(lichtman({ collapse: true, carpalCollapse: true, arthritis: true })).toBe('IV')
  })

  test('undecided until the findings decide it', () => {
    expect(lichtman({})).toBeUndefined()
    // Collapse without the carpal-collapse answer could be IIIA or IIIB.
    expect(lichtman({ collapse: true })).toBeUndefined()
  })

  // LI-1, LI-4: stage I said only "normal radiographs", since the 1977 paper predates clinical
  // MRI. The review: "The original classification was later modified in 1993 ... with Stage I
  // including decreased T1 signal on MRI", so the MRI finding is back, credited to 1993.
  test('stage I: normal radiographs, decreased T1 signal on MRI', () => {
    expect(lichtmanSentence('I')).toBe('Kienböck disease, Lichtman stage I: normal lunate architecture and density on radiographs (a linear or compression fracture may show), with decreased T1 signal on MRI.')
  })

  test('report sentence for every stage', () => {
    for (const stage of lichtmanStages) expect(lichtmanSentence(stage)).toMatch(new RegExp(`^Kienböck disease, Lichtman stage ${stage}: .+\\.$`))
  })
})
