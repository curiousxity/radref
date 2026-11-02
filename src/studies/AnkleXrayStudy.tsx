import { Link } from 'react-router-dom'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { ankleXrayScans } from '../data/scans/ankleXray'
import { fifthMetatarsalScans } from '../data/scans/fifthMetatarsal'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract, an open full text (Bachmann,
 * de-las-Heras Romero, Ziegler, Rydberg 2025, Fonseca, York, Pflüger, Wong, Walther, Chloros) or the
 * ACR's published ratings table before it went in. The claims table is
 * docs/superpowers/research/2026-11-01-ankle-xray-sources.md (AX claims). Rule chips and warnings
 * carry their claim IDs.
 *
 * Weber A, B or C is named in the report from the level of the fibular fracture against the
 * syndesmosis, with no separate calculator (the author's choice, 2026-11-01). The base of the fifth
 * metatarsal uses the zones of the fifth metatarsal page (/fifth-metatarsal), with its Lawrence and
 * Botte citation, so the two never disagree.
 */

const STIELL_1992_DOI = '10.1016/s0196-0644(05)82656-3'
const STIELL_1993_DOI = '10.1001/jama.1993.03500090063034'
const BACHMANN_DOI = '10.1136/bmj.326.7386.417'
const ACR_DOI = '10.1016/j.jacr.2020.09.014'
const DE_LAS_HERAS_DOI = '10.1302/2058-5241.2.160084'
const ZIEGLER_DOI = '10.1530/EOR-22-0082'
const PNEUMATICOS_DOI = '10.1177/107110070202300205'
const HARPER_DOI = '10.1177/107110078901000308'
const BEUMER_DOI = '10.1097/01.blo.0000129152.81015.ad'
const PARK_DOI = '10.1097/01.bot.0000189591.40267.09'
const RYDBERG_DOI = '10.2340/17453674.2025.44878'
const FONSECA_DOI = '10.1016/j.rboe.2017.11.013'
const YORK_DOI = '10.1007/s00256-019-03317-7'
const PFLUGER_DOI = '10.1302/2058-5241.6.200138'
const FERRIES_DOI = '10.1097/00005131-199408000-00009'
const BARTONICEK_DOI = '10.1007/s00402-018-3099-2'
const WONG_DOI = '10.1186/s12245-015-0076-1'
const TAWEEL_DOI = '10.1016/j.jemermed.2012.09.016'
const WALTHER_DOI = '10.1177/19476035231161806'
const MELENEVSKY_DOI = '10.1148/rg.2015140156'
const CHAN_DOI = '10.1067/mem.2003.213'
const CLARK_1995_DOI = '10.2214/ajr.164.5.7717229'
const CLARK_1996_DOI = '10.1016/s0009-9260(96)80057-2'
const LAWRENCE_DOI = '10.1177/107110079301400610'
const CHLOROS_DOI = '10.1530/EOR-21-0025'

const STIELL_1992 = <Cite doi={STIELL_1992_DOI}>Stiell et al., Ann Emerg Med 1992</Cite>
const STIELL_1993 = <Cite doi={STIELL_1993_DOI}>Stiell et al., JAMA 1993</Cite>
const BACHMANN = <Cite doi={BACHMANN_DOI}>Bachmann et al., BMJ 2003</Cite>
const ACR = <Cite doi={ACR_DOI}>ACR Appropriateness Criteria, Acute Trauma to the Ankle 2020</Cite>
const DE_LAS_HERAS = <Cite doi={DE_LAS_HERAS_DOI}>de-las-Heras Romero et al., EFORT Open Rev 2017</Cite>
const ZIEGLER = <Cite doi={ZIEGLER_DOI}>Ziegler et al., EFORT Open Rev 2023</Cite>
const PNEUMATICOS = <Cite doi={PNEUMATICOS_DOI}>Pneumaticos et al., Foot Ankle Int 2002</Cite>
const HARPER = <Cite doi={HARPER_DOI}>Harper and Keller, Foot Ankle 1989</Cite>
const BEUMER = <Cite doi={BEUMER_DOI}>Beumer et al., Clin Orthop Relat Res 2004</Cite>
const PARK = <Cite doi={PARK_DOI}>Park et al., J Orthop Trauma 2006</Cite>
const RYDBERG = <Cite doi={RYDBERG_DOI}>Rydberg et al., Acta Orthop 2025</Cite>
const FONSECA = <Cite doi={FONSECA_DOI}>Fonseca et al., Rev Bras Ortop 2018</Cite>
const YORK = <Cite doi={YORK_DOI}>York et al., Skeletal Radiol 2020</Cite>
const PFLUGER = <Cite doi={PFLUGER_DOI}>Pflüger et al., EFORT Open Rev 2021</Cite>
const FERRIES = <Cite doi={FERRIES_DOI}>Ferries et al., J Orthop Trauma 1994</Cite>
const BARTONICEK = <Cite doi={BARTONICEK_DOI}>Bartoníček et al., Arch Orthop Trauma Surg 2019</Cite>
const WONG = <Cite doi={WONG_DOI}>Wong et al., Int J Emerg Med 2015</Cite>
const TAWEEL = <Cite doi={TAWEEL_DOI}>Taweel et al., J Emerg Med 2013</Cite>
const WALTHER = <Cite doi={WALTHER_DOI}>Walther et al., Cartilage 2023</Cite>
const MELENEVSKY = <Cite doi={MELENEVSKY_DOI}>Melenevsky et al., RadioGraphics 2015</Cite>
const CHAN = <Cite doi={CHAN_DOI}>Chan and Yoshida, Ann Emerg Med 2003</Cite>
const CLARK_1995 = <Cite doi={CLARK_1995_DOI}>Clark et al., AJR 1995</Cite>
const CLARK_1996 = <Cite doi={CLARK_1996_DOI}>Clark et al., Clin Radiol 1996</Cite>
const LAWRENCE = <Cite doi={LAWRENCE_DOI}>Lawrence and Botte, Foot Ankle 1993</Cite>
const CHLOROS = <Cite doi={CHLOROS_DOI}>Chloros et al., EFORT Open Rev 2022</Cite>

const references: LessonReference[] = [
  { citation: 'Stiell IG, Greenberg GH, McKnight RD, Nair RC, McDowell I, Worthington JR. A study to develop clinical decision rules for the use of radiography in acute ankle injuries. Ann Emerg Med. 1992;21(4):384-390.', doi: STIELL_1992_DOI },
  { citation: 'Stiell IG, Greenberg GH, McKnight RD, Nair RC, McDowell I, Reardon M, Stewart JP, Maloney J. Decision rules for the use of radiography in acute ankle injuries. Refinement and prospective validation. JAMA. 1993;269(9):1127-1132.', doi: STIELL_1993_DOI },
  { citation: 'Bachmann LM, Kolb E, Koller MT, Steurer J, ter Riet G. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ. 2003;326(7386):417.', doi: BACHMANN_DOI },
  { citation: 'Expert Panel on Musculoskeletal Imaging; Smith SE, Chang EY, Ha AS, Bartolotta RJ, Bucknor M, Chandra T, Chen KC, Gorbachova T, Khurana B, Klitzke AK, Lee KS, Mooar PA, Ross AB, Shih RD, Singer AD, Taljanovic MS, Thomas JM, Tynus KM, Kransdorf MJ. ACR Appropriateness Criteria® Acute Trauma to the Ankle. J Am Coll Radiol. 2020;17(11S):S355-S366.', doi: ACR_DOI },
  { citation: 'de-las-Heras Romero J, Alvarez AML, Sanchez FM, Garcia AP, Porcel PAG, Sarabia RV, Torralba MH. Management of syndesmotic injuries of the ankle. EFORT Open Rev. 2017;2(9):403-409.', doi: DE_LAS_HERAS_DOI },
  { citation: 'Ziegler P, Bahrs C, Konrads C, Hemmann P, Ahrend MD. Ankle fractures of the geriatric patient: a narrative review. EFORT Open Rev. 2023;8(1):1-10.', doi: ZIEGLER_DOI },
  { citation: 'Pneumaticos SG, Noble PC, Chatziioannou SN, Trevino SG. The effects of rotation on radiographic evaluation of the tibiofibular syndesmosis. Foot Ankle Int. 2002;23(2):107-111.', doi: PNEUMATICOS_DOI },
  { citation: 'Harper MC, Keller TS. A radiographic evaluation of the tibiofibular syndesmosis. Foot Ankle. 1989;10(3):156-160.', doi: HARPER_DOI },
  { citation: 'Beumer A, van Hemert WLW, Niesing R, Entius CAC, Ginai AZ, Mulder PGH, Swierstra BA. Radiographic measurement of the distal tibiofibular syndesmosis has limited use. Clin Orthop Relat Res. 2004;(423):227-234.', doi: BEUMER_DOI },
  { citation: 'Park SS, Kubiak EN, Egol KA, Kummer F, Koval KJ. Stress radiographs after ankle fracture: the effect of ankle position and deltoid ligament status on medial clear space measurements. J Orthop Trauma. 2006;20(1):11-18.', doi: PARK_DOI },
  { citation: 'Rydberg EM, Pilskog K, Pakarinen H, Randsborg PH, Saltzman CL, Molund M. An Acta Orthopaedica educational article: Weightbearing assessment to guide nonoperative treatment of lateral malleolar fractures: the paradigm change. Acta Orthop. 2025;96:780-787.', doi: RYDBERG_DOI },
  { citation: 'Fonseca LLD, Nunes IG, Nogueira RR, Martins GEV, Mesencio AC, Kobata SI. Reproducibility of the Lauge-Hansen, Danis-Weber, and AO classifications for ankle fractures. Rev Bras Ortop. 2018;53(1):101-106.', doi: FONSECA_DOI },
  { citation: 'York TJ, Jenkins PJ, Ireland AJ. Reporting discrepancy resolved by findings and time in 2947 emergency department ankle X-rays. Skeletal Radiol. 2020;49(4):601-611.', doi: YORK_DOI },
  { citation: 'Pflüger P, Braun KF, Mair O, Kirchhoff C, Biberthaler P, Crönlein M. Current management of trimalleolar ankle fractures. EFORT Open Rev. 2021;6(8):692-703.', doi: PFLUGER_DOI },
  { citation: 'Ferries JS, DeCoster TA, Firoozbakhsh KK, Garcia JF, Miller RA. Plain radiographic interpretation in trimalleolar ankle fractures poorly assesses posterior fragment size. J Orthop Trauma. 1994;8(4):328-331.', doi: FERRIES_DOI },
  { citation: 'Bartoníček J, Rammelt S, Kašper Š, Malík J, Tuček M. Pathoanatomy of Maisonneuve fracture based on radiologic and CT examination. Arch Orthop Trauma Surg. 2019;139(4):497-506.', doi: BARTONICEK_DOI },
  { citation: "Wong PKW, Hanna TN, Shuaib W, Sanders SM, Khosa F. What's in a name? Lower extremity fracture eponyms (Part 2). Int J Emerg Med. 2015;8:25.", doi: WONG_DOI },
  { citation: 'Taweel NR, Raikin SM, Karanjia HN, Ahmad J. The proximal fibula should be examined in all patients with ankle injury: a case series of missed Maisonneuve fractures. J Emerg Med. 2013;44(2):e251-e255.', doi: TAWEEL_DOI },
  { citation: 'Walther M, Gottschalk O, Madry H, et al. Etiology, classification, diagnostics, and conservative management of osteochondral lesions of the talus. 2023 recommendations of the Working Group "Clinical Tissue Regeneration" of the German Society of Orthopedics and Traumatology. Cartilage. 2023;14(3):292-304.', doi: WALTHER_DOI },
  { citation: "Melenevsky Y, Mackey RA, Abrahams RB, Thomson NB 3rd. Talar fractures and dislocations: a radiologist's guide to timely diagnosis and classification. RadioGraphics. 2015;35(3):765-779.", doi: MELENEVSKY_DOI },
  { citation: 'Chan GM, Yoshida D. Fracture of the lateral process of the talus associated with snowboarding. Ann Emerg Med. 2003;41(6):854-858.', doi: CHAN_DOI },
  { citation: 'Clark TW, Janzen DL, Ho K, Grunfeld A, Connell DG. Detection of radiographically occult ankle fractures following acute trauma: positive predictive value of an ankle effusion. AJR Am J Roentgenol. 1995;164(5):1185-1189.', doi: CLARK_1995_DOI },
  { citation: 'Clark TW, Janzen DL, Logan PM, Ho K, Connell DG. Improving the detection of radiographically occult ankle fractures: positive predictive value of an ankle joint effusion. Clin Radiol. 1996;51(9):632-636.', doi: CLARK_1996_DOI },
  { citation: "Lawrence SJ, Botte MJ. Jones' fractures and related fractures of the proximal fifth metatarsal. Foot Ankle. 1993;14(6):358-365.", doi: LAWRENCE_DOI },
  { citation: 'Chloros GD, Kakos CD, Tastsidis IK, Giannoudis VP, Panteli M, Giannoudis PV. Fifth metatarsal fractures: an update on management, complications, and outcomes. EFORT Open Rev. 2022;7(1):13-25.', doi: CHLOROS_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* The radiograph measurements and their sourced values (AX3 claims). */

const measurementTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Measurement</th><th>Normal, as the source gives it</th><th>Caution</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Tibiofibular clear space</td><td>Under about 6 mm on AP and mortise (cadavers; Harper and Keller)</td><td>Does not change with rotation; mean 3.9 mm, range 2 to 5.5 (Pneumaticos)</td></tr>
        <tr><td className="vessel-name">Tibiofibular overlap, AP</td><td>Over about 6 mm, or 42% of the fibular width</td><td>Changes with rotation</td></tr>
        <tr><td className="vessel-name">Tibiofibular overlap, mortise</td><td>Over about 1 mm</td><td>Changes with rotation; no overlap on one side may mean syndesmotic injury (Beumer)</td></tr>
        <tr><td className="vessel-name">Medial clear space</td><td>No wider than the superior clear space (Beumer)</td><td>4 mm is a common cut-off with no scientific basis (Rydberg); 5 mm on a dorsiflexion-external rotation stress view (Park)</td></tr>
      </tbody>
    </table>
  </div>
)

/* The fifth metatarsal zones, worded as on the fifth metatarsal page (AX4-12). */

const fifthMetatarsalLink = <Link to="/fifth-metatarsal">fifth metatarsal page</Link>

const learn: LearnSection[] = [
  {
    id: 'history',
    title: 'Step 1. Why the film: the injury and the Ottawa rules',
    body: (
      <>
        <p>This lesson is for an adult with an acute ankle injury. The order of the steps is this site's own; the sources below give the rules and measurements used in each.</p>
        <h3>The Ottawa ankle rules</h3>
        <p>Stiell and colleagues derived the rules in 1992 from 750 adults with acute blunt ankle injuries, to predict which needed radiographs. All 70 significant malleolar fractures were found among patients with pain near the malleoli who were 55 or older, had bone tenderness at the posterior edge or tip of either malleolus, or could not bear weight both immediately after the injury and in the emergency department (100% sensitive, 40.1% specific). All 32 midfoot fractures were found among patients with midfoot pain and bone tenderness at the base of the fifth metatarsal, the cuboid or the navicular ({STIELL_1992}). In 1993 the rules were refined and validated: the refined rules were 100% sensitive for 50 malleolar and 19 midfoot fractures, and could cut ankle radiographs by 34% and foot radiographs by 30% ({STIELL_1993}).</p>
        <p>As Bachmann's review draws them, an ankle series is needed only if there is pain in the malleolar zone and any of: bone tenderness along the distal 6 cm of the posterior edge or the tip of the lateral malleolus, the same of the medial malleolus, or inability to bear weight both immediately and in the emergency department (four steps). A foot series is needed only if there is pain in the midfoot zone and any of: bone tenderness at the base of the fifth metatarsal, at the navicular, or inability to bear weight. Across 27 studies the rules were almost 100% sensitive, with a modest specificity, and should reduce unnecessary radiographs by 30 to 40% ({BACHMANN}). The foot rule leads to the foot series; see the <Link to="/studies/foot-xray">foot X-ray study</Link>.</p>
        <p>The ACR rates ankle radiographs 9 (usually appropriate) when the Ottawa rules are positive and 1 when they are negative, and 9 again when the rules cannot be used because of an exclusion such as a neurological disorder or neuropathy; CT then scores 5 (may be appropriate) ({ACR}). The ACR's wording of a positive rule adds tenderness over the talus or calcaneus, which Stiell's rules do not include; this lesson uses Stiell's.</p>
        <h3>The mechanism</h3>
        <p>A tuberosity avulsion of the fifth metatarsal (zone 1) usually follows inversion ({CHLOROS}). A fracture of the lateral process of the talus should be suspected after inversion with dorsiflexion and tenderness over the lateral process ({CHAN}). The Maisonneuve fracture follows external rotation applied to a pronated or supinated foot ({WONG}). Talar fractures commonly follow high-energy trauma ({MELENEVSKY}).</p>
        <h3>The proximal fibula</h3>
        <p>Most patients with a Maisonneuve fracture complain of ankle pain and very little pain over the fracture, and in Taweel's five cases it was missed despite ankle radiographs; the proximal fibula should be examined in every ankle injury ({TAWEEL}). Pain in the proximal lower leg is one of the reasons to image the whole lower leg ({ZIEGLER}).</p>
      </>
    ),
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    body: (
      <>
        <p>The ankle series is three views: AP, mortise and lateral. A mortise view taken in unilateral weight-bearing is the most accurate way to judge displacement, but not every patient can stand on the injured ankle at first. Full-length AP and lateral views of the leg rule out a Maisonneuve fracture ({DE_LAS_HERAS}).</p>
        <p>Sources differ on how far to turn the leg for the mortise view. In Pneumaticos's cadavers a true mortise needed 13.6° of internal rotation on average (12 to 17°), and of all the measurements only the tibiofibular clear space did not change with rotation ({PNEUMATICOS}); Ziegler gives 20° ({ZIEGLER}). Either way, the overlap and the medial clear space depend on the position, which is one reason Beumer found repeated measurements unreliable ({BEUMER}).</p>
        <p>For a lateral malleolar fracture at the level of the syndesmosis, Rydberg and colleagues make weight-bearing radiographs at 4 to 10 days the basis of the treatment decision, for patients without a dislocation or reduction and with a medial clear space of up to 7 mm ({RYDBERG}). When the alignment suggests a syndesmotic or ligament injury with no fracture, the ACR rates stress views 8, radiographs of the leg 8, MRI 9 and CT 7 ({ACR}).</p>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 3. Mortise, clear spaces and the syndesmosis',
    body: (
      <>
        <p>Rydberg quotes Ramsey and Hamilton's finding that 1 mm of lateral talar shift cut tibiotalar contact by 42% ({RYDBERG}).</p>
        <h3>The syndesmosis</h3>
        <p>In Harper and Keller's cadavers, a normal tibiofibular relationship gave a tibiofibular clear space under about 6 mm on AP and mortise views, an overlap over about 6 mm (or 42% of the fibular width) on the AP view and over about 1 mm on the mortise view; the clear space was the most reliable sign of early widening ({HARPER}). Measure both about 1 cm above the plafond ({DE_LAS_HERAS}). The clear space averaged 3.9 mm (2 to 5.5 mm) and varied between people, so Pneumaticos advises comparison views of the other ankle to confirm a suspected injury ({PNEUMATICOS}).</p>
        <p>Beumer found no reliable single measurement: some overlap was present on every radiograph, and quantitative measurements on repeated radiographs could not be made reliably. Overlap absent on one side after injury may mean syndesmotic injury ({BEUMER}). Plain radiographs are only 44 to 58% specific for syndesmotic injury, and in doubt CT shows the position of the fibula in the incisura ({DE_LAS_HERAS}).</p>
        <h3>The medial clear space</h3>
        <p>In Beumer's normal ankles the medial clear space was never wider than the superior clear space, and a medial clear space wider than the superior clear space points to a deltoid injury ({BEUMER}). On a stress view in dorsiflexion and external rotation, 5 mm or more was the most reliable predictor of deep deltoid disruption after a Weber B fracture; 4 mm was less specific and 6 mm less sensitive ({PARK}).</p>
        <p>Rydberg notes that over 4 mm has often been used to call an ankle unstable, without a scientific basis, on non-weight-bearing images. On weight-bearing radiographs Gregersen called the ankle stable with a medial clear space under 5.0 mm and no more than 1.0 mm wider than the uninjured side ({RYDBERG}). This lesson gives each threshold with its view.</p>
        {measurementTable}
        <ScanFigures images={[ankleXrayScans.clearSpaces, ankleXrayScans.tfcsWidening, ankleXrayScans.stressView]} />
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 4. Bones, fracture by fracture',
    body: (
      <>
        <h3>The lateral malleolus: Weber A, B or C</h3>
        <p>Danis and Weber classified ankle fractures by where the main fibular fracture line lies: type A below the syndesmosis, type B at the level of the syndesmosis, type C above it. It is simple and the easiest of the three main classifications to agree on (kappa 0.49, against 0.38 for AO and 0.32 for Lauge-Hansen), but it does not consistently predict the injury to the syndesmosis. In the AO-OTA scheme A, B and C are infrasyndesmotic, transsyndesmotic and suprasyndesmotic, and a proximal fibular (Maisonneuve) fracture is C3 ({FONSECA}; {PFLUGER}).</p>
        <p>Weber's system looks only at the fibula and overlooks the medial side. An isolated lateral malleolar fracture at the level of the syndesmosis, Weber B, is the commonest ankle fracture ({RYDBERG}). On non-weight-bearing images a fracture without deltoid injury (AO B1) and one with it (B2.1) usually look the same, unless there is a bony avulsion or major incongruence ({RYDBERG}).</p>
        <p>In 2947 emergency ankle radiographs, Weber B was the commonest fracture (10.7% of reports), then C (4.1%) and A (1.6%). Weber A fractures were the most often missed at first reading (17.0%), against 9.8% of C and 2.5% of B; talar (21.9%), navicular (40.0%), cuboid (33.3%) and fifth metatarsal fractures (10.5%) were also missed out of proportion ({YORK}).</p>
        <h3>The medial and posterior malleoli</h3>
        <p>A trimalleolar fracture involves all three malleoli; it is considered unstable, and CT matters for planning because it shows the posterior malleolus. Displacement over 2 mm, or a fragment of a quarter to a third of the articular surface on the lateral radiograph, was long the indication for surgery, but plain radiographs judge the fragment poorly, so CT-based classifications were developed ({PFLUGER}). Against CT, 54% of plain radiograph readings were off by more than 25%, mostly overestimating the fragment ({FERRIES}).</p>
        <h3>The proximal fibula: Maisonneuve</h3>
        <p>A Maisonneuve fracture is a fracture of the proximal fibula with disruption of the distal syndesmosis; it implies an unstable ankle even with the talus and mortise in normal position, and non-weight-bearing views may not show the widening. Suspect it whenever there is lateral talar displacement or tibiofibular widening without a distal fibular fracture, and obtain stress and full-length radiographs ({WONG}). Ziegler adds a medial malleolar fracture without a visible distal fibular fracture, or dehiscence of the ankle joint, as reasons to image the whole lower leg ({ZIEGLER}).</p>
        <p>In Bartoníček's 54 patients the fibular fracture was in the proximal quarter; 43 had a posterior malleolar fracture, 20 (37%) a medial malleolar fracture, and the medial structures were intact in 7 (13%). The anterior and interosseous tibiofibular ligaments were always torn, and CT should be used widely ({BARTONICEK}).</p>
        <h3>The talus</h3>
        <p>About half of osteochondral lesions of the talus cannot be seen on plain radiographs, and 96.2% lie on the medial (62.8%) or lateral (33.4%) talar dome ({WALTHER}). When the radiographs show a fracture or a possible osteochondral injury, the ACR rates CT and MRI 9 each ({ACR}).</p>
        <p>Lateral process fractures can be radiographically occult and need a higher index of suspicion ({MELENEVSKY}). Plain films are negative in up to 40%, so CT is the imaging of choice ({CHAN}).</p>
        <h3>The base of the fifth metatarsal</h3>
        <p>The zones follow Lawrence and Botte ({LAWRENCE}), as on the {fifthMetatarsalLink}. Zone 1 is the tuberosity, proximal to the joint between the fourth and fifth metatarsal bases: the tuberosity avulsion, more than 90% of fifth metatarsal fractures, usually from inversion. Zone 2 is the metaphyseal-diaphyseal junction, a fracture running into the 4–5 intermetatarsal joint (the Jones fracture). Zone 3 is the proximal shaft just beyond that joint, within about 1.5 cm: the proximal diaphyseal stress fracture. Fractures beyond zone 3 are dancer's fractures ({CHLOROS}).</p>
        <ScanFigures images={[ankleXrayScans.weberA, ankleXrayScans.weberB, ankleXrayScans.weberC, ankleXrayScans.maisonneuveFibula, ankleXrayScans.maisonneuveAnkle, ankleXrayScans.posteriorMalleolus, ankleXrayScans.lateralProcessCt, fifthMetatarsalScans.zone1]} />
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Soft tissues',
    body: (
      <>
        <p>Measure an ankle effusion on the lateral view as the anterior plus posterior capsular distension. In Clark's 1995 series, 11 of 33 patients with an effusion and otherwise normal radiographs had an occult fracture on tomography, 4 of them osteochondral fractures of the talar dome. An effusion of 13 mm or more was 82% sensitive and 91% specific, with a positive predictive value of 82%, and was a reasonable threshold for more imaging ({CLARK_1995}).</p>
        <p>In Clark's 1996 series, CT found an occult fracture in 12 of 26 patients with an effusion (46%), 7 of them in the talus; the effusion averaged 17.1 mm with a fracture and 11.2 mm without, and 15 mm or more had a positive predictive value of 83% ({CLARK_1996}). The two papers give different thresholds, 13 and 15 mm; this lesson gives both.</p>
        <p>Soft-tissue swelling was the finding most often left out of the first report ({YORK}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    body: (
      <>
        <p>Name the fibular fracture by its Weber type, then the medial and posterior malleoli, the mortise and the clear spaces, and whatever else the Ottawa zones point to. CT is suggested in the impression only where a source supports it: the posterior malleolus ({PFLUGER}; {FERRIES}), a Maisonneuve fracture ({BARTONICEK}), the lateral process of the talus ({CHAN}), an osteochondral lesion ({ACR}) and a large effusion with no fracture ({CLARK_1996}). Radiographs of the whole fibula are suggested for a medial or syndesmotic injury with no fibular fracture at the ankle ({WONG}; {ZIEGLER}).</p>
        <p>With persistent pain for one to three weeks and negative first radiographs, the ACR rates MRI 8 and CT 7 ({ACR}). This order is this site's own.</p>
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

const nonePresent: Option[] = [
  { value: 'none', label: 'No fracture' },
  { value: 'present', label: 'Fracture' },
]

const fields = {
  side: { id: 'side', kind: 'choice', label: 'Side', required: true, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ] },
  mechanism: { id: 'mechanism', kind: 'choice', label: 'Mechanism', options: [
    { value: 'inversion', label: 'Rolled over: inversion' },
    { value: 'inversion-df', label: 'Inversion with the foot dorsiflexed (e.g. snowboarding)' },
    { value: 'external', label: 'Twisting: external rotation' },
    { value: 'high', label: 'High energy: fall from a height or road collision' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  reason: { id: 'reason', kind: 'choice', label: 'Reason for the film', required: true, options: [
    { value: 'ottawa', label: 'Ottawa rules applied' },
    { value: 'excluded', label: 'Ottawa rules cannot be applied (neuropathy, neurological disorder or another exclusion)' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  // AX1-3: Bachmann's figure of the refined rules.
  ottawa: { id: 'ottawa', kind: 'multi', label: 'Ottawa findings', showIf: (v) => str(v, 'reason') === 'ottawa', options: [
    { value: 'malleolar-pain', label: 'Pain in the malleolar zone' },
    { value: 'lateral-tender', label: 'Bone tenderness: posterior edge or tip of the lateral malleolus (distal 6 cm)' },
    { value: 'medial-tender', label: 'Bone tenderness: posterior edge or tip of the medial malleolus (distal 6 cm)' },
    { value: 'no-weight', label: 'Unable to bear weight (four steps) both immediately and in the emergency department' },
    { value: 'midfoot-pain', label: 'Pain in the midfoot zone' },
    { value: 'fifth-tender', label: 'Bone tenderness: base of the fifth metatarsal' },
    { value: 'navicular-tender', label: 'Bone tenderness: navicular' },
  ] },
  proximalFibula: { id: 'proximal-fibula', kind: 'choice', label: 'Proximal fibula on examination', options: [
    { value: 'not-tender', label: 'Not tender' },
    { value: 'tender', label: 'Tender, or pain in the upper leg' },
    { value: 'not-stated', label: 'Not stated' },
  ] },

  views: { id: 'views', kind: 'multi', label: 'Views', required: true, options: [
    { value: 'ap', label: 'AP' },
    { value: 'mortise', label: 'Mortise' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'weight', label: 'Weight-bearing mortise' },
    { value: 'stress', label: 'Stress view' },
    { value: 'leg', label: 'Whole lower leg (tibia and fibula)' },
  ] },

  mortise: { id: 'mortise', kind: 'choice', label: 'Ankle mortise', required: true, options: [
    { value: 'congruent', label: 'Congruent' },
    { value: 'shift', label: 'Talar shift or tilt' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  mcsView: { id: 'mcs-view', kind: 'choice', label: 'Medial clear space measured on', options: [
    { value: 'non-weight', label: 'Non-weight-bearing mortise' },
    { value: 'weight', label: 'Weight-bearing mortise' },
    { value: 'stress', label: 'Stress view (dorsiflexion, external rotation)' },
  ] },
  mcs: { id: 'mcs', kind: 'number', label: 'Medial clear space', unit: 'mm', min: 0, max: 30, step: 0.1 },
  scs: { id: 'scs', kind: 'number', label: 'Superior clear space', unit: 'mm', min: 0, max: 30, step: 0.1 },
  mcsOther: { id: 'mcs-other', kind: 'number', label: 'Medial clear space, uninjured side', unit: 'mm', min: 0, max: 30, step: 0.1, showIf: (v) => str(v, 'mcs-view') === 'weight' },
  tfcs: { id: 'tfcs', kind: 'number', label: 'Tibiofibular clear space', unit: 'mm', min: 0, max: 30, step: 0.1, help: 'About 1 cm above the plafond. Normal under about 6 mm.' },
  tfoAp: { id: 'tfo-ap', kind: 'number', label: 'Tibiofibular overlap, AP', unit: 'mm', min: 0, max: 30, step: 0.1, help: 'Normal over about 6 mm.' },
  tfoMortise: { id: 'tfo-mortise', kind: 'number', label: 'Tibiofibular overlap, mortise', unit: 'mm', min: 0, max: 30, step: 0.1, help: 'Normal over about 1 mm.' },

  lateral: { id: 'lateral', kind: 'choice', label: 'Lateral malleolus (distal fibula)', required: true, options: nonePresent },
  // AX4-1: the Danis-Weber levels.
  weber: { id: 'weber', kind: 'choice', label: 'Level of the fibular fracture', showIf: (v) => str(v, 'lateral') === 'present', options: [
    { value: 'A', label: 'Below the level of the syndesmosis' },
    { value: 'B', label: 'At the level of the syndesmosis' },
    { value: 'C', label: 'Above the level of the syndesmosis' },
  ] },
  medial: { id: 'medial', kind: 'choice', label: 'Medial malleolus', required: true, options: nonePresent },
  posterior: { id: 'posterior', kind: 'choice', label: 'Posterior malleolus', required: true, options: nonePresent },
  posteriorShare: { id: 'posterior-share', kind: 'number', label: 'Share of the articular surface, on the lateral view', unit: '%', min: 0, max: 100, step: 1, showIf: (v) => str(v, 'posterior') === 'present' },
  fibula: { id: 'fibula', kind: 'choice', label: 'Proximal fibula', options: [
    { value: 'not-imaged', label: 'Not imaged' },
    { value: 'intact', label: 'Intact' },
    { value: 'fracture', label: 'Fracture' },
  ] },
  dome: { id: 'dome', kind: 'choice', label: 'Talar dome', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'lesion', label: 'Lucency, flattening or fragment (osteochondral)' },
  ] },
  domeSite: { id: 'dome-site', kind: 'choice', label: 'Where on the dome', showIf: (v) => str(v, 'dome') === 'lesion', options: [
    { value: 'medial', label: 'Medial' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'other', label: 'Elsewhere' },
  ] },
  lateralProcess: { id: 'lateral-process', kind: 'choice', label: 'Lateral process of the talus', required: true, options: nonePresent },
  fifth: { id: 'fifth', kind: 'choice', label: 'Base of the fifth metatarsal', required: true, options: [
    { value: 'not-included', label: 'Not in view' },
    { value: 'intact', label: 'Intact' },
    { value: 'fracture', label: 'Fracture' },
  ] },
  // AX4-12: the zones as worded on the fifth metatarsal page.
  fifthZone: { id: 'fifth-zone', kind: 'choice', label: 'Zone', showIf: (v) => str(v, 'fifth') === 'fracture', options: [
    { value: '1', label: 'Zone 1: tuberosity, proximal to the 4–5 joint' },
    { value: '2', label: 'Zone 2: runs into the 4–5 intermetatarsal joint' },
    { value: '3', label: 'Zone 3: proximal shaft just beyond the joint, within about 1.5 cm' },
    { value: 'distal', label: 'Beyond zone 3: distal shaft' },
  ] },
  otherFractures: { id: 'other-fractures', kind: 'text', label: 'Other fractures', placeholder: 'e.g. anterior process of the calcaneus' },

  effusion: { id: 'effusion', kind: 'choice', label: 'Ankle joint effusion (lateral view)', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  effusionSize: { id: 'effusion-size', kind: 'number', label: 'Anterior plus posterior capsular distension', unit: 'mm', min: 0, max: 60, step: 0.5, showIf: (v) => str(v, 'effusion') === 'present' },
  swelling: { id: 'swelling', kind: 'choice', label: 'Soft-tissue swelling', options: [
    { value: 'none', label: 'None' },
    { value: 'lateral', label: 'Over the lateral malleolus' },
    { value: 'medial', label: 'Over the medial malleolus' },
    { value: 'both', label: 'On both sides' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. os trigonum' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'congruent', label: 'Mortise congruent' },
    { value: 'no-effusion', label: 'No joint effusion' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

const ottawaHas = (values: Values, item: string) => str(values, 'reason') === 'ottawa' && list(values, 'ottawa').includes(item)

/** AX1-3: pain in the malleolar zone with any of the three findings. */
function ankleRuleMet(values: Values): boolean {
  return ottawaHas(values, 'malleolar-pain') && ['lateral-tender', 'medial-tender', 'no-weight'].some((item) => ottawaHas(values, item))
}

/** AX1-3: pain in the midfoot zone with any of the three findings. */
function footRuleMet(values: Values): boolean {
  return ottawaHas(values, 'midfoot-pain') && ['fifth-tender', 'navicular-tender', 'no-weight'].some((item) => ottawaHas(values, item))
}

const isWeber = (values: Values, type: string) => str(values, 'lateral') === 'present' && str(values, 'weber') === type
const medialFracture = (values: Values) => str(values, 'medial') === 'present'
const posteriorFracture = (values: Values) => str(values, 'posterior') === 'present'
const trimalleolar = (values: Values) => str(values, 'lateral') === 'present' && medialFracture(values) && posteriorFracture(values)

/** AX3-3: a medial clear space wider than the superior clear space. */
function medialWiderThanSuperior(values: Values): boolean {
  const mcs = num(values, 'mcs')
  const scs = num(values, 'scs')
  return mcs !== undefined && scs !== undefined && mcs > scs
}

/** AX3-4: 5 mm or more on a dorsiflexion-external rotation stress view. */
function stressWidened(values: Values): boolean {
  const mcs = num(values, 'mcs')
  return str(values, 'mcs-view') === 'stress' && mcs !== undefined && mcs >= 5
}

/** AX3-1: a tibiofibular clear space of 6 mm or more. */
function clearSpaceWidened(values: Values): boolean {
  const tfcs = num(values, 'tfcs')
  return tfcs !== undefined && tfcs >= 6
}

/** AX3-1: overlap at or below Harper and Keller's normal values. */
function overlapReduced(values: Values): boolean {
  const ap = num(values, 'tfo-ap')
  const mortise = num(values, 'tfo-mortise')
  return (ap !== undefined && ap <= 6) || (mortise !== undefined && mortise <= 1)
}

/** Medial or syndesmotic injury signs, for the Maisonneuve check (AX4-6). */
function medialOrSyndesmoticSign(values: Values): boolean {
  return medialFracture(values) || medialWiderThanSuperior(values) || stressWidened(values) || clearSpaceWidened(values)
    || overlapReduced(values) || ['shift', 'dislocated'].includes(str(values, 'mortise'))
}

/** AX4-6, AX1-8: no distal fibular fracture, the fibula not shown, and a reason to look up it. */
function lookUpFibula(values: Values): boolean {
  if (['intact', 'fracture'].includes(str(values, 'fibula')) || list(values, 'views').includes('leg')) return false
  const noDistalFracture = str(values, 'lateral') === 'none'
  return (noDistalFracture && medialOrSyndesmoticSign(values)) || str(values, 'proximal-fibula') === 'tender'
}

/** AX5-1, AX5-2: the effusion size in mm, or undefined. */
function effusionSize(values: Values): number | undefined {
  return str(values, 'effusion') === 'present' ? num(values, 'effusion-size') : undefined
}

/** Every fracture question answered "none" (or the fifth metatarsal intact or out of view), no other fracture typed. */
function noFractureEntered(values: Values): boolean {
  return ['lateral', 'medial', 'posterior', 'lateral-process'].every((id) => str(values, id) === 'none')
    && ['normal'].includes(str(values, 'dome'))
    && ['intact', 'not-included'].includes(str(values, 'fifth'))
    && str(values, 'fibula') !== 'fracture'
    && str(values, 'other-fractures') === ''
}

function fracturesEntered(values: Values): string[] {
  return [
    str(values, 'lateral') === 'present' && 'lateral malleolar fracture',
    medialFracture(values) && 'medial malleolar fracture',
    posteriorFracture(values) && 'posterior malleolar fracture',
    str(values, 'fibula') === 'fracture' && 'proximal fibular fracture',
    str(values, 'dome') === 'lesion' && 'osteochondral lesion',
    str(values, 'lateral-process') === 'present' && 'lateral process fracture',
    str(values, 'fifth') === 'fracture' && 'fifth metatarsal fracture',
    str(values, 'other-fractures') !== '' && str(values, 'other-fractures'),
  ].filter((item): item is string => Boolean(item))
}

/* Rule chips. */

function deriveHistory(values: Values): Derived[] {
  const out: Derived[] = []
  const reason = str(values, 'reason')
  // AX1-3, AX1-5: the rule met and the ACR rating for it.
  if (ankleRuleMet(values)) out.push({ label: 'Ottawa ankle rule', value: 'Met: ankle series indicated (ACR 9)', tone: 'warn' })
  if (footRuleMet(values)) out.push({ label: 'Ottawa foot rule', value: 'Met: foot series indicated', tone: 'warn' })
  if (reason === 'ottawa' && list(values, 'ottawa').length > 0 && !ankleRuleMet(values) && !footRuleMet(values)) {
    out.push({ label: 'Ottawa rules', value: 'Neither rule is met by the findings entered: state why the film was taken', tone: 'warn' })
  }
  if (reason === 'excluded') out.push({ label: 'ACR', value: 'Ottawa rules cannot be applied: radiographs 9, CT 5' })
  // AX1-6: what each mechanism points to.
  const mechanism = str(values, 'mechanism')
  if (mechanism === 'inversion') out.push({ label: 'Inversion', value: 'Check the base of the fifth metatarsal: zone 1 avulsions usually follow inversion' })
  if (mechanism === 'inversion-df') out.push({ label: 'Lateral process of the talus', value: 'Suspect it after inversion with dorsiflexion: plain films negative in up to 40%', tone: 'warn' })
  if (mechanism === 'external') out.push({ label: 'External rotation', value: 'The Maisonneuve mechanism: look at the proximal fibula' })
  if (mechanism === 'high') out.push({ label: 'High energy', value: 'Talar fractures commonly follow high-energy trauma' })
  // AX1-7: the proximal fibula.
  const fibula = str(values, 'proximal-fibula')
  if (fibula === 'tender') out.push({ label: 'Proximal fibula', value: 'Tender: image the whole lower leg', tone: 'warn' })
  if (fibula === 'not-stated') out.push({ label: 'Proximal fibula', value: 'Should be examined in every ankle injury (Maisonneuve)' })
  return out
}

function deriveViews(values: Values): Derived[] {
  const out: Derived[] = []
  const views = list(values, 'views')
  if (views.length === 0) return out
  // AX2-1: the three-view series.
  const missing = (['ap', 'mortise', 'lateral'] as const).filter((view) => !views.includes(view)).map((view) => lowerFirst(optionLabel(fields.views, view)))
  if (missing.length > 0) out.push({ label: 'Standard series', value: `AP, mortise and lateral; missing ${andList(missing)}`, tone: 'warn' })
  else out.push({ label: 'Standard series', value: 'AP, mortise and lateral', tone: 'good' })
  // AX1-3: a foot series for the foot rule.
  if (footRuleMet(values)) out.push({ label: 'Foot series', value: 'The Ottawa foot rule is met: a foot series is needed' })
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  const mcs = num(values, 'mcs')
  const scs = num(values, 'scs')
  const view = str(values, 'mcs-view')
  // AX3-3: against the superior clear space.
  if (mcs !== undefined && scs !== undefined) {
    out.push(mcs > scs
      ? { label: 'Medial clear space', value: 'Wider than the superior clear space: points to a deltoid injury', tone: 'warn' }
      : { label: 'Medial clear space', value: 'No wider than the superior clear space', tone: 'good' })
  }
  if (mcs !== undefined) {
    // AX3-4: the stress view.
    if (view === 'stress') {
      out.push(mcs >= 5
        ? { label: 'Stress view', value: '5 mm or more: most predictive of deep deltoid disruption', tone: 'warn' }
        : { label: 'Stress view', value: 'Under 5 mm, the most predictive threshold for deep deltoid disruption' })
    }
    // AX3-5: 4 mm on non-weight-bearing views.
    if (view === 'non-weight' && mcs > 4) out.push({ label: 'Over 4 mm', value: 'A common cut-off with no scientific basis on non-weight-bearing views; weight-bearing views judge congruence' })
    // AX3-5: Gregersen's weight-bearing criteria.
    if (view === 'weight') {
      const other = num(values, 'mcs-other')
      // Rounded to 0.1 mm, so 4.9 against 3.9 is a 1.0 mm difference.
      const difference = other === undefined ? undefined : Math.round((mcs - other) * 10) / 10
      if (mcs >= 5 || (difference !== undefined && difference > 1)) out.push({ label: 'Weight-bearing', value: 'Not stable by Gregersen\'s criteria (under 5.0 mm and within 1.0 mm of the other side)', tone: 'warn' })
      else if (other !== undefined) out.push({ label: 'Weight-bearing', value: 'Stable: under 5.0 mm and within 1.0 mm of the other side', tone: 'good' })
      else out.push({ label: 'Weight-bearing', value: 'Under 5.0 mm; compare with the other side (within 1.0 mm)' })
    }
  }
  // AX3-1, AX3-2: the tibiofibular clear space.
  const tfcs = num(values, 'tfcs')
  if (tfcs !== undefined) {
    out.push(tfcs >= 6
      ? { label: 'Tibiofibular clear space', value: '6 mm or more: syndesmotic widening', tone: 'warn' }
      : { label: 'Tibiofibular clear space', value: 'Under 6 mm: normal', tone: 'good' })
  }
  // AX3-1, AX3-3: the overlap, which changes with rotation.
  const tfoAp = num(values, 'tfo-ap')
  const tfoMortise = num(values, 'tfo-mortise')
  if (tfoAp !== undefined && tfoAp <= 6) out.push({ label: 'Overlap, AP', value: '6 mm or less: below the normal; it changes with rotation', tone: 'warn' })
  if (tfoMortise !== undefined) {
    if (tfoMortise === 0) out.push({ label: 'Overlap, mortise', value: 'None: absent overlap on one side may mean syndesmotic injury', tone: 'warn' })
    else if (tfoMortise <= 1) out.push({ label: 'Overlap, mortise', value: '1 mm or less: below the normal; it changes with rotation', tone: 'warn' })
  }
  return out
}

const WEBER_CHIP: Record<string, string> = {
  A: 'A: below the syndesmosis (AO 44A)',
  B: 'B: at the level of the syndesmosis (AO 44B)',
  C: 'C: above the syndesmosis (AO 44C)',
}

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  // AX4-1: Weber from the level.
  const weber = str(values, 'lateral') === 'present' ? str(values, 'weber') : ''
  if (WEBER_CHIP[weber]) out.push({ label: 'Weber', value: WEBER_CHIP[weber], tone: 'warn' })
  // AX4-3, AX2-3: an isolated Weber B.
  const mcs = num(values, 'mcs')
  if (isWeber(values, 'B') && !medialFracture(values) && !posteriorFracture(values) && str(values, 'mortise') !== 'dislocated' && (mcs === undefined || mcs <= 7)) {
    out.push({ label: 'Isolated Weber B', value: 'B1 and B2 look alike on these views: weight-bearing radiographs at 4–10 days decide (medial clear space up to 7 mm, not dislocated)' })
  }
  // AX4-4: trimalleolar.
  if (trimalleolar(values)) out.push({ label: 'Trimalleolar', value: 'Considered unstable; CT shows the posterior malleolus', tone: 'warn' })
  // AX4-5: the posterior fragment on the lateral view.
  if (posteriorFracture(values)) {
    out.push({ label: 'Posterior malleolus', value: 'The lateral view misjudges the fragment (54% of readings off by over 25%): CT', tone: 'warn' })
    const share = num(values, 'posterior-share')
    if (share !== undefined && share >= 25) out.push({ label: 'Over a quarter', value: 'The historical threshold for fixation, measured on a view that misjudges it' })
  }
  // AX4-6, AX4-7: Maisonneuve.
  if (lookUpFibula(values)) out.push({ label: 'Proximal fibula', value: 'Medial or syndesmotic injury without a distal fibular fracture, or a tender upper fibula: image the whole fibula (Maisonneuve)', tone: 'warn' })
  if (str(values, 'fibula') === 'fracture') out.push({ label: 'Maisonneuve', value: 'Proximal fibular fracture: the anterior and interosseous tibiofibular ligaments are torn; CT', tone: 'warn' })
  // AX4-9, AX4-10: the talus.
  if (str(values, 'dome') === 'lesion') out.push({ label: 'Osteochondral lesion', value: 'About half are not seen on radiographs; CT or MRI each rated 9', tone: 'warn' })
  if (str(values, 'lateral-process') === 'present') out.push({ label: 'Lateral process', value: 'CT is the imaging of choice', tone: 'warn' })
  else if (str(values, 'lateral-process') === 'none' && str(values, 'mechanism') === 'inversion-df') out.push({ label: 'Lateral process', value: 'Plain films are negative in up to 40%: CT if it is suspected', tone: 'warn' })
  // AX4-12: the fifth metatarsal zones, as on the fifth metatarsal page.
  const zone = str(values, 'fifth') === 'fracture' ? str(values, 'fifth-zone') : ''
  if (zone === '1') out.push({ label: 'Fifth metatarsal', value: 'Zone 1: tuberosity avulsion' })
  if (zone === '2') out.push({ label: 'Fifth metatarsal', value: 'Zone 2: Jones fracture', tone: 'warn' })
  if (zone === '3') out.push({ label: 'Fifth metatarsal', value: 'Zone 3: proximal diaphyseal stress fracture', tone: 'warn' })
  if (zone === 'distal') out.push({ label: 'Fifth metatarsal', value: 'Beyond zone 3: dancer\'s fracture' })
  if (str(values, 'fifth') === 'not-included' && ottawaHas(values, 'fifth-tender')) out.push({ label: 'Fifth metatarsal base', value: 'Not in view but tender: the Ottawa foot rule calls for a foot series', tone: 'warn' })
  // AX4-2: what is missed.
  if (str(values, 'lateral') === 'none') out.push({ label: 'Look again', value: 'Most often missed: Weber A (17%), talar (22%), navicular (40%), cuboid (33%) and fifth metatarsal (10.5%) fractures' })
  return out
}

function deriveSoftTissues(values: Values): Derived[] {
  const out: Derived[] = []
  const size = effusionSize(values)
  if (size === undefined) return out
  // AX5-1, AX5-2: the two thresholds.
  if (size >= 15) out.push({ label: 'Effusion', value: '15 mm or more: occult fracture in 83% (Clark 1996); 13 mm or more, 82% (Clark 1995)', tone: 'warn' })
  else if (size >= 13) out.push({ label: 'Effusion', value: '13 mm or more: occult fracture in 82% (Clark 1995); under Clark 1996\'s 15 mm', tone: 'warn' })
  else out.push({ label: 'Effusion', value: 'Under 13 mm: below both thresholds for an occult fracture' })
  if (size >= 13 && noFractureEntered(values)) out.push({ label: 'No fracture seen', value: 'Consider CT: occult fractures were often in the talus', tone: 'warn' })
  return out
}

/* Report lines. */

const MECHANISM_WORDS: Record<string, string> = {
  inversion: 'inversion injury',
  'inversion-df': 'inversion with the foot dorsiflexed',
  external: 'external rotation injury',
  high: 'high-energy injury',
}

function clinicalLine(values: Values): string {
  const side = str(values, 'side')
  const mechanism = str(values, 'mechanism')
  const reason = str(values, 'reason')
  const rules = join([
    ankleRuleMet(values) && 'Ottawa ankle rule met',
    footRuleMet(values) && 'Ottawa foot rule met',
  ], ' and ')
  const findings = reason === 'ottawa' ? chosen(values, fields.ottawa) : []
  const clinical = join([
    side && `${lowerFirst(side)} ankle`,
    MECHANISM_WORDS[mechanism],
    rules && `${rules}${findings.length > 0 ? ` (${findings.join('; ')})` : ''}`,
    !rules && findings.length > 0 && findings.join('; '),
    reason === 'excluded' && 'Ottawa rules cannot be applied',
    str(values, 'proximal-fibula') === 'tender' && 'proximal fibula tender',
  ], ', ')
  return clinical ? `Clinical: ${clinical}` : ''
}

function viewsLine(values: Values): string {
  const views = list(values, 'views').map((view) => lowerFirst(optionLabel(fields.views, view)))
  return views.length > 0 ? `Views: ${andList(views)}` : ''
}

function alignmentLines(values: Values): (string | false)[] {
  const mcs = num(values, 'mcs')
  const scs = num(values, 'scs')
  const other = num(values, 'mcs-other')
  const tfcs = num(values, 'tfcs')
  const tfoAp = num(values, 'tfo-ap')
  const tfoMortise = num(values, 'tfo-mortise')
  const view = str(values, 'mcs-view')
  const mcsText = mcs !== undefined && join([
    `medial clear space ${mcs} mm`,
    view && `on the ${picked(values, fields.mcsView).replace(/ \(.*\)$/, '')}`,
    scs !== undefined && `superior clear space ${scs} mm`,
    other !== undefined && `uninjured side ${other} mm`,
  ], ', ')
  const syndesmosis = join([
    tfcs !== undefined && `tibiofibular clear space ${tfcs} mm`,
    tfoAp !== undefined && `overlap ${tfoAp} mm on AP`,
    tfoMortise !== undefined && `overlap ${tfoMortise} mm on mortise`,
  ], ', ')
  return [
    str(values, 'mortise') && `Mortise: ${picked(values, fields.mortise)}`,
    mcsText && `Medial side: ${mcsText}`,
    syndesmosis && `Syndesmosis: ${syndesmosis}`,
  ]
}

function boneLines(values: Values): (string | false)[] {
  const weber = str(values, 'weber')
  const share = num(values, 'posterior-share')
  const noneLine = (id: string, label: string) => str(values, id) === 'none' && `${label}: no fracture`
  return [
    noneLine('lateral', 'Lateral malleolus'),
    str(values, 'lateral') === 'present' && `Lateral malleolus: fracture${weber ? `, ${picked(values, fields.weber)} (Weber ${weber})` : ''}`,
    noneLine('medial', 'Medial malleolus'),
    medialFracture(values) && 'Medial malleolus: fracture',
    noneLine('posterior', 'Posterior malleolus'),
    posteriorFracture(values) && `Posterior malleolus: fracture${share !== undefined ? `, about ${share}% of the articular surface on the lateral view` : ''}`,
    str(values, 'fibula') && `Proximal fibula: ${picked(values, fields.fibula)}`,
    str(values, 'dome') === 'normal' && 'Talar dome: normal',
    str(values, 'dome') === 'lesion' && `Talar dome: ${join([picked(values, fields.dome), str(values, 'dome-site') && str(values, 'dome-site') !== 'other' && picked(values, fields.domeSite)], ', ')}`,
    noneLine('lateral-process', 'Lateral process of the talus'),
    str(values, 'lateral-process') === 'present' && 'Lateral process of the talus: fracture',
    str(values, 'fifth') && `Base of the fifth metatarsal: ${join([picked(values, fields.fifth), str(values, 'fifth') === 'fracture' && picked(values, fields.fifthZone)], ', ')}`,
    str(values, 'other-fractures') && `Other fractures: ${str(values, 'other-fractures')}`,
  ]
}

function softTissueLine(values: Values): string {
  const size = effusionSize(values)
  const effusion = str(values, 'effusion')
  const swelling = str(values, 'swelling')
  const text = join([
    effusion === 'none' && 'no joint effusion',
    effusion === 'present' && `joint effusion${size !== undefined ? `, ${size} mm (anterior plus posterior capsular distension)` : ''}`,
    swelling === 'none' && 'no soft-tissue swelling',
    swelling && swelling !== 'none' && `soft-tissue swelling ${picked(values, fields.swelling)}`,
  ])
  return text ? `Soft tissues: ${text}` : ''
}

/* The impression. */

const ZONE_WORDS: Record<string, string> = {
  1: 'Fracture of the base of the fifth metatarsal, zone 1 (tuberosity avulsion).',
  2: 'Fracture of the base of the fifth metatarsal, zone 2 (Jones fracture, into the 4–5 intermetatarsal joint).',
  3: 'Fracture of the proximal shaft of the fifth metatarsal, zone 3 (proximal diaphysis).',
  distal: 'Fracture of the distal shaft of the fifth metatarsal, beyond zone 3.',
}

function malleolarSentence(values: Values): string {
  const side = str(values, 'side')
  const prefix = side ? `${side} ` : ''
  const weber = str(values, 'lateral') === 'present' ? str(values, 'weber') : ''
  const fibular = str(values, 'lateral') === 'present' ? (weber ? `Weber ${weber} fracture of the lateral malleolus` : 'fracture of the lateral malleolus') : ''
  if (trimalleolar(values)) return `${prefix}trimalleolar fracture: ${weber ? `Weber ${weber} fibular fracture` : 'lateral malleolus'}, medial and posterior malleoli.`
  const others = [medialFracture(values) && 'the medial malleolus', posteriorFracture(values) && 'the posterior malleolus'].filter((item): item is string => Boolean(item))
  if (fibular) return `${prefix}${fibular}${others.length > 0 ? `, with fracture of ${andList(others)}` : ''}.`
  if (others.length > 0) return `${prefix}fracture of ${andList(others)}.`
  return ''
}

function findings(values: Values): string[] {
  const out: string[] = []
  const malleolar = malleolarSentence(values)
  if (malleolar) out.push(upperFirst(malleolar))
  const mortise = str(values, 'mortise')
  if (mortise === 'dislocated') out.push('Ankle dislocation.')
  if (mortise === 'shift') out.push('Talar shift or tilt: the mortise is not congruent.')
  const mcs = num(values, 'mcs')
  // AX3-3, AX3-4
  if (medialWiderThanSuperior(values) || stressWidened(values)) out.push(`Medial clear space widened${mcs !== undefined ? ` (${mcs} mm)` : ''}, suggesting deltoid ligament injury.`)
  // AX3-1
  if (clearSpaceWidened(values)) out.push(`Tibiofibular clear space widened (${num(values, 'tfcs')} mm), suggesting syndesmotic injury.`)
  // AX4-5
  if (posteriorFracture(values)) out.push('CT is suggested to show the posterior malleolar fragment.')
  // AX4-7
  if (str(values, 'fibula') === 'fracture') out.push('Proximal fibular fracture: Maisonneuve injury. CT is suggested.')
  // AX4-6
  if (lookUpFibula(values)) out.push('Radiographs of the whole fibula are suggested to look for a Maisonneuve fracture.')
  // AX4-9
  if (str(values, 'dome') === 'lesion') {
    const site = str(values, 'dome-site')
    out.push(`Osteochondral lesion of the ${site === 'medial' || site === 'lateral' ? `${site} ` : ''}talar dome. Consider CT or MRI.`)
  }
  // AX4-10
  if (str(values, 'lateral-process') === 'present') out.push('Fracture of the lateral process of the talus. Consider CT.')
  // AX4-12
  const zone = str(values, 'fifth') === 'fracture' ? str(values, 'fifth-zone') : ''
  if (str(values, 'fifth') === 'fracture') out.push(ZONE_WORDS[zone] ?? 'Fracture of the base of the fifth metatarsal.')
  const otherFractures = str(values, 'other-fractures')
  if (otherFractures) out.push(`${upperFirst(otherFractures.replace(/\.$/, ''))}.`)
  // AX5-1, AX5-2
  const size = effusionSize(values)
  if (size !== undefined && size >= 13 && noFractureEntered(values)) out.push(`Large ankle effusion (${size} mm) with no fracture seen: an occult fracture is possible. Consider CT.`)
  return out
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || (Array.isArray(values[field.id]) ? list(values, field.id).length > 0 : str(values, field.id) !== '')))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function impression(values: Values): string {
  const found = findings(values)
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines('Findings as above.', ...negatives)}`
    if (!complete(values)) return ''
    return `Impression: ${lines('No fracture or malalignment seen.', ...negatives)}`
  }
  return `Impression: ${lines(...found, other && 'Other findings as above.', ...negatives)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = fracturesEntered(values)
  if (negatives.includes('no-fracture') && fractures.length > 0) out.push(`Impression says no fracture, but one is entered (${andList(fractures)}).`)
  const malaligned = ['shift', 'dislocated'].includes(str(values, 'mortise')) || medialWiderThanSuperior(values) || stressWidened(values) || clearSpaceWidened(values)
  if (negatives.includes('congruent') && malaligned) out.push('Impression says the mortise is congruent, but malalignment or widening is entered.')
  if (negatives.includes('no-effusion') && str(values, 'effusion') === 'present') out.push('Impression says no joint effusion, but an effusion is entered.')
  // AX4-1: Weber needs the level.
  if (str(values, 'lateral') === 'present' && !str(values, 'weber')) out.push('Lateral malleolar fracture without its level: Weber A, B or C needs it.')
  return out
}

function build(values: Values) {
  const text = lines(
    clinicalLine(values),
    viewsLine(values),
    ...alignmentLines(values),
    ...boneLines(values),
    softTissueLine(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

const steps: ReportStep[] = [
  {
    id: 'history',
    title: 'Step 1. Why the film: the injury and the Ottawa rules',
    learn: 'history',
    teach: (
      <>
        <p>An ankle series is needed if there is pain in the malleolar zone and bone tenderness at the posterior edge or tip of either malleolus (distal 6 cm), or inability to bear weight both immediately and in the emergency department; a foot series if there is midfoot pain and tenderness at the base of the fifth metatarsal or the navicular, or the same inability to bear weight ({BACHMANN}). The rules were derived ({STIELL_1992}) and validated with 100% sensitivity ({STIELL_1993}).</p>
        <p>Examine the proximal fibula in every ankle injury ({TAWEEL}).</p>
      </>
    ),
    fields: [fields.side, fields.mechanism, fields.reason, fields.ottawa, fields.proximalFibula],
    derive: deriveHistory,
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    learn: 'views',
    teach: <p>AP, mortise and lateral; a unilateral weight-bearing mortise judges displacement best ({DE_LAS_HERAS}). The tibiofibular clear space is the one measurement that does not change with rotation ({PNEUMATICOS}).</p>,
    fields: [fields.views],
    derive: deriveViews,
  },
  {
    id: 'alignment',
    title: 'Step 3. Mortise, clear spaces and the syndesmosis',
    learn: 'alignment',
    teach: (
      <>
        <p>Tibiofibular clear space under about 6 mm, overlap over about 6 mm on AP and 1 mm on mortise ({HARPER}). A medial clear space wider than the superior clear space points to a deltoid injury ({BEUMER}); 5 mm or more on a stress view ({PARK}); on weight-bearing views, under 5.0 mm and within 1.0 mm of the other side ({RYDBERG}).</p>
        {measurementTable}
      </>
    ),
    fields: [fields.mortise, fields.mcsView, fields.mcs, fields.scs, fields.mcsOther, fields.tfcs, fields.tfoAp, fields.tfoMortise],
    derive: deriveAlignment,
  },
  {
    id: 'bones',
    title: 'Step 4. Bones, fracture by fracture',
    learn: 'bones',
    teach: (
      <>
        <p>Weber A, B or C by the level of the fibular fracture against the syndesmosis ({FONSECA}). Posterior malleolus: the lateral view misjudges the fragment ({FERRIES}). No distal fibular fracture but medial or syndesmotic injury: look up the fibula ({WONG}). Lateral process: CT ({CHAN}).</p>
        <p>Fifth metatarsal zones as on the {fifthMetatarsalLink} ({LAWRENCE}; {CHLOROS}).</p>
      </>
    ),
    fields: [
      fields.lateral, fields.weber, fields.medial, fields.posterior, fields.posteriorShare, fields.fibula,
      fields.dome, fields.domeSite, fields.lateralProcess, fields.fifth, fields.fifthZone, fields.otherFractures,
    ],
    derive: deriveBones,
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Soft tissues',
    learn: 'soft-tissues',
    teach: <p>On the lateral view, an effusion of 13 mm or more (anterior plus posterior distension) predicted an occult fracture in 82% ({CLARK_1995}); 15 mm or more in 83% ({CLARK_1996}).</p>,
    fields: [fields.effusion, fields.effusionSize, fields.swelling],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    learn: 'impression',
    teach: <p>Name the Weber type, the other malleoli, the mortise and clear spaces, then the talus and fifth metatarsal. CT lines appear only where a source supports them ({PFLUGER}; {BARTONICEK}; {CHAN}; {ACR}; {CLARK_1996}).</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'ankle-xray',
  name: 'Ankle X-ray for injury',
  lede: 'Read an adult\'s ankle radiographs after injury: the Ottawa rules as the reason for the film, the mortise and clear spaces, Weber A, B or C, the posterior malleolus, Maisonneuve, the talus, the base of the fifth metatarsal, the effusion, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'ottawa',
      question: 'Under the Ottawa ankle rules, which finding with malleolar pain calls for an ankle series?',
      options: ['Swelling over the lateral malleolus', 'Bone tenderness at the posterior edge or tip of the lateral malleolus', 'Age over 40', 'Bruising on the dorsum of the foot'],
      answer: 1,
      explanation: <p>Bone tenderness along the distal 6 cm of the posterior edge or tip of either malleolus, or inability to bear weight both immediately and in the emergency department ({BACHMANN}). The refined rules were 100% sensitive in validation ({STIELL_1993}).</p>,
    },
    {
      id: 'foot-rule',
      question: 'Midfoot pain with tenderness at which site meets the Ottawa foot rule?',
      options: ['Base of the fifth metatarsal', 'Head of the first metatarsal', 'Achilles insertion', 'Sinus tarsi'],
      answer: 0,
      explanation: <p>The base of the fifth metatarsal or the navicular, or inability to bear weight ({BACHMANN}).</p>,
    },
    {
      id: 'weber',
      question: 'The fibular fracture line lies at the level of the syndesmosis. What is the Weber type?',
      options: ['A', 'B', 'C', 'It depends on the medial malleolus'],
      answer: 1,
      explanation: <p>Type A lies below the syndesmosis, B at its level and C above it; the classification looks only at the fibula ({FONSECA}; {RYDBERG}).</p>,
    },
    {
      id: 'tfcs',
      question: 'Which measurement of the syndesmosis did not change with rotation of the leg in Pneumaticos\'s study?',
      options: ['Tibiofibular overlap on the AP view', 'Medial clear space', 'Tibiofibular clear space', 'Tibiofibular overlap on the mortise view'],
      answer: 2,
      explanation: <p>The tibiofibular clear space averaged 3.9 mm and did not change significantly with rotation; the others changed markedly ({PNEUMATICOS}). Harper and Keller's normal is under about 6 mm ({HARPER}).</p>,
    },
    {
      id: 'mcs',
      question: 'On the mortise view the medial clear space is wider than the superior clear space. What does Beumer take it to mean?',
      options: ['A normal variant', 'Deltoid ligament injury', 'An osteochondral lesion', 'Nothing without a CT'],
      answer: 1,
      explanation: <p>In Beumer's normal ankles the medial clear space was never wider than the superior clear space; wider points to a deltoid injury ({BEUMER}).</p>,
    },
    {
      id: 'stress',
      question: 'On a dorsiflexion-external rotation stress view after a Weber B fracture, which medial clear space best predicted deep deltoid disruption in Park\'s study?',
      options: ['2 mm or more', '4 mm or more', '5 mm or more', '8 mm or more'],
      answer: 2,
      explanation: <p>5 mm or more was the most reliable; 4 mm was less specific and 6 mm less sensitive ({PARK}).</p>,
    },
    {
      id: 'maisonneuve',
      question: 'There is a medial malleolar fracture and a widened tibiofibular clear space, with no fracture of the distal fibula. What next?',
      options: ['Report a stable isolated medial malleolar fracture', 'Image the whole fibula for a Maisonneuve fracture', 'Repeat the ankle series in six weeks', 'Nothing: the fibula is intact'],
      answer: 1,
      explanation: <p>Tibiofibular widening or talar displacement without a distal fibular fracture should raise a Maisonneuve fracture, with full-length radiographs ({WONG}); a medial malleolar fracture without a visible distal fibular fracture is another reason ({ZIEGLER}).</p>,
    },
    {
      id: 'posterior',
      question: 'How reliable is the lateral radiograph for the size of a posterior malleolar fragment?',
      options: ['Accurate to within 5%', 'Unreliable: 54% of readings were off by more than 25% against CT', 'It always underestimates by half', 'Accurate only for small fragments'],
      answer: 1,
      explanation: <p>Plain radiograph readings mostly overestimated the fragment, and larger fragments had more error ({FERRIES}); CT-based classifications are now used ({PFLUGER}).</p>,
    },
    {
      id: 'lateral-process',
      question: 'A snowboarder has lateral ankle pain after inversion with dorsiflexion, and the radiographs look normal. What is the concern?',
      options: ['A Weber C fracture', 'A fracture of the lateral process of the talus', 'A Jones fracture', 'A syndesmotic sprain only'],
      answer: 1,
      explanation: <p>Plain films are negative in up to 40%, and CT is the imaging of choice ({CHAN}); these fractures can be radiographically occult ({MELENEVSKY}).</p>,
    },
    {
      id: 'effusion',
      question: 'The radiographs show no fracture but a 16 mm ankle effusion. What did Clark find?',
      options: ['Effusions are meaningless after trauma', 'An effusion of 15 mm or more had an 83% positive predictive value for an occult fracture', 'Effusions mean ligament tears only', 'Only effusions over 30 mm matter'],
      answer: 1,
      explanation: <p>15 mm or more had a positive predictive value of 83% on CT ({CLARK_1996}); in the earlier series 13 mm or more had 82% ({CLARK_1995}).</p>,
    },
    {
      id: 'fifth',
      question: 'A fracture at the base of the fifth metatarsal runs into the 4–5 intermetatarsal joint. Which zone is it?',
      options: ['Zone 1', 'Zone 2', 'Zone 3', 'Beyond zone 3'],
      answer: 1,
      explanation: <p>Zone 2, the Jones fracture, at the metaphyseal-diaphyseal junction running into the 4–5 joint; zone 1 is the tuberosity and zone 3 the proximal shaft just beyond the joint ({CHLOROS}; {LAWRENCE}).</p>,
    },
    {
      id: 'missed',
      question: 'In York\'s 2947 emergency ankle radiographs, which lateral malleolar fracture was missed most often at first reading?',
      options: ['Weber A', 'Weber B', 'Weber C', 'None were missed'],
      answer: 0,
      explanation: <p>Weber A in 17.0%, against 9.8% of Weber C and 2.5% of Weber B ({YORK}).</p>,
    },
  ],
}

export function AnkleXrayStudyPage() {
  return <StudyPage study={study} />
}
