import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { wristMriScans } from '../data/scans/wristMri'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from '../logic/herbert'
import type { HerbertType } from '../logic/herbert'
import { lichtmanDescriptions, lichtmanSentence, lichtmanStages } from '../logic/lichtman'
import type { LichtmanStage } from '../logic/lichtman'
import { mayfield, mayfieldDescriptions, mayfieldGaps, mayfieldSentence, mayfieldStages } from '../logic/mayfield'
import type { MayfieldInput, MayfieldResult } from '../logic/mayfield'
import { palmerClasses, palmerDescriptions, palmerSentence } from '../logic/palmer'
import type { PalmerClass } from '../logic/palmer'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Not labelled "Unchecked draft" (the author's choice, 2026-10-29), though one point is still unread. Every reference has been matched on PubMed and Crossref (2026-10-23), but
 * the papers are paywalled and Linscheid 1972 has no abstract in PubMed, so claims are verified
 * from abstracts or from open reviews cited beside the original (2026-10-29: Andersson, Ng,
 * Chen, von Borstel; then, with the author's decisions of 2026-10-29, Zhou, Pang, Vassa, Wilson,
 * Reagan, Dvorsky, Sharma, Okoro, Kitay, Pinho and Cooney). The one claim still unread is whether Herbert and Fisher's
 * 1984 paper itself has type B5. The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-wrist-mri-sources.md (W claims); the Mayfield, Herbert,
 * Palmer and Lichtman wording is in 2026-10-23-wrist-calculators-sources.md (MF, HB, PA and LI
 * claims). Rule chips and warnings carry their claim IDs.
 */

const LINSCHEID_DOI = '10.2106/00004623-197254080-00003'
const MAYFIELD_DOI = '10.1016/s0363-5023(80)80007-4'
const HERBERT_DOI = '10.1302/0301-620X.66B1.6693468'
const PALMER_DOI = '10.1016/0363-5023(89)90174-3'
const LICHTMAN_DOI = '10.2106/00004623-197759070-00011'
const KENNEDY_ABRAMS_DOI = '10.1097/CORR.0000000000000595'
const KENNEDY_ALLAN_DOI = '10.1007/s11999-012-2275-x'
const GAEBLER_DOI = '10.1097/00005373-199607000-00011'
const IMAEDA_DOI = '10.1148/radiology.201.2.8888248'
const CEREZAL_DOI = '10.1148/radiographics.22.1.g02ja01105'
const VIEGAS_DOI = '10.1016/s0363-5023(09)90016-8'
const ZANETTI_DOI = '10.1148/radiology.216.3.r00se06840'
const THEUMANN_DOI = '10.1148/radiol.2261011715'
const GLAJCHEN_DOI = '10.1007/s002560050033'
const COSTA_DOI = '10.2214/ajr.181.5.1811245'
const MESGARZADEH_DOI = '10.1148/radiology.171.3.2541464'
const ZEISS_DOI = '10.2214/ajr.158.5.1566671'
const BERGER_DOI = '10.1016/S0363-5023(96)80096-7'
const VO_DOI = '10.1016/S0363-5023(05)80288-6'
const CONWAY_DOI = '10.1148/radiology.156.1.3923555'
const ANDERSSON_DOI = '10.1302/2058-5241.2.170016'
const NG_DOI = '10.21037/qims-24-420'
const CHEN_DOI = '10.1177/1941738109347981'
const VON_BORSTEL_DOI = '10.2463/mrms.rev.2016-0011'
const ZHOU_DOI = '10.1016/j.jhsg.2024.01.015'
const PANG_DOI = '10.1177/1558944717709073'
const VASSA_DOI = '10.5114/pjr.2020.99034'
const REAGAN_DOI = '10.1016/s0363-5023(84)80101-x'
const WILSON_DOI = '10.1007/s12178-022-09819-7'
const DVORSKY_DOI = '10.1016/j.jhsg.2025.100803'
const SHARMA_DOI = '10.1055/s-0044-1801268'
const OKORO_DOI = '10.3390/life13071426'
const KITAY_DOI = '10.1016/j.jhsa.2012.07.035'
const PINHO_DOI = '10.1016/j.rboe.2017.06.007'
const COONEY_DOI = '10.1055/s-0032-1320012'

const LINSCHEID = <Cite doi={LINSCHEID_DOI}>Linscheid et al., J Bone Joint Surg Am 1972</Cite>
const MAYFIELD = <Cite doi={MAYFIELD_DOI}>Mayfield et al., J Hand Surg Am 1980</Cite>
const HERBERT = <Cite doi={HERBERT_DOI}>Herbert and Fisher, J Bone Joint Surg Br 1984</Cite>
const PALMER = <Cite doi={PALMER_DOI}>Palmer, J Hand Surg Am 1989</Cite>
const LICHTMAN = <Cite doi={LICHTMAN_DOI}>Lichtman et al., J Bone Joint Surg Am 1977</Cite>
const KENNEDY_ABRAMS = <Cite doi={KENNEDY_ABRAMS_DOI}>Kennedy and Abrams, Clin Orthop Relat Res 2019</Cite>
const KENNEDY_ALLAN = <Cite doi={KENNEDY_ALLAN_DOI}>Kennedy and Allan, Clin Orthop Relat Res 2012</Cite>
const GAEBLER = <Cite doi={GAEBLER_DOI}>Gaebler et al., J Trauma 1996</Cite>
const IMAEDA = <Cite doi={IMAEDA_DOI}>Imaeda et al., Radiology 1996</Cite>
const CEREZAL = <Cite doi={CEREZAL_DOI}>Cerezal et al., Radiographics 2002</Cite>
const VIEGAS = <Cite doi={VIEGAS_DOI}>Viegas et al., J Hand Surg Am 1990</Cite>
const ZANETTI = <Cite doi={ZANETTI_DOI}>Zanetti et al., Radiology 2000</Cite>
const THEUMANN = <Cite doi={THEUMANN_DOI}>Theumann et al., Radiology 2003</Cite>
const GLAJCHEN = <Cite doi={GLAJCHEN_DOI}>Glajchen and Schweitzer, Skeletal Radiol 1996</Cite>
const COSTA = <Cite doi={COSTA_DOI}>Costa et al., AJR 2003</Cite>
const MESGARZADEH = <Cite doi={MESGARZADEH_DOI}>Mesgarzadeh et al., Radiology 1989</Cite>
const ZEISS = <Cite doi={ZEISS_DOI}>Zeiss et al., AJR 1992</Cite>
const BERGER = <Cite doi={BERGER_DOI}>Berger, J Hand Surg Am 1996</Cite>
const VO = <Cite doi={VO_DOI}>Vo et al., J Hand Surg Am 1995</Cite>
const CONWAY = <Cite doi={CONWAY_DOI}>Conway et al., Radiology 1985</Cite>
const ANDERSSON = <Cite doi={ANDERSSON_DOI}>Andersson, EFORT Open Rev 2017</Cite>
const NG = <Cite doi={NG_DOI}>Ng et al., Quant Imaging Med Surg 2024</Cite>
const CHEN = <Cite doi={CHEN_DOI}>Chen et al., Sports Health 2009</Cite>
const VON_BORSTEL = <Cite doi={VON_BORSTEL_DOI}>von Borstel et al., Magn Reson Med Sci 2017</Cite>
const ZHOU = <Cite doi={ZHOU_DOI}>Zhou et al., J Hand Surg Glob Online 2024</Cite>
const PANG = <Cite doi={PANG_DOI}>Pang et al., Hand (N Y) 2018</Cite>
const VASSA = <Cite doi={VASSA_DOI}>Vassa et al., Pol J Radiol 2020</Cite>
const REAGAN = <Cite doi={REAGAN_DOI}>Reagan et al., J Hand Surg Am 1984</Cite>
const WILSON = <Cite doi={WILSON_DOI}>Wilson, Curr Rev Musculoskelet Med 2023</Cite>
const DVORSKY = <Cite doi={DVORSKY_DOI}>Dvorsky et al., J Hand Surg Glob Online 2025</Cite>
const SHARMA = <Cite doi={SHARMA_DOI}>Sharma et al., Indian J Radiol Imaging 2025</Cite>
const OKORO = <Cite doi={OKORO_DOI}>Okoro et al., Life 2023</Cite>
const KITAY = <Cite doi={KITAY_DOI}>Kitay and Wolfe, J Hand Surg Am 2012</Cite>
const PINHO = <Cite doi={PINHO_DOI}>Pinho and Sobania, Rev Bras Ortop 2017</Cite>
const COONEY = <Cite doi={COONEY_DOI}>Cooney, J Wrist Surg 2012</Cite>

const references: LessonReference[] = [
  { citation: 'Linscheid RL, Dobyns JH, Beabout JW, Bryan RS. Traumatic instability of the wrist. Diagnosis, classification, and pathomechanics. J Bone Joint Surg Am. 1972;54(8):1612-1632.', doi: LINSCHEID_DOI },
  { citation: 'Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241.', doi: MAYFIELD_DOI },
  { citation: 'Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123.', doi: HERBERT_DOI },
  { citation: 'Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606.', doi: PALMER_DOI },
  { citation: 'Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck\'s disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908.', doi: LICHTMAN_DOI },
  { citation: 'Kennedy C, Abrams R. In brief: the Lichtman classification for Kienböck disease. Clin Orthop Relat Res. 2019;477(6):1516-1520.', doi: KENNEDY_ABRAMS_DOI },
  { citation: 'Kennedy SA, Allan CH. In brief: Mayfield et al. classification: carpal dislocations and progressive perilunar instability. Clin Orthop Relat Res. 2012;470(4):1243-1245.', doi: KENNEDY_ALLAN_DOI },
  { citation: 'Gaebler C, Kukla C, Breitenseher M, Trattnig S, Mittlboeck M, Vécsei V. Magnetic resonance imaging of occult scaphoid fractures. J Trauma. 1996;41(1):73-76.', doi: GAEBLER_DOI },
  { citation: 'Imaeda T, Nakamura R, Shionoya K, Makino N. Ulnar impaction syndrome: MR imaging findings. Radiology. 1996;201(2):495-500.', doi: IMAEDA_DOI },
  { citation: 'Cerezal L, del Piñal F, Abascal F, García-Valtuille R, Pereda T, Canga A. Imaging findings in ulnar-sided wrist impaction syndromes. Radiographics. 2002;22(1):105-121.', doi: CEREZAL_DOI },
  { citation: 'Viegas SF, Wagner K, Patterson R, Peterson P. Medial (hamate) facet of the lunate. J Hand Surg Am. 1990;15(4):564-571.', doi: VIEGAS_DOI },
  { citation: 'Zanetti M, Linkous MD, Gilula LA, Hodler J. Characteristics of triangular fibrocartilage defects in symptomatic and contralateral asymptomatic wrists. Radiology. 2000;216(3):840-845.', doi: ZANETTI_DOI },
  { citation: 'Theumann NH, Pfirrmann CW, Antonio GE, Chung CB, Gilula LA, Trudell DJ, Resnick D. Extrinsic carpal ligaments: normal MR arthrographic appearance in cadavers. Radiology. 2003;226(1):171-179.', doi: THEUMANN_DOI },
  { citation: 'Glajchen N, Schweitzer M. MRI features in de Quervain\'s tenosynovitis of the wrist. Skeletal Radiol. 1996;25(1):63-65.', doi: GLAJCHEN_DOI },
  { citation: 'Costa CR, Morrison WB, Carrino JA. MRI features of intersection syndrome of the forearm. AJR Am J Roentgenol. 2003;181(5):1245-1249.', doi: COSTA_DOI },
  { citation: 'Mesgarzadeh M, Schneck CD, Bonakdarpour A, Mitra A, Conaway D. Carpal tunnel: MR imaging. Part II. Carpal tunnel syndrome. Radiology. 1989;171(3):749-754.', doi: MESGARZADEH_DOI },
  { citation: 'Zeiss J, Jakab E, Khimji T, Imbriglia J. The ulnar tunnel at the wrist (Guyon\'s canal): normal MR anatomy and variants. AJR Am J Roentgenol. 1992;158(5):1081-1085.', doi: ZEISS_DOI },
  { citation: 'Berger RA. The gross and histologic anatomy of the scapholunate interosseous ligament. J Hand Surg Am. 1996;21(2):170-178.', doi: BERGER_DOI },
  { citation: 'Vo P, Wright T, Hayden F, Dell P, Chidgey L. Evaluating dorsal wrist pain: MRI diagnosis of occult dorsal wrist ganglion. J Hand Surg Am. 1995;20(4):667-670.', doi: VO_DOI },
  { citation: 'Conway WF, Destouet JM, Gilula LA, Bellinghausen HW, Weeks PM. The carpal boss: an overview of radiographic evaluation. Radiology. 1985;156(1):29-31.', doi: CONWAY_DOI },
  { citation: 'Andersson JK. Treatment of scapholunate ligament injury: current concepts. EFORT Open Rev. 2017;2(9):382-393.', doi: ANDERSSON_DOI },
  { citation: 'Ng AWH, Chan JYS, Griffith JF, Ng ISH, Tse WL, Ng SSH. Imaging of dorsal wrist pain. Quant Imaging Med Surg. 2024;14(9):6945-6962.', doi: NG_DOI },
  { citation: 'Chen NC, Jupiter JB, Jebson PJL. Sports-related wrist injuries in adults. Sports Health. 2009;1(6):469-477.', doi: CHEN_DOI },
  { citation: 'von Borstel D, Wang M, Small K, Nozaki T, Yoshioka H. High-resolution 3T MR imaging of the triangular fibrocartilage complex. Magn Reson Med Sci. 2017;16(1):3-15.', doi: VON_BORSTEL_DOI },
  { citation: 'Zhou JY, Jodah R, Joseph LP, Yao J. Scapholunate ligament injuries. J Hand Surg Glob Online. 2024;6(3):245-267.', doi: ZHOU_DOI },
  { citation: 'Pang EQ, Douglass N, Kamal RN. Association of lunate morphology with carpal instability in scapholunate ligament injury. Hand (N Y). 2018;13(4):418-422.', doi: PANG_DOI },
  { citation: 'Vassa R, Garg A, Omar IM. Magnetic resonance imaging of the wrist and hand. Pol J Radiol. 2020;85:e461-e488.', doi: VASSA_DOI },
  { citation: 'Reagan DS, Linscheid RL, Dobyns JH. Lunotriquetral sprains. J Hand Surg Am. 1984;9(4):502-514.', doi: REAGAN_DOI },
  { citation: 'Wilson MS. Diagnosis and management of lunotriquetral ligament injuries. Curr Rev Musculoskelet Med. 2023;16(2):55-59.', doi: WILSON_DOI },
  { citation: 'Dvorsky JL, Rosenberry S, Da Costa A, Green A, Fowler J. A review of perilunate wrist dislocations. J Hand Surg Glob Online. 2025;7(5):100803.', doi: DVORSKY_DOI },
  { citation: 'Sharma M, Choudhury SR, Sinha A, Prakash M. Multimodality imaging in wrist fractures and dislocations. Indian J Radiol Imaging. 2025;35(3):374-386.', doi: SHARMA_DOI },
  { citation: 'Okoro CK, Skalski MR, Patel DB, White EA, Matcuk GR. Imaging diagnosis and management of carpal trauma and instability: an illustrated guide. Life (Basel). 2023;13(7):1426.', doi: OKORO_DOI },
  { citation: 'Kitay A, Wolfe SW. Scapholunate instability: current concepts in diagnosis and management. J Hand Surg Am. 2012;37(10):2175-2196.', doi: KITAY_DOI },
  { citation: 'Pinho AB, Sobania RL. Perilunate carpal dislocation. Clinical evaluation of patients operated with reduction and percutaneous fixation without capsular-ligament repair. Rev Bras Ortop. 2017;52(4):402-409.', doi: PINHO_DOI },
  { citation: 'Cooney WP. The modern history of the wrist. J Wrist Surg. 2012;1(2):95-102.', doi: COONEY_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (TFCC, ECU) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/** A two-column table of a shared classification, from its descriptions. */
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
const lichtmanTable = classTable('Stage', lichtmanStages, lichtmanDescriptions)
const mayfieldTable = classTable('Stage', mayfieldStages, mayfieldDescriptions)
const palmerTable = classTable('Class', palmerClasses, palmerDescriptions)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the wrist MRI that arrives with pain, or pain after an injury. It walks a fixed search pattern through every compartment, and uses the injury, when there is one, to decide where to look hardest. The order and the protocol checklist are this site's own; none of the papers below prescribes them.</p>
        <p>Check that the study has all three planes, fat-suppressed fluid-sensitive imaging for marrow edema, ligaments and tendons, and a T1-weighted sequence for fractures and marrow.</p>
        <p>A fall on the outstretched hand is a common mechanism of a scaphoid fracture ({SHARMA}). Perilunate dislocations typically follow high-energy trauma, such as a motor vehicle accident, a fall from a height or a sports injury ({PINHO}; {DVORSKY}), and may result from a fall on the outstretched hand ({PINHO}; {OKORO}). What sets them apart is abrupt, forceful extension of the wrist, often with ulnar deviation and intercarpal supination ({MAYFIELD}; {PINHO}; {DVORSKY}). With such a history, look hardest at the scaphoid, the scapholunate ligament and the ring of structures around the lunate.</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    body: (
      <>
        <h4>Scaphoid</h4>
        <p>MRI shows occult scaphoid fractures in patients whose first radiographs are normal ({GAEBLER}). When there is a fracture, give the Herbert type ({HERBERT}); the Herbert calculator on this site applies the same rules.</p>
        {herbertTable}
        <h4>Other carpal bones and the distal radius</h4>
        <p>Look along every carpal bone, including the hook of the hamate and the dorsal surface of the triquetrum, and at the distal radius.</p>
        <h4>The lunate: Kienböck disease or ulnar impaction</h4>
        <p>Abnormal lunate signal has two common patterns. Ulnar impaction gives focal abnormal signal in the ulnar aspect of the lunate, sometimes also in the radial aspects of the triquetrum and the ulnar head ({IMAEDA}), and goes with positive ulnar variance ({CEREZAL}). Kienböck disease is told apart by signal through the whole lunate rather than a focal area ({CEREZAL}; {NG}).</p>
        <p>Stage Kienböck disease by Lichtman, whose four stages are clinical and radiographic ({LICHTMAN}); the Lichtman calculator on this site applies the same rules. Stage I has normal radiographs, and since 1993 decreased T1 signal on MRI. Stage III was split in 1993 by fixed scaphoid rotation (a radioscaphoid angle over 60° is IIIB), and IIIC, a coronal fracture of the lunate, was added later ({KENNEDY_ABRAMS}).</p>
        {lichtmanTable}
        <ScanFigures images={[wristMriScans.occultScaphoidFracture, wristMriScans.kienbock]} />
      </>
    ),
  },
  {
    id: 'scapholunate',
    title: 'Step 3. Scapholunate ligament and DISI',
    body: (
      <>
        <p>The scapholunate ligament has dorsal, proximal (membranous) and volar parts, and the dorsal part is the strongest ({BERGER}; {ANDERSSON}). Say which parts are torn.</p>
        <p>Linscheid and colleagues' 1972 paper introduced the terms DISI and VISI ({LINSCHEID}; {COONEY}), describing the lunate dorsiflexed or palmar flexed within the carpus ({LINSCHEID}). Dorsal intercalated segment instability (DISI) is dorsal tilt of the lunate ({VASSA}): on a true lateral radiograph, dorsal radiolunate angulation greater than 15° indicates DISI ({KITAY}; {PANG}). The scapholunate angle also depends on the scaphoid: an angle greater than 70° is highly suggestive of increased flexion, or rotatory subluxation, of the scaphoid ({KITAY}). So an increased scapholunate angle is not the same thing as a tilted lunate.</p>
        <p>A normal scapholunate angle is 30° to 60° ({KITAY}; {ZHOU}). An angle over 60° is beyond that range and supports scapholunate malalignment ({ANDERSSON}; {PANG}); over 70° is consistent with DISI ({ZHOU}), and this site reads it as strongly suggestive. Some reviews set the bar at 80° ({VASSA}); this site does not require it. An angle below 30° suggests volar intercalated segment instability (VISI) ({VASSA}). The angle is best measured on a true lateral radiograph; on MRI it depends on positioning and may be unreliable ({VASSA}), so treat a measurement on sagittal MRI as a pointer, not a diagnosis.</p>
        <ScanFigures images={[wristMriScans.scapholunateTear]} />
      </>
    ),
  },
  {
    id: 'lunotriquetral',
    title: 'Step 4. Lunotriquetral ligament and VISI',
    body: (
      <>
        <p>Look at the lunotriquetral ligament in the same way. Linscheid and colleagues described palmar flexion instability of the lunate ({LINSCHEID}); Reagan, Linscheid and Dobyns later described palmar flexion instability as a more extensive continuation of a lunotriquetral sprain ({REAGAN}). Lunotriquetral disruption can produce VISI ({ANDERSSON}; {VASSA}), but a static VISI typically also needs the dorsal radiocarpal ligament to be compromised ({WILSON}).</p>
        <ScanFigures images={[wristMriScans.lunotriquetralTear]} />
      </>
    ),
  },
  {
    id: 'perilunate',
    title: 'Step 5. Perilunate injury',
    body: (
      <>
        <p>Mayfield and colleagues described perilunar instability as a progression around the lunate, radial to ulnar ({MAYFIELD}; {KENNEDY_ALLAN}). The stages build on each other, so a later stage includes the injuries of the earlier ones. The Mayfield calculator on this site applies the same rules.</p>
        <p>Reviews differ on which stage they call the perilunate dislocation: stage II, where the capitate dislocates dorsally while the lunate stays aligned with the radius ({DVORSKY}; {SHARMA}; {OKORO}), or stage III ({KENNEDY_ALLAN}). So this site names the structures disrupted: stage III specifically adds lunotriquetral disruption.</p>
        {mayfieldTable}
        <p>The sequence starts at the scapholunate ligament, unless the injury passes through the scaphoid instead (a greater-arc injury). So a stage III or IV injury with an intact scapholunate ligament and no scaphoid fracture deserves a second look ({MAYFIELD}; {CHEN}).</p>
        <p>This site gives a Mayfield stage only when you mark a perilunate injury, so an isolated scapholunate tear from another cause is not called stage I.</p>
      </>
    ),
  },
  {
    id: 'tfcc',
    title: 'Step 6. TFCC and ulnar variance',
    body: (
      <>
        <p>Classify a TFCC lesion by Palmer: class 1 traumatic, class 2 degenerative ({PALMER}; {VON_BORSTEL}). The 1B and 1C labels are those of Palmer's table ({VON_BORSTEL}); the carpal attachments torn in 1C are those at the lunate and triquetrum, through the ulnolunate and ulnotriquetral ligaments ({VASSA}). The Palmer calculator on this site applies the same rules.</p>
        {palmerTable}
        <p>Classes 2D and 2E include perforation of the lunotriquetral ligament, so read them against step 4 ({PALMER}; {VON_BORSTEL}).</p>
        <p>Triangular fibrocartilage defects are also found in the asymptomatic opposite wrist, so a defect is not by itself the cause of the pain ({ZANETTI}).</p>
        <p>Report the ulnar variance (positive, neutral or negative): it matters for ulnar impaction (step 2).</p>
        <ScanFigures images={[wristMriScans.tfccTear]} />
      </>
    ),
  },
  {
    id: 'extrinsic',
    title: 'Step 7. Extrinsic ligaments',
    body: (
      <>
        <p>The dorsal and volar extrinsic ligaments can be identified on MR arthrography ({THEUMANN}). On routine MRI, look for edema, thickening or discontinuity in each group.</p>
        <ScanFigures images={[wristMriScans.radioscaphocapitateTear]} />
      </>
    ),
  },
  {
    id: 'extensors',
    title: 'Step 8. Extensor compartments',
    body: (
      <>
        <p>Go through the six compartments. In de Quervain tenosynovitis, thickening of the abductor pollicis longus and extensor pollicis brevis tendons of the first compartment is the most reliable sign, with edema around them; edema in the subcutaneous fat and increased signal within the tendons are less reliable ({GLAJCHEN}).</p>
        <p>Intersection syndrome shows peritendinous edema where the first compartment crosses the second, proximal to Lister's tubercle ({COSTA}).</p>
        <p>Check the extensor carpi ulnaris for tendinopathy, tears and its position in the groove.</p>
        <ScanFigures images={[wristMriScans.ecuSubluxation]} />
      </>
    ),
  },
  {
    id: 'flexors',
    title: 'Step 9. Flexor tendons and carpal tunnel',
    body: (
      <>
        <p>Check the flexor tendons, then the median nerve. MRI signs of carpal tunnel syndrome are swelling of the nerve at the level of the pisiform, flattening at the level of the hamate, palmar bowing of the flexor retinaculum, and increased T2 signal in the nerve ({MESGARZADEH}).</p>
        <ScanFigures images={[wristMriScans.carpalTunnelSyndrome]} />
      </>
    ),
  },
  {
    id: 'guyon',
    title: 'Step 10. Guyon canal',
    body: (
      <>
        <p>Follow the ulnar nerve and artery through the Guyon canal. MRI shows its contents and its variants, which include accessory muscles ({ZEISS}). A ganglion or a hook of hamate fracture next to the canal can compress the nerve.</p>
        <ScanFigures images={[wristMriScans.guyonGanglion]} />
      </>
    ),
  },
  {
    id: 'ganglia',
    title: 'Step 11. Ganglia and synovium',
    body: (
      <>
        <p>MRI finds occult dorsal ganglia in patients with dorsal wrist pain ({VO}). Look for a ganglion and say where it arises, then for synovitis.</p>
        <ScanFigures images={[wristMriScans.dorsalGanglion]} />
      </>
    ),
  },
  {
    id: 'variants',
    title: 'Step 12. Variants',
    body: (
      <>
        <p>A type II lunate has a medial facet that articulates with the hamate ({VIEGAS}). A carpal boss is a bony prominence at the base of the second and third metacarpals, sometimes an os styloideum ({CONWAY}). Accessory muscles occur in and around the Guyon canal ({ZEISS}). A bifid median nerve and a persistent median artery can also be seen in the carpal tunnel.</p>
        <p>This site gives each variant its own impression line, so the referrer knows it was seen and judged.</p>
        <ScanFigures images={[wristMriScans.bifidMedianNerve, wristMriScans.osStyloideum]} />
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 13. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the mechanism against the scaphoid and the ring around the lunate, the lunate signal against the ulnar variance, a Palmer 2D or 2E lesion against the lunotriquetral ligament.</p>
        <p>List the abnormal findings in search-pattern order, then the variants, each on its own line.</p>
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

const tearOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'partial', label: 'Partial tear' },
  { value: 'complete', label: 'Complete tear' },
]
const normalAbnormal: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'abnormal', label: 'Abnormal' },
]
const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const tendonOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'tendinosis', label: 'Tendinosis' },
  { value: 'tenosynovitis', label: 'Tenosynovitis' },
  { value: 'tear', label: 'Tear' },
]

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain, no injury given' },
    { value: 'fall', label: 'Fall on the outstretched hand' },
    { value: 'other', label: 'Other injury' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'All three planes, fat-suppressed PD or T2, and a T1.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'planes', label: 'All three planes' },
    { value: 'fs', label: 'Fat-suppressed PD or T2' },
    { value: 't1', label: 'A T1-weighted sequence' },
  ] },
  effusion: { id: 'effusion', kind: 'choice', label: 'Joint effusion', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'large', label: 'Large' },
  ] },
  marrow: { id: 'marrow', kind: 'choice', label: 'Bone marrow edema', required: true, options: nonePresent },
  marrowSite: { id: 'marrow-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. scaphoid waist and capitate', showIf: (v) => str(v, 'marrow') === 'present' },

  scaphoid: { id: 'scaphoid', kind: 'choice', label: 'Scaphoid fracture', required: true, options: nonePresent, help: 'MRI shows occult fractures when radiographs are normal.' },
  herbert: { id: 'herbert', kind: 'choice', label: 'Herbert type', showIf: (v) => str(v, 'scaphoid') === 'present', help: 'As in the Herbert calculator.', options: herbertTypes.map((type) => ({ value: type, label: `${type}: ${herbertDescriptions[type]}` })) },
  otherFracture: { id: 'other-fracture', kind: 'choice', label: 'Other carpal fracture', required: true, options: nonePresent },
  otherFractureSites: { id: 'other-fracture-sites', kind: 'multi', label: 'Which', showIf: (v) => str(v, 'other-fracture') === 'present', options: [
    { value: 'hamate-hook', label: 'Hook of hamate' },
    { value: 'triquetrum-dorsal', label: 'Dorsal triquetral avulsion' },
    { value: 'other', label: 'Other carpal bone' },
  ] },
  radius: { id: 'radius', kind: 'choice', label: 'Distal radius fracture', required: true, options: nonePresent },
  radiusText: { id: 'radius-text', kind: 'text', label: 'Distal radius fracture (describe)', showIf: (v) => str(v, 'radius') === 'present' },
  lunate: { id: 'lunate', kind: 'choice', label: 'Lunate signal', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'diffuse', label: 'Diffuse, through the whole lunate' },
    { value: 'focal-ulnar', label: 'Focal, ulnar side of the lunate' },
  ] },
  lichtman: { id: 'lichtman', kind: 'choice', label: 'Lichtman stage', showIf: (v) => str(v, 'lunate') === 'diffuse', help: 'Mostly read on radiographs; as in the Lichtman calculator.', options: lichtmanStages.map((stage) => ({ value: stage, label: `${stage}: ${lichtmanDescriptions[stage]}` })) },
  impactionSites: { id: 'impaction-sites', kind: 'multi', label: 'Also abnormal', showIf: (v) => str(v, 'lunate') === 'focal-ulnar', options: [
    { value: 'triquetrum', label: 'Radial aspect of the triquetrum' },
    { value: 'ulnar-head', label: 'Radial aspect of the ulnar head' },
  ] },

  sl: { id: 'sl', kind: 'choice', label: 'Scapholunate ligament', required: true, options: tearOptions },
  slParts: { id: 'sl-parts', kind: 'multi', label: 'Parts torn', showIf: (v) => ['partial', 'complete'].includes(str(v, 'sl')), options: [
    { value: 'dorsal', label: 'Dorsal' },
    { value: 'membranous', label: 'Membranous (proximal)' },
    { value: 'volar', label: 'Volar' },
  ] },
  slAngle: { id: 'sl-angle', kind: 'number', label: 'Scapholunate angle', unit: '°', min: 0, max: 180, step: 1, help: 'Normal 30–60° (on radiographs). Over 60°: supports scapholunate malalignment; over 70°: strongly suggests DISI; below 30°: VISI.' },

  lt: { id: 'lt', kind: 'choice', label: 'Lunotriquetral ligament', required: true, options: tearOptions },

  perilunate: { id: 'perilunate', kind: 'choice', label: 'Perilunate injury', required: true, options: nonePresent, help: 'Gives the Mayfield stage, as in the Mayfield calculator.' },
  capitolunate: { id: 'capitolunate', kind: 'choice', label: 'Capitolunate joint disrupted', help: 'Also yes when the lunate itself is dislocated.', showIf: (v) => str(v, 'perilunate') === 'present', options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  lunatePosition: { id: 'lunate-position', kind: 'choice', label: 'Lunate', showIf: (v) => str(v, 'perilunate') === 'present', options: [
    { value: 'in-place', label: 'In place on the radius' },
    { value: 'dislocated', label: 'Dislocated from the radius' },
  ] },

  tfcc: { id: 'tfcc', kind: 'choice', label: 'TFCC', required: true, options: [
    { value: 'intact', label: 'Intact' },
    { value: 'lesion', label: 'Lesion' },
  ] },
  palmer: { id: 'palmer', kind: 'choice', label: 'Palmer class', showIf: (v) => str(v, 'tfcc') === 'lesion', help: 'As in the Palmer calculator.', options: palmerClasses.map((c) => ({ value: c, label: `${c}: ${palmerDescriptions[c]}` })) },
  ulnarVariance: { id: 'ulnar-variance', kind: 'choice', label: 'Ulnar variance', required: true, options: [
    { value: 'neutral', label: 'Neutral' },
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' },
  ] },

  extrinsicDorsal: { id: 'extrinsic-dorsal', kind: 'choice', label: 'Dorsal extrinsic ligaments', required: true, options: normalAbnormal },
  extrinsicVolar: { id: 'extrinsic-volar', kind: 'choice', label: 'Volar extrinsic ligaments', required: true, options: normalAbnormal },
  extrinsicText: { id: 'extrinsic-text', kind: 'text', label: 'Extrinsic ligaments (describe)', showIf: (v) => str(v, 'extrinsic-dorsal') === 'abnormal' || str(v, 'extrinsic-volar') === 'abnormal' },

  firstCompartment: { id: 'first-compartment', kind: 'choice', label: 'First compartment (APL, EPB)', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'dequervain', label: 'de Quervain tenosynovitis' },
  ] },
  intersection: { id: 'intersection', kind: 'choice', label: 'Intersection syndrome', options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Edema where the first compartment crosses the second' },
  ] },
  ecu: { id: 'ecu', kind: 'choice', label: 'ECU tendon', required: true, options: tendonOptions },
  ecuPosition: { id: 'ecu-position', kind: 'choice', label: 'ECU position', options: [
    { value: 'groove', label: 'In the groove' },
    { value: 'subluxed', label: 'Subluxed' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  otherExtensors: { id: 'other-extensors', kind: 'choice', label: 'Other extensor tendons', required: true, options: normalAbnormal },
  otherExtensorsText: { id: 'other-extensors-text', kind: 'text', label: 'Other extensor tendons (describe)', showIf: (v) => str(v, 'other-extensors') === 'abnormal' },

  flexors: { id: 'flexors', kind: 'choice', label: 'Flexor tendons', required: true, options: tendonOptions },
  median: { id: 'median', kind: 'choice', label: 'Median nerve', required: true, options: normalAbnormal },
  medianSigns: { id: 'median-signs', kind: 'multi', label: 'Median nerve signs', showIf: (v) => str(v, 'median') === 'abnormal', options: [
    { value: 'swelling', label: 'Swelling at the pisiform' },
    { value: 'flattening', label: 'Flattening at the hamate' },
    { value: 'bowing', label: 'Palmar bowing of the flexor retinaculum' },
    { value: 'signal', label: 'Increased T2 signal' },
  ] },

  ulnarNerve: { id: 'ulnar-nerve', kind: 'choice', label: 'Ulnar nerve in the Guyon canal', required: true, options: normalAbnormal },
  guyonText: { id: 'guyon-text', kind: 'text', label: 'Guyon canal (describe)', placeholder: 'e.g. ganglion compressing the deep branch', showIf: (v) => str(v, 'ulnar-nerve') === 'abnormal' },

  ganglion: { id: 'ganglion', kind: 'choice', label: 'Ganglion', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'dorsal', label: 'Dorsal' },
    { value: 'volar', label: 'Volar' },
    { value: 'other', label: 'Elsewhere' },
  ] },
  ganglionText: { id: 'ganglion-text', kind: 'text', label: 'Ganglion origin and size', placeholder: 'e.g. from the dorsal scapholunate ligament, 8 mm', showIf: (v) => !['', 'none'].includes(str(v, 'ganglion')) },
  synovitis: { id: 'synovitis', kind: 'choice', label: 'Synovitis', required: true, options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
  ] },

  variants: { id: 'variants', kind: 'multi', label: 'Variants', help: 'Each gets its own impression line.', options: [
    { value: 'lunate-ii', label: 'Type II lunate (hamate facet)' },
    { value: 'boss', label: 'Carpal boss or os styloideum' },
    { value: 'accessory-muscle', label: 'Accessory muscle' },
    { value: 'bifid-median', label: 'Bifid median nerve' },
    { value: 'median-artery', label: 'Persistent median artery' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. soft-tissue mass' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-ligament', label: 'No intrinsic ligament tear' },
    { value: 'no-tfcc', label: 'No TFCC lesion' },
    { value: 'no-tendon', label: 'No tendon tear' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

const herbertType = (values: Values): HerbertType | undefined =>
  str(values, 'scaphoid') === 'present' ? (herbertTypes as string[]).includes(str(values, 'herbert')) ? str(values, 'herbert') as HerbertType : undefined : undefined
const lichtmanStage = (values: Values): LichtmanStage | undefined =>
  str(values, 'lunate') === 'diffuse' ? (lichtmanStages as string[]).includes(str(values, 'lichtman')) ? str(values, 'lichtman') as LichtmanStage : undefined : undefined
const palmerClass = (values: Values): PalmerClass | undefined =>
  str(values, 'tfcc') === 'lesion' ? (palmerClasses as string[]).includes(str(values, 'palmer')) ? str(values, 'palmer') as PalmerClass : undefined : undefined

/** The Mayfield input, only once a perilunate injury is entered (W5-1). */
function mayfieldInput(values: Values): MayfieldInput | undefined {
  if (str(values, 'perilunate') !== 'present') return undefined
  return {
    scapholunate: str(values, 'sl') === 'complete',
    capitolunate: str(values, 'capitolunate') === 'yes',
    lunotriquetral: str(values, 'lt') === 'complete',
    lunateDislocated: str(values, 'lunate-position') === 'dislocated',
  }
}

function mayfieldResult(values: Values): MayfieldResult | undefined {
  const input = mayfieldInput(values)
  return input && mayfield(input)
}

/**
 * W3-2, by the author's decision (2026-10-29): over 70° 'disi' (strongly suggests DISI), over 60°
 * up to 70° 'high' (beyond the normal range, supports scapholunate malalignment), below 30°
 * 'visi', 30–60° 'normal', or '' with no angle.
 */
function slAngleReading(values: Values): 'disi' | 'high' | 'visi' | 'normal' | '' {
  const angle = num(values, 'sl-angle')
  if (angle === undefined) return ''
  if (angle > 70) return 'disi'
  if (angle > 60) return 'high'
  if (angle < 30) return 'visi'
  return 'normal'
}

const torn = (values: Values, id: string) => ['partial', 'complete'].includes(str(values, id))

function variantSentences(values: Values): string[] {
  return chosen(values, fields.variants).map((label) => `${upperFirst(label)} (anatomical variant).`)
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  // W2-2 (HB-): the Herbert type from the shared logic.
  const herbert = herbertType(values)
  if (herbert) out.push({ label: 'Herbert', value: `Type ${herbert} (${herbertGroup(herbert)})`, tone: 'warn' })
  // W2-3 (LI-): the Lichtman stage from the shared logic.
  const stage = lichtmanStage(values)
  if (stage) out.push({ label: 'Lichtman', value: `Stage ${stage}`, tone: 'warn' })
  // W2-4: focal ulnar-side lunate signal goes with positive ulnar variance in ulnar impaction.
  if (str(values, 'lunate') === 'focal-ulnar') {
    const variance = str(values, 'ulnar-variance')
    if (variance === 'positive') out.push({ label: 'Ulnar impaction', value: 'Fits: focal ulnar-side lunate signal with positive ulnar variance', tone: 'warn' })
    else if (variance === '') out.push({ label: 'Ulnar impaction', value: 'Pattern of ulnar impaction: check the ulnar variance (step 6)' })
  }
  return out
}

function deriveScapholunate(values: Values): Derived[] {
  // W3-2: normal 30–60°; over 60° supports scapholunate malalignment; over 70° strongly
  // suggests DISI; below 30° VISI.
  const reading = slAngleReading(values)
  if (reading === 'disi') return [{ label: 'Scapholunate angle', value: 'Above 70°: strongly suggests DISI', tone: 'warn' }]
  if (reading === 'high') return [{ label: 'Scapholunate angle', value: 'Above 60°: beyond the normal range, supports scapholunate malalignment', tone: 'warn' }]
  if (reading === 'visi') return [{ label: 'Scapholunate angle', value: 'Below 30°: suggests VISI', tone: 'warn' }]
  if (reading === 'normal') return [{ label: 'Scapholunate angle', value: 'Within 30–60°', tone: 'good' }]
  return []
}

function derivePerilunate(values: Values): Derived[] {
  // W5-1 (MF-): the Mayfield stage from the shared logic.
  const result = mayfieldResult(values)
  return result ? [{ label: 'Mayfield', value: `Stage ${result.stage}`, tone: 'warn' }] : []
}

function deriveTfcc(values: Values): Derived[] {
  // W6-1 (PA-): the Palmer class from the shared logic.
  const c = palmerClass(values)
  return c ? [{ label: 'Palmer', value: `Class ${c}`, tone: 'warn' }] : []
}

/* Report lines, one per entered finding. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  const marrow = str(values, 'marrow')
  return [
    choiceLine(values, fields.history),
    protocol === 'complete' && 'Technique: three planes, fat-suppressed PD/T2 and T1-weighted imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion),
    marrow === 'none' && 'Bone marrow: no edema',
    marrow === 'present' && `Bone marrow: edema${str(values, 'marrow-site') ? ` in ${str(values, 'marrow-site')}` : ''}`,
  ]
}

function boneLines(values: Values): (string | false)[] {
  const scaphoid = str(values, 'scaphoid')
  const herbert = herbertType(values)
  const otherFracture = str(values, 'other-fracture')
  const sites = chosen(values, fields.otherFractureSites)
  const radius = str(values, 'radius')
  const lunate = str(values, 'lunate')
  const stage = lichtmanStage(values)
  const impaction = chosen(values, fields.impactionSites)
  return [
    scaphoid === 'none' && 'Scaphoid: no fracture',
    scaphoid === 'present' && `Scaphoid: fracture${herbert ? `, Herbert ${herbert}: ${herbertDescriptions[herbert]}` : ''}`,
    otherFracture === 'none' && 'Other carpal bones: no fracture',
    otherFracture === 'present' && `Other carpal fracture: ${sites.join(', ') || 'present'}`,
    radius === 'none' && 'Distal radius: no fracture',
    radius === 'present' && `Distal radius: fracture${str(values, 'radius-text') ? `, ${str(values, 'radius-text')}` : ''}`,
    lunate === 'normal' && 'Lunate: normal signal',
    lunate === 'diffuse' && `Lunate: diffuse abnormal signal${stage ? `, Lichtman stage ${stage}` : ''}`,
    lunate === 'focal-ulnar' && `Lunate: focal abnormal signal on the ulnar side of the lunate${impaction.length > 0 ? `; also ${impaction.join(', ')}` : ''}`,
  ]
}

function ligamentLines(values: Values): (string | false)[] {
  const parts = chosen(values, fields.slParts)
  const angle = num(values, 'sl-angle')
  return [
    choiceLine(values, fields.sl, torn(values, 'sl') && parts.length > 0 && `${parts.join(', ')} part${parts.length === 1 ? '' : 's'}`),
    angle !== undefined && `Scapholunate angle: ${angle}°`,
    choiceLine(values, fields.lt),
  ]
}

function perilunateLines(values: Values): (string | false)[] {
  const perilunate = str(values, 'perilunate')
  return [
    perilunate === 'none' && 'Perilunate injury: none',
    perilunate === 'present' && `Perilunate injury: ${join([
      str(values, 'capitolunate') === 'yes' && 'capitolunate joint disrupted',
      str(values, 'lunate-position') === 'dislocated' && 'lunate dislocated from the radius',
    ], ', ') || 'present'}`,
  ]
}

function tfccLines(values: Values): (string | false)[] {
  const tfcc = str(values, 'tfcc')
  const c = palmerClass(values)
  return [
    tfcc === 'intact' && 'TFCC: intact',
    tfcc === 'lesion' && `TFCC: lesion${c ? `, Palmer ${c}: ${palmerDescriptions[c]}` : ''}`,
    choiceLine(values, fields.ulnarVariance),
  ]
}

function softTissueLines(values: Values): (string | false)[] {
  const extrinsicText = str(values, 'extrinsic-text')
  const intersection = str(values, 'intersection')
  const ecuPosition = str(values, 'ecu-position')
  const medianSigns = chosen(values, fields.medianSigns)
  const ganglion = str(values, 'ganglion')
  return [
    choiceLine(values, fields.extrinsicDorsal),
    choiceLine(values, fields.extrinsicVolar),
    extrinsicText && `Extrinsic ligaments: ${extrinsicText}`,
    choiceLine(values, fields.firstCompartment),
    intersection === 'present' && 'Intersection syndrome: edema where the first compartment crosses the second',
    choiceLine(values, fields.ecu, ecuPosition && ecuPosition !== 'groove' && picked(values, fields.ecuPosition)),
    choiceLine(values, fields.otherExtensors, str(values, 'other-extensors') === 'abnormal' && str(values, 'other-extensors-text')),
    choiceLine(values, fields.flexors),
    choiceLine(values, fields.median, medianSigns.length > 0 && medianSigns.join(', ')),
    choiceLine(values, fields.ulnarNerve, str(values, 'ulnar-nerve') === 'abnormal' && str(values, 'guyon-text')),
    ganglion === 'none' && 'Ganglion: none',
    ganglion && ganglion !== 'none' && `Ganglion: ${join([picked(values, fields.ganglion), str(values, 'ganglion-text')], ', ')}`,
    choiceLine(values, fields.synovitis),
  ]
}

/* The impression: one sentence per abnormal finding, in search-pattern order, then the variants. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const effusion = str(values, 'effusion')
  if (effusion === 'moderate' || effusion === 'large') out.push(`${upperFirst(effusion)} joint effusion.`)
  if (str(values, 'marrow') === 'present') {
    const site = str(values, 'marrow-site')
    out.push(`Bone marrow edema${site ? ` in ${site}` : ''}.`)
  }
  if (str(values, 'scaphoid') === 'present') {
    const herbert = herbertType(values)
    out.push(herbert ? herbertSentence(herbert) : 'Scaphoid fracture.')
  }
  if (str(values, 'other-fracture') === 'present') {
    const sites = chosen(values, fields.otherFractureSites)
    out.push(`Carpal fracture${sites.length > 0 ? `: ${sites.join(', ')}` : ''}.`)
  }
  if (str(values, 'radius') === 'present') out.push(`Distal radius fracture${str(values, 'radius-text') ? `: ${str(values, 'radius-text')}` : ''}.`)
  const lunate = str(values, 'lunate')
  if (lunate === 'diffuse') {
    const stage = lichtmanStage(values)
    out.push(stage ? lichtmanSentence(stage) : 'Diffuse abnormal signal in the lunate, as in Kienböck disease.')
  }
  if (lunate === 'focal-ulnar') {
    const positive = str(values, 'ulnar-variance') === 'positive'
    out.push(`Focal abnormal signal on the ulnar side of the lunate${positive ? ' with positive ulnar variance, in keeping with ulnar impaction' : ''}.`)
  }

  for (const [id, name] of [['sl', 'scapholunate'], ['lt', 'lunotriquetral']] as const) {
    const status = str(values, id)
    if (status === 'partial' || status === 'complete') out.push(`${upperFirst(status)} tear of the ${name} ligament.`)
  }
  const reading = slAngleReading(values)
  if (reading === 'disi') out.push(`Scapholunate angle ${num(values, 'sl-angle')}°, strongly suggesting DISI.`)
  if (reading === 'high') out.push(`Scapholunate angle ${num(values, 'sl-angle')}°, above the normal range, supporting scapholunate malalignment.`)
  if (reading === 'visi') out.push(`Scapholunate angle ${num(values, 'sl-angle')}°, suggesting VISI.`)

  if (str(values, 'perilunate') === 'present') {
    const result = mayfieldResult(values)
    out.push(result ? mayfieldSentence(result) : 'Perilunate injury.')
  }
  if (str(values, 'tfcc') === 'lesion') {
    const c = palmerClass(values)
    out.push(c ? palmerSentence(c) : 'TFCC lesion.')
  }

  for (const [id, name] of [['extrinsic-dorsal', 'Dorsal extrinsic ligaments'], ['extrinsic-volar', 'Volar extrinsic ligaments']] as const) {
    if (str(values, id) === 'abnormal') out.push(`${name} abnormal${str(values, 'extrinsic-text') ? `: ${str(values, 'extrinsic-text')}` : ''}.`)
  }
  if (str(values, 'first-compartment') === 'dequervain') out.push('de Quervain tenosynovitis.')
  if (str(values, 'intersection') === 'present') out.push('Intersection syndrome.')
  const ecu = str(values, 'ecu')
  if (ecu && ecu !== 'normal') out.push(`ECU tendon: ${picked(values, fields.ecu)}.`)
  const ecuPosition = str(values, 'ecu-position')
  if (ecuPosition === 'subluxed' || ecuPosition === 'dislocated') out.push(`ECU tendon ${ecuPosition}.`)
  if (str(values, 'other-extensors') === 'abnormal') out.push(`Extensor tendons: ${str(values, 'other-extensors-text') || 'abnormal'}.`)
  const flexors = str(values, 'flexors')
  if (flexors && flexors !== 'normal') out.push(`Flexor tendons: ${picked(values, fields.flexors)}.`)
  if (str(values, 'median') === 'abnormal') {
    const signs = chosen(values, fields.medianSigns)
    out.push(`Median nerve abnormal${signs.length > 0 ? ` (${signs.join(', ')})` : ''}.`)
  }
  if (str(values, 'ulnar-nerve') === 'abnormal') out.push(`Ulnar nerve in the Guyon canal abnormal${str(values, 'guyon-text') ? `: ${str(values, 'guyon-text')}` : ''}.`)
  const ganglion = str(values, 'ganglion')
  if (ganglion && ganglion !== 'none') out.push(`${ganglion === 'other' ? 'Ganglion' : `${upperFirst(ganglion)} ganglion`}${str(values, 'ganglion-text') ? `, ${str(values, 'ganglion-text')}` : ''}.`)
  if (str(values, 'synovitis') === 'present') out.push('Synovitis.')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous, TFCC or tendinous abnormality of the wrist.'

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
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...variants)}`
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...variants)}`
    return variants.length > 0 ? `Impression: ${lines(...variants)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...variants)}`
}

/* "Check before signing": contradictions between entered findings. */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = [
    str(values, 'scaphoid') === 'present' && 'scaphoid fracture',
    str(values, 'other-fracture') === 'present' && 'carpal fracture',
    str(values, 'radius') === 'present' && 'distal radius fracture',
  ].filter((item): item is string => Boolean(item))
  const ligaments = ([['sl', 'scapholunate'], ['lt', 'lunotriquetral']] as const)
    .filter(([id]) => torn(values, id))
    .map(([id, name]) => `${name} ${str(values, id)} tear`)
  const tendons = ([['ecu', 'ECU'], ['flexors', 'flexor']] as const)
    .filter(([id]) => str(values, id) === 'tear')
    .map(([, name]) => `${name} tendon tear`)
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-ligament', 'no intrinsic ligament tear', ligaments],
    ['no-tfcc', 'no TFCC lesion', str(values, 'tfcc') === 'lesion' ? ['TFCC lesion'] : []],
    ['no-tendon', 'no tendon tear', tendons],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // W2-4: ulnar impaction goes with positive ulnar variance.
  if (str(values, 'lunate') === 'focal-ulnar' && str(values, 'ulnar-variance') === 'negative') {
    out.push('Focal ulnar-side lunate signal is entered, the pattern of ulnar impaction, which goes with positive ulnar variance, but the ulnar variance is entered as negative.')
  }
  // W5-2 and MF-5: the stages are progressive; a scaphoid fracture can take the place of the
  // scapholunate tear (a greater-arc injury).
  const input = mayfieldInput(values)
  if (input) {
    const result = mayfield(input)
    const gaps = mayfieldGaps(input).filter((stage) => !(stage === 'I' && str(values, 'scaphoid') === 'present'))
    if (result && gaps.length > 0) {
      out.push(`Mayfield stage ${result.stage} is entered, but the injuries of the earlier stage${gaps.length === 1 ? '' : 's'} (${gaps.join(', ')}) are not; the stages are progressive.`)
    }
  }
  // W6-2: Palmer 2D and 2E include lunotriquetral ligament perforation.
  const c = palmerClass(values)
  if ((c === '2D' || c === '2E') && str(values, 'lt') === 'intact') {
    out.push(`Palmer ${c} is entered, which includes lunotriquetral ligament perforation, but the lunotriquetral ligament is entered as intact.`)
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...boneLines(values),
    ...ligamentLines(values),
    ...perilunateLines(values),
    ...tfccLines(values),
    ...softTissueLines(values),
    list(values, 'variants').length > 0 && `Variants: ${chosen(values, fields.variants).join(', ')}`,
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps, in the lesson's search-pattern order. Each teach panel quotes its lesson section. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    learn: 'technique',
    teach: <p>After a fall on the outstretched hand or other high-energy trauma, look hardest at the scaphoid, the scapholunate ligament and the ring around the lunate ({SHARMA}; {PINHO}). The protocol checklist is this site's own.</p>,
    fields: [fields.history, fields.protocol, fields.protocolMissing, fields.effusion, fields.marrow, fields.marrowSite],
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    learn: 'bones',
    teach: (
      <>
        <p>MRI shows occult scaphoid fractures when radiographs are normal ({GAEBLER}). Herbert types ({HERBERT}):</p>
        {herbertTable}
        <p>Diffuse lunate signal is the Kienböck pattern, staged by Lichtman ({LICHTMAN}); focal signal on the ulnar side of the lunate ({IMAEDA}) with positive ulnar variance ({CEREZAL}) is ulnar impaction.</p>
      </>
    ),
    fields: [fields.scaphoid, fields.herbert, fields.otherFracture, fields.otherFractureSites, fields.radius, fields.radiusText, fields.lunate, fields.lichtman, fields.impactionSites],
    derive: deriveBones,
  },
  {
    id: 'scapholunate',
    title: 'Step 3. Scapholunate ligament and DISI',
    learn: 'scapholunate',
    teach: <p>The dorsal part of the scapholunate ligament is the strongest ({BERGER}; {ANDERSSON}). A normal scapholunate angle is 30–60° ({ZHOU}); over 60° supports scapholunate malalignment ({ANDERSSON}; {PANG}), and over 70° strongly suggests DISI ({ZHOU}), which is dorsal tilt of the lunate, a dorsal radiolunate angle over 15° on a true lateral radiograph ({VASSA}; {KITAY}). Below 30° suggests VISI. Best measured on a true lateral radiograph ({VASSA}).</p>,
    fields: [fields.sl, fields.slParts, fields.slAngle],
    derive: deriveScapholunate,
  },
  {
    id: 'lunotriquetral',
    title: 'Step 4. Lunotriquetral ligament and VISI',
    learn: 'lunotriquetral',
    teach: <p>Lunotriquetral disruption can produce VISI ({ANDERSSON}; {VASSA}); a static VISI typically also needs the dorsal radiocarpal ligament to be compromised ({WILSON}).</p>,
    fields: [fields.lt],
  },
  {
    id: 'perilunate',
    title: 'Step 5. Perilunate injury',
    learn: 'perilunate',
    teach: (
      <>
        <p>Mayfield's stages progress around the lunate, radial to ulnar ({MAYFIELD}), named here by the structures disrupted, since reviews differ on which stage is the perilunate dislocation ({DVORSKY}; {KENNEDY_ALLAN}):</p>
        {mayfieldTable}
      </>
    ),
    fields: [fields.perilunate, fields.capitolunate, fields.lunatePosition],
    derive: derivePerilunate,
  },
  {
    id: 'tfcc',
    title: 'Step 6. TFCC and ulnar variance',
    learn: 'tfcc',
    teach: (
      <>
        <p>Palmer classes ({PALMER}):</p>
        {palmerTable}
        <p>A TFC defect is also found in asymptomatic wrists ({ZANETTI}).</p>
      </>
    ),
    fields: [fields.tfcc, fields.palmer, fields.ulnarVariance],
    derive: deriveTfcc,
  },
  {
    id: 'extrinsic',
    title: 'Step 7. Extrinsic ligaments',
    learn: 'extrinsic',
    teach: <p>The dorsal and volar extrinsic ligaments are identifiable on MR arthrography ({THEUMANN}).</p>,
    fields: [fields.extrinsicDorsal, fields.extrinsicVolar, fields.extrinsicText],
  },
  {
    id: 'extensors',
    title: 'Step 8. Extensor compartments',
    learn: 'extensors',
    teach: <p>de Quervain: thickened first-compartment tendons and edema around them; signal within the tendons is less reliable ({GLAJCHEN}). Intersection syndrome: edema where the first compartment crosses the second ({COSTA}).</p>,
    fields: [fields.firstCompartment, fields.intersection, fields.ecu, fields.ecuPosition, fields.otherExtensors, fields.otherExtensorsText],
  },
  {
    id: 'flexors',
    title: 'Step 9. Flexor tendons and carpal tunnel',
    learn: 'flexors',
    teach: <p>Median nerve swelling at the pisiform, flattening at the hamate, bowing of the retinaculum and increased T2 signal ({MESGARZADEH}).</p>,
    fields: [fields.flexors, fields.median, fields.medianSigns],
  },
  {
    id: 'guyon',
    title: 'Step 10. Guyon canal',
    learn: 'guyon',
    teach: <p>Follow the ulnar nerve through the canal; its variants include accessory muscles ({ZEISS}).</p>,
    fields: [fields.ulnarNerve, fields.guyonText],
  },
  {
    id: 'ganglia',
    title: 'Step 11. Ganglia and synovium',
    learn: 'ganglia',
    teach: <p>MRI finds occult dorsal ganglia in dorsal wrist pain ({VO}).</p>,
    fields: [fields.ganglion, fields.ganglionText, fields.synovitis],
  },
  {
    id: 'variants',
    title: 'Step 12. Variants',
    learn: 'variants',
    teach: <p>Type II lunate ({VIEGAS}), carpal boss ({CONWAY}), accessory muscles ({ZEISS}). Each gets its own impression line.</p>,
    fields: [fields.variants],
  },
  {
    id: 'impression',
    title: 'Step 13. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the abnormal findings in search-pattern order and each variant on its own line.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'wrist-mri',
  name: 'Wrist MRI',
  lede: 'Read a wrist MRI for pain or injury: a fixed search pattern through the scaphoid and lunate, the intrinsic ligaments and perilunate ring, the TFCC, tendons, tunnels and ganglia, and the report.',
  sourceNote: 'Every reference has been matched on PubMed and Crossref. The original papers are paywalled, so claims are checked against their abstracts or against open reviews cited beside them. Still unchecked: whether Herbert and Fisher\'s 1984 paper itself has type B5 (the reviews that list it credit the 1984 paper or Herbert\'s 1990 book).',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'occult-scaphoid',
      question: 'After a fall on the outstretched hand the radiographs are normal, but the snuffbox is tender. What does MRI add?',
      options: ['Nothing until two weeks have passed', 'It shows occult scaphoid fractures not seen on the radiographs', 'It only shows ligament tears', 'It replaces clinical examination'],
      answer: 1,
      explanation: <p>MRI shows occult scaphoid fractures in patients whose first radiographs are normal ({GAEBLER}).</p>,
    },
    {
      id: 'lunate-patterns',
      question: 'Signal is abnormal only on the ulnar side of the lunate, and the ulnar variance is positive. Which diagnosis fits?',
      options: ['Kienböck disease', 'Ulnar impaction', 'Scaphoid nonunion', 'Perilunate dislocation'],
      answer: 1,
      explanation: <p>Ulnar impaction gives focal signal in the ulnar aspect of the lunate ({IMAEDA}) and goes with positive ulnar variance; Kienböck disease involves the whole lunate ({CEREZAL}; {NG}).</p>,
    },
    {
      id: 'lichtman-i',
      question: 'Which Lichtman stage of Kienböck disease has normal radiographs?',
      options: ['Stage I', 'Stage II', 'Stage IIIA', 'Stage IV'],
      answer: 0,
      explanation: <p>Lichtman stage I has normal radiographs; increased density of the lunate is stage II ({LICHTMAN}; {KENNEDY_ABRAMS}).</p>,
    },
    {
      id: 'sl-strongest',
      question: 'Which part of the scapholunate ligament is the strongest?',
      options: ['The volar part', 'The membranous (proximal) part', 'The dorsal part', 'All parts are equally strong'],
      answer: 2,
      explanation: <p>The scapholunate ligament has dorsal, proximal (membranous) and volar parts, and the dorsal part is the strongest ({BERGER}; {ANDERSSON}).</p>,
    },
    {
      id: 'disi',
      question: 'The scapholunate angle measures 75°. What does it suggest?',
      options: ['A normal wrist', 'DISI', 'VISI', 'Ulnar impaction'],
      answer: 1,
      explanation: <p>A normal scapholunate angle is 30° to 60°; over 70° is consistent with DISI ({ZHOU}), which this site reads as strongly suggestive. Over 60° alone is beyond the normal range and supports scapholunate malalignment ({ANDERSSON}; {PANG}); below 30° suggests VISI ({VASSA}).</p>,
    },
    {
      id: 'mayfield-order',
      question: 'In Mayfield\'s progressive perilunar instability, where does the injury usually start?',
      options: ['At the lunotriquetral ligament', 'At the scapholunate ligament (or through the scaphoid)', 'At the TFCC', 'At the distal radioulnar joint'],
      answer: 1,
      explanation: <p>The progression runs around the lunate from radial to ulnar, starting at the scapholunate ligament unless the injury passes through the scaphoid ({MAYFIELD}; {CHEN}).</p>,
    },
    {
      id: 'palmer-classes',
      question: 'In the Palmer classification, what separates class 1 from class 2 TFCC lesions?',
      options: ['Size of the tear', 'Class 1 traumatic, class 2 degenerative', 'Class 1 radial, class 2 ulnar', 'Whether the patient is under 40'],
      answer: 1,
      explanation: <p>Palmer class 1 lesions are traumatic and class 2 lesions degenerative ({PALMER}; {VON_BORSTEL}).</p>,
    },
    {
      id: 'tfcc-asymptomatic',
      question: 'A small central TFC defect is seen. What does the lesson caution?',
      options: ['It always explains ulnar-sided pain', 'It needs surgery', 'Such defects are also found in asymptomatic wrists, so it is not by itself the cause of pain', 'It is an artefact'],
      answer: 2,
      explanation: <p>Triangular fibrocartilage defects are also found in the asymptomatic opposite wrist ({ZANETTI}).</p>,
    },
    {
      id: 'de-quervain',
      question: 'Which tendons are thickened in de Quervain tenosynovitis?',
      options: ['ECRL and ECRB', 'APL and EPB', 'ECU', 'EPL'],
      answer: 1,
      explanation: <p>Increased thickness of the abductor pollicis longus and extensor pollicis brevis tendons of the first compartment was the most reliable sign, with peritendinous edema ({GLAJCHEN}).</p>,
    },
    {
      id: 'carpal-tunnel',
      question: 'Which MRI sign of carpal tunnel syndrome is seen at the level of the hamate?',
      options: ['Swelling of the median nerve', 'Flattening of the median nerve', 'A ganglion', 'Tenosynovitis'],
      answer: 1,
      explanation: <p>The median nerve swells at the level of the pisiform and flattens at the level of the hamate; the flexor retinaculum bows and the nerve shows increased T2 signal ({MESGARZADEH}).</p>,
    },
  ],
}

export function WristMriStudyPage() {
  return <StudyPage study={study} />
}
