import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { diabeticFootMriScans } from '../data/scans/diabeticFootMri'
import { StudyPage } from '../study/StudyPage'
import { lines, list, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23), but
 * the papers are paywalled, so only claims whose wording is in an abstract, or in an open review
 * cited beside the paper (2026-10-29), are verified. The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-diabetic-foot-mri-sources.md (D claims). Rule chips and
 * warnings carry their claim IDs.
 */

const MORRISON_DOI = '10.1148/radiology.207.3.9609883'
const LEDERMANN_DOI = '10.1148/radiol.2233011279'
const JOHNSON_DOI = '10.2214/AJR.08.1376'
const DONOVAN_DOI = '10.1148/rg.303095111'
const LEDERMANN_MORRISON_DOI = '10.1055/s-2005-921945'
const LEDERMANN_NONENHANCING_DOI = '10.2214/ajr.178.1.1780215'
const CHANTELAU_DOI = '10.1111/j.1464-5491.2005.01677.x'
const ROSSKOPF_DOI = '10.1186/s13244-019-0768-9'
const WEAVER_DOI = '10.5114/pjr.2022.113825'

const MORRISON = <Cite doi={MORRISON_DOI}>Morrison et al., Radiology 1998</Cite>
const LEDERMANN = <Cite doi={LEDERMANN_DOI}>Ledermann et al., Radiology 2002</Cite>
const JOHNSON = <Cite doi={JOHNSON_DOI}>Johnson et al., AJR 2009</Cite>
const DONOVAN = <Cite doi={DONOVAN_DOI}>Donovan and Schweitzer, RadioGraphics 2010</Cite>
const LEDERMANN_MORRISON = <Cite doi={LEDERMANN_MORRISON_DOI}>Ledermann and Morrison, Semin Musculoskelet Radiol 2005</Cite>
const LEDERMANN_NONENHANCING = <Cite doi={LEDERMANN_NONENHANCING_DOI}>Ledermann et al., AJR 2002</Cite>
const CHANTELAU = <Cite doi={CHANTELAU_DOI}>Chantelau, Diabet Med 2005</Cite>
const ROSSKOPF = <Cite doi={ROSSKOPF_DOI}>Rosskopf et al., Insights Imaging 2019</Cite>
const WEAVER = <Cite doi={WEAVER_DOI}>Weaver et al., Pol J Radiol 2022</Cite>

