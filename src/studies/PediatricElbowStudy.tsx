import { Cite } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { pediatricElbowScans } from '../data/scans/pediatricElbow'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23), but
 * the papers are paywalled, so only claims whose wording is in an abstract are verified; the
 * Iyer review's abstract states none of its claims, and Gartland, O'Brien and Judet have no
 * abstract. The claims table, with each claim's status, is
 * docs/superpowers/research/2026-10-23-pediatric-elbow-sources.md; rule chips and warnings carry
 * its claim IDs. Gartland (1959) and Judet (1962) have no DOI, so their citations stay plain text.
 */

const IYER_DOI = '10.2214/AJR.10.7314'
const CHENG_DOI = '10.1097/01241398-199803000-00006'
const SKAGGS_DOI = '10.2106/00004623-199910000-00007'
const ROGERS_DOI = '10.1148/128.1.145'
const HERMAN_DOI = '10.2106/JBJS.H.01316'
const LEITCH_DOI = '10.2106/JBJS.D.02956'
const ALTON_GARTLAND_DOI = '10.1007/s11999-014-4033-8'
const WEISS_DOI = '10.1097/BPO.0b013e3181b2842c'
const JAKOB_DOI = '10.1302/0301-620X.57B4.430'
const EDMONDS_DOI = '10.2106/JBJS.I.01637'
const OBRIEN_DOI = '10.1097/00003086-196500410-00006'

const IYER = <Cite doi={IYER_DOI}>Iyer et al., AJR 2012</Cite>
const CHENG = <Cite doi={CHENG_DOI}>Cheng et al., J Pediatr Orthop 1998</Cite>
const SKAGGS = <Cite doi={SKAGGS_DOI}>Skaggs and Mirzayan, J Bone Joint Surg Am 1999</Cite>
const ROGERS = <Cite doi={ROGERS_DOI}>Rogers et al., Radiology 1978</Cite>
const HERMAN = <Cite doi={HERMAN_DOI}>Herman et al., J Bone Joint Surg Am 2009</Cite>
const GARTLAND = 'Gartland, Surg Gynecol Obstet 1959'
const LEITCH = <Cite doi={LEITCH_DOI}>Leitch et al., J Bone Joint Surg Am 2006</Cite>
const ALTON_GARTLAND = <Cite doi={ALTON_GARTLAND_DOI}>Alton et al., Clin Orthop Relat Res 2015</Cite>
const WEISS = <Cite doi={WEISS_DOI}>Weiss et al., J Pediatr Orthop 2009</Cite>
const JAKOB = <Cite doi={JAKOB_DOI}>Jakob et al., J Bone Joint Surg Br 1975</Cite>
const EDMONDS = <Cite doi={EDMONDS_DOI}>Edmonds, J Bone Joint Surg Am 2010</Cite>
const OBRIEN = <Cite doi={OBRIEN_DOI}>O'Brien, Clin Orthop Relat Res 1965</Cite>
const JUDET = 'Judet et al., Ann Chir 1962'

const references: LessonReference[] = [
  { citation: 'Iyer RS, Thapa MM, Khanna PC, Chew FS. Pediatric bone imaging: imaging elbow trauma in children—a review of acute and chronic injuries. AJR Am J Roentgenol. 2012;198(5):1053-1068.', doi: IYER_DOI },
  { citation: 'Cheng JC, Wing-Man K, Shen WY, Yurianto H, Xia G, Lau JT, Cheung AY. A new look at the sequential development of elbow-ossification centers in children. J Pediatr Orthop. 1998;18(2):161-167.', doi: CHENG_DOI },
  { citation: 'Skaggs DL, Mirzayan R. The posterior fat pad sign in association with occult fracture of the elbow in children. J Bone Joint Surg Am. 1999;81(10):1429-1433.', doi: SKAGGS_DOI },
  { citation: 'Rogers LF, Malave S Jr, White H, Tachdjian MO. Plastic bowing, torus and greenstick supracondylar fractures of the humerus: radiographic clues to obscure fractures of the elbow in children. Radiology. 1978;128(1):145-150.', doi: ROGERS_DOI },
  { citation: 'Herman MJ, Boardman MJ, Hoover JR, Chafetz RS. Relationship of the anterior humeral line to the capitellar ossific nucleus: variability with age. J Bone Joint Surg Am. 2009;91(9):2188-2193.', doi: HERMAN_DOI },
  { citation: 'Gartland JJ. Management of supracondylar fractures of the humerus in children. Surg Gynecol Obstet. 1959;109(2):145-154.' },
  { citation: 'Leitch KK, Kay RM, Femino JD, Tolo VT, Storer SK, Skaggs DL. Treatment of multidirectionally unstable supracondylar humeral fractures in children. A modified Gartland type-IV fracture. J Bone Joint Surg Am. 2006;88(5):980-985.', doi: LEITCH_DOI },
  { citation: 'Alton TB, Werner SE, Gee AO. Classifications in brief: the Gartland classification of supracondylar humerus fractures. Clin Orthop Relat Res. 2015;473(2):738-741.', doi: ALTON_GARTLAND_DOI },
  { citation: 'Weiss JM, Graves S, Yang S, Mendelsohn E, Kay RM, Skaggs DL. A new classification system predictive of complications in surgically treated pediatric humeral lateral condyle fractures. J Pediatr Orthop. 2009;29(6):602-605.', doi: WEISS_DOI },
  { citation: 'Jakob R, Fowles JV, Rang M, Kassab MT. Observations concerning fractures of the lateral humeral condyle in children. J Bone Joint Surg Br. 1975;57(4):430-436.', doi: JAKOB_DOI },
  { citation: 'Edmonds EW. How displaced are "nondisplaced" fractures of the medial humeral epicondyle in children? Results of a three-dimensional computed tomography analysis. J Bone Joint Surg Am. 2010;92(17):2785-2791.', doi: EDMONDS_DOI },
  { citation: "O'Brien PI. Injuries involving the proximal radial epiphysis. Clin Orthop Relat Res. 1965;41:51-58.", doi: OBRIEN_DOI },
  { citation: 'Judet J, Judet R, Lefranc J. [Fracture of the radial head in the child]. Ann Chir. 1962;16:1377-1385. French.' },
]

