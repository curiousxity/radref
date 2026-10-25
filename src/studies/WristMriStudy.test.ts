import { describe, expect, test } from 'vitest'
import { herbertSentence } from '../logic/herbert'
import { lichtmanSentence } from '../logic/lichtman'
import { mayfield, mayfieldSentence } from '../logic/mayfield'
import { palmerSentence } from '../logic/palmer'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { WristMriStudyPage } from './WristMriStudy'

const study = studyOf(WristMriStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-wrist-mri-sources.md (W claims) or, for the four
 * shared classifications, 2026-10-23-wrist-calculators-sources.md (MF, HB, PA, LI claims).
 * The references are matched, but only the claims marked verified there were read in their
 * papers; when the rest are checked a case may have to change; say in that commit why the old
 * expectation was wrong.
 */

describe('wrist MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'scapholunate', 'lunotriquetral', 'perilunate', 'tfcc', 'extrinsic',
      'extensors', 'flexors', 'guyon', 'ganglia', 'variants', 'impression',
    ])
  })

  // The references are matched (each has a DOI), but claims not in an abstract are still
  // unchecked, so the note keeps saying so.
  test('is still marked as an unchecked draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    // 20 since the Lichtman and Mayfield reviews (Kennedy and Abrams 2019, Kennedy and Allan 2012) were added.
    expect(study.references).toHaveLength(20)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  history: 'pain',
  protocol: 'complete',
  effusion: 'none',
  marrow: 'none',
  scaphoid: 'none',
  'other-fracture': 'none',
  radius: 'none',
  lunate: 'normal',
  sl: 'intact',
  lt: 'intact',
  perilunate: 'none',
  tfcc: 'intact',
  'ulnar-variance': 'neutral',
  'extrinsic-dorsal': 'normal',
  'extrinsic-volar': 'normal',
  'first-compartment': 'normal',
  ecu: 'normal',
  'other-extensors': 'normal',
  flexors: 'normal',
  median: 'normal',
  'ulnar-nerve': 'normal',
  ganglion: 'none',
  synovitis: 'absent',
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous, TFCC or tendinous abnormality of the wrist.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('wrist MRI report: steps', () => {
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

describe('wrist MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('Scaphoid: no fracture')
    expect(text).toContain('TFCC: intact')
    expect(text).toContain('History: pain, no injury given')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Protocol', 'Scaphoid fracture', 'Lunate signal', 'Scapholunate ligament', 'Lunotriquetral ligament', 'Perilunate injury', 'TFCC', 'Ulnar variance', 'Median nerve', 'Ganglion']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('partial entry: a scapholunate tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { sl: 'complete', 'sl-parts': ['dorsal', 'membranous'] })
    expect(text).toContain('Scapholunate ligament: complete tear, dorsal, membranous (proximal) parts')
    expect(text).toContain('Impression: Complete tear of the scapholunate ligament.')
    expect(warnings).toContain('TFCC not stated')
    expect(warnings).not.toContain('Scapholunate ligament not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { sl: 'intact' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Soft-tissue mass, see above.' })).toBe('Findings as above.')
  })

  test('an abnormal study lists its findings in search-pattern order', () => {
    const values = { ...normal, effusion: 'moderate', lt: 'partial', 'first-compartment': 'dequervain', ganglion: 'dorsal', 'ganglion-text': 'from the scapholunate ligament, 6 mm' }
    expect(impressionOf(values)).toBe([
      'Moderate joint effusion.',
      'Partial tear of the lunotriquetral ligament.',
      'de Quervain tenosynovitis.',
      'Dorsal ganglion, from the scapholunate ligament, 6 mm.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('an incomplete protocol qualifies the impression as a limited study', () => {
    expect(impressionOf({ ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] })).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
  })

  test('pertinent negatives follow the findings', () => {
    expect(impressionOf({ ...normal, synovitis: 'present', 'impression-negatives': ['no-fracture', 'no-tfcc'] }))
      .toBe('Synovitis.\nNo fracture.\nNo TFCC lesion.')
  })
})

describe('wrist MRI report: variants get their own impression line', () => {
  // The author's decision (2026-10-23): variants are named in the impression, one line each.
  test('variants after a normal study keep the normal line and add their own', () => {
    expect(impressionOf({ ...normal, variants: ['lunate-ii', 'boss'] }))
      .toBe(`${NORMAL_IMPRESSION}\nType II lunate (hamate facet) (anatomical variant).\nCarpal boss or os styloideum (anatomical variant).`)
  })

  test('a variant follows the findings', () => {
    expect(impressionOf({ ...normal, lt: 'complete', variants: ['accessory-muscle'] }))
      .toBe('Complete tear of the lunotriquetral ligament.\nAccessory muscle (anatomical variant).')
  })

  test('ulnar variance is a descriptor, not a variant line', () => {
    expect(impressionOf({ ...normal, 'ulnar-variance': 'positive' })).toBe(NORMAL_IMPRESSION)
    expect(report(study, { ...normal, 'ulnar-variance': 'positive' }).text).toContain('Ulnar variance: positive')
  })
})

