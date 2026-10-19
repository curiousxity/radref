import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { AnkleMriStudyPage } from './AnkleMriStudy'

const study = studyOf(AnkleMriStudyPage)

describe('ankle MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    // The report steps (technique to impression) link to these ids, so they must not drift.
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'lateral-ligaments', 'syndesmosis', 'medial-ligaments', 'medial-tendons',
      'lateral-tendons', 'posterior', 'anterior', 'spaces', 'plantar', 'impression',
    ])
  })

  test('cites 15 references, each with a DOI', () => {
    expect(study.references).toHaveLength(15)
    for (const ref of study.references) expect(ref.doi, ref.citation).toBeTruthy()
  })
})

/*
 * Report tab. Each rule case pins a chip from the sources table
 * (docs/superpowers/research/2026-10-19-ankle-mri-sources.md, "Rules a builder may turn
 * into chips") at its boundary, with the source sentence quoted above it.
 */

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  protocol: 'complete',
  effusion: 'none',
  marrow: 'normal',
  fracture: 'none',
  olt: 'none',
  atfl: 'intact',
  cfl: 'intact',
  ptfl: 'intact',
  aitfl: 'intact',
  pitfl: 'intact',
  'deltoid-superficial': 'intact',
  'deltoid-deep': 'intact',
  spring: 'normal',
  ptt: 'normal',
  fdl: 'normal',
  fhl: 'normal',
  pb: 'normal',
  pl: 'normal',
  achilles: 'normal',
  'posterior-impingement': 'none',
  'anterior-tendons': 'normal',
  'anterior-impingement': 'none',
  'sinus-tarsi': 'normal',
  'tarsal-tunnel': 'normal',
  'plantar-fascia': 'normal',
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous or tendinous abnormality of the ankle.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('ankle MRI report: steps', () => {
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
})

describe('ankle MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('ATFL: intact')
    expect(text).toContain('Joint effusion: none')
  })

  test('the empty form says where to start and lists every required item', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of [
      'Protocol', 'Joint effusion', 'Bone marrow edema', 'Fracture', 'Osteochondral lesion of the talus',
      'ATFL', 'CFL', 'PTFL', 'AITFL', 'PITFL', 'Superficial deltoid', 'Deep deltoid', 'Spring ligament',
      'Tibialis posterior', 'FDL', 'FHL', 'Peroneus brevis', 'Peroneus longus', 'Achilles tendon',
      'Posterior impingement', 'Anterior tendons', 'Anterior impingement', 'Sinus tarsi', 'Tarsal tunnel',
      'Plantar fascia',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })

  test('partial entry: an ATFL complete tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { atfl: 'complete' })
    expect(text).toContain('ATFL: complete tear')
    expect(text).toContain('Impression: Complete tear of the ATFL.')
    expect(warnings).toContain('CFL not stated')
    expect(warnings).toContain('Plantar fascia not stated')
    expect(warnings).not.toContain('ATFL not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { atfl: 'intact' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    const { text } = report(study, { ...normal, other: 'Tarsal coalition.' })
    expect(text).toContain('Other findings: Tarsal coalition.')
    expect(impressionOf({ ...normal, other: 'Tarsal coalition.' })).toBe('Findings as above.')
  })

  // A threshold chip with nothing else entered is not a normal study: its own sentence, no warning.
  test('recess fluid over 12 mm with nothing else entered stops the normal impression', () => {
    expect(impressionOf({ ...normal, recess: '13' })).toBe('Tibiofibular recess fluid 13 mm (> 12 mm, definitely abnormal).')
    expect(report(study, { ...normal, recess: '13' }).warnings).toEqual([])
  })
  test('peroneal sheath fluid over 3 mm with nothing else entered stops the normal impression', () => {
    expect(impressionOf({ ...normal, 'peroneal-fluid': '4' })).toBe('Circumferential peroneal sheath fluid 4 mm (> 3 mm, highly specific for tenosynovitis).')
    expect(report(study, { ...normal, 'peroneal-fluid': '4' }).warnings).toEqual([])
  })
  test('fluid at or under the chip thresholds keeps the normal impression', () => {
    expect(impressionOf({ ...normal, recess: '12', 'peroneal-fluid': '3' })).toBe(NORMAL_IMPRESSION)
  })

  test('an incomplete protocol qualifies the impression as a limited study', () => {
    const values = { ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] }
    expect(impressionOf(values)).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
    expect(impressionOf({ ...values, atfl: 'complete' })).toBe('Limited study (protocol incomplete).\nComplete tear of the ATFL.')
    expect(impressionOf(normal)).not.toContain('Limited study')
  })

  test('an abnormal study lists its findings in the impression, in search-pattern order', () => {
    const values = { ...normal, effusion: 'moderate', atfl: 'complete', cfl: 'partial', ptt: 'tear', 'ptt-tear-type': 'split' }
    expect(impressionOf(values)).toBe('Moderate joint effusion.\nComplete tear of the ATFL.\nPartial tear of the CFL.\nTibialis posterior: longitudinal split tear.')
    expect(report(study, values).warnings).toEqual([])
  })

  test('pertinent negatives follow the findings', () => {
    const values = { ...normal, atfl: 'interstitial', 'impression-negatives': ['no-fracture', 'no-tendon-tear'] }
    expect(impressionOf(values)).toBe('Interstitial tear of the ATFL.\nNo fracture.\nNo tendon tear.')
  })
})

