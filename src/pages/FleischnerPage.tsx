import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { Definition } from '../components/Definition'

type NoduleType = 'solid' | 'groundGlass' | 'partSolid'
type Count = 'single' | 'multiple'
type Risk = 'low' | 'high'
type Tone = 'neutral' | 'good' | 'warn' | 'accent'

type Form = {
  noduleType: NoduleType
  count: Count
  risk: Risk
  sizeMm: string
  solidComponentMm: string
  screeningExam: boolean
  ageUnder35: boolean
  immunosuppressed: boolean
  knownPrimaryCancer: boolean
  benignFeatures: boolean
  perifissural: boolean
}

const initialForm: Form = {
  noduleType: 'solid',
  count: 'single',
  risk: 'low',
  sizeMm: '',
  solidComponentMm: '',
  screeningExam: false,
  ageUnder35: false,
  immunosuppressed: false,
  knownPrimaryCancer: false,
  benignFeatures: false,
  perifissural: false,
}

type Result = {
  category: string
  tone: Tone
  summary: string
  management: string
  impression: string | null
}

type Outcome = {
  category: string
  tone: Tone
  summary: string
  management: string
  recommendation: string
}

function parseSize(value: string) {
  if (value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
}

function fmt(value: number) {
  return String(Number(value.toFixed(1)))
}

function pending(summary: string): Result {
  return { category: 'Awaiting input', tone: 'neutral', summary, management: '', impression: null }
}

function classify(form: Form, size: number, solid: number | null): Outcome | null {
  const highRisk = form.risk === 'high'

  if (form.noduleType === 'solid') {
    if (form.count === 'single') {
      if (size < 6) {
        return highRisk
          ? {
              category: 'Optional CT at 12 months',
              tone: 'accent',
              summary: 'Single solid nodule smaller than 6 mm (<100 mm³) in a high-risk patient.',
              management: 'Optional CT at 12 months. Follow-up is most worthwhile with suspicious morphology, upper lobe location, or other risk factors.',
              recommendation: 'optional follow-up CT at 12 months.',
            }
          : {
              category: 'No routine follow-up',
              tone: 'good',
              summary: 'Single solid nodule smaller than 6 mm (<100 mm³) in a low-risk patient.',
              management: 'No routine follow-up is required.',
              recommendation: 'no routine imaging follow-up is required.',
            }
      }

      if (size <= 8) {
        return {
          category: 'CT at 6-12 months',
          tone: 'accent',
          summary: 'Single solid nodule 6 to 8 mm (100-250 mm³).',
          management: highRisk
            ? 'CT at 6-12 months, then CT at 18-24 months.'
            : 'CT at 6-12 months, then consider CT at 18-24 months.',
          recommendation: highRisk
            ? 'follow-up CT at 6-12 months, then CT at 18-24 months.'
            : 'follow-up CT at 6-12 months, then consider CT at 18-24 months.',
        }
      }

      return {
        category: 'CT at 3 months, PET/CT, or sampling',
        tone: 'warn',
        summary: 'Single solid nodule larger than 8 mm (>250 mm³).',
        management: 'Consider CT at 3 months, PET/CT, or tissue sampling, weighing size, morphology, comorbidity, and patient preference.',
        recommendation: 'consider follow-up CT at 3 months, PET/CT, or tissue sampling.',
      }
    }

    if (size < 6) {
      return highRisk
        ? {
            category: 'Optional CT at 12 months',
            tone: 'accent',
            summary: 'Multiple solid nodules, all smaller than 6 mm, in a high-risk patient.',
            management: 'Optional CT at 12 months.',
            recommendation: 'optional follow-up CT at 12 months.',
          }
        : {
            category: 'No routine follow-up',
            tone: 'good',
            summary: 'Multiple solid nodules, all smaller than 6 mm, in a low-risk patient.',
            management: 'No routine follow-up is required.',
            recommendation: 'no routine imaging follow-up is required.',
          }
    }

    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Multiple solid nodules with at least one 6 mm or larger. Management follows the most suspicious nodule.',
      management: highRisk
        ? 'CT at 3-6 months, then CT at 18-24 months, guided by the most suspicious nodule.'
        : 'CT at 3-6 months, then consider CT at 18-24 months, guided by the most suspicious nodule.',
      recommendation: highRisk
        ? 'follow-up CT at 3-6 months, then CT at 18-24 months, guided by the most suspicious nodule.'
        : 'follow-up CT at 3-6 months, then consider CT at 18-24 months, guided by the most suspicious nodule.',
    }
  }

  if (form.count === 'multiple') {
    if (size < 6) {
      return {
        category: 'CT at 3-6 months',
        tone: 'accent',
        summary: 'Multiple subsolid nodules, all smaller than 6 mm. These are often infectious or inflammatory.',
        management: 'CT at 3-6 months. If stable, consider CT at 2 and 4 years.',
        recommendation: 'follow-up CT at 3-6 months; if stable, consider CT at 2 and 4 years.',
      }
    }

    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Multiple subsolid nodules with at least one 6 mm or larger.',
      management: 'CT at 3-6 months. Subsequent management is based on the most suspicious nodule.',
      recommendation: 'follow-up CT at 3-6 months, with subsequent management based on the most suspicious nodule.',
    }
  }

  if (form.noduleType === 'groundGlass') {
    if (size < 6) {
      return {
        category: 'No routine follow-up',
        tone: 'good',
        summary: 'Single pure ground-glass nodule smaller than 6 mm.',
        management: 'No routine follow-up. In selected patients with suspicious morphology or other risk factors, CT at 2 and 4 years may be considered.',
        recommendation: 'no routine imaging follow-up is required.',
      }
    }

    return {
      category: 'CT at 6-12 months',
      tone: 'accent',
      summary: 'Single pure ground-glass nodule 6 mm or larger.',
      management: 'CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years.',
      recommendation: 'follow-up CT at 6-12 months to confirm persistence, then CT every 2 years until 5 years.',
    }
  }

  if (size < 6) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'Single subsolid nodule smaller than 6 mm. A nodule this small is generally not classified as part-solid.',
      management: 'No routine follow-up is required.',
      recommendation: 'no routine imaging follow-up is required.',
    }
  }

  if (solid === null) return null

  if (solid < 6) {
    return {
      category: 'CT at 3-6 months',
      tone: 'accent',
      summary: 'Single part-solid nodule 6 mm or larger with a solid component smaller than 6 mm.',
      management: 'CT at 3-6 months to confirm persistence. If unchanged and the solid component remains smaller than 6 mm, annual CT for 5 years.',
      recommendation: 'follow-up CT at 3-6 months to confirm persistence; if unchanged and the solid component remains smaller than 6 mm, annual CT for 5 years.',
    }
  }

  return {
    category: 'Highly suspicious',
    tone: 'warn',
    summary: 'Single part-solid nodule with a solid component of 6 mm or larger, which is highly suspicious.',
    management: 'Consider PET/CT, biopsy, or resection. Persistent part-solid nodules with a solid component of at least 8 mm are especially concerning.',
    recommendation: 'the solid component measures 6 mm or larger, which is highly suspicious; consider PET/CT, biopsy, or resection.',
  }
}

