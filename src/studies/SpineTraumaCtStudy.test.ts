import { describe, expect, test } from 'vitest'
import { aoSentence } from '../logic/aospine'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { SpineTraumaCtStudyPage } from './SpineTraumaCtStudy'

const study = studyOf(SpineTraumaCtStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md (T claims) or, for AO
 * Spine, 2026-10-23-spine-calculators-sources.md (AO claims). None has been checked against
 * its paper yet (PubMed was unreachable), so when the check is done a case may have to
 * change; say in that commit why the old expectation was wrong.
 */

describe('spine trauma CT lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'ccj', 'subaxial', 'thoracolumbar', 'vessels', 'collapse', 'canal', 'impression'])
  })

  // Pins the unchecked state so it cannot be lost by accident.
  test('is marked as an unchecked draft, with no DOI on any reference yet', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    expect(study.references).toHaveLength(10)
    for (const ref of study.references) expect(ref.doi, ref.citation).toBeUndefined()
  })
})

/** A complete normal whole-spine study. */
const normal: Values = {
  history: 'high',
  coverage: 'whole',
  protocol: 'complete',
  ankylosis: 'none',
  condyle: 'none',
  c1: 'none',
  dens: 'none',
  c2: 'none',
  cx: 'none',
  tl: 'none',
  foramen: 'no',
  collapse: 'none',
  canal: 'normal',
}

const cervicalOnly = ['condyle', 'c1', 'dens', 'c2', 'cx', 'foramen']

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('spine trauma CT report: steps and coverage', () => {
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

  test('coverage decides which regions are asked for', () => {
    const tlOnly = Object.fromEntries(Object.entries(normal).filter(([key]) => !cervicalOnly.includes(key)))
    const lumbar = { ...tlOnly, coverage: 'thoracolumbar' }
    expect(report(study, lumbar).warnings).toEqual([])
    expect(impressionOf(lumbar)).toBe('No acute fracture or malalignment of the thoracolumbar spine.')
    const neck = { ...normal, coverage: 'cervical', tl: '' }
    expect(report(study, neck).warnings).toEqual([])
    expect(impressionOf(neck)).toBe('No acute fracture or malalignment of the cervical spine.')
    // Cervical answers left behind after switching to thoracolumbar write nothing.
    expect(report(study, { ...lumbar, c1: 'present', bdi: '12' }).text).not.toMatch(/C1|Basion/)
  })
})

describe('spine trauma CT report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe('No acute fracture or malalignment of the spine.')
    expect(text).toContain('Subaxial cervical spine: no injury')
    expect(text).toContain('Thoracolumbar spine: no injury')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Coverage', 'Protocol', 'Ankylosed spine', 'Vertebral collapse without major trauma', 'Spinal canal']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('an injured spine lists its findings from the top down', () => {
    const values = {
      ...normal,
      dens: 'II',
      cx: 'present', 'cx-level': 'C5–C6', 'cx-type': 'B2', 'cx-body': 'A1', 'cx-facet-right': 'F2', 'cx-facet-left': 'F2',
      tl: 'present', 'tl-level': 'L1', 'tl-type': 'A3',
      canal: 'narrowed', 'canal-text': '30% at L1',
    }
    expect(impressionOf(values)).toBe([
      "Odontoid fracture, Anderson and D'Alonzo type II.",
      aoSentence({ region: 'subaxial', morphology: { type: 'B2', body: 'A1' }, facet: 'F2 BL', modifiers: [] }, 'C5–C6'),
      'Meets the expanded Denver screening criteria for blunt cerebrovascular injury (C1–C3 fracture).',
      aoSentence({ region: 'thoracolumbar', morphology: { type: 'A3' }, modifiers: [] }, 'L1'),
      'Spinal canal narrowed: 30% at L1.',
    ].join('\n'))
  })

  test('an injury with no type yet still gets a line', () => {
    expect(impressionOf({ ...normal, tl: 'present', 'tl-level': 'T12' })).toBe('Thoracolumbar spine injury at T12.')
  })

  test('a body type left behind on an A injury is dropped', () => {
    expect(impressionOf({ ...normal, tl: 'present', 'tl-type': 'A1', 'tl-body': 'A4' })).toBe(aoSentence({ region: 'thoracolumbar', morphology: { type: 'A1' }, modifiers: [] }))
  })
})

