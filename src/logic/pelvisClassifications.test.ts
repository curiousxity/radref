import { describe, expect, test } from 'vitest'
import { letournel, ltAssociated, ltDescriptions, ltElementary, ltSentence, ltTypes } from './letournel'
import { diastasisOver, ybDescriptions, ybGroup, ybSentence, ybStability, ybTypes, youngBurgess } from './youngburgess'

/*
 * The two pelvic classifications. Each case quotes its claim from
 * docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md by ID. The papers are
 * matched on PubMed; the claims marked verified there were read in an abstract or in a review
 * read in full (Alton and Gee, Durkee, Halawi, Leone, Gänsslen). Every Young-Burgess claim is now
 * stated in one of them, with the author's decisions of 2026-10-29 (33 to 38) on the wording.
 * Still unread: parts of the Letournel posterior column, anterior wall and anterior column
 * wording (LT-2).
 */

describe('Young-Burgess', () => {
  // YB-1: "LC I sacral compression and transverse rami fractures on the side of impact; LC II
  // adds an iliac wing (crescent) fracture; LC III adds an open book of the other side."
  // LC II was the crescent fracture only. Alton and Gee 2014: "The resulting posterior pelvic
  // injury in LC II patterns may be a sacral fracture, sacroiliac ligament and joint disruption,
  // or crescent fracture-dislocation of the ilium", so a sacroiliac disruption is LC II too.
  test('lateral compression grades', () => {
    expect(youngBurgess({ lateral: 'sacral' })).toBe('LC I')
    expect(youngBurgess({ lateral: 'crescent' })).toBe('LC II')
    expect(youngBurgess({ lateral: 'sacroiliac' })).toBe('LC II')
    expect(youngBurgess({ lateral: 'sacral', otherSideOpen: true })).toBe('LC III')
    expect(youngBurgess({ lateral: 'crescent', otherSideOpen: true })).toBe('LC III')
  })

  // YB-2: "APC I slight widening, ligaments intact; APC II anterior SI widening with the
  // anterior SI, sacrospinous and sacrotuberous ligaments torn; APC III complete SI disruption."
  test('AP compression grades by the sacroiliac joint', () => {
    expect(youngBurgess({ symphysisWidened: true })).toBe('APC I')
    expect(youngBurgess({ symphysisWidened: true, sacroiliac: 'intact' })).toBe('APC I')
    expect(youngBurgess({ symphysisWidened: true, sacroiliac: 'anterior' })).toBe('APC II')
    expect(youngBurgess({ sacroiliac: 'anterior' })).toBe('APC II')
    expect(youngBurgess({ symphysisWidened: true, sacroiliac: 'complete' })).toBe('APC III')
  })

  // YB-3, YB-4: vertical displacement is vertical shear, or a combined mechanism with lateral
  // compression. CMI said "most often lateral compression with vertical shear", then (Alton and
  // Gee) "most often lateral compression with AP compression or vertical shear". Decision 38
  // separates the definition from the frequency: "Complex injury patterns are a combination of any
  // three primary patterns (APC, LC, or VS)" (Alton and Gee); Leone's commonest pairing is on the page.
  test('vertical displacement wins', () => {
    expect(youngBurgess({ vertical: true })).toBe('VS')
    expect(youngBurgess({ vertical: true, symphysisWidened: true, sacroiliac: 'complete' })).toBe('VS')
    expect(youngBurgess({ vertical: true, lateral: 'sacral' })).toBe('CMI')
    expect(ybDescriptions.CMI).toBe('combined mechanism: features of more than one primary pattern (lateral compression, AP compression, vertical shear)')
  })

  // Decision 34: "VS injuries result from an axially loaded force delivered over one or both
  // hemipelves" (Alton and Gee); "Vertical displacement of one or both hemipelvices" (Halawi). It
  // said "of a hemipelvis".
  test('vertical shear can be one or both sides', () => {
    expect(ybDescriptions.VS).toContain('one or both hemipelves')
  })

  // Decisions 33 and 35: 2.5 cm stays the conventional APC I threshold, and APC III needs no
  // vertical displacement ("APCIII can be differentiated from VS injury by the absence of vertical
  // displacement of the hemipelvis", Halawi) yet stays vertically unstable (Leone, Table 1:
  // "Multidirectional instability").
  test('APC I threshold and APC III', () => {
    expect(ybDescriptions['APC I']).toBe('symphyseal diastasis, conventionally less than 2.5 cm, with no posterior instability')
    expect(ybDescriptions['APC III']).toContain('vertical displacement need not be present')
    expect(ybStability['APC III']).toBe('rotationally and vertically unstable, even without vertical displacement')
  })

  // Decision 36: LC III was "rotationally unstable, vertically stable". Leone: "Lateral compression
  // grade 3 injuries have a multidirectional instability"; "the degree of involvement of the
  // posterior tension band, affect the stability of the pelvic ring".
  test('LC III is unstable, not vertically stable', () => {
    expect(ybStability['LC III']).toBe('unstable, to a degree and in a direction set by the posterior ring injury')
    expect(ybStability['LC III']).not.toMatch(/vertically stable/)
  })

  test('no disruption entered is no type', () => {
    expect(youngBurgess({})).toBeUndefined()
    expect(youngBurgess({ sacroiliac: 'intact' })).toBeUndefined()
  })

  // YB-6: "In the original description by Young et al., a 2.5-cm diastasis at the symphysis pubis
  // was the criterion to differentiate APC I from APC II injuries" (Alton and Gee 2014). Exactly
  // 2.5 cm is not over.
  test('diastasis at 2.5 cm', () => {
    expect(diastasisOver(25)).toBe(false)
    expect(diastasisOver(26)).toBe(true)
  })

  // YB-8: the usual stability implication by type, and the sentence.
  test('every type has a description, a group and a stability', () => {
    for (const type of ybTypes) {
      expect(ybDescriptions[type]).toBeTruthy()
      expect(ybStability[type]).toBeTruthy()
    }
    expect(ybGroup('LC II')).toBe('lateral compression')
    expect(ybGroup('APC III')).toBe('AP compression')
    expect(ybSentence('APC II')).toBe('Pelvic ring injury, Young-Burgess APC II (AP compression): widened anterior sacroiliac joint: anterior sacroiliac, sacrospinous and sacrotuberous ligaments torn, posterior sacroiliac ligaments intact; usually rotationally unstable, vertically stable.')
  })
})

