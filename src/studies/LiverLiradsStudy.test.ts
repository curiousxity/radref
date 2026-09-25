import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { LiverLiradsStudyPage } from './LiverLiradsStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The quoted sentences are from the study's Learn tab
 * (ACR CT/MRI LI-RADS v2018 core and the nonradiation TRA v2024).
 */
const study = studyOf(LiverLiradsStudyPage)

/** An untreated, categorizable observation in a patient with cirrhosis, with no feature yet. */
const base: Values = {
  risk: 'cirrhosis',
  modality: 'eca',
  status: 'untreated',
  present: 'yes',
  'obs-id': '1',
  segment: '7',
  image: 'series 8, image 42',
  nc: 'ok',
  tiv: 'absent',
  benign: 'no',
  aphe: 'no',
  washout: 'no',
  capsule: 'no',
  growth: 'noprior',
}

type Features = { aphe?: boolean; washout?: boolean; capsule?: boolean; growth?: boolean }

function observation(size: string, f: Features = {}, extra: Values = {}): Values {
  return {
    ...base,
    size,
    aphe: f.aphe ? 'yes' : 'no',
    washout: f.washout ? 'yes' : 'no',
    capsule: f.capsule ? 'yes' : 'no',
    growth: f.growth ? 'yes' : 'noprior',
    ...extra,
  }
}

const table = (values: Values) => chips(study, 'major', values)['Diagnostic table']
const final = (values: Values) => chips(study, 'final', values)['Final category']

/** The report's lines are indented on purpose; inside a line there is never a double space. */
function noPlaceholders(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  for (const line of text.split('\n')) expect(line.trimStart()).not.toMatch(/ {2,}/)
}

describe('LI-RADS: diagnostic table, no APHE', () => {
  // Table: "No APHE, < 20 mm": none LR-3, one LR-3, two or more LR-4; "No APHE, ≥ 20 mm": none LR-3, one or more LR-4.
  it.each([
    ['19.9', {}, 'LR-3'],
    ['19.9', { washout: true }, 'LR-3'],
    ['19.9', { washout: true, capsule: true }, 'LR-4'],
    ['20', {}, 'LR-3'],
    ['20', { washout: true }, 'LR-4'],
    ['20', { capsule: true, growth: true }, 'LR-4'],
  ])('%s mm %j is %s', (size, f, category) => {
    expect(table(observation(size, f))).toBe(category)
  })

  // "No APHE never reaches LR-5."
  it('never reaches LR-5, even with all three additional features', () => {
    expect(table(observation('50', { washout: true, capsule: true, growth: true }))).toBe('LR-4')
  })
})

describe('LI-RADS: diagnostic table, nonrim APHE', () => {
  // Table: "Nonrim APHE, < 10 mm": none LR-3, one LR-4, two or more LR-4.
  // "10–19 mm with APHE: one extra feature gives LR-4 if it is capsule, LR-5 if washout or threshold growth.
  //  20 mm or more with APHE: any extra feature gives LR-5, none gives LR-4."
  it.each([
    ['9.9', {}, 'LR-3'],
    ['9.9', { washout: true }, 'LR-4'],
    ['9.9', { washout: true, capsule: true, growth: true }, 'LR-4'],
    ['10', {}, 'LR-3'],
    ['10', { capsule: true }, 'LR-4'],
    ['10', { washout: true }, 'LR-5'],
    ['10', { growth: true }, 'LR-5'],
    ['10', { capsule: true, washout: true }, 'LR-5'],
    ['19.9', {}, 'LR-3'],
    ['19.9', { capsule: true }, 'LR-4'],
    ['20', {}, 'LR-4'],
    ['20', { capsule: true }, 'LR-5'],
  ])('%s mm %j is %s', (size, f, category) => {
    expect(table(observation(size, { aphe: true, ...f }))).toBe(category)
  })

  // "In the USA, that 10–19 mm APHE-plus-washout LR-5 does not count as OPTN Class 5."
  it('flags the 10-19 mm APHE-plus-washout LR-5 as not OPTN Class 5, only in that cell', () => {
    expect(chips(study, 'major', observation('15', { aphe: true, washout: true }))['OPTN (USA)']).toBe('LR-5 but not OPTN Class 5')
    expect(chips(study, 'major', observation('15', { aphe: true, washout: true, capsule: true }))['OPTN (USA)']).toBeUndefined()
    expect(chips(study, 'major', observation('20', { aphe: true, washout: true }))['OPTN (USA)']).toBeUndefined()
    expect(chips(study, 'major', observation('9.9', { aphe: true, washout: true }))['OPTN (USA)']).toBeUndefined()
  })

  // "If unsure whether a major feature is there, call it absent": only "yes" counts.
  it('counts an unanswered feature as absent', () => {
    expect(table({ ...observation('25', { aphe: true }), washout: '', capsule: '' })).toBe('LR-4')
  })
})

