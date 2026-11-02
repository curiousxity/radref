import { Link } from 'react-router-dom'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { fifthMetatarsalScans } from '../data/scans/fifthMetatarsal'
import { footXrayScans } from '../data/scans/footXray'
import { lisfrancScans } from '../data/scans/lisfranc'
import { hawkins, hawkinsDescriptions, hawkinsGaps, hawkinsSentence, hawkinsTypes } from '../logic/hawkins'
import type { HawkinsInput, HawkinsType } from '../logic/hawkins'
import { myerson, myersonDescriptions, myersonGroup, myersonSentence, myersonTypes } from '../logic/myerson'
import type { FirstRay, LesserRays } from '../logic/myerson'
import { sandersGroupDescriptions } from '../logic/sanders'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 and 2026-11-02 with PubMed, Crossref and Europe PMC reachable, so every
 * reference was matched as it was cited and every claim was read in an abstract, an open full text
 * (Bessen, Crone, Moracia-Ochagavía, Hammad, Diebal, Tzatzairis, Chloros, Sposeto, Ma,
 * Jiménez-Almonte, Alton, Webber) or the ACR's published ratings table before it went in; Gupta was
 * read in the full text the author supplied for the Myerson calculator. The claims table is
 * docs/superpowers/research/2026-11-01-foot-xray-sources.md (FX claims). Rule chips and warnings
 * carry their claim IDs.
 *
 * The Myerson, Sanders and Hawkins types come from the shared logic in src/logic/ (the calculators'
 * own definitions and citations), and the fifth metatarsal zones are worded as on the fifth
 * metatarsal page, so the study never contradicts them.
 */

const STIELL_1992_DOI = '10.1016/s0196-0644(05)82656-3'
const STIELL_1993_DOI = '10.1001/jama.1993.03500090063034'
const BACHMANN_DOI = '10.1136/bmj.326.7386.417'
const BESSEN_DOI = '10.1136/bmj.b3056'
const ACR_DOI = '10.1016/j.jacr.2020.01.019'
const ACR_STRESS_DOI = '10.1016/j.jacr.2024.08.019'
const CRONE_DOI = '10.1007/s00256-026-05188-1'
const MORACIA_DOI = '10.1302/2058-5241.4.180076'
const HAMMAD_DOI = '10.1155/tsm2/3933956'
const MYERSON_DOI = '10.1177/107110078600600504'
const DIEBAL_DOI = '10.1177/1941738113477991'
const TZATZAIRIS_DOI = '10.5312/wjo.v10.i2.115'
const GUPTA_DOI = '10.1067/j.cpradiol.2007.08.012'
const LAWRENCE_DOI = '10.1177/107110079301400610'
const TORG_DOI = '10.2106/00004623-198466020-00007'
const CHLOROS_DOI = '10.1530/EOR-21-0025'
const SPOSETO_DOI = '10.1055/s-0045-1809886'
const MA_DOI = '10.1111/os.12560'
const SANDERS_DOI = '10.1097/00003086-199305000-00012'
const JIMENEZ_DOI = '10.1097/CORR.0000000000000539'
const HAWKINS_DOI = '10.2106/00004623-197052050-00013'
const CANALE_DOI = '10.2106/00004623-197860020-00001'
const ALTON_DOI = '10.1007/s11999-015-4136-x'
const TEZVAL_DOI = '10.1097/BOT.0b013e318148c665'
const WEBBER_DOI = '10.1002/ksa.70243'
const KISS_DOI = '10.2214/ajr.160.1.8416606'
const WRIGHT_DOI = '10.1177/0363546515574066'

const STIELL_1992 = <Cite doi={STIELL_1992_DOI}>Stiell et al., Ann Emerg Med 1992</Cite>
const STIELL_1993 = <Cite doi={STIELL_1993_DOI}>Stiell et al., JAMA 1993</Cite>
const BACHMANN = <Cite doi={BACHMANN_DOI}>Bachmann et al., BMJ 2003</Cite>
const BESSEN = <Cite doi={BESSEN_DOI}>Bessen et al., BMJ 2009</Cite>
const ACR = <Cite doi={ACR_DOI}>ACR Appropriateness Criteria, Acute Trauma to the Foot 2020</Cite>
const ACR_STRESS = <Cite doi={ACR_STRESS_DOI}>ACR Appropriateness Criteria, Stress Fracture 2024</Cite>
const CRONE = <Cite doi={CRONE_DOI}>Crone et al., Skeletal Radiol 2026</Cite>
const MORACIA = <Cite doi={MORACIA_DOI}>Moracia-Ochagavía and Rodríguez-Merchán, EFORT Open Rev 2019</Cite>
const HAMMAD = <Cite doi={HAMMAD_DOI}>Hammad et al., Transl Sports Med 2026</Cite>
const MYERSON = <Cite doi={MYERSON_DOI}>Myerson et al., Foot Ankle 1986</Cite>
const DIEBAL = <Cite doi={DIEBAL_DOI}>Diebal et al., Sports Health 2013</Cite>
const TZATZAIRIS = <Cite doi={TZATZAIRIS_DOI}>Tzatzairis et al., World J Orthop 2019</Cite>
const GUPTA = <Cite doi={GUPTA_DOI}>Gupta et al., Curr Probl Diagn Radiol 2008</Cite>
const LAWRENCE = <Cite doi={LAWRENCE_DOI}>Lawrence and Botte, Foot Ankle 1993</Cite>
const TORG = <Cite doi={TORG_DOI}>Torg et al., J Bone Joint Surg Am 1984</Cite>
const CHLOROS = <Cite doi={CHLOROS_DOI}>Chloros et al., EFORT Open Rev 2022</Cite>
const SPOSETO = <Cite doi={SPOSETO_DOI}>Sposeto et al., Rev Bras Ortop 2025</Cite>
const MA = <Cite doi={MA_DOI}>Ma et al., Orthop Surg 2019</Cite>
const SANDERS = <Cite doi={SANDERS_DOI}>Sanders et al., Clin Orthop Relat Res 1993</Cite>
const JIMENEZ = <Cite doi={JIMENEZ_DOI}>Jiménez-Almonte et al., Clin Orthop Relat Res 2019</Cite>
const HAWKINS = <Cite doi={HAWKINS_DOI}>Hawkins, J Bone Joint Surg Am 1970</Cite>
const CANALE = <Cite doi={CANALE_DOI}>Canale and Kelly, J Bone Joint Surg Am 1978</Cite>
const ALTON = <Cite doi={ALTON_DOI}>Alton et al., Clin Orthop Relat Res 2015</Cite>
const TEZVAL = <Cite doi={TEZVAL_DOI}>Tezval et al., J Orthop Trauma 2007</Cite>
const WEBBER = <Cite doi={WEBBER_DOI}>Webber et al., Knee Surg Sports Traumatol Arthrosc 2026</Cite>
const KISS = <Cite doi={KISS_DOI}>Kiss et al., AJR 1993</Cite>
const WRIGHT = <Cite doi={WRIGHT_DOI}>Wright et al., Am J Sports Med 2016</Cite>

