import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { hawkinsDescriptions, hawkinsSentence, hawkinsTypes } from '../logic/hawkins'
import type { HawkinsType } from '../logic/hawkins'
import { myersonDescriptions, myersonGroup, myersonSentence, myersonTypes } from '../logic/myerson'
import type { MyersonType } from '../logic/myerson'
import { sandersDescription, sandersSentence, sandersTypes } from '../logic/sanders'
import type { SandersType } from '../logic/sanders'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

/*
 * Unchecked draft. Every reference has been matched on PubMed and Crossref (2026-10-23), but
 * the papers are paywalled, so only claims whose wording is in an abstract are verified. The
 * claims table, with each claim's status, is docs/superpowers/research/2026-10-23-foot-mri-sources.md
 * (F claims); the Hawkins, Sanders and Myerson wording is in 2026-10-23-foot-calculators-sources.md
 * (HK, SA and MY claims). Rule chips and warnings carry their claim IDs.
 */

const HAWKINS_DOI = '10.2106/00004623-197052050-00013'
const CANALE_DOI = '10.2106/00004623-197860020-00001'
const SANDERS_DOI = '10.1097/00003086-199305000-00012'
const MYERSON_DOI = '10.1177/107110078600600504'
const CASTRO_DOI = '10.2214/AJR.10.4674'
const RAIKIN_DOI = '10.2106/JBJS.H.01075'
const NEWMAN_DOI = '10.1148/radiographics.20.2.g00mc03321'
const MILLER_DOI = '10.1148/radiology.195.3.7754020'
const ASHMAN_DOI = '10.1148/radiographics.21.6.g01nv071425'
const ZANETTI_DOI = '10.1148/radiology.203.2.9114115'
const BENCARDINO_DOI = '10.2214/ajr.175.3.1750649'
const UMANS_DOI = '10.1007/s00256-014-1920-8'
const SANDERS_RATHUR_DOI = '10.1016/j.rcl.2008.09.001'
const SOBEL_DOI = '10.1177/107110079401500306'

const HAWKINS = <Cite doi={HAWKINS_DOI}>Hawkins, J Bone Joint Surg Am 1970</Cite>
const CANALE = <Cite doi={CANALE_DOI}>Canale and Kelly, J Bone Joint Surg Am 1978</Cite>
const SANDERS = <Cite doi={SANDERS_DOI}>Sanders et al., Clin Orthop Relat Res 1993</Cite>
const MYERSON = <Cite doi={MYERSON_DOI}>Myerson et al., Foot Ankle 1986</Cite>
const CASTRO = <Cite doi={CASTRO_DOI}>Castro et al., AJR 2010</Cite>
const RAIKIN = <Cite doi={RAIKIN_DOI}>Raikin et al., J Bone Joint Surg Am 2009</Cite>
const NEWMAN = <Cite doi={NEWMAN_DOI}>Newman and Newberg, Radiographics 2000</Cite>
const MILLER = <Cite doi={MILLER_DOI}>Miller et al., Radiology 1995</Cite>
const ASHMAN = <Cite doi={ASHMAN_DOI}>Ashman et al., Radiographics 2001</Cite>
const ZANETTI = <Cite doi={ZANETTI_DOI}>Zanetti et al., Radiology 1997</Cite>
const BENCARDINO = <Cite doi={BENCARDINO_DOI}>Bencardino et al., AJR 2000</Cite>
const UMANS = <Cite doi={UMANS_DOI}>Umans et al., Skeletal Radiol 2014</Cite>
const SANDERS_RATHUR = <Cite doi={SANDERS_RATHUR_DOI}>Sanders and Rathur, Radiol Clin North Am 2008</Cite>
const SOBEL = <Cite doi={SOBEL_DOI}>Sobel et al., Foot Ankle Int 1994</Cite>

const references: LessonReference[] = [
  { citation: 'Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002.', doi: HAWKINS_DOI },
  { citation: 'Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156.', doi: CANALE_DOI },
  { citation: 'Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95.', doi: SANDERS_DOI },
  { citation: 'Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242.', doi: MYERSON_DOI },
  { citation: 'Castro M, Melão L, Canella C, Weber M, Negrão P, Trudell D, Resnick D. Lisfranc joint ligamentous complex: MRI with anatomic correlation in cadavers. AJR Am J Roentgenol. 2010;195(6):W447-W455.', doi: CASTRO_DOI },
  { citation: 'Raikin SM, Elias I, Dheer S, Besser MP, Morrison WB, Zoga AC. Prediction of midfoot instability in the subtle Lisfranc injury. Comparison of magnetic resonance imaging with intraoperative findings. J Bone Joint Surg Am. 2009;91(4):892-899.', doi: RAIKIN_DOI },
  { citation: 'Newman JS, Newberg AH. Congenital tarsal coalition: multimodality evaluation with emphasis on CT and MR imaging. Radiographics. 2000;20(2):321-332.', doi: NEWMAN_DOI },
  { citation: 'Miller TT, Staron RB, Feldman F, Parisien M, Glucksman WJ, Gandolfo LH. The symptomatic accessory tarsal navicular bone: assessment with MR imaging. Radiology. 1995;195(3):849-853.', doi: MILLER_DOI },
  { citation: 'Ashman CJ, Klecker RJ, Yu JS. Forefoot pain involving the metatarsal region: differential diagnosis with MR imaging. Radiographics. 2001;21(6):1425-1440.', doi: ASHMAN_DOI },
  { citation: 'Zanetti M, Strehle JK, Zollinger H, Hodler J. Morton neuroma and fluid in the intermetatarsal bursae on MR images of 70 asymptomatic volunteers. Radiology. 1997;203(2):516-520.', doi: ZANETTI_DOI },
  { citation: 'Bencardino J, Rosenberg ZS, Beltran J, Liu X, Marty-Delfaut E. Morton\'s neuroma: is it always symptomatic? AJR Am J Roentgenol. 2000;175(3):649-653.', doi: BENCARDINO_DOI },
  { citation: 'Umans H, Srinivasan R, Elsinger E, Wilde GE. MRI of lesser metatarsophalangeal joint plantar plate tears and associated adjacent interspace lesions. Skeletal Radiol. 2014;43(10):1361-1368.', doi: UMANS_DOI },
  { citation: 'Sanders TG, Rathur SK. Imaging of painful conditions of the hallucal sesamoid complex and plantar capsular structures of the first metatarsophalangeal joint. Radiol Clin North Am. 2008;46(6):1079-1092.', doi: SANDERS_RATHUR_DOI },
  { citation: 'Sobel M, Pavlov H, Geppert MJ, Thompson FM, DiCarlo EF, Davis WH. Painful os peroneum syndrome: a spectrum of conditions responsible for plantar lateral foot pain. Foot Ankle Int. 1994;15(3):112-124.', doi: SOBEL_DOI },
]

const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (MTP) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

