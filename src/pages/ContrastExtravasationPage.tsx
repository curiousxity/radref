import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Finding = { id: string; label: string }

const concerningFindings: Finding[] = [
  { id: 'progressive', label: 'Progressive swelling or pain' },
  { id: 'perfusion', label: 'Decreased capillary refill or other evidence of altered tissue perfusion' },
  { id: 'sensation', label: 'Change in sensation, including numbness or paresthesias' },
  { id: 'rom', label: 'Worsening active or passive range of motion' },
  { id: 'skin', label: 'Skin blistering or ulceration' },
]

type Form = {
  checked: Record<string, boolean>
  estimatedVolumeMl: string
  notes: string
}

const initialForm: Form = {
  checked: {},
  estimatedVolumeMl: '',
  notes: '',
}

function classify(form: Form) {
  const checkedFindings = concerningFindings.filter((f) => form.checked[f.id])
  const urgent = checkedFindings.length > 0

  const badgeLabel = urgent ? 'Urgent surgical consultation indicated' : 'No concerning findings'
  const tone: 'good' | 'warn' = urgent ? 'warn' : 'good'

  const management = urgent
    ? `Immediate surgical consultation is recommended given: ${checkedFindings.map((f) => f.label.charAt(0).toLowerCase() + f.label.slice(1)).join('; ')}. Continue close monitoring, keep the extremity elevated, and do not discharge until reassessed.`
    : 'No concerning findings identified. Elevate the affected extremity and observe until initial symptoms improve or remain stable, without development of new concerning findings. Provide discharge instructions to seek urgent care for worsening pain or swelling, neurologic symptoms, decreased motion, blistering, ulceration, or other skin changes.'

  const volumeText = form.estimatedVolumeMl.trim() ? `Estimated extravasated volume approximately ${form.estimatedVolumeMl.trim()} mL. ` : ''
  const notesText = form.notes.trim() ? `${form.notes.trim()} ` : ''
  const findingsText = urgent
    ? `Concerning findings present on exam: ${checkedFindings.map((f) => f.label.charAt(0).toLowerCase() + f.label.slice(1)).join('; ')}. `
    : 'No concerning findings on exam (no progressive swelling/pain, no altered perfusion, no sensory change, no worsening range of motion, no blistering or ulceration). '

  const impression = `Contrast extravasation occurred. ${volumeText}${notesText}${findingsText}${
    urgent ? 'Urgent surgical consultation recommended.' : 'Managed conservatively with elevation and observation.'
  } Event documented in the medical record and imaging report; referring physician notified.`

  return { urgent, badgeLabel, tone, management, impression }
}

export function ContrastExtravasationPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])

  function toggleFinding(id: string, value: boolean) {
    setForm((current) => ({ ...current, checked: { ...current.checked, [id]: value } }))
  }

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
          <h2>Contrast extravasation management</h2>
          <p>Exam-based triage for contrast media extravasation injuries, with urgent surgical consultation flags and copyable documentation text.</p>
          <p className="source-note">
            Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual" target="_blank" rel="noopener noreferrer">ACR Manual on Contrast Media</a>, American College of Radiology. Management is driven by clinical assessment, not extravasated volume alone.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>Immediate management</h3>
        <ul className="plain-list">
          <li>Stop the contrast injection immediately.</li>
          <li>Perform a prompt focused examination of the affected extremity: swelling, pain, erythema, tenderness, sensation, range of motion, and tissue perfusion.</li>
          <li>Elevate the affected extremity above the level of the heart to reduce capillary hydrostatic pressure and promote resorption of extravasated fluid.</li>
          <li>Compresses may be used for comfort, although evidence for a clearly superior local treatment is limited.</li>
        </ul>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Exam findings</h3>
          <div className="form-grid">
            {concerningFindings.map((finding) => (
              <label key={finding.id} className="check-row">
                <input type="checkbox" checked={!!form.checked[finding.id]} onChange={(e) => toggleFinding(finding.id, e.target.checked)} />
                {finding.label}
              </label>
            ))}

            <label>
              <span>Estimated extravasated volume (mL)</span>
              <input type="number" min="0" step="1" value={form.estimatedVolumeMl} onChange={(e) => update('estimatedVolumeMl', e.target.value)} />
            </label>

            <label>
              <span>Additional exam notes</span>
              <input type="text" placeholder="e.g. mild erythema, no blistering" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.badgeLabel} tone={result.tone} />
          </div>
          <p className="result-summary">{result.management}</p>
          <CopyBlock label="Documentation / report text" text={result.impression} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>What to assess and document</h3>
        <ul className="plain-list">
          <li>Estimated extravasated volume.</li>
          <li>Degree of swelling and pain.</li>
          <li>Capillary refill or other signs of altered tissue perfusion.</li>
          <li>Sensation in the affected limb, including paresthesias or numbness.</li>
          <li>Active and passive motion of the fingers, wrist, or adjacent joints when relevant.</li>
          <li>Skin appearance, including blistering, ulceration, or progressive discoloration.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Treatments not routinely recommended</h3>
        <p className="result-summary">
          There is no clear evidence that aspiration of extravasated contrast, local corticosteroid injection, hyaluronidase injection, or incisional drainage improves
          routine extravasation injuries. Because of that, most cases are managed conservatively unless concerning clinical findings develop.
        </p>
      </section>

      <section className="info-card">
        <h3>Observation and discharge</h3>
        <p className="result-summary">
          Outpatients should remain under observation until initial symptoms have improved or at least remained stable without development of new concerning findings.
          Patients should receive clear discharge instructions to seek urgent medical care for worsening pain or swelling, neurologic symptoms, decreased motion,
          blistering, ulceration, or other skin changes.
        </p>
      </section>

      <section className="info-card">
        <h3>Documentation and communication</h3>
        <ul className="plain-list">
          <li>Document all extravasation events and their management in the medical record.</li>
          <li>Document the event in the dictated imaging report.</li>
          <li>Notify the referring physician, especially for symptomatic or clinically significant events.</li>
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