describe('LI-RADS: size bands', () => {
  it.each([
    ['9.9', 'under 10 mm'],
    ['10', '10–19 mm'],
    ['19.9', '10–19 mm'],
    ['20', '20 mm or more'],
  ])('%s mm is %s', (size, band) => {
    expect(chips(study, 'observation', observation(size))['Size band']).toBe(band)
  })
})

describe('LI-RADS: threshold growth', () => {
  // "Threshold growth: size increase of a mass by 50% or more in 6 months or less."
  const byNumbers = (size: string, prior: string, months: string) =>
    chips(study, 'major', observation(size, {}, { growth: 'no', 'prior-size': prior, 'prior-months': months }))['Growth by numbers']

  it.each([
    ['15', '10', '6', 'Threshold growth'],
    ['15', '10.1', '6', 'Below threshold'],
    ['15', '10', '6.1', 'Below threshold'],
    // "100% growth over more than 6 months is now subthreshold growth, an ancillary feature."
    ['20', '10', '12', 'Below threshold'],
  ])('%s mm from %s mm in %s months: %s', (size, prior, months, result) => {
    expect(byNumbers(size, prior, months)).toBe(result)
  })

  it('warns when the numbers and the answer disagree', () => {
    const meets = observation('15', {}, { growth: 'no', 'prior-size': '10', 'prior-months': '6' })
    expect(report(study, meets).warnings.join('\n')).toContain('meet threshold growth (50% or more in 6 months or less), but threshold growth is marked no')
    const below = observation('15', {}, { growth: 'yes', 'prior-size': '10', 'prior-months': '7' })
    expect(report(study, below).warnings.join('\n')).toContain('do not reach 50% in 6 months or less')
    const agrees = observation('15', { growth: true }, { 'prior-size': '10', 'prior-months': '6' })
    expect(report(study, agrees).warnings.join('\n')).not.toMatch(/threshold growth is marked|do not reach 50%/)
  })
})

