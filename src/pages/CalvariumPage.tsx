import type { ReactNode } from 'react'
import { Badge } from '../components/Badge'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { CALVARIUM_SOURCES, CC_BY, calvariumImages } from '../data/calvariumImages'
import type { CalvariumImage } from '../data/calvariumImages'

const GOMEZ = CALVARIUM_SOURCES.gomez.doi
const PONS = CALVARIUM_SOURCES.pons.doi
const SIDERIS = '10.3390/brainsci13040587'

const references: LessonReference[] = [
  { citation: 'Gomez CK, Schiffman SR, Bhatt AA. Radiological review of skull lesions. Insights Imaging. 2018;9(5):857-882.', doi: GOMEZ },
  { citation: 'Pons Escoda A, Naval Baudin P, Mora P, et al. Imaging of skull vault tumors in adults. Insights Imaging. 2020;11(1):23.', doi: PONS },
  { citation: 'Sideris G, Davoutis E, Panagoulis E, et al. A systematic review of intracranial complications in adults with Pott puffy tumor over four decades. Brain Sci. 2023;13(4):587.', doi: SIDERIS },
]

/*
 * Schematic cross-section through the skull vault, outside at the top: scalp, outer table,
 * diploe, inner table, dura and brain. Every figure draws on these same bands, so a lesion's
 * position (which table, which side) reads the same from card to card.
 */
const OUTER = 50
const DIPLOE = 62
const INNER = 96
const INNER_SURFACE = 108

type VaultProps = {
  /** Prefix for the pattern ids, unique per figure. */
  id: string
  title: string
  viewBox?: string
  /** Width of the slab; the anatomy figure leaves room on the right for labels. */
  width?: number
  children?: ReactNode
}

