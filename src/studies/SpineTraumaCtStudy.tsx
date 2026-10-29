import { Cite } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { spineTraumaScans } from '../data/scans/spineTrauma'
import type { LessonReference } from '../components/LessonPage'
import { aoBodies, aoCode, aoDescriptions, aoFacetCode, aoFacetDescriptions, aoFacets, aoSentence, aoTypes } from '../logic/aospine'
import type { AoBody, AoFacet, AoFull, AoRegion, AoType } from '../logic/aospine'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23). Claims
 * are verified from abstracts, papers the author supplied, AO Spine's posters and open papers
 * cited beside the originals (Alves 2020 for T2-3; Radcliff 2013, Woods 2018 and Kopparapu 2022
 * for the rule of Spence, T2-2; Brommeland 2018 and Wagner 2023 for the expanded Denver criteria,
 * T5-1; Wáng 2024 and Wáng 2020 for Genant, T6-1), with the author's decisions of 2026-10-29
 * applied, and their second round (B, D: the low-energy BCVI advisory, from the EAST guideline,
 * Kim 2020, and Turaczyk Kolodziej 2024; the occipital condyle fracture as a Denver item). Still
 * unchecked: the exact 1 cm / 40% facet boundary (AO-6). The claims
 * table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-spine-trauma-ct-sources.md (T claims); the AO Spine
 * wording is in 2026-10-23-spine-calculators-sources.md (AO claims). Rule chips and warnings
 * carry their claim IDs.
 */

const VACCARO_TL_DOI = '10.1097/BRS.0b013e3182a8a381'
const VACCARO_CX_DOI = '10.1007/s00586-015-3831-3'
const ROJAS_DOI = '10.3174/ajnr.A0660'
const SPENCE_DOI = '10.2106/00004623-197052030-00013'
const DICKMAN_DOI = '10.1097/00006123-199601000-00012'
const ANDERSON_DOI = '10.2106/00004623-197456080-00017'
const BURLEW_DOI = '10.1097/TA.0b013e31823de8a0'
const LAREDO_DOI = '10.1148/radiology.194.1.7997579'
const GENANT_DOI = '10.1002/jbmr.5650080915'
const WESTERVELD_DOI = '10.1007/s00586-008-0764-0'
const ALVES_DOI = '10.14245/ns.2040226.113'
const WANG_DOI = '10.1007/s00256-024-04678-4'
const RADCLIFF_DOI = '10.1111/os.12034'
const WOODS_DOI = '10.1093/neuros/nyx194'
const KOPPARAPU_DOI = '10.3171/2021.12.SPINE211188'
const BROMMELAND_DOI = '10.1186/s13049-018-0559-1'
const WAGNER_DOI = '10.1259/bjr.20221116'
const WANG_ATM_DOI = '10.21037/atm.2020.02.23'
const KIM_DOI = '10.1097/TA.0000000000002668'
const TURACZYK_DOI = '10.1016/j.jss.2024.04.058'

const VACCARO_TL = <Cite doi={VACCARO_TL_DOI}>Vaccaro et al., Spine 2013</Cite>
const VACCARO_CX = <Cite doi={VACCARO_CX_DOI}>Vaccaro et al., Eur Spine J 2016</Cite>
const ROJAS = <Cite doi={ROJAS_DOI}>Rojas et al., AJNR 2007</Cite>
const SPENCE = <Cite doi={SPENCE_DOI}>Spence et al., J Bone Joint Surg Am 1970</Cite>
const DICKMAN = <Cite doi={DICKMAN_DOI}>Dickman et al., Neurosurgery 1996</Cite>
const ANDERSON = <Cite doi={ANDERSON_DOI}>Anderson and D'Alonzo, J Bone Joint Surg Am 1974</Cite>
const BURLEW = <Cite doi={BURLEW_DOI}>Burlew et al., J Trauma Acute Care Surg 2012</Cite>
const LAREDO = <Cite doi={LAREDO_DOI}>Laredo et al., Radiology 1995</Cite>
const GENANT = <Cite doi={GENANT_DOI}>Genant et al., J Bone Miner Res 1993</Cite>
const WESTERVELD = <Cite doi={WESTERVELD_DOI}>Westerveld et al., Eur Spine J 2009</Cite>
const ALVES = <Cite doi={ALVES_DOI}>Alves et al., Neurospine 2020</Cite>
const WANG = <Cite doi={WANG_DOI}>Wáng et al., Skeletal Radiol 2024</Cite>
const RADCLIFF = <Cite doi={RADCLIFF_DOI}>Radcliff et al., Orthop Surg 2013</Cite>
const WOODS = <Cite doi={WOODS_DOI}>Woods et al., Neurosurgery 2018</Cite>
const KOPPARAPU = <Cite doi={KOPPARAPU_DOI}>Kopparapu et al., J Neurosurg Spine 2022</Cite>
const BROMMELAND = <Cite doi={BROMMELAND_DOI}>Brommeland et al., Scand J Trauma Resusc Emerg Med 2018</Cite>
const WAGNER = <Cite doi={WAGNER_DOI}>Wagner et al., Br J Radiol 2023</Cite>
const WANG_ATM = <Cite doi={WANG_ATM_DOI}>Wáng et al., Ann Transl Med 2020</Cite>
const KIM = <Cite doi={KIM_DOI}>Kim et al. (EAST guideline), J Trauma Acute Care Surg 2020</Cite>
const TURACZYK = <Cite doi={TURACZYK_DOI}>Turaczyk Kolodziej et al., J Surg Res 2024</Cite>

