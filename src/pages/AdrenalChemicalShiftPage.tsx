import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Form = {
  adrenalIn: string
  adrenalOpp: string
  spleenIn: string
  spleenOpp: string
}

const initialForm: Form = {
  adrenalIn: '',
  adrenalOpp: '',
  spleenIn: '',
  spleenOpp: '',
}

// Signal intensity index at or above this favours a lipid-rich adenoma.
const siiThreshold = 16.5
// Adrenal-to-spleen chemical shift ratio at or below this favours a lipid-rich adenoma.
const asrThreshold = 0.71

function toNum(value: string) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

type Result = {
  category: string
  tone: 'good' | 'warn' | 'accent'
  sii: number | null
  asr: number | null
  summary: string
  impression: string
}

function calc(form: Form): Result | null {
  const adrenalIn = toNum(form.adrenalIn)
  const adrenalOpp = toNum(form.adrenalOpp)

  if (!Number.isFinite(adrenalIn) || !Number.isFinite(adrenalOpp)) return null
  if (adrenalIn <= 0 || adrenalOpp < 0) return null

  const sii = ((adrenalIn - adrenalOpp) / adrenalIn) * 100

  const spleenIn = toNum(form.spleenIn)
  const spleenOpp = toNum(form.spleenOpp)
  const hasSpleen = Number.isFinite(spleenIn) && Number.isFinite(spleenOpp) && spleenIn > 0 && spleenOpp > 0
  const asr = hasSpleen ? (adrenalOpp / spleenOpp) / (adrenalIn / spleenIn) : null

  const siiText = sii.toFixed(1)
  const asrText = asr !== null ? asr.toFixed(2) : null

  const siiSupports = sii >= siiThreshold
  const asrSupports = asr !== null && asr <= asrThreshold
  const supportsAdenoma = siiSupports || asrSupports

  const asrSentence = asrText !== null
    ? ` The adrenal-to-spleen chemical shift ratio is ${asrText}.`
    : ''

  if (supportsAdenoma) {
    return {
      category: 'Signal loss favours adenoma',
      tone: 'good',
      sii,
      asr,
      summary: `Signal intensity index of ${siiText}% ${siiSupports ? 'meets' : 'does not meet'} the ${siiThreshold}% threshold${asrText !== null ? `, and the adrenal-to-spleen ratio of ${asrText} ${asrSupports ? 'meets' : 'does not meet'} the ${asrThreshold} threshold` : ''}. Microscopic lipid on opposed-phase imaging supports a lipid-rich adenoma in the appropriate clinical setting.`,
      impression: `Adrenal nodule loses signal on opposed-phase imaging, with a signal intensity index of ${siiText}%.${asrSentence} Findings are compatible with a lipid-rich adenoma in the appropriate clinical setting.`,
    }
  }

  return {
    category: 'No diagnostic signal loss',
    tone: 'accent',
    sii,
    asr,
    summary: `Signal intensity index of ${siiText}% is below the ${siiThreshold}% threshold${asrText !== null ? `, and the adrenal-to-spleen ratio of ${asrText} is above the ${asrThreshold} threshold` : ''}. A lipid-poor adenoma remains possible, so correlate with unenhanced attenuation, washout CT, prior imaging, lesion size, and cancer history.`,
    impression: `Adrenal nodule does not demonstrate diagnostic signal loss on opposed-phase imaging, with a signal intensity index of ${siiText}%.${asrSentence} The lesion remains indeterminate by chemical shift criteria. Correlate with unenhanced attenuation, washout CT, prior imaging, lesion size, and clinical context.`,
  }
}

const thresholds = [
  { measure: 'Signal intensity index (SII)', formula: '(SI in-phase - SI opposed-phase) / SI in-phase x 100', threshold: 'at or above 16.5%', notes: 'Uses the lesion alone, with no internal reference organ required.' },
  { measure: 'Adrenal-to-spleen ratio (ASR)', formula: '(adrenal OP / spleen OP) / (adrenal IP / spleen IP)', threshold: 'at or below 0.71', notes: 'Spleen is preferred over liver as the reference, since a steatotic liver also loses signal on opposed phase.' },
]

