import { describe, expect, test } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { NeonatalChestXrayStudyPage } from './NeonatalChestXrayStudy'

const study = studyOf(NeonatalChestXrayStudyPage)

/*
 * Every rule case below quotes a claim from
 * docs/superpowers/research/2026-11-01-neonatal-chest-xray-sources.md (N claims), each read in its
 * paper's abstract or its open full text before it went in. If a case has to change, say in that
 * commit why the old expectation was wrong.
 */

describe('neonatal chest X-ray lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    expect(study.learn.map((section) => section.id)).toEqual(['clinical', 'technique', 'lines', 'lungs', 'air-leak', 'heart', 'impression'])
  })

  // Every reference is matched (each has a DOI) and every claim read, so the note is not marked as a
  // draft.
  test('is not marked as a draft, with a DOI on every reference', () => {
    expect(study.sourceNote).toMatch(/^Every reference was matched/)
    expect(study.sourceNote).not.toMatch(/Unchecked draft/)
    expect(study.references).toHaveLength(24)
    for (const ref of study.references) expect(ref.doi, ref.citation).toMatch(/^10\./)
    expect(new Set(study.references.map((ref) => ref.doi?.toLowerCase())).size).toBe(study.references.length)
  })
})

/** A lines check on a ventilated 26-weeker, every tip in range. */
const lines: Values = {
  reason: 'lines', gestation: '26', age: '1', projection: 'ap-supine', coverage: 'chest-abdomen', rotation: 'none', pneumothorax: 'none',
  devices: ['ett', 'uvc', 'uac', 'ng'], 'ett-level': 'T1', 'uvc-level': 'T8', 'uvc-position': 'junction', 'uac-level': 'T8', 'ng-position': 'stomach',
}
/** A term baby with distress, no lines. */
const distress: Values = { reason: 'distress', gestation: '39', projection: 'ap-supine', rotation: 'none', devices: ['none'], pneumothorax: 'none', 'lung-volume': 'normal', 'lung-pattern': ['clear'] }

function impressionOf(values: Values) {
  return report(study, values).text.split('Impression: ')[1] ?? ''
}