/** A two-column table of a shared classification, from its descriptions. */
function classTable<T extends string>(head: string, keys: T[], describe: (key: T) => string) {
  return (
    <div className="table-wrap">
      <table className="ref-table">
        <thead>
          <tr><th>{head}</th><th>Description</th></tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key}><td className="vessel-name">{key}</td><td>{upperFirst(describe(key))}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const hawkinsTable = classTable('Type', hawkinsTypes, (t) => hawkinsDescriptions[t])
const sandersTable = classTable('Type', sandersTypes, sandersDescription)
const myersonTable = classTable('Type', myersonTypes, (t) => `${myersonGroup(t)}: ${myersonDescriptions[t]}`)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. History, technique and the global look',
    body: (
      <>
        <p>This lesson is for the foot MRI that arrives with pain, or pain after an injury. It walks a fixed search pattern from the hindfoot to the toes, and uses the injury, when there is one, to decide where to look hardest. The order, the protocol checklist and the pointers from the history are this site's own; none of the papers below prescribes them.</p>
        <p>Check that the study covers the part of the foot in question, with planes along the long and short axes of the foot, fat-suppressed fluid-sensitive imaging for marrow edema, ligaments and tendons, and a T1-weighted sequence for fractures and marrow.</p>
        <p>After a twisting injury, look hardest at the Lisfranc ligaments and the base of the fifth metatarsal. After a fall from a height or a crush, look hardest at the talus and the calcaneus. With pain and no injury, look hardest for stress injury and the forefoot causes in steps 4 to 7.</p>
        <p>The ankle MRI study on this site covers the ankle ligaments, the tendons as they pass the malleoli, the sinus tarsi and the tarsal tunnel. This one picks up the hindfoot bones and works forward.</p>
      </>
    ),
  },
  {
    id: 'hindfoot',
    title: 'Step 2. Hindfoot and midfoot bones',
    body: (
      <>
        <h4>Talus</h4>
        <p>Give a talar neck fracture its Hawkins type ({HAWKINS}); Canale and Kelly added type IV ({CANALE}). The Hawkins calculator on this site applies the same rules.</p>
        {hawkinsTable}
        <p>The risk of osteonecrosis of the talar body rises with the type ({HAWKINS}; {CANALE}). On follow-up radiographs some 6 to 8 weeks after the injury, a band of subchondral lucency under the talar dome (the Hawkins sign) shows that the body is revascularising, so osteonecrosis is unlikely ({HAWKINS}).</p>
        <h4>Calcaneus</h4>
        <p>An intra-articular calcaneal fracture is typed by Sanders on the coronal CT image where the undersurface of the posterior facet is widest ({SANDERS}). MRI shows the fracture, but the type belongs to CT; give it from CT when there is one. The Sanders calculator on this site applies the same rules.</p>
        {sandersTable}
        <h4>Navicular and the other tarsal bones</h4>
        <p>Look at the navicular for a stress injury or fracture, then along the cuboid and the cuneiforms.</p>
        <h4>Tarsal coalition</h4>
        <p>Calcaneonavicular and talocalcaneal coalitions (the latter at the middle facet) are encountered most frequently. A coalition may be osseous, cartilaginous or fibrous, and CT and MRI tell osseous from non-osseous coalitions. On MRI look for irregular joint margins, and on STIR images for bone marrow edema along the margins of the abnormal articulation ({NEWMAN}).</p>
      </>
    ),
  },
  {
    id: 'lisfranc',
    title: 'Step 3. Lisfranc complex and the tarsometatarsal joints',
    body: (
      <>
        <p>The Lisfranc ligament complex has dorsal, interosseous and plantar ligaments. The interosseous ligament, from the medial cuneiform to the base of the second metatarsal, is the Lisfranc ligament proper and the strongest of the three ({CASTRO}). The plantar ligament runs between the first cuneiform and the bases of the second and third metatarsals ({RAIKIN}). Say which of the three is sprained or torn.</p>
        <p>In subtle Lisfranc injuries, disruption of that plantar ligament was the strongest MRI predictor of the instability found at surgery, and a rupture or grade-2 sprain of it is highly suggestive of an unstable midfoot ({RAIKIN}).</p>
        <p>Then check the alignment of each tarsometatarsal joint, and the gap between the medial cuneiform and the base of the second metatarsal.</p>
        <p>Type a fracture-dislocation by Myerson ({MYERSON}); the Myerson calculator on this site applies the same rules.</p>
        {myersonTable}
      </>
    ),
  },
  {
    id: 'metatarsals',
    title: 'Step 4. Metatarsals',
    body: (
      <>
        <p>A metatarsal stress injury shows as marrow edema, without a fracture line (stress reaction) or with a low-signal fracture line (stress fracture). It is commonest in the second and third metatarsals ({ASHMAN}).</p>
        <p>At the base of the fifth metatarsal, give the zone of a fracture. The fifth metatarsal page on this site sets out the three zones and the papers behind them.</p>
        <p>Freiberg infraction is osteonecrosis of a metatarsal head, most often the second, with flattening of the head ({ASHMAN}).</p>
      </>
    ),
  },
  {
    id: 'hallux',
    title: 'Step 5. First MTP joint and sesamoids',
    body: (
      <>
        <p>Turf toe is an injury of the plantar capsule and plantar plate of the first metatarsophalangeal (MTP) joint, from forced dorsiflexion ({SANDERS_RATHUR}).</p>
        <p>Look at both sesamoids. Marrow edema without a fracture line fits sesamoiditis. A fractured sesamoid has sharp, irregular margins, while a bipartite sesamoid has smooth, corticated margins, is often bilateral, and is usually the medial (tibial) one ({SANDERS_RATHUR}).</p>
        <p>Then note any degenerative change at the first MTP joint.</p>
      </>
    ),
  },
  {
    id: 'lesser-mtp',
    title: 'Step 6. Lesser MTP joints and plantar plates',
    body: (
      <>
        <p>Look at the plantar plate of each lesser MTP joint. Tears are commonest at the second MTP joint ({UMANS}).</p>
        <p>A plantar plate tear often comes with a lesion in the adjacent intermetatarsal space, pericapsular fibrosis, that can look like a Morton neuroma ({UMANS}). So read step 7 against this one.</p>
      </>
    ),
  },
  {
    id: 'interspaces',
    title: 'Step 7. Intermetatarsal spaces',
    body: (
      <>
        <p>Number the spaces by the metatarsals either side: the first lies between the first and second metatarsals, the third between the third and fourth.</p>
        <p>A Morton neuroma is commonest in the third space, then the second. It lies plantar to the deep transverse intermetatarsal ligament ({ASHMAN}), and shows as a low- to intermediate-signal-intensity soft-tissue mass in the intermetatarsal space ({BENCARDINO}). Measure its transverse diameter on short-axis images.</p>
        <p>Neuroma-like lesions were found in about a third of 70 volunteers without symptoms ({ZANETTI}). The diagnosis of Morton neuroma at MR imaging may be relevant only when the transverse diameter is 5 mm or more and can be correlated to clinical findings ({ZANETTI}). So a small neuroma is not by itself the cause of the pain.</p>
        <p>In the same volunteers, fluid in the intermetatarsal bursae measured 1 to 4 mm in transverse diameter, and none was found in the fourth space. Fluid collections in the first three bursae with a transverse diameter of 3 mm or less can be considered physiologic ({ZANETTI}). Treat more than that, or fluid in the fourth space, as a finding.</p>
      </>
    ),
  },
  {
    id: 'fascia',
    title: 'Step 8. Plantar fascia',
    body: (
      <>
        <p>Look at the plantar fascia from its calcaneal origin forward. The ankle MRI study on this site, step 11, sets out the findings of plantar fasciitis and the papers behind them; they are not repeated here.</p>
      </>
    ),
  },
  {
    id: 'tendons',
    title: 'Step 9. Tendons and their ossicles',
    body: (
      <>
        <p>Follow the tibialis posterior to its insertion on the navicular, the peroneus longus under the cuboid, the tibialis anterior to the medial cuneiform and first metatarsal, then the long flexors and extensors to the toes.</p>
        <p>An accessory navicular sits at the tibialis posterior insertion. In patients with focal medial foot pain, MRI showed a bone marrow edema pattern in the accessory navicular, and in some also in the adjacent navicular tuberosity; in a symptomatic accessory navicular it is indicative of chronic stress and/or osteonecrosis ({MILLER}).</p>
        <p>An os peroneum sits in the peroneus longus near the cuboid. Painful os peroneum syndrome is a spectrum: fracture or separation of the os peroneum, fraying or rupture of the peroneus longus beside it, and an enlarged peroneal tubercle ({SOBEL}).</p>
        <p>This site gives the accessory navicular and the os peroneum their own variant line, and a finding line when they are abnormal.</p>
      </>
    ),
  },
  {
    id: 'variants',
    title: 'Step 10. Variants',
    body: (
      <>
        <p>Besides the accessory navicular and the os peroneum (step 9), note an os trigonum, an os intermetatarseum, an os vesalianum, and a bipartite sesamoid (step 5).</p>
        <p>This site gives each variant its own impression line, so the referrer knows it was seen and judged.</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 11. Other findings and the impression',
    body: (
      <>
        <p>Read the steps against each other before writing the impression: the mechanism against the Lisfranc complex and the hindfoot bones, a plantar plate tear against a neuroma next to it, a marrow edema pattern against stress injury.</p>
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
  { value: 'sprain', label: 'Sprain (edema, fibres continuous)' },
  { value: 'tear', label: 'Torn' },
]
/** F3-3: Raikin counts a grade-2 sprain of the plantar ligament with a rupture. */
const plantarLigamentOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'sprain', label: 'Sprain, grade 1' },
  { value: 'sprain-2', label: 'Sprain, grade 2' },
  { value: 'tear', label: 'Torn' },
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
/** Space n lies between metatarsals n and n + 1. */
const spaceOptions: Option[] = [
  { value: '1', label: 'First intermetatarsal space' },
  { value: '2', label: 'Second intermetatarsal space' },
  { value: '3', label: 'Third intermetatarsal space' },
  { value: '4', label: 'Fourth intermetatarsal space' },
]
const metatarsalOptions: Option[] = [
  { value: '1', label: 'First metatarsal' },
  { value: '2', label: 'Second metatarsal' },
  { value: '3', label: 'Third metatarsal' },
  { value: '4', label: 'Fourth metatarsal' },
  { value: '5', label: 'Fifth metatarsal' },
]

const fields = {
  history: { id: 'history', kind: 'choice', label: 'History', required: true, options: [
    { value: 'pain', label: 'Pain, no injury given' },
    { value: 'twist', label: 'Twisting injury' },
    { value: 'axial', label: 'Fall from a height or crush' },
  ] },
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'Long- and short-axis planes, fat-suppressed PD or T2, and a T1.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'planes', label: 'Long- and short-axis planes' },
    { value: 'fs', label: 'Fat-suppressed PD or T2' },
    { value: 't1', label: 'A T1-weighted sequence' },
  ] },
  effusion: { id: 'effusion', kind: 'choice', label: 'Joint effusion', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'large', label: 'Large' },
  ] },
  effusionSite: { id: 'effusion-site', kind: 'text', label: 'Which joint', placeholder: 'e.g. second MTP joint', showIf: (v) => !['', 'none'].includes(str(v, 'effusion')) },
  marrow: { id: 'marrow', kind: 'choice', label: 'Bone marrow edema', required: true, options: nonePresent },
  marrowSite: { id: 'marrow-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. second metatarsal shaft', showIf: (v) => str(v, 'marrow') === 'present' },

  talus: { id: 'talus', kind: 'choice', label: 'Talar fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'neck', label: 'Talar neck fracture' },
    { value: 'other', label: 'Other talar fracture' },
  ] },
  hawkins: { id: 'hawkins', kind: 'choice', label: 'Hawkins type', showIf: (v) => str(v, 'talus') === 'neck', help: 'As in the Hawkins calculator.', options: hawkinsTypes.map((type) => ({ value: type, label: `${type}: ${hawkinsDescriptions[type]}` })) },
  talusText: { id: 'talus-text', kind: 'text', label: 'Talar fracture (describe)', placeholder: 'e.g. lateral process', showIf: (v) => str(v, 'talus') === 'other' },
  calcaneus: { id: 'calcaneus', kind: 'choice', label: 'Calcaneal fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'intra', label: 'Intra-articular (posterior facet)' },
    { value: 'extra', label: 'Extra-articular' },
    { value: 'stress', label: 'Stress fracture' },
  ] },
  sanders: { id: 'sanders', kind: 'choice', label: 'Sanders type', showIf: (v) => str(v, 'calcaneus') === 'intra', help: 'Typed on coronal CT; give it from CT when there is one. As in the Sanders calculator.', options: sandersTypes.map((type) => ({ value: type, label: `${type}: ${sandersDescription(type)}` })) },
  navicular: { id: 'navicular', kind: 'choice', label: 'Navicular', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'stress', label: 'Stress injury' },
    { value: 'fracture', label: 'Fracture' },
  ] },
  coalition: { id: 'coalition', kind: 'choice', label: 'Tarsal coalition', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'calcaneonavicular', label: 'Calcaneonavicular' },
    { value: 'talocalcaneal', label: 'Talocalcaneal (middle facet)' },
    { value: 'other', label: 'Other' },
  ] },
  coalitionKind: { id: 'coalition-kind', kind: 'choice', label: 'Coalition', showIf: (v) => !['', 'none'].includes(str(v, 'coalition')), options: [
    { value: 'osseous', label: 'Osseous' },
    { value: 'non-osseous', label: 'Non-osseous (fibrous or cartilaginous)' },
  ] },

  lisfrancDorsal: { id: 'lisfranc-dorsal', kind: 'choice', label: 'Dorsal Lisfranc ligament', required: true, options: ligamentOptions },
  lisfrancInterosseous: { id: 'lisfranc-interosseous', kind: 'choice', label: 'Interosseous Lisfranc ligament', required: true, help: 'Medial cuneiform to the second metatarsal base: the Lisfranc ligament proper.', options: ligamentOptions },
  lisfrancPlantar: { id: 'lisfranc-plantar', kind: 'choice', label: 'Plantar Lisfranc ligament', required: true, help: 'First cuneiform to the second and third metatarsal bases.', options: plantarLigamentOptions },
  tmt: { id: 'tmt', kind: 'choice', label: 'Tarsometatarsal alignment', required: true, options: [
    { value: 'aligned', label: 'Aligned' },
    { value: 'widened', label: 'Widened between the medial cuneiform and the second metatarsal base' },
    { value: 'dislocated', label: 'Fracture-dislocation' },
  ] },
  myerson: { id: 'myerson', kind: 'choice', label: 'Myerson type', showIf: (v) => str(v, 'tmt') === 'dislocated', help: 'As in the Myerson calculator.', options: myersonTypes.map((type) => ({ value: type, label: `${type}: ${myersonDescriptions[type]}` })) },

  stress: { id: 'stress', kind: 'choice', label: 'Metatarsal stress injury', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'reaction', label: 'Stress reaction (marrow edema, no fracture line)' },
    { value: 'fracture', label: 'Stress fracture (fracture line)' },
  ] },
  stressSites: { id: 'stress-sites', kind: 'multi', label: 'Which metatarsals', showIf: (v) => !['', 'none'].includes(str(v, 'stress')), options: metatarsalOptions },
  fifthBase: { id: 'fifth-base', kind: 'choice', label: 'Fifth metatarsal base fracture', required: true, help: 'Zones as on the fifth metatarsal page.', options: [
    { value: 'none', label: 'None' },
    { value: 'zone-1', label: 'Zone 1: tuberosity avulsion' },
    { value: 'zone-2', label: 'Zone 2: Jones fracture' },
    { value: 'zone-3', label: 'Zone 3: proximal diaphyseal stress fracture' },
  ] },
  freiberg: { id: 'freiberg', kind: 'choice', label: 'Metatarsal head osteonecrosis (Freiberg)', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'second', label: 'Second metatarsal head' },
    { value: 'third', label: 'Third metatarsal head' },
    { value: 'other', label: 'Another metatarsal head' },
  ] },

  halluxPlate: { id: 'hallux-plate', kind: 'choice', label: 'First MTP plantar plate (turf toe)', required: true, options: ligamentOptions },
  sesamoids: { id: 'sesamoids', kind: 'choice', label: 'Sesamoids', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'edema', label: 'Marrow edema, no fracture (sesamoiditis)' },
    { value: 'fracture', label: 'Fracture' },
  ] },
  sesamoidSide: { id: 'sesamoid-side', kind: 'choice', label: 'Which sesamoid', showIf: (v) => ['edema', 'fracture'].includes(str(v, 'sesamoids')), options: [
    { value: 'medial', label: 'Medial (tibial)' },
    { value: 'lateral', label: 'Lateral (fibular)' },
  ] },
  halluxArthritis: { id: 'hallux-arthritis', kind: 'choice', label: 'First MTP degenerative change', options: nonePresent },

  plate: { id: 'plate', kind: 'choice', label: 'Lesser MTP plantar plate', required: true, options: [
    { value: 'intact', label: 'Intact' },
    { value: 'partial', label: 'Partial tear' },
    { value: 'complete', label: 'Complete tear' },
  ] },
  plateJoint: { id: 'plate-joint', kind: 'choice', label: 'Which joint', showIf: (v) => ['partial', 'complete'].includes(str(v, 'plate')), options: [
    { value: '2', label: 'Second MTP joint' },
    { value: '3', label: 'Third MTP joint' },
    { value: '4', label: 'Fourth MTP joint' },
    { value: '5', label: 'Fifth MTP joint' },
  ] },
  mtpSynovitis: { id: 'mtp-synovitis', kind: 'choice', label: 'Lesser MTP synovitis', options: nonePresent },

  neuroma: { id: 'neuroma', kind: 'choice', label: 'Morton neuroma', required: true, options: nonePresent },
  neuromaSpace: { id: 'neuroma-space', kind: 'choice', label: 'Neuroma space', showIf: (v) => str(v, 'neuroma') === 'present', help: 'The first space lies between the first and second metatarsals.', options: spaceOptions },
  neuromaSize: { id: 'neuroma-size', kind: 'number', label: 'Neuroma transverse diameter', unit: 'mm', min: 0, max: 40, step: 0.5, showIf: (v) => str(v, 'neuroma') === 'present', help: 'On short-axis images.' },
  bursa: { id: 'bursa', kind: 'choice', label: 'Intermetatarsal bursal fluid', required: true, options: nonePresent },
  bursaSpace: { id: 'bursa-space', kind: 'choice', label: 'Bursa space', showIf: (v) => str(v, 'bursa') === 'present', options: spaceOptions },
  bursaSize: { id: 'bursa-size', kind: 'number', label: 'Bursal fluid transverse diameter', unit: 'mm', min: 0, max: 40, step: 0.5, showIf: (v) => str(v, 'bursa') === 'present' },

  plantarFascia: { id: 'plantar-fascia', kind: 'choice', label: 'Plantar fascia', required: true, help: 'Findings and papers as in the ankle MRI study, step 11.', options: [
    { value: 'normal', label: 'Normal' },
    { value: 'fasciitis', label: 'Features of plantar fasciitis' },
    { value: 'tear', label: 'Tear' },
  ] },

  tp: { id: 'tp', kind: 'choice', label: 'Tibialis posterior at the navicular', required: true, options: tendonOptions },
  accessoryNavicular: { id: 'accessory-navicular', kind: 'choice', label: 'Accessory navicular', options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
    { value: 'edema', label: 'Present, with marrow edema in it (and perhaps the adjacent navicular tuberosity)' },
  ] },
  pl: { id: 'pl', kind: 'choice', label: 'Peroneus longus at the cuboid', required: true, options: tendonOptions },
  osPeroneum: { id: 'os-peroneum', kind: 'choice', label: 'Os peroneum', options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present, normal' },
    { value: 'abnormal', label: 'Present, fractured, separated or edematous' },
  ] },
  ta: { id: 'ta', kind: 'choice', label: 'Tibialis anterior', required: true, options: tendonOptions },
  otherTendons: { id: 'other-tendons', kind: 'choice', label: 'Long flexors and extensors', required: true, options: normalAbnormal },
  otherTendonsText: { id: 'other-tendons-text', kind: 'text', label: 'Long flexors and extensors (describe)', showIf: (v) => str(v, 'other-tendons') === 'abnormal' },

  variants: { id: 'variants', kind: 'multi', label: 'Variants', help: 'Each gets its own impression line. The accessory navicular and os peroneum are entered with their tendons (step 9).', options: [
    { value: 'os-trigonum', label: 'Os trigonum' },
    { value: 'os-intermetatarseum', label: 'Os intermetatarseum' },
    { value: 'os-vesalianum', label: 'Os vesalianum' },
    { value: 'bipartite-sesamoid', label: 'Bipartite sesamoid' },
  ] },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. soft-tissue mass' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-lisfranc', label: 'No Lisfranc injury' },
    { value: 'no-plate', label: 'No plantar plate tear' },
    { value: 'no-tendon', label: 'No tendon tear' },
  ] },
} satisfies Record<string, Field>

