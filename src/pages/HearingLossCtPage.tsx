import type { ReactNode } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonCaveat, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { hearingLossScans } from '../data/scans/hearingLoss'
import { SCAN_SOURCES } from '../data/scans/sources'
import type { ScanImage } from '../data/scans/types'

const DOI = {
  purohit: SCAN_SOURCES.purohit2014.doi,
  verbist: '10.1007/s13244-011-0134-z',
  lee: '10.3174/ajnr.A1558',
  vijay: '10.3174/ajnr.A0495',
  belden: '10.1148/radiol.2262010897',
  little: '10.1001/archotol.132.12.1300',
  juliano1: '10.1148/radiol.13120733',
  juliano2: '10.1148/radiol.2015140800',
  barath: '10.3174/ajnr.A2052',
  mukherji: '10.1148/radiology.202.3.9051037',
  young: '10.1148/rg.345130083',
  acr: '10.1016/j.jacr.2018.09.020',
}

const references: LessonReference[] = [
  { citation: 'Purohit B, Hermans R, Op de beeck K. Imaging in otosclerosis: a pictorial review. Insights Imaging. 2014;5(2):245-252. Open access (CC BY 2.0).', doi: DOI.purohit },
  { citation: 'Verbist BM. Imaging of sensorineural hearing loss: a pattern-based approach to diseases of the inner ear and cerebellopontine angle. Insights Imaging. 2012;3(2):139-153. Open access.', doi: DOI.verbist },
  { citation: 'Lee TC, Aviv RI, Chen JM, Nedzelski JM, Fox AJ, Symons SP. CT grading of otosclerosis. AJNR Am J Neuroradiol. 2009;30(7):1435-1439.', doi: DOI.lee },
  { citation: 'Vijayasekaran S, Halsted MJ, Boston M, et al. When is the vestibular aqueduct enlarged? A statistical analysis of the normative distribution of vestibular aqueduct size. AJNR Am J Neuroradiol. 2007;28(6):1133-1138.', doi: DOI.vijay },
  { citation: 'Little SC, Kesser BW. Radiographic classification of temporal bone fractures: clinical predictability using a new system. Arch Otolaryngol Head Neck Surg. 2006;132(12):1300-1304.', doi: DOI.little },
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part I. Anatomy and inflammatory and neoplastic processes. Radiology. 2013;269(1):17-33.', doi: DOI.juliano1 },
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part II. Traumatic, postoperative, and noninflammatory nonneoplastic conditions. Radiology. 2015;276(3):655-672.', doi: DOI.juliano2 },
  { citation: 'Baráth K, Huber AM, Stämpfli P, Varga Z, Kollias S. Neuroradiology of cholesteatomas. AJNR Am J Neuroradiol. 2011;32(2):221-229.', doi: DOI.barath },
  { citation: 'Mukherji SK, Albernaz VS, Lo WW, et al. Papillary endolymphatic sac tumors: CT, MR imaging, and angiographic findings in 20 patients. Radiology. 1997;202(3):801-808.', doi: DOI.mukherji },
  { citation: 'Belden CJ, Weg N, Minor LB, Zinreich SJ. CT evaluation of bone dehiscence of the superior semicircular canal as a cause of sound- and/or pressure-induced vertigo. Radiology. 2003;226(2):337-343.', doi: DOI.belden },
  { citation: 'Young JY, Ryan ME, Young NM. Preoperative imaging of sensorineural hearing loss in pediatric candidates for cochlear implantation. RadioGraphics. 2014;34(5):E133-E149.', doi: DOI.young },
  { citation: 'Expert Panel on Neurologic Imaging: Sharma A, Kirsch CFE, Aulino JM, et al. ACR Appropriateness Criteria Hearing Loss and/or Vertigo. J Am Coll Radiol. 2018;15(11S):S321-S331.', doi: DOI.acr },
]

/*
 * Schematic axial view of a left inner ear: lateral to the left, anterior at the top. The middle
 * ear, then the otic capsule holding the cochlea (front), the vestibule behind it with the oval
 * window on its outer side, the lateral semicircular canal behind that, the internal auditory
 * canal running medially and the vestibular aqueduct running back from the vestibule. Not to
 * scale; every figure draws on the same layout so a finding's position reads the same from card
 * to card.
 */