function calc(form: Form): Result {
  if (form.screeningExam) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 does not apply to nodules found on lung cancer screening CT.',
      management: 'Assign a Lung-RADS category instead of a Fleischner recommendation.',
      impression: 'Pulmonary nodule detected on lung cancer screening CT. Managed with Lung-RADS rather than the Fleischner Society incidental nodule guideline.',
    }
  }

  if (form.ageUnder35) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 applies to patients 35 years and older, since nodules in younger patients are far more often infectious or inflammatory.',
      management: 'Manage by clinical context. A short-interval CT to document resolution is often more appropriate than the Fleischner schedule.',
      impression: 'Incidental pulmonary nodule in a patient younger than 35 years, outside the scope of the Fleischner Society 2017 guideline. Short-interval follow-up may be considered based on clinical context.',
    }
  }

  if (form.immunosuppressed) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 excludes immunosuppressed patients, in whom nodules are more likely to be infectious.',
      management: 'Manage by clinical context, typically with short-interval follow-up or infectious workup.',
      impression: 'Incidental pulmonary nodule in an immunosuppressed patient, outside the scope of the Fleischner Society 2017 guideline. Correlation with clinical context and short-interval follow-up is suggested.',
    }
  }

  if (form.knownPrimaryCancer) {
    return {
      category: 'Outside Fleischner scope',
      tone: 'neutral',
      summary: 'Fleischner 2017 excludes patients with a known primary cancer, where nodules are assessed as potential metastases.',
      management: 'Follow the oncologic staging or surveillance protocol for the known primary.',
      impression: 'Pulmonary nodule in a patient with a known primary malignancy, outside the scope of the Fleischner Society 2017 guideline. Assessment should follow oncologic staging or surveillance protocols.',
    }
  }

  if (form.benignFeatures) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'A benign calcification pattern or macroscopic fat identifies the nodule as benign.',
      management: 'No imaging follow-up is required for this nodule.',
      impression: 'Pulmonary nodule with benign features (benign calcification pattern or macroscopic fat). No imaging follow-up is required.',
    }
  }

  if (form.perifissural) {
    return {
      category: 'No routine follow-up',
      tone: 'good',
      summary: 'A solid perifissural nodule with typical intrapulmonary lymph node morphology does not require follow-up.',
      management: 'No imaging follow-up is required for this nodule.',
      impression: 'Perifissural pulmonary nodule with morphology typical of an intrapulmonary lymph node. No imaging follow-up is required.',
    }
  }

  const size = parseSize(form.sizeMm)
  if (size === null) {
    return pending('Enter the mean nodule diameter, the average of the long- and short-axis measurements, to get a Fleischner recommendation.')
  }

  const solid = parseSize(form.solidComponentMm)
  if (solid !== null && solid > size) {
    return pending('The solid component cannot be larger than the overall nodule diameter. Check both measurements.')
  }

  const outcome = classify(form, size, solid)
  if (!outcome) {
    return pending('Enter the solid component diameter to complete the part-solid assessment.')
  }

  const typeWord = form.noduleType === 'solid' ? 'solid' : form.noduleType === 'groundGlass' ? 'pure ground-glass' : 'part-solid'
  const riskPhrase = form.noduleType === 'solid' ? ` in a patient at ${form.risk} risk for lung cancer` : ''
  const solidPhrase =
    form.noduleType === 'partSolid' && form.count === 'single' && solid !== null ? ` with a ${fmt(solid)} mm solid component` : ''
  const lead =
    form.count === 'single'
      ? `Incidental ${typeWord} pulmonary nodule measuring ${fmt(size)} mm${solidPhrase}${riskPhrase}.`
      : `Multiple incidental ${typeWord} pulmonary nodules${riskPhrase}, largest measuring ${fmt(size)} mm.`

  return {
    category: outcome.category,
    tone: outcome.tone,
    summary: outcome.summary,
    management: outcome.management,
    impression: `${lead} Per Fleischner Society 2017 recommendations, ${outcome.recommendation}`,
  }
}

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
    size: '≥6 mm',
    lowRisk: 'CT at 3-6 months to confirm persistence; if unchanged and solid component <6 mm, annual CT for 5 years',
    highRisk: 'Solid component ≥6 mm is highly suspicious: consider PET/CT, biopsy, or resection',
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
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => calc(form), [form])
  const showSolidComponent = form.noduleType === 'partSolid' && form.count === 'single'

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
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
          <li>Size is the average of the long- and short-axis diameters on the same image, rounded to the nearest whole millimetre; report both axes for nodules of 1 cm or larger.</li>
          <li>Measure on thin sections (1 mm or less where available) in lung windows, using the image plane that shows the nodule best.</li>
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
          <li>A part-solid nodule cannot reliably be characterised as such below 6 mm, so subcentimetre subsolid nodules are treated as ground-glass.</li>
          <li>A solid component of 8 mm or more in a persistent part-solid nodule is particularly concerning and warrants PET/CT, biopsy, or resection.</li>
          <li>Follow-up should be halted when it is unlikely to change management, such as with limited life expectancy or significant comorbidity.</li>
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
