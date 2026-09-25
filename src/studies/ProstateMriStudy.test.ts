import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { ProstateMriStudyPage } from './ProstateMriStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. Quote the lesson sentence the case comes from. The
 * per-lesson category comes from the shared calculator in src/logic/pirads.ts.
 */
const study = studyOf(ProstateMriStudyPage)

/** Clinical, technique and gland answers for a never-biopsied man; no lesions yet. */
const base: Values = {
  psa: '6',
  biopsy: 'none',
  indication: 'detect',
  fieldStrength: '3',
  sequences: ['t2', 'dwi', 'dce', 't1'],
  contrast: 'yes',
  quality: 'adequate',
  hemorrhage: 'absent',
  length: '5',
  width: '4',
  height: '2',
  nodes: 'none',
  bones: 'none',
}

/** Lesion 1, fully described. Scores are overridden per case. */
function lesion1(extra: Values): Values {
  return {
    ...base,
    lesionCount: '1',
    l1side: 'left',
    l1level: 'mid',
    l1ap: 'posterior',
    l1size: '10',
    l1epe: 'no',
    l1images: 'series 5, image 14',
    l1dce: 'neg',
    ...extra,
  }
}

const pz = (dwi: string, extra: Values = {}) => lesion1({ l1zone: 'pz', l1dwi: dwi, l1t2p: dwi, ...extra })
const tz = (t2: string, dwi: string, extra: Values = {}) => lesion1({ l1zone: 'tz', l1t2: t2, l1dwi: dwi, ...extra })
const score = (values: Values) => chips(study, 'score', values)['Lesion 1']

function impressionOf(values: Values) {
  return report(study, values).text.split('IMPRESSION:\n')[1] ?? ''
}

describe('prostate MRI: peripheral zone is scored by DWI', () => {
  // "The rule that runs everything: PZ is scored by DWI; TZ is scored by T2."
  it.each([['1'], ['2'], ['3'], ['4']])('PZ DWI %s gives PI-RADS %s', (dwi) => {
    expect(score(pz(dwi))).toBe(`PI-RADS ${dwi}`)
  })
  it('the PZ T2 score does not change the category', () => {
    expect(score(pz('2', { l1t2p: '5' }))).toBe('PI-RADS 2')
  })
})

describe('prostate MRI: DCE upgrades only PZ 3', () => {
  // "Focal early enhancement that matches the T2/DWI abnormality = "positive" and pushes PZ 3 → 4."
  it('PZ DWI 3 with positive DCE is PI-RADS 4', () => {
    const values = pz('3', { l1dce: 'pos' })
    expect(score(values)).toBe('PI-RADS 4')
    expect(chips(study, 'dce', values)['Lesion 1']).toBe('PZ 3 → 4 (DCE positive)')
  })
  it('PZ DWI 3 with negative DCE stays PI-RADS 3', () => {
    expect(score(pz('3', { l1dce: 'neg' }))).toBe('PI-RADS 3')
  })
  it('a positive DCE answer is ignored when no contrast was given', () => {
    const values = pz('3', { contrast: 'no', sequences: ['t2', 'dwi'], l1dce: 'pos' })
    expect(score(values)).toBe('PI-RADS 3')
    expect(chips(study, 'dce', values).DCE).toBe('Not performed (no contrast)')
  })
  // "In v2.1 DCE has one job only: upgrading a PZ score 3 to 4. It never changes a TZ score."
  it('DCE never changes a TZ score', () => {
    const values = tz('3', '3', { l1dce: 'pos' })
    expect(score(values)).toBe('PI-RADS 3')
    expect(chips(study, 'dce', values)['Lesion 1']).toBe('TZ: DCE never changes the score')
  })
  it('DCE does not upgrade PZ DWI 2', () => {
    expect(score(pz('2', { l1dce: 'pos' }))).toBe('PI-RADS 2')
  })
})

