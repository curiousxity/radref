import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, QuizQuestion, ReportStep, StudyDefinition, Values } from '../study/types'

const CRADS = '10.1148/radiol.232007'
const LIPS = '10.1148/radiol.14132829'
const ZALIS = '10.1148/radiol.2361041926'

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

/* ---------- Learn: the lesson, verbatim, one entry per section card ---------- */

const learn: LearnSection[] = [
  {
    id: 'what-for',
    title: '1. What the study is for, and how good it is',
    body: (
      <>
        <p>CTC is a screening and diagnostic test for polyps and cancer. Its accuracy is well established: in the ACRIN 6664 trial, CTC identified 90% of subjects with adenomas or cancers measuring 10 mm or more, and per-patient sensitivity for adenomas of 6 mm or more was 0.78. Two practical takeaways: the sensitivity difference between primary 2D reading (87%) and primary 3D reading (88%) was not significant, so pick whichever primary method you're comfortable with, but always use both. And the target that matters is 10 mm and up; small polyps are secondary.</p>
        <p>Common indications: primary screening (every 5 years), incomplete colonoscopy (very common referral), patients on anticoagulation or too frail for colonoscopy, and diagnostic workup with IV contrast.</p>
      </>
    ),
  },
  {
    id: 'technique',
    title: '2. Before you start: check the technique',
    body: (
      <>
        <p>A CTC read is only as good as the prep. Confirm four things before you look for polyps:</p>
        <ul className="plain-list">
          <li><strong>Cleansing</strong>: residual stool is the number one source of false positives.</li>
          <li><strong>Tagging</strong>: the patient drank oral contrast (barium and/or iodine) so residual stool and fluid turn bright. This is what lets you dismiss stool. Poor fluid tagging causes pseudolesions in the ascending colon: dilute inhomogeneous fluid tagging with dependent mottled hyperdense contrast and short tubular hypoattenuated structures.</li>
          <li><strong>Distension</strong>: ideally automated CO2 insufflation via a rectal catheter. A collapsed segment cannot be cleared.</li>
          <li><strong>Two positions</strong>: supine and prone as standard, sometimes decubitus added. Every segment needs to be distended in at least one position. Fluid pools dependently, so the two positions cover each other.</li>
        </ul>
        <p>Screening CTC is low dose and without IV contrast. Diagnostic (symptomatic) CTC often adds IV contrast, which also allows cancer staging.</p>
      </>
    ),
  },
  {
    id: 'step-by-step',
    title: '3. Step-by-step reading',
    body: (
      <>
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
      </>
    ),
  },
  {
    id: 'pathology-mimics',
    title: '4. Pathology and mimics you need to recognize',
    body: (
      <>
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
      </>
    ),
  },
  {
    id: 'c-rads-categories',
    title: '5. C-RADS 2023: the categories',
    body: (
      <>
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
      </>
    ),
  },
  {
    id: 'report',
    title: '6. What the report must include',
    body: (
      <>
        <p>Beyond each lesion's size, location and morphology, the report should include an overall description of the large intestine (tortuosity, redundancy, diverticulosis) and an evaluation of examination quality (cleansing, distention, tagging).</p>
        <CopyBlock label="Report template" text={reportTemplate} />
      </>
    ),
  },
  {
    id: 'cases',
    title: '7. Cases from the literature to study',
    body: (
      <>
        <p>Figures 1–5 are in the C-RADS 2023 paper (open access, doi 10.1148/radiol.232007); 6 and 7 are from the <Cite doi="10.1148/rg.2020190078">Ricci RadioGraphics 2020</Cite> pitfalls atlas.</p>
        <ol className="plain-list">
          <li><strong>Sessile polyp after incomplete colonoscopy.</strong> A 77-year-old man after an incomplete colonoscopy for an obstructing sigmoid mass. An 8 mm sessile polyp in the proximal sigmoid on 3D and both axial positions; tubular adenoma. Teaching point: the value of CTC is clearing the colon proximal to an obstructing tumor before surgery.</li>
          <li><strong>Pedunculated polyp.</strong> A 52-year-old man at screening with a polyp head on a long stalk in the sigmoid; tubulovillous adenoma at polypectomy. Teaching point: measure the head only.</li>
          <li><strong>Flat lesion with contrast coat.</strong> A 70-year-old man imaged for anemia, with a flat lesion coated with iodinated contrast along a haustral fold in the ascending colon; tubular adenoma. Teaching point: bright coating on a fold in the right colon is a lesion until proven otherwise.</li>
          <li><strong>Carpet lesion.</strong> A 69-year-old woman at screening with a 3.7 cm carpet lesion in the ascending colon, seen on 3D and both decubitus views; tubulovillous adenoma. Teaching point: big, flat, subtle on 2D, needs the decubitus positions.</li>
          <li><strong>C2b sigmoid myochosis (two cases).</strong> An 81-year-old woman with circumferential sigmoid wall thickening on the supine view, but with better distention on prone the haustral architecture was preserved without focal mucosal irregularity. And a 72-year-old man on warfarin: under-distention and wall thickening in a region of sigmoid diverticulosis, more severe prone but improved supine and on right lateral decubitus; colonoscopy 5 years later showed only diverticula. Teaching point: changing wall thickness between positions means muscle, not tumor. The features that separate diverticular disease from cancer at CTC (such as shouldering and preserved folds) are formally studied in <Cite doi="10.1148/radiol.14132829">Lips et al., Radiology 2015</Cite>.</li>
          <li><strong>Ileocecal valve mimic.</strong> Endoluminal 3D shows a polypoid lesion with an irregular surface in the cecum, but the axial 2D soft-tissue window shows lipomatous hypertrophy of the ileocecal valve, with the terminal ileum inserting on it. Teaching point: every cecal "polyp" gets a 2D check for fat and the terminal ileum.</li>
          <li><strong>Fluid-filled segment mimicking a stricture.</strong> The endoluminal 3D image has a blank appearance; axial 2D in the supine position shows the segment completely filled with tagged fluid. Teaching point: an "obstruction" on 3D that is just tagged fluid on 2D; look at the other position.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'case-to-try',
    title: 'A case to try',
    body: (
      <p>A 9 mm sessile soft-tissue lesion in the mid ascending colon, present in both positions, measured on 2D axial. Which C category, and what's the one thing you'd do before signing it out?</p>
    ),
  },
]

/* ---------- Options ---------- */

const indicationField: Extract<Field, { kind: 'choice' }> = {
  id: 'indication',
  label: 'Indication',
  kind: 'choice',
  required: true,
  options: [
    { value: 'screen', label: 'Screening' },
    { value: 'diag', label: 'Diagnostic' },
  ],
}

const taggingAgentField: Extract<Field, { kind: 'multi' }> = {
  id: 'tagAgents',
  label: 'Tagging agents',
  kind: 'multi',
  options: [
    { value: 'barium', label: 'Barium' },
    { value: 'iodine', label: 'Iodine' },
  ],
}

const positionsField: Extract<Field, { kind: 'multi' }> = {
  id: 'positions',
  label: 'Positions',
  kind: 'multi',
  help: 'Supine and prone as standard, sometimes decubitus added.',
  options: [
    { value: 'supine', label: 'Supine' },
    { value: 'prone', label: 'Prone' },
    { value: 'rdecub', label: 'Right lateral decubitus' },
    { value: 'ldecub', label: 'Left lateral decubitus' },
  ],
}

const yesNo: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

const cleansingField: Extract<Field, { kind: 'choice' }> = {
  id: 'cleansing',
  label: 'Cleansing',
  kind: 'choice',
  required: true,
  help: 'Residual stool is the number one source of false positives.',
  options: [
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
  ],
}

const grossField: Extract<Field, { kind: 'multi' }> = {
  id: 'gross',
  label: 'Gross abnormalities (mass is described at step 4)',
  kind: 'multi',
  options: [
    { value: 'obstruction', label: 'Obstruction' },
    { value: 'perforation', label: 'Perforation' },
    { value: 'freeair', label: 'Free air' },
  ],
}

const colonField: Extract<Field, { kind: 'multi' }> = {
  id: 'colon',
  label: 'Overall description of the large intestine',
  kind: 'multi',
  required: true,
  options: [
    { value: 'normal', label: 'No tortuosity, redundancy or diverticulosis' },
    { value: 'tortuous', label: 'Tortuous' },
    { value: 'redundant', label: 'Redundant' },
    { value: 'divert', label: 'Diverticulosis' },
  ],
}

const countField: Extract<Field, { kind: 'choice' }> = {
  id: 'lesionCount',
  label: 'Lesions of 6 mm or more',
  kind: 'choice',
  required: true,
  help: 'Diminutive polyps (5 mm or less) are not reported.',
  options: [
    { value: '0', label: 'None' },
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: 'more', label: 'More than three' },
  ],
}

