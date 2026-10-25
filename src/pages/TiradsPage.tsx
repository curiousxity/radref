import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { calculateTirads, tiradsPoints } from '../logic/tirads'
import type { Composition, EchogenicFocus, Echogenicity, Margin, Shape, TiradsForm } from '../types/tirads'
import { pointsDetail, withPoints } from './tiradsOptions'

const initialForm: TiradsForm = {
  laterality: '', pole: '', sizeCm: '', composition: 'solid', echogenicity: 'hypoechoic', shape: 'widerThanTall', margin: 'smooth', echogenicFoci: [],
}

const compositionOptions = withPoints<Composition>(tiradsPoints.composition, [
  { value: 'cystic', label: 'Cystic or almost completely cystic' },
  { value: 'spongiform', label: 'Spongiform' },
  { value: 'mixed', label: 'Mixed cystic and solid' },
  { value: 'solid', label: 'Solid or almost completely solid' },
])

const echogenicityOptions: { value: Echogenicity; label: string }[] = [
  { value: 'anechoic', label: 'Anechoic' },
  { value: 'hyperechoic', label: 'Hyperechoic' },
  { value: 'isoechoic', label: 'Isoechoic' },
  { value: 'hypoechoic', label: 'Hypoechoic' },
  { value: 'veryHypoechoic', label: 'Very hypoechoic' },
]

const shapeOptions: { value: Shape; label: string }[] = [
  { value: 'widerThanTall', label: 'Wider-than-tall' },
  { value: 'tallerThanWide', label: 'Taller-than-wide' },
]

const marginOptions: { value: Margin; label: string }[] = [
  { value: 'smooth', label: 'Smooth' },
  { value: 'illDefined', label: 'Ill-defined' },
  { value: 'lobulated', label: 'Lobulated or irregular' },
  { value: 'extrathyroidal', label: 'Extrathyroidal extension' },
]

const focusOptions: { value: EchogenicFocus; label: string }[] = [
  { value: 'macrocalcification', label: 'Macrocalcifications' },
  { value: 'rimCalcification', label: 'Peripheral rim calcifications' },
  { value: 'punctate', label: 'Punctate echogenic foci' },
]

export function TiradsPage() {
  const [form, setForm] = useState<TiradsForm>(initialForm)
  const result = useMemo(() => calculateTirads(form), [form])
  const tone = result.category === 'TR5' || result.category === 'TR4' ? 'warn' : result.category === 'TR1' || result.category === 'TR2' ? 'good' : 'accent'
  function updateField<K extends keyof TiradsForm>(field: K, value: TiradsForm[K]) { setForm((current) => ({ ...current, [field]: value })) }
  function toggleFocus(focus: EchogenicFocus) { setForm((current) => ({ ...current, echogenicFoci: current.echogenicFoci.includes(focus) ? current.echogenicFoci.filter((item) => item !== focus) : [...current.echogenicFoci, focus] })) }
  function handleReset() { setForm(initialForm) }
  // A spongiform nodule scores 0 whatever else is selected (calculateTirads), so the other
  // features' points are hidden rather than shown as if they counted.
  const spongiform = form.composition === 'spongiform'
  const copyDisabledReason = result.sizeMissing ? 'Enter the maximum size before copying.' : undefined
  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>TI-RADS calculator</h2>
          <span className="calc-tag">ACR 2017</span>
        </div>
        <p>Enter the sonographic features to calculate the ACR TI-RADS category, then copy a nodule description and report-ready impression.</p>
        <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/TI-RADS" target="_blank" rel="noopener noreferrer">ACR TI-RADS white paper and ACR TI-RADS Atlas reference materials</a>.</p>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Features</h3>
          <div className="form-grid">
            <label><span>Laterality</span><select value={form.laterality} onChange={(event) => updateField('laterality', event.target.value as TiradsForm['laterality'])}><option value="">Optional</option><option value="right lobe">Right lobe</option><option value="left lobe">Left lobe</option><option value="isthmus">Isthmus</option></select></label>
            <label><span>Pole</span><select value={form.pole} onChange={(event) => updateField('pole', event.target.value as TiradsForm['pole'])}><option value="">Optional</option><option value="upper pole">Upper pole</option><option value="mid pole">Mid pole</option><option value="lower pole">Lower pole</option></select></label>
            <label><span>Maximum size (cm)</span><input type="number" inputMode="decimal" min="0" step="0.1" value={form.sizeCm} onChange={(event) => updateField('sizeCm', event.target.value)} placeholder="e.g. 1.4" /></label>
          </div>
          <ChoiceGroup label="Composition" layout="stack" value={form.composition} options={compositionOptions} onChange={(value) => updateField('composition', value)} />
          {spongiform ? <p className="choice-note">Spongiform: other features add no points (ACR TI-RADS).</p> : null}
          <ChoiceGroup label="Echogenicity" layout="stack" value={form.echogenicity} options={withPoints(tiradsPoints.echogenicity, echogenicityOptions, spongiform)} onChange={(value) => updateField('echogenicity', value)} />
          <ChoiceGroup label="Shape" layout="stack" value={form.shape} options={withPoints(tiradsPoints.shape, shapeOptions, spongiform)} onChange={(value) => updateField('shape', value)} />
          <ChoiceGroup label="Margin" layout="stack" value={form.margin} options={withPoints(tiradsPoints.margin, marginOptions, spongiform)} onChange={(value) => updateField('margin', value)} />
          <fieldset className="focus-group">
            <legend>Echogenic foci</legend>
            {focusOptions.map((focus) => {
              const detail = pointsDetail(tiradsPoints.focus[focus.value], spongiform)
              return (
                <label key={focus.value} className="check-row check-row--detail">
                  <input type="checkbox" checked={form.echogenicFoci.includes(focus.value)} onChange={() => toggleFocus(focus.value)} /> {focus.label}
                  {detail ? <span className="choice-option-detail">{detail}</span> : null}
                </label>
              )
            })}
          </fieldset>
        </article>
        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${tone}`}><span className="sr-only">Category </span>{result.category}</p>
              <p className="result-strip-meta"><span className="metric-label">Points</span> <span className="result-strip-points">{result.points}</span></p>
            </div>
            <p className="result-strip-summary">{result.recommendation}</p>
          </div>
          <CopyBlock label="Findings" text={result.description} disabledReason={copyDisabledReason} />
          <CopyBlock label="Impression" text={result.impression} disabledReason={copyDisabledReason} />
          {/* Until a size is entered the recommendation is a prompt to the user, not report text. */}
          {!result.sizeMissing && <CopyBlock label="Recommendation" text={result.recommendation} disabledReason={copyDisabledReason} />}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
