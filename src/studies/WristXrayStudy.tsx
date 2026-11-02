import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from '../logic/herbert'
import type { HerbertType } from '../logic/herbert'
import { mayfield, mayfieldDescriptions, mayfieldGaps, mayfieldSentence, mayfieldStages } from '../logic/mayfield'
import type { MayfieldInput, MayfieldResult } from '../logic/mayfield'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Written on 2026-11-01 with PubMed, Crossref and Europe PMC reachable, so every reference was
 * matched as it was cited and every claim was read in an abstract, an open full text (Sharma,
 * Okoro, Zhou, Vassa, Andersson, Dvorsky, Shahabpour, Steinmann, Chen) or the ACR's
 * published ratings tables before it went in; Kitay and Wolfe and Kennedy and Allan, with no open
 * copy today, are quoted from the full texts read for the wrist MRI study and the Mayfield
 * calculator, as cited there. The claims table is
 * docs/superpowers/research/2026-11-01-wrist-xray-sources.md (X claims). The Herbert and Mayfield
 * wording comes from the shared logic (src/logic/herbert.ts, src/logic/mayfield.ts), as in their
 * calculators, and the carpal angle rule is the wrist MRI study's (W3-2), with the same
 * citations. Rule chips and warnings carry their claim IDs.
 */

const ACR_DOI = '10.1016/j.jacr.2019.02.029'
const WALENKAMP_DOI = '10.1186/s12891-015-0829-2'
const SHARMA_DOI = '10.1055/s-0044-1801268'
const OKORO_DOI = '10.3390/life13071426'
const CHEUNG_DOI = '10.1016/j.jhsb.2005.09.001'
const GILULA_DOI = '10.2214/ajr.133.3.503'
const ZHOU_DOI = '10.1016/j.jhsg.2024.01.015'
const ANDERSSON_DOI = '10.1302/2058-5241.2.170016'
const KITAY_DOI = '10.1016/j.jhsa.2012.07.035'
const PANG_DOI = '10.1177/1558944717709073'
const VASSA_DOI = '10.5114/pjr.2020.99034'
const NAKAMURA_DOI = '10.1007/BF00198067'
const SCHUIND_DOI = '10.2106/00004623-199274090-00018'
const HOLLEVOET_DOI = '10.1054/jhsb.2000.0466'
const SHAHABPOUR_DOI = '10.5334/jbsr.2709'
const HERBERT_DOI = '10.1302/0301-620X.66B1.6693468'
const STEINMANN_DOI = '10.1007/s00776-006-1025-x'
const MALLEE_DOI = '10.1002/14651858.CD010023.pub2'
const GAEBLER_DOI = '10.1097/00005373-199607000-00011'
const MAYFIELD_DOI = '10.1016/s0363-5023(80)80007-4'
const KENNEDY_ALLAN_DOI = '10.1007/s11999-012-2275-x'
const DVORSKY_DOI = '10.1016/j.jhsg.2025.100803'
const CHEN_DOI = '10.1177/1941738109347981'
const ANNAMALAI_DOI = '10.1016/s0009-9260(03)00230-7'
const FALLAHI_DOI = '10.1007/s00256-012-1451-0'

const ACR = <Cite doi={ACR_DOI}>ACR Appropriateness Criteria, Acute Hand and Wrist Trauma 2019</Cite>
const WALENKAMP = <Cite doi={WALENKAMP_DOI}>Walenkamp et al., BMC Musculoskelet Disord 2015</Cite>
const SHARMA = <Cite doi={SHARMA_DOI}>Sharma et al., Indian J Radiol Imaging 2025</Cite>
const OKORO = <Cite doi={OKORO_DOI}>Okoro et al., Life 2023</Cite>
const CHEUNG = <Cite doi={CHEUNG_DOI}>Cheung et al., J Hand Surg Br 2006</Cite>
const GILULA = <Cite doi={GILULA_DOI}>Gilula, AJR 1979</Cite>
const ZHOU = <Cite doi={ZHOU_DOI}>Zhou et al., J Hand Surg Glob Online 2024</Cite>
const ANDERSSON = <Cite doi={ANDERSSON_DOI}>Andersson, EFORT Open Rev 2017</Cite>
const KITAY = <Cite doi={KITAY_DOI}>Kitay and Wolfe, J Hand Surg Am 2012</Cite>
const PANG = <Cite doi={PANG_DOI}>Pang et al., Hand (N Y) 2018</Cite>
const VASSA = <Cite doi={VASSA_DOI}>Vassa et al., Pol J Radiol 2020</Cite>
const NAKAMURA = <Cite doi={NAKAMURA_DOI}>Nakamura et al., Skeletal Radiol 1995</Cite>
const SCHUIND = <Cite doi={SCHUIND_DOI}>Schuind et al., J Bone Joint Surg Am 1992</Cite>
const HOLLEVOET = <Cite doi={HOLLEVOET_DOI}>Hollevoet et al., J Hand Surg Br 2000</Cite>
const SHAHABPOUR = <Cite doi={SHAHABPOUR_DOI}>Shahabpour et al., J Belg Soc Radiol 2021</Cite>
const HERBERT = <Cite doi={HERBERT_DOI}>Herbert and Fisher, J Bone Joint Surg Br 1984</Cite>
const STEINMANN = <Cite doi={STEINMANN_DOI}>Steinmann and Adams, J Orthop Sci 2006</Cite>
const MALLEE = <Cite doi={MALLEE_DOI}>Mallee et al., Cochrane Database Syst Rev 2015</Cite>
const GAEBLER = <Cite doi={GAEBLER_DOI}>Gaebler et al., J Trauma 1996</Cite>
const MAYFIELD = <Cite doi={MAYFIELD_DOI}>Mayfield et al., J Hand Surg Am 1980</Cite>
const KENNEDY_ALLAN = <Cite doi={KENNEDY_ALLAN_DOI}>Kennedy and Allan, Clin Orthop Relat Res 2012</Cite>
const DVORSKY = <Cite doi={DVORSKY_DOI}>Dvorsky et al., J Hand Surg Glob Online 2025</Cite>
const CHEN = <Cite doi={CHEN_DOI}>Chen et al., Sports Health 2009</Cite>
const ANNAMALAI = <Cite doi={ANNAMALAI_DOI}>Annamalai and Raby, Clin Radiol 2003</Cite>
const FALLAHI = <Cite doi={FALLAHI_DOI}>Fallahi et al., Skeletal Radiol 2013</Cite>