const COCHLEA = { x: 115, y: 50, r: 30 }
const VESTIBULE = { x: 110, y: 112 }
const CANAL = { x: 118, y: 162, r: 15 }
const IAC = { y: 74, h: 24 }

type EarProps = {
  id: string
  title: string
  /** Leave out a normal structure that the finding redraws. */
  hide?: Array<'aqueduct' | 'iac'>
  children?: ReactNode
}

function Ear({ id, title, hide = [], children }: EarProps) {
  return (
    <svg className="cv-svg" viewBox="0 0 320 190" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{title}</title>
      <rect x="0" y="0" width="70" height="190" className="cv-soft" />
      <rect x="70" y="0" width="250" height="190" className="cv-bone" />
      <line x1="70" y1="0" x2="70" y2="190" className="cv-edge" />
      <rect x="66" y="107" width="24" height="10" className="cv-soft" />
      {!hide.includes('iac') && <rect x="150" y={IAC.y} width="170" height={IAC.h} className="cv-csf cv-thin" />}
      {!hide.includes('aqueduct') && <line x1="128" y1="122" x2="232" y2="178" className="hl-aqueduct" />}
      <circle cx={CANAL.x} cy={CANAL.y} r={CANAL.r} className="hl-canal" />
      <ellipse cx={VESTIBULE.x} cy={VESTIBULE.y} rx="22" ry="15" className="cv-fluid cv-thin" />
      <circle cx={COCHLEA.x} cy={COCHLEA.y} r={COCHLEA.r} className="cv-fluid cv-thin" />
      <path d={`M${COCHLEA.x} ${COCHLEA.y} m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -18 2 a17 17 0 1 1 32 -6`} className="hl-spiral" />
      {children}
    </svg>
  )
}

/**
 * A leader line from the point (x1, y1) to (x2, y2), with the text starting just past (x2, y2).
 * Mono 13px is about 7.8 units a character; labels are kept short enough to stay inside the
 * 320-wide drawing.
 */
function Label({ x1, y1, x2, y2, children }: { x1: number; y1: number; x2: number; y2: number; children: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="cv-leader" />
      <text x={x2 + 3} y={y2 + 4} className="cv-label">{children}</text>
    </>
  )
}

/** A two-line label set in the narrow middle ear strip, with a leader to the right. */
function SideLabel({ x1, y1, y, lines }: { x1: number; y1: number; y: number; lines: [string, string] }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={60} y2={y + 2} className="cv-leader" />
      <text x="6" y={y} className="cv-label">{lines[0]}</text>
      <text x="6" y={y + 14} className="cv-label">{lines[1]}</text>
    </>
  )
}

/** The fenestral focus: just in front of the oval window. */
const FENESTRAL = { x: 82, y: 94 }

function NormalFigure() {
  return (
    <Ear id="hl-normal" title="Schematic axial view of the left inner ear, lateral on the left and anterior at the top: middle ear, cochlea, vestibule and oval window, lateral canal, internal auditory canal and vestibular aqueduct">
      <text x="35" y="16" className="cv-label cv-center">middle</text>
      <text x="35" y="30" className="cv-label cv-center">ear</text>
      <Label x1={145} y1={40} x2={168} y2={28}>cochlea</Label>
      <text x="314" y={IAC.y + 16} className="cv-label cv-end">IAC</text>
      <Label x1={132} y1={110} x2={150} y2={114}>vestibule</Label>
      <SideLabel x1={68} y1={112} y={96} lines={['oval', 'window']} />
      <SideLabel x1={103} y1={164} y={150} lines={['lateral', 'canal']} />
      <Label x1={214} y1={168} x2={232} y2={156}>aqueduct</Label>
    </Ear>
  )
}

function FenestralFigure() {
  return (
    <Ear id="hl-fen" title="Fenestral otosclerosis: a small lucency in the bone just in front of the oval window">
      <circle cx={FENESTRAL.x} cy={FENESTRAL.y} r="7" className="hl-lucent" />
      <Label x1={88} y1={90} x2={150} y2={56}>lucency in front</Label>
    </Ear>
  )
}

