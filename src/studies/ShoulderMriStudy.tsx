import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { classifyNeer, emptyNeerInput } from '../logic/neer'
import type { LineStatus, NeerInput, NeerLine } from '../logic/neer'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23; Hill and
 * Sachs 1940 is not in PubMed, so on Crossref only), but most of the papers are paywalled, so
 * only claims whose wording is in an abstract or in open full text are verified. Every claim and
 * rule is listed with an ID (S2-1 and so on), with its status, in
 * docs/superpowers/research/2026-10-23-shoulder-mri-sources.md.
 */

const NEER_DOI = '10.2106/00004623-197052060-00001'
const HILL_SACHS_DOI = '10.1148/35.6.690'
const WORKMAN_DOI = '10.1148/radiology.185.3.1438774'
const RICHARDS_DOI = '10.1148/radiology.190.3.8115607'
const ELLMAN_DOI = '10.1097/00003086-199005000-00010'
const PATTE_DOI = '10.1097/00003086-199005000-00012'
const GOUTALLIER_DOI = '10.1097/00003086-199407000-00014'
const FUCHS_DOI = '10.1016/s1058-2746(99)90097-6'
const WALCH_DOI = '10.1016/s1058-2746(98)90218-x'
const SNYDER_DOI = '10.1016/0749-8063(90)90056-j'
const NEVIASER_ALPSA_DOI = '10.1016/s0749-8063(05)80338-x'
const NEVIASER_GLAD_DOI = '10.1016/s0749-8063(05)80339-1'
const WOERTLER_DOI = '10.1007/s00330-006-0258-6'
const WOLF_DOI = '10.1016/0749-8063(95)90139-6'
const TIRMAN_DOI = '10.1148/radiology.190.3.8115605'
const FRITZ_DOI = '10.1148/radiology.182.2.1732962'
const LINKER_DOI = '10.1148/radiology.188.3.8351331'
const SUGAYA_DOI = '10.1016/j.arthro.2005.08.011'
const TUITE_DOI = '10.1148/radiology.199.2.8668808'
const WILLIAMS_DOI = '10.1016/s0749-8063(05)80105-7'
const SMITH_DOI = '10.1148/radiology.201.1.8816553'
const PARK_DOI = '10.1148/radiology.193.1.8090902'

const NEER = <Cite doi={NEER_DOI}>Neer, J Bone Joint Surg Am 1970</Cite>
const HILL_SACHS = <Cite doi={HILL_SACHS_DOI}>Hill and Sachs, Radiology 1940</Cite>
const WORKMAN = <Cite doi={WORKMAN_DOI}>Workman et al., Radiology 1992</Cite>
const RICHARDS = <Cite doi={RICHARDS_DOI}>Richards et al., Radiology 1994</Cite>
const ELLMAN = <Cite doi={ELLMAN_DOI}>Ellman, Clin Orthop Relat Res 1990</Cite>
const PATTE = <Cite doi={PATTE_DOI}>Patte, Clin Orthop Relat Res 1990</Cite>
const GOUTALLIER = <Cite doi={GOUTALLIER_DOI}>Goutallier et al., Clin Orthop Relat Res 1994</Cite>
const FUCHS = <Cite doi={FUCHS_DOI}>Fuchs et al., J Shoulder Elbow Surg 1999</Cite>
const WALCH = <Cite doi={WALCH_DOI}>Walch et al., J Shoulder Elbow Surg 1998</Cite>
const SNYDER = <Cite doi={SNYDER_DOI}>Snyder et al., Arthroscopy 1990</Cite>
const NEVIASER_ALPSA = <Cite doi={NEVIASER_ALPSA_DOI}>Neviaser, Arthroscopy 1993 (ALPSA)</Cite>
const NEVIASER_GLAD = <Cite doi={NEVIASER_GLAD_DOI}>Neviaser, Arthroscopy 1993 (GLAD)</Cite>
const WOERTLER = <Cite doi={WOERTLER_DOI}>Woertler and Waldt, Eur Radiol 2006</Cite>
const WOLF = <Cite doi={WOLF_DOI}>Wolf et al., Arthroscopy 1995</Cite>
const TIRMAN = <Cite doi={TIRMAN_DOI}>Tirman et al., Radiology 1994</Cite>
const FRITZ = <Cite doi={FRITZ_DOI}>Fritz et al., Radiology 1992</Cite>
const LINKER = <Cite doi={LINKER_DOI}>Linker et al., Radiology 1993</Cite>
const SUGAYA = <Cite doi={SUGAYA_DOI}>Sugaya et al., Arthroscopy 2005</Cite>
const TUITE = <Cite doi={TUITE_DOI}>Tuite and Orwin, Radiology 1996</Cite>
const WILLIAMS = <Cite doi={WILLIAMS_DOI}>Williams et al., Arthroscopy 1994</Cite>
const SMITH = <Cite doi={SMITH_DOI}>Smith et al., Radiology 1996</Cite>
const PARK = <Cite doi={PARK_DOI}>Park et al., Radiology 1994</Cite>

const references: LessonReference[] = [
  { citation: 'Neer CS 2nd. Displaced proximal humeral fractures. I. Classification and evaluation. J Bone Joint Surg Am. 1970;52(6):1077-1089.', doi: NEER_DOI },
  { citation: 'Hill HA, Sachs MD. The grooved defect of the humeral head: a frequently unrecognized complication of dislocations of the shoulder joint. Radiology. 1940;35(6):690-700.', doi: HILL_SACHS_DOI },
  { citation: 'Workman TL, Burkhard TK, Resnick D, Goff WB 2nd, Balsara ZN, Davis DJ, Lapoint JM. Hill-Sachs lesion: comparison of detection with MR imaging, radiography, and arthroscopy. Radiology. 1992;185(3):847-852.', doi: WORKMAN_DOI },
  { citation: 'Richards RD, Sartoris DJ, Pathria MN, Resnick D. Hill-Sachs lesion and normal humeral groove: MR imaging features allowing their differentiation. Radiology. 1994;190(3):665-668.', doi: RICHARDS_DOI },
  { citation: 'Ellman H. Diagnosis and treatment of incomplete rotator cuff tears. Clin Orthop Relat Res. 1990;(254):64-74.', doi: ELLMAN_DOI },
  { citation: 'Patte D. Classification of rotator cuff lesions. Clin Orthop Relat Res. 1990;(254):81-86.', doi: PATTE_DOI },
  { citation: 'Goutallier D, Postel JM, Bernageau J, Lavau L, Voisin MC. Fatty muscle degeneration in cuff ruptures. Pre- and postoperative evaluation by CT scan. Clin Orthop Relat Res. 1994;(304):78-83.', doi: GOUTALLIER_DOI },
  { citation: 'Fuchs B, Weishaupt D, Zanetti M, Hodler J, Gerber C. Fatty degeneration of the muscles of the rotator cuff: assessment by computed tomography versus magnetic resonance imaging. J Shoulder Elbow Surg. 1999;8(6):599-605.', doi: FUCHS_DOI },
  { citation: 'Walch G, Nové-Josserand L, Boileau P, Levigne C. Subluxations and dislocations of the tendon of the long head of the biceps. J Shoulder Elbow Surg. 1998;7(2):100-108.', doi: WALCH_DOI },
  { citation: 'Snyder SJ, Karzel RP, Del Pizzo W, Ferkel RD, Friedman MJ. SLAP lesions of the shoulder. Arthroscopy. 1990;6(4):274-279.', doi: SNYDER_DOI },
  { citation: 'Neviaser TJ. The anterior labroligamentous periosteal sleeve avulsion lesion: a cause of anterior instability of the shoulder. Arthroscopy. 1993;9(1):17-21.', doi: NEVIASER_ALPSA_DOI },
  { citation: 'Neviaser TJ. The GLAD lesion: another cause of anterior shoulder pain. Arthroscopy. 1993;9(1):22-23.', doi: NEVIASER_GLAD_DOI },
  { citation: 'Woertler K, Waldt S. MR imaging in sports-related glenohumeral instability. Eur Radiol. 2006;16(12):2622-2636.', doi: WOERTLER_DOI },
  { citation: 'Wolf EM, Cheng JC, Dickson K. Humeral avulsion of glenohumeral ligaments as a cause of anterior shoulder instability. Arthroscopy. 1995;11(5):600-607.', doi: WOLF_DOI },
  { citation: 'Tirman PF, Feller JF, Janzen DL, Peterfy CG, Bergman AG. Association of glenoid labral cysts with labral tears and glenohumeral instability: radiologic findings and clinical significance. Radiology. 1994;190(3):653-658.', doi: TIRMAN_DOI },
  { citation: 'Fritz RC, Helms CA, Steinbach LS, Genant HK. Suprascapular nerve entrapment: evaluation with MR imaging. Radiology. 1992;182(2):437-444.', doi: FRITZ_DOI },
  { citation: 'Linker CS, Helms CA, Fritz RC. Quadrilateral space syndrome: findings at MR imaging. Radiology. 1993;188(3):675-676.', doi: LINKER_DOI },
  { citation: 'Sugaya H, Maeda K, Matsuki K, Moriishi J. Functional and structural outcome after arthroscopic full-thickness rotator cuff repair: single-row versus dual-row fixation. Arthroscopy. 2005;21(11):1307-1316.', doi: SUGAYA_DOI },
  { citation: 'Tuite MJ, Orwin JF. Anterosuperior labral variants of the shoulder: appearance on gradient-recalled-echo and fast spin-echo MR images. Radiology. 1996;199(2):537-540.', doi: TUITE_DOI },
  { citation: 'Williams MM, Snyder SJ, Buford D Jr. The Buford complex--the "cord-like" middle glenohumeral ligament and absent anterosuperior labrum complex: a normal anatomic capsulolabral variant. Arthroscopy. 1994;10(3):241-247.', doi: WILLIAMS_DOI },
  { citation: 'Smith DK, Chopp TM, Aufdemorte TB, Witkowski EG, Jones RC. Sublabral recess of the superior glenoid labrum: study of cadavers with conventional nonenhanced MR imaging, MR arthrography, anatomic dissection, and limited histologic examination. Radiology. 1996;201(1):251-256.', doi: SMITH_DOI },
  { citation: 'Park JG, Lee JK, Phelps CT. Os acromiale associated with rotator cuff impingement: MR imaging of the shoulder. Radiology. 1994;193(1):255-257.', doi: PARK_DOI },
]

const goutallierTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Grade</th><th>Muscle</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">0</td><td>Normal muscle, no fat</td></tr>
        <tr><td className="vessel-name">1</td><td>Some fatty streaks</td></tr>
        <tr><td className="vessel-name">2</td><td>More muscle than fat</td></tr>
        <tr><td className="vessel-name">3</td><td>As much fat as muscle</td></tr>
        <tr><td className="vessel-name">4</td><td>More fat than muscle</td></tr>
      </tbody>
    </table>
  </div>
)

const snyderTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Superior labrum and biceps anchor</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">I</td><td>Fraying and degeneration of the superior labrum; the anchor is firmly attached</td></tr>
        <tr><td className="vessel-name">II</td><td>The superior labrum and biceps anchor are detached from the glenoid</td></tr>
        <tr><td className="vessel-name">III</td><td>Bucket-handle tear of the superior labrum; the biceps anchor stays attached</td></tr>
        <tr><td className="vessel-name">IV</td><td>Bucket-handle tear of the superior labrum extending into the biceps tendon</td></tr>
      </tbody>
    </table>
  </div>
)

const sugayaTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr><th>Type</th><th>Repaired tendon</th></tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">I</td><td>Sufficient thickness, homogeneously low signal</td></tr>
        <tr><td className="vessel-name">II</td><td>Sufficient thickness, with a partial high-signal area</td></tr>
        <tr><td className="vessel-name">III</td><td>Insufficient thickness, without discontinuity</td></tr>
        <tr><td className="vessel-name">IV</td><td>Minor discontinuity: a small re-tear</td></tr>
        <tr><td className="vessel-name">V</td><td>Major discontinuity: a large re-tear</td></tr>
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
        <p>This lesson is for the shoulder MRI that arrives with a history of pain and little else, so it walks a fixed search pattern through every structure. The order and the protocol checklist are this site's own; none of the papers below prescribes them.</p>
        <p>Check that the study has axial, oblique coronal and oblique sagittal planes, a fluid-sensitive fat-suppressed sequence, and a T1-weighted sequence for the marrow and for fat in the cuff muscles. Then look at the joint fluid, the subacromial-subdeltoid bursa and the marrow as a whole before going structure by structure.</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    body: (
      <>
        <h4>Hill-Sachs lesion</h4>
        <p>The Hill-Sachs lesion is a grooved impaction defect of the posterolateral humeral head, made against the anterior glenoid rim when the shoulder dislocates anteriorly ({HILL_SACHS}). Workman and colleagues compared MRI with radiographs and arthroscopy for detecting it ({WORKMAN}).</p>
        <div className="lesson-key">
          <p>Do not call the normal groove a Hill-Sachs lesion. Richards and colleagues describe a normal flattening of the posterolateral humeral head lower down, and separate it from a Hill-Sachs lesion by its level: the Hill-Sachs defect lies on the most superior axial images, at or above the level of the coracoid process ({RICHARDS}).</p>
        </div>
        <h4>Proximal humerus fracture: Neer</h4>
        <p>Neer divided the proximal humerus into four segments: the articular segment (at the anatomical neck), the greater tuberosity, the lesser tuberosity and the shaft (at the surgical neck). A segment counts as a part only when it is displaced more than 1 cm or angulated more than 45°. Whatever the number of fracture lines, a fracture with no displaced segment is one-part. Two-part fractures displace one segment; three-part fractures displace the surgical neck and one tuberosity; four-part fractures displace both tuberosities and the articular segment. Fracture-dislocations and articular surface fractures (head-splitting and impression) are named as well ({NEER}).</p>
        <p>The Neer calculator on this site applies the same rules, and the report step below uses the same code.</p>
      </>
    ),
  },
  {
    id: 'cuff',
    title: 'Step 3. Supraspinatus and infraspinatus',
    body: (
      <>
        <h4>Partial-thickness tears</h4>
        <p>Ellman described incomplete tears at arthroscopy by side, articular (A), bursal (B) or interstitial (C), and by depth: grade 1 less than 3 mm deep, grade 2 3 to 6 mm, and grade 3 more than 6 mm ({ELLMAN}). These are arthroscopic grades; measuring the depth on MRI is an approximation.</p>
        <h4>Full-thickness tears</h4>
        <p>Measure the tear from front to back and its retraction. Patte staged retraction in the frontal plane by where the tendon stump lies: stage 1 near the bony insertion, stage 2 at the level of the humeral head, and stage 3 at the level of the glenoid ({PATTE}).</p>
        <h4>Fatty infiltration of the muscles</h4>
        <p>Goutallier and colleagues graded fatty degeneration of the cuff muscles on CT ({GOUTALLIER}):</p>
        {goutallierTable}
        <p>Fuchs and colleagues applied the same grades to MRI and compared them with CT: each method was reproducible between observers, but the correlation between MRI and CT grades was only fair to moderate, even on a simplified 3-grade scale ({FUCHS}). Grade the supraspinatus, infraspinatus and subscapularis on oblique sagittal T1-weighted images.</p>
      </>
    ),
  },
  {
    id: 'subscapularis',
    title: 'Step 4. Subscapularis and teres minor',
    body: (
      <>
        <p>Follow the subscapularis tendon to the lesser tuberosity on the axial and oblique sagittal images, and grade its muscle with the Goutallier grades above ({GOUTALLIER}). A subscapularis tear goes with a medially displaced biceps tendon, so read step 5 with this step ({WALCH}).</p>
        <p>Teres minor tendon tears are uncommon. An atrophic or edematous teres minor muscle with a normal tendon is more often a nerve problem; see step 10.</p>
      </>
    ),
  },
  {
    id: 'biceps',
    title: 'Step 5. Long head of biceps',
    body: (
      <>
        <p>Follow the long head of biceps from its anchor on the superior labrum, through the rotator interval, into the bicipital groove. Note tendinosis, a partial tear, or a complete tear with the tendon absent from the groove.</p>
        <p>Then check its position on the axial images. Walch and colleagues found that dislocation of the long head of biceps out of the groove went with tears of the subscapularis ({WALCH}), so a displaced tendon sends you back to step 4.</p>
      </>
    ),
  },
  {
    id: 'labrum',
    title: 'Step 6. Labrum',
    body: (
      <>
        <h4>Anteroinferior labrum: the Bankart family</h4>
        <p>Woertler and Waldt review the anteroinferior labroligamentous injuries of anterior instability ({WOERTLER}): the Bankart lesion (the labrum torn from the glenoid with its periosteum disrupted); the bony Bankart (with a fracture of the anteroinferior glenoid rim); and the Perthes lesion (the labrum torn off, but with the scapular periosteum stripped and intact, so the labrum may stay in place).</p>
        <p>In the ALPSA lesion the labroligamentous complex is avulsed with an intact periosteal sleeve and displaced medially and inferiorly down the scapular neck ({NEVIASER_ALPSA}). The GLAD lesion is a superficial anteroinferior labral tear with an adjacent glenoid cartilage injury, causing pain without instability ({NEVIASER_GLAD}).</p>
        <h4>Superior labrum: SLAP</h4>
        <p>Snyder and colleagues described four types of superior labrum anterior to posterior (SLAP) lesion at arthroscopy ({SNYDER}):</p>
        {snyderTable}
        <div className="lesson-key">
          <p>Before calling a SLAP tear, rule out the normal variants of step 12: a sublabral recess looks like published examples of SLAP lesions ({SMITH}), and misreading a sublabral recess as a tear, or a tear as a recess, gives false positive and false negative diagnoses of a type II SLAP lesion ({WOERTLER}).</p>
        </div>
        <h4>Posterior labrum</h4>
        <p>Read the posterior labrum on every axial image too, even when the history gives no hint of instability.</p>
      </>
    ),
  },
  {
    id: 'capsule',
    title: 'Step 7. Capsule and glenohumeral ligaments',
    body: (
      <>
        <p>Follow the inferior glenohumeral ligament to its humeral attachment. Wolf and colleagues described humeral avulsion of the glenohumeral ligaments (HAGL) as a cause of anterior instability ({WOLF}). An intact labrum does not exclude it, so look at the humeral side of the axillary pouch whenever the labrum looks normal in a shoulder that may have dislocated.</p>
      </>
    ),
  },
  {
    id: 'subacromial',
    title: 'Step 8. Acromioclavicular joint and subacromial space',
    body: (
      <>
        <p>Check the acromioclavicular joint for osteoarthritis or injury, and the subacromial-subdeltoid bursa for fluid or thickening. An os acromiale is reported in step 12.</p>
      </>
    ),
  },
  {
    id: 'cartilage',
    title: 'Step 9. Cartilage',
    body: (
      <>
        <p>Check the cartilage of the glenoid and the humeral head. A cartilage injury next to an anteroinferior labral tear raises the GLAD lesion of step 6 ({NEVIASER_GLAD}).</p>
      </>
    ),
  },
  {
    id: 'nerves',
    title: 'Step 10. Nerves, cysts and denervation',
    body: (
      <>
        <p>Paralabral cysts are associated with labral tears ({TIRMAN}), so a cyst sends you back to the labrum in step 6.</p>
        <p>A mass such as a ganglion can compress the suprascapular nerve. At the suprascapular notch it can affect both the supraspinatus and the infraspinatus; at the spinoglenoid notch, below the branch to the supraspinatus, it affects the infraspinatus alone. Denervation shows as high signal in the muscle on fluid-sensitive images, and later as fatty atrophy ({FRITZ}).</p>
        <p>In quadrilateral space syndrome the axillary nerve is compressed in the quadrilateral space, and MRI shows atrophy of the teres minor ({LINKER}).</p>
      </>
    ),
  },
  {
    id: 'repair',
    title: 'Step 11. Repaired rotator cuff',
    body: (
      <>
        <p>This step applies only when the cuff has been repaired before. Sugaya and colleagues classified the repaired cuff on MRI in five types; types IV and V are re-tears ({SUGAYA}):</p>
        {sugayaTable}
      </>
    ),
  },
  {
    id: 'variants',
    title: 'Step 12. Normal variants',
    body: (
      <>
        <p>On this site each variant gets its own line in the impression, so the reader knows it was seen and not mistaken for a tear.</p>
        <ul className="plain-list">
          <li><strong>Sublabral foramen:</strong> the anterosuperior labrum is not attached to the glenoid, between about the 1 and 3 o'clock positions; do not call it a tear ({TUITE}).</li>
          <li><strong>Buford complex:</strong> an absent anterosuperior labrum with a thick, cord-like middle glenohumeral ligament, a normal variant ({WILLIAMS}).</li>
          <li><strong>Sublabral recess:</strong> a recess between the superior labrum and the glenoid at the biceps anchor, with an appearance similar to SLAP lesions ({SMITH}); it can be mistaken for a type II SLAP lesion and vice versa ({WOERTLER}).</li>
          <li><strong>Os acromiale:</strong> an unfused ossification centre of the acromion, associated with rotator cuff impingement ({PARK}).</li>
        </ul>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 13. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression. A Hill-Sachs lesion should send you to the anteroinferior labrum and the inferior glenohumeral ligament; a displaced biceps tendon to the subscapularis; a paralabral cyst to the labrum and the cuff muscles; and a full-thickness tear to the muscles for fatty infiltration.</p>
      </>
    ),
  },
]

