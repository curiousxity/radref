import type { ReactNode } from 'react'
import { Badge } from '../components/Badge'
import { Cite, LessonReferences } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { fifthMetatarsalScans } from '../data/scans/fifthMetatarsal'
import type { ScanImage } from '../data/scans/types'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Jones R. Fracture of the base of the fifth metatarsal bone by indirect violence. Ann Surg. 1902;35(6):697-700.' },
  { citation: 'Dameron TB. Fractures and anatomical variations of the proximal portion of the fifth metatarsal. J Bone Joint Surg Am. 1975;57(6):788-792.', doi: '10.2106/00004623-197557060-00010' },
  { citation: 'Torg JS, Balduini FC, Zelko RR, et al. Fractures of the base of the fifth metatarsal distal to the tuberosity. Classification and guidelines for non-surgical and surgical management. J Bone Joint Surg Am. 1984;66(2):209-214.', doi: '10.2106/00004623-198466020-00007' },
  { citation: 'Lehman RC, Torg JS, Pavlov H, DeLee JC. Fractures of the base of the fifth metatarsal distal to the tuberosity: a review. Foot Ankle. 1987;7(4):245-252.', doi: '10.1177/107110078700700406' },
  { citation: 'Smith JW, Arnoczky SP, Hersh A. The intraosseous blood supply of the fifth metatarsal: implications for proximal fracture healing. Foot Ankle. 1992;13(3):143-152.', doi: '10.1177/107110079201300306' },
  { citation: "Lawrence SJ, Botte MJ. Jones' fractures and related fractures of the proximal fifth metatarsal. Foot Ankle. 1993;14(6):358-365.", doi: '10.1177/107110079301400610' },
  { citation: 'Zwitser EW, Breederveld RS. Fractures of the fifth metatarsal; diagnosis and treatment. Injury. 2010;41(6):555-562.', doi: '10.1016/j.injury.2009.05.035' },
  { citation: 'Polzer H, Polzer S, Mutschler W, Prall WC. Acute fractures to the proximal fifth metatarsal bone: development of classification and treatment recommendations based on the current evidence. Injury. 2012;43(10):1626-1632.', doi: '10.1016/j.injury.2012.03.010' },
]

/*
 * Schematic dorsoplantar view of the lateral forefoot: proximal to the left, the fourth
 * metatarsal (medial) above, the fifth below it, the tuberosity flaring laterally and
 * proximally. Every figure on the page draws on this one set of outlines, so the zones
 * line up from figure to figure.
 */
const CUBOID = 'M18 50 L112 44 Q124 46 124 60 L124 156 Q122 168 108 168 L30 172 Q16 170 16 156 Z'
const MT4 = 'M126 40 Q160 32 192 42 Q230 52 270 52 L566 50 Q606 44 612 64 Q606 86 566 78 L270 74 Q236 76 210 88 L160 93 Q140 94 128 92 Z'
const MT5 = 'M128 100 L206 100 Q236 106 268 112 L560 114 Q604 108 612 128 Q604 150 560 144 L272 140 Q236 144 200 160 Q170 176 140 206 Q118 222 100 210 Q90 198 104 180 Q122 160 126 140 Z'

/** x-ranges of the zones along the fifth metatarsal; the 4-5 joint spans zone 2. */
const ZONES = [
  { key: 1, from: 60, to: 160, className: 'fm-zone1' },
  { key: 2, from: 160, to: 206, className: 'fm-zone2' },
  { key: 3, from: 206, to: 310, className: 'fm-zone3' },
]

type BonesProps = {
  /** Prefix for the clip path, marker and pattern ids, unique per figure. */
  id: string
  title: string
  viewBox?: string
  zones?: boolean
  children?: ReactNode
}