describe('LI-RADS: algorithm order', () => {
  // "not categorizable, then tumor in vein, then benign, then LR-M, and only then the diagnostic table."
  it('LR-NC comes first', () => {
    expect(final(observation('25', { aphe: true, washout: true }, { nc: 'nc', 'nc-reason': 'motion' }))).toBe('LR-NC')
  })

  // "Unequivocal enhancing soft tissue in a vein, whether or not you can see a parenchymal mass, is LR-TIV."
  it('tumor in vein overrides the table and the benign call', () => {
    expect(final(observation('25', { aphe: true, washout: true }, { tiv: 'present', 'tiv-vein': 'right portal vein' }))).toBe('LR-TIV')
    expect(final(observation('25', {}, { tiv: 'present', benign: 'lr1' }))).toBe('LR-TIV')
  })

  // "'may be due to non-HCC malignancy' if it touches an LR-M mass, 'definitely due to HCC' if it touches an
  //  LR-5 mass, otherwise 'probably due to HCC.'"
  it.each([
    [observation('30', {}, { tiv: 'present', 'lrm-target': ['rim'] }), 'may be due to non-HCC malignancy'],
    [observation('25', { aphe: true, washout: true }, { tiv: 'present' }), 'definitely due to HCC'],
    [observation('25', { aphe: true }, { tiv: 'present' }), 'probably due to HCC'],
    [{ ...base, tiv: 'present' }, 'probably due to HCC'],
  ])('%# tumor in vein etiology: %s', (values, etiology) => {
    expect(chips(study, 'tiv', values).Etiology).toBe(etiology)
  })

  // "Definite ones are LR-1, probable ones LR-2."
  it('the benign call comes before the table', () => {
    expect(final(observation('25', { aphe: true, washout: true }, { benign: 'lr1' }))).toBe('LR-1')
    expect(final(observation('15', {}, { benign: 'lr2' }))).toBe('LR-2')
  })

  // "Any targetoid mass is LR-M."
  it('a targetoid mass is LR-M even with LR-5 features', () => {
    expect(final(observation('30', { aphe: true, washout: true, capsule: true }, { 'lrm-target': ['peripheral'] }))).toBe('LR-M')
  })

  // "A nontargetoid mass is LR-M if it has ... but only if it does not meet LR-5 criteria."
  it('a nontargetoid LR-M feature gives LR-M only if the mass does not meet LR-5', () => {
    const lr5 = observation('25', { aphe: true, washout: true }, { 'lrm-other': ['marked-dwi'] })
    expect(final(lr5)).toBe('LR-5')
    expect(chips(study, 'lrm', lr5)['LR-M']).toBe('No: meets LR-5 criteria')
    const lr4 = observation('25', { aphe: true }, { 'lrm-other': ['marked-dwi'] })
    expect(final(lr4)).toBe('LR-M')
  })

  // LR-M etiology, core p23 as the Learn tab quotes it.
  it.each([
    [{ 'lrm-other': ['infiltrative'] }, 'probably represents HCC'],
    [{ 'lrm-target': ['rim'], hepatocellular: 'yes' }, 'may represent HCC with atypical features or cHCC-CCA'],
    [{ 'lrm-target': ['rim'] }, 'most likely represents iCCA, cHCC-CCA, or HCC with atypical features'],
    [{ 'lrm-other': ['necrosis'] }, 'etiology uncertain'],
  ])('%# LR-M etiology: %s', (extra, etiology) => {
    expect(chips(study, 'lrm', observation('30', {}, extra))['Most likely']).toBe(etiology)
  })
})

describe('LI-RADS: ancillary features', () => {
  // "One or more favoring malignancy upgrade by one category, up to LR-4; they can never make LR-5. One or more
  //  favoring benignity downgrade by one. If both kinds are present, do not adjust."
  const malignant = { 'af-malignant': ['dwi'] }
  const benign = { 'af-benign': ['marked-t2'] }

  it.each([
    ['LR-2 up to LR-3', observation('15', {}, { benign: 'lr2', ...malignant }), 'LR-3'],
    ['LR-3 up to LR-4', observation('15', {}, malignant), 'LR-4'],
    ['LR-4 stays LR-4', observation('25', { aphe: true }, malignant), 'LR-4'],
    ['LR-5 stays LR-5', observation('25', { aphe: true, washout: true }, malignant), 'LR-5'],
    ['LR-3 down to LR-2', observation('15', {}, benign), 'LR-2'],
    ['LR-5 down to LR-4', observation('25', { aphe: true, washout: true }, benign), 'LR-4'],
    ['LR-1 stays LR-1', observation('15', {}, { benign: 'lr1', ...benign }), 'LR-1'],
    ['both kinds: LR-3 stays LR-3', observation('15', {}, { ...malignant, ...benign }), 'LR-3'],
    ['LR-M is not adjusted', observation('30', {}, { 'lrm-target': ['rim'], ...benign }), 'LR-M'],
  ])('%s', (_name, values, category) => {
    expect(final(values)).toBe(category)
  })

  it('says why it did not upgrade LR-4', () => {
    expect(chips(study, 'ancillary', observation('25', { aphe: true }, malignant))['Ancillary features']).toBe('Ancillary features cannot upgrade to LR-5')
    expect(chips(study, 'ancillary', observation('15', {}, { ...malignant, ...benign }))['Ancillary features']).toBe('Conflicting ancillary features: category not adjusted')
  })
})

