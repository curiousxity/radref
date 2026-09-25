import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: "O'Brien WT et al. The preoperative sinus CT: avoiding a \"CLOSE\" call with surgical complications. Radiology 2016;281:10–21. (The core paper; excellent figures for each CLOSE item.)" },
  { citation: 'Vaid S et al. An imaging checklist for pre-FESS CT: framing a surgically relevant report. Clin Radiol 2011;66:459–470. (Structured report; case figures for Onodi/optic nerve, carotid septa, low fovea.)' },
  { citation: 'Lund VJ, Mackay IS. Staging in rhinosinusitis. Rhinology 1993;31:183–184.' },
  { citation: 'Keros P. On the practical value of differences in the level of the lamina cribrosa of the ethmoid. Z Laryngol Rhinol Otol 1962. (Original Keros classification.)' },
  { citation: 'Wormald PJ et al. The International Frontal Sinus Anatomy Classification (IFAC). Int Forum Allergy Rhinol 2016. (Frontal recess cell naming.)' },
  { citation: 'Hoang JK et al. Multiplanar sinus CT: a systematic approach to imaging before functional endoscopic sinus surgery. AJR 2010;194:W527–536. (Good multiplanar teaching cases.)' },
  { citation: 'Tewfik MA et al. Surgeon versus radiologist: an inter-rater reliability analysis of the CLOSE checklist. Eur Arch Otorhinolaryngol 2025.' },
  { citation: 'Ahmed et al. Improving CT sinus reporting for ESS using the CLOSE criteria: a QI project. 2025, PMC12702529.' },
]

const reportTemplate = `CT SINUS WITHOUT CONTRAST — PRE-FESS

TECHNIQUE: Thin-section axial with coronal and sagittal reformats, bone and soft-tissue windows.

DISEASE EXTENT:
  Frontal: R __ / L __        Anterior ethmoid: R __ / L __
  Posterior ethmoid: R __ / L __   Maxillary: R __ / L __
  Sphenoid: R __ / L __        OMC: R __ / L __
  Lund-Mackay: __/24
  Character: mucosal thickening / polypoid / hyperdense material / fluid level / osteitis

DRAINAGE PATHWAYS:
  Septum: deviation (direction, spur, contact)
  Middle turbinates: concha bullosa / paradoxical
  Uncinate: attachment (lamina / skull base / middle turbinate), pneumatized
  OMC: patent / obstructed by ___
  Frontal recess: patent / narrowed by (agger nasi, supra agger, suprabulla, frontal cells)
  Sphenoethmoidal recess: patent / obstructed
  Haller cells: present / absent

CRITICAL ANATOMY (CLOSE):
  C — Olfactory fossa depth: R __ mm (Keros __) / L __ mm (Keros __); asymmetry; skull-base dehiscence: none
  L — Lamina papyracea: intact / dehiscent (side, slice)
  O — Onodi cell: absent / present (side); optic nerve dehiscent: yes/no
  S — Sphenoid pneumatization: sellar/presellar/conchal; ICA dehiscence: none; optic nerve dehiscence: none; septum attaching to carotid canal: none
  E — Anterior ethmoidal artery: within skull base / below skull base (mesentery), side

PRIOR SURGERY: none / describe

OTHER: orbits, brain, nasopharynx, dental disease

IMPRESSION:
  1. Disease summary (pattern + severity).
  2. Obstructed pathways and cause.
  3. Surgical-risk anatomy, listed explicitly (e.g., "Keros type III on the right; anterior ethmoidal artery below the skull base bilaterally; left Onodi cell with dehiscent optic nerve").
  4. Any red flag (unilateral disease, bone destruction) with recommendation.`