/* Rule helpers shared by the chips, the report and the warnings. */

function typeOf<T extends string>(values: Values, id: string, types: T[], when: boolean): T | undefined {
  const value = str(values, id)
  return when && (types as string[]).includes(value) ? value as T : undefined
}

const hawkinsType = (values: Values): HawkinsType | undefined => typeOf(values, 'hawkins', hawkinsTypes, str(values, 'talus') === 'neck')
const sandersType = (values: Values): SandersType | undefined => typeOf(values, 'sanders', sandersTypes, str(values, 'calcaneus') === 'intra')
const myersonType = (values: Values): MyersonType | undefined => typeOf(values, 'myerson', myersonTypes, str(values, 'tmt') === 'dislocated')

const ordinal: Record<string, string> = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth' }

const lisfrancLigaments = [['lisfranc-dorsal', 'dorsal'], ['lisfranc-interosseous', 'interosseous'], ['lisfranc-plantar', 'plantar']] as const

/** F7-3: fluid of 3 mm or less in the first three bursae can be considered physiologic. */
function bursaWithinVolunteerRange(values: Values): boolean {
  const size = num(values, 'bursa-size')
  return str(values, 'bursa') === 'present' && size !== undefined && size <= 3 && ['1', '2', '3'].includes(str(values, 'bursa-space'))
}

