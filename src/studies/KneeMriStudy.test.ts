import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { KneeMriStudyPage } from './KneeMriStudy'

const study = studyOf(KneeMriStudyPage)

/*
 * Unchecked draft. Every rule case below quotes a claim from
 * docs/superpowers/research/2026-10-23-knee-mri-sources.md by its ID. The references are
 * matched, but only the claims marked verified there were read in their papers; when the rest
 * are checked a case may have to change; say in that commit why the old expectation was wrong.
 */

describe('knee MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'medial-meniscus', 'lateral-meniscus', 'acl', 'pcl', 'mcl', 'lateral-side',
      'extensor', 'cartilage', 'synovium', 'impression',
    ])
  })

  // The references are matched (each has a DOI), but some claims are still unchecked (listed
  // in the note), so the note keeps saying so. Schatzker 1979 is the one exception: PubMed has no
  // DOI for it and Crossref finds none, so it is cited without one.
  test('is still marked as an unchecked draft, with a DOI on every reference but Schatzker 1979', () => {
    expect(study.sourceNote).toMatch(/^Unchecked draft/)
    // 20 since Recht 2005 was added for describing a cartilage defect; 23 since three open
    // reviews were added as second citations (2026-10-29): Parkar and Adriaensen 2024 (Segond
    // and ACL tear), Chien 2020 (ACL graft complications), Crone 2026 (the level of the 11°
    // trochlear measurement).
    expect(study.references).toHaveLength(23)
    for (const ref of study.references) {
      if (ref.citation.startsWith('Schatzker J, McBroom R, Bruce D.')) expect(ref.doi, ref.citation).toBeUndefined()
      else expect(ref.doi, ref.citation).toMatch(/^10\./)
    }
  })
})

/** A complete normal study: every required item answered with its normal choice. */
const normal: Values = {
  protocol: 'complete',
  effusion: 'none',
  'fat-fluid': 'absent',
  marrow: 'none',
  fracture: 'none',
  segond: 'absent',
  subchondral: 'none',
  ocd: 'none',
  mm: 'intact',
  lm: 'intact',
  'acl-status': 'native',
  acl: 'intact',
  pcl: 'intact',
  mcl: 'intact',
  lcl: 'intact',
  biceps: 'normal',
  popliteus: 'normal',
  itb: 'normal',
  quadriceps: 'normal',
  'patellar-tendon': 'normal',
  mpfl: 'intact',
  'cartilage-pf': 'normal',
  'cartilage-medial': 'normal',
  'cartilage-lateral': 'normal',
  baker: 'absent',
  parameniscal: 'none',
  synovitis: 'absent',
  hoffa: 'normal',
}

const NORMAL_IMPRESSION = 'No acute osseous, meniscal, ligamentous or tendinous abnormality of the knee.'

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('knee MRI report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items are one status field per structure, plus the graft after reconstruction', () => {
    const required = study.report.steps.flatMap((step) => step.fields.filter((f) => f.required).map((f) => f.id))
    expect(required.sort()).toEqual([...Object.keys(normal), 'graft'].sort())
  })
})