describe('neonatal chest X-ray report: steps', () => {
  test('one report step per learn section, each opening its own section', () => {
    expect(study.report.steps.map((step) => step.id)).toEqual(study.learn.map((section) => section.id))
    for (const step of study.report.steps) expect(step.learn).toBe(step.id)
  })

  test('field ids are unique across the study', () => {
    const ids = study.report.steps.flatMap((step) => step.fields.map((field) => field.id))
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('the required items follow the reason and the lines present', () => {
    expect(report(study, lines).warnings).toEqual([])
    expect(report(study, distress).warnings).toEqual([])
    expect(report(study).warnings).toEqual(['Why the film not stated', 'Gestation at birth not stated', 'Projection not stated', 'Rotation not stated', 'Lines and tubes not stated', 'Pneumothorax not stated'])
    // Each line's tip must be stated once the line is ticked.
    expect(report(study, { ...lines, devices: ['ett', 'uvc', 'uac', 'ng', 'picc', 'drain'], 'ett-level': undefined, 'uvc-level': undefined, 'uvc-position': undefined, 'uac-level': undefined, 'ng-position': undefined }).warnings).toEqual([
      'ETT tip level not stated', 'UVC tip level not stated', 'UVC tip on the heart shadow not stated', 'UAC tip level not stated', 'Gastric tube tip not stated', 'PICC from not stated', 'PICC tip level not stated', 'Chest drain side not stated',
    ])
    // The lungs are required only when the film is for the lungs.
    expect(report(study, { ...lines, reason: 'both' }).warnings).toEqual(['Lung volumes not stated', 'Lungs not stated'])
  })
})

describe('neonatal chest X-ray report: whole cases', () => {
  test('a lines check with every tip in range', () => {
    const text = report(study, lines).text
    expect(text).toContain('Clinical: lines and tubes check; 26 weeks\' gestation; day 1')
    expect(text).toContain('Technique: AP supine chest and abdomen; not rotated')
    expect(text).toContain('Umbilical venous catheter: tip at T8, at the IVC–right atrium junction')
    expect(impressionOf(lines)).toBe([
      'Endotracheal tube tip at T1: within T1 to T2.',
      'Umbilical venous catheter tip at T8, at the IVC–right atrium junction: within T8 to T9.',
      'Umbilical arterial catheter tip at T8: high position, within T6 to T10.',
      'Gastric tube tip in the stomach.',
    ].join('\n'))
  })

  test('RDS with a low tube and a left pneumothorax: lines first, then the lungs, then the air leak', () => {
    const values = {
      ...lines, reason: 'both', 'ett-level': 'T4', 'lung-volume': 'low', 'lung-pattern': ['granular', 'bronchograms'], 'rds-grade': '2',
      pneumothorax: 'left', 'ptx-signs': ['sulcus'], devices: ['ett'],
    }
    expect(report(study, values).text).toContain('Lungs: low volumes; diffuse fine granular (ground-glass) opacities, air bronchograms; RDS grade 2')
    expect(impressionOf(values)).toBe([
      'Endotracheal tube tip at T4: low, below T2.',
      'Low lung volumes with diffuse fine granular (ground-glass) opacities and air bronchograms.',
      'Left pneumothorax.',
    ].join('\n'))
  })

  test('a normal term film says so', () => {
    expect(impressionOf(distress)).toBe('Lungs clear.')
    expect(impressionOf({ ...distress, 'lung-pattern': [] })).toBe('')
  })

  test('hidden answers write nothing', () => {
    // Line fields with no line ticked, and lung fields on a lines-only film.
    const text = report(study, { ...lines, devices: ['none'], 'lung-volume': 'low', 'lung-pattern': ['granular'] }).text
    expect(text).not.toMatch(/T8|T1|granular|Endotracheal/)
  })
})

describe('neonatal chest X-ray rules', () => {
  // N1-2, Lovrenski: RDS "is the leading cause of morbidity and mortality in preterm neonates born before
  // 36 weeks". N1-4, Lovrenski: TTN "is the commonest cause of respiratory distress in term infants";
  // Gallacher: "Delivery by caesarean section is the largest risk factor for developing TTN, particularly
  // elective caesarean sections when mechanisms of labour have not commenced". N1-5, Gallacher:
  // "Post-term neonates (>42 weeks) are more likely to have meconium aspiration syndrome."
  test('the baby: gestation and delivery', () => {
    expect(chips(study, 'clinical', { gestation: '35' }).Preterm).toBe('RDS is the leading cause of distress before 36 weeks')
    expect(chips(study, 'clinical', { gestation: '36' }).Preterm).toBeUndefined()
    expect(chips(study, 'clinical', { gestation: '37' }).Term).toBe('TTN is the commonest cause of distress at term')
    expect(chips(study, 'clinical', { gestation: '43' })['Post-term']).toBe('Meconium aspiration is more likely after 42 weeks')
    expect(chips(study, 'clinical', { gestation: '42' })['Post-term']).toBeUndefined()
    expect(chips(study, 'clinical', { delivery: 'cs-prelabour' }).Delivery).toBe('Caesarean before labour: the largest risk for TTN')
  })

  // N1-6, Gallacher: early-onset pneumonia "presents within 48 h of age". N1-7, Jeng: "The most common
  // cause of air leak syndrome in neonates is inadequate mechanical ventilation of the fragile and
  // immature lungs."
  test('the history and the support', () => {
    expect(chips(study, 'clinical', { history: ['infection'] })['Infection risk']).toBe('Points to pneumonia; early-onset pneumonia presents within 48 hours')
    expect(chips(study, 'clinical', { support: 'ventilated' }).Ventilated).toBe('Ventilation of immature lungs is the commonest cause of air leak: look for it')
  })

  // N2-2, Dahm: "Values of 7 to 9 posterior ribs to define optimal aeration, fewer than 7 ribs
  // hypoinflation, and more than 9 ribs hyperinflation are commonly quoted in guidelines"; "only a weak
  // association between diaphragm position and lung volume".
  test('inflation by the rib count, at 7 and 9', () => {
    expect(chips(study, 'technique', { ribs: '6' }).Inflation).toBe('6 ribs: fewer than 7, hypoinflation as commonly quoted')
    expect(chips(study, 'technique', { ribs: '7' }).Inflation).toBe('7 ribs: within the 7 to 9 commonly quoted')
    expect(chips(study, 'technique', { ribs: '9' }).Inflation).toBe('9 ribs: within the 7 to 9 commonly quoted')
    expect(chips(study, 'technique', { ribs: '10' }).Inflation).toBe('10 ribs: more than 9, hyperinflation as commonly quoted')
    expect(chips(study, 'technique', { ribs: '8' })['Rib count']).toBe('Only weakly related to aerated lung volume on CT')
  })

  // N2-3, Marais: "unilateral hyperlucency ... apparent cardiomegaly ... reversed position of the tips of
  // the umbilical artery and vein catheters with rotation to the left".
  test('rotation', () => {
    expect(chips(study, 'technique', { rotation: 'right' }).Rotation).toBe('One side lucent, the heart larger and shifted: can mimic or hide disease')
    expect(chips(study, 'lines', { ...lines, rotation: 'left' })['Rotated left']).toBe('The UAC and UVC tips can look reversed')
    expect(chips(study, 'lines', { ...lines, rotation: 'right' })['Rotated left']).toBeUndefined()
    expect(report(study, { ...lines, rotation: 'left' }).warnings).toContain('The film is rotated to the left, which can make the UAC and UVC tips look reversed: check which is which.')
  })

  // N3-2, Thayyil: "the ETT tip should be kept at the level of the first or second thoracic vertebrae".
  // N3-3, Cerone: "acceptable positions of the tube tip (requiring no adjustment) range between the top
  // of T1 and the bottom of T2". N3-1, Blayney: "the tip of the endotracheal tube should be placed at the
  // level of the body of the first thoracic vertebra"; "The carina was situated between T3 and T5".
  test('the endotracheal tube: T1 to T2', () => {
    const ett = (level: string) => chips(study, 'lines', { devices: ['ett'], 'ett-level': level }).ETT
    expect(ett('C7')).toBe('At C7: above T1, high')
    expect(ett('T1')).toBe('At T1: within T1 to T2, at Blayney\'s target')
    expect(ett('T2')).toBe('At T2: within T1 to T2 (Blayney\'s target is T1)')
    expect(ett('T3')).toBe('At T3: below T2, low; the carina lies at T3 to T5')
  })

  // N3-6, Rocha: "Excessively deep insertion could lead to selective right main bronchus intubation,
  // pneumothorax, and/or atelectasis." N3-5, Rost: "The ETT always moved caudad with neck flexion ... and
  // cephalad with neck extension".
  test('the endotracheal tube: bronchus and neck', () => {
    expect(chips(study, 'lines', { devices: ['ett'], 'ett-level': 'T3', 'ett-bronchus': 'right' })['ETT in a bronchus']).toBe('Too deep: risks pneumothorax and collapse')
    expect(chips(study, 'lines', { devices: ['ett'], 'ett-neck': 'flexed' })['Neck flexed']).toBe('The tip moves down with flexion: it will sit higher with the head neutral')
    expect(chips(study, 'lines', { devices: ['ett'], 'ett-neck': 'extended' })['Neck extended']).toBe('The tip moves up with extension: it will sit lower with the head neutral')
  })

  // N3-7, D'Andrea: "In the 'vertebral body' method, the tip is defined as 'well-positioned' when located
  // at the level of T8–T9, 'high' if above T8, and 'low' if below T9". N3-9, Verheij: "Ideal position of
  // the UVC was defined as the catheter-tip being visible between the 9th and 10th thoracic vertebrae".
  test('the UVC by level: T8 to T9, with Verheij\'s T9 to T10', () => {
    const uvc = (level: string) => chips(study, 'lines', { devices: ['uvc'], 'uvc-level': level })['UVC level']
    expect(uvc('T7')).toBe('At T7: above T8, high')
    expect(uvc('T8')).toBe('At T8: within T8 to T9 (Verheij\'s range is T9 to T10)')
    expect(uvc('T9')).toBe('At T9: within T8 to T9')
    expect(uvc('T10')).toBe('At T10: below T9, low (Verheij\'s range is T9 to T10)')
    expect(uvc('T11')).toBe('At T11: below T9, low')
  })

  // N3-7, D'Andrea: "UVCs with the tip in the hepatic vessels or the portal system are associated with
  // high risk of extravasation and consequent parenchymal injuries or portal thrombosis"; emergency, "2–4
  // cm". N3-13, Zubi: a UVC "within the heart induces cardiac arrythmia ... pericardial effusion, and
  // cardiac tamponade". N3-8, Hoellering: the cardiac silhouette method "with a sensitivity and
  // specificity of 86% and 94% compared with 61% and 74%".
  test('the UVC on the heart shadow, and when the two methods disagree', () => {
    const uvc = { devices: ['uvc'], 'uvc-level': 'T9' }
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'junction' })['UVC tip']).toBe('At the cavoatrial junction: the target')
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'heart' })['UVC tip']).toBe('In the heart: arrhythmia, effusion and tamponade are reported')
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'liver' })['UVC tip']).toBe('In the liver: risk of extravasation, liver injury and portal vein thrombosis')
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'umbilical' })['UVC tip']).toBe('In the umbilical vein: the short, emergency position (2 to 4 cm in)')
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'heart' })['Methods disagree']).toBe('The heart-shadow method was more accurate than the level (86% against 61% sensitive)')
    expect(chips(study, 'lines', { ...uvc, 'uvc-level': 'T6', 'uvc-position': 'junction' })['Methods disagree']).toBeDefined()
    expect(chips(study, 'lines', { ...uvc, 'uvc-position': 'junction' })['Methods disagree']).toBeUndefined()
    expect(report(study, { ...lines, 'uvc-position': 'heart' }).warnings).toContain('UVC: the vertebral level and the heart shadow disagree; the heart-shadow method was the more accurate (Hoellering).')
  })

  // N3-4, Narla: "an umbilical arterial catheter, between T-6 and T-10 (high position) or between L-3 and
  // L-5 (low position)". N3-11, Naseh: "a correct low position defined as the tip placed at L3–L4, and a
  // correct high position at T6–T9". N3-12, Barrington: "High placed umbilical artery catheters are
  // associated with a lower incidence of clinical vascular complications". N3-13, Zubi: the high position
  // is "avoiding the origins of the mesenteric, celiac, and renal arteries".
  test('the UAC: high T6 to T10, low L3 to L5, with Naseh\'s narrower ranges', () => {
    const uac = (level: string) => chips(study, 'lines', { devices: ['uac'], 'uac-level': level }).UAC
    expect(uac('T5')).toBe('At T5: above T6, too high')
    expect(uac('T6')).toBe('At T6: high position, within T6 to T10')
    expect(uac('T10')).toBe('At T10: high position, within T6 to T10 (Naseh\'s ends at T9)')
    expect(uac('T11')).toBe('At T11: between the high (T6 to T10) and low (L3 to L5) ranges, near the coeliac, mesenteric and renal arteries')
    expect(uac('L2')).toBe('At L2: between the high (T6 to T10) and low (L3 to L5) ranges, near the coeliac, mesenteric and renal arteries')
    expect(uac('L3')).toBe('At L3: low position, within L3 to L5')
    expect(uac('L5')).toBe('At L5: low position, within L3 to L5 (Naseh\'s ends at L4)')
    expect(uac('S1')).toBe('At S1: below L5, too low')
    expect(chips(study, 'lines', { devices: ['uac'], 'uac-level': 'L4' })['High or low']).toBe('High catheters had fewer vascular complications (Cochrane)')
    expect(impressionOf({ ...lines, 'uac-level': 'L1' })).toContain('Umbilical arterial catheter tip at L1: between the high and low ranges.')
  })

  // N3-14, Zubi: "The optimal tip position of a PICC inserted through the upper limb veins is in the
  // superior vena cava (SVC) at T3-T5 level ... For lower limb-inserted PICC ... at T8-T10 level"; the film
  // "includes the abdomen if the PICC is inserted through a lower extremity". N3-15, Nowlen: "The CVC tip
  // was last reported within the pericardial reflections on chest radiograph in 56 cases (92%)".
  test('the PICC: T3 to T5 from an arm, T8 to T10 from a leg', () => {
    const picc = (route: string, level: string) => chips(study, 'lines', { devices: ['picc'], 'picc-route': route, 'picc-level': level }).PICC
    expect(picc('upper', 'T2')).toBe('At T2: above T3 to T5')
    expect(picc('upper', 'T3')).toBe('At T3: within T3 to T5 (SVC)')
    expect(picc('upper', 'T5')).toBe('At T5: within T3 to T5 (SVC)')
    expect(picc('upper', 'T6')).toBe('At T6: below T3 to T5')
    expect(picc('lower', 'T7')).toBe('At T7: above T8 to T10')
    expect(picc('lower', 'T10')).toBe('At T10: within T8 to T10 (IVC)')
    expect(picc('lower', 'T11')).toBe('At T11: below T8 to T10')
    expect(chips(study, 'lines', { devices: ['picc'], 'picc-heart': 'inside' })['PICC in the heart']).toBe('Keep the tip outside the heart shadow: within the pericardial reflections in 92% of line effusions')
    expect(chips(study, 'lines', { devices: ['picc'], 'picc-route': 'lower', coverage: 'chest' })['Leg line']).toBe('Include the abdomen for a lower-limb PICC')
  })

  // N3-4, Narla: "a nasogastric tube, in the body of the stomach". N3-16, Zubi: "just passing the cardiac
  // sphincter or located at the lower oesophagus and associated with increasing apnoea, desaturation, and
  // bradycardia during feeding". N3-19, Gallacher: "coiled nasogastric tube in the upper oesophageal pouch
  // indicating oesophageal atresia. Note gas in stomach indicating presence of fistula". N3-20, Lovrenski:
  // "an abnormal feeding tube position when the stomach is herniated in the thorax".
  test('the gastric tube', () => {
    const ng = (position: string) => chips(study, 'lines', { devices: ['ng'], 'ng-position': position })['Gastric tube']
    expect(ng('stomach')).toBe('In the body of the stomach')
    expect(ng('oesophagus')).toBe('Short of the stomach: a tip at the cardia or lower oesophagus went with apnoea and bradycardia on feeds')
    expect(ng('coiled')).toBe('Coiled in the upper pouch: oesophageal atresia; gas in the stomach means a distal fistula')
    expect(ng('chest')).toBe('Stomach in the chest: a sign of a left diaphragmatic hernia')
  })

  // N3-17, Zubi: "pneumothorax will be effectively drained if the tip of the chest tube is placed anterior
  // to the lung"; "immediate anteroposterior and lateral chest radiography should be obtained". N3-18,
  // Odita: "the medial end of the chest tube should be no less than 1 cm from the spine".
  test('the chest drain', () => {
    const drain = { devices: ['drain'], 'drain-side': 'left' }
    expect(chips(study, 'lines', { ...drain, 'drain-for': 'air', 'drain-tip': 'posterior' }).Drain).toBe('For air, the tip drains best anterior to the lung')
    expect(chips(study, 'lines', { ...drain, 'drain-for': 'air', 'drain-tip': 'anterior' }).Drain).toBeUndefined()
    expect(chips(study, 'lines', { ...drain, 'drain-tip': 'unknown' }).Drain).toBe('An AP and a lateral are advised after insertion')
    expect(chips(study, 'lines', { ...drain, 'drain-spine': 'close' })['Drain near the spine']).toBe('Odita advises at least 1 cm, after phrenic nerve palsies')
  })

  // N4-1, Lovrenski: RDS, "Low lung volumes before mechanical ventilation ... Diffuse homogeneous granular
  // opacities ... Air-bronchograms". N1-3, Gallacher: "6.4% ... to 7.8% ... of cases with RDS are
  // diagnosed in infants born at ≥37 weeks' gestation". After surfactant, "hypoinflation and granular
  // opacities may persist".
  test('the lungs: RDS', () => {
    const rds = { reason: 'distress', gestation: '28', 'lung-volume': 'low', 'lung-pattern': ['granular', 'bronchograms'] }
    expect(chips(study, 'lungs', rds).RDS).toBe('Pattern of respiratory distress syndrome')
    expect(chips(study, 'lungs', { ...rds, gestation: '38' }).RDS).toBe('Pattern of RDS in a term baby: 6.4% to 7.8% of RDS is at 37 weeks or more; consider pneumonia')
    expect(chips(study, 'lungs', { ...rds, 'lung-volume': 'normal' }).RDS).toBeUndefined()
    expect(chips(study, 'lungs', { ...rds, surfactant: 'yes' })['After surfactant']).toBe('Aeration improves and opacity falls; low volumes and granularity may persist')
  })

  // N4-3, Lovrenski: TTN, "Normal or enlarged lung volumes ... Perihilar interstitial opacities ... Small
  // pleural effusions (e.g., in minor fissure) ... Resolution of findings and symptoms within 48–72 h";
  // "TTN typically shows normal or hyperinflated lungs, whereas RDS presents with hypoinflation".
  test('the lungs: TTN, and its time course', () => {
    const ttn = { reason: 'distress', gestation: '39', 'lung-volume': 'normal', 'lung-pattern': ['perihilar', 'fissure'] }
    expect(chips(study, 'lungs', ttn).TTN).toBe('Pattern of transient tachypnoea of the newborn')
    expect(chips(study, 'lungs', { ...ttn, age: '2' })['Day 3 or later']).toBeUndefined()
    expect(chips(study, 'lungs', { ...ttn, age: '3' })['Day 3 or later']).toBe('TTN clears in 48 to 72 hours: look for another cause')
    expect(chips(study, 'lungs', { ...ttn, 'lung-volume': 'low' })['Low volumes']).toBe('Favour RDS over TTN')
  })

  // N4-5, Lovrenski: MAS, "hyperinflated lungs, coarse irregular bilateral lung opacities"; "Pneumothorax
  // may occur in up to 10–20% of cases"; "in cases of bilateral, coarse interstitial opacities,
  // differentiation between MAS and neonatal pneumonia is impossible". N4-6: pneumonia, "lobar
  // consolidation ... ± Pleural effusion"; Gallacher, "may be initially normal". N4-7: BPD, "Later
  // findings: coarse reticular opacities ... cystic lucencies".
  test('the lungs: MAS, pneumonia and BPD', () => {
    const term = { reason: 'distress', gestation: '41', 'lung-volume': 'high', 'lung-pattern': ['coarse'] }
    expect(chips(study, 'lungs', { ...term, history: ['meconium'] }).MAS).toBe('Pattern of meconium aspiration; pneumothorax in up to 10% to 20%')
    expect(chips(study, 'lungs', term)['Coarse opacities']).toBe('With bilateral coarse opacities, MAS and pneumonia cannot be told apart')
    expect(chips(study, 'lungs', { ...term, 'lung-pattern': ['consolidation'] }).Pneumonia).toBe('Consolidation or effusion: consider pneumonia; the film may be normal at first')
    expect(chips(study, 'lungs', { ...term, gestation: '25', 'lung-pattern': ['reticular'] }).BPD).toBe('Pattern of later BPD; BPD itself is a clinical diagnosis (oxygen at 36 weeks\' postmenstrual age)')
  })

  // N5-1, Cizmeci: "46% of the neonates were found to have occult pneumothoraces before they were
  // clinically diagnosed ... between 0.5 and 27 h"; Rocha lists the signs. N5-2, Markowitz: the anterior
  // junction line "is not seen on chest radiographs of healthy infants. When this sign is identified on
  // the supine frontal view of a neonate, it signifies bilateral pneumothorax."
  test('air leak: pneumothorax on a supine film', () => {
    expect(chips(study, 'air-leak', { pneumothorax: 'none', 'ptx-signs': ['sulcus'] })['Occult pneumothorax?']).toBe('46% showed such signs 0.5 to 27 hours before the clinical diagnosis; a lateral decubitus film may show it')
    expect(chips(study, 'air-leak', { pneumothorax: 'left', 'ptx-signs': ['sulcus'] })['Occult pneumothorax?']).toBeUndefined()
    expect(chips(study, 'air-leak', { pneumothorax: 'left' }).Pneumothorax).toBe('The commonest air leak; a tension pneumothorax needs urgent decompression')
    expect(chips(study, 'air-leak', { pneumothorax: 'both', 'ptx-signs': ['junction'] })['Anterior junction line']).toBe('Not seen in healthy infants: means bilateral pneumothorax')
    expect(report(study, { ...distress, pneumothorax: 'left', 'ptx-signs': ['junction'] }).warnings).toContain('An anterior junction line means bilateral pneumothorax, but a one-sided pneumothorax is entered.')
  })

  // N5-4, Lovrenski: PIE "is caused by interstitial air leakage related to barotrauma from mechanical
  // ventilation and presents on CR as rounded or tubular perihilar lucencies". N5-5, Hauri-Hohl: the
  // "spinnaker sign"; "Mostly, it is associated with extrapulmonary air at other sites." N5-6, Burt: the
  // "halo" sign "was apparent in 96% of these cases ... The overall mortality was 72%."
  test('air leak: PIE, pneumomediastinum and pneumopericardium', () => {
    expect(chips(study, 'air-leak', { pie: 'right' }).PIE).toBe('Interstitial air from ventilator barotrauma; a complication of RDS')
    expect(chips(study, 'air-leak', { pneumomediastinum: 'yes' }).Pneumomediastinum).toBe('Spinnaker sign: thymus lifted off the heart; mostly with air elsewhere')
    expect(chips(study, 'air-leak', { pneumopericardium: 'yes' }).Pneumopericardium).toBe('Halo of air round the heart (96%); 72% died in Burt\'s series')
    expect(impressionOf({ ...distress, pie: 'both', pneumomediastinum: 'yes' })).toBe('Lungs clear.\nBilateral pulmonary interstitial emphysema.\nPneumomediastinum.')
  })

  // N2-3, Marais: rotation gives "apparent cardiomegaly". N3-15, Nowlen: "A change in cardiothoracic ratio
  // may be diagnostic of a PCE". N6-2, Lovrenski: CDH, "located predominantly on the left side (95%
  // cases)"; "intrathoracic air-filled bowel loops, mediastinal shift".
  test('heart, mediastinum and upper abdomen', () => {
    expect(chips(study, 'heart', { rotation: 'left', 'heart-size': 'large' })['Heart size']).toBe('Rotation makes the heart look larger')
    expect(chips(study, 'heart', { rotation: 'none', 'heart-size': 'large' })['Heart size']).toBeUndefined()
    expect(chips(study, 'heart', { devices: ['picc'], 'picc-heart': 'inside', 'heart-size': 'large' })['Line in the heart']).toBe('A rising cardiothoracic ratio can mark a pericardial effusion')
    expect(chips(study, 'heart', { abdomen: ['bowel-chest'] })['Bowel in the chest']).toBe('Pattern of diaphragmatic hernia, with mediastinal shift; 95% on the left')
  })

  test('contradictions are flagged', () => {
    expect(report(study, { ...distress, pneumothorax: 'right', 'impression-negatives': ['no-pneumothorax'] }).warnings).toContain('Impression says no pneumothorax, but a pneumothorax is entered.')
    expect(report(study, { ...distress, pie: 'left', 'impression-negatives': ['no-air-leak'] }).warnings).toContain('Impression says no air leak, but an air leak is entered.')
    expect(report(study, { ...distress, devices: ['none', 'ett'], 'ett-level': 'T1' }).warnings).toContain('Lines and tubes: "None" is ticked with a line or tube.')
    expect(report(study, { ...distress, 'lung-pattern': ['clear', 'granular'] }).warnings).toContain('Lungs: "Clear" is ticked with an abnormal finding.')
  })
})
