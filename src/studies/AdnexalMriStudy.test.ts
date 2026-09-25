import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { AdnexalMriStudyPage } from './AdnexalMriStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The comment above each case quotes the lesson sentence.
 */
const study = studyOf(AdnexalMriStudyPage)

/** A complete DCE study of one premenopausal adnexal lesion, before the lesion is described. */
const base: Values = {
  contrast: 'dce', myometrium: 'yes', quality: 'complete', meno: 'pre', lesion: 'lesion',
  side: 'left', origin: 'ovarian', size1: '5', contra: 'normal', peritoneum: 'none',
}
/** An ovarian lesion with enhancing solid tissue, no fat. */
const solid: Values = { ...base, architecture: 'mixed', fat: 'absent', solid: 'present' }
/** A lesion without enhancing solid tissue, no fat. */
const cystic: Values = { ...base, fat: 'absent', solid: 'absent' }

/** The final O-RADS MRI chip (Step 8), e.g. "4 — Intermediate" or "Not yet: ...". */
const score = (values: Values) => chips(study, 'step8', values)['O-RADS MRI']

/** Text with no placeholder output and no doubled spaces (the numbered findings are indented on purpose). */
function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  expect(text).not.toMatch(/\S {2,}/)
  expect(text).not.toMatch(/\.\./)
}

describe('O-RADS MRI 0 and 1', () => {
  // "0 Incomplete: Missing key sequences, motion, lesion cut off"
  it('an incomplete study is 0, ahead of everything else', () => {
    expect(score({ ...base, quality: 'incomplete', peritoneum: 'implants' })).toBe('0 — Incomplete')
    expect(chips(study, 'exam', { quality: 'incomplete' })['O-RADS MRI']).toBe('0: incomplete')
  })
  // "1 Normal ovaries: No lesion; follicle ≤3 cm, hemorrhagic cyst ≤3 cm, or corpus luteum ≤3 cm in a premenopausal woman"
  it('no lesion is 1', () => {
    expect(score({ ...base, lesion: 'none' })).toBe('1 — Normal ovaries')
  })
  it.each([
    ['3', '1: physiologic finding ≤3 cm in a premenopausal woman'],
    ['3.1', undefined],
  ])('premenopausal physiologic finding of %s cm', (size, chip) => {
    expect(chips(study, 'step0', { meno: 'pre', lesion: 'physio', physio: 'follicle', size1: size })['O-RADS MRI']).toBe(chip)
  })
  it('score 1 is premenopausal only', () => {
    expect(chips(study, 'step0', { meno: 'post', lesion: 'physio', physio: 'cl', size1: '2' })['O-RADS MRI']).toBeUndefined()
  })
  // "A follicle or simple cyst above 3 cm in a premenopausal woman becomes a score 2 lesion, not score 1."
  it('a 3.1 cm follicle is scored as a lesion, landing on 2', () => {
    expect(score({ ...cystic, lesion: 'physio', physio: 'follicle', size1: '3.1', architecture: 'unilocular', fluids: ['simple'], wallEnh: 'no' })).toBe('2 — Almost certainly benign')
  })
  it('asks for the size before giving score 1', () => {
    expect(chips(study, 'step0', { meno: 'pre', lesion: 'physio' })['O-RADS MRI']).toBe('Not yet: enter the size: score 1 applies up to 3 cm')
  })
})

describe('O-RADS MRI: peritoneal disease', () => {
  // "Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5, regardless of what the ovarian mass itself looks like."
  it('implants are 5 whatever the lesion looks like', () => {
    expect(score({ ...cystic, peritoneum: 'implants', architecture: 'unilocular', fluids: ['simple'], wallEnh: 'no' })).toBe('5 — High risk')
    expect(chips(study, 'step2', { peritoneum: 'implants' })['O-RADS MRI']).toBe('5: peritoneal or omental implants')
  })
  // "Don't be fooled by a small amount of simple free fluid in a premenopausal woman; that's normal."
  it('small simple fluid in a premenopausal woman is normal', () => {
    expect(chips(study, 'step2', { meno: 'pre', freeFluid: 'simple', fluidAmount: 'small' })['Free fluid']).toBe('Small simple fluid, premenopausal: normal')
    expect(chips(study, 'step2', { meno: 'post', freeFluid: 'simple', fluidAmount: 'small' })['Free fluid']).toBeUndefined()
    expect(chips(study, 'step2', { meno: 'pre', freeFluid: 'simple', fluidAmount: 'moderate' })['Free fluid']).toBeUndefined()
  })
  // "Fibromas can produce ascites ... don't let the fluid push you to score 5 unless there are actual peritoneal nodules."
  it('ascites without implants does not make it 5', () => {
    expect(score({ ...solid, freeFluid: 'simple', fluidAmount: 'large', t2: 'dark', dwi: 'dark' })).toBe('2 — Almost certainly benign')
  })
})

