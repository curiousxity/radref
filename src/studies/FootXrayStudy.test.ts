import { describe, expect, test } from 'vitest'
import { myersonSentence } from '../logic/myerson'
import { hawkinsSentence } from '../logic/hawkins'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { FootXrayStudyPage } from './FootXrayStudy'

const study = studyOf(FootXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-foot-xray-sources.md (FX claims), each read in its paper's
 * abstract, its open full text or the ACR's published ratings before it went in. If a case has to
 * change, say in that commit why the old expectation was wrong.
 */

describe('foot X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['history', 'views', 'alignment', 'midfoot', 'metatarsals', 'hindfoot', 'soft-tissues', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.references).toHaveLength(27)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi)).size).toBe(study.references.length)
  })
})

/** A complete normal weight-bearing series after a twisting injury that met the Ottawa foot rule. */
const normal: Values = {
  side: 'Right', mechanism: 'inversion', 'ottawa-use': 'applied', ottawa: ['midfoot-pain', 'fifth-tender'],
  views: 'complete', 'weight-bearing': 'yes', tmt: 'aligned',
  lisfranc: 'none', navicular: 'none', fifth: 'none', calcaneus: 'none', 'talar-neck': 'none',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('foot X-ray report: steps', () => {
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
      'Side not stated', 'Ottawa foot rule not stated', 'Views not stated', 'Tarsometatarsal alignment not stated',
      'Lisfranc injury not stated', 'Navicular fracture not stated', 'Fifth metatarsal fracture not stated',
      'Calcaneal fracture not stated', 'Talar neck fracture not stated',
    ])
  })
})

