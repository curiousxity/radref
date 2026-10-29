import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { ShoulderMriStudyPage } from './ShoulderMriStudy'

const study = studyOf(ShoulderMriStudyPage)

/*
 * Each rule case quotes its claim from
 * docs/superpowers/research/2026-10-23-shoulder-mri-sources.md. The references are matched on
 * PubMed and Crossref, and each case quotes the sentence that states it, from the paper's abstract
 * or open full text or, where the original is paywalled, from the open review cited beside it.
 * If the original paper is read and differs, fix the expectation and say in that commit why the
 * old one was wrong.
 */

describe('shoulder MRI: checked state', () => {
  // Every claim was read in an abstract, open full text or an open review (2026-10-29), so the
  // note no longer calls the study an unchecked draft.
  test('the source note no longer says the draft is unchecked', () => {
    expect(study.sourceNote.startsWith('Unchecked draft')).toBe(false)
    expect(study.sourceNote).toContain('cited beside the original')
  })

  // Each reference has a DOI (Hill and Sachs 1940 has one on Crossref but no PMID).
  test('has a DOI on every reference', () => {
    // 26 since the Neer (Kilcoyne, Carofino), Ellman and Goutallier reviews were added (2026-10-25);
    // 34 since Bao, Marcon, Kadi, Feuerriegel, Jarraya, Ayik, Mangi and Jeong were added (2026-10-29).
    expect(study.references).toHaveLength(34)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
  })
})

describe('shoulder MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'cuff', 'subscapularis', 'biceps', 'labrum', 'capsule', 'subacromial',
      'cartilage', 'nerves', 'repair', 'variants', 'impression',
    ])
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  protocol: 'complete',
  effusion: 'none',
  marrow: 'none',
  'hill-sachs': 'none',
  fracture: 'none',
  supraspinatus: 'normal',
  infraspinatus: 'normal',
  subscapularis: 'normal',
  'teres-minor': 'normal',
  biceps: 'normal',
  'labrum-anterior': 'intact',
  'labrum-superior': 'intact',
  'labrum-posterior': 'intact',
  ighl: 'intact',
  'ac-joint': 'normal',
  bursa: 'normal',
  cartilage: 'normal',
  'paralabral-cyst': 'none',
  denervation: 'none',
  'prior-repair': 'no',
}

const NORMAL_IMPRESSION = 'No rotator cuff tear, labral tear or other abnormality of the shoulder.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

const allFields = study.report.steps.flatMap((step) => step.fields)

describe('shoulder MRI report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = allFields.map((field) => field.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items shown on a normal study are one status field per structure', () => {
    const required = allFields.filter((f) => f.required && (f.showIf?.(normal) ?? true)).map((f) => f.id)
    expect(required.sort()).toEqual(Object.keys(normal).sort())
  })
})

describe('shoulder MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('Supraspinatus: normal')
    expect(text).toContain('Previous rotator cuff repair: no')
  })

  test('the empty form says where to start and lists every required item', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['Protocol', 'Supraspinatus', 'Anteroinferior labrum', 'Previous rotator cuff repair', 'Muscle denervation']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('partial entry: a full-thickness supraspinatus tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { supraspinatus: 'full', 'supraspinatus-width': '12' })
    expect(text).toContain('Supraspinatus: full-thickness tear, 12 mm wide')
    expect(text).toContain('Impression: Full-thickness tear, 12 mm wide of the supraspinatus.')
    expect(warnings).toContain('Infraspinatus not stated')
    expect(warnings).not.toContain('Supraspinatus not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { supraspinatus: 'normal' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Calcific tendinitis.' })).toBe('Findings as above.')
  })

  test('an abnormal study lists its findings in search-pattern order', () => {
    const values = { ...normal, 'hill-sachs': 'present', 'labrum-anterior': 'bankart', ighl: 'hagl' }
    expect(impressionOf(values)).toBe('Hill-Sachs lesion.\nBankart lesion.\nHumeral avulsion of the inferior glenohumeral ligament (HAGL).')
    expect(report(study, values).warnings).toEqual([])
  })

  test('pertinent negatives follow the findings', () => {
    expect(impressionOf({ ...normal, bursa: 'bursitis', 'impression-negatives': ['no-cuff-tear', 'no-fracture'] }))
      .toBe('Subacromial-subdeltoid bursitis.\nNo rotator cuff tear.\nNo fracture.')
  })

  test('an incomplete protocol qualifies the impression', () => {
    expect(impressionOf({ ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] })).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
  })
})

