import { describe, expect, test } from 'vitest'
import { aoSentence } from '../logic/aospine'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { SpineTraumaCtStudyPage } from './SpineTraumaCtStudy'

const study = studyOf(SpineTraumaCtStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md (T claims) or, for AO
 * Spine, 2026-10-23-spine-calculators-sources.md (AO claims). The references are matched and
 * all but one claim is verified there (the exact 1 cm / 40% facet boundary in AO-6); when it is
 * checked a case may have to change; say in that commit why the old expectation was wrong.
 */

describe('spine trauma CT lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'ccj', 'subaxial', 'thoracolumbar', 'vessels', 'collapse', 'canal', 'impression'])
  })

  // The references are matched (each has a DOI). One claim is still unchecked (AO-6, the exact
  // 1 cm / 40% facet boundary), so the note keeps saying so; the expanded Denver criteria (T5-1)
  // are settled (the author's decisions, 2026-10-29). Ten cited papers plus ten more: Alves 2020,
  // Wáng 2024, and for the decisions of 2026-10-29 Radcliff 2013, Woods 2018, Kopparapu 2022 (rule
  // of Spence), Brommeland 2018, Wagner 2023 (Denver), Wáng 2020 (Genant), and for their second
  // round Kim 2020 (the EAST guideline) and Turaczyk Kolodziej 2024 (the low-energy advisory).
  test('is still marked as an unchecked draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    expect(study.sourceNote).toMatch(/1 cm or 40%/)
    expect(study.sourceNote).not.toMatch(/Denver/)
    expect(study.references).toHaveLength(20)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    // T-R8: the author list was wrong after Laredo (it read Lakhdar F ... Champsaur P, Morvan G).
    expect(study.references.map((ref) => ref.citation)).toContain('Laredo JD, Lakhdari K, Bellaïche L, Hamze B, Janklewicz P, Tubiana JM. Acute vertebral collapse: CT findings in benign and malignant nontraumatic cases. Radiology. 1995;194(1):41-48.')
  })
})

/** A complete normal whole-spine study. */
const normal: Values = {
  history: 'high',
  coverage: 'whole',
  protocol: 'complete',
  ankylosis: 'none',
  condyle: 'none',
  c1: 'none',
  dens: 'none',
  c2: 'none',
  cx: 'none',
  tl: 'none',
  foramen: 'no',
  collapse: 'none',
  canal: 'normal',
}

const cervicalOnly = ['condyle', 'c1', 'dens', 'c2', 'cx', 'foramen']

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('spine trauma CT report: steps and coverage', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items are one status field per structure', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual(Object.keys(normal).sort())
  })

  test('coverage decides which regions are asked for', () => {
    const tlOnly = Object.fromEntries(Object.entries(normal).filter(([key]) => !cervicalOnly.includes(key)))
    const lumbar = { ...tlOnly, coverage: 'thoracolumbar' }
    expect(report(study, lumbar).warnings).toEqual([])
    expect(impressionOf(lumbar)).toBe('No acute fracture or malalignment of the thoracolumbar spine.')
    const neck = { ...normal, coverage: 'cervical', tl: '' }
    expect(report(study, neck).warnings).toEqual([])
    expect(impressionOf(neck)).toBe('No acute fracture or malalignment of the cervical spine.')
    // Cervical answers left behind after switching to thoracolumbar write nothing.
    expect(report(study, { ...lumbar, c1: 'present', bdi: '12' }).text).not.toMatch(/C1|Basion/)
  })
})

