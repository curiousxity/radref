import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { LarynxStudyPage } from './LarynxStudy'

const study = studyOf(LarynxStudyPage)

/*
 * Every rule case below quotes a claim from docs/superpowers/research/2026-10-25-larynx-sources.md
 * (L claims), each read in an abstract or open full text when it was written, except those the
 * table marks part. If a case has to change, say in that commit why the old expectation was wrong.
 */

describe('larynx lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'tumour', 'cartilage', 'nodes', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, but the site author has not
  // reviewed the study yet, so the note still says "Unchecked draft".
  test('is marked as an unchecked draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    expect(study.references).toHaveLength(15)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
  })
})

/** A complete CT staging a known cancer, tumour seen, nothing beyond the larynx. */
const cancer: Values = {
  exam: 'ct',
  history: 'cancer',
  protocol: 'complete',
  tumour: 'seen',
  nodes: 'none',
}

/** A complete normal CT for hoarseness. */
const hoarse: Values = {
  exam: 'ct',
  history: 'hoarseness',
  protocol: 'complete',
  cords: 'normal',
  nodes: 'none',
}

const glottic: Values = { ...cancer, subsite: 'glottic', 'tumour-side': 'Left' }
const supraglottic: Values = { ...cancer, subsite: 'supraglottic', 'tumour-side': 'Right' }
const subglottic: Values = { ...cancer, subsite: 'subglottic' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('larynx report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the history', () => {
    expect(report(study, cancer).warnings).toEqual([])
    expect(report(study, hoarse).warnings).toEqual([])
    expect(report(study).warnings).toEqual(['Exam not stated', 'History not stated', 'Protocol not stated', 'Lymph nodes not stated'])
    expect(report(study, { ...hoarse, cords: 'paralysis' }).warnings).toEqual(['Cause along the nerve not stated'])
  })
})

describe('larynx report: whole cases', () => {
  test('normal hoarseness CT reaches the aortopulmonary window', () => {
    const { text } = report(study, hoarse)
    expect(text).toContain('Technique: contrast-enhanced thin sections with reformats, skull base to the aortopulmonary window')
    expect(impressionOf(hoarse)).toBe('No laryngeal mass and no sign of vocal cord paralysis.')
  })

  test('a staging CT reaches the sternoclavicular joints; a known cancer not seen says so', () => {
    expect(report(study, cancer).text).toContain('skull base to the sternoclavicular joints')
    expect(impressionOf({ ...cancer, tumour: 'not-seen' })).toBe('No tumour seen.')
  })

  test('a left cord paralysis with a cause in the chest', () => {
    const values = { ...hoarse, cords: 'paralysis', 'paralysis-side': 'Left', 'paralysis-signs': ['pyriform', 'ae-fold', 'ventricle'], cause: 'found', 'cause-site': 'mediastinum', 'cause-text': '3 cm mass in the aortopulmonary window' }
    expect(impressionOf(values)).toBe('Left vocal cord paralysis pattern.\nPossible cause: mediastinum, 3 cm mass in the aortopulmonary window.')
  })

  test('a high vagal lesion with no cause seen', () => {
    const values = { ...hoarse, cords: 'paralysis', 'paralysis-side': 'Right', 'paralysis-signs': ['pyriform'], constrictor: 'yes', cause: 'none' }
    expect(impressionOf(values)).toBe('Right vocal cord paralysis pattern, with pharyngeal constrictor atrophy suggesting a central (high) vagal lesion.\nNo cause seen along the vagus and recurrent laryngeal nerve.')
  })

  test('a transglottic tumour through the thyroid cartilage, with a node', () => {
    const values = {
      ...glottic, 'tumour-size': '3.4', transglottic: 'yes', spaces: ['pgs', 'ac'],
      cartilage: 'thyroid', 'ct-signs': ['erosion', 'extralaryngeal'], 'thyroid-depth': 'through', beyond: ['strap'],
      nodes: 'abnormal', 'node-side': 'Left', 'node-level': 'III', 'node-size': '12', 'node-features': ['necrosis'],
    }
    expect(impressionOf(values)).toBe([
      'Left glottic tumour, 3.4 cm, transglottic; involving paraglottic fat, anterior commissure (thicker than 1-2 mm).',
      'Imaging features of T4a: through the thyroid cartilage, strap muscles.',
      'Left level III lymph node, 12 mm, necrotic.',
    ].join('\n'))
  })

  test('a mass found on a hoarseness CT gets the tumour fields', () => {
    expect(impressionOf({ ...hoarse, cords: 'mass', 'tumour-side': 'Right' })).toBe('Right laryngeal mass.')
  })

  test('a subglottic tumour invading the cricoid is T4a', () => {
    const values = { ...subglottic, cartilage: 'cricoid', cricoid: 'invaded', 'thyroid-depth': 'none' }
    expect(report(study, values).text).toContain('Cricoid cartilage: invaded')
    expect(impressionOf(values)).toBe('Subglottic tumour.\nImaging features of T4a: cricoid cartilage.')
    expect(report(study, { ...values, 'impression-negatives': ['no-cartilage'] }).warnings)
      .toContain('Impression says no cartilage invasion, but cartilage invasion is entered.')
  })

  test('a tumour with no cartilage or spread says so', () => {
    expect(impressionOf({ ...glottic, cartilage: 'none', 'thyroid-depth': 'none' })).toBe('Left glottic tumour.\nNo cartilage invasion or spread beyond the larynx on imaging.')
  })

  test('hidden answers write nothing', () => {
    // Cord fields under a cancer history, tumour fields when the tumour is not seen, MRI signal on CT.
    const text = report(study, { ...cancer, tumour: 'not-seen', cords: 'paralysis', subsite: 'glottic', 'mri-signal': 'like-tumour', beyond: ['strap'] }).text
    expect(text).not.toMatch(/paralysis|glottic|signal|strap/i)
  })
})

