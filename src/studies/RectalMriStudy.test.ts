import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { RectalMriStudyPage } from './RectalMriStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. Quote the lesson sentence the case comes from.
 */
const study = studyOf(RectalMriStudyPage)

/** A complete early case: mrT1–2 N0, MRF clear, EMVI absent. Other cases change parts of it. */
const early: Values = {
  sigmoid: 'no',
  height: '10',
  landmark: 'av',
  length: '3',
  clock: '2 to 5 o\'clock',
  reflection: 'below',
  morphology: 'polypoid',
  mucinous: 'no',
  muscle: 'intact',
  t4: 'none',
  'mrf-dist': '8',
  'mrf-clock': '3 o\'clock',
  'mrf-cause': 'tumor',
  mrf: 'clear',
  emvi: 'absent',
  'node-size': '3',
  'node-features': [],
  'n-conf': 'n0',
  deposits: 'absent',
  lateral: 'no',
  anal: 'no',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('rectal MRI: T3 substage from extramural depth', () => {
  // "T3a under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm."
  it.each([
    ['0.9', 'mrT3a'],
    ['1', 'mrT3b'],
    ['5', 'mrT3b'],
    ['5.1', 'mrT3c'],
    ['15', 'mrT3c'],
    ['15.1', 'mrT3d'],
  ])('%s mm is %s', (depth, stage) => {
    expect(chips(study, 't-stage', { muscle: 'breach', emd: depth })['T category']).toBe(stage)
  })

  // "More than 5 mm usually means pre-op treatment."
  it('5 mm does not flag pre-op treatment', () => {
    expect(chips(study, 't-stage', { muscle: 'breach', emd: '5' })['Depth > 5 mm']).toBeUndefined()
  })
  it('5.1 mm flags pre-op treatment', () => {
    expect(chips(study, 't-stage', { muscle: 'breach', emd: '5.1' })['Depth > 5 mm']).toBe('Usually means pre-op treatment')
  })
})

describe('rectal MRI: T category from the muscle line and T4', () => {
  // "Line intact: T1 or T2. MRI cannot reliably separate the two, so report "T1–2.""
  it('an intact line is mrT1–2', () => {
    expect(chips(study, 't-stage', { muscle: 'intact' })['T category']).toBe('mrT1–2')
  })
  // "Thin spiky strands alone are usually just scarring."
  it('thin spiky strands alone stay mrT1–2', () => {
    const c = chips(study, 't-stage', { muscle: 'strands' })
    expect(c['T category']).toBe('mrT1–2')
    expect(c['Strands alone']).toBe('Usually just scarring')
  })
  // "Broad or nodular front into fat: T3."
  it('a breach with no depth yet is mrT3', () => {
    expect(chips(study, 't-stage', { muscle: 'breach' })['T category']).toBe('mrT3')
  })
  // "T4a: reaches the peritoneal reflection. T4b: invades an organ or skeletal muscle."
  it('T4a and T4b override the extramural depth', () => {
    expect(chips(study, 't-stage', { muscle: 'breach', emd: '3', t4: 't4a' })['T category']).toBe('mrT4a')
    expect(chips(study, 't-stage', { muscle: 'breach', emd: '3', t4: 't4b' })['T category']).toBe('mrT4b')
  })
  it('a depth typed and then hidden by an intact line does not reach the report', () => {
    const { text } = report(study, { ...early, emd: '6' })
    expect(text).toContain('T category: T1–2')
    expect(text).not.toContain('extramural depth')
  })
})

describe('rectal MRI: mesorectal fascia', () => {
  // "1 mm or less means involved."
  it('1 mm is involved', () => {
    expect(chips(study, 'mrf', { 'mrf-dist': '1' })['MRF by distance']).toMatch(/^Involved/)
  })
  it('1.1 mm is clear', () => {
    expect(chips(study, 'mrf', { 'mrf-dist': '1.1' })['MRF by distance']).toMatch(/^Clear/)
  })
  // "The old "threatened, 1–2 mm" category was dropped."
  it('1.5 mm is clear, not threatened', () => {
    expect(chips(study, 'mrf', { 'mrf-dist': '1.5' })['MRF by distance']).toBe('Clear (more than 1 mm)')
  })
  it('the impression falls back to the distance when MRF status is not chosen', () => {
    expect(impressionOf({ ...early, mrf: undefined, 'mrf-dist': '1' })).toContain('MRF +')
    expect(impressionOf({ ...early, mrf: undefined, 'mrf-dist': '1.1' })).toContain('MRF -')
  })
})

describe('rectal MRI: EMVI', () => {
  // "EMVI predicts distant metastases."
  it('present EMVI is flagged', () => {
    expect(chips(study, 'emvi', { emvi: 'present' }).EMVI).toBe('Predicts distant metastases')
    expect(chips(study, 'emvi', { emvi: 'absent' }).EMVI).toBeUndefined()
  })
})

describe('rectal MRI: mesorectal nodes (ESGAR)', () => {
  // "Short axis 9 mm or more: suspicious. 5 mm to under 9 mm (so 8.5 mm counts here): needs
  // two bad features (round, irregular border, mixed signal). Under 5 mm: needs all three."
  const node = (size: string, features: string[]) =>
    chips(study, 'nodes', { 'node-size': size, 'node-features': features })['Mesorectal node (ESGAR)']
  it.each([
    ['9', [], 'Suspicious'],
    ['8.9', ['round'], 'Criteria not met'],
    ['8.9', ['round', 'irregular'], 'Suspicious'],
    ['8.5', ['round', 'mixed'], 'Suspicious'],
    ['5', ['round', 'irregular'], 'Suspicious'],
    ['5', ['round'], 'Criteria not met'],
    ['4.9', ['round', 'irregular'], 'Criteria not met'],
    ['4.9', ['round', 'irregular', 'mixed'], 'Suspicious'],
  ])('%s mm with %j is %s', (size, features, expected) => {
    expect(node(size, features)).toBe(expected)
  })
})

describe('rectal MRI: lateral and distant nodes', () => {
  // "Lateral nodes (obturator, internal iliac): a short axis of 7 mm or more is suspicious."
  it('7 mm lateral node is suspicious', () => {
    expect(chips(study, 'nodes', { lateral: 'yes', 'lat-size': '7' })['Lateral node']).toBe('Suspicious (7 mm or more)')
    expect(impressionOf({ ...early, lateral: 'yes', 'lat-side': 'left', 'lat-site': 'obturator', 'lat-size': '7' })).toContain('Suspicious lateral node (7 mm short axis).')
  })
  it('6.9 mm lateral node is not', () => {
    expect(chips(study, 'nodes', { lateral: 'yes', 'lat-size': '6.9' })['Lateral node']).toBe('Under 7 mm')
    expect(impressionOf({ ...early, lateral: 'yes', 'lat-size': '6.9' })).not.toContain('lateral node')
  })
  // "Common and external iliac nodes and inguinal nodes (unless the tumor reaches the anal
  // canal) count as M1, not N."
  it('common and external iliac nodes are M1', () => {
    expect(chips(study, 'nodes', { 'distant-nodes': ['common'] })['Outside the field']).toBe('M1, not N')
    expect(impressionOf({ ...early, 'distant-nodes': ['external'] })).toContain('Suspicious external iliac node(s): M1, not N.')
  })
  it('inguinal nodes are M1 when the tumor does not reach the anal canal', () => {
    expect(chips(study, 'nodes', { 'distant-nodes': ['inguinal'], anal: 'no' })['Outside the field']).toBe('M1, not N')
  })
  it('inguinal nodes are not M1 when the tumor reaches the anal canal', () => {
    const c = chips(study, 'nodes', { 'distant-nodes': ['inguinal'], anal: 'yes' })
    expect(c['Outside the field']).toBeUndefined()
    expect(c.Inguinal).toBe('Not M1: tumor reaches anal canal')
    expect(impressionOf({ ...early, 'distant-nodes': ['inguinal'], anal: 'yes' })).not.toContain('M1')
  })
})

describe('rectal MRI: location and low tumors', () => {
  // "A tumor starting above that is a sigmoid cancer."
  it('above the sigmoid take-off is a sigmoid cancer', () => {
    expect(chips(study, 'height', { sigmoid: 'yes' }).Site).toBe('Sigmoid cancer, not rectal')
    expect(impressionOf({ ...early, sigmoid: 'yes' })).toContain('sigmoid cancer')
  })
  // "A very bright tumor is mucinous. Say so in the report, because mucinous tumors respond worse to treatment."
  it('a mucinous tumor is said in the impression', () => {
    expect(chips(study, 'height', { mucinous: 'yes' }).Mucinous).toBe('Responds worse to treatment')
    expect(impressionOf({ ...early, mucinous: 'yes' })).toContain('Mucinous tumor.')
  })
  // "Add "anal+" if the anal canal is involved."
  it('anal canal involvement adds anal+', () => {
    expect(chips(study, 'low', { anal: 'yes' })['Anal canal']).toBe('anal+')
    expect(impressionOf({ ...early, anal: 'yes' })).toContain('anal+')
    expect(impressionOf(early)).not.toContain('anal+')
  })
  // "T4b: invades an organ or skeletal muscle (levator, puborectalis, external sphincter)."
  it('external sphincter or levator is T4b', () => {
    expect(chips(study, 'low', { layers: ['es'] })['Skeletal muscle']).toBe('T4b')
    expect(chips(study, 'low', { layers: ['levator'] })['Skeletal muscle']).toBe('T4b')
    expect(chips(study, 'low', { layers: ['is', 'ias'] })['Skeletal muscle']).toBeUndefined()
  })
})

describe('rectal MRI: whole cases', () => {
  it('early tumor: mrT1–2 N0, MRF clear, EMVI negative', () => {
    const { text, warnings } = report(study, early)
    expect(text).toContain('Impression: mrT1–2 N0, MRF -, EMVI -')
    expect(text).toContain('Location: 10 cm from anal verge; length 3 cm')
    expect(text).toContain('Sphincter/anal canal: not involved')
    expect(warnings).toEqual([])
  })

  it('typical locally advanced tumor: mrT3c, possibly N+, MRF clear, EMVI positive', () => {
    const values = { ...early, muscle: 'breach', emd: '7', 'mrf-dist': '4', emvi: 'present', 'node-size': '6', 'node-features': ['round', 'irregular'], 'n-conf': 'possible' }
    const { text, warnings } = report(study, values)
    expect(text).toContain('T category: T3c; extramural depth 7 mm')
    expect(text).toContain('Impression: mrT3c possibly N+, MRF -, EMVI +')
    expect(warnings).toEqual([])
  })

  it('threatening tumor: mrT3d N+, MRF involved by EMVI, deposits', () => {
    const values = { ...early, muscle: 'breach', emd: '16', 'mrf-dist': '0.5', 'mrf-cause': 'emvi', mrf: 'involved', emvi: 'present', 'node-size': '10', 'n-conf': 'npos', deposits: 'present', 'deposit-text': 'two, left mesorectum' }
    const { text } = report(study, values)
    expect(text).toContain('MRF: involved; shortest distance 0.5 mm at 3 o\'clock, due to EMVI')
    expect(text).toContain('Impression: mrT3d N+, MRF +, EMVI +')
    expect(text).toContain('Tumor deposits present.')
  })

  it('low T4b tumor into the levator, anal+, with an M1 external iliac node', () => {
    const values = { ...early, height: '3', muscle: 'breach', emd: '12', t4: 't4b', 't4-organ': 'levator', 'mrf-dist': '0', mrf: 'involved', emvi: 'present', 'n-conf': 'npos', anal: 'yes', layers: ['is', 'ias', 'levator'], 'distant-nodes': ['external'] }
    const { text, warnings } = report(study, values)
    expect(text).toContain('T category: T4b (levator); extramural depth 12 mm')
    expect(text).toContain('Impression: mrT4b N+, MRF +, EMVI +, anal+')
    expect(text).toContain('Suspicious external iliac node(s): M1, not N.')
    expect(warnings).toEqual([])
  })
})

describe('rectal MRI: required items and contradictions', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { warnings } = report(study)
    for (const label of [
      'Height to lower edge of tumor',
      'Measured from',
      'Tumor length',
      'Clock position',
      'Anterior peritoneal reflection',
      'Dark muscle line',
      'Shortest distance to MRF',
      'At clock position',
      'MRF',
      'EMVI',
      'Node call',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
    // Extramural depth only applies once the muscle line is breached.
    expect(warnings).not.toContain('Extramural depth beyond the muscle not stated')
    expect(report(study, { muscle: 'breach' }).warnings).toContain('Extramural depth beyond the muscle not stated')
  })

  it('the empty form says where to start', () => {
    expect(report(study).text).toBe('Start with Step 1 to build the report.')
  })

  // "1 mm or less means involved."
  it('warns when MRF is marked clear at 1 mm', () => {
    expect(report(study, { ...early, 'mrf-dist': '1', mrf: 'clear' }).warnings).toContain('MRF marked clear but the shortest distance is 1 mm (1 mm or less means involved).')
  })
  it('warns when MRF is marked involved at 1.1 mm', () => {
    expect(report(study, { ...early, 'mrf-dist': '1.1', mrf: 'involved' }).warnings).toContain('MRF marked involved but the shortest distance is 1.1 mm (more than 1 mm).')
  })
  it('warns when the external sphincter is involved without T4b', () => {
    expect(report(study, { ...early, layers: ['es'] }).warnings).toContain('External sphincter or levator involved: that is T4b (skeletal muscle), but T4b is not selected.')
  })
  it('warns when a node meets the ESGAR rule but the call is cN0', () => {
    expect(report(study, { ...early, 'node-size': '9' }).warnings).toContain('The most suspicious mesorectal node meets the ESGAR size/feature rule, but the node call is cN0.')
    expect(report(study, { ...early, 'node-size': '8.9' }).warnings).toEqual([])
  })
  it('warns when T4a is chosen for a tumor below the reflection', () => {
    expect(report(study, { ...early, t4: 't4a' }).warnings).toContain('T4a (reaches the peritoneal reflection) selected, but the tumor is marked below the reflection.')
  })
})

describe('rectal MRI: output text', () => {
  const cases: Values[] = [
    {},
    early,
    { muscle: 'breach', emd: '6', 'mrf-dist': '0.5' },
    { height: '5' },
    { ...early, lateral: 'yes' },
    { ...early, muscle: 'breach', t4: 't4b', 'distant-nodes': ['common', 'inguinal'], layers: ['levator'], lowest: 'upper anal canal' },
  ]
  it.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})
