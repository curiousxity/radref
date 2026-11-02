import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { HandXrayStudyPage } from './HandXrayStudy'

const study = studyOf(HandXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-hand-xray-sources.md (H claims), each read in its paper's
 * abstract, its open full text or the ACR's published ratings before it went in. If a case has to
 * change, say in that commit why the old expectation was wrong.
 */

describe('hand X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['technique', 'alignment', 'metacarpals', 'phalanges', 'soft-tissues', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.sourceNote).not.toMatch(/Unchecked draft/)
    expect(study.references).toHaveLength(33)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi)).size).toBe(study.references.length)
  })
})

/** A complete hand series with nothing found. */
const normal: Values = {
  area: 'hand', side: 'Right', views: 'complete', cmc: 'normal', joints: 'congruent', mc: 'none', thumb: 'none',
  pip: 'none', mallet: 'none', ucl: 'none', phalanx: 'none', fb: 'none',
}
/** A complete finger series with nothing found. */
const finger: Values = { area: 'finger', side: 'Left', digit: 'ring', views: 'complete', joints: 'congruent', pip: 'none', mallet: 'none', phalanx: 'none', fb: 'none' }
/** A complete thumb series with nothing found. */
const thumb: Values = { area: 'thumb', side: 'Left', views: 'complete', joints: 'congruent', thumb: 'none', mallet: 'none', ucl: 'none', phalanx: 'none', fb: 'none' }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('hand X-ray report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the area imaged', () => {
    expect(report(study, normal).warnings).toEqual([])
    expect(report(study, finger).warnings).toEqual([])
    expect(report(study, thumb).warnings).toEqual([])
    expect(report(study, { area: 'finger' }).warnings).toEqual([
      'Side not stated', 'Views not stated', 'Finger and thumb joints (MCP, PIP, DIP, IP) not stated',
      'Middle phalanx base (PIP joint) not stated', 'Bony mallet (dorsal base of the distal phalanx) not stated',
      'Other phalangeal fracture not stated', 'Foreign body not stated',
    ])
    expect(report(study, { area: 'thumb' }).warnings).toEqual([
      'Side not stated', 'Views not stated', 'Finger and thumb joints (MCP, PIP, DIP, IP) not stated',
      'Thumb metacarpal not stated', 'Bony mallet (dorsal base of the distal phalanx) not stated',
      'Thumb UCL avulsion (ulnar base of the proximal phalanx) not stated', 'Other phalangeal fracture not stated', 'Foreign body not stated',
    ])
  })
})

