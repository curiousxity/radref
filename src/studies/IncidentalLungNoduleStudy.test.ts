import { describe, expect, it } from 'vitest'
import type { Values } from '../study/types'
import { chips, report, studyOf } from '../study/testing'
import { IncidentalLungNoduleStudyPage } from './IncidentalLungNoduleStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The quoted sentences are from the study's Learn tab
 * (Fleischner Society 2017, MacMahon et al., Radiology 2017, and its Table 1).
 */
const study = studyOf(IncidentalLungNoduleStudyPage)

/** A complete incidental, in-scope exam with a single solid nodule; override what the case is about. */
function nodule(extra: Values): Values {
  return {
    setting: 'incidental',
    age35: 'yes',
    immuno: 'no',
    cancer: 'no',
    coverage: 'complete',
    thickness: '1',
    type: 'solid',
    count: 'single',
    prior: 'none',
    risk: 'low',
    ...extra,
  }
}

/** A nodule of this mean diameter (both axes equal). */
function size(mm: string): Values {
  return { long: mm, short: mm }
}

function row(values: Values): string | undefined {
  return chips(study, 'risk', values)['Fleischner 2017']
}

function management(values: Values): string | undefined {
  return chips(study, 'risk', values)['Management']
}

function clean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  expect(text).not.toMatch(/ {2}/)
}

describe('incidental nodule: scope', () => {
  // "It does not apply to lung cancer screening (use Lung-RADS), to immunocompromised patients, or to patients with a known primary cancer."
  it.each([
    [{ setting: 'screening' }, 'lung cancer screening CT', 'Lung-RADS'],
    [{ age35: 'no' }, 'patient under 35', 'younger than 35'],
    [{ immuno: 'yes' }, 'immunocompromised', 'immunosuppressed'],
    [{ cancer: 'yes' }, 'known primary cancer', 'known primary malignancy'],
  ])('%o is outside the guideline', (extra, reason, wording) => {
    const values = nodule({ ...size('9'), ...extra })
    expect(chips(study, 'scope', values)['Fleischner 2017']).toBe(`Does not apply: ${reason}`)
    expect(row(values)).toBe('Outside Fleischner scope')
    expect(report(study, values).text).toContain(wording)
  })
  it('applies to an incidental nodule in an adult of 35 or older', () => {
    expect(chips(study, 'scope', nodule({}))['Fleischner 2017']).toBe('Applies')
  })
  it('says nothing until all four scope questions are answered', () => {
    expect(chips(study, 'scope', { setting: 'incidental', age35: 'yes', immuno: 'no' })).toEqual({})
  })
})

describe('incidental nodule: rounding', () => {
  // "A 5.4 mm average is 5 mm, below the threshold; a 5.5 mm average is 6 mm."
  it('5.8 x 5 mm (5.4 mm) rounds to 5 mm, under 6 mm', () => {
    const values = nodule({ long: '5.8', short: '5' })
    expect(chips(study, 'size', values)['Mean diameter']).toBe('5 mm (rounded)')
    expect(row(values)).toBe('No routine follow-up')
  })
  it('6 x 5 mm (5.5 mm) rounds to 6 mm, into 6-8 mm', () => {
    const values = nodule({ long: '6', short: '5' })
    expect(chips(study, 'size', values)['Mean diameter']).toBe('6 mm (rounded)')
    expect(row(values)).toBe('CT at 6-12 months')
  })
  // Quiz: "A solid nodule measures 7 mm × 4 mm ... 6 mm: the average rounded to the nearest millimetre."
  it('7 x 4 mm is 6 mm', () => {
    expect(chips(study, 'size', nodule({ long: '7', short: '4' }))['Mean diameter']).toBe('6 mm (rounded)')
  })
})