function Vault({ id, title, viewBox = '0 0 320 190', width = 320, children }: VaultProps) {
  return (
    <svg className={`cv-svg${width < 320 ? ' cv-svg-narrow' : ''}`} viewBox={viewBox} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <pattern id={`${id}-dots`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" className="cv-dot" />
          <circle cx="6.5" cy="6.5" r="1.3" className="cv-dot" />
        </pattern>
        <pattern id={`${id}-fat`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" className="cv-fat-line" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={width} height={OUTER} className="cv-soft" />
      <rect x="0" y={INNER_SURFACE} width={width} height={190 - INNER_SURFACE} className="cv-brain" />
      <rect x="0" y={OUTER} width={width} height={INNER_SURFACE - OUTER} className="cv-bone" />
      <rect x="0" y={DIPLOE} width={width} height={INNER - DIPLOE} fill={`url(#${id}-dots)`} />
      <line x1="0" y1={DIPLOE} x2={width} y2={DIPLOE} className="cv-faint" />
      <line x1="0" y1={INNER} x2={width} y2={INNER} className="cv-faint" />
      <line x1="0" y1={OUTER} x2={width} y2={OUTER} className="cv-edge" />
      <line x1="0" y1={INNER_SURFACE} x2={width} y2={INNER_SURFACE} className="cv-edge" />
      <line x1="0" y1={INNER_SURFACE + 3} x2={width} y2={INNER_SURFACE + 3} className="cv-dura" />
      {children}
    </svg>
  )
}

/**
 * A short label with a leader line from the point (x1, y1) to the start of the text, whose
 * left end sits at (x2, y2) with the line through its middle. Labels are kept short enough
 * to fit inside the 320-wide drawing.
 */
function Label({ x1, y1, x2, y2, children }: { x1: number; y1: number; x2: number; y2: number; children: string }) {
  // Mono 13px is about 7.8 units a character; a target to the right of the text takes the
  // line from the text's right end, so the line never crosses the words.
  const textEnd = x2 + children.length * 7.8
  const attach = x1 > textEnd ? textEnd + 3 : x2 - 3
  return (
    <>
      <line x1={x1} y1={y1} x2={attach} y2={y2} className="cv-leader" />
      <text x={x2} y={y2 + 4} className="cv-label">{children}</text>
    </>
  )
}

function LayersFigure() {
  return (
    <Vault id="cv-layers" viewBox="0 0 470 190" width={300} title="Cross-section of the skull vault: scalp, outer table, diploe, inner table, dura and brain">
      <Label x1={270} y1={25} x2={316} y2={25}>scalp</Label>
      <Label x1={270} y1={56} x2={316} y2={52}>outer table</Label>
      <Label x1={270} y1={79} x2={316} y2={79}>diploë (marrow)</Label>
      <Label x1={270} y1={102} x2={316} y2={104}>inner table</Label>
      <Label x1={270} y1={111} x2={316} y2={128}>dura</Label>
      <Label x1={270} y1={150} x2={316} y2={156}>brain</Label>
    </Vault>
  )
}

function ArachnoidFigure() {
  return (
    <Vault id="cv-ag" title="Arachnoid granulation: a smooth CSF-filled notch in the inner table, opening onto a dural venous sinus">
      <path d="M200 111 L300 111 L250 150 Z" className="cv-blood" />
      <path d="M232 110 Q232 84 250 82 Q268 84 268 110 Z" className="cv-csf cv-rim" />
      <Label x1={238} y1={96} x2={70} y2={150}>CSF in the notch</Label>
      <text x="250" y="174" className="cv-label cv-center">venous sinus</text>
    </Vault>
  )
}

function VenousLakeFigure() {
  return (
    <Vault id="cv-vl" title="Venous lake and channel: an oval lucency in the diploe along the inner table, with a winding channel running to it">
      <path d="M118 63 Q104 72 124 80 Q142 86 140 92" className="cv-channel" />
      <ellipse cx="164" cy="95" rx="28" ry="11" className="cv-vessel" />
      <Label x1={178} y1={100} x2={200} y2={150}>lake: enhances</Label>
      <Label x1={114} y1={68} x2={40} y2={22}>channel</Label>
    </Vault>
  )
}

function ParietalForaminaFigure() {
  return (
    <Vault id="cv-pf" title="Enlarged parietal foramina: two symmetric full-thickness defects either side of the midline">
      <line x1="160" y1="4" x2="160" y2="132" className="cv-midline" />
      {[86, 214].map((x) => (
        <path key={x} d={`M${x} ${OUTER} Q${x + 2} 79 ${x - 2} ${INNER_SURFACE} L${x + 22} ${INNER_SURFACE} Q${x + 18} 79 ${x + 20} ${OUTER} Z`} className="cv-hole cv-rim" />
      ))}
      <text x="160" y="150" className="cv-label cv-center">symmetric, both sides</text>
      <text x="166" y="22" className="cv-label">midline</text>
    </Vault>
  )
}

function HyperostosisFigure() {
  return (
    <Vault id="cv-hfi" title="Hyperostosis frontalis interna: lumpy thickening of the inner table only, the outer table unchanged">
      <path d="M0 108 L40 108 Q58 130 78 112 Q98 136 122 114 Q144 138 168 114 Q190 134 212 112 Q234 128 256 108 L320 108 L320 96 L0 96 Z" className="cv-bone cv-edge-fill" />
      <Label x1={146} y1={128} x2={180} y2={160}>inner table only</Label>
    </Vault>
  )
}

function BurrHoleFigure() {
  return (
    <Vault id="cv-bh" title="Burr hole: a round defect through both tables with clean straight walls">
      <rect x="142" y={OUTER} width="36" height={INNER_SURFACE - OUTER} className="cv-hole" />
      <line x1="142" y1={OUTER} x2="142" y2={INNER_SURFACE} className="cv-edge" />
      <line x1="178" y1={OUTER} x2="178" y2={INNER_SURFACE} className="cv-edge" />
      <Label x1={178} y1={80} x2={204} y2={150}>both tables</Label>
    </Vault>
  )
}

function EpidermoidFigure() {
  return (
    <Vault id="cv-ep" title="Epidermoid cyst: a round lucency in the diploe that expands and thins both tables, with a smooth sclerotic rim">
      <ellipse cx="160" cy="79" rx="46" ry="37" className="cv-bone cv-edge-fill" />
      <ellipse cx="160" cy="79" rx="38" ry="30" className="cv-fluid cv-rim" />
      <Label x1={194} y1={92} x2={210} y2={150}>sclerotic rim</Label>
      <text x="160" y="84" className="cv-label cv-center">DWI ↑</text>
    </Vault>
  )
}

function DermoidFigure() {
  const id = 'cv-de'
  return (
    <Vault id={id} title="Dermoid cyst: a midline lesion containing fat, involving the outer table and the soft tissue over it">
      <line x1="160" y1="4" x2="160" y2="186" className="cv-midline" />
      <ellipse cx="160" cy="56" rx="38" ry="26" className="cv-soft-mass cv-rim" />
      <ellipse cx="160" cy="56" rx="38" ry="26" fill={`url(#${id}-fat)`} />
      <Label x1={194} y1={66} x2={216} y2={150}>fat, midline</Label>
    </Vault>
  )
}

function HemangiomaFigure() {
  const spokes = [-150, -120, -90, -60, -30, 0, 180, 30, 150]
  return (
    <Vault id="cv-he" title="Intraosseous hemangioma: the outer table bulges over a lucent lesion with coarse trabeculae radiating like spokes; the inner table is spared">
      <ellipse cx="160" cy="74" rx="48" ry="34" className="cv-bone cv-edge-fill" />
      <rect x="100" y={INNER} width="120" height={INNER_SURFACE - INNER} className="cv-bone" />
      <line x1="100" y1={INNER_SURFACE} x2="220" y2={INNER_SURFACE} className="cv-edge" />
      <ellipse cx="160" cy="74" rx="40" ry="22" className="cv-hole" />
      {spokes.map((angle) => {
        const r = (angle * Math.PI) / 180
        return <line key={angle} x1="160" y1="74" x2={160 + 38 * Math.cos(r)} y2={74 + 20 * Math.sin(r)} className="cv-spoke" />
      })}
      <Label x1={200} y1={56} x2={176} y2={18}>outer table bulges</Label>
      <Label x1={190} y1={104} x2={176} y2={150}>inner table spared</Label>
    </Vault>
  )
}

function LchFigure() {
  return (
    <Vault id="cv-lch" title="Langerhans cell histiocytosis: a punched-out hole with bevelled edges, the two tables destroyed to different widths, with a central button sequestrum and no sclerotic rim">
      <ellipse cx="160" cy="36" rx="44" ry="18" className="cv-enhance" />
      <path d={`M140 ${OUTER} L180 ${OUTER} L204 ${INNER_SURFACE} L116 ${INNER_SURFACE} Z`} className="cv-hole cv-thin" />
      <ellipse cx="160" cy="80" rx="9" ry="6" className="cv-bone cv-edge-fill" />
      <Label x1={192} y1={86} x2={212} y2={150}>bevelled edge</Label>
      <Label x1={152} y1={82} x2={16} y2={150}>button sequestrum</Label>
      <text x="212" y="30" className="cv-label">soft tissue</text>
    </Vault>
  )
}

function MetastasisFigure() {
  return (
    <Vault id="cv-me" title="Metastasis: a destructive hole with a soft-tissue mass inside and outside the skull">
      <ellipse cx="160" cy="80" rx="58" ry="62" className="cv-enhance" />
      <path d={`M126 ${OUTER} L134 58 L128 70 L138 84 L130 98 L140 ${INNER_SURFACE} L186 ${INNER_SURFACE} L178 96 L190 82 L180 68 L192 58 L184 ${OUTER} Z`} className="cv-hole cv-thin" />
      <Label x1={128} y1={30} x2={8} y2={14}>soft-tissue mass</Label>
      <Label x1={186} y1={84} x2={206} y2={160}>bone destroyed</Label>
    </Vault>
  )
}

function MyelomaFigure() {
  const holes = [[46, 79, 11], [104, 76, 8], [168, 82, 12], [226, 74, 7], [284, 80, 10]]
  return (
    <Vault id="cv-my" title="Myeloma: many small round punched-out holes of different sizes with sharp edges and no sclerotic rim">
      {holes.map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} className="cv-hole cv-thin" />
      ))}
      <text x="160" y="150" className="cv-label cv-center">many, punched out, no rim</text>
    </Vault>
  )
}