const references: LessonReference[] = [
  { citation: 'Morrison WB, Schweitzer ME, Batte WG, Radack DP, Russel KM. Osteomyelitis of the foot: relative importance of primary and secondary MR imaging signs. Radiology. 1998;207(3):625-632.', doi: MORRISON_DOI },
  { citation: 'Ledermann HP, Morrison WB, Schweitzer ME. MR image analysis of pedal osteomyelitis: distribution, patterns of spread, and frequency of associated ulceration and septic arthritis. Radiology. 2002;223(3):747-755.', doi: LEDERMANN_DOI },
  { citation: 'Johnson PW, Collins MS, Wenger DE. Diagnostic utility of T1-weighted MRI characteristics in evaluation of osteomyelitis of the foot. AJR Am J Roentgenol. 2009;192(1):96-100.', doi: JOHNSON_DOI },
  { citation: 'Donovan A, Schweitzer ME. Use of MR imaging in diagnosing diabetes-related pedal osteomyelitis. RadioGraphics. 2010;30(3):723-736.', doi: DONOVAN_DOI },
  { citation: 'Ledermann HP, Morrison WB. Differential diagnosis of pedal osteomyelitis and diabetic neuroarthropathy: MR imaging. Semin Musculoskelet Radiol. 2005;9(3):272-283.', doi: LEDERMANN_MORRISON_DOI },
  { citation: 'Ledermann HP, Schweitzer ME, Morrison WB. Nonenhancing tissue on MR imaging of pedal infection: characterization of necrotic tissue and associated limitations for diagnosis of osteomyelitis and abscess. AJR Am J Roentgenol. 2002;178(1):215-222.', doi: LEDERMANN_NONENHANCING_DOI },
  { citation: 'Chantelau E. The perils of procrastination: effects of early vs. delayed detection and treatment of incipient Charcot fracture. Diabet Med. 2005;22(12):1707-1712.', doi: CHANTELAU_DOI },
  { citation: 'Rosskopf AB, Loupatatzis C, Pfirrmann CWA, Böni T, Berli MC. The Charcot foot: a pictorial review. Insights Imaging. 2019;10(1):77.', doi: ROSSKOPF_DOI },
  { citation: 'Weaver JS, Omar IM, Mar WA, Klauser AS, Winegar BA, Mlady GW, McCurdy WE, Taljanovic MS. Magnetic resonance imaging of musculoskeletal infections. Pol J Radiol. 2022;87:e141-e162.', doi: WEAVER_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the foot MRI of a patient with diabetes: a foot ulcer, a hot swollen foot, or a known Charcot foot that may now be infected. The question is almost always whether the bone is infected, whether there is a collection to drain, and whether the joints are breaking down from neuropathy. The order and the protocol checklist are this site's own.</p>
        <p>The T1-weighted sequence is the one that decides osteomyelitis (step 3), so it must be there, without fat suppression, in at least two planes. Add fat-suppressed fluid-sensitive images.</p>
        <p>Contrast shows abscesses and sinus tracts more clearly, and it shows dead tissue, which does not enhance. Infected bone inside dead tissue may not enhance either, so a lack of enhancement there does not exclude osteomyelitis or an abscess ({LEDERMANN_NONENHANCING}).</p>
      </>
    ),
  },
  {
    id: 'soft-tissue',
    title: 'Step 2. Skin and soft tissues',
    body: (
      <>
        <p>Find the ulcer first. Osteomyelitis in the diabetic foot almost always spreads into the bone from an ulcer or sinus tract next to it, so the ulcer tells you which bone to study ({LEDERMANN}). The usual sites are the pressure points: the toes, the metatarsal heads and the calcaneus ({LEDERMANN}; {ROSSKOPF}).</p>
        <p>Then look for a sinus tract running from the ulcer towards bone, an abscess (a rim-enhancing collection after contrast), and gas in the soft tissues ({DONOVAN}; {WEAVER}).</p>
        <ScanFigures images={[diabeticFootMriScans.sinusTract, diabeticFootMriScans.abscess]} />
      </>
    ),
  },
  {
    id: 'bone',
    title: 'Step 3. Bone: osteomyelitis',
    body: (
      <>
        <p>Read the marrow on the T1-weighted images first. A confluent pattern of decreased T1 marrow signal in a medullary distribution correlates highly with osteomyelitis; in the same series, no case with a hazy reticulated pattern had osteomyelitis ({JOHNSON}).</p>
        <p>Secondary signs add weight: an adjacent ulcer, a sinus tract, interruption of the cortex and a soft-tissue abscess ({MORRISON}).</p>
        <p>So the question for each abnormal bone is: is the T1 signal confluent, and does the bone touch the ulcer or sinus tract? Confluent T1 change in a bone with no ulcer or sinus tract next to it should make you think again, often of neuroarthropathy (step 5).</p>
        <ScanFigures images={[diabeticFootMriScans.calcanealOsteomyelitis, diabeticFootMriScans.hazyReticularT1]} />
      </>
    ),
  },
  {
    id: 'joints',
    title: 'Step 4. Joints',
    body: (
      <>
        <p>Septic arthritis often comes with osteomyelitis, as the infection spreads across the joint ({LEDERMANN}). Look at every joint next to an infected bone for an effusion, and say which joint it is.</p>
        <ScanFigures images={[diabeticFootMriScans.septicArthritis]} />
      </>
    ),
  },
  {
    id: 'charcot',
    title: 'Step 5. Charcot neuroarthropathy',
    body: (
      <>
        <p>Telling neuroarthropathy from osteomyelitis requires careful analysis of where the bone signal changes are, their distribution and their pattern ({LEDERMANN_MORRISON}). Neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal joints, whereas osteomyelitis occurs distal to the tarsometatarsal joint, in the calcaneus and in the malleoli ({DONOVAN}).</p>
        <p>An active Charcot foot shows subchondral marrow edema and effusions. MRI shows it while the radiographs are still normal (stage 0), when treatment can still prevent collapse ({CHANTELAU}; {ROSSKOPF}). An inactive foot shows no edema, with sclerosis, remodelling and deformity.</p>
        <p>The two diseases can coexist. In a neuropathic joint, a bone whose outline fades on T1-weighted images but reappears on fluid-sensitive or contrast images (the ghost sign) suggests infection ({DONOVAN}; {ROSSKOPF}); a neuropathic bone keeps its outline ({DONOVAN}).</p>
        <ScanFigures images={[diabeticFootMriScans.activeCharcotStir, diabeticFootMriScans.ghostSignT1, diabeticFootMriScans.ghostSignContrast]} />
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    body: (
      <>
        <p>Name each infected bone, each collection, and each joint at risk: the referrer needs to know exactly what to debride or drain. Then say whether there is neuroarthropathy, and whether it looks active.</p>
      </>
    ),
  },
]