describe('shoulder MRI report: variants get their own impression line', () => {
  test('each variant on a normal study is its own line after the normal impression', () => {
    const values = { ...normal, variants: ['sublabral-foramen', 'buford', 'sublabral-recess', 'os-acromiale'] }
    expect(impressionOf(values)).toBe(`${NORMAL_IMPRESSION}\nSublabral foramen, a normal variant.\nBuford complex, a normal variant.\nSublabral recess, a normal variant.\nOs acromiale.`)
    expect(report(study, values).text).toContain('Normal variants: Sublabral foramen, Buford complex, Sublabral recess, Os acromiale')
  })

  test('a variant follows the findings on an abnormal study', () => {
    expect(impressionOf({ ...normal, supraspinatus: 'tendinosis', variants: ['os-acromiale'] })).toBe('Supraspinatus tendinosis.\nOs acromiale.')
  })
})

describe('shoulder MRI report: repaired cuff', () => {
  test('the repair integrity field is hidden unless there was a previous repair', () => {
    const field = allFields.find((f) => f.id === 'repair-integrity')
    expect(field?.showIf?.({ 'prior-repair': 'no' })).toBe(false)
    expect(field?.showIf?.({ 'prior-repair': 'yes' })).toBe(true)
    const { text } = report(study, { ...normal, 'repair-integrity': 'v' })
    expect(text).not.toContain('Sugaya')
    expect(impressionOf({ ...normal, 'repair-integrity': 'v' })).toBe(NORMAL_IMPRESSION)
  })

  test('a previous repair needs its integrity stated', () => {
    expect(report(study, { ...normal, 'prior-repair': 'yes' }).warnings).toContain('Repaired cuff not stated')
  })

  test('an intact repair is noted beside the normal impression; a re-tear is a finding', () => {
    expect(impressionOf({ ...normal, 'prior-repair': 'yes', 'repair-integrity': 'ii' })).toBe(`${NORMAL_IMPRESSION}\nIntact rotator cuff repair, Sugaya type II.`)
    expect(impressionOf({ ...normal, 'prior-repair': 'yes', 'repair-integrity': 'iv' })).toBe('Re-tear of the repaired rotator cuff, Sugaya type IV.')
    // Type III by its morphology, not as intact or re-torn (the author's decision, 2026-10-29).
    expect(impressionOf({ ...normal, 'prior-repair': 'yes', 'repair-integrity': 'iii' })).toBe(`${NORMAL_IMPRESSION}\nRotator cuff repair with insufficient tendon thickness but preserved continuity, Sugaya type III.`)
  })
})

describe('shoulder MRI report: hidden fields', () => {
  test('partial tear details set while the tendon is normal write nothing', () => {
    const values = { ...normal, supraspinatus: 'normal', 'supraspinatus-side': 'bursal', 'supraspinatus-depth': '5' }
    expect(report(study, values).text).not.toMatch(/bursal|5 mm/)
    expect(chips(study, 'cuff', values)['Supraspinatus partial tear (Ellman)']).toBeUndefined()
  })

  test('Neer fields set without a proximal humerus fracture write nothing', () => {
    const values = { ...normal, fracture: 'none', 'neer-surgical': 'displaced' }
    expect(report(study, values).text).not.toContain('Neer')
    expect(chips(study, 'bones', values)).toEqual({})
  })
})

