import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { classify } from '../logic/pirads'
import type { PiradsForm as Form, Score, Zone } from '../logic/pirads'

const initialForm: Form = {
  zone: 'peripheral',
  laterality: 'left',
  location: 'posterior',
  dwiScore: 3,
  t2Score: 3,
  dcePositive: false,
  sizeCm: '',
  epeOrInvasive: false,
}

export function PiRadsPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])

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
          <p className="eyebrow">Prostate</p>
          <h2>PI-RADS v2.1</h2>
          <p>Zonal PI-RADS v2.1 assessment category calculator for a single suspicious lesion on treatment-naive multiparametric prostate MRI, with copyable impression text.</p>
          <p className="source-note">
            Source: <a href="https://pubmed.ncbi.nlm.nih.gov/30898406/" target="_blank" rel="noopener noreferrer">Turkbey et al., "Prostate Imaging Reporting and Data System Version 2.1: 2019 Update of Prostate Imaging Reporting and Data System Version 2," Eur Urol 2019</a>.
          </p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <label>
              <span>Zone</span>
              <select value={form.zone} onChange={(e) => update('zone', e.target.value as Zone)}>
                <option value="peripheral">Peripheral zone</option>
                <option value="transition">Transition zone</option>
              </select>
            </label>

            <label>
              <span>Laterality</span>
              <select value={form.laterality} onChange={(e) => update('laterality', e.target.value as Form['laterality'])}>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="bilateral">Bilateral</option>
                <option value="midline">Midline</option>
              </select>
            </label>

            <label>
              <span>Location description</span>
              <input type="text" placeholder="e.g. posterior, anterior, apex" value={form.location} onChange={(e) => update('location', e.target.value)} />
            </label>

            <label>
              <span>Lesion size (cm, largest dimension)</span>
              <input type="number" min="0" step="0.1" value={form.sizeCm} onChange={(e) => update('sizeCm', e.target.value)} />
            </label>

            {form.zone === 'transition' && (
              <label>
                <span>T2-weighted score</span>
                <select value={form.t2Score} onChange={(e) => update('t2Score', Number(e.target.value) as Score)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>
            )}

            <label>
              <span>DWI score</span>
              <select value={form.dwiScore} onChange={(e) => update('dwiScore', Number(e.target.value) as Score)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </label>

            {form.zone === 'peripheral' && form.dwiScore === 3 && (
              <label className="check-row">
                <input type="checkbox" checked={form.dcePositive} onChange={(e) => update('dcePositive', e.target.checked)} />
                DCE positive (focal, earlier than or contemporaneous with adjacent normal tissue)
              </label>
            )}

            <label className="check-row">
              <input type="checkbox" checked={form.epeOrInvasive} onChange={(e) => update('epeOrInvasive', e.target.checked)} />
              Definite extraprostatic extension or invasive behavior
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={`PI-RADS ${result.category}`} tone={result.tone} />
          </div>
          <p className="result-summary">{result.summary}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Assessment categories</h3>
        <ul className="plain-list">
          <li><strong>PI-RADS 1:</strong> Very low likelihood of clinically significant cancer.</li>
          <li><strong>PI-RADS 2:</strong> Low likelihood of clinically significant cancer.</li>
          <li><strong>PI-RADS 3:</strong> Intermediate or equivocal likelihood of clinically significant cancer.</li>
          <li><strong>PI-RADS 4:</strong> High likelihood of clinically significant cancer.</li>
          <li><strong>PI-RADS 5:</strong> Very high likelihood of clinically significant cancer.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Dominant sequences</h3>
        <ul className="plain-list">
          <li><strong>Peripheral zone:</strong> DWI is the dominant sequence.</li>
          <li><strong>Transition zone:</strong> T2-weighted imaging is the dominant sequence.</li>
          <li><strong>DCE:</strong> Recorded as positive or negative and mainly used to modify selected peripheral-zone lesions.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Reporting points</h3>
        <ul className="plain-list">
          <li>Assign each suspicious lesion to a zonal location on the sector map.</li>
          <li>Identify the index lesion and report up to four suspicious lesions.</li>
          <li>Report the largest dimension of a suspicious lesion, typically on axial imaging unless another plane better shows maximal size.</li>
          <li>State the final PI-RADS category, lesion zone, and lesion size in the impression.</li>
          <li>PI-RADS reflects probability, not pathologic diagnosis by itself.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/30898406/" target="_blank" rel="noopener noreferrer">
              Turkbey B, Rosenkrantz AB, Haider MA, et al. Prostate Imaging Reporting and Data System Version 2.1: 2019 Update of Prostate Imaging Reporting and Data System Version 2. Eur Urol. 2019;76(3):340-351.
            </a>
          </li>
        </ol>
      </section>
    </div>
  )
}