const references: LessonReference[] = [
  { citation: 'Stiell IG, Greenberg GH, McKnight RD, Nair RC, McDowell I, Worthington JR. A study to develop clinical decision rules for the use of radiography in acute ankle injuries. Ann Emerg Med. 1992;21(4):384-390.', doi: STIELL_1992_DOI },
  { citation: 'Stiell IG, Greenberg GH, McKnight RD, Nair RC, McDowell I, Reardon M, Stewart JP, Maloney J. Decision rules for the use of radiography in acute ankle injuries. Refinement and prospective validation. JAMA. 1993;269(9):1127-1132.', doi: STIELL_1993_DOI },
  { citation: 'Bachmann LM, Kolb E, Koller MT, Steurer J, ter Riet G. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ. 2003;326(7386):417.', doi: BACHMANN_DOI },
  { citation: 'Bessen T, Clark R, Shakib S, Hughes G. A multifaceted strategy for implementation of the Ottawa ankle rules in two emergency departments. BMJ. 2009;339:b3056.', doi: BESSEN_DOI },
  { citation: 'Expert Panel on Musculoskeletal Imaging; Gorbachova T, Chang EY, Ha AS, Amini B, Dorfman SR, Fox MG, Khurana B, Klitzke A, Lee KS, Mooar PA, Shah KH, Shah NA, Singer AD, Smith SE, Taljanovic MS, Thomas JM, Kransdorf MJ. ACR Appropriateness Criteria® Acute Trauma to the Foot. J Am Coll Radiol. 2020;17(5S):S2-S11.', doi: ACR_DOI },
  { citation: 'Expert Panel on Musculoskeletal Imaging; Morrison WB, Deely D, Fox MG, Blankenbaker DG, Dodds JA, French CN, Frick MA, Jawetz ST, Khurana B, Kresin M, Nacey N, Reitman C, Said N, Stensby JD, Walker EA, Chang EY. ACR Appropriateness Criteria® Stress (Fatigue-Insufficiency) Fracture Including Sacrum Excluding Other Vertebrae: 2024 Update. J Am Coll Radiol. 2024;21(11S):S490-S503.', doi: ACR_STRESS_DOI },
  { citation: 'Crone AM, Omar IM, Bronson AM, Mutawakkil MY, Selley RS, Weaver JS, Klauser AS, Taljanovic MS. Guide to lower extremity radiologic measurements: part 3 ankle and foot. Skeletal Radiol. 2026;55(7):1487-1511.', doi: CRONE_DOI },
  { citation: 'Moracia-Ochagavía I, Rodríguez-Merchán EC. Lisfranc fracture-dislocations: current management. EFORT Open Rev. 2019;4(7):430-444.', doi: MORACIA_DOI },
  { citation: 'Hammad A, Ahmad Y, Abdelnour J, Tscholl P. Lisfranc injuries: latest updates on diagnostics and management. Transl Sports Med. 2026;2026:3933956.', doi: HAMMAD_DOI },
  { citation: 'Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242.', doi: MYERSON_DOI },
  { citation: 'Diebal AR, Westrick RB, Alitz C, Gerber JP. Lisfranc injury in a West Point cadet. Sports Health. 2013;5(3):281-285.', doi: DIEBAL_DOI },
  { citation: 'Tzatzairis T, Firth G, Parker L. Adolescent Lisfranc injury treated with TightRope™: a case report and review of literature. World J Orthop. 2019;10(2):115-122.', doi: TZATZAIRIS_DOI },
  { citation: 'Gupta RT, Wadhwa RP, Learch TJ, Herwick SM. Lisfranc injury: imaging findings for this important but often-missed diagnosis. Curr Probl Diagn Radiol. 2008;37(3):115-126.', doi: GUPTA_DOI },
  { citation: "Lawrence SJ, Botte MJ. Jones' fractures and related fractures of the proximal fifth metatarsal. Foot Ankle. 1993;14(6):358-365.", doi: LAWRENCE_DOI },
  { citation: 'Torg JS, Balduini FC, Zelko RR, Pavlov H, Peff TC, Das M. Fractures of the base of the fifth metatarsal distal to the tuberosity. Classification and guidelines for non-surgical and surgical management. J Bone Joint Surg Am. 1984;66(2):209-214.', doi: TORG_DOI },
  { citation: 'Chloros GD, Kakos CD, Tastsidis IK, Giannoudis VP, Panteli M, Giannoudis PV. Fifth metatarsal fractures: an update on management, complications, and outcomes. EFORT Open Rev. 2022;7(1):13-25.', doi: CHLOROS_DOI },
  { citation: 'Sposeto RB, Matías-Joannas G, Godoy-Santos AL. Current concepts in intra-articular calcaneus fractures. Rev Bras Ortop (Sao Paulo). 2025;60(3):s00451809886.', doi: SPOSETO_DOI },
  { citation: "Ma ZJ, Bai LP, Zhang GM, Zhang LB, Chen Z. Natural value of Böhler's angle in normal Chinese population. Orthop Surg. 2019;11(6):1201-1208.", doi: MA_DOI },
  { citation: 'Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95.', doi: SANDERS_DOI },
  { citation: 'Jiménez-Almonte JH, King JD, Luo TD, Aneja A, Moghadamian E. Classifications in brief: Sanders classification of intraarticular fractures of the calcaneus. Clin Orthop Relat Res. 2019;477(2):467-471.', doi: JIMENEZ_DOI },
  { citation: 'Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002.', doi: HAWKINS_DOI },
  { citation: 'Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156.', doi: CANALE_DOI },
  { citation: 'Alton T, Patton DJ, Gee AO. Classifications in brief: the Hawkins classification for talus fractures. Clin Orthop Relat Res. 2015;473(9):3046-3049.', doi: ALTON_DOI },
  { citation: 'Tezval M, Dumont C, Stürmer KM. Prognostic reliability of the Hawkins sign in fractures of the talus. J Orthop Trauma. 2007;21(8):538-543.', doi: TEZVAL_DOI },
  { citation: 'Webber KJ, Boggiano VJ, Balboni JM, Semelsberger SD, Moran J, Mast P, Vasquez A, Gianakos AL; IFASC Committee Members. Navicular fractures in elite athletes: 2025 International Foot and Ankle Sports Consensus and systematic review. Knee Surg Sports Traumatol Arthrosc. 2026;34(9):3162-3177.', doi: WEBBER_DOI },
  { citation: 'Kiss ZS, Khan KM, Fuller PJ. Stress fractures of the tarsal navicular bone: CT findings in 55 cases. AJR Am J Roentgenol. 1993;160(1):111-115.', doi: KISS_DOI },
  { citation: 'Wright AA, Hegedus EJ, Lenchik L, Kuhn KJ, Santiago L, Smoliga JM. Diagnostic accuracy of various imaging modalities for suspected lower extremity stress fractures: a systematic review with evidence-based recommendations for clinical practice. Am J Sports Med. 2016;44(1):255-263.', doi: WRIGHT_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, except a name such as Lisfranc or Jones. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) && !/^(Lisfranc|Jones|Böhler|Gissane|Hawkins|Torg|AP)\b/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

const myersonLink = <Link to="/myerson">Myerson calculator</Link>
const sandersLink = <Link to="/sanders">Sanders calculator</Link>
const hawkinsLink = <Link to="/hawkins">Hawkins calculator</Link>
const fifthLink = <Link to="/fifth-metatarsal">fifth metatarsal page</Link>

/* Tables shared by the Learn tab and the teach panels. */

// FX3-4 to FX3-7: the calcaneal angles, Crone's ranges with Sposeto's beside them.
const anglesTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Angle (lateral view)</th><th>Crone</th><th>Sposeto</th><th>Abnormal (Crone)</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Böhler's angle</td><td>25° to 40°</td><td>20° to 40°</td><td>Under 25°: posterior facet depressed</td></tr>
        <tr><td className="vessel-name">Critical angle of Gissane</td><td>120° to 145°</td><td>95° to 105°</td><td>Over 145°: depression at the subtalar joint</td></tr>
      </tbody>
    </table>
  </div>
)

