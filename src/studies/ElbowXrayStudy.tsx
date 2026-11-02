import { Link } from 'react-router-dom'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { brobergMorrey, brobergMorreySentence, mason, masonDescriptions, masonSentence } from '../logic/mason'
import type { MasonPattern, MasonResult, MasonType } from '../logic/mason'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract or an open full text (Swensen,
 * van der Windt, Iannuzzi, Wiegand, Goldfarb, Calderazzi, Barco and Dey Hazra in full) before it
 * went in. The claims table is docs/superpowers/research/2026-11-01-elbow-xray-sources.md (EX
 * claims); rule chips and warnings carry its claim IDs. The radial head uses the Mason calculator's
 * logic (src/logic/mason.ts) and its citations, so the two never disagree. The fat pad mechanism is
 * the paediatric elbow study's sourced statement (Iyer), which holds for adults too; children's
 * lines and ossification belong to that study, which this one links to. Johnston (1962) has no DOI,
 * so its citation stays plain text, as on the calculator.
 */

const APPELBOAM_DOI = '10.1136/bmj.a2428'
const BREDA_DOI = '10.5397/cise.2022.00948'
const ACAR_DOI = '10.1016/j.jemermed.2015.03.009'
const AFACAN_DOI = '10.7717/peerj.18922'
const SWENSEN_DOI = '10.1186/s10195-019-0523-5'
const WIEGAND_DOI = '10.1007/s11999-012-2393-5'
const BARCO_DOI = '10.1016/j.jseint.2023.03.019'
const GREENSPAN_DOI = '10.2214/ajr.143.2.355'
const MANNS_DOI = '10.1016/s0009-9260(05)80901-8'
const GOLDFARB_DOI = '10.1016/j.jse.2011.10.026'
const SANDMAN_DOI = '10.5312/wjo.v7.i2.117'
const ROULEAU_DOI = '10.1016/j.jse.2011.03.017'
const COONRAD_DOI = '10.1016/j.jse.2004.09.002'
const MATHUR_DOI = '10.1007/s10140-020-01763-8'
const RING_2013_DOI = '10.1016/j.ocl.2012.08.007'
const RING_1998_DOI = '10.2106/00004623-199812000-00003'
const CALDERAZZI_DOI = '10.1016/j.amsu.2018.09.027'
const GARG_DOI = '10.1016/j.hcl.2020.07.006'
const RETTIG_DOI = '10.1053/jhsu.2001.21523'
const MASON_DOI = '10.1002/bjs.18004217203'
const BROBERG_DOI = '10.1097/00003086-198703000-00017'
const IANNUZZI_DOI = '10.1007/s11999-012-2319-2'
const VAN_DER_WINDT_DOI = '10.1530/EOR-24-0035'
const REGAN_DOI = '10.2106/00004623-198971090-00011'
const RING_2002_DOI = '10.2106/00004623-200204000-00006'
const MCKEE_DOI = '10.2106/00004623-199601000-00007'
const ROBINSON_DOI = '10.1097/00005131-200301000-00006'
const DEY_HAZRA_DOI = '10.1007/s11678-018-0442-8'
const IYER_DOI = '10.2214/AJR.10.7314'
const ODWYER_DOI = '10.1097/00004728-200407000-00021'
const MAJOR_DOI = '10.2214/ajr.178.2.1780413'
const PAVIC_DOI = '10.1016/j.injury.2015.10.050'
const IRSHAD_DOI = '10.1016/s0020-1383(97)00045-4'
const HUSSEIN_DOI = '10.1007/s10140-023-02163-4'

const APPELBOAM = <Cite doi={APPELBOAM_DOI}>Appelboam et al., BMJ 2008</Cite>
const BREDA = <Cite doi={BREDA_DOI}>Breda et al., Clin Shoulder Elb 2023</Cite>
const ACAR = <Cite doi={ACAR_DOI}>Acar et al., J Emerg Med 2016</Cite>
const AFACAN = <Cite doi={AFACAN_DOI}>Afacan et al., PeerJ 2025</Cite>
const SWENSEN = <Cite doi={SWENSEN_DOI}>Swensen et al., J Orthop Traumatol 2019</Cite>
const WIEGAND = <Cite doi={WIEGAND_DOI}>Wiegand et al., Clin Orthop Relat Res 2012</Cite>
const BARCO = <Cite doi={BARCO_DOI}>Barco et al., JSES Int 2023</Cite>
const GREENSPAN = <Cite doi={GREENSPAN_DOI}>Greenspan et al., AJR 1984</Cite>
const MANNS = <Cite doi={MANNS_DOI}>Manns and Lee, Clin Radiol 1990</Cite>
const GOLDFARB = <Cite doi={GOLDFARB_DOI}>Goldfarb et al., J Shoulder Elbow Surg 2012</Cite>
const SANDMAN = <Cite doi={SANDMAN_DOI}>Sandman et al., World J Orthop 2016</Cite>
const ROULEAU = <Cite doi={ROULEAU_DOI}>Rouleau et al., J Shoulder Elbow Surg 2012</Cite>
const COONRAD = <Cite doi={COONRAD_DOI}>Coonrad et al., J Shoulder Elbow Surg 2005</Cite>
const MATHUR = <Cite doi={MATHUR_DOI}>Mathur and Lau, Emerg Radiol 2020</Cite>
const RING_2013 = <Cite doi={RING_2013_DOI}>Ring, Orthop Clin North Am 2013</Cite>
const RING_1998 = <Cite doi={RING_1998_DOI}>Ring et al., J Bone Joint Surg Am 1998</Cite>
const CALDERAZZI = <Cite doi={CALDERAZZI_DOI}>Calderazzi et al., Ann Med Surg 2018</Cite>
const GARG = <Cite doi={GARG_DOI}>Garg and Mudgal, Hand Clin 2020</Cite>
const RETTIG = <Cite doi={RETTIG_DOI}>Rettig and Raskin, J Hand Surg Am 2001</Cite>
const MASON = <Cite doi={MASON_DOI}>Mason, Br J Surg 1954</Cite>
const JOHNSTON = 'Johnston, Ulster Med J 1962'
const BROBERG = <Cite doi={BROBERG_DOI}>Broberg and Morrey, Clin Orthop Relat Res 1987</Cite>
const IANNUZZI = <Cite doi={IANNUZZI_DOI}>Iannuzzi and Leopold, Clin Orthop Relat Res 2012</Cite>
const VAN_DER_WINDT = <Cite doi={VAN_DER_WINDT_DOI}>van der Windt et al., EFORT Open Rev 2024</Cite>
const REGAN = <Cite doi={REGAN_DOI}>Regan and Morrey, J Bone Joint Surg Am 1989</Cite>
const RING_2002 = <Cite doi={RING_2002_DOI}>Ring et al., J Bone Joint Surg Am 2002</Cite>
const MCKEE = <Cite doi={MCKEE_DOI}>McKee et al., J Bone Joint Surg Am 1996</Cite>
const ROBINSON = <Cite doi={ROBINSON_DOI}>Robinson et al., J Orthop Trauma 2003</Cite>
const DEY_HAZRA = <Cite doi={DEY_HAZRA_DOI}>Dey Hazra et al., Obere Extrem 2018</Cite>
const IYER = <Cite doi={IYER_DOI}>Iyer et al., AJR 2012</Cite>
const ODWYER = <Cite doi={ODWYER_DOI}>O'Dwyer et al., J Comput Assist Tomogr 2004</Cite>
const MAJOR = <Cite doi={MAJOR_DOI}>Major and Crawford, AJR 2002</Cite>
const PAVIC = <Cite doi={PAVIC_DOI}>Pavić et al., Injury 2015</Cite>
const IRSHAD = <Cite doi={IRSHAD_DOI}>Irshad et al., Injury 1997</Cite>
const HUSSEIN = <Cite doi={HUSSEIN_DOI}>Hussein et al., Emerg Radiol 2023</Cite>

