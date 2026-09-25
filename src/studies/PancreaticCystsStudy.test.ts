import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { PancreaticCystsStudyPage } from './PancreaticCystsStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The lesson sentence each case comes from is quoted.
 */
const study = studyOf(PancreaticCystsStudyPage)

/** Practice case 1: 58-year-old, 9 mm head cyst, thin neck to the duct, MPD 2 mm, no priors. */
const case1: Values = {
  protocol: 'mri',
  age: '58',
  symptomatic: 'no',
  location: 'head',
  morphology: 'uni',
  wall: 'thin',
  septa: 'no',
  calc: 'none',
  type: 'bd',
  comm: 'present',
  mpd: '2',
  size: '9',
  priorStatus: 'first',
  multiplicity: 'single',
}

const rec = (values: Values) => report(study, values).text.match(/^Recommendation: (.*)$/m)?.[1] ?? ''
const warn = (values: Values) => report(study, values).warnings.join('\n')
const kyoto = (values: Values) => rec({ ...values, recSource: 'kyoto' })

describe('pancreatic cysts: ACR chart by size and age', () => {
  // "Cysts under 1.5 cm (Chart 1)", "Cysts 1.5–2.5 cm (Chart 2)", "Cysts over 2.5 cm (Chart 3)"
  it.each([
    ['14.9', 'Chart 1 (under 1.5 cm)'],
    ['15', 'Chart 2B (1.5–2.5 cm, communication absent or unknown)'],
    ['25', 'Chart 2B (1.5–2.5 cm, communication absent or unknown)'],
    ['25.1', 'Chart 3 (over 2.5 cm)'],
  ])('%s mm is %s', (size, chart) => {
    expect(chips(study, 'measure', { size, age: '60' }).ACR).toBe(chart)
  })
  // "2A, duct communication proven (BD-IPMN)"
  it('communicating 1.5–2.5 cm cyst is Chart 2A', () => {
    expect(chips(study, 'measure', { size: '20', comm: 'present' }).ACR).toMatch(/^Chart 2A/)
  })
  // "Patients 80 or older at presentation (Chart 4)"
  it.each([
    ['79', 'Chart 1 (under 1.5 cm)'],
    ['80', 'Chart 4 (80 or older)'],
  ])('age %s is %s', (age, chart) => {
    expect(chips(study, 'protocol', { size: '9', age }).ACR).toBe(chart)
  })
  // "if the patient has jaundice, weight loss, ... the algorithm does not apply and the patient should be referred"
  it('symptomatic patient: the algorithm does not apply', () => {
    expect(chips(study, 'protocol', { symptomatic: 'yes' })['ACR algorithm']).toBe('Does not apply: refer')
    expect(rec({ ...case1, symptomatic: 'yes' })).toMatch(/does not apply to a symptomatic patient; referral advised/)
  })
  it('portal-phase CT is flagged as not optimized', () => {
    expect(chips(study, 'protocol', { protocol: 'pvct' }).Protocol).toBe('Single phase, not optimized')
  })
})

