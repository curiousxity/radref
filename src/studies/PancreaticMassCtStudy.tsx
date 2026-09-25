import { Link } from 'react-router-dom'
import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Al-Hawary MM et al. Pancreatic ductal adenocarcinoma radiology reporting template: consensus statement of the Society of Abdominal Radiology and the American Pancreatic Association. Radiology 2014;270:248–260. PMID 24354378.', doi: '10.1148/radiol.13131184' },
  { citation: 'Lu DS et al. Two-phase helical CT for pancreatic tumors. Radiology 1996.', doi: '10.1148/radiology.199.3.8637990' },
  { citation: 'Fletcher JG et al. Pancreatic malignancy: value of arterial, pancreatic, and hepatic phase imaging with multi-detector row CT. Radiology 2003.', doi: '10.1148/radiol.2291020582' },
  { citation: 'Kim JH et al. Visually isoattenuating pancreatic adenocarcinoma at dynamic-enhanced CT. Radiology 2010.', doi: '10.1148/radiol.10100015' },
  { citation: 'Yoon SH et al. Small (≤20 mm) pancreatic adenocarcinomas: analysis of enhancement patterns and secondary signs. Radiology 2011.', doi: '10.1148/radiol.11101133' },
  { citation: 'Prokesch RW et al. Isoattenuating pancreatic adenocarcinoma at multi-detector row CT: secondary signs. Radiology 2002.', doi: '10.1148/radiol.2243011284' },
  { citation: 'Gangi S et al. Time interval between abnormalities seen on CT and the clinical diagnosis of pancreatic cancer. AJR 2004.', doi: '10.2214/ajr.182.4.1820897' },
  { citation: 'Lewis RB et al. Pancreatic endocrine tumors: radiologic-clinicopathologic correlation. RadioGraphics 2010.', doi: '10.1148/rg.306105523' },
  { citation: 'Sahani DV et al. Autoimmune pancreatitis: imaging features. Radiology 2004.', doi: '10.1148/radiol.2332031436' },
  { citation: 'Klein KA et al. CT characteristics of metastatic disease of the pancreas. RadioGraphics 1998.', doi: '10.1148/radiographics.18.2.9536484' },
  { citation: 'Merkle EM et al. Imaging findings in pancreatic lymphoma. AJR 2000.', doi: '10.2214/ajr.174.3.1740671' },
  { citation: 'Lu DS et al. Local staging of pancreatic cancer: criteria for unresectability of major vessels as revealed by pancreatic-phase, thin-section helical CT. AJR 1997.', doi: '10.2214/ajr.168.6.9168704' },
  { citation: 'Zins M et al. Pancreatic adenocarcinoma staging in the era of preoperative chemotherapy and radiation therapy. Radiology 2018.', doi: '10.1148/radiol.2018171670' },
  { citation: 'Katz MH et al. Response of borderline resectable pancreatic cancer to neoadjuvant therapy is not reflected by radiographic indicators. Cancer 2012.', doi: '10.1002/cncr.27636' },
  { citation: 'Ferrone CR et al. Radiological and surgical implications of neoadjuvant treatment with FOLFIRINOX. Ann Surg 2015.', doi: '10.1097/SLA.0000000000000867' },
  { citation: 'Ohtsuka T et al. International evidence-based Kyoto guidelines for the management of intraductal papillary mucinous neoplasm of the pancreas. Pancreatology 2024.', doi: '10.1016/j.pan.2023.12.009' },
  { citation: 'Megibow AJ et al. Management of incidental pancreatic cysts: a white paper of the ACR Incidental Findings Committee. J Am Coll Radiol 2017.', doi: '10.1016/j.jacr.2017.03.010' },
]

const reportTemplate = `1. Tumor: location, size, density, duct status, presence of a biliary stent.
2. Arteries: celiac, SMA, and CHA, each with contact (yes/no), degrees, and
   narrowing. Also variants.
3. Veins: portal vein and SMV, each with contact, degrees, narrowing, and thrombus.
   Also collaterals.
4. Outside the pancreas: liver, peritoneum, nodes, invasion of other organs.

Impression: describe the anatomy, e.g. "tumor contacts SMA ≤180°".`

/* ---------- Options ---------- */

const phaseOptions: Option[] = [
  { value: 'protocol', label: 'Pancreatic protocol' },
  { value: 'single', label: 'Routine single-phase' },
]

const settingOptions: Option[] = [
  { value: 'initial', label: 'Initial staging' },
  { value: 'restage', label: 'After chemotherapy' },
]

const densityOptions: Option[] = [
  { value: 'hypo', label: 'Hypoattenuating' },
  { value: 'iso', label: 'Isoattenuating' },
  { value: 'hyper', label: 'Hyperattenuating' },
]

const ductOptions: Option[] = [
  { value: 'normal', label: 'Not dilated' },
  { value: 'cutoff', label: 'Dilated, abrupt cutoff' },
  { value: 'dilated', label: 'Dilated, no cutoff' },
]

const secondaryOptions: Option[] = [
  { value: 'doubleduct', label: 'Double duct sign (bile duct and pancreatic duct dilated)' },
  { value: 'atrophy', label: 'Upstream atrophy' },
  { value: 'bulge', label: 'Contour bulge or loss of the normal lobulated fat pattern' },
]

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const lesionOptions: Option[] = [
  { value: 'pdac', label: 'PDAC' },
  { value: 'net', label: 'Neuroendocrine tumor' },
  { value: 'aip', label: 'Autoimmune pancreatitis' },
  { value: 'groove', label: 'Groove pancreatitis' },
  { value: 'met', label: 'Metastasis' },
  { value: 'lymphoma', label: 'Lymphoma' },
  { value: 'spt', label: 'Solid pseudopapillary tumor' },
  { value: 'cystic', label: 'Cystic lesion' },
]

const contactOptions: Option[] = [
  { value: 'none', label: 'No contact' },
  { value: 'solid', label: 'Solid tissue' },
  { value: 'hazy', label: 'Hazy stranding' },
]

const degreeOptions: Option[] = [
  { value: 'le180', label: '180° or less' },
  { value: 'gt180', label: 'More than 180°' },
]

