import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'ACR O-RADS MRI documents (free PDFs): the Risk Score table and the Governing Concepts, May 2024 revision.' },
  { citation: 'Sadowski EA et al. Radiology 2022;303:35–47. The committee\'s illustrated guide. Read this first.' },
  { citation: 'Reinhold C et al. J Am Coll Radiol 2021;18:713–729. The lexicon. Read once, then keep for definitions.' },
  { citation: 'Thomassin-Naggara I et al. JAMA Netw Open 2020;3(1):e1919896. The validation study (EURAD).' },
  { citation: 'Thomassin-Naggara I et al. Eur Radiol 2021;31:9588–9599. The misclassified cases.' },
  { citation: 'Wengert GJ et al. Radiology 2022;303:566–575. Why you should draw the curve.' },
  { citation: 'Tong A et al. RadioGraphics 2026;47(9):e250197. Protocol.' },
  { citation: 'Kılıçkap G. Diagn Interv Radiol 2025;31:171–179. Meta-analysis.' },
  { citation: 'Corwin MT et al. Radiology 2014. The T2 dark spot sign for endometrioma.' },
  { citation: 'Sebastià C et al. Radiología 2022;64:542–551. From theory to practice, case-based.' },
]

const reportTemplate = `Clinical: age, menopausal status (state it explicitly; the score depends on it),
  CA-125 if known, why the ultrasound was indeterminate.
Technique: sequences; whether DCE was performed and the myometrium was in the field.
  If no DCE, say the score is based on 30–40 s post-contrast imaging.

Findings, for each adnexal lesion separately:
  1. Side, origin (ovarian / tubal / paraovarian / uncertain) and why.
  2. Size in three dimensions.
  3. Architecture: unilocular, multilocular, solid, mixed.
  4. Fluid type(s) and whether there is fat.
  5. Wall and septa: thin/thick, smooth/irregular, enhancing or not.
  6. Enhancing solid tissue: present or absent. If present: type (papillary
     projection / nodule / irregular septum / larger solid), size, T2 and DWI
     signal, curve type vs myometrium (or enhancement vs myometrium at 30–40 s).
  7. Contralateral ovary.
Also: uterus and endometrium (thickened endometrium + ovarian mass hints at a
  hormone-producing tumor), free fluid (simple vs complex, amount), peritoneum
  and omentum, pelvic and retroperitoneal nodes, hydronephrosis, bone marrow on T1.

Impression:
  Lesion by lesion: most likely diagnosis if you have one, then
    "O-RADS MRI [score] — [risk category]".
  If several lesions, state which one drives management.
  Management line: score 2 → no imaging follow-up (or routine gynecology);
    score 3 → gynecology referral, follow-up or surgery at their discretion;
    score 4 or 5 → gynecologic oncology referral.`

