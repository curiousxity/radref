import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-25), but
 * several papers have no abstract or are paywalled, so only claims whose wording is in an
 * abstract are verified. The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-25-suprahyoid-neck-sources.md (N claims). Rule chips and
 * warnings carry their claim IDs.
 */

const HARNSBERGER_DOI = '10.2214/ajr.157.1.2048510'
const SHIN_DOI = '10.2214/ajr.177.6.1771465'
const RAO_DOI = '10.1148/radiographics.19.6.g99no251605'
const OLSEN_DOI = '10.2214/ajr.148.1.201'
const HOANG_DOI = '10.2214/AJR.10.5116'
const FRELING_DOI = '10.1002/lary.20606'
const SCHUKNECHT_DOI = '10.1007/s00330-008-0946-5'
const MARDINI_DOI = '10.1016/j.rcl.2017.08.003'
const LEMIERRE_DOI = '10.1016/s0140-6736(00)57035-4'
const GINSBERG_DOI = '10.1016/s0887-2171(99)90018-5'
const VAN_DEN_BREKEL_DOI = '10.1148/radiology.177.2.2217772'
const SOM_DOI = '10.2214/ajr.158.5.1566697'

const HARNSBERGER = <Cite doi={HARNSBERGER_DOI}>Harnsberger and Osborn, AJR 1991</Cite>
const SHIN = <Cite doi={SHIN_DOI}>Shin et al., AJR 2001</Cite>
const RAO = <Cite doi={RAO_DOI}>Rao et al., RadioGraphics 1999</Cite>
const OLSEN = <Cite doi={OLSEN_DOI}>Olsen et al., AJR 1987</Cite>
const HOANG = <Cite doi={HOANG_DOI}>Hoang et al., AJR 2011</Cite>
const FRELING = <Cite doi={FRELING_DOI}>Freling et al., Laryngoscope 2009</Cite>
const SCHUKNECHT = <Cite doi={SCHUKNECHT_DOI}>Schuknecht et al., Eur Radiol 2008</Cite>
const MARDINI = <Cite doi={MARDINI_DOI}>Mardini and Gohel, Radiol Clin North Am 2018</Cite>
const LEMIERRE = <Cite doi={LEMIERRE_DOI}>Lemierre, Lancet 1936</Cite>
/** Estrera 1983 and Russo 1997 have no DOI (none on PubMed or Crossref), so they are cited in plain text. */
const ESTRERA = 'Estrera et al., Surg Gynecol Obstet 1983'
const GINSBERG = <Cite doi={GINSBERG_DOI}>Ginsberg, Semin Ultrasound CT MR 1999</Cite>
const RUSSO = 'Russo et al., AJNR 1997'
const VAN_DEN_BREKEL = <Cite doi={VAN_DEN_BREKEL_DOI}>van den Brekel et al., Radiology 1990</Cite>
const SOM = <Cite doi={SOM_DOI}>Som, AJR 1992</Cite>

