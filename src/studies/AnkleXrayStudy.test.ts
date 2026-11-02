import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { AnkleXrayStudyPage } from './AnkleXrayStudy'

const study = studyOf(AnkleXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-ankle-xray-sources.md (AX claims), each read in its paper's
 * abstract, its open full text or the ACR's published ratings before it went in. If a case has to
 * change, say in that commit why the old expectation was wrong.
 */

describe('ankle X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['history', 'views', 'alignment', 'bones', 'soft-tissues', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.references).toHaveLength(25)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi)).size).toBe(study.references.length)
  })
})

/** A complete normal series after an inversion injury that met the Ottawa ankle rule. */
const normal: Values = {
  side: 'Right', mechanism: 'inversion', reason: 'ottawa', ottawa: ['malleolar-pain', 'lateral-tender'], 'proximal-fibula': 'not-tender',
  views: ['ap', 'mortise', 'lateral'], mortise: 'congruent',
  lateral: 'none', medial: 'none', posterior: 'none', fibula: 'not-imaged', dome: 'normal', 'lateral-process': 'none', fifth: 'intact',
  effusion: 'none',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('ankle X-ray report: steps', () => {
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
      'Side not stated', 'Reason for the film not stated', 'Views not stated', 'Ankle mortise not stated',
      'Lateral malleolus (distal fibula) not stated', 'Medial malleolus not stated', 'Posterior malleolus not stated',
      'Talar dome not stated', 'Lateral process of the talus not stated', 'Base of the fifth metatarsal not stated',
      'Ankle joint effusion (lateral view) not stated',
    ])
  })
})

describe('ankle X-ray report: whole cases', () => {
  test('a normal series', () => {
    const text = report(study, normal).text
    expect(text).toContain('Clinical: right ankle, inversion injury, Ottawa ankle rule met (pain in the malleolar zone; bone tenderness: posterior edge or tip of the lateral malleolus (distal 6 cm))')
    expect(text).toContain('Views: AP, mortise and lateral')
    expect(impressionOf(normal)).toBe('No fracture or malalignment seen.')
  })

  test('an isolated Weber B fracture', () => {
    const values = { ...normal, lateral: 'present', weber: 'B', 'mcs-view': 'non-weight', mcs: '3', scs: '3', effusion: 'present', 'effusion-size': '10', swelling: 'lateral' }
    const text = report(study, values).text
    expect(text).toContain('Lateral malleolus: fracture, at the level of the syndesmosis (Weber B)')
    expect(text).toContain('Medial side: medial clear space 3 mm, on the non-weight-bearing mortise, superior clear space 3 mm')
    expect(text).toContain('Soft tissues: joint effusion, 10 mm (anterior plus posterior capsular distension); soft-tissue swelling over the lateral malleolus')
    expect(impressionOf(values)).toBe('Right Weber B fracture of the lateral malleolus.')
  })

  test('a trimalleolar fracture with talar shift', () => {
    const values = { ...normal, mortise: 'shift', lateral: 'present', weber: 'B', medial: 'present', posterior: 'present', 'posterior-share': '30' }
    expect(impressionOf(values)).toBe([
      'Right trimalleolar fracture: Weber B fibular fracture, medial and posterior malleoli.',
      'Talar shift or tilt: the mortise is not congruent.',
      'CT is suggested to show the posterior malleolar fragment.',
    ].join('\n'))
  })

  test('a medial malleolar fracture with syndesmotic widening and no fibular fracture at the ankle', () => {
    const values = { ...normal, mechanism: 'external', medial: 'present', tfcs: '7' }
    expect(impressionOf(values)).toBe([
      'Right fracture of the medial malleolus.',
      'Tibiofibular clear space widened (7 mm), suggesting syndesmotic injury.',
      'Radiographs of the whole fibula are suggested to look for a Maisonneuve fracture.',
    ].join('\n'))
    // Once the whole leg is imaged and the fibula is broken, the impression names the Maisonneuve injury.
    const imaged = { ...values, views: ['ap', 'mortise', 'lateral', 'leg'], fibula: 'fracture' }
    expect(impressionOf(imaged)).toContain('Proximal fibular fracture: Maisonneuve injury. CT is suggested.')
    expect(impressionOf(imaged)).not.toContain('Radiographs of the whole fibula')
  })

  test('a zone 1 fracture of the fifth metatarsal', () => {
    const values = { ...normal, ottawa: ['midfoot-pain', 'fifth-tender'], fifth: 'fracture', 'fifth-zone': '1' }
    expect(report(study, values).text).toContain('Base of the fifth metatarsal: fracture, zone 1: tuberosity, proximal to the 4–5 joint')
    expect(impressionOf(values)).toBe('Fracture of the base of the fifth metatarsal, zone 1 (tuberosity avulsion).')
  })

  test('a large effusion with no fracture', () => {
    const values = { ...normal, effusion: 'present', 'effusion-size': '16' }
    expect(impressionOf(values)).toBe('Large ankle effusion (16 mm) with no fracture seen: an occult fracture is possible. Consider CT.')
  })

  test('hidden answers write nothing', () => {
    // A Weber level and a zone with no fracture entered, and Ottawa findings with the rules not applied.
    const text = report(study, { ...normal, reason: 'excluded', weber: 'C', 'fifth-zone': '3' }).text
    expect(text).not.toMatch(/Weber|zone|tenderness/i)
  })
})