function Bones({ id, title, viewBox = '0 0 640 250', zones, children }: BonesProps) {
  return (
    <svg className="fm-svg" viewBox={viewBox} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <clipPath id={`${id}-mt5`}>
          <path d={MT5} />
        </clipPath>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" className="fm-arrowhead" />
        </marker>
        <pattern id={`${id}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" className="fm-hatch" />
        </pattern>
      </defs>
      <path d={CUBOID} className="fm-context" />
      <path d={MT4} className="fm-context" />
      <path d={MT5} className="fm-bone" />
      {zones && (
        <g clipPath={`url(#${id}-mt5)`}>
          {ZONES.map((zone) => (
            <rect key={zone.key} x={zone.from} y="90" width={zone.to - zone.from} height="140" className={zone.className} />
          ))}
        </g>
      )}
      <path d={MT5} className="fm-outline" />
      {children}
    </svg>
  )
}

/** The arrowhead marker reference for figure `id`. */
const arrow = (id: string) => `url(#${id}-arrow)`

function ZoneMap() {
  const id = 'fm-map'
  return (
    <Bones id={id} title="The fifth metatarsal divided into zone 1 (tuberosity), zone 2 (at the 4-5 intermetatarsal joint) and zone 3 (proximal shaft), with the distal shaft beyond">
      <rect x="160" y="93" width="46" height="7" className="fm-joint" />
      <path d="M183 92 L200 26" className="fm-leader" />
      <text x="204" y="26" className="fm-label">4–5 joint</text>
      <circle cx="120" cy="182" r="14" className="fm-chip fm-chip1" />
      <text x="120" y="188" className="fm-chip-text">1</text>
      <circle cx="183" cy="128" r="14" className="fm-chip fm-chip2" />
      <text x="183" y="134" className="fm-chip-text">2</text>
      <circle cx="258" cy="126" r="14" className="fm-chip fm-chip3" />
      <text x="258" y="132" className="fm-chip-text">3</text>
      <path d="M420 152 L420 166 L540 166 L540 152" className="fm-bracket" />
      <text x="480" y="188" className="fm-label fm-center">distal shaft</text>
      <text x="40" y="112" className="fm-label fm-small">cuboid</text>
      <text x="420" y="40" className="fm-label fm-small">4th</text>
      <text x="330" y="102" className="fm-label fm-small">5th</text>
      <path d="M206 226 L310 226" className="fm-dim" markerStart={arrow(id)} markerEnd={arrow(id)} />
      <text x="258" y="246" className="fm-label fm-small fm-center">≈1.5 cm</text>
      <text x="630" y="232" className="fm-label fm-small fm-end">proximal ← → distal</text>
    </Bones>
  )
}

function Zone1Figure() {
  const id = 'fm-z1'
  return (
    <Bones id={id} viewBox="0 20 360 230" title="Zone 1: the tuberosity pulled off by the peroneus brevis and lateral band of the plantar fascia, the fracture line running into the cuboid joint">
      <polyline points="150,186 143,173 139,160 132,147 126,134" className="fm-fracture" />
      <path d="M104 214 L44 232" className="fm-pull" markerEnd={arrow(id)} />
      <text x="140" y="240" className="fm-label fm-small">tendon pull</text>
      <text x="180" y="40" className="fm-label fm-small">inversion</text>
    </Bones>
  )
}

function Zone2Figure() {
  const id = 'fm-z2'
  return (
    <Bones id={id} viewBox="0 20 360 230" title="Zone 2: a transverse fracture at the metaphyseal-diaphyseal junction running into the 4-5 intermetatarsal joint, from adduction of the forefoot">
      <rect x="160" y="93" width="46" height="7" className="fm-joint" />
      <polyline points="182,170 187,152 181,134 187,116 183,100" className="fm-fracture" />
      <path d="M320 200 L320 152" className="fm-pull" markerEnd={arrow(id)} />
      <text x="350" y="222" className="fm-label fm-small fm-end">adduction</text>
      <path d="M183 92 L214 40" className="fm-leader" />
      <text x="218" y="40" className="fm-label fm-small">into 4–5 joint</text>
    </Bones>
  )
}

