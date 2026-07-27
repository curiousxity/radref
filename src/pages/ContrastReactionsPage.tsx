import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Tier = 'mild' | 'moderate' | 'severe'
type Bucket = 'hives' | 'airway' | 'hypotension' | 'vasovagal'

type Symptom = {
  id: string
  label: string
  tier: Tier
  bucket: Bucket
}

const symptoms: Symptom[] = [
  { id: 'mild-urticaria', label: 'Limited urticaria or pruritus', tier: 'mild', bucket: 'hives' },
  { id: 'mild-nasal', label: 'Nasal congestion, sneezing, itchy throat, or mild conjunctival symptoms', tier: 'mild', bucket: 'hives' },
  { id: 'mild-vasovagal', label: 'Mild nausea, transient flushing, chills, dizziness, or self-limited vasovagal symptoms', tier: 'mild', bucket: 'vasovagal' },
  { id: 'mod-urticaria', label: 'Diffuse urticaria or more extensive cutaneous symptoms', tier: 'moderate', bucket: 'hives' },
  { id: 'mod-angioedema', label: 'Facial angioedema or throat tightness without frank airway obstruction', tier: 'moderate', bucket: 'airway' },
  { id: 'mod-wheeze', label: 'Wheezing or bronchospasm without hypoxia', tier: 'moderate', bucket: 'airway' },
  { id: 'mod-vasovagal', label: 'Severe or persistent vomiting, or vasovagal symptoms requiring treatment', tier: 'moderate', bucket: 'vasovagal' },
  { id: 'sev-laryngeal', label: 'Laryngeal edema, stridor, or marked airway compromise', tier: 'severe', bucket: 'airway' },
  { id: 'sev-bronchospasm', label: 'Bronchospasm with hypoxia or severe respiratory distress', tier: 'severe', bucket: 'airway' },
  { id: 'sev-hypotension', label: 'Hypotension, shock, or anaphylaxis', tier: 'severe', bucket: 'hypotension' },
  { id: 'sev-arrest', label: 'Seizure, serious arrhythmia, or cardiopulmonary arrest', tier: 'severe', bucket: 'hypotension' },
]

const bucketGuidance: Record<Bucket, string> = {
  hives: 'Observe if symptoms are mild and improving. Antihistamine therapy may be used for symptomatic urticaria.',
  airway: 'Provide oxygen and escalate care promptly. Use bronchodilator therapy and epinephrine when clinically indicated for significant hypersensitivity or evolving anaphylaxis.',
  hypotension: 'Activate emergency response, support the airway, provide oxygen, and administer IV fluids. Epinephrine is the key medication in anaphylaxis management.',
  vasovagal: 'Position the patient, monitor vital signs, and treat persistent symptomatic bradycardia or hypotension as needed.',
}

const bucketLabels: Record<Bucket, string> = {
  hives: 'Hives or itching',
  airway: 'Bronchospasm or airway compromise',
  hypotension: 'Hypotension or anaphylaxis',
  vasovagal: 'Vasovagal reaction',
}

const tierRank: Record<Tier, number> = { mild: 1, moderate: 2, severe: 3 }

type Form = {
  checked: Record<string, boolean>
  treatment: string
  outcome: string
}

const initialForm: Form = {
  checked: {},
  treatment: '',
  outcome: '',
}

