import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { classify } from '../logic/pirads'
import type { Score } from '../logic/pirads'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, Option, ReportStep, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Turkbey B et al. PI-RADS v2.1: 2019 update. Eur Urol 2019;76:340–351. (The rulebook. Free on the ACR site as the PI-RADS v2.1 PDF.)', doi: '10.1016/j.eururo.2019.02.033' },
  { citation: 'Weinreb JC et al. PI-RADS v2. Eur Urol 2016;69:16–40.', doi: '10.1016/j.eururo.2015.08.052' },
  { citation: 'Purysko AS et al. PI-RADS version 2: a pictorial update. RadioGraphics 2016;36:1354–1372. (Best image-by-image walk-through of each score.)', doi: '10.1148/rg.2016150234' },
  { citation: 'Barrett T et al. PI-RADS v2.1: one small step for prostate MRI. Clin Radiol 2019;74:841–852. (What changed and why, with examples.)', doi: '10.1016/j.crad.2019.05.019' },
  { citation: 'Padhani AR et al. The PI-RADS mpMRI and MRI-directed biopsy pathway. Radiology 2019;292:464–474.', doi: '10.1148/radiol.2019182946' },
  { citation: 'Ahmed HU et al. PROMIS. Lancet 2017;389:815–822.', doi: '10.1016/S0140-6736(16)32401-1' },
  { citation: 'Kasivisvanathan V et al. PRECISION. NEJM 2018;378:1767–1777.', doi: '10.1056/NEJMoa1801993' },
  { citation: 'Mehralivand S et al. EPE grading system. Radiology 2019;290:709–719. Validation: Reisæter LAR et al. Radiol Imaging Cancer 2020;2:e190071 (free full text).', doi: '10.1148/radiol.2018181278' },
  { citation: 'Kitzing YX et al. Benign conditions that mimic prostate carcinoma. RadioGraphics 2016;36:162–175. (Case series with pathology; your main mimic atlas.)', doi: '10.1148/rg.2016150030' },
  { citation: 'Rosenkrantz AB, Taneja SS. Ten pitfalls that confound interpretation of mpMRI. AJR 2014;202:109–120.', doi: '10.2214/AJR.13.10699' },
  { citation: 'Panebianco V et al. An update of pitfalls in prostate mpMRI. Insights Imaging 2018;9:87–101 (open access, figure-rich).', doi: '10.1007/s13244-017-0578-x' },
  { citation: 'Barrett T et al. Hemorrhage exclusion sign. Radiology 2012;263:751–757.', doi: '10.1148/radiol.12112100' },
  { citation: 'Giganti F et al. PI-QUAL. Eur Urol Oncol 2020;3:615–619.', doi: '10.1016/j.euo.2020.06.007' },
  { citation: 'Oerther B et al. Cancer detection rates by PI-RADS v2.1 category, meta-analysis. Prostate Cancer Prostatic Dis 2022;25:256–263.', doi: '10.1038/s41391-021-00417-1' },
  { citation: 'Rosenkrantz AB et al. Interobserver reproducibility of PI-RADS v2. Radiology 2016;280:793–804. (Reality check on which features are least reproducible: DCE and TZ T2.)', doi: '10.1148/radiol.2016152542' },
]

const reportTemplate = `Clinical: PSA (date), PSA density, biopsy history, treatment history, indication.
Technique: field strength, coil, sequences, contrast given or not.
Quality: adequate / limited (state why: motion, rectal gas, hip prosthesis).
Prostate: volume (L×W×H, mL) and PSA density. Hemorrhage present/absent.
Lesions (each one): location (zone, side, base/mid/apex, anterior/posterior;
  v2.1 sector map has 41 sectors if your urologists want it); size in mm on the
  driving sequence; T2 score; DWI score; DCE positive/negative; overall PI-RADS;
  image/series numbers for targeting. Flag the index lesion.
Staging (PI-RADS ≥4): capsular contact length, EPE grade or suspicion level,
  seminal vesicles, neurovascular bundles, bladder neck.
Lymph nodes: pelvic nodes, largest short axis, suspicious morphology.
Bones and other pelvic findings.
Impression: overall PI-RADS category (= highest lesion); one line on the index
  lesion with location; staging summary; actionable recommendation
  (e.g., "MRI-targeted biopsy of the index lesion recommended"; for PI-RADS 3,
  "biopsy decision may be guided by PSA density and clinical risk").`

/* ---------- Learn: the lesson, verbatim, one section per card ---------- */