describe('spine trauma CT rules (unchecked)', () => {
  // T2-1: "On CT in adults the basion–dens interval was at most 8.5 mm and the atlantodental
  // interval at most 2 mm."
  test('basion–dens at 8.5 mm and atlantodental at 2 mm', () => {
    expect(chips(study, 'ccj', { coverage: 'cervical', bdi: '8.5' })['Basion–dens']).toBe('Within 8.5 mm')
    expect(chips(study, 'ccj', { coverage: 'cervical', bdi: '8.6' })['Basion–dens']).toBe('Above 8.5 mm')
    expect(chips(study, 'ccj', { coverage: 'cervical', adi: '2' }).Atlantodental).toBe('Within 2 mm')
    expect(chips(study, 'ccj', { coverage: 'cervical', adi: '2.1' }).Atlantodental).toBe('Above 2 mm')
    expect(impressionOf({ ...normal, bdi: '10', adi: '3' })).toBe('Basion–dens interval 10 mm, above the 8.5 mm upper limit on CT.\nAtlantodental interval 3 mm, above the 2 mm upper limit in adults on CT.')
    expect(impressionOf({ ...normal, bdi: '8', adi: '1' })).toBe('No acute fracture or malalignment of the spine.')
  })

  // T2-2: "A combined overhang of more than 6.9 mm suggested transverse ligament rupture."
  // T2-3: the rule can miss ruptures that MRI shows.
  test('C1 lateral mass overhang at 6.9 mm', () => {
    const overhang = (mm: string) => chips(study, 'ccj', { coverage: 'cervical', c1: 'present', 'c1-overhang': mm })['Transverse ligament']
    expect(overhang('7')).toBe('Overhang above 6.9 mm: rupture likely')
    expect(overhang('6.9')).toBe('Overhang within 6.9 mm: the rule can miss a rupture that MRI shows')
    expect(impressionOf({ ...normal, c1: 'present', 'c1-overhang': '8' }).split('\n')[0]).toBe('C1 fracture, with combined lateral mass overhang of 8 mm suggesting transverse ligament rupture.')
  })

  // T5-1: expanded Denver criteria: subluxation, foramen transversarium, C1–C3 fractures.
  test('vertebral artery screening criteria', () => {
    expect(chips(study, 'vessels', { ...normal, foramen: 'yes' })['Vertebral arteries']).toBe('Screening criterion met: fracture into a foramen transversarium')
    expect(chips(study, 'vessels', { ...normal, c1: 'present' })['Vertebral arteries']).toBe('Screening criterion met: C1–C3 fracture')
    expect(chips(study, 'vessels', { ...normal, cx: 'present', 'cx-facet-left': 'F4' })['Vertebral arteries']).toBe('Screening criterion met: subluxation')
    expect(chips(study, 'vessels', { ...normal, cx: 'present', 'cx-type': 'C' })['Vertebral arteries']).toBe('Screening criterion met: subluxation')
    expect(chips(study, 'vessels', { ...normal, cx: 'present', 'cx-type': 'A1' })['Vertebral arteries']).toBeUndefined()
    expect(chips(study, 'vessels', normal)['Vertebral arteries']).toBeUndefined()
  })

  // AO-1 to AO-7 via the shared logic, and AO-10: the ankylosed spine modifier by region.
  test('AO Spine chips and the ankylosed spine modifier', () => {
    expect(chips(study, 'subaxial', { ...normal, cx: 'present', 'cx-type': 'C', 'cx-body': 'A4', 'cx-facet-right': 'F4', 'cx-facet-left': 'F4' })['AO Spine']).toBe('C (A4); F4 BL')
    expect(chips(study, 'subaxial', { ...normal, ankylosis: 'as', cx: 'present', 'cx-type': 'B3' })['Ankylosed spine']).toBe('Modifier M3; fractures here often follow minor trauma')
    expect(chips(study, 'thoracolumbar', { ...normal, ankylosis: 'dish', tl: 'present', 'tl-type': 'B3' })['Ankylosed spine']).toBe('Modifier M2; fractures here often follow minor trauma')
    expect(impressionOf({ ...normal, ankylosis: 'dish', tl: 'present', 'tl-level': 'T10', 'tl-type': 'B3' }))
      .toBe(aoSentence({ region: 'thoracolumbar', morphology: { type: 'B3' }, modifiers: ['M2'] }, 'T10'))
  })

  // T6-1: "Grade 1 about 20–25%, grade 2 about 25–40%, grade 3 more than 40%."
  test('Genant grade at 20, 25 and 40%', () => {
    const genant = (pct: string) => chips(study, 'collapse', { collapse: 'present', 'height-loss': pct }).Genant
    expect(genant('19')).toBe('Under 20%: below grade 1')
    expect(genant('20')).toBe('Grade 1')
    expect(genant('25')).toBe('Grade 1')
    expect(genant('26')).toBe('Grade 2')
    expect(genant('40')).toBe('Grade 2')
    expect(genant('41')).toBe('Grade 3')
  })

  // T6-2: features of benign and malignant collapse.
  test('benign against malignant collapse', () => {
    const collapse = { ...normal, history: 'pain', collapse: 'present', 'collapse-level': 'T12', 'height-loss': '30' }
    expect(chips(study, 'collapse', { ...collapse, 'collapse-features': ['retropulsion'] }).Collapse).toBe('Features of benign (osteoporotic) collapse')
    expect(chips(study, 'collapse', { ...collapse, 'collapse-features': ['retropulsion', 'pedicle'] }).Collapse).toBe('Features of malignant collapse')
    expect(impressionOf({ ...collapse, 'collapse-features': ['epidural'] })).toBe('Vertebral collapse of T12, Genant grade 2 (30% height loss), with features of malignant collapse.')
    expect(impressionOf({ ...collapse, 'height-loss': '15' })).toBe('Vertebral collapse of T12.')
  })
})

describe('spine trauma CT report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, dens: 'III', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: odontoid fracture.')
    expect(report(study, { ...normal, cx: 'present', 'cx-facet-right': 'F4', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: F4 facet.')
    expect(report(study, { ...normal, adi: '4', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: atlantodental interval above 2 mm.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-malalignment'] }).warnings).toEqual([])
  })

  const cases: Values[] = [
    {},
    normal,
    { ...normal, protocol: 'incomplete', 'protocol-missing': ['soft'], condyle: 'present', c1: 'present', c2: 'present', 'c2-text': 'pars', prevertebral: 'swollen' },
    { ...normal, cx: 'present', tl: 'present', collapse: 'present', 'collapse-features': ['lines'], canal: 'narrowed', other: 'Rib fractures.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('spine trauma CT quiz', () => {
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