describe('wrist MRI report: hidden fields', () => {
  test('a Herbert type left behind when the scaphoid is cleared writes nothing', () => {
    const values = { ...normal, scaphoid: 'none', herbert: 'B2' }
    expect(report(study, values).text).not.toContain('Herbert')
    expect(chips(study, 'bones', values).Herbert).toBeUndefined()
  })

  test('a Palmer class left behind when the TFCC is intact writes nothing', () => {
    const values = { ...normal, tfcc: 'intact', palmer: '2D' }
    expect(report(study, values).text).not.toContain('Palmer')
    expect(report(study, values).warnings).toEqual([])
  })

  test('Mayfield answers left behind when no perilunate injury is entered write nothing', () => {
    const values = { ...normal, perilunate: 'none', capitolunate: 'yes', 'lunate-position': 'dislocated' }
    expect(chips(study, 'perilunate', values).Mayfield).toBeUndefined()
    expect(report(study, values).text).not.toContain('Mayfield')
    expect(report(study, values).warnings).toEqual([])
  })
})

describe('wrist MRI rules (unchecked)', () => {
  // W2-2 (HB-): the Herbert type from the shared logic.
  test('a scaphoid fracture gets its Herbert type and sentence', () => {
    expect(chips(study, 'bones', { scaphoid: 'present', herbert: 'B2' }).Herbert).toMatch(/^Type B2 \(/)
    expect(impressionOf({ ...normal, scaphoid: 'present', herbert: 'B2' })).toBe(herbertSentence('B2'))
    expect(impressionOf({ ...normal, scaphoid: 'present' })).toBe('Scaphoid fracture.')
  })

  // W2-3, W2-5 (LI-): diffuse lunate signal is the Kienböck pattern, staged by Lichtman.
  test('diffuse lunate signal gets its Lichtman stage', () => {
    expect(chips(study, 'bones', { lunate: 'diffuse', lichtman: 'I' }).Lichtman).toBe('Stage I')
    expect(impressionOf({ ...normal, lunate: 'diffuse', lichtman: 'IIIA' })).toBe(lichtmanSentence('IIIA'))
    expect(impressionOf({ ...normal, lunate: 'diffuse' })).toBe('Diffuse abnormal signal in the lunate, as in Kienböck disease.')
  })

  // W2-4: "focal abnormal signal intensity of the ulnar aspect of the lunate in 87% of wrists,
  // of the radial aspects of the triquetrum in 43%, and of the radial aspects of the ulnar head
  // in 10%" (Imaeda 1996, abstract); "positive ulnar variance in ulnar impaction syndrome"
  // (Cerezal 2002, abstract). The old impression said "proximal lunate", which Imaeda does not
  // say, so the wording now follows the paper.
  test('focal ulnar-side lunate signal against the ulnar variance', () => {
    const focal = { lunate: 'focal-ulnar' }
    expect(chips(study, 'bones', { ...focal, 'ulnar-variance': 'positive' })['Ulnar impaction']).toBe('Fits: focal ulnar-side lunate signal with positive ulnar variance')
    expect(chips(study, 'bones', focal)['Ulnar impaction']).toBe('Pattern of ulnar impaction: check the ulnar variance (step 6)')
    expect(chips(study, 'bones', { ...focal, 'ulnar-variance': 'neutral' })['Ulnar impaction']).toBeUndefined()
    expect(impressionOf({ ...normal, ...focal, 'ulnar-variance': 'positive' }))
      .toBe('Focal abnormal signal on the ulnar side of the lunate with positive ulnar variance, in keeping with ulnar impaction.')
    expect(report(study, { ...normal, ...focal, 'ulnar-variance': 'negative' }).warnings)
      .toEqual(['Focal ulnar-side lunate signal is entered, the pattern of ulnar impaction, which goes with positive ulnar variance, but the ulnar variance is entered as negative.'])
  })

  // W3-2: "The normal scapholunate angle is 30° to 60°; above 60° suggests DISI, below 30° VISI."
  test('scapholunate angle at 30° and 60°', () => {
    const angle = (degrees: string) => chips(study, 'scapholunate', { 'sl-angle': degrees })['Scapholunate angle']
    expect(angle('60')).toBe('Within 30–60°')
    expect(angle('61')).toBe('Above 60°: suggests DISI')
    expect(angle('30')).toBe('Within 30–60°')
    expect(angle('29')).toBe('Below 30°: suggests VISI')
    expect(angle('')).toBeUndefined()
    expect(impressionOf({ ...normal, 'sl-angle': '75' })).toBe('Scapholunate angle 75°, suggesting DISI.')
    expect(impressionOf({ ...normal, 'sl-angle': '45' })).toBe(NORMAL_IMPRESSION)
  })

  // W5-1 (MF-): the Mayfield stage, only once a perilunate injury is entered.
  test('a perilunate injury gets its Mayfield stage', () => {
    const stageII = { ...normal, perilunate: 'present', sl: 'complete', capitolunate: 'yes', 'lunate-position': 'in-place' }
    expect(chips(study, 'perilunate', stageII).Mayfield).toBe('Stage II')
    expect(impressionOf(stageII)).toBe(`Complete tear of the scapholunate ligament.\n${mayfieldSentence(mayfield({ scapholunate: true, capitolunate: true })!)}`)
    expect(report(study, stageII).warnings).toEqual([])
    // An isolated scapholunate tear with no perilunate injury is not called stage I.
    expect(chips(study, 'perilunate', { ...normal, sl: 'complete' }).Mayfield).toBeUndefined()
    expect(impressionOf({ ...normal, perilunate: 'present' })).toBe('Perilunate injury.')
  })

  // W5-2, MF-5: the stages are progressive; a scaphoid fracture takes the place of the
  // scapholunate tear in a greater-arc injury.
  test('a later Mayfield stage without the earlier injuries is flagged', () => {
    const stageIV = { ...normal, perilunate: 'present', sl: 'complete', capitolunate: 'yes', lt: 'complete', 'lunate-position': 'dislocated' }
    expect(chips(study, 'perilunate', stageIV).Mayfield).toBe('Stage IV')
    expect(report(study, stageIV).warnings).toEqual([])
    expect(report(study, { ...stageIV, sl: 'intact' }).warnings)
      .toEqual(['Mayfield stage IV is entered, but the injuries of the earlier stage (I) are not; the stages are progressive.'])
    expect(report(study, { ...stageIV, sl: 'intact', scaphoid: 'present', herbert: 'B4' }).warnings).toEqual([])
    expect(report(study, { ...stageIV, capitolunate: 'no', lt: 'intact' }).warnings)
      .toEqual(['Mayfield stage IV is entered, but the injuries of the earlier stages (II, III) are not; the stages are progressive.'])
  })

  // W6-1 (PA-): the Palmer class from the shared logic.
  test('a TFCC lesion gets its Palmer class and sentence', () => {
    expect(chips(study, 'tfcc', { tfcc: 'lesion', palmer: '1B' }).Palmer).toBe('Class 1B')
    expect(impressionOf({ ...normal, tfcc: 'lesion', palmer: '1B' })).toBe(palmerSentence('1B'))
    expect(impressionOf({ ...normal, tfcc: 'lesion' })).toBe('TFCC lesion.')
  })

  // W6-2: "Palmer 2D and 2E include perforation of the lunotriquetral ligament."
  test('Palmer 2D or 2E with an intact lunotriquetral ligament is flagged', () => {
    expect(report(study, { ...normal, tfcc: 'lesion', palmer: '2D' }).warnings)
      .toEqual(['Palmer 2D is entered, which includes lunotriquetral ligament perforation, but the lunotriquetral ligament is entered as intact.'])
    expect(report(study, { ...normal, tfcc: 'lesion', palmer: '2E', lt: 'complete' }).warnings).toEqual([])
    expect(report(study, { ...normal, tfcc: 'lesion', palmer: '2C' }).warnings).toEqual([])
  })
})

describe('wrist MRI report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, scaphoid: 'present', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: scaphoid fracture.')
    expect(report(study, { ...normal, sl: 'partial', 'impression-negatives': ['no-ligament'] }).warnings)
      .toContain('Impression says no intrinsic ligament tear, but these are entered: scapholunate partial tear.')
    expect(report(study, { ...normal, tfcc: 'lesion', 'impression-negatives': ['no-tfcc'] }).warnings)
      .toContain('Impression says no TFCC lesion, but these are entered: TFCC lesion.')
    expect(report(study, { ...normal, ecu: 'tear', 'impression-negatives': ['no-tendon'] }).warnings)
      .toContain('Impression says no tendon tear, but these are entered: ECU tendon tear.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-ligament', 'no-tfcc', 'no-tendon'] }).warnings).toEqual([])
  })
})

describe('wrist MRI report: output text', () => {
  const cases: Values[] = [
    {},
    normal,
    { ...normal, history: 'fall', marrow: 'present', 'marrow-site': 'scaphoid waist', scaphoid: 'present', herbert: 'B2', 'other-fracture': 'present', 'other-fracture-sites': ['hamate-hook'], radius: 'present', 'radius-text': 'undisplaced' },
    { ...normal, lunate: 'focal-ulnar', 'impaction-sites': ['triquetrum', 'ulnar-head'], 'ulnar-variance': 'positive', tfcc: 'lesion', palmer: '2C' },
    { ...normal, 'extrinsic-dorsal': 'abnormal', 'extrinsic-text': 'edema', intersection: 'present', ecu: 'tenosynovitis', 'ecu-position': 'subluxed', 'other-extensors': 'abnormal', median: 'abnormal', 'median-signs': ['swelling', 'signal'], 'ulnar-nerve': 'abnormal', ganglion: 'other', variants: ['bifid-median', 'median-artery'] },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('wrist MRI quiz', () => {
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
