import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { KneeXrayStudyPage } from './KneeXrayStudy'

const study = studyOf(KneeXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-knee-xray-sources.md (KX claims), each read in its paper's
 * abstract, its open full text or the ACR's published ratings before it went in. If a case has to
 * change, say in that commit why the old expectation was wrong.
 */

describe('knee X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['indication', 'views', 'alignment', 'plateau', 'avulsions', 'patella', 'femur', 'soft-tissues', 'impression'])
  })

  // Every reference is matched and every claim read, so the note is not marked as a draft.
  // Schatzker 1979 has no DOI (none on Crossref); every other reference has one.
  test('is not marked as a draft, with a DOI on every reference but Schatzker 1979', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.references).toHaveLength(32)
    const withoutDoi = study.references.filter((ref) => !ref.doi)
    expect(withoutDoi.map((ref) => ref.citation)).toEqual([expect.stringMatching(/^Schatzker J, McBroom R, Bruce D\./)])
    const dois = study.references.flatMap((ref) => (ref.doi ? [ref.doi] : []))
    for (const doi of dois) expect(doi).toMatch(/^10\./)
    expect(new Set(dois).size).toBe(dois.length)
  })
})

/** A complete normal series after a twisting injury. */
const normal: Values = {
  side: 'Right', mechanism: 'twist', views: 'complete', 'lateral-beam': 'horizontal', tibiofemoral: 'aligned',
  'plateau-fracture': 'none', segond: 'none', 'reverse-segond': 'none', 'fibular-head': 'none', 'tibial-spine': 'none', 'pcl-avulsion': 'none',
  patella: 'none', femur: 'none', effusion: 'none', 'fat-fluid': 'none',
}

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('knee X-ray report: steps', () => {
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
      'Side not stated', 'Injury not stated', 'Views not stated', 'Lateral not stated', 'Tibiofemoral alignment not stated',
      'Tibial plateau fracture not stated', 'Segond fracture (lateral tibial rim) not stated', 'Reverse Segond fracture (medial tibial rim) not stated',
      'Fibular head avulsion (arcuate sign) not stated', 'Tibial spine (ACL) avulsion not stated', 'PCL avulsion (posterior tibia) not stated',
      'Patella not stated', 'Distal femoral fracture not stated', 'Joint effusion not stated', 'Fluid level in the suprapatellar recess not stated',
    ])
  })
})

describe('knee X-ray report: whole cases', () => {
  test('a normal series', () => {
    const text = report(study, { ...normal, ottawa: ['patella', 'weight'], 'extra-views': ['skyline'] }).text
    expect(text).toContain('Clinical: right knee, fall or twisting injury')
    expect(text).toContain('Ottawa knee rule: isolated patellar tenderness, unable to bear weight')
    expect(text).toContain('Views: AP and horizontal-beam lateral, with skyline (axial) views')
    expect(impressionOf(normal)).toBe('No fracture, dislocation or joint effusion.')
  })

  test('a Schatzker II plateau fracture with a lipohaemarthrosis', () => {
    const values = {
      ...normal, 'plateau-fracture': 'present', plateau: 'lateral', 'plateau-pattern': 'split-depression', 'plateau-dissociation': 'no', 'plateau-depression': '6',
      effusion: 'present', 'fat-fluid': 'fat',
    }
    expect(report(study, values).text).toContain('Tibial plateau fracture: lateral plateau; split with depression; Schatzker type II; articular depression 6 mm')
    expect(impressionOf(values)).toBe([
      'Tibial plateau fracture, Schatzker type II: split with depression of the lateral plateau, articular depression 6 mm.',
      'Lipohaemarthrosis, indicating an intra-articular fracture.',
      'Consider CT or MRI, which type a plateau fracture more accurately than radiographs.',
    ].join('\n'))
  })

  test('a Segond fracture with an effusion', () => {
    const values = { ...normal, segond: 'present', effusion: 'present', suprapatellar: '12' }
    expect(impressionOf(values)).toBe([
      'Segond fracture, associated with ACL tear.',
      'Joint effusion (suprapatellar pouch 12 mm).',
      'Consider MRI for the ligaments and menisci.',
    ].join('\n'))
  })

  test('a knee dislocation with an arcuate sign', () => {
    const values = { ...normal, mechanism: 'high', tibiofemoral: 'dislocated', 'fibular-head': 'present' }
    expect(impressionOf(values)).toBe([
      'Knee dislocation.',
      'Avulsion of the fibular head (arcuate sign): posterolateral corner injury, often with cruciate injury.',
      'Consider CT angiography of the leg.',
      'Consider MRI for the ligaments and menisci.',
    ].join('\n'))
  })

  test('a complete articular distal femoral fracture', () => {
    const values = { ...normal, femur: 'c', hoffa: 'yes' }
    expect(impressionOf(values)).toBe([
      'Distal femoral fracture, complete articular (AO/OTA 33C), with a coronal (Hoffa) fragment.',
      'Consider CT for the articular extension and any coronal (Hoffa) fracture.',
    ].join('\n'))
  })

  test('a bipartite patella is a variant line, and the study is otherwise normal', () => {
    expect(impressionOf({ ...normal, patella: 'bipartite', 'bipartite-site': 'superolateral' }))
      .toBe('No fracture, dislocation or joint effusion.\nBipartite patella (superolateral) (anatomical variant).')
  })

  test('hidden answers write nothing', () => {
    const text = report(study, { ...normal, plateau: 'medial', meyers: 'iii', 'patella-pattern': 'vertical', hoffa: 'yes', suprapatellar: '15' }).text
    expect(text).not.toMatch(/Schatzker|Meyers|vertical|Hoffa|15 mm/i)
  })
})