describe('pancreatic cysts: ACR recommendations', () => {
  // Chart 1: "Under 65 at presentation: image yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years."
  // "Age 65–79: image every 2 years for 5 rounds; stop if still under 1.5 cm over 10 years."
  it('under 65 vs 65-79', () => {
    expect(rec({ ...case1, age: '64' })).toMatch(/yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years.*Chart 1/)
    expect(rec({ ...case1, age: '65' })).toMatch(/every 2 years for 5 rounds; stop if still under 1\.5 cm over 10 years.*Chart 1/)
  })
  it('Chart 1 without an age asks for it', () => {
    expect(rec({ ...case1, age: '' })).toBe('')
    expect(warn({ ...case1, age: '' })).toMatch(/State the patient age/)
  })
  // ""White dot" cysts (<5 mm on T2): a single follow-up at 2 years showing stability is enough to stop"
  it.each([
    ['4.9', /Single follow-up at 2 years; stop if stable.*white-dot/],
    ['5', /yearly for 5 years/],
  ])('%s mm white-dot boundary', (size, expected) => {
    expect(rec({ ...case1, size })).toMatch(expected)
  })
  // "If it grows: move up in frequency (yearly) or go to EUS/FNA."
  it('growth in Chart 1 increases frequency', () => {
    expect(rec({ ...case1, priorSize: '6', priorDate: '2024-01-01', size: '9' })).toMatch(/^Growth by the ACR definition: increase imaging frequency to yearly or EUS\/FNA/)
  })
  // "2A ... 1.5–1.9 cm → yearly for 5 years then every 2 years for 4 years; 2.0–2.5 cm → every 6 months for 2 years, yearly for 2, then every 2 years for 6."
  it.each([
    ['19.9', /yearly for 5 years, then every 2 years for 4 years.*Chart 2A/],
    ['20', /every 6 months for 2 years, yearly for 2, then every 2 years for 6.*Chart 2A/],
  ])('Chart 2A at %s mm', (size, expected) => {
    expect(rec({ ...case1, size })).toMatch(expected)
  })
  // "2B, communication absent or unknown: either image every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or go straight to EUS/FNA"
  it('Chart 2B', () => {
    expect(rec({ ...case1, size: '22', comm: 'absent', type: 'muc' })).toMatch(/every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or EUS\/FNA.*Chart 2B/)
  })
  // "Any cyst ≥2 cm that shows definable growth will be at least 2.4 cm, and for those EUS/FNA is advised."
  it('Chart 2 growth from 2 cm or more goes to EUS/FNA; from under 2 cm it warns', () => {
    expect(rec({ ...case1, size: '24', priorSize: '20', priorDate: '2024-01-01' })).toMatch(/^EUS\/FNA advised because of definable growth in a cyst of 2 cm or more/)
    const below = { ...case1, size: '23.9', priorSize: '19.9', priorDate: '2024-01-01' }
    expect(rec(below)).not.toMatch(/definable growth/)
    expect(warn(below)).toMatch(/Growth by the ACR definition \(20%\) in a Chart 2 cyst/)
  })
  // "Low-risk = no mural nodule, no wall thickening, normal-caliber duct, no peripheral calcification ... Low-risk cysts can be carefully followed"
  it('Chart 3 low-risk when every item is stated', () => {
    expect(rec({ ...case1, size: '28' })).toMatch(/^Low-risk by imaging.*careful follow-up.*Chart 3/)
  })
  it('Chart 3 risk not established when an item is unstated', () => {
    const values = { ...case1, size: '28', wall: '', calc: '' }
    expect(rec(values)).toMatch(/^Cyst over 2\.5 cm/)
    expect(warn(values)).toMatch(/ACR Chart 3 risk not established \(wall, calcification\)/)
  })
  it('Chart 3 with MPD 5 mm is not low-risk', () => {
    expect(rec({ ...case1, size: '28', mpd: '5' })).toMatch(/^Cyst over 2\.5 cm/)
  })
  // "high-risk = any of mural nodule, wall thickening, MPD ≥7 mm, or peripheral calcification ... high-risk cysts go immediately to EUS/FNA and surgical evaluation"
  it('Chart 3 peripheral calcification goes to EUS/FNA; not below 2.5 cm', () => {
    expect(rec({ ...case1, size: '28', calc: 'peripheral' })).toMatch(/^EUS\/FNA and surgical consultation advised because of peripheral calcification/)
    expect(rec({ ...case1, size: '25', calc: 'peripheral' })).not.toMatch(/^EUS\/FNA/)
  })
  // "Patients 80 or older ... Follow-up or EUS/FNA is advised only if the patient is a surgical candidate; ≤2.5 cm → image every 2 years twice and stop if stable."
  it.each([
    ['25', /every 2 years twice, stopping if stable.*Chart 4/],
    ['25.1', /^Follow-up or EUS\/FNA advised only if the patient is a surgical candidate.*Chart 4/],
  ])('age 80, %s mm', (size, expected) => {
    expect(rec({ ...case1, age: '80', size })).toMatch(expected)
  })
  // Practice case 6: "82-year-old, 4 mm T2-bright dot ... Follow-up only if the patient would be a surgical candidate."
  it('white-dot cyst at 80 or older', () => {
    expect(rec({ ...case1, age: '82', size: '4' })).toMatch(/^White-dot cyst in a patient 80 or older.*single follow-up at 2 years at most/)
  })
  // "Confident SCA: follow-up depends on symptoms; an SCA over 4 cm or symptomatic may need resection"
  it.each([
    ['40', /^Serous cystadenoma with classic features: no surveillance for malignancy needed\. Not over 4 cm and asymptomatic, no surgical referral\./],
    ['40.1', /^Serous cystadenoma over 4 cm: resection may be needed/],
  ])('SCA at %s mm', (size, expected) => {
    expect(rec({ ...case1, type: 'sca', comm: 'absent', calc: 'central', morphology: 'micro', size })).toMatch(expected)
  })
})