/* The report. Option sets are shared by the fields, the report wording and the rules. */

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (SLAP, AC) alone. */
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

const cuffOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'tendinosis', label: 'Tendinosis' },
  { value: 'partial', label: 'Partial-thickness tear' },
  { value: 'full', label: 'Full-thickness tear' },
]
const sideOptions: Option[] = [
  { value: 'articular', label: 'Articular side' },
  { value: 'bursal', label: 'Bursal side' },
  { value: 'interstitial', label: 'Interstitial' },
]
const ellmanSide: Record<string, string> = { articular: 'A', bursal: 'B', interstitial: 'C' }
const sideWords: Record<string, string> = { articular: 'articular-side', bursal: 'bursal-side', interstitial: 'interstitial' }

/** S3-1 (to check): Ellman grade 1 is less than 3 mm deep, grade 2 3 to 6 mm, grade 3 more than 6 mm. */
function ellmanGrade(depth: number): string {
  if (depth < 3) return '1'
  if (depth <= 6) return '2'
  return '3'
}

const patteOptions: Option[] = [
  { value: '1', label: 'Stump near the bony insertion' },
  { value: '2', label: 'Stump at the level of the humeral head' },
  { value: '3', label: 'Stump at the level of the glenoid' },
]

const goutallierOptions: Option[] = [
  { value: '0', label: 'Normal muscle, no fat' },
  { value: '1', label: 'Some fatty streaks' },
  { value: '2', label: 'More muscle than fat' },
  { value: '3', label: 'As much fat as muscle' },
  { value: '4', label: 'More fat than muscle' },
]

const neerLineOptions: Option[] = [
  { value: 'none', label: 'No fracture line' },
  { value: 'undisplaced', label: 'Not displaced (≤ 1 cm and ≤ 45°)' },
  { value: 'displaced', label: 'Displaced (> 1 cm or > 45°)' },
]

const normalAbnormal: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'abnormal', label: 'Abnormal' },
]
const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]

const anteriorLabrumOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'bankart', label: 'Bankart lesion' },
  { value: 'bony-bankart', label: 'Bony Bankart lesion' },
  { value: 'perthes', label: 'Perthes lesion' },
  { value: 'alpsa', label: 'ALPSA lesion' },
  { value: 'glad', label: 'GLAD lesion' },
  { value: 'other', label: 'Other tear' },
]

/** S6-1 (to check): Snyder's four SLAP types, worded as their definitions. */
const superiorLabrumOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'i', label: 'Fraying, anchor attached' },
  { value: 'ii', label: 'Labrum and biceps anchor detached' },
  { value: 'iii', label: 'Bucket-handle tear, anchor attached' },
  { value: 'iv', label: 'Bucket-handle tear into the biceps tendon' },
]
const snyderType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III', iv: 'IV' }

/** S11-1 (to check): Sugaya's five types; IV and V are re-tears. */
const sugayaOptions: Option[] = [
  { value: 'i', label: 'Sufficient thickness, homogeneously low signal' },
  { value: 'ii', label: 'Sufficient thickness, partial high-signal area' },
  { value: 'iii', label: 'Insufficient thickness, no discontinuity' },
  { value: 'iv', label: 'Minor discontinuity (small re-tear)' },
  { value: 'v', label: 'Major discontinuity (large re-tear)' },
]
const sugayaType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III', iv: 'IV', v: 'V' }
const sugayaRetear = (value: string) => value === 'iv' || value === 'v'

