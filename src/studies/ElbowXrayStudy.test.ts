import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { ElbowXrayStudyPage } from './ElbowXrayStudy'

const study = studyOf(ElbowXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-elbow-xray-sources.md (EX claims), each read in its paper's
 * abstract or open full text before it went in. The radial head cases go through the Mason
 * calculator's logic (src/logic/mason.ts), pinned on its own in src/logic/mason.test.ts. If a case
 * has to change, say in that commit why the old expectation was wrong.
 */

describe('elbow X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['history', 'views', 'alignment', 'bones', 'soft-tissues', 'impression'])
  })

  // Every reference is matched and every claim read, so the note is not marked as a draft. Johnston
  // (1962) has no DOI, as on the Mason calculator.
  test('is not marked as a draft, with a DOI on every reference but Johnston', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.references).toHaveLength(35)
    const withoutDoi = study.references.filter((ref) => !ref.doi)
    expect(withoutDoi.map((ref) => ref.citation.split('.')[0])).toEqual(['Johnston GW'])
    for (const ref of study.references) if (ref.doi) expect(ref.doi, ref.citation).toMatch(/^10\./)
    const dois = study.references.flatMap((ref) => (ref.doi ? [ref.doi] : []))
    expect(new Set(dois).size).toBe(dois.length)
  })
})

/** First films after a fall, nothing found. */
const normal: Values = {
  history: 'injury', mechanism: 'foosh', extension: 'full', views: 'complete',
  ahl: 'middle', rcl: 'aligned', ulnohumeral: 'congruent',
  'radial-head': 'none', coronoid: 'none', olecranon: 'none', 'distal-humerus': 'none',
  'anterior-fat-pad': 'normal', 'posterior-fat-pad': 'not-seen',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('elbow X-ray report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items', () => {
    expect(report(study, normal).warnings).toEqual([])
    expect(report(study).warnings).toEqual([
      'Clinical setting not stated', 'Views not stated', 'Anterior humeral line not stated', 'Radiocapitellar line not stated',
      'Ulnohumeral joint not stated', 'Radial head fracture not stated', 'Coronoid fracture not stated', 'Olecranon fracture not stated',
      'Distal humerus fracture not stated', 'Anterior fat pad not stated', 'Posterior fat pad not stated',
    ])
    expect(report(study, { ...normal, 'radial-head': 'present' }).warnings).toEqual(['Radial head fracture pattern not stated'])
  })
})

describe('elbow X-ray report: whole cases', () => {
  test('a normal study', () => {
    const text = report(study, normal).text
    expect(text).toContain('Clinical: injury, first films; fall on the outstretched hand; full extension')
    expect(text).toContain('Views: AP and true lateral')
    expect(impressionOf(normal)).toBe('No fracture, joint effusion or malalignment.')
  })

  test('a Mason type II fracture with an effusion', () => {
    const values = { ...normal, 'radial-head': 'present', 'radial-head-pattern': 'displaced', 'radial-head-displacement': '3', 'radial-head-percent': '40', 'anterior-fat-pad': 'elevated', 'posterior-fat-pad': 'visible' }
    expect(report(study, values).text).toContain('Radial head: radial head fracture, Mason type II: marginal sector fracture with displacement; displaced 3 mm; 40% of the articular surface')
    expect(impressionOf(values)).toBe([
      'Radial head fracture, Mason type II: marginal sector fracture with displacement.',
      'Broberg-Morrey modification: type II.',
      'Joint effusion (elevated anterior fat pad, visible posterior fat pad).',
      'Consider CT (Mason type II radial head fracture).',
    ].join('\n'))
  })

  test('the terrible triad', () => {
    const values = { ...normal, history: 'dislocated', ulnohumeral: 'dislocated', 'dislocation-direction': 'posterior', 'radial-head': 'present', 'radial-head-pattern': 'comminuted', coronoid: 'minor' }
    expect(impressionOf(values)).toBe([
      'Terrible triad: elbow dislocation with fractures of the radial head and coronoid.',
      'Radial head fracture with dislocation of the elbow, Mason type IV (Johnston modification).',
      'Coronoid fracture, Regan-Morrey type II: fragment of 50% or less.',
    ].join('\n'))
  })

  test('a posterior Monteggia injury', () => {
    const values = { ...normal, rcl: 'disrupted', forearm: ['ulna'], bado: 'ii' }
    expect(report(study, values).text).toContain('Radial head with the ulnar fracture: dislocated, posterior (Bado II)')
    expect(impressionOf(values)).toBe('Monteggia fracture-dislocation, Bado type II.')
    expect(report(study, values).warnings).toEqual([])
  })

  test('an effusion with no fracture seen', () => {
    const values = { ...normal, 'posterior-fat-pad': 'visible' }
    expect(impressionOf(values)).toBe('Joint effusion (visible posterior fat pad).\nNo fracture is seen, but with a joint effusion an occult fracture, most often of the radial head or neck, is likely.')
  })

  test('a complete articular distal humerus fracture', () => {
    const values = { ...normal, 'distal-humerus': 'present', 'distal-humerus-type': 'c', 'distal-humerus-signs': ['comminuted'] }
    expect(report(study, values).text).toContain('Distal humerus: complete articular (AO/OTA type C), comminuted')
    expect(impressionOf(values)).toBe('Distal humerus fracture, AO/OTA type C: complete articular.\nConsider CT (comminuted or complete articular distal humerus fracture).')
  })

  test('after reduction', () => {
    expect(impressionOf({ ...normal, history: 'reduced' })).toBe('Elbow reduced; ulnohumeral joint congruent.')
    expect(impressionOf({ ...normal, history: 'reduced', ulnohumeral: 'widened' })).toBe('Ulnohumeral joint widened after reduction (drop sign): may warn of instability if it persists.')
    expect(report(study, { ...normal, history: 'reduced', ulnohumeral: 'dislocated' }).warnings).toContain('The films are after reduction, but the elbow is entered as still dislocated.')
  })

  test('hidden answers write nothing', () => {
    // An extension test after a dislocation, and a Bado type with no ulnar fracture.
    const text = report(study, { ...normal, history: 'dislocated', extension: 'limited', bado: 'ii' }).text
    expect(text).not.toMatch(/cannot fully extend|Bado/i)
  })
})