function CochlearFigure() {
  return (
    <Ear id="hl-coch" title="Cochlear otosclerosis: a lucent ring around the cochlea, usually with a fenestral focus as well">
      <circle cx={COCHLEA.x} cy={COCHLEA.y} r={COCHLEA.r + 8} className="hl-halo" />
      <circle cx={FENESTRAL.x} cy={FENESTRAL.y} r="7" className="hl-lucent" />
      <Label x1={152} y1={38} x2={170} y2={26}>double ring</Label>
    </Ear>
  )
}

function CleftFigure() {
  return (
    <Ear id="hl-cleft" title="Cochlear cleft: a thin curved lucency beside the cochlea in a normal ear">
      <path d="M80 30 Q74 50 82 72" className="hl-cleft" />
      <SideLabel x1={76} y1={48} y={40} lines={['thin', 'cleft']} />
    </Ear>
  )
}

function PagetFigure() {
  const blobs = [[180, 30], [230, 50], [285, 22], [196, 130], [250, 120], [295, 150], [160, 175], [270, 182], [88, 140]]
  return (
    <Ear id="hl-paget" title="Paget disease: thick, mottled bone that can surround and demineralise the otic capsule">
      {blobs.map(([cx, cy]) => (
        <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="13" ry="9" className="cv-cotton" />
      ))}
      <text x="235" y="14" className="cv-label cv-center">mottled bone</text>
    </Ear>
  )
}

function FibrousDysplasiaFigure() {
  return (
    <Ear id="hl-fd" title="Fibrous dysplasia: ground-glass bone around the labyrinth, with the otic capsule itself usually spared">
      <path d="M70 0 H320 V190 H70 Z M125 4 A62 92 0 1 0 125.1 4 Z" fillRule="evenodd" className="cv-ground" />
      <text x="250" y="40" className="cv-label cv-center">ground glass</text>
      <text x="250" y="150" className="cv-label cv-center">capsule spared</text>
    </Ear>
  )
}

function OssificansFigure() {
  return (
    <Ear id="hl-lo" title="Labyrinthitis ossificans: new bone filling the cochlea, here the basal turn">
      <path d={`M${COCHLEA.x - COCHLEA.r} ${COCHLEA.y} A${COCHLEA.r} ${COCHLEA.r} 0 0 0 ${COCHLEA.x + COCHLEA.r} ${COCHLEA.y} Z`} className="cv-dense" />
      <Label x1={145} y1={56} x2={168} y2={28}>bone in the turn</Label>
    </Ear>
  )
}

function PneumolabyrinthFigure() {
  return (
    <Ear id="hl-air" title="Pneumolabyrinth: dots of air inside the vestibule">
      {[[102, 110, 3.5], [114, 116, 3], [120, 106, 2.5]].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} className="hl-air" />
      ))}
      <Label x1={124} y1={108} x2={150} y2={120}>air inside</Label>
    </Ear>
  )
}

function EvaFigure() {
  return (
    <Ear id="hl-eva" hide={['aqueduct']} title="Enlarged vestibular aqueduct: the channel running back from the vestibule is wide">
      <line x1="128" y1="122" x2="232" y2="178" className="hl-aqueduct-wide" />
      <Label x1={214} y1={164} x2={236} y2={150}>wide</Label>
    </Ear>
  )
}

function FractureFigure() {
  return (
    <Ear id="hl-fx" title="Otic capsule-violating fracture: the fracture line crosses the vestibule and cochlea">
      <path d="M40 190 L96 136 L106 104 L122 62 L150 0" className="fm-fracture" />
      <Label x1={126} y1={52} x2={168} y2={28}>through labyrinth</Label>
    </Ear>
  )
}

