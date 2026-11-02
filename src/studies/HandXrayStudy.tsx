import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract, an open full text (Southall,
 * Czarnecki, Deuschl, Sendek, Qiu, Daher, Elfar and Mann, Mikhail) or the ACR's published ratings
 * table before it went in. The claims table is
 * docs/superpowers/research/2026-11-01-hand-xray-sources.md (H claims). Rule chips and warnings
 * carry their claim IDs. The site has no hand classification calculator, so none is reused.
 */

const ACR_DOI = '10.1016/j.jacr.2019.02.029'
const SOUTHALL_DOI = '10.1097/js9.0000000000000381'
const CZARNECKI_DOI = '10.5114/pjr.2024.135304'
const SMITHUIS_DOI = '10.1055/s-0045-1802974'
const DEUSCHL_DOI = '10.1016/j.jhsg.2025.02.015'
const FISHER_DOI = '10.2214/ajr.140.2.319'
const STEINMETZ_DOI = '10.1177/1558944719852743'
const SENDEK_DOI = '10.1177/15589447231200604'
const BUREN_DOI = '10.1007/s00068-015-0611-z'
const VAN_AAKEN_DOI = '10.1007/s00402-015-2361-0'
const FRANCE_DOI = '10.1177/15589447211063238'
const LAMRASKI_DOI = '10.1002/jor.20025'
const QIU_DOI = '10.1016/j.jhsg.2026.101108'
const SLETTEN_DOI = '10.1177/1753193412461582'
const LEUNG_DOI = '10.1053/s0363-5023(06)90001-x'
const LOWDON_DOI = '10.1016/0020-1383(86)90332-3'
const DAHER_DOI = '10.1016/j.jpra.2023.09.010'
const LIVERNEAUX_DOI = '10.1177/1753193414554357'
const ELFAR_DOI = '10.5435/JAAOS-21-02-88'
const CAGGIANO_DOI = '10.1016/j.hcl.2017.12.005'
const YANG_DOI = '10.1097/CM9.0000000000000676'
const MORADI_DOI = '10.1177/1753193416669929'
const KALAINOV_DOI = '10.1016/j.jhsa.2005.02.010'
const WEHBE_DOI = '10.2106/00004623-198466050-00003'
const LIN_DOI = '10.1016/j.jhsa.2017.10.004'
const MADAN_DOI = '10.1111/os.12084'
const RITTING_DOI = '10.1097/JSM.0b013e3181d23710'
const MIKHAIL_DOI = '10.1302/2633-1462.58.BJO-2024-0062.R1'
const DARYOUSH_DOI = '10.1016/j.jhsa.2024.12.003'
const LEGERSTEE_DOI = '10.1177/15589447241308608'
const MANTHEY_DOI = '10.1016/s0196-0644(96)70130-0'
const GRON_DOI = '10.1016/0020-1383(86)90081-1'
const KOLLITZ_DOI = '10.1007/s11552-013-9562-1'

const ACR = <Cite doi={ACR_DOI}>ACR Appropriateness Criteria, Acute Hand and Wrist Trauma 2019</Cite>
const SOUTHALL = <Cite doi={SOUTHALL_DOI}>Southall et al., Int J Surg 2023</Cite>
const CZARNECKI = <Cite doi={CZARNECKI_DOI}>Czarnecki et al., Pol J Radiol 2024</Cite>
const SMITHUIS = <Cite doi={SMITHUIS_DOI}>Smithuis et al., Semin Musculoskelet Radiol 2025</Cite>
const DEUSCHL = <Cite doi={DEUSCHL_DOI}>Deuschl et al., J Hand Surg Glob Online 2025</Cite>
const FISHER = <Cite doi={FISHER_DOI}>Fisher et al., AJR 1983</Cite>
const STEINMETZ = <Cite doi={STEINMETZ_DOI}>Steinmetz et al., Hand 2021</Cite>
const SENDEK = <Cite doi={SENDEK_DOI}>Sendek et al., Hand 2025</Cite>
const BUREN = <Cite doi={BUREN_DOI}>Büren et al., Eur J Trauma Emerg Surg 2016</Cite>
const VAN_AAKEN = <Cite doi={VAN_AAKEN_DOI}>van Aaken et al., Arch Orthop Trauma Surg 2016</Cite>
const FRANCE = <Cite doi={FRANCE_DOI}>France et al., Hand 2023</Cite>
const LAMRASKI = <Cite doi={LAMRASKI_DOI}>Lamraski et al., J Orthop Res 2006</Cite>
const QIU = <Cite doi={QIU_DOI}>Qiu et al., J Hand Surg Glob Online 2027</Cite>
const SLETTEN = <Cite doi={SLETTEN_DOI}>Sletten et al., J Hand Surg Eur 2013</Cite>
const LEUNG = <Cite doi={LEUNG_DOI}>Leung et al., J Hand Surg Am 2002</Cite>
const LOWDON = <Cite doi={LOWDON_DOI}>Lowdon, Injury 1986</Cite>
const DAHER = <Cite doi={DAHER_DOI}>Daher et al., JPRAS Open 2023</Cite>
const LIVERNEAUX = <Cite doi={LIVERNEAUX_DOI}>Liverneaux et al., J Hand Surg Eur 2015</Cite>
const ELFAR = <Cite doi={ELFAR_DOI}>Elfar and Mann, J Am Acad Orthop Surg 2013</Cite>
const CAGGIANO = <Cite doi={CAGGIANO_DOI}>Caggiano et al., Hand Clin 2018</Cite>
const YANG = <Cite doi={YANG_DOI}>Yang et al., Chin Med J 2020</Cite>
const MORADI = <Cite doi={MORADI_DOI}>Moradi et al., J Hand Surg Eur 2017</Cite>
const KALAINOV = <Cite doi={KALAINOV_DOI}>Kalainov et al., J Hand Surg Am 2005</Cite>
const WEHBE = <Cite doi={WEHBE_DOI}>Wehbé and Schneider, J Bone Joint Surg Am 1984</Cite>
const LIN = <Cite doi={LIN_DOI}>Lin and Samora, J Hand Surg Am 2018</Cite>
const MADAN = <Cite doi={MADAN_DOI}>Madan et al., Orthop Surg 2014</Cite>
const RITTING = <Cite doi={RITTING_DOI}>Ritting et al., Clin J Sport Med 2010</Cite>
const MIKHAIL = <Cite doi={MIKHAIL_DOI}>Mikhail et al., Bone Jt Open 2024</Cite>
const DARYOUSH = <Cite doi={DARYOUSH_DOI}>Daryoush et al., J Hand Surg Am 2025</Cite>
const LEGERSTEE = <Cite doi={LEGERSTEE_DOI}>Legerstee et al., Hand 2026</Cite>
const MANTHEY = <Cite doi={MANTHEY_DOI}>Manthey et al., Ann Emerg Med 1996</Cite>
const GRON = <Cite doi={GRON_DOI}>Grøn et al., Injury 1986</Cite>
const KOLLITZ = <Cite doi={KOLLITZ_DOI}>Kollitz et al., Hand 2014</Cite>

