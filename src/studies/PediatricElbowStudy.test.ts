import { isValidElement } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { PediatricElbowStudyPage } from './PediatricElbowStudy'

const study = studyOf(PediatricElbowStudyPage)

/** The plain text of a lesson body, citations included, without rendering it. */
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

const learnText = (id: string) => textOf(study.learn.find((section) => section.id === id)?.body)
const teachText = (id: string) => textOf(study.report.steps.find((step) => step.id === id)?.teach)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md by its ID. Each claim was read
 * in an abstract or in full text (the classifications whose papers have no open copy in open
 * reviews); if a paper read later changes a claim, say in that commit why the old expectation
 * was wrong.
 */

describe('pediatric elbow lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'ossification', 'fat-pads', 'lines', 'supracondylar', 'lateral-condyle',
      'medial-epicondyle', 'radial-neck', 'other', 'impression',
    ])
  })

  // Every claim has been read (2026-10-29), so the note no longer says "Unchecked draft".
  // Gartland (Surg Gynecol Obstet 1959) and Judet (Ann Chir 1962) have no DOI on PubMed or
  // Crossref.
  test('is no longer an unchecked draft, with a DOI on every reference but Gartland and Judet', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.sourceNote).not.toMatch(/unchecked/i)
    // 17 since the open reviews (DeFroda, Álvarez Muñoz, Bašković, Colozza) were added; 21 since
    // Ramirez, Tomori, Macken and Kalbitz were added by the author's decisions of 2026-10-29.
    expect(study.references).toHaveLength(21)
    for (const ref of study.references) {
      if (/^(Gartland JJ\.|Judet J, Judet R)/.test(ref.citation)) expect(ref.doi, ref.citation).toBeUndefined()
      else expect(ref.doi, ref.citation).toMatch(/^10\./)
    }
  })
})

/** A complete normal study of a 12-year-old: every centre seen, nothing abnormal. */
const normal: Values = {
  views: 'complete',
  age: '12',
  'oc-capitellum': 'seen',
  'oc-radial-head': 'seen',
  'oc-medial-epicondyle': 'seen',
  'oc-trochlea': 'seen',
  'oc-olecranon': 'seen',
  'oc-lateral-epicondyle': 'seen',
  'anterior-fat-pad': 'normal',
  'posterior-fat-pad': 'not-seen',
  ahl: 'middle',
  rcl: 'aligned',
  supracondylar: 'none',
  'lateral-condyle': 'none',
  'me-fracture': 'none',
  'radial-neck': 'none',
  dislocation: 'none',
  olecranon: 'none',
}

const NORMAL_IMPRESSION = 'No fracture, joint effusion or malalignment; ossification centres as expected for age.'

/** A normal 4-year-old: only the capitellum and radial head expected and seen. */
const normalFour: Values = {
  ...normal,
  age: '4',
  'oc-medial-epicondyle': 'not-seen',
  'oc-trochlea': 'not-seen',
  'oc-olecranon': 'not-seen',
  'oc-lateral-epicondyle': 'not-seen',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('pediatric elbow report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items are the age, the views and one status field per structure', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual(Object.keys(normal).sort())
  })
})

