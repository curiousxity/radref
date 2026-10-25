import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { SkullBaseStudyPage } from './SkullBaseStudy'

const study = studyOf(SkullBaseStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-25-skull-base-sources.md (S claims), each read in its paper's
 * abstract or open full text before it went in.
 */

describe('skull base lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'site', 'findings', 'impression'])
  })

  // Every claim is read, but the site author has not reviewed the study yet, so the note still
  // says "Unchecked draft". Russo 1997, Nemzek 1998 and Eldevik 2000 have no DOI on PubMed or
  // Crossref, so they are cited in plain text.
  test('is marked as an unchecked draft, with a DOI on every reference but Russo, Nemzek and Eldevik', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    expect(study.references).toHaveLength(21)
    for (const ref of study.references) {
      if (/^(Russo|Nemzek|Eldevik) /.test(ref.citation)) expect(ref.doi, ref.citation).toBeUndefined()
      else expect(ref.doi, ref.citation).toMatch(/^10\./)
    }
  })
})

/** A complete MRI for a palsy, no cause seen. */
const palsy: Values = { history: 'palsy', protocol: 'complete', nerve: 'VI', 'palsy-side': 'Left', cause: 'none' }
/** A complete MRI for perineural spread, none seen. */
const pns: Values = { history: 'pns', protocol: 'complete', pns: 'none' }
/** A complete CT for a jugular foramen mass. */
const jugular: Values = { history: 'mass', protocol: 'complete', site: 'jugular', 'mass-side': 'Right' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('skull base report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the study chosen', () => {
    expect(report(study, palsy).warnings).toEqual([])
    expect(report(study, pns).warnings).toEqual([])
    expect(report(study, { ...jugular, bone: 'smooth' }).warnings).toEqual([])
    expect(report(study).warnings).toEqual(['Study not stated', 'Protocol not stated'])
    expect(report(study, { history: 'palsy', protocol: 'complete' }).warnings).toEqual(['Nerve not stated', 'Cause along the nerve not stated'])
    expect(report(study, { history: 'pns', protocol: 'complete' }).warnings).toEqual(['Perineural spread not stated'])
    expect(report(study, { history: 'mass', protocol: 'complete' }).warnings).toEqual(['Site not stated', 'Bone not stated'])
  })
})

describe('skull base report: whole cases', () => {
  test('a sixth nerve palsy with no cause', () => {
    expect(report(study, palsy).text).toContain('Technique: thin steady-state free precession images along the nerve and fat-suppressed contrast-enhanced T1')
    expect(impressionOf(palsy)).toBe('Left VI palsy: no cause seen along the nerve.')
  })

  test('a third nerve palsy from an aneurysm', () => {
    const values = { ...palsy, nerve: 'III', 'palsy-side': 'Right', cause: 'found', segment: 'cistern', 'cause-text': '6 mm posterior communicating artery aneurysm' }
    expect(impressionOf(values)).toBe('Right III palsy: 6 mm posterior communicating artery aneurysm in the cistern.')
  })

  test('perineural spread along V3 into Meckel cave, with recent denervation', () => {
    const values = {
      history: 'pns', protocol: 'complete', primary: 'parotid tumour', histology: 'acc',
      pns: 'present', 'pns-side': 'Left', 'pns-nerves': ['V3'], 'pns-signs': ['nerve', 'foramen', 'meckel'], 'pns-extent': 'ganglion', denervation: 'recent',
    }
    expect(report(study, values).text).toContain('Primary: parotid tumour, adenoid cystic carcinoma')
    expect(impressionOf(values)).toBe([
      'Left perineural spread along V3, reaching the Gasserian or geniculate ganglion, or the cavernous sinus.',
      'Recent denervation of the muscles the nerve supplies.',
    ].join('\n'))
  })

  test('no perineural spread says so', () => {
    expect(impressionOf(pns)).toBe('No sign of perineural spread.')
  })

  test('a clival mass', () => {
    const values = { history: 'mass', protocol: 'complete', site: 'clivus', 'mass-size': '3.5', bone: 'lytic', matrix: 'no', extension: ['posterior-fossa'] }
    expect(impressionOf(values)).toBe('Clival mass, 3.5 cm, with expansile, lytic destruction; extending into the posterior fossa.')
  })

  test('a jugular foramen pseudolesion', () => {
    expect(impressionOf({ ...jugular, bone: 'intact' })).toBe('Jugular foramen with smooth, intact margins and no mass.')
  })

  test('hidden answers write nothing', () => {
    // Palsy and mass fields under a perineural spread study.
    const text = report(study, { ...pns, nerve: 'III', cause: 'found', site: 'clivus', bone: 'lytic', denervation: 'recent' }).text
    expect(text).not.toMatch(/palsy|clival|lytic|denervation/i)
  })
})

