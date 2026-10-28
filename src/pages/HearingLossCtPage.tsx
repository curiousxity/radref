import type { ReactNode } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { EarScene, EarTag, InnerEarAnatomy } from '../components/InnerEarAnatomy'
import { EAR } from '../components/innerEarShapes'
import { Cite, LessonReferences } from '../components/LessonPage'
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

/** The fenestral focus: just in front of the oval window. */
const FENESTRAL = { cx: 500, cy: 446 }

function FenestralFigure() {
  return (
    <EarScene id="hl-fen" title="Fenestral otosclerosis: a small lucency in the bone just in front of the oval window">
      <circle cx={FENESTRAL.cx} cy={FENESTRAL.cy} r={16} className="ear-lucent" />
      <EarTag x1={490} y1={458} x2={300} y2={640} anchor="middle">lucency at the window</EarTag>
    </EarScene>
  )
}

function CochlearFigure() {
  return (
    <EarScene id="hl-coch" title="Cochlear otosclerosis: a lucent ring around the cochlea, usually with a fenestral focus as well">
      <path d={EAR.cochlea} className="ear-halo" />
      <circle cx={FENESTRAL.cx} cy={FENESTRAL.cy} r={16} className="ear-lucent" />
      <EarTag x1={340} y1={600} x2={230} y2={640} anchor="middle">double ring</EarTag>
    </EarScene>
  )
}

function CleftFigure() {
  return (
    <EarScene id="hl-cleft" title="Cochlear cleft: a thin curved lucency beside the cochlea in a normal ear">
      <path d="M 332 488 Q 312 540, 336 598" className="ear-cleft" />
      <EarTag x1={322} y1={560} x2={210} y2={630} anchor="middle">thin cleft</EarTag>
    </EarScene>
  )
}

function PagetFigure() {
  const blobs = [[310, 230], [400, 165], [660, 185], [790, 250], [940, 300], [280, 470], [330, 590], [580, 600], [700, 560], [880, 470], [640, 330]]
  return (
    <EarScene
      id="hl-paget"
      title="Paget disease: thick, mottled bone that can surround and demineralise the otic capsule"
      under={blobs.map(([cx, cy]) => <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx={38} ry={26} className="ear-mottle" />)}
    >
      <EarTag x1={940} y1={300} x2={940} y2={200} anchor="middle">mottled bone</EarTag>
    </EarScene>
  )
}

function FibrousDysplasiaFigure() {
  return (
    <EarScene
      id="hl-fd"
      title="Fibrous dysplasia: ground-glass bone around the labyrinth, with the otic capsule itself usually spared"
      under={
        <>
          <path d={EAR.bone} className="ear-ground" />
          <ellipse cx={520} cy={420} rx={215} ry={215} className="ear-capsule" />
        </>
      }
    >
      <EarTag x1={900} y1={420} x2={900} y2={560} anchor="middle">ground glass</EarTag>
      <EarTag x1={330} y1={250} x2={250} y2={170} anchor="middle">capsule spared</EarTag>
    </EarScene>
  )
}

function OssificansFigure() {
  return (
    <EarScene id="hl-lo" title="Labyrinthitis ossificans: new bone filling the cochlea, here the basal turn">
      <path d={EAR.basalTurn} className="ear-ossified" />
      <EarTag x1={372} y1={540} x2={240} y2={630} anchor="middle">bone in the turn</EarTag>
    </EarScene>
  )
}

function PneumolabyrinthFigure() {
  return (
    <EarScene id="hl-air" title="Pneumolabyrinth: dots of air inside the vestibule">
      {[[555, 392, 14], [590, 418, 11], [552, 428, 9]].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} className="ear-air" />
      ))}
      <EarTag x1={600} y1={430} x2={820} y2={560} anchor="middle">air inside</EarTag>
    </EarScene>
  )
}

function EvaFigure() {
  return (
    <EarScene id="hl-eva" hide={['aqueduct']} title="Enlarged vestibular aqueduct: the channel running back from the vestibule is wide">
      <path d={EAR.aqueduct} className="ear-duct-wide-edge" />
      <path d={EAR.aqueduct} className="ear-duct-wide-lumen" />
      <EarTag x1={740} y1={540} x2={900} y2={590} anchor="middle">wide aqueduct</EarTag>
    </EarScene>
  )
}

function FractureFigure() {
  return (
    <EarScene id="hl-fx" title="Otic capsule-violating fracture: the fracture line crosses the vestibule and cochlea">
      <path d="M 330 150 L 470 300 L 560 400 L 470 520 L 430 660" className="ear-fracture" />
      <EarTag x1={470} y1={300} x2={760} y2={170} anchor="middle">through the labyrinth</EarTag>
    </EarScene>
  )
}

function FistulaFigure() {
  return (
    <EarScene id="hl-fist" title="Labyrinthine fistula: middle ear soft tissue has eroded the bone over the lateral canal">
      <path d="M 150 340 C 200 320, 300 335, 372 360 C 384 380, 380 410, 360 420 C 300 430, 200 440, 150 420 Z" className="ear-mass" />
      <EarTag x1={250} y1={420} x2={240} y2={560} anchor="middle">canal eroded</EarTag>
    </EarScene>
  )
}

function ElstFigure() {
  return (
    <EarScene id="hl-elst" hide={['aqueduct']} title="Endolymphatic sac tumour: a destructive mass behind the internal auditory canal, with bony specks inside">
      <path d="M 600 421 C 640 446, 668 474, 690 494" className="ear-duct-edge" />
      <path d="M 600 421 C 640 446, 668 474, 690 494" className="ear-duct-lumen" />
      <path d="M 690 480 L 730 466 L 780 476 L 820 470 L 856 492 L 862 532 L 836 566 L 790 584 L 740 580 L 702 562 L 684 528 Z" className="ear-mass" />
      {[[740, 510], [790, 540], [820, 505], [756, 556]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8} className="ear-speck" />
      ))}
      <EarTag x1={856} y1={540} x2={1060} y2={620} anchor="end">destructive mass</EarTag>
    </EarScene>
  )
}

function WideIacFigure() {
  return (
    <EarScene id="hl-iac" hide={['iac']} title="Widened internal auditory canal: the canal flares toward the brainstem end">
      <path d="M 677 388 C 758 357, 858 320, 1043 290 L 1043 504 C 876 474, 777 444, 677 451 Q 648 422, 677 388 Z" className="ear-iac" />
      <EarTag x1={960} y1={330} x2={960} y2={200} anchor="middle">wide IAC</EarTag>
    </EarScene>
  )
}

function DehiscenceFigure() {
  return (
    <EarScene id="hl-scd" title="Superior canal dehiscence: no bone covers the top of the superior semicircular canal, so it opens onto the middle cranial fossa">
      <path d="M 496 178 L 500 118 L 552 118 L 556 182 Z" className="ear-gap" />
      <EarTag x1={556} y1={150} x2={760} y2={160} anchor="start">no bone roof</EarTag>
    </EarScene>
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
          <p className="eyebrow">Study</p>
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
          <InnerEarAnatomy />
          <figcaption>Inner ear anatomy: a conceptual cutaway, not a CT plane, with shapes, scale and relationships simplified. Every drawing below marks its finding on this layout.</figcaption>
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
    </div>
  )
}