describe('LI-RADS: who it applies to', () => {
  // "Do not apply it under 18, without those risk factors, or in cirrhosis from congenital hepatic fibrosis or a vascular disorder."
  it.each(['none', 'excluded'])('risk "%s": no category', (risk) => {
    const values = observation('25', { aphe: true, washout: true }, { risk })
    expect(final(values)).toBeUndefined()
    expect(chips(study, 'final', values).Category).toBe('Not assigned: LI-RADS does not apply')
    const { text, warnings } = report(study, values)
    expect(text).toContain('LI-RADS: does not apply in this patient; LI-RADS categories are not assigned.')
    expect(text).not.toContain('Impression:')
    expect(warnings.join('\n')).toContain('LI-RADS does not apply in this patient')
  })

  it.each(['cirrhosis', 'hbv', 'hcc'])('risk "%s": applies', (risk) => {
    expect(chips(study, 'applies', { risk })['LI-RADS']).toBe('Applies')
  })

  // "If the patient has cirrhosis or chronic hepatitis B, this meets criteria for LR-5" (v2018 core FAQ).
  it('not sure of cirrhosis: a conditional category', () => {
    const { text } = report(study, observation('25', { aphe: true, washout: true }, { risk: 'unsure' }))
    expect(text).toContain('If the patient has cirrhosis or chronic hepatitis B, this meets criteria for LR-5, definitely HCC.')
  })

  // "Another active primary cancer lowers the positive predictive value of LR-5. If in doubt, call it LR-M."
  it('warns on LR-5 with an active extrahepatic primary', () => {
    const lr5 = observation('25', { aphe: true, washout: true }, { extrahepatic: 'yes' })
    expect(report(study, lr5).warnings.join('\n')).toContain('assign LR-5 with caution')
    expect(report(study, observation('25', { aphe: true }, { extrahepatic: 'yes' })).warnings.join('\n')).not.toContain('assign LR-5 with caution')
  })

  it('gadoxetate: washout in the portal venous phase only', () => {
    expect(chips(study, 'applies', { modality: 'hba' }).Gadoxetate).toBe('"Washout" in portal venous phase only')
  })
})

describe('LI-RADS: treatment response (nonradiation TRA v2024)', () => {
  const treated = (extra: Values): Values => ({
    risk: 'hcc', modality: 'eca', status: 'treated', present: 'yes', 'obs-id': '2', segment: '8', image: 'series 5, image 30',
    'tr-type': 'thermal', 'tr-pre-category': 'LR-5', 'tr-pre-size': '52', ...extra,
  })
  const tr = (values: Values) => chips(study, 'final', values).Category

  // "None is Nonviable; uncertain is Equivocal (Viable if diffusion restriction or mild-moderate T2 hyperintensity
  //  sits in that area, MRI only); present is Viable."
  it.each([
    [{ 'tr-masslike': 'ne' }, 'LR-TR Nonevaluable'],
    [{ 'tr-masslike': 'none' }, 'LR-TR Nonviable'],
    [{ 'tr-masslike': 'uncertain', 'tr-size': '10' }, 'LR-TR Equivocal'],
    [{ 'tr-masslike': 'uncertain', 'tr-size': '10', 'tr-af': ['dwi'] }, 'LR-TR Viable'],
    [{ 'tr-masslike': 'uncertain', 'tr-size': '10', 'tr-af': ['t2'], modality: 'hba' }, 'LR-TR Viable'],
    [{ 'tr-masslike': 'uncertain', 'tr-size': '10', 'tr-af': ['dwi'], modality: 'ct' }, 'LR-TR Equivocal'],
    [{ 'tr-masslike': 'present', 'tr-size': '23' }, 'LR-TR Viable'],
  ])('%j is %s', (extra, category) => {
    expect(tr(treated(extra))).toBe(category)
  })

  it('warns that the MRI ancillary features were not used on CT', () => {
    const { warnings } = report(study, treated({ modality: 'ct', 'tr-masslike': 'uncertain', 'tr-size': '10', 'tr-af': ['dwi'] }))
    expect(warnings.join('\n')).toContain('Ancillary features favoring viability apply only to MRI')
  })

  // "Report the pretreatment category and size too, as in 'LR-TR Viable 2.3 cm (previously LR-5, 5.2 cm)'."
  it('reports the viable size with the pretreatment category and size', () => {
    const { text } = report(study, treated({ 'tr-masslike': 'present', 'tr-size': '23' }))
    expect(text).toContain('Impression: Treated lesion 2, segment 8: LR-TR Viable 23 mm (v2024) (previously LR-5, 52 mm).')
    expect(text).toContain('Multidisciplinary discussion for consensus management, which often includes retreatment.')
    noPlaceholders(text)
  })

  it('nonviable: continue monitoring in 3 months, no size', () => {
    const { text } = report(study, treated({ 'tr-masslike': 'none' }))
    expect(text).toContain('LR-TR Nonviable (v2024)')
    expect(text).toContain('Continue monitoring in 3 months')
    noPlaceholders(text)
  })

  // "After TARE or SBRT use the radiation algorithm."
  it('after radiation-based treatment, points to the radiation TRA', () => {
    const values = treated({ 'tr-type': 'radiation', 'tr-masslike': 'present' })
    expect(tr(values)).toBeUndefined()
    expect(chips(study, 'final', values).Algorithm).toBe('Use the radiation TRA')
    const { text, warnings } = report(study, values)
    expect(text).toContain('apply the LI-RADS radiation TRA')
    expect(warnings.join('\n')).toContain('use the LI-RADS radiation TRA')
  })
})

