import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { WristXrayStudyPage } from './WristXrayStudy'

const study = studyOf(WristXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-wrist-xray-sources.md (X claims), each read in its paper's
 * abstract, its open full text or the ACR's published ratings before it went in. The Herbert and
 * Mayfield wording is the shared logic's (src/logic/herbert.ts, src/logic/mayfield.ts), pinned by
 * their own tests. If a case has to change, say in that commit why the old expectation was wrong.
 */

describe('wrist X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'alignment', 'radius', 'scaphoid', 'carpus', 'soft-tissues', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.sourceNote).not.toMatch(/Unchecked draft/)
    expect(study.references).toHaveLength(25)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi)).size).toBe(study.references.length)
  })
})

/** A complete wrist series after injury, nothing found. */
const normal: Values = {
  history: 'injury', side: 'Right', views: 'complete', arcs: 'smooth', axis: 'aligned', druj: 'normal',
  radius: 'none', 'ulnar-styloid': 'none', scaphoid: 'none', perilunate: 'none',
}
/** A complete scaphoid series, nothing found. */
const scaphoidSeries: Values = { ...normal, history: 'scaphoid' }
/** Repeat scaphoid films, nothing found. */
const repeat: Values = { ...normal, history: 'repeat' }
/** A distal radius fracture, for the measurement rules. */
const radius: Values = { ...normal, radius: 'present', 'radius-type': 'colles' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

const OCCULT_LINE = 'Radiographs do not exclude an occult scaphoid fracture; if it is still suspected clinically, consider MRI or CT, or repeat radiographs in 10–14 days.'

describe('wrist X-ray report: steps', () => {
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
      'Study not stated', 'Side not stated', 'Views not stated',
      'Carpal arcs (Gilula) not stated', 'Radius, lunate and capitate (lateral) not stated', 'Distal radioulnar joint not stated',
      'Distal radius fracture not stated', 'Ulnar styloid fracture not stated', 'Scaphoid fracture not stated', 'Perilunate injury not stated',
    ])
  })
})