describe('ankle MRI report: hidden fields', () => {
  test('a tear type set while the tendon is normal writes no tear-type text', () => {
    const values = { ...normal, ptt: 'normal', 'ptt-tear-type': 'complete' }
    const { text } = report(study, values)
    expect(text).toContain('Tibialis posterior: normal')
    expect(text).not.toMatch(/tibialis posterior[^\n]*complete/i)
    expect(impressionOf(values)).toBe(NORMAL_IMPRESSION)
  })

  test('a Hepple appearance set with no osteochondral lesion writes nothing', () => {
    expect(report(study, { ...normal, 'olt-appearance': 'iv' }).text).not.toContain('Hepple')
    expect(chips(study, 'bones', { olt: 'none', 'olt-appearance': 'iv' })['Hepple stage']).toBeUndefined()
  })
})

describe('ankle MRI report: contradictions', () => {
  test('an ATFL complete tear with "no ligament injury" in the impression', () => {
    const { warnings } = report(study, { ...normal, atfl: 'complete', 'impression-negatives': ['no-ligament'] })
    expect(warnings).toContain('Impression says no ligament injury, but these are entered: ATFL complete tear.')
  })

  test('a tendon tear with "no tendon tear" in the impression', () => {
    const { warnings } = report(study, { ...normal, pb: 'tear', 'pb-tear-type': 'split', 'impression-negatives': ['no-tendon-tear'] })
    expect(warnings).toContain('Impression says no tendon tear, but these are entered: peroneus brevis tear.')
  })

  test('a fracture or osteochondral lesion against their negatives', () => {
    expect(report(study, { ...normal, fracture: 'stress', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: stress fracture.')
    expect(report(study, { ...normal, olt: 'present', 'impression-negatives': ['no-olt'] }).warnings)
      .toContain('Impression says no osteochondral lesion, but these are entered: osteochondral lesion of the talus.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-ligament', 'no-tendon-tear', 'no-olt'] }).warnings).toEqual([])
  })

  // "The absence of a hypointense line on T1-weighted images excludes a complete fracture"
  test('a complete fracture entered with no hypointense T1 line', () => {
    const values = { ...normal, marrow: 'bme', 't1-line': 'absent', fracture: 'complete' }
    expect(report(study, values).warnings).toContain('A complete fracture is entered, but so is no hypointense T1 line at the edema site, which excludes a complete fracture there.')
    expect(report(study, { ...values, 't1-line': 'present' }).warnings).toEqual([])
  })

  test('marrow-edema findings entered while bone marrow edema is marked absent', () => {
    expect(report(study, { ...normal, olt: 'present', 'olt-appearance': 'iia' }).warnings)
      .toContain('Bone marrow edema is marked absent, but this is entered: Hepple IIA osteochondral lesion (surrounding bony edema).')
    expect(report(study, { ...normal, marrow: 'bme', olt: 'present', 'olt-appearance': 'iia' }).warnings).toEqual([])
    expect(report(study, { ...normal, ossicles: ['trigonum'], 'ossicle-bme': ['trigonum'] }).warnings)
      .toContain('Bone marrow edema is marked absent, but this is entered: bone marrow edema in an accessory ossicle.')
  })

  // Type A: "without a tear in the tendons or disruption of the superior peroneal retinaculum".
  // Type B: "the peroneus longus tendon subluxates through a longitudinal split tear within the
  // peroneus brevis tendon".
  test('intrasheath subluxation types against the tendons and retinaculum entered', () => {
    const typeA = 'Intrasheath subluxation type A (no tendon tear, retinaculum intact) is entered, but so is a peroneal tendon tear or retinaculum injury.'
    expect(report(study, { ...normal, intrasheath: 'b' }).warnings)
      .toContain('Intrasheath subluxation type B (longus through a brevis split) is entered, but no peroneus brevis longitudinal split tear is.')
    expect(report(study, { ...normal, intrasheath: 'b', pb: 'tear', 'pb-tear-type': 'split' }).warnings).toEqual([])
    expect(report(study, { ...normal, intrasheath: 'a', pl: 'tear', 'pl-tear-type': 'partial' }).warnings).toContain(typeA)
    expect(report(study, { ...normal, intrasheath: 'a', spr: 'avulsed' }).warnings).toContain(typeA)
    expect(report(study, { ...normal, intrasheath: 'a', spr: 'intact' }).warnings).toEqual([])
  })
})