function cuffFields(id: string, label: string, help: string): Field[] {
  return [
    { id, kind: 'choice', label, options: cuffOptions, help, required: true },
    { id: `${id}-side`, kind: 'choice', label: `${label} partial tear side`, options: sideOptions, showIf: (v) => str(v, id) === 'partial' },
    { id: `${id}-depth`, kind: 'number', label: `${label} partial tear depth`, unit: 'mm', min: 0, step: 0.5, showIf: (v) => str(v, id) === 'partial', help: 'Ellman (arthroscopic): grade 1 < 3 mm, grade 2 3–6 mm, grade 3 > 6 mm.' },
    { id: `${id}-width`, kind: 'number', label: `${label} tear width (front to back)`, unit: 'mm', min: 0, step: 1, showIf: (v) => str(v, id) === 'full' },
  ]
}

const fields = {
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'Axial, oblique coronal and oblique sagittal; fluid-sensitive fat-suppressed; T1.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'planes', label: 'All three planes' },
    { value: 'fs', label: 'A fluid-sensitive fat-suppressed sequence' },
    { value: 't1', label: 'A T1-weighted sequence' },
  ] },
  effusion: { id: 'effusion', kind: 'choice', label: 'Glenohumeral joint effusion', required: true, options: nonePresent },
  marrow: { id: 'marrow', kind: 'choice', label: 'Bone marrow edema', required: true, options: nonePresent },
  marrowSite: { id: 'marrow-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. greater tuberosity', showIf: (v) => str(v, 'marrow') === 'present' },

  hillSachs: { id: 'hill-sachs', kind: 'choice', label: 'Hill-Sachs lesion', required: true, help: 'Posterolateral head, on the most superior axial images; the normal groove lies lower.', options: nonePresent },
  fracture: { id: 'fracture', kind: 'choice', label: 'Fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'proximal-humerus', label: 'Proximal humerus' },
    { value: 'other', label: 'Other' },
  ] },
  fractureSite: { id: 'fracture-site', kind: 'text', label: 'Fracture site', placeholder: 'e.g. glenoid body', showIf: (v) => str(v, 'fracture') === 'other' },
  neerAnatomical: { id: 'neer-anatomical', kind: 'choice', label: 'Anatomical neck', options: neerLineOptions, showIf: (v) => str(v, 'fracture') === 'proximal-humerus', help: 'Neer: a part only when displaced > 1 cm or angulated > 45°. Same rules as the Neer calculator.' },
  neerSurgical: { id: 'neer-surgical', kind: 'choice', label: 'Surgical neck', options: neerLineOptions, showIf: (v) => str(v, 'fracture') === 'proximal-humerus' },
  neerGreater: { id: 'neer-greater', kind: 'choice', label: 'Greater tuberosity', options: neerLineOptions, showIf: (v) => str(v, 'fracture') === 'proximal-humerus' },
  neerLesser: { id: 'neer-lesser', kind: 'choice', label: 'Lesser tuberosity', options: neerLineOptions, showIf: (v) => str(v, 'fracture') === 'proximal-humerus' },
  neerDislocation: { id: 'neer-dislocation', kind: 'choice', label: 'Fracture-dislocation', showIf: (v) => str(v, 'fracture') === 'proximal-humerus', options: [
    { value: 'none', label: 'None' },
    { value: 'anterior', label: 'Anterior' },
    { value: 'posterior', label: 'Posterior' },
  ] },
  neerArticular: { id: 'neer-articular', kind: 'choice', label: 'Articular surface fracture', showIf: (v) => str(v, 'fracture') === 'proximal-humerus', options: [
    { value: 'none', label: 'None' },
    { value: 'head-split', label: 'Head-splitting' },
    { value: 'impression', label: 'Impression' },
  ] },

  supraspinatus: cuffFields('supraspinatus', 'Supraspinatus', 'Oblique coronal and sagittal images.'),
  supraspinatusRetraction: { id: 'supraspinatus-retraction', kind: 'choice', label: 'Supraspinatus retraction', options: patteOptions, showIf: (v) => str(v, 'supraspinatus') === 'full', help: 'Patte stages, frontal plane.' },
  infraspinatus: cuffFields('infraspinatus', 'Infraspinatus', 'Posterior to the supraspinatus on the oblique coronal and sagittal images.'),
  supraspinatusFat: { id: 'supraspinatus-fat', kind: 'choice', label: 'Supraspinatus muscle fat', options: goutallierOptions, help: 'Goutallier grades, oblique sagittal T1.' },
  infraspinatusFat: { id: 'infraspinatus-fat', kind: 'choice', label: 'Infraspinatus muscle fat', options: goutallierOptions },

  subscapularis: cuffFields('subscapularis', 'Subscapularis', 'To the lesser tuberosity on axial and oblique sagittal images.'),
  subscapularisFat: { id: 'subscapularis-fat', kind: 'choice', label: 'Subscapularis muscle fat', options: goutallierOptions, help: 'Goutallier grades.' },
  teresMinor: { id: 'teres-minor', kind: 'choice', label: 'Teres minor tendon', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'tendinosis', label: 'Tendinosis' },
    { value: 'tear', label: 'Tear' },
  ] },

  biceps: { id: 'biceps', kind: 'choice', label: 'Long head of biceps', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'tendinosis', label: 'Tendinosis' },
    { value: 'partial', label: 'Partial tear' },
    { value: 'complete', label: 'Complete tear (absent from the groove)' },
  ] },
  bicepsPosition: { id: 'biceps-position', kind: 'choice', label: 'Biceps position', showIf: (v) => str(v, 'biceps') !== 'complete', help: 'A displaced tendon goes with subscapularis tears.', options: [
    { value: 'groove', label: 'In the groove' },
    { value: 'subluxed', label: 'Subluxed medially' },
    { value: 'dislocated', label: 'Dislocated medially' },
  ] },

  labrumAnterior: { id: 'labrum-anterior', kind: 'choice', label: 'Anteroinferior labrum', required: true, options: anteriorLabrumOptions },
  labrumSuperior: { id: 'labrum-superior', kind: 'choice', label: 'Superior labrum and biceps anchor', required: true, options: superiorLabrumOptions, help: 'Snyder SLAP types. Rule out a sublabral recess first.' },
  labrumPosterior: { id: 'labrum-posterior', kind: 'choice', label: 'Posterior labrum', required: true, options: [
    { value: 'intact', label: 'Intact' },
    { value: 'tear', label: 'Tear' },
  ] },

  ighl: { id: 'ighl', kind: 'choice', label: 'Inferior glenohumeral ligament', required: true, help: 'Check the humeral attachment for a HAGL lesion.', options: [
    { value: 'intact', label: 'Intact' },
    { value: 'hagl', label: 'Humeral avulsion (HAGL)' },
    { value: 'other', label: 'Other injury' },
  ] },
  ighlText: { id: 'ighl-text', kind: 'text', label: 'Inferior glenohumeral ligament (describe)', showIf: (v) => str(v, 'ighl') === 'other' },

  acJoint: { id: 'ac-joint', kind: 'choice', label: 'Acromioclavicular joint', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'osteoarthritis', label: 'Osteoarthritis' },
    { value: 'injury', label: 'Injury' },
  ] },
  bursa: { id: 'bursa', kind: 'choice', label: 'Subacromial-subdeltoid bursa', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'bursitis', label: 'Fluid or thickening (bursitis)' },
  ] },

  cartilage: { id: 'cartilage', kind: 'choice', label: 'Glenohumeral cartilage', required: true, options: normalAbnormal },
  cartilageText: { id: 'cartilage-text', kind: 'text', label: 'Cartilage (describe)', placeholder: 'site and depth', showIf: (v) => str(v, 'cartilage') === 'abnormal' },

  cyst: { id: 'paralabral-cyst', kind: 'choice', label: 'Paralabral cyst', required: true, options: nonePresent },
  cystSite: { id: 'cyst-site', kind: 'choice', label: 'Cyst site', showIf: (v) => str(v, 'paralabral-cyst') === 'present', options: [
    { value: 'suprascapular', label: 'Suprascapular notch' },
    { value: 'spinoglenoid', label: 'Spinoglenoid notch' },
    { value: 'other', label: 'Elsewhere' },
  ] },
  denervation: { id: 'denervation', kind: 'choice', label: 'Muscle denervation', required: true, options: nonePresent },
  denervationMuscles: { id: 'denervation-muscles', kind: 'multi', label: 'Muscles affected', showIf: (v) => str(v, 'denervation') === 'present', options: [
    { value: 'supraspinatus', label: 'Supraspinatus' },
    { value: 'infraspinatus', label: 'Infraspinatus' },
    { value: 'teres-minor', label: 'Teres minor' },
    { value: 'deltoid', label: 'Deltoid' },
  ] },
  denervationPhase: { id: 'denervation-phase', kind: 'choice', label: 'Denervation appearance', showIf: (v) => str(v, 'denervation') === 'present', options: [
    { value: 'edema', label: 'High signal (edema)' },
    { value: 'atrophy', label: 'Fatty atrophy' },
  ] },

  priorRepair: { id: 'prior-repair', kind: 'choice', label: 'Previous rotator cuff repair', required: true, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  repairIntegrity: { id: 'repair-integrity', kind: 'choice', label: 'Repaired cuff', required: true, options: sugayaOptions, showIf: (v) => str(v, 'prior-repair') === 'yes', help: 'Sugaya types; IV and V are re-tears.' },

  variants: { id: 'variants', kind: 'multi', label: 'Normal variants seen', help: 'Each gets its own impression line.', options: [
    { value: 'sublabral-foramen', label: 'Sublabral foramen' },
    { value: 'buford', label: 'Buford complex' },
    { value: 'sublabral-recess', label: 'Sublabral recess' },
    { value: 'os-acromiale', label: 'Os acromiale' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. calcific tendinitis, mass' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-cuff-tear', label: 'No rotator cuff tear' },
    { value: 'no-labral-tear', label: 'No labral tear' },
    { value: 'no-fracture', label: 'No fracture' },
  ] },
} satisfies Record<string, Field | Field[]>