function Zone3Figure() {
  const id = 'fm-z3'
  return (
    <Bones id={id} viewBox="0 20 360 230" title="Zone 3: a stress fracture of the proximal shaft beyond the 4-5 joint, with periosteal new bone along the lateral cortex">
      <rect x="160" y="93" width="46" height="7" className="fm-joint" />
      <polyline points="252,142 257,132 252,122 256,112" className="fm-fracture" />
      <path d="M228 146 Q234 154 242 148 Q250 156 258 148 Q266 156 274 147 Q280 152 284 144" className="fm-callus" />
      {[226, 256, 286].map((x) => (
        <path key={x} d={`M${x} 214 L${x} 172`} className="fm-load" markerEnd={arrow(id)} />
      ))}
      <text x="256" y="240" className="fm-label fm-small fm-center">repeated loading</text>
    </Bones>
  )
}

function DancerFigure() {
  const id = 'fm-dancer'
  return (
    <Bones id={id} viewBox="280 20 360 230" title="Distal shaft: a long spiral or oblique fracture from twisting on a plantarflexed foot">
      <polyline points="414,142 440,133 466,125 494,114" className="fm-fracture" />
      <path d="M590 176 A44 44 0 0 1 520 190" className="fm-pull" markerEnd={arrow(id)} />
      <text x="456" y="222" className="fm-label fm-small fm-center">twisting</text>
    </Bones>
  )
}

function BloodSupplyFigure() {
  const id = 'fm-blood'
  return (
    <Bones id={id} title="Blood supply: the nutrient artery enters the mid-shaft and runs back toward the base, metaphyseal vessels supply the base, and the two meet poorly at the metaphyseal-diaphyseal junction">
      <g clipPath={`url(#${id}-mt5)`}>
        <rect x="170" y="90" width="48" height="140" fill={`url(#${id}-hatch)`} />
      </g>
      <path d="M392 82 Q388 100 386 120" className="fm-vessel" />
      <path d="M386 124 Q300 120 226 126" className="fm-vessel" markerEnd={arrow(id)} />
      <path d="M386 124 Q470 128 560 128" className="fm-vessel" markerEnd={arrow(id)} />
      <path d="M78 176 L120 168" className="fm-vessel" markerEnd={arrow(id)} />
      <path d="M86 226 L118 200" className="fm-vessel" markerEnd={arrow(id)} />
      <path d="M100 126 L136 124" className="fm-vessel" markerEnd={arrow(id)} />
      <text x="392" y="76" className="fm-label fm-small fm-center">nutrient artery</text>
      <text x="16" y="238" className="fm-label fm-small">metaphyseal vessels</text>
      <path d="M194 150 L232 214" className="fm-leader" />
      <text x="236" y="226" className="fm-label fm-small">watershed</text>
    </Bones>
  )
}

function ApophysisFigure() {
  const id = 'fm-apo'
  return (
    <Bones id={id} viewBox="60 90 220 150" title="The normal apophysis of a child: a thin sliver of bone along the side of the tuberosity, its growth plate parallel to the shaft">
      <path d="M104 192 Q148 176 196 156" className="fm-physis" />
      <text x="170" y="214" className="fm-label fm-small">parallel</text>
    </Bones>
  )
}

function AvulsionFigure() {
  const id = 'fm-avul'
  return (
    <Bones id={id} viewBox="60 90 220 150" title="A tuberosity fracture: the line runs across the tuberosity, transverse to the shaft">
      <polyline points="150,188 146,172 140,156 134,140" className="fm-fracture" />
      <text x="170" y="214" className="fm-label fm-small">across</text>
    </Bones>
  )
}

function OssiclesFigure() {
  const id = 'fm-oss'
  return (
    <Bones id={id} viewBox="0 100 260 150" title="Accessory ossicles: the os peroneum beside the cuboid and the os vesalianum just proximal to the tuberosity, both smooth and fully corticated">
      <ellipse cx="62" cy="194" rx="13" ry="9" className="fm-ossicle" />
      <ellipse cx="82" cy="224" rx="10" ry="7" className="fm-ossicle" />
      <text x="20" y="182" className="fm-label fm-small">os peroneum</text>
      <text x="100" y="244" className="fm-label fm-small">os vesalianum</text>
    </Bones>
  )
}