describe('ankle MRI rules: bones (Szaro 2020; Walther 2023)', () => {
  // B4: "Type I: Diffuse or reticular BME, at some distance from the articular cartilage",
  // "Type II: Localized or geographic BME, often with a convex margin and contiguous to the
  // articular cartilage or bony outline", "Type III: The BME often has slight deformation or
  // disruption of the bony outline"; "type I usually corresponds to an injury from a contrecoup
  // mechanism ... type II usually indicates trauma to the ligament attachment, articular capsule,
  // or retinaculum ... Type III is often associated with a fracture or osteochondral lesion"
  test.each([
    ['i', 'Type I: usually a contrecoup mechanism'],
    ['ii', 'Type II: usually trauma to the ligament attachment, articular capsule or retinaculum'],
    ['iii', 'Type III: often associated with a fracture or osteochondral lesion'],
  ])('Costa-Paz pattern %s', (pattern, expected) => {
    expect(chips(study, 'bones', { marrow: 'bme', 'bme-pattern': pattern })['BME (Costa-Paz)']).toBe(expected)
  })
  test('no Costa-Paz chip without marrow edema', () => {
    expect(chips(study, 'bones', { marrow: 'normal', 'bme-pattern': 'i' })['BME (Costa-Paz)']).toBeUndefined()
  })

  // B5: "The absence of a hypointense line on T1-weighted images excludes a complete fracture"
  test('no hypointense T1 line excludes a complete fracture; a line present gives no chip', () => {
    expect(chips(study, 'bones', { marrow: 'bme', 't1-line': 'absent' })['Complete fracture']).toBe('Excluded (no hypointense T1 line)')
    expect(chips(study, 'bones', { marrow: 'bme', 't1-line': 'present' })['Complete fracture']).toBeUndefined()
  })

  // B9: Table 5, "Hepple Classification (MRI)": I "Articular cartilage damage only"; IIA
  // "Cartilage damage with underlying fracture and surrounding bony edema"; IIB "IIA without bony
  // edema"; III "Detached but undisplaced fragment"; IV "Detached and displaced fragment";
  // V "Subchondral cyst formation"
  test.each([
    ['i', 'I'], ['iia', 'IIA'], ['iib', 'IIB'], ['iii', 'III'], ['iv', 'IV'], ['v', 'V'],
  ])('Hepple appearance %s is stage %s', (appearance, stage) => {
    expect(chips(study, 'bones', { olt: 'present', 'olt-appearance': appearance })['Hepple stage']).toBe(stage)
  })
  test('the Hepple stage reaches the report', () => {
    expect(report(study, { ...normal, olt: 'present', 'olt-site': 'medial', 'olt-appearance': 'iii' }).text)
      .toContain('Osteochondral lesion of the talus: medial talar dome; detached but undisplaced fragment (Hepple III)')
  })
})

