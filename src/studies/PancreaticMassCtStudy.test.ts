import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { PancreaticMassCtStudyPage } from './PancreaticMassCtStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. The lesson sentence each case comes from is quoted.
 */
const study = studyOf(PancreaticMassCtStudyPage)

/** Every vessel stated as clear, so the NCCN chip is computed. */
const allClear: Values = {
  'ca-contact': 'none',
  'sma-contact': 'none',
  'cha-contact': 'none',
  'pv-contact': 'none',
  'smv-contact': 'none',
}

const nccn = (values: Values) => chips(study, 'vessels', { ...allClear, ...values })['NCCN (simplified)']

/** A complete, resectable head PDAC. */
const resectable: Values = {
  phases: 'protocol',
  setting: 'initial',
  location: 'pancreatic head',
  size: '28',
  density: 'hypo',
  duct: 'cutoff',
  secondary: ['doubleduct', 'atrophy'],
  stent: 'no',
  lesion: 'pdac',
  ...allClear,
  'variant-none': 'yes',
  collaterals: 'no',
  liver: 'none',
  peritoneum: 'none',
  nodes: 'none',
  organs: 'none',
}

describe('pancreatic mass CT: NCCN category (simplified)', () => {
  // "Resectable. No arterial contact. Vein contact of 180° or less with a normal contour."
  it('no contact anywhere is resectable', () => {
    expect(nccn({})).toMatch(/^Resectable/)
  })
  it('SMV contact of 180° or less with a normal contour is resectable', () => {
    expect(nccn({ 'smv-contact': 'solid', 'smv-degrees': 'le180' })).toMatch(/^Resectable/)
  })

  // "Borderline. SMA or celiac contact of 180° or less."
  // "Locally advanced. SMA or celiac contact over 180°"
  it.each([
    ['sma', 'le180', /^Borderline: SMA contact of 180° or less/],
    ['sma', 'gt180', /^Locally advanced: SMA contact over 180°/],
    ['ca', 'le180', /^Borderline: celiac contact of 180° or less/],
    ['ca', 'gt180', /^Locally advanced: celiac contact over 180°/],
  ])('%s %s', (id, degrees, expected) => {
    expect(nccn({ [`${id}-contact`]: 'solid', [`${id}-degrees`]: degrees })).toMatch(expected)
  })

  // "Hepatic artery contact that spares the celiac axis and the bifurcation." (borderline)
  it('hepatic artery contact sparing the celiac axis and bifurcation is borderline', () => {
    expect(nccn({ 'cha-contact': 'solid', 'cha-degrees': 'le180', 'cha-extends': 'no' })).toMatch(/^Borderline: hepatic artery contact sparing/)
  })
  it('hepatic artery contact reaching the celiac axis is not classified by the simplified categories', () => {
    expect(nccn({ 'cha-contact': 'solid', 'cha-degrees': 'le180', 'cha-extends': 'yes' })).toMatch(/^Not classified/)
  })
  it('hepatic artery contact with its extent unstated is not classified', () => {
    expect(nccn({ 'cha-contact': 'solid', 'cha-degrees': 'le180' })).toMatch(/^Not classified: state whether the hepatic artery contact spares/)
  })

  // "Vein contact over 180°, or a deformed vein that can still be reconstructed." (borderline)
  it('portal vein contact over 180° is borderline', () => {
    expect(nccn({ 'pv-contact': 'solid', 'pv-degrees': 'gt180' })).toMatch(/^Borderline: Portal vein contact over 180°/)
  })
  it('a deformed SMV of 180° or less that can be reconstructed is borderline', () => {
    expect(nccn({ 'smv-contact': 'solid', 'smv-degrees': 'le180', 'smv-deform': ['teardrop'], 'smv-recon': 'yes' })).toMatch(/^Borderline: deformed SMV that can still be reconstructed/)
  })
  it('a deformed SMV with reconstruction unstated is not classified', () => {
    expect(nccn({ 'smv-contact': 'solid', 'smv-degrees': 'le180', 'smv-deform': ['narrowing'] })).toMatch(/^Not classified: state whether the deformed SMV can be reconstructed/)
  })

  // "Locally advanced. ... or a vein that cannot be reconstructed."
  it.each([
    [{ 'smv-contact': 'solid', 'smv-degrees': 'gt180', 'smv-recon': 'no' }],
    [{ 'pv-contact': 'solid', 'pv-degrees': 'le180', 'pv-deform': ['thrombus'], 'pv-recon': 'no' }],
  ])('a vein that cannot be reconstructed is locally advanced (%o)', (values) => {
    expect(nccn(values)).toMatch(/^Locally advanced: (SMV|Portal vein) cannot be reconstructed/)
  })

  it('locally advanced wins over borderline findings', () => {
    expect(nccn({ 'sma-contact': 'solid', 'sma-degrees': 'gt180', 'pv-contact': 'solid', 'pv-degrees': 'gt180' })).toMatch(/^Locally advanced/)
  })

  // "Solid tissue and hazy stranding are different things, so say which one you see."
  it('hazy stranding is not classified', () => {
    expect(nccn({ 'sma-contact': 'hazy', 'sma-degrees': 'le180' })).toMatch(/^Not classified: hazy stranding at the SMA/)
  })

  it('shows no category until all five vessels are stated', () => {
    expect(chips(study, 'vessels', { 'sma-contact': 'none' })['NCCN (simplified)']).toBeUndefined()
  })

  // "The authors advise against writing "unresectable", because that decision belongs to the tumor board."
  it('reminds not to write unresectable', () => {
    expect(chips(study, 'vessels', allClear)['In the report']).toMatch(/do not write "unresectable"/)
  })
})

