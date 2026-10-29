import { describe, expect, test } from 'vitest'
import { classifyNeer, emptyNeerInput, isDisplaced } from './neer'
import type { LineStatus, NeerInput, NeerLine } from './neer'

/*
 * Neer classification (Neer, J Bone Joint Surg Am 1970). The paper is matched on PubMed but has
 * no abstract and is paywalled, so the rules are quoted from two reviews of the classification
 * (Kilcoyne et al., AJR 1990; Carofino and Leopold, Clin Orthop Relat Res 2013), listed as N1-N6
 * in docs/superpowers/research/2026-10-23-shoulder-mri-sources.md.
 */
function input(lines: Partial<Record<NeerLine, LineStatus>>, extra: Partial<NeerInput> = {}): NeerInput {
  return { ...emptyNeerInput, ...extra, lines: { ...emptyNeerInput.lines, ...lines } }
}

describe('Neer: displacement criterion', () => {
  // N2: "According to Neer, displacement of a fracture fragment by more than a centimeter or
  // angulation of more than 45° is considered significant" (Kilcoyne et al., AJR 1990).
  // A segment is displaced when it is "more than 1 cm" displaced or angulated
  // "more than 45 degrees".
  test.each([
    [1, 0, false],
    [1.01, 0, true],
    [0, 45, false],
    [0, 46, true],
    [1, 45, false],
    [undefined, undefined, false],
    [2, undefined, true],
    [undefined, 60, true],
  ])('%s cm and %s degrees: displaced %s', (cm, deg, expected) => {
    expect(isDisplaced(cm, deg)).toBe(expected)
  })
})

describe('Neer: parts', () => {
  test('nothing entered is no fracture', () => {
    expect(classifyNeer(emptyNeerInput).parts).toBe(0)
    expect(classifyNeer(emptyNeerInput).report).toBe('')
  })

  // N3: "a fracture with no fragments considered displaced is defined as a one-part fracture
  // regardless of the actual number of fracture lines or their location" (Carofino and Leopold 2013).
  test('undisplaced lines on every segment are one-part', () => {
    const result = classifyNeer(input({ anatomicalNeck: 'undisplaced', surgicalNeck: 'undisplaced', greaterTuberosity: 'undisplaced', lesserTuberosity: 'undisplaced' }))
    expect(result.parts).toBe(1)
    expect(result.label).toBe('One-part')
    expect(result.unusual).toBe(false)
  })

  // N4: two-part fractures are of the anatomical neck, surgical neck, greater tuberosity or lesser
  // tuberosity (Kilcoyne et al. 1990, Figs. 1-4; Carofino and Leopold 2013: one segment displaced).
  test.each([
    ['anatomicalNeck', 'Two-part (anatomical neck displaced)'],
    ['surgicalNeck', 'Two-part (surgical neck displaced)'],
    ['greaterTuberosity', 'Two-part (greater tuberosity displaced)'],
    ['lesserTuberosity', 'Two-part (lesser tuberosity displaced)'],
  ] as [NeerLine, string][])('%s displaced alone is %s', (line, label) => {
    const result = classifyNeer(input({ [line]: 'displaced' }))
    expect(result.parts).toBe(2)
    expect(result.label).toBe(label)
  })

  // N4: three-part, "one tuberosity is displaced and the surgical neck fracture is displaced"
  // (Carofino and Leopold 2013).
  test.each([
    ['greaterTuberosity', 'Three-part (surgical neck and greater tuberosity displaced)'],
    ['lesserTuberosity', 'Three-part (surgical neck and lesser tuberosity displaced)'],
  ] as [NeerLine, string][])('surgical neck and %s is three-part', (tuberosity, label) => {
    const result = classifyNeer(input({ surgicalNeck: 'displaced', [tuberosity]: 'displaced' }))
    expect(result.parts).toBe(3)
    expect(result.label).toBe(label)
    expect(result.unusual).toBe(false)
  })

  // N4: four-part, "All four segments ... meet criteria for displacement" (Carofino and Leopold 2013).
  test('both tuberosities and the neck is four-part', () => {
    const result = classifyNeer(input({ surgicalNeck: 'displaced', greaterTuberosity: 'displaced', lesserTuberosity: 'displaced' }))
    expect(result.parts).toBe(4)
    expect(result.label).toBe('Four-part (articular segment and both tuberosities displaced)')
    expect(classifyNeer(input({ anatomicalNeck: 'displaced', surgicalNeck: 'displaced', greaterTuberosity: 'displaced', lesserTuberosity: 'displaced' })).parts).toBe(4)
  })

  test('an undisplaced line alongside a displaced one does not add a part', () => {
    expect(classifyNeer(input({ surgicalNeck: 'displaced', greaterTuberosity: 'undisplaced' })).parts).toBe(2)
  })

  // N6: the author's decision (2026-10-23). The earlier draft counted parts for these and
  // flagged them; the author ruled that a combination Neer did not name gets no part count.
  test('a combination outside the named patterns gets no part count, only its displaced segments', () => {
    const result = classifyNeer(input({ greaterTuberosity: 'displaced', lesserTuberosity: 'displaced' }))
    expect(result.parts).toBeUndefined()
    expect(result.unusual).toBe(true)
    expect(result.label).toBe('Not a named Neer pattern (greater tuberosity and lesser tuberosity displaced)')
    expect(result.description).toContain('so no part count is given')
    expect(result.report).toBe('Proximal humerus fracture, with displaced greater tuberosity and lesser tuberosity; not one of Neer\'s named patterns. Fracture lines: greater tuberosity (displaced) and lesser tuberosity (displaced).')
    expect(result.report).not.toMatch(/part/)
  })
})

describe('Neer: dislocation and articular surface', () => {
  // N5: fracture-dislocations, and articular surface injuries in "two varieties, head-splitting
  // fractures and impaction fractures", are separate groups (Carofino and Leopold 2013).
  test('a fracture-dislocation is named with its parts', () => {
    const result = classifyNeer(input({ greaterTuberosity: 'displaced' }, { dislocation: 'anterior' }))
    expect(result.label).toBe('Two-part (greater tuberosity displaced), anterior fracture-dislocation')
    expect(result.report).toBe('Proximal humerus fracture, Neer two-part anterior fracture-dislocation. Fracture lines: greater tuberosity (displaced).')
  })

  test('a head-splitting fracture is named', () => {
    expect(classifyNeer(input({}, { articular: 'head-split' })).label).toBe('One-part, head-splitting fracture')
    expect(classifyNeer(input({ surgicalNeck: 'undisplaced' }, { dislocation: 'posterior', articular: 'impression' })).report)
      .toBe('Proximal humerus fracture, Neer one-part posterior fracture-dislocation with impression fracture of the articular surface. Fracture lines: surgical neck.')
  })
})

describe('Neer: report text', () => {
  test('lists the fracture lines and marks the displaced ones', () => {
    expect(classifyNeer(input({ surgicalNeck: 'displaced', greaterTuberosity: 'displaced', lesserTuberosity: 'undisplaced' })).report)
      .toBe('Proximal humerus fracture, Neer three-part. Fracture lines: surgical neck (displaced), greater tuberosity (displaced) and lesser tuberosity.')
  })
})
