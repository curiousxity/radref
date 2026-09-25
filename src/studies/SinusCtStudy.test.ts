import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { SinusCtStudyPage } from './SinusCtStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. Quote the lesson sentence the case comes from.
 */
const study = studyOf(SinusCtStudyPage)

const AREAS = ['front', 'aeth', 'peth', 'max', 'sph', 'omc']

/** Every Lund-Mackay area on both sides at one score (OMC capped to its 0/2 scale). */
function allScored(right: string, left: string): Values {
  const out: Values = {}
  for (const area of AREAS) {
    out[`lm_${area}_r`] = area === 'omc' && right === '1' ? '2' : right
    out[`lm_${area}_l`] = area === 'omc' && left === '1' ? '2' : left
  }
  return out
}

/** A CLOSE checklist with every item answered "none". */
const closeClear: Values = {
  olf_r: '2',
  olf_l: '2',
  olf_asym: 'no',
  fovea_low: 'none',
  sb_dehisc: 'no',
  lamina: 'intact',
  onodi: 'absent',
  sph_pneum: 'sellar',
  sph_ica: 'none',
  sph_optic: 'none',
  sph_septum: 'none',
  aea_r: 'in',
  aea_l: 'in',
}

const patent: Values = {
  omc_r: 'patent', omc_l: 'patent', fr_r: 'patent', fr_l: 'patent', ser_r: 'patent', ser_l: 'patent',
}

function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  for (const line of text.split('\n')) expect(line.trimStart()).not.toMatch(/ {2}/)
}

describe('sinus CT: Keros type from olfactory fossa depth', () => {
  // "Keros type I is ≤3 mm, type II is 4–7 mm, and type III is >7 mm."
  it.each([
    ['0', 'Type I'],
    ['3', 'Type I'],
    ['4', 'Type II'],
    ['7', 'Type II'],
    ['7.5', 'Type III'],
    ['8', 'Type III'],
  ])('%s mm is %s', (depth, type) => {
    expect(chips(study, 'close', { olf_r: depth })['Right Keros']).toBe(type)
    expect(chips(study, 'close', { olf_l: depth })['Left Keros']).toBe(type)
  })

  // The lesson's bands leave a gap between 3 and 4 mm; the study says so rather than guessing.
  it('3.5 mm falls between type I and II, with a warning', () => {
    expect(chips(study, 'close', { olf_r: '3.5' })['Right Keros']).toBe('Between I (≤3 mm) and II (4–7 mm)')
    expect(report(study, { olf_r: '3.5' }).warnings.join(' ')).toMatch(/Right olfactory fossa depth 3.5 mm falls between/)
  })

  // "Deeper fossa = higher CSF-leak risk": type III is surgical-risk anatomy in the impression.
  it('type III goes into the surgical-risk line; types I and II do not', () => {
    expect(report(study, { olf_r: '8', olf_l: '8' }).text).toContain('Surgical-risk anatomy: Keros type III bilaterally')
    const typeII = report(study, { olf_r: '7', olf_l: '7' }).text
    expect(typeII).toContain('Keros type II bilaterally.')
    expect(typeII).not.toContain('Surgical-risk anatomy')
  })

  it('a Keros type differing between sides with asymmetry marked none is a contradiction', () => {
    const warn = report(study, { olf_r: '3', olf_l: '8', olf_asym: 'no' }).warnings
    expect(warn).toContain('Keros type differs between sides (R I, L III) but olfactory fossa asymmetry is marked none.')
    expect(report(study, { olf_r: '3', olf_l: '8', olf_asym: 'yes' }).warnings.join(' ')).not.toMatch(/Keros type differs/)
  })
})