describe('larynx rules', () => {
  // L2-1, Connor's AJCC tables: supraglottic T3 "invasion of postcricoid, pre-epiglottic region,
  // paraglottic space and/or minor thyroid cartilage erosion (e.g. inner cortex)"; glottic T3
  // "invades paraglottic space, and/or minor thyroid cartilage erosion"; subglottic T3 "vocal cord
  // fixation" only; T4a "tissues beyond the larynx"; T4b "prevertebral space, encases carotid
  // artery or invades mediastinal structures". Joshi's AJCC seventh edition table (Table 2):
  // supraglottic and glottic T4a "Tumor invading through the thyroid cartilage"; subglottic T4a
  // "Tumor invading cricoids and/or thyroid cartilage". The subglottic inner-cortex case used to
  // expect no category, from Connor's table alone; Joshi's table makes it T4a (author's choice,
  // 2026-10-25: match the paper).
  test('the T category imaging sets, by subsite', () => {
    const t = (values: Values) => chips(study, 'cartilage', values)['Imaging T']
    expect(t({ ...supraglottic, spaces: ['pes'] })).toBe('At least T3')
    expect(t({ ...supraglottic, spaces: ['postcricoid'] })).toBe('At least T3')
    expect(t({ ...glottic, spaces: ['pes'] })).toBeUndefined()
    expect(t({ ...glottic, spaces: ['pgs'] })).toBe('At least T3')
    expect(t({ ...glottic, 'thyroid-depth': 'inner' })).toBe('At least T3')
    expect(t({ ...subglottic, spaces: ['pgs'] })).toBeUndefined()
    expect(t({ ...subglottic, 'thyroid-depth': 'inner' })).toBe('T4a')
    expect(t({ ...subglottic, cricoid: 'invaded' })).toBe('T4a')
    expect(t({ ...subglottic, cricoid: 'none', 'thyroid-depth': 'none' })).toBeUndefined()
    // The cricoid question is for a subglottic tumour only; a hidden answer sets nothing.
    expect(t({ ...glottic, cricoid: 'invaded' })).toBeUndefined()
    expect(t({ ...subglottic, 'thyroid-depth': 'through' })).toBe('T4a')
    expect(t({ ...glottic, beyond: ['trachea'] })).toBe('T4a')
    expect(t({ ...glottic, beyond: ['trachea'], t4b: ['carotid'] })).toBe('T4b')
    expect(t(glottic)).toBeUndefined()
  })

  // L4-1, Chin: "the most sensitive imaging findings were ipsilateral pyriform sinus dilatation,
  // medial positioning and thickening of the ipsilateral aryepiglottic fold, and ipsilateral
  // laryngeal ventricle dilatation." L4-2: "Ipsilateral pharyngeal constrictor muscle atrophy is a
  // helpful imaging finding to localize a more central vagal neuropathy."
  test('cord paralysis signs and level', () => {
    const paralysis = { ...hoarse, cords: 'paralysis' }
    expect(chips(study, 'tumour', { ...paralysis, 'paralysis-signs': ['pyriform', 'ventricle', 'subglottic-arch'] })['Cord paralysis']).toBe("2 of Chin's 3 reliable signs")
    expect(chips(study, 'tumour', { ...paralysis, constrictor: 'yes' }).Level).toBe('Central vagal lesion: follow the vagus up to the skull base')
    expect(report(study, { ...paralysis, 'paralysis-side': 'Left', cause: 'none' }).warnings)
      .toEqual(['Cord paralysis pattern is entered with none of the signs: check the pyriform sinus, aryepiglottic fold and ventricle.'])
  })

  // L4-4, Politano: "Etiology was more often found in the chest for left-sided paralysis (15/21)
  // and in the neck for right-sided paralysis (6/9)."
  test('where the cause lay, by side', () => {
    const paralysis = { ...hoarse, cords: 'paralysis' }
    expect(chips(study, 'tumour', { ...paralysis, 'paralysis-side': 'Left' })['Left side']).toBe('The cause was more often in the chest (15 of 21)')
    expect(chips(study, 'tumour', { ...paralysis, 'paralysis-side': 'Right' })['Right side']).toBe('The cause was more often in the neck (6 of 9)')
  })

  // L3-2, Joshi: paraglottic spread "sensitivity of about 95% ... specificity ... between 50 and
  // 75%". L3-3, Loevner: unenhanced T1 most useful. L3-4: anterior commissure. L3-5: imaging
  // correlates of cord fixation.
  test('space chips', () => {
    expect(chips(study, 'tumour', { ...glottic, spaces: ['pgs'] })['Paraglottic fat']).toBe('About 95% sensitive, 50-75% specific: inflammation can mimic tumour')
    expect(chips(study, 'tumour', { ...supraglottic, exam: 'mri', spaces: ['pes'] })['Pre-epiglottic fat']).toBeDefined()
    expect(chips(study, 'tumour', { ...supraglottic, spaces: ['pes'] })['Pre-epiglottic fat']).toBeUndefined()
    expect(chips(study, 'tumour', { ...glottic, spaces: ['ac'] })['Anterior commissure']).toBe('Often invades the thyroid cartilage here: look closely')
    expect(chips(study, 'tumour', { ...glottic, spaces: ['caj'] })['Cord fixation']).toBe('Imaging correlate; cord movement is judged at endoscopy')
  })

  // L5-1, Becker 1997: "Sclerosis was the most sensitive criteria in all cartilages but often
  // corresponded to reactive inflammation in the thyroid cartilage. Extralaryngeal tumor and erosion
  // or lysis yielded the highest specificity. Tumor adjacent to nonossified cartilage, serpiginous
  // contour, and obliteration of marrow space were specific although not sensitive signs of invasion
  // in the arytenoid and cricoid cartilage and were nonspecific in the thyroid cartilage."
  test('CT signs of cartilage invasion, by cartilage', () => {
    const sign = (cartilage: string, signs: string[]) => chips(study, 'cartilage', { ...glottic, cartilage, 'ct-signs': signs })['CT signs']
    expect(sign('thyroid', ['sclerosis'])).toBe('Sclerosis alone: often reactive inflammation in the thyroid cartilage')
    expect(sign('cricoid', ['sclerosis'])).toBe('Sclerosis alone: the most sensitive sign, but less specific than erosion')
    expect(sign('thyroid', ['sclerosis', 'erosion'])).toBe('Erosion, lysis or extralaryngeal tumour: the most specific signs')
    expect(sign('thyroid', ['serpiginous'])).toBe('Not specific in the thyroid cartilage')
    expect(sign('arytenoid', ['marrow'])).toBe('Specific, though not sensitive, in the cricoid and arytenoid')
  })

  // L5-3, Becker 2008: "T2-weighted or postcontrast T1-weighted cartilage signal intensity greater
  // than that of the adjacent tumor was considered to indicate inflammation, and signal intensity
  // similar to that of the adjacent tumor was considered to indicate neoplastic invasion."
  test('the MRI signal rule', () => {
    const mri = { ...glottic, exam: 'mri', cartilage: 'thyroid' }
    expect(chips(study, 'cartilage', { ...mri, 'mri-signal': 'like-tumour' }).MRI).toBe('Signal like the tumour: invasion')
    expect(chips(study, 'cartilage', { ...mri, 'mri-signal': 'brighter' }).MRI).toBe('Brighter than the tumour: inflammation rather than invasion')
    expect(report(study, { ...mri, 'mri-signal': 'brighter', 'thyroid-depth': 'inner' }).warnings)
      .toEqual(['Thyroid cartilage invasion is entered, but its signal is brighter than the tumour, which Becker read as inflammation: look again.'])
    expect(chips(study, 'cartilage', { ...glottic, cartilage: 'thyroid', 'mri-signal': 'brighter' }).MRI).toBeUndefined()
  })

  // L6-1, Joshi: glottic nodal metastases rare; subglottic to pre- and paratracheal nodes. L6-2,
  // van den Brekel: 10 mm, 11 mm subdigastric; necrosis of 3 mm or more only in tumorous nodes.
  // L6-3, Lydiatt: extranodal extension added to the N category.
  test('node chips', () => {
    expect(chips(study, 'nodes', subglottic).Subglottic).toBe('Pre- and paratracheal nodes: include the superior mediastinum')
    expect(chips(study, 'nodes', glottic).Glottic).toBe('Nodal metastases are rare')
    const node = (level: string, mm: string) => chips(study, 'nodes', { ...cancer, nodes: 'abnormal', 'node-level': level, 'node-size': mm }).Size
    expect(node('IIsd', '10')).toBe('Under 11 mm')
    expect(node('IIsd', '11')).toBe('At or over 11 mm')
    expect(node('III', '10')).toBe('At or over 10 mm')
    expect(node('other', '20')).toBeUndefined()
    expect(chips(study, 'nodes', { ...cancer, nodes: 'abnormal', 'node-features': ['ene'] })['Extranodal extension']).toBe('Counts in the N category (AJCC 8th)')
  })
})

