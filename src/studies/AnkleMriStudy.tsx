import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import { lines, list, num, optionLabel, str } from '../study/types'
import type { Derived, Field, LearnSection, Option, ReportStep, StudyDefinition, Values } from '../study/types'

const SAWANT = '10.4103/ijri.IJRI_77_16'
const SZARO_BME = '10.1186/s13244-020-00900-8'
const WALTHER = '10.1177/19476035231161806'
const OAE = '10.1148/radiol.2271011865'
const KIMURA = '10.1177/2058460120980145'
const ROSENBERG = '10.1148/radiology.169.1.3420263'
const DAVDA = '10.1302/2058-5241.2.160047'
const HUUSKONEN = '10.1186/s13047-023-00604-4'
const SZARO_ACHILLES = '10.1016/j.ejro.2021.100343'
const LAVERY = '10.1186/s13018-016-0430-x'
const LEKTRAKUL = '10.1148/radiology.219.3.r01jn31802'
const ERICKSON = '10.2214/ajr.155.2.2115260'
const DRAGHI = '10.1007/s13244-016-0533-2'
const BALEN = '10.2214/ajr.176.5.1761137'
const BERKOWITZ = '10.1148/radiology.179.3.2027971'

const references: LessonReference[] = [
  { citation: 'Sawant YN, Sanghvi D. Magnetic resonance imaging of ankle ligaments: a pictorial essay. Indian J Radiol Imaging. 2018;28(4):419-426.', doi: SAWANT },
  { citation: 'Szaro P, Geijer M, Solidakis N. Traumatic and non-traumatic bone marrow edema in ankle MRI: a pictorial essay. Insights Imaging. 2020;11(1):97.', doi: SZARO_BME },
  { citation: 'Walther M, Gottschalk O, Madry H, et al. Etiology, classification, diagnostics, and conservative management of osteochondral lesions of the talus. 2023 recommendations of the Working Group "Clinical Tissue Regeneration" of the German Society of Orthopedics and Traumatology. Cartilage. 2023;14(3):292-304.', doi: WALTHER },
  { citation: 'Oae K, Takao M, Naito K, Uchio Y, Kono T, Ishida J, Ochi M. Injury of the tibiofibular syndesmosis: value of MR imaging for diagnosis. Radiology. 2003;227(1):155-161.', doi: OAE },
  { citation: 'Kimura Y, Yamashiro T, Saito Y, Kitsukawa K, Niki H, Mimura H. MRI findings of spring ligament injury: association with surgical findings and flatfoot deformity. Acta Radiol Open. 2020;9(12):2058460120980145.', doi: KIMURA },
  { citation: 'Rosenberg ZS, Cheung Y, Jahss MH, Noto AM, Norman A, Leeds NE. Rupture of posterior tibial tendon: CT and MR imaging with surgical correlation. Radiology. 1988;169(1):229-235.', doi: ROSENBERG },
  { citation: 'Davda K, Malhotra K, O\'Donnell P, Singh D, Cullen N. Peroneal tendon disorders. EFORT Open Rev. 2017;2(6):281-292.', doi: DAVDA },
  { citation: 'Huuskonen M, Borkmann S, Bengtsson A, Sobecki P, Józwiak R, Solidakis N, Szaro P. Radiological features accompanying peroneus brevis split rupture revealed on magnetic resonance imaging: a cohort study. J Foot Ankle Res. 2023;16(1):10.', doi: HUUSKONEN },
  { citation: 'Szaro P, Nilsson-Helander K, Carmont M. MRI of the Achilles tendon: a comprehensive pictorial review. Part two. Eur J Radiol Open. 2021;8:100343.', doi: SZARO_ACHILLES },
  { citation: 'Lavery KP, McHale KJ, Rossy WH, Theodore G. Ankle impingement. J Orthop Surg Res. 2016;11(1):97.', doi: LAVERY },
  { citation: 'Lektrakul N, Chung CB, Lai Ym, Theodorou DJ, Yu J, Haghighi P, Trudell D, Resnick D. Tarsal sinus: arthrographic, MR imaging, MR arthrographic, and pathologic findings in cadavers and retrospective study data in patients with sinus tarsi syndrome. Radiology. 2001;219(3):802-810.', doi: LEKTRAKUL },
  { citation: 'Erickson SJ, Quinn SF, Kneeland JB, Smith JW, Johnson JE, Carrera GF, Shereff MJ, Hyde JS, Jesmanowicz A. MR imaging of the tarsal tunnel and related spaces: normal and abnormal findings with anatomic correlation. AJR Am J Roentgenol. 1990;155(2):323-328.', doi: ERICKSON },
  { citation: 'Draghi F, Gitto S, Bortolotto C, Draghi AG, Ori Belometti G. Imaging of plantar fascia disorders: findings on plain radiography, ultrasound and magnetic resonance imaging. Insights Imaging. 2017;8(1):69-78.', doi: DRAGHI },
  { citation: 'Balen PF, Helms CA. Association of posterior tibial tendon injury with spring ligament injury, sinus tarsi abnormality, and plantar fasciitis on MR imaging. AJR Am J Roentgenol. 2001;176(5):1137-1143.', doi: BALEN },
  { citation: 'Berkowitz JF, Kier R, Rudicel S. Plantar fasciitis: MR imaging. Radiology. 1991;179(3):665-667.', doi: BERKOWITZ },
]

const costaPazTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Appearance</th>
          <th>Associated with</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="vessel-name">I</td>
          <td>Diffuse or reticular BME, at some distance from the articular cartilage</td>
          <td>Usually a contrecoup mechanism</td>
        </tr>
        <tr>
          <td className="vessel-name">II</td>
          <td>Localized or geographic BME, often with a convex margin and contiguous to the articular cartilage or bony outline</td>
          <td>Usually trauma to the ligament attachment, articular capsule or retinaculum</td>
        </tr>
        <tr>
          <td className="vessel-name">III</td>
          <td>BME, often with slight deformation or disruption of the bony outline</td>
          <td>Often a fracture or osteochondral lesion</td>
        </tr>
      </tbody>
    </table>
  </div>
)

const heppleTable = (
  <div className="table-wrap">
    <table className="ref-table">
      <thead>
        <tr>
          <th>Stage</th>
          <th>MRI finding</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="vessel-name">I</td><td>Articular cartilage damage only</td></tr>
        <tr><td className="vessel-name">IIA</td><td>Cartilage damage with underlying fracture and surrounding bony edema</td></tr>
        <tr><td className="vessel-name">IIB</td><td>IIA without bony edema</td></tr>
        <tr><td className="vessel-name">III</td><td>Detached but undisplaced fragment</td></tr>
        <tr><td className="vessel-name">IV</td><td>Detached and displaced fragment</td></tr>
        <tr><td className="vessel-name">V</td><td>Subchondral cyst formation</td></tr>
      </tbody>
    </table>
  </div>
)

