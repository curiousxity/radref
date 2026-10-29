import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { schatzker, schatzkerDescriptions, schatzkerSentence, schatzkerTypes } from '../logic/schatzker'
import type { DepressionSite, LateralPattern, Plateau, SchatzkerResult } from '../logic/schatzker'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23), but
 * the papers are paywalled except Crema 2011, so only claims whose wording is in an abstract
 * or in open full text are verified. The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-knee-mri-sources.md; rule chips and warnings carry its
 * claim IDs. Schatzker 1979 has no abstract and no DOI, so its citation stays plain text.
 */

/** Schatzker 1979 has no DOI (none on Crossref), so it is cited in plain text. */
const SCHATZKER = 'Schatzker et al., Clin Orthop Relat Res 1979'
const MARKHARDT_DOI = '10.1148/rg.292085078'
const DE_SMET_DOI = '10.2214/AJR.05.1354'
const NGUYEN_DOI = '10.1148/rg.344125202'
const COSTA_DOI = '10.2214/ajr.183.1.1830017'
const SILVERMAN_DOI = '10.1148/radiology.173.2.2798867'
const SANDERS_DOI = '10.1148/radiographics.20.suppl_1.g00oc19s135'
const GENTILI_DOI = '10.1148/radiology.193.3.7972834'
const CAMPOS_DOI = '10.1148/radiology.219.2.r01ma23381'
const SCHWEITZER_DOI = '10.1148/radiology.194.3.7862987'
const RECONDO_DOI = '10.1148/radiographics.20.suppl_1.g00oc02s91'
const ELIAS_DOI = '10.1148/radiol.2253011578'
const CARRILLON_DOI = '10.1148/radiology.216.2.r00au07582'
const CREMA_DOI = '10.1148/rg.311105084'
const RECHT_DOI = '10.2214/AJR.05.0099'
const KIJOWSKI_DOI = '10.1148/radiol.2482071234'
const LECOUVET_DOI = '10.2214/ajr.170.1.9423603'
const BENCARDINO_DOI = '10.1148/rg.297095036'
const CAMPBELL_DOI = '10.2214/ajr.177.2.1770409'
const LEE_DOI = '10.1148/radiology.173.1.2781006'

const MARKHARDT = <Cite doi={MARKHARDT_DOI}>Markhardt et al., Radiographics 2009</Cite>
const DE_SMET = <Cite doi={DE_SMET_DOI}>De Smet and Tuite, AJR 2006</Cite>
const NGUYEN = <Cite doi={NGUYEN_DOI}>Nguyen et al., Radiographics 2014</Cite>
const COSTA = <Cite doi={COSTA_DOI}>Costa et al., AJR 2004</Cite>
const SILVERMAN = <Cite doi={SILVERMAN_DOI}>Silverman et al., Radiology 1989</Cite>
const SANDERS = <Cite doi={SANDERS_DOI}>Sanders et al., Radiographics 2000</Cite>
const GENTILI = <Cite doi={GENTILI_DOI}>Gentili et al., Radiology 1994</Cite>
const CAMPOS = <Cite doi={CAMPOS_DOI}>Campos et al., Radiology 2001</Cite>
const SCHWEITZER = <Cite doi={SCHWEITZER_DOI}>Schweitzer et al., Radiology 1995</Cite>
const RECONDO = <Cite doi={RECONDO_DOI}>Recondo et al., Radiographics 2000</Cite>
const ELIAS = <Cite doi={ELIAS_DOI}>Elias et al., Radiology 2002</Cite>
const CARRILLON = <Cite doi={CARRILLON_DOI}>Carrillon et al., Radiology 2000</Cite>
const CREMA = <Cite doi={CREMA_DOI}>Crema et al., Radiographics 2011</Cite>
const RECHT = <Cite doi={RECHT_DOI}>Recht et al., AJR 2005</Cite>
const KIJOWSKI = <Cite doi={KIJOWSKI_DOI}>Kijowski et al., Radiology 2008</Cite>
const LECOUVET = <Cite doi={LECOUVET_DOI}>Lecouvet et al., AJR 1998</Cite>
const BENCARDINO = <Cite doi={BENCARDINO_DOI}>Bencardino et al., Radiographics 2009</Cite>
const CAMPBELL = <Cite doi={CAMPBELL_DOI}>Campbell et al., AJR 2001</Cite>
const LEE = <Cite doi={LEE_DOI}>Lee et al., Radiology 1989</Cite>

const references: LessonReference[] = [
  { citation: 'Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104.' },
  { citation: 'Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597.', doi: MARKHARDT_DOI },
  { citation: 'De Smet AA, Tuite MJ. Use of the "two-slice-touch" rule for the MRI diagnosis of meniscal tears. AJR Am J Roentgenol. 2006;187(4):911-914.', doi: DE_SMET_DOI },
  { citation: 'Nguyen JC, De Smet AA, Graf BK, Rosas HG. MR imaging-based diagnosis and classification of meniscal tears. Radiographics. 2014;34(4):981-999.', doi: NGUYEN_DOI },
  { citation: 'Costa CR, Morrison WB, Carrino JA. Medial meniscus extrusion on knee MRI: is extent associated with severity of degeneration or type of tear? AJR Am J Roentgenol. 2004;183(1):17-23.', doi: COSTA_DOI },
  { citation: 'Silverman JM, Mink JH, Deutsch AL. Discoid menisci of the knee: MR imaging appearance. Radiology. 1989;173(2):351-354.', doi: SILVERMAN_DOI },
  { citation: 'Sanders TG, Medynski MA, Feller JF, Lawhorn KW. Bone contusion patterns of the knee at MR imaging: footprint of the mechanism of injury. Radiographics. 2000;20 Spec No:S135-S151.', doi: SANDERS_DOI },
  { citation: 'Gentili A, Seeger LL, Yao L, Do HM. Anterior cruciate ligament tear: indirect signs at MR imaging. Radiology. 1994;193(3):835-840.', doi: GENTILI_DOI },
  { citation: 'Campos JC, Chung CB, Lektrakul N, Pedowitz R, Trudell D, Yu J, Resnick D. Pathogenesis of the Segond fracture: anatomic and MR imaging evidence of an iliotibial tract or anterior oblique band avulsion. Radiology. 2001;219(2):381-386.', doi: CAMPOS_DOI },
  { citation: 'Schweitzer ME, Tran D, Deely DM, Hume EL. Medial collateral ligament injuries: evaluation of multiple signs, prevalence and location of associated bone bruises, and assessment with MR imaging. Radiology. 1995;194(3):825-829.', doi: SCHWEITZER_DOI },
  { citation: 'Recondo JA, Salvador E, Villanúa JA, Barrera MC, Gervás C, Alústiza JM. Lateral stabilizing structures of the knee: functional anatomy and injuries assessed with MR imaging. Radiographics. 2000;20 Spec No:S91-S102.', doi: RECONDO_DOI },
  { citation: 'Elias DA, White LM, Fithian DC. Acute lateral patellar dislocation at MR imaging: injury patterns of medial patellar soft-tissue restraints and osteochondral injuries of the inferomedial patella. Radiology. 2002;225(3):736-743.', doi: ELIAS_DOI },
  { citation: 'Carrillon Y, Abidi H, Dejour D, Fantino O, Moyen B, Tran-Minh VA. Patellar instability: assessment on MR images by measuring the lateral trochlear inclination-initial experience. Radiology. 2000;216(2):582-585.', doi: CARRILLON_DOI },
  { citation: 'Crema MD, Roemer FW, Marra MD, Burstein D, Gold GE, Eckstein F, Baum T, Mosher TJ, Carrino JA, Guermazi A. Articular cartilage in the knee: current MR imaging techniques and applications in clinical practice and research. Radiographics. 2011;31(1):37-61.', doi: CREMA_DOI },
  { citation: 'Recht MP, Goodwin DW, Winalski CS, White LM. MRI of articular cartilage: revisiting current status and future directions. AJR Am J Roentgenol. 2005;185(4):899-914.', doi: RECHT_DOI },
  { citation: 'Kijowski R, Blankenbaker DG, Shinki K, Fine JP, Graf BK, De Smet AA. Juvenile versus adult osteochondritis dissecans of the knee: appropriate MR imaging criteria for instability. Radiology. 2008;248(2):571-578.', doi: KIJOWSKI_DOI },
  { citation: 'Lecouvet FE, van de Berg BC, Maldague BE, Lebon CJ, Jamart J, Saleh M, Noël H, Malghem J. Early irreversible osteonecrosis versus transient lesions of the femoral condyles: prognostic value of subchondral bone and marrow changes on MR imaging. AJR Am J Roentgenol. 1998;170(1):71-77.', doi: LECOUVET_DOI },
  { citation: 'Bencardino JT, Beltran J, Feldman MI, Rose DJ. MR imaging of complications of anterior cruciate ligament graft reconstruction. Radiographics. 2009;29(7):2115-2126.', doi: BENCARDINO_DOI },
  { citation: 'Campbell SE, Sanders TG, Morrison WB. MR imaging of meniscal cysts: incidence, location, and clinical significance. AJR Am J Roentgenol. 2001;177(2):409-413.', doi: CAMPBELL_DOI },
  { citation: 'Lee JH, Weissman BN, Nikpoor N, Aliabadi P, Sosman JL. Lipohemarthrosis of the knee: a review of recent experiences. Radiology. 1989;173(1):189-191.', doi: LEE_DOI },
]

const bruiseTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Pattern</th>
          <th>Bone contusions</th>
          <th>Points to</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Pivot shift</td><td>Lateral femoral condyle near the terminal sulcus, and posterolateral tibial plateau</td><td>ACL tear</td></tr>
        <tr><td className="vessel-name">Dashboard</td><td>Anterior proximal tibia</td><td>PCL injury</td></tr>
        <tr><td className="vessel-name">Hyperextension</td><td>"Kissing" contusions of the anterior tibia and the anterior femoral condyles</td><td>ACL, PCL and posterolateral corner</td></tr>
        <tr><td className="vessel-name">Clip (valgus)</td><td>Lateral femoral condyle, sometimes the medial femoral condyle from avulsion</td><td>MCL injury</td></tr>
        <tr><td className="vessel-name">Lateral patellar dislocation</td><td>Inferomedial patella and anterolateral lateral femoral condyle</td><td>Medial patellofemoral ligament injury</td></tr>
      </tbody>
    </table>
  </div>
)

const schatzkerTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Fracture</th>
        </tr>
      </thead>
      <tbody>
        {schatzkerTypes.map((type) => (
          <tr key={type}>
            <td className="vessel-name">{type}</td>
            <td>{schatzkerDescriptions[type].charAt(0).toUpperCase() + schatzkerDescriptions[type].slice(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the global look',
    body: (
      <>
        <p>This lesson is for the knee MRI that arrives with a history of pain and little else, so it walks a fixed search pattern through every compartment. The order, and the protocol checklist below, are this site's own; none of the papers below prescribes them.</p>
        <p>Check that the study has all three planes, fat-suppressed fluid-sensitive imaging (proton density or T2) for marrow edema and tears, and a T1-weighted or non-fat-suppressed proton density sequence for anatomy and marrow.</p>
        <p>Then the joint fluid. Note the size of any effusion, and look for a fat-fluid level in the suprapatellar recess: lipohemarthrosis indicates an intra-articular fracture, so a fat-fluid level sends you looking for one ({LEE}).</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    body: (
      <>
        <h4>Bruise pattern as a pointer to mechanism</h4>
        <p>Where the bone contusions sit is the footprint of how the knee was injured, and so points to which soft tissues to examine hardest ({SANDERS}):</p>
        {bruiseTable}
        <p>With a history of pain only, the bruise pattern may be the best history the study gives you.</p>

        <h4>Tibial plateau fracture</h4>
        <p>When the tibial plateau is broken, give the Schatzker type ({SCHATZKER}; the types as {MARKHARDT} give them). CT and MRI are more accurate than radiographs for Schatzker typing, and surgical plans made from radiographs were changed after CT or MRI ({MARKHARDT}). The Schatzker calculator on this site applies the same rules.</p>
        {schatzkerTable}
        <p>Type III is split by where the depression sits: lateral (IIIA) or central (IIIB) ({MARKHARDT}). Type IV is any fracture of the medial plateau alone, split or depressed, and it carries a risk to the peroneal nerve and popliteal vessels from its fracture-dislocation mechanism. Schatzker counted depression only when it was more than 4 mm, so a lateral split with 4 mm or less is type I ({MARKHARDT}). Dissociation of the metaphysis from the diaphysis makes a fracture type VI, whichever plateaus are broken.</p>

        <h4>Segond fracture</h4>
        <p>A Segond fracture is a small avulsion from the lateral rim of the tibial plateau. It is pulled off by the iliotibial tract or the anterior oblique band of the lateral collateral ligament, and it is associated with ACL tear ({CAMPOS}). A Segond fracture with an ACL called intact deserves a second look at the ACL.</p>

        <h4>Subchondral lesions</h4>
        <p>In the femoral condyles, a subchondral area of low signal on T2-weighted images thicker than 4 mm or longer than 14 mm predicted an irreversible lesion (osteonecrosis); thinner and shorter areas predicted a transient one ({LECOUVET}).</p>

        <h4>Osteochondritis dissecans</h4>
        <p>The MRI signs of an unstable fragment differ by age. In adults, a rim of high T2 signal behind the fragment signals instability. In juvenile lesions, that rim signals instability only when it has a second, outer rim of low T2 signal, or when there are multiple breaks in the subchondral bone plate ({KIJOWSKI}).</p>

        <h4>Variants</h4>
        <p>Record a bipartite patella or a fabella when you see one; this site's report gives each variant its own impression line, so the referrer knows it was seen and judged.</p>
      </>
    ),
  },
  {
    id: 'medial-meniscus',
    title: 'Step 3. Medial meniscus',
    body: (
      <>
        <h4>Is it torn?</h4>
        <p>The two-slice-touch rule: abnormal signal that touches the meniscal surface on two or more images is called a tear. Seen on one image only, the positive predictive value is lower, so call it a possible tear ({DE_SMET}).</p>
        <p>Signal inside the meniscus that does not reach a surface is not a tear.</p>

        <h4>What kind of tear?</h4>
        <p>Tears are described as horizontal, longitudinal (vertical), radial, root, complex, or displaced, which includes the bucket-handle and flap tears ({NGUYEN}). Say where it is: anterior horn, body, posterior horn or root. A displaced fragment matters to the surgeon, so look for it in the notch and in the recesses whenever a meniscus looks short.</p>

        <h4>Extrusion</h4>
        <p>Medial meniscal extrusion of more than 3 mm was associated with severe degeneration, extensive tearing and root tears; extrusion of 3 mm or less was the minor group ({COSTA}). An extruded meniscus sends you back to look hard at the posterior root.</p>
      </>
    ),
  },
  {
    id: 'lateral-meniscus',
    title: 'Step 4. Lateral meniscus',
    body: (
      <>
        <p>Read the lateral meniscus the same way: the two-slice-touch rule ({DE_SMET}), then the tear type and site ({NGUYEN}).</p>
        <h4>Discoid lateral meniscus</h4>
        <p>A discoid lateral meniscus shows continuity between the anterior and posterior horns, the "bow-tie" appearance, on three or more consecutive 5-mm sagittal images ({SILVERMAN}). The criterion assumes 5-mm sections, so count with care on thinner ones. A discoid meniscus is a variant and gets its own impression line here.</p>
      </>
    ),
  },
  {
    id: 'acl',
    title: 'Step 5. Anterior cruciate ligament, native or reconstructed',
    body: (
      <>
        <h4>Native ACL</h4>
        <p>Call the ACL intact, partially torn or completely torn from its fibres. Indirect signs support a tear: a lateral compartment bone contusion, anterior translation of the tibia, uncovering of the posterior horn of the lateral meniscus, and buckling of the PCL ({GENTILI}). Remember the pivot-shift bruise pattern from step 2 ({SANDERS}) and a Segond fracture ({CAMPOS}).</p>
        <h4>Reconstructed ACL</h4>
        <p>After reconstruction, describe the graft (intact, partial tear, complete tear) and look for the complications: arthrofibrosis, including the localised "cyclops" lesion in front of the graft; tunnel widening and tunnel cysts; and graft impingement ({BENCARDINO}).</p>
      </>
    ),
  },
  {
    id: 'pcl',
    title: 'Step 6. Posterior cruciate ligament',
    body: (
      <>
        <p>Call the PCL intact, partially torn or completely torn. An anterior tibial contusion (the dashboard pattern) points to PCL injury ({SANDERS}). The cited papers give no MRI grading of PCL tears, so this step is descriptive.</p>
      </>
    ),
  },
  {
    id: 'mcl',
    title: 'Step 7. Medial collateral ligament',
    body: (
      <>
        <p>Judge the MCL by the integrity of its fibres and by the edema around them; MCL injuries come with bone bruises, whose location Schweitzer and colleagues report ({SCHWEITZER}). The clip (valgus) bruise pattern points to the MCL ({SANDERS}).</p>
        <p>The report here uses descriptive terms (edema around intact fibres, partial tear, complete tear) rather than a numbered grade, because no cited paper here gives an MRI grade.</p>
      </>
    ),
  },
  {
    id: 'lateral-side',
    title: 'Step 8. Lateral side and posterolateral corner',
    body: (
      <>
        <p>The lateral stabilising structures are the lateral collateral ligament, the biceps femoris tendon, the popliteus tendon and the iliotibial tract, with the other posterolateral corner structures ({RECONDO}). Check each by name. The hyperextension bruise pattern puts the posterolateral corner at risk ({SANDERS}).</p>
      </>
    ),
  },
  {
    id: 'extensor',
    title: 'Step 9. Extensor mechanism and patellofemoral joint',
    body: (
      <>
        <p>Check the quadriceps and patellar tendons for tendinosis and tears.</p>
        <h4>Transient lateral patellar dislocation</h4>
        <p>After an acute lateral patellar dislocation, the medial retinaculum was disrupted at its patellar insertion in 76% of examinations; where the femoral origin of the medial patellofemoral ligament (MPFL) could be seen, 49% showed injury; and 70% had an osteochondral injury of the inferomedial patella ({ELIAS}). The bruise pattern (inferomedial patella and anterolateral lateral femoral condyle) may be the only clue that a dislocation happened ({SANDERS}).</p>
        <h4>Trochlear shape</h4>
        <p>A lateral trochlear inclination below 11°, measured on the first axial image that shows trochlear cartilage, was a diagnostic test for patellar instability, with a sensitivity of 93% and a specificity of 87% ({CARRILLON}).</p>
      </>
    ),
  },
  {
    id: 'cartilage',
    title: 'Step 10. Cartilage',
    body: (
      <>
        <p>Go compartment by compartment: patellofemoral, medial and lateral. Describe each lesion by its depth: signal change only, partial thickness under half, partial thickness half or more, or full thickness, and give its site ({CREMA}). For a traumatic defect, give its location, size and depth, and say whether there is a chondral fragment; if a defect is found, look through the joint for a loose fragment ({RECHT}).</p>
      </>
    ),
  },
  {
    id: 'synovium',
    title: 'Step 11. Synovium, cysts and fat pads',
    body: (
      <>
        <p>Look for a popliteal (Baker) cyst and say whether it has ruptured. A parameniscal cyst is usually associated with a meniscal tear ({CAMPBELL}), so a cyst beside a meniscus called intact sends you back to that meniscus. Then note synovitis and the Hoffa fat pad.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 12. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the bruise pattern against the ligaments, a fat-fluid level against the bones, a parameniscal cyst against its meniscus, a Segond fracture against the ACL.</p>
        <p>List the abnormal findings in search-pattern order, then the variants, each on its own line.</p>
      </>
    ),
  },
]

/* The report. Option sets are shared by the fields, the report wording and the rules. */

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (ACL, MPFL) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

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

const tearOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'partial', label: 'Partial tear' },
  { value: 'complete', label: 'Complete tear' },
]
const tendonOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'tendinosis', label: 'Tendinosis' },
  { value: 'partial', label: 'Partial tear' },
  { value: 'complete', label: 'Complete tear' },
]
const normalAbnormal: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'abnormal', label: 'Abnormal' },
]
const noneAbsent: Option[] = [
  { value: 'absent', label: 'Absent' },
  { value: 'present', label: 'Present' },
]
const cartilageOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'signal', label: 'Signal change only' },
  { value: 'partial-low', label: 'Partial thickness, under half' },
  { value: 'partial-high', label: 'Partial thickness, half or more' },
  { value: 'full', label: 'Full thickness' },
]
const meniscusStatusOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'intrasubstance', label: 'Signal not reaching a surface' },
  { value: 'tear', label: 'Tear' },
]
const meniscusTearTypes: Option[] = [
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'longitudinal', label: 'Longitudinal' },
  { value: 'radial', label: 'Radial' },
  { value: 'root', label: 'Root' },
  { value: 'complex', label: 'Complex' },
  { value: 'displaced', label: 'Displaced fragment (bucket-handle or flap)' },
]
const meniscusSites: Option[] = [
  { value: 'anterior', label: 'Anterior horn' },
  { value: 'body', label: 'Body' },
  { value: 'posterior', label: 'Posterior horn' },
  { value: 'root', label: 'Root' },
]

