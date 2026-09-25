import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { ThyroidUsStudyPage } from './ThyroidUsStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The quoted sentences are from the study's Learn tab
 * (ACR TI-RADS white paper, Tessler et al., JACR 2017).
 */
const study = studyOf(ThyroidUsStudyPage)

/** A fully answered solid, wider-than-tall, smooth nodule with no foci: 2 points before echogenicity. */
const solid: Values = {
  side: 'right',
  level: 'mid',
  composition: 'solid',
  echogenicity: 'isoechoic',
  shape: 'widerThanTall',
  margin: 'smooth',
  'foci-present': 'none',
  nodes: 'normal',
}

/** Sizes the nodule by its maximum axial dimension; the other two axes are smaller. */
function sized(values: Values, sizeCm: string): Values {
  return { ...values, 'dim-ap': sizeCm, 'dim-perp': '0.4', 'dim-long': '0.4' }
}

const tr3 = solid // solid 2 + isoechoic 1 = 3
const tr4 = { ...solid, echogenicity: 'hypoechoic' } // 2 + 2 = 4
const tr5 = { ...solid, echogenicity: 'veryHypoechoic', margin: 'lobulated' } // 2 + 3 + 2 = 7

function noPlaceholders(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  expect(text).not.toMatch(/\S {2,}/)
}

describe('thyroid US: points per feature', () => {
  // "Cystic or almost completely cystic 0; spongiform 0; mixed cystic and solid 1; solid or almost completely solid 2."
  it.each([
    ['cystic', '0 pts'],
    ['spongiform', '0 pts'],
    ['mixed', '1 pt'],
    ['solid', '2 pts'],
    // "If shadowing calcification hides the inside, assume solid (2) and give 1 point for echogenicity."
    ['unknown', '2 pts'],
  ])('composition %s scores %s', (composition, points) => {
    expect(chips(study, 'composition', { composition }).Composition).toBe(points)
  })

  // "Anechoic 0 ...; hyperechoic or isoechoic 1; hypoechoic 2; very hypoechoic ... 3. If you cannot tell, give 1."
  it.each([
    ['anechoic', '0 pts'],
    ['hyperechoic', '1 pt'],
    ['isoechoic', '1 pt'],
    ['hypoechoic', '2 pts'],
    ['veryHypoechoic', '3 pts'],
    ['unknown', '1 pt'],
  ])('echogenicity %s scores %s', (echogenicity, points) => {
    expect(chips(study, 'echogenicity', { composition: 'solid', echogenicity }).Echogenicity).toBe(points)
  })

  // "Taller-than-wide on a transverse image scores 3."
  it.each([
    ['widerThanTall', '0 pts'],
    ['tallerThanWide', '3 pts'],
  ])('shape %s scores %s', (shape, points) => {
    expect(chips(study, 'shape', { composition: 'solid', shape }).Shape).toBe(points)
  })

  // "Smooth 0; ill-defined 0; cannot be determined 0 ... Lobulated or irregular 2 ... Extrathyroidal extension 3."
  it.each([
    ['smooth', '0 pts'],
    ['illDefined', '0 pts'],
    ['unknown', '0 pts'],
    ['lobulated', '2 pts'],
    ['extrathyroidal', '3 pts'],
  ])('margin %s scores %s', (margin, points) => {
    expect(chips(study, 'margin', { composition: 'solid', margin }).Margin).toBe(points)
  })

  // "None, or large comet-tail artifacts ...: 0. Macrocalcifications ...: 1. Peripheral (rim) calcifications ...: 2.
  //  Punctate echogenic foci ...: 3." Echogenic foci are "all that apply", so they add.
  it.each([
    [[], '0 pts'],
    [['comet'], '0 pts'],
    [['macrocalcification'], '1 pt'],
    [['rimCalcification'], '2 pts'],
    [['punctate'], '3 pts'],
    [['macrocalcification', 'punctate'], '4 pts'],
  ])('foci %j score %s', (foci, points) => {
    expect(chips(study, 'foci', { composition: 'solid', 'foci-present': 'present', foci })['Echogenic foci']).toBe(points)
  })

  it('large comet-tail artifacts are flagged as colloid', () => {
    expect(chips(study, 'foci', { composition: 'solid', 'foci-present': 'present', foci: ['comet'] })['Large comet-tail']).toBe('Colloid: 0 pts')
  })

  // "Spongiform: 0, and do not add points from the other categories." Quiz: a spongiform nodule with
  // tiny echogenic foci is TR1.
  it('spongiform ignores every other category', () => {
    const values = { ...tr5, composition: 'spongiform', 'foci-present': 'present', foci: ['punctate'] }
    expect(chips(study, 'category', values)).toMatchObject({ Points: '0', 'ACR TI-RADS': 'TR1' })
  })
})

