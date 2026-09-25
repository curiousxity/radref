import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Megibow AJ et al. Management of incidental pancreatic cysts: a white paper of the ACR Incidental Findings Committee. J Am Coll Radiol 2017;14:911–923.', doi: '10.1016/j.jacr.2017.03.010' },
  { citation: 'Ohtsuka T, Fernandez-del Castillo C, et al. International evidence-based Kyoto guidelines for the management of IPMN of the pancreas. Pancreatology 2024;24:255–270. (open access)', doi: '10.1016/j.pan.2023.12.009' },
  { citation: 'Tanaka M et al. Revisions of international consensus Fukuoka guidelines for the management of IPMN of the pancreas. Pancreatology 2017;17:738–753.', doi: '10.1016/j.pan.2017.07.007' },
  { citation: 'European Study Group on Cystic Tumours of the Pancreas. European evidence-based guidelines on pancreatic cystic neoplasms. Gut 2018;67:789–804. (The third major guideline; uses ≥40 mm and MPD 5–9.9 mm as relative indications.)', doi: '10.1136/gutjnl-2018-316027' },
  { citation: 'Vege SS et al. AGA guideline on asymptomatic neoplastic pancreatic cysts. Gastroenterology 2015;148:819–822.', doi: '10.1053/j.gastro.2015.01.015' },
  { citation: 'Sahani DV et al. Cystic pancreatic lesions: a simple imaging-based classification. RadioGraphics 2005;25:1471–1484.', doi: '10.1148/rg.256045161' },
  { citation: 'Freeny PC, Saunders MD. Moving beyond morphology: characterization and management of cystic pancreatic lesions. Radiology 2014;272:345–363.', doi: '10.1148/radiol.14131126' },
  { citation: 'Kang MJ et al. Size of main-duct dilatation in IPMN. World J Surg 2015;39:2006–2013. (Source of the ACR 7 mm threshold.)', doi: '10.1007/s00268-015-3062-0' },
  { citation: 'Zelga P et al. Number of worrisome features and risk of malignancy in IPMN. J Am Coll Surg 2022;234:1021–1030.', doi: '10.1097/XCS.0000000000000176' },
  { citation: 'Brook OR et al. Delayed growth in incidental pancreatic cysts. Radiology 2016;278:752–761.', doi: '10.1148/radiol.2015140972' },
  { citation: 'Pandey P et al. Follow-up of incidentally detected pancreatic cystic neoplasms: do baseline MRI and CT features predict growth? Radiology 2019;292:647–654.', doi: '10.1148/radiol.2019181686' },
  { citation: 'Han Y et al. Progression of BD-IPMN associates with cyst size. Gastroenterology 2018;154:576–584.', doi: '10.1053/j.gastro.2017.10.013' },
  { citation: 'Oyama H et al. Long-term risk of malignancy in BD-IPMN. Gastroenterology 2020;158:226–237.', doi: '10.1053/j.gastro.2019.08.032' },
  { citation: 'Marchegiani G et al. Surveillance for presumed BD-IPMN: stability, size, and age identify targets for discontinuation. Gastroenterology 2023;165:1016–1024.', doi: '10.1053/j.gastro.2023.06.022' },
  { citation: 'Chernyak V et al. Incidental pancreatic cystic lesions: relationship with PDAC and all-cause mortality. Radiology 2015;274:161–169.', doi: '10.1148/radiol.14140796' },
  { citation: 'Jais B et al. Serous cystic neoplasm of the pancreas: multinational study of 2622 patients. Gut 2016;65:305–312.', doi: '10.1136/gutjnl-2015-309638' },
  { citation: 'Pozzi-Mucelli RM et al. Pancreatic MRI for surveillance of cystic neoplasms: short versus comprehensive protocol. Eur Radiol 2017;27:41–50.', doi: '10.1007/s00330-016-4377-4' },
]