const arteryDeformOptions: Option[] = [
  { value: 'narrowing', label: 'Narrowing' },
  { value: 'irregular', label: 'Irregular contour' },
]

const veinDeformOptions: Option[] = [
  { value: 'narrowing', label: 'Narrowing' },
  { value: 'irregular', label: 'Irregular contour' },
  { value: 'thrombus', label: 'Thrombus' },
]

const smvDeformOptions: Option[] = [
  { value: 'narrowing', label: 'Narrowing' },
  { value: 'irregular', label: 'Irregular contour' },
  { value: 'teardrop', label: '"Teardrop" shape' },
  { value: 'thrombus', label: 'Thrombus' },
]

const reconOptions: Option[] = [
  { value: 'yes', label: 'Can be reconstructed' },
  { value: 'no', label: 'Cannot be reconstructed' },
]

const variantOptions: Option[] = [
  { value: 'rrha', label: 'Replaced right hepatic artery from the SMA' },
  { value: 'mal', label: 'Median arcuate ligament or celiac stenosis' },
]

const responseOptions: Option[] = [
  { value: 'stable', label: 'Persists, not grown' },
  { value: 'grown', label: 'Has grown' },
]

const liverOptions: Option[] = [
  { value: 'none', label: 'No lesions' },
  { value: 'indet', label: 'Indeterminate' },
  { value: 'suspicious', label: 'Suspicious for metastasis' },
]

const presentOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]

const peritonealOptions: Option[] = [
  { value: 'nodules', label: 'Peritoneal or omental nodules' },
  { value: 'ascites', label: 'Ascites' },
]

const nodeOptions: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'regional', label: 'Regional only' },
  { value: 'distant', label: 'Distant' },
]

const organOptions: Option[] = [
  { value: 'stomach', label: 'Stomach' },
  { value: 'duodenum', label: 'Duodenum' },
  { value: 'colon', label: 'Colon' },
  { value: 'adrenal', label: 'Adrenal' },
]

/* ---------- Vessel helpers ---------- */

type VesselId = 'ca' | 'sma' | 'cha' | 'pv' | 'smv'
type Vessel = { id: VesselId; name: string; short: string; kind: 'artery' | 'vein'; deform: Option[] }

const arteries: Vessel[] = [
  { id: 'ca', name: 'Celiac axis', short: 'celiac axis', kind: 'artery', deform: arteryDeformOptions },
  { id: 'sma', name: 'SMA', short: 'SMA', kind: 'artery', deform: arteryDeformOptions },
  { id: 'cha', name: 'Common hepatic artery', short: 'common hepatic artery', kind: 'artery', deform: arteryDeformOptions },
]

const veins: Vessel[] = [
  { id: 'pv', name: 'Portal vein', short: 'portal vein', kind: 'vein', deform: veinDeformOptions },
  { id: 'smv', name: 'SMV', short: 'SMV', kind: 'vein', deform: smvDeformOptions },
]

const vessels = [...arteries, ...veins]

function touched(values: Values, id: VesselId) {
  const contact = str(values, `${id}-contact`)
  return contact === 'solid' || contact === 'hazy'
}

function deformed(values: Values, id: VesselId) {
  return touched(values, id) && list(values, `${id}-deform`).length > 0
}

function veinNeedsReconstruction(values: Values, id: VesselId) {
  return touched(values, id) && (str(values, `${id}-degrees`) === 'gt180' || list(values, `${id}-deform`).length > 0)
}

function vesselFields(vessel: Vessel): Field[] {
  const fields: Field[] = [
    {
      id: `${vessel.id}-contact`,
      label: `${vessel.name}: contact`,
      kind: 'choice',
      options: contactOptions,
      required: true,
      help: 'Solid tissue and hazy stranding are different things, so say which one you see.',
    },
    {
      id: `${vessel.id}-degrees`,
      label: `${vessel.name}: circumference`,
      kind: 'choice',
      options: degreeOptions,
      required: true,
      showIf: (v) => touched(v, vessel.id),
    },
    {
      id: `${vessel.id}-deform`,
      label: `${vessel.name}: deformity`,
      kind: 'multi',
      options: vessel.deform,
      showIf: (v) => touched(v, vessel.id),
    },
  ]
  if (vessel.id === 'cha') {
    fields.push({
      id: 'cha-extends',
      label: 'Hepatic artery contact reaches the celiac axis or the bifurcation',
      kind: 'choice',
      options: yesNo,
      showIf: (v) => touched(v, 'cha'),
    })
  }
  if (vessel.kind === 'vein') {
    fields.push({
      id: `${vessel.id}-recon`,
      label: `${vessel.name}: reconstruction`,
      kind: 'choice',
      options: reconOptions,
      showIf: (v) => veinNeedsReconstruction(v, vessel.id),
    })
  }
  return fields
}