describe('thyroid US: points to level', () => {
  // "0 points is TR1, 2 is TR2, 3 is TR3, 4 to 6 is TR4, 7 or more is TR5."
  it.each([
    [{ ...solid, composition: 'cystic', echogenicity: 'anechoic' }, '0', 'TR1'],
    [{ ...solid, composition: 'mixed' }, '2', 'TR2'],
    [tr3, '3', 'TR3'],
    [tr4, '4', 'TR4'],
    [{ ...solid, echogenicity: 'veryHypoechoic', 'foci-present': 'present', foci: ['macrocalcification'] }, '6', 'TR4'],
    [tr5, '7', 'TR5'],
  ])('%#: %s points is %s', (values, points, level) => {
    expect(chips(study, 'category', values)).toMatchObject({ Points: points, 'ACR TI-RADS': level })
  })

  it('withholds a level until every scored category is answered', () => {
    expect(chips(study, 'category', { ...tr4, 'foci-present': '' })).toEqual({})
  })
})

describe('thyroid US: size thresholds', () => {
  // "FNA if TR3 is 2.5 cm or more, TR4 1.5 cm or more, TR5 1 cm or more. Follow if TR3 is 1.5 cm or more,
  //  TR4 1 cm or more, TR5 0.5 cm or more."
  it.each([
    ['TR3', tr3, '1.49', 'Below follow-up size'],
    ['TR3', tr3, '1.5', 'Follow-up ultrasound'],
    ['TR3', tr3, '2.49', 'Follow-up ultrasound'],
    ['TR3', tr3, '2.5', 'FNA'],
    ['TR4', tr4, '0.99', 'Below follow-up size'],
    ['TR4', tr4, '1', 'Follow-up ultrasound'],
    ['TR4', tr4, '1.49', 'Follow-up ultrasound'],
    ['TR4', tr4, '1.5', 'FNA'],
    ['TR5', tr5, '0.49', 'Below follow-up size'],
    ['TR5', tr5, '0.5', 'Follow-up ultrasound'],
    ['TR5', tr5, '0.99', 'Follow-up ultrasound'],
    ['TR5', tr5, '1', 'FNA'],
  ])('%s at %s cm: %s', (_level, values, size, management) => {
    expect(chips(study, 'category', sized(values, size)).Management).toBe(management)
  })

  // The maximum dimension decides: "The maximum dimension decides whether the nodule is biopsied or followed."
  it('uses the largest of the three axes', () => {
    const values = { ...tr4, 'dim-ap': '1.2', 'dim-perp': '0.8', 'dim-long': '1.6' }
    expect(chips(study, 'size', values)['Maximum diameter']).toBe('1.6 cm')
    expect(chips(study, 'category', values).Management).toBe('FNA')
  })

  // TR1 and TR2: "No FNA", whatever the size.
  it.each([
    [{ ...solid, composition: 'cystic', echogenicity: 'anechoic' }],
    [{ ...solid, composition: 'mixed' }],
  ])('%# TR1 and TR2 are never sampled', (values) => {
    expect(chips(study, 'category', sized(values, '4')).Management).toBe('No FNA')
  })

  it('asks for the size before managing TR3 and above', () => {
    expect(chips(study, 'category', tr4).Management).toBe('Enter the size (Step 2)')
  })

  it('prints a size just under a threshold without rounding it up to the threshold', () => {
    expect(report(study, sized(tr3, '1.49')).text).toContain('1.49 cm: ACR TI-RADS TR3')
  })
})

