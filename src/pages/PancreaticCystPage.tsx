import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type AgeBand = '<65' | '65-79' | '80+'
type DuctCommunication = 'yes' | 'no' | 'indeterminate'
type AlternativeDiagnosis = 'none' | 'serous' | 'pseudocyst' | 'otherBenign'

type Form = {
  sizeCm: string
  ageBand: AgeBand
  ductCommunication: DuctCommunication
  growth: boolean
  worrisomeFeatures: boolean
  highRiskStigmata: boolean
  alternativeDiagnosis: AlternativeDiagnosis
  symptomsOrPancreatitis: boolean
}

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

function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function classify(form: Form) {
  const size = num(form.sizeCm)

  if (form.alternativeDiagnosis !== 'none') {
    return {
      category: 'Alternative benign diagnosis',
      reason: 'The lesion has features suggesting a benign alternative diagnosis rather than a presumed mucinous incidental cyst.',
      management: 'Manage according to the specific diagnosis rather than the incidental pancreatic cyst algorithm.',
      impression: 'Pancreatic cystic lesion has features favoring an alternative benign diagnosis. Manage according to the specific diagnosis rather than the incidental pancreatic cyst surveillance algorithm.',
    }
  }

  if (form.highRiskStigmata) {
    return {
      category: 'High risk',
      reason: 'High-risk stigmata warrant escalation beyond routine surveillance.',
      management: 'Recommend EUS/FNA and pancreatic surgical or specialty consultation.',
      impression: 'Incidental pancreatic cyst demonstrates high-risk features. Recommend EUS/FNA and pancreatic specialty or surgical consultation.',
    }
  }

  if (form.symptomsOrPancreatitis) {
    return {
      category: 'Symptomatic / special consideration',
      reason: 'Symptoms or pancreatitis can change management and may warrant specialty evaluation.',
      management: 'Consider pancreatic specialty referral and individualized management rather than routine surveillance alone.',
      impression: 'Pancreatic cyst is associated with symptoms or pancreatitis. Pancreatic specialty evaluation should be considered.',
    }
  }

  if (form.worrisomeFeatures || form.growth) {
    return {
      category: 'Worrisome',
      reason: 'Growth or worrisome features should prompt closer evaluation than standard surveillance.',
      management: 'Recommend EUS/FNA or closer interval follow-up, with pancreatic specialty referral as appropriate.',
      impression: 'Incidental pancreatic cyst has growth and/or worrisome imaging features. Recommend EUS/FNA or closer interval follow-up with pancreatic specialty evaluation as appropriate.',
    }
  }

  if (form.ageBand === '80+') {
    if (size <= 2.5) {
      return {
        category: 'Age-adjusted surveillance',
        reason: 'For patients 80 years and older, smaller cysts generally have reduced surveillance intensity.',
        management: 'Reimage every 2 years for 2 follow-up examinations.',
        impression: 'Incidental pancreatic cyst measuring 2.5 cm or smaller in a patient age 80 or older. Recommend imaging follow-up every 2 years for 2 examinations.',
      }
    }

    return {
      category: 'Age-adjusted surveillance',
      reason: 'For patients 80 years and older without high-risk features, larger cysts may still be followed with limited surveillance.',
      management: 'If no high-risk features are present, reimage every 2 years for 2 follow-up examinations; escalate if concerning features develop.',
      impression: 'Incidental pancreatic cyst larger than 2.5 cm in a patient age 80 or older without high-risk features. Limited interval surveillance may be appropriate.',
    }
  }

  if (size < 1.5) {
    if (form.ageBand === '<65') {
      return {
        category: 'Small cyst',
        reason: 'For patients younger than 65 years, cysts smaller than 1.5 cm are generally followed more closely.',
        management: 'Annual imaging for 5 years is a practical first surveillance pathway; longer surveillance may be considered depending on age and stability.',
        impression: 'Incidental pancreatic cyst smaller than 1.5 cm without worrisome features. Recommend annual imaging surveillance for 5 years as an initial pathway.',
      }
    }

    return {
      category: 'Small cyst',
      reason: 'For patients age 65 to 79 years, cysts smaller than 1.5 cm can usually be followed less frequently.',
      management: 'Imaging every 2 years for 5 years is a practical first surveillance pathway; longer surveillance may be considered depending on stability.',
      impression: 'Incidental pancreatic cyst smaller than 1.5 cm without worrisome features. Recommend imaging surveillance every 2 years for 5 years as an initial pathway.',
    }
  }

  if (size <= 2.5) {
    if (form.ductCommunication === 'yes') {
      return {
        category: 'Intermediate cyst with duct communication',
        reason: 'For 1.5 to 2.5 cm cysts, main pancreatic duct communication influences management and often supports a mucinous branch-duct IPMN pathway.',
        management: 'Recommend closer surveillance, typically every 6 months to 1 year, and consider EUS/FNA depending on morphology and interval change.',
        impression: 'Incidental pancreatic cyst measuring 1.5 to 2.5 cm with main pancreatic duct communication. Recommend closer surveillance and consider EUS/FNA depending on morphology and interval change.',
      }
    }

    return {
      category: 'Intermediate cyst',
      reason: 'For 1.5 to 2.5 cm cysts without definite duct communication, surveillance remains appropriate and EUS/FNA may be considered.',
      management: 'Recommend imaging follow-up and consider EUS/FNA depending on morphology, growth, and local practice pattern.',
      impression: 'Incidental pancreatic cyst measuring 1.5 to 2.5 cm without definite main pancreatic duct communication. Recommend imaging follow-up and consider EUS/FNA as appropriate.',
    }
  }

  return {
    category: 'Large cyst',
    reason: 'Cysts larger than 2.5 cm require more careful risk stratification and often specialty evaluation.',
    management: 'Recommend pancreatic specialty referral and consider EUS/FNA even without overt high-risk stigmata.',
    impression: 'Incidental pancreatic cyst larger than 2.5 cm. Recommend pancreatic specialty referral and consider EUS/FNA.',
  }
}