const references: LessonReference[] = [
  { citation: 'Expert Panel on Musculoskeletal Imaging; Torabi M, Lenchik L, Beaman FD, Wessell DE, Bussell JK, Cassidy RC, Czuczman GJ, Demertzis JL, Khurana B, Klitzke A, Motamedi K, Pierce JL, Sharma A, Walker EA, Kransdorf MJ. ACR Appropriateness Criteria® Acute Hand and Wrist Trauma. J Am Coll Radiol. 2019;16(5S):S7-S17.', doi: ACR_DOI },
  { citation: 'Walenkamp MMJ, Bentohami A, Slaar A, Beerekamp MSH, Maas M, Jager LC, Sosef NL, van Velde R, Ultee JM, Steyerberg EW, Goslings JC, Schep NWL. The Amsterdam wrist rules: the multicenter prospective derivation and external validation of a clinical decision rule for the use of radiography in acute wrist trauma. BMC Musculoskelet Disord. 2015;16:389.', doi: WALENKAMP_DOI },
  { citation: 'Sharma M, Choudhury SR, Sinha A, Prakash M. Multimodality imaging in wrist fractures and dislocations. Indian J Radiol Imaging. 2025;35(3):374-386.', doi: SHARMA_DOI },
  { citation: 'Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging diagnosis and management of carpal trauma and instability: an illustrated guide. Life (Basel). 2023;13(7):1426.', doi: OKORO_DOI },
  { citation: 'Cheung GC, Lever CJ, Morris AD. X-ray diagnosis of acute scaphoid fractures. J Hand Surg Br. 2006;31(1):104-109.', doi: CHEUNG_DOI },
  { citation: 'Gilula LA. Carpal injuries: analytic approach and case exercises. AJR Am J Roentgenol. 1979;133(3):503-517.', doi: GILULA_DOI },
  { citation: 'Zhou JY, Jodah R, Joseph LP, Yao J. Scapholunate ligament injuries. J Hand Surg Glob Online. 2024;6(3):245-267.', doi: ZHOU_DOI },
  { citation: 'Andersson JK. Treatment of scapholunate ligament injury: current concepts. EFORT Open Rev. 2017;2(9):382-393.', doi: ANDERSSON_DOI },
  { citation: 'Kitay A, Wolfe SW. Scapholunate instability: current concepts in diagnosis and management. J Hand Surg Am. 2012;37(10):2175-2196.', doi: KITAY_DOI },
  { citation: 'Pang EQ, Douglass N, Kamal RN. Association of lunate morphology with carpal instability in scapholunate ligament injury. Hand (N Y). 2018;13(4):418-422.', doi: PANG_DOI },
  { citation: 'Vassa R, Garg A, Omar IM. Magnetic resonance imaging of the wrist and hand. Pol J Radiol. 2020;85:e461-e488.', doi: VASSA_DOI },
  { citation: 'Nakamura R, Horii E, Imaeda T, Tsunoda K, Nakao E. Distal radioulnar joint subluxation and dislocation diagnosed by standard roentgenography. Skeletal Radiol. 1995;24(2):91-94.', doi: NAKAMURA_DOI },
  { citation: 'Schuind FA, Linscheid RL, An KN, Chao EY. A normal data base of posteroanterior roentgenographic measurements of the wrist. J Bone Joint Surg Am. 1992;74(9):1418-1429.', doi: SCHUIND_DOI },
  { citation: 'Hollevoet N, Van Maele G, Van Seymortier P, Verdonk R. Comparison of palmar tilt, radial inclination and ulnar variance in left and right wrists. J Hand Surg Br. 2000;25(5):431-433.', doi: HOLLEVOET_DOI },
  { citation: 'Shahabpour M, Abid W, Van Overstraeten L, De Maeseneer M. Wrist trauma: more than bones. J Belg Soc Radiol. 2021;105(1):90.', doi: SHAHABPOUR_DOI },
  { citation: 'Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123.', doi: HERBERT_DOI },
  { citation: 'Steinmann SP, Adams JE. Scaphoid fractures and nonunions: diagnosis and treatment. J Orthop Sci. 2006;11(4):424-431.', doi: STEINMANN_DOI },
  { citation: 'Mallee WH, Wang J, Poolman RW, Kloen P, Maas M, de Vet HC, Doornberg JN. Computed tomography versus magnetic resonance imaging versus bone scintigraphy for clinically suspected scaphoid fractures in patients with negative plain radiographs. Cochrane Database Syst Rev. 2015;(6):CD010023.', doi: MALLEE_DOI },
  { citation: 'Gaebler C, Kukla C, Breitenseher M, Trattnig S, Mittlboeck M, Vécsei V. Magnetic resonance imaging of occult scaphoid fractures. J Trauma. 1996;41(1):73-76.', doi: GAEBLER_DOI },
  { citation: 'Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241.', doi: MAYFIELD_DOI },
  { citation: 'Kennedy SA, Allan CH. In brief: Mayfield et al. classification: carpal dislocations and progressive perilunar instability. Clin Orthop Relat Res. 2012;470(4):1243-1245.', doi: KENNEDY_ALLAN_DOI },
  { citation: 'Dvorsky JL, Rosenberry S, Da Costa A, Green A, Fowler J. A review of perilunate wrist dislocations. J Hand Surg Glob Online. 2025;7(5):100803.', doi: DVORSKY_DOI },
  { citation: 'Chen NC, Jupiter JB, Jebson PJL. Sports-related wrist injuries in adults. Sports Health. 2009;1(6):469-477.', doi: CHEN_DOI },
  { citation: 'Annamalai G, Raby N. Scaphoid and pronator fat stripes are unreliable soft tissue signs in the detection of radiographically occult fractures. Clin Radiol. 2003;58(10):798-800.', doi: ANNAMALAI_DOI },
  { citation: 'Fallahi F, Jafari H, Jefferson G, Jennings P, Read R. Explorative study of the sensitivity and specificity of the pronator quadratus fat pad sign as a predictor of subtle wrist fractures. Skeletal Radiol. 2013;42(2):249-253.', doi: FALLAHI_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (PA, DRUJ) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/** A two-column table of a shared classification, from its descriptions (as in the wrist MRI study). */
function classTable<T extends string>(head: string, keys: T[], descriptions: Record<T, string>) {
  return (
    <div className="table-wrap">
      <table className="ref-table">
        <thead>
          <tr><th>{head}</th><th>Description</th></tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key}><td className="vessel-name">{key}</td><td>{upperFirst(descriptions[key])}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const herbertTable = classTable('Type', herbertTypes, herbertDescriptions)
const mayfieldTable = classTable('Stage', mayfieldStages, mayfieldDescriptions)

/* X3-3 to X3-6: the distal radius measurements, with each source's normal values. */

const measureTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Measurement</th><th>How</th><th>Normal</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">Radial height (length), PA</td><td>Between perpendiculars to the radial shaft at the tip of the radial styloid and at the ulnar edge of the radial articular surface</td><td>11–22 mm (Sharma)</td></tr>
        <tr><td className="vessel-name">Radial inclination, PA</td><td>Line from the tip of the styloid to the ulnar edge of the articular surface, against a perpendicular to the shaft</td><td>13–30° (Sharma); 19–29°, mean 24° (Schuind)</td></tr>
        <tr><td className="vessel-name">Tilt, lateral</td><td>Line across the articular surface against a perpendicular to the mid-shaft</td><td>4° dorsal to 11° volar (Sharma)</td></tr>
        <tr><td className="vessel-name">Ulnar variance, PA</td><td>On a neutral PA</td><td>−4.2 to 2.3 mm, mean −0.9 mm (Schuind)</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, views and technique',
    body: (
      <>
        <p>This lesson is for the adult wrist radiograph after an injury, or the scaphoid series for a suspected scaphoid fracture. Children's fractures are not covered. The order of the steps and the checklists are this site's own.</p>
        <p>Radiographs are the first test after acute hand or wrist trauma: the ACR rates them 9 (usually appropriate), and ultrasound, CT, MRI and bone scan 1 (usually not appropriate) at this stage ({ACR}).</p>
        <h4>The decision rule</h4>
        <p>The Amsterdam Wrist Rules were derived and externally validated in 882 adults with acute wrist trauma in five Dutch emergency departments. The model has eight variables: age, sex, swelling of the wrist, swelling of the anatomical snuffbox, visible deformation, tenderness of the distal radius on palpation, pain on radial deviation and painful axial compression of the thumb. In the validation cohort the rules were 98% sensitive and 21% specific for a fracture of the distal radius, distal ulna or carpus, with a negative predictive value of 90%; only 39% of patients with wrist trauma had a fracture ({WALENKAMP}). This form records which of the signs were present, as the reason for the film; it does not compute the rule.</p>
        <h4>The mechanism</h4>
        <p>A fall on the outstretched hand is the usual history of a scaphoid fracture ({SHARMA}; {STEINMANN}), and of a Colles fracture, with the wrist dorsiflexed ({SHARMA}). Perilunate dislocations often follow high-energy trauma, such as a motor vehicle accident, a fall or a sports injury, that forces the wrist into hyperextension, ulnar deviation and intercarpal supination ({DVORSKY}; {MAYFIELD}).</p>
        <h4>Views</h4>
        <p>A wrist series should have at least three views: PA, lateral and a semipronated 45° oblique, which shows the scaphoid waist and the trapezio-trapezoid joint ({SHARMA}). For a suspected scaphoid fracture, Cheung and colleagues recommend four views at first presentation: PA and lateral to assess carpal alignment, with a pronated oblique and an ulnar-deviated PA to detect the fracture. In their 113 fractures, whenever a lateral, supinated oblique or elongated view was taken, the fracture was always also seen clearly on another view ({CHEUNG}). Ulnar deviation elongates the scaphoid and makes a fracture easier to see ({SHARMA}), tilting it upright like an angled scaphoid view; a 25° angled scaphoid view may improve detection ({OKORO}).</p>
        <p>Check the positioning. On the PA, the groove for extensor carpi ulnaris should be in profile, at or radial to the base of the ulnar styloid ({SHARMA}). On a true lateral, the palmar cortex of the pisiform lies between the palmar cortices of the scaphoid and the capitate, ideally midway ({SHARMA}; {OKORO}). The carpal angles are accurate only on a true lateral ({OKORO}), and even slight rotation can give a false reading of the distal radioulnar joint ({SHARMA}).</p>
        <h4>The suspected scaphoid fracture</h4>
        <p>Most patients with a scaphoid fracture are tender in the anatomical snuffbox or over the scaphoid tubercle and have pain on longitudinal compression of the thumb; the examination is sensitive, but its specificity is only 74% to 80% ({STEINMANN}). In the Cochrane review, a true fracture was found in a median of 20% of clinically suspected scaphoid fractures ({MALLEE}). When the first films are negative or equivocal, the ACR rates repeat radiographs at 10 to 14 days 8, MRI without contrast 8 and CT without contrast 7, all usually appropriate ({ACR}); step 4 has the rest.</p>
      </>
    ),
  },
  {
    id: 'alignment',
    title: 'Step 2. Alignment: carpal arcs, angles and the DRUJ',
    body: (
      <>
        <h4>Gilula's arcs</h4>
        <p>Gilula's reading of the PA view rests on three normal arcs, parallel joint spaces and overlapping articular surfaces ({GILULA}). Arc I runs along the proximal surfaces of the scaphoid, lunate and triquetrum; arc II along their distal surfaces; arc III along the proximal surfaces of the capitate and hamate ({OKORO}; {SHARMA}). A step or break in an arc suggests a ligament injury or a fracture at that site. Two normal variants step the arcs: a triquetrum shorter than the lunate steps arc I with a normal arc II, and a type II lunate can make arcs II and III bilobed between the capitate and hamate ({OKORO}).</p>
        <h4>The scapholunate interval</h4>
        <p>Widening of the scapholunate interval on the PA (the Terry-Thomas sign) is defined by Dvorsky and colleagues as over 3 mm ({DVORSKY}). Okoro and colleagues give the normal interval as under 3 mm, but up to 4 mm may be normal in some patients, and a clenched-fist view makes widening easier to see ({OKORO}). Zhou and colleagues found a gap of 2.5 mm on an unstressed view sensitive and specific, and stress comparison with the uninjured side ({ZHOU}). This form flags an interval over 3 mm. When the scaphoid flexes it looks short and triangular, sometimes with a ring sign ({ANDERSSON}); with a widened interval it suggests a scapholunate injury with rotatory subluxation ({ZHOU}).</p>
        <h4>The lateral: radius, lunate and capitate</h4>
        <p>On a true lateral, the long axes of the third metacarpal, capitate, lunate and radius fall in one line, or within 10° of it ({SHARMA}): the radius cups the lunate and the lunate cups the capitate ({OKORO}). In a perilunate dislocation the lunate stays in line with the radius while the capitate dislocates, mostly dorsally. In a lunate dislocation the lunate tips volarly (the spilled teacup sign) while the capitate stays in line with the radius. In a midcarpal dislocation all three lose their alignment ({SHARMA}).</p>
        <h4>Carpal angles</h4>
        <p>The rule for the angles is the wrist MRI study's, with its sources. A normal scapholunate angle is 30° to 60° ({KITAY}; {ZHOU}; {OKORO}). An angle over 60° is beyond that range and supports scapholunate malalignment ({ANDERSSON}; {PANG}); over 70° is consistent with DISI ({ZHOU}) and highly suggestive of increased flexion, or rotatory subluxation, of the scaphoid ({KITAY}), and this site reads it as strongly suggestive. Some reviews set the bar at 80° ({VASSA}); this site does not require it. DISI itself is dorsal tilt of the lunate ({VASSA}): on a true lateral, dorsal radiolunate angulation greater than 15° indicates DISI ({KITAY}; {PANG}). The normal capitolunate angle is 0° to 30°, and an angle outside the normal range suggests carpal instability ({OKORO}); a scapholunate angle under 30° with a capitolunate angle over 30° suggests VISI ({VASSA}). The angles are best measured on a true lateral radiograph ({VASSA}).</p>
        <h4>The distal radioulnar joint</h4>
        <p>On the PA, DRUJ injury can show as widening of the radioulnar interval, shortening of the radius or a fracture into the sigmoid notch. On a true lateral, more than 6 mm between the dorsal cortices of the radius and ulna indicates DRUJ instability, but even slight rotation can mislead, and CT is the standard test for a DRUJ dislocation ({SHARMA}). Nakamura and colleagues compared both wrists on standardised laterals: in normal wrists the right and left radioulnar distances differed by no more than 4 mm when the pisoscaphoid distances differed by less than 3 mm; of 36 injured patients so positioned, 15 had a radioulnar distance of 5 mm or more, and CT confirmed a dislocation in 14 ({NAKAMURA}). The two sources differ (6 mm on one wrist, against 5 mm with the other wrist for comparison); this form flags over 6 mm. For DRUJ or carpal malalignment with no fracture, the ACR rates CT of both wrists 9, MRI 8 and MR arthrography 7 ({ACR}).</p>
      </>
    ),
  },
  {
    id: 'radius',
    title: 'Step 3. Distal radius and ulna',
    body: (
      <>
        <p>Distal radius fractures are the commonest fractures around the wrist ({SHARMA}). Sharma and colleagues discourage eponyms in favour of reproducible classifications, but say radiologists should know them; and the classifications in common use (AO, Fernandez, Frykman) have not proved reproducible on radiographs or CT ({SHARMA}). Their descriptions, which this form uses for the names:</p>
        <ul className="plain-list">
          <li><strong>Colles fracture:</strong> a transverse extra-articular fracture with dorsal displacement or angulation, typically from a fall on the outstretched hand with the wrist dorsiflexed.</li>
          <li><strong>Smith fracture</strong> (reverse Colles): a transverse extra-articular fracture with volar displacement or angulation, from high-energy trauma on a palmar-flexed wrist.</li>
          <li><strong>Barton fracture:</strong> an intra-articular fracture with displacement of the fragment and the carpus, a shear injury; volar or dorsal by its site and the direction of displacement.</li>
          <li><strong>Hutchinson (chauffeur's) fracture:</strong> an oblique fracture of the radial styloid extending into the joint.</li>
        </ul>
        <p>What matters most is the displacement, intra-articular extension with step-off at the radiocarpal joint or the DRUJ, comminution, and injuries of the ulna, carpus and soft tissues ({SHARMA}).</p>
        <h4>Measurements</h4>
        {measureTable}
        <p>A loss of radial length of more than 2 mm, dorsal tilt of more than 20° and radial inclination of less than 10° are associated with decreased wrist function in the long term, and most distal radius fractures lose the normal volar tilt ({SHARMA}). Schuind and colleagues' 120 normal adults had a radial inclination of 19° to 29° ({SCHUIND}), narrower than Sharma's 13° to 30°, so this form flags under 13° as below normal and says when a value sits between the two. Left and right wrists are symmetrical (mean differences of 1.5° for radial inclination, 0.5 mm for ulnar variance and 2.5° for palmar tilt), so the other wrist is a better reference than population data ({HOLLEVOET}). Ulnar variance becomes positive when the radius shortens ({SHARMA}).</p>
        <p>An articular step-off greater than 2 mm is associated with later osteoarthritis in a significant number of patients. CT shows displacement, comminution and step-off better, and intra-articular or comminuted fractures, DRUJ malalignment and carpal dislocations need CT for detailed evaluation and planning ({SHARMA}).</p>
        <p>A subtle fracture may show only as soft-tissue swelling, an obliterated pronator quadratus fat stripe (step 6), or a slight irregularity or bump on the dorsal rim of the radius, which is normally smooth ({SHARMA}).</p>
        <p>Distal radius fractures go with fractures of the ulnar styloid (55% to 61%) and distal ulna (6% to 9%), and with injuries of the triangular fibrocartilage (39% to 43%), the scapholunate ligament (16% to 40%) and the lunotriquetral ligament (9% to 15%) ({SHAHABPOUR}). With a fracture and a suspected tendon or ligament injury, the ACR rates MRI without contrast and MR arthrography 9, and CT arthrography and ultrasound 7 ({ACR}).</p>
        <h4>The ulna</h4>
        <p>Most ulnar styloid fractures are at the tip. Fractures through the base of the styloid, and those extending into the joint, often go with DRUJ dislocation and instability. Isolated ulnar head fractures are uncommon but usually unstable ({SHARMA}).</p>
      </>
    ),
  },
  {
    id: 'scaphoid',
    title: 'Step 4. Scaphoid',
    body: (
      <>
        <p>The scaphoid is the commonest carpal bone to break: 79% of carpal fractures in the series Shahabpour and colleagues cite ({SHAHABPOUR}; {SHARMA}). Most fractures are through the waist: 70% in Okoro's review, with 20% in the proximal third and 10% in the distal third ({OKORO}), and 80% in Sharma's ({SHARMA}). The blood supply enters the distal half of the bone, so the proximal pole is at risk of osteonecrosis, more so in proximal pole and comminuted fractures ({SHARMA}; {OKORO}). Non-union occurs in 5% to 10%, more often in displaced fractures ({STEINMANN}; {OKORO}). Displaced, comminuted and oblique fractures are mechanically unstable ({SHARMA}). A waist fracture angled dorsally (the humpback deformity) has a high risk of non-union and can go with DISI ({OKORO}).</p>
        <h4>Herbert types</h4>
        <p>Herbert and Fisher's types ({HERBERT}), as in the Herbert calculator on this site, which uses the same shared rules:</p>
        {herbertTable}
        <p>Steinmann and Adams give the same list, with B2 worded as displaced or mobile fractures of the waist and C as delayed union after more than 6 weeks in plaster ({STEINMANN}). The Herbert calculator, and so this form, words B2 as a complete waist fracture; its page gives the sources.</p>
        <h4>When the films are normal: the occult fracture</h4>
        <p>A scaphoid fracture is often occult on the first radiographs: up to 65% in Okoro's review ({OKORO}), and around 30% of all wrist fractures in Sharma's ({SHARMA}). Non-union occurs in up to 12% of patients if an occult fracture is not found and immobilised ({STEINMANN}).</p>
        <p>The sources differ on what comes next. The ACR rates repeat radiographs at 10 to 14 days 8, MRI without contrast 8 and CT without contrast 7, all usually appropriate, and bone scan 1 ({ACR}). Okoro and colleagues give cross-sectional imaging, or immobilisation and repeat radiographs in 7 to 10 days ({OKORO}). The classic approach was 2 weeks in a cast with repeat examination and radiographs, but MRI is superior to repeat radiographs for an occult fracture ({STEINMANN}); and Chen and colleagues say MRI is warranted if the radiographs are normal and suspicion is high ({CHEN}). MRI 2.8 days after the injury found occult scaphoid fractures with 100% sensitivity and specificity in 32 patients whose two routine and four scaphoid views were normal ({GAEBLER}). Sharma and colleagues favour CT, with MRI limited by availability, time and cost ({SHARMA}).</p>
        <p>In the Cochrane review, CT was 72% sensitive and 99% specific, MRI 88% and 100%, and bone scan 99% and 86%. Bone scan was statistically the most accurate, but more invasive, with radiation and a delay of at least 72 hours, and with a median of 20% of suspected fractures real, it overtreats more patients than CT or MRI ({MALLEE}). This form's impression offers MRI or CT, or repeat radiographs at 10 to 14 days, as the ACR rates them; after repeat films it offers MRI or CT.</p>
      </>
    ),
  },
  {
    id: 'carpus',
    title: 'Step 5. Perilunate injury and the other carpal bones',
    body: (
      <>
        <h4>Perilunate injury</h4>
        <p>Mayfield and colleagues described perilunar instability as a sequence of ligament injuries around the lunate, from the scapholunate joint to dislocation of the lunate itself ({MAYFIELD}; {KENNEDY_ALLAN}). The stages build on each other, so a later stage includes the injuries of the earlier ones. The Mayfield calculator on this site applies the same rules, and this form takes its answers from steps 2 and 4: the scapholunate interval or ring sign (or a scaphoid fracture in its place), the lateral alignment, and the lunotriquetral joint.</p>
        {mayfieldTable}
        <p>Reviews differ on which stage they call the perilunate dislocation: stage II, where the capitate dislocates dorsally while the lunate stays in line with the radius ({DVORSKY}; {SHARMA}; {OKORO}), or stage III ({KENNEDY_ALLAN}). So this site names the structures disrupted, as the calculator does. In stage III neither the capitate nor the lunate is in line with the radius, often called a midcarpal dislocation ({OKORO}), which Sharma and colleagues class as a variant of stage III ({SHARMA}).</p>
        <p>On the films: a widened scapholunate interval is an early sign. On the PA, look for a scaphoid fracture, a triangular lunate and broken carpal arcs; on the lateral, the lunate in line with the radius with the capitate dislocated dorsally ({SHARMA}). A dislocated lunate is triangular on the PA (the piece-of-pie sign) and tipped volarly on the lateral (the spilled teacup sign) ({DVORSKY}; {OKORO}). Up to 25% of perilunate dislocations are missed at first presentation ({DVORSKY}). CT shows the fractures and alignment for planning ({SHARMA}).</p>
        <p>When the injury passes through bone it is a greater arc injury. Perilunate dislocations with a fracture are twice as common as purely ligamentous (lesser arc) ones, and the trans-scaphoid perilunate fracture-dislocation is the commonest ({SHARMA}): about 95% of greater arc injuries involve the scaphoid ({OKORO}). The radial styloid, capitate and triquetrum can also break, and an ulnar styloid fracture can go with any stage ({OKORO}); radial styloid fractures were avulsions in Mayfield's cadavers ({MAYFIELD}).</p>
        <h4>The other carpal bones</h4>
        <p>The triquetrum is the second commonest carpal fracture ({SHARMA}; {OKORO}), 13% to 14% of carpal fractures ({SHAHABPOUR}). Most are on its dorsal surface and are best seen on the lateral or the oblique ({SHARMA}; {OKORO}). Sharma and colleagues put them down to impaction by the ulnar styloid in hyperextension or ligament avulsion in hyperflexion ({SHARMA}); Okoro and colleagues to avulsion of the shared attachment of the dorsal radiocarpal and dorsal intercarpal ligaments ({OKORO}). They are almost never associated with carpal instability ({SHAHABPOUR}). A fracture of the triquetral body, by contrast, often goes with an intrinsic ligament injury such as a lunotriquetral tear ({OKORO}).</p>
        <p>A hook of hamate fracture is hard to see on the PA: look for an absent hook or indistinct margins. The carpal tunnel view shows it, CT shows it in all cases, and a bipartite hamate (os hamuli proprium) can be mistaken for it. Hamate body fractures go with fractures of the fourth and fifth metacarpal bases and carpometacarpal dislocation ({SHARMA}). In Welling's series, cited by Shahabpour and colleagues, radiographs showed no lunate, trapezoid or capitate fracture, and only 20% of triquetral and 40% of hamate fractures ({SHAHABPOUR}).</p>
      </>
    ),
  },
  {
    id: 'soft-tissues',
    title: 'Step 6. Soft tissues',
    body: (
      <>
        <p>Soft-tissue swelling and obliteration of the pronator quadratus fat stripe may be a clue to a subtle distal radius fracture, and the scaphoid fat stripe may be obliterated in an occult scaphoid fracture ({SHARMA}). Look also for a radio-opaque foreign body ({CHEN}).</p>
        <p>The stripes are not reliable on their own. Against MRI, an abnormal scaphoid fat stripe was 50% sensitive and 50% specific for a scaphoid fracture, and an abnormal pronator stripe 26% sensitive and 70% specific for a distal radius fracture ({ANNAMALAI}). In Fallahi's series a positive pronator quadratus sign (raised, interrupted or obliterated) was 65% sensitive and 69% specific for an occult fracture, though the authors thought it useful in justifying MRI ({FALLAHI}). So this form records an abnormal stripe without calling it a fracture, and a normal stripe does not exclude one.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: a broken arc or a widened interval against the lateral, a scaphoid fracture against the perilunate ring, a distal radius fracture against the ulnar styloid, the DRUJ and the scapholunate interval, and an abnormal fat stripe against the bone under it.</p>
        <p>List the fractures and dislocations in search-pattern order, then any further test a source supports: MRI or CT for a suspected occult scaphoid fracture ({ACR}), CT for an intra-articular or comminuted fracture, the DRUJ or a carpal dislocation ({SHARMA}), and MRI for a ligament injury with a fracture ({ACR}). The order is this site's own.</p>
      </>
    ),
  },
]

/* The report. Option sets are shared by the fields, the report wording and the rules. */

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
const noYes: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const INTRA_ARTICULAR = ['barton-volar', 'barton-dorsal', 'styloid', 'intra-other']
const SCAPHOID_SIGNS = ['snuffbox-tender', 'tubercle-tender', 'snuffbox-swelling', 'thumb-compression']
const AWR_SIGNS = ['wrist-swelling', 'snuffbox-swelling', 'deformity', 'radius-tender', 'radial-deviation', 'thumb-compression']
const DISLOCATED_AXIS = ['capitate-dorsal', 'lunate-volar', 'midcarpal']

const fields = {
  history: { id: 'history', kind: 'choice', label: 'Study', required: true, options: [
    { value: 'injury', label: 'Wrist injury: wrist series' },
    { value: 'scaphoid', label: 'Suspected scaphoid fracture: scaphoid series' },
    { value: 'repeat', label: 'Repeat films for a suspected occult scaphoid fracture' },
  ] },
  side: { id: 'side', kind: 'choice', label: 'Side', required: true, options: [
    { value: 'Right', label: 'Right' },
    { value: 'Left', label: 'Left' },
  ] },
  mechanism: { id: 'mechanism', kind: 'choice', label: 'Mechanism', options: [
    { value: 'foosh', label: 'Fall on the outstretched hand' },
    { value: 'high-energy', label: 'High-energy (road traffic, fall from a height, sport)' },
    { value: 'direct', label: 'Direct blow' },
    { value: 'other', label: 'Other or not stated' },
  ] },
  signs: { id: 'signs', kind: 'multi', label: 'Clinical signs', help: 'The first six are the Amsterdam Wrist Rules\' examination findings.', options: [
    { value: 'wrist-swelling', label: 'Swelling of the wrist' },
    { value: 'snuffbox-swelling', label: 'Swelling of the anatomical snuffbox' },
    { value: 'deformity', label: 'Visible deformity' },
    { value: 'radius-tender', label: 'Distal radius tender' },
    { value: 'radial-deviation', label: 'Pain on radial deviation' },
    { value: 'thumb-compression', label: 'Painful axial compression of the thumb' },
    { value: 'snuffbox-tender', label: 'Snuffbox tenderness' },
    { value: 'tubercle-tender', label: 'Scaphoid tubercle tenderness' },
  ] },
  days: { id: 'days', kind: 'number', label: 'Time since the injury', unit: 'days', min: 0, max: 365, step: 1 },
  views: { id: 'views', kind: 'choice', label: 'Views', required: true, help: 'Wrist: PA, lateral, semipronated oblique. Scaphoid: PA, lateral, pronated oblique, ulnar-deviated PA.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'pa', label: 'PA' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'oblique', label: 'Pronated (semipronated) oblique' },
    { value: 'ulnar-deviation', label: 'PA in ulnar deviation (scaphoid view)' },
  ] },
  lateralQuality: { id: 'lateral-quality', kind: 'choice', label: 'Lateral', help: 'True: the pisiform lies between the palmar cortices of the scaphoid and the capitate.', options: [
    { value: 'true', label: 'True lateral' },
    { value: 'rotated', label: 'Rotated' },
  ] },

  arcs: { id: 'arcs', kind: 'choice', label: 'Carpal arcs (Gilula)', required: true, options: [
    { value: 'smooth', label: 'Smooth' },
    { value: 'broken', label: 'Broken or stepped' },
  ] },
  arcsBroken: { id: 'arcs-broken', kind: 'multi', label: 'Which arc', showIf: (v) => str(v, 'arcs') === 'broken', options: [
    { value: 'arc-1', label: 'Arc I (proximal scaphoid, lunate, triquetrum)' },
    { value: 'arc-2', label: 'Arc II (distal scaphoid, lunate, triquetrum)' },
    { value: 'arc-3', label: 'Arc III (proximal capitate and hamate)' },
  ] },
  slGap: { id: 'sl-gap', kind: 'number', label: 'Scapholunate interval (PA)', unit: 'mm', min: 0, max: 20, step: 0.5, help: 'Over 3 mm: widened (Terry-Thomas sign); compare the other wrist.' },
  ringSign: { id: 'ring-sign', kind: 'choice', label: 'Scaphoid ring sign', options: noYes },
  axis: { id: 'axis', kind: 'choice', label: 'Radius, lunate and capitate (lateral)', required: true, options: [
    { value: 'aligned', label: 'In line' },
    { value: 'capitate-dorsal', label: 'Lunate on the radius, capitate dislocated dorsally' },
    { value: 'lunate-volar', label: 'Lunate tipped volarly out of the radius, capitate in line with the radius' },
    { value: 'midcarpal', label: 'Neither lunate nor capitate in line with the radius' },
  ] },
  slAngle: { id: 'sl-angle', kind: 'number', label: 'Scapholunate angle', unit: '°', min: 0, max: 180, step: 1, help: 'Normal 30–60°. Over 60°: supports scapholunate malalignment; over 70°: strongly suggests DISI; below 30°: VISI.' },
  clAngle: { id: 'cl-angle', kind: 'number', label: 'Capitolunate angle', unit: '°', min: 0, max: 90, step: 1, help: 'Normal 0–30°.' },
  rlAngle: { id: 'rl-angle', kind: 'number', label: 'Dorsal tilt of the lunate (radiolunate angle)', unit: '°', min: 0, max: 90, step: 1, help: 'Over 15° dorsal on a true lateral: DISI.' },
  druj: { id: 'druj', kind: 'choice', label: 'Distal radioulnar joint', required: true, options: [
    { value: 'normal', label: 'Congruent' },
    { value: 'widened', label: 'Widened on the PA' },
    { value: 'displaced', label: 'Ulna displaced on the lateral' },
  ] },
  drujDistance: { id: 'druj-distance', kind: 'number', label: 'Radioulnar distance (dorsal cortices, true lateral)', unit: 'mm', min: 0, max: 40, step: 0.5, help: 'Over 6 mm: DRUJ instability; compare the other wrist.' },

  radius: { id: 'radius', kind: 'choice', label: 'Distal radius fracture', required: true, options: nonePresent },
  radiusType: { id: 'radius-type', kind: 'choice', label: 'Pattern', showIf: (v) => str(v, 'radius') === 'present', options: [
    { value: 'colles', label: 'Transverse, extra-articular, dorsal displacement or angulation' },
    { value: 'smith', label: 'Transverse, extra-articular, volar displacement or angulation' },
    { value: 'extra-other', label: 'Extra-articular, other' },
    { value: 'barton-volar', label: 'Intra-articular volar rim fracture, carpus displaced volarly' },
    { value: 'barton-dorsal', label: 'Intra-articular dorsal rim fracture, carpus displaced dorsally' },
    { value: 'styloid', label: 'Oblique radial styloid fracture into the joint' },
    { value: 'intra-other', label: 'Intra-articular, other' },
  ] },
  radiusFeatures: { id: 'radius-features', kind: 'multi', label: 'Also', showIf: (v) => str(v, 'radius') === 'present', options: [
    { value: 'comminuted', label: 'Comminuted' },
    { value: 'sigmoid', label: 'Into the sigmoid notch (DRUJ)' },
  ] },
  stepOff: { id: 'step-off', kind: 'number', label: 'Articular step-off', unit: 'mm', min: 0, max: 30, step: 0.5, showIf: (v) => str(v, 'radius') === 'present' && INTRA_ARTICULAR.includes(str(v, 'radius-type')), help: 'Over 2 mm: associated with later osteoarthritis.' },
  inclination: { id: 'inclination', kind: 'number', label: 'Radial inclination', unit: '°', min: -30, max: 60, step: 1, showIf: (v) => str(v, 'radius') === 'present', help: 'Normal 13–30° (Sharma); 19–29° (Schuind).' },
  radialHeight: { id: 'radial-height', kind: 'number', label: 'Radial height (length)', unit: 'mm', min: -10, max: 40, step: 0.5, showIf: (v) => str(v, 'radius') === 'present', help: 'Normal 11–22 mm.' },
  tiltDirection: { id: 'tilt-direction', kind: 'choice', label: 'Tilt of the articular surface', showIf: (v) => str(v, 'radius') === 'present', options: [
    { value: 'volar', label: 'Volar' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'dorsal', label: 'Dorsal' },
  ] },
  tilt: { id: 'tilt', kind: 'number', label: 'Tilt', unit: '°', min: 0, max: 90, step: 1, showIf: (v) => str(v, 'radius') === 'present' && ['volar', 'dorsal'].includes(str(v, 'tilt-direction')), help: 'Normal 4° dorsal to 11° volar.' },
  ulnarVariance: { id: 'ulnar-variance', kind: 'number', label: 'Ulnar variance (positive: ulna longer)', unit: 'mm', min: -15, max: 15, step: 0.5, help: 'Normal −4.2 to 2.3 mm.' },
  ulnarStyloid: { id: 'ulnar-styloid', kind: 'choice', label: 'Ulnar styloid fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'tip', label: 'Tip' },
    { value: 'base', label: 'Base' },
  ] },
  ulnarHead: { id: 'ulnar-head', kind: 'choice', label: 'Ulnar head or neck fracture', options: nonePresent },

  scaphoid: { id: 'scaphoid', kind: 'choice', label: 'Scaphoid fracture', required: true, options: [
    { value: 'none', label: 'None seen' },
    { value: 'equivocal', label: 'Equivocal' },
    { value: 'present', label: 'Present' },
  ] },
  herbert: { id: 'herbert', kind: 'choice', label: 'Herbert type', showIf: (v) => str(v, 'scaphoid') === 'present', help: 'As in the Herbert calculator.', options: herbertTypes.map((type) => ({ value: type, label: `${type}: ${herbertDescriptions[type]}` })) },
  scaphoidFeatures: { id: 'scaphoid-features', kind: 'multi', label: 'Also', showIf: (v) => str(v, 'scaphoid') === 'present', options: [
    { value: 'displaced', label: 'Displaced' },
    { value: 'comminuted', label: 'Comminuted' },
    { value: 'humpback', label: 'Humpback (dorsal angulation at the waist)' },
  ] },

  perilunate: { id: 'perilunate', kind: 'choice', label: 'Perilunate injury', required: true, options: nonePresent, help: 'Gives the Mayfield stage, as in the Mayfield calculator, with steps 2 and 4.' },
  lt: { id: 'lt', kind: 'choice', label: 'Lunotriquetral joint disrupted', showIf: (v) => str(v, 'perilunate') === 'present', help: 'Widened or stepped at the lunotriquetral joint.', options: noYes },
  arcFractures: { id: 'arc-fractures', kind: 'multi', label: 'Greater arc fractures', showIf: (v) => str(v, 'perilunate') === 'present', help: 'A scaphoid fracture is entered in step 4.', options: [
    { value: 'radial-styloid', label: 'Radial styloid' },
    { value: 'capitate', label: 'Capitate' },
    { value: 'triquetrum', label: 'Triquetrum' },
  ] },
  carpalOther: { id: 'carpal-other', kind: 'multi', label: 'Other carpal fractures', options: [
    { value: 'triquetrum-dorsal', label: 'Dorsal triquetral fracture' },
    { value: 'triquetrum-body', label: 'Triquetral body' },
    { value: 'hamate-hook', label: 'Hook of hamate' },
    { value: 'hamate-body', label: 'Hamate body' },
    { value: 'lunate', label: 'Lunate' },
    { value: 'capitate', label: 'Capitate' },
    { value: 'pisiform', label: 'Pisiform' },
    { value: 'trapezium', label: 'Trapezium' },
    { value: 'trapezoid', label: 'Trapezoid' },
  ] },

  pqFat: { id: 'pq-fat', kind: 'choice', label: 'Pronator quadratus fat stripe', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Obliterated or displaced' },
  ] },
  scaphoidFat: { id: 'scaphoid-fat', kind: 'choice', label: 'Scaphoid fat stripe', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'abnormal', label: 'Obliterated' },
  ] },
  swelling: { id: 'swelling', kind: 'choice', label: 'Soft-tissue swelling', options: nonePresent },

  otherFractures: { id: 'other-fractures', kind: 'text', label: 'Other fractures', placeholder: 'e.g. base of the fifth metacarpal' },
  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-malalignment', label: 'No carpal or DRUJ malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