describe('incidental nodule: solid, single', () => {
  // "Solid, single, low risk: under 6 mm no routine follow-up; 6–8 mm CT at 6–12 months, then consider CT at 18–24 months; over 8 mm consider CT, PET/CT, or tissue sampling at 3 months."
  it.each([
    ['5', 'No routine follow-up', 'Under 6 mm (<100 mm³)'],
    ['6', 'CT at 6-12 months', '6–8 mm (100–250 mm³)'],
    ['8', 'CT at 6-12 months', '6–8 mm (100–250 mm³)'],
    ['9', 'CT at 3 months, PET/CT, or sampling', 'Over 8 mm (>250 mm³)'],
  ])('low risk %s mm: %s', (mm, expected, band) => {
    const values = nodule(size(mm))
    expect(row(values)).toBe(expected)
    expect(chips(study, 'size', values)['Size band']).toBe(band)
  })
  it('low risk 6-8 mm: "then consider CT at 18-24 months"', () => {
    expect(management(nodule(size('7')))).toBe('CT at 6-12 months, then consider CT at 18-24 months.')
  })
  // "Solid, single, high risk: under 6 mm optional CT at 12 months; 6–8 mm CT at 6–12 months, then CT at 18–24 months."
  it.each([
    ['5', 'Optional CT at 12 months'],
    ['6', 'CT at 6-12 months'],
    ['9', 'CT at 3 months, PET/CT, or sampling'],
  ])('high risk %s mm: %s', (mm, expected) => {
    expect(row(nodule({ risk: 'high', ...size(mm) }))).toBe(expected)
  })
  it('high risk 6-8 mm: "then CT at 18-24 months", not "consider"', () => {
    expect(management(nodule({ risk: 'high', ...size('7') }))).toBe('CT at 6-12 months, then CT at 18-24 months.')
  })
  it('waits for the risk category rather than assuming low risk', () => {
    const values = nodule({ risk: '', ...size('5') })
    expect(row(values)).toBeUndefined()
    expect(report(study, values).warnings).toContain('Clinical risk (ACCP) not stated')
    expect(report(study, values).text).not.toContain('Impression')
  })
})

describe('incidental nodule: solid, multiple', () => {
  // "Solid, multiple, low risk: under 6 mm no routine follow-up; 6–8 mm and over 8 mm CT at 3–6 months, then consider CT at 18–24 months."
  it.each([
    ['low', '5', 'No routine follow-up'],
    ['low', '6', 'CT at 3-6 months'],
    ['low', '9', 'CT at 3-6 months'],
    ['high', '5', 'Optional CT at 12 months'],
    ['high', '6', 'CT at 3-6 months'],
  ])('%s risk %s mm: %s', (risk, mm, expected) => {
    expect(row(nodule({ count: 'multiple', risk, ...size(mm) }))).toBe(expected)
  })
  // "With several nodules, manage by the most suspicious one, which may not be the largest."
  it('names the most suspicious nodule in the impression', () => {
    const values = nodule({ count: 'multiple', ...size('7'), dominant: '5 mm spiculated left upper lobe nodule' })
    expect(chips(study, 'type', values)['Multiple']).toBe('Manage by the most suspicious nodule (may not be the largest)')
    expect(report(study, values).text).toContain('Management follows the most suspicious nodule: 5 mm spiculated left upper lobe nodule.')
  })
})

