import { describe, expect, it } from 'vitest'
import type { Values } from '../study/types'
import { chips, report, studyOf } from '../study/testing'
import { LungScreeningCtStudyPage } from './LungScreeningCtStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The quoted sentences are from the study's Learn tab
 * (the ACR Lung-RADS v2022 table and notes).
 */
const study = studyOf(LungScreeningCtStudyPage)

/** A complete exam with one nodule to classify; override what the case is about. */
function nodule(extra: Values): Values {
  return {
    round: 'baseline',
    comparison: 'none',
    evaluable: 'yes',
    nodules: 'present',
    'nodule-type': 'solid',
    location: 'RUL, series 4 image 112',
    timepoint: 'baseline',
    s: 'none',
    ...extra,
  }
}

/** A nodule of this mean diameter (both axes equal). */
function size(mm: string): Values {
  return { long: mm, short: mm }
}

function category(values: Values): string | undefined {
  return chips(study, 'category', values)['Category']
}

function clean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  expect(text).not.toMatch(/ {2}/)
}

describe('lung screening CT: mean diameter', () => {
  // "Measure the long and short axis to one decimal point in mm and report the mean to one decimal point."
  it('6.1 and 5.8 give a mean of 6.0 mm, worked in tenths', () => {
    expect(chips(study, 'measure', nodule({ long: '6.1', short: '5.8' }))['Mean diameter']).toBe('6.0 mm')
  })
  // Quiz: "The mean is (7.4 + 5.9) / 2 = 6.65, reported as 6.7 mm ... category 3."
  it('7.4 x 5.9 mm is 6.7 mm and category 3 at baseline', () => {
    const values = nodule({ long: '7.4', short: '5.9' })
    expect(chips(study, 'measure', values)['Mean diameter']).toBe('6.7 mm')
    expect(category(values)).toBe('Lung-RADS 3')
  })
})

describe('lung screening CT: solid nodule size bands', () => {
  // "2 Benign: solid < 6 mm at baseline"; "3: Solid 6 to < 8 mm at baseline"; "4A: Solid 8 to < 15 mm at baseline"; "4B: Solid ≥ 15 mm at baseline".
  it.each([
    ['5.9', 'Lung-RADS 2'],
    ['6.0', 'Lung-RADS 3'],
    ['7.9', 'Lung-RADS 3'],
    ['8.0', 'Lung-RADS 4A'],
    ['14.9', 'Lung-RADS 4A'],
    ['15.0', 'Lung-RADS 4B'],
  ])('baseline %s mm is %s', (mm, expected) => {
    expect(category(nodule(size(mm)))).toBe(expected)
  })

  // "new < 4 mm" (2); "new 4 to < 6 mm" (3); "new 6 to < 8 mm" (4A); "new or growing ≥ 8 mm" (4B).
  it.each([
    ['3.9', 'Lung-RADS 2'],
    ['4.0', 'Lung-RADS 3'],
    ['5.9', 'Lung-RADS 3'],
    ['6.0', 'Lung-RADS 4A'],
    ['7.9', 'Lung-RADS 4A'],
    ['8.0', 'Lung-RADS 4B'],
  ])('new %s mm is %s', (mm, expected) => {
    expect(category(nodule({ round: 'annual', comparison: 'available', timepoint: 'new', ...size(mm) }))).toBe(expected)
  })

  // "4A: ... growing < 8 mm"; "4B: ... new or growing ≥ 8 mm".
  it.each([
    ['7.9', 'Lung-RADS 4A'],
    ['8.0', 'Lung-RADS 4B'],
  ])('growing %s mm is %s', (mm, expected) => {
    expect(category(nodule({ round: 'annual', comparison: 'available', timepoint: 'growing', ...size(mm) }))).toBe(expected)
  })
})

