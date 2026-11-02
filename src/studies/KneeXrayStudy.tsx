import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { kneeXrayScans } from '../data/scans/kneeXray'
import { schatzkerScans } from '../data/scans/schatzker'
import { schatzker, schatzkerDescriptions, schatzkerSentence, schatzkerTypes } from '../logic/schatzker'
import type { DepressionSite, LateralPattern, Plateau, SchatzkerResult } from '../logic/schatzker'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract, an open full text (Crone,
 * Parkar, Jarraya, Akdag, Li, Fogagnolo) or the ACR's published ratings table before it went in.
 * The claims table is docs/superpowers/research/2026-11-01-knee-xray-sources.md (KX claims); rule
 * chips and warnings carry its claim IDs. The Schatzker types come from the shared calculator logic
 * (src/logic/schatzker.ts) and the Segond and lipohaemarthrosis statements from the knee MRI study,
 * with the same citations. Schatzker 1979 has no DOI, so its citation stays plain text.
 */

/** Schatzker 1979 has no DOI (none on Crossref), so it is cited in plain text. */
const SCHATZKER = 'Schatzker et al., Clin Orthop Relat Res 1979'
const STIELL_1995_DOI = '10.1016/s0196-0644(95)70106-0'
const STIELL_1996_DOI = '10.1001/jama.1996.03530320035031'
const STIELL_1997_DOI = '10.1001/jama.1997.03550230051036'
const BACHMANN_DOI = '10.7326/0003-4819-140-5-200403020-00013'
const ACR_DOI = '10.1016/j.jacr.2020.01.041'
const HALL_DOI = '10.1148/115.1.49'
const CRONE_DOI = '10.1007/s00256-026-05187-2'
const FERGUSON_DOI = '10.1016/0020-1383(94)90242-9'
const TOSUN_DOI = '10.1007/s00330-023-10163-8'
const GOLDMAN_DOI = '10.2214/ajr.151.6.1163'
const JARRAYA_DOI = '10.1007/s13244-016-0535-0'
const COBBY_DOI = '10.1148/radiology.184.3.1509079'
const LODEWIJKS_DOI = '10.1007/s00167-018-5214-x'
const MARKHARDT_DOI = '10.1148/rg.292085078'
const CAMPOS_DOI = '10.1148/radiology.219.2.r01ma23381'
const ESSR_DOI = '10.1007/s00330-024-10706-7'
const HALL_HOCHMAN_DOI = '10.1007/s002560050285'
const HUANG_DOI = '10.2214/ajr.180.2.1800381'
const JUHNG_DOI = '10.2214/ajr.178.3.1780583'
const GOTTSEGEN_DOI = '10.1148/rg.286085503'
const WHITE_DOI = '10.1007/s10140-013-1121-0'
const MEYERS_DOI = '10.2106/00004623-195941020-00002'
const LI_DOI = '10.3389/fped.2024.1347637'
const ELLIS_DOI = '10.1097/BPO.0000000000001654'
const AKDAG_DOI = '10.5114/pjr.2019.91163'
const NORK_DOI = '10.2106/JBJS.D.01751'
const FOGAGNOLO_DOI = '10.1055/s-0046-1822639'
const LEE_DOI = '10.1148/radiology.173.1.2781006'
const LUGO_DOI = '10.1148/radiology.198.2.8596856'
const TAI_DOI = '10.2214/AJR.09.2562'
const CECAVA_DOI = '10.1007/s10140-018-1605-z'

const STIELL_1995 = <Cite doi={STIELL_1995_DOI}>Stiell et al., Ann Emerg Med 1995</Cite>
const STIELL_1996 = <Cite doi={STIELL_1996_DOI}>Stiell et al., JAMA 1996</Cite>
const STIELL_1997 = <Cite doi={STIELL_1997_DOI}>Stiell et al., JAMA 1997</Cite>
const BACHMANN = <Cite doi={BACHMANN_DOI}>Bachmann et al., Ann Intern Med 2004</Cite>
const ACR = <Cite doi={ACR_DOI}>ACR Appropriateness Criteria, Acute Trauma to the Knee 2020</Cite>
const HALL = <Cite doi={HALL_DOI}>Hall, Radiology 1975</Cite>
const CRONE = <Cite doi={CRONE_DOI}>Crone et al., Skeletal Radiol 2026</Cite>
const FERGUSON = <Cite doi={FERGUSON_DOI}>Ferguson and Knottenbelt, Injury 1994</Cite>
const TOSUN = <Cite doi={TOSUN_DOI}>Tosun et al., Eur Radiol 2024</Cite>
const GOLDMAN = <Cite doi={GOLDMAN_DOI}>Goldman et al., AJR 1988</Cite>
const JARRAYA = <Cite doi={JARRAYA_DOI}>Jarraya et al., Insights Imaging 2017</Cite>
const COBBY = <Cite doi={COBBY_DOI}>Cobby et al., Radiology 1992</Cite>
const LODEWIJKS = <Cite doi={LODEWIJKS_DOI}>Lodewijks et al., Knee Surg Sports Traumatol Arthrosc 2019</Cite>
const MARKHARDT = <Cite doi={MARKHARDT_DOI}>Markhardt et al., Radiographics 2009</Cite>
const CAMPOS = <Cite doi={CAMPOS_DOI}>Campos et al., Radiology 2001</Cite>
const ESSR = <Cite doi={ESSR_DOI}>Parkar and Adriaensen, Eur Radiol 2024</Cite>
const HALL_HOCHMAN = <Cite doi={HALL_HOCHMAN_DOI}>Hall and Hochman, Skeletal Radiol 1997</Cite>
const HUANG = <Cite doi={HUANG_DOI}>Huang et al., AJR 2003</Cite>
const JUHNG = <Cite doi={JUHNG_DOI}>Juhng et al., AJR 2002</Cite>
const GOTTSEGEN = <Cite doi={GOTTSEGEN_DOI}>Gottsegen et al., Radiographics 2008</Cite>
const WHITE = <Cite doi={WHITE_DOI}>White et al., Emerg Radiol 2013</Cite>
const MEYERS = <Cite doi={MEYERS_DOI}>Meyers and McKeever, J Bone Joint Surg Am 1959</Cite>
const LI = <Cite doi={LI_DOI}>Li et al., Front Pediatr 2024</Cite>
const ELLIS = <Cite doi={ELLIS_DOI}>Ellis et al., J Pediatr Orthop 2021</Cite>
const AKDAG = <Cite doi={AKDAG_DOI}>Akdag et al., Pol J Radiol 2019</Cite>
const NORK = <Cite doi={NORK_DOI}>Nork et al., J Bone Joint Surg Am 2005</Cite>
const FOGAGNOLO = <Cite doi={FOGAGNOLO_DOI}>Fogagnolo and Tavares, Rev Bras Ortop 2026</Cite>
const LEE = <Cite doi={LEE_DOI}>Lee et al., Radiology 1989</Cite>
const LUGO = <Cite doi={LUGO_DOI}>Lugo-Olivieri et al., Radiology 1996</Cite>
const TAI = <Cite doi={TAI_DOI}>Tai et al., AJR 2009</Cite>
const CECAVA = <Cite doi={CECAVA_DOI}>Cecava et al., Emerg Radiol 2018</Cite>

