import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Written on 2026-10-25 with PubMed, Crossref and Europe PMC reachable, so every
 * reference was matched as it was cited and every claim was read in an abstract or open full text
 * before it went in, except those marked unchecked or part in the claims table,
 * docs/superpowers/research/2026-10-25-larynx-sources.md (L claims). Rule chips and warnings carry
 * their claim IDs. Not yet reviewed by the site author.
 */

const CONNOR_DOI = '10.1102/1470-7330.2007.0010'
const JOSHI_DOI = '10.4103/0971-3026.107183'
const LYDIATT_DOI = '10.3322/caac.21389'
const BAUGNON_DOI = '10.1016/j.nic.2012.08.008'
const BECKER_1995_DOI = '10.1148/radiology.194.3.7862960'
const BECKER_1997_DOI = '10.1148/radiology.203.2.9114116'
const BECKER_2008_DOI = '10.1148/radiol.2492072183'
const DADFAR_DOI = '10.1097/RCT.0000000000000196'
const KUNO_2012_DOI = '10.1148/radiol.12111719'
const KUNO_2014_DOI = '10.1016/j.ejrad.2013.10.022'
const LOEVNER_DOI = '10.2214/ajr.169.6.9393190'
const CHIN_DOI = '10.2214/ajr.180.4.1801165'
const PAQUETTE_DOI = '10.1148/rg.323115129'
const POLITANO_DOI = '10.1002/lary.29152'
const VAN_DEN_BREKEL_DOI = '10.1148/radiology.177.2.2217772'

const CONNOR = <Cite doi={CONNOR_DOI}>Connor, Cancer Imaging 2007</Cite>
const JOSHI = <Cite doi={JOSHI_DOI}>Joshi et al., Indian J Radiol Imaging 2012</Cite>
const LYDIATT = <Cite doi={LYDIATT_DOI}>Lydiatt et al., CA Cancer J Clin 2017</Cite>
const BAUGNON = <Cite doi={BAUGNON_DOI}>Baugnon and Beitler, Neuroimaging Clin N Am 2013</Cite>
const BECKER_1995 = <Cite doi={BECKER_1995_DOI}>Becker et al., Radiology 1995</Cite>
const BECKER_1997 = <Cite doi={BECKER_1997_DOI}>Becker et al., Radiology 1997</Cite>
const BECKER_2008 = <Cite doi={BECKER_2008_DOI}>Becker et al., Radiology 2008</Cite>
const DADFAR = <Cite doi={DADFAR_DOI}>Dadfar et al., J Comput Assist Tomogr 2015</Cite>
const KUNO_2012 = <Cite doi={KUNO_2012_DOI}>Kuno et al., Radiology 2012</Cite>
const KUNO_2014 = <Cite doi={KUNO_2014_DOI}>Kuno et al., Eur J Radiol 2014</Cite>
const LOEVNER = <Cite doi={LOEVNER_DOI}>Loevner et al., AJR 1997</Cite>
const CHIN = <Cite doi={CHIN_DOI}>Chin et al., AJR 2003</Cite>
const PAQUETTE = <Cite doi={PAQUETTE_DOI}>Paquette et al., RadioGraphics 2012</Cite>
const POLITANO = <Cite doi={POLITANO_DOI}>Politano et al., Laryngoscope 2021</Cite>
const VAN_DEN_BREKEL = <Cite doi={VAN_DEN_BREKEL_DOI}>van den Brekel et al., Radiology 1990</Cite>