describe('wrist X-ray report: whole cases', () => {
  test('a normal wrist series', () => {
    const text = report(study, normal).text
    expect(text).toContain('Study: wrist radiographs after injury')
    expect(text).toContain('Views: PA, lateral and semipronated oblique')
    expect(impressionOf(normal)).toBe('No fracture or malalignment.')
  })

  // X4-6, ACR Variant 2 ("Suspect acute hand or wrist trauma. Initial radiographs negative or
  // equivocal. Next imaging study."): "Radiography area of interest repeat in 10-14 days ... 8",
  // "MRI area of interest without IV contrast ... 8", "CT area of interest without IV contrast ... 7".
  test('a normal scaphoid series keeps the occult fracture open', () => {
    expect(report(study, scaphoidSeries).text).toContain('Views: PA, lateral, pronated oblique and PA in ulnar deviation')
    expect(impressionOf(scaphoidSeries)).toBe(['No fracture or malalignment.', OCCULT_LINE].join('\n'))
    // X1-5: snuffbox tenderness on a wrist series raises the same question.
    expect(impressionOf({ ...normal, signs: ['snuffbox-tender'] })).toBe(['No fracture or malalignment.', OCCULT_LINE].join('\n'))
    expect(impressionOf({ ...scaphoidSeries, scaphoid: 'equivocal' })).toBe(['Possible scaphoid fracture.', OCCULT_LINE].join('\n'))
  })

  // X4-7, Steinmann and Adams: "magnetic resonance imaging (MRI) is superior to repeat radiographs
  // for detecting an occult scaphoid fracture"; Chen: "If plain radiographs are normal and clinical
  // suspicion is high, magnetic resonance imaging (MRI) is warranted".
  test('normal repeat films offer MRI or CT', () => {
    expect(impressionOf(repeat)).toBe('No fracture or malalignment.\nAn occult scaphoid fracture is not excluded; if it is still suspected clinically, consider MRI or CT.')
  })

  // X3-1, Sharma: "Colles' fracture is a transverse DRF without intra-articular extension and dorsal
  // displacement or angulation of the fracture fragment". X3-3, X3-5: "Normal radial length ranges
  // from 11 to 22 mm"; "Normal range for radial tilt is from 4 degrees of dorsal tilt to 11 degrees
  // of volar tilt."
  test('a Colles fracture with shortening and dorsal tilt', () => {
    const values = { ...radius, inclination: '15', 'radial-height': '9', 'tilt-direction': 'dorsal', tilt: '25', 'ulnar-styloid': 'tip' }
    expect(report(study, values).text).toContain('Distal radius fracture: transverse, extra-articular, dorsal displacement or angulation')
    expect(report(study, values).text).toContain('Tilt: 25° dorsal')
    expect(impressionOf(values)).toBe([
      'Transverse extra-articular distal radius fracture with dorsal displacement or angulation (Colles fracture).',
      'Radial height 9 mm and dorsal tilt 25°, beyond the normal range.',
      'Fracture of the tip of the ulnar styloid.',
    ].join('\n'))
  })

  // X3-7, Sharma: "patients ... with intra-articular or comminuted fractures, and DRUJ malalignment
  // and carpal dislocations ... also require CT for detailed evaluation and operative planning."
  test('a volar Barton fracture with step-off', () => {
    const values = { ...radius, 'radius-type': 'barton-volar', 'radius-features': ['comminuted'], 'step-off': '3' }
    expect(impressionOf(values)).toBe([
      'Intra-articular volar rim fracture of the distal radius with the carpus displaced volarly (volar Barton fracture), comminuted, with 3 mm of articular step-off.',
      'Consider CT for the articular surface and comminution.',
    ].join('\n'))
  })

  // X4-3, X5-1, X5-3: a trans-scaphoid perilunate fracture-dislocation. Sharma: "Trans-scaphoid
  // perilunate dislocation is the most common pattern of perilunate fracture dislocation"; "On
  // lateral view, alignment of the distal radius and lunate is maintained with dorsal dislocation of
  // the capitate."
  test('a trans-scaphoid perilunate fracture-dislocation', () => {
    const values = { ...normal, arcs: 'broken', 'arcs-broken': ['arc-2'], axis: 'capitate-dorsal', scaphoid: 'present', herbert: 'B4', perilunate: 'present' }
    expect(report(study, values).warnings).toEqual([])
    expect(impressionOf(values)).toBe([
      'Scaphoid fracture, Herbert type B4 (acute unstable): trans-scaphoid perilunate fracture-dislocation.',
      'Perilunate injury, Mayfield stage II: capitolunate disruption, with dorsal displacement or dislocation of the capitate relative to the lunate.',
      'Consider CT for the fractures and carpal alignment.',
    ].join('\n'))
  })

  test('a lunate dislocation', () => {
    const values = { ...normal, arcs: 'broken', 'sl-gap': '5', axis: 'lunate-volar', perilunate: 'present', lt: 'yes' }
    expect(report(study, values).warnings).toEqual([])
    expect(impressionOf(values)).toContain('Perilunate injury, Mayfield stage IV: lunate dislocation, volarly from the lunate fossa of the radius.')
  })

  // X2-2, X2-5 (W3-2), X2-8: scapholunate widening with no fracture. ACR Variant 4 ("Initial
  // radiographs showing distal radioulnar joint or carpal malalignment in the absence of fracture"):
  // "CT wrist without IV contrast bilateral ... 9", "MRI wrist without IV contrast ... 8".
  test('scapholunate widening with no fracture', () => {
    const values = { ...normal, 'sl-gap': '4', 'sl-angle': '75' }
    expect(impressionOf(values)).toBe([
      'Scapholunate interval widened to 4 mm (Terry-Thomas sign), suggesting a scapholunate ligament injury.',
      'Scapholunate angle 75°, strongly suggesting DISI.',
      'Consider CT of both wrists or MRI.',
    ].join('\n'))
  })

  // X3-11, ACR Variant 3 ("Acute wrist fracture on radiographs. Suspect wrist tendon or ligament
  // trauma"): "MR arthrography wrist ... 9", "MRI wrist without IV contrast ... 9".
  test('a fracture with scapholunate widening offers MRI', () => {
    const values = { ...radius, 'sl-gap': '4' }
    expect(impressionOf(values)).toContain('Consider MRI for a ligament injury.')
    expect(chips(study, 'radius', values).ACR).toBe('Fracture with a suspected ligament injury: MRI or MR arthrography 9')
  })

  // X5-5: a dorsal triquetral fracture.
  test('a dorsal triquetral fracture', () => {
    expect(impressionOf({ ...normal, 'carpal-other': ['triquetrum-dorsal'] })).toBe('Dorsal triquetral fracture.')
  })

  test('hidden answers write nothing', () => {
    const text = report(study, { ...normal, 'radius-type': 'colles', inclination: '5', herbert: 'B3', lt: 'yes', 'arc-fractures': ['capitate'] }).text
    expect(text).not.toMatch(/Colles|inclination|Herbert|lunotriquetral|greater arc/i)
  })
})