const attOptions: Option[] = [
  { value: 'soft', label: 'Soft tissue' },
  { value: 'fat', label: 'Macroscopic fat' },
]

const morphOptions: Option[] = [
  { value: 'sessile', label: 'Sessile' },
  { value: 'ped', label: 'Pedunculated' },
  { value: 'flat', label: 'Flat' },
]

const confOptions: Option[] = [
  { value: 'low', label: 'Low' },
  { value: 'mod', label: 'Moderate' },
  { value: 'high', label: 'High' },
]

const methodOptions: Option[] = [
  { value: '3d', label: '3D' },
  { value: '2d', label: 'Standard 2D' },
  { value: 'oblique', label: 'Optimized oblique 2D' },
]

const growthOptions: Option[] = [
  { value: 'none', label: 'No prior' },
  { value: 'stable', label: 'Stable' },
  { value: 'regressed', label: 'Regressed' },
  { value: 'grown', label: 'Grown' },
]

const segmentOptions: Option[] = [
  { value: 'rectum', label: 'Rectum' },
  { value: 'sigmoid', label: 'Sigmoid' },
  { value: 'descending', label: 'Descending' },
  { value: 'transverse', label: 'Transverse' },
  { value: 'ascending', label: 'Ascending' },
  { value: 'cecum', label: 'Cecum' },
]

const segmentText: Record<string, string> = {
  rectum: 'rectum',
  sigmoid: 'sigmoid colon',
  descending: 'descending colon',
  transverse: 'transverse colon',
  ascending: 'ascending colon',
  cecum: 'cecum',
}

const positionOptions: Option[] = [
  { value: 'proximal', label: 'Proximal' },
  { value: 'mid', label: 'Mid' },
  { value: 'distal', label: 'Distal' },
]

const massTypeField: Extract<Field, { kind: 'choice' }> = {
  id: 'massType',
  label: 'Mass or stricture',
  kind: 'choice',
  required: true,
  options: [
    { value: 'none', label: 'None' },
    { value: 'div', label: 'Diverticular stricture' },
    { value: 'mass', label: 'Mass' },
  ],
}

const massFeatureField: Extract<Field, { kind: 'multi' }> = {
  id: 'massFeatures',
  label: 'Mass features',
  kind: 'multi',
  help: 'Malignant-looking: irregular surface, shouldering, annular narrowing.',
  showIf: (v) => str(v, 'massType') === 'mass',
  options: [
    { value: 'wall', label: 'Wall thickening' },
    { value: 'shoulder', label: 'Shouldering' },
    { value: 'irregular', label: 'Irregular surface' },
    { value: 'annular', label: 'Annular narrowing' },
    { value: 'pericolic', label: 'Pericolic extension' },
  ],
}

const MALIGNANT_FEATURES = ['shoulder', 'irregular', 'annular']

const divFeatureField: Extract<Field, { kind: 'multi' }> = {
  id: 'divFeatures',
  label: 'Benign features present',
  kind: 'multi',
  showIf: (v) => str(v, 'massType') === 'div',
  options: [
    { value: 'concentric', label: 'Luminal narrowing with concentric wall thickening' },
    { value: 'haustra', label: 'Preserved haustral architecture' },
    { value: 'mucosa', label: 'No mucosal irregularity on 3D' },
    { value: 'divert', label: 'Diverticulosis' },
    { value: 'noshoulder', label: 'No overhanging edges or shoulders' },
    { value: 'distends', label: 'Distends better in the other position' },
  ],
}

const divConfField: Extract<Field, { kind: 'choice' }> = {
  id: 'divConf',
  label: 'Confidence that it is benign',
  kind: 'choice',
  required: true,
  showIf: (v) => str(v, 'massType') === 'div',
  options: [
    { value: 'confident', label: 'Confident' },
    { value: 'unsure', label: 'Not confident' },
    { value: 'worried', label: 'Worried (call C4)' },
  ],
}

const e4Field: Extract<Field, { kind: 'multi' }> = {
  id: 'e4Findings',
  label: 'Likely important findings (the E4 examples)',
  kind: 'multi',
  options: [
    { value: 'aaa', label: 'AAA' },
    { value: 'renal', label: 'Solid renal mass' },
    { value: 'adnexal', label: 'Adnexal mass' },
    { value: 'lung', label: 'Suspicious lung nodule' },
  ],
}

const eField: Extract<Field, { kind: 'choice' }> = {
  id: 'eCat',
  label: 'Overall E category',
  kind: 'choice',
  required: true,
  help: 'Based on the most significant extracolonic finding.',
  options: [
    { value: 'e0', label: 'E0' },
    { value: 'e12', label: 'E1/E2' },
    { value: 'e3', label: 'E3' },
    { value: 'e4', label: 'E4' },
  ],
}

/* ---------- Lesion slots and rules ---------- */

