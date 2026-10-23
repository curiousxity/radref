import { describe, expect, test } from 'vitest'
import { hawkinsSentence } from '../logic/hawkins'
import { myersonSentence } from '../logic/myerson'
import { sandersSentence } from '../logic/sanders'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { FootMriStudyPage } from './FootMriStudy'

const study = studyOf(FootMriStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-foot-mri-sources.md (F claims) or, for the three
 * shared classifications, 2026-10-23-foot-calculators-sources.md (HK, SA, MY claims). None
 * has been checked against its paper yet (PubMed was unreachable), so when the check is done
 * a case may have to change; say in that commit why the old expectation was wrong.
 */

describe('foot MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'hindfoot', 'lisfranc', 'metatarsals', 'hallux', 'lesser-mtp', 'interspaces',
      'fascia', 'tendons', 'variants', 'impression',
    ])
  })

  // Pins the unchecked state so it cannot be lost by accident.
  test('is marked as an unchecked draft, with no DOI on any reference yet', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    expect(study.references).toHaveLength(14)
    for (const ref of study.references) expect(ref.doi, ref.citation).toBeUndefined()
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  history: 'pain',
  protocol: 'complete',
  effusion: 'none',
  marrow: 'none',
  talus: 'none',
  calcaneus: 'none',
  navicular: 'normal',
  coalition: 'none',
  'lisfranc-dorsal': 'intact',
  'lisfranc-interosseous': 'intact',
  'lisfranc-plantar': 'intact',
  tmt: 'aligned',
  stress: 'none',
  'fifth-base': 'none',
  freiberg: 'none',
  'hallux-plate': 'intact',
  sesamoids: 'normal',
  plate: 'intact',
  neuroma: 'none',
  bursa: 'none',
  'plantar-fascia': 'normal',
  tp: 'normal',
  pl: 'normal',
  ta: 'normal',
  'other-tendons': 'normal',
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous or tendinous abnormality of the foot.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('foot MRI report: steps', () => {
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

describe('foot MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('Talus: no fracture')
    expect(text).toContain('Plantar Lisfranc ligament: intact')
    expect(text).toContain('History: pain, no injury given')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Protocol', 'Talar fracture', 'Calcaneal fracture', 'Plantar Lisfranc ligament', 'Tarsometatarsal alignment', 'Metatarsal stress injury', 'Sesamoids', 'Lesser MTP plantar plate', 'Morton neuroma', 'Plantar fascia']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('partial entry: a plate tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { plate: 'complete', 'plate-joint': '2' })
    expect(text).toContain('Lesser MTP plantar plate: complete tear, second MTP joint')
    expect(text).toContain('Impression: Complete tear of the plantar plate of the second MTP joint.')
    expect(warnings).toContain('Morton neuroma not stated')
    expect(warnings).not.toContain('Lesser MTP plantar plate not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { talus: 'none' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Soft-tissue mass, see above.' })).toBe('Findings as above.')
  })

  test('an abnormal study lists its findings in search-pattern order', () => {
    const values = {
      ...normal,
      history: 'twist',
      effusion: 'moderate',
      'effusion-site': 'second tarsometatarsal joint',
      'lisfranc-interosseous': 'sprain',
      stress: 'fracture',
      'stress-sites': ['2', '3'],
      sesamoids: 'edema',
      'sesamoid-side': 'medial',
      tp: 'tendinosis',
    }
    expect(impressionOf(values)).toBe([
      'Moderate joint effusion, second tarsometatarsal joint.',
      'Sprain of the interosseous Lisfranc ligament.',
      'Metatarsal stress fracture: second metatarsal, third metatarsal.',
      'Marrow edema in the medial (tibial) sesamoid, without fracture (sesamoiditis).',
      'Tibialis posterior at the navicular: tendinosis.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('an incomplete protocol qualifies the impression as a limited study', () => {
    expect(impressionOf({ ...normal, protocol: 'incomplete', 'protocol-missing': ['planes'] })).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
  })

  test('pertinent negatives follow the findings', () => {
    expect(impressionOf({ ...normal, 'plantar-fascia': 'fasciitis', 'impression-negatives': ['no-fracture', 'no-lisfranc'] }))
      .toBe('Features of plantar fasciitis.\nNo fracture.\nNo Lisfranc injury.')
  })

  test('report wording for the forefoot and coalition lines', () => {
    expect(impressionOf({ ...normal, coalition: 'talocalcaneal', 'coalition-kind': 'non-osseous' })).toBe('Talocalcaneal (middle facet) coalition, non-osseous.')
    expect(impressionOf({ ...normal, coalition: 'other' })).toBe('Tarsal coalition.')
    expect(impressionOf({ ...normal, 'fifth-base': 'zone-2' })).toBe('Fifth metatarsal base fracture, zone 2: Jones fracture.')
    expect(impressionOf({ ...normal, freiberg: 'second' })).toBe('Osteonecrosis of the second metatarsal head (Freiberg infraction).')
    expect(impressionOf({ ...normal, 'hallux-plate': 'tear' })).toBe('Tear of the first MTP plantar plate (turf toe).')
    expect(impressionOf({ ...normal, sesamoids: 'fracture' })).toBe('Fracture of a sesamoid.')
  })
})

