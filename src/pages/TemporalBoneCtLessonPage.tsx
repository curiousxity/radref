import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part I. Anatomy and inflammatory and neoplastic processes. Radiology 2013;269:17–33.', doi: '10.1148/radiol.13120733' },
  { citation: 'Juliano AF, Ginat DT, Moonis G. Imaging review of the temporal bone: part II. Traumatic, postoperative, and noninflammatory nonneoplastic conditions. Radiology 2015;276:655–672.', doi: '10.1148/radiol.2015140800' },
  { citation: 'Cavaliere M et al. CT-structured reporting in middle ear opacification: surgical results and clinical considerations from a large retrospective analysis. Front Neurol 2021;12:615356. Open access; contains the checklist and Figure 2 cases.', doi: '10.3389/fneur.2021.615356' },
  { citation: 'Baráth K et al. Neuroradiology of cholesteatomas. AJNR 2011;32:221–229.', doi: '10.3174/ajnr.A2052' },
  { citation: 'Lingam RK, Bassett P. A meta-analysis on the diagnostic performance of non-echoplanar DWI in detecting middle ear cholesteatoma: 10 years on. Otol Neurotol 2017;38:521–528.', doi: '10.1097/MAO.0000000000001353' },
  { citation: 'Lee TC et al. CT grading of otosclerosis. AJNR 2009;30:1435–1439.', doi: '10.3174/ajnr.A1558' },
  { citation: 'Belden CJ et al. CT evaluation of bone dehiscence of the superior semicircular canal. Radiology 2003;226:337–343.', doi: '10.1148/radiol.2262010897' },
  { citation: 'Vijayasekaran S et al. When is the vestibular aqueduct enlarged? AJNR 2007;28:1133–1138.', doi: '10.3174/ajnr.A0495' },
  { citation: 'Sennaroglu L, Saatci I. A new classification for cochleovestibular malformations. Laryngoscope 2002;112:2230–2241.', doi: '10.1097/00005537-200212000-00019' },
  { citation: 'Sennaroğlu L, Bajin MD. Classification and current management of inner ear malformations. Balkan Med J 2017;34:397–411. Open access.', doi: '10.4274/balkanmedj.2017.0367' },
  { citation: 'Sennaroglu L, Sarac S, Ergin T. Surgical results of cochlear implantation in malformed cochlea. Otol Neurotol 2006;27:615–623.', doi: '10.1097/01.mao.0000224090.94882.b4' },
  { citation: 'Joshi VM et al. CT and MR imaging of the inner ear and brain in children with congenital sensorineural hearing loss. RadioGraphics 2012;32:683–698.', doi: '10.1148/rg.323115073' },
  { citation: 'Ishman SL, Friedland DR. Temporal bone fractures: traditional classification and clinical relevance. Laryngoscope 2004;114:1734–1741.', doi: '10.1097/00005537-200410000-00011' },
  { citation: 'Little SC, Kesser BW. Radiographic classification of temporal bone fractures: clinical predictability using a new system. Arch Otolaryngol Head Neck Surg 2006;132:1300–1304.', doi: '10.1001/archotol.132.12.1300' },
  { citation: 'Razek AA, Huang BY. Lesions of the petrous apex: classification and findings at CT and MR imaging. RadioGraphics 2012;32:151–173.', doi: '10.1148/rg.321105758' },
]