describe('O-RADS MRI: lesions without enhancing solid tissue', () => {
  // "2: Unilocular cyst of any fluid with no wall enhancement"
  it.each(['simple', 'hemorrhagic', 'endometriotic', 'mucinous'])('unilocular %s cyst, no wall enhancement, is 2', (fluid) => {
    expect(score({ ...cystic, architecture: 'unilocular', fluids: [fluid], wallEnh: 'no' })).toBe('2 — Almost certainly benign')
  })
  // "2: unilocular simple or endometriotic cyst with smooth enhancing wall"
  it.each(['simple', 'endometriotic'])('unilocular %s cyst with a smooth enhancing wall is 2', (fluid) => {
    expect(score({ ...cystic, architecture: 'unilocular', fluids: [fluid], wallEnh: 'yes', wallContour: 'smooth' })).toBe('2 — Almost certainly benign')
  })
  // "3: Unilocular proteinaceous/hemorrhagic/mucinous cyst with smooth enhancing wall"
  it.each(['hemorrhagic', 'mucinous'])('unilocular %s cyst with a smooth enhancing wall is 3', (fluid) => {
    expect(score({ ...cystic, architecture: 'unilocular', fluids: [fluid], wallEnh: 'yes', wallContour: 'smooth' })).toBe('3 — Low risk')
  })
  it('any hemorrhagic locule makes a smooth enhancing unilocular cyst 3', () => {
    expect(score({ ...cystic, architecture: 'unilocular', fluids: ['simple', 'hemorrhagic'], wallEnh: 'yes', wallContour: 'smooth' })).toBe('3 — Low risk')
  })
  it('an enhancing wall needs the fluid named', () => {
    expect(score({ ...cystic, architecture: 'unilocular', wallEnh: 'yes', wallContour: 'smooth' })).toBe('Not yet: name the fluid type')
  })
  // "3: multilocular cyst (no fat) with smooth septa"
  it('multilocular cyst with smooth septa is 3', () => {
    expect(score({ ...cystic, architecture: 'multilocular', fluids: ['mucinous'], septa: 'smooth' })).toBe('3 — Low risk')
  })
  // "2: fat-containing lesion without enhancing solid tissue"
  it('fat without enhancing solid tissue is 2', () => {
    expect(score({ ...base, architecture: 'unilocular', fat: 'present', solid: 'absent' })).toBe('2 — Almost certainly benign')
    expect(chips(study, 'step3', { ...base, fat: 'present' }).Fat).toBe('O-RADS 2 if no enhancing solid tissue')
  })
  // "The 'T2 dark spot' sign is very specific for endometrioma over hemorrhagic cyst."
  it('T2 dark spots favor endometrioma', () => {
    expect(chips(study, 'step3', { ...base, clues: ['darkSpots'] })['T2 dark spots']).toBe('Favors endometrioma over hemorrhagic cyst')
  })
})

describe('O-RADS MRI: fat-containing lesions with enhancing tissue', () => {
  // "characteristic mature teratomas may contain septations or minimal enhancement of Rokitansky nodules, and these do not upgrade the lesion to O-RADS 4"
  it('septations or minimal Rokitansky enhancement stay 2', () => {
    expect(score({ ...base, architecture: 'mixed', fat: 'present', solid: 'present', dermoidTissue: 'minimal' })).toBe('2 — Almost certainly benign')
  })
  // "4: fat-containing lesion with a lot of enhancing soft tissue"
  it('a large amount of enhancing soft tissue is 4', () => {
    expect(score({ ...base, architecture: 'mixed', fat: 'present', solid: 'present', dermoidTissue: 'large' })).toBe('4 — Intermediate')
  })
  it('fat-containing tissue skips the T2/DWI rule and the curve', () => {
    const v = { ...base, architecture: 'mixed', fat: 'present', solid: 'present', dermoidTissue: 'large', t2: 'dark', dwi: 'dark', curve: '3' }
    expect(score(v)).toBe('4 — Intermediate')
    expect(chips(study, 'step5', v)).toEqual({})
    expect(chips(study, 'step6', v)).toEqual({})
  })
})

