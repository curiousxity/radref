import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Form = {
  unenhanced: string
  portal: string
  delayed: string
}

const initialForm: Form = {
  unenhanced: '',
  portal: '',
  delayed: '',
}

function toNum(value: string) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

function fmtPct(value: number) {
  return `${Math.round(value)}%`
}

type Result = {
  category: string
  tone: 'good' | 'warn' | 'accent'
  apw: number | null
  rpw: number | null
  summary: string
  impression: string
}

function calc(form: Form): Result | null {
  const un = toNum(form.unenhanced)
  const portal = toNum(form.portal)
  const delayed = toNum(form.delayed)

  if (!Number.isFinite(un)) return null

  const hasWashoutInputs = Number.isFinite(portal) && Number.isFinite(delayed)
  const washoutValid = hasWashoutInputs && portal - un > 0

  const apw = washoutValid ? ((portal - delayed) / (portal - un)) * 100 : null
  const rpw = washoutValid && portal !== 0 ? ((portal - delayed) / portal) * 100 : null

  if (un <= 10) {
    return {
      category: 'Benign lipid-rich adenoma',
      tone: 'good',
      apw,
      rpw,
      summary: 'Unenhanced attenuation of 10 HU or less strongly favors a benign lipid-rich adenoma in the appropriate clinical setting, even without a washout calculation.',
      impression: `Adrenal nodule demonstrates unenhanced attenuation of ${un} HU, compatible with a benign lipid-rich adenoma in the appropriate clinical setting.`,
    }
  }

  if (!hasWashoutInputs) return null

  if (!washoutValid) {
    return {
      category: 'Check measurements',
      tone: 'warn',
      apw: null,
      rpw: null,
      summary: 'Portal phase attenuation should exceed unenhanced attenuation to calculate washout. Re-check the measured HU values.',
      impression: `Adrenal lesion measured ${un} HU unenhanced and ${form.portal} HU portal venous phase. Portal attenuation should exceed unenhanced attenuation to calculate washout; re-check measurements.`,
    }
  }

  const isAdenoma = (apw ?? 0) >= 60 || (rpw ?? 0) >= 40
  const apwText = apw !== null ? apw.toFixed(0) : '—'
  const rpwText = rpw !== null ? rpw.toFixed(0) : '—'

  if (isAdenoma) {
    return {
      category: 'Washout compatible with adenoma',
      tone: 'good',
      apw,
      rpw,
      summary: 'APW of 60% or more, or RPW of 40% or more, is highly suggestive of adrenal adenoma.',
      impression: `Adrenal lesion demonstrates washout characteristics compatible with adenoma, with absolute percentage washout of ${apwText}% and relative percentage washout of ${rpwText}%.`,
    }
  }

  return {
    category: 'Indeterminate by washout',
    tone: 'accent',
    apw,
    rpw,
    summary: 'Washout values do not meet adenoma thresholds. Interpret with lesion size, prior stability, cancer history, and biochemical context.',
    impression: `Adrenal lesion remains indeterminate by washout criteria, with absolute percentage washout of ${apwText}% and relative percentage washout of ${rpwText}%. Correlate with lesion size, prior stability, cancer history, biochemical testing, and clinical context.`,
  }
}

const thresholds = [
  { measure: 'Absolute percentage washout (APW)', threshold: '≥60%', notes: 'Commonly cited threshold for adrenal adenoma on delayed washout CT.' },
  { measure: 'Relative percentage washout (RPW)', threshold: '≥40%', notes: 'Also widely used to support adrenal adenoma.' },
  { measure: 'Unenhanced attenuation', threshold: '≤10 HU', notes: 'Strongly favors benign lipid-rich adenoma in the appropriate clinical setting, even without washout calculation.' },
]