const SLOTS = [1, 2, 3]

function slotShown(v: Values, n: number) {
  const count = str(v, 'lesionCount')
  return count === 'more' || (count !== '' && Number(count) >= n)
}

type Lesion = {
  n: number
  att: string
  morph: string
  conf: string
  size?: number
  method: string
  image: string
  growth: string
  seg: string
  pos: string
}

function lesions(v: Values): Lesion[] {
  return SLOTS.filter((n) => slotShown(v, n)).map((n) => ({
    n,
    att: str(v, `l${n}Att`),
    morph: str(v, `l${n}Morph`),
    conf: str(v, `l${n}Conf`),
    size: num(v, `l${n}Size`),
    method: str(v, `l${n}Method`),
    image: str(v, `l${n}Image`),
    growth: str(v, `l${n}Growth`),
    seg: str(v, `l${n}Seg`),
    pos: str(v, `l${n}Pos`),
  }))
}

/** Soft-tissue polyps of 6 mm or more: the ones C-RADS counts. */
function polyps(v: Values) {
  return lesions(v).filter((l) => l.att !== 'fat' && l.size !== undefined && l.size >= 6)
}

function location(seg: string, pos: string) {
  if (!seg) return ''
  return [pos && optionLabel({ options: positionOptions }, pos).toLowerCase(), segmentText[seg] ?? seg].filter(Boolean).join(' ')
}

function inadequateReasons(v: Values): string[] {
  const reasons: string[] = []
  if (str(v, 'distension') === 'collapsed' && str(v, 'covered') === 'no') {
    reasons.push(`collapsed segment${str(v, 'collapsedSeg') ? ` (${str(v, 'collapsedSeg')})` : ''} not distended in any position`)
  }
  if (str(v, 'cleansing') === 'poor') reasons.push('poor prep')
  if (str(v, 'prior') === 'unavailable') reasons.push('a prior study is needed and unavailable')
  if (reasons.length === 0 && str(v, 'adequate') === 'no') reasons.push('study judged inadequate')
  return reasons
}

/**
 * C-RADS names no precedence between C0 and a lesion category found elsewhere, so when both
 * apply the lesion keeps the overall category and the C0 limitation is stated beside it, in
 * the wording of the C0 row of the C-RADS 2023 table (Yee et al., Radiology 2024).
 */
function c0Limitation(v: Values): string {
  const technical = inadequateReasons(v).filter((r) => r !== 'a prior study is needed and unavailable')
  const parts: string[] = []
  if (technical.length > 0) parts.push(`${technical.join('; ')}: lesions of 10 mm or more cannot be excluded in the inadequately evaluated colon.`)
  if (str(v, 'prior') === 'unavailable') parts.push('Awaiting prior comparison: amend when prior studies are available.')
  return parts.length > 0 ? `C0 criteria also met: ${parts.join(' ')}` : ''
}

type CResult = {
  /** e.g. 'C3', 'C2a and C2b' */
  code: string
  lines: string[]
}

function cCategory(v: Values): CResult {
  const all = polyps(v)
  const large = all.filter((p) => (p.size ?? 0) >= 10)
  const small = all.filter((p) => (p.size ?? 0) < 10)
  const smallCount = small.length
  const grown = small.filter((p) => p.growth === 'grown')
  const massType = str(v, 'massType')
  const massLength = num(v, 'massLength')
  const malignant = list(v, 'massFeatures').filter((f) => MALIGNANT_FEATURES.includes(f))
  const divConf = str(v, 'divConf')

  const c4: string[] = []
  if (massType === 'mass' && massLength !== undefined && massLength >= 30) c4.push(`mass of ${massLength} mm`)
  if (massType === 'mass' && malignant.length > 0) {
    c4.push(`malignant-appearing mass (${malignant.map((f) => optionLabel(massFeatureField, f).toLowerCase()).join(', ')})`)
  }
  if (massType === 'div' && divConf === 'worried') c4.push('mass-like stricture of concern for malignancy')
  if (c4.length > 0) {
    return { code: 'C4', lines: [`C-RADS C4: ${c4.join('; ')}. Surgical/oncologic referral, with or without biopsy.`] }
  }

  const c3: string[] = []
  if (large.length > 0) c3.push(large.map((p) => `polyp ${p.n} measuring ${p.size} mm`).join(', '))
  if (smallCount >= 3) c3.push('three or more 6-9 mm polyps')
  if (grown.length > 0) c3.push(grown.map((p) => `6-9 mm polyp ${p.n} has grown`).join(', '))
  if (c3.length > 0) {
    return { code: 'C3', lines: [`C-RADS C3: ${c3.join('; ')}. Colonoscopic polypectomy.`] }
  }

  /* Inputs the rules cannot categorise: never fall through to C1 on them. */
  const pending: string[] = []
  const unsized = lesions(v).filter((l) => l.att !== 'fat' && l.size === undefined)
  if (unsized.length > 0) pending.push(`size not entered for lesion ${unsized.map((l) => l.n).join(', ')}`)
  if (str(v, 'lesionCount') === 'more') pending.push('more than three lesions of 6 mm or more; categorize the additional lesions')
  if (massType === 'mass') pending.push('mass entered without a length of 30 mm or more or a malignant-appearing feature')
  if (pending.length > 0) {
    return { code: 'Not assigned', lines: [`C-RADS C category not assigned: ${pending.join('; ')}.`] }
  }

  const out: string[] = []
  const codes: string[] = []
  if (smallCount >= 1) {
    codes.push('C2a')
    const conf = small
      .filter((p) => p.conf)
      .map((p) => `${optionLabel({ options: confOptions }, p.conf).toLowerCase()}${small.length > 1 ? ` (polyp ${p.n})` : ''}`)
    out.push(
      `C-RADS C2a: ${smallCount === 1 ? 'one polyp' : 'two polyps'} of 6-9 mm. Either colonoscopy or repeat CTC in 3 years.${conf.length ? ` Confidence: ${conf.join(', ')}.` : ''}`,
    )
  }
  if (massType === 'div' && divConf !== 'worried') {
    codes.push('C2b')
    const where = location(str(v, 'massSeg'), str(v, 'massPos'))
    const follow = divConf === 'confident' ? 'Follow-up CTC at 5 years.' : divConf === 'unsure' ? 'Follow-up CTC in 3 years or less.' : ''
    out.push(`C-RADS C2b: likely benign mass-like diverticular stricture / myochosis${where ? `, ${where}` : ''}. ${follow}`.trim())
  }
  if (codes.length > 0) return { code: codes.join(' and '), lines: out }

  const reasons = inadequateReasons(v)
  if (reasons.length > 0) return { code: 'C0', lines: [`C-RADS C0: inadequate study; ${reasons.join('; ')}.`] }

  const notEntered = [str(v, 'lesionCount') === '' && 'lesions of 6 mm or more', massType === '' && 'mass or stricture'].filter(Boolean)
  if (notEntered.length > 0) return { code: 'Not assigned', lines: [`C-RADS C category not assigned: ${notEntered.join(' and ')} not yet entered.`] }

  return { code: 'C1', lines: ['C-RADS C1: normal or benign; no polyp of 6 mm or more. Routine screening in 5-10 years.'] }
}