function classify(form: Form) {
  const checkedSymptoms = symptoms.filter((s) => form.checked[s.id])
  const severity: Tier | 'none' = checkedSymptoms.length
    ? checkedSymptoms.reduce<Tier>((worst, s) => (tierRank[s.tier] > tierRank[worst] ? s.tier : worst), 'mild')
    : 'none'

  const buckets = Array.from(new Set(checkedSymptoms.map((s) => s.bucket)))

  const tone: 'good' | 'accent' | 'warn' | 'neutral' =
    severity === 'severe' ? 'warn' : severity === 'moderate' ? 'accent' : severity === 'mild' ? 'good' : 'neutral'

  const badgeLabel = severity === 'none' ? 'No findings selected' : `${severity.charAt(0).toUpperCase()}${severity.slice(1)} reaction`

  const summary =
    severity === 'none'
      ? 'Select the symptoms present to classify reaction severity and see bedside actions.'
      : `Overall severity is ${severity} based on the most severe finding selected.${severity === 'severe' ? ' Call for additional help early: activate emergency response and escalate care immediately.' : ''}`

  const symptomText = checkedSymptoms.map((s) => s.label.charAt(0).toLowerCase() + s.label.slice(1)).join('; ')

  const impression =
    severity === 'none'
      ? 'No contrast reaction symptoms entered.'
      : `Acute contrast reaction occurred following contrast administration, consisting of ${symptomText}. Reaction severity was ${severity}, and the patient was treated with ${form.treatment.trim() || '[treatment]'} with ${form.outcome.trim() || '[outcome]'}. Recommend future contrast review based on prior reaction severity and institutional prophylaxis protocol.`

  return { severity, tone, badgeLabel, summary, buckets, impression }
}

export function ContrastReactionsPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])

  function toggleSymptom(id: string, value: boolean) {
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
          <h2>Contrast reactions reference</h2>
          <p>Acute contrast reaction severity triage with bedside action guidance and copyable chart/report text.</p>
          <p className="source-note">
            Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual" target="_blank" rel="noopener noreferrer">ACR Manual on Contrast Media</a>, American College of Radiology.
          </p>
        </div>
      </section>

      <section className="info-card">
        <h3>General immediate steps</h3>
        <ul className="plain-list">
          <li>Stop the contrast injection and remain with the patient.</li>
          <li>Assess airway, breathing, circulation, mental status, and vital signs.</li>
          <li>Call for additional help early if there is respiratory compromise, hypotension, rapidly progressive symptoms, or multisystem involvement.</li>
          <li>Document the reaction type, severity, treatment, and disposition.</li>
        </ul>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Symptoms present</h3>
          <div className="form-grid">
            {symptoms.map((symptom) => (
              <label key={symptom.id} className="check-row">
                <input type="checkbox" checked={!!form.checked[symptom.id]} onChange={(e) => toggleSymptom(symptom.id, e.target.checked)} />
                {symptom.label}
              </label>
            ))}

            <label>
              <span>Treatment given</span>
              <input type="text" placeholder="e.g. diphenhydramine 25 mg IV" value={form.treatment} onChange={(e) => update('treatment', e.target.value)} />
            </label>

            <label>
              <span>Outcome</span>
              <input type="text" placeholder="e.g. complete resolution within 20 minutes" value={form.outcome} onChange={(e) => update('outcome', e.target.value)} />
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.badgeLabel} tone={result.tone} />
          </div>
          <p className="result-summary">{result.summary}</p>

          {result.buckets.length > 0 && (
            <ul className="plain-list">
              {result.buckets.map((bucket) => (
                <li key={bucket}>
                  <strong>{bucketLabels[bucket]}:</strong> {bucketGuidance[bucket]}
                </li>
              ))}
            </ul>
          )}

          <CopyBlock label="Chart / report text" text={result.impression} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Delayed reactions</h3>
        <p className="result-summary">
          Delayed reactions usually occur hours to days later and are most often cutaneous, such as rash, erythema, urticaria, or angioedema. Severe delayed cutaneous
          reactions are uncommon but important because future re-exposure may need to be avoided rather than managed with routine premedication.
        </p>
      </section>

      <section className="info-card">
        <h3>Premedication concepts</h3>
        <ul className="plain-list">
          <li>A prior contrast reaction is one of the most important risk factors for another reaction.</li>
          <li>Mild prior immediate reactions may not require premedication, though switching to a different iodinated contrast agent may be considered.</li>
          <li>Moderate or severe prior immediate reactions are the usual setting in which steroid and antihistamine premedication is considered.</li>
          <li>Severe delayed cutaneous reactions are a major warning sign and may prompt avoidance of further exposure.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Documentation points</h3>
        <ul className="plain-list">
          <li>Record the contrast type if known, reaction timing, symptoms, severity, treatment, and outcome.</li>
          <li>Update the allergy list with the actual reaction rather than a nonspecific label such as "iodine allergy."</li>
          <li>Shellfish allergy alone does not predict iodinated contrast reaction risk.</li>
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