function FistulaFigure() {
  return (
    <Ear id="hl-fist" title="Labyrinthine fistula: middle ear soft tissue has eroded the bone over the lateral canal">
      <path d={`M70 144 L106 154 L106 170 L70 180 Z`} className="cv-soft-mass cv-thin" />
      <ellipse cx="38" cy="162" rx="32" ry="22" className="cv-soft-mass cv-thin" />
      <SideLabel x1={104} y1={154} y={112} lines={['canal', 'eroded']} />
    </Ear>
  )
}

function ElstFigure() {
  return (
    <Ear id="hl-elst" hide={['aqueduct']} title="Endolymphatic sac tumour: a destructive mass behind the internal auditory canal, with bony specks inside">
      <line x1="128" y1="122" x2="190" y2="155" className="hl-aqueduct" />
      <path d="M186 130 L202 122 L220 128 L240 120 L262 130 L274 148 L264 166 L242 176 L216 174 L194 164 L184 148 Z" className="cv-enhance cv-thin" />
      {[[212, 142], [232, 154], [248, 140], [220, 162]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" className="cv-dense" />
      ))}
      <text x="230" y="188" className="cv-label cv-center">destructive</text>
    </Ear>
  )
}

function WideIacFigure() {
  return (
    <Ear id="hl-iac" hide={['iac']} title="Widened internal auditory canal: the canal flares toward the brainstem end">
      <path d={`M150 ${IAC.y} L230 ${IAC.y} L320 ${IAC.y - 28} L320 ${IAC.y + IAC.h + 28} L230 ${IAC.y + IAC.h} L150 ${IAC.y + IAC.h} Z`} className="cv-csf cv-thin" />
      <text x="304" y={IAC.y + 16} className="cv-label cv-end">wide IAC</text>
    </Ear>
  )
}

/** A schematic coronal view: middle cranial fossa above, the superior canal arching beneath it. */
function DehiscenceFigure() {
  return (
    <svg className="cv-svg" viewBox="0 0 320 190" role="img" aria-labelledby="hl-scd-title">
      <title id="hl-scd-title">Superior canal dehiscence: no bone covers the top of the superior semicircular canal, so it opens onto the middle cranial fossa</title>
      <rect x="0" y="0" width="320" height="60" className="cv-brain" />
      <rect x="0" y="60" width="320" height="130" className="cv-bone" />
      <line x1="0" y1="60" x2="320" y2="60" className="cv-edge" />
      <path d="M110 160 A50 50 0 0 1 210 160" className="hl-canal" />
      <rect x="148" y="58" width="24" height="56" className="cv-brain" />
      <text x="160" y="34" className="cv-label cv-center">middle cranial fossa</text>
      <Label x1={172} y1={92} x2={214} y2={110}>no bone roof</Label>
      <text x="160" y="182" className="cv-label cv-center">superior canal (coronal)</text>
    </svg>
  )
}

type Finding = {
  name: string
  aka?: string
  badge: { label: string; tone: 'good' | 'accent' | 'warn' }
  figure: ReactNode
  images?: ScanImage[]
  look: ReactNode
  report: ReactNode
}

const VARIANT = { label: 'Normal variant', tone: 'good' } as const
const COMMON = { label: 'Common', tone: 'accent' } as const
const URGENT = { label: 'Report clearly', tone: 'warn' } as const
const OTHER = { label: 'Less common', tone: 'accent' } as const