describe('ankle MRI rules: lateral ligaments (Sawant 2018)', () => {
  // L1: "Acute ligament injuries can be graded as interstitial, partial, or complete tear."
  // Interstitial: "Hyperintense signal within the ligament on PD and T2W images"; Partial:
  // "Partial discontinuity of ligaments reaching up to the surface but not involving the entire
  // thickness of ligament"; Complete: "Discontinuity involving the entire thickness of ligament"
  test.each([
    ['interstitial', 'Interstitial tear'],
    ['partial', 'Partial tear'],
    ['complete', 'Complete tear'],
  ])('%s appearance grades as %s for each lateral ligament', (status, grade) => {
    const c = chips(study, 'lateral-ligaments', { atfl: status, cfl: status, ptfl: status })
    expect(c['ATFL (Sawant)']).toBe(grade)
    expect(c['CFL (Sawant)']).toBe(grade)
    expect(c['PTFL (Sawant)']).toBe(grade)
  })
  test('intact and chronic ligaments get no acute grade', () => {
    const c = chips(study, 'lateral-ligaments', { atfl: 'intact', cfl: 'chronic' })
    expect(c['ATFL (Sawant)']).toBeUndefined()
    expect(c['CFL (Sawant)']).toBeUndefined()
  })

  // L5: "Normal thickness of ATFL is 2 – 3 mm, and CFL is 2 mm." A normal value, not a cut-off
  // for abnormal, so it is help text and gives no chip.
  test.each(['1.9', '2', '3', '3.1'])('ATFL and CFL thickness %s mm give no chip', (mm) => {
    expect(chips(study, 'lateral-ligaments', { 'atfl-thickness': mm, 'cfl-thickness': mm })).toEqual({})
  })
  test('the normal thicknesses stay in the help text', () => {
    const fields = study.report.steps.flatMap((step) => step.fields)
    expect(fields.find((f) => f.id === 'atfl-thickness')?.help).toBe('Normal 2–3 mm.')
    expect(fields.find((f) => f.id === 'cfl-thickness')?.help).toBe('Normal 2 mm.')
  })

  // L1 interstitial: "Hyperintense signal within the ligament on PD and T2W images due to presence
  // of edema or hemorrhage"
  test('the interstitial option uses the source wording', () => {
    const atfl = study.report.steps.flatMap((step) => step.fields).find((f) => f.id === 'atfl')
    expect(atfl && 'options' in atfl ? atfl.options.find((o) => o.value === 'interstitial')?.label : undefined)
      .toBe('High signal within the ligament (edema or hemorrhage)')
  })
})

describe('ankle MRI rules: syndesmosis (Oae 2003; Sawant 2018)', () => {
  // S1: "When MR imaging revealed ligament discontinuity (criterion 1) or either a wavy or curved
  // ligament contour or nonvisualization of the ligament (criterion 2), the injury was considered
  // to be a ligament disruption."
  test.each([
    ['discontinuity', 'Disruption (criterion 1)'],
    ['wavy', 'Disruption (criterion 2)'],
    ['not-seen', 'Disruption (criterion 2)'],
  ])('%s is %s', (status, expected) => {
    const c = chips(study, 'syndesmosis', { aitfl: status, pitfl: status })
    expect(c['AITFL (Oae)']).toBe(expected)
    expect(c['PITFL (Oae)']).toBe(expected)
  })
  test('an intact ligament gets no disruption chip', () => {
    expect(chips(study, 'syndesmosis', { aitfl: 'intact' })['AITFL (Oae)']).toBeUndefined()
  })

  // S3: "Fluid in Tibiofibular recess normally measures 5–7 mm." and "Fluid in the tibiofibular
  // recess measuring >12 mm is definitely abnormal and suggestive of acute injury to syndesmotic
  // ligaments". Only the > 12 mm cut-off is a chip; the 5-7 mm normal value is help text.
  test.each([
    ['4.9', undefined],
    ['5', undefined],
    ['7', undefined],
    ['7.1', undefined],
    ['12', undefined],
    ['12.1', 'Definitely abnormal (> 12 mm): suggests acute syndesmotic injury'],
  ])('tibiofibular recess %s mm', (mm, expected) => {
    expect(chips(study, 'syndesmosis', { recess: mm })['Tibiofibular recess fluid']).toBe(expected)
  })
})