describe('larynx report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...glottic, 'thyroid-depth': 'inner', 'impression-negatives': ['no-cartilage'] }).warnings)
      .toContain('Impression says no cartilage invasion, but cartilage invasion is entered.')
    expect(report(study, { ...glottic, beyond: ['strap'], 'impression-negatives': ['no-extralaryngeal'] }).warnings)
      .toContain('Impression says no spread beyond the larynx, but spread beyond the larynx is entered.')
    expect(report(study, { ...cancer, nodes: 'abnormal', 'impression-negatives': ['no-nodes'] }).warnings)
      .toContain('Impression says no abnormal lymph nodes, but an abnormal node is entered.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...glottic, spaces: ['pgs'], 'impression-negatives': ['no-cartilage', 'no-extralaryngeal', 'no-nodes'] }).warnings).toEqual([])
  })

  const cases: Values[] = [
    {},
    cancer,
    hoarse,
    { ...supraglottic, exam: 'mri', protocol: 'incomplete', 'missing-mri': ['t1'], spaces: ['pes', 'pgs', 'piriform'], cartilage: 'cricoid', 'mri-signal': 'like-tumour', t4b: ['prevertebral'], nodes: 'abnormal' },
    { ...hoarse, protocol: 'incomplete', 'missing-ct': ['mediastinum'], cords: 'paralysis', 'paralysis-side': 'Both', cause: 'found', other: 'Thyroid nodule.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('larynx quiz', () => {
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