const caveats = [
  'Roughly a third of adrenal adenomas are lipid-poor and will not lose signal, so a negative study does not exclude adenoma.',
  'Use spleen rather than liver as the internal reference. Hepatic steatosis makes the liver lose signal on opposed phase and corrupts the ratio.',
  'Splenic iron deposition lowers splenic signal and can likewise distort the ratio.',
  'Metastases and phaeochromocytomas occasionally contain intracellular lipid and may show some signal loss, so interpret against cancer history and biochemistry.',
  'Macroscopic fat in a myelolipoma produces India-ink etching at fat-water interfaces, which is a different finding from the diffuse signal drop of microscopic lipid.',
  'Signal drop is field-strength and sequence dependent. Compare in-phase and opposed-phase images acquired in the same breath-hold with identical parameters.',
]

const references: { label: string; href?: string }[] = [
  { label: 'Adrenal adenoma, Radiopaedia', href: 'https://radiopaedia.org/articles/adrenal-adenoma' },
  { label: 'Chemical shift imaging, Radiopaedia', href: 'https://radiopaedia.org/articles/chemical-shift-imaging' },
  { label: 'Characterization of adrenal lesions, Radiology Assistant', href: 'https://radiologyassistant.nl/abdomen/adrenals/lesion-characterization-1' },
  { label: 'Israel GM et al. Comparison of unenhanced CT and chemical shift MRI in evaluating lipid-rich adrenal adenomas. AJR, 2004' },
  { label: 'Management of Incidental Adrenal Masses: A White Paper of the ACR Incidental Findings Committee. JACR, 2017' },
]

export function AdrenalChemicalShiftPage() {
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
          <h2>Adrenal chemical shift</h2>
          <p>Quantify opposed-phase signal loss in an adrenal nodule, with the optional adrenal-to-spleen ratio and copyable reporting language.</p>
          <p className="source-note">Source: <a href="https://radiopaedia.org/articles/adrenal-adenoma" target="_blank" rel="noopener noreferrer">Adrenal adenoma, Radiopaedia</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Signal intensity</h3>
          <div className="form-grid">
            <label>
              <span>Adrenal nodule, in-phase</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.adrenalIn} onChange={(e) => update('adrenalIn', e.target.value)} placeholder="e.g. 220" />
            </label>
            <label>
              <span>Adrenal nodule, opposed-phase</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.adrenalOpp} onChange={(e) => update('adrenalOpp', e.target.value)} placeholder="e.g. 140" />
            </label>
            <label>
              <span>Spleen, in-phase (optional)</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.spleenIn} onChange={(e) => update('spleenIn', e.target.value)} placeholder="e.g. 180" />
            </label>
            <label>
              <span>Spleen, opposed-phase (optional)</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.spleenOpp} onChange={(e) => update('spleenOpp', e.target.value)} placeholder="e.g. 178" />
            </label>
          </div>
          <p className="source-note">Add both spleen values to calculate the adrenal-to-spleen ratio.</p>
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
                  <p className="metric-label">SII</p>
                  <p className="metric-value">{result.sii !== null ? `${result.sii.toFixed(1)}%` : '—'}</p>
                </div>
                <div>
                  <p className="metric-label">ASR</p>
                  <p className="metric-value">{result.asr !== null ? result.asr.toFixed(2) : '—'}</p>
                </div>
              </div>
              <p className="result-summary">{result.summary}</p>
              <CopyBlock label="Impression" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Enter in-phase and opposed-phase signal intensity for the nodule to calculate the signal intensity index.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Thresholds</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Measure</th>
                <th>Formula</th>
                <th>Favours adenoma</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {thresholds.map((row) => (
                <tr key={row.measure}>
                  <td className="vessel-name">{row.measure}</td>
                  <td>{row.formula}</td>
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
          {caveats.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="source-note">For an indeterminate lesion on CT, see the <Link to="/adrenal-washout">adrenal washout calculator</Link>.</p>
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