export function AdnexalMriLessonPage() {
  return (
    <LessonPage
      name="Adnexal mass MRI (O-RADS MRI)"
      lede="A short series of yes/no questions that sorts an indeterminate adnexal mass into one of five risk buckets."
      sourceNote="Use the ACR O-RADS MRI Risk Score v1 (2020), with the governing concepts revised in May 2024. There is no v2 yet."
      references={references}
    >
      <section className="info-card lesson-body">
        <h3>1. Where O-RADS MRI fits</h3>
        <p>O-RADS MRI is a problem-solving tool. Its job is to take a mass that ultrasound couldn't sort out and put it into one of five risk buckets so the gynecologist knows who should operate (if anyone).</p>
        <p>The system assumes an average-risk patient with no acute symptoms, and clinical management directed by the treating physician supersedes imaging-based recommendations. So it is <em>not</em> for: torsion, tubo-ovarian abscess, ruptured ectopic, or a patient already known to have ovarian cancer (that's staging, a different job).</p>
        <p>The score grew out of the French "AdnexMR" score of 2012 (Thomassin-Naggara, Radiology 2013). The validating paper is the EURAD study: Thomassin-Naggara et al., JAMA Network Open 2020;3(1):e1919896, a prospective multicenter study of roughly 1,300 women across 15 European centers. That paper is the reason the risk numbers in the table below exist.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>2. What you need on the scanner</h3>
        <p>You cannot score properly without the right sequences. The three "money" sequences are T2, T1 with and without fat saturation, and dynamic contrast (DCE). Deviating from the recommended minimum protocol may change the diagnostic performance of the score. The minimum protocol:</p>
        <ul className="plain-list">
          <li><strong>T2 without fat sat</strong> in at least two planes (sagittal and axial; add coronal if the ovary is hard to find). This is your anatomy map.</li>
          <li><strong>T1 without fat sat</strong>: shows blood, protein and fat as bright.</li>
          <li><strong>T1 with fat sat</strong>: tells fat apart from blood. Fat goes dark; blood stays bright.</li>
          <li><strong>DWI with a high b value (b800–1000)</strong> plus ADC.</li>
          <li><strong>DCE (dynamic contrast)</strong>: a 3D fat-sat T1 repeated every few seconds for about 4 minutes after injection, with the uterus in the field of view. You need the myometrium as your reference tissue. If you can't do DCE, a single post-contrast series at 30–40 seconds is the fallback, but the score changes slightly (explained below).</li>
          <li>Field of view large enough to cover the whole lesion and the lower peritoneum.</li>
        </ul>
        <p>A 2026 RadioGraphics article walks through the protocol in detail: Tong A, Kim N, Patel-Lippman K, Nougaret S, et al. Optimizing the MRI pelvis protocol for O-RADS MRI. RadioGraphics 2026;47(9):e250197. Worth reading once with your MR technologist.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>3. How to read the study: the step-by-step algorithm</h3>
        <p>Think of it as a funnel. Each step either assigns a score and stops, or sends you to the next step.</p>

        <div className="lesson-step">
          <h4>Step 0. Before you look at the lesion, note two things</h4>
          <p>Categorize the patient as pre- or postmenopausal (≥1 year of amenorrhea). Then count the lesions: with multiple or bilateral lesions, each lesion is characterized separately, and management follows the lesion with the highest score.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 1. Is it actually ovarian/adnexal?</h4>
          <p>This is where most beginner errors happen. Find both ovaries on T2 (look for the follicles). Then ask:</p>
          <ul className="plain-list">
            <li>Does the mass sit <em>inside</em> the ovary, stretching it (the "beak" or "claw" of ovarian tissue around it)? → ovarian.</li>
            <li>Is the ovary seen separately and normal? → probably not ovarian. Think fibroid (look for a bridging vessel to the uterus), hydrosalpinx (tubular, folded), paraovarian cyst, peritoneal inclusion cyst (conforms to the space around a normal ovary), or a bowel/nerve/lymph node lesion.</li>
            <li>Trace the ovarian vein from the mass upward. If it leads to the mass, that's a strong sign the mass is ovarian.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Is there peritoneal disease?</h4>
          <p>Look at the pouch of Douglas, paracolic gutters, omentum, liver surface, and diaphragm on your widest images. Ascites plus peritoneal nodules or thickened, enhancing peritoneum = O-RADS 5, regardless of what the ovarian mass itself looks like. Don't be fooled by a small amount of simple free fluid in a premenopausal woman; that's normal.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. What is the lesion made of?</h4>
          <p>Decide whether it's cystic, solid, or mixed. For the cystic part, name the fluid:</p>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Fluid type</th><th>T1</th><th>T1 fat-sat</th><th>T2</th><th>Clues</th></tr></thead>
              <tbody>
                <tr><td>Simple</td><td>dark</td><td>dark</td><td>very bright</td><td>follicle, serous cystadenoma</td></tr>
                <tr><td>Hemorrhagic / proteinaceous</td><td>bright</td><td>stays bright</td><td>variable</td><td>hemorrhagic cyst, mucinous</td></tr>
                <tr><td>Endometriotic</td><td>very bright</td><td>stays bright</td><td>dark or "shading"</td><td>T2 shading, T2 dark spots (old clot)</td></tr>
                <tr><td>Lipid (fat)</td><td>bright</td><td><strong>goes dark</strong></td><td>bright</td><td>dermoid; chemical-shift artifact at edges</td></tr>
                <tr><td>Mucinous</td><td>slightly bright</td><td>stays bright</td><td>slightly less bright than water</td><td>often multilocular with different signal in each locule ("stained glass")</td></tr>
              </tbody>
            </table>
          </div>
          <p>Fat is your most important find here. Fluid, fatty, or endometriotic content places the lesion in O-RADS 2 as long as there is no wall enhancement or solid tissue.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Is there enhancing solid tissue? (The single most important question.)</h4>
          <p>"Solid tissue" has a specific meaning in the lexicon (Reinhold et al., J Am Coll Radiol 2021;18:713–729). It means an <em>enhancing</em> component that is one of: a papillary projection (a branching frond growing from a wall or septum), a mural nodule, an irregular septation or irregular wall thickening, or a larger solid component.</p>
          <p>It does <strong>not</strong> mean: smooth, thin wall or smooth septa (even if they enhance); clot or debris (bright on T1, does not enhance; use subtraction images to prove it); fat or a Rokitansky nodule in a dermoid. The 2024 revision is explicit: characteristic mature teratomas may contain septations or minimal enhancement of Rokitansky nodules, and these do not upgrade the lesion to O-RADS 4.</p>
          <p>If there is <strong>no</strong> enhancing solid tissue, you score by fluid and wall (see the score table): most of these land in 2 or 3.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. If there IS solid tissue, look at it on T2 and DWI first</h4>
          <p>Solid tissue that is dark on T2 and dark on high-b DWI is O-RADS 2. This is the fibroma/fibrothecoma/cystadenofibroma/Brenner rule. Dense fibrous tissue has few cells and little water, so it is dark on both. "Dark" means homogeneously as dark as skeletal muscle. If any part is intermediate or bright on either sequence, this rule does not apply; move on.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Everything else with solid tissue: the enhancement curve</h4>
          <p>Draw a region of interest on the most enhancing part of the solid tissue and one on the outer myometrium. Compare the two curves:</p>
          <ul className="plain-list">
            <li><strong>Type 1 (low risk)</strong>: slow, gradual rise, never as steep as the myometrium, no plateau → <strong>O-RADS 3</strong></li>
            <li><strong>Type 2 (intermediate)</strong>: rises faster than type 1 but still less steeply than the myometrium, then flattens (plateau) → <strong>O-RADS 4</strong></li>
            <li><strong>Type 3 (high risk)</strong>: rises as fast as or faster than the myometrium, then plateaus or washes out → <strong>O-RADS 5</strong></li>
          </ul>
          <p>If you only have a single post-contrast series at 30–40 s (no DCE): solid tissue enhancing ≤ myometrium is O-RADS 4; enhancing more than the myometrium is O-RADS 5. Without DCE you lose the ability to call a curve "low risk" (score 3), which is why DCE matters.</p>
          <p>A practical point from the EURAD group: drawing the curve is more accurate than eyeballing it (Wengert et al., Radiology 2022;303:566–575). Take the extra minute.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Tubes and paraovarian lesions have their own lines</h4>
          <p>A dilated tube with simple fluid, thin smooth wall and folds, no solid tissue → 2. Non-simple fluid or a thick wall → 3. A paraovarian cyst with a thin wall and no solid tissue → 2.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. Assign the score, and remember rule 5 of the governing concepts</h4>
          <p>Some lesions can be confidently diagnosed on MRI regardless of the score; in those cases the final diagnosis can be reported (e.g., dysgerminoma, granulosa cell tumor, lymphoma, peritoneal pseudocyst). The score is a risk estimate, not a substitute for a diagnosis you can actually make.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>4. The score table</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Score</th><th>Risk category</th><th>PPV for malignancy</th><th>What lands here</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>Incomplete</td><td>—</td><td>Missing key sequences, motion, lesion cut off</td></tr>
              <tr><td>1</td><td>Normal ovaries</td><td>—</td><td>No lesion; follicle ≤3 cm, hemorrhagic cyst ≤3 cm, or corpus luteum ≤3 cm in a premenopausal woman</td></tr>
              <tr><td>2</td><td>Almost certainly benign</td><td>{'<'}0.5%</td><td>Unilocular cyst of any fluid with no wall enhancement; unilocular simple or endometriotic cyst with smooth enhancing wall; fat-containing lesion without enhancing solid tissue; T2-dark/DWI-dark solid; simple hydrosalpinx; paraovarian cyst</td></tr>
              <tr><td>3</td><td>Low risk</td><td>~5%</td><td>Unilocular proteinaceous/hemorrhagic/mucinous cyst with smooth enhancing wall; multilocular cyst (no fat) with smooth septa; solid tissue with type 1 curve; hydrosalpinx with non-simple fluid or thick wall</td></tr>
              <tr><td>4</td><td>Intermediate</td><td>~50%</td><td>Solid tissue with type 2 curve; solid tissue enhancing ≤ myometrium at 30–40 s if no DCE; fat-containing lesion with a lot of enhancing soft tissue</td></tr>
              <tr><td>5</td><td>High risk</td><td>~90%</td><td>Solid tissue with type 3 curve; solid tissue enhancing {'>'} myometrium at 30–40 s; any peritoneal/omental implants</td></tr>
            </tbody>
          </table>
        </div>
        <p>The primary source for this table is the ACR document (O-RADS MRI Risk Stratification and Management System) and the committee guide: Sadowski EA, Thomassin-Naggara I, Rockall A, et al. Radiology 2022;303(1):35–47. A 2025 meta-analysis (Kılıçkap G, Diagn Interv Radiol 2025;31(3):171–179) pooled the published studies and confirmed the score performs well outside the original French/European cohort.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>5. The pathologies, organized by where they land</h3>
        <p>The "one-look" signature for each, then the trap.</p>

        <h4>Score 1–2: the things you should be able to dismiss</h4>
        <ul className="plain-list">
          <li><em>Follicle / simple cyst.</em> Water signal, thin wall, no enhancement of anything inside. Trap: size. Above 3 cm in a premenopausal woman it becomes a score 2 lesion, not score 1; same look, different label.</li>
          <li><em>Corpus luteum.</em> Thick, crenulated, strongly enhancing wall, often T1-bright inside. Trap: it looks worrying on a single post-contrast image. The crenulated wall pattern and a premenopausal patient give it away.</li>
          <li><em>Hemorrhagic cyst.</em> T1 bright, stays bright on fat-sat, no enhancing solid. Trap: retracting clot mimics a mural nodule. Subtraction images settle it; clot does not enhance.</li>
          <li><em>Endometrioma.</em> Very bright T1, dark or "shaded" T2, often multiple, often kissing ovaries stuck behind the uterus. The "T2 dark spot" sign (tiny black foci of old clot within the cyst) is very specific for endometrioma over hemorrhagic cyst (Corwin et al., Radiology 2014). Trap 1: in pregnancy, decidualized endometriomas grow T2-bright, vascular mural nodules that enhance; they look like score 4 but the nodules match the endometrium's signal and the patient is pregnant. Trap 2: any <em>true</em> enhancing solid tissue in an endometrioma, especially in a woman over 40, has to be scored honestly; endometriosis-associated clear cell and endometrioid carcinomas arise here.</li>
          <li><em>Mature teratoma (dermoid).</em> Fat that drops out on fat-sat, chemical-shift artifact, hair/sebum levels, a Rokitansky nodule (usually with tooth or fat). Score 2. Trap: fatty lesions with a large amount of enhancing soft tissue are score 4 because of the risk of immature teratoma or other malignancy. Also struma ovarii, a multilocular cyst with very T2-dark, T1-bright, strongly enhancing locules (colloid), is a look you should recognize.</li>
          <li><em>Fibroma / fibrothecoma / cystadenofibroma / Brenner.</em> The T2-dark, DWI-dark solid rule. Fibromas can produce ascites and even pleural effusion (Meigs syndrome); don't let the fluid push you to score 5 unless there are actual peritoneal nodules. Trap: telling a fibroma from a pedunculated subserosal fibroid. Look for the bridging-vessel sign to the uterus (fibroid) versus ovarian tissue draped around the mass (fibroma).</li>
          <li><em>Hydrosalpinx.</em> Tubular, serpentine, "cogwheel" folds on cross-section, separate ovary. Score 2 if simple.</li>
          <li><em>Peritoneal inclusion cyst.</em> Fluid that takes the shape of the pelvis, with a normal ovary sitting inside it like a spider in a web. Almost always a post-surgical or post-inflammatory pelvis. Per rule 5, you can simply name it.</li>
        </ul>

        <h4>Score 3: the "probably fine but someone should look" group</h4>
        <ul className="plain-list">
          <li><em>Serous or mucinous cystadenoma.</em> Unilocular non-simple fluid with a smooth enhancing wall, or multilocular with smooth thin septa. The multilocular "stained glass" mucinous cystadenoma can be enormous.</li>
          <li><em>Cystadenofibroma with a type 1 curve.</em> Sometimes the fibrous tissue isn't dark enough for the score 2 rule; a slow curve puts it at 3.</li>
          <li><em>Hydrosalpinx with proteinaceous fluid or thick wall.</em> Often old PID.</li>
        </ul>

        <h4>Score 4: the coin-flip group (~50%)</h4>
        <p>This is mostly <em>borderline tumors</em> and their benign look-alikes. Papillary projections with a type 2 curve are the classic borderline picture; serous borderline tumors are the commonest cause of a score 4 lesion. The benign look-alikes are cystadenofibromas and serous cystadenomas whose solid tissue happens to enhance at an intermediate rate. Score 4 means "I can't tell you, a gynecologic oncologist needs to decide." That's an honest and useful answer.</p>

        <h4>Score 5: high-grade cancers and metastases</h4>
        <ul className="plain-list">
          <li><em>High-grade serous carcinoma.</em> Bilateral, solid-cystic, irregular, type 3 curve, peritoneal disease, ascites. Often the ovaries themselves are small and the omental cake is the biggest finding.</li>
          <li><em>Krukenberg / metastases.</em> Bilateral solid ovarian masses; look for the primary (stomach, colon, breast, appendix). Solid tissue that is T2-dark from mucin-producing signet-ring stroma can trick you toward the score 2 rule, but it is heterogeneous, not homogeneously dark, and DWI is bright.</li>
          <li><em>Granulosa cell tumor.</em> "Sponge-like" multicystic solid mass, often with hemorrhage, in a perimenopausal woman, sometimes with a thickened endometrium from estrogen. Name it (rule 5).</li>
          <li><em>Dysgerminoma.</em> Young patient, lobulated solid mass with T2-dark fibrovascular septa that enhance. Name it.</li>
        </ul>

        <h4>Where the score gets it wrong: cases from the literature</h4>
        <p>The most useful paper is the EURAD group's analysis of its own misses: Thomassin-Naggara I, Belghitti M, Milon A, et al. O-RADS MRI score: analysis of misclassified cases in a prospective multicentric European cohort. Eur Radiol 2021;31(12):9588–9599. They went back through every lesion the score got wrong. The recurring themes: (1) missed or misjudged solid tissue (calling clot solid, or missing a small papillary projection); (2) curves drawn on the wrong tissue; (3) mucinous lesions with heterogeneous locules being under- or over-called; and (4) lesions of non-ovarian origin. Reading the illustrated cases in that paper does more for your eye than any table.</p>
        <p>The Barcelona group's practical review (Sebastià C, Cabedo L, Fusté P, Muntmany M, Nicolau C. The O-RADS MRI score for the characterization of indeterminate ovarian masses: from theory to practice. Radiología 2022;64:542–551) is a good second case-based read, and the Canadian Association of Radiologists hosts an English PDF of it.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>6. What the report should include</h3>
        <CopyBlock label="Report template" text={reportTemplate} />
        <div className="lesson-key">
          <p>If you can name the lesion (fibroma, dermoid, peritoneal inclusion cyst, dysgerminoma), say so. That's often more useful to the clinician than the number.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>A case to try</h3>
        <p>A 34-year-old premenopausal woman. A 6 cm left ovarian unilocular cyst. It is bright on T1 and stays bright on T1 fat-sat; on T2 it is intermediate with a few tiny very dark dots. The wall is smooth and enhances thinly. There is a 1 cm crescent-shaped structure along one wall that is bright on T1, dark on T2, and shows no signal change on the subtraction images. No free fluid, normal right ovary.</p>
        <p>What's your score, and which single finding decided it?</p>
      </section>
    </LessonPage>
  )
}