/** K2-1 to K2-5: what each bruise pattern points to. */
const bruisePoints: Record<string, string> = {
  pivot: 'ACL tear (pivot shift)',
  dashboard: 'PCL injury (dashboard)',
  hyperextension: 'ACL, PCL and posterolateral corner (hyperextension)',
  clip: 'MCL injury (clip)',
  patellar: 'Lateral patellar dislocation: check the MPFL',
}

function meniscusFields(prefix: 'mm' | 'lm', name: string) {
  const isTear = (v: Values) => str(v, prefix) === 'tear'
  return {
    status: { id: prefix, kind: 'choice', label: name, required: true, options: meniscusStatusOptions } satisfies Field,
    images: { id: `${prefix}-images`, kind: 'number', label: 'Images with signal touching the surface', min: 0, step: 1, showIf: isTear, help: 'Two or more: tear. One: possible tear.' } satisfies Field,
    type: { id: `${prefix}-type`, kind: 'choice', label: 'Tear type', options: meniscusTearTypes, showIf: isTear } satisfies Field,
    sites: { id: `${prefix}-sites`, kind: 'multi', label: 'Tear site', options: meniscusSites, showIf: isTear } satisfies Field,
  }
}

const mm = meniscusFields('mm', 'Medial meniscus')
const lm = meniscusFields('lm', 'Lateral meniscus')

const plateauInvolved = (v: Values) => ['lateral', 'medial', 'both'].includes(str(v, 'plateau'))