describe('pancreatic cysts: ACR universal override', () => {
  // "appearance of any mural nodule, wall thickening, MPD dilation ≥7 mm, or biliary obstruction/jaundice should prompt immediate EUS/FNA and surgical evaluation regardless of cyst size or growth"
  it.each([
    ['6.9', false],
    ['7', true],
  ])('MPD %s mm override %s', (mpd, fires) => {
    const chip = chips(study, 'followup', { ...case1, mpd })['ACR override']
    expect(Boolean(chip)).toBe(fires)
    if (fires) expect(rec({ ...case1, mpd })).toMatch(/^EUS\/FNA and surgical consultation advised because of main pancreatic duct 7 mm/)
  })
  it.each([
    [{ nodule: 'nodule', enhance: 'nonenh', noduleSize: '3' }, /mural nodule/],
    [{ wall: 'thick' }, /wall thickening/],
    [{ clinical: ['jaundice'] }, /obstructive jaundice with a head cyst/],
    [{ biliary: 'dilated' }, /biliary dilatation/],
  ])('%o overrides a small cyst', (extra, reason) => {
    const r = rec({ ...case1, ...extra })
    expect(r).toMatch(/^EUS\/FNA and surgical consultation advised/)
    expect(r).toMatch(reason)
  })
  it('SCA with an override warns', () => {
    expect(warn({ ...case1, type: 'sca', comm: 'absent', wall: 'thick' })).toMatch(/Serous cystadenoma marked, but the ACR universal override/)
  })
  it('adds the surgical-candidate caveat at 80 or older', () => {
    expect(rec({ ...case1, age: '85', wall: 'thick' })).toMatch(/advised if the patient is a surgical candidate because of wall thickening/)
  })
  // Practice case 5: "abrupt caliber change with distal atrophy is a worrisome feature ... Recommend pancreas-protocol CT or MRI with pancreatic phase, and EUS."
  it('abrupt caliber change', () => {
    expect(rec({ ...case1, abrupt: 'yes' })).toMatch(/^Pancreas-protocol CT or MRI with pancreatic phase, and EUS, advised/)
  })
})