describe('ankle MRI rules: medial ligament thickness (Sawant 2018)', () => {
  // M2: "Normal thickness of TNL is 1–2 mm, and TSL is 2 mm (1–4mm). The PTTL is thickest
  // ligament and normally measures 6–11 mm."
  // M3: "Normal thickness of SM component is 3 mm (2–5 mm), and IPL component is 4 mm (2–6 mm)."
  // Normal values, not cut-offs for abnormal: help text only, no chip.
  test.each([
    ['tnl-thickness', 'Normal 1–2 mm.'],
    ['tsl-thickness', 'Normal 2 mm (1–4 mm).'],
    ['pttl-thickness', 'Normal 6–11 mm.'],
    ['spring-sm-thickness', 'Normal 3 mm (2–5 mm).'],
    ['spring-ipl-thickness', 'Normal 4 mm (2–6 mm).'],
  ])('%s gives no chip and keeps its normal in the help', (id, help) => {
    for (const mm of ['0.5', '3', '12']) expect(chips(study, 'medial-ligaments', { [id]: mm })).toEqual({})
    expect(study.report.steps.flatMap((step) => step.fields).find((f) => f.id === id)?.help).toBe(help)
  })
})

describe('ankle MRI rules: lateral tendons (Davda 2017; Huuskonen 2023)', () => {
  // P1: "Circumferential fluid within the common peroneal tendon sheath wider than 3 mm is highly
  // specific for peroneal tenosynovitis"
  test('sheath fluid 3 mm gives no chip; 3.1 mm does', () => {
    expect(chips(study, 'lateral-tendons', { 'peroneal-fluid': '3' })['Peroneal sheath fluid']).toBeUndefined()
    expect(chips(study, 'lateral-tendons', { 'peroneal-fluid': '3.1' })['Peroneal sheath fluid']).toBe('Highly specific for tenosynovitis (> 3 mm)')
  })

  // P6: "type A involves the peroneus brevis and longus tendon snapping over one another and
  // switching their relative positions ... (type B), the peroneus longus tendon subluxates through
  // a longitudinal split tear within the peroneus brevis tendon"
  test.each([['a', 'Type A'], ['b', 'Type B']])('intrasheath subluxation %s is %s', (value, expected) => {
    expect(chips(study, 'lateral-tendons', { intrasheath: value })['Intrasheath subluxation (Davda, after Raikin)']).toBe(expected)
  })
  test('no intrasheath subluxation gives no chip', () => {
    expect(chips(study, 'lateral-tendons', { intrasheath: 'none' })['Intrasheath subluxation (Davda, after Raikin)']).toBeUndefined()
  })

  // P7: "tears occurring under the superior retinaculum" (A); "the region of the inferior peroneal
  // retinaculum" (B); "at the cuboid notch and is the region where longus pathology occurs most often" (C)
  test.each([['spr', 'Zone A'], ['ipr', 'Zone B'], ['cuboid', 'Zone C']])('tear site %s is %s', (site, zone) => {
    expect(chips(study, 'lateral-tendons', { pb: 'tear', 'pb-tear-site': site })['Peroneus brevis tear (Brandes-Smith)']).toBe(zone)
    expect(chips(study, 'lateral-tendons', { pl: 'tear', 'pl-tear-site': site })['Peroneus longus tear (Brandes-Smith)']).toBe(zone)
  })
  test('a tear elsewhere has no zone', () => {
    expect(chips(study, 'lateral-tendons', { pb: 'tear', 'pb-tear-site': 'other' })['Peroneus brevis tear (Brandes-Smith)']).toBeUndefined()
  })

  // P8: "It is diagnosed when the muscle belly extends below the superior margin of the SPR."
  // P9: "The PB was considered low-lying if the muscle belly was seen at least at the level of the
  // lateral malleolus at the level where the posterior talofibular ligament (PTFL) attaches."
  test('each low-lying definition is named on its own', () => {
    const davda = chips(study, 'lateral-tendons', { 'pb-belly': ['below-spr'] })
    expect(davda['Low-lying peroneus brevis (Davda)']).toBe('Met: belly below the superior margin of the SPR')
    expect(davda['Low-lying peroneus brevis (Huuskonen)']).toBeUndefined()
    const huuskonen = chips(study, 'lateral-tendons', { 'pb-belly': ['ptfl-level'] })
    expect(huuskonen['Low-lying peroneus brevis (Huuskonen)']).toBe('Met: belly at least at the PTFL attachment level')
    expect(huuskonen['Low-lying peroneus brevis (Davda)']).toBeUndefined()
  })

  // P11: "Prominence of the tubercle of > 5 mm in height is reported to be related to peroneus
  // longus impingement and stenosing tenosynovitis"
  test('tubercle 5 mm gives no chip; 5.1 mm does', () => {
    expect(chips(study, 'lateral-tendons', { 'tubercle-height': '5' })['Peroneal tubercle height']).toBeUndefined()
    expect(chips(study, 'lateral-tendons', { 'tubercle-height': '5.1' })['Peroneal tubercle height'])
      .toBe('> 5 mm: reported to relate to peroneus longus impingement and stenosing tenosynovitis')
  })

  // P12: "If the length of the peroneal tubercle, measured from the lateral margin of the
  // calcaneus, exceeded the width of each peroneal tendon it was defined as prominent."
  test('tubercle length equal to the wider tendon is not prominent; longer is', () => {
    expect(chips(study, 'lateral-tendons', { 'tubercle-length': '4', 'peroneal-width': '4' })['Peroneal tubercle (Huuskonen)']).toBe('Not prominent')
    expect(chips(study, 'lateral-tendons', { 'tubercle-length': '4.1', 'peroneal-width': '4' })['Peroneal tubercle (Huuskonen)']).toBe('Prominent')
  })
})

