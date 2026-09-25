import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Silverman SG et al. Bosniak classification of cystic renal masses, version 2019: an update proposal and needs assessment. Radiology 2019.', doi: '10.1148/radiol.2019182646' },
  { citation: 'McGrath TA et al. Malignancy rates of Bosniak v2019 cystic renal masses: a systematic review and meta-analysis. AJR 2025.', doi: '10.2214/AJR.24.32342' },
  { citation: 'McGrath TA et al. Evidence for the new Bosniak class II homogeneous lesions: a systematic review. Abdom Radiol 2021.', doi: '10.1007/s00261-021-03180-y' },
  { citation: 'Pedrosa I, Cadeddu JA. How we do it: managing the indeterminate renal mass with the MRI clear cell likelihood score. Radiology 2022.', doi: '10.1148/radiol.210034' },
  { citation: 'Shetty AS et al. Clear cell likelihood score: a case-based user\'s guide. RadioGraphics 2023.', doi: '10.1148/rg.220209' },
  { citation: 'Schieda N et al. Multicenter evaluation of the clear cell likelihood score for solid small renal masses on MRI. Radiology 2022.', doi: '10.1148/radiol.211680' },
  { citation: 'Davenport MS et al. Radiologist and urologist expectations for renal mass reporting: a national survey. Abdom Radiol 2017.', doi: '10.1007/s00261-016-0962-x' },
  { citation: 'Davenport MS et al. Standardized report template for renal masses: SAR Disease-Focused Panel consensus. Abdom Radiol 2019.', doi: '10.1007/s00261-018-1851-2' },
  { citation: 'Herts BR et al. Management of the incidental renal mass on CT: a white paper of the ACR Incidental Findings Committee. J Am Coll Radiol 2018.', doi: '10.1016/j.jacr.2017.04.028' },
]

const reportTemplate = `Renal mass: [Right/Left], [upper/inter/lower pole], [anterior/posterior], [% exophytic].
Size: __ × __ × __ cm (prior: __ on [date]).
Composition: Cystic (Bosniak v2019 class __) / Solid.
Macroscopic fat: Present/Absent.   Calcification: Present/Absent.
Enhancement: __ HU unenhanced → __ HU nephrographic (Δ __ HU) / MRI: present on subtraction.
[MRI solid mass] ccLS: __.
Relationship to collecting system/renal sinus: __ mm / abuts / invades.
Renal vein/IVC: No thrombus / thrombus extending to __.
Perinephric/sinus fat, adrenal: __.
Nodes/metastases: __.
Vascular anatomy: __ renal arteries; left renal vein normal/circumaortic/retroaortic.
Contralateral kidney: __.
Impression: Most likely diagnosis + Bosniak/ccLS + stage features.`