describe('prostate MRI: transition zone is scored by T2, DWI only nudges', () => {
  // "In the TZ a DWI of 4 or 5 upgrades a T2 score of 2 to 3, and a DWI of 5 upgrades a T2 score of 3 to 4."
  it.each([
    ['1', '5', 'PI-RADS 1'],
    ['2', '3', 'PI-RADS 2'],
    ['2', '4', 'PI-RADS 3'],
    ['2', '5', 'PI-RADS 3'],
    ['3', '4', 'PI-RADS 3'],
    ['3', '5', 'PI-RADS 4'],
    ['4', '1', 'PI-RADS 4'],
  ])('TZ T2 %s with DWI %s is %s', (t2, dwi, expected) => {
    expect(score(tz(t2, dwi))).toBe(expected)
  })
})

describe('prostate MRI: the 1.5 cm line between 4 and 5', () => {
  // "4: focal, markedly dark ADC and markedly bright high-b, < 1.5 cm."
  // "5: same as 4 but ≥ 1.5 cm, OR definite extraprostatic extension."
  it('PZ 4 at 14.9 mm stays 4', () => {
    expect(score(pz('4', { l1size: '14.9' }))).toBe('PI-RADS 4')
  })
  it('PZ 4 at 15 mm is 5', () => {
    expect(score(pz('4', { l1size: '15' }))).toBe('PI-RADS 5')
  })
  it('PZ 4 with definite EPE is 5', () => {
    expect(score(pz('4', { l1size: '8', l1epe: 'yes' }))).toBe('PI-RADS 5')
  })
  // "TZ 4 and 5 split on the same 1.5 cm line."
  it('TZ 4 at 14.9 mm stays 4, at 15 mm is 5', () => {
    expect(score(tz('4', '3', { l1size: '14.9' }))).toBe('PI-RADS 4')
    expect(score(tz('4', '3', { l1size: '15' }))).toBe('PI-RADS 5')
  })
  // v2.1: a score of 5 is 'same as 4 but >= 1.5 cm', a property of the driving sequence score.
  // A PZ 3 upgraded to 4 by DCE is not a DWI 4, so size does not make it 5. (This case used to
  // expect 5, pinning a calculator bug that applied the size rule to any category 4.)
  it('a PZ 3 upgraded to 4 by DCE stays 4 at 15 mm', () => {
    expect(score(pz('3', { l1dce: 'pos', l1size: '15' }))).toBe('PI-RADS 4')
  })
})

describe('prostate MRI: index lesion', () => {
  // "name the index lesion (highest score; if tied, the one with EPE, then the largest)"
  const two = (l1: Values, l2: Values): Values => ({
    ...lesion1({ l1zone: 'pz', l1t2p: '3', ...l1 }),
    lesionCount: '2',
    l2zone: 'pz',
    l2t2p: '3',
    l2side: 'right',
    l2level: 'base',
    l2ap: 'posterior',
    l2epe: 'no',
    l2images: 'series 5, image 9',
    l2dce: 'neg',
    ...l2,
  })
  it('the highest score wins', () => {
    const c = chips(study, 'score', two({ l1dwi: '3', l1size: '20' }, { l2dwi: '4', l2size: '6' }))
    expect(c['Index lesion']).toBe('Lesion 2')
    expect(c.Overall).toBe('PI-RADS 4')
  })
  it('on a tie, the one with EPE wins', () => {
    const c = chips(study, 'score', two({ l1dwi: '5', l1size: '20', l1epe: 'no' }, { l2dwi: '4', l2size: '10', l2epe: 'yes' }))
    expect(c['Lesion 1']).toBe('PI-RADS 5')
    expect(c['Lesion 2']).toBe('PI-RADS 5')
    expect(c['Index lesion']).toBe('Lesion 2')
  })
  it('on a tie without EPE, the largest wins', () => {
    const c = chips(study, 'score', two({ l1dwi: '4', l1size: '8' }, { l2dwi: '4', l2size: '12' }))
    expect(c['Index lesion']).toBe('Lesion 2')
    const text = report(study, two({ l1dwi: '4', l1size: '8' }, { l2dwi: '4', l2size: '12' })).text
    expect(text).toContain('Lesion 2 (index):')
    expect(text).toContain('Index lesion: right peripheral zone, base, posterior, 12 mm, PI-RADS 4.')
  })
})