const bone: Finding[] = [
  {
    name: 'Fenestral otosclerosis',
    badge: COMMON,
    figure: <FenestralFigure />,
    images: [hearingLossScans.fenestral],
    look: <>A lucent spot in the bone just in front of the oval window, at the fissula ante fenestram. Foci as small as 1 mm can be seen on thin-section CT. Look at both ears: otosclerosis is bilateral in about 85% (<Cite doi={DOI.purohit}>Purohit</Cite>).</>,
    report: <>Fenestral only is grade 1 (<Cite doi={DOI.lee}>Lee et al.</Cite>). Say whether the oval or round window is narrowed or closed.</>,
  },
  {
    name: 'Cochlear otosclerosis',
    aka: 'retrofenestral otosclerosis',
    badge: COMMON,
    figure: <CochlearFigure />,
    images: [hearingLossScans.cochlear],
    look: <>A lucent ring around the cochlea inside its dense capsule, the "double ring". It rarely happens without a fenestral focus, so check the oval window too. It is often symmetric on both sides (<Cite doi={DOI.purohit}>Purohit</Cite>).</>,
    report: <>This is the form that causes the sensorineural part of the loss. Grade it: 2A basal turn, 2B middle or apical turns, 2C both, 3 diffuse confluent (<Cite doi={DOI.lee}>Lee et al.</Cite>). CT can miss it in the late sclerotic phase, when the bone outline looks normal (<Cite doi={DOI.purohit}>Purohit</Cite>).</>,
  },
  {
    name: 'Cochlear cleft',
    badge: VARIANT,
    figure: <CleftFigure />,
    images: [hearingLossScans.cochlearCleft],
    look: <>A thin curved lucency beside the cochlea. It is seen mainly in children and becomes less common with age (<Cite doi={DOI.purohit}>Purohit</Cite>).</>,
    report: <>Do not call it otosclerosis. A cleft is thin and curved; an otosclerotic focus is a rounder spot or a ring.</>,
  },
  {
    name: 'Paget disease',
    badge: OTHER,
    figure: <PagetFigure />,
    images: [hearingLossScans.paget],
    look: <>Older adults. It can demineralise the otic capsule and, rarely, mimic cochlear otosclerosis (<Cite doi={DOI.purohit}>Purohit</Cite>).</>,
    report: <>Look at the rest of the skull: Paget disease involves other bones, which tells it apart. Osteogenesis imperfecta is the other mimic, also with other bones involved.</>,
  },
  {
    name: 'Fibrous dysplasia',
    badge: OTHER,
    figure: <FibrousDysplasiaFigure />,
    images: [hearingLossScans.fibrousDysplasia],
    look: <>Expanded bone with a smooth "ground-glass" look in the temporal bone. The otic capsule itself is usually spared.</>,
    report: <>Say whether it narrows the external or internal auditory canal (<Cite doi={DOI.juliano2}>Juliano et al.</Cite>).</>,
  },
]

const inside: Finding[] = [
  {
    name: 'Labyrinthitis ossificans',
    badge: URGENT,
    figure: <OssificansFigure />,
    images: [hearingLossScans.labyrinthitisOssificans],
    look: <>The normally fluid-filled cochlea or canals fill with new bone, partly or completely, usually after meningitis or other inner ear infection (<Cite doi={DOI.verbist}>Verbist</Cite>).</>,
    report: <>Say which turns are filled and whether the <strong>basal turn</strong> is open. This decides whether a cochlear implant can go in normally. If the CT looks normal but this is suspected, early fibrous change shows on MRI as loss of the normal fluid signal (<Cite doi={DOI.verbist}>Verbist</Cite>).</>,
  },
  {
    name: 'Pneumolabyrinth',
    badge: URGENT,
    figure: <PneumolabyrinthFigure />,
    images: [hearingLossScans.pneumolabyrinth],
    look: <>Dots of air inside the vestibule or cochlea, where there should only be fluid. Usually after trauma or ear surgery.</>,
    report: <>It means the inner ear has been opened (a perilymph leak). Tell the clinician directly (<Cite doi={DOI.juliano2}>Juliano et al.</Cite>).</>,
  },
  {
    name: 'Enlarged vestibular aqueduct',
    badge: OTHER,
    figure: <EvaFigure />,
    images: [hearingLossScans.eva],
    look: <>The channel running back from the vestibule is wide. It is enlarged if the midpoint is 1.0 mm or more, or the opening (operculum) is 2.0 mm or more (<Cite doi={DOI.vijay}>Vijayasekaran</Cite>).</>,
    report: <>Mostly found in children, but it is worth measuring in adults too. Give both measurements.</>,
  },
]

