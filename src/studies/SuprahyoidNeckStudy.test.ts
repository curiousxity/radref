import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { SuprahyoidNeckStudyPage } from './SuprahyoidNeckStudy'

const study = studyOf(SuprahyoidNeckStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-25-suprahyoid-neck-sources.md (N claims). The references
 * are matched and every claim but the mylohyoid line (N2-12) has been read, in its paper or in
 * an open review cited beside it; when N2-12 is checked its case may have to change; say in
 * that commit why the old expectation was wrong.
 */

describe('suprahyoid neck lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'lesion', 'spread', 'nodes', 'impression'])
  })

  // Every claim is read, so the note no longer says "Unchecked draft" (2026-10-29). Estrera 1983
  // and Russo 1997 are the exceptions to the DOIs: neither PubMed nor Crossref has one for them.
  // Hirvonen 2023 and Fernandes 2013 are the open reviews added beside Lemierre and Ginsberg, and
  // Iwata 2026 beside Mardini for the mylohyoid line (2026-10-29).
  test('is no longer an unchecked draft, with a DOI on every reference but Estrera and Russo', () => {
    expect(study.sourceNote).not.toMatch(/Unchecked draft/)
    expect(study.sourceNote).toMatch(/^Every reference has been matched/)
    expect(study.references).toHaveLength(17)
    for (const ref of study.references) {
      if (/^(Estrera|Russo) /.test(ref.citation)) expect(ref.doi, ref.citation).toBeUndefined()
      else expect(ref.doi, ref.citation).toMatch(/^10\./)
    }
  })
})

/** A complete normal CT for a neck mass. */
const normalMass: Values = {
  exam: 'ct',
  history: 'mass',
  protocol: 'complete',
  mass: 'none',
  nodes: 'none',
}

/** A complete normal CT for infection. */
const normalInfection: Values = {
  exam: 'ct',
  history: 'infection',
  protocol: 'complete',
  collection: 'none',
  airway: 'patent',
  ijv: 'patent',
  nodes: 'none',
}

/** A mass, present, with nothing else entered about it. */
const mass: Values = { ...normalMass, exam: 'mri', mass: 'present' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('suprahyoid neck report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the history', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual([...new Set([...Object.keys(normalMass), ...Object.keys(normalInfection)])].sort())
    expect(report(study, normalMass).warnings).toEqual([])
    expect(report(study, normalInfection).warnings).toEqual([])
    expect(report(study, { ...normalMass, history: 'infection' }).warnings).toEqual(['Collection not stated', 'Airway not stated', 'Internal jugular vein not stated'])
  })
})

