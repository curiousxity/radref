import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { CtColonographyStudyPage } from './CtColonographyStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The quoted sentences are from the lesson's Learn tab
 * ("5. C-RADS 2023: the categories" unless said otherwise).
 */
const study = studyOf(CtColonographyStudyPage)

/** A complete, adequate screening study with nothing found. */
const normal: Values = {
  indication: 'screen',
  positions: ['supine', 'prone'],
  lowDose: 'yes',
  ivContrast: 'no',
  distension: 'adequate',
  cleansing: 'good',
  tagging: 'effective',
  adequate: 'yes',
  colon: ['normal'],
  lesionCount: '0',
  massType: 'none',
  eCat: 'e12',
}

/** One soft-tissue sessile polyp measured on 3D, in the sigmoid. */
function onePolyp(size: string, extra: Values = {}): Values {
  return {
    ...normal,
    lesionCount: '1',
    l1Att: 'soft',
    l1Morph: 'sessile',
    l1Conf: 'high',
    l1Size: size,
    l1Method: '3d',
    l1Seg: 'sigmoid',
    ...extra,
  }
}

/** Three soft-tissue polyps (sizes in mm), all on 3D. */
function polyps(...sizes: string[]): Values {
  const out: Values = { ...normal, lesionCount: String(sizes.length) }
  sizes.forEach((size, i) => {
    const n = i + 1
    Object.assign(out, { [`l${n}Att`]: 'soft', [`l${n}Morph`]: 'sessile', [`l${n}Conf`]: 'mod', [`l${n}Size`]: size, [`l${n}Method`]: '3d', [`l${n}Seg`]: 'ascending' })
  })
  return out
}

const cCat = (values: Values) => chips(study, 'categories', values)['C category']

/** No placeholder text, and no doubled space once each line's indent is set aside. */
function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object|null/)
  for (const line of text.split('\n')) expect(line.trimStart()).not.toMatch(/ {2}/)
  expect(text).not.toMatch(/\.\.|: \.|, \./)
}

describe('CT colonography: polyp size bands', () => {
  // "C1: normal or benign. No polyp ≥6 mm; ... diminutive polyps are fine here."
  // "C2a: one or two polyps of 6–9 mm." "C3: any polyp ≥10 mm"
  it.each([
    ['5.9', 'C1'],
    ['6', 'C2a'],
    ['9', 'C2a'],
    ['10', 'C3'],
  ])('a %s mm polyp is %s', (size, code) => {
    expect(cCat(onePolyp(size))).toBe(code)
  })

  it('labels each band on the measure step', () => {
    expect(chips(study, 'measure', onePolyp('5.9'))['Polyp 1']).toBe('Diminutive: not reported')
    expect(chips(study, 'measure', onePolyp('6'))['Polyp 1']).toBe('6-9 mm: C2a range')
    expect(chips(study, 'measure', onePolyp('9'))['Polyp 1']).toBe('6-9 mm: C2a range')
    expect(chips(study, 'measure', onePolyp('10'))['Polyp 1']).toBe('10 mm or more: C3')
  })

  it('leaves a diminutive polyp out of the report and says so', () => {
    const { text, warnings } = report(study, onePolyp('5'))
    expect(text).not.toMatch(/Polyp 1/)
    expect(text).toContain('C-RADS C1')
    expect(warnings).toContain('Lesion 1 measures under 6 mm: diminutive polyps are not reported, so it is left out.')
  })
})

describe('CT colonography: C3 by count and growth', () => {
  // "C3: any polyp ≥10 mm, or three or more 6–9 mm polyps, or a C2a polyp that has grown."
  it('two 6-9 mm polyps are C2a', () => {
    expect(cCat(polyps('6', '9'))).toBe('C2a')
    expect(report(study, polyps('6', '9')).text).toContain('C-RADS C2a: two polyps of 6-9 mm. Either colonoscopy or repeat CTC in 3 years.')
  })
  it('three 6-9 mm polyps are C3', () => {
    expect(cCat(polyps('6', '7', '9'))).toBe('C3')
    expect(report(study, polyps('6', '7', '9')).text).toContain('three or more 6-9 mm polyps')
  })
  it('a 6-9 mm polyp that has grown is C3; stable or regressed stays C2a', () => {
    expect(cCat(onePolyp('8', { l1Growth: 'grown' }))).toBe('C3')
    expect(chips(study, 'measure', onePolyp('8', { l1Growth: 'grown' }))['Polyp 1']).toBe('6-9 mm, grown: C3')
    expect(cCat(onePolyp('8', { l1Growth: 'stable' }))).toBe('C2a')
    expect(cCat(onePolyp('8', { l1Growth: 'regressed' }))).toBe('C2a')
  })
  // "Add a confidence statement (low/moderate/high)."
  it('C2a carries the confidence statement', () => {
    expect(report(study, onePolyp('7')).text).toContain('Confidence: high.')
  })
})