/** F3-3: a rupture or grade-2 sprain of the plantar Lisfranc ligament. */
function plantarUnstable(values: Values): boolean {
  return ['tear', 'sprain-2'].includes(str(values, 'lisfranc-plantar'))
}

function variantSentences(values: Values): string[] {
  const out: string[] = []
  if (['present', 'edema'].includes(str(values, 'accessory-navicular'))) out.push('Accessory navicular (anatomical variant).')
  if (['present', 'abnormal'].includes(str(values, 'os-peroneum'))) out.push('Os peroneum (anatomical variant).')
  return [...out, ...chosen(values, fields.variants).map((label) => `${upperFirst(label)} (anatomical variant).`)]
}

function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

/* Rule chips. */

function deriveHindfoot(values: Values): Derived[] {
  const out: Derived[] = []
  // F2-1 (HK-): the Hawkins type from the shared logic.
  const hawkins = hawkinsType(values)
  if (hawkins) out.push({ label: 'Hawkins', value: `Type ${hawkins}`, tone: hawkins === 'I' ? 'neutral' : 'warn' })
  // F2-2 (SA-): the Sanders type from the shared logic.
  const sanders = sandersType(values)
  if (sanders) out.push({ label: 'Sanders', value: `Type ${sanders}`, tone: sanders === 'I' ? 'neutral' : 'warn' })
  return out
}