export function SinusCtLessonPage() {
  return (
    <LessonPage
      name="CT sinus before FESS"
      lede="Disease burden, blocked drainage pathways, and the CLOSE danger-zone checklist the surgeon needs before endoscopic sinus surgery."
      sourceNote="Built around O'Brien et al. (Radiology 2016) and the Vaid et al. pre-FESS checklist (Clin Radiol 2011)."
      references={references}
      referencesNote="The Lund-Mackay, Keros, IFAC and Hoang citations were not verified against a database at the time of writing; double-check page numbers if citing formally."
    >
      <section className="info-card lesson-body">
        <p>This is one of the most protocol-friendly reads in radiology, because the surgeon wants a fixed set of answers every time.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>1. What the surgeon is actually asking you</h3>
        <p>Think of the pre-FESS CT as answering three questions, in this order:</p>
        <ol className="plain-list">
          <li><strong>Where is the disease and how much?</strong> (so they know what to operate on)</li>
          <li><strong>Which drainage pathways are blocked, and what's blocking them?</strong> (so they know what to open)</li>
          <li><strong>Where are the dangerous walls?</strong> (so they don't go through the skull base, the orbit, or an artery)</li>
        </ol>
        <p>Question 3 is where reports most often fail. Preoperative CT gives radiologists the chance to identify anatomic variants that predispose patients to major surgical complications, but these critical variants are not consistently evaluated or documented on preoperative reports. The fix is the <strong>CLOSE</strong> mnemonic from O'Brien et al. (Radiology 2016): Cribriform plate, Lamina papyracea, Onodi cell, Sphenoid sinus pneumatization, and (anterior) Ethmoidal artery. Missing these can lead to CSF leaks, orbital injury, or hemorrhage from the anterior ethmoidal or internal carotid arteries.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>2. Set up before you look at anything</h3>
        <ul className="plain-list">
          <li><strong>Bone window, coronal first.</strong> Coronals mirror what the endoscopist sees. Then axial, then sagittal.</li>
          <li><strong>Don't skip sagittal.</strong> It's the plane that shows the frontal recess and the slope of the skull base.</li>
          <li><strong>Scroll front to back</strong> (frontal sinus → ethmoids → sphenoid), because that is the surgeon's path.</li>
          <li><strong>Check soft-tissue window</strong> once, for hyperdense material (fungus, blood) and for anything outside the sinuses.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>3. Step-by-step read</h3>

        <div className="lesson-step">
          <h4>Part A. Disease burden (Lund-Mackay)</h4>
          <p>Score each of six areas per side: maxillary, anterior ethmoid, posterior ethmoid, frontal, sphenoid, and ostiomeatal complex (OMC).</p>
          <ul className="plain-list">
            <li>Sinuses: 0 = clear, 1 = partial opacification, 2 = complete.</li>
            <li>OMC: 0 = open, 2 = blocked.</li>
            <li>Maximum 24 (Lund & Mackay, Rhinology 1993).</li>
          </ul>
          <p>You don't have to put the number in every report, but scoring forces you to look at every sinus, which is the point. Also note the <em>character</em> of the opacification: mucosal thickening vs. fluid level vs. polyp vs. hyperdense material (see section 4).</p>
        </div>

        <div className="lesson-step">
          <h4>Part B. Drainage pathways (what's blocked and why)</h4>
          <p>There are three "doors" the surgeon opens. For each: is it open, and if not, what closes it?</p>
          <p><strong>1. Ostiomeatal complex</strong> (drains maxillary, anterior ethmoid, frontal). On coronal, find the uncinate process, the ethmoid bulla, the infundibulum between them, and the middle meatus. Common blockers:</p>
          <ul className="plain-list">
            <li>Septal deviation or spur pushing the middle turbinate laterally</li>
            <li>Concha bullosa (air in the middle turbinate)</li>
            <li>Paradoxical middle turbinate (curves the wrong way)</li>
            <li>Haller (infraorbital ethmoid) cell narrowing the infundibulum from above</li>
            <li>Large ethmoid bulla</li>
            <li>Uncinate pneumatization or lateralized uncinate</li>
          </ul>
          <p><strong>2. Frontal recess</strong> (drains frontal sinus). Best seen on sagittal. Name the cells crowding it: agger nasi, supra agger cells, suprabulla cells, and frontal cells that push up into the sinus. The modern naming system is the International Frontal Sinus Anatomy Classification (IFAC, Wormald et al. 2016). Variants here are frequent: that study found suprabulla cells in 88% and supra agger cells in 48% of scans.</p>
          <p><strong>3. Sphenoethmoidal recess</strong> (drains posterior ethmoid and sphenoid). Axial and sagittal. Look for opacification of the recess and the sphenoid ostium.</p>
          <p>Also comment on the <strong>uncinate's superior attachment</strong>: to the lamina papyracea (most common; the frontal sinus then drains medial to it), to the skull base, or to the middle turbinate. It changes where the surgeon cuts.</p>
        </div>

        <div className="lesson-step">
          <h4>Part C. Danger zones (CLOSE)</h4>
          <p><strong>C — Cribriform plate / skull base.</strong> Measure the depth of the olfactory fossa on coronal: from the level of the fovea ethmoidalis (ethmoid roof) down to the cribriform plate. Keros type I is ≤3 mm, type II is 4–7 mm, and type III is {'>'}7 mm. Deeper fossa = taller, thinner lateral lamella = higher CSF-leak risk. Also report <strong>asymmetry</strong> between sides (a surgeon operating with one side's depth in mind can breach the lower side), a <strong>low-lying or medially sloping fovea</strong>, and any <strong>dehiscence</strong> of the skull base.</p>
          <p><strong>L — Lamina papyracea.</strong> Trace the medial orbital wall on every coronal slice. Look for dehiscence, medial bowing, or prior fracture. Also note orbital fat herniating into the ethmoid. A dehiscent lamina is where the surgeon enters the orbit.</p>
          <p><strong>O — Onodi cell (sphenoethmoidal cell).</strong> A posterior ethmoid cell that sits above or lateral to the sphenoid. Why it matters: the optic nerve runs in its wall, so the surgeon expecting sphenoid finds nerve instead. Best seen on coronal (look for a horizontal septum above the sphenoid) and confirmed on sagittal. Say whether the optic nerve is dehiscent into it.</p>
          <p><strong>S — Sphenoid sinus pneumatization.</strong> Grade it (sellar, presellar, conchal) and, more importantly, check the walls for bulges and dehiscence of the <strong>internal carotid artery</strong> and <strong>optic nerve</strong>. Note <strong>intersinus septa that attach to the carotid canal</strong>: if the surgeon breaks that septum, the carotid can tear. Vaid et al. illustrate exactly this, including a hyperpneumatized sphenoid with an endosinal foramen rotundum and bilateral optic nerve dehiscence. Also check the vidian canal and foramen rotundum for protrusion into the sinus.</p>
          <p><strong>E — Anterior ethmoidal artery.</strong> On coronal, find the notch in the medial orbital wall just behind the frontal recess/anterior ethmoid; the artery crosses the ethmoid roof there. Key question: is it <strong>in the skull base</strong> (safe) or <strong>hanging free in a mesentery below the roof</strong> (at risk: cutting it causes orbital hematoma, and the vessel can retract into the orbit). The gap between the artery and the roof usually goes with a well-pneumatized supraorbital region.</p>
          <div className="lesson-key">
            <p><strong>Bonus items surgeons value:</strong> the extent of prior surgery (which walls are already gone: middle turbinate, uncinate, bulla), and a general description of osteitis or bony thickening, which makes surgery harder and suggests chronic disease.</p>
          </div>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>4. Pathologies you'll meet, and the words to use</h3>
        <ul className="plain-list">
          <li><strong>Chronic rhinosinusitis</strong>: mucosal thickening, often with osteitis. The classic pair is complete maxillary opacification with central increased attenuation from inspissated secretions and/or fungal colonization, plus thickened sclerotic sinus walls from chronic inflammation.</li>
          <li><strong>Nasal polyposis</strong>: bilateral polypoid soft tissue filling the nasal cavity and ethmoids; widened infundibula and thinned/remodeled bone (smooth, not destroyed).</li>
          <li><strong>Allergic fungal sinusitis</strong>: multiple sinuses filled with <strong>hyperdense</strong> material on soft-tissue window, expanded sinuses, thinned walls; often young, atopic patients. Flag it: the surgeon will plan wider clearance and expect eosinophilic mucin.</li>
          <li><strong>Fungal ball (mycetoma)</strong>: single sinus (usually maxillary), hyperdense with tiny calcifications, thickened wall.</li>
          <li><strong>Mucocele</strong>: completely opacified, expanded sinus with remodeled walls; frontal and ethmoid most common. Note orbital or intracranial extension.</li>
          <li><strong>Silent sinus syndrome</strong>: small, opacified maxillary sinus with inward-bowed walls and enophthalmos.</li>
          <li><strong>Acute sinusitis complications</strong>: air-fluid levels are the acute sign; check for orbital cellulitis, subperiosteal abscess, and intracranial extension. These are a different report.</li>
          <li><strong>Red flags for tumor</strong>: <em>unilateral</em> disease, bone <em>destruction</em> (not remodeling), extension outside the sinus, invasion of the pterygopalatine fossa or orbit. Recommend MRI.</li>
          <li><strong>Odontogenic sinusitis</strong>: unilateral maxillary disease with a periapical lucency or oroantral communication. Say so; the treatment is different.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>5. What the report should contain</h3>
        <p>Vaid et al. (Clin Radiol 2011) proposed a surgical checklist that maps neatly onto a template: nasal septum; middle turbinate and uncinate process; OMC and maxillary sinus; frontal sinus drainage pathway and frontal sinus; anterior ethmoid sinuses; basal lamella; posterior ethmoid and sphenoid sinuses; anterior skull base; anterior ethmoidal artery; lamina papyracea; bony margins of the sinuses; brain, orbit, and nasopharynx.</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Two habits that make the report useful: state <strong>"none"</strong> explicitly for each CLOSE item rather than staying silent (the surgeon can't tell silence from oversight), and put the danger anatomy in the impression, not buried in findings. Implementing the CLOSE checklist substantially improved the quality and consistency of CT sinus reporting in the quality-improvement study below.</p>
        </div>
      </section>
    </LessonPage>
  )
}