const radiusPresent = (v: Values) => str(v, 'radius') === 'present'
const scaphoidPresent = (v: Values) => str(v, 'scaphoid') === 'present'
const perilunatePresent = (v: Values) => str(v, 'perilunate') === 'present'

/** X1-5: a scaphoid fracture is the clinical question, or its signs were found. */
function scaphoidSuspected(values: Values): boolean {
  return ['scaphoid', 'repeat'].includes(str(values, 'history')) || list(values, 'signs').some((sign) => SCAPHOID_SIGNS.includes(sign))
}

/** X2-2: a scapholunate interval over 3 mm. */
function slWidened(values: Values): boolean {
  const gap = num(values, 'sl-gap')
  return gap !== undefined && gap > 3
}

/**
 * X2-5 (the wrist MRI study's W3-2 rule): over 70° 'disi' (strongly suggests DISI), over 60° up to
 * 70° 'high' (beyond the normal range, supports scapholunate malalignment), below 30° 'visi',
 * 30–60° 'normal', or '' with no angle.
 */
function slAngleReading(values: Values): 'disi' | 'high' | 'visi' | 'normal' | '' {
  const angle = num(values, 'sl-angle')
  if (angle === undefined) return ''
  if (angle > 70) return 'disi'
  if (angle > 60) return 'high'
  if (angle < 30) return 'visi'
  return 'normal'
}