describe('pancreatic mass CT: step chips', () => {
  // "If the scan is a routine single-phase study, say in the report that it limits staging."
  it('single-phase scan warns that it limits staging', () => {
    expect(chips(study, 'scan', { phases: 'single' }).Technique).toMatch(/limits staging/)
    expect(chips(study, 'scan', { phases: 'protocol' }).Technique).toBeUndefined()
  })
  // "CT tends to understage the response to chemotherapy."
  it('restaging notes CT understaging', () => {
    expect(chips(study, 'scan', { setting: 'restage' }).Restaging).toMatch(/understage/)
  })
  // "A dilated duct that stops abruptly should be treated as cancer until proven otherwise."
  it('duct cutoff is cancer until proven otherwise', () => {
    expect(chips(study, 'find', { duct: 'cutoff' })['Duct cutoff']).toBe('Cancer until proven otherwise')
    expect(chips(study, 'find', { duct: 'dilated' })['Duct cutoff']).toBeUndefined()
  })
  // "In those cases you rely on secondary signs"
  it('isoattenuating mass relies on secondary signs', () => {
    expect(chips(study, 'find', { density: 'iso' }).Isoattenuating).toBe('Rely on secondary signs')
  })
  // "if the soft tissue around a vessel persists but has not grown, call it stable and do not call it unresectable"
  it('persistent non-growing tissue after chemotherapy is stable', () => {
    expect(chips(study, 'vessels', { setting: 'restage', response: 'stable' })['After chemotherapy']).toBe('Call it stable, not unresectable')
    expect(chips(study, 'vessels', { setting: 'initial', response: 'stable' })['After chemotherapy']).toBeUndefined()
  })
  // "especially a replaced right hepatic artery arising from the SMA, because it runs right behind the pancreatic head"
  it('flags a replaced right hepatic artery', () => {
    expect(chips(study, 'vessels', { variants: ['rrha'] })['Replaced RHA']).toMatch(/behind the pancreatic head/)
  })
  // "Anything too small to characterize should be called "indeterminate" so it triggers an MRI."
  it('indeterminate liver lesion triggers an MRI', () => {
    expect(chips(study, 'outside', { liver: 'indet' }).Liver).toMatch(/triggers an MRI/)
  })
  // "Regional nodes do not change resectability. Distant nodes (para-aortic, for example) do"
  it('regional nodes do not change resectability; distant nodes do', () => {
    expect(chips(study, 'outside', { nodes: 'regional' })['Regional nodes']).toBe('Do not change resectability')
    expect(chips(study, 'outside', { nodes: 'distant' })['Distant nodes']).toMatch(/^Change resectability/)
  })
  // "Cystic lesions: follow Kyoto 2024 and the ACR white paper"
  it('cystic lesion points to the cyst guidelines', () => {
    expect(chips(study, 'what', { lesion: 'cystic' })['Cystic lesion']).toMatch(/Kyoto 2024/)
  })
})

describe('pancreatic mass CT: whole cases', () => {
  it('resectable head PDAC', () => {
    const { text, warnings } = report(study, resectable)
    expect(warnings).toEqual([])
    expect(text).toContain('Hypoattenuating pancreatic mass in the pancreatic head measuring 28 mm, appearance favoring pancreatic ductal adenocarcinoma.')
    expect(text).toContain('Pancreatic duct cutoff.')
    expect(text).toContain('No contact with the celiac axis, SMA, common hepatic artery, portal vein, SMV.')
    expect(text).toContain('Variants: none.')
    expect(text).not.toMatch(/unresectable/i)
  })

  it('borderline: SMA contact of 180° or less and teardrop SMV', () => {
    const values = {
      ...resectable,
      'sma-contact': 'solid',
      'sma-degrees': 'le180',
      'smv-contact': 'solid',
      'smv-degrees': 'le180',
      'smv-deform': ['teardrop'],
      'smv-recon': 'yes',
    }
    const { text, warnings } = report(study, values)
    expect(warnings).toEqual([])
    // "In the impression, describe the anatomy, e.g. "tumor contacts SMA ≤180°"."
    expect(text).toContain('Tumor contacts the SMA ≤180°.')
    expect(text).toContain('Tumor contacts the SMV ≤180° with "teardrop" shape.')
    expect(text).toContain('SMV: solid tumor contact, 180° or less, "teardrop" shape, reconstructable.')
    expect(nccn(values)).toMatch(/^Borderline/)
  })

  it('locally advanced with metastatic disease on a single-phase scan', () => {
    const values = {
      ...resectable,
      phases: 'single',
      'sma-contact': 'solid',
      'sma-degrees': 'gt180',
      'sma-deform': ['narrowing'],
      liver: 'suspicious',
      'liver-detail': 'two, segment 6',
      peritoneum: 'present',
      'peritoneal-findings': ['nodules', 'ascites'],
      nodes: 'distant',
      'node-group': 'para-aortic',
      organs: 'present',
      'organ-list': ['duodenum'],
    }
    const { text } = report(study, values)
    expect(text).toMatch(/^Technique: routine single-phase study, which limits staging\./)
    expect(text).toContain('Tumor contacts the SMA >180° with narrowing.')
    expect(text).toContain('Liver lesion(s) suspicious for metastasis.')
    expect(text).toContain('Peritoneal disease.')
    expect(text).toContain('Distant nodes (para-aortic).')
    expect(text).toContain('Invasion of duodenum.')
    expect(text).toContain('Routine single-phase study limits staging.')
    expect(text).not.toMatch(/unresectable/i)
  })

  it('restaging after chemotherapy with stable perivascular tissue', () => {
    const values = { ...resectable, setting: 'restage', 'sma-contact': 'solid', 'sma-degrees': 'le180', response: 'stable' }
    expect(report(study, values).text).toContain('Perivascular soft tissue persists but has not grown: stable.')
  })

  it('drops a hidden answer: degrees on a vessel with no contact', () => {
    const { text } = report(study, { ...resectable, 'sma-degrees': 'gt180' })
    expect(text).toContain('SMA: no contact.')
    expect(text).not.toContain('>180°')
  })
})