describe('lung screening CT: part-solid nodules', () => {
  const partSolid = (extra: Values) => nodule({ 'nodule-type': 'partSolid', ...extra })
  // "part-solid < 6 mm total at baseline" is category 2.
  it('baseline 5.9 mm total is category 2', () => {
    expect(category(partSolid({ ...size('5.9'), solid: '2' }))).toBe('Lung-RADS 2')
  })
  // "3: part-solid ≥ 6 mm total with solid part < 6 mm at baseline"; "4A: solid part 6 to < 8 mm at baseline"; "4B: solid part ≥ 8 mm at baseline".
  it.each([
    ['5.9', 'Lung-RADS 3'],
    ['6', 'Lung-RADS 4A'],
    ['7.9', 'Lung-RADS 4A'],
    ['8', 'Lung-RADS 4B'],
  ])('baseline 12 mm total, solid %s mm is %s', (solid, expected) => {
    expect(category(partSolid({ ...size('12'), solid }))).toBe(expected)
  })
  // "3: ... or new < 6 mm total".
  it('new 5.9 mm total is category 3', () => {
    expect(category(partSolid({ round: 'annual', comparison: 'available', timepoint: 'new', ...size('5.9'), solid: '2' }))).toBe('Lung-RADS 3')
  })
  // "4A: ... new or growing solid part < 4 mm"; "4B: ... new or growing solid part ≥ 4 mm".
  it.each([
    ['new', '3.9', 'Lung-RADS 4A'],
    ['new', '4', 'Lung-RADS 4B'],
    ['growing', '3.9', 'Lung-RADS 4A'],
    ['growing', '4', 'Lung-RADS 4B'],
  ])('%s 10 mm total, solid %s mm is %s', (timepoint, solid, expected) => {
    expect(category(partSolid({ round: 'annual', comparison: 'available', timepoint, ...size('10'), solid }))).toBe(expected)
  })
  // Quiz: "12 mm total mean diameter with a 7 mm solid component" at baseline is 4A.
  it('the quiz case is 4A', () => {
    expect(category(partSolid({ ...size('12'), solid: '7' }))).toBe('Lung-RADS 4A')
  })
})

describe('lung screening CT: nonsolid nodules', () => {
  const ggn = (extra: Values) => nodule({ 'nodule-type': 'groundGlass', ...extra })
  // "2: nonsolid < 30 mm (baseline, new or growing) or ≥ 30 mm stable or slowly growing"; "3: nonsolid ≥ 30 mm at baseline or new".
  it('29.9 mm at baseline is category 2', () => {
    expect(category(ggn(size('29.9')))).toBe('Lung-RADS 2')
  })
  it('30 mm at baseline is category 3', () => {
    expect(category(ggn(size('30')))).toBe('Lung-RADS 3')
  })
  it('30 mm new is category 3', () => {
    expect(category(ggn({ round: 'annual', comparison: 'available', timepoint: 'new', ...size('30') }))).toBe('Lung-RADS 3')
  })
  it('29.9 mm growing is category 2', () => {
    expect(category(ggn({ round: 'annual', comparison: 'available', timepoint: 'growing', ...size('29.9') }))).toBe('Lung-RADS 2')
  })
  it('30 mm stable is category 2', () => {
    expect(category(ggn({ round: 'annual', comparison: 'available', timepoint: 'stable', ...size('30') }))).toBe('Lung-RADS 2')
  })
  // "A ground-glass nodule growing that slowly may stay category 2 until it develops a solid component (note 7)."
  it('slow growth of a ground-glass nodule does not make it 4B', () => {
    const values = ggn({ round: 'annual', comparison: 'available', timepoint: 'growing', ...size('12'), slow: 'yes' })
    expect(chips(study, 'compare', values)['Slow-growing GGN']).toBe('May stay category 2')
    expect(category(values)).toBe('Lung-RADS 2')
  })
})