describe('suprahyoid neck report: whole cases', () => {
  test('normal mass study: a plain impression', () => {
    const { text } = report(study, normalMass)
    expect(impressionOf(normalMass)).toBe('No suprahyoid neck mass.')
    expect(text).toContain('Exam: CT with contrast')
    expect(text).toContain('Technique: contrast-enhanced, thin sections with coronal and sagittal reformats, skull base to thoracic inlet')
    expect(text).toContain('Mass: none')
  })

  test('normal infection study: a plain impression', () => {
    expect(impressionOf(normalInfection)).toBe('No deep neck collection.')
    expect(report(study, normalInfection).text).toContain('Airway: patent')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    expect(warnings).toEqual(['Exam not stated', 'History not stated', 'Protocol not stated', 'Lymph nodes not stated'])
  })

  test('an MRI for a masticator space mass with perineural spread', () => {
    const values = {
      ...mass,
      'mass-side': 'Right', 'mass-size': '3.2', 'fat-shift': 'posterior', 'mass-space': 'ms', 'mass-text': 'infiltrative',
      perineural: 'suspected', 'perineural-text': 'V3, widened foramen ovale',
      denervation: 'acute', 'denervation-text': 'right masticator muscles',
      nodes: 'abnormal', 'node-side': 'Right', 'node-level': 'II', 'node-size': '14', 'node-features': ['necrosis'],
    }
    const { text, warnings } = report(study, values)
    expect(warnings).toEqual([])
    expect(text).toContain('Technique: T1, fat-suppressed T2 and fat-suppressed contrast-enhanced T1')
    expect(text).toContain('Mass: right, masticator space, 3.2 cm, infiltrative, parapharyngeal fat pushed posteriorly (posteromedially)')
    expect(impressionOf(values)).toBe([
      'Right masticator space mass, 3.2 cm, infiltrative.',
      'Perineural spread suspected: V3, widened foramen ovale.',
      'Acute or subacute denervation of the right masticator muscles.',
      'Right level II lymph node, 14 mm, necrotic.',
    ].join('\n'))
  })

  test('an infection: airway first, then the mediastinum, the collection and the vein', () => {
    const values = {
      ...normalInfection,
      collection: 'rim', 'collection-side': 'Left', 'collection-spaces': ['pps', 'rps'], 'collection-size': '3', 'rp-pattern': 'abscess', gas: 'yes', source: ['tonsil'],
      airway: 'narrowed', 'airway-text': 'oropharynx narrowed to 5 mm',
      ijv: 'thrombosed', 'ijv-side': 'Left',
      mediastinum: 'yes',
    }
    expect(impressionOf(values)).toBe([
      'Airway narrowing: oropharynx narrowed to 5 mm.',
      'Infection extends into the mediastinum.',
      'Left rim-enhancing collection in the parapharyngeal space and retropharyngeal space, likely abscess; 3 cm, with gas, source: tonsil or pharynx.',
      'Left internal jugular vein thrombosis, in keeping with Lemierre syndrome.',
    ].join('\n'))
  })

  test('a mass with no space entered still gets a line', () => {
    expect(impressionOf({ ...mass, 'mass-side': 'Left' })).toBe('Left suprahyoid neck mass.')
    expect(impressionOf(mass)).toBe('Suprahyoid neck mass.')
  })

  test('a phlegmon and retropharyngeal edema', () => {
    expect(impressionOf({ ...normalInfection, collection: 'phlegmon', 'collection-spaces': ['sms'], 'collection-size': '4' })).toBe('Phlegmon of the submandibular space.')
    expect(impressionOf({ ...normalInfection, collection: 'fluid', 'collection-spaces': ['rps'], 'rp-pattern': 'edema' })).toBe('Retropharyngeal edema rather than abscess.')
  })

  test('hidden answers write nothing', () => {
    // Infection fields under a mass history, MRI-only flow voids on CT, mass fields with no mass.
    const text = report(study, { ...normalMass, collection: 'rim', airway: 'narrowed', 'flow-voids': 'yes', 'mass-space': 'cs', perineural: 'suspected' }).text
    expect(text).not.toMatch(/collection|Airway|flow voids|carotid|Perineural/i)
  })
})

