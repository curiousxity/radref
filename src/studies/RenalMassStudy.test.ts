import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { RenalMassStudyPage } from './RenalMassStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The comment above each case quotes the lesson sentence.
 */
const study = studyOf(RenalMassStudyPage)

const cyst = (values: Values): Values => ({ modality: 'ct', composition: 'cystic', ...values })
const bosniakClass = (values: Values) => chips(study, 'bosniak', cyst(values))['Bosniak v2019']
const solidStage = (values: Values) =>
  chips(study, 'stage', { modality: 'ct', fat: 'absent', composition: 'solid', ...values })['AJCC 8th T']

/** Text with no placeholder output and no doubled spaces. */
function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  expect(text).not.toMatch(/ {2}/)
  expect(text).not.toMatch(/\.\./)
}

describe('renal mass: macroscopic fat', () => {
  // "Look for regions below −10 HU on unenhanced CT."
  it('-10.1 HU is macroscopic fat', () => {
    expect(chips(study, 'fat', { minHu: '-10.1' })['Lowest HU']).toBe('Below -10 HU: macroscopic fat')
  })
  it('-10 HU is not', () => {
    expect(chips(study, 'fat', { minHu: '-10' })['Lowest HU']).toBe('Not below -10 HU')
  })
  it('the HU chip is CT only', () => {
    expect(chips(study, 'fat', { modality: 'mri', minHu: '-40' })['Lowest HU']).toBeUndefined()
  })
  // "If fat is present and there is no calcification, it is essentially an angiomyolipoma (AML)."
  it('fat without calcification is essentially AML', () => {
    expect(chips(study, 'fat', { fat: 'present', calc: 'absent' })['Fat, no calcification']).toBe('Essentially AML')
  })
  // "Fat plus calcification is a warning sign. Rarely, RCC can engulf fat."
  it('fat plus calcification is a warning sign', () => {
    const c = chips(study, 'fat', { fat: 'present', calc: 'present' })
    expect(c['Fat plus calcification']).toBe('Warning: RCC can engulf fat')
    expect(c['Fat, no calcification']).toBeUndefined()
  })
  it('no fat verdict until calcification is stated', () => {
    expect(chips(study, 'fat', { fat: 'present' })).toEqual({})
  })
})

describe('renal mass: CT enhancement rule', () => {
  // "≥20 HU rise: enhances, so it's a mass. 10–19 HU: equivocal. <10 HU: does not enhance."
  it.each([
    ['0', '20', 'Enhances (≥20 HU)'],
    ['0', '19.9', 'Equivocal (10-19 HU), possible pseudoenhancement'],
    ['0', '10', 'Equivocal (10-19 HU), possible pseudoenhancement'],
    ['0', '9.9', 'Does not enhance (<10 HU)'],
    // Float noise: 35.3 - 15.3 is 19.999999999999996 in floating point, but a 20 HU rise.
    ['15.3', '35.3', 'Enhances (≥20 HU)'],
  ])('%s to %s HU', (pre, post, verdict) => {
    const c = chips(study, 'composition', { huPre: pre, huNephro: post })
    expect(Object.values(c)).toEqual([verdict])
  })
  it('an equivocal 19.96 HU rise is shown as 19.9, not rounded up to 20', () => {
    expect(Object.keys(chips(study, 'composition', { huPre: '0', huNephro: '19.96' }))).toEqual(['Change +19.9 HU'])
  })
  it('no CT rule on MRI', () => {
    expect(chips(study, 'composition', { modality: 'mri', huPre: '0', huNephro: '40' })).toEqual({})
  })
})