describe('LI-RADS: whole cases', () => {
  it('no observation: surveillance in 6 months', () => {
    const { text, warnings } = report(study, { risk: 'cirrhosis', modality: 'ct', status: 'untreated', present: 'none' })
    expect(text).toContain('Impression: There are no reportable LI-RADS observations. Return to surveillance in 6 months.')
    expect(warnings).toEqual([])
    noPlaceholders(text)
  })

  it('15 mm APHE and washout: LR-5, HCC by imaging (quiz case)', () => {
    const { text, warnings } = report(study, observation('15', { aphe: true, washout: true }))
    expect(text).toContain('LI-RADS v2018: applies (cirrhosis).')
    expect(text).toContain('Observation 1: segment 7, 15 mm (series 8, image 42)')
    expect(text).toContain('Major features: nonrim APHE, nonperipheral "washout"')
    expect(text).toContain('Impression: Observation 1, segment 7, 15 mm: LR-5, definitely HCC. HCC confirmed by imaging criteria; multidisciplinary discussion for consensus management.')
    expect(warnings).toEqual([])
    noPlaceholders(text)
  })

  it('15 mm APHE and capsule: LR-4, multidisciplinary discussion (quiz case)', () => {
    const { text } = report(study, observation('15', { aphe: true, capsule: true }))
    expect(text).toContain('LR-4, probably HCC. Multidisciplinary discussion for tailored workup, which may include biopsy.')
    noPlaceholders(text)
  })

  it('12 mm with no major feature: LR-3, repeat imaging in 3 to 6 months', () => {
    const { text } = report(study, observation('12'))
    expect(text).toContain('Major features: none')
    expect(text).toContain('LR-3, intermediate probability of malignancy. Repeat or alternative diagnostic imaging in 3 to 6 months.')
    noPlaceholders(text)
  })

  it('30 mm targetoid mass: LR-M with its likely cause (quiz case)', () => {
    const { text } = report(study, observation('30', {}, { 'lrm-target': ['rim', 'peripheral', 'central'] }))
    expect(text).toContain('LR-M features: targetoid (rim APHE, peripheral "washout", delayed central enhancement)')
    expect(text).toContain('LR-M, probably or definitely malignant, not necessarily HCC; most likely represents iCCA, cHCC-CCA, or HCC with atypical features. Multidisciplinary discussion for tailored workup, which often includes biopsy.')
    noPlaceholders(text)
  })

  it('LR-5 mass with tumor in the portal vein: LR-TIV, definitely due to HCC', () => {
    const { text } = report(study, observation('40', { aphe: true, washout: true, capsule: true }, { tiv: 'present', 'tiv-vein': 'right portal vein' }))
    expect(text).toContain('Tumor in vein: present, right portal vein.')
    expect(text).toContain('LR-TIV, definitely due to HCC, contiguous with LR-5 parenchymal mass.')
    noPlaceholders(text)
  })

  it('LR-NC: repeat imaging in 3 months or less, with the limitation', () => {
    const { text } = report(study, observation('20', {}, { nc: 'nc', 'nc-reason': 'arterial phase too early' }))
    expect(text).toContain('Technique: multiphase MRI with an extracellular agent or gadobenate; limited by arterial phase too early')
    expect(text).toContain('LR-NC, not categorizable. Repeat or alternative diagnostic imaging in 3 months or less.')
    noPlaceholders(text)
  })
})