describe('ankle MRI rules: posterior (Szaro 2021)', () => {
  // A6: "The distal total rupture of the Achilles tendon within 2 cm of the insertion is fortunately rare"
  test('a rupture 2 cm from the insertion is distal; 2.1 cm is not', () => {
    expect(chips(study, 'posterior', { achilles: 'complete', 'achilles-distance': '2' })['Rupture site']).toBe('Distal (within 2 cm of the insertion), rare')
    expect(chips(study, 'posterior', { achilles: 'complete', 'achilles-distance': '2.1' })['Rupture site']).toBeUndefined()
  })

  // A7: "The presence of bone marrow edema within the bone deformation, retrocalcaneal bursitis and
  // insertional tendinopathy comprise Haglund's syndrome"
  const triad: Values = { marrow: 'bme', achilles: 'insertional', 'achilles-other': ['bursitis', 'prominence-bme'] }
  test('all three findings make the Haglund triad', () => {
    expect(chips(study, 'posterior', triad)["Haglund's syndrome"]).toBe('All three findings present')
    expect(impressionOf({ ...normal, ...triad })).toContain("Haglund's syndrome: bone marrow edema in the posterosuperior calcaneal prominence, retrocalcaneal bursitis and insertional tendinopathy.")
  })
  test.each([
    ['no insertional tendinopathy', { ...triad, achilles: 'tendinosis' }],
    ['no bursitis', { ...triad, 'achilles-other': ['prominence-bme'] }],
    ['no prominence edema', { ...triad, 'achilles-other': ['bursitis'] }],
  ])('two of three (%s) is not the triad', (_name, values) => {
    expect(chips(study, 'posterior', values as Values)["Haglund's syndrome"]).toBeUndefined()
  })
})

describe('ankle MRI rules: descriptive-only items have no chips', () => {
  // Effusion levels (T4), SPR grades (P5), tibialis posterior tear types (MT2), anterior tendons
  // (N8), interosseous membrane (S7) and plantar fascia thickness (PF6) are descriptive only.
  test.each(['technique', 'medial-ligaments', 'medial-tendons', 'anterior', 'spaces', 'plantar', 'impression'])('%s has no derive', (stepId) => {
    const step = study.report.steps.find((s) => s.id === stepId)
    expect(step).toBeDefined()
    expect(step?.derive).toBeUndefined()
  })
  test('SPR and interosseous membrane entries give no chips', () => {
    expect(chips(study, 'lateral-tendons', { spr: 'avulsed' })).toEqual({})
    expect(chips(study, 'syndesmosis', { iom: 'abnormal' })).toEqual({})
  })
})

