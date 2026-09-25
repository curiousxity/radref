import { CopyBlock } from '../components/CopyBlock'
import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, str } from '../study/types'
import type { Derived, LearnSection, Option, QuizQuestion, StudyDefinition, Values } from '../study/types'

const references: LessonReference[] = [
  { citation: 'Von Oertzen J et al. Standard magnetic resonance imaging is inadequate for patients with refractory focal epilepsy. J Neurol Neurosurg Psychiatry 2002. The paper that shows how bad routine reads are; the discussion lists the specific lesions missed (mostly HS and FCD).', doi: '10.1136/jnnp.73.6.643' },
  { citation: 'Blümcke I et al. Histopathological findings in brain tissue obtained during epilepsy surgery. NEJM 2017. The frequency table.', doi: '10.1056/NEJMoa1703784' },
  { citation: 'Bernasconi A et al. Recommendations for the use of structural magnetic resonance imaging in the care of patients with epilepsy: a consensus report from the ILAE Neuroimaging Task Force (HARNESS-MRI). Epilepsia 2019. Free PDF on ilae.org; figures 1–3 show the standard sequences and reformats.', doi: '10.1111/epi.15612' },
  { citation: 'Colombo N et al. Focal cortical dysplasias: MR imaging, histopathologic, and clinical correlations in surgically treated patients with epilepsy. AJNR 2003. The best MRI-pathology picture atlas of FCD type II, including the transmantle sign.' },
  { citation: 'Barkovich AJ et al. Focal transmantle dysplasia: a specific malformation of cortical development. Neurology 1997. Original description.', doi: '10.1212/wnl.49.4.1148' },
  { citation: 'Harvey AS et al. The surgically remediable syndrome of epilepsy associated with bottom-of-sulcus dysplasia. Neurology 2015. How tiny these can be and how good the surgical outcome is.', doi: '10.1212/WNL.0000000000001591' },
  { citation: 'Saavalainen T et al. Temporal anteroinferior encephalocele: an underrecognized etiology of temporal lobe epilepsy? Neurology 2015.', doi: '10.1212/WNL.0000000000002062' },
  { citation: 'Wellmer J et al. Proposal for a magnetic resonance imaging protocol for the detection of epileptogenic lesions at early outpatient stages ("essential 6"). Epilepsia 2013.', doi: '10.1111/epi.12375' },
  { citation: 'Cianfoni A et al. Seizure-induced brain lesions: a wide spectrum of variably reversible MRI abnormalities. Eur J Radiol 2013. Peri-ictal MRI changes, the main mimic.', doi: '10.1016/j.ejrad.2013.05.020' },
  { citation: 'Bien CG et al. Pathogenesis, diagnosis and treatment of Rasmussen encephalitis: a European consensus statement. Brain 2005.', doi: '10.1093/brain/awh415' },
  { citation: 'Blümcke I et al. International consensus classification of hippocampal sclerosis in temporal lobe epilepsy: a Task Force report from the ILAE Commission on Diagnostic Methods. Epilepsia 2013.', doi: '10.1111/epi.12220' },
  { citation: 'Blümcke I et al. The clinicopathologic spectrum of focal cortical dysplasias: a consensus classification proposed by an ad hoc Task Force of the ILAE Diagnostic Methods Commission. Epilepsia 2011.', doi: '10.1111/j.1528-1167.2010.02777.x' },
  { citation: 'Najm I et al. The ILAE consensus classification of focal cortical dysplasia: an update proposed by an ad hoc task force of the ILAE diagnostic methods commission. Epilepsia 2022.', doi: '10.1111/epi.17301' },
  { citation: 'Jackson GD et al. Hippocampal sclerosis can be reliably detected by magnetic resonance imaging. Neurology 1990.', doi: '10.1212/wnl.40.12.1869' },
  { citation: 'Téllez-Zenteno JF et al. Surgical outcomes in lesional and non-lesional epilepsy: a systematic review and meta-analysis. Epilepsy Res 2010.', doi: '10.1016/j.eplepsyres.2010.02.007' },
  { citation: 'Wang I et al. MRI essentials in epileptology: a review from the ILAE Imaging Taskforce. Epileptic Disord 2020. Common epileptogenic pathologies, including cavernomas, hemorrhage and neurocysticercosis stages.', doi: '10.1684/epd.2020.1174' },
  { citation: 'Nash TE et al. Neurocysticercosis: a natural human model of epileptogenesis. Epilepsia 2015. Calcified granulomas as seizure foci.', doi: '10.1111/epi.12849' },
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

/* ---------- Learn: the lesson, verbatim, one section per h3 card ---------- */

const learn: LearnSection[] = [
  {
    id: 'why-different',
    title: 'Part 1. Why this is different from a routine brain MRI',
    body: (
      <>
        <p>The whole point of an epilepsy MRI is to find a <strong>small, subtle, surgically removable lesion</strong>. Two facts drive everything else:</p>
        <ol className="plain-list">
          <li><strong>Routine MRI misses these lesions.</strong> In the classic study by Von Oertzen et al. (J Neurol Neurosurg Psychiatry 2002), non-expert reports of standard brain MRI found a lesion in only 39% of surgical candidates; expert reading of a dedicated epilepsy protocol found one in 91%. Half the "non-lesional" patients actually had a lesion.</li>
          <li><strong>Finding the lesion changes the outcome.</strong> In the meta-analysis by <Cite doi="10.1016/j.eplepsyres.2010.02.007">Téllez-Zenteno et al. (Epilepsy Research 2010)</Cite>, patients with a lesion on MRI were roughly 2.5 times more likely to be seizure-free after surgery than those without.</li>
        </ol>
        <p>What you are looking for, by frequency, comes from the largest surgical pathology series ever published (<Cite doi="10.1056/NEJMoa1703784">Blümcke et al., NEJM 2017</Cite>, 9,523 patients):</p>
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
      </>
    ),
  },
  {
    id: 'protocol',
    title: 'Part 2. The protocol (so you know whether the study is adequate)',
    body: (
      <>
        <p>The standard is the ILAE <strong>HARNESS-MRI</strong> protocol (<Cite doi="10.1111/epi.15612">Bernasconi et al., Epilepsia 2019</Cite>): isotropic, millimetric 3D T1 and FLAIR images, plus high-resolution 2D submillimetric T2 images. It can be obtained on 1.5T and 3T, applies to adults and children, and provides full brain coverage. The three core sequences:</p>
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
      </>
    ),
  },
  {
    id: 'search-pattern',
    title: 'Part 3. The step-by-step search pattern',
    body: (
      <>
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
          <p><Cite doi="10.1212/wnl.40.12.1869">Jackson et al. (Neurology 1990)</Cite> showed that the combination of atrophy plus T2 signal increase is highly reliable for hippocampal sclerosis. Either sign alone is less specific.</p>
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
            <li>Is there <strong>bright FLAIR signal in the subcortical white matter</strong>, especially a tapering line running from the cortex toward the ventricle (the <strong>"transmantle sign"</strong>, <Cite doi="10.1212/wnl.49.4.1148">Barkovich et al., Neurology 1997</Cite>)?</li>
            <li>Does the <strong>depth of a sulcus</strong> look thick or bright? The sulcus bottom is where small FCDs hide (<strong>bottom-of-sulcus dysplasia</strong>, <Cite doi="10.1212/WNL.0000000000001591">Harvey et al., Neurology 2015</Cite>).</li>
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
            <li>Old <strong>hemorrhage, calcification</strong> (TSC tubers, Sturge-Weber gyriform calcification, old infection). These count as potentially epileptogenic lesions: hemorrhagic stroke and subdural hematoma are among the vascular lesions "associated with refractory seizures" (<Cite doi="10.1684/epd.2020.1174">Wang et al., Epileptic Disord 2020</Cite>), and calcified lesions "can be foci of seizure activation" (<Cite doi="10.1111/epi.12849">Nash et al., Epilepsia 2015</Cite>).</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Old injury and inflammatory patterns</h4>
          <ul className="plain-list">
            <li><strong>Encephalomalacia / gliosis</strong> from prior trauma, stroke, infection. These are "lesions" too.</li>
            <li><strong>Rasmussen encephalitis</strong>: progressive unilateral hemispheric atrophy with T2/FLAIR signal, often starting in the perisylvian region and caudate head (<Cite doi="10.1093/brain/awh415">Bien et al., Brain 2005</Cite> consensus criteria).</li>
            <li><strong>Sturge-Weber</strong>: leptomeningeal enhancement, enlarged choroid plexus, cortical calcification, hemiatrophy.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 9. Pitfalls: things that will fool you</h4>
          <ul className="plain-list">
            <li><strong>Peri-ictal changes.</strong> A recent seizure can cause cortical T2/FLAIR swelling, restricted diffusion, and even hippocampal swelling with enhancement. It usually resolves over weeks to a few months: 15–150 days, mean 62, in <Cite doi="10.1016/j.ejrad.2013.05.020">Cianfoni et al., Eur J Radiol 2013</Cite>. If the MRI was done shortly after a seizure or status, say so, and recommend repeat imaging before calling a mass or HS.</li>
            <li><strong>Incomplete hippocampal inversion (hippocampal malrotation).</strong> A round, vertically oriented hippocampus with a deep collateral sulcus, usually on the left. A normal variant; do not call it sclerosis. Signal and internal architecture are normal.</li>
            <li><strong>Choroidal fissure cysts and hippocampal sulcal remnant cysts</strong>: CSF signal, no mass effect. Normal.</li>
            <li><strong>Asymmetric temporal horns from head tilt</strong>: check the angulation before calling volume loss.</li>
            <li><strong>Bright FLAIR in the hippocampus with normal size and preserved architecture</strong>: could be early or mild HS, could be peri-ictal, could be artifact. Describe it, don't overcall it.</li>
            <li><strong>Transmantle sign vs. a normal perivascular space</strong>: perivascular spaces follow vessels and are CSF-signal on all sequences (dark on FLAIR); the transmantle sign is bright on FLAIR.</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pathologies',
    title: 'Part 4. The pathologies you must know',
    body: (
      <>
        <h4>Hippocampal sclerosis (mesial temporal sclerosis)</h4>
        <ul className="plain-list">
          <li><strong>MRI:</strong> small, bright (T2/FLAIR), lost internal structure. Plus the secondary signs above.</li>
          <li><strong>Pathology</strong> (<Cite doi="10.1111/epi.12220">Blümcke et al., ILAE classification, Epilepsia 2013</Cite>): type 1 = CA1 and CA4 loss (classic, best surgical outcome); type 2 = CA1 only; type 3 = CA4 only. You cannot reliably tell these apart on MRI, but it's useful to know they exist.</li>
          <li><strong>Bilateral HS:</strong> about 10%. Check both sides against each other <em>and</em> against your mental picture of normal.</li>
        </ul>
        <h4>Focal cortical dysplasia (FCD)</h4>
        <p>Classification: ILAE 2011 (<Cite doi="10.1111/j.1528-1167.2010.02777.x">Blümcke et al., Epilepsia 2011</Cite>), updated 2022 (<Cite doi="10.1111/epi.17301">Najm et al., Epilepsia 2022</Cite>).</p>
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
        <p>Brain herniation through the floor of the middle cranial fossa, often anteroinferior temporal. Under-recognized because you have to look for it. <Cite doi="10.1212/WNL.0000000000002062">Saavalainen et al. (Neurology 2015)</Cite> found it in 1.9% of patients referred with drug-resistant epilepsy and showed patients did well when it was resected.</p>
        <h4>Hypothalamic hamartoma</h4>
        <p>Gelastic seizures, early puberty in children. Non-enhancing gray-matter-signal mass at the tuber cinereum.</p>
        <h4>Rasmussen encephalitis</h4>
        <p>Child, progressive hemiparesis, epilepsia partialis continua. Unilateral cortical/subcortical FLAIR signal that evolves into hemispheric atrophy over months.</p>
      </>
    ),
  },
  {
    id: 'report',
    title: 'Part 5. The report',
    body: (
      <>
        <p>A structured report is strongly encouraged in the ILAE recommendations. The clinicians want a yes/no on each key structure, not prose.</p>
        <CopyBlock label="Report template" text={reportTemplate} />
      </>
    ),
  },
]

/* ---------- Report: options and rule helpers ---------- */

const SIDE_WORD: Record<string, string> = { r: 'right', l: 'left', both: 'bilateral' }
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)

const PROTOCOL: Option[] = [
  { value: 'full', label: 'Meets epilepsy protocol' },
  { value: 'routine', label: 'Routine protocol only' },
]
const ANGLE: Option[] = [
  { value: 'ok', label: 'Correctly angled' },
  { value: 'off', label: 'Angulation off' },
]
const CONTRAST: Option[] = [
  { value: 'none', label: 'No contrast' },
  { value: 'given', label: 'Post-contrast T1 given' },
]
const PATIENT: Option[] = [
  { value: 'adult', label: 'Adult' },
  { value: 'child', label: 'Child' },
]
const SEMIOLOGY: Option[] = [
  { value: 'temporal', label: 'Temporal lobe semiology (epigastric aura, déjà vu, automatisms, fear)' },
  { value: 'gelastic', label: 'Gelastic (laughing) seizures' },
  { value: 'frontal', label: 'Frontal hypermotor / nocturnal' },
  { value: 'childfcd', label: 'Childhood onset, drug-resistant, nothing obvious' },
  { value: 'rasmussen', label: 'Progressive unilateral deficits in a child' },
  { value: 'other', label: 'Other / not localizing' },
]
const SEMIOLOGY_REGION: Record<string, string> = {
  temporal: 'Mesial temporal structures',
  gelastic: 'Hypothalamus (hamartoma)',
  frontal: 'Frontal lobe, especially bottom-of-sulcus dysplasia',
  childfcd: 'Look extra hard for FCD',
  rasmussen: 'Rasmussen encephalitis',
}
const EEG: Option[] = [
  { value: 'r', label: 'Right' },
  { value: 'l', label: 'Left' },
  { value: 'both', label: 'Bilateral' },
  { value: 'none', label: 'Not lateralized' },
]
const YESNO: Option[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const SIZE: Option[] = [
  { value: 'sym', label: 'Symmetric' },
  { value: 'r', label: 'Right smaller' },
  { value: 'l', label: 'Left smaller' },
  { value: 'both', label: 'Both small' },
]
const SIGNAL: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'r', label: 'Increased right' },
  { value: 'l', label: 'Increased left' },
  { value: 'both', label: 'Increased both' },
]
const ARCH: Option[] = [
  { value: 'preserved', label: 'Preserved' },
  { value: 'r', label: 'Lost right' },
  { value: 'l', label: 'Lost left' },
  { value: 'both', label: 'Lost both' },
]
const NONE_PRESENT: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const SECONDARY: Option[] = [
  { value: 'horn', label: 'Enlarged temporal horn' },
  { value: 'fornix', label: 'Fornix / mammillary body atrophy' },
  { value: 'pole', label: 'Temporal pole gray-white blurring' },
  { value: 'collateral', label: 'Collateral white matter / entorhinal atrophy' },
  { value: 'amygdala', label: 'Amygdala volume loss' },
]
const SECONDARY_TEXT: Record<string, string> = {
  horn: 'enlarged temporal horn',
  fornix: 'fornix and mammillary body atrophy',
  pole: 'loss of gray-white distinction in the temporal pole',
  collateral: 'atrophy of the collateral white matter and entorhinal cortex',
  amygdala: 'amygdala volume loss',
}
const RLB: Option[] = [
  { value: 'r', label: 'Right' },
  { value: 'l', label: 'Left' },
  { value: 'both', label: 'Bilateral' },
]
const AMYGDALA: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'r', label: 'Right enlarged, bright' },
  { value: 'l', label: 'Left enlarged, bright' },
]
const SIDE_OR_NONE: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'r', label: 'Right' },
  { value: 'l', label: 'Left' },
  { value: 'both', label: 'Bilateral' },
]
const TUMOR_TYPE: Option[] = [
  { value: 'dnetgg', label: 'DNET vs ganglioglioma' },
  { value: 'gg', label: 'Ganglioglioma' },
  { value: 'dnet', label: 'DNET' },
  { value: 'pxa', label: 'Pleomorphic xanthoastrocytoma' },
  { value: 'lgg', label: 'Low-grade glioma' },
]
const TUMOR_FEATURES: Option[] = [
  { value: 'cystnodule', label: 'Cystic with enhancing nodule' },
  { value: 'calc', label: 'Calcification' },
  { value: 'bubbly', label: 'Bubbly multicystic, very bright T2' },
  { value: 'rim', label: 'Bright rim on FLAIR' },
  { value: 'scallop', label: 'Scalloping of the inner table' },
  { value: 'meninges', label: 'Superficial, nodule touching the meninges' },
  { value: 'noedema', label: 'Little or no edema or mass effect' },
]
const TUMOR_FEATURE_TEXT: Record<string, string> = {
  cystnodule: 'cystic with an enhancing nodule',
  calc: 'calcification',
  bubbly: 'bubbly multicystic, very bright on T2',
  rim: 'bright rim on FLAIR',
  scallop: 'scalloping of the inner table',
  meninges: 'superficial, nodule touching the meninges',
  noedema: 'little or no edema or mass effect',
}
const CORTEX: Option[] = [
  { value: 'none', label: 'Negative' },
  { value: 'abnormal', label: 'Abnormal' },
]
const CORTEX_FEATURES: Option[] = [
  { value: 'thick', label: 'Cortical thickening' },
  { value: 'blur', label: 'Gray-white blurring' },
  { value: 'flair', label: 'Bright subcortical FLAIR signal' },
  { value: 'transmantle', label: 'Transmantle sign' },
  { value: 'bos', label: 'At the bottom of a sulcus' },
  { value: 'pmg', label: 'Polymicrogyria (too many small gyri)' },
  { value: 'schiz', label: 'Schizencephaly (cleft)' },
  { value: 'liss', label: 'Lissencephaly (smooth surface)' },
]
const CORTEX_FEATURE_TEXT: Record<string, string> = {
  thick: 'cortical thickening',
  blur: 'blurring of the gray-white junction',
  flair: 'increased subcortical FLAIR signal',
  transmantle: 'transmantle sign',
  bos: 'located at the bottom of the sulcus',
}
const TYPE_II = ['thick', 'blur', 'flair', 'transmantle']
/**
 * The FCD type II features that were marked. Subcortical FLAIR brightness on its own is not
 * enough: the lesson says FCD type I and MOGHE show it too. Thick cortex alongside
 * polymicrogyria is the polymicrogyria itself ("thick, bumpy cortex"), not a type II feature.
 */
