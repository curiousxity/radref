import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { EpilepsyMriStudyPage } from './EpilepsyMriStudy'

/*
 * Each case pins a rule the lesson states, so a change to the rule shows up as a failing
 * test. The quoted sentences are from the lesson's Learn tab and step panels.
 * The form starts with every structure normal (the study's `initial`), so each case
 * only states what differs.
 */
const study = studyOf(EpilepsyMriStudyPage)

const full: Values = { protocol: 'full', angle: 'ok', contrast: 'none', patient: 'adult' }
const impression = (values: Values) => report(study, values).text.split('IMPRESSION:\n')[1] ?? ''

/** No placeholder text, and no doubled space once each line's indent is set aside. */
function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object|null/)
  for (const line of text.split('\n')) expect(line.trimStart()).not.toMatch(/ {2}/)
  expect(text).not.toMatch(/\.\.|: \.|, \./)
}

describe('epilepsy MRI: hippocampal sclerosis needs atrophy plus signal', () => {
  // "Jackson et al. (Neurology 1990) showed that the combination of atrophy plus T2 signal
  // increase is highly reliable for hippocampal sclerosis. Either sign alone is less specific."
  it('right volume loss with right signal is right HS', () => {
    const values = { ...full, hippSize: 'r', hippSignal: 'r' }
    expect(chips(study, 'hippocampi', values)['Atrophy + signal']).toBe('Right HS: highly reliable')
    expect(impression(values)).toContain('Right hippocampal sclerosis (volume loss, increased FLAIR signal). No second lesion.')
  })
  it('volume loss alone is a single, less specific sign', () => {
    const values = { ...full, hippSize: 'l' }
    expect(chips(study, 'hippocampi', values)['Left, one sign']).toBe('Volume loss alone: less specific')
    expect(chips(study, 'hippocampi', values)['Atrophy + signal']).toBeUndefined()
    expect(impression(values)).toContain('Left hippocampal volume loss without signal change; a single sign, less specific for hippocampal sclerosis.')
    expect(impression(values)).not.toContain('hippocampal sclerosis (')
  })
  // "Bright FLAIR in the hippocampus with normal size and preserved architecture: could be
  // early or mild HS, could be peri-ictal, could be artifact. Describe it, don't overcall it."
  it('bright, normal-size hippocampus with preserved architecture is described, not called HS', () => {
    const values = { ...full, hippSignal: 'r' }
    expect(chips(study, 'hippocampi', values)['Right bright, normal size']).toBe('Describe, do not overcall')
    expect(impression(values)).toContain('could be early or mild hippocampal sclerosis, peri-ictal, or artifact.')
  })
  it('signal with lost architecture but normal size is still a single sign', () => {
    const values = { ...full, hippSignal: 'r', hippArch: 'r' }
    expect(chips(study, 'hippocampi', values)['Right bright, normal size']).toBeUndefined()
    expect(impression(values)).toContain('Increased FLAIR signal in the right hippocampus without volume loss; a single sign, less specific for hippocampal sclerosis.')
  })
  // "Bilateral HS is about 10%: check both sides against each other and against your mental picture of normal."
  it('both small and both bright is bilateral HS', () => {
    const values = { ...full, hippSize: 'both', hippSignal: 'both' }
    expect(chips(study, 'hippocampi', values)['Atrophy + signal']).toBe('Bilateral HS pattern')
    expect(impression(values)).toContain('Bilateral hippocampal sclerosis')
  })
  it('signal on the other side from the HS is reported as its own single sign', () => {
    const values = { ...full, hippSize: 'r', hippSignal: 'both' }
    expect(impression(values)).toContain('Right hippocampal sclerosis')
    expect(impression(values)).toContain('Increased FLAIR signal in the left hippocampus')
  })
  it('the impression names architecture and digitation loss only when marked', () => {
    const values = { ...full, hippSize: 'r', hippSignal: 'r', hippArch: 'r', hippDigit: 'r' }
    expect(impression(values)).toContain('(volume loss, increased FLAIR signal, loss of internal architecture, loss of head digitations)')
  })
})

describe('epilepsy MRI: dual pathology', () => {
  // "Dual pathology: an HS plus a second lesion somewhere else. Roughly 10–15% of HS cases.
  // Never stop looking after you find the hippocampus."
  const hs = { ...full, hippSize: 'l', hippSignal: 'l' }
  it('HS alone says keep looking', () => {
    expect(chips(study, 'temporal', hs)['HS found']).toBe('Keep looking: dual pathology 10–15%')
  })
  it('HS plus a cortical lesion is dual pathology, with no "No second lesion"', () => {
    const values = { ...hs, cortex: 'abnormal', cortexSide: 'l', cortexLobe: 'frontal lobe', cortexFeatures: ['thick', 'blur'] }
    expect(chips(study, 'temporal', values)['Dual pathology']).toBe('HS plus a second lesion')
    expect(impression(values)).toContain('Dual pathology: lesion suspicious for focal cortical dysplasia type II, left frontal lobe.')
    expect(impression(values)).not.toContain('No second lesion')
  })
  it('an enlarged amygdala counts as a second lesion', () => {
    const values = { ...hs, amygdala: 'r' }
    expect(chips(study, 'temporal', values)['Amygdala']).toBe('Low-grade tumor or amygdala enlargement TLE')
    expect(impression(values)).toContain('Dual pathology: enlarged, mildly T2/FLAIR-bright right amygdala')
  })
})