describe('wrist X-ray rules: step 1', () => {
  // X1-1, ACR Variant 1 ("Acute blunt or penetrating trauma to the hand or wrist. Initial imaging"):
  // "Radiography area of interest Usually appropriate ... 9"; US, MRI, bone scan and CT all "Usually
  // not appropriate ... 1". X4-6, Variant 2 as above.
  test('the ACR ratings for each study', () => {
    expect(chips(study, 'technique', { history: 'injury' }).ACR).toBe('Radiographs 9 as the first test; CT, MRI, ultrasound and bone scan 1')
    expect(chips(study, 'technique', { history: 'scaphoid' }).ACR).toBe('Radiographs 9 as the first test; CT, MRI, ultrasound and bone scan 1')
    expect(chips(study, 'technique', { history: 'repeat' }).ACR).toBe('After negative or equivocal films: repeat radiographs at 10–14 days 8, MRI 8, CT 7')
  })

  // X1-2, Walenkamp: "eight variables: age; sex, swelling of the wrist; swelling of the anatomical
  // snuffbox, visible deformation; distal radius tender to palpation; pain on radial deviation and
  // painful axial compression of the thumb"; "The sensitivity and specificity of the Amsterdam Wrist
  // Rules (AWR) in the external validation cohort were 98 % ... and 21 %".
  test('the Amsterdam Wrist Rules signs', () => {
    expect(chips(study, 'technique', { ...normal, signs: ['deformity'] })['Amsterdam Wrist Rules']).toBe('With age and sex, these signs select adults for radiography: 98% sensitive, 21% specific')
    expect(chips(study, 'technique', { ...normal, signs: ['snuffbox-tender'] })['Amsterdam Wrist Rules']).toBeUndefined()
  })

  // X1-5, Steinmann and Adams: "sensitivity is quite high for the clinical examination, although
  // specificity approaches only 74%–80%"; Mallee: "The low prevalence of a true fracture among
  // suspected fractures (median = 20%)".
  test('a suspected scaphoid fracture', () => {
    expect(chips(study, 'technique', scaphoidSeries)['Scaphoid suspected']).toBe('Examination 74–80% specific; a fracture in a median of 20% of suspected cases')
    expect(chips(study, 'technique', { ...normal, signs: ['tubercle-tender'] })['Scaphoid suspected']).toBeDefined()
    expect(chips(study, 'technique', normal)['Scaphoid suspected']).toBeUndefined()
  })

  // X1-4, Cheung: "We recommend the use of four views at initial presentation of suspected scaphoid
  // fracture: PA and lateral to assess carpal alignment, with pronated oblique and ulnar deviated PA
  // to detect the fracture." X1-3, Sharma: "at least three radiographic views in suspected wrist
  // fractures, with a PA view, a lateral view, and an additional semi-pronated 45-degree oblique view".
  test('the views for each study', () => {
    const missing = (history: string, views: string[]) => chips(study, 'technique', { history, views: 'incomplete', 'views-missing': views })
    expect(missing('scaphoid', ['ulnar-deviation'])['Scaphoid series']).toBe('Four views: PA and lateral for alignment, pronated oblique and ulnar-deviated PA for the fracture')
    expect(missing('injury', ['ulnar-deviation'])['Scaphoid series']).toBeUndefined()
    expect(missing('injury', ['oblique'])['Wrist series']).toBe('At least three views: PA, lateral and semipronated oblique')
    expect(report(study, { ...normal, views: 'incomplete', 'views-missing': ['oblique'] }).text).toContain('Limited study (views incomplete).')
  })

  // X1-6, Okoro: "these intercarpal angles are only accurate on a 'true' lateral view"; Sharma: "the
  // radiograph must be acquired in true lateral position, and even minimal rotation can lead to false
  // interpretation."
  test('a rotated lateral', () => {
    expect(chips(study, 'technique', { ...normal, 'lateral-quality': 'rotated' }).Lateral).toBe('Rotated: the carpal angles and the DRUJ cannot be read reliably')
    expect(report(study, { ...normal, 'lateral-quality': 'rotated', 'sl-angle': '50' }).warnings)
      .toContain('The lateral is entered as rotated, but carpal angles or a radioulnar distance are entered: they are reliable only on a true lateral.')
    expect(report(study, { ...normal, 'lateral-quality': 'true', 'sl-angle': '50' }).warnings).toEqual([])
    // A warn chip with nothing else entered is never called normal.
    expect(impressionOf({ ...normal, 'lateral-quality': 'rotated' })).toBe('Findings as above.')
  })

  // X4-6: the repeat interval, 7–10 days (Okoro, "re-evaluated with radiographs in 7–10 days") or
  // 10–14 days (ACR).
  test('repeat films taken early', () => {
    expect(chips(study, 'technique', { ...repeat, days: '6' }).Timing).toBe('Earlier than 7–10 days (Okoro) or 10–14 days (ACR)')
    expect(chips(study, 'technique', { ...repeat, days: '7' }).Timing).toBeUndefined()
  })
})

