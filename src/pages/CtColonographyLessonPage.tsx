import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Yee J, Dachman A, Kim DH, et al. C-RADS: version 2023 update. Radiology 2024;310(1):e232007. (free access; the main source above)', doi: '10.1148/radiol.232007' },
  { citation: 'Zalis ME et al. CT colonography reporting and data system: a consensus proposal. Radiology 2005;236:3–9. (Original C-RADS.)', doi: '10.1148/radiol.2361041926' },
  { citation: 'Johnson CD et al. Accuracy of CT colonography for detection of large adenomas and cancers. NEJM 2008;359:1207–17. (ACRIN 6664.)', doi: '10.1056/NEJMoa0800996' },
  { citation: 'Kim DH et al. CT colonography versus colonoscopy for the detection of advanced neoplasia. NEJM 2007;357:1403–12.', doi: '10.1056/NEJMoa070543' },
  { citation: 'Kim DH, Moreno CC, Pickhardt PJ. CT colonography: pearls and pitfalls. Radiol Clin North Am 2018;56:719–35.', doi: '10.1016/j.rcl.2018.05.004' },
  { citation: 'Ricci ZJ et al. CT colonography: improving interpretive skill by avoiding pitfalls. RadioGraphics 2020;40:98–119. (Case-rich pitfalls atlas.)', doi: '10.1148/rg.2020190078' },
  { citation: 'Lips LM et al. Sigmoid cancer versus chronic diverticular disease: differentiating features at CTC. Radiology 2015;275:127–35.', doi: '10.1148/radiol.14132829' },
  { citation: 'Kim DH et al. Serrated polyps at CT colonography: prevalence and characteristics of the serrated polyp spectrum. Radiology 2016;280:455–63.', doi: '10.1148/radiol.2016151608' },
  { citation: 'Pickhardt PJ et al. Carpet lesions detected at CT colonography: clinical, imaging, and pathologic features. Radiology 2014;270:435–43.', doi: '10.1148/radiol.13130812' },
  { citation: 'Pooler BD et al. CT Colonography Reporting and Data System (C-RADS): benchmark values from a clinical screening program. AJR 2014;202:1232–7.', doi: '10.2214/AJR.13.11272' },
  { citation: 'ACR–SAR–SCBT-MR Practice Parameter for the Performance of CT Colonography in Adults (acr.org).' },
]

const reportTemplate = `Indication: screening vs diagnostic; prior colonoscopy result; anticoagulation, etc.
Technique: prep and tagging agents; CO2 insufflation; supine + prone (± decubitus);
  low dose; IV contrast yes/no; 2D + 3D review.
Quality: distension adequate in all segments (name any collapsed segment and whether
  the other position covered it); cleansing good/fair/poor; tagging effective.
Colon: overall description (redundancy, diverticulosis and its extent).
  Each lesion ≥6 mm: size (largest dimension, method used, series/image), segment and
  position within it, morphology (sessile/pedunculated/flat), attenuation (soft tissue),
  confidence. Masses described separately: wall thickening, length, shouldering,
  pericolic extension, nodes (if contrast).
Extracolonic: organ by organ, briefly; note the limitation of unenhanced low-dose technique.
Impression:
  1) C-RADS C category with the specific recommendation
     (colonoscopy / repeat CTC in 3 years / 5-year screening).
  2) E category with recommendation.
  Keep the two separate so the referrer can act on each.`

