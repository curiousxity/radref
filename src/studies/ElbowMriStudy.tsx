import type { LessonReference } from '../components/LessonPage'
import { brobergMorrey, mason, masonDescriptions, masonSentence } from '../logic/mason'
import type { MasonPattern, MasonResult, MasonType } from '../logic/mason'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. PubMed and Crossref could not be reached when this was written, so every
 * citation below is from memory and every claim is waiting to be checked against its paper.
 * The claims table is docs/superpowers/research/2026-10-23-elbow-mri-sources.md; rule chips
 * and warnings carry its claim IDs. Until the check, citations are plain text rather than
 * <Cite> links, and the references have no DOI.
 */

const MASON = 'Mason, Br J Surg 1954'
const JOHNSTON = 'Johnston, Ulster Med J 1962'
const BROBERG = 'Broberg and Morrey, J Bone Joint Surg Am 1986'
const REGAN = 'Regan and Morrey, J Bone Joint Surg Am 1989'
const RING = 'Ring et al., J Bone Joint Surg Am 2002'
const ODRISCOLL_PLRI = "O'Driscoll et al., J Bone Joint Surg Am 1991"
const ODRISCOLL_SPECTRUM = "O'Driscoll et al., Clin Orthop Relat Res 1992"
const KIJOWSKI_PART2 = 'Kijowski et al., Skeletal Radiol 2005'
const TIMMERMAN = 'Timmerman et al., Am J Sports Med 1994'
const POTTER = 'Potter et al., Radiology 1995'
const BREDELLA = 'Bredella et al., AJR 1999'
const KIJOWSKI_MEDIAL = 'Kijowski and De Smet, Skeletal Radiol 2005'
const FALCHOOK = 'Falchook et al., Radiology 1994'
const KOBAYASHI = 'Kobayashi et al., J Am Acad Orthop Surg 2004'
const ROSENBERG_PSEUDO = 'Rosenberg et al., Radiology 1994'
const KIJOWSKI_OCD = 'Kijowski and De Smet, AJR 2005'
const ROSENBERG_TUNNEL = 'Rosenberg et al., AJR 1995'