describe('prostate MRI: gland volume and PSA density', () => {
  // "Volume = length × width × height × 0.52"
  it('5 x 4 x 2 cm is 20.8 mL', () => {
    expect(chips(study, 't2-gland', base).Volume).toBe('20.8 mL')
  })
  // "Density above roughly 0.15 ng/mL/cc makes an equivocal lesion more worrying."
  it('0.15 is not above 0.15', () => {
    const c = chips(study, 't2-gland', { ...base, psa: '3.2' })
    expect(c['PSA density']).toBe('0.15 ng/mL/cc')
    expect(c.Density).toBeUndefined()
  })
  it('0.16 is above 0.15', () => {
    const c = chips(study, 't2-gland', { ...base, psa: '3.33' })
    expect(c['PSA density']).toBe('0.16 ng/mL/cc')
    expect(c.Density).toBe('Above roughly 0.15: an equivocal lesion is more worrying')
  })
})

describe('prostate MRI: biopsy gap', () => {
  // "Prior biopsy? When? ... Ideal gap is ≥6 weeks."
  const biopsied = { ...base, biopsy: 'neg', indication: 'negbx' }
  it('5 weeks is under the ideal gap', () => {
    expect(chips(study, 'details', { ...biopsied, biopsyWeeks: '5' })['Biopsy gap']).toBe('5 weeks: under the ideal ≥6')
    expect(report(study, { ...biopsied, biopsyWeeks: '5' }).warnings).toContain('Biopsy 5 weeks ago: the ideal gap is ≥6 weeks; blood in the gland confuses the read.')
  })
  it('6 weeks meets it', () => {
    expect(chips(study, 'details', { ...biopsied, biopsyWeeks: '6' })['Biopsy gap']).toBe('6 weeks: ≥6')
    expect(report(study, { ...biopsied, biopsyWeeks: '6' }).warnings.some((w) => w.startsWith('Biopsy '))).toBe(false)
  })
  // "finasteride shrinks the gland and lowers PSA by ~50%"
  it('a 5-alpha reductase inhibitor is flagged', () => {
    expect(chips(study, 'details', { ...base, treatment: ['5ari'] })['5-ARI']).toBe('Gland shrunk, PSA lowered ~50%')
  })
})

describe('prostate MRI: staging (Mehralivand EPE grade)', () => {
  // "Stage any lesion ≥ PI-RADS 4"
  const staged = (extra: Values) => pz('4', { epeMethod: 'grade', svi: 'none', nvb: 'sym', bladderNeck: 'clear', ...extra })
  const grade = (extra: Values) => chips(study, 'staging', staged(extra))['EPE grade']
  it('staging is not needed below PI-RADS 4', () => {
    expect(chips(study, 'staging', pz('3')).Staging).toBe('Not needed: no lesion ≥ PI-RADS 4')
    expect(report(study, pz('3')).warnings).not.toContain('EPE reported as not stated')
    expect(report(study, pz('4')).warnings).toContain('EPE reported as not stated')
  })
  // "Grade 1: tumor touching the capsule for ≥ 1.5 cm, or capsular bulge/irregularity."
  it('contact 14 mm and no bulge meets no criterion', () => {
    expect(grade({ contact: '14', bulge: 'no', outside: 'no' })).toBe('No grade 1-3 criterion met')
  })
  it('contact 15 mm alone is grade 1', () => {
    expect(grade({ contact: '15', bulge: 'no', outside: 'no' })).toBe('Grade 1')
  })
  it('bulge alone is grade 1', () => {
    expect(grade({ contact: '5', bulge: 'yes', outside: 'no' })).toBe('Grade 1')
  })
  // "Grade 2: both of those."
  it('contact 15 mm and bulge is grade 2', () => {
    expect(grade({ contact: '15', bulge: 'yes', outside: 'no' })).toBe('Grade 2')
  })
  it('contact 14 mm and bulge is grade 1, not 2', () => {
    expect(grade({ contact: '14', bulge: 'yes', outside: 'no' })).toBe('Grade 1')
  })
  // "Grade 3: tumor clearly outside the gland, or invading the seminal vesicle / neurovascular bundle."
  it('tumor clearly outside the gland is grade 3', () => {
    expect(grade({ contact: '5', bulge: 'no', outside: 'yes' })).toBe('Grade 3')
  })
  it('seminal vesicle invasion is grade 3', () => {
    expect(grade({ contact: '5', bulge: 'no', outside: 'no', svi: 'left' })).toBe('Grade 3')
  })
  it('neurovascular bundle invasion is grade 3', () => {
    expect(grade({ contact: '5', bulge: 'no', outside: 'no', nvb: 'inv' })).toBe('Grade 3')
  })
  it('no grade until both grade 1 criteria are answered', () => {
    expect(grade({ contact: '20' })).toBeUndefined()
  })
  // "If your group uses "low/intermediate/high suspicion for EPE" instead, that's acceptable, but state your criteria."
  it('the suspicion-level method asks for its criteria', () => {
    const values = pz('4', { epeMethod: 'likert', likert: 'high', contact: '12', svi: 'none', nvb: 'sym', bladderNeck: 'clear' })
    expect(report(study, values).warnings).toContain('Criteria used not stated')
    expect(impressionOf({ ...values, likertCriteria: 'broad contact' })).toContain('high suspicion for EPE')
  })
})

