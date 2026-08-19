import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Form = {
  residual: string
  distal: string
  original: string
}

const initialForm: Form = {
  residual: '',
  distal: '',
  original: '',
}

function toNum(value: string) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

type Result = {
  category: string
  tone: 'good' | 'warn' | 'accent'
  nascet: number | null
  ecst: number | null
  summary: string
  impression: string
}

function grade(nascet: number) {
  if (nascet >= 70) return { label: 'Severe stenosis (70-99%)', word: 'severe' }
  if (nascet >= 50) return { label: 'Moderate stenosis (50-69%)', word: 'moderate' }
  return { label: 'Mild stenosis (<50%)', word: 'mild' }
}

function calc(form: Form): Result | null {
  const residual = toNum(form.residual)
  const distal = toNum(form.distal)
  const original = toNum(form.original)

  if (!Number.isFinite(residual) || !Number.isFinite(distal)) return null
  if (residual < 0 || distal <= 0) return null

  if (residual === 0) {
    return {
      category: 'Occlusion',
      tone: 'warn',
      nascet: 100,
      ecst: 100,
      summary: 'No residual lumen means occlusion rather than a gradable stenosis. Near-occlusion with a collapsed distal internal carotid artery should also not be graded by the NASCET ratio, because the shrunken distal vessel makes the calculated percentage falsely low.',
      impression: 'No residual lumen is identified within the internal carotid artery, compatible with occlusion. Percentage stenosis is not applicable.',
    }
  }

  if (residual > distal) {
    return {
      category: 'Check measurements',
      tone: 'warn',
      nascet: null,
      ecst: null,
      summary: 'The residual lumen at the stenosis should not exceed the distal normal internal carotid artery diameter. Re-check which vessel each measurement was taken from, and confirm the distal measurement is at a point where the walls are parallel.',
      impression: `Measured residual lumen of ${form.residual} mm exceeds the distal internal carotid diameter of ${form.distal} mm. Re-check measurements before grading stenosis.`,
    }
  }

  const nascet = (1 - residual / distal) * 100
  const ecst = Number.isFinite(original) && original > 0 && original >= residual
    ? (1 - residual / original) * 100
    : null

  const nascetText = nascet.toFixed(0)
  const { label, word } = grade(nascet)
  const tone = nascet >= 70 ? 'warn' : nascet >= 50 ? 'accent' : 'good'

  const ecstSentence = ecst !== null
    ? ` Measured against an estimated original lumen of ${form.original} mm at the stenosis, the ECST equivalent is ${ecst.toFixed(0)}%.`
    : ''

  return {
    category: label,
    tone,
    nascet,
    ecst,
    summary: 'NASCET grades stenosis against the distal internal carotid artery, where the walls are parallel. ECST grades against the estimated original lumen at the stenosis itself and therefore always yields a higher number for the same lesion.',
    impression: `The internal carotid artery demonstrates a minimal residual lumen of ${form.residual} mm with a distal normal luminal diameter of ${form.distal} mm, corresponding to ${nascetText}% ${word} stenosis by NASCET criteria.${ecstSentence}`,
  }
}

const equivalence = [
  { nascet: '30%', ecst: '58%' },
  { nascet: '40%', ecst: '64%' },
  { nascet: '50%', ecst: '70%' },
  { nascet: '60%', ecst: '76%' },
  { nascet: '70%', ecst: '82%' },
  { nascet: '80%', ecst: '88%' },
  { nascet: '90%', ecst: '94%' },
]

const bands = [
  { band: 'Mild', nascet: '<50%', notes: 'Trial data did not show benefit from endarterectomy at this severity.' },
  { band: 'Moderate', nascet: '50-69%', notes: 'Moderate benefit from endarterectomy in symptomatic patients in NASCET, with benefit varying by subgroup.' },
  { band: 'Severe', nascet: '70-99%', notes: 'Clearest benefit from endarterectomy in symptomatic patients in NASCET.' },
  { band: 'Occlusion', nascet: 'No residual lumen', notes: 'Not gradable as a percentage. Distinguish from near-occlusion.' },
]