function typeIIFeatures(features: string[]) {
  const found = features.filter((f) => TYPE_II.includes(f) && !(f === 'thick' && features.includes('pmg')))
  return found.length === 1 && found[0] === 'flair' ? [] : found
}
const GYRAL: Record<string, string> = { pmg: 'Polymicrogyria', schiz: 'Schizencephaly', liss: 'Lissencephaly' }
const HETEROTOPIA: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'pvnh', label: 'Periventricular nodular' },
  { value: 'subcortical', label: 'Subcortical' },
  { value: 'band', label: 'Band (double cortex)' },
]
const HETEROTOPIA_TEXT: Record<string, string> = {
  pvnh: 'Periventricular nodular heterotopia',
  subcortical: 'Subcortical heterotopia',
  band: 'Band heterotopia ("double cortex")',
}
const HYPOTHALAMUS: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'hamartoma', label: 'Hamartoma' },
]
const SWI: Option[] = [
  { value: 'none', label: 'Negative' },
  { value: 'abnormal', label: 'Abnormal' },
]
const SWI_FINDINGS: Option[] = [
  { value: 'cav', label: 'Single cavernoma' },
  { value: 'multicav', label: 'Multiple cavernomas' },
  { value: 'hem', label: 'Old hemorrhage (hemosiderin)' },
  { value: 'calc', label: 'Calcification' },
]
const INJURY: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'present', label: 'Present' },
]
const INJURY_TYPES: Option[] = [
  { value: 'gliosis', label: 'Encephalomalacia / gliosis' },
  { value: 'rasmussen', label: 'Unilateral hemispheric atrophy with T2/FLAIR signal (Rasmussen pattern)' },
  { value: 'sw', label: 'Sturge-Weber features' },
]
const DWI: Option[] = [
  { value: 'none', label: 'No restriction' },
  { value: 'restricted', label: 'Restricted' },
]
const DWI_CAUSE: Option[] = [
  { value: 'periictal', label: 'Likely peri-ictal' },
  { value: 'tumor', label: 'Tumor' },
  { value: 'uncertain', label: 'Uncertain' },
]
const PERIICTAL: Option[] = [
  { value: 'cortical', label: 'Cortical T2/FLAIR swelling' },
  { value: 'hippo', label: 'Hippocampal swelling / enhancement' },
]
const PERIICTAL_TEXT: Record<string, string> = {
  cortical: 'cortical T2/FLAIR swelling',
  hippo: 'hippocampal swelling / enhancement',
}
const MALROTATION: Option[] = [
  { value: 'none', label: 'None' },
  { value: 'l', label: 'Left' },
  { value: 'r', label: 'Right' },
  { value: 'both', label: 'Bilateral' },
]
const RECS: Option[] = [
  { value: 'protocol', label: 'Dedicated epilepsy protocol' },
  { value: 'postproc', label: 'Post-processing' },
  { value: 'pet', label: 'PET/SPECT correlation' },
  { value: 'repeat', label: 'Repeat after seizure control' },
]
const RECS_TEXT: Record<string, string> = {
  protocol: 'Dedicated epilepsy-protocol MRI.',
  postproc: 'Computer-aided post-processing.',
  pet: 'PET/SPECT correlation.',
  repeat: 'Repeat imaging after seizure control.',
}

