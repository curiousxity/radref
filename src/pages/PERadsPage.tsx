import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type ProximalLocation = 'none' | 'subsegmental' | 'segmental' | 'lobar' | 'central' | 'nondiagnostic'

type Form = {
  location: ProximalLocation
  bilateral: boolean
  saddle: boolean
  rvEnlargement: boolean
  thrombusInTransit: boolean
  pulmonaryInfarct: boolean
  limitedStudy: boolean
  nonPECause: boolean
  chronicFeatures: boolean
}

const initialForm: Form = {
  location: 'none',
  bilateral: false,
  saddle: false,
  rvEnlargement: false,
  thrombusInTransit: false,
  pulmonaryInfarct: false,
  limitedStudy: false,
  nonPECause: false,
  chronicFeatures: false,
}

function classify(form: Form) {
  if (form.location === 'nondiagnostic') {
    return {
      peRads: 'PE-RADS N',
      tone: 'warn' as const,
      summary: 'Central pulmonary arteries cannot be confidently evaluated, so acute pulmonary embolism at the main or lobar level cannot be excluded.',
      modifiers: [] as string[],
      impression:
        'Nondiagnostic examination for acute pulmonary embolism; acute PE at the main or lobar level cannot be excluded. Correlate clinically and consider repeat or alternative imaging as appropriate.',
    }
  }

  const base =
    form.location === 'none'
      ? { code: 'PE-RADS 0', label: 'No acute pulmonary embolism identified.' }
      : form.location === 'subsegmental'
        ? { code: 'PE-RADS 1', label: 'Most proximal embolus is subsegmental.' }
        : form.location === 'segmental'
          ? { code: 'PE-RADS 2', label: 'Most proximal embolus is segmental.' }
          : form.location === 'lobar'
            ? { code: 'PE-RADS 3', label: 'Most proximal embolus is lobar or interlobar.' }
            : { code: 'PE-RADS 4', label: 'Most proximal embolus is central, involving the main right or left pulmonary artery.' }

  const modifiers: string[] = []
  // "L" (Limited) is defined specifically as the "0L" combination: peripheral vessels not
  // assessable but central arteries confidently clear. It isn't a general-purpose modifier
  // for categories 1-4, so it's only surfaced alongside PE-RADS 0.
  if (form.limitedStudy && form.location === 'none') modifiers.push('L')
  if (form.rvEnlargement) modifiers.push('RV+')
  if (form.thrombusInTransit) modifiers.push('T+')
  if (form.nonPECause) modifiers.push('E')

  const detailBits: string[] = []
  if (form.location !== 'none') {
    if (form.bilateral) detailBits.push('bilateral involvement')
    if (form.saddle) detailBits.push('saddle component')
    if (form.pulmonaryInfarct) detailBits.push('associated pulmonary infarct')
    if (form.chronicFeatures) detailBits.push('chronic thromboembolic features also noted')
  }

  const suffix = modifiers.length ? ` (${modifiers.join(', ')})` : ''

  const management =
    base.code === 'PE-RADS 0'
      ? 'No acute pulmonary embolism identified. Consider alternative diagnosis.'
      : base.code === 'PE-RADS 1' || base.code === 'PE-RADS 2'
        ? 'Acute pulmonary embolism present. Correlate with symptoms, bleeding risk, and VTE risk factors.'
        : 'Acute pulmonary embolism present. Correlate with PE risk stratification and right-heart findings for management escalation.'

  const impression =
    base.code === 'PE-RADS 0'
      ? `PE-RADS 0${suffix}: no acute pulmonary embolism identified.${form.nonPECause ? ' Pulmonary arterial abnormality is attributed to a non-PE cause (exception).' : ''}`
      : `${base.code}${suffix}: acute pulmonary embolism present, with most proximal clot at the ${
          form.location === 'subsegmental'
            ? 'subsegmental'
            : form.location === 'segmental'
              ? 'segmental'
              : form.location === 'lobar'
                ? 'lobar/interlobar'
                : 'central'
        } level${detailBits.length ? `; ${detailBits.join(', ')}` : ''}.${form.rvEnlargement ? ' Right ventricular enlargement is present (RV/LV diameter ratio 1.0 or greater).' : ''}${form.thrombusInTransit ? ' Definitive thrombus is present in the right atrium and/or right ventricle.' : ''}`

  return {
    peRads: `${base.code}${suffix}`,
    tone: base.code === 'PE-RADS 0' ? ('good' as const) : base.code === 'PE-RADS 1' || base.code === 'PE-RADS 2' ? ('accent' as const) : ('warn' as const),
    summary: `${base.label} ${management}`,
    modifiers,
    impression,
  }
}

export function PERadsPage() {
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
          <p className="eyebrow">Pulmonary embolism</p>
          <h2>PE-RADS v2026</h2>
          <p>Structured reporting helper for acute pulmonary embolism using a 0-4 hierarchical scale based on most proximal clot location, plus right-heart and study-quality modifiers.</p>
          <p className="source-note">Source: <a href="https://pubs.rsna.org/doi/10.1148/radiol.252721" target="_blank" rel="noopener noreferrer">Koweek et al., "Pulmonary Embolism Reporting and Data System (PE-RADS) v2026 for the Diagnosis of Acute Pulmonary Embolism on CT and MR Angiography," Radiology 2026</a>. PE-RADS was published in July 2026 — this page will be revisited as the framework sees wider adoption.</p>
        </div>
        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <label>
              <span>Most proximal clot location</span>
              <select value={form.location} onChange={(e) => update('location', e.target.value as ProximalLocation)}>
                <option value="none">None</option>
                <option value="subsegmental">Subsegmental</option>
                <option value="segmental">Segmental</option>
                <option value="lobar">Lobar / interlobar</option>
                <option value="central">Central (main / right / left PA)</option>
                <option value="nondiagnostic">Nondiagnostic (central arteries not assessable)</option>
              </select>
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.bilateral} onChange={(e) => update('bilateral', e.target.checked)} />
              Bilateral emboli
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.saddle} onChange={(e) => update('saddle', e.target.checked)} />
              Saddle component
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.rvEnlargement} onChange={(e) => update('rvEnlargement', e.target.checked)} />
              Right ventricular enlargement, RV/LV diameter ratio ≥1.0 (RV+)
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.thrombusInTransit} onChange={(e) => update('thrombusInTransit', e.target.checked)} />
              Definitive thrombus in right atrium/ventricle (T+)
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.pulmonaryInfarct} onChange={(e) => update('pulmonaryInfarct', e.target.checked)} />
              Pulmonary infarct present
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.limitedStudy} onChange={(e) => update('limitedStudy', e.target.checked)} />
              Limited study: peripheral vessels not assessable, central arteries confidently clear (0L)
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.nonPECause} onChange={(e) => update('nonPECause', e.target.checked)} />
              Non-PE cause of pulmonary arterial filling defect, e.g. chronic thromboembolism, tumor, or cement/air embolus (E)
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.chronicFeatures} onChange={(e) => update('chronicFeatures', e.target.checked)} />
              Chronic thromboembolic features also present
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.peRads} tone={result.tone} />
          </div>

          <p className="result-summary">{result.summary}</p>
          <CopyBlock label="Impression" text={result.impression} />
          {result.modifiers.length > 0 && <p className="copy-status">Applied modifiers: {result.modifiers.join(', ')}</p>}
        </article>
      </section>
    </div>
  )
}
