import type { ReactNode } from 'react'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { ScanFigures } from '../components/ScanFigures'
import { haemorrhageMriScans } from '../data/scans/haemorrhageMri'

// Every cell below was read in its paper first (abstract or open full text); the cells, their
// verdicts and the quoted sentences are in
// docs/superpowers/research/2026-11-02-haemorrhage-mri-sources.md.
const DOI = {
  weerink: '10.1259/bjr.20220304',
  bradley: '10.1148/radiology.189.1.8372185',
  penckofer: '10.3389/fnins.2024.1408288',
  kang: '10.3348/kjr.2001.2.4.183',
  popescuCt: '10.2147/PHMT.S461121',
  dolinskas: '10.2214/ajr.129.4.681',
  parizel: '10.1007/s003300000800',
  tripathy: '10.4103/2152-7806.193730',
  popescuMri: '10.2147/JMDH.S466044',
  fobben: '10.2214/ajr.153.3.589',
  hasan: '10.3389/fneur.2022.872664',
  chen: '10.3389/fneur.2024.1366238',
  sieswerda: '10.1016/j.ejrad.2014.03.015',
  weidauer: '10.1007/s00062-022-01231-5',
  mitchell: '10.1136/jnnp.70.2.205',
  perry: '10.1136/bmj.d4277',
  ferrante: '10.1007/s10194-011-0302-z',
  charidimou: '10.1016/S1474-4422(22)00208-3',
  wardlaw: '10.1016/S1474-4422(13)70124-8',
  greenberg: '10.1016/S1474-4422(09)70013-4',
  deliganis: '10.1148/radiology.218.1.r01ja43152',
  frigon: '10.1148/radiol.2331031375',
  stuckey: '10.2214/AJR.07.2424',
}