describe('foot MRI report: variants get their own impression line', () => {
  // The author's decision (2026-10-23): variants are named in the impression, one line each.
  test('variants after a normal study keep the normal line and add their own', () => {
    expect(impressionOf({ ...normal, variants: ['os-trigonum', 'bipartite-sesamoid'] }))
      .toBe(`${NORMAL_IMPRESSION}\nOs trigonum (anatomical variant).\nBipartite sesamoid (anatomical variant).`)
  })

  test('the accessory navicular and os peroneum, entered with their tendons, get variant lines too', () => {
    expect(impressionOf({ ...normal, 'accessory-navicular': 'present', 'os-peroneum': 'present', variants: ['os-vesalianum'] }))
      .toBe(`${NORMAL_IMPRESSION}\nAccessory navicular (anatomical variant).\nOs peroneum (anatomical variant).\nOs vesalianum (anatomical variant).`)
    expect(impressionOf({ ...normal, 'accessory-navicular': 'none', 'os-peroneum': 'none' })).toBe(NORMAL_IMPRESSION)
  })

  // F9-2: marrow edema in the accessory navicular in symptomatic patients.
  // F9-1: the painful os peroneum syndrome spectrum.
  test('an abnormal accessory navicular or os peroneum also gets a finding line', () => {
    expect(impressionOf({ ...normal, 'accessory-navicular': 'edema' }))
      .toBe('Marrow edema in the accessory navicular, which suggests it is the source of pain.\nAccessory navicular (anatomical variant).')
    expect(impressionOf({ ...normal, 'os-peroneum': 'abnormal' }))
      .toBe('Os peroneum fractured, separated or edematous, in the spectrum of painful os peroneum syndrome.\nOs peroneum (anatomical variant).')
  })
})

describe('foot MRI report: hidden fields', () => {
  test('a Hawkins type left behind when the talus is cleared writes nothing', () => {
    const values = { ...normal, talus: 'none', hawkins: 'III' }
    expect(report(study, values).text).not.toContain('Hawkins')
    expect(chips(study, 'hindfoot', values).Hawkins).toBeUndefined()
  })

  test('a Sanders type left behind when the fracture is extra-articular writes nothing', () => {
    const values = { ...normal, calcaneus: 'extra', sanders: 'IIB' }
    expect(report(study, values).text).not.toContain('Sanders')
    expect(chips(study, 'hindfoot', values).Sanders).toBeUndefined()
  })

  test('a Myerson type left behind when the joints are aligned writes nothing', () => {
    const values = { ...normal, tmt: 'aligned', myerson: 'C2' }
    expect(report(study, values).text).not.toContain('Myerson')
    expect(chips(study, 'lisfranc', values).Myerson).toBeUndefined()
  })

  test('neuroma answers left behind when the neuroma is cleared write nothing', () => {
    const values = { ...normal, neuroma: 'none', 'neuroma-space': '3', 'neuroma-size': '6', plate: 'partial', 'plate-joint': '3' }
    expect(chips(study, 'interspaces', values)['Neuroma size']).toBeUndefined()
    expect(report(study, values).warnings).toEqual([])
  })
})