/** X2-6: the capitolunate angle over 30° is outside the normal range. */
function clHigh(values: Values): boolean {
  const angle = num(values, 'cl-angle')
  return angle !== undefined && angle > 30
}

/** X2-5: dorsal radiolunate angulation over 15° indicates DISI. */
function rlHigh(values: Values): boolean {
  const angle = num(values, 'rl-angle')
  return angle !== undefined && angle > 15
}

/** X2-7: DRUJ malalignment on the PA or lateral, or a dorsal-cortex distance over 6 mm. */
function drujAbnormal(values: Values): boolean {
  const distance = num(values, 'druj-distance')
  return ['widened', 'displaced'].includes(str(values, 'druj')) || (distance !== undefined && distance > 6)
}

/** Carpal malalignment short of a dislocation: what step 2's sentences describe. */
function carpalMalalignment(values: Values): boolean {
  return slWidened(values) || str(values, 'ring-sign') === 'yes' || ['disi', 'high', 'visi'].includes(slAngleReading(values)) || clHigh(values) || rlHigh(values)
}

const herbertType = (values: Values): HerbertType | undefined =>
  scaphoidPresent(values) && (herbertTypes as string[]).includes(str(values, 'herbert')) ? str(values, 'herbert') as HerbertType : undefined

/**
 * X5-1 (MF-1 to MF-5): the Mayfield input, only once a perilunate injury is entered. As in the
 * calculator, a scaphoid fracture can take the place of the scapholunate injury; the capitolunate
 * joint is disrupted whenever the lateral shows a dislocation, and the lunotriquetral joint when it
 * is marked or neither lunate nor capitate is in line with the radius (X5-2).
 */