const learn: StudyDefinition['learn'] = [
  {
    id: 'purpose',
    title: '1. What the study is for',
    body: (
      <>
        <p>Prostate MRI has one main job: find <em>clinically significant</em> cancer (Gleason ≥3+4, Grade Group ≥2) so the urologist can target a biopsy at it, and avoid biopsying men who don't need it. Two trials made it standard of care:</p>
        <ul className="plain-list">
          <li><strong>PROMIS</strong> (<Cite doi="10.1016/S0140-6736(16)32401-1">Ahmed et al., Lancet 2017;389:815</Cite>): MRI was more sensitive than systematic biopsy and could safely let about a quarter of men skip biopsy.</li>
          <li><strong>PRECISION</strong> (<Cite doi="10.1056/NEJMoa1801993">Kasivisvanathan et al., NEJM 2018;378:1767</Cite>): MRI-first with targeted biopsy found more significant cancer and less insignificant cancer than standard 12-core biopsy.</li>
        </ul>
        <p>The scoring system is PI-RADS. Version 2.1 is the current international standard for acquisition and interpretation (<Cite doi="10.1016/j.eururo.2019.02.033">Turkbey et al., Eur Urol 2019;76:340</Cite>). The forthcoming PI-RADS Pathway 2026 moves toward risk-based pathways that integrate MRI findings with PSA density and clinical parameters, so v2.1 is what you report with today, but expect PSA density to matter more and more.</p>
      </>
    ),
  },
  {
    id: 'before',
    title: '2. Before you look at a single image',
    body: (
      <>
        <p>Get these from the requisition or chart, because they change your read:</p>
        <ul className="plain-list">
          <li><strong>PSA</strong> and prior PSAs.</li>
          <li><strong>Prostate volume → PSA density</strong> (PSA ÷ volume). You'll measure volume yourself (step 2 below). Density above roughly 0.15 ng/mL/cc makes an equivocal lesion more worrying.</li>
          <li><strong>Prior biopsy?</strong> When? Blood in the gland lasts weeks to months and confuses everything. Ideal gap is ≥6 weeks.</li>
          <li><strong>Prior treatment?</strong> Radiation, prostatectomy, focal therapy, hormones, 5-alpha reductase inhibitors (finasteride shrinks the gland and lowers PSA by ~50%).</li>
          <li><strong>Why the scan?</strong> Never biopsied (detection), prior negative biopsy, active surveillance follow-up, or staging a known cancer. Same images, different questions.</li>
        </ul>
        <p>Then judge <strong>image quality</strong> before you score anything. The PI-QUAL score (<Cite doi="10.1016/j.euo.2020.06.007">Giganti et al., Eur Urol Oncol 2020;3:615</Cite>; PI-QUAL v2 2024) exists for this. Practical version: is T2 sharp, is DWI free of rectal-gas distortion, does the high-b image actually show the gland? If DWI is wrecked by gas, say so in the report; it limits the peripheral zone read.</p>
      </>
    ),
  },
  {
    id: 'anatomy',
    title: '3. Anatomy, in plain words',
    body: (
      <>
        <p>Think of the prostate as an upside-down cone. <strong>Base</strong> at the top (touches bladder), <strong>mid-gland</strong>, <strong>apex</strong> at the bottom (near the sphincter). Divide each level into right/left and anterior/posterior. That's how you'll localize lesions.</p>
        <p>Zones (the part that trips everyone up):</p>
        <ul className="plain-list">
          <li><strong>Peripheral zone (PZ)</strong>: the outer "horseshoe" at the back and sides. Bright on T2 (glandular, watery). ~70% of cancers live here.</li>
          <li><strong>Transition zone (TZ)</strong>: the inner gland around the urethra. This is where BPH happens. On T2 it looks like a heterogeneous mix of bright and dark nodules, "organized chaos." ~25–30% of cancers.</li>
          <li><strong>Central zone (CZ)</strong>: a wedge at the base surrounding the ejaculatory ducts. Dark on T2, dark on ADC, and <em>symmetric</em>. Famous mimic.</li>
          <li><strong>Anterior fibromuscular stroma (AFMS)</strong>: a dark band across the front, no glands, no cancer origin, but tumors can grow into it.</li>
        </ul>
        <p>Around the gland: the <strong>"capsule"</strong> (really a fibromuscular rim), the <strong>neurovascular bundles</strong> at about 5 and 7 o'clock posterolaterally, the <strong>seminal vesicles</strong> above/behind the base, and the rectum behind.</p>
      </>
    ),
  },
  {
    id: 'sequences',
    title: '4. The sequences and what each one answers',
    body: (
      <>
        <ul className="plain-list">
          <li><strong>T2 axial (plus sagittal/coronal)</strong>: anatomy, zonal boundaries, capsule, seminal vesicles. The <em>main</em> sequence for the TZ.</li>
          <li><strong>DWI with ADC map</strong>: cancer is cellular, so water can't move: bright on high b-value (≥1400 s/mm²), dark on ADC. The <em>main</em> sequence for the PZ.</li>
          <li><strong>DCE (dynamic contrast)</strong>: cancer enhances early. In v2.1 it has one job only: upgrading a PZ score 3 to 4. It never changes a TZ score.</li>
          <li><strong>T1 axial</strong>: one job: find blood (bright).</li>
        </ul>
        <p>A note on trends: "biparametric" MRI (T2 + DWI, no contrast) is increasingly accepted for detection in untreated men; the PRIME trial (<Cite doi="10.1001/jama.2025.13722">JAMA 2025</Cite>) supported non-inferiority. Your local protocol decides; the reading logic below is the same.</p>
      </>
    ),
  },
  {
    id: 'routine',
    title: '5. The step-by-step reading routine',
    body: (
      <>
        <div className="lesson-step">
          <h4>Step 1. T1: look for blood</h4>
          <p>Bright T1 in the gland = post-biopsy hemorrhage. Subacute hemorrhage has high T1 signal and no diffusion restriction, while cancer has low T1 signal and restricts diffusion. Bonus trick, the <em>hemorrhage exclusion sign</em> (<Cite doi="10.1148/radiol.12112100">Barrett et al., Radiology 2012;263:751</Cite>): cancer often shows as a dark T1 "hole" inside a background of bright blood, because tumor doesn't bleed the way normal gland does.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 2. T2: measure the gland and survey</h4>
          <p>Volume = length × width × height × 0.52 (length on sagittal, width and height on axial). Calculate PSA density. Then scroll base to apex and just look: is the PZ uniformly bright? Is the TZ the usual nodular chaos or is there a smudgy, structureless dark area? Is the capsule smooth? Are the seminal vesicles bright and feathery?</p>
        </div>
        <div className="lesson-step">
          <h4>Step 3. DWI/ADC: hunt the PZ</h4>
          <p>Put high-b and ADC side by side, scroll base to apex. You are looking for a <em>focal</em> spot that is bright on high-b AND dark on ADC. Diffuse, wedge-shaped, or linear low signal is usually prostatitis/atrophy, not cancer. A focal round/oval spot is the thing.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 4. T2: hunt the TZ</h4>
          <p>Here DWI is less useful because BPH nodules also restrict. What you want is a <strong>non-nodule</strong>: a dark, lens-shaped ("lenticular") area with ill-defined margins and no capsule, often described as <strong>"erased charcoal"</strong>, like a smudge someone tried to wipe out. Typical BPH nodules are round, encapsulated, and clearly separate from their neighbors.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 5. DCE: only if you have a PZ 3</h4>
          <p>Focal early enhancement that matches the T2/DWI abnormality = "positive" and pushes PZ 3 → 4. Diffuse enhancement or enhancement matching a BPH nodule = negative.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 6. Score each lesion</h4>
          <p>See section 6.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 7. Stage any lesion ≥ PI-RADS 4</h4>
          <p>See section 7.</p>
        </div>
        <div className="lesson-step">
          <h4>Step 8. The rest of the pelvis</h4>
          <p>Pelvic nodes (obturator, internal/external iliac, presacral), bones in the field of view, bladder, rectum, incidental findings.</p>
        </div>
      </>
    ),
  },
  {
    id: 'scoring',
    title: '6. PI-RADS v2.1 scoring, simplified',
    body: (
      <>
        <div className="lesson-key">
          <p>The rule that runs everything: <strong>PZ is scored by DWI; TZ is scored by T2.</strong> The other sequence only nudges.</p>
        </div>
        <h4>Peripheral zone (DWI drives it)</h4>
        <ul className="plain-list">
          <li><strong>1</strong>: no abnormality.</li>
          <li><strong>2</strong>: linear or wedge-shaped low ADC, mildly bright on high-b.</li>
          <li><strong>3</strong>: <em>focal</em> low ADC, mild-to-moderate, high-b only mildly bright. → If DCE positive, becomes <strong>4</strong>.</li>
          <li><strong>4</strong>: focal, <em>markedly</em> dark ADC and <em>markedly</em> bright high-b, <strong>&lt; 1.5 cm</strong>.</li>
          <li><strong>5</strong>: same as 4 but <strong>≥ 1.5 cm</strong>, OR definite extraprostatic extension.</li>
        </ul>
        <h4>Transition zone (T2 drives it)</h4>
        <ul className="plain-list">
          <li><strong>1</strong>: normal, or a completely encapsulated round nodule (classic BPH).</li>
          <li><strong>2</strong>: mostly encapsulated nodule, or a homogeneous circumscribed nodule without a full capsule ("atypical nodule"), or mild homogeneous dark area between nodules. → If DWI is 4 or 5, becomes <strong>3</strong>.</li>
          <li><strong>3</strong>: heterogeneous signal with blurred margins; includes other things that don't qualify as 2, 4, or 5. → If DWI is a 5, becomes <strong>4</strong>.</li>
          <li><strong>4</strong>: lens-shaped or ill-defined, homogeneously moderately dark ("erased charcoal"), <strong>&lt; 1.5 cm</strong>.</li>
          <li><strong>5</strong>: same but <strong>≥ 1.5 cm</strong>, or definite EPE.</li>
        </ul>
        <p>What the numbers mean for the urologist (pooled meta-analysis figures, approximate): PI-RADS 3 lesions harbor significant cancer in roughly 1 in 6, PI-RADS 4 in about half or more, PI-RADS 5 in the large majority (<Cite doi="10.1038/s41391-021-00417-1">Oerther et al., Prostate Cancer Prostatic Dis 2022;25:256</Cite>). Lesions scored 4 or 5 go to targeted biopsy; PI-RADS 3 remains equivocal and gets further risk stratification, with PSA density cutoffs of 0.15–0.20 ng/mL/cc helping refine the biopsy decision.</p>
        <p><strong>Housekeeping rules:</strong> report up to <strong>4</strong> lesions, name the <strong>index lesion</strong> (highest score; if tied, the one with EPE, then the largest), measure each on the sequence that drives its score (ADC for PZ, T2 for TZ), and give the largest dimension.</p>
      </>
    ),
  },
  {
    id: 'staging',
    title: '7. Local staging: EPE and seminal vesicle invasion',
    body: (
      <>
        <p>You stage on T2. The standardized system by Mehralivand et al. (<Cite doi="10.1148/radiol.2018181278">Radiology 2019;290:709</Cite>) was built because MRI is often falsely positive for extraprostatic extension. It draws on curvilinear contact length, capsular bulge and irregularity, obliteration of the rectoprostatic angle, asymmetry of neurovascular bundles, frank breach of the capsule, and seminal vesicle invasion.</p>
        <p>The EPE grade you can put in a report:</p>
        <ul className="plain-list">
          <li><strong>Grade 1</strong>: tumor touching the capsule for ≥ 1.5 cm, <em>or</em> capsular bulge/irregularity.</li>
          <li><strong>Grade 2</strong>: both of those.</li>
          <li><strong>Grade 3</strong>: tumor clearly outside the gland, or invading the seminal vesicle / neurovascular bundle.</li>
        </ul>
        <p>An independent validation found the Mehralivand grading performs similarly to a five-point Likert assessment, so if your group uses "low/intermediate/high suspicion for EPE" instead, that's acceptable, but state your criteria.</p>
        <p><strong>Seminal vesicle invasion:</strong> normally bright fluid-filled tubules on T2. Invasion = dark tumor signal filling the lumen, wall thickening, or a dark tumor tracking up from the base along the ejaculatory ducts, usually with restricted diffusion. Look at the coronal.</p>
        <p>Also comment on: bladder neck, rectum (rarely), neurovascular bundle asymmetry, and the distance from the tumor to the apex (matters for nerve-sparing and margins).</p>
      </>
    ),
  },
  {
    id: 'mimics',
    title: '8. The pathologies and mimics you must know',
    body: (
      <>
        <p>The key reference is <Cite doi="10.1148/rg.2016150030">Kitzing et al., RadioGraphics 2016;36:162</Cite>, "Benign conditions that mimic prostate carcinoma," a case-by-case pictorial with histology covering the anterior fibromuscular stroma, surgical capsule, central zone, periprostatic vein, periprostatic lymph nodes, BPH, atrophy, necrosis, calcification, hemorrhage, and prostatitis. Also <Cite doi="10.2214/AJR.13.10699">Rosenkrantz &amp; Taneja, AJR 2014;202:109</Cite> ("ten pitfalls") and <Cite doi="10.1007/s13244-017-0578-x">Panebianco et al., Insights Imaging 2018;9:87</Cite> (pitfalls through the PI-RADS v2 lens, with worked figures).</p>
        <p>The ones that bite most:</p>
        <ul className="plain-list">
          <li><strong>Central zone.</strong> Dark T2, dark ADC, at the base, but <em>symmetric</em>, wedge-shaped, and hugs the ejaculatory ducts. Asymmetry or a bulge is the clue to real cancer.</li>
          <li><strong>Stromal BPH nodule in the PZ.</strong> BPH nodules can bulge into or "extrude" into the PZ. They're round, encapsulated, and often contain tiny bright dots (dilated acini). Capsule + round + acini = benign.</li>
          <li><strong>Prostatitis (acute, chronic, granulomatous).</strong> Dark T2 in the PZ but <em>diffuse, wedge-shaped, or band-like</em>, with only mild ADC drop. Granulomatous prostatitis (classically after BCG for bladder cancer) is the dangerous one: it can be indistinguishable from cancer on mpMRI and may even mimic EPE and lymphadenopathy. A history of BCG in the requisition should make you hedge.</li>
          <li><strong>Post-biopsy hemorrhage.</strong> Bright T1. Use the hemorrhage exclusion sign above.</li>
          <li><strong>Anterior fibromuscular stroma and surgical capsule.</strong> Dark bands at the front and at the TZ/PZ boundary, from dense fibromuscular tissue. Anterior cancers <em>do</em> exist (and are the ones systematic biopsy misses), so look for a <em>focal</em> ADC drop and a mass-like bulge into the AFMS rather than a smooth band.</li>
          <li><strong>Atrophy / calcification / cysts.</strong> Atrophy: dark T2, minimal ADC change, gland looks shrunken. Calcification: dark on everything; check T1 and CT if available. Midline cysts (utricle, Müllerian duct cyst) are bright T2, no restriction, no enhancement. Describe and move on.</li>
          <li><strong>Abscess.</strong> Rim-enhancing collection with central marked restriction; the clinical picture (fever, pain) usually tells you.</li>
        </ul>
        <p>Rarer things to name in passing: sarcoma/stromal tumors of the prostate (large, heterogeneous, rapid growth), lymphoma, bladder cancer growing into the base, and post-treatment appearances (which deserve their own lesson).</p>
      </>
    ),
  },
  {
    id: 'report',
    title: '9. What the report should include',
    body: (
      <>
        <p>PI-RADS v2.1 recommends a structured report. A template you can adapt:</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Two style points: never leave the impression without an overall PI-RADS number, and don't write "cannot exclude carcinoma" on a PI-RADS 2. The whole point of the system is to replace that phrase with a number.</p>
        </div>
      </>
    ),
  },
]