describe('O-RADS MRI: solid tissue on T2 and DWI', () => {
  // "Solid tissue that is dark on T2 and dark on high-b DWI is O-RADS 2."
  it('T2-dark and DWI-dark is 2, whatever the curve', () => {
    expect(chips(study, 'step5', { ...solid, t2: 'dark', dwi: 'dark' })['O-RADS MRI']).toBe('2: T2-dark/DWI-dark solid tissue')
    expect(score({ ...solid, t2: 'dark', dwi: 'dark', curve: '3' })).toBe('2 — Almost certainly benign')
  })
  // "If any part is intermediate or bright on either sequence, this rule does not apply; move on."
  it.each([
    ['dark', 'notDark'],
    ['notDark', 'dark'],
  ])('T2 %s, DWI %s goes to the curve', (t2, dwi) => {
    expect(chips(study, 'step5', { ...solid, t2, dwi })['T2/DWI dark rule']).toBe('Does not apply: go to the curve')
    expect(score({ ...solid, t2, dwi, curve: '3' })).toBe('5 — High risk')
  })
})

describe('O-RADS MRI: the enhancement curve', () => {
  const graded = { ...solid, t2: 'notDark', dwi: 'notDark' }
  // "Type 1 (low risk) → O-RADS 3; Type 2 (intermediate) → O-RADS 4; Type 3 (high risk) → O-RADS 5"
  it.each([
    ['1', '3 — Low risk'],
    ['2', '4 — Intermediate'],
    ['3', '5 — High risk'],
  ])('type %s curve', (curve, expected) => {
    expect(score({ ...graded, curve })).toBe(expected)
  })
  // "If you only have a single post-contrast series at 30–40 s (no DCE): solid tissue enhancing ≤ myometrium is O-RADS 4; enhancing more than the myometrium is O-RADS 5."
  it.each([
    ['le', '4 — Intermediate'],
    ['gt', '5 — High risk'],
  ])('single 30-40 s series, %s myometrium', (single, expected) => {
    expect(score({ ...graded, contrast: 'single', single })).toBe(expected)
  })
  // "Without DCE you lose the ability to call a curve 'low risk' (score 3)."
  it('a curve type is ignored without DCE', () => {
    expect(score({ ...graded, contrast: 'single', curve: '1' })).toBe('Not yet: compare the solid tissue with the myometrium at 30–40 s')
  })
  it('no score for solid tissue without contrast', () => {
    expect(score({ ...graded, contrast: 'none' })).toBe('Not yet: enhancement of the solid tissue cannot be judged without contrast')
  })
})

describe('O-RADS MRI: tubes and paraovarian cysts', () => {
  const tube = { ...cystic, origin: 'tubal', architecture: 'unilocular' }
  // "A dilated tube with simple fluid, thin smooth wall and folds, no solid tissue → 2."
  it('simple hydrosalpinx is 2', () => {
    expect(chips(study, 'step7', { ...tube, fluids: ['simple'], wallThick: 'thin', wallContour: 'smooth', tubeFolds: 'present' })['O-RADS MRI'])
      .toBe('2: dilated tube with simple fluid, thin smooth wall and folds, no solid tissue')
  })
  it('without folds it is not the simple hydrosalpinx line', () => {
    expect(chips(study, 'step7', { ...tube, fluids: ['simple'], wallThick: 'thin', wallContour: 'smooth', tubeFolds: 'absent' })['O-RADS MRI']).toMatch(/^Not yet/)
  })
  // "Non-simple fluid or a thick wall → 3."
  it('non-simple fluid is 3', () => {
    expect(score({ ...tube, fluids: ['hemorrhagic'], wallThick: 'thin', wallContour: 'smooth', tubeFolds: 'present' })).toBe('3 — Low risk')
  })
  it('a thick wall is 3', () => {
    expect(score({ ...tube, fluids: ['simple'], wallThick: 'thick', wallContour: 'smooth', tubeFolds: 'present' })).toBe('3 — Low risk')
  })
  // "A paraovarian cyst with a thin wall and no solid tissue → 2."
  it('thin-walled paraovarian cyst is 2', () => {
    expect(score({ ...cystic, origin: 'paraovarian', architecture: 'unilocular', wallThick: 'thin' })).toBe('2 — Almost certainly benign')
    expect(score({ ...cystic, origin: 'paraovarian', architecture: 'unilocular', wallThick: 'thick' })).toMatch(/^Not yet/)
  })
})

