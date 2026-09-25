import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

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

export function ProstateMriLessonPage() {
  return (
    <LessonPage
      name="Prostate MRI and PI-RADS v2.1"
      lede="The framework: anatomy in plain words, what each sequence answers, a reading routine, the scoring rules, EPE grading, the mimics, and the report."
      sourceNote="PI-RADS v2.1 (Turkbey et al., Eur Urol 2019) is the reporting standard. The PI-RADS Pathway 2026 shifts emphasis toward PSA density and risk-based decisions."
      references={references}
      referencesNote="For teaching files with images: Radiopaedia's PI-RADS article and case collection, and the ACR's PI-RADS v2.1 document itself, which has an annotated example for every score."
    >
      <section className="info-card lesson-body">
        <h3>1. What the study is for</h3>
        <p>Prostate MRI has one main job: find <em>clinically significant</em> cancer (Gleason ≥3+4, Grade Group ≥2) so the urologist can target a biopsy at it, and avoid biopsying men who don't need it. Two trials made it standard of care:</p>
        <ul className="plain-list">
          <li><strong>PROMIS</strong> (<Cite doi="10.1016/S0140-6736(16)32401-1">Ahmed et al., Lancet 2017;389:815</Cite>): MRI was more sensitive than systematic biopsy and could safely let about a quarter of men skip biopsy.</li>
          <li><strong>PRECISION</strong> (<Cite doi="10.1056/NEJMoa1801993">Kasivisvanathan et al., NEJM 2018;378:1767</Cite>): MRI-first with targeted biopsy found more significant cancer and less insignificant cancer than standard 12-core biopsy.</li>
        </ul>
        <p>The scoring system is PI-RADS. Version 2.1 is the current international standard for acquisition and interpretation (<Cite doi="10.1016/j.eururo.2019.02.033">Turkbey et al., Eur Urol 2019;76:340</Cite>). The forthcoming PI-RADS Pathway 2026 moves toward risk-based pathways that integrate MRI findings with PSA density and clinical parameters, so v2.1 is what you report with today, but expect PSA density to matter more and more.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>2. Before you look at a single image</h3>
        <p>Get these from the requisition or chart, because they change your read:</p>
        <ul className="plain-list">
          <li><strong>PSA</strong> and prior PSAs.</li>
          <li><strong>Prostate volume → PSA density</strong> (PSA ÷ volume). You'll measure volume yourself (step 2 below). Density above roughly 0.15 ng/mL/cc makes an equivocal lesion more worrying.</li>
          <li><strong>Prior biopsy?</strong> When? Blood in the gland lasts weeks to months and confuses everything. Ideal gap is ≥6 weeks.</li>
          <li><strong>Prior treatment?</strong> Radiation, prostatectomy, focal therapy, hormones, 5-alpha reductase inhibitors (finasteride shrinks the gland and lowers PSA by ~50%).</li>
          <li><strong>Why the scan?</strong> Never biopsied (detection), prior negative biopsy, active surveillance follow-up, or staging a known cancer. Same images, different questions.</li>
        </ul>
        <p>Then judge <strong>image quality</strong> before you score anything. The PI-QUAL score (<Cite doi="10.1016/j.euo.2020.06.007">Giganti et al., Eur Urol Oncol 2020;3:615</Cite>; PI-QUAL v2 2024) exists for this. Practical version: is T2 sharp, is DWI free of rectal-gas distortion, does the high-b image actually show the gland? If DWI is wrecked by gas, say so in the report; it limits the peripheral zone read.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>3. Anatomy, in plain words</h3>
        <p>Think of the prostate as an upside-down cone. <strong>Base</strong> at the top (touches bladder), <strong>mid-gland</strong>, <strong>apex</strong> at the bottom (near the sphincter). Divide each level into right/left and anterior/posterior. That's how you'll localize lesions.</p>
        <p>Zones (the part that trips everyone up):</p>
        <ul className="plain-list">
          <li><strong>Peripheral zone (PZ)</strong>: the outer "horseshoe" at the back and sides. Bright on T2 (glandular, watery). ~70% of cancers live here.</li>
          <li><strong>Transition zone (TZ)</strong>: the inner gland around the urethra. This is where BPH happens. On T2 it looks like a heterogeneous mix of bright and dark nodules, "organized chaos." ~25–30% of cancers.</li>
          <li><strong>Central zone (CZ)</strong>: a wedge at the base surrounding the ejaculatory ducts. Dark on T2, dark on ADC, and <em>symmetric</em>. Famous mimic.</li>
          <li><strong>Anterior fibromuscular stroma (AFMS)</strong>: a dark band across the front, no glands, no cancer origin, but tumors can grow into it.</li>
        </ul>
        <p>Around the gland: the <strong>"capsule"</strong> (really a fibromuscular rim), the <strong>neurovascular bundles</strong> at about 5 and 7 o'clock posterolaterally, the <strong>seminal vesicles</strong> above/behind the base, and the rectum behind.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>4. The sequences and what each one answers</h3>
        <ul className="plain-list">
          <li><strong>T2 axial (plus sagittal/coronal)</strong>: anatomy, zonal boundaries, capsule, seminal vesicles. The <em>main</em> sequence for the TZ.</li>
          <li><strong>DWI with ADC map</strong>: cancer is cellular, so water can't move: bright on high b-value (≥1400 s/mm²), dark on ADC. The <em>main</em> sequence for the PZ.</li>
          <li><strong>DCE (dynamic contrast)</strong>: cancer enhances early. In v2.1 it has one job only: upgrading a PZ score 3 to 4. It never changes a TZ score.</li>
          <li><strong>T1 axial</strong>: one job: find blood (bright).</li>
        </ul>
        <p>A note on trends: "biparametric" MRI (T2 + DWI, no contrast) is increasingly accepted for detection in untreated men; the PRIME trial (<Cite doi="10.1001/jama.2025.13722">JAMA 2025</Cite>) supported non-inferiority. Your local protocol decides; the reading logic below is the same.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>5. The step-by-step reading routine</h3>
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
      </section>

      <section className="info-card lesson-body">
        <h3>6. PI-RADS v2.1 scoring, simplified</h3>
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
          <li><strong>2</strong>: mostly encapsulated nodule, or a homogeneous circumscribed nodule without a full capsule ("atypical nodule"), or mild homogeneous dark area between nodules. → If DWI is a 5, becomes <strong>3</strong>.</li>
          <li><strong>3</strong>: heterogeneous signal with blurred margins; includes other things that don't qualify as 2, 4, or 5. → If DWI is a 5, becomes <strong>4</strong>.</li>
          <li><strong>4</strong>: lens-shaped or ill-defined, homogeneously moderately dark ("erased charcoal"), <strong>&lt; 1.5 cm</strong>.</li>
          <li><strong>5</strong>: same but <strong>≥ 1.5 cm</strong>, or definite EPE.</li>
        </ul>
        <p>What the numbers mean for the urologist (pooled meta-analysis figures, approximate): PI-RADS 3 lesions harbor significant cancer in roughly 1 in 6, PI-RADS 4 in about half or more, PI-RADS 5 in the large majority (<Cite doi="10.1038/s41391-021-00417-1">Oerther et al., Prostate Cancer Prostatic Dis 2022;25:256</Cite>). Lesions scored 4 or 5 go to targeted biopsy; PI-RADS 3 remains equivocal and gets further risk stratification, with PSA density cutoffs of 0.15–0.20 ng/mL/cc helping refine the biopsy decision.</p>
        <p><strong>Housekeeping rules:</strong> report up to <strong>4</strong> lesions, name the <strong>index lesion</strong> (highest score; if tied, the one with EPE, then the largest), measure each on the sequence that drives its score (ADC for PZ, T2 for TZ), and give the largest dimension.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>7. Local staging: EPE and seminal vesicle invasion</h3>
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
      </section>

      <section className="info-card lesson-body">
        <h3>8. The pathologies and mimics you must know</h3>
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
      </section>

      <section className="info-card lesson-body">
        <h3>9. What the report should include</h3>
        <p>PI-RADS v2.1 recommends a structured report. A template you can adapt:</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Two style points: never leave the impression without an overall PI-RADS number, and don't write "cannot exclude carcinoma" on a PI-RADS 2. The whole point of the system is to replace that phrase with a number.</p>
        </div>
      </section>
    </LessonPage>
  )
}