describe('epilepsy MRI: FCD type II', () => {
  // "FCD type II ... thick cortex, blurred gray-white junction, bright subcortical FLAIR, transmantle sign"
  // "FCD type I: ... subtle white matter FLAIR brightness"; "MOGHE ... subcortical FLAIR brightness that can look like FCD I."
  const cortex = (features: string[]): Values => ({ ...full, patient: 'child', cortex: 'abnormal', cortexFeatures: features })
  it('bright subcortical FLAIR alone is not called type II', () => {
    const c = chips(study, 'cortex', cortex(['flair']))
    expect(c['Pattern']).toBeUndefined()
    expect(c['FLAIR alone']).toBe('Can also be FCD type I or MOGHE')
    expect(impression(cortex(['flair']))).toContain('Cortical abnormality (increased subcortical FLAIR signal).')
  })
  it.each([['thick'], ['blur'], ['transmantle'], ['flair', 'blur']])('%s is suspicious for type II', (...features) => {
    expect(chips(study, 'cortex', cortex(features))['Pattern']).toBe('Suspicious for FCD type II')
  })
  // "Colombo et al. ... showed the transmantle sign and cortical thickening are hallmarks of type IIb."
  it('flags the transmantle sign', () => {
    expect(chips(study, 'cortex', cortex(['transmantle']))['Transmantle sign']).toBe('Hallmark of FCD type IIb')
    expect(impression(cortex(['transmantle']))).toContain('focal cortical dysplasia type II, with transmantle sign.')
  })
  // "Loves the frontal lobe and the bottom of a sulcus."
  it('names bottom-of-sulcus dysplasia only with a type II feature', () => {
    expect(chips(study, 'cortex', cortex(['thick', 'bos']))['Site']).toBe('Bottom-of-sulcus dysplasia')
    expect(chips(study, 'cortex', cortex(['bos']))['Site']).toBeUndefined()
  })
  it('thick cortex with polymicrogyria is the polymicrogyria, not type II', () => {
    const c = chips(study, 'cortex', cortex(['thick', 'pmg']))
    expect(c['Pattern']).toBeUndefined()
    expect(c['Gyral pattern']).toBe('Polymicrogyria')
    expect(impression(cortex(['thick', 'pmg']))).not.toContain('dysplasia')
  })
})

describe('epilepsy MRI: SWI lesions are not a negative study', () => {
  // "These are lesions, not a negative study. ... the impression names the finding as a potentially
  // epileptogenic lesion and asks for correlation with semiology and EEG; it never says 'no epileptogenic lesion.'"
  it.each([
    [['hem'], 'Hemosiderin (old hemorrhage) on SWI'],
    [['calc'], 'Calcification on SWI'],
    [['hem', 'calc'], 'Hemosiderin and calcification on SWI'],
  ])('%s is a potentially epileptogenic lesion', (found, what) => {
    const out = impression({ ...full, swi: 'abnormal', swiFindings: found })
    expect(out).toContain(`${what}: a potentially epileptogenic lesion; correlate with semiology and EEG.`)
    expect(out).not.toContain('No epileptogenic lesion')
  })
  // "Multiple cavernomas = familial (CCM genes)."
  it('multiple cavernomas suggest the familial form', () => {
    const values = { ...full, swi: 'abnormal', swiFindings: ['multicav'] }
    expect(chips(study, 'swi', values)['Multiple cavernomas']).toBe('Familial (CCM genes)')
    expect(impression(values)).toContain('Multiple cavernomas, a pattern that suggests the familial form (CCM genes).')
  })
  it('single and multiple cavernomas together is a contradiction', () => {
    expect(report(study, { ...full, swi: 'abnormal', swiFindings: ['cav', 'multicav'] }).warnings).toContain('Both single and multiple cavernomas are marked.')
  })
})

