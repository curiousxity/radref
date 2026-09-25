import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'MERCURY Study Group. Extramural depth of tumor invasion at thin-section MR in patients with rectal cancer. Radiology 2007.', doi: '10.1148/radiol.2431051825' },
  { citation: 'Taylor FG et al. Preoperative MRI assessment of circumferential resection margin predicts disease-free survival and local recurrence (MERCURY). J Clin Oncol 2014.', doi: '10.1200/JCO.2012.45.3258' },
  { citation: 'ESGAR consensus on MRI of rectal cancer, 2026 update. Eur Radiol.', doi: '10.1007/s00330-025-12274-w' },
  { citation: 'Nougaret S et al. The use of MR imaging in treatment planning for patients with rectal carcinoma: DISTANCE. Radiology 2013.', doi: '10.1148/radiol.13121361' },
  { citation: 'Smith NJ et al. MRI for detection of extramural vascular invasion in rectal cancer. AJR 2008.', doi: '10.2214/AJR.08.1298' },
  { citation: 'Lord AC et al. MRI-diagnosed tumour deposits and EMVI status as prognostic markers in rectal cancer. Lancet Oncol 2022.', doi: '10.1016/S1470-2045(22)00214-5' },
  { citation: 'Beets-Tan RGH et al. MRI for clinical management of rectal cancer: ESGAR consensus 2016. Eur Radiol 2018.', doi: '10.1007/s00330-017-5026-2' },
  { citation: 'Nodal staging accuracy of ESGAR criteria. Eur Radiol 2025.', doi: '10.1007/s00330-025-11361-2' },
  { citation: 'Ogura A et al. Neoadjuvant chemoradiotherapy with and without lateral lymph node dissection in low rectal cancer. J Clin Oncol 2019.', doi: '10.1200/JCO.18.00032' },
  { citation: 'Lambregts DMJ et al. Current controversies in TNM for the radiological staging of rectal cancer. Eur Radiol 2022.', doi: '10.1007/s00330-022-08591-z' },
  { citation: 'Society of Abdominal Radiology rectal cancer lexicon, 2019. Abdom Radiol.', doi: '10.1007/s00261-019-02170-5' },
  { citation: 'Society of Abdominal Radiology rectal cancer lexicon, 2023 update. Abdom Radiol.', doi: '10.1007/s00261-023-03893-2' },
  { citation: 'Horvat N et al. MRI of rectal cancer: tumor staging, imaging techniques, and management. RadioGraphics 2019.', doi: '10.1148/rg.2019180114' },
  { citation: 'Fraum TJ et al. Rectal MRI image quality. Abdom Radiol 2023.', doi: '10.1007/s00261-023-03850-z' },
]

const reportTemplate = `Location: __ cm from [anal verge/anorectal junction]; length __ cm;
  clock position __; [above/straddles/below] peritoneal reflection
Morphology: [polypoid/annular/semi-annular]; mucinous [yes/no]
T category: __ ; extramural depth __ mm
Sphincter/anal canal: [not involved / layers involved]
MRF: [clear / involved]; shortest distance __ mm at __ o'clock,
  due to [tumor/EMVI/deposit/irregular node]
EMVI: [absent/present]
Mesorectal nodes/deposits: [describe]; lateral nodes: side, site, short axis
Impression: mrT__ N[0/possibly +/+], MRF [+/-], EMVI [+/-], [anal+]`