describe('incidental nodule: subsolid', () => {
  // "Ground glass, single: under 6 mm no routine follow-up; 6 mm or more CT at 6–12 months to confirm persistence, then CT every 2 years until 5 years."
  it.each([
    ['5', 'No routine follow-up', 'Under 6 mm'],
    ['6', 'CT at 6-12 months', '6 mm or more'],
  ])('ground glass %s mm: %s', (mm, expected, band) => {
    const values = nodule({ type: 'groundGlass', risk: '', ...size(mm) })
    expect(row(values)).toBe(expected)
    expect(chips(study, 'size', values)['Size band']).toBe(band)
  })
  // "Risk only matters for solid nodules."
  it('does not ask for a risk category for a subsolid nodule', () => {
    const values = nodule({ type: 'groundGlass', risk: '', ...size('8') })
    expect(report(study, values).warnings).not.toContain('Clinical risk (ACCP) not stated')
    expect(chips(study, 'type', values)['Subsolid']).toBe('Risk category does not change management')
  })
  // "Part solid, single: under 6 mm no routine follow-up; 6 mm or more CT at 3–6 months to confirm persistence. If unchanged and the solid component remains under 6 mm, annual CT for 5 years."
  it('part solid under 6 mm total: no routine follow-up, treated like ground glass', () => {
    const values = nodule({ type: 'partSolid', ...size('5'), solid: '2' })
    expect(row(values)).toBe('No routine follow-up')
    expect(chips(study, 'size', values)['Part solid under 6 mm']).toBe('Treat like ground glass')
  })
  // "Part solid, solid component 6 mm or more: ... consider short-term CT at 3–6 months ... PET/CT, biopsy or resection for ... a solid component over 8 mm."
  it.each([
    ['5', 'CT at 3-6 months', 'Under 6 mm'],
    ['6', 'CT at 3-6 months; highly suspicious if persistent', '6–8 mm: consider CT at 3–6 months; highly suspicious if persistent'],
    ['8', 'CT at 3-6 months; highly suspicious if persistent', '6–8 mm: consider CT at 3–6 months; highly suspicious if persistent'],
    ['9', 'PET/CT, biopsy, or resection', 'Over 8 mm: PET/CT, biopsy or resection recommended'],
  ])('part solid 12 mm, solid %s mm: %s', (solid, expected, chip) => {
    const values = nodule({ type: 'partSolid', ...size('12'), solid })
    expect(row(values)).toBe(expected)
    expect(chips(study, 'size', values)['Solid component']).toBe(chip)
  })
  it('part solid with lobulated margins is flagged as particularly suspicious', () => {
    expect(chips(study, 'type', nodule({ type: 'partSolid', features: ['lobulated'] }))['Part solid']).toBe('Particularly suspicious morphology')
  })
  // "Subsolid, multiple: under 6 mm CT at 3–6 months. If stable, consider CT at 2 and 4 years; 6 mm or more CT at 3–6 months. Then manage by the most suspicious nodule."
  it('multiple subsolid under 6 mm', () => {
    const values = nodule({ type: 'groundGlass', count: 'multiple', ...size('5') })
    expect(row(values)).toBe('CT at 3-6 months')
    expect(management(values)).toContain('consider CT at 2 and 4 years')
  })
  it('multiple subsolid 6 mm or more', () => {
    const values = nodule({ type: 'partSolid', count: 'multiple', ...size('6') })
    expect(row(values)).toBe('CT at 3-6 months')
    expect(management(values)).toContain('most suspicious nodule')
  })
})

describe('incidental nodule: images', () => {
  // "Use contiguous thin sections, 1.5 mm or less (typically 1.0 mm)."
  it('1.5 mm is thin enough', () => {
    expect(chips(study, 'images', nodule({ thickness: '1.5' }))['Sections']).toBe('Thin enough (1.5 mm or less)')
  })
  it('1.6 mm is too thick, and the impression suggests a thin-section baseline', () => {
    const values = nodule({ thickness: '1.6', ...size('5') })
    expect(chips(study, 'images', values)['Sections']).toBe('Too thick: consider short-term thin-section CT as a baseline')
    expect(report(study, values).text).toContain('Sections thicker than 1.5 mm')
  })
  // "If the nodule is on a partial chest CT (abdomen, neck, heart): under 6 mm needs nothing further; 6–8 mm needs a complete chest CT at 3–12 months ...; a large or very suspicious nodule needs a complete chest CT now." Bueno: "large" is over 8 mm.
  it.each([
    ['5', 'No further investigation for a nodule under 6 mm.'],
    ['6', 'Follow-up CT of the complete chest at 3–12 months, depending on clinical risk, unless a prior study shows stability.'],
    ['8', 'Follow-up CT of the complete chest at 3–12 months, depending on clinical risk, unless a prior study shows stability.'],
    ['9', 'Proceed with a complete thoracic CT.'],
  ])('partial CT, %s mm', (mm, advice) => {
    const values = nodule({ coverage: 'partial', ...size(mm) })
    expect(chips(study, 'images', values)['Incomplete chest CT']).toBe(advice)
    expect(report(study, values).text).toContain(`Nodule seen on an incomplete thoracic CT. ${advice}`)
  })
})