function deriveLisfranc(values: Values): Derived[] {
  const out: Derived[] = []
  // F3-3: "Rupture or grade-2 sprain of the plantar ligament ... is highly suggestive of an
  // unstable midfoot" (Raikin 2009).
  if (plantarUnstable(values)) out.push({ label: 'Plantar ligament', value: 'Rupture or grade-2 sprain: highly suggestive of an unstable midfoot', tone: 'warn' })
  // F3-4 (MY-): the Myerson type from the shared logic.
  const myerson = myersonType(values)
  if (myerson) out.push({ label: 'Myerson', value: `Type ${myerson} (${myersonGroup(myerson)})`, tone: 'warn' })
  return out
}

function deriveInterspaces(values: Values): Derived[] {
  const out: Derived[] = []
  // F7-2, F7-4: the diagnosis "may be relevant only when the transverse diameter is 5 mm or
  // more and can be correlated to clinical findings" (Zanetti 1997).
  const neuroma = num(values, 'neuroma-size')
  if (str(values, 'neuroma') === 'present' && neuroma !== undefined) {
    out.push(neuroma >= 5
      ? { label: 'Neuroma size', value: '5 mm or more: may be relevant if it can be correlated to clinical findings', tone: 'warn' }
      : { label: 'Neuroma size', value: 'Under 5 mm: below the size at which the diagnosis may be relevant' })
  }
  // F7-3: fluid of 3 mm or less in the first three bursae can be considered physiologic.
  const bursa = num(values, 'bursa-size')
  const space = str(values, 'bursa-space')
  if (str(values, 'bursa') === 'present' && bursa !== undefined && space) {
    if (space === '4') out.push({ label: 'Bursal fluid', value: 'Fourth space: volunteers without symptoms had none here' })
    else if (bursa <= 3) out.push({ label: 'Bursal fluid', value: '3 mm or less: can be considered physiologic', tone: 'good' })
    else out.push({ label: 'Bursal fluid', value: 'More than 3 mm: beyond the size considered physiologic', tone: 'warn' })
  }
  return out
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
    protocol === 'complete' && 'Technique: long- and short-axis planes, fat-suppressed PD/T2 and T1-weighted imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion, str(values, 'effusion') !== 'none' && str(values, 'effusion-site')),
    marrow === 'none' && 'Bone marrow: no edema',
    marrow === 'present' && `Bone marrow: edema${str(values, 'marrow-site') ? ` in ${str(values, 'marrow-site')}` : ''}`,
  ]
}

function hindfootLines(values: Values): (string | false)[] {
  const talus = str(values, 'talus')
  const hawkins = hawkinsType(values)
  const calcaneus = str(values, 'calcaneus')
  const sanders = sandersType(values)
  const coalition = str(values, 'coalition')
  return [
    talus === 'none' && 'Talus: no fracture',
    talus === 'neck' && `Talus: neck fracture${hawkins ? `, Hawkins ${hawkins}: ${hawkinsDescriptions[hawkins]}` : ''}`,
    talus === 'other' && `Talus: fracture${str(values, 'talus-text') ? `, ${str(values, 'talus-text')}` : ''}`,
    calcaneus === 'none' && 'Calcaneus: no fracture',
    calcaneus === 'intra' && `Calcaneus: intra-articular fracture${sanders ? `, Sanders ${sanders}: ${sandersDescription(sanders)}` : ''}`,
    calcaneus === 'extra' && 'Calcaneus: extra-articular fracture',
    calcaneus === 'stress' && 'Calcaneus: stress fracture',
    choiceLine(values, fields.navicular),
    coalition === 'none' && 'Tarsal coalition: none',
    coalition && coalition !== 'none' && `Tarsal coalition: ${join([picked(values, fields.coalition), picked(values, fields.coalitionKind)], ', ')}`,
  ]
}

function lisfrancLines(values: Values): (string | false)[] {
  const myerson = myersonType(values)
  return [
    choiceLine(values, fields.lisfrancDorsal),
    choiceLine(values, fields.lisfrancInterosseous),
    choiceLine(values, fields.lisfrancPlantar),
    choiceLine(values, fields.tmt, myerson && `Myerson ${myerson}`),
  ]
}

function metatarsalLines(values: Values): (string | false)[] {
  const sites = chosen(values, fields.stressSites)
  return [
    choiceLine(values, fields.stress, str(values, 'stress') !== 'none' && sites.length > 0 && sites.join(', ')),
    choiceLine(values, fields.fifthBase),
    choiceLine(values, fields.freiberg),
  ]
}

function forefootLines(values: Values): (string | false)[] {
  const sesamoids = str(values, 'sesamoids')
  return [
    choiceLine(values, fields.halluxPlate),
    choiceLine(values, fields.sesamoids, ['edema', 'fracture'].includes(sesamoids) && picked(values, fields.sesamoidSide)),
    choiceLine(values, fields.halluxArthritis),
    choiceLine(values, fields.plate, ['partial', 'complete'].includes(str(values, 'plate')) && picked(values, fields.plateJoint)),
    choiceLine(values, fields.mtpSynovitis),
    choiceLine(values, fields.neuroma, str(values, 'neuroma') === 'present' && join([
      picked(values, fields.neuromaSpace),
      num(values, 'neuroma-size') !== undefined && `${num(values, 'neuroma-size')} mm`,
    ], ', ')),
    choiceLine(values, fields.bursa, str(values, 'bursa') === 'present' && join([
      picked(values, fields.bursaSpace),
      num(values, 'bursa-size') !== undefined && `${num(values, 'bursa-size')} mm`,
    ], ', ')),
    choiceLine(values, fields.plantarFascia),
  ]
}