/* Rule helpers shared by the chips, the report and the warnings. */

const cuffTendons: [string, string][] = [['supraspinatus', 'supraspinatus'], ['infraspinatus', 'infraspinatus'], ['subscapularis', 'subscapularis']]
const cuffMuscles: [string, string][] = [['supraspinatus-fat', 'Supraspinatus'], ['infraspinatus-fat', 'Infraspinatus'], ['subscapularis-fat', 'Subscapularis']]

const neerFields: [string, NeerLine][] = [
  ['neer-anatomical', 'anatomicalNeck'],
  ['neer-surgical', 'surgicalNeck'],
  ['neer-greater', 'greaterTuberosity'],
  ['neer-lesser', 'lesserTuberosity'],
]

/** The Neer input from the bones step, or undefined when no proximal humerus fracture is entered. */
function neerInput(values: Values): NeerInput | undefined {
  if (str(values, 'fracture') !== 'proximal-humerus') return undefined
  const lineValues = Object.fromEntries(neerFields.map(([id, line]) => [line, (str(values, id) || 'none') as LineStatus])) as Record<NeerLine, LineStatus>
  const dislocation = str(values, 'neer-dislocation')
  const articular = str(values, 'neer-articular')
  return {
    ...emptyNeerInput,
    lines: lineValues,
    dislocation: dislocation === 'anterior' || dislocation === 'posterior' ? dislocation : 'none',
    articular: articular === 'head-split' || articular === 'impression' ? articular : 'none',
  }
}

function neer(values: Values) {
  const input = neerInput(values)
  if (!input) return undefined
  const result = classifyNeer(input)
  return result.parts === 0 ? undefined : result
}

/** "partial-thickness articular-side tear", "full-thickness tear, 12 mm wide" and so on. */
function cuffWords(values: Values, id: string): string {
  const status = str(values, id)
  if (status === 'partial') {
    const side = sideWords[str(values, `${id}-side`)] as string | undefined
    const depth = num(values, `${id}-depth`)
    return join([`partial-thickness ${side ? `${side} ` : ''}tear`, depth !== undefined && `${depth} mm deep`], ', ')
  }
  if (status === 'full') {
    const width = num(values, `${id}-width`)
    return join(['full-thickness tear', width !== undefined && `${width} mm wide`], ', ')
  }
  return status
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function anyLabralTear(values: Values): string[] {
  const out: string[] = []
  const anterior = str(values, 'labrum-anterior')
  if (anterior && anterior !== 'intact') out.push(picked(values, fields.labrumAnterior))
  const superior = snyderType[str(values, 'labrum-superior')] as string | undefined
  if (superior) out.push(`SLAP type ${superior}`)
  if (str(values, 'labrum-posterior') === 'tear') out.push('posterior labral tear')
  return out
}

/* Rule chips, one function per step that has a sourced rule. */

function deriveBones(values: Values): Derived[] {
  const result = neer(values)
  // N1-N5 (to check): the Neer type from the shared logic.
  return result ? [{ label: 'Neer', value: result.label, tone: 'warn' }] : []
}

function ellmanChip(values: Values, id: string, name: string): Derived | undefined {
  if (str(values, id) !== 'partial') return undefined
  const side = ellmanSide[str(values, `${id}-side`)] as string | undefined
  const depth = num(values, `${id}-depth`)
  if (!side && depth === undefined) return undefined
  const value = join([side && `${upperFirst(str(values, `${id}-side`))} (${side})`, depth !== undefined && `grade ${ellmanGrade(depth)}`], ', ')
  return { label: `${name} partial tear (Ellman)`, value, tone: 'warn' }
}

function deriveCuff(values: Values): Derived[] {
  const out: Derived[] = []
  for (const [id, name] of [['supraspinatus', 'Supraspinatus'], ['infraspinatus', 'Infraspinatus']]) {
    const chip = ellmanChip(values, id, name)
    if (chip) out.push(chip)
  }
  // S3-2 (to check): Patte stages 1 to 3 by where the stump lies.
  const patte = str(values, 'supraspinatus-retraction')
  if (patte) out.push({ label: 'Retraction (Patte)', value: `Stage ${patte}`, tone: 'warn' })
  // S3-3 (to check): Goutallier grades 0 to 4.
  for (const [id, name] of cuffMuscles.slice(0, 2)) {
    const grade = str(values, id)
    if (grade) out.push({ label: `${name} (Goutallier)`, value: `Grade ${grade}`, tone: grade === '0' ? 'good' : 'warn' })
  }
  return out
}

function deriveSubscapularis(values: Values): Derived[] {
  const out: Derived[] = []
  const chip = ellmanChip(values, 'subscapularis', 'Subscapularis')
  if (chip) out.push(chip)
  const grade = str(values, 'subscapularis-fat')
  if (grade) out.push({ label: 'Subscapularis (Goutallier)', value: `Grade ${grade}`, tone: grade === '0' ? 'good' : 'warn' })
  return out
}

function deriveLabrum(values: Values): Derived[] {
  // S6-1 (to check): Snyder SLAP types I to IV.
  const type = snyderType[str(values, 'labrum-superior')] as string | undefined
  return type ? [{ label: 'SLAP (Snyder)', value: `Type ${type}`, tone: 'warn' }] : []
}

function deriveNerves(values: Values): Derived[] {
  const out: Derived[] = []
  // S10-2 (to check): a mass at the suprascapular notch can affect both muscles; at the
  // spinoglenoid notch, the infraspinatus alone.
  const site = str(values, 'cyst-site')
  if (site === 'suprascapular') out.push({ label: 'Cyst site (Fritz)', value: 'Can affect the supraspinatus and infraspinatus', tone: 'warn' })
  if (site === 'spinoglenoid') out.push({ label: 'Cyst site (Fritz)', value: 'Can affect the infraspinatus alone', tone: 'warn' })
  // S10-3 (to check): quadrilateral space syndrome shows teres minor atrophy.
  if (list(values, 'denervation-muscles').includes('teres-minor')) {
    out.push({ label: 'Teres minor denervation (Linker)', value: 'Consider quadrilateral space syndrome', tone: 'warn' })
  }
  return out
}

function deriveRepair(values: Values): Derived[] {
  // S11-1 (to check): Sugaya types I to V; IV and V are re-tears.
  const value = str(values, 'repair-integrity')
  const type = sugayaType[value] as string | undefined
  if (!type) return []
  return [{ label: 'Repaired cuff (Sugaya)', value: `Type ${type}: ${sugayaRetear(value) ? 're-tear' : 'no re-tear'}`, tone: sugayaRetear(value) ? 'warn' : 'good' }]
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
    protocol === 'complete' && 'Technique: axial, oblique coronal and oblique sagittal planes, fat-suppressed fluid-sensitive and T1-weighted imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion),
    marrow === 'none' && 'Bone marrow: no edema',
    marrow === 'present' && `Bone marrow: edema${str(values, 'marrow-site') ? ` in ${str(values, 'marrow-site')}` : ''}`,
  ]
}