describe('pancreatic mass CT: check before signing', () => {
  it('lists what the report must contain while the form is empty', () => {
    const { warnings } = report(study)
    for (const label of [
      'Location',
      'Size',
      'Density on the pancreatic phase',
      'Pancreatic duct',
      'Biliary stent',
      'Celiac axis: contact',
      'SMA: contact',
      'Common hepatic artery: contact',
      'Portal vein: contact',
      'SMV: contact',
      'Liver',
      'Peritoneum and omentum',
      'Nodes',
      'Invasion of nearby organs',
    ]) expect(warnings).toContain(`${label} not stated`)
  })
  it('asks for the circumference once a vessel is touched, and the node group once nodes are present', () => {
    const { warnings } = report(study, { ...resectable, 'sma-contact': 'solid', nodes: 'regional' })
    expect(warnings).toContain('SMA: circumference not stated')
    expect(warnings).toContain('Node group not stated')
  })

  // "duct passes through the mass without blocking"
  it('autoimmune pancreatitis with a duct cutoff', () => {
    expect(report(study, { ...resectable, lesion: 'aip' }).warnings.join(' ')).toMatch(/Autoimmune pancreatitis is marked, but the duct is cut off/)
  })
  // "Double duct sign. Both the bile duct and the pancreatic duct are dilated."
  it('double duct sign with a non-dilated duct', () => {
    expect(report(study, { ...resectable, duct: 'normal', secondary: ['doubleduct'] }).warnings.join(' ')).toMatch(/Double duct sign is marked/)
  })
  // "Lymphoma: large mass that wraps around vessels without narrowing them, with no duct dilatation"
  it('lymphoma with duct dilatation', () => {
    expect(report(study, { ...resectable, lesion: 'lymphoma', duct: 'dilated', secondary: [] }).warnings.join(' ')).toMatch(/Lymphoma is marked, but duct dilatation/)
  })
  it('lymphoma with a narrowed vessel', () => {
    const values = { ...resectable, lesion: 'lymphoma', duct: 'normal', secondary: [], 'sma-contact': 'solid', 'sma-degrees': 'gt180', 'sma-deform': ['narrowing'] }
    const { warnings } = report(study, values)
    expect(warnings.join(' ')).toMatch(/Lymphoma is marked, but a vessel is narrowed/)
    expect(warnings.join(' ')).not.toMatch(/duct dilatation/)
  })
  it('cystic lesion points to the cyst guidelines', () => {
    expect(report(study, { ...resectable, lesion: 'cystic' }).warnings).toContain('Cystic lesion: follow Kyoto 2024 and the ACR white paper.')
  })
})

describe('pancreatic mass CT: no placeholder text', () => {
  const cases: Values[] = [
    {},
    resectable,
    { ...resectable, 'sma-contact': 'hazy', 'cha-contact': 'solid', 'cha-extends': 'yes', 'variant-other': 'replaced CHA', variants: ['rrha', 'mal'] },
    { ...resectable, liver: 'indet', peritoneum: 'present', nodes: 'regional', organs: 'present', other: 'Gallstones.' },
    { location: 'tail' },
  ]
  it.each(cases.map((c, i) => [i, c]))('case %i', (_i, values) => {
    const { text, warnings } = report(study, values as Values)
    for (const out of [text, ...warnings]) {
      expect(out).not.toMatch(/undefined|NaN|\[object/)
      // The vessel lines are indented with three spaces; nothing else has double spaces.
      expect(out).not.toMatch(/\S {2,}/)
    }
  })
})