const references: LessonReference[] = [
  { citation: 'Stiell IG, Greenberg GH, Wells GA, McKnight RD, Cwinn AA, Cacciotti T, McDowell I, Smith NA. Derivation of a decision rule for the use of radiography in acute knee injuries. Ann Emerg Med. 1995;26(4):405-413.', doi: STIELL_1995_DOI },
  { citation: 'Stiell IG, Greenberg GH, Wells GA, McDowell I, Cwinn AA, Smith NA, Cacciotti TF, Sivilotti ML. Prospective validation of a decision rule for the use of radiography in acute knee injuries. JAMA. 1996;275(8):611-615.', doi: STIELL_1996_DOI },
  { citation: 'Stiell IG, Wells GA, Hoag RH, Sivilotti ML, Cacciotti TF, Verbeek PR, Greenway KT, McDowell I, Cwinn AA, Greenberg GH, Nichol G, Michael JA. Implementation of the Ottawa Knee Rule for the use of radiography in acute knee injuries. JAMA. 1997;278(23):2075-2079.', doi: STIELL_1997_DOI },
  { citation: 'Bachmann LM, Haberzeth S, Steurer J, ter Riet G. The accuracy of the Ottawa knee rule to rule out knee fractures: a systematic review. Ann Intern Med. 2004;140(2):121-124.', doi: BACHMANN_DOI },
  { citation: 'Expert Panel on Musculoskeletal Imaging; Taljanovic MS, Chang EY, Ha AS, Bartolotta RJ, Bucknor M, Chen KC, Gorbachova T, Khurana B, Klitzke AK, Lee KS, Mooar PA, Nguyen JC, Ross AB, Shih RD, Singer AD, Smith SE, Thomas JM, Yost WJ, Kransdorf MJ. ACR Appropriateness Criteria® Acute Trauma to the Knee. J Am Coll Radiol. 2020;17(5S):S12-S25.', doi: ACR_DOI },
  { citation: 'Hall FM. Radiographic diagnosis and accuracy in knee joint effusions. Radiology. 1975;115(1):49-54.', doi: HALL_DOI },
  { citation: 'Crone AM, Omar IM, Bronson AM, Buchler LT, Selley RS, Weaver JS, Klauser AS, Taljanovic MS. Guide to lower extremity radiologic measurements: part 2 knee. Skeletal Radiol. 2026;55(6):1197-1216.', doi: CRONE_DOI },
  { citation: 'Ferguson J, Knottenbelt JD. Lipohaemarthrosis in knee trauma: an experience of 907 cases. Injury. 1994;25(5):311-312.', doi: FERGUSON_DOI },
  { citation: 'Tosun O, Sinci KA, Bacaksiz T, Buyukuysal MC, Kazimoglu C, Cilengir AH. The utility of standing knee radiographs for detection of lipohemarthrosis: comparison with supine horizontal beam radiographs. Eur Radiol. 2024;34(2):1104-1112.', doi: TOSUN_DOI },
  { citation: 'Goldman AB, Pavlov H, Rubenstein D. The Segond fracture of the proximal tibia: a small avulsion that reflects major ligamentous damage. AJR Am J Roentgenol. 1988;151(6):1163-1167.', doi: GOLDMAN_DOI },
  { citation: 'Jarraya M, Diaz LE, Arndt WF, Roemer FW, Guermazi A. Imaging of patellar fractures. Insights Imaging. 2017;8(1):49-57.', doi: JARRAYA_DOI },
  { citation: 'Cobby MJ, Schweitzer ME, Resnick D. The deep lateral femoral notch: an indirect sign of a torn anterior cruciate ligament. Radiology. 1992;184(3):855-858.', doi: COBBY_DOI },
  { citation: 'Lodewijks PCAM, Delawi D, Bollen TL, Dijkhuis GR, Wolterbeek N, Zijl JAC. The lateral femoral notch sign: a reliable diagnostic measurement in acute anterior cruciate ligament injury. Knee Surg Sports Traumatol Arthrosc. 2019;27(2):659-664.', doi: LODEWIJKS_DOI },
  { citation: 'Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104.' },
  { citation: 'Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597.', doi: MARKHARDT_DOI },
  { citation: 'Campos JC, Chung CB, Lektrakul N, Pedowitz R, Trudell D, Yu J, Resnick D. Pathogenesis of the Segond fracture: anatomic and MR imaging evidence of an iliotibial tract or anterior oblique band avulsion. Radiology. 2001;219(2):381-386.', doi: CAMPOS_DOI },
  { citation: 'Parkar AP, Adriaensen MEAPM. ESR essentials: MRI of the knee-practice recommendations by ESSR. Eur Radiol. 2024;34(10):6590-6599.', doi: ESSR_DOI },
  { citation: 'Hall FM, Hochman MG. Medial Segond-type fracture: cortical avulsion off the medial tibial plateau associated with tears of the posterior cruciate ligament and medial meniscus. Skeletal Radiol. 1997;26(9):553-555.', doi: HALL_HOCHMAN_DOI },
  { citation: 'Huang GS, Yu JS, Munshi M, Chan WP, Lee CH, Chen CY, Resnick D. Avulsion fracture of the head of the fibula (the "arcuate" sign): MR imaging findings predictive of injuries to the posterolateral ligaments and posterior cruciate ligament. AJR Am J Roentgenol. 2003;180(2):381-387.', doi: HUANG_DOI },
  { citation: 'Juhng SK, Lee JK, Choi SS, Yoon KH, Roh BS, Won JJ. MR evaluation of the "arcuate" sign of posterolateral knee instability. AJR Am J Roentgenol. 2002;178(3):583-588.', doi: JUHNG_DOI },
  { citation: 'Gottsegen CJ, Eyer BA, White EA, Learch TJ, Forrester D. Avulsion fractures of the knee: imaging findings and clinical significance. Radiographics. 2008;28(6):1755-1770.', doi: GOTTSEGEN_DOI },
  { citation: 'White EA, Patel DB, Matcuk GR, Forrester DM, Lundquist RB, Hatch GF 3rd, Vangsness CT, Gottsegen CJ. Cruciate ligament avulsion fractures: anatomy, biomechanics, injury patterns, and approach to management. Emerg Radiol. 2013;20(5):429-440.', doi: WHITE_DOI },
  { citation: 'Meyers MH, McKeever FM. Fracture of the intercondylar eminence of the tibia. J Bone Joint Surg Am. 1959;41-A(2):209-222.', doi: MEYERS_DOI },
  { citation: 'Li C, Huang X, Yang Q, Luo Y, Li J, Ye S, Lu W, Zhang X, You T. Arthroscopic fixation techniques for tibial eminence fractures in pediatric patients: a review. Front Pediatr. 2024;12:1347637.', doi: LI_DOI },
  { citation: 'Ellis HB, Zynda AJ, Cruz AI Jr, Sachleben B, Sargent C, Green D, Schmale G, Jagodzinski J, Rhodes J, Mistovich J, Fabricant PD, McKay S, Lee RJ, Yen YM, Ganley T. Classification and treatment of pediatric tibial spine fractures: assessing reliability among a tibial spine research interest group. J Pediatr Orthop. 2021;41(1):e20-e25.', doi: ELLIS_DOI },
  { citation: 'Akdag T, Guldogan ES, Coskun H, Turan A, Hekimoglu B. Magnetic resonance imaging for diagnosis of bipartite patella: usefulness and relationship with symptoms. Pol J Radiol. 2019;84:e491-e497.', doi: AKDAG_DOI },
  { citation: 'Nork SE, Segina DN, Aflatoon K, Barei DP, Henley MB, Holt S, Benirschke SK. The association between supracondylar-intercondylar distal femoral fractures and coronal plane fractures. J Bone Joint Surg Am. 2005;87(3):564-569.', doi: NORK_DOI },
  { citation: 'Fogagnolo F, Tavares RA. Current concepts in the treatment of distal femur fractures in adults. Rev Bras Ortop (Sao Paulo). 2026;61(2):s00461822639.', doi: FOGAGNOLO_DOI },
  { citation: 'Lee JH, Weissman BN, Nikpoor N, Aliabadi P, Sosman JL. Lipohemarthrosis of the knee: a review of recent experiences. Radiology. 1989;173(1):189-191.', doi: LEE_DOI },
  { citation: 'Lugo-Olivieri CH, Scott WW Jr, Zerhouni EA. Fluid-fluid levels in injured knees: do they always represent lipohemarthrosis? Radiology. 1996;198(2):499-502.', doi: LUGO_DOI },
  { citation: 'Tai AW, Alparslan HL, Townsend BA, Oei TN, Govindarajulu US, Aliabadi P, Weissman BN. Accuracy of cross-table lateral knee radiography for evaluation of joint effusions. AJR Am J Roentgenol. 2009;193(4):W339-W344.', doi: TAI_DOI },
  { citation: 'Cecava ND, Dieckman S, Banks KP, Mansfield LT. Traumatic knee injury: correlation of radiographic effusion size with the presence of internal derangement on magnetic resonance imaging. Emerg Radiol. 2018;25(5):479-487.', doi: CECAVA_DOI },
]

/* KX4-1: the Schatzker types, as the calculator gives them. */

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

/* KX5-1 to KX5-4: the small avulsions and what each one points to. */

const avulsionTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Avulsion</th>
          <th>Where</th>
          <th>Points to</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Segond</td><td>Lateral tibial rim, just below the plateau</td><td>ACL tear; meniscal tears</td></tr>
        <tr><td className="vessel-name">Reverse Segond</td><td>Medial tibial plateau rim</td><td>PCL and medial meniscus tears</td></tr>
        <tr><td className="vessel-name">Arcuate sign</td><td>Fibular head (styloid)</td><td>Posterolateral corner; the cruciates (Huang: PCL; Juhng: either or both)</td></tr>
        <tr><td className="vessel-name">Tibial spine</td><td>Intercondylar eminence</td><td>ACL avulsion</td></tr>
        <tr><td className="vessel-name">Posterior tibia</td><td>PCL insertion</td><td>PCL avulsion</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'indication',
    title: 'Step 1. Why the film: the injury and the Ottawa knee rule',
    body: (
      <>
        <p>This lesson is for an adult's knee radiographs after an injury. Imaging of acute knee trauma almost always starts with radiographs ({ACR}). The order of the search, and the checklists, are this site's own.</p>
        <h3>The Ottawa knee rule</h3>
        <p>Stiell and colleagues derived the rule from 1,047 adults with acute knee injuries. Radiography is called for when any one of five findings is present ({STIELL_1995}):</p>
        <ul className="plain-list">
          <li>age 55 or older;</li>
          <li>tenderness at the head of the fibula;</li>
          <li>isolated tenderness of the patella;</li>
          <li>inability to flex the knee to 90°;</li>
          <li>inability to bear weight both immediately and in the emergency department (four steps).</li>
        </ul>
        <p>One or more of them picked up all 68 fractures in the derivation (sensitivity 1.0, specificity 0.54) ({STIELL_1995}). In the prospective validation in 1,096 adults, the rule was 100% sensitive for 63 clinically important fractures ({STIELL_1996}). When it was put into practice, referral for radiography fell from 77.6% to 57.1% with no missed fractures, and the rule was again 100% sensitive, for 58 fractures ({STIELL_1997}). A systematic review of six studies in 4,249 adults pooled a sensitivity of 98.5% and a specificity of 48.6% ({BACHMANN}).</p>
        <p>The report records which criteria were met as the reason for the film. The ACR rates radiography 9 (usually appropriate) after a fall or twisting injury with focal tenderness, an effusion or inability to bear weight, and 5 (may be appropriate) with none of them. After significant trauma, such as a vehicle collision or a knee dislocation, radiography scores 9 and CT angiography of the leg 8 ({ACR}).</p>
        <h3>The mechanism</h3>
        <p>Direct trauma breaks the patella in a stellate pattern, and indirect trauma (a forceful quadriceps contraction) in a transverse one ({JARRAYA}). After a patellar dislocation, osteochondral fragments can shear from the medial patellar facet or the lateral femoral condyle, and radiographs may not show them ({JARRAYA}).</p>
      </>
    ),
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    body: (
      <>
        <p>The trauma series is an AP and a lateral. Ferguson and Knottenbelt, who looked for a lipohaemarthrosis on it in 907 injured knees, proposed that the horizontal-beam lateral should be the standard lateral in knee trauma ({FERGUSON}); it is known as the best technique for one, and Tosun and colleagues found a standing lateral more sensitive than a supine cross-table lateral (95.5% against 38.5%) ({TOSUN}). Both are horizontal-beam views.</p>
        <p>Only the lateral view helps with an effusion, and a satisfactory lateral shows the whole suprapatellar area ({HALL}). On a true lateral, the posterior margins of the femoral condyles are superimposed or no more than 2 mm apart; that is what allows patellar height to be measured ({CRONE}).</p>
        <p>Two extra views find fractures the AP misses. Patellar fractures are judged on the AP, lateral and skyline views, and a vertical fracture is easily missed on the AP, so the skyline view matters ({JARRAYA}). In Goldman's nine Segond fractures, two were seen only on the tunnel view ({GOLDMAN}).</p>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and measurements',
    body: (
      <>
        <p>Check that the tibia sits under the femur and the patella in the trochlea. A knee dislocation is significant trauma: the ACR rates CT angiography of the leg 8 ({ACR}).</p>
        <h3>Patellar height</h3>
        <p>The Insall–Salvati index is the length of the patellar tendon, from the lower pole to the tibial tuberosity, divided by the length of the patella, measured on a true lateral. The normal range on radiographs is 0.8 to 1.3; over 1.3 is patella alta and under 0.8 patella baja ({CRONE}). After an injury, a lower pole avulsion is a bony avulsion of the patellar tendon and comes with patella alta, and an upper pole avulsion goes with patella baja ({JARRAYA}).</p>
        <h3>The lateral femoral notch</h3>
        <p>On the lateral view, measure the depth of the sulcus on the lateral femoral condyle. In Cobby's series no knee with a normal ACL had a sulcus deeper than 1.2 mm, and a sulcus deeper than 1.5 mm was a reliable indirect sign of a torn ACL ({COBBY}). Lodewijks and colleagues, in patients 45 or younger, found a depth over 1.0 mm a good predictor of ACL injury, with a positive predictive value of 96% ({LODEWIJKS}). The two cut-offs differ; this lesson gives both.</p>
        <ScanFigures images={[kneeXrayScans.lateralFemoralNotch, kneeXrayScans.patellaAlta]} />
      </>
    ),
  },
  {
    id: 'plateau',
    title: 'Step 4. Tibial plateau',
    body: (
      <>
        <p>When the tibial plateau is broken, give the Schatzker type ({SCHATZKER}; the types as {MARKHARDT} give them). The Schatzker calculator on this site applies the same rules.</p>
        {schatzkerTable}
        <p>Type III is split by where the depression sits: lateral (IIIA) or central (IIIB). Dissociation of the metaphysis from the diaphysis makes a fracture type VI, whichever plateaus are broken. The fracture-dislocation mechanism of type IV raises the risk of injury to the peroneal nerve and the popliteal vessels ({MARKHARDT}).</p>
        <p>CT and MRI are more accurate than radiographs for the Schatzker type, and surgical plans made from radiographs were changed after CT or MRI ({MARKHARDT}). With a plateau fracture on radiographs, the ACR rates MRI 9 and CT 8 for further bone or soft-tissue injury, and CT is often done to plan surgery on complex plateau fractures ({ACR}).</p>
        <ScanFigures images={[schatzkerScans.type6]} />
      </>
    ),
  },
  {
    id: 'avulsions',
    title: 'Step 5. Avulsions: Segond, arcuate and the cruciates',
    body: (
      <>
        <p>Avulsion fractures of the knee are often subtle on radiographs, and they stand for much larger soft-tissue injuries; MRI helps define the damage ({GOTTSEGEN}).</p>
        {avulsionTable}
        <h3>Segond fracture</h3>
        <p>A small vertical avulsion of the lateral proximal tibia, just below the plateau, from internal rotation and varus stress. All of Goldman's nine had an ACL tear, and six a meniscal tear ({GOLDMAN}). It is pulled off by the iliotibial tract or the anterior oblique band of the lateral collateral ligament ({CAMPOS}), and it has a 95% association with ACL rupture ({ESSR}).</p>
        <h3>Reverse Segond fracture</h3>
        <p>A cortical avulsion off the medial tibial plateau, with tears of the PCL and the medial meniscus: the reverse of the Segond complex ({HALL_HOCHMAN}).</p>
        <h3>Arcuate sign</h3>
        <p>An avulsion of the styloid of the fibular head. In Huang's 13 patients the fragment was horizontal and 8 to 10 mm long, the arcuate complex was injured in all, and all had a PCL injury and none an ACL tear ({HUANG}). In Juhng's 18 knees the fragment was attached to the fibular collateral ligament, the biceps femoris tendon or both; a cruciate was injured in 89% (both in half), and the posterolateral capsule was torn in 67% ({JUHNG}). Parkar and Adriaensen link the arcuate avulsion to ACL rupture ({ESSR}). The series differ on which cruciate; look for both. MRI is useful for the injuries that go with it ({JUHNG}).</p>
        <h3>Cruciate avulsions</h3>
        <p>A cruciate ligament injury is sometimes an avulsion of bone, usually from the tibia, and it can be seen on radiographs. Commoner in children, in adults it more often comes with other injuries ({WHITE}).</p>
        <p>Tibial spine (ACL) avulsions are graded by Meyers and McKeever ({MEYERS}; the types as {LI} give them): type I undisplaced or minimally displaced; type II with the anterior part of the fragment raised and the posterior part still attached (a "bird's beak"); type III completely detached. A type IV, displaced and comminuted, was added later ({LI}). The one radiographic measurement with good reliability is the superior displacement of the anterior part of the fragment on the lateral view ({ELLIS}); record it in millimetres.</p>
        <ScanFigures images={[kneeXrayScans.segond, kneeXrayScans.arcuateSign]} />
      </>
    ),
  },
  {
    id: 'patella',
    title: 'Step 6. Patella',
    body: (
      <>
        <p>Patellar fractures are named by their pattern and their displacement ({JARRAYA}):</p>
        <ul className="plain-list">
          <li><strong>Transverse:</strong> from indirect force; about 80% in the middle to lower third; up to two-thirds displaced.</li>
          <li><strong>Stellate (comminuted):</strong> from a direct blow.</li>
          <li><strong>Vertical:</strong> up to 22%, usually through the lateral facet; easily missed on the AP, seen on the skyline view.</li>
          <li><strong>Pole avulsions:</strong> often with substantial injury to the quadriceps or patellar tendon. A lower pole avulsion is a bony avulsion of the patellar tendon, with patella alta; an upper pole avulsion goes with patella baja.</li>
        </ul>
        <p>Melvin defined displacement as more than 3 mm of separation between the fragments, or more than 2 mm of articular incongruity, and displacement should raise the suspicion of a retinacular injury ({JARRAYA}).</p>
        <h3>Bipartite patella</h3>
        <p>An important differential diagnosis: a bipartite patella is an accessory ossification centre that never fused, and a fragment at the superolateral corner of the patella favours it ({JARRAYA}). Saupe's types are by site: I at the inferior pole, II at the lateral margin, III at the superolateral pole. In Akdag's 61 patients, 59 fragments were superolateral; its prevalence is given as 0.8% to 2% ({AKDAG}). Radiographs show only its anatomy; MRI can show oedema at the fragment in a painful one ({AKDAG}).</p>
        <ScanFigures images={[kneeXrayScans.patellarFracture, kneeXrayScans.bipartitePatella]} />
      </>
    ),
  },
  {
    id: 'femur',
    title: 'Step 7. Distal femur',
    body: (
      <>
        <p>The AO/OTA system types a distal femoral fracture as A, extra-articular; B, partial articular; or C, complete articular, with no continuity between the diaphysis and the articular surface ({FOGAGNOLO}).</p>
        <p>AP and lateral radiographs show the general pattern, but a complete assessment needs CT for the articular extension, occult fracture lines and Hoffa fractures ({FOGAGNOLO}). A Hoffa fracture is a coronal fracture of a femoral condyle. Nork found one with 38.1% of supracondylar-intercondylar fractures, mostly in the lateral condyle, in 47% of knees that had CT against 29% of those that did not; ten were found only at surgery, none in a knee that had had CT ({NORK}). They are in over 30% of type C fractures and may be missed in up to 25% ({FOGAGNOLO}). The ACR notes CT is often done to plan surgery on complex distal femoral fractures ({ACR}).</p>
        <ScanFigures images={[kneeXrayScans.hoffa]} />
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 8. Effusion and lipohaemarthrosis',
    body: (
      <>
        <h3>Effusion</h3>
        <p>Read the effusion on the lateral: the fat pad separation sign was the most accurate sign of fluid ({HALL}). On a cross-table lateral, visual grading was 90 to 92% sensitive; a suprapatellar pouch of 7 mm, Tai's criterion, was 76% sensitive and 83% specific ({TAI}). In adults aged 18 to 40 with an acute injury, a suprapatellar effusion over 10 mm went with internal derangement on MRI (specificity 96%, positive predictive value 93%), and should prompt consideration of MRI ({CECAVA}).</p>
        <h3>Lipohaemarthrosis</h3>
        <p>Look for a fat-fluid level in the suprapatellar recess on the horizontal-beam lateral. In Lee's series it indicated a fracture in every patient who had one, though its absence did not exclude an intra-articular fracture ({LEE}). Ferguson and Knottenbelt found it 88.6% specific for an intra-articular fracture; a lipohaemarthrosis with no visible fracture, or with only a patellar or fibular fracture, calls for further investigation ({FERGUSON}). With no fracture seen and an occult fracture suspected, the ACR rates MRI 9 and CT 6 ({ACR}).</p>
        <p>A single fluid level is not proof of fat: in Lugo-Olivieri's series, 8 of 12 knees with a plateau fracture and a fluid level had no fat on CT or MRI, the level being blood that had separated. A double fluid level is more specific ({LUGO}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 9. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: a lipohaemarthrosis against the fractures found, the Ottawa criteria against what the film shows (isolated patellar tenderness against the skyline view), a Segond or arcuate avulsion against the ligaments it stands for, and the patellar height against the poles of the patella.</p>
        <p>List the abnormal findings in search-pattern order, then the further imaging the sources support: CT or MRI for a plateau fracture ({MARKHARDT}; {ACR}), CT for a distal femoral fracture ({FOGAGNOLO}; {NORK}), CT angiography after a knee dislocation ({ACR}), MRI or CT for a lipohaemarthrosis with no fracture to account for it ({FERGUSON}; {ACR}), and MRI for the ligaments and menisci behind an avulsion ({GOTTSEGEN}; {JUHNG}) or a large effusion ({CECAVA}). The order is this site's own.</p>
      </>
    ),
  },
]