describe('prostate MRI: whole cases', () => {
  it('normal gland: overall PI-RADS 1, no biopsy advice', () => {
    const values = { ...base, lesionCount: '0', noLesionCat: '1' }
    const { text, warnings } = report(study, values)
    expect(text).toContain('Lesions: No focal lesion.')
    expect(text).toContain('Prostate: Volume 5 x 4 x 2 cm (20.8 mL). PSA density 0.29 ng/mL/cc. No hemorrhage.')
    expect(impressionOf(values)).toBe('1. Overall PI-RADS 1.')
    expect(warnings).toEqual([])
  })

  it('equivocal PZ lesion: PI-RADS 3, biopsy guided by PSA density', () => {
    const values = pz('3', { psa: '3.2' })
    const impression = impressionOf(values)
    expect(impression).toContain('1. Overall PI-RADS 3.')
    expect(impression).toContain('Lesion: left peripheral zone, mid-gland, posterior, 10 mm, PI-RADS 3.')
    expect(impression).toContain('Biopsy decision may be guided by PSA density (0.15 ng/mL/cc) and clinical risk.')
    expect(impression).not.toContain('targeted biopsy')
    expect(report(study, values).warnings).toEqual([])
  })

  it('typical PZ 4 with DCE upgrade: targeted biopsy, no EPE', () => {
    const values = pz('3', { l1dce: 'pos', epeMethod: 'grade', contact: '8', bulge: 'no', outside: 'no', svi: 'none', nvb: 'sym', bladderNeck: 'clear' })
    const { text, warnings } = report(study, values)
    expect(text).toContain('Lesion 1: Left peripheral zone, mid-gland, posterior. 10 mm on ADC. T2 score 3, DWI score 3, DCE positive. PI-RADS 4. Images: series 5, image 14.')
    const impression = impressionOf(values)
    expect(impression).toContain('1. Overall PI-RADS 4.')
    expect(impression).toContain('Staging: no EPE grade 1-3 criterion met; no seminal vesicle invasion.')
    expect(impression).toContain('MRI-targeted biopsy of the index lesion recommended.')
    expect(warnings).toEqual([])
  })

  it('advanced TZ 5 with EPE and seminal vesicle invasion', () => {
    const values = tz('5', '5', {
      l1size: '22',
      l1epe: 'yes',
      l1side: 'right',
      l1ap: 'anterior',
      epeMethod: 'grade',
      contact: '25',
      bulge: 'yes',
      outside: 'yes',
      svi: 'right',
      nvb: 'inv',
      bladderNeck: 'inv',
      rectum: 'clear',
      apexDistance: '6',
      nodes: 'susp',
      nodeStations: ['obturator'],
      nodeShortAxis: '11',
    })
    const { text, warnings } = report(study, values)
    expect(text).toContain('Staging: Capsular contact length 25 mm. Capsular bulge/irregularity present. Tumor clearly outside the gland. EPE grade 3 (Mehralivand).')
    expect(text).toContain('Lymph nodes: Suspicious pelvic lymph nodes (obturator), largest short axis 11 mm.')
    const impression = impressionOf(values)
    expect(impression).toContain('1. Overall PI-RADS 5.')
    expect(impression).toContain('Lesion: right transition zone, mid-gland, anterior, 22 mm, PI-RADS 5.')
    expect(impression).toContain('EPE grade 3; seminal vesicle invasion (right); neurovascular bundle invasion; bladder neck involvement.')
    expect(impression).toContain('MRI-targeted biopsy of the index lesion recommended.')
    expect(warnings).toEqual([])
  })
})