export function RenalMassLessonPage() {
  return (
    <LessonPage
      name="Renal mass protocol CT and MRI"
      lede="Why each phase exists, the enhancement rule, Bosniak v2019, the clear cell likelihood score, and what the surgeon needs in the report."
      sourceNote="References are linked by DOI. Bosniak v2019 (Silverman et al.), ccLS (Pedrosa, Schieda, Shetty), and the SAR reporting consensus (Davenport et al.)."
      references={references}
    >
      <section className="info-card lesson-body">
        <p>Renal mass imaging comes down to three questions:</p>
        <ol className="plain-list">
          <li><strong>Is it a real mass, or just a simple cyst?</strong></li>
          <li><strong>If it's a mass, is it cystic or solid, and does it contain fat?</strong></li>
          <li><strong>If it looks like cancer, what does the surgeon need to know?</strong></li>
        </ol>
        <p>The protocol exists so you can answer all three.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 1. The protocol (why each phase exists)</h3>
        <h4>CT renal mass protocol</h4>
        <ul className="plain-list">
          <li><strong>Unenhanced:</strong> your baseline. You measure HU here, and you look for fat and calcium. Without it, you can't prove enhancement.</li>
          <li><strong>Corticomedullary phase (~30–40 s), optional:</strong> the cortex is bright here. It helps show how "hot" a solid mass is and maps the arteries for surgery.</li>
          <li><strong>Nephrographic phase (~90–120 s):</strong> the most important phase. The whole kidney enhances evenly, so masses stand out, and this is where you measure enhancement.</li>
          <li><strong>Excretory phase, optional:</strong> shows the collecting system, which matters for partial nephrectomy planning.</li>
          <li><strong>Technique:</strong> thin slices, ideally ≤3 mm. Place the ROI in the central two-thirds of the mass and keep it away from the edges.</li>
        </ul>
        <div className="lesson-key">
          <p><strong>The enhancement rule (CT)</strong>, measured from unenhanced to nephrographic:</p>
          <ul className="plain-list">
            <li><strong>≥20 HU rise:</strong> enhances, so it's a mass.</li>
            <li><strong>10–19 HU:</strong> equivocal. Often this is <strong>pseudoenhancement</strong>, a beam-hardening artifact that makes small cysts inside the kidney look like they enhance.</li>
            <li><strong>{'<'}10 HU:</strong> does not enhance.</li>
          </ul>
        </div>
        <h4>MRI renal mass protocol</h4>
        <ul className="plain-list">
          <li><strong>T2 (HASTE/SSFSE):</strong> separates simple fluid from solid tissue. T2 signal is a key clue for the tumor subtype.</li>
          <li><strong>T1 in-phase/opposed-phase:</strong> signal drop on opposed-phase means <em>microscopic</em> fat. Typical of clear cell RCC and some fat-poor AMLs.</li>
          <li><strong>DWI:</strong> supportive only. Never used alone.</li>
          <li><strong>T1 fat-sat before and after contrast (dynamic):</strong> corticomedullary, nephrographic, and excretory phases.</li>
          <li><strong>Subtraction images:</strong> the most important MRI trick. A cyst that is bright on T1 (blood or protein) can look like it "enhances." Subtraction (post minus pre) shows whether real enhancement is present.</li>
        </ul>
        <p>Choose MRI when the CT is indeterminate, the patient can't get iodinated contrast, the lesion is T1-bright, or you want to apply the clear cell likelihood score (Part 4).</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 2. Step-by-step reading</h3>
        <div className="lesson-step">
          <h4>Step 1. Is there macroscopic fat?</h4>
          <ul className="plain-list">
            <li>Look for regions below −10 HU on unenhanced CT, or signal loss on fat-suppressed MRI.</li>
            <li>If fat is present and there is <strong>no calcification</strong>, it is essentially an angiomyolipoma (AML).</li>
            <li>Fat <em>plus</em> calcification is a warning sign. Rarely, RCC can engulf fat.</li>
          </ul>
        </div>
        <div className="lesson-step">
          <h4>Step 2. Cystic or solid?</h4>
          <ul className="plain-list">
            <li>In Bosniak v2019, a mass is <strong>solid</strong> if more than about 25% of it is enhancing tissue.</li>
            <li>Anything less is <strong>cystic</strong>, and you use the Bosniak classification (Part 3).</li>
          </ul>
        </div>
        <div className="lesson-step">
          <h4>Step 3. If cystic, classify it with Bosniak</h4>
          <p>You look at the wall, the septa, and any nodules.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 4. If solid, try to narrow the subtype</h4>
          <p>The main question is clear cell RCC versus everything else (papillary RCC, oncocytoma, fat-poor AML, chromophobe RCC). On MRI, this is what the ccLS does.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 5. Stage it</h4>
          <p>See Part 5.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 6. Surgical anatomy</h4>
          <p>See Part 5.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 3. Bosniak v2019 (cystic masses), simplified</h3>
        <p>The 2019 update came from the SAR Disease-Focused Panel. It added MRI, defined terms precisely, and moved more benign lesions into lower-risk classes (<Cite doi="10.1148/radiol.2019182646">Silverman et al., Radiology 2019</Cite>).</p>
        <p><strong>Measurement words you need:</strong></p>
        <ul className="plain-list">
          <li><strong>Wall/septa thickness:</strong> thin ≤2 mm, minimally thickened 3 mm, thick ≥4 mm.</li>
          <li><strong>Protrusion:</strong> "obtuse" forms a wide angle with the wall. "Acute" is a sharp angle, like a knob sticking out.</li>
          <li><strong>Nodule:</strong> an obtuse protrusion of ≥4 mm, <strong>or</strong> an acute protrusion of any size.</li>
        </ul>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Class</th><th>What you see (simplified)</th><th>Usual action</th></tr></thead>
            <tbody>
              <tr><td><strong>I</strong></td><td>Thin smooth wall, simple fluid, no septa/calcium</td><td>Benign, nothing</td></tr>
              <tr><td><strong>II</strong></td><td>1–3 thin septa; fine calcium; or homogeneous lesions like: −9 to 20 HU unenhanced, ≥70 HU unenhanced (hyperdense cyst), 21–30 HU portal venous; very bright on T2 like CSF</td><td>Benign, nothing</td></tr>
              <tr><td><strong>IIF</strong></td><td>≥4 thin smooth septa; OR minimally thickened (3 mm) smooth wall/septa; OR (MRI) heterogeneously T1-bright</td><td>Follow-up imaging</td></tr>
              <tr><td><strong>III</strong></td><td>Thick (≥4 mm) or irregular (obtuse protrusion ≤3 mm) enhancing wall/septa</td><td>Surgery or surveillance discussion</td></tr>
              <tr><td><strong>IV</strong></td><td>One or more enhancing <strong>nodules</strong></td><td>Treat as malignant</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>How often each class is actually cancer.</strong> A 2025 meta-analysis pooled 975 cystic masses (<Cite doi="10.2214/AJR.24.32342">McGrath et al., AJR 2025</Cite>): class I 0%, class II ~9%, class IIF ~26%, class III ~80%, class IV ~88%.</p>
        <p>The IIF number depends heavily on how "truth" was defined. It was about 41% when the reference was surgery, but only about 2% when it was imaging follow-up. Surgical series only include the suspicious-looking IIF masses that someone chose to resect, so they overstate the risk.</p>
        <p><strong>Evidence for the new class II homogeneous lesions.</strong> A systematic review found 0 cancers among 1,454 homogeneous lesions measuring 9–20 HU unenhanced, 0 among 454 lesions at 21–30 HU portal venous, and 0 among 32 hyperdense (≥70 HU) lesions. The "too small to characterize" category has no supporting data and rests on expert opinion (<Cite doi="10.1007/s00261-021-03180-y">McGrath et al., Abdom Radiol 2021</Cite>).</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 4. Solid masses on MRI: clear cell likelihood score (ccLS)</h3>
        <p><strong>Why it matters:</strong> about 1 in 5 small solid renal masses (≤4 cm) is benign. Clear cell RCC is the most common subtype and the one most likely to behave aggressively (<Cite doi="10.1148/radiol.210034">Pedrosa & Cadeddu, Radiology 2022</Cite>).</p>
        <p>The ccLS is a 1–5 score for how likely the mass is to be clear cell RCC (1 = very unlikely, 5 = very likely). It applies to solid masses <strong>without</strong> macroscopic fat.</p>
        <p><strong>Main features, in order:</strong></p>
        <ol className="plain-list">
          <li><strong>T2 signal compared with renal cortex.</strong> Bright favors clear cell. Dark favors papillary RCC or fat-poor AML.</li>
          <li><strong>Corticomedullary enhancement.</strong> Intense enhancement favors clear cell. Mild enhancement favors papillary.</li>
          <li><strong>Microscopic fat</strong> (opposed-phase signal drop). Pushes the score toward clear cell, or toward fat-poor AML if the mass is T2-dark.</li>
        </ol>
        <p><strong>Supporting features:</strong></p>
        <ul className="plain-list">
          <li><strong>Segmental enhancement inversion:</strong> one part enhances early and another enhances late, and they swap. Suggests oncocytoma or chromophobe RCC.</li>
          <li>Arterial-to-delayed enhancement ratio.</li>
          <li>Diffusion restriction.</li>
        </ul>
        <p>These come from the case-based user's guide by <Cite doi="10.1148/rg.220209">Shetty et al., RadioGraphics 2023</Cite>. It walks through real examples of every score and is the best single paper to read alongside cases.</p>
        <div className="lesson-key">
          <p><strong>Classic patterns to recognize:</strong></p>
          <ul className="plain-list">
            <li><strong>Clear cell RCC:</strong> T2-bright + intense early enhancement ± microscopic fat → ccLS 4–5.</li>
            <li><strong>Papillary RCC:</strong> T2-dark, homogeneous, mild/slow enhancement → ccLS 1.</li>
            <li><strong>Fat-poor AML:</strong> T2-dark + avid enhancement ± microscopic fat → low ccLS. Suggest this diagnosis in the report.</li>
            <li><strong>Oncocytoma/chromophobe:</strong> intermediate T2, segmental enhancement inversion.</li>
          </ul>
        </div>
        <p><strong>How well it works.</strong> In a 5-center study of 250 solid small renal masses (<Cite doi="10.1148/radiol.211680">Schieda et al., Radiology 2022</Cite>), a score of ≥4 had about 75% sensitivity and 78% specificity for clear cell RCC; a score of ≤2 had an 88% negative predictive value; agreement between readers was moderate (κ 0.58). In plain terms: ccLS is useful, but it does not replace biopsy when the answer would change management.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 5. Staging and surgical anatomy</h3>
        <p><strong>Staging (AJCC 8th T-stage, simplified):</strong></p>
        <ul className="plain-list">
          <li><strong>T1a:</strong> ≤4 cm. <strong>T1b:</strong> 4–7 cm. <strong>T2a:</strong> 7–10 cm. <strong>T2b:</strong> {'>'}10 cm. All confined to the kidney.</li>
          <li><strong>T3a:</strong> tumor in the renal vein or its branches, or in perinephric or renal sinus fat.</li>
          <li><strong>T3b:</strong> thrombus in the IVC below the diaphragm.</li>
          <li><strong>T3c:</strong> thrombus in the IVC above the diaphragm, or invading the IVC wall.</li>
          <li><strong>T4:</strong> beyond Gerota fascia, or directly invading the ipsilateral adrenal.</li>
        </ul>
        <p>Also look for retroperitoneal nodes (especially enlarged ones) and metastases: lung bases, liver, bone, adrenals, pancreas, and the contralateral kidney.</p>
        <p><strong>What the surgeon needs:</strong></p>
        <ul className="plain-list">
          <li><strong>Relationship to the collecting system and renal sinus.</strong> Decides whether partial nephrectomy is feasible.</li>
          <li><strong>Exophytic vs endophytic, anterior vs posterior, polar location.</strong> The elements of the RENAL nephrometry score.</li>
          <li><strong>Vascular anatomy:</strong> number of renal arteries, early branching, circumaortic or retroaortic left renal vein.</li>
          <li><strong>The other kidney:</strong> present and normal? This matters a great deal if you're recommending nephrectomy.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 6. What the report should include</h3>
        <p>A national survey of radiologists and urologists agreed these items are essential (<Cite doi="10.1007/s00261-016-0962-x">Davenport et al., Abdom Radiol 2017</Cite>): size with comparison to priors, cystic vs solid, presence of fat, enhancement, radiologic stage, and Bosniak class for cystic masses. Urologists also wanted the nephrometry features. Most urologists preferred <strong>no management recommendations</strong> for solid masses or Bosniak III–IV. The SAR panel then turned these items into a formal template by expert consensus (<Cite doi="10.1007/s00261-018-1851-2">Davenport et al., Abdom Radiol 2019</Cite>).</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p><strong>For incidental masses on routine CT</strong> (not renal protocol studies), use the ACR Incidental Findings algorithm. It tells you when a lesion can be called benign and when it needs dedicated imaging (<Cite doi="10.1016/j.jacr.2017.04.028">Herts et al., JACR 2018</Cite>).</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Practice cases</h3>
        <p>Illustrative scenarios built on the rules above.</p>
        <ol className="plain-list">
          <li><strong>2 cm homogeneous lesion, 15 HU unenhanced, 18 HU nephrographic.</strong> Bosniak II (9–20 HU homogeneous). The 3 HU change is not enhancement. No follow-up.</li>
          <li><strong>3 cm cystic lesion with 5 thin smooth septa.</strong> Bosniak IIF (≥4 thin septa). Follow-up imaging.</li>
          <li><strong>Cystic lesion with a 5 mm obtuse enhancing bump on the wall.</strong> Bosniak IV (obtuse protrusion ≥4 mm counts as a nodule).</li>
          <li><strong>2.5 cm solid mass: T2-dark, mild enhancement, no fat.</strong> ccLS 1. Papillary RCC is favored; clear cell is unlikely.</li>
          <li><strong>2.5 cm solid mass: T2-bright, intense corticomedullary enhancement, opposed-phase signal drop.</strong> ccLS 5. Clear cell RCC.</li>
          <li><strong>Incidental 1.5 cm lesion at 16 HU on portal venous CT with no unenhanced images.</strong> Homogeneous 21–30 HU on portal venous is Bosniak II. A homogeneous lesion below that range is also considered benign under v2019.</li>
        </ol>
      </section>
    </LessonPage>
  )
}