export function PancreaticCystPage() {
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
          <p className="eyebrow">ACR incidental pancreatic cysts</p>
          <h2>Pancreatic cyst management</h2>
          <p>Dedicated incidental pancreatic cyst helper with surveillance logic, EUS/FNA escalation, and copyable impression text.</p>
          <p className="source-note">Source: ACR incidental pancreatic cyst white paper and related follow-up guidance.</p>
        </div>
        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <label>
              <span>Cyst size (cm)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.sizeCm} onChange={(e) => update('sizeCm', e.target.value)} placeholder="e.g. 1.8" />
            </label>

            <label>
              <span>Age band</span>
              <select value={form.ageBand} onChange={(e) => update('ageBand', e.target.value as AgeBand)}>
                <option value="<65">&lt;65</option>
                <option value="65-79">65-79</option>
                <option value="80+">80+</option>
              </select>
            </label>

            <label>
              <span>Main pancreatic duct communication</span>
              <select value={form.ductCommunication} onChange={(e) => update('ductCommunication', e.target.value as DuctCommunication)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="indeterminate">Indeterminate</option>
              </select>
            </label>

            <label>
              <span>Alternative diagnosis</span>
              <select value={form.alternativeDiagnosis} onChange={(e) => update('alternativeDiagnosis', e.target.value as AlternativeDiagnosis)}>
                <option value="none">None / presumed mucinous</option>
                <option value="serous">Serous cystadenoma</option>
                <option value="pseudocyst">Pseudocyst</option>
                <option value="otherBenign">Other benign diagnosis</option>
              </select>
            </label>

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
          <div className="result-head">
            <h3>Result</h3>
            <Badge
              label={result.category}
              tone={
                result.category.includes('High risk')
                  ? 'warn'
                  : result.category.includes('Worrisome') || result.category.includes('Large')
                    ? 'accent'
                    : 'good'
              }
            />
          </div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Management" text={result.management} />
        </article>
      </section>
    </div>
  )
}