describe('wrist X-ray rules: step 2', () => {
  // X2-1, Okoro: "Any step-offs/disruptions in these lines suggest a ligamentous injury or fracture at
  // the site of the broken arc", with two normal variants.
  test('the carpal arcs', () => {
    expect(chips(study, 'alignment', { ...normal, arcs: 'broken' })['Carpal arcs']).toBe('Broken: a ligament injury or fracture at the break (two normal variants can step them)')
    expect(report(study, { ...normal, arcs: 'broken', 'arcs-broken': ['arc-1'] }).warnings)
      .toContain('A carpal arc is broken, but no fracture, scapholunate widening or dislocation is entered: a break suggests a ligament injury or fracture at that site, unless it is one of the two normal variants.')
    expect(impressionOf({ ...normal, arcs: 'broken', 'arcs-broken': ['arc-1'] })).toBe('Arc I broken: a ligament injury or fracture at the break.')
  })

  // X2-2, Dvorsky: "the Terry-Thomas sign, defined as widening of the scapholunate interval >3 mm";
  // Okoro: "The normal scapholunate joint space is less than 3 mm. Widening can be subtle, and up to
  // 4 mm may be normal in some patients".
  test('the scapholunate interval, at 3 mm', () => {
    expect(chips(study, 'alignment', { ...normal, 'sl-gap': '3' })['Scapholunate interval']).toBe('3 mm or less: not widened')
    expect(chips(study, 'alignment', { ...normal, 'sl-gap': '3.5' })['Scapholunate interval']).toBe('Over 3 mm: widened (Terry-Thomas sign); up to 4 mm can be normal, so compare the other wrist')
    // X5-3, Dvorsky: "up to 25% of PLDs are missed on initial presentation".
    expect(chips(study, 'carpus', { ...normal, 'sl-gap': '3.5' }).Check).toBe('Up to 25% of perilunate dislocations are missed at first: recheck the arcs and the lateral')
    expect(chips(study, 'carpus', { ...normal, 'sl-gap': '3' }).Check).toBeUndefined()
  })

  // X2-4, Sharma: perilunate, "alignment between the radius and the lunate is maintained"; lunate,
  // "volar dislocation of the lunate ... ('spilled tea-cup sign')"; midcarpal, "loss of alignment
  // between the distal radius, lunate, and capitate ... considered a variant of stage III".
  test('the lateral', () => {
    expect(chips(study, 'alignment', { ...normal, axis: 'capitate-dorsal' }).Lateral).toBe('Lunate in line with the radius, capitate dorsal: perilunate dislocation')
    expect(chips(study, 'alignment', { ...normal, axis: 'lunate-volar' }).Lateral).toBe('Lunate tipped volarly (spilled teacup): lunate dislocation')
    expect(chips(study, 'alignment', { ...normal, axis: 'midcarpal' }).Lateral).toBe('Neither in line with the radius: midcarpal dislocation, a variant of stage III')
    expect(report(study, { ...normal, axis: 'capitate-dorsal' }).warnings).toContain('The lateral shows the lunate or capitate out of line with the radius, but no perilunate injury is entered.')
  })

  // X2-5, the wrist MRI study's W3-2 rule: Zhou, "a scapholunate angle (... normal value between 30º
  // and 60º) greater than 70º is consistent with a DISI deformity"; Pang, "scapholunate instability
  // ... scapholunate angle >60°"; Vassa, "The SLL angle < 30o and capitolunate angle > 30o are
  // suggestive of VISI".
  test('the scapholunate angle at its boundaries', () => {
    const sl = (angle: string) => chips(study, 'alignment', { ...normal, 'sl-angle': angle })['Scapholunate angle']
    expect(sl('30')).toBe('Within 30–60°')
    expect(sl('60')).toBe('Within 30–60°')
    expect(sl('61')).toBe('Above 60°: beyond the normal range, supports scapholunate malalignment')
    expect(sl('70')).toBe('Above 60°: beyond the normal range, supports scapholunate malalignment')
    expect(sl('71')).toBe('Above 70°: strongly suggests DISI')
    expect(sl('29')).toBe('Below 30°: suggests VISI')
  })

  // X2-6, Okoro: "The normal limits of the capitolunate angle are between 0° and 30° ... Any
  // measurement outside the normal range for these two angles is suggestive of carpal instability."
  test('the capitolunate angle and the VISI pattern', () => {
    const cl = (values: Values) => chips(study, 'alignment', { ...normal, ...values })['Capitolunate angle']
    expect(cl({ 'cl-angle': '30' })).toBe('Within 0–30°')
    expect(cl({ 'cl-angle': '31' })).toBe('Over 30°: outside the normal range, suggests carpal instability')
    expect(cl({ 'cl-angle': '35', 'sl-angle': '25' })).toBe('Over 30°, with a scapholunate angle under 30°: VISI pattern')
  })

  // X2-5, Pang: "DISI ... determined as radiolunate angle >15°"; Kitay (quoted in the wrist MRI
  // sources, W3-2): "by more than 15° in the dorsal direction on a true lateral film indicates DISI".
  test('dorsal tilt of the lunate, at 15°', () => {
    expect(chips(study, 'alignment', { ...normal, 'rl-angle': '15' }).Lunate).toBeUndefined()
    expect(chips(study, 'alignment', { ...normal, 'rl-angle': '16' }).Lunate).toBe('Dorsal radiolunate angle over 15°: DISI')
  })

  // X2-7, Sharma: "On a radiographic true lateral view, a distance of more than 6 mm between the dorsal
  // cortices of the radius and the ulna indicates DRUJ instability"; "CT is considered the standard
  // investigation to evaluate for DRUJ dislocations."
  test('the DRUJ, at 6 mm', () => {
    expect(chips(study, 'alignment', { ...normal, 'druj-distance': '6' })['Radioulnar distance']).toBeUndefined()
    expect(chips(study, 'alignment', { ...normal, 'druj-distance': '6.5' })['Radioulnar distance']).toBe('Over 6 mm on a true lateral: DRUJ instability')
    expect(chips(study, 'alignment', { ...normal, druj: 'widened' }).DRUJ).toBe('Malalignment: CT is the standard test; with no fracture, ACR rates CT of both wrists 9')
    expect(impressionOf({ ...normal, druj: 'displaced' })).toBe('Distal radioulnar joint malalignment.\nConsider CT for the distal radioulnar joint.')
  })
})

