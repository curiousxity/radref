import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type RegimenKey = 'elective-prednisone' | 'elective-methylprednisolone' | 'accelerated-methylprednisolone' | 'accelerated-hydrocortisone'

type Regimen = {
  name: string
  kind: 'elective' | 'accelerated'
  steroidLabel: string
  doseHoursBefore?: number[]
}

const regimens: Record<RegimenKey, Regimen> = {
  'elective-prednisone': {
    name: 'Elective oral: prednisone',
    kind: 'elective',
    steroidLabel: 'Prednisone 50 mg by mouth',
    doseHoursBefore: [13, 7, 1],
  },
  'elective-methylprednisolone': {
    name: 'Elective oral: methylprednisolone',
    kind: 'elective',
    steroidLabel: 'Methylprednisolone 32 mg by mouth',
    doseHoursBefore: [12, 2],
  },
  'accelerated-methylprednisolone': {
    name: 'Accelerated IV: methylprednisolone',
    kind: 'accelerated',
    steroidLabel: 'Methylprednisolone 40 mg IV',
  },
  'accelerated-hydrocortisone': {
    name: 'Accelerated IV: hydrocortisone',
    kind: 'accelerated',
    steroidLabel: 'Hydrocortisone 200 mg IV',
  },
}

type Form = {
  regimen: RegimenKey
  includeDiphenhydramine: boolean
  contrastTime: string
  hoursUntilContrast: string
}

const initialForm: Form = {
  regimen: 'elective-prednisone',
  includeDiphenhydramine: true,
  contrastTime: '',
  hoursUntilContrast: '',
}

function formatDoseTime(contrastTime: string, hoursBefore: number): string | null {
  if (!contrastTime) return null
  const contrastDate = new Date(contrastTime)
  if (Number.isNaN(contrastDate.getTime())) return null
  const doseDate = new Date(contrastDate.getTime() - hoursBefore * 60 * 60 * 1000)
  return doseDate.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function buildPlan(form: Form) {
  const regimen = regimens[form.regimen]

  if (regimen.kind === 'elective') {
    const doseLines = (regimen.doseHoursBefore ?? []).map((h) => {
      const t = formatDoseTime(form.contrastTime, h)
      return t
        ? `${regimen.steroidLabel} at ${t} (${h} hour${h === 1 ? '' : 's'} before contrast).`
        : `${regimen.steroidLabel} ${h} hour${h === 1 ? '' : 's'} before contrast administration.`
    })
    const diphenLine = form.includeDiphenhydramine ? 'Diphenhydramine 50 mg by mouth, IV, or IM 1 hour before contrast administration.' : ''
    const plan = [`${regimen.name} premedication:`, ...doseLines, diphenLine].filter(Boolean).join(' ')
    return { plan, badgeLabel: regimen.name, tone: 'accent' as const }
  }

  const hours = form.hoursUntilContrast === '' ? NaN : parseFloat(form.hoursUntilContrast)
  const doseCount = !Number.isNaN(hours) ? Math.max(1, Math.floor(hours / 4) + 1) : null
  const doseLine = `${regimen.steroidLabel} immediately, then every 4 hours until contrast administration${
    doseCount ? ` (approximately ${doseCount} total steroid dose${doseCount === 1 ? '' : 's'} over ${hours} hour${hours === 1 ? '' : 's'})` : ''
  }.`
  const diphenLine = 'Diphenhydramine 50 mg IV 1 hour before contrast administration.'
  const insufficient = !Number.isNaN(hours) && hours < 4
  const warning = insufficient ? 'Regimens shorter than approximately 4 to 5 hours have not been shown to be effective.' : ''
  const plan = [`${regimen.name} premedication:`, doseLine, diphenLine, warning].filter(Boolean).join(' ')
  return { plan, badgeLabel: insufficient ? 'Time may be insufficient' : regimen.name, tone: (insufficient ? 'warn' : 'accent') as 'warn' | 'accent' }
}

export function ContrastPremedicationPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => buildPlan(form), [form])
  const regimen = regimens[form.regimen]

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
          <p className="eyebrow">Contrast safety</p>
          <h2>Contrast premedication protocols</h2>
          <p>Elective oral and accelerated IV corticosteroid/antihistamine premedication regimens for patients at increased risk of recurrent contrast reactions, with copyable plan text.</p>
          <p className="source-note">
            Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual" target="_blank" rel="noopener noreferrer">ACR Manual on Contrast Media</a>, American College of Radiology. Premedication lowers but does not eliminate breakthrough reaction risk.
          </p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Regimen</h3>
          <div className="form-grid">
            <label>
              <span>Regimen</span>
              <select value={form.regimen} onChange={(e) => update('regimen', e.target.value as RegimenKey)}>
                <option value="elective-prednisone">Elective oral: prednisone</option>
                <option value="elective-methylprednisolone">Elective oral: methylprednisolone</option>
                <option value="accelerated-methylprednisolone">Accelerated IV: methylprednisolone</option>
                <option value="accelerated-hydrocortisone">Accelerated IV: hydrocortisone</option>
              </select>
            </label>

            {regimen.kind === 'elective' ? (
              <>
                <label>
                  <span>Planned contrast time (optional)</span>
                  <input type="datetime-local" value={form.contrastTime} onChange={(e) => update('contrastTime', e.target.value)} />
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={form.includeDiphenhydramine} onChange={(e) => update('includeDiphenhydramine', e.target.checked)} />
                  Include diphenhydramine 50 mg 1 hour before contrast (optional per ACR)
                </label>
              </>
            ) : (
              <label>
                <span>Hours until contrast (optional)</span>
                <input type="number" min="0" step="0.5" value={form.hoursUntilContrast} onChange={(e) => update('hoursUntilContrast', e.target.value)} />
              </label>
            )}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.badgeLabel} tone={result.tone} />
          </div>
          <CopyBlock label="Premedication plan" text={result.plan} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Typical indications</h3>
        <ul className="plain-list">
          <li>Prior moderate or severe immediate reaction to the same class of contrast agent is the main reason to consider premedication.</li>
          <li>Some institutions no longer routinely premedicate patients with only a prior mild immediate reaction and instead consider using a different contrast agent when feasible.</li>
          <li>Shellfish allergy or nonspecific "iodine allergy" alone is not an indication for contrast premedication.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Practical notes</h3>
        <ul className="plain-list">
          <li>If oral medication cannot be given, institutional protocols may substitute intravenous steroids based on the ACR approach.</li>
          <li>Premedication choice should be integrated with contrast substitution, urgency of the examination, and the severity and type of the prior reaction.</li>
          <li>Local policy may vary slightly in medication choice or exact timing, so the institutional protocol should be followed in parallel with the ACR manual.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Quick-reference summary</h3>
        <ul className="plain-list">
          <li><strong>Elective prednisone regimen:</strong> 50 mg PO at 13, 7, and 1 hours before contrast, plus optional diphenhydramine 50 mg 1 hour before.</li>
          <li><strong>Elective methylprednisolone regimen:</strong> 32 mg PO at 12 and 2 hours before contrast, plus optional diphenhydramine 50 mg 1 hour before.</li>
          <li><strong>Accelerated IV regimen:</strong> methylprednisolone 40 mg IV every 4 hours or hydrocortisone 200 mg IV every 4 hours until contrast, plus diphenhydramine 50 mg IV 1 hour before.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          <li>
            <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual" target="_blank" rel="noopener noreferrer">
              ACR Manual on Contrast Media. American College of Radiology.
            </a>
          </li>
        </ol>
      </section>
    </div>
  )
}