describe('spine trauma CT report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe('No acute fracture or malalignment of the spine.')
    expect(text).toContain('Subaxial cervical spine: no injury')
    expect(text).toContain('Thoracolumbar spine: no injury')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['History', 'Coverage', 'Protocol', 'Ankylosed spine', 'Vertebral collapse without major trauma', 'Spinal canal']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('an injured spine lists its findings from the top down', () => {
    const values = {
      ...normal,
      dens: 'II',
      cx: 'present', 'cx-level': 'C5–C6', 'cx-type': 'B2', 'cx-body': 'A1', 'cx-facet-right': 'F2', 'cx-facet-left': 'F2',
      tl: 'present', 'tl-level': 'L1', 'tl-type': 'A3',
      canal: 'narrowed', 'canal-text': '30% at L1',
    }
    expect(impressionOf(values)).toBe([
      "Odontoid fracture, Anderson and D'Alonzo type II.",
      aoSentence({ region: 'subaxial', morphology: { type: 'B2', body: 'A1' }, facet: 'F2 BL', modifiers: [] }, 'C5–C6'),
      'Meets the expanded Denver screening criteria for blunt cerebrovascular injury (odontoid fracture, subaxial cervical injury at C5–C6).',
      aoSentence({ region: 'thoracolumbar', morphology: { type: 'A3' }, modifiers: [] }, 'L1'),
      'Spinal canal narrowed: 30% at L1.',
    ].join('\n'))
  })

  test('an injury with no type yet still gets a line', () => {
    expect(impressionOf({ ...normal, tl: 'present', 'tl-level': 'T12' })).toBe('Thoracolumbar spine injury at T12.')
  })

  test('a body type left behind on an A injury is dropped', () => {
    expect(impressionOf({ ...normal, tl: 'present', 'tl-type': 'A1', 'tl-body': 'A4' })).toBe(aoSentence({ region: 'thoracolumbar', morphology: { type: 'A1' }, modifiers: [] }))
  })
})

