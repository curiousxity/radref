import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { DiabeticFootMriStudyPage } from './DiabeticFootMriStudy'

const study = studyOf(DiabeticFootMriStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-diabetic-foot-mri-sources.md (D claims). The
 * references are matched, and the claims marked verified there were read in an abstract or in
 * an open review cited beside the paper; when the rest are checked a case may have to change;
 * say in that commit why the old expectation was wrong.
 */

describe('diabetic foot MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'soft-tissue', 'bone', 'joints', 'charcot', 'impression'])
  })

  // The references are matched (each has a DOI), but one claim is still unchecked (septic
  // arthritis with an effusion), so the note keeps saying so. The ghost sign and the inactive
  // foot follow Rosskopf 2019 (the author's decisions, 2026-10-29).
  test('is still marked as an unchecked draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    // 9 since two open reviews (Rosskopf 2019, Weaver 2022) were added (2026-10-29).
    expect(study.references).toHaveLength(9)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  history: 'hot-foot',
  protocol: 'complete',
  ulcer: 'none',
  sinus: 'none',
  abscess: 'none',
  gas: 'none',
  marrow: 'normal',
  joint: 'none',
  charcot: 'none',
}

/** An ulcer with confluent T1 change in the bone under it. */
const infected: Values = {
  ...normal,
  history: 'ulcer',
  ulcer: 'present',
  'ulcer-site': 'plantar to the first metatarsal head',
  marrow: 'abnormal',
  'bone-site': 'the first metatarsal head',
  t1: 'confluent',
  contiguous: 'yes',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('diabetic foot MRI report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items: one status per structure, plus T1 and contiguity once the marrow is abnormal', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual([...Object.keys(normal), 't1', 'contiguous'].sort())
  })
})