function OsteomyelitisFigure() {
  return (
    <Vault id="cv-om" title="Osteomyelitis: eroded irregular bone with a collection under the scalp periosteum and an epidural collection beneath the inner table">
      <path d={`M110 ${OUTER} Q160 18 210 ${OUTER} Z`} className="cv-pus" />
      <path d={`M120 ${INNER_SURFACE + 3} Q160 140 200 ${INNER_SURFACE + 3} Z`} className="cv-pus" />
      {[[136, 70, 7], [158, 84, 9], [182, 68, 6], [172, 98, 5], [146, 96, 5]].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} className="cv-hole cv-thin" />
      ))}
      <Label x1={124} y1={40} x2={8} y2={14}>subperiosteal abscess</Label>
      <Label x1={186} y1={122} x2={190} y2={160}>epidural abscess</Label>
    </Vault>
  )
}

function OsteomaFigure() {
  return (
    <Vault id="cv-os" title="Osteoma: a dense, smooth bony dome stuck on the outer table, with no soft tissue">
      <path d={`M112 ${OUTER} Q160 4 208 ${OUTER} Z`} className="cv-dense" />
      <Label x1={192} y1={36} x2={226} y2={16}>dense bone</Label>
    </Vault>
  )
}

function FibrousDysplasiaFigure() {
  return (
    <Vault id="cv-fd" title="Fibrous dysplasia: the diploe is widened by hazy ground-glass tissue, bulging the outer table more than the inner">
      <path d={`M70 ${OUTER} Q160 4 250 ${OUTER} L250 ${INNER_SURFACE} Q160 122 70 ${INNER_SURFACE} Z`} className="cv-bone cv-edge-fill" />
      <path d={`M80 ${OUTER + 2} Q160 16 240 ${OUTER + 2} L240 ${INNER} Q160 108 80 ${INNER} Z`} className="cv-ground" />
      <Label x1={100} y1={36} x2={8} y2={14}>outer table bulges</Label>
      <Label x1={170} y1={74} x2={200} y2={160}>ground glass</Label>
    </Vault>
  )
}