describe('skull base rules', () => {
  // S2-2, Chaudhary: aneurysms "at the junction of the internal carotid and posterior communicating
  // arteries or, less commonly, at the apex of the basilar artery ... typically measure at least 4 mm
  // ... CT the first choice". S2-3, Tamhankar: "A cause other than presumed microvascular ischemia
  // was identified in 18 patients (16.5%)".
  test('the ocular motor palsies', () => {
    expect(chips(study, 'site', { ...palsy, nerve: 'III' })['Third nerve']).toBe('Look for a posterior communicating or basilar tip aneurysm, usually 4 mm or more; CTA is the first choice')
    for (const nerve of ['III', 'IV', 'VI']) expect(chips(study, 'site', { ...palsy, nerve })['Age 50 or older']).toBe('Another cause than small-vessel ischaemia in 16.5% of isolated palsies')
    expect(chips(study, 'site', { ...palsy, nerve: 'VII' })['Age 50 or older']).toBeUndefined()
  })

  // S2-1, Thompson: "five segments: the medullary, cisternal, skull base, nasopharyngeal/
  // oropharyngeal carotid space, and sublingual segments".
  test('the hypoglossal segments', () => {
    expect(chips(study, 'site', { ...palsy, nerve: 'XII' }).Segments).toBe('Medullary, cisternal, skull base, carotid space, sublingual')
  })

  // S3-1, Gebarski: "142 nerves (76%) were visibly enhanced along at least one segment of the facial
  // nerve within the facial canal ... The facial nerve in the cerebellopontine angle cistern and in
  // the internal auditory canal, as well as in the visualized proximal portion of the extracranial
  // facial nerve, showed no enhancement."
  test('facial nerve enhancement: normal in the canal, not in the angle or canal or outside the skull', () => {
    const facial = { ...palsy, nerve: 'VII' }
    expect(chips(study, 'findings', { ...facial, 'facial-enhancement': ['canal'] })['Facial nerve']).toBe('Enhancement in the canal: seen in 76% of normal nerves')
    expect(chips(study, 'findings', { ...facial, 'facial-enhancement': ['cpa-iac'] })['Facial nerve']).toBe('Enhancement here was not seen in normal nerves')
    expect(chips(study, 'findings', { ...facial, 'facial-enhancement': ['extracranial', 'canal'] })['Facial nerve']).toBe('Enhancement here was not seen in normal nerves')
    expect(impressionOf({ ...facial, 'facial-enhancement': ['cpa-iac'] })).toContain('Facial nerve enhancement outside the facial canal, where normal nerves did not enhance.')
  })

  // S3-2, Russo: "Relatively recently occurring denervation results in abnormal contrast
  // enhancement and edemalike signal changes ... Recognition ... may help to distinguish
  // denervation from similar-appearing processes, such as infection or neoplasia."
  test('denervation, for V and XII palsies and spread along V3', () => {
    expect(chips(study, 'findings', { ...palsy, nerve: 'V', denervation: 'recent' }).Denervation).toBe('Recent: can mimic infection or tumour')
    expect(chips(study, 'findings', { ...palsy, nerve: 'XII', denervation: 'longstanding' }).Denervation).toBe('Long-standing')
    expect(chips(study, 'findings', { ...palsy, nerve: 'VI', denervation: 'recent' }).Denervation).toBeUndefined()
    expect(chips(study, 'findings', { ...pns, pns: 'present', 'pns-nerves': ['V3'], denervation: 'recent' }).Denervation).toBe('Recent: can mimic infection or tumour')
  })

  // S3-4, Nemzek: "sensitivity ... for detection ... was 95%; however, the sensitivity for mapping
  // the entire extent ... fell to 63%". S3-5, Gandhi: "In 4 of 30 cases (13.3%) MRI underestimated
  // the extent of spread proximal to the Gasserian ganglion". S3-6, Nader: DFN sensitivity 72.7%,
  // SMF 80%. S3-7, Williams: "low-volume and peripheral perineural disease is radiocurable. Greater
  // perineural tumor volume with more central disease was associated with an unfavorable outcome."
  test('perineural spread: the extent and its limits', () => {
    const present = { ...pns, pns: 'present', 'pns-signs': ['nerve'] }
    expect(chips(study, 'findings', present).Extent).toBe('MRI can underestimate it: 63% for the whole extent in Nemzek\'s series')
    expect(chips(study, 'findings', { ...present, 'pns-extent': 'ganglion' })['Gasserian ganglion']).toBe('Spread central to it was underestimated in 4 of 30 nerves')
    expect(chips(study, 'findings', { ...present, 'pns-extent': 'foramen' })['Gasserian ganglion']).toBeUndefined()
    expect(chips(study, 'findings', { ...present, 'pns-nerves': ['VII'] })['Facial nerve']).toBe('Mastoid segment 72.7% sensitive; stylomastoid foramen 80%')
    expect(chips(study, 'findings', { ...present, 'pns-extent': 'peripheral' }).Peripheral).toBe('Small-volume, peripheral spread was curable by radiotherapy')
    expect(chips(study, 'findings', { ...present, 'pns-extent': 'cistern' }).Central).toBe('More central spread had a worse outcome')
  })

  // S3-3, Caldemeyer 1998: the signs of perineural spread.
  test('perineural spread with none of its signs is flagged', () => {
    const values = { ...pns, pns: 'present', 'pns-extent': 'foramen' }
    expect(report(study, values).warnings).toContain('Perineural spread is entered with none of the signs: check the nerve, the foramen, the fat at its opening and Meckel cave.')
    expect(report(study, { ...values, 'pns-signs': ['fat'] }).warnings).toEqual([])
  })

  // S3-8, Caldemeyer 1997: "Most tumoral lesions of the jugular foramen manifest at CT as areas of
  // infiltrative bone destruction ... In nontumoral pseudolesions, computed tomography (CT)
  // demonstrates smooth, intact margins". S3-9, S3-10, Macdonald: paraganglioma "permeative
  // destruction", "superolateral spread into the middle ear"; meningioma "a permeative-sclerotic
  // appearance to the bone margins of the jugular foramen (5/5)". S3-11, Eldevik: "an enlarged
  // jugular foramen with sharply rounded bone borders and a sclerotic rim".
  test('the jugular foramen margins', () => {
    const margin = (bone: string) => chips(study, 'findings', { ...jugular, bone })['Jugular foramen']
    expect(margin('permeative')).toBe('Infiltrative destruction: paraganglioma or metastasis')
    expect(margin('permeative-sclerotic')).toBe('Permeative-sclerotic margins: meningioma (5 of 5 in Macdonald\'s series)')
    expect(margin('smooth')).toBe('Smooth enlargement with a sclerotic rim: schwannoma')
    expect(margin('intact')).toBe('Smooth, intact margins: pseudolesion, e.g. a high jugular bulb')
    expect(chips(study, 'findings', { ...jugular, bone: 'permeative', extension: ['middle-ear'] })['Middle ear']).toBe('Spread up and out into the middle ear was typical of paraganglioma')
  })

  // S3-12, Olsen: "This 'salt-and-pepper' pattern was seen in all lesions greater than 2 cm in
  // maximal dimension." S3-13, Vogl: MR angiography told tumour from a high jugular bulb.
  test('MRI for a jugular foramen mass, by size', () => {
    expect(chips(study, 'findings', { ...jugular, bone: 'permeative', 'mass-size': '2.5' }).MRI).toBe('Salt and pepper: seen in every paraganglioma over 2 cm')
    expect(chips(study, 'findings', { ...jugular, bone: 'permeative', 'mass-size': '2' }).MRI).toBe('Salt and pepper in paragangliomas over 2 cm; MR angiography separates a high bulb')
    expect(chips(study, 'findings', { ...jugular, bone: 'intact' }).MRI).toBeUndefined()
  })

  // S3-14, Erdem: "a centrally located, well-circumscribed, expansile soft-tissue mass that arises
  // from the clivus with associated extensive lytic bone destruction". S3-15, Meyers: "Matrix
  // mineralization was demonstrated with CT in seven of the 16 chondrosarcomas". S3-16, Yeom:
  // chondrosarcoma had the highest mean ADC. S2-6, Yeom: "lesion location did not reliably
  // distinguish these tumor types".
  test('a clival mass: chordoma, chondrosarcoma and diffusion', () => {
    const clivus = { history: 'mass', protocol: 'complete', site: 'clivus' }
    expect(chips(study, 'findings', { ...clivus, bone: 'lytic' }).Clivus).toBe('Central, expansile, lytic: the typical chordoma')
    expect(chips(study, 'findings', { ...clivus, bone: 'lytic', matrix: 'yes' }).Matrix).toBe('Seen on CT in 7 of 16 chondrosarcomas')
    expect(chips(study, 'findings', { ...clivus, bone: 'lytic' }).Diffusion).toBe('Highest ADC in chondrosarcoma, lowest in poorly differentiated chordoma')
    expect(chips(study, 'site', clivus)['Chordoma or chondrosarcoma']).toBe('Location did not reliably tell them apart in Yeom\'s series')
    expect(chips(study, 'site', jugular)['Chordoma or chondrosarcoma']).toBeUndefined()
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...palsy, cause: 'found', 'impression-negatives': ['no-lesion'] }).warnings)
      .toContain('Impression says no lesion along the nerve, but a cause is entered.')
    expect(report(study, { ...pns, pns: 'present', 'pns-signs': ['nerve'], 'impression-negatives': ['no-pns'] }).warnings)
      .toContain('Impression says no perineural spread, but perineural spread is entered.')
  })
})