const references: LessonReference[] = [
  { citation: 'Mason ML. Some observations on fractures of the head of the radius with a review of one hundred cases. Br J Surg. 1954;42(172):123-132.' },
  { citation: 'Johnston GW. A follow-up of one hundred cases of fracture of the head of the radius with a review of the literature. Ulster Med J. 1962;31(1):51-56.' },
  { citation: 'Broberg MA, Morrey BF. Results of delayed excision of the radial head after fracture. J Bone Joint Surg Am. 1986;68(5):669-674.' },
  { citation: 'Regan W, Morrey B. Fractures of the coronoid process of the ulna. J Bone Joint Surg Am. 1989;71(9):1348-1354.' },
  { citation: 'Ring D, Jupiter JB, Zilberfarb J. Posterior dislocation of the elbow with fractures of the radial head and coronoid. J Bone Joint Surg Am. 2002;84(4):547-551.' },
  { citation: "O'Driscoll SW, Bell DF, Morrey BF. Posterolateral rotatory instability of the elbow. J Bone Joint Surg Am. 1991;73(3):440-446." },
  { citation: "O'Driscoll SW, Morrey BF, Korinek S, An KN. Elbow subluxation and dislocation. A spectrum of instability. Clin Orthop Relat Res. 1992;(280):186-197." },
  { citation: 'Kijowski R, Tuite M, Sanford M. Magnetic resonance imaging of the elbow. Part II: Abnormalities of the ligaments, tendons, and nerves. Skeletal Radiol. 2005;34(1):1-18.' },
  { citation: 'Timmerman LA, Schwartz ML, Andrews JR. Preoperative evaluation of the ulnar collateral ligament by magnetic resonance imaging and computed tomography arthrography. Evaluation in 25 baseball players with surgical confirmation. Am J Sports Med. 1994;22(1):26-31.' },
  { citation: 'Potter HG, Hannafin JA, Morwessel RM, DiCarlo EF, O\'Brien SJ, Altchek DW. Lateral epicondylitis: correlation of MR imaging, surgical, and histopathologic findings. Radiology. 1995;196(1):43-46.' },
  { citation: 'Bredella MA, Tirman PF, Fritz RC, Feller JF, Wischer TK, Genant HK. MR imaging findings of lateral ulnar collateral ligament abnormalities in patients with lateral epicondylitis. AJR Am J Roentgenol. 1999;173(5):1379-1382.' },
  { citation: 'Kijowski R, De Smet AA. Magnetic resonance imaging findings in patients with medial epicondylitis. Skeletal Radiol. 2005;34(4):196-202.' },
  { citation: 'Falchook FS, Zlatkin MB, Erbacher GE, Moulton JS, Bisset GS, Murphy BJ. Rupture of the distal biceps tendon: evaluation with MR imaging. Radiology. 1994;190(3):659-663.' },
  { citation: "Kobayashi K, Burton KJ, Rodner C, Smith B, Caputo AE. Lateral compression injuries in the pediatric elbow: Panner's disease and osteochondritis dissecans of the capitellum. J Am Acad Orthop Surg. 2004;12(4):246-254." },
  { citation: 'Rosenberg ZS, Beltran J, Cheung YY. Pseudodefect of the capitellum: potential MR imaging pitfall. Radiology. 1994;191(3):821-823.' },
  { citation: 'Kijowski R, De Smet AA. MRI findings of osteochondritis dissecans of the capitellum with surgical correlation. AJR Am J Roentgenol. 2005;185(6):1453-1459.' },
  { citation: 'Rosenberg ZS, Beltran J, Cheung Y, Broker M. MR imaging of the elbow: normal variant and potential diagnostic pitfalls of the trochlear groove and cubital tunnel. AJR Am J Roentgenol. 1995;164(2):415-418.' },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (UCL, LUCL) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

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

const reganTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Coronoid fracture</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">I</td><td>Avulsion of the tip</td></tr>
        <tr><td className="vessel-name">II</td><td>A fragment of 50% of the coronoid or less</td></tr>
        <tr><td className="vessel-name">III</td><td>A fragment of more than 50% of the coronoid</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the elbow MRI that arrives with pain, sometimes after an injury. It walks a fixed search pattern through every structure, and uses the injury, when there is one, to decide where to look hardest. The order, and the protocol checklist below, are this site's own; none of the papers below prescribes them.</p>
        <p>Check that the study has all three planes, fat-suppressed fluid-sensitive imaging (proton density or T2) for edema and tears, and a T1-weighted sequence for anatomy and marrow. Note any effusion and any bone marrow edema.</p>
        <h4>After a dislocation: the Horii circle</h4>
        <p>O'Driscoll and colleagues describe elbow subluxation and dislocation as a spectrum in which the soft tissues fail in a ring from lateral to medial: first the lateral ulnar collateral ligament (stage 1, posterolateral subluxation), then the rest of the lateral side with the anterior and posterior capsule (stage 2), and last the medial side (stage 3) ({ODRISCOLL_SPECTRUM}). After a dislocation, read the lateral ligaments first, and expect a medial tear only when the lateral side is torn too.</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    body: (
      <>
        <h4>Radial head: Mason</h4>
        <p>Mason sorted radial head fractures into three types: an undisplaced fissure or marginal fracture, a displaced marginal sector fracture, and a comminuted fracture of the whole head ({MASON}). Johnston later added a fourth: a radial head fracture with dislocation of the elbow ({JOHNSTON}). The four-type scheme in common use is that modified version, so say "Mason type IV (Johnston)" when you use it. The Mason calculator on this site applies the same rules.</p>
        {masonTable}
        <p>Broberg and Morrey put numbers on the first two types: type I displaced less than 2 mm, type II displaced 2 mm or more and involving 30% or more of the head ({BROBERG}).</p>
        <h4>Coronoid: Regan and Morrey</h4>
        <p>Regan and Morrey typed coronoid fractures by fragment size ({REGAN}):</p>
        {reganTable}
        <h4>The terrible triad</h4>
        <p>Posterior dislocation of the elbow with fractures of both the radial head and the coronoid is the combination Ring and colleagues reported on ({RING}), known as the terrible triad. When the history is a dislocation and both fractures are present, say so in the impression.</p>
        <h4>Capitellum: osteochondritis dissecans, Panner, and the pseudodefect</h4>
        <p>Panner's disease is fragmentation of the whole capitellum in children younger than about 10; osteochondritis dissecans is a focal lesion of the capitellum in adolescents, typically throwers and gymnasts ({KOBAYASHI}). On MRI, judge whether an osteochondritis dissecans fragment is stable by looking at the interface between the fragment and the bone and at the overlying cartilage ({KIJOWSKI_OCD}).</p>
        <p>Do not call the pseudodefect a lesion: at the posterior capitellum, where it meets the lateral epicondyle, a normal groove can mimic an osteochondral defect ({ROSENBERG_PSEUDO}). True osteochondritis dissecans sits more anteriorly.</p>
      </>
    ),
  },
  {
    id: 'ucl',
    title: 'Step 3. Ulnar (medial) collateral ligament',
    body: (
      <>
        <p>The anterior bundle of the ulnar collateral ligament is the one that matters for valgus stability; describe it as intact, with edema around intact fibres, partially torn or completely torn ({KIJOWSKI_PART2}).</p>
        <p>In throwers, look at its distal attachment on the sublime tubercle. Timmerman and colleagues described an undersurface partial tear there, the deep fibres detached from the tubercle with the superficial fibres intact, seen as a "T" when contrast tracks along the bone ({TIMMERMAN}).</p>
      </>
    ),
  },
  {
    id: 'lateral-ligaments',
    title: 'Step 4. Lateral collateral complex',
    body: (
      <>
        <p>Check the lateral ulnar collateral ligament (LUCL), the radial collateral ligament and the annular ligament by name. Insufficiency of the LUCL is the lesion behind posterolateral rotatory instability ({ODRISCOLL_PLRI}), so a torn LUCL is worth a line in the impression even when the patient's complaint is only pain.</p>
        <p>After a dislocation, the LUCL is the first structure to fail ({ODRISCOLL_SPECTRUM}).</p>
      </>
    ),
  },
  {
    id: 'flexor',
    title: 'Step 5. Common flexor-pronator origin',
    body: (
      <>
        <p>Medial epicondylitis shows as abnormal signal in the common flexor tendon at the medial epicondyle ({KIJOWSKI_MEDIAL}). Describe it as tendinosis, a partial tear or a complete tear, and look next door at the ulnar collateral ligament and the ulnar nerve.</p>
      </>
    ),
  },
  {
    id: 'extensor',
    title: 'Step 6. Common extensor origin',
    body: (
      <>
        <p>In lateral epicondylitis, MRI shows thickening and increased signal in the common extensor tendon, and the MRI findings matched the surgical and histological ones ({POTTER}).</p>
        <p>Read the LUCL again when the extensor origin is abnormal: LUCL abnormalities, thickening and tears, were found in patients with lateral epicondylitis ({BREDELLA}).</p>
      </>
    ),
  },
  {
    id: 'biceps',
    title: 'Step 7. Distal biceps',
    body: (
      <>
        <p>MRI tells a partial rupture of the distal biceps tendon from a complete one ({FALCHOOK}). For a complete rupture, measure how far the tendon end has retracted; for any tear, note fluid in the bicipitoradial bursa. The cited paper gives no retraction threshold, so the measurement is descriptive.</p>
      </>
    ),
  },
  {
    id: 'triceps-brachialis',
    title: 'Step 8. Triceps and brachialis',
    body: (
      <>
        <p>Check the triceps at its olecranon insertion and the brachialis in front of the joint ({KIJOWSKI_PART2}). There is no cited grading here, so this step is descriptive.</p>
      </>
    ),
  },
  {
    id: 'nerves',
    title: 'Step 9. Nerves',
    body: (
      <>
        <p>Follow the ulnar nerve through the cubital tunnel, the radial nerve and its posterior interosseous branch past the supinator, and the median nerve. An abnormal nerve is enlarged with increased T2 signal, and muscles it supplies may show denervation edema ({KIJOWSKI_PART2}).</p>
        <p>An anconeus epitrochlearis, an accessory muscle over the cubital tunnel, can compress the ulnar nerve ({ROSENBERG_TUNNEL}); it is recorded in the variants step.</p>
      </>
    ),
  },
  {
    id: 'bursae',
    title: 'Step 10. Bursae, loose bodies and synovium',
    body: (
      <>
        <p>Look for olecranon bursitis, loose bodies in the recesses, synovitis, and a thickened synovial fringe (plica). These are descriptive findings with no cited rule here.</p>
      </>
    ),
  },
  {
    id: 'variants',
    title: 'Step 11. Variants',
    body: (
      <>
        <p>Record a supracondylar process, an anconeus epitrochlearis ({ROSENBERG_TUNNEL}) or an os supratrochleare dorsale when you see one. This site's report gives each variant its own impression line, so the referrer knows it was seen and judged.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 12. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the history against the ligaments (after a dislocation, lateral before medial), the radial head and coronoid together, the extensor origin against the LUCL.</p>
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

const ligamentOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'edema', label: 'Edema around intact fibres' },
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
const absentPresent: Option[] = [
  { value: 'absent', label: 'Absent' },
  { value: 'present', label: 'Present' },
]
const nonePresent: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]