const reportTemplate = `CT TEMPORAL BONES WITHOUT CONTRAST

TECHNIQUE: Thin-section helical axial with coronal reformats, bone algorithm;
Pöschl/Stenvers reformats of the superior semicircular canals.

RIGHT / LEFT (report each ear fully)

EAC: patent / soft tissue / wall erosion: none
TM & SCUTUM: scutum sharp / blunted / eroded
MIDDLE EAR: clear / opacified — epitympanum / mesotympanum / hypotympanum /
  sinus tympani / facial recess / aditus / antrum
  Character: fluid-like / mass-like soft tissue, non-dependent
OSSICLES: malleus ___ / incus (body, long process) ___ / stapes ___
  Tympanosclerosis: none
MASTOID: pneumatized / sclerotic; opacified: no; septal breakdown: none;
  Körner's septum: absent
FACIAL NERVE CANAL: labyrinthine ___ / geniculate ___ / tympanic ___ /
  second genu ___ / mastoid ___ ; dehiscence: none; course: normal
LABYRINTH: cochlea 2.5 turns, modiolus present; vestibule normal;
  semicircular canals intact; lateral canal fistula: none;
  superior canal dehiscence (Pöschl/Stenvers): none;
  vestibular aqueduct: normal (midpoint __ mm); otic capsule density: normal;
  fenestral / retrofenestral lucency: none; oval and round windows: patent
TEGMEN: tympani intact / thinned / dehiscent; mastoideum intact
VESSELS: sigmoid sinus position normal / anterior; sigmoid plate intact;
  jugular bulb: normal / high-riding / dehiscent; carotid canal: intact,
  normal course; foramen spinosum present
PETROUS APEX: symmetrically aerated / non-aerated marrow / lesion: none
IAC: normal caliber, symmetric
EUSTACHIAN TUBE REGION: clear / opacified
PRIOR SURGERY: none / describe (canal wall up/down, prosthesis, implant)
OTHER: TMJ, visible brain, skull base

IMPRESSION:
1. Disease summary: what, where, how far (e.g., "right attic cholesteatoma
   extending into the aditus and antrum").
2. What is eroded, ossicle by ossicle.
3. Surgical-risk anatomy, listed explicitly, including negatives
   (e.g., "dehiscent tympanic facial nerve segment; lateral canal fistula
   with intact endosteum; tegmen intact; jugular bulb high-riding but
   covered; sigmoid sinus normal position").
4. Recommendation: DWI MRI / contrast study / CTA as indicated.`