describe('hand X-ray report: whole cases', () => {
  test('a normal hand series', () => {
    const text = report(study, normal).text
    expect(text).toContain('Study: radiographs of the right hand')
    expect(text).toContain('Views: frontal, oblique and lateral')
    expect(text).toContain('Carpometacarpal joints: normal alignment')
    expect(impressionOf(normal)).toBe('No fracture, dislocation or radiopaque foreign body.')
  })

  test('a normal finger series names the finger', () => {
    expect(report(study, finger).text).toContain('Study: radiographs of the left ring finger')
    expect(impressionOf(finger)).toBe('No fracture, dislocation or radiopaque foreign body.')
  })

  test('a boxer\'s fracture', () => {
    const values = { ...normal, mechanism: ['punch'], mc: 'present', 'mc-ray': 'fifth', 'mc-site': 'neck', 'mc-angulation': '40', 'mc-view': 'lateral', 'mc-shortening': '2', 'mc-rotation': 'none' }
    expect(report(study, values).text).toContain('Metacarpals: fracture of the fifth (little) metacarpal neck, apex dorsal angulation 40° (lateral), shortening 2 mm, no rotational deformity on examination')
    expect(impressionOf(values)).toBe('Right fracture of the fifth (little) metacarpal neck (boxer\'s fracture), apex dorsal angulation 40° on the lateral, shortening 2 mm.')
  })

  test('a fourth and fifth CMC dislocation with a hamate fracture', () => {
    const values = { ...normal, cmc: 'abnormal', 'cmc-rays': ['fourth', 'fifth'], 'cmc-direction': 'dorsal', 'cmc-signs': ['parallel', 'overlap'], 'cmc-fractures': ['carpal'] }
    expect(report(study, values).text).toContain('Carpometacarpal joints: dorsal dislocation or subluxation, 4th and 5th CMC joints, joint lines not parallel, overlapping articular surfaces, with a fracture of the hamate or another distal carpal bone')
    expect(impressionOf(values)).toBe([
      'Right dorsal dislocation or subluxation of the 4th and 5th carpometacarpal joints, with a fracture of the hamate or another distal carpal bone.',
      'Consider CT to show the carpometacarpal injury and any carpal fracture.',
    ].join('\n'))
  })

  test('a Bennett fracture', () => {
    expect(impressionOf({ ...thumb, thumb: 'bennett' })).toBe('Left Bennett fracture-dislocation of the thumb metacarpal base.')
  })

  test('a dorsal PIP fracture-dislocation with a V sign', () => {
    const values = { ...finger, pip: 'volar', 'pip-percent': '40', 'pip-joint': 'subluxed', 'v-sign': 'yes' }
    expect(report(study, values).text).toContain('Middle phalanx base: volar lip fragment, 40% of the articular surface, middle phalanx subluxed dorsally, V sign')
    expect(impressionOf(values)).toBe([
      'Dorsal fracture-dislocation of the PIP joint, the fragment 40% of the articular surface.',
      'V sign: the PIP joint is not concentrically reduced.',
    ].join('\n'))
  })

  test('a congruent volar plate avulsion', () => {
    expect(impressionOf({ ...finger, pip: 'volar', 'pip-percent': '10', 'pip-joint': 'congruent', 'v-sign': 'no' }))
      .toBe('Volar plate avulsion fracture of the middle phalanx base, the fragment 10% of the articular surface, PIP joint congruent.')
  })

  test('a bony mallet with subluxation', () => {
    const values = { ...finger, mallet: 'present', 'mallet-percent': '45', 'mallet-joint': 'subluxed' }
    expect(report(study, values).text).toContain('Distal phalanx base: bony mallet, 45% of the articular surface, distal phalanx subluxed palmarwards')
    expect(impressionOf(values)).toBe('Bony mallet fracture of the distal phalanx base, 45% of the articular surface, with palmar subluxation of the distal phalanx.')
  })

  test('a displaced thumb UCL fleck', () => {
    expect(impressionOf({ ...thumb, ucl: 'present', 'ucl-fragment': 'displaced' })).toBe([
      'Avulsion fracture at the ulnar base of the thumb proximal phalanx, displaced proximal to the MCP joint line (displaced fleck sign): a Stener lesion is likely.',
      'If ulnar collateral ligament injury is suspected clinically, MRI or ultrasound.',
    ].join('\n'))
  })

  test('a radiopaque foreign body', () => {
    expect(impressionOf({ ...normal, mechanism: ['penetrating'], fb: 'seen', 'fb-site': '3 mm, palmar to the third metacarpal head' }))
      .toBe('Radiopaque foreign body, 3 mm, palmar to the third metacarpal head.')
  })

  test('incomplete views limit the study', () => {
    const values = { ...normal, views: 'incomplete', 'views-missing': ['lateral'] }
    expect(report(study, values).text).toContain('Views: incomplete; missing lateral')
    expect(impressionOf(values)).toBe('Limited study (views incomplete).\nNo fracture, dislocation or radiopaque foreign body.')
  })

  test('hidden answers write nothing', () => {
    // Metacarpal and CMC answers on a finger film.
    const text = report(study, { ...finger, mc: 'present', 'mc-ray': 'fifth', cmc: 'abnormal', thumb: 'bennett' }).text
    expect(text).not.toMatch(/metacarpal|carpometacarpal|Bennett/i)
  })
})

