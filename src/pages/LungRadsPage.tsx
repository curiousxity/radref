import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { ScanFigures } from '../components/ScanFigures'
import { lungNodulesScans } from '../data/scans/lungNodules'
import { initialLungRadsForm as initialForm, lungRads as calc } from '../logic/lungrads'
import type { LungRadsForm as Form, NoduleType, PriorCategory, Timepoint } from '../logic/lungrads'

const noduleTypeOptions: { value: NoduleType; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'partSolid', label: 'Part-solid' },
  { value: 'groundGlass', label: 'Ground-glass / nonsolid' },
  { value: 'airway', label: 'Airway nodule' },
  { value: 'infectious', label: 'Potentially infectious / inflammatory' },
]

const timepointOptions: { value: Timepoint; label: string }[] = [
  { value: 'baseline', label: 'Baseline' },
  { value: 'new', label: 'New' },
  { value: 'growing', label: 'Growing' },
  { value: 'stable', label: 'Stable / decreased' },
]

const priorCategoryOptions: { value: PriorCategory; label: string }[] = [
  { value: 'none', label: 'Not on short-interval follow-up' },
  { value: '3', label: 'Category 3 (6-month LDCT)' },
  { value: '4A', label: 'Category 4A (3-month LDCT)' },
  { value: '4B', label: 'Category 4B (workup)' },
]

const airwaySegmentOptions: { value: Form['airwaySegment']; label: string }[] = [
  { value: 'subsegmental', label: 'Subsegmental' },
  { value: 'segmentalOrMoreProximal', label: 'Segmental or more proximal' },
]

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
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Lung-RADS calculator</h2>
          <span className="calc-tag">Lung-RADS v2022</span>
        </div>
        <p>Screening LDCT helper for dominant pulmonary nodules with category assignment, management text, and copyable impression output.</p>
        <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/Lung-RADS" target="_blank" rel="noopener noreferrer">ACR Lung-RADS v2022 update and companion assessment category summaries</a>.</p>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Dominant finding</h3>
          <div className="form-grid">
            <ChoiceGroup label="Nodule type" layout="stack" value={form.noduleType} options={noduleTypeOptions} onChange={(value) => update('noduleType', value)} />

            <ChoiceGroup label="Comparison status" layout="stack" value={form.timepoint} options={timepointOptions} onChange={(value) => update('timepoint', value)} />

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
              <ChoiceGroup label="Followed as" layout="stack" value={form.priorCategory} options={priorCategoryOptions} onChange={(value) => update('priorCategory', value)} />
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
              <ChoiceGroup label="Airway level" layout="stack" value={form.airwaySegment} options={airwaySegmentOptions} onChange={(value) => update('airwaySegment', value)} />
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
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${result.category.includes('4') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'}`}>{result.category}</p>
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
        <ScanFigures images={[lungNodulesScans.solid, lungNodulesScans.partSolid, lungNodulesScans.groundGlass, lungNodulesScans.perifissural, lungNodulesScans.popcorn, lungNodulesScans.cysticNodule, lungNodulesScans.endobronchial, lungNodulesScans.spiculated]} />
      </section>
    </div>
  )
}