describe('spine trauma CT rules (unchecked)', () => {
  // T2-1: "Ninety-five percent of the population was found to have a BDI less than 8.5 mm" and
  // "an ADI less than 2 mm" (Rojas 2007, abstract); Table 1 gives the normal values as "<8.5"
  // and "<2.0", against measured ranges of 1.4-9.1 and 0.5-2.4 mm. The old cases read them as
  // maxima ("at most"), so a value of exactly 8.5 or 2 mm was within; the paper's normal is
  // strictly less, so it is now outside.
  test('basion–dens under 8.5 mm and atlantodental under 2 mm', () => {
    expect(chips(study, 'ccj', { coverage: 'cervical', bdi: '8.4' })['Basion–dens']).toBe('Under 8.5 mm')
    expect(chips(study, 'ccj', { coverage: 'cervical', bdi: '8.5' })['Basion–dens']).toBe('8.5 mm or more')
    expect(chips(study, 'ccj', { coverage: 'cervical', adi: '1.9' }).Atlantodental).toBe('Under 2 mm')
    expect(chips(study, 'ccj', { coverage: 'cervical', adi: '2' }).Atlantodental).toBe('2 mm or more')
    expect(impressionOf({ ...normal, bdi: '10', adi: '3' })).toBe('Basion–dens interval 10 mm; on CT, normal is less than 8.5 mm.\nAtlantodental interval 3 mm; in adults on CT, normal is less than 2 mm.')
    expect(impressionOf({ ...normal, bdi: '8.5' })).toBe('Basion–dens interval 8.5 mm; on CT, normal is less than 8.5 mm.')
    expect(impressionOf({ ...normal, bdi: '8', adi: '1' })).toBe('No acute fracture or malalignment of the spine.')
  })

  // T2-2: Spence 1970: "if the lateral mass displacement is greater than 6.9 millimeters, the
  // transverse ligament probably is torn", and "a high probability that the ligament is intact if
  // spread of the lateral mass is less than 5.7 millimeters". T2-3: the rule misses ruptures MRI
  // shows. The author's decisions of 2026-10-29 (28, 29): the rule is cadaver-derived and was
  // applied to radiographs; on CT the overhang did not correlate with the ligament (Radcliff 2013),
  // and "LMD is not a reliable independent indicator for TAL failure" (Woods 2018). The chip above
  // 6.9 mm said "suggests rupture" as if the rule were a CT test; it now says it is not a reliable
  // test on its own. No value, however small, reads as an intact ligament.
  test('C1 lateral mass overhang at 6.9 mm, and never "intact" below 5.7 mm', () => {
    const overhang = (mm: string) => chips(study, 'ccj', { coverage: 'cervical', c1: 'present', 'c1-overhang': mm })['Transverse ligament']
    expect(overhang('7')).toBe('Overhang above 6.9 mm: suggests disruption by the rule of Spence, not a reliable test on its own; MRI shows the ligament')
    expect(overhang('6.9')).toBe('Overhang within 6.9 mm: does not exclude a ligament injury; MRI shows the ligament')
    expect(overhang('5')).toBe('Overhang within 6.9 mm: does not exclude a ligament injury; MRI shows the ligament')
    for (const mm of ['0', '3', '5.6', '5.7', '6']) expect(overhang(mm)).not.toMatch(/intact|reassur/i)
    expect(impressionOf({ ...normal, c1: 'present', 'c1-overhang': '8' }).split('\n')[0]).toBe('C1 fracture, with combined lateral mass overhang of 8 mm, above the 6.9 mm of the rule of Spence; the overhang does not reliably establish transverse ligament injury, which MRI shows directly.')
    expect(impressionOf({ ...normal, c1: 'present', 'c1-overhang': '4' })).not.toMatch(/intact|reassur/i)
  })

  // T5-1, the author's decision of 2026-10-29 (30): the expanded Denver risk factor is "Cervical
  // spine fracture, subluxation or ligamentous injury at any level" (Brommeland 2018, Table 3;
  // Wagner 2023, Table 1), in "trauma patients with signs or symptoms of BCVI or a high-energy
  // trauma mechanism with one or more of the risk factors" (Brommeland). The form used the older,
  // more selective list (subluxation, foramen, C1–C3) and could not see C3, so a subaxial A1
  // fracture, at C3 or anywhere, raised nothing; now any cervical injury does, with a high-energy
  // mechanism.
  test('vertebral artery screening criteria', () => {
    const vessels = (values: Values) => chips(study, 'vessels', values)['Vertebral arteries']
    expect(vessels({ ...normal, foramen: 'yes' })).toBe('Expanded Denver screening criterion met: fracture into a foramen transversarium')
    expect(vessels({ ...normal, c1: 'present' })).toBe('Expanded Denver screening criterion met: C1 fracture')
    expect(vessels({ ...normal, dens: 'II', c2: 'present' })).toBe('Expanded Denver screening criterion met: odontoid fracture, C2 fracture')
    expect(vessels({ ...normal, cx: 'present', 'cx-level': 'C3', 'cx-type': 'A1' })).toBe('Expanded Denver screening criterion met: subaxial cervical injury at C3')
    expect(vessels({ ...normal, cx: 'present', 'cx-level': 'C6', 'cx-type': 'A0' })).toBe('Expanded Denver screening criterion met: subaxial cervical injury at C6')
    expect(vessels({ ...normal, cx: 'present', 'cx-facet-left': 'F4' })).toBe('Expanded Denver screening criterion met: subaxial cervical injury')
    expect(vessels({ ...normal, cx: 'present', 'cx-level': 'C5–C6', 'cx-type': 'B2' })).toBe('Expanded Denver screening criterion met: subaxial cervical injury at C5–C6')
    expect(impressionOf({ ...normal, cx: 'present', 'cx-level': 'C3', 'cx-type': 'A1' }).split('\n')[1]).toBe('Meets the expanded Denver screening criteria for blunt cerebrovascular injury (subaxial cervical injury at C3).')
    expect(vessels({ ...normal, tl: 'present', 'tl-type': 'A1' })).toBeUndefined()
    expect(vessels(normal)).toBeUndefined()
  })

  // The author's decision B, 2026-10-29 (second round): keep the criterion as Brommeland's Table 3
  // has it ("Risk factors for BVCI (High-energy transfer mechanism with): ..."), but after a
  // low-energy injury give a separate advisory, so the output cannot be read as "CT angiography not
  // indicated". It said "C1 fracture: a screening criterion with a high-energy mechanism" and the
  // impression said nothing. EAST (Kim 2020, abstract): "For patients with low-risk risk cervical
  // injuries, we conditionally recommend performing a computed tomography angiography to detect
  // BCVI"; Turaczyk Kolodziej 2024 (abstract): "BCVI rates were similar between HEMI and LEMI
  // groups when screening based on cervical spine fractures."
  test('Denver by mechanism: high-energy meets the criterion', () => {
    const vessels = (values: Values) => chips(study, 'vessels', values)['Vertebral arteries']
    expect(vessels({ ...normal, history: 'high', c1: 'present' })).toBe('Expanded Denver screening criterion met: C1 fracture')
    expect(impressionOf({ ...normal, history: 'high', c1: 'present' })).toBe('C1 fracture.\nMeets the expanded Denver screening criteria for blunt cerebrovascular injury (C1 fracture).')
  })

  test('Denver by mechanism: low-energy gives an advisory, never "criterion met" and never silence', () => {
    const vessels = (values: Values) => chips(study, 'vessels', values)['Vertebral arteries']
    const low = { ...normal, history: 'low', cx: 'present', 'cx-level': 'C3', 'cx-type': 'A1' }
    expect(vessels(low)).toBe('Cervical injury associated with BCVI risk; consider CTA according to injury pattern and local trauma protocol (subaxial cervical injury at C3)')
    expect(vessels(low)).not.toMatch(/criterion met|not indicated|not met/i)
    const impression = impressionOf(low)
    expect(impression.split('\n')[1]).toBe('Cervical injury associated with blunt cerebrovascular injury risk (subaxial cervical injury at C3); consider CT angiography according to injury pattern and local trauma protocol.')
    expect(impression).not.toMatch(/Meets the expanded Denver/)
  })

  // The site's safeguard (decision B), not a quoted rule: an unknown or undocumented mechanism is
  // not read as low energy. "Pain, no injury given" and no answer count as unknown.
  test('Denver by mechanism: unknown or not documented cannot be assessed', () => {
    const vessels = (values: Values) => chips(study, 'vessels', values)['Vertebral arteries']
    for (const history of ['unknown', 'pain', '']) {
      const values = { ...normal, history, c1: 'present' }
      expect(vessels(values), history).toBe('Expanded Denver mechanism requirement cannot be assessed: C1 fracture')
      expect(impressionOf(values), history).not.toMatch(/Meets the expanded Denver|consider CT angiography/)
    }
    expect(impressionOf({ ...normal, history: 'unknown', c1: 'present' })).toBe('C1 fracture.\nCervical injury (C1 fracture); the mechanism requirement of the expanded Denver screening criteria for blunt cerebrovascular injury cannot be assessed from the history given.')
    expect(report(study, { ...normal, history: 'unknown' }).text).toContain('History: injury, mechanism unknown or not documented')
  })

  // The nontraumatic finding the form records (vertebral collapse without major trauma) raises no
  // Denver output; the form has no chronic or nontraumatic qualifier for the cervical items.
  test('Denver: a nontraumatic collapse alone raises nothing', () => {
    const values = { ...normal, history: 'pain', collapse: 'present', 'collapse-level': 'C5', 'height-loss': '30' }
    expect(chips(study, 'vessels', values)['Vertebral arteries']).toBeUndefined()
    expect(impressionOf(values)).not.toMatch(/Denver|angiography/)
  })

  // The author's decision D, 2026-10-29: Brommeland 2018, Table 3, and Wagner 2023, Table 1, list
  // "Complex skull fracture/basilar skull fracture/occipital condyle fracture" with the high-energy
  // risk factors. The form asked about a condyle fracture but did not count it; it now does, with
  // the same mechanism handling.
  test('occipital condyle fracture as a Denver item, by mechanism', () => {
    const vessels = (values: Values) => chips(study, 'vessels', values)['Vertebral arteries']
    const condyle = { ...normal, condyle: 'present', 'condyle-side': 'left' }
    expect(vessels({ ...condyle, history: 'high' })).toBe('Expanded Denver screening criterion met: occipital condyle fracture')
    expect(impressionOf({ ...condyle, history: 'high' })).toBe('Left occipital condyle fracture.\nMeets the expanded Denver screening criteria for blunt cerebrovascular injury (occipital condyle fracture).')
    expect(vessels({ ...condyle, history: 'low' })).toBe('Craniocervical injury associated with BCVI risk; consider CTA according to injury pattern and local trauma protocol (occipital condyle fracture)')
    // A condyle fracture is a skull base fracture, so the advisory says craniocervical (2026-10-29).
    expect(impressionOf({ ...condyle, history: 'low' }).split('\n')[1]).toMatch(/^Craniocervical injury associated with blunt cerebrovascular injury risk \(occipital condyle fracture\)/)
    expect(impressionOf({ ...condyle, history: 'unknown' }).split('\n')[1]).toMatch(/^Craniocervical injury \(occipital condyle fracture\)/)
    expect(vessels({ ...condyle, history: 'unknown' })).toBe('Expanded Denver mechanism requirement cannot be assessed: occipital condyle fracture')
    expect(vessels({ ...condyle, history: 'pain' })).toBe('Expanded Denver mechanism requirement cannot be assessed: occipital condyle fracture')
    expect(report(study, condyle).text).toContain('Occipital condyle fracture: left')
    expect(report(study, { ...normal, condyle: 'present' }).text).toContain('Occipital condyle fracture: present')
    expect(impressionOf({ ...normal, condyle: 'present', 'condyle-side': 'bilateral' }).split('\n')[0]).toBe('Bilateral occipital condyle fractures.')
    expect(report(study, normal).text).toContain('Occipital condyle fracture: none')
  })

  // AO-1 to AO-7 via the shared logic, and AO-10: the ankylosed spine modifier by region.
  test('AO Spine chips and the ankylosed spine modifier', () => {
    expect(chips(study, 'subaxial', { ...normal, cx: 'present', 'cx-type': 'C', 'cx-body': 'A4', 'cx-facet-right': 'F4', 'cx-facet-left': 'F4' })['AO Spine']).toBe('C (A4, F4 BL)')
    expect(chips(study, 'subaxial', { ...normal, ankylosis: 'as', cx: 'present', 'cx-type': 'B3' })['Ankylosed spine']).toBe('Modifier M3; fractures here often follow minor trauma')
    expect(chips(study, 'thoracolumbar', { ...normal, ankylosis: 'dish', tl: 'present', 'tl-type': 'B3' })['Ankylosed spine']).toBe('Modifier M2; fractures here often follow minor trauma')
    expect(impressionOf({ ...normal, ankylosis: 'dish', tl: 'present', 'tl-level': 'T10', 'tl-type': 'B3' }))
      .toBe(aoSentence({ region: 'thoracolumbar', morphology: { type: 'B3' }, modifiers: ['M2'] }, 'T10'))
  })

  // T6-1: "Grade 1 about 20–25%, grade 2 about 25–40%, grade 3 more than 40%." The author's
  // decision of 2026-10-29 (32): exactly 40% stays grade 2. Wáng 2020, Table 1: grade 2 ">25–1/3"
  // and ">1/3–40%", grade 3 ">40%".
  test('Genant grade at 20, 25 and 40%', () => {
    const genant = (pct: string) => chips(study, 'collapse', { collapse: 'present', 'height-loss': pct }).Genant
    expect(genant('19')).toBe('Under 20%: below grade 1')
    expect(genant('20')).toBe('Grade 1')
    expect(genant('25')).toBe('Grade 1')
    expect(genant('26')).toBe('Grade 2')
    expect(genant('40')).toBe('Grade 2')
    expect(genant('41')).toBe('Grade 3')
  })

  // T6-2: "The following CT findings were significantly more frequent in benign AVCs" and "...
  // significantly more frequent in malignant AVCs" (Laredo 1995, abstract). The old chips called
  // them "features of" benign or malignant collapse, as if each settled it; the paper reports
  // differences in frequency, so the wording now says so. The rule itself is unchanged.
  test('benign against malignant collapse', () => {
    const collapse = { ...normal, history: 'pain', collapse: 'present', 'collapse-level': 'T12', 'height-loss': '30' }
    expect(chips(study, 'collapse', { ...collapse, 'collapse-features': ['retropulsion'] }).Collapse).toBe('Findings more frequent in benign (osteoporotic) collapse')
    expect(chips(study, 'collapse', { ...collapse, 'collapse-features': ['retropulsion', 'pedicle'] }).Collapse).toBe('Findings more frequent in malignant collapse')
    expect(impressionOf({ ...collapse, 'collapse-features': ['epidural'] })).toBe('Vertebral collapse of T12, Genant grade 2 (30% height loss), with findings more frequent in malignant collapse.')
    expect(impressionOf({ ...collapse, 'height-loss': '15' })).toBe('Vertebral collapse of T12.')
  })
})

describe('spine trauma CT report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, dens: 'III', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: odontoid fracture.')
    expect(report(study, { ...normal, cx: 'present', 'cx-facet-right': 'F4', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: F4 facet.')
    expect(report(study, { ...normal, adi: '4', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: atlantodental interval 2 mm or more.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-malalignment'] }).warnings).toEqual([])
  })

  const cases: Values[] = [
    {},
    normal,
    { ...normal, protocol: 'incomplete', 'protocol-missing': ['soft'], condyle: 'present', c1: 'present', c2: 'present', 'c2-text': 'pars', prevertebral: 'swollen' },
    { ...normal, cx: 'present', tl: 'present', collapse: 'present', 'collapse-features': ['lines'], canal: 'narrowed', other: 'Rib fractures.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('spine trauma CT quiz', () => {
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