function lowerFirst(text: string) {
  // Skips a leading quote, so the '"Teardrop" shape' label reads '"teardrop" shape' mid-sentence.
  return text.replace(/^("?)([A-Z])(?=[a-z])/, (_match, quote: string, first: string) => quote + first.toLowerCase())
}

function listLabels(options: Option[], chosen: string[]) {
  return chosen.map((value) => lowerFirst(optionLabel({ options }, value)))
}

function vesselLine(values: Values, vessel: Vessel): string | false {
  const contact = str(values, `${vessel.id}-contact`)
  if (!contact) return false
  if (contact === 'none') return `   ${vessel.name}: no contact.`
  const parts = [contact === 'solid' ? 'solid tumor contact' : 'hazy stranding contact']
  const degrees = str(values, `${vessel.id}-degrees`)
  if (degrees) parts.push(degrees === 'le180' ? '180° or less' : 'more than 180°')
  if (vessel.id === 'cha') {
    const extends_ = str(values, 'cha-extends')
    if (extends_ === 'yes') parts.push('extending to the celiac axis or the hepatic artery bifurcation')
    if (extends_ === 'no') parts.push('sparing the celiac axis and the bifurcation')
  }
  const deform = listLabels(vessel.deform, list(values, `${vessel.id}-deform`))
  if (deform.length > 0) parts.push(deform.join(', '))
  else if (vessel.kind === 'artery') parts.push('no narrowing')
  else parts.push('no narrowing or thrombus')
  const recon = str(values, `${vessel.id}-recon`)
  if (recon && veinNeedsReconstruction(values, vessel.id)) parts.push(recon === 'yes' ? 'reconstructable' : 'not reconstructable')
  return `   ${vessel.name}: ${parts.join(', ')}.`
}

/* ---------- Rules ---------- */

/**
 * The lesson's simplified NCCN categories, applied to solid tissue contact. Shown as a
 * teaching chip only: the lesson says not to write "unresectable" in the report.
 */
function nccnCategory(values: Values): Derived[] {
  const allStated = vessels.every((vessel) => str(values, `${vessel.id}-contact`))
  if (!allStated) return []
  const solid = (id: VesselId) => str(values, `${id}-contact`) === 'solid'
  const deg = (id: VesselId) => str(values, `${id}-degrees`)
  const out: Derived[] = []

  const la: string[] = []
  const br: string[] = []
  const unclassified: string[] = []

  for (const id of ['sma', 'ca'] as const) {
    if (!solid(id)) continue
    const name = id === 'sma' ? 'SMA' : 'celiac'
    if (deg(id) === 'gt180') la.push(`${name} contact over 180°`)
    else if (deg(id) === 'le180') br.push(`${name} contact of 180° or less`)
    else unclassified.push(`${name} contact degrees not stated`)
  }
  if (solid('cha')) {
    const extends_ = str(values, 'cha-extends')
    if (extends_ === 'no') br.push('hepatic artery contact sparing the celiac axis and the bifurcation')
    else if (extends_ === 'yes') unclassified.push('hepatic artery contact reaching the celiac axis or bifurcation is not covered by the simplified categories')
    else unclassified.push('state whether the hepatic artery contact spares the celiac axis and the bifurcation')
  }
  for (const vein of veins) {
    if (!solid(vein.id)) continue
    const recon = str(values, `${vein.id}-recon`)
    if (recon === 'no' && veinNeedsReconstruction(values, vein.id)) la.push(`${vein.name} cannot be reconstructed`)
    else if (deg(vein.id) === 'gt180') br.push(`${vein.name} contact over 180°`)
    else if (deformed(values, vein.id)) {
      if (recon === 'yes') br.push(`deformed ${vein.short} that can still be reconstructed`)
      else unclassified.push(`state whether the deformed ${vein.short} can be reconstructed`)
    } else if (!deg(vein.id)) unclassified.push(`${vein.name} contact degrees not stated`)
  }
  for (const vessel of vessels) {
    if (str(values, `${vessel.id}-contact`) === 'hazy') unclassified.push(`hazy stranding at the ${vessel.short} is not covered by the simplified categories`)
  }

  let category: Derived
  if (la.length > 0) category = { label: 'NCCN (simplified)', value: `Locally advanced: ${la.join('; ')}`, tone: 'warn' }
  else if (unclassified.length > 0) category = { label: 'NCCN (simplified)', value: `Not classified: ${unclassified.join('; ')}`, tone: 'neutral' }
  else if (br.length > 0) category = { label: 'NCCN (simplified)', value: `Borderline: ${br.join('; ')}`, tone: 'warn' }
  else category = { label: 'NCCN (simplified)', value: 'Resectable: no arterial contact, vein contact 180° or less with a normal contour', tone: 'good' }
  out.push(category)

  out.push({ label: 'In the report', value: 'Describe the anatomy; do not write "unresectable" (the tumor board decides)', tone: 'neutral' })
  return out
}

/* ---------- Report ---------- */

function tumorBlock(values: Values): string | false {
  const location = str(values, 'location')
  const size = num(values, 'size')
  const density = str(values, 'density')
  const duct = str(values, 'duct')
  const secondary = listLabels(secondaryOptions, list(values, 'secondary'))
  const stent = str(values, 'stent')
  const parts: string[] = []
  if (location) parts.push(location)
  if (size !== undefined) parts.push(`${size} mm`)
  if (density) parts.push(optionLabel({ options: densityOptions }, density).toLowerCase())
  if (duct === 'normal') parts.push('pancreatic duct not dilated')
  if (duct === 'cutoff') parts.push('pancreatic duct dilated with abrupt cutoff')
  if (duct === 'dilated') parts.push('pancreatic duct dilated without a cutoff')
  if (secondary.length > 0) parts.push(secondary.join(', '))
  if (stent === 'yes') parts.push('biliary stent present')
  if (stent === 'no') parts.push('no biliary stent')
  if (parts.length === 0) return false
  return `1. Tumor: ${parts.join(', ')}.`
}

function arteryBlock(values: Values): string | false {
  const variants = listLabels(variantOptions, list(values, 'variants'))
  const other = str(values, 'variant-other')
  const variantText = [...variants, ...(other ? [other] : [])]
  const body = lines(
    ...arteries.map((vessel) => vesselLine(values, vessel)),
    variantText.length > 0 && `   Variants: ${variantText.join('; ')}.`,
    str(values, 'variant-none') === 'yes' && variantText.length === 0 && '   Variants: none.',
  )
  return body ? `2. Arteries:\n${body}` : false
}

function veinBlock(values: Values): string | false {
  const collaterals = str(values, 'collaterals')
  const body = lines(
    ...veins.map((vessel) => vesselLine(values, vessel)),
    collaterals === 'yes' && '   Collaterals: present.',
    collaterals === 'no' && '   Collaterals: none.',
  )
  return body ? `3. Veins:\n${body}` : false
}

function outsideBlock(values: Values): string | false {
  const liver = str(values, 'liver')
  const liverDetail = str(values, 'liver-detail')
  const peritoneum = str(values, 'peritoneum')
  const peritonealFindings = listLabels(peritonealOptions, list(values, 'peritoneal-findings'))
  const nodes = str(values, 'nodes')
  const nodeGroup = str(values, 'node-group')
  const organs = str(values, 'organs')
  const organList = listLabels(organOptions, list(values, 'organ-list'))
  const withDetail = (text: string, detail: string) => (detail ? `${text} (${detail})` : text)

  const body = lines(
    liver === 'none' && '   Liver: no lesions.',
    liver === 'indet' && `   Liver: ${withDetail('lesion(s) too small to characterize, indeterminate', liverDetail)}.`,
    liver === 'suspicious' && `   Liver: ${withDetail('lesion(s) suspicious for metastasis', liverDetail)}.`,
    peritoneum === 'none' && '   Peritoneum: no nodules or ascites.',
    peritoneum === 'present' && `   Peritoneum: ${peritonealFindings.length > 0 ? peritonealFindings.join(', ') : 'abnormal'}.`,
    nodes === 'none' && '   Nodes: none.',
    nodes === 'regional' && `   Nodes: ${withDetail('regional nodes', nodeGroup)}.`,
    nodes === 'distant' && `   Nodes: ${withDetail('distant nodes', nodeGroup)}.`,
    organs === 'none' && '   Other organs: no invasion.',
    organs === 'present' && `   Other organs: invasion of ${organList.length > 0 ? organList.join(', ') : 'adjacent organ'}.`,
  )
  return body ? `4. Outside the pancreas:\n${body}` : false
}

function impression(values: Values): string[] {
  const out: string[] = []
  const location = str(values, 'location')
  const size = num(values, 'size')
  const density = str(values, 'density')
  const lesion = str(values, 'lesion')
  if (location || size !== undefined || density) {
    const desc = [
      density && optionLabel({ options: densityOptions }, density).toLowerCase(),
      'pancreatic mass',
      location && `in the ${location}`,
      size !== undefined && `measuring ${size} mm`,
    ].filter(Boolean).join(' ')
    const favoured = lesion ? `, appearance favoring ${optionLabel({ options: lesionOptions }, lesion).replace('PDAC', 'pancreatic ductal adenocarcinoma').toLowerCase()}` : ''
    out.push(`${desc.charAt(0).toUpperCase()}${desc.slice(1)}${favoured}.`)
  }
  if (str(values, 'duct') === 'cutoff') out.push('Pancreatic duct cutoff.')

  const contacted: string[] = []
  const clear: string[] = []
  for (const vessel of vessels) {
    const contact = str(values, `${vessel.id}-contact`)
    if (contact === 'none') clear.push(vessel.short)
    if (contact === 'solid' || contact === 'hazy') {
      const deg = str(values, `${vessel.id}-degrees`)
      const deform = listLabels(vessel.deform, list(values, `${vessel.id}-deform`))
      const bits = [
        `${contact === 'solid' ? 'Tumor contacts' : 'Hazy stranding contacts'} the ${vessel.short}`,
        deg === 'le180' ? ' ≤180°' : deg === 'gt180' ? ' >180°' : '',
        deform.length > 0 ? ` with ${deform.join(', ')}` : '',
      ]
      contacted.push(`${bits.join('')}.`)
    }
  }
  out.push(...contacted)
  if (clear.length > 0) out.push(`No contact with the ${clear.join(', ')}.`)
  if (list(values, 'variants').includes('rrha')) out.push('Replaced right hepatic artery arising from the SMA.')

  if (str(values, 'setting') === 'restage') {
    const response = str(values, 'response')
    if (response === 'stable') out.push('Perivascular soft tissue persists but has not grown: stable.')
    if (response === 'grown') out.push('Perivascular soft tissue has grown.')
  }

  const liver = str(values, 'liver')
  if (liver === 'indet') out.push('Indeterminate liver lesion(s), too small to characterize.')
  if (liver === 'suspicious') out.push('Liver lesion(s) suspicious for metastasis.')
  if (str(values, 'peritoneum') === 'present') out.push('Peritoneal disease.')
  if (str(values, 'nodes') === 'distant') {
    const group = str(values, 'node-group')
    out.push(`Distant nodes${group ? ` (${group})` : ''}.`)
  }
  if (str(values, 'organs') === 'present') {
    const organs = listLabels(organOptions, list(values, 'organ-list'))
    out.push(`Invasion of ${organs.length > 0 ? organs.join(', ') : 'adjacent organ'}.`)
  }
  if (str(values, 'phases') === 'single') out.push('Routine single-phase study limits staging.')
  return out
}

function build(values: Values) {
  const warnings: string[] = []
  const lesion = str(values, 'lesion')
  const duct = str(values, 'duct')
  const secondary = list(values, 'secondary')
  const anyNarrowing = vessels.some((vessel) => touched(values, vessel.id) && list(values, `${vessel.id}-deform`).includes('narrowing'))

  if (lesion === 'aip' && duct === 'cutoff') {
    warnings.push('Autoimmune pancreatitis is marked, but the duct is cut off. In autoimmune pancreatitis the duct passes through the mass without blocking; a duct cutoff is cancer until proven otherwise.')
  }
  if (duct === 'normal' && secondary.includes('doubleduct')) {
    warnings.push('Double duct sign is marked, but the pancreatic duct is recorded as not dilated. The double duct sign means both the bile duct and the pancreatic duct are dilated.')
  }
  if (lesion === 'lymphoma' && (duct === 'cutoff' || duct === 'dilated' || secondary.includes('doubleduct'))) {
    warnings.push('Lymphoma is marked, but duct dilatation is recorded. Lymphoma typically has no duct dilatation.')
  }
  if (lesion === 'lymphoma' && anyNarrowing) {
    warnings.push('Lymphoma is marked, but a vessel is narrowed. Lymphoma wraps around vessels without narrowing them.')
  }
  if (lesion === 'cystic') {
    warnings.push('Cystic lesion: follow Kyoto 2024 and the ACR white paper.')
  }

  const impressionLines = impression(values)
  const text = lines(
    str(values, 'phases') === 'single' && 'Technique: routine single-phase study, which limits staging.',
    tumorBlock(values),
    arteryBlock(values),
    veinBlock(values),
    outsideBlock(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impressionLines.length > 0 && `\nImpression:\n${impressionLines.join('\n')}`,
  )
  return { text, warnings }
}

/* ---------- Study ---------- */

const study: StudyDefinition = {
  slug: 'pancreatic-mass-ct',
  name: 'Pancreatic mass protocol CT',
  lede: 'A working method for staging pancreatic ductal adenocarcinoma: finding the mass, naming it, staging the five vessels, and writing the SAR/APA report.',
  sourceNote: 'Citations checked against PubMed in September 2026.',
  references,
  report: {
    build,
    steps: [
      {
        id: 'scan',
        title: 'Step 1. Check the scan is good enough',
        learn: 'scan',
        teach: (
          <>
            <p>The pancreatic (late arterial) phase, about 40 to 50 seconds, is when the normal pancreas is at its brightest, so a dark tumor stands out; it is also the best phase for the arteries (<Cite doi="10.1148/radiology.199.3.8637990">Lu, Radiology 1996</Cite>; <Cite doi="10.1148/radiol.2291020582">Fletcher, Radiology 2003</Cite>). The portal venous phase, about 65 to 70 seconds, is best for the veins, the liver, and the peritoneum.</p>
            <p>You also need thin slices (1 mm or less) with coronal and sagittal reformats, and water as oral contrast. If the scan is a routine single-phase study, say in the report that it limits staging.</p>
          </>
        ),
        fields: [
          { id: 'phases', label: 'Protocol', kind: 'choice', options: phaseOptions, help: 'Pancreatic phase about 40-50 s plus portal venous phase about 65-70 s.' },
          { id: 'setting', label: 'Setting', kind: 'choice', options: settingOptions },
        ],
        derive: (values) => {
          const out: Derived[] = []
          if (str(values, 'phases') === 'single') out.push({ label: 'Technique', value: 'Single-phase: state that it limits staging', tone: 'warn' })
          if (str(values, 'setting') === 'restage') out.push({ label: 'Restaging', value: 'CT tends to understage the response to chemotherapy', tone: 'neutral' })
          return out
        },
      },
      {
        id: 'find',
        title: "Step 2. Find the mass, even when you can't see it",
        learn: 'find',
        teach: (
          <>
            <p>Classic PDAC is a dark, poorly defined mass on the pancreatic phase. However, about 5 to 10% of tumors are the same density as the pancreas, and the figure is closer to a quarter for tumors under 2 cm (<Cite doi="10.1148/radiol.10100015">Kim JH, Radiology 2010</Cite>; <Cite doi="10.1148/radiol.11101133">Yoon SH, Radiology 2011</Cite>). In those cases you rely on secondary signs (<Cite doi="10.1148/radiol.2243011284">Prokesch, Radiology 2002</Cite>): duct cutoff, double duct sign, upstream atrophy, and contour bulge.</p>
            <p>A dilated duct that stops abruptly should be treated as cancer until proven otherwise.</p>
          </>
        ),
        fields: [
          { id: 'location', label: 'Location', kind: 'text', placeholder: 'e.g. pancreatic head', required: true },
          { id: 'size', label: 'Size', kind: 'number', unit: 'mm', min: 0, required: true },
          { id: 'density', label: 'Density on the pancreatic phase', kind: 'choice', options: densityOptions, required: true },
          { id: 'duct', label: 'Pancreatic duct', kind: 'choice', options: ductOptions, required: true },
          { id: 'secondary', label: 'Other secondary signs', kind: 'multi', options: secondaryOptions },
          { id: 'stent', label: 'Biliary stent', kind: 'choice', options: yesNo, required: true },
        ],
        derive: (values) => {
          const out: Derived[] = []
          if (str(values, 'duct') === 'cutoff') out.push({ label: 'Duct cutoff', value: 'Cancer until proven otherwise', tone: 'warn' })
          if (str(values, 'density') === 'iso') out.push({ label: 'Isoattenuating', value: 'Rely on secondary signs', tone: 'neutral' })
          return out
        },
      },
      {
        id: 'what',
        title: 'Step 3. Decide what the mass is',
        learn: 'what',
        teach: (
          <ul className="plain-list">
            <li><strong>PDAC:</strong> dark, ill-defined, blocks ducts, narrows vessels.</li>
            <li><strong>Neuroendocrine tumor:</strong> bright on arterial phase, well-defined, rarely blocks the duct (<Cite doi="10.1148/rg.306105523">Lewis, RadioGraphics 2010</Cite>).</li>
            <li><strong>Autoimmune pancreatitis:</strong> sausage-shaped gland, dark rim ("halo"), duct passes <em>through</em> the mass without blocking (<Cite doi="10.1148/radiol.2332031436">Sahani, Radiology 2004</Cite>).</li>
            <li><strong>Groove pancreatitis:</strong> sheet-like tissue between the duodenum and the head, with cysts in the duodenal wall.</li>
            <li><strong>Metastasis:</strong> renal cell is the classic one, bright like a neuroendocrine tumor, and it can appear years later (<Cite doi="10.1148/radiographics.18.2.9536484">Klein, RadioGraphics 1998</Cite>).</li>
            <li><strong>Lymphoma:</strong> large mass that wraps around vessels <em>without</em> narrowing them, with no duct dilatation (<Cite doi="10.2214/ajr.174.3.1740671">Merkle, AJR 2000</Cite>).</li>
            <li><strong>Solid pseudopapillary tumor:</strong> young woman, large encapsulated mass, internal hemorrhage.</li>
            <li><strong>Cystic lesions:</strong> follow Kyoto 2024 and the ACR white paper; see the <Link to="/studies/pancreatic-cysts">pancreatic cyst study</Link>.</li>
          </ul>
        ),
        fields: [
          { id: 'lesion', label: 'Favored diagnosis', kind: 'choice', options: lesionOptions },
        ],
        derive: (values) => {
          const lesion = str(values, 'lesion')
          if (lesion === 'cystic') return [{ label: 'Cystic lesion', value: 'Follow Kyoto 2024 and the ACR white paper', tone: 'neutral' }]
          return []
        },
      },
      {
        id: 'vessels',
        title: 'Step 4. Stage the vessels',
        learn: 'vessels',
        teach: (
          <>
            <p>Check five vessels on every case: <strong>celiac axis, SMA, common hepatic artery, SMV, portal vein.</strong> For each one: does the tumor touch it (solid tissue or hazy stranding), how much of the circumference (180° or less versus more than 180°), and is it deformed (narrowing, irregular contour, "teardrop" SMV, thrombus)? <Cite doi="10.2214/ajr.168.6.9168704">Lu (AJR 1997)</Cite> showed that contact over 180° strongly predicts unresectability.</p>
            <p>The NCCN categories, simplified. <strong>Resectable:</strong> no arterial contact; vein contact of 180° or less with a normal contour. <strong>Borderline:</strong> SMA or celiac contact of 180° or less; hepatic artery contact that spares the celiac axis and the bifurcation; vein contact over 180°, or a deformed vein that can still be reconstructed. <strong>Locally advanced:</strong> SMA or celiac contact over 180°, or a vein that cannot be reconstructed.</p>
            <p>Also report arterial variants, especially a replaced right hepatic artery arising from the SMA, and median arcuate ligament or celiac stenosis. After chemotherapy, if the soft tissue around a vessel persists but has not grown, call it stable and do not call it unresectable (<Cite doi="10.1002/cncr.27636">Katz, Cancer 2012</Cite>; <Cite doi="10.1097/SLA.0000000000000867">Ferrone, Ann Surg 2015</Cite>).</p>
          </>
        ),
        fields: [
          ...arteries.flatMap(vesselFields),
          { id: 'variants', label: 'Arterial variants', kind: 'multi', options: variantOptions },
          { id: 'variant-other', label: 'Other variant', kind: 'text', placeholder: 'e.g. replaced common hepatic artery' },
          { id: 'variant-none', label: 'No arterial variants', kind: 'choice', options: yesNo, showIf: (v) => list(v, 'variants').length === 0 && !str(v, 'variant-other') },
          ...veins.flatMap(vesselFields),
          { id: 'collaterals', label: 'Venous collaterals', kind: 'choice', options: yesNo },
          { id: 'response', label: 'Perivascular soft tissue since the prior CT', kind: 'choice', options: responseOptions, showIf: (v) => str(v, 'setting') === 'restage' },
        ],
        derive: (values) => {
          const out = nccnCategory(values)
          if (list(values, 'variants').includes('rrha')) out.push({ label: 'Replaced RHA', value: 'Runs right behind the pancreatic head', tone: 'warn' })
          if (str(values, 'setting') === 'restage' && str(values, 'response') === 'stable') {
            out.push({ label: 'After chemotherapy', value: 'Call it stable, not unresectable', tone: 'good' })
          }
          return out
        },
      },
      {
        id: 'outside',
        title: 'Step 5. Look for disease outside the pancreas',
        learn: 'outside',
        teach: (
          <ul className="plain-list">
            <li><strong>Liver.</strong> Small dark lesions. Anything too small to characterize should be called "indeterminate" so it triggers an MRI.</li>
            <li><strong>Peritoneum and omentum.</strong> Nodules and ascites.</li>
            <li><strong>Nodes.</strong> Regional nodes do not change resectability. Distant nodes (para-aortic, for example) do, so say which group you are describing.</li>
            <li><strong>Nearby organs.</strong> Stomach, duodenum, colon, adrenal.</li>
          </ul>
        ),
        fields: [
          { id: 'liver', label: 'Liver', kind: 'choice', options: liverOptions, required: true },
          { id: 'liver-detail', label: 'Liver lesion detail', kind: 'text', placeholder: 'number, size, segment', showIf: (v) => str(v, 'liver') === 'indet' || str(v, 'liver') === 'suspicious' },
          { id: 'peritoneum', label: 'Peritoneum and omentum', kind: 'choice', options: presentOptions, required: true },
          { id: 'peritoneal-findings', label: 'Peritoneal findings', kind: 'multi', options: peritonealOptions, showIf: (v) => str(v, 'peritoneum') === 'present' },
          { id: 'nodes', label: 'Nodes', kind: 'choice', options: nodeOptions, required: true },
          { id: 'node-group', label: 'Node group', kind: 'text', placeholder: 'e.g. para-aortic', required: true, showIf: (v) => str(v, 'nodes') === 'regional' || str(v, 'nodes') === 'distant' },
          { id: 'organs', label: 'Invasion of nearby organs', kind: 'choice', options: presentOptions, required: true },
          { id: 'organ-list', label: 'Organs invaded', kind: 'multi', options: organOptions, showIf: (v) => str(v, 'organs') === 'present' },
        ],
        derive: (values) => {
          const out: Derived[] = []
          if (str(values, 'liver') === 'indet') out.push({ label: 'Liver', value: 'Indeterminate, so it triggers an MRI', tone: 'warn' })
          const nodes = str(values, 'nodes')
          if (nodes === 'regional') out.push({ label: 'Regional nodes', value: 'Do not change resectability', tone: 'neutral' })
          if (nodes === 'distant') out.push({ label: 'Distant nodes', value: 'Change resectability; name the group', tone: 'warn' })
          return out
        },
      },
      {
        id: 'write',
        title: 'Step 6. Write the report',
        learn: 'write',
        teach: (
          <p>Use the SAR/APA consensus template (<Cite doi="10.1148/radiol.13131184">Al-Hawary, Radiology 2014</Cite>). It has four blocks: tumor, arteries, veins, and outside the pancreas. In the impression, describe the anatomy, e.g. "tumor contacts SMA ≤180°". The authors advise against writing "unresectable", because that decision belongs to the tumor board.</p>
        ),
        fields: [
          { id: 'other', label: 'Other findings', kind: 'text', multiline: true },
        ],
      },
    ],
  },
  learn: [
    {
      id: 'overview',
      title: 'Overview',
      body: <p>This lesson is mostly about pancreatic ductal adenocarcinoma (PDAC), because staging that tumor is what the protocol was built for.</p>,
    },
    {
      id: 'scan',
      title: 'Step 1. Check the scan is good enough',
      body: (
        <div className="lesson-step">
          <p>The protocol has two phases, and each one has a job.</p>
          <ul className="plain-list">
            <li><strong>Pancreatic (late arterial) phase, about 40 to 50 seconds.</strong> The normal pancreas is at its brightest, so a dark tumor stands out. It is also the best phase for the arteries. (<Cite doi="10.1148/radiology.199.3.8637990">Lu, Radiology 1996</Cite>; <Cite doi="10.1148/radiol.2291020582">Fletcher, Radiology 2003</Cite>)</li>
            <li><strong>Portal venous phase, about 65 to 70 seconds.</strong> Best for the veins (SMV, portal vein), the liver, and the peritoneum.</li>
          </ul>
          <p>You also need thin slices (1 mm or less) with coronal and sagittal reformats, and water as oral contrast rather than positive contrast. If the scan is a routine single-phase study, say in the report that it limits staging.</p>
        </div>
      ),
    },
    {
      id: 'find',
      title: "Step 2. Find the mass, even when you can't see it",
      body: (
        <div className="lesson-step">
          <p>Classic PDAC is a dark, poorly defined mass on the pancreatic phase. However, about 5 to 10% of tumors are the same density as the pancreas, and the figure is closer to a quarter for tumors under 2 cm (<Cite doi="10.1148/radiol.10100015">Kim JH, Radiology 2010</Cite>; <Cite doi="10.1148/radiol.11101133">Yoon SH, Radiology 2011</Cite>). In those cases you rely on secondary signs (<Cite doi="10.1148/radiol.2243011284">Prokesch, Radiology 2002</Cite>):</p>
          <ul className="plain-list">
            <li><strong>Duct cutoff.</strong> The pancreatic duct is dilated and then stops abruptly. Treat this as cancer until proven otherwise.</li>
            <li><strong>Double duct sign.</strong> Both the bile duct and the pancreatic duct are dilated.</li>
            <li><strong>Upstream atrophy.</strong> The gland behind the blockage is thin.</li>
            <li><strong>Contour bulge</strong>, or loss of the normal lobulated fat pattern.</li>
          </ul>
          <p>These subtle signs matter in practice. <Cite doi="10.2214/ajr.182.4.1820897">Gangi (AJR 2004)</Cite> reviewed CTs done before diagnosis and found that tumors were visible, in retrospect, up to 18 months earlier.</p>
        </div>
      ),
    },
    {
      id: 'what',
      title: 'Step 3. Decide what the mass is',
      body: (
        <div className="lesson-step">
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Lesion</th><th>Key clue</th></tr></thead>
              <tbody>
                <tr><td><strong>PDAC</strong></td><td>Dark, ill-defined, blocks ducts, narrows vessels</td></tr>
                <tr><td><strong>Neuroendocrine tumor</strong></td><td>Bright on arterial phase, well-defined, rarely blocks the duct (<Cite doi="10.1148/rg.306105523">Lewis, RadioGraphics 2010</Cite>)</td></tr>
                <tr><td><strong>Autoimmune pancreatitis</strong></td><td>Sausage-shaped gland, dark rim ("halo"), duct passes <em>through</em> the mass without blocking (<Cite doi="10.1148/radiol.2332031436">Sahani, Radiology 2004</Cite>)</td></tr>
                <tr><td><strong>Groove pancreatitis</strong></td><td>Sheet-like tissue between the duodenum and the head, with cysts in the duodenal wall</td></tr>
                <tr><td><strong>Metastasis</strong></td><td>Renal cell is the classic one: bright like a neuroendocrine tumor, and it can appear years later (<Cite doi="10.1148/radiographics.18.2.9536484">Klein, RadioGraphics 1998</Cite>)</td></tr>
                <tr><td><strong>Lymphoma</strong></td><td>Large mass that wraps around vessels <em>without</em> narrowing them, with no duct dilatation (<Cite doi="10.2214/ajr.174.3.1740671">Merkle, AJR 2000</Cite>)</td></tr>
                <tr><td><strong>Solid pseudopapillary tumor</strong></td><td>Young woman, large encapsulated mass, internal hemorrhage</td></tr>
                <tr><td><strong>Cystic lesions</strong></td><td>IPMN, mucinous cystic neoplasm, serous cystadenoma. Follow Kyoto 2024 and the ACR white paper; see the <Link to="/studies/pancreatic-cysts">pancreatic cyst lesson</Link></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'vessels',
      title: 'Step 4. Stage the vessels',
      body: (
        <div className="lesson-step">
          <p>The surgeon mainly wants to know whether they can get the tumor out with clean margins, and the vessels decide that. Check five vessels on every case: <strong>celiac axis, SMA, common hepatic artery, SMV, portal vein.</strong> For each one, answer three questions.</p>
          <ol className="plain-list">
            <li><strong>Does the tumor touch the vessel?</strong> Solid tissue and hazy stranding are different things, so say which one you see.</li>
            <li><strong>How much of the circumference does it touch?</strong> Report 180° or less versus more than 180°. <Cite doi="10.2214/ajr.168.6.9168704">Lu (AJR 1997)</Cite> showed that contact over 180° strongly predicts unresectability.</li>
            <li><strong>Is the vessel deformed?</strong> Look for narrowing, an irregular contour, a "teardrop" shaped SMV, or thrombus.</li>
          </ol>
          <div className="lesson-key">
            <p><strong>The NCCN categories, simplified:</strong></p>
            <ul className="plain-list">
              <li><strong>Resectable.</strong> No arterial contact. Vein contact of 180° or less with a normal contour.</li>
              <li><strong>Borderline.</strong> SMA or celiac contact of 180° or less. Hepatic artery contact that spares the celiac axis and the bifurcation. Vein contact over 180°, or a deformed vein that can still be reconstructed.</li>
              <li><strong>Locally advanced.</strong> SMA or celiac contact over 180°, or a vein that cannot be reconstructed.</li>
            </ul>
          </div>
          <p>Also report <strong>arterial variants</strong>, especially a replaced right hepatic artery arising from the SMA, because it runs right behind the pancreatic head. Report median arcuate ligament or celiac stenosis as well. (Zins, Radiology 2018 is a good review of all of this.)</p>
        </div>
      ),
    },
    {
      id: 'outside',
      title: 'Step 5. Look for disease outside the pancreas',
      body: (
        <div className="lesson-step">
          <ul className="plain-list">
            <li><strong>Liver.</strong> Small dark lesions. Anything too small to characterize should be called "indeterminate" so it triggers an MRI.</li>
            <li><strong>Peritoneum and omentum.</strong> Nodules and ascites.</li>
            <li><strong>Nodes.</strong> Regional nodes do not change resectability. Distant nodes (para-aortic, for example) do, so say which group you are describing.</li>
            <li><strong>Nearby organs.</strong> Stomach, duodenum, colon, adrenal.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'write',
      title: 'Step 6. Write the report',
      body: (
        <div className="lesson-step">
          <p>Use the SAR/APA consensus template (Al-Hawary, Radiology 2014; PMID 24354378). It has four blocks.</p>
          <CopyBlock label="Report template" text={reportTemplate} />
          <p>The authors advise against writing "unresectable", because that decision belongs to the tumor board.</p>
        </div>
      ),
    },
    {
      id: 'restaging',
      title: 'Restaging after chemotherapy',
      body: <p>CT tends to understage the response to chemotherapy. In <Cite doi="10.1002/cncr.27636">Katz (Cancer 2012)</Cite>, fewer than 1% of borderline patients looked downstaged on CT after treatment, yet about two-thirds went on to resection, nearly all with clean margins. <Cite doi="10.1097/SLA.0000000000000867">Ferrone (Ann Surg 2015)</Cite> found the same after FOLFIRINOX. So if the soft tissue around a vessel persists but has not grown, call it stable and do not call it unresectable.</p>,
    },
  ],
  quiz: [
    {
      id: 'phase',
      question: 'Which phase makes a dark pancreatic tumor stand out most, and is also best for the arteries?',
      options: ['Portal venous phase, about 65 to 70 seconds', 'Delayed phase, about 3 minutes', 'Pancreatic (late arterial) phase, about 40 to 50 seconds', 'Unenhanced phase'],
      answer: 2,
      explanation: <p>In the pancreatic phase the normal pancreas is at its brightest, so a dark tumor stands out; it is also the best phase for the arteries. The portal venous phase is best for the veins, liver and peritoneum (<Cite doi="10.1148/radiology.199.3.8637990">Lu, Radiology 1996</Cite>; <Cite doi="10.1148/radiol.2291020582">Fletcher, Radiology 2003</Cite>).</p>,
    },
    {
      id: 'iso',
      question: 'Roughly what fraction of pancreatic adenocarcinomas under 2 cm are the same density as the pancreas?',
      options: ['Almost none', 'Closer to a quarter', 'About half', 'Most of them'],
      answer: 1,
      explanation: <p>About 5 to 10% of tumors overall are isoattenuating, and the figure is closer to a quarter for tumors under 2 cm, so you rely on secondary signs such as duct cutoff, double duct, upstream atrophy and contour bulge (<Cite doi="10.1148/radiol.10100015">Kim JH, Radiology 2010</Cite>; <Cite doi="10.1148/radiol.11101133">Yoon SH, Radiology 2011</Cite>).</p>,
    },
    {
      id: 'aip',
      question: 'A sausage-shaped gland with a dark rim, and the pancreatic duct running through the mass without being blocked. What does this suggest?',
      options: ['PDAC', 'Neuroendocrine tumor', 'Groove pancreatitis', 'Autoimmune pancreatitis'],
      answer: 3,
      explanation: <p>Autoimmune pancreatitis gives a sausage-shaped gland, a dark rim ("halo"), and a duct that passes through the mass without blocking (<Cite doi="10.1148/radiol.2332031436">Sahani, Radiology 2004</Cite>). A duct that is dilated and stops abruptly is treated as cancer until proven otherwise.</p>,
    },
    {
      id: 'lymphoma',
      question: 'A large pancreatic mass wraps around the vessels without narrowing them, and the duct is not dilated. Which lesion fits best?',
      options: ['Lymphoma', 'PDAC', 'Solid pseudopapillary tumor', 'Renal cell metastasis'],
      answer: 0,
      explanation: <p>Lymphoma is a large mass that wraps around vessels without narrowing them, with no duct dilatation (<Cite doi="10.2214/ajr.174.3.1740671">Merkle, AJR 2000</Cite>). PDAC, by contrast, blocks ducts and narrows vessels.</p>,
    },
    {
      id: 'sma',
      question: 'Solid tumor contacts 180° or less of the SMA circumference; the other arteries and the veins are clear. Which simplified NCCN category is this?',
      options: ['Resectable', 'Locally advanced', 'Borderline', 'It depends only on the nodes'],
      answer: 2,
      explanation: <p>SMA or celiac contact of 180° or less is borderline; over 180° is locally advanced. <Cite doi="10.2214/ajr.168.6.9168704">Lu (AJR 1997)</Cite> showed that contact over 180° strongly predicts unresectability.</p>,
    },
    {
      id: 'nodes',
      question: 'Which nodal finding changes resectability?',
      options: ['Any enlarged regional node', 'Distant nodes, such as para-aortic', 'Nodes along the SMV', 'None; nodes never matter'],
      answer: 1,
      explanation: <p>Regional nodes do not change resectability. Distant nodes (para-aortic, for example) do, so say which group you are describing.</p>,
    },
    {
      id: 'restage',
      question: 'After FOLFIRINOX, soft tissue around the SMA persists but has not grown. How should you describe it?',
      options: ['Unresectable', 'Progression', 'Downstaged to resectable', 'Stable, and do not call it unresectable'],
      answer: 3,
      explanation: <p>CT tends to understage the response to chemotherapy. In <Cite doi="10.1002/cncr.27636">Katz (Cancer 2012)</Cite>, fewer than 1% of borderline patients looked downstaged on CT, yet about two-thirds went on to resection; <Cite doi="10.1097/SLA.0000000000000867">Ferrone (Ann Surg 2015)</Cite> found the same after FOLFIRINOX. So call persistent, non-growing tissue stable.</p>,
    },
    {
      id: 'unresectable',
      question: 'Why does the SAR/APA template advise against writing "unresectable" in the report?',
      options: ['That decision belongs to the tumor board', 'CT cannot see the arteries', 'It is only allowed after MRI', 'The NCCN categories no longer exist'],
      answer: 0,
      explanation: <p>The authors advise against writing "unresectable", because that decision belongs to the tumor board. The impression should describe the anatomy, e.g. "tumor contacts SMA ≤180°" (<Cite doi="10.1148/radiol.13131184">Al-Hawary, Radiology 2014</Cite>).</p>,
    },
  ],
}

export function PancreaticMassCtStudyPage() {
  return <StudyPage study={study} />
}