/** E2-2: the coronoid fracture options, worded as Regan and Morrey's types. */
const reganType: Record<string, string> = { tip: 'I', minor: 'II', major: 'III' }

const radialHeadPresent = (v: Values) => str(v, 'radial-head') === 'present'

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain only' },
    { value: 'dislocation', label: 'Dislocation or subluxation' },
    { value: 'throwing', label: 'Throwing or overhead sport' },
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

  bmeSite: { id: 'bme-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. capitellum and radial head', showIf: (v) => str(v, 'marrow') === 'present' },
  radialHead: { id: 'radial-head', kind: 'choice', label: 'Radial head fracture', required: true, options: nonePresent, help: 'Gives the Mason type, as in the Mason calculator.' },
  radialHeadPattern: { id: 'radial-head-pattern', kind: 'choice', label: 'Radial head fracture pattern', required: true, showIf: radialHeadPresent, options: [
    { value: 'undisplaced', label: 'Fissure or marginal fracture, not displaced' },
    { value: 'displaced', label: 'Marginal sector fracture, displaced' },
    { value: 'comminuted', label: 'Comminuted, whole head' },
  ] },
  radialHeadDislocation: { id: 'radial-head-dislocation', kind: 'choice', label: 'Elbow dislocated with this fracture', required: true, showIf: radialHeadPresent, options: [
    { value: 'no', label: 'No' },
    { value: 'yes', label: 'Yes' },
  ] },
  radialHeadDisplacement: { id: 'radial-head-displacement', kind: 'number', label: 'Radial head displacement', unit: 'mm', min: 0, step: 0.5, showIf: radialHeadPresent, help: 'Broberg-Morrey: under 2 mm is type I; 2 mm or more with 30% or more of the head is type II.' },
  radialHeadPercent: { id: 'radial-head-percent', kind: 'number', label: 'Share of the head involved', unit: '%', min: 0, max: 100, step: 5, showIf: radialHeadPresent },
  coronoid: { id: 'coronoid', kind: 'choice', label: 'Coronoid fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'tip', label: 'Tip avulsion' },
    { value: 'minor', label: 'Fragment of 50% or less' },
    { value: 'major', label: 'Fragment of more than 50%' },
  ] },
  olecranon: { id: 'olecranon', kind: 'choice', label: 'Olecranon fracture', required: true, options: nonePresent },
  fracture: { id: 'fracture', kind: 'choice', label: 'Other fracture', required: true, options: nonePresent },
  fractureSite: { id: 'fracture-site', kind: 'text', label: 'Other fracture site', placeholder: 'e.g. lateral epicondyle', showIf: (v) => str(v, 'fracture') === 'present' },
  capitellum: { id: 'capitellum', kind: 'choice', label: 'Capitellum', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'ocd', label: 'Focal osteochondral lesion (osteochondritis dissecans)' },
    { value: 'panner', label: 'Fragmentation of the whole capitellum (Panner)' },
  ] },
  ocdSite: { id: 'ocd-site', kind: 'choice', label: 'Lesion site on the capitellum', showIf: (v) => str(v, 'capitellum') === 'ocd', options: [
    { value: 'anterior', label: 'Anterior or anterolateral' },
    { value: 'central', label: 'Central' },
    { value: 'posterior', label: 'Posterior, at the lateral epicondyle' },
  ] },
  ocdSigns: { id: 'ocd-signs', kind: 'multi', label: 'Signs around the fragment', showIf: (v) => str(v, 'capitellum') === 'ocd', options: [
    { value: 'rim', label: 'High T2 signal at the fragment-bone interface' },
    { value: 'cyst', label: 'Cyst beneath the fragment' },
    { value: 'cartilage', label: 'Breach in the overlying cartilage' },
    { value: 'displaced', label: 'Fragment displaced' },
  ] },

  ucl: { id: 'ucl', kind: 'choice', label: 'UCL (anterior bundle)', required: true, options: ligamentOptions },
  uclPartialType: { id: 'ucl-partial-type', kind: 'choice', label: 'UCL partial tear', showIf: (v) => str(v, 'ucl') === 'partial', options: [
    { value: 'undersurface', label: 'Undersurface tear at the sublime tubercle, superficial fibres intact' },
    { value: 'other', label: 'Other partial tear' },
  ] },

  lucl: { id: 'lucl', kind: 'choice', label: 'LUCL', required: true, options: ligamentOptions },
  rcl: { id: 'rcl', kind: 'choice', label: 'Radial collateral ligament', required: true, options: ligamentOptions },
  annular: { id: 'annular', kind: 'choice', label: 'Annular ligament', required: true, options: normalAbnormal },
  annularText: { id: 'annular-text', kind: 'text', label: 'Annular ligament (describe)', showIf: (v) => str(v, 'annular') === 'abnormal' },

  flexor: { id: 'flexor', kind: 'choice', label: 'Common flexor origin', required: true, options: tendonOptions },
  extensor: { id: 'extensor', kind: 'choice', label: 'Common extensor origin', required: true, options: tendonOptions },

  biceps: { id: 'biceps', kind: 'choice', label: 'Distal biceps tendon', required: true, options: tendonOptions },
  bicepsRetraction: { id: 'biceps-retraction', kind: 'number', label: 'Retraction of the tendon end', unit: 'cm', min: 0, step: 0.5, showIf: (v) => str(v, 'biceps') === 'complete', help: 'Descriptive; the cited paper gives no threshold.' },
  bicipitoradial: { id: 'bicipitoradial', kind: 'choice', label: 'Bicipitoradial bursa fluid', options: absentPresent },

  triceps: { id: 'triceps', kind: 'choice', label: 'Triceps tendon', required: true, options: tendonOptions },
  brachialis: { id: 'brachialis', kind: 'choice', label: 'Brachialis', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'strain', label: 'Strain' },
    { value: 'tear', label: 'Tear' },
  ] },

  ulnarNerve: { id: 'ulnar-nerve', kind: 'choice', label: 'Ulnar nerve', required: true, options: normalAbnormal, help: 'Abnormal: enlarged, with increased T2 signal.' },
  radialNerve: { id: 'radial-nerve', kind: 'choice', label: 'Radial nerve and PIN', required: true, options: normalAbnormal },
  medianNerve: { id: 'median-nerve', kind: 'choice', label: 'Median nerve', required: true, options: normalAbnormal },
  denervation: { id: 'denervation', kind: 'choice', label: 'Denervation edema', options: nonePresent },
  denervationMuscles: { id: 'denervation-muscles', kind: 'text', label: 'Which muscles', placeholder: 'e.g. supinator and extensors', showIf: (v) => str(v, 'denervation') === 'present' },

  olecranonBursa: { id: 'olecranon-bursa', kind: 'choice', label: 'Olecranon bursitis', required: true, options: absentPresent },
  looseBodies: { id: 'loose-bodies', kind: 'choice', label: 'Loose bodies', required: true, options: absentPresent },
  synovitis: { id: 'synovitis', kind: 'choice', label: 'Synovitis', required: true, options: absentPresent },
  plica: { id: 'plica', kind: 'choice', label: 'Thickened synovial fringe (plica)', options: absentPresent },

  variants: { id: 'variants', kind: 'multi', label: 'Variants', help: 'Each gets its own impression line.', options: [
    { value: 'supracondylar', label: 'Supracondylar process' },
    { value: 'anconeus', label: 'Anconeus epitrochlearis' },
    { value: 'supratrochleare', label: 'Os supratrochleare dorsale' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. soft-tissue mass' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-ligament', label: 'No ligament injury' },
    { value: 'no-tendon-tear', label: 'No tendon tear' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

function radialHeadResult(values: Values): MasonResult | undefined {
  if (!radialHeadPresent(values)) return undefined
  const dislocation = str(values, 'radial-head-dislocation')
  return mason({
    pattern: (str(values, 'radial-head-pattern') || undefined) as MasonPattern | undefined,
    dislocation: dislocation === '' ? undefined : dislocation === 'yes',
  })
}

const dislocationHistory = (values: Values) => str(values, 'history') === 'dislocation'

/** E2-3: a dislocation with fractures of both the radial head and the coronoid. */
function terribleTriad(values: Values): boolean {
  const dislocated = dislocationHistory(values) || str(values, 'radial-head-dislocation') === 'yes'
  const coronoid = str(values, 'coronoid')
  return dislocated && radialHeadPresent(values) && coronoid !== '' && coronoid !== 'none'
}

const torn = (values: Values, id: string) => ['partial', 'complete'].includes(str(values, id))

/** The variants marked present, each as its own impression sentence. */
function variantSentences(values: Values): string[] {
  return chosen(values, fields.variants).map((label) => `${upperFirst(label)} (anatomical variant).`)
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveTechnique(values: Values): Derived[] {
  // E1-1: after a dislocation the soft tissues fail from lateral to medial.
  return dislocationHistory(values) ? [{ label: 'After a dislocation', value: 'Read the ligaments lateral to medial (Horii circle)' }] : []
}

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  const radialHead = radialHeadResult(values)
  if (radialHead) out.push({ label: 'Mason', value: radialHead.modified ? 'Type IV (Johnston)' : `Type ${radialHead.type}`, tone: 'warn' })
  if (radialHeadPresent(values) && num(values, 'radial-head-displacement') !== undefined) {
    // MA-5, MA-6.
    const type = brobergMorrey(num(values, 'radial-head-displacement'), num(values, 'radial-head-percent'))
    out.push({ label: 'Broberg-Morrey', value: type ? `Type ${type}` : 'Not decided by the 2 mm and 30% thresholds' })
  }
  // E2-2: Regan and Morrey coronoid types.
  const regan = reganType[str(values, 'coronoid')] as string | undefined
  if (regan) out.push({ label: 'Coronoid (Regan-Morrey)', value: `Type ${regan}`, tone: 'warn' })
  if (terribleTriad(values)) out.push({ label: 'Terrible triad', value: 'Dislocation with radial head and coronoid fractures', tone: 'warn' })
  // E2-4: Panner's disease against osteochondritis dissecans.
  const capitellum = str(values, 'capitellum')
  if (capitellum === 'ocd') out.push({ label: 'Osteochondritis dissecans', value: 'Typically adolescents; a focal lesion' })
  if (capitellum === 'panner') out.push({ label: "Panner's disease", value: 'Typically under 10 years; the whole capitellum' })
  return out
}

function deriveUcl(values: Values): Derived[] {
  // E3-2: the undersurface partial tear at the sublime tubercle (T-sign).
  return str(values, 'ucl') === 'partial' && str(values, 'ucl-partial-type') === 'undersurface'
    ? [{ label: 'Undersurface partial tear', value: 'Deep fibres off the sublime tubercle (T-sign)', tone: 'warn' }]
    : []
}

function deriveLateral(values: Values): Derived[] {
  // E4-1: LUCL insufficiency underlies posterolateral rotatory instability.
  return torn(values, 'lucl') ? [{ label: 'LUCL tear', value: 'The lesion behind posterolateral rotatory instability', tone: 'warn' }] : []
}

function deriveExtensor(values: Values): Derived[] {
  // E6-2: LUCL abnormalities are found with lateral epicondylitis.
  const extensor = str(values, 'extensor')
  return extensor && extensor !== 'normal' ? [{ label: 'Extensor origin abnormal', value: 'Recheck the LUCL' }] : []
}

/* Report lines, one per entered finding. */

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  return [
    choiceLine(values, fields.history),
    protocol === 'complete' && 'Technique: three planes, fat-suppressed PD/T2 and T1-weighted imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion),
  ]
}

function boneLines(values: Values): (string | false)[] {
  const marrow = str(values, 'marrow')
  const site = str(values, 'bme-site')
  const radialHead = str(values, 'radial-head')
  const result = radialHeadResult(values)
  const displacement = num(values, 'radial-head-displacement')
  const percent = num(values, 'radial-head-percent')
  const coronoid = str(values, 'coronoid')
  const fracture = str(values, 'fracture')
  const capitellum = str(values, 'capitellum')
  const ocdSigns = chosen(values, fields.ocdSigns)
  return [
    marrow === 'none' && 'Bone marrow: no edema',
    marrow === 'present' && `Bone marrow: edema${site ? ` in ${site}` : ''}`,
    radialHead === 'none' && 'Radial head: no fracture',
    radialHead === 'present' && `Radial head: ${join([
      result ? masonSentence(result).replace(/\.$/, '').replace(/^Radial/, 'radial') : 'fracture',
      displacement !== undefined && `displaced ${displacement} mm`,
      percent !== undefined && `${percent}% of the head`,
    ])}`,
    coronoid === 'none' && 'Coronoid: no fracture',
    coronoid && coronoid !== 'none' && `Coronoid: ${picked(values, fields.coronoid)} (Regan-Morrey type ${reganType[coronoid]})`,
    choiceLine(values, { ...fields.olecranon, label: 'Olecranon fracture' }),
    fracture === 'none' && 'Other fracture: none',
    fracture === 'present' && `Other fracture: ${str(values, 'fracture-site') || 'present'}`,
    capitellum === 'normal' && 'Capitellum: normal',
    capitellum === 'panner' && 'Capitellum: fragmentation of the whole capitellum (Panner)',
    capitellum === 'ocd' && `Capitellum: ${join(['osteochondritis dissecans', picked(values, fields.ocdSite), ocdSigns.length > 0 && ocdSigns.join(', ')])}`,
  ]
}

function uclLine(values: Values): string {
  const partialType = str(values, 'ucl-partial-type')
  return choiceLine(values, fields.ucl, partialType === 'undersurface' && 'undersurface tear at the sublime tubercle, superficial fibres intact')
}

function nerveLines(values: Values): (string | false)[] {
  const denervation = str(values, 'denervation')
  return [
    choiceLine(values, fields.ulnarNerve),
    choiceLine(values, fields.radialNerve),
    choiceLine(values, fields.medianNerve),
    denervation === 'none' && 'Denervation edema: none',
    denervation === 'present' && `Denervation edema: ${str(values, 'denervation-muscles') || 'present'}`,
  ]
}

/* The impression: one sentence per abnormal finding, in search-pattern order, then the variants. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const effusion = str(values, 'effusion')
  if (effusion === 'moderate' || effusion === 'large') out.push(`${upperFirst(effusion)} joint effusion.`)
  if (str(values, 'marrow') === 'present') {
    const site = str(values, 'bme-site')
    out.push(`Bone marrow edema${site ? ` in ${site}` : ''}.`)
  }
  if (terribleTriad(values)) out.push('Terrible triad: elbow dislocation with fractures of the radial head and coronoid.')
  if (radialHeadPresent(values)) {
    const result = radialHeadResult(values)
    out.push(result ? masonSentence(result) : 'Radial head fracture.')
  }
  const coronoid = str(values, 'coronoid')
  if (coronoid && coronoid !== 'none') out.push(`Coronoid fracture, Regan-Morrey type ${reganType[coronoid]}: ${picked(values, fields.coronoid)}.`)
  if (str(values, 'olecranon') === 'present') out.push('Olecranon fracture.')
  if (str(values, 'fracture') === 'present') {
    const site = str(values, 'fracture-site')
    out.push(`Fracture${site ? `: ${site}` : ''}.`)
  }
  const capitellum = str(values, 'capitellum')
  if (capitellum === 'ocd') out.push('Osteochondritis dissecans of the capitellum.')
  if (capitellum === 'panner') out.push('Fragmentation of the whole capitellum, as in Panner\'s disease.')

  const ucl = str(values, 'ucl')
  if (ucl === 'edema') out.push('Edema around an intact UCL.')
  if (ucl === 'partial' || ucl === 'complete') {
    const undersurface = ucl === 'partial' && str(values, 'ucl-partial-type') === 'undersurface'
    out.push(`${upperFirst(ucl)} tear of the UCL${undersurface ? ', undersurface at the sublime tubercle' : ''}.`)
  }
  for (const [id, name] of [['lucl', 'LUCL'], ['rcl', 'radial collateral ligament']] as const) {
    const status = str(values, id)
    if (status === 'edema') out.push(`Edema around an intact ${name}.`)
    if (status === 'partial' || status === 'complete') out.push(`${upperFirst(status)} tear of the ${name}.`)
  }
  if (str(values, 'annular') === 'abnormal') out.push(`Annular ligament: ${str(values, 'annular-text') || 'abnormal'}.`)
  for (const [id, name] of [['flexor', 'Common flexor origin'], ['extensor', 'Common extensor origin'], ['biceps', 'Distal biceps tendon'], ['triceps', 'Triceps tendon']] as const) {
    const status = str(values, id)
    if (!status || status === 'normal') continue
    const retraction = id === 'biceps' && status === 'complete' ? num(values, 'biceps-retraction') : undefined
    out.push(`${name}: ${picked(values, { id, options: tendonOptions })}${retraction !== undefined ? `, retracted ${retraction} cm` : ''}.`)
  }
  if (str(values, 'bicipitoradial') === 'present') out.push('Fluid in the bicipitoradial bursa.')
  const brachialis = str(values, 'brachialis')
  if (brachialis === 'strain' || brachialis === 'tear') out.push(`Brachialis ${brachialis}.`)
  for (const [id, name] of [['ulnar-nerve', 'Ulnar nerve'], ['radial-nerve', 'Radial nerve or PIN'], ['median-nerve', 'Median nerve']] as const) {
    if (str(values, id) === 'abnormal') out.push(`${name} abnormal.`)
  }
  if (str(values, 'denervation') === 'present') out.push(`Denervation edema${str(values, 'denervation-muscles') ? `: ${str(values, 'denervation-muscles')}` : ''}.`)
  if (str(values, 'olecranon-bursa') === 'present') out.push('Olecranon bursitis.')
  if (str(values, 'loose-bodies') === 'present') out.push('Loose bodies.')
  if (str(values, 'synovitis') === 'present') out.push('Synovitis.')
  if (str(values, 'plica') === 'present') out.push('Thickened synovial fringe (plica).')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous, tendinous or neural abnormality of the elbow.'

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

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fractures = [
    radialHeadPresent(values) && 'radial head fracture',
    !['', 'none'].includes(str(values, 'coronoid')) && 'coronoid fracture',
    str(values, 'olecranon') === 'present' && 'olecranon fracture',
    str(values, 'fracture') === 'present' && 'fracture',
  ].filter((item): item is string => Boolean(item))
  const ligaments = ([['ucl', 'UCL'], ['lucl', 'LUCL'], ['rcl', 'radial collateral ligament']] as const)
    .filter(([id]) => torn(values, id))
    .map(([id, name]) => `${name} ${str(values, id)} tear`)
  const tendons = ([['flexor', 'common flexor origin'], ['extensor', 'common extensor origin'], ['biceps', 'distal biceps'], ['triceps', 'triceps']] as const)
    .filter(([id]) => torn(values, id))
    .map(([id, name]) => `${name} ${str(values, id)} tear`)
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-ligament', 'no ligament injury', ligaments],
    ['no-tendon-tear', 'no tendon tear', tendons],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // E1-1: after a dislocation the medial side fails last, after the lateral side.
  if (dislocationHistory(values) && torn(values, 'ucl') && str(values, 'lucl') === 'intact') {
    out.push('The history is a dislocation and the UCL is torn, but the LUCL is entered as intact; after a dislocation the lateral side fails before the medial side.')
  }
  // MA-4: a radial head fracture with a dislocation is Mason type IV.
  if (dislocationHistory(values) && radialHeadPresent(values) && str(values, 'radial-head-dislocation') === 'no') {
    out.push('The history is a dislocation, but the radial head fracture is entered without one; if they happened together it is Mason type IV (Johnston).')
  }
  // E2-5: the pseudodefect sits at the posterior capitellum.
  if (str(values, 'capitellum') === 'ocd' && str(values, 'ocd-site') === 'posterior') {
    out.push('An osteochondral lesion is entered at the posterior capitellum, where the normal pseudodefect sits; check that it is not the pseudodefect.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...boneLines(values),
    uclLine(values),
    choiceLine(values, fields.lucl),
    choiceLine(values, fields.rcl),
    choiceLine(values, fields.annular, str(values, 'annular') === 'abnormal' && str(values, 'annular-text')),
    choiceLine(values, fields.flexor),
    choiceLine(values, fields.extensor),
    choiceLine(values, fields.biceps, str(values, 'biceps') === 'complete' && num(values, 'biceps-retraction') !== undefined && `retracted ${num(values, 'biceps-retraction')} cm`),
    choiceLine(values, fields.bicipitoradial),
    choiceLine(values, fields.triceps),
    choiceLine(values, fields.brachialis),
    ...nerveLines(values),
    choiceLine(values, fields.olecranonBursa),
    choiceLine(values, fields.looseBodies),
    choiceLine(values, fields.synovitis),
    choiceLine(values, fields.plica),
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
    teach: (
      <>
        <p>Check for all three planes, fat-suppressed PD or T2 imaging, and a T1-weighted sequence (this site's checklist).</p>
        <p>After a dislocation the soft tissues fail in a ring from lateral to medial: the LUCL first, then the rest of the lateral side and the capsule, the medial side last ({ODRISCOLL_SPECTRUM}).</p>
      </>
    ),
    fields: [fields.history, fields.protocol, fields.protocolMissing, fields.effusion, fields.marrow],
    derive: deriveTechnique,
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    learn: 'bones',
    teach: (
      <>
        <p>Mason's three types, with Johnston's type IV for a fracture with dislocation ({MASON}; {JOHNSTON}):</p>
        {masonTable}
        <p>Coronoid fractures by Regan and Morrey ({REGAN}):</p>
        {reganTable}
        <p>A dislocation with radial head and coronoid fractures is the terrible triad ({RING}). The pseudodefect at the posterior capitellum is normal ({ROSENBERG_PSEUDO}).</p>
      </>
    ),
    fields: [
      fields.bmeSite, fields.radialHead, fields.radialHeadPattern, fields.radialHeadDislocation, fields.radialHeadDisplacement,
      fields.radialHeadPercent, fields.coronoid, fields.olecranon, fields.fracture, fields.fractureSite, fields.capitellum,
      fields.ocdSite, fields.ocdSigns,
    ],
    derive: deriveBones,
  },
  {
    id: 'ucl',
    title: 'Step 3. Ulnar (medial) collateral ligament',
    learn: 'ucl',
    teach: <p>In throwers, look for an undersurface partial tear at the sublime tubercle, the deep fibres detached and the superficial fibres intact ({TIMMERMAN}).</p>,
    fields: [fields.ucl, fields.uclPartialType],
    derive: deriveUcl,
  },
  {
    id: 'lateral-ligaments',
    title: 'Step 4. Lateral collateral complex',
    learn: 'lateral-ligaments',
    teach: <p>LUCL insufficiency is the lesion behind posterolateral rotatory instability ({ODRISCOLL_PLRI}).</p>,
    fields: [fields.lucl, fields.rcl, fields.annular, fields.annularText],
    derive: deriveLateral,
  },
  {
    id: 'flexor',
    title: 'Step 5. Common flexor-pronator origin',
    learn: 'flexor',
    teach: <p>Medial epicondylitis shows as abnormal signal in the common flexor tendon ({KIJOWSKI_MEDIAL}).</p>,
    fields: [fields.flexor],
  },
  {
    id: 'extensor',
    title: 'Step 6. Common extensor origin',
    learn: 'extensor',
    teach: <p>Lateral epicondylitis: thickening and increased signal in the common extensor tendon ({POTTER}). LUCL abnormalities were found with it ({BREDELLA}).</p>,
    fields: [fields.extensor],
    derive: deriveExtensor,
  },
  {
    id: 'biceps',
    title: 'Step 7. Distal biceps',
    learn: 'biceps',
    teach: <p>MRI tells a partial rupture from a complete one ({FALCHOOK}). Measure retraction of a complete rupture.</p>,
    fields: [fields.biceps, fields.bicepsRetraction, fields.bicipitoradial],
  },
  {
    id: 'triceps-brachialis',
    title: 'Step 8. Triceps and brachialis',
    learn: 'triceps-brachialis',
    teach: <p>Check the triceps insertion and the brachialis ({KIJOWSKI_PART2}).</p>,
    fields: [fields.triceps, fields.brachialis],
  },
  {
    id: 'nerves',
    title: 'Step 9. Nerves',
    learn: 'nerves',
    teach: <p>An abnormal nerve is enlarged with increased T2 signal, and its muscles may show denervation edema ({KIJOWSKI_PART2}).</p>,
    fields: [fields.ulnarNerve, fields.radialNerve, fields.medianNerve, fields.denervation, fields.denervationMuscles],
  },
  {
    id: 'bursae',
    title: 'Step 10. Bursae, loose bodies and synovium',
    learn: 'bursae',
    fields: [fields.olecranonBursa, fields.looseBodies, fields.synovitis, fields.plica],
  },
  {
    id: 'variants',
    title: 'Step 11. Variants',
    learn: 'variants',
    teach: <p>An anconeus epitrochlearis over the cubital tunnel can compress the ulnar nerve ({ROSENBERG_TUNNEL}). Each variant gets its own impression line.</p>,
    fields: [fields.variants],
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
  slug: 'elbow-mri',
  name: 'Elbow MRI',
  lede: 'Read an elbow MRI for pain or after an injury: a fixed search pattern through the bones, collateral ligaments, tendons, nerves and bursae, and the report.',
  sourceNote: 'Unchecked draft: written while PubMed could not be reached, so no citation or claim on this page has been checked against its paper yet. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'mason-ii',
      question: 'A radial head fracture is a single displaced marginal fragment, with no dislocation. What is the Mason type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 1,
      explanation: <p>Mason type II is a marginal sector fracture with displacement; type I is undisplaced and type III comminuted across the whole head ({MASON}).</p>,
    },
    {
      id: 'mason-iv',
      question: 'An undisplaced radial head fracture came with an elbow dislocation. How is it typed, and whose type is it?',
      options: ['Mason type I, since the fracture is undisplaced', 'Type IV, which Johnston added to Mason\'s three types', 'Mason type III', 'It cannot be typed by Mason'],
      answer: 1,
      explanation: <p>A radial head fracture with dislocation of the elbow is type IV, Johnston's addition to Mason's original three types ({JOHNSTON}).</p>,
    },
    {
      id: 'broberg',
      question: 'By Broberg and Morrey\'s thresholds, what makes a radial head fracture type II?',
      options: ['Any displacement', 'Displacement of 2 mm or more, involving 30% or more of the head', 'Displacement of 5 mm or more', 'Involvement of more than half the head'],
      answer: 1,
      explanation: <p>Broberg and Morrey put type I at less than 2 mm of displacement and type II at 2 mm or more involving 30% or more of the head ({BROBERG}).</p>,
    },
    {
      id: 'regan-iii',
      question: 'A coronoid fracture fragment is more than half of the coronoid. What is the Regan-Morrey type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 2,
      explanation: <p>Regan and Morrey: type I is a tip avulsion, type II a fragment of 50% or less, type III a fragment of more than 50% ({REGAN}).</p>,
    },
    {
      id: 'terrible-triad',
      question: 'Which combination makes the terrible triad of the elbow?',
      options: ['Dislocation with radial head and coronoid fractures', 'Dislocation with olecranon and capitellum fractures', 'UCL, LUCL and annular ligament tears', 'Radial head fracture with distal biceps and triceps tears'],
      answer: 0,
      explanation: <p>Posterior dislocation of the elbow with fractures of the radial head and the coronoid ({RING}).</p>,
    },
    {
      id: 'horii',
      question: 'After an elbow dislocation, which structure fails first?',
      options: ['The anterior bundle of the UCL', 'The lateral ulnar collateral ligament', 'The annular ligament', 'The posterior capsule'],
      answer: 1,
      explanation: <p>The soft tissues fail in a ring from lateral to medial: the LUCL first, then the rest of the lateral side and the capsule, the medial side last ({ODRISCOLL_SPECTRUM}).</p>,
    },
    {
      id: 'plri',
      question: 'Insufficiency of which ligament underlies posterolateral rotatory instability?',
      options: ['The anterior bundle of the UCL', 'The annular ligament', 'The lateral ulnar collateral ligament', 'The radial collateral ligament alone'],
      answer: 2,
      explanation: <p>LUCL insufficiency is the lesion behind posterolateral rotatory instability ({ODRISCOLL_PLRI}).</p>,
    },
    {
      id: 't-sign',
      question: 'In a baseball pitcher, the deep fibres of the UCL are detached from the sublime tubercle while the superficial fibres are intact. What is this?',
      options: ['A complete UCL tear', 'An undersurface partial tear (the T-sign)', 'A normal recess', 'Medial epicondylitis'],
      answer: 1,
      explanation: <p>Timmerman and colleagues described this undersurface partial tear of the UCL at the sublime tubercle ({TIMMERMAN}).</p>,
    },
    {
      id: 'pseudodefect',
      question: 'An apparent defect sits at the posterior capitellum, where it meets the lateral epicondyle. What should you consider first?',
      options: ['Osteochondritis dissecans', "Panner's disease", 'The normal pseudodefect of the capitellum', 'An impaction fracture'],
      answer: 2,
      explanation: <p>A normal groove at the posterior capitellum can mimic an osteochondral defect: the pseudodefect ({ROSENBERG_PSEUDO}).</p>,
    },
    {
      id: 'panner',
      question: 'The whole capitellum is fragmented in an 8-year-old. Which diagnosis fits best?',
      options: ["Panner's disease", 'Osteochondritis dissecans', 'Mason type III fracture', 'The pseudodefect'],
      answer: 0,
      explanation: <p>Panner's disease is fragmentation of the whole capitellum in children younger than about 10; osteochondritis dissecans is a focal lesion in adolescents ({KOBAYASHI}).</p>,
    },
    {
      id: 'anconeus',
      question: 'An accessory muscle lies over the cubital tunnel. What is it, and which nerve can it compress?',
      options: ['Anconeus epitrochlearis; the ulnar nerve', 'Supracondylar process; the median nerve', 'Accessory brachialis; the radial nerve', 'Os supratrochleare; the ulnar nerve'],
      answer: 0,
      explanation: <p>An anconeus epitrochlearis over the cubital tunnel can compress the ulnar nerve ({ROSENBERG_TUNNEL}).</p>,
    },
  ],
}

export function ElbowMriStudyPage() {
  return <StudyPage study={study} />
}