describe('lung screening CT: juxtapleural nodules', () => {
  // "Juxtapleural nodules ... that are solid, smooth, and oval, lentiform or triangular are category 2 if under 10 mm mean diameter at baseline or when new."
  it('9.9 mm at baseline is category 2', () => {
    const values = nodule({ juxtapleural: 'yes', ...size('9.9') })
    expect(category(values)).toBe('Lung-RADS 2')
    expect(chips(study, 'nodule', values)['Juxtapleural rule']).toBe('Category 2 if < 10 mm, baseline or new')
  })
  it('10 mm at baseline falls back to the solid size band (4A)', () => {
    const values = nodule({ juxtapleural: 'yes', ...size('10') })
    expect(category(values)).toBe('Lung-RADS 4A')
    expect(chips(study, 'nodule', values)['Juxtapleural rule']).toBe('Not met: 10 mm or more')
  })
  it('9.9 mm new is category 2', () => {
    expect(category(nodule({ round: 'annual', comparison: 'available', timepoint: 'new', juxtapleural: 'yes', ...size('9.9') }))).toBe('Lung-RADS 2')
  })
  it('does not apply to a growing nodule', () => {
    expect(category(nodule({ round: 'annual', comparison: 'available', timepoint: 'growing', juxtapleural: 'yes', ...size('9.9') }))).toBe('Lung-RADS 4B')
  })
  // Quiz: "An 8.0 mm mean solid nodule sits on the major fissure, with smooth margins and a lentiform shape" is category 2.
  it('the quiz case is category 2', () => {
    expect(category(nodule({ juxtapleural: 'yes', ...size('8.0') }))).toBe('Lung-RADS 2')
  })
})

describe('lung screening CT: airway nodules', () => {
  const airway = (extra: Values) => nodule({ 'nodule-type': 'airway', ...extra })
  // "Airway nodules: subsegmental ones are category 2; segmental or more proximal ones are 4A at baseline or new, and 4B if they persist at 3-month follow-up (note 11)."
  it('subsegmental is category 2', () => {
    expect(category(airway({ 'airway-level': 'subsegmental' }))).toBe('Lung-RADS 2')
  })
  it('segmental at baseline is 4A', () => {
    expect(category(airway({ 'airway-level': 'segmentalOrMoreProximal', 'airway-air': 'no' }))).toBe('Lung-RADS 4A')
  })
  it('segmental new is 4A', () => {
    expect(category(airway({ round: 'annual', comparison: 'available', timepoint: 'new', 'airway-level': 'segmentalOrMoreProximal', 'airway-air': 'no' }))).toBe('Lung-RADS 4A')
  })
  it('segmental stable is 4B', () => {
    expect(category(airway({ round: 'annual', comparison: 'available', timepoint: 'stable', 'airway-level': 'segmentalOrMoreProximal', 'airway-air': 'no' }))).toBe('Lung-RADS 4B')
  })
  // "Air inside a segmental abnormality favors secretions: with no soft-tissue nodule under it, it may be category 2 (note 11c)."
  it('segmental with air favoring secretions is category 2, flagged for review', () => {
    const values = airway({ 'airway-level': 'segmentalOrMoreProximal', 'airway-air': 'yes' })
    expect(category(values)).toBe('Lung-RADS 2')
    expect(report(study, values).warnings.some((w) => w.includes('note 11c'))).toBe(true)
  })
  it('a growing subsegmental airway nodule is flagged as having no table row', () => {
    const values = airway({ round: 'annual', comparison: 'available', timepoint: 'growing', 'airway-level': 'subsegmental' })
    expect(report(study, values).warnings.some((w) => w.includes('no row for a growing one'))).toBe(true)
  })
})

