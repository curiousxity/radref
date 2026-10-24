import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { ElbowMriStudyPage } from './ElbowMriStudy'

const study = studyOf(ElbowMriStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-elbow-mri-sources.md by its ID. The references are
 * matched, but only the claims marked verified there were read in their papers; when the rest
 * are checked a case may have to change; say in that commit why the old expectation was wrong.
 */

describe('elbow MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'ucl', 'lateral-ligaments', 'flexor', 'extensor', 'biceps', 'triceps-brachialis',
      'nerves', 'bursae', 'variants', 'impression',
    ])
  })

  // The references are matched (each has a DOI but Johnston's), but claims not in an abstract
  // are still unchecked, so the note keeps saying so. Johnston (Ulster Med J 1962) has no DOI on
  // PubMed or Crossref; the paper is in PMC only (PMC2384652).
  test('is still marked as an unchecked draft, with a DOI on every reference but Johnston 1962', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft: every reference has been matched on PubMed and Crossref/)
    expect(study.references).toHaveLength(18)
    for (const ref of study.references) {
      if (ref.citation.startsWith('Johnston GW.')) expect(ref.doi, ref.citation).toBeUndefined()
      else expect(ref.doi, ref.citation).toMatch(/^10\./)
    }
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  history: 'pain',
  protocol: 'complete',
  effusion: 'none',
  marrow: 'none',
  'radial-head': 'none',
  coronoid: 'none',
  olecranon: 'none',
  fracture: 'none',
  capitellum: 'normal',
  ucl: 'intact',
  lucl: 'intact',
  rcl: 'intact',
  annular: 'normal',
  flexor: 'normal',
  extensor: 'normal',
  biceps: 'normal',
  triceps: 'normal',
  brachialis: 'normal',
  'ulnar-nerve': 'normal',
  'radial-nerve': 'normal',
  'median-nerve': 'normal',
  'olecranon-bursa': 'absent',
  'loose-bodies': 'absent',
  synovitis: 'absent',
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous, tendinous or neural abnormality of the elbow.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('elbow MRI report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items are one status field per structure, plus the Mason answers for a radial head fracture', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual([...Object.keys(normal), 'radial-head-pattern', 'radial-head-dislocation'].sort())
  })
})

describe('elbow MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('History: pain only')
    expect(text).toContain('LUCL: intact')
    expect(text).toContain('Radial head: no fracture')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Protocol', 'Joint effusion', 'Radial head fracture', 'Coronoid fracture', 'Capitellum', 'UCL (anterior bundle)', 'LUCL', 'Common extensor origin', 'Distal biceps tendon', 'Ulnar nerve', 'Synovitis']) {
      expect(warnings).toContain(`${label} not stated`)
    }
    // The Mason answers are only asked once a radial head fracture is entered.
    expect(warnings).not.toContain('Radial head fracture pattern not stated')
  })

  test('partial entry: a distal biceps tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { biceps: 'complete', 'biceps-retraction': '4' })
    expect(text).toContain('Distal biceps tendon: complete tear, retracted 4 cm')
    expect(text).toContain('Impression: Distal biceps tendon: complete tear, retracted 4 cm.')
    expect(warnings).toContain('Triceps tendon not stated')
    expect(warnings).not.toContain('Distal biceps tendon not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { ucl: 'intact' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Lipoma in the antecubital fossa.' })).toBe('Findings as above.')
  })

  test('an abnormal study lists its findings in search-pattern order', () => {
    const values = { ...normal, effusion: 'moderate', ucl: 'complete', lucl: 'partial', extensor: 'tendinosis', 'ulnar-nerve': 'abnormal' }
    expect(impressionOf(values)).toBe([
      'Moderate joint effusion.',
      'Complete tear of the UCL.',
      'Partial tear of the LUCL.',
      'Common extensor origin: tendinosis.',
      'Ulnar nerve abnormal.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('an incomplete protocol qualifies the impression as a limited study', () => {
    expect(impressionOf({ ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] })).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
  })

  test('pertinent negatives follow the findings', () => {
    expect(impressionOf({ ...normal, 'olecranon-bursa': 'present', 'impression-negatives': ['no-fracture', 'no-tendon-tear'] }))
      .toBe('Olecranon bursitis.\nNo fracture.\nNo tendon tear.')
  })
})

describe('elbow MRI report: variants get their own impression line', () => {
  // The author's decision (2026-10-23): variants are named in the impression, one line each.
  test('variants after a normal study keep the normal line and add their own', () => {
    expect(impressionOf({ ...normal, variants: ['supracondylar', 'anconeus', 'supratrochleare'] })).toBe([
      NORMAL_IMPRESSION,
      'Supracondylar process (anatomical variant).',
      'Anconeus epitrochlearis (anatomical variant).',
      'Os supratrochleare dorsale (anatomical variant).',
    ].join('\n'))
  })

  test('a variant follows the findings', () => {
    expect(impressionOf({ ...normal, 'ulnar-nerve': 'abnormal', variants: ['anconeus'] }))
      .toBe('Ulnar nerve abnormal.\nAnconeus epitrochlearis (anatomical variant).')
  })
})