const fields = {
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'All three planes, fat-suppressed PD or T2, and a T1 or non-fat-suppressed PD.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'planes', label: 'All three planes' },
    { value: 'fs', label: 'Fat-suppressed PD or T2' },
    { value: 't1', label: 'A T1 or non-fat-suppressed PD sequence' },
  ] },
  effusion: { id: 'effusion', kind: 'choice', label: 'Joint effusion', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'large', label: 'Large' },
  ] },
  fatFluid: { id: 'fat-fluid', kind: 'choice', label: 'Fat-fluid level', required: true, options: noneAbsent, help: 'Lipohemarthrosis indicates an intra-articular fracture.' },
  marrow: { id: 'marrow', kind: 'choice', label: 'Bone marrow edema', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },

  bruisePattern: { id: 'bruise-pattern', kind: 'choice', label: 'Bruise pattern', showIf: (v) => str(v, 'marrow') === 'present', options: [
    { value: 'pivot', label: 'Lateral femoral condyle and posterolateral tibial plateau' },
    { value: 'dashboard', label: 'Anterior proximal tibia' },
    { value: 'hyperextension', label: 'Anterior tibia and anterior femoral condyles' },
    { value: 'clip', label: 'Lateral femoral condyle (valgus)' },
    { value: 'patellar', label: 'Inferomedial patella and anterolateral lateral femoral condyle' },
    { value: 'other', label: 'Other, or no specific pattern' },
  ] },
  bmeSite: { id: 'bme-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. lateral femoral condyle', showIf: (v) => str(v, 'marrow') === 'present' },
  fracture: { id: 'fracture', kind: 'choice', label: 'Fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  fractureSite: { id: 'fracture-site', kind: 'text', label: 'Fracture site', placeholder: 'e.g. lateral tibial plateau', showIf: (v) => str(v, 'fracture') === 'present' },
  plateau: { id: 'plateau', kind: 'choice', label: 'Tibial plateau involved', showIf: (v) => str(v, 'fracture') === 'present', help: 'Gives the Schatzker type, as in the Schatzker calculator.', options: [
    { value: 'no', label: 'No' },
    { value: 'lateral', label: 'Lateral only' },
    { value: 'medial', label: 'Medial only' },
    { value: 'both', label: 'Both' },
  ] },
  plateauPattern: { id: 'plateau-pattern', kind: 'choice', label: 'Lateral plateau pattern', showIf: (v) => str(v, 'fracture') === 'present' && str(v, 'plateau') === 'lateral', options: [
    { value: 'split', label: 'Split only' },
    { value: 'split-depression', label: 'Split with depression' },
    { value: 'depression', label: 'Depression only' },
  ] },
  plateauDepressionSite: { id: 'plateau-depression-site', kind: 'choice', label: 'Where is the depression', showIf: (v) => str(v, 'fracture') === 'present' && str(v, 'plateau') === 'lateral' && str(v, 'plateau-pattern') === 'depression', help: 'Lateral is type IIIA, central type IIIB.', options: [
    { value: 'lateral', label: 'Lateral (IIIA)' },
    { value: 'central', label: 'Central (IIIB)' },
  ] },
  plateauDissociation: { id: 'plateau-dissociation', kind: 'choice', label: 'Metaphysis separated from the diaphysis', showIf: (v) => str(v, 'fracture') === 'present' && plateauInvolved(v), options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  plateauDepression: { id: 'plateau-depression', kind: 'number', label: 'Articular depression', unit: 'mm', min: 0, step: 1, showIf: (v) => str(v, 'fracture') === 'present' && plateauInvolved(v) },
  segond: { id: 'segond', kind: 'choice', label: 'Segond fracture', required: true, options: noneAbsent, help: 'Lateral tibial rim avulsion; associated with ACL tear.' },
  subchondral: { id: 'subchondral', kind: 'choice', label: 'Subchondral low-signal area (condyles)', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  subchondralThickness: { id: 'subchondral-thickness', kind: 'number', label: 'Thickness on T2', unit: 'mm', min: 0, step: 0.5, showIf: (v) => str(v, 'subchondral') === 'present', help: 'Over 4 mm thick or over 14 mm long predicted an irreversible lesion.' },
  subchondralLength: { id: 'subchondral-length', kind: 'number', label: 'Length on T2', unit: 'mm', min: 0, step: 0.5, showIf: (v) => str(v, 'subchondral') === 'present' },
  subchondralSite: { id: 'subchondral-site', kind: 'text', label: 'Subchondral lesion site', placeholder: 'e.g. medial femoral condyle', showIf: (v) => str(v, 'subchondral') === 'present' },
  ocd: { id: 'ocd', kind: 'choice', label: 'Osteochondritis dissecans', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  ocdSite: { id: 'ocd-site', kind: 'text', label: 'Lesion site', placeholder: 'e.g. lateral aspect of the medial femoral condyle', showIf: (v) => str(v, 'ocd') === 'present' },
  ocdAge: { id: 'ocd-age', kind: 'choice', label: 'Lesion type', showIf: (v) => str(v, 'ocd') === 'present', help: 'Instability signs differ between juvenile and adult lesions.', options: [
    { value: 'juvenile', label: 'Juvenile (open physes)' },
    { value: 'adult', label: 'Adult' },
  ] },
  ocdSigns: { id: 'ocd-signs', kind: 'multi', label: 'Signs around the fragment', showIf: (v) => str(v, 'ocd') === 'present', options: [
    { value: 'rim', label: 'High T2 signal rim behind the fragment' },
    { value: 'outer-rim', label: 'Second, outer low T2 signal rim' },
    { value: 'breaks', label: 'Multiple breaks in the subchondral bone plate' },
    { value: 'displaced', label: 'Fragment displaced' },
  ] },
  boneVariants: { id: 'bone-variants', kind: 'multi', label: 'Variants', help: 'Each gets its own impression line.', options: [
    { value: 'bipartite', label: 'Bipartite patella' },
    { value: 'fabella', label: 'Fabella' },
  ] },

  mmExtrusion: { id: 'mm-extrusion', kind: 'number', label: 'Medial meniscal extrusion', unit: 'mm', min: 0, step: 0.5, help: 'Over 3 mm: associated with severe degeneration, extensive tearing and root tears.' },
  lmDiscoid: { id: 'lm-discoid', kind: 'choice', label: 'Discoid lateral meniscus', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  lmDiscoidImages: { id: 'lm-discoid-images', kind: 'number', label: 'Consecutive 5-mm sagittal images with a "bow-tie"', min: 0, step: 1, showIf: (v) => str(v, 'lm-discoid') === 'yes', help: 'Three or more: discoid.' },

  aclStatus: { id: 'acl-status', kind: 'choice', label: 'ACL', required: true, options: [
    { value: 'native', label: 'Native' },
    { value: 'reconstructed', label: 'Reconstructed' },
  ] },
  acl: { id: 'acl', kind: 'choice', label: 'Native ACL', required: true, options: tearOptions, showIf: (v) => str(v, 'acl-status') === 'native' },
  aclSigns: { id: 'acl-signs', kind: 'multi', label: 'Indirect signs', showIf: (v) => str(v, 'acl-status') === 'native', options: [
    { value: 'contusion', label: 'Lateral compartment bone contusion' },
    { value: 'translation', label: 'Anterior tibial translation' },
    { value: 'uncovered', label: 'Uncovered posterior horn of the lateral meniscus' },
    { value: 'buckled', label: 'Buckled PCL' },
  ] },
  graft: { id: 'graft', kind: 'choice', label: 'ACL graft', required: true, options: tearOptions, showIf: (v) => str(v, 'acl-status') === 'reconstructed' },
  graftFindings: { id: 'graft-findings', kind: 'multi', label: 'Graft complications', showIf: (v) => str(v, 'acl-status') === 'reconstructed', options: [
    { value: 'cyclops', label: 'Localised anterior arthrofibrosis (cyclops lesion)' },
    { value: 'arthrofibrosis', label: 'Diffuse arthrofibrosis' },
    { value: 'widening', label: 'Tunnel widening' },
    { value: 'cyst', label: 'Tunnel cyst' },
    { value: 'impingement', label: 'Graft impingement' },
  ] },

  pcl: { id: 'pcl', kind: 'choice', label: 'PCL', required: true, options: tearOptions },
  mcl: { id: 'mcl', kind: 'choice', label: 'MCL', required: true, options: [
    { value: 'intact', label: 'Intact' },
    { value: 'edema', label: 'Edema around intact fibres' },
    { value: 'partial', label: 'Partial tear' },
    { value: 'complete', label: 'Complete tear' },
  ] },

  lcl: { id: 'lcl', kind: 'choice', label: 'LCL', required: true, options: tearOptions },
  biceps: { id: 'biceps', kind: 'choice', label: 'Biceps femoris tendon', required: true, options: tendonOptions },
  popliteus: { id: 'popliteus', kind: 'choice', label: 'Popliteus tendon', required: true, options: tendonOptions },
  itb: { id: 'itb', kind: 'choice', label: 'Iliotibial tract', required: true, options: normalAbnormal },
  itbText: { id: 'itb-text', kind: 'text', label: 'Iliotibial tract (describe)', showIf: (v) => str(v, 'itb') === 'abnormal' },

  quadriceps: { id: 'quadriceps', kind: 'choice', label: 'Quadriceps tendon', required: true, options: tendonOptions },
  patellarTendon: { id: 'patellar-tendon', kind: 'choice', label: 'Patellar tendon', required: true, options: tendonOptions },
  mpfl: { id: 'mpfl', kind: 'choice', label: 'MPFL', required: true, options: tearOptions },
  mpflSite: { id: 'mpfl-site', kind: 'choice', label: 'MPFL injury site', showIf: (v) => ['partial', 'complete'].includes(str(v, 'mpfl')), options: [
    { value: 'patellar', label: 'Patellar attachment' },
    { value: 'mid', label: 'Mid substance' },
    { value: 'femoral', label: 'Femoral attachment' },
  ] },
  trochlea: { id: 'trochlea', kind: 'number', label: 'Lateral trochlear inclination', unit: '°', min: 0, step: 1, help: 'First axial image with trochlear cartilage. Below 11°: the threshold for patellar instability.' },

  cartilagePf: { id: 'cartilage-pf', kind: 'choice', label: 'Patellofemoral cartilage', required: true, options: cartilageOptions },
  cartilageMedial: { id: 'cartilage-medial', kind: 'choice', label: 'Medial compartment cartilage', required: true, options: cartilageOptions },
  cartilageLateral: { id: 'cartilage-lateral', kind: 'choice', label: 'Lateral compartment cartilage', required: true, options: cartilageOptions },
  cartilageSite: { id: 'cartilage-site', kind: 'text', label: 'Where are the defects', placeholder: 'e.g. central weight-bearing medial femoral condyle, 8 mm' },

  baker: { id: 'baker', kind: 'choice', label: 'Popliteal (Baker) cyst', required: true, options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
    { value: 'ruptured', label: 'Ruptured' },
  ] },
  parameniscal: { id: 'parameniscal', kind: 'choice', label: 'Parameniscal cyst', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'medial', label: 'Medial' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'both', label: 'Both' },
  ] },
  synovitis: { id: 'synovitis', kind: 'choice', label: 'Synovitis', required: true, options: noneAbsent },
  hoffa: { id: 'hoffa', kind: 'choice', label: 'Hoffa fat pad', required: true, options: normalAbnormal },
  hoffaText: { id: 'hoffa-text', kind: 'text', label: 'Hoffa fat pad (describe)', showIf: (v) => str(v, 'hoffa') === 'abnormal' },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. soft-tissue mass, loose body' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-meniscal-tear', label: 'No meniscal tear' },
    { value: 'no-ligament', label: 'No ligament injury' },
    { value: 'no-cartilage', label: 'No cartilage defect' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

function plateauResult(values: Values): SchatzkerResult | undefined {
  if (str(values, 'fracture') !== 'present' || !plateauInvolved(values)) return undefined
  const dissociation = str(values, 'plateau-dissociation')
  return schatzker({
    plateau: str(values, 'plateau') as Plateau,
    pattern: (str(values, 'plateau-pattern') || undefined) as LateralPattern | undefined,
    depressionSite: (str(values, 'plateau-depression-site') || undefined) as DepressionSite | undefined,
    dissociation: dissociation === '' ? undefined : dissociation === 'yes',
  })
}

/** K2-7: 'irreversible', 'transient', or '' while the measurements do not decide it. */
function subchondralPrognosis(values: Values): 'irreversible' | 'transient' | '' {
  if (str(values, 'subchondral') !== 'present') return ''
  const thickness = num(values, 'subchondral-thickness')
  const length = num(values, 'subchondral-length')
  if ((thickness !== undefined && thickness > 4) || (length !== undefined && length > 14)) return 'irreversible'
  if (thickness !== undefined && length !== undefined) return 'transient'
  return ''
}

/** K3-1: 'tear', 'possible', or '' when no image count is entered. */
function twoSliceTouch(values: Values, prefix: 'mm' | 'lm'): 'tear' | 'possible' | '' {
  if (str(values, prefix) !== 'tear') return ''
  const images = num(values, `${prefix}-images`)
  if (images === undefined || images < 1) return ''
  return images >= 2 ? 'tear' : 'possible'
}

/** K4-1: true when the discoid criterion is met, false when not, undefined without a count. */
function discoidMet(values: Values): boolean | undefined {
  if (str(values, 'lm-discoid') !== 'yes') return undefined
  const images = num(values, 'lm-discoid-images')
  return images === undefined ? undefined : images >= 3
}

/** The variants marked present, each as its own impression sentence. */
function variantSentences(values: Values): string[] {
  const out: string[] = []
  if (str(values, 'lm-discoid') === 'yes') out.push('Discoid lateral meniscus (anatomical variant).')
  for (const label of chosen(values, fields.boneVariants)) out.push(`${upperFirst(label)} (anatomical variant).`)
  return out
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

const nativeAcl = (values: Values) => str(values, 'acl-status') === 'native'

const cartilageRegions: [string, string][] = [['cartilage-pf', 'patellofemoral'], ['cartilage-medial', 'medial compartment'], ['cartilage-lateral', 'lateral compartment']]

/* Rule chips. */

function deriveTechnique(values: Values): Derived[] {
  // K1-1: lipohemarthrosis indicates an intra-articular fracture.
  return str(values, 'fat-fluid') === 'present' ? [{ label: 'Fat-fluid level', value: 'Indicates an intra-articular fracture', tone: 'warn' }] : []
}

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  const points = bruisePoints[str(values, 'bruise-pattern')] as string | undefined
  if (points) out.push({ label: 'Bruise pattern points to', value: points, tone: 'warn' })
  const plateau = plateauResult(values)
  if (plateau) out.push({ label: 'Schatzker', value: `Type ${plateau.type}`, tone: 'warn' })
  const prognosis = subchondralPrognosis(values)
  if (prognosis === 'irreversible') out.push({ label: 'Subchondral lesion', value: 'Predicts an irreversible lesion (> 4 mm thick or > 14 mm long)', tone: 'warn' })
  if (prognosis === 'transient') out.push({ label: 'Subchondral lesion', value: 'Predicts a transient lesion (≤ 4 mm thick and ≤ 14 mm long)', tone: 'good' })
  if (str(values, 'segond') === 'present') out.push({ label: 'Segond fracture', value: 'Associated with ACL tear', tone: 'warn' })
  return out
}

function meniscusChip(values: Values, prefix: 'mm' | 'lm'): Derived[] {
  const rule = twoSliceTouch(values, prefix)
  if (rule === 'tear') return [{ label: 'Two-slice-touch', value: 'Tear (two or more images)', tone: 'warn' }]
  if (rule === 'possible') return [{ label: 'Two-slice-touch', value: 'Possible tear (one image only)' }]
  return []
}

function deriveMedialMeniscus(values: Values): Derived[] {
  const out = meniscusChip(values, 'mm')
  const extrusion = num(values, 'mm-extrusion')
  // K3-3: Costa's "Substantial medial meniscus extrusion (> 3 mm)"; 3 mm itself is in the minor group.
  if (extrusion !== undefined && extrusion > 3) {
    out.push({ label: 'Extrusion', value: '> 3 mm: associated with severe degeneration, extensive tearing and root tears', tone: 'warn' })
  }
  return out
}

function deriveLateralMeniscus(values: Values): Derived[] {
  const out = meniscusChip(values, 'lm')
  const met = discoidMet(values)
  if (met === true) out.push({ label: 'Discoid', value: 'Criterion met (3 or more consecutive images)' })
  if (met === false) out.push({ label: 'Discoid', value: 'Criterion not met (fewer than 3 consecutive images)', tone: 'warn' })
  return out
}

function deriveExtensor(values: Values): Derived[] {
  const inclination = num(values, 'trochlea')
  // K9-2: Carrillon, "Below a threshold value fixed at 11 degrees, LTI appears to be an
  // excellent diagnostic test of PI" (patellar instability).
  if (inclination === undefined) return []
  return inclination < 11
    ? [{ label: 'Lateral trochlear inclination', value: 'Below the 11° threshold for patellar instability', tone: 'warn' }]
    : [{ label: 'Lateral trochlear inclination', value: 'Not below the 11° threshold for patellar instability', tone: 'good' }]
}

/* Report lines, one per entered finding. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  const fatFluid = str(values, 'fat-fluid')
  return [
    protocol === 'complete' && 'Technique: three planes, fat-suppressed PD/T2 and T1 or non-fat-suppressed PD imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion),
    fatFluid === 'absent' && 'Fat-fluid level: none',
    fatFluid === 'present' && 'Fat-fluid level: present (lipohemarthrosis)',
  ]
}

function boneLines(values: Values): (string | false)[] {
  const marrow = str(values, 'marrow')
  const site = str(values, 'bme-site')
  const pattern = str(values, 'bruise-pattern')
  const fracture = str(values, 'fracture')
  const plateau = plateauResult(values)
  const depression = num(values, 'plateau-depression')
  const subchondral = str(values, 'subchondral')
  const thickness = num(values, 'subchondral-thickness')
  const length = num(values, 'subchondral-length')
  const ocd = str(values, 'ocd')
  const ocdSigns = chosen(values, fields.ocdSigns)
  return [
    marrow === 'none' && 'Bone marrow: no edema',
    marrow === 'present' && `Bone marrow: ${join([
      `edema${site ? ` in ${site}` : ''}`,
      pattern && pattern !== 'other' && `pattern: ${picked(values, fields.bruisePattern)}`,
    ])}`,
    fracture === 'none' && 'Fracture: none',
    fracture === 'present' && `Fracture: ${join([
      str(values, 'fracture-site'),
      plateau && schatzkerSentence(plateau, depression).replace(/\.$/, '').replace(/^Tibial/, 'tibial'),
    ]) || 'present'}`,
    str(values, 'segond') === 'present' && 'Segond fracture: present',
    subchondral === 'none' && 'Subchondral lesion: none',
    subchondral === 'present' && `Subchondral low-signal area: ${join([
      str(values, 'subchondral-site'),
      thickness !== undefined && `${thickness} mm thick`,
      length !== undefined && `${length} mm long`,
    ], ', ') || 'present'}`,
    ocd === 'none' && 'Osteochondritis dissecans: none',
    ocd === 'present' && `Osteochondritis dissecans: ${join([
      str(values, 'ocd-site'),
      picked(values, fields.ocdAge),
      ocdSigns.length > 0 && ocdSigns.join(', '),
    ]) || 'present'}`,
  ]
}

/** "radial tear", "tear with a displaced fragment (bucket-handle or flap)", or "tear". */
function tearWords(values: Values, prefix: 'mm' | 'lm'): string {
  const type = str(values, `${prefix}-type`)
  if (type === 'displaced') return 'tear with a displaced fragment (bucket-handle or flap)'
  return type ? `${picked(values, { id: `${prefix}-type`, options: meniscusTearTypes })} tear` : 'tear'
}

function meniscusLine(values: Values, prefix: 'mm' | 'lm', name: string): string {
  const status = str(values, prefix)
  if (!status) return ''
  if (status !== 'tear') return `${name}: ${picked(values, { id: prefix, options: meniscusStatusOptions })}`
  const images = num(values, `${prefix}-images`)
  const sites = chosen(values, { id: `${prefix}-sites`, options: meniscusSites })
  return `${name}: ${join([
    tearWords(values, prefix),
    sites.length > 0 && sites.join(', '),
    images !== undefined && `seen on ${images} image${images === 1 ? '' : 's'}`,
  ])}`
}

function lateralMeniscusLines(values: Values): (string | false)[] {
  const discoid = str(values, 'lm-discoid')
  const images = num(values, 'lm-discoid-images')
  return [
    meniscusLine(values, 'lm', 'Lateral meniscus'),
    discoid === 'yes' && `Discoid lateral meniscus${images !== undefined ? `: bow-tie on ${images} consecutive sagittal images` : ''}`,
  ]
}

function aclLines(values: Values): (string | false)[] {
  const status = str(values, 'acl-status')
  const signs = chosen(values, fields.aclSigns)
  const graftFindings = chosen(values, fields.graftFindings)
  return [
    status === 'native' && choiceLine(values, { ...fields.acl, label: 'ACL' }),
    status === 'native' && signs.length > 0 && `ACL indirect signs: ${signs.join(', ')}`,
    status === 'reconstructed' && `ACL graft: ${join([picked(values, fields.graft), graftFindings.length > 0 && graftFindings.join(', ')]) || 'reconstructed'}`,
  ]
}

function synoviumLines(values: Values): (string | false)[] {
  const parameniscal = str(values, 'parameniscal')
  const hoffa = str(values, 'hoffa')
  return [
    choiceLine(values, fields.baker),
    parameniscal === 'none' && 'Parameniscal cyst: none',
    parameniscal && parameniscal !== 'none' && `Parameniscal cyst: ${parameniscal === 'both' ? 'medial and lateral' : parameniscal}`,
    choiceLine(values, fields.synovitis),
    hoffa === 'normal' && 'Hoffa fat pad: normal',
    hoffa === 'abnormal' && `Hoffa fat pad: ${join(['abnormal', str(values, 'hoffa-text')], ', ')}`,
  ]
}

/* The impression: one sentence per abnormal finding, in search-pattern order, then the variants. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const effusion = str(values, 'effusion')
  if (effusion === 'moderate' || effusion === 'large') out.push(`${upperFirst(effusion)} joint effusion.`)
  if (str(values, 'fat-fluid') === 'present') out.push('Lipohemarthrosis, indicating an intra-articular fracture.')
  if (str(values, 'marrow') === 'present') {
    const points = bruisePoints[str(values, 'bruise-pattern')] as string | undefined
    const site = str(values, 'bme-site')
    out.push(`Bone marrow edema${site ? ` in ${site}` : ''}${points ? `; the pattern points to ${lowerFirst(points)}` : ''}.`)
  }
  if (str(values, 'fracture') === 'present') {
    const plateau = plateauResult(values)
    const site = str(values, 'fracture-site')
    out.push(plateau ? schatzkerSentence(plateau, num(values, 'plateau-depression')) : `Fracture${site ? `: ${site}` : ''}.`)
  }
  if (str(values, 'segond') === 'present') out.push('Segond fracture.')
  if (str(values, 'subchondral') === 'present') {
    const prognosis = subchondralPrognosis(values)
    const site = str(values, 'subchondral-site')
    out.push(`Subchondral low-signal area${site ? ` in the ${site}` : ''}${prognosis === 'irreversible' ? ', with dimensions that predict an irreversible lesion' : prognosis === 'transient' ? ', with dimensions that predict a transient lesion' : ''}.`)
  }
  if (str(values, 'ocd') === 'present') {
    const site = str(values, 'ocd-site')
    out.push(`Osteochondritis dissecans${site ? `, ${site}` : ''}.`)
  }

  for (const [prefix, name] of [['mm', 'medial'], ['lm', 'lateral']] as const) {
    if (str(values, prefix) !== 'tear') continue
    const possible = twoSliceTouch(values, prefix) === 'possible'
    const type = str(values, `${prefix}-type`)
    const typeWord = type && type !== 'displaced' ? `${picked(values, { id: `${prefix}-type`, options: meniscusTearTypes })} ` : ''
    const phrase = `${typeWord}tear of the ${name} meniscus${type === 'displaced' ? ' with a displaced fragment (bucket-handle or flap)' : ''}`
    out.push(possible ? `Possible ${phrase} (signal touching the surface on one image only).` : `${upperFirst(phrase)}.`)
  }
  const extrusion = num(values, 'mm-extrusion')
  if (extrusion !== undefined && extrusion > 3) out.push(`Medial meniscal extrusion ${extrusion} mm.`)

  if (nativeAcl(values)) {
    const acl = str(values, 'acl')
    if (acl === 'partial' || acl === 'complete') out.push(`${upperFirst(picked(values, fields.acl))} of the ACL.`)
  } else if (str(values, 'acl-status') === 'reconstructed') {
    const graft = str(values, 'graft')
    if (graft === 'partial' || graft === 'complete') out.push(`${upperFirst(picked(values, fields.graft))} of the ACL graft.`)
    const complications = chosen(values, fields.graftFindings)
    if (complications.length > 0) out.push(`ACL graft: ${complications.join(', ')}.`)
  }
  for (const [id, name] of [['pcl', 'PCL'], ['lcl', 'LCL'], ['mpfl', 'MPFL']] as const) {
    const status = str(values, id)
    if (status === 'partial' || status === 'complete') out.push(`${upperFirst(status)} tear of the ${name}.`)
  }
  const mcl = str(values, 'mcl')
  if (mcl === 'edema') out.push('Edema around an intact MCL.')
  if (mcl === 'partial' || mcl === 'complete') out.push(`${upperFirst(mcl)} tear of the MCL.`)
  for (const [id, name] of [['biceps', 'Biceps femoris tendon'], ['popliteus', 'Popliteus tendon'], ['quadriceps', 'Quadriceps tendon'], ['patellar-tendon', 'Patellar tendon']] as const) {
    const status = str(values, id)
    if (status && status !== 'normal') out.push(`${name}: ${picked(values, { id, options: tendonOptions })}.`)
  }
  if (str(values, 'itb') === 'abnormal') out.push(`Iliotibial tract: ${str(values, 'itb-text') || 'abnormal'}.`)
  const inclination = num(values, 'trochlea')
  if (inclination !== undefined && inclination < 11) out.push(`Lateral trochlear inclination ${inclination}°, below the 11° threshold for patellar instability.`)

  const cartilage = cartilageRegions
    .filter(([id]) => !['', 'normal'].includes(str(values, id)))
    .map(([id, name]) => `${name}: ${picked(values, { id, options: cartilageOptions })}`)
  if (cartilage.length > 0) out.push(`Cartilage: ${cartilage.join('; ')}.`)

  const baker = str(values, 'baker')
  if (baker === 'present') out.push('Popliteal cyst.')
  if (baker === 'ruptured') out.push('Ruptured popliteal cyst.')
  const parameniscal = str(values, 'parameniscal')
  if (parameniscal && parameniscal !== 'none') out.push(`${parameniscal === 'both' ? 'Medial and lateral parameniscal cysts' : `${upperFirst(parameniscal)} parameniscal cyst`}.`)
  if (str(values, 'synovitis') === 'present') out.push('Synovitis.')
  if (str(values, 'hoffa') === 'abnormal') out.push(`Hoffa fat pad: ${str(values, 'hoffa-text') || 'abnormal'}.`)
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No acute osseous, meniscal, ligamentous or tendinous abnormality of the knee.'

/** True when any step's rule chip has fired with a warn tone. */
function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function impression(values: Values): string {
  const found = findings(values)
  const variants = variantSentences(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // Free text, and any warn chip without a sentence of its own, are not findings the
    // impression can name, so never call such a study normal.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...variants)}`
    // A normal impression only once every required item is answered.
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...variants)}`
    return variants.length > 0 ? `Impression: ${lines(...variants)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...variants)}`
}

/* "Check before signing": contradictions between entered findings. */

function ligamentInjuries(values: Values): string[] {
  const out: string[] = []
  if (nativeAcl(values) && ['partial', 'complete'].includes(str(values, 'acl'))) out.push(`ACL ${picked(values, fields.acl)}`)
  if (str(values, 'acl-status') === 'reconstructed' && ['partial', 'complete'].includes(str(values, 'graft'))) out.push(`ACL graft ${picked(values, fields.graft)}`)
  for (const [id, name] of [['pcl', 'PCL'], ['lcl', 'LCL'], ['mpfl', 'MPFL']] as const) {
    const status = str(values, id)
    if (status === 'partial' || status === 'complete') out.push(`${name} ${status} tear`)
  }
  const mcl = str(values, 'mcl')
  if (mcl === 'partial' || mcl === 'complete') out.push(`MCL ${mcl} tear`)
  return out
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = [
    str(values, 'fracture') === 'present' && 'fracture',
    str(values, 'segond') === 'present' && 'Segond fracture',
  ].filter((item): item is string => Boolean(item))
  const meniscalTears = (['mm', 'lm'] as const).filter((prefix) => str(values, prefix) === 'tear').map((prefix) => `${prefix === 'mm' ? 'medial' : 'lateral'} meniscal tear`)
  const cartilage = cartilageRegions
    .filter(([id]) => ['partial-low', 'partial-high', 'full'].includes(str(values, id)))
    .map(([id, name]) => `${name} cartilage ${picked(values, { id, options: cartilageOptions })}`)
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-meniscal-tear', 'no meniscal tear', meniscalTears],
    ['no-ligament', 'no ligament injury', ligamentInjuries(values)],
    ['no-cartilage', 'no cartilage defect', cartilage],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // K1-1: a fat-fluid level indicates an intra-articular fracture.
  if (str(values, 'fat-fluid') === 'present' && str(values, 'fracture') === 'none' && str(values, 'segond') !== 'present') {
    out.push('A fat-fluid level is entered, which indicates an intra-articular fracture, but no fracture is entered.')
  }
  // K2-6: a Segond fracture is associated with ACL tear.
  if (str(values, 'segond') === 'present' && nativeAcl(values) && str(values, 'acl') === 'intact') {
    out.push('A Segond fracture is entered, which is associated with ACL tear, but the ACL is entered as intact.')
  }
  // K2-1: the pivot-shift pattern is the footprint of an ACL tear.
  if (str(values, 'marrow') === 'present' && str(values, 'bruise-pattern') === 'pivot' && nativeAcl(values) && str(values, 'acl') === 'intact') {
    out.push('The pivot-shift bruise pattern is entered, the footprint of an ACL tear, but the ACL is entered as intact.')
  }
  // K3-1: one image only is a possible tear.
  for (const [prefix, name] of [['mm', 'medial'], ['lm', 'lateral']] as const) {
    if (twoSliceTouch(values, prefix) === 'possible') {
      out.push(`A ${name} meniscal tear is entered, but signal touches the surface on one image only, which the two-slice-touch rule calls a possible tear.`)
    }
  }
  // K4-2: parameniscal cysts are usually associated with a meniscal tear.
  const parameniscal = str(values, 'parameniscal')
  for (const [prefix, side] of [['mm', 'medial'], ['lm', 'lateral']] as const) {
    if ((parameniscal === side || parameniscal === 'both') && str(values, prefix) === 'intact') {
      out.push(`A ${side} parameniscal cyst is entered, which is usually associated with a meniscal tear, but the ${side} meniscus is entered as intact.`)
    }
  }
  // K4-1: the discoid criterion.
  if (discoidMet(values) === false) {
    out.push('A discoid lateral meniscus is entered, but the bow-tie is seen on fewer than 3 consecutive 5-mm sagittal images.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...boneLines(values),
    meniscusLine(values, 'mm', 'Medial meniscus'),
    num(values, 'mm-extrusion') !== undefined && `Medial meniscal extrusion: ${num(values, 'mm-extrusion')} mm`,
    ...lateralMeniscusLines(values),
    ...aclLines(values),
    choiceLine(values, fields.pcl),
    choiceLine(values, fields.mcl),
    choiceLine(values, fields.lcl),
    choiceLine(values, fields.biceps),
    choiceLine(values, fields.popliteus),
    choiceLine(values, fields.itb, str(values, 'itb') === 'abnormal' && str(values, 'itb-text')),
    choiceLine(values, fields.quadriceps),
    choiceLine(values, fields.patellarTendon),
    choiceLine(values, fields.mpfl, picked(values, fields.mpflSite)),
    num(values, 'trochlea') !== undefined && `Lateral trochlear inclination: ${num(values, 'trochlea')}°`,
    choiceLine(values, fields.cartilagePf),
    choiceLine(values, fields.cartilageMedial),
    choiceLine(values, fields.cartilageLateral),
    str(values, 'cartilage-site') && `Cartilage defects: ${str(values, 'cartilage-site')}`,
    ...synoviumLines(values),
    list(values, 'bone-variants').length > 0 && `Variants: ${chosen(values, fields.boneVariants).join(', ')}`,
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps, in the lesson's search-pattern order. Each teach panel quotes its lesson section. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the global look',
    learn: 'technique',
    teach: (
      <>
        <p>Check for all three planes, fat-suppressed PD or T2 imaging, and a T1-weighted or non-fat-suppressed PD sequence (this site's checklist).</p>
        <p>A fat-fluid level (lipohemarthrosis) indicates an intra-articular fracture ({LEE}).</p>
      </>
    ),
    fields: [fields.protocol, fields.protocolMissing, fields.effusion, fields.fatFluid, fields.marrow],
    derive: deriveTechnique,
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    learn: 'bones',
    teach: (
      <>
        <p>The bruise pattern is the footprint of the mechanism ({SANDERS}):</p>
        {bruiseTable}
        <p>Type a tibial plateau fracture by Schatzker ({SCHATZKER}; {MARKHARDT}). A Segond fracture is associated with ACL tear ({CAMPOS}). A subchondral low-signal area over 4 mm thick or over 14 mm long predicted an irreversible lesion ({LECOUVET}).</p>
      </>
    ),
    fields: [
      fields.bruisePattern, fields.bmeSite, fields.fracture, fields.fractureSite, fields.plateau, fields.plateauPattern,
      fields.plateauDepressionSite, fields.plateauDissociation, fields.plateauDepression, fields.segond, fields.subchondral, fields.subchondralThickness,
      fields.subchondralLength, fields.subchondralSite, fields.ocd, fields.ocdSite, fields.ocdAge, fields.ocdSigns, fields.boneVariants,
    ],
    derive: deriveBones,
  },
  {
    id: 'medial-meniscus',
    title: 'Step 3. Medial meniscus',
    learn: 'medial-meniscus',
    teach: (
      <>
        <p>Abnormal signal touching the surface on two or more images is a tear; on one image only, a possible tear ({DE_SMET}).</p>
        <p>Medial meniscal extrusion of more than 3 mm was associated with severe degeneration, extensive tearing and root tears ({COSTA}).</p>
      </>
    ),
    fields: [mm.status, mm.images, mm.type, mm.sites, fields.mmExtrusion],
    derive: deriveMedialMeniscus,
  },
  {
    id: 'lateral-meniscus',
    title: 'Step 4. Lateral meniscus',
    learn: 'lateral-meniscus',
    teach: (
      <>
        <p>The same two-slice-touch rule applies ({DE_SMET}). A discoid lateral meniscus shows a bow-tie on three or more consecutive 5-mm sagittal images ({SILVERMAN}).</p>
      </>
    ),
    fields: [lm.status, lm.images, lm.type, lm.sites, fields.lmDiscoid, fields.lmDiscoidImages],
    derive: deriveLateralMeniscus,
  },
  {
    id: 'acl',
    title: 'Step 5. Anterior cruciate ligament, native or reconstructed',
    learn: 'acl',
    teach: (
      <>
        <p>Indirect signs of ACL tear: lateral compartment bone contusion, anterior tibial translation, an uncovered posterior horn of the lateral meniscus and a buckled PCL ({GENTILI}).</p>
        <p>After reconstruction, look for graft tear, arthrofibrosis (including the cyclops lesion), tunnel widening and cysts, and graft impingement ({BENCARDINO}).</p>
      </>
    ),
    fields: [fields.aclStatus, fields.acl, fields.aclSigns, fields.graft, fields.graftFindings],
  },
  {
    id: 'pcl',
    title: 'Step 6. Posterior cruciate ligament',
    learn: 'pcl',
    teach: <p>An anterior tibial contusion (dashboard pattern) points to PCL injury ({SANDERS}).</p>,
    fields: [fields.pcl],
  },
  {
    id: 'mcl',
    title: 'Step 7. Medial collateral ligament',
    learn: 'mcl',
    teach: <p>Judge the fibres and the edema around them ({SCHWEITZER}). The clip bruise pattern points to the MCL ({SANDERS}).</p>,
    fields: [fields.mcl],
  },
  {
    id: 'lateral-side',
    title: 'Step 8. Lateral side and posterolateral corner',
    learn: 'lateral-side',
    teach: <p>Check the LCL, biceps femoris, popliteus and iliotibial tract by name ({RECONDO}).</p>,
    fields: [fields.lcl, fields.biceps, fields.popliteus, fields.itb, fields.itbText],
  },
  {
    id: 'extensor',
    title: 'Step 9. Extensor mechanism and patellofemoral joint',
    learn: 'extensor',
    teach: (
      <>
        <p>After lateral patellar dislocation, the medial retinaculum was disrupted at its patellar insertion in 76%, the MPFL femoral origin was injured in 49% of those seen, and the inferomedial patella had an osteochondral injury in 70% ({ELIAS}).</p>
        <p>A lateral trochlear inclination below 11° was a diagnostic test for patellar instability ({CARRILLON}).</p>
      </>
    ),
    fields: [fields.quadriceps, fields.patellarTendon, fields.mpfl, fields.mpflSite, fields.trochlea],
    derive: deriveExtensor,
  },
  {
    id: 'cartilage',
    title: 'Step 10. Cartilage',
    learn: 'cartilage',
    teach: <p>Describe each lesion by depth: signal change only, partial thickness under half, half or more, or full thickness ({CREMA}).</p>,
    fields: [fields.cartilagePf, fields.cartilageMedial, fields.cartilageLateral, fields.cartilageSite],
  },
  {
    id: 'synovium',
    title: 'Step 11. Synovium, cysts and fat pads',
    learn: 'synovium',
    teach: <p>A parameniscal cyst is usually associated with a meniscal tear ({CAMPBELL}).</p>,
    fields: [fields.baker, fields.parameniscal, fields.synovitis, fields.hoffa, fields.hoffaText],
  },
  {
    id: 'impression',
    title: 'Step 12. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the abnormal findings in search-pattern order and each variant on its own line.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'knee-mri',
  name: 'Knee MRI',
  lede: 'Read a knee MRI with no history beyond pain: a fixed search pattern through bones, menisci, ligaments, the extensor mechanism and cartilage, and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, but the papers are paywalled except Crema 2011, so the claims not stated in an abstract or open full text (among them the ligaments each bruise pattern points to, the Segond fracture and ACL tear, the juvenile OCD signs, the cyclops lesion, and the four cartilage depth grades) have still not been checked against their papers.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'two-slice-touch',
      question: 'Abnormal signal touches the inferior surface of the medial meniscus on one sagittal image only. By the two-slice-touch rule, how do you call it?',
      options: ['A tear', 'A possible tear', 'Intrasubstance degeneration, not a tear', 'A root tear'],
      answer: 1,
      explanation: <p>Signal touching the surface on two or more images is called a tear; on one image only the positive predictive value is lower, so it is a possible tear ({DE_SMET}).</p>,
    },
    {
      id: 'extrusion',
      question: 'The medial meniscus is extruded by 4 mm. What does the lesson say to do next?',
      options: ['Nothing: extrusion under 5 mm is normal', 'Look hard at the posterior root, since extrusion of more than 3 mm is associated with root tears', 'Call a bucket-handle tear', 'Measure the lateral meniscus for comparison'],
      answer: 1,
      explanation: <p>Medial meniscal extrusion of more than 3 mm was associated with severe degeneration, extensive tearing and root tears ({COSTA}).</p>,
    },
    {
      id: 'pivot-shift',
      question: 'Bone contusions sit in the lateral femoral condyle and the posterolateral tibial plateau. Which injury does this pattern point to?',
      options: ['PCL tear', 'ACL tear', 'Lateral patellar dislocation', 'MCL tear'],
      answer: 1,
      explanation: <p>This is the pivot-shift pattern, the footprint of an ACL tear ({SANDERS}).</p>,
    },
    {
      id: 'patellar-dislocation',
      question: 'Contusions are seen in the inferomedial patella and the anterolateral lateral femoral condyle. Which ligament should you look at hardest?',
      options: ['The MPFL', 'The ACL', 'The LCL', 'The PCL'],
      answer: 0,
      explanation: <p>That is the pattern of a lateral patellar dislocation, after which the medial restraints are injured: the medial retinaculum at its patellar insertion in 76%, and the MPFL femoral origin in 49% of those seen ({SANDERS}; {ELIAS}).</p>,
    },
    {
      id: 'segond',
      question: 'A Segond fracture is seen. Which ligament does the lesson say to recheck?',
      options: ['The MCL', 'The PCL', 'The ACL', 'The MPFL'],
      answer: 2,
      explanation: <p>A Segond fracture is an avulsion from the lateral tibial rim by the iliotibial tract or the anterior oblique band of the LCL, and it is associated with ACL tear ({CAMPOS}).</p>,
    },
    {
      id: 'lipohemarthrosis',
      question: 'A fat-fluid level is seen in the suprapatellar recess. What does it indicate?',
      options: ['Synovitis', 'A ruptured popliteal cyst', 'An intra-articular fracture', 'Nothing in particular'],
      answer: 2,
      explanation: <p>Lipohemarthrosis indicates an intra-articular fracture ({LEE}).</p>,
    },
    {
      id: 'schatzker-ii',
      question: 'The lateral tibial plateau has a split fragment with a depressed articular surface, and the metaphysis is still joined to the diaphysis. What is the Schatzker type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>A split with depression of the lateral plateau is Schatzker type II; a pure split is type I and a pure depression type III ({MARKHARDT}).</p>,
    },
    {
      id: 'schatzker-vi',
      question: 'A lateral plateau split also separates the metaphysis from the diaphysis. What is the Schatzker type?',
      options: ['Type I', 'Type V', 'Type VI', 'It depends on the medial plateau'],
      answer: 2,
      explanation: <p>Dissociation of the metaphysis from the diaphysis makes a plateau fracture type VI, whichever plateaus are broken ({MARKHARDT}).</p>,
    },
    {
      id: 'discoid',
      question: 'What criterion does the lesson give for a discoid lateral meniscus?',
      options: ['A bow-tie on 2 or more consecutive 5-mm sagittal images', 'A bow-tie on 3 or more consecutive 5-mm sagittal images', 'Meniscal width over 10 mm on coronal images', 'Any meniscus thicker than the medial one'],
      answer: 1,
      explanation: <p>A discoid lateral meniscus shows continuity between the horns, the bow-tie, on three or more consecutive 5-mm sagittal images ({SILVERMAN}).</p>,
    },
    {
      id: 'trochlea',
      question: 'The lateral trochlear inclination measures 9°. What does that suggest?',
      options: ['A normal trochlea', 'Patellar instability, since it is below the 11° threshold', 'Patella alta', 'An MPFL tear'],
      answer: 1,
      explanation: <p>A lateral trochlear inclination below 11° was a diagnostic test for patellar instability ({CARRILLON}).</p>,
    },
    {
      id: 'parameniscal-cyst',
      question: 'A parameniscal cyst sits beside the lateral meniscus, which you called intact. What should you do?',
      options: ['Nothing: the two are unrelated', 'Look again at the lateral meniscus, since parameniscal cysts are usually associated with a tear', 'Call it a popliteal cyst', 'Call the cyst a ganglion of the LCL'],
      answer: 1,
      explanation: <p>Parameniscal cysts are usually associated with a meniscal tear ({CAMPBELL}).</p>,
    },
  ],
}

export function KneeMriStudyPage() {
  return <StudyPage study={study} />
}