describe('knee MRI report: whole cases', () => {
  test('normal: no warnings and a plain impression', () => {
    const { text, warnings } = report(study, normal)
    expect(warnings).toEqual([])
    expect(impressionOf(normal)).toBe(NORMAL_IMPRESSION)
    expect(text).toContain('Medial meniscus: intact')
    expect(text).toContain('ACL: intact')
    expect(text).toContain('Fat-fluid level: none')
  })

  test('the empty form says where to start and lists the required items', () => {
    const { text, warnings } = report(study)
    expect(text).toBe('Start with Step 1 to build the report.')
    for (const label of ['Protocol', 'Joint effusion', 'Fat-fluid level', 'Medial meniscus', 'Lateral meniscus', 'ACL', 'PCL', 'MCL', 'LCL', 'MPFL', 'Patellofemoral cartilage', 'Hoffa fat pad']) {
      expect(warnings).toContain(`${label} not stated`)
    }
    // The native ACL and the graft are only asked once the ACL is called native or reconstructed.
    expect(warnings).not.toContain('Native ACL not stated')
    expect(warnings).not.toContain('ACL graft not stated')
  })

  test('partial entry: a medial meniscal tear alone gives its line and lists the blanks', () => {
    const { text, warnings } = report(study, { mm: 'tear', 'mm-type': 'radial', 'mm-sites': ['posterior'], 'mm-images': '3' })
    expect(text).toContain('Medial meniscus: radial tear; posterior horn; seen on 3 images')
    expect(text).toContain('Impression: Radial tear of the medial meniscus.')
    expect(warnings).toContain('Lateral meniscus not stated')
    expect(warnings).not.toContain('Medial meniscus not stated')
  })

  test('an incomplete normal-looking entry gets no impression yet', () => {
    expect(report(study, { mm: 'intact' }).text).not.toContain('Impression')
  })

  test('free-text other findings stop the normal impression', () => {
    expect(impressionOf({ ...normal, other: 'Loose body in the notch.' })).toBe('Findings as above.')
  })

  test('an abnormal study lists its findings in search-pattern order', () => {
    const values = { ...normal, effusion: 'moderate', mm: 'tear', 'mm-type': 'displaced', 'mm-images': '2', acl: 'complete', mcl: 'partial', 'cartilage-medial': 'full' }
    expect(impressionOf(values)).toBe([
      'Moderate joint effusion.',
      'Tear of the medial meniscus with a displaced fragment (bucket-handle or flap).',
      'Complete tear of the ACL.',
      'Partial tear of the MCL.',
      'Cartilage: medial compartment: full thickness.',
    ].join('\n'))
    expect(report(study, values).warnings).toEqual([])
  })

  test('an incomplete protocol qualifies the impression as a limited study', () => {
    const values = { ...normal, protocol: 'incomplete', 'protocol-missing': ['t1'] }
    expect(impressionOf(values)).toBe(`Limited study (protocol incomplete).\n${NORMAL_IMPRESSION}`)
  })

  test('pertinent negatives follow the findings', () => {
    const values = { ...normal, pcl: 'partial', 'impression-negatives': ['no-fracture', 'no-meniscal-tear'] }
    expect(impressionOf(values)).toBe('Partial tear of the PCL.\nNo fracture.\nNo meniscal tear.')
  })
})

describe('knee MRI report: variants get their own impression line', () => {
  // The author's decision (2026-10-23): variants are named in the impression, one line each.
  test('a variant after a normal study keeps the normal line and adds its own', () => {
    expect(impressionOf({ ...normal, 'bone-variants': ['bipartite', 'fabella'] }))
      .toBe(`${NORMAL_IMPRESSION}\nBipartite patella (anatomical variant).\nFabella (anatomical variant).`)
  })

  test('a discoid lateral meniscus follows the findings', () => {
    const values = { ...normal, 'lm-discoid': 'yes', 'lm-discoid-images': '4', pcl: 'complete' }
    expect(impressionOf(values)).toBe('Complete tear of the PCL.\nDiscoid lateral meniscus (anatomical variant).')
  })
})

describe('knee MRI report: ACL native or reconstructed', () => {
  test('a reconstructed ACL asks for the graft, not the native ligament', () => {
    const values = { ...normal, 'acl-status': 'reconstructed', acl: 'complete' }
    const { text, warnings } = report(study, values)
    expect(warnings).toContain('ACL graft not stated')
    expect(text).not.toContain('ACL: complete')
  })

  test('a graft tear and its complications', () => {
    const values = { ...normal, 'acl-status': 'reconstructed', graft: 'complete', 'graft-findings': ['cyclops', 'widening'] }
    expect(report(study, values).text).toContain('ACL graft: complete tear; localised anterior arthrofibrosis (cyclops lesion), tunnel widening')
    expect(impressionOf(values)).toBe('Complete tear of the ACL graft.\nACL graft: localised anterior arthrofibrosis (cyclops lesion), tunnel widening.')
  })

  test('an intact graft with no complications is a normal study', () => {
    expect(impressionOf({ ...normal, 'acl-status': 'reconstructed', graft: 'intact' })).toBe(NORMAL_IMPRESSION)
  })
})