const erosion: Finding[] = [
  {
    name: 'Otic capsule–violating fracture',
    badge: URGENT,
    figure: <FractureFigure />,
    images: [hearingLossScans.fracture],
    look: <>A fracture line that crosses the cochlea, vestibule or canals rather than going around them.</>,
    report: <>Lead with "otic capsule sparing" or "violating". Violating fractures had 25 times the sensorineural hearing loss, 5 times the facial nerve injury and 8 times the CSF leak of sparing ones (<Cite doi={DOI.little}>Little and Kesser</Cite>).</>,
  },
  {
    name: 'Labyrinthine fistula',
    aka: 'from cholesteatoma',
    badge: URGENT,
    figure: <FistulaFigure />,
    look: <>Soft tissue in the middle ear that has worn away the thin bone over the lateral semicircular canal, the usual site (<Cite doi={DOI.barath}>Baráth et al.</Cite>).</>,
    report: <>Name the canal and say the fistula is present; the surgeon needs to know before operating.</>,
  },
  {
    name: 'Endolymphatic sac tumour',
    badge: URGENT,
    figure: <ElstFigure />,
    images: [hearingLossScans.elst],
    look: <>A destructive mass behind the internal auditory canal (retrolabyrinthine), with calcified specks inside on CT (<Cite doi={DOI.mukherji}>Mukherji et al.</Cite>).</>,
    report: <>Recommend MRI. Think of von Hippel–Lindau disease, especially if it is on both sides.</>,
  },
]

const canal: Finding[] = [
  {
    name: 'Widened internal auditory canal',
    badge: URGENT,
    figure: <WideIacFigure />,
    images: [hearingLossScans.iac],
    look: <>One canal clearly wider or more flared than the other. Always compare the two sides.</>,
    report: <>Suggests a mass in the canal, most often a vestibular schwannoma. Recommend MRI with contrast, which is the test for this (<Cite doi={DOI.verbist}>Verbist</Cite>). A normal CT does not exclude a small schwannoma.</>,
  },
  {
    name: 'Superior canal dehiscence',
    badge: OTHER,
    figure: <DehiscenceFigure />,
    images: [hearingLossScans.scd],
    look: <>No bone covering the top of the superior semicircular canal. Check on coronal or Pöschl reformats (<Cite doi={DOI.belden}>Belden et al.</Cite>).</>,
    report: <>It typically gives sound- or pressure-induced vertigo and a conductive-type loss rather than pure sensorineural loss. Mention it if you see it.</>,
  },
]

const implantChecklist = [
  'Cochlea: is the basal turn open? Any ossification or malformation?',
  'Round window: open, or closed by bone (for example otosclerosis)?',
  'Facial nerve: its course, and whether the canal is dehiscent.',
  'Mastoid: how well it is aerated.',
  'Jugular bulb: high-riding or dehiscent?',
  'Sigmoid sinus: placed far forward?',
  'Carotid canal: normal course?',
  'Internal auditory canal: normal width? A very narrow canal raises concern for a missing cochlear nerve; recommend MRI.',
]

const normalFindings = `Cochleae, vestibules and semicircular canals are normally formed on both sides.
Vestibular aqueducts are not enlarged.
Internal auditory canals are normal and symmetric in caliber.
No otic capsule lucency or labyrinthine ossification.
No otic capsule fracture or erosion.
Superior semicircular canals are covered by bone`

const normalImpression = 'No CT cause for sensorineural hearing loss'

const normalRecommendation = 'MRI of the internal auditory canals with contrast is more sensitive for retrocochlear causes such as vestibular schwannoma, if not already performed'

const otosclerosisFindings = `[Right / left / bilateral] lucency anterior to the oval window at the fissula ante fenestram.
Pericochlear lucency forming a "double ring" around the [basal / middle / apical] turn of the cochlea.
Oval window [patent / narrowed / obliterated]. Round window [patent / narrowed / obliterated]`

const otosclerosisImpression = 'Fenestral and retrofenestral (cochlear) otosclerosis, [right / left / bilateral], grade [2A / 2B / 2C / 3] (Lee et al.), which may account for the sensorineural or mixed hearing loss'

const ossificansFindings = 'Bony obliteration of the [basal / middle / apical] turn of the [right / left] cochlea [and the ___ semicircular canal]'

const ossificansImpression = 'Labyrinthitis ossificans, [right / left]. The basal turn is [patent / partly obstructed / obstructed], which is relevant to cochlear implant planning'