/*
 * PE2-1: Cheng's order, and the ages by which 50% of girls showed each centre (Cheng et al.,
 * abstract: "the capitulum first, followed by the radial head, medial epicondyle, olecranon,
 * trochlea, and last, the lateral epicondyle", in girls at "ages 1, 5, 5, 9, 9, and 10 years";
 * in boys, "with the exception of the capitulum, an average delay of 2 years").
 */
type Centre = { id: string; name: string; girls: number; boys: number }
const centres: Centre[] = [
  { id: 'oc-capitellum', name: 'Capitellum', girls: 1, boys: 1 },
  { id: 'oc-radial-head', name: 'Radial head', girls: 5, boys: 7 },
  { id: 'oc-medial-epicondyle', name: 'Medial (internal) epicondyle', girls: 5, boys: 7 },
  { id: 'oc-olecranon', name: 'Olecranon', girls: 9, boys: 11 },
  { id: 'oc-trochlea', name: 'Trochlea', girls: 9, boys: 11 },
  { id: 'oc-lateral-epicondyle', name: 'Lateral (external) epicondyle', girls: 10, boys: 12 },
]

const years = (age: number) => `${age} ${age === 1 ? 'year' : 'years'}`

const centreTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Centre</th>
          <th>Half of girls by</th>
          <th>Half of boys by about</th>
        </tr>
      </thead>
      <tbody>
        {centres.map((centre, index) => (
          <tr key={centre.id}>
            <td className="vessel-name">{index + 1}</td>
            <td>{centre.name}</td>
            <td>{years(centre.girls)}</td>
            <td>{years(centre.boys)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

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
        <tr><td className="vessel-name">Supracondylar</td><td>Modified Gartland I undisplaced; II displaced, posterior cortex intact (hinged); III completely displaced, no cortical contact</td></tr>
        <tr><td className="vessel-name">Lateral condyle</td><td>Weiss I under 2 mm; II 2 mm or more, articular surface intact; III 2 mm or more, articular surface disrupted</td></tr>
        <tr><td className="vessel-name">Medial epicondyle</td><td>Displacement (descriptive) and whether the fragment is entrapped in the joint</td></tr>
        <tr><td className="vessel-name">Radial neck</td><td>O'Brien I under 30°; II 30° to 60°; III over 60° of angulation</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the child\'s age',
    body: (
      <>
        <p>This lesson is for the injured child's elbow on radiographs. It starts with the age, because what is normal on a child's elbow film depends on which ossification centres have appeared. The order of the search, and the view checklist, are this site's own.</p>
        <p>Check for an AP view and a true lateral with the elbow flexed to 90°. The fat pads and both alignment lines are read on the true lateral, so a rotated lateral limits the study.</p>
      </>
    ),
  },
  {
    id: 'ossification',
    title: 'Step 2. Ossification centres',
    body: (
      <>
        <p>The six secondary ossification centres of the elbow appear in a fixed order. In Cheng and colleagues' radiographs of 1,577 children, the order was the same in boys and girls: capitellum, radial head, medial epicondyle, olecranon, trochlea, and last the lateral epicondyle. Half of the girls showed them by ages 1, 5, 5, 9, 9 and 10 years; in boys every centre but the capitellum came on average 2 years later ({CHENG}). The CRITOE mnemonic puts the trochlea before the olecranon; in Cheng's series the olecranon came first.</p>
        {centreTable}
        <p>Those are the ages by which half of the children showed each centre, so many normal children show a centre later. A centre not yet seen at that age is a prompt to look again, not a diagnosis. This site uses the girls' ages when the child is a girl and the boys' ages otherwise.</p>
        <div className="lesson-key">
          <p>The order matters more than the ages. The medial epicondyle ossifies before the trochlea ({CHENG}), so an ossified trochlea with no medial epicondyle in its place should make you think of an avulsed medial epicondyle displaced into the joint, where it can look like the trochlear centre ({IYER}).</p>
        </div>
        <ScanFigures images={[pediatricElbowScans.ossificationCentres]} />
      </>
    ),
  },
  {
    id: 'fat-pads',
    title: 'Step 3. Fat pads',
    body: (
      <>
        <p>On a true lateral, an elevated anterior fat pad (the "sail" sign) and a visible posterior fat pad mean a joint effusion ({IYER}). The posterior fat pad is normally hidden in the olecranon fossa.</p>
        <p>In children with a visible posterior fat pad after trauma and no fracture on the first films, follow-up radiographs showed a fracture in most, 76% in Skaggs and Mirzayan's series ({SKAGGS}). So a visible posterior fat pad with no fracture seen means an occult fracture is likely.</p>
        <ScanFigures images={[pediatricElbowScans.fatPads]} />
      </>
    ),
  },
  {
    id: 'lines',
    title: 'Step 4. Alignment lines',
    body: (
      <>
        <h4>Anterior humeral line</h4>
        <p>On a true lateral, draw a line along the anterior cortex of the humerus. It is a valuable aid in the search for a supracondylar fracture, and when it is abnormal, other signs of fracture should be carefully sought ({ROGERS}). In most normal children it passes through the middle third of the capitellum ({HERMAN}).</p>
        <p>In young children the line may pass through the anterior third of the capitellum because the ossification centre is small: Rogers and colleagues put this under 2½ years ({ROGERS}), and Herman and colleagues found that under 4 years it passed nearly equally through the anterior or the middle third ({HERMAN}). Read the line with the age.</p>
        <h4>Radiocapitellar line</h4>
        <p>A line along the radial neck passes through the capitellum in every view. If it does not, the radial head is dislocated, and the ulna must be checked for a fracture: a Monteggia injury ({IYER}).</p>
        <ScanFigures images={[pediatricElbowScans.anteriorHumeralLine, pediatricElbowScans.monteggia]} />
      </>
    ),
  },
  {
    id: 'supracondylar',
    title: 'Step 5. Supracondylar fracture',
    body: (
      <>
        <p>The supracondylar fracture is the commonest elbow fracture in children ({IYER}). Gartland graded extension fractures as undisplaced, moderately displaced and severely displaced ({GARTLAND}); the types in use today are Wilkins's modification, which adds posterior cortical contact ({ALTON_GARTLAND}):</p>
        <ul className="plain-list">
          <li><strong>Type I:</strong> undisplaced.</li>
          <li><strong>Type II:</strong> displaced, with the posterior cortex intact (a hinge); the anterior humeral line passes in front of the capitellum. Wilkins split it into IIA, without rotation or translation of the fragment, and IIB, with them.</li>
          <li><strong>Type III:</strong> completely displaced, with no cortical contact.</li>
        </ul>
        <p>A "type IV" fracture is unstable in both flexion and extension because the periosteal hinge is lost in front and behind; it is recognised under anaesthesia rather than on the first radiographs ({LEITCH}), so this report does not offer it.</p>
        <ScanFigures images={[pediatricElbowScans.supracondylarType1, pediatricElbowScans.supracondylarType2, pediatricElbowScans.supracondylarType3]} />
      </>
    ),
  },
  {
    id: 'lateral-condyle',
    title: 'Step 6. Lateral condyle fracture',
    body: (
      <>
        <p>Measure the largest displacement of the fragment. Weiss and colleagues' types ({WEISS}):</p>
        <ul className="plain-list">
          <li><strong>Type I:</strong> displacement under 2 mm.</li>
          <li><strong>Type II:</strong> 2 mm or more, with the articular surface intact.</li>
          <li><strong>Type III:</strong> 2 mm or more, with the articular surface disrupted.</li>
        </ul>
        <p>Whether the articular cartilage is intact often cannot be judged on radiographs alone; arthrography or MRI shows it ({WEISS}). When it is not judged, a fracture displaced 2 mm or more is type II or III.</p>
        <p>The older Jakob stages describe the same spectrum: stage I undisplaced with the articular surface intact, stage II complete with moderate displacement, stage III completely displaced and rotated ({JAKOB}).</p>
        <ScanFigures images={[pediatricElbowScans.lateralCondyle]} />
      </>
    ),
  },
  {
    id: 'medial-epicondyle',
    title: 'Step 7. Medial epicondyle avulsion',
    body: (
      <>
        <p>An avulsed medial epicondyle can become entrapped in the joint, notably with an elbow dislocation, and an entrapped fragment must be named ({IYER}). Remember step 2: an ossified trochlea with no medial epicondyle in place may be that fragment.</p>
        <p>Measure the displacement, but know that standard radiographs are not sufficient to measure anterior displacement nor accurate enough to measure medial displacement. Against three-dimensional CT, the lateral view underestimated anterior displacement (a mean of 0.9 mm against 8.8 mm) and the AP view overestimated medial displacement (3.5 mm against 0.3 mm); an internal oblique view came closer to the true anterior displacement ({EDMONDS}). This report records the number without a threshold.</p>
        <ScanFigures images={[pediatricElbowScans.medialEpicondyleEntrapped]} />
      </>
    ),
  },
  {
    id: 'radial-neck',
    title: 'Step 8. Radial head and neck',
    body: (
      <>
        <p>In children the radial neck breaks rather than the head. O'Brien's types, by the angulation of the radial head ({OBRIEN}):</p>
        <ul className="plain-list">
          <li><strong>Type I:</strong> under 30°.</li>
          <li><strong>Type II:</strong> 30° to 60°.</li>
          <li><strong>Type III:</strong> over 60°.</li>
        </ul>
        <p>Judet's classification grades the same fracture by displacement and angulation, in types I to IV ({JUDET}).</p>
        <ScanFigures images={[pediatricElbowScans.radialNeck]} />
      </>
    ),
  },
  {
    id: 'other',
    title: 'Step 9. Dislocation, olecranon and variants',
    body: (
      <>
        <p>Record an elbow dislocation and its direction, and an olecranon fracture. After a dislocation, look again for the medial epicondyle (step 7).</p>
        <p>Record a supracondylar process when you see one; this site's report gives each variant its own impression line, so the referrer knows it was seen and judged.</p>
        <ScanFigures images={[pediatricElbowScans.dislocation]} />
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 10. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the fat pads against the fractures, the anterior humeral line against the supracondylar region, the radiocapitellar line against the ulna, and the ossification centres against the age and the medial epicondyle.</p>
        <p>List the abnormal findings in search-pattern order, then the variants, each on its own line.</p>
      </>
    ),
  },
]

/* The report. */

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
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

const seenOptions: Option[] = [
  { value: 'seen', label: 'Seen' },
  { value: 'not-seen', label: 'Not seen' },
]
const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const present = (id: string) => (v: Values) => str(v, id) === 'present'

const centreFields: Field[] = centres.map((centre) => ({
  id: centre.id,
  kind: 'choice',
  label: centre.name,
  required: true,
  options: seenOptions,
  help: `Half of girls show it by ${years(centre.girls)}, half of boys by about ${years(centre.boys)}.`,
}))

const fields = {
  views: { id: 'views', kind: 'choice', label: 'Views', required: true, help: 'An AP and a true lateral at 90° of flexion.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  viewsMissing: { id: 'views-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'views') === 'incomplete', options: [
    { value: 'ap', label: 'An AP view' },
    { value: 'lateral', label: 'A true lateral at 90°' },
  ] },
  age: { id: 'age', kind: 'number', label: 'Age', unit: 'years', min: 0, max: 18, step: 0.5, required: true, help: 'Sets which ossification centres are expected.' },
  sex: { id: 'sex', kind: 'choice', label: 'Sex', help: "Girls ossify earlier; without an answer the boys' (later) ages are used.", options: [
    { value: 'girl', label: 'Girl' },
    { value: 'boy', label: 'Boy' },
  ] },

  anteriorFatPad: { id: 'anterior-fat-pad', kind: 'choice', label: 'Anterior fat pad', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'elevated', label: 'Elevated (sail sign)' },
  ] },
  posteriorFatPad: { id: 'posterior-fat-pad', kind: 'choice', label: 'Posterior fat pad', required: true, help: 'Normally hidden in the olecranon fossa.', options: [
    { value: 'not-seen', label: 'Not seen' },
    { value: 'visible', label: 'Visible' },
  ] },

  ahl: { id: 'ahl', kind: 'choice', label: 'Anterior humeral line', required: true, help: 'Through the middle third of the capitellum in most normal children.', options: [
    { value: 'middle', label: 'Through the middle third' },
    { value: 'anterior-third', label: 'Through the anterior third' },
    { value: 'anterior', label: 'In front of the capitellum' },
    { value: 'posterior', label: 'Through the posterior third or behind' },
  ] },
  rcl: { id: 'rcl', kind: 'choice', label: 'Radiocapitellar line', required: true, help: 'Passes through the capitellum in every view.', options: [
    { value: 'aligned', label: 'Through the capitellum' },
    { value: 'disrupted', label: 'Misses the capitellum' },
  ] },

  supracondylar: { id: 'supracondylar', kind: 'choice', label: 'Supracondylar fracture', required: true, options: nonePresent },
  gartland: { id: 'gartland', kind: 'choice', label: 'Displacement', showIf: present('supracondylar'), help: 'Modified Gartland (Wilkins) types.', options: [
    { value: 'i', label: 'Undisplaced' },
    { value: 'ii', label: 'Displaced, posterior cortex intact (hinged)' },
    { value: 'iii', label: 'Completely displaced, no cortical contact' },
  ] },

  lateralCondyle: { id: 'lateral-condyle', kind: 'choice', label: 'Lateral condyle fracture', required: true, options: nonePresent },
  lcDisplacement: { id: 'lc-displacement', kind: 'number', label: 'Largest displacement', unit: 'mm', min: 0, step: 0.5, showIf: present('lateral-condyle'), help: 'Under 2 mm: Weiss type I.' },
  lcArticular: { id: 'lc-articular', kind: 'choice', label: 'Articular surface', showIf: present('lateral-condyle'), help: 'Often not judged on radiographs alone.', options: [
    { value: 'intact', label: 'Intact' },
    { value: 'disrupted', label: 'Disrupted' },
    { value: 'not-judged', label: 'Not judged' },
  ] },

  meFracture: { id: 'me-fracture', kind: 'choice', label: 'Medial epicondyle avulsion', required: true, options: nonePresent },
  meDisplacement: { id: 'me-displacement', kind: 'number', label: 'Displacement', unit: 'mm', min: 0, step: 0.5, showIf: present('me-fracture'), help: 'Radiographs underestimate anterior and overestimate medial displacement; no threshold is applied.' },
  meEntrapped: { id: 'me-entrapped', kind: 'choice', label: 'Fragment in the joint', showIf: present('me-fracture'), options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes, entrapped' },
  ] },

  radialNeck: { id: 'radial-neck', kind: 'choice', label: 'Radial head or neck fracture', required: true, options: nonePresent },
  rnAngulation: { id: 'rn-angulation', kind: 'number', label: 'Angulation of the radial head', unit: '°', min: 0, max: 90, step: 1, showIf: present('radial-neck'), help: "O'Brien: under 30°, 30–60°, over 60°." },

  dislocation: { id: 'dislocation', kind: 'choice', label: 'Elbow dislocation', required: true, options: nonePresent },
  dislocationDirection: { id: 'dislocation-direction', kind: 'choice', label: 'Direction', showIf: present('dislocation'), options: [
    { value: 'posterior', label: 'Posterior or posterolateral' },
    { value: 'other', label: 'Other' },
  ] },
  olecranon: { id: 'olecranon', kind: 'choice', label: 'Olecranon fracture', required: true, options: nonePresent },
  variants: { id: 'variants', kind: 'multi', label: 'Variants', help: 'Each gets its own impression line.', options: [
    { value: 'supracondylar-process', label: 'Supracondylar process' },
  ] },

  otherFractures: { id: 'other-fractures', kind: 'text', label: 'Other fractures', placeholder: 'e.g. proximal ulna, plastic bowing' },
  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-effusion', label: 'No joint effusion' },
    { value: 'no-malalignment', label: 'No malalignment' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

/** PE2-1: the age by which half of children of this sex show the centre (boys' when not stated). */
function centreAge(values: Values, centre: Centre): number {
  return str(values, 'sex') === 'girl' ? centre.girls : centre.boys
}

/** PE2-1: the centres half of children show by this age, or [] without an age. */
function expectedCentres(values: Values): Centre[] {
  const age = num(values, 'age')
  return age === undefined ? [] : centres.filter((centre) => age >= centreAge(values, centre))
}

/** Expected by the age but marked not seen. */
function missingCentres(values: Values): Centre[] {
  return expectedCentres(values).filter((centre) => str(values, centre.id) === 'not-seen')
}

/** PE2-3: an ossified trochlea with no medial epicondyle. */
function trochleaWithoutMedialEpicondyle(values: Values): boolean {
  return str(values, 'oc-trochlea') === 'seen' && str(values, 'oc-medial-epicondyle') === 'not-seen'
}

const gartlandType: Record<string, string> = { i: 'I', ii: 'II', iii: 'III' }

/** PE6-1, PE6-2: the Weiss type, or '' while the displacement is not entered. */
function weissType(values: Values): string {
  if (str(values, 'lateral-condyle') !== 'present') return ''
  const displacement = num(values, 'lc-displacement')
  if (displacement === undefined) return ''
  if (displacement < 2) return 'I'
  const articular = str(values, 'lc-articular')
  if (articular === 'intact') return 'II'
  if (articular === 'disrupted') return 'III'
  return 'II or III'
}

/** PE8-1: the O'Brien type, or '' while the angulation is not entered. */
function obrienType(values: Values): string {
  if (str(values, 'radial-neck') !== 'present') return ''
  const angulation = num(values, 'rn-angulation')
  if (angulation === undefined) return ''
  if (angulation < 30) return 'I'
  return angulation <= 60 ? 'II' : 'III'
}

/** PE4-1, PE4-2: 'normal', 'young' (anterior third under 4), 'abnormal', or ''. */
function ahlReading(values: Values): 'normal' | 'young' | 'abnormal' | '' {
  const line = str(values, 'ahl')
  if (!line) return ''
  if (line === 'middle') return 'normal'
  const age = num(values, 'age')
  if (line === 'anterior-third' && age !== undefined && age < 4) return 'young'
  return 'abnormal'
}

/** How an abnormal anterior humeral line reads in the impression. */
const ahlPhrases: Record<string, string> = {
  'anterior-third': 'through the anterior third of the capitellum',
  anterior: 'in front of the capitellum',
  posterior: 'through the posterior third of the capitellum or behind it',
}

const entrapped = (values: Values) => str(values, 'me-fracture') === 'present' && str(values, 'me-entrapped') === 'yes'

/** The fractures entered, for the fat pad rule and the negatives. */
function fracturesEntered(values: Values): string[] {
  return [
    str(values, 'supracondylar') === 'present' && 'supracondylar fracture',
    str(values, 'lateral-condyle') === 'present' && 'lateral condyle fracture',
    str(values, 'me-fracture') === 'present' && 'medial epicondyle avulsion',
    str(values, 'radial-neck') === 'present' && 'radial head or neck fracture',
    str(values, 'olecranon') === 'present' && 'olecranon fracture',
    str(values, 'other-fractures') !== '' && str(values, 'other-fractures'),
  ].filter((item): item is string => Boolean(item))
}

/** True once every fracture question is answered "none" and no other fracture is typed. */
function noFractureEntered(values: Values): boolean {
  return ['supracondylar', 'lateral-condyle', 'me-fracture', 'radial-neck', 'olecranon'].every((id) => str(values, id) === 'none')
    && str(values, 'other-fractures') === ''
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveOssification(values: Values): Derived[] {
  const out: Derived[] = []
  const age = num(values, 'age')
  if (age === undefined) return out
  const expected = expectedCentres(values)
  // PE2-1: the centres half of children show by this age (Cheng et al.).
  out.push({ label: `Seen in half of children by age ${age}`, value: expected.length > 0 ? expected.map((centre) => centre.name).join(', ') : 'None yet' })
  const missing = missingCentres(values)
  if (missing.length > 0) out.push({ label: 'Not seen, though half of children show it by now', value: missing.map((centre) => centre.name).join(', '), tone: 'warn' })
  // PE2-3: trochlea before medial epicondyle.
  if (trochleaWithoutMedialEpicondyle(values)) out.push({ label: 'Order', value: 'Trochlea without medial epicondyle: look for an entrapped medial epicondyle', tone: 'warn' })
  return out
}

function deriveFatPads(values: Values): Derived[] {
  const out: Derived[] = []
  // PE3-1: either sign means a joint effusion.
  if (str(values, 'anterior-fat-pad') === 'elevated' || str(values, 'posterior-fat-pad') === 'visible') {
    out.push({ label: 'Fat pads', value: 'Joint effusion', tone: 'warn' })
  }
  return out
}

function deriveLines(values: Values): Derived[] {
  const out: Derived[] = []
  const reading = ahlReading(values)
  if (reading === 'normal') out.push({ label: 'Anterior humeral line', value: 'Normal', tone: 'good' })
  // PE4-2: anterior third is common without fracture under age 4.
  if (reading === 'young') out.push({ label: 'Anterior humeral line', value: 'Anterior third: can be normal under age 4' })
  // PE4-1: otherwise, look for a supracondylar fracture.
  if (reading === 'abnormal') out.push({ label: 'Anterior humeral line', value: 'Abnormal: look for a supracondylar fracture', tone: 'warn' })
  // PE4-3: a disrupted radiocapitellar line means a radial head dislocation.
  if (str(values, 'rcl') === 'disrupted') out.push({ label: 'Radiocapitellar line', value: 'Radial head dislocated: check the ulna (Monteggia)', tone: 'warn' })
  return out
}

function deriveSupracondylar(values: Values): Derived[] {
  const type = gartlandType[str(values, 'gartland')] as string | undefined
  // PE5-2: Gartland types.
  return str(values, 'supracondylar') === 'present' && type ? [{ label: 'Gartland', value: `Type ${type}`, tone: 'warn' }] : []
}

function deriveLateralCondyle(values: Values): Derived[] {
  const type = weissType(values)
  // PE6-1, PE6-2: Weiss types.
  return type ? [{ label: 'Weiss', value: `Type ${type}`, tone: 'warn' }] : []
}

function deriveMedialEpicondyle(values: Values): Derived[] {
  // PE7-1: an entrapped fragment.
  return entrapped(values) ? [{ label: 'Medial epicondyle', value: 'Entrapped in the joint', tone: 'warn' }] : []
}

function deriveRadialNeck(values: Values): Derived[] {
  const type = obrienType(values)
  // PE8-1: O'Brien types.
  return type ? [{ label: "O'Brien", value: `Type ${type}`, tone: 'warn' }] : []
}

/* Report lines. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const views = str(values, 'views')
  const missing = chosen(values, fields.viewsMissing)
  const age = num(values, 'age')
  return [
    views === 'complete' && 'Views: AP and true lateral',
    views === 'incomplete' && `Views: incomplete${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    age !== undefined && `Age: ${age} ${age === 1 ? 'year' : 'years'}`,
  ]
}

function ossificationLine(values: Values): string {
  const entered = centres.filter((centre) => str(values, centre.id) !== '')
  if (entered.length === 0) return ''
  const seen = entered.filter((centre) => str(values, centre.id) === 'seen').map((centre) => lowerFirst(centre.name))
  const notSeen = entered.filter((centre) => str(values, centre.id) === 'not-seen').map((centre) => lowerFirst(centre.name))
  return `Ossification centres: ${join([seen.length > 0 && `seen: ${seen.join(', ')}`, notSeen.length > 0 && `not seen: ${notSeen.join(', ')}`])}`
}

function fractureLines(values: Values): (string | false)[] {
  const gartland = gartlandType[str(values, 'gartland')] as string | undefined
  const lcDisplacement = num(values, 'lc-displacement')
  const weiss = weissType(values)
  const meDisplacement = num(values, 'me-displacement')
  const angulation = num(values, 'rn-angulation')
  const obrien = obrienType(values)
  const noneLine = (id: string, label: string) => str(values, id) === 'none' && `${label}: none`
  return [
    noneLine('supracondylar', 'Supracondylar fracture'),
    str(values, 'supracondylar') === 'present' && `Supracondylar fracture: ${gartland ? `${picked(values, fields.gartland)} (Gartland type ${gartland})` : 'present'}`,
    noneLine('lateral-condyle', 'Lateral condyle fracture'),
    str(values, 'lateral-condyle') === 'present' && `Lateral condyle fracture: ${join([
      lcDisplacement !== undefined && `displaced ${lcDisplacement} mm`,
      str(values, 'lc-articular') && `articular surface ${picked(values, fields.lcArticular)}`,
      weiss && `Weiss type ${weiss}`,
    ]) || 'present'}`,
    noneLine('me-fracture', 'Medial epicondyle avulsion'),
    str(values, 'me-fracture') === 'present' && `Medial epicondyle avulsion: ${join([
      meDisplacement !== undefined && `displaced ${meDisplacement} mm`,
      str(values, 'me-entrapped') === 'yes' && 'fragment entrapped in the joint',
      str(values, 'me-entrapped') === 'no' && 'not in the joint',
    ]) || 'present'}`,
    noneLine('radial-neck', 'Radial head or neck fracture'),
    str(values, 'radial-neck') === 'present' && `Radial neck fracture: ${join([
      angulation !== undefined && `angulation ${angulation}°`,
      obrien && `O'Brien type ${obrien}`,
    ]) || 'present'}`,
    noneLine('dislocation', 'Elbow dislocation'),
    str(values, 'dislocation') === 'present' && `Elbow dislocation: ${picked(values, fields.dislocationDirection) || 'present'}`,
    noneLine('olecranon', 'Olecranon fracture'),
    str(values, 'olecranon') === 'present' && 'Olecranon fracture: present',
    str(values, 'other-fractures') && `Other fractures: ${str(values, 'other-fractures')}`,
  ]
}

/* The impression. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  // PE2-3
  if (trochleaWithoutMedialEpicondyle(values)) out.push('Ossified trochlea without a medial epicondyle in place: consider an avulsed medial epicondyle displaced into the joint.')
  const effusion = str(values, 'anterior-fat-pad') === 'elevated' || str(values, 'posterior-fat-pad') === 'visible'
  const fatPadSigns = join([
    str(values, 'anterior-fat-pad') === 'elevated' && 'elevated anterior fat pad',
    str(values, 'posterior-fat-pad') === 'visible' && 'visible posterior fat pad',
  ], ', ')
  if (effusion) out.push(`Joint effusion (${fatPadSigns}).`)
  // PE3-2: a visible posterior fat pad with no fracture seen.
  if (str(values, 'posterior-fat-pad') === 'visible' && noFractureEntered(values)) {
    out.push('No fracture is seen, but with a visible posterior fat pad an occult fracture is likely.')
  }
  // PE4-1
  if (ahlReading(values) === 'abnormal') out.push(`Anterior humeral line ${ahlPhrases[str(values, 'ahl')] ?? 'abnormal'}: look for a supracondylar fracture.`)
  // PE4-3
  if (str(values, 'rcl') === 'disrupted') out.push('Radiocapitellar line misses the capitellum: radial head dislocation.')

  const gartland = gartlandType[str(values, 'gartland')] as string | undefined
  if (str(values, 'supracondylar') === 'present') out.push(gartland ? `Supracondylar fracture, Gartland type ${gartland}.` : 'Supracondylar fracture.')
  const weiss = weissType(values)
  if (str(values, 'lateral-condyle') === 'present') out.push(weiss ? `Lateral condyle fracture, Weiss type ${weiss}.` : 'Lateral condyle fracture.')
  if (str(values, 'me-fracture') === 'present') out.push(entrapped(values) ? 'Medial epicondyle avulsion with the fragment entrapped in the joint.' : 'Medial epicondyle avulsion.')
  const obrien = obrienType(values)
  if (str(values, 'radial-neck') === 'present') out.push(obrien ? `Radial neck fracture, O'Brien type ${obrien}.` : 'Radial neck fracture.')
  if (str(values, 'dislocation') === 'present') {
    const direction = str(values, 'dislocation-direction')
    out.push(direction === 'posterior' ? 'Posterior elbow dislocation.' : 'Elbow dislocation.')
  }
  if (str(values, 'olecranon') === 'present') out.push('Olecranon fracture.')
  const otherFractures = str(values, 'other-fractures')
  if (otherFractures) out.push(`${upperFirst(otherFractures.replace(/\.$/, ''))}.`)
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

function variantSentences(values: Values): string[] {
  return chosen(values, fields.variants).map((label) => `${upperFirst(label)} (anatomical variant).`)
}

const NORMAL_IMPRESSION = 'No fracture, joint effusion or malalignment; ossification centres as expected for age.'

function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

function complete(values: Values): boolean {
  return steps.every((step) => step.fields.every((field) => !field.required || (field.showIf && !field.showIf(values)) || str(values, field.id) !== ''))
}

function impression(values: Values): string {
  const found = findings(values)
  const variants = variantSentences(values)
  const limited = str(values, 'views') === 'incomplete' && 'Limited study (views incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // A warn chip (e.g. a centre missing for the age) or free text is not a finding the
    // impression can name, so never call such a study normal.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...variants)}`
    if (complete(values)) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...variants)}`
    return variants.length > 0 ? `Impression: ${lines(...variants)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...variants)}`
}

/* "Check before signing". */

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = fracturesEntered(values)
  const effusion = [
    str(values, 'anterior-fat-pad') === 'elevated' && 'elevated anterior fat pad',
    str(values, 'posterior-fat-pad') === 'visible' && 'visible posterior fat pad',
  ].filter((item): item is string => Boolean(item))
  const malalignment = [
    ahlReading(values) === 'abnormal' && 'abnormal anterior humeral line',
    str(values, 'rcl') === 'disrupted' && 'disrupted radiocapitellar line',
    str(values, 'dislocation') === 'present' && 'elbow dislocation',
  ].filter((item): item is string => Boolean(item))
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-effusion', 'no joint effusion', effusion],
    ['no-malalignment', 'no malalignment', malalignment],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // PE2-1: a centre that half of children show by this age is not seen (Cheng et al.).
  const age = num(values, 'age')
  const group = str(values, 'sex') === 'girl' ? 'girls' : 'boys'
  for (const centre of missingCentres(values)) {
    out.push(`${centre.name} is not seen, although half of ${group} show it by about age ${centreAge(values, centre)} (the child is ${age}); ages vary, so look again.`)
  }
  // PE2-3: trochlea before medial epicondyle.
  if (trochleaWithoutMedialEpicondyle(values)) {
    out.push('The trochlea is ossified but the medial epicondyle is not seen: the medial epicondyle ossifies first, so look for it displaced into the joint.')
  }
  // PE4-1: an abnormal anterior humeral line with no supracondylar fracture.
  if (ahlReading(values) === 'abnormal' && str(values, 'supracondylar') === 'none') {
    out.push('The anterior humeral line is abnormal, but no supracondylar fracture is entered.')
  }
  // PE4-3: a disrupted radiocapitellar line means a dislocated radial head.
  if (str(values, 'rcl') === 'disrupted' && str(values, 'dislocation') !== 'present') {
    out.push('The radiocapitellar line misses the capitellum, which means a radial head dislocation; check the ulna for a fracture (Monteggia).')
  }
  // PE7-1: after a dislocation, look for an entrapped medial epicondyle.
  if (str(values, 'dislocation') === 'present' && str(values, 'me-fracture') !== 'present') {
    out.push('An elbow dislocation is entered: look again for a medial epicondyle avulsion, which can be entrapped in the joint.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ossificationLine(values),
    choiceLine(values, fields.anteriorFatPad),
    choiceLine(values, fields.posteriorFatPad),
    choiceLine(values, fields.ahl),
    choiceLine(values, fields.rcl),
    ...fractureLines(values),
    list(values, 'variants').length > 0 && `Variants: ${chosen(values, fields.variants).join(', ')}`,
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the child\'s age',
    learn: 'technique',
    teach: <p>Check for an AP and a true lateral at 90° (this site's checklist). The age and sex set which ossification centres to expect.</p>,
    fields: [fields.views, fields.viewsMissing, fields.age, fields.sex],
  },
  {
    id: 'ossification',
    title: 'Step 2. Ossification centres',
    learn: 'ossification',
    teach: (
      <>
        <p>Capitellum, radial head, medial epicondyle, olecranon, trochlea, lateral epicondyle; half of girls show them by 1, 5, 5, 9, 9 and 10 years, boys about 2 years later except the capitellum ({CHENG}).</p>
        {centreTable}
        <p>An ossified trochlea with no medial epicondyle: think of an avulsed medial epicondyle in the joint ({IYER}).</p>
      </>
    ),
    fields: centreFields,
    derive: deriveOssification,
  },
  {
    id: 'fat-pads',
    title: 'Step 3. Fat pads',
    learn: 'fat-pads',
    teach: <p>An elevated anterior or visible posterior fat pad means an effusion ({IYER}). A visible posterior fat pad with no fracture seen: an occult fracture is likely ({SKAGGS}).</p>,
    fields: [fields.anteriorFatPad, fields.posteriorFatPad],
    derive: deriveFatPads,
  },
  {
    id: 'lines',
    title: 'Step 4. Alignment lines',
    learn: 'lines',
    teach: (
      <>
        <p>When the anterior humeral line is abnormal, look carefully for other signs of a supracondylar fracture ({ROGERS}). It passes through the middle third of the capitellum in most normal children; under age 4, nearly equally through the anterior or the middle third ({HERMAN}).</p>
        <p>The radiocapitellar line passes through the capitellum in every view; if not, the radial head is dislocated ({IYER}).</p>
      </>
    ),
    fields: [fields.ahl, fields.rcl],
    derive: deriveLines,
  },
  {
    id: 'supracondylar',
    title: 'Step 5. Supracondylar fracture',
    learn: 'supracondylar',
    teach: (
      <>
        <p>Modified Gartland (Wilkins): I undisplaced; II displaced, posterior cortex intact; III completely displaced ({GARTLAND}; {ALTON_GARTLAND}).</p>
        {gradingTable}
      </>
    ),
    fields: [fields.supracondylar, fields.gartland],
    derive: deriveSupracondylar,
  },
  {
    id: 'lateral-condyle',
    title: 'Step 6. Lateral condyle fracture',
    learn: 'lateral-condyle',
    teach: <p>Weiss I under 2 mm; II 2 mm or more, articular surface intact; III 2 mm or more, articular surface disrupted. The cartilage often cannot be judged on radiographs ({WEISS}).</p>,
    fields: [fields.lateralCondyle, fields.lcDisplacement, fields.lcArticular],
    derive: deriveLateralCondyle,
  },
  {
    id: 'medial-epicondyle',
    title: 'Step 7. Medial epicondyle avulsion',
    learn: 'medial-epicondyle',
    teach: <p>Name an entrapped fragment ({IYER}). Radiographs underestimate anterior displacement and overestimate medial displacement ({EDMONDS}).</p>,
    fields: [fields.meFracture, fields.meDisplacement, fields.meEntrapped],
    derive: deriveMedialEpicondyle,
  },
  {
    id: 'radial-neck',
    title: 'Step 8. Radial head and neck',
    learn: 'radial-neck',
    teach: <p>O'Brien by angulation: I under 30°, II 30° to 60°, III over 60° ({OBRIEN}).</p>,
    fields: [fields.radialNeck, fields.rnAngulation],
    derive: deriveRadialNeck,
  },
  {
    id: 'other',
    title: 'Step 9. Dislocation, olecranon and variants',
    learn: 'other',
    teach: <p>After a dislocation, look again for the medial epicondyle ({IYER}). Each variant gets its own impression line.</p>,
    fields: [fields.dislocation, fields.dislocationDirection, fields.olecranon, fields.variants],
  },
  {
    id: 'impression',
    title: 'Step 10. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the abnormal findings in order and each variant on its own line.</p>,
    fields: [fields.otherFractures, fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'pediatric-elbow',
  name: 'Pediatric elbow radiographs',
  lede: 'Read an injured child\'s elbow radiographs by age: which ossification centres to expect, the fat pads, the alignment lines, and the common fractures with their gradings.',
  sourceNote: "Unchecked draft: every reference has been matched on PubMed and Crossref, but the papers are paywalled, so the claims not stated in an abstract (among them the radiocapitellar line's link to a Monteggia injury, Gartland's original wording, the O'Brien and Judet types, and Jakob's stages) have still not been checked against their papers.",
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'critoe-order',
      question: 'In what order do the elbow ossification centres appear?',
      options: ['Capitellum, radial head, medial epicondyle, olecranon, trochlea, lateral epicondyle', 'Capitellum, trochlea, radial head, olecranon, medial epicondyle, lateral epicondyle', 'Radial head, capitellum, olecranon, trochlea, medial epicondyle, lateral epicondyle', 'Capitellum, radial head, trochlea, medial epicondyle, olecranon, lateral epicondyle'],
      answer: 0,
      explanation: <p>In Cheng and colleagues' series: capitellum, radial head, medial epicondyle, olecranon, trochlea, and last the lateral epicondyle, the same in boys and girls ({CHENG}). The CRITOE mnemonic swaps the olecranon and the trochlea.</p>,
    },
    {
      id: 'trochlea-first',
      question: 'An 8-year-old has an ossified trochlea but no medial epicondyle in its usual place. What should you think of?',
      options: ['Normal variation', 'An avulsed medial epicondyle displaced into the joint', 'A lateral condyle fracture', 'Delayed bone age'],
      answer: 1,
      explanation: <p>The medial epicondyle ossifies before the trochlea ({CHENG}), so an ossified trochlea without a medial epicondyle in place suggests an avulsed medial epicondyle entrapped in the joint ({IYER}).</p>,
    },
    {
      id: 'ages-vary',
      question: 'Which statement about the ossification ages is right?',
      options: ['They are fixed limits for every child', 'They are the ages by which half of children show each centre, and boys are about 2 years later than girls', 'Boys ossify earlier than girls', 'They apply only after age 5'],
      answer: 1,
      explanation: <p>Cheng and colleagues give the ages by which 50% of girls showed each centre (1, 5, 5, 9, 9 and 10 years); in boys every centre but the capitellum came on average 2 years later ({CHENG}).</p>,
    },
    {
      id: 'posterior-fat-pad',
      question: 'After a fall, the lateral shows a visible posterior fat pad, and no fracture is seen. What does the lesson say?',
      options: ['It is a normal finding in children', 'An occult fracture is likely', 'It means a pulled elbow', 'It needs no comment'],
      answer: 1,
      explanation: <p>In Skaggs and Mirzayan's series, follow-up radiographs showed a fracture in most such children (76%), so an occult fracture is likely ({SKAGGS}).</p>,
    },
    {
      id: 'ahl',
      question: 'In a 7-year-old, the anterior humeral line passes in front of the capitellum. What should you look for?',
      options: ['A radial neck fracture', 'A supracondylar fracture', 'A medial epicondyle avulsion', 'Nothing: this is normal at 7'],
      answer: 1,
      explanation: <p>The anterior humeral line is a valuable aid in the search for a supracondylar fracture; when it is abnormal, other signs of fracture should be carefully sought ({ROGERS}).</p>,
    },
    {
      id: 'ahl-young',
      question: 'In a 2-year-old, the anterior humeral line passes through the anterior third of the capitellum, and nothing else is abnormal. How should you read it?',
      options: ['Certainly a supracondylar fracture', 'It can be normal at this age', 'A sign of radial head dislocation', 'A sign of a lateral condyle fracture'],
      answer: 1,
      explanation: <p>Under age 4 the line passes nearly equally through the anterior or the middle third of the capitellum ({HERMAN}); Rogers and colleagues put the anterior third as possible under 2½ years, because the ossification centre is small ({ROGERS}).</p>,
    },
    {
      id: 'radiocapitellar',
      question: 'The radiocapitellar line misses the capitellum on the lateral view. What must you check next?',
      options: ['The olecranon fat pad', 'The ulna, for a fracture (Monteggia)', 'The medial epicondyle', 'The anterior humeral line'],
      answer: 1,
      explanation: <p>A radiocapitellar line that misses the capitellum means a radial head dislocation, and the ulna must be checked for a fracture: a Monteggia injury ({IYER}).</p>,
    },
    {
      id: 'gartland-ii',
      question: 'A supracondylar fracture is displaced, but the posterior cortex is intact. Which Gartland type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>Gartland type II is displaced with the posterior cortex intact (a hinge); type III is completely displaced without cortical contact. The cortical contact is Wilkins's modification of Gartland's types ({ALTON_GARTLAND}).</p>,
    },
    {
      id: 'weiss',
      question: 'A lateral condyle fracture is displaced 3 mm, and the articular surface cannot be judged on the radiographs. What is the Weiss type?',
      options: ['Type I', 'Type II', 'Type III', 'Type II or III, depending on the articular surface'],
      answer: 3,
      explanation: <p>Weiss type I is under 2 mm; at 2 mm or more it is type II if the articular surface is intact and type III if disrupted, which often cannot be judged on radiographs alone ({WEISS}).</p>,
    },
    {
      id: 'obrien',
      question: "A radial neck fracture is angulated 45°. What is the O'Brien type?",
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>O'Brien type I is under 30°, type II 30° to 60°, type III over 60° of angulation ({OBRIEN}).</p>,
    },
  ],
}

export function PediatricElbowStudyPage() {
  return <StudyPage study={study} />
}