const references: LessonReference[] = [
  { citation: 'Expert Panel on Musculoskeletal Imaging; Torabi M, Lenchik L, Beaman FD, Wessell DE, Bussell JK, Cassidy RC, Czuczman GJ, Demertzis JL, Khurana B, Klitzke A, Motamedi K, Pierce JL, Sharma A, Walker EA, Kransdorf MJ. ACR Appropriateness Criteria® Acute Hand and Wrist Trauma. J Am Coll Radiol. 2019;16(5S):S7-S17.', doi: ACR_DOI },
  { citation: 'Southall C, Friebel TR, Gardiner S, Nikkhah D. Radiographic views for hand fractures - call for three-view national UK guidelines - a quality improvement study. Int J Surg. 2023;109(7):1919-1922.', doi: SOUTHALL_DOI },
  { citation: 'Czarnecki P, Siemionow M, Baek GH, Górecki M, Romanowski L. Hand and wrist - what the hand surgeon wants to know from the radiologist. Pol J Radiol. 2024;89:e70-e79.', doi: CZARNECKI_DOI },
  { citation: 'Smithuis FF, Groepenhoff F, Vuurberg G, Maas M. Common mistakes in wrist and hand trauma. Semin Musculoskelet Radiol. 2025;29(5):682-694.', doi: SMITHUIS_DOI },
  { citation: 'Deuschl J, Alfort H, Wilcke M. The epidemiology of metacarpal fractures: a descriptive study based on 18,802 fractures from the Swedish Fracture Register. J Hand Surg Glob Online. 2025;7(4):100725.', doi: DEUSCHL_DOI },
  { citation: 'Fisher MR, Rogers LF, Hendrix RW. Systematic approach to identifying fourth and fifth carpometacarpal joint dislocations. AJR Am J Roentgenol. 1983;140(2):319-324.', doi: FISHER_DOI },
  { citation: 'Steinmetz G, Corning E, Hulse T, Fitzgerald C, Holy F, Boydstun S, Lehman T. Carpometacarpal fracture-dislocations: a retrospective review of injury characteristics and radiographic outcomes. Hand (N Y). 2021;16(3):362-367.', doi: STEINMETZ_DOI },
  { citation: 'Sendek G, Reghunathan M, Beeson S, Ewing E, Hinchcliff KM. Do computerized tomography scans change management in carpometacarpal dislocations and fracture-dislocations? Hand (N Y). 2025;20(1):27-31.', doi: SENDEK_DOI },
  { citation: 'Büren C, Gehrmann S, Kaufmann R, Windolf J, Lögters T. Management algorithm for index through small finger carpometacarpal fracture dislocations. Eur J Trauma Emerg Surg. 2016;42(1):37-42.', doi: BUREN_DOI },
  { citation: 'van Aaken J, Fusetti C, Luchina S, Brunetti S, Beaulieu JY, Gayet-Ageron A, Hanna K, Shin AY, Hofmeister E. Fifth metacarpal neck fractures treated with soft wrap/buddy taping compared to reduction and casting: results of a prospective, multicenter, randomized trial. Arch Orthop Trauma Surg. 2016;136(1):135-142.', doi: VAN_AAKEN_DOI },
  { citation: 'France TJ, Leversedge FJ, Lauder A. Clinical outcomes of severely angulated fifth metacarpal neck fractures treated nonsurgically. Hand (N Y). 2023;18(4):604-611.', doi: FRANCE_DOI },
  { citation: 'Lamraski G, Monsaert A, De Maeseneer M, Haentjens P. Reliability and validity of plain radiographs to assess angulation of small finger metacarpal neck fractures: human cadaveric study. J Orthop Res. 2006;24(1):37-45.', doi: LAMRASKI_DOI },
  { citation: 'Qiu RY, Ludwig T, Munn A, Tarcea A, Hasselaar CM, Frizzell B, Brown JJY, Boyd SK, Ramji M, Sayre EC, White N, Hiscox C. Oblique hand radiograph as a method to measure fifth metacarpal neck fracture angulation. J Hand Surg Glob Online. 2027;9(1):101108.', doi: QIU_DOI },
  { citation: 'Sletten IN, Nordsletten L, Hjorthaug GA, Hellund JC, Holme I, Kvernmo HD. Assessment of volar angulation and shortening in 5th metacarpal neck fractures: an inter- and intra-observer validity and reliability study. J Hand Surg Eur Vol. 2013;38(6):658-666.', doi: SLETTEN_DOI },
  { citation: 'Leung YL, Beredjiklian PK, Monaghan BA, Bozentka DJ. Radiographic assessment of small finger metacarpal neck fractures. J Hand Surg Am. 2002;27(3):443-448.', doi: LEUNG_DOI },
  { citation: 'Lowdon IM. Fractures of the metacarpal neck of the little finger. Injury. 1986;17(3):189-192.', doi: LOWDON_DOI },
  { citation: "Daher M, Roukoz S, Ghoul A, Tarchichi J, Aoun M, Sebaaly A. Management of Bennett's fracture: a systematic review and meta-analysis. JPRAS Open. 2023;38:206-216.", doi: DAHER_DOI },
  { citation: 'Liverneaux PA, Ichihara S, Hendriks S, Facca S, Bodin F. Fractures and dislocation of the base of the thumb metacarpal. J Hand Surg Eur Vol. 2015;40(1):42-50.', doi: LIVERNEAUX_DOI },
  { citation: 'Elfar J, Mann T. Fracture-dislocations of the proximal interphalangeal joint. J Am Acad Orthop Surg. 2013;21(2):88-98.', doi: ELFAR_DOI },
  { citation: 'Caggiano NM, Harper CM, Rozental TD. Management of proximal interphalangeal joint fracture dislocations. Hand Clin. 2018;34(2):149-165.', doi: CAGGIANO_DOI },
  { citation: 'Yang Y, Zhang WG, Li ZZ, Chen SL, Tian W. Anatomical and clinical study of a new mallet fracture classification method. Chin Med J (Engl). 2020;133(6):657-663.', doi: YANG_DOI },
  { citation: 'Moradi A, Braun Y, Oflazoglu K, Meijs T, Ring D, Chen N. Factors associated with subluxation in mallet fracture. J Hand Surg Eur Vol. 2017;42(2):176-181.', doi: MORADI_DOI },
  { citation: 'Kalainov DM, Hoepfner PE, Hartigan BJ, Carroll C, Genuario J. Nonsurgical treatment of closed mallet finger fractures. J Hand Surg Am. 2005;30(3):580-586.', doi: KALAINOV_DOI },
  { citation: 'Wehbé MA, Schneider LH. Mallet fractures. J Bone Joint Surg Am. 1984;66(5):658-669.', doi: WEHBE_DOI },
  { citation: 'Lin JS, Samora JB. Surgical and nonsurgical management of mallet finger: a systematic review. J Hand Surg Am. 2018;43(2):146-163.e2.', doi: LIN_DOI },
  { citation: 'Madan SS, Pai DR, Kaur A, Dixit R. Injury to ulnar collateral ligament of thumb. Orthop Surg. 2014;6(1):1-7.', doi: MADAN_DOI },
  { citation: 'Ritting AW, Baldwin PC, Rodner CM. Ulnar collateral ligament injury of the thumb metacarpophalangeal joint. Clin J Sport Med. 2010;20(2):106-112.', doi: RITTING_DOI },
  { citation: 'Mikhail M, Riley N, Rodrigues J, Carr E, Horton R, Beale N, Beard DJ, Dean BJF; UCL TEAR Collaborative. The management of acute complete ruptures of the ulnar collateral ligament of the thumb. Bone Jt Open. 2024;5(8):708-714.', doi: MIKHAIL_DOI },
  { citation: 'Daryoush JR, Roca H, Garcia BN, Kazmers NH. The displaced fleck sign: description of a radiographic finding consistent with grade III thumb ulnar collateral ligament tears with Stener lesions. J Hand Surg Am. 2025;50(10):1276.e1-1276.e6.', doi: DARYOUSH_DOI },
  { citation: 'Legerstee IWF, Kooi K, Hoftiezer YAJ, Lipson SM, Aldasooky R, Kanaan R, Nelissen RGHH, Bhashyam AR, Chen NC, Eberlin KR. A morphologic analysis of thumb ulnar collateral ligament avulsion fracture fragments and risk factors for surgical treatment. Hand (N Y). 2026;21(2):260-264.', doi: LEGERSTEE_DOI },
  { citation: 'Manthey DE, Storrow AB, Milbourn JM, Wagner BJ. Ultrasound versus radiography in the detection of soft-tissue foreign bodies. Ann Emerg Med. 1996;28(1):7-9.', doi: MANTHEY_DOI },
  { citation: 'Grøn P, Andersen K, Vraa A. Detection of glass foreign bodies by radiography. Injury. 1986;17(6):404-406.', doi: GRON_DOI },
  { citation: 'Kollitz KM, Hammert WC, Vedder NB, Huang JI. Metacarpal fractures: treatment and complications. Hand (N Y). 2014;9(1):16-23.', doi: KOLLITZ_DOI },
]

/* PIP stability by the share of the articular surface (H4-2), and the mallet sources side by side (H4-8 to H4-10). */

const pipTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Volar lip fragment</th><th>Elfar and Mann</th></tr>
      </thead>
      <tbody>
        <tr><td>Under 30% of the articular surface</td><td className="vessel-name">Typically stable</td></tr>
        <tr><td>30% to 50%</td><td className="vessel-name">Tenuous (hard to predict)</td></tr>
        <tr><td>Over 50%</td><td className="vessel-name">Often unstable</td></tr>
        <tr><td>V sign on the lateral</td><td className="vessel-name">Not concentrically reduced</td></tr>
      </tbody>
    </table>
  </div>
)

const malletTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Source</th><th>Fragment size and subluxation</th></tr>
      </thead>
      <tbody>
        <tr><td>Moradi 2017</td><td>No subluxation under 39% of the joint surface; above it, risk up 4% per 1%</td></tr>
        <tr><td>Kalainov 2005</td><td>Surgery has been favoured over a third, or with subluxation; nonsurgical results were acceptable</td></tr>
        <tr><td>Wehbé and Schneider 1984</td><td>Most can be treated conservatively, ignoring subluxation and size</td></tr>
        <tr><td>Lin and Samora 2018</td><td>Insufficient evidence for when surgery is indicated</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Why the film: the injury and the views',
    body: (
      <>
        <p>This lesson is for an adult's hand, finger or thumb radiographs after an injury. The order of the steps, the views checklist and the report wording are this site's own.</p>
        <p>There is no decision rule for the hand like the Ottawa rules for the knee and ankle in the sources read here. For acute blunt or penetrating trauma to the hand or wrist, the ACR rates radiographs usually appropriate (9) as the first imaging, and in most cases they give the treating clinician enough information ({ACR}).</p>
        <p>Take three views: a frontal, an oblique and a lateral. Two views are inadequate for finding fractures of the hand and fingers, yet in Southall's audit the lateral was the view most often missing for metacarpal fractures and the oblique for phalangeal fractures. They define a high suspicion of fracture as swelling, bruising or deformity ({SOUTHALL}). For a PIP joint injury, add AP and lateral views centred on the joint of the injured digit to the three views of the hand ({ELFAR}).</p>
        <h3>The mechanism</h3>
        <ul className="plain-list">
          <li><strong>A punch:</strong> in men the commonest metacarpal fracture is a distal extra-articular fracture of the fifth metacarpal, and in women a fifth shaft fracture ({DEUSCHL}). A blow with a closed fist is also the commonest cause of a carpometacarpal (CMC) injury ({STEINMETZ}).</li>
          <li><strong>An axial load on a flexed finger:</strong> the commonest result at the PIP joint is a dorsal fracture-dislocation with a volar lip fracture of the middle phalanx ({CAGGIANO}).</li>
          <li><strong>Hyperextension of a finger:</strong> the volar plate fails by rupture or by avulsion of the volar lip of the middle phalanx ({ELFAR}).</li>
          <li><strong>The thumb forced into abduction and extension:</strong> the ulnar collateral ligament (UCL) of the MCP joint ({MADAN}).</li>
          <li><strong>Compression along the axis of the flexed thumb:</strong> the base of the thumb metacarpal ({LIVERNEAUX}).</li>
          <li><strong>A cut or puncture:</strong> look for a foreign body (step 5).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 2. Alignment and joints',
    body: (
      <>
        <h3>The carpometacarpal joints</h3>
        <p>CMC dislocations are rare, and their radiographic signs are subtle and easily overlooked. Fisher and colleagues read the fourth and fifth CMC joints by five principles: parallel joint lines, symmetry, overlapping articular surfaces, an indistinct cortical rim, and parallel M lines. Of their 17 dislocations, 71% were dorsal. In combined fourth and fifth dislocations, parallelism and symmetry are lost at the fourth joint and the surfaces overlap mainly at the fifth, and a fracture of the fourth metacarpal base often goes with it. In a solitary fifth dislocation, the most consistent sign is slight ulnar offset of the fifth metacarpal on the hamate, often with a fracture of the radial margin of the fifth base ({FISHER}).</p>
        <p>The fourth and fifth CMC joints are injured most often, frequently with fractures of the metacarpal bases and the distal carpal row, and a delayed diagnosis makes closed reduction difficult ({STEINMETZ}). Plain radiographs can mislead ({CZARNECKI}). The carpal injuries that come with these dislocations are often hard to see on radiographs; CT changed the operative plan in 58% of Sendek's cases, and the authors advise CT routinely ({SENDEK}). With a clinical or radiographic suspicion of a CMC dislocation, thin-slice CT should be considered ({BUREN}).</p>
        <h3>The finger and thumb joints</h3>
        <p>Say whether each MCP and interphalangeal joint is congruent. When radiographs show malalignment of an MCP, PIP or DIP joint without a fracture, the ACR rates MRI without contrast 9 and ultrasound 7 as the next test ({ACR}). The V sign at the PIP joint is in step 4.</p>
      </>
    ),
  },
  {
    id: 'metacarpals',
    title: 'Step 3. Metacarpals',
    body: (
      <>
        <p>Metacarpal fractures are 18% to 44% of hand fractures; the non-thumb metacarpals account for about 88% of them, the fifth most often ({KOLLITZ}). In the Swedish register's 18,802 fractures, the fifth metacarpal was 57%; shaft fractures were commonest in the third and fourth metacarpals and distal fractures in the second and fifth ({DEUSCHL}).</p>
        <h3>The fifth metacarpal neck (boxer's fracture)</h3>
        <p>Measure the apex dorsal angulation and say which view it was measured on. On the lateral, the angle between the shaft axis and the line from the centre of the head to the fracture was valid in cadavers, while on the oblique view it was biased ({LAMRASKI}); Sletten took the lateral mid-medullary method as the reference, and estimated shortening against a line through the heads of the third and fourth metacarpals ({SLETTEN}). Against that, Qiu found the oblique view matched sagittal CT (42.6° on both) and was reliable, noting that metacarpal overlap makes the lateral hard to measure and that obliques have been said to exaggerate the angle by up to 35° ({QIU}). The normal head-shaft angle on an oblique view was 26° ({LOWDON}), and agreement between surgeons measuring the angle was only slight ({LEUNG}).</p>
        <p>How much angulation is accepted differs. Van Aaken's trial took fractures with palmar angulation up to 70° and no rotational deformity, in which soft wrap and buddy taping was noninferior to reduction and casting ({VAN_AAKEN}); France reported acceptable patient-rated outcomes in 15 healed fractures angulated over 70° on obliques ({FRANCE}). Rotational deformity is a clinical finding, so the form records it only if the request states it.</p>
        <h3>Shaft, head and base</h3>
        <p>Extra-articular fractures can usually be treated without surgery, except a severely displaced shaft fracture with a disrupted axis. Fractures into the CMC, MCP or PIP joints often have displaced articular fragments, rotational misalignment, angulation or shortening; standard views are often not enough, and CT, increasingly cone-beam CT, is used ({CZARNECKI}). A fracture of the fourth or fifth metacarpal base sends you back to the CMC joints ({FISHER}).</p>
        <h3>The thumb metacarpal</h3>
        <p>Liverneaux and colleagues distinguish trapeziometacarpal dislocations, small- and large-fragment Bennett fractures, three-fragment articular Rolando and comminuted fractures, and extra-articular fractures of the base; all risk narrowing the first web ({LIVERNEAUX}). A Bennett fracture is an intra-articular fracture of the first metacarpal with dislocation of the CMC joint: the shaft, the largest fragment, is pulled by abductor pollicis longus and adductor pollicis, while the palmar oblique ligament holds the small volar fragment ({DAHER}).</p>
      </>
    ),
  },
  {
    id: 'phalanges',
    title: 'Step 4. Phalanges, the PIP joint, mallet and the thumb UCL',
    body: (
      <>
        <h3>The PIP joint</h3>
        <p>PIP fracture-dislocations are dorsal (a dorsal dislocation with a fracture of the volar lip of the middle phalanx), volar (a volar dislocation with a fracture of the dorsal lip) or pilon (both lips) ({ELFAR}). A volar lip fragment is the volar plate avulsed in hyperextension; a dorsal lip fragment is the central slip avulsed in hyperflexion ({ELFAR}).</p>
        <p>Estimate the share of the middle phalanx's articular surface the volar lip fragment carries: under 30% is typically stable, over 50% often unstable, and 30% to 50% tenuous, though no study has defined strict criteria. A V sign, the dorsal articular surfaces diverging on the lateral, means the joint is not concentrically reduced. A displaced pilon fracture is unstable, and a depressed articular fracture that is not well seen needs radiographs under traction or CT ({ELFAR}). Kang and Stern found central slip function restored without surgery when the dorsal fragment was displaced 2 mm or less ({ELFAR}).</p>
        {pipTable}
        <p>Subluxation after a volar plate avulsion or a middle phalanx base fracture is often underestimated ({CZARNECKI}), and a fracture-dislocation that presents late has a poor chance of regaining normal motion ({CAGGIANO}).</p>
        <h3>Mallet fracture</h3>
        <p>A mallet fracture is avulsion of the terminal extensor tendon from the base of the distal phalanx with a bony fragment ({YANG}). Give the share of the articular surface and say whether the distal phalanx is subluxed palmarwards, since these are what the sources turn on, though they draw different conclusions: subluxation was not seen under 39% ({MORADI}); surgery has been favoured over a third or with subluxation, yet such fractures did well without it ({KALAINOV}); most can be treated conservatively, ignoring both ({WEHBE}); and the evidence does not show when surgery is indicated ({LIN}).</p>
        {malletTable}
        <h3>The thumb ulnar collateral ligament</h3>
        <p>The UCL is the primary restraint to valgus stress at the thumb MCP joint, and its injury is often missed in emergency departments; the diagnosis is best made clinically, with MRI the imaging of choice ({MADAN}). "Gamekeeper's thumb" is properly a chronic attenuation and "skier's thumb" an acute injury; no solid endpoint on valgus stress, in extension and in 30° of flexion, means a complete rupture ({RITTING}). In a Stener lesion the ligament is torn and retracted, with the adductor aponeurosis between it and its insertion; in a UK survey hand surgeons used ultrasound more than MRI to look for one ({MIKHAIL}).</p>
        <p>On the radiograph, look for a fleck at the ulnar base of the proximal phalanx. A fleck displaced proximal to the MCP joint line, the displaced fleck sign, was seen in 7.5% of UCL injuries and had a positive predictive value of 100% for a grade III rupture and 94.1% for a Stener lesion ({DARYOUSH}). With an avulsion fracture, MCP instability rather than the size of the fragment went with surgery ({LEGERSTEE}). For a hand fracture with a suspected ligament or tendon injury, the ACR rates MRI 9 and ultrasound 7 ({ACR}).</p>
        <h3>Other phalangeal fractures</h3>
        <p>Give the phalanx, the site, whether the fracture enters the joint and whether it is displaced. Fractures into the joint often need more than the standard views ({CZARNECKI}).</p>
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Soft tissues and foreign bodies',
    body: (
      <>
        <p>Swelling, bruising or deformity raise the suspicion of a fracture ({SOUTHALL}). After a cut or puncture, look for a foreign body. In a tissue model, radiographs found radiopaque foreign bodies (gravel, glass, metal) 98% of the time and never found radiolucent ones (wood, plastic, a cactus spine) ({MANTHEY}). Glass was seen on radiographs in 25 of 26 patients; in 9 it had been missed at earlier visits where the wound was only inspected or probed ({GRON}). When a foreign body is still suspected and the radiographs are negative, the ACR rates ultrasound 9, CT 7 and MRI 6 ({ACR}).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    body: (
      <>
        <p>Signs on hand radiographs are often subtle, and satisfaction of search leaves the assessment incomplete; the common errors include overlooking soft-tissue injury and not imaging further when suspicion persists ({SMITHUIS}). So finish the search before writing: the CMC joints after any metacarpal base fracture, the PIP joint's congruence after any volar fragment, and the soft tissues after any wound.</p>
        <p>Answer the clinical question first, put the abnormal findings first, and keep incidental findings apart ({CZARNECKI}). When the films are negative or equivocal and a fracture is still suspected, the ACR rates repeat radiographs in 10 to 14 days 8, MRI 8 and CT 7 ({ACR}). The report names further imaging only where a source supports it: CT for a CMC injury ({SENDEK}; {BUREN}), CT or traction views for a depressed articular fracture ({ELFAR}), MRI or ultrasound for a ligament injury or a joint malalignment without fracture ({ACR}), and ultrasound for a suspected foreign body ({ACR}).</p>
      </>
    ),
  },
]

/* The report. */

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, except a name such as Bennett or an abbreviation. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) && !/^(Bennett|Rolando|Fisher)/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

function join(parts: (string | false | undefined)[], separator = ', '): string {
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
const noYes: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]
const RAYS: Option[] = [
  { value: 'second', label: 'Index (2nd)' },
  { value: 'third', label: 'Middle (3rd)' },
  { value: 'fourth', label: 'Ring (4th)' },
  { value: 'fifth', label: 'Little (5th)' },
]

const area = (v: Values) => str(v, 'area')
/** The finger metacarpals and CMC joints are asked about on a hand series (or before the area is chosen). */
const showsHand = (v: Values) => !['finger', 'thumb'].includes(area(v))
/** The thumb metacarpal and UCL are asked about unless the film is of a finger. */
const showsThumb = (v: Values) => area(v) !== 'finger'
/** The PIP joint is asked about unless the film is of the thumb. */
const showsFingers = (v: Values) => area(v) !== 'thumb'
const isPresent = (id: string) => (v: Values) => str(v, id) === 'present'

const mcSite = (v: Values) => str(v, 'mc-site')
const neckOrShaft = (v: Values) => ['neck', 'shaft'].includes(mcSite(v))
const fifthNeck = (v: Values) => str(v, 'mc') === 'present' && str(v, 'mc-ray') === 'fifth' && mcSite(v) === 'neck'
const cmcAbnormal = (v: Values) => str(v, 'cmc') === 'abnormal'
const jointsDislocated = (v: Values) => str(v, 'joints') === 'dislocated'
const pip = (v: Values) => str(v, 'pip')

const fields = {
  area: { id: 'area', kind: 'choice', label: 'Area imaged', required: true, options: [
    { value: 'hand', label: 'Hand' },
    { value: 'finger', label: 'Finger' },
    { value: 'thumb', label: 'Thumb' },
  ] },
  side: { id: 'side', kind: 'choice', label: 'Side', required: true, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ] },
  digit: { id: 'digit', kind: 'choice', label: 'Finger', showIf: (v) => area(v) === 'finger', options: [
    { value: 'index', label: 'Index' },
    { value: 'middle', label: 'Middle' },
    { value: 'ring', label: 'Ring' },
    { value: 'little', label: 'Little' },
  ] },
  mechanism: { id: 'mechanism', kind: 'multi', label: 'Mechanism', options: [
    { value: 'punch', label: 'Punch or blow with a closed fist' },
    { value: 'axial', label: 'Axial load on a flexed finger (jammed finger)' },
    { value: 'hyperextension', label: 'Finger forced into hyperextension' },
    { value: 'thumb-abduction', label: 'Thumb forced into abduction or extension' },
    { value: 'thumb-axial', label: 'Axial load along the flexed thumb' },
    { value: 'crush', label: 'Crush' },
    { value: 'penetrating', label: 'Cut or puncture' },
  ] },
  views: { id: 'views', kind: 'choice', label: 'Views', required: true, help: 'A frontal, an oblique and a lateral; for a PIP injury, views centred on the joint as well.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'frontal', label: 'Frontal (PA)' },
    { value: 'oblique', label: 'Oblique' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'joint', label: 'Views centred on the injured joint' },
  ] },

  // H2-1: Fisher's principles.
  cmc: { id: 'cmc', kind: 'choice', label: 'Carpometacarpal joints (index to little)', required: true, showIf: showsHand, help: 'Parallel joint lines, symmetry, no overlap, sharp cortical rims, parallel M lines.', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Dislocated or subluxed' },
  ] },
  cmcRays: { id: 'cmc-rays', kind: 'multi', label: 'Rays', showIf: cmcAbnormal, options: RAYS },
  cmcDirection: { id: 'cmc-direction', kind: 'choice', label: 'Direction', showIf: cmcAbnormal, options: [
    { value: 'dorsal', label: 'Dorsal' },
    { value: 'volar', label: 'Volar' },
    { value: 'unclear', label: 'Not clear' },
  ] },
  cmcSigns: { id: 'cmc-signs', kind: 'multi', label: 'Signs', showIf: cmcAbnormal, options: [
    { value: 'parallel', label: 'Joint lines not parallel' },
    { value: 'symmetry', label: 'Loss of symmetry' },
    { value: 'overlap', label: 'Overlapping articular surfaces' },
    { value: 'rim', label: 'Indistinct cortical rim' },
    { value: 'm-lines', label: 'M lines not parallel' },
    { value: 'offset', label: 'Fifth metacarpal offset ulnarwards on the hamate' },
  ] },
  cmcFractures: { id: 'cmc-fractures', kind: 'multi', label: 'Fractures with it', showIf: cmcAbnormal, options: [
    { value: 'fourth-base', label: 'Fourth metacarpal base' },
    { value: 'fifth-base', label: 'Fifth metacarpal base' },
    { value: 'carpal', label: 'Hamate or another distal carpal bone' },
  ] },
  joints: { id: 'joints', kind: 'choice', label: 'Finger and thumb joints (MCP, PIP, DIP, IP)', required: true, options: [
    { value: 'congruent', label: 'Congruent' },
    { value: 'dislocated', label: 'Dislocated or subluxed' },
  ] },
  jointWhich: { id: 'joint-which', kind: 'multi', label: 'Joint', showIf: jointsDislocated, options: [
    { value: 'mcp', label: 'MCP' },
    { value: 'pip', label: 'PIP' },
    { value: 'dip', label: 'DIP' },
    { value: 'thumb-mcp', label: 'Thumb MCP' },
    { value: 'thumb-ip', label: 'Thumb IP' },
  ] },
  jointDirection: { id: 'joint-direction', kind: 'choice', label: 'Direction', showIf: jointsDislocated, options: [
    { value: 'dorsal', label: 'Dorsal' },
    { value: 'volar', label: 'Volar' },
    { value: 'lateral', label: 'Radial or ulnar' },
  ] },

  mc: { id: 'mc', kind: 'choice', label: 'Metacarpal fracture (index to little)', required: true, showIf: showsHand, options: nonePresent },
  mcRay: { id: 'mc-ray', kind: 'choice', label: 'Metacarpal', showIf: isPresent('mc'), options: RAYS },
  mcSite: { id: 'mc-site', kind: 'choice', label: 'Site', showIf: isPresent('mc'), options: [
    { value: 'head', label: 'Head' },
    { value: 'neck', label: 'Neck' },
    { value: 'shaft', label: 'Shaft' },
    { value: 'base', label: 'Base' },
  ] },
  mcPattern: { id: 'mc-pattern', kind: 'choice', label: 'Pattern', showIf: (v) => mcSite(v) === 'shaft', options: [
    { value: 'transverse', label: 'Transverse' },
    { value: 'oblique', label: 'Oblique' },
    { value: 'spiral', label: 'Spiral' },
    { value: 'comminuted', label: 'Comminuted' },
  ] },
  mcAngulation: { id: 'mc-angulation', kind: 'number', label: 'Apex dorsal angulation', unit: '°', min: 0, max: 90, step: 1, showIf: neckOrShaft },
  // H3-4, H3-5: the view matters, so it is asked.
  mcView: { id: 'mc-view', kind: 'choice', label: 'Angulation measured on', showIf: neckOrShaft, options: [
    { value: 'lateral', label: 'Lateral' },
    { value: 'oblique', label: 'Oblique' },
  ] },
  mcShortening: { id: 'mc-shortening', kind: 'number', label: 'Shortening', unit: 'mm', min: 0, max: 30, step: 0.5, showIf: neckOrShaft, help: 'For the fifth: against a line through the heads of the third and fourth (Sletten).' },
  mcArticular: { id: 'mc-articular', kind: 'choice', label: 'Into the joint', showIf: (v) => ['head', 'base'].includes(mcSite(v)), options: noYes },
  mcRotation: { id: 'mc-rotation', kind: 'choice', label: 'Rotational deformity (clinical, if stated)', showIf: isPresent('mc'), options: [
    { value: 'not-stated', label: 'Not stated' },
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },

  // H3-8, H3-9.
  thumb: { id: 'thumb', kind: 'choice', label: 'Thumb metacarpal', required: true, showIf: showsThumb, options: [
    { value: 'none', label: 'No fracture or dislocation' },
    { value: 'bennett', label: 'Bennett: fracture into the base, shaft subluxed' },
    { value: 'rolando', label: 'Rolando: three-part or comminuted, into the base' },
    { value: 'extra', label: 'Base fracture outside the joint' },
    { value: 'shaft', label: 'Shaft or neck fracture' },
    { value: 'dislocation', label: 'Trapeziometacarpal dislocation, no fracture' },
  ] },

  // H4-1 to H4-6.
  pip: { id: 'pip', kind: 'choice', label: 'Middle phalanx base (PIP joint)', required: true, showIf: showsFingers, options: [
    { value: 'none', label: 'No fracture' },
    { value: 'volar', label: 'Volar lip fragment (volar plate)' },
    { value: 'dorsal', label: 'Dorsal lip fragment (central slip)' },
    { value: 'pilon', label: 'Both lips, comminuted (pilon)' },
  ] },
  pipPercent: { id: 'pip-percent', kind: 'number', label: 'Fragment: share of the articular surface', unit: '%', min: 0, max: 100, step: 5, showIf: (v) => pip(v) === 'volar', help: 'Under 30% typically stable, 30–50% tenuous, over 50% often unstable.' },
  pipJoint: { id: 'pip-joint', kind: 'choice', label: 'PIP joint on the lateral', showIf: (v) => pip(v) === 'volar', options: [
    { value: 'congruent', label: 'Congruent' },
    { value: 'subluxed', label: 'Middle phalanx subluxed dorsally' },
  ] },
  vSign: { id: 'v-sign', kind: 'choice', label: 'V sign', showIf: (v) => pip(v) === 'volar', help: 'The dorsal articular surfaces diverge in a V on the lateral.', options: noYes },
  csDisplacement: { id: 'cs-displacement', kind: 'number', label: 'Fragment displacement', unit: 'mm', min: 0, max: 20, step: 0.5, showIf: (v) => pip(v) === 'dorsal' },
  pilonDisplaced: { id: 'pilon-displaced', kind: 'choice', label: 'Displacement', showIf: (v) => pip(v) === 'pilon', options: [
    { value: 'undisplaced', label: 'Undisplaced' },
    { value: 'displaced', label: 'Displaced' },
  ] },
  mallet: { id: 'mallet', kind: 'choice', label: 'Bony mallet (dorsal base of the distal phalanx)', required: true, options: nonePresent },
  malletPercent: { id: 'mallet-percent', kind: 'number', label: 'Fragment: share of the articular surface', unit: '%', min: 0, max: 100, step: 5, showIf: isPresent('mallet') },
  malletJoint: { id: 'mallet-joint', kind: 'choice', label: 'DIP joint', showIf: isPresent('mallet'), options: [
    { value: 'congruent', label: 'Congruent' },
    { value: 'subluxed', label: 'Distal phalanx subluxed palmarwards' },
  ] },
  ucl: { id: 'ucl', kind: 'choice', label: 'Thumb UCL avulsion (ulnar base of the proximal phalanx)', required: true, showIf: showsThumb, options: nonePresent },
  uclFragment: { id: 'ucl-fragment', kind: 'choice', label: 'The fragment', showIf: isPresent('ucl'), options: [
    { value: 'at-joint', label: 'At the joint line' },
    { value: 'displaced', label: 'Displaced proximal to the MCP joint line' },
  ] },
  phalanx: { id: 'phalanx', kind: 'choice', label: 'Other phalangeal fracture', required: true, help: 'Any fracture not covered by the PIP, mallet and UCL questions.', options: nonePresent },
  phBone: { id: 'ph-bone', kind: 'choice', label: 'Phalanx', showIf: isPresent('phalanx'), options: [
    { value: 'proximal', label: 'Proximal' },
    { value: 'middle', label: 'Middle' },
    { value: 'distal', label: 'Distal' },
  ] },
  phSite: { id: 'ph-site', kind: 'choice', label: 'Site', showIf: isPresent('phalanx'), options: [
    { value: 'base', label: 'Base' },
    { value: 'shaft', label: 'Shaft' },
    { value: 'neck', label: 'Neck' },
    { value: 'head', label: 'Head (condyles)' },
  ] },
  phArticular: { id: 'ph-articular', kind: 'choice', label: 'Into the joint', showIf: isPresent('phalanx'), options: noYes },
  phDisplaced: { id: 'ph-displaced', kind: 'choice', label: 'Displacement', showIf: isPresent('phalanx'), options: [
    { value: 'undisplaced', label: 'Undisplaced' },
    { value: 'displaced', label: 'Displaced or angulated' },
  ] },

  swelling: { id: 'swelling', kind: 'choice', label: 'Soft-tissue swelling', options: nonePresent },
  swellingSite: { id: 'swelling-site', kind: 'text', label: 'Where', showIf: isPresent('swelling'), placeholder: 'e.g. over the fifth metacarpal head' },
  // H5-1 to H5-3.
  fb: { id: 'fb', kind: 'choice', label: 'Foreign body', required: true, options: [
    { value: 'none', label: 'None seen, none suspected' },
    { value: 'seen', label: 'Radiopaque foreign body seen' },
    { value: 'suspected', label: 'Suspected, none seen' },
  ] },
  fbSite: { id: 'fb-site', kind: 'text', label: 'Where and how large', showIf: (v) => str(v, 'fb') === 'seen', placeholder: 'e.g. 4 mm, palmar to the third metacarpal head' },
  fbMaterial: { id: 'fb-material', kind: 'choice', label: 'Material, if known', showIf: (v) => str(v, 'fb') === 'suspected', options: [
    { value: 'glass', label: 'Glass' },
    { value: 'radiopaque', label: 'Metal or gravel' },
    { value: 'radiolucent', label: 'Wood, plastic or plant' },
    { value: 'unknown', label: 'Not known' },
  ] },

  stillSuspected: { id: 'still-suspected', kind: 'choice', label: 'Fracture still suspected clinically', showIf: (v) => noInjuryEntered(v), options: noYes },
  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. old healed fifth metacarpal neck fracture' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-dislocation', label: 'No dislocation' },
    { value: 'no-foreign-body', label: 'No radiopaque foreign body' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

/** The fractures entered, for the negatives. */
function fracturesEntered(values: Values): string[] {
  const thumb = str(values, 'thumb')
  return [
    str(values, 'mc') === 'present' && 'metacarpal fracture',
    ['bennett', 'rolando', 'extra', 'shaft'].includes(thumb) && 'thumb metacarpal fracture',
    ['volar', 'dorsal', 'pilon'].includes(pip(values)) && 'middle phalanx base fracture',
    str(values, 'mallet') === 'present' && 'bony mallet',
    str(values, 'ucl') === 'present' && 'thumb UCL avulsion',
    str(values, 'phalanx') === 'present' && 'phalangeal fracture',
    list(values, 'cmc-fractures').length > 0 && 'fracture with the CMC injury',
  ].filter((item): item is string => Boolean(item))
}

/** The dislocations entered, for the negatives. */
function dislocationsEntered(values: Values): string[] {
  return [
    cmcAbnormal(values) && 'CMC dislocation',
    jointsDislocated(values) && 'finger or thumb joint dislocation',
    ['bennett', 'dislocation'].includes(str(values, 'thumb')) && 'trapeziometacarpal subluxation or dislocation',
    pip(values) === 'volar' && (str(values, 'pip-joint') === 'subluxed' || str(values, 'v-sign') === 'yes') && 'PIP subluxation',
    str(values, 'mallet-joint') === 'subluxed' && 'DIP subluxation',
  ].filter((item): item is string => Boolean(item))
}

/** True once every bone and joint question shown is answered "none" (or normal). */
function noInjuryEntered(values: Values): boolean {
  const answered = (id: string, ok: string, shown: boolean) => !shown || str(values, id) === ok
  return answered('cmc', 'normal', showsHand(values))
    && str(values, 'joints') === 'congruent'
    && answered('mc', 'none', showsHand(values))
    && answered('thumb', 'none', showsThumb(values))
    && answered('pip', 'none', showsFingers(values))
    && str(values, 'mallet') === 'none'
    && answered('ucl', 'none', showsThumb(values))
    && str(values, 'phalanx') === 'none'
}

/** Over 70° at the fifth neck, or up to 70° (H3-2, H3-3); '' without an angle. */
function neckBand(values: Values): 'within' | 'over' | '' {
  const angle = num(values, 'mc-angulation')
  if (!fifthNeck(values) || angle === undefined) return ''
  return angle > 70 ? 'over' : 'within'
}

/** H4-2: Elfar and Mann's stability by the volar fragment's share of the joint; '' without a number. */
function pipStability(values: Values): string {
  const share = num(values, 'pip-percent')
  if (pip(values) !== 'volar' || share === undefined) return ''
  if (share < 30) return 'typically stable'
  return share > 50 ? 'often unstable' : 'tenuous stability'
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveTechnique(values: Values): Derived[] {
  const out: Derived[] = []
  // H1-1: the ACR rating for initial imaging.
  if (area(values)) out.push({ label: 'ACR', value: 'Radiographs usually appropriate (9) as the first imaging' })
  // H1-2: three views.
  if (str(values, 'views') === 'incomplete') out.push({ label: 'Views', value: 'Three views: two are inadequate for hand and finger fractures', tone: 'warn' })
  const mechanism = list(values, 'mechanism')
  // H1-4, H1-5: what each mechanism points to.
  if (mechanism.includes('punch')) out.push({ label: 'Punch', value: 'Fifth metacarpal neck and shaft; a closed-fist blow is the commonest cause of CMC injury' })
  if (mechanism.includes('axial')) out.push({ label: 'Axial load', value: 'Commonest: dorsal PIP fracture-dislocation with a volar lip fracture' })
  if (mechanism.includes('hyperextension')) out.push({ label: 'Hyperextension', value: 'Volar plate rupture or volar lip avulsion of the middle phalanx' })
  if (mechanism.includes('thumb-abduction')) out.push({ label: 'Thumb abduction', value: 'Ulnar collateral ligament of the MCP joint' })
  if (mechanism.includes('thumb-axial')) out.push({ label: 'Thumb axial load', value: 'Base of the thumb metacarpal' })
  if (mechanism.includes('penetrating')) out.push({ label: 'Wound', value: 'Look for a foreign body (step 5)' })
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  if (cmcAbnormal(values)) {
    // H2-1: Fisher's series.
    if (str(values, 'cmc-direction') === 'dorsal') out.push({ label: 'Direction', value: 'Dorsal, as were 71% in Fisher\'s series' })
    const rays = list(values, 'cmc-rays')
    if (rays.includes('fourth') && rays.includes('fifth')) out.push({ label: 'Fourth and fifth', value: 'Parallelism and symmetry lost at the fourth, overlap at the fifth; a fourth base fracture often goes with it' })
    else if (rays.includes('fifth')) out.push({ label: 'Fifth alone', value: 'Slight ulnar offset on the hamate; often a radial-margin fracture of the fifth base' })
    // H2-4: CT.
    out.push({ label: 'CT', value: 'Changed the operative plan in 58%; carpal fractures are often hard to see on radiographs', tone: 'warn' })
  }
  // H2-5: malalignment without fracture.
  if (jointsDislocated(values) && fracturesEntered(values).length === 0) out.push({ label: 'No fracture', value: 'Joint malalignment without fracture: MRI 9, ultrasound 7 (ACR)' })
  return out
}

function deriveMetacarpals(values: Values): Derived[] {
  const out: Derived[] = []
  if (str(values, 'mc') === 'present') {
    const site = mcSite(values)
    // H1-5, H3-2.
    if (fifthNeck(values)) out.push({ label: 'Boxer\'s fracture', value: 'Fifth neck: the fifth is 57% of metacarpal fractures' })
    // H3-4 to H3-6: which view.
    const view = str(values, 'mc-view')
    if (neckOrShaft(values) && view === 'oblique') out.push({ label: 'Oblique view', value: 'Validity disputed (biased in cadavers; matched CT in Qiu); normal neck angle 26° on the oblique', tone: 'warn' })
    if (neckOrShaft(values) && view === 'lateral') out.push({ label: 'Lateral view', value: 'The reference method (mid-medullary lines); overlap can make it hard to measure' })
    // H3-2, H3-3.
    const band = neckBand(values)
    if (band === 'within' && str(values, 'mc-rotation') === 'none') out.push({ label: 'Up to 70°', value: 'No rotation: the range in which soft wrap was noninferior to reduction (van Aaken)' })
    if (band === 'within' && str(values, 'mc-rotation') !== 'none') out.push({ label: 'Up to 70°', value: 'Van Aaken\'s trial range, which also required no rotational deformity' })
    if (band === 'over') out.push({ label: 'Over 70°', value: 'Beyond van Aaken\'s trial; France reported acceptable outcomes in 15 healed cases', tone: 'warn' })
    // H3-7: fractures into a joint.
    if (str(values, 'mc-articular') === 'yes') out.push({ label: 'Into the joint', value: 'Standard views are often not enough; CT (increasingly cone-beam) is used', tone: 'warn' })
    // H2-1, H2-2: a fourth or fifth base fracture and the CMC joints.
    if (site === 'base' && ['fourth', 'fifth'].includes(str(values, 'mc-ray'))) out.push({ label: 'CMC joints', value: 'A fourth or fifth base fracture often goes with a CMC dislocation: recheck step 2', tone: 'warn' })
  }
  const thumb = str(values, 'thumb')
  // H3-8: Bennett.
  if (thumb === 'bennett') out.push({ label: 'Bennett', value: 'Shaft pulled by abductor pollicis longus and adductor pollicis; volar fragment held by the palmar oblique ligament', tone: 'warn' })
  // H3-9: Rolando.
  if (thumb === 'rolando') out.push({ label: 'Rolando', value: 'Three-fragment or comminuted articular fracture of the base', tone: 'warn' })
  return out
}

function derivePhalanges(values: Values): Derived[] {
  const out: Derived[] = []
  // H4-2: the share of the articular surface.
  const stability = pipStability(values)
  if (stability) out.push({ label: 'Volar lip', value: upperFirst(stability), tone: stability === 'typically stable' ? 'neutral' : 'warn' })
  // H4-3: the V sign.
  if (pip(values) === 'volar' && str(values, 'v-sign') === 'yes') out.push({ label: 'V sign', value: 'Dorsal instability: the PIP joint is not concentrically reduced', tone: 'warn' })
  // H4-6: subluxation.
  if (pip(values) === 'volar' && str(values, 'pip-joint') === 'subluxed') out.push({ label: 'Subluxed', value: 'Often underestimated; late fracture-dislocations do poorly', tone: 'warn' })
  // H4-5: the central slip fragment.
  const csShift = num(values, 'cs-displacement')
  if (pip(values) === 'dorsal' && csShift !== undefined) {
    out.push(csShift <= 2
      ? { label: 'Central slip', value: '2 mm or less: function restored without surgery (Kang and Stern)' }
      : { label: 'Central slip', value: 'Over 2 mm: beyond Kang and Stern\'s nonsurgical group', tone: 'warn' })
  }
  // H4-4: pilon.
  if (pip(values) === 'pilon' && str(values, 'pilon-displaced') === 'displaced') out.push({ label: 'Pilon', value: 'Displaced: unstable; CT or traction views for a depressed surface', tone: 'warn' })
  if (str(values, 'mallet') === 'present') {
    const share = num(values, 'mallet-percent')
    // H4-8: Moradi.
    if (share !== undefined) {
      out.push(share < 39
        ? { label: 'Mallet', value: 'Under 39%: no subluxation was seen (Moradi)' }
        : { label: 'Mallet', value: '39% or more: subluxation risk rises 4% per 1% (Moradi)', tone: 'warn' })
    }
    // H4-9, H4-10: the features surgery has turned on, and the disagreement.
    if ((share !== undefined && share > 100 / 3) || str(values, 'mallet-joint') === 'subluxed') {
      out.push({ label: 'Over a third or subluxed', value: 'What surgery has been favoured for; nonsurgical results were acceptable and sources disagree', tone: 'warn' })
    }
  }
  if (str(values, 'ucl') === 'present') {
    // H4-14: the displaced fleck sign.
    if (str(values, 'ucl-fragment') === 'displaced') out.push({ label: 'Displaced fleck', value: 'Grade III rupture (PPV 100%), Stener lesion (PPV 94.1%)', tone: 'warn' })
    // H4-15, H4-16.
    out.push({ label: 'UCL', value: 'Instability, not fragment size, went with surgery; MRI 9, ultrasound 7 (ACR)' })
  }
  // H3-7: phalangeal fractures into a joint.
  if (str(values, 'phalanx') === 'present' && str(values, 'ph-articular') === 'yes') out.push({ label: 'Into the joint', value: 'Standard views are often not enough; CT (increasingly cone-beam) is used', tone: 'warn' })
  return out
}

function deriveSoftTissues(values: Values): Derived[] {
  const out: Derived[] = []
  const fb = str(values, 'fb')
  // H5-1: radiopaque bodies.
  if (fb === 'seen') out.push({ label: 'Radiopaque', value: 'Radiographs found gravel, glass and metal 98% of the time' })
  if (fb === 'suspected') {
    const material = str(values, 'fb-material')
    // H5-2: glass.
    if (material === 'glass') out.push({ label: 'Glass', value: 'Seen on radiographs in 25 of 26 patients: look again' })
    // H5-1: radiolucent bodies.
    if (material === 'radiolucent') out.push({ label: 'Radiolucent', value: 'Radiographs never showed wood, plastic or a cactus spine', tone: 'warn' })
    // H5-3: the next test.
    out.push({ label: 'Next', value: 'Ultrasound 9, CT 7, MRI 6 (ACR)', tone: 'warn' })
  }
  return out
}

function deriveImpression(values: Values): Derived[] {
  // H6-2: films negative, fracture still suspected.
  return str(values, 'still-suspected') === 'yes' && noInjuryEntered(values)
    ? [{ label: 'Still suspected', value: 'Repeat radiographs in 10–14 days 8, MRI 8, CT 7 (ACR)', tone: 'warn' }]
    : []
}

/* Report lines. */

const RAY_WORDS: Record<string, string> = { second: 'second (index)', third: 'third (middle)', fourth: 'fourth (ring)', fifth: 'fifth (little)' }
const RAY_SHORT: Record<string, string> = { second: '2nd', third: '3rd', fourth: '4th', fifth: '5th' }
const THUMB_WORDS: Record<string, string> = {
  bennett: 'Bennett fracture-dislocation of the thumb metacarpal base',
  rolando: 'Rolando (three-part or comminuted) intra-articular fracture of the thumb metacarpal base',
  extra: 'extra-articular fracture of the thumb metacarpal base',
  shaft: 'fracture of the thumb metacarpal shaft or neck',
  dislocation: 'trapeziometacarpal dislocation of the thumb, no fracture',
}

function studyLine(values: Values): string {
  const what = area(values)
  if (!what) return ''
  const digit = what === 'finger' && str(values, 'digit') ? `${picked(values, fields.digit)} ` : ''
  const side = str(values, 'side')
  return `Study: radiographs of the ${join([side && side.toLowerCase(), `${digit}${what}`], ' ')}`
}

function techniqueLines(values: Values): (string | false)[] {
  const views = str(values, 'views')
  const missing = chosen(values, fields.viewsMissing)
  const mechanism = chosen(values, fields.mechanism)
  return [
    studyLine(values),
    views === 'complete' && 'Views: frontal, oblique and lateral',
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    mechanism.length > 0 && `Clinical: ${mechanism.join(', ')}`,
  ]
}

function rayList(values: Values, id: string): string {
  return andList(list(values, id).map((ray) => RAY_SHORT[ray] ?? ray))
}

function alignmentLines(values: Values): (string | false)[] {
  const cmc = str(values, 'cmc')
  const direction = str(values, 'cmc-direction')
  const cmcDetail = join([
    direction && direction !== 'unclear' && `${direction} dislocation or subluxation`,
    list(values, 'cmc-rays').length > 0 && `${rayList(values, 'cmc-rays')} CMC joints`,
    ...chosen(values, fields.cmcSigns),
    chosen(values, fields.cmcFractures).length > 0 && `with a fracture of the ${andList(chosen(values, fields.cmcFractures))}`,
  ])
  const joints = str(values, 'joints')
  return [
    cmc === 'normal' && 'Carpometacarpal joints: normal alignment',
    cmc === 'abnormal' && `Carpometacarpal joints: ${cmcDetail || 'dislocated or subluxed'}`,
    joints === 'congruent' && 'Finger and thumb joints: congruent',
    joints === 'dislocated' && `Finger and thumb joints: ${join([picked(values, fields.jointDirection) && `${picked(values, fields.jointDirection)} dislocation or subluxation`, list(values, 'joint-which').length > 0 && `${andList(chosen(values, fields.jointWhich))} joint${list(values, 'joint-which').length > 1 ? 's' : ''}`]) || 'dislocated or subluxed'}`,
  ]
}

function metacarpalLines(values: Values): (string | false)[] {
  const mc = str(values, 'mc')
  const angle = num(values, 'mc-angulation')
  const shortening = num(values, 'mc-shortening')
  const view = str(values, 'mc-view')
  const ray = RAY_WORDS[str(values, 'mc-ray')]
  const detail = join([
    picked(values, fields.mcPattern),
    angle !== undefined && `apex dorsal angulation ${angle}°${view ? ` (${view})` : ''}`,
    shortening !== undefined && `shortening ${shortening} mm`,
    str(values, 'mc-articular') === 'yes' && 'into the joint',
    str(values, 'mc-articular') === 'no' && 'not into the joint',
    str(values, 'mc-rotation') === 'present' && 'rotational deformity on examination',
    str(values, 'mc-rotation') === 'none' && 'no rotational deformity on examination',
  ])
  const thumb = str(values, 'thumb')
  return [
    mc === 'none' && 'Metacarpals (index to little): no fracture',
    mc === 'present' && `Metacarpals: fracture of the ${join([ray && `${ray} metacarpal`, mcSite(values)], ' ') || 'metacarpal'}${detail ? `, ${detail}` : ''}`,
    thumb === 'none' && 'Thumb metacarpal: no fracture or dislocation',
    thumb && thumb !== 'none' && `Thumb metacarpal: ${THUMB_WORDS[thumb]}`,
  ]
}

function phalanxLines(values: Values): (string | false)[] {
  const out: (string | false)[] = []
  const p = pip(values)
  if (p === 'none') out.push('Middle phalanx base: no fracture')
  if (p === 'volar') {
    const share = num(values, 'pip-percent')
    out.push(withDetail('Middle phalanx base: volar lip fragment', [
      share !== undefined && `${share}% of the articular surface`,
      str(values, 'pip-joint') === 'congruent' && 'PIP joint congruent',
      str(values, 'pip-joint') === 'subluxed' && 'middle phalanx subluxed dorsally',
      str(values, 'v-sign') === 'yes' && 'V sign',
      str(values, 'v-sign') === 'no' && 'no V sign',
    ]))
  }
  if (p === 'dorsal') {
    const shift = num(values, 'cs-displacement')
    out.push(`Middle phalanx base: dorsal lip fragment (central slip)${shift !== undefined ? `, displaced ${shift} mm` : ''}`)
  }
  if (p === 'pilon') out.push(`Middle phalanx base: pilon fracture${str(values, 'pilon-displaced') ? `, ${str(values, 'pilon-displaced')}` : ''}`)
  const mallet = str(values, 'mallet')
  const malletShare = num(values, 'mallet-percent')
  if (mallet === 'none') out.push('Distal phalanx base: no mallet fracture')
  if (mallet === 'present') {
    out.push(withDetail('Distal phalanx base: bony mallet', [
      malletShare !== undefined && `${malletShare}% of the articular surface`,
      str(values, 'mallet-joint') === 'congruent' && 'DIP joint congruent',
      str(values, 'mallet-joint') === 'subluxed' && 'distal phalanx subluxed palmarwards',
    ]))
  }
  const ucl = str(values, 'ucl')
  if (ucl === 'none') out.push('Thumb proximal phalanx base: no UCL avulsion')
  if (ucl === 'present') out.push(`Thumb proximal phalanx base: ulnar avulsion fragment${str(values, 'ucl-fragment') === 'displaced' ? ', displaced proximal to the MCP joint line' : str(values, 'ucl-fragment') === 'at-joint' ? ', at the joint line' : ''}`)
  const phalanx = str(values, 'phalanx')
  if (phalanx === 'none') out.push('Other phalanges: no fracture')
  if (phalanx === 'present') out.push(`Other phalanges: ${phalanxPhrase(values)}`)
  return out
}

/** "Base, a, b" or just "Base" when no detail is entered. */
function withDetail(base: string, parts: (string | false | undefined)[]): string {
  const detail = join(parts)
  return detail ? `${base}, ${detail}` : base
}

function phalanxPhrase(values: Values): string {
  const bone = str(values, 'ph-bone')
  const site = picked(values, fields.phSite)
  return join([
    `fracture of the ${join([site && `${site} of the`, bone && `${bone}`, 'phalanx'], ' ')}`,
    str(values, 'ph-articular') === 'yes' && 'into the joint',
    picked(values, fields.phDisplaced),
  ])
}

function softTissueLines(values: Values): (string | false)[] {
  const fb = str(values, 'fb')
  return [
    str(values, 'swelling') === 'none' && 'Soft tissues: no swelling',
    str(values, 'swelling') === 'present' && `Soft tissues: swelling${str(values, 'swelling-site') ? ` ${str(values, 'swelling-site')}` : ''}`,
    fb === 'none' && 'Foreign body: none seen',
    fb === 'seen' && `Foreign body: radiopaque foreign body${str(values, 'fb-site') ? `, ${str(values, 'fb-site')}` : ''}`,
    fb === 'suspected' && `Foreign body: suspected clinically, none seen${str(values, 'fb-material') && str(values, 'fb-material') !== 'unknown' ? ` (${picked(values, fields.fbMaterial)})` : ''}`,
  ]
}

/* The impression. */

function sided(values: Values, rest: string): string {
  const side = str(values, 'side')
  return side ? `${side} ${lowerFirst(rest)}` : upperFirst(rest)
}

function findings(values: Values): string[] {
  const out: string[] = []
  if (cmcAbnormal(values)) {
    const rays = rayList(values, 'cmc-rays')
    const direction = str(values, 'cmc-direction')
    const fractures = chosen(values, fields.cmcFractures)
    out.push(`${sided(values, `${direction === 'dorsal' || direction === 'volar' ? `${direction} ` : ''}dislocation or subluxation of the ${rays ? `${rays} ` : ''}carpometacarpal joint${list(values, 'cmc-rays').length > 1 ? 's' : ''}`)}${fractures.length > 0 ? `, with a fracture of the ${andList(fractures)}` : ''}.`)
  }
  if (jointsDislocated(values)) {
    const which = chosen(values, fields.jointWhich)
    const direction = str(values, 'joint-direction')
    out.push(`${upperFirst(`${direction === 'dorsal' || direction === 'volar' ? `${direction} ` : ''}dislocation or subluxation of the ${which.length > 0 ? `${andList(which)} joint${which.length > 1 ? 's' : ''}` : 'finger or thumb'}`)}.`)
  }
  if (str(values, 'mc') === 'present') {
    const ray = RAY_WORDS[str(values, 'mc-ray')]
    const angle = num(values, 'mc-angulation')
    const view = str(values, 'mc-view')
    const site = mcSite(values)
    const name = fifthNeck(values) ? ' (boxer\'s fracture)' : ''
    const detail = join([
      angle !== undefined && `apex dorsal angulation ${angle}°${view ? ` on the ${view}` : ''}`,
      num(values, 'mc-shortening') !== undefined && `shortening ${num(values, 'mc-shortening')} mm`,
      str(values, 'mc-articular') === 'yes' && 'extending into the joint',
      str(values, 'mc-rotation') === 'present' && 'with rotational deformity reported clinically',
    ])
    out.push(`${sided(values, `fracture of the ${join([ray && `${ray} metacarpal`, site], ' ') || 'metacarpal'}${name}`)}${detail ? `, ${detail}` : ''}.`)
  }
  const thumb = str(values, 'thumb')
  if (THUMB_WORDS[thumb]) out.push(`${sided(values, THUMB_WORDS[thumb])}.`)
  const p = pip(values)
  if (p === 'volar') {
    const share = num(values, 'pip-percent')
    const subluxed = str(values, 'pip-joint') === 'subluxed' || str(values, 'v-sign') === 'yes'
    out.push(`${upperFirst(subluxed ? 'dorsal fracture-dislocation of the PIP joint' : 'volar plate avulsion fracture of the middle phalanx base')}${share !== undefined ? `, the fragment ${share}% of the articular surface` : ''}${subluxed ? '' : ', PIP joint congruent'}.`)
    if (str(values, 'v-sign') === 'yes') out.push('V sign: the PIP joint is not concentrically reduced.')
  }
  if (p === 'dorsal') {
    const shift = num(values, 'cs-displacement')
    out.push(`Dorsal lip avulsion fracture of the middle phalanx base (central slip)${shift !== undefined ? `, displaced ${shift} mm` : ''}.`)
  }
  if (p === 'pilon') out.push(`${str(values, 'pilon-displaced') === 'displaced' ? 'Displaced pilon' : 'Pilon'} fracture of the middle phalanx base.`)
  if (str(values, 'mallet') === 'present') {
    const share = num(values, 'mallet-percent')
    out.push(`Bony mallet fracture of the distal phalanx base${share !== undefined ? `, ${share}% of the articular surface` : ''}${str(values, 'mallet-joint') === 'subluxed' ? ', with palmar subluxation of the distal phalanx' : ''}.`)
  }
  if (str(values, 'ucl') === 'present') {
    // H4-14.
    out.push(str(values, 'ucl-fragment') === 'displaced'
      ? 'Avulsion fracture at the ulnar base of the thumb proximal phalanx, displaced proximal to the MCP joint line (displaced fleck sign): a Stener lesion is likely.'
      : 'Avulsion fracture at the ulnar base of the thumb proximal phalanx (ulnar collateral ligament).')
  }
  if (str(values, 'phalanx') === 'present') out.push(`${upperFirst(phalanxPhrase(values))}.`)
  if (str(values, 'fb') === 'seen') out.push(`Radiopaque foreign body${str(values, 'fb-site') ? `, ${str(values, 'fb-site').replace(/\.$/, '')}` : ''}.`)
  return out
}

/** The lines naming further imaging, each only where a source supports it. */
function furtherImaging(values: Values): string[] {
  const out: string[] = []
  // H2-4.
  if (cmcAbnormal(values) || list(values, 'cmc-fractures').length > 0) out.push('Consider CT to show the carpometacarpal injury and any carpal fracture.')
  // H4-4.
  if (pip(values) === 'pilon' && str(values, 'pilon-displaced') === 'displaced') out.push('Consider CT, or radiographs under traction, to show the articular surface.')
  // H4-16, with H4-11 and H4-13.
  if (str(values, 'ucl') === 'present') out.push('If ulnar collateral ligament injury is suspected clinically, MRI or ultrasound.')
  // H2-5.
  if (jointsDislocated(values) && fracturesEntered(values).length === 0) out.push('MRI or ultrasound can show the ligaments and volar plate.')
  // H5-3.
  if (str(values, 'fb') === 'suspected') out.push('If a foreign body is still suspected, ultrasound, or CT.')
  // H6-2.
  if (str(values, 'still-suspected') === 'yes' && noInjuryEntered(values)) out.push('If a fracture is still suspected, repeat radiographs in 10 to 14 days, or MRI or CT.')
  return out
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

const NORMAL_IMPRESSION = 'No fracture, dislocation or radiopaque foreign body.'

function impression(values: Values): string {
  const found = findings(values)
  const next = furtherImaging(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...next)}`
    if (!complete(values)) return next.length > 0 ? `Impression: ${lines(limited, ...next)}` : ''
    return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...next)}`
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...next)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fracturesEntered(values)],
    ['no-dislocation', 'no dislocation', dislocationsEntered(values)],
    ['no-foreign-body', 'no radiopaque foreign body', str(values, 'fb') === 'seen' ? ['radiopaque foreign body'] : []],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }
  // H2-1, H2-2: a fourth or fifth base fracture with the CMC joints called normal.
  if (str(values, 'mc') === 'present' && mcSite(values) === 'base' && ['fourth', 'fifth'].includes(str(values, 'mc-ray')) && str(values, 'cmc') === 'normal') {
    out.push('A fourth or fifth metacarpal base fracture is entered with normal CMC joints: recheck parallelism, symmetry, overlap and the M lines, which are subtle.')
  }
  // H2-1, H2-2: a CMC dislocation with no fracture looked for.
  if (cmcAbnormal(values) && list(values, 'cmc-fractures').length === 0) {
    out.push('A CMC dislocation is entered with no fracture: look again at the fourth metacarpal base, the fifth base and the distal carpal row.')
  }
  // H4-3: the V sign and a congruent joint contradict each other.
  if (pip(values) === 'volar' && str(values, 'v-sign') === 'yes' && str(values, 'pip-joint') === 'congruent') {
    out.push('A V sign is entered, which means the PIP joint is not concentrically reduced, but the joint is entered as congruent.')
  }
  // H3-4 to H3-6: an angle without its view.
  if (num(values, 'mc-angulation') !== undefined && !str(values, 'mc-view')) {
    out.push('An angulation is entered without the view it was measured on; lateral and oblique measurements differ.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...alignmentLines(values),
    ...metacarpalLines(values),
    ...phalanxLines(values),
    ...softTissueLines(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Why the film: the injury and the views',
    learn: 'technique',
    teach: <p>Radiographs first for acute hand trauma (9) ({ACR}). Three views, frontal, oblique and lateral; two are inadequate ({SOUTHALL}). For a PIP injury, views centred on the joint as well ({ELFAR}). The mechanism tells you where to look ({STEINMETZ}; {CAGGIANO}; {MADAN}; {LIVERNEAUX}).</p>,
    fields: [fields.area, fields.side, fields.digit, fields.mechanism, fields.views, fields.viewsMissing],
    derive: deriveTechnique,
  },
  {
    id: 'alignment',
    title: 'Step 2. Alignment and joints',
    learn: 'alignment',
    teach: (
      <>
        <p>CMC joints: parallel joint lines, symmetry, no overlap, a sharp cortical rim and parallel M lines; most dislocations are dorsal, and a fourth base fracture often goes with them ({FISHER}). Look at the distal carpal row ({STEINMETZ}); CT changed the operative plan in 58% ({SENDEK}).</p>
        <p>A finger joint out of line with no fracture: MRI 9, ultrasound 7 ({ACR}).</p>
      </>
    ),
    fields: [fields.cmc, fields.cmcRays, fields.cmcDirection, fields.cmcSigns, fields.cmcFractures, fields.joints, fields.jointWhich, fields.jointDirection],
    derive: deriveAlignment,
  },
  {
    id: 'metacarpals',
    title: 'Step 3. Metacarpals',
    learn: 'metacarpals',
    teach: (
      <>
        <p>Fifth neck: give the angle and the view; the lateral is the reference ({LAMRASKI}; {SLETTEN}), the oblique disputed ({QIU}; {LOWDON}). Up to 70° with no rotation was van Aaken's trial range ({VAN_AAKEN}); see France for over 70° ({FRANCE}).</p>
        <p>Thumb base: Bennett (shaft pulled by abductor pollicis longus and adductor pollicis) ({DAHER}); Rolando, three-fragment ({LIVERNEAUX}).</p>
      </>
    ),
    fields: [fields.mc, fields.mcRay, fields.mcSite, fields.mcPattern, fields.mcAngulation, fields.mcView, fields.mcShortening, fields.mcArticular, fields.mcRotation, fields.thumb],
    derive: deriveMetacarpals,
  },
  {
    id: 'phalanges',
    title: 'Step 4. Phalanges, the PIP joint, mallet and the thumb UCL',
    learn: 'phalanges',
    teach: (
      <>
        <p>Volar lip fragment: under 30% stable, 30–50% tenuous, over 50% often unstable; a V sign means the joint is not reduced ({ELFAR}).</p>
        {pipTable}
        <p>Mallet: give the share of the joint and the DIP alignment ({MORADI}; {KALAINOV}). Thumb UCL: a fleck displaced proximal to the joint line predicts a Stener lesion ({DARYOUSH}); MRI 9, ultrasound 7 ({ACR}).</p>
      </>
    ),
    fields: [
      fields.pip, fields.pipPercent, fields.pipJoint, fields.vSign, fields.csDisplacement, fields.pilonDisplaced,
      fields.mallet, fields.malletPercent, fields.malletJoint,
      fields.ucl, fields.uclFragment,
      fields.phalanx, fields.phBone, fields.phSite, fields.phArticular, fields.phDisplaced,
    ],
    derive: derivePhalanges,
  },
  {
    id: 'soft-tissues',
    title: 'Step 5. Soft tissues and foreign bodies',
    learn: 'soft-tissues',
    teach: <p>Radiographs show radiopaque foreign bodies 98% of the time and never wood or plastic ({MANTHEY}); glass in 25 of 26 ({GRON}). Still suspected with negative films: ultrasound 9, CT 7 ({ACR}).</p>,
    fields: [fields.swelling, fields.swellingSite, fields.fb, fields.fbSite, fields.fbMaterial],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 6. Other findings and the impression',
    learn: 'impression',
    teach: <p>Signs are subtle and satisfaction of search is a trap ({SMITHUIS}). Negative films with a fracture still suspected: repeat radiographs in 10 to 14 days, MRI or CT ({ACR}).</p>,
    fields: [fields.stillSuspected, fields.other, fields.impressionNegatives],
    derive: deriveImpression,
  },
]

const study: StudyDefinition = {
  slug: 'hand-xray',
  name: 'Hand X-ray for injury',
  lede: 'Read an adult\'s hand, finger or thumb radiographs after an injury: the views, the carpometacarpal joints, the boxer\'s fracture and how its angle is measured, Bennett and Rolando fractures, PIP fracture-dislocations, mallet fractures, the thumb UCL and Stener lesion, foreign bodies, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'views',
      question: 'Which views should a hand series after injury include?',
      options: ['A frontal view only', 'A frontal and a lateral', 'A frontal, an oblique and a lateral', 'A lateral and a CT'],
      answer: 2,
      explanation: <p>Three views; a two-view approach is inadequate for fractures of the hand and fingers ({SOUTHALL}). Radiographs are rated 9 as the first imaging ({ACR}).</p>,
    },
    {
      id: 'cmc-signs',
      question: 'After a punch, the PA view shows the fourth and fifth CMC joint lines are no longer parallel and the fifth overlaps the hamate. What is the likely injury?',
      options: ['Normal variant', 'Dislocation of the fourth and fifth CMC joints', 'Scaphoid fracture', 'Boxer\'s fracture only'],
      answer: 1,
      explanation: <p>In combined fourth and fifth dislocations, parallelism and symmetry are lost at the fourth and the surfaces overlap at the fifth; 71% are dorsal, and a fourth base fracture often goes with them ({FISHER}).</p>,
    },
    {
      id: 'cmc-ct',
      question: 'Why consider CT for a CMC fracture-dislocation?',
      options: ['To measure bone density', 'Carpal fractures are often hard to see on radiographs, and CT changed the operative plan in 58%', 'Radiographs cannot show dislocations at all', 'CT is needed for every finger fracture'],
      answer: 1,
      explanation: <p>Associated carpal injuries are often hard to see on plain radiographs; CT changed management in 58% ({SENDEK}).</p>,
    },
    {
      id: 'oblique',
      question: 'You measure a fifth metacarpal neck angle on the oblique view. What should you know?',
      options: ['The oblique is the agreed reference', 'Its validity is disputed, and the normal neck angle on an oblique is about 26°', 'The oblique always underestimates by exactly 10°', 'The view does not matter'],
      answer: 1,
      explanation: <p>On obliques, validity was poor in cadavers ({LAMRASKI}) but matched CT in Qiu's series ({QIU}); the normal head-shaft angle on the oblique was 26° ({LOWDON}). Say which view you used.</p>,
    },
    {
      id: 'van-aaken',
      question: 'In van Aaken\'s trial, for which boxer\'s fractures was soft wrap and buddy taping noninferior to reduction and casting?',
      options: ['Any angulation', 'Palmar angulation up to 70° with no rotational deformity', 'Only undisplaced fractures', 'Fractures with rotational deformity'],
      answer: 1,
      explanation: <p>Up to 70° with no rotational deformity ({VAN_AAKEN}).</p>,
    },
    {
      id: 'bennett',
      question: 'In a Bennett fracture, what pulls the thumb metacarpal shaft out of joint?',
      options: ['Flexor pollicis longus', 'Abductor pollicis longus and adductor pollicis', 'The palmar oblique ligament', 'Extensor pollicis brevis alone'],
      answer: 1,
      explanation: <p>The shaft is displaced by abductor pollicis longus and adductor pollicis; the palmar oblique ligament holds the small volar fragment ({DAHER}).</p>,
    },
    {
      id: 'pip-share',
      question: 'A volar lip fragment of the middle phalanx carries about 40% of the articular surface. How do Elfar and Mann grade its stability?',
      options: ['Typically stable', 'Tenuous', 'Always unstable', 'Not related to fragment size'],
      answer: 1,
      explanation: <p>Under 30% is typically stable, over 50% often unstable, and 30% to 50% tenuous ({ELFAR}).</p>,
    },
    {
      id: 'v-sign',
      question: 'What does a V sign at the PIP joint on the lateral view mean?',
      options: ['A normal joint', 'Dorsal instability: the joint is not concentrically reduced', 'A central slip avulsion', 'A healed fracture'],
      answer: 1,
      explanation: <p>The divergence of the dorsal articular surfaces signifies that the PIP joint is not concentrically reduced ({ELFAR}).</p>,
    },
    {
      id: 'mallet',
      question: 'In Moradi\'s series, below what share of the articular surface was subluxation of a mallet fracture not seen?',
      options: ['10%', '25%', '39%', '75%'],
      answer: 2,
      explanation: <p>No subluxation below 39%; above it, the risk rose 4% for each 1% ({MORADI}). Whether size or subluxation calls for surgery is disputed ({KALAINOV}; {WEHBE}; {LIN}).</p>,
    },
    {
      id: 'fleck',
      question: 'A small fragment from the ulnar base of the thumb proximal phalanx lies proximal to the MCP joint line. What does it suggest?',
      options: ['A partial UCL sprain', 'A Stener lesion (PPV 94.1%) with a grade III rupture', 'A Bennett fracture', 'A normal sesamoid'],
      answer: 1,
      explanation: <p>The displaced fleck sign had a PPV of 100% for a grade III rupture and 94.1% for a Stener lesion ({DARYOUSH}).</p>,
    },
    {
      id: 'gamekeeper',
      question: 'Strictly, what does "gamekeeper\'s thumb" describe?',
      options: ['An acute UCL rupture in a skier', 'A chronic attenuation of the UCL from repetitive stress', 'A Bennett fracture', 'A radial collateral ligament injury'],
      answer: 1,
      explanation: <p>Gamekeeper's thumb is chronic attenuation; skier's thumb is an acute injury ({RITTING}).</p>,
    },
    {
      id: 'foreign-body',
      question: 'A splinter of wood is suspected after a puncture wound, and the radiographs are normal. What next?',
      options: ['Nothing: radiographs exclude it', 'Ultrasound (ACR 9)', 'A bone scan', 'Repeat radiographs in a year'],
      answer: 1,
      explanation: <p>Radiographs never showed wood, plastic or a cactus spine ({MANTHEY}); with negative films the ACR rates ultrasound 9 and CT 7 ({ACR}).</p>,
    },
  ],
}

export function HandXrayStudyPage() {
  return <StudyPage study={study} />
}