const references: LessonReference[] = [
  { citation: 'Weerink LBM, Appelman APA, Kloet RW, et al. Susceptibility-weighted imaging in intracranial hemorrhage: not all bleeds are black. Br J Radiol. 2023;96(1148):20220304. Open access (CC BY-NC 4.0).', doi: DOI.weerink },
  { citation: 'Penckofer M, Kazmi KS, Thon J, et al. Neuro-imaging in intracerebral hemorrhage: updates and knowledge gaps. Front Neurosci. 2024;18:1408288. Open access (CC BY 4.0).', doi: DOI.penckofer },
  { citation: 'Bradley WG Jr. MR appearance of hemorrhage in the brain. Radiology. 1993;189(1):15-26.', doi: DOI.bradley },
  { citation: 'Kang BK, Na DG, Ryoo JW, et al. Diffusion-weighted MR imaging of intracerebral hemorrhage. Korean J Radiol. 2001;2(4):183-191. Open access (CC BY-NC 3.0).', doi: DOI.kang },
  { citation: 'Popescu CM, Marina V, Munteanu A, et al. Acute computer tomography findings in pediatric accidental head trauma: review. Pediatric Health Med Ther. 2024;15:231-241. Open access (CC BY-NC 3.0).', doi: DOI.popescuCt },
  { citation: 'Dolinskas CA, Bilaniuk LT, Zimmerman RA, Kuhl DE. Computed tomography of intracerebral hematomas. I. Transmission CT observations on hematoma resolution. AJR Am J Roentgenol. 1977;129(4):681-688.', doi: DOI.dolinskas },
  { citation: 'Parizel PM, Makkat S, Van Miert E, et al. Intracranial hemorrhage: principles of CT and MRI interpretation. Eur Radiol. 2001;11(9):1770-1783.', doi: DOI.parizel },
  { citation: 'Tripathy SR, Swarnakar PK, Mishra S, et al. A review of sub acute subdural hematoma (SASDH) with our institutional experience and its management by double barrel technique (DbT): a novel technique. Surg Neurol Int. 2016;7(Suppl 28):S767-S774. Open access (CC BY-NC-SA 3.0).', doi: DOI.tripathy },
  { citation: 'Popescu CM, Marina V, Avram G, et al. Spectrum of magnetic resonance imaging findings in acute pediatric traumatic brain injury: a pictorial essay. J Multidiscip Healthc. 2024;17:2921-2934. Open access (CC BY-NC 3.0).', doi: DOI.popescuMri },
  { citation: 'Fobben ES, Grossman RI, Atlas SW, et al. MR characteristics of subdural hematomas and hygromas at 1.5 T. AJR Am J Roentgenol. 1989;153(3):589-595.', doi: DOI.fobben },
  { citation: 'Hasan D, Nikoubashman O, Pjontek R, et al. MRI appearance of chronic subdural hematoma. Front Neurol. 2022;13:872664. Open access (CC BY 4.0).', doi: DOI.hasan },
  { citation: 'Chen H, Colasurdo M, Malhotra A, et al. Advances in chronic subdural hematoma and membrane imaging. Front Neurol. 2024;15:1366238. Open access (CC BY 4.0).', doi: DOI.chen },
  { citation: 'Sieswerda-Hoogendoorn T, Postema FAM, Verbaan D, et al. Age determination of subdural hematomas with CT and MRI: a systematic review. Eur J Radiol. 2014;83(7):1257-1268.', doi: DOI.sieswerda },
  { citation: 'Weidauer S, Neuhaus E, Hattingen E. Cerebral superficial siderosis: etiology, neuroradiological features and clinical findings. Clin Neuroradiol. 2023;33(2):293-306. Open access (CC BY 4.0).', doi: DOI.weidauer },
  { citation: 'Mitchell P, Wilkinson ID, Hoggard N, et al. Detection of subarachnoid haemorrhage with magnetic resonance imaging. J Neurol Neurosurg Psychiatry. 2001;70(2):205-211.', doi: DOI.mitchell },
  { citation: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Sensitivity of computed tomography performed within six hours of onset of headache for diagnosis of subarachnoid haemorrhage: prospective cohort study. BMJ. 2011;343:d4277.', doi: DOI.perry },
  { citation: 'Ferrante E, Tassorelli C, Rossi P, et al. Focus on the management of thunderclap headache: from nosography to treatment. J Headache Pain. 2011;12(2):251-258. Open access (CC BY).', doi: DOI.ferrante },
  { citation: 'Charidimou A, Boulouis G, Frosch MP, et al. The Boston criteria version 2.0 for cerebral amyloid angiopathy: a multicentre, retrospective, MRI-neuropathology diagnostic accuracy study. Lancet Neurol. 2022;21(8):714-725.', doi: DOI.charidimou },
  { citation: 'Wardlaw JM, Smith EE, Biessels GJ, et al. Neuroimaging standards for research into small vessel disease and its contribution to ageing and neurodegeneration. Lancet Neurol. 2013;12(8):822-838. Open access.', doi: DOI.wardlaw },
  { citation: 'Greenberg SM, Vernooij MW, Cordonnier C, et al. Cerebral microbleeds: a guide to detection and interpretation. Lancet Neurol. 2009;8(2):165-174.', doi: DOI.greenberg },
  { citation: 'Deliganis AV, Fisher DJ, Lam AM, Maravilla KR. Cerebrospinal fluid signal intensity increase on FLAIR MR images in patients under general anesthesia: the role of supplemental O2. Radiology. 2001;218(1):152-156.', doi: DOI.deliganis },
  { citation: 'Frigon C, Shaw DW, Heckbert SR, Weinberger E, Jardine DS. Supplemental oxygen causes increased signal intensity in subarachnoid cerebrospinal fluid on brain FLAIR MR images obtained in children during general anesthesia. Radiology. 2004;233(1):51-55.', doi: DOI.frigon },
  { citation: 'Stuckey SL, Goh TD, Heffernan T, Rowan D. Hyperintensity in the subarachnoid space on FLAIR MRI. AJR Am J Roentgenol. 2007;189(4):913-921.', doi: DOI.stuckey },
]

type HaematomaStage = { stage: string; time: ReactNode; product: ReactNode; t1: ReactNode; t2: ReactNode; swi: ReactNode; ct: ReactNode }
type SubduralStage = { stage: string; time: ReactNode; ct: ReactNode; t1: ReactNode; t2: ReactNode; flair: ReactNode }
type OtherBleed = { finding: string; appearance: ReactNode; pointsTo: ReactNode }

const haematomaStages: HaematomaStage[] = [
  {
    stage: 'Hyperacute',
    time: 'Under 24 hours',
    product: 'Oxyhaemoglobin, in red cells',
    t1: (
      <>
        Like brain or slightly dark (<Cite doi={DOI.penckofer}>Penckofer et al.</Cite>)
      </>
    ),
    t2: 'Bright',
    swi: (
      <>
        Centre intermediate to bright, dark rim (<Cite doi={DOI.kang}>Kang et al.</Cite>, on gradient echo, agree)
      </>
    ),
    ct: (
      <>
        Bright once clotted; under 60 HU before the clot forms (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>)
      </>
    ),
  },
  {
    stage: 'Acute',
    time: '1–3 days',
    product: 'Deoxyhaemoglobin, in red cells',
    t1: (
      <>
        Like brain or slightly dark (<Cite doi={DOI.penckofer}>Penckofer et al.</Cite>)
      </>
    ),
    t2: 'Dark',
    swi: 'Dark',
    ct: (
      <>
        Bright (60–90 HU) (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>)
      </>
    ),
  },
  {
    stage: 'Early subacute',
    time: '3–7 days',
    product: 'Methaemoglobin, in red cells',
    t1: 'Bright',
    t2: 'Dark',
    swi: 'Dark',
    ct: (
      <>
        Bright, fading slowly as the dense part shrinks (<Cite doi={DOI.dolinskas}>Dolinskas et al.</Cite>)
      </>
    ),
  },
  {
    stage: 'Late subacute',
    time: '7–28 days',
    product: 'Methaemoglobin, outside red cells',
    t1: 'Bright',
    t2: 'Bright',
    swi: (
      <>
        Bright centre, dark rim (on gradient echo <Cite doi={DOI.kang}>Kang et al.</Cite> give heterogeneous bright)
      </>
    ),
    ct: (
      <>
        Fading to like brain (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>; <Cite doi={DOI.dolinskas}>Dolinskas et al.</Cite>)
      </>
    ),
  },
  {
    stage: 'Chronic',
    time: 'Over 1 month',
    product: 'Haemosiderin and ferritin',
    t1: 'Dark',
    t2: 'Bright centre, dark rim',
    swi: 'Dark rim; centre varies',
    ct: (
      <>
        Dark, like CSF; focal atrophy (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>; <Cite doi={DOI.dolinskas}>Dolinskas et al.</Cite>)
      </>
    ),
  },
]

const subduralStages: SubduralStage[] = [
  {
    stage: 'Acute',
    time: 'Up to 3 days',
    ct: (
      <>
        Bright crescent (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>)
      </>
    ),
    t1: (
      <>
        Like brain (<Cite doi={DOI.popescuMri}>Popescu et al.</Cite>)
      </>
    ),
    t2: (
      <>
        Like brain or dark; it ages as a brain haematoma does (<Cite doi={DOI.fobben}>Fobben et al.</Cite>; <Cite doi={DOI.hasan}>Hasan et al.</Cite>;{' '}
        <Cite doi={DOI.popescuMri}>Popescu et al.</Cite>)
      </>
    ),
    flair: (
      <>
        Bright (<Cite doi={DOI.popescuMri}>Popescu et al.</Cite>)
      </>
    ),
  },
  {
    stage: 'Subacute',
    time: '4–21 days',
    ct: (
      <>
        Like brain or slightly bright (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>)
      </>
    ),
    t1: 'Like brain early, then bright',
    t2: 'Dark early, then bright',
    flair: 'Bright (may be dark early)',
  },
  {
    stage: 'Chronic',
    time: 'Over 21 days',
    ct: (
      <>
        Like brain to dark (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>; <Cite doi={DOI.chen}>Chen et al.</Cite>)
      </>
    ),
    t1: (
      <>
        Mixed; often like or darker than brain (<Cite doi={DOI.hasan}>Hasan et al.</Cite>; <Cite doi={DOI.fobben}>Fobben et al.</Cite>)
      </>
    ),
    t2: (
      <>
        Mixed (<Cite doi={DOI.hasan}>Hasan et al.</Cite>)
      </>
    ),
    flair: (
      <>
        Follows T2 (<Cite doi={DOI.hasan}>Hasan et al.</Cite>)
      </>
    ),
  },
]

const otherBleeds: OtherBleed[] = [
  {
    finding: 'Acute subarachnoid haemorrhage',
    appearance: (
      <ul className="plain-list">
        <li>
          Bright sulci and cisterns on FLAIR (<Cite doi={DOI.popescuMri}>Popescu et al.</Cite>; <Cite doi={DOI.weidauer}>Weidauer et al.</Cite>)
        </li>
        <li>
          Dark on SWI and T2* GRE (<Cite doi={DOI.weidauer}>Weidauer et al.</Cite>); in one series T2* GRE was more sensitive than FLAIR, 94% against
          81% in the acute phase (<Cite doi={DOI.mitchell}>Mitchell et al.</Cite>)
        </li>
        <li>
          Bright on CT (<Cite doi={DOI.popescuCt}>Popescu et al.</Cite>, in trauma); near 100% sensitive within 6 hours of headache onset on modern CT (
          <Cite doi={DOI.perry}>Perry et al.</Cite>); sensitivity falls over days (58% by day 5 in a 1982 series, quoted by{' '}
          <Cite doi={DOI.ferrante}>Ferrante et al.</Cite>)
        </li>
      </ul>
    ),
    pointsTo: (
      <ul className="plain-list">
        <li>
          Blood in the subarachnoid space; MRI shows acute and subacute blood and has advantages over CT in the subacute phase (
          <Cite doi={DOI.mitchell}>Mitchell et al.</Cite>)
        </li>
        <li>
          Over the convexity in an older patient: a marker of CAA, the acute form of cortical siderosis (<Cite doi={DOI.charidimou}>Charidimou et al.</Cite>)
        </li>
      </ul>
    ),
  },
  {
    finding: 'Superficial siderosis',
    appearance: (
      <ul className="plain-list">
        <li>
          Dark line along the brain surface on SWI or T2* GRE, SWI more sensitive (<Cite doi={DOI.weidauer}>Weidauer et al.</Cite>)
        </li>
        <li>
          Old cortical siderosis: a double, track-like dark line (<Cite doi={DOI.weidauer}>Weidauer et al.</Cite>)
        </li>
      </ul>
    ),
    pointsTo: (
      <ul className="plain-list">
        <li>
          Infratentorial: repeated slight bleeding into the subarachnoid space, often from a spinal dural defect (<Cite doi={DOI.weidauer}>Weidauer et al.</Cite>)
        </li>
        <li>
          Over the convexity: CAA in older people; also aneurysm, AVM, RCVS, vasculitis, venous thrombosis, trauma (<Cite doi={DOI.weidauer}>Weidauer et al.</Cite>)
        </li>
        <li>
          Multifocal cortical siderosis counts as two or more lobar bleeds towards probable CAA (Boston v2.0) (<Cite doi={DOI.charidimou}>Charidimou et al.</Cite>)
        </li>
      </ul>
    ),
  },
  {
    finding: 'Cerebral microbleeds',
    appearance: (
      <ul className="plain-list">
        <li>
          Small round or oval dark dots that bloom on SWI or T2* GRE (<Cite doi={DOI.wardlaw}>Wardlaw et al.</Cite>)
        </li>
        <li>
          Generally 2–5 mm, up to 10 mm; no fixed size cut-off, as blooming varies with field strength and sequence (<Cite doi={DOI.wardlaw}>Wardlaw et al.</Cite>;{' '}
          <Cite doi={DOI.greenberg}>Greenberg et al.</Cite>)
        </li>
        <li>
          Generally not seen on CT, FLAIR, T1 or T2 (<Cite doi={DOI.wardlaw}>Wardlaw et al.</Cite>)
        </li>
        <li>
          Mimics: calcification and iron (CT shows calcium; SWI phase images tell calcium from blood, <Cite doi={DOI.weerink}>Weerink et al.</Cite>), flow voids and veins (linear or
          tubular), cavernous malformations, melanoma metastases (<Cite doi={DOI.greenberg}>Greenberg et al.</Cite>)
        </li>
      </ul>
    ),
    pointsTo: (
      <ul className="plain-list">
        <li>
          Strictly lobar: CAA. Deep or infratentorial: hypertensive vasculopathy (<Cite doi={DOI.greenberg}>Greenberg et al.</Cite>)
        </li>
        <li>
          One route to probable CAA (Boston v2.0): age 50 or over; presenting with spontaneous ICH, transient focal neurological episodes or cognitive impairment; two or
          more strictly lobar bleeds (microbleeds, haematomas or siderosis foci); no deep bleeds; no other cause (<Cite doi={DOI.charidimou}>Charidimou et al.</Cite>)
        </li>
      </ul>
    ),
  },
  {
    finding: 'FLAIR mimics of subarachnoid blood',
    appearance: (
      <>
        Bright CSF in the basal cisterns and convexity sulci on FLAIR (<Cite doi={DOI.deliganis}>Deliganis et al.</Cite>)
      </>
    ),
    pointsTo: (
      <ul className="plain-list">
        <li>
          High inspired oxygen (for example under general anaesthesia), not blood (<Cite doi={DOI.deliganis}>Deliganis et al.</Cite>;{' '}
          <Cite doi={DOI.frigon}>Frigon et al.</Cite>)
        </li>
        <li>
          Artefacts and other diseases can also brighten the CSF on FLAIR (<Cite doi={DOI.stuckey}>Stuckey et al.</Cite>)
        </li>
      </ul>
    ),
  },
]

export function HaemorrhageMriPage() {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>Haemorrhage on MRI</h2>
          <p>
            How blood looks on MRI as it ages: intracerebral haematoma and subdural haematoma by stage, then subarachnoid blood and microbleeds. The
            time ranges differ between sources, so each table says which one it follows.
          </p>
          <p className="source-note">
            Written on 2026-11-02 with the paper databases reachable; every statement was read in its source first. The scans are panels from
            open-access figures published under CC BY licences, credited under each.
          </p>
        </div>
      </section>

      <section className="info-card" id="haematoma">
        <h3 id="haematoma-title">Intracerebral haematoma</h3>
        <p className="fm-lead">
          From <Cite doi={DOI.weerink}>Weerink et al.</Cite> (Table 2); <Cite doi={DOI.penckofer}>Penckofer et al.</Cite> give the same times and{' '}
          <Cite doi={DOI.bradley}>Bradley</Cite> names the blood products the same way. Signal is against the brain; a cell from another source cites it.
        </p>
        <div className="table-wrap">
          <table className="ref-table" aria-labelledby="haematoma-title">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Time</th>
                <th scope="col">Blood product</th>
                <th scope="col">T1</th>
                <th scope="col">T2</th>
                <th scope="col">SWI / GRE</th>
                <th scope="col">CT</th>
              </tr>
            </thead>
            <tbody>
              {haematomaStages.map((row) => (
                <tr key={row.stage}>
                  <th scope="row">{row.stage}</th>
                  <td>{row.time}</td>
                  <td>{row.product}</td>
                  <td>{row.t1}</td>
                  <td>{row.t2}</td>
                  <td>{row.swi}</td>
                  <td>{row.ct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source-note">
          Time ranges differ between sources: <Cite doi={DOI.kang}>Kang et al.</Cite> use 0–12 hours, 13 hours to 3 days, 4–7 days, 8–30 days and 31 days or
          more. The CT source defines its phases by clot state, not by days. <Cite doi={DOI.penckofer}>Penckofer et al.</Cite> (Table 1) differ on some
          cells: they give the gradient-echo signal of the hyperacute and late subacute stages and the chronic T2 as dark, and the hyperacute T2 centre as
          isointense or bright. Signal depends on field strength and sequence: the
          dark effect of blood products is stronger at higher field and on gradient echo, weaker on fast spin echo (<Cite doi={DOI.bradley}>Bradley</Cite>;{' '}
          <Cite doi={DOI.parizel}>Parizel et al.</Cite>).
        </p>
        <ScanFigures
          images={[
            haemorrhageMriScans.hyperacuteHaematoma,
            haemorrhageMriScans.acuteHaematoma,
            haemorrhageMriScans.lateSubacuteHaematoma,
            haemorrhageMriScans.chronicHaematoma,
          ]}
        />
        <p className="source-note">No open-access image of an early subacute intracerebral haematoma was found.</p>
      </section>

      <section className="info-card" id="subdural">
        <h3 id="subdural-title">Subdural haematoma</h3>
        <p className="fm-lead">
          Times and the subacute row from <Cite doi={DOI.tripathy}>Tripathy et al.</Cite>; a cell from another source cites it.
        </p>
        <div className="table-wrap">
          <table className="ref-table" aria-labelledby="subdural-title">
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">Time</th>
                <th scope="col">CT</th>
                <th scope="col">T1</th>
                <th scope="col">T2</th>
                <th scope="col">FLAIR</th>
              </tr>
            </thead>
            <tbody>
              {subduralStages.map((row) => (
                <tr key={row.stage}>
                  <th scope="row">{row.stage}</th>
                  <td>{row.time}</td>
                  <td>{row.ct}</td>
                  <td>{row.t1}</td>
                  <td>{row.t2}</td>
                  <td>{row.flair}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source-note">
          Subdural blood ages like brain haematoma but more slowly, and CT or MRI cannot date it accurately (<Cite doi={DOI.hasan}>Hasan et al.</Cite>;{' '}
          <Cite doi={DOI.sieswerda}>Sieswerda-Hoogendoorn et al.</Cite>). The acute FLAIR signal comes from a single case. Rebleeding gives layers of different
          ages; bright T1 blood in an old collection suggests a rebleed, and mixed density on CT suggests fresh blood in a chronic collection (
          <Cite doi={DOI.fobben}>Fobben et al.</Cite>; <Cite doi={DOI.tripathy}>Tripathy et al.</Cite>). Chronic collections have membranes and septa, and the
          outer membrane enhances (<Cite doi={DOI.hasan}>Hasan et al.</Cite>).
        </p>
        <ScanFigures images={[haemorrhageMriScans.chronicSubdural]} />
        <p className="source-note">No open-access image of an acute or subacute subdural haematoma on MRI was found.</p>
      </section>

      <section className="info-card" id="sah-microbleeds">
        <h3 id="sah-microbleeds-title">Subarachnoid haemorrhage and microbleeds</h3>
        <p className="fm-lead">Each cell cites its own source.</p>
        <div className="table-wrap">
          <table className="ref-table" aria-labelledby="sah-microbleeds-title">
            <thead>
              <tr>
                <th scope="col">Finding</th>
                <th scope="col">Appearance</th>
                <th scope="col">What it points to</th>
              </tr>
            </thead>
            <tbody>
              {otherBleeds.map((row) => (
                <tr key={row.finding}>
                  <th scope="row">{row.finding}</th>
                  <td>{row.appearance}</td>
                  <td>{row.pointsTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScanFigures images={[haemorrhageMriScans.sahFlair, haemorrhageMriScans.superficialSiderosis, haemorrhageMriScans.microbleeds]} />
      </section>

      <LessonReferences references={references} />
    </div>
  )
}