function mayfieldInput(values: Values): MayfieldInput | undefined {
  if (!perilunatePresent(values)) return undefined
  const axis = str(values, 'axis')
  return {
    scapholunate: slWidened(values) || str(values, 'ring-sign') === 'yes' || scaphoidPresent(values),
    capitolunate: DISLOCATED_AXIS.includes(axis),
    lunotriquetral: str(values, 'lt') === 'yes' || axis === 'midcarpal',
    lunateDislocated: axis === 'lunate-volar',
  }
}

function mayfieldResult(values: Values): MayfieldResult | undefined {
  const input = mayfieldInput(values)
  return input && mayfield(input)
}

/** The fractures entered, for the negatives and the normal impression. */
function fracturesEntered(values: Values): string[] {
  return [
    radiusPresent(values) && 'distal radius fracture',
    ['tip', 'base'].includes(str(values, 'ulnar-styloid')) && 'ulnar styloid fracture',
    str(values, 'ulnar-head') === 'present' && 'ulnar head or neck fracture',
    scaphoidPresent(values) && 'scaphoid fracture',
    perilunatePresent(values) && list(values, 'arc-fractures').length > 0 && 'greater arc fracture',
    list(values, 'carpal-other').length > 0 && 'carpal fracture',
    str(values, 'other-fractures') !== '' && str(values, 'other-fractures'),
  ].filter((item): item is string => Boolean(item))
}