describe('pancreatic cysts: worrisome features and high-risk stigmata (Kyoto)', () => {
  const counts = (values: Values) => chips(study, 'features', { ...case1, ...values })
  // "enhancing mural nodule 5 mm or more" (HRS); "enhancing nodule under 5 mm" (WF)
  it.each([
    ['4.9', '1', '0'],
    ['5', '0', '1'],
  ])('enhancing nodule %s mm: WF %s, HRS %s', (noduleSize, wf, hrs) => {
    const c = counts({ nodule: 'nodule', enhance: 'enh', noduleSize })
    expect(c['Worrisome features']).toBe(wf)
    expect(c['High-risk stigmata']).toBe(hrs)
  })
  // "MPD 5–9 mm" (WF); "MPD 10 mm or more" (HRS)
  it.each([
    ['4.9', '0', '0', 'Below 5 mm'],
    ['5', '1', '0', 'Worrisome by Kyoto, below ACR 7 mm'],
    ['7', '1', '0', 'Worrisome (Kyoto 5–9 mm; ACR 7 mm)'],
    ['9.9', '1', '0', 'Worrisome (Kyoto 5–9 mm; ACR 7 mm)'],
    ['10', '0', '1', 'High-risk stigma (10 mm or more)'],
  ])('MPD %s mm: WF %s, HRS %s', (mpd, wf, hrs, chip) => {
    const c = counts({ mpd })
    expect(c['Worrisome features']).toBe(wf)
    expect(c['High-risk stigmata']).toBe(hrs)
    expect(chips(study, 'duct', { mpd }).MPD).toBe(chip)
  })
  // "A 6 mm duct is "worrisome" by Kyoto and "normal-ish" by ACR: say the number."
  it('MPD between 5 and 7 mm notes the guideline difference', () => {
    expect(warn({ ...case1, mpd: '6' })).toMatch(/MPD 6 mm is worrisome by Kyoto \(5–9 mm\) but below the ACR 7 mm cutoff/)
  })
  // "cyst 3 cm or more" (WF)
  it.each([
    ['29.9', '0'],
    ['30', '1'],
  ])('cyst %s mm: WF %s', (size, wf) => {
    expect(counts({ size })['Worrisome features']).toBe(wf)
  })
  it('a serous cystadenoma of 3 cm is not a worrisome feature', () => {
    expect(counts({ size: '30', type: 'sca' })['Worrisome features']).toBe('0')
  })
  // "obstructive jaundice with a head cyst"
  it('jaundice is high-risk only with a head cyst', () => {
    expect(counts({ clinical: ['jaundice'], location: 'uncinate' })['High-risk stigmata']).toBe('1')
    expect(counts({ clinical: ['jaundice'], location: 'tail' })['High-risk stigmata']).toBe('0')
    expect(warn({ ...case1, clinical: ['jaundice'], location: 'tail' })).toMatch(/not marked as in the head/)
  })
  // "Kyoto adds suspicious or positive cytology"; "ACR: enhancing solid component"
  it('cytology and an enhancing solid component are high-risk', () => {
    expect(counts({ clinical: ['cytology'] })['High-risk stigmata']).toBe('1')
    expect(counts({ nodule: 'solid', enhance: 'enh', noduleSize: '8' })['High-risk stigmata']).toBe('1')
  })
  // "ACR also lists a non-enhancing mural nodule." (kept out of the Kyoto count)
  it('a non-enhancing mural nodule is an ACR-only worrisome feature', () => {
    const values = { ...case1, nodule: 'nodule', enhance: 'nonenh', noduleSize: '3' }
    expect(counts(values)['Worrisome features']).toBe('0')
    expect(report(study, values).text).toContain('ACR worrisome feature: non-enhancing mural nodule.')
  })
  // "Zelga et al. ... 22% with one, 34% with two, 59% with three, and 100% with four or more."
  it.each([
    [[], undefined],
    [['ca199'], '22%'],
    [['ca199', 'pancreatitis'], '34%'],
    [['ca199', 'pancreatitis', 'diabetes'], '59%'],
    [['ca199', 'pancreatitis', 'diabetes'], '100%', { nodes: 'enlarged' }],
  ] as [string[], string | undefined, Values?][])('%o gives %s', (clinical, risk, extra = {}) => {
    expect(counts({ clinical, ...extra })['HGD or cancer (Zelga)']).toBe(risk)
  })
})