describe('foot MRI rules (unchecked)', () => {
  // F2-1 (HK-): the Hawkins type from the shared logic.
  test('a talar neck fracture gets its Hawkins type and sentence', () => {
    expect(chips(study, 'hindfoot', { talus: 'neck', hawkins: 'II' }).Hawkins).toBe('Type II')
    expect(impressionOf({ ...normal, talus: 'neck', hawkins: 'II' })).toBe(hawkinsSentence('II'))
    expect(impressionOf({ ...normal, talus: 'neck' })).toBe('Talar neck fracture.')
  })

  // F2-2 (SA-): the Sanders type from the shared logic.
  test('an intra-articular calcaneal fracture gets its Sanders type and sentence', () => {
    expect(chips(study, 'hindfoot', { calcaneus: 'intra', sanders: 'IIIAB' }).Sanders).toBe('Type IIIAB')
    expect(impressionOf({ ...normal, calcaneus: 'intra', sanders: 'IIIAB' })).toBe(sandersSentence('IIIAB'))
    expect(impressionOf({ ...normal, calcaneus: 'intra' })).toBe('Intra-articular calcaneal fracture.')
  })

  // F3-3: "Disruption of the plantar ligament on MRI predicted midfoot instability at surgery."
  test('a torn plantar Lisfranc ligament is flagged; a sprain is not', () => {
    expect(chips(study, 'lisfranc', { 'lisfranc-plantar': 'tear' })['Plantar ligament']).toBe('Torn: predicted midfoot instability at surgery')
    expect(chips(study, 'lisfranc', { 'lisfranc-plantar': 'sprain' })['Plantar ligament']).toBeUndefined()
    expect(impressionOf({ ...normal, 'lisfranc-plantar': 'tear' })).toBe('Tear of the plantar Lisfranc ligament, a finding that predicted midfoot instability at surgery.')
    expect(impressionOf({ ...normal, 'lisfranc-dorsal': 'tear' })).toBe('Tear of the dorsal Lisfranc ligament.')
  })

  // F3-4 (MY-): the Myerson type from the shared logic.
  test('a fracture-dislocation gets its Myerson type and sentence', () => {
    expect(chips(study, 'lisfranc', { tmt: 'dislocated', myerson: 'B2' }).Myerson).toBe('Type B2 (partial incongruity)')
    expect(impressionOf({ ...normal, tmt: 'dislocated', myerson: 'B2' })).toBe(myersonSentence('B2'))
    expect(impressionOf({ ...normal, tmt: 'dislocated' })).toBe('Tarsometatarsal (Lisfranc) fracture-dislocation.')
    expect(impressionOf({ ...normal, tmt: 'widened' })).toBe('Widening between the medial cuneiform and the second metatarsal base.')
  })

  // F7-2, F7-4: "Neuromas of 5 mm or more in transverse diameter were the ones that went with symptoms."
  test('neuroma size at 5 mm', () => {
    const size = (mm: string) => chips(study, 'interspaces', { neuroma: 'present', 'neuroma-size': mm })['Neuroma size']
    expect(size('5')).toBe('5 mm or more: the size that went with symptoms')
    expect(size('4.5')).toBe('Under 5 mm: neuromas this size are also found in feet without symptoms')
    expect(size('')).toBeUndefined()
    expect(impressionOf({ ...normal, neuroma: 'present', 'neuroma-space': '3', 'neuroma-size': '6' })).toBe('Morton neuroma in the third intermetatarsal space, 6 mm.')
  })

  // F7-3: "Fluid up to 3 mm in transverse diameter was found in the first three intermetatarsal
  // bursae of volunteers without symptoms."
  test('bursal fluid at 3 mm, and the fourth space', () => {
    const bursa = (space: string, mm: string) => chips(study, 'interspaces', { bursa: 'present', 'bursa-space': space, 'bursa-size': mm })['Bursal fluid']
    expect(bursa('2', '3')).toBe('Up to 3 mm: within what volunteers without symptoms showed')
    expect(bursa('2', '3.5')).toBe('More than 3 mm: beyond what volunteers without symptoms showed')
    expect(bursa('4', '2')).toBe('The volunteer range covers the first three spaces only')
    expect(bursa('', '2')).toBeUndefined()
    // Within the volunteer range: a findings line, but no impression line.
    const within = { ...normal, bursa: 'present', 'bursa-space': '2', 'bursa-size': '3' }
    expect(report(study, within).text).toContain('Intermetatarsal bursal fluid: present, second intermetatarsal space, 3 mm')
    expect(impressionOf(within)).toBe(NORMAL_IMPRESSION)
    expect(impressionOf({ ...within, 'bursa-size': '4' })).toBe('Fluid in the second intermetatarsal bursa, 4 mm.')
    expect(impressionOf({ ...within, 'bursa-space': '4', 'bursa-size': '2' })).toBe('Fluid in the fourth intermetatarsal bursa, 2 mm.')
  })

  // F6-2: "Pericapsular fibrosis beside a torn plantar plate can look like a Morton neuroma."
  test('a plate tear next to a neuroma is flagged; the plate of joint n borders spaces n - 1 and n', () => {
    const torn = { ...normal, plate: 'partial', 'plate-joint': '3', neuroma: 'present' }
    expect(report(study, { ...torn, 'neuroma-space': '2' }).warnings)
      .toEqual(['A plantar plate tear at the third MTP joint is entered next to a Morton neuroma in the second intermetatarsal space. Pericapsular fibrosis beside a torn plate can look like a neuroma; check which it is.'])
    expect(report(study, { ...torn, 'neuroma-space': '3' }).warnings).toHaveLength(1)
    expect(report(study, { ...torn, 'neuroma-space': '1' }).warnings).toEqual([])
    expect(report(study, { ...torn, 'neuroma-space': '4' }).warnings).toEqual([])
  })
})