const learn: LearnSection[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the global look',
    body: (
      <>
        <p>This lesson is for the ankle MRI that arrives with a history of pain and little else, so it walks a fixed search pattern through every compartment. The order is this site's own; none of the papers below prescribes it.</p>
        <p>The protocol should have sequences in all three orthogonal planes, with an axial oblique plane added if the flexor tendons need closer analysis. Fat-suppressed T2- or proton-density-weighted imaging is mandatory, and at least one T1-weighted sequence is needed for the bone marrow (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>Start with the marrow as a whole. Bone marrow edema (BME), or bone bruise, is low signal on T1-weighted images and high signal on T2-weighted and fluid-sensitive sequences such as STIR or fat-suppressed images. It is an unspecific but sensitive sign of the primary pathology, and where it sits guides a systematic read of the rest of the examination (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>Then look at the joint fluid. One cohort study coded effusion in three levels: no gap between the talus and the adjacent fat pad in the anterior recess (no effusion); fluid making that gap, with fluid expanding the posterior recess (moderate); and fluid also making a gap between the anterior tibia and its fat pad (severe) (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). That is the study's own coding rather than a validated grade, so use it to describe the effusion, not to score it.</p>
      </>
    ),
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    body: (
      <>
        <h4>Bruise pattern as a pointer to mechanism</h4>
        <p>After an inversion injury, extensive reticular BME is seen in the medial ankle, mainly the medial and posteromedial talus and the medial malleolus, from a contrecoup injury, with usually small areas of BME at the avulsion side in the lateral malleolus. An eversion injury usually gives the inverse distribution. Geographic BME in the medial talar trochlea may indicate an avulsion of the deltoid ligament (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>Szaro and colleagues reproduce the Costa-Paz classification of BME (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>):</p>
        {costaPazTable}

        <h4>Fracture</h4>
        <p>The absence of a hypointense line on T1-weighted images excludes a complete fracture. A stress fracture shows as linear low-signal lines perpendicular to the load axis, usually surrounded by extensive BME; slight periosteal edema is the first sign, followed by BME in the medullary cavity if untreated. Stress reaction is often seen in the distal tibia, distal fibula or calcaneus, and overuse lesions occur in the subchondral talar trochlea (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>BME from overuse or trauma usually resolves after about 3 months, while symptoms usually settle sooner, after about 6 weeks (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>

        <h4>Osteochondral lesion of the talus</h4>
        <p>In the series Walther and colleagues quote, 96.2% of lesions lay on the medial (62.8%) or lateral (33.4%) talar dome (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>). An unstable osteochondral lesion is a bone fragment that loses contact, displaces, or separates from the bone into the joint fluid (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>The Hepple MRI staging, as Walther and colleagues reproduce it in their Table 5 (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>):</p>
        {heppleTable}
        <p>Note that the same working group recommends the Berndt and Harty classification modified by Loomer, and the Giannini, ICRS and Outerbridge classifications; Hepple is described but is not on that list (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>
        <p>Two cautions from the same paper. MRI tends to overestimate the size of a bony defect because of the edema around it, whereas CT shows its width and depth precisely. And an intact cartilage surface on MRI may not be the truth: in the study they quote, MRI had 91% sensitivity but only 55% specificity for Outerbridge grading. The depth of the lesion on MRI, subchondral cyst formation and the extent of BME are risk factors for progression, and follow-up imaging after 12 months helps not to miss it (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>

        <h4>Accessory bones and other marrow patterns</h4>
        <p>BME in an accessory bone suggests it is symptomatic. The commonest accessory bones are the os peroneum, os naviculare accessorium and os trigonum; a symptomatic os trigonum usually shows BME in both the ossicle and the adjacent talus. A serpentine marrow line indicates a bone infarct: on T2-weighted images it has an inner low-signal and outer high-signal component, the double line sign. The commonest coalitions are calcaneonavicular and between the middle facet of the talus and the calcaneus, and a fibrous coalition can cause overuse BME (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
      </>
    ),
  },
  {
    id: 'lateral-ligaments',
    title: 'Step 3. Lateral ligaments (ATFL, CFL, PTFL)',
    body: (
      <>
        <p>Inversion causes about 85% of ankle sprains, and the anterior talofibular ligament (ATFL), being the weakest, is more prone to injury. The posterior talofibular ligament (PTFL) is the strongest, deepest and least injured of the lateral ligaments (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>The ATFL and PTFL are best identified on axial images where the talar dome is oblong and the fibula crescent-shaped. An oblique coronal plane (the "CFL view") shows the calcaneofibular ligament (CFL) better than the orthogonal planes. Normal thickness is 2 to 3 mm for the ATFL and 2 mm for the CFL (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <div className="lesson-key">
          <p>Do not call striations a tear: the normal PTFL, the deep deltoid and the anterior inferior tibiofibular ligament show heterogeneous signal and striations because of fat between their fascicles (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        </div>
        <p>Acute ligament injuries are graded as interstitial, partial or complete tear (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>):</p>
        <ul className="plain-list">
          <li><strong>Interstitial:</strong> hyperintense signal within the ligament on PD and T2-weighted images, from edema or hemorrhage.</li>
          <li><strong>Partial:</strong> partial discontinuity reaching the surface but not involving the entire thickness of the ligament.</li>
          <li><strong>Complete:</strong> discontinuity of the entire thickness, seen as a fluid-filled defect with retraction.</li>
        </ul>
        <p>Acute injury shows blurred margins, irregular contours, discontinuous, wavy or lax fibres, inhomogeneous signal, or loss of the normal low signal; the PTFL, deep deltoid and AITFL lose their normal striations. Chronic injury shows an attenuated (thin) or thickened ligament with irregular contours and no edema or hemorrhage (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Check the peroneal tendons next door: peroneal tendinosis is commonly seen with ATFL injury, and a partial longitudinal tear of peroneus brevis is commonly associated with lateral sprain (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
      </>
    ),
  },
  {
    id: 'syndesmosis',
    title: 'Step 4. Syndesmosis',
    body: (
      <>
        <p>High ankle (syndesmotic) sprains account for 7% of routine ankle sprains and 40% of injuries in athletes. The anterior and posterior inferior tibiofibular ligaments (AITFL, PITFL) are best identified on axial images where the talar dome is square and the fibula round, and a 45° oblique plane shows them better than orthogonal imaging. Sawant and Sanghvi state that the two are injured simultaneously (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Oae and colleagues called a syndesmotic ligament disrupted when MRI showed ligament discontinuity (criterion 1), or a wavy or curved contour or non-visualisation of the ligament (criterion 2). Using both criteria, MRI diagnosed AITFL disruption with 100% sensitivity, 93% specificity and 97% accuracy, and PITFL disruption with 100% sensitivity, specificity and accuracy (<Cite doi={OAE}>Oae et al., Radiology 2003</Cite>).</p>
        <p>Fluid in the tibiofibular recess normally measures 5 to 7 mm. Fluid measuring more than 12 mm is definitely abnormal and suggests acute injury to the syndesmotic ligaments (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Also look at the interosseous membrane.</p>
      </>
    ),
  },
  {
    id: 'medial-ligaments',
    title: 'Step 5. Medial ligaments (deltoid, spring)',
    body: (
      <>
        <p>Eversion injuries commonly affect the deltoid ligament complex and account for about 5% of ankle sprains (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>). Remember the bruise clue from step 2: geographic BME in the medial talar trochlea may indicate a deltoid avulsion (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>The deltoid has a superficial component (tibiocalcaneal, tibionavicular and tibiospring ligaments) and a deep component (anterior and posterior tibiotalar ligaments). Normal thickness is 1 to 2 mm for the tibionavicular ligament and 2 mm (1 to 4 mm) for the tibiospring ligament; the posterior tibiotalar ligament is the thickest at 6 to 11 mm (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>The spring ligament complex has superomedial, medioplantar oblique and inferoplantar longitudinal components. The superomedial component normally measures 3 mm (2 to 5 mm) and the inferoplantar longitudinal component 4 mm (2 to 6 mm) (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Kimura and colleagues judged the spring ligament complex by waviness, abnormally high signal and discontinuity. Discontinuity and abnormally high signal of the superomedial calcaneonavicular ligament were seen more often in patients with spring ligament injury than in controls, and they call these reliable MRI findings for spring ligament injury and related disorders such as flatfoot and tibialis posterior injury (<Cite doi={KIMURA}>Kimura et al., Acta Radiol Open 2020</Cite>).</p>
        <div className="lesson-key">
          <p>Tibialis posterior, tibiospring and spring ligament injuries are seen together because they work together to hold up the medial arch (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>). The spring ligament was abnormal in 92% of patients with advanced tibialis posterior injury and 28% of those with a normal tendon (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>).</p>
        </div>
      </>
    ),
  },
  {
    id: 'medial-tendons',
    title: 'Step 6. Medial tendons (tibialis posterior, FDL, FHL)',
    body: (
      <>
        <p>The tibialis posterior, flexor digitorum longus (FDL) and flexor hallucis longus (FHL) tendons pass deep to the flexor retinaculum with the posterior tibial neurovascular bundle (<Cite doi={ERICKSON}>Erickson et al., AJR 1990</Cite>).</p>
        <p>Kimura and colleagues called the tibialis posterior injured when it showed abnormally high signal, thickening and/or an obvious tear (<Cite doi={KIMURA}>Kimura et al., Acta Radiol Open 2020</Cite>). In Rosenberg's surgically correlated series, MR imaging had 95% sensitivity and 100% specificity for tibialis posterior rupture, and showed the tendon outline, vertical splits, synovial fluid, edema and degenerated tissue better than CT (<Cite doi={ROSENBERG}>Rosenberg et al., Radiology 1988</Cite>).</p>
        <p>Reticular BME in the posterior half of the medial malleolus is seen with tibialis posterior dysfunction (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <div className="lesson-key">
          <p>Advanced tibialis posterior injury has a high association with spring ligament and sinus tarsi abnormalities. Two or more associated abnormalities were present in 80% of patients with tibialis posterior injury and 16% of those with a normal tendon (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>). So an injured tibialis posterior sends you back to step 5 and on to step 10.</p>
        </div>
        <p>Look along the FDL and FHL too. An os trigonum often articulates with the talus, and its motion folds the joint capsule, produces joint fluid, and brings conflict with the FHL sheath or Kager's fat pad (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
      </>
    ),
  },
  {
    id: 'lateral-tendons',
    title: 'Step 7. Lateral tendons (peroneus brevis and longus)',
    body: (
      <>
        <p>Peroneal tendon pathology falls into three groups: tendinopathy, subluxation and dislocation, and splits and tears (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Axial and oblique images are the most useful for the tendons, but all three planes should be used (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>).</p>

        <h4>Tendinopathy and tenosynovitis</h4>
        <p>Tendinosis and tenosynovitis are best seen on T2-weighted or axial PD-weighted images, as increased signal in the tendon and fluid around it. Circumferential fluid in the common peroneal sheath wider than 3 mm is highly specific for peroneal tenosynovitis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        <div className="lesson-key">
          <p>Beware the magic angle: as the tendons curve round the lateral malleolus their fibres lie at 55° to the magnetic field, giving artefactual signal. Consider it before excluding a tear; T2-weighted images (or any long echo time sequence) and plantar flexion of the foot reduce it (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        </div>

        <h4>Split tears</h4>
        <p>The commonest site of a peroneus brevis split is at the tip of the lateral malleolus. BME in the posterior half of the lateral malleolus was significantly more common in patients with a split rupture. MRI alone is reportedly not yet sufficient to diagnose split tears (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>).</p>
        <p>The Brandes-Smith zones locate a tear: zone A under the superior retinaculum, zone B at the inferior peroneal retinaculum, and zone C at the cuboid notch, where longus pathology occurs most often (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>

        <h4>Retinaculum and subluxation</h4>
        <p>Davda and colleagues quote the surgical grading of superior peroneal retinaculum (SPR) injury (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). They give no MRI criteria for each grade, so use these as descriptions only:</p>
        <ul className="plain-list">
          <li><strong>I:</strong> the retinaculum is avulsed from the lateral malleolus, with the tendons between bone and periosteum.</li>
          <li><strong>II:</strong> the fibrocartilaginous ridge is avulsed with the retinaculum, and the tendons lie between the ridge and the fibula.</li>
          <li><strong>III:</strong> a thin cortical fragment of bone is avulsed from the fibula.</li>
          <li><strong>IV:</strong> the SPR is torn from its posterior attachment to the calcaneus and the deep fascia of the Achilles tendon, and the tendon lies superficial to the retinaculum.</li>
        </ul>
        <p>Intrasheath subluxation has two types, which Davda and colleagues quote from Raikin and colleagues: in type A the peroneus brevis and longus switch positions without a tear in the tendons or disruption of the SPR; in type B the peroneus longus subluxes through a longitudinal split in the peroneus brevis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>

        <h4>Variants that crowd the groove</h4>
        <p>A low-lying peroneus brevis has two working definitions. Davda and colleagues call it low-lying when the muscle belly extends below the superior margin of the SPR, seen in up to 33% of people, while noting that foot position changes the level of the musculotendinous junction (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Huuskonen and colleagues called it low-lying when the belly was seen at least at the level of the lateral malleolus where the PTFL attaches (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). Say which definition you used.</p>
        <p>The peroneus quartus descends posteromedial to the peroneal tendons and appears on MRI as a separate muscle or tendon separated from them by a fat plane; it occurs in 6.6% to 21.7% of cadaveric specimens. A low-lying brevis and a quartus can both overcrowd the retromalleolar groove, which is associated with longitudinal splitting, tenosynovitis and dislocation (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        <p>A peroneal tubercle more than 5 mm high is reported to be related to peroneus longus impingement and stenosing tenosynovitis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Huuskonen and colleagues called the tubercle prominent when its length, measured from the lateral margin of the calcaneus, exceeded the width of each peroneal tendon (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). The os peroneum may be uni-, bi- or multipartite, and painful os peroneum syndrome covers a spectrum from acute fracture to a hypertrophied peroneal tubercle (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
      </>
    ),
  },
  {
    id: 'posterior',
    title: 'Step 8. Posterior (Achilles, Haglund, posterior impingement)',
    body: (
      <>
        <h4>Achilles tendon</h4>
        <p>Midportion tendinopathy is the commonest Achilles disorder. Its common sign is fusiform thickening of the midportion with increased signal. A focal fluid signal indicates microtears, which may progress to partial and complete rupture, and a complete rupture may be the end stage of degeneration (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>).</p>
        <p>Paratenonitis is inflammation of the paratenon; it may accompany tendinopathy or occur alone (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>).</p>
        <p>Total rupture is most common at the midportion, 5 to 6 cm from the insertion, with frayed ends and a gap between them. The gap may be most apparent on sagittal images, but the coronal images help too, and significant diastasis between the stumps may be an indication for surgery. A distal total rupture, within 2 cm of the insertion, is rare (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>). The paper gives no number for a significant gap.</p>
        <p>After surgical repair or nonoperative treatment, fluid signal in the tendon is pathologic because it indicates re-rupture; higher signal alone is a common finding in the postoperative tendon (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>).</p>

        <h4>Insertion and Haglund's syndrome</h4>
        <p>When a bony prominence on the posterosuperior calcaneus impinges on the Achilles tendon, the condition is called Haglund's syndrome. BME within the bony prominence, retrocalcaneal bursitis and insertional tendinopathy together make up Haglund's syndrome. Early on the findings may be subtle: retrocalcaneal bursitis with only small signal changes at the insertion (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>). Overuse of the Achilles insertion can also show as BME in the calcaneus (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>

        <h4>Posterior impingement</h4>
        <p>An elongated posterior process of the talus or an os trigonum causes posterior impingement. BME in the posterior talar process or os trigonum, edema in Kager's fat pad and effusion in the posterior recess are frequent findings (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>). Pathology of the lateral (trigonal) process is the most common cause; a Stieda process is an elongated tubercle; and increased marrow signal in the trigonal process or os trigonum suggests an acute injury or chronic stress fracture (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
      </>
    ),
  },
  {
    id: 'anterior',
    title: 'Step 9. Anterior (tendons and impingement)',
    body: (
      <>
        <p>Look at the anterior tendons: tibialis anterior, extensor hallucis longus and extensor digitorum longus.</p>
        <p>Anterior, anterolateral, anteromedial, posterior, posteromedial, posterolateral and syndesmotic impingement have all been described, though they are usually grouped as anterior or posterior for simplicity. On MRI, look for bone edema, effusion, synovitis, tenosynovitis and chondral injury; in anterior soft-tissue impingement the anterolateral gutter may contain hypertrophic synovium or fibrosis (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
        <p>After a chronic ATFL tear, granulation or scar tissue in the anterolateral gutter resembles a "meniscus" and can lead to anterolateral impingement; similar findings can be seen in anteromedial and posteromedial impingement. Post-contrast fat-suppressed 3D-FSPGR imaging is reported to be superior for anterolateral impingement, showing synovial thickening and granulation tissue better (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Soft-tissue causes of anterior impingement include post-traumatic fibrous bands, a thickened anterior tibiofibular ligament and synovial plica. In bony impingement the tibial and talar spurs, often called "kissing osteophytes", surprisingly often do not actually overlap (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
        <div className="lesson-key">
          <p>MRI is variable for soft-tissue impingement, with reported sensitivities of 42% to 89% and specificities of 75% to 100% (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
        </div>
      </>
    ),
  },
  {
    id: 'spaces',
    title: 'Step 10. Spaces and nerves (sinus tarsi, tarsal tunnel)',
    body: (
      <>
        <h4>Sinus tarsi</h4>
        <p>In patients with sinus tarsi syndrome, MRI showed tears of the interosseous talocalcaneal and cervical ligaments, isolated cervical ligament tears, ganglia, and in one patient pigmented villonodular synovitis. In cadavers, initial and reconstructed MR arthrograms along and perpendicular to the ligament axes were potentially useful for assessing the individual structures (<Cite doi={LEKTRAKUL}>Lektrakul et al., Radiology 2001</Cite>).</p>
        <p>The sinus tarsi was abnormal in 72% of patients with advanced tibialis posterior injury and 36% of those with a normal tendon (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>).</p>

        <h4>Tarsal tunnel</h4>
        <p>MRI shows the flexor retinaculum and the structures deep to it: the tibialis posterior, FDL and FHL tendons and the posterior tibial neurovascular bundle, along with the medial calcaneal branches and the medial and lateral plantar nerves. In six symptomatic patients, MRI showed a mechanical cause of compression in all: two neurilemomas, tenosynovitis of all three tendons, a ganglion from the FHL sheath, post-traumatic fibrosis, and post-traumatic fibrosis with a neuroma (<Cite doi={ERICKSON}>Erickson et al., AJR 1990</Cite>).</p>
      </>
    ),
  },
  {
    id: 'plantar',
    title: 'Step 11. Plantar fascia',
    body: (
      <>
        <p>Ultrasound is the first-line and MRI the second-line test for the plantar fascia. On MRI the normal fascia is a thin low-signal band on T1-weighted and fluid-sensitive images (<Cite doi={DRAGHI}>Draghi et al., Insights Imaging 2017</Cite>).</p>
        <p>MRI findings of plantar fasciitis are thickening, most often at the calcaneal origin; areas of intermediate signal on T1-weighted and increased signal on fluid-sensitive images; edema in the adjacent soft tissue; and BME at the calcaneal attachment, suggesting enthesopathy (<Cite doi={DRAGHI}>Draghi et al., Insights Imaging 2017</Cite>).</p>
        <p>In a small study of eight patients, maximum fascia thickness averaged 7.40 mm on sagittal images in plantar fasciitis against 3.22 mm in matched volunteers, and nine of ten affected feet had increased signal in the fascia (<Cite doi={BERKOWITZ}>Berkowitz et al., Radiology 1991</Cite>). These are group means, not a cut-off; none of the papers here gives an MRI thickness threshold.</p>
        <p>An acute tear shows complete or partial interruption of the low-signal fascia, with high signal on fluid-sensitive and intermediate signal on T1-weighted images at the site, and possibly high signal in the surrounding soft tissue. A plantar fibroma is a lobulated mass of low signal on both T1- and T2-weighted images, tending to involve the distal two-thirds of the fascia, usually its central bundle (<Cite doi={DRAGHI}>Draghi et al., Insights Imaging 2017</Cite>).</p>
        <p>The plantar fascia had a low association with advanced tibialis posterior injury: abnormal in 32% against 9% with a normal tendon, a difference that was not significant (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>).</p>
      </>
    ),
  },
  {
    id: 'impression',
    title: 'Step 12. Other findings and the impression',
    body: (
      <>
        <p>Before writing the impression, read the steps against each other. Ligaments and adjacent tendons work together and are most often injured together, and bone contusion, osteochondral lesion and joint effusion are other common associations (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>). A more diffuse BME pattern can come from early avascular necrosis, inflammation or stress fracture, so the history matters (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>Anatomical variants (an accessory ossicle, a peroneus quartus, a low-lying peroneus brevis belly) each get their own line in this site's impression, after the findings, so the referrer knows they were seen and judged.</p>
        <p>Grading the injury from mild to severe and judging instability combines the MRI features with clinical tests such as the drawer, inversion and eversion tests (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>). Sawant and Sanghvi add, as background, that most sprains are stable and treated conservatively, those with osteochondral lesions arthroscopically, and severe sprains with instability by ligament reconstruction (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <div className="lesson-key">
          <p>An osteochondral lesion on MRI is not always the cause of the pain: in a cohort Walther and colleagues quote, lesions were found in 42% of 37 asymptomatic professional soccer players, and Walther and colleagues advise that MRI findings alone are no reason to urge patients with minimal or no symptoms toward prophylactic surgery (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>
        </div>
      </>
    ),
  },
]

/* The report. Option sets are shared by the fields, the report wording and the rules. */

/** Upper-cases the first letter, to start a sentence. */
const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
/** Lower-cases a label's first letter for use mid-sentence, leaving acronyms (BME, FHL) alone. */
const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text)

function join(parts: (string | false | undefined)[], separator = '; '): string {
  return parts.filter((part): part is string => Boolean(part)).join(separator)
}

/** A choice field's chosen label, ready for mid-sentence use, or '' if nothing is chosen. */
function picked(values: Values, field: { id: string; options: Option[] }): string {
  const value = str(values, field.id)
  return value ? lowerFirst(optionLabel(field, value)) : ''
}

/** A multi field's chosen labels, ready for mid-sentence use. */
function chosen(values: Values, field: { id: string; options: Option[] }): string[] {
  return list(values, field.id).map((value) => lowerFirst(optionLabel(field, value)))
}

/** Sawant's acute grades (interstitial, partial, complete) worded as their definitions, plus chronic injury. */
const ligamentOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'interstitial', label: 'High signal within the ligament (edema or hemorrhage)' },
  { value: 'partial', label: 'Partial discontinuity, not full thickness' },
  { value: 'complete', label: 'Full-thickness discontinuity' },
  { value: 'chronic', label: 'Chronic: thin or thick, irregular, no edema' },
]
const ligamentWords: Record<string, string> = {
  intact: 'intact',
  interstitial: 'interstitial tear',
  partial: 'partial tear',
  complete: 'complete tear',
  chronic: 'chronic injury (attenuated or thickened, without edema)',
}
const sawantGrade: Record<string, string> = { interstitial: 'Interstitial tear', partial: 'Partial tear', complete: 'Complete tear' }

/** Oae's MRI criteria for syndesmotic ligament disruption. */
const syndesmosisOptions: Option[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'discontinuity', label: 'Discontinuity' },
  { value: 'wavy', label: 'Wavy or curved contour' },
  { value: 'not-seen', label: 'Not visualised' },
]
const oaeCriterion: Record<string, string> = { discontinuity: 'Disruption (criterion 1)', wavy: 'Disruption (criterion 2)', 'not-seen': 'Disruption (criterion 2)' }

const tendonOptions: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'tendinosis', label: 'Tendinosis' },
  { value: 'tenosynovitis', label: 'Tenosynovitis' },
  { value: 'tear', label: 'Tear' },
]
const tearTypeOptions: Option[] = [
  { value: 'partial', label: 'Partial tear' },
  { value: 'split', label: 'Longitudinal split tear' },
  { value: 'complete', label: 'Complete tear' },
]
/** Where a peroneal tear sits; the first three are the Brandes-Smith zones. */
const peronealSiteOptions: Option[] = [
  { value: 'spr', label: 'Under the superior peroneal retinaculum' },
  { value: 'ipr', label: 'At the inferior peroneal retinaculum' },
  { value: 'cuboid', label: 'At the cuboid notch' },
  { value: 'other', label: 'Elsewhere' },
]
const brandesSmithZone: Record<string, string> = { spr: 'A', ipr: 'B', cuboid: 'C' }

const costaPaz: Record<string, { type: string; chip: string }> = {
  i: { type: 'I', chip: 'Type I: usually a contrecoup mechanism' },
  ii: { type: 'II', chip: 'Type II: usually trauma to the ligament attachment, articular capsule or retinaculum' },
  iii: { type: 'III', chip: 'Type III: often associated with a fracture or osteochondral lesion' },
}
const heppleStage: Record<string, string> = { i: 'I', iia: 'IIA', iib: 'IIB', iii: 'III', iv: 'IV', v: 'V' }

const normalAbnormal: Option[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'abnormal', label: 'Abnormal' },
]
const noneFindings: Option[] = [
  { value: 'none', label: 'No findings' },
  { value: 'present', label: 'Findings present' },
]

function tendonFields(id: string, label: string, help: string): Field[] {
  return [
    { id, kind: 'choice', label, options: tendonOptions, help, required: true },
    { id: `${id}-tear-type`, kind: 'choice', label: `${label} tear type`, options: tearTypeOptions, showIf: (v) => str(v, id) === 'tear' },
  ]
}

const fields = {
  protocol: { id: 'protocol', kind: 'choice', label: 'Protocol', required: true, help: 'All three planes, fat-suppressed T2 or PD, and at least one T1 for the marrow.', options: [
    { value: 'complete', label: 'Complete' },
    { value: 'incomplete', label: 'Incomplete' },
  ] },
  protocolMissing: { id: 'protocol-missing', kind: 'multi', label: 'Missing', showIf: (v) => str(v, 'protocol') === 'incomplete', options: [
    { value: 'planes', label: 'All three orthogonal planes' },
    { value: 'fs', label: 'Fat-suppressed T2 or PD' },
    { value: 't1', label: 'A T1-weighted sequence' },
  ] },
  effusion: { id: 'effusion', kind: 'choice', label: 'Joint effusion', required: true, help: 'Descriptive, from one cohort\'s coding: moderate separates the talus from the anterior fat pad and expands the posterior recess; severe also separates the anterior tibia.', options: [
    { value: 'none', label: 'None' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' },
  ] },
  marrow: { id: 'marrow', kind: 'choice', label: 'Bone marrow edema', required: true, help: 'Low signal on T1, high on fluid-sensitive images.', options: [
    { value: 'normal', label: 'None' },
    { value: 'bme', label: 'Present' },
  ] },
  bmeSite: { id: 'bme-site', kind: 'text', label: 'Where is the edema', placeholder: 'e.g. medial talus and medial malleolus', showIf: (v) => str(v, 'marrow') === 'bme' },
  bmePattern: { id: 'bme-pattern', kind: 'choice', label: 'Edema pattern', showIf: (v) => str(v, 'marrow') === 'bme', options: [
    { value: 'i', label: 'Diffuse or reticular, away from the cartilage' },
    { value: 'ii', label: 'Localized or geographic, contiguous to the cartilage or bony outline' },
    { value: 'iii', label: 'With slight deformation or disruption of the bony outline' },
  ] },
  t1Line: { id: 't1-line', kind: 'choice', label: 'Hypointense line on T1', showIf: (v) => str(v, 'marrow') === 'bme', help: 'No line excludes a complete fracture.', options: [
    { value: 'absent', label: 'No line' },
    { value: 'present', label: 'Line present' },
  ] },
  fracture: { id: 'fracture', kind: 'choice', label: 'Fracture', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'stress', label: 'Stress fracture' },
    { value: 'incomplete', label: 'Incomplete fracture' },
    { value: 'complete', label: 'Complete fracture' },
  ] },
  fractureSite: { id: 'fracture-site', kind: 'text', label: 'Fracture site', placeholder: 'e.g. distal tibia', showIf: (v) => ['stress', 'incomplete', 'complete'].includes(str(v, 'fracture')) },
  olt: { id: 'olt', kind: 'choice', label: 'Osteochondral lesion of the talus', required: true, options: [
    { value: 'none', label: 'None' },
    { value: 'present', label: 'Present' },
  ] },
  oltSite: { id: 'olt-site', kind: 'choice', label: 'Lesion site', showIf: (v) => str(v, 'olt') === 'present', options: [
    { value: 'medial', label: 'Medial talar dome' },
    { value: 'lateral', label: 'Lateral talar dome' },
    { value: 'other', label: 'Elsewhere on the talus' },
  ] },
  oltAppearance: { id: 'olt-appearance', kind: 'choice', label: 'Lesion appearance', showIf: (v) => str(v, 'olt') === 'present', help: 'The Hepple MRI stages, as Walther et al. reproduce them.', options: [
    { value: 'i', label: 'Articular cartilage damage only' },
    { value: 'iia', label: 'Cartilage damage with underlying fracture and surrounding bony edema' },
    { value: 'iib', label: 'Cartilage damage with underlying fracture, without bony edema' },
    { value: 'iii', label: 'Detached but undisplaced fragment' },
    { value: 'iv', label: 'Detached and displaced fragment' },
    { value: 'v', label: 'Subchondral cyst formation' },
  ] },
  ossicles: { id: 'ossicles', kind: 'multi', label: 'Accessory ossicles', options: [
    { value: 'trigonum', label: 'Os trigonum' },
    { value: 'peroneum', label: 'Os peroneum' },
    { value: 'naviculare', label: 'Os naviculare accessorium' },
  ] },
  ossicleBme: { id: 'ossicle-bme', kind: 'multi', label: 'Bone marrow edema in', showIf: (v) => list(v, 'ossicles').length > 0, options: [
    { value: 'trigonum', label: 'Os trigonum' },
    { value: 'peroneum', label: 'Os peroneum' },
    { value: 'naviculare', label: 'Os naviculare accessorium' },
  ] },

  atfl: { id: 'atfl', kind: 'choice', label: 'ATFL', required: true, options: ligamentOptions, help: 'Best seen on axial images.' },
  atflThickness: { id: 'atfl-thickness', kind: 'number', label: 'ATFL thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 2–3 mm.' },
  cfl: { id: 'cfl', kind: 'choice', label: 'CFL', required: true, options: ligamentOptions, help: 'An oblique coronal "CFL view" helps.' },
  cflThickness: { id: 'cfl-thickness', kind: 'number', label: 'CFL thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 2 mm.' },
  ptfl: { id: 'ptfl', kind: 'choice', label: 'PTFL', required: true, options: ligamentOptions, help: 'Normally striated: striations alone are not a tear.' },

  aitfl: { id: 'aitfl', kind: 'choice', label: 'AITFL', required: true, options: syndesmosisOptions, help: 'Normally striated. Discontinuity, a wavy or curved contour, or non-visualisation means disruption.' },
  pitfl: { id: 'pitfl', kind: 'choice', label: 'PITFL', required: true, options: syndesmosisOptions },
  recess: { id: 'recess', kind: 'number', label: 'Tibiofibular recess fluid', unit: 'mm', min: 0, step: 0.1, help: 'Normal 5–7 mm; more than 12 mm is definitely abnormal.' },
  iom: { id: 'iom', kind: 'choice', label: 'Interosseous membrane', options: normalAbnormal },
  iomText: { id: 'iom-text', kind: 'text', label: 'Interosseous membrane (describe)', showIf: (v) => str(v, 'iom') === 'abnormal' },

  deltoidSuperficial: { id: 'deltoid-superficial', kind: 'choice', label: 'Superficial deltoid', required: true, options: ligamentOptions, help: 'Tibiocalcaneal, tibionavicular and tibiospring ligaments.' },
  tnlThickness: { id: 'tnl-thickness', kind: 'number', label: 'Tibionavicular thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 1–2 mm.' },
  tslThickness: { id: 'tsl-thickness', kind: 'number', label: 'Tibiospring thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 2 mm (1–4 mm).' },
  deltoidDeep: { id: 'deltoid-deep', kind: 'choice', label: 'Deep deltoid', required: true, options: ligamentOptions, help: 'Anterior and posterior tibiotalar ligaments; normally striated.' },
  pttlThickness: { id: 'pttl-thickness', kind: 'number', label: 'Posterior tibiotalar thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 6–11 mm.' },
  spring: { id: 'spring', kind: 'choice', label: 'Spring ligament', required: true, options: normalAbnormal },
  springFindings: { id: 'spring-findings', kind: 'multi', label: 'Spring ligament findings', showIf: (v) => str(v, 'spring') === 'abnormal', options: [
    { value: 'wavy', label: 'Waviness' },
    { value: 'signal', label: 'Abnormally high signal' },
    { value: 'discontinuity', label: 'Discontinuity' },
  ] },
  springSmThickness: { id: 'spring-sm-thickness', kind: 'number', label: 'Spring superomedial thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 3 mm (2–5 mm).' },
  springIplThickness: { id: 'spring-ipl-thickness', kind: 'number', label: 'Spring inferoplantar thickness', unit: 'mm', min: 0, step: 0.1, help: 'Normal 4 mm (2–6 mm).' },

  ptt: tendonFields('ptt', 'Tibialis posterior', 'Injury: abnormally high signal, thickening and/or an obvious tear.'),
  fdl: tendonFields('fdl', 'FDL', 'Flexor digitorum longus.'),
  fhl: tendonFields('fhl', 'FHL', 'Flexor hallucis longus.'),

  pb: tendonFields('pb', 'Peroneus brevis', 'Tendinosis: increased signal in the tendon. Tenosynovitis: fluid around it. Mind the magic angle.'),
  pbTearSite: { id: 'pb-tear-site', kind: 'choice', label: 'Peroneus brevis tear site', options: peronealSiteOptions, showIf: (v) => str(v, 'pb') === 'tear' },
  pl: tendonFields('pl', 'Peroneus longus', 'Tendinosis: increased signal in the tendon. Tenosynovitis: fluid around it.'),
  plTearSite: { id: 'pl-tear-site', kind: 'choice', label: 'Peroneus longus tear site', options: peronealSiteOptions, showIf: (v) => str(v, 'pl') === 'tear' },
  peronealFluid: { id: 'peroneal-fluid', kind: 'number', label: 'Circumferential fluid in the common peroneal sheath', unit: 'mm', min: 0, step: 0.1, help: 'Wider than 3 mm is highly specific for tenosynovitis.' },
  peronealPosition: { id: 'peroneal-position', kind: 'choice', label: 'Peroneal tendon position', options: [
    { value: 'normal', label: 'In the groove' },
    { value: 'subluxed', label: 'Subluxed' },
    { value: 'dislocated', label: 'Dislocated' },
  ] },
  intrasheath: { id: 'intrasheath', kind: 'choice', label: 'Intrasheath subluxation', options: [
    { value: 'none', label: 'None' },
    { value: 'a', label: 'Tendons switch places, no tendon tear, retinaculum intact' },
    { value: 'b', label: 'Longus subluxes through a brevis split' },
  ] },
  spr: { id: 'spr', kind: 'choice', label: 'Superior peroneal retinaculum', help: 'Described in surgical terms; the papers give no MRI grading.', options: [
    { value: 'intact', label: 'Intact' },
    { value: 'avulsed', label: 'Avulsed from the lateral malleolus' },
    { value: 'ridge', label: 'Avulsed with the fibrocartilaginous ridge' },
    { value: 'bone', label: 'Avulsed with a thin cortical bone fragment' },
    { value: 'posterior', label: 'Torn from its posterior attachment' },
  ] },
  pbBelly: { id: 'pb-belly', kind: 'multi', label: 'Peroneus brevis muscle belly', help: 'Two working definitions of low-lying; say which you used.', options: [
    { value: 'below-spr', label: 'Extends below the superior margin of the SPR' },
    { value: 'ptfl-level', label: 'Reaches at least the level of the PTFL attachment' },
  ] },
  quartus: { id: 'quartus', kind: 'choice', label: 'Peroneus quartus', options: [
    { value: 'absent', label: 'Absent' },
    { value: 'present', label: 'Present' },
  ] },
  tubercleHeight: { id: 'tubercle-height', kind: 'number', label: 'Peroneal tubercle height', unit: 'mm', min: 0, step: 0.1, help: 'More than 5 mm is reported to relate to peroneus longus impingement.' },
  tubercleLength: { id: 'tubercle-length', kind: 'number', label: 'Peroneal tubercle length from the lateral calcaneal margin', unit: 'mm', min: 0, step: 0.1 },
  peronealWidth: { id: 'peroneal-width', kind: 'number', label: 'Width of the wider peroneal tendon', unit: 'mm', min: 0, step: 0.1, help: 'Prominent (Huuskonen) if the tubercle is longer than each tendon is wide.' },

  achilles: { id: 'achilles', kind: 'choice', label: 'Achilles tendon', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'tendinosis', label: 'Midportion tendinosis' },
    { value: 'insertional', label: 'Insertional tendinopathy' },
    { value: 'partial', label: 'Partial tear' },
    { value: 'complete', label: 'Complete rupture' },
  ] },
  achillesDistance: { id: 'achilles-distance', kind: 'number', label: 'Rupture distance from the insertion', unit: 'cm', min: 0, step: 0.1, showIf: (v) => str(v, 'achilles') === 'complete', help: 'Within 2 cm is a distal rupture, which is rare.' },
  achillesGap: { id: 'achilles-gap', kind: 'number', label: 'Gap between the stumps', unit: 'cm', min: 0, step: 0.1, showIf: (v) => str(v, 'achilles') === 'complete', help: 'Sagittal and coronal images. The paper gives no number for a significant gap.' },
  achillesOther: { id: 'achilles-other', kind: 'multi', label: 'Around the Achilles', options: [
    { value: 'paratenonitis', label: 'Paratenonitis' },
    { value: 'bursitis', label: 'Retrocalcaneal bursitis' },
    { value: 'prominence-bme', label: 'BME in a posterosuperior calcaneal prominence' },
  ] },
  posteriorImpingement: { id: 'posterior-impingement', kind: 'choice', label: 'Posterior impingement', required: true, options: noneFindings },
  posteriorImpingementFindings: { id: 'posterior-impingement-findings', kind: 'multi', label: 'Posterior findings', showIf: (v) => str(v, 'posterior-impingement') === 'present', options: [
    { value: 'process-bme', label: 'BME in the posterior talar process or os trigonum' },
    { value: 'kager', label: 'Edema in Kager\'s fat pad' },
    { value: 'recess', label: 'Posterior recess effusion' },
    { value: 'fhl-sheath', label: 'Fluid in the FHL sheath' },
    { value: 'stieda', label: 'Elongated posterior tubercle (Stieda process)' },
  ] },

  anteriorTendons: { id: 'anterior-tendons', kind: 'choice', label: 'Anterior tendons', required: true, options: normalAbnormal, help: 'Tibialis anterior, extensor hallucis longus, extensor digitorum longus.' },
  anteriorTendonsText: { id: 'anterior-tendons-text', kind: 'text', label: 'Anterior tendons (describe)', placeholder: 'which tendon and what', showIf: (v) => str(v, 'anterior-tendons') === 'abnormal' },
  anteriorImpingement: { id: 'anterior-impingement', kind: 'choice', label: 'Anterior impingement', required: true, options: noneFindings },
  anteriorImpingementFindings: { id: 'anterior-impingement-findings', kind: 'multi', label: 'Anterior findings', showIf: (v) => str(v, 'anterior-impingement') === 'present', options: [
    { value: 'gutter', label: 'Soft tissue in the anterolateral gutter (synovium, fibrosis or scar)' },
    { value: 'spurs', label: 'Tibial or talar spurs' },
    { value: 'synovitis', label: 'Synovitis' },
    { value: 'band', label: 'Fibrous band, thickened ligament or plica' },
  ] },

  sinusTarsi: { id: 'sinus-tarsi', kind: 'choice', label: 'Sinus tarsi', required: true, options: normalAbnormal },
  sinusTarsiFindings: { id: 'sinus-tarsi-findings', kind: 'multi', label: 'Sinus tarsi findings', showIf: (v) => str(v, 'sinus-tarsi') === 'abnormal', options: [
    { value: 'itcl', label: 'Interosseous talocalcaneal ligament tear' },
    { value: 'cervical', label: 'Cervical ligament tear' },
    { value: 'ganglion', label: 'Ganglion' },
  ] },
  tarsalTunnel: { id: 'tarsal-tunnel', kind: 'choice', label: 'Tarsal tunnel', required: true, options: normalAbnormal },
  tarsalTunnelFindings: { id: 'tarsal-tunnel-findings', kind: 'multi', label: 'Tarsal tunnel findings', showIf: (v) => str(v, 'tarsal-tunnel') === 'abnormal', options: [
    { value: 'neurilemoma', label: 'Neurilemoma' },
    { value: 'tenosynovitis', label: 'Tenosynovitis' },
    { value: 'ganglion', label: 'Ganglion' },
    { value: 'fibrosis', label: 'Post-traumatic fibrosis' },
    { value: 'neuroma', label: 'Neuroma' },
  ] },

  plantarFascia: { id: 'plantar-fascia', kind: 'choice', label: 'Plantar fascia', required: true, options: [
    { value: 'normal', label: 'Normal' },
    { value: 'fasciitis', label: 'Features of plantar fasciitis' },
    { value: 'tear', label: 'Tear' },
    { value: 'fibroma', label: 'Lobulated low-signal mass (fibroma)' },
  ] },
  plantarTearType: { id: 'plantar-tear-type', kind: 'choice', label: 'Plantar fascia tear', showIf: (v) => str(v, 'plantar-fascia') === 'tear', options: [
    { value: 'partial', label: 'Partial' },
    { value: 'complete', label: 'Complete' },
  ] },
  plantarThickness: { id: 'plantar-thickness', kind: 'number', label: 'Plantar fascia thickness', unit: 'mm', min: 0, step: 0.1, help: 'The cited papers give no MRI cut-off.' },

  other: { id: 'other', kind: 'text', label: 'Other findings', multiline: true, placeholder: 'e.g. coalition, bone infarct, soft-tissue mass' },
  impressionNegatives: { id: 'impression-negatives', kind: 'multi', label: 'Pertinent negatives to state', options: [
    { value: 'no-fracture', label: 'No fracture' },
    { value: 'no-ligament', label: 'No ligament injury' },
    { value: 'no-tendon-tear', label: 'No tendon tear' },
    { value: 'no-olt', label: 'No osteochondral lesion' },
  ] },
} satisfies Record<string, Field | Field[]>

/* Rule helpers shared by the chips, the report and the warnings. */

/** The ossicles marked as having edema, limited to those marked present, for mid-sentence use. */
function edematousOssicles(values: Values): string[] {
  const present = list(values, 'ossicles')
  return list(values, 'ossicle-bme')
    .filter((value) => present.includes(value))
    .map((value) => lowerFirst(optionLabel(fields.ossicleBme, value)))
}

/** The other-findings text, or '' when it only says there is nothing ("none", "nil", "n/a"). */
function otherFindings(values: Values): string {
  const text = str(values, 'other')
  return ['none', 'nil', 'n/a'].includes(text.toLowerCase().replace(/\.$/, '')) ? '' : text
}

function haglund(values: Values): boolean {
  const around = list(values, 'achilles-other')
  return str(values, 'achilles') === 'insertional' && around.includes('bursitis') && around.includes('prominence-bme')
}

function distalRupture(values: Values): boolean {
  const distance = num(values, 'achilles-distance')
  return str(values, 'achilles') === 'complete' && distance !== undefined && distance <= 2
}

const lateralLigaments: [string, string][] = [['atfl', 'ATFL'], ['cfl', 'CFL'], ['ptfl', 'PTFL']]
const deltoid: [string, string][] = [['deltoid-superficial', 'superficial deltoid'], ['deltoid-deep', 'deep deltoid']]
const syndesmoticLigaments: [string, string][] = [['aitfl', 'AITFL'], ['pitfl', 'PITFL']]
const flexorTendons: [string, string][] = [['ptt', 'Tibialis posterior'], ['fdl', 'FDL'], ['fhl', 'FHL']]
const peronealTendons: [string, string][] = [['pb', 'Peroneus brevis'], ['pl', 'Peroneus longus']]

/** "tendinosis", "longitudinal split tear", or "" when the tendon is not entered. */
function tendonWords(values: Values, id: string): string {
  const status = str(values, id)
  if (status !== 'tear') return status
  return picked(values, { id: `${id}-tear-type`, options: tearTypeOptions }) || 'tear'
}

/* Rule chips, one function per step that has a verified rule. */

function deriveBones(values: Values): Derived[] {
  const out: Derived[] = []
  const pattern = costaPaz[str(values, 'bme-pattern')] as { chip: string } | undefined
  if (pattern) out.push({ label: 'BME (Costa-Paz)', value: pattern.chip })
  if (str(values, 't1-line') === 'absent') out.push({ label: 'Complete fracture', value: 'Excluded (no hypointense T1 line)', tone: 'good' })
  const stage = heppleStage[str(values, 'olt-appearance')] as string | undefined
  if (stage) out.push({ label: 'Hepple stage', value: stage, tone: 'warn' })
  return out
}

function deriveLateralLigaments(values: Values): Derived[] {
  const out: Derived[] = []
  for (const [id, name] of lateralLigaments) {
    const grade = sawantGrade[str(values, id)] as string | undefined
    if (grade) out.push({ label: `${name} (Sawant)`, value: grade, tone: 'warn' })
  }
  return out
}

function deriveSyndesmosis(values: Values): Derived[] {
  const out: Derived[] = []
  for (const [id, name] of syndesmoticLigaments) {
    const criterion = oaeCriterion[str(values, id)] as string | undefined
    if (criterion) out.push({ label: `${name} (Oae)`, value: criterion, tone: 'warn' })
  }
  const recess = num(values, 'recess')
  if (recess !== undefined && recess > 12) {
    out.push({ label: 'Tibiofibular recess fluid', value: 'Definitely abnormal (> 12 mm): suggests acute syndesmotic injury', tone: 'warn' })
  }
  return out
}

function deriveLateralTendons(values: Values): Derived[] {
  const out: Derived[] = []
  const fluid = num(values, 'peroneal-fluid')
  if (fluid !== undefined && fluid > 3) out.push({ label: 'Peroneal sheath fluid', value: 'Highly specific for tenosynovitis (> 3 mm)', tone: 'warn' })
  const intrasheath = str(values, 'intrasheath')
  if (intrasheath === 'a' || intrasheath === 'b') {
    out.push({ label: 'Intrasheath subluxation (Davda, after Raikin)', value: `Type ${intrasheath.toUpperCase()}`, tone: 'warn' })
  }
  for (const [id, name] of peronealTendons) {
    const zone = brandesSmithZone[str(values, `${id}-tear-site`)] as string | undefined
    if (zone) out.push({ label: `${name} tear (Brandes-Smith)`, value: `Zone ${zone}` })
  }
  const belly = list(values, 'pb-belly')
  if (belly.includes('below-spr')) out.push({ label: 'Low-lying peroneus brevis (Davda)', value: 'Met: belly below the superior margin of the SPR' })
  if (belly.includes('ptfl-level')) out.push({ label: 'Low-lying peroneus brevis (Huuskonen)', value: 'Met: belly at least at the PTFL attachment level' })
  const height = num(values, 'tubercle-height')
  if (height !== undefined && height > 5) {
    out.push({ label: 'Peroneal tubercle height', value: '> 5 mm: reported to relate to peroneus longus impingement and stenosing tenosynovitis', tone: 'warn' })
  }
  const length = num(values, 'tubercle-length')
  const width = num(values, 'peroneal-width')
  if (length !== undefined && width !== undefined) {
    out.push({ label: 'Peroneal tubercle (Huuskonen)', value: length > width ? 'Prominent' : 'Not prominent', tone: length > width ? 'warn' : 'good' })
  }
  return out
}

function derivePosterior(values: Values): Derived[] {
  const out: Derived[] = []
  if (distalRupture(values)) out.push({ label: 'Rupture site', value: 'Distal (within 2 cm of the insertion), rare', tone: 'warn' })
  if (haglund(values)) out.push({ label: 'Haglund\'s syndrome', value: 'All three findings present', tone: 'warn' })
  return out
}

/* Report lines, one per entered finding. */

function ligamentLine(values: Values, id: string, name: string, extra?: string): string {
  const status = str(values, id)
  const body = join([status && (ligamentWords[status] ?? status), extra])
  return body && `${name}: ${body}`
}

function thicknessList(values: Values, items: [string, string][]): string {
  return join(items.map(([id, name]) => {
    const n = num(values, id)
    return n !== undefined && `${name} ${n} mm`
  }), ', ')
}

function tendonLine(values: Values, id: string, name: string): string {
  const words = tendonWords(values, id)
  if (!words) return ''
  const siteValue = str(values, `${id}-tear-site`)
  const zone = brandesSmithZone[siteValue] as string | undefined
  const site = siteValue && siteValue !== 'other' && `${picked(values, { id: `${id}-tear-site`, options: peronealSiteOptions })}${zone ? ` (Brandes-Smith zone ${zone})` : ''}`
  return `${name}: ${join([words, site])}`
}

function choiceLine(values: Values, field: { id: string; label: string; options: Option[] }, detail?: string | false): string {
  const words = picked(values, field)
  return words ? `${field.label}: ${join([words, detail], ', ')}` : ''
}

function techniqueLines(values: Values): (string | false)[] {
  const protocol = str(values, 'protocol')
  const missing = chosen(values, fields.protocolMissing)
  return [
    protocol === 'complete' && 'Technique: three orthogonal planes, fat-suppressed T2/PD and T1-weighted imaging',
    protocol === 'incomplete' && `Technique: incomplete protocol${missing.length > 0 ? `; missing ${missing.join(', ')}` : ''}`,
    choiceLine(values, fields.effusion),
  ]
}

function boneLines(values: Values): (string | false)[] {
  const marrow = str(values, 'marrow')
  const site = str(values, 'bme-site')
  const pattern = costaPaz[str(values, 'bme-pattern')] as { type: string } | undefined
  const t1 = str(values, 't1-line')
  const fracture = str(values, 'fracture')
  const fractureSite = str(values, 'fracture-site')
  const olt = str(values, 'olt')
  const stage = heppleStage[str(values, 'olt-appearance')] as string | undefined
  const ossicles = chosen(values, fields.ossicles)
  const ossicleBme = edematousOssicles(values)
  return [
    marrow === 'normal' && 'Bone marrow: no edema',
    marrow === 'bme' && `Bone marrow: ${join([
      `edema${site ? ` in ${site}` : ''}`,
      pattern && `${picked(values, fields.bmePattern)} (Costa-Paz type ${pattern.type})`,
      t1 === 'absent' && 'no hypointense line on T1',
      t1 === 'present' && 'hypointense line on T1',
    ])}`,
    fracture === 'none' && 'Fracture: none',
    fracture && fracture !== 'none' && `Fracture: ${join([picked(values, fields.fracture), fractureSite], ', ')}`,
    olt === 'none' && 'Osteochondral lesion of the talus: none',
    olt === 'present' && `Osteochondral lesion of the talus: ${join([
      picked(values, fields.oltSite),
      stage && `${picked(values, fields.oltAppearance)} (Hepple ${stage})`,
    ]) || 'present'}`,
    ossicles.length > 0 && `Accessory ossicles: ${join([
      ossicles.join(', '),
      ossicleBme.length > 0 && `bone marrow edema in ${ossicleBme.join(', ')}`,
    ])}`,
  ]
}

function syndesmosisLines(values: Values): (string | false)[] {
  const recess = num(values, 'recess')
  const iom = str(values, 'iom')
  return [
    ...syndesmoticLigaments.map(([id, name]) => {
      const status = str(values, id)
      if (!status) return ''
      return `${name}: ${status === 'intact' ? 'intact' : `disrupted (${picked(values, { id, options: syndesmosisOptions })})`}`
    }),
    recess !== undefined && `Tibiofibular recess fluid: ${recess} mm`,
    iom === 'normal' && 'Interosseous membrane: normal',
    iom === 'abnormal' && `Interosseous membrane: ${join(['abnormal', str(values, 'iom-text')], ', ')}`,
  ]
}

function medialLigamentLines(values: Values): (string | false)[] {
  const spring = str(values, 'spring')
  const springFindings = chosen(values, fields.springFindings)
  const deltoidThickness = thicknessList(values, [['tnl-thickness', 'tibionavicular'], ['tsl-thickness', 'tibiospring'], ['pttl-thickness', 'posterior tibiotalar']])
  const springThickness = thicknessList(values, [['spring-sm-thickness', 'superomedial'], ['spring-ipl-thickness', 'inferoplantar']])
  return [
    ligamentLine(values, 'deltoid-superficial', 'Superficial deltoid'),
    ligamentLine(values, 'deltoid-deep', 'Deep deltoid'),
    deltoidThickness && `Deltoid thickness: ${deltoidThickness}`,
    spring && `Spring ligament: ${join([
      spring === 'normal' ? 'normal' : `abnormal${springFindings.length > 0 ? ` (${springFindings.join(', ')})` : ''}`,
      springThickness && `thickness ${springThickness}`,
    ])}`,
    !spring && springThickness && `Spring ligament thickness: ${springThickness}`,
  ]
}

function peronealLines(values: Values): (string | false)[] {
  const fluid = num(values, 'peroneal-fluid')
  const intrasheath = str(values, 'intrasheath')
  const belly = chosen(values, fields.pbBelly)
  const tubercle = join([
    num(values, 'tubercle-height') !== undefined && `height ${num(values, 'tubercle-height')} mm`,
    num(values, 'tubercle-length') !== undefined && `length ${num(values, 'tubercle-length')} mm from the lateral calcaneal margin`,
    num(values, 'peroneal-width') !== undefined && `wider peroneal tendon ${num(values, 'peroneal-width')} mm wide`,
  ], ', ')
  return [
    ...peronealTendons.map(([id, name]) => tendonLine(values, id, name)),
    fluid !== undefined && `Peroneal sheath fluid: ${fluid} mm, circumferential`,
    choiceLine(values, fields.peronealPosition),
    intrasheath === 'none' && 'Intrasheath subluxation: none',
    (intrasheath === 'a' || intrasheath === 'b') && `Intrasheath subluxation: ${picked(values, fields.intrasheath)} (type ${intrasheath.toUpperCase()})`,
    choiceLine(values, fields.spr),
    belly.length > 0 && `Peroneus brevis muscle belly: ${belly.join('; ')}`,
    choiceLine(values, fields.quartus),
    tubercle && `Peroneal tubercle: ${tubercle}`,
  ]
}

function posteriorLines(values: Values): (string | false)[] {
  const achilles = str(values, 'achilles')
  const distance = num(values, 'achilles-distance')
  const gap = num(values, 'achilles-gap')
  const around = chosen(values, fields.achillesOther)
  const impingement = str(values, 'posterior-impingement')
  const findings = chosen(values, fields.posteriorImpingementFindings)
  return [
    achilles && `Achilles tendon: ${join([
      picked(values, fields.achilles),
      distance !== undefined && `${distance} cm from the insertion`,
      gap !== undefined && `gap ${gap} cm`,
    ])}`,
    around.length > 0 && `Around the Achilles: ${around.join(', ')}`,
    impingement === 'none' && 'Posterior impingement: no findings',
    impingement === 'present' && `Posterior impingement findings: ${findings.join(', ') || 'present'}`,
  ]
}

function anteriorLines(values: Values): (string | false)[] {
  const tendons = str(values, 'anterior-tendons')
  const impingement = str(values, 'anterior-impingement')
  const findings = chosen(values, fields.anteriorImpingementFindings)
  return [
    tendons === 'normal' && 'Anterior tendons: normal',
    tendons === 'abnormal' && `Anterior tendons: ${join(['abnormal', str(values, 'anterior-tendons-text')], ', ')}`,
    impingement === 'none' && 'Anterior impingement: no findings',
    impingement === 'present' && `Anterior impingement findings: ${findings.join(', ') || 'present'}`,
  ]
}

function spaceLines(values: Values): (string | false)[] {
  const line = (id: string, name: string, findings: string[]) => {
    const status = str(values, id)
    if (status === 'normal') return `${name}: normal`
    return status === 'abnormal' && `${name}: ${findings.join(', ') || 'abnormal'}`
  }
  return [
    line('sinus-tarsi', 'Sinus tarsi', chosen(values, fields.sinusTarsiFindings)),
    line('tarsal-tunnel', 'Tarsal tunnel', chosen(values, fields.tarsalTunnelFindings)),
  ]
}

function plantarWords(values: Values): string {
  const status = str(values, 'plantar-fascia')
  if (status !== 'tear') return picked(values, fields.plantarFascia)
  const type = picked(values, fields.plantarTearType)
  return type ? `${type} tear` : 'tear'
}

function plantarLine(values: Values): string {
  const thickness = num(values, 'plantar-thickness')
  const body = join([plantarWords(values), thickness !== undefined && `thickness ${thickness} mm`])
  return body && `Plantar fascia: ${body}`
}

/* The impression: one sentence per abnormal finding, in search-pattern order. */

function findings(values: Values): string[] {
  const out: (string | false)[] = []
  const effusion = str(values, 'effusion')
  if (effusion === 'moderate' || effusion === 'severe') out.push(`${upperFirst(effusion)} joint effusion.`)
  if (str(values, 'marrow') === 'bme') out.push(`Bone marrow edema${str(values, 'bme-site') ? ` in ${str(values, 'bme-site')}` : ''}.`)
  const fracture = str(values, 'fracture')
  if (fracture && fracture !== 'none') {
    out.push(`${upperFirst(picked(values, fields.fracture))}${str(values, 'fracture-site') ? `: ${str(values, 'fracture-site')}` : ''}.`)
  }
  if (str(values, 'olt') === 'present') {
    const stage = heppleStage[str(values, 'olt-appearance')] as string | undefined
    const detail = join([picked(values, fields.oltSite), stage && `Hepple ${stage}`], ', ')
    out.push(`Osteochondral lesion of the talus${detail ? `, ${detail}` : ''}.`)
  }
  const ossicleBme = edematousOssicles(values)
  if (ossicleBme.length > 0) out.push(`Bone marrow edema in an accessory ossicle: ${ossicleBme.join(', ')}.`)

  for (const [id, name] of [...lateralLigaments, ...deltoid]) {
    const status = str(values, id)
    if (status === 'chronic') out.push(`Chronic injury of the ${name}.`)
    else if (status && status !== 'intact') out.push(`${upperFirst(ligamentWords[status] ?? status)} of the ${name}.`)
  }
  for (const [id, name] of syndesmoticLigaments) {
    const status = str(values, id)
    if (status && status !== 'intact') out.push(`${name} disruption (${picked(values, { id, options: syndesmosisOptions })}).`)
  }
  const recess = num(values, 'recess')
  if (recess !== undefined && recess > 12) out.push(`Tibiofibular recess fluid ${recess} mm (> 12 mm, definitely abnormal).`)
  if (str(values, 'iom') === 'abnormal') out.push(`Interosseous membrane: ${str(values, 'iom-text') || 'abnormal'}.`)
  if (str(values, 'spring') === 'abnormal') {
    const springFindings = chosen(values, fields.springFindings)
    out.push(`Spring ligament abnormality${springFindings.length > 0 ? ` (${springFindings.join(', ')})` : ''}.`)
  }

  for (const [id, name] of [...flexorTendons, ...peronealTendons]) {
    const words = tendonWords(values, id)
    if (words && words !== 'normal') out.push(`${name}: ${words}.`)
  }
  const position = str(values, 'peroneal-position')
  if (position === 'subluxed' || position === 'dislocated') out.push(`Peroneal tendons ${position}.`)
  const intrasheath = str(values, 'intrasheath')
  if (intrasheath === 'a' || intrasheath === 'b') out.push(`Intrasheath peroneal subluxation, type ${intrasheath.toUpperCase()}.`)
  const spr = str(values, 'spr')
  if (spr && spr !== 'intact') out.push(`Superior peroneal retinaculum ${picked(values, fields.spr)}.`)
  const fluid = num(values, 'peroneal-fluid')
  if (fluid !== undefined && fluid > 3) out.push(`Circumferential peroneal sheath fluid ${fluid} mm (> 3 mm, highly specific for tenosynovitis).`)
  const height = num(values, 'tubercle-height')
  if (height !== undefined && height > 5) {
    out.push(`Peroneal tubercle ${height} mm high (> 5 mm, reported to relate to peroneus longus impingement and stenosing tenosynovitis).`)
  }
  const length = num(values, 'tubercle-length')
  const width = num(values, 'peroneal-width')
  if (length !== undefined && width !== undefined && length > width) {
    out.push(`Peroneal tubercle prominent by the Huuskonen definition (length ${length} mm, wider peroneal tendon ${width} mm).`)
  }

  const around = list(values, 'achilles-other')
  if (haglund(values)) {
    out.push('Haglund\'s syndrome: bone marrow edema in the posterosuperior calcaneal prominence, retrocalcaneal bursitis and insertional tendinopathy.')
  } else {
    const achilles = str(values, 'achilles')
    const distance = num(values, 'achilles-distance')
    if (achilles && achilles !== 'normal') {
      out.push(`Achilles tendon: ${picked(values, fields.achilles)}${distance !== undefined ? `, ${distance} cm from the insertion${distalRupture(values) ? ' (distal)' : ''}` : ''}.`)
    }
    if (around.includes('bursitis')) out.push('Retrocalcaneal bursitis.')
    if (around.includes('prominence-bme')) out.push('Bone marrow edema in a posterosuperior calcaneal prominence.')
  }
  if (around.includes('paratenonitis')) out.push('Achilles paratenonitis.')
  if (str(values, 'posterior-impingement') === 'present') {
    const items = chosen(values, fields.posteriorImpingementFindings)
    out.push(items.length > 0 ? `Posterior impingement findings: ${items.join(', ')}.` : 'Posterior impingement findings present.')
  }

  if (str(values, 'anterior-tendons') === 'abnormal') out.push(`Anterior tendons: ${str(values, 'anterior-tendons-text') || 'abnormal'}.`)
  if (str(values, 'anterior-impingement') === 'present') {
    const items = chosen(values, fields.anteriorImpingementFindings)
    out.push(items.length > 0 ? `Anterior impingement findings: ${items.join(', ')}.` : 'Anterior impingement findings present.')
  }
  if (str(values, 'sinus-tarsi') === 'abnormal') out.push(`Sinus tarsi: ${chosen(values, fields.sinusTarsiFindings).join(', ') || 'abnormal'}.`)
  if (str(values, 'tarsal-tunnel') === 'abnormal') out.push(`Tarsal tunnel: ${chosen(values, fields.tarsalTunnelFindings).join(', ') || 'abnormal'}.`)
  const plantar = str(values, 'plantar-fascia')
  if (plantar && plantar !== 'normal') out.push(`Plantar fascia: ${plantarWords(values)}.`)
  return out.filter((sentence): sentence is string => Boolean(sentence))
}

const NORMAL_IMPRESSION = 'No acute osseous, ligamentous or tendinous abnormality of the ankle.'

/** True when any step's rule chip has fired with a warn tone, e.g. recess fluid over 12 mm. */
function warnChipFired(values: Values): boolean {
  return steps.some((step) => (step.derive?.(values) ?? []).some((chip) => chip.tone === 'warn'))
}

/**
 * The anatomical variants marked present, one impression sentence each. The author's
 * decision (2026-10-23): variants get their own impression line, not findings only.
 */
function variantSentences(values: Values): string[] {
  const out = chosen(values, fields.ossicles).map((name) => `${upperFirst(name)} (anatomical variant).`)
  if (str(values, 'quartus') === 'present') out.push('Peroneus quartus (anatomical variant).')
  if (list(values, 'pb-belly').length > 0) out.push('Low-lying peroneus brevis muscle belly (anatomical variant).')
  return out
}

function impression(values: Values): string {
  const found = findings(values)
  const variants = variantSentences(values)
  const limited = str(values, 'protocol') === 'incomplete' && 'Limited study (protocol incomplete).'
  const other = otherFindings(values)
  const negatives = list(values, 'impression-negatives').map((value) => `${optionLabel(fields.impressionNegatives, value)}.`)
  if (found.length === 0) {
    // Free text, and any warn chip without a sentence of its own, are not findings the
    // impression can name, so never call such a study normal: say only that they are above.
    if (other || warnChipFired(values)) return `Impression: ${lines(limited, 'Findings as above.', ...negatives, ...variants)}`
    // A normal impression only once every required item is answered.
    const complete = steps.every((step) => step.fields.every((field) => !field.required || str(values, field.id) !== ''))
    if (complete) return `Impression: ${lines(limited, NORMAL_IMPRESSION, ...variants)}`
    return variants.length > 0 ? `Impression: ${lines(...variants)}` : ''
  }
  return `Impression: ${lines(limited, ...found, other && 'Other findings as above.', ...negatives, ...variants)}`
}

/* "Check before signing": contradictions between entered findings. */

function ligamentInjuries(values: Values): string[] {
  const out: string[] = []
  for (const [id, name] of [...lateralLigaments, ...deltoid]) {
    const status = str(values, id)
    if (status && status !== 'intact') out.push(`${name} ${status === 'chronic' ? 'chronic injury' : ligamentWords[status] ?? status}`)
  }
  for (const [id, name] of syndesmoticLigaments) {
    const status = str(values, id)
    if (status && status !== 'intact') out.push(`${name} disruption`)
  }
  if (str(values, 'spring') === 'abnormal') out.push('spring ligament abnormality')
  if (str(values, 'iom') === 'abnormal') out.push('interosseous membrane abnormality')
  return out
}

function tendonTears(values: Values): string[] {
  const out = [...flexorTendons, ...peronealTendons]
    .filter(([id]) => str(values, id) === 'tear')
    .map(([, name]) => `${lowerFirst(name)} tear`)
  const achilles = str(values, 'achilles')
  if (achilles === 'partial' || achilles === 'complete') out.push(`Achilles ${picked(values, fields.achilles)}`)
  return out
}

function warnings(values: Values): string[] {
  const out: string[] = []
  const negatives = list(values, 'impression-negatives')
  const fracture = str(values, 'fracture')
  const checks: [string, string, string[]][] = [
    ['no-fracture', 'no fracture', fracture && fracture !== 'none' ? [picked(values, fields.fracture)] : []],
    ['no-ligament', 'no ligament injury', ligamentInjuries(values)],
    ['no-tendon-tear', 'no tendon tear', tendonTears(values)],
    ['no-olt', 'no osteochondral lesion', str(values, 'olt') === 'present' ? ['osteochondral lesion of the talus'] : []],
  ]
  for (const [key, phrase, found] of checks) {
    if (negatives.includes(key) && found.length > 0) out.push(`Impression says ${phrase}, but these are entered: ${found.join(', ')}.`)
  }

  if (fracture === 'complete' && str(values, 't1-line') === 'absent') {
    out.push('A complete fracture is entered, but so is no hypointense T1 line at the edema site, which excludes a complete fracture there.')
  }

  if (str(values, 'marrow') === 'normal') {
    const edema = [
      str(values, 'olt-appearance') === 'iia' && 'Hepple IIA osteochondral lesion (surrounding bony edema)',
      edematousOssicles(values).length > 0 && 'bone marrow edema in an accessory ossicle',
      list(values, 'achilles-other').includes('prominence-bme') && 'bone marrow edema in a posterosuperior calcaneal prominence',
      list(values, 'posterior-impingement-findings').includes('process-bme') && 'bone marrow edema in the posterior talar process or os trigonum',
    ].filter((item): item is string => Boolean(item))
    if (edema.length > 0) out.push(`Bone marrow edema is marked absent, but ${edema.length === 1 ? 'this is' : 'these are'} entered: ${edema.join(', ')}.`)
  }

  const intrasheath = str(values, 'intrasheath')
  const brevisSplit = str(values, 'pb') === 'tear' && str(values, 'pb-tear-type') === 'split'
  if (intrasheath === 'b' && !brevisSplit) {
    out.push('Intrasheath subluxation type B (longus through a brevis split) is entered, but no peroneus brevis longitudinal split tear is.')
  }
  const spr = str(values, 'spr')
  if (intrasheath === 'a' && (str(values, 'pb') === 'tear' || str(values, 'pl') === 'tear' || (spr !== '' && spr !== 'intact'))) {
    out.push('Intrasheath subluxation type A (no tendon tear, retinaculum intact) is entered, but so is a peroneal tendon tear or retinaculum injury.')
  }
  return out
}

function build(values: Values) {
  const text = lines(
    ...techniqueLines(values),
    ...boneLines(values),
    ...lateralLigaments.map(([id, name]) => {
      const thickness = num(values, `${id}-thickness`)
      return ligamentLine(values, id, name, thickness !== undefined ? `thickness ${thickness} mm` : undefined)
    }),
    ...syndesmosisLines(values),
    ...medialLigamentLines(values),
    ...flexorTendons.map(([id, name]) => tendonLine(values, id, name)),
    ...peronealLines(values),
    ...posteriorLines(values),
    ...anteriorLines(values),
    ...spaceLines(values),
    plantarLine(values),
    str(values, 'other') && `Other findings: ${str(values, 'other')}`,
    impression(values),
  )
  return { text: text || 'Start with Step 1 to build the report.', warnings: warnings(values) }
}

/* The steps, in the lesson's search-pattern order. Each teach panel quotes its lesson section. */

const steps: ReportStep[] = [
  {
    id: 'technique',
    title: 'Step 1. Technique and the global look',
    learn: 'technique',
    teach: (
      <>
        <p>The protocol should have sequences in all three orthogonal planes, with an axial oblique plane added if the flexor tendons need closer analysis. Fat-suppressed T2- or proton-density-weighted imaging is mandatory, and at least one T1-weighted sequence is needed for the bone marrow (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>Bone marrow edema (BME), or bone bruise, is low signal on T1-weighted images and high signal on T2-weighted and fluid-sensitive sequences such as STIR or fat-suppressed images. It is an unspecific but sensitive sign of the primary pathology, and where it sits guides a systematic read of the rest of the examination (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>One cohort study coded effusion in three levels: no gap between the talus and the adjacent fat pad in the anterior recess (no effusion); fluid making that gap, with fluid expanding the posterior recess (moderate); and fluid also making a gap between the anterior tibia and its fat pad (severe) (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). That is the study's own coding rather than a validated grade, so use it to describe the effusion, not to score it.</p>
      </>
    ),
    fields: [fields.protocol, fields.protocolMissing, fields.effusion, fields.marrow],
  },
  {
    id: 'bones',
    title: 'Step 2. Bones and marrow',
    learn: 'bones',
    teach: (
      <>
        <p>Szaro and colleagues reproduce the Costa-Paz classification of BME (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>):</p>
        {costaPazTable}
        <p>The absence of a hypointense line on T1-weighted images excludes a complete fracture (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
        <p>The Hepple MRI staging, as Walther and colleagues reproduce it in their Table 5 (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>):</p>
        {heppleTable}
        <p>BME in an accessory bone suggests it is symptomatic. The commonest accessory bones are the os peroneum, os naviculare accessorium and os trigonum (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
      </>
    ),
    fields: [fields.bmeSite, fields.bmePattern, fields.t1Line, fields.fracture, fields.fractureSite, fields.olt, fields.oltSite, fields.oltAppearance, fields.ossicles, fields.ossicleBme],
    derive: deriveBones,
  },
  {
    id: 'lateral-ligaments',
    title: 'Step 3. Lateral ligaments (ATFL, CFL, PTFL)',
    learn: 'lateral-ligaments',
    teach: (
      <>
        <p>Acute ligament injuries are graded as interstitial, partial or complete tear (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>):</p>
        <ul className="plain-list">
          <li><strong>Interstitial:</strong> hyperintense signal within the ligament on PD and T2-weighted images, from edema or hemorrhage.</li>
          <li><strong>Partial:</strong> partial discontinuity reaching the surface but not involving the entire thickness of the ligament.</li>
          <li><strong>Complete:</strong> discontinuity of the entire thickness, seen as a fluid-filled defect with retraction.</li>
        </ul>
        <p>Chronic injury shows an attenuated (thin) or thickened ligament with irregular contours and no edema or hemorrhage. Normal thickness is 2 to 3 mm for the ATFL and 2 mm for the CFL (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Do not call striations a tear: the normal PTFL, the deep deltoid and the anterior inferior tibiofibular ligament show heterogeneous signal and striations because of fat between their fascicles (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
      </>
    ),
    fields: [fields.atfl, fields.atflThickness, fields.cfl, fields.cflThickness, fields.ptfl],
    derive: deriveLateralLigaments,
  },
  {
    id: 'syndesmosis',
    title: 'Step 4. Syndesmosis',
    learn: 'syndesmosis',
    teach: (
      <>
        <p>Oae and colleagues called a syndesmotic ligament disrupted when MRI showed ligament discontinuity (criterion 1), or a wavy or curved contour or non-visualisation of the ligament (criterion 2). Using both criteria, MRI diagnosed AITFL disruption with 100% sensitivity, 93% specificity and 97% accuracy, and PITFL disruption with 100% sensitivity, specificity and accuracy (<Cite doi={OAE}>Oae et al., Radiology 2003</Cite>).</p>
        <p>Fluid in the tibiofibular recess normally measures 5 to 7 mm. Fluid measuring more than 12 mm is definitely abnormal and suggests acute injury to the syndesmotic ligaments (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Also look at the interosseous membrane.</p>
      </>
    ),
    fields: [fields.aitfl, fields.pitfl, fields.recess, fields.iom, fields.iomText],
    derive: deriveSyndesmosis,
  },
  {
    id: 'medial-ligaments',
    title: 'Step 5. Medial ligaments (deltoid, spring)',
    learn: 'medial-ligaments',
    teach: (
      <>
        <p>The deltoid has a superficial component (tibiocalcaneal, tibionavicular and tibiospring ligaments) and a deep component (anterior and posterior tibiotalar ligaments). Normal thickness is 1 to 2 mm for the tibionavicular ligament and 2 mm (1 to 4 mm) for the tibiospring ligament; the posterior tibiotalar ligament is the thickest at 6 to 11 mm (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>The spring ligament complex has superomedial, medioplantar oblique and inferoplantar longitudinal components. The superomedial component normally measures 3 mm (2 to 5 mm) and the inferoplantar longitudinal component 4 mm (2 to 6 mm) (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Kimura and colleagues judged the spring ligament complex by waviness, abnormally high signal and discontinuity (<Cite doi={KIMURA}>Kimura et al., Acta Radiol Open 2020</Cite>).</p>
      </>
    ),
    fields: [fields.deltoidSuperficial, fields.tnlThickness, fields.tslThickness, fields.deltoidDeep, fields.pttlThickness, fields.spring, fields.springFindings, fields.springSmThickness, fields.springIplThickness],
  },
  {
    id: 'medial-tendons',
    title: 'Step 6. Medial tendons (tibialis posterior, FDL, FHL)',
    learn: 'medial-tendons',
    teach: (
      <>
        <p>Kimura and colleagues called the tibialis posterior injured when it showed abnormally high signal, thickening and/or an obvious tear (<Cite doi={KIMURA}>Kimura et al., Acta Radiol Open 2020</Cite>).</p>
        <p>Advanced tibialis posterior injury has a high association with spring ligament and sinus tarsi abnormalities. Two or more associated abnormalities were present in 80% of patients with tibialis posterior injury and 16% of those with a normal tendon (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>). So an injured tibialis posterior sends you back to step 5 and on to step 10.</p>
      </>
    ),
    fields: [...fields.ptt, ...fields.fdl, ...fields.fhl],
  },
  {
    id: 'lateral-tendons',
    title: 'Step 7. Lateral tendons (peroneus brevis and longus)',
    learn: 'lateral-tendons',
    teach: (
      <>
        <p>Tendinosis and tenosynovitis are best seen on T2-weighted or axial PD-weighted images, as increased signal in the tendon and fluid around it. Circumferential fluid in the common peroneal sheath wider than 3 mm is highly specific for peroneal tenosynovitis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        <p>Beware the magic angle: as the tendons curve round the lateral malleolus their fibres lie at 55° to the magnetic field, giving artefactual signal. Consider it before excluding a tear; T2-weighted images (or any long echo time sequence) and plantar flexion of the foot reduce it (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        <p>The Brandes-Smith zones locate a tear: zone A under the superior retinaculum, zone B at the inferior peroneal retinaculum, and zone C at the cuboid notch, where longus pathology occurs most often. Intrasheath subluxation has two types, which Davda and colleagues quote from Raikin and colleagues: in type A the peroneus brevis and longus switch positions without a tear in the tendons or disruption of the SPR; in type B the peroneus longus subluxes through a longitudinal split in the peroneus brevis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>
        <p>Davda and colleagues quote the surgical grading of superior peroneal retinaculum (SPR) injury (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). They give no MRI criteria for each grade, so use these as descriptions only.</p>
        <p>A low-lying peroneus brevis has two working definitions. Davda and colleagues call it low-lying when the muscle belly extends below the superior margin of the SPR (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Huuskonen and colleagues called it low-lying when the belly was seen at least at the level of the lateral malleolus where the PTFL attaches (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). Say which definition you used.</p>
        <p>A peroneal tubercle more than 5 mm high is reported to be related to peroneus longus impingement and stenosing tenosynovitis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Huuskonen and colleagues called the tubercle prominent when its length, measured from the lateral margin of the calcaneus, exceeded the width of each peroneal tendon (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>).</p>
      </>
    ),
    fields: [
      ...fields.pb, fields.pbTearSite, ...fields.pl, fields.plTearSite, fields.peronealFluid, fields.peronealPosition,
      fields.intrasheath, fields.spr, fields.pbBelly, fields.quartus, fields.tubercleHeight, fields.tubercleLength, fields.peronealWidth,
    ],
    derive: deriveLateralTendons,
  },
  {
    id: 'posterior',
    title: 'Step 8. Posterior (Achilles, Haglund, posterior impingement)',
    learn: 'posterior',
    teach: (
      <>
        <p>Total rupture is most common at the midportion, 5 to 6 cm from the insertion, with frayed ends and a gap between them. The gap may be most apparent on sagittal images, but the coronal images help too, and significant diastasis between the stumps may be an indication for surgery. A distal total rupture, within 2 cm of the insertion, is rare (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>). The paper gives no number for a significant gap.</p>
        <p>BME within the bony prominence, retrocalcaneal bursitis and insertional tendinopathy together make up Haglund's syndrome (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>).</p>
        <p>An elongated posterior process of the talus or an os trigonum causes posterior impingement. BME in the posterior talar process or os trigonum, edema in Kager's fat pad and effusion in the posterior recess are frequent findings (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>
      </>
    ),
    fields: [fields.achilles, fields.achillesDistance, fields.achillesGap, fields.achillesOther, fields.posteriorImpingement, fields.posteriorImpingementFindings],
    derive: derivePosterior,
  },
  {
    id: 'anterior',
    title: 'Step 9. Anterior (tendons and impingement)',
    learn: 'anterior',
    teach: (
      <>
        <p>Look at the anterior tendons: tibialis anterior, extensor hallucis longus and extensor digitorum longus.</p>
        <p>On MRI, look for bone edema, effusion, synovitis, tenosynovitis and chondral injury; in anterior soft-tissue impingement the anterolateral gutter may contain hypertrophic synovium or fibrosis (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
        <p>MRI is variable for soft-tissue impingement, with reported sensitivities of 42% to 89% and specificities of 75% to 100% (<Cite doi={LAVERY}>Lavery et al., J Orthop Surg Res 2016</Cite>).</p>
      </>
    ),
    fields: [fields.anteriorTendons, fields.anteriorTendonsText, fields.anteriorImpingement, fields.anteriorImpingementFindings],
  },
  {
    id: 'spaces',
    title: 'Step 10. Spaces and nerves (sinus tarsi, tarsal tunnel)',
    learn: 'spaces',
    teach: (
      <>
        <p>In patients with sinus tarsi syndrome, MRI showed tears of the interosseous talocalcaneal and cervical ligaments, isolated cervical ligament tears, ganglia, and in one patient pigmented villonodular synovitis (<Cite doi={LEKTRAKUL}>Lektrakul et al., Radiology 2001</Cite>).</p>
        <p>MRI shows the flexor retinaculum and the structures deep to it: the tibialis posterior, FDL and FHL tendons and the posterior tibial neurovascular bundle, along with the medial calcaneal branches and the medial and lateral plantar nerves. In six symptomatic patients, MRI showed a mechanical cause of compression in all: two neurilemomas, tenosynovitis of all three tendons, a ganglion from the FHL sheath, post-traumatic fibrosis, and post-traumatic fibrosis with a neuroma (<Cite doi={ERICKSON}>Erickson et al., AJR 1990</Cite>).</p>
      </>
    ),
    fields: [fields.sinusTarsi, fields.sinusTarsiFindings, fields.tarsalTunnel, fields.tarsalTunnelFindings],
  },
  {
    id: 'plantar',
    title: 'Step 11. Plantar fascia',
    learn: 'plantar',
    teach: (
      <>
        <p>MRI findings of plantar fasciitis are thickening, most often at the calcaneal origin; areas of intermediate signal on T1-weighted and increased signal on fluid-sensitive images; edema in the adjacent soft tissue; and BME at the calcaneal attachment, suggesting enthesopathy (<Cite doi={DRAGHI}>Draghi et al., Insights Imaging 2017</Cite>).</p>
        <p>In a small study of eight patients, maximum fascia thickness averaged 7.40 mm on sagittal images in plantar fasciitis against 3.22 mm in matched volunteers (<Cite doi={BERKOWITZ}>Berkowitz et al., Radiology 1991</Cite>). These are group means, not a cut-off; none of the papers here gives an MRI thickness threshold.</p>
        <p>An acute tear shows complete or partial interruption of the low-signal fascia. A plantar fibroma is a lobulated mass of low signal on both T1- and T2-weighted images (<Cite doi={DRAGHI}>Draghi et al., Insights Imaging 2017</Cite>).</p>
      </>
    ),
    fields: [fields.plantarFascia, fields.plantarTearType, fields.plantarThickness],
  },
  {
    id: 'impression',
    title: 'Step 12. Other findings and the impression',
    learn: 'impression',
    teach: (
      <>
        <p>Before writing the impression, read the steps against each other. Ligaments and adjacent tendons work together and are most often injured together, and bone contusion, osteochondral lesion and joint effusion are other common associations (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <p>Grading the injury from mild to severe and judging instability combines the MRI features with clinical tests such as the drawer, inversion and eversion tests (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
      </>
    ),
    fields: [fields.other, fields.impressionNegatives],
  },
]

const study: StudyDefinition = {
  slug: 'ankle-mri',
  name: 'Ankle MRI',
  lede: 'Read an ankle MRI with no history beyond pain: a fixed search pattern through bones, ligaments, tendons, spaces and the plantar fascia, and the report.',
  sourceNote: 'Draft lesson compiled from the papers below; citations checked against PubMed in October 2026. Not yet reviewed by the site author.',
  references,
  report: {
    steps,
    build,
  },
  learn,
  quiz: [
    {
      id: 'oae-criteria',
      question: 'On MRI the AITFL is not seen at all. By the criteria Oae and colleagues used, how do you call it?',
      options: ['Intact, because a ligament that is not seen cannot show a tear', 'Disrupted, by criterion 2', 'Disrupted, by criterion 1 (discontinuity)', 'Indeterminate until fluid in the recess is measured'],
      answer: 1,
      explanation: <p>Oae and colleagues called a syndesmotic ligament disrupted on discontinuity (criterion 1), or on a wavy or curved contour or non-visualisation (criterion 2). Using both criteria, AITFL disruption was diagnosed with 100% sensitivity, 93% specificity and 97% accuracy (<Cite doi={OAE}>Oae et al., Radiology 2003</Cite>).</p>,
    },
    {
      id: 'striations',
      question: 'The PTFL shows heterogeneous signal with fine striations, but no discontinuity. What does that mean?',
      options: ['A partial tear', 'An interstitial tear', 'A chronic injury', 'Not a tear: fat between the fascicles normally gives striations'],
      answer: 3,
      explanation: <p>The normal PTFL, the deep deltoid and the AITFL show heterogeneous signal and striations because of fat between their fascicles, so do not call striations a tear. Acute injury instead shows blurred margins, irregular contours, inhomogeneous signal or loss of the normal low signal within the ligament (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>,
    },
    {
      id: 'sawant-grade',
      question: 'The ATFL has hyperintense signal on PD and T2-weighted images from edema or hemorrhage, with no discontinuity. Which grade of acute injury is that?',
      options: ['Interstitial', 'Partial', 'Complete', 'Chronic'],
      answer: 0,
      explanation: <p>Acute ligament injuries are graded as interstitial, partial or complete. Interstitial is hyperintense signal within the ligament from edema or hemorrhage. Partial needs discontinuity reaching the surface but not the whole thickness, and complete is discontinuity of the entire thickness, seen as a fluid-filled defect with retraction (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>,
    },
    {
      id: 'recess-12',
      question: 'Fluid in the tibiofibular recess measures more than 12 mm. What does the lesson say that means?',
      options: ['It is normal, since the normal range is 5 to 12 mm', 'It is definitely abnormal and suggests acute injury to the syndesmotic ligaments', 'It proves the PITFL is torn', 'It is indeterminate until the interosseous membrane has been checked'],
      answer: 1,
      explanation: <p>Fluid in the tibiofibular recess normally measures 5 to 7 mm. Fluid measuring more than 12 mm is definitely abnormal and suggests acute injury to the syndesmotic ligaments (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>,
    },
    {
      id: 't1-line',
      question: 'A bone bruise is seen, and no hypointense line is visible on the T1-weighted images. What can you say about fracture?',
      options: ['A complete fracture is excluded', 'A complete fracture is likely, and needs different treatment', 'It is probably an osteochondral lesion', 'Nothing: T1 cannot comment on fracture'],
      answer: 0,
      explanation: <p>The absence of a hypointense line on T1-weighted images excludes a complete fracture (<Cite doi={SZARO_BME}>Szaro et al., Insights Imaging 2020</Cite>).</p>,
    },
    {
      id: 'hepple-iii',
      question: 'An osteochondral lesion of the talus has a detached but undisplaced fragment. Which Hepple MRI stage is it?',
      options: ['Stage IIB', 'Stage IV', 'Stage V', 'Stage III'],
      answer: 3,
      explanation: <p>In the Hepple MRI staging as Walther and colleagues reproduce it, stage III is a detached but undisplaced fragment and stage IV a detached and displaced one. IIB is cartilage damage with underlying fracture but no bony edema, and V is subchondral cyst formation (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>,
    },
    {
      id: 'magic-angle',
      question: 'Increased signal is seen in the peroneal tendons where they curve round the lateral malleolus. What is the artefact to consider before calling a tear, and what reduces it?',
      options: ['The magic angle, at 55° to the magnetic field; T2-weighted images (long echo time) and plantar flexion of the foot reduce it', 'The magic angle, at 55° to the magnetic field; short echo time images and dorsiflexion reduce it', 'Chemical shift; fat suppression reduces it', 'Motion; a shorter sequence reduces it'],
      answer: 0,
      explanation: <p>As the tendons follow a curved path round the lateral malleolus their fibres lie at 55° to the magnetic field, giving artefactual signal. Consider it before excluding a tear; T2-weighted images, or any long echo time sequence, and plantar flexion of the foot reduce it (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>,
    },
    {
      id: 'sheath-fluid',
      question: 'What is the threshold for circumferential fluid in the common peroneal sheath above which it is highly specific for peroneal tenosynovitis?',
      options: ['1 mm', '2 mm', '3 mm', '5 mm'],
      answer: 2,
      explanation: <p>Circumferential fluid within the common peroneal sheath wider than 3 mm is highly specific for peroneal tenosynovitis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>,
    },
    {
      id: 'low-lying-brevis',
      question: 'You want to report a low-lying peroneus brevis. Which statement matches the lesson?',
      options: ['There is one agreed definition, the belly extending below the superior margin of the SPR', 'There is one agreed definition, the belly reaching the level of the PTFL attachment', 'Davda and colleagues use the belly below the superior margin of the SPR, Huuskonen and colleagues the belly at least at the level of the PTFL attachment, so say which you used', 'Davda and Huuskonen give the same definition in different words'],
      answer: 2,
      explanation: <p>Davda and colleagues call the brevis low-lying when the muscle belly extends below the superior margin of the SPR, while noting that foot position changes the level of the musculotendinous junction (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>). Huuskonen and colleagues used the belly seen at least at the level of the lateral malleolus where the PTFL attaches (<Cite doi={HUUSKONEN}>Huuskonen et al., J Foot Ankle Res 2023</Cite>). The definitions differ, so keep them apart.</p>,
    },
    {
      id: 'achilles-rupture-site',
      question: 'Where does a total Achilles rupture most commonly occur?',
      options: ['At the midportion, 5 to 6 cm from the insertion', 'Within 2 cm of the insertion', 'At the myotendinous junction, 10 cm or more above the insertion', 'At the calcaneal insertion itself'],
      answer: 0,
      explanation: <p>Total rupture is most common at the midportion, 5 to 6 cm from the insertion, with frayed ends and a gap between them. A distal total rupture, within 2 cm of the insertion, is rare (<Cite doi={SZARO_ACHILLES}>Szaro et al., Eur J Radiol Open 2021</Cite>).</p>,
    },
    {
      id: 'ptt-associations',
      question: 'You find advanced tibialis posterior tendon injury. Which two structures does the lesson say to go back and check, because the lesson reports a high association with it?',
      options: ['The plantar fascia and the Achilles tendon', 'The AITFL and the PITFL', 'The spring ligament and the sinus tarsi', 'The peroneus brevis and the peroneus longus'],
      answer: 2,
      explanation: <p>Advanced tibialis posterior injury has a high association with spring ligament and sinus tarsi abnormalities: the spring ligament was abnormal in 92% of patients with the injury and 28% of those with a normal tendon, the sinus tarsi in 72% and 36%. The plantar fascia association was low and not significant (<Cite doi={BALEN}>Balen and Helms, AJR 2001</Cite>).</p>,
    },
    {
      id: 'olt-asymptomatic',
      question: 'MRI shows an osteochondral lesion of the talus in a patient with minimal symptoms. What does the lesson advise?',
      options: ['Treat it as the cause of the pain and recommend prophylactic surgery', 'Ignore it, since osteochondral lesions on MRI are never relevant', 'Repeat the MRI in 3 months before reporting it', 'It is not always the cause of the pain, and MRI findings alone are no reason to urge prophylactic surgery'],
      answer: 3,
      explanation: <p>In a cohort Walther and colleagues quote, osteochondral lesions were found in 42% of 37 asymptomatic professional soccer players. They advise that MRI findings alone are no reason to urge patients with minimal or no symptoms toward prophylactic surgery (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>,
    },
  ],
}

export function AnkleMriStudyPage() {
  return <StudyPage study={study} />
}
