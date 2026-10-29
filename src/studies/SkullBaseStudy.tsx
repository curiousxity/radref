import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-10-25 with PubMed, Crossref, Europe PMC and Unpaywall
 * reachable, so every reference was matched as it was cited and every claim was read in an
 * abstract (Tamhankar also in its open full text) before it went in. The claims table is
 * docs/superpowers/research/2026-10-25-skull-base-sources.md (S claims). Rule chips and warnings
 * carry their claim IDs.
 */

const SHETH_DOI = '10.1148/rg.294085743'
const TAMHANKAR_DOI = '10.1016/j.ophtha.2013.04.009'
const CHAUDHARY_DOI = '10.1097/WNO.0b013e3181b415f4'
const THOMPSON_DOI = '10.1148/radiographics.14.5.7991825'
const GEBARSKI_DOI = '10.1148/radiology.183.2.1561339'
const CALDEMEYER_1998_DOI = '10.1148/radiographics.18.1.9460111'
const LAINE_DOI = '10.1148/radiology.174.1.2152985'
const GANDHI_DOI = '10.1002/hed.21470'
const NADER_DOI = '10.1177/0194599819827848'
const WILLIAMS_DOI = '10.1016/s0360-3016(00)01407-3'
const PAES_DOI = '10.1148/rg.336135501'
const ERDEM_DOI = '10.1148/rg.234025176'
const MEYERS_DOI = '10.1148/radiology.184.1.1609064'
const YEOM_DOI = '10.3174/ajnr.A3333'
const CALDEMEYER_1997_DOI = '10.1148/radiographics.17.5.9308106'
const MACDONALD_DOI = '10.2214/ajr.182.2.1820373'
const OLSEN_DOI = '10.2214/ajr.148.1.201'
const VOGL_DOI = '10.1148/radiology.192.1.8208919'

const SHETH = <Cite doi={SHETH_DOI}>Sheth et al., RadioGraphics 2009</Cite>
const TAMHANKAR = <Cite doi={TAMHANKAR_DOI}>Tamhankar et al., Ophthalmology 2013</Cite>
const CHAUDHARY = <Cite doi={CHAUDHARY_DOI}>Chaudhary et al., J Neuroophthalmol 2009</Cite>
const THOMPSON = <Cite doi={THOMPSON_DOI}>Thompson and Smoker, RadioGraphics 1994</Cite>
const GEBARSKI = <Cite doi={GEBARSKI_DOI}>Gebarski et al., Radiology 1992</Cite>
const CALDEMEYER_1998 = <Cite doi={CALDEMEYER_1998_DOI}>Caldemeyer et al., RadioGraphics 1998</Cite>
const LAINE = <Cite doi={LAINE_DOI}>Laine et al., Radiology 1990</Cite>
const GANDHI = <Cite doi={GANDHI_DOI}>Gandhi et al., Head Neck 2011</Cite>
const NADER = <Cite doi={NADER_DOI}>Nader et al., Otolaryngol Head Neck Surg 2019</Cite>
const WILLIAMS = <Cite doi={WILLIAMS_DOI}>Williams et al., Int J Radiat Oncol Biol Phys 2001</Cite>
const PAES = <Cite doi={PAES_DOI}>Paes et al., RadioGraphics 2013</Cite>
const ERDEM = <Cite doi={ERDEM_DOI}>Erdem et al., RadioGraphics 2003</Cite>
const MEYERS = <Cite doi={MEYERS_DOI}>Meyers et al., Radiology 1992</Cite>
const YEOM = <Cite doi={YEOM_DOI}>Yeom et al., AJNR 2013</Cite>
const CALDEMEYER_1997 = <Cite doi={CALDEMEYER_1997_DOI}>Caldemeyer et al., RadioGraphics 1997</Cite>
const MACDONALD = <Cite doi={MACDONALD_DOI}>Macdonald et al., AJR 2004</Cite>
const OLSEN = <Cite doi={OLSEN_DOI}>Olsen et al., AJR 1987</Cite>
const VOGL = <Cite doi={VOGL_DOI}>Vogl et al., Radiology 1994</Cite>
/** Russo 1997, Nemzek 1998 and Eldevik 2000 have no DOI (none on PubMed or Crossref), so they are cited in plain text. */
const RUSSO = 'Russo et al., AJNR 1997'
const NEMZEK = 'Nemzek et al., AJNR 1998'
const ELDEVIK = 'Eldevik et al., AJNR 2000'