function label(options: Option[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

/** True when a right/left/both value includes this side. */
function hasSide(value: string, side: 'r' | 'l') {
  return value === side || value === 'both'
}

function joinList(items: string[]) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

type HippoSide = { side: 'r' | 'l'; vol: boolean; sig: boolean; arch: boolean; digit: boolean }

function hippoSides(values: Values): HippoSide[] {
  return (['r', 'l'] as const).map((side) => ({
    side,
    vol: hasSide(str(values, 'hippSize'), side),
    sig: hasSide(str(values, 'hippSignal'), side),
    arch: hasSide(str(values, 'hippArch'), side),
    digit: hasSide(str(values, 'hippDigit'), side),
  }))
}

/** Jackson 1990: atrophy plus T2 signal increase is highly reliable for HS; either alone is less specific. */
function hsSides(values: Values) {
  return hippoSides(values).filter((h) => h.vol && h.sig)
}

function recentSeizure(values: Values) {
  return str(values, 'recent') === 'yes'
}

function periIctalChanges(values: Values) {
  return (
    list(values, 'periictal').includes('cortical') ||
    (str(values, 'dwi') === 'restricted' && str(values, 'dwiCause') !== 'tumor')
  )
}

function cortexLocation(values: Values) {
  const side = SIDE_WORD[str(values, 'cortexSide')] ?? ''
  const lobe = str(values, 'cortexLobe')
  const site = str(values, 'cortexSite')
  return [[side, lobe].filter(Boolean).join(' '), site].filter(Boolean).join(', ')
}

/** Lesions other than HS, as impression lines, for dual pathology and "No second lesion". */
function otherLesions(values: Values): string[] {
  const out: string[] = []
  const loc = cortexLocation(values)
  const features = list(values, 'cortexFeatures')
  if (str(values, 'cortex') === 'abnormal') {
    const typeII = typeIIFeatures(features)
    const gyral = features.filter((f) => f in GYRAL)
    const eloquent = str(values, 'cortexEloquent')
    if (typeII.length > 0) {
      out.push(
        `Lesion suspicious for focal cortical dysplasia type II${loc ? `, ${loc}` : ''}${features.includes('transmantle') ? ', with transmantle sign' : ''}${eloquent ? `, ${eloquent}` : ''}.`,
      )
    }
    for (const g of gyral) out.push(`${GYRAL[g]}${loc ? `, ${loc}` : ''}${eloquent ? `, ${eloquent}` : ''}.`)
    const described = features.filter((f) => f in CORTEX_FEATURE_TEXT && f !== 'bos').map((f) => CORTEX_FEATURE_TEXT[f])
    if (typeII.length === 0 && gyral.length === 0) out.push(`Cortical abnormality${described.length ? ` (${joinList(described)})` : ''}${loc ? `, ${loc}` : ''}${eloquent ? `, ${eloquent}` : ''}.`)
  }
  if (str(values, 'tumor') === 'present') {
    const type = str(values, 'tumorType')
    const where = str(values, 'tumorLoc')
    out.push(`Probable long-term epilepsy-associated tumor${type ? ` (${label(TUMOR_TYPE, type)})` : ''}${where ? ` in the ${where}` : ''}.`)
  }
  const amygdala = str(values, 'amygdala')
  if (amygdala === 'r' || amygdala === 'l') {
    out.push(`Enlarged, mildly T2/FLAIR-bright ${SIDE_WORD[amygdala]} amygdala: low-grade tumor (ganglioglioma) or amygdala enlargement.`)
  }
  const cele = str(values, 'encephalocele')
  if (cele && cele !== 'none') out.push(`${cap(SIDE_WORD[cele])} anteroinferior temporal encephalocele.`)
  const het = str(values, 'heterotopia')
  if (het && het !== 'none') {
    const where = str(values, 'heterotopiaLoc')
    out.push(`${HETEROTOPIA_TEXT[het]}${where ? `, ${where}` : ''}.`)
  }
  if (str(values, 'hypothalamus') === 'hamartoma') out.push('Hypothalamic hamartoma.')
  if (str(values, 'swi') === 'abnormal') {
    const found = list(values, 'swiFindings')
    const where = str(values, 'swiLoc')
    const at = where ? `, ${where}` : ''
    if (found.includes('multicav')) out.push(`Multiple cavernomas${at}, a pattern that suggests the familial form (CCM genes).`)
    else if (found.includes('cav')) out.push(`Cavernoma${at}.`)
    else {
      // Hemosiderin and calcification are lesions, not a negative study: old blood
      // is an epileptogenic substrate and calcified granulomas can be seizure foci.
      const what = found.includes('hem') && found.includes('calc')
        ? 'Hemosiderin and calcification'
        : found.includes('hem') ? 'Hemosiderin (old hemorrhage)' : found.includes('calc') ? 'Calcification' : 'Susceptibility abnormality'
      out.push(`${what} on SWI${at}: a potentially epileptogenic lesion; correlate with semiology and EEG.`)
    }
  }
  if (str(values, 'injury') === 'present') {
    const types = list(values, 'injuryTypes')
    const where = str(values, 'injuryLoc')
    const at = where ? `, ${where}` : ''
    if (types.includes('gliosis')) out.push(`Encephalomalacia / gliosis${at}.`)
    if (types.includes('rasmussen')) out.push(`Unilateral hemispheric atrophy with T2/FLAIR signal${at}, pattern of Rasmussen encephalitis.`)
    if (types.includes('sw')) out.push(`Features of Sturge-Weber${at}.`)
    if (types.length === 0) out.push(`Old injury${at}.`)
  }
  return out
}

/* ---------- Report steps ---------- */

const steps: StudyDefinition['report']['steps'] = [
  {
    id: 'technique',
    title: 'Technique',
    learn: 'protocol',
    teach: (
      <>
        <p>The standard is the ILAE <strong>HARNESS-MRI</strong> protocol (<Cite doi="10.1111/epi.15612">Bernasconi et al., Epilepsia 2019</Cite>): isotropic, millimetric 3D T1 and FLAIR images, plus high-resolution 2D submillimetric T2 images angled perpendicular to the long axis of the hippocampus.</p>
        <p>State whether the study meets the epilepsy protocol. If it does NOT (only a routine protocol), say so; this is one of the most useful things you can put in a report.</p>
        <p>Always check that the coronal T2 is actually angled correctly. If the hippocampi look like tilted ovals instead of round "sea horses," the angulation is off and you can be fooled into calling asymmetry.</p>
      </>
    ),
    fields: [
      { id: 'protocol', kind: 'choice', label: 'Epilepsy protocol', options: PROTOCOL, required: true, help: '3D T1 1 mm, 3D FLAIR 1 mm, coronal oblique high-res T2, SWI, DWI' },
      { id: 'sequences', kind: 'text', label: 'Sequences performed', placeholder: 'e.g. axial T2, FLAIR, DWI (routine brain)', showIf: (v) => str(v, 'protocol') === 'routine' },
      { id: 'angle', kind: 'choice', label: 'Coronal T2 angulation', options: ANGLE },
      { id: 'contrast', kind: 'choice', label: 'Contrast', options: CONTRAST, help: 'Post-contrast T1 only if a lesion needs characterization' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (str(v, 'protocol') === 'routine') out.push({ label: 'Protocol', value: 'Say it is not an epilepsy protocol', tone: 'warn' })
      if (str(v, 'angle') === 'off') out.push({ label: 'Angulation', value: 'Can fake hippocampal asymmetry', tone: 'warn' })
      return out
    },
  },
  {
    id: 'clinical',
    title: 'Step 1. Clinical context first (30 seconds)',
    learn: 'search-pattern',
    teach: (
      <>
        <p>Read the history. The seizure type points you to a region. If EEG lateralization is provided, use it. It is legitimate to look harder on the side EEG points to.</p>
        <p>In an adult, think <strong>hippocampus first</strong>. In a child, think <strong>cortical dysplasia first</strong> (<Cite doi="10.1056/NEJMoa1703784">Blümcke et al., NEJM 2017</Cite>).</p>
      </>
    ),
    fields: [
      { id: 'patient', kind: 'choice', label: 'Patient', options: PATIENT },
      { id: 'seizureType', kind: 'text', label: 'Seizure type', placeholder: 'e.g. focal impaired awareness with epigastric aura' },
      { id: 'semiology', kind: 'choice', label: 'Semiology pattern', options: SEMIOLOGY },
      { id: 'eeg', kind: 'choice', label: 'EEG lateralization', options: EEG },
      { id: 'lastSeizure', kind: 'text', label: 'Time since last seizure', placeholder: 'e.g. 2 days' },
      { id: 'recent', kind: 'choice', label: 'Scan shortly after a seizure or status', options: YESNO, help: 'Peri-ictal changes are the main mimic' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const patient = str(v, 'patient')
      if (patient === 'adult') out.push({ label: 'Think first', value: 'Hippocampus' })
      if (patient === 'child') out.push({ label: 'Think first', value: 'Cortical dysplasia' })
      const region = SEMIOLOGY_REGION[str(v, 'semiology')]
      if (region) out.push({ label: 'Look at', value: region })
      const eeg = str(v, 'eeg')
      if (eeg === 'r' || eeg === 'l') out.push({ label: 'EEG', value: `Look harder on the ${SIDE_WORD[eeg]}` })
      if (recentSeizure(v)) out.push({ label: 'Timing', value: 'Peri-ictal changes possible', tone: 'warn' })
      return out
    },
  },
  {
    id: 'hippocampi',
    title: 'Step 2. Hippocampi: the "big four" on coronal T2 and FLAIR',
    learn: 'search-pattern',
    teach: (
      <>
        <p>Compare left to right, slice by slice, from the amygdala back to the tail. Look for:</p>
        <ol className="plain-list">
          <li><strong>Smaller hippocampus</strong> (volume loss): the most reliable sign.</li>
          <li><strong>Brighter hippocampus on T2/FLAIR</strong>: the second most reliable sign. Judge it on FLAIR, where CSF is dark.</li>
          <li><strong>Loss of internal architecture</strong>: in sclerosis the layered "jelly-roll" becomes a featureless blob.</li>
          <li><strong>Shape change</strong>: the hippocampal head loses its normal "digitations" and looks smooth.</li>
        </ol>
        <p><Cite doi="10.1212/wnl.40.12.1869">Jackson et al. (Neurology 1990)</Cite> showed that the combination of atrophy plus T2 signal increase is highly reliable for hippocampal sclerosis. Either sign alone is less specific. Bilateral HS is about 10%: check both sides against each other <em>and</em> against your mental picture of normal.</p>
      </>
    ),
    fields: [
      { id: 'hippSize', kind: 'choice', label: 'Size', options: SIZE, required: true },
      { id: 'hippSignal', kind: 'choice', label: 'T2-FLAIR signal', options: SIGNAL, required: true },
      { id: 'hippArch', kind: 'choice', label: 'Internal architecture', options: ARCH, required: true },
      { id: 'hippDigit', kind: 'choice', label: 'Head digitations', options: ARCH },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const hs = hsSides(v)
      if (hs.length === 2) out.push({ label: 'Atrophy + signal', value: 'Bilateral HS pattern', tone: 'warn' })
      else if (hs.length === 1) out.push({ label: 'Atrophy + signal', value: `${cap(SIDE_WORD[hs[0].side])} HS: highly reliable`, tone: 'warn' })
      for (const h of hippoSides(v)) {
        if (h.vol !== h.sig) {
          out.push({ label: `${cap(SIDE_WORD[h.side])}, one sign`, value: h.vol ? 'Volume loss alone: less specific' : 'Signal alone: less specific' })
        }
        if (h.sig && !h.vol && !h.arch) {
          out.push({ label: `${cap(SIDE_WORD[h.side])} bright, normal size`, value: 'Describe, do not overcall' })
        }
      }
      if (str(v, 'angle') === 'off' && ['r', 'l', 'both'].includes(str(v, 'hippSize'))) {
        out.push({ label: 'Angulation off', value: 'Check before calling volume loss', tone: 'warn' })
      }
      return out
    },
  },
  {
    id: 'secondary',
    title: 'Step 3. Secondary signs of mesial temporal sclerosis',
    learn: 'search-pattern',
    teach: (
      <p>These help when the primary signs are borderline: enlarged temporal horn on the same side; atrophy of the ipsilateral fornix and mammillary body (look on the sagittal 3D T1); loss of gray-white distinction in the anterior temporal lobe / temporal pole; atrophy of the collateral white matter and entorhinal cortex; amygdala volume loss.</p>
    ),
    fields: [
      { id: 'secondary', kind: 'choice', label: 'Secondary signs', options: NONE_PRESENT },
      { id: 'secondarySide', kind: 'choice', label: 'Side', options: RLB, showIf: (v) => str(v, 'secondary') === 'present' },
      { id: 'secondarySigns', kind: 'multi', label: 'Signs', options: SECONDARY, showIf: (v) => str(v, 'secondary') === 'present' },
    ],
  },
  {
    id: 'temporal',
    title: 'Step 4. Temporal lobe beyond the hippocampus',
    learn: 'search-pattern',
    teach: (
      <>
        <ul className="plain-list">
          <li><strong>Amygdala</strong>: enlarged and mildly bright? Think low-grade tumor (ganglioglioma) or "amygdala enlargement" TLE.</li>
          <li><strong>Temporal pole</strong>: look at the anteroinferior surface for an <strong>encephalocele</strong>. Use sagittal and coronal 3D T1 and thin CT if available. <Cite doi="10.1212/WNL.0000000000002062">Saavalainen et al. (Neurology 2015)</Cite> found it in 1.9% of patients referred with drug-resistant epilepsy.</li>
          <li><strong>Dual pathology</strong>: an HS plus a second lesion somewhere else. Roughly 10–15% of HS cases. Never stop looking after you find the hippocampus.</li>
        </ul>
        <p>LEATs: cortical, temporal, slow-growing, well-defined, little or no edema, little or no mass effect. Ganglioglioma is often cystic with an enhancing nodule; DNET is a "bubbly" multicystic cortical lesion, very bright T2, with a bright rim on FLAIR.</p>
      </>
    ),
    fields: [
      { id: 'amygdala', kind: 'choice', label: 'Amygdala', options: AMYGDALA },
      { id: 'encephalocele', kind: 'choice', label: 'Temporal pole encephalocele', options: SIDE_OR_NONE },
      { id: 'tumor', kind: 'choice', label: 'Tumor (LEAT)', options: NONE_PRESENT },
      { id: 'tumorLoc', kind: 'text', label: 'Tumor location', placeholder: 'e.g. right medial temporal lobe', showIf: (v) => str(v, 'tumor') === 'present' },
      { id: 'tumorFeatures', kind: 'multi', label: 'Tumor features', options: TUMOR_FEATURES, showIf: (v) => str(v, 'tumor') === 'present' },
      { id: 'tumorType', kind: 'choice', label: 'Favored diagnosis', options: TUMOR_TYPE, showIf: (v) => str(v, 'tumor') === 'present' },
    ],
    derive: (v) => {
      const out: Derived[] = []
      const amygdala = str(v, 'amygdala')
      if (amygdala === 'r' || amygdala === 'l') out.push({ label: 'Amygdala', value: 'Low-grade tumor or amygdala enlargement TLE', tone: 'warn' })
      const hs = hsSides(v).length > 0
      const others = otherLesions(v).length
      if (hs && others > 0) out.push({ label: 'Dual pathology', value: 'HS plus a second lesion', tone: 'warn' })
      else if (hs) out.push({ label: 'HS found', value: 'Keep looking: dual pathology 10–15%' })
      return out
    },
  },
  {
    id: 'cortex',
    title: 'Step 5. Whole-brain cortex: the FCD search',
    learn: 'search-pattern',
    teach: (
      <>
        <p>Go through the <strong>3D T1 and 3D FLAIR in all three planes</strong> and scroll slowly. You are looking for a <em>sulcus that looks wrong</em>: thicker cortex, a blurred gray-white junction, bright subcortical FLAIR, especially a tapering line toward the ventricle (the <strong>"transmantle sign"</strong>, <Cite doi="10.1212/wnl.49.4.1148">Barkovich et al., Neurology 1997</Cite>), a thick or bright sulcal depth (<strong>bottom-of-sulcus dysplasia</strong>, <Cite doi="10.1212/WNL.0000000000001591">Harvey et al., Neurology 2015</Cite>), or an abnormal gyral pattern.</p>
        <p>FCD type II is the one you can find: thick cortex, blurred gray-white junction, bright subcortical FLAIR, transmantle sign (IIb especially). Loves the frontal lobe and the bottom of a sulcus.</p>
        <p>Transmantle sign vs. a normal perivascular space: perivascular spaces follow vessels and are CSF-signal on all sequences (dark on FLAIR); the transmantle sign is bright on FLAIR.</p>
      </>
    ),
    fields: [
      { id: 'cortex', kind: 'choice', label: 'Neocortex', options: CORTEX, required: true },
      { id: 'cortexSide', kind: 'choice', label: 'Side', options: RLB, showIf: (v) => str(v, 'cortex') === 'abnormal' },
      { id: 'cortexLobe', kind: 'text', label: 'Lobe', placeholder: 'e.g. frontal lobe', showIf: (v) => str(v, 'cortex') === 'abnormal' },
      { id: 'cortexSite', kind: 'text', label: 'Gyrus / sulcus', placeholder: 'e.g. bottom of the superior frontal sulcus', showIf: (v) => str(v, 'cortex') === 'abnormal' },
      { id: 'cortexFeatures', kind: 'multi', label: 'Features', options: CORTEX_FEATURES, showIf: (v) => str(v, 'cortex') === 'abnormal', help: 'Transmantle sign is bright on FLAIR; a perivascular space is dark' },
      { id: 'cortexEloquent', kind: 'text', label: 'Relation to eloquent cortex', placeholder: 'e.g. 2 cm anterior to the precentral gyrus', showIf: (v) => str(v, 'cortex') === 'abnormal' },
    ],
    derive: (v) => {
      if (str(v, 'cortex') !== 'abnormal') return []
      const out: Derived[] = []
      const features = list(v, 'cortexFeatures')
      const typeII = typeIIFeatures(features).length > 0
      if (typeII) out.push({ label: 'Pattern', value: 'Suspicious for FCD type II', tone: 'warn' })
      else if (features.length === 1 && features[0] === 'flair') out.push({ label: 'FLAIR alone', value: 'Can also be FCD type I or MOGHE' })
      if (features.includes('transmantle')) out.push({ label: 'Transmantle sign', value: 'Hallmark of FCD type IIb', tone: 'warn' })
      if (features.includes('bos') && typeII) out.push({ label: 'Site', value: 'Bottom-of-sulcus dysplasia' })
      for (const g of features.filter((f) => f in GYRAL)) out.push({ label: 'Gyral pattern', value: GYRAL[g] })
      return out
    },
  },
  {
    id: 'deep',
    title: 'Step 6. Deep gray and periventricular',
    learn: 'search-pattern',
    teach: (
      <ul className="plain-list">
        <li><strong>Periventricular nodular heterotopia</strong>: gray matter nodules lining the ventricles (same signal as cortex on every sequence, no enhancement). Easy to mistake for subependymal nodules of tuberous sclerosis (those calcify and are T2-dark/SWI-dark).</li>
        <li><strong>Subcortical / band heterotopia</strong> ("double cortex").</li>
        <li><strong>Hypothalamic hamartoma</strong>: a mass hanging from the tuber cinereum, gray-matter signal, no enhancement. Gelastic seizures.</li>
      </ul>
    ),
    fields: [
      { id: 'heterotopia', kind: 'choice', label: 'Heterotopia', options: HETEROTOPIA, required: true },
      { id: 'heterotopiaLoc', kind: 'text', label: 'Heterotopia location', placeholder: 'e.g. lining the left trigone', showIf: (v) => ['pvnh', 'subcortical', 'band'].includes(str(v, 'heterotopia')) },
      { id: 'hypothalamus', kind: 'choice', label: 'Hypothalamus', options: HYPOTHALAMUS, required: true },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (str(v, 'semiology') === 'gelastic' && str(v, 'hypothalamus') === 'hamartoma') out.push({ label: 'Gelastic seizures', value: 'Fits hypothalamic hamartoma', tone: 'warn' })
      if (str(v, 'heterotopia') === 'pvnh') out.push({ label: 'Check', value: 'Calcified / SWI-dark nodules = TSC, not heterotopia' })
      return out
    },
  },
  {
    id: 'swi',
    title: 'Step 7. SWI / GRE sweep',
    learn: 'search-pattern',
    teach: (
      <ul className="plain-list">
        <li><strong>Cavernoma</strong>: "popcorn" T2 lesion with a black hemosiderin rim; blooms on SWI. Multiple cavernomas = familial (CCM genes). Most common vascular cause of epilepsy.</li>
        <li>Old <strong>hemorrhage, calcification</strong> (TSC tubers, Sturge-Weber gyriform calcification, old infection).</li>
        <li><strong>These are lesions, not a negative study.</strong> Hemorrhagic stroke and subdural hematoma are among the vascular lesions "associated with refractory seizures" (<Cite doi="10.1684/epd.2020.1174">Wang et al., ILAE Imaging Taskforce, Epileptic Disord 2020</Cite>), and in patients with seizures "calcified lesions can be foci of seizure activation" (<Cite doi="10.1111/epi.12849">Nash et al., Epilepsia 2015</Cite>). A calcified cysticercus usually does not enhance, "but if found, this could suggest ongoing seizures" (<Cite doi="10.1684/epd.2020.1174">Wang et al., 2020</Cite>). Calcified granulomas are also common in people without epilepsy, so the lesion is potentially, not proven, epileptogenic. So the impression names the finding as a potentially epileptogenic lesion and asks for correlation with semiology and EEG; it never says "no epileptogenic lesion."</li>
      </ul>
    ),
    fields: [
      { id: 'swi', kind: 'choice', label: 'SWI / GRE', options: SWI, required: true },
      { id: 'swiFindings', kind: 'multi', label: 'Findings', options: SWI_FINDINGS, showIf: (v) => str(v, 'swi') === 'abnormal', help: 'Hemosiderin or calcification alone is still a potentially epileptogenic lesion, not a negative study' },
      { id: 'swiLoc', kind: 'text', label: 'Location', placeholder: 'e.g. right superior temporal gyrus', showIf: (v) => str(v, 'swi') === 'abnormal' },
    ],
    derive: (v) => {
      if (str(v, 'swi') !== 'abnormal') return []
      return list(v, 'swiFindings').includes('multicav') ? [{ label: 'Multiple cavernomas', value: 'Familial (CCM genes)', tone: 'warn' }] : []
    },
  },
  {
    id: 'injury',
    title: 'Step 8. Old injury and inflammatory patterns',
    learn: 'search-pattern',
    teach: (
      <ul className="plain-list">
        <li><strong>Encephalomalacia / gliosis</strong> from prior trauma, stroke, infection. These are "lesions" too.</li>
        <li><strong>Rasmussen encephalitis</strong>: progressive unilateral hemispheric atrophy with T2/FLAIR signal, often starting in the perisylvian region and caudate head (<Cite doi="10.1093/brain/awh415">Bien et al., Brain 2005</Cite> consensus criteria).</li>
        <li><strong>Sturge-Weber</strong>: leptomeningeal enhancement, enlarged choroid plexus, cortical calcification, hemiatrophy.</li>
      </ul>
    ),
    fields: [
      { id: 'injury', kind: 'choice', label: 'Old injury / inflammatory pattern', options: INJURY },
      { id: 'injuryTypes', kind: 'multi', label: 'Pattern', options: INJURY_TYPES, showIf: (v) => str(v, 'injury') === 'present' },
      { id: 'injuryLoc', kind: 'text', label: 'Location', placeholder: 'e.g. left perisylvian region and caudate head', showIf: (v) => str(v, 'injury') === 'present' },
    ],
    derive: (v) =>
      str(v, 'semiology') === 'rasmussen' && list(v, 'injuryTypes').includes('rasmussen')
        ? [{ label: 'Progressive unilateral deficits', value: 'Fits Rasmussen encephalitis', tone: 'warn' }]
        : [],
  },
  {
    id: 'pitfalls',
    title: 'Step 9. Pitfalls: things that will fool you',
    learn: 'search-pattern',
    teach: (
      <ul className="plain-list">
        <li><strong>Peri-ictal changes.</strong> A recent seizure can cause cortical T2/FLAIR swelling, restricted diffusion, and even hippocampal swelling with enhancement. It usually resolves over weeks to a few months: 15–150 days, mean 62, in <Cite doi="10.1016/j.ejrad.2013.05.020">Cianfoni et al., Eur J Radiol 2013</Cite>. If the MRI was done shortly after a seizure or status, say so, and recommend repeat imaging before calling a mass or HS.</li>
        <li><strong>Incomplete hippocampal inversion.</strong> A round, vertically oriented hippocampus with a deep collateral sulcus, usually on the left. A normal variant; do not call it sclerosis. Signal and internal architecture are normal.</li>
        <li><strong>Choroidal fissure cysts and hippocampal sulcal remnant cysts</strong>: CSF signal, no mass effect. Normal.</li>
      </ul>
    ),
    fields: [
      { id: 'dwi', kind: 'choice', label: 'Diffusion', options: DWI, required: true },
      { id: 'dwiLoc', kind: 'text', label: 'Restriction location', placeholder: 'e.g. right hippocampus and insular cortex', showIf: (v) => str(v, 'dwi') === 'restricted' },
      { id: 'dwiCause', kind: 'choice', label: 'Restriction favors', options: DWI_CAUSE, showIf: (v) => str(v, 'dwi') === 'restricted' },
      { id: 'periictal', kind: 'multi', label: 'Peri-ictal-type changes', options: PERIICTAL },
      { id: 'malrotation', kind: 'choice', label: 'Incomplete hippocampal inversion', options: MALROTATION },
      { id: 'cysts', kind: 'choice', label: 'Choroidal fissure / sulcal remnant cysts', options: NONE_PRESENT },
    ],
    derive: (v) => {
      const out: Derived[] = []
      if (recentSeizure(v) && (periIctalChanges(v) || list(v, 'periictal').includes('hippo'))) {
        out.push({ label: 'Recent seizure', value: 'Likely peri-ictal: repeat before calling mass or HS', tone: 'warn' })
      }
      const mal = str(v, 'malrotation')
      if (mal && mal !== 'none') out.push({ label: 'Malrotation', value: 'Normal variant, not sclerosis', tone: 'good' })
      if (str(v, 'cysts') === 'present') out.push({ label: 'Cysts', value: 'Normal', tone: 'good' })
      return out
    },
  },
  {
    id: 'other',
    title: 'Other findings and recommendations',
    learn: 'report',
    teach: (
      <p>Other: scars, atrophy pattern, incidental findings. Recommendations when appropriate: dedicated epilepsy protocol, post-processing, PET/SPECT correlation, or repeat after seizure control.</p>
    ),
    fields: [
      { id: 'otherText', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'Scars, atrophy pattern, incidental findings' },
      { id: 'recs', kind: 'multi', label: 'Recommendations', options: RECS },
    ],
  },
]

/* ---------- Report text ---------- */

function build(values: Values) {
  const warnings: string[] = []
  const protocol = str(values, 'protocol')

  // Clinical
  const eeg = str(values, 'eeg')
  const clinical = [
    str(values, 'seizureType') && `seizure type ${str(values, 'seizureType')}`,
    eeg && `EEG lateralization ${eeg === 'none' ? 'not lateralized' : SIDE_WORD[eeg]}`,
    str(values, 'lastSeizure') && `time since last seizure ${str(values, 'lastSeizure')}`,
    recentSeizure(values) && 'imaged shortly after a seizure',
  ].filter(Boolean) as string[]

  // Technique
  const contrast = str(values, 'contrast')
  const technique = lines(
    protocol === 'full' &&
      `The study meets the epilepsy protocol: 3D T1 1 mm isotropic, 3D FLAIR 1 mm isotropic, coronal oblique high-resolution T2 perpendicular to the hippocampal axis, SWI, DWI.${contrast === 'given' ? ' Post-contrast T1 obtained for lesion characterization.' : contrast === 'none' ? ' No contrast.' : ''}`,
    protocol === 'routine' &&
      `The study does not meet epilepsy-protocol standards (routine protocol only${str(values, 'sequences') ? `: ${str(values, 'sequences')}` : ''}).${contrast === 'given' ? ' Post-contrast T1 obtained.' : contrast === 'none' ? ' No contrast.' : ''}`,
    str(values, 'angle') === 'off' && 'The coronal T2 angulation is not perpendicular to the hippocampal axis; hippocampal asymmetry is interpreted with caution.',
  )

  // 1. Hippocampi
  const size = str(values, 'hippSize')
  const signal = str(values, 'hippSignal')
  const arch = str(values, 'hippArch')
  const digit = str(values, 'hippDigit')
  const hippo = [
    size && `size ${label(SIZE, size).toLowerCase()}`,
    signal && `T2-FLAIR signal ${label(SIGNAL, signal).toLowerCase()}`,
    arch && `internal architecture ${label(ARCH, arch).toLowerCase()}`,
    digit && `head digitations ${label(ARCH, digit).toLowerCase()}`,
  ].filter(Boolean) as string[]
  const secondary = str(values, 'secondary')
  const signs = list(values, 'secondarySigns').map((s) => SECONDARY_TEXT[s])
  const secSide = SIDE_WORD[str(values, 'secondarySide')]
  const amygdala = str(values, 'amygdala')
  const cele = str(values, 'encephalocele')
  const mal = str(values, 'malrotation')
  const tumorFeatures = list(values, 'tumorFeatures').map((f) => TUMOR_FEATURE_TEXT[f])
  const section1 = lines(
    hippo.length > 0 && `1. Hippocampi: ${cap(hippo.join(', '))}.`,
    secondary === 'none' && '   Secondary signs: none.',
    secondary === 'present' && `   Secondary signs${secSide ? ` (${secSide})` : ''}: ${signs.length ? joinList(signs) : 'present'}.`,
    amygdala === 'normal' && '   Amygdala: normal.',
    (amygdala === 'r' || amygdala === 'l') && `   Amygdala: ${SIDE_WORD[amygdala]} amygdala enlarged and mildly T2/FLAIR bright.`,
    cele === 'none' && '   Temporal pole: no encephalocele.',
    cele && cele !== 'none' && `   Temporal pole: ${SIDE_WORD[cele]} anteroinferior temporal encephalocele.`,
    str(values, 'tumor') === 'present' &&
      `   Tumor: ${str(values, 'tumorLoc') || 'location not stated'}${tumorFeatures.length ? `; ${joinList(tumorFeatures)}` : ''}.`,
    mal && mal !== 'none' && `   Incomplete hippocampal inversion (${SIDE_WORD[mal]}), a normal variant, with normal signal and internal architecture.`,
    str(values, 'cysts') === 'present' && '   Choroidal fissure / hippocampal sulcal remnant cyst: CSF signal, no mass effect, a normal finding.',
  )

  // 2. Neocortex
  const cortex = str(values, 'cortex')
  const features = list(values, 'cortexFeatures')
  const featureText = [
    ...features.filter((f) => f in CORTEX_FEATURE_TEXT).map((f) => CORTEX_FEATURE_TEXT[f]),
    ...features.filter((f) => f in GYRAL).map((f) => GYRAL[f].toLowerCase()),
  ]
  const loc = cortexLocation(values)
  const eloquent = str(values, 'cortexEloquent')
  const section2 = lines(
    cortex === 'none' && '2. Neocortex: No focal cortical thickening, gray-white blurring, transmantle sign, or abnormal gyral pattern identified on 3D T1 and FLAIR in all three planes.',
    cortex === 'abnormal' &&
      `2. Neocortex: ${loc ? `${cap(loc)}: ` : ''}${featureText.length ? (loc ? joinList(featureText) : cap(joinList(featureText))) : loc ? 'cortical abnormality' : 'Cortical abnormality'}.${eloquent ? ` Relation to eloquent cortex: ${eloquent}.` : ''}`,
  )

  // 3. Deep gray / periventricular
  const het = str(values, 'heterotopia')
  const hyp = str(values, 'hypothalamus')
  const deep = [
    het === 'none' && 'No heterotopia.',
    het && het !== 'none' && `${HETEROTOPIA_TEXT[het]}${str(values, 'heterotopiaLoc') ? `, ${str(values, 'heterotopiaLoc')}` : ''}.`,
    hyp === 'normal' && 'Hypothalamus normal.',
    hyp === 'hamartoma' && 'Hypothalamic hamartoma: mass at the tuber cinereum, gray-matter signal.',
  ].filter(Boolean) as string[]

  // 4. SWI
  const swi = str(values, 'swi')
  const swiFound = list(values, 'swiFindings')
  const swiText = swiFound.map((f) => label(SWI_FINDINGS, f).toLowerCase())

  // 5. Diffusion
  const dwi = str(values, 'dwi')
  const dwiCause = str(values, 'dwiCause')
  const periictal = list(values, 'periictal').map((p) => PERIICTAL_TEXT[p] ?? p)

  // 6. Other
  const injury = str(values, 'injury')
  const injuryTypes = list(values, 'injuryTypes')
  const injuryText = injuryTypes.map((t) =>
    t === 'gliosis' ? 'encephalomalacia / gliosis' : t === 'rasmussen' ? 'unilateral hemispheric atrophy with T2/FLAIR signal' : 'features of Sturge-Weber',
  )
  const otherLines = [
    injury === 'present' && `${injuryText.length ? cap(joinList(injuryText)) : 'Old injury'}${str(values, 'injuryLoc') ? `, ${str(values, 'injuryLoc')}` : ''}.`,
    str(values, 'otherText'),
  ].filter(Boolean) as string[]

  // Impression
  const hs = hsSides(values)
  const others = otherLesions(values)
  const impression: string[] = []
  if (hs.length > 0) {
    const bilateral = hs.length === 2
    const withArch = hs.every((h) => h.arch)
    const withDigit = hs.every((h) => h.digit)
    const signsText = ['volume loss', 'increased FLAIR signal', withArch && 'loss of internal architecture', withDigit && 'loss of head digitations'].filter(Boolean).join(', ')
    impression.push(`${bilateral ? 'Bilateral' : cap(SIDE_WORD[hs[0].side])} hippocampal sclerosis (${signsText}).${others.length === 0 ? ' No second lesion.' : ''}`)
  }
  {
    // A single sign on a side without HS, e.g. the contralateral hippocampus.
    for (const h of hippoSides(values).filter((side) => !hs.some((x) => x.side === side.side))) {
      const side = SIDE_WORD[h.side]
      if (h.vol && !h.sig) impression.push(`${cap(side)} hippocampal volume loss without signal change; a single sign, less specific for hippocampal sclerosis.`)
      if (h.sig && !h.vol && !h.arch) impression.push(`Increased FLAIR signal in the ${side} hippocampus with normal size and preserved architecture; could be early or mild hippocampal sclerosis, peri-ictal, or artifact.`)
      else if (h.sig && !h.vol) impression.push(`Increased FLAIR signal in the ${side} hippocampus without volume loss; a single sign, less specific for hippocampal sclerosis.`)
    }
  }
  // Dual pathology: HS plus a second lesion somewhere else.
  impression.push(...others.map((o, i) => (i === 0 && hs.length > 0 ? `Dual pathology: ${o[0].toLowerCase()}${o.slice(1)}` : o)))
  const periIctalLine = recentSeizure(values) && periIctalChanges(values)
  if (impression.length === 0) {
    if (protocol === 'full') impression.push('No epileptogenic lesion identified on a dedicated epilepsy protocol.')
    else if (protocol === 'routine') impression.push('No lesion identified; however, this study does not meet epilepsy-protocol standards; recommend dedicated 3T epilepsy MRI.')
  }
  if (periIctalLine) impression.push('Cortical FLAIR/DWI signal likely peri-ictal; recommend repeat in 6–8 weeks.')

  const noLesionRoutine = protocol === 'routine' && hs.length === 0 && others.length === 0
  const recs = list(values, 'recs')
    .filter((r) => !(r === 'protocol' && noLesionRoutine))
    .filter((r) => !(r === 'repeat' && periIctalLine))
    .map((r) => RECS_TEXT[r])

  // Warnings the rules can see
  if (str(values, 'angle') === 'off' && ['r', 'l', 'both'].includes(size)) {
    warnings.push('Coronal T2 angulation is off: check the angulation before calling hippocampal volume loss.')
  }
  if (mal && mal !== 'none') {
    for (const side of ['r', 'l'] as const) {
      if (hasSide(mal, side) && (hasSide(signal, side) || hasSide(arch, side))) {
        warnings.push(`Incomplete hippocampal inversion (${SIDE_WORD[side]}) has normal signal and architecture, but abnormal signal or architecture is marked on that side.`)
      }
    }
  }
  if (recentSeizure(values) && (hs.length > 0 || str(values, 'tumor') === 'present')) {
    warnings.push('Scan shortly after a seizure: the lesson says to recommend repeat imaging before calling a mass or HS.')
  }
  if (dwiCause === 'tumor' && str(values, 'tumor') !== 'present') {
    warnings.push('Diffusion restriction attributed to tumor, but no tumor is recorded in step 4.')
  }
  if (swiFound.includes('cav') && swiFound.includes('multicav')) {
    warnings.push('Both single and multiple cavernomas are marked.')
  }
  if (secondary === 'present' && secSide && secSide !== 'bilateral' && size && size !== 'sym') {
    const smaller = SIDE_WORD[size]
    if (smaller !== secSide && smaller !== 'bilateral') warnings.push(`Secondary signs are ipsilateral to HS, but they are marked ${secSide} while the ${smaller} hippocampus is smaller.`)
  }

  const text = lines(
    clinical.length > 0 && `CLINICAL: ${cap(clinical.join('; '))}.`,
    technique && `TECHNIQUE: ${technique}`,
    'FINDINGS:',
    section1,
    section2,
    deep.length > 0 && `3. Deep gray / periventricular: ${deep.join(' ')}`,
    swi === 'none' && '4. SWI: No hemosiderin or calcification.',
    swi === 'abnormal' && `4. SWI: ${swiText.length ? cap(joinList(swiText)) : 'Abnormal'}${str(values, 'swiLoc') ? `, ${str(values, 'swiLoc')}` : ''}.`,
    dwi === 'none' && '5. Diffusion: No restricted diffusion.',
    dwi === 'restricted' &&
      `5. Diffusion: Restricted diffusion${str(values, 'dwiLoc') ? ` in the ${str(values, 'dwiLoc')}` : ''}${dwiCause ? `, ${dwiCause === 'periictal' ? 'likely peri-ictal' : dwiCause === 'tumor' ? 'favoring tumor' : 'peri-ictal vs tumor uncertain'}` : ''}.`,
    periictal.length > 0 && `   Peri-ictal-type changes: ${joinList(periictal)}.`,
    otherLines.length > 0 && `6. Other: ${otherLines.join(' ')}`,
    'IMPRESSION:',
    impression.join('\n'),
    recs.length > 0 && `RECOMMENDATIONS: ${recs.join(' ')}`,
  )
  // Blank line before each section heading.
  const spaced = text.replace(/\n(FINDINGS:|IMPRESSION:|RECOMMENDATIONS:)/g, '\n\n$1')

  return { text: spaced, warnings }
}

/* ---------- Quiz ---------- */

const quiz: QuizQuestion[] = [
  {
    id: 'hs-best-sign',
    question: 'On the coronal T2, which single sign of hippocampal sclerosis is the most reliable?',
    options: ['Increased T2/FLAIR signal', 'Loss of head digitations', 'Volume loss (smaller hippocampus)', 'Enlarged temporal horn'],
    answer: 2,
    explanation: (
      <p>Volume loss is the most reliable sign and bright signal the second most reliable; the combination of atrophy plus T2 signal increase is highly reliable, and either alone is less specific (<Cite doi="10.1212/wnl.40.12.1869">Jackson et al., Neurology 1990</Cite>). The temporal horn is a secondary sign.</p>
    ),
  },
  {
    id: 'bright-normal-size',
    question: 'The left hippocampus is bright on FLAIR but normal in size with preserved internal architecture. How should you report it?',
    options: ['Left hippocampal sclerosis', 'Describe it without overcalling: early or mild HS, peri-ictal, or artifact', 'Normal; ignore it', 'Low-grade tumor until proven otherwise'],
    answer: 1,
    explanation: (
      <p>Bright FLAIR with normal size and preserved architecture could be early or mild HS, could be peri-ictal, could be artifact. Describe it, don't overcall it. Either sign alone is less specific (<Cite doi="10.1212/wnl.40.12.1869">Jackson et al., Neurology 1990</Cite>).</p>
    ),
  },
  {
    id: 'malrotation',
    question: 'A round, vertically oriented left hippocampus with a deep collateral sulcus, normal signal and normal internal architecture is most likely:',
    options: ['Hippocampal sclerosis', 'Hippocampal swelling after a seizure', 'Focal cortical dysplasia type I', 'Incomplete hippocampal inversion, a normal variant'],
    answer: 3,
    explanation: (
      <p>Incomplete hippocampal inversion (hippocampal malrotation) is a round, vertically oriented hippocampus with a deep collateral sulcus, usually on the left. It is a normal variant; do not call it sclerosis. Signal and internal architecture are normal.</p>
    ),
  },
  {
    id: 'transmantle',
    question: 'How do you tell a transmantle sign from a normal perivascular space?',
    options: ['The transmantle sign is bright on FLAIR; a perivascular space is CSF signal and dark on FLAIR', 'The transmantle sign enhances; a perivascular space does not', 'Only the perivascular space tapers toward the ventricle', 'They cannot be told apart on MRI'],
    answer: 0,
    explanation: (
      <p>Perivascular spaces follow vessels and are CSF-signal on all sequences (dark on FLAIR); the transmantle sign is bright on FLAIR, a tapering line running from the cortex toward the ventricle (<Cite doi="10.1212/wnl.49.4.1148">Barkovich et al., Neurology 1997</Cite>).</p>
    ),
  },
  {
    id: 'periictal',
    question: 'The MRI was done the day after status epilepticus and shows cortical FLAIR swelling and restricted diffusion. What should the report do?',
    options: ['Call a mass and recommend biopsy', 'Ignore the changes as artifact', 'Say the scan was shortly after a seizure and recommend repeat imaging before calling a mass or HS', 'Call hippocampal sclerosis if the hippocampus is involved'],
    answer: 2,
    explanation: (
      <p>A recent seizure can cause cortical T2/FLAIR swelling, restricted diffusion, and even hippocampal swelling with enhancement, usually resolving over 15–150 days, mean 62 (<Cite doi="10.1016/j.ejrad.2013.05.020">Cianfoni et al., Eur J Radiol 2013</Cite>). Say so, and recommend repeat imaging before calling a mass or HS.</p>
    ),
  },
  {
    id: 'routine-negative',
    question: 'A routine brain MRI (not an epilepsy protocol) shows no lesion. Which impression does the lesson recommend?',
    options: ['No epileptogenic lesion identified on a dedicated epilepsy protocol.', 'Normal MRI brain.', 'Non-lesional epilepsy.', 'No lesion identified; however, this study does not meet epilepsy-protocol standards; recommend dedicated 3T epilepsy MRI.'],
    answer: 3,
    explanation: (
      <p>"No epileptogenic lesion" on a dedicated epilepsy protocol is only for an adequate protocol. Routine MRI misses these lesions: in Von Oertzen et al. (2002), non-expert reports of standard MRI found a lesion in 39% of surgical candidates versus 91% on expert reading of a dedicated protocol.</p>
    ),
  },
  {
    id: 'child-first',
    question: 'In a child with drug-resistant focal epilepsy, which pathology is most common in surgical series?',
    options: ['Hippocampal sclerosis', 'Malformations of cortical development (mostly FCD)', 'Cavernoma', 'Glial scars'],
    answer: 1,
    explanation: (
      <p>In children, malformations of cortical development (mostly FCD) are ~40% and the most common; in adults hippocampal sclerosis is ~45% (<Cite doi="10.1056/NEJMoa1703784">Blümcke et al., NEJM 2017</Cite>). In an adult, think hippocampus first; in a child, think cortical dysplasia first.</p>
    ),
  },
  {
    id: 'dual',
    question: 'You have found clear right hippocampal sclerosis. What next?',
    options: ['Finish the search pattern: dual pathology occurs in roughly 10–15% of HS cases', 'Stop and report: HS explains the epilepsy', 'Recommend contrast to confirm', 'Recommend repeat in 6–8 weeks'],
    answer: 0,
    explanation: (
      <p>Dual pathology is an HS plus a second lesion somewhere else, in roughly 10–15% of HS cases. Never stop looking after you find the hippocampus. FCD type IIIa, dysplasia next to HS, is the "dual pathology" idea formalized.</p>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'epilepsy-mri',
  name: 'Epilepsy-protocol brain MRI',
  lede: 'Why it differs from a routine brain MRI, the HARNESS-MRI protocol, a fixed search pattern, the pathologies, the pitfalls, and the report.',
  sourceNote: 'HARNESS-MRI details were checked against the ILAE source. Citations checked against PubMed in September 2026; the Urbach textbook has no PubMed record and was not checked.',
  references,
  report: {
    steps,
    build,
    initial: {
      hippSize: 'sym',
      hippSignal: 'normal',
      hippArch: 'preserved',
      hippDigit: 'preserved',
      secondary: 'none',
      amygdala: 'normal',
      encephalocele: 'none',
      tumor: 'none',
      cortex: 'none',
      heterotopia: 'none',
      hypothalamus: 'normal',
      swi: 'none',
      injury: 'none',
      dwi: 'none',
      malrotation: 'none',
      cysts: 'none',
    },
  },
  learn,
  quiz,
}

export function EpilepsyMriStudyPage() {
  return <StudyPage study={study} />
}