const references: { label: string; href?: string }[] = [
  { label: 'Adrenal washout, Radiopaedia', href: 'https://radiopaedia.org/articles/adrenal-washout' },
  { label: 'Adrenal washout CT in patients with no history of cancer: a waste of time?, Abdominal Radiology 2024', href: 'https://pubmed.ncbi.nlm.nih.gov/38772953/' },
  {
    label: 'Management of Incidental Adrenal Masses: A White Paper of the ACR Incidental Findings Committee (also cited as summary), JACR 2017',
    href: 'https://pubmed.ncbi.nlm.nih.gov/28651988/',
  },
  {
    label: 'Adrenal wash-out CT: moderate diagnostic value in distinguishing benign from malignant adrenal masses, Eur J Endocrinol 2022',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8679842/',
  },
  { label: 'Adrenal CT Washout Calculator, Phillip Cheng MD MS', href: 'https://pcheng.org/calc/adrenal_ct.html' },
  { label: 'Characterization of Adrenal lesions – Update, Radiology Assistant', href: 'https://radiologyassistant.nl/abdomen/adrenals/lesion-characterization-1' },
  { label: 'Incidental adrenal masses should be assessed for malignancy potential and hormonal hyperfunction' },
  { label: 'Washed up: the end of an era for adrenal incidentaloma CT, Insights into Imaging 2025', href: 'https://pubmed.ncbi.nlm.nih.gov/40579670/' },
  { label: 'ACR Appropriateness Criteria® Adrenal Mass Evaluation: 2021 Update, JACR', href: 'https://pubmed.ncbi.nlm.nih.gov/34794587/' },
]

export function AdrenalWashoutPage() {
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
          <p className="eyebrow">Adrenal imaging</p>
          <h2>Adrenal washout calculator</h2>
          <p>Characterize an indeterminate adrenal lesion from unenhanced, portal venous, and delayed CT attenuation, with copyable reporting language.</p>
          <p className="source-note">Source: <a href="https://radiopaedia.org/articles/adrenal-washout" target="_blank" rel="noopener noreferrer">Adrenal washout, Radiopaedia</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Attenuation (HU)</h3>
          <div className="form-grid">
            <label>
              <span>Unenhanced</span>
              <input type="number" step="1" inputMode="decimal" value={form.unenhanced} onChange={(e) => update('unenhanced', e.target.value)} placeholder="e.g. 18" />
            </label>
            <label>
              <span>Portal venous / post-contrast</span>
              <input type="number" step="1" inputMode="decimal" value={form.portal} onChange={(e) => update('portal', e.target.value)} placeholder="e.g. 95" />
            </label>
            <label>
              <span>Delayed (~15 min)</span>
              <input type="number" step="1" inputMode="decimal" value={form.delayed} onChange={(e) => update('delayed', e.target.value)} placeholder="e.g. 45" />
            </label>
          </div>
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
                  <p className="metric-label">APW</p>
                  <p className="metric-value">{result.apw !== null ? fmtPct(result.apw) : '—'}</p>
                </div>
                <div>
                  <p className="metric-label">RPW</p>
                  <p className="metric-value">{result.rpw !== null ? fmtPct(result.rpw) : '—'}</p>
                </div>
              </div>
              <p className="result-summary">{result.summary}</p>
              <CopyBlock label="Impression" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Enter unenhanced HU (and portal + delayed HU if unenhanced is above 10) to calculate washout.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Common thresholds</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Measure</th>
                <th>Threshold suggesting adenoma</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {thresholds.map((row) => (
                <tr key={row.measure}>
                  <td className="vessel-name">{row.measure}</td>
                  <td>{row.threshold}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Caveats</h3>
        <ul className="plain-list">
          <li>More recent literature suggests that washout CT may have limited value in some patients without prior malignancy, and not all indeterminate adrenal lesions should automatically proceed to washout imaging.</li>
          <li>Washout results should be integrated with the broader adrenal incidentaloma framework, including lesion size, imaging features, prior exams, and clinical or biochemical workup.</li>
          <li>A washout-based interpretation does not replace clinical judgment or lesion-specific follow-up recommendations.</li>
          <li>The classic thresholds are commonly cited for 15-minute delayed imaging, so caution is warranted when using different delay times.</li>
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