const caveats = [
  'NASCET and ECST are not interchangeable. The same lesion yields a higher percentage by ECST, so always state which method was used.',
  'Near-occlusion (the string sign) invalidates the NASCET ratio: the distal internal carotid artery collapses, shrinking the denominator and making the calculated stenosis falsely low.',
  'Measure the distal internal carotid artery beyond the bulb, at a level where the walls are parallel.',
  'Duplex velocity criteria are a separate grading pathway and do not feed into this calculation. Where the two disagree, correlate rather than average.',
  'Management thresholds depend on symptom status, patient factors, and the guideline in use. Percentage stenosis is one input, not the decision.',
]

const references: { label: string; href?: string }[] = [
  { label: 'Carotid artery stenosis, Radiopaedia', href: 'https://radiopaedia.org/articles/carotid-artery-stenosis' },
  { label: 'NASCET, Radiopaedia', href: 'https://radiopaedia.org/articles/nascet' },
  { label: 'North American Symptomatic Carotid Endarterectomy Trial Collaborators. Beneficial effect of carotid endarterectomy in symptomatic patients with high-grade carotid stenosis. N Engl J Med, 1991' },
  { label: 'European Carotid Surgery Trialists Collaborative Group. Randomised trial of endarterectomy for recently symptomatic carotid stenosis. Lancet, 1998' },
  { label: 'Grant EG et al. Carotid artery stenosis: gray-scale and Doppler US diagnosis, Society of Radiologists in Ultrasound consensus conference. Radiology, 2003' },
]

export function CarotidStenosisPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  const result = useMemo(() => calc(form), [form])

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Formulas</p>
          <h2>Carotid stenosis (NASCET)</h2>
          <p>Grade internal carotid artery stenosis from luminal diameters, with the ECST equivalent and copyable reporting language.</p>
          <p className="source-note">Source: <a href="https://radiopaedia.org/articles/nascet" target="_blank" rel="noopener noreferrer">NASCET, Radiopaedia</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Luminal diameter (mm)</h3>
          <div className="form-grid">
            <label>
              <span>Minimal residual lumen at stenosis</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.residual} onChange={(e) => update('residual', e.target.value)} placeholder="e.g. 1.5" />
            </label>
            <label>
              <span>Distal normal ICA (NASCET denominator)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.distal} onChange={(e) => update('distal', e.target.value)} placeholder="e.g. 5.0" />
            </label>
            <label>
              <span>Estimated original lumen at stenosis (ECST, optional)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.original} onChange={(e) => update('original', e.target.value)} placeholder="e.g. 8.0" />
            </label>
          </div>
          <p className="source-note">Enter 0 for the residual lumen if no flow-bearing lumen is identified.</p>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result ? result.category : 'Awaiting input'} tone={result ? result.tone : 'accent'} />
          </div>

          {result ? (
            <>
              <div className="result-panel">
                <div>
                  <p className="metric-label">NASCET</p>
                  <p className="metric-value">{result.nascet !== null ? `${result.nascet.toFixed(0)}%` : '—'}</p>
                </div>
                <div>
                  <p className="metric-label">ECST</p>
                  <p className="metric-value">{result.ecst !== null ? `${result.ecst.toFixed(0)}%` : '—'}</p>
                </div>
              </div>
              <p className="result-summary">{result.summary}</p>
              <CopyBlock label="Impression" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Enter the residual lumen and the distal normal internal carotid diameter to grade stenosis.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Severity bands</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Band</th>
                <th>NASCET</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((row) => (
                <tr key={row.band}>
                  <td className="vessel-name">{row.band}</td>
                  <td>{row.nascet}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>NASCET and ECST equivalence</h3>
        <p className="source-note">Approximate conversion, ECST = 0.6 x NASCET + 40.</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>NASCET</th>
                <th>ECST</th>
              </tr>
            </thead>
            <tbody>
              {equivalence.map((row) => (
                <tr key={row.nascet}>
                  <td className="vessel-name">{row.nascet}</td>
                  <td>{row.ecst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Caveats</h3>
        <ul className="plain-list">
          {caveats.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.href ? <a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a> : ref.label}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