type FractureCard = {
  name: string
  aka: string
  badge: { label: string; tone: 'good' | 'accent' | 'warn' }
  figure: ReactNode
  /** Real examples beside the drawing; none for the dancer's fracture yet. */
  images?: ScanImage[]
  where: string
  how: string
  matters: string
}

const fractures: FractureCard[] = [
  {
    name: 'Zone 1: tuberosity avulsion',
    aka: 'pseudo-Jones',
    badge: { label: 'Heals well', tone: 'good' },
    figure: <Zone1Figure />,
    images: [fifthMetatarsalScans.zone1],
    where: 'The tuberosity, proximal to the 4–5 intermetatarsal joint. The line may run into the joint with the cuboid, but not into the 4–5 joint.',
    how: 'Inversion of the hindfoot with the foot plantarflexed: the ankle-sprain mechanism. The peroneus brevis and the lateral band of the plantar fascia, both attached to the tuberosity, pull the fragment off.',
    matters: 'The commonest of the group, and it usually heals. Most are treated with weight bearing as tolerated in a stiff-soled shoe or boot. Fixation is kept for a markedly displaced fragment or a large step in the cuboid joint.',
  },
  {
    name: 'Zone 2: Jones fracture',
    aka: 'acute metaphyseal-diaphyseal fracture',
    badge: { label: 'Watershed: may not unite', tone: 'accent' },
    figure: <Zone2Figure />,
    images: [fifthMetatarsalScans.zone2],
    where: 'The metaphyseal-diaphyseal junction, running into the 4–5 intermetatarsal joint. This is the fracture Robert Jones described in 1902, his own among the cases.',
    how: 'A large adduction force on the forefoot with the ankle plantarflexed. The base is held tight by the ligaments to the fourth metatarsal and the cuboid, so the bone bends and breaks just beyond them.',
    matters: 'It lies in the watershed of the blood supply, so delayed union and nonunion are well recognised. The choice is a non-weight-bearing cast for roughly 6–8 weeks or an intramedullary screw, which is often offered to athletes and active patients for a quicker, more reliable return.',
  },
  {
    name: 'Zone 3: proximal diaphyseal stress fracture',
    aka: 'often still called a "Jones"',
    badge: { label: 'Stress: slow to heal', tone: 'warn' },
    figure: <Zone3Figure />,
    images: [fifthMetatarsalScans.zone3],
    where: 'The proximal shaft, distal to the 4–5 joint, within about 1.5 cm of it.',
    how: 'Repetitive loading rather than one injury, typically in running and jumping athletes. There is often a prodrome of lateral foot pain for weeks before the fracture completes. A cavovarus foot loads this cortex more.',
    matters: 'It shares the poor blood supply and adds chronic stress, so healing is slow. The Torg type (below) guides treatment: an acute type I may go in a non-weight-bearing cast, while delayed union or nonunion is usually fixed.',
  },
  {
    name: 'Distal shaft spiral fracture',
    aka: "dancer's fracture",
    badge: { label: 'Usually heals', tone: 'good' },
    figure: <DancerFigure />,
    where: 'The distal half of the shaft, often long and spiral or oblique. It lies outside the three proximal zones.',
    how: 'Rolling over onto the outside of a plantarflexed foot, classically a dancer coming off demi-pointe, which twists the shaft.',
    matters: 'Despite how it looks, it usually heals with functional treatment, even with some displacement. Name it for what it is, so it is not managed like a Jones.',
  },
]

const torgTypes = [
  { type: 'I: acute', xray: 'Narrow line, sharp margins, no sclerosis of the medullary canal, little periosteal reaction.', meaning: 'A fresh fracture.' },
  { type: 'II: delayed union', xray: 'Widened line, periosteal new bone, sclerosis in the medullary canal.', meaning: 'Healing has stalled.' },
  { type: 'III: nonunion', xray: 'The medullary canal is closed off by sclerotic bone at the fracture.', meaning: 'Will not heal without intervention.' },
]