describe('sinus CT: Lund-Mackay', () => {
  // "Sinuses: 0 = clear, 1 = partial opacification, 2 = complete. OMC: 0 = open, 2 = blocked. Maximum 24."
  it('totals all twelve areas out of 24', () => {
    expect(chips(study, 'burden', allScored('2', '2'))['Lund-Mackay']).toBe('24/24')
    expect(chips(study, 'burden', allScored('0', '0'))['Lund-Mackay']).toBe('0/24')
    expect(chips(study, 'burden', allScored('1', '1'))['Lund-Mackay']).toBe('14/24')
  })
  it('writes a running total, not a score, until every area is scored', () => {
    const partial = { lm_max_r: '1', lm_max_l: '2' }
    expect(chips(study, 'burden', partial)['Lund-Mackay']).toBe('3 so far (2 of 12 areas)')
    const out = report(study, partial)
    expect(out.text).not.toMatch(/Lund-Mackay/)
    expect(out.warnings).toContain('Lund-Mackay: 2 of 12 areas scored; the total is written only when all are scored.')
  })
  it('a clear scan reads as clear in the impression', () => {
    expect(report(study, allScored('0', '0')).text).toContain('Paranasal sinuses clear (Lund-Mackay 0/24).')
  })
})

describe('sinus CT: unilateral disease is a red flag', () => {
  // "Red flags for tumor: unilateral disease, bone destruction (not remodeling), ... Recommend MRI."
  const rightOnly: Values = { ...allScored('0', '0'), lm_max_r: '2' }

  it('disease on one side with the other fully clear is flagged', () => {
    expect(chips(study, 'burden', rightOnly)['Distribution']).toBe('Unilateral (right): red flag')
  })
  it('is not flagged while the other side is not fully scored', () => {
    const partial: Values = { ...rightOnly }
    delete partial.lm_front_l
    expect(chips(study, 'burden', partial)['Distribution']).toBeUndefined()
  })
  it('bilateral disease is not flagged', () => {
    expect(chips(study, 'burden', { ...rightOnly, lm_max_l: '1' })['Distribution']).toBeUndefined()
  })
  it('warns when red flags are none, not stated, or unilateral is not ticked', () => {
    expect(report(study, { ...rightOnly, rf: 'none' }).warnings.join(' ')).toMatch(/red flags are marked none/)
    expect(report(study, rightOnly).warnings.join(' ')).toMatch(/red flags are not stated/)
    expect(report(study, { ...rightOnly, rf: 'yes', rf_list: ['destruction'] }).warnings.join(' ')).toMatch(/unilateral disease is not ticked/)
    expect(report(study, { ...rightOnly, rf: 'yes', rf_list: ['unilateral'] }).warnings.join(' ')).not.toMatch(/unilateral/i)
  })
  it('a red flag recommends MRI', () => {
    expect(chips(study, 'pathology', { rf: 'yes' })['Red flag']).toBe('Recommend MRI')
    expect(report(study, { rf: 'yes', rf_list: ['unilateral', 'destruction'] }).text).toContain(
      'Red flags for tumor: unilateral disease and bone destruction (not remodeling). MRI recommended.',
    )
    expect(report(study, { rf: 'none' }).text).toContain('No red flag features for tumor.')
  })
})

describe('sinus CT: pathology chips', () => {
  // "Allergic fungal sinusitis ... Flag it"; "Odontogenic sinusitis ... Say so; the treatment is different."
  it('flags allergic fungal, odontogenic and acute patterns', () => {
    const c = chips(study, 'pathology', { pattern: ['afs', 'odont', 'acute'] })
    expect(c['Allergic fungal']).toBe('Flag it for the surgeon')
    expect(c['Odontogenic']).toBe('Say so: treatment differs')
    expect(c['Acute']).toBe('Different report')
    expect(report(study, { pattern: ['acute'] }).warnings.join(' ')).toMatch(/orbital cellulitis/)
  })
})