describe('wrist X-ray rules: step 3', () => {
  // X3-1, Sharma: Smith's fracture "is a transverse, extra-articular fracture of the distal radius
  // with volar displacement or angulation"; "A Barton's fracture is an intra-articular fracture ...
  // with displacement of the fracture fragment and carpus"; "A Hutchison fracture (also known as
  // chauffeur's fracture) is an oblique fracture of the radial styloid with intra-articular
  // extension".
  test('the descriptive names', () => {
    const name = (type: string) => chips(study, 'radius', { ...radius, 'radius-type': type }).Name
    expect(name('colles')).toBe('Colles fracture')
    expect(name('smith')).toBe('Smith fracture (reverse Colles)')
    expect(name('barton-dorsal')).toBe('Dorsal Barton fracture (shear)')
    expect(name('styloid')).toBe('Hutchinson (chauffeur\'s) fracture')
    expect(name('extra-other')).toBeUndefined()
    expect(chips(study, 'radius', { ...radius, 'radius-type': 'styloid' }).CT).toBe('Intra-articular or comminuted: CT shows step-off and comminution better, for planning')
    expect(chips(study, 'radius', radius).CT).toBeUndefined()
  })

  // X3-6, Sharma: "an articular step-off greater than 2 mm is associated with late development of
  // osteoarthritis in a significant number of patients".
  test('step-off at 2 mm', () => {
    const intra = { ...radius, 'radius-type': 'intra-other' }
    expect(chips(study, 'radius', { ...intra, 'step-off': '2' })['Step-off']).toBeUndefined()
    expect(chips(study, 'radius', { ...intra, 'step-off': '2.5' })['Step-off']).toBe('Over 2 mm: associated with later osteoarthritis')
  })

  // X3-4, Sharma: radial inclination "The normal angle is between 13 and 30 degrees"; "radial
  // inclination by less than 10 degrees is associated with decreased wrist function in the long
  // term". Schuind: "The mean radial inclination was 24 degrees (range, 19 to 29 degrees)."
  test('radial inclination at its boundaries', () => {
    const inc = (angle: string) => chips(study, 'radius', { ...radius, inclination: angle })['Radial inclination']
    expect(inc('9')).toBe('Under 10°: associated with decreased wrist function')
    expect(inc('10')).toBe('Below the normal 13–30°')
    expect(inc('12')).toBe('Below the normal 13–30°')
    expect(inc('13')).toBe('Within 13–30° (Sharma), below 19–29° (Schuind)')
    expect(inc('18')).toBe('Within 13–30° (Sharma), below 19–29° (Schuind)')
    expect(inc('19')).toBe('Within the normal range')
    expect(inc('30')).toBe('Within the normal range')
    expect(inc('31')).toBe('Above the normal 13–30°')
  })

  // X3-3, Sharma: "Normal radial length ranges from 11 to 22 mm."
  test('radial height at 11 mm', () => {
    expect(chips(study, 'radius', { ...radius, 'radial-height': '10.5' })['Radial height']).toBe('Below the normal 11–22 mm: radial shortening')
    expect(chips(study, 'radius', { ...radius, 'radial-height': '11' })['Radial height']).toBe('Within 11–22 mm')
  })

  // X3-5, Sharma: "Normal range for radial tilt is from 4 degrees of dorsal tilt to 11 degrees of
  // volar tilt"; "dorsal tilt of radius by more than 20 degrees ... is associated with decreased wrist
  // function in the long term".
  test('tilt at its boundaries', () => {
    const tilt = (direction: string, angle?: string) => chips(study, 'radius', { ...radius, 'tilt-direction': direction, tilt: angle }).Tilt
    expect(tilt('neutral')).toBe('Within the normal range (4° dorsal to 11° volar)')
    expect(tilt('dorsal', '4')).toBe('Within the normal range (4° dorsal to 11° volar)')
    expect(tilt('dorsal', '5')).toBe('Dorsal tilt beyond the normal range (4° dorsal to 11° volar)')
    expect(tilt('dorsal', '20')).toBe('Dorsal tilt beyond the normal range (4° dorsal to 11° volar)')
    expect(tilt('dorsal', '21')).toBe('Dorsal tilt over 20°: associated with decreased wrist function')
    expect(tilt('volar', '11')).toBe('Within the normal range (4° dorsal to 11° volar)')
    expect(tilt('volar', '12')).toBe('Volar tilt beyond the normal range (4° dorsal to 11° volar)')
  })

  // X3-9, Schuind: "The mean ulnar variance was -0.9 millimeter (normal range, -4.2 to 2.3
  // millimeters)"; Sharma: ulnar variance "will be positive in case of radial shortening".
  test('ulnar variance at its boundaries', () => {
    expect(chips(study, 'radius', { ...normal, 'ulnar-variance': '2.3' })['Ulnar variance']).toBeUndefined()
    expect(chips(study, 'radius', { ...normal, 'ulnar-variance': '2.5' })['Ulnar variance']).toBe('Positive, above the normal −4.2 to 2.3 mm')
    expect(chips(study, 'radius', { ...radius, 'ulnar-variance': '2.5' })['Ulnar variance']).toBe('Positive, above the normal −4.2 to 2.3 mm; goes with radial shortening')
    expect(chips(study, 'radius', { ...normal, 'ulnar-variance': '-4.5' })['Ulnar variance']).toBe('Negative, below the normal −4.2 to 2.3 mm')
    expect(report(study, { ...normal, 'ulnar-variance': '2.5' }).text).toContain('Ulnar variance: +2.5 mm')
  })

  // X3-8, Shahabpour: distal radius fractures "may be associated to fractures of the ulnar styloid
  // (55%–61%) ... triangular fibrocartilage (39%–43%), scapholunate (SL) ligament (16%–40%), and
  // lunotriquetral ligament (9%–15%)". X3-10, Sharma: "more proximal fractures involving the base of
  // the styloid ... are often associated with DRUJ dislocation and instability"; isolated ulnar head
  // fractures "are usually unstable fractures".
  test('what goes with the fracture, and the ulna', () => {
    expect(chips(study, 'radius', radius)['Also look for']).toBe('Ulnar styloid fracture (55–61%), TFCC (39–43%), scapholunate (16–40%) and lunotriquetral (9–15%) injury')
    expect(chips(study, 'radius', { ...normal, 'ulnar-styloid': 'base' })['Ulnar styloid']).toBe('Base: often goes with DRUJ dislocation and instability')
    expect(chips(study, 'radius', { ...normal, 'ulnar-styloid': 'tip' })['Ulnar styloid']).toBe('Tip: the commonest site')
    expect(chips(study, 'radius', { ...normal, 'ulnar-head': 'present' })['Ulnar head']).toBe('Usually unstable')
  })
})