const reportTemplate = `Pancreas:
Cyst location: __ (uncinate / head / neck / body / tail).
Size: __ mm long axis (series __, image __). Prior: __ mm on [date].
Growth: none / __% (meets / does not meet ACR growth definition); rate ~__ mm/yr.
Morphology: unilocular / multilocular / microcystic / cyst-by-cyst; wall thin / thickened;
  septations; calcification (central / peripheral / none).
Communication with MPD: present / absent / indeterminate.
MPD maximum caliber: __ mm at __; abrupt caliber change with upstream atrophy: yes / no.
Mural nodule or solid component: none / __ mm, enhancing / non-enhancing.
Other cysts: number, largest __ mm at __; each without worrisome features.
Remainder of gland: no focal hypoenhancing mass; no duct stricture; biliary tree normal.
Nodes: none enlarged.

Impression:
__ mm [presumed branch-duct IPMN / indeterminate cyst, presumed mucinous /
  serous cystadenoma] in the pancreatic __.
Worrisome features: none / [list, count]. High-risk stigmata: none / [list].
Stable since [date] / new / enlarged.
Recommendation: [interval and modality] per ACR 2017 incidental pancreatic cyst
  recommendations — or — EUS/FNA and surgical consultation advised because of [feature].`

export function PancreaticCystsLessonPage() {
  return (
    <LessonPage
      name="Pancreatic cyst reporting"
      lede="ACR 2017 white paper plus Fukuoka 2017 / Kyoto 2024: which document does what, how to read the study, the feature lists, growth, follow-up schedules, and the report."
      sourceNote="Numbers below were checked against the full text of the ACR 2017 white paper and the 2024 Kyoto guideline."
      references={references}
      referencesNote="The two confusing bits of this topic: the ACR and Kyoto intervals don't match, and the ACR's 7 mm duct number sits between Kyoto's 5 and 10. Reporting raw measurements plus the named source is the way around both."
    >
      <section className="info-card lesson-body">
        <h3>Part 1. The big picture: which document does what</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead><tr><th>Document</th><th>Who wrote it</th><th>What it's for</th><th>When you use it</th></tr></thead>
            <tbody>
              <tr><td><strong>ACR white paper</strong> (Megibow, JACR 2017)</td><td>ACR Incidental Findings Committee (radiologists + a GI + a surgeon)</td><td>How to <em>follow</em> a cyst found by accident that can't be named</td><td>Asymptomatic adult, cyst found on a scan done for something else</td></tr>
              <tr><td><strong>Fukuoka 2017</strong> (Tanaka, Pancreatology 2017)</td><td>International Association of Pancreatology (IAP)</td><td>How to manage a known or presumed <strong>IPMN</strong></td><td>Surgeons and GI doctors use this; you borrow its vocabulary</td></tr>
              <tr><td><strong>Kyoto 2024</strong> (Ohtsuka, Pancreatology 2024)</td><td>IAP revision of Fukuoka</td><td>Same, updated with evidence reviews and a simpler follow-up schedule</td><td>Current version; replaces Fukuoka</td></tr>
            </tbody>
          </table>
        </div>
        <div className="lesson-key">
          <p>The one idea that unifies all three: every incidental cyst is presumed to be mucinous (usually a small IPMN) unless it has definitive features of something else, such as a serous cystadenoma, or aspiration proves otherwise. That's why almost all of these get followed.</p>
          <p>Malignancy occurs virtually only in mucinous cysts (IPMN and MCN). Serous cystadenomas and pseudocysts essentially never turn into cancer. So the whole reading job boils down to: <em>Is it mucinous? If so, does it show signs of high-grade dysplasia or cancer?</em></p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 2. How to read the study, step by step</h3>

        <div className="lesson-step">
          <h4>Step 1. Check the protocol and gather all old scans</h4>
          <p>The ACR paper accepts either contrast-enhanced MRI or pancreas-protocol CT for follow-up; MRI avoids cumulative radiation but has not been shown to be better than pancreas-protocol CT for finding worrisome features or cancer. On MRI you want fat-suppressed T2, thin-slice 3D MRCP, and contrast-enhanced T1 in arterial, early portal, and late portal phases. The 3D MRCP source images are what let you see duct communication.</p>
          <p>Then look at <em>everything</em> old. The ACR paper stresses comparing with prior studies where the pancreas is often visible (chest CT, spine CT or MRI, PET/CT, abdominal ultrasound) and using the date of the earliest prior as the baseline for the follow-up clock. A cyst that's been stable on a 6-year-old chest CT has already served most of its surveillance sentence.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Try to give the cyst a name</h4>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Cyst type</th><th>Who gets it</th><th>Where</th><th>Look</th><th>Talks to the main duct?</th><th>Calcification</th></tr></thead>
              <tbody>
                <tr><td><strong>Branch-duct IPMN</strong></td><td>~55% female, 60s–70s</td><td>30% body/tail (so mostly head/uncinate)</td><td>Grape-like cluster, "cyst by cyst"</td><td><strong>Yes</strong> (the defining feature)</td><td>No</td></tr>
                <tr><td><strong>Mucinous cystic neoplasm (MCN)</strong></td><td>&gt;95% female, 40s–50s</td><td>95% body/tail</td><td>"Cyst in cyst," thick capsule, orange-like</td><td>Rarely (~20%)</td><td>Rare, curvilinear in wall</td></tr>
                <tr><td><strong>Serous cystadenoma (SCA)</strong></td><td>~70% female, 60s–70s</td><td>Half body/tail</td><td>Honeycomb / sponge of tiny cysts, central scar</td><td>No</td><td>30–40%, central</td></tr>
                <tr><td><strong>Pseudocyst</strong></td><td>&lt;25% female, 40s–50s</td><td>65% body/tail</td><td>Unilocular, thick wall, debris</td><td>Common</td><td>No</td></tr>
              </tbody>
            </table>
          </div>
          <p>Two memory hooks: central calcification points to SCA; peripheral calcification points to MCN, and peripheral calcification in an MCN is more strongly linked with frank malignancy. Also: MCNs live in the tail; branch-duct IPMNs are most often in the head and uncinate.</p>
          <p>Rarer ones worth knowing: solid pseudopapillary neoplasm (young women, mixed solid-cystic with blood products), cystic neuroendocrine tumor (thick enhancing rim, often hypervascular), lymphoepithelial cyst, simple epithelial cyst. Solid pseudopapillary neoplasm and cystic NET usually have features that suggest the specific diagnosis and generally go to surgery.</p>
          <p>Be realistic about your limits: cysts under 10 mm are difficult or impossible to characterize, and 1–3 cm cysts are often indeterminate unless you can prove duct communication. "Indeterminate, presumed mucinous" is an acceptable answer.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Does it communicate with the main pancreatic duct?</h4>
          <p>This is the single most useful thing you can establish, because it converts "indeterminate cyst" into "branch-duct IPMN." CT with 3D reformats and MRI/MRCP are excellent for this and equivalent to EUS. Scroll the thin MRCP source images, not just the MIP. Look for a thin neck connecting the cyst to the duct.</p>
          <p>Definitions to use in your report, from Kyoto: a cyst larger than 5 mm that communicates with the main duct is a BD-IPMN (rule out pseudocyst if there is a pancreatitis or trauma history); main-duct IPMN is segmental or diffuse dilation of the main duct over 5 mm without another cause; mixed type meets both criteria.</p>
          <p>Then measure the main duct. For any BD-IPMN, record the widest main duct diameter even if it's away from the cyst, because a dilated main duct is a suspicious feature that should be investigated promptly. One trap: the duct can show a small fusiform bulge right where the cyst neck inserts in a pure branch-duct IPMN; that local bump is not main-duct involvement.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Measure the cyst the standard way</h4>
          <p>Record one measurement: the greatest length of the cyst in its long axis on either the axial or coronal image, and state the series and image numbers. Save the measurement image to PACS. The ACR chose this simple single-axis method over 3D volumes because it's more reproducible from reader to reader. Consistency matters more than precision here; you'll be comparing your number against someone else's number two years from now.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Hunt for worrisome features and high-risk stigmata</h4>
          <p>These are the shared vocabulary. Use the exact phrases in your report; the ACR explicitly encourages the terms "worrisome features" and "high-risk stigmata" because clinicians who treat pancreatic disease universally understand them.</p>
          <p>Plain-language definitions first:</p>
          <ul className="plain-list">
            <li><strong>Mural nodule</strong> = a bump growing from the inside of the cyst wall into the cyst. It matters most if it <strong>enhances</strong>, because that means it's tissue, not mucin or debris.</li>
            <li><strong>Solid component</strong> = a solid mass in the pancreas tissue next to the cyst. A mural nodule usually means a non-invasive lesion, while a solid component in the parenchyma suggests invasive cancer or a separate adenocarcinoma; in practice the two are hard to tell apart and both count as high-risk.</li>
            <li><strong>Thickened/enhancing wall</strong> = wall that's visibly thick or lights up with contrast.</li>
            <li><strong>Abrupt caliber change</strong> = the duct suddenly narrows at one spot with the gland beyond it shrunken (atrophic). A sign of a possible hidden tumor at the narrowing.</li>
          </ul>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th></th><th>ACR 2017</th><th>Fukuoka 2017</th><th>Kyoto 2024</th></tr></thead>
              <tbody>
                <tr><td><strong>High-risk stigmata</strong> (→ surgical evaluation)</td><td>Obstructive jaundice with head cyst; enhancing solid component; MPD ≥10 mm</td><td>Obstructive jaundice with head cyst; enhancing mural nodule ≥5 mm; MPD ≥10 mm</td><td>Same three <strong>plus</strong> suspicious or positive cytology (if EUS-FNA was done)</td></tr>
                <tr><td><strong>Worrisome features</strong> (→ EUS/FNA, closer look)</td><td>Cyst ≥3 cm; thickened/enhancing wall; non-enhancing mural nodule; <strong>MPD ≥7 mm</strong></td><td>Cyst ≥3 cm; enhancing nodule &lt;5 mm; thickened/enhancing wall; MPD 5–9 mm; abrupt caliber change with atrophy; lymphadenopathy; elevated CA19-9; growth ≥5 mm in 2 years; pancreatitis</td><td>Same as Fukuoka but growth becomes <strong>≥2.5 mm/year</strong>, and <strong>new-onset or worsening diabetes within the past year</strong> is added</td></tr>
              </tbody>
            </table>
          </div>
          <p>Two differences to notice:</p>
          <ol className="plain-list">
            <li><strong>The duct threshold.</strong> Fukuoka/Kyoto use 5–9 mm as worrisome; the ACR recommends a simpler 7 mm cutoff, based on Kang et al. (World J Surg 2015). If you report the actual millimeter number, the clinician can apply whichever they prefer. A 6 mm duct is "worrisome" by Kyoto and "normal-ish" by ACR: say the number.</li>
            <li><strong>Nodule enhancement.</strong> Kyoto puts enhancing nodules ≥5 mm in high-risk; ACR's 2017 table only listed "enhancing solid component." Describe what you see: size of the nodule, whether it enhances.</li>
          </ol>
          <p>Why 5 mm and 10 mm? Kyoto admits these are imperfect: an enhancing nodule ≥5 mm has sensitivity 73–100% and specificity 73–85% for high-grade dysplasia or cancer, but a nodule alone has only an odds ratio of about 1.2–3.2 in recent nomogram studies; the committee discussed raising the nodule cutoff to 10 mm and lowering the worrisome duct threshold but kept the old numbers for lack of strong evidence.</p>
          <div className="lesson-key">
            <p><strong>The features add up.</strong> This is the most important new emphasis in Kyoto. Zelga et al. found the risk of high-grade dysplasia or cancer rises stepwise with the number of worrisome features: 22% with one, 34% with two, 59% with three, and 100% with four or more. So count them and put the count in your impression.</p>
          </div>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Decide whether it has grown (and how fast)</h4>
          <p>Growth is the main thing surveillance watches for, so the definition matters. The ACR uses percentages that scale with size, because a 2 mm change on a 4 mm cyst is huge and on a 30 mm cyst is noise: cysts under 0.5 cm, growth = 100% increase in long axis; 0.5 to under 1.5 cm, 50% increase; 1.5 cm and larger, 20% increase. Report the growth rate when you can, since a rate above 2 mm/year helps separate aggressive from indolent cysts.</p>
          <p>Kyoto uses a single rate: ≥2.5 mm/year is worrisome. Reported thresholds in the literature range from about 1 to 3.5 mm/year, and 2.5 mm/year was the most frequently reported, so it replaced the old 5 mm per 2 years.</p>
          <p>A literature case that shows the reverse: in Pandey et al. (Radiology 2019), a 53-year-old man's two head and body cysts measured 4.9 and 4.6 mm in January 2013; MRI 55 months later showed 5.7 and 5.9 mm, no growth by ACR criteria. A 1 mm change over four and a half years is measurement noise. Don't call that growth.</p>
          <p>Beware delayed growth, though. Brook et al. (Radiology 2016) documented cysts that sat still for years and then grew, which is the reason the ACR moved from its old 2-year "stable = done" rule to the 9–10-year schedule.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 7. Look at the rest of the gland</h4>
          <p>This is the step most people skip. A cyst raises the cancer risk of the <em>whole pancreas</em>, not just the cyst. Kyoto calls it dual carcinogenesis: the cyst itself can progress, and separately a ductal adenocarcinoma can arise elsewhere in the same gland, with a yearly incidence of about 0.4–1.0% and a risk roughly 3–5 times the age-matched population.</p>
          <p>Kyoto's own illustrative case (their Figure 6): MRCP showed a 10 mm BD-IPMN in the body; 14 months later the cyst was unchanged but a new main-duct stricture with upstream dilation appeared; CT then showed an 18 mm hypodense solid lesion in the tail, which proved to be a tubular adenocarcinoma with no connection to the cyst. The cyst was a red herring. The duct stricture was the finding.</p>
          <p>So on every follow-up: trace the main duct from tail to ampulla for any new narrowing, look for upstream dilation and atrophy, and look for any new hypoenhancing area in the pancreatic phase. The ACR notes that the pancreatic-phase contrast sequence improves detection of a second cancer elsewhere in the gland, one argument for keeping contrast in the follow-up protocol.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 8. If there are several cysts</h4>
          <p>Report multiplicity; use the cyst with the longest dimension as the index lesion, but check every cyst for growth and worrisome features on each exam, since these can appear in any of them. Multifocal BD-IPMN is common (around 20–40%) and multifocality itself does not raise the risk; management follows whichever lesion is highest-risk.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 3. What happens next: the follow-up schedules</h3>
        <h4>ACR 2017: sorted by size and age</h4>
        <p>The ACR flowcharts apply only to asymptomatic adults with an incidentally found cyst; if the patient has jaundice, weight loss, a palpable mass, steatorrhea, or an elevated amylase, the algorithm does not apply and the patient should be referred.</p>
        <p><strong>Cysts under 1.5 cm (Chart 1)</strong></p>
        <ul className="plain-list">
          <li>Under 65 at presentation: image yearly for 5 years, then every 2 years for 2 more; stop if stable over a minimum of 9 years.</li>
          <li>Age 65–79: image every 2 years for 5 rounds; stop if still under 1.5 cm over 10 years.</li>
          <li>"White dot" cysts (&lt;5 mm on T2): a single follow-up at 2 years showing stability is enough to stop; some radiologists don't report these at all in patients over 75–80.</li>
          <li>If it grows: move up in frequency (yearly) or go to EUS/FNA. If it reaches 1.5 cm, switch to Chart 2.</li>
        </ul>
        <p><strong>Cysts 1.5–2.5 cm (Chart 2)</strong></p>
        <ul className="plain-list">
          <li>2A, duct communication proven (BD-IPMN): 1.5–1.9 cm → yearly for 5 years then every 2 years for 4 years; 2.0–2.5 cm → every 6 months for 2 years, yearly for 2, then every 2 years for 6. EUS/FNA at detection is an acceptable alternative.</li>
          <li>2B, communication absent or unknown: either image every 6 months for 2 years, then yearly for 2, then every 2 years for 3 rounds, or go straight to EUS/FNA to find out whether it's mucinous.</li>
          <li>Growth here is 20%. Any cyst ≥2 cm that shows definable growth will be at least 2.4 cm, and for those EUS/FNA is advised.</li>
        </ul>
        <p><strong>Cysts over 2.5 cm (Chart 3)</strong></p>
        <ul className="plain-list">
          <li>Many centers do EUS/FNA on every cyst this size at detection.</li>
          <li>Sort by imaging risk. Low-risk = no mural nodule, no wall thickening, normal-caliber duct, no peripheral calcification; high-risk = any of mural nodule, wall thickening, MPD ≥7 mm, or peripheral calcification.</li>
          <li>Low-risk cysts can be carefully followed, even if 3 cm or more; high-risk cysts go immediately to EUS/FNA and surgical evaluation.</li>
          <li>Confident SCA: follow-up depends on symptoms; an SCA over 4 cm or symptomatic may need resection because of expected growth.</li>
        </ul>
        <p><strong>Patients 80 or older at presentation (Chart 4)</strong></p>
        <ul className="plain-list">
          <li>Follow-up or EUS/FNA is advised only if the patient is a surgical candidate; ≤2.5 cm → image every 2 years twice and stop if stable.</li>
          <li>Follow-up generally stops once a patient reaches 80, and for most patients the ACR advocates a 9–10-year follow-up window.</li>
        </ul>
        <div className="lesson-key">
          <p><strong>The universal override</strong> (printed on every chart): appearance of any mural nodule, wall thickening, MPD dilation ≥7 mm, or biliary obstruction/jaundice should prompt immediate EUS/FNA and surgical evaluation regardless of cyst size or growth.</p>
        </div>

        <h4>Kyoto 2024: sorted by risk, then size</h4>
        <ol className="plain-list">
          <li><strong>Any high-risk stigma</strong> → surgery in a fit patient. EUS-FNA should not be done when HRS are obvious on CT/MRI, since surgery will happen regardless.</li>
          <li><strong>Worrisome feature(s), no HRS</strong> → EUS (with contrast and/or FNA where available) to look for a nodule or get cytology; multiple WF push toward surgery, and nomograms can help.</li>
          <li><strong>Neither</strong> → surveillance by size:
            <ul className="plain-list">
              <li>Under 20 mm: once at 6 months, then every 18 months if stable. 20 to under 30 mm: 6 months twice, then yearly. 30 mm or more: every 6 months.</li>
              <li>Stopping is allowed for cysts under 20 mm with no morphologic change and no worrisome features after 5 years, taking into account the patient's condition and life expectancy, but this may not apply to younger patients or those with familial or genetic risk. Because a concomitant adenocarcinoma always remains possible, the guideline offers two options after 5 stable years: stop, or continue.</li>
              <li>MRI with physical exam, tumor markers, and diabetes screening is the preferred surveillance; CT and EUS are added when MRI shows a change.</li>
            </ul>
          </li>
        </ol>
        <p>Why the size tiers? Progression to a worrisome feature is about 4.8% for cysts under 10 mm (median 54 months), 10% for 10–20 mm, and 48.8% for 20–30 mm at a median of only 23 months. Bigger cysts move faster.</p>

        <h4>Which one do you cite?</h4>
        <p>For an incidental cyst in a US practice, most radiologists write the recommendation from the ACR white paper and describe features in Fukuoka/Kyoto language, because the GI doctor or surgeon who takes over will manage it by Kyoto. The intervals conflict a little; the honest approach is to name the source you're following ("per ACR 2017 recommendations") so the clinician knows where the number came from. Check whether your groups have adopted a house standard; many have templated one of the two.</p>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 4. What the report must contain</h3>
        <p>The ACR lists six mandatory elements: cyst morphology and location; size; possible communication with the main duct; presence of worrisome features and/or high-risk stigmata; growth on follow-up; and multiplicity. A template that covers all six plus the Kyoto extras:</p>
        <CopyBlock label="Report template" text={reportTemplate} />
        <p>Three writing habits that help:</p>
        <ul className="plain-list">
          <li><strong>State the actual millimeter numbers</strong> for duct and nodule rather than only the label, so a reader on either guideline can apply their threshold.</li>
          <li><strong>Say "none" explicitly</strong> for nodule and duct dilation. Silence reads as "not looked for."</li>
          <li><strong>Name the baseline date</strong> you used for the surveillance clock, especially if it came from an old chest CT.</li>
        </ul>
      </section>

      <section className="info-card lesson-body">
        <h3>Part 5. Practice cases</h3>
        <ol className="plain-list">
          <li><strong>58-year-old, 9 mm cyst in the pancreatic head on a CT for kidney stones. No priors. MRCP: thin neck to the main duct, MPD 2 mm.</strong> Branch-duct IPMN, no WF, no HRS. Under 1.5 cm, under 65 → ACR: yearly MRI ×5, then every 2 years ×2, stop if stable after ≥9 years. Kyoto: 6 months, then every 18 months, consider stopping after 5 stable years.</li>
          <li><strong>71-year-old, 22 mm unilocular cyst in the tail, thin wall, no septa, no communication seen. Duct 3 mm.</strong> Indeterminate, presumed mucinous; in a woman in the tail, MCN is the front-runner, but you can't prove it. ACR Chart 2B: every 6 months ×4, yearly ×2, every 2 years ×3, or EUS/FNA now. No WF (22 mm is under 30, nothing else). Kyoto: 6 months twice then yearly.</li>
          <li><strong>64-year-old, 3.4 cm multicystic lesion in the head with a 7 mm enhancing nodule, MPD 6 mm.</strong> Enhancing nodule ≥5 mm = <strong>high-risk stigma</strong> (Kyoto), plus cyst ≥3 cm and MPD 5–9 mm = two worrisome features. ACR: high-risk by imaging → EUS/FNA and surgical consultation now. The nodule alone decides it; don't bury it under the size discussion.</li>
          <li><strong>Follow-up: cyst was 12 mm two years ago, now 15 mm.</strong> For a cyst that was 0.5 to &lt;1.5 cm, growth = 50%. 12 → 15 is 25%: does <em>not</em> meet the ACR growth definition. But it has crossed 1.5 cm, so it moves to Chart 2. Rate 1.5 mm/year, below both the ACR ~2 mm/yr and Kyoto 2.5 mm/yr flags. Report: "increased from 12 to 15 mm over 24 months, below ACR growth threshold; now ≥1.5 cm."</li>
          <li><strong>Follow-up: 11 mm cyst stable for 3 years, but the MPD in the body now measures 4 mm with a short stricture and mild atrophy of the tail. Portal-phase CT only.</strong> The cyst is boring. The duct is not. This is the Kyoto Figure 6 pattern: abrupt caliber change with distal atrophy is a worrisome feature and a warning of a possible concomitant adenocarcinoma at the stricture. Recommend pancreas-protocol CT or MRI with pancreatic phase, and EUS. Note the exam was single-phase and not optimized.</li>
          <li><strong>82-year-old, 4 mm T2-bright dot in the body, no priors.</strong> ACR: white-dot cyst in a patient over 80. One follow-up at 2 years is the maximum you'd suggest; many radiologists would mention it without recommending follow-up given age. Follow-up only if the patient would be a surgical candidate.</li>
          <li><strong>45-year-old, 2.8 cm lobulated microcystic lesion in the body with a central scar and central calcification, no communication, duct normal.</strong> A serous cystadenoma with classic features, one of the few you can name confidently. No surveillance for malignancy needed. Below 4 cm and asymptomatic → no surgical referral. Say so plainly; this patient should not be put on a 10-year schedule.</li>
        </ol>
      </section>
    </LessonPage>
  )
}
