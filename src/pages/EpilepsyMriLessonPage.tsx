import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Von Oertzen J et al. Standard magnetic resonance imaging is inadequate for patients with refractory focal epilepsy. J Neurol Neurosurg Psychiatry 2002. The paper that shows how bad routine reads are; the discussion lists the specific lesions missed (mostly HS and FCD).' },
  { citation: 'Blümcke I et al. Histopathological findings in brain tissue obtained during epilepsy surgery. NEJM 2017. The frequency table.' },
  { citation: 'Bernasconi A et al. Recommendations for the use of structural MRI in the care of patients with epilepsy: HARNESS-MRI. Epilepsia 2019. Free PDF on ilae.org; figures 1–3 show the standard sequences and reformats.' },
  { citation: 'Colombo N et al. Focal cortical dysplasias: MR imaging, histopathologic, and clinical correlations. AJNR 2003. The best MRI-pathology picture atlas of FCD type II, including the transmantle sign.' },
  { citation: 'Barkovich AJ et al. Focal transmantle dysplasia. Ann Neurol 1997. Original description.' },
  { citation: 'Harvey AS et al. Bottom-of-sulcus dysplasia. Neurology 2015. How tiny these can be and how good the surgical outcome is.' },
  { citation: 'Saavalainen T et al. Temporal anteroinferior encephalocele: an underrecognized etiology of temporal lobe epilepsy? Neurology 2015.' },
  { citation: 'Wellmer J et al. Proposal for a magnetic resonance imaging protocol for the detection of epileptogenic lesions at early outpatient stages ("essential 6"). Epilepsia 2013.' },
  { citation: 'Cianfoni A et al. Seizure-induced brain lesions: a wide spectrum of variably reversible MRI abnormalities. Eur J Radiol 2013. Peri-ictal MRI changes, the main mimic.' },
  { citation: 'Bien CG et al. Pathogenesis, diagnosis and treatment of Rasmussen encephalitis: a European consensus statement. Brain 2005.' },
  { citation: 'Blümcke I et al. ILAE classification of hippocampal sclerosis, Epilepsia 2013; ILAE classification of FCD, Epilepsia 2011; Najm I et al. FCD classification update, Epilepsia 2022.' },
  { citation: 'Jackson GD et al. Hippocampal sclerosis can be reliably detected by MRI. Neurology 1990.' },
  { citation: 'Téllez-Zenteno JF et al. Surgical outcomes in lesional and non-lesional epilepsy: a systematic review and meta-analysis. Epilepsy Res 2010.' },
  { citation: 'Urbach H, ed. MRI in Epilepsy. Springer, 2013. If you want one book, this is it, case-based.' },
]

const reportTemplate = `Clinical: seizure type, lateralization on EEG if known, time since last seizure.
Technique: state whether the study meets the epilepsy protocol: "3D T1 1 mm isotropic,
  3D FLAIR 1 mm isotropic, coronal oblique high-resolution T2 perpendicular to the
  hippocampal axis, SWI, DWI. No contrast." If it does NOT (only a routine protocol),
  say so; this is one of the most useful things you can put in a report.

Findings, in fixed order:
1. Hippocampi: size (symmetric / right smaller / left smaller), T2-FLAIR signal
   (normal / increased R or L), internal architecture (preserved / lost), head
   digitations. Secondary signs: temporal horn asymmetry, fornix/mammillary body,
   temporal pole gray-white blurring, amygdala.
2. Neocortex: "No focal cortical thickening, gray-white blurring, transmantle sign,
   or abnormal gyral pattern identified on 3D T1 and FLAIR in all three planes."
   If positive: lobe, gyrus, sulcus, side, the specific features, and the relation
   to eloquent cortex (central sulcus, Broca's area).
3. Deep gray / periventricular: heterotopia, hypothalamus.
4. SWI: hemosiderin, calcification.
5. Diffusion: any restriction (peri-ictal vs tumor).
6. Other: scars, atrophy pattern, incidental findings.

Impression, one headline category:
  "Right hippocampal sclerosis (volume loss, increased FLAIR signal, loss of
   internal architecture). No second lesion."
  "Lesion suspicious for focal cortical dysplasia type II, bottom of the left
   superior frontal sulcus, with transmantle sign, 2 cm anterior to the precentral gyrus."
  "Probable long-term epilepsy-associated tumor (DNET vs ganglioglioma) in the
   right medial temporal lobe."
  "No epileptogenic lesion identified on a dedicated epilepsy protocol."
   (Only if the protocol was adequate. Otherwise: "No lesion identified; however,
   this study does not meet epilepsy-protocol standards; recommend dedicated
   3T epilepsy MRI.")
  If timing is a problem: "Cortical FLAIR/DWI signal likely peri-ictal; recommend
   repeat in 6–8 weeks."

Recommendations when appropriate: dedicated epilepsy protocol, post-processing,
  PET/SPECT correlation, or repeat after seizure control.`