/* ---------- Options ---------- */

const yesNo: Option[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const biopsyOptions: Option[] = [
  { value: 'none', label: 'Never biopsied' },
  { value: 'neg', label: 'Prior negative biopsy' },
  { value: 'pos', label: 'Prior positive biopsy' },
]

const indicationOptions: Option[] = [
  { value: 'detect', label: 'Detection (never biopsied)' },
  { value: 'negbx', label: 'Prior negative biopsy' },
  { value: 'as', label: 'Active surveillance follow-up' },
  { value: 'stage', label: 'Staging a known cancer' },
]

const treatmentOptions: Option[] = [
  { value: 'rt', label: 'Radiation' },
  { value: 'rp', label: 'Prostatectomy' },
  { value: 'focal', label: 'Focal therapy' },
  { value: 'hormones', label: 'Hormones' },
  { value: '5ari', label: '5-alpha reductase inhibitor' },
  { value: 'bcg', label: 'BCG for bladder cancer' },
]

const fieldStrengthOptions: Option[] = [
  { value: '1.5', label: '1.5 T' },
  { value: '3', label: '3 T' },
]

const sequenceOptions: Option[] = [
  { value: 't2', label: 'T2 axial (plus sagittal/coronal)' },
  { value: 'dwi', label: 'DWI with ADC map' },
  { value: 'dce', label: 'DCE (dynamic contrast)' },
  { value: 't1', label: 'T1 axial' },
]

const contrastOptions: Option[] = [
  { value: 'yes', label: 'Given' },
  { value: 'no', label: 'Not given' },
]

const qualityOptions: Option[] = [
  { value: 'adequate', label: 'Adequate' },
  { value: 'limited', label: 'Limited' },
]

const limitationOptions: Option[] = [
  { value: 'motion', label: 'Motion' },
  { value: 'gas', label: 'Rectal gas' },
  { value: 'hip', label: 'Hip prosthesis' },
]

const presentOptions: Option[] = [
  { value: 'absent', label: 'Absent' },
  { value: 'present', label: 'Present' },
]

const countOptions: Option[] = ['0', '1', '2', '3', '4'].map((n) => ({ value: n, label: n }))

const zoneOptions: Option[] = [
  { value: 'pz', label: 'Peripheral zone' },
  { value: 'tz', label: 'Transition zone' },
]

const dwiOptions: Option[] = [
  { value: '1', label: '1: no abnormality' },
  { value: '2', label: '2: linear or wedge-shaped low ADC, mildly bright on high-b' },
  { value: '3', label: '3: focal low ADC, mild-to-moderate, high-b only mildly bright' },
  { value: '4', label: '4: focal, markedly dark ADC and markedly bright high-b, < 1.5 cm' },
  { value: '5', label: '5: same as 4 but ≥ 1.5 cm, or definite EPE' },
]

const t2TzOptions: Option[] = [
  { value: '1', label: '1: normal, or completely encapsulated round nodule' },
  { value: '2', label: '2: mostly encapsulated or atypical nodule, or mild homogeneous dark area' },
  { value: '3', label: '3: heterogeneous signal with blurred margins' },
  { value: '4', label: '4: lenticular or ill-defined, moderately dark ("erased charcoal"), < 1.5 cm' },
  { value: '5', label: '5: same but ≥ 1.5 cm, or definite EPE' },
]

const t2PzOptions: Option[] = ['1', '2', '3', '4', '5'].map((n) => ({ value: n, label: n }))

const dceOptions: Option[] = [
  { value: 'neg', label: 'Negative' },
  { value: 'pos', label: 'Positive' },
]

const sideOptions: Option[] = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'midline', label: 'Midline' },
  { value: 'bilateral', label: 'Bilateral' },
]

const levelOptions: Option[] = [
  { value: 'base', label: 'Base' },
  { value: 'mid', label: 'Mid-gland' },
  { value: 'apex', label: 'Apex' },
]

const apOptions: Option[] = [
  { value: 'anterior', label: 'Anterior' },
  { value: 'posterior', label: 'Posterior' },
]

const epeMethodOptions: Option[] = [
  { value: 'grade', label: 'Mehralivand grade' },
  { value: 'likert', label: 'Suspicion level' },
]

const likertOptions: Option[] = [
  { value: 'low', label: 'Low' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'high', label: 'High' },
]

const sviOptions: Option[] = [
  { value: 'none', label: 'No invasion' },
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'both', label: 'Bilateral' },
]

const nvbOptions: Option[] = [
  { value: 'sym', label: 'Symmetric' },
  { value: 'asym', label: 'Asymmetric' },
  { value: 'inv', label: 'Invaded' },
]

const involvedOptions: Option[] = [
  { value: 'clear', label: 'Not involved' },
  { value: 'inv', label: 'Involved' },
]

const nodeOptions: Option[] = [
  { value: 'none', label: 'No suspicious nodes' },
  { value: 'susp', label: 'Suspicious nodes' },
]

const stationOptions: Option[] = [
  { value: 'obturator', label: 'Obturator' },
  { value: 'internal', label: 'Internal iliac' },
  { value: 'external', label: 'External iliac' },
  { value: 'presacral', label: 'Presacral' },
]

const boneOptions: Option[] = [
  { value: 'none', label: 'No suspicious lesion' },
  { value: 'susp', label: 'Suspicious lesion' },
]

const noLesionOptions: Option[] = [
  { value: '1', label: 'PI-RADS 1' },
  { value: '2', label: 'PI-RADS 2' },
]

/* ---------- Rule helpers ---------- */

const LESIONS = [1, 2, 3, 4]

/** Field id for lesion n, e.g. key(2, 'dwi') -> 'l2dwi'. */
function key(n: number, name: string) {
  return `l${n}${name}`
}

function lesionCount(values: Values) {
  return Number(str(values, 'lesionCount')) || 0
}

function hasLesion(n: number) {
  return (values: Values) => lesionCount(values) >= n
}

function zoneOf(values: Values, n: number) {
  return str(values, key(n, 'zone'))
}

function contrastGiven(values: Values) {
  return str(values, 'contrast') === 'yes'
}

function label(options: Option[], value: string) {
  return optionLabel({ options }, value)
}

function listLabels(options: Option[], values: string[]) {
  return values.map((value) => label(options, value)).join(', ')
}

type LessonResult = { n: number; category: Score; summary: string }