describe('Letournel (parts of LT-2 unread)', () => {
  // LT-1: five elementary and five associated types.
  test('ten types, five of each', () => {
    expect(ltElementary).toHaveLength(5)
    expect(ltAssociated).toHaveLength(5)
    expect(new Set(ltTypes).size).toBe(10)
    for (const type of ltTypes) expect(ltDescriptions[type]).toBeTruthy()
  })

  // LT-4: the column lines; LT-2 and LT-3: the types they lead to.
  test('one column line', () => {
    expect(letournel({ lines: 'neither', posteriorWall: true })).toBe('PW')
    expect(letournel({ lines: 'posterior' })).toBe('PC')
    // A broken ilioischial line with a wall fragment was always PCPW. Durkee: in an isolated
    // posterior wall fracture "disruption of the ilioischial line may or may not be present as an
    // extension of the comminuted posterior wall component", so the column is asked about.
    expect(letournel({ lines: 'posterior', posteriorWall: true })).toBeUndefined()
    expect(letournel({ lines: 'posterior', posteriorWall: true, posteriorColumn: true })).toBe('PCPW')
    expect(letournel({ lines: 'posterior', posteriorWall: true, posteriorColumn: false })).toBe('PW')
    expect(letournel({ lines: 'anterior', anteriorPart: 'wall' })).toBe('AW')
    expect(letournel({ lines: 'anterior', anteriorPart: 'column' })).toBe('AC')
  })

  // LT-6: with both lines broken, an intact obturator ring means a transverse fracture.
  test('both lines, obturator ring intact', () => {
    expect(letournel({ lines: 'both', obturatorBroken: false })).toBe('T')
    expect(letournel({ lines: 'both', obturatorBroken: false, posteriorWall: true })).toBe('TPW')
  })

  // LT-5, LT-7: no joint surface on the intact ilium is both-column; otherwise T-shaped or ACPHT.
  // Decision 39: a fracture into the iliac wing never decides both-column (Gänsslen: iliac fossa
  // involvement "is usually seen in AC, ACPHT and ABC fractures"; "ABC definition: ... no articular
  // fragment connected to the SI-joint"), so the logic has no iliac wing input.
  test('both lines, obturator ring broken', () => {
    expect(letournel({ lines: 'both', obturatorBroken: true, articularOnIlium: false })).toBe('BC')
    expect(letournel({ lines: 'both', obturatorBroken: true, articularOnIlium: true, pattern: 'stem' })).toBe('TS')
    expect(letournel({ lines: 'both', obturatorBroken: true, articularOnIlium: true, pattern: 'hemitransverse' })).toBe('ACPHT')
  })

  test('unanswered questions give no type yet', () => {
    expect(letournel({})).toBeUndefined()
    expect(letournel({ lines: 'anterior' })).toBeUndefined()
    expect(letournel({ lines: 'both' })).toBeUndefined()
    expect(letournel({ lines: 'both', obturatorBroken: true })).toBeUndefined()
    expect(letournel({ lines: 'both', obturatorBroken: true, articularOnIlium: true })).toBeUndefined()
  })

  // LT-9: an anterior column or wall fracture with a posterior wall fragment is not a named type.
  test('a combination Letournel did not name has no type', () => {
    expect(letournel({ lines: 'anterior', anteriorPart: 'column', posteriorWall: true })).toBeUndefined()
  })

  // LT-8: a posterior wall fragment beside an associated type is added to the sentence.
  test('the sentence', () => {
    expect(ltSentence('T')).toBe('Acetabular fracture, Letournel transverse (elementary): one fracture line through both columns, separating an upper iliac part from a lower ischiopubic part, obturator ring intact.')
    expect(ltSentence('BC', true, 'Right')).toBe('Right acetabular fracture, Letournel both-column (associated): both columns separated from each other and from the ilium, so no joint surface stays attached to the intact ilium (spur sign), with a posterior wall fragment as well.')
    expect(ltSentence('PCPW', true)).not.toContain('as well')
  })
})