export function EpilepsyMriLessonPage() {
  return (
    <LessonPage
      name="Epilepsy-protocol brain MRI"
      lede="Why it differs from a routine brain MRI, the HARNESS-MRI protocol, a fixed search pattern, the pathologies, the pitfalls, and the report."
      sourceNote="HARNESS-MRI details were checked against the ILAE source. Other citations were from memory at the time of writing; verify specific numbers before quoting them in a talk."
      references={references}
    >
      <section className="info-card lesson-body">
        <h3>Part 1. Why this is different from a routine brain MRI</h3>
        <p>The whole point of an epilepsy MRI is to find a <strong>small, subtle, surgically removable lesion</strong>. Two facts drive everything else:</p>
        <ol className="plain-list">
          <li><strong>Routine MRI misses these lesions.</strong> In the classic study by Von Oertzen et al. (J Neurol Neurosurg Psychiatry 2002), non-expert reports of standard brain MRI found a lesion in only 39% of surgical candidates; expert reading of a dedicated epilepsy protocol found one in 91%. Half the "non-lesional" patients actually had a lesion.</li>
          <li><strong>Finding the lesion changes the outcome.</strong> In the meta-analysis by Téllez-Zenteno et al. (Epilepsy Research 2010), patients with a lesion on MRI were roughly 2.5 times more likely to be seizure-free after surgery than those without.</li>
        </ol>
        <p>What you are looking for, by frequency, comes from the largest surgical pathology series ever published (Blümcke et al., NEJM 2017, 9,523 patients):</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Pathology</th><th>Adults</th><th>Children</th></tr></thead>
            <tbody>
              <tr><td>Hippocampal sclerosis (HS)</td><td>~45% (most common)</td><td>~15%</td></tr>
              <tr><td>Tumors (mostly ganglioglioma, DNET)</td><td>~20%</td><td>~20%</td></tr>
              <tr><td>Malformations of cortical development (mostly FCD)</td><td>~15%</td><td>~40% (most common)</td></tr>
              <tr><td>Glial scars / old injury</td><td>~7%</td><td>~5%</td></tr>
              <tr><td>Vascular (cavernoma etc.)</td><td>~6%</td><td>~3%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="lesson-key">
          <p>In an adult, think <strong>hippocampus first</strong>. In a child, think <strong>cortical dysplasia first</strong>.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 2. The protocol (so you know whether the study is adequate)</h3>
        <p>The standard is the ILAE <strong>HARNESS-MRI</strong> protocol (Bernasconi et al., Epilepsia 2019): isotropic, millimetric 3D T1 and FLAIR images, plus high-resolution 2D submillimetric T2 images. It can be obtained on 1.5T and 3T, applies to adults and children, and provides full brain coverage. The three core sequences:</p>
        <ol className="plain-list">
          <li><strong>3D T1 (MPRAGE or equivalent), 1 mm isotropic, no contrast</strong>: your gray/white matter anatomy sequence. This is where you see cortical thickness and gray-white blurring.</li>
          <li><strong>3D FLAIR, 1 mm isotropic</strong>: your "where is the signal wrong" sequence. FCD and hippocampal sclerosis are both bright here.</li>
          <li><strong>2D coronal T2, thin slices (≤2–3 mm), high resolution, angled perpendicular to the long axis of the hippocampus</strong>: your hippocampus sequence. The single most important sequence for mesial temporal sclerosis.</li>
        </ol>
        <p>Commonly added: <strong>SWI or T2* GRE</strong> (cavernomas, calcification, old blood), <strong>DWI</strong> (peri-ictal changes, tumors), and <strong>post-contrast T1 only if a lesion needs characterization</strong>. Contrast is not routine.</p>
        <p><strong>Practical points:</strong></p>
        <ul className="plain-list">
          <li>The 3D sequences let you reformat in any plane without losing resolution. Always reformat the 3D T1 and FLAIR into the <strong>coronal oblique plane</strong> (perpendicular to the hippocampus) yourself if the tech didn't.</li>
          <li>Always check that the coronal T2 is actually angled correctly. If the hippocampi look like tilted ovals instead of round "sea horses," the angulation is off and you can be fooled into calling asymmetry.</li>
          <li>The 2019 ILAE recommendations also endorse <strong>computer-aided post-processing</strong> (e.g., voxel-based morphometry, "MAP" analysis) to help find subtle FCD. If your center has it, use it.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 3. The step-by-step search pattern</h3>
        <p>The reason epilepsy MRIs get missed is that people "scan" the brain instead of walking a fixed checklist. Use this order every time. It goes from most common to least common.</p>

        <div className="lesson-step">
          <h4>Step 1. Clinical context first (30 seconds)</h4>
          <p>Read the history. The seizure type points you to a region:</p>
          <ul className="plain-list">
            <li><strong>Temporal lobe semiology</strong> (rising epigastric aura, déjà vu, automatisms, fear) → mesial temporal structures.</li>
            <li><strong>Gelastic (laughing) seizures</strong> → hypothalamus (hamartoma).</li>
            <li><strong>Frontal hypermotor / nocturnal</strong> → frontal lobe, especially bottom-of-sulcus dysplasia.</li>
            <li><strong>Childhood onset, drug-resistant, nothing obvious</strong> → look extra hard for FCD.</li>
            <li><strong>Progressive unilateral deficits in a child</strong> → Rasmussen encephalitis.</li>
          </ul>
          <p>If EEG lateralization is provided, use it. It is legitimate to look harder on the side EEG points to.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Hippocampi: the "big four" on coronal T2 and FLAIR</h4>
          <p>Compare left to right, slice by slice, from the amygdala back to the tail. Look for:</p>
          <ol className="plain-list">
            <li><strong>Smaller hippocampus</strong> (volume loss): the most reliable sign.</li>
            <li><strong>Brighter hippocampus on T2/FLAIR</strong>: the second most reliable sign. Judge it on FLAIR, where CSF is dark.</li>
            <li><strong>Loss of internal architecture</strong>: the normal hippocampus has a layered, "jelly-roll" look on high-res T2. In sclerosis it becomes a featureless blob.</li>
            <li><strong>Shape change</strong>: the hippocampal head loses its normal "digitations" (bumps) and looks smooth.</li>
          </ol>
          <p>Jackson et al. (Neurology 1990) showed that the combination of atrophy plus T2 signal increase is highly reliable for hippocampal sclerosis. Either sign alone is less specific.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Secondary signs of mesial temporal sclerosis</h4>
          <p>These help when the primary signs are borderline: enlarged temporal horn on the same side; atrophy of the ipsilateral fornix and mammillary body (look on the sagittal 3D T1); loss of gray-white distinction in the anterior temporal lobe / temporal pole; atrophy of the collateral white matter and entorhinal cortex; amygdala volume loss.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Temporal lobe beyond the hippocampus</h4>
          <ul className="plain-list">
            <li><strong>Amygdala</strong>: enlarged and mildly bright? Think low-grade tumor (ganglioglioma) or "amygdala enlargement" TLE.</li>
            <li><strong>Temporal pole</strong>: look at the anteroinferior surface for an <strong>encephalocele</strong> (brain herniating through a bony defect into the middle cranial fossa floor / greater wing of sphenoid). Use sagittal and coronal 3D T1 and thin CT if available.</li>
            <li><strong>Dual pathology</strong>: an HS plus a second lesion somewhere else. Roughly 10–15% of HS cases. Never stop looking after you find the hippocampus.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Whole-brain cortex: the FCD search</h4>
          <p>This is the part that separates a good epilepsy read from an average one. Go through the <strong>3D T1 and 3D FLAIR in all three planes</strong> and scroll slowly. You are looking for a <em>sulcus that looks wrong</em>. Ask, at every sulcus:</p>
          <ul className="plain-list">
            <li>Is the cortex <strong>thicker</strong> than its neighbors?</li>
            <li>Is the gray-white junction <strong>blurred</strong> (fuzzy instead of a crisp line)?</li>
            <li>Is there <strong>bright FLAIR signal in the subcortical white matter</strong>, especially a tapering line running from the cortex toward the ventricle (the <strong>"transmantle sign"</strong>, Barkovich et al., Ann Neurol 1997)?</li>
            <li>Does the <strong>depth of a sulcus</strong> look thick or bright? The sulcus bottom is where small FCDs hide (<strong>bottom-of-sulcus dysplasia</strong>, Harvey et al., Neurology 2015).</li>
            <li>Is the gyral pattern abnormal: too many small gyri (polymicrogyria), a cleft (schizencephaly), or a smooth surface (lissencephaly)?</li>
          </ul>
          <p>Practical tricks: use a <strong>narrow window</strong> on the 3D T1 so gray and white are strongly contrasted; curved or "surface" reformats of the 3D T1 are ideal if your workstation offers them; compare the same region on the other side. Symmetry is your friend, but bilateral disease exists (e.g., bilateral perisylvian polymicrogyria).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Deep gray and periventricular</h4>
          <ul className="plain-list">
            <li><strong>Periventricular nodular heterotopia</strong>: gray matter nodules lining the ventricles (same signal as cortex on every sequence, no enhancement). Easy to mistake for subependymal nodules of tuberous sclerosis (those calcify and are T2-dark/SWI-dark).</li>
            <li><strong>Subcortical / band heterotopia</strong> ("double cortex").</li>
            <li><strong>Hypothalamic hamartoma</strong>: a mass hanging from the tuber cinereum, gray-matter signal, no enhancement.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 7. SWI / GRE sweep</h4>
          <ul className="plain-list">
            <li><strong>Cavernoma</strong>: "popcorn" T2 lesion with a black hemosiderin rim; blooms on SWI. Multiple cavernomas = familial (CCM genes).</li>
            <li>Old <strong>hemorrhage, calcification</strong> (TSC tubers, Sturge-Weber gyriform calcification, old infection).</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Old injury and inflammatory patterns</h4>
          <ul className="plain-list">
            <li><strong>Encephalomalacia / gliosis</strong> from prior trauma, stroke, infection. These are "lesions" too.</li>
            <li><strong>Rasmussen encephalitis</strong>: progressive unilateral hemispheric atrophy with T2/FLAIR signal, often starting in the perisylvian region and caudate head (Bien et al., Brain 2005 consensus criteria).</li>
            <li><strong>Sturge-Weber</strong>: leptomeningeal enhancement, enlarged choroid plexus, cortical calcification, hemiatrophy.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 9. Pitfalls: things that will fool you</h4>
          <ul className="plain-list">
            <li><strong>Peri-ictal changes.</strong> A recent seizure can cause cortical T2/FLAIR swelling, restricted diffusion, and even hippocampal swelling with enhancement. It goes away in days to weeks (Cianfoni et al., Eur J Radiol 2013). If the MRI was done shortly after a seizure or status, say so, and recommend repeat imaging before calling a mass or HS.</li>
            <li><strong>Incomplete hippocampal inversion (hippocampal malrotation).</strong> A round, vertically oriented hippocampus with a deep collateral sulcus, usually on the left. A normal variant; do not call it sclerosis. Signal and internal architecture are normal.</li>
            <li><strong>Choroidal fissure cysts and hippocampal sulcal remnant cysts</strong>: CSF signal, no mass effect. Normal.</li>
            <li><strong>Asymmetric temporal horns from head tilt</strong>: check the angulation before calling volume loss.</li>
            <li><strong>Bright FLAIR in the hippocampus with normal size and preserved architecture</strong>: could be early or mild HS, could be peri-ictal, could be artifact. Describe it, don't overcall it.</li>
            <li><strong>Transmantle sign vs. a normal perivascular space</strong>: perivascular spaces follow vessels and are CSF-signal on all sequences (dark on FLAIR); the transmantle sign is bright on FLAIR.</li>
          </ul>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 4. The pathologies you must know</h3>
        <h4>Hippocampal sclerosis (mesial temporal sclerosis)</h4>
        <ul className="plain-list">
          <li><strong>MRI:</strong> small, bright (T2/FLAIR), lost internal structure. Plus the secondary signs above.</li>
          <li><strong>Pathology</strong> (Blümcke et al., ILAE classification, Epilepsia 2013): type 1 = CA1 and CA4 loss (classic, best surgical outcome); type 2 = CA1 only; type 3 = CA4 only. You cannot reliably tell these apart on MRI, but it's useful to know they exist.</li>
          <li><strong>Bilateral HS:</strong> about 10%. Check both sides against each other <em>and</em> against your mental picture of normal.</li>
        </ul>
        <h4>Focal cortical dysplasia (FCD)</h4>
        <p>Classification: ILAE 2011 (Blümcke et al., Epilepsia 2011), updated 2022 (Najm et al., Epilepsia 2022).</p>
        <ul className="plain-list">
          <li><strong>FCD type I</strong>: abnormal cortical layering only. <strong>Often MRI-invisible</strong> or shows only subtle white matter FLAIR brightness / lobar volume loss. Commonly temporal.</li>
          <li><strong>FCD type II</strong>: dysmorphic neurons (IIa), plus balloon cells (IIb). This is the one you can find: <strong>thick cortex, blurred gray-white junction, bright subcortical FLAIR, transmantle sign</strong> (IIb especially). Loves the frontal lobe and the bottom of a sulcus. Colombo et al. (AJNR 2003) correlated these MRI features with histology and showed the transmantle sign and cortical thickening are hallmarks of type IIb.</li>
          <li><strong>FCD type III</strong>: dysplasia next to another lesion (IIIa next to HS, IIIb next to a tumor, IIIc next to a vascular malformation, IIId next to a scar). The "dual pathology" idea formalized.</li>
          <li><strong>MOGHE</strong> (mild malformation of cortical development with oligodendroglial hyperplasia): added in 2022; usually frontal, children; shows subcortical FLAIR brightness that can look like FCD I.</li>
        </ul>
        <h4>Long-term epilepsy-associated tumors (LEATs)</h4>
        <p>Cortical, temporal, slow-growing, well-defined, little or no edema, little or no mass effect.</p>
        <ul className="plain-list">
          <li><strong>Ganglioglioma</strong>: often cystic with an enhancing nodule; calcification in ~30–40%; temporal lobe favorite.</li>
          <li><strong>DNET</strong> (dysembryoplastic neuroepithelial tumor): "bubbly" multicystic cortical lesion, very bright T2, dark or ring-like on FLAIR ("bright rim"), no or minimal enhancement, may scallop the inner table. Described by Daumas-Duport et al. (Neurosurgery 1988).</li>
          <li><strong>Pleomorphic xanthoastrocytoma</strong>: superficial, cystic with enhancing nodule touching the meninges (sometimes a "dural tail").</li>
          <li><strong>Low-grade glioma, angiocentric glioma</strong>: less common.</li>
        </ul>
        <h4>Other malformations of cortical development</h4>
        <ul className="plain-list">
          <li><strong>Polymicrogyria</strong>: thick, bumpy cortex with too many tiny gyri; often perisylvian; can be bilateral.</li>
          <li><strong>Schizencephaly</strong>: gray-matter-lined cleft from the ventricle to the surface (open-lip vs closed-lip).</li>
          <li><strong>Heterotopia</strong>: periventricular nodular, subcortical, or band.</li>
          <li><strong>Hemimegalencephaly</strong>: one enlarged, dysplastic hemisphere.</li>
          <li><strong>Tuberous sclerosis</strong>: cortical tubers (thick, bright FLAIR, wedge-shaped), subependymal nodules (calcified), radial white matter lines, SEGA near the foramen of Monro.</li>
        </ul>
        <h4>Vascular</h4>
        <ul className="plain-list">
          <li><strong>Cavernoma</strong>: see step 7. Most common vascular cause of epilepsy.</li>
          <li><strong>AVM</strong>: flow voids; less common as a pure epilepsy presentation.</li>
          <li><strong>Sturge-Weber</strong>: see step 8.</li>
        </ul>
        <h4>Temporal encephalocele</h4>
        <p>Brain herniation through the floor of the middle cranial fossa, often anteroinferior temporal. Under-recognized because you have to look for it. Saavalainen et al. (Neurology 2015) found it in about 2% of a surgical TLE cohort and showed patients did well when it was resected.</p>
        <h4>Hypothalamic hamartoma</h4>
        <p>Gelastic seizures, early puberty in children. Non-enhancing gray-matter-signal mass at the tuber cinereum.</p>
        <h4>Rasmussen encephalitis</h4>
        <p>Child, progressive hemiparesis, epilepsia partialis continua. Unilateral cortical/subcortical FLAIR signal that evolves into hemispheric atrophy over months.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 5. The report</h3>
        <p>A structured report is strongly encouraged in the ILAE recommendations. The clinicians want a yes/no on each key structure, not prose.</p>
        <CopyBlock label="Report template" text={reportTemplate} />
      </section>
    </LessonPage>
  )
}