describe('renal mass: Bosniak v2019 homogeneous class II', () => {
  // "homogeneous lesions like: −9 to 20 HU unenhanced, ≥70 HU unenhanced (hyperdense cyst), 21–30 HU portal venous"
  it.each([
    ['-10', undefined],
    ['-9', 'Class II'],
    ['20', 'Class II'],
    ['21', undefined],
    ['69', undefined],
    ['70', 'Class II'],
  ])('unenhanced %s HU', (hu, klass) => {
    expect(bosniakClass({ homog: 'yes', huPre: hu })).toBe(klass)
  })
  it.each([
    ['20', undefined],
    ['21', 'Class II'],
    ['30', 'Class II'],
    ['31', undefined],
  ])('portal venous %s HU', (hu, klass) => {
    expect(bosniakClass({ homog: 'yes', huPv: hu })).toBe(klass)
  })
  // "very bright on T2 like CSF"
  it('MRI: homogeneous and CSF-bright on T2 is class II', () => {
    expect(bosniakClass({ modality: 'mri', homog: 'yes', homogT2: 'yes' })).toBe('Class II')
    expect(bosniakClass({ modality: 'mri', homog: 'yes', homogT2: 'no' })).toBeUndefined()
  })
  it('not homogeneous: the HU ranges do not apply', () => {
    expect(bosniakClass({ homog: 'no', huPre: '10' })).toBeUndefined()
  })
})

describe('renal mass: Bosniak v2019 wall, septa and nodules', () => {
  // "I: Thin smooth wall, simple fluid, no septa/calcium"
  it('thin smooth wall, no septa, no calcium is class I', () => {
    const c = chips(study, 'bosniak', cyst({ bEnh: 'no', bWall: 'thin' }))
    expect(c['Bosniak v2019']).toBe('Class I')
    expect(c['Usual action']).toBe('Benign, nothing')
  })
  // "II: 1–3 thin septa; fine calcium"
  it('1-3 thin septa is class II', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'thin', bSepta: 'few', bSeptaThick: 'thin' })).toBe('Class II')
  })
  it('fine calcium is class II', () => {
    expect(bosniakClass({ bEnh: 'no', bWall: 'thin', calc: 'present' })).toBe('Class II')
  })
  // "IIF: ≥4 thin smooth septa; OR minimally thickened (3 mm) smooth wall/septa; OR (MRI) heterogeneously T1-bright"
  it('≥4 thin enhancing septa is class IIF', () => {
    const c = chips(study, 'bosniak', cyst({ bEnh: 'yes', bWall: 'thin', bSepta: 'many', bSeptaThick: 'thin' }))
    expect(c['Bosniak v2019']).toBe('Class IIF')
    expect(c['Usual action']).toBe('Follow-up imaging')
  })
  it('minimally thickened (3 mm) enhancing wall is class IIF', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'minimallyThick' })).toBe('Class IIF')
  })
  it('minimally thickened (3 mm) enhancing septa are class IIF', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'thin', bSepta: 'few', bSeptaThick: 'minimallyThick' })).toBe('Class IIF')
  })
  it('heterogeneously T1-bright on MRI is class IIF', () => {
    expect(bosniakClass({ modality: 'mri', bEnh: 'no', bWall: 'thin', bT1: 'yes' })).toBe('Class IIF')
  })
  it('the T1-bright rule is MRI only', () => {
    expect(bosniakClass({ bEnh: 'no', bWall: 'thin', bT1: 'yes' })).toBe('Class I')
  })
  // "III: Thick (≥4 mm) or irregular (obtuse protrusion ≤3 mm) enhancing wall/septa"
  it('thick (≥4 mm) enhancing wall is class III', () => {
    const c = chips(study, 'bosniak', cyst({ bEnh: 'yes', bWall: 'thick' }))
    expect(c['Bosniak v2019']).toBe('Class III')
    expect(c['Usual action']).toBe('Surgery or surveillance discussion')
  })
  it('thick (≥4 mm) enhancing septa are class III', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'thin', bSepta: 'few', bSeptaThick: 'thick' })).toBe('Class III')
  })
  it('an obtuse protrusion ≤3 mm (irregularity) is class III', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'thin', bNodule: 'irregularity' })).toBe('Class III')
  })
  it('enhancing wall irregularity is class III', () => {
    expect(bosniakClass({ bEnh: 'yes', bWall: 'thin', bIrreg: 'yes' })).toBe('Class III')
  })
  // "Nodule: an obtuse protrusion of ≥4 mm, or an acute protrusion of any size." "IV: One or more enhancing nodules"
  it('an enhancing nodule is class IV', () => {
    const c = chips(study, 'bosniak', cyst({ bEnh: 'yes', bWall: 'thin', bNodule: 'nodule' }))
    expect(c['Bosniak v2019']).toBe('Class IV')
    expect(c['Usual action']).toBe('Treat as malignant')
  })
  it('no class until wall enhancement and thickness are entered', () => {
    expect(chips(study, 'bosniak', cyst({ bEnh: 'yes' }))).toEqual({})
  })
  it('no Bosniak class for a solid mass', () => {
    expect(chips(study, 'bosniak', { composition: 'solid', bEnh: 'yes', bWall: 'thick' })).toEqual({})
  })
})