describe('sinus CT: pathways and CLOSE items', () => {
  // "Uncinate ... to the lamina papyracea (most common; the frontal sinus then drains medial to it)"
  it('an uncinate attached to the lamina drains the frontal sinus medially', () => {
    expect(chips(study, 'pathways', { unc_att_r: 'lamina' })['Right frontal sinus']).toBe('Drains medial to the uncinate')
    expect(chips(study, 'pathways', { unc_att_r: 'base' })['Right frontal sinus']).toBeUndefined()
  })
  it('lists blocked pathways', () => {
    expect(chips(study, 'pathways', { omc_r: 'obstructed', fr_l: 'narrowed', ser_l: 'obstructed' })['Blocked']).toBe(
      'R OMC, L frontal recess, L SER',
    )
    expect(chips(study, 'pathways', patent)['Blocked']).toBeUndefined()
  })
  // "E. Is the anterior ethmoidal artery in the skull base (safe) or hanging free in a mesentery below the roof (at risk ...)?"
  it('an anterior ethmoidal artery below the skull base is at risk', () => {
    expect(chips(study, 'close', { aea_r: 'below', aea_l: 'in' })['Anterior ethmoidal artery']).toBe('At risk on the right')
    expect(chips(study, 'close', { aea_r: 'below', aea_l: 'below' })['Anterior ethmoidal artery']).toBe('At risk bilaterally')
    expect(chips(study, 'close', { aea_r: 'in', aea_l: 'in' })['Anterior ethmoidal artery']).toBeUndefined()
  })
  // "O. ... Say whether the optic nerve is dehiscent into it."
  it('an Onodi cell with a dehiscent optic nerve is flagged', () => {
    expect(chips(study, 'close', { onodi: 'present', onodi_optic: 'yes' })['Onodi cell']).toBe('Dehiscent optic nerve')
    expect(chips(study, 'close', { onodi: 'present', onodi_optic: 'no' })['Onodi cell']).toBeUndefined()
  })
})

describe('sinus CT: contradictions', () => {
  it('OMC Lund-Mackay score against OMC patency', () => {
    expect(report(study, { lm_omc_r: '2', omc_r: 'patent' }).warnings).toContain('Right OMC scored 2 (blocked) in Lund-Mackay but marked patent.')
    expect(report(study, { lm_omc_l: '0', omc_l: 'obstructed' }).warnings).toContain('Left OMC scored 0 (open) in Lund-Mackay but marked obstructed.')
  })
  it('an OMC cause with no matching variant recorded', () => {
    const w = report(study, { omc_r: 'obstructed', omc_r_by: ['cb', 'haller', 'uncinate', 'septum'], mt_cb: 'l', haller: 'none', unc_pneum: 'none', sept_dev: 'none', sept_spur: 'no' }).warnings
    expect(w).toContain('Right OMC blocked by concha bullosa, but no right concha bullosa is recorded.')
    expect(w).toContain('Right OMC blocked by Haller cell, but no right Haller cell is recorded.')
    expect(w.join(' ')).toMatch(/uncinate pneumatization is marked none/)
    expect(w).toContain('Right OMC blocked by the septum, but no septal deviation or spur is recorded.')
    const ok = report(study, { omc_r: 'obstructed', omc_r_by: ['cb'], mt_cb: 'b' }).warnings
    expect(ok.join(' ')).not.toMatch(/concha bullosa/)
  })
})

describe('sinus CT: required items', () => {
  // "State "none" explicitly for each CLOSE item rather than staying silent."
  it('lists every CLOSE item while the form is empty', () => {
    const { warnings } = report(study)
    for (const label of [
      'Olfactory fossa depth, right',
      'Olfactory fossa depth, left',
      'Asymmetry between sides',
      'Low-lying or medially sloping fovea',
      'Skull-base dehiscence',
      'Lamina papyracea',
      'Onodi cell',
      'Sphenoid pneumatization',
      'ICA dehiscence',
      'Optic nerve dehiscence (sphenoid)',
      'Septum attaching to carotid canal',
      'Anterior ethmoidal artery, right',
      'Anterior ethmoidal artery, left',
    ]) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })
  it('asks for the side of a dehiscent lamina and an Onodi cell once they are present', () => {
    const { warnings } = report(study, { lamina: 'dehiscent', onodi: 'present' })
    expect(warnings).toContain('Dehiscent lamina, side not stated')
    expect(warnings).toContain('Onodi cell, side not stated')
    expect(warnings).toContain('Optic nerve dehiscent into the Onodi cell not stated')
  })
  it('no required item is listed once CLOSE is fully answered', () => {
    expect(report(study, closeClear).warnings.filter((w) => w.endsWith('not stated'))).toEqual([])
  })
  it('the empty form prints no CLOSE negatives nobody checked', () => {
    const { text } = report(study)
    expect(text).not.toMatch(/CRITICAL ANATOMY|IMPRESSION/)
    expectClean(text)
  })
})