export function RectalMriLessonPage() {
  return (
    <LessonPage
      name="Rectal MRI: staging a new rectal cancer"
      lede="A step-by-step reading routine, the findings that change management, and what the report must say."
      sourceNote="References are linked by DOI. Guidance reflects the 2026 ESGAR update and the Society of Abdominal Radiology lexicon."
      references={references}
    >
      <section className="info-card lesson-body">
        <h3>The big idea</h3>
        <p>Rectal MRI is mostly one job done three ways: staging a new rectal cancer, restaging after treatment, and mapping perianal fistulas. This lesson covers the first, staging a new cancer, because everything else builds on it.</p>
        <p>The surgeon removes the rectum inside its fatty envelope, the mesorectum. The thin wrapper around that fat is the <strong>mesorectal fascia (MRF)</strong>, and that is the surgical cutting plane. Your report answers one question: can the surgeon cut along that plane and stay clear of tumor, or does the patient need chemo/radiation first?</p>
        <p>The MERCURY study showed MRI can answer this. MRI measured tumor spread beyond the wall to within 0.5 mm of pathology (<Cite doi="10.1148/radiol.2431051825">MERCURY, Radiology 2007</Cite>). A tumor within 1 mm of the MRF on MRI predicted local recurrence (hazard ratio 3.5) better than TNM stage did (<Cite doi="10.1200/JCO.2012.45.3258">Taylor et al., J Clin Oncol 2014</Cite>).</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Which images to trust</h3>
        <p>The key series is the <strong>thin-slice T2 (3 mm or less, no fat sat), angled perpendicular to the tumor</strong>. If the angle is off, the wall looks falsely thick and you overstage. Sagittal T2 is for height and length. Coronal T2 is for low tumors and the sphincter. One large field-of-view series covers the pelvic side walls and groin nodes.</p>
        <p>DWI helps you find a small tumor, but the 2026 ESGAR update says it adds little to T stage, MRF, or node calls. Contrast is not needed, and rectal gel is no longer recommended (<Cite doi="10.1007/s00330-025-12274-w">ESGAR consensus update, Eur Radiol 2026</Cite>).</p>
        <div className="lesson-key">
          <p>On T2, normal wall shows a bright submucosa and a dark muscle layer (muscularis propria), with bright fat outside. Tumor is intermediate gray, brighter than muscle and darker than fat. A very bright tumor is mucinous. Say so in the report, because mucinous tumors respond worse to treatment.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Step-by-step search pattern</h3>
        <p>The "DISTANCE" checklist is a helpful memory aid (<Cite doi="10.1148/radiol.13121361">Nougaret et al., Radiology 2013</Cite>).</p>

        <div className="lesson-step">
          <h4>Step 1. Find it and measure height (sagittal)</h4>
          <ul className="plain-list">
            <li>Measure from the anal verge or the anorectal junction to the lower edge of the tumor, and say which landmark you used.</li>
            <li>Give the tumor length and the clock-face position (12 o'clock is anterior).</li>
            <li>Say whether it is above, across, or below the anterior peritoneal reflection.</li>
            <li>The upper limit of the rectum is the <strong>sigmoid take-off</strong>, where the bowel sweeps forward away from the sacrum. A tumor starting above that is a sigmoid cancer.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. T stage (angled axial T2)</h4>
          <p>Follow the dark muscle line around the tumor.</p>
          <ul className="plain-list">
            <li>Line intact: T1 or T2. MRI cannot reliably separate the two, so report "T1–2."</li>
            <li>Gray tumor pushing through the line into fat with a broad or nodular front: T3. Thin spiky strands alone are usually just scarring.</li>
            <li>Measure how far tumor goes past the muscle: T3a under 1 mm, T3b 1–5 mm, T3c over 5 to 15 mm, T3d over 15 mm. More than 5 mm usually means pre-op treatment.</li>
            <li>T4a: reaches the peritoneal reflection. T4b: invades an organ or skeletal muscle (levator, puborectalis, external sphincter).</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 3. MRF distance</h4>
          <p>Measure the shortest gap between tumor and MRF, and give the clock position.</p>
          <ul className="plain-list">
            <li><strong>1 mm or less means involved.</strong> The old "threatened, 1–2 mm" category was dropped.</li>
            <li>Also count the MRF as involved if tumor in a vein or an irregular nodule is within 1 mm of it.</li>
            <li>A smooth node touching the fascia does not count.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. EMVI (tumor in veins outside the wall)</h4>
          <p>Look for a tubular structure leaving the tumor that carries tumor signal instead of a black flow void, often widened or irregular (<Cite doi="10.2214/AJR.08.1298">Smith et al., AJR 2008</Cite>). EMVI predicts distant metastases. In a surgery-only cohort, EMVI, tumor deposits, and MRF involvement sorted risk better than T and N stage (<Cite doi="10.1016/S1470-2045(22)00214-5">Lord et al., Lancet Oncol 2022</Cite>).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Nodes</h4>
          <p>Size alone is weak. The ESGAR rules are:</p>
          <ul className="plain-list">
            <li>Short axis 9 mm or more: suspicious.</li>
            <li>5–8 mm: needs two bad features (round, irregular border, mixed signal).</li>
            <li>Under 5 mm: needs all three (<Cite doi="10.1007/s00330-017-5026-2">Beets-Tan et al., Eur Radiol 2018</Cite>).</li>
          </ul>
          <p>These rules have only about 54% sensitivity (<Cite doi="10.1007/s00330-025-11361-2">Eur Radiol 2025</Cite>). So the 2026 update tells you to give a confidence level: cN0, possibly cN+, or cN+.</p>
          <p><strong>Lateral nodes</strong> (obturator, internal iliac): a short axis of 7 mm or more is suspicious. In 1,216 patients, these nodes carried a 19.5% lateral recurrence rate without node dissection, versus 5.7% with it (<Cite doi="10.1200/JCO.18.00032">Ogura et al., J Clin Oncol 2019</Cite>). Common and external iliac nodes and inguinal nodes (unless the tumor reaches the anal canal) count as M1, not N.</p>
          <p>Irregular nodules sitting along a vein with no node shape are <strong>tumor deposits</strong>. Describe them separately.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Low tumors (coronal)</h4>
          <p>State which layers are involved: internal sphincter, intersphincteric space, external sphincter or levator. Also state how far down it goes. This decides whether the sphincter can be saved. Add "anal+" if the anal canal is involved (<Cite doi="10.1007/s00330-022-08591-z">Lambregts et al., Eur Radiol 2022</Cite>).</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>What the report must contain</h3>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>The terms follow the Society of Abdominal Radiology lexicon (<Cite doi="10.1007/s00261-019-02170-5">2019</Cite>, <Cite doi="10.1007/s00261-023-03893-2">2023 update</Cite>).</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Cases to look at</h3>
        <p>Open these alongside the lesson; each one has labeled images.</p>
        <ul className="plain-list">
          <li><strong>Horvat et al., RadioGraphics 2019</strong> (free full text). Labeled cases of every T stage, MRF involvement, EMVI, and nodes. <Cite doi="10.1148/rg.2019180114">doi:10.1148/rg.2019180114</Cite></li>
          <li><strong>Lambregts et al., Eur Radiol 2022</strong> (free). Built on 41 image cases that 321 readers disagreed on. A good map of the traps. <Cite doi="10.1007/s00330-022-08591-z">doi:10.1007/s00330-022-08591-z</Cite></li>
          <li><strong>Fraum et al., Abdom Radiol 2023</strong>. Good versus bad image quality, with examples. <Cite doi="10.1007/s00261-023-03850-z">doi:10.1007/s00261-023-03850-z</Cite></li>
        </ul>
      </section>
    </LessonPage>
  )
}