describe('epilepsy MRI: peri-ictal changes', () => {
  // "If the MRI was done shortly after a seizure or status, say so, and recommend repeat imaging
  // before calling a mass or HS."
  it('recent seizure with restricted diffusion is likely peri-ictal, with a repeat', () => {
    const values = { ...full, recent: 'yes', dwi: 'restricted', dwiCause: 'periictal', recs: ['repeat'] }
    const { text } = report(study, values)
    expect(chips(study, 'pitfalls', values)['Recent seizure']).toBe('Likely peri-ictal: repeat before calling mass or HS')
    expect(impression(values)).toContain('Cortical FLAIR/DWI signal likely peri-ictal; recommend repeat in 6–8 weeks.')
    // The repeat is already in the impression, so the recommendation is not doubled.
    expect(text).not.toContain('Repeat imaging after seizure control.')
  })
  it('restriction attributed to tumor is not called peri-ictal', () => {
    const values = { ...full, recent: 'yes', dwi: 'restricted', dwiCause: 'tumor' }
    expect(impression(values)).not.toContain('peri-ictal')
    expect(report(study, values).warnings).toContain('Diffusion restriction attributed to tumor, but no tumor is recorded in step 4.')
    expect(report(study, { ...values, tumor: 'present', tumorLoc: 'right temporal lobe' }).warnings).not.toContain('Diffusion restriction attributed to tumor, but no tumor is recorded in step 4.')
  })
  it('without a recent seizure, cortical swelling is not called peri-ictal', () => {
    expect(impression({ ...full, periictal: ['cortical'] })).not.toContain('peri-ictal')
  })
  it('calling HS or a mass shortly after a seizure is flagged', () => {
    const warning = 'Scan shortly after a seizure: the lesson says to recommend repeat imaging before calling a mass or HS.'
    expect(report(study, { ...full, recent: 'yes', hippSize: 'r', hippSignal: 'r' }).warnings).toContain(warning)
    expect(report(study, { ...full, recent: 'yes', tumor: 'present' }).warnings).toContain(warning)
    expect(report(study, { ...full, recent: 'no', hippSize: 'r', hippSignal: 'r' }).warnings).not.toContain(warning)
  })
})

describe('epilepsy MRI: pitfalls and contradictions', () => {
  // "If the hippocampi look like tilted ovals ... the angulation is off and you can be fooled into calling asymmetry."
  it('off angulation flags volume loss but not symmetric hippocampi', () => {
    const warning = 'Coronal T2 angulation is off: check the angulation before calling hippocampal volume loss.'
    expect(report(study, { ...full, angle: 'off', hippSize: 'r' }).warnings).toContain(warning)
    expect(chips(study, 'hippocampi', { ...full, angle: 'off', hippSize: 'r' })['Angulation off']).toBe('Check before calling volume loss')
    expect(report(study, { ...full, angle: 'off' }).warnings).not.toContain(warning)
  })
  // "Incomplete hippocampal inversion ... A normal variant; do not call it sclerosis. Signal and internal architecture are normal."
  it('incomplete inversion with abnormal signal on the same side is flagged', () => {
    const warning = 'Incomplete hippocampal inversion (left) has normal signal and architecture, but abnormal signal or architecture is marked on that side.'
    expect(chips(study, 'pitfalls', { ...full, malrotation: 'l' })['Malrotation']).toBe('Normal variant, not sclerosis')
    expect(report(study, { ...full, malrotation: 'l', hippSignal: 'l' }).warnings).toContain(warning)
    expect(report(study, { ...full, malrotation: 'l', hippSignal: 'r' }).warnings).not.toContain(warning)
  })
  // "enlarged temporal horn on the same side; atrophy of the ipsilateral fornix and mammillary body"
  it('secondary signs on the other side from the smaller hippocampus are flagged', () => {
    const base = { ...full, hippSize: 'r', hippSignal: 'r', secondary: 'present', secondarySigns: ['horn'] }
    expect(report(study, { ...base, secondarySide: 'l' }).warnings).toContain(
      'Secondary signs are ipsilateral to HS, but they are marked left while the right hippocampus is smaller.',
    )
    expect(report(study, { ...base, secondarySide: 'r' }).warnings).toEqual([])
    expect(report(study, { ...base, hippSize: 'both', secondarySide: 'l' }).warnings).toEqual([])
  })
})

describe('epilepsy MRI: clinical context', () => {
  // "In an adult, think hippocampus first. In a child, think cortical dysplasia first."
  it('points adults to the hippocampus and children to cortical dysplasia', () => {
    expect(chips(study, 'clinical', { patient: 'adult' })['Think first']).toBe('Hippocampus')
    expect(chips(study, 'clinical', { patient: 'child' })['Think first']).toBe('Cortical dysplasia')
  })
  // "If EEG lateralization is provided, use it. It is legitimate to look harder on the side EEG points to."
  it('uses a lateralized EEG only', () => {
    expect(chips(study, 'clinical', { eeg: 'l' })['EEG']).toBe('Look harder on the left')
    expect(chips(study, 'clinical', { eeg: 'none' })['EEG']).toBeUndefined()
  })
  // "Hypothalamic hamartoma ... Gelastic seizures." "Rasmussen encephalitis: progressive unilateral hemispheric atrophy"
  it('matches gelastic seizures to a hamartoma and progressive deficits to Rasmussen', () => {
    expect(chips(study, 'deep', { semiology: 'gelastic', hypothalamus: 'hamartoma' })['Gelastic seizures']).toBe('Fits hypothalamic hamartoma')
    expect(chips(study, 'injury', { semiology: 'rasmussen', injury: 'present', injuryTypes: ['rasmussen'] })['Progressive unilateral deficits']).toBe('Fits Rasmussen encephalitis')
  })
})

