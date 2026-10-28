import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { ScanFigures } from '../components/ScanFigures'
import { renalMassScans } from '../data/scans/renalMass'
import { classify, initialBosniakForm } from '../logic/bosniak'
import type { BosniakForm } from '../logic/bosniak'

type Form = BosniakForm
const initialForm: Form = initialBosniakForm

const wallThicknessOptions: { value: Form['wallThickness']; label: string }[] = [
  { value: 'none', label: 'No visible wall' },
  { value: 'thin', label: 'Thin (≤2 mm)' },
  { value: 'minimallyThick', label: 'Minimally thickened (3 mm)' },
  { value: 'thick', label: 'Thick (≥4 mm)' },
]

const septaCountOptions: { value: Form['septaCount']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'few', label: 'Few (1-3)' },
  { value: 'many', label: 'Many (≥4)' },
]

const septaThicknessOptions: { value: Form['septaThickness']; label: string }[] = [
  { value: 'thin', label: 'Thin (≤2 mm)' },
  { value: 'minimallyThick', label: 'Minimally thickened (3 mm)' },
  { value: 'thick', label: 'Thick (≥4 mm)' },
]

const enhancingNoduleOptions: { value: Form['enhancingNodule']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'irregularity', label: 'Irregularity only (obtuse convex protrusion ≤3 mm)' },
  { value: 'nodule', label: 'Enhancing nodule' },
]

export function BosniakPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])
  const tone =
    result.category.includes('I ') || result.category === 'Bosniak I' || result.category === 'Bosniak II'
      ? 'good'
      : result.category === 'Bosniak III' || result.category === 'Bosniak IV'
        ? 'warn'
        : 'accent'

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
          <h2>Bosniak 2019 calculator</h2>
          <span className="calc-tag">Bosniak 2019</span>
        </div>
        <p>Cystic renal mass helper with category assignment, management text, and copyable impression output.</p>
        <p className="source-note">Source: <a href="https://pubs.rsna.org/doi/full/10.1148/radiol.2019182646" target="_blank" rel="noopener noreferrer">Silverman et al., "Bosniak Classification of Cystic Renal Masses, Version 2019," Radiology 2019</a>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Morphology</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.cysticRenalMass} onChange={(e) => update('cysticRenalMass', e.target.checked)} />
              Lesion is a cystic renal mass rather than a predominantly solid mass
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.enhancingPresent} onChange={(e) => update('enhancingPresent', e.target.checked)} />
              Enhancement is present
            </label>

            <ChoiceGroup label="Wall thickness" layout="stack" value={form.wallThickness} options={wallThicknessOptions} onChange={(value) => update('wallThickness', value)} />

            <label className="check-row">
              <input type="checkbox" checked={form.wallIrregularity} onChange={(e) => update('wallIrregularity', e.target.checked)} />
              Enhancing wall or septal irregularity is present
            </label>

            <ChoiceGroup label="Septa count" layout="stack" value={form.septaCount} options={septaCountOptions} onChange={(value) => update('septaCount', value)} />

            <ChoiceGroup label="Septa thickness" layout="stack" value={form.septaThickness} options={septaThicknessOptions} onChange={(value) => update('septaThickness', value)} />

            <label className="check-row">
              <input type="checkbox" checked={form.calcificationOnly} onChange={(e) => update('calcificationOnly', e.target.checked)} />
              Calcification without other suspicious enhancing features
            </label>

            <ChoiceGroup label="Enhancing convex protrusion" layout="stack" value={form.enhancingNodule} options={enhancingNoduleOptions} onChange={(value) => update('enhancingNodule', value)} />

            <label className="check-row">
              <input type="checkbox" checked={form.t1HyperintenseUnenhanced} onChange={(e) => update('t1HyperintenseUnenhanced', e.target.checked)} />
              Heterogeneously hyperintense on unenhanced fat-suppressed T1 MRI
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${tone}`}>{result.category}</p>
            </div>
            <p className="result-strip-summary">{result.reason}</p>
          </div>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Recommendation" text={result.management} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[renalMassScans.bosniak1, renalMassScans.bosniak2, renalMassScans.bosniak2f, renalMassScans.bosniak4]} />
      </section>
    </div>
  )
}