describe('suprahyoid neck rules (unchecked)', () => {
  // N2-2: "The parapharyngeal fat is pushed by a mass from each neighbour in a set direction."
  test('the fat shift names the space of origin', () => {
    const shift = (direction: string) => chips(study, 'lesion', { ...mass, 'fat-shift': direction })['Fat shift']
    expect(shift('lateral')).toBe('Points to the pharyngeal mucosal space')
    expect(shift('posterior')).toBe('Points to the masticator space')
    expect(shift('medial')).toBe('Points to the parotid space')
    expect(shift('anterior')).toBe('Points to the carotid space')
    expect(shift('anterolateral')).toBe('Points to the retropharyngeal space')
    expect(shift('surrounded')).toBe('Points to the parapharyngeal space')
    expect(shift('not-displaced')).toBeUndefined()
  })

  test('a space that disagrees with the fat shift raises a warning', () => {
    expect(report(study, { ...mass, 'fat-shift': 'posterior', 'mass-space': 'ps' }).warnings)
      .toEqual(['The parapharyngeal fat points to the masticator space, but the parotid space is entered: look again at which way the fat is pushed.'])
    expect(report(study, { ...mass, 'fat-shift': 'posterior', 'mass-space': 'ms' }).warnings).toEqual([])
  })

  // N2-4: the usual lesions, for the seven classic spaces only.
  test('usual lesions of the space entered', () => {
    expect(chips(study, 'lesion', { ...mass, 'mass-space': 'pps' })['Usual lesions']).toBe('Pleomorphic adenoma from a minor salivary rest, lipoma, atypical second branchial cleft cyst')
    expect(chips(study, 'lesion', { ...mass, 'mass-space': 'sms' })['Usual lesions']).toBeUndefined()
  })

  // N2-3, N2-5, N2-6, N2-7: the signs around the mass.
  test('signs around the mass', () => {
    const sign = (signs: string[]) => chips(study, 'lesion', { ...mass, 'mass-signs': signs })
    expect(sign(['tunnel']).Parotid).toBe('Points to the deep lobe of the parotid')
    // N2-6: Harnsberger and Osborn do not state the forward sign, but Shin does: "In tumors arising
    // from the poststyloid parapharyngeal space, anteromedial displacement of the carotid sheath
    // structures is frequent ... whereas posterolateral displacement ... is frequent in tumors arising
    // from the prestyloid parapharyngeal space"; Harnsberger gives posterolateral for a lateral
    // retropharyngeal node.
    expect(sign(['ica-forward']).Carotid).toBe('Points to the carotid space (poststyloid)')
    expect(sign(['ica-back']).Carotid).toBe('Points to a prestyloid parapharyngeal mass or a lateral retropharyngeal node')
    expect(sign(['ica-back', 'splay']).Carotid).toBe('Splayed bifurcation: carotid body paraganglioma')
    expect(sign(['prevertebral'])['Prevertebral muscles']).toBe('Points to the perivertebral space')
  })

  // N2-8, Olsen: 'This "salt-and-pepper" pattern was seen in all lesions greater than 2 cm in
  // maximal dimension.'
  test('flow voids are asked on MRI only', () => {
    expect(chips(study, 'lesion', { ...mass, 'flow-voids': 'yes' })['Flow voids']).toBe('Salt and pepper: seen in every paraganglioma over 2 cm')
    expect(chips(study, 'lesion', { ...mass, exam: 'ct', 'flow-voids': 'yes' })['Flow voids']).toBeUndefined()
  })

  // N2-10, Freling: "The positive predictive value (PPV) for the presence of an abscess was 82%
  // (53/65) ... The PPV was 67% (8/12) for fluid collections without rim enhancement. Air within
  // or adjacent to a fluid collection or excessive free air between the fascias indicated an
  // abscess in all cases."
  test('how often each CT sign meant an abscess', () => {
    const infection = { ...normalInfection, 'collection-spaces': ['pps'] }
    expect(chips(study, 'lesion', { ...infection, collection: 'rim' }).Rim).toBe("An abscess in 82% in Freling's series")
    expect(chips(study, 'lesion', { ...infection, collection: 'fluid' })['No rim']).toBe("An abscess in 67% in Freling's series")
    expect(chips(study, 'lesion', { ...infection, collection: 'rim', gas: 'yes' }).Gas).toBe("Meant an abscess in every case in Freling's series")
    expect(chips(study, 'lesion', { ...infection, collection: 'phlegmon' }).Rim).toBeUndefined()
  })

  // N2-9: the retropharyngeal pattern.
  test('retropharyngeal edema against abscess', () => {
    const infection = { ...normalInfection, 'collection-spaces': ['rps'] }
    expect(chips(study, 'lesion', { ...infection, collection: 'fluid', 'rp-pattern': 'edema' }).Retropharyngeal).toBe('Edema rather than abscess')
    // Hoang's table has a third pattern: a suppurative node, "Unilateral", rounded.
    expect(chips(study, 'lesion', { ...infection, collection: 'rim', 'rp-pattern': 'node' }).Retropharyngeal).toBe('Suppurative node pattern')
    expect(report(study, { ...infection, collection: 'rim', 'rp-pattern': 'edema' }).warnings)
      .toEqual(['Retropharyngeal edema has no enhancing wall, but a rim-enhancing collection is entered: look again at the wall.'])
  })

  // N2-12: the mylohyoid line, by the lesion's position (Iwata 2026: "When an odontogenic lesion is
  // located superior to the mylohyoid line, the abscess tends to initially form in the sublingual
  // space"). N2-11, Schuknecht: "Medial masticator space abscesses exhibited
  // extra-spatial spread only. Extension affected the parapharyngeal space and/or soft palate in
  // 7 of 13 ... The sub-masseteric space served as a previously underestimated pathway for
  // intra-spatial propagation of lateral masticator abscesses."
  test('the mylohyoid line and the masticator space', () => {
    const dental = { ...normalInfection, collection: 'rim', source: ['dental'] }
    expect(chips(study, 'lesion', { ...dental, mylohyoid: 'above' })['Mylohyoid line']).toBe('Above it: sublingual space first, may spread to the submandibular space')
    expect(chips(study, 'lesion', { ...dental, mylohyoid: 'below' })['Mylohyoid line']).toBe('Below it: submandibular space')
    // The tooth alone no longer sets the space.
    expect(chips(study, 'lesion', { ...dental, tooth: 'back' })['Mylohyoid line']).toBeUndefined()
    expect(chips(study, 'lesion', { ...dental, 'collection-spaces': ['ms'] })['Masticator space'])
      .toBe('Medial pterygoid: spreads out to the parapharyngeal space or soft palate; lateral: spreads within, under the masseter')
    expect(chips(study, 'lesion', { ...dental, 'collection-spaces': ['sms'] })['Masticator space']).toBeUndefined()
  })

  // N3-1, N3-2, N3-3: spread. N3-4, Russo: "Relatively recently occurring denervation results in
  // abnormal contrast enhancement and edemalike signal changes ... may help to distinguish
  // denervation from similar-appearing processes, such as infection or neoplasia."
  test('spread chips', () => {
    expect(chips(study, 'spread', { ...mass, perineural: 'suspected', 'mass-space': 'ms' })['Perineural spread']).toBe('Follow V3 through the foramen ovale to the skull base')
    expect(chips(study, 'spread', { ...mass, perineural: 'suspected' })['Perineural spread']).toBe('Follow the nerve to its foramen and the skull base')
    expect(chips(study, 'spread', { ...mass, denervation: 'acute' }).Denervation).toBe('Recent: can mimic infection or tumour')
    expect(chips(study, 'spread', { ...mass, denervation: 'chronic' }).Denervation).toBe('Long-standing: fatty replacement')
    const infection = { ...normalInfection, collection: 'rim', ijv: 'thrombosed' }
    expect(chips(study, 'spread', { ...infection, source: ['tonsil'] })['Jugular vein']).toBe('Thrombosis after an oropharyngeal infection: Lemierre syndrome')
    expect(chips(study, 'spread', { ...infection, source: ['dental'] })['Jugular vein']).toBe('Thrombosed')
    expect(chips(study, 'spread', { ...normalInfection, mediastinum: 'yes' }).Mediastinum).toBe('Descending necrotizing mediastinitis pattern')
  })

  // N4-1, van den Brekel: "A minimal axial diameter of 10 mm was determined to be the most
  // effective size criterion. The size criterion for lymph nodes in the subdigastric region was
  // 1 mm larger (11 mm)." The draft applied 11 mm to all of level II; the paper gives it to the
  // subdigastric node only, and the author chose to match the paper (2026-10-25).
  test('node size at the cut-off', () => {
    const size = (level: string, mm: string) => chips(study, 'nodes', { ...normalMass, nodes: 'abnormal', 'node-level': level, 'node-size': mm }).Size
    expect(size('IIsd', '10')).toBe('Under 11 mm for level II (subdigastric)')
    expect(size('IIsd', '11')).toBe('At or over 11 mm for level II (subdigastric)')
    expect(size('II', '9')).toBe('Under 10 mm for level II')
    expect(size('II', '10')).toBe('At or over 10 mm for level II')
    expect(size('III', '9')).toBe('Under 10 mm for level III')
    expect(size('III', '10')).toBe('At or over 10 mm for level III')
    expect(size('RP', '20')).toBeUndefined()
  })

  // N4-2, van den Brekel: "Radiologically detectable necrosis (3 mm or larger) was found only in
  // tumorous nodes." The draft cited Som for "the most reliable sign", which Som's abstract does
  // not state; the author chose van den Brekel's wording (2026-10-25).
  test('necrosis with a mass history only', () => {
    const node = { nodes: 'abnormal', 'node-features': ['necrosis'] }
    expect(chips(study, 'nodes', { ...normalMass, ...node }).Necrosis).toBe('3 mm or more was found only in nodes with tumour')
    expect(chips(study, 'nodes', { ...normalInfection, ...node }).Necrosis).toBeUndefined()
  })
})