describe('knee MRI report: hidden fields', () => {
  test('a tear type set while the meniscus is intact writes nothing', () => {
    const values = { ...normal, mm: 'intact', 'mm-type': 'radial', 'mm-images': '1' }
    expect(report(study, values).text).not.toContain('radial')
    expect(chips(study, 'medial-meniscus', values)['Two-slice-touch']).toBeUndefined()
    expect(report(study, values).warnings).toEqual([])
  })

  test('Schatzker answers left behind when the fracture is cleared write nothing', () => {
    const values = { ...normal, fracture: 'none', plateau: 'lateral', 'plateau-pattern': 'split', 'plateau-dissociation': 'no' }
    expect(report(study, values).text).not.toContain('Schatzker')
    expect(chips(study, 'bones', values).Schatzker).toBeUndefined()
  })

  test('a bruise pattern left behind when edema is cleared writes nothing', () => {
    const values = { ...normal, marrow: 'none', 'bruise-pattern': 'pivot' }
    expect(chips(study, 'bones', values)['Bruise pattern points to']).toBeUndefined()
    expect(report(study, values).warnings).toEqual([])
  })
})

describe('knee MRI rules (unchecked)', () => {
  // K1-1: "A fat-fluid level in the knee (lipohaemarthrosis) indicates an intra-articular fracture."
  test('a fat-fluid level', () => {
    expect(chips(study, 'technique', { 'fat-fluid': 'present' })['Fat-fluid level']).toBe('Indicates an intra-articular fracture')
    expect(chips(study, 'technique', { 'fat-fluid': 'absent' })['Fat-fluid level']).toBeUndefined()
    expect(report(study, { ...normal, 'fat-fluid': 'present' }).warnings)
      .toContain('A fat-fluid level is entered, which indicates an intra-articular fracture, but no fracture is entered.')
    expect(report(study, { ...normal, 'fat-fluid': 'present', fracture: 'present' }).warnings).toEqual([])
  })

  // K2-1 to K2-5: the bruise patterns of Sanders et al.
  test('each bruise pattern points to its injury', () => {
    const pointsTo = (pattern: string) => chips(study, 'bones', { marrow: 'present', 'bruise-pattern': pattern })['Bruise pattern points to']
    expect(pointsTo('pivot')).toBe('ACL tear (pivot shift)')
    expect(pointsTo('dashboard')).toBe('PCL injury (dashboard)')
    expect(pointsTo('hyperextension')).toBe('ACL, PCL and posterolateral corner (hyperextension)')
    expect(pointsTo('clip')).toBe('MCL injury (clip)')
    expect(pointsTo('patellar')).toBe('Lateral patellar dislocation: check the MPFL')
    expect(pointsTo('other')).toBeUndefined()
  })

  // K2-1: the pivot-shift pattern is "the footprint of an ACL tear".
  test('a pivot-shift pattern with an intact ACL is flagged', () => {
    const values = { ...normal, marrow: 'present', 'bruise-pattern': 'pivot' }
    expect(report(study, values).warnings).toContain('The pivot-shift bruise pattern is entered, the footprint of an ACL tear, but the ACL is entered as intact.')
    expect(report(study, { ...values, acl: 'complete' }).warnings).toEqual([])
  })

  // SZ-1 to SZ-6, through the shared logic in src/logic/schatzker.ts.
  test('a tibial plateau fracture gets its Schatzker type', () => {
    const plateau = { fracture: 'present', plateau: 'lateral', 'plateau-pattern': 'split-depression', 'plateau-dissociation': 'no' }
    expect(chips(study, 'bones', plateau).Schatzker).toBe('Type II')
    expect(chips(study, 'bones', { ...plateau, 'plateau-dissociation': 'yes' }).Schatzker).toBe('Type VI')
    expect(chips(study, 'bones', { ...plateau, plateau: 'both' }).Schatzker).toBe('Type V')
    // Not decided until dissociation is answered.
    expect(chips(study, 'bones', { ...plateau, 'plateau-dissociation': '' }).Schatzker).toBeUndefined()
    expect(impressionOf({ ...normal, ...plateau, 'plateau-depression': '6', 'fat-fluid': 'present' }))
      .toBe('Lipohemarthrosis, indicating an intra-articular fracture.\nTibial plateau fracture, Schatzker type II: split with depression of the lateral plateau, articular depression 6 mm.')
  })

  // SZ-3: "compression fracture of the lateral (type IIIA) or central (type IIIB) plateau"
  // (Markhardt 2009, abstract). The draft had type III only; the subtypes are added because the
  // paper gives them.
  test('a pure depression of the lateral plateau is IIIA or IIIB by its site', () => {
    const depression = { fracture: 'present', plateau: 'lateral', 'plateau-pattern': 'depression', 'plateau-dissociation': 'no' }
    expect(chips(study, 'bones', depression).Schatzker).toBe('Type III')
    expect(chips(study, 'bones', { ...depression, 'plateau-depression-site': 'lateral' }).Schatzker).toBe('Type IIIA')
    expect(chips(study, 'bones', { ...depression, 'plateau-depression-site': 'central' }).Schatzker).toBe('Type IIIB')
    expect(impressionOf({ ...normal, ...depression, 'plateau-depression-site': 'central' }))
      .toBe('Tibial plateau fracture, Schatzker type IIIB: compression fracture of the central plateau.')
  })

  // K2-6: a Segond fracture "is associated with ACL tear".
  test('a Segond fracture with an intact ACL is flagged', () => {
    expect(chips(study, 'bones', { segond: 'present' })['Segond fracture']).toBe('Associated with ACL tear')
    expect(report(study, { ...normal, segond: 'present' }).warnings).toContain('A Segond fracture is entered, which is associated with ACL tear, but the ACL is entered as intact.')
    expect(report(study, { ...normal, segond: 'present', acl: 'partial' }).warnings).toEqual([])
  })

  // K2-7: "thicker than 4 mm or longer than 14 mm predicts an irreversible lesion".
  test('subchondral low-signal area at the 4 mm and 14 mm boundaries', () => {
    const lesion = (thickness: string, length: string) => chips(study, 'bones', { subchondral: 'present', 'subchondral-thickness': thickness, 'subchondral-length': length })['Subchondral lesion']
    expect(lesion('4', '14')).toBe('Predicts a transient lesion (≤ 4 mm thick and ≤ 14 mm long)')
    expect(lesion('4.5', '14')).toBe('Predicts an irreversible lesion (> 4 mm thick or > 14 mm long)')
    expect(lesion('4', '15')).toBe('Predicts an irreversible lesion (> 4 mm thick or > 14 mm long)')
    // One measurement within its limit does not decide it.
    expect(lesion('3', '')).toBeUndefined()
  })

  // K3-1: "abnormal signal touching the meniscal surface on two or more images is diagnosed
  // as a tear; on one image only ... it is a possible tear."
  test('two-slice-touch at the one- and two-image boundary', () => {
    const tear = (images: string) => chips(study, 'medial-meniscus', { mm: 'tear', 'mm-images': images })['Two-slice-touch']
    expect(tear('2')).toBe('Tear (two or more images)')
    expect(tear('1')).toBe('Possible tear (one image only)')
    expect(tear('')).toBeUndefined()
    const values = { ...normal, mm: 'tear', 'mm-type': 'horizontal', 'mm-images': '1' }
    expect(impressionOf(values)).toBe('Possible horizontal tear of the medial meniscus (signal touching the surface on one image only).')
    expect(report(study, values).warnings).toContain('A medial meniscal tear is entered, but signal touches the surface on one image only, which the two-slice-touch rule calls a possible tear.')
  })

  // K3-3: "Substantial medial meniscus extrusion (> 3 mm) is associated with severe meniscal
  // degeneration, extensive tear, complex tear, large radial tear, and tear involving the
  // meniscal root" (Costa 2004, abstract), with "minor (</= 3 mm)" the other group. The draft
  // fired at 3 mm or more, so it put exactly 3 mm in the wrong group.
  test('medial meniscal extrusion over 3 mm', () => {
    const extrusion = (mm: string) => chips(study, 'medial-meniscus', { 'mm-extrusion': mm }).Extrusion
    expect(extrusion('3.5')).toBe('> 3 mm: associated with severe degeneration, extensive tearing and root tears')
    expect(extrusion('3')).toBeUndefined()
    expect(impressionOf({ ...normal, 'mm-extrusion': '3.5' })).toBe('Medial meniscal extrusion 3.5 mm.')
    expect(impressionOf({ ...normal, 'mm-extrusion': '3' })).toBe(NORMAL_IMPRESSION)
  })

  // K4-1: "continuity between the anterior and posterior horns ... on three or more consecutive
  // 5-mm sagittal images."
  test('discoid lateral meniscus at three images', () => {
    const discoid = (images: string) => chips(study, 'lateral-meniscus', { 'lm-discoid': 'yes', 'lm-discoid-images': images }).Discoid
    expect(discoid('3')).toBe('Criterion met (3 or more consecutive images)')
    expect(discoid('2')).toBe('Criterion not met (fewer than 3 consecutive images)')
    expect(report(study, { ...normal, 'lm-discoid': 'yes', 'lm-discoid-images': '2' }).warnings)
      .toContain('A discoid lateral meniscus is entered, but the bow-tie is seen on fewer than 3 consecutive 5-mm sagittal images.')
  })

  // K4-2: "Parameniscal cysts are usually associated with a meniscal tear."
  test('a parameniscal cyst beside an intact meniscus is flagged', () => {
    expect(report(study, { ...normal, parameniscal: 'lateral' }).warnings)
      .toEqual(['A lateral parameniscal cyst is entered, which is usually associated with a meniscal tear, but the lateral meniscus is entered as intact.'])
    expect(report(study, { ...normal, parameniscal: 'both' }).warnings).toHaveLength(2)
    expect(report(study, { ...normal, parameniscal: 'lateral', lm: 'tear', 'lm-images': '2' }).warnings).toEqual([])
  })

  // K9-2: "Below a threshold value fixed at 11 degrees, LTI appears to be an excellent
  // diagnostic test of PI" (Carrillon 2000, abstract; PI is patellar instability). The draft
  // called it trochlear dysplasia, which the paper did not test; the threshold is unchanged.
  test('lateral trochlear inclination at 11°', () => {
    const inclination = (degrees: string) => chips(study, 'extensor', { trochlea: degrees })['Lateral trochlear inclination']
    expect(inclination('10.9')).toBe('Below the 11° threshold for patellar instability')
    expect(inclination('11')).toBe('Not below the 11° threshold for patellar instability')
    expect(impressionOf({ ...normal, trochlea: '9' })).toBe('Lateral trochlear inclination 9°, below the 11° threshold for patellar instability.')
  })
})

