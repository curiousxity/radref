import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Definition } from '../components/Definition'
import { ScanFigures } from '../components/ScanFigures'
import { liverLiradsScans } from '../data/scans/liverLirads'
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

const modalityOptions: { value: LiradsForm['modality']; label: string }[] = [
  { value: 'ct', label: 'CT' },
  { value: 'mri', label: 'MRI' },
]

const riskStatusOptions: { value: LiradsForm['riskStatus']; label: string }[] = [
  { value: 'highRisk', label: 'High-risk patient' },
  { value: 'notApplicable', label: 'Not applicable' },
]

const studyQualityOptions: { value: LiradsForm['studyQuality']; label: string }[] = [
  { value: 'diagnostic', label: 'Diagnostic' },
  { value: 'nc', label: 'Noncategorizable' },
]

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
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>LI-RADS calculator</h2>
          <span className="calc-tag">LI-RADS CT/MRI</span>
        </div>
        <p>Enter the major CT/MRI features to calculate a LI-RADS category and copy a report-ready impression.</p>
        <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/LI-RADS" target="_blank" rel="noopener noreferrer">ACR LI-RADS resources, including the LI-RADS v2018 CT/MRI diagnostic algorithm</a>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Features</h3>
          <div className="form-grid">
            <ChoiceGroup label="Modality" layout="row" value={form.modality} options={modalityOptions} onChange={(value) => updateField('modality', value)} />
            <ChoiceGroup label="Clinical setting" layout="row" value={form.riskStatus} options={riskStatusOptions} onChange={(value) => updateField('riskStatus', value)} />
            <ChoiceGroup label="Study quality" layout="row" value={form.studyQuality} options={studyQualityOptions} onChange={(value) => updateField('studyQuality', value)} />
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
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${result.category.includes('5') || result.category.includes('M') || result.category.includes('TIV') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'}`}><span className="sr-only">Category </span>{result.category}</p>
              <p className="result-strip-meta"><span className="metric-label">Features</span> <span className="result-strip-points">{result.features.length}</span></p>
            </div>
            <p className="result-strip-summary">{result.categoryReason}</p>
          </div>
          <CopyBlock label="Findings" text={result.features.length ? result.features.join(', ') : 'No major features selected.'} />
          <CopyBlock label="Impression" text={result.impression} />
          {/* Until a category is assigned the recommendation is a prompt to the user, not report text. */}
          {result.category === 'N/A' ? <p className="copy-status">{result.recommendation}</p> : <CopyBlock label="Recommendation" text={result.recommendation} />}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[liverLiradsScans.aphe, liverLiradsScans.washout, liverLiradsScans.capsule, liverLiradsScans.lrM, liverLiradsScans.tumourInVein]} />
      </section>
    </div>
  )
}