describe('incidental nodule: benign features', () => {
  // "A benign calcification pattern ... or fat (a hamartoma): no follow-up."
  it.each([['calcified'], ['fat']])('%s needs no follow-up', (feature) => {
    const values = nodule({ benign: [feature], ...size('12') })
    expect(chips(study, 'benign', values)['Benign features']).toBe('No follow-up for this nodule')
    expect(report(study, values).text).toContain('No imaging follow-up is required.')
  })
  // "That is an intrapulmonary lymph node, and needs no follow-up even if it is over 6 mm."
  it('a typical perifissural nodule of 7 mm needs no follow-up', () => {
    const values = nodule({ benign: ['lymph-node'], ...size('7') })
    expect(chips(study, 'benign', values)['Perifissural']).toBe('No follow-up, even above 6 mm')
    expect(row(values)).toBe('No routine follow-up')
  })
  // "A spiculated border, a displaced fissure, or a cancer history: consider CT at 6–12 months."
  it.each([['spiculated'], ['fissure']])('a perifissural nodule that is %s is atypical', (feature) => {
    const values = nodule({ benign: ['lymph-node'], features: [feature], ...size('7') })
    expect(chips(study, 'benign', values)['Perifissural']).toBe('Atypical: consider CT at 6–12 months')
    expect(report(study, values).text).toContain('follow-up CT at 6–12 months should be considered')
  })
})

describe('incidental nodule: comparison', () => {
  const compared = (extra: Values) => nodule({ ...size('7'), 'prior-date': 'CT 12 March 2024', 'prior-months': '12', ...extra })
  // "Growth is an increase of 2 mm or more."
  it('+2 mm is growth', () => {
    const values = compared({ prior: 'grown', 'prior-size': '5' })
    expect(chips(study, 'prior', values)['Change']).toBe('+2 mm: growth (2 mm or more)')
    expect(report(study, values).text).toContain('Interval growth of 2 mm in mean diameter.')
  })
  it('+1 mm is under the growth threshold', () => {
    expect(chips(study, 'prior', compared({ prior: 'stable', 'prior-size': '6' }))['Change']).toBe('+1 mm: under the 2 mm growth threshold')
  })
  it('the prior size is rounded too: 5.4 mm is 5 mm, so 7 mm is +2', () => {
    expect(chips(study, 'prior', compared({ prior: 'grown', 'prior-size': '5.4' }))['Change']).toBe('+2 mm: growth (2 mm or more)')
  })
  // "A well-defined solid nodule with benign morphology that is unequivocally stable at 12–18 months can optionally stop being followed."
  it('stable at 12 months may stop follow-up', () => {
    const values = compared({ prior: 'stable', 'prior-size': '7' })
    expect(chips(study, 'prior', values)['Stable 12 months or more']).toBe('Follow-up may optionally stop (well-defined, benign morphology)')
    expect(report(study, values).text).toContain('follow-up may optionally be discontinued')
  })
  it('stable at 11 months does not', () => {
    expect(chips(study, 'prior', compared({ prior: 'stable', 'prior-size': '7', 'prior-months': '11' }))['Stable 12 months or more']).toBeUndefined()
  })
  it('not for a spiculated nodule', () => {
    expect(chips(study, 'prior', compared({ prior: 'stable', 'prior-size': '7', features: ['spiculated'] }))['Stable 12 months or more']).toBeUndefined()
  })
  it('not for a subsolid nodule, which is followed longer', () => {
    expect(chips(study, 'prior', compared({ type: 'groundGlass', prior: 'stable', 'prior-size': '7' }))['Stable 12 months or more']).toBeUndefined()
  })
})

describe('incidental nodule: whole cases', () => {
  it('a small solid nodule in a low-risk patient', () => {
    const { text, warnings } = report(study, nodule({ long: '5', short: '4', location: 'right lower lobe, series 4 image 200' }))
    expect(text).toContain('Technique: Complete chest CT; thinnest sections 1 mm; comparison: none')
    expect(text).toContain('Nodule: single solid nodule; location right lower lobe, series 4 image 200')
    expect(text).toContain('Size: 5 × 4 mm (mean 5 mm)')
    expect(text).toContain('Per Fleischner Society 2017 recommendations, no routine imaging follow-up is required.')
    expect(warnings).toEqual([])
    clean(text)
  })
  it('a 7 mm solid nodule in a high-risk smoker', () => {
    const { text, warnings } = report(study, nodule({ risk: 'high', 'risk-factors': ['smoking', 'upper'], long: '8', short: '6' }))
    expect(text).toContain('Risk: high (5% or more); risk factors: smoking: 30 pack-years or more, current or quit within 15 years, upper lobe location')
    expect(text).toContain('follow-up CT at 6-12 months, then CT at 18-24 months.')
    expect(warnings).toEqual([])
    clean(text)
  })
  it('a part-solid nodule with a large solid component', () => {
    const { text } = report(study, nodule({ type: 'partSolid', risk: '', long: '16', short: '12', solid: '10', features: ['lobulated'] }))
    expect(text).toContain('solid component 10 mm')
    expect(text).toContain('with a 10 mm solid component')
    expect(text).toContain('PET/CT, biopsy, or resection are recommended.')
    clean(text)
  })
  it('an 8 mm pure ground-glass nodule', () => {
    const { text } = report(study, nodule({ type: 'groundGlass', risk: '', ...size('8') }))
    expect(text).toContain('Incidental pure ground-glass pulmonary nodule measuring 8 mm.')
    expect(text).toContain('then CT every 2 years until 5 years')
    clean(text)
  })
})