const comparison = [
  { name: 'Tuberosity avulsion (zone 1)', where: 'Tuberosity; may enter the cuboid joint', how: 'Acute inversion', healing: 'Reliable', usual: 'Weight bearing as tolerated in a stiff shoe or boot' },
  { name: 'Jones fracture (zone 2)', where: 'Metaphyseal-diaphyseal junction; enters the 4–5 joint', how: 'Acute forefoot adduction', healing: 'Watershed; delayed union and nonunion recognised', usual: 'Non-weight-bearing cast, or intramedullary screw' },
  { name: 'Stress fracture (zone 3)', where: 'Proximal shaft, distal to the 4–5 joint', how: 'Repetitive loading', healing: 'Slow; graded by Torg type', usual: 'Cast for type I; fixation for types II–III' },
  { name: "Dancer's fracture", where: 'Distal shaft, spiral or oblique', how: 'Twist on a plantarflexed foot', healing: 'Reliable', usual: 'Functional treatment' },
]

export function FifthMetatarsalPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Quick reference</p>
          <h2>Fifth metatarsal fractures</h2>
          <p>
            A break at the base of the fifth metatarsal can be a sprain-like injury that heals in a shoe, or a fracture that may never unite without
            a screw. A few millimetres decide which. Where the line sits relative to the joint with the fourth metatarsal tells them apart, and the
            blood supply explains why it matters.
          </p>
          <p className="source-note">
            Drafted from the cited papers and not yet reviewed by the site author. The drawings are schematics, not to scale. Treatment notes summarise
            the cited reviews; follow local orthopaedic practice.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Find the 4–5 joint first</h3>
        <figure className="fm-figure">
          <ZoneMap />
          <figcaption>
            Dorsoplantar view, proximal to the left. The fourth metatarsal (above) is medial, and the tuberosity flares laterally. The zones follow{' '}
            <Cite doi="10.1177/107110079301400610">Lawrence and Botte (1993)</Cite>.
          </figcaption>
        </figure>
        <ScanFigures images={[fifthMetatarsalScans.zones]} wide />
        <ul className="plain-list">
          <li><strong>Zone 1</strong> is proximal to the joint between the fourth and fifth metatarsal bases: the tuberosity.</li>
          <li><strong>Zone 2</strong> is at that joint, the metaphyseal-diaphyseal junction. A zone 2 line runs <em>into</em> the 4–5 joint.</li>
          <li><strong>Zone 3</strong> is just beyond it, the proximal shaft for about 1.5 cm.</li>
          <li>
            Older papers call zone 2 and zone 3 fractures alike "Jones" fractures (<Cite doi="10.1177/107110078700700406">Lehman 1987</Cite>), which is
            why the name is used loosely. Naming the zone avoids the ambiguity.
          </li>
        </ul>
      </section>

      <section className="info-card">
        <h3>The four fractures</h3>
        <div className="fm-cards">
          {fractures.map((fracture) => (
            <article key={fracture.name} className="fm-card">
              <figure className="fm-figure">{fracture.figure}</figure>
              <div className="fm-card-head">
                <h4>{fracture.name}</h4>
                <Badge label={fracture.badge.label} tone={fracture.badge.tone} />
              </div>
              <p className="fm-aka">{fracture.aka}</p>
              <dl className="fm-facts">
                <dt>Where</dt>
                <dd>{fracture.where}</dd>
                <dt>Why it forms</dt>
                <dd>{fracture.how}</dd>
                <dt>Why it matters</dt>
                <dd>{fracture.matters}</dd>
              </dl>
              {fracture.images && <ScanFigures images={fracture.images} />}
            </article>
          ))}
        </div>
        <p className="source-note">
          Mechanisms from <Cite doi="10.1177/107110079301400610">Lawrence and Botte (1993)</Cite> and{' '}
          <Cite doi="10.1016/j.injury.2009.05.035">Zwitser and Breederveld (2010)</Cite>; treatment from the reviews by Zwitser and{' '}
          <Cite doi="10.1016/j.injury.2012.03.010">Polzer (2012)</Cite>.
        </p>
      </section>

      <section className="info-card">
        <h3>Why zones 2 and 3 heal poorly</h3>
        <figure className="fm-figure">
          <BloodSupplyFigure />
          <figcaption>
            After <Cite doi="10.1177/107110079201300306">Smith, Arnoczky and Hersh (1992)</Cite>.
          </figcaption>
        </figure>
        <ul className="plain-list">
          <li>A single nutrient artery enters the medial side of the mid-shaft and splits, one branch running back toward the base.</li>
          <li>The base and tuberosity have their own metaphyseal vessels, entering from around the joint and the tendon attachments.</li>
          <li>
            The two systems meet at the metaphyseal-diaphyseal junction, leaving a relatively poorly supplied watershed. A zone 2 or 3 fracture cuts the
            nutrient branch off from the base, so the bone either side of the line is short of blood. The tuberosity, supplied from its own vessels, is
            spared.
          </li>
        </ul>

        <h4 className="fm-subhead">Torg grading of the proximal shaft</h4>
        <p className="fm-lead">
          <Cite doi="10.2106/00004623-198466020-00007">Torg and colleagues (1984)</Cite> graded fractures distal to the tuberosity on the radiograph.
          These are the signs to describe for any zone 2 or 3 line.
        </p>
        <div className="table-wrap">
          <table className="ref-table fm-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Radiograph</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {torgTypes.map((row) => (
                <tr key={row.type}>
                  <td className="vessel-name">{row.type}</td>
                  <td>{row.xray}</td>
                  <td>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Side by side</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Fracture</th>
                <th>Where</th>
                <th>Mechanism</th>
                <th>Healing</th>
                <th>Usual treatment</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.name}>
                  <td className="vessel-name">{row.name}</td>
                  <td>{row.where}</td>
                  <td>{row.how}</td>
                  <td>{row.healing}</td>
                  <td>{row.usual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Not every line is a fracture</h3>
        <div className="fm-mimics">
          <figure className="fm-figure">
            <ApophysisFigure />
            <figcaption><strong>Apophysis.</strong> In children, roughly 9 to 14 years old, a thin shell of bone along the side of the tuberosity. Its lucent growth plate runs parallel to the shaft.</figcaption>
          </figure>
          <figure className="fm-figure">
            <AvulsionFigure />
            <figcaption><strong>Fracture.</strong> A tuberosity fracture runs across the bone, roughly transverse to the shaft, with sharp uncorticated edges.</figcaption>
          </figure>
          <figure className="fm-figure">
            <OssiclesFigure />
            <figcaption><strong>Accessory ossicles.</strong> The os peroneum, in the peroneus longus tendon beside the cuboid, and the rarer os vesalianum, proximal to the tuberosity. Both are smooth, round and corticated all the way round.</figcaption>
          </figure>
        </div>
        <ScanFigures images={[fifthMetatarsalScans.apophysis, fifthMetatarsalScans.ununitedFragment, fifthMetatarsalScans.osVesalianum, fifthMetatarsalScans.osPeroneum]} />
        <p className="source-note">
          Normal variants described by <Cite doi="10.2106/00004623-197557060-00010">Dameron (1975)</Cite>.
        </p>
      </section>

      <section className="info-card">
        <h3>What to put in the report</h3>
        <ul className="plain-list">
          <li>Check the fifth metatarsal base on every ankle series. A zone 1 fracture presents as an ankle sprain, and the base is often at the edge of the film.</li>
          <li>Name the zone, or say whether the line is proximal to, into, or distal to the 4–5 intermetatarsal joint. "Jones" on its own is ambiguous.</li>
          <li>For zone 1, say whether the line enters the joint with the cuboid, and give the displacement and any articular step.</li>
          <li>For zone 2 or 3, describe the Torg signs: width of the line, sclerosis of the margins or the medullary canal, and periosteal new bone. Those turn an apparently acute fracture into a stress fracture with delayed union.</li>
          <li>In a child, decide between apophysis and fracture by the direction of the line before calling it.</li>
        </ul>
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