describe('sinus CT: whole cases', () => {
  it('normal pre-FESS scan', () => {
    const { text, warnings } = report(study, { ...allScored('0', '0'), ...patent, ...closeClear, rf: 'none', prior: 'none' })
    expect(text).toContain('Paranasal sinuses clear (Lund-Mackay 0/24).')
    expect(text).toContain('Ostiomeatal complexes, frontal recesses and sphenoethmoidal recesses patent bilaterally.')
    expect(text).toContain('Keros type I bilaterally.')
    expect(text).not.toContain('Surgical-risk anatomy')
    expect(text).toContain('No skull-base dehiscence; lamina papyracea intact; no Onodi cell; no ICA or optic nerve dehiscence')
    expect(text).toContain('No red flag features for tumor.')
    expect(text).toContain('PRIOR SURGERY: none')
    expect(warnings).toEqual([])
    expectClean(text)
  })

  it('chronic rhinosinusitis with a blocked OMC and risky anatomy', () => {
    const { text } = report(study, {
      ...allScored('1', '1'),
      lm_omc_l: '0',
      ...patent,
      omc_l: 'patent',
      omc_r: 'obstructed',
      omc_r_by: ['cb'],
      mt_cb: 'r',
      ...closeClear,
      olf_r: '8',
      olf_l: '5',
      olf_asym: 'yes',
      aea_r: 'below',
      onodi: 'present',
      onodi_side: 'l',
      onodi_optic: 'yes',
      pattern: ['crs'],
      rf: 'none',
    })
    expect(text).toContain('Chronic rhinosinusitis. Lund-Mackay 12/24.')
    expect(text).toContain('Right OMC obstructed by concha bullosa.')
    expect(text).toContain('Surgical-risk anatomy: Keros type III on the right, type II on the left; asymmetric olfactory fossa depth')
    expect(text).toContain('Onodi cell on the left with dehiscent optic nerve')
    expect(text).toContain('anterior ethmoidal artery below the skull base on the right')
    expect(text).toContain('; left anterior ethmoidal artery within the skull base.')
    expectClean(text)
  })

  it('unilateral destructive disease recommends MRI', () => {
    const { text } = report(study, {
      ...allScored('0', '0'),
      lm_max_l: '2',
      lm_aeth_l: '2',
      lm_omc_l: '2',
      omc_l: 'obstructed',
      ...closeClear,
      lamina: 'dehiscent',
      lamina_side: 'l',
      sph_ica: 'b',
      rf: 'yes',
      rf_list: ['unilateral', 'destruction', 'orbit'],
    })
    expect(text).toContain('Lund-Mackay 6/24.')
    expect(text).toContain('lamina papyracea dehiscence on the left')
    expect(text).toContain('internal carotid artery dehiscence into the sphenoid bilaterally')
    expect(text).toContain('no optic nerve dehiscence')
    expect(text).toContain('Red flags for tumor: unilateral disease, bone destruction (not remodeling) and invasion of the orbit. MRI recommended.')
    expectClean(text)
  })

  it('mucocele with extension names the extension', () => {
    const { text } = report(study, { pattern: ['muco'], pattern_site: 'left frontal', muco_ext: ['orbital', 'intracranial'] })
    expect(text).toContain('Mucocele, left frontal, with orbital extension and intracranial extension.')
    expectClean(text)
  })
})