describe('ankle MRI report: exact builder output', () => {
  const textLines = (values: Values) => report(study, values).text.split('\n')

  test('ATFL and CFL thickness reach the report', () => {
    const out = textLines({ ...normal, 'atfl-thickness': '2.5', cfl: 'partial', 'cfl-thickness': '3' })
    expect(out).toContain('ATFL: intact; thickness 2.5 mm')
    expect(out).toContain('CFL: partial tear; thickness 3 mm')
  })

  // Each threshold chip's conclusion stays in the impression next to a named finding.
  test('recess fluid over 12 mm alongside a ligament tear', () => {
    expect(impressionOf({ ...normal, atfl: 'complete', recess: '13' }))
      .toBe('Complete tear of the ATFL.\nTibiofibular recess fluid 13 mm (> 12 mm, definitely abnormal).')
    expect(impressionOf({ ...normal, atfl: 'complete', recess: '12' })).toBe('Complete tear of the ATFL.')
  })
  test('peroneal sheath fluid over 3 mm alongside peroneus brevis tendinosis', () => {
    expect(impressionOf({ ...normal, pb: 'tendinosis', 'peroneal-fluid': '4' }))
      .toBe('Peroneus brevis: tendinosis.\nCircumferential peroneal sheath fluid 4 mm (> 3 mm, highly specific for tenosynovitis).')
    expect(impressionOf({ ...normal, pb: 'tendinosis', 'peroneal-fluid': '3' })).toBe('Peroneus brevis: tendinosis.')
  })
  test('tubercle height over 5 mm alongside a peroneus longus tear', () => {
    expect(impressionOf({ ...normal, pl: 'tear', 'pl-tear-type': 'partial', 'tubercle-height': '6' }))
      .toBe('Peroneus longus: partial tear.\nPeroneal tubercle 6 mm high (> 5 mm, reported to relate to peroneus longus impingement and stenosing tenosynovitis).')
    expect(impressionOf({ ...normal, pl: 'tear', 'pl-tear-type': 'partial', 'tubercle-height': '5' })).toBe('Peroneus longus: partial tear.')
  })
  test('a Huuskonen-prominent tubercle alongside a ligament tear', () => {
    expect(impressionOf({ ...normal, atfl: 'complete', 'tubercle-length': '5', 'peroneal-width': '4' }))
      .toBe('Complete tear of the ATFL.\nPeroneal tubercle prominent by the Huuskonen definition (length 5 mm, wider peroneal tendon 4 mm).')
    expect(impressionOf({ ...normal, atfl: 'complete', 'tubercle-length': '4', 'peroneal-width': '4' })).toBe('Complete tear of the ATFL.')
  })

  test('free-text other findings are pointed to when other findings exist', () => {
    expect(impressionOf({ ...normal, atfl: 'complete', other: 'Os subfibulare.' })).toBe('Complete tear of the ATFL.\nOther findings as above.')
    expect(impressionOf({ ...normal, atfl: 'complete', other: 'Os subfibulare.', 'impression-negatives': ['no-fracture'] }))
      .toBe('Complete tear of the ATFL.\nOther findings as above.\nNo fracture.')
  })

  test('pertinent negatives are kept under "Findings as above"', () => {
    expect(impressionOf({ ...normal, other: 'Tarsal coalition.', 'impression-negatives': ['no-fracture', 'no-tendon-tear'] }))
      .toBe('Findings as above.\nNo fracture.\nNo tendon tear.')
  })

  test.each(['none', ' None ', 'nil', 'N/A', 'n/a.'])('other findings "%s" do not block the normal impression', (other) => {
    expect(impressionOf({ ...normal, other })).toBe(NORMAL_IMPRESSION)
  })

  test("Haglund's syndrome replaces the separate Achilles, bursitis and prominence sentences", () => {
    const values = { ...normal, marrow: 'bme', achilles: 'insertional', 'achilles-other': ['bursitis', 'prominence-bme'] }
    expect(impressionOf(values)).toBe("Bone marrow edema.\nHaglund's syndrome: bone marrow edema in the posterosuperior calcaneal prominence, retrocalcaneal bursitis and insertional tendinopathy.")
    expect(impressionOf({ ...values, 'achilles-other': ['bursitis'] }))
      .toBe('Bone marrow edema.\nAchilles tendon: insertional tendinopathy.\nRetrocalcaneal bursitis.')
  })

  test('switching marrow edema to none hides its site, pattern and T1-line answers', () => {
    const edema = { ...normal, marrow: 'bme', 'bme-site': 'medial talus', 'bme-pattern': 'ii', 't1-line': 'absent' }
    expect(textLines(edema)).toContain('Bone marrow: edema in medial talus; localized or geographic, contiguous to the cartilage or bony outline (Costa-Paz type II); no hypointense line on T1')
    const switched = { ...edema, marrow: 'normal' }
    const { text, warnings } = report(study, switched)
    expect(text.split('\n')).toContain('Bone marrow: no edema')
    expect(text).not.toMatch(/medial talus|Costa-Paz|hypointense/)
    expect(chips(study, 'bones', switched)).toEqual({})
    expect(impressionOf(switched)).toBe(NORMAL_IMPRESSION)
    expect(warnings).toEqual([])
  })

  test('ossicle edema names the ossicle it is in', () => {
    const values = { ...normal, marrow: 'bme', ossicles: ['trigonum', 'peroneum'], 'ossicle-bme': ['trigonum'] }
    expect(textLines(values)).toContain('Accessory ossicles: os trigonum, os peroneum; bone marrow edema in os trigonum')
    expect(impressionOf(values)).toBe('Bone marrow edema.\nBone marrow edema in an accessory ossicle: os trigonum.')
  })

  test('the Achilles partial option is labelled "Partial tear"', () => {
    expect(textLines({ ...normal, achilles: 'partial' })).toContain('Achilles tendon: partial tear')
  })
})