describe('renal mass: ccLS classic patterns (MRI, solid, no macroscopic fat)', () => {
  const pattern = (values: Values) =>
    chips(study, 'subtype', { modality: 'mri', composition: 'solid', fat: 'absent', ...values })['Classic pattern']
  // "Clear cell RCC: T2-bright + intense early enhancement ± microscopic fat → ccLS 4–5."
  it('T2-bright + intense is the clear cell pattern', () => {
    expect(pattern({ t2: 'bright', cmEnh: 'intense' })).toBe('Clear cell RCC pattern, ccLS 4-5')
  })
  // "Papillary RCC: T2-dark, homogeneous, mild/slow enhancement → ccLS 1."
  it('T2-dark + mild is the papillary pattern', () => {
    expect(pattern({ t2: 'dark', cmEnh: 'mild' })).toBe('Papillary RCC pattern, ccLS 1')
  })
  // "Fat-poor AML: T2-dark + avid enhancement ± microscopic fat → low ccLS."
  it('T2-dark + intense is the fat-poor AML pattern', () => {
    expect(pattern({ t2: 'dark', cmEnh: 'intense' })).toBe('Fat-poor AML pattern, low ccLS')
  })
  // "Oncocytoma/chromophobe: intermediate T2, segmental enhancement inversion."
  it('intermediate T2 + SEI is the oncocytoma/chromophobe pattern', () => {
    expect(pattern({ t2: 'intermediate', sei: 'present' })).toBe('Oncocytoma/chromophobe pattern')
    expect(pattern({ t2: 'intermediate', sei: 'absent' })).toBeUndefined()
  })
  // "It applies to solid masses without macroscopic fat."
  it('no pattern with macroscopic fat', () => {
    expect(pattern({ fat: 'present', t2: 'bright', cmEnh: 'intense' })).toBeUndefined()
  })
  it('no pattern on CT', () => {
    expect(pattern({ modality: 'ct', t2: 'bright', cmEnh: 'intense' })).toBeUndefined()
  })
})

describe('renal mass: AJCC 8th T stage', () => {
  // "T1a: ≤4 cm. T1b: 4–7 cm. T2a: 7–10 cm. T2b: >10 cm. All confined to the kidney."
  it.each([
    ['4', 'T1a'],
    ['4.1', 'T1b'],
    ['7', 'T1b'],
    ['7.1', 'T2a'],
    ['10', 'T2a'],
    ['10.1', 'T2b'],
  ])('%s cm confined is %s', (size, stage) => {
    expect(solidStage({ size1: size, vein: 'none', periFat: 'clear' })).toBe(stage)
  })
  it('stages on the largest dimension', () => {
    expect(solidStage({ size1: '3', size2: '4.5', size3: '2', vein: 'none', periFat: 'clear' })).toBe('T1b')
  })
  it('flags a size-only stage until extension is stated', () => {
    expect(solidStage({ size1: '3' })).toBe('T1a (extension not yet stated)')
  })
  // "T3a: tumor in the renal vein or its branches, or in perinephric or renal sinus fat."
  it.each([
    [{ vein: 'renal', periFat: 'clear' }],
    [{ vein: 'none', periFat: 'involved', extension: ['perinephric'] }],
    [{ vein: 'none', periFat: 'involved', extension: ['sinus'] }],
  ])('%o is T3a', (values) => {
    expect(solidStage({ size1: '3', ...values })).toBe('T3a')
  })
  // "T3b: thrombus in the IVC below the diaphragm."
  it('IVC thrombus below the diaphragm is T3b', () => {
    expect(solidStage({ size1: '3', vein: 'ivcBelow', periFat: 'clear' })).toBe('T3b')
  })
  // "T3c: thrombus in the IVC above the diaphragm, or invading the IVC wall."
  it.each(['ivcAbove', 'ivcWall'])('%s is T3c', (vein) => {
    expect(solidStage({ size1: '3', vein, periFat: 'clear' })).toBe('T3c')
  })
  // "T4: beyond Gerota fascia, or directly invading the ipsilateral adrenal."
  it.each(['gerota', 'adrenal'])('%s is T4', (site) => {
    expect(solidStage({ size1: '3', vein: 'ivcAbove', periFat: 'involved', extension: [site] })).toBe('T4')
  })
  it('an extension ticked but then marked clear does not stage', () => {
    expect(solidStage({ size1: '3', vein: 'none', periFat: 'clear', extension: ['gerota'] })).toBe('T1a')
  })
  it('no stage for a benign cyst or an AML', () => {
    expect(chips(study, 'stage', cyst({ bEnh: 'no', bWall: 'thin', size1: '3' }))).toEqual({})
    expect(chips(study, 'stage', { composition: 'solid', fat: 'present', calc: 'absent', size1: '3' })).toEqual({})
  })
  it('stages a Bosniak III-IV cystic mass', () => {
    expect(chips(study, 'stage', cyst({ bEnh: 'yes', bWall: 'thick', size1: '5', vein: 'none', periFat: 'clear' }))['AJCC 8th T']).toBe('T1b')
  })
})