function PagetFigure() {
  const blobs = [[40, 70], [86, 84], [128, 66], [176, 80], [222, 64], [268, 82], [300, 70]]
  return (
    <Vault id="cv-pa" title="Paget disease: the whole vault is thickened and widened, with fluffy cotton-wool densities in the diploe">
      <rect x="0" y="26" width="320" height="104" className="cv-bone" />
      <rect x="0" y="40" width="320" height="76" fill="url(#cv-pa-dots)" />
      <line x1="0" y1="26" x2="320" y2="26" className="cv-edge" />
      <line x1="0" y1="130" x2="320" y2="130" className="cv-edge" />
      {blobs.map(([cx, cy]) => (
        <ellipse key={cx} cx={cx} cy={cy} rx="14" ry="10" className="cv-cotton" />
      ))}
      <text x="160" y="160" className="cv-label cv-center">thick vault, cotton wool</text>
    </Vault>
  )
}

function MeningiomaFigure() {
  return (
    <Vault id="cv-mn" title="Meningioma: an enhancing dural-based mass with dural tails, and spiculated thickening of the inner table above it">
      <path d={`M100 ${INNER_SURFACE} L110 118 L120 ${INNER_SURFACE} L130 120 L140 ${INNER_SURFACE} L150 122 L160 ${INNER_SURFACE} L170 122 L180 ${INNER_SURFACE} L190 120 L200 ${INNER_SURFACE} L210 118 L220 ${INNER_SURFACE} L220 96 L100 96 Z`} className="cv-bone cv-edge-fill" />
      <path d={`M104 ${INNER_SURFACE + 14} Q160 196 216 ${INNER_SURFACE + 14} Z`} className="cv-enhance" />
      <line x1="40" y1={INNER_SURFACE + 13} x2="104" y2={INNER_SURFACE + 13} className="cv-tail" />
      <line x1="216" y1={INNER_SURFACE + 13} x2="280" y2={INNER_SURFACE + 13} className="cv-tail" />
      <Label x1={212} y1={114} x2={220} y2={24}>hyperostosis</Label>
      <text x="290" y="140" className="cv-label cv-end">dural tail</text>
      <text x="160" y="160" className="cv-label cv-center">mass</text>
    </Vault>
  )
}

type Lesion = {
  name: string
  aka?: string
  badge: { label: string; tone: 'good' | 'accent' | 'warn' }
  figure: ReactNode
  images?: CalvariumImage[]
  who: ReactNode
  look: ReactNode
  tell: ReactNode
}

const VARIANT = { label: 'Normal variant', tone: 'good' } as const
const BENIGN = { label: 'Benign', tone: 'accent' } as const
const MALIGNANT = { label: 'Malignant', tone: 'warn' } as const