describe('foot MRI report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, 'fifth-base': 'zone-1', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: fifth metatarsal base fracture.')
    expect(report(study, { ...normal, 'lisfranc-plantar': 'sprain', 'impression-negatives': ['no-lisfranc'] }).warnings)
      .toContain('Impression says no Lisfranc injury, but these are entered: plantar Lisfranc ligament sprain.')
    expect(report(study, { ...normal, plate: 'complete', 'impression-negatives': ['no-plate'] }).warnings)
      .toContain('Impression says no plantar plate tear, but these are entered: lesser MTP plantar plate complete tear.')
    expect(report(study, { ...normal, pl: 'tear', 'impression-negatives': ['no-tendon'] }).warnings)
      .toContain('Impression says no tendon tear, but these are entered: peroneus longus tear.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-lisfranc', 'no-plate', 'no-tendon'] }).warnings).toEqual([])
  })
})

describe('foot MRI report: output text', () => {
  const cases: Values[] = [
    {},
    normal,
    { ...normal, history: 'axial', marrow: 'present', 'marrow-site': 'calcaneus', talus: 'other', 'talus-text': 'lateral process', calcaneus: 'intra', sanders: 'IV', navicular: 'fracture', coalition: 'calcaneonavicular', 'coalition-kind': 'osseous' },
    { ...normal, 'lisfranc-dorsal': 'tear', 'lisfranc-interosseous': 'tear', 'lisfranc-plantar': 'tear', tmt: 'dislocated', myerson: 'A', stress: 'reaction', freiberg: 'other' },
    { ...normal, 'hallux-plate': 'sprain', sesamoids: 'fracture', 'sesamoid-side': 'lateral', 'hallux-arthritis': 'present', plate: 'complete', 'mtp-synovitis': 'present', neuroma: 'present', bursa: 'present', 'plantar-fascia': 'tear', 'other-tendons': 'abnormal', effusion: 'large', variants: ['os-intermetatarseum'] },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('foot MRI quiz', () => {
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