describe('pediatric elbow report: whole cases', () => {
  test('normal 12-year-old: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('Age: 12 years')
    expect(text).toContain('Ossification centres: seen: capitellum, radial head, medial (internal) epicondyle, olecranon, trochlea, lateral (external) epicondyle')
  })

  test('normal 4-year-old with only the early centres: still normal', () => {
    expect(report(study, normalFour).warnings).toEqual([])
    expect(impressionOf(normalFour)).toBe(NORMAL_IMPRESSION)
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['Views', 'Age', 'Capitellum', 'Trochlea', 'Anterior fat pad', 'Posterior fat pad', 'Anterior humeral line', 'Radiocapitellar line', 'Supracondylar fracture', 'Olecranon fracture']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('partial entry: a supracondylar fracture alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { supracondylar: 'present', gartland: 'iii' })
    expect(text).toContain('Supracondylar fracture: completely displaced, no cortical contact (Gartland type III)')
    expect(text).toContain('Impression: Supracondylar fracture, Gartland type III.')
    expect(warnings).toContain('Age not stated')
    expect(warnings).not.toContain('Supracondylar fracture not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { ahl: 'middle' }).text).not.toContain('Impression')
  })

  test('incomplete views qualify the impression as limited', () => {
    expect(impressionOf({ ...normal, views: 'incomplete', 'views-missing': ['lateral'] })).toBe(`Limited study (views incomplete).\n${NORMAL_IMPRESSION}`)
  })

  test('an abnormal study lists findings in search-pattern order', () => {
    const values = { ...normal, age: '6', 'oc-trochlea': 'not-seen', 'oc-olecranon': 'not-seen', 'oc-lateral-epicondyle': 'not-seen', 'anterior-fat-pad': 'elevated', 'posterior-fat-pad': 'visible', ahl: 'anterior', supracondylar: 'present', gartland: 'ii', 'radial-neck': 'present', 'rn-angulation': '20' }
    expect(impressionOf(values)).toBe([
      'Joint effusion (elevated anterior fat pad, visible posterior fat pad).',
      'Anterior humeral line in front of the capitellum: look for a supracondylar fracture.',
      'Supracondylar fracture, Gartland type II.',
      "Radial neck fracture, O'Brien type I.",
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('pertinent negatives follow the findings', () => {
    expect(impressionOf({ ...normal, olecranon: 'present', 'impression-negatives': ['no-malalignment'] })).toBe('Olecranon fracture.\nNo malalignment.')
  })
})

describe('pediatric elbow report: variants get their own impression line', () => {
  test('a supracondylar process after a normal study', () => {
    expect(impressionOf({ ...normal, variants: ['supracondylar-process'] })).toBe(`${NORMAL_IMPRESSION}\nSupracondylar process (anatomical variant).`)
  })

  test('a supracondylar process after the findings', () => {
    expect(impressionOf({ ...normal, olecranon: 'present', variants: ['supracondylar-process'] })).toBe('Olecranon fracture.\nSupracondylar process (anatomical variant).')
  })
})

describe('pediatric elbow report: hidden fields', () => {
  test('a Gartland type left behind when the fracture is cleared writes nothing', () => {
    const values = { ...normal, supracondylar: 'none', gartland: 'iii' }
    expect(report(study, values).text).not.toContain('Gartland')
    expect(chips(study, 'supracondylar', values).Gartland).toBeUndefined()
  })

  test('lateral condyle and radial neck measurements left behind write nothing', () => {
    const values = { ...normal, 'lc-displacement': '5', 'lc-articular': 'disrupted', 'rn-angulation': '70' }
    expect(report(study, values).text).not.toMatch(/Weiss|O'Brien/)
    expect(impressionOf(values)).toBe(NORMAL_IMPRESSION)
  })

  test('an entrapment answer left behind writes nothing', () => {
    const values = { ...normal, 'me-entrapped': 'yes' }
    expect(chips(study, 'medial-epicondyle', values)['Medial epicondyle']).toBeUndefined()
    expect(report(study, values).text).not.toContain('entrapped')
  })
})

describe('pediatric elbow rules', () => {
  // PE2-1: "the capitulum first, followed by the radial head, medial epicondyle, olecranon,
  // trochlea, and last, the lateral epicondyle", with 50% of girls ossified at "ages 1, 5, 5, 9,
  // 9, and 10 years", and in boys, "with the exception of the capitulum, an average delay of 2
  // years" (Cheng 1998, abstract). The old case used the CRITOE order and 1-3-5-7-9-11 ages
  // cited to the Iyer review, whose abstract does not state them; Cheng's own series puts the
  // olecranon before the trochlea and gives later ages. Without a sex the boys' (later) ages
  // apply, the site's choice so that the warning does not fire early for a boy.
  test.each([
    ['oc-capitellum', 'Capitellum', 1, 1],
    ['oc-radial-head', 'Radial head', 5, 7],
    ['oc-medial-epicondyle', 'Medial (internal) epicondyle', 5, 7],
    ['oc-olecranon', 'Olecranon', 9, 11],
    ['oc-trochlea', 'Trochlea', 9, 11],
    ['oc-lateral-epicondyle', 'Lateral (external) epicondyle', 10, 12],
  ])('%s is expected from age %s in girls and %s in boys', (id, name, girls, boys) => {
    for (const [sex, age, group] of [['girl', girls, 'girls'], ['boy', boys, 'boys'], ['', boys, 'boys']] as const) {
      const at = (years: number) => chips(study, 'ossification', { age: String(years), sex, [id]: 'not-seen' })['Not seen, though half of children show it by now']
      expect(at(age as number), `${sex} ${age}`).toContain(name as string)
      expect(at((age as number) - 0.5) ?? '', `${sex} ${age}`).not.toContain(name as string)
      expect(chips(study, 'ossification', { age: String(age), sex })[`Seen in half of children by age ${age}`]).toContain(name as string)
      expect(report(study, { ...normal, age: String(age), sex, [id]: 'not-seen' }).warnings.join(' ')).toContain(`${name} is not seen, although half of ${group} show it by about age ${age}`)
    }
  })

  test('without an age no centre is expected', () => {
    expect(chips(study, 'ossification', { 'oc-capitellum': 'not-seen' })).toEqual({})
  })

  test('under 1 year nothing is expected yet', () => {
    expect(chips(study, 'ossification', { age: '0.5' })['Seen in half of children by age 0.5']).toBe('None yet')
  })

  // PE2-3: "an ossified trochlea with no medial epicondyle in its place should raise the
  // suspicion of an avulsed medial epicondyle displaced (entrapped) into the joint." The order
  // it rests on, medial epicondyle before trochlea, is Cheng's (abstract, quoted at PE2-1).
  test('trochlea seen without the medial epicondyle', () => {
    const values = { ...normal, 'oc-medial-epicondyle': 'not-seen' }
    expect(chips(study, 'ossification', values).Order).toBe('Trochlea without medial epicondyle: look for an entrapped medial epicondyle')
    expect(report(study, values).warnings).toContain('The trochlea is ossified but the medial epicondyle is not seen: the medial epicondyle ossifies first, so look for it displaced into the joint.')
    expect(impressionOf(values)).toBe('Ossified trochlea without a medial epicondyle in place: consider an avulsed medial epicondyle displaced into the joint.')
    // Both absent is the normal order in a young child.
    expect(chips(study, 'ossification', normalFour).Order).toBeUndefined()
  })

  // PE3-1: "An elevated anterior fat pad (sail sign) and a visible posterior fat pad indicate a
  // joint effusion."
  test('either fat pad sign means an effusion', () => {
    expect(chips(study, 'fat-pads', { 'anterior-fat-pad': 'elevated' })['Fat pads']).toBe('Joint effusion')
    expect(chips(study, 'fat-pads', { 'posterior-fat-pad': 'visible' })['Fat pads']).toBe('Joint effusion')
    expect(chips(study, 'fat-pads', { 'anterior-fat-pad': 'normal', 'posterior-fat-pad': 'not-seen' })['Fat pads']).toBeUndefined()
  })

  // PE3-2: a visible posterior fat pad with no fracture seen: "an occult fracture is likely".
  test('a visible posterior fat pad with no fracture gives the occult fracture line', () => {
    expect(impressionOf({ ...normal, 'posterior-fat-pad': 'visible' }))
      .toBe('Joint effusion (visible posterior fat pad).\nNo fracture is seen, but with a visible posterior fat pad an occult fracture is likely.')
    // Not with a fracture entered.
    expect(impressionOf({ ...normal, 'posterior-fat-pad': 'visible', 'radial-neck': 'present' })).not.toContain('occult')
    // Not while the fracture questions are unanswered.
    expect(report(study, { 'posterior-fat-pad': 'visible' }).text).not.toContain('occult')
    // Not for an elevated anterior fat pad alone.
    expect(impressionOf({ ...normal, 'anterior-fat-pad': 'elevated' })).toBe('Joint effusion (elevated anterior fat pad).')
  })

  // PE4-1: "When it is abnormal other signs of fracture should be carefully sought" (Rogers
  // 1978, abstract); "The anterior humeral line passes through the middle third of the
  // capitellum in the majority of normal children" (Herman 2009, abstract). PE4-2: "In children
  // younger than four years of age, it passes nearly equally through the anterior or middle
  // third" (Herman). The rule is unchanged; the middle-third statement is now cited to Herman,
  // who states it, rather than Rogers, and "extension" is dropped from the wording since
  // neither abstract says it. Rogers gives a lower age (2½ years); the rule keeps Herman's 4.
  test('anterior humeral line, with the age-4 boundary', () => {
    const line = (ahl: string, age: string) => chips(study, 'lines', { ahl, age })['Anterior humeral line']
    expect(line('middle', '8')).toBe('Normal')
    expect(line('anterior-third', '3.5')).toBe('Anterior third: can be normal under age 4')
    expect(line('anterior-third', '4')).toBe('Abnormal: look for a supracondylar fracture')
    expect(line('anterior', '2')).toBe('Abnormal: look for a supracondylar fracture')
    expect(line('posterior', '8')).toBe('Abnormal: look for a supracondylar fracture')
    expect(report(study, { ...normal, ahl: 'anterior-third' }).warnings).toContain('The anterior humeral line is abnormal, but no supracondylar fracture is entered.')
    expect(report(study, { ...normalFour, age: '3', ahl: 'anterior-third' }).warnings).toEqual([])
    expect(impressionOf({ ...normalFour, age: '3', ahl: 'anterior-third' })).toBe(NORMAL_IMPRESSION)
  })

  // PE4-3: a line that misses the capitellum raises the suspicion of a radial head dislocation,
  // and the ulna must be checked (Monteggia). The old case said the miss "means" a dislocation;
  // Ramirez 2014 (abstract) found that "The RCL does not invariably bisect or fall within the middle
  // third of the capitellum in normal pediatric elbows. Therefore, an abnormal RCL is suggestive
  // but not pathognomonic for injury such as Monteggia fracture" (author's decision, 2026-10-29).
  test('a disrupted radiocapitellar line raises suspicion, not proof', () => {
    expect(chips(study, 'lines', { rcl: 'disrupted' })['Radiocapitellar line']).toBe('Suspect radial head dislocation: check the ulna (Monteggia)')
    expect(report(study, { ...normal, rcl: 'disrupted' }).warnings).toContain('The radiocapitellar line misses the capitellum, which raises the suspicion of a radial head dislocation; check the ulna for a fracture (Monteggia).')
    expect(impressionOf({ ...normal, rcl: 'disrupted' })).toBe('Radiocapitellar line misses the capitellum: suspect radial head dislocation.')
    const rcl = study.report.steps.flatMap((step) => step.fields).find((field) => field.id === 'rcl')
    expect(rcl?.help).toBe('Normally through the capitellum on the AP and lateral; normal variation occurs, particularly in young children.')
  })

  test('the radiocapitellar line is not taught as invariable, and Ramirez is reported as measured', () => {
    for (const text of [learnText('lines'), teachText('lines'), textOf(study.quiz.find((q) => q.id === 'radiocapitellar')?.explanation)]) {
      expect(text).not.toMatch(/every view|is dislocated|means a radial head dislocation/)
      expect(text).toContain('Ramirez et al., J Pediatr Orthop 2014')
    }
    expect(learnText('lines')).toContain('raises the suspicion of malalignment rather than proving a dislocation')
    // 176 of 2,052 lines drawn, not 8.6% of elbows; radial neck against radial shaft, not head
    // against neck (DeFroda's account of Ramirez, quoted in the fifth check, had both wrong).
    expect(learnText('lines')).toContain('176 of the 2,052 lines drawn (8.6%)')
    expect(learnText('lines')).toContain('the most consistent was the line along the radial neck on the lateral view')
    expect(learnText('lines')).not.toMatch(/radial head rather than|8\.6% of (normal )?elbows/)
  })

  // PE5-2: "I undisplaced; II displaced with the posterior cortex intact (hinged); III completely
  // displaced, without cortical contact."
  test('Gartland types', () => {
    const gartland = (value: string) => chips(study, 'supracondylar', { supracondylar: 'present', gartland: value }).Gartland
    expect(gartland('i')).toBe('Type I')
    expect(gartland('ii')).toBe('Type II')
    expect(gartland('iii')).toBe('Type III')
  })

  // PE6-1: "I, displacement under 2 mm; II, 2 mm or more with the articular surface intact; III,
  // 2 mm or more with the articular surface disrupted." PE6-2: often not judged on radiographs.
  test('Weiss types at the 2 mm boundary', () => {
    const weiss = (mm: string, articular?: string) => chips(study, 'lateral-condyle', { 'lateral-condyle': 'present', 'lc-displacement': mm, 'lc-articular': articular })['Weiss']
    expect(weiss('1.5')).toBe('Type I')
    expect(weiss('1.5', 'disrupted')).toBe('Type I')
    expect(weiss('2', 'intact')).toBe('Type II')
    expect(weiss('2', 'disrupted')).toBe('Type III')
    expect(weiss('2', 'not-judged')).toBe('Type II or III')
    expect(weiss('2')).toBe('Type II or III')
    expect(weiss('')).toBeUndefined()
  })

  // PE6-3: Jakob stage II without "moderate", which sets no reproducible threshold (author's
  // decision, 2026-10-29): Bašković 2024, Table 3, "Complete: fracture extends to the articular
  // surface, no rotated fragment".
  test('Jakob stage II is a displaced articular fracture without rotation, not "moderate"', () => {
    expect(learnText('lateral-condyle')).toContain('stage II a displaced fracture extending through the articular surface, without rotation of the fragment')
    expect(learnText('lateral-condyle')).not.toMatch(/moderate/i)
  })

  // PE7-1: "an entrapped fragment must be named". PE7-2: no displacement threshold; radiographs
  // "are not sufficient to measure anterior displacement nor accurate enough to measure medial
  // displacement" (Edmonds 2010, abstract).
  test('an entrapped medial epicondyle', () => {
    const values = { ...normal, 'me-fracture': 'present', 'me-displacement': '12', 'me-entrapped': 'yes' }
    expect(chips(study, 'medial-epicondyle', values)['Medial epicondyle']).toBe('Entrapped in the joint')
    expect(impressionOf(values)).toBe('Medial epicondyle avulsion with the fragment entrapped in the joint.')
    // Displacement alone, however large, gives no chip.
    expect(chips(study, 'medial-epicondyle', { 'me-fracture': 'present', 'me-displacement': '15', 'me-entrapped': 'no' })).toEqual({})
  })

  // PE7-1: a dislocation sends you back to the medial epicondyle.
  test('a dislocation without a medial epicondyle avulsion is flagged', () => {
    expect(report(study, { ...normal, dislocation: 'present', 'dislocation-direction': 'posterior' }).warnings)
      .toContain('An elbow dislocation is entered: look again for a medial epicondyle avulsion, which can be entrapped in the joint.')
    expect(report(study, { ...normal, dislocation: 'present', 'me-fracture': 'present' }).warnings).toEqual([])
  })

  // PE8-3: "The majority of proximal radius fractures are radial neck fractures (89%)" (Macken
  // 2022); "the valgus force on the radius head is transmitted to the weaker physis and
  // metaphysis in the neck region" (Kalbitz 2022). Softened from "the radial neck breaks rather
  // than the head" (author's decision, 2026-10-29).
  test('radial neck rather than head, softened and cited', () => {
    const text = learnText('radial-neck')
    expect(text).toContain('proximal radial fractures usually involve the radial neck or physis rather than the articular radial head')
    expect(text).toContain('Macken et al., World J Orthop 2022')
    expect(text).toContain('Kalbitz et al., Front Pediatr 2022')
    expect(text).not.toContain('breaks rather than the head')
  })

  // PE8-1: "I, under 30°; II, 30° to 60°; III, over 60°."
  test("O'Brien types at 30° and 60°", () => {
    const obrien = (degrees: string) => chips(study, 'radial-neck', { 'radial-neck': 'present', 'rn-angulation': degrees })["O'Brien"]
    expect(obrien('29')).toBe('Type I')
    expect(obrien('30')).toBe('Type II')
    expect(obrien('60')).toBe('Type II')
    expect(obrien('61')).toBe('Type III')
  })
})

describe('pediatric elbow report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, supracondylar: 'present', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: supracondylar fracture.')
    expect(report(study, { ...normal, 'anterior-fat-pad': 'elevated', 'impression-negatives': ['no-effusion'] }).warnings)
      .toContain('Impression says no joint effusion, but these are entered: elevated anterior fat pad.')
    expect(report(study, { ...normal, dislocation: 'present', 'me-fracture': 'present', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: elbow dislocation.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-effusion', 'no-malalignment'] }).warnings).toEqual([])
  })
})

describe('pediatric elbow quiz', () => {
  test('has 8–12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const question of study.quiz) {
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0)
      expect(question.answer, question.id).toBeLessThan(question.options.length)
    }
  })
})