describe('incidental nodule: required items', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    expect(warnings).toEqual(expect.arrayContaining([
      'Why was the CT done? not stated',
      'Patient age not stated',
      'Immunocompromised? not stated',
      'Known primary cancer? not stated',
      'Lung coverage not stated',
      'Thinnest sections available not stated',
      'Nodule type not stated',
      'Number of nodules not stated',
      'Long axis (largest nodule if several) not stated',
      'Short axis, same image not stated',
      'Compared with prior imaging not stated',
    ]))
  })
  it('asks for the risk of a solid nodule and the solid component of a single part-solid one', () => {
    expect(report(study, { type: 'solid' }).warnings).toContain('Clinical risk (ACCP) not stated')
    expect(report(study, { type: 'partSolid', count: 'single' }).warnings).toContain('Solid component, largest diameter not stated')
    expect(report(study, { type: 'partSolid', count: 'multiple' }).warnings).not.toContain('Solid component, largest diameter not stated')
  })
})

describe('incidental nodule: contradictions', () => {
  it('short axis larger than long axis', () => {
    expect(report(study, nodule({ long: '5', short: '6' })).warnings).toContain('The short axis is larger than the long axis. Check the measurements.')
  })
  it('a lymph node marked ground glass', () => {
    expect(report(study, nodule({ type: 'groundGlass', benign: ['lymph-node'], ...size('6') })).warnings).toContain('A typical intrapulmonary lymph node is a solid nodule, but the nodule is marked pure ground glass.')
  })
  // Table 1: "Consider all relevant risk factors."
  it('low risk with risk factors present', () => {
    const { warnings } = report(study, nodule({ ...size('5'), 'risk-factors': ['emphysema'], features: ['spiculated'] }))
    expect(warnings).toContain('Low risk is selected, but these risk factors are present: emphysema, spiculated margin. The guideline says to consider all relevant risk factors.')
  })
  it('marked stable but grown 2 mm', () => {
    expect(report(study, nodule({ ...size('7'), prior: 'stable', 'prior-size': '5' })).warnings).toContain('Marked stable, but the mean diameter is 2 mm larger than on the prior (2 mm or more is growth).')
  })
  it('marked grown but under 2 mm', () => {
    expect(report(study, nodule({ ...size('7'), prior: 'grown', 'prior-size': '6' })).warnings).toContain('Marked grown, but the mean diameter has changed by 1 mm (under the 2 mm growth threshold).')
  })
  it('a solid component larger than the nodule', () => {
    const { text, warnings } = report(study, nodule({ type: 'partSolid', long: '10', short: '8', solid: '11' }))
    expect(warnings).toContain('The solid component cannot be larger than the nodule itself. Check both measurements.')
    expect(text).not.toContain('Impression')
  })
})

describe('incidental nodule: no placeholder text', () => {
  it.each([
    ['empty form', {}],
    ['scope only', { setting: 'screening' }],
    ['every field', nodule({ type: 'partSolid', count: 'single', location: 'LUL', features: ['cystic', 'lobulated'], long: '14', short: '10', solid: '7', prior: 'grown', 'prior-date': 'CT 2024', 'prior-months': '12', 'prior-size': '9', 'risk-factors': ['family'], thickness: '2.5', coverage: 'partial' })],
    ['multiple without a size', { type: 'groundGlass', count: 'multiple', prior: 'new' }],
  ])('%s', (_name, values) => {
    clean(report(study, values).text)
    for (const warning of report(study, values).warnings) clean(warning)
  })
})
