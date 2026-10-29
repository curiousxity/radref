import { describe, expect, test } from 'vitest'
import { ltSentence } from '../logic/letournel'
import { ybSentence } from '../logic/youngburgess'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { PelvisCtStudyPage } from './PelvisCtStudy'

const study = studyOf(PelvisCtStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-pelvis-ct-sources.md (P claims) or, for Young-Burgess
 * and Letournel, 2026-10-23-pelvis-calculators-sources.md (YB and LT claims). The references
 * are matched, but only the claims marked verified there were read in their papers; when the
 * rest are checked a case may have to change; say in that commit why the old expectation was
 * wrong.
 */

describe('pelvis CT lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'ring', 'sacrum', 'acetabulum', 'hips', 'soft-tissues', 'impression'])
  })

  // The references are matched (each has a DOI), but claims not in an abstract are still
  // unchecked, so the note keeps saying so.
  test('is still marked as an unchecked draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    // 15 since the Young-Burgess and Denis reviews (Alton and Gee 2014, Rizkalla 2019) and Halawi
    // 2015, read in full in place of Khurana for the ring breaking in more than one place, were added.
    expect(study.references).toHaveLength(15)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
  })
})

/** A complete normal study after a high-energy injury. */
const normal: Values = {
  history: 'high',
  protocol: 'complete',
  ring: 'none',
  sacrum: 'none',
  acet: 'none',
  hip: 'none',
  extravasation: 'no',
  hematoma: 'none',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('pelvis CT report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items are one status field per structure', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual(Object.keys(normal).sort())
  })
})

describe('pelvis CT report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe('No acute fracture or dislocation of the pelvis or hips.')
    expect(text).toContain('Pelvic ring: intact')
    expect(text).toContain('Acetabula: no fracture')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Protocol', 'Pelvic ring disruption', 'Sacral fracture', 'Acetabular fracture', 'Proximal femur', 'Active arterial extravasation', 'Pelvic hematoma']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('a high-energy injury: bleeding first, then the ring, sacrum and acetabulum', () => {
    const values = {
      ...normal,
      extravasation: 'yes', 'extravasation-text': 'right superior gluteal artery',
      ring: 'present', 'ring-type': 'APC III', diastasis: '45',
      sacrum: 'traumatic', 'sacrum-side': 'Right', 'sacrum-zone': '2',
      acet: 'present', 'acet-side': 'Left', 'acet-type': 'TPW', 'acet-head': 'subluxed', 'acet-features': ['fragments'],
      hematoma: 'large',
    }
    expect(impressionOf(values)).toBe([
      'Active arterial extravasation: right superior gluteal artery.',
      `${ybSentence('APC III').slice(0, -1)}; symphyseal diastasis 45 mm.`,
      'Right sacral fracture, Denis zone 2.',
      `${ltSentence('TPW', false, 'Left').slice(0, -1)}; femoral head subluxed, intra-articular fragments.`,
      'Large pelvic hematoma.',
    ].join('\n'))
  })

  test('a low-energy fall: hip fracture and an insufficiency fracture', () => {
    const values = { ...normal, history: 'low', hip: 'neck', 'hip-side': 'Left', 'hip-text': 'displaced', sacrum: 'insufficiency', 'sacrum-side': 'Both', 'sacrum-zone': '1', 'sacrum-transverse': 'yes', extravasation: 'unenhanced' }
    expect(impressionOf(values)).toBe('Bilateral sacral insufficiency fracture, Denis zone 1, with a horizontal component through the sacral bodies.\nLeft femoral neck fracture, displaced.')
  })

  test('an injury with no type yet still gets a line', () => {
    expect(impressionOf({ ...normal, ring: 'present', 'ring-text': 'left rami fractures' })).toBe('Pelvic ring injury: left rami fractures.')
    expect(impressionOf({ ...normal, acet: 'present', 'acet-side': 'Right' })).toBe('Right acetabular fracture.')
  })

  // LT-8: the extra posterior wall fragment only beside a T-shaped, hemitransverse or both-column fracture.
  test('an extra posterior wall fragment', () => {
    expect(impressionOf({ ...normal, acet: 'present', 'acet-type': 'BC', 'acet-wall': 'yes' })).toBe(ltSentence('BC', true))
    expect(impressionOf({ ...normal, acet: 'present', 'acet-type': 'T', 'acet-wall': 'yes' })).toBe(ltSentence('T'))
  })

  test('hidden answers write nothing', () => {
    const text = report(study, { ...normal, 'ring-type': 'VS', diastasis: '40', 'acet-type': 'BC', 'sacrum-zone': '3' }).text
    expect(text).not.toMatch(/VS|40 mm|both-column|zone 3/)
  })
})

