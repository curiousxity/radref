import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { Definition } from '../components/Definition'
import { assessFleischner, initialFleischnerForm } from '../logic/fleischner'
import type { Count, FleischnerForm, NoduleType, Risk } from '../logic/fleischner'

const matrix = [
  {
    group: 'Solid, single',
    size: '<6 mm (<100 mm³)',
    lowRisk: 'No routine follow-up',
    highRisk: 'Optional CT at 12 months',
  },
  {
    group: 'Solid, single',
    size: '6-8 mm (100-250 mm³)',
    lowRisk: 'CT at 6-12 months, then consider CT at 18-24 months',
    highRisk: 'CT at 6-12 months, then CT at 18-24 months',
  },
  {
    group: 'Solid, single',
    size: '>8 mm (>250 mm³)',
    lowRisk: 'Consider CT at 3 months, PET/CT, or tissue sampling',
    highRisk: 'Consider CT at 3 months, PET/CT, or tissue sampling',
  },
  {
    group: 'Solid, multiple',
    size: '<6 mm',
    lowRisk: 'No routine follow-up',
    highRisk: 'Optional CT at 12 months',
  },
  {
    group: 'Solid, multiple',
    size: '≥6 mm',
    lowRisk: 'CT at 3-6 months, then consider CT at 18-24 months',
    highRisk: 'CT at 3-6 months, then CT at 18-24 months',
  },
  {
    group: 'Ground-glass, single',
    size: '<6 mm',
    lowRisk: 'No routine follow-up',
    highRisk: 'No routine follow-up',
  },
  {
    group: 'Ground-glass, single',
    size: '≥6 mm',
    lowRisk: 'CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years',
    highRisk: 'CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years',
  },
  {
    group: 'Part-solid, single',
    size: '<6 mm',
    lowRisk: 'No routine follow-up',
    highRisk: 'No routine follow-up',
  },
  {
    group: 'Part-solid, single',
    size: '≥6 mm, solid component <6 mm',
    lowRisk: 'CT at 3-6 months to confirm persistence; if unchanged and solid component <6 mm, annual CT for 5 years',
    highRisk: 'CT at 3-6 months to confirm persistence; if unchanged and solid component <6 mm, annual CT for 5 years',
  },
  {
    group: 'Part-solid, single',
    size: 'Solid component ≥6 mm',
    lowRisk: 'Consider CT at 3-6 months for persistence; if persistent, highly suspicious. PET/CT, biopsy, or resection if solid component >8 mm, growing, or lobulated or cystic',
    highRisk: 'Consider CT at 3-6 months for persistence; if persistent, highly suspicious. PET/CT, biopsy, or resection if solid component >8 mm, growing, or lobulated or cystic',
  },
  {
    group: 'Subsolid, multiple',
    size: '<6 mm',
    lowRisk: 'CT at 3-6 months; if stable, consider CT at 2 and 4 years',
    highRisk: 'CT at 3-6 months; if stable, consider CT at 2 and 4 years',
  },
  {
    group: 'Subsolid, multiple',
    size: '≥6 mm',
    lowRisk: 'CT at 3-6 months; management based on the most suspicious nodule',
    highRisk: 'CT at 3-6 months; management based on the most suspicious nodule',
  },
]

const references: { label: string; href?: string }[] = [
  {
    label: 'MacMahon H et al., "Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017," Radiology 2017;284(1):228-243',
    href: 'https://pubs.rsna.org/doi/10.1148/radiol.2017161659',
  },
  {
    label: 'Bankier AA et al., "Recommendations for Measuring Pulmonary Nodules at CT: A Statement from the Fleischner Society," Radiology 2017;285(2):584-600',
    href: 'https://pubs.rsna.org/doi/10.1148/radiol.2017162894',
  },
  {
    label: 'ACR Lung-RADS, for nodules detected on lung cancer screening CT',
    href: 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/Lung-RADS',
  },
  {
    label: 'Fleischner Society pulmonary nodule recommendations, Radiopaedia',
    href: 'https://radiopaedia.org/articles/fleischner-society-pulmonary-nodule-recommendations',
  },
]