export function TemporalBoneCtLessonPage() {
  return (
    <LessonPage
      name="Temporal bone CT"
      lede="The three surgical questions, an outside-in reading order, a danger-zone checklist, the main pathologies, and a structured template. Built the same way as the sinus lesson."
      sourceNote="References were checked against PubMed; DOI links are in the last section."
      references={references}
    >
      <section className="info-card lesson-body">
        <h3>1. Why temporal bone CT is hard, and the three questions that make it simple</h3>
        <p>The temporal bone packs the hearing organ, the balance organ, the facial nerve, the carotid artery, and two big veins into a space the size of a walnut. The temptation is to look at everything at once, which is how things get missed. Instead, treat every study as answering three surgical questions:</p>
        <ol className="plain-list">
          <li><strong>What is the disease and where is it?</strong> (Which compartment, how far it extends.)</li>
          <li><strong>What has it eroded?</strong> (Ossicles one by one, tegmen, facial canal, labyrinth.)</li>
          <li><strong>What anatomy will the surgeon hit on the way in?</strong> (Facial nerve, sigmoid sinus, jugular bulb, carotid, low tegmen.)</li>
        </ol>
        <p>There is good evidence that general radiologists under-answer questions 2 and 3. Cavaliere et al. (Front Neurol 2021) compared 301 outside CT reports with surgical findings: facial canal erosion was mentioned in 18 reports but found in 76 patients at surgery; the stapes was never mentioned in any report yet was eroded in 131 patients; jugular bulb position was never described; and no report ever stated that a vascular variant was <em>absent</em>. Using a structured checklist raised agreement with surgery from "fair" (kappa 0.40) to "substantial" (kappa 0.68). That paper is the temporal-bone equivalent of the CLOSE paper: the checklist below is built from it plus the two-part Radiology review by Juliano, Ginat and Moonis.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>2. Technique and how to look</h3>
        <ul className="plain-list">
          <li><strong>Acquisition:</strong> thin-section (≤0.6 mm) helical CT, bone algorithm. Contrast is not needed for chronic ear disease, hearing loss or trauma. Contrast (or MRI) is added for suspected abscess, tumor, or skull base osteomyelitis.</li>
          <li><strong>Planes:</strong> axial and coronal are the workhorses. Two extra oblique reformats matter:
            <ul className="plain-list">
              <li><strong>Pöschl plane</strong> (parallel to the superior semicircular canal): shows the whole arc of the superior canal in one image. This is the plane for superior canal dehiscence.</li>
              <li><strong>Stenvers plane</strong> (perpendicular to the superior canal): cross-section of the canal roof; confirms what Pöschl suggests.</li>
            </ul>
          </li>
          <li><strong>Compare with the other side constantly.</strong> Most "danger zone" findings (dehiscent facial canal, thin tegmen) are easiest to call when the other ear is normal.</li>
        </ul>
        <div className="lesson-key">
          <p>One caution from the literature: partial-volume averaging on thicker slices creates fake dehiscences. Belden et al. (Radiology 2003) showed that apparent superior canal dehiscence on 1-mm scans had a positive predictive value of only about 50%, which rose to 93% with 0.5-mm slices reformatted in the plane of the canal. The same principle applies to the tegmen and facial canal: if the bone looks absent on one thick slice, check the thin data in a second plane before calling it.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>3. The reading pathway: outside in</h3>
        <p>Go through the same structures in the same order every time. Outside-in works because it follows the way disease spreads and the way the surgeon enters.</p>

        <div className="lesson-step">
          <h4>Step 1. External auditory canal (EAC)</h4>
          <p>Patent? Soft tissue? Bone erosion of the canal walls (think necrotizing otitis externa or EAC cholesteatoma)? Congenital narrowing or atresia?</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Tympanic membrane and scutum</h4>
          <p>The scutum is the sharp bony spur at the top of the eardrum on coronal images (lateral wall of the epitympanum). A blunted or eroded scutum is the classic first sign of a pars flaccida cholesteatoma.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Middle ear, compartment by compartment</h4>
          <p>The middle ear is a box with three levels: epitympanum (attic, above the eardrum), mesotympanum (level with the eardrum), hypotympanum (below). Two hidden corners matter to the surgeon: the <strong>sinus tympani</strong> (posteromedial pocket behind the stapes, hard to see from the ear canal) and the <strong>facial recess</strong>. Say which compartments are opaque and whether the opacity has a mass-like shape or is just fluid.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Ossicles, individually</h4>
          <p>Malleus (head in attic, handle in TM), incus (body in attic, long process going down to the stapes; the long process is the most vulnerable to erosion because of its thin blood supply), stapes (the smallest and most often ignored). On axial images the malleus head and incus body form the "ice cream cone": malleus head is the scoop, incus body and short process the cone. Name each ossicle as intact, eroded, or absent.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Mastoid</h4>
          <p>How well aerated is it (well pneumatized, sclerotic, or contracted)? Opacified? Are the septa between air cells intact? Loss of septa with a confluent cavity means coalescent mastoiditis. Note a <strong>Körner's septum</strong> (a bony plate splitting the mastoid into lateral and medial parts, which can make the surgeon think they have reached the antrum when they have not).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Facial nerve canal, segment by segment</h4>
          <p>Labyrinthine segment (from the IAC to the geniculate ganglion), geniculate ganglion, tympanic (horizontal) segment running just below the lateral semicircular canal and above the oval window, second genu, and mastoid (vertical) segment down to the stylomastoid foramen. The tympanic segment above the oval window is the most common site of dehiscence, both congenital and from cholesteatoma. Coronal images through the oval window are the key view.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Inner ear (otic capsule)</h4>
          <p>Cochlea: 2.5 turns, with an intact central modiolus. Vestibule. Three semicircular canals. Vestibular aqueduct (thin channel running from the vestibule to the posterior petrous surface). Oval and round windows. Look for the density of the otic capsule itself (normally the densest bone in the body); lucency in it is otosclerosis or, in children, dysplasia.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Vessels</h4>
          <p>Carotid canal (vertical then horizontal segments, with intact bone between it and the middle ear), jugular bulb (how high, and is there bone between it and the middle ear), sigmoid sinus (how far forward it sits relative to the mastoid).</p>
        </div>

        <div className="lesson-step">
          <h4>Step 9. Roof and walls</h4>
          <p>Tegmen tympani (roof over the middle ear) and tegmen mastoideum (roof over the mastoid). Thin is normal; a gap on two planes is dehiscence. Petrous apex: symmetric aeration, or fat, or a lesion?</p>
        </div>

        <div className="lesson-step">
          <h4>Step 10. Internal auditory canal and the rest of the skull base</h4>
          <p>IAC caliber (compare sides), jugular foramen margins (smooth vs moth-eaten), and a glance at the visible brain.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>4. The danger-zone checklist: FLOATS</h3>
        <p>CLOSE is a published mnemonic; there is no equally established one for the temporal bone, so this is a teaching device assembled from the Cavaliere checklist and the Juliano reviews. The habit is the same as for sinuses: state each item explicitly, including "none" or "normal," because the surgeon cannot tell silence from oversight.</p>
        <ul className="plain-list">
          <li><strong>F — Facial nerve canal.</strong> Report dehiscence by segment (tympanic, second genu, mastoid). Report an abnormal course (anteriorly displaced nerve in ear malformations, a known hazard in cochlear implant surgery per Sennaroglu). Report the geniculate ganglion if there is trauma.</li>
          <li><strong>L — Labyrinth.</strong> Is there a fistula into the lateral semicircular canal? It is the most exposed part of the inner ear during mastoid surgery. Describe whether the bony wall is thinned (incomplete fistula) or clearly breached with soft tissue in the lumen (complete fistula). Also cover superior canal dehiscence on Pöschl/Stenvers and the oval window (fixed, eroded, or obliterated).</li>
          <li><strong>O — Ossicles.</strong> Each one by name. The surgeon decides the type of reconstruction based on which ossicles survive.</li>
          <li><strong>A — Aeration and access.</strong> Mastoid pneumatization (a sclerotic mastoid means a smaller working space), Körner's septum, low-lying tegmen, and Eustachian tube region (opacified or not). Cavaliere's group found that pneumatization pattern and Eustachian tube status were almost never reported despite being surgically relevant.</li>
          <li><strong>T — Tegmen.</strong> Tegmen tympani and tegmen mastoideum: intact, thinned, or dehiscent, and whether there is soft tissue or a meningocele passing through. Also the sigmoid plate (bone between mastoid and sigmoid sinus).</li>
          <li><strong>S — Sinus and vessels.</strong> Anteriorly positioned (procident) sigmoid sinus; high-riding or dehiscent jugular bulb (a jugular bulb reaching the level of the round window, or lacking a bony cover, is what the surgeon wants to know); aberrant or dehiscent internal carotid artery; persistent stapedial artery. These are also the "do not biopsy" lesions: a bluish mass behind the eardrum can be a vessel.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>5. The pathologies you must recognize</h3>

        <h4>Cholesteatoma</h4>
        <p>A collection of skin (keratin) trapped in the middle ear that grows and erodes bone. CT is very sensitive to soft tissue but cannot tell cholesteatoma from granulation tissue or fluid by density; what makes the diagnosis on CT is a <strong>non-dependent soft-tissue mass plus bone erosion</strong> in a typical location.</p>
        <ul className="plain-list">
          <li><strong>Pars flaccida (attic) type, most common:</strong> starts in Prussak's space (the small pocket between the top of the eardrum and the malleus neck). Blunts the scutum, pushes the ossicles <strong>medially</strong>, then grows backward into the aditus and antrum.</li>
          <li><strong>Pars tensa type:</strong> starts posterosuperior, lies <strong>medial</strong> to the ossicles and pushes them laterally, erodes the incus long process and stapes early, and likes to hide in the sinus tympani.</li>
          <li><strong>Congenital cholesteatoma:</strong> a smooth round mass behind an intact eardrum in a child, typically anterior mesotympanum, no history of otitis.</li>
        </ul>
        <p>Report extent, each ossicle, and every FLOATS item. When CT is uncertain (opacified postoperative ear, or an opaque middle ear without erosion), the answer is <strong>non-echo-planar diffusion-weighted MRI</strong>: cholesteatoma is bright on DWI. In the meta-analysis by Lingam and Bassett (Otol Neurotol 2017), pooled sensitivity was 0.91 and specificity 0.92 across 26 studies, and it is now widely used instead of second-look surgery. The Baráth AJNR review covers the MRI protocol.</p>

        <h4>Chronic otitis media without cholesteatoma</h4>
        <p>Mucosal thickening, fluid, tympanosclerosis (calcified plaques in the eardrum or around the ossicles, which fix them), and ossicular erosion can all occur without cholesteatoma. If there is no mass-like tissue and no scutum erosion, say "no CT evidence of cholesteatoma; DWI MRI if clinically suspected."</p>

        <h4>Acute mastoiditis and its complications</h4>
        <p>Fluid in the mastoid alone is common and often meaningless (it is present in many head CTs). Mastoiditis becomes surgical when the air-cell <strong>septa dissolve</strong> (coalescent mastoiditis). Then look outward for: subperiosteal abscess (lateral), Bezold abscess (through the mastoid tip into the neck), sigmoid sinus thrombosis and epidural abscess (posterior, needs contrast), and labyrinthitis or petrous apicitis (medial). Say "recommend contrast-enhanced CT or MRI" when you see coalescence.</p>

        <h4>Otosclerosis</h4>
        <p>Abnormal spongy bone replacing the normally dense otic capsule. Two patterns:</p>
        <ul className="plain-list">
          <li><strong>Fenestral:</strong> a small lucent spot just in front of the oval window (the fissula ante fenestram). Causes conductive hearing loss by fixing the stapes. Look for it on axial images at the level of the oval window; compare sides.</li>
          <li><strong>Retrofenestral (cochlear):</strong> a lucent halo around the cochlea ("double ring"). Causes sensorineural loss.</li>
        </ul>
        <p>The Symons/Fanning grading, validated by Lee et al. (AJNR 2009) with excellent reader agreement: grade 1 fenestral only; grade 2 patchy cochlear disease (2A basal turn, 2B middle/apical turns, 2C both); grade 3 diffuse confluent cochlear involvement. Grade matters because cochlear disease affects surgical options.</p>

        <h4>Superior semicircular canal dehiscence (SSCD)</h4>
        <p>Missing bone over the top of the superior canal, so sound and pressure move the inner ear fluid abnormally (vertigo with loud sounds, hearing your own eyeballs move). Call it only on thin-section Pöschl and Stenvers reformats, for the reason explained above. Report length of the gap and whether it is under the arcuate eminence or at the superior petrosal sinus.</p>

        <h4>Congenital inner ear malformations (pediatric sensorineural loss, cochlear implant work-up)</h4>
        <p>Use the Sennaroglu classification, because surgeons use it. From most to least severe: Michel (no inner ear), cochlear aplasia, common cavity (cochlea and vestibule are one cyst), incomplete partition type I (cochlea and vestibule both cystic, no modiolus, no enlarged aqueduct), cochlear hypoplasia, incomplete partition type II (the classic Mondini: 1.5 turns with a cystic apex, mildly dilated vestibule, <strong>enlarged vestibular aqueduct</strong>).</p>
        <p>Enlarged vestibular aqueduct is the most common CT-visible cause of pediatric sensorineural loss. Vijayasekaran et al. (AJNR 2007) measured normal children and set the cutoff: midpoint width ≥1.0 mm or opercular width ≥2.0 mm is enlarged. Also report the IAC (a defective fundus or absent canal means a possible absent cochlear nerve, which needs MRI). The Joshi RadioGraphics article walks through all of this with pictures.</p>

        <h4>Trauma</h4>
        <p>Stop using "longitudinal vs transverse" as the main descriptor. Two independent studies showed it predicts complications poorly: Ishman and Friedland (Laryngoscope 2004) found CSF leak was 9.8 times more common when the fracture involved the petrous bone, and Little and Kesser (Arch Otolaryngol 2006) found otic capsule–violating fractures carried 5× the facial nerve injury, 25× the sensorineural loss and 8× the CSF otorrhea of otic capsule–sparing fractures. So the first line of your report is: <strong>otic capsule sparing or violating.</strong> Then: fracture through the facial canal (which segment), ossicular dislocation (incudostapedial is most common; incudomalleolar separation looks like the ice cream fallen off the cone), carotid canal involvement (recommend CTA), tegmen breach (CSF leak risk), hemotympanum, and any pneumocephalus or pneumolabyrinth (air inside the inner ear means a window fracture or otic capsule fracture).</p>

        <h4>Vascular variants and "do not biopsy" masses</h4>
        <ul className="plain-list">
          <li><strong>Aberrant internal carotid artery:</strong> the carotid runs through the middle ear across the cochlear promontory. Clues: absent bone over the vertical carotid segment, a tubular density crossing the promontory, enlarged inferior tympanic canaliculus.</li>
          <li><strong>Dehiscent jugular bulb:</strong> the jugular bulb bulges into the hypotympanum with no sigmoid plate covering it.</li>
          <li><strong>Persistent stapedial artery:</strong> absent foramen spinosum plus an enlarged tympanic facial canal.</li>
          <li><strong>Paraganglioma (glomus tympanicum):</strong> a soft-tissue mass on the promontory with an intact jugular plate. If the bone between jugular foramen and middle ear is eroded with a moth-eaten (permeative) margin, it is a glomus jugulotympanicum; recommend MRI.</li>
        </ul>

        <h4>Petrous apex</h4>
        <p>Razek and Huang (RadioGraphics 2012) organize it well. The commonest "lesion" is not a lesion: asymmetric pneumatization (fatty marrow on one side looks bright on T1 MRI) or trapped fluid in an aerated apex. Real lesions: cholesterol granuloma (expansile, smooth margins, T1 and T2 bright on MRI), epidermoid/cholesteatoma (expansile, DWI bright), petrous apicitis (air cells opacified with erosive margins, in a septic patient), and tumors (chondrosarcoma, chordoma, metastasis).</p>

        <h4>Necrotizing (malignant) otitis externa</h4>
        <p>Soft tissue in the EAC that erodes the canal floor and spreads to the skull base in an elderly diabetic or immunocompromised patient. On CT, look for bone erosion around the EAC, the stylomastoid foramen and the temporomandibular joint region. Say so and recommend MRI to map the skull base marrow.</p>

        <h4>The postoperative ear</h4>
        <ul className="plain-list">
          <li><strong>Canal wall up mastoidectomy:</strong> mastoid air cells removed, posterior EAC wall kept.</li>
          <li><strong>Canal wall down:</strong> posterior EAC wall removed, so mastoid and ear canal become one cavity. Soft tissue in the cavity is the question: recurrence vs debris. DWI MRI answers it.</li>
          <li><strong>Ossicular prostheses</strong> (PORP, TORP): bright metal or ceramic. Report whether it is in line between the eardrum/malleus and the stapes or oval window, or displaced.</li>
          <li><strong>Cochlear implant:</strong> electrode should spiral inside the cochlea in the basal turn onward. Report tip fold-over (electrode curls back on itself, seen on axial) or extracochlear position.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>6. Cases from the literature to anchor the patterns</h3>
        <ul className="plain-list">
          <li><strong>Tegmen and facial canal erosion by cholesteatoma:</strong> Cavaliere et al. Figure 2 shows, side by side, the coronal CT and the surgical view of a tegmen interruption, an eroded tympanic facial segment, and a lateral canal fistula. It makes the "thin line on CT equals exposed nerve at surgery" idea concrete.</li>
          <li><strong>SSCD, real vs fake:</strong> Belden et al. show six patients whose "dehiscence" on 1-mm scans disappeared on 0.5-mm reformats. The case series to remember before you call a dehiscence.</li>
          <li><strong>Enlarged vestibular aqueduct with IP-II:</strong> Sennaroglu and Saatci (Laryngoscope 2002) document that every IP-II ear had an enlarged aqueduct and no IP-I ear did, which is why measuring the aqueduct helps you classify the cochlea.</li>
          <li><strong>Facial nerve displacement in malformed ears:</strong> Sennaroglu, Sarac and Ergin (Otol Neurotol 2006) describe a dehiscent, anteriorly placed facial nerve in an IP-I ear that forced a change in surgical approach, and CSF gushers in four of twenty implanted malformed ears. This is why your pre-implant report must state facial nerve course and cochlear partition.</li>
          <li><strong>Otic capsule–violating fracture outcomes:</strong> Little and Kesser's series is the reference to quote when a trauma clinician asks why you did not say "transverse."</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>7. A workable structured template</h3>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>Two habits carry over from the sinus lesson: write "none" for each danger item rather than staying silent, and move the danger anatomy into the impression. A third habit is specific to this study: never write "ossicular chain erosion" without naming which ossicle, since the Cavaliere data show that is exactly where general reports fall short.</p>
        </div>
      </section>
    </LessonPage>
  )
}
