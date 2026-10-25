import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { classifyPancreaticCyst } from '../logic/pancreaticCyst'
import type { AgeBand, AlternativeDiagnosis, DuctCommunication, PancreaticCystForm as Form } from '../logic/pancreaticCyst'

const initialForm: Form = {
  sizeCm: '',
  ageBand: '65-79',
  ductCommunication: 'indeterminate',
  growth: false,
  worrisomeFeatures: false,
  highRiskStigmata: false,
  alternativeDiagnosis: 'none',
  symptomsOrPancreatitis: false,
}

const ageBandOptions: { value: AgeBand; label: string }[] = [
  { value: '<65', label: '<65' },
  { value: '65-79', label: '65-79' },
  { value: '80+', label: '80+' },
]

const ductCommunicationOptions: { value: DuctCommunication; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'indeterminate', label: 'Indeterminate' },
]

const alternativeDiagnosisOptions: { value: AlternativeDiagnosis; label: string }[] = [
  { value: 'none', label: 'None / presumed mucinous' },
  { value: 'serous', label: 'Serous cystadenoma' },
  { value: 'pseudocyst', label: 'Pseudocyst' },
  { value: 'otherBenign', label: 'Other benign diagnosis' },
]

export function PancreaticCystPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classifyPancreaticCyst(form), [form])
  const tone =
    result.category.includes('High risk')
      ? 'warn'
      : result.category.includes('Worrisome') || result.category.includes('Large')
        ? 'accent'
        : 'good'

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
          <h2>Pancreatic cyst management</h2>
          <span className="calc-tag">ACR incidental pancreatic cysts</span>
        </div>
        <p>Dedicated incidental pancreatic cyst helper with surveillance logic, EUS/FNA escalation, and copyable impression text.</p>
        <p className="source-note">Source: <a href="https://pubmed.ncbi.nlm.nih.gov/28533111/" target="_blank" rel="noopener noreferrer">Megibow et al., "Management of Incidental Pancreatic Cysts: A White Paper of the ACR Incidental Findings Committee," JACR 2017</a>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <label>
              <span>Cyst size (cm)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.sizeCm} onChange={(e) => update('sizeCm', e.target.value)} placeholder="e.g. 1.8" />
            </label>

            <ChoiceGroup label="Age band" layout="row" value={form.ageBand} options={ageBandOptions} onChange={(value) => update('ageBand', value)} />

            <ChoiceGroup label="Main pancreatic duct communication" layout="row" value={form.ductCommunication} options={ductCommunicationOptions} onChange={(value) => update('ductCommunication', value)} />

            <ChoiceGroup label="Alternative diagnosis" layout="stack" value={form.alternativeDiagnosis} options={alternativeDiagnosisOptions} onChange={(value) => update('alternativeDiagnosis', value)} />

            <label className="check-row">
              <input type="checkbox" checked={form.growth} onChange={(e) => update('growth', e.target.checked)} />
              Interval growth
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.worrisomeFeatures} onChange={(e) => update('worrisomeFeatures', e.target.checked)} />
              Worrisome features
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.highRiskStigmata} onChange={(e) => update('highRiskStigmata', e.target.checked)} />
              High-risk stigmata
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.symptomsOrPancreatitis} onChange={(e) => update('symptomsOrPancreatitis', e.target.checked)} />
              Symptoms or pancreatitis related to the cyst
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value result-strip-value--phrase tone-${tone}`}>{result.category}</p>
            </div>
            <p className="result-strip-summary">{result.reason}</p>
          </div>
          {result.impression && <CopyBlock label="Impression" text={result.impression} />}
          {result.management && <CopyBlock label="Recommendation" text={result.management} />}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