describe('lung screening CT: growth', () => {
  const compared = (extra: Values) => nodule({ round: 'annual', comparison: 'available', ...size('7.0'), ...extra })
  const change = (values: Values) => Object.entries(chips(study, 'compare', values)).find(([label]) => label.startsWith('Change'))
  // "Growth is an increase in mean diameter of more than 1.5 mm within a 12-month interval (note 6)."
  it('+1.5 mm in 12 months is not growth', () => {
    expect(change(compared({ timepoint: 'stable', 'prior-mean': '5.5', interval: '12' }))).toEqual(['Change +1.5 mm', 'Not growth by definition'])
  })
  it('+1.6 mm in 12 months is growth', () => {
    expect(change(compared({ timepoint: 'growing', 'prior-mean': '5.4', interval: '12' }))).toEqual(['Change +1.6 mm', 'Growth (> 1.5 mm in ≤ 12 months)'])
  })
  it('+1.6 mm over 13 months is not called either way', () => {
    const values = compared({ timepoint: 'growing', 'prior-mean': '5.4', interval: '13' })
    expect(change(values)).toEqual(['Change +1.6 mm', 'Over more than 12 months'])
    expect(report(study, values).warnings).toContain('The interval is over 12 months, so check each 12-month interval for > 1.5 mm growth.')
  })
  // "A solid or part-solid nodule that grows over several screens but never by more than 1.5 mm in any 12 months is suspicious and may be 4B."
  it('slow growth of a solid nodule is 4B', () => {
    const values = compared({ timepoint: 'growing', slow: 'yes', ...size('5.0') })
    expect(chips(study, 'compare', values)['Slow-growing solid/part-solid']).toBe('Lung-RADS 4B')
    expect(category(values)).toBe('Lung-RADS 4B')
    expect(report(study, values).text).toContain('may not be PET-avid')
  })
  it('slow growth with spiculation is 4X', () => {
    expect(category(compared({ timepoint: 'growing', slow: 'yes', suspicious: ['spiculation'] }))).toBe('Lung-RADS 4X')
  })
})

describe('lung screening CT: stepped management', () => {
  const stable = (prior: string) => nodule({ round: 'annual', comparison: 'available', timepoint: 'stable', ...size('7.0'), 'prior-cat': prior })
  // "a category 3 lesion stable or smaller at the 6-month CT becomes category 2"
  it('3 stable becomes 2', () => {
    expect(category(stable('3'))).toBe('Lung-RADS 2')
    expect(chips(study, 'compare', stable('3'))['Stepped management']).toBe('3 stable at 6 months → 2')
  })
  // "a 4A lesion stable or smaller at the 3-month CT becomes category 3"
  it('4A stable becomes 3', () => {
    expect(category(stable('4A'))).toBe('Lung-RADS 3')
  })
  // "A 4B lesion proven benign after workup becomes category 2." Stability alone does not.
  it('4B stable stays 4B, with a check before signing', () => {
    expect(category(stable('4B'))).toBe('Lung-RADS 4B')
    expect(report(study, stable('4B')).warnings).toContain('A 4B lesion stays 4B while stable; it becomes category 2 only if proven benign after appropriate diagnostic workup.')
  })
})

describe('lung screening CT: 4X and the S modifier', () => {
  // "A category 3 or 4 nodule with extra features that raise suspicion ... is 4X."
  it('a category 3 nodule with spiculation is 4X', () => {
    expect(category(nodule({ ...size('7'), suspicious: ['spiculation'] }))).toBe('Lung-RADS 4X')
  })
  it('a category 2 nodule with spiculation stays 2', () => {
    expect(category(nodule({ ...size('5'), suspicious: ['spiculation'] }))).toBe('Lung-RADS 2')
  })
  // "Add the S modifier to categories 0–4 for a clinically significant or potentially significant finding unrelated to lung cancer."
  it('S adds to the category and the impression', () => {
    const values = nodule({ ...size('5'), s: 'present', 's-text': '5.2 cm ascending aortic aneurysm' })
    expect(category(values)).toBe('Lung-RADS 2 S')
    const { text } = report(study, values)
    expect(text).toContain('Impression: Lung-RADS 2 with S modifier')
    expect(text).toContain('Other findings (S): 5.2 cm ascending aortic aneurysm.')
  })
})