describe('O-RADS MRI: PPV and management', () => {
  // "2 <0.5%, 3 ~5%, 4 ~50%, 5 ~90%" and "score 2 → no imaging follow-up (or routine gynecology); score 3 → gynecology referral,
  // follow-up or surgery at their discretion; score 4 or 5 → gynecologic oncology referral."
  const graded = { ...solid, t2: 'notDark', dwi: 'notDark' }
  it.each([
    [{ ...graded, t2: 'dark', dwi: 'dark' }, '<0.5%', 'No imaging follow-up (or routine gynecology).'],
    [{ ...graded, curve: '1' }, '~5%', 'Gynecology referral, follow-up or surgery at their discretion.'],
    [{ ...graded, curve: '2' }, '~50%', 'Gynecologic oncology referral.'],
    [{ ...graded, curve: '3' }, '~90%', 'Gynecologic oncology referral.'],
  ])('%#', (values, ppv, management) => {
    const c = chips(study, 'step8', values)
    expect(c.PPV).toBe(ppv)
    expect(c.Management).toBe(management)
  })
})

describe('O-RADS MRI: whole cases', () => {
  it('normal ovaries', () => {
    const { text, warnings } = report(study, { contrast: 'dce', myometrium: 'yes', meno: 'pre', lesion: 'none', peritoneum: 'none' })
    expect(text).toContain('No adnexal lesion. Normal ovaries.')
    expect(text).toMatch(/Impression:\nO-RADS MRI 1 — normal ovaries\.$/)
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('the lesson case: endometrioma with clot, smooth enhancing wall, is 2', () => {
    // "A 34-year-old premenopausal woman. A 6 cm left ovarian unilocular cyst ... a few tiny very dark dots. The wall is smooth
    // and enhances thinly. ... no signal change on the subtraction images."
    const { text, warnings } = report(study, {
      ...cystic, age: '34', size1: '6', architecture: 'unilocular', fluids: ['endometriotic'], clues: ['darkSpots'],
      wallThick: 'thin', wallContour: 'smooth', wallEnh: 'yes', diagnosis: 'endometrioma', freeFluid: 'none',
    })
    expect(text).toContain('Clinical: 34-year-old premenopausal woman.')
    expect(text).toContain('  6. Enhancing solid tissue: absent.')
    expect(text).toContain('Left ovarian lesion: most likely endometrioma. O-RADS MRI 2 — almost certainly benign.')
    expect(text).toContain('Management: no imaging follow-up (or routine gynecology).')
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('borderline picture: papillary projections with a type 2 curve are 4', () => {
    // "Papillary projections with a type 2 curve are the classic borderline picture."
    const { text, warnings } = report(study, {
      ...solid, age: '45', size1: '7', size2: '6', size3: '5', solidTypes: ['papillary'], solidSize: '12',
      t2: 'notDark', dwi: 'notDark', curve: '2',
    })
    expect(text).toContain('  2. Size: 7 x 6 x 5 cm.')
    expect(text).toContain('Enhancing solid tissue: present (papillary projection; 12 mm; T2 intermediate or bright; high-b DWI intermediate or bright; type 2 time-intensity curve vs myometrium).')
    expect(text).toContain('Left ovarian lesion: O-RADS MRI 4 — intermediate.')
    expect(text).toContain('Management: gynecologic oncology referral.')
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('high-grade serous picture: implants make it 5', () => {
    const { text } = report(study, {
      ...solid, meno: 'post', side: 'right', solidTypes: ['larger'], t2: 'notDark', dwi: 'notDark', curve: '3',
      peritoneum: 'implants', peritonealSites: 'omental cake', freeFluid: 'complex', fluidAmount: 'large',
    })
    expect(text).toContain('Free fluid: large, complex.')
    expect(text).toContain('Peritoneum and omentum: peritoneal/omental implants (omental cake).')
    expect(text).toContain('Right ovarian lesion: O-RADS MRI 5 — high risk.')
    expect(text).toContain('Management: gynecologic oncology referral.')
    expectClean(text)
  })

  it('an incomplete study reads as 0 with no management line', () => {
    const { text } = report(study, { ...base, quality: 'incomplete', qualityNote: 'no DWI.' })
    expect(text).toContain('Incomplete study: no DWI.')
    expect(text).toContain('O-RADS MRI 0 — incomplete.')
    expect(text).not.toContain('Management:')
    expectClean(text)
  })

  it('thickened endometrium with an ovarian mass hints at a hormone-producing tumor', () => {
    // "thickened endometrium + ovarian mass hints at a hormone-producing tumor"
    const v = { ...solid, t2: 'notDark', dwi: 'notDark', curve: '3', endometrium: 'thickened' }
    expect(report(study, v).text).toContain('Thickened endometrium with an ovarian mass, which hints at a hormone-producing tumor.')
    expect(chips(study, 'other', { ...v, origin: 'tubal' })).toEqual({})
  })
})

describe('O-RADS MRI: required items and contradictions', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { text, warnings } = report(study)
    expect(warnings).toEqual([
      'Contrast not stated',
      'Menopausal status not stated',
      'Finding not stated',
      'Side not stated',
      'Origin not stated',
      'Size, dimension 1 not stated',
      'Contralateral ovary not stated',
      'Peritoneum and omentum not stated',
      'Architecture not stated',
      'Fat (drops out on T1 fat-sat) not stated',
      'Enhancing solid tissue not stated',
      'O-RADS MRI score not derived: say whether there is an adnexal lesion.',
    ])
    expect(text).toContain('O-RADS MRI [score not derived].')
    expectClean(text)
  })
  it('asks about the myometrium only with DCE', () => {
    expect(report(study, { contrast: 'dce' }).warnings).toContain('Myometrium in the field of view not stated')
    expect(report(study, { contrast: 'single' }).warnings).not.toContain('Myometrium in the field of view not stated')
  })
  it('no lesion drops the lesion items', () => {
    const { warnings } = report(study, { lesion: 'none' })
    expect(warnings).not.toContain('Side not stated')
    expect(warnings).not.toContain('Enhancing solid tissue not stated')
  })
  it('no contrast', () => {
    expect(report(study, { ...base, contrast: 'none' }).warnings.some((w) => w.startsWith('No contrast: the minimum protocol includes DCE'))).toBe(true)
    expect(report(study, { ...base, contrast: 'none', quality: 'incomplete' }).warnings.some((w) => w.startsWith('No contrast'))).toBe(false)
  })
  it('DCE without the myometrium', () => {
    expect(report(study, { ...base, myometrium: 'no' }).warnings).toContain('DCE without the myometrium in the field: the myometrium is the reference tissue for the curve.')
  })
  it('physiologic finding in a postmenopausal woman', () => {
    expect(report(study, { ...base, meno: 'post', lesion: 'physio' }).warnings).toContain('Score 1 (follicle, hemorrhagic cyst or corpus luteum ≤3 cm) applies to a premenopausal woman only.')
  })
  it('physiologic finding above 3 cm', () => {
    const w = 'Score 1 applies only up to 3 cm, so this is scored as a lesion (a follicle or simple cyst above 3 cm in a premenopausal woman is score 2, not score 1).'
    expect(report(study, { ...base, lesion: 'physio', size1: '3.1' }).warnings).toContain(w)
    expect(report(study, { ...base, lesion: 'physio', size1: '3' }).warnings).not.toContain(w)
  })
  it('ovary marked separate but the origin says ovarian', () => {
    const w = 'Ipsilateral ovary marked separate and normal (probably not ovarian), but the origin or another sign says ovarian.'
    expect(report(study, { ...base, originSigns: ['separate'] }).warnings).toContain(w)
    expect(report(study, { ...base, origin: 'paraovarian', originSigns: ['separate', 'claw'] }).warnings).toContain(w)
    expect(report(study, { ...base, origin: 'paraovarian', originSigns: ['separate'] }).warnings).not.toContain(w)
  })
  // "an enhancing irregular septation or irregular wall thickening is solid tissue in the lexicon"
  it('irregular wall or septum with solid tissue marked absent', () => {
    const w = 'Irregular wall or septum marked, but solid tissue absent: an enhancing irregular septation or irregular wall thickening is solid tissue in the lexicon.'
    expect(report(study, { ...cystic, wallContour: 'irregular' }).warnings).toContain(w)
    expect(report(study, { ...cystic, architecture: 'multilocular', septa: 'irregular' }).warnings).toContain(w)
    expect(report(study, { ...cystic, wallContour: 'smooth' }).warnings).not.toContain(w)
  })
  it('solid architecture with solid tissue marked absent', () => {
    expect(report(study, { ...cystic, architecture: 'solid' }).warnings).toContain('Architecture marked solid but enhancing solid tissue marked absent.')
  })
  // "with multiple or bilateral lesions, each lesion is characterized separately, and management follows the lesion with the highest score"
  it('several lesions', () => {
    const { warnings } = report(study, { ...base, lesionCount: '2' })
    expect(warnings).toContain('Several lesions: state which one drives management.')
    expect(warnings).toContain('Each lesion is characterized separately: this form scores one lesion; add the others under Step 8.')
    expect(report(study, { ...base, lesionCount: '2', drives: 'left' }).warnings).not.toContain('Several lesions: state which one drives management.')
  })
})