describe('ankle MRI report: output text', () => {
  const cases: Values[] = [
    {},
    normal,
    { atfl: 'complete' },
    { ...normal, marrow: 'bme', 'bme-site': 'medial talus', 'bme-pattern': 'i', 't1-line': 'absent', fracture: 'stress', 'fracture-site': 'distal tibia' },
    { ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'], ossicles: ['trigonum', 'peroneum'], 'ossicle-bme': [] },
    { ...normal, pb: 'tear', 'pb-tear-type': 'split', 'pb-tear-site': 'spr', 'peroneal-fluid': '4', intrasheath: 'b', spr: 'avulsed', 'peroneal-position': 'subluxed', 'pb-belly': ['below-spr', 'ptfl-level'], quartus: 'present', 'tubercle-height': '6', 'tubercle-length': '5', 'peroneal-width': '4' },
    { ...normal, achilles: 'complete', 'achilles-distance': '5', 'achilles-gap': '2', 'posterior-impingement': 'present', 'posterior-impingement-findings': ['kager', 'stieda'] },
    { ...normal, aitfl: 'wavy', pitfl: 'not-seen', recess: '13', iom: 'abnormal', 'iom-text': 'edema', spring: 'abnormal', 'spring-findings': ['signal'], 'sinus-tarsi': 'abnormal', 'sinus-tarsi-findings': ['ganglion'], 'tarsal-tunnel': 'abnormal', 'plantar-fascia': 'fasciitis', 'plantar-thickness': '7', 'anterior-tendons': 'abnormal', 'anterior-impingement': 'present', other: 'Small ganglion dorsal midfoot.' },
  ]
  test.each(cases.map((values, i) => [i, values]))('case %i never prints placeholder text or double spaces', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      expect(out).not.toMatch(/ {2}/)
    }
  })
})

describe('ankle MRI quiz', () => {
  test('quiz has 8-12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const q of study.quiz) {
      expect(Number.isInteger(q.answer), q.id).toBe(true)
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
      expect(q.answer, q.id).toBeLessThan(q.options.length)
    }
    expect(new Set(study.quiz.map((q) => q.id)).size).toBe(study.quiz.length)
  })
})