/** The malalignment entered, for the negatives. */
function malalignmentEntered(values: Values): string[] {
  return [
    str(values, 'arcs') === 'broken' && 'broken carpal arc',
    slWidened(values) && 'widened scapholunate interval',
    DISLOCATED_AXIS.includes(str(values, 'axis')) && 'carpal dislocation on the lateral',
    perilunatePresent(values) && 'perilunate injury',
    ['disi', 'high', 'visi'].includes(slAngleReading(values)) && 'abnormal scapholunate angle',
    clHigh(values) && 'abnormal capitolunate angle',
    rlHigh(values) && 'dorsal tilt of the lunate',
    drujAbnormal(values) && 'DRUJ malalignment',
  ].filter((item): item is string => Boolean(item))
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveTechnique(values: Values): Derived[] {
  const out: Derived[] = []
  const history = str(values, 'history')
  // X1-1, X4-6: the ACR ratings, first films and after negative or equivocal films.
  if (history === 'injury' || history === 'scaphoid') out.push({ label: 'ACR', value: 'Radiographs 9 as the first test; CT, MRI, ultrasound and bone scan 1' })
  if (history === 'repeat') out.push({ label: 'ACR', value: 'After negative or equivocal films: repeat radiographs at 10–14 days 8, MRI 8, CT 7' })
  // X1-2: the Amsterdam Wrist Rules' examination findings.
  if (list(values, 'signs').some((sign) => AWR_SIGNS.includes(sign))) out.push({ label: 'Amsterdam Wrist Rules', value: 'With age and sex, these signs select adults for radiography: 98% sensitive, 21% specific' })
  // X1-5: the clinical suspicion of a scaphoid fracture.
  if (scaphoidSuspected(values)) out.push({ label: 'Scaphoid suspected', value: 'Examination 74–80% specific; a fracture in a median of 20% of suspected cases' })
  // X1-3, X1-4: the views for each study.
  const missing = str(values, 'views') === 'incomplete' ? list(values, 'views-missing') : []
  if (history !== 'injury' && history !== '' && (missing.includes('oblique') || missing.includes('ulnar-deviation'))) {
    out.push({ label: 'Scaphoid series', value: 'Four views: PA and lateral for alignment, pronated oblique and ulnar-deviated PA for the fracture', tone: 'warn' })
  }
  if (history === 'injury' && missing.some((view) => ['pa', 'lateral', 'oblique'].includes(view))) {
    out.push({ label: 'Wrist series', value: 'At least three views: PA, lateral and semipronated oblique', tone: 'warn' })
  }
  // X1-6: the true lateral.
  if (str(values, 'lateral-quality') === 'rotated') out.push({ label: 'Lateral', value: 'Rotated: the carpal angles and the DRUJ cannot be read reliably', tone: 'warn' })
  // X4-6: repeat films earlier than either interval the sources give.
  const days = num(values, 'days')
  if (history === 'repeat' && days !== undefined && days < 7) out.push({ label: 'Timing', value: 'Earlier than 7–10 days (Okoro) or 10–14 days (ACR)', tone: 'warn' })
  return out
}

function deriveAlignment(values: Values): Derived[] {
  const out: Derived[] = []
  // X2-1: a break in an arc.
  if (str(values, 'arcs') === 'broken') out.push({ label: 'Carpal arcs', value: 'Broken: a ligament injury or fracture at the break (two normal variants can step them)', tone: 'warn' })
  if (str(values, 'arcs') === 'smooth') out.push({ label: 'Carpal arcs', value: 'Smooth', tone: 'good' })
  // X2-2: the scapholunate interval.
  const gap = num(values, 'sl-gap')
  if (gap !== undefined) {
    out.push(gap > 3
      ? { label: 'Scapholunate interval', value: 'Over 3 mm: widened (Terry-Thomas sign); up to 4 mm can be normal, so compare the other wrist', tone: 'warn' }
      : { label: 'Scapholunate interval', value: '3 mm or less: not widened', tone: 'good' })
  }
  // X2-3: the ring sign.
  if (str(values, 'ring-sign') === 'yes') out.push({ label: 'Ring sign', value: 'Flexed scaphoid: with a widened interval, scapholunate injury with rotatory subluxation', tone: 'warn' })
  // X2-4: the lateral.
  const axis = str(values, 'axis')
  if (axis === 'capitate-dorsal') out.push({ label: 'Lateral', value: 'Lunate in line with the radius, capitate dorsal: perilunate dislocation', tone: 'warn' })
  if (axis === 'lunate-volar') out.push({ label: 'Lateral', value: 'Lunate tipped volarly (spilled teacup): lunate dislocation', tone: 'warn' })
  if (axis === 'midcarpal') out.push({ label: 'Lateral', value: 'Neither in line with the radius: midcarpal dislocation, a variant of stage III', tone: 'warn' })
  // X2-5 (W3-2): the scapholunate angle, read as in the wrist MRI study.
  const reading = slAngleReading(values)
  if (reading === 'disi') out.push({ label: 'Scapholunate angle', value: 'Above 70°: strongly suggests DISI', tone: 'warn' })
  if (reading === 'high') out.push({ label: 'Scapholunate angle', value: 'Above 60°: beyond the normal range, supports scapholunate malalignment', tone: 'warn' })
  if (reading === 'visi') out.push({ label: 'Scapholunate angle', value: 'Below 30°: suggests VISI', tone: 'warn' })
  if (reading === 'normal') out.push({ label: 'Scapholunate angle', value: 'Within 30–60°', tone: 'good' })
  // X2-6: the capitolunate angle, and the VISI pattern.
  if (clHigh(values)) {
    out.push(reading === 'visi'
      ? { label: 'Capitolunate angle', value: 'Over 30°, with a scapholunate angle under 30°: VISI pattern', tone: 'warn' }
      : { label: 'Capitolunate angle', value: 'Over 30°: outside the normal range, suggests carpal instability', tone: 'warn' })
  } else if (num(values, 'cl-angle') !== undefined) out.push({ label: 'Capitolunate angle', value: 'Within 0–30°', tone: 'good' })
  // X2-5: dorsal tilt of the lunate.
  if (rlHigh(values)) out.push({ label: 'Lunate', value: 'Dorsal radiolunate angle over 15°: DISI', tone: 'warn' })
  // X2-7: the DRUJ.
  const distance = num(values, 'druj-distance')
  if (distance !== undefined && distance > 6) out.push({ label: 'Radioulnar distance', value: 'Over 6 mm on a true lateral: DRUJ instability', tone: 'warn' })
  if (drujAbnormal(values)) out.push({ label: 'DRUJ', value: 'Malalignment: CT is the standard test; with no fracture, ACR rates CT of both wrists 9', tone: 'warn' })
  return out
}

/** X3-4: the radial inclination against Sharma's and Schuind's normal ranges. */
function inclinationChip(angle: number): Derived {
  if (angle < 10) return { label: 'Radial inclination', value: 'Under 10°: associated with decreased wrist function', tone: 'warn' }
  if (angle < 13) return { label: 'Radial inclination', value: 'Below the normal 13–30°', tone: 'warn' }
  if (angle < 19) return { label: 'Radial inclination', value: 'Within 13–30° (Sharma), below 19–29° (Schuind)' }
  if (angle > 30) return { label: 'Radial inclination', value: 'Above the normal 13–30°', tone: 'warn' }
  return { label: 'Radial inclination', value: 'Within the normal range', tone: 'good' }
}

/** X3-5: the tilt against Sharma's normal range, 4° dorsal to 11° volar. */
function tiltChip(values: Values): Derived | undefined {
  const direction = str(values, 'tilt-direction')
  if (direction === 'neutral') return { label: 'Tilt', value: 'Within the normal range (4° dorsal to 11° volar)', tone: 'good' }
  const tilt = num(values, 'tilt')
  if (tilt === undefined || !direction) return undefined
  if (direction === 'dorsal' && tilt > 20) return { label: 'Tilt', value: 'Dorsal tilt over 20°: associated with decreased wrist function', tone: 'warn' }
  if (direction === 'dorsal' && tilt > 4) return { label: 'Tilt', value: 'Dorsal tilt beyond the normal range (4° dorsal to 11° volar)', tone: 'warn' }
  if (direction === 'volar' && tilt > 11) return { label: 'Tilt', value: 'Volar tilt beyond the normal range (4° dorsal to 11° volar)', tone: 'warn' }
  return { label: 'Tilt', value: 'Within the normal range (4° dorsal to 11° volar)', tone: 'good' }
}

const RADIUS_NAMES: Record<string, string> = {
  colles: 'Colles fracture',
  smith: 'Smith fracture (reverse Colles)',
  'barton-volar': 'Volar Barton fracture (shear)',
  'barton-dorsal': 'Dorsal Barton fracture (shear)',
  styloid: 'Hutchinson (chauffeur\'s) fracture',
}

function deriveRadius(values: Values): Derived[] {
  const out: Derived[] = []
  if (radiusPresent(values)) {
    const type = str(values, 'radius-type')
    // X3-1: the eponyms, as descriptive names.
    if (RADIUS_NAMES[type]) out.push({ label: 'Name', value: RADIUS_NAMES[type] })
    // X3-7: CT for an intra-articular or comminuted fracture.
    if (INTRA_ARTICULAR.includes(type) || list(values, 'radius-features').includes('comminuted')) out.push({ label: 'CT', value: 'Intra-articular or comminuted: CT shows step-off and comminution better, for planning', tone: 'warn' })
    // X3-6: step-off over 2 mm.
    const step = num(values, 'step-off')
    if (step !== undefined && step > 2) out.push({ label: 'Step-off', value: 'Over 2 mm: associated with later osteoarthritis', tone: 'warn' })
    // X3-4, X3-5, X3-3: the measurements.
    const inclination = num(values, 'inclination')
    if (inclination !== undefined) out.push(inclinationChip(inclination))
    const height = num(values, 'radial-height')
    if (height !== undefined) out.push(height < 11 ? { label: 'Radial height', value: 'Below the normal 11–22 mm: radial shortening', tone: 'warn' } : { label: 'Radial height', value: 'Within 11–22 mm', tone: 'good' })
    const tilt = tiltChip(values)
    if (tilt) out.push(tilt)
    // X3-8: what goes with a distal radius fracture.
    out.push({ label: 'Also look for', value: 'Ulnar styloid fracture (55–61%), TFCC (39–43%), scapholunate (16–40%) and lunotriquetral (9–15%) injury' })
  }
  // X3-9: ulnar variance against Schuind's normal range.
  const variance = num(values, 'ulnar-variance')
  if (variance !== undefined && variance > 2.3) out.push({ label: 'Ulnar variance', value: `Positive, above the normal −4.2 to 2.3 mm${radiusPresent(values) ? '; goes with radial shortening' : ''}`, tone: 'warn' })
  if (variance !== undefined && variance < -4.2) out.push({ label: 'Ulnar variance', value: 'Negative, below the normal −4.2 to 2.3 mm' })
  // X3-10: the ulnar styloid and head.
  if (str(values, 'ulnar-styloid') === 'base') out.push({ label: 'Ulnar styloid', value: 'Base: often goes with DRUJ dislocation and instability', tone: 'warn' })
  if (str(values, 'ulnar-styloid') === 'tip') out.push({ label: 'Ulnar styloid', value: 'Tip: the commonest site' })
  if (str(values, 'ulnar-head') === 'present') out.push({ label: 'Ulnar head', value: 'Usually unstable', tone: 'warn' })
  // X3-11: a fracture with a suspected ligament injury.
  if (fracturesEntered(values).length > 0 && carpalMalalignment(values) && !perilunatePresent(values)) out.push({ label: 'ACR', value: 'Fracture with a suspected ligament injury: MRI or MR arthrography 9' })
  return out
}

function deriveScaphoid(values: Values): Derived[] {
  const out: Derived[] = []
  const scaphoid = str(values, 'scaphoid')
  // X4-2 (HB-1 to HB-5): the Herbert type from the shared logic.
  const herbert = herbertType(values)
  if (herbert) out.push({ label: 'Herbert', value: `Type ${herbert} (${herbertGroup(herbert)})`, tone: 'warn' })
  // X4-1: the proximal pole.
  if (herbert === 'B3') out.push({ label: 'Proximal pole', value: 'Osteonecrosis is more common', tone: 'warn' })
  // X4-1: displaced or comminuted.
  const features = list(values, 'scaphoid-features')
  if (scaphoid === 'present' && (features.includes('displaced') || features.includes('comminuted'))) out.push({ label: 'Unstable', value: 'Displaced or comminuted: mechanically unstable; non-union is more common when displaced', tone: 'warn' })
  // X4-1: the humpback deformity.
  if (scaphoid === 'present' && features.includes('humpback')) out.push({ label: 'Humpback', value: 'High risk of non-union; can go with DISI', tone: 'warn' })
  // X4-5, X4-6, X4-7: no fracture seen, but one is suspected.
  if ((scaphoid === 'none' || scaphoid === 'equivocal') && scaphoidSuspected(values)) {
    out.push(str(values, 'history') === 'repeat'
      ? { label: 'Occult fracture', value: 'Still not excluded: MRI 88% and CT 72% sensitive, 100% and 99% specific', tone: 'warn' }
      : { label: 'Occult fracture', value: 'Not excluded: ACR next, MRI 8, repeat films at 10–14 days 8, CT 7', tone: 'warn' })
  }
  return out
}

function deriveCarpus(values: Values): Derived[] {
  const out: Derived[] = []
  // X5-1 (MF-1 to MF-5): the Mayfield stage from the shared logic.
  const result = mayfieldResult(values)
  if (result) out.push({ label: 'Mayfield', value: `Stage ${result.stage}`, tone: 'warn' })
  if (perilunatePresent(values)) {
    // X5-4: a greater arc injury.
    if (scaphoidPresent(values) || list(values, 'arc-fractures').length > 0) out.push({ label: 'Greater arc', value: 'Through bone: trans-scaphoid perilunate fracture-dislocation is the commonest pattern' })
    // X5-3: CT for a carpal dislocation.
    out.push({ label: 'CT', value: 'Carpal dislocation: CT for the fractures and alignment, for planning', tone: 'warn' })
  } else if (str(values, 'perilunate') === 'none' && (str(values, 'arcs') === 'broken' || slWidened(values) || DISLOCATED_AXIS.includes(str(values, 'axis')))) {
    // X5-3: perilunate dislocations are missed.
    out.push({ label: 'Check', value: 'Up to 25% of perilunate dislocations are missed at first: recheck the arcs and the lateral', tone: 'warn' })
  }
  const other = list(values, 'carpal-other')
  // X5-5: the dorsal triquetral fracture.
  if (other.includes('triquetrum-dorsal')) out.push({ label: 'Dorsal triquetrum', value: 'Best seen on the lateral; a dorsal ligament avulsion, almost never with carpal instability' })
  // X5-6: the triquetral body.
  if (other.includes('triquetrum-body')) out.push({ label: 'Triquetral body', value: 'Often with an intrinsic ligament (lunotriquetral) injury', tone: 'warn' })
  // X5-7: the hamate.
  if (other.includes('hamate-hook')) out.push({ label: 'Hook of hamate', value: 'Carpal tunnel view or CT; do not mistake a bipartite hamate' })
  if (other.includes('hamate-body')) out.push({ label: 'Hamate body', value: 'Check the fourth and fifth metacarpal bases and carpometacarpal joints', tone: 'warn' })
  return out
}

function deriveSoftTissues(values: Values): Derived[] {
  const out: Derived[] = []
  // X6-1, X6-2: the fat stripes, a clue but unreliable.
  if (str(values, 'pq-fat') === 'abnormal' && !radiusPresent(values)) out.push({ label: 'Pronator quadratus', value: 'A clue to a subtle fracture, but only 26–65% sensitive', tone: 'warn' })
  if (str(values, 'scaphoid-fat') === 'abnormal' && !scaphoidPresent(values)) out.push({ label: 'Scaphoid fat stripe', value: 'May mean an occult fracture, but 50% sensitive and 50% specific', tone: 'warn' })
  if (str(values, 'scaphoid-fat') === 'normal' && !scaphoidPresent(values) && scaphoidSuspected(values)) out.push({ label: 'Scaphoid fat stripe', value: 'A normal stripe does not exclude a fracture' })
  // X6-1: swelling.
  if (str(values, 'swelling') === 'present' && fracturesEntered(values).length === 0) out.push({ label: 'Swelling', value: 'A clue to a subtle fracture', tone: 'warn' })
  return out
}

/* Report lines. */

const STUDY_WORDS: Record<string, string> = {
  injury: 'wrist radiographs after injury',
  scaphoid: 'scaphoid series for a suspected scaphoid fracture',
  repeat: 'repeat scaphoid series for a suspected occult scaphoid fracture',
}

const VIEW_WORDS: Record<string, string> = {
  injury: 'PA, lateral and semipronated oblique',
  scaphoid: 'PA, lateral, pronated oblique and PA in ulnar deviation',
  repeat: 'PA, lateral, pronated oblique and PA in ulnar deviation',
}

function techniqueLines(values: Values): (string | false)[] {
  const history = str(values, 'history')
  const views = str(values, 'views')
  const missing = chosen(values, fields.viewsMissing)
  const rotated = str(values, 'lateral-quality') === 'rotated' ? '; lateral rotated' : ''
  return [
    history && `Study: ${STUDY_WORDS[history]}`,
    views === 'complete' && history && `Views: ${VIEW_WORDS[history]}${rotated}`,
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}${rotated}`,
  ]
}

function clinicalLine(values: Values): string {
  const days = num(values, 'days')
  const mechanism = str(values, 'mechanism')
  const clinical = join([
    lowerFirst(str(values, 'side')),
    mechanism && mechanism !== 'other' && picked(values, fields.mechanism),
    ...chosen(values, fields.signs),
    days !== undefined && `${days} ${days === 1 ? 'day' : 'days'} after the injury`,
  ], ', ')
  return clinical && `Clinical: ${clinical}`
}

function alignmentLines(values: Values): (string | false)[] {
  const gap = num(values, 'sl-gap')
  const sl = num(values, 'sl-angle')
  const cl = num(values, 'cl-angle')
  const rl = num(values, 'rl-angle')
  const distance = num(values, 'druj-distance')
  const arcs = chosen(values, fields.arcsBroken).map((arc) => arc.replace(/ \(.*\)$/, ''))
  return [
    str(values, 'arcs') === 'smooth' && 'Carpal arcs: smooth',
    str(values, 'arcs') === 'broken' && `Carpal arcs: broken${arcs.length > 0 ? ` (${arcs.join(', ')})` : ''}`,
    gap !== undefined && `Scapholunate interval: ${gap} mm`,
    str(values, 'ring-sign') === 'yes' && 'Scaphoid ring sign',
    str(values, 'axis') === 'aligned' && 'Lateral: radius, lunate and capitate in line',
    DISLOCATED_AXIS.includes(str(values, 'axis')) && `Lateral: ${picked(values, fields.axis)}`,
    sl !== undefined && `Scapholunate angle: ${sl}°`,
    cl !== undefined && `Capitolunate angle: ${cl}°`,
    rl !== undefined && `Radiolunate angle: ${rl}° dorsal`,
    str(values, 'druj') && `Distal radioulnar joint: ${picked(values, fields.druj)}`,
    distance !== undefined && `Radioulnar distance (true lateral): ${distance} mm`,
  ]
}

function signed(value: number): string {
  return value > 0 ? `+${value}` : `${value}`
}

function radiusLines(values: Values): (string | false)[] {
  const step = num(values, 'step-off')
  const inclination = num(values, 'inclination')
  const height = num(values, 'radial-height')
  const tilt = num(values, 'tilt')
  const direction = str(values, 'tilt-direction')
  const variance = num(values, 'ulnar-variance')
  const styloid = str(values, 'ulnar-styloid')
  return [
    str(values, 'radius') === 'none' && 'Distal radius fracture: none',
    radiusPresent(values) && `Distal radius fracture: ${join([picked(values, fields.radiusType) || 'present', ...chosen(values, fields.radiusFeatures), step !== undefined && `step-off ${step} mm`])}`,
    inclination !== undefined && `Radial inclination: ${inclination}°`,
    height !== undefined && `Radial height: ${height} mm`,
    direction === 'neutral' && 'Tilt: neutral',
    tilt !== undefined && (direction === 'volar' || direction === 'dorsal') && `Tilt: ${tilt}° ${direction}`,
    variance !== undefined && `Ulnar variance: ${signed(variance)} mm`,
    styloid === 'none' && 'Ulnar styloid fracture: none',
    (styloid === 'tip' || styloid === 'base') && `Ulnar styloid fracture: ${styloid}`,
    str(values, 'ulnar-head') === 'present' && 'Ulnar head or neck fracture: present',
  ]
}

function scaphoidLine(values: Values): string {
  const scaphoid = str(values, 'scaphoid')
  const herbert = herbertType(values)
  if (scaphoid === 'none') return 'Scaphoid: no fracture seen'
  if (scaphoid === 'equivocal') return 'Scaphoid: equivocal'
  if (scaphoid === 'present') return `Scaphoid: ${join([`fracture${herbert ? `, Herbert ${herbert}: ${herbertDescriptions[herbert]}` : ''}`, ...chosen(values, fields.scaphoidFeatures)])}`
  return ''
}

function carpusLines(values: Values): (string | false)[] {
  const arc = chosen(values, fields.arcFractures)
  const other = chosen(values, fields.carpalOther)
  return [
    str(values, 'perilunate') === 'none' && 'Perilunate injury: none',
    perilunatePresent(values) && `Perilunate injury: ${join(['present', str(values, 'lt') === 'yes' && 'lunotriquetral joint disrupted', arc.length > 0 && `fractures of the ${andList(arc)}`])}`,
    other.length > 0 && `Other carpal fractures: ${other.join(', ')}`,
  ]
}

function softTissueLines(values: Values): (string | false)[] {
  return [
    str(values, 'pq-fat') && `Pronator quadratus fat stripe: ${picked(values, fields.pqFat)}`,
    str(values, 'scaphoid-fat') && `Scaphoid fat stripe: ${picked(values, fields.scaphoidFat)}`,
    str(values, 'swelling') === 'present' && 'Soft-tissue swelling',
  ]
}

/* The impression: the fractures and dislocations in search-pattern order, then the further tests. */

const RADIUS_SENTENCES: Record<string, string> = {
  colles: 'Transverse extra-articular distal radius fracture with dorsal displacement or angulation (Colles fracture)',
  smith: 'Transverse extra-articular distal radius fracture with volar displacement or angulation (Smith fracture)',
  'extra-other': 'Extra-articular distal radius fracture',
  'barton-volar': 'Intra-articular volar rim fracture of the distal radius with the carpus displaced volarly (volar Barton fracture)',
  'barton-dorsal': 'Intra-articular dorsal rim fracture of the distal radius with the carpus displaced dorsally (dorsal Barton fracture)',
  styloid: 'Oblique fracture of the radial styloid extending into the joint (Hutchinson or chauffeur\'s fracture)',
  'intra-other': 'Intra-articular distal radius fracture',
}

const CARPAL_SENTENCES: Record<string, string> = {
  'triquetrum-dorsal': 'Dorsal triquetral fracture.',
  'triquetrum-body': 'Fracture of the triquetral body.',
  'hamate-hook': 'Fracture of the hook of the hamate.',
  'hamate-body': 'Fracture of the hamate body.',
  lunate: 'Lunate fracture.',
  capitate: 'Capitate fracture.',
  pisiform: 'Pisiform fracture.',
  trapezium: 'Trapezium fracture.',
  trapezoid: 'Trapezoid fracture.',
}

function radiusFindings(values: Values): string[] {
  if (!radiusPresent(values)) return []
  const type = str(values, 'radius-type')
  const features = list(values, 'radius-features')
  const step = num(values, 'step-off')
  const detail = join([
    features.includes('comminuted') && 'comminuted',
    features.includes('sigmoid') && 'extending into the sigmoid notch',
    step !== undefined && `with ${step} mm of articular step-off`,
  ], ', ')
  const out = [`${RADIUS_SENTENCES[type] ?? 'Distal radius fracture'}${detail ? `, ${detail}` : ''}.`]
  // X3-4, X3-3, X3-5: the measurements beyond their normal ranges.
  const inclination = num(values, 'inclination')
  const height = num(values, 'radial-height')
  const tilt = num(values, 'tilt')
  const direction = str(values, 'tilt-direction')
  const measures = [
    inclination !== undefined && inclination < 13 && `radial inclination ${inclination}°`,
    height !== undefined && height < 11 && `radial height ${height} mm`,
    tilt !== undefined && direction === 'dorsal' && tilt > 4 && `dorsal tilt ${tilt}°`,
    tilt !== undefined && direction === 'volar' && tilt > 11 && `volar tilt ${tilt}°`,
  ].filter((item): item is string => Boolean(item))
  if (measures.length > 0) out.push(`${upperFirst(andList(measures))}, beyond the normal range.`)
  return out
}

function ulnaFindings(values: Values): string[] {
  const styloid = str(values, 'ulnar-styloid')
  return [
    styloid === 'tip' && 'Fracture of the tip of the ulnar styloid.',
    styloid === 'base' && 'Fracture of the base of the ulnar styloid.',
    str(values, 'ulnar-head') === 'present' && 'Fracture of the ulnar head or neck.',
  ].filter((item): item is string => Boolean(item))
}

function scaphoidFindings(values: Values): string[] {
  const scaphoid = str(values, 'scaphoid')
  if (scaphoid === 'present') {
    const herbert = herbertType(values)
    const features = chosen(values, fields.scaphoidFeatures).map((feature) => feature.replace(/ \(.*\)$/, ''))
    const sentence = herbert ? herbertSentence(herbert) : 'Scaphoid fracture.'
    return [features.length > 0 ? `${sentence.replace(/\.$/, '')}; ${andList(features)}.` : sentence]
  }
  if (scaphoid === 'equivocal') return ['Possible scaphoid fracture.']
  return []
}

function perilunateFindings(values: Values): string[] {
  if (!perilunatePresent(values)) return []
  const result = mayfieldResult(values)
  const out = [result ? mayfieldSentence(result) : 'Perilunate injury.']
  const arc = chosen(values, fields.arcFractures)
  if (arc.length > 0) out.push(`Greater arc fractures of the ${andList(arc)}.`)
  return out
}

/** Step 2's sentences, when no perilunate injury explains them. */
function alignmentFindings(values: Values): string[] {
  const out: string[] = []
  const perilunate = perilunatePresent(values)
  const gap = num(values, 'sl-gap')
  // X2-1
  if (str(values, 'arcs') === 'broken' && !perilunate) {
    const arcs = chosen(values, fields.arcsBroken).map((arc) => arc.replace(/ \(.*\)$/, ''))
    out.push(`${arcs.length > 0 ? upperFirst(andList(arcs)) : 'A carpal arc'} broken: a ligament injury or fracture at the break.`)
  }
  // X2-2, X2-3
  if (slWidened(values) && !perilunate) out.push(`Scapholunate interval widened to ${gap} mm (Terry-Thomas sign)${str(values, 'ring-sign') === 'yes' ? ', with a scaphoid ring sign' : ''}, suggesting a scapholunate ligament injury.`)
  else if (str(values, 'ring-sign') === 'yes' && !perilunate) out.push('Scaphoid ring sign: flexed scaphoid.')
  // X2-4: a dislocation on the lateral with no perilunate injury entered.
  if (DISLOCATED_AXIS.includes(str(values, 'axis')) && !perilunate) out.push(`${upperFirst(picked(values, fields.axis))} on the lateral.`)
  // X2-5 (W3-2), the wrist MRI study's wording.
  const reading = slAngleReading(values)
  const sl = num(values, 'sl-angle')
  if (reading === 'disi') out.push(`Scapholunate angle ${sl}°, strongly suggesting DISI.`)
  if (reading === 'high') out.push(`Scapholunate angle ${sl}°, above the normal range, supporting scapholunate malalignment.`)
  if (reading === 'visi') out.push(`Scapholunate angle ${sl}°, suggesting VISI.`)
  // X2-6
  if (clHigh(values)) out.push(`Capitolunate angle ${num(values, 'cl-angle')}°, outside the normal range.`)
  // X2-5
  if (rlHigh(values)) out.push(`Dorsal tilt of the lunate (radiolunate angle ${num(values, 'rl-angle')}°), indicating DISI.`)
  // X2-7
  if (drujAbnormal(values)) out.push('Distal radioulnar joint malalignment.')
  return out
}

function carpalFindings(values: Values): string[] {
  return list(values, 'carpal-other').map((value) => CARPAL_SENTENCES[value]).filter((item): item is string => Boolean(item))
}

function softTissueFindings(values: Values): string[] {
  return [
    // X6-1, X6-2: recorded, not called a fracture.
    str(values, 'pq-fat') === 'abnormal' && !radiusPresent(values) && 'Pronator quadratus fat stripe obliterated or displaced, with no fracture seen.',
    str(values, 'scaphoid-fat') === 'abnormal' && !scaphoidPresent(values) && 'Scaphoid fat stripe obliterated, with no fracture seen.',
  ].filter((item): item is string => Boolean(item))
}

/** The further tests a source supports, each once. */
function furtherTests(values: Values): string[] {
  const out: string[] = []
  const scaphoid = str(values, 'scaphoid')
  // X4-6, X4-7: a suspected occult scaphoid fracture.
  if ((scaphoid === 'none' || scaphoid === 'equivocal') && scaphoidSuspected(values)) {
    out.push(str(values, 'history') === 'repeat'
      ? 'An occult scaphoid fracture is not excluded; if it is still suspected clinically, consider MRI or CT.'
      : 'Radiographs do not exclude an occult scaphoid fracture; if it is still suspected clinically, consider MRI or CT, or repeat radiographs in 10–14 days.')
  }
  // X3-7: an intra-articular or comminuted distal radius fracture.
  if (radiusPresent(values) && (INTRA_ARTICULAR.includes(str(values, 'radius-type')) || list(values, 'radius-features').includes('comminuted'))) out.push('Consider CT for the articular surface and comminution.')
  // X5-3: a carpal dislocation.
  if (perilunatePresent(values)) out.push('Consider CT for the fractures and carpal alignment.')
  // X2-7: the DRUJ.
  else if (drujAbnormal(values)) out.push('Consider CT for the distal radioulnar joint.')
  // X3-11, X2-8: a ligament injury with a fracture, or malalignment with none.
  if (!perilunatePresent(values) && carpalMalalignment(values)) {
    out.push(fracturesEntered(values).length > 0 ? 'Consider MRI for a ligament injury.' : 'Consider CT of both wrists or MRI.')
  }
  return out
}

function findings(values: Values): string[] {
  return [
    ...radiusFindings(values),
    ...ulnaFindings(values),
    ...scaphoidFindings(values),
    ...perilunateFindings(values),
    ...carpalFindings(values),
    ...alignmentFindings(values),
    ...(str(values, 'other-fractures') ? [`${upperFirst(str(values, 'other-fractures').replace(/\.$/, ''))}.`] : []),
    ...softTissueFindings(values),
  ]
}

const NORMAL_IMPRESSION = 'No fracture or malalignment.'

function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn' && chip.label !== 'Occult fracture' && chip.label !== 'Scaphoid suspected'))
}

/** Every required item, among the fields currently shown, is answered. */
function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function impression(values: Values): string {
  const found = findings(values)
  const tests = furtherTests(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // A warn chip (e.g. a rotated lateral) or free text is not a finding the impression can
    // name, so never call such a study normal.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...tests)}`
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...tests)}`
    return tests.length > 0 ? `Impression: ${lines(...tests)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...tests)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fracturesEntered(values)],
    ['no-malalignment', 'no carpal or DRUJ malalignment', malalignmentEntered(values)],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }
  // X1-6: angles and distances on a rotated lateral.
  if (str(values, 'lateral-quality') === 'rotated' && ['sl-angle', 'cl-angle', 'rl-angle', 'druj-distance'].some((id) => num(values, id) !== undefined)) {
    out.push('The lateral is entered as rotated, but carpal angles or a radioulnar distance are entered: they are reliable only on a true lateral.')
  }
  // X2-1: a broken arc that nothing explains.
  if (str(values, 'arcs') === 'broken' && fracturesEntered(values).length === 0 && !slWidened(values) && !perilunatePresent(values) && !DISLOCATED_AXIS.includes(str(values, 'axis'))) {
    out.push('A carpal arc is broken, but no fracture, scapholunate widening or dislocation is entered: a break suggests a ligament injury or fracture at that site, unless it is one of the two normal variants.')
  }
  // X2-4, X5-1: a dislocation on the lateral with no perilunate injury entered.
  if (DISLOCATED_AXIS.includes(str(values, 'axis')) && str(values, 'perilunate') === 'none') {
    out.push('The lateral shows the lunate or capitate out of line with the radius, but no perilunate injury is entered.')
  }
  // X5-1 and MF-5: the stages are progressive.
  const input = mayfieldInput(values)
  if (input) {
    const result = mayfield(input)
    const gaps = mayfieldGaps(input)
    if (result && gaps.length > 0) {
      out.push(`Mayfield stage ${result.stage} is entered, but the injuries of the earlier stage${gaps.length === 1 ? '' : 's'} (${gaps.join(', ')}) are not; the stages are progressive.`)
    }
    if (!result) out.push('A perilunate injury is entered, but no scapholunate widening, scaphoid fracture or dislocation on the lateral: check the arcs and the lateral.')
  }
  // X4-3 (HB-2): Herbert B4 is the trans-scaphoid perilunate fracture-dislocation.
  const herbert = herbertType(values)
  if (herbert === 'B4' && str(values, 'perilunate') === 'none') out.push('Herbert B4 (trans-scaphoid perilunate fracture-dislocation) is entered, but no perilunate injury is.')
  if (herbert && herbert !== 'B4' && perilunatePresent(values)) out.push(`A scaphoid fracture with a perilunate injury is entered as Herbert ${herbert}: Herbert B4 is the trans-scaphoid perilunate fracture-dislocation.`)
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    clinicalLine(values),
    ...alignmentLines(values),
    ...radiusLines(values),
    scaphoidLine(values),
    ...carpusLines(values),
    ...softTissueLines(values),
    str(values, 'other-fractures') && `Other fractures: ${str(values, 'other-fractures')}`,
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps, in the lesson's search-pattern order. Each teach panel quotes its lesson section. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. History, views and technique',
    learn: 'technique',
    teach: (
      <>
        <p>Radiographs first after wrist trauma, rated 9 ({ACR}); the Amsterdam Wrist Rules' signs select adults for them ({WALENKAMP}). Wrist series: PA, lateral and semipronated oblique ({SHARMA}). Scaphoid series: PA and lateral for alignment, pronated oblique and ulnar-deviated PA for the fracture ({CHEUNG}).</p>
        <p>A true lateral has the pisiform between the palmar cortices of the scaphoid and the capitate; the carpal angles are accurate only on a true lateral ({OKORO}; {SHARMA}).</p>
      </>
    ),
    fields: [fields.history, fields.side, fields.mechanism, fields.signs, fields.days, fields.views, fields.viewsMissing, fields.lateralQuality],
    derive: deriveTechnique,
  },
  {
    id: 'alignment',
    title: 'Step 2. Alignment: carpal arcs, angles and the DRUJ',
    learn: 'alignment',
    teach: (
      <>
        <p>Three smooth arcs on the PA; a break suggests a ligament injury or fracture there ({GILULA}; {OKORO}). Scapholunate interval over 3 mm: Terry-Thomas sign ({DVORSKY}); up to 4 mm can be normal ({OKORO}). On the lateral, radius, lunate and capitate in line ({SHARMA}).</p>
        <p>Scapholunate angle 30–60°; over 60° supports malalignment ({ANDERSSON}; {PANG}), over 70° strongly suggests DISI ({ZHOU}; {KITAY}); dorsal radiolunate angle over 15°: DISI ({KITAY}; {PANG}); capitolunate 0–30° ({OKORO}). DRUJ: over 6 mm between the dorsal cortices on a true lateral ({SHARMA}); Nakamura compared both wrists ({NAKAMURA}).</p>
      </>
    ),
    fields: [fields.arcs, fields.arcsBroken, fields.slGap, fields.ringSign, fields.axis, fields.slAngle, fields.clAngle, fields.rlAngle, fields.druj, fields.drujDistance],
    derive: deriveAlignment,
  },
  {
    id: 'radius',
    title: 'Step 3. Distal radius and ulna',
    learn: 'radius',
    teach: (
      <>
        <p>Name the pattern (Colles, Smith, Barton, radial styloid) from its description, then the step-off, comminution and DRUJ ({SHARMA}).</p>
        {measureTable}
        <p>Radial length loss over 2 mm, dorsal tilt over 20° and inclination under 10° go with poorer function ({SHARMA}); the other wrist is a better reference than population data ({HOLLEVOET}). Base of the ulnar styloid: often DRUJ instability ({SHARMA}).</p>
      </>
    ),
    fields: [fields.radius, fields.radiusType, fields.radiusFeatures, fields.stepOff, fields.inclination, fields.radialHeight, fields.tiltDirection, fields.tilt, fields.ulnarVariance, fields.ulnarStyloid, fields.ulnarHead],
    derive: deriveRadius,
  },
  {
    id: 'scaphoid',
    title: 'Step 4. Scaphoid',
    learn: 'scaphoid',
    teach: (
      <>
        <p>Herbert types ({HERBERT}), as in the Herbert calculator:</p>
        {herbertTable}
        <p>Films do not exclude a fracture. Next, the ACR rates MRI 8, repeat radiographs at 10–14 days 8 and CT 7 ({ACR}); pooled sensitivity MRI 88%, CT 72% ({MALLEE}).</p>
      </>
    ),
    fields: [fields.scaphoid, fields.herbert, fields.scaphoidFeatures],
    derive: deriveScaphoid,
  },
  {
    id: 'carpus',
    title: 'Step 5. Perilunate injury and the other carpal bones',
    learn: 'carpus',
    teach: (
      <>
        <p>Mayfield's stages progress around the lunate ({MAYFIELD}), named here by the structures disrupted, since reviews differ on which stage is the perilunate dislocation ({DVORSKY}; {KENNEDY_ALLAN}). The stage uses steps 2 and 4.</p>
        {mayfieldTable}
        <p>Dorsal triquetral fractures are best seen on the lateral ({SHARMA}; {OKORO}).</p>
      </>
    ),
    fields: [fields.perilunate, fields.lt, fields.arcFractures, fields.carpalOther],
    derive: deriveCarpus,
  },
  {
    id: 'soft-tissues',
    title: 'Step 6. Soft tissues',
    learn: 'soft-tissues',
    teach: <p>An obliterated pronator quadratus or scaphoid fat stripe may be a clue to a subtle fracture ({SHARMA}), but neither is reliable alone ({ANNAMALAI}; {FALLAHI}).</p>,
    fields: [fields.pqFat, fields.scaphoidFat, fields.swelling],
    derive: deriveSoftTissues,
  },
  {
    id: 'impression',
    title: 'Step 7. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the fractures and dislocations in order, and any further test a source supports.</p>,
    fields: [fields.otherFractures, fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'wrist-xray',
  name: 'Wrist X-ray for injury',
  lede: 'Read adult wrist radiographs after an injury, or a scaphoid series: the views, Gilula\'s arcs and the carpal angles, the distal radius and ulna, the scaphoid and the occult fracture, perilunate injury and the other carpal bones, the soft tissues, and the report.',
  sourceNote: 'Every reference was matched on PubMed and Crossref as it was cited, and each claim was read in its abstract, its open full text or the ACR\'s published ratings; two papers, Kitay and Wolfe and Kennedy and Allan, are quoted from the full texts read for the wrist MRI study and the Mayfield calculator, and the Herbert and Mayfield wording is the calculators\'.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'acr-first',
      question: 'After an acute wrist injury, what do the ACR criteria rate as the first test?',
      options: ['MRI without contrast', 'Radiographs', 'CT without contrast', 'Ultrasound'],
      answer: 1,
      explanation: <p>Radiographs score 9 (usually appropriate); CT, MRI, ultrasound and bone scan score 1 as the first test ({ACR}).</p>,
    },
    {
      id: 'scaphoid-series',
      question: 'Which four views did Cheung and colleagues recommend for a suspected scaphoid fracture?',
      options: ['PA, lateral, supinated oblique and carpal tunnel', 'PA, lateral, pronated oblique and PA in ulnar deviation', 'PA in radial deviation, lateral, two obliques', 'PA and lateral only'],
      answer: 1,
      explanation: <p>PA and lateral to assess carpal alignment, with a pronated oblique and an ulnar-deviated PA to detect the fracture ({CHEUNG}).</p>,
    },
    {
      id: 'true-lateral',
      question: 'How do you know a wrist lateral is true?',
      options: ['The radial styloid overlaps the lunate', 'The palmar cortex of the pisiform lies between the palmar cortices of the scaphoid and the capitate', 'The ulnar styloid is in profile', 'The thumb is in front of the hand'],
      answer: 1,
      explanation: <p>Ideally midway between them ({OKORO}; {SHARMA}); the carpal angles are accurate only on a true lateral ({OKORO}).</p>,
    },
    {
      id: 'gilula',
      question: 'Which surfaces does Gilula\'s third arc follow?',
      options: ['The proximal surfaces of the scaphoid, lunate and triquetrum', 'The distal surfaces of the scaphoid, lunate and triquetrum', 'The proximal surfaces of the capitate and hamate', 'The bases of the metacarpals'],
      answer: 2,
      explanation: <p>Arc I follows the proximal and arc II the distal surfaces of the proximal row; arc III the proximal capitate and hamate. A break suggests a ligament injury or fracture there ({OKORO}; {GILULA}).</p>,
    },
    {
      id: 'perilunate-lateral',
      question: 'On the lateral, the lunate sits in the radius but the capitate lies dorsal to it. What is this?',
      options: ['Lunate dislocation', 'Perilunate dislocation', 'Normal wrist', 'DRUJ dislocation'],
      answer: 1,
      explanation: <p>In a perilunate dislocation the lunate stays in line with the radius and the capitate dislocates, mostly dorsally; in a lunate dislocation the lunate tips volarly (spilled teacup) ({SHARMA}). Up to 25% are missed at first ({DVORSKY}).</p>,
    },
    {
      id: 'terry-thomas',
      question: 'The scapholunate interval measures 5 mm on the PA. What does it suggest?',
      options: ['A normal wrist', 'Scapholunate ligament injury (Terry-Thomas sign)', 'Lunotriquetral tear', 'Ulnar impaction'],
      answer: 1,
      explanation: <p>Widening over 3 mm is the Terry-Thomas sign ({DVORSKY}); up to 4 mm can be normal in some patients, so compare the other wrist ({OKORO}; {ZHOU}).</p>,
    },
    {
      id: 'colles',
      question: 'A transverse extra-articular distal radius fracture is displaced dorsally. Which name fits?',
      options: ['Smith', 'Barton', 'Colles', 'Hutchinson'],
      answer: 2,
      explanation: <p>Colles: transverse, extra-articular, dorsal displacement or angulation; Smith is the volar counterpart; Barton is an intra-articular shear fracture with the carpus; Hutchinson is the radial styloid ({SHARMA}).</p>,
    },
    {
      id: 'inclination',
      question: 'Which radial inclination is associated with decreased wrist function in the long term?',
      options: ['Over 30°', 'Under 10°', 'Between 19° and 29°', 'Exactly 22°'],
      answer: 1,
      explanation: <p>Radial inclination under 10°, dorsal tilt over 20° and loss of radial length over 2 mm ({SHARMA}). Normal is 13–30° in Sharma's review, 19–29° in Schuind's normal adults ({SCHUIND}).</p>,
    },
    {
      id: 'occult',
      question: 'A scaphoid series is normal but the snuffbox is tender. What do the ACR criteria rate next?',
      options: ['Nothing further', 'Bone scan, as the best first choice', 'MRI 8, repeat radiographs at 10–14 days 8, CT 7', 'Ultrasound 9'],
      answer: 2,
      explanation: <p>All three are usually appropriate; bone scan is rated 1 ({ACR}). In the Cochrane review MRI was 88% and CT 72% sensitive ({MALLEE}).</p>,
    },
    {
      id: 'proximal-pole',
      question: 'Why does a proximal pole scaphoid fracture worry the surgeon?',
      options: ['It is always displaced', 'The blood supply enters distally, so osteonecrosis is more common', 'It always needs CT', 'It is the commonest type'],
      answer: 1,
      explanation: <p>The proximal pole depends on vessels entering through the waist, so osteonecrosis is more common in proximal pole fractures ({SHARMA}; {OKORO}). Most fractures are through the waist ({OKORO}).</p>,
    },
    {
      id: 'triquetrum',
      question: 'Where is a dorsal triquetral fracture best seen?',
      options: ['On the PA', 'On the lateral (or the oblique)', 'Only on MRI', 'On the carpal tunnel view'],
      answer: 1,
      explanation: <p>Most triquetral fractures are dorsal and best seen on the lateral or oblique ({SHARMA}; {OKORO}); they are almost never associated with carpal instability ({SHAHABPOUR}).</p>,
    },
    {
      id: 'fat-stripes',
      question: 'How reliable is an obliterated scaphoid fat stripe for an occult scaphoid fracture?',
      options: ['Diagnostic', 'About 50% sensitive and 50% specific against MRI', 'It excludes a fracture when normal', 'Specific but insensitive'],
      answer: 1,
      explanation: <p>Annamalai and Raby found both fat stripes poor predictors of an occult fracture ({ANNAMALAI}); it remains a clue ({SHARMA}).</p>,
    },
  ],
}

export function WristXrayStudyPage() {
  return <StudyPage study={study} />
}