describe('foot X-ray report: whole cases', () => {
  test('a normal series', () => {
    const text = report(study, normal).text
    expect(text).toContain('Clinical: right foot, twisting or inversion')
    expect(text).toContain('Ottawa foot rule: met (pain in the midfoot zone, bone tenderness at the base of the fifth metatarsal)')
    expect(text).toContain('Views: AP, oblique and lateral, weight-bearing')
    expect(impressionOf(normal)).toBe('No fracture or tarsometatarsal malalignment.')
  })

  test('a Myerson type C2 fracture-dislocation with a fleck sign', () => {
    const values = { ...normal, tmt: 'malaligned', malalignment: ['m2'], lisfranc: 'dislocation', 'myerson-first': 'medial', 'myerson-lesser': 'all', fleck: 'yes' }
    expect(impressionOf(values)).toBe([
      `Right ${myersonSentence('C2').charAt(0).toLowerCase()}${myersonSentence('C2').slice(1)}`,
      'Fleck sign: avulsion of the Lisfranc ligament.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('a subtle Lisfranc injury', () => {
    const values = { ...normal, c1m2: '3', lisfranc: 'subtle' }
    expect(impressionOf(values)).toBe('Right Lisfranc injury without dislocation: a medial cuneiform to second metatarsal gap of 3 mm.')
  })

  test('a zone 2 fifth metatarsal fracture', () => {
    const values = { ...normal, fifth: 'zone2', torg: 'I' }
    expect(impressionOf(values)).toBe('Right fifth metatarsal fracture, zone 2 (Jones fracture, into the fourth-fifth intermetatarsal joint), Torg type I.')
  })

  test('an intra-articular calcaneal fracture and a Hawkins type II talar neck fracture', () => {
    const values = { ...normal, mechanism: 'fall', bohler: '12', calcaneus: 'intra', 'talar-neck': 'present', 'talar-displaced': 'displaced', 'talar-joints': ['subtalar'] }
    expect(impressionOf(values)).toBe([
      "Right intra-articular calcaneal fracture, Böhler's angle 12°.",
      'Consider CT to type it (Sanders) and plan treatment.',
      `Right ${hawkinsSentence('II').charAt(0).toLowerCase()}${hawkinsSentence('II').slice(1)}`,
    ].join('\n'))
  })

  test('hidden answers write nothing', () => {
    const text = report(study, { ...normal, 'myerson-first': 'medial', 'myerson-lesser': 'all', torg: 'III', 'talar-joints': ['ankle'], 'stress-site': 'second metatarsal' }).text
    expect(text).not.toMatch(/Myerson|Torg|ankle joint|second metatarsal shaft|Stress/)
  })
})

describe('foot X-ray rules', () => {
  // FX1-3, Bessen (box 1): "A foot radiographic series is required only if there is pain in the
  // mid-foot zone and any of these findings: Bone tenderness at the base of the fifth metatarsal, or
  // Bone tenderness over the navicular bone, or Inability to bear weight both immediately and in the
  // emergency department". FX1-6, ACR ratings: Ottawa positive, radiography foot 9; exclusionary
  // criteria, 9; outside the rules' areas, 9.
  test('the Ottawa foot rule as the reason for the film', () => {
    const rule = (ottawa: string[], extra: Values = {}) => chips(study, 'history', { 'ottawa-use': 'applied', ottawa, ...extra })['Ottawa foot rule']
    expect(rule(['midfoot-pain', 'navicular-tender'])).toBe('Met: a foot series is indicated (ACR 9)')
    expect(rule(['midfoot-pain', 'weight'])).toBe('Met: a foot series is indicated (ACR 9)')
    expect(rule(['midfoot-pain'])).toBe('Not met: say why the film was taken')
    expect(rule(['fifth-tender'])).toBe('Not met: say why the film was taken')
    expect(rule([], { forefoot: 'yes' })).toBe('Not met; an injury outside its zone: foot radiographs (ACR 9)')
    expect(chips(study, 'history', { 'ottawa-use': 'excluded' })['Ottawa foot rule']).toBe('Could not be used: foot radiographs (ACR 9)')
  })

  // FX1-7, Moracia-Ochagavía: "The following cases are highly suggestive of a Lisfranc lesion: 1)
  // plantar ecchymosis at the level of the midfoot". FX2-1, Hammad: "weight-bearing radiographs are
  // essential for detecting subtle injuries"; FX2-2, ACR: "Radiography foot with weightbearing ... 8".
  test('a suspected Lisfranc injury', () => {
    expect(chips(study, 'history', { signs: ['ecchymosis'] })['Plantar ecchymosis']).toBe('Highly suggestive of a Lisfranc injury')
    expect(chips(study, 'views', { mechanism: 'plantarflexed', 'weight-bearing': 'no' })['Weight-bearing']).toBe('Essential for a subtle Lisfranc injury (ACR 8)')
    expect(chips(study, 'views', { mechanism: 'plantarflexed', 'weight-bearing': 'yes' })['Weight-bearing']).toBeUndefined()
    expect(chips(study, 'views', { mechanism: 'inversion', 'weight-bearing': 'no' })['Weight-bearing']).toBeUndefined()
  })

  // FX2-3, Sposeto: radiography "should include lateral, anteroposterior, and oblique foot views,
  // along with axial views of the calcaneus".
  test('axial calcaneal views after a fall', () => {
    expect(chips(study, 'views', { mechanism: 'fall' }).Calcaneus).toBe('Add axial views of the calcaneus')
    expect(chips(study, 'views', { mechanism: 'fall', 'extra-views': ['axial'] }).Calcaneus).toBeUndefined()
  })

  // FX3-1, Crone: "The distance between the medial cuneiform and the second metatarsal base should
  // measure ≤ 2 mm; higher measurements suggest Lisfranc ligament insufficiency". FX3-3, Hammad: "a
  // medial cuneiform to second metatarsal (C1–M2) gap > 3 mm NWB or > 5 mm weight-bearing".
  test('the medial cuneiform to second metatarsal gap', () => {
    expect(chips(study, 'alignment', { c1m2: '2' })['C1–M2']).toBe('2 mm: 2 mm or less; compare with the other foot if still suspected')
    expect(chips(study, 'alignment', { c1m2: '2.5' })['C1–M2']).toBe('2.5 mm: over 2 mm suggests Lisfranc ligament insufficiency')
    expect(chips(study, 'alignment', { c1m2: '3', 'weight-bearing': 'no' })['Hammad threshold']).toBeUndefined()
    expect(chips(study, 'alignment', { c1m2: '3.5', 'weight-bearing': 'no' })['Hammad threshold']).toBe('Over the proposed 3 mm without weight-bearing')
    expect(chips(study, 'alignment', { c1m2: '4', 'weight-bearing': 'yes' })['Hammad threshold']).toBeUndefined()
    expect(chips(study, 'alignment', { c1m2: '6', 'weight-bearing': 'yes' })['Hammad threshold']).toBe('Over the proposed 5 mm with weight-bearing')
  })

  // FX3-4, Crone: "generally accepted normal values range from 25° to 40° ... a normal Böhler's angle
  // does not exclude a non-displaced calcaneal fracture"; FX3-6, Sposeto: "Normal values range from
  // 20 to 40°". FX3-5, Crone: Gissane "120°–145°", "> 145° indicates calcaneal depression at
  // subtalar joint", "a wide range of normal values from 95° to 150°".
  test("Böhler's angle and the critical angle of Gissane", () => {
    expect(chips(study, 'alignment', { bohler: '24' })["Böhler's angle"]).toBe("Under 25°: posterior facet depressed (within Sposeto's 20° to 40°)")
    expect(chips(study, 'alignment', { bohler: '15' })["Böhler's angle"]).toBe('Under 25°: posterior facet depressed')
    expect(chips(study, 'alignment', { bohler: '25' })["Böhler's angle"]).toBe('Within 25° to 40°; a normal angle does not exclude an undisplaced fracture')
    expect(chips(study, 'alignment', { bohler: '41' })["Böhler's angle"]).toBe('Above 25° to 40°')
    expect(chips(study, 'alignment', { gissane: '145' }).Gissane).toBe('Within 120° to 145°')
    expect(chips(study, 'alignment', { gissane: '150' }).Gissane).toBe('Over 145°: depression at the subtalar joint')
    expect(chips(study, 'alignment', { gissane: '100' }).Gissane).toBe('Under 120° to 145°; normal values from 95° to 150° are reported')
  })

  // FX4-1, the shared Myerson logic (Tzatzairis: C2 "Divergent, complete dislocation involving M1
  // and all of the lateral metatarsals"; Gupta for B2's alignment of the first metatarsal).
  test('the Myerson type, from the calculator logic', () => {
    const dislocation = { ...normal, lisfranc: 'dislocation', tmt: 'malaligned' }
    expect(chips(study, 'midfoot', { ...dislocation, 'myerson-first': 'none', 'myerson-lesser': 'some' }).Myerson).toBe('Type B2 (partial incongruity): lateral displacement of one or more of metatarsals 2 to 5, with maintained alignment of the first metatarsal with the medial cuneiform')
    expect(chips(study, 'midfoot', { ...dislocation, 'myerson-first': 'with-lesser', 'myerson-lesser': 'some' }).Myerson).toBe('No type for this pattern: describe the displacement')
  })

  // FX4-2, Moracia-Ochagavía: "D1, distance from the first cuneiform bone (c1) to the second
  // metatarsal (m2) [(c1-m2)] ⩽ 2 mm ... D2, distance between c1 and m2 > 2 mm". FX3-2: "The 'fleck
  // sign' ... indicates the avulsion of the Lisfranc ligament".
  test('a subtle injury, the later type D and the fleck sign', () => {
    expect(chips(study, 'midfoot', { lisfranc: 'subtle', c1m2: '2' })['Type D (later proposal)']).toBe('D1: 2 mm or less')
    expect(chips(study, 'midfoot', { lisfranc: 'subtle', c1m2: '2.5' })['Type D (later proposal)']).toBe('D2: over 2 mm')
    expect(chips(study, 'midfoot', { fleck: 'yes' })['Fleck sign']).toBe('Avulsion of the Lisfranc ligament')
  })

  // FX3-1, FX3-2: Lisfranc signs against the Lisfranc answer.
  test('Lisfranc signs and the Lisfranc answer must agree', () => {
    expect(report(study, { ...normal, fleck: 'yes' }).warnings).toContain('A fleck sign is entered, but no Lisfranc injury.')
    expect(report(study, { ...normal, lisfranc: 'subtle' }).warnings).toContain('A Lisfranc injury is entered with none of its signs: check the second and fourth metatarsal alignment, the medial cuneiform to second metatarsal gap and a fleck sign.')
    expect(report(study, { ...normal, tmt: 'malaligned', 'impression-negatives': ['no-lisfranc'] }).warnings).toContain('Impression says no tarsometatarsal malalignment, but a Lisfranc injury or its signs are entered.')
    // A sign the impression cannot name keeps the study from being called normal.
    expect(impressionOf({ ...normal, tmt: 'malaligned' })).toBe('Findings as above.')
  })

  // FX4-6, Webber: "For fractures of the navicular in athletes, a CT scan is routinely performed to
  // assess displacement or complexity." FX4-4, Moracia-Ochagavía: Lisfranc injuries include those
  // "associated with fractures of the metatarsals, cuneiform bones, scaphoid bone or cuboid bone".
  test('the navicular and the fractures that come with a Lisfranc injury', () => {
    expect(chips(study, 'midfoot', { ...normal, navicular: 'present' }).Navicular).toBe('In athletes CT is routinely done for displacement and complexity')
    expect(chips(study, 'midfoot', { ...normal, 'midfoot-other': ['cuboid'] })['Lisfranc joint']).toBe('Lisfranc injuries come with fractures of the navicular, cuneiforms and cuboid: check the alignment')
    expect(chips(study, 'metatarsals', { ...normal, 'other-mets': ['second'], 'other-mets-base': 'yes' })['Lisfranc joint']).toBe('Metatarsal base fracture: check the tarsometatarsal alignment')
  })

  // FX5-2, Chloros: zone 1 "most common, accounting for more than 90%"; "Involvement of more than
  // one-third of the cubometatarsal joint may require open reduction"; "non-union rates of Zones 2
  // and 3 have been reported to be up to 21% after non-operative management". FX5-3, Torg: "acute
  // fractures characterized by a narrow fracture line and absence of intramedullary sclerosis; those
  // with delayed union ...; and those with non-union".
  test('the fifth metatarsal zones and Torg types', () => {
    expect(chips(study, 'metatarsals', { fifth: 'zone1' })['Zone 1']).toBe('Over 90% of fifth metatarsal fractures; most heal without surgery')
    expect(chips(study, 'metatarsals', { fifth: 'zone1', 'cuboid-joint': 'yes' })['Cuboid joint']).toBe('Give the share of the joint: more than a third may need fixation')
    expect(chips(study, 'metatarsals', { fifth: 'zone2' })['Zone 2']).toBe('Jones fracture: watershed; non-union up to 21% without surgery')
    expect(chips(study, 'metatarsals', { fifth: 'zone3', torg: 'II' }).Torg).toBe('Type II: delayed union')
    expect(chips(study, 'metatarsals', { fifth: 'zone1', torg: 'II' }).Torg).toBeUndefined()
  })

  // FX5-5, Wright: "For conventional radiography, sensitivity ranged from 12% ... to 56%"; "MRI was
  // identified as the most sensitive and specific imaging test".
  test('a stress fracture not seen', () => {
    const repetitive = { ...normal, mechanism: 'repetitive', stress: 'none' }
    expect(chips(study, 'metatarsals', repetitive)['Stress fracture']).toBe('Radiographs 12% to 56% sensitive: MRI if still suspected')
    expect(chips(study, 'metatarsals', { ...repetitive, fifth: 'zone3' })['Stress fracture']).toBeUndefined()
    expect(impressionOf({ ...repetitive, suspected: ['stress'] })).toBe('No fracture or tarsometatarsal malalignment.\nRadiographs can miss a stress fracture: MRI if it is still suspected.')
  })

  // FX6-1, Jiménez-Almonte: Sanders "requires the use of CT images in the coronal plane"; FX1-9,
  // Sposeto: "Commonly associated injuries include fractures of the tibial plafond, tibial plateau,
  // and spine."
  test('a calcaneal fracture', () => {
    expect(chips(study, 'hindfoot', { calcaneus: 'intra' }).Sanders).toBe('Typed on coronal CT, where the posterior facet is widest')
    expect(chips(study, 'hindfoot', { calcaneus: 'extra' }).Sanders).toBeUndefined()
    expect(chips(study, 'hindfoot', { calcaneus: 'extra' })['Associated injuries']).toBe('Check the tibial plafond, tibial plateau and spine')
    expect(report(study, { ...normal, calcaneus: 'intra' }).warnings).toContain("An intra-articular calcaneal fracture is entered: measure Böhler's angle on the lateral view.")
    expect(report(study, { ...normal, bohler: '20' }).warnings).toContain("Böhler's angle is under 25°, but no calcaneal fracture is entered.")
  })

  // FX6-3, the shared Hawkins logic; FX6-4, Alton: Halvorson's AVN "5.7% with Type I ..., 18.4% with
  // Type II ..., 44.7% with Type III ..., and 12.1% with rare Type IV"; FX6-5, Alton: "subchondral
  // atrophy on the AP radiograph between 6 and 8 weeks after injury (known as the Hawkins sign)".
  test('a talar neck fracture, from the calculator logic', () => {
    const talus = { 'talar-neck': 'present', 'talar-displaced': 'displaced' }
    expect(chips(study, 'hindfoot', { ...talus, 'talar-joints': ['subtalar', 'ankle'] }).Hawkins).toBe('Type III: displaced fracture with the talar body dislocated from both the subtalar and the ankle joint')
    expect(chips(study, 'hindfoot', { ...talus, 'talar-joints': ['subtalar', 'ankle'] }).Osteonecrosis).toBe("44.7% of type III in Halvorson's 848 fractures")
    expect(chips(study, 'hindfoot', { ...talus, 'talar-joints': ['ankle'] }).Check).toBe('Type III normally includes the joint injuries of type II, not marked')
    expect(chips(study, 'hindfoot', talus).Hawkins).toBe('No type: Hawkins named none for a displaced fracture with every joint in place')
    expect(chips(study, 'hindfoot', { 'talar-neck': 'present', 'talar-displaced': 'undisplaced' }).Osteonecrosis).toBe("5.7% of type I in Halvorson's 848 fractures")
    expect(chips(study, 'hindfoot', talus)['Follow-up']).toBe('Hawkins sign: subchondral lucency in the talar dome on the AP at 6 to 8 weeks')
  })

  // FX7-1, ACR variant 6 (penetrating trauma with a foreign body, radiographs negative): "US foot
  // Usually appropriate ... 9".
  test('a suspected foreign body not seen', () => {
    expect(chips(study, 'soft-tissues', { 'foreign-body': 'suspected' })['Foreign body']).toBe('Not seen: ultrasound next (ACR 9)')
    expect(impressionOf({ ...normal, 'foreign-body': 'suspected' })).toBe('No fracture or tarsometatarsal malalignment.\nNo radiopaque foreign body seen: ultrasound if one is still suspected.')
  })

  // FX8-1, ACR variant 5 (suspected Lisfranc injury or occult fracture, radiographs normal or
  // equivocal): "MRI foot without IV contrast Usually appropriate ... 9", "CT foot without IV
  // contrast Usually appropriate ... 9".
  test('an injury still suspected', () => {
    expect(impressionOf({ ...normal, suspected: ['lisfranc', 'occult'] })).toBe([
      'No fracture or tarsometatarsal malalignment.',
      'A Lisfranc injury is not excluded: MRI or CT if it is still suspected.',
      'An occult fracture is not excluded: MRI or CT if it is still suspected.',
    ].join('\n'))
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...normal, fifth: 'zone1', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: fifth metatarsal fracture.')
  })
})