export function FleischnerPage() {
  const [form, setForm] = useState<FleischnerForm>(initialFleischnerForm)
  const result = useMemo(() => assessFleischner(form), [form])
  const showSolidComponent = form.noduleType === 'partSolid' && form.count === 'single'

  function update<K extends keyof FleischnerForm>(field: K, value: FleischnerForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialFleischnerForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Fleischner Society 2017</p>
          <h2>Incidental pulmonary nodule</h2>
          <p>Follow-up recommendations for incidentally detected pulmonary nodules on CT in patients 35 years and older, with report-ready impression text.</p>
          <p className="source-note">Source: <a href="https://pubs.rsna.org/doi/10.1148/radiol.2017161659" target="_blank" rel="noopener noreferrer">MacMahon et al., "Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017," Radiology 2017</a>. For screening LDCT, use <Link to="/lungrads">Lung-RADS</Link> instead.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Nodule</h3>
          <div className="form-grid">
            <label>
              <span>Nodule type</span>
              <select value={form.noduleType} onChange={(e) => update('noduleType', e.target.value as NoduleType)}>
                <option value="solid">Solid</option>
                <option value="groundGlass">Pure ground-glass</option>
                <option value="partSolid">Part-solid</option>
              </select>
            </label>

            <label>
              <span>Number of nodules</span>
              <select value={form.count} onChange={(e) => update('count', e.target.value as Count)}>
                <option value="single">Single</option>
                <option value="multiple">Multiple</option>
              </select>
            </label>

            <label>
              <span className="term">
                Mean diameter (mm)
                <Definition text="Average of the long- and short-axis diameters on the same transverse, coronal, or sagittal image, measured on thin sections in lung windows and rounded to the nearest whole millimetre. For multiple nodules, use the largest." />
              </span>
              <input
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={form.sizeMm}
                onChange={(e) => update('sizeMm', e.target.value)}
                placeholder="e.g. 7"
              />
            </label>

            {showSolidComponent && (
              <label>
                <span>Solid component (mm)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={form.solidComponentMm}
                  onChange={(e) => update('solidComponentMm', e.target.value)}
                  placeholder="e.g. 4"
                />
              </label>
            )}

            <label>
              <span className="term">
                Patient risk
                <Definition text="High risk covers a history of smoking or other known risk factors such as asbestos, radon, or family history, and is reinforced by older age, upper lobe location, spiculated margins, or coexisting emphysema or fibrosis. Risk only changes the recommendation for solid nodules." />
              </span>
              <select value={form.risk} onChange={(e) => update('risk', e.target.value as Risk)}>
                <option value="low">Low risk</option>
                <option value="high">High risk</option>
              </select>
            </label>
          </div>

          <h3>Applicability and benign features</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.screeningExam} onChange={(e) => update('screeningExam', e.target.checked)} />
              Nodule found on a lung cancer screening CT
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.ageUnder35} onChange={(e) => update('ageUnder35', e.target.checked)} />
              Patient younger than 35 years
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.immunosuppressed} onChange={(e) => update('immunosuppressed', e.target.checked)} />
              Immunosuppressed patient
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.knownPrimaryCancer} onChange={(e) => update('knownPrimaryCancer', e.target.checked)} />
              Known primary cancer
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.benignFeatures} onChange={(e) => update('benignFeatures', e.target.checked)} />
              Benign calcification pattern or macroscopic fat
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.perifissural} onChange={(e) => update('perifissural', e.target.checked)} />
              Perifissural nodule with typical intrapulmonary lymph node morphology
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.category} tone={result.tone} />
          </div>
          <p className="result-summary">{result.summary}</p>
          {result.impression && (
            <>
              <CopyBlock label="Impression" text={result.impression} />
              <CopyBlock label="Management" text={result.management} />
            </>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Fleischner 2017 matrix</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Nodule</th>
                <th>Size</th>
                <th>Low risk</th>
                <th>High risk</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={`${row.group} ${row.size}`}>
                  <td className="vessel-name">{row.group}</td>
                  <td>{row.size}</td>
                  <td>{row.lowRisk}</td>
                  <td>{row.highRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Measurement and scope</h3>
        <ul className="plain-list">
          <li>Size is the average of the long- and short-axis diameters on the same image, rounded to the nearest whole millimetre; record both axes for nodules larger than 10 mm. Thresholds apply to the rounded value, so a 5.4 mm mean counts as 5 mm.</li>
          <li>Measure on contiguous thin sections (1.5 mm or less, typically 1.0 mm) in lung windows, using the image plane that shows the nodule best.</li>
          <li>The guideline applies to incidental nodules in patients 35 years and older, and excludes screening CT, immunosuppressed patients, and patients with a known primary cancer.</li>
          <li>Recommendations apply to solitary and multiple nodules; with multiple nodules, follow the most suspicious one.</li>
          <li>Volume thresholds of 100 mm³ and 250 mm³ correspond to the 6 mm and 8 mm diameter cutoffs when volumetry is used.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Caveats</h3>
        <ul className="plain-list">
          <li>The recommendations are deliberately expressed as time ranges rather than fixed dates, so that follow-up can be individualised to risk and patient preference.</li>
          <li>Subsolid nodules require an initial follow-up to confirm persistence, since transient inflammatory or infectious ground-glass opacity is common.</li>
          <li>Discrete solid components cannot be reliably defined in part-solid nodules smaller than 6 mm, so these are treated like pure ground-glass nodules of the same size.</li>
          <li>For a part-solid nodule with a solid component larger than 8 mm, a growing solid component, or lobulated margins or cystic components, PET/CT, biopsy, or resection are recommended.</li>
        </ul>
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