describe('ankle X-ray rules', () => {
  // AX1-3, Bachmann (figure 1): "A series of ankle x ray films is required only if there is any pain
  // in malleolar zone and any of these findings: Bone tenderness at A [posterior edge or tip of lateral
  // malleolus - 6 cm]; Bone tenderness at B; Inability to bear weight both immediately and in
  // emergency department"; the mid-foot zone with tenderness at the base of the fifth metatarsal or the
  // navicular. AX1-5, ACR ratings table, variant 1: "Radiography ankle Usually appropriate ... 9";
  // variant 3 (exclusionary criteria): radiography 9, "CT ankle without IV contrast May be appropriate
  // ... 5".
  test('the Ottawa ankle and foot rules', () => {
    expect(chips(study, 'history', normal)['Ottawa ankle rule']).toBe('Met: ankle series indicated (ACR 9)')
    expect(chips(study, 'history', { ...normal, ottawa: ['malleolar-pain', 'no-weight'] })['Ottawa ankle rule']).toBe('Met: ankle series indicated (ACR 9)')
    // Tenderness without pain in the zone does not meet the rule.
    expect(chips(study, 'history', { ...normal, ottawa: ['lateral-tender'] })['Ottawa ankle rule']).toBeUndefined()
    expect(chips(study, 'history', { ...normal, ottawa: ['lateral-tender'] })['Ottawa rules']).toBe('Neither rule is met by the findings entered: state why the film was taken')
    expect(chips(study, 'history', { ...normal, ottawa: ['midfoot-pain', 'navicular-tender'] })['Ottawa foot rule']).toBe('Met: foot series indicated')
    expect(chips(study, 'views', { ...normal, ottawa: ['midfoot-pain', 'fifth-tender'] })['Foot series']).toBe('The Ottawa foot rule is met: a foot series is needed')
    expect(chips(study, 'history', { ...normal, reason: 'excluded' }).ACR).toBe('Ottawa rules cannot be applied: radiographs 9, CT 5')
  })

  // AX1-6: Chloros, zone 1 "usually occur as inversion injuries"; Chan, "should be suspected when
  // there is a history of inversion with dorsiflexion ... Results of plain films are negative up to
  // 40% of the time"; Wong, "external rotation is applied to a pronated or supinated foot";
  // Melenevsky, talar fractures "commonly result from high-energy trauma". AX1-7: Ziegler, "additional
  // pain in the proximal lower leg ... a complete image of the affected lower leg should always be
  // performed"; Taweel, "the proximal fibula should be examined in all patients with ankle injury".
  test('the mechanism and the proximal fibula', () => {
    expect(chips(study, 'history', normal).Inversion).toBe('Check the base of the fifth metatarsal: zone 1 avulsions usually follow inversion')
    expect(chips(study, 'history', { ...normal, mechanism: 'inversion-df' })['Lateral process of the talus']).toBe('Suspect it after inversion with dorsiflexion: plain films negative in up to 40%')
    expect(chips(study, 'history', { ...normal, mechanism: 'external' })['External rotation']).toBe('The Maisonneuve mechanism: look at the proximal fibula')
    expect(chips(study, 'history', { ...normal, mechanism: 'high' })['High energy']).toBe('Talar fractures commonly follow high-energy trauma')
    expect(chips(study, 'history', { ...normal, 'proximal-fibula': 'tender' })['Proximal fibula']).toBe('Tender: image the whole lower leg')
    expect(chips(study, 'history', { ...normal, 'proximal-fibula': 'not-stated' })['Proximal fibula']).toBe('Should be examined in every ankle injury (Maisonneuve)')
  })

  // AX2-1, de-las-Heras Romero: "Radiographic imaging should include three views of the ankle:
  // anteroposterior (AP); mortise; and lateral."
  test('the three-view series', () => {
    expect(chips(study, 'views', normal)['Standard series']).toBe('AP, mortise and lateral')
    expect(chips(study, 'views', { ...normal, views: ['ap', 'lateral'] })['Standard series']).toBe('AP, mortise and lateral; missing mortise')
  })

  // AX3-3, Beumer: "The medial clear space was smaller than or equal to the superior clear space in
  // all radiographs ... a medial clear space larger than a superior clear space is indicative of
  // deltoid injury." AX3-4, Park: "a medial clear space of > or =5 mm was the most reliable predictor
  // of deep deltoid ligament status" (dorsiflexion-external rotation stress).
  test('the medial clear space against the superior, and on stress', () => {
    expect(chips(study, 'alignment', { ...normal, mcs: '5', scs: '3' })['Medial clear space']).toBe('Wider than the superior clear space: points to a deltoid injury')
    expect(chips(study, 'alignment', { ...normal, mcs: '3', scs: '3' })['Medial clear space']).toBe('No wider than the superior clear space')
    expect(chips(study, 'alignment', { ...normal, 'mcs-view': 'stress', mcs: '5' })['Stress view']).toBe('5 mm or more: most predictive of deep deltoid disruption')
    expect(chips(study, 'alignment', { ...normal, 'mcs-view': 'stress', mcs: '4.9' })['Stress view']).toBe('Under 5 mm, the most predictive threshold for deep deltoid disruption')
    // With no fibular fracture at the ankle, a widened medial clear space also sends the reader up the
    // fibula (AX4-6).
    expect(impressionOf({ ...normal, 'mcs-view': 'stress', mcs: '6' })).toBe([
      'Medial clear space widened (6 mm), suggesting deltoid ligament injury.',
      'Radiographs of the whole fibula are suggested to look for a Maisonneuve fracture.',
    ].join('\n'))
    expect(impressionOf({ ...normal, lateral: 'present', weber: 'B', 'mcs-view': 'stress', mcs: '6' })).toBe([
      'Right Weber B fracture of the lateral malleolus.',
      'Medial clear space widened (6 mm), suggesting deltoid ligament injury.',
    ].join('\n'))
  })

  // AX3-5, Rydberg: "Often MCS > 4 mm was used ... However, there is no scientific basis in picking
  // > 4 mm as the cutoff"; Gregersen: "Stability was defined by MCS < 5.0 mm and a difference of
  // ≤ 1.0 mm when comparing the uninjured and the weight-bearing radiographs."
  test('4 mm on non-weight-bearing views, and the weight-bearing criteria', () => {
    expect(chips(study, 'alignment', { ...normal, 'mcs-view': 'non-weight', mcs: '4.5' })['Over 4 mm']).toBe('A common cut-off with no scientific basis on non-weight-bearing views; weight-bearing views judge congruence')
    expect(chips(study, 'alignment', { ...normal, 'mcs-view': 'non-weight', mcs: '4' })['Over 4 mm']).toBeUndefined()
    const weight = { ...normal, 'mcs-view': 'weight' }
    expect(chips(study, 'alignment', { ...weight, mcs: '4.9', 'mcs-other': '3.9' })['Weight-bearing']).toBe('Stable: under 5.0 mm and within 1.0 mm of the other side')
    expect(chips(study, 'alignment', { ...weight, mcs: '4.9', 'mcs-other': '3.8' })['Weight-bearing']).toBe('Not stable by Gregersen\'s criteria (under 5.0 mm and within 1.0 mm of the other side)')
    expect(chips(study, 'alignment', { ...weight, mcs: '5' })['Weight-bearing']).toBe('Not stable by Gregersen\'s criteria (under 5.0 mm and within 1.0 mm of the other side)')
    expect(chips(study, 'alignment', { ...weight, mcs: '4' })['Weight-bearing']).toBe('Under 5.0 mm; compare with the other side (within 1.0 mm)')
  })

  // AX3-1, Harper and Keller: normal "(1) a tibiofibular 'clear space' on the anterior-posterior and
  // mortise views of less than approximately 6 mm; (2) tibiofibular overlap on the anterior-posterior
  // view of greater than approximately 6 mm ...; (3) tibiofibular overlap on the mortise view of
  // greater than approximately 1 mm." AX3-3, Beumer: "one-sided traumatic absence of tibiofibular
  // overlap may be an indication of syndesmotic injury".
  test('the tibiofibular clear space and overlap', () => {
    expect(chips(study, 'alignment', { ...normal, tfcs: '6' })['Tibiofibular clear space']).toBe('6 mm or more: syndesmotic widening')
    expect(chips(study, 'alignment', { ...normal, tfcs: '5.9' })['Tibiofibular clear space']).toBe('Under 6 mm: normal')
    expect(chips(study, 'alignment', { ...normal, 'tfo-ap': '6' })['Overlap, AP']).toBe('6 mm or less: below the normal; it changes with rotation')
    expect(chips(study, 'alignment', { ...normal, 'tfo-ap': '6.5' })['Overlap, AP']).toBeUndefined()
    expect(chips(study, 'alignment', { ...normal, 'tfo-mortise': '1' })['Overlap, mortise']).toBe('1 mm or less: below the normal; it changes with rotation')
    expect(chips(study, 'alignment', { ...normal, 'tfo-mortise': '0' })['Overlap, mortise']).toBe('None: absent overlap on one side may mean syndesmotic injury')
  })

  // AX4-1, Fonseca: "type A (below the syndesmosis level), type B (at the syndesmosis level), and type
  // C (above the syndesmosis)"; Pflüger: AO/OTA "Type A (infra-syndesmotic), B (trans-syndesmotic) and
  // C (supra-syndesmotic)".
  test('Weber A, B or C by the level of the fibular fracture', () => {
    expect(chips(study, 'bones', { ...normal, lateral: 'present', weber: 'A' }).Weber).toBe('A: below the syndesmosis (AO 44A)')
    expect(chips(study, 'bones', { ...normal, lateral: 'present', weber: 'B' }).Weber).toBe('B: at the level of the syndesmosis (AO 44B)')
    expect(chips(study, 'bones', { ...normal, lateral: 'present', weber: 'C' }).Weber).toBe('C: above the syndesmosis (AO 44C)')
    expect(impressionOf({ ...normal, lateral: 'present', weber: 'C' })).toBe('Right Weber C fracture of the lateral malleolus.')
    expect(report(study, { ...normal, lateral: 'present' }).warnings).toContain('Lateral malleolar fracture without its level: Weber A, B or C needs it.')
  })

  // AX4-3, Rydberg: on non-weightbearing images "it is challenging to distinguish ... B1s from B2.1";
  // AX2-3: "present with an MCS of up to 7 mm—are eligible for weightbearing radiographs"; "The
  // recommended timing for weightbearing radiographs is 4–10 days post-injury."
  test('an isolated Weber B: weight-bearing views', () => {
    const b = { ...normal, lateral: 'present', weber: 'B' }
    const chip = 'B1 and B2 look alike on these views: weight-bearing radiographs at 4–10 days decide (medial clear space up to 7 mm, not dislocated)'
    expect(chips(study, 'bones', { ...b, mcs: '7' })['Isolated Weber B']).toBe(chip)
    expect(chips(study, 'bones', { ...b, mcs: '7.5' })['Isolated Weber B']).toBeUndefined()
    expect(chips(study, 'bones', { ...b, mortise: 'dislocated' })['Isolated Weber B']).toBeUndefined()
    expect(chips(study, 'bones', { ...b, medial: 'present' })['Isolated Weber B']).toBeUndefined()
  })

  // AX4-4, Pflüger: "A trimalleolar ankle fracture is considered unstable ... Computed tomography is
  // important for the operative planning by providing an elaborated view of the posterior malleolus."
  // AX4-5, Ferries: "54% of the plain radiographic readings revealed > 25% error"; Pflüger: "the
  // involvement of one-quarter to one-third of the articular surface on the lateral radiograph were
  // critical indications for operative treatment".
  test('the posterior malleolus and trimalleolar fractures', () => {
    const tri = { ...normal, lateral: 'present', weber: 'B', medial: 'present', posterior: 'present' }
    expect(chips(study, 'bones', tri).Trimalleolar).toBe('Considered unstable; CT shows the posterior malleolus')
    expect(chips(study, 'bones', tri)['Posterior malleolus']).toBe('The lateral view misjudges the fragment (54% of readings off by over 25%): CT')
    expect(chips(study, 'bones', { ...tri, 'posterior-share': '25' })['Over a quarter']).toBe('The historical threshold for fixation, measured on a view that misjudges it')
    expect(chips(study, 'bones', { ...tri, 'posterior-share': '24' })['Over a quarter']).toBeUndefined()
  })

  // AX4-6, Wong: "Maisonneuve fractures should be suspected whenever there is lateral talar
  // displacement or tibiofibular widening without distal fibular fracture ... full-length tibiofibular
  // radiographs should be obtained"; Ziegler: "fracture of the medial malleolus without a visible distal
  // fibular fracture". AX4-7, Bartoníček: "always associated with rupture of the anterior and
  // interosseous tibiofibular ligaments. CT examination should be employed widely".
  test('Maisonneuve: look up the fibula', () => {
    const chip = 'Medial or syndesmotic injury without a distal fibular fracture, or a tender upper fibula: image the whole fibula (Maisonneuve)'
    expect(chips(study, 'bones', { ...normal, medial: 'present' })['Proximal fibula']).toBe(chip)
    expect(chips(study, 'bones', { ...normal, tfcs: '6' })['Proximal fibula']).toBe(chip)
    expect(chips(study, 'bones', { ...normal, mortise: 'shift' })['Proximal fibula']).toBe(chip)
    expect(chips(study, 'bones', { ...normal, 'proximal-fibula': 'tender' })['Proximal fibula']).toBe(chip)
    // A distal fibular fracture explains the medial injury; an imaged fibula answers the question.
    expect(chips(study, 'bones', { ...normal, medial: 'present', lateral: 'present', weber: 'B' })['Proximal fibula']).toBeUndefined()
    expect(chips(study, 'bones', { ...normal, medial: 'present', fibula: 'intact' })['Proximal fibula']).toBeUndefined()
    expect(chips(study, 'bones', { ...normal, fibula: 'fracture' }).Maisonneuve).toBe('Proximal fibular fracture: the anterior and interosseous tibiofibular ligaments are torn; CT')
  })

  // AX4-9, Walther: "about 50% of OLTs cannot be identified on plain x-rays"; ACR variant 5
  // (radiographs show fracture or potential osteochondral injury): MRI 9, CT 9. AX4-10, Chan: "a
  // computed tomographic scan is the imaging modality of choice".
  test('the talus', () => {
    expect(chips(study, 'bones', { ...normal, dome: 'lesion' })['Osteochondral lesion']).toBe('About half are not seen on radiographs; CT or MRI each rated 9')
    expect(impressionOf({ ...normal, dome: 'lesion', 'dome-site': 'medial' })).toBe('Osteochondral lesion of the medial talar dome. Consider CT or MRI.')
    expect(chips(study, 'bones', { ...normal, 'lateral-process': 'present' })['Lateral process']).toBe('CT is the imaging of choice')
    expect(chips(study, 'bones', { ...normal, mechanism: 'inversion-df' })['Lateral process']).toBe('Plain films are negative in up to 40%: CT if it is suspected')
    expect(impressionOf({ ...normal, 'lateral-process': 'present' })).toBe('Fracture of the lateral process of the talus. Consider CT.')
  })

  // AX4-12, Chloros (as on the fifth metatarsal page): "Zone 1 involves the tuberosity, Zone 2 the
  // 4–5 intermetatarsal articulation ..., and Zone 3 is within 1.5 cm"; "Fractures occurring at the
  // regions distal to Zone 3 are termed as 'Dancer's fractures'".
  test('the base of the fifth metatarsal', () => {
    const fifth = { ...normal, fifth: 'fracture' }
    expect(chips(study, 'bones', { ...fifth, 'fifth-zone': '1' })['Fifth metatarsal']).toBe('Zone 1: tuberosity avulsion')
    expect(chips(study, 'bones', { ...fifth, 'fifth-zone': '2' })['Fifth metatarsal']).toBe('Zone 2: Jones fracture')
    expect(chips(study, 'bones', { ...fifth, 'fifth-zone': '3' })['Fifth metatarsal']).toBe('Zone 3: proximal diaphyseal stress fracture')
    expect(chips(study, 'bones', { ...fifth, 'fifth-zone': 'distal' })['Fifth metatarsal']).toBe('Beyond zone 3: dancer\'s fracture')
    expect(impressionOf({ ...fifth, 'fifth-zone': '2' })).toBe('Fracture of the base of the fifth metatarsal, zone 2 (Jones fracture, into the 4–5 intermetatarsal joint).')
    // AX1-3: the base tender but not on the film.
    expect(chips(study, 'bones', { ...normal, fifth: 'not-included', ottawa: ['midfoot-pain', 'fifth-tender'] })['Fifth metatarsal base']).toBe('Not in view but tender: the Ottawa foot rule calls for a foot series')
  })

  // AX4-2, York: "Talar (21.9%), Weber A (17.0%), and 5th metatarsal fractures (10.5%) were also
  // disproportionately missed"; navicular 40.0%, cuboid 33.3%.
  test('what is missed most often', () => {
    expect(chips(study, 'bones', normal)['Look again']).toBe('Most often missed: Weber A (17%), talar (22%), navicular (40%), cuboid (33%) and fifth metatarsal (10.5%) fractures')
    expect(chips(study, 'bones', { ...normal, lateral: 'present', weber: 'B' })['Look again']).toBeUndefined()
  })

  // AX5-1, Clark 1995: "An ankle effusion of 13 mm or greater in total capsular distension has a
  // positive predictive value of 82% for occult fracture". AX5-2, Clark 1996: "The positive predictive
  // value of an effusion 15 mm or greater was 83%"; "Fracture sites included ... talus (n = 7)".
  test('the effusion, at 13 and 15 mm', () => {
    const effusion = { ...normal, effusion: 'present' }
    expect(chips(study, 'soft-tissues', { ...effusion, 'effusion-size': '12.5' }).Effusion).toBe('Under 13 mm: below both thresholds for an occult fracture')
    expect(chips(study, 'soft-tissues', { ...effusion, 'effusion-size': '13' }).Effusion).toBe('13 mm or more: occult fracture in 82% (Clark 1995); under Clark 1996\'s 15 mm')
    expect(chips(study, 'soft-tissues', { ...effusion, 'effusion-size': '15' }).Effusion).toBe('15 mm or more: occult fracture in 83% (Clark 1996); 13 mm or more, 82% (Clark 1995)')
    expect(chips(study, 'soft-tissues', { ...effusion, 'effusion-size': '13' })['No fracture seen']).toBe('Consider CT: occult fractures were often in the talus')
    expect(chips(study, 'soft-tissues', { ...effusion, 'effusion-size': '13', lateral: 'present', weber: 'A' })['No fracture seen']).toBeUndefined()
    expect(impressionOf({ ...effusion, 'effusion-size': '12' })).toBe('No fracture or malalignment seen.')
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...normal, lateral: 'present', weber: 'B', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but one is entered (lateral malleolar fracture).')
    expect(report(study, { ...normal, tfcs: '7', 'impression-negatives': ['congruent'] }).warnings)
      .toContain('Impression says the mortise is congruent, but malalignment or widening is entered.')
    expect(report(study, { ...normal, effusion: 'present', 'impression-negatives': ['no-effusion'] }).warnings)
      .toContain('Impression says no joint effusion, but an effusion is entered.')
  })
})