describe('CT colonography: C4', () => {
  // "C4: mass ≥30 mm or malignant-appearing."
  const mass = (length: string, features: string[] = []): Values => ({ ...normal, massType: 'mass', massLength: length, massFeatures: features, massSeg: 'sigmoid' })

  it('a 29 mm mass with no malignant feature is not C4', () => {
    const { warnings } = report(study, mass('29'))
    expect(cCat(mass('29'))).toBe('Not assigned')
    expect(warnings).toContain('Mass under 30 mm with no malignant-looking feature entered: C4 applies to a mass of 30 mm or more or a malignant-appearing one.')
  })
  it('a 30 mm mass is C4', () => {
    expect(cCat(mass('30'))).toBe('C4')
    expect(report(study, mass('30')).text).toContain('C-RADS C4: mass of 30 mm. Surgical/oncologic referral, with or without biopsy.')
  })
  // "Cancer: mass of 3 cm or more, or any malignant-looking lesion: irregular surface, shouldering, annular narrowing."
  it.each(['shoulder', 'irregular', 'annular'])('a small mass with %s is C4', (feature) => {
    expect(cCat(mass('15', [feature]))).toBe('C4')
    expect(chips(study, 'interrogate', mass('15', [feature]))['Mass']).toBe('Malignant-appearing: C4')
  })
  it.each(['wall', 'pericolic'])('%s alone does not make a small mass C4', (feature) => {
    expect(cCat(mass('15', [feature]))).toBe('Not assigned')
  })
  it('a 10 mm polyp is still C3 and a 30 mm polyp prompts describing it as a mass', () => {
    expect(report(study, onePolyp('29')).warnings.some((w) => w.includes('C4 is a mass'))).toBe(false)
    expect(report(study, onePolyp('30')).warnings).toContain('Lesion 1 measures 30 mm: C4 is a mass of 30 mm or more; if this is a mass, describe it under Mass.')
  })
})

describe('CT colonography: C2b diverticular stricture', () => {
  // "C2b (new): likely benign mass-like diverticular stricture / myochosis. Follow-up CTC at
  // 5 years if confident, 3 years or less if not; call it C4 if you're worried."
  const div = (conf: string): Values => ({ ...normal, massType: 'div', divConf: conf, massSeg: 'sigmoid' })
  it('confident is C2b with CTC at 5 years', () => {
    expect(cCat(div('confident'))).toBe('C2b')
    expect(chips(study, 'interrogate', div('confident'))['Stricture']).toBe('C2b: CTC at 5 years')
    expect(report(study, div('confident')).text).toContain('Follow-up CTC at 5 years.')
  })
  it('not confident is C2b with CTC in 3 years or less', () => {
    expect(cCat(div('unsure'))).toBe('C2b')
    expect(report(study, div('unsure')).text).toContain('Follow-up CTC in 3 years or less.')
  })
  it('worried is C4', () => {
    expect(cCat(div('worried'))).toBe('C4')
    expect(report(study, div('worried')).text).toContain('C-RADS C4: mass-like stricture of concern for malignancy.')
  })
  // "The report gets one overall C and one overall E category, based on the most significant finding in each."
  it('C2a with C2b asks for one overall category', () => {
    const values = { ...onePolyp('7'), massType: 'div', divConf: 'confident', massSeg: 'sigmoid' }
    expect(cCat(values)).toBe('C2a and C2b')
    expect(report(study, values).warnings).toContain('Both C2a and C2b findings: the report gets one overall C category, based on the most significant finding.')
  })
})