describe('pelvis CT rules (unchecked)', () => {
  // YB-8: stability as usually taught.
  test('Young-Burgess chip', () => {
    expect(chips(study, 'ring', { ring: 'present', 'ring-type': 'LC I' })['Young-Burgess']).toBe('LC I: usually stable')
    expect(chips(study, 'ring', { ring: 'present', 'ring-type': 'VS' })['Young-Burgess']).toBe('VS: usually rotationally and vertically unstable')
  })

  // YB-6: "A symphyseal diastasis over 2.5 cm usually means APC II or worse."
  test('diastasis at 2.5 cm', () => {
    expect(chips(study, 'ring', { ring: 'present', diastasis: '25' }).Symphysis).toBe('Within 2.5 cm')
    expect(chips(study, 'ring', { ring: 'present', diastasis: '26' }).Symphysis).toBe('Over 2.5 cm: usually APC II or worse')
    expect(report(study, { ...normal, ring: 'present', 'ring-type': 'APC I', diastasis: '30' }).warnings)
      .toContain('Symphyseal diastasis 30 mm is over 2.5 cm, which usually means APC II or worse, but APC I is entered: look again at the front of the sacroiliac joints.')
    expect(report(study, { ...normal, ring: 'present', 'ring-type': 'APC I', diastasis: '20' }).warnings).toEqual([])
  })

  // P2-2: "A fracture of the L5 transverse process is a marker of vertical instability."
  test('L5 transverse process fracture', () => {
    expect(chips(study, 'ring', { ring: 'present', l5: 'yes' })['L5 transverse process']).toBe('Fracture: a marker of vertical instability')
    expect(report(study, { ...normal, ring: 'present', 'ring-type': 'LC II', l5: 'yes' }).warnings)
      .toContain('An L5 transverse process fracture marks vertical instability, but LC II is usually vertically stable: look again for vertical displacement.')
    expect(report(study, { ...normal, ring: 'present', 'ring-type': 'VS', l5: 'yes' }).warnings).toEqual([])
  })

  // P3-1: "Neurological deficit in about 6% in zone 1, 28% in zone 2 and 57% in zone 3."
  test('Denis zones', () => {
    const zone = (z: string) => chips(study, 'sacrum', { sacrum: 'traumatic', 'sacrum-zone': z }).Denis
    expect(zone('1')).toBe("Zone 1: neurological deficit in about 6% in Denis's series")
    expect(zone('2')).toBe("Zone 2: neurological deficit in about 28% in Denis's series")
    expect(zone('3')).toBe("Zone 3: neurological deficit in about 57% in Denis's series")
  })

  // P3-2: the U or H shape after injury. P3-3: "There may also be a horizontal component to the
  // fracture through the sacral bodies" (Lyders). The insufficiency chip said "H-shaped", but in
  // Lyders the H is the bone-scan Honda sign, not a CT shape.
  test('H or U shape', () => {
    expect(chips(study, 'sacrum', { sacrum: 'traumatic', 'sacrum-transverse': 'yes' }).Pattern).toBe('U- or H-shaped: the spine is separated from the pelvis')
    expect(chips(study, 'sacrum', { sacrum: 'insufficiency', 'sacrum-transverse': 'yes' }).Pattern).toBe('Insufficiency fracture with a horizontal component through the sacral bodies')
  })

  // LT-1 to LT-3 via the shared logic.
  test('Letournel chip', () => {
    expect(chips(study, 'acetabulum', { acet: 'present', 'acet-type': 'ACPHT' }).Letournel).toBe('Anterior column or wall with posterior hemitransverse (associated)')
    expect(chips(study, 'acetabulum', { acet: 'present', 'acet-type': 'PW' }).Letournel).toBe('Posterior wall (elementary)')
  })

  // P5-1: "for patients with ongoing clinical concern about hip fracture despite normal CT
  // findings, MRI should be performed" (Kellock 2019, abstract). Replaces Rehman 2016, which
  // concluded the opposite (CT as the first-line test), so the old chip claimed more than it said.
  test('occult hip fracture chip after pain or a low-energy fall', () => {
    expect(chips(study, 'hips', { history: 'low', hip: 'none' })['Occult hip fracture']).toBe('If concern continues despite a normal CT, MRI should be performed')
    expect(chips(study, 'hips', { history: 'pain', hip: 'none' })['Occult hip fracture']).toBeDefined()
    expect(chips(study, 'hips', { history: 'high', hip: 'none' })['Occult hip fracture']).toBeUndefined()
    expect(chips(study, 'hips', { history: 'low', hip: 'neck' })['Occult hip fracture']).toBeUndefined()
  })
})

describe('pelvis CT report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, hip: 'trochanter', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: proximal femoral fracture.')
    expect(report(study, { ...normal, extravasation: 'yes', 'impression-negatives': ['no-bleeding'] }).warnings)
      .toContain('Impression says no active bleeding, but active arterial extravasation is entered.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-bleeding'] }).warnings).toEqual([])
    expect(report(study, { ...normal, hip: 'dislocation', 'impression-negatives': ['no-fracture'] }).warnings).toEqual([])
  })

  const cases: Values[] = [
    {},
    normal,
    { ...normal, protocol: 'incomplete', 'protocol-missing': ['soft'], ring: 'present', sacrum: 'traumatic', acet: 'present', hip: 'head', bladder: 'injury' },
    { ...normal, extravasation: 'yes', acet: 'present', 'acet-type': 'TS', 'acet-wall': 'yes', 'acet-gap': '3', other: 'Bowel injury.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('pelvis CT quiz', () => {
  test('has 8–12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const question of study.quiz) {
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0)
      expect(question.answer, question.id).toBeLessThan(question.options.length)
    }
    expect(new Set(study.quiz.map((q) => q.id)).size).toBe(study.quiz.length)
  })
})
