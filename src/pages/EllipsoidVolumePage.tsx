import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Unit = 'cm' | 'mm'
type FactorKey = 'ellipsoid' | 'abc2' | 'brunn'

type Form = {
  a: string
  b: string
  c: string
  unit: Unit
  factor: FactorKey
  psa: string
}

const initialForm: Form = {
  a: '',
  b: '',
  c: '',
  unit: 'cm',
  factor: 'ellipsoid',
  psa: '',
}

const factors: { key: FactorKey; value: number; name: string; short: string; use: string }[] = [
  {
    key: 'ellipsoid',
    value: 0.523,
    name: 'Ellipsoid, pi/6 (0.523)',
    short: 'Ellipsoid (pi/6)',
    use: 'General organ and lesion volumes: prostate, ovary, kidney, uterus, thyroid nodule.',
  },
  {
    key: 'abc2',
    value: 0.5,
    name: 'ABC/2 (0.5)',
    short: 'ABC/2',
    use: 'Bedside estimate of spontaneous intracerebral haemorrhage volume.',
  },
  {
    key: 'brunn',
    value: 0.479,
    name: 'Brunn correction (0.479)',
    short: 'Brunn correction',
    use: 'Thyroid lobe volume on ultrasound, where the plain ellipsoid formula tends to overestimate.',
  },
]

// PSA density at or above this is widely used to flag a gland for closer scrutiny.
const psaDensityThreshold = 0.15

/** Sub-millilitre lesions need more precision than a single decimal place. */
function formatVolume(volume: number) {
  return volume < 1 ? volume.toFixed(2) : volume.toFixed(1)
}