const references: LessonReference[] = [
  { citation: 'Harnsberger HR, Osborn AG. Differential diagnosis of head and neck lesions based on their space of origin. 1. The suprahyoid part of the neck. AJR Am J Roentgenol. 1991;157(1):147-154.', doi: HARNSBERGER_DOI },
  { citation: 'Shin JH, Lee HK, Kim SY, Choi CG, Suh DC. Imaging of parapharyngeal space lesions: focus on the prestyloid compartment. AJR Am J Roentgenol. 2001;177(6):1465-1470.', doi: SHIN_DOI },
  { citation: 'Rao AB, Koeller KK, Adair CF. From the archives of the AFIP. Paragangliomas of the head and neck: radiologic-pathologic correlation. RadioGraphics. 1999;19(6):1605-1632.', doi: RAO_DOI },
  { citation: 'Olsen WL, Dillon WP, Kelly WM, Norman D, Brant-Zawadzki M, Newton TH. MR imaging of paragangliomas. AJR Am J Roentgenol. 1987;148(1):201-204.', doi: OLSEN_DOI },
  { citation: 'Hoang JK, Branstetter BF 4th, Eastwood JD, Glastonbury CM. Multiplanar CT and MRI of collections in the retropharyngeal space: is it an abscess? AJR Am J Roentgenol. 2011;196(4):W426-W432.', doi: HOANG_DOI },
  { citation: 'Freling N, Roele E, Schaefer-Prokop C, Fokkens W. Prediction of deep neck abscesses by contrast-enhanced computerized tomography in 76 clinically suspect consecutive patients. Laryngoscope. 2009;119(9):1745-1752.', doi: FRELING_DOI },
  { citation: 'Schuknecht B, Stergiou G, Graetz K. Masticator space abscess derived from odontogenic infection: imaging manifestation and pathways of extension depicted by CT and MR in 30 patients. Eur Radiol. 2008;18(9):1972-1979.', doi: SCHUKNECHT_DOI },
  { citation: 'Mardini S, Gohel A. Imaging of odontogenic infections. Radiol Clin North Am. 2018;56(1):31-44.', doi: MARDINI_DOI },
  { citation: 'Lemierre A. On certain septicaemias due to anaerobic organisms. Lancet. 1936;227(5874):701-703.', doi: LEMIERRE_DOI },
  { citation: 'Estrera AS, Landay MJ, Grisham JM, Sinn DP, Platt MR. Descending necrotizing mediastinitis. Surg Gynecol Obstet. 1983;157(6):545-552.' },
  { citation: 'Ginsberg LE. Imaging of perineural tumor spread in head and neck cancer. Semin Ultrasound CT MR. 1999;20(3):175-186.', doi: GINSBERG_DOI },
  { citation: 'Russo CP, Smoker WR, Weissman JL. MR appearance of trigeminal and hypoglossal motor denervation. AJNR Am J Neuroradiol. 1997;18(7):1375-1383.' },
  { citation: 'van den Brekel MW, Stel HV, Castelijns JA, Nauta JJ, van der Waal I, Valk J, Meyer CJ, Snow GB. Cervical lymph node metastasis: assessment of radiologic criteria. Radiology. 1990;177(2):379-384.', doi: VAN_DEN_BREKEL_DOI },
  { citation: 'Som PM. Detection of metastasis in cervical lymph nodes: CT and MR criteria and differential diagnosis. AJR Am J Roentgenol. 1992;158(5):961-969.', doi: SOM_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* The spaces, the fat-shift rule and the usual lesions. */

type Space = 'pms' | 'pps' | 'ms' | 'ps' | 'cs' | 'rps' | 'pvs' | 'bs' | 'sls' | 'sms'

const SPACE_NAMES: Record<Space, string> = {
  pms: 'pharyngeal mucosal space',
  pps: 'parapharyngeal space',
  ms: 'masticator space',
  ps: 'parotid space',
  cs: 'carotid space',
  rps: 'retropharyngeal space',
  pvs: 'perivertebral space',
  bs: 'buccal space',
  sls: 'sublingual space',
  sms: 'submandibular space',
}
const SPACES = Object.keys(SPACE_NAMES) as Space[]
const spaceOptions: Option[] = SPACES.map((s) => ({ value: s, label: upperFirst(SPACE_NAMES[s]) }))

/** N2-4: Harnsberger and Osborn's usual lesions, for the seven classic spaces only. */
const USUAL_LESIONS: Partial<Record<Space, string>> = {
  pms: 'squamous cell carcinoma, lymphoma, minor salivary gland tumour, retention cyst',
  pps: 'pleomorphic adenoma from a minor salivary rest, lipoma, atypical second branchial cleft cyst',
  ms: 'odontogenic infection, sarcoma, perineural spread along V3, benign masticator muscle hypertrophy',
  ps: 'pleomorphic adenoma, Warthin tumour, mucoepidermoid carcinoma, intraparotid nodes',
  cs: 'paraganglioma, schwannoma, nodal metastasis, jugular vein thrombosis',
  rps: 'nodal metastasis, lymphoma, suppurative node and abscess, edema',
  pvs: 'vertebral infection or tumour',
}

/** N2-2: which way each neighbour pushes the parapharyngeal fat, and the space it points to. */
const FAT_SHIFT: { value: string; label: string; space?: Space }[] = [
  { value: 'lateral', label: 'Pushed laterally', space: 'pms' },
  { value: 'posterior', label: 'Pushed posteriorly (posteromedially)', space: 'ms' },
  { value: 'medial', label: 'Pushed medially (anteromedially)', space: 'ps' },
  { value: 'anterior', label: 'Pushed anteriorly', space: 'cs' },
  { value: 'anterolateral', label: 'Pushed anterolaterally', space: 'rps' },
  { value: 'surrounded', label: 'Mass centred in the fat, fat all round it', space: 'pps' },
  { value: 'not-displaced', label: 'Not displaced' },
]

const shiftTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Parapharyngeal fat</th><th>Space of origin</th><th>Usual lesions</th></tr>
      </thead>
      <tbody>
        {FAT_SHIFT.filter((row) => row.space).map((row) => (
          <tr key={row.value}>
            <td>{row.label}</td>
            <td className="vessel-name">{upperFirst(SPACE_NAMES[row.space as Space])}</td>
            <td>{upperFirst(USUAL_LESIONS[row.space as Space] ?? '')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/** N4-1: van den Brekel's minimal axial diameter, in mm: 10 mm, 1 mm larger for the subdigastric node. */
const nodeCutoff = (level: string) => (level === 'IIsd' ? 11 : 10)

/** How a node level reads in the report and the chips. */
const LEVEL_WORDS: Record<string, string> = { IIsd: 'level II (subdigastric)', RP: 'retropharyngeal' }
const levelWords = (level: string) => LEVEL_WORDS[level] ?? `level ${level}`

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Exam, history and technique',
    body: (
      <>
        <p>This lesson is for the CT or MRI of the suprahyoid neck that arrives with one of two histories: a neck mass, or an infection (sore throat, fever or swelling). The order, the protocol checklists and the notes on what each test shows best are this site's own.</p>
        <p>CT is given with intravenous contrast, in thin sections with coronal and sagittal reformats, from the skull base to the thoracic inlet. It shows bone erosion, gas and stones well, and it is quick, which matters when the airway is at risk. MRI is given as T1, fat-suppressed T2 and fat-suppressed contrast-enhanced T1. It shows the fat planes, the skull base marrow and the nerves best, so it is the better test for perineural spread.</p>
      </>
    ),
  },
  {
    id: 'lesion',
    title: 'Step 2. The mass or collection, and its space',
    body: (
      <>
        <h3>A mass: find the space it starts in</h3>
        <p>The suprahyoid neck is divided into spaces by the layers of the deep cervical fascia, and the space a mass starts in narrows its differential to a short list ({HARNSBERGER}). The key is the parapharyngeal fat, a triangle of fat with a neighbour on every side. A mass in a neighbouring space pushes the fat away from that neighbour, so the direction of the push names the space of origin. A mass with fat all round it starts in the parapharyngeal space itself.</p>
        {shiftTable}
        <p>Two more spaces lie behind the pharynx. A retropharyngeal mass lies in front of the prevertebral muscles; a perivertebral mass lifts them forward ({HARNSBERGER}).</p>
        <p>A tumour of the deep lobe of the parotid passes through the stylomandibular tunnel, between the mandible and the styloid process, and widens it. There is no fat plane between it and the parotid. A true prestyloid parapharyngeal mass, most often a pleomorphic adenoma from a minor salivary rest, has fat around it ({SHIN}).</p>
        <p>A carotid space mass pushes the internal carotid artery forward ({HARNSBERGER}). A carotid body paraganglioma sits in the bifurcation and splays the internal and external carotid arteries apart ({RAO}). On MRI, serpiginous flow voids among areas of high signal give a paraganglioma a salt-and-pepper look; Olsen saw it in every paraganglioma over 2 cm ({OLSEN}).</p>
        <h3>An infection: the collection and its source</h3>
        <p>Name the collection, the spaces it fills and, where it can be seen, its source: a tooth, the tonsil, a salivary stone or a suppurative node. Note gas. These fields are this site's own.</p>
        <p>In Freling's series of 76 patients thought clinically to have a deep neck abscess, a fluid collection with complete or partial rim enhancement was an abscess in 82% (53 of 65), and fluid without rim enhancement in 67% (8 of 12). Gas in or beside a collection, or much free gas between the fascias, meant an abscess in every case ({FRELING}).</p>
        <p>In the retropharyngeal space, tell edema from an abscess. Edema fills the space from side to side, with no enhancing wall and no mass effect. An abscess has an enhancing wall and mass effect ({HOANG}).</p>
        <p>The mylohyoid line on the inside of the mandible decides where a dental infection goes. The roots of the second and third molars lie below it, so their infections reach the submandibular space; those of the premolars and the first molar lie above it and reach the sublingual space ({MARDINI}). An odontogenic abscess in the masticator space spreads by where it sits. In Schuknecht's 30 patients, abscesses in the medial pterygoid spread out of the space, to the parapharyngeal space or soft palate in 7 of 13; those in the lateral (masseter and pterygoid) part spread within the space, often through the sub-masseteric space ({SCHUKNECHT}).</p>
      </>
    ),
  },
  {
    id: 'spread',
    title: 'Step 3. Spread: nerves, bone, airway and vessels',
    body: (
      <>
        <p>With a mass, look for perineural spread: a tumour can follow a nerve towards its foramen and the skull base. Masticator space tumours spread along V3 through the foramen ovale ({GINSBERG}). Look for an enlarged, enhancing nerve and a widened foramen.</p>
        <p>Denervated muscle changes with time. Recent denervation gives edema-like signal and abnormal enhancement, sometimes with a larger muscle, which can be mistaken for infection or tumour; long-standing denervation gives fatty replacement and a smaller muscle. Denervation of the muscles of mastication points to V3 ({RUSSO}).</p>
        <p>With an infection, look at the airway, the internal jugular vein and the mediastinum. Thrombophlebitis of the internal jugular vein after an oropharyngeal infection is Lemierre syndrome ({LEMIERRE}). An oropharyngeal infection can track down into the mediastinum, descending necrotizing mediastinitis. In Estrera's series it most often began in the mandibular molars, and CT was the most important tool for early diagnosis ({ESTRERA}). With either history, look for bone erosion of the mandible and the skull base.</p>
      </>
    ),
  },
  {
    id: 'nodes',
    title: 'Step 4. Lymph nodes',
    body: (
      <>
        <p>Read each node for size, shape, grouping, necrosis and spread beyond the node ({SOM}). Give each abnormal node its level and its short-axis size. In van den Brekel's study the minimal axial diameter was the most accurate size measure, and 10 mm the most effective cut-off, 1 mm larger (11 mm) for the subdigastric node at the top of level II. Necrosis of 3 mm or more was found only in nodes that held tumour ({VAN_DEN_BREKEL}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 5. Other findings and the impression',
    body: (
      <>
        <p>With an infection, give a narrowed airway first, then spread into the mediastinum, then the collection with its spaces and source, then a jugular vein thrombosis. With a mass, give the mass with its space of origin, then perineural spread, bone erosion and the nodes. This order is this site's own.</p>
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

function commaAnd(items: string[]): string {
  return items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

const noYes: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const isMass = (v: Values) => str(v, 'history') === 'mass'
const isInfection = (v: Values) => str(v, 'history') === 'infection'
const massPresent = (v: Values) => isMass(v) && str(v, 'mass') === 'present'
const hasCollection = (v: Values) => isInfection(v) && !['', 'none'].includes(str(v, 'collection'))
const nodesAbnormal = (v: Values) => str(v, 'nodes') === 'abnormal'

const fields = {
  exam: { id: 'exam', kind: 'choice', label: 'Exam', required: true, options: [
    { value: 'ct', label: 'CT with contrast' },
    { value: 'mri', label: 'MRI with contrast' },
  ] },
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'mass', label: 'Neck mass' },
    { value: 'infection', label: 'Infection: sore throat, fever or swelling' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  missingCt: { id: 'missing-ct', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && str(v, 'exam') === 'ct', options: [
    { value: 'contrast', label: 'Intravenous contrast' },
    { value: 'reformats', label: 'Coronal and sagittal reformats' },
    { value: 'coverage', label: 'Skull base to thoracic inlet' },
  ] },
  missingMri: { id: 'missing-mri', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && str(v, 'exam') === 'mri', options: [
    { value: 't1', label: 'Unenhanced T1' },
    { value: 't2', label: 'Fat-suppressed T2' },
    { value: 'post', label: 'Fat-suppressed contrast-enhanced T1' },
  ] },

  mass: { id: 'mass', kind: 'choice', label: 'Mass', required: true, showIf: isMass, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  massSide: { id: 'mass-side', kind: 'choice', label: 'Side', showIf: massPresent, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Midline', label: 'Midline' },
  ] },
  massSize: { id: 'mass-size', kind: 'number', label: 'Largest size', unit: 'cm', min: 0, max: 30, step: 0.1, showIf: massPresent },
  fatShift: { id: 'fat-shift', kind: 'choice', label: 'Parapharyngeal fat', showIf: massPresent, options: FAT_SHIFT.map(({ value, label }) => ({ value, label })) },
  massSigns: { id: 'mass-signs', kind: 'multi', label: 'Signs', showIf: massPresent, options: [
    { value: 'tunnel', label: 'Widened stylomandibular tunnel' },
    { value: 'parotid-contact', label: 'No fat plane with the deep lobe of the parotid' },
    { value: 'ica-forward', label: 'Internal carotid artery pushed forward' },
    { value: 'splay', label: 'Internal and external carotid arteries splayed' },
    { value: 'prevertebral', label: 'Prevertebral muscles lifted forward' },
  ] },
  flowVoids: { id: 'flow-voids', kind: 'choice', label: 'Flow voids (salt and pepper)', showIf: (v) => massPresent(v) && str(v, 'exam') === 'mri', options: noYes },
  massSpace: { id: 'mass-space', kind: 'choice', label: 'Space of origin', showIf: massPresent, options: spaceOptions },
  massText: { id: 'mass-text', kind: 'text', label: 'Describe (optional)', placeholder: 'e.g. well defined, heterogeneously enhancing', showIf: massPresent },

  collection: { id: 'collection', kind: 'choice', label: 'Collection', required: true, showIf: isInfection, options: [
    { value: 'none', label: 'None' },
    { value: 'phlegmon', label: 'Phlegmon: inflammation without a defined collection' },
    { value: 'rim', label: 'Rim-enhancing collection' },
    { value: 'fluid', label: 'Fluid without an enhancing wall' },
  ] },
  collectionSide: { id: 'collection-side', kind: 'choice', label: 'Side', showIf: hasCollection, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
    { value: 'Midline', label: 'Midline' },
  ] },
  collectionSpaces: { id: 'collection-spaces', kind: 'multi', label: 'Spaces involved', showIf: hasCollection, options: spaceOptions },
  collectionSize: { id: 'collection-size', kind: 'number', label: 'Largest size', unit: 'cm', min: 0, max: 30, step: 0.1, showIf: (v) => hasCollection(v) && str(v, 'collection') !== 'phlegmon' },
  rpPattern: { id: 'rp-pattern', kind: 'choice', label: 'Retropharyngeal fluid', showIf: (v) => hasCollection(v) && list(v, 'collection-spaces').includes('rps'), options: [
    { value: 'edema', label: 'Fills it side to side, no wall, no mass effect' },
    { value: 'abscess', label: 'Enhancing wall or mass effect' },
  ] },
  gas: { id: 'gas', kind: 'choice', label: 'Gas', showIf: hasCollection, options: noYes },
  source: { id: 'source', kind: 'multi', label: 'Source', showIf: hasCollection, options: [
    { value: 'dental', label: 'Tooth' },
    { value: 'tonsil', label: 'Tonsil or pharynx' },
    { value: 'stone', label: 'Salivary stone' },
    { value: 'node', label: 'Suppurative node' },
  ] },
  tooth: { id: 'tooth', kind: 'choice', label: 'Tooth', showIf: (v) => hasCollection(v) && list(v, 'source').includes('dental'), options: [
    { value: 'front', label: 'Premolar or first molar' },
    { value: 'back', label: 'Second or third molar' },
  ] },

  perineural: { id: 'perineural', kind: 'choice', label: 'Perineural spread', showIf: massPresent, options: [
    { value: 'none', label: 'None' },
    { value: 'suspected', label: 'Suspected' },
  ] },
  perineuralText: { id: 'perineural-text', kind: 'text', label: 'Nerve and foramen', placeholder: 'e.g. V3, widened foramen ovale', showIf: (v) => massPresent(v) && str(v, 'perineural') === 'suspected' },
  denervation: { id: 'denervation', kind: 'choice', label: 'Denervated muscle', showIf: massPresent, options: [
    { value: 'none', label: 'None' },
    { value: 'acute', label: 'Recent: edema-like signal, enhancing' },
    { value: 'chronic', label: 'Long-standing: fatty replacement, smaller' },
  ] },
  denervationText: { id: 'denervation-text', kind: 'text', label: 'Which muscles', placeholder: 'e.g. right masticator muscles', showIf: (v) => massPresent(v) && ['acute', 'chronic'].includes(str(v, 'denervation')) },
  bone: { id: 'bone', kind: 'choice', label: 'Bone erosion', showIf: (v) => massPresent(v) || isInfection(v), options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  boneText: { id: 'bone-text', kind: 'text', label: 'Where', placeholder: 'e.g. right mandibular ramus', showIf: (v) => (massPresent(v) || isInfection(v)) && str(v, 'bone') === 'present' },
  airway: { id: 'airway', kind: 'choice', label: 'Airway', required: true, showIf: isInfection, options: [
    { value: 'patent', label: 'Patent' },
    { value: 'narrowed', label: 'Narrowed' },
  ] },
  airwayText: { id: 'airway-text', kind: 'text', label: 'Where and how much', placeholder: 'e.g. oropharynx narrowed to 5 mm', showIf: (v) => isInfection(v) && str(v, 'airway') === 'narrowed' },
  ijv: { id: 'ijv', kind: 'choice', label: 'Internal jugular vein', required: true, showIf: isInfection, options: [
    { value: 'patent', label: 'Patent' },
    { value: 'thrombosed', label: 'Thrombosed' },
  ] },
  ijvSide: { id: 'ijv-side', kind: 'choice', label: 'Side', showIf: (v) => isInfection(v) && str(v, 'ijv') === 'thrombosed', options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
  ] },
  mediastinum: { id: 'mediastinum', kind: 'choice', label: 'Extends into the mediastinum', showIf: isInfection, options: noYes },

  nodes: { id: 'nodes', kind: 'choice', label: 'Lymph nodes', required: true, options: [
    { value: 'none', label: 'No abnormal nodes' },
    { value: 'abnormal', label: 'Abnormal node' },
  ] },
  nodeSide: { id: 'node-side', kind: 'choice', label: 'Side', showIf: nodesAbnormal, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
  ] },
  nodeLevel: { id: 'node-level', kind: 'choice', label: 'Level (the largest node)', showIf: nodesAbnormal, options: [
    { value: 'I', label: 'Level I' },
    { value: 'IIsd', label: 'Level II, subdigastric (jugulodigastric)' },
    { value: 'II', label: 'Level II, other' },
    { value: 'III', label: 'Level III' },
    { value: 'IV', label: 'Level IV' },
    { value: 'V', label: 'Level V' },
    { value: 'VI', label: 'Level VI' },
    { value: 'RP', label: 'Retropharyngeal' },
  ] },
  nodeSize: { id: 'node-size', kind: 'number', label: 'Short axis (minimal axial diameter)', unit: 'mm', min: 0, max: 100, step: 1, showIf: nodesAbnormal },
  nodeFeatures: { id: 'node-features', kind: 'multi', label: 'Also', showIf: nodesAbnormal, options: [
    { value: 'necrosis', label: 'Central necrosis' },
    { value: 'ene', label: 'Ill-defined margin (extranodal extension)' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. mucosal thickening of the maxillary sinuses' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-mass', label: 'No mass' },
    { value: 'no-collection', label: 'No drainable collection' },
    { value: 'no-nodes', label: 'No abnormal lymph nodes' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

function massSpace(values: Values): Space | undefined {
  const value = str(values, 'mass-space')
  return massPresent(values) && (SPACES as string[]).includes(value) ? value as Space : undefined
}

function shiftSpace(values: Values): Space | undefined {
  return massPresent(values) ? FAT_SHIFT.find((row) => row.value === str(values, 'fat-shift'))?.space : undefined
}

function collectionSpaces(values: Values): Space[] {
  return hasCollection(values) ? list(values, 'collection-spaces').filter((s): s is Space => (SPACES as string[]).includes(s)) : []
}

const lemierre = (values: Values) => isInfection(values) && str(values, 'ijv') === 'thrombosed' && list(values, 'source').includes('tonsil') && hasCollection(values)

/* Rule chips. */

function deriveLesion(values: Values): Derived[] {
  const out: Derived[] = []
  if (massPresent(values)) {
    // N2-2: the fat shift names the space of origin.
    const fromShift = shiftSpace(values)
    if (fromShift) out.push({ label: 'Fat shift', value: `Points to the ${SPACE_NAMES[fromShift]}` })
    const signs = list(values, 'mass-signs')
    // N2-5: deep-lobe parotid.
    if (signs.includes('tunnel') || signs.includes('parotid-contact')) out.push({ label: 'Parotid', value: 'Points to the deep lobe of the parotid' })
    // N2-6, N2-7: carotid space and the carotid body.
    if (signs.includes('splay')) out.push({ label: 'Carotid', value: 'Splayed bifurcation: carotid body paraganglioma', tone: 'warn' })
    else if (signs.includes('ica-forward')) out.push({ label: 'Carotid', value: 'Points to the carotid space' })
    // N2-3: perivertebral.
    if (signs.includes('prevertebral')) out.push({ label: 'Prevertebral muscles', value: 'Points to the perivertebral space' })
    // N2-8: flow voids on MRI, seen in every paraganglioma over 2 cm.
    if (str(values, 'flow-voids') === 'yes') out.push({ label: 'Flow voids', value: 'Salt and pepper: seen in every paraganglioma over 2 cm', tone: 'warn' })
    // N2-4: the usual lesions of the space entered.
    const space = massSpace(values)
    if (space && USUAL_LESIONS[space]) out.push({ label: 'Usual lesions', value: upperFirst(USUAL_LESIONS[space] as string) })
  }

  if (hasCollection(values)) {
    // N2-10: how often each CT sign meant an abscess in Freling's series.
    if (str(values, 'collection') === 'rim') out.push({ label: 'Rim', value: 'An abscess in 82% in Freling\'s series', tone: 'warn' })
    if (str(values, 'collection') === 'fluid') out.push({ label: 'No rim', value: 'An abscess in 67% in Freling\'s series', tone: 'warn' })
    if (str(values, 'gas') === 'yes') out.push({ label: 'Gas', value: 'Meant an abscess in every case in Freling\'s series', tone: 'warn' })
    // N2-9: retropharyngeal edema against abscess.
    const rp = str(values, 'rp-pattern')
    if (rp === 'edema') out.push({ label: 'Retropharyngeal', value: 'Edema rather than abscess' })
    if (rp === 'abscess') out.push({ label: 'Retropharyngeal', value: 'Abscess pattern', tone: 'warn' })
    // N2-12: the mylohyoid line.
    const tooth = str(values, 'tooth')
    if (tooth === 'back') out.push({ label: 'Mylohyoid line', value: 'Roots below it: spreads to the submandibular space' })
    if (tooth === 'front') out.push({ label: 'Mylohyoid line', value: 'Roots above it: spreads to the sublingual space' })
    // N2-11: how an odontogenic masticator abscess spreads, by where it sits.
    if (list(values, 'source').includes('dental') && collectionSpaces(values).includes('ms')) {
      out.push({ label: 'Masticator space', value: 'Medial pterygoid: spreads out to the parapharyngeal space or soft palate; lateral: spreads within, under the masseter', tone: 'warn' })
    }
  }
  return out
}

function deriveSpread(values: Values): Derived[] {
  const out: Derived[] = []
  // N3-3: perineural spread, along V3 from the masticator space.
  if (massPresent(values) && str(values, 'perineural') === 'suspected') {
    out.push({ label: 'Perineural spread', value: massSpace(values) === 'ms' ? 'Follow V3 through the foramen ovale to the skull base' : 'Follow the nerve to its foramen and the skull base', tone: 'warn' })
  }
  // N3-4: denervation by phase.
  const denervation = massPresent(values) ? str(values, 'denervation') : ''
  if (denervation === 'acute') out.push({ label: 'Denervation', value: 'Recent: can mimic infection or tumour', tone: 'warn' })
  if (denervation === 'chronic') out.push({ label: 'Denervation', value: 'Long-standing: fatty replacement' })
  if (isInfection(values)) {
    // The site's own order: a narrowed airway goes first.
    if (str(values, 'airway') === 'narrowed') out.push({ label: 'Airway', value: 'Narrowed: goes first in the impression', tone: 'warn' })
    // N3-1: Lemierre.
    if (lemierre(values)) out.push({ label: 'Jugular vein', value: 'Thrombosis after an oropharyngeal infection: Lemierre syndrome', tone: 'warn' })
    else if (str(values, 'ijv') === 'thrombosed') out.push({ label: 'Jugular vein', value: 'Thrombosed', tone: 'warn' })
    // N3-2: descending necrotizing mediastinitis.
    if (str(values, 'mediastinum') === 'yes') out.push({ label: 'Mediastinum', value: 'Descending necrotizing mediastinitis pattern', tone: 'warn' })
  }
  return out
}

function deriveNodes(values: Values): Derived[] {
  if (!nodesAbnormal(values)) return []
  const out: Derived[] = []
  // N4-1: van den Brekel's size criterion; none for retropharyngeal nodes.
  const level = str(values, 'node-level')
  const size = num(values, 'node-size')
  if (size !== undefined && level && level !== 'RP') {
    const cutoff = nodeCutoff(level)
    out.push(size >= cutoff
      ? { label: 'Size', value: `At or over ${cutoff} mm for ${levelWords(level)}`, tone: 'warn' }
      : { label: 'Size', value: `Under ${cutoff} mm for ${levelWords(level)}` })
  }
  // N4-2: necrosis of 3 mm or more was found only in nodes with tumour; with a mass history.
  if (isMass(values) && list(values, 'node-features').includes('necrosis')) out.push({ label: 'Necrosis', value: '3 mm or more was found only in nodes with tumour', tone: 'warn' })
  return out
}

/* Report lines. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const exam = str(values, 'exam')
  const protocol = str(values, 'protocol')
  const missing = chosen(values, exam === 'mri' ? fields.missingMri : fields.missingCt)
  return [
    choiceLine(values, fields.exam),
    choiceLine(values, fields.history),
    protocol === 'complete' && exam === 'ct' && 'Technique: contrast-enhanced, thin sections with coronal and sagittal reformats, skull base to thoracic inlet',
    protocol === 'complete' && exam === 'mri' && 'Technique: T1, fat-suppressed T2 and fat-suppressed contrast-enhanced T1',
    protocol === 'complete' && exam === '' && 'Technique: complete protocol',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
  ]
}

function massLines(values: Values): (string | false)[] {
  if (!isMass(values)) return []
  const mass = str(values, 'mass')
  const size = num(values, 'mass-size')
  const space = massSpace(values)
  return [
    mass === 'none' && 'Mass: none',
    mass === 'present' && `Mass: ${join([
      lowerFirst(str(values, 'mass-side')),
      space && SPACE_NAMES[space],
      size !== undefined && `${size} cm`,
      str(values, 'mass-text'),
      str(values, 'fat-shift') && `parapharyngeal fat ${picked(values, fields.fatShift)}`,
      ...chosen(values, fields.massSigns),
      str(values, 'flow-voids') === 'yes' && 'flow voids',
    ], ', ') || 'present'}`,
  ]
}

function collectionLines(values: Values): (string | false)[] {
  if (!isInfection(values)) return []
  const collection = str(values, 'collection')
  const size = num(values, 'collection-size')
  const spaces = collectionSpaces(values).map((s) => SPACE_NAMES[s])
  return [
    collection === 'none' && 'Collection: none',
    hasCollection(values) && `Collection: ${join([
      picked(values, fields.collection),
      lowerFirst(str(values, 'collection-side')),
      spaces.length > 0 && commaAnd(spaces),
      size !== undefined && `${size} cm`,
      str(values, 'rp-pattern') && `retropharyngeal fluid ${picked(values, fields.rpPattern)}`,
      str(values, 'gas') === 'yes' && 'with gas',
    ], ', ')}`,
    hasCollection(values) && list(values, 'source').length > 0 && `Source: ${join([...chosen(values, fields.source), str(values, 'tooth') && picked(values, fields.tooth)], ', ')}`,
  ]
}

function spreadLines(values: Values): string[] {
  return [
    massPresent(values) ? choiceLine(values, fields.perineural, str(values, 'perineural') === 'suspected' && str(values, 'perineural-text')) : '',
    massPresent(values) ? choiceLine(values, fields.denervation, ['acute', 'chronic'].includes(str(values, 'denervation')) && str(values, 'denervation-text')) : '',
    choiceLine(values, fields.bone, str(values, 'bone') === 'present' && str(values, 'bone-text')),
    choiceLine(values, fields.airway, str(values, 'airway') === 'narrowed' && str(values, 'airway-text')),
    choiceLine(values, fields.ijv, str(values, 'ijv') === 'thrombosed' && lowerFirst(str(values, 'ijv-side'))),
    str(values, 'mediastinum') === 'yes' ? 'Mediastinum: extension of infection' : '',
  ]
}

function nodeLines(values: Values): (string | false)[] {
  const nodes = str(values, 'nodes')
  const size = num(values, 'node-size')
  const level = str(values, 'node-level')
  return [
    nodes === 'none' && 'Lymph nodes: no abnormal nodes',
    nodes === 'abnormal' && `Lymph nodes: ${join([
      lowerFirst(str(values, 'node-side')),
      level && levelWords(level),
      size !== undefined && `${size} mm short axis`,
      ...chosen(values, fields.nodeFeatures),
    ], ', ') || 'abnormal node'}`,
  ]
}

/* The impression: airway first with an infection; the mass and its space first with a mass. */

function sideWord(values: Values, id: string): string {
  const side = str(values, id)
  return side === 'Both' ? 'Bilateral' : side
}

function sided(side: string, rest: string): string {
  return side ? `${side} ${lowerFirst(rest)}` : upperFirst(rest)
}

function infectionFindings(values: Values): string[] {
  const out: string[] = []
  if (str(values, 'airway') === 'narrowed') out.push(`Airway narrowing${str(values, 'airway-text') ? `: ${str(values, 'airway-text')}` : ''}.`)
  if (str(values, 'mediastinum') === 'yes') out.push('Infection extends into the mediastinum.')
  if (hasCollection(values)) {
    const collection = str(values, 'collection')
    const spaces = collectionSpaces(values).map((s) => SPACE_NAMES[s])
    const where = spaces.length > 0 ? ` of the ${commaAnd(spaces)}` : ''
    const inWhere = spaces.length > 0 ? ` in the ${commaAnd(spaces)}` : ''
    const size = num(values, 'collection-size')
    const side = sideWord(values, 'collection-side')
    const rp = str(values, 'rp-pattern')
    let head = ''
    if (collection === 'phlegmon') head = sided(side, `Phlegmon${where}`)
    if (collection === 'rim') head = sided(side, `Rim-enhancing collection${inWhere}, likely abscess`)
    if (collection === 'fluid') head = rp === 'edema' ? sided(side, 'Retropharyngeal edema rather than abscess') : sided(side, `Fluid without an enhancing wall${inWhere}`)
    const sources = list(values, 'source').length > 0 ? `source: ${chosen(values, fields.source).join(', ')}` : ''
    const extras = join([size !== undefined && collection !== 'phlegmon' && `${size} cm`, str(values, 'gas') === 'yes' && 'with gas', sources], ', ')
    out.push(`${head}${extras ? `; ${extras}` : ''}.`)
  }
  if (str(values, 'ijv') === 'thrombosed') {
    out.push(`${sided(sideWord(values, 'ijv-side'), 'Internal jugular vein thrombosis')}${lemierre(values) ? ', in keeping with Lemierre syndrome' : ''}.`)
  }
  if (str(values, 'bone') === 'present') out.push(`Bone erosion${str(values, 'bone-text') ? `: ${str(values, 'bone-text')}` : ''}.`)
  return out
}

function massFindings(values: Values): string[] {
  const out: string[] = []
  if (massPresent(values)) {
    const space = massSpace(values)
    const size = num(values, 'mass-size')
    const side = str(values, 'mass-side')
    const where = space ? `${SPACE_NAMES[space]} mass` : 'suprahyoid neck mass'
    const extras = join([size !== undefined && `${size} cm`, str(values, 'mass-text')], ', ')
    out.push(`${sided(side, where)}${extras ? `, ${extras}` : ''}.`)
    if (str(values, 'perineural') === 'suspected') out.push(`Perineural spread suspected${str(values, 'perineural-text') ? `: ${str(values, 'perineural-text')}` : ''}.`)
    const denervation = str(values, 'denervation')
    if (denervation === 'acute' || denervation === 'chronic') {
      out.push(`${denervation === 'acute' ? 'Acute or subacute' : 'Chronic'} denervation${str(values, 'denervation-text') ? ` of the ${lowerFirst(str(values, 'denervation-text')).replace(/^the /, '')}` : ''}.`)
    }
    if (str(values, 'bone') === 'present') out.push(`Bone erosion${str(values, 'bone-text') ? `: ${str(values, 'bone-text')}` : ''}.`)
  }
  return out
}

function nodeFindings(values: Values): string[] {
  if (!nodesAbnormal(values)) return []
  const level = str(values, 'node-level')
  const size = num(values, 'node-size')
  const features = list(values, 'node-features')
  const where = level ? `${levelWords(level)} lymph node` : 'abnormal lymph node'
  const extras = join([size !== undefined && `${size} mm`, features.includes('necrosis') && 'necrotic', features.includes('ene') && 'with an ill-defined margin'], ', ')
  return [`${sided(sideWord(values, 'node-side'), where)}${extras ? `, ${extras}` : ''}.`]
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = [...(isInfection(values) ? infectionFindings(values) : massFindings(values)), ...nodeFindings(values)]
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    const normal = isInfection(values) ? 'No deep neck collection.' : 'No suprahyoid neck mass.'
    return `Impression: ${lines(limited, normal, ...negatives)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  if (negatives.includes('no-mass') && massPresent(values)) out.push('Impression says no mass, but a mass is entered.')
  if (negatives.includes('no-collection') && ['rim', 'fluid'].includes(str(values, 'collection')) && isInfection(values)) out.push('Impression says no drainable collection, but a collection is entered.')
  if (negatives.includes('no-nodes') && nodesAbnormal(values)) out.push('Impression says no abnormal lymph nodes, but an abnormal node is entered.')

  // N2-2: the space entered against the space the fat shift points to.
  const fromShift = shiftSpace(values)
  const space = massSpace(values)
  if (fromShift && space && fromShift !== space) {
    out.push(`The parapharyngeal fat points to the ${SPACE_NAMES[fromShift]}, but the ${SPACE_NAMES[space]} is entered: look again at which way the fat is pushed.`)
  }
  // N2-9: edema has no enhancing wall.
  if (hasCollection(values) && str(values, 'rp-pattern') === 'edema' && str(values, 'collection') === 'rim') {
    out.push('Retropharyngeal edema has no enhancing wall, but a rim-enhancing collection is entered: look again at the wall.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...massLines(values),
    ...collectionLines(values),
    ...spreadLines(values),
    ...nodeLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Exam, history and technique',
    learn: 'technique',
    teach: <p>CT with contrast, thin sections and reformats from the skull base to the thoracic inlet; or MRI with T1, fat-suppressed T2 and fat-suppressed contrast-enhanced T1. The history decides what step 2 asks. The checklists are this site's own.</p>,
    fields: [fields.exam, fields.history, fields.protocol, fields.missingCt, fields.missingMri],
  },
  {
    id: 'lesion',
    title: 'Step 2. The mass or collection, and its space',
    learn: 'lesion',
    teach: (
      <>
        <p>A mass pushes the parapharyngeal fat away from the space it starts in; a mass with fat all round it is parapharyngeal ({HARNSBERGER}). A widened stylomandibular tunnel points to the deep parotid ({SHIN}); a splayed carotid bifurcation to a carotid body paraganglioma ({RAO}).</p>
        {shiftTable}
        <p>With an infection, a rim-enhancing collection was an abscess in 82%, and gas meant an abscess every time ({FRELING}); retropharyngeal edema has no wall and no mass effect ({HOANG}); the mylohyoid line decides where a dental infection goes ({MARDINI}).</p>
      </>
    ),
    fields: [
      fields.mass, fields.massSide, fields.massSize, fields.fatShift, fields.massSigns, fields.flowVoids, fields.massSpace, fields.massText,
      fields.collection, fields.collectionSide, fields.collectionSpaces, fields.collectionSize, fields.rpPattern, fields.gas, fields.source, fields.tooth,
    ],
    derive: deriveLesion,
  },
  {
    id: 'spread',
    title: 'Step 3. Spread: nerves, bone, airway and vessels',
    learn: 'spread',
    teach: <p>Perineural spread follows the nerve to the skull base, V3 from the masticator space ({GINSBERG}); recent denervation can mimic infection or tumour ({RUSSO}). With an infection: the airway, jugular vein thrombosis (Lemierre, {LEMIERRE}) and the mediastinum ({ESTRERA}).</p>,
    fields: [fields.perineural, fields.perineuralText, fields.denervation, fields.denervationText, fields.bone, fields.boneText, fields.airway, fields.airwayText, fields.ijv, fields.ijvSide, fields.mediastinum],
    derive: deriveSpread,
  },
  {
    id: 'nodes',
    title: 'Step 4. Lymph nodes',
    learn: 'nodes',
    teach: <p>Minimal axial diameter 10 mm, 11 mm for the subdigastric node; necrosis of 3 mm or more was found only in nodes with tumour ({VAN_DEN_BREKEL}).</p>,
    fields: [fields.nodes, fields.nodeSide, fields.nodeLevel, fields.nodeSize, fields.nodeFeatures],
    derive: deriveNodes,
  },
  {
    id: 'impression',
    title: 'Step 5. Other findings and the impression',
    learn: 'impression',
    teach: <p>Infection: airway, mediastinum, collection, jugular vein. Mass: the mass and its space, spread, bone, nodes.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'suprahyoid-neck',
  name: 'Suprahyoid neck CT and MRI',
  lede: 'Read a CT or MRI of the suprahyoid neck for a mass or an infection: the space a mass starts in, from the way it pushes the parapharyngeal fat; the collection and its source; perineural spread, the airway and the jugular vein; the nodes; and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, but several papers have no abstract or are paywalled, so the claims not stated in an abstract (among them the fat-shift directions and the usual lesions of each space, the deep parotid and carotid bifurcation signs, retropharyngeal edema against abscess, the mylohyoid line and Lemierre syndrome) have still not been checked against their papers. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'shift-ms',
      question: 'A deep face mass pushes the parapharyngeal fat backwards (posteromedially). Which space does it start in?',
      options: ['Parotid space', 'Masticator space', 'Carotid space', 'Pharyngeal mucosal space'],
      answer: 1,
      explanation: <p>A masticator space mass lies in front of the parapharyngeal fat and pushes it posteriorly ({HARNSBERGER}).</p>,
    },
    {
      id: 'shift-cs',
      question: 'Which way does a carotid space mass push the parapharyngeal fat?',
      options: ['Laterally', 'Medially', 'Anteriorly', 'Not at all'],
      answer: 2,
      explanation: <p>The carotid space lies behind the parapharyngeal fat, so its masses push the fat forward, and the internal carotid artery with it ({HARNSBERGER}).</p>,
    },
    {
      id: 'shift-pps',
      question: 'A mass sits in the middle of the parapharyngeal fat with fat all round it. What is the most likely lesion?',
      options: ['Paraganglioma', 'Pleomorphic adenoma from a minor salivary rest', 'Squamous cell carcinoma', 'Schwannoma of V3'],
      answer: 1,
      explanation: <p>A mass with fat all round it starts in the parapharyngeal space, where a pleomorphic adenoma from a minor salivary rest is the usual lesion ({HARNSBERGER}; {SHIN}).</p>,
    },
    {
      id: 'tunnel',
      question: 'Which sign points to a deep-lobe parotid tumour rather than a true parapharyngeal mass?',
      options: ['Fat all round the mass', 'A widened stylomandibular tunnel', 'Flow voids', 'The internal carotid pushed forward'],
      answer: 1,
      explanation: <p>A deep-lobe parotid tumour passes through the stylomandibular tunnel and widens it, with no fat plane between it and the parotid ({SHIN}).</p>,
    },
    {
      id: 'splay',
      question: 'A mass at the carotid bifurcation splays the internal and external carotid arteries apart. What is it?',
      options: ['Vagal schwannoma', 'Carotid body paraganglioma', 'Nodal metastasis', 'Branchial cleft cyst'],
      answer: 1,
      explanation: <p>The carotid body tumour sits in the bifurcation and splays its branches ({RAO}); on MRI its flow voids give a salt-and-pepper look ({OLSEN}).</p>,
    },
    {
      id: 'rp-edema',
      question: 'Fluid fills the retropharyngeal space from side to side, with no enhancing wall and no mass effect. What is it?',
      options: ['Retropharyngeal abscess', 'Retropharyngeal edema', 'Suppurative node', 'Perivertebral abscess'],
      answer: 1,
      explanation: <p>Edema fills the space side to side without a wall or mass effect; an abscess has an enhancing wall and mass effect ({HOANG}).</p>,
    },
    {
      id: 'gas',
      question: 'In Freling\'s series of suspected deep neck abscesses, which CT sign meant an abscess in every case?',
      options: ['Rim enhancement', 'Fluid without a rim', 'Gas in or beside a collection', 'Fat stranding'],
      answer: 2,
      explanation: <p>Gas in or beside a collection meant an abscess in every case; a rim-enhancing collection was an abscess in 82%, and fluid without a rim in 67% ({FRELING}).</p>,
    },
    {
      id: 'mylohyoid',
      question: 'An infected third molar spreads into the floor of the mouth. Which space does it reach first?',
      options: ['Sublingual space', 'Submandibular space', 'Buccal space', 'Parotid space'],
      answer: 1,
      explanation: <p>The roots of the second and third molars lie below the mylohyoid line, so their infections reach the submandibular space ({MARDINI}).</p>,
    },
    {
      id: 'lemierre',
      question: 'After tonsillitis, CT shows a thrombosed internal jugular vein. What is the name for this?',
      options: ['Ludwig angina', 'Lemierre syndrome', 'Descending necrotizing mediastinitis', 'Grisel syndrome'],
      answer: 1,
      explanation: <p>Thrombophlebitis of the internal jugular vein after an oropharyngeal infection is Lemierre syndrome ({LEMIERRE}).</p>,
    },
    {
      id: 'denervation',
      question: 'The muscles of mastication on one side are bright on T2 and enhance. What should you look for?',
      options: ['A parotid stone', 'Disease along V3, such as perineural spread', 'A carotid body tumour', 'Retropharyngeal edema'],
      answer: 1,
      explanation: <p>Recent denervation gives edema-like signal and enhancement; in the masticator muscles it points to V3 ({RUSSO}), the nerve masticator space tumours spread along ({GINSBERG}).</p>,
    },
    {
      id: 'necrosis',
      question: 'An 8 mm level III node in a patient with a neck mass has central necrosis. What does it mean?',
      options: ['Benign, since it is under 10 mm', 'Likely metastatic: necrosis of 3 mm or more was found only in nodes with tumour', 'Reactive', 'Nothing without a biopsy'],
      answer: 1,
      explanation: <p>In van den Brekel's study, radiologically visible necrosis (3 mm or more) was found only in nodes that held tumour, whatever their size ({VAN_DEN_BREKEL}).</p>,
    },
  ],
}

export function SuprahyoidNeckStudyPage() {
  return <StudyPage study={study} />
}