describe('suprahyoid neck report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...mass, 'impression-negatives': ['no-mass'] }).warnings).toContain('Impression says no mass, but a mass is entered.')
    expect(report(study, { ...normalInfection, collection: 'rim', 'impression-negatives': ['no-collection'] }).warnings)
      .toContain('Impression says no drainable collection, but a collection is entered.')
    expect(report(study, { ...normalMass, nodes: 'abnormal', 'impression-negatives': ['no-nodes'] }).warnings)
      .toContain('Impression says no abnormal lymph nodes, but an abnormal node is entered.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normalMass, 'impression-negatives': ['no-mass', 'no-nodes'] }).warnings).toEqual([])
    expect(report(study, { ...normalInfection, collection: 'phlegmon', 'impression-negatives': ['no-collection'] }).warnings).toEqual([])
  })

  const cases: Values[] = [
    {},
    normalMass,
    normalInfection,
    { ...mass, protocol: 'incomplete', 'missing-mri': ['post'], 'mass-signs': ['tunnel', 'parotid-contact'], 'flow-voids': 'no', bone: 'present', nodes: 'abnormal' },
    { ...normalInfection, protocol: 'incomplete', collection: 'fluid', 'collection-spaces': ['bs', 'ms'], source: ['dental', 'stone'], tooth: 'front', bone: 'present', 'bone-text': 'mandible', other: 'Sinus disease.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('suprahyoid neck quiz', () => {
  test('has 8–12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const question of study.quiz) {
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0)
      expect(question.answer, question.id).toBeLessThan(question.options.length)
    }
    expect(new Set(study.quiz.map((q) => q.id)).size).toBe(study.quiz.length)
  })
})
