import { describe, expect, it } from 'vitest'
import { chips, report, studyOf } from '../study/testing'
import type { Values } from '../study/types'
import { TemporalBoneCtStudyPage } from './TemporalBoneCtStudy'

/*
 * Each case pins a rule the lesson states, at its boundary, so a change to the rule
 * shows up as a failing test. Quote the lesson sentence the case comes from.
 */
const study = studyOf(TemporalBoneCtStudyPage)

/** Both ears with the required items answered as normal. */
const normal: Values = {
  r_eac: 'patent', l_eac: 'patent',
  r_scutum: 'sharp', l_scutum: 'sharp',
  r_me: 'clear', l_me: 'clear',
}

function expectClean(text: string) {
  expect(text).not.toMatch(/undefined|NaN|\[object/)
  for (const line of text.split('\n')) expect(line.trimStart()).not.toMatch(/ {2}/)
}

function impression(values: Values) {
  return report(study, { ...normal, ...values }).text.split('IMPRESSION:')[1] ?? ''
}

describe('temporal bone CT: vestibular aqueduct', () => {
  // "midpoint width ≥1.0 mm or opercular width ≥2.0 mm is enlarged ... Either criterion is enough."
  it.each([
    [{ r_vaMid: '0.9' }, 'Normal'],
    [{ r_vaMid: '1.0' }, 'Enlarged'],
    [{ r_vaOp: '1.9' }, 'Normal'],
    [{ r_vaOp: '2.0' }, 'Enlarged'],
    [{ r_vaMid: '1.0', r_vaOp: '1.8' }, 'Enlarged'],
    [{ r_vaMid: '0.5', r_vaOp: '2.1' }, 'Enlarged'],
  ])('%o is %s', (values, result) => {
    expect(chips(study, 'inner-ear', values)['Right: Vestibular aqueduct']).toBe(result)
  })
  it('an enlarged aqueduct is in the impression', () => {
    expect(impression({ l_vaMid: '1.2' })).toContain('Left: enlarged vestibular aqueduct.')
    expect(impression({ l_vaMid: '0.9' })).not.toContain('enlarged vestibular aqueduct')
  })
})

describe('temporal bone CT: otosclerosis grade', () => {
  // "grade 1 fenestral only; grade 2 patchy cochlear disease (2A basal turn, 2B middle/apical turns, 2C both);
  // grade 3 diffuse confluent cochlear involvement."
  it.each([
    [{ r_fenestral: 'present' }, 'Grade 1'],
    [{ r_retro: 'basal' }, 'Grade 2A'],
    [{ r_retro: 'apical' }, 'Grade 2B'],
    [{ r_retro: 'both' }, 'Grade 2C'],
    [{ r_retro: 'diffuse' }, 'Grade 3'],
    [{ r_fenestral: 'present', r_retro: 'basal' }, 'Grade 2A'],
  ])('%o is %s', (values, grade) => {
    expect(chips(study, 'inner-ear', { r_capsule: 'lucent', ...values })['Right: Otosclerosis']).toBe(grade)
  })
  it('no lucency, no grade', () => {
    expect(chips(study, 'inner-ear')['Right: Otosclerosis']).toBeUndefined()
  })
})

describe('temporal bone CT: cholesteatoma pattern', () => {
  // "what makes the diagnosis on CT is a non-dependent soft-tissue mass plus bone erosion in a typical location."
  it('mass-like opacity with bone erosion is the cholesteatoma pattern', () => {
    const v = { r_me: 'opacified', r_meChar: 'mass', r_scutum: 'eroded' }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toBe('Non-dependent mass plus bone erosion: cholesteatoma')
  })
  it.each([
    ['blunted scutum', { r_scutum: 'blunted' }],
    ['eroded ossicle', { r_incusLp: 'eroded' }],
    ['absent ossicle', { r_stapes: 'absent' }],
    ['EAC wall erosion', { r_eacErosion: 'present' }],
    ['lateral canal fistula', { r_fistula: 'incomplete' }],
  ])('%s counts as bone erosion', (_name, erosion) => {
    const v = { r_me: 'opacified', r_meChar: 'mass', r_scutum: 'sharp', ...erosion }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toMatch(/cholesteatoma$/)
  })
  // "If there is no mass-like tissue and no scutum erosion, say 'no CT evidence of cholesteatoma; DWI MRI if clinically suspected.'"
  it('fluid-like opacity with a sharp scutum is no CT evidence of cholesteatoma', () => {
    const v = { r_me: 'opacified', r_meChar: 'fluid', r_scutum: 'sharp' }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toBe('No CT evidence of cholesteatoma; DWI MRI if clinically suspected')
    expect(impression(v)).toContain('no CT evidence of cholesteatoma; DWI MRI if clinically suspected')
  })
  // "When CT is uncertain (opacified postoperative ear, or an opaque middle ear without erosion), the answer is
  // non-echo-planar diffusion-weighted MRI."
  it('mass-like opacity without erosion is uncertain: DWI', () => {
    const v = { r_me: 'opacified', r_meChar: 'mass', r_scutum: 'sharp' }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toBe('CT uncertain: non-echo-planar DWI MRI')
    expect(impression(v)).toContain('Recommendation, right ear: non-echo-planar DWI MRI (opaque middle ear without erosion).')
  })
  it('an opacified postoperative ear with erosion still gets DWI (postoperative)', () => {
    const v = { r_me: 'opacified', r_meChar: 'mass', r_scutum: 'eroded', r_surgery: 'yes', r_surgeryTypes: ['cwu'] }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toBe('Non-dependent mass plus bone erosion: cholesteatoma')
    expect(impression(v)).toContain('non-echo-planar DWI MRI (opacified postoperative ear)')
  })
  it('a clear middle ear gives no CT pattern', () => {
    expect(chips(study, 'middle-ear', normal)['Right: CT pattern']).toBeUndefined()
  })
  it('in trauma, middle ear fluid is not read against cholesteatoma', () => {
    const v = { r_me: 'opacified', r_meChar: 'fluid', r_fracture: 'present', r_ocs: 'sparing' }
    expect(chips(study, 'middle-ear', v)['Right: CT pattern']).toBeUndefined()
  })
})

describe('temporal bone CT: mastoid', () => {
  // "Say 'recommend contrast-enhanced CT or MRI' when you see coalescence."
  it('septal breakdown is coalescent mastoiditis and recommends contrast CT or MRI', () => {
    expect(chips(study, 'mastoid', { r_septa: 'present' })['Right: Mastoid']).toBe('Coalescent mastoiditis: contrast CT or MRI')
    expect(impression({ r_septa: 'present' })).toContain('contrast-enhanced CT or MRI (coalescent mastoiditis)')
  })
  // "Fluid in the mastoid alone is common and often meaningless."
  it('mastoid fluid with intact septa is often meaningless', () => {
    expect(chips(study, 'mastoid', { r_mastoidOpac: 'yes' })['Right: Mastoid']).toBe('Fluid alone, septa intact: often meaningless')
    expect(impression({ r_mastoidOpac: 'yes' })).not.toContain('Recommendation')
  })
})

describe('temporal bone CT: danger anatomy and recommendations', () => {
  it('names each dehiscent facial canal segment', () => {
    expect(chips(study, 'facial', { r_fn_tymp: 'dehiscent', r_fn_gen: 'dehiscent' })['Right: Facial canal dehiscence']).toBe('geniculate, tympanic')
    expect(impression({ r_fn_tymp: 'dehiscent' })).toContain('dehiscent tympanic facial nerve segment')
  })
  // "Aberrant ICA, dehiscent jugular bulb and persistent stapedial artery ... are the 'do not biopsy' lesions."
  it.each([{ r_carotid: 'aberrant' }, { r_carotid: 'dehiscent' }, { r_jb: 'dehiscent' }])('%o is do not biopsy', (v) => {
    expect(chips(study, 'vessels', v)['Right: Vascular variant']).toBe('Do not biopsy')
  })
  it('a high-riding covered bulb is not do not biopsy', () => {
    expect(chips(study, 'vessels', { r_jb: 'high' })['Right: Vascular variant']).toBeUndefined()
  })
  // "a defective fundus or absent canal means a possible absent cochlear nerve, which needs MRI."
  it('a defective IAC fundus recommends MRI', () => {
    expect(chips(study, 'iac', { r_iac: 'defect' })['Right: IAC']).toBe('Possible absent cochlear nerve: MRI')
    expect(impression({ r_iac: 'defect' })).toContain('MRI (possible absent cochlear nerve)')
  })
  // "moth-eaten (permeative) margin, it is a glomus jugulotympanicum; recommend MRI."
  it('a moth-eaten jugular foramen recommends MRI', () => {
    expect(chips(study, 'iac', { r_jf: 'motheaten' })['Right: Jugular foramen']).toBe('Glomus jugulotympanicum pattern: MRI')
    expect(impression({ r_jf: 'motheaten' })).toContain('MRI (moth-eaten jugular foramen margin)')
  })
  // Necrotizing otitis externa: "Say so and recommend MRI to map the skull base marrow."
  it('EAC soft tissue with erosion in an at-risk patient is necrotizing otitis externa', () => {
    const v = { r_eac: 'soft', r_eacErosion: 'present', r_noe: 'yes' }
    expect(chips(study, 'eac', v)['Right: EAC']).toBe('Necrotizing otitis externa pattern: recommend MRI')
    expect(impression(v)).toContain('MRI to map the skull base marrow (necrotizing otitis externa)')
    expect(chips(study, 'eac', { ...v, r_noe: 'no' })['Right: EAC']).toBe('Think necrotizing otitis externa or EAC cholesteatoma')
  })
  // "Canal wall down: soft tissue in the cavity is the question, recurrence vs debris. DWI MRI answers it."
  it('soft tissue in a canal wall down cavity recommends DWI', () => {
    const v = { r_surgery: 'yes', r_surgeryTypes: ['cwd'], r_cavity: 'present' }
    expect(chips(study, 'surgery', v)['Right: Cavity soft tissue']).toBe('DWI MRI: recurrence vs debris')
    expect(impression(v)).toContain('DWI MRI for cavity soft tissue (recurrence vs debris)')
  })
  // "carotid canal involvement (recommend CTA), tegmen breach (CSF leak risk)"
  it('a fracture through the carotid canal recommends CTA; a tegmen breach is CSF leak risk', () => {
    const v = { r_fracture: 'present', r_ocs: 'violating', r_fxCarotid: 'yes', r_fxTegmen: 'yes', r_fxPneumolab: 'yes' }
    const c = chips(study, 'trauma', v)
    expect(c['Right: Otic capsule violating']).toBe('Higher facial nerve, SNHL and CSF leak risk')
    expect(c['Right: Carotid canal']).toBe('Recommend CTA')
    expect(c['Right: Tegmen breach']).toBe('CSF leak risk')
    expect(c['Right: Pneumolabyrinth']).toBe('Window or otic capsule fracture')
    expect(impression(v)).toContain('CTA (fracture involves the carotid canal)')
  })
  it('reports only the ears asked for', () => {
    const { text } = report(study, { ...normal, sides: 'l', r_septa: 'present' })
    expect(text).toContain('LEFT:')
    expect(text).not.toContain('RIGHT:')
    expect(text).not.toContain('coalescent')
  })
})

describe('temporal bone CT: contradictions', () => {
  const warnings = (v: Values) => report(study, { ...normal, ...v }).warnings
  it('superior canal dehiscence without Pöschl/Stenvers reformats', () => {
    expect(warnings({ reformats: 'no', r_sscd: 'present' }).join(' ')).toMatch(/^Right: superior canal dehiscence called without Pöschl\/Stenvers/)
    expect(warnings({ reformats: 'yes', r_sscd: 'present' }).join(' ')).not.toMatch(/superior canal/)
  })
  it('tegmen dehiscence not confirmed on two planes', () => {
    expect(warnings({ r_tegTymp: 'dehiscent', r_tegPlanes: 'no' })).toContain('Right: tegmen dehiscence not confirmed on two planes; thin is normal, a gap on two planes is dehiscence.')
    expect(warnings({ r_tegTymp: 'dehiscent', r_tegPlanes: 'yes' }).join(' ')).not.toMatch(/two planes/)
  })
  // "Every IP-II ear had an enlarged aqueduct and no IP-I ear did."
  it('IP-II with a normal aqueduct, and IP-I with an enlarged one', () => {
    expect(warnings({ r_cochlea: 'ip2', r_fnCourse: 'normal', r_vaMid: '0.9' }).join(' ')).toMatch(/IP-II with a normal-width vestibular aqueduct/)
    expect(warnings({ r_cochlea: 'ip2', r_fnCourse: 'normal', r_vaMid: '1.0' }).join(' ')).not.toMatch(/IP-II/)
    expect(warnings({ r_cochlea: 'ip1', r_vestibule: 'cystic', r_fnCourse: 'normal', r_vaMid: '1.0' }).join(' ')).toMatch(/IP-I with an enlarged vestibular aqueduct/)
  })
  it('normal capsule density with a lucency', () => {
    expect(warnings({ r_fenestral: 'present' })).toContain('Right: otic capsule density marked normal but a fenestral or retrofenestral lucency is recorded.')
    expect(warnings({ r_retro: 'basal' }).join(' ')).toMatch(/otic capsule density marked normal/)
    expect(warnings({ r_capsule: 'lucent', r_retro: 'basal' }).join(' ')).not.toMatch(/otic capsule density/)
  })
  it('a tegmen-breaching fracture with both tegmina intact', () => {
    expect(warnings({ r_fracture: 'present', r_ocs: 'sparing', r_fxTegmen: 'yes' })).toContain('Right: fracture breaches the tegmen but both tegmen tympani and mastoideum are marked intact.')
  })
  it('both canal wall up and canal wall down', () => {
    expect(warnings({ r_surgery: 'yes', r_surgeryTypes: ['cwu', 'cwd'] })).toContain('Right: both canal wall up and canal wall down mastoidectomy selected.')
  })
  it('Michel, common cavity and IP-I against a normal vestibule', () => {
    expect(warnings({ r_cochlea: 'michel', r_fnCourse: 'normal' }).join(' ')).toMatch(/Michel \(no inner ear\) recorded with a normal vestibule/)
    expect(warnings({ r_cochlea: 'cc', r_fnCourse: 'normal' }).join(' ')).toMatch(/common cavity .* recorded with a normal vestibule/)
    expect(warnings({ r_cochlea: 'ip1', r_fnCourse: 'normal' }).join(' ')).toMatch(/IP-I \(cochlea and vestibule both cystic\) recorded with a normal vestibule/)
  })
  // "a pre-implant report must state facial nerve course and cochlear partition" (the study's warning text).
  it('a malformed ear without a facial nerve course', () => {
    expect(warnings({ r_cochlea: 'hypo', r_fnCourse: '' }).join(' ')).toMatch(/malformed ear without a stated facial nerve course/)
    expect(warnings({ r_cochlea: 'hypo', r_fnCourse: 'anterior' }).join(' ')).not.toMatch(/facial nerve course/)
  })
  // "Never write 'ossicular chain erosion' without naming which ossicle."
  it('"ossicular chain erosion" in the summary', () => {
    expect(warnings({ summary: 'Right attic cholesteatoma with ossicular chain erosion' })).toContain('Never write "ossicular chain erosion" without naming which ossicle.')
  })
})

describe('temporal bone CT: required items', () => {
  it('lists the must-state items while the form is empty', () => {
    const { warnings } = report(study)
    for (const label of ['Right: EAC', 'Left: EAC', 'Right: Scutum', 'Left: Scutum', 'Right: Middle ear', 'Left: Middle ear']) {
      expect(warnings).toContain(`${label} not stated`)
    }
  })
  it('asks for the character of an opacified middle ear and the otic capsule of a fracture', () => {
    const { warnings } = report(study, { ...normal, r_me: 'opacified', l_fracture: 'present' })
    expect(warnings).toContain('Right: Character not stated')
    expect(warnings).toContain('Left: Otic capsule not stated')
  })
  it('asks for nothing once the normal case is answered', () => {
    expect(report(study, normal).warnings).toEqual([])
  })
  it('the empty form prints clean text', () => {
    expectClean(report(study).text)
  })
})

describe('temporal bone CT: whole cases', () => {
  it('normal ears', () => {
    const { text } = report(study, normal)
    expect(text).toContain('Pöschl/Stenvers reformats of the superior semicircular canals.')
    expect(text).toMatch(/Right: malleus intact; incus body intact; incus long process intact; stapes intact\./)
    expect(text).toContain('no facial canal dehiscence; facial nerve course normal; no lateral canal fistula; tegmen tympani intact')
    expect(text).toContain('jugular bulb normal; carotid canal intact')
    expect(text).not.toContain('Recommendation')
    expect(text).not.toContain('cholesteatoma')
    expectClean(text)
  })

  it('right attic cholesteatoma with an eroded incus and dehiscent tympanic facial canal', () => {
    const { text, warnings } = report(study, {
      ...normal,
      r_scutum: 'eroded',
      r_me: 'opacified',
      r_meComp: ['epi', 'aditus', 'antrum'],
      r_meChar: 'mass',
      r_incusLp: 'eroded',
      r_fn_tymp: 'dehiscent',
      r_fistula: 'incomplete',
      r_jb: 'high',
      summary: 'right attic cholesteatoma extending into the aditus and antrum.',
    })
    expect(warnings).toEqual([])
    const imp = text.split('IMPRESSION:')[1]
    expect(imp).toContain('1. Right attic cholesteatoma extending into the aditus and antrum.')
    expect(imp).toContain('non-dependent soft-tissue mass with bone erosion involving the epitympanum, aditus, antrum, the CT pattern of cholesteatoma')
    expect(imp).toContain('incus long process eroded')
    expect(imp).toContain('scutum eroded')
    expect(imp).toContain('dehiscent tympanic facial nerve segment')
    expect(imp).toContain('incomplete lateral canal fistula (bony wall thinned)')
    expect(imp).toContain('jugular bulb high-riding but covered')
    expect(imp).not.toContain('Recommendation, right ear')
    expectClean(text)
  })

  it('otic capsule violating fracture through the carotid canal', () => {
    const { text } = report(study, {
      ...normal,
      l_me: 'opacified',
      l_meChar: 'fluid',
      l_fracture: 'present',
      l_ocs: 'violating',
      l_fxFacial: ['gen', 'lab'],
      l_fxOss: 'is',
      l_fxCarotid: 'yes',
      l_fxTegmen: 'no',
      l_fxHemo: 'yes',
    })
    expect(text).toContain('FRACTURE: otic capsule violating; through the facial canal (labyrinthine, geniculate segments); incudostapedial dislocation; involves the carotid canal; tegmen not breached; hemotympanum')
    expect(text).toContain('Left: otic capsule violating fracture.')
    expect(text).toContain('fracture through the facial canal (labyrinthine, geniculate)')
    expect(text).toContain('Recommendation, left ear: CTA (fracture involves the carotid canal).')
    expect(text).not.toContain('no CT evidence of cholesteatoma')
    expectClean(text)
  })

  it('pre-implant malformed ear with an enlarged aqueduct', () => {
    const { text, warnings } = report(study, {
      ...normal,
      sides: 'r',
      r_cochlea: 'ip2',
      r_vestibule: 'dilated',
      r_vaMid: '1.5',
      r_fnCourse: 'anterior',
      r_sscd: 'present',
      r_sscdLen: '3',
      r_sscdSite: 'arcuate',
    })
    expect(warnings).toEqual([])
    expect(text).toContain('vestibular aqueduct: enlarged (midpoint 1.5 mm)')
    expect(text).toContain('superior canal dehiscence (Pöschl/Stenvers): present, 3 mm, under the arcuate eminence')
    expect(text).toContain('Right: superior semicircular canal dehiscence, 3 mm, under the arcuate eminence; incomplete partition type II; enlarged vestibular aqueduct.')
    expect(text).toContain('facial nerve course anteriorly displaced')
    expectClean(text)
  })
})