function toNum(value: string) {
  // Number('') is 0, which would make an untouched field read as a real
  // measurement of zero, so blank is rejected before parsing.
  if (value.trim() === '') return NaN
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

type Result = {
  volume: number
  psaDensity: number | null
  tone: 'good' | 'warn' | 'accent'
  category: string
  summary: string
  impression: string
}

function calc(form: Form): Result | null {
  const raw = [toNum(form.a), toNum(form.b), toNum(form.c)]
  if (raw.some((value) => !Number.isFinite(value) || value <= 0)) return null

  const scale = form.unit === 'mm' ? 0.1 : 1
  const [a, b, c] = raw.map((value) => value * scale)
  const factor = factors.find((entry) => entry.key === form.factor) ?? factors[0]
  const volume = a * b * c * factor.value

  const psa = toNum(form.psa)
  const psaDensity = form.factor === 'ellipsoid' && Number.isFinite(psa) && psa > 0 ? psa / volume : null

  const dims = `${a.toFixed(1)} x ${b.toFixed(1)} x ${c.toFixed(1)} cm`
  const volumeText = formatVolume(volume)
  const category = `${volumeText} mL`

  if (form.factor === 'abc2') {
    return {
      volume,
      psaDensity: null,
      tone: 'accent',
      category,
      summary: 'ABC/2 estimates haematoma volume from three orthogonal measurements. It is quick and reproducible, but overestimates volume for irregular or lobulated haematomas.',
      impression: `Haematoma measures ${dims}, corresponding to an estimated volume of ${volumeText} mL by the ABC/2 method.`,
    }
  }

  if (psaDensity !== null) {
    const densityText = psaDensity.toFixed(2)
    const elevated = psaDensity >= psaDensityThreshold
    return {
      volume,
      psaDensity,
      tone: elevated ? 'warn' : 'good',
      category,
      summary: `PSA density is ${densityText} ng/mL/cm³, ${elevated ? 'at or above' : 'below'} the ${psaDensityThreshold.toFixed(2)} threshold commonly used to support further evaluation. Interpret alongside the MRI findings and clinical context.`,
      impression: `Prostate measures ${dims}, corresponding to an estimated volume of ${volumeText} mL. With a serum PSA of ${form.psa} ng/mL, the PSA density is ${densityText} ng/mL/cm³.`,
    }
  }

  return {
    volume,
    psaDensity: null,
    tone: 'accent',
    category,
    summary: `Volume is estimated as A x B x C x ${factor.value}, from three orthogonal measurements. ${factor.use}`,
    impression: `Measures ${dims}, corresponding to an estimated volume of ${volumeText} mL.`,
  }
}

const caveats = [
  'The formula assumes an ellipsoid. Irregular, lobulated, or infiltrative lesions are estimated less reliably, and the error grows with the degree of irregularity.',
  'Measure three genuinely orthogonal axes. Two measurements taken in the same plane will not give a valid volume.',
  'ABC/2 overestimates the volume of irregular intracerebral haematomas, and accuracy falls further with lobulation or intraventricular extension.',
  'PSA density is only as good as the volume estimate, so a poorly measured gland propagates directly into the reported density.',
]

const references: { label: string; href?: string }[] = [
  { label: 'Prostate volume, Radiopaedia', href: 'https://radiopaedia.org/articles/prostate-volume' },
  { label: 'PSA density, Radiopaedia', href: 'https://radiopaedia.org/articles/psa-density' },
  { label: 'ABC/2 method, Radiopaedia', href: 'https://radiopaedia.org/articles/abc2-method' },
  { label: 'Thyroid volume, Radiopaedia', href: 'https://radiopaedia.org/articles/thyroid-volume' },
  { label: 'Kothari RU et al. The ABCs of measuring intracerebral hemorrhage volumes. Stroke, 1996' },
  { label: 'Brunn J et al. Volumetric analysis of thyroid lobes by real-time ultrasound. Dtsch Med Wochenschr, 1981' },
]

export function EllipsoidVolumePage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  const result = useMemo(() => calc(form), [form])
  const activeFactor = factors.find((entry) => entry.key === form.factor) ?? factors[0]

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Formulas</p>
          <h2>Ellipsoid volume</h2>
          <p>Estimate the volume of an organ or lesion from three orthogonal measurements, with optional PSA density for prostate MRI.</p>
          <p className="source-note">Source: <a href="https://radiopaedia.org/articles/prostate-volume" target="_blank" rel="noopener noreferrer">Prostate volume, Radiopaedia</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Measurements</h3>
          <div className="form-grid">
            <label>
              <span>Units</span>
              <select value={form.unit} onChange={(e) => update('unit', e.target.value as Unit)}>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
            </label>
            <label>
              <span>Dimension A ({form.unit})</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.a} onChange={(e) => update('a', e.target.value)} placeholder="e.g. 4.5" />
            </label>
            <label>
              <span>Dimension B ({form.unit})</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.b} onChange={(e) => update('b', e.target.value)} placeholder="e.g. 3.8" />
            </label>
            <label>
              <span>Dimension C ({form.unit})</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.c} onChange={(e) => update('c', e.target.value)} placeholder="e.g. 3.2" />
            </label>
            <label>
              <span>Shape factor</span>
              <select value={form.factor} onChange={(e) => update('factor', e.target.value as FactorKey)}>
                {factors.map((entry) => (
                  <option key={entry.key} value={entry.key}>{entry.name}</option>
                ))}
              </select>
            </label>
            {form.factor === 'ellipsoid' ? (
              <label>
                <span>Serum PSA (ng/mL, optional)</span>
                <input type="number" step="0.1" min="0" inputMode="decimal" value={form.psa} onChange={(e) => update('psa', e.target.value)} placeholder="e.g. 6.0" />
              </label>
            ) : null}
          </div>
          <p className="source-note">{activeFactor.use}</p>
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
                  <p className="metric-label">Volume</p>
                  <p className="metric-value">{formatVolume(result.volume)} mL</p>
                </div>
                <div>
                  <p className="metric-label">PSA density</p>
                  <p className="metric-value">{result.psaDensity !== null ? result.psaDensity.toFixed(2) : '—'}</p>
                </div>
              </div>
              <p className="result-summary">{result.summary}</p>
              <CopyBlock label="Impression" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Enter three orthogonal measurements to estimate volume.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Shape factors</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Value</th>
                <th>Typical use</th>
              </tr>
            </thead>
            <tbody>
              {factors.map((entry) => (
                <tr key={entry.key}>
                  <td className="vessel-name">{entry.short}</td>
                  <td>{entry.value}</td>
                  <td>{entry.use}</td>
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