describe('wrist X-ray rules: step 4', () => {
  // X4-2: the Herbert type from the shared logic, as in the Herbert calculator. X4-1, Sharma:
  // "avascular osteonecrosis is more common in proximal pole fractures"; "Scaphoid fractures with
  // displacement, comminution, and obliquity are mechanically unstable"; Okoro: the humpback
  // deformity "needs to be more aggressively managed due to high risk of nonunion ... may also be
  // associated with dorsal intercalated segment instability (DISI)".
  test('a scaphoid fracture', () => {
    const fracture = { ...scaphoidSeries, scaphoid: 'present' }
    expect(chips(study, 'scaphoid', { ...fracture, herbert: 'B2' }).Herbert).toBe('Type B2 (acute unstable)')
    expect(chips(study, 'scaphoid', { ...fracture, herbert: 'A1' }).Herbert).toBe('Type A1 (acute stable)')
    expect(chips(study, 'scaphoid', { ...fracture, herbert: 'B3' })['Proximal pole']).toBe('Osteonecrosis is more common')
    expect(chips(study, 'scaphoid', { ...fracture, 'scaphoid-features': ['displaced'] }).Unstable).toBe('Displaced or comminuted: mechanically unstable; non-union is more common when displaced')
    expect(chips(study, 'scaphoid', { ...fracture, 'scaphoid-features': ['humpback'] }).Humpback).toBe('High risk of non-union; can go with DISI')
    expect(impressionOf({ ...fracture, herbert: 'B2', 'scaphoid-features': ['displaced'] })).toBe('Scaphoid fracture, Herbert type B2 (acute unstable): complete waist fracture; displaced.')
  })

  // X4-6 (ACR Variant 2) and X4-5, Mallee: "Summary sensitivity and specificity of CT were 0.72 ...
  // and 0.99 ...; for MRI, these were 0.88 ... and 1.00".
  test('the occult fracture chip by study', () => {
    expect(chips(study, 'scaphoid', scaphoidSeries)['Occult fracture']).toBe('Not excluded: ACR next, MRI 8, repeat films at 10–14 days 8, CT 7')
    expect(chips(study, 'scaphoid', repeat)['Occult fracture']).toBe('Still not excluded: MRI 88% and CT 72% sensitive, 100% and 99% specific')
    expect(chips(study, 'scaphoid', normal)['Occult fracture']).toBeUndefined()
  })

  // X4-3, the shared logic's B4: "trans-scaphoid perilunate fracture-dislocation".
  test('Herbert B4 and the perilunate injury agree', () => {
    expect(report(study, { ...normal, scaphoid: 'present', herbert: 'B4' }).warnings)
      .toContain('Herbert B4 (trans-scaphoid perilunate fracture-dislocation) is entered, but no perilunate injury is.')
    expect(report(study, { ...normal, axis: 'capitate-dorsal', scaphoid: 'present', herbert: 'B2', perilunate: 'present' }).warnings)
      .toContain('A scaphoid fracture with a perilunate injury is entered as Herbert B2: Herbert B4 is the trans-scaphoid perilunate fracture-dislocation.')
  })
})