function boneLines(values: Values): (string | false)[] {
  const fracture = str(values, 'fracture')
  const result = neer(values)
  return [
    choiceLine(values, fields.hillSachs),
    fracture === 'none' && 'Fracture: none',
    fracture === 'proximal-humerus' && (result ? result.report : 'Proximal humerus fracture'),
    fracture === 'other' && `Fracture: ${str(values, 'fracture-site') || 'present'}`,
  ]
}

function cuffLine(values: Values, id: string, name: string, extra?: string | false): string {
  const words = cuffWords(values, id)
  return words ? `${name}: ${join([words, extra])}` : ''
}

function fatLine(values: Values): string {
  const grades = cuffMuscles
    .filter(([id]) => str(values, id))
    .map(([id, name]) => `${name.toLowerCase()} grade ${str(values, id)}`)
  return grades.length > 0 ? `Muscle fatty infiltration (Goutallier): ${grades.join(', ')}` : ''
}

function cuffLines(values: Values): (string | false)[] {
  const patte = str(values, 'supraspinatus-retraction')
  return [
    cuffLine(values, 'supraspinatus', 'Supraspinatus', patte && `retraction: ${picked(values, fields.supraspinatusRetraction)} (Patte stage ${patte})`),
    cuffLine(values, 'infraspinatus', 'Infraspinatus'),
    cuffLine(values, 'subscapularis', 'Subscapularis'),
    choiceLine(values, fields.teresMinor),
    fatLine(values),
  ]
}

function bicepsLine(values: Values): string {
  const status = picked(values, fields.biceps)
  const position = str(values, 'biceps-position')
  const body = join([status, position && picked(values, fields.bicepsPosition)])
  return body && `Long head of biceps: ${body}`
}

function labrumLines(values: Values): (string | false)[] {
  const superior = str(values, 'labrum-superior')
  const type = snyderType[superior] as string | undefined
  return [
    choiceLine(values, fields.labrumAnterior),
    superior === 'intact' && 'Superior labrum and biceps anchor: intact',
    type !== undefined && `Superior labrum and biceps anchor: ${picked(values, fields.labrumSuperior)} (SLAP type ${type})`,
    choiceLine(values, fields.labrumPosterior),
  ]
}

function nerveLines(values: Values): (string | false)[] {
  const cyst = str(values, 'paralabral-cyst')
  const site = str(values, 'cyst-site')
  const denervation = str(values, 'denervation')
  const muscles = chosen(values, fields.denervationMuscles)
  const phase = str(values, 'denervation-phase')
  return [
    cyst === 'none' && 'Paralabral cyst: none',
    cyst === 'present' && `Paralabral cyst: ${site && site !== 'other' ? `at the ${picked(values, fields.cystSite)}` : 'present'}`,
    denervation === 'none' && 'Muscle denervation: none',
    denervation === 'present' && `Muscle denervation: ${join([muscles.join(', ') || 'present', phase && picked(values, fields.denervationPhase)])}`,
  ]
}

function repairLine(values: Values): string {
  const prior = str(values, 'prior-repair')
  if (prior === 'no') return 'Previous rotator cuff repair: no'
  if (prior !== 'yes') return ''
  const value = str(values, 'repair-integrity')
  const type = sugayaType[value] as string | undefined
  return `Repaired rotator cuff: ${type ? `${picked(values, fields.repairIntegrity)} (Sugaya type ${type})` : 'integrity not stated'}`
}

/* The impression: one sentence per abnormal finding, in search-pattern order. */

function cuffSentence(values: Values, id: string, name: string): string {
  const status = str(values, id)
  if (status === 'tendinosis') return `${upperFirst(name)} tendinosis.`
  if (status === 'partial' || status === 'full') {
    const extra = id === 'supraspinatus' && status === 'full' && str(values, 'supraspinatus-retraction')
    return `${upperFirst(cuffWords(values, id))} of the ${name}${extra ? `, Patte stage ${extra} retraction` : ''}.`
  }
  return ''
}

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  if (str(values, 'effusion') === 'present') out.push('Glenohumeral joint effusion.')
  if (str(values, 'marrow') === 'present') out.push(`Bone marrow edema${str(values, 'marrow-site') ? ` in ${str(values, 'marrow-site')}` : ''}.`)
  if (str(values, 'hill-sachs') === 'present') out.push('Hill-Sachs lesion.')
  const fracture = str(values, 'fracture')
  const result = neer(values)
  if (fracture === 'proximal-humerus') out.push(result ? result.report.split(' Fracture lines:')[0] : 'Proximal humerus fracture.')
  if (fracture === 'other') out.push(`Fracture${str(values, 'fracture-site') ? `: ${str(values, 'fracture-site')}` : ''}.`)

  for (const [id, name] of cuffTendons) out.push(cuffSentence(values, id, name))
  const teres = str(values, 'teres-minor')
  if (teres === 'tendinosis' || teres === 'tear') out.push(`Teres minor tendon ${teres}.`)
  for (const [id, name] of cuffMuscles) {
    const grade = str(values, id)
    if (grade && grade !== '0') out.push(`${name} fatty infiltration, Goutallier grade ${grade}.`)
  }

  const biceps = str(values, 'biceps')
  if (biceps && biceps !== 'normal') out.push(`Long head of biceps: ${picked(values, fields.biceps)}.`)
  const position = str(values, 'biceps-position')
  if (position === 'subluxed' || position === 'dislocated') out.push(`Long head of biceps ${position} medially.`)

  const anterior = str(values, 'labrum-anterior')
  if (anterior && anterior !== 'intact') out.push(anterior === 'other' ? 'Anteroinferior labral tear.' : `${upperFirst(picked(values, fields.labrumAnterior))}.`)
  const slap = snyderType[str(values, 'labrum-superior')] as string | undefined
  if (slap) out.push(`SLAP tear, Snyder type ${slap}.`)
  if (str(values, 'labrum-posterior') === 'tear') out.push('Posterior labral tear.')

  const ighl = str(values, 'ighl')
  if (ighl === 'hagl') out.push('Humeral avulsion of the inferior glenohumeral ligament (HAGL).')
  if (ighl === 'other') out.push(`Inferior glenohumeral ligament: ${str(values, 'ighl-text') || 'injury'}.`)
  const ac = str(values, 'ac-joint')
  if (ac === 'osteoarthritis' || ac === 'injury') out.push(`Acromioclavicular joint ${ac}.`)
  if (str(values, 'bursa') === 'bursitis') out.push('Subacromial-subdeltoid bursitis.')
  if (str(values, 'cartilage') === 'abnormal') out.push(`Glenohumeral cartilage: ${str(values, 'cartilage-text') || 'abnormal'}.`)

  if (str(values, 'paralabral-cyst') === 'present') {
    const site = str(values, 'cyst-site')
    out.push(`Paralabral cyst${site && site !== 'other' ? ` at the ${picked(values, fields.cystSite)}` : ''}.`)
  }
  if (str(values, 'denervation') === 'present') {
    const muscles = chosen(values, fields.denervationMuscles)
    const phase = str(values, 'denervation-phase')
    out.push(`${phase === 'atrophy' ? 'Fatty atrophy' : phase === 'edema' ? 'Denervation edema' : 'Denervation'}${muscles.length > 0 ? ` of the ${muscles.join(', ')}` : ''}.`)
  }
  const repair = str(values, 'repair-integrity')
  if (str(values, 'prior-repair') === 'yes' && sugayaRetear(repair)) out.push(`Re-tear of the repaired rotator cuff, Sugaya type ${sugayaType[repair]}.`)
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

