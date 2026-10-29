import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { BrachialPlexusStudyPage } from './BrachialPlexusStudy'

const study = studyOf(BrachialPlexusStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-29-brachial-plexus-sources.md (B claims), each read in its
 * paper's abstract, its open full text or the ACR's published ratings before it went in. If a case
 * has to change, say in that commit why the old expectation was wrong.
 */

describe('brachial plexus lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'clinical', 'findings', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.references).toHaveLength(37)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi)).size).toBe(study.references.length)
  })
})

/** A complete MRI after a traction injury, nothing found. */
const trauma: Values = { history: 'trauma', protocol: 'complete', side: 'Left', avulsion: 'none', post: 'normal' }
/** A complete MRI after breast cancer treatment, plexus normal. */
const cancer: Values = { history: 'cancer', protocol: 'complete', side: 'Right', primary: 'breast', 'cancer-question': 'after', tumour: 'none' }
/** A complete MRI for a mass arising from a nerve. */
const mass: Values = { history: 'mass', protocol: 'complete', side: 'Right', origin: 'nerve' }
/** A complete MRI for suspected neuralgic amyotrophy, plexus normal. */
const na: Values = { history: 'plexopathy', protocol: 'complete', side: 'Right', suspected: 'na', plexus: 'normal' }
/** A complete MRI for suspected thoracic outlet syndrome, arm raised. */
const tos: Values = { history: 'plexopathy', protocol: 'complete', side: 'Right', suspected: 'tos', 'arm-raised': 'yes' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('brachial plexus report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the study chosen', () => {
    expect(report(study, trauma).warnings).toEqual([])
    expect(report(study, cancer).warnings).toEqual([])
    expect(report(study, mass).warnings).toEqual([])
    expect(report(study, na).warnings).toEqual([])
    expect(report(study).warnings).toEqual(['Study not stated', 'Protocol not stated'])
    // B4-1: after trauma the report always says whether a root is avulsed.
    expect(report(study, { history: 'trauma', protocol: 'complete' }).warnings).toEqual(['Side not stated', 'Root avulsion (preganglionic) not stated', 'Beyond the foramen (postganglionic) not stated'])
    expect(report(study, { history: 'cancer', protocol: 'complete', side: 'Left' }).warnings).toEqual(['Question not stated', 'Plexus not stated'])
    expect(report(study, { history: 'mass', protocol: 'complete', side: 'Left' }).warnings).toEqual(['The mass not stated'])
    expect(report(study, { history: 'plexopathy', protocol: 'complete', side: 'Left' }).warnings).toEqual(['Plexus and branches not stated'])
  })
})

describe('brachial plexus report: whole cases', () => {
  test('a traction injury with nothing found', () => {
    expect(report(study, trauma).text).toContain('Technique: brachial plexus MRI in three planes without contrast, with the cervical spine and heavily T2-weighted images of the roots')
    expect(impressionOf(trauma)).toBe('No sign of root avulsion or postganglionic injury.')
  })

  test('avulsion of the lower roots with a complete rupture of the upper trunk', () => {
    const values = {
      ...trauma, pattern: 'total', avulsion: 'present', 'avulsed-roots': ['C8', 'T1'], 'avulsion-signs': ['absent', 'paraspinal'],
      post: 'complete', 'post-level': ['trunks'], retraction: 'yes', gap: '2.5', associated: ['vessel'], denervation: 'oedema',
    }
    expect(report(study, values).text).toContain('Roots: avulsion of C8, T1')
    expect(impressionOf(values)).toBe([
      'Left root avulsion (preganglionic injury) of C8 and T1.',
      'Left postganglionic complete rupture at the trunks, with retracted stumps, a gap of 2.5 cm.',
      'Vascular injury.',
      'Acute denervation of the muscles supplied.',
    ].join('\n'))
  })

  test('radiation fibrosis after breast cancer', () => {
    const values = { ...cancer, tumour: 'diffuse', parts: ['upper', 'cords'], 'diffuse-signal': 'low', 'rt-dose': '50', 'rt-months': '30' }
    expect(report(study, values).text).toContain('Clinical: right, breast cancer, new plexopathy after treatment, 50 Gy, symptoms 30 months after radiotherapy')
    expect(impressionOf(values)).toBe('Right brachial plexus thickened (upper trunk and cords), low on T1 and T2, with no focal mass.')
  })

  test('no mass after cancer says so', () => {
    expect(impressionOf(cancer)).toBe('No mass in or around the brachial plexus.')
  })

  test('a Pancoast tumour reaching C8', () => {
    const values = { ...cancer, primary: 'lung', 'cancer-question': 'staging', tumour: 'mass', 'mass-effect': 'infiltrates', parts: ['lower'], apex: ['t1-root', 'c8'] }
    expect(impressionOf(values)).toBe('Right mass encasing or infiltrating the brachial plexus (lower trunk).\nSuperior sulcus tumour: T4 by its extent.')
  })

  test('a nerve sheath tumour of a trunk', () => {
    const values = { ...mass, element: 'trunk', 'mass-size': '3.2', 'nst-signs': ['fascicular', 'rim'] }
    expect(impressionOf(values)).toBe('Right 3.2 cm mass arising from a trunk, with fascicular appearance on T2 and thin bright rim on T2.')
  })

  test('neuralgic amyotrophy with a suprascapular constriction', () => {
    const values = { ...na, plexus: 'abnormal', 'plexus-signs': ['constriction'], nerves: ['suprascapular'], denervation: 'oedema' }
    expect(impressionOf(values)).toBe([
      'Right hourglass constriction of the suprascapular nerve.',
      'Denervation of the muscles supplied by the suprascapular nerve.',
    ].join('\n'))
  })

  test('a cervical rib compressing the plexus', () => {
    const values = { ...tos, plexus: 'abnormal', 'plexus-signs': ['compressed'], outlet: ['cervical-rib'] }
    expect(report(study, values).text).toContain('with images with the arm raised')
    expect(impressionOf(values)).toBe('Right cervical rib at the thoracic outlet, compressing the brachial plexus.')
  })

  test('a normal plexopathy study', () => {
    expect(impressionOf(na)).toBe('Brachial plexus normal.')
  })

  test('hidden answers write nothing', () => {
    // Trauma, cancer and mass fields under a plexopathy study.
    const text = report(study, { ...na, avulsion: 'present', 'avulsed-roots': ['C5'], tumour: 'mass', origin: 'nerve', 'rt-dose': '66' }).text
    expect(text).not.toMatch(/avulsion|mass|Gy/i)
  })
})