describe('pancreatic cysts: growth', () => {
  const growthChips = (priorSize: string, size: string, interval?: string) =>
    chips(study, 'growth', { size, priorSize, ...(interval ? { interval } : {}) })
  // "cysts under 0.5 cm, growth = 100% increase in long axis; 0.5 to under 1.5 cm, 50% increase; 1.5 cm and larger, 20% increase"
  it.each([
    ['4', '7.9', 'ACR growth (100%)', 'Does not meet'],
    ['4', '8', 'ACR growth (100%)', 'Meets'],
    ['4.9', '9.8', 'ACR growth (100%)', 'Meets'],
    ['5', '7.4', 'ACR growth (50%)', 'Does not meet'],
    ['5', '7.5', 'ACR growth (50%)', 'Meets'],
    ['14.9', '22', 'ACR growth (50%)', 'Does not meet'],
    ['15', '17.9', 'ACR growth (20%)', 'Does not meet'],
    ['15', '18', 'ACR growth (20%)', 'Meets'],
  ])('prior %s to %s mm: %s %s', (prior, size, label, value) => {
    expect(growthChips(prior, size)[label]).toBe(value)
  })
  // Kyoto: "≥2.5 mm/year is worrisome"; ACR: "a rate above 2 mm/year helps separate aggressive from indolent cysts"
  it.each([
    ['12', undefined, undefined],
    ['12.1', 'Above ~2 mm/yr', undefined],
    ['12.4', 'Above ~2 mm/yr', undefined],
    ['12.5', undefined, 'Worrisome (2.5 mm/yr or more)'],
  ])('10 to %s mm over 12 months', (size, acr, kyotoChip) => {
    const c = growthChips('10', size, '12')
    expect(c.ACR).toBe(acr)
    expect(c.Kyoto).toBe(kyotoChip)
  })
  it('2.5 mm/yr counts as a worrisome feature', () => {
    expect(chips(study, 'features', { ...case1, size: '12.5', priorSize: '10', interval: '12' })['Worrisome features']).toBe('1')
    expect(chips(study, 'features', { ...case1, size: '12.4', priorSize: '10', interval: '12' })['Worrisome features']).toBe('0')
  })
  // Practice case 4: "12 → 15 is 25%: does not meet the ACR growth definition. But it has crossed 1.5 cm, so it moves to Chart 2. Rate 1.5 mm/year"
  // "Report: "increased from 12 to 15 mm over 24 months, below ACR growth threshold; now ≥1.5 cm.""
  it('practice case 4: 12 to 15 mm over 24 months', () => {
    const c = growthChips('12', '15', '24')
    expect(c.Change).toBe('+25%')
    expect(c['ACR growth (50%)']).toBe('Does not meet')
    expect(c.Rate).toBe('1.5 mm/yr')
    expect(c['Now 1.5 cm or more']).toBe('Moves to ACR Chart 2')
    const { text } = report(study, { ...case1, size: '15', priorSize: '12', interval: '24', priorDate: '2024-09-01' })
    expect(text).toContain('Increased from 12 to 15 mm over 24 months, below ACR growth threshold; now 1.5 cm or more.')
    expect(text).toContain('Growth: 25% (does not meet ACR growth definition); rate ~1.5 mm/yr.')
  })
  // Pandey: "4.9 and 4.6 mm ... 55 months later showed 5.7 and 5.9 mm, no growth by ACR criteria"
  it('Pandey case: 4.6 to 5.9 mm is not growth', () => {
    expect(growthChips('4.6', '5.9', '55')['ACR growth (100%)']).toBe('Does not meet')
  })
  it('stable size reads as stable since the baseline', () => {
    expect(report(study, { ...case1, priorSize: '9', baseline: '2019-03-02 chest CT' }).text).toContain('Stable since 2019-03-02 chest CT.')
  })
})

describe('pancreatic cysts: other rule chips', () => {
  // "central calcification points to SCA; peripheral calcification points to MCN"
  it('calcification pattern', () => {
    expect(chips(study, 'name', { calc: 'central' })['Central calcification']).toBe('Points to SCA')
    expect(chips(study, 'name', { calc: 'peripheral' })['Peripheral calcification']).toBe('Points to MCN')
  })
  // "cysts under 10 mm are difficult or impossible to characterize"
  it.each([
    ['9.9', 'Hard to characterize'],
    ['10', undefined],
  ])('%s mm', (size, value) => {
    expect(chips(study, 'name', { size })['Under 10 mm']).toBe(value)
  })
  // "a cyst larger than 5 mm that communicates with the main duct is a BD-IPMN"
  it.each([
    ['5', undefined],
    ['5.1', 'BD-IPMN'],
  ])('communicating %s mm cyst', (size, value) => {
    expect(chips(study, 'duct', { size, comm: 'present' })['Kyoto definition']).toBe(value)
  })
  // "use the cyst with the longest dimension as the index lesion"
  it('index lesion is the longest cyst', () => {
    expect(chips(study, 'multiple', { size: '10', multiplicity: 'multiple', otherSize: '10.1' })['Index lesion']).toBe('Another cyst is longer')
    expect(chips(study, 'multiple', { size: '10', multiplicity: 'multiple', otherSize: '10' })['Index lesion']).toBeUndefined()
  })
})