describe('lung screening CT: category 0 and 1', () => {
  // "If a prior screening or diagnostic CT is being located, the exam is Lung-RADS 0, and that category is temporary."
  it('waiting on a prior is Lung-RADS 0', () => {
    const values = nodule({ round: 'annual', comparison: 'pending', ...size('7') })
    expect(chips(study, 'exam', values)['Waiting on a prior']).toBe('Lung-RADS 0 (temporary)')
    expect(category(values)).toBe('Lung-RADS 0')
  })
  // "If part or all of the lungs cannot be evaluated, the exam is Lung-RADS 0 and needs additional screening CT imaging."
  it('lungs not evaluable is Lung-RADS 0', () => {
    const values = nodule({ evaluable: 'no', limitation: 'lung bases not covered', ...size('5') })
    expect(chips(study, 'exam', values)['Lungs not fully evaluable']).toBe('Lung-RADS 0')
    expect(report(study, values).text).toContain('Lungs: limited: lung bases not covered.')
  })
  // "Segmental or lobar consolidation ... may be Lung-RADS 0 with a 1–3 month LDCT."
  it('infectious findings are Lung-RADS 0 with 1-3 month LDCT', () => {
    const values = nodule({ infection: ['consolidation'], ...size('7') })
    expect(chips(study, 'lungs', values)['Infectious or inflammatory']).toBe('Lung-RADS 0: 1–3 month LDCT')
    expect(category(values)).toBe('Lung-RADS 0')
    expect(report(study, values).warnings.some((w) => w.includes('note 10b'))).toBe(true)
  })
  // "No nodules, or only nodules with benign features ...: Lung-RADS 1."
  it.each([['none'], ['benign']])('nodules %s is Lung-RADS 1', (nodules) => {
    expect(category({ round: 'baseline', comparison: 'none', evaluable: 'yes', nodules, s: 'none' })).toBe('Lung-RADS 1')
  })
})

describe('lung screening CT: whole cases', () => {
  it('a negative baseline screen', () => {
    const { text, warnings } = report(study, { round: 'baseline', comparison: 'none', evaluable: 'yes', nodules: 'none', s: 'none' })
    expect(text).toContain('Exam: Low-dose CT chest for lung cancer screening, baseline screen.')
    expect(text).toContain('Impression: Lung-RADS 1: negative.')
    expect(text).toContain('Management: 12-month screening LDCT. Follow-up is timed from the date of this exam.')
    expect(warnings).toEqual([])
    clean(text)
  })
  it('a probably benign baseline nodule', () => {
    const { text, warnings } = report(study, nodule({ long: '7.4', short: '5.9' }))
    expect(text).toContain('Dominant nodule: solid, RUL, series 4 image 112, 7.4 x 5.9 mm, mean 6.7 mm, baseline.')
    expect(text).toContain('Impression: Lung-RADS 3: probably benign.')
    expect(text).toContain('6-month LDCT')
    expect(warnings).toEqual([])
    clean(text)
  })
  it('a growing solid nodule on an annual screen', () => {
    const { text, warnings } = report(study, nodule({ round: 'annual', comparison: 'available', 'prior-date': '2025-09-12', timepoint: 'growing', long: '10.2', short: '8.4', 'prior-mean': '6.8', interval: '12' }))
    expect(text).toContain('Comparison: prior CT dated 2025-09-12.')
    expect(text).toContain('growing (prior mean 6.8 mm, 12 months ago)')
    expect(text).toContain('Impression: Lung-RADS 4B: very suspicious.')
    expect(text).toContain('Diagnostic chest CT')
    expect(warnings).toEqual([])
    clean(text)
  })
  it('a spiculated baseline nodule with lymphadenopathy', () => {
    const { text } = report(study, nodule({ ...size('16'), suspicious: ['spiculation', 'nodes'] }))
    expect(text).toContain('suspicious features: spiculation, lymphadenopathy')
    expect(text).toContain('Impression: Lung-RADS 4X: very suspicious.')
    clean(text)
  })
})