describe('prostate MRI: required items', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { warnings } = report(study)
    for (const label of [
      'PSA',
      'Biopsy history',
      'Why the scan',
      'Contrast',
      'Image quality',
      'Hemorrhage (bright T1 in the gland)',
      'Length (sagittal)',
      'Width (axial)',
      'Height (axial)',
      'Lesions to report',
      'Pelvic lymph nodes',
      'Bones in the field of view',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
    expect(report(study).text).toBe('')
  })
  // "never leave the impression without an overall PI-RADS number"
  it('with no lesion, the overall category must be stated', () => {
    expect(report(study, { ...base, lesionCount: '0' }).warnings).toContain('Overall category with no lesion reported not stated')
  })
  it('each reported lesion needs its location, size, EPE answer and images', () => {
    const { warnings } = report(study, { ...base, lesionCount: '1' })
    for (const label of ['zone', 'DWI score', 'side', 'level', 'anterior/posterior', 'size, largest dimension', 'definite extraprostatic extension', 'series/image for targeting', 'DCE']) {
      expect(warnings).toContain(`Lesion 1 ${label} not stated`)
    }
    expect(warnings).toContain('No overall PI-RADS number yet: enter zone, DWI and (TZ) T2 scores. Never leave the impression without one.')
    expect(warnings).toContain('1 of 1 lesions cannot be scored yet (zone, DWI, and T2 for a TZ lesion are needed).')
  })
  it('a TZ lesion needs its T2 score before it can be scored', () => {
    const { warnings } = report(study, tz('', '4', { l1t2: undefined }))
    expect(warnings).toContain('Lesion 1 T2 score (TZ) not stated')
    expect(warnings).toContain('1 of 1 lesions cannot be scored yet (zone, DWI, and T2 for a TZ lesion are needed).')
  })
})

