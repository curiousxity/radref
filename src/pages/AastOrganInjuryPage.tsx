import { useState } from 'react'

type GradeRow = {
  grade: string
  findings: string[]
}

type Organ = {
  key: string
  name: string
  grades: GradeRow[]
}

const organs: Organ[] = [
  {
    key: 'spleen',
    name: 'Spleen',
    grades: [
      {
        grade: 'Grade I',
        findings: [
          'Subcapsular hematoma involving less than 10% of the splenic surface area.',
          'Capsular tear or parenchymal laceration less than 1 cm in depth.',
        ],
      },
      {
        grade: 'Grade II',
        findings: [
          'Subcapsular hematoma involving 10% to 50% of the surface area.',
          'Intraparenchymal hematoma less than 5 cm in diameter.',
          'Parenchymal laceration 1 to 3 cm in depth.',
        ],
      },
      {
        grade: 'Grade III',
        findings: [
          'Subcapsular hematoma involving more than 50% of the surface area or expanding.',
          'Ruptured subcapsular or intraparenchymal hematoma.',
          'Intraparenchymal hematoma 5 cm or greater.',
          'Parenchymal laceration more than 3 cm in depth.',
        ],
      },
      {
        grade: 'Grade IV',
        findings: [
          'Any injury in the presence of splenic vascular injury or active bleeding confined within the splenic capsule.',
          'Parenchymal laceration involving segmental or hilar vessels with more than 25% devascularization of the spleen.',
        ],
      },
      {
        grade: 'Grade V',
        findings: [
          'Shattered spleen.',
          'Splenic vascular injury with active bleeding extending beyond the spleen into the peritoneum.',
        ],
      },
    ],
  },
  {
    key: 'liver',
    name: 'Liver',
    grades: [
      {
        grade: 'Grade I',
        findings: [
          'Subcapsular hematoma involving less than 10% of the surface area.',
          'Capsular tear or laceration less than 1 cm in depth.',
        ],
      },
      {
        grade: 'Grade II',
        findings: [
          'Subcapsular hematoma involving 10% to 50% of the surface area.',
          'Intraparenchymal hematoma less than 10 cm in diameter.',
          'Laceration 1 to 3 cm in depth and less than 10 cm in length.',
        ],
      },
      {
        grade: 'Grade III',
        findings: [
          'Subcapsular hematoma involving more than 50% of the surface area or expanding.',
          'Ruptured subcapsular or intraparenchymal hematoma.',
          'Intraparenchymal hematoma greater than 10 cm.',
          'Laceration greater than 3 cm in depth.',
          'Vascular injury with bleeding contained within the liver parenchyma.',
        ],
      },
      {
        grade: 'Grade IV',
        findings: [
          'Parenchymal disruption involving 25% to 75% of a hepatic lobe.',
          'Active bleeding extending beyond the liver into the peritoneum.',
        ],
      },
      {
        grade: 'Grade V',
        findings: ['Parenchymal disruption involving more than 75% of a hepatic lobe.'],
      },
    ],
  },
  {
    key: 'kidney',
    name: 'Kidney',
    grades: [
      {
        grade: 'Grade I',
        findings: ['Subcapsular hematoma.', 'Renal contusion without laceration.'],
      },
      {
        grade: 'Grade II',
        findings: [
          'Perirenal hematoma confined within the perirenal fascia.',
          'Superficial cortical laceration 1 cm or less in depth without collecting system injury.',
        ],
      },
      {
        grade: 'Grade III',
        findings: [
          'Laceration greater than 1 cm in depth without collecting system injury.',
          'Renal vascular injury or active bleeding confined within the perirenal fascia.',
        ],
      },
      {
        grade: 'Grade IV',
        findings: [
          'Laceration involving the collecting system with urinary extravasation.',
          'Renal pelvis laceration or complete ureteropelvic junction disruption.',
          'Segmental renal vein or artery injury.',
          'Segmental infarction without active bleeding.',
          'Active renal bleeding extending beyond the perirenal fascia.',
        ],
      },
      {
        grade: 'Grade V',
        findings: [
          'Shattered kidney.',
          'Avulsion of the renal hilum.',
          'Main renal artery or vein laceration with devascularization of the kidney.',
          'Devascularized kidney with active bleeding.',
        ],
      },
    ],
  },
]

const references: { label: string; href?: string }[] = [
  {
    label: 'Kozar RA, Crandall M, Shackford S, et al. Organ injury scaling 2018 update: Spleen, liver, and kidney. J Trauma Acute Care Surg. 2018;85(6):1119-1122.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/30462622/',
  },
  {
    label: 'AAST Spleen Injury Scale, 2018 revision, UW Emergency Radiology',
    href: 'https://sites.uw.edu/eradsite/trauma-radiology-reference-resource/6-abdomen/aast-spleen-injury-scale/',
  },
  {
    label: 'Naeem M, et al. Grading Abdominal Trauma: Changes in and Implications of the Revised 2018 AAST-OIS for the Spleen, Liver, and Kidney. RadioGraphics 2023.',
    href: 'https://pubs.rsna.org/doi/full/10.1148/rg.230040',
  },
  {
    label: 'The AAST Organ Injury Scale 2018 update for CT-based grading of renal trauma: a primer for the emergency radiologist. Emerg Radiol 2019.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/31489487/',
  },
  {
    label: 'AAST Kidney Injury Scale, UW Emergency Radiology',
    href: 'https://faculty.washington.edu/jeff8rob/trauma-radiology-reference-resource/6-abdomen/aast-kidney-injury-scale/',
  },
]

export function AastOrganInjuryPage() {
  const [activeOrgan, setActiveOrgan] = useState(organs[0].key)
  const organ = organs.find((o) => o.key === activeOrgan) ?? organs[0]

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Quick reference</p>
          <h2>AAST organ injury grades</h2>
          <p>Organ-specific AAST Organ Injury Scale (2018 update) grading criteria for blunt and penetrating solid organ trauma on CT.</p>
          <p className="source-note">Intended as a radiology quick-reference guide, not a substitute for the full AAST criteria or multidisciplinary trauma management protocols.</p>
        </div>
      </section>

      <section className="info-card">
        <h3>Key principles</h3>
        <ul className="plain-list">
          <li>Grading is based on the single worst injury when multiple injuries are present in the same organ; grade does not automatically dictate operative versus nonoperative management.</li>
          <li>Active bleeding and vascular injury (pseudoaneurysm, AV fistula) upstage spleen and liver injuries independent of laceration depth or hematoma size.</li>
          <li>For the kidney, collecting system involvement and the vascular level of injury (segmental versus main renal vessel or hilar avulsion) drive the distinction between Grade III/IV and Grade IV/V.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Organ</h3>
        <div className="form-grid filter-row">
          <label>
            <span>Select organ</span>
            <select value={activeOrgan} onChange={(e) => setActiveOrgan(e.target.value)}>
              {organs.map((o) => (
                <option key={o.key} value={o.key}>{o.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Findings</th>
              </tr>
            </thead>
            <tbody>
              {organ.grades.map((row) => (
                <tr key={row.grade}>
                  <td className="vessel-name">{row.grade}</td>
                  <td>
                    <ul className="plain-list">
                      {row.findings.map((finding) => (
                        <li key={finding}>{finding}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.href ? (
                <a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a>
              ) : (
                ref.label
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