describe('knee MRI report: contradictions', () => {
  test('findings against the pertinent negatives', () => {
    expect(report(study, { ...normal, acl: 'complete', 'impression-negatives': ['no-ligament'] }).warnings)
      .toContain('Impression says no ligament injury, but these are entered: ACL complete tear.')
    expect(report(study, { ...normal, lm: 'tear', 'lm-images': '2', 'impression-negatives': ['no-meniscal-tear'] }).warnings)
      .toContain('Impression says no meniscal tear, but these are entered: lateral meniscal tear.')
    expect(report(study, { ...normal, segond: 'present', acl: 'complete', 'impression-negatives': ['no-fracture'] }).warnings)
      .toContain('Impression says no fracture, but these are entered: Segond fracture.')
    expect(report(study, { ...normal, 'cartilage-pf': 'partial-high', 'impression-negatives': ['no-cartilage'] }).warnings)
      .toContain('Impression says no cartilage defect, but these are entered: patellofemoral cartilage partial thickness, half or more.')
  })

  test('negatives that match the findings raise nothing', () => {
    expect(report(study, { ...normal, 'impression-negatives': ['no-fracture', 'no-meniscal-tear', 'no-ligament', 'no-cartilage'] }).warnings).toEqual([])
  })
})

describe('knee MRI quiz', () => {
  test('has 8–12 questions, every answer index in range', () => {
    expect(study.quiz.length).toBeGreaterThanOrEqual(8)
    expect(study.quiz.length).toBeLessThanOrEqual(12)
    for (const question of study.quiz) {
      expect(question.answer, question.id).toBeGreaterThanOrEqual(0)
      expect(question.answer, question.id).toBeLessThan(question.options.length)
    }
  })
})