const references: LessonReference[] = [
  { citation: 'Vaccaro AR, Oner C, Kepler CK, Dvorak M, Schnake K, Bellabarba C, Reinhold M, Aarabi B, Kandziora F, Chapman J, Shanmuganathan R, Fehlings M, Vialle L. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037.', doi: VACCARO_TL_DOI },
  { citation: 'Vaccaro AR, Koerner JD, Radcliff KE, Oner FC, Reinhold M, Schnake KJ, Kandziora F, Fehlings MG, Dvorak MF, Aarabi B, Rajasekaran S, Schroeder GD, Kepler CK, Vialle LR. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184.', doi: VACCARO_CX_DOI },
  { citation: 'Rojas CA, Bertozzi JC, Martinez CR, Whitlow J. Reassessment of the craniocervical junction: normal values on CT. AJNR Am J Neuroradiol. 2007;28(9):1819-1823.', doi: ROJAS_DOI },
  { citation: 'Spence KF Jr, Decker S, Sell KW. Bursting atlantal fracture associated with rupture of the transverse ligament. J Bone Joint Surg Am. 1970;52(3):543-549.', doi: SPENCE_DOI },
  { citation: 'Dickman CA, Greene KA, Sonntag VK. Injuries involving the transverse atlantal ligament: classification and treatment guidelines based upon experience with 39 injuries. Neurosurgery. 1996;38(1):44-50.', doi: DICKMAN_DOI },
  { citation: 'Anderson LD, D\'Alonzo RT. Fractures of the odontoid process of the axis. J Bone Joint Surg Am. 1974;56(8):1663-1674.', doi: ANDERSON_DOI },
  { citation: 'Burlew CC, Biffl WL, Moore EE, Barnett CC, Johnson JL, Bensard DD. Blunt cerebrovascular injuries: redefining screening criteria in the era of noninvasive diagnosis. J Trauma Acute Care Surg. 2012;72(2):330-335.', doi: BURLEW_DOI },
  { citation: 'Laredo JD, Lakhdari K, Bellaïche L, Hamze B, Janklewicz P, Tubiana JM. Acute vertebral collapse: CT findings in benign and malignant nontraumatic cases. Radiology. 1995;194(1):41-48.', doi: LAREDO_DOI },
  { citation: 'Genant HK, Wu CY, van Kuijk C, Nevitt MC. Vertebral fracture assessment using a semiquantitative technique. J Bone Miner Res. 1993;8(9):1137-1148.', doi: GENANT_DOI },
  { citation: 'Westerveld LA, Verlaan JJ, Oner FC. Spinal fractures in patients with ankylosing spinal disorders: a systematic review of the literature on treatment, neurological status and complications. Eur Spine J. 2009;18(2):145-156.', doi: WESTERVELD_DOI },
  { citation: 'Alves OL, Pereira L, Kim SH, Grin A, Shimokawa N, Konovalov N, Zileli M. Upper cervical spine trauma: WFNS Spine Committee recommendations. Neurospine. 2020;17(4):723-736.', doi: ALVES_DOI },
  { citation: 'Wáng YXJ, Diacinti D, Aparisi Gómez MP, Santiago FR, Becce F, Tagliafico AS, Prakash M, Isaac A, Dalili D, Griffith JF, Guglielmi G, Bazzocchi A. Radiological diagnosis of prevalent osteoporotic vertebral fracture on radiographs: an interim consensus from a group of experts of the ESSR osteoporosis and metabolism subcommittee. Skeletal Radiol. 2024;53(12):2563-2574.', doi: WANG_DOI },
  { citation: 'Radcliff KE, Sonagli MA, Rodrigues LM, Sidhu GS, Albert TJ, Vaccaro AR. Does C1 fracture displacement correlate with transverse ligament integrity? Orthop Surg. 2013;5(2):94-99.', doi: RADCLIFF_DOI },
  { citation: 'Woods RO, Inceoglu S, Akpolat YT, Cheng WK, Jabo B, Danisa O. C1 lateral mass displacement and transverse atlantal ligament failure in Jefferson\'s fracture: a biomechanical study of the "rule of Spence". Neurosurgery. 2018;82(2):226-231.', doi: WOODS_DOI },
  { citation: 'Kopparapu S, Mao G, Judy BF, Theodore N. Fifty years later: the "rule of Spence" is finally ready for retirement. J Neurosurg Spine. 2022;37(2):149-156.', doi: KOPPARAPU_DOI },
  { citation: 'Brommeland T, Helseth E, Aarhus M, Moen KG, Dyrskog S, Bergholt B, Olivecrona Z, Jeppesen E. Best practice guidelines for blunt cerebrovascular injury (BCVI). Scand J Trauma Resusc Emerg Med. 2018;26(1):90.', doi: BROMMELAND_DOI },
  { citation: 'Wagner MJ, Hussein I, Low G, Samji KB. Comparing the Denver criteria sets for blunt trauma: a retrospective study of cases in Edmonton, Alberta. Br J Radiol. 2023;96(1148):20221116.', doi: WAGNER_DOI },
  { citation: 'Wáng YXJ, Diacinti D, Yu W, Cheng XG, Nogueira-Barbosa MH, Che-Nordin N, Guglielmi G, Ruiz Santiago F. Semi-quantitative grading and extended semi-quantitative grading for osteoporotic vertebral deformity: a radiographic image database for education and calibration. Ann Transl Med. 2020;8(6):398.', doi: WANG_ATM_DOI },
  { citation: 'Kim DY, Biffl W, Bokhari F, Brakenridge S, Chao E, Claridge JA, Fraser D, Jawa R, Kasotakis G, Kerwin A, Khan U, Kurek S, Plurad D, Robinson BRH, Stassen N, Tesoriero R, Yorkgitis B, Como JJ. Evaluation and management of blunt cerebrovascular injury: a practice management guideline from the Eastern Association for the Surgery of Trauma. J Trauma Acute Care Surg. 2020;88(6):875-887.', doi: KIM_DOI },
  { citation: 'Turaczyk Kolodziej DA, Lung M, Lilienthal M, Galet C, Mani V, Skeete D. Shifting perspectives: equal blunt cerebrovascular risk in low- versus high-energy cervical fracture. J Surg Res. 2024;300:63-70.', doi: TURACZYK_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

const aoTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Injury</th></tr>
      </thead>
      <tbody>
        {aoTypes.map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(aoDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const facetTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Facet</th><th>Injury</th></tr>
      </thead>
      <tbody>
        {aoFacets.map((f) => (
          <tr key={f}><td className="vessel-name">{f}</td><td>{upperFirst(aoFacetDescriptions[f])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the spine CT that arrives with pain, or pain after an injury. The order, the protocol checklist and the pointers from the history are this site's own.</p>
        <p>Check for thin sections with sagittal and coronal reformats, read in bone and soft-tissue windows. Say which part of the spine was covered.</p>
        <p>After a high-energy injury, read every level for fractures, alignment and the tension bands. After a low-energy fall in an older patient, the craniocervical junction and C2 deserve the closest look. With pain and no injury, look hardest at bone quality and at any vertebral collapse (step 6).</p>
        <p>Note an ankylosed spine (diffuse idiopathic skeletal hyperostosis or ankylosing spondylitis) first. Fractures in an ankylosed spine often follow minor trauma, are most common in the cervical spine, and often come with a neurological deficit ({WESTERVELD}).</p>
      </>
    ),
  },
  {
    id: 'ccj',
    title: 'Step 2. Craniocervical junction and C1–C2',
    body: (
      <>
        <p>Measure the basion–dens interval and the atlantodental interval. On CT in adults, 95% had a basion–dens interval less than 8.5 mm and an atlantodental interval less than 2 mm, which the authors propose as normal values ({ROJAS}). Values of 8.5 mm and 2 mm or more raise the question of craniocervical or atlantoaxial injury.</p>
        <p>Look at the occipital condyles and the ring of C1. The rule of Spence is a cadaver-derived criterion historically applied to open-mouth AP radiographs: a combined C1 lateral-mass overhang over C2 (right and left added together) of more than 6.9 mm suggests transverse atlantal ligament disruption ({SPENCE}; {RADCLIFF}). Historically, less than 5.7 mm combined overhang was considered reassuring and more than 6.9 mm concerning for ligament rupture; neither threshold reliably establishes or excludes transverse atlantal ligament injury, and the overhang is not a reliable stand-alone test of ligament integrity ({SPENCE}; {WOODS}; {KOPPARAPU}).</p>
        <p>Do not carry the radiographic threshold over to CT unchanged: measured on CT, the combined overhang did not correlate with ligament integrity on MRI ({RADCLIFF}). The rule misses ruptures, and MRI shows the ligament directly ({DICKMAN}; {ALVES}).</p>
        <p>Give an odontoid fracture its Anderson and D'Alonzo type ({ANDERSON}): type I an oblique fracture through the upper part of the dens, type II at the junction of the dens with the body of C2, type III through the body of C2. In their series type II fractures were the most prone to non-union. Then look at the rest of C2, including the pars interarticularis.</p>
        <ScanFigures images={[spineTraumaScans.jefferson, spineTraumaScans.odontoid, spineTraumaScans.hangman]} />
      </>
    ),
  },
  {
    id: 'subaxial',
    title: 'Step 3. Subaxial cervical spine (C3–C7)',
    body: (
      <>
        <p>Classify each injured level by AO Spine ({VACCARO_CX}). The most severe injury names the type, C over B over A. The AO Spine calculator on this site applies the same rules.</p>
        {aoTable}
        <p>Then each facet joint, right and left ({VACCARO_CX}):</p>
        {facetTable}
        <p>The AO Spine code also carries neurology and modifiers. Neurology comes from the examination, so the report leaves it out; an ankylosed spine is modifier M3 ({VACCARO_CX}).</p>
        <ScanFigures images={[spineTraumaScans.jumpedFacet]} />
      </>
    ),
  },
  {
    id: 'thoracolumbar',
    title: 'Step 4. Thoracolumbar spine',
    body: (
      <>
        <p>Classify each injured level by AO Spine in the same way ({VACCARO_TL}). A burst fracture breaks the posterior wall (A3, A4), a B injury breaks a tension band, and a C injury is displaced. In the thoracolumbar system an ankylosed spine is modifier M2 ({VACCARO_TL}).</p>
        <ScanFigures images={[spineTraumaScans.a1, spineTraumaScans.a4, spineTraumaScans.chance, spineTraumaScans.dishExtension, spineTraumaScans.translation]} />
      </>
    ),
  },
  {
    id: 'vessels',
    title: 'Step 5. Vertebral arteries',
    body: (
      <>
        <p>Some cervical spine injuries put the vertebral arteries at risk. In the expanded Denver screening criteria for blunt cerebrovascular injury, a cervical spine fracture, subluxation or ligamentous injury at any level is a risk factor, C3 and below as much as C1 and C2 ({BURLEW}; {BROMMELAND}; {WAGNER}). The criteria apply to trauma patients with signs or symptoms of blunt cerebrovascular injury, or with a high-energy mechanism and one or more of the risk factors ({BROMMELAND}). An occipital condyle fracture is its own item in the same list, also with a high-energy mechanism ({BROMMELAND}; {WAGNER}). After a high-energy injury with either, say in the report that the expanded Denver screening criterion is met.</p>
        <p>After a low-energy injury the risk-factor route as written does not apply, but that alone does not settle whether CT angiography is needed. The EAST guideline recommends screening CT angiography for high-risk cervical spine injuries and conditionally recommends it for low-risk ones ({KIM}); in one retrospective series of cervical spine fractures, blunt cerebrovascular injury rates were similar after low-energy and high-energy mechanisms ({TURACZYK}). So the report raises CT angiography as a consideration, by injury pattern and local trauma protocol. If the history does not give the mechanism, the report says the mechanism requirement cannot be assessed rather than treating it as low energy (this site's rule).</p>
      </>
    ),
  },
  {
    id: 'collapse',
    title: 'Step 6. Vertebral collapse without major trauma',
    body: (
      <>
        <p>Grade the height loss of a collapsed vertebra by Genant: grade 1 about 20–25%, grade 2 more than 25% up to 40%, grade 3 more than 40% ({GENANT}; {WANG}; {WANG_ATM}). The grade is a visual estimate, a source of disagreement between readers, so a value near a boundary is no more precise than the eye ({WANG}); exactly 40% is grade 2 ({WANG_ATM}).</p>
        <p>Then decide whether the collapse looks osteoporotic or malignant. CT findings significantly more frequent in benign collapse include fracture lines within the cancellous bone and retropulsion of a fragment of the posterior cortex into the canal. Findings significantly more frequent in malignant collapse include destruction of the anterolateral or posterior cortex, destruction of cancellous bone, destruction of a pedicle, a focal paraspinal soft-tissue mass and an epidural mass ({LAREDO}). These are differences in frequency, not proof either way.</p>
      </>
    ),
  },
  {
    id: 'canal',
    title: 'Step 7. Canal and soft tissues',
    body: (
      <>
        <p>Look at the canal for narrowing by a retropulsed fragment or by displacement, and at the prevertebral soft tissues in the neck. This site's note: CT does not show the cord, the discs or the ligaments well, so say so when the question is about them.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    body: (
      <>
        <p>Give each injured level with its type, then the craniocervical measurements that are out of range, then any vertebral artery screening criterion or consideration. List the findings from the top of the spine down.</p>
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
const typeOptions: Option[] = aoTypes.map((t) => ({ value: t, label: `${t}: ${aoDescriptions[t]}` }))
const bodyOptions: Option[] = aoBodies.filter((b) => b !== 'A0').map((b) => ({ value: b, label: `${b}: ${aoDescriptions[b]}` }))
const facetOptions: Option[] = [
  { value: 'none', label: 'No facet injury' },
  ...aoFacets.map((f) => ({ value: f, label: `${f}: ${aoFacetDescriptions[f]}` })),
]

const cervicalCovered = (v: Values) => ['cervical', 'whole'].includes(str(v, 'coverage'))
const thoracolumbarCovered = (v: Values) => ['thoracolumbar', 'whole'].includes(str(v, 'coverage'))
const isBorC = (v: Values, id: string) => /^[BC]/.test(str(v, id))

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain, no injury given' },
    { value: 'low', label: 'Low-energy injury, such as a fall from standing' },
    { value: 'high', label: 'High-energy injury' },
    { value: 'unknown', label: 'Injury, mechanism unknown or not documented' },
  ] },
  coverage: { id: 'coverage', kind: 'choice', label: 'Coverage', required: true, options: [
    { value: 'cervical', label: 'Cervical spine' },
    { value: 'thoracolumbar', label: 'Thoracolumbar spine' },
    { value: 'whole', label: 'Whole spine' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'Thin sections with sagittal and coronal reformats, in bone and soft-tissue windows.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'reformats', label: 'Sagittal and coronal reformats' },
    { value: 'soft', label: 'Soft-tissue window' },
  ] },
  ankylosis: { id: 'ankylosis', kind: 'choice', label: 'Ankylosed spine', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'dish', label: 'Diffuse idiopathic skeletal hyperostosis (DISH)' },
    { value: 'as', label: 'Ankylosing spondylitis' },
  ] },

  bdi: { id: 'bdi', kind: 'number', label: 'Basion–dens interval', unit: 'mm', min: 0, max: 40, step: 0.1, showIf: cervicalCovered },
  adi: { id: 'adi', kind: 'number', label: 'Atlantodental interval', unit: 'mm', min: 0, max: 20, step: 0.1, showIf: cervicalCovered, help: 'Adult values on CT.' },
  condyle: { id: 'condyle', kind: 'choice', label: 'Occipital condyle fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  condyleSide: { id: 'condyle-side', kind: 'choice', label: 'Side', showIf: (v) => cervicalCovered(v) && str(v, 'condyle') === 'present', options: [
    { value: 'right', label: 'Right' },
    { value: 'left', label: 'Left' },
    { value: 'bilateral', label: 'Bilateral' },
  ] },
  c1: { id: 'c1', kind: 'choice', label: 'C1 fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  c1Overhang: { id: 'c1-overhang', kind: 'number', label: 'Combined lateral mass overhang', unit: 'mm', min: 0, max: 30, step: 0.1, showIf: (v) => cervicalCovered(v) && str(v, 'c1') === 'present', help: 'Both lateral masses of C1 over C2, added together.' },
  dens: { id: 'dens', kind: 'choice', label: 'Odontoid fracture', required: true, showIf: cervicalCovered, options: [
    { value: 'none', label: 'None' },
    { value: 'I', label: 'Type I: oblique, through the upper part of the dens' },
    { value: 'II', label: 'Type II: at the junction of the dens with the body of C2' },
    { value: 'III', label: 'Type III: through the body of C2' },
  ] },
  c2: { id: 'c2', kind: 'choice', label: 'Other C2 fracture', required: true, showIf: cervicalCovered, options: nonePresent },
  c2Text: { id: 'c2-text', kind: 'text', label: 'C2 fracture (describe)', placeholder: 'e.g. bilateral pars fractures', showIf: (v) => cervicalCovered(v) && str(v, 'c2') === 'present' },

  cx: { id: 'cx', kind: 'choice', label: 'Subaxial cervical injury', required: true, showIf: cervicalCovered, options: nonePresent },
  cxLevel: { id: 'cx-level', kind: 'text', label: 'Level', placeholder: 'e.g. C5–C6', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present' },
  cxType: { id: 'cx-type', kind: 'choice', label: 'AO Spine type', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', help: 'As in the AO Spine calculator.', options: typeOptions },
  cxBody: { id: 'cx-body', kind: 'choice', label: 'Vertebral body fracture', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present' && isBorC(v, 'cx-type'), options: bodyOptions },
  cxFacetRight: { id: 'cx-facet-right', kind: 'choice', label: 'Right facet', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', options: facetOptions },
  cxFacetLeft: { id: 'cx-facet-left', kind: 'choice', label: 'Left facet', showIf: (v) => cervicalCovered(v) && str(v, 'cx') === 'present', options: facetOptions },

  tl: { id: 'tl', kind: 'choice', label: 'Thoracolumbar injury', required: true, showIf: thoracolumbarCovered, options: nonePresent },
  tlLevel: { id: 'tl-level', kind: 'text', label: 'Level', placeholder: 'e.g. L1', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present' },
  tlType: { id: 'tl-type', kind: 'choice', label: 'AO Spine type', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present', help: 'As in the AO Spine calculator.', options: typeOptions },
  tlBody: { id: 'tl-body', kind: 'choice', label: 'Vertebral body fracture', showIf: (v) => thoracolumbarCovered(v) && str(v, 'tl') === 'present' && isBorC(v, 'tl-type'), options: bodyOptions },

  foramen: { id: 'foramen', kind: 'choice', label: 'Fracture into a foramen transversarium', required: true, showIf: cervicalCovered, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  collapse: { id: 'collapse', kind: 'choice', label: 'Vertebral collapse without major trauma', required: true, options: nonePresent },
  collapseLevel: { id: 'collapse-level', kind: 'text', label: 'Level', placeholder: 'e.g. T12', showIf: (v) => str(v, 'collapse') === 'present' },
  heightLoss: { id: 'height-loss', kind: 'number', label: 'Height loss', unit: '%', min: 0, max: 100, step: 1, showIf: (v) => str(v, 'collapse') === 'present', help: 'Against the expected height of the vertebra.' },
  collapseFeatures: { id: 'collapse-features', kind: 'multi', label: 'Features', showIf: (v) => str(v, 'collapse') === 'present', options: [
    { value: 'lines', label: 'Fracture lines in cancellous bone, no destruction' },
    { value: 'retropulsion', label: 'Retropulsed fragment of the posterior wall' },
    { value: 'cortex', label: 'Destruction of the anterolateral or posterior cortex' },
    { value: 'cancellous', label: 'Destruction of cancellous bone' },
    { value: 'pedicle', label: 'Pedicle destruction' },
    { value: 'epidural', label: 'Epidural mass' },
    { value: 'paraspinal', label: 'Focal paraspinal mass' },
  ] },

  canal: { id: 'canal', kind: 'choice', label: 'Spinal canal', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'narrowed', label: 'Narrowed by a fragment or displacement' },
  ] },
  canalText: { id: 'canal-text', kind: 'text', label: 'Canal narrowing (describe)', placeholder: 'e.g. 40% at L1', showIf: (v) => str(v, 'canal') === 'narrowed' },
  prevertebral: { id: 'prevertebral', kind: 'choice', label: 'Prevertebral soft tissues', showIf: cervicalCovered, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'swollen', label: 'Swollen' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. rib fractures' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-malalignment', label: 'No malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers. */

const MALIGNANT = ['cortex', 'cancellous', 'pedicle', 'epidural', 'paraspinal']
const BENIGN = ['lines', 'retropulsion']

/**
 * T6-1: Genant grade from the height loss; 0 under 20%. Wáng 2020, Table 1: grade 1 "≥20–25%",
 * grade 2 ">25–1/3" and ">1/3–40%", grade 3 ">40%", so exactly 40% is grade 2.
 */
function genantGrade(heightLoss: number): 0 | 1 | 2 | 3 {
  if (heightLoss < 20) return 0
  if (heightLoss <= 25) return 1
  if (heightLoss <= 40) return 2
  return 3
}

type Injury = { region: AoRegion; level: string; type?: AoType; body?: AoBody; facet?: string; modifiers: string[] }

function facetValue(values: Values, id: string): AoFacet | undefined {
  const value = str(values, id)
  return (aoFacets as string[]).includes(value) ? value as AoFacet : undefined
}

/** The injury at one region, only when it is covered and entered. */
function injury(values: Values, region: AoRegion): Injury | undefined {
  const prefix = region === 'subaxial' ? 'cx' : 'tl'
  const covered = region === 'subaxial' ? cervicalCovered(values) : thoracolumbarCovered(values)
  if (!covered || str(values, prefix) !== 'present') return undefined
  const typeValue = str(values, `${prefix}-type`)
  const type = (aoTypes as string[]).includes(typeValue) ? typeValue as AoType : undefined
  const bodyValue = str(values, `${prefix}-body`)
  const body = type && /^[BC]/.test(type) && (aoBodies as string[]).includes(bodyValue) ? bodyValue as AoBody : undefined
  const facet = region === 'subaxial' ? aoFacetCode(facetValue(values, 'cx-facet-right'), facetValue(values, 'cx-facet-left')) : ''
  // AO-10: an ankylosed spine is M3 in the subaxial system and M2 in the thoracolumbar one.
  const ankylosed = !['', 'none'].includes(str(values, 'ankylosis'))
  const modifiers = ankylosed ? [region === 'subaxial' ? 'M3' : 'M2'] : []
  return { region, level: str(values, `${prefix}-level`), ...(type ? { type } : {}), ...(body ? { body } : {}), ...(facet ? { facet } : {}), modifiers }
}

/** The AO Spine code's parts for an injury with a type; the modifiers are added where they are wanted. */
function aoFullOf(item: Injury & { type: AoType }): AoFull {
  return { region: item.region, morphology: { type: item.type, ...(item.body ? { body: item.body } : {}) }, ...(item.facet ? { facet: item.facet } : {}) }
}

function injurySentence(item: Injury): string {
  if (!item.type) return `${item.region === 'subaxial' ? 'Subaxial cervical' : 'Thoracolumbar'} spine injury${item.level ? ` at ${item.level}` : ''}.`
  return aoSentence({ ...aoFullOf({ ...item, type: item.type }), modifiers: item.modifiers }, item.level || undefined)
}

/**
 * T5-1: the expanded Denver risk factors "Complex skull fracture/basilar skull fracture/occipital
 * condyle fracture" and "Cervical spine fracture, subluxation or ligamentous injury at any level"
 * (Brommeland 2018, Table 3; Wagner 2023, Table 1), as far as this form can see them: an occipital
 * condyle fracture, any C1 or C2 fracture, any subaxial injury (C3 included; a subaxial injury is
 * a fracture, a ligamentous injury or a subluxation), and a fracture into a foramen transversarium.
 *
 * Nontraumatic or chronic findings: the form records the cervical items only as fractures or
 * injuries, with no acute or chronic, traumatic or nontraumatic qualifier, so it cannot express a
 * confirmed nontraumatic or chronic abnormality there. The one nontraumatic finding it records,
 * vertebral collapse without major trauma (step 6), is not a reason here.
 */
function denverReasons(values: Values): string[] {
  if (!cervicalCovered(values)) return []
  const cx = injury(values, 'subaxial')
  return [
    str(values, 'condyle') === 'present' && 'occipital condyle fracture',
    str(values, 'c1') === 'present' && 'C1 fracture',
    !['', 'none'].includes(str(values, 'dens')) && 'odontoid fracture',
    str(values, 'c2') === 'present' && 'C2 fracture',
    cx && `subaxial cervical injury${cx.level ? ` at ${cx.level}` : ''}`,
    str(values, 'foramen') === 'yes' && 'fracture into a foramen transversarium',
  ].filter((reason): reason is string => Boolean(reason))
}

type Mechanism = 'high' | 'low' | 'unknown'

/**
 * T5-1: the risk factors count with a "High-energy transfer mechanism" (Brommeland 2018, Table 3).
 * The history field maps onto three states: "High-energy injury" is high; "Low-energy injury" is
 * low; "Injury, mechanism unknown or not documented", "Pain, no injury given" (an injury, if there
 * was one, is not documented) and no answer are unknown. Unknown is never read as low energy: that
 * is this site's safeguard (the author's decision B, 2026-10-29), not a quoted rule.
 */
function mechanism(values: Values): Mechanism {
  const history = str(values, 'history')
  return history === 'high' || history === 'low' ? history : 'unknown'
}

/**
 * T5-1, the author's decision B (2026-10-29): only a high-energy mechanism meets the criterion.
 * After a low-energy injury the output is a separate advisory (the author's wording), so it cannot
 * be read as "CT angiography not indicated": EAST conditionally recommends CT angiography for
 * low-risk cervical spine injuries (Kim 2020), and blunt cerebrovascular injury rates were similar
 * after low- and high-energy cervical fractures (Turaczyk Kolodziej 2024). "Local trauma protocol"
 * is the author's wording, not a source's.
 */
const BCVI_ADVISORY = 'Cervical injury associated with BCVI risk; consider CTA according to injury pattern and local trauma protocol'
const MECHANISM_UNKNOWN = 'Expanded Denver mechanism requirement cannot be assessed'

/** The Denver chip, by mechanism, or undefined when no reason is entered. */
function denverChip(values: Values): string | undefined {
  const reasons = denverReasons(values)
  if (reasons.length === 0) return undefined
  return {
    high: `Expanded Denver screening criterion met: ${reasons.join(', ')}`,
    low: `${BCVI_ADVISORY} (${reasons.join(', ')})`,
    unknown: `${MECHANISM_UNKNOWN}: ${reasons.join(', ')}`,
  }[mechanism(values)]
}

/** The Denver impression line, by mechanism. */
function denverSentence(values: Values): string | undefined {
  const reasons = denverReasons(values)
  if (reasons.length === 0) return undefined
  const list = reasons.join(', ')
  return {
    high: `Meets the expanded Denver screening criteria for blunt cerebrovascular injury (${list}).`,
    low: `Cervical injury associated with blunt cerebrovascular injury risk (${list}); consider CT angiography according to injury pattern and local trauma protocol.`,
    unknown: `Cervical injury (${list}); the mechanism requirement of the expanded Denver screening criteria for blunt cerebrovascular injury cannot be assessed from the history given.`,
  }[mechanism(values)]
}

/** T2-1: the CT normal is less than the limit, so a value at the limit is outside it. */
const atOrOver = (values: Values, id: string, limit: number) => {
  const value = num(values, id)
  return cervicalCovered(values) && value !== undefined && value >= limit ? value : undefined
}

/* Rule chips. */

function deriveCcj(values: Values): Derived[] {
  if (!cervicalCovered(values)) return []
  const out: Derived[] = []
  // T2-1: on CT in adults, 95% had a BDI less than 8.5 mm and an ADI less than 2 mm.
  const bdi = num(values, 'bdi')
  if (bdi !== undefined) out.push(bdi >= 8.5 ? { label: 'Basion–dens', value: '8.5 mm or more', tone: 'warn' } : { label: 'Basion–dens', value: 'Under 8.5 mm', tone: 'good' })
  const adi = num(values, 'adi')
  if (adi !== undefined) out.push(adi >= 2 ? { label: 'Atlantodental', value: '2 mm or more', tone: 'warn' } : { label: 'Atlantodental', value: 'Under 2 mm', tone: 'good' })
  // T2-2, T2-3: the rule of Spence (over 6.9 mm suggests disruption) is cadaver-derived and was
  // applied to radiographs; neither 6.9 nor 5.7 mm establishes or excludes the injury, so no
  // value reads as an intact ligament.
  const overhang = num(values, 'c1-overhang')
  if (str(values, 'c1') === 'present' && overhang !== undefined) {
    out.push(overhang > 6.9
      ? { label: 'Transverse ligament', value: 'Overhang above 6.9 mm: suggests disruption by the rule of Spence, not a reliable test on its own; MRI shows the ligament', tone: 'warn' }
      : { label: 'Transverse ligament', value: 'Overhang within 6.9 mm: does not exclude a ligament injury; MRI shows the ligament' })
  }
  return out
}

function deriveRegion(region: AoRegion) {
  return (values: Values): Derived[] => {
    const item = injury(values, region)
    if (!item) return []
    const out: Derived[] = []
    if (item.type) out.push({ label: 'AO Spine', value: aoCode(aoFullOf({ ...item, type: item.type })), tone: item.type === 'A0' ? 'neutral' : 'warn' })
    // T1-1, AO-10: fractures in an ankylosed spine.
    if (item.modifiers.length > 0) out.push({ label: 'Ankylosed spine', value: `Modifier ${item.modifiers[0]}; fractures here often follow minor trauma`, tone: 'warn' })
    return out
  }
}

function deriveVessels(values: Values): Derived[] {
  const chip = denverChip(values)
  return chip ? [{ label: 'Vertebral arteries', value: chip, tone: 'warn' }] : []
}

function deriveCollapse(values: Values): Derived[] {
  if (str(values, 'collapse') !== 'present') return []
  const out: Derived[] = []
  const loss = num(values, 'height-loss')
  if (loss !== undefined) {
    const grade = genantGrade(loss)
    out.push(grade === 0 ? { label: 'Genant', value: 'Under 20%: below grade 1' } : { label: 'Genant', value: `Grade ${grade}`, tone: 'warn' })
  }
  // T6-2: findings significantly more frequent in malignant or in benign collapse.
  const features = list(values, 'collapse-features')
  if (features.some((f) => MALIGNANT.includes(f))) out.push({ label: 'Collapse', value: 'Findings more frequent in malignant collapse', tone: 'warn' })
  else if (features.some((f) => BENIGN.includes(f))) out.push({ label: 'Collapse', value: 'Findings more frequent in benign (osteoporotic) collapse', tone: 'good' })
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
    choiceLine(values, fields.coverage),
    protocol === 'complete' && 'Technique: thin sections with sagittal and coronal reformats, bone and soft-tissue windows',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.ankylosis),
  ]
}

function cervicalLines(values: Values): (string | false | undefined)[] {
  if (!cervicalCovered(values)) return []
  const bdi = num(values, 'bdi')
  const adi = num(values, 'adi')
  const overhang = num(values, 'c1-overhang')
  const cx = injury(values, 'subaxial')
  return [
    bdi !== undefined && `Basion–dens interval: ${bdi} mm`,
    adi !== undefined && `Atlantodental interval: ${adi} mm`,
    str(values, 'condyle') === 'present' && `Occipital condyle fracture: ${picked(values, fields.condyleSide) || 'present'}`,
    str(values, 'condyle') === 'none' && choiceLine(values, fields.condyle),
    choiceLine(values, fields.c1, str(values, 'c1') === 'present' && overhang !== undefined && `combined lateral mass overhang ${overhang} mm`),
    choiceLine(values, fields.dens),
    choiceLine(values, fields.c2, str(values, 'c2') === 'present' && str(values, 'c2-text')),
    str(values, 'cx') === 'none' && 'Subaxial cervical spine: no injury',
    cx && `Subaxial cervical spine: ${join([cx.level, cx.type && `AO Spine ${cx.type}${cx.body ? ` (${cx.body})` : ''}`, cx.facet], ', ') || 'injury'}`,
    choiceLine(values, fields.foramen),
    choiceLine(values, fields.prevertebral),
  ]
}

function thoracolumbarLines(values: Values): (string | false | undefined)[] {
  if (!thoracolumbarCovered(values)) return []
  const tl = injury(values, 'thoracolumbar')
  return [
    str(values, 'tl') === 'none' && 'Thoracolumbar spine: no injury',
    tl && `Thoracolumbar spine: ${join([tl.level, tl.type && `AO Spine ${tl.type}${tl.body ? ` (${tl.body})` : ''}`], ', ') || 'injury'}`,
  ]
}

function collapseLines(values: Values): (string | false)[] {
  const collapse = str(values, 'collapse')
  const loss = num(values, 'height-loss')
  const features = chosen(values, fields.collapseFeatures)
  return [
    collapse === 'none' && 'Vertebral collapse: none',
    collapse === 'present' && `Vertebral collapse: ${join([str(values, 'collapse-level'), loss !== undefined && `${loss}% height loss`, features.length > 0 && features.join(', ')], ', ') || 'present'}`,
    choiceLine(values, fields.canal, str(values, 'canal') === 'narrowed' && str(values, 'canal-text')),
  ]
}

/* The impression, from the top of the spine down. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const bdi = atOrOver(values, 'bdi', 8.5)
  if (bdi !== undefined) out.push(`Basion–dens interval ${bdi} mm; on CT, normal is less than 8.5 mm.`)
  const adi = atOrOver(values, 'adi', 2)
  if (adi !== undefined) out.push(`Atlantodental interval ${adi} mm; in adults on CT, normal is less than 2 mm.`)
  if (cervicalCovered(values)) {
    if (str(values, 'condyle') === 'present') out.push({ right: 'Right occipital condyle fracture.', left: 'Left occipital condyle fracture.', bilateral: 'Bilateral occipital condyle fractures.' }[str(values, 'condyle-side')] ?? 'Occipital condyle fracture.')
    if (str(values, 'c1') === 'present') {
      const overhang = num(values, 'c1-overhang')
      out.push(`C1 fracture${overhang !== undefined && overhang > 6.9 ? `, with combined lateral mass overhang of ${overhang} mm, above the 6.9 mm of the rule of Spence; the overhang does not reliably establish transverse ligament injury, which MRI shows directly` : ''}.`)
    }
    const dens = str(values, 'dens')
    if (dens && dens !== 'none') out.push(`Odontoid fracture, Anderson and D'Alonzo type ${dens}.`)
    if (str(values, 'c2') === 'present') out.push(`C2 fracture${str(values, 'c2-text') ? `: ${str(values, 'c2-text')}` : ''}.`)
  }
  const cx = injury(values, 'subaxial')
  if (cx) out.push(injurySentence(cx))
  const denver = denverSentence(values)
  if (denver) out.push(denver)
  const tl = injury(values, 'thoracolumbar')
  if (tl) out.push(injurySentence(tl))

  if (str(values, 'collapse') === 'present') {
    const level = str(values, 'collapse-level')
    const loss = num(values, 'height-loss')
    const grade = loss !== undefined ? genantGrade(loss) : 0
    const features = list(values, 'collapse-features')
    const kind = features.some((f) => MALIGNANT.includes(f)) ? ', with findings more frequent in malignant collapse' : features.some((f) => BENIGN.includes(f)) ? ', with findings more frequent in benign (osteoporotic) collapse' : ''
    out.push(`Vertebral collapse${level ? ` of ${level}` : ''}${grade > 0 ? `, Genant grade ${grade} (${loss}% height loss)` : ''}${kind}.`)
  }
  if (str(values, 'canal') === 'narrowed') out.push(`Spinal canal narrowed${str(values, 'canal-text') ? `: ${str(values, 'canal-text')}` : ''}.`)
  if (cervicalCovered(values) && str(values, 'prevertebral') === 'swollen') out.push('Prevertebral soft-tissue swelling.')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

function normalImpression(values: Values): string {
  const where = { cervical: 'cervical spine', thoracolumbar: 'thoracolumbar spine', whole: 'spine' }[str(values, 'coverage')] ?? 'spine'
  return `No acute fracture or malalignment of the ${where}.`
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
    return complete(values) ? `Impression: ${lines(limited, normalImpression(values))}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives)}`
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const cervical = cervicalCovered(values)
  const fractures = [
    cervical && str(values, 'condyle') === 'present' && 'occipital condyle fracture',
    cervical && str(values, 'c1') === 'present' && 'C1 fracture',
    cervical && !['', 'none'].includes(str(values, 'dens')) && 'odontoid fracture',
    cervical && str(values, 'c2') === 'present' && 'C2 fracture',
    injury(values, 'subaxial') && 'subaxial cervical injury',
    injury(values, 'thoracolumbar') && 'thoracolumbar injury',
    str(values, 'collapse') === 'present' && 'vertebral collapse',
  ].filter((item): item is string => Boolean(item))
  const cx = injury(values, 'subaxial')
  const tl = injury(values, 'thoracolumbar')
  const malalignment = [
    atOrOver(values, 'bdi', 8.5) !== undefined && 'basion–dens interval 8.5 mm or more',
    atOrOver(values, 'adi', 2) !== undefined && 'atlantodental interval 2 mm or more',
    cx?.type === 'C' && 'subaxial type C',
    cx && [facetValue(values, 'cx-facet-right'), facetValue(values, 'cx-facet-left')].includes('F4') && 'F4 facet',
    tl?.type === 'C' && 'thoracolumbar type C',
  ].filter((item): item is string => Boolean(item))
  if (negatives.includes('no-fracture') && fractures.length > 0) out.push(`Impression says no fracture, but these are entered: ${fractures.join(', ')}.`)
  if (negatives.includes('no-malalignment') && malalignment.length > 0) out.push(`Impression says no malalignment, but these are entered: ${malalignment.join(', ')}.`)
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...cervicalLines(values),
    ...thoracolumbarLines(values),
    ...collapseLines(values),
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
    teach: <p>Note an ankylosed spine first: its fractures often follow minor trauma and come with neurological deficit ({WESTERVELD}). The protocol checklist and the pointers from the history are this site's own.</p>,
    fields: [fields.history, fields.coverage, fields.protocol, fields.protocolMissing, fields.ankylosis],
  },
  {
    id: 'ccj',
    title: 'Step 2. Craniocervical junction and C1–C2',
    learn: 'ccj',
    teach: <p>On adult CT, 95% had a basion–dens interval less than 8.5 mm and an atlantodental interval less than 2 mm ({ROJAS}). The rule of Spence, cadaver-derived and applied to open-mouth radiographs, takes a combined C1 lateral-mass overhang over 6.9 mm to suggest transverse ligament disruption ({SPENCE}). Neither 6.9 mm nor the older reassuring 5.7 mm reliably establishes or excludes the injury; on CT the overhang did not correlate with the ligament on MRI, which shows it directly ({WOODS}; {KOPPARAPU}; {RADCLIFF}). Odontoid types I–III ({ANDERSON}).</p>,
    fields: [fields.bdi, fields.adi, fields.condyle, fields.condyleSide, fields.c1, fields.c1Overhang, fields.dens, fields.c2, fields.c2Text],
    derive: deriveCcj,
  },
  {
    id: 'subaxial',
    title: 'Step 3. Subaxial cervical spine (C3–C7)',
    learn: 'subaxial',
    teach: (
      <>
        <p>AO Spine types ({VACCARO_CX}):</p>
        {aoTable}
      </>
    ),
    fields: [fields.cx, fields.cxLevel, fields.cxType, fields.cxBody, fields.cxFacetRight, fields.cxFacetLeft],
    derive: deriveRegion('subaxial'),
  },
  {
    id: 'thoracolumbar',
    title: 'Step 4. Thoracolumbar spine',
    learn: 'thoracolumbar',
    teach: <p>The same AO Spine types; an ankylosed spine is modifier M2 here ({VACCARO_TL}).</p>,
    fields: [fields.tl, fields.tlLevel, fields.tlType, fields.tlBody],
    derive: deriveRegion('thoracolumbar'),
  },
  {
    id: 'vessels',
    title: 'Step 5. Vertebral arteries',
    learn: 'vessels',
    teach: <p>Expanded Denver criteria: with a high-energy mechanism, a cervical spine fracture, subluxation or ligamentous injury at any level, or an occipital condyle fracture ({BURLEW}; {BROMMELAND}; {WAGNER}). Signs or symptoms of blunt cerebrovascular injury are a separate criterion ({BROMMELAND}). After a low-energy injury CT angiography is still a consideration: EAST conditionally recommends it for low-risk cervical spine injuries ({KIM}; {TURACZYK}). An unknown mechanism is not read as low energy (this site's rule).</p>,
    fields: [fields.foramen],
    derive: deriveVessels,
  },
  {
    id: 'collapse',
    title: 'Step 6. Vertebral collapse without major trauma',
    learn: 'collapse',
    teach: <p>Genant grades: about 20–25%, over 25% up to 40%, over 40% ({GENANT}; {WANG}; {WANG_ATM}); a visual estimate, so a boundary is approximate. Cortical, cancellous or pedicle destruction, a focal paraspinal mass and an epidural mass were significantly more frequent in malignant collapse ({LAREDO}).</p>,
    fields: [fields.collapse, fields.collapseLevel, fields.heightLoss, fields.collapseFeatures],
    derive: deriveCollapse,
  },
  {
    id: 'canal',
    title: 'Step 7. Canal and soft tissues',
    learn: 'canal',
    teach: <p>Canal narrowing and prevertebral swelling. CT does not show the cord, discs or ligaments well.</p>,
    fields: [fields.canal, fields.canalText, fields.prevertebral],
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    learn: 'impression',
    teach: <p>Each injured level with its type, the measurements out of range, then any vertebral artery criterion, from the top down.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'spine-trauma-ct',
  name: 'Spine CT for pain or injury',
  lede: 'Read a spine CT for pain or injury: the craniocervical junction and C1–C2, AO Spine types in the neck and the thoracolumbar spine, the vertebral arteries, collapse without major trauma, and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, and the claims have been checked against their papers, AO Spine\'s posters or open papers, except one that is still unchecked: whether a facet fragment of exactly 1 cm or 40% of the lateral mass is F1 or F2.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'bdi',
      question: 'On adult CT, below what basion–dens interval did 95% of the population fall?',
      options: ['2 mm', '5 mm', '8.5 mm', '12 mm'],
      answer: 2,
      explanation: <p>On CT in adults, 95% had a basion–dens interval less than 8.5 mm (against 12 mm on radiographs) and an atlantodental interval less than 2 mm ({ROJAS}).</p>,
    },
    {
      id: 'spence',
      question: 'On CT, a C1 burst fracture has a combined lateral-mass overhang of 5 mm. What follows for the transverse ligament?',
      options: ['It is intact, since the total is under 5.7 mm', 'It may still be injured: the overhang does not reliably exclude injury, and MRI shows the ligament directly', 'It is torn', 'Nothing; the rule is for children'],
      answer: 1,
      explanation: <p>The rule of Spence is cadaver-derived and was applied to open-mouth radiographs: historically, less than 5.7 mm was considered reassuring and more than 6.9 mm concerning ({SPENCE}). Neither threshold reliably establishes or excludes transverse atlantal ligament injury ({WOODS}; {KOPPARAPU}), and on CT the overhang did not correlate with the ligament on MRI ({RADCLIFF}).</p>,
    },
    {
      id: 'odontoid',
      question: 'An odontoid fracture runs through the base of the dens. What is the Anderson and D\'Alonzo type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>Type I is through the tip, type II through the base of the dens, type III into the body of C2 ({ANDERSON}).</p>,
    },
    {
      id: 'ao-a3',
      question: 'A thoracolumbar fracture involves the superior endplate and the posterior wall. What is its AO Spine type?',
      options: ['A1', 'A2', 'A3', 'A4'],
      answer: 2,
      explanation: <p>A3 is an incomplete burst fracture, through a single endplate and the posterior wall; A4 involves both endplates ({VACCARO_TL}).</p>,
    },
    {
      id: 'ao-hierarchy',
      question: 'A burst fracture comes with translation of the vertebra above. How is it typed?',
      options: ['A4', 'B2', 'C', 'A4 and B2 together, with no main type'],
      answer: 2,
      explanation: <p>The most severe injury names the type, and translation in any direction is type C ({VACCARO_TL}).</p>,
    },
    {
      id: 'facet',
      question: 'In the subaxial cervical spine, a perched facet is which facet injury?',
      options: ['F1', 'F2', 'F3', 'F4'],
      answer: 3,
      explanation: <p>F4 is pathological subluxation, or a perched or dislocated facet ({VACCARO_CX}).</p>,
    },
    {
      id: 'ankylosed',
      question: 'What does the lesson say about fractures in an ankylosed spine?',
      options: ['They need high-energy trauma', 'They often follow minor trauma, are commonest in the neck, and often come with neurological deficit', 'They are always stable', 'They only occur in the lumbar spine'],
      answer: 1,
      explanation: <p>Fractures in ankylosing spinal disorders often follow minor trauma, are most common in the cervical spine, and often come with a neurological deficit ({WESTERVELD}).</p>,
    },
    {
      id: 'denver',
      question: 'After a high-energy injury, which fracture meets the expanded Denver screening criteria for blunt cerebrovascular injury?',
      options: ['An L1 compression fracture', 'A C3 vertebral body fracture', 'A T12 wedge fracture', 'A sacral fracture'],
      answer: 1,
      explanation: <p>With a high-energy mechanism, a cervical spine fracture, subluxation or ligamentous injury at any level is a risk factor, so a C3 fracture counts ({BURLEW}; {BROMMELAND}; {WAGNER}).</p>,
    },
    {
      id: 'genant',
      question: 'A vertebral body has lost 35% of its height. What is the Genant grade?',
      options: ['Grade 1', 'Grade 2', 'Grade 3', 'Not a fracture'],
      answer: 1,
      explanation: <p>Grade 1 is about 20–25%, grade 2 more than 25% up to 40%, grade 3 more than 40% ({GENANT}; {WANG}; {WANG_ATM}).</p>,
    },
    {
      id: 'malignant',
      question: 'Which CT feature suggests that a vertebral collapse is malignant rather than osteoporotic?',
      options: ['A retropulsed fragment of the posterior wall', 'Fracture lines in cancellous bone without destruction', 'Destruction of a pedicle', 'Loss of height under 20%'],
      answer: 2,
      explanation: <p>Destruction of the cortex, cancellous bone or a pedicle, a focal paraspinal mass and an epidural mass were significantly more frequent in malignant collapse; retropulsion of a posterior cortex fragment and fracture lines in cancellous bone were more frequent in benign collapse ({LAREDO}).</p>,
    },
  ],
}

export function SpineTraumaCtStudyPage() {
  return <StudyPage study={study} />
}
