import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { ScanFigures } from '../components/ScanFigures'
import { piradsScans } from '../data/scans/pirads'
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

const zoneOptions: { value: Zone; label: string }[] = [
  { value: 'peripheral', label: 'Peripheral zone' },
  { value: 'transition', label: 'Transition zone' },
]

const lateralityOptions: { value: Form['laterality']; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'bilateral', label: 'Bilateral' },
  { value: 'midline', label: 'Midline' },
]

// Scores are numbers in the form. The buttons carry the same strings the <select> options
// submitted ("1" to "5"), turned back into numbers with Number() as before.
const scoreOptions: { value: string; label: string }[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

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
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>PI-RADS v2.1</h2>
          <span className="calc-tag">Prostate</span>
        </div>
        <p>Zonal PI-RADS v2.1 assessment category calculator for a single suspicious lesion on treatment-naive multiparametric prostate MRI, with copyable impression text.</p>
        <p className="source-note">
          Source: <a href="https://pubmed.ncbi.nlm.nih.gov/30898406/" target="_blank" rel="noopener noreferrer">Turkbey et al., "Prostate Imaging Reporting and Data System Version 2.1: 2019 Update of Prostate Imaging Reporting and Data System Version 2," Eur Urol 2019</a>.
        </p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <ChoiceGroup label="Zone" layout="row" value={form.zone} options={zoneOptions} onChange={(value) => update('zone', value)} />

            <ChoiceGroup label="Laterality" layout="row" value={form.laterality} options={lateralityOptions} onChange={(value) => update('laterality', value)} />

            <label>
              <span>Location description</span>
              <input type="text" placeholder="e.g. posterior, anterior, apex" value={form.location} onChange={(e) => update('location', e.target.value)} />
            </label>

            <label>
              <span>Lesion size (cm, largest dimension)</span>
              <input type="number" min="0" step="0.1" value={form.sizeCm} onChange={(e) => update('sizeCm', e.target.value)} />
            </label>

            {form.zone === 'transition' && (
              <ChoiceGroup label="T2-weighted score" layout="row" value={String(form.t2Score)} options={scoreOptions} onChange={(value) => update('t2Score', Number(value) as Score)} />
            )}

            <ChoiceGroup label="DWI score" layout="row" value={String(form.dwiScore)} options={scoreOptions} onChange={(value) => update('dwiScore', Number(value) as Score)} />

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
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${result.tone}`}>{`PI-RADS ${result.category}`}</p>
            </div>
            <p className="result-strip-summary">{result.summary}</p>
          </div>
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

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[piradsScans.pzT2, piradsScans.pzAdc, piradsScans.pzDce, piradsScans.tzErasedCharcoal, piradsScans.bphNodule, piradsScans.extraprostaticExtension]} />
      </section>
    </div>
  )
}