/** Overall PI-RADS for lesion n, via the shared calculator logic, once its driving scores are in. */
function lesionResult(values: Values, n: number): LessonResult | undefined {
  if (!hasLesion(n)(values)) return undefined
  const zone = zoneOf(values, n)
  const dwi = num(values, key(n, 'dwi'))
  if (!zone || dwi === undefined) return undefined
  const t2 = zone === 'tz' ? num(values, key(n, 't2')) : num(values, key(n, 't2p'))
  if (zone === 'tz' && t2 === undefined) return undefined
  const size = num(values, key(n, 'size'))
  const result = classify({
    zone: zone === 'pz' ? 'peripheral' : 'transition',
    laterality: 'left',
    location: '',
    dwiScore: dwi as Score,
    t2Score: (t2 ?? 1) as Score,
    dcePositive: contrastGiven(values) && str(values, key(n, 'dce')) === 'pos',
    sizeCm: size === undefined ? '' : String(size / 10),
    epeOrInvasive: str(values, key(n, 'epe')) === 'yes',
  })
  return { n, category: result.category, summary: result.summary }
}

function lesionResults(values: Values) {
  return LESIONS.map((n) => lesionResult(values, n)).filter((r): r is LessonResult => r !== undefined)
}

/** Index lesion: highest score; if tied, the one with EPE, then the largest. */
function indexLesion(values: Values) {
  const ranked = [...lesionResults(values)].sort((a, b) => {
    if (b.category !== a.category) return b.category - a.category
    const epeA = str(values, key(a.n, 'epe')) === 'yes' ? 1 : 0
    const epeB = str(values, key(b.n, 'epe')) === 'yes' ? 1 : 0
    if (epeB !== epeA) return epeB - epeA
    return (num(values, key(b.n, 'size')) ?? 0) - (num(values, key(a.n, 'size')) ?? 0)
  })
  return ranked[0]
}

/** Overall PI-RADS category (= highest lesion), or the stated category when no lesion is reported. */
function overallCategory(values: Values): number | undefined {
  const index = indexLesion(values)
  if (index) return index.category
  if (str(values, 'lesionCount') === '0') return num(values, 'noLesionCat')
  return undefined
}

function stagingNeeded(values: Values) {
  return lesionResults(values).some((r) => r.category >= 4)
}

function volume(values: Values) {
  const l = num(values, 'length')
  const w = num(values, 'width')
  const h = num(values, 'height')
  if (l === undefined || w === undefined || h === undefined) return undefined
  return l * w * h * 0.52
}

function psaDensity(values: Values) {
  const psa = num(values, 'psa')
  const vol = volume(values)
  if (psa === undefined || vol === undefined || vol <= 0) return undefined
  return psa / vol
}

/** Mehralivand EPE grade as the lesson states it; 0 means none of the grade 1-3 criteria. */
function epeGrade(values: Values): number | undefined {
  const outside = str(values, 'outside')
  const svi = str(values, 'svi')
  const nvb = str(values, 'nvb')
  if (outside === 'yes' || (svi !== '' && svi !== 'none') || nvb === 'inv') return 3
  const contact = num(values, 'contact')
  const bulge = str(values, 'bulge')
  const long = contact !== undefined && contact >= 15
  const irregular = bulge === 'yes'
  if (long && irregular) return 2
  // Grade 1 vs 2 needs both criteria answered.
  if (contact === undefined || bulge === '') return undefined
  if (long || irregular) return 1
  return 0
}

function lesionLocation(values: Values, n: number) {
  const zone = zoneOf(values, n)
  const side = str(values, key(n, 'side'))
  const level = str(values, key(n, 'level'))
  const ap = str(values, key(n, 'ap'))
  const sector = str(values, key(n, 'sector'))
  const head = [side && label(sideOptions, side).toLowerCase(), zone && label(zoneOptions, zone).toLowerCase()].filter(Boolean).join(' ')
  const parts = [head, level && label(levelOptions, level).toLowerCase(), ap && label(apOptions, ap).toLowerCase()].filter(Boolean)
  return parts.join(', ') + (sector ? ` (sector ${sector})` : '')
}

function round(value: number, digits: number) {
  return Number(value.toFixed(digits)).toString()
}

/* ---------- Fields ---------- */

function perLesion(make: (n: number) => Field): Field[] {
  return LESIONS.map(make)
}

const detailsFields: Field[] = [
  { id: 'psa', kind: 'number', label: 'PSA', unit: 'ng/mL', min: 0, step: 0.1, required: true },
  { id: 'psaDate', kind: 'text', label: 'PSA date', placeholder: 'e.g. 2026-08-14' },
  { id: 'priorPsa', kind: 'text', label: 'Prior PSAs', placeholder: 'e.g. 4.8 (2025), 5.6 (2026)' },
  { id: 'biopsy', kind: 'choice', label: 'Biopsy history', options: biopsyOptions, required: true },
  { id: 'biopsyWeeks', kind: 'number', label: 'Time since last biopsy', unit: 'weeks', min: 0, help: 'Ideal gap is ≥6 weeks.', showIf: (v) => ['neg', 'pos'].includes(str(v, 'biopsy')) },
  { id: 'biopsyDetail', kind: 'text', label: 'Biopsy details', placeholder: 'e.g. 12-core TRUS, Grade Group 1 left apex', showIf: (v) => ['neg', 'pos'].includes(str(v, 'biopsy')) },
  { id: 'treatment', kind: 'multi', label: 'Prior treatment', options: treatmentOptions },
  { id: 'indication', kind: 'choice', label: 'Why the scan', options: indicationOptions, required: true },
  { id: 'fieldStrength', kind: 'choice', label: 'Field strength', options: fieldStrengthOptions },
  { id: 'coil', kind: 'text', label: 'Coil', placeholder: 'e.g. pelvic phased-array, no endorectal coil' },
  { id: 'sequences', kind: 'multi', label: 'Sequences', options: sequenceOptions },
  { id: 'contrast', kind: 'choice', label: 'Contrast', options: contrastOptions, required: true },
  { id: 'quality', kind: 'choice', label: 'Image quality', options: qualityOptions, required: true },
  { id: 'limitations', kind: 'multi', label: 'Limited because of', options: limitationOptions, showIf: (v) => str(v, 'quality') === 'limited' },
  { id: 'limitationOther', kind: 'text', label: 'Other limitation', showIf: (v) => str(v, 'quality') === 'limited' },
]

const t1Fields: Field[] = [
  { id: 'hemorrhage', kind: 'choice', label: 'Hemorrhage (bright T1 in the gland)', options: presentOptions, required: true },
  { id: 'hemorrhageSite', kind: 'text', label: 'Hemorrhage location', placeholder: 'e.g. right PZ, mid-gland to base', showIf: (v) => str(v, 'hemorrhage') === 'present' },
]

const t2GlandFields: Field[] = [
  { id: 'length', kind: 'number', label: 'Length (sagittal)', unit: 'cm', min: 0, step: 0.1, required: true },
  { id: 'width', kind: 'number', label: 'Width (axial)', unit: 'cm', min: 0, step: 0.1, required: true },
  { id: 'height', kind: 'number', label: 'Height (axial)', unit: 'cm', min: 0, step: 0.1, required: true },
]

const dwiFields: Field[] = [
  { id: 'lesionCount', kind: 'choice', label: 'Lesions to report', options: countOptions, required: true, help: 'Report up to 4 lesions.' },
  { id: 'noLesionCat', kind: 'choice', label: 'Overall category with no lesion reported', options: noLesionOptions, required: true, help: 'Never leave the impression without an overall PI-RADS number.', showIf: (v) => str(v, 'lesionCount') === '0' },
  ...LESIONS.flatMap((n): Field[] => [
    { id: key(n, 'zone'), kind: 'choice', label: `Lesion ${n} zone`, options: zoneOptions, required: true, showIf: hasLesion(n) },
    { id: key(n, 'dwi'), kind: 'choice', label: `Lesion ${n} DWI score`, options: dwiOptions, required: true, help: 'Drives the score in the PZ; in the TZ it only nudges (upgrades).', showIf: hasLesion(n) },
  ]),
]

const t2TzFields: Field[] = LESIONS.flatMap((n): Field[] => [
  { id: key(n, 't2'), kind: 'choice', label: `Lesion ${n} T2 score (TZ)`, options: t2TzOptions, required: true, help: 'Drives the score in the TZ.', showIf: (v) => hasLesion(n)(v) && zoneOf(v, n) === 'tz' },
  { id: key(n, 't2p'), kind: 'choice', label: `Lesion ${n} T2 score (PZ)`, options: t2PzOptions, required: true, help: 'Recorded for the PZ; it does not change the category.', showIf: (v) => hasLesion(n)(v) && zoneOf(v, n) === 'pz' },
])