describe('diabetic foot MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe('No osteomyelitis, abscess or neuroarthropathy.')
    expect(text).toContain('Marrow: normal')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Protocol', 'Ulcer', 'Sinus tract', 'Abscess', 'Marrow signal', 'Neuroarthropathy (Charcot)']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('abnormal marrow asks for the T1 signal and the contiguity', () => {
    const { warnings } = report(study, { ...normal, marrow: 'abnormal' })
    expect(warnings).toContain('T1 marrow signal not stated')
    expect(warnings).toContain('Bone next to the ulcer or sinus tract not stated')
    expect(report(study, normal).warnings).not.toContain('T1 marrow signal not stated')
  })

  test('an ulcer with normal bone says so, once the form is complete', () => {
    expect(impressionOf({ ...normal, ulcer: 'present' })).toBe('Ulcer without osteomyelitis or abscess.')
    expect(report(study, { ulcer: 'present' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Flexor tenosynovitis.' })).toBe('Findings as above.')
  })

  test('an infected foot lists its findings in order', () => {
    const values = { ...infected, cortex: 'interrupted', sinus: 'present', abscess: 'present', 'abscess-site': 'plantar, 2 cm', joint: 'present', 'joint-site': 'the first MTP joint' }
    expect(impressionOf(values)).toBe([
      'Osteomyelitis of the first metatarsal head: confluent low T1 marrow signal next to the ulcer.',
      'Abscess: plantar, 2 cm.',
      'Sinus tract.',
      'Effusion in the first MTP joint next to the abnormal bone: septic arthritis is possible.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('an incomplete protocol qualifies the impression', () => {
    expect(impressionOf({ ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] })).toBe('Limited study (protocol incomplete).\nNo osteomyelitis, abscess or neuroarthropathy.')
  })
})

describe('diabetic foot MRI rules (unchecked)', () => {
  // D3: "Confluent decreased T1 marrow signal intensity in a medullary distribution was 95%
  // sensitive in the prediction of osteomyelitis" and "None of the cases with a subcortical
  // distribution or hazy reticulated pattern of abnormal signal intensity had positive results
  // for osteomyelitis" (Johnson 2009, abstract). The chips are unchanged; the lesson no longer
  // adds "even with high fluid-sensitive signal", which the paper (T1 only) does not state.
  test('the T1 marrow pattern', () => {
    expect(chips(study, 'bone', infected).T1).toBe('Confluent low signal: the pattern of osteomyelitis')
    expect(chips(study, 'bone', { ...infected, t1: 'hazy' }).T1).toBe('Not confluent: does not establish osteomyelitis')
    expect(chips(study, 'bone', { ...infected, t1: 'normal' }).T1).toBe('Not confluent: does not establish osteomyelitis')
    expect(impressionOf({ ...infected, t1: 'hazy' })).toBe('Marrow edema in the first metatarsal head without confluent T1 change: osteomyelitis is not established.')
  })

  // D2: "Osteomyelitis almost always spreads from an adjacent ulcer or sinus tract."
  test('confluent T1 change with no ulcer or sinus tract next to it is not called osteomyelitis', () => {
    const away = { ...infected, contiguous: 'no' }
    expect(chips(study, 'bone', away).Spread).toBe('No ulcer or sinus tract next to it: think again, often of neuroarthropathy')
    expect(impressionOf(away)).toBe('Confluent low T1 marrow signal in the first metatarsal head, with no ulcer or sinus tract next to it.')
    expect(chips(study, 'bone', infected).Spread).toBeUndefined()
  })

  test('contiguity with no ulcer or sinus tract entered is flagged', () => {
    expect(report(study, { ...infected, ulcer: 'none' }).warnings)
      .toEqual(['The bone is entered as next to an ulcer or sinus tract, but neither is entered in step 2.'])
    expect(impressionOf({ ...infected, ulcer: 'none', sinus: 'present' })).toMatch(/^Osteomyelitis of the first metatarsal head: confluent low T1 marrow signal next to the sinus tract\./)
  })

  // D1: "An adjacent ulcer, a sinus tract, cortical interruption and an abscess are secondary signs."
  test('secondary signs are listed', () => {
    expect(chips(study, 'bone', { ...infected, cortex: 'interrupted', abscess: 'present' })['Secondary signs']).toBe('Next to the ulcer, cortex interrupted, abscess')
    expect(chips(study, 'bone', { ...infected, contiguous: 'no' })['Secondary signs']).toBeUndefined()
  })

  // D5: "neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal
  // joints" (Donovan 2010, abstract). The old chip called the tarsometatarsal and Chopart joints
  // "the usual Charcot distribution" (midfoot, away from the pressure points), which no listed
  // abstract states; it now fires on the tarsometatarsal or metatarsophalangeal joints.
  // D7: active disease shows marrow edema before radiographs change.
  // D4: the ghost sign raises suspicion of osteomyelitis within the neuropathic bone (Rosskopf 2019).
  test('Charcot distribution, activity and the ghost sign', () => {
    const charcot = { ...normal, charcot: 'present', 'charcot-sites': ['tmt', 'chopart'], 'charcot-activity': 'active' }
    expect(chips(study, 'charcot', charcot).Distribution).toBe('Tarsometatarsal or metatarsophalangeal: the commonest Charcot sites')
    expect(chips(study, 'charcot', { ...charcot, 'charcot-sites': ['mtp'] }).Distribution).toBe('Tarsometatarsal or metatarsophalangeal: the commonest Charcot sites')
    expect(chips(study, 'charcot', { ...charcot, 'charcot-sites': ['chopart'] }).Distribution).toBeUndefined()
    expect(chips(study, 'charcot', { ...charcot, 'charcot-sites': ['ip'] }).Distribution).toBeUndefined()
    expect(chips(study, 'charcot', charcot).Activity).toBe('Active: MRI shows this before radiographs change')
    expect(chips(study, 'charcot', { ...charcot, ghost: 'present' })['Ghost sign']).toBe('Raises suspicion of superimposed osteomyelitis')
    expect(impressionOf({ ...charcot, 'charcot-deformity': 'collapse', ghost: 'present' })).toBe([
      'Active neuropathic (Charcot) arthropathy of the tarsometatarsal (Lisfranc), naviculocuneiform and Chopart joints.',
      'Collapse of the arch (rocker-bottom deformity).',
      'Ghost sign, raising suspicion of superimposed osteomyelitis in the neuropathic bone.',
    ].join('\n'))
  })

  // D6: infection in devitalised tissue may not enhance.
  test('non-enhancing tissue is asked only after contrast', () => {
    expect(impressionOf({ ...normal, contrast: 'given', devitalised: 'present' })).toBe('Non-enhancing (devitalised) tissue, in which osteomyelitis and abscess may not enhance.')
    expect(impressionOf({ ...normal, contrast: 'not-given', devitalised: 'present' })).toBe('No osteomyelitis, abscess or neuroarthropathy.')
  })
})

describe('diabetic foot MRI report: hidden fields and contradictions', () => {
  test('bone answers left behind when the marrow is normal write nothing', () => {
    const values = { ...normal, marrow: 'normal', t1: 'confluent', contiguous: 'yes' }
    expect(chips(study, 'bone', values)).toEqual({})
    expect(impressionOf(values)).toBe('No osteomyelitis, abscess or neuroarthropathy.')
  })

  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...infected, 'impression-negatives': ['no-osteomyelitis'] }).warnings)
      .toContain('Impression says no osteomyelitis, but confluent low T1 signal next to the ulcer or sinus tract is entered.')
    expect(report(study, { ...normal, abscess: 'present', 'impression-negatives': ['no-abscess'] }).warnings)
      .toContain('Impression says no abscess, but an abscess is entered.')
  })

  const cases: Values[] = [
    {},
    normal,
    infected,
    { ...infected, contrast: 'given', devitalised: 'present', gas: 'present', charcot: 'present', ghost: 'present', 'charcot-deformity': 'other', joint: 'present' },
    { ...normal, marrow: 'abnormal', charcot: 'present' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('diabetic foot MRI quiz', () => {
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