describe('pancreatic cysts: Kyoto recommendations', () => {
  // "Any high-risk stigma → surgery in a fit patient."
  it('high-risk stigma goes to surgery', () => {
    expect(kyoto({ ...case1, mpd: '10' })).toMatch(/^Surgical evaluation advised in a fit patient because of high-risk stigmata \(main pancreatic duct 10 mm\)/)
  })
  // "Worrisome feature(s), no HRS → EUS ...; multiple WF push toward surgery"
  it('worrisome features go to EUS; multiple push toward surgery', () => {
    expect(kyoto({ ...case1, mpd: '6' })).toMatch(/^EUS \(with contrast and\/or FNA where available\) advised because of main pancreatic duct 6 mm, per Kyoto 2024\.$/)
    expect(kyoto({ ...case1, mpd: '6', nodes: 'enlarged' })).toMatch(/Multiple worrisome features push toward surgery\./)
  })
  // "Under 20 mm: once at 6 months, then every 18 months if stable. 20 to under 30 mm: 6 months twice, then yearly. 30 mm or more: every 6 months."
  it.each([
    ['19.9', /^MRI surveillance at 6 months, then every 18 months if stable.*stopping may be considered after 5 stable years/],
    ['20', /^MRI surveillance at 6 months twice, then yearly/],
    ['29.9', /^MRI surveillance at 6 months twice, then yearly/],
  ])('%s mm', (size, expected) => {
    expect(kyoto({ ...case1, size })).toMatch(expected)
  })
  it('30 mm is a worrisome feature, so EUS rather than surveillance', () => {
    expect(kyoto({ ...case1, size: '30' })).toMatch(/^EUS .*because of cyst 30 mm/)
  })
  it('30 mm SCA follows the SCA wording, not the size surveillance', () => {
    expect(kyoto({ ...case1, size: '30', type: 'sca', comm: 'absent' })).toMatch(/^Serous cystadenoma with classic features/)
  })
  it('mural nodule without enhancement asks for it', () => {
    const values = { ...case1, recSource: 'kyoto', nodule: 'nodule' }
    expect(rec(values)).toBe('')
    expect(warn(values)).toMatch(/Mural nodule: state its enhancement and size before applying Kyoto 2024/)
  })
  it('custom recommendation is used verbatim', () => {
    expect(rec({ ...case1, recSource: 'custom', recText: 'Discuss at MDT.' })).toBe('Discuss at MDT.')
  })
  it('Kyoto-only worrisome features warn on the ACR path', () => {
    expect(warn({ ...case1, clinical: ['ca199'] })).toMatch(/Worrisome features outside the ACR chart logic \(elevated CA19-9\)/)
  })
})

describe('pancreatic cysts: practice cases', () => {
  it('case 1: 9 mm BD-IPMN at 58', () => {
    const { text, warnings } = report(study, case1)
    expect(warnings).toEqual([])
    expect(text).toContain('9 mm presumed branch-duct IPMN in the pancreatic head.')
    expect(text).toContain('Worrisome features: none. High-risk stigmata: none.')
    expect(text).toContain('No prior imaging for comparison.')
    expect(text).toMatch(/Recommendation: .*yearly for 5 years.*Chart 1/)
  })
  it('case 2: 22 mm tail cyst at 71, no communication', () => {
    const { text } = report(study, { ...case1, age: '71', location: 'tail', size: '22', comm: 'absent', type: 'muc', mpd: '3' })
    expect(text).toContain('22 mm indeterminate cyst, presumed mucinous in the pancreatic tail.')
    expect(text).toContain('Worrisome features: none.')
    expect(text).toMatch(/Chart 2B/)
  })
  it('case 3: 3.4 cm head cyst with a 7 mm enhancing nodule, MPD 6 mm', () => {
    const values = { ...case1, age: '64', size: '34', morphology: 'multi', mpd: '6', nodule: 'nodule', enhance: 'enh', noduleSize: '7' }
    const { text } = report(study, values)
    expect(text).toContain('Worrisome features: 2 (cyst 34 mm; main pancreatic duct 6 mm). High-risk stigmata: enhancing mural nodule 7 mm.')
    expect(text).toMatch(/Recommendation: EUS\/FNA and surgical consultation advised because of enhancing mural nodule 7 mm\./)
  })
  it('case 5: stable 11 mm cyst with an abrupt caliber change on portal-phase CT', () => {
    const values = { ...case1, protocol: 'pvct', size: '11', priorSize: '11', priorDate: '2023-09-01', mpd: '4', abrupt: 'yes', stricture: 'present' }
    const { text, warnings } = report(study, values)
    expect(text).toContain('Worrisome features: 1 (abrupt caliber change with upstream atrophy).')
    expect(text).toContain('Note: single-phase portal-venous CT, not optimized for pancreatic evaluation.')
    expect(text).toMatch(/Recommendation: Pancreas-protocol CT or MRI with pancreatic phase, and EUS/)
    expect(warnings.join(' ')).not.toMatch(/Duct stricture marked/)
  })
  it('case 7: 2.8 cm classic SCA at 45', () => {
    const values = { ...case1, age: '45', location: 'body', size: '28', morphology: 'micro', calc: 'central', comm: 'absent', type: 'sca' }
    const { text, warnings } = report(study, values)
    expect(warnings).toEqual([])
    expect(text).toContain('28 mm serous cystadenoma in the pancreatic body.')
    expect(text).toContain('Recommendation: Serous cystadenoma with classic features: no surveillance for malignancy needed. Below 4 cm and asymptomatic, no surgical referral.')
  })
})