describe('thyroid US: 5-9 mm TR5', () => {
  // "TR5 nodules of 5 to 9 mm ... FNA may be appropriate in some circumstances, by shared decision making.
  //  The report should then say whether the nodule can be measured reproducibly, and whether it abuts the
  //  trachea or lies next to the tracheoesophageal groove."
  it('asks the two questions only for a 5-9 mm TR5 nodule', () => {
    const small = report(study, sized(tr5, '0.7')).warnings
    expect(small).toContain('Can it be measured reproducibly on follow-up? not stated')
    expect(small).toContain('Abuts the trachea or next to the tracheoesophageal groove? not stated')
    for (const size of ['0.49', '1']) {
      const out = report(study, sized(tr5, size)).warnings
      expect(out.join('\n')).not.toMatch(/reproducibly|trachea/)
    }
    expect(report(study, sized(tr4, '0.7')).warnings.join('\n')).not.toMatch(/reproducibly|trachea/)
  })

  it('shows the shared-decision chip at 0.5 cm but not at 1 cm', () => {
    expect(chips(study, 'category', sized(tr5, '0.5'))['TR5, 5-9 mm']).toBe('FNA may be appropriate: shared decision')
    expect(chips(study, 'category', sized(tr5, '1'))['TR5, 5-9 mm']).toBeUndefined()
  })
})

describe('thyroid US: growth on comparison', () => {
  // "Significant enlargement is a 20% increase in at least two dimensions with a minimum increase of 2 mm,
  //  or a 50% or greater increase in volume."
  const growth = (now: [string, string, string], before: [string, string, string]) =>
    chips(study, 'comparison', {
      'dim-ap': now[0], 'dim-perp': now[1], 'dim-long': now[2],
      'prior-ap': before[0], 'prior-perp': before[1], 'prior-long': before[2],
    })['Growth (ACR)']

  it('20% in two dimensions is significant; just under 20% is not', () => {
    expect(growth(['1.2', '1.2', '1'], ['1', '1', '1'])).toBe('Significant enlargement')
    expect(growth(['1.19', '1.19', '1'], ['1', '1', '1'])).toBe('Not significant')
  })

  it('20% in only one dimension is not enough (volume under 50%)', () => {
    expect(growth(['1.4', '1', '1'], ['1', '1', '1'])).toBe('Not significant')
  })

  it('needs at least 2 mm in each of those dimensions', () => {
    // Third axis shrinks so the volume stays below +50%.
    expect(growth(['0.7', '0.7', '0.5'], ['0.5', '0.5', '1'])).toBe('Significant enlargement')
    expect(growth(['0.69', '0.69', '0.5'], ['0.5', '0.5', '1'])).toBe('Not significant')
  })

  it('50% volume increase is significant; 49% is not', () => {
    expect(growth(['1.5', '1', '1'], ['1', '1', '1'])).toBe('Significant enlargement')
    expect(growth(['1.49', '1', '1'], ['1', '1', '1'])).toBe('Not significant')
  })

  it('needs at least two paired measurements', () => {
    expect(chips(study, 'comparison', { 'dim-ap': '2', 'prior-ap': '1' })['Growth (ACR)']).toBeUndefined()
  })

  // "If the TI-RADS level has gone up, the next scan is in 1 year, whatever the starting level."
  it('an increased level means the next ultrasound in 1 year', () => {
    expect(chips(study, 'comparison', { 'level-change': 'increased' })['Level increased']).toBe('Next ultrasound in 1 year')
    expect(report(study, { ...sized(tr4, '1.2'), 'level-change': 'increased' }).text)
      .toContain('TI-RADS level has increased: next ultrasound in 1 year')
  })

  // "Imaging can stop at 5 years if the size has not changed. A nodule that has grown significantly but is
  //  still below its FNA size at 5 years probably needs continued follow-up."
  const followed = (years: string, now: string): Values => ({
    ...tr4, 'dim-ap': now, 'dim-perp': '1', 'dim-long': '1', 'prior-ap': '1.1', 'prior-perp': '1', 'prior-long': '1', years,
  })

  it('stops at 5 years without enlargement, not at 4.5', () => {
    expect(report(study, followed('5', '1.1')).text).toContain('Followed for 5 years without significant enlargement: imaging can stop')
    expect(report(study, followed('4.5', '1.1')).text).not.toContain('imaging can stop')
    expect(chips(study, 'comparison', followed('5', '1.1'))['5 years']).toBe('Can stop if size unchanged')
  })

  it('keeps following a nodule that grew but is still below its FNA size at 5 years', () => {
    // 1.1 to 1.45 cm and 1 to 1.25 cm: 20% and 2 mm in two axes, still under the TR4 FNA size of 1.5 cm.
    const values = { ...followed('5', '1.45'), 'dim-perp': '1.25' }
    const { text } = report(study, values)
    expect(text).toContain('Significant enlargement since the prior study.')
    expect(text).toContain('continued follow-up is probably warranted')
  })
})

