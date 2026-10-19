import { Cite } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { StudyPage } from '../study/StudyPage'
import type { LearnSection, StudyDefinition } from '../study/types'

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
        <p>Intrasheath subluxation has two types: in type A the peroneus brevis and longus switch positions without a tear in the tendons or disruption of the SPR; in type B the peroneus longus subluxes through a longitudinal split in the peroneus brevis (<Cite doi={DAVDA}>Davda et al., EFORT Open Rev 2017</Cite>).</p>

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
        <p>Grading the injury from mild to severe and judging instability combines the MRI features with clinical tests such as the drawer, inversion and eversion tests (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>). Sawant and Sanghvi add, as background, that most sprains are stable and treated conservatively, those with osteochondral lesions arthroscopically, and severe sprains with instability by ligament reconstruction (<Cite doi={SAWANT}>Sawant and Sanghvi, Indian J Radiol Imaging 2018</Cite>).</p>
        <div className="lesson-key">
          <p>An osteochondral lesion on MRI is not always the cause of the pain: in a cohort Walther and colleagues quote, lesions were found in 42% of 37 asymptomatic professional soccer players, and Walther and colleagues advise that MRI findings alone are no reason to urge patients with minimal or no symptoms toward prophylactic surgery (<Cite doi={WALTHER}>Walther et al., Cartilage 2023</Cite>).</p>
        </div>
      </>
    ),
  },
]

const study: StudyDefinition = {
  slug: 'ankle-mri',
  name: 'Ankle MRI',
  lede: 'Read an ankle MRI with no history beyond pain: a fixed search pattern through bones, ligaments, tendons, spaces and the plantar fascia, and the report.',
  sourceNote: 'Draft lesson compiled from the papers below; citations checked against PubMed in October 2026. Not yet reviewed by the site author.',
  references,
  report: {
    // Placeholder until the report builder is written (Task 3 replaces it).
    steps: [],
    build: () => ({ text: '', warnings: [] }),
  },
  learn,
  quiz: [],
}

export function AnkleMriStudyPage() {
  return <StudyPage study={study} />
}