describe('knee X-ray rules', () => {
  // KX1-1, Stiell 1995: "(1) age 55 years or older, (2) tenderness at the head of the fibula, (3)
  // isolated tenderness of the patella, (4) inability to flex to 90 degrees, and (5) inability to
  // bear weight both immediately and in the ED (four steps). The presence of one or more of these
  // findings would have identified the 68 fractures". KX1-2, Stiell 1996: "a sensitivity of 1.0".
  test('the Ottawa knee rule: any one of five', () => {
    expect(chips(study, 'indication', { ottawa: ['age'] })['Ottawa knee rule']).toBe('Met (1 of 5): radiography indicated; 100% sensitive for fracture in its validation')
    expect(chips(study, 'indication', { ottawa: ['age', 'fibula', 'patella', 'flex', 'weight'] })['Ottawa knee rule']).toMatch(/^Met \(5 of 5\)/)
    expect(chips(study, 'indication', { ottawa: [] })['Ottawa knee rule']).toBeUndefined()
    expect(study.report.steps[0].fields.find((field) => field.id === 'ottawa')).toMatchObject({ kind: 'multi' })
  })

  // KX1-5, ACR ratings table, Variant 8 ("Significant trauma to the knee (eg, motor vehicle
  // accident, knee dislocation)"): "Radiography knee Usually appropriate ... 9", "CTA lower
  // extremity with IV contrast Usually appropriate ... 8".
  test('significant trauma and knee dislocation', () => {
    expect(chips(study, 'indication', { mechanism: 'high' }).ACR).toBe('Significant trauma or knee dislocation: radiography 9, CT angiography of the leg 8')
    expect(chips(study, 'alignment', { tibiofemoral: 'dislocated' })['Knee dislocation']).toBe('ACR: CT angiography of the leg usually appropriate (8)')
    expect(chips(study, 'alignment', { tibiofemoral: 'subluxed' })['Knee dislocation']).toBeUndefined()
  })

  // KX2-1, Ferguson: "the horizontal beam lateral radiograph should be the standard lateral view in
  // the investigation of knee trauma." KX2-2, Crone: "The posterior margins of the femoral condyles
  // should either be superimposed on one another or should not diverge by more than 2 mm. This allows
  // assessment of patellar height". KX2-3, Hall: "Satisfactory lateral knee radiographs required
  // radiologic demonstration of the entire suprapatellar area."
  test('the views', () => {
    expect(chips(study, 'views', { 'lateral-beam': 'vertical' }).Lateral).toBe('Vertical beam: a horizontal-beam lateral is the trauma standard and shows a fat-fluid level best')
    expect(chips(study, 'views', { 'lateral-beam': 'horizontal' }).Lateral).toBeUndefined()
    expect(chips(study, 'views', { limits: ['rotated'] })['Rotated lateral']).toBe('Patellar height is measured on a true lateral (condyles within 2 mm)')
    expect(chips(study, 'views', { limits: ['suprapatellar'] })['Suprapatellar area']).toBe('A satisfactory lateral shows all of it, for the effusion')
    expect(report(study, { ...normal, 'lateral-beam': 'vertical' }).warnings).toContain('The lateral is a vertical-beam view: a fat-fluid level is shown best on a horizontal-beam lateral.')
    // A technique chip names no finding, so a normal series stays normal.
    expect(impressionOf({ ...normal, 'lateral-beam': 'vertical' })).toBe('No fracture, dislocation or joint effusion.')
  })

  // KX2-5, Jarraya: vertical fractures are "easily missed on AP radiographs, emphasizing the
  // importance of a skyline view".
  test('isolated patellar tenderness with no skyline view', () => {
    const warning = 'Isolated patellar tenderness is entered and there is no skyline view: a vertical patellar fracture is easily missed on the AP.'
    expect(report(study, { ...normal, ottawa: ['patella'] }).warnings).toContain(warning)
    expect(report(study, { ...normal, ottawa: ['patella'], 'extra-views': ['skyline'] }).warnings).not.toContain(warning)
  })

  // KX3-1, Crone: "the normal range of values is 0.8–1.3. Calculated values > 1.3 indicate patella
  // alta, while those < 0.8 indicate patella baja".
  test('Insall–Salvati at its boundaries', () => {
    expect(chips(study, 'alignment', { insall: '1.3' })['Insall–Salvati']).toBe('Normal (0.8 to 1.3)')
    expect(chips(study, 'alignment', { insall: '1.31' })['Insall–Salvati']).toBe('Over 1.3: patella alta')
    expect(chips(study, 'alignment', { insall: '0.8' })['Insall–Salvati']).toBe('Normal (0.8 to 1.3)')
    expect(chips(study, 'alignment', { insall: '0.79' })['Insall–Salvati']).toBe('Under 0.8: patella baja')
    expect(impressionOf({ ...normal, insall: '1.5' })).toBe('Patella alta (Insall–Salvati index 1.5).')
  })

  // KX3-2, Cobby: "A sulcus deeper than 1.5 mm ... was a reliable indirect sign of a torn ACL."
  // KX3-3, Lodewijks: "A depth of > 1.0 mm was a good predictor for ACL injury" (PPV 96%).
  test('the lateral femoral notch: the two cut-offs', () => {
    expect(chips(study, 'alignment', { notch: '1' })['Lateral femoral notch']).toBeUndefined()
    expect(chips(study, 'alignment', { notch: '1.1' })['Lateral femoral notch']).toBe('Over 1 mm: PPV 96% for ACL injury (Lodewijks); under Cobby\'s 1.5 mm')
    expect(chips(study, 'alignment', { notch: '1.5' })['Lateral femoral notch']).toBe('Over 1 mm: PPV 96% for ACL injury (Lodewijks); under Cobby\'s 1.5 mm')
    expect(chips(study, 'alignment', { notch: '1.6' })['Lateral femoral notch']).toBe('Deeper than 1.5 mm: a reliable indirect sign of ACL tear')
    expect(impressionOf({ ...normal, notch: '2' })).toBe('Deep lateral femoral notch (2 mm): an indirect sign of ACL tear.')
  })

  // KX4-1, Markhardt: "lateral plateau fracture without depression (type I), lateral plateau fracture
  // with depression (type II), compression fracture of the lateral (type IIIA) or central (type IIIB)
  // plateau, medial plateau fracture (type IV), bicondylar plateau fracture (type V), and plateau
  // fracture with diaphyseal discontinuity (type VI)". The types come from src/logic/schatzker.ts.
  // KX4-2: "The fracture-dislocation mechanism of type IV fractures increases the likelihood of
  // injury to the peroneal nerve or popliteal vessels." KX4-3: "CT and MR imaging are more accurate
  // than plain radiography for Schatzker classification"; ACR Variant 6, MRI 9 and CT 8.
  test('the tibial plateau, as the Schatzker calculator types it', () => {
    const broken = { 'plateau-fracture': 'present', 'plateau-dissociation': 'no' }
    expect(chips(study, 'plateau', { ...broken, plateau: 'lateral', 'plateau-pattern': 'split' }).Schatzker).toBe('Type I')
    expect(chips(study, 'plateau', { ...broken, plateau: 'lateral', 'plateau-pattern': 'depression', 'plateau-depression-site': 'central' }).Schatzker).toBe('Type IIIB')
    expect(chips(study, 'plateau', { ...broken, plateau: 'both' }).Schatzker).toBe('Type V')
    expect(chips(study, 'plateau', { ...broken, plateau: 'medial', 'plateau-dissociation': 'yes' }).Schatzker).toBe('Type VI')
    const medial = chips(study, 'plateau', { ...broken, plateau: 'medial' })
    expect(medial.Schatzker).toBe('Type IV')
    expect(medial['Type IV']).toBe('Fracture-dislocation: risk to the peroneal nerve and popliteal vessels')
    expect(medial['CT or MRI']).toBe('More accurate than radiographs for the type; ACR: MRI 9, CT 8')
    // Undecided until dissociation is answered, as in the calculator.
    expect(chips(study, 'plateau', { 'plateau-fracture': 'present', plateau: 'medial' }).Schatzker).toBeUndefined()
  })

  // KX5-1, Goldman: "abnormalities of the anterior cruciate ligament (nine of nine cases) and/or
  // meniscal tears (six of nine cases)"; Parkar: "Segond avulsion has a 95% association with ACL
  // rupture". KX5-2, Hall and Hochman: "associated with tears of the posterior cruciate ligament and
  // the medical meniscus". KX5-3, Huang: "All patients had injuries of the posterior cruciate
  // ligament"; KX5-4, Juhng: "Injury of the cruciate ligaments was noted in 16 cases (89%)". KX5-6,
  // White: "when they occur in adults, they are more commonly associated with other injuries".
  test('the avulsions and what they point to', () => {
    expect(chips(study, 'avulsions', { segond: 'present' })['Segond fracture']).toBe('Associated with ACL tear (9 of 9; 95%); menisci often torn')
    expect(chips(study, 'avulsions', { 'reverse-segond': 'present' })['Reverse Segond']).toBe('Goes with PCL and medial meniscus tears')
    expect(chips(study, 'avulsions', { 'fibular-head': 'present' })['Arcuate sign']).toBe('Posterolateral corner injury; PCL in 13 of 13 (Huang), a cruciate in 89% (Juhng)')
    expect(chips(study, 'avulsions', { 'pcl-avulsion': 'present' })['Cruciate avulsion']).toBe('In adults, more often with other injuries')
    expect(chips(study, 'avulsions', { segond: 'none' })['Segond fracture']).toBeUndefined()
  })

  // KX5-7, Li: "Type I lesions are undisplaced or minimally displaced ...; Type II fractures present
  // with a superior displacement of the anterior part of the fragment, with the posterior portion
  // still attached ...; in Type III lesions the fragment is completely detached ... the Type IV ...
  // refers to the displacement and comminution of fracture fragments".
  test('a tibial spine avulsion, Meyers and McKeever', () => {
    expect(chips(study, 'avulsions', { 'tibial-spine': 'present', meyers: 'ii' })['Meyers and McKeever']).toBe('Type II')
    expect(chips(study, 'avulsions', { 'tibial-spine': 'present', meyers: 'iv' })['Meyers and McKeever']).toBe('Type IV')
    expect(impressionOf({ ...normal, 'tibial-spine': 'present', meyers: 'iii', 'spine-displacement': '6' }))
      .toBe('Tibial spine (ACL) avulsion, Meyers and McKeever type III, anterior fragment raised 6 mm.\nConsider MRI for the ligaments and menisci.')
  })

  // KX6-1, Jarraya: "Melvin and colleagues defined displacement as separation of fracture fragments
  // by more than 3 mm, and/or articular incongruity of more than 2 mm"; "Displacement should raise
  // suspicion for retinacular injury."
  test('patellar fracture displacement at its boundaries', () => {
    const fracture = { patella: 'fracture', 'patella-pattern': 'transverse' }
    expect(chips(study, 'patella', { ...fracture, 'patella-separation': '3', 'patella-step': '2' }).Displaced).toBe('No: 3 mm or less apart, step 2 mm or less')
    expect(chips(study, 'patella', { ...fracture, 'patella-separation': '3.5' }).Displaced).toBe('Over 3 mm apart or an articular step over 2 mm: suspect retinacular injury')
    expect(chips(study, 'patella', { ...fracture, 'patella-step': '2.5' }).Displaced).toBe('Over 3 mm apart or an articular step over 2 mm: suspect retinacular injury')
    expect(chips(study, 'patella', { ...fracture, 'patella-separation': '2' }).Displaced).toBeUndefined()
    expect(impressionOf({ ...normal, ...fracture, 'patella-separation': '5' })).toBe('Transverse patellar fracture, displaced.')
  })

  // KX6-2, Jarraya: "Distal pole fractures (bony avulsion of the patellar tendon) ... lateral
  // radiographs demonstrate patella alta and increased Insall-Salvati ratio, while upper pole bony
  // avulsions are associated with low-riding patella, also termed patella baja".
  test('pole avulsions and the patellar height', () => {
    expect(chips(study, 'patella', { patella: 'fracture', 'patella-pattern': 'lower-pole' })['Lower pole']).toBe('Bony avulsion of the patellar tendon: look for patella alta')
    expect(chips(study, 'patella', { patella: 'fracture', 'patella-pattern': 'upper-pole' })['Upper pole']).toBe('Goes with patella baja; the quadriceps tendon may be injured')
    const lowerPole = { ...normal, patella: 'fracture', 'patella-pattern': 'lower-pole' }
    expect(report(study, { ...lowerPole, insall: '1.1' }).warnings).toContain('A lower pole avulsion is entered, which comes with patella alta, but the Insall–Salvati index is not over 1.3.')
    expect(report(study, { ...lowerPole, insall: '1.4' }).warnings).toEqual([])
  })

  // KX6-3, Jarraya: "The diagnosis is favoured by the location of the patellar fragment in the
  // superolateral aspect of the patella." Akdag: "Fifty-nine of the bipartite fragments were located
  // at the superolateral quadrant of the patella."
  test('bipartite patella by its site', () => {
    expect(chips(study, 'patella', { patella: 'bipartite', 'bipartite-site': 'superolateral' })['Bipartite patella']).toBe('Superolateral: the site that favours it over a fracture (59 of 61)')
    expect(chips(study, 'patella', { patella: 'bipartite', 'bipartite-site': 'inferior' })['Bipartite patella']).toBe('Not superolateral: a rarer site, so the site does not favour it over a fracture')
  })

  // KX7-1, Fogagnolo: "type A fractures are extraarticular, type B fractures are partial articular,
  // and type C fractures are complete articular"; "complete fracture assessment requires CT".
  // KX7-2, Nork: coronal plane fractures with "seventy-seven (38.1%) of the 202" fractures.
  test('the distal femur', () => {
    expect(chips(study, 'femur', { femur: 'a' })['AO/OTA']).toBe('33A, extra-articular')
    expect(chips(study, 'femur', { femur: 'b' }).CT).toBe('Complete assessment needs CT: articular extension, occult lines, Hoffa fractures')
    expect(chips(study, 'femur', { femur: 'b' }).Hoffa).toBeUndefined()
    expect(chips(study, 'femur', { femur: 'c' }).Hoffa).toBe('Coronal fractures with 38% of supracondylar-intercondylar fractures; found more often with CT (47% against 29%)')
    expect(chips(study, 'femur', { femur: 'none' })['AO/OTA']).toBeUndefined()
  })

  // KX8-4, Tai: "the corresponding measurement on cross-table lateral radiographs was predicted to be
  // 7 mm" (76% sensitive). KX8-5, Cecava: "knee effusion > 10 mm on lateral radiograph should prompt
  // consideration for knee magnetic resonance examination" (ages 18 to 40, PPV 93%).
  test('the suprapatellar pouch at 7 and 10 mm', () => {
    const effusion = { effusion: 'present' }
    expect(chips(study, 'soft-tissues', { ...effusion, suprapatellar: '6' })['Suprapatellar pouch']).toBe('Under Tai\'s 7 mm criterion, which is 76% sensitive')
    expect(chips(study, 'soft-tissues', { ...effusion, suprapatellar: '7' })['Suprapatellar pouch']).toBe('7 mm or more: an effusion by Tai\'s criterion (cross-table lateral)')
    expect(chips(study, 'soft-tissues', { ...effusion, suprapatellar: '10' })['Suprapatellar pouch']).toBe('7 mm or more: an effusion by Tai\'s criterion (cross-table lateral)')
    expect(chips(study, 'soft-tissues', { ...effusion, suprapatellar: '11' })['Suprapatellar pouch']).toBe('Over 10 mm: internal derangement on MRI likely (PPV 93%, ages 18 to 40)')
    // With no fracture, a pouch over 10 mm brings the MRI line; at 10 mm it does not.
    expect(impressionOf({ ...normal, ...effusion, suprapatellar: '11' })).toBe('Joint effusion (suprapatellar pouch 11 mm).\nConsider MRI for the ligaments and menisci.')
    expect(impressionOf({ ...normal, ...effusion, suprapatellar: '10' })).toBe('Joint effusion (suprapatellar pouch 10 mm).')
  })

  // KX8-1, Lee: "The presence of a fat-fluid level in the knee indicated fracture in all patients in
  // whom it was seen." KX8-2, Ferguson: "The presence of a visible lipohaemarthrosis in the absence of
  // a visible fracture, or isolated fracture of patella or fibula on the plain radiographs, are
  // indications for further investigation"; ACR Variant 3, MRI 9 and CT 6.
  test('lipohaemarthrosis, with and without a fracture to account for it', () => {
    const lipo = { ...normal, effusion: 'present', 'fat-fluid': 'fat' }
    expect(chips(study, 'soft-tissues', lipo).Lipohaemarthrosis).toBe('Indicates an intra-articular fracture (all of Lee\'s cases; 88.6% specific in Ferguson\'s)')
    expect(chips(study, 'soft-tissues', lipo)['No fracture to account for it']).toBe('Further imaging for an occult fracture: ACR MRI 9, CT 6')
    expect(impressionOf(lipo)).toBe([
      'Lipohaemarthrosis with no fracture seen to account for it: an occult intra-articular fracture is likely.',
      'Consider MRI or CT for an occult fracture.',
    ].join('\n'))
    // An isolated patellar or fibular fracture does not account for it.
    expect(chips(study, 'soft-tissues', { ...lipo, patella: 'fracture' })['No fracture to account for it']).toBeDefined()
    expect(chips(study, 'soft-tissues', { ...lipo, 'fibular-head': 'present' })['No fracture to account for it']).toBeDefined()
    expect(chips(study, 'soft-tissues', { ...lipo, 'plateau-fracture': 'present' })['No fracture to account for it']).toBeUndefined()
    // A double level counts too.
    expect(chips(study, 'soft-tissues', { ...lipo, 'fat-fluid': 'double' }).Lipohaemarthrosis).toBeDefined()
  })

  // KX8-3, Lugo-Olivieri: "Single fluid-fluid levels in posttraumatic knee joints do not necessarily
  // represent a lipohemarthrosis. Double fluid-fluid levels are a more specific finding."
  test('a single fluid level is not called lipohaemarthrosis', () => {
    const single = { ...normal, effusion: 'present', 'fat-fluid': 'single' }
    expect(chips(study, 'soft-tissues', single)['Single fluid level']).toBe('Can be blood alone (8 of 12); a fat layer or a double level is more specific')
    expect(chips(study, 'soft-tissues', single).Lipohaemarthrosis).toBeUndefined()
    expect(impressionOf(single)).toBe('Joint effusion.')
  })

  test('contradictions are flagged', () => {
    expect(report(study, { ...normal, segond: 'present', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: Segond fracture.')
    expect(report(study, { ...normal, tibiofemoral: 'dislocated', 'impression-negatives': ['no-dislocation'] }).warnings)
      .toContain('Impression says no dislocation, but these are entered: knee dislocation.')
    expect(report(study, { ...normal, effusion: 'present', 'fat-fluid': 'fat', 'impression-negatives': ['no-lipo', 'no-effusion'] }).warnings)
      .toEqual(['Impression says no joint effusion, but these are entered: joint effusion.', 'Impression says no lipohaemarthrosis, but these are entered: lipohaemarthrosis.'])
    expect(report(study, { ...normal, 'fat-fluid': 'fat' }).warnings).toContain('A fluid level is entered, but the joint effusion is entered as none.')
  })
})