describe('elbow MRI report: hidden fields', () => {
  test('Mason answers left behind when the radial head fracture is cleared write nothing', () => {
    const values = { ...normal, 'radial-head': 'none', 'radial-head-pattern': 'comminuted', 'radial-head-dislocation': 'yes', 'radial-head-displacement': '3' }
    expect(report(study, values).text).not.toContain('Mason')
    expect(chips(study, 'bones', values).Mason).toBeUndefined()
    expect(chips(study, 'bones', values)['Broberg-Morrey']).toBeUndefined()
    expect(impressionOf(values)).toBe(NORMAL_IMPRESSION)
  })

  test('a UCL partial-tear type left behind when the UCL is intact writes nothing', () => {
    const values = { ...normal, ucl: 'intact', 'ucl-partial-type': 'undersurface' }
    expect(report(study, values).text).not.toContain('undersurface')
    expect(chips(study, 'ucl', values)['Undersurface partial tear']).toBeUndefined()
  })

  test('a biceps retraction left behind when the tear is partial writes nothing', () => {
    expect(report(study, { ...normal, biceps: 'partial', 'biceps-retraction': '5' }).text).not.toContain('retracted')
  })
})

describe('elbow MRI rules (unchecked)', () => {
  // MA-1 to MA-4, through the shared logic in src/logic/mason.ts.
  test('a radial head fracture gets its Mason type', () => {
    const fracture = { 'radial-head': 'present', 'radial-head-pattern': 'displaced', 'radial-head-dislocation': 'no' }
    expect(chips(study, 'bones', fracture).Mason).toBe('Type II')
    expect(chips(study, 'bones', { ...fracture, 'radial-head-dislocation': 'yes' }).Mason).toBe('Type IV (Johnston)')
    // Not decided until the dislocation question is answered.
    expect(chips(study, 'bones', { ...fracture, 'radial-head-dislocation': '' }).Mason).toBeUndefined()
    expect(impressionOf({ ...normal, ...fracture })).toBe('Radial head fracture, Mason type II: marginal sector fracture with displacement.')
  })

  // MA-5: "Type I: displacement of less than 2 mm." MA-6: "Type II: displacement of 2 mm or
  // more, involving 30% or more of the head."
  test('Broberg-Morrey at the 2 mm and 30% boundaries', () => {
    const bm = (displacement: string, percent: string) => chips(study, 'bones', { 'radial-head': 'present', 'radial-head-displacement': displacement, 'radial-head-percent': percent })['Broberg-Morrey']
    expect(bm('1.5', '')).toBe('Type I')
    expect(bm('2', '30')).toBe('Type II')
    expect(bm('2', '25')).toBe('Not decided by the 2 mm and 30% thresholds')
    expect(bm('', '40')).toBeUndefined()
  })

  // E2-2: "type I avulsion of the tip; type II a fragment of 50% or less; type III more than 50%."
  test('coronoid fractures get their Regan-Morrey type', () => {
    const regan = (coronoid: string) => chips(study, 'bones', { coronoid })['Coronoid (Regan-Morrey)']
    expect(regan('tip')).toBe('Type I')
    expect(regan('minor')).toBe('Type II')
    expect(regan('major')).toBe('Type III')
    expect(regan('none')).toBeUndefined()
    expect(impressionOf({ ...normal, coronoid: 'major' })).toBe('Coronoid fracture, Regan-Morrey type III: fragment of more than 50%.')
  })

  // E2-3: "posterior dislocation of the elbow with fractures of the radial head and coronoid".
  test('the terrible triad needs a dislocation and both fractures', () => {
    const triad = { history: 'dislocation', 'radial-head': 'present', 'radial-head-pattern': 'comminuted', 'radial-head-dislocation': 'yes', coronoid: 'tip' }
    expect(chips(study, 'bones', triad)['Terrible triad']).toBe('Dislocation with radial head and coronoid fractures')
    expect(chips(study, 'bones', { ...triad, coronoid: 'none' })['Terrible triad']).toBeUndefined()
    expect(chips(study, 'bones', { ...triad, history: 'pain', 'radial-head-dislocation': 'no' })['Terrible triad']).toBeUndefined()
    expect(impressionOf({ ...normal, ...triad })).toBe([
      'Terrible triad: elbow dislocation with fractures of the radial head and coronoid.',
      'Radial head fracture with dislocation of the elbow, Mason type IV (Johnston modification).',
      'Coronoid fracture, Regan-Morrey type I: tip avulsion.',
    ].join('\n'))
  })

  // E1-1: "Dislocation is the final of three sequential stages of elbow instability resulting
  // from posterolateral rotation, with soft-tissue disruption progressing from lateral to
  // medial" (O'Driscoll 1992, abstract). The rule is unchanged.
  test('after a dislocation, the Horii circle chip and the lateral-before-medial check', () => {
    expect(chips(study, 'technique', { history: 'dislocation' })['After a dislocation']).toBe('Read the ligaments lateral to medial (Horii circle)')
    expect(chips(study, 'technique', { history: 'pain' })['After a dislocation']).toBeUndefined()
    const values = { ...normal, history: 'dislocation', ucl: 'complete' }
    expect(report(study, values).warnings).toContain('The history is a dislocation and the UCL is torn, but the LUCL is entered as intact; after a dislocation the lateral side fails before the medial side.')
    expect(report(study, { ...values, lucl: 'complete' }).warnings).toEqual([])
    // Without a dislocation history a medial tear alone is not flagged, e.g. in a thrower.
    expect(report(study, { ...normal, history: 'throwing', ucl: 'complete' }).warnings).toEqual([])
  })

  // MA-4: a fracture with dislocation is type IV.
  test('a dislocation history with a radial head fracture entered as not dislocated is flagged', () => {
    const values = { ...normal, history: 'dislocation', 'radial-head': 'present', 'radial-head-pattern': 'undisplaced', 'radial-head-dislocation': 'no' }
    expect(report(study, values).warnings).toContain('The history is a dislocation, but the radial head fracture is entered without one; if they happened together it is Mason type IV (Johnston).')
  })

  // E2-4: Panner's disease is the whole capitellum under about 10; osteochondritis dissecans
  // is focal, in adolescents.
  test('Panner against osteochondritis dissecans', () => {
    expect(chips(study, 'bones', { capitellum: 'panner' })["Panner's disease"]).toBe('Typically under 10 years; the whole capitellum')
    expect(chips(study, 'bones', { capitellum: 'ocd' })['Osteochondritis dissecans']).toBe('Typically adolescents; a focal lesion')
  })

  // E2-5: "the pseudodefect of the distal humerus at the junction of the capitellum and lateral
  // epicondyle, which may simulate an osteochondral lesion" (Rosenberg 1994, abstract). The old
  // case put it at the "posterior capitellum", a word the paper does not use, so the site option
  // and the warning now name the junction instead.
  test('an osteochondral lesion at the capitellum-lateral epicondyle junction is flagged as a possible pseudodefect', () => {
    const values = { ...normal, capitellum: 'ocd', 'ocd-site': 'junction' }
    expect(report(study, values).warnings).toEqual(['An osteochondral lesion is entered at the junction of the capitellum and the lateral epicondyle, where the normal pseudodefect sits; check that it is not the pseudodefect.'])
    expect(report(study, { ...values, 'ocd-site': 'posterior' }).warnings).toEqual([])
    expect(report(study, { ...values, 'ocd-site': 'anterior' }).warnings).toEqual([])
  })

  // E3-2: "an undersurface tear of the deep capsular layer of the anterior bundle" with "a
  // detachment of the undersurface of the ligament at the ulna or the humerus" (Timmerman and
  // Andrews 1994, abstract); the "T-sign" was "seen on the computed tomography arthrogram"
  // (Timmerman et al. 1994, abstract). The old chip placed it at the sublime tubercle and called
  // it the T-sign on MRI; neither paper says the first, and the sign is a CT arthrography one.
  test('the undersurface UCL tear', () => {
    const values = { ...normal, ucl: 'partial', 'ucl-partial-type': 'undersurface' }
    expect(chips(study, 'ucl', values)['Undersurface partial tear']).toBe('Deep layer detached from bone, superficial layer intact')
    expect(chips(study, 'ucl', { ...values, 'ucl-partial-type': 'other' })['Undersurface partial tear']).toBeUndefined()
    expect(impressionOf(values)).toBe('Partial tear of the UCL, undersurface (deep layer).')
  })

  // E4-1: LUCL insufficiency underlies posterolateral rotatory instability.
  test('a torn LUCL', () => {
    expect(chips(study, 'lateral-ligaments', { lucl: 'partial' })['LUCL tear']).toBe('The lesion behind posterolateral rotatory instability')
    expect(chips(study, 'lateral-ligaments', { lucl: 'edema' })['LUCL tear']).toBeUndefined()
  })

  // E6-2: LUCL abnormalities are found with lateral epicondylitis.
  test('an abnormal extensor origin sends you back to the LUCL', () => {
    expect(chips(study, 'extensor', { extensor: 'tendinosis' })['Extensor origin abnormal']).toBe('Recheck the LUCL')
    expect(chips(study, 'extensor', { extensor: 'normal' })['Extensor origin abnormal']).toBeUndefined()
  })
})

describe('elbow MRI report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, lucl: 'complete', 'impression-negatives': ['no-ligament'] }).warnings)
      .toContain('Impression says no ligament injury, but these are entered: LUCL complete tear.')
    expect(report(study, { ...normal, coronoid: 'tip', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: coronoid fracture.')
    expect(report(study, { ...normal, biceps: 'partial', 'impression-negatives': ['no-tendon-tear'] }).warnings)
      .toContain('Impression says no tendon tear, but these are entered: distal biceps partial tear.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-ligament', 'no-tendon-tear'] }).warnings).toEqual([])
  })
})

describe('elbow MRI quiz', () => {
  test('has 8–12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const question of study.quiz) {
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0)
      expect(question.answer, question.id).toBeLessThan(question.options.length)
    }
  })
})