function tendonLines(values: Values): (string | false)[] {
  return [
    choiceLine(values, fields.tp),
    choiceLine(values, fields.accessoryNavicular),
    choiceLine(values, fields.pl),
    choiceLine(values, fields.osPeroneum),
    choiceLine(values, fields.ta),
    choiceLine(values, fields.otherTendons, str(values, 'other-tendons') === 'abnormal' && str(values, 'other-tendons-text')),
  ]
}

/* The impression: one sentence per abnormal finding, in search-pattern order, then the variants. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const effusion = str(values, 'effusion')
  if (effusion === 'moderate' || effusion === 'large') {
    const site = str(values, 'effusion-site')
    out.push(`${upperFirst(effusion)} joint effusion${site ? `, ${site}` : ''}.`)
  }
  if (str(values, 'marrow') === 'present') {
    const site = str(values, 'marrow-site')
    out.push(`Bone marrow edema${site ? ` in ${site}` : ''}.`)
  }

  const talus = str(values, 'talus')
  if (talus === 'neck') {
    const hawkins = hawkinsType(values)
    out.push(hawkins ? hawkinsSentence(hawkins) : 'Talar neck fracture.')
  }
  if (talus === 'other') out.push(`Talar fracture${str(values, 'talus-text') ? `: ${str(values, 'talus-text')}` : ''}.`)
  const calcaneus = str(values, 'calcaneus')
  if (calcaneus === 'intra') {
    const sanders = sandersType(values)
    out.push(sanders ? sandersSentence(sanders) : 'Intra-articular calcaneal fracture.')
  }
  if (calcaneus === 'extra') out.push('Extra-articular calcaneal fracture.')
  if (calcaneus === 'stress') out.push('Calcaneal stress fracture.')
  const navicular = str(values, 'navicular')
  if (navicular === 'stress') out.push('Navicular stress injury.')
  if (navicular === 'fracture') out.push('Navicular fracture.')
  const coalition = str(values, 'coalition')
  if (coalition && coalition !== 'none') {
    const name = coalition === 'other' ? 'Tarsal' : optionLabel(fields.coalition, coalition)
    const kind = picked(values, fields.coalitionKind).replace(/ \(.*\)$/, '')
    out.push(`${name} coalition${kind ? `, ${kind}` : ''}.`)
  }

  for (const [id, name] of lisfrancLigaments) {
    const status = str(values, id)
    const unstable = name === 'plantar' ? ', highly suggestive of an unstable midfoot' : ''
    if (status === 'sprain') out.push(`Sprain of the ${name} Lisfranc ligament.`)
    if (status === 'sprain-2') out.push(`Grade-2 sprain of the ${name} Lisfranc ligament${unstable}.`)
    if (status === 'tear') out.push(`Tear of the ${name} Lisfranc ligament${unstable}.`)
  }
  const tmt = str(values, 'tmt')
  if (tmt === 'widened') out.push('Widening between the medial cuneiform and the second metatarsal base.')
  if (tmt === 'dislocated') {
    const myerson = myersonType(values)
    out.push(myerson ? myersonSentence(myerson) : 'Tarsometatarsal (Lisfranc) fracture-dislocation.')
  }

  const stress = str(values, 'stress')
  if (stress === 'reaction' || stress === 'fracture') {
    const sites = chosen(values, fields.stressSites)
    out.push(`Metatarsal stress ${stress}${sites.length > 0 ? `: ${sites.join(', ')}` : ''}.`)
  }
  const fifth = str(values, 'fifth-base')
  if (fifth && fifth !== 'none') out.push(`Fifth metatarsal base fracture, ${picked(values, fields.fifthBase)}.`)
  const freiberg = str(values, 'freiberg')
  if (freiberg === 'second' || freiberg === 'third') out.push(`Osteonecrosis of the ${freiberg} metatarsal head (Freiberg infraction).`)
  if (freiberg === 'other') out.push('Osteonecrosis of a metatarsal head (Freiberg infraction).')

  const hallux = str(values, 'hallux-plate')
  if (hallux === 'sprain' || hallux === 'tear') out.push(`${upperFirst(hallux)} of the first MTP plantar plate (turf toe).`)
  const sesamoids = str(values, 'sesamoids')
  const side = picked(values, fields.sesamoidSide)
  const sesamoid = side ? `the ${side} sesamoid` : 'a sesamoid'
  if (sesamoids === 'edema') out.push(`Marrow edema in ${sesamoid}, without fracture (sesamoiditis).`)
  if (sesamoids === 'fracture') out.push(`Fracture of ${sesamoid}.`)
  if (str(values, 'hallux-arthritis') === 'present') out.push('Degenerative change at the first MTP joint.')

  const plate = str(values, 'plate')
  if (plate === 'partial' || plate === 'complete') {
    const joint = picked(values, fields.plateJoint)
    out.push(`${upperFirst(plate)} tear of the plantar plate of ${joint ? `the ${joint}` : 'a lesser MTP joint'}.`)
  }
  if (str(values, 'mtp-synovitis') === 'present') out.push('Lesser MTP joint synovitis.')
  if (str(values, 'neuroma') === 'present') {
    const space = picked(values, fields.neuromaSpace)
    const size = num(values, 'neuroma-size')
    out.push(`Morton neuroma${space ? ` in the ${space}` : ''}${size !== undefined ? `, ${size} mm` : ''}.`)
  }
  if (str(values, 'bursa') === 'present' && !bursaWithinVolunteerRange(values)) {
    const space = str(values, 'bursa-space')
    const size = num(values, 'bursa-size')
    out.push(`Fluid in the ${space ? `${ordinal[space]} ` : ''}intermetatarsal bursa${size !== undefined ? `, ${size} mm` : ''}.`)
  }
  const fascia = str(values, 'plantar-fascia')
  if (fascia === 'fasciitis') out.push('Features of plantar fasciitis.')
  if (fascia === 'tear') out.push('Plantar fascia tear.')

  for (const field of [fields.tp, fields.pl, fields.ta]) {
    const status = str(values, field.id)
    if (status && status !== 'normal') out.push(`${field.label}: ${picked(values, field)}.`)
  }
  if (str(values, 'other-tendons') === 'abnormal') out.push(`Long flexors and extensors: ${str(values, 'other-tendons-text') || 'abnormal'}.`)
  // F9-2: "The BMEP in a symptomatic accessory navicular bone is indicative of chronic stress
  // and/or osteonecrosis" (Miller 1995).
  if (str(values, 'accessory-navicular') === 'edema') out.push('Marrow edema in the accessory navicular; in a symptomatic accessory navicular this indicates chronic stress or osteonecrosis.')
  // F9-1: the painful os peroneum syndrome spectrum.
  if (str(values, 'os-peroneum') === 'abnormal') out.push('Os peroneum fractured, separated or edematous, in the spectrum of painful os peroneum syndrome.')
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous or tendinous abnormality of the foot.'

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
    str(values, 'talus') === 'neck' && 'talar neck fracture',
    str(values, 'talus') === 'other' && 'talar fracture',
    ['intra', 'extra', 'stress'].includes(str(values, 'calcaneus')) && 'calcaneal fracture',
    str(values, 'navicular') === 'fracture' && 'navicular fracture',
    str(values, 'tmt') === 'dislocated' && 'tarsometatarsal fracture-dislocation',
    str(values, 'stress') === 'fracture' && 'metatarsal stress fracture',
    !['', 'none'].includes(str(values, 'fifth-base')) && 'fifth metatarsal base fracture',
    str(values, 'sesamoids') === 'fracture' && 'sesamoid fracture',
  ].filter((item): item is string => Boolean(item))
  const lisfranc = [
    ...lisfrancLigaments.filter(([id]) => ['sprain', 'sprain-2', 'tear'].includes(str(values, id))).map(([id, name]) => `${name} Lisfranc ligament ${str(values, id) === 'sprain-2' ? 'grade-2 sprain' : str(values, id)}`),
    str(values, 'tmt') === 'widened' && 'medial cuneiform to second metatarsal widening',
    str(values, 'tmt') === 'dislocated' && 'tarsometatarsal fracture-dislocation',
  ].filter((item): item is string => Boolean(item))
  const plates = [
    str(values, 'hallux-plate') === 'tear' && 'first MTP plantar plate tear',
    ['partial', 'complete'].includes(str(values, 'plate')) && `lesser MTP plantar plate ${str(values, 'plate')} tear`,
  ].filter((item): item is string => Boolean(item))
  const tendons = ([['tp', 'tibialis posterior'], ['pl', 'peroneus longus'], ['ta', 'tibialis anterior']] as const)
    .filter(([id]) => str(values, id) === 'tear')
    .map(([, name]) => `${name} tear`)
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fractures],
    ['no-lisfranc', 'no Lisfranc injury', lisfranc],
    ['no-plate', 'no plantar plate tear', plates],
    ['no-tendon', 'no tendon tear', tendons],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  // F6-2: pericapsular fibrosis beside a torn plantar plate can look like a Morton neuroma.
  // The plate of MTP joint n borders spaces n - 1 and n.
  const joint = Number(str(values, 'plate-joint'))
  const space = Number(str(values, 'neuroma-space'))
  if (['partial', 'complete'].includes(str(values, 'plate')) && str(values, 'neuroma') === 'present' && joint && space && (space === joint - 1 || space === joint)) {
    out.push(`A plantar plate tear at the ${ordinal[joint]} MTP joint is entered next to a Morton neuroma in the ${ordinal[space]} intermetatarsal space. Pericapsular fibrosis beside a torn plate can look like a neuroma; check which it is.`)
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...hindfootLines(values),
    ...lisfrancLines(values),
    ...metatarsalLines(values),
    ...forefootLines(values),
    ...tendonLines(values),
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
    teach: <p>After a twisting injury, look hardest at the Lisfranc ligaments and the fifth metatarsal base; after a fall or crush, at the talus and calcaneus; with pain alone, for stress injury and the forefoot. The protocol checklist and these pointers are this site's own.</p>,
    fields: [fields.history, fields.protocol, fields.protocolMissing, fields.effusion, fields.effusionSite, fields.marrow, fields.marrowSite],
  },
  {
    id: 'hindfoot',
    title: 'Step 2. Hindfoot and midfoot bones',
    learn: 'hindfoot',
    teach: (
      <>
        <p>Hawkins types of talar neck fracture ({HAWKINS}; type IV {CANALE}):</p>
        {hawkinsTable}
        <p>Sanders types are read on the coronal CT image where the posterior facet is widest ({SANDERS}). The commonest coalitions are calcaneonavicular and talocalcaneal ({NEWMAN}).</p>
      </>
    ),
    fields: [fields.talus, fields.hawkins, fields.talusText, fields.calcaneus, fields.sanders, fields.navicular, fields.coalition, fields.coalitionKind],
    derive: deriveHindfoot,
  },
  {
    id: 'lisfranc',
    title: 'Step 3. Lisfranc complex and the tarsometatarsal joints',
    learn: 'lisfranc',
    teach: (
      <>
        <p>Dorsal, interosseous and plantar ligaments; the interosseous is the strongest ({CASTRO}). A rupture or grade-2 sprain of the plantar ligament is highly suggestive of an unstable midfoot ({RAIKIN}). Myerson types ({MYERSON}):</p>
        {myersonTable}
      </>
    ),
    fields: [fields.lisfrancDorsal, fields.lisfrancInterosseous, fields.lisfrancPlantar, fields.tmt, fields.myerson],
    derive: deriveLisfranc,
  },
  {
    id: 'metatarsals',
    title: 'Step 4. Metatarsals',
    learn: 'metatarsals',
    teach: <p>Stress injury is commonest in the second and third metatarsals; Freiberg infraction most often affects the second metatarsal head ({ASHMAN}). The fifth metatarsal page sets out the base zones.</p>,
    fields: [fields.stress, fields.stressSites, fields.fifthBase, fields.freiberg],
  },
  {
    id: 'hallux',
    title: 'Step 5. First MTP joint and sesamoids',
    learn: 'hallux',
    teach: <p>Turf toe injures the plantar plate of the first MTP joint. A fractured sesamoid has sharp, irregular margins; a bipartite one smooth, corticated margins ({SANDERS_RATHUR}).</p>,
    fields: [fields.halluxPlate, fields.sesamoids, fields.sesamoidSide, fields.halluxArthritis],
  },
  {
    id: 'lesser-mtp',
    title: 'Step 6. Lesser MTP joints and plantar plates',
    learn: 'lesser-mtp',
    teach: <p>Plantar plate tears are commonest at the second MTP joint, and fibrosis beside them can look like a Morton neuroma ({UMANS}).</p>,
    fields: [fields.plate, fields.plateJoint, fields.mtpSynovitis],
  },
  {
    id: 'interspaces',
    title: 'Step 7. Intermetatarsal spaces',
    learn: 'interspaces',
    teach: <p>Morton neuroma: third space, then second, plantar to the intermetatarsal ligament ({ASHMAN}). Found in a third of volunteers without symptoms; the diagnosis may be relevant only at 5 mm or more, with clinical correlation, and bursal fluid of 3 mm or less in the first three spaces can be considered physiologic ({ZANETTI}).</p>,
    fields: [fields.neuroma, fields.neuromaSpace, fields.neuromaSize, fields.bursa, fields.bursaSpace, fields.bursaSize],
    derive: deriveInterspaces,
  },
  {
    id: 'fascia',
    title: 'Step 8. Plantar fascia',
    learn: 'fascia',
    teach: <p>The findings of plantar fasciitis and their papers are in the ankle MRI study, step 11.</p>,
    fields: [fields.plantarFascia],
  },
  {
    id: 'tendons',
    title: 'Step 9. Tendons and their ossicles',
    learn: 'tendons',
    teach: <p>Marrow edema in a symptomatic accessory navicular indicates chronic stress or osteonecrosis ({MILLER}); the painful os peroneum spectrum ({SOBEL}).</p>,
    fields: [fields.tp, fields.accessoryNavicular, fields.pl, fields.osPeroneum, fields.ta, fields.otherTendons, fields.otherTendonsText],
  },
  {
    id: 'variants',
    title: 'Step 10. Variants',
    learn: 'variants',
    teach: <p>Each variant gets its own impression line, including the accessory navicular and os peroneum from step 9.</p>,
    fields: [fields.variants],
  },
  {
    id: 'impression',
    title: 'Step 11. Other findings and the impression',
    learn: 'impression',
    teach: <p>Read the steps against each other, then list the abnormal findings in search-pattern order and each variant on its own line.</p>,
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'foot-mri',
  name: 'Foot MRI',
  lede: 'Read a foot MRI for pain or injury: a fixed search pattern from the talus and calcaneus through the Lisfranc complex and metatarsals to the MTP joints, plantar plates and intermetatarsal spaces, then the tendons, variants and the report.',
  sourceNote: 'Unchecked draft: every reference has been matched on PubMed and Crossref, but the papers are paywalled, so the claims not stated in an abstract (among them Hawkins type IV and the Hawkins sign, the Sanders lines and subtypes, the Myerson types, the Lisfranc ligament anatomy, the stress injury, Freiberg, turf toe and sesamoid descriptions, and the site of a neuroma) have still not been checked against their papers. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'hawkins-iii',
      question: 'A displaced talar neck fracture has the talar body dislocated from both the subtalar and the ankle joint, with the talonavicular joint in place. Which Hawkins type is it?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 2,
      explanation: <p>Type III is displaced, with the body dislocated from both the subtalar and the ankle joint; type IV adds talonavicular subluxation or dislocation ({HAWKINS}; {CANALE}).</p>,
    },
    {
      id: 'hawkins-sign',
      question: 'Seven weeks after a talar neck fracture, radiographs show a band of subchondral lucency under the talar dome. What does it mean?',
      options: ['Osteonecrosis has set in', 'The talar body is revascularising, so osteonecrosis is unlikely', 'The fracture has failed to unite', 'Disuse osteoporosis of no significance'],
      answer: 1,
      explanation: <p>The Hawkins sign shows that the body still has a blood supply, so osteonecrosis is unlikely ({HAWKINS}).</p>,
    },
    {
      id: 'sanders-image',
      question: 'On which image is a calcaneal fracture given its Sanders type?',
      options: ['The lateral radiograph', 'The axial CT image through the calcaneocuboid joint', 'The coronal CT image where the posterior facet is widest', 'The sagittal MRI through the sinus tarsi'],
      answer: 2,
      explanation: <p>Sanders read the coronal CT image where the undersurface of the posterior facet is widest ({SANDERS}).</p>,
    },
    {
      id: 'sanders-i',
      question: 'The posterior facet has three fracture lines, but no fragment is displaced. What is the Sanders type?',
      options: ['Type I', 'Type II', 'Type III', 'Type IV'],
      answer: 0,
      explanation: <p>Type I covers every undisplaced articular fracture, whatever the number of fracture lines ({SANDERS}).</p>,
    },
    {
      id: 'lisfranc-strongest',
      question: 'Which part of the Lisfranc ligament complex is the strongest?',
      options: ['The dorsal ligament', 'The interosseous ligament, from the medial cuneiform to the second metatarsal base', 'The plantar ligament', 'The intermetatarsal ligament between the first and second bases'],
      answer: 1,
      explanation: <p>The interosseous ligament is the Lisfranc ligament proper and the strongest of the three ({CASTRO}).</p>,
    },
    {
      id: 'lisfranc-plantar',
      question: 'In a subtle Lisfranc injury, which MRI finding was the strongest predictor of midfoot instability at surgery?',
      options: ['Dorsal ligament sprain', 'Disruption of the plantar ligament', 'Marrow edema in the cuboid', 'Fluid in the first intermetatarsal bursa'],
      answer: 1,
      explanation: <p>Disruption of the plantar ligament between the first cuneiform and the second and third metatarsal bases was the strongest predictor; a rupture or grade-2 sprain of it is highly suggestive of an unstable midfoot ({RAIKIN}).</p>,
    },
    {
      id: 'myerson-c',
      question: 'The first metatarsal is displaced medially and all four lesser metatarsals laterally. What is the Myerson type?',
      options: ['A', 'B1', 'C1', 'C2'],
      answer: 3,
      explanation: <p>A divergent pattern with all the lesser metatarsals displaced is type C2; with only some of them, C1 ({MYERSON}).</p>,
    },
    {
      id: 'morton-space',
      question: 'Where is a Morton neuroma most often found?',
      options: ['The first intermetatarsal space, dorsal to the intermetatarsal ligament', 'The third intermetatarsal space, plantar to the deep transverse intermetatarsal ligament', 'The fourth intermetatarsal space, within the bursa', 'Under the second metatarsal head'],
      answer: 1,
      explanation: <p>It is commonest in the third space, then the second, plantar to the deep transverse intermetatarsal ligament ({ASHMAN}).</p>,
    },
    {
      id: 'morton-size',
      question: 'A 3 mm neuroma-like lesion is seen in the third space. What does the lesson caution?',
      options: ['It always explains the pain', 'Lesions like this are found in about a third of feet without symptoms; the diagnosis may be relevant only at 5 mm or more, with clinical correlation', 'It must be excised', 'It is an artefact'],
      answer: 1,
      explanation: <p>Neuroma-like lesions were found in about a third of volunteers without symptoms, and the diagnosis may be relevant only when the transverse diameter is 5 mm or more and can be correlated to clinical findings ({ZANETTI}).</p>,
    },
    {
      id: 'plate-mimic',
      question: 'A second MTP plantar plate tear is seen. What in the next intermetatarsal space can mimic a Morton neuroma?',
      options: ['A ganglion', 'Pericapsular fibrosis', 'An os intermetatarseum', 'A stress fracture'],
      answer: 1,
      explanation: <p>Plantar plate tears often come with pericapsular fibrosis in the adjacent intermetatarsal space, which can look like a Morton neuroma ({UMANS}).</p>,
    },
    {
      id: 'sesamoid',
      question: 'How is a bipartite sesamoid told from a fractured one?',
      options: ['It has smooth, corticated margins and is often bilateral', 'It has sharp, irregular margins', 'It is always the lateral sesamoid', 'It always shows marrow edema'],
      answer: 0,
      explanation: <p>A bipartite sesamoid has smooth, corticated margins, is often bilateral and usually the medial one; a fracture has sharp, irregular margins ({SANDERS_RATHUR}).</p>,
    },
    {
      id: 'freiberg',
      question: 'Which bone is most often affected by Freiberg infraction?',
      options: ['The navicular', 'The second metatarsal head', 'The medial sesamoid', 'The fifth metatarsal base'],
      answer: 1,
      explanation: <p>Freiberg infraction is osteonecrosis of a metatarsal head, most often the second ({ASHMAN}).</p>,
    },
  ],
}

export function FootMriStudyPage() {
  return <StudyPage study={study} />
}