describe('brachial plexus rules', () => {
  // B1-2, ACR 2021 ratings tables: trauma, MRI without contrast 9, with and without 7, CT
  // myelography 5; known malignancy, MRI with and without 9, FDG-PET/CT 6; nontraumatic, MRI with
  // and without 9.
  test('the ACR ratings for each scenario', () => {
    expect(chips(study, 'technique', { history: 'trauma' }).ACR).toBe('MRI without contrast 9; with and without 7; CT myelography 5')
    expect(chips(study, 'technique', { history: 'cancer' }).ACR).toBe('MRI with and without contrast 9; FDG-PET/CT 6')
    expect(chips(study, 'technique', { history: 'mass' }).ACR).toBe('MRI with and without contrast 9')
  })

  // B2-3, Szaro part 2: "total rupture of roots C5-Th1 (about 75%), followed by upper plexus, C5-C6
  // injury (about 20%), and less commonly, lower plexus, C8-Th1 (about 3%)". B2-4, Bertelli: "The
  // presence of Bernard-Horner syndrome and hand pain accurately indicated avulsion of the lower roots
  // in 93.7% of the patients." B2-1, Szaro part 2: EMG "do not usually give reliable results until
  // three weeks after injury".
  test('the clinical pattern after trauma', () => {
    expect(chips(study, 'clinical', { ...trauma, pattern: 'total' }).Pattern).toBe('Whole plexus: the commonest, about 75%')
    expect(chips(study, 'clinical', { ...trauma, pattern: 'lower' }).Pattern).toBe('Lower plexus: about 3%')
    expect(chips(study, 'clinical', { ...trauma, pattern: 'total', 'trauma-signs': ['horner', 'hand-pain'] })['Lower roots']).toBe('Horner syndrome with hand pain: lower root avulsion in 93.7%')
    expect(chips(study, 'clinical', { ...trauma, pattern: 'upper', 'trauma-signs': ['horner', 'hand-pain'] })['Lower roots']).toBeUndefined()
    expect(chips(study, 'clinical', { ...trauma, weeks: '2' }).EMG).toBe('Not usually reliable until three weeks after the injury')
    expect(chips(study, 'clinical', { ...trauma, weeks: '3' }).EMG).toBeUndefined()
  })

  // B2-7, Kori: "For symptoms within 1 year of RT, doses exceeding 6000 R were associated with
  // radiation damage, whereas lower doses were associated with infiltration"; "Severe pain occurred
  // in 80% of tumor patients but in only 19% ... Horner syndrome was more common in tumor, and
  // lymphedema in radiation injury." B2-6, Szaro part 1: "the cumulative dose of radiation exceeds
  // 60 Gy".
  test('dose, timing and signs after radiotherapy', () => {
    expect(chips(study, 'clinical', { ...cancer, 'rt-dose': '66', 'rt-months': '12' }).Dose).toBe('Over 60 Gy, symptoms within a year: went with radiation damage')
    expect(chips(study, 'clinical', { ...cancer, 'rt-dose': '60', 'rt-months': '6' }).Dose).toBe('60 Gy or less, symptoms within a year: went with tumour')
    expect(chips(study, 'clinical', { ...cancer, 'rt-dose': '66', 'rt-months': '13' }).Dose).toBeUndefined()
    expect(chips(study, 'clinical', { ...cancer, 'cancer-signs': ['horner'] }).Clinical).toBe('Severe pain and Horner syndrome were commoner with tumour')
    expect(chips(study, 'clinical', { ...cancer, 'cancer-signs': ['lymphoedema'] }).Lymphoedema).toBe('Commoner with radiation injury')
  })

  // B1-6, Demondion: "Except for venous thrombosis, vasculonervous compressions were demonstrated only
  // with arm elevation."
  test('thoracic outlet imaged with the arm down only', () => {
    expect(chips(study, 'clinical', { ...tos, 'arm-raised': 'no' })['Arm down only']).toBe('Compression was shown only with the arm raised')
    expect(chips(study, 'clinical', tos)['Arm down only']).toBeUndefined()
  })

  // B3-5, Wade 2019: "the mean sensitivity of MRI for root avulsion was 93% ... with a mean
  // specificity of 72%". B3-1, Szaro part 2: "the root absence sign is more specific". B3-2, Wade
  // 2018: "The diagnostic accuracy of a pseudomeningocoele as a surrogate marker of root avulsion(s)
  // of C5-T1 was 68%". B3-4, Hayashi: "88% ... for abnormal enhancement ... findings in the
  // multifidus muscle were the most accurate".
  test('root avulsion and its signs', () => {
    expect(chips(study, 'findings', trauma)['MRI for avulsion']).toBe('93% sensitive: a normal MRI does not exclude it')
    const present = { ...trauma, avulsion: 'present', 'avulsed-roots': ['C7'] }
    expect(chips(study, 'findings', present)['MRI for avulsion']).toBe('93% sensitive, 72% specific; surgical exploration remains the reference')
    expect(chips(study, 'findings', { ...present, 'avulsion-signs': ['pseudomeningocele'] }).Pseudomeningocele).toBe('Not reliable alone (68% accurate); an absent root is more specific')
    expect(chips(study, 'findings', { ...present, 'avulsion-signs': ['pseudomeningocele', 'absent'] }).Pseudomeningocele).toBeUndefined()
    expect(chips(study, 'findings', { ...present, 'avulsion-signs': ['paraspinal'] })['Paraspinal muscles']).toBe('Enhancement 88% sensitive; the multifidus is the most accurate')
    expect(report(study, present).warnings).toContain('Root avulsion is entered with none of its signs: check for an absent root, a pseudomeningocele, the root sleeves, the cord and the paraspinal muscles.')
    expect(report(study, { ...present, 'avulsion-signs': ['absent'] }).warnings).toEqual([])
  })

  // B3-8, Szaro part 2: "An increased MR signal of the nerve without an increase in diameter or change
  // in muscle signal indicates neuropraxia ... Higher signals of an intact nerve on MRI with abnormal
  // muscle signal correspond to a grade 2–4 injury"; neuroma in continuity grade 4; total
  // discontinuity grade 5. B3-7: "The radiological report should emphasize the total rupture of one
  // component or retraction of the entire BP." B3-10: CT angiography for an axillary artery
  // dissection.
  test('beyond the foramen: the grade of injury', () => {
    expect(chips(study, 'findings', { ...trauma, post: 'oedema', denervation: 'normal' }).Grade).toBe('Bright nerve, normal muscles: neuropraxia (grade 1)')
    expect(chips(study, 'findings', { ...trauma, post: 'oedema', denervation: 'oedema' }).Grade).toBe('Bright nerve, abnormal muscles: grades 2 to 4')
    expect(chips(study, 'findings', { ...trauma, post: 'neuroma' }).Grade).toBe('Neuroma in continuity (grade 4)')
    expect(chips(study, 'findings', { ...trauma, post: 'complete' })['Complete rupture']).toBe('Stress it, and any retraction, in the report (grade 5)')
    expect(chips(study, 'findings', { ...trauma, associated: ['vessel'] }).Vessels).toBe('CT angiography shows where and how far an axillary artery is dissected')
  })

  // B3-11, Thyagarajan: "The presence of a mass adjacent to the brachial plexus on MRI was highly
  // predictive of tumor infiltration ... Increased T2 signal ... was commonly seen in both groups and
  // was not useful". B3-13, Wittenberg: radiation fibrosis, "thickening and diffuse enhancement of the
  // brachial plexus without a focal mass and ... low signal intensity on both T1- and T2-weighted
  // images". B1-3, ACR 2017: PET/CT "beneficial to differentiate radiation plexitis from tumor
  // recurrence".
  test('tumour against radiation plexopathy', () => {
    expect(chips(study, 'findings', { ...cancer, tumour: 'mass' }).Mass).toBe('Highly predictive of tumour')
    expect(chips(study, 'findings', { ...cancer, tumour: 'diffuse', 'diffuse-signal': 'low' })['No focal mass']).toBe('Thickening with low T1 and T2 signal: radiation fibrosis')
    expect(chips(study, 'findings', { ...cancer, tumour: 'diffuse', 'diffuse-signal': 'high' })['High T2']).toBe('Seen with both tumour and radiation; FDG-PET/CT may help')
  })

  // B2-7, B2-8: Kori, "The lower trunk (C7-8, T1) was involved in 72% of the tumors, and 32% also had
  // epidural tumors. Seventy-eight percent of the radiation injuries affected the upper plexus";
  // Harper, "The distribution of weakness ... of no help".
  test('the site after treatment, where the series disagree', () => {
    expect(chips(study, 'findings', { ...cancer, tumour: 'mass', parts: ['lower'] })['Lower trunk']).toBe('Involved in 72% of tumours (Kori); the distribution of weakness did not help (Harper)')
    expect(chips(study, 'findings', { ...cancer, tumour: 'mass', parts: ['lower'] }).Canal).toBe('Check the foramina: 32% also had epidural tumour')
    expect(chips(study, 'findings', { ...cancer, tumour: 'diffuse', parts: ['upper'] })['Upper plexus']).toBe('Involved in 78% of radiation injuries (Kori); the distribution of weakness did not help (Harper)')
  })

  // B3-16, Kifjak: "Pancoast tumours are classified as T4 when they clearly involve the brachial plexus
  // beyond the T1 nerve root (C8 or higher roots) ... subclavian vessels, vertebral bodies, lamina, or
  // the spinal canal"; T3 "Invades ... thoracic nerve roots (eg, T1, T2), or stellate ganglion".
  test('a lung apex tumour: T3 or T4', () => {
    const apex = { ...cancer, primary: 'lung', 'cancer-question': 'staging', tumour: 'mass' }
    expect(chips(study, 'findings', { ...apex, apex: ['t1-root'] })['Superior sulcus']).toBe('T3 (thoracic root or stellate ganglion only)')
    for (const reach of ['c8', 'spine', 'subclavian']) expect(chips(study, 'findings', { ...apex, apex: ['t1-root', reach] })['Superior sulcus'], reach).toBe('T4')
    expect(impressionOf({ ...apex, apex: ['t1-root'] })).toContain('Superior sulcus tumour: at least T3.')
    // The apex field is for lung cancer only.
    expect(chips(study, 'findings', { ...apex, primary: 'breast', apex: ['c8'] })['Superior sulcus']).toBeUndefined()
  })

  // B3-17, Jee: target sign with central enhancement "63% vs 3%"; fascicular appearance with a thin
  // hyperintense rim "8% vs 48%". B3-18, Bhargava: "The target sign was seen in all 12 neurofibromas
  // and 1 of the 11 malignant peripheral nerve sheath tumors." B3-19, Li: split fat sign "present
  // more frequently in the benign PNSTs".
  test('a nerve sheath tumour: neurofibroma, schwannoma, benign', () => {
    expect(chips(study, 'findings', { ...mass, 'nst-signs': ['target', 'central'] }).Neurofibroma).toBe('Target sign with central enhancement: 63%, against 3% of schwannomas')
    expect(chips(study, 'findings', { ...mass, 'nst-signs': ['target'] })['Target sign']).toBe('In 12 of 12 neurofibromas, 1 of 11 malignant tumours')
    expect(chips(study, 'findings', { ...mass, 'nst-signs': ['target'] }).Neurofibroma).toBeUndefined()
    expect(chips(study, 'findings', { ...mass, 'nst-signs': ['fascicular', 'rim'] }).Schwannoma).toBe('Fascicular with a thin bright rim: 48%, against 8% of neurofibromas')
    expect(chips(study, 'findings', { ...mass, 'nst-signs': ['split-fat'] })['Split fat']).toBe('Commoner in benign tumours')
  })

  // B3-20, Wasa: "The presence of two or more of the four features suggestive of malignancy indicated
  // malignant peripheral nerve sheath tumor with a sensitivity of 61% and a specificity of 90%."
  test('Wasa\'s features of malignancy, at two', () => {
    expect(chips(study, 'findings', { ...mass, malignant: ['peripheral'] })['Malignant?']).toBeUndefined()
    expect(chips(study, 'findings', { ...mass, malignant: ['peripheral', 'cyst'] })['Malignant?']).toBe('2 of Wasa\'s 4 features: suspicious (2 or more 61% sensitive, 90% specific); biopsy')
    expect(impressionOf({ ...mass, malignant: ['peripheral', 'cyst'] })).toContain('Features of malignancy: peripheral enhancement and cystic area inside it.')
  })

  // B3-21, Szaro part 1: "Direct MRI diagnosis is impossible in most benign soft tissue lesions except
  // lipoma; thus, a biopsy may be considered."
  test('a mass beside the plexus: fat or not', () => {
    const beside = { ...mass, origin: 'separate' }
    expect(chips(study, 'findings', { ...beside, fat: 'yes' }).Lipoma).toBe('The benign lesion MRI can name')
    expect(chips(study, 'findings', { ...beside, fat: 'no' })['Not fat']).toBe('Most benign soft-tissue lesions other than lipoma need a biopsy to name')
  })

  // B3-22, Gaskin: "The suprascapular nerve was almost invariably involved (in 97% of shoulders) ...
  // Axillary nerve involvement also was commonly observed (in 50% of shoulders)". B3-23, Sneag 2018:
  // "the plexus appeared normal in 24 of 27 patients". B3-24, Sneag 2024: "HGCs were observed in
  // 90.2% of all NA patients."
  test('neuralgic amyotrophy', () => {
    expect(chips(study, 'findings', { ...na, nerves: ['suprascapular'] }).Suprascapular).toBe('Involved in 97% of shoulders; axillary in 50%')
    expect(chips(study, 'findings', na)['Normal plexus']).toBe('Normal in 24 of 27: follow the branches for constrictions')
    expect(chips(study, 'findings', { ...na, plexus: 'abnormal', 'plexus-signs': ['constriction'] }).Constriction).toBe('In 90.2% of EMG-confirmed neuralgic amyotrophy')
  })

  // B3-26, Hardy: "the false-negative rate was 14/48 (29%) ... For diagnosing a cervical rib, MRI had
  // 100% sensitivity and 100% specificity." B3-28, Szaro part 1: "the presence of an accessory rib does
  // not suggest TOS directly". B3-27, Baumer: fibrous bands, "Increased T2W signal was detected within
  // compressed plexus portion (C8 spinal nerve, inferior trunk, or medial cord)".
  test('the thoracic outlet', () => {
    expect(chips(study, 'findings', { ...tos, plexus: 'normal' })['No cause seen']).toBe('29% false negatives: MRI does not rule it out')
    expect(chips(study, 'findings', { ...tos, plexus: 'normal', outlet: ['band'] })['No cause seen']).toBeUndefined()
    expect(chips(study, 'findings', { ...tos, outlet: ['cervical-rib'] })['Cervical rib']).toBe('MRI 100% sensitive and specific; but a rib alone does not mean the syndrome')
    expect(chips(study, 'findings', { ...tos, outlet: ['band'] })['Fibrous band']).toBe('With T2 signal in C8, the lower trunk or medial cord: confirmed at surgery')
  })

  // B3-9, Szaro part 2: "Muscular edema may be revealed 24 h after nerve injury ... The acute
  // denervation of the muscles is visible as a higher signal on MRI, followed by muscle atrophy and
  // fatty degeneration."
  test('denervated muscle', () => {
    expect(chips(study, 'findings', { ...trauma, denervation: 'oedema' }).Muscles).toBe('Acute denervation (from 24 hours after a nerve injury)')
    expect(chips(study, 'findings', { ...trauma, denervation: 'fatty' }).Muscles).toBe('Later denervation: atrophy and fat')
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...trauma, avulsion: 'present', 'avulsion-signs': ['absent'], 'impression-negatives': ['no-avulsion'] }).warnings)
      .toContain('Impression says no root avulsion, but an avulsion is entered.')
    expect(report(study, { ...cancer, tumour: 'mass', 'impression-negatives': ['no-mass'] }).warnings)
      .toContain('Impression says no mass, but a mass is entered.')
    expect(report(study, { ...mass, 'impression-negatives': ['no-mass'] }).warnings)
      .toContain('Impression says no mass, but a mass is entered.')
  })
})