describe('thyroid US: whole cases', () => {
  it('a simple cyst: TR1, no FNA', () => {
    const { text, warnings } = report(study, sized({ ...solid, composition: 'cystic', echogenicity: 'anechoic', number: '1' }, '1.2'))
    expect(text).toContain('Impression: Nodule 1, right lobe, mid pole, 1.2 cm: ACR TI-RADS TR1 (0 points).')
    expect(text).toContain('No FNA (TR1, benign).')
    expect(text).toContain('Cervical lymph nodes: no abnormal nodes')
    expect(warnings).toEqual([])
    noPlaceholders(text)
  })

  it('a 1.2 cm solid hypoechoic nodule: TR4, follow-up (quiz case)', () => {
    const { text } = report(study, sized(tr4, '1.2'))
    expect(text).toContain('ACR TI-RADS TR4 (4 points).')
    expect(text).toContain('Follow-up ultrasound recommended (TR4: follow if 1.0 cm or more, FNA if 1.5 cm or more); scans at 1, 2, 3 and 5 years.')
    noPlaceholders(text)
  })

  it('a 2 cm TR5 nodule with a suspicious node: FNA of both', () => {
    const values = {
      ...sized(tr5, '2'), side: 'left', level: 'lower', 'foci-present': 'present', foci: ['punctate'],
      nodes: 'abnormal', 'node-features': ['hilum', 'foci'], 'node-site': 'left level 4, 1.2 cm',
    }
    const { text, warnings } = report(study, values)
    expect(text).toContain('left lobe, lower pole, 2.0 cm: ACR TI-RADS TR5 (10 points).')
    expect(text).toContain('FNA recommended (TR5 FNA threshold 1.0 cm).')
    expect(text).toContain('Cervical lymph nodes: abnormal: loss of the echogenic hilum, punctate echogenic foci; left level 4, 1.2 cm')
    expect(text).toContain('FNA of the suspicious node recommended.')
    expect(warnings).toEqual([])
    noPlaceholders(text)
  })

  it('a 7 mm TR5 nodule: yearly follow-up, shared decision, and the two statements', () => {
    const { text, warnings } = report(study, { ...sized(tr5, '0.7'), reproducible: 'yes', critical: 'no' })
    expect(text).toContain('scans every year for up to 5 years.')
    expect(text).toContain('Biopsy of a 5-9 mm TR5 nodule may be appropriate in certain circumstances, by shared decision making')
    expect(text).toContain('It can be measured reproducibly on follow-up.')
    expect(text).toContain('It does not abut the trachea or the tracheoesophageal groove.')
    expect(warnings).toEqual([])
    noPlaceholders(text)
  })

  it('an isthmus nodule needs no level, and the report says isthmus', () => {
    const { text, warnings } = report(study, sized({ ...tr3, side: 'isthmus', level: '' }, '1'))
    expect(warnings.join('\n')).not.toContain('Level not stated')
    expect(text).toContain('Nodule: isthmus')
    expect(text).toContain('Below the TR3 follow-up size (1.5 cm): no FNA or follow-up.')
    noPlaceholders(text)
  })
})