const dceFields: Field[] = perLesion((n) => ({
  id: key(n, 'dce'),
  kind: 'choice',
  label: `Lesion ${n} DCE`,
  options: dceOptions,
  required: true,
  help: 'Positive = focal early enhancement matching the T2/DWI abnormality.',
  showIf: (v) => hasLesion(n)(v) && contrastGiven(v),
}))

const lesionFields: Field[] = LESIONS.flatMap((n): Field[] => [
  { id: key(n, 'side'), kind: 'choice', label: `Lesion ${n} side`, options: sideOptions, required: true, showIf: hasLesion(n) },
  { id: key(n, 'level'), kind: 'choice', label: `Lesion ${n} level`, options: levelOptions, required: true, showIf: hasLesion(n) },
  { id: key(n, 'ap'), kind: 'choice', label: `Lesion ${n} anterior/posterior`, options: apOptions, required: true, showIf: hasLesion(n) },
  { id: key(n, 'sector'), kind: 'text', label: `Lesion ${n} sector (v2.1 map, optional)`, placeholder: 'e.g. 4p', showIf: hasLesion(n) },
  { id: key(n, 'size'), kind: 'number', label: `Lesion ${n} size, largest dimension`, unit: 'mm', min: 0, required: true, help: 'On the driving sequence: ADC for PZ, T2 for TZ.', showIf: hasLesion(n) },
  { id: key(n, 'epe'), kind: 'choice', label: `Lesion ${n} definite extraprostatic extension`, options: yesNo, required: true, showIf: hasLesion(n) },
  { id: key(n, 'images'), kind: 'text', label: `Lesion ${n} series/image for targeting`, placeholder: 'e.g. series 5, image 14', required: true, showIf: hasLesion(n) },
])

const stagingFields: Field[] = [
  { id: 'epeMethod', kind: 'choice', label: 'EPE reported as', options: epeMethodOptions, required: true, showIf: stagingNeeded },
  { id: 'contact', kind: 'number', label: 'Capsular contact length', unit: 'mm', min: 0, required: true, help: 'Grade 1 threshold: ≥ 1.5 cm (15 mm).', showIf: stagingNeeded },
  { id: 'bulge', kind: 'choice', label: 'Capsular bulge/irregularity', options: yesNo, required: true, showIf: (v) => stagingNeeded(v) && str(v, 'epeMethod') === 'grade' },
  { id: 'outside', kind: 'choice', label: 'Tumor clearly outside the gland', options: yesNo, required: true, showIf: (v) => stagingNeeded(v) && str(v, 'epeMethod') === 'grade' },
  { id: 'likert', kind: 'choice', label: 'Suspicion for EPE', options: likertOptions, required: true, showIf: (v) => stagingNeeded(v) && str(v, 'epeMethod') === 'likert' },
  { id: 'likertCriteria', kind: 'text', label: 'Criteria used', placeholder: 'State your criteria', required: true, showIf: (v) => stagingNeeded(v) && str(v, 'epeMethod') === 'likert' },
  { id: 'svi', kind: 'choice', label: 'Seminal vesicles', options: sviOptions, required: true, showIf: stagingNeeded },
  { id: 'nvb', kind: 'choice', label: 'Neurovascular bundles', options: nvbOptions, required: true, showIf: stagingNeeded },
  { id: 'bladderNeck', kind: 'choice', label: 'Bladder neck', options: involvedOptions, required: true, showIf: stagingNeeded },
  { id: 'rectum', kind: 'choice', label: 'Rectum', options: involvedOptions, showIf: stagingNeeded },
  { id: 'apexDistance', kind: 'number', label: 'Tumor to apex distance', unit: 'mm', min: 0, help: 'Matters for nerve-sparing and margins.', showIf: stagingNeeded },
]

const pelvisFields: Field[] = [
  { id: 'nodes', kind: 'choice', label: 'Pelvic lymph nodes', options: nodeOptions, required: true },
  { id: 'nodeStations', kind: 'multi', label: 'Stations', options: stationOptions, showIf: (v) => str(v, 'nodes') === 'susp' },
  { id: 'nodeShortAxis', kind: 'number', label: 'Largest short axis', unit: 'mm', min: 0, showIf: (v) => str(v, 'nodes') === 'susp' },
  { id: 'nodeMorphology', kind: 'text', label: 'Suspicious morphology', placeholder: 'e.g. round, loss of fatty hilum', showIf: (v) => str(v, 'nodes') === 'susp' },
  { id: 'bones', kind: 'choice', label: 'Bones in the field of view', options: boneOptions, required: true },
  { id: 'bonesDetail', kind: 'text', label: 'Bone lesion', showIf: (v) => str(v, 'bones') === 'susp' },
  { id: 'otherPelvic', kind: 'text', label: 'Bladder, rectum, other pelvic and incidental findings', multiline: true },
]

/* ---------- Steps ---------- */