function FindingCards({ findings }: { findings: Finding[] }) {
  return (
    <div className="fm-cards">
      {findings.map((finding) => {
        return (
          <article key={finding.name} className="fm-card">
            <figure className="fm-figure">{finding.figure}</figure>
            <div className="fm-card-head">
              <h4>{finding.name}</h4>
              <Badge label={finding.badge.label} tone={finding.badge.tone} />
            </div>
            {finding.aka && <p className="fm-aka">{finding.aka}</p>}
            <dl className="fm-facts">
              <dt>Look for</dt>
              <dd>{finding.look}</dd>
              <dt>Report it</dt>
              <dd>{finding.report}</dd>
            </dl>
            {finding.images && <ScanFigures images={finding.images} />}
          </article>
        )
      })}
    </div>
  )
}

export function HearingLossCtPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Quick reference</p>
          <h2>Hearing loss on temporal bone CT</h2>
          <p>
            Adult sensorineural hearing loss: what to look for. In adults the cause is usually acquired, not congenital. MRI with contrast is the
            usual first test for one-sided loss, to look for a vestibular schwannoma (<Cite doi={DOI.acr}>ACR</Cite>). CT is mostly asked for to look
            for otosclerosis, after trauma, for bone disease, or to plan a cochlear implant.
          </p>
          <p className="source-note">
            Unchecked draft, written on 2026-10-28 without access to PubMed, and not yet reviewed by the site author. The drawings are schematics,
            not to scale. The scans are panels from open-access figures published under CC BY licences, credited under each card.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>How to read it</h3>
        <figure className="fm-figure">
          <NormalFigure />
          <figcaption>Every drawing below is this schematic axial view of the left ear: lateral on the left, front at the top.</figcaption>
        </figure>
        <ul className="plain-list">
          <li><strong>Compare the two sides</strong> on every structure. Most findings are easier to see as a difference.</li>
          <li><strong>Bone window, thin slices.</strong> Small otosclerotic foci are only 1–2 mm across (<Cite doi={DOI.purohit}>Purohit</Cite>).</li>
          <li><strong>Work inward:</strong> the bone around the inner ear, then inside the labyrinth, then erosion and fractures, then the internal auditory canal.</li>
          <li>For the full outside-in search pattern and report builder, use the Temporal bone CT study linked below.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>1. The bone around the inner ear</h3>
        <p className="fm-lead">The commonest CT cause of adult hearing loss lives here: otosclerosis.</p>
        <FindingCards findings={bone} />
      </section>

      <section className="info-card">
        <h3>2. Inside the labyrinth</h3>
        <FindingCards findings={inside} />
      </section>

      <section className="info-card">
        <h3>3. Erosion and fractures</h3>
        <FindingCards findings={erosion} />
      </section>

      <section className="info-card">
        <h3>4. The canal, and one to name</h3>
        <FindingCards findings={canal} />
      </section>

      <section className="info-card">
        <h3>Cochlear implant planning</h3>
        <p className="fm-lead">If the scan is for an implant, say each of these, normal or not (<Cite doi={DOI.young}>Young et al.</Cite>).</p>
        <ul className="plain-list">
          {implantChecklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="info-card">
        <h3>Report wording</h3>
        <h4 className="fm-subhead">Normal study</h4>
        <CopyBlock label="Findings" text={normalFindings} />
        <CopyBlock label="Impression" text={normalImpression} />
        <CopyBlock label="Recommendation" text={normalRecommendation} />

        <h4 className="fm-subhead">Otosclerosis</h4>
        <CopyBlock label="Findings" text={otosclerosisFindings} />
        <CopyBlock label="Impression" text={otosclerosisImpression} />

        <h4 className="fm-subhead">Labyrinthitis ossificans</h4>
        <CopyBlock label="Findings" text={ossificansFindings} />
        <CopyBlock label="Impression" text={ossificansImpression} />
        <p className="source-note">Fill in the bracketed choices; delete the ones that do not apply.</p>
      </section>

      <LessonReferences references={references} />
      <LessonCaveat />
    </div>
  )
}