const references: LessonReference[] = [
  { citation: 'Connor S. Laryngeal cancer: how does the radiologist help? Cancer Imaging. 2007;7(1):93-103.', doi: CONNOR_DOI },
  { citation: 'Joshi VM, Wadhwa V, Mukherji SK. Imaging in laryngeal cancers. Indian J Radiol Imaging. 2012;22(3):209-226.', doi: JOSHI_DOI },
  { citation: 'Lydiatt WM, Patel SG, O\'Sullivan B, Brandwein MS, Ridge JA, Migliacci JC, Loomis AM, Shah JP. Head and neck cancers: major changes in the American Joint Committee on Cancer eighth edition cancer staging manual. CA Cancer J Clin. 2017;67(2):122-137.', doi: LYDIATT_DOI },
  { citation: 'Baugnon KL, Beitler JJ. Pitfalls in the staging of cancer of the laryngeal squamous cell carcinoma. Neuroimaging Clin N Am. 2013;23(1):81-105.', doi: BAUGNON_DOI },
  { citation: 'Becker M, Zbären P, Laeng H, Stoupis C, Porcellini B, Vock P. Neoplastic invasion of the laryngeal cartilage: comparison of MR imaging and CT with histopathologic correlation. Radiology. 1995;194(3):661-669.', doi: BECKER_1995_DOI },
  { citation: 'Becker M, Zbären P, Delavelle J, Kurt AM, Egger C, Rüfenacht DA, Terrier F. Neoplastic invasion of the laryngeal cartilage: reassessment of criteria for diagnosis at CT. Radiology. 1997;203(2):521-532.', doi: BECKER_1997_DOI },
  { citation: 'Becker M, Zbären P, Casselman JW, Kohler R, Dulguerov P, Becker CD. Neoplastic invasion of laryngeal cartilage: reassessment of criteria for diagnosis at MR imaging. Radiology. 2008;249(2):551-559.', doi: BECKER_2008_DOI },
  { citation: 'Dadfar N, Seyyedi M, Forghani R, Curtin HD. Computed tomography appearance of normal nonossified thyroid cartilage: implication for tumor invasion diagnosis. J Comput Assist Tomogr. 2015;39(2):240-243.', doi: DADFAR_DOI },
  { citation: 'Kuno H, Onaya H, Iwata R, Kobayashi T, Fujii S, Hayashi R, Otani K, Ojiri H, Yamanaka T, Satake M. Evaluation of cartilage invasion by laryngeal and hypopharyngeal squamous cell carcinoma with dual-energy CT. Radiology. 2012;265(2):488-496.', doi: KUNO_2012_DOI },
  { citation: 'Kuno H, Onaya H, Fujii S, Ojiri H, Otani K, Satake M. Primary staging of laryngeal and hypopharyngeal cancer: CT, MR imaging and dual-energy CT. Eur J Radiol. 2014;83(1):e23-e35.', doi: KUNO_2014_DOI },
  { citation: 'Loevner LA, Yousem DM, Montone KT, Weber R, Chalian AA, Weinstein GS. Can radiologists accurately predict preepiglottic space invasion with MR imaging? AJR Am J Roentgenol. 1997;169(6):1681-1687.', doi: LOEVNER_DOI },
  { citation: 'Chin SC, Edelstein S, Chen CY, Som PM. Using CT to localize side and level of vocal cord paralysis. AJR Am J Roentgenol. 2003;180(4):1165-1170.', doi: CHIN_DOI },
  { citation: 'Paquette CM, Manos DC, Psooy BJ. Unilateral vocal cord paralysis: a review of CT findings, mediastinal causes, and the course of the recurrent laryngeal nerves. RadioGraphics. 2012;32(3):721-740.', doi: PAQUETTE_DOI },
  { citation: 'Politano S, Morell F, Calamari K, DeSilva B, Matrka L. Yield of imaging to evaluate unilateral vocal fold paralysis of unknown etiology. Laryngoscope. 2021;131(8):1840-1844.', doi: POLITANO_DOI },
  { citation: 'van den Brekel MW, Stel HV, Castelijns JA, Nauta JJ, van der Waal I, Valk J, Meyer CJ, Snow GB. Cervical lymph node metastasis: assessment of radiologic criteria. Radiology. 1990;177(2):379-384.', doi: VAN_DEN_BREKEL_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* The T categories that imaging can set (L2-1): what each subsite's table says. */

type Subsite = 'supraglottic' | 'glottic' | 'subglottic'

const tTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Imaging finding</th><th>Supraglottic</th><th>Glottic</th><th>Subglottic</th></tr>
      </thead>
      <tbody>
        <tr><td>Pre-epiglottic fat or postcricoid region</td><td className="vessel-name">T3</td><td>Not listed</td><td>Not listed</td></tr>
        <tr><td>Paraglottic fat</td><td className="vessel-name">T3</td><td className="vessel-name">T3</td><td>Not listed</td></tr>
        <tr><td>Minor thyroid cartilage erosion (inner cortex)</td><td className="vessel-name">T3</td><td className="vessel-name">T3</td><td>Not listed</td></tr>
        <tr><td>Through the cartilage, or tissues beyond the larynx (trachea, deep tongue muscles, strap muscles, thyroid, oesophagus)</td><td className="vessel-name">T4a</td><td className="vessel-name">T4a</td><td className="vessel-name">T4a</td></tr>
        <tr><td>Prevertebral space, carotid artery encased, mediastinal structures</td><td className="vessel-name">T4b</td><td className="vessel-name">T4b</td><td className="vessel-name">T4b</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Exam, history and technique',
    body: (
      <>
        <p>This lesson is for the CT or MRI of the larynx with one of two histories: a known laryngeal cancer to stage, or hoarseness. The order of the steps and the checklists are this site's own.</p>
        <p>The mucosal extent of a tumour and the movement of the cords are judged at endoscopy; only cross-sectional imaging shows how far the tumour runs under the mucosa, cartilage invasion and spread beyond the larynx ({BAUGNON}).</p>
        <p>CT: thin sections (about 1 mm) after intravenous contrast, from the skull base to the sternoclavicular joints, with the patient breathing quietly and not swallowing ({CONNOR}). MRI: T1, T2 and fat-suppressed T2 images and fat-suppressed contrast-enhanced T1 images, with the T1 and T2 sections at the same levels ({JOSHI}).</p>
        <p>For hoarseness, the scan has to follow the vagus and recurrent laryngeal nerves: down to the aortopulmonary window on the left and the brachiocephalic artery on the right ({PAQUETTE}). In Politano's series of unexplained one-sided cord paralysis, in the 26 patients who had both a neck CT extended along the whole course of the nerves and a chest CT, the chest CT found nothing more ({POLITANO}).</p>
      </>
    ),
  },
  {
    id: 'tumour',
    title: 'Step 2. The cords, the tumour and its spaces',
    body: (
      <>
        <h3>Hoarseness: is a cord paralysed?</h3>
        <p>Chin found three reliable signs of a paralysed cord on routine axial CT, all on the paralysed side: a dilated pyriform sinus, a medially placed and thickened aryepiglottic fold, and a dilated laryngeal ventricle. Coronal images can show a flattened subglottic arch. Atrophy of the pharyngeal constrictor on the same side, with a dilated oropharynx, points to a lesion of the vagus higher up, near the skull base, rather than of the recurrent laryngeal nerve ({CHIN}).</p>
        <p>Then follow the nerve. Many causes lie in the mediastinum, and some are found before any other symptom ({PAQUETTE}). In Politano's series, imaging found a cause in about one patient in five (20.7%), most often a cancer; a left-sided paralysis more often had its cause in the chest (15 of 21), a right-sided one in the neck (6 of 9) ({POLITANO}).</p>
        <h3>A tumour: its subsite and the spaces under the mucosa</h3>
        <p>Name the subsite first. The supraglottis runs from the tip of the epiglottis to the ventricle, the glottis from the ventricle to 1 cm below the free edge of the cords, and the subglottis from there to the bottom of the cricoid. On axial images the tip of the arytenoids marks the false cords, and the vocal processes of the arytenoids with the thyroarytenoid muscle mark the true cords. The anterior and posterior commissures should be only a thin layer of mucosa, and there should be no soft tissue inside the cricoid ring ({CONNOR}). A tumour that crosses the ventricle is transglottic, and it usually crosses through the paraglottic space ({JOSHI}).</p>
        <p>Tumour in the pre-epiglottic or paraglottic fat replaces the fat with enhancing tissue. CT and MRI find paraglottic spread with a sensitivity of about 95%, but a specificity of only 50 to 75%, because inflammation around a tumour looks the same ({JOSHI}). In Loevner's series MRI found every pre-epiglottic invasion (sensitivity 100%, specificity 84%), and unenhanced T1 images were the most useful. The false positives were a large tumour flattening the fat, paraglottic spread taken for pre-epiglottic spread, and glandular tissue in front of the epiglottis ({LOEVNER}).</p>
        <p>An anterior commissure thicker than 1 to 2 mm is involved; CT predicts it with an accuracy of about 75% ({JOSHI}). Tumour there often invades the thyroid cartilage, because the inner perichondrium is missing at the commissure ({CONNOR}). Tumour in the cricoarytenoid joint or the interarytenoid region is an imaging correlate of a fixed cord, though cord movement is judged at endoscopy ({JOSHI}).</p>
      </>
    ),
  },
  {
    id: 'cartilage',
    title: 'Step 3. Cartilage and spread beyond the larynx',
    body: (
      <>
        <p>Imaging sets the T category through the spaces, the cartilage and the tissues around the larynx. The table gives the categories for each subsite as the AJCC tables quoted by Connor give them ({CONNOR}); the eighth edition changed the T categories of the oral cavity, skin and nasopharynx, not the larynx ({LYDIATT}). T1 and T2, and T3 from a fixed cord, rest on endoscopy.</p>
        {tTable}
        <p>On CT, Becker tested eight signs of cartilage invasion against the resected larynx. Sclerosis was the most sensitive in every cartilage but in the thyroid cartilage it was often reactive inflammation. Extralaryngeal tumour and erosion or lysis were the most specific. Tumour against non-ossified cartilage, a serpiginous contour and an obliterated marrow space were specific, though not sensitive, in the arytenoid and cricoid cartilages, and not specific in the thyroid cartilage. Blowout and bowing were not useful ({BECKER_1997}).</p>
        <p>Normal non-ossified thyroid cartilage can look like invasion: a lucent band where ossified and non-ossified cartilage meet, ossification of only one cortex, and non-ossified cartilage at the anterior commissure ({DADFAR}). On dual-energy CT, adding iodine overlay images raised the specificity for thyroid cartilage invasion from 70% to 96% with no loss of sensitivity ({KUNO_2012}).</p>
        <p>MRI is more sensitive than CT for cartilage invasion but less specific, because inflammation and fibrosis look like tumour ({BECKER_1995}). Compare the cartilage with the tumour beside it: cartilage signal on T2 or after contrast that is brighter than the tumour means inflammation, and signal like the tumour means invasion ({BECKER_2008}).</p>
        <p>Tumour leaves the larynx by three routes: through the thyrohyoid membrane along the superior laryngeal vessels and nerve, through the inferior constrictor, and through the cricothyroid membrane ({KUNO_2014}).</p>
      </>
    ),
  },
  {
    id: 'nodes',
    title: 'Step 4. Lymph nodes',
    body: (
      <>
        <p>Nodal metastases are rare from glottic cancer, because the glottis has few lymphatics. Subglottic cancer spreads to the pre- and paratracheal nodes, so the scan should include the superior mediastinum ({JOSHI}).</p>
        <p>The minimal axial diameter was van den Brekel's most accurate size measure: 10 mm, and 11 mm for the subdigastric node. Necrosis of 3 mm or more was found only in nodes that held tumour ({VAN_DEN_BREKEL}). The eighth edition of the AJCC manual added extranodal extension to the N category for most head and neck cancers ({LYDIATT}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 5. Other findings and the impression',
    body: (
      <>
        <p>For a tumour, give the subsite, side and size, the spaces it fills, the cartilage and what lies beyond the larynx, the T category those findings set, and the nodes. For hoarseness, give the side of the paralysed cord, whether the pattern points high on the vagus, and the cause, or that none was seen along the nerve. This order is this site's own.</p>
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

const noYes: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const isCancer = (v: Values) => str(v, 'history') === 'cancer'
const isHoarse = (v: Values) => str(v, 'history') === 'hoarseness'
const paralysed = (v: Values) => isHoarse(v) && str(v, 'cords') === 'paralysis'
/** The tumour fields show for a known cancer that is seen, or a mass found for hoarseness. */
const tumourShown = (v: Values) => (isCancer(v) && str(v, 'tumour') === 'seen') || (isHoarse(v) && str(v, 'cords') === 'mass')
const isMri = (v: Values) => str(v, 'exam') === 'mri'
const nodesAbnormal = (v: Values) => str(v, 'nodes') === 'abnormal'

const fields = {
  exam: { id: 'exam', kind: 'choice', label: 'Exam', required: true, options: [
    { value: 'ct', label: 'CT with contrast' },
    { value: 'mri', label: 'MRI with contrast' },
  ] },
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'cancer', label: 'Known laryngeal cancer' },
    { value: 'hoarseness', label: 'Hoarseness' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  missingCt: { id: 'missing-ct', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && str(v, 'exam') === 'ct', options: [
    { value: 'contrast', label: 'Intravenous contrast' },
    { value: 'thin', label: 'Thin sections with reformats' },
    { value: 'neck', label: 'Skull base to the sternoclavicular joints' },
    { value: 'mediastinum', label: 'Down to the aortopulmonary window' },
  ] },
  missingMri: { id: 'missing-mri', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && isMri(v), options: [
    { value: 't1', label: 'Unenhanced T1' },
    { value: 't2', label: 'T2 and fat-suppressed T2' },
    { value: 'post', label: 'Fat-suppressed contrast-enhanced T1' },
  ] },

  cords: { id: 'cords', kind: 'choice', label: 'Larynx', required: true, showIf: isHoarse, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'paralysis', label: 'Cord paralysis pattern' },
    { value: 'mass', label: 'Laryngeal mass' },
  ] },
  paralysisSide: { id: 'paralysis-side', kind: 'choice', label: 'Side', showIf: paralysed, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Both', label: 'Both' },
  ] },
  paralysisSigns: { id: 'paralysis-signs', kind: 'multi', label: 'Signs on that side', showIf: paralysed, options: [
    { value: 'pyriform', label: 'Pyriform sinus dilated' },
    { value: 'ae-fold', label: 'Aryepiglottic fold medial and thickened' },
    { value: 'ventricle', label: 'Laryngeal ventricle dilated' },
    { value: 'subglottic-arch', label: 'Subglottic arch flattened (coronal)' },
  ] },
  constrictor: { id: 'constrictor', kind: 'choice', label: 'Pharyngeal constrictor thin, oropharynx dilated on that side', showIf: paralysed, options: noYes },
  cause: { id: 'cause', kind: 'choice', label: 'Cause along the nerve', required: true, showIf: paralysed, options: [
    { value: 'none', label: 'None seen' },
    { value: 'found', label: 'Found' },
  ] },
  causeSite: { id: 'cause-site', kind: 'choice', label: 'Where', showIf: (v) => paralysed(v) && str(v, 'cause') === 'found', options: [
    { value: 'skull-base', label: 'Skull base' },
    { value: 'neck', label: 'Neck' },
    { value: 'thyroid', label: 'Thyroid' },
    { value: 'mediastinum', label: 'Mediastinum' },
    { value: 'lung', label: 'Lung' },
  ] },
  causeText: { id: 'cause-text', kind: 'text', label: 'Describe', placeholder: 'e.g. 3 cm mass in the aortopulmonary window', showIf: (v) => paralysed(v) && str(v, 'cause') === 'found' },

  tumour: { id: 'tumour', kind: 'choice', label: 'Tumour', required: true, showIf: isCancer, options: [
    { value: 'seen', label: 'Seen' },
    { value: 'not-seen', label: 'Not seen' },
  ] },
  subsite: { id: 'subsite', kind: 'choice', label: 'Subsite', showIf: tumourShown, options: [
    { value: 'supraglottic', label: 'Supraglottic' },
    { value: 'glottic', label: 'Glottic' },
    { value: 'subglottic', label: 'Subglottic' },
  ] },
  tumourSide: { id: 'tumour-side', kind: 'choice', label: 'Side', showIf: tumourShown, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
    { value: 'Midline', label: 'Midline' },
    { value: 'Both', label: 'Both' },
  ] },
  tumourSize: { id: 'tumour-size', kind: 'number', label: 'Largest size', unit: 'cm', min: 0, max: 15, step: 0.1, showIf: tumourShown },
  transglottic: { id: 'transglottic', kind: 'choice', label: 'Crosses the ventricle (transglottic)', showIf: tumourShown, options: noYes },
  spaces: { id: 'spaces', kind: 'multi', label: 'Tumour in', showIf: tumourShown, options: [
    { value: 'pes', label: 'Pre-epiglottic fat' },
    { value: 'pgs', label: 'Paraglottic fat' },
    { value: 'ac', label: 'Anterior commissure (thicker than 1-2 mm)' },
    { value: 'interarytenoid', label: 'Posterior commissure or interarytenoid region' },
    { value: 'caj', label: 'Cricoarytenoid joint' },
    { value: 'subglottis', label: 'Subglottis' },
    { value: 'piriform', label: 'Piriform sinus' },
    { value: 'postcricoid', label: 'Postcricoid region' },
  ] },

  cartilage: { id: 'cartilage', kind: 'choice', label: 'Cartilage most involved', showIf: tumourShown, options: [
    { value: 'none', label: 'None' },
    { value: 'thyroid', label: 'Thyroid' },
    { value: 'cricoid', label: 'Cricoid' },
    { value: 'arytenoid', label: 'Arytenoid' },
  ] },
  ctSigns: { id: 'ct-signs', kind: 'multi', label: 'CT signs', showIf: (v) => tumourShown(v) && str(v, 'exam') === 'ct' && !['', 'none'].includes(str(v, 'cartilage')), options: [
    { value: 'sclerosis', label: 'Sclerosis' },
    { value: 'erosion', label: 'Erosion or lysis' },
    { value: 'extralaryngeal', label: 'Tumour on the outer side too (extralaryngeal tumour)' },
    { value: 'nonossified', label: 'Tumour against non-ossified cartilage' },
    { value: 'serpiginous', label: 'Serpiginous contour' },
    { value: 'marrow', label: 'Marrow space obliterated' },
  ] },
  mriSignal: { id: 'mri-signal', kind: 'choice', label: 'Cartilage on T2 and after contrast', showIf: (v) => tumourShown(v) && isMri(v) && !['', 'none'].includes(str(v, 'cartilage')), options: [
    { value: 'like-tumour', label: 'Like the tumour' },
    { value: 'brighter', label: 'Brighter than the tumour' },
  ] },
  thyroidDepth: { id: 'thyroid-depth', kind: 'choice', label: 'Thyroid cartilage', showIf: tumourShown, options: [
    { value: 'none', label: 'Not invaded' },
    { value: 'inner', label: 'Inner cortex only' },
    { value: 'through', label: 'Through the cartilage' },
  ] },
  beyond: { id: 'beyond', kind: 'multi', label: 'Beyond the larynx', showIf: tumourShown, options: [
    { value: 'strap', label: 'Strap muscles' },
    { value: 'thyroid-gland', label: 'Thyroid gland' },
    { value: 'trachea', label: 'Trachea' },
    { value: 'oesophagus', label: 'Oesophagus' },
    { value: 'tongue', label: 'Deep extrinsic tongue muscles' },
    { value: 'soft-tissue', label: 'Other soft tissue of the neck' },
  ] },
  t4b: { id: 't4b', kind: 'multi', label: 'Further', showIf: tumourShown, options: [
    { value: 'prevertebral', label: 'Prevertebral space' },
    { value: 'carotid', label: 'Carotid artery encased' },
    { value: 'mediastinum', label: 'Mediastinal structures' },
  ] },

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
    { value: 'IIsd', label: 'Level II, subdigastric (jugulodigastric)' },
    { value: 'II', label: 'Level II, other' },
    { value: 'III', label: 'Level III' },
    { value: 'IV', label: 'Level IV' },
    { value: 'VI', label: 'Level VI (pre- or paratracheal)' },
    { value: 'other', label: 'Other' },
  ] },
  nodeSize: { id: 'node-size', kind: 'number', label: 'Short axis (minimal axial diameter)', unit: 'mm', min: 0, max: 100, step: 1, showIf: nodesAbnormal },
  nodeFeatures: { id: 'node-features', kind: 'multi', label: 'Also', showIf: nodesAbnormal, options: [
    { value: 'necrosis', label: 'Necrosis' },
    { value: 'ene', label: 'Extranodal extension' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. thyroid nodule' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-cartilage', label: 'No cartilage invasion' },
    { value: 'no-extralaryngeal', label: 'No spread beyond the larynx' },
    { value: 'no-nodes', label: 'No abnormal lymph nodes' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

function subsite(values: Values): Subsite | undefined {
  const value = str(values, 'subsite')
  return tumourShown(values) && ['supraglottic', 'glottic', 'subglottic'].includes(value) ? value as Subsite : undefined
}

/** L2-1: the imaging findings that set each T category for this subsite, highest category first. */
function imagingT(values: Values): { category: 'T4b' | 'T4a' | 'T3'; because: string[] } | undefined {
  if (!tumourShown(values)) return undefined
  const t4b = chosen(values, fields.t4b)
  if (t4b.length > 0) return { category: 'T4b', because: t4b }
  const beyond = chosen(values, fields.beyond)
  const through = str(values, 'thyroid-depth') === 'through'
  if (beyond.length > 0 || through) return { category: 'T4a', because: [through && 'through the thyroid cartilage', ...beyond].filter((s): s is string => Boolean(s)) }
  const site = subsite(values)
  const spaces = list(values, 'spaces')
  const because: string[] = []
  if (site === 'supraglottic' && spaces.includes('pes')) because.push('pre-epiglottic fat')
  if (site === 'supraglottic' && spaces.includes('postcricoid')) because.push('postcricoid region')
  if ((site === 'supraglottic' || site === 'glottic') && spaces.includes('pgs')) because.push('paraglottic fat')
  if ((site === 'supraglottic' || site === 'glottic') && str(values, 'thyroid-depth') === 'inner') because.push('inner cortex of the thyroid cartilage')
  return because.length > 0 ? { category: 'T3', because } : undefined
}

/* Rule chips. */

function deriveTumour(values: Values): Derived[] {
  const out: Derived[] = []
  if (paralysed(values)) {
    // L4-1: Chin's three reliable signs.
    const reliable = list(values, 'paralysis-signs').filter((s) => ['pyriform', 'ae-fold', 'ventricle'].includes(s)).length
    if (reliable > 0) out.push({ label: 'Cord paralysis', value: `${reliable} of Chin's 3 reliable signs`, tone: 'warn' })
    // L4-2: constrictor atrophy points to a central vagal lesion.
    if (str(values, 'constrictor') === 'yes') out.push({ label: 'Level', value: 'Central vagal lesion: follow the vagus up to the skull base', tone: 'warn' })
    // L4-4: where the cause lay, by side, in Politano's series.
    const side = str(values, 'paralysis-side')
    if (side === 'Left') out.push({ label: 'Left side', value: 'The cause was more often in the chest (15 of 21)' })
    if (side === 'Right') out.push({ label: 'Right side', value: 'The cause was more often in the neck (6 of 9)' })
  }
  if (tumourShown(values)) {
    const spaces = list(values, 'spaces')
    // L3-2: paraglottic spread is sensitive but not specific.
    if (spaces.includes('pgs')) out.push({ label: 'Paraglottic fat', value: 'About 95% sensitive, 50-75% specific: inflammation can mimic tumour' })
    // L3-3: unenhanced T1 for the pre-epiglottic fat.
    if (spaces.includes('pes') && isMri(values)) out.push({ label: 'Pre-epiglottic fat', value: 'Unenhanced T1 was the most useful; a large tumour flattening the fat can mimic invasion' })
    // L3-4: the anterior commissure and the thyroid cartilage.
    if (spaces.includes('ac')) out.push({ label: 'Anterior commissure', value: 'Often invades the thyroid cartilage here: look closely', tone: 'warn' })
    // L3-5: imaging correlates of a fixed cord.
    if (spaces.includes('caj') || spaces.includes('interarytenoid')) out.push({ label: 'Cord fixation', value: 'Imaging correlate; cord movement is judged at endoscopy' })
  }
  return out
}

function deriveCartilage(values: Values): Derived[] {
  if (!tumourShown(values)) return []
  const out: Derived[] = []
  const cartilage = str(values, 'cartilage')
  const signs = list(values, 'ct-signs')
  if (str(values, 'exam') === 'ct' && signs.length > 0) {
    // L5-1: Becker's CT signs, by cartilage.
    if (signs.includes('erosion') || signs.includes('extralaryngeal')) out.push({ label: 'CT signs', value: 'Erosion, lysis or extralaryngeal tumour: the most specific signs', tone: 'warn' })
    else if (signs.some((s) => ['nonossified', 'serpiginous', 'marrow'].includes(s))) {
      out.push(cartilage === 'thyroid'
        ? { label: 'CT signs', value: 'Not specific in the thyroid cartilage' }
        : { label: 'CT signs', value: 'Specific, though not sensitive, in the cricoid and arytenoid', tone: 'warn' })
    } else if (signs.includes('sclerosis')) {
      out.push(cartilage === 'thyroid'
        ? { label: 'CT signs', value: 'Sclerosis alone: often reactive inflammation in the thyroid cartilage' }
        : { label: 'CT signs', value: 'Sclerosis alone: the most sensitive sign, but less specific than erosion' })
    }
  }
  // L5-3: Becker's MRI rule.
  const signal = isMri(values) ? str(values, 'mri-signal') : ''
  if (signal === 'like-tumour') out.push({ label: 'MRI', value: 'Signal like the tumour: invasion', tone: 'warn' })
  if (signal === 'brighter') out.push({ label: 'MRI', value: 'Brighter than the tumour: inflammation rather than invasion' })
  // L2-1: the T category the imaging findings set.
  const t = imagingT(values)
  if (t) out.push({ label: 'Imaging T', value: t.category === 'T3' ? 'At least T3' : t.category, tone: 'warn' })
  return out
}

function deriveNodes(values: Values): Derived[] {
  const out: Derived[] = []
  // L6-1: subglottic cancer spreads to the pre- and paratracheal nodes; glottic rarely to any.
  const site = subsite(values)
  if (site === 'subglottic') out.push({ label: 'Subglottic', value: 'Pre- and paratracheal nodes: include the superior mediastinum' })
  if (site === 'glottic') out.push({ label: 'Glottic', value: 'Nodal metastases are rare' })
  if (!nodesAbnormal(values)) return out
  // L6-2: van den Brekel's size criterion.
  const level = str(values, 'node-level')
  const size = num(values, 'node-size')
  if (size !== undefined && level && level !== 'other') {
    const cutoff = level === 'IIsd' ? 11 : 10
    out.push(size >= cutoff
      ? { label: 'Size', value: `At or over ${cutoff} mm`, tone: 'warn' }
      : { label: 'Size', value: `Under ${cutoff} mm` })
  }
  const features = list(values, 'node-features')
  if (features.includes('necrosis')) out.push({ label: 'Necrosis', value: '3 mm or more was found only in nodes with tumour', tone: 'warn' })
  // L6-3: extranodal extension in the N category.
  if (features.includes('ene')) out.push({ label: 'Extranodal extension', value: 'Counts in the N category (AJCC 8th)', tone: 'warn' })
  return out
}

/* Report lines. */

function techniqueLines(values: Values): (string | false)[] {
  const exam = str(values, 'exam')
  const protocol = str(values, 'protocol')
  const missing = chosen(values, isMri(values) ? fields.missingMri : fields.missingCt)
  return [
    exam && `Exam: ${picked(values, fields.exam)}`,
    str(values, 'history') && `History: ${picked(values, fields.history)}`,
    protocol === 'complete' && exam === 'ct' && `Technique: contrast-enhanced thin sections with reformats, skull base to ${isHoarse(values) ? 'the aortopulmonary window' : 'the sternoclavicular joints'}`,
    protocol === 'complete' && exam === 'mri' && 'Technique: T1, T2, fat-suppressed T2 and fat-suppressed contrast-enhanced T1',
    protocol === 'complete' && exam === '' && 'Technique: complete protocol',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
  ]
}

function cordLines(values: Values): (string | false)[] {
  if (!isHoarse(values)) return []
  const cords = str(values, 'cords')
  return [
    cords === 'normal' && 'Larynx: normal; no sign of cord paralysis',
    paralysed(values) && `Larynx: ${join([lowerFirst(str(values, 'paralysis-side')), 'cord paralysis pattern', ...chosen(values, fields.paralysisSigns), str(values, 'constrictor') === 'yes' && 'pharyngeal constrictor thin, oropharynx dilated'], ', ')}`,
    paralysed(values) && str(values, 'cause') === 'none' && 'Vagus and recurrent laryngeal nerve course: no cause seen',
    paralysed(values) && str(values, 'cause') === 'found' && `Cause: ${join([picked(values, fields.causeSite), str(values, 'cause-text')], ', ') || 'found'}`,
  ]
}

function tumourLines(values: Values): (string | false)[] {
  const out: (string | false)[] = []
  if (isCancer(values) && str(values, 'tumour') === 'not-seen') out.push('Tumour: not seen')
  if (!tumourShown(values)) return out
  const size = num(values, 'tumour-size')
  out.push(`Tumour: ${join([
    lowerFirst(str(values, 'tumour-side')),
    picked(values, fields.subsite),
    size !== undefined && `${size} cm`,
    str(values, 'transglottic') === 'yes' && 'crossing the ventricle',
  ], ', ') || 'present'}`)
  const spaces = chosen(values, fields.spaces)
  if (spaces.length > 0) out.push(`Tumour in: ${spaces.join(', ')}`)
  const cartilage = str(values, 'cartilage')
  const signal = isMri(values) ? str(values, 'mri-signal') : ''
  out.push(cartilage === 'none' ? 'Cartilage: no sign of invasion' : cartilage ? `Cartilage: ${join([
    `${cartilage} most involved`,
    ...(str(values, 'exam') === 'ct' ? chosen(values, fields.ctSigns) : []),
    signal && `signal ${picked(values, fields.mriSignal)}`,
  ], ', ')}` : '')
  if (str(values, 'thyroid-depth')) out.push(`Thyroid cartilage: ${picked(values, fields.thyroidDepth)}`)
  const beyond = [...chosen(values, fields.beyond), ...chosen(values, fields.t4b)]
  if (beyond.length > 0) out.push(`Beyond the larynx: ${beyond.join(', ')}`)
  return out
}

function nodeLines(values: Values): (string | false)[] {
  const nodes = str(values, 'nodes')
  const size = num(values, 'node-size')
  return [
    nodes === 'none' && 'Lymph nodes: no abnormal nodes',
    nodes === 'abnormal' && `Lymph nodes: ${join([
      lowerFirst(str(values, 'node-side')),
      picked(values, fields.nodeLevel),
      size !== undefined && `${size} mm short axis`,
      ...chosen(values, fields.nodeFeatures),
    ], ', ') || 'abnormal node'}`,
  ]
}

/* The impression. */

function sideWord(values: Values, id: string): string {
  const side = str(values, id)
  return side === 'Both' ? 'Bilateral' : side
}

function sided(side: string, rest: string): string {
  return side ? `${side} ${lowerFirst(rest)}` : upperFirst(rest)
}

function findings(values: Values): string[] {
  const out: string[] = []
  if (paralysed(values)) {
    out.push(`${sided(sideWord(values, 'paralysis-side'), 'Vocal cord paralysis pattern')}${str(values, 'constrictor') === 'yes' ? ', with pharyngeal constrictor atrophy suggesting a central (high) vagal lesion' : ''}.`)
    if (str(values, 'cause') === 'found') out.push(`Possible cause: ${join([picked(values, fields.causeSite), str(values, 'cause-text')], ', ') || 'see above'}.`)
    if (str(values, 'cause') === 'none') out.push('No cause seen along the vagus and recurrent laryngeal nerve.')
  }
  if (tumourShown(values)) {
    const size = num(values, 'tumour-size')
    const site = str(values, 'subsite')
    const head = sided(str(values, 'tumour-side'), site ? `${site} tumour` : isHoarse(values) ? 'laryngeal mass' : 'laryngeal tumour')
    const extras = join([size !== undefined && `${size} cm`, str(values, 'transglottic') === 'yes' && 'transglottic'], ', ')
    const spaces = chosen(values, fields.spaces)
    out.push(`${head}${extras ? `, ${extras}` : ''}${spaces.length > 0 ? `; involving ${spaces.join(', ')}` : ''}.`)
    const t = imagingT(values)
    if (t) out.push(`Imaging features of ${t.category === 'T3' ? 'at least T3' : t.category}: ${t.because.join(', ')}.`)
    else if (str(values, 'cartilage') === 'none' && str(values, 'thyroid-depth') === 'none') out.push('No cartilage invasion or spread beyond the larynx on imaging.')
    if (isMri(values) && str(values, 'mri-signal') === 'brighter' && !t) out.push('Cartilage signal brighter than the tumour, favouring inflammation over invasion.')
  }
  if (nodesAbnormal(values)) {
    const size = num(values, 'node-size')
    const features = list(values, 'node-features')
    const level = str(values, 'node-level')
    const where = level && level !== 'other' ? `${lowerFirst(optionLabel(fields.nodeLevel, level))} lymph node` : 'abnormal lymph node'
    const extras = join([size !== undefined && `${size} mm`, features.includes('necrosis') && 'necrotic', features.includes('ene') && 'with extranodal extension'], ', ')
    out.push(`${sided(sideWord(values, 'node-side'), where)}${extras ? `, ${extras}` : ''}.`)
  }
  return out
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
  const found = findings(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    const normal = isHoarse(values) ? 'No laryngeal mass and no sign of vocal cord paralysis.' : 'No tumour seen.'
    return `Impression: ${lines(limited, normal, ...negatives)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const t = imagingT(values)
  const invaded = tumourShown(values) && (['inner', 'through'].includes(str(values, 'thyroid-depth')) || (isMri(values) && str(values, 'mri-signal') === 'like-tumour'))
  if (negatives.includes('no-cartilage') && invaded) out.push('Impression says no cartilage invasion, but cartilage invasion is entered.')
  if (negatives.includes('no-extralaryngeal') && t && t.category !== 'T3') out.push('Impression says no spread beyond the larynx, but spread beyond the larynx is entered.')
  if (negatives.includes('no-nodes') && nodesAbnormal(values)) out.push('Impression says no abnormal lymph nodes, but an abnormal node is entered.')
  // L5-3: an MRI signal brighter than the tumour argues against invasion.
  if (isMri(values) && tumourShown(values) && str(values, 'mri-signal') === 'brighter' && ['inner', 'through'].includes(str(values, 'thyroid-depth')) && str(values, 'cartilage') === 'thyroid') {
    out.push('Thyroid cartilage invasion is entered, but its signal is brighter than the tumour, which Becker read as inflammation: look again.')
  }
  // L4-1: a paralysis pattern needs at least one of Chin's signs.
  if (paralysed(values) && str(values, 'paralysis-side') !== '' && list(values, 'paralysis-signs').length === 0) {
    out.push('Cord paralysis pattern is entered with none of the signs: check the pyriform sinus, aryepiglottic fold and ventricle.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...cordLines(values),
    ...tumourLines(values),
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
    teach: <p>CT: about 1 mm sections with contrast, skull base to the sternoclavicular joints ({CONNOR}); for hoarseness, down to the aortopulmonary window on the left and the brachiocephalic artery on the right ({PAQUETTE}). MRI: T1, T2, fat-suppressed T2 and fat-suppressed contrast-enhanced T1 ({JOSHI}).</p>,
    fields: [fields.exam, fields.history, fields.protocol, fields.missingCt, fields.missingMri],
  },
  {
    id: 'tumour',
    title: 'Step 2. The cords, the tumour and its spaces',
    learn: 'tumour',
    teach: (
      <>
        <p>Hoarseness: a dilated pyriform sinus, a medial thick aryepiglottic fold and a dilated ventricle on the paralysed side; constrictor atrophy points higher up the vagus ({CHIN}).</p>
        <p>A tumour: its subsite ({CONNOR}), then the pre-epiglottic and paraglottic fat ({JOSHI}; {LOEVNER}), the anterior commissure and the cricoarytenoid joint ({JOSHI}).</p>
      </>
    ),
    fields: [
      fields.cords, fields.paralysisSide, fields.paralysisSigns, fields.constrictor, fields.cause, fields.causeSite, fields.causeText,
      fields.tumour, fields.subsite, fields.tumourSide, fields.tumourSize, fields.transglottic, fields.spaces,
    ],
    derive: deriveTumour,
  },
  {
    id: 'cartilage',
    title: 'Step 3. Cartilage and spread beyond the larynx',
    learn: 'cartilage',
    teach: (
      <>
        <p>CT: erosion, lysis and extralaryngeal tumour are the most specific signs; sclerosis is sensitive but often reactive in the thyroid cartilage ({BECKER_1997}). MRI: cartilage brighter than the tumour is inflammation, like the tumour is invasion ({BECKER_2008}).</p>
        {tTable}
      </>
    ),
    fields: [fields.cartilage, fields.ctSigns, fields.mriSignal, fields.thyroidDepth, fields.beyond, fields.t4b],
    derive: deriveCartilage,
  },
  {
    id: 'nodes',
    title: 'Step 4. Lymph nodes',
    learn: 'nodes',
    teach: <p>Glottic cancer rarely spreads to nodes; subglottic cancer goes to the pre- and paratracheal nodes ({JOSHI}). Size 10 mm, 11 mm for the subdigastric node; necrosis of 3 mm or more only in nodes with tumour ({VAN_DEN_BREKEL}).</p>,
    fields: [fields.nodes, fields.nodeSide, fields.nodeLevel, fields.nodeSize, fields.nodeFeatures],
    derive: deriveNodes,
  },
  {
    id: 'impression',
    title: 'Step 5. Other findings and the impression',
    learn: 'impression',
    teach: <p>Tumour: subsite, spaces, cartilage, beyond the larynx, the imaging T category, nodes. Hoarseness: side, level and cause.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'larynx',
  name: 'Larynx CT and MRI',
  lede: 'Read a CT or MRI of the larynx for a known cancer or for hoarseness: the subsite and the fat spaces, cartilage invasion on CT and MRI, the T category imaging can set, the signs of a paralysed cord and where to look for its cause, the nodes, and the report.',
  sourceNote: 'Unchecked draft: every reference was matched on PubMed and Crossref as it was cited, and each claim was read in an abstract or open full text, but the AJCC tables come from a review quoting the sixth edition, so the exact wording of the cartilage criteria for T4a is still to check against the eighth edition manual. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'chin',
      question: 'Which three CT signs did Chin find most reliable for a paralysed vocal cord?',
      options: [
        'Dilated pyriform sinus, medial thick aryepiglottic fold, dilated ventricle',
        'Narrow pyriform sinus, lateral aryepiglottic fold, small ventricle',
        'Thick anterior commissure, cricoid sclerosis, subglottic mass',
        'Enlarged thyroid lobe, tracheal deviation, oesophageal thickening',
      ],
      answer: 0,
      explanation: <p>Ipsilateral pyriform sinus dilatation, medial positioning and thickening of the aryepiglottic fold, and ipsilateral ventricle dilatation ({CHIN}).</p>,
    },
    {
      id: 'constrictor',
      question: 'A paralysed cord comes with atrophy of the pharyngeal constrictor on the same side. Where is the lesion likely to be?',
      options: ['Aortopulmonary window', 'High on the vagus, near the skull base', 'Thyroid bed', 'Within the larynx'],
      answer: 1,
      explanation: <p>Constrictor atrophy helps localise a more central vagal neuropathy ({CHIN}).</p>,
    },
    {
      id: 'coverage',
      question: 'How far down should a CT for a left vocal cord paralysis go?',
      options: ['The cricoid', 'The thoracic inlet', 'The aortopulmonary window', 'The diaphragm'],
      answer: 2,
      explanation: <p>To the aortopulmonary window on the left and the brachiocephalic artery on the right, the course of the recurrent laryngeal nerves ({PAQUETTE}).</p>,
    },
    {
      id: 'side',
      question: 'In Politano\'s series, where was the cause of a left-sided cord paralysis more often found?',
      options: ['The neck', 'The chest', 'The skull base', 'The larynx itself'],
      answer: 1,
      explanation: <p>Left-sided paralysis more often had its cause in the chest (15 of 21), right-sided in the neck (6 of 9) ({POLITANO}).</p>,
    },
    {
      id: 'pes',
      question: 'A supraglottic cancer fills the pre-epiglottic fat. What T category does that finding set?',
      options: ['T1', 'T2', 'T3', 'T4a'],
      answer: 2,
      explanation: <p>Pre-epiglottic invasion makes a supraglottic tumour T3 ({CONNOR}).</p>,
    },
    {
      id: 'inner-cortex',
      question: 'A glottic cancer erodes only the inner cortex of the thyroid cartilage. What T category does that finding set?',
      options: ['T2', 'T3', 'T4a', 'T4b'],
      answer: 1,
      explanation: <p>Minor thyroid cartilage erosion (inner cortex) is T3; spread through the cartilage into the tissues beyond the larynx is T4a ({CONNOR}).</p>,
    },
    {
      id: 'sclerosis',
      question: 'On CT, the thyroid lamina next to a tumour is sclerotic but not eroded. What did Becker find?',
      options: ['Sclerosis is the most specific sign', 'Sclerosis was sensitive but often reactive inflammation in the thyroid cartilage', 'Sclerosis rules out invasion', 'Sclerosis means the tumour is T4b'],
      answer: 1,
      explanation: <p>Sclerosis was the most sensitive sign in every cartilage but often corresponded to reactive inflammation in the thyroid cartilage; erosion, lysis and extralaryngeal tumour were the most specific ({BECKER_1997}).</p>,
    },
    {
      id: 'mri-rule',
      question: 'On MRI, the thyroid cartilage next to a tumour is brighter than the tumour on T2 and after contrast. What does it mean?',
      options: ['Invasion', 'Inflammation rather than invasion', 'Normal fatty marrow', 'Chondrosarcoma'],
      answer: 1,
      explanation: <p>Signal brighter than the tumour indicated inflammation; signal like the tumour indicated invasion ({BECKER_2008}).</p>,
    },
    {
      id: 'ct-mri',
      question: 'How did MRI and CT compare for cartilage invasion in Becker\'s 1995 study?',
      options: ['MRI more sensitive, CT more specific', 'CT more sensitive, MRI more specific', 'They were identical', 'Neither found any invasion'],
      answer: 0,
      explanation: <p>MRI was more sensitive (89% against 66%) but less specific (84% against 94%), because inflammation and fibrosis looked like tumour ({BECKER_1995}).</p>,
    },
    {
      id: 'subglottic-nodes',
      question: 'Which nodes does a subglottic cancer spread to?',
      options: ['Retropharyngeal', 'Pre- and paratracheal', 'Submental', 'Parotid'],
      answer: 1,
      explanation: <p>Subglottic cancer spreads to the pre- and paratracheal nodes, so the CT should include the superior mediastinum ({JOSHI}).</p>,
    },
    {
      id: 'ene',
      question: 'What did the AJCC eighth edition add to the N category for most head and neck cancers?',
      options: ['Node size over 3 cm', 'Extranodal extension', 'Retropharyngeal nodes', 'PET uptake'],
      answer: 1,
      explanation: <p>It added extranodal cancer extension to the N category in all but the virus-related cancers and mucosal melanoma ({LYDIATT}).</p>,
    },
  ],
}

export function LarynxStudyPage() {
  return <StudyPage study={study} />
}
