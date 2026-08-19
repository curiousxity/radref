import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Form = {
  psv: string
  edv: string
  mean: string
}

const initialForm: Form = {
  psv: '',
  edv: '',
  mean: '',
}

function toNum(value: string) {
  // Number('') is 0, which would make an untouched field read as a real
  // measurement of zero, so blank is rejected before parsing.
  if (value.trim() === '') return NaN
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

type Result = {
  category: string
  tone: 'good' | 'warn' | 'accent'
  ri: number | null
  pi: number | null
  sd: number | null
  summary: string
  impression: string
}

function calc(form: Form): Result | null {
  const psv = toNum(form.psv)
  const edv = toNum(form.edv)

  if (!Number.isFinite(psv) || !Number.isFinite(edv)) return null
  if (psv <= 0) return null
  if (edv > psv) {
    return {
      category: 'Check measurements',
      tone: 'warn',
      ri: null,
      pi: null,
      sd: null,
      summary: 'End-diastolic velocity should not exceed peak systolic velocity on the same waveform. Re-check the calliper placement and confirm both values come from the same sampled cycle.',
      impression: `Measured end-diastolic velocity of ${edv} cm/s exceeds the peak systolic velocity of ${psv} cm/s. Re-check the Doppler measurements before calculating indices.`,
    }
  }

  const ri = (psv - edv) / psv
  // S/D is only meaningful with forward diastolic flow; absent or reversed flow makes it undefined or negative.
  const sd = edv > 0 ? psv / edv : null

  const mean = toNum(form.mean)
  const pi = Number.isFinite(mean) && mean > 0 ? (psv - edv) / mean : null

  const riText = ri.toFixed(2)
  const piSentence = pi !== null ? ` The pulsatility index is ${pi.toFixed(2)}.` : ''

  if (edv < 0) {
    return {
      category: 'Reversed diastolic flow',
      tone: 'warn',
      ri,
      pi,
      sd,
      summary: `Reversed end-diastolic flow gives a resistive index above 1.0 (here ${riText}). This is a marker of markedly raised downstream resistance and, in the right context, of a critically compromised organ.`,
      impression: `Doppler interrogation demonstrates a peak systolic velocity of ${psv} cm/s with reversed end-diastolic flow of ${Math.abs(edv)} cm/s, yielding a resistive index of ${riText}.${piSentence}`,
    }
  }

  if (edv === 0) {
    return {
      category: 'Absent diastolic flow',
      tone: 'warn',
      ri,
      pi,
      sd,
      summary: 'Absent end-diastolic flow gives a resistive index of 1.0 and indicates high downstream resistance. Interpret against the organ, the clinical setting, and any prior studies.',
      impression: `Doppler interrogation demonstrates a peak systolic velocity of ${psv} cm/s with absent end-diastolic flow, yielding a resistive index of 1.00.${piSentence}`,
    }
  }

  const category = ri >= 0.8 ? 'Markedly elevated RI' : ri >= 0.7 ? 'Elevated RI' : 'RI within usual adult range'
  const tone = ri >= 0.8 ? 'warn' : ri >= 0.7 ? 'accent' : 'good'

  return {
    category,
    tone,
    ri,
    pi,
    sd,
    summary: 'Resistive index thresholds are organ-specific and context-specific. In adult native and transplant kidneys an RI below 0.70 is generally taken as normal, 0.70 or above as elevated, and 0.80 or above as markedly elevated.',
    impression: `Doppler interrogation demonstrates a peak systolic velocity of ${psv} cm/s and an end-diastolic velocity of ${edv} cm/s, yielding a resistive index of ${riText}.${piSentence}`,
  }
}

const formulas = [
  { name: 'Resistive index (RI)', formula: '(PSV - EDV) / PSV', notes: 'Also called the Pourcelot index. Angle-independent, since it is a ratio of velocities.' },
  { name: 'Pulsatility index (PI)', formula: '(PSV - EDV) / time-averaged mean velocity', notes: 'Remains usable when diastolic flow is absent or reversed, where RI saturates at or above 1.0.' },
  { name: 'Systolic/diastolic ratio (S/D)', formula: 'PSV / EDV', notes: 'Undefined when end-diastolic flow is absent.' },
]

const riReference = [
  { site: 'Adult kidney, native or transplant', value: 'RI < 0.70', notes: 'RI at or above 0.70 is elevated; 0.80 or above is markedly elevated. Nonspecific as to cause.' },
  { site: 'Infant kidney', value: 'RI up to about 0.85', notes: 'Normal RI is higher in the first year of life and falls with age towards adult values.' },
  { site: 'Hepatic artery, post-transplant', value: 'RI about 0.55 to 0.80', notes: 'A low RI with a tardus parvus waveform raises the question of hepatic artery stenosis.' },
  { site: 'Testis, adult', value: 'RI < 0.60', notes: 'Absent or reversed diastolic flow in the symptomatic testis is concerning for torsion.' },
]

const caveats = [
  'Resistive index is sensitive but not specific. It reflects downstream resistance rather than any single disease process.',
  'RI is affected by heart rate, blood pressure, arterial compliance, and vascular age, so compare like with like and prefer serial values on the same patient.',
  'External compression raises RI. Obstruction, perinephric collections, and abdominal compartment pressure all shift the value.',
  'RI and PI are ratios and therefore angle-independent, but the absolute velocities they are built from are not. Correct the angle if you also report velocities.',
  'Sample several consecutive uniform waveforms and average, rather than grading from a single beat.',
]

const references: { label: string; href?: string }[] = [
  { label: 'Resistive index, Radiopaedia', href: 'https://radiopaedia.org/articles/resistive-index' },
  { label: 'Pulsatility index, Radiopaedia', href: 'https://radiopaedia.org/articles/pulsatility-index' },
  { label: 'Renal transplant ultrasound, Radiopaedia', href: 'https://radiopaedia.org/articles/renal-transplant-ultrasound' },
  { label: 'Tardus parvus waveform, Radiopaedia', href: 'https://radiopaedia.org/articles/tardus-parvus-waveform' },
]

export function DopplerIndicesPage() {
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
          <h2>Doppler indices</h2>
          <p>Calculate resistive index, pulsatility index, and systolic/diastolic ratio from a spectral Doppler waveform.</p>
          <p className="source-note">Source: <a href="https://radiopaedia.org/articles/resistive-index" target="_blank" rel="noopener noreferrer">Resistive index, Radiopaedia</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Velocities (cm/s)</h3>
          <div className="form-grid">
            <label>
              <span>Peak systolic velocity (PSV)</span>
              <input type="number" step="1" inputMode="decimal" value={form.psv} onChange={(e) => update('psv', e.target.value)} placeholder="e.g. 45" />
            </label>
            <label>
              <span>End-diastolic velocity (EDV)</span>
              <input type="number" step="1" inputMode="decimal" value={form.edv} onChange={(e) => update('edv', e.target.value)} placeholder="e.g. 12" />
            </label>
            <label>
              <span>Time-averaged mean velocity (optional)</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.mean} onChange={(e) => update('mean', e.target.value)} placeholder="e.g. 22" />
            </label>
          </div>
          <p className="source-note">Enter a negative end-diastolic velocity for reversed diastolic flow. The mean velocity is needed only for the pulsatility index.</p>
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
                  <p className="metric-label">RI</p>
                  <p className="metric-value">{result.ri !== null ? result.ri.toFixed(2) : '—'}</p>
                </div>
                <div>
                  <p className="metric-label">PI</p>
                  <p className="metric-value">{result.pi !== null ? result.pi.toFixed(2) : '—'}</p>
                </div>
                <div>
                  <p className="metric-label">S/D</p>
                  <p className="metric-value">{result.sd !== null ? result.sd.toFixed(2) : '—'}</p>
                </div>
              </div>
              <p className="result-summary">{result.summary}</p>
              <CopyBlock label="Impression" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Enter peak systolic and end-diastolic velocity to calculate the indices.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Formulas</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Formula</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {formulas.map((row) => (
                <tr key={row.name}>
                  <td className="vessel-name">{row.name}</td>
                  <td>{row.formula}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Commonly cited resistive index values</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Site</th>
                <th>Usual range</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {riReference.map((row) => (
                <tr key={row.site}>
                  <td className="vessel-name">{row.site}</td>
                  <td>{row.value}</td>
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