const variants: Lesion[] = [
  {
    name: 'Arachnoid granulation',
    aka: 'pacchionian granulation',
    badge: VARIANT,
    figure: <ArachnoidFigure />,
    images: [calvariumImages.arachnoidGranulation],
    who: <>The most common pseudolesion (<Cite doi={PONS}>Pons Escoda</Cite>), more frequent with age (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>A sharply marginated notch through the inner table, often with a sclerotic rim, at CSF density on CT and CSF signal on every MRI sequence. It does not enhance (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
    tell: <>It sits against a dural venous sinus: most often the middle and lateral transverse sinus, then the superior sagittal sinus. Inside the sinus it is a round filling defect that can mimic thrombosis.</>,
  },
  {
    name: 'Venous channels and lakes',
    badge: VARIANT,
    figure: <VenousLakeFigure />,
    images: [calvariumImages.venousLake],
    who: <>Normal emissary and diploic veins; they become more prominent with age (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
    look: <>Channels are winding or straight lucencies with sclerotic borders. A lake is a round or oval lucency, often along the inner table (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    tell: <>Lakes enhance intensely on CT and MRI. Channels can be mistaken for a suture or a fracture. In older patients, granulations, channels and small meningoceles often coexist and can be misread as multiple lytic lesions such as myeloma.</>,
  },
  {
    name: 'Enlarged parietal foramina',
    badge: VARIANT,
    figure: <ParietalForaminaFigure />,
    images: [calvariumImages.parietalForamina],
    who: <>Congenital, from gene deletions on chromosome 11p. They may be isolated or part of a syndrome with cortical dysplasia and vascular and skeletal anomalies (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
    look: <>Bone defects in the parietal bones.</>,
    tell: <>They are bilateral and symmetric, either side of the midline.</>,
  },
  {
    name: 'Hyperostosis frontalis interna',
    badge: VARIANT,
    figure: <HyperostosisFigure />,
    images: [calvariumImages.hyperostosisFrontalis],
    who: <>Much more common in women (16.4% versus 7% of men), and linked with age, obesity, parity and DISH (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
    look: <>Irregular, lumpy thickening of the inner table of the frontal bone (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    tell: <>Inner table only, in the frontal bone. Meningioma also thickens bone, but next to a dural-based mass (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
  },
  {
    name: 'Burr hole',
    badge: VARIANT,
    figure: <BurrHoleFigure />,
    images: [calvariumImages.burrHoleCt, calvariumImages.burrHole3d],
    who: <>Previous neurosurgery or drainage.</>,
    look: <>A well-defined defect through both the inner and outer tables. On contrast-enhanced MRI the margins usually enhance (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    tell: <>A sharp defect through both tables, with a history of surgery.</>,
  },
]

const lucent: Lesion[] = [
  {
    name: 'Epidermoid cyst',
    badge: BENIGN,
    figure: <EpidermoidFigure />,
    images: [calvariumImages.epidermoidCt, calvariumImages.epidermoidDwi],
    who: <>Usually 20 to 50 years old. Congenital, or acquired after surgery or trauma. A painless lump that grows over years (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>A well-defined lucency in the diploë with a smooth sclerotic rim, expanding and thinning both tables. Most often lateral, in the parietal or frontal bone.</>,
    tell: <>Fluid signal on T1 and T2 with restricted diffusion, and no enhancement. Bright on DWI is the key sign; a history of injury helps (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Dermoid cyst',
    badge: BENIGN,
    figure: <DermoidFigure />,
    images: [calvariumImages.dermoid],
    who: <>Usually in the first three decades (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>An expansile lytic lesion, typically in the midline near the anterior fontanelle, often with a soft-tissue part. It may contain calcification.</>,
    tell: <>Midline and fat: fat density on CT, fat signal on T1, with thick peripheral enhancement. It can also restrict diffusion (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Intraosseous hemangioma',
    aka: 'osseous venous malformation',
    badge: BENIGN,
    figure: <HemangiomaFigure />,
    images: [calvariumImages.hemangioma],
    who: <>Usually in the 4th and 5th decades, more often in women; frontal and parietal bones. About 15% are multiple (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>A well-defined lucency in the diploë that expands the outer table and spares the inner table. Thickened trabeculae radiate from a centre: "sunburst", "spoke-wheel" or "honeycomb".</>,
    tell: <>The radiating trabeculae, with T1 and T2 bright fat and vascular tissue and diffuse enhancement on MRI. Rarely the spicules break through the outer table and look like an aggressive periosteal reaction (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Langerhans cell histiocytosis',
    aka: 'eosinophilic granuloma',
    badge: BENIGN,
    figure: <LchFigure />,
    images: [calvariumImages.lch],
    who: <>Mainly children; the reviews give the peak as 1 to 3 years (<Cite doi={PONS}>Pons Escoda</Cite>) and 6 to 10 years (<Cite doi={GOMEZ}>Gomez</Cite>). Parietal or frontal; may be tender.</>,
    look: <>A punched-out lytic hole with bevelled edges, because the two tables are destroyed to different widths ("hole within a hole"). There may be a central "button sequestrum" and a soft-tissue mass. Usually no sclerotic rim.</>,
    tell: <>A child, a bevelled edge and a button sequestrum. It enhances strongly, often with dural or galeal enhancement, and becomes sclerotic as it heals (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
  },
  {
    name: 'Metastasis',
    badge: MALIGNANT,
    figure: <MetastasisFigure />,
    images: [calvariumImages.metastasis],
    who: <>The commonest malignant bone tumour in adults, usually after 50. In adults most often from breast; in children from neuroblastoma (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>Usually multiple lytic lesions with a soft-tissue mass. A single expansile "blow-out" lesion suggests renal or thyroid cancer; sclerotic ones suggest prostate or breast.</>,
    tell: <>Destruction with a soft-tissue mass and a known cancer. MRI shows dural and intracranial spread (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Multiple myeloma',
    badge: MALIGNANT,
    figure: <MyelomaFigure />,
    images: [calvariumImages.myeloma],
    who: <>Older adults (median age 68 to 70), rarely under 40 (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
    look: <>Many "punched-out" lytic lesions with sharp edges and no sclerotic rim; they can merge. MRI shows marrow infiltration, most often a "salt and pepper" pattern (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    tell: <>Many sharp holes with no rim. Multiple lytic lesions in an older patient are myeloma or metastases until proven otherwise; some authors note mandibular lesions favour myeloma (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Osteomyelitis',
    aka: 'Pott puffy tumour, in the frontal bone',
    badge: { label: 'Infection', tone: 'warn' },
    figure: <OsteomyelitisFigure />,
    images: [calvariumImages.osteomyelitis],
    who: <>Usually from paranasal sinus infection (<Cite doi={PONS}>Pons Escoda</Cite>). In the frontal bone, after frontal sinusitis or head trauma (<Cite doi={SIDERIS}>Sideris</Cite>).</>,
    look: <>Pott puffy tumour is forehead swelling from a subperiosteal abscess over frontal bone osteomyelitis. CT shows the bone erosion and any epidural or subdural collection; MRI shows intracranial involvement.</>,
    tell: <>An infected sinus next to eroded bone, with collections either side of it. About 30% of adults in the systematic review had intracranial complications, mostly epidural abscess or empyema.</>,
  },
]

const dense: Lesion[] = [
  {
    name: 'Osteoma',
    badge: BENIGN,
    figure: <OsteomaFigure />,
    images: [calvariumImages.osteoma],
    who: <>The most frequent benign tumour in adults, most often in men in their 40s and 50s (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>A well-defined, homogeneous, dense bony lump attached to the outer table, sessile or on a stalk. Rarely on the inner table.</>,
    tell: <>No soft tissue and no enhancement, which separates an inner-table osteoma from an ossified meningioma. Multiple osteomas suggest Gardner syndrome.</>,
  },
  {
    name: 'Fibrous dysplasia',
    badge: BENIGN,
    figure: <FibrousDysplasiaFigure />,
    images: [calvariumImages.fibrousDysplasia],
    who: <>Adolescents and young adults; monostotic in about 70%. Frontal and temporal bones; it may cross sutures (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>An expansile lesion in the diploë with a "ground-glass" matrix, affecting the outer table more than the inner.</>,
    tell: <>Ground glass on CT. In the vault, lytic parts are more common, so the ground glass can be overlooked, and on MRI it is T2 dark and enhances, which can mislead: check the CT (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Paget disease',
    badge: BENIGN,
    figure: <PagetFigure />,
    images: [calvariumImages.paget],
    who: <>Older adults; the skull is involved in 28 to 42% of cases, mostly frontal and occipital (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>Early, large lucent areas ("osteoporosis circumscripta"). Then an enlarged vault with thick tables, a widened diploë and fluffy "cotton-wool" densities. Late, dense sclerosis.</>,
    tell: <>The whole vault is bigger and thicker. Sarcoma develops in 5 to 10% with widespread disease and under 1% with limited disease; an adult skull osteosarcoma is usually secondary, so look for pagetic or irradiated bone nearby (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
  {
    name: 'Meningioma',
    aka: 'hyperostosis, or intraosseous meningioma',
    badge: BENIGN,
    figure: <MeningiomaFigure />,
    images: [calvariumImages.meningioma],
    who: <>Middle-aged and older adults. Intraosseous meningioma is under 2% of meningiomas (<Cite doi={GOMEZ}>Gomez</Cite>).</>,
    look: <>A dural-based meningioma typically thickens the bone next to it (reactive hyperostosis). An intraosseous meningioma is sclerotic with spiculated, irregular borders; the rare lytic ones are more often malignant.</>,
    tell: <>An avidly enhancing extra-axial mass with dural tails and calcification, and hyperostosis of the bone next to it. Its bone change varies, though, and can be lytic, permeative or look like an aggressive periosteal reaction (<Cite doi={PONS}>Pons Escoda</Cite>).</>,
  },
]

const sideBySide = [
  { name: 'Arachnoid granulation', where: 'Inner table, at a venous sinus', edge: 'Smooth, sclerotic', sign: 'CSF on every sequence', who: 'More with age' },
  { name: 'Venous lake', where: 'Diploë, often along the inner table', edge: 'Round or oval', sign: 'Enhances', who: 'More with age' },
  { name: 'Parietal foramina', where: 'Both tables, parietal', edge: 'Defect', sign: 'Bilateral and symmetric', who: 'Congenital' },
  { name: 'Burr hole', where: 'Both tables', edge: 'Well defined', sign: 'Surgical history', who: 'After surgery' },
  { name: 'Epidermoid', where: 'Diploë, expands both tables', edge: 'Sclerotic rim', sign: 'Restricted diffusion', who: '20–50 years' },
  { name: 'Dermoid', where: 'Midline, near the anterior fontanelle', edge: 'Expansile', sign: 'Fat', who: 'Under 30' },
  { name: 'Hemangioma', where: 'Diploë, bulges the outer table', edge: 'Well circumscribed', sign: 'Spoke-wheel trabeculae', who: '4th–5th decade' },
  { name: 'LCH', where: 'Both tables, unequally', edge: 'Bevelled, usually no rim', sign: 'Button sequestrum', who: 'Children' },
  { name: 'Metastasis', where: 'Any', edge: 'Variable', sign: 'Soft-tissue mass; known cancer', who: 'Over 50' },
  { name: 'Myeloma', where: 'Diploë, many', edge: 'Sharp, no rim', sign: 'Punched out, multiple', who: 'Median 68–70' },
  { name: 'Osteomyelitis', where: 'Frontal, next to the sinus', edge: 'Eroded', sign: 'Subperiosteal or epidural pus', who: 'Sinusitis or trauma' },
  { name: 'Osteoma', where: 'On the outer table', edge: 'Well defined', sign: 'Dense, no soft tissue', who: 'Adults' },
  { name: 'Fibrous dysplasia', where: 'Diploë, outer table more', edge: 'Expansile', sign: 'Ground glass', who: 'Young' },
  { name: 'Paget disease', where: 'Whole vault', edge: 'Diffuse', sign: 'Thick vault, cotton wool', who: 'Older adults' },
  { name: 'Meningioma', where: 'Inner table over a dural mass', edge: 'Spiculated', sign: 'Hyperostosis, dural tail', who: 'Middle-aged and older' },
]

/** Table 2 of Pons Escoda et al., "Approach to lytic skull vault lesions". */
const lyticApproach = [
  { clue: 'Young patient', think: 'Fibrous dysplasia (ground-glass matrix); eosinophilic granuloma (button sequestrum)' },
  { clue: 'Elderly and multiple', think: 'Metastasis; plasma-cell myeloma' },
  { clue: 'Bone-expanding', think: 'Fibrous dysplasia (ground-glass matrix); hemangioma (spoke wheel); giant cell tumour (hypervascular, flow voids); aneurysmal bone cyst (fluid levels)' },
  { clue: 'Restricts diffusion', think: 'Epidermal inclusion cyst (previous trauma); dermoid cyst (fat)' },
]

function Photo({ image }: { image: CalvariumImage }) {
  const source = CALVARIUM_SOURCES[image.source]
  return (
    <figure className="cv-photo">
      <img src={image.src} alt={image.alt} loading="lazy" />
      <figcaption>
        {image.caption} From <Cite doi={source.doi}>{source.short}</Cite>, {image.figure}, cropped ({CC_BY}).
      </figcaption>
    </figure>
  )
}

function LesionCards({ lesions }: { lesions: Lesion[] }) {
  return (
    <div className="fm-cards">
      {lesions.map((lesion) => (
        <article key={lesion.name} className="fm-card">
          <figure className="fm-figure">{lesion.figure}</figure>
          <div className="fm-card-head">
            <h4>{lesion.name}</h4>
            <Badge label={lesion.badge.label} tone={lesion.badge.tone} />
          </div>
          {lesion.aka && <p className="fm-aka">{lesion.aka}</p>}
          <dl className="fm-facts">
            <dt>Who</dt>
            <dd>{lesion.who}</dd>
            <dt>Look for</dt>
            <dd>{lesion.look}</dd>
            <dt>Tells it apart</dt>
            <dd>{lesion.tell}</dd>
          </dl>
          {lesion.images && (
            <div className="cv-photos">
              {lesion.images.map((image) => <Photo key={image.src} image={image} />)}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

export function CalvariumPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>Calvarial lesions</h2>
          <p>
            Most skull vault lesions are found by chance, and most are benign. Which table is involved, what the edge looks like, what is inside, how
            many there are and how old the patient is will usually narrow the list to one or two.
          </p>
          <p className="source-note">
            Drafted from the cited reviews. The drawings are schematics, not to scale. The scans are single
            panels cropped from open-access figures published under CC BY licences, credited under each one; the arrows are the original authors'.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Read the vault in layers</h3>
        <figure className="fm-figure">
          <LayersFigure />
          <figcaption>Every drawing below is this cross-section, outside at the top.</figcaption>
        </figure>
        <ul className="plain-list">
          <li><strong>Which table?</strong> Outer table, diploë, inner table, or through both. Many lesions favour one.</li>
          <li><strong>What edge?</strong> Sclerotic rim, sharp without a rim, bevelled, or ill defined.</li>
          <li><strong>What is inside?</strong> Fluid, fat, ground glass, radiating trabeculae, or soft tissue.</li>
          <li><strong>One or many?</strong> And the patient's age and history.</li>
          <li>
            CT shows the tables, the edge and any matrix best; MRI shows the marrow, the soft tissue and spread inside or outside the skull
            (<Cite doi={GOMEZ}>Gomez</Cite>).
          </li>
        </ul>

        <h4 className="fm-subhead">Benign or aggressive</h4>
        <p className="fm-lead">From Table 1 of <Cite doi={GOMEZ}>Gomez et al.</Cite></p>
        <div className="table-wrap">
          <table className="ref-table fm-table">
            <thead>
              <tr>
                <th>Benign</th>
                <th>Malignant</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Geographic, sharp margins</td><td>Moth-eaten or permeative destruction</td></tr>
              <tr><td>Narrow zone of transition</td><td>Wide zone of transition</td></tr>
              <tr><td>Sclerotic margin</td><td>Poorly defined margins</td></tr>
              <tr><td>Solid, uninterrupted periosteal reaction</td><td>Aggressive, interrupted periosteal reaction</td></tr>
              <tr><td>No soft-tissue component</td><td>Soft-tissue component</td></tr>
            </tbody>
          </table>
        </div>
        <p className="source-note">
          These rules mislead in the skull: a hemangioma or a meningioma can look aggressive (<Cite doi={PONS}>Pons Escoda</Cite>), and LCH, which is benign, has no sclerotic rim (<Cite doi={GOMEZ}>Gomez</Cite>).
        </p>
      </section>

      <section className="info-card">
        <h3>Normal variants and pseudolesions</h3>
        <p className="fm-lead">Know these first, so they are not reported as disease.</p>
        <LesionCards lesions={variants} />
      </section>

      <section className="info-card">
        <h3>Holes: lucent lesions</h3>
        <LesionCards lesions={lucent} />
      </section>

      <section className="info-card">
        <h3>Dense or thickened bone</h3>
        <LesionCards lesions={dense} />
      </section>

      <section className="info-card">
        <h3>Side by side</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Lesion</th>
                <th>Where</th>
                <th>Edge</th>
                <th>Key sign</th>
                <th>Typical patient</th>
              </tr>
            </thead>
            <tbody>
              {sideBySide.map((row) => (
                <tr key={row.name}>
                  <td className="vessel-name">{row.name}</td>
                  <td>{row.where}</td>
                  <td>{row.edge}</td>
                  <td>{row.sign}</td>
                  <td>{row.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source-note">Summarised from the cards above and their sources.</p>

        <h4 className="fm-subhead">A lytic lesion: where to start</h4>
        <p className="fm-lead">Table 2 of <Cite doi={PONS}>Pons Escoda et al.</Cite></p>
        <div className="table-wrap">
          <table className="ref-table fm-table">
            <thead>
              <tr>
                <th>Clue</th>
                <th>Think of</th>
              </tr>
            </thead>
            <tbody>
              {lyticApproach.map((row) => (
                <tr key={row.clue}>
                  <td className="vessel-name">{row.clue}</td>
                  <td>{row.think}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