const references: LessonReference[] = [
  { citation: 'Sheth S, Branstetter BF 4th, Escott EJ. Appearance of normal cranial nerves on steady-state free precession MR images. RadioGraphics. 2009;29(4):1045-1055.', doi: SHETH_DOI },
  { citation: 'Tamhankar MA, Biousse V, Ying GS, Prasad S, Subramanian PS, Lee MS, Eggenberger E, Moss HE, Pineles S, Bennett J, Osborne B, Volpe NJ, Liu GT, Bruce BB, Newman NJ, Galetta SL, Balcer LJ. Isolated third, fourth, and sixth cranial nerve palsies from presumed microvascular versus other causes: a prospective study. Ophthalmology. 2013;120(11):2264-2269.', doi: TAMHANKAR_DOI },
  { citation: 'Chaudhary N, Davagnanam I, Ansari SA, Pandey A, Thompson BG, Gemmete JJ. Imaging of intracranial aneurysms causing isolated third cranial nerve palsy. J Neuroophthalmol. 2009;29(3):238-244.', doi: CHAUDHARY_DOI },
  { citation: 'Thompson EO, Smoker WR. Hypoglossal nerve palsy: a segmental approach. RadioGraphics. 1994;14(5):939-958.', doi: THOMPSON_DOI },
  { citation: 'Gebarski SS, Telian SA, Niparko JK. Enhancement along the normal facial nerve in the facial canal: MR imaging and anatomic correlation. Radiology. 1992;183(2):391-394.', doi: GEBARSKI_DOI },
  { citation: 'Russo CP, Smoker WR, Weissman JL. MR appearance of trigeminal and hypoglossal motor denervation. AJNR Am J Neuroradiol. 1997;18(7):1375-1383.' },
  { citation: 'Caldemeyer KS, Mathews VP, Righi PD, Smith RR. Imaging features and clinical significance of perineural spread or extension of head and neck tumors. RadioGraphics. 1998;18(1):97-110.', doi: CALDEMEYER_1998_DOI },
  { citation: 'Laine FJ, Braun IF, Jensen ME, Nadel L, Som PM. Perineural tumor extension through the foramen ovale: evaluation with MR imaging. Radiology. 1990;174(1):65-71.', doi: LAINE_DOI },
  { citation: 'Nemzek WR, Hecht S, Gandour-Edwards R, Donald P, McKennan K. Perineural spread of head and neck tumors: how accurate is MR imaging? AJNR Am J Neuroradiol. 1998;19(4):701-706.' },
  { citation: 'Gandhi MR, Panizza B, Kennedy D. Detecting and defining the anatomic extent of large nerve perineural spread of malignancy: comparing "targeted" MRI with the histologic findings following surgery. Head Neck. 2011;33(4):469-475.', doi: GANDHI_DOI },
  { citation: 'Nader ME, Ginsberg LE, Bell D, Roberts DB, Gidley PW. Evaluating perineural spread to the intratemporal facial nerve on magnetic resonance imaging. Otolaryngol Head Neck Surg. 2019;160(6):1087-1094.', doi: NADER_DOI },
  { citation: 'Williams LS, Mancuso AA, Mendenhall WM. Perineural spread of cutaneous squamous and basal cell carcinoma: CT and MR detection and its impact on patient management and prognosis. Int J Radiat Oncol Biol Phys. 2001;49(4):1061-1069.', doi: WILLIAMS_DOI },
  { citation: 'Paes FM, Singer AD, Checkver AN, Palmquist RA, De La Vega G, Sidani C. Perineural spread in head and neck malignancies: clinical significance and evaluation with 18F-FDG PET/CT. RadioGraphics. 2013;33(6):1717-1736.', doi: PAES_DOI },
  { citation: 'Erdem E, Angtuaco EC, Van Hemert R, Park JS, Al-Mefty O. Comprehensive review of intracranial chordoma. RadioGraphics. 2003;23(4):995-1009.', doi: ERDEM_DOI },
  { citation: 'Meyers SP, Hirsch WL Jr, Curtin HD, Barnes L, Sekhar LN, Sen C. Chondrosarcomas of the skull base: MR imaging features. Radiology. 1992;184(1):103-108.', doi: MEYERS_DOI },
  { citation: 'Yeom KW, Lober RM, Mobley BC, Harsh G, Vogel H, Allagio R, Pearson M, Edwards MS, Fischbein NJ. Diffusion-weighted MRI: distinction of skull base chordoma from chondrosarcoma. AJNR Am J Neuroradiol. 2013;34(5):1056-1061.', doi: YEOM_DOI },
  { citation: 'Caldemeyer KS, Mathews VP, Azzarelli B, Smith RR. The jugular foramen: a review of anatomy, masses, and imaging characteristics. RadioGraphics. 1997;17(5):1123-1139.', doi: CALDEMEYER_1997_DOI },
  { citation: 'Macdonald AJ, Salzman KL, Harnsberger HR, Gilbert E, Shelton C. Primary jugular foramen meningioma: imaging appearance and differentiating features. AJR Am J Roentgenol. 2004;182(2):373-377.', doi: MACDONALD_DOI },
  { citation: 'Eldevik OP, Gabrielsen TO, Jacobsen EA. Imaging findings in schwannomas of the jugular foramen. AJNR Am J Neuroradiol. 2000;21(6):1139-1144.' },
  { citation: 'Olsen WL, Dillon WP, Kelly WM, Norman D, Brant-Zawadzki M, Newton TH. MR imaging of paragangliomas. AJR Am J Roentgenol. 1987;148(1):201-204.', doi: OLSEN_DOI },
  { citation: 'Vogl TJ, Juergens M, Balzer JO, Mack MG, Bergman C, Grevers G, Lissner J, Felix R. Glomus tumors of the skull base: combined use of MR angiography and spin-echo imaging. Radiology. 1994;192(1):103-110.', doi: VOGL_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* The jugular foramen bone margins (S3-8 to S3-11): what each pattern was in the papers. */

const jugularTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Margins of the jugular foramen on CT</th><th>Seen with</th></tr>
      </thead>
      <tbody>
        <tr><td>Permeative destruction, spread up and out into the middle ear</td><td className="vessel-name">Paraganglioma</td></tr>
        <tr><td>Permeative and sclerotic, spreading out around the skull base, dural tails</td><td className="vessel-name">Meningioma</td></tr>
        <tr><td>Enlarged, smooth, scalloped or rounded, corticated, sclerotic rim</td><td className="vessel-name">Schwannoma</td></tr>
        <tr><td>Smooth and intact, with no mass</td><td className="vessel-name">Pseudolesion: asymmetric foramen, high jugular bulb</td></tr>
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
        <p>This lesson covers three skull base studies: MRI for a cranial nerve palsy, MRI for perineural spread of a known head and neck cancer, and CT for a skull base mass. The order of the steps and the checklists are this site's own.</p>
        <p>For a palsy, thin steady-state free precession images (CISS or FIESTA) show the cisternal segments of all twelve cranial nerves, with submillimetre resolution and high contrast between the nerve and the cerebrospinal fluid ({SHETH}).</p>
        <p>For perineural spread, MRI is the modality of choice. Spread through the foramen ovale into Meckel cave is best seen on coronal T1 images, and nerve enhancement on fat-suppressed contrast-enhanced T1 images. CT shows best the enlarged or destroyed foramen ({CALDEMEYER_1998}).</p>
        <p>For a mass, CT shows subtle changes in the skull base bone better than MRI, and MRI shows the vessels and the brain beside the tumour better ({OLSEN}). A chordoma usually needs both, though MRI is the best single test ({ERDEM}).</p>
      </>
    ),
  },
  {
    id: 'site',
    title: 'Step 2. The nerve or the site',
    body: (
      <>
        <h3>A palsy: follow the nerve segment by segment</h3>
        <p>Thompson and Smoker divided the hypoglossal nerve into five segments: medullary, cisternal, skull base, carotid space and sublingual. Each segment is affected by different diseases, so placing the lesion in a segment narrows the list ({THOMPSON}). This lesson follows every nerve the same way: brainstem, cistern, skull base, and outside the skull.</p>
        <p>A third nerve palsy can come from an aneurysm at the junction of the internal carotid and posterior communicating arteries, or less often at the basilar tip or its junction with the superior cerebellar or posterior cerebral arteries. These aneurysms are usually at least 4 mm across. CT angiography is now the first choice for finding them, unless contrast or radiation must be avoided ({CHAUDHARY}).</p>
        <p>In Tamhankar's prospective series of patients aged 50 or older with an acute isolated third, fourth or sixth nerve palsy, 16.5% had a cause other than presumed small-vessel ischaemia: midbrain infarction, tumour, inflammation, pituitary apoplexy and giant cell arteritis. Even with vascular risk factors alone, 10% had another cause. The authors concluded that brain MRI has a role in these patients whether or not they have vascular risk factors ({TAMHANKAR}).</p>
        <h3>Perineural spread: the nerve at risk</h3>
        <p>Perineural spread is most common with adenoid cystic carcinoma and squamous cell carcinoma ({CALDEMEYER_1998}). The trigeminal and facial nerves are the ones most often involved. The risk is higher with a midface primary, a male patient, a larger tumour, a recurrence after treatment and a poorly differentiated tumour ({PAES}).</p>
        <p>Tumour can spread to places that do not touch the primary, and patients with proven spread can have normal nerve function on examination ({CALDEMEYER_1998}). A normal examination does not clear the nerve.</p>
        <h3>A mass: where it sits</h3>
        <p>A chordoma typically sits in the centre of the skull base: a well-defined, expansile soft-tissue mass arising from the clivus with extensive lytic bone destruction ({ERDEM}). In Yeom's series, though, tumour location did not reliably separate chordoma from chondrosarcoma ({YEOM}).</p>
      </>
    ),
  },
  {
    id: 'findings',
    title: 'Step 3. Along the nerve, or the bone',
    body: (
      <>
        <h3>A palsy</h3>
        <p>The normal facial nerve can enhance inside the facial canal. In Gebarski's series, 76% of clinically normal nerves enhanced along at least one segment in the canal, often unevenly from side to side. The nerve in the cerebellopontine angle and the internal auditory canal, and the first part of the nerve outside the skull, did not enhance ({GEBARSKI}).</p>
        <p>Denervated muscle changes with time. Recent denervation gives oedema-like signal and abnormal enhancement, sometimes with a larger muscle, and can be mistaken for infection or tumour. Long-standing denervation gives fatty replacement and a smaller muscle. In the tongue, fatty change appeared early; in the muscles of mastication, not until the subacute stage ({RUSSO}).</p>
        <h3>Perineural spread</h3>
        <p>The signs are a thickened, enhancing nerve; a foramen that is enlarged and then destroyed; fat effaced at the opening of a foramen; denervation atrophy; an enlarged cavernous sinus; and soft tissue in place of the fluid of the trigeminal cistern in Meckel cave ({CALDEMEYER_1998}). Along V3, Laine described smooth thickening of the nerve, concentric widening of the foramen ovale, an isointense mass replacing the dark trigeminal cistern, bulging of the lateral wall of the cavernous sinus, and atrophy of the muscles of mastication ({LAINE}).</p>
        <p>MRI finds perineural spread more reliably than it maps how far it goes. Nemzek found a sensitivity of 95% for its presence, but 63% for its whole extent ({NEMZEK}). Gandhi found it in every nerve with spread (30 of 30), and its extent correctly in 25 of 30; in 4 of 30 MRI underestimated the spread central to the Gasserian ganglion ({GANDHI}). Along the facial nerve in the temporal bone, Nader found a sensitivity of 72.7% and a specificity of 87.8% for the mastoid segment, and 80% and 82.8% at the stylomastoid foramen ({NADER}).</p>
        <p>The extent matters. In Williams's series of skin cancers with perineural spread treated by radiotherapy, the 5-year survival was 50% when imaging showed the spread and 86% when it did not. Small-volume, peripheral spread was curable; a larger volume and more central spread did worse ({WILLIAMS}).</p>
        <h3>A mass</h3>
        <p>Most tumours of the jugular foramen destroy the bone in an infiltrative way, while schwannoma and meningioma cause smooth enlargement. The commonest jugular foramen lesions are pseudolesions (an asymmetric foramen, a high or protruding jugular bulb), which keep smooth, intact margins on CT, and tumours such as paraganglioma and metastasis ({CALDEMEYER_1997}). Macdonald compared the three common tumours ({MACDONALD}), and Eldevik described the schwannoma ({ELDEVIK}):</p>
        {jugularTable}
        <p>Paraganglioma: permeative destruction of the foramen margins and flow voids were typical, with spread mainly up and out into the middle ear. Meningioma: in all five, permeative-sclerotic margins, spread out around the skull base and prominent dural tails, with no flow voids ({MACDONALD}). Schwannoma: in seven patients of Eldevik's nine, an enlarged foramen with sharply rounded borders and a sclerotic rim ({ELDEVIK}).</p>
        <p>On MRI, paragangliomas over 2 cm all showed the salt-and-pepper pattern of flow voids ({OLSEN}). A high jugular bulb can look like tumour on spin-echo images: four were misread that way in Vogl's series, and adding MR angiography separated tumour from flowing blood in every case ({VOGL}).</p>
        <p>In the clivus, chondrosarcoma showed mineralised matrix on CT in 7 of 16 tumours, and generally very high T2 signal ({MEYERS}); chordoma also has very high T2 signal ({ERDEM}). Diffusion helps: in Yeom's series, chondrosarcoma had the highest mean apparent diffusion coefficient (2051 × 10⁻⁶ mm²/s), then classic chordoma (1474), then poorly differentiated chordoma (875), which also had low T2 signal ({YEOM}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 4. Other findings and the impression',
    body: (
      <>
        <p>For a palsy, give the nerve and the side, the segment where the cause lies and what it is, or that the nerve was followed from the brainstem out and no cause was seen; then any denervation. For perineural spread, give the nerves involved and the most central point the spread reaches. For a mass, give its site, its bone margins and matrix, and where it extends. This order is this site's own.</p>
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

const isPalsy = (v: Values) => str(v, 'history') === 'palsy'
const isPns = (v: Values) => str(v, 'history') === 'pns'
const isMass = (v: Values) => str(v, 'history') === 'mass'
const pnsPresent = (v: Values) => isPns(v) && str(v, 'pns') === 'present'
const causeFound = (v: Values) => isPalsy(v) && str(v, 'cause') === 'found'
const ocularMotor = (v: Values) => isPalsy(v) && ['III', 'IV', 'VI'].includes(str(v, 'nerve'))
/** Denervation is asked for a V or XII palsy and for perineural spread along V3 (S3-2). */
const denervationShown = (v: Values) => (isPalsy(v) && ['V', 'XII'].includes(str(v, 'nerve'))) || (pnsPresent(v) && list(v, 'pns-nerves').includes('V3'))
const jugular = (v: Values) => isMass(v) && str(v, 'site') === 'jugular'

const sides: Option[] = [
  { value: 'Right', label: 'Right' },
  { value: 'Left', label: 'Left' },
  { value: 'Both', label: 'Both' },
]

const fields = {
  history: { id: 'history', kind: 'choice', label: 'Study', required: true, options: [
    { value: 'palsy', label: 'MRI for a cranial nerve palsy' },
    { value: 'pns', label: 'MRI for perineural spread of a known cancer' },
    { value: 'mass', label: 'CT for a skull base mass' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  missingPalsy: { id: 'missing-palsy', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && isPalsy(v), options: [
    { value: 'ssfp', label: 'Thin steady-state free precession (CISS or FIESTA)' },
    { value: 'post', label: 'Fat-suppressed contrast-enhanced T1' },
  ] },
  missingPns: { id: 'missing-pns', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && isPns(v), options: [
    { value: 'coronal-t1', label: 'Unenhanced coronal T1' },
    { value: 'post', label: 'Fat-suppressed contrast-enhanced T1' },
  ] },
  missingMass: { id: 'missing-mass', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete' && isMass(v), options: [
    { value: 'bone', label: 'Thin bone-algorithm sections with reformats' },
    { value: 'contrast', label: 'Intravenous contrast' },
  ] },

  nerve: { id: 'nerve', kind: 'choice', label: 'Nerve', required: true, showIf: isPalsy, options: [
    { value: 'III', label: 'III (oculomotor)' },
    { value: 'IV', label: 'IV (trochlear)' },
    { value: 'V', label: 'V (trigeminal)' },
    { value: 'VI', label: 'VI (abducens)' },
    { value: 'VII', label: 'VII (facial)' },
    { value: 'IX-XI', label: 'IX, X or XI (jugular foramen)' },
    { value: 'XII', label: 'XII (hypoglossal)' },
  ] },
  palsySide: { id: 'palsy-side', kind: 'choice', label: 'Side', showIf: isPalsy, options: sides },

  primary: { id: 'primary', kind: 'text', label: 'Primary tumour', placeholder: 'e.g. squamous cell carcinoma of the cheek skin', showIf: isPns },
  histology: { id: 'histology', kind: 'choice', label: 'Histology', showIf: isPns, options: [
    { value: 'scc', label: 'Squamous cell carcinoma' },
    { value: 'acc', label: 'Adenoid cystic carcinoma' },
    { value: 'other', label: 'Other' },
  ] },

  site: { id: 'site', kind: 'choice', label: 'Site', required: true, showIf: isMass, options: [
    { value: 'clivus', label: 'Clivus, in the midline' },
    { value: 'petroclival', label: 'Petroclival, off the midline' },
    { value: 'jugular', label: 'Jugular foramen' },
    { value: 'other', label: 'Elsewhere in the skull base' },
  ] },
  massSide: { id: 'mass-side', kind: 'choice', label: 'Side', showIf: (v) => isMass(v) && str(v, 'site') !== 'clivus', options: sides },
  massSize: { id: 'mass-size', kind: 'number', label: 'Largest size', unit: 'cm', min: 0, max: 15, step: 0.1, showIf: isMass },

  cause: { id: 'cause', kind: 'choice', label: 'Cause along the nerve', required: true, showIf: isPalsy, options: [
    { value: 'none', label: 'None seen' },
    { value: 'found', label: 'Found' },
  ] },
  segment: { id: 'segment', kind: 'choice', label: 'Segment', showIf: causeFound, options: [
    { value: 'brainstem', label: 'Brainstem' },
    { value: 'cistern', label: 'Cistern' },
    { value: 'skull-base', label: 'Skull base (cavernous sinus, foramen or canal)' },
    { value: 'extracranial', label: 'Outside the skull' },
  ] },
  causeText: { id: 'cause-text', kind: 'text', label: 'Describe', placeholder: 'e.g. 6 mm posterior communicating artery aneurysm', showIf: causeFound },
  facialEnhancement: { id: 'facial-enhancement', kind: 'multi', label: 'Facial nerve enhancement', showIf: (v) => isPalsy(v) && str(v, 'nerve') === 'VII', options: [
    { value: 'cpa-iac', label: 'Cerebellopontine angle or internal auditory canal' },
    { value: 'canal', label: 'Inside the facial canal' },
    { value: 'extracranial', label: 'Outside the skull' },
  ] },

  pns: { id: 'pns', kind: 'choice', label: 'Perineural spread', required: true, showIf: isPns, options: [
    { value: 'none', label: 'No sign of it' },
    { value: 'present', label: 'Present' },
  ] },
  pnsSide: { id: 'pns-side', kind: 'choice', label: 'Side', showIf: pnsPresent, options: sides },
  pnsNerves: { id: 'pns-nerves', kind: 'multi', label: 'Nerves', showIf: pnsPresent, options: [
    { value: 'V1', label: 'V1' },
    { value: 'V2', label: 'V2' },
    { value: 'V3', label: 'V3' },
    { value: 'VII', label: 'VII' },
    { value: 'other', label: 'Other' },
  ] },
  pnsSigns: { id: 'pns-signs', kind: 'multi', label: 'Signs', showIf: pnsPresent, options: [
    { value: 'nerve', label: 'Nerve thickened and enhancing' },
    { value: 'foramen', label: 'Foramen widened or destroyed' },
    { value: 'fat', label: 'Fat effaced at the opening of a foramen' },
    { value: 'meckel', label: 'Meckel cave fluid replaced by soft tissue' },
    { value: 'cavernous', label: 'Cavernous sinus enlarged, lateral wall bulging' },
  ] },
  pnsExtent: { id: 'pns-extent', kind: 'choice', label: 'Most central point reached', showIf: pnsPresent, options: [
    { value: 'peripheral', label: 'Outside the skull, short of the foramen' },
    { value: 'foramen', label: 'In the foramen or bony canal' },
    { value: 'ganglion', label: 'Gasserian or geniculate ganglion, or the cavernous sinus' },
    { value: 'cistern', label: 'Cistern or brainstem' },
  ] },

  denervation: { id: 'denervation', kind: 'choice', label: 'Muscles supplied by the nerve', showIf: denervationShown, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'recent', label: 'Oedema-like signal and enhancement' },
    { value: 'longstanding', label: 'Fatty and small' },
  ] },

  bone: { id: 'bone', kind: 'choice', label: 'Bone', required: true, showIf: isMass, options: [
    { value: 'lytic', label: 'Expansile, lytic destruction' },
    { value: 'permeative', label: 'Permeative destruction' },
    { value: 'permeative-sclerotic', label: 'Permeative and sclerotic margins' },
    { value: 'smooth', label: 'Smooth enlargement, corticated or sclerotic rim' },
    { value: 'intact', label: 'Smooth, intact margins, no mass' },
  ] },
  matrix: { id: 'matrix', kind: 'choice', label: 'Mineralised matrix', showIf: (v) => isMass(v) && str(v, 'bone') !== 'intact', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  extension: { id: 'extension', kind: 'multi', label: 'Extends into', showIf: (v) => isMass(v) && str(v, 'bone') !== 'intact', options: [
    { value: 'middle-ear', label: 'The middle ear' },
    { value: 'posterior-fossa', label: 'The posterior fossa' },
    { value: 'cavernous', label: 'The cavernous sinus' },
    { value: 'below', label: 'Below the skull base' },
    { value: 'around', label: 'Around the skull base (spreading outwards)' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. small vessel change in the white matter' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-lesion', label: 'No lesion along the nerve' },
    { value: 'no-pns', label: 'No perineural spread' },
  ] },
} satisfies Record<string, Field>

/* Rule chips. */

function deriveSite(values: Values): Derived[] {
  const out: Derived[] = []
  const nerve = isPalsy(values) ? str(values, 'nerve') : ''
  // S2-2: an aneurysm for a third nerve palsy, and CT angiography first.
  if (nerve === 'III') out.push({ label: 'Third nerve', value: 'Look for a posterior communicating or basilar tip aneurysm, usually 4 mm or more; CTA is the first choice', tone: 'warn' })
  // S2-3: another cause in 16.5% of older patients with an isolated palsy.
  if (ocularMotor(values)) out.push({ label: 'Age 50 or older', value: 'Another cause than small-vessel ischaemia in 16.5% of isolated palsies' })
  // S2-1: the hypoglossal segments.
  if (nerve === 'XII') out.push({ label: 'Segments', value: 'Medullary, cisternal, skull base, carotid space, sublingual' })
  // S2-4: the histologies most prone to perineural spread.
  if (isPns(values)) {
    const histology = str(values, 'histology')
    if (histology === 'scc' || histology === 'acc') out.push({ label: 'Histology', value: 'One of the two most common with perineural spread', tone: 'warn' })
  }
  // S2-6: location alone did not separate chordoma from chondrosarcoma.
  const site = isMass(values) ? str(values, 'site') : ''
  if (site === 'clivus' || site === 'petroclival') out.push({ label: 'Chordoma or chondrosarcoma', value: 'Location did not reliably tell them apart in Yeom\'s series' })
  return out
}

function deriveFindings(values: Values): Derived[] {
  const out: Derived[] = []
  if (isPalsy(values) && str(values, 'nerve') === 'VII') {
    // S3-1: normal enhancement in the canal; none in the angle, the canal or outside the skull.
    const enhancement = list(values, 'facial-enhancement')
    if (enhancement.includes('cpa-iac') || enhancement.includes('extracranial')) out.push({ label: 'Facial nerve', value: 'Enhancement here was not seen in normal nerves', tone: 'warn' })
    else if (enhancement.includes('canal')) out.push({ label: 'Facial nerve', value: 'Enhancement in the canal: seen in 76% of normal nerves' })
  }
  // S3-2: the stages of denervation.
  const denervation = denervationShown(values) ? str(values, 'denervation') : ''
  if (denervation === 'recent') out.push({ label: 'Denervation', value: 'Recent: can mimic infection or tumour', tone: 'warn' })
  if (denervation === 'longstanding') out.push({ label: 'Denervation', value: 'Long-standing' })
  if (pnsPresent(values)) {
    // S3-4, S3-5: MRI finds the spread more reliably than it maps the extent.
    out.push({ label: 'Extent', value: 'MRI can underestimate it: 63% for the whole extent in Nemzek\'s series', tone: 'warn' })
    const extent = str(values, 'pns-extent')
    if (extent === 'ganglion' || extent === 'cistern') out.push({ label: 'Gasserian ganglion', value: 'Spread central to it was underestimated in 4 of 30 nerves', tone: 'warn' })
    // S3-6: the facial nerve in the temporal bone.
    if (list(values, 'pns-nerves').includes('VII')) out.push({ label: 'Facial nerve', value: 'Mastoid segment 72.7% sensitive; stylomastoid foramen 80%' })
    // S3-7: central spread did worse.
    if (extent === 'peripheral') out.push({ label: 'Peripheral', value: 'Small-volume, peripheral spread was curable by radiotherapy' })
    else if (extent) out.push({ label: 'Central', value: 'More central spread had a worse outcome', tone: 'warn' })
  }
  if (isMass(values)) {
    const bone = str(values, 'bone')
    const site = str(values, 'site')
    // S3-8 to S3-11: the jugular foramen margins.
    if (jugular(values)) {
      if (bone === 'permeative' || bone === 'lytic') out.push({ label: 'Jugular foramen', value: 'Infiltrative destruction: paraganglioma or metastasis', tone: 'warn' })
      if (bone === 'permeative-sclerotic') out.push({ label: 'Jugular foramen', value: 'Permeative-sclerotic margins: meningioma (5 of 5 in Macdonald\'s series)', tone: 'warn' })
      if (bone === 'smooth') out.push({ label: 'Jugular foramen', value: 'Smooth enlargement with a sclerotic rim: schwannoma' })
      if (bone === 'intact') out.push({ label: 'Jugular foramen', value: 'Smooth, intact margins: pseudolesion, e.g. a high jugular bulb' })
      if (list(values, 'extension').includes('middle-ear')) out.push({ label: 'Middle ear', value: 'Spread up and out into the middle ear was typical of paraganglioma' })
      // S3-12, S3-13: MRI for a jugular foramen mass.
      if (bone !== 'intact') {
        const size = num(values, 'mass-size')
        out.push({ label: 'MRI', value: size !== undefined && size > 2 ? 'Salt and pepper: seen in every paraganglioma over 2 cm' : 'Salt and pepper in paragangliomas over 2 cm; MR angiography separates a high bulb' })
      }
    }
    // S3-14: chordoma.
    if (site === 'clivus' && bone === 'lytic') out.push({ label: 'Clivus', value: 'Central, expansile, lytic: the typical chordoma', tone: 'warn' })
    // S3-15: chondrosarcoma matrix.
    if (str(values, 'matrix') === 'yes' && bone !== 'intact') out.push({ label: 'Matrix', value: 'Seen on CT in 7 of 16 chondrosarcomas' })
    // S3-16: diffusion for a clival or petroclival tumour.
    if ((site === 'clivus' || site === 'petroclival') && bone !== 'intact' && bone) out.push({ label: 'Diffusion', value: 'Highest ADC in chondrosarcoma, lowest in poorly differentiated chordoma' })
  }
  return out
}

/* Report lines. */

function techniqueLines(values: Values): (string | false)[] {
  const history = str(values, 'history')
  const protocol = str(values, 'protocol')
  const missing = isPalsy(values) ? chosen(values, fields.missingPalsy) : isPns(values) ? chosen(values, fields.missingPns) : isMass(values) ? chosen(values, fields.missingMass) : []
  const technique = ({
    palsy: 'thin steady-state free precession images along the nerve and fat-suppressed contrast-enhanced T1',
    pns: 'unenhanced coronal T1 and fat-suppressed contrast-enhanced T1',
    mass: 'thin bone-algorithm sections with reformats, with intravenous contrast',
  } as Record<string, string>)[history]
  return [
    history && `Study: ${picked(values, fields.history)}`,
    protocol === 'complete' && technique && `Technique: ${technique}`,
    protocol === 'incomplete' && `Technique: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
  ]
}

function siteLines(values: Values): (string | false)[] {
  if (isPalsy(values)) {
    const nerve = str(values, 'nerve')
    return [nerve && `Clinical: ${join([lowerFirst(str(values, 'palsy-side')), `${nerve} palsy`], ' ')}`]
  }
  if (isPns(values)) {
    const primary = join([str(values, 'primary'), picked(values, fields.histology)], ', ')
    return [primary && `Primary: ${primary}`]
  }
  return []
}

function findingLines(values: Values): (string | false)[] {
  const out: (string | false)[] = []
  if (isPalsy(values)) {
    const cause = str(values, 'cause')
    if (cause === 'none') out.push('Along the nerve: no lesion seen from the brainstem out')
    if (cause === 'found') out.push(`Along the nerve: ${join([picked(values, fields.segment), str(values, 'cause-text')], ', ') || 'lesion found'}`)
    const enhancement = str(values, 'nerve') === 'VII' ? chosen(values, fields.facialEnhancement) : []
    if (enhancement.length > 0) out.push(`Facial nerve enhancement: ${enhancement.join(', ')}`)
  }
  if (isPns(values)) {
    const pns = str(values, 'pns')
    if (pns === 'none') out.push('Perineural spread: no sign of it')
    if (pns === 'present') {
      const nerves = list(values, 'pns-nerves')
      out.push(`Perineural spread: ${join([lowerFirst(str(values, 'pns-side')), nerves.length > 0 && nerves.join(', ')], ' ') || 'present'}`)
      const signs = chosen(values, fields.pnsSigns)
      if (signs.length > 0) out.push(`Signs: ${signs.join(', ')}`)
      if (str(values, 'pns-extent')) out.push(`Most central point: ${EXTENT_WORDS[str(values, 'pns-extent')]}`)
    }
  }
  if (denervationShown(values) && str(values, 'denervation')) out.push(`Muscles: ${picked(values, fields.denervation)}`)
  if (isMass(values)) {
    const size = num(values, 'mass-size')
    const site = picked(values, fields.site)
    if (site) out.push(`Mass: ${join([site, str(values, 'site') !== 'clivus' && lowerFirst(str(values, 'mass-side')), size !== undefined && `${size} cm`], ', ')}`)
    if (str(values, 'bone')) out.push(`Bone: ${picked(values, fields.bone)}`)
    if (str(values, 'matrix') && str(values, 'bone') !== 'intact') out.push(`Mineralised matrix: ${picked(values, fields.matrix)}`)
    const extension = str(values, 'bone') !== 'intact' ? chosen(values, fields.extension) : []
    if (extension.length > 0) out.push(`Extends into: ${extension.join(', ')}`)
  }
  return out
}

/* The impression. */

function sided(side: string, rest: string): string {
  const word = side === 'Both' ? 'Bilateral' : side
  return word ? `${word} ${lowerFirst(rest)}` : upperFirst(rest)
}

const EXTENT_WORDS: Record<string, string> = {
  peripheral: 'outside the skull, short of the foramen',
  foramen: 'the foramen or bony canal',
  ganglion: 'the Gasserian or geniculate ganglion, or the cavernous sinus',
  cistern: 'the cistern or brainstem',
}

const SEGMENT_WORDS: Record<string, string> = {
  brainstem: 'in the brainstem',
  cistern: 'in the cistern',
  'skull-base': 'at the skull base',
  extracranial: 'outside the skull',
}

function findings(values: Values): string[] {
  const out: string[] = []
  if (isPalsy(values)) {
    const nerve = str(values, 'nerve')
    const head = sided(str(values, 'palsy-side'), nerve ? `${nerve} palsy` : 'cranial nerve palsy')
    if (str(values, 'cause') === 'found') {
      const where = SEGMENT_WORDS[str(values, 'segment')]
      out.push(`${head}: ${join([str(values, 'cause-text') || 'lesion along the nerve', where], ' ')}.`)
    }
    if (str(values, 'cause') === 'none') out.push(`${head}: no cause seen along the nerve.`)
    const enhancement = nerve === 'VII' ? list(values, 'facial-enhancement') : []
    if (enhancement.includes('cpa-iac') || enhancement.includes('extracranial')) out.push('Facial nerve enhancement outside the facial canal, where normal nerves did not enhance.')
  }
  if (pnsPresent(values)) {
    const nerves = list(values, 'pns-nerves').filter((n) => n !== 'other')
    const extent = str(values, 'pns-extent')
    out.push(`${sided(str(values, 'pns-side'), `perineural spread${nerves.length > 0 ? ` along ${nerves.join(', ')}` : ''}`)}${extent ? `, reaching ${EXTENT_WORDS[extent]}` : ''}.`)
  }
  if (isPns(values) && str(values, 'pns') === 'none') out.push('No sign of perineural spread.')
  const denervation = denervationShown(values) ? str(values, 'denervation') : ''
  if (denervation === 'recent') out.push('Recent denervation of the muscles the nerve supplies.')
  if (denervation === 'longstanding') out.push('Long-standing denervation of the muscles the nerve supplies.')
  if (isMass(values) && str(values, 'bone')) {
    const bone = str(values, 'bone')
    const site = str(values, 'site')
    if (bone === 'intact') out.push(`${site === 'jugular' ? 'Jugular foramen' : 'Skull base'} with smooth, intact margins and no mass.`)
    else {
      const size = num(values, 'mass-size')
      const where = site === 'clivus' ? 'Clival mass' : sided(str(values, 'mass-side'), `${site ? picked(values, fields.site) : 'skull base'} mass`)
      const matrix = str(values, 'matrix') === 'yes' && 'mineralised matrix'
      const extension = chosen(values, fields.extension)
      out.push(`${where}${size !== undefined ? `, ${size} cm` : ''}, with ${join([picked(values, fields.bone), matrix], ' and ')}${extension.length > 0 ? `; extending into ${extension.join(', ')}` : ''}.`)
    }
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
    return `Impression: ${lines(limited, 'No abnormality seen.', ...negatives)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  if (negatives.includes('no-lesion') && causeFound(values)) out.push('Impression says no lesion along the nerve, but a cause is entered.')
  if (negatives.includes('no-pns') && pnsPresent(values)) out.push('Impression says no perineural spread, but perineural spread is entered.')
  // S3-3: perineural spread entered with none of its signs.
  if (pnsPresent(values) && str(values, 'pns-extent') !== '' && list(values, 'pns-signs').length === 0) {
    out.push('Perineural spread is entered with none of the signs: check the nerve, the foramen, the fat at its opening and Meckel cave.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...siteLines(values),
    ...findingLines(values),
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
    teach: <p>Palsy: thin steady-state free precession images show the nerves in the cisterns ({SHETH}). Perineural spread: coronal T1 for the foramen ovale and Meckel cave, fat-suppressed contrast T1 for the nerve ({CALDEMEYER_1998}). Mass: CT for the bone ({OLSEN}).</p>,
    fields: [fields.history, fields.protocol, fields.missingPalsy, fields.missingPns, fields.missingMass],
  },
  {
    id: 'site',
    title: 'Step 2. The nerve or the site',
    learn: 'site',
    teach: (
      <>
        <p>Palsy: follow the nerve segment by segment ({THOMPSON}); for a third nerve palsy, look for an aneurysm ({CHAUDHARY}).</p>
        <p>Perineural spread: adenoid cystic and squamous cell carcinoma, along the trigeminal and facial nerves ({CALDEMEYER_1998}; {PAES}). Mass: a chordoma sits centrally in the clivus ({ERDEM}).</p>
      </>
    ),
    fields: [fields.nerve, fields.palsySide, fields.primary, fields.histology, fields.site, fields.massSide, fields.massSize],
    derive: deriveSite,
  },
  {
    id: 'findings',
    title: 'Step 3. Along the nerve, or the bone',
    learn: 'findings',
    teach: (
      <>
        <p>The facial nerve can enhance normally inside its canal, not in the angle or the internal auditory canal ({GEBARSKI}). Perineural spread: a thick enhancing nerve, a widened foramen, effaced fat, Meckel cave filled in ({CALDEMEYER_1998}).</p>
        {jugularTable}
      </>
    ),
    fields: [
      fields.cause, fields.segment, fields.causeText, fields.facialEnhancement,
      fields.pns, fields.pnsSide, fields.pnsNerves, fields.pnsSigns, fields.pnsExtent,
      fields.denervation,
      fields.bone, fields.matrix, fields.extension,
    ],
    derive: deriveFindings,
  },
  {
    id: 'impression',
    title: 'Step 4. Other findings and the impression',
    learn: 'impression',
    teach: <p>Palsy: nerve, side, segment and cause. Perineural spread: nerves and the most central point. Mass: site, bone margins, matrix, extension.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'skull-base',
  name: 'Skull base MRI and CT',
  lede: 'Read an MRI for a cranial nerve palsy or for perineural spread, or a CT for a skull base mass: follow the nerve segment by segment, the signs and limits of perineural spread, the bone margins of a jugular foramen mass, chordoma and chondrosarcoma, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract or open full text.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'ssfp',
      question: 'Which MRI sequence shows the cisternal segments of all twelve cranial nerves?',
      options: ['Diffusion-weighted imaging', 'Steady-state free precession (CISS or FIESTA)', 'Susceptibility-weighted imaging', 'Time-of-flight angiography'],
      answer: 1,
      explanation: <p>Steady-state free precession gives submillimetre images with high contrast between the nerves and the cerebrospinal fluid ({SHETH}).</p>,
    },
    {
      id: 'third',
      question: 'Where does an aneurysm that causes a third nerve palsy usually lie?',
      options: ['Anterior communicating artery', 'Junction of the internal carotid and posterior communicating arteries', 'Middle cerebral bifurcation', 'Posterior inferior cerebellar artery'],
      answer: 1,
      explanation: <p>At the internal carotid and posterior communicating junction, or less often at the basilar tip; usually at least 4 mm across ({CHAUDHARY}).</p>,
    },
    {
      id: 'tamhankar',
      question: 'In Tamhankar\'s series of isolated third, fourth and sixth nerve palsies in patients 50 or older, how many had a cause other than small-vessel ischaemia?',
      options: ['None', 'About 1 in 6 (16.5%)', 'About half', 'Nearly all'],
      answer: 1,
      explanation: <p>18 of 109 (16.5%), including midbrain infarction, tumour, inflammation, pituitary apoplexy and giant cell arteritis ({TAMHANKAR}).</p>,
    },
    {
      id: 'facial',
      question: 'The facial nerve enhances in its tympanic segment, and the patient\'s face is normal. What did Gebarski find?',
      options: ['Enhancement in the canal is always abnormal', '76% of normal nerves enhanced somewhere in the canal', 'Normal nerves enhance in the internal auditory canal', 'Enhancement means perineural spread'],
      answer: 1,
      explanation: <p>Enhancement inside the facial canal followed the normal arteriovenous plexus around the nerve; the nerve in the angle, the internal auditory canal and outside the skull did not enhance ({GEBARSKI}).</p>,
    },
    {
      id: 'denervation',
      question: 'The muscles of mastication show oedema-like signal and enhancement. What should you think of?',
      options: ['Only infection', 'Recent denervation, which can mimic infection or tumour', 'Long-standing denervation', 'Normal muscle'],
      answer: 1,
      explanation: <p>Recent denervation gives oedema-like signal and enhancement; long-standing denervation gives fat and a smaller muscle ({RUSSO}).</p>,
    },
    {
      id: 'nemzek',
      question: 'How accurate was MRI for perineural spread in Nemzek\'s series?',
      options: ['95% for its presence, 63% for its whole extent', '63% for its presence, 95% for its extent', '100% for both', 'Under 50% for both'],
      answer: 0,
      explanation: <p>MRI found the spread reliably but often missed microscopic spread further along the nerve ({NEMZEK}).</p>,
    },
    {
      id: 'meckel',
      question: 'Which is a sign of perineural spread along V3 into Meckel cave?',
      options: ['A larger, darker trigeminal cistern', 'Soft tissue replacing the dark fluid of the trigeminal cistern', 'A smaller foramen ovale', 'Brighter masticator muscles from fat'],
      answer: 1,
      explanation: <p>An isointense mass replaced the normal dark trigeminal cistern, with a widened foramen ovale and a bulging cavernous sinus wall ({LAINE}).</p>,
    },
    {
      id: 'jugular',
      question: 'A jugular foramen mass has permeative and sclerotic margins, spreads out around the skull base and has dural tails, with no flow voids. What is it most likely to be?',
      options: ['Paraganglioma', 'Schwannoma', 'Meningioma', 'High jugular bulb'],
      answer: 2,
      explanation: <p>All five primary jugular foramen meningiomas showed these features ({MACDONALD}).</p>,
    },
    {
      id: 'schwannoma',
      question: 'Which CT finding is typical of a jugular foramen schwannoma?',
      options: ['Permeative destruction into the middle ear', 'An enlarged foramen with sharply rounded borders and a sclerotic rim', 'Hyperostosis with a dural tail', 'Normal bone with a flow void'],
      answer: 1,
      explanation: <p>Seven of the nine patients in Eldevik's series showed this on bone-algorithm CT ({ELDEVIK}).</p>,
    },
    {
      id: 'adc',
      question: 'In Yeom\'s series, which clival tumour had the highest apparent diffusion coefficient?',
      options: ['Poorly differentiated chordoma', 'Classic chordoma', 'Chondrosarcoma', 'They were all the same'],
      answer: 2,
      explanation: <p>Chondrosarcoma had the highest mean ADC, then classic chordoma, then poorly differentiated chordoma ({YEOM}).</p>,
    },
  ],
}

export function SkullBaseStudyPage() {
  return <StudyPage study={study} />
}