/** Lines that go in the impression whether or not the rest is normal: an intact repair and the variants. */
function notes(values: Values): string[] {
  const out: string[] = []
  const repair = str(values, 'repair-integrity')
  if (str(values, 'prior-repair') === 'yes' && repair && !sugayaRetear(repair)) out.push(`Intact rotator cuff repair, Sugaya type ${sugayaType[repair]}.`)
  const variants = list(values, 'variants')
  if (variants.includes('sublabral-foramen')) out.push('Sublabral foramen, a normal variant.')
  if (variants.includes('buford')) out.push('Buford complex, a normal variant.')
  if (variants.includes('sublabral-recess')) out.push('Sublabral recess, a normal variant.')
  if (variants.includes('os-acromiale')) out.push('Os acromiale.')
  return out
}

const NORMAL_IMPRESSION = 'No rotator cuff tear, labral tear or other abnormality of the shoulder.'

function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

function impression(values: Values): string {
  const found = findings(values)
  const extra = notes(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...extra, ...negatives)}`
    const complete = steps.every((step) => step.fields.every((field) => !field.required || (field.showIf?.(values) ?? true) === false || str(values, field.id) !== ''))
    return complete ? `Impression: ${lines(limited, NORMAL_IMPRESSION, ...extra)}` : ''
  }
  return `Impression: ${lines(limited, ...found, ...extra, other && 'Other findings as above.', ...negatives)}`
}

/* "Check before signing": contradictions between entered findings. */

function cuffTears(values: Values): string[] {
  const out = cuffTendons
    .filter(([id]) => ['partial', 'full'].includes(str(values, id)))
    .map(([id, name]) => `${name} ${str(values, id) === 'full' ? 'full-thickness' : 'partial-thickness'} tear`)
  if (str(values, 'teres-minor') === 'tear') out.push('teres minor tear')
  const repair = str(values, 'repair-integrity')
  if (str(values, 'prior-repair') === 'yes' && sugayaRetear(repair)) out.push('re-tear of the repaired cuff')
  return out
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fracture = str(values, 'fracture')
  const fractures = [
    fracture === 'proximal-humerus' && 'proximal humerus fracture',
    fracture === 'other' && 'fracture',
    str(values, 'labrum-anterior') === 'bony-bankart' && 'bony Bankart lesion',
  ].filter((item): item is string => Boolean(item))
  const checks: [string, string, string[]][] = [
    ['no-cuff-tear', 'no rotator cuff tear', cuffTears(values)],
    ['no-labral-tear', 'no labral tear', anyLabralTear(values)],
    ['no-fracture', 'no fracture', fractures],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // S10-1 (to check): paralabral cysts are associated with labral tears.
  if (str(values, 'paralabral-cyst') === 'present' && anyLabralTear(values).length === 0 && str(values, 'labrum-anterior') !== '') {
    out.push('A paralabral cyst is entered with an intact labrum. Paralabral cysts go with labral tears: look at the labrum again.')
  }
  // S5-1 (to check): a displaced long head of biceps goes with subscapularis tears.
  const position = str(values, 'biceps-position')
  if ((position === 'subluxed' || position === 'dislocated') && ['normal', 'tendinosis'].includes(str(values, 'subscapularis'))) {
    out.push('The long head of biceps is displaced medially, but no subscapularis tear is entered. Displaced biceps tendons go with subscapularis tears: look at it again.')
  }
  // S12-3: "false positive and false negative diagnoses of a SLAP type 2 lesion can be caused by
  // misinterpretation of a sublabral recess as a tear and vice versa" (Woertler and Waldt 2006,
  // full text). S6-1 (the Snyder type wording) is still unchecked.
  if (str(values, 'labrum-superior') === 'ii' && list(values, 'variants').includes('sublabral-recess')) {
    out.push('Both a type II SLAP tear and a sublabral recess are entered at the biceps anchor. The recess can mimic the tear: decide which it is.')
  }
  return out
}

function build(values: Values) {
  // Raw labels: lowerFirst would turn "Buford" into "buford".
  const variants = list(values, 'variants').map((value) => optionLabel(fields.variants, value))
  const text = lines(
    ...techniqueLines(values),
    ...boneLines(values),
    ...cuffLines(values),
    bicepsLine(values),
    ...labrumLines(values),
    choiceLine(values, fields.ighl, str(values, 'ighl') === 'other' && str(values, 'ighl-text')),
    choiceLine(values, fields.acJoint),
    choiceLine(values, fields.bursa),
    choiceLine(values, fields.cartilage, str(values, 'cartilage') === 'abnormal' && str(values, 'cartilage-text')),
    ...nerveLines(values),
    repairLine(values),
    variants.length > 0 && `Normal variants: ${variants.join(', ')}`,
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
    teach: <p>Check for axial, oblique coronal and oblique sagittal planes, a fluid-sensitive fat-suppressed sequence, and a T1-weighted sequence for the marrow and the cuff muscles. This checklist is the site's own, not from a cited paper.</p>,
    fields: [fields.protocol, fields.protocolMissing, fields.effusion, fields.marrow, fields.marrowSite],
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    learn: 'bones',
    teach: (
      <>
        <p>The Hill-Sachs lesion is an impaction defect of the posterolateral humeral head from anterior dislocation ({HILL_SACHS}). It lies on the most superior axial images, at or above the coracoid; the normal groove lies lower ({RICHARDS}).</p>
        <p>Neer: a segment is a part only when displaced more than 1 cm or angulated more than 45°; no displaced segment is one-part, however many fracture lines ({NEER}).</p>
      </>
    ),
    fields: [fields.hillSachs, fields.fracture, fields.fractureSite, fields.neerAnatomical, fields.neerSurgical, fields.neerGreater, fields.neerLesser, fields.neerDislocation, fields.neerArticular],
    derive: deriveBones,
  },
  {
    id: 'cuff',
    title: 'Step 3. Supraspinatus and infraspinatus',
    learn: 'cuff',
    teach: (
      <>
        <p>Ellman (arthroscopic): articular (A), bursal (B) or interstitial (C); grade 1 less than 3 mm deep, grade 2 3 to 6 mm, grade 3 more than 6 mm ({ELLMAN}). Patte retraction: stage 1 near the insertion, 2 at the humeral head, 3 at the glenoid ({PATTE}).</p>
        <p>Goutallier grades of fatty infiltration ({GOUTALLIER}), applied to MRI by Fuchs and colleagues, who found the MRI and CT grades correlated only fairly to moderately ({FUCHS}):</p>
        {goutallierTable}
      </>
    ),
    fields: [...fields.supraspinatus, fields.supraspinatusRetraction, fields.supraspinatusFat, ...fields.infraspinatus, fields.infraspinatusFat],
    derive: deriveCuff,
  },
  {
    id: 'subscapularis',
    title: 'Step 4. Subscapularis and teres minor',
    learn: 'subscapularis',
    teach: <p>Follow the subscapularis to the lesser tuberosity and grade its muscle with Goutallier ({GOUTALLIER}). A subscapularis tear goes with a medially displaced biceps tendon ({WALCH}).</p>,
    fields: [...fields.subscapularis, fields.subscapularisFat, fields.teresMinor],
    derive: deriveSubscapularis,
  },
  {
    id: 'biceps',
    title: 'Step 5. Long head of biceps',
    learn: 'biceps',
    teach: <p>Follow the tendon from the anchor into the groove. Dislocation out of the groove goes with subscapularis tears ({WALCH}).</p>,
    fields: [fields.biceps, fields.bicepsPosition],
  },
  {
    id: 'labrum',
    title: 'Step 6. Labrum',
    learn: 'labrum',
    teach: (
      <>
        <p>Anteroinferior: Bankart, bony Bankart and Perthes ({WOERTLER}); ALPSA, displaced medially down the scapular neck with an intact periosteal sleeve ({NEVIASER_ALPSA}); GLAD, a superficial tear with adjacent cartilage injury ({NEVIASER_GLAD}).</p>
        <p>Snyder's SLAP types ({SNYDER}):</p>
        {snyderTable}
      </>
    ),
    fields: [fields.labrumAnterior, fields.labrumSuperior, fields.labrumPosterior],
    derive: deriveLabrum,
  },
  {
    id: 'capsule',
    title: 'Step 7. Capsule and glenohumeral ligaments',
    learn: 'capsule',
    teach: <p>Check the humeral attachment of the inferior glenohumeral ligament for a HAGL lesion, a cause of anterior instability ({WOLF}).</p>,
    fields: [fields.ighl, fields.ighlText],
  },
  {
    id: 'subacromial',
    title: 'Step 8. Acromioclavicular joint and subacromial space',
    learn: 'subacromial',
    fields: [fields.acJoint, fields.bursa],
  },
  {
    id: 'cartilage',
    title: 'Step 9. Cartilage',
    learn: 'cartilage',
    teach: <p>A cartilage injury next to an anteroinferior labral tear raises a GLAD lesion ({NEVIASER_GLAD}).</p>,
    fields: [fields.cartilage, fields.cartilageText],
  },
  {
    id: 'nerves',
    title: 'Step 10. Nerves, cysts and denervation',
    learn: 'nerves',
    teach: (
      <>
        <p>Paralabral cysts go with labral tears ({TIRMAN}). At the suprascapular notch a mass can affect the supraspinatus and infraspinatus; at the spinoglenoid notch the infraspinatus alone ({FRITZ}).</p>
        <p>Teres minor atrophy points to quadrilateral space syndrome ({LINKER}).</p>
      </>
    ),
    fields: [fields.cyst, fields.cystSite, fields.denervation, fields.denervationMuscles, fields.denervationPhase],
    derive: deriveNerves,
  },
  {
    id: 'repair',
    title: 'Step 11. Repaired rotator cuff',
    learn: 'repair',
    teach: (
      <>
        <p>Sugaya types of the repaired cuff; IV and V are re-tears ({SUGAYA}):</p>
        {sugayaTable}
      </>
    ),
    fields: [fields.priorRepair, fields.repairIntegrity],
    derive: deriveRepair,
  },
  {
    id: 'variants',
    title: 'Step 12. Normal variants',
    learn: 'variants',
    teach: <p>Sublabral foramen ({TUITE}), Buford complex ({WILLIAMS}), sublabral recess ({SMITH}) and os acromiale ({PARK}). Each gets its own impression line.</p>,
    fields: [fields.variants],
  },
  {
    id: 'impression',
    title: 'Step 13. Other findings and the impression',
    learn: 'impression',
    teach: <p>A Hill-Sachs lesion sends you to the anteroinferior labrum and the inferior glenohumeral ligament; a displaced biceps to the subscapularis; a paralabral cyst to the labrum and the cuff muscles.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'shoulder-mri',
  name: 'Shoulder MRI',
  lede: 'Read a shoulder MRI with no history beyond pain: a fixed search pattern through the bones, rotator cuff, biceps, labrum, ligaments, nerves and a repaired cuff, and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, but most of the papers are paywalled, so the claims not stated in an abstract or open full text (among them the Neer segments and displacement thresholds, the Ellman depth grades, the Patte stages, the Goutallier and Snyder type wording, the Hill-Sachs level and the sublabral foramen position) have still not been checked against their papers. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'neer-displaced',
      question: 'By Neer\'s criterion, when does a segment of the proximal humerus count as a separate part?',
      options: ['Whenever a fracture line separates it', 'When it is displaced at least 5 mm', 'When it is displaced more than 1 cm or angulated more than 45°', 'When it is angulated more than 30°'],
      answer: 2,
      explanation: <p>A segment counts as a part only when it is displaced more than 1 cm or angulated more than 45°; with no displaced segment the fracture is one-part, whatever the number of fracture lines ({NEER}).</p>,
    },
    {
      id: 'neer-three-part',
      question: 'The surgical neck and the greater tuberosity are both displaced; the lesser tuberosity is not. What is the Neer type?',
      options: ['Two-part', 'Three-part', 'Four-part', 'One-part'],
      answer: 1,
      explanation: <p>A three-part fracture displaces the surgical neck and one tuberosity; the articular segment stays with the other tuberosity ({NEER}).</p>,
    },
    {
      id: 'hill-sachs-level',
      question: 'Flattening of the posterolateral humeral head is seen on axial images well below the coracoid. What is it most likely to be?',
      options: ['A Hill-Sachs lesion', 'A reverse Hill-Sachs lesion', 'A greater tuberosity fracture', 'The normal groove'],
      answer: 3,
      explanation: <p>The Hill-Sachs defect lies on the most superior axial images, at or above the level of the coracoid; the normal groove of the posterolateral head lies lower ({RICHARDS}).</p>,
    },
    {
      id: 'ellman-grade',
      question: 'An articular-side partial tear of the supraspinatus measures 4 mm deep. What is its Ellman grade?',
      options: ['A1', 'A2', 'B2', 'A3'],
      answer: 1,
      explanation: <p>Ellman's side letters are articular (A), bursal (B) and interstitial (C); grade 1 is less than 3 mm deep, grade 2 3 to 6 mm and grade 3 more than 6 mm. These are arthroscopic grades ({ELLMAN}).</p>,
    },
    {
      id: 'patte',
      question: 'The retracted supraspinatus stump lies at the level of the glenoid on the oblique coronal images. What Patte stage is that?',
      options: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'],
      answer: 2,
      explanation: <p>Patte stage 1 is a stump near the bony insertion, stage 2 at the level of the humeral head, and stage 3 at the level of the glenoid ({PATTE}).</p>,
    },
    {
      id: 'goutallier',
      question: 'The infraspinatus muscle shows as much fat as muscle. Which Goutallier grade is that?',
      options: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'],
      answer: 2,
      explanation: <p>Goutallier grade 2 has more muscle than fat, grade 3 as much fat as muscle, and grade 4 more fat than muscle ({GOUTALLIER}).</p>,
    },
    {
      id: 'slap-ii',
      question: 'The superior labrum and the biceps anchor are detached from the glenoid. What SLAP type is that, and what variant should you rule out first?',
      options: ['Type I; a Buford complex', 'Type II; a sublabral recess', 'Type III; a sublabral foramen', 'Type IV; an os acromiale'],
      answer: 1,
      explanation: <p>In Snyder's type II the superior labrum and biceps anchor are detached from the glenoid ({SNYDER}). A sublabral recess can be mistaken for a type II SLAP lesion and vice versa ({WOERTLER}).</p>,
    },
    {
      id: 'alpsa',
      question: 'The anteroinferior labroligamentous complex is displaced medially and inferiorly down the scapular neck, with an intact periosteal sleeve. Which lesion is it?',
      options: ['Perthes', 'GLAD', 'HAGL', 'ALPSA'],
      answer: 3,
      explanation: <p>In the ALPSA lesion the labroligamentous complex is avulsed with an intact periosteal sleeve and displaced medially and inferiorly down the scapular neck ({NEVIASER_ALPSA}).</p>,
    },
    {
      id: 'spinoglenoid',
      question: 'A paralabral cyst sits in the spinoglenoid notch. Which muscle is it expected to denervate?',
      options: ['Supraspinatus and infraspinatus', 'Infraspinatus alone', 'Teres minor', 'Deltoid'],
      answer: 1,
      explanation: <p>At the suprascapular notch a mass can affect both the supraspinatus and the infraspinatus; at the spinoglenoid notch, below the branch to the supraspinatus, the infraspinatus alone ({FRITZ}). A paralabral cyst should also send you back to the labrum ({TIRMAN}).</p>,
    },
    {
      id: 'sugaya',
      question: 'A repaired supraspinatus has insufficient thickness but no discontinuity. What Sugaya type is it, and is it a re-tear?',
      options: ['Type II; no re-tear', 'Type III; no re-tear', 'Type IV; re-tear', 'Type V; re-tear'],
      answer: 1,
      explanation: <p>Sugaya type III is insufficient thickness without discontinuity. Only types IV (minor discontinuity) and V (major discontinuity) are re-tears ({SUGAYA}).</p>,
    },
    {
      id: 'buford',
      question: 'The anterosuperior labrum is absent and the middle glenohumeral ligament is thick and cord-like. How should it be reported?',
      options: ['As an anterosuperior labral tear', 'As a Buford complex, a normal variant, on its own impression line', 'As a SLAP type IV tear', 'Not at all'],
      answer: 1,
      explanation: <p>Williams and colleagues described the Buford complex, an absent anterosuperior labrum with a cord-like middle glenohumeral ligament, as a normal variant ({WILLIAMS}). On this site each variant gets its own impression line.</p>,
    },
  ],
}

export function ShoulderMriStudyPage() {
  return <StudyPage study={study} />
}