describe('LI-RADS: required items and contradictions', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    expect(warnings).toEqual(expect.arrayContaining([
      'Risk factor for HCC not stated',
      'Multiphase exam not stated',
      'Untreated or treated not stated',
      'Reportable observation? not stated',
      'Identifier not stated',
      'Segment not stated',
      'Size, outer edge to outer edge not stated',
      'Series and image of the measurement not stated',
      'Can it be categorized? not stated',
      'Tumor in vein not stated',
      'Definitely or probably benign? not stated',
      'Arterial phase hyperenhancement not stated',
      'Nonperipheral "washout" not stated',
      'Enhancing "capsule" not stated',
      'Threshold growth not stated',
    ]))
  })

  it('asks for the vein, the limitation and the treated-lesion items when they apply', () => {
    expect(report(study, { ...base, tiv: 'present' }).warnings).toContain('Vein(s) involved not stated')
    expect(report(study, { ...base, nc: 'nc' }).warnings).toContain('Technical limitation not stated')
    const treated = report(study, { ...base, status: 'treated', 'tr-masslike': 'present' }).warnings
    expect(treated).toEqual(expect.arrayContaining([
      'Most recent treatment not stated',
      'Pretreatment category not stated',
      'Pretreatment size not stated',
      'Largest masslike enhancing component not stated',
    ]))
    expect(treated).not.toContain('Size, outer edge to outer edge not stated')
  })

  // "A distinctive solid nodule under 20 mm ... is LR-2. At 20 mm or more, the same nodule is LR-3 or higher."
  it('warns on LR-2 at 20 mm, not at 19.9 mm', () => {
    const lr2 = (size: string) => report(study, observation(size, {}, { benign: 'lr2' })).warnings.join('\n')
    expect(lr2('20')).toContain('LR-2 only under 20 mm')
    expect(lr2('19.9')).not.toContain('LR-2 only under 20 mm')
  })

  // "If you are downgrading from a prior exam, give the rationale."
  it.each([
    ['LR-4', observation('15'), true],
    ['LR-M', observation('25', { aphe: true }), true],
    ['LR-3', observation('15'), false],
    ['LR-3', observation('15', {}, { 'af-malignant': ['dwi'] }), false],
  ])('prior %s: downgrade warning %s', (prior, values, warns) => {
    const text = report(study, { ...values, 'prior-category': prior }).warnings.join('\n')
    expect(text.includes(`Downgrading from ${prior}`)).toBe(warns)
  })
})

describe('LI-RADS: output text', () => {
  it.each([
    ['empty', {}],
    ['risk only', { risk: 'hbv' }],
    ['size only', { ...base, size: '18' }],
    ['full untreated', observation('22', { aphe: true, washout: true, growth: true }, {
      'prior-size': '12', 'prior-months': '5', 'af-malignant': ['dwi', 'blood'], 'af-benign': ['iron'],
      'prior-category': 'LR-4', change: '12 mm to 22 mm', other: 'Mild splenomegaly.',
    })],
    ['benign with entity', observation('8', {}, { benign: 'lr1', 'benign-dx': 'hemangioma' })],
    ['treated, uncertain', { ...base, status: 'treated', 'tr-type': 'embolization', 'tr-pre-category': 'biopsy-hcc', 'tr-pre-size': '30', 'tr-masslike': 'uncertain', 'tr-size': '8', 'tr-af': ['t2'], change: 'smaller' }],
  ])('never prints placeholder text: %s', (_name, values) => {
    noPlaceholders(report(study, values as Values).text)
  })
})