describe('CT colonography: C0 and fat', () => {
  // "C0: inadequate study. Collapsed segment, poor prep, or a prior study is needed and unavailable."
  it('poor prep is C0', () => {
    expect(cCat({ ...normal, cleansing: 'poor', adequate: 'no' })).toBe('C0')
    expect(chips(study, 'technique', { ...normal, cleansing: 'poor' })['Prep']).toBe('Poor prep: C0')
    expect(cCat({ ...normal, cleansing: 'fair' })).toBe('C1')
  })
  // "Two positions: every segment needs to be distended in at least one position."
  it('a collapsed segment is C0 only when the other position does not cover it', () => {
    expect(cCat({ ...normal, distension: 'collapsed', covered: 'no', adequate: 'no' })).toBe('C0')
    expect(chips(study, 'technique', { ...normal, distension: 'collapsed', covered: 'no' })['Collapsed segment']).toBe('Not cleared: C0')
    expect(cCat({ ...normal, distension: 'collapsed', covered: 'yes' })).toBe('C1')
  })
  it('a needed prior that is unavailable is C0', () => {
    expect(cCat({ ...normal, prior: 'unavailable', adequate: 'no' })).toBe('C0')
    expect(cCat({ ...normal, prior: 'available' })).toBe('C1')
  })
  it('a study judged inadequate with no named reason is C0', () => {
    expect(report(study, { ...normal, adequate: 'no' }).text).toContain('C-RADS C0: inadequate study; study judged inadequate.')
  })
  it('marking the study adequate while C0 criteria are met is flagged', () => {
    expect(report(study, { ...normal, cleansing: 'poor' }).warnings).toContain('Study marked adequate, but C0 criteria are met: poor prep.')
  })
  it('a lesion keeps its category and the C0 limitation is stated beside it', () => {
    const { text, warnings } = report(study, onePolyp('12', { cleansing: 'poor', adequate: 'no' }))
    expect(cCat(onePolyp('12', { cleansing: 'poor', adequate: 'no' }))).toBe('C3')
    expect(text).toContain('C0 criteria also met: poor prep: lesions of 10 mm or more cannot be excluded in the inadequately evaluated colon.')
    expect(warnings.some((w) => w.startsWith('C0 criteria are met (poor prep) and a C3 finding is reported.'))).toBe(true)
  })
  // "Macroscopic fat indicates a lipoma, fibrolipoma, or an inverted diverticulum, all benign and not requiring colonoscopy."
  it('a fat-attenuation lesion of any size is benign and does not count as a polyp', () => {
    const values: Values = { ...normal, lesionCount: '1', l1Att: 'fat', l1Size: '15', l1Method: '3d', l1Seg: 'ascending' }
    expect(cCat(values)).toBe('C1')
    expect(chips(study, 'interrogate', values)['Lesion 1']).toBe('Fat: benign, no colonoscopy')
    expect(report(study, values).text).toContain('macroscopic fat: lipoma, fibrolipoma or inverted diverticulum, benign, no colonoscopy needed.')
  })
})

describe('CT colonography: categories it cannot assign', () => {
  it('an unsized lesion is not assigned rather than C1', () => {
    const { l1Size: _drop, ...values } = onePolyp('7')
    void _drop
    expect(cCat(values)).toBe('Not assigned')
  })
  it('more than three lesions is not assigned until the rest are categorized', () => {
    expect(cCat({ ...polyps('7', '7'), lesionCount: 'more', l3Att: 'soft', l3Size: '7' })).toBe('C3')
    expect(cCat({ ...onePolyp('7'), lesionCount: 'more', l2Att: 'soft', l2Size: '7', l3Att: 'fat', l3Size: '5' })).toBe('Not assigned')
  })
})

describe('CT colonography: 2D measurement at the 9 vs 10 mm boundary', () => {
  // "2D measurements tend to underestimate true size compared with 3D by approximately 1 mm.
  // At the 9 vs 10 mm boundary, measure on 3D." (Step 5)
  const warns = (size: string, method: string) =>
    report(study, onePolyp(size, { l1Method: method })).warnings.some((w) => w.includes('at the 9 vs 10 mm boundary'))
  it.each([
    ['8.9', '2d', false],
    ['9', '2d', true],
    ['10', 'oblique', true],
    ['10.1', '2d', false],
    ['9', '3d', false],
  ])('%s mm on %s warns: %s', (size, method, expected) => {
    expect(warns(size, method)).toBe(expected)
  })
})

describe('CT colonography: extracolonic E category', () => {
  // "E4: likely important (AAA, solid renal mass, adnexal mass, suspicious lung nodule). Needs work-up."
  it('an E4 example with a lower E category is flagged', () => {
    const values = { ...normal, e4Findings: ['aaa'], eCat: 'e12' }
    expect(chips(study, 'extracolonic', values)['E category']).toBe('E4: needs work-up')
    expect(report(study, values).warnings).toContain('AAA entered, which the lesson lists as E4 (likely important), but the E category is E1/E2.')
  })
  it('E4 with nothing described is flagged', () => {
    expect(report(study, { ...normal, eCat: 'e4' }).warnings).toContain('E4 chosen but no extracolonic finding described.')
  })
  it('each E category has its line', () => {
    expect(report(study, { ...normal, eCat: 'e3' }).text).toContain('C-RADS E3: indeterminate but likely unimportant extracolonic finding. Work-up optional.')
    expect(report(study, { ...normal, eCat: 'e4', e4Findings: ['renal'] }).text).toContain('C-RADS E4: likely important extracolonic finding (Solid renal mass). Needs work-up.')
  })
  // "note the limitation of unenhanced low-dose technique" (report template)
  it('states the unenhanced low-dose limitation', () => {
    expect(report(study, normal).text).toContain('Characterization limited by the unenhanced low-dose technique.')
  })
})