describe('hand X-ray rules', () => {
  // H1-1, ACR ratings table, Variant 1: "Radiography area of interest Usually appropriate ... 9".
  // H1-2, Southall: "a two-view radiographic approach is inadequate for accurately detecting
  // fractures of the extremities including the hands and fingers".
  test('the first imaging and the views', () => {
    expect(chips(study, 'technique', { area: 'hand' }).ACR).toBe('Radiographs usually appropriate (9) as the first imaging')
    expect(chips(study, 'technique', { area: 'hand', views: 'incomplete' }).Views).toBe('Three views: two are inadequate for hand and finger fractures')
    expect(chips(study, 'technique', { area: 'hand', views: 'complete' }).Views).toBeUndefined()
  })

  // H1-4, Steinmetz: "Delivering a blow with a closed fist was the most common mechanism of injury";
  // Caggiano: "often caused by axial load applied to a flexed joint. The most common injury pattern is
  // a dorsal fracture dislocation with a volar lip fracture of the middle phalanx"; Madan: injured
  // "if hyperabduction and hyperextension forces are applied to the first metacarpophalangeal joint".
  test('the mechanism points to the injury', () => {
    const c = chips(study, 'technique', { area: 'hand', mechanism: ['punch', 'axial', 'thumb-abduction'] })
    expect(c.Punch).toBe('Fifth metacarpal neck and shaft; a closed-fist blow is the commonest cause of CMC injury')
    expect(c['Axial load']).toBe('Commonest: dorsal PIP fracture-dislocation with a volar lip fracture')
    expect(c['Thumb abduction']).toBe('Ulnar collateral ligament of the MCP joint')
  })

  // H2-1, Fisher: "Most of these CMC dislocations are dorsal (71%). In combined fourth and fifth CMC
  // joint dislocations, loss of parallelism and symmetry is observed at the fourth CMC joint with
  // overlap identified primarily at the fifth CMC joint. Fracture of the fourth metacarpal base is
  // often an associated injury. In solitary fifth CMC dislocations, slight ulnar offset of the fifth
  // metacarpal on the hamate is the most consistent finding". H2-4, Sendek: CT "changed operative
  // management in 58% of cases".
  test('the CMC joints', () => {
    const combined = chips(study, 'alignment', { ...normal, cmc: 'abnormal', 'cmc-rays': ['fourth', 'fifth'], 'cmc-direction': 'dorsal' })
    expect(combined.Direction).toBe('Dorsal, as were 71% in Fisher\'s series')
    expect(combined['Fourth and fifth']).toBe('Parallelism and symmetry lost at the fourth, overlap at the fifth; a fourth base fracture often goes with it')
    expect(combined.CT).toBe('Changed the operative plan in 58%; carpal fractures are often hard to see on radiographs')
    expect(chips(study, 'alignment', { ...normal, cmc: 'abnormal', 'cmc-rays': ['fifth'] })['Fifth alone']).toBe('Slight ulnar offset on the hamate; often a radial-margin fracture of the fifth base')
    expect(chips(study, 'alignment', normal).CT).toBeUndefined()
  })

  // H2-1, H2-2, Steinmetz: injuries "frequently associated with fractures of the metacarpal bases and
  // distal carpal row".
  test('a CMC dislocation and a metacarpal base fracture send you back to each other', () => {
    expect(report(study, { ...normal, cmc: 'abnormal', 'cmc-rays': ['fifth'] }).warnings).toContain('A CMC dislocation is entered with no fracture: look again at the fourth metacarpal base, the fifth base and the distal carpal row.')
    const base = { ...normal, mc: 'present', 'mc-ray': 'fourth', 'mc-site': 'base' }
    expect(chips(study, 'metacarpals', base)['CMC joints']).toBe('A fourth or fifth base fracture often goes with a CMC dislocation: recheck step 2')
    expect(report(study, base).warnings).toContain('A fourth or fifth metacarpal base fracture is entered with normal CMC joints: recheck parallelism, symmetry, overlap and the M lines, which are subtle.')
    expect(chips(study, 'metacarpals', { ...base, 'mc-ray': 'second' })['CMC joints']).toBeUndefined()
  })

  // H2-5, ACR Variant 6: MCP, PIP or DIP "malalignment in the absence of fracture": "US hand ... 7";
  // "MRI hand without IV contrast ... 9".
  test('a finger joint dislocated without a fracture', () => {
    const values = { ...finger, joints: 'dislocated', 'joint-which': ['pip'], 'joint-direction': 'dorsal' }
    expect(chips(study, 'alignment', values)['No fracture']).toBe('Joint malalignment without fracture: MRI 9, ultrasound 7 (ACR)')
    expect(impressionOf(values)).toBe('Dorsal dislocation or subluxation of the PIP joint.\nMRI or ultrasound can show the ligaments and volar plate.')
    expect(chips(study, 'alignment', { ...values, mallet: 'present' })['No fracture']).toBeUndefined()
  })

  // H3-4, Lamraski: on oblique radiographs "considerable lack of validity"; Sletten: the lateral MC-90
  // method "used as a reference". H3-5, Qiu: "Oblique hand radiographs demonstrate good reliability
  // and high validity". H3-6, Lowdon: "The normal head/shaft angle ... on an oblique radiograph was 26
  // degrees".
  test('the view the neck angle was measured on', () => {
    const neck = { ...normal, mc: 'present', 'mc-ray': 'fifth', 'mc-site': 'neck', 'mc-angulation': '50' }
    expect(chips(study, 'metacarpals', { ...neck, 'mc-view': 'oblique' })['Oblique view']).toBe('Validity disputed (biased in cadavers; matched CT in Qiu); normal neck angle 26° on the oblique')
    expect(chips(study, 'metacarpals', { ...neck, 'mc-view': 'lateral' })['Lateral view']).toBe('The reference method (mid-medullary lines); overlap can make it hard to measure')
    expect(report(study, neck).warnings).toContain('An angulation is entered without the view it was measured on; lateral and oblique measurements differ.')
    expect(chips(study, 'metacarpals', neck)["Boxer's fracture"]).toBe('Fifth neck: the fifth is 57% of metacarpal fractures')
  })

  // H3-2, van Aaken: soft wrap "for treatment of boxer's fracture with palmar angulation ≤70° and no
  // rotational deformity". H3-3, France: angulation "greater than 70° demonstrated acceptable
  // functional outcomes".
  test('the boxer\'s fracture angle against 70°', () => {
    const neck = { ...normal, mc: 'present', 'mc-ray': 'fifth', 'mc-site': 'neck', 'mc-view': 'lateral' }
    expect(chips(study, 'metacarpals', { ...neck, 'mc-angulation': '70', 'mc-rotation': 'none' })['Up to 70°']).toBe('No rotation: the range in which soft wrap was noninferior to reduction (van Aaken)')
    expect(chips(study, 'metacarpals', { ...neck, 'mc-angulation': '70' })['Up to 70°']).toBe('Van Aaken\'s trial range, which also required no rotational deformity')
    expect(chips(study, 'metacarpals', { ...neck, 'mc-angulation': '71' })['Over 70°']).toBe('Beyond van Aaken\'s trial; France reported acceptable outcomes in 15 healed cases')
    expect(chips(study, 'metacarpals', { ...neck, 'mc-ray': 'fourth', 'mc-angulation': '71' })['Over 70°']).toBeUndefined()
  })

  // H3-7, Czarnecki: intra-articular fractures at the PIP, MCP and CMC joints: "Very often, X-ray
  // images in typical projections are not sufficient ... computed tomography is increasingly used".
  test('a fracture into a joint', () => {
    expect(chips(study, 'metacarpals', { ...normal, mc: 'present', 'mc-site': 'head', 'mc-articular': 'yes' })['Into the joint']).toBe('Standard views are often not enough; CT (increasingly cone-beam) is used')
    expect(chips(study, 'phalanges', { ...finger, phalanx: 'present', 'ph-articular': 'yes' })['Into the joint']).toBe('Standard views are often not enough; CT (increasingly cone-beam) is used')
  })

  // H3-8, Daher: "The first metacarpal shaft ... is displaced by the muscles of the abductor pollicis
  // longus and adductor pollicis. The palmar oblique ligament is attached to the smaller, volar
  // fracture fragment." H3-9, Liverneaux: "articular three-fragment Rolando".
  test('Bennett and Rolando', () => {
    expect(chips(study, 'metacarpals', { ...thumb, thumb: 'bennett' }).Bennett).toBe('Shaft pulled by abductor pollicis longus and adductor pollicis; volar fragment held by the palmar oblique ligament')
    expect(chips(study, 'metacarpals', { ...thumb, thumb: 'rolando' }).Rolando).toBe('Three-fragment or comminuted articular fracture of the base')
  })

  // H4-2, Elfar and Mann: "Fractures that involve <30% of the articular surface are typically stable
  // whereas those involving >50% are often unstable. ... 30% to 50% ... tenuous stability."
  test('the volar lip fragment by its share of the joint', () => {
    const volar = { ...finger, pip: 'volar' }
    expect(chips(study, 'phalanges', { ...volar, 'pip-percent': '29' })['Volar lip']).toBe('Typically stable')
    expect(chips(study, 'phalanges', { ...volar, 'pip-percent': '30' })['Volar lip']).toBe('Tenuous stability')
    expect(chips(study, 'phalanges', { ...volar, 'pip-percent': '50' })['Volar lip']).toBe('Tenuous stability')
    expect(chips(study, 'phalanges', { ...volar, 'pip-percent': '51' })['Volar lip']).toBe('Often unstable')
  })

  // H4-3, Elfar and Mann: the V sign "indicates the presence of dorsal instability, signify that the
  // PIPJ is not concentrically reduced".
  test('the V sign', () => {
    const values = { ...finger, pip: 'volar', 'v-sign': 'yes' }
    expect(chips(study, 'phalanges', values)['V sign']).toBe('Dorsal instability: the PIP joint is not concentrically reduced')
    expect(report(study, { ...values, 'pip-joint': 'congruent' }).warnings).toContain('A V sign is entered, which means the PIP joint is not concentrically reduced, but the joint is entered as congruent.')
  })

  // H4-5, Elfar and Mann: "Kang and Stern suggest that predictable restoration of central slip
  // function can be achieved without surgery in fractures with an avulsed fragment displaced ≤2 mm."
  // H4-4: "Pilon fractures ... in the setting of fracture displacement, these injuries are unstable."
  test('the central slip fragment and the pilon fracture', () => {
    expect(chips(study, 'phalanges', { ...finger, pip: 'dorsal', 'cs-displacement': '2' })['Central slip']).toBe('2 mm or less: function restored without surgery (Kang and Stern)')
    expect(chips(study, 'phalanges', { ...finger, pip: 'dorsal', 'cs-displacement': '2.5' })['Central slip']).toBe('Over 2 mm: beyond Kang and Stern\'s nonsurgical group')
    const pilon = { ...finger, pip: 'pilon', 'pilon-displaced': 'displaced' }
    expect(chips(study, 'phalanges', pilon).Pilon).toBe('Displaced: unstable; CT or traction views for a depressed surface')
    expect(impressionOf(pilon)).toBe('Displaced pilon fracture of the middle phalanx base.\nConsider CT, or radiographs under traction, to show the articular surface.')
  })

  // H4-8, Moradi: "Subluxation was not observed when the fracture size was less than 39% of the total
  // articular surface." H4-9, Kalainov: "Surgical repair ... has been favored for displaced injuries
  // involving more than one third of the articular surface and for injuries with palmar subluxation".
  test('the mallet fragment', () => {
    const mallet = { ...finger, mallet: 'present', 'mallet-joint': 'congruent' }
    expect(chips(study, 'phalanges', { ...mallet, 'mallet-percent': '38' }).Mallet).toBe('Under 39%: no subluxation was seen (Moradi)')
    expect(chips(study, 'phalanges', { ...mallet, 'mallet-percent': '39' }).Mallet).toBe('39% or more: subluxation risk rises 4% per 1% (Moradi)')
    expect(chips(study, 'phalanges', { ...mallet, 'mallet-percent': '30' })['Over a third or subluxed']).toBeUndefined()
    expect(chips(study, 'phalanges', { ...mallet, 'mallet-percent': '35' })['Over a third or subluxed']).toBe('What surgery has been favoured for; nonsurgical results were acceptable and sources disagree')
    expect(chips(study, 'phalanges', { ...mallet, 'mallet-joint': 'subluxed' })['Over a third or subluxed']).toBe('What surgery has been favoured for; nonsurgical results were acceptable and sources disagree')
  })

  // H4-14, Daryoush: "The displaced fleck sign had a positive predictive value of 100% for Grade III
  // rupture and 94.1% for a Stener lesion." H4-15, Legerstee: "MCP joint instability, rather than the
  // largest fragment side, was a significant risk factor for surgery." H4-16, ACR Variant 5: "US hand
  // ... 7"; "MRI hand without IV contrast ... 9".
  test('the thumb UCL avulsion', () => {
    const ucl = { ...thumb, ucl: 'present' }
    expect(chips(study, 'phalanges', { ...ucl, 'ucl-fragment': 'displaced' })['Displaced fleck']).toBe('Grade III rupture (PPV 100%), Stener lesion (PPV 94.1%)')
    expect(chips(study, 'phalanges', { ...ucl, 'ucl-fragment': 'at-joint' })['Displaced fleck']).toBeUndefined()
    expect(chips(study, 'phalanges', ucl).UCL).toBe('Instability, not fragment size, went with surgery; MRI 9, ultrasound 7 (ACR)')
  })

  // H5-1, Manthey: radiography "never detected bodies considered radiolucent (wood, plastic, cactus
  // spine)". H5-2, Grøn: "In 25 out of 26 patients the glass foreign bodies were detected." H5-3, ACR
  // Variant 7: "US area of interest ... 9"; "CT area of interest without IV contrast ... 7"; "MRI ...
  // 6".
  test('a suspected foreign body', () => {
    const suspected = { ...normal, fb: 'suspected' }
    expect(chips(study, 'soft-tissues', { ...suspected, 'fb-material': 'radiolucent' }).Radiolucent).toBe('Radiographs never showed wood, plastic or a cactus spine')
    expect(chips(study, 'soft-tissues', { ...suspected, 'fb-material': 'glass' }).Glass).toBe('Seen on radiographs in 25 of 26 patients: look again')
    expect(chips(study, 'soft-tissues', suspected).Next).toBe('Ultrasound 9, CT 7, MRI 6 (ACR)')
    expect(impressionOf(suspected)).toBe('No fracture, dislocation or radiopaque foreign body.\nIf a foreign body is still suspected, ultrasound, or CT.')
  })

  // H6-2, ACR Variant 2: "Radiography area of interest repeat in 10-14 days ... 8"; "MRI area of
  // interest without IV contrast ... 8"; "CT area of interest without IV contrast ... 7".
  test('normal films with a fracture still suspected', () => {
    const values = { ...normal, 'still-suspected': 'yes' }
    expect(chips(study, 'impression', values)['Still suspected']).toBe('Repeat radiographs in 10–14 days 8, MRI 8, CT 7 (ACR)')
    expect(impressionOf(values)).toBe('No fracture, dislocation or radiopaque foreign body.\nIf a fracture is still suspected, repeat radiographs in 10 to 14 days, or MRI or CT.')
    // The question is hidden once a fracture is entered, so its answer is dropped.
    expect(chips(study, 'impression', { ...values, mallet: 'present' })['Still suspected']).toBeUndefined()
  })

  test('negatives that contradict the findings are flagged', () => {
    expect(report(study, { ...finger, mallet: 'present', 'impression-negatives': ['no-fracture'] }).warnings).toContain('Impression says no fracture, but these are entered: bony mallet.')
    expect(report(study, { ...normal, fb: 'seen', 'impression-negatives': ['no-foreign-body'] }).warnings).toContain('Impression says no radiopaque foreign body, but these are entered: radiopaque foreign body.')
  })
})
