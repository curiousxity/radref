import { Link } from 'react-router-dom'
import { CopyBlock } from '../components/CopyBlock'
import { LessonPage } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'

const references: LessonReference[] = [
  { citation: 'Al-Hawary MM et al. Pancreatic ductal adenocarcinoma radiology reporting template: consensus statement of the Society of Abdominal Radiology and the American Pancreatic Association. Radiology 2014;270:248–260. PMID 24354378.' },
  { citation: 'Lu DS et al. Two-phase helical CT for pancreatic tumors. Radiology 1996.' },
  { citation: 'Fletcher JG et al. Pancreatic malignancy: value of arterial, pancreatic, and hepatic phase imaging with multi-detector row CT. Radiology 2003.' },
  { citation: 'Kim JH et al. Visually isoattenuating pancreatic adenocarcinoma at dynamic-enhanced CT. Radiology 2010.' },
  { citation: 'Yoon SH et al. Small (≤20 mm) pancreatic adenocarcinomas: analysis of enhancement patterns and secondary signs. Radiology 2011.' },
  { citation: 'Prokesch RW et al. Isoattenuating pancreatic adenocarcinoma at multi-detector row CT: secondary signs. Radiology 2002.' },
  { citation: 'Gangi S et al. Time interval between abnormalities seen on CT and the clinical diagnosis of pancreatic cancer. AJR 2004.' },
  { citation: 'Lewis RB et al. Pancreatic endocrine tumors: radiologic-clinicopathologic correlation. RadioGraphics 2010.' },
  { citation: 'Sahani DV et al. Autoimmune pancreatitis: imaging features. Radiology 2004.' },
  { citation: 'Klein KA et al. CT characteristics of metastatic disease of the pancreas. RadioGraphics 1998.' },
  { citation: 'Merkle EM et al. Imaging findings in pancreatic lymphoma. AJR 2000.' },
  { citation: 'Lu DS et al. Local staging of pancreatic cancer: criteria for unresectability of major vessels as revealed by pancreatic-phase, thin-section helical CT. AJR 1997.' },
  { citation: 'Zins M et al. Pancreatic adenocarcinoma staging in the era of preoperative chemotherapy and radiation therapy. Radiology 2018.' },
  { citation: 'Katz MH et al. Response of borderline resectable pancreatic cancer to neoadjuvant therapy is not reflected by radiographic indicators. Cancer 2012.' },
  { citation: 'Ferrone CR et al. Radiological and surgical implications of neoadjuvant treatment with FOLFIRINOX. Ann Surg 2015.' },
  { citation: 'Ohtsuka T et al. Kyoto guidelines for IPMN. Pancreatology 2024. Megibow AJ et al. ACR white paper on incidental pancreatic cysts. JACR 2017.' },
]

const reportTemplate = `1. Tumor: location, size, density, duct status, presence of a biliary stent.
2. Arteries: celiac, SMA, and CHA, each with contact (yes/no), degrees, and
   narrowing. Also variants.
3. Veins: portal vein and SMV, each with contact, degrees, narrowing, and thrombus.
   Also collaterals.
4. Outside the pancreas: liver, peritoneum, nodes, invasion of other organs.

Impression: describe the anatomy, e.g. "tumor contacts SMA ≤180°".`