describe('pancreatic cysts: check before signing', () => {
  // "The ACR lists six mandatory elements: cyst morphology and location; size; possible communication with the main duct; presence of worrisome features and/or high-risk stigmata; growth on follow-up; and multiplicity."
  it('lists what the report must contain while the form is empty', () => {
    const { warnings } = report(study, { nodule: '' })
    for (const label of [
      'Cyst location',
      'Morphology',
      'Presumed diagnosis',
      'Communication with MPD',
      'MPD maximum caliber',
      'Long axis',
      'Mural nodule or solid component',
      'No prior measurement',
      'Multiplicity',
    ]) expect(warnings).toContain(`${label} not stated`)
  })
  it('asks for enhancement and size once a nodule is marked', () => {
    const { warnings } = report(study, { ...case1, nodule: 'nodule' })
    expect(warnings).toContain('Enhancement not stated')
    expect(warnings).toContain('Nodule or solid component size not stated')
  })

  it.each([
    [{ type: 'bd', comm: 'absent' }, /Presumed BD-IPMN but communication marked absent/],
    [{ type: 'muc', comm: 'present', size: '5.1' }, /by the Kyoto definition a communicating cyst over 5 mm is a BD-IPMN/],
    [{ type: 'sca', comm: 'present' }, /SCAs do not talk to the main duct/],
    [{ type: 'sca', comm: 'absent', calc: 'peripheral' }, /peripheral calcification points to MCN/],
    [{ priorSize: '9' }, /Name the baseline date/],
    [{ recSource: 'kyoto', symptomatic: 'yes' }, /Symptomatic patient: the lesson says to refer/],
    [{ mass: 'present' }, /Focal hypoenhancing mass/],
    [{ biliary: 'dilated' }, /Biliary tree dilated/],
    [{ type: 'other', typeOther: 'solid pseudopapillary neoplasm' }, /generally go to surgery/],
    [{ stricture: 'present' }, /Duct stricture marked: check for an abrupt caliber change/],
    [{ multiplicity: 'multiple', othersWf: 'no' }, /A non-index cyst has worrisome features/],
    [{ multiplicity: 'multiple', otherSize: '12' }, /Another cyst is longer than the index cyst/],
    [{ nodule: 'solid', enhance: 'nonenh', noduleSize: '8' }, /Non-enhancing solid component: the lesson does not classify it/],
    [{ nodule: 'nodule', enhance: 'enh' }, /Enhancing mural nodule: state its size/],
  ])('%o warns', (extra, expected) => {
    expect(warn({ ...case1, ...extra })).toMatch(expected)
  })
  it('a communicating 5 mm cyst marked mucinous does not warn', () => {
    expect(warn({ ...case1, type: 'muc', size: '5' })).not.toMatch(/Kyoto definition/)
  })
})

describe('pancreatic cysts: no placeholder text', () => {
  const cases: Values[] = [
    {},
    case1,
    { ...case1, size: '', priorSize: '8', interval: '0' },
    { ...case1, multiplicity: 'multiple', otherCount: '3', otherSize: '6', otherSite: 'tail', othersWf: 'yes', series: '4', image: '31' },
    { ...case1, type: 'other', mass: 'present', massText: '18 mm tail', otherFindings: 'Gallstones.', mpdSite: 'body' },
    { ...case1, size: '34', mpd: '12', nodule: 'solid', enhance: 'enh', noduleSize: '9', clinical: ['jaundice', 'cytology'], recSource: 'kyoto' },
  ]
  it.each(cases.map((c, i) => [i, c]))('case %i', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object|Infinity/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})