const references: LessonReference[] = [
  { citation: 'Appelboam A, Reuben AD, Benger JR, Beech F, Dutson J, Haig S, Higginson I, Klein JA, Le Roux S, Saranga SS, Taylor R, Vickery J, Powell RJ, Lloyd G. Elbow extension test to rule out elbow fracture: multicentre, prospective validation and observational study of diagnostic accuracy in adults and children. BMJ. 2008;337:a2428.', doi: APPELBOAM_DOI },
  { citation: 'Breda G, De Marco G, Cesaraccio P, Pillastrini P. Diagnostic accuracy of clinical tests to rule out elbow fracture: a systematic review. Clin Shoulder Elb. 2023;26(2):182-190.', doi: BREDA_DOI },
  { citation: 'Acar K, Aksay E, Oray D, Imamoğlu T, Gunay E. Utility of computed tomography in elbow trauma patients with normal x-ray study and positive elbow extension test. J Emerg Med. 2016;50(3):444-448.', doi: ACAR_DOI },
  { citation: 'Afacan MA, Kilic KK, Temiz A, Tayfur İ, Doganay F. Diagnostic accuracy of fat pad sign, X-ray, and computed tomography in elbow trauma: implications for treatment choices—a retrospective study. PeerJ. 2025;13:e18922.', doi: AFACAN_DOI },
  { citation: 'Swensen SJ, Tyagi V, Uquillas C, Shakked RJ, Yoon RS, Liporace FA. Maximizing outcomes in the treatment of radial head fractures. J Orthop Traumatol. 2019;20(1):15.', doi: SWENSEN_DOI },
  { citation: 'Wiegand L, Bernstein J, Ahn J. Fractures in brief: olecranon fractures. Clin Orthop Relat Res. 2012;470(12):3637-3641.', doi: WIEGAND_DOI },
  { citation: 'Barco R, Gonzalez-Escobar S, Acerboni-Flores F, Vaquero-Picado A. Acute elbow dislocation: a critical appraisal of the literature. JSES Int. 2023;7(6):2560-2564.', doi: BARCO_DOI },
  { citation: 'Greenspan A, Norman A, Rosen H. Radial head-capitellum view in elbow trauma: clinical application and radiographic-anatomic correlation. AJR Am J Roentgenol. 1984;143(2):355-359.', doi: GREENSPAN_DOI },
  { citation: 'Manns RA, Lee JR. Critical evaluation of the radial head-capitellum view in acute elbow with an effusion. Clin Radiol. 1990;42(6):433-436.', doi: MANNS_DOI },
  { citation: 'Goldfarb CA, Patterson JM, Sutter M, Krauss M, Steffen JA, Galatz L. Elbow radiographic anatomy: measurement techniques and normative data. J Shoulder Elbow Surg. 2012;21(9):1236-1246.', doi: GOLDFARB_DOI },
  { citation: 'Sandman E, Canet F, Petit Y, Laflamme GY, Athwal GS, Rouleau DM. Effect of elbow position on radiographic measurements of radio-capitellar alignment. World J Orthop. 2016;7(2):117-122.', doi: SANDMAN_DOI },
  { citation: 'Rouleau DM, Sandman E, Canet F, Djahangiri A, Laflamme Y, Athwal GS, Petit Y. Radial head translation measurement in healthy individuals: the radiocapitellar ratio. J Shoulder Elbow Surg. 2012;21(5):574-579.', doi: ROULEAU_DOI },
  { citation: 'Coonrad RW, Roush TF, Major NM, Basamania CJ. The drop sign, a radiographic warning sign of elbow instability. J Shoulder Elbow Surg. 2005;14(3):312-317.', doi: COONRAD_DOI },
  { citation: 'Mathur N, Lau KK. Monteggia fracture: an easy fracture to miss. Emerg Radiol. 2020;27(4):377-381.', doi: MATHUR_DOI },
  { citation: 'Ring D. Monteggia fractures. Orthop Clin North Am. 2013;44(1):59-66.', doi: RING_2013_DOI },
  { citation: 'Ring D, Jupiter JB, Simpson NS. Monteggia fractures in adults. J Bone Joint Surg Am. 1998;80(12):1733-1744.', doi: RING_1998_DOI },
  { citation: 'Calderazzi F, Galavotti C, Nosenzo A, Menozzi M, Ceccarelli F. How to approach Monteggia-like lesions in adults: a review. Ann Med Surg (Lond). 2018;35:108-116.', doi: CALDERAZZI_DOI },
  { citation: 'Garg R, Mudgal C. Galeazzi injuries. Hand Clin. 2020;36(4):455-462.', doi: GARG_DOI },
  { citation: 'Rettig ME, Raskin KB. Galeazzi fracture-dislocation: a new treatment-oriented classification. J Hand Surg Am. 2001;26(2):228-235.', doi: RETTIG_DOI },
  { citation: 'Mason ML. Some observations on fractures of the head of the radius with a review of one hundred cases. Br J Surg. 1954;42(172):123-132.', doi: MASON_DOI },
  { citation: 'Johnston GW. A follow-up of one hundred cases of fracture of the head of the radius with a review of the literature. Ulster Med J. 1962;31(1):51-56.' },
  { citation: 'Broberg MA, Morrey BF. Results of treatment of fracture-dislocations of the elbow. Clin Orthop Relat Res. 1987;(216):109-119.', doi: BROBERG_DOI },
  { citation: 'Iannuzzi NP, Leopold SS. In brief: the Mason classification of radial head fractures. Clin Orthop Relat Res. 2012;470(6):1799-1802.', doi: IANNUZZI_DOI },
  { citation: 'van der Windt AE, Langenberg LC, Colaris JW, Eygendaal D. Which radial head fractures are best treated surgically? EFORT Open Rev. 2024;9(5):413-421.', doi: VAN_DER_WINDT_DOI },
  { citation: 'Regan W, Morrey B. Fractures of the coronoid process of the ulna. J Bone Joint Surg Am. 1989;71(9):1348-1354.', doi: REGAN_DOI },
  { citation: 'Ring D, Jupiter JB, Zilberfarb J. Posterior dislocation of the elbow with fractures of the radial head and coronoid. J Bone Joint Surg Am. 2002;84(4):547-551.', doi: RING_2002_DOI },
  { citation: 'McKee MD, Jupiter JB, Bamberger HB. Coronal shear fractures of the distal end of the humerus. J Bone Joint Surg Am. 1996;78(1):49-54.', doi: MCKEE_DOI },
  { citation: 'Robinson CM, Hill RM, Jacobs N, Dall G, Court-Brown CM. Adult distal humeral metaphyseal fractures: epidemiology and results of treatment. J Orthop Trauma. 2003;17(1):38-47.', doi: ROBINSON_DOI },
  { citation: 'Dey Hazra RO, Lill H, Jensen G, Imrecke J, Ellwein A. Fracture-pattern-related therapy concepts in distal humeral fractures. Obere Extrem. 2018;13(1):23-32.', doi: DEY_HAZRA_DOI },
  { citation: 'Iyer RS, Thapa MM, Khanna PC, Chew FS. Pediatric bone imaging: imaging elbow trauma in children—a review of acute and chronic injuries. AJR Am J Roentgenol. 2012;198(5):1053-1068.', doi: IYER_DOI },
  { citation: "O'Dwyer H, O'Sullivan P, Fitzgerald D, Lee MJ, McGrath F, Logan PM. The fat pad sign following elbow trauma in adults: its usefulness and reliability in suspecting occult fracture. J Comput Assist Tomogr. 2004;28(4):562-565.", doi: ODWYER_DOI },
  { citation: 'Major NM, Crawford ST. Elbow effusions in trauma in adults and children: is there an occult fracture? AJR Am J Roentgenol. 2002;178(2):413-418.', doi: MAJOR_DOI },
  { citation: 'Pavić R, Margetić P, Hnatešen D. Diagnosis of occult radial head and neck fracture in adults. Injury. 2015;46 Suppl 6:S119-S124.', doi: PAVIC_DOI },
  { citation: 'Irshad F, Shaw NJ, Gregory RJ. Reliability of fat-pad sign in radial head/neck fractures of the elbow. Injury. 1997;28(7):433-435.', doi: IRSHAD_DOI },
  { citation: 'Hussein M, Jenko N, Mittal AK, Raniga S, Iyengar KP, Djearaman M, Botchu R. Validation of the supinator fat pad sign in radial head and neck fractures. Emerg Radiol. 2023;30(5):613-619.', doi: HUSSEIN_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence ("A true lateral" too), leaving acronyms (AP, AO/OTA) alone. */
const lowerFirst = (text: string) => (/^([A-Z][a-z]|A )/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/* Tables shared by the Learn tab and the "Why and how" panels. */

/* EX4-1, EX4-2: the Mason types, worded as the Mason calculator words them. */
const masonTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Radial head fracture</th>
          <th>From</th>
        </tr>
      </thead>
      <tbody>
        {(['I', 'II', 'III', 'IV'] as MasonType[]).map((type) => (
          <tr key={type}>
            <td className="vessel-name">{type}</td>
            <td>{upperFirst(masonDescriptions[type])}</td>
            <td>{type === 'IV' ? 'Johnston' : 'Mason'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* EX4-6 (Regan and Morrey), EX4-9 (Mayo, as Wiegand gives it), EX4-10 (AO/OTA, as Dey Hazra gives it), EX4-13 (Bado, as Calderazzi gives it). */
const gradingTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Fracture</th>
          <th>Grading used here</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Radial head</td><td>Mason I undisplaced; II displaced marginal sector; III comminuted, whole head; IV with a dislocation (Johnston). Broberg-Morrey: type II needs 2 mm or more and 30% or more of the articular surface</td></tr>
        <tr><td className="vessel-name">Coronoid</td><td>Regan-Morrey I tip avulsion; II fragment of 50% or less; III more than 50%</td></tr>
        <tr><td className="vessel-name">Olecranon</td><td>Mayo I undisplaced; II displaced, elbow stable; III displaced, elbow unstable</td></tr>
        <tr><td className="vessel-name">Distal humerus</td><td>AO/OTA A extra-articular; B partial articular (B3 coronal shear); C complete articular</td></tr>
        <tr><td className="vessel-name">Monteggia</td><td>Bado I radial head anterior; II posterior; III lateral or anterolateral; IV anterior, with both bones broken at the same level</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'history',
    title: 'Step 1. The injury and why the film',
    body: (
      <>
        <p>This lesson is for an adult's elbow radiographs after an injury. A child's elbow, read by its ossification centres, has its own study: <Link to="/studies/pediatric-elbow">paediatric elbow radiographs</Link>. The order of the search, and the checklists, are this site's own.</p>
        <p>The decision rule is the elbow extension test. In Appelboam and colleagues' validation in 1740 adults and children, the test was 96.8% sensitive and 48.5% specific for a fracture, and full extension had a negative predictive value of 98.4% in adults. Patients who cannot fully extend the elbow after an injury have a nearly 50% chance of a fracture and should have radiographs. For those who can, radiography can be deferred if an olecranon fracture is not suspected: of the 602 who could fully extend, 17 had a fracture, and two adults with olecranon fractures needed a change in treatment ({APPELBOAM}). A systematic review found the clinical tests very sensitive in adults, up to 98.6%, with specificity that varied from 24.0% to 69.4% ({BREDA}).</p>
        <p>The mechanism points to the injury. Most radial head fractures follow a fall onto an outstretched hand, the radial head striking the capitellum ({SWENSEN}), typically with the forearm pronated ({VAN_DER_WINDT}). A fall on an outstretched hand is also the commonest cause of an elbow dislocation, and the elbow is the second most dislocated joint in adults ({BARCO}). Olecranon fractures follow a direct blow to the proximal ulna, or a fall onto an outstretched hand through the pull of the triceps ({WIEGAND}).</p>
        <p>Look beyond the elbow when the history asks for it. Radial head fractures come with other injuries, among them a rupture of the forearm's interosseous ligament (the Essex-Lopresti injury), and about 10% of patients have an injury away from the elbow, such as a fracture of the hand, wrist or scaphoid. The distal radioulnar joint is examined, and other joints imaged as the clinical picture warrants ({SWENSEN}).</p>
      </>
    ),
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    body: (
      <>
        <p>Check for an AP and a true lateral. Isolated olecranon fractures are seen on standard AP and lateral radiographs, and a true lateral is essential to judge the extent of a fracture, its displacement and comminution, and how much of the joint surface it involves ({WIEGAND}). In Goldfarb and colleagues' normal elbows the AP was taken in full extension with the forearm supinated, and the lateral at 90° with the forearm in neutral ({GOLDFARB}). Radiocapitellar alignment changes with the elbow's position, and its normal range was set at 90° of flexion ({SANDMAN}).</p>
        <p>The radial head-capitellum (Greenspan) view is taken with the forearm in neutral and the beam centred on the radiocapitellar joint, and shows the radial head clear of the coronoid ({SWENSEN}). The papers disagree on its worth. Greenspan and colleagues found that in 10 of 50 patients the standard views were negative or did not show the whole fracture while this view showed it, and in a specimen fractures of the posterior half of the radial head were hard to see on the standard lateral; they recommended it after every elbow injury ({GREENSPAN}). In 125 patients with an effusion, Manns and Lee found that it showed a radial head fracture the standard views had not in one patient, and failed to confirm 8 that the standard views showed; they judged its routine use unhelpful and potentially misleading ({MANNS}). This report records whether it was taken, without asking for it.</p>
        <p>Radiographs miss fractures. In 183 patients who had both radiographs and CT, radiographs were 46.9% sensitive for the fractures CT showed, and 60.2% when a fat pad sign was counted as a fracture; the authors advise considering CT when the suspicion of a fracture is high ({AFACAN}). In patients who could not fully extend the elbow and had no fracture on radiographs, CT found one in 5 of 39 (12.8%): two radial head, two olecranon and one coronoid fracture ({ACAR}).</p>
        <p>With a Monteggia-like injury, the films should include the whole forearm and the wrist, and the films taken after the reduction of a dislocation should be read too ({CALDERAZZI}).</p>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and the joint',
    body: (
      <>
        <h4>Anterior humeral line</h4>
        <p>On the lateral, draw a line along the anterior surface of the distal humerus and see where it meets the capitellum. It is used to judge the sagittal alignment of the distal humerus when it is fractured. In Goldfarb and colleagues' 178 normal elbows of adolescents and young adults, 80% met the middle third of the capitellum and almost all the others its posterior part; agreement between readers was only fair (κ 0.36) ({GOLDFARB}). The site's rule: a line through the middle or the posterior third is within that normal range; through the anterior third, or missing the capitellum, it is not, so check the distal humerus. The line in young children, and its ages, are in the paediatric study.</p>
        <h4>Radiocapitellar line</h4>
        <p>Draw a line along the middle of the radial neck on the lateral: earlier reports put the normal line through the central third of the capitellum, and between readers it was the least reliable of Goldfarb's measures (κ 0.14) ({GOLDFARB}). A measured version is the radiocapitellar ratio: the distance from the radial head's bisector to the centre of the capitellum, divided by the capitellum's diameter, positive when the head is anterior. In 40 healthy elbows it was 4% ± 4%, and a ratio outside −5% (1 mm posterior) to 13% (3 mm anterior), in a 25 mm capitellum, suggests radiocapitellar malalignment ({ROULEAU}). The ratio changes with the elbow's position; the normal range was set at 90° of flexion, and a value outside it in any position should raise the suspicion of instability ({SANDMAN}).</p>
        <p>A line that misses the capitellum raises the suspicion of a subluxed or dislocated radial head: then look at the ulna. Monteggia described a fracture of the proximal third of the ulna with anterior dislocation of the radial head ({RING_2013}). It is easily missed: in 47 patients aged 3 to 70, radiologists missed it in 25.5% and the clinicians at the bedside in 14.9%, most often the radial head dislocation or subluxation, then a subtle ulnar fracture or plastic deformity, and attention to the radiocapitellar alignment and the ulna is the remedy ({MATHUR}).</p>
        <h4>The ulnohumeral joint</h4>
        <p>Check that the ulnohumeral joint is congruent. After a dislocation is reduced, an increased ulnohumeral distance on the routine unstressed lateral, which Coonrad and colleagues called the drop sign, may warn of instability when it persists after the first reduction film ({COONRAD}). After a dislocation, standard radiographs may also show small avulsions (under 2 mm), impaction of the posterior capitellum (the Osborne-Cotterill lesion) or ulnohumeral subluxation ({BARCO}).</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 4. The bones, fracture by fracture',
    body: (
      <>
        <p>Elbow fractures are about 5% of all fractures, and radial head fractures about a third of them ({SWENSEN}). This site reads the radial head, the coronoid, the olecranon, the distal humerus and then the forearm.</p>
        <h4>Radial head: Mason</h4>
        <p>Mason sorted radial head fractures into three types: an undisplaced fissure or marginal fracture, a displaced marginal sector fracture, and a comminuted fracture of the whole head ({MASON}; {IANNUZZI}). Johnston added a fourth, a radial head fracture with dislocation of the elbow ({JOHNSTON}; {IANNUZZI}). Say "Mason type IV (Johnston)" when you use it. The <Link to="/mason">Mason calculator</Link> applies the same rules, from the same code.</p>
        {masonTable}
        <p>Under the Broberg-Morrey modification, a partial fracture counts as displaced, type II, only when it is displaced at least 2 mm and involves at least 30% of the articular surface; anything less is type I, so a smaller fragment is type I under this scheme even when it is displaced 2 mm or more ({BROBERG}; {VAN_DER_WINDT}). Not every version has the size requirement: in the Hotchkiss modification, type II is displaced 2 mm or more or blocks forearm rotation ({SWENSEN}). So name the modification when you use the numbers.</p>
        <p>Associated injuries rise with the severity, from 20% of undisplaced to 80% of comminuted fractures ({SWENSEN}). The coronoid is the commonest associated fracture, and a CT is needed in every type II fracture to show the displacement, the number and position of the fragments, and any associated fracture ({VAN_DER_WINDT}).</p>
        <h4>Coronoid: Regan and Morrey</h4>
        <p>Regan and Morrey typed coronoid fractures by the size of the fragment: type I an avulsion of the tip, type II a fragment of 50% of the coronoid or less, type III more than 50%. A dislocation or another fracture came with 14%, 56% and 80% of them ({REGAN}).</p>
        <h4>Dislocation and the terrible triad</h4>
        <p>A simple dislocation is one of soft tissue alone, apart from avulsion fractures ({BARCO}). Posterior dislocation of the elbow with fractures of both the radial head and the coronoid is called the terrible triad. These fracture-dislocations are very unstable and prone to complications, so finding the coronoid fracture matters, and CT should be used if there is doubt ({RING_2002}).</p>
        <h4>Olecranon</h4>
        <p>Olecranon fractures are about 10% of the upper-limb fractures of adults, and every one is intra-articular. Look for a coronoid fracture, a dislocation and a radial head injury with them. The Mayo classification goes by displacement and the stability of the ulnohumeral joint: type I undisplaced, type II displaced and stable, type III displaced and unstable ({WIEGAND}).</p>
        <h4>Distal humerus</h4>
        <p>Distal humeral fractures in adults came at 5.7 per 100,000 a year, with two peaks of age; most were extra-articular (AO/OTA type A) or complete articular (type C) ({ROBINSON}). The AO types are extra-articular (A), partial articular (B) and complete articular (C); a coronal shear fracture of the capitellum, the trochlea or both is type B3. Most are diagnosed on radiographs, and three-dimensional CT is recommended for further evaluation, especially of comminuted or complex fractures ({DEY_HAZRA}).</p>
        <p>In a coronal shear fracture the capitellum and part of the trochlea are displaced forwards and upwards. On the lateral, the subchondral bone of the displaced capitellum and of the lateral trochlear ridge makes two arcs: McKee and colleagues' double-arc sign ({MCKEE}).</p>
        <h4>The forearm: Monteggia and Galeazzi</h4>
        <p>Bado classified Monteggia injuries by the direction of the dislocated radial head: anterior (type I), posterior (II) and lateral or anterolateral (III); in type IV the radius and ulna are both broken at the same level proximally, with the radial head dislocated anteriorly ({CALDERAZZI}). In adults the posterior type is the commonest: 38 of Ring and colleagues' 48, and 26 of those 38 also had a radial head fracture ({RING_1998}).</p>
        <p>A fracture of the radial shaft with disruption of the distal radioulnar joint is a Galeazzi fracture ({GARG}). In Rettig and Raskin's series, fractures in the distal third, within 7.5 cm of the joint surface of the distal radius, were the ones that went with an unstable distal radioulnar joint (12 of 22, against 1 of 18 further up) ({RETTIG}). So a radial shaft fracture on the elbow films sends you to the wrist.</p>
        {gradingTable}
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Fat pads and soft tissues',
    body: (
      <>
        <p>On the lateral, fluid in the joint pushes the posterior fat pad out of the olecranon fossa, where it is normally hidden, so that it becomes visible, and lifts the anterior fat pad into a sail shape ({IYER}). In adults, displaced fat pads after an injury are an indirect sign of fracture ({PAVIC}).</p>
        <p>An effusion with no fracture seen usually hides one. On MRI, 75% of 20 adults with an effusion and no fracture on radiographs had an occult fracture, 86.6% of them in the radial head; the size of the effusion did not predict a fracture, and the MRI changed no one's treatment ({ODWYER}). All six adults in Major and Crawford's series had a fracture on MRI ({MAJOR}). In 193 patients aged 15 to 82 with a fat pad sign and no fracture seen on the AP, repeat radiographs at 7 to 10 days showed a fracture in 95%: the radial neck in 58% and the radial head in 37% ({PAVIC}). The two series differ on where the fracture lies, the head on MRI and more often the neck on follow-up films, so the report says the radial head or neck.</p>
        <p>The sign is sensitive rather than specific. For a radial head or neck fracture it was 85.4% sensitive and 50% specific, and its absence was the more reliable sign that there is no such fracture ({IRSHAD}).</p>
        <p>The supinator fat pad lies against the radius. In adults with radial head or neck fractures it was displaced, more so from Mason type I to type III, and it is a useful adjunct sign ({HUSSEIN}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the fat pads against the fractures, the radiocapitellar line against the ulna, a dislocation against the radial head and the coronoid, and a forearm fracture against the wrist. List the abnormal findings in order.</p>
        <p>The report adds a CT line only where a paper supports one: a coronoid fracture in doubt with a dislocation or a radial head fracture ({RING_2002}), a Mason type II fracture ({VAN_DER_WINDT}), a comminuted or complete articular distal humeral fracture ({DEY_HAZRA}), and an elbow that cannot fully extend with no fracture seen ({ACAR}). For an effusion alone it adds none: MRI found the occult fractures but changed no one's treatment ({ODWYER}).</p>
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
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const present = (id: string) => (v: Values) => str(v, id) === 'present'

const fields = {
  history: { id: 'history', kind: 'choice', label: 'Clinical setting', required: true, options: [
    { value: 'injury', label: 'Injury, first films' },
    { value: 'dislocated', label: 'Dislocated elbow, before reduction' },
    { value: 'reduced', label: 'After reduction of a dislocation' },
  ] },
  mechanism: { id: 'mechanism', kind: 'choice', label: 'Mechanism', options: [
    { value: 'foosh', label: 'Fall on the outstretched hand' },
    { value: 'direct', label: 'Direct blow to the elbow' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  extension: { id: 'extension', kind: 'choice', label: 'Elbow extension test', showIf: (v) => str(v, 'history') === 'injury', help: 'Can the patient fully straighten the injured elbow?', options: [
    { value: 'full', label: 'Full extension' },
    { value: 'limited', label: 'Cannot fully extend' },
    { value: 'not-tested', label: 'Not tested' },
  ] },
  also: { id: 'also', kind: 'multi', label: 'Also', options: [
    { value: 'wrist', label: 'Pain or tenderness at the wrist or along the forearm' },
  ] },

  views: { id: 'views', kind: 'choice', label: 'Views', required: true, help: 'An AP and a true lateral.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'ap', label: 'An AP view' },
    { value: 'lateral', label: 'A true lateral' },
  ] },
  extraViews: { id: 'extra-views', kind: 'multi', label: 'Extra views', options: [
    { value: 'rhc', label: 'A radial head-capitellum (Greenspan) view' },
    { value: 'forearm', label: 'Forearm and wrist views' },
  ] },

  ahl: { id: 'ahl', kind: 'choice', label: 'Anterior humeral line', required: true, help: 'Through the middle third of the capitellum in 80% of normal adult elbows; nearly all the others, the posterior third.', options: [
    { value: 'middle', label: 'Through the middle third of the capitellum' },
    { value: 'posterior', label: 'Through the posterior third' },
    { value: 'anterior-third', label: 'Through the anterior third' },
    { value: 'misses', label: 'Misses the capitellum' },
  ] },
  rcl: { id: 'rcl', kind: 'choice', label: 'Radiocapitellar line', required: true, help: 'Along the middle of the radial neck; it should meet the capitellum.', options: [
    { value: 'aligned', label: 'Meets the capitellum' },
    { value: 'disrupted', label: 'Misses the capitellum' },
  ] },
  rcr: { id: 'rcr', kind: 'number', label: 'Radiocapitellar ratio (optional)', unit: '%', min: -100, max: 100, step: 1, help: 'On the lateral at 90°: radial head offset from the centre of the capitellum over its diameter, anterior positive. Normal −5% to 13%.' },
  ulnohumeral: { id: 'ulnohumeral', kind: 'choice', label: 'Ulnohumeral joint', required: true, options: [
    { value: 'congruent', label: 'Congruent' },
    { value: 'widened', label: 'Widened (drop sign)' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  dislocationDirection: { id: 'dislocation-direction', kind: 'choice', label: 'Direction', showIf: (v) => str(v, 'ulnohumeral') === 'dislocated', options: [
    { value: 'posterior', label: 'Posterior or posterolateral' },
    { value: 'other', label: 'Other' },
  ] },

  radialHead: { id: 'radial-head', kind: 'choice', label: 'Radial head fracture', required: true, options: nonePresent, help: 'Gives the Mason type, as in the Mason calculator; a dislocation makes it type IV.' },
  radialHeadPattern: { id: 'radial-head-pattern', kind: 'choice', label: 'Radial head fracture pattern', required: true, showIf: present('radial-head'), options: [
    { value: 'undisplaced', label: 'Fissure or marginal fracture, not displaced' },
    { value: 'displaced', label: 'Marginal sector fracture, displaced' },
    { value: 'comminuted', label: 'Comminuted, whole head' },
  ] },
  radialHeadDisplacement: { id: 'radial-head-displacement', kind: 'number', label: 'Radial head displacement', unit: 'mm', min: 0, step: 0.5, showIf: present('radial-head'), help: 'Broberg-Morrey modification: type II needs 2 mm or more and 30% or more of the articular surface; anything less is type I.' },
  radialHeadPercent: { id: 'radial-head-percent', kind: 'number', label: 'Share of the articular surface involved', unit: '%', min: 0, max: 100, step: 5, showIf: present('radial-head') },
  coronoid: { id: 'coronoid', kind: 'choice', label: 'Coronoid fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'tip', label: 'Tip avulsion' },
    { value: 'minor', label: 'Fragment of 50% or less' },
    { value: 'major', label: 'Fragment of more than 50%' },
    { value: 'uncertain', label: 'Possible, not certain' },
  ] },
  olecranon: { id: 'olecranon', kind: 'choice', label: 'Olecranon fracture', required: true, options: nonePresent },
  olecranonType: { id: 'olecranon-type', kind: 'choice', label: 'Olecranon fracture (Mayo)', showIf: present('olecranon'), options: [
    { value: 'i', label: 'Undisplaced' },
    { value: 'ii', label: 'Displaced, elbow stable' },
    { value: 'iii', label: 'Displaced, elbow unstable' },
  ] },
  distalHumerus: { id: 'distal-humerus', kind: 'choice', label: 'Distal humerus fracture', required: true, options: nonePresent },
  distalHumerusType: { id: 'distal-humerus-type', kind: 'choice', label: 'Distal humerus fracture (AO/OTA)', showIf: present('distal-humerus'), options: [
    { value: 'a', label: 'Extra-articular (A)' },
    { value: 'b', label: 'Partial articular (B)' },
    { value: 'b3', label: 'Coronal shear of the capitellum or trochlea (B3)' },
    { value: 'c', label: 'Complete articular (C)' },
  ] },
  distalHumerusSigns: { id: 'distal-humerus-signs', kind: 'multi', label: 'Distal humerus', showIf: present('distal-humerus'), options: [
    { value: 'comminuted', label: 'Comminuted' },
    { value: 'double-arc', label: 'Double-arc sign on the lateral' },
  ] },
  forearm: { id: 'forearm', kind: 'multi', label: 'Forearm fractures', options: [
    { value: 'ulna', label: 'Proximal ulna or ulnar shaft' },
    { value: 'radius', label: 'Radial shaft' },
  ] },
  bado: { id: 'bado', kind: 'choice', label: 'Radial head, with the ulnar fracture', showIf: (v) => list(v, 'forearm').includes('ulna'), help: 'Bado types, by the direction of the dislocated radial head.', options: [
    { value: 'none', label: 'Not dislocated' },
    { value: 'i', label: 'Anterior (Bado I)' },
    { value: 'ii', label: 'Posterior (Bado II)' },
    { value: 'iii', label: 'Lateral or anterolateral (Bado III)' },
    { value: 'iv', label: 'Anterior, with the radius broken at the same level (Bado IV)' },
  ] },
  otherFractures: { id: 'other-fractures', kind: 'text', label: 'Other fractures', placeholder: 'e.g. lateral epicondyle avulsion' },

  anteriorFatPad: { id: 'anterior-fat-pad', kind: 'choice', label: 'Anterior fat pad', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'elevated', label: 'Elevated (sail sign)' },
  ] },
  posteriorFatPad: { id: 'posterior-fat-pad', kind: 'choice', label: 'Posterior fat pad', required: true, help: 'Normally hidden in the olecranon fossa.', options: [
    { value: 'not-seen', label: 'Not seen' },
    { value: 'visible', label: 'Visible' },
  ] },
  supinator: { id: 'supinator', kind: 'choice', label: 'Supinator fat pad', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'displaced', label: 'Displaced from the radius' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-effusion', label: 'No joint effusion' },
    { value: 'no-malalignment', label: 'No malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

/** The history or the films say the elbow is, or was, dislocated. */
const dislocated = (v: Values) => ['dislocated', 'reduced'].includes(str(v, 'history')) || str(v, 'ulnohumeral') === 'dislocated'

/** EX4-1, EX4-2: the Mason type through the calculator's logic; a dislocation makes it type IV. */
function radialHeadResult(values: Values): MasonResult | undefined {
  if (str(values, 'radial-head') !== 'present') return undefined
  const known = str(values, 'history') !== '' && str(values, 'ulnohumeral') !== ''
  return mason({
    pattern: (str(values, 'radial-head-pattern') || undefined) as MasonPattern | undefined,
    dislocation: dislocated(values) ? true : known ? false : undefined,
  })
}

/** EX4-1: the Broberg-Morrey type, or undefined while a measurement that decides it is missing. */
function brobergType(values: Values): 'I' | 'II' | undefined {
  if (str(values, 'radial-head') !== 'present') return undefined
  return brobergMorrey(num(values, 'radial-head-displacement'), num(values, 'radial-head-percent'))
}

/** EX4-6: the coronoid options, worded as Regan and Morrey's types. */
const reganType: Record<string, string> = { tip: 'I', minor: 'II', major: 'III' }
/** EX4-6: a dislocation or another fracture came with 14%, 56% and 80% of types I to III. */
const reganAssociated: Record<string, string> = { tip: '14%', minor: '56%', major: '80%' }
const coronoidFracture = (v: Values) => Boolean(reganType[str(v, 'coronoid')])

/** EX4-7: a dislocation with fractures of both the radial head and the coronoid. */
const terribleTriad = (v: Values) => dislocated(v) && str(v, 'radial-head') === 'present' && coronoidFracture(v)

const mayoType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III' }
const aoType: Record<string, string> = { a: 'A', b: 'B', b3: 'B3', c: 'C' }
/** EX4-10: the AO/OTA types in words, as Dey Hazra gives them. */
const aoWords: Record<string, string> = { a: 'extra-articular', b: 'partial articular', b3: 'coronal shear of the capitellum or trochlea', c: 'complete articular' }
const badoType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III', iv: 'IV' }

const ulnaFracture = (v: Values) => list(v, 'forearm').includes('ulna')
const radiusFracture = (v: Values) => list(v, 'forearm').includes('radius')
/** EX4-13: an ulnar fracture with a dislocated radial head. */
const monteggia = (v: Values) => ulnaFracture(v) && Boolean(badoType[str(v, 'bado')])

const effusion = (v: Values) => str(v, 'anterior-fat-pad') === 'elevated' || str(v, 'posterior-fat-pad') === 'visible'

/** EX3-1: the anterior humeral line outside where Goldfarb's normal elbows put it. */
const ahlAbnormal = (v: Values) => ['anterior-third', 'misses'].includes(str(v, 'ahl'))

/** EX3-2: Rouleau's normal radiocapitellar ratio, −5% to 13%. */
const rcrOutside = (v: Values) => {
  const ratio = num(v, 'rcr')
  return ratio !== undefined && (ratio < -5 || ratio > 13)
}

/** The fractures entered, for the fat pad rule and the negatives. */
function fracturesEntered(values: Values): string[] {
  return [
    str(values, 'radial-head') === 'present' && 'radial head fracture',
    coronoidFracture(values) && 'coronoid fracture',
    str(values, 'olecranon') === 'present' && 'olecranon fracture',
    str(values, 'distal-humerus') === 'present' && 'distal humerus fracture',
    ulnaFracture(values) && 'ulnar fracture',
    radiusFracture(values) && 'radial shaft fracture',
    str(values, 'other-fractures') !== '' && str(values, 'other-fractures'),
  ].filter((item): item is string => Boolean(item))
}

/** True once every fracture question is answered "none" and no other fracture is entered. */
function noFractureEntered(values: Values): boolean {
  return ['radial-head', 'coronoid', 'olecranon', 'distal-humerus'].every((id) => str(values, id) === 'none')
    && list(values, 'forearm').length === 0 && str(values, 'other-fractures') === ''
}

/** EX6-1: the reasons, each from a paper, to add a CT line. */
function ctReasons(values: Values): string[] {
  const result = radialHeadResult(values)
  const dh = str(values, 'distal-humerus') === 'present'
  return [
    // EX4-7: CT if a coronoid fracture is in doubt (Ring 2002).
    str(values, 'coronoid') === 'uncertain' && (dislocated(values) || str(values, 'radial-head') === 'present') && 'possible coronoid fracture',
    // EX4-4: CT in every type II fracture (van der Windt).
    result?.type === 'II' && 'Mason type II radial head fracture',
    // EX4-11: 3D CT for comminuted or complex distal humeral fractures (Dey Hazra).
    dh && (str(values, 'distal-humerus-type') === 'c' || list(values, 'distal-humerus-signs').includes('comminuted')) && 'comminuted or complete articular distal humerus fracture',
    // EX2-4: CT after a positive extension test with normal radiographs (Acar).
    str(values, 'history') === 'injury' && str(values, 'extension') === 'limited' && noFractureEntered(values) && 'cannot fully extend, no fracture seen',
  ].filter((item): item is string => Boolean(item))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveHistory(values: Values): Derived[] {
  const out: Derived[] = []
  // EX1-1: the elbow extension test (Appelboam).
  const extension = str(values, 'extension')
  if (str(values, 'history') === 'injury' && extension === 'limited') out.push({ label: 'Extension test', value: 'Cannot fully extend: a fracture in nearly 50%; radiographs indicated' })
  if (str(values, 'history') === 'injury' && extension === 'full') out.push({ label: 'Extension test', value: 'Full extension: 98.4% negative predictive value in adults, but look hard at the olecranon' })
  // EX1-3: the mechanism.
  const mechanism = str(values, 'mechanism')
  if (mechanism === 'foosh') out.push({ label: 'Fall on the hand', value: 'The usual mechanism of radial head fractures and elbow dislocations' })
  if (mechanism === 'direct') out.push({ label: 'Direct blow', value: 'A cause of olecranon fractures' })
  // EX1-4: beyond the elbow (Swensen).
  if (list(values, 'also').includes('wrist')) out.push({ label: 'Wrist and forearm', value: 'Examine the distal radioulnar joint (Essex-Lopresti); image the wrist as the clinical picture warrants' })
  return out
}

function deriveViews(values: Values): Derived[] {
  const out: Derived[] = []
  // EX2-1: the true lateral.
  if (str(values, 'views') === 'incomplete' && list(values, 'views-missing').includes('lateral')) out.push({ label: 'No true lateral', value: 'The fat pads, the lines and the olecranon are read on it', tone: 'warn' })
  // EX2-2: the radial head-capitellum view, where the papers disagree.
  if (list(values, 'extra-views').includes('rhc')) out.push({ label: 'Radial head-capitellum view', value: 'Disputed: showed more in 10 of 50 (Greenspan); one extra fracture in 125 (Manns and Lee)' })
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  // EX3-1: the anterior humeral line in Goldfarb's normal elbows.
  const ahl = str(values, 'ahl')
  if (ahl === 'middle') out.push({ label: 'Anterior humeral line', value: 'Middle third: as in 80% of normal elbows', tone: 'good' })
  if (ahl === 'posterior') out.push({ label: 'Anterior humeral line', value: 'Posterior third: as in nearly all the other normal elbows', tone: 'good' })
  if (ahlAbnormal(values)) out.push({ label: 'Anterior humeral line', value: 'Not where normal elbows put it: check the distal humerus', tone: 'warn' })
  // EX3-3, EX3-4: a line that misses the capitellum.
  if (str(values, 'rcl') === 'disrupted') out.push({ label: 'Radiocapitellar line', value: 'Misses: suspect radial head subluxation or dislocation; check the ulna (Monteggia)', tone: 'warn' })
  // EX3-2: the radiocapitellar ratio.
  const ratio = num(values, 'rcr')
  if (ratio !== undefined) {
    out.push(rcrOutside(values)
      ? { label: 'Radiocapitellar ratio', value: `${ratio}%: outside −5% to 13%, suggests radiocapitellar malalignment`, tone: 'warn' }
      : { label: 'Radiocapitellar ratio', value: `${ratio}%: within −5% to 13%`, tone: 'good' })
  }
  // EX3-5: the drop sign.
  const joint = str(values, 'ulnohumeral')
  if (joint === 'widened') out.push({ label: 'Drop sign', value: 'May warn of instability if it persists after the first reduction film', tone: 'warn' })
  // EX3-6: after a dislocation.
  if (joint === 'dislocated') out.push({ label: 'Dislocation', value: 'Look for avulsions, posterior capitellar impaction, and radial head and coronoid fractures', tone: 'warn' })
  return out
}

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  // EX4-1, EX4-2: Mason, through the calculator's logic.
  const result = radialHeadResult(values)
  if (result) out.push({ label: 'Mason', value: result.modified ? 'Type IV (Johnston)' : `Type ${result.type}`, tone: 'warn' })
  if (str(values, 'radial-head') === 'present' && num(values, 'radial-head-displacement') !== undefined) {
    const type = brobergType(values)
    out.push({ label: 'Broberg-Morrey', value: type ? `Type ${type}` : 'Enter the share of the articular surface' })
  }
  // EX4-4: CT for a type II fracture.
  if (result?.type === 'II') out.push({ label: 'CT', value: 'Needed in every type II: displacement, fragments, associated fractures' })
  // EX4-3: associated injuries rise with severity.
  if (str(values, 'radial-head') === 'present' && str(values, 'radial-head-pattern') === 'comminuted') out.push({ label: 'Associated injuries', value: 'In 80% of comminuted fractures, against 20% of undisplaced', tone: 'warn' })
  // EX4-6: Regan and Morrey.
  const coronoid = str(values, 'coronoid')
  if (reganType[coronoid]) out.push({ label: 'Coronoid (Regan-Morrey)', value: `Type ${reganType[coronoid]}: a dislocation or another fracture in ${reganAssociated[coronoid]}`, tone: 'warn' })
  // EX4-7: a coronoid fracture in doubt, and the terrible triad.
  if (coronoid === 'uncertain' && (dislocated(values) || str(values, 'radial-head') === 'present')) out.push({ label: 'Coronoid', value: 'In doubt with a dislocation or radial head fracture: CT', tone: 'warn' })
  if (terribleTriad(values)) out.push({ label: 'Terrible triad', value: 'Dislocation with radial head and coronoid fractures: very unstable', tone: 'warn' })
  // EX4-8, EX4-9: the olecranon.
  if (str(values, 'olecranon') === 'present') {
    const mayo = mayoType[str(values, 'olecranon-type')] as string | undefined
    if (mayo) out.push({ label: 'Mayo', value: `Type ${mayo}`, tone: 'warn' })
    out.push({ label: 'Olecranon', value: 'Intra-articular: look for a coronoid fracture, a dislocation and a radial head injury' })
  }
  // EX4-10, EX4-11, EX4-12: the distal humerus.
  if (str(values, 'distal-humerus') === 'present') {
    const ao = aoType[str(values, 'distal-humerus-type')] as string | undefined
    if (ao) out.push({ label: 'AO/OTA', value: ao === 'B3' ? 'Type B3 (coronal shear)' : `Type ${ao}`, tone: 'warn' })
    const signs = list(values, 'distal-humerus-signs')
    if (ao === 'C' || signs.includes('comminuted')) out.push({ label: 'CT', value: '3D CT recommended for comminuted or complex fractures' })
    if (signs.includes('double-arc')) out.push({ label: 'Double-arc sign', value: 'Capitellum and lateral trochlear ridge displaced: a coronal shear fracture' })
  }
  // EX4-13, EX4-14, EX4-15: Monteggia.
  const bado = badoType[str(values, 'bado')] as string | undefined
  if (ulnaFracture(values) && bado) {
    out.push({ label: 'Monteggia', value: `Bado type ${bado}`, tone: 'warn' })
    if (bado === 'II') out.push({ label: 'Bado II', value: 'The commonest in adults; a radial head fracture in 26 of 38' })
  }
  if (ulnaFracture(values) && !bado) out.push({ label: 'Ulnar fracture', value: 'Check the radial head: its dislocation is the finding most often missed', tone: 'warn' })
  // EX4-16: Galeazzi.
  if (radiusFracture(values)) out.push({ label: 'Galeazzi check', value: 'Distal radioulnar joint: unstable mainly with distal-third fractures (within 7.5 cm); image the wrist', tone: 'warn' })
  return out
}

function deriveSoftTissues(values: Values): Derived[] {
  const out: Derived[] = []
  // EX5-1: either sign means an effusion.
  if (effusion(values)) out.push({ label: 'Fat pads', value: 'Joint effusion', tone: 'warn' })
  // EX5-2: an effusion with no fracture seen.
  if (effusion(values) && noFractureEntered(values)) out.push({ label: 'Occult fracture', value: 'Likely: 75% on MRI; most in the radial head or neck', tone: 'warn' })
  // EX5-3: no fat pad sign.
  if (str(values, 'anterior-fat-pad') === 'normal' && str(values, 'posterior-fat-pad') === 'not-seen' && str(values, 'radial-head') === 'none') {
    out.push({ label: 'No fat pad sign', value: 'Its absence is the more reliable sign of no radial head or neck fracture', tone: 'good' })
  }
  // EX5-4: the supinator fat pad.
  if (str(values, 'supinator') === 'displaced') out.push({ label: 'Supinator fat pad', value: 'Displaced in radial head and neck fractures: a useful adjunct sign' })
  return out
}

/* Report lines. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function clinicalLines(values: Values): (string | false)[] {
  const extension = str(values, 'history') === 'injury' ? str(values, 'extension') : ''
  const clinical = join([
    picked(values, fields.history),
    picked(values, fields.mechanism),
    extension === 'full' && 'full extension',
    extension === 'limited' && 'cannot fully extend',
    ...chosen(values, fields.also),
  ])
  return [clinical && `Clinical: ${clinical}`]
}

function viewLines(values: Values): (string | false)[] {
  const views = str(values, 'views')
  const missing = chosen(values, fields.viewsMissing)
  const extra = chosen(values, fields.extraViews)
  const extraText = extra.length > 0 ? `, with ${andList(extra)}` : ''
  return [
    views === 'complete' && `Views: AP and true lateral${extraText}`,
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}${extraText}`,
  ]
}

function alignmentLines(values: Values): (string | false)[] {
  const ratio = num(values, 'rcr')
  const joint = str(values, 'ulnohumeral')
  return [
    choiceLine(values, fields.ahl),
    choiceLine(values, fields.rcl, ratio !== undefined && `radiocapitellar ratio ${ratio}%`),
    joint === 'dislocated'
      ? `Ulnohumeral joint: dislocated${str(values, 'dislocation-direction') ? `, ${picked(values, fields.dislocationDirection)}` : ''}`
      : choiceLine(values, fields.ulnohumeral),
  ]
}

function boneLines(values: Values): (string | false)[] {
  const result = radialHeadResult(values)
  const displacement = num(values, 'radial-head-displacement')
  const percent = num(values, 'radial-head-percent')
  const coronoid = str(values, 'coronoid')
  const mayo = mayoType[str(values, 'olecranon-type')] as string | undefined
  const ao = aoType[str(values, 'distal-humerus-type')] as string | undefined
  const bado = badoType[str(values, 'bado')] as string | undefined
  const forearm = chosen(values, fields.forearm)
  const noneLine = (id: string, label: string) => str(values, id) === 'none' && `${label}: no fracture`
  return [
    noneLine('radial-head', 'Radial head'),
    str(values, 'radial-head') === 'present' && `Radial head: ${join([
      result ? masonSentence(result).replace(/\.$/, '').replace(/^Radial/, 'radial') : 'fracture',
      displacement !== undefined && `displaced ${displacement} mm`,
      percent !== undefined && `${percent}% of the articular surface`,
    ])}`,
    noneLine('coronoid', 'Coronoid'),
    reganType[coronoid] !== undefined && `Coronoid: ${picked(values, fields.coronoid)} (Regan-Morrey type ${reganType[coronoid]})`,
    coronoid === 'uncertain' && 'Coronoid: possible fracture, not certain',
    noneLine('olecranon', 'Olecranon'),
    str(values, 'olecranon') === 'present' && `Olecranon: fracture${mayo ? `, ${picked(values, fields.olecranonType)} (Mayo type ${mayo})` : ''}`,
    noneLine('distal-humerus', 'Distal humerus'),
    str(values, 'distal-humerus') === 'present' && `Distal humerus: ${join([
      ao ? `${aoWords[str(values, 'distal-humerus-type')]} (AO/OTA type ${ao})` : 'fracture',
      ...chosen(values, fields.distalHumerusSigns),
    ], ', ')}`,
    forearm.length > 0 && `Forearm: fracture of the ${andList(forearm)}`,
    ulnaFracture(values) && str(values, 'bado') && `Radial head with the ulnar fracture: ${bado ? `dislocated, ${picked(values, fields.bado)}` : 'not dislocated'}`,
    str(values, 'other-fractures') && `Other fractures: ${str(values, 'other-fractures')}`,
  ]
}

function softTissueLines(values: Values): (string | false)[] {
  return [
    choiceLine(values, fields.anteriorFatPad),
    choiceLine(values, fields.posteriorFatPad),
    choiceLine(values, fields.supinator),
  ]
}

/* The impression. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const joint = str(values, 'ulnohumeral')
  const history = str(values, 'history')
  // EX4-7, EX3-6, EX3-5: the joint.
  if (terribleTriad(values)) out.push('Terrible triad: elbow dislocation with fractures of the radial head and coronoid.')
  else if (joint === 'dislocated') out.push(str(values, 'dislocation-direction') === 'posterior' ? 'Posterior elbow dislocation.' : 'Elbow dislocation.')
  if (history === 'reduced' && joint === 'congruent') out.push('Elbow reduced; ulnohumeral joint congruent.')
  if (joint === 'widened') out.push(history === 'reduced' ? 'Ulnohumeral joint widened after reduction (drop sign): may warn of instability if it persists.' : 'Ulnohumeral joint widened.')
  // EX4-13: Monteggia.
  const bado = badoType[str(values, 'bado')] as string | undefined
  if (monteggia(values)) out.push(`Monteggia fracture-dislocation, Bado type ${bado}.`)
  // EX4-1, EX4-2: Mason, as the calculator writes it.
  const result = radialHeadResult(values)
  if (str(values, 'radial-head') === 'present') {
    out.push(result ? masonSentence(result) : 'Radial head fracture.')
    const broberg = brobergType(values)
    if (broberg) out.push(brobergMorreySentence(broberg))
  }
  // EX4-6: Regan and Morrey.
  const coronoid = str(values, 'coronoid')
  if (reganType[coronoid]) out.push(`Coronoid fracture, Regan-Morrey type ${reganType[coronoid]}: ${picked(values, fields.coronoid)}.`)
  if (coronoid === 'uncertain') out.push('Possible coronoid fracture.')
  // EX4-9: Mayo.
  if (str(values, 'olecranon') === 'present') {
    const mayo = mayoType[str(values, 'olecranon-type')] as string | undefined
    out.push(mayo ? `Olecranon fracture, Mayo type ${mayo}: ${picked(values, fields.olecranonType)}.` : 'Olecranon fracture.')
  }
  // EX4-10: AO/OTA.
  if (str(values, 'distal-humerus') === 'present') {
    const ao = aoType[str(values, 'distal-humerus-type')] as string | undefined
    out.push(ao ? `Distal humerus fracture, AO/OTA type ${ao}: ${aoWords[str(values, 'distal-humerus-type')]}.` : 'Distal humerus fracture.')
  }
  // EX4-15, EX4-16: the forearm.
  if (ulnaFracture(values) && !monteggia(values)) out.push('Ulnar fracture.')
  if (radiusFracture(values)) out.push('Radial shaft fracture: check the distal radioulnar joint (Galeazzi).')
  const otherFractures = str(values, 'other-fractures')
  if (otherFractures) out.push(`${upperFirst(otherFractures.replace(/\.$/, ''))}.`)
  // EX5-1, EX5-2: the fat pads.
  if (effusion(values)) {
    const signs = join([
      str(values, 'anterior-fat-pad') === 'elevated' && 'elevated anterior fat pad',
      str(values, 'posterior-fat-pad') === 'visible' && 'visible posterior fat pad',
    ], ', ')
    out.push(`Joint effusion (${signs}).`)
    if (noFractureEntered(values)) out.push('No fracture is seen, but with a joint effusion an occult fracture, most often of the radial head or neck, is likely.')
  }
  // EX5-4: the supinator fat pad.
  if (str(values, 'supinator') === 'displaced') out.push('Supinator fat pad displaced from the radius.')
  // EX3-1: the anterior humeral line.
  if (ahlAbnormal(values)) out.push(`Anterior humeral line ${str(values, 'ahl') === 'misses' ? 'misses the capitellum' : 'through the anterior third of the capitellum'}: check the distal humerus.`)
  // EX3-3, EX3-2: the radiocapitellar joint, unless a dislocation or Monteggia already explains it.
  if (str(values, 'rcl') === 'disrupted' && !monteggia(values) && joint !== 'dislocated') out.push('Radiocapitellar line misses the capitellum: suspect radial head subluxation or dislocation.')
  if (rcrOutside(values) && !monteggia(values) && joint !== 'dislocated') out.push(`Radiocapitellar ratio ${num(values, 'rcr')}%, outside the normal −5% to 13%: radiocapitellar malalignment.`)
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No fracture, joint effusion or malalignment.'

function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

/** EX6-1: one CT line, naming each reason a paper supports. */
function ctLine(values: Values): string {
  const reasons = ctReasons(values)
  return reasons.length > 0 ? `Consider CT (${reasons.join('; ')}).` : ''
}

function impression(values: Values): string {
  const found = findings(values)
  const ct = ctLine(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // A warn chip or free text is not a finding the impression can name, so never call such a study normal.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ct, ...negatives)}`
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ct)}`
    return ct ? `Impression: ${ct}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ct, ...negatives)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = fracturesEntered(values)
  const effusionSigns = [
    str(values, 'anterior-fat-pad') === 'elevated' && 'elevated anterior fat pad',
    str(values, 'posterior-fat-pad') === 'visible' && 'visible posterior fat pad',
  ].filter((item): item is string => Boolean(item))
  const malalignment = [
    ahlAbnormal(values) && 'abnormal anterior humeral line',
    str(values, 'rcl') === 'disrupted' && 'disrupted radiocapitellar line',
    rcrOutside(values) && 'radiocapitellar ratio outside the normal range',
    str(values, 'ulnohumeral') === 'dislocated' && 'elbow dislocation',
    str(values, 'ulnohumeral') === 'widened' && 'widened ulnohumeral joint',
    monteggia(values) && 'dislocated radial head (Monteggia)',
  ].filter((item): item is string => Boolean(item))
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-effusion', 'no joint effusion', effusionSigns],
    ['no-malalignment', 'no malalignment', malalignment],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }
  // EX3-1: an abnormal anterior humeral line with no distal humerus fracture.
  if (ahlAbnormal(values) && str(values, 'distal-humerus') === 'none') {
    out.push('The anterior humeral line is not where normal elbows put it, but no distal humerus fracture is entered.')
  }
  // EX3-3, EX3-4: a radiocapitellar line that misses, with no dislocation or ulnar fracture.
  if (str(values, 'rcl') === 'disrupted' && !dislocated(values) && !ulnaFracture(values)) {
    out.push('The radiocapitellar line misses the capitellum: suspect a radial head subluxation or dislocation, and check the ulna for a fracture (Monteggia).')
  }
  // EX4-15: an ulnar fracture with the radial head not judged dislocated.
  if (ulnaFracture(values) && !monteggia(values) && str(values, 'rcl') !== 'aligned') {
    out.push('An ulnar fracture is entered: check the radiocapitellar joint, since a dislocated or subluxed radial head is the finding most often missed in a Monteggia injury.')
  }
  // EX4-7: a dislocation with a radial head fracture and no coronoid fracture entered.
  if (dislocated(values) && str(values, 'radial-head') === 'present' && str(values, 'coronoid') === 'none') {
    out.push('A dislocation with a radial head fracture is entered: look closely for a coronoid fracture (the terrible triad), with CT if in doubt.')
  }
  // EX3-6: still dislocated after reduction.
  if (str(values, 'history') === 'reduced' && str(values, 'ulnohumeral') === 'dislocated') {
    out.push('The films are after reduction, but the elbow is entered as still dislocated.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...clinicalLines(values),
    ...viewLines(values),
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
    id: 'history',
    title: 'Step 1. The injury and why the film',
    learn: 'history',
    teach: (
      <>
        <p>Cannot fully extend the elbow after an injury: a fracture in nearly 50%, so radiographs. Full extension: 98.4% negative predictive value in adults, but an olecranon fracture can still be present ({APPELBOAM}).</p>
        <p>A fall on the outstretched hand: radial head fracture ({SWENSEN}) or dislocation ({BARCO}); a direct blow: olecranon ({WIEGAND}). Wrist pain: think of the distal radioulnar joint ({SWENSEN}). A child's elbow: <Link to="/studies/pediatric-elbow">the paediatric study</Link>.</p>
      </>
    ),
    fields: [fields.history, fields.mechanism, fields.extension, fields.also],
    derive: deriveHistory,
  },
  {
    id: 'views',
    title: 'Step 2. Views and technique',
    learn: 'views',
    teach: <p>An AP and a true lateral; the true lateral is essential ({WIEGAND}). The radial head-capitellum view is disputed: it showed more in 10 of 50 ({GREENSPAN}), and one extra fracture in 125 with an effusion ({MANNS}). Radiographs were 46.9% sensitive against CT ({AFACAN}).</p>,
    fields: [fields.views, fields.viewsMissing, fields.extraViews],
    derive: deriveViews,
  },
  {
    id: 'alignment',
    title: 'Step 3. Alignment and the joint',
    learn: 'alignment',
    teach: (
      <>
        <p>Anterior humeral line: through the middle third of the capitellum in 80% of normal elbows, nearly all the rest the posterior third ({GOLDFARB}). Radiocapitellar ratio normal −5% to 13% ({ROULEAU}), measured at 90° ({SANDMAN}).</p>
        <p>A radiocapitellar line that misses: look at the ulna, since the radial head dislocation is what is most often missed in a Monteggia injury ({MATHUR}). After reduction, a widened ulnohumeral joint (drop sign) may warn of instability ({COONRAD}).</p>
      </>
    ),
    fields: [fields.ahl, fields.rcl, fields.rcr, fields.ulnohumeral, fields.dislocationDirection],
    derive: deriveAlignment,
  },
  {
    id: 'bones',
    title: 'Step 4. The bones, fracture by fracture',
    learn: 'bones',
    teach: (
      <>
        <p>Radial head: Mason, with Johnston's type IV and the Broberg-Morrey numbers, as the <Link to="/mason">Mason calculator</Link> ({IANNUZZI}; {VAN_DER_WINDT}). Coronoid: Regan-Morrey ({REGAN}); a dislocation with both fractures is the terrible triad, CT if the coronoid is in doubt ({RING_2002}). Olecranon: Mayo ({WIEGAND}). Distal humerus: AO/OTA ({DEY_HAZRA}); the double-arc sign ({MCKEE}). Forearm: Bado ({CALDERAZZI}) and Galeazzi ({GARG}; {RETTIG}).</p>
        {gradingTable}
      </>
    ),
    fields: [
      fields.radialHead, fields.radialHeadPattern, fields.radialHeadDisplacement, fields.radialHeadPercent,
      fields.coronoid,
      fields.olecranon, fields.olecranonType,
      fields.distalHumerus, fields.distalHumerusType, fields.distalHumerusSigns,
      fields.forearm, fields.bado,
      fields.otherFractures,
    ],
    derive: deriveBones,
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Fat pads and soft tissues',
    learn: 'soft-tissues',
    teach: <p>A visible posterior or elevated anterior fat pad means an effusion ({IYER}). With no fracture seen, an occult fracture is likely, most often of the radial head or neck ({ODWYER}; {PAVIC}). No fat pad sign is the more reliable sign of no radial head or neck fracture ({IRSHAD}).</p>,
    fields: [fields.anteriorFatPad, fields.posteriorFatPad, fields.supinator],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the abnormal findings in order. A CT line only where a paper supports it ({RING_2002}; {VAN_DER_WINDT}; {DEY_HAZRA}; {ACAR}).</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'elbow-xray',
  name: 'Elbow X-ray for injury',
  lede: 'Read an adult\'s elbow radiographs after an injury: the extension test, the views, the anterior humeral and radiocapitellar lines, the radial head (Mason), coronoid, olecranon and distal humerus, dislocation and the terrible triad, Monteggia and Galeazzi, the fat pads, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract or open full text; Mason\'s and Johnston\'s types, whose papers have no open copy, were read in the open review cited beside them, as on the Mason calculator.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'extension-test',
      question: 'After a fall, an adult cannot fully extend the injured elbow. What did Appelboam and colleagues find?',
      options: ['A fracture is rare', 'A fracture in nearly 50%: radiographs are indicated', 'Only children need radiographs', 'The test is useless in adults'],
      answer: 1,
      explanation: <p>Patients who cannot fully extend the elbow have a nearly 50% chance of a fracture and should have radiographs; full extension had a 98.4% negative predictive value in adults ({APPELBOAM}).</p>,
    },
    {
      id: 'extension-olecranon',
      question: 'Which fracture can still be present when the elbow extends fully?',
      options: ['Olecranon fracture', 'Supracondylar fracture', 'Medial epicondyle avulsion', 'Capitellar fracture only in children'],
      answer: 0,
      explanation: <p>Two adults with olecranon fractures and full extension needed a change in treatment, so radiography is deferred only if an olecranon fracture is not suspected ({APPELBOAM}).</p>,
    },
    {
      id: 'occult',
      question: 'An adult\'s elbow shows a visible posterior fat pad and no fracture. On MRI, what did O\'Dwyer and colleagues find?',
      options: ['No fractures', 'An occult fracture in 75%, most in the radial head', 'Only ligament tears', 'Fractures only when the effusion was large'],
      answer: 1,
      explanation: <p>75% had an occult fracture, 86.6% of them in the radial head, and the size of the effusion did not predict one ({ODWYER}).</p>,
    },
    {
      id: 'rhc-view',
      question: 'What did Manns and Lee find when the radial head-capitellum view was added for an effusion?',
      options: ['It found a fracture in 1 of 2 patients', 'It added one fracture in 125 patients and was generally unhelpful', 'It replaced the lateral view', 'It showed every coronoid fracture'],
      answer: 1,
      explanation: <p>It showed one fracture the standard views had not and failed to confirm 8 they showed ({MANNS}); Greenspan and colleagues, by contrast, found it showed more in 10 of 50 ({GREENSPAN}).</p>,
    },
    {
      id: 'broberg',
      question: 'A partial radial head fracture is displaced 3 mm and involves 20% of the articular surface. What is it under the Broberg-Morrey modification?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 0,
      explanation: <p>Type II needs at least 2 mm of displacement and at least 30% of the articular surface; anything less is type I ({BROBERG}; {VAN_DER_WINDT}). In the Hotchkiss modification the size requirement is absent ({SWENSEN}).</p>,
    },
    {
      id: 'mason-iv',
      question: 'A radial head fracture comes with a dislocation of the elbow. What is the Mason type?',
      options: ['Type II', 'Type III', 'Type IV (Johnston)', 'It depends only on the fragment size'],
      answer: 2,
      explanation: <p>A dislocation makes it type IV, Johnston's addition to Mason's three types ({IANNUZZI}).</p>,
    },
    {
      id: 'terrible-triad',
      question: 'What is the terrible triad of the elbow?',
      options: ['Fractures of the olecranon, coronoid and radial head', 'Posterior dislocation with fractures of the radial head and coronoid', 'Dislocation with a medial epicondyle avulsion', 'A radial head fracture with a distal radioulnar joint injury'],
      answer: 1,
      explanation: <p>Posterior dislocation with radial head and coronoid fractures; these injuries are very unstable, and CT should be used if the coronoid fracture is in doubt ({RING_2002}).</p>,
    },
    {
      id: 'regan',
      question: 'A coronoid fracture fragment involves more than half the coronoid. What is the Regan-Morrey type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 2,
      explanation: <p>Type I is a tip avulsion, type II 50% or less, type III more than 50%; a dislocation or other fracture came with 80% of type III ({REGAN}).</p>,
    },
    {
      id: 'monteggia',
      question: 'Which Monteggia type is the commonest in adults?',
      options: ['Bado I (anterior)', 'Bado II (posterior)', 'Bado III (lateral)', 'Bado IV'],
      answer: 1,
      explanation: <p>38 of Ring and colleagues' 48 adults had a Bado type II, and 26 of those 38 also had a radial head fracture ({RING_1998}).</p>,
    },
    {
      id: 'monteggia-missed',
      question: 'In Mathur and Lau\'s series, what was the finding most often missed in a Monteggia injury?',
      options: ['The ulnar fracture', 'The radial head dislocation or subluxation', 'An effusion', 'A coronoid fracture'],
      answer: 1,
      explanation: <p>The radial head dislocation or subluxation, then a subtle ulnar fracture or plastic deformity; attend to the radiocapitellar alignment ({MATHUR}).</p>,
    },
    {
      id: 'galeazzi',
      question: 'The elbow films show a fracture of the radial shaft. What else must be checked?',
      options: ['The olecranon fat pad', 'The distal radioulnar joint (Galeazzi)', 'The anterior humeral line', 'Nothing more'],
      answer: 1,
      explanation: <p>A radial shaft fracture with disruption of the distal radioulnar joint is a Galeazzi fracture ({GARG}); distal-third fractures went with an unstable joint ({RETTIG}).</p>,
    },
    {
      id: 'double-arc',
      question: 'The lateral shows two arcs in front of the distal humerus. What does McKee\'s double-arc sign mean?',
      options: ['A normal capitellum', 'A coronal shear fracture of the capitellum and lateral trochlear ridge', 'A Monteggia fracture', 'A posterior fat pad'],
      answer: 1,
      explanation: <p>The arcs are the subchondral bone of the displaced capitellum and of the lateral trochlear ridge ({MCKEE}).</p>,
    },
  ],
}

export function ElbowXrayStudyPage() {
  return <StudyPage study={study} />
}