export function PancreaticMassCtLessonPage() {
  return (
    <LessonPage
      name="Pancreatic mass protocol CT"
      lede="A working method for staging pancreatic ductal adenocarcinoma: finding the mass, naming it, staging the five vessels, and writing the SAR/APA report."
      sourceNote="The reporting-template paper (Al-Hawary, Radiology 2014) was verified in PubMed. The other citations were from memory at the time of writing; confirm details before quoting them formally."
      references={references}
    >
      <section className="info-card lesson-body">
        <p>This lesson is mostly about pancreatic ductal adenocarcinoma (PDAC), because staging that tumor is what the protocol was built for.</p>

        <div className="lesson-step">
          <h4>Step 1. Check the scan is good enough</h4>
          <p>The protocol has two phases, and each one has a job.</p>
          <ul className="plain-list">
            <li><strong>Pancreatic (late arterial) phase, about 40 to 50 seconds.</strong> The normal pancreas is at its brightest, so a dark tumor stands out. It is also the best phase for the arteries. (Lu, Radiology 1996; Fletcher, Radiology 2003)</li>
            <li><strong>Portal venous phase, about 65 to 70 seconds.</strong> Best for the veins (SMV, portal vein), the liver, and the peritoneum.</li>
          </ul>
          <p>You also need thin slices (1 mm or less) with coronal and sagittal reformats, and water as oral contrast rather than positive contrast. If the scan is a routine single-phase study, say in the report that it limits staging.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 2. Find the mass, even when you can't see it</h4>
          <p>Classic PDAC is a dark, poorly defined mass on the pancreatic phase. However, about 5 to 10% of tumors are the same density as the pancreas, and the figure is closer to a quarter for tumors under 2 cm (Kim JH, Radiology 2010; Yoon SH, Radiology 2011). In those cases you rely on secondary signs (Prokesch, Radiology 2002):</p>
          <ul className="plain-list">
            <li><strong>Duct cutoff.</strong> The pancreatic duct is dilated and then stops abruptly. Treat this as cancer until proven otherwise.</li>
            <li><strong>Double duct sign.</strong> Both the bile duct and the pancreatic duct are dilated.</li>
            <li><strong>Upstream atrophy.</strong> The gland behind the blockage is thin.</li>
            <li><strong>Contour bulge</strong>, or loss of the normal lobulated fat pattern.</li>
          </ul>
          <p>These subtle signs matter in practice. Gangi (AJR 2004) reviewed CTs done before diagnosis and found that tumors were visible, in retrospect, up to 18 months earlier.</p>
        </div>

        <div className="lesson-step">
          <h4>Step 3. Decide what the mass is</h4>
          <div className="table-wrap">
            <table className="ref-table">
              <thead><tr><th>Lesion</th><th>Key clue</th></tr></thead>
              <tbody>
                <tr><td><strong>PDAC</strong></td><td>Dark, ill-defined, blocks ducts, narrows vessels</td></tr>
                <tr><td><strong>Neuroendocrine tumor</strong></td><td>Bright on arterial phase, well-defined, rarely blocks the duct (Lewis, RadioGraphics 2010)</td></tr>
                <tr><td><strong>Autoimmune pancreatitis</strong></td><td>Sausage-shaped gland, dark rim ("halo"), duct passes <em>through</em> the mass without blocking (Sahani, Radiology 2004)</td></tr>
                <tr><td><strong>Groove pancreatitis</strong></td><td>Sheet-like tissue between the duodenum and the head, with cysts in the duodenal wall</td></tr>
                <tr><td><strong>Metastasis</strong></td><td>Renal cell is the classic one: bright like a neuroendocrine tumor, and it can appear years later (Klein, RadioGraphics 1998)</td></tr>
                <tr><td><strong>Lymphoma</strong></td><td>Large mass that wraps around vessels <em>without</em> narrowing them, with no duct dilatation (Merkle, AJR 2000)</td></tr>
                <tr><td><strong>Solid pseudopapillary tumor</strong></td><td>Young woman, large encapsulated mass, internal hemorrhage</td></tr>
                <tr><td><strong>Cystic lesions</strong></td><td>IPMN, mucinous cystic neoplasm, serous cystadenoma. Follow Kyoto 2024 and the ACR white paper; see the <Link to="/lessons/pancreatic-cysts">pancreatic cyst lesson</Link></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="lesson-step">
          <h4>Step 4. Stage the vessels</h4>
          <p>The surgeon mainly wants to know whether they can get the tumor out with clean margins, and the vessels decide that. Check five vessels on every case: <strong>celiac axis, SMA, common hepatic artery, SMV, portal vein.</strong> For each one, answer three questions.</p>
          <ol className="plain-list">
            <li><strong>Does the tumor touch the vessel?</strong> Solid tissue and hazy stranding are different things, so say which one you see.</li>
            <li><strong>How much of the circumference does it touch?</strong> Report 180° or less versus more than 180°. Lu (AJR 1997) showed that contact over 180° strongly predicts unresectability.</li>
            <li><strong>Is the vessel deformed?</strong> Look for narrowing, an irregular contour, a "teardrop" shaped SMV, or thrombus.</li>
          </ol>
          <div className="lesson-key">
            <p><strong>The NCCN categories, simplified:</strong></p>
            <ul className="plain-list">
              <li><strong>Resectable.</strong> No arterial contact. Vein contact of 180° or less with a normal contour.</li>
              <li><strong>Borderline.</strong> SMA or celiac contact of 180° or less. Hepatic artery contact that spares the celiac axis and the bifurcation. Vein contact over 180°, or a deformed vein that can still be reconstructed.</li>
              <li><strong>Locally advanced.</strong> SMA or celiac contact over 180°, or a vein that cannot be reconstructed.</li>
            </ul>
          </div>
          <p>Also report <strong>arterial variants</strong>, especially a replaced right hepatic artery arising from the SMA, because it runs right behind the pancreatic head. Report median arcuate ligament or celiac stenosis as well. (Zins, Radiology 2018 is a good review of all of this.)</p>
        </div>

        <div className="lesson-step">
          <h4>Step 5. Look for disease outside the pancreas</h4>
          <ul className="plain-list">
            <li><strong>Liver.</strong> Small dark lesions. Anything too small to characterize should be called "indeterminate" so it triggers an MRI.</li>
            <li><strong>Peritoneum and omentum.</strong> Nodules and ascites.</li>
            <li><strong>Nodes.</strong> Regional nodes do not change resectability. Distant nodes (para-aortic, for example) do, so say which group you are describing.</li>
            <li><strong>Nearby organs.</strong> Stomach, duodenum, colon, adrenal.</li>
          </ul>
        </div>

        <div className="lesson-step">
          <h4>Step 6. Write the report</h4>
          <p>Use the SAR/APA consensus template (Al-Hawary, Radiology 2014; PMID 24354378). It has four blocks.</p>
          <CopyBlock label="Report template" text={reportTemplate} />
          <p>The authors advise against writing "unresectable", because that decision belongs to the tumor board.</p>
        </div>
      </section>

      <section className="info-card lesson-body">
        <h3>Restaging after chemotherapy</h3>
        <p>CT tends to understage the response to chemotherapy. In Katz (Cancer 2012), fewer than 1% of borderline patients looked downstaged on CT after treatment, yet about two-thirds went on to resection, nearly all with clean margins. Ferrone (Ann Surg 2015) found the same after FOLFIRINOX. So if the soft tissue around a vessel persists but has not grown, call it stable and do not call it unresectable.</p>
      </section>
    </LessonPage>
  )
}
