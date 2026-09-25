import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { initialLungRadsForm as initialForm, lungRads as calc } from '../logic/lungrads'
import type { LungRadsForm as Form, NoduleType, PriorCategory, Timepoint } from '../logic/lungrads'

export function LungRadsPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => calc(form), [form])
  const showSolid = form.noduleType === 'partSolid'
  const showAirway = form.noduleType === 'airway'
  const showStepped = form.timepoint === 'stable' && (form.noduleType === 'solid' || form.noduleType === 'partSolid')

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
          <p className="eyebrow">Lung-RADS v2022</p>
          <h2>Lung-RADS calculator</h2>
          <p>Screening LDCT helper for dominant pulmonary nodules with category assignment, management text, and copyable impression output.</p>
          <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/Lung-RADS" target="_blank" rel="noopener noreferrer">ACR Lung-RADS v2022 update and companion assessment category summaries</a>.</p>
        </div>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Dominant finding</h3>
          <div className="form-grid">
            <label>
              <span>Nodule type</span>
              <select value={form.noduleType} onChange={(e) => update('noduleType', e.target.value as NoduleType)}>
                <option value="solid">Solid</option>
                <option value="partSolid">Part-solid</option>
                <option value="groundGlass">Ground-glass / nonsolid</option>
                <option value="airway">Airway nodule</option>
                <option value="infectious">Potentially infectious / inflammatory</option>
              </select>
            </label>

            <label>
              <span>Comparison status</span>
              <select value={form.timepoint} onChange={(e) => update('timepoint', e.target.value as Timepoint)}>
                <option value="baseline">Baseline</option>
                <option value="new">New</option>
                <option value="growing">Growing</option>
                <option value="stable">Stable / decreased</option>
              </select>
            </label>

            <label>
              <span>Mean diameter (mm)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={form.meanDiameterMm}
                onChange={(e) => update('meanDiameterMm', e.target.value)}
                placeholder="e.g. 7.4"
              />
            </label>

            {showStepped && (
              <label>
                <span>Followed as</span>
                <select value={form.priorCategory} onChange={(e) => update('priorCategory', e.target.value as PriorCategory)}>
                  <option value="none">Not on short-interval follow-up</option>
                  <option value="3">Category 3 (6-month LDCT)</option>
                  <option value="4A">Category 4A (3-month LDCT)</option>
                  <option value="4B">Category 4B (workup)</option>
                </select>
              </label>
            )}

            {showSolid && (
              <label>
                <span>Solid component (mm)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={form.solidComponentMm}
                  onChange={(e) => update('solidComponentMm', e.target.value)}
                  placeholder="e.g. 3.5"
                />
              </label>
            )}

            {showAirway && (
              <label>
                <span>Airway level</span>
                <select value={form.airwaySegment} onChange={(e) => update('airwaySegment', e.target.value as Form['airwaySegment'])}>
                  <option value="subsegmental">Subsegmental</option>
                  <option value="segmentalOrMoreProximal">Segmental or more proximal</option>
                </select>
              </label>
            )}

            {showAirway && form.airwaySegment === 'segmentalOrMoreProximal' && (
              <label className="check-row">
                <input type="checkbox" checked={form.airwayBenignFeatures} onChange={(e) => update('airwayBenignFeatures', e.target.checked)} />
                Segmental or more proximal: air within it, favoring secretions, with no soft-tissue nodule
              </label>
            )}

            <label className="check-row">
              <input type="checkbox" checked={form.inflammatoryPattern} onChange={(e) => update('inflammatoryPattern', e.target.checked)} />
              Infectious or inflammatory pattern
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.verySuspicious} onChange={(e) => update('verySuspicious', e.target.checked)} />
              Additional imaging features increase suspicion (4X)
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge
              label={result.category}
              tone={result.category.includes('4') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'}
            />
          </div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Management" text={result.management} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