describe('CT colonography: whole cases', () => {
  it('normal screening study: C1 and E1/E2, nothing to check', () => {
    const { text, warnings } = report(study, normal)
    expect(text).toContain('1) C-RADS C1: normal or benign; no polyp of 6 mm or more. Routine screening in 5-10 years.')
    expect(text).toContain('2) C-RADS E1/E2: no extracolonic finding needing follow-up.')
    expect(warnings).toEqual([])
    expectClean(text)
  })
  it('lesson case 1: 8 mm sessile polyp in the proximal sigmoid is C2a', () => {
    const { text, warnings } = report(study, onePolyp('8', { l1Pos: 'proximal', indication: 'diag', indicationDetail: 'incomplete colonoscopy to the sigmoid' }))
    expect(text).toContain('Polyp 1: 8 mm (3D), proximal sigmoid colon, sessile, soft-tissue attenuation, confidence high.')
    expect(text).toContain('1) C-RADS C2a: one polyp of 6-9 mm.')
    expect(warnings).toEqual([])
    expectClean(text)
  })
  it('pedunculated 12 mm polyp: C3 with polypectomy', () => {
    const { text } = report(study, onePolyp('12', { l1Morph: 'ped' }))
    expect(text).toContain('1) C-RADS C3: polyp 1 measuring 12 mm. Colonoscopic polypectomy.')
    expectClean(text)
  })
  it('malignant-appearing sigmoid mass with a suspicious lung nodule: C4 and E4', () => {
    const values: Values = {
      ...normal,
      indication: 'diag',
      ivContrast: 'yes',
      lowDose: 'no',
      massType: 'mass',
      massFeatures: ['wall', 'shoulder', 'annular'],
      massLength: '45',
      massSeg: 'sigmoid',
      massPos: 'distal',
      massNodes: 'two 8 mm pericolic nodes',
      e4Findings: ['lung'],
      eCat: 'e4',
    }
    const { text, warnings } = report(study, values)
    expect(text).toContain('Mass: distal sigmoid colon, length 45 mm, wall thickening, shouldering, annular narrowing. Nodes: two 8 mm pericolic nodes.')
    expect(text).toMatch(/1\) C-RADS C4: mass of 45 mm; malignant-appearing mass \(shouldering, annular narrowing\)\. Surgical\/oncologic referral/)
    expect(text).toContain('2) C-RADS E4: likely important extracolonic finding (Suspicious lung nodule). Needs work-up.')
    expect(text).not.toContain('unenhanced')
    expect(warnings).toEqual([])
    expectClean(text)
  })
})

describe('CT colonography: required items and contradictions', () => {
  it('the empty form lists what the report must contain', () => {
    const { warnings } = report(study)
    for (const label of [
      'Indication',
      'IV contrast',
      'Distension',
      'Cleansing',
      'Tagging',
      'Study adequate?',
      'Overall description of the large intestine',
      'Lesions of 6 mm or more',
      'Mass or stricture',
      'Overall E category',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
    expect(cCat({})).toBe('Not assigned')
  })
  it('asks for each revealed required item', () => {
    const { warnings } = report(study, { ...normal, lesionCount: '1', distension: 'collapsed', massType: 'div' })
    for (const label of [
      'Lesion 1: attenuation',
      'Lesion 1: morphology',
      'Lesion 1: confidence',
      'Lesion 1: largest dimension',
      'Lesion 1: measured on',
      'Lesion 1: segment',
      'Distended in the other position?',
      'Confidence that it is benign',
      'Mass/stricture: segment',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })
  // "Two positions: every segment needs to be distended in at least one position."
  it('one recorded position is flagged', () => {
    expect(report(study, { ...normal, positions: ['supine'] }).warnings).toContain(
      'Only one position recorded: supine and prone are standard, and every segment needs to be distended in at least one position.',
    )
  })
  it('never prints placeholder text, empty or partial', () => {
    expectClean(report(study).text)
    expectClean(report(study, { lesionCount: '2', massType: 'mass', distension: 'collapsed' }).text)
    expectClean(report(study, { ...normal, massType: 'div', colon: ['divert', 'redundant'], divertExtent: 'sigmoid' }).text)
  })
})
