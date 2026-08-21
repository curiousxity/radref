import { useMemo, useState } from 'react'
import { CopyBlock } from '../components/CopyBlock'
import { Definition } from '../components/Definition'
import { calculateLirads } from '../logic/lirads'
import type { LiradsForm } from '../types/lirads'

const initialForm: LiradsForm = {
  modality: 'ct',
  riskStatus: 'highRisk',
  studyQuality: 'diagnostic',
  sizeCm: '',
  aphe: false,
  washout: false,
  capsule: false,
  thresholdGrowth: false,
  tumorInVein: 'no',
  malignantNonHcc: 'no',
}

export function LiradsPage() {
  const [form, setForm] = useState<LiradsForm>(initialForm)
  const result = useMemo(() => calculateLirads(form), [form])

  function updateField<K extends keyof LiradsForm>(field: K, value: LiradsForm[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">LI-RADS CT/MRI</p>
          <h2>LI-RADS calculator</h2>
          <p>Enter the major CT/MRI features to calculate a LI-RADS category and copy a report-ready impression.</p>
          <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/LI-RADS" target="_blank" rel="noopener noreferrer">ACR LI-RADS resources, including the LI-RADS v2018 CT/MRI diagnostic algorithm</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Features</h3>
          <div className="form-grid">
            <label>
              <span>Modality</span>
              <select value={form.modality} onChange={(e) => updateField('modality', e.target.value as LiradsForm['modality'])}>
                <option value="ct">CT</option>
                <option value="mri">MRI</option>
              </select>
            </label>
            <label>
              <span>Clinical setting</span>
              <select value={form.riskStatus} onChange={(e) => updateField('riskStatus', e.target.value as LiradsForm['riskStatus'])}>
                <option value="highRisk">High-risk patient</option>
                <option value="notApplicable">Not applicable</option>
              </select>
            </label>
            <label>
              <span>Study quality</span>
              <select value={form.studyQuality} onChange={(e) => updateField('studyQuality', e.target.value as LiradsForm['studyQuality'])}>
                <option value="diagnostic">Diagnostic</option>
                <option value="nc">Noncategorizable</option>
              </select>
            </label>
            <label>
              <span>Observation size (cm)</span>
              <input type="number" min="0" step="0.1" inputMode="decimal" value={form.sizeCm} onChange={(e) => updateField('sizeCm', e.target.value)} placeholder="e.g. 2.1" />
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.aphe} onChange={(e) => updateField('aphe', e.target.checked)} />
              <span className="term">Non-rim APHE<Definition text="Arterial phase hyperenhancement that is not rim-like and not restricted to the tumor periphery." /></span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.washout} onChange={(e) => updateField('washout', e.target.checked)} />
              <span className="term">Nonperipheral washout<Definition text="Reduced enhancement relative to liver in the portal venous or delayed phase, located anywhere except the lesion periphery." /></span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.capsule} onChange={(e) => updateField('capsule', e.target.checked)} />
              <span className="term">Enhancing capsule<Definition text="A smooth, uniformly enhancing rim around the observation, typically most conspicuous on portal venous or delayed phase images and thicker than any rim seen precontrast or in arterial phase." /></span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.thresholdGrowth} onChange={(e) => updateField('thresholdGrowth', e.target.checked)} />
              <span className="term">Threshold growth<Definition text="An increase in the size of a mass by 50% or more over 6 months or less." /></span>
            </label>
            <label>
              <span className="term">Tumor in vein<Definition text="Tumor tissue extending into or filling a vein (typically portal or hepatic), the defining feature of LR-TIV." /></span>
              <select value={form.tumorInVein} onChange={(e) => updateField('tumorInVein', e.target.value as LiradsForm['tumorInVein'])}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <label>
              <span className="term">Malignant but not HCC-specific<Definition text="Imaging features favor malignancy but are not specific for hepatocellular carcinoma — the LR-M category." /></span>
              <select value={form.malignantNonHcc} onChange={(e) => updateField('malignantNonHcc', e.target.value as LiradsForm['malignantNonHcc'])}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head"><h3>Result</h3></div>
          <div className="result-panel">
            <div>
              <p className="metric-label">Category</p>
              <p className={`metric-value tone-${result.category.includes('5') || result.category.includes('M') || result.category.includes('TIV') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'}`}>{result.category}</p>
            </div>
            <div>
              <p className="metric-label">Features</p>
              <p className="metric-value">{result.features.length}</p>
            </div>
          </div>
          <p className="result-summary">{result.categoryReason}</p>
          <CopyBlock label="Features summary" text={result.features.length ? result.features.join(', ') : 'No major features selected.'} />
          <CopyBlock label="LI-RADS impression" text={result.impression} />
          <p className="copy-status">{result.recommendation}</p>
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