describe('wrist X-ray rules: step 5', () => {
  // X5-1: the Mayfield stage from the shared logic, as in the Mayfield calculator ("Scapholunate
  // ligament disrupted (or a scaphoid fracture in its place)?"). X5-2, Okoro: in stage III "Neither the
  // capitate nor lunate is aligned with the distal radius, often referred to as a midcarpal
  // dislocation".
  test('the Mayfield stage from steps 2, 4 and 5', () => {
    const stage = (values: Values) => chips(study, 'carpus', { ...normal, perilunate: 'present', ...values }).Mayfield
    expect(stage({ 'sl-gap': '4' })).toBe('Stage I')
    expect(stage({ 'sl-gap': '4', axis: 'capitate-dorsal' })).toBe('Stage II')
    expect(stage({ scaphoid: 'present', axis: 'capitate-dorsal' })).toBe('Stage II')
    expect(stage({ 'sl-gap': '4', axis: 'midcarpal' })).toBe('Stage III')
    expect(stage({ 'sl-gap': '4', axis: 'capitate-dorsal', lt: 'yes' })).toBe('Stage III')
    expect(stage({ 'sl-gap': '4', axis: 'lunate-volar', lt: 'yes' })).toBe('Stage IV')
    // No stage without a perilunate injury entered, as in the wrist MRI study.
    expect(chips(study, 'carpus', { ...normal, 'sl-gap': '4' }).Mayfield).toBeUndefined()
  })

  // MF-5 (the shared logic): the stages are progressive.
  test('the stages are progressive', () => {
    expect(report(study, { ...normal, axis: 'lunate-volar', perilunate: 'present' }).warnings)
      .toContain('Mayfield stage IV is entered, but the injuries of the earlier stages (I, III) are not; the stages are progressive.')
    expect(report(study, { ...normal, perilunate: 'present' }).warnings)
      .toContain('A perilunate injury is entered, but no scapholunate widening, scaphoid fracture or dislocation on the lateral: check the arcs and the lateral.')
  })

  // X5-4, Sharma: "greater arc injuries and are twice as frequent as lesser arc injuries ...
  // Trans-scaphoid perilunate dislocation is the most common pattern". X5-3, Sharma: carpal
  // dislocations "require CT for detailed evaluation and operative planning".
  test('greater arc and CT', () => {
    const values = { ...normal, axis: 'capitate-dorsal', scaphoid: 'present', perilunate: 'present' }
    expect(chips(study, 'carpus', values)['Greater arc']).toBe('Through bone: trans-scaphoid perilunate fracture-dislocation is the commonest pattern')
    expect(chips(study, 'carpus', values).CT).toBe('Carpal dislocation: CT for the fractures and alignment, for planning')
    expect(impressionOf({ ...values, 'arc-fractures': ['radial-styloid'] })).toContain('Greater arc fractures of the radial styloid.')
  })

  // X5-5, Sharma: triquetral fractures "are best detected on the oblique or lateral view"; Okoro:
  // "Dorsal cortex fractures ... represent avulsions of the combined attachment of the dorsal
  // radiocarpal and dorsal intercarpal ligaments"; Shahabpour: "almost never associated with carpal
  // instability". X5-6, Okoro: "Triquetral body fractures ... are often associated with intrinsic
  // ligamentous injury, such as a lunotriquetral tear." X5-7, Sharma: "A carpal tunnel radiograph is
  // used to demonstrate fractures of the hook of the hamate ... CT confidently demonstrates the
  // fracture", and hamate body fractures "are commonly associated with fractures of the fourth and
  // fifth metacarpal bases".
  test('the other carpal bones', () => {
    const carpal = (value: string) => chips(study, 'carpus', { ...normal, 'carpal-other': [value] })
    expect(carpal('triquetrum-dorsal')['Dorsal triquetrum']).toBe('Best seen on the lateral; a dorsal ligament avulsion, almost never with carpal instability')
    expect(carpal('triquetrum-body')['Triquetral body']).toBe('Often with an intrinsic ligament (lunotriquetral) injury')
    expect(carpal('hamate-hook')['Hook of hamate']).toBe('Carpal tunnel view or CT; do not mistake a bipartite hamate')
    expect(carpal('hamate-body')['Hamate body']).toBe('Check the fourth and fifth metacarpal bases and carpometacarpal joints')
  })
})