describe('elbow X-ray rules', () => {
  // EX1-1, Appelboam: "Patients who cannot fully extend their elbow after injury should be referred
  // for radiography, as they have a nearly 50% chance of fracture"; "Full elbow extension had a
  // negative predictive value for fracture of 98.4% ... in adults"; "radiography can be deferred if
  // the practitioner is confident that an olecranon fracture is not present".
  test('the elbow extension test', () => {
    expect(chips(study, 'history', { history: 'injury', extension: 'limited' })['Extension test']).toBe('Cannot fully extend: a fracture in nearly 50%; radiographs indicated')
    expect(chips(study, 'history', { history: 'injury', extension: 'full' })['Extension test']).toBe('Full extension: 98.4% negative predictive value in adults, but look hard at the olecranon')
    expect(chips(study, 'history', { history: 'injury', extension: 'not-tested' })['Extension test']).toBeUndefined()
  })

  // EX1-3, Swensen: "The majority of radial head fractures are the result of a fall onto an
  // outstretched hand"; Barco: "A fall on an outstretched hand ... is the most common cause of elbow
  // dislocations"; Wiegand: olecranon fractures "may result from a direct blow to the proximal ulna".
  // EX1-4, Swensen: "Palpation of the ... distal radioulnar joint (DRUJ) should be performed";
  // "Imaging of additional joints is performed as warranted by the clinical presentation."
  test('the mechanism, and pain beyond the elbow', () => {
    expect(chips(study, 'history', { mechanism: 'foosh' })['Fall on the hand']).toBe('The usual mechanism of radial head fractures and elbow dislocations')
    expect(chips(study, 'history', { mechanism: 'direct' })['Direct blow']).toBe('A cause of olecranon fractures')
    expect(chips(study, 'history', { also: ['wrist'] })['Wrist and forearm']).toBe('Examine the distal radioulnar joint (Essex-Lopresti); image the wrist as the clinical picture warrants')
  })

  // EX2-1, Wiegand: "It is essential to obtain a true lateral radiograph of the elbow". EX2-2,
  // Greenspan: "In 10 patients, the conventional studies either were negative or failed to show the
  // full extent of the fracture, whereas the radial head-capitellum view demonstrated the abnormality
  // in every case"; Manns and Lee: "In only one case (1%) did the RHC view reveal a radial head
  // fracture not seen on the standard two views" (125 patients).
  test('the views', () => {
    expect(chips(study, 'views', { views: 'incomplete', 'views-missing': ['lateral'] })['No true lateral']).toBe('The fat pads, the lines and the olecranon are read on it')
    expect(chips(study, 'views', { views: 'incomplete', 'views-missing': ['ap'] })['No true lateral']).toBeUndefined()
    expect(chips(study, 'views', { 'extra-views': ['rhc'] })['Radial head-capitellum view']).toBe('Disputed: showed more in 10 of 50 (Greenspan); one extra fracture in 125 (Manns and Lee)')
    expect(impressionOf({ ...normal, views: 'incomplete', 'views-missing': ['lateral'] })).toBe('Limited study (views incomplete).\nFindings as above.')
  })

  // EX3-1, Goldfarb: "Eighty percent of elbows in this investigation demonstrated an intersection
  // with the middle third of the capitellum, while almost all of the others intersected the
  // posterior portion of the capitellum"; the line "is most commonly utilized to assess sagittal
  // alignment of the distal humerus in the setting of a supracondylar humerus fracture".
  test('the anterior humeral line', () => {
    expect(chips(study, 'alignment', { ahl: 'middle' })['Anterior humeral line']).toBe('Middle third: as in 80% of normal elbows')
    expect(chips(study, 'alignment', { ahl: 'posterior' })['Anterior humeral line']).toBe('Posterior third: as in nearly all the other normal elbows')
    for (const ahl of ['anterior-third', 'misses']) expect(chips(study, 'alignment', { ahl })['Anterior humeral line'], ahl).toBe('Not where normal elbows put it: check the distal humerus')
    expect(impressionOf({ ...normal, ahl: 'misses' })).toBe('Anterior humeral line misses the capitellum: check the distal humerus.')
    expect(report(study, { ...normal, ahl: 'anterior-third' }).warnings).toEqual(['The anterior humeral line is not where normal elbows put it, but no distal humerus fracture is entered.'])
  })

  // EX3-2, Rouleau: "a RCR observed outside the ranges of 1 mm posterior (-5%) to 3 mm anterior
  // (13%) in a 25 mm capitellum suggests a misalignment at the RC joint of the elbow".
  test('the radiocapitellar ratio, at its boundaries', () => {
    expect(chips(study, 'alignment', { rcr: '-5' })['Radiocapitellar ratio']).toBe('-5%: within −5% to 13%')
    expect(chips(study, 'alignment', { rcr: '13' })['Radiocapitellar ratio']).toBe('13%: within −5% to 13%')
    expect(chips(study, 'alignment', { rcr: '-6' })['Radiocapitellar ratio']).toBe('-6%: outside −5% to 13%, suggests radiocapitellar malalignment')
    expect(chips(study, 'alignment', { rcr: '14' })['Radiocapitellar ratio']).toBe('14%: outside −5% to 13%, suggests radiocapitellar malalignment')
    expect(impressionOf({ ...normal, rcr: '20' })).toBe('Radiocapitellar ratio 20%, outside the normal −5% to 13%: radiocapitellar malalignment.')
  })

  // EX3-3, EX3-4: Ring 2013, Monteggia "described a fracture of the proximal third of the ulna with
  // anterior dislocation of the radial head"; Mathur: "The most commonly missed finding was a radial
  // head dislocation/subluxation ... Special attention to the radiocapitellar joint alignment".
  test('a radiocapitellar line that misses the capitellum', () => {
    expect(chips(study, 'alignment', { rcl: 'disrupted' })['Radiocapitellar line']).toBe('Misses: suspect radial head subluxation or dislocation; check the ulna (Monteggia)')
    const values = { ...normal, rcl: 'disrupted' }
    expect(impressionOf(values)).toBe('Radiocapitellar line misses the capitellum: suspect radial head subluxation or dislocation.')
    expect(report(study, values).warnings).toEqual(['The radiocapitellar line misses the capitellum: suspect a radial head subluxation or dislocation, and check the ulna for a fracture (Monteggia).'])
  })

  // EX3-5, Coonrad: "The drop sign becomes concerning only if persistent after the first reduction
  // radiograph and may be a warning sign of the presence of instability." EX3-6, Barco: "Standard
  // radiographs may reveal minor avulsion injuries (<2 mm), posterior impaction of the capitellum
  // (Osborne-Cotterill lesion), or ulnohumeral subluxation."
  test('the ulnohumeral joint', () => {
    expect(chips(study, 'alignment', { ulnohumeral: 'widened' })['Drop sign']).toBe('May warn of instability if it persists after the first reduction film')
    expect(chips(study, 'alignment', { ulnohumeral: 'dislocated' }).Dislocation).toBe('Look for avulsions, posterior capitellar impaction, and radial head and coronoid fractures')
  })

  // EX4-1, EX4-2: the Mason calculator's rules. Iannuzzi reproduces Mason's types; "Johnston, who
  // ... used the fourth type to denote a fracture of the radial head with associated dislocation";
  // van der Windt: "at least 30% of the articular surface ... and displacement (at least 2 mm)".
  test('Mason, Johnston and Broberg-Morrey, as the calculator', () => {
    const head = { ...normal, 'radial-head': 'present' }
    expect(chips(study, 'bones', { ...head, 'radial-head-pattern': 'undisplaced' }).Mason).toBe('Type I')
    expect(chips(study, 'bones', { ...head, 'radial-head-pattern': 'comminuted' }).Mason).toBe('Type III')
    // Any dislocation in the history or on the films makes it type IV.
    expect(chips(study, 'bones', { ...head, history: 'reduced', 'radial-head-pattern': 'undisplaced' }).Mason).toBe('Type IV (Johnston)')
    expect(chips(study, 'bones', { ...head, ulnohumeral: 'dislocated', 'radial-head-pattern': 'displaced' }).Mason).toBe('Type IV (Johnston)')
    // Undecided until the history and the joint are both known.
    expect(chips(study, 'bones', { 'radial-head': 'present', 'radial-head-pattern': 'displaced' }).Mason).toBeUndefined()
    expect(chips(study, 'bones', { ...head, 'radial-head-displacement': '1.5' })['Broberg-Morrey']).toBe('Type I')
    expect(chips(study, 'bones', { ...head, 'radial-head-displacement': '2', 'radial-head-percent': '30' })['Broberg-Morrey']).toBe('Type II')
    expect(chips(study, 'bones', { ...head, 'radial-head-displacement': '3', 'radial-head-percent': '29' })['Broberg-Morrey']).toBe('Type I')
    expect(chips(study, 'bones', { ...head, 'radial-head-displacement': '3' })['Broberg-Morrey']).toBe('Enter the share of the articular surface')
  })

  // EX4-3, Swensen: "Incidence of associated injuries increases from 20% in non-displaced fractures
  // to 80% in comminuted radial head fractures". EX4-4, van der Windt: "A CT scan is necessary in
  // all type II fractures to determine fracture displacement, number and location of fragments, and
  // the presence of associated fractures."
  test('a comminuted fracture, and CT for type II', () => {
    const head = { ...normal, 'radial-head': 'present' }
    expect(chips(study, 'bones', { ...head, 'radial-head-pattern': 'comminuted' })['Associated injuries']).toBe('In 80% of comminuted fractures, against 20% of undisplaced')
    expect(chips(study, 'bones', { ...head, 'radial-head-pattern': 'displaced' }).CT).toBe('Needed in every type II: displacement, fragments, associated fractures')
    expect(chips(study, 'bones', { ...head, 'radial-head-pattern': 'undisplaced' }).CT).toBeUndefined()
  })

  // EX4-6, Regan and Morrey: "Type I--avulsion of the tip of the process; Type II--a fragment
  // involving 50 per cent of the process, or less; and Type III--a fragment involving more than 50
  // per cent ... A concurrent dislocation or associated fracture was present in 14, 56, and 80 per
  // cent".
  test('the coronoid, Regan and Morrey', () => {
    expect(chips(study, 'bones', { coronoid: 'tip' })['Coronoid (Regan-Morrey)']).toBe('Type I: a dislocation or another fracture in 14%')
    expect(chips(study, 'bones', { coronoid: 'minor' })['Coronoid (Regan-Morrey)']).toBe('Type II: a dislocation or another fracture in 56%')
    expect(chips(study, 'bones', { coronoid: 'major' })['Coronoid (Regan-Morrey)']).toBe('Type III: a dislocation or another fracture in 80%')
  })

  // EX4-7, Ring 2002: "Elbow fracture-dislocations that involve a fracture of the coronoid process in
  // addition to a fracture of the radial head are very unstable ... Identification of the coronoid
  // fracture is therefore important, and computed tomography should be used if there is
  // uncertainty."
  test('the terrible triad, and a coronoid fracture in doubt', () => {
    const triad = { ...normal, ulnohumeral: 'dislocated', 'radial-head': 'present', 'radial-head-pattern': 'displaced', coronoid: 'tip' }
    expect(chips(study, 'bones', triad)['Terrible triad']).toBe('Dislocation with radial head and coronoid fractures: very unstable')
    expect(chips(study, 'bones', { ...triad, ulnohumeral: 'congruent' })['Terrible triad']).toBeUndefined()
    const doubt = { ...triad, coronoid: 'uncertain' }
    expect(chips(study, 'bones', doubt).Coronoid).toBe('In doubt with a dislocation or radial head fracture: CT')
    expect(impressionOf(doubt)).toContain('Possible coronoid fracture.\nConsider CT (possible coronoid fracture).')
    expect(report(study, { ...triad, coronoid: 'none' }).warnings).toContain('A dislocation with a radial head fracture is entered: look closely for a coronoid fracture (the terrible triad), with CT if in doubt.')
    // A coronoid in doubt with no dislocation and no radial head fracture gets no CT line.
    expect(impressionOf({ ...normal, coronoid: 'uncertain' })).toBe('Possible coronoid fracture.')
  })

  // EX4-8, EX4-9, Wiegand: "Radiographs should be examined carefully for evidence of coronoid process
  // fracture, dislocation of the elbow, and radial head injury"; "The Mayo classification ... Type I,
  // nondisplaced fractures ...; Type II, displaced, stable fractures ...; and Type III, displaced,
  // unstable fractures".
  test('the olecranon, Mayo', () => {
    const values = { ...normal, olecranon: 'present', 'olecranon-type': 'ii' }
    expect(chips(study, 'bones', values).Mayo).toBe('Type II')
    expect(chips(study, 'bones', values).Olecranon).toBe('Intra-articular: look for a coronoid fracture, a dislocation and a radial head injury')
    expect(impressionOf(values)).toBe('Olecranon fracture, Mayo type II: displaced, elbow stable.')
  })

  // EX4-10, EX4-11, Dey Hazra: "extra-articular (type A), partial articular (type B), and complete
  // articular fracture (type C)"; "For further evaluation, three-dimensional computed tomography is
  // recommended, especially for comminuted or complex fractures." EX4-12, McKee: "A characteristic
  // radiographic abnormality, which we have termed the double-arc sign, was seen on the lateral
  // radiograph ... and represented the subchondral bone of the displaced capitellum and the lateral
  // trochlear ridge."
  test('the distal humerus, AO/OTA, and the double-arc sign', () => {
    const dh = { ...normal, 'distal-humerus': 'present' }
    expect(chips(study, 'bones', { ...dh, 'distal-humerus-type': 'a' })['AO/OTA']).toBe('Type A')
    expect(chips(study, 'bones', { ...dh, 'distal-humerus-type': 'a' }).CT).toBeUndefined()
    expect(chips(study, 'bones', { ...dh, 'distal-humerus-type': 'a', 'distal-humerus-signs': ['comminuted'] }).CT).toBe('3D CT recommended for comminuted or complex fractures')
    expect(chips(study, 'bones', { ...dh, 'distal-humerus-type': 'c' }).CT).toBe('3D CT recommended for comminuted or complex fractures')
    const shear = { ...dh, 'distal-humerus-type': 'b3', 'distal-humerus-signs': ['double-arc'] }
    expect(chips(study, 'bones', shear)['AO/OTA']).toBe('Type B3 (coronal shear)')
    expect(chips(study, 'bones', shear)['Double-arc sign']).toBe('Capitellum and lateral trochlear ridge displaced: a coronal shear fracture')
    expect(impressionOf(shear)).toBe('Distal humerus fracture, AO/OTA type B3: coronal shear of the capitellum or trochlea.')
  })

  // EX4-13, Calderazzi: Bado "classified the injury into four types based on the anterior,
  // posterior, or lateral/anterolateral direction of the radial head dislocation. The fourth type is
  // associated with a fracture of the radius and ulna at the same level proximally and with an
  // anterior dislocation of the radial head." EX4-14, Ring 1998: "Twenty-six patients (68 percent)
  // who had a Bado type-II fracture had an associated fracture of the radial head"; "The posterior
  // (Bado type-II) fracture is the most common type of Monteggia fracture in adults." EX4-15, Mathur.
  test('Monteggia, Bado', () => {
    expect(chips(study, 'bones', { forearm: ['ulna'], bado: 'i' }).Monteggia).toBe('Bado type I')
    expect(chips(study, 'bones', { forearm: ['ulna'], bado: 'ii' })['Bado II']).toBe('The commonest in adults; a radial head fracture in 26 of 38')
    expect(chips(study, 'bones', { forearm: ['ulna'], bado: 'none' })['Ulnar fracture']).toBe('Check the radial head: its dislocation is the finding most often missed')
    const ulna = { ...normal, rcl: undefined, forearm: ['ulna'] }
    expect(report(study, ulna).warnings).toContain('An ulnar fracture is entered: check the radiocapitellar joint, since a dislocated or subluxed radial head is the finding most often missed in a Monteggia injury.')
    expect(report(study, { ...ulna, rcl: 'aligned', bado: 'none' }).warnings).toEqual([])
    expect(impressionOf({ ...ulna, rcl: 'aligned', bado: 'none' })).toBe('Ulnar fracture.')
  })

  // EX4-16, Garg and Mudgal: "Fractures of the radial shaft associated with disruption of the distal
  // radioulnar joint (DRUJ) are termed Galeazzi fractures." Rettig and Raskin: type I fractures
  // "within 7.5 cm of the midarticular surface of the distal radius; 12 of these cases were
  // associated with intraoperative DRUJ instability", against "Only one" of 18 further up.
  test('the Galeazzi check', () => {
    expect(chips(study, 'bones', { forearm: ['radius'] })['Galeazzi check']).toBe('Distal radioulnar joint: unstable mainly with distal-third fractures (within 7.5 cm); image the wrist')
    expect(impressionOf({ ...normal, forearm: ['radius'] })).toBe('Radial shaft fracture: check the distal radioulnar joint (Galeazzi).')
  })

  // EX5-1, Iyer: "the posterior fat pad is displaced out of its fossa by fluid and becomes visible";
  // Pavić: "displacement of the anterior and posterior fat pads (fat pad sign) due to joint effusion,
  // which is an indirect sign of fracture". EX5-2, O'Dwyer: "Seventy-five percent of the 20 patients
  // ... had radiographically occult fractures identified. Some (86.6%) of these fractures were located
  // in the radial head"; Pavić, on films at 7 to 10 days, "a fracture of the radial neck in 111
  // cases (58%) and a fracture of non-displaced radial head in 73 cases (37%)", so the chip says head
  // or neck. EX5-3, Irshad: "its absence is a more reliable indicator of the absence of a radial
  // head/ neck fracture". EX5-4, Hussein: "The supinator fat pad sign is a useful adjunct".
  test('the fat pads', () => {
    expect(chips(study, 'soft-tissues', { 'anterior-fat-pad': 'elevated' })['Fat pads']).toBe('Joint effusion')
    expect(chips(study, 'soft-tissues', { ...normal, 'posterior-fat-pad': 'visible' })['Occult fracture']).toBe('Likely: 75% on MRI; most in the radial head or neck')
    expect(chips(study, 'soft-tissues', { ...normal, 'posterior-fat-pad': 'visible', olecranon: 'present' })['Occult fracture']).toBeUndefined()
    expect(chips(study, 'soft-tissues', normal)['No fat pad sign']).toBe('Its absence is the more reliable sign of no radial head or neck fracture')
    expect(chips(study, 'soft-tissues', { supinator: 'displaced' })['Supinator fat pad']).toBe('Displaced in radial head and neck fractures: a useful adjunct sign')
    expect(impressionOf({ ...normal, supinator: 'displaced' })).toBe('Supinator fat pad displaced from the radius.')
  })

  // EX2-4, Acar: "We recommend CT as an additional evaluation imaging study for trauma patients who
  // have a positive elbow extension test and who present with no apparent fracture on x-ray
  // imaging." EX5-2, O'Dwyer: "There was no change in patient management as a result of the
  // additional imaging", so an effusion alone gets no CT line.
  test('CT after a positive extension test with no fracture seen, and not for an effusion alone', () => {
    const limited = { ...normal, extension: 'limited' }
    expect(impressionOf(limited)).toBe('No fracture, joint effusion or malalignment.\nConsider CT (cannot fully extend, no fracture seen).')
    expect(impressionOf({ ...normal, 'posterior-fat-pad': 'visible' })).not.toContain('CT')
    expect(impressionOf({ ...limited, olecranon: 'present' })).not.toContain('CT')
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...normal, olecranon: 'present', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: olecranon fracture.')
    expect(report(study, { ...normal, 'posterior-fat-pad': 'visible', 'impression-negatives': ['no-effusion'] }).warnings)
      .toContain('Impression says no joint effusion, but these are entered: visible posterior fat pad.')
    expect(report(study, { ...normal, ulnohumeral: 'dislocated', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no malalignment, but these are entered: elbow dislocation.')
  })
})