function eLine(v: Values): string {
  const e = str(v, 'eCat')
  const e4 = list(v, 'e4Findings').map((f) => optionLabel(e4Field, f))
  if (e === 'e0') return 'C-RADS E0: inadequate extracolonic evaluation.'
  if (e === 'e12') return 'C-RADS E1/E2: no extracolonic finding needing follow-up.'
  if (e === 'e3') return 'C-RADS E3: indeterminate but likely unimportant extracolonic finding. Work-up optional.'
  if (e === 'e4') return `C-RADS E4: likely important extracolonic finding${e4.length ? ` (${e4.join(', ')})` : ''}. Needs work-up.`
  return ''
}

/* ---------- Report steps ---------- */

function lesionFields(n: number, build: (n: number) => Field[]): Field[] {
  return build(n).map((field) => ({
    ...field,
    showIf: (v: Values) => slotShown(v, n) && (field.showIf?.(v) ?? true),
  }))
}

const steps: ReportStep[] = [
  {
    id: 'details',
    title: 'Exam details',
    learn: 'what-for',
    teach: (
      <p>Common indications: primary screening (every 5 years), incomplete colonoscopy (very common referral), patients on anticoagulation or too frail for colonoscopy, and diagnostic workup with IV contrast.</p>
    ),
    fields: [
      indicationField,
      { id: 'indicationDetail', label: 'Prior colonoscopy result, anticoagulation, etc.', kind: 'text', placeholder: 'e.g. incomplete colonoscopy to the sigmoid' },
    ],
  },
  {
    id: 'technique',
    title: 'Before you start: check the technique',
    learn: 'technique',
    teach: (
      <>
        <p>A CTC read is only as good as the prep. Confirm four things before you look for polyps:</p>
        <ul className="plain-list">
          <li><strong>Cleansing</strong>: residual stool is the number one source of false positives.</li>
          <li><strong>Tagging</strong>: the patient drank oral contrast (barium and/or iodine) so residual stool and fluid turn bright. This is what lets you dismiss stool. Poor fluid tagging causes pseudolesions in the ascending colon.</li>
          <li><strong>Distension</strong>: ideally automated CO2 insufflation via a rectal catheter. A collapsed segment cannot be cleared.</li>
          <li><strong>Two positions</strong>: every segment needs to be distended in at least one position.</li>
        </ul>
        <p>Screening CTC is low dose and without IV contrast. Diagnostic (symptomatic) CTC often adds IV contrast, which also allows cancer staging.</p>
      </>
    ),
    fields: [
      { id: 'prep', label: 'Prep', kind: 'text', placeholder: 'bowel preparation used' },
      taggingAgentField,
      { id: 'insufflation', label: 'CO2 insufflation', kind: 'text', placeholder: 'e.g. automated, via rectal catheter' },
      positionsField,
      { id: 'lowDose', label: 'Low dose', kind: 'choice', options: yesNo },
      { id: 'ivContrast', label: 'IV contrast', kind: 'choice', required: true, options: yesNo },
      {
        id: 'distension',
        label: 'Distension',
        kind: 'choice',
        required: true,
        options: [
          { value: 'adequate', label: 'Adequate in all segments' },
          { value: 'collapsed', label: 'Segment collapsed' },
        ],
      },
      { id: 'collapsedSeg', label: 'Collapsed segment', kind: 'text', placeholder: 'e.g. sigmoid, supine', showIf: (v) => str(v, 'distension') === 'collapsed' },
      {
        id: 'covered',
        label: 'Distended in the other position?',
        kind: 'choice',
        required: true,
        options: yesNo,
        help: 'Every segment needs to be distended in at least one position.',
        showIf: (v) => str(v, 'distension') === 'collapsed',
      },
      cleansingField,
      {
        id: 'tagging',
        label: 'Tagging',
        kind: 'choice',
        required: true,
        options: [
          { value: 'effective', label: 'Effective' },
          { value: 'poor', label: 'Poor' },
        ],
      },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (str(v, 'distension') === 'collapsed' && str(v, 'covered') === 'no') out.push({ label: 'Collapsed segment', value: 'Not cleared: C0', tone: 'warn' })
      if (str(v, 'distension') === 'collapsed' && str(v, 'covered') === 'yes') out.push({ label: 'Collapsed segment', value: 'Covered by other position', tone: 'good' })
      if (str(v, 'cleansing') === 'poor') out.push({ label: 'Prep', value: 'Poor prep: C0', tone: 'warn' })
      return out
    },
  },
  {
    id: 'survey',
    title: 'Step 1. Quick 2D survey',
    learn: 'step-by-step',
    teach: (
      <>
        <p>Scroll the whole axial dataset on both positions in a wide window. Look for gross abnormalities (mass, obstruction, perforation, free air) and get a feel for the prep quality. Decide right now whether the study is adequate.</p>
        <p><strong>C0</strong>: inadequate study. Collapsed segment, poor prep, or a prior study is needed and unavailable.</p>
        <p>The C-RADS 2023 table defines C0 as prep that "cannot exclude lesions ≥10 mm" or "one or more colonic segments collapsed on both views", managed by "Repeat CTC or consider an alternative screening test if inadequate", and "Amend when prior studies are available" when awaiting a prior (<Cite doi={CRADS}>C-RADS 2023</Cite>). Neither it nor the <Cite doi={ZALIS}>2005 original</Cite> says which category wins when part of the colon is C0 and a polyp or mass is found elsewhere. The report here gives the lesion's category and states the C0 limitation beside it, so neither is lost.</p>
      </>
    ),
    fields: [
      grossField,
      {
        id: 'adequate',
        label: 'Study adequate?',
        kind: 'choice',
        required: true,
        options: yesNo,
        help: 'If part of the colon is inadequate but a polyp or mass is found, the lesion keeps its C category and the C0 limitation is stated alongside it.',
      },
      {
        id: 'prior',
        label: 'Prior study',
        kind: 'choice',
        options: [
          { value: 'notneeded', label: 'Not needed' },
          { value: 'available', label: 'Needed, available' },
          { value: 'unavailable', label: 'Needed, unavailable' },
        ],
      },
    ],
    derive: (v) => {
      const reasons = inadequateReasons(v)
      return reasons.length > 0 ? [{ label: 'C0 criteria', value: reasons.join('; '), tone: 'warn' }] : []
    },
  },
  {
    id: 'window',
    title: 'Step 2. Set the polyp window',
    learn: 'step-by-step',
    teach: (
      <p>The preferred "polyp window" is width 1500–2000 HU and level −200 to 0 HU. This wide window lets you tell a soft-tissue polyp from gas, from tagged fluid, and from fat all at once. Standard soft tissue windows (400/30) help accentuate soft tissue for polyp evaluation but should not be used primarily for detection, because polyps can be obscured.</p>
    ),
    fields: [],
  },
  {
    id: 'primary',
    title: 'Step 3. Primary read of the colon',
    learn: 'step-by-step',
    teach: (
      <>
        <p>Two acceptable approaches; both require the other as a check. Interpretation requires interactive use of both 2D and 3D data sets.</p>
        <ul className="plain-list">
          <li><em>Primary 2D:</em> trace the colon segment by segment from rectum to cecum on axial images, supine then prone. Look at every fold.</li>
          <li><em>Primary 3D:</em> endoluminal flythrough with a 120° field of view, in both retrograde and antegrade directions, for both positions.</li>
        </ul>
        <p>The report should include an overall description of the large intestine (tortuosity, redundancy, diverticulosis).</p>
      </>
    ),
    fields: [
      {
        id: 'primaryMethod',
        label: 'Primary read',
        kind: 'choice',
        options: [
          { value: '2d', label: 'Primary 2D' },
          { value: '3d', label: 'Primary 3D' },
        ],
      },
      colonField,
      { id: 'divertExtent', label: 'Extent of diverticulosis', kind: 'text', placeholder: 'e.g. sigmoid and descending', showIf: (v) => list(v, 'colon').includes('divert') },
    ],
  },
  {
    id: 'interrogate',
    title: 'Step 4. Interrogate every candidate lesion',
    learn: 'step-by-step',
    teach: (
      <>
        <ol className="plain-list">
          <li><em>Is it soft tissue?</em> Macroscopic fat indicates a lipoma, fibrolipoma, or an inverted diverticulum, all benign and not requiring colonoscopy. Foci of air or tagging agent within a lesion mean retained fecal matter.</li>
          <li><em>Is it fixed to the wall?</em> Stool usually moves to the dependent wall between supine and prone, though be careful: fecal matter may or may not shift.</li>
          <li><em>Is it there in both positions?</em> A real polyp is (unless that segment is collapsed or under fluid in one position).</li>
          <li><em>Is it a normal structure?</em> Thick fold, ileocecal valve, anal papilla, rectal catheter balloon.</li>
          <li><em>Is it a contrast-coated flat lesion?</em> Adherent contrast on the surface is a helpful sign, not stool.</li>
        </ol>
        <p>Cancer: mass of 3 cm or more, or any malignant-looking lesion: irregular surface, shouldering, annular narrowing. Diverticular disease (C2b) shows concentric wall thickening with preserved haustral architecture and no mucosal irregularity on 3D, plus diverticulosis and no overhanging edges or shoulders (<Cite doi={LIPS}>Lips et al., Radiology 2015</Cite>).</p>
      </>
    ),
    fields: [
      countField,
      ...SLOTS.flatMap((n) =>
        lesionFields(n, (i) => [
          { id: `l${i}Att`, label: `Lesion ${i}: attenuation`, kind: 'choice', required: true, options: attOptions },
          { id: `l${i}Morph`, label: `Lesion ${i}: morphology`, kind: 'choice', required: true, options: morphOptions, showIf: (v) => str(v, `l${i}Att`) !== 'fat' },
          { id: `l${i}Conf`, label: `Lesion ${i}: confidence`, kind: 'choice', required: true, options: confOptions, showIf: (v) => str(v, `l${i}Att`) !== 'fat' },
        ]),
      ),
      { id: 'extraLesions', label: 'Additional lesions of 6 mm or more', kind: 'text', multiline: true, showIf: (v) => str(v, 'lesionCount') === 'more' },
      massTypeField,
      massFeatureField,
      { id: 'massNodes', label: 'Nodes', kind: 'text', placeholder: 'with IV contrast', showIf: (v) => str(v, 'massType') === 'mass' && str(v, 'ivContrast') === 'yes' },
      divFeatureField,
      divConfField,
    ],
    derive: (v) => {
      const out: Derived[] = lesions(v)
        .filter((l) => l.att === 'fat')
        .map((l) => ({ label: `Lesion ${l.n}`, value: 'Fat: benign, no colonoscopy', tone: 'good' }))
      const malignant = list(v, 'massFeatures').filter((f) => MALIGNANT_FEATURES.includes(f))
      if (str(v, 'massType') === 'mass' && malignant.length > 0) out.push({ label: 'Mass', value: 'Malignant-appearing: C4', tone: 'warn' })
      if (str(v, 'massType') === 'div') {
        const conf = str(v, 'divConf')
        if (conf === 'confident') out.push({ label: 'Stricture', value: 'C2b: CTC at 5 years', tone: 'neutral' })
        if (conf === 'unsure') out.push({ label: 'Stricture', value: 'C2b: CTC in 3 years or less', tone: 'neutral' })
        if (conf === 'worried') out.push({ label: 'Stricture', value: 'C4', tone: 'warn' })
      }
      return out
    },
  },
  {
    id: 'measure',
    title: 'Step 5. Measure correctly',
    learn: 'step-by-step',
    teach: (
      <ul className="plain-list">
        <li>Measure the single largest dimension; simple axial measurements alone may be inadequate.</li>
        <li>Pedunculated polyps: measure the largest dimension of the head, exclusive of the stalk.</li>
        <li>Tagging agent adherent to the lesion surface is not included in the measurement.</li>
        <li>2D measurements tend to underestimate true size compared with 3D by approximately 1 mm. At the 9 vs 10 mm boundary, measure on 3D.</li>
        <li>Report how the measurement was obtained (3D, standard 2D, or optimized oblique 2D), note the series and section.</li>
      </ul>
    ),
    fields: [
      ...SLOTS.flatMap((n) =>
        lesionFields(n, (i) => [
          {
            id: `l${i}Size`,
            label: `Lesion ${i}: largest dimension`,
            kind: 'number',
            unit: 'mm',
            min: 0,
            required: true,
            help: 'Pedunculated: head only, exclusive of the stalk. Exclude adherent tagging.',
          },
          { id: `l${i}Method`, label: `Lesion ${i}: measured on`, kind: 'choice', required: true, options: methodOptions },
          { id: `l${i}Image`, label: `Lesion ${i}: series/image`, kind: 'text', placeholder: 'e.g. series 3, image 142' },
          {
            id: `l${i}Growth`,
            label: `Lesion ${i}: compared with prior`,
            kind: 'choice',
            options: growthOptions,
            help: 'A C2a polyp that has grown is C3.',
            showIf: (v) => str(v, `l${i}Att`) !== 'fat',
          },
        ]),
      ),
      { id: 'massLength', label: 'Mass/stricture: length', kind: 'number', unit: 'mm', min: 0, showIf: (v) => ['mass', 'div'].includes(str(v, 'massType')) },
    ],
    derive: (v) =>
      lesions(v)
        .filter((l) => l.att !== 'fat' && l.size !== undefined)
        .map((l): Derived => {
          const size = l.size as number
          if (size < 6) return { label: `Polyp ${l.n}`, value: 'Diminutive: not reported', tone: 'neutral' }
          if (size < 10) return { label: `Polyp ${l.n}`, value: l.growth === 'grown' ? '6-9 mm, grown: C3' : '6-9 mm: C2a range', tone: l.growth === 'grown' ? 'warn' : 'neutral' }
          return { label: `Polyp ${l.n}`, value: '10 mm or more: C3', tone: 'warn' }
        }),
  },
  {
    id: 'locate',
    title: 'Step 6. Locate',
    learn: 'step-by-step',
    teach: (
      <p>Use the six segments: rectum, sigmoid, descending, transverse, ascending, cecum, and say proximal/mid/distal within the segment. Don't use "flexure" as a location descriptor, and don't give a distance from the anal verge, because colonoscopy measurements are up to half of the true centerline CTC distance due to telescoping and pleating of the colon over the scope.</p>
    ),
    fields: [
      ...SLOTS.flatMap((n) =>
        lesionFields(n, (i) => [
          { id: `l${i}Seg`, label: `Lesion ${i}: segment`, kind: 'choice', required: true, options: segmentOptions },
          { id: `l${i}Pos`, label: `Lesion ${i}: position in segment`, kind: 'choice', options: positionOptions },
        ]),
      ),
      { id: 'massSeg', label: 'Mass/stricture: segment', kind: 'choice', required: true, options: segmentOptions, showIf: (v) => ['mass', 'div'].includes(str(v, 'massType')) },
      { id: 'massPos', label: 'Mass/stricture: position in segment', kind: 'choice', options: positionOptions, showIf: (v) => ['mass', 'div'].includes(str(v, 'massType')) },
    ],
  },
  {
    id: 'extracolonic',
    title: 'Step 7. Extracolonic survey',
    learn: 'step-by-step',
    teach: (
      <>
        <p>The lack of IV contrast and the low-dose technique may make characterization of these findings difficult or impossible. Priorities: aortic aneurysm, renal masses, lung bases, adnexal masses, lymphadenopathy, bone density. In ACRIN, extracolonic findings were present in 66% of participants, of which only 16% were important enough to need further evaluation, so the skill here is not over-calling.</p>
        <ul className="plain-list">
          <li><strong>E1/E2</strong>: nothing needing follow-up (normal, or unimportant findings like simple cysts, calcified granulomas).</li>
          <li><strong>E3</strong>: indeterminate but likely unimportant (e.g. a small hypodense renal lesion you can't characterize without contrast). Work-up optional.</li>
          <li><strong>E4</strong>: likely important (AAA, solid renal mass, adnexal mass, suspicious lung nodule). Needs work-up.</li>
        </ul>
      </>
    ),
    fields: [
      { id: 'extraText', label: 'Extracolonic findings, organ by organ', kind: 'text', multiline: true, placeholder: 'Briefly, organ by organ' },
      e4Field,
      eField,
    ],
    derive: (v) => (list(v, 'e4Findings').length > 0 ? [{ label: 'E category', value: 'E4: needs work-up', tone: 'warn' }] : []),
  },
  {
    id: 'categories',
    title: 'Step 8. Assign C-RADS categories',
    learn: 'c-rads-categories',
    teach: (
      <>
        <ul className="plain-list">
          <li><strong>C1</strong>: no polyp ≥6 mm. Routine screening in 5–10 years.</li>
          <li><strong>C2a</strong>: one or two polyps of 6–9 mm. Either colonoscopy or repeat CTC in 3 years. Add a confidence statement.</li>
          <li><strong>C2b</strong>: likely benign mass-like diverticular stricture / myochosis. CTC at 5 years if confident, 3 years or less if not; C4 if you're worried.</li>
          <li><strong>C3</strong>: any polyp ≥10 mm, or three or more 6–9 mm polyps, or a C2a polyp that has grown. Colonoscopic polypectomy.</li>
          <li><strong>C4</strong>: mass ≥30 mm or malignant-appearing. Surgical/oncologic referral.</li>
        </ul>
        <p>The report gets one overall C and one overall E category, based on the most significant finding in each (<Cite doi={CRADS}>C-RADS 2023</Cite>).</p>
        <p>C-RADS gives no rule for a partly inadequate study with a lesion found elsewhere, so the lesion's category is given and the C0 limitation is stated after it.</p>
      </>
    ),
    fields: [],
    derive: (v) => {
      const c = cCategory(v)
      const out: Derived[] = [{ label: 'C category', value: c.code, tone: c.code === 'C1' ? 'good' : c.code === 'Not assigned' ? 'warn' : c.code === 'C0' || c.code === 'C2a' || c.code === 'C2b' || c.code === 'C2a and C2b' ? 'neutral' : 'warn' }]
      const e = str(v, 'eCat')
      if (e) out.push({ label: 'E category', value: optionLabel(eField, e), tone: e === 'e4' ? 'warn' : e === 'e12' ? 'good' : 'neutral' })
      return out
    },
  },
]

/* ---------- Build ---------- */

function sentence(text: string) {
  const t = text.trim()
  if (!t) return ''
  return /[.!?]$/.test(t) ? t : `${t}.`
}

function build(v: Values) {
  const warnings: string[] = []

  const indication = str(v, 'indication')
  const indicationLine = (indication || str(v, 'indicationDetail'))
    ? `Indication: ${[indication && optionLabel(indicationField, indication), str(v, 'indicationDetail')].filter(Boolean).join('; ')}.`
    : ''

  const positions = list(v, 'positions').map((p) => optionLabel(positionsField, p).toLowerCase())
  const agents = list(v, 'tagAgents').map((a) => optionLabel(taggingAgentField, a).toLowerCase())
  const technique = [
    str(v, 'prep') && `prep: ${str(v, 'prep')}`,
    agents.length > 0 && `tagging with ${agents.join(' and ')}`,
    str(v, 'insufflation') && `CO2 insufflation (${str(v, 'insufflation')})`,
    positions.length > 0 && `${positions.length > 1 ? `${positions.slice(0, -1).join(', ')} and ${positions[positions.length - 1]}` : positions[0]} position${positions.length > 1 ? 's' : ''}`,
    str(v, 'lowDose') === 'yes' && 'low dose',
    str(v, 'ivContrast') === 'yes' && 'with IV contrast',
    str(v, 'ivContrast') === 'no' && 'without IV contrast',
    str(v, 'primaryMethod') && `2D and 3D review (${str(v, 'primaryMethod') === '2d' ? 'primary 2D' : 'primary 3D'})`,
  ].filter(Boolean)
  const techniqueLine = technique.length > 0 ? `Technique: ${technique.join('; ')}.` : ''

  const quality: string[] = []
  const distension = str(v, 'distension')
  if (distension === 'adequate') quality.push('distension adequate in all segments')
  if (distension === 'collapsed') {
    const covered = str(v, 'covered')
    quality.push(
      `collapsed segment${str(v, 'collapsedSeg') ? `: ${str(v, 'collapsedSeg')}` : ''}${covered === 'yes' ? ', distended in the other position' : covered === 'no' ? ', not distended in the other position' : ''}`,
    )
  }
  if (str(v, 'cleansing')) quality.push(`cleansing ${str(v, 'cleansing')}`)
  if (str(v, 'tagging')) quality.push(`tagging ${str(v, 'tagging')}`)
  const qualityLine = quality.length > 0 ? `Quality: ${quality.join('; ')}.` : ''

  const colonParts = list(v, 'colon')
    .filter((c) => c !== 'normal')
    .map((c) => (c === 'divert' && str(v, 'divertExtent') ? `diverticulosis (${str(v, 'divertExtent')})` : optionLabel(colonField, c).toLowerCase()))
  const gross = list(v, 'gross').map((g) => optionLabel(grossField, g).toLowerCase())
  let colonDesc = ''
  if (colonParts.length > 0) colonDesc = colonParts.join(', ')
  else if (list(v, 'colon').includes('normal')) colonDesc = 'no tortuosity, redundancy or diverticulosis'
  if (gross.length > 0) colonDesc = [colonDesc, gross.join(', ')].filter(Boolean).join('; ')
  const colonLine = colonDesc ? `Colon: ${colonDesc.charAt(0).toUpperCase()}${colonDesc.slice(1)}.` : ''

  const lesionLines = lesions(v).flatMap((l) => {
    const where = location(l.seg, l.pos)
    const measured = [l.method && optionLabel({ options: methodOptions }, l.method), l.image].filter(Boolean).join('; ')
    const size = l.size !== undefined ? `${l.size} mm${measured ? ` (${measured})` : ''}` : ''
    if (l.att === 'fat') {
      return [`  Lesion ${l.n}: ${[size, where].filter(Boolean).join(', ')}${size || where ? ', ' : ''}macroscopic fat: lipoma, fibrolipoma or inverted diverticulum, benign, no colonoscopy needed.`]
    }
    if (l.size !== undefined && l.size < 6) {
      warnings.push(`Lesion ${l.n} measures under 6 mm: diminutive polyps are not reported, so it is left out.`)
      return []
    }
    const parts = [
      size,
      where,
      l.morph && optionLabel({ options: morphOptions }, l.morph).toLowerCase(),
      l.att === 'soft' && 'soft-tissue attenuation',
      l.conf && `confidence ${optionLabel({ options: confOptions }, l.conf).toLowerCase()}`,
    ].filter(Boolean)
    const growth = l.growth && l.growth !== 'none' ? ` ${optionLabel({ options: growthOptions }, l.growth)} compared with prior.` : ''
    return parts.length > 0 || growth ? [`  Polyp ${l.n}: ${parts.join(', ')}.${growth}`] : []
  })
  if (str(v, 'lesionCount') === 'more' && str(v, 'extraLesions')) lesionLines.push(`  Additional: ${sentence(str(v, 'extraLesions'))}`)

  const massType = str(v, 'massType')
  const massWhere = location(str(v, 'massSeg'), str(v, 'massPos'))
  const massLength = num(v, 'massLength')
  let massLine = ''
  if (massType === 'mass') {
    const feats = list(v, 'massFeatures').map((f) => optionLabel(massFeatureField, f).toLowerCase())
    const parts = [massWhere, massLength !== undefined && `length ${massLength} mm`, ...feats].filter(Boolean)
    massLine = `  Mass${parts.length ? `: ${parts.join(', ')}` : ''}.${str(v, 'massNodes') ? ` Nodes: ${sentence(str(v, 'massNodes'))}` : ''}`
  }
  if (massType === 'div') {
    const feats = list(v, 'divFeatures').map((f) => optionLabel(divFeatureField, f).toLowerCase())
    const parts = [massWhere, massLength !== undefined && `length ${massLength} mm`, ...feats].filter(Boolean)
    massLine = `  Mass-like stricture${parts.length ? `: ${parts.join(', ')}` : ''}.`
  }

  const extraText = str(v, 'extraText')
  const e4 = list(v, 'e4Findings').map((f) => optionLabel(e4Field, f))
  const extraParts = [sentence(extraText), e4.length > 0 && !extraText && `${e4.join(', ')}.`, str(v, 'ivContrast') === 'no' && `Characterization limited by the unenhanced${str(v, 'lowDose') === 'yes' ? ' low-dose' : ''} technique.`].filter(Boolean)
  const extraLine = extraParts.length > 0 ? `Extracolonic: ${extraParts.join(' ')}` : ''

  const c = cCategory(v)
  const e = eLine(v)
  const limitation = c.code !== 'C0' && c.code !== 'Not assigned' ? c0Limitation(v) : ''
  const impression = [
    ...c.lines.map((line, i) => (i === 0 ? `1) ${line}` : `   ${line}`)),
    limitation && `   ${limitation}`,
    e && `2) ${e}`,
  ].filter(Boolean)

  /* Warnings the rules can see. */
  const reasons = inadequateReasons(v)
  if (str(v, 'adequate') === 'yes' && reasons.length > 0) warnings.push(`Study marked adequate, but C0 criteria are met: ${reasons.join('; ')}.`)
  if (reasons.length > 0 && c.code !== 'C0' && c.code !== 'Not assigned') warnings.push(`C0 criteria are met (${reasons.join('; ')}) and a ${c.code} finding is reported. C-RADS does not say which category wins, so the report gives ${c.code} and states the C0 limitation; confirm that is the category you want and that the recommendation covers the unevaluated colon.`)
  if (c.code === 'C2a and C2b') warnings.push('Both C2a and C2b findings: the report gets one overall C category, based on the most significant finding.')
  if (positions.length === 1) warnings.push('Only one position recorded: supine and prone are standard, and every segment needs to be distended in at least one position.')
  for (const l of lesions(v)) {
    if (l.att === 'fat' || l.size === undefined) continue
    if (l.size >= 9 && l.size <= 10 && (l.method === '2d' || l.method === 'oblique')) {
      warnings.push(`Lesion ${l.n} measures ${l.size} mm on 2D, at the 9 vs 10 mm boundary: 2D underestimates by about 1 mm, so measure on 3D.`)
    }
    if (l.size >= 30) warnings.push(`Lesion ${l.n} measures ${l.size} mm: C4 is a mass of 30 mm or more; if this is a mass, describe it under Mass.`)
  }
  if (massType === 'mass' && c.code !== 'C4') {
    warnings.push('Mass under 30 mm with no malignant-looking feature entered: C4 applies to a mass of 30 mm or more or a malignant-appearing one.')
  }
  const eCat = str(v, 'eCat')
  if (e4.length > 0 && eCat && eCat !== 'e4') warnings.push(`${e4.join(', ')} entered, which the lesson lists as E4 (likely important), but the E category is ${optionLabel(eField, eCat)}.`)
  if (eCat === 'e4' && e4.length === 0 && !extraText) warnings.push('E4 chosen but no extracolonic finding described.')

  const text = lines(
    indicationLine,
    techniqueLine,
    qualityLine,
    colonLine || (lesionLines.length > 0 || massLine ? 'Colon:' : ''),
    ...lesionLines,
    massLine,
    extraLine,
    'Impression:',
    ...impression.map((line) => `  ${line}`),
  )

  return { text, warnings }
}

/* ---------- Quiz ---------- */

const quiz: QuizQuestion[] = [
  {
    id: 'window',
    question: 'Which window is preferred for detecting polyps?',
    options: [
      'Standard soft tissue, 400/30',
      'Lung window, width 1500 and level −600',
      'Width 1500–2000 HU, level −200 to 0 HU',
      'Bone window, width 2000 and level 500',
    ],
    answer: 2,
    explanation: (
      <p>The preferred polyp window is width 1500–2000 HU and level −200 to 0 HU, which separates a soft-tissue polyp from gas, tagged fluid and fat at once. The 400/30 soft tissue window helps accentuate soft tissue for polyp evaluation but should not be used primarily for detection, because polyps can be obscured.</p>
    ),
  },
  {
    id: 'pedunculated',
    question: 'How do you measure a pedunculated polyp?',
    options: [
      'Head plus stalk, as one length',
      'Largest dimension of the head, exclusive of the stalk, excluding adherent tagging',
      'Axial diameter of the head including the adherent contrast coat',
      'Stalk length, since it predicts malignancy',
    ],
    answer: 1,
    explanation: (
      <p>Pedunculated polyps: measure the largest dimension of the head, exclusive of the stalk. Tagging agent adherent to the lesion surface is not included in the measurement.</p>
    ),
  },
  {
    id: 'boundary',
    question: 'A sessile soft-tissue polyp measures 9 mm on 2D axial. What should you do before signing out?',
    options: [
      'Report C2a; the 2D measurement is definitive',
      'Round up to 10 mm and call it C3',
      'Report it as diminutive',
      'Measure it on 3D, because 2D tends to underestimate by about 1 mm',
    ],
    answer: 3,
    explanation: (
      <p>2D measurements tend to underestimate true size compared with 3D by approximately 1 mm. At the 9 vs 10 mm boundary, measure on 3D: the difference is C2a (colonoscopy or CTC in 3 years) versus C3 (polypectomy).</p>
    ),
  },
  {
    id: 'three-small',
    question: 'Three sessile polyps of 6, 7 and 8 mm, none previously seen. Which C category?',
    options: ['C3', 'C2a', 'C1', 'C2b'],
    answer: 0,
    explanation: (
      <p>C3 is any polyp ≥10 mm, or three or more 6–9 mm polyps, or a C2a polyp that has grown; the recommendation is colonoscopic polypectomy. C2a is only one or two polyps of 6–9 mm (<Cite doi={CRADS}>C-RADS 2023</Cite>).</p>
    ),
  },
  {
    id: 'fat',
    question: 'A candidate lesion contains macroscopic fat on 2D. What is it and what does it need?',
    options: [
      'Retained stool; ask for a repeat prep',
      'Lipoma, fibrolipoma or inverted diverticulum; benign, no colonoscopy needed',
      'A carpet lesion; colonoscopy',
      'A subepithelial GIST; endoscopic ultrasound',
    ],
    answer: 1,
    explanation: (
      <p>Macroscopic fat indicates a lipoma, fibrolipoma, or an inverted diverticulum, all benign and not requiring colonoscopy. Foci of air or tagging agent within a lesion, by contrast, mean retained fecal matter.</p>
    ),
  },
  {
    id: 'location',
    question: 'How should a polyp be located in the report?',
    options: [
      'Distance from the anal verge in centimetres',
      'By the nearest flexure, e.g. "at the hepatic flexure"',
      'Segment (rectum, sigmoid, descending, transverse, ascending, cecum) and proximal/mid/distal within it',
      'By vertebral level',
    ],
    answer: 2,
    explanation: (
      <p>Use the six segments and say proximal/mid/distal within the segment. Don't use "flexure" as a location descriptor, and don't give a distance from the anal verge: colonoscopy measurements are up to half of the true centerline CTC distance because of telescoping and pleating of the colon over the scope.</p>
    ),
  },
  {
    id: 'myochosis',
    question: 'Sigmoid wall thickening with diverticulosis distends better prone than supine, with preserved haustra and no mucosal irregularity on 3D. You are confident it is benign. What is the category and follow-up?',
    options: [
      'C4; surgical referral',
      'C3; colonoscopic polypectomy',
      'C1; routine screening in 5–10 years',
      'C2b; follow-up CTC at 5 years',
    ],
    answer: 3,
    explanation: (
      <p>A segment that distends better prone than supine is muscular, not tumor. C2b is the likely benign mass-like diverticular stricture / myochosis: follow-up CTC at 5 years if confident, 3 years or less if not, and call it C4 if you're worried. The separating features are studied in <Cite doi={LIPS}>Lips et al., Radiology 2015</Cite>.</p>
    ),
  },
  {
    id: 'e3',
    question: 'On an unenhanced low-dose screening CTC, a small hypodense renal lesion cannot be characterized. Which E category?',
    options: ['E3: indeterminate but likely unimportant, work-up optional', 'E4: likely important, needs work-up', 'E1/E2: no follow-up', 'E0: inadequate'],
    answer: 0,
    explanation: (
      <p>E3 is indeterminate but likely unimportant, for example a small hypodense renal lesion you can't characterize without contrast; work-up is optional. E4 is reserved for likely important findings such as AAA, a solid renal mass, an adnexal mass or a suspicious lung nodule. The skill here is not over-calling.</p>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'ct-colonography',
  name: 'CT colonography and C-RADS 2023',
  lede: 'Technique checks, the 2D and 3D reading routine, how to interrogate and measure a polyp, the mimics, the C-RADS categories, and what the report must contain.',
  sourceNote: 'The backbone is the C-RADS 2023 update (Yee et al., Radiology 2024), the standard everyone reports against now.',
  references,
  report: { steps, build },
  learn,
  quiz,
}

export function CtColonographyStudyPage() {
  return <StudyPage study={study} />
}