describe('wrist X-ray rules: step 6', () => {
  // X6-1, Sharma: "obliteration of the pronator quadratus fat stripe ... may provide a clue to the
  // diagnosis in subtle fractures"; "The scaphoid fat stripe may be obliterated in occult scaphoid
  // fractures." X6-2, Annamalai: "The sensitivity and specificity for an abnormal scaphoid fat stripe
  // was 50%. The sensitivity and specificity for an abnormal pronator fat stripe was 26 and 70%";
  // Fallahi: "The overall sensitivity and specificity of a positive PQ sign ... were 65 and 69 %".
  test('the fat stripes are clues, not fractures', () => {
    expect(chips(study, 'soft-tissues', { ...normal, 'pq-fat': 'abnormal' })['Pronator quadratus']).toBe('A clue to a subtle fracture, but only 26–65% sensitive')
    expect(chips(study, 'soft-tissues', { ...radius, 'pq-fat': 'abnormal' })['Pronator quadratus']).toBeUndefined()
    expect(chips(study, 'soft-tissues', { ...normal, 'scaphoid-fat': 'abnormal' })['Scaphoid fat stripe']).toBe('May mean an occult fracture, but 50% sensitive and 50% specific')
    expect(chips(study, 'soft-tissues', { ...scaphoidSeries, 'scaphoid-fat': 'normal' })['Scaphoid fat stripe']).toBe('A normal stripe does not exclude a fracture')
    expect(impressionOf({ ...normal, 'pq-fat': 'abnormal' })).toBe('Pronator quadratus fat stripe obliterated or displaced, with no fracture seen.')
    expect(chips(study, 'soft-tissues', { ...normal, swelling: 'present' }).Swelling).toBe('A clue to a subtle fracture')
  })
})

describe('wrist X-ray rules: the impression', () => {
  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...radius, 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: distal radius fracture.')
    expect(report(study, { ...normal, 'sl-gap': '5', 'impression-negatives': ['no-malalignment'] }).warnings)
      .toContain('Impression says no carpal or DRUJ malalignment, but these are entered: widened scapholunate interval.')
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-malalignment'] }).warnings).toEqual([])
  })
})