describe('epilepsy MRI: whole cases', () => {
  // Template: "No epileptogenic lesion identified on a dedicated epilepsy protocol."
  it('negative dedicated protocol', () => {
    const { text, warnings } = report(study, full)
    expect(impression(full)).toBe('No epileptogenic lesion identified on a dedicated epilepsy protocol.')
    expect(text).toContain('The study meets the epilepsy protocol')
    expect(warnings).toEqual([])
    expectClean(text)
  })
  // Template: "No lesion identified; however, this study does not meet epilepsy-protocol standards;
  // recommend dedicated 3T epilepsy MRI."
  it('negative routine protocol recommends a dedicated study once', () => {
    const values = { ...full, protocol: 'routine', sequences: 'axial T2, FLAIR, DWI', recs: ['protocol'] }
    const { text } = report(study, values)
    expect(chips(study, 'technique', values)['Protocol']).toBe('Say it is not an epilepsy protocol')
    expect(impression(values)).toContain('No lesion identified; however, this study does not meet epilepsy-protocol standards; recommend dedicated 3T epilepsy MRI.')
    expect(text).not.toContain('RECOMMENDATIONS:')
    expectClean(text)
  })
  it('left HS with secondary signs in an adult with temporal semiology', () => {
    const values: Values = {
      ...full,
      seizureType: 'focal impaired awareness with epigastric aura',
      semiology: 'temporal',
      eeg: 'l',
      hippSize: 'l',
      hippSignal: 'l',
      hippArch: 'l',
      secondary: 'present',
      secondarySide: 'l',
      secondarySigns: ['horn', 'fornix'],
    }
    const { text, warnings } = report(study, values)
    expect(text).toContain('Secondary signs (left): enlarged temporal horn and fornix and mammillary body atrophy.')
    expect(impression(values)).toMatch(/^Left hippocampal sclerosis \(volume loss, increased FLAIR signal, loss of internal architecture\)\. No second lesion\./)
    expect(warnings).toEqual([])
    expectClean(text)
  })
  it('child with bottom-of-sulcus FCD type II near eloquent cortex', () => {
    const values: Values = {
      ...full,
      patient: 'child',
      semiology: 'frontal',
      cortex: 'abnormal',
      cortexSide: 'l',
      cortexLobe: 'frontal lobe',
      cortexSite: 'bottom of the superior frontal sulcus',
      cortexFeatures: ['thick', 'blur', 'transmantle', 'bos'],
      cortexEloquent: '2 cm anterior to the precentral gyrus',
      recs: ['postproc', 'pet'],
    }
    const { text } = report(study, values)
    expect(impression(values)).toContain(
      'Lesion suspicious for focal cortical dysplasia type II, left frontal lobe, bottom of the superior frontal sulcus, with transmantle sign, 2 cm anterior to the precentral gyrus.',
    )
    expect(text).toContain('RECOMMENDATIONS: Computer-aided post-processing. PET/SPECT correlation.')
    expectClean(text)
  })
})

describe('epilepsy MRI: required items', () => {
  it('the empty form asks for the protocol', () => {
    expect(report(study).warnings).toEqual(['Epilepsy protocol not stated'])
  })
  it('lists each cleared must-state item', () => {
    const cleared = { hippSize: '', hippSignal: '', hippArch: '', cortex: '', heterotopia: '', hypothalamus: '', swi: '', dwi: '' }
    const { warnings } = report(study, { ...full, ...cleared })
    for (const label of ['Size', 'T2-FLAIR signal', 'Internal architecture', 'Neocortex', 'Heterotopia', 'Hypothalamus', 'SWI / GRE', 'Diffusion']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })
  it('never prints placeholder text, empty or partial', () => {
    expectClean(report(study).text)
    expectClean(report(study, { ...full, cortex: 'abnormal', swi: 'abnormal', injury: 'present', tumor: 'present', secondary: 'present', dwi: 'restricted' }).text)
    expectClean(report(study, { protocol: 'routine', hippSize: '', hippSignal: '', hippArch: '', hippDigit: '', cortex: '', heterotopia: '', hypothalamus: '', swi: '', dwi: '' }).text)
  })
})