// FX4-1: the Myerson types, from the shared logic (the calculator's wording).
const myersonTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Group</th><th>Displacement</th></tr>
      </thead>
      <tbody>
        {myersonTypes.map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(myersonGroup(t))}</td><td>{upperFirst(myersonDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

// FX5-1, FX5-2: the zones, worded as on the fifth metatarsal page.
const zonesTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Zone</th><th>Where</th><th>Usual cause</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">1: tuberosity avulsion</td><td>The tuberosity, proximal to the 4–5 intermetatarsal joint; may enter the joint with the cuboid</td><td>Inversion</td></tr>
        <tr><td className="vessel-name">2: Jones fracture</td><td>The metaphyseal-diaphyseal junction, running into the 4–5 intermetatarsal joint</td><td>Adduction of the forefoot with the ankle plantarflexed</td></tr>
        <tr><td className="vessel-name">3: proximal diaphyseal stress fracture</td><td>The proximal 1.5 cm of the shaft, distal to the 4–5 joint</td><td>Repetitive loading</td></tr>
        <tr><td className="vessel-name">Distal shaft (dancer's)</td><td>Distal to zone 3, usually spiral</td><td>Rotation of the loaded, plantarflexed foot</td></tr>
      </tbody>
    </table>
  </div>
)

// FX6-1: the Sanders types, from the shared logic.
const sandersTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Sanders type (coronal CT)</th><th>Fracture</th></tr>
      </thead>
      <tbody>
        {(['I', 'II', 'III', 'IV'] as const).map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(sandersGroupDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

// FX6-3: the Hawkins types, from the shared logic.
const hawkinsTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Hawkins type</th><th>Fracture</th></tr>
      </thead>
      <tbody>
        {hawkinsTypes.map((t) => (
          <tr key={t}><td className="vessel-name">{t}</td><td>{upperFirst(hawkinsDescriptions[t])}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'history',
    title: 'Step 1. Why the film: the injury and the Ottawa foot rule',
    body: (
      <>
        <p>This lesson is for an adult's foot radiographs after an injury. The order of the steps and the checklists are this site's own; each rule comes from the paper cited beside it.</p>
        <h3>The Ottawa foot rule</h3>
        <p>Stiell and colleagues derived decision rules in 1992 from 750 adults with acute blunt ankle injuries. All 32 significant midfoot fractures on the 230 foot series were found among patients with pain in the midfoot and bone tenderness at the base of the fifth metatarsal, the cuboid or the navicular ({STIELL_1992}). The rules were refined and validated in 1993: the refined rules were 100% sensitive for 19 midfoot zone fractures, could cut foot radiographs by 30%, and put the chance of a fracture when the foot rule was negative at 0% (95% CI 0% to 0.4%) ({STIELL_1993}).</p>
        <p>In the refined rule, a foot series is required only if there is pain in the midfoot zone and any of: bone tenderness at the base of the fifth metatarsal, bone tenderness over the navicular, or inability to bear weight both immediately and in the emergency department ({BESSEN}), taken as four steps ({CHLOROS}). The cuboid of the 1992 rule is not in the refined one; this form uses the refined rule.</p>
        <p>A systematic review of 27 studies and 15,581 patients pooled a negative likelihood ratio of 0.08 for the midfoot, with a sensitivity of almost 100% and a modest specificity ({BACHMANN}).</p>
        <p>The ACR rates foot radiographs 9 (usually appropriate) and weight-bearing foot radiographs 8 when the Ottawa rules are positive; radiographs 1 (usually not appropriate) when the rules are negative and nothing is suspected outside the regions they cover; radiographs 9 (and CT 5) when the rules cannot be used because of exclusionary criteria; and radiographs 9 when the rules are negative but an injury is suspected outside them, at a metatarsophalangeal joint, a metatarsal or a toe ({ACR}). The rule is given here as the reason the film was taken: when it is not met, the report should say what the film is for.</p>
        <h3>The mechanism</h3>
        <p>A Lisfranc injury usually follows an axial or rotational load on a plantarflexed foot, and up to one-third are missed at first ({HAMMAD}). Plantar ecchymosis of the midfoot is highly suggestive of a Lisfranc injury ({MORACIA}). A tuberosity avulsion of the fifth metatarsal (zone 1) usually follows inversion ({CHLOROS}). Most calcaneal fractures follow high-energy axial trauma, and fractures of the tibial plafond, tibial plateau and spine commonly come with them ({SPOSETO}). A stress fracture follows repetitive loading, and radiographs are likely to be falsely negative at first ({WRIGHT}).</p>
      </>
    ),
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    body: (
      <>
        <p>The standard series is AP (dorsoplantar), oblique and lateral. Weight-bearing radiographs are essential for detecting subtle Lisfranc injuries and the diastasis between the medial cuneiform and the second metatarsal, and can show widening or malalignment when non-weight-bearing films look normal ({HAMMAD}); occasionally the malalignment is seen only on weight-bearing views. For the weight-bearing dorsoplantar view, the beam can be angled 10° to 15° toward the heel to open the tarsometatarsal joints when Lisfranc trauma is a concern, and in subtle cases a view of the other foot helps ({CRONE}). After a low-energy injury, Moracia-Ochagavía advise radiographs of both feet ({MORACIA}).</p>
        <p>For the fifth metatarsal, the oblique view helps most in placing the fracture. Up to 77% of avulsion fractures, particularly at the tip of the tuberosity, may be missed on standard foot radiographs, and an AP view of the ankle that includes the base of the fifth metatarsal should be added ({CHLOROS}).</p>
        <p>For the calcaneus, the series should include lateral, AP and oblique foot views with axial views of the calcaneus. The AP shows the calcaneocuboid joint and widening of the lateral wall; the axial view shows widening, varus or valgus, and misalignment of the posterior subtalar joint ({SPOSETO}). Böhler's angle and the critical angle of Gissane are measured on the lateral foot radiograph ({CRONE}).</p>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and measurements',
    body: (
      <>
        <h3>The tarsometatarsal joints</h3>
        <p>On the dorsoplantar view of an intact Lisfranc complex, the lateral margins of the medial cuneiform and the first metatarsal base line up, as do the medial margins of the middle cuneiform and the second metatarsal base. The distance between the medial cuneiform and the second metatarsal base should be 2 mm or less; more suggests Lisfranc ligament insufficiency, as does asymmetry with the other foot ({CRONE}). On the internal oblique view, the medial borders of the cuboid and the fourth metatarsal line up; on the lateral view, look for dorsal or plantar displacement of the metatarsals ({MORACIA}).</p>
        <p>The thresholds differ between sources. Moracia-Ochagavía give 2 mm as the most between the bases of the first and second metatarsals ({MORACIA}). Hammad lists proposed thresholds, against the uninjured foot under the same load: a first-to-second metatarsal diastasis over 4 mm without weight-bearing or over 5 mm with it, and a medial cuneiform to second metatarsal gap over 3 mm without or over 5 mm with weight-bearing ({HAMMAD}). This form measures the medial cuneiform to second metatarsal gap against Crone's 2 mm, the same distance as the later Myerson type D (step 4), and shows Hammad's figure beside it.</p>
        <h3>The calcaneal angles</h3>
        <p>Böhler's angle is formed by a line from the tip of the anterior calcaneal process to the top of the posterior facet and a line from the posterior facet to the top of the tuberosity. Böhler gave 30° to 35°, with under 28° abnormal; the generally accepted normal values are 25° to 40°, and under 25° suggests depression of the posterior facet. A normal Böhler's angle does not exclude an undisplaced calcaneal fracture ({CRONE}). Sposeto and colleagues give 20° to 40° ({SPOSETO}); in 143 normal Chinese feet the angle was 31.6° ± 5.19° (range 20.1° to 47.2°) ({MA}).</p>
        <p>The critical angle of Gissane is formed by lines along the top of the anterior process and along the posterior facet. The generally accepted normal values are 120° to 145°, and the angle enlarges as the posterior facet collapses; reported normal values range from 95° to 150°, and in severely comminuted fractures the landmarks may not be seen ({CRONE}). Sposeto and colleagues give 95° to 105° ({SPOSETO}). This form uses Crone's ranges.</p>
        {anglesTable}
        <ScanFigures images={[footXrayScans.lisfrancFractureDislocation, footXrayScans.lisfrancMalalignment, footXrayScans.bohlerReduced, footXrayScans.bohlerNormal, lisfrancScans.diastasis]} />
      </>
    ),
  },
  {
    id: 'midfoot',
    title: 'Step 4. Lisfranc joint and midfoot',
    body: (
      <>
        <h3>Lisfranc injury</h3>
        <p>Lisfranc injuries are ligamentous or bony. Ligamentous injuries are harder to see, and an isolated dislocation without a fracture may do worse than one with fractures ({HAMMAD}). The term takes in purely ligamentous injuries and those with fractures of the metatarsals, cuneiforms, navicular or cuboid. A fleck sign, a small bone fragment in the first intermetatarsal space, indicates avulsion of the Lisfranc ligament ({MORACIA}).</p>
        <p>Type a fracture-dislocation by Myerson ({MYERSON}; {DIEBAL}; {TZATZAIRIS}; for type B2, {GUPTA}). The {myersonLink} applies the same rules.</p>
        {myersonTable}
        <p>The type can change with CT: in Gupta's case, a type B lateral dislocation on the radiographs became type A once CT showed the first metatarsal displaced laterally too ({GUPTA}). In Myerson's series of 76 fracture-dislocations, the quality of the initial reduction was the major determinant of a poor result ({MYERSON}).</p>
        <p>A subtle injury has no 1986 type. A later proposed extension, not part of types A to C, adds type D: D1, a medial cuneiform to second metatarsal distance of 2 mm or less, not needing surgical fixation; D2, more than 2 mm, needing fixation, either purely ligamentous (D2L) or with a bony avulsion (D2B) ({MORACIA}). Type D injuries are nondisplaced and rely on weight-bearing assessment of stability, since subtle displacement may only show under load ({HAMMAD}).</p>
        <p>When the radiographs are inconclusive and suspicion is high, CT shows occult fractures and subtle subluxations, and MRI shows the ligaments ({HAMMAD}). The ACR rates MRI and CT without contrast 9 each when a Lisfranc injury or an occult fracture or dislocation is suspected and the radiographs are normal or equivocal ({ACR}).</p>
        <h3>Navicular, cuboid and cuneiforms</h3>
        <p>For navicular fractures in elite athletes, the 2025 consensus starts with plain radiographs; in athletes a CT is routinely done to assess displacement or complexity; a bone scan is not routinely recommended when the radiographs are negative; and if CT is negative or inconclusive, MRI should follow. Navicular stress fractures are typically diagnosed more than six months after the pain starts ({WEBBER}). On CT, all 55 of Kiss's navicular stress fractures involved the central third of the proximal dorsal margin, 96% were partial, and 11% were missed at the first reading because they were small ({KISS}).</p>
        <ScanFigures images={[footXrayScans.lisfrancLateralDislocation, lisfrancScans.fleck]} />
      </>
    ),
  },
  {
    id: 'metatarsals',
    title: 'Step 5. Metatarsals and toes',
    body: (
      <>
        <h3>The fifth metatarsal</h3>
        <p>Lawrence and Botte separated three fractures of the proximal fifth metatarsal, the Jones fracture, the proximal diaphyseal stress fracture and the tuberosity avulsion, and warned that the stress fracture is often confused with the Jones fracture ({LAWRENCE}). Their zones, as Chloros and colleagues set them out ({CHLOROS}) and as on the {fifthLink}:</p>
        {zonesTable}
        <p>Zone 1 fractures are more than 90% of fifth metatarsal fractures and in most patients are treated without surgery with good results; involvement of more than a third of the joint with the cuboid may need fixation. Non-union of zone 2 and 3 fractures has been reported in up to 21% after non-operative treatment, in the watershed of the blood supply ({CHLOROS}).</p>
        <p>Torg graded fractures distal to the tuberosity on the radiograph: type I (acute), a narrow fracture line without intramedullary sclerosis; type II (delayed union), a widened line with intramedullary sclerosis; type III (non-union), the medullary canal obliterated by sclerotic bone ({TORG}). Chloros adds periosteal new bone to type II ({CHLOROS}).</p>
        <h3>Stress fractures</h3>
        <p>The radiographic signs of a stress fracture are usually absent early; well-defined linear lucencies appear 2 to 6 weeks after the injury, with a variable periosteal reaction ({CHLOROS}). In a systematic review, radiographs were 12% to 56% sensitive and 88% to 96% specific for lower-limb stress fractures, and MRI was the most sensitive and specific test ({WRIGHT}). The ACR makes radiography the first test, with MRI for stress fractures the radiographs do not show ({ACR_STRESS}).</p>
        <h3>Toes</h3>
        <p>For a suspected injury of a metatarsophalangeal joint, a metatarsal or a toe outside the Ottawa zones, the ACR rates foot radiographs 9 ({ACR}). The sources read for this lesson give no further rules for toe fractures, so the form records them as described.</p>
        <ScanFigures images={[footXrayScans.metatarsalStressFracture, fifthMetatarsalScans.zones, fifthMetatarsalScans.zone2, fifthMetatarsalScans.zone3]} />
      </>
    ),
  },
  {
    id: 'hindfoot',
    title: 'Step 6. Calcaneus and talus',
    body: (
      <>
        <h3>Calcaneus</h3>
        <p>The calcaneus is the foot bone most often injured (60%), at 1% to 2% of all fractures in the body, and 75% of calcaneal fractures are intra-articular. Radiography is the first test; CT is crucial for understanding the fracture in three dimensions and for planning surgery. Typical deformities are varus of the tuberosity, depression of the posterior subtalar joint, widening of the lateral wall, and a lower calcaneal pitch and Böhler's angle ({SPOSETO}).</p>
        <p>The Sanders type is read on CT, on the coronal image where the undersurface of the posterior facet is widest, with lines A, B and C from lateral to medial; type I is minimally displaced (2 mm or less), and the system needs coronal CT images ({JIMENEZ}; {SANDERS}). A radiograph cannot give it. The {sandersLink} applies the same definitions.</p>
        {sandersTable}
        <h3>Talar neck</h3>
        <p>The modified Hawkins classification is based on the plain radiographs at injury, and the type goes with the risk of osteonecrosis. Hawkins described types I to III and Canale and Kelly added type IV ({HAWKINS}; {CANALE}; {ALTON}). The {hawkinsLink} applies the same rules.</p>
        {hawkinsTable}
        <p>In Halvorson's 848 talar fractures, as Alton reports them, osteonecrosis followed 5.7% of type I, 18.4% of type II, 44.7% of type III and 12.1% of the rare type IV ({ALTON}). In Canale and Kelly's series it followed 2 of 13 undisplaced fractures, half of those with subtalar subluxation or dislocation, and 16 of 19 with complete dislocation of the talar body ({CANALE}).</p>
        <p>The Hawkins sign is subchondral atrophy in the talar dome on the AP radiograph 6 to 8 weeks after the injury, a good prognostic sign; its absence is not a reliable sign of osteonecrosis ({ALTON}). In Tezval's 31 patients it was 100% sensitive and 57.7% specific, appeared between the 6th and 9th weeks, and was seldom seen on the lateral view ({TEZVAL}).</p>
        <ScanFigures images={[footXrayScans.talarFractureLateral, footXrayScans.hawkinsSign]} />
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 7. Soft tissues',
    body: (
      <>
        <p>Describe any soft-tissue swelling by its site. After penetrating trauma with a suspected foreign body and negative radiographs, the ACR rates ultrasound 9, and MRI and CT without contrast 5 each ({ACR}). The sources read for this lesson give no further rules for the soft tissues of the foot on radiographs.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    body: (
      <>
        <p>List the injuries in the order of the search: the Lisfranc joint and midfoot, the metatarsals and toes, the calcaneus and talus, then the soft tissues (this order is this site's own). Name the Myerson type, the fifth metatarsal zone and the Hawkins type. Where an injury is still suspected but not shown, say so and name the next test the sources support: MRI or CT for a Lisfranc injury or an occult fracture ({ACR}), MRI for a stress fracture ({WRIGHT}; {ACR_STRESS}), and CT for an intra-articular calcaneal fracture ({SPOSETO}; {JIMENEZ}).</p>
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

/** "a, b and c". */
function andList(items: string[]): string {
  return items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

const present = (id: string) => (v: Values) => str(v, id) === 'present'
const lisfrancMechanism = (v: Values) => str(v, 'mechanism') === 'plantarflexed' || list(v, 'signs').includes('ecchymosis')
const dislocated = (v: Values) => str(v, 'lisfranc') === 'dislocation'
const talarDisplaced = (v: Values) => present('talar-neck')(v) && str(v, 'talar-displaced') === 'displaced'

const fields = {
  side: { id: 'side', kind: 'choice', label: 'Side', required: true, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ] },
  mechanism: { id: 'mechanism', kind: 'choice', label: 'Mechanism', options: [
    { value: 'inversion', label: 'Twisting or inversion' },
    { value: 'plantarflexed', label: 'Axial or rotational load on a plantarflexed foot' },
    { value: 'fall', label: 'Fall from a height, axial load on the heel' },
    { value: 'crush', label: 'Crush or direct blow' },
    { value: 'repetitive', label: 'Repetitive loading, no single injury' },
  ] },
  ottawaUse: { id: 'ottawa-use', kind: 'choice', label: 'Ottawa foot rule', required: true, options: [
    { value: 'applied', label: 'Assessed' },
    { value: 'excluded', label: 'Could not be used (exclusionary criteria)' },
  ] },
  ottawa: { id: 'ottawa', kind: 'multi', label: 'Ottawa findings', showIf: (v) => str(v, 'ottawa-use') === 'applied', help: 'A foot series if midfoot pain and any of the other three.', options: [
    { value: 'midfoot-pain', label: 'Pain in the midfoot zone' },
    { value: 'fifth-tender', label: 'Bone tenderness at the base of the fifth metatarsal' },
    { value: 'navicular-tender', label: 'Bone tenderness over the navicular' },
    { value: 'weight', label: 'Unable to bear weight (four steps) both immediately and in the emergency department' },
  ] },
  forefoot: { id: 'forefoot', kind: 'choice', label: 'Injury suspected outside the midfoot zone', help: 'A metatarsophalangeal joint, a metatarsal or a toe.', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  signs: { id: 'signs', kind: 'multi', label: 'Clinical signs', options: [
    { value: 'ecchymosis', label: 'Plantar ecchymosis of the midfoot' },
  ] },

  views: { id: 'views', kind: 'choice', label: 'Views', required: true, options: [
    { value: 'complete', label: 'AP, oblique and lateral' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'ap', label: 'AP (dorsoplantar)' },
    { value: 'oblique', label: 'Oblique' },
    { value: 'lateral', label: 'Lateral' },
  ] },
  weightBearing: { id: 'weight-bearing', kind: 'choice', label: 'Weight-bearing', options: [
    { value: 'yes', label: 'Weight-bearing' },
    { value: 'no', label: 'Non-weight-bearing' },
  ] },
  extraViews: { id: 'extra-views', kind: 'multi', label: 'Added views', options: [
    { value: 'axial', label: 'Axial view of the calcaneus' },
    { value: 'ankle', label: 'AP ankle including the fifth metatarsal base' },
    { value: 'other-foot', label: 'The other foot for comparison' },
  ] },

  tmt: { id: 'tmt', kind: 'choice', label: 'Tarsometatarsal alignment', required: true, options: [
    { value: 'aligned', label: 'Aligned' },
    { value: 'malaligned', label: 'Malaligned' },
  ] },
  malalignment: { id: 'malalignment', kind: 'multi', label: 'Malalignment', showIf: (v) => str(v, 'tmt') === 'malaligned', options: [
    { value: 'm2', label: 'Second metatarsal base off the middle cuneiform (AP)' },
    { value: 'm1', label: 'First metatarsal base off the medial cuneiform (AP)' },
    { value: 'm4', label: 'Fourth metatarsal base off the cuboid (oblique)' },
    { value: 'dorsal', label: 'Metatarsal bases displaced dorsally or plantarly (lateral)' },
  ] },
  c1m2: { id: 'c1m2', kind: 'number', label: 'Medial cuneiform to second metatarsal base', unit: 'mm', min: 0, max: 30, step: 0.5, help: '2 mm or less (Crone).' },
  bohler: { id: 'bohler', kind: 'number', label: "Böhler's angle", unit: '°', min: -30, max: 70, step: 1, help: '25° to 40° (Crone).' },
  gissane: { id: 'gissane', kind: 'number', label: 'Critical angle of Gissane', unit: '°', min: 60, max: 180, step: 1, help: '120° to 145° (Crone).' },

  lisfranc: { id: 'lisfranc', kind: 'choice', label: 'Lisfranc injury', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'subtle', label: 'Subtle: diastasis or malalignment, no dislocation' },
    { value: 'dislocation', label: 'Fracture-dislocation' },
  ] },
  myersonFirst: { id: 'myerson-first', kind: 'choice', label: 'First metatarsal', showIf: dislocated, options: [
    { value: 'none', label: 'Aligned with the medial cuneiform' },
    { value: 'medial', label: 'Displaced medially' },
    { value: 'with-lesser', label: 'Displaced with the lesser metatarsals, in the same direction' },
  ] },
  myersonLesser: { id: 'myerson-lesser', kind: 'choice', label: 'Second to fifth metatarsals displaced (laterally, or with the first metatarsal)', showIf: dislocated, options: [
    { value: 'none', label: 'None' },
    { value: 'some', label: 'Some, not all four' },
    { value: 'all', label: 'All four' },
  ] },
  fleck: { id: 'fleck', kind: 'choice', label: 'Fleck sign', help: 'A small fragment in the first intermetatarsal space.', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  navicular: { id: 'navicular', kind: 'choice', label: 'Navicular fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  midfootOther: { id: 'midfoot-other', kind: 'multi', label: 'Other midfoot fractures', options: [
    { value: 'cuboid', label: 'Cuboid' },
    { value: 'cuneiform', label: 'Cuneiform' },
  ] },

  fifth: { id: 'fifth', kind: 'choice', label: 'Fifth metatarsal fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'zone1', label: 'Zone 1: tuberosity avulsion' },
    { value: 'zone2', label: 'Zone 2: Jones fracture, into the 4–5 joint' },
    { value: 'zone3', label: 'Zone 3: proximal diaphysis, distal to the 4–5 joint' },
    { value: 'distal', label: "Distal shaft, spiral (dancer's)" },
  ] },
  cuboidJoint: { id: 'cuboid-joint', kind: 'choice', label: 'Into the joint with the cuboid', showIf: (v) => str(v, 'fifth') === 'zone1', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  torg: { id: 'torg', kind: 'choice', label: 'Torg type', showIf: (v) => ['zone2', 'zone3'].includes(str(v, 'fifth')), options: [
    { value: 'I', label: 'I: narrow line, no intramedullary sclerosis (acute)' },
    { value: 'II', label: 'II: widened line, intramedullary sclerosis (delayed union)' },
    { value: 'III', label: 'III: medullary canal obliterated by sclerotic bone (non-union)' },
  ] },
  otherMets: { id: 'other-mets', kind: 'multi', label: 'Other metatarsal fractures', options: [
    { value: 'first', label: 'First' },
    { value: 'second', label: 'Second' },
    { value: 'third', label: 'Third' },
    { value: 'fourth', label: 'Fourth' },
  ] },
  otherMetsBase: { id: 'other-mets-base', kind: 'choice', label: 'At the base', showIf: (v) => list(v, 'other-mets').length > 0, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  stress: { id: 'stress', kind: 'choice', label: 'Stress fracture', options: [
    { value: 'none', label: 'None seen' },
    { value: 'present', label: 'Lucent line, periosteal reaction or callus' },
  ] },
  stressSite: { id: 'stress-site', kind: 'text', label: 'Where', placeholder: 'e.g. second metatarsal shaft', showIf: present('stress') },
  toes: { id: 'toes', kind: 'text', label: 'Toe fractures', placeholder: 'e.g. undisplaced fracture of the proximal phalanx of the fifth toe' },

  calcaneus: { id: 'calcaneus', kind: 'choice', label: 'Calcaneal fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'extra', label: 'Extra-articular' },
    { value: 'intra', label: 'Intra-articular (posterior facet)' },
  ] },
  talarNeck: { id: 'talar-neck', kind: 'choice', label: 'Talar neck fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  talarDisplaced: { id: 'talar-displaced', kind: 'choice', label: 'Fracture', showIf: present('talar-neck'), options: [
    { value: 'undisplaced', label: 'Undisplaced or minimally displaced' },
    { value: 'displaced', label: 'Displaced' },
  ] },
  talarJoints: { id: 'talar-joints', kind: 'multi', label: 'Joints out of place', showIf: talarDisplaced, options: [
    { value: 'subtalar', label: 'Subtalar joint subluxed or dislocated' },
    { value: 'ankle', label: 'Talar body dislocated from the ankle joint' },
    { value: 'talonavicular', label: 'Talar head subluxed or dislocated at the talonavicular joint' },
  ] },
  otherTalus: { id: 'other-talus', kind: 'text', label: 'Other talar fractures', placeholder: 'e.g. lateral process' },

  swelling: { id: 'swelling', kind: 'multi', label: 'Soft-tissue swelling', options: [
    { value: 'dorsal', label: 'Dorsal midfoot' },
    { value: 'lateral', label: 'Lateral, over the fifth metatarsal base' },
    { value: 'heel', label: 'Heel' },
    { value: 'forefoot', label: 'Forefoot or toes' },
  ] },
  foreignBody: { id: 'foreign-body', kind: 'choice', label: 'Foreign body', options: [
    { value: 'none', label: 'Not suspected' },
    { value: 'seen', label: 'Radiopaque foreign body seen' },
    { value: 'suspected', label: 'Suspected, none seen' },
  ] },

  suspected: { id: 'suspected', kind: 'multi', label: 'Still suspected clinically, not shown', options: [
    { value: 'lisfranc', label: 'Lisfranc injury' },
    { value: 'occult', label: 'Occult fracture' },
    { value: 'stress', label: 'Stress fracture' },
  ] },
  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. os peroneum' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-lisfranc', label: 'No tarsometatarsal malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

/** FX1-3: the refined Ottawa foot rule, or '' while it is not assessed. */
function ottawaResult(values: Values): 'met' | 'not-met' | 'excluded' | '' {
  const use = str(values, 'ottawa-use')
  if (use === 'excluded') return 'excluded'
  if (use !== 'applied') return ''
  const found = list(values, 'ottawa')
  const other = ['fifth-tender', 'navicular-tender', 'weight'].some((item) => found.includes(item))
  return found.includes('midfoot-pain') && other ? 'met' : 'not-met'
}

function myersonType(values: Values) {
  if (!dislocated(values)) return undefined
  const first = (str(values, 'myerson-first') || 'none') as FirstRay
  const lesser = (str(values, 'myerson-lesser') || 'none') as LesserRays
  return myerson({ first, lesser })
}

function hawkinsInput(values: Values): HawkinsInput {
  const joints = list(values, 'talar-joints')
  return {
    displaced: talarDisplaced(values),
    subtalar: joints.includes('subtalar'),
    ankle: joints.includes('ankle'),
    talonavicular: joints.includes('talonavicular'),
  }
}

function hawkinsType(values: Values): HawkinsType | undefined {
  return present('talar-neck')(values) && str(values, 'talar-displaced') ? hawkins(hawkinsInput(values)) : undefined
}

// FX6-4: osteonecrosis in Halvorson's 848 fractures, as Alton reports them.
const AVN_RATES: Record<HawkinsType, string> = { I: '5.7%', II: '18.4%', III: '44.7%', IV: '12.1%' }

/** The signs of a Lisfranc injury entered in step 3 or 4. */
function lisfrancSigns(values: Values): string[] {
  const c1m2 = num(values, 'c1m2')
  return [
    str(values, 'tmt') === 'malaligned' && 'tarsometatarsal malalignment',
    c1m2 !== undefined && c1m2 > 2 && `a medial cuneiform to second metatarsal gap of ${c1m2} mm`,
    str(values, 'fleck') === 'yes' && 'a fleck sign',
  ].filter((item): item is string => Boolean(item))
}

function fracturesEntered(values: Values): string[] {
  return [
    str(values, 'lisfranc') === 'dislocation' && 'Lisfranc fracture-dislocation',
    str(values, 'fleck') === 'yes' && 'fleck sign',
    present('navicular')(values) && 'navicular fracture',
    ...chosen(values, fields.midfootOther).map((bone) => `${bone} fracture`),
    str(values, 'fifth') !== 'none' && str(values, 'fifth') !== '' && 'fifth metatarsal fracture',
    list(values, 'other-mets').length > 0 && 'metatarsal fracture',
    present('stress')(values) && 'stress fracture',
    str(values, 'toes') !== '' && 'toe fracture',
    ['extra', 'intra'].includes(str(values, 'calcaneus')) && 'calcaneal fracture',
    present('talar-neck')(values) && 'talar neck fracture',
    str(values, 'other-talus') !== '' && 'talar fracture',
  ].filter((item): item is string => Boolean(item))
}

/* Rule chips. */

function deriveHistory(values: Values): Derived[] {
  const out: Derived[] = []
  // FX1-3, FX1-6: the rule as the reason for the film, with the ACR ratings.
  const result = ottawaResult(values)
  const forefoot = str(values, 'forefoot') === 'yes'
  if (result === 'met') out.push({ label: 'Ottawa foot rule', value: 'Met: a foot series is indicated (ACR 9)' })
  if (result === 'not-met') out.push({ label: 'Ottawa foot rule', value: forefoot ? 'Not met; an injury outside its zone: foot radiographs (ACR 9)' : 'Not met: say why the film was taken' })
  if (result === 'excluded') out.push({ label: 'Ottawa foot rule', value: 'Could not be used: foot radiographs (ACR 9)' })
  // FX1-7: plantar ecchymosis.
  if (list(values, 'signs').includes('ecchymosis')) out.push({ label: 'Plantar ecchymosis', value: 'Highly suggestive of a Lisfranc injury', tone: 'warn' })
  // FX1-8 to FX1-11: what the mechanism points to.
  const mechanism = str(values, 'mechanism')
  if (mechanism === 'plantarflexed') out.push({ label: 'Mechanism', value: 'The usual Lisfranc mechanism; up to one-third are missed at first', tone: 'warn' })
  if (mechanism === 'inversion') out.push({ label: 'Mechanism', value: 'Inversion: check the fifth metatarsal tuberosity (zone 1)' })
  if (mechanism === 'fall') out.push({ label: 'Mechanism', value: 'Axial load: check the calcaneus, and the tibial plafond, tibial plateau and spine' })
  if (mechanism === 'repetitive') out.push({ label: 'Mechanism', value: 'Stress fracture: radiographs are often negative at first' })
  return out
}

function deriveViews(values: Values): Derived[] {
  const out: Derived[] = []
  // FX2-1, FX2-2: weight-bearing views for a suspected Lisfranc injury.
  if (str(values, 'weight-bearing') === 'no' && lisfrancMechanism(values)) {
    out.push({ label: 'Weight-bearing', value: 'Essential for a subtle Lisfranc injury (ACR 8)', tone: 'warn' })
  }
  // FX2-3: axial views of the calcaneus.
  if (str(values, 'mechanism') === 'fall' && !list(values, 'extra-views').includes('axial')) {
    out.push({ label: 'Calcaneus', value: 'Add axial views of the calcaneus' })
  }
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  // FX3-1, FX3-2: tarsometatarsal malalignment.
  if (str(values, 'tmt') === 'malaligned') out.push({ label: 'Tarsometatarsal joints', value: 'Malaligned: a Lisfranc injury', tone: 'warn' })
  // FX3-1: the medial cuneiform to second metatarsal gap, Crone's 2 mm.
  const c1m2 = num(values, 'c1m2')
  if (c1m2 !== undefined) {
    out.push(c1m2 > 2
      ? { label: 'C1–M2', value: `${c1m2} mm: over 2 mm suggests Lisfranc ligament insufficiency`, tone: 'warn' }
      : { label: 'C1–M2', value: `${c1m2} mm: 2 mm or less; compare with the other foot if still suspected` })
    // FX3-3: Hammad's proposed thresholds, by load.
    const load = str(values, 'weight-bearing')
    const threshold = load === 'yes' ? 5 : load === 'no' ? 3 : undefined
    if (threshold !== undefined && c1m2 > threshold) out.push({ label: 'Hammad threshold', value: `Over the proposed ${threshold} mm ${load === 'yes' ? 'with' : 'without'} weight-bearing`, tone: 'warn' })
  }
  // FX3-4, FX3-6: Böhler's angle.
  const bohler = num(values, 'bohler')
  if (bohler !== undefined) {
    if (bohler < 25) out.push({ label: "Böhler's angle", value: `Under 25°: posterior facet depressed${bohler >= 20 ? " (within Sposeto's 20° to 40°)" : ''}`, tone: 'warn' })
    else if (bohler <= 40) out.push({ label: "Böhler's angle", value: 'Within 25° to 40°; a normal angle does not exclude an undisplaced fracture' })
    else out.push({ label: "Böhler's angle", value: 'Above 25° to 40°' })
  }
  // FX3-5: the critical angle of Gissane.
  const gissane = num(values, 'gissane')
  if (gissane !== undefined) {
    if (gissane > 145) out.push({ label: 'Gissane', value: 'Over 145°: depression at the subtalar joint', tone: 'warn' })
    else if (gissane >= 120) out.push({ label: 'Gissane', value: 'Within 120° to 145°' })
    else out.push({ label: 'Gissane', value: 'Under 120° to 145°; normal values from 95° to 150° are reported' })
  }
  return out
}

function deriveMidfoot(values: Values): Derived[] {
  const out: Derived[] = []
  const lisfranc = str(values, 'lisfranc')
  // FX4-1: the Myerson type, from the shared logic.
  if (lisfranc === 'dislocation' && str(values, 'myerson-first') && str(values, 'myerson-lesser')) {
    const type = myersonType(values)
    out.push(type
      ? { label: 'Myerson', value: `Type ${type} (${myersonGroup(type)}): ${myersonDescriptions[type]}`, tone: 'warn' }
      : { label: 'Myerson', value: 'No type for this pattern: describe the displacement' })
  }
  // FX4-2: the later proposed type D for a subtle injury.
  if (lisfranc === 'subtle') {
    const c1m2 = num(values, 'c1m2')
    out.push({ label: 'Type D (later proposal)', value: c1m2 === undefined ? 'D1 2 mm or less, D2 over 2 mm (medial cuneiform to second metatarsal)' : c1m2 <= 2 ? 'D1: 2 mm or less' : 'D2: over 2 mm', tone: 'warn' })
  }
  // FX3-2: the fleck sign.
  if (str(values, 'fleck') === 'yes') out.push({ label: 'Fleck sign', value: 'Avulsion of the Lisfranc ligament', tone: 'warn' })
  // FX4-6: navicular.
  if (present('navicular')(values)) out.push({ label: 'Navicular', value: 'In athletes CT is routinely done for displacement and complexity' })
  // FX4-4: fractures that come with a Lisfranc injury.
  const nearby = list(values, 'midfoot-other').length > 0 || present('navicular')(values)
  if (lisfranc === 'none' && nearby) out.push({ label: 'Lisfranc joint', value: 'Lisfranc injuries come with fractures of the navicular, cuneiforms and cuboid: check the alignment' })
  return out
}

const TORG_WORDS: Record<string, string> = { I: 'Type I: acute', II: 'Type II: delayed union', III: 'Type III: non-union' }

function deriveMetatarsals(values: Values): Derived[] {
  const out: Derived[] = []
  const fifth = str(values, 'fifth')
  // FX5-2: the zones.
  if (fifth === 'zone1') {
    out.push({ label: 'Zone 1', value: 'Over 90% of fifth metatarsal fractures; most heal without surgery' })
    if (str(values, 'cuboid-joint') === 'yes') out.push({ label: 'Cuboid joint', value: 'Give the share of the joint: more than a third may need fixation' })
  }
  if (fifth === 'zone2') out.push({ label: 'Zone 2', value: 'Jones fracture: watershed; non-union up to 21% without surgery', tone: 'warn' })
  if (fifth === 'zone3') out.push({ label: 'Zone 3', value: 'Proximal diaphyseal stress fracture; non-union up to 21% without surgery', tone: 'warn' })
  if (fifth === 'distal') out.push({ label: 'Distal shaft', value: "Dancer's fracture, outside the three proximal zones" })
  // FX5-3: the Torg type.
  const torg = str(values, 'torg')
  if (['zone2', 'zone3'].includes(fifth) && TORG_WORDS[torg]) out.push({ label: 'Torg', value: TORG_WORDS[torg], tone: torg === 'I' ? 'neutral' : 'warn' })
  // FX4-4: a metatarsal base fracture.
  if (str(values, 'other-mets-base') === 'yes' && str(values, 'lisfranc') === 'none') out.push({ label: 'Lisfranc joint', value: 'Metatarsal base fracture: check the tarsometatarsal alignment' })
  // FX5-4, FX5-5: a stress fracture not seen.
  const anyMet = (fifth !== 'none' && fifth !== '') || list(values, 'other-mets').length > 0
  if (str(values, 'mechanism') === 'repetitive' && str(values, 'stress') === 'none' && !anyMet) {
    out.push({ label: 'Stress fracture', value: 'Radiographs 12% to 56% sensitive: MRI if still suspected', tone: 'warn' })
  }
  return out
}

function deriveHindfoot(values: Values): Derived[] {
  const out: Derived[] = []
  const calcaneus = str(values, 'calcaneus')
  // FX6-1, FX6-2: the Sanders type is read on CT.
  if (calcaneus === 'intra') out.push({ label: 'Sanders', value: 'Typed on coronal CT, where the posterior facet is widest', tone: 'warn' })
  // FX1-9: associated injuries.
  if (calcaneus === 'intra' || calcaneus === 'extra') out.push({ label: 'Associated injuries', value: 'Check the tibial plafond, tibial plateau and spine' })
  // FX6-3: the Hawkins type, from the shared logic.
  if (present('talar-neck')(values) && str(values, 'talar-displaced')) {
    const type = hawkinsType(values)
    if (type) {
      out.push({ label: 'Hawkins', value: `Type ${type}: ${hawkinsDescriptions[type]}`, tone: type === 'I' ? 'neutral' : 'warn' })
      const gaps = hawkinsGaps(hawkinsInput(values))
      if (gaps.length > 0) out.push({ label: 'Check', value: `Type ${type} normally includes the joint injuries of type ${gaps.join(' and ')}, not marked` })
      // FX6-4: osteonecrosis by type.
      out.push({ label: 'Osteonecrosis', value: `${AVN_RATES[type]} of type ${type} in Halvorson's 848 fractures` })
    } else {
      out.push({ label: 'Hawkins', value: 'No type: Hawkins named none for a displaced fracture with every joint in place' })
    }
    // FX6-5: the Hawkins sign at follow-up.
    out.push({ label: 'Follow-up', value: 'Hawkins sign: subchondral lucency in the talar dome on the AP at 6 to 8 weeks' })
  }
  return out
}

function deriveSoft(values: Values): Derived[] {
  // FX7-1: a foreign body suspected but not seen.
  return str(values, 'foreign-body') === 'suspected' ? [{ label: 'Foreign body', value: 'Not seen: ultrasound next (ACR 9)', tone: 'warn' }] : []
}

/* Report lines. */

function clinicalLines(values: Values): (string | false)[] {
  const side = str(values, 'side')
  const clinical = join([side && `${side.toLowerCase()} foot`, picked(values, fields.mechanism), ...chosen(values, fields.signs)], ', ')
  const result = ottawaResult(values)
  const findings = chosen(values, fields.ottawa)
  const ottawa = {
    met: `met${findings.length > 0 ? ` (${findings.join(', ')})` : ''}`,
    'not-met': `not met${str(values, 'forefoot') === 'yes' ? '; injury suspected outside the midfoot zone' : ''}`,
    excluded: 'could not be used (exclusionary criteria)',
    '': '',
  }[result]
  return [clinical && `Clinical: ${clinical}`, ottawa && `Ottawa foot rule: ${ottawa}`]
}

function viewLines(values: Values): (string | false)[] {
  const views = str(values, 'views')
  const missing = chosen(values, fields.viewsMissing)
  const load = str(values, 'weight-bearing')
  const extra = chosen(values, fields.extraViews)
  const detail = join([load === 'yes' && 'weight-bearing', load === 'no' && 'non-weight-bearing', extra.length > 0 && `with ${andList(extra)}`], ', ')
  return [
    views === 'complete' && `Views: AP, oblique and lateral${detail ? `, ${detail}` : ''}`,
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}${detail ? `; ${detail}` : ''}`,
  ]
}

function alignmentLines(values: Values): (string | false)[] {
  const c1m2 = num(values, 'c1m2')
  const bohler = num(values, 'bohler')
  const gissane = num(values, 'gissane')
  const tmt = str(values, 'tmt')
  const mal = chosen(values, fields.malalignment)
  return [
    tmt === 'aligned' && 'Tarsometatarsal alignment: normal',
    tmt === 'malaligned' && `Tarsometatarsal alignment: malaligned${mal.length > 0 ? ` (${mal.join(', ')})` : ''}`,
    c1m2 !== undefined && `Medial cuneiform to second metatarsal base: ${c1m2} mm`,
    bohler !== undefined && `Böhler's angle: ${bohler}°`,
    gissane !== undefined && `Critical angle of Gissane: ${gissane}°`,
  ]
}

function boneLines(values: Values): (string | false)[] {
  const lisfranc = str(values, 'lisfranc')
  const mets = chosen(values, fields.otherMets)
  return [
    lisfranc === 'none' && 'Lisfranc joint: no injury',
    lisfranc === 'subtle' && 'Lisfranc joint: subtle injury, no dislocation',
    lisfranc === 'dislocation' && `Lisfranc joint: fracture-dislocation${str(values, 'myerson-first') ? `; first metatarsal ${picked(values, fields.myersonFirst)}` : ''}${str(values, 'myerson-lesser') ? `; second to fifth metatarsals displaced: ${picked(values, fields.myersonLesser)}` : ''}`,
    str(values, 'fleck') === 'yes' && 'Fleck sign: present',
    str(values, 'navicular') === 'none' && 'Navicular: no fracture',
    present('navicular')(values) && 'Navicular: fracture',
    list(values, 'midfoot-other').length > 0 && `Other midfoot fractures: ${chosen(values, fields.midfootOther).join(', ')}`,
    str(values, 'fifth') && `Fifth metatarsal: ${str(values, 'fifth') === 'none' ? 'no fracture' : join([picked(values, fields.fifth), str(values, 'cuboid-joint') === 'yes' && 'into the joint with the cuboid', str(values, 'torg') && `Torg type ${str(values, 'torg')}`], ', ')}`,
    mets.length > 0 && `Other metatarsal fractures: ${mets.join(', ')}${str(values, 'other-mets-base') === 'yes' ? ', at the base' : ''}`,
    present('stress')(values) && `Stress fracture: ${str(values, 'stress-site') || 'present'}`,
    str(values, 'toes') && `Toes: ${str(values, 'toes')}`,
    str(values, 'calcaneus') && `Calcaneus: ${str(values, 'calcaneus') === 'none' ? 'no fracture' : picked(values, fields.calcaneus)}`,
    str(values, 'talar-neck') === 'none' && 'Talar neck: no fracture',
    present('talar-neck')(values) && `Talar neck: fracture${str(values, 'talar-displaced') ? `, ${picked(values, fields.talarDisplaced)}` : ''}${list(values, 'talar-joints').length > 0 ? `; ${chosen(values, fields.talarJoints).join(', ')}` : ''}`,
    str(values, 'other-talus') && `Other talar fractures: ${str(values, 'other-talus')}`,
  ]
}

function softLines(values: Values): (string | false)[] {
  const swelling = chosen(values, fields.swelling)
  return [
    swelling.length > 0 && `Soft-tissue swelling: ${swelling.join(', ')}`,
    str(values, 'foreign-body') === 'seen' && 'Foreign body: radiopaque foreign body',
    str(values, 'foreign-body') === 'suspected' && 'Foreign body: none seen',
  ]
}

/* The impression. */

const ORDINALS: Record<string, string> = { first: 'first', second: 'second', third: 'third', fourth: 'fourth' }

const FIFTH_WORDS: Record<string, string> = {
  zone1: 'fifth metatarsal fracture, zone 1 (tuberosity avulsion)',
  zone2: 'fifth metatarsal fracture, zone 2 (Jones fracture, into the fourth-fifth intermetatarsal joint)',
  zone3: 'fifth metatarsal fracture, zone 3 (proximal diaphysis)',
  distal: "spiral fracture of the distal fifth metatarsal shaft (dancer's fracture)",
}

function sided(side: string, rest: string): string {
  return side ? `${side} ${lowerFirst(rest)}` : upperFirst(rest)
}

function findings(values: Values): string[] {
  const side = str(values, 'side')
  const out: string[] = []
  const lisfranc = str(values, 'lisfranc')
  if (lisfranc === 'dislocation') {
    const type = myersonType(values)
    out.push(type ? sided(side, myersonSentence(type)) : `${sided(side, 'tarsometatarsal (Lisfranc) fracture-dislocation')}.`)
  }
  if (lisfranc === 'subtle') {
    const signs = lisfrancSigns(values).filter((sign) => sign !== 'a fleck sign')
    out.push(`${sided(side, `Lisfranc injury without dislocation${signs.length > 0 ? `: ${andList(signs)}` : ''}`)}.`)
  }
  if (lisfranc !== 'none' && str(values, 'fleck') === 'yes') out.push('Fleck sign: avulsion of the Lisfranc ligament.')
  if (present('navicular')(values)) out.push(`${sided(side, 'navicular fracture')}.`)
  for (const bone of chosen(values, fields.midfootOther)) out.push(`${sided(side, `${bone} fracture`)}.`)
  const fifth = FIFTH_WORDS[str(values, 'fifth')]
  if (fifth) {
    const torg = str(values, 'torg')
    const extra = join([str(values, 'fifth') === 'zone1' && str(values, 'cuboid-joint') === 'yes' && 'entering the joint with the cuboid', ['zone2', 'zone3'].includes(str(values, 'fifth')) && torg && `Torg type ${torg}`], ', ')
    out.push(`${sided(side, fifth)}${extra ? `, ${extra}` : ''}.`)
  }
  const mets = list(values, 'other-mets').map((met) => ORDINALS[met])
  if (mets.length > 0) out.push(`${sided(side, `fracture${str(values, 'other-mets-base') === 'yes' ? ` of the base` : ''} of the ${andList(mets)} metatarsal${mets.length > 1 ? 's' : ''}`)}.`)
  if (present('stress')(values)) out.push(`${sided(side, `stress fracture${str(values, 'stress-site') ? `: ${str(values, 'stress-site').replace(/\.$/, '')}` : ''}`)}.`)
  const toes = str(values, 'toes')
  if (toes) out.push(`${upperFirst(toes.replace(/\.$/, ''))}.`)
  const calcaneus = str(values, 'calcaneus')
  const bohler = num(values, 'bohler')
  if (calcaneus === 'intra') {
    out.push(`${sided(side, `intra-articular calcaneal fracture${bohler !== undefined ? `, Böhler's angle ${bohler}°` : ''}`)}.`)
    // FX8-1, FX6-1, FX6-2: CT for the Sanders type and planning.
    out.push('Consider CT to type it (Sanders) and plan treatment.')
  }
  if (calcaneus === 'extra') out.push(`${sided(side, 'extra-articular calcaneal fracture')}.`)
  if (present('talar-neck')(values)) {
    const type = hawkinsType(values)
    out.push(type ? sided(side, hawkinsSentence(type)) : `${sided(side, 'talar neck fracture')}.`)
  }
  const otherTalus = str(values, 'other-talus')
  if (otherTalus) out.push(`${upperFirst(otherTalus.replace(/\.$/, ''))}.`)
  if (str(values, 'foreign-body') === 'seen') out.push(`Radiopaque foreign body${side ? ` in the ${side.toLowerCase()} foot` : ''}.`)
  return out
}

/** FX8-1: an injury still suspected but not shown, with the next test the sources support. */
function suspectedLines(values: Values): string[] {
  const out: string[] = []
  const suspected = list(values, 'suspected')
  if (suspected.includes('lisfranc')) out.push('A Lisfranc injury is not excluded: MRI or CT if it is still suspected.')
  if (suspected.includes('occult')) out.push('An occult fracture is not excluded: MRI or CT if it is still suspected.')
  if (suspected.includes('stress')) out.push('Radiographs can miss a stress fracture: MRI if it is still suspected.')
  if (str(values, 'foreign-body') === 'suspected') out.push('No radiopaque foreign body seen: ultrasound if one is still suspected.')
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

const NORMAL_IMPRESSION = 'No fracture or tarsometatarsal malalignment.'

function impression(values: Values): string {
  const found = findings(values)
  const suspected = suspectedLines(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  // A Lisfranc sign or a measurement out of range is not a finding the impression can name.
  const unnamed = lisfrancSigns(values).length > 0 || (num(values, 'bohler') ?? 30) < 25 || (num(values, 'gissane') ?? 130) > 145
  if (found.length === 0) {
    if (other || unnamed) return `Impression: ${lines(limited, 'Findings as above.', ...suspected, ...negatives)}`
    if (!complete(values)) return suspected.length > 0 ? `Impression: ${lines(...suspected)}` : ''
    return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...suspected)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...suspected, ...negatives)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = fracturesEntered(values)
  if (negatives.includes('no-fracture') && fractures.length > 0) out.push(`Impression says no fracture, but these are entered: ${fractures.join(', ')}.`)
  const lisfranc = str(values, 'lisfranc')
  const signs = lisfrancSigns(values)
  if (negatives.includes('no-lisfranc') && (signs.length > 0 || (lisfranc !== '' && lisfranc !== 'none'))) out.push('Impression says no tarsometatarsal malalignment, but a Lisfranc injury or its signs are entered.')
  // FX3-1, FX3-2: a Lisfranc sign with no Lisfranc injury entered.
  if (lisfranc === 'none' && signs.length > 0) out.push(`${upperFirst(andList(signs))} ${signs.length > 1 ? 'are' : 'is'} entered, but no Lisfranc injury.`)
  // FX3-1, FX3-2: a Lisfranc injury with none of its signs.
  if ((lisfranc === 'subtle' || lisfranc === 'dislocation') && signs.length === 0 && str(values, 'tmt') !== '') {
    out.push('A Lisfranc injury is entered with none of its signs: check the second and fourth metatarsal alignment, the medial cuneiform to second metatarsal gap and a fleck sign.')
  }
  // FX3-4: a low Böhler's angle with no calcaneal fracture.
  const bohler = num(values, 'bohler')
  if (bohler !== undefined && bohler < 25 && str(values, 'calcaneus') === 'none') out.push("Böhler's angle is under 25°, but no calcaneal fracture is entered.")
  // FX3-4: an intra-articular fracture without Böhler's angle.
  if (str(values, 'calcaneus') === 'intra' && bohler === undefined) out.push("An intra-articular calcaneal fracture is entered: measure Böhler's angle on the lateral view.")
  return out
}

function build(values: Values) {
  const text = lines(
    ...clinicalLines(values),
    ...viewLines(values),
    ...alignmentLines(values),
    ...boneLines(values),
    ...softLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'history',
    title: 'Step 1. Why the film: the injury and the Ottawa foot rule',
    learn: 'history',
    teach: (
      <>
        <p>A foot series if there is midfoot pain and any of: tenderness at the base of the fifth metatarsal, tenderness over the navicular, or inability to bear weight both immediately and in the emergency department ({STIELL_1993}; {BESSEN}), four steps ({CHLOROS}). The ACR rates radiographs 9 when the rule is met, when it cannot be used, and for an injury outside its zone ({ACR}).</p>
        <p>Plantar ecchymosis is highly suggestive of a Lisfranc injury ({MORACIA}); an axial load on a plantarflexed foot is the usual mechanism ({HAMMAD}).</p>
      </>
    ),
    fields: [fields.side, fields.mechanism, fields.ottawaUse, fields.ottawa, fields.forefoot, fields.signs],
    derive: deriveHistory,
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    learn: 'views',
    teach: <p>AP, oblique and lateral; weight-bearing for a subtle Lisfranc injury ({HAMMAD}; {ACR}); axial views for the calcaneus ({SPOSETO}); an AP ankle including the fifth metatarsal base for tuberosity avulsions ({CHLOROS}).</p>,
    fields: [fields.views, fields.viewsMissing, fields.weightBearing, fields.extraViews],
    derive: deriveViews,
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and measurements',
    learn: 'alignment',
    teach: (
      <>
        <p>AP: the medial borders of the middle cuneiform and second metatarsal base line up; medial cuneiform to second metatarsal base 2 mm or less ({CRONE}). Oblique: the medial borders of the cuboid and fourth metatarsal line up ({MORACIA}). Hammad's proposed thresholds are higher ({HAMMAD}).</p>
        {anglesTable}
      </>
    ),
    fields: [fields.tmt, fields.malalignment, fields.c1m2, fields.bohler, fields.gissane],
    derive: deriveAlignment,
  },
  {
    id: 'midfoot',
    title: 'Step 4. Lisfranc joint and midfoot',
    learn: 'midfoot',
    teach: (
      <>
        <p>Type a fracture-dislocation by Myerson, as the {myersonLink} does ({MYERSON}; {DIEBAL}; {TZATZAIRIS}; {GUPTA}). A subtle injury has no 1986 type; the later type D splits at 2 mm ({MORACIA}). A fleck sign is a Lisfranc ligament avulsion ({MORACIA}).</p>
        {myersonTable}
      </>
    ),
    fields: [fields.lisfranc, fields.myersonFirst, fields.myersonLesser, fields.fleck, fields.navicular, fields.midfootOther],
    derive: deriveMidfoot,
  },
  {
    id: 'metatarsals',
    title: 'Step 5. Metatarsals and toes',
    learn: 'metatarsals',
    teach: (
      <>
        <p>Name the fifth metatarsal zone, as on the {fifthLink} ({LAWRENCE}; {CHLOROS}), and for zone 2 or 3 the Torg type ({TORG}). Radiographs are 12% to 56% sensitive for stress fractures ({WRIGHT}).</p>
        {zonesTable}
      </>
    ),
    fields: [fields.fifth, fields.cuboidJoint, fields.torg, fields.otherMets, fields.otherMetsBase, fields.stress, fields.stressSite, fields.toes],
    derive: deriveMetatarsals,
  },
  {
    id: 'hindfoot',
    title: 'Step 6. Calcaneus and talus',
    learn: 'hindfoot',
    teach: (
      <>
        <p>An intra-articular calcaneal fracture is typed on coronal CT, as the {sandersLink} does ({JIMENEZ}); CT also plans treatment ({SPOSETO}). Type a talar neck fracture from the radiograph, as the {hawkinsLink} does ({HAWKINS}; {CANALE}; {ALTON}).</p>
        {hawkinsTable}
      </>
    ),
    fields: [fields.calcaneus, fields.talarNeck, fields.talarDisplaced, fields.talarJoints, fields.otherTalus],
    derive: deriveHindfoot,
  },
  {
    id: 'soft-tissues',
    title: 'Step 7. Soft tissues',
    learn: 'soft-tissues',
    teach: <p>Give the site of any swelling. A suspected foreign body not seen on radiographs: ultrasound next ({ACR}).</p>,
    fields: [fields.swelling, fields.foreignBody],
    derive: deriveSoft,
  },
  {
    id: 'impression',
    title: 'Step 8. Other findings and the impression',
    learn: 'impression',
    teach: <p>Name the Myerson type, the zone and the Hawkins type. If an injury is still suspected: MRI or CT for a Lisfranc injury or an occult fracture ({ACR}), MRI for a stress fracture ({WRIGHT}).</p>,
    fields: [fields.suspected, fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'foot-xray',
  name: 'Foot X-ray for injury',
  lede: 'Read an adult\'s foot radiographs after an injury: the Ottawa foot rule as the reason for the film, the views, Lisfranc alignment and Myerson types, the fifth metatarsal zones, Böhler\'s and Gissane\'s angles, the calcaneus and the talar neck, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings; the Myerson, Sanders and Hawkins types are the site\'s calculators\', with the reviews that state them cited beside the original papers.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'ottawa',
      question: 'After a twisting injury, a patient has midfoot pain and bone tenderness over the navicular, and can walk. Is a foot series indicated by the Ottawa foot rule?',
      options: ['No: they can bear weight', 'Yes: midfoot pain with navicular tenderness is enough', 'Only if the cuboid is tender', 'Only if they are over 55'],
      answer: 1,
      explanation: <p>A foot series is required if there is midfoot pain and any of: tenderness at the base of the fifth metatarsal, tenderness over the navicular, or inability to bear weight both immediately and in the emergency department ({BESSEN}). The refined rule was 100% sensitive for midfoot fractures ({STIELL_1993}).</p>,
    },
    {
      id: 'weight-bearing',
      question: 'A Lisfranc injury is suspected and the non-weight-bearing films look normal. What does Hammad advise?',
      options: ['Nothing more is needed', 'Weight-bearing radiographs, which can show widening or malalignment', 'A bone scan', 'Repeat the same views in six weeks'],
      answer: 1,
      explanation: <p>Weight-bearing radiographs are essential for subtle injuries and can show widening or malalignment when non-weight-bearing images appear normal ({HAMMAD}).</p>,
    },
    {
      id: 'c1m2',
      question: 'On the dorsoplantar view, the medial cuneiform to second metatarsal base distance is 3 mm. What does Crone\'s guide say?',
      options: ['Normal', 'Over 2 mm suggests Lisfranc ligament insufficiency', 'It only matters over 10 mm', 'It measures the first intermetatarsal angle'],
      answer: 1,
      explanation: <p>The distance should be 2 mm or less; more, or asymmetry with the other foot, suggests Lisfranc ligament insufficiency ({CRONE}).</p>,
    },
    {
      id: 'fleck',
      question: 'A small bone fragment lies in the first intermetatarsal space. What is it called and what does it mean?',
      options: ['Os peroneum, a normal ossicle', 'The fleck sign, avulsion of the Lisfranc ligament', 'The Hawkins sign, a viable talus', 'A zone 1 avulsion'],
      answer: 1,
      explanation: <p>The fleck sign indicates avulsion of the Lisfranc ligament ({MORACIA}).</p>,
    },
    {
      id: 'myerson',
      question: 'The first metatarsal is displaced medially and all four lesser metatarsals laterally. Which Myerson type?',
      options: ['A', 'B1', 'C1', 'C2'],
      answer: 3,
      explanation: <p>Type C2 is divergent: the first metatarsal displaced medially and all of metatarsals 2 to 5 laterally; C1 is partial ({TZATZAIRIS}; {DIEBAL}).</p>,
    },
    {
      id: 'zone',
      question: 'A fifth metatarsal fracture runs into the joint between the fourth and fifth metatarsal bases. Which zone?',
      options: ['Zone 1', 'Zone 2 (Jones fracture)', 'Zone 3', "Dancer's fracture"],
      answer: 1,
      explanation: <p>Zone 2 is the metaphyseal-diaphyseal junction, extending into the fourth-fifth intermetatarsal facet; zone 1 is the tuberosity and zone 3 the proximal 1.5 cm of the shaft beyond it ({CHLOROS}; {LAWRENCE}).</p>,
    },
    {
      id: 'torg',
      question: 'A zone 3 fracture has a widened line with intramedullary sclerosis. Which Torg type?',
      options: ['Type I, acute', 'Type II, delayed union', 'Type III, non-union', 'It cannot be graded on a radiograph'],
      answer: 1,
      explanation: <p>Torg's type II (delayed union) has a widened fracture line and intramedullary sclerosis; type III has the canal obliterated by sclerotic bone ({TORG}).</p>,
    },
    {
      id: 'bohler',
      question: 'After a fall from a height, Böhler\'s angle is 15°. What does it suggest?',
      options: ['Normal', 'Depression of the posterior calcaneal facet', 'A talar neck fracture', 'A Lisfranc injury'],
      answer: 1,
      explanation: <p>Generally accepted normal values are 25° to 40°, and under 25° suggests depression of the posterior facet; a normal angle does not exclude an undisplaced fracture ({CRONE}).</p>,
    },
    {
      id: 'sanders',
      question: 'An intra-articular calcaneal fracture is seen on radiographs. Where is the Sanders type read?',
      options: ['On the lateral radiograph', 'On the axial calcaneal view', 'On coronal CT, where the posterior facet is widest', 'On MRI'],
      answer: 2,
      explanation: <p>Sanders typed fractures on the coronal CT image with the widest undersurface of the posterior facet, and the system needs coronal CT ({JIMENEZ}; {SANDERS}).</p>,
    },
    {
      id: 'hawkins',
      question: 'A displaced talar neck fracture has a subluxed subtalar joint, and the talus sits in the ankle mortise. Which Hawkins type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>Type II is displaced with subluxation or dislocation of the subtalar joint while the talus stays reduced in the ankle mortise; type III adds dislocation of the ankle ({ALTON}).</p>,
    },
    {
      id: 'hawkins-sign',
      question: 'What is the Hawkins sign and when is it looked for?',
      options: ['Sclerosis of the talar dome at 1 week', 'Subchondral lucency in the talar dome on the AP at 6 to 8 weeks, a sign of a viable talus', 'A fragment in the sinus tarsi', 'Collapse of the talar dome at a year'],
      answer: 1,
      explanation: <p>Subchondral atrophy in the talar dome on the AP radiograph 6 to 8 weeks after injury; its presence is a good sign, its absence not a reliable sign of osteonecrosis ({ALTON}; {TEZVAL}).</p>,
    },
    {
      id: 'stress',
      question: 'A runner has forefoot pain for two weeks and normal radiographs. What does the evidence say?',
      options: ['A stress fracture is excluded', 'Radiographs are 12% to 56% sensitive; MRI is the most sensitive test', 'CT is the most sensitive test', 'A bone scan is preferred to MRI'],
      answer: 1,
      explanation: <p>Radiographs are likely to be falsely negative early, and MRI was the most sensitive and specific test ({WRIGHT}); the ACR uses MRI for stress fractures the radiographs do not show ({ACR_STRESS}).</p>,
    },
  ],
}

export function FootXrayStudyPage() {
  return <StudyPage study={study} />
}