/* The report. */

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

function picked(values: Values, field: { id: string; options: Option[] }): string {
  const value = str(values, field.id)
  return value ? lowerFirst(optionLabel(field, value)) : ''
}

function chosen(values: Values, field: { id: string; options: Option[] }): string[] {
  return list(values, field.id).map((value) => lowerFirst(optionLabel(field, value)))
}

const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'ulcer', label: 'Diabetes with a foot ulcer' },
    { value: 'hot-foot', label: 'Diabetes with a hot, swollen foot' },
    { value: 'charcot', label: 'Known Charcot foot, question of infection' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'T1 without fat suppression in two planes, and fat-suppressed PD or T2.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 't1', label: 'T1 without fat suppression in two planes' },
    { value: 'fs', label: 'Fat-suppressed PD or T2' },
  ] },
  contrast: { id: 'contrast', kind: 'choice', label: 'Contrast', options: [
    { value: 'given', label: 'Given' },
    { value: 'not-given', label: 'Not given' },
  ] },

  ulcer: { id: 'ulcer', kind: 'choice', label: 'Ulcer', required: true, options: nonePresent },
  ulcerSite: { id: 'ulcer-site', kind: 'text', label: 'Ulcer site', placeholder: 'e.g. plantar to the first metatarsal head', showIf: (v) => str(v, 'ulcer') === 'present' },
  sinus: { id: 'sinus', kind: 'choice', label: 'Sinus tract', required: true, options: nonePresent },
  abscess: { id: 'abscess', kind: 'choice', label: 'Abscess', required: true, options: nonePresent },
  abscessSite: { id: 'abscess-site', kind: 'text', label: 'Abscess site and size', placeholder: 'e.g. plantar to the cuboid, 2 cm', showIf: (v) => str(v, 'abscess') === 'present' },
  gas: { id: 'gas', kind: 'choice', label: 'Soft-tissue gas', required: true, options: nonePresent },
  devitalised: { id: 'devitalised', kind: 'choice', label: 'Non-enhancing (dead) tissue', showIf: (v) => str(v, 'contrast') === 'given', options: nonePresent },

  marrow: { id: 'marrow', kind: 'choice', label: 'Marrow signal', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Abnormal' },
  ] },
  boneSite: { id: 'bone-site', kind: 'text', label: 'Which bone', placeholder: 'e.g. first metatarsal head', showIf: (v) => str(v, 'marrow') === 'abnormal' },
  t1: { id: 't1', kind: 'choice', label: 'T1 marrow signal', required: true, showIf: (v) => str(v, 'marrow') === 'abnormal', help: 'Read on T1 without fat suppression.', options: [
    { value: 'normal', label: 'Normal: fatty marrow kept (edema on fluid-sensitive images only)' },
    { value: 'hazy', label: 'Hazy reticulated low signal, not confluent' },
    { value: 'confluent', label: 'Confluent low signal replacing the marrow' },
  ] },
  contiguous: { id: 'contiguous', kind: 'choice', label: 'Bone next to the ulcer or sinus tract', required: true, showIf: (v) => str(v, 'marrow') === 'abnormal', options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ] },
  cortex: { id: 'cortex', kind: 'choice', label: 'Cortex', showIf: (v) => str(v, 'marrow') === 'abnormal', options: [
    { value: 'intact', label: 'Intact' },
    { value: 'interrupted', label: 'Interrupted' },
  ] },

  joint: { id: 'joint', kind: 'choice', label: 'Effusion next to an abnormal bone', required: true, options: nonePresent },
  jointSite: { id: 'joint-site', kind: 'text', label: 'Which joint', placeholder: 'e.g. first MTP joint', showIf: (v) => str(v, 'joint') === 'present' },

  charcot: { id: 'charcot', kind: 'choice', label: 'Neuroarthropathy (Charcot)', required: true, options: nonePresent },
  charcotSites: { id: 'charcot-sites', kind: 'multi', label: 'Joints involved', showIf: (v) => str(v, 'charcot') === 'present', options: [
    { value: 'mtp', label: 'Metatarsophalangeal' },
    { value: 'ip', label: 'Interphalangeal' },
    { value: 'tmt', label: 'Tarsometatarsal (Lisfranc)' },
    { value: 'chopart', label: 'Naviculocuneiform and Chopart' },
    { value: 'ankle', label: 'Subtalar and ankle' },
    { value: 'calcaneus', label: 'Calcaneal tuberosity' },
  ] },
  charcotActivity: { id: 'charcot-activity', kind: 'choice', label: 'Activity', showIf: (v) => str(v, 'charcot') === 'present', options: [
    { value: 'active', label: 'Active: subchondral marrow edema and effusions' },
    { value: 'inactive', label: 'Inactive: no edema; sclerosis and remodelling' },
  ] },
  charcotDeformity: { id: 'charcot-deformity', kind: 'choice', label: 'Deformity', showIf: (v) => str(v, 'charcot') === 'present', options: [
    { value: 'none', label: 'None' },
    { value: 'collapse', label: 'Collapsed arch (rocker-bottom)' },
    { value: 'other', label: 'Other deformity' },
  ] },
  ghost: { id: 'ghost', kind: 'choice', label: 'Ghost sign', showIf: (v) => str(v, 'charcot') === 'present', help: 'A bone outline that fades on T1 but reappears on fluid-sensitive or contrast images.', options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. tenosynovitis of the flexor hallucis longus' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-osteomyelitis', label: 'No osteomyelitis' },
    { value: 'no-abscess', label: 'No abscess' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

const abnormalBone = (values: Values) => str(values, 'marrow') === 'abnormal'
const confluent = (values: Values) => abnormalBone(values) && str(values, 't1') === 'confluent'
const touchesUlcer = (values: Values) => abnormalBone(values) && str(values, 'contiguous') === 'yes'
const charcotPresent = (values: Values) => str(values, 'charcot') === 'present'

/** D3, D2: confluent T1 change in a bone next to an ulcer or sinus tract. */
const osteomyelitis = (values: Values) => confluent(values) && touchesUlcer(values)

/** D5: the commonest Charcot sites, the tarsometatarsal and metatarsophalangeal joints (Donovan). */
const usualCharcot = (values: Values) => charcotPresent(values) && list(values, 'charcot-sites').some((site) => site === 'tmt' || site === 'mtp')

function bone(values: Values): string {
  return str(values, 'bone-site') || 'the abnormal bone'
}

/* Rule chips. */

function deriveBone(values: Values): Derived[] {
  if (!abnormalBone(values)) return []
  const out: Derived[] = []
  // D3: confluent medullary low T1 signal correlates with osteomyelitis; no hazy reticulated case had it.
  const t1 = str(values, 't1')
  if (t1 === 'confluent') out.push({ label: 'T1', value: 'Confluent low signal: the pattern of osteomyelitis', tone: 'warn' })
  if (t1 === 'hazy' || t1 === 'normal') out.push({ label: 'T1', value: 'Not confluent: does not establish osteomyelitis' })
  // D2: osteomyelitis spreads from an adjacent ulcer or sinus tract.
  if (t1 === 'confluent' && str(values, 'contiguous') === 'no') out.push({ label: 'Spread', value: 'No ulcer or sinus tract next to it: think again, often of neuroarthropathy' })
  // D1: secondary signs.
  const secondary = [touchesUlcer(values) && 'next to the ulcer', str(values, 'cortex') === 'interrupted' && 'cortex interrupted', str(values, 'abscess') === 'present' && 'abscess']
    .filter((sign): sign is string => Boolean(sign))
  if (secondary.length > 0) out.push({ label: 'Secondary signs', value: upperFirst(secondary.join(', ')) })
  return out
}

function deriveCharcot(values: Values): Derived[] {
  if (!charcotPresent(values)) return []
  const out: Derived[] = []
  // D5: neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal joints.
  if (usualCharcot(values)) out.push({ label: 'Distribution', value: 'Tarsometatarsal or metatarsophalangeal: the commonest Charcot sites', tone: 'good' })
  // D4: the ghost sign suggests infection within the neuropathic joint.
  if (str(values, 'ghost') === 'present') out.push({ label: 'Ghost sign', value: 'Suggests infection within the neuropathic bone', tone: 'warn' })
  // D7: active disease shows marrow edema, before radiographic change.
  if (str(values, 'charcot-activity') === 'active') out.push({ label: 'Activity', value: 'Active: MRI shows this before radiographs change', tone: 'warn' })
  return out
}

/* Report lines. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  return [
    choiceLine(values, fields.history),
    protocol === 'complete' && 'Technique: T1-weighted imaging in two planes and fat-suppressed PD/T2',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.contrast),
  ]
}

function softTissueLines(values: Values): (string | false)[] {
  return [
    choiceLine(values, fields.ulcer, str(values, 'ulcer') === 'present' && str(values, 'ulcer-site')),
    choiceLine(values, fields.sinus),
    choiceLine(values, fields.abscess, str(values, 'abscess') === 'present' && str(values, 'abscess-site')),
    choiceLine(values, fields.gas),
    str(values, 'contrast') === 'given' && choiceLine(values, fields.devitalised),
  ]
}

function boneLines(values: Values): (string | false)[] {
  if (str(values, 'marrow') === 'normal') return ['Marrow: normal']
  if (!abnormalBone(values)) return []
  return [
    `Marrow: abnormal${str(values, 'bone-site') ? `, ${str(values, 'bone-site')}` : ''}`,
    choiceLine(values, fields.t1),
    choiceLine(values, fields.contiguous),
    choiceLine(values, fields.cortex),
  ]
}

function charcotLines(values: Values): (string | false)[] {
  const sites = chosen(values, fields.charcotSites)
  return [
    choiceLine(values, fields.joint, str(values, 'joint') === 'present' && str(values, 'joint-site')),
    choiceLine(values, fields.charcot, charcotPresent(values) && sites.length > 0 && sites.join(', ')),
    charcotPresent(values) && choiceLine(values, fields.charcotActivity),
    charcotPresent(values) && choiceLine(values, fields.charcotDeformity),
    charcotPresent(values) && choiceLine(values, fields.ghost),
  ]
}

/* The impression. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  if (osteomyelitis(values)) out.push(`Osteomyelitis of ${bone(values)}: confluent low T1 marrow signal next to the ${str(values, 'ulcer') === 'present' ? 'ulcer' : 'sinus tract'}.`)
  else if (confluent(values)) out.push(`Confluent low T1 marrow signal in ${bone(values)}, with no ulcer or sinus tract next to it.`)
  else if (abnormalBone(values) && ['normal', 'hazy'].includes(str(values, 't1'))) out.push(`Marrow edema in ${bone(values)} without confluent T1 change: osteomyelitis is not established.`)
  else if (abnormalBone(values)) out.push(`Abnormal marrow signal in ${bone(values)}.`)

  if (str(values, 'abscess') === 'present') out.push(`Abscess${str(values, 'abscess-site') ? `: ${str(values, 'abscess-site')}` : ''}.`)
  if (str(values, 'sinus') === 'present') out.push('Sinus tract.')
  if (str(values, 'gas') === 'present') out.push('Soft-tissue gas.')
  if (str(values, 'devitalised') === 'present' && str(values, 'contrast') === 'given') out.push('Non-enhancing (devitalised) tissue, in which osteomyelitis and abscess may not enhance.')
  if (str(values, 'joint') === 'present') out.push(`Effusion in ${str(values, 'joint-site') || 'a joint'} next to the abnormal bone: septic arthritis is possible.`)

  if (charcotPresent(values)) {
    const sites = chosen(values, fields.charcotSites)
    const activity = str(values, 'charcot-activity')
    out.push(`${activity === 'active' ? 'Active n' : activity === 'inactive' ? 'Inactive n' : 'N'}europathic (Charcot) arthropathy${sites.length > 0 ? ` of the ${sites.join(', ')} joints` : ''}.`)
    if (str(values, 'charcot-deformity') === 'collapse') out.push('Collapse of the arch (rocker-bottom deformity).')
    if (str(values, 'ghost') === 'present') out.push('Ghost sign, suggesting infection within the neuropathic bone.')
  }
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No osteomyelitis, abscess or neuroarthropathy.'

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = findings(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    return `Impression: ${lines(limited, str(values, 'ulcer') === 'present' ? 'Ulcer without osteomyelitis or abscess.' : NORMAL_IMPRESSION, ...negatives)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  if (negatives.includes('no-osteomyelitis') && osteomyelitis(values)) out.push('Impression says no osteomyelitis, but confluent low T1 signal next to the ulcer or sinus tract is entered.')
  if (negatives.includes('no-abscess') && str(values, 'abscess') === 'present') out.push('Impression says no abscess, but an abscess is entered.')
  // D2: osteomyelitis spreads from an adjacent ulcer or sinus tract.
  if (confluent(values) && str(values, 'contiguous') === 'yes' && str(values, 'ulcer') === 'none' && str(values, 'sinus') === 'none') {
    out.push('The bone is entered as next to an ulcer or sinus tract, but neither is entered in step 2.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...softTissueLines(values),
    ...boneLines(values),
    ...charcotLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    learn: 'technique',
    teach: <p>T1 without fat suppression decides osteomyelitis. Contrast shows abscesses and dead tissue, in which infected bone may not enhance ({LEDERMANN_NONENHANCING}).</p>,
    fields: [fields.history, fields.protocol, fields.protocolMissing, fields.contrast],
  },
  {
    id: 'soft-tissue',
    title: 'Step 2. Skin and soft tissues',
    learn: 'soft-tissue',
    teach: <p>Osteomyelitis almost always spreads from an ulcer or sinus tract next to the bone, at the pressure points ({LEDERMANN}; {ROSSKOPF}). An abscess is a rim-enhancing collection ({DONOVAN}; {WEAVER}).</p>,
    fields: [fields.ulcer, fields.ulcerSite, fields.sinus, fields.abscess, fields.abscessSite, fields.gas, fields.devitalised],
  },
  {
    id: 'bone',
    title: 'Step 3. Bone: osteomyelitis',
    learn: 'bone',
    teach: <p>Confluent low T1 marrow signal in a medullary distribution correlates highly with osteomyelitis; no case with a hazy reticulated pattern had it ({JOHNSON}). Ulcer, sinus tract, cortical interruption and abscess are secondary signs ({MORRISON}).</p>,
    fields: [fields.marrow, fields.boneSite, fields.t1, fields.contiguous, fields.cortex],
    derive: deriveBone,
  },
  {
    id: 'joints',
    title: 'Step 4. Joints',
    learn: 'joints',
    teach: <p>Septic arthritis often comes with osteomyelitis ({LEDERMANN}).</p>,
    fields: [fields.joint, fields.jointSite],
  },
  {
    id: 'charcot',
    title: 'Step 5. Charcot neuroarthropathy',
    learn: 'charcot',
    teach: <p>Neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal joints ({DONOVAN}). Active disease shows on MRI before radiographs ({CHANTELAU}; {ROSSKOPF}). The ghost sign suggests infection within it ({DONOVAN}; {ROSSKOPF}).</p>,
    fields: [fields.charcot, fields.charcotSites, fields.charcotActivity, fields.charcotDeformity, fields.ghost],
    derive: deriveCharcot,
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    learn: 'impression',
    teach: <p>Name each infected bone, collection and joint at risk, then the neuroarthropathy and whether it is active.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'diabetic-foot-mri',
  name: 'Diabetic foot MRI',
  lede: 'Read the diabetic foot MRI: find the ulcer, decide osteomyelitis on T1, look for collections and septic joints, and tell neuroarthropathy from infection.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref. The papers are paywalled, so the claims their abstracts do not state are checked against open reviews cited beside them. Still unchecked: septic arthritis alongside osteomyelitis, with an effusion as its sign; that a neuropathic bone keeps its outline; and that an inactive Charcot foot shows no edema.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 't1-pattern',
      question: 'Which T1 marrow pattern is the pattern of osteomyelitis?',
      options: ['Hazy reticulated low signal', 'Confluent low signal in a medullary distribution', 'Normal T1 with high signal on fluid-sensitive images', 'Any signal change at all'],
      answer: 1,
      explanation: <p>Confluent decreased T1 marrow signal in a medullary distribution correlates highly with osteomyelitis; no case with a hazy reticulated pattern had it ({JOHNSON}).</p>,
    },
    {
      id: 'spread',
      question: 'How does osteomyelitis usually reach the bone in the diabetic foot?',
      options: ['Through the blood', 'From an ulcer or sinus tract next to the bone', 'From a neuropathic joint', 'Up the tendon sheaths from the toes'],
      answer: 1,
      explanation: <p>It almost always spreads from an adjacent ulcer or sinus tract ({LEDERMANN}).</p>,
    },
    {
      id: 'sites',
      question: 'Where does osteomyelitis usually occur in the diabetic foot?',
      options: ['The midfoot joints', 'The pressure points: toes, metatarsal heads, calcaneus', 'The talar dome', 'The navicular'],
      answer: 1,
      explanation: <p>The usual sites are the pressure points where ulcers form ({LEDERMANN}; {ROSSKOPF}).</p>,
    },
    {
      id: 'charcot-distribution',
      question: 'Which site does neuroarthropathy most commonly affect?',
      options: ['The calcaneus', 'The tarsometatarsal joints', 'The malleoli', 'The talar dome'],
      answer: 1,
      explanation: <p>Neuroarthropathy most commonly affects the tarsometatarsal and metatarsophalangeal joints; osteomyelitis occurs distal to the tarsometatarsal joint, in the calcaneus and in the malleoli ({DONOVAN}).</p>,
    },
    {
      id: 'ghost',
      question: 'In a Charcot foot, a bone outline fades on T1 but reappears on fluid-sensitive images. What does it suggest?',
      options: ['Inactive neuroarthropathy', 'Infection within the neuropathic bone', 'A stress fracture', 'An artefact'],
      answer: 1,
      explanation: <p>The ghost sign suggests infection ({DONOVAN}; {ROSSKOPF}); a neuropathic bone keeps its outline ({DONOVAN}).</p>,
    },
    {
      id: 'stage-0',
      question: 'A hot swollen foot in a patient with neuropathy has normal radiographs. What can MRI show?',
      options: ['Nothing until the radiographs change', 'Active Charcot disease, with marrow edema, before the radiographs change', 'Only soft-tissue swelling', 'Only infection'],
      answer: 1,
      explanation: <p>MRI shows active Charcot disease while the radiographs are still normal ({CHANTELAU}; {ROSSKOPF}).</p>,
    },
    {
      id: 'nonenhancing',
      question: 'After contrast, an area of soft tissue and bone does not enhance. What does the lesson caution?',
      options: ['It excludes infection', 'It is dead tissue, in which osteomyelitis and abscess may not enhance', 'It is always an abscess', 'It is an artefact of the fat suppression'],
      answer: 1,
      explanation: <p>Non-enhancing tissue is devitalised, and infection within it may not enhance, so it does not exclude osteomyelitis or abscess ({LEDERMANN_NONENHANCING}).</p>,
    },
    {
      id: 'secondary',
      question: 'Which of these is a secondary sign of osteomyelitis?',
      options: ['A sinus tract to the bone', 'Fatty marrow on T1', 'A bipartite sesamoid', 'Muscle atrophy'],
      answer: 0,
      explanation: <p>An adjacent ulcer, a sinus tract, cortical interruption and an abscess are secondary signs ({MORRISON}).</p>,
    },
  ],
}

export function DiabeticFootMriStudyPage() {
  return <StudyPage study={study} />
}