export function CtColonographyLessonPage() {
  return (
    <LessonPage
      name="CT colonography and C-RADS 2023"
      lede="Technique checks, the 2D and 3D reading routine, how to interrogate and measure a polyp, the mimics, the C-RADS categories, and what the report must contain."
      sourceNote="The backbone is the C-RADS 2023 update (Yee et al., Radiology 2024), the standard everyone reports against now."
      references={references}
    >
      <section className="info-card lesson-body">
        <h3>1. What the study is for, and how good it is</h3>
        <p>CTC is a screening and diagnostic test for polyps and cancer. Its accuracy is well established: in the ACRIN 6664 trial, CTC identified 90% of subjects with adenomas or cancers measuring 10 mm or more, and per-patient sensitivity for adenomas of 6 mm or more was 0.78. Two practical takeaways: the sensitivity difference between primary 2D reading (87%) and primary 3D reading (88%) was not significant, so pick whichever primary method you're comfortable with, but always use both. And the target that matters is 10 mm and up; small polyps are secondary.</p>
        <p>Common indications: primary screening (every 5 years), incomplete colonoscopy (very common referral), patients on anticoagulation or too frail for colonoscopy, and diagnostic workup with IV contrast.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>2. Before you start: check the technique</h3>
        <p>A CTC read is only as good as the prep. Confirm four things before you look for polyps:</p>
        <ul className="plain-list">
          <li><strong>Cleansing</strong>: residual stool is the number one source of false positives.</li>
          <li><strong>Tagging</strong>: the patient drank oral contrast (barium and/or iodine) so residual stool and fluid turn bright. This is what lets you dismiss stool. Poor fluid tagging causes pseudolesions in the ascending colon: dilute inhomogeneous fluid tagging with dependent mottled hyperdense contrast and short tubular hypoattenuated structures.</li>
          <li><strong>Distension</strong>: ideally automated CO2 insufflation via a rectal catheter. A collapsed segment cannot be cleared.</li>
          <li><strong>Two positions</strong>: supine and prone as standard, sometimes decubitus added. Every segment needs to be distended in at least one position. Fluid pools dependently, so the two positions cover each other.</li>
        </ul>
        <p>Screening CTC is low dose and without IV contrast. Diagnostic (symptomatic) CTC often adds IV contrast, which also allows cancer staging.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>3. Step-by-step reading</h3>

        <div className="lesson-step">
          <h4>Step 1. Quick 2D survey</h4>
          <p>Scroll the whole axial dataset on both positions in a wide window. Look for gross abnormalities (mass, obstruction, perforation, free air) and get a feel for the prep quality. Decide right now whether the study is adequate.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Set the polyp window</h4>
          <p>This matters more than it sounds. The preferred "polyp window" is width 1500–2000 HU and level −200 to 0 HU. This wide window lets you tell a soft-tissue polyp from gas, from tagged fluid, and from fat all at once. Standard soft tissue windows (400/30) help accentuate soft tissue for polyp evaluation but should not be used primarily for detection, because polyps can be obscured.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Primary read of the colon</h4>
          <p>Two acceptable approaches; both require the other as a check. Interpretation requires interactive use of both 2D and 3D data sets.</p>
          <ul className="plain-list">
            <li><em>Primary 2D:</em> trace the colon segment by segment from rectum to cecum on axial images, supine then prone. Look at every fold.</li>
            <li><em>Primary 3D:</em> endoluminal flythrough. The endoluminal perspective with a 120° field of view is the standard format; navigate the length of the colon in both retrograde and antegrade directions (so you see the back of every fold). Do this for both positions.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Interrogate every candidate lesion</h4>
          <p>This is the heart of the exam. Ask five questions:</p>
          <ol className="plain-list">
            <li><em>Is it soft tissue?</em> Confirm on 2D with the window changed. Macroscopic fat indicates a lipoma, fibrolipoma, or an inverted diverticulum, all benign and not requiring colonoscopy. Foci of air or tagging agent within a lesion mean retained fecal matter.</li>
            <li><em>Is it fixed to the wall?</em> A polyp is a homogeneous soft-tissue lesion arising from the mucosa, with a fixed point of attachment to the wall, projecting into the lumen. Stool usually moves to the dependent wall between supine and prone, though be careful: fecal matter may or may not shift.</li>
            <li><em>Is it there in both positions?</em> A real polyp is (unless that segment is collapsed or under fluid in one position).</li>
            <li><em>Is it a normal structure?</em> Thick fold, ileocecal valve, anal papilla, rectal catheter balloon.</li>
            <li><em>Is it a contrast-coated flat lesion?</em> Adherent contrast on the surface of a lesion is a helpful sign, not stool; the tagging agent sticks to mucin produced by the polyp.</li>
          </ol>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Measure correctly</h4>
          <p>Size drives management, so this is the highest-stakes measurement in the report.</p>
          <ul className="plain-list">
            <li>Measure the single largest dimension; simple axial measurements alone may be inadequate.</li>
            <li>Pedunculated polyps: measure the largest dimension of the head, exclusive of the stalk.</li>
            <li>Tagging agent adherent to the lesion surface is not included in the measurement.</li>
            <li>Know the bias: 2D measurements tend to underestimate true size compared with 3D by approximately 1 mm. At the 9 vs 10 mm boundary, measure on 3D.</li>
            <li>Report how the measurement was obtained (3D, standard 2D, or optimized oblique 2D), note the series and section, or save an annotated 2D image.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Locate</h4>
          <p>Use the six segments: rectum, sigmoid, descending, transverse, ascending, cecum, and say proximal/mid/distal within the segment. Two things to avoid: don't use "flexure" as a location descriptor, and don't give a distance from the anal verge, because colonoscopy measurements are up to half of the true centerline CTC distance due to telescoping and pleating of the colon over the scope.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Extracolonic survey</h4>
          <p>Now look at everything else, with tempered expectations. The lack of IV contrast and the low-dose technique may make characterization of these findings difficult or impossible. Priorities: aortic aneurysm, renal masses, lung bases, adnexal masses, lymphadenopathy, bone density. In ACRIN, extracolonic findings were present in 66% of participants, of which only 16% were important enough to need further evaluation, so the skill here is not over-calling.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Assign C-RADS categories</h4>
          <p>See section 5.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>4. Pathology and mimics you need to recognize</h3>
        <p><strong>Polyp morphology.</strong> Sessile (broad-based), pedunculated (visible stalk), or flat. Flat or plaque-like lesions, typically less than 3 mm in vertical elevation, are "non-polypoid lesions." Carpet lesions (laterally spreading tumors) are the large flat ones, typically rectum and right colon.</p>
        <p><strong>Sessile serrated lesions.</strong> The hard ones. Flat, right-sided, easy to miss on both CTC and colonoscopy. The trick is the contrast cap: up to 85% may be coated with contrast material, which helps highlight them. When you see a smooth plaque with a bright coat along a fold in the ascending colon, take it seriously.</p>
        <div className="lesson-key">
          <p><strong>Why size matters.</strong> In a screening cohort of 13,992 patients, the proportion of advanced adenomas (including serrated lesions) was 1.7% in polyps ≤5 mm and 6.6% in polyps 6–9 mm, compared with 30.6% in polyps ≥10 mm; the risk of cancer in these three size ranges is 0%, 0.2%, and 2.6%. That's why diminutive polyps aren't reported and 10 mm is the polypectomy threshold.</p>
        </div>
        <p><strong>Lipoma.</strong> Fat density, smooth, often at the ileocecal valve. Benign, no colonoscopy needed. Distinguish from the very common fatty valve: ICV lipomatosis (lipohyperplasia) is benign, usually asymptomatic, and needs no follow-up.</p>
        <p><strong>Subepithelial lesions</strong> (GIST, leiomyoma, neural tumors). Smooth contour with intact overlying mucosa. Endoscopic biopsies may be nondiagnostic, so suggest endoscopic ultrasound when 1 cm or larger.</p>
        <p><strong>Cancer.</strong> Mass of 3 cm or more, or any malignant-looking lesion: irregular surface, shouldering, annular narrowing. Sensitivity and specificity of CTC for colonic masses approaches 100%. With IV contrast you can also stage T and N and look for liver metastases.</p>
        <p><strong>Diverticular disease vs cancer</strong>, the classic sigmoid dilemma, now with its own category (C2b). Benign features: luminal narrowing and concentric wall thickening with preserved haustral architecture and no mucosal irregularity on 3D, plus diverticulosis and no overhanging edges or shoulders. Compare positions: a segment that distends better prone than supine is muscular, not tumor.</p>
        <p><strong>Pseudolesions (false positives).</strong> Artifacts and pseudolesions are common at CTC and far exceed the frequency of true pathology. The classic list: the ileocecal valve, retained stool, retained barium, respiratory artifacts, and a stool-filled diverticulum. Two rules save you: most pseudolesions are seen only on 3D and disappear when you check 2D; and stool contains gas or tagging and moves.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>5. C-RADS 2023: the categories</h3>
        <h4>Colonic (C)</h4>
        <ul className="plain-list">
          <li><strong>C0</strong>: inadequate study. Collapsed segment, poor prep, or a prior study is needed and unavailable.</li>
          <li><strong>C1</strong>: normal or benign. No polyp ≥6 mm; diverticula, lipomas, diminutive polyps are fine here. Routine screening in 5–10 years.</li>
          <li><strong>C2a</strong>: one or two polyps of 6–9 mm. Either colonoscopy or repeat CTC in 3 years. Add a confidence statement (low/moderate/high). In prior series most polyps of this size were stable or regressed, with only 22–35% progressing within 3 years.</li>
          <li><strong>C2b</strong> (new): likely benign mass-like diverticular stricture / myochosis. Follow-up CTC at 5 years if confident, 3 years or less if not; call it C4 if you're worried.</li>
          <li><strong>C3</strong>: any polyp ≥10 mm, or three or more 6–9 mm polyps, or a C2a polyp that has grown. Colonoscopic polypectomy.</li>
          <li><strong>C4</strong>: mass ≥30 mm or malignant-appearing. Surgical/oncologic referral, with or without biopsy.</li>
        </ul>
        <h4>Extracolonic (E)</h4>
        <ul className="plain-list">
          <li><strong>E0</strong>: inadequate (optional, rarely used).</li>
          <li><strong>E1/E2</strong>: nothing needing follow-up (normal, or unimportant findings like simple cysts, calcified granulomas). The old E1 and E2 were merged because either way, no follow-up is needed.</li>
          <li><strong>E3</strong>: indeterminate but likely unimportant (e.g. a small hypodense renal lesion you can't characterize without contrast). Work-up optional.</li>
          <li><strong>E4</strong>: likely important (AAA, solid renal mass, adnexal mass, suspicious lung nodule). Needs work-up.</li>
        </ul>
        <p>The report gets one overall C and one overall E category, based on the most significant finding in each.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>6. What the report must include</h3>
        <p>Beyond each lesion's size, location and morphology, the report should include an overall description of the large intestine (tortuosity, redundancy, diverticulosis) and an evaluation of examination quality (cleansing, distention, tagging).</p>
        <CopyBlock label="Report template" text={reportTemplate} />
      </section>

      <section className="info-card lesson-body">
        <h3>7. Cases from the literature to study</h3>
        <p>Figures 1–5 are in the C-RADS 2023 paper (open access, doi 10.1148/radiol.232007); 6 and 7 are from the <Cite doi="10.1148/rg.2020190078">Ricci RadioGraphics 2020</Cite> pitfalls atlas.</p>
        <ol className="plain-list">
          <li><strong>Sessile polyp after incomplete colonoscopy.</strong> A 77-year-old man after an incomplete colonoscopy for an obstructing sigmoid mass. An 8 mm sessile polyp in the proximal sigmoid on 3D and both axial positions; tubular adenoma. Teaching point: the value of CTC is clearing the colon proximal to an obstructing tumor before surgery.</li>
          <li><strong>Pedunculated polyp.</strong> A 52-year-old man at screening with a polyp head on a long stalk in the sigmoid; tubulovillous adenoma at polypectomy. Teaching point: measure the head only.</li>
          <li><strong>Flat lesion with contrast coat.</strong> A 70-year-old man imaged for anemia, with a flat lesion coated with iodinated contrast along a haustral fold in the ascending colon; tubular adenoma. Teaching point: bright coating on a fold in the right colon is a lesion until proven otherwise.</li>
          <li><strong>Carpet lesion.</strong> A 69-year-old woman at screening with a 3.7 cm carpet lesion in the ascending colon, seen on 3D and both decubitus views; tubulovillous adenoma. Teaching point: big, flat, subtle on 2D, needs the decubitus positions.</li>
          <li><strong>C2b sigmoid myochosis (two cases).</strong> An 81-year-old woman with circumferential sigmoid wall thickening on the supine view, but with better distention on prone the haustral architecture was preserved without focal mucosal irregularity. And a 72-year-old man on warfarin: under-distention and wall thickening in a region of sigmoid diverticulosis, more severe prone but improved supine and on right lateral decubitus; colonoscopy 5 years later showed only diverticula. Teaching point: changing wall thickness between positions means muscle, not tumor. The discriminating features are formally studied in <Cite doi="10.1148/radiol.14132829">Lips et al., Radiology 2015</Cite>.</li>
          <li><strong>Ileocecal valve mimic.</strong> Endoluminal 3D shows a polypoid lesion with an irregular surface in the cecum, but the axial 2D soft-tissue window shows lipomatous hypertrophy of the ileocecal valve, with the terminal ileum inserting on it. Teaching point: every cecal "polyp" gets a 2D check for fat and the terminal ileum.</li>
          <li><strong>Fluid-filled segment mimicking a stricture.</strong> The endoluminal 3D image has a blank appearance; axial 2D in the supine position shows the segment completely filled with tagged fluid. Teaching point: an "obstruction" on 3D that is just tagged fluid on 2D; look at the other position.</li>
        </ol>
      </section>

      <section className="info-card lesson-body">
        <h3>A case to try</h3>
        <p>A 9 mm sessile soft-tissue lesion in the mid ascending colon, present in both positions, measured on 2D axial. Which C category, and what's the one thing you'd do before signing it out?</p>
      </section>
    </LessonPage>
  )
}