describe('lung screening CT: required items', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { warnings } = report(study)
    expect(warnings).toEqual(expect.arrayContaining([
      'Screening round not stated',
      'Comparison not stated',
      'Whole of both lungs evaluable? not stated',
      'Lung nodules not stated',
      'Findings unrelated to lung cancer not stated',
    ]))
  })
  it('asks for the nodule details once a nodule is present', () => {
    const { warnings } = report(study, { nodules: 'present' })
    expect(warnings).toEqual(expect.arrayContaining([
      'Dominant nodule type not stated',
      'Location and series/image not stated',
      'Compared with the prior screen not stated',
    ]))
  })
  it('asks for both axes and the solid component of a part-solid nodule', () => {
    const { warnings } = report(study, { nodules: 'present', 'nodule-type': 'partSolid' })
    expect(warnings).toEqual(expect.arrayContaining(['Long axis not stated', 'Short axis not stated', 'Solid component, mean diameter not stated']))
  })
  it('asks what limits the exam and what the S finding is', () => {
    const { warnings } = report(study, { evaluable: 'no', s: 'present' })
    expect(warnings).toEqual(expect.arrayContaining(['What limits it not stated', 'Describe the S finding not stated']))
  })
  it('gives no category until the nodule is measured', () => {
    expect(category(nodule({}))).toBeUndefined()
    expect(report(study, nodule({})).text).not.toContain('Impression')
  })
})

describe('lung screening CT: contradictions', () => {
  it('a baseline screen with a new nodule', () => {
    expect(report(study, nodule({ timepoint: 'new', ...size('5') })).warnings).toContain('Baseline screen, but the nodule is marked new. New, growing and stable need a prior screen.')
  })
  it('no prior CT with a stable nodule', () => {
    expect(report(study, nodule({ round: 'annual', timepoint: 'stable', ...size('5') })).warnings).toContain('No prior CT, but the nodule is marked stable.')
  })
  it('an annual screen with a prior, marked baseline', () => {
    expect(report(study, nodule({ round: 'annual', comparison: 'available', ...size('5') })).warnings).toContain('Annual screen with a prior compared, but the nodule is marked baseline. Baseline thresholds are for the first screen; use new, growing or stable.')
  })
  it('short axis longer than long axis', () => {
    expect(report(study, nodule({ long: '5', short: '6' })).warnings).toContain('Short axis is longer than the long axis.')
  })
  it('solid component larger than the nodule', () => {
    expect(report(study, nodule({ 'nodule-type': 'partSolid', ...size('6'), solid: '6.1' })).warnings).toContain('Solid component is larger than the whole nodule.')
  })
  it('growth by definition but marked stable', () => {
    const values = nodule({ round: 'annual', comparison: 'available', timepoint: 'stable', ...size('7.0'), 'prior-mean': '5.4', interval: '12' })
    expect(report(study, values).warnings).toContain('Mean diameter rose 1.6 mm within 12 months: that is growth (> 1.5 mm), but the nodule is marked stable.')
  })
  it('marked growing but not growth by definition', () => {
    const values = nodule({ round: 'annual', comparison: 'available', timepoint: 'growing', ...size('7.0'), 'prior-mean': '5.5', interval: '12' })
    expect(report(study, values).warnings).toContain('Mean diameter rose 1.5 mm within 12 months: not growth by the > 1.5 mm rule. If it has crept up over several screens, mark slow growth.')
  })
})

describe('lung screening CT: no placeholder text', () => {
  it.each([
    ['empty form', {}],
    ['part-solid with every field', nodule({ 'nodule-type': 'partSolid', round: 'annual', comparison: 'available', 'prior-date': '2025-01-01', timepoint: 'growing', long: '14', short: '10', solid: '5', 'prior-mean': '9', interval: '12', slow: 'yes', suspicious: ['doubling'], 'other-nodules': 'two tiny solid nodules', s: 'present', 's-text': 'aneurysm', 'other-findings': 'emphysema' })],
    ['airway', nodule({ 'nodule-type': 'airway', 'airway-level': 'segmentalOrMoreProximal', 'airway-air': 'yes' })],
    ['infection', { infection: ['multiple', 'context'], 'infection-text': 'many new nodules', nodules: 'present' }],
  ])('%s', (_name, values) => {
    clean(report(study, values).text)
    for (const warning of report(study, values).warnings) clean(warning)
  })
})