const steps: ReportStep[] = [
  {
    id: 'details',
    title: 'Before you look: clinical, technique, quality',
    learn: 'before',
    teach: (
      <>
        <p>Get these from the requisition or chart, because they change your read: PSA and prior PSAs, prior biopsy (when? Blood in the gland lasts weeks to months and confuses everything; ideal gap is ≥6 weeks), prior treatment (finasteride shrinks the gland and lowers PSA by ~50%), and why the scan. Same images, different questions.</p>
        <p>Then judge image quality before you score anything (PI-QUAL, <Cite doi="10.1016/j.euo.2020.06.007">Giganti et al., Eur Urol Oncol 2020;3:615</Cite>). Is T2 sharp, is DWI free of rectal-gas distortion, does the high-b image actually show the gland? If DWI is wrecked by gas, say so in the report; it limits the peripheral zone read.</p>
        <p>A history of BCG in the requisition should make you hedge: granulomatous prostatitis can be indistinguishable from cancer on mpMRI.</p>
      </>
    ),
    fields: detailsFields,
    derive: (v) => {
      const out: Derived[] = []
      const weeks = num(v, 'biopsyWeeks')
      if (weeks !== undefined && ['neg', 'pos'].includes(str(v, 'biopsy'))) {
        out.push(weeks < 6 ? { label: 'Biopsy gap', value: `${weeks} weeks: under the ideal ≥6`, tone: 'warn' } : { label: 'Biopsy gap', value: `${weeks} weeks: ≥6`, tone: 'good' })
      }
      const treatment = list(v, 'treatment')
      if (treatment.includes('5ari')) out.push({ label: '5-ARI', value: 'Gland shrunk, PSA lowered ~50%', tone: 'warn' })
      if (treatment.includes('bcg')) out.push({ label: 'BCG', value: 'Granulomatous prostatitis can mimic cancer: hedge', tone: 'warn' })
      if (str(v, 'quality') === 'limited' && list(v, 'limitations').includes('gas')) out.push({ label: 'Rectal gas', value: 'Limits the PZ read', tone: 'warn' })
      return out
    },
  },
  {
    id: 't1',
    title: 'Step 1. T1: look for blood',
    learn: 'routine',
    teach: (
      <>
        <p>Bright T1 in the gland = post-biopsy hemorrhage. Subacute hemorrhage has high T1 signal and no diffusion restriction, while cancer has low T1 signal and restricts diffusion.</p>
        <p>Bonus trick, the <em>hemorrhage exclusion sign</em> (<Cite doi="10.1148/radiol.12112100">Barrett et al., Radiology 2012;263:751</Cite>): cancer often shows as a dark T1 "hole" inside a background of bright blood, because tumor doesn't bleed the way normal gland does.</p>
      </>
    ),
    fields: t1Fields,
  },
  {
    id: 't2-gland',
    title: 'Step 2. T2: measure the gland and survey',
    learn: 'routine',
    teach: (
      <>
        <p>Volume = length × width × height × 0.52 (length on sagittal, width and height on axial). Calculate PSA density (PSA ÷ volume). Density above roughly 0.15 ng/mL/cc makes an equivocal lesion more worrying.</p>
        <p>Then scroll base to apex and just look: is the PZ uniformly bright? Is the TZ the usual nodular chaos or is there a smudgy, structureless dark area? Is the capsule smooth? Are the seminal vesicles bright and feathery?</p>
      </>
    ),
    fields: t2GlandFields,
    derive: (v) => {
      const out: Derived[] = []
      const vol = volume(v)
      if (vol !== undefined) out.push({ label: 'Volume', value: `${round(vol, 1)} mL` })
      const density = psaDensity(v)
      if (density !== undefined) {
        // Compare the value as displayed, so 0.1504 does not read "0.15 ... above 0.15".
        const high = Number(round(density, 2)) > 0.15
        out.push({ label: 'PSA density', value: `${round(density, 2)} ng/mL/cc`, tone: high ? 'warn' : 'neutral' })
        if (high) out.push({ label: 'Density', value: 'Above roughly 0.15: an equivocal lesion is more worrying', tone: 'warn' })
      }
      return out
    },
  },
  {
    id: 'dwi',
    title: 'Step 3. DWI/ADC: hunt the PZ',
    learn: 'routine',
    teach: (
      <>
        <p>Put high-b and ADC side by side, scroll base to apex. You are looking for a <em>focal</em> spot that is bright on high-b AND dark on ADC. Diffuse, wedge-shaped, or linear low signal is usually prostatitis/atrophy, not cancer. A focal round/oval spot is the thing.</p>
        <p>The rule that runs everything: <strong>PZ is scored by DWI; TZ is scored by T2.</strong> The other sequence only nudges. Report up to 4 lesions.</p>
        <p>Mimics: the central zone is dark on T2 and ADC at the base but <em>symmetric</em>, wedge-shaped, and hugs the ejaculatory ducts (<Cite doi="10.1148/rg.2016150030">Kitzing et al., RadioGraphics 2016;36:162</Cite>).</p>
      </>
    ),
    fields: dwiFields,
  },
  {
    id: 't2-tz',
    title: 'Step 4. T2: hunt the TZ',
    learn: 'routine',
    teach: (
      <>
        <p>Here DWI is less useful because BPH nodules also restrict. What you want is a <strong>non-nodule</strong>: a dark, lens-shaped ("lenticular") area with ill-defined margins and no capsule, often described as <strong>"erased charcoal"</strong>, like a smudge someone tried to wipe out. Typical BPH nodules are round, encapsulated, and clearly separate from their neighbors.</p>
        <p>In the TZ a DWI of 4 or 5 upgrades a T2 score of 2 to 3, and a DWI of 5 upgrades a T2 score of 3 to 4.</p>
      </>
    ),
    fields: t2TzFields,
  },
  {
    id: 'dce',
    title: 'Step 5. DCE: only if you have a PZ 3',
    learn: 'routine',
    teach: (
      <>
        <p>Focal early enhancement that matches the T2/DWI abnormality = "positive" and pushes PZ 3 → 4. Diffuse enhancement or enhancement matching a BPH nodule = negative.</p>
        <p>In v2.1 DCE has one job only: upgrading a PZ score 3 to 4. It never changes a TZ score.</p>
      </>
    ),
    fields: dceFields,
    derive: (v) => {
      if (!contrastGiven(v)) return str(v, 'contrast') === 'no' ? [{ label: 'DCE', value: 'Not performed (no contrast)' }] : []
      const out: Derived[] = []
      for (const n of LESIONS) {
        if (!hasLesion(n)(v) || str(v, key(n, 'dce')) !== 'pos') continue
        if (zoneOf(v, n) === 'pz' && str(v, key(n, 'dwi')) === '3') out.push({ label: `Lesion ${n}`, value: 'PZ 3 → 4 (DCE positive)', tone: 'warn' })
        if (zoneOf(v, n) === 'tz') out.push({ label: `Lesion ${n}`, value: 'TZ: DCE never changes the score' })
      }
      return out
    },
  },
  {
    id: 'score',
    title: 'Step 6. Score each lesion',
    learn: 'scoring',
    teach: (
      <>
        <p>PZ: 4 is focal, markedly dark ADC and markedly bright high-b, <strong>&lt; 1.5 cm</strong>; 5 is the same but <strong>≥ 1.5 cm</strong>, or definite extraprostatic extension. TZ 4 and 5 split on the same 1.5 cm line.</p>
        <p>Housekeeping: name the <strong>index lesion</strong> (highest score; if tied, the one with EPE, then the largest), measure each on the sequence that drives its score (ADC for PZ, T2 for TZ), and give the largest dimension.</p>
        <p>PI-RADS 3 lesions harbor significant cancer in roughly 1 in 6, PI-RADS 4 in about half or more, PI-RADS 5 in the large majority (<Cite doi="10.1038/s41391-021-00417-1">Oerther et al., Prostate Cancer Prostatic Dis 2022;25:256</Cite>). Lesions scored 4 or 5 go to targeted biopsy; PI-RADS 3 remains equivocal and gets further risk stratification, with PSA density cutoffs of 0.15–0.20 ng/mL/cc helping refine the biopsy decision.</p>
      </>
    ),
    fields: lesionFields,
    derive: (v) => {
      const out: Derived[] = lesionResults(v).map((r) => ({
        label: `Lesion ${r.n}`,
        value: `PI-RADS ${r.category}`,
        tone: r.category <= 2 ? 'good' : r.category === 3 ? 'neutral' : 'warn',
      }))
      const index = indexLesion(v)
      if (index && lesionResults(v).length > 1) out.push({ label: 'Index lesion', value: `Lesion ${index.n}` })
      const overall = overallCategory(v)
      if (overall !== undefined) out.push({ label: 'Overall', value: `PI-RADS ${overall}`, tone: overall <= 2 ? 'good' : overall === 3 ? 'neutral' : 'warn' })
      return out
    },
  },
  {
    id: 'staging',
    title: 'Step 7. Stage any lesion ≥ PI-RADS 4',
    learn: 'staging',
    teach: (
      <>
        <p>You stage on T2 (<Cite doi="10.1148/radiol.2018181278">Mehralivand et al., Radiology 2019;290:709</Cite>). Grade 1: tumor touching the capsule for ≥ 1.5 cm, <em>or</em> capsular bulge/irregularity. Grade 2: both of those. Grade 3: tumor clearly outside the gland, or invading the seminal vesicle / neurovascular bundle.</p>
        <p>If your group uses "low/intermediate/high suspicion for EPE" instead, that's acceptable, but state your criteria.</p>
        <p>Seminal vesicle invasion = dark tumor signal filling the lumen, wall thickening, or a dark tumor tracking up from the base along the ejaculatory ducts. Look at the coronal. Also comment on bladder neck, rectum (rarely), neurovascular bundle asymmetry, and the distance from the tumor to the apex.</p>
      </>
    ),
    fields: stagingFields,
    derive: (v) => {
      if (!stagingNeeded(v)) return lesionResults(v).length > 0 ? [{ label: 'Staging', value: 'Not needed: no lesion ≥ PI-RADS 4' }] : []
      if (str(v, 'epeMethod') !== 'grade') return []
      const grade = epeGrade(v)
      if (grade === undefined) return []
      return [{ label: 'EPE grade', value: grade === 0 ? 'No grade 1-3 criterion met' : `Grade ${grade}`, tone: grade === 0 ? 'good' : 'warn' }]
    },
  },
  {
    id: 'pelvis',
    title: 'Step 8. The rest of the pelvis',
    learn: 'routine',
    teach: (
      <>
        <p>Pelvic nodes (obturator, internal/external iliac, presacral), bones in the field of view, bladder, rectum, incidental findings.</p>
        <p>Granulomatous prostatitis (classically after BCG) may even mimic EPE and lymphadenopathy. Midline cysts (utricle, Müllerian duct cyst) are bright T2, no restriction, no enhancement: describe and move on.</p>
      </>
    ),
    fields: pelvisFields,
  },
]

/* ---------- Report ---------- */