/* The report. */

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, except an abbreviation such as AP or ACL. */
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

const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const present = (id: string) => (v: Values) => str(v, id) === 'present'
const plateauBroken = present('plateau-fracture')
const plateauInvolved = (v: Values) => plateauBroken(v) && ['lateral', 'medial', 'both'].includes(str(v, 'plateau'))

const fields = {
  side: { id: 'side', kind: 'choice', label: 'Side', required: true, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ] },
  mechanism: { id: 'mechanism', kind: 'choice', label: 'Injury', required: true, options: [
    { value: 'twist', label: 'Fall or twisting injury' },
    { value: 'direct', label: 'Direct blow, or a fall onto the knee' },
    { value: 'high', label: 'High-energy injury (e.g. a vehicle collision) or suspected dislocation' },
    { value: 'patellar', label: 'Patellar dislocation, now reduced' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  // KX1-1: the five findings of the Ottawa knee rule.
  ottawa: { id: 'ottawa', kind: 'multi', label: 'Ottawa knee rule: findings present', help: 'Any one calls for radiography.', options: [
    { value: 'age', label: 'Age 55 or older' },
    { value: 'fibula', label: 'Tenderness at the head of the fibula' },
    { value: 'patella', label: 'Isolated tenderness of the patella' },
    { value: 'flex', label: 'Unable to flex to 90°' },
    { value: 'weight', label: 'Unable to bear weight both immediately and in the department (four steps)' },
  ] },

  views: { id: 'views', kind: 'choice', label: 'Views', required: true, help: 'An AP and a lateral.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'ap', label: 'An AP view' },
    { value: 'lateral', label: 'A lateral view' },
  ] },
  // KX2-1: the horizontal-beam lateral is the trauma standard.
  lateralBeam: { id: 'lateral-beam', kind: 'choice', label: 'Lateral', required: true, help: 'A cross-table or standing lateral is a horizontal beam.', options: [
    { value: 'horizontal', label: 'Horizontal beam' },
    { value: 'vertical', label: 'Vertical beam' },
  ] },
  // KX2-4, KX2-5: the views that find what the AP misses.
  extraViews: { id: 'extra-views', kind: 'multi', label: 'Extra views', options: [
    { value: 'skyline', label: 'Skyline (axial) view' },
    { value: 'tunnel', label: 'Tunnel view' },
  ] },
  // KX2-2, KX2-3: a true lateral, and the whole suprapatellar area.
  limits: { id: 'limits', kind: 'multi', label: 'Limits', options: [
    { value: 'rotated', label: 'Lateral not true: posterior condyles more than 2 mm apart' },
    { value: 'suprapatellar', label: 'Suprapatellar area not fully shown' },
  ] },

  tibiofemoral: { id: 'tibiofemoral', kind: 'choice', label: 'Tibiofemoral alignment', required: true, options: [
    { value: 'aligned', label: 'Aligned' },
    { value: 'subluxed', label: 'Subluxed' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  patellaPosition: { id: 'patella-position', kind: 'choice', label: 'Patella', options: [
    { value: 'normal', label: 'In the trochlea' },
    { value: 'lateral', label: 'Displaced laterally' },
  ] },
  // KX3-1
  insall: { id: 'insall', kind: 'number', label: 'Insall–Salvati index', min: 0, max: 4, step: 0.01, help: 'Patellar tendon length over patellar length, on a true lateral. Normal 0.8 to 1.3.' },
  // KX3-2, KX3-3
  notch: { id: 'notch', kind: 'number', label: 'Lateral femoral notch depth', unit: 'mm', min: 0, max: 10, step: 0.1, help: 'Over 1.5 mm: a reliable sign of ACL tear (Cobby); over 1.0 mm (Lodewijks).' },

  plateauFracture: { id: 'plateau-fracture', kind: 'choice', label: 'Tibial plateau fracture', required: true, options: nonePresent },
  plateau: { id: 'plateau', kind: 'choice', label: 'Plateau broken', showIf: plateauBroken, help: 'Gives the Schatzker type, as in the Schatzker calculator.', options: [
    { value: 'lateral', label: 'Lateral only' },
    { value: 'medial', label: 'Medial only' },
    { value: 'both', label: 'Both' },
  ] },
  plateauPattern: { id: 'plateau-pattern', kind: 'choice', label: 'Lateral plateau pattern', showIf: (v) => plateauBroken(v) && str(v, 'plateau') === 'lateral', options: [
    { value: 'split', label: 'Split only' },
    { value: 'split-depression', label: 'Split with depression' },
    { value: 'depression', label: 'Depression only' },
  ] },
  plateauDepressionSite: { id: 'plateau-depression-site', kind: 'choice', label: 'Where is the depression', showIf: (v) => plateauBroken(v) && str(v, 'plateau') === 'lateral' && str(v, 'plateau-pattern') === 'depression', help: 'Lateral is type IIIA, central type IIIB.', options: [
    { value: 'lateral', label: 'Lateral (IIIA)' },
    { value: 'central', label: 'Central (IIIB)' },
  ] },
  plateauDissociation: { id: 'plateau-dissociation', kind: 'choice', label: 'Metaphysis separated from the diaphysis', showIf: plateauInvolved, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  plateauDepression: { id: 'plateau-depression', kind: 'number', label: 'Articular depression', unit: 'mm', min: 0, step: 1, showIf: plateauInvolved },

  // KX5-1
  segond: { id: 'segond', kind: 'choice', label: 'Segond fracture (lateral tibial rim)', required: true, options: nonePresent },
  // KX5-2
  reverseSegond: { id: 'reverse-segond', kind: 'choice', label: 'Reverse Segond fracture (medial tibial rim)', required: true, options: nonePresent },
  // KX5-3, KX5-4
  fibularHead: { id: 'fibular-head', kind: 'choice', label: 'Fibular head avulsion (arcuate sign)', required: true, options: nonePresent },
  // KX5-6, KX5-7
  tibialSpine: { id: 'tibial-spine', kind: 'choice', label: 'Tibial spine (ACL) avulsion', required: true, options: nonePresent },
  meyers: { id: 'meyers', kind: 'choice', label: 'Fragment', showIf: present('tibial-spine'), help: 'Meyers and McKeever types I to III, and IV.', options: [
    { value: 'i', label: 'Undisplaced or minimally displaced' },
    { value: 'ii', label: 'Anterior part raised, posterior part attached' },
    { value: 'iii', label: 'Completely detached' },
    { value: 'iv', label: 'Displaced and comminuted' },
  ] },
  // KX5-8
  spineDisplacement: { id: 'spine-displacement', kind: 'number', label: 'Superior displacement of the anterior fragment', unit: 'mm', min: 0, max: 40, step: 0.5, showIf: present('tibial-spine'), help: 'On the lateral: the most reliable radiographic measurement.' },
  pclAvulsion: { id: 'pcl-avulsion', kind: 'choice', label: 'PCL avulsion (posterior tibia)', required: true, options: nonePresent },

  // KX6-1 to KX6-3
  patella: { id: 'patella', kind: 'choice', label: 'Patella', required: true, options: [
    { value: 'none', label: 'No fracture' },
    { value: 'fracture', label: 'Fracture' },
    { value: 'bipartite', label: 'Bipartite patella' },
  ] },
  patellaPattern: { id: 'patella-pattern', kind: 'choice', label: 'Pattern', showIf: (v) => str(v, 'patella') === 'fracture', options: [
    { value: 'transverse', label: 'Transverse' },
    { value: 'stellate', label: 'Stellate (comminuted)' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'lower-pole', label: 'Lower pole avulsion' },
    { value: 'upper-pole', label: 'Upper pole avulsion' },
  ] },
  patellaSeparation: { id: 'patella-separation', kind: 'number', label: 'Separation of the fragments', unit: 'mm', min: 0, max: 100, step: 0.5, showIf: (v) => str(v, 'patella') === 'fracture', help: 'Displaced: over 3 mm apart, or an articular step over 2 mm.' },
  patellaStep: { id: 'patella-step', kind: 'number', label: 'Articular step', unit: 'mm', min: 0, max: 50, step: 0.5, showIf: (v) => str(v, 'patella') === 'fracture' },
  bipartiteSite: { id: 'bipartite-site', kind: 'choice', label: 'Fragment', showIf: (v) => str(v, 'patella') === 'bipartite', help: 'Saupe types by site.', options: [
    { value: 'superolateral', label: 'Superolateral (type III)' },
    { value: 'lateral', label: 'Lateral margin (type II)' },
    { value: 'inferior', label: 'Inferior pole (type I)' },
  ] },

  // KX7-1, KX7-2
  femur: { id: 'femur', kind: 'choice', label: 'Distal femoral fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'a', label: 'Extra-articular (AO/OTA 33A)' },
    { value: 'b', label: 'Partial articular (33B)' },
    { value: 'c', label: 'Complete articular (33C)' },
  ] },
  hoffa: { id: 'hoffa', kind: 'choice', label: 'Coronal (Hoffa) fragment seen', showIf: (v) => ['a', 'b', 'c'].includes(str(v, 'femur')), options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },

  // KX2-3, KX8-4, KX8-5
  effusion: { id: 'effusion', kind: 'choice', label: 'Joint effusion', required: true, options: nonePresent },
  suprapatellar: { id: 'suprapatellar', kind: 'number', label: 'Suprapatellar pouch (front to back)', unit: 'mm', min: 0, max: 80, step: 1, showIf: present('effusion'), help: '7 mm: effusion on a cross-table lateral (Tai). Over 10 mm: think of internal derangement (Cecava).' },
  // KX8-1 to KX8-3
  fatFluid: { id: 'fat-fluid', kind: 'choice', label: 'Fluid level in the suprapatellar recess', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'fat', label: 'Fat-fluid level (fat layer on top)' },
    { value: 'double', label: 'Double fluid level' },
    { value: 'single', label: 'Single fluid level, no fat layer seen' },
  ] },
  swelling: { id: 'swelling', kind: 'choice', label: 'Soft-tissue swelling', options: nonePresent },
  swellingSite: { id: 'swelling-site', kind: 'text', label: 'Where', placeholder: 'e.g. prepatellar', showIf: present('swelling') },

  otherFractures: { id: 'other-fractures', kind: 'text', label: 'Other fractures', placeholder: 'e.g. fibular neck' },
  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-dislocation', label: 'No dislocation' },
    { value: 'no-effusion', label: 'No joint effusion' },
    { value: 'no-lipo', label: 'No lipohaemarthrosis' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

/** KX4-1: the Schatzker type from the shared calculator logic, or undefined while undecided. */
function plateauResult(values: Values): SchatzkerResult | undefined {
  if (!plateauInvolved(values)) return undefined
  const dissociation = str(values, 'plateau-dissociation')
  return schatzker({
    plateau: str(values, 'plateau') as Plateau,
    pattern: (str(values, 'plateau-pattern') || undefined) as LateralPattern | undefined,
    depressionSite: (str(values, 'plateau-depression-site') || undefined) as DepressionSite | undefined,
    dissociation: dissociation === '' ? undefined : dissociation === 'yes',
  })
}

const meyersType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III', iv: 'IV' }

/** KX6-1: Melvin's displacement, or undefined until a measurement decides it. */
function patellaDisplaced(values: Values): boolean | undefined {
  if (str(values, 'patella') !== 'fracture') return undefined
  const separation = num(values, 'patella-separation')
  const step = num(values, 'patella-step')
  if ((separation !== undefined && separation > 3) || (step !== undefined && step > 2)) return true
  if (separation !== undefined && step !== undefined) return false
  return undefined
}

/** KX8-1 to KX8-3: a fat layer or a double level counts as lipohaemarthrosis; a single level does not. */
const lipohaemarthrosis = (values: Values) => ['fat', 'double'].includes(str(values, 'fat-fluid'))

/** The fractures entered, in search-pattern order, for the negatives. */
function fracturesEntered(values: Values): string[] {
  return [
    str(values, 'plateau-fracture') === 'present' && 'tibial plateau fracture',
    str(values, 'segond') === 'present' && 'Segond fracture',
    str(values, 'reverse-segond') === 'present' && 'reverse Segond fracture',
    str(values, 'fibular-head') === 'present' && 'fibular head avulsion',
    str(values, 'tibial-spine') === 'present' && 'tibial spine avulsion',
    str(values, 'pcl-avulsion') === 'present' && 'PCL avulsion',
    str(values, 'patella') === 'fracture' && 'patellar fracture',
    ['a', 'b', 'c'].includes(str(values, 'femur')) && 'distal femoral fracture',
    str(values, 'other-fractures') !== '' && str(values, 'other-fractures'),
  ].filter((item): item is string => Boolean(item))
}

/**
 * KX8-2: Ferguson's further investigation, for a lipohaemarthrosis with no visible fracture or only
 * a patellar or fibular one. A typed "other fracture" counts as one that can account for it.
 */
function unexplainedLipo(values: Values): boolean {
  if (!lipohaemarthrosis(values)) return false
  const accounts = [
    str(values, 'plateau-fracture') === 'present',
    str(values, 'segond') === 'present',
    str(values, 'reverse-segond') === 'present',
    str(values, 'tibial-spine') === 'present',
    str(values, 'pcl-avulsion') === 'present',
    ['a', 'b', 'c'].includes(str(values, 'femur')),
    str(values, 'other-fractures') !== '',
  ]
  return !accounts.some(Boolean)
}

/** KX5-4, KX5-5, KX8-5: an avulsion, or an effusion over 10 mm with no fracture, for the MRI line. */
function softTissueMri(values: Values): boolean {
  const avulsion = ['segond', 'reverse-segond', 'fibular-head', 'tibial-spine', 'pcl-avulsion'].some((id) => str(values, id) === 'present')
  const pouch = num(values, 'suprapatellar')
  const largeEffusion = str(values, 'effusion') === 'present' && pouch !== undefined && pouch > 10 && fracturesEntered(values).length === 0
  return avulsion || largeEffusion
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveIndication(values: Values): Derived[] {
  const out: Derived[] = []
  const met = list(values, 'ottawa')
  // KX1-1, KX1-2: one or more findings; 100% sensitive in the derivation and the validation.
  if (met.length > 0) out.push({ label: 'Ottawa knee rule', value: `Met (${met.length} of 5): radiography indicated; 100% sensitive for fracture in its validation` })
  // KX1-5: significant trauma.
  if (str(values, 'mechanism') === 'high') out.push({ label: 'ACR', value: 'Significant trauma or knee dislocation: radiography 9, CT angiography of the leg 8' })
  // KX1-6: after a patellar dislocation.
  if (str(values, 'mechanism') === 'patellar') out.push({ label: 'After patellar dislocation', value: 'Osteochondral fragments may not show on radiographs' })
  return out
}

function deriveViews(values: Values): Derived[] {
  const out: Derived[] = []
  // KX2-1
  if (str(values, 'lateral-beam') === 'vertical') out.push({ label: 'Lateral', value: 'Vertical beam: a horizontal-beam lateral is the trauma standard and shows a fat-fluid level best', tone: 'warn' })
  const limits = list(values, 'limits')
  // KX2-2
  if (limits.includes('rotated')) out.push({ label: 'Rotated lateral', value: 'Patellar height is measured on a true lateral (condyles within 2 mm)', tone: 'warn' })
  // KX2-3
  if (limits.includes('suprapatellar')) out.push({ label: 'Suprapatellar area', value: 'A satisfactory lateral shows all of it, for the effusion', tone: 'warn' })
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  // KX1-5: CT angiography after a knee dislocation.
  if (str(values, 'tibiofemoral') === 'dislocated') out.push({ label: 'Knee dislocation', value: 'ACR: CT angiography of the leg usually appropriate (8)', tone: 'warn' })
  // KX3-1
  const insall = num(values, 'insall')
  if (insall !== undefined) {
    if (insall > 1.3) out.push({ label: 'Insall–Salvati', value: 'Over 1.3: patella alta', tone: 'warn' })
    else if (insall < 0.8) out.push({ label: 'Insall–Salvati', value: 'Under 0.8: patella baja', tone: 'warn' })
    else out.push({ label: 'Insall–Salvati', value: 'Normal (0.8 to 1.3)', tone: 'good' })
  }
  // KX3-2, KX3-3: the two cut-offs.
  const notch = num(values, 'notch')
  if (notch !== undefined && notch > 1.5) out.push({ label: 'Lateral femoral notch', value: 'Deeper than 1.5 mm: a reliable indirect sign of ACL tear', tone: 'warn' })
  else if (notch !== undefined && notch > 1) out.push({ label: 'Lateral femoral notch', value: 'Over 1 mm: PPV 96% for ACL injury (Lodewijks); under Cobby\'s 1.5 mm', tone: 'warn' })
  return out
}

function derivePlateau(values: Values): Derived[] {
  const out: Derived[] = []
  const plateau = plateauResult(values)
  // KX4-1
  if (plateau) out.push({ label: 'Schatzker', value: `Type ${plateau.type}`, tone: 'warn' })
  // KX4-2
  if (plateau?.type === 'IV') out.push({ label: 'Type IV', value: 'Fracture-dislocation: risk to the peroneal nerve and popliteal vessels', tone: 'warn' })
  // KX4-3
  if (plateauBroken(values)) out.push({ label: 'CT or MRI', value: 'More accurate than radiographs for the type; ACR: MRI 9, CT 8' })
  return out
}

function deriveAvulsions(values: Values): Derived[] {
  const out: Derived[] = []
  // KX5-1
  if (str(values, 'segond') === 'present') out.push({ label: 'Segond fracture', value: 'Associated with ACL tear (9 of 9; 95%); menisci often torn', tone: 'warn' })
  // KX5-2
  if (str(values, 'reverse-segond') === 'present') out.push({ label: 'Reverse Segond', value: 'Goes with PCL and medial meniscus tears', tone: 'warn' })
  // KX5-3, KX5-4
  if (str(values, 'fibular-head') === 'present') out.push({ label: 'Arcuate sign', value: 'Posterolateral corner injury; PCL in 13 of 13 (Huang), a cruciate in 89% (Juhng)', tone: 'warn' })
  // KX5-7
  const type = meyersType[str(values, 'meyers')] as string | undefined
  if (str(values, 'tibial-spine') === 'present' && type) out.push({ label: 'Meyers and McKeever', value: `Type ${type}`, tone: 'warn' })
  // KX5-6
  if (str(values, 'tibial-spine') === 'present' || str(values, 'pcl-avulsion') === 'present') out.push({ label: 'Cruciate avulsion', value: 'In adults, more often with other injuries' })
  return out
}

function derivePatella(values: Values): Derived[] {
  const out: Derived[] = []
  // KX6-1
  const displaced = patellaDisplaced(values)
  if (displaced === true) out.push({ label: 'Displaced', value: 'Over 3 mm apart or an articular step over 2 mm: suspect retinacular injury', tone: 'warn' })
  if (displaced === false) out.push({ label: 'Displaced', value: 'No: 3 mm or less apart, step 2 mm or less', tone: 'good' })
  const pattern = str(values, 'patella-pattern')
  // KX2-5
  if (str(values, 'patella') === 'fracture' && pattern === 'vertical') out.push({ label: 'Vertical', value: 'Easily missed on the AP; seen best on the skyline view' })
  // KX6-2
  if (str(values, 'patella') === 'fracture' && pattern === 'lower-pole') out.push({ label: 'Lower pole', value: 'Bony avulsion of the patellar tendon: look for patella alta', tone: 'warn' })
  if (str(values, 'patella') === 'fracture' && pattern === 'upper-pole') out.push({ label: 'Upper pole', value: 'Goes with patella baja; the quadriceps tendon may be injured', tone: 'warn' })
  // KX6-3
  const site = str(values, 'bipartite-site')
  if (str(values, 'patella') === 'bipartite' && site === 'superolateral') out.push({ label: 'Bipartite patella', value: 'Superolateral: the site that favours it over a fracture (59 of 61)', tone: 'good' })
  if (str(values, 'patella') === 'bipartite' && (site === 'lateral' || site === 'inferior')) out.push({ label: 'Bipartite patella', value: 'Not superolateral: a rarer site, so the site does not favour it over a fracture', tone: 'warn' })
  // KX1-6
  if (str(values, 'mechanism') === 'patellar') out.push({ label: 'After patellar dislocation', value: 'Look at the medial patellar facet and the lateral femoral condyle for a fragment' })
  return out
}

function deriveFemur(values: Values): Derived[] {
  const out: Derived[] = []
  const femur = str(values, 'femur')
  const types: Record<string, string> = { a: '33A, extra-articular', b: '33B, partial articular', c: '33C, complete articular' }
  // KX7-1
  if (types[femur]) {
    out.push({ label: 'AO/OTA', value: types[femur], tone: 'warn' })
    out.push({ label: 'CT', value: 'Complete assessment needs CT: articular extension, occult lines, Hoffa fractures' })
  }
  // KX7-2
  if (femur === 'c') out.push({ label: 'Hoffa', value: 'Coronal fractures with 38% of supracondylar-intercondylar fractures; found more often with CT (47% against 29%)', tone: 'warn' })
  return out
}

function deriveSoftTissues(values: Values): Derived[] {
  const out: Derived[] = []
  // KX8-4, KX8-5
  const pouch = num(values, 'suprapatellar')
  if (str(values, 'effusion') === 'present' && pouch !== undefined) {
    if (pouch > 10) out.push({ label: 'Suprapatellar pouch', value: 'Over 10 mm: internal derangement on MRI likely (PPV 93%, ages 18 to 40)', tone: 'warn' })
    else if (pouch >= 7) out.push({ label: 'Suprapatellar pouch', value: '7 mm or more: an effusion by Tai\'s criterion (cross-table lateral)' })
    else out.push({ label: 'Suprapatellar pouch', value: 'Under Tai\'s 7 mm criterion, which is 76% sensitive' })
  }
  // KX8-1, KX8-2
  if (lipohaemarthrosis(values)) out.push({ label: 'Lipohaemarthrosis', value: 'Indicates an intra-articular fracture (all of Lee\'s cases; 88.6% specific in Ferguson\'s)', tone: 'warn' })
  if (unexplainedLipo(values)) out.push({ label: 'No fracture to account for it', value: 'Further imaging for an occult fracture: ACR MRI 9, CT 6', tone: 'warn' })
  // KX8-3
  if (str(values, 'fat-fluid') === 'single') out.push({ label: 'Single fluid level', value: 'Can be blood alone (8 of 12); a fat layer or a double level is more specific' })
  return out
}

/* Report lines. */

const OTTAWA_WORDS: Record<string, string> = {
  age: 'age 55 or older',
  fibula: 'tenderness at the head of the fibula',
  patella: 'isolated patellar tenderness',
  flex: 'unable to flex to 90°',
  weight: 'unable to bear weight',
}

function clinicalLines(values: Values): (string | false)[] {
  const side = str(values, 'side')
  const mechanism = str(values, 'mechanism')
  const met = list(values, 'ottawa').map((value) => OTTAWA_WORDS[value]).filter(Boolean)
  const clinical = join([side && `${lowerFirst(side)} knee`, mechanism && mechanism !== 'other' && picked(values, fields.mechanism)], ', ')
  return [
    clinical && `Clinical: ${clinical}`,
    met.length > 0 && `Ottawa knee rule: ${met.join(', ')}`,
  ]
}

function techniqueLines(values: Values): (string | false)[] {
  const views = str(values, 'views')
  const beam = str(values, 'lateral-beam')
  const extra = chosen(values, fields.extraViews).map((view) => view.replace(/ view$/, ''))
  const missing = chosen(values, fields.viewsMissing)
  const lateral = beam === 'horizontal' ? 'horizontal-beam lateral' : beam === 'vertical' ? 'vertical-beam lateral' : 'lateral'
  const series = views === 'complete' ? `AP and ${lateral}${extra.length > 0 ? `, with ${extra.join(' and ')} views` : ''}` : ''
  const limits = chosen(values, fields.limits)
  return [
    series && `Views: ${series}`,
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}${extra.length > 0 ? `; ${extra.join(' and ')} views` : ''}`,
    limits.length > 0 && `Limits: ${limits.join('; ')}`,
  ]
}

function alignmentLines(values: Values): (string | false)[] {
  const insall = num(values, 'insall')
  const notch = num(values, 'notch')
  return [
    str(values, 'tibiofemoral') && `Tibiofemoral alignment: ${picked(values, fields.tibiofemoral)}`,
    str(values, 'patella-position') && `Patella: ${picked(values, fields.patellaPosition)}`,
    insall !== undefined && `Insall–Salvati index: ${insall}`,
    notch !== undefined && `Lateral femoral notch: ${notch} mm deep`,
  ]
}

const PLATEAU_WORDS: Record<string, string> = { lateral: 'lateral plateau', medial: 'medial plateau', both: 'both plateaus' }

function boneLines(values: Values): (string | false)[] {
  const plateau = plateauResult(values)
  const depression = num(values, 'plateau-depression')
  const noneLine = (id: string, label: string) => str(values, id) === 'none' && `${label}: none`
  const type = meyersType[str(values, 'meyers')] as string | undefined
  const displacement = num(values, 'spine-displacement')
  const separation = num(values, 'patella-separation')
  const step = num(values, 'patella-step')
  const femur = str(values, 'femur')
  return [
    noneLine('plateau-fracture', 'Tibial plateau fracture'),
    plateauBroken(values) && `Tibial plateau fracture: ${join([
      PLATEAU_WORDS[str(values, 'plateau')],
      str(values, 'plateau-pattern') && str(values, 'plateau') === 'lateral' && picked(values, fields.plateauPattern),
      plateau && `Schatzker type ${plateau.type}`,
      depression !== undefined && `articular depression ${depression} mm`,
    ]) || 'present'}`,
    noneLine('segond', 'Segond fracture'),
    str(values, 'segond') === 'present' && 'Segond fracture: present',
    noneLine('reverse-segond', 'Reverse Segond fracture'),
    str(values, 'reverse-segond') === 'present' && 'Reverse Segond fracture: present',
    noneLine('fibular-head', 'Fibular head avulsion'),
    str(values, 'fibular-head') === 'present' && 'Fibular head avulsion: present (arcuate sign)',
    noneLine('tibial-spine', 'Tibial spine avulsion'),
    str(values, 'tibial-spine') === 'present' && `Tibial spine avulsion: ${join([
      str(values, 'meyers') && picked(values, fields.meyers),
      type && `Meyers and McKeever type ${type}`,
      displacement !== undefined && `anterior fragment raised ${displacement} mm`,
    ]) || 'present'}`,
    noneLine('pcl-avulsion', 'PCL avulsion'),
    str(values, 'pcl-avulsion') === 'present' && 'PCL avulsion: present',
    str(values, 'patella') === 'none' && 'Patella: no fracture',
    str(values, 'patella') === 'fracture' && `Patellar fracture: ${join([
      picked(values, fields.patellaPattern),
      separation !== undefined && `fragments ${separation} mm apart`,
      step !== undefined && `articular step ${step} mm`,
    ]) || 'present'}`,
    str(values, 'patella') === 'bipartite' && `Bipartite patella${str(values, 'bipartite-site') ? `: ${picked(values, fields.bipartiteSite)}` : ''}`,
    femur === 'none' && 'Distal femoral fracture: none',
    ['a', 'b', 'c'].includes(femur) && `Distal femoral fracture: ${join([picked(values, fields.femur), str(values, 'hoffa') === 'yes' && 'coronal (Hoffa) fragment'])}`,
    str(values, 'other-fractures') && `Other fractures: ${str(values, 'other-fractures')}`,
  ]
}

function softTissueLines(values: Values): (string | false)[] {
  const pouch = num(values, 'suprapatellar')
  const fatFluid = str(values, 'fat-fluid')
  return [
    str(values, 'effusion') === 'none' && 'Joint effusion: none',
    str(values, 'effusion') === 'present' && `Joint effusion: present${pouch !== undefined ? `, suprapatellar pouch ${pouch} mm` : ''}`,
    fatFluid === 'none' && 'Fluid level: none',
    fatFluid === 'fat' && 'Fat-fluid level: present (lipohaemarthrosis)',
    fatFluid === 'double' && 'Double fluid level: present (lipohaemarthrosis)',
    fatFluid === 'single' && 'Single fluid level, no fat layer seen',
    str(values, 'swelling') === 'none' && 'Soft-tissue swelling: none',
    str(values, 'swelling') === 'present' && `Soft-tissue swelling: ${str(values, 'swelling-site') || 'present'}`,
  ]
}

/* The impression. */

const PATELLA_WORDS: Record<string, string> = {
  transverse: 'Transverse patellar fracture',
  stellate: 'Stellate (comminuted) patellar fracture',
  vertical: 'Vertical patellar fracture',
  'lower-pole': 'Avulsion fracture of the lower pole of the patella',
  'upper-pole': 'Avulsion fracture of the upper pole of the patella',
}

const FEMUR_WORDS: Record<string, string> = {
  a: 'extra-articular (AO/OTA 33A)',
  b: 'partial articular (AO/OTA 33B)',
  c: 'complete articular (AO/OTA 33C)',
}

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const tibiofemoral = str(values, 'tibiofemoral')
  if (tibiofemoral === 'dislocated') out.push('Knee dislocation.')
  if (tibiofemoral === 'subluxed') out.push('Tibiofemoral subluxation.')
  if (str(values, 'patella-position') === 'lateral') out.push('Lateral displacement of the patella.')
  // KX3-1
  const insall = num(values, 'insall')
  if (insall !== undefined && insall > 1.3) out.push(`Patella alta (Insall–Salvati index ${insall}).`)
  if (insall !== undefined && insall < 0.8) out.push(`Patella baja (Insall–Salvati index ${insall}).`)
  // KX3-2, KX3-3
  const notch = num(values, 'notch')
  if (notch !== undefined && notch > 1.5) out.push(`Deep lateral femoral notch (${notch} mm): an indirect sign of ACL tear.`)
  else if (notch !== undefined && notch > 1) out.push(`Lateral femoral notch ${notch} mm deep, which suggests ACL injury.`)

  // KX4-1
  const plateau = plateauResult(values)
  if (plateauBroken(values)) out.push(plateau ? schatzkerSentence(plateau, num(values, 'plateau-depression')) : 'Tibial plateau fracture.')
  // KX5-1 to KX5-7
  if (str(values, 'segond') === 'present') out.push('Segond fracture, associated with ACL tear.')
  if (str(values, 'reverse-segond') === 'present') out.push('Reverse Segond fracture of the medial tibial rim, associated with PCL and medial meniscus tears.')
  if (str(values, 'fibular-head') === 'present') out.push('Avulsion of the fibular head (arcuate sign): posterolateral corner injury, often with cruciate injury.')
  if (str(values, 'tibial-spine') === 'present') {
    const type = meyersType[str(values, 'meyers')] as string | undefined
    const displacement = num(values, 'spine-displacement')
    out.push(`Tibial spine (ACL) avulsion${type ? `, Meyers and McKeever type ${type}` : ''}${displacement !== undefined ? `, anterior fragment raised ${displacement} mm` : ''}.`)
  }
  if (str(values, 'pcl-avulsion') === 'present') out.push('PCL avulsion from the posterior tibia.')
  // KX6-1, KX6-3
  if (str(values, 'patella') === 'fracture') {
    const words = PATELLA_WORDS[str(values, 'patella-pattern')] ?? 'Patellar fracture'
    const displaced = patellaDisplaced(values)
    out.push(`${words}${displaced === true ? ', displaced' : displaced === false ? ', undisplaced' : ''}.`)
  }
  // KX7-1, KX7-2
  const femur = str(values, 'femur')
  if (FEMUR_WORDS[femur]) out.push(`Distal femoral fracture, ${FEMUR_WORDS[femur]}${str(values, 'hoffa') === 'yes' ? ', with a coronal (Hoffa) fragment' : ''}.`)
  const otherFractures = str(values, 'other-fractures')
  if (otherFractures) out.push(`${upperFirst(otherFractures.replace(/\.$/, ''))}.`)
  // KX8-1 to KX8-5
  const pouch = num(values, 'suprapatellar')
  if (unexplainedLipo(values)) out.push('Lipohaemarthrosis with no fracture seen to account for it: an occult intra-articular fracture is likely.')
  else if (lipohaemarthrosis(values)) out.push('Lipohaemarthrosis, indicating an intra-articular fracture.')
  else if (str(values, 'effusion') === 'present') out.push(pouch !== undefined ? `Joint effusion (suprapatellar pouch ${pouch} mm).` : 'Joint effusion.')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

/** The further imaging the sources support, after the findings (KX9-1 sets the order). */
function furtherImaging(values: Values): string[] {
  const out: string[] = []
  // KX4-3
  if (plateauBroken(values)) out.push('Consider CT or MRI, which type a plateau fracture more accurately than radiographs.')
  // KX7-1, KX7-2
  if (['a', 'b', 'c'].includes(str(values, 'femur'))) out.push('Consider CT for the articular extension and any coronal (Hoffa) fracture.')
  // KX1-5
  if (str(values, 'tibiofemoral') === 'dislocated') out.push('Consider CT angiography of the leg.')
  // KX8-2
  if (unexplainedLipo(values)) out.push('Consider MRI or CT for an occult fracture.')
  // KX5-4, KX5-5, KX8-5
  if (softTissueMri(values)) out.push('Consider MRI for the ligaments and menisci.')
  return out
}

/** Bipartite patella is a variant, given its own line (KX6-3). */
function variantSentences(values: Values): string[] {
  if (str(values, 'patella') !== 'bipartite') return []
  const site = str(values, 'bipartite-site')
  const where = site === 'superolateral' ? ' (superolateral)' : site === 'lateral' ? ' (lateral margin)' : site === 'inferior' ? ' (inferior pole)' : ''
  return [`Bipartite patella${where} (anatomical variant).`]
}

const NORMAL_IMPRESSION = 'No fracture, dislocation or joint effusion.'

/** A warn chip from the findings steps; the history and technique chips name no finding. */
function warnChipFired(values: Values): boolean {
  return steps.filter((step) => step.id !== 'indication' && step.id !== 'views').some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function impression(values: Values): string {
  const found = findings(values)
  const further = furtherImaging(values)
  const variants = variantSentences(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // A warn chip from the findings steps or free text is not a finding the impression can name,
    // so never call such a study normal.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...variants, ...further)}`
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...variants)}`
    return variants.length > 0 ? `Impression: ${lines(...variants)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...variants, ...further)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = fracturesEntered(values)
  const dislocations = [
    str(values, 'tibiofemoral') === 'dislocated' && 'knee dislocation',
    str(values, 'tibiofemoral') === 'subluxed' && 'tibiofemoral subluxation',
    str(values, 'patella-position') === 'lateral' && 'lateral displacement of the patella',
  ].filter((item): item is string => Boolean(item))
  const effusion = str(values, 'effusion') === 'present' ? ['joint effusion'] : []
  const lipo = lipohaemarthrosis(values) ? ['lipohaemarthrosis'] : []
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-dislocation', 'no dislocation', dislocations],
    ['no-effusion', 'no joint effusion', effusion],
    ['no-lipo', 'no lipohaemarthrosis', lipo],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }
  // A fluid level is in a joint effusion.
  if (str(values, 'effusion') === 'none' && !['', 'none'].includes(str(values, 'fat-fluid'))) {
    out.push('A fluid level is entered, but the joint effusion is entered as none.')
  }
  // KX2-1: no fat-fluid level on a vertical-beam lateral.
  if (str(values, 'lateral-beam') === 'vertical' && str(values, 'fat-fluid') === 'none') {
    out.push('The lateral is a vertical-beam view: a fat-fluid level is shown best on a horizontal-beam lateral.')
  }
  // KX1-1, KX2-5: isolated patellar tenderness with no skyline view.
  if (list(values, 'ottawa').includes('patella') && !list(values, 'extra-views').includes('skyline') && str(values, 'patella') === 'none') {
    out.push('Isolated patellar tenderness is entered and there is no skyline view: a vertical patellar fracture is easily missed on the AP.')
  }
  // KX6-2: a pole avulsion against the patellar height.
  const insall = num(values, 'insall')
  if (str(values, 'patella') === 'fracture' && str(values, 'patella-pattern') === 'lower-pole' && insall !== undefined && insall <= 1.3) {
    out.push('A lower pole avulsion is entered, which comes with patella alta, but the Insall–Salvati index is not over 1.3.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...clinicalLines(values),
    ...techniqueLines(values),
    ...alignmentLines(values),
    ...boneLines(values),
    ...softTissueLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps. */

const steps: ReportStep[] = [
  {
    id: 'indication',
    title: 'Step 1. Why the film: the injury and the Ottawa knee rule',
    learn: 'indication',
    teach: (
      <>
        <p>Radiography after a knee injury in an adult when any one is present: age 55 or older, tenderness at the head of the fibula, isolated patellar tenderness, inability to flex to 90°, or inability to bear weight both immediately and in the department ({STIELL_1995}). The rule was 100% sensitive for fracture in its validation ({STIELL_1996}) and 98.5% in a pooled review ({BACHMANN}).</p>
        <p>After significant trauma or a knee dislocation, the ACR rates CT angiography of the leg 8 ({ACR}).</p>
      </>
    ),
    fields: [fields.side, fields.mechanism, fields.ottawa],
    derive: deriveIndication,
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    learn: 'views',
    teach: <p>An AP and a horizontal-beam lateral, the trauma standard ({FERGUSON}; {TOSUN}). A true lateral has the posterior condyles within 2 mm ({CRONE}) and shows the whole suprapatellar area ({HALL}). A skyline view for vertical patellar fractures ({JARRAYA}); a tunnel view showed two Segond fractures the AP missed ({GOLDMAN}).</p>,
    fields: [fields.views, fields.viewsMissing, fields.lateralBeam, fields.extraViews, fields.limits],
    derive: deriveViews,
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and measurements',
    learn: 'alignment',
    teach: <p>Insall–Salvati normal 0.8 to 1.3; over 1.3 alta, under 0.8 baja ({CRONE}). A lateral femoral notch deeper than 1.5 mm is a reliable sign of ACL tear ({COBBY}); over 1.0 mm had a PPV of 96% ({LODEWIJKS}).</p>,
    fields: [fields.tibiofemoral, fields.patellaPosition, fields.insall, fields.notch],
    derive: deriveAlignment,
  },
  {
    id: 'plateau',
    title: 'Step 4. Tibial plateau',
    learn: 'plateau',
    teach: (
      <>
        <p>Give the Schatzker type ({SCHATZKER}; {MARKHARDT}), as the Schatzker calculator does. CT and MRI type it more accurately than radiographs ({MARKHARDT}).</p>
        {schatzkerTable}
      </>
    ),
    fields: [fields.plateauFracture, fields.plateau, fields.plateauPattern, fields.plateauDepressionSite, fields.plateauDissociation, fields.plateauDepression],
    derive: derivePlateau,
  },
  {
    id: 'avulsions',
    title: 'Step 5. Avulsions: Segond, arcuate and the cruciates',
    learn: 'avulsions',
    teach: (
      <>
        <p>Segond: ACL tear ({GOLDMAN}; {CAMPOS}; {ESSR}). Reverse Segond: PCL and medial meniscus ({HALL_HOCHMAN}). Arcuate sign: posterolateral corner and the cruciates ({HUANG}; {JUHNG}). Tibial spine: Meyers and McKeever ({MEYERS}; {LI}); measure the rise of the anterior fragment ({ELLIS}).</p>
        {avulsionTable}
      </>
    ),
    fields: [fields.segond, fields.reverseSegond, fields.fibularHead, fields.tibialSpine, fields.meyers, fields.spineDisplacement, fields.pclAvulsion],
    derive: deriveAvulsions,
  },
  {
    id: 'patella',
    title: 'Step 6. Patella',
    learn: 'patella',
    teach: <p>Transverse, stellate, vertical or a pole avulsion; displaced if over 3 mm apart or with an articular step over 2 mm. A superolateral fragment favours a bipartite patella ({JARRAYA}; {AKDAG}).</p>,
    fields: [fields.patella, fields.patellaPattern, fields.patellaSeparation, fields.patellaStep, fields.bipartiteSite],
    derive: derivePatella,
  },
  {
    id: 'femur',
    title: 'Step 7. Distal femur',
    learn: 'femur',
    teach: <p>AO/OTA A extra-articular, B partial articular, C complete articular; CT for the articular extension and Hoffa fractures ({FOGAGNOLO}), found with 38% of supracondylar-intercondylar fractures ({NORK}).</p>,
    fields: [fields.femur, fields.hoffa],
    derive: deriveFemur,
  },
  {
    id: 'soft-tissues',
    title: 'Step 8. Effusion and lipohaemarthrosis',
    learn: 'soft-tissues',
    teach: <p>A fat-fluid level indicates an intra-articular fracture ({LEE}; {FERGUSON}); a single level can be blood alone ({LUGO}). Suprapatellar pouch 7 mm: effusion ({TAI}); over 10 mm: think of internal derangement ({CECAVA}).</p>,
    fields: [fields.effusion, fields.suprapatellar, fields.fatFluid, fields.swelling, fields.swellingSite],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 9. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read a lipohaemarthrosis against the fractures, and an avulsion against its ligaments. Then the further imaging the sources support.</p>,
    fields: [fields.otherFractures, fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'knee-xray',
  name: 'Knee X-ray for injury',
  lede: 'Read an adult\'s knee radiographs after an injury: the Ottawa knee rule as the reason for the film, the views, patellar height and the lateral notch, tibial plateau (Schatzker), the Segond, arcuate and cruciate avulsions, patella against bipartite patella, distal femur, lipohaemarthrosis, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings; the Schatzker and the Meyers and McKeever types, whose papers have no open copy, were read in the sources cited beside them.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'ottawa',
      question: 'Which of these is one of the five findings of the Ottawa knee rule?',
      options: ['Age 40 or older', 'Tenderness at the head of the fibula', 'A joint effusion', 'Medial joint line tenderness'],
      answer: 1,
      explanation: <p>The five are age 55 or older, tenderness at the head of the fibula, isolated patellar tenderness, inability to flex to 90°, and inability to bear weight both immediately and in the department ({STIELL_1995}).</p>,
    },
    {
      id: 'ottawa-accuracy',
      question: 'How sensitive was the Ottawa knee rule for fracture in the pooled review?',
      options: ['48.6%', '75%', '98.5%', '54%'],
      answer: 2,
      explanation: <p>Six studies in 4,249 adults pooled a sensitivity of 98.5% and a specificity of 48.6% ({BACHMANN}).</p>,
    },
    {
      id: 'horizontal-beam',
      question: 'Which lateral should be the standard view after knee trauma?',
      options: ['A vertical-beam lateral', 'A horizontal-beam lateral', 'A lateral with the knee flexed 90°', 'No lateral is needed'],
      answer: 1,
      explanation: <p>The horizontal-beam lateral shows a lipohaemarthrosis, and Ferguson and Knottenbelt proposed it as the standard trauma lateral ({FERGUSON}); a standing lateral was more sensitive than a supine one ({TOSUN}).</p>,
    },
    {
      id: 'lipohaemarthrosis',
      question: 'A fat-fluid level is seen in the suprapatellar recess, and no fracture is visible. What does it mean?',
      options: ['A haemarthrosis from a ligament tear only', 'An occult intra-articular fracture is likely: further imaging', 'A normal finding', 'Septic arthritis'],
      answer: 1,
      explanation: <p>A fat-fluid level indicated a fracture in all of Lee's patients ({LEE}); with no visible fracture it calls for further investigation ({FERGUSON}), and the ACR rates MRI 9 and CT 6 ({ACR}).</p>,
    },
    {
      id: 'single-level',
      question: 'A single fluid level is seen, with no fat layer. What did Lugo-Olivieri find?',
      options: ['It always means lipohaemarthrosis', 'It can be blood alone; a double level is more specific', 'It rules out a fracture', 'It means a synovial cyst'],
      answer: 1,
      explanation: <p>In 8 of 12 knees with a plateau fracture and a fluid level there was no fat on CT or MRI; a double fluid level is more specific ({LUGO}).</p>,
    },
    {
      id: 'segond',
      question: 'A small vertical avulsion is seen at the lateral tibial rim just below the plateau. Which ligament is likely torn?',
      options: ['The PCL', 'The ACL', 'The MCL', 'The patellar tendon'],
      answer: 1,
      explanation: <p>The Segond fracture went with an ACL tear in all nine of Goldman's cases ({GOLDMAN}), and has a 95% association with ACL rupture ({ESSR}).</p>,
    },
    {
      id: 'reverse-segond',
      question: 'A cortical avulsion is seen off the medial tibial plateau. What goes with it?',
      options: ['ACL and lateral meniscus tears', 'PCL and medial meniscus tears', 'A patellar dislocation', 'Nothing: it is a variant'],
      answer: 1,
      explanation: <p>The reverse (medial) Segond fracture goes with tears of the PCL and the medial meniscus ({HALL_HOCHMAN}).</p>,
    },
    {
      id: 'arcuate',
      question: 'A horizontal fragment 9 mm long is avulsed from the fibular head. What does it point to?',
      options: ['A tibial plateau fracture', 'Posterolateral corner injury, with the cruciates', 'A bipartite patella', 'A quadriceps tear'],
      answer: 1,
      explanation: <p>The arcuate sign: the arcuate complex was injured in all of Huang's 13, with the PCL in every one ({HUANG}); in Juhng's series a cruciate was injured in 89% ({JUHNG}).</p>,
    },
    {
      id: 'notch',
      question: 'The lateral femoral notch is 2 mm deep. What does it suggest?',
      options: ['A normal knee', 'A torn ACL', 'A PCL tear', 'Osteochondritis dissecans'],
      answer: 1,
      explanation: <p>No knee with a normal ACL had a notch deeper than 1.2 mm, and deeper than 1.5 mm was a reliable indirect sign of ACL tear ({COBBY}).</p>,
    },
    {
      id: 'insall',
      question: 'The Insall–Salvati index is 1.5 after a fall, with a small fragment off the lower pole of the patella. What is it?',
      options: ['Patella baja with a quadriceps avulsion', 'Patella alta with a bony avulsion of the patellar tendon', 'A bipartite patella', 'A normal patellar height'],
      answer: 1,
      explanation: <p>Over 1.3 is patella alta ({CRONE}); a lower pole avulsion is a bony avulsion of the patellar tendon and comes with patella alta ({JARRAYA}).</p>,
    },
    {
      id: 'bipartite',
      question: 'Which site of a separate patellar fragment favours a bipartite patella over a fracture?',
      options: ['Inferior pole', 'Superolateral', 'Medial margin', 'Centre of the patella'],
      answer: 1,
      explanation: <p>The superolateral site favours a bipartite patella ({JARRAYA}); 59 of Akdag's 61 fragments were there ({AKDAG}).</p>,
    },
    {
      id: 'schatzker',
      question: 'A fracture involves only the medial tibial plateau. Which Schatzker type is it, and what risk does it carry?',
      options: ['Type I, none', 'Type IV, to the peroneal nerve and popliteal vessels', 'Type V, compartment syndrome only', 'Type VI, to the quadriceps'],
      answer: 1,
      explanation: <p>A medial plateau fracture is type IV, and its fracture-dislocation mechanism raises the risk to the peroneal nerve and popliteal vessels ({MARKHARDT}).</p>,
    },
    {
      id: 'hoffa',
      question: 'A supracondylar-intercondylar femoral fracture is seen. How often did Nork find a coronal (Hoffa) fracture with one?',
      options: ['About 5%', 'About 38%', 'About 75%', 'Never'],
      answer: 1,
      explanation: <p>In 38.1% of 202 such fractures, found more often when CT was done (47% against 29%) ({NORK}); CT is needed to identify them ({FOGAGNOLO}).</p>,
    },
  ],
}

export function KneeXrayStudyPage() {
  return <StudyPage study={study} />
}