describe('prostate MRI: contradictions', () => {
  it('EPE on a lesion scoring under 4', () => {
    expect(report(study, pz('3', { l1epe: 'yes' })).warnings).toContain('Lesion 1 is marked with definite EPE but its DWI score is 3: EPE makes a DWI score of 4 into 5, so check the DWI score.')
  })
  it('EPE on a PZ 3 that DCE lifted to 4 (not a DWI 4, so it stays 4)', () => {
    expect(report(study, pz('3', { l1dce: 'pos', l1epe: 'yes' })).warnings).toContain('Lesion 1 is marked with definite EPE but its DWI score is 3: EPE makes a DWI score of 4 into 5, so check the DWI score.')
  })
  // "5: same as 4 but ≥ 1.5 cm, OR definite extraprostatic extension."
  it('DWI 5 under 1.5 cm without EPE', () => {
    expect(report(study, pz('5', { l1size: '14' })).warnings).toContain('Lesion 1: DWI score 5 needs ≥ 1.5 cm or definite EPE, but it is 14 mm without EPE.')
    expect(report(study, pz('5', { l1size: '15' })).warnings.some((w) => w.includes('needs ≥ 1.5 cm'))).toBe(false)
  })
  it('TZ T2 5 under 1.5 cm without EPE', () => {
    expect(report(study, tz('5', '3', { l1size: '12' })).warnings).toContain('Lesion 1: T2 score 5 needs ≥ 1.5 cm or definite EPE, but it is 12 mm without EPE.')
  })
  it('detection indication with a prior biopsy', () => {
    expect(report(study, { ...base, biopsy: 'neg' }).warnings).toContain('Indication is detection (never biopsied), but the biopsy history records a prior biopsy.')
  })
  it('prior-negative-biopsy indication without one recorded', () => {
    expect(report(study, { ...base, indication: 'negbx' }).warnings).toContain('Indication is prior negative biopsy, but the biopsy history does not record one.')
  })
  it('hemorrhage in a never-biopsied gland', () => {
    expect(report(study, { ...base, hemorrhage: 'present' }).warnings).toContain('Hemorrhage present but biopsy history says never biopsied: check the history.')
  })
  // "A history of BCG in the requisition should make you hedge"
  it('BCG history', () => {
    expect(chips(study, 'details', { ...base, treatment: ['bcg'] }).BCG).toBe('Granulomatous prostatitis can mimic cancer: hedge')
    expect(report(study, { ...base, treatment: ['bcg'] }).warnings).toContain('BCG history: granulomatous prostatitis can be indistinguishable from cancer on mpMRI and may mimic EPE and lymphadenopathy; hedge.')
  })
  it('DCE listed with no contrast, and contrast with no DCE', () => {
    expect(report(study, { ...base, contrast: 'no' }).warnings).toContain('DCE listed as a sequence but contrast marked not given.')
    expect(report(study, { ...base, sequences: ['t2', 'dwi'] }).warnings).toContain('Contrast given but DCE not listed among the sequences.')
  })
  it('lesion EPE but staging says not clearly outside', () => {
    const values = pz('4', { l1epe: 'yes', epeMethod: 'grade', contact: '10', bulge: 'no', outside: 'no', svi: 'none', nvb: 'sym', bladderNeck: 'clear' })
    expect(report(study, values).warnings).toContain('A lesion is marked with definite EPE, but staging says tumor is not clearly outside the gland.')
  })
  it('staging says outside but no lesion has EPE', () => {
    const values = pz('4', { epeMethod: 'grade', contact: '10', bulge: 'no', outside: 'yes', svi: 'none', nvb: 'sym', bladderNeck: 'clear' })
    expect(report(study, values).warnings).toContain('Staging says tumor is clearly outside the gland, but no lesion is marked with definite EPE (which makes it PI-RADS 5).')
  })
  // "don't write "cannot exclude carcinoma" on a PI-RADS 2"
  it('"cannot exclude" on a PI-RADS 2', () => {
    const warning = 'Don\'t write "cannot exclude carcinoma" on a PI-RADS 2: the number replaces that phrase.'
    expect(report(study, pz('2', { otherPelvic: 'Cannot exclude carcinoma' })).warnings).toContain(warning)
    expect(report(study, pz('3', { otherPelvic: 'Cannot exclude carcinoma' })).warnings).not.toContain(warning)
  })
  it('rectal gas limits the PZ read', () => {
    const values = { ...base, quality: 'limited', limitations: ['gas'] }
    expect(chips(study, 'details', values)['Rectal gas']).toBe('Limits the PZ read')
    expect(report(study, values).text).toContain('Quality: Limited by rectal gas (DWI distortion limits the peripheral zone read).')
  })
})

describe('prostate MRI: output text', () => {
  const cases: Values[] = [
    {},
    base,
    { ...base, lesionCount: '0', noLesionCat: '2' },
    { ...base, lesionCount: '1' },
    { ...base, lesionCount: '2', l1zone: 'pz', l1dwi: '4' },
    pz('3', { psa: undefined }),
    tz('4', '4', { l1size: undefined, l1side: undefined, epeMethod: 'grade' }),
    { ...base, quality: 'limited', limitations: ['motion', 'hip'], limitationOther: 'bladder empty', biopsy: 'pos', biopsyWeeks: '8', biopsyDetail: 'GG1 left apex', treatment: ['rt', 'hormones'] },
    { psa: '5', length: '4' },
  ]
  it.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})