describe('renal mass: whole cases', () => {
  it('Practice case 1: homogeneous 15 HU lesion is Bosniak II with no enhancement', () => {
    // "2 cm homogeneous lesion, 15 HU unenhanced, 18 HU nephrographic. Bosniak II (9–20 HU homogeneous). The 3 HU change is not enhancement."
    const { text } = report(study, {
      modality: 'ct', fat: 'absent', composition: 'cystic', huPre: '15', huNephro: '18', homog: 'yes',
      size1: '2', prior: 'none', vein: 'none', periFat: 'clear', nodes: 'none', mets: 'none', side: 'Right',
    })
    expect(text).toContain('Composition: Cystic (Bosniak v2019 class II).')
    expect(text).toContain('change +3 HU), does not enhance.')
    expect(text).toContain('Impression: Cystic right renal mass, Bosniak v2019 class II.')
    expect(text).not.toContain('radiologic stage')
    expectClean(text)
  })

  it('Practice case 2: five thin septa are Bosniak IIF', () => {
    // "3 cm cystic lesion with 5 thin smooth septa. Bosniak IIF (≥4 thin septa)."
    const { text, warnings } = report(study, {
      modality: 'ct', fat: 'absent', calc: 'absent', composition: 'cystic', huPre: '10', huNephro: '14',
      bEnh: 'yes', bWall: 'thin', bSepta: 'many', bSeptaThick: 'thin',
      size1: '3', prior: 'none', vein: 'none', periFat: 'clear', nodes: 'none', mets: 'none',
    })
    expect(text).toMatch(/Impression: Cystic renal mass, Bosniak v2019 class IIF\.$/)
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('a small confined solid CT mass is staged T1a with surgical anatomy', () => {
    const { text, warnings } = report(study, {
      modality: 'ct', minHu: '5', fat: 'absent', calc: 'absent', composition: 'solid', huPre: '30', huNephro: '110',
      size1: '3.2', size2: '2.8', prior: 'none', vein: 'none', periFat: 'clear', nodes: 'none', mets: 'none',
      side: 'Left', pole: 'lower', ap: 'posterior', exophytic: '40', collecting: 'distance', collectingMm: '8',
      arteries: '1', lrv: 'normal', contra: 'normal',
    })
    expect(text).toContain('Renal mass: Left, lower pole, posterior, 40% exophytic.')
    expect(text).toContain('Size: 3.2 × 2.8 cm (no prior imaging for comparison).')
    expect(text).toContain('change +80 HU), enhances.')
    expect(text).toContain('Relationship to collecting system/renal sinus: 8 mm.')
    expect(text).toContain('Vascular anatomy: 1 renal artery; left renal vein normal.')
    expect(text).toContain('Impression: Solid left renal mass, radiologic stage T1a.')
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('an advanced solid mass carries the stage features into the impression', () => {
    const { text } = report(study, {
      modality: 'ct', fat: 'absent', calc: 'absent', composition: 'solid', huPre: '35', huNephro: '95',
      size1: '8.5', prior: 'none', vein: 'ivcBelow', veinExtent: 'the intrahepatic IVC', periFat: 'involved',
      extension: ['perinephric'], nodes: 'enlarged', nodeDetail: '2.1 cm left para-aortic', mets: 'present', metSites: ['lung', 'bone'],
      side: 'Right',
    })
    expect(text).toContain('Renal vein/IVC: Thrombus in the IVC below the diaphragm, extending to the intrahepatic IVC.')
    expect(text).toContain('Perinephric/sinus fat, adrenal: Involvement of perinephric fat.')
    expect(text).toContain('Nodes/metastases: Enlarged retroperitoneal nodes: 2.1 cm left para-aortic. Metastases: lung bases, bone.')
    expect(text).toContain(
      'Impression: Solid right renal mass, radiologic stage T3b, thrombus in the IVC below the diaphragm, enlarged retroperitoneal nodes, metastases.',
    )
    expectClean(text)
  })

  it('MRI clear cell pattern with ccLS 5', () => {
    // "2.5 cm solid mass: T2-bright, intense corticomedullary enhancement, opposed-phase signal drop. ccLS 5. Clear cell RCC."
    const { text, warnings } = report(study, {
      modality: 'mri', fat: 'absent', composition: 'solid', subtraction: 'present', t2: 'bright', cmEnh: 'intense',
      microFat: 'present', ccls: '5', size1: '2.5', prior: 'none', vein: 'none', periFat: 'clear', nodes: 'none', mets: 'none',
    })
    expect(text).toContain('Enhancement: present on subtraction.')
    expect(text).toContain('ccLS: 5.')
    expect(text).toContain('Impression: Solid renal mass, clear cell RCC favored, ccLS 5, radiologic stage T1a.')
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('macroscopic fat without calcification reads as AML and is not staged', () => {
    const { text } = report(study, {
      modality: 'ct', minHu: '-40', fat: 'present', calc: 'absent', composition: 'solid', huPre: '-20', huNephro: '10',
      size1: '2', prior: 'none', vein: 'none', periFat: 'clear', nodes: 'none', mets: 'none', side: 'Left',
    })
    expect(text).toContain('Impression: Fat-containing left renal mass without calcification, consistent with angiomyolipoma.')
    expect(text).not.toContain('radiologic stage')
    expectClean(text)
  })

  it('fat plus calcification puts the warning sign in the impression', () => {
    const { text } = report(study, { modality: 'ct', fat: 'present', calc: 'present', composition: 'solid', size1: '3' })
    expect(text).toContain('Macroscopic fat with calcification is a warning sign: rarely, RCC can engulf fat.')
    expectClean(text)
  })

  it('a free-text diagnosis replaces the derived wording', () => {
    const { text } = report(study, { modality: 'ct', composition: 'solid', diagnosis: 'Oncocytoma', size1: '3', vein: 'none', periFat: 'clear' })
    expect(text).toContain('Impression: Oncocytoma, radiologic stage T1a.')
  })
})

describe('renal mass: required items and contradictions', () => {
  // "size with comparison to priors, cystic vs solid, presence of fat, enhancement, radiologic stage"
  it('lists what the CT report must contain while the form is empty', () => {
    const { text, warnings } = report(study)
    expect(warnings).toEqual([
      'Modality not stated',
      'Macroscopic fat not stated',
      'Composition not stated',
      'Unenhanced attenuation not stated',
      'Nephrographic attenuation not stated',
      'Size, first dimension not stated',
      'Prior imaging not stated',
      'Renal vein/IVC not stated',
      'Perinephric/sinus fat, adrenal not stated',
      'Retroperitoneal nodes not stated',
      'Metastases not stated',
    ])
    expectClean(text)
  })
  it('on MRI, asks for subtraction instead of the CT attenuations', () => {
    const { warnings } = report(study, { modality: 'mri' })
    expect(warnings).toContain('Enhancement on subtraction (post minus pre) not stated')
    expect(warnings).not.toContain('Unenhanced attenuation not stated')
  })
  it('fat marked absent with a region below -10 HU', () => {
    expect(report(study, { minHu: '-15', fat: 'absent' }).warnings).toContain('Macroscopic fat marked absent but a region measures -15 HU (below -10 HU).')
    expect(report(study, { minHu: '-10', fat: 'absent' }).warnings.join()).not.toContain('marked absent')
  })
  it('fat marked present with nothing below -10 HU', () => {
    expect(report(study, { minHu: '-10', fat: 'present' }).warnings).toContain('Macroscopic fat marked present but the lowest region measured is -10 HU (not below -10 HU).')
    expect(report(study, { minHu: '-11', fat: 'present' }).warnings.join()).not.toContain('marked present')
  })
  it('solid on CT but not enhancing', () => {
    expect(report(study, { composition: 'solid', huPre: '30', huNephro: '39.9' }).warnings).toContain('Marked solid but the measured change is 9.9 HU (<10 HU, does not enhance).')
    expect(report(study, { composition: 'solid', huPre: '30', huNephro: '40' }).warnings.join()).not.toContain('does not enhance')
  })
  it('solid on MRI but no subtraction enhancement', () => {
    expect(report(study, { modality: 'mri', composition: 'solid', subtraction: 'absent' }).warnings).toContain('Marked solid but no enhancement on subtraction.')
  })
  it('ccLS entered for a fat-containing mass', () => {
    expect(report(study, { modality: 'mri', composition: 'solid', fat: 'present', ccls: '2' }).warnings).toContain('ccLS applies to solid masses without macroscopic fat.')
  })
  it('clear cell pattern scored below 4', () => {
    const mri = { modality: 'mri', composition: 'solid', fat: 'absent', t2: 'bright', cmEnh: 'intense' }
    expect(report(study, { ...mri, ccls: '3' }).warnings).toContain('Clear cell pattern (T2-bright, intense enhancement) usually scores ccLS 4-5; ccLS 3 entered.')
    expect(report(study, { ...mri, ccls: '4' }).warnings.join()).not.toContain('Clear cell pattern')
  })
  it('papillary pattern scored above 1', () => {
    const mri = { modality: 'mri', composition: 'solid', fat: 'absent', t2: 'dark', cmEnh: 'mild' }
    expect(report(study, { ...mri, ccls: '2' }).warnings).toContain('Papillary pattern (T2-dark, mild enhancement) usually scores ccLS 1; ccLS 2 entered.')
    expect(report(study, { ...mri, ccls: '1' }).warnings.join()).not.toContain('Papillary pattern')
  })
  it('homogeneous but septa or protrusions entered', () => {
    expect(report(study, cyst({ homog: 'yes', huPre: '10', bSepta: 'few' })).warnings).toContain('Marked homogeneous but septa or protrusions are entered.')
    expect(report(study, cyst({ homog: 'yes', huPre: '10', bNodule: 'nodule' })).warnings).toContain('Marked homogeneous but septa or protrusions are entered.')
  })
  it('cystic with no Bosniak class yet', () => {
    expect(report(study, cyst({})).warnings.some((w) => w.startsWith('Bosniak class not yet determined'))).toBe(true)
    expect(report(study, cyst({ bEnh: 'no', bWall: 'thin' })).warnings.some((w) => w.startsWith('Bosniak class not yet determined'))).toBe(false)
  })
  it('prior imaging available but no prior size', () => {
    const w = 'Prior imaging marked available but the prior size is not entered, so the report has no comparison.'
    expect(report(study, { size1: '3', prior: 'yes' }).warnings).toContain(w)
    expect(report(study, { size1: '3', prior: 'yes', priorSize: '2.5' }).warnings).not.toContain(w)
  })
  it('the prior comparison reads cleanly', () => {
    const { text } = report(study, { size1: '3', prior: 'yes', priorSize: '2.5', priorDate: '2025-03-01' })
    expect(text).toContain('Size: 3 cm (prior: 2.5 cm on 2025-03-01).')
  })
})