describe('thyroid US: required items and contradictions', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    expect(warnings).toEqual(expect.arrayContaining([
      'Side not stated',
      'Level not stated',
      'Maximum dimension, axial image not stated',
      'Perpendicular to it, same axial image not stated',
      'Maximum longitudinal, sagittal image not stated',
      'Composition not stated',
      'Echogenicity (of the solid part) not stated',
      'Shape, on a transverse image not stated',
      'Margin not stated',
      'Echogenic foci not stated',
      'Cervical lymph nodes not stated',
    ]))
  })

  it('a spongiform nodule does not ask for the other four categories', () => {
    const { warnings } = report(study, { composition: 'spongiform' })
    expect(warnings.join('\n')).not.toMatch(/Echogenicity|Shape|Margin|Echogenic foci/)
  })

  // "Anechoic 0 (only for cystic or almost completely cystic nodules ...)"
  it('flags anechoic in a nodule that is not cystic', () => {
    expect(report(study, { composition: 'mixed', echogenicity: 'anechoic' }).warnings.join('\n')).toContain('Anechoic applies to cystic')
    expect(report(study, { composition: 'cystic', echogenicity: 'anechoic' }).warnings.join('\n')).not.toContain('Anechoic applies')
  })

  it('flags a cystic nodule scored other than anechoic', () => {
    expect(report(study, { composition: 'cystic', echogenicity: 'hypoechoic' }).warnings.join('\n')).toContain('scored anechoic (0 points)')
  })

  // "If shadowing calcification hides the inside, assume solid (2) and give 1 point for echogenicity."
  it('flags a shadowed nodule given an echogenicity other than 1 point', () => {
    expect(report(study, { composition: 'unknown', echogenicity: 'veryHypoechoic' }).warnings.join('\n')).toContain('Composition hidden by shadowing')
    expect(report(study, { composition: 'unknown', echogenicity: 'unknown' }).warnings.join('\n')).not.toContain('Composition hidden by shadowing')
  })

  // "A nodule can score 0 and be TR1, but every other nodule gets at least 2 points."
  it('flags a 1-point total', () => {
    const { warnings } = report(study, { ...solid, composition: 'mixed', echogenicity: 'anechoic' })
    expect(warnings.join('\n')).toContain('1 point total')
  })

  // "Minimal extension ... be cautious reporting it, especially in an otherwise benign-looking nodule."
  it('cautions on suspected minimal extension only in an otherwise benign-looking nodule', () => {
    const benignLooking = { ...solid, composition: 'mixed', margin: 'extrathyroidal', ete: 'minimal' } // 1 + 1 + 3 = 5
    expect(report(study, benignLooking).warnings.join('\n')).toContain('Suspected minimal extrathyroidal extension')
    const suspicious = { ...tr4, margin: 'extrathyroidal', ete: 'minimal' } // 4 + 3 = 7
    expect(report(study, suspicious).warnings.join('\n')).not.toContain('Suspected minimal extrathyroidal extension')
  })

  it('flags a perpendicular axis larger than the maximum axial one', () => {
    expect(report(study, { 'dim-ap': '1', 'dim-perp': '1.1' }).warnings.join('\n')).toContain('Swap them or remeasure')
    expect(report(study, { 'dim-ap': '1', 'dim-perp': '1' }).warnings.join('\n')).not.toContain('Swap them')
  })

  it('flags an abnormal node with no feature chosen', () => {
    expect(report(study, { nodes: 'abnormal' }).warnings).toContain('Abnormal node marked, but no abnormal feature selected.')
  })
})

describe('thyroid US: output text', () => {
  it.each([
    ['empty', {}],
    ['partial', { composition: 'solid', 'dim-long': '1.3' }],
    ['full with comparison', { ...sized(tr5, '0.8'), number: '2', position: 'posterior', 'prior-fna': 'yes', 'prior-date': 'US 12 March 2025', 'prior-ap': '0.6', 'prior-perp': '0.3', 'level-change': 'same', years: '2', other: 'Two further TR2 nodules.' }],
    ['frank invasion', { ...sized(tr4, '3'), margin: 'extrathyroidal', ete: 'extensive' }],
  ])('never prints placeholder text: %s', (_name, values) => {
    noPlaceholders(report(study, values as Values).text)
  })
})