function sentence(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return ''
  const text2 = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  return /[.!?]$/.test(text2) ? text2 : `${text2}.`
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function clinicalLine(v: Values) {
  const parts: string[] = []
  const psa = num(v, 'psa')
  if (psa !== undefined) parts.push(`PSA ${psa} ng/mL${str(v, 'psaDate') ? ` (${str(v, 'psaDate')})` : ''}`)
  if (str(v, 'priorPsa')) parts.push(`prior PSAs ${str(v, 'priorPsa')}`)
  const biopsy = str(v, 'biopsy')
  if (biopsy) {
    const weeks = num(v, 'biopsyWeeks')
    const detail = str(v, 'biopsyDetail')
    parts.push(`${label(biopsyOptions, biopsy).toLowerCase()}${weeks !== undefined && biopsy !== 'none' ? `, ${weeks} weeks ago` : ''}${detail && biopsy !== 'none' ? ` (${detail})` : ''}`)
  }
  const treatment = list(v, 'treatment')
  if (treatment.length) parts.push(`prior treatment: ${listLabels(treatmentOptions, treatment)}`)
  if (str(v, 'indication')) parts.push(`indication: ${label(indicationOptions, str(v, 'indication')).toLowerCase()}`)
  return parts.length ? `Clinical: ${capitalize(parts.join('; '))}.` : ''
}

function techniqueLine(v: Values) {
  const parts: string[] = []
  if (str(v, 'fieldStrength')) parts.push(label(fieldStrengthOptions, str(v, 'fieldStrength')))
  if (str(v, 'coil')) parts.push(str(v, 'coil'))
  const seqs = list(v, 'sequences')
  if (seqs.length) parts.push(`sequences: ${listLabels(sequenceOptions, seqs)}`)
  if (str(v, 'contrast')) parts.push(str(v, 'contrast') === 'yes' ? 'contrast given' : 'no contrast given')
  return parts.length ? `Technique: ${capitalize(parts.join('; '))}.` : ''
}

function qualityLine(v: Values) {
  const quality = str(v, 'quality')
  if (!quality) return ''
  if (quality === 'adequate') return 'Quality: Adequate.'
  const reasons = list(v, 'limitations').map((r) => (r === 'gas' ? 'rectal gas (DWI distortion limits the peripheral zone read)' : label(limitationOptions, r).toLowerCase()))
  if (str(v, 'limitationOther')) reasons.push(str(v, 'limitationOther'))
  return `Quality: Limited${reasons.length ? ` by ${reasons.join(', ')}` : ''}.`
}

function prostateLine(v: Values) {
  const parts: string[] = []
  const vol = volume(v)
  if (vol !== undefined) parts.push(`volume ${num(v, 'length')} x ${num(v, 'width')} x ${num(v, 'height')} cm (${round(vol, 1)} mL)`)
  const density = psaDensity(v)
  if (density !== undefined) parts.push(`PSA density ${round(density, 2)} ng/mL/cc`)
  const hem = str(v, 'hemorrhage')
  if (hem === 'absent') parts.push('no hemorrhage')
  if (hem === 'present') parts.push(`hemorrhage present${str(v, 'hemorrhageSite') ? ` (${str(v, 'hemorrhageSite')})` : ''}`)
  return parts.length ? `Prostate: ${parts.map(capitalize).join('. ')}.` : ''
}

function lesionLine(v: Values, n: number, indexN: number | undefined, many: boolean) {
  const zone = zoneOf(v, n)
  const location = lesionLocation(v, n)
  const size = num(v, key(n, 'size'))
  const t2 = zone === 'tz' ? str(v, key(n, 't2')) : str(v, key(n, 't2p'))
  const dwi = str(v, key(n, 'dwi'))
  const dce = contrastGiven(v) ? str(v, key(n, 'dce')) : ''
  const result = lesionResult(v, n)
  const images = str(v, key(n, 'images'))
  const scores = [t2 && `T2 score ${t2}`, dwi && `DWI score ${dwi}`, dce && `DCE ${dce === 'pos' ? 'positive' : 'negative'}`].filter(Boolean).join(', ')
  const parts = [
    location && capitalize(location),
    size !== undefined && `${size} mm on ${zone === 'tz' ? 'T2' : zone === 'pz' ? 'ADC' : 'the driving sequence'}`,
    scores,
    str(v, key(n, 'epe')) === 'yes' && 'definite extraprostatic extension',
    result && `PI-RADS ${result.category}`,
    images && `Images: ${images}`,
  ].filter((p): p is string => Boolean(p))
  const tag = many && indexN === n ? ' (index)' : ''
  return `Lesion ${n}${tag}: ${parts.map(sentence).join(' ') || 'details not entered.'}`
}

function stagingLines(v: Values) {
  if (!stagingNeeded(v)) return ''
  const out: string[] = []
  const contact = num(v, 'contact')
  if (contact !== undefined) out.push(`Capsular contact length ${contact} mm.`)
  const method = str(v, 'epeMethod')
  if (method === 'grade') {
    const bulge = str(v, 'bulge')
    if (bulge) out.push(bulge === 'yes' ? 'Capsular bulge/irregularity present.' : 'No capsular bulge or irregularity.')
    const outside = str(v, 'outside')
    if (outside === 'yes') out.push('Tumor clearly outside the gland.')
    const grade = epeGrade(v)
    if (grade !== undefined) out.push(grade === 0 ? 'EPE: no grade 1-3 criterion met (Mehralivand).' : `EPE grade ${grade} (Mehralivand).`)
  }
  if (method === 'likert' && str(v, 'likert')) {
    out.push(`${capitalize(str(v, 'likert'))} suspicion for EPE${str(v, 'likertCriteria') ? ` (criteria: ${str(v, 'likertCriteria')})` : ''}.`)
  }
  const svi = str(v, 'svi')
  if (svi) out.push(svi === 'none' ? 'Seminal vesicles: no invasion.' : `Seminal vesicle invasion: ${label(sviOptions, svi).toLowerCase()}.`)
  const nvb = str(v, 'nvb')
  if (nvb) out.push(`Neurovascular bundles: ${label(nvbOptions, nvb).toLowerCase()}.`)
  const neck = str(v, 'bladderNeck')
  if (neck) out.push(`Bladder neck: ${label(involvedOptions, neck).toLowerCase()}.`)
  const rectum = str(v, 'rectum')
  if (rectum) out.push(`Rectum: ${label(involvedOptions, rectum).toLowerCase()}.`)
  const apex = num(v, 'apexDistance')
  if (apex !== undefined) out.push(`Tumor to apex distance ${apex} mm.`)
  return out.length ? `Staging: ${out.join(' ')}` : ''
}

function stagingSummary(v: Values) {
  if (!stagingNeeded(v)) return ''
  const parts: string[] = []
  if (str(v, 'epeMethod') === 'grade') {
    const grade = epeGrade(v)
    if (grade !== undefined) parts.push(grade === 0 ? 'no EPE grade 1-3 criterion met' : `EPE grade ${grade}`)
  }
  if (str(v, 'epeMethod') === 'likert' && str(v, 'likert')) parts.push(`${str(v, 'likert')} suspicion for EPE`)
  const svi = str(v, 'svi')
  if (svi) parts.push(svi === 'none' ? 'no seminal vesicle invasion' : `seminal vesicle invasion (${label(sviOptions, svi).toLowerCase()})`)
  if (str(v, 'nvb') === 'inv') parts.push('neurovascular bundle invasion')
  if (str(v, 'bladderNeck') === 'inv') parts.push('bladder neck involvement')
  if (str(v, 'rectum') === 'inv') parts.push('rectal involvement')
  return parts.length ? `Staging: ${parts.join('; ')}.` : ''
}

function nodesLine(v: Values) {
  const nodes = str(v, 'nodes')
  if (!nodes) return ''
  if (nodes === 'none') return 'Lymph nodes: No suspicious pelvic lymph nodes.'
  const parts = ['Suspicious pelvic lymph nodes']
  const stations = list(v, 'nodeStations')
  if (stations.length) parts[0] += ` (${listLabels(stationOptions, stations).toLowerCase()})`
  const sa = num(v, 'nodeShortAxis')
  if (sa !== undefined) parts.push(`largest short axis ${sa} mm`)
  if (str(v, 'nodeMorphology')) parts.push(str(v, 'nodeMorphology'))
  return `Lymph nodes: ${parts.join(', ')}.`
}

function bonesLine(v: Values) {
  const parts: string[] = []
  const bones = str(v, 'bones')
  if (bones === 'none') parts.push('No suspicious bone lesion.')
  if (bones === 'susp') parts.push(sentence(`Suspicious bone lesion${str(v, 'bonesDetail') ? `: ${str(v, 'bonesDetail')}` : ''}`))
  if (str(v, 'otherPelvic')) parts.push(sentence(str(v, 'otherPelvic')))
  return parts.length ? `Bones and other pelvic findings: ${parts.join(' ')}` : ''
}

function build(v: Values) {
  const warnings: string[] = []
  const count = lesionCount(v)
  const results = lesionResults(v)
  const index = indexLesion(v)
  const overall = overallCategory(v)
  const many = count > 1

  const lesionText = count > 0 ? ['Lesions:', ...LESIONS.filter((n) => n <= count).map((n) => lesionLine(v, n, index?.n, many))].join('\n') : str(v, 'lesionCount') === '0' ? 'Lesions: No focal lesion.' : ''

  const impression: string[] = []
  if (overall !== undefined) impression.push(`Overall PI-RADS ${overall}.`)
  if (index) {
    const size = num(v, key(index.n, 'size'))
    const location = lesionLocation(v, index.n)
    impression.push(`${many ? 'Index lesion' : 'Lesion'}${location ? `: ${location}` : ''}${size !== undefined ? `, ${size} mm` : ''}, PI-RADS ${index.category}.`)
  }
  const staging = stagingSummary(v)
  if (staging) impression.push(staging)
  if (overall !== undefined && overall >= 4) impression.push('MRI-targeted biopsy of the index lesion recommended.')
  if (overall === 3) {
    const density = psaDensity(v)
    impression.push(`Biopsy decision may be guided by PSA density${density !== undefined ? ` (${round(density, 2)} ng/mL/cc)` : ''} and clinical risk.`)
  }

  const text = lines(
    clinicalLine(v),
    techniqueLine(v),
    qualityLine(v),
    prostateLine(v),
    lesionText,
    stagingLines(v),
    nodesLine(v),
    bonesLine(v),
    impression.length > 0 && 'IMPRESSION:',
    ...impression.map((item, i) => `${i + 1}. ${item}`),
  ).replace(/\n(IMPRESSION:)/, '\n\n$1')

  if (count > 0 && overall === undefined) warnings.push('No overall PI-RADS number yet: enter zone, DWI and (TZ) T2 scores. Never leave the impression without one.')
  if (count > 0 && results.length < count) warnings.push(`${count - results.length} of ${count} lesions cannot be scored yet (zone, DWI, and T2 for a TZ lesion are needed).`)

  for (const r of results) {
    const zone = zoneOf(v, r.n)
    const driving = zone === 'tz' ? str(v, key(r.n, 't2')) : str(v, key(r.n, 'dwi'))
    const size = num(v, key(r.n, 'size'))
    const epe = str(v, key(r.n, 'epe'))
    if (epe === 'yes' && r.category < 5) warnings.push(`Lesion ${r.n} is marked with definite EPE but scores PI-RADS ${r.category}: EPE makes a 4 into a 5, so check the ${zone === 'tz' ? 'T2' : 'DWI'} score.`)
    if (driving === '5' && size !== undefined && size < 15 && epe === 'no') warnings.push(`Lesion ${r.n}: ${zone === 'tz' ? 'T2' : 'DWI'} score 5 needs ≥ 1.5 cm or definite EPE, but it is ${size} mm without EPE.`)
  }

  const weeks = num(v, 'biopsyWeeks')
  if (weeks !== undefined && weeks < 6 && ['neg', 'pos'].includes(str(v, 'biopsy'))) warnings.push(`Biopsy ${weeks} weeks ago: the ideal gap is ≥6 weeks; blood in the gland confuses the read.`)

  const indication = str(v, 'indication')
  if (indication === 'detect' && ['neg', 'pos'].includes(str(v, 'biopsy'))) warnings.push('Indication is detection (never biopsied), but the biopsy history records a prior biopsy.')
  if (indication === 'negbx' && str(v, 'biopsy') !== 'neg' && str(v, 'biopsy') !== '') warnings.push('Indication is prior negative biopsy, but the biopsy history does not record one.')

  if (str(v, 'hemorrhage') === 'present' && str(v, 'biopsy') === 'none') warnings.push('Hemorrhage present but biopsy history says never biopsied: check the history.')

  if (list(v, 'treatment').includes('bcg')) warnings.push('BCG history: granulomatous prostatitis can be indistinguishable from cancer on mpMRI and may mimic EPE and lymphadenopathy; hedge.')

  if (str(v, 'contrast') === 'no' && list(v, 'sequences').includes('dce')) warnings.push('DCE listed as a sequence but contrast marked not given.')
  if (str(v, 'contrast') === 'yes' && list(v, 'sequences').length > 0 && !list(v, 'sequences').includes('dce')) warnings.push('Contrast given but DCE not listed among the sequences.')

  if (stagingNeeded(v) && str(v, 'epeMethod') === 'grade') {
    const lesionEpe = LESIONS.some((n) => hasLesion(n)(v) && str(v, key(n, 'epe')) === 'yes')
    if (lesionEpe && str(v, 'outside') === 'no') warnings.push('A lesion is marked with definite EPE, but staging says tumor is not clearly outside the gland.')
    if (!lesionEpe && str(v, 'outside') === 'yes') warnings.push('Staging says tumor is clearly outside the gland, but no lesion is marked with definite EPE (which makes it PI-RADS 5).')
  }

  if (overall !== undefined && overall <= 2) {
    const free = ['otherPelvic', 'bonesDetail', 'nodeMorphology', 'hemorrhageSite'].map((id) => str(v, id)).join(' ')
    if (/cannot exclude/i.test(free)) warnings.push('Don\'t write "cannot exclude carcinoma" on a PI-RADS 2: the number replaces that phrase.')
  }

  return { text, warnings }
}

/* ---------- Quiz ---------- */

const quiz: StudyDefinition['quiz'] = [
  {
    id: 'driving-sequence',
    question: 'Which sequence drives the PI-RADS score of a peripheral zone lesion?',
    options: ['T2', 'DCE', 'DWI/ADC', 'T1'],
    answer: 2,
    explanation: <p>The rule that runs everything: PZ is scored by DWI; TZ is scored by T2. The other sequence only nudges (<Cite doi="10.1016/j.eururo.2019.02.033">Turkbey et al., Eur Urol 2019;76:340</Cite>).</p>,
  },
  {
    id: 'dce-role',
    question: 'In PI-RADS v2.1, what does a positive DCE do?',
    options: ['Upgrades a TZ score 3 to 4', 'Upgrades a PZ score 3 to 4', 'Upgrades any score by one category', 'Downgrades diffuse enhancement to PI-RADS 2'],
    answer: 1,
    explanation: <p>DCE has one job only: upgrading a PZ score 3 to 4. It never changes a TZ score. Positive means focal early enhancement matching the T2/DWI abnormality.</p>,
  },
  {
    id: 'size-cutoff',
    question: 'A focal PZ lesion is markedly dark on ADC and markedly bright on high-b, with no EPE. What separates PI-RADS 4 from 5?',
    options: ['Size of 1.0 cm', 'Positive DCE', 'ADC value below 750', 'Size of 1.5 cm'],
    answer: 3,
    explanation: <p>PI-RADS 4 is &lt; 1.5 cm; 5 is the same appearance ≥ 1.5 cm, or definite extraprostatic extension.</p>,
  },
  {
    id: 'central-zone',
    question: 'Dark T2 and dark ADC tissue at the base, symmetric, wedge-shaped and hugging the ejaculatory ducts is most likely:',
    options: ['Central zone', 'Seminal vesicle invasion', 'Transition zone cancer', 'Post-biopsy hemorrhage'],
    answer: 0,
    explanation: <p>The central zone is a famous mimic: dark on T2 and ADC at the base, but symmetric and wedge-shaped around the ejaculatory ducts. Asymmetry or a bulge is the clue to real cancer (<Cite doi="10.1148/rg.2016150030">Kitzing et al., RadioGraphics 2016;36:162</Cite>).</p>,
  },
  {
    id: 'epe-grade',
    question: 'Tumor touches the capsule for 1.8 cm and the capsule bulges, but nothing is clearly outside the gland. Mehralivand EPE grade?',
    options: ['Grade 1', 'Grade 2', 'Grade 3', 'Cannot be graded without DCE'],
    answer: 1,
    explanation: <p>Grade 1 is contact ≥ 1.5 cm <em>or</em> bulge/irregularity; grade 2 is both; grade 3 is tumor clearly outside the gland or invading the seminal vesicle or neurovascular bundle (<Cite doi="10.1148/radiol.2018181278">Mehralivand et al., Radiology 2019;290:709</Cite>).</p>,
  },
  {
    id: 'hemorrhage-sign',
    question: 'Weeks after biopsy, T1 shows bright blood through the PZ with a dark rounded hole in it. What does the hemorrhage exclusion sign suggest?',
    options: ['Resolving hematoma', 'Prostatitis', 'Cancer, because tumor does not bleed the way normal gland does', 'Calcification'],
    answer: 2,
    explanation: <p>Cancer often shows as a dark T1 "hole" inside a background of bright blood, because tumor doesn't bleed the way normal gland does (<Cite doi="10.1148/radiol.12112100">Barrett et al., Radiology 2012;263:751</Cite>). The ideal biopsy-to-MRI gap is ≥6 weeks.</p>,
  },
  {
    id: 'index-lesion',
    question: 'Two lesions are both PI-RADS 5. Lesion A is 12 mm with definite EPE; lesion B is 18 mm without. Which is the index lesion?',
    options: ['Lesion B, because it is larger', 'Lesion A, because a tie goes to the one with EPE first', 'Whichever is in the PZ', 'Neither: both are reported as index lesions'],
    answer: 1,
    explanation: <p>The index lesion is the highest score; if tied, the one with EPE, then the largest.</p>,
  },
  {
    id: 'bcg',
    question: 'The requisition mentions intravesical BCG for bladder cancer. Why does it matter?',
    options: ['Granulomatous prostatitis can be indistinguishable from cancer and may mimic EPE and nodes', 'BCG lowers PSA by about 50%', 'BCG makes DCE uninterpretable', 'It has no effect on the read'],
    answer: 0,
    explanation: <p>Granulomatous prostatitis, classically after BCG, is the dangerous prostatitis: it can be indistinguishable from cancer on mpMRI and may even mimic EPE and lymphadenopathy. A history of BCG should make you hedge (<Cite doi="10.1148/rg.2016150030">Kitzing et al., RadioGraphics 2016;36:162</Cite>). It is finasteride that lowers PSA by ~50%.</p>,
  },
]

const study: StudyDefinition = {
  slug: 'prostate-mri',
  name: 'Prostate MRI and PI-RADS v2.1',
  lede: 'The framework: anatomy in plain words, what each sequence answers, a reading routine, the scoring rules, EPE grading, the mimics, and the report.',
  sourceNote: 'PI-RADS v2.1 (Turkbey et al., Eur Urol 2019) is the reporting standard. The PI-RADS Pathway 2026 shifts emphasis toward PSA density and risk-based decisions.',
  references,
  referencesNote: "For teaching files with images: Radiopaedia's PI-RADS article and case collection, and the ACR's PI-RADS v2.1 document itself, which has an annotated example for every score.",
  report: { steps, build },
  learn,
  quiz,
}

export function ProstateMriStudyPage() {
  return <StudyPage study={study} />
}