describe('shoulder MRI report: contradictions', () => {
  test('a cuff tear with "no rotator cuff tear" in the impression', () => {
    expect(report(study, { ...normal, infraspinatus: 'partial', 'impression-negatives': ['no-cuff-tear'] }).warnings)
      .toContain('Impression says no rotator cuff tear, but these are entered: infraspinatus partial-thickness tear.')
    expect(report(study, { ...normal, 'prior-repair': 'yes', 'repair-integrity': 'v', 'impression-negatives': ['no-cuff-tear'] }).warnings)
      .toContain('Impression says no rotator cuff tear, but these are entered: re-tear of the repaired cuff.')
  })

  test('a labral tear or fracture against their negatives', () => {
    expect(report(study, { ...normal, 'labrum-superior': 'ii', 'impression-negatives': ['no-labral-tear'] }).warnings)
      .toContain('Impression says no labral tear, but these are entered: SLAP type II.')
    expect(report(study, { ...normal, 'labrum-anterior': 'bony-bankart', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: bony Bankart lesion.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-cuff-tear', 'no-labral-tear', 'no-fracture'] }).warnings).toEqual([])
  })

  // S10-1: "Glenoid labral cysts are associated with glenoid labral tears and shoulder
  // instability" (Tirman 1994, abstract).
  test('a paralabral cyst with an intact labrum', () => {
    const values = { ...normal, 'paralabral-cyst': 'present', 'cyst-site': 'spinoglenoid' }
    expect(report(study, values).warnings).toContain('A paralabral cyst is entered with an intact labrum. Paralabral cysts go with labral tears: look at the labrum again.')
    expect(report(study, { ...values, 'labrum-posterior': 'tear' }).warnings).toEqual([])
  })

  // S5-1: "Dislocation was associated with complete rupture of the subscapularis tendon in 23
  // cases, with partial tearing in 21 cases, and with an intact subscapularis tendon in 2 cases"
  // (Walch 1998, abstract).
  test('a displaced biceps with no subscapularis tear', () => {
    const values = { ...normal, 'biceps-position': 'dislocated' }
    expect(report(study, values).warnings).toContain('The long head of biceps is displaced medially, but no subscapularis tear is entered. Displaced biceps tendons go with subscapularis tears: look at it again.')
    expect(report(study, { ...values, subscapularis: 'full' }).warnings).toEqual([])
  })

  // S12-3: "false positive and false negative diagnoses of a SLAP type 2 lesion can be caused by
  // misinterpretation of a sublabral recess as a tear and vice versa" (Woertler and Waldt 2006,
  // full text). Was cited to Smith 1996, whose abstract says only that the recess looks like SLAP
  // lesions, not type II; the warning itself is unchanged.
  test('a type II SLAP tear and a sublabral recess together', () => {
    expect(report(study, { ...normal, 'labrum-superior': 'ii', variants: ['sublabral-recess'] }).warnings)
      .toContain('Both a type II SLAP tear and a sublabral recess are entered at the biceps anchor. The recess can mimic the tear: decide which it is.')
  })
})

describe('shoulder MRI rules: Neer (shared logic, src/logic/neer.ts)', () => {
  // N4: three-part, "one tuberosity is displaced and the surgical neck fracture is displaced"
  // (Carofino and Leopold 2013, full text).
  test('the bones step gives the Neer type and the report uses it', () => {
    const values = { ...normal, fracture: 'proximal-humerus', 'neer-surgical': 'displaced', 'neer-greater': 'displaced', 'neer-lesser': 'undisplaced' }
    expect(chips(study, 'bones', values).Neer).toBe('Three-part (surgical neck and greater tuberosity displaced)')
    expect(report(study, values).text).toContain('Proximal humerus fracture, Neer three-part. Fracture lines: surgical neck (displaced), greater tuberosity (displaced) and lesser tuberosity.')
    expect(impressionOf(values)).toBe('Proximal humerus fracture, Neer three-part.')
  })
})

describe('shoulder MRI rules: cuff (Ellman 1990; Patte 1990; Goutallier 1994)', () => {
  // S3-1: "Grade 1, < 3 mm deep; Grade 2, 3 to 6 mm deep; and Grade 3, > 6 mm deep" (Bi and Verma
  // 2025, full text); the Ellman 1990 abstract says only "location, depth, and area".
  test.each([
    ['2.9', 'Articular (A), grade 1'],
    ['3', 'Articular (A), grade 2'],
    ['6', 'Articular (A), grade 2'],
    ['6.5', 'Articular (A), grade 3'],
  ])('articular partial tear %s mm deep is %s', (depth, expected) => {
    expect(chips(study, 'cuff', { supraspinatus: 'partial', 'supraspinatus-side': 'articular', 'supraspinatus-depth': depth })['Supraspinatus partial tear (Ellman)']).toBe(expected)
  })
  test.each([['bursal', 'Bursal (B)'], ['interstitial', 'Interstitial (C)']])('%s side is %s', (side, expected) => {
    expect(chips(study, 'cuff', { infraspinatus: 'partial', 'infraspinatus-side': side })['Infraspinatus partial tear (Ellman)']).toBe(expected)
    expect(chips(study, 'subscapularis', { subscapularis: 'partial', 'subscapularis-side': side })['Subscapularis partial tear (Ellman)']).toBe(expected)
  })

  // S3-2: "stage 1, proximal stump near the bony insertion; stage 2, proximal stump at the level of
  // the humeral head; and stage 3, proximal stump at the level of the glenoid" (Feuerriegel 2024,
  // full text, citing Patte).
  test.each(['1', '2', '3'])('Patte stage %s', (stage) => {
    expect(chips(study, 'cuff', { supraspinatus: 'full', 'supraspinatus-retraction': stage })['Retraction (Patte)']).toBe(`Stage ${stage}`)
  })
  test('Patte stage reaches the report and the impression', () => {
    const values = { ...normal, supraspinatus: 'full', 'supraspinatus-retraction': '2' }
    expect(report(study, values).text).toContain('Supraspinatus: full-thickness tear; retraction: stump at the level of the humeral head (Patte stage 2)')
    expect(impressionOf(values)).toBe('Full-thickness tear of the supraspinatus, Patte stage 2 retraction.')
  })

  // S3-3: "Completely normal muscle, without any fatty streak"; "Muscle contains some fatty
  // streaks"; "more muscle than fat"; "Equal amounts of fat and muscle"; "More fat than muscle is
  // present" (Somerson 2016, Table 1).
  test.each(['0', '1', '2', '3', '4'])('Goutallier grade %s', (grade) => {
    expect(chips(study, 'cuff', { 'supraspinatus-fat': grade })['Supraspinatus (Goutallier)']).toBe(`Grade ${grade}`)
    expect(chips(study, 'subscapularis', { 'subscapularis-fat': grade })['Subscapularis (Goutallier)']).toBe(`Grade ${grade}`)
  })
  test('grade 0 keeps the normal impression; grade 1 and up is a finding', () => {
    expect(impressionOf({ ...normal, 'infraspinatus-fat': '0' })).toBe(NORMAL_IMPRESSION)
    expect(impressionOf({ ...normal, 'infraspinatus-fat': '3' })).toBe('Infraspinatus fatty infiltration, Goutallier grade 3.')
  })
})

describe('shoulder MRI rules: labrum (Snyder 1990)', () => {
  // S6-1: "Type I. Fraying of the free edge of the superior labrum, intact biceps tendon";
  // "Type II. ... Avulsion of superior labrum and biceps anchor"; "Type III. Bucket-handle tear of
  // the superior labrum with intact biceps anchor"; "Type IV: bucket handle tear of a meniscoid
  // superior labrum with extension of the tear into the biceps tendon" (Jarraya 2016, full text).
  test.each([['i', 'Type I'], ['ii', 'Type II'], ['iii', 'Type III'], ['iv', 'Type IV']])('superior labrum %s is SLAP %s', (value, expected) => {
    expect(chips(study, 'labrum', { 'labrum-superior': value })['SLAP (Snyder)']).toBe(expected)
  })
  test('an intact superior labrum gives no chip', () => {
    expect(chips(study, 'labrum', { 'labrum-superior': 'intact' })).toEqual({})
  })
})

describe('shoulder MRI rules: nerves (Fritz 1992; Linker 1993)', () => {
  // S10-2: "If entrapment occurs in the suprascapular notch, both the supraspinatus and
  // infraspinatus are affected. If compression occurs in the spinoglenoid notch, the infraspinatus
  // is affected in isolation" (Ayik 2025, full text); Fritz 1992's abstract gives the same split
  // for "anteriorly located masses" and "posteriorly located masses".
  test.each([
    ['suprascapular', 'Can affect the supraspinatus and infraspinatus'],
    ['spinoglenoid', 'Can affect the infraspinatus alone'],
    ['other', undefined],
  ])('cyst at %s', (site, expected) => {
    expect(chips(study, 'nerves', { 'paralabral-cyst': 'present', 'cyst-site': site })['Cyst site (Fritz)']).toBe(expected)
  })

  // S10-3: "Selective atrophy of the teres minor muscle ... was demonstrated at magnetic resonance
  // imaging in three patients with clinical findings of the syndrome" (Linker 1993, abstract).
  test('teres minor denervation raises quadrilateral space syndrome', () => {
    expect(chips(study, 'nerves', { denervation: 'present', 'denervation-muscles': ['teres-minor'] })['Teres minor denervation (Linker)']).toBe('Consider quadrilateral space syndrome')
    expect(chips(study, 'nerves', { denervation: 'present', 'denervation-muscles': ['infraspinatus'] })['Teres minor denervation (Linker)']).toBeUndefined()
  })
})

describe('shoulder MRI rules: repaired cuff (Sugaya 2005)', () => {
  // S11-1 (partly checked): "type I, sufficient thickness with homogenously low intensity; type
  // II, sufficient thickness with partial high intensity; type III, insufficient thickness without
  // discontinuity; type IV, presence of a minor discontinuity; type V, presence of a major
  // discontinuity" (Sugaya 2005, abstract). "In general, types I and II are considered healed,
  // while types IV and V are considered retorn" (Jeong 2026, full text); Jeong adds that whether
  // type III is a re-tear is disputed, so type III is given by its morphology (the author's
  // decision, 2026-10-29).
  test.each([
    ['i', 'Type I: no re-tear'],
    ['ii', 'Type II: no re-tear'],
    ['iii', 'Type III: insufficient thickness, continuity preserved; re-tear status disputed'],
    ['iv', 'Type IV: re-tear'],
    ['v', 'Type V: re-tear'],
  ])('Sugaya %s', (value, expected) => {
    expect(chips(study, 'repair', { 'prior-repair': 'yes', 'repair-integrity': value })['Repaired cuff (Sugaya)']).toBe(expected)
  })
})

describe('shoulder MRI rules: descriptive-only steps have no chips', () => {
  test.each(['technique', 'biceps', 'capsule', 'subacromial', 'cartilage', 'variants', 'impression'])('%s has no derive', (stepId) => {
    expect(study.report.steps.find((s) => s.id === stepId)?.derive).toBeUndefined()
  })
})

describe('shoulder MRI report: output text', () => {
  const cases: Values[] = [
    {},
    normal,
    { supraspinatus: 'partial' },
    { ...normal, marrow: 'present', 'marrow-site': 'greater tuberosity', fracture: 'proximal-humerus', 'neer-greater': 'displaced', 'neer-dislocation': 'anterior' },
    { ...normal, protocol: 'incomplete', 'protocol-missing': ['planes', 'fs'], supraspinatus: 'partial', 'supraspinatus-side': 'bursal', 'supraspinatus-depth': '4', 'supraspinatus-fat': '2' },
    { ...normal, biceps: 'partial', 'biceps-position': 'subluxed', subscapularis: 'full', 'subscapularis-width': '10', 'labrum-anterior': 'alpsa', 'labrum-superior': 'iii', 'labrum-posterior': 'tear' },
    { ...normal, 'paralabral-cyst': 'present', 'cyst-site': 'suprascapular', denervation: 'present', 'denervation-muscles': ['supraspinatus', 'infraspinatus'], 'denervation-phase': 'edema', ighl: 'other', 'ighl-text': 'thickened', cartilage: 'abnormal', 'ac-joint': 'osteoarthritis', other: 'Calcific deposit.' },
    { ...normal, 'prior-repair': 'yes', 'repair-integrity': 'iii', variants: ['buford'] },
    { ...normal, fracture: 'other' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('shoulder MRI quiz', () => {
  test('quiz has 8-12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const q of study.quiz) {
      expect(Number.isInteger(q.answer), q.id).toBe(true)
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
      expect(q.answer, q.id).toBeLessThan(q.options.length)
    }
    expect(new Set(study.quiz.map((q) => q.id)).size).toBe(study.quiz.length)
  })
})
