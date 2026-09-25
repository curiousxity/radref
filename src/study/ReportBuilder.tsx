import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { computeReport, visibleValues } from './report'
import type { Field, StudyDefinition, Value, Values } from './types'

/** Short option sets read better as a row of buttons than as a select. */
function rendersAsButtons(field: Extract<Field, { kind: 'choice' }>) {
  return field.options.length <= 4 && field.options.every((option) => option.label.length <= 24)
}

function FieldInput({ field, value, onChange }: { field: Field; value: Value; onChange: (next: Value) => void }) {
  const inputId = `field-${field.id}`
  const help = field.help && <span className="field-help">{field.help}</span>

  if (field.kind === 'choice' && rendersAsButtons(field)) {
    return (
      <fieldset className="study-field">
        <legend>{field.label}</legend>
        <div className="choice-row">
          {field.options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={value === option.value ? 'choice-button active' : 'choice-button'}
              aria-pressed={value === option.value}
              // A second press clears it, so an unknown finding can be left unstated.
              onClick={() => onChange(value === option.value ? undefined : option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {help}
      </fieldset>
    )
  }

  if (field.kind === 'choice') {
    return (
      <label className="study-field" htmlFor={inputId}>
        <span>{field.label}</span>
        <select id={inputId} value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value || undefined)}>
          <option value="">Not stated</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {help}
      </label>
    )
  }

  if (field.kind === 'multi') {
    const chosen = Array.isArray(value) ? value : []
    return (
      <fieldset className="study-field">
        <legend>{field.label}</legend>
        <div className="multi-list">
          {field.options.map((option) => (
            <label key={option.value} className="check-row">
              <input
                type="checkbox"
                checked={chosen.includes(option.value)}
                onChange={(e) =>
                  onChange(e.target.checked ? [...chosen, option.value] : chosen.filter((v) => v !== option.value))
                }
              />
              {option.label}
            </label>
          ))}
        </div>
        {help}
      </fieldset>
    )
  }

  if (field.kind === 'number') {
    return (
      <label className="study-field" htmlFor={inputId}>
        <span>{field.label}</span>
        <span className="number-row">
          <input
            id={inputId}
            type="number"
            inputMode="decimal"
            min={field.min}
            max={field.max}
            step={field.step ?? 'any'}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
          />
          {field.unit && <span className="unit">{field.unit}</span>}
        </span>
        {help}
      </label>
    )
  }

  return (
    <label className="study-field" htmlFor={inputId}>
      <span>{field.label}</span>
      {field.multiline ? (
        <textarea id={inputId} rows={3} placeholder={field.placeholder} value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={inputId} type="text" placeholder={field.placeholder} value={typeof value === 'string' ? value : ''} onChange={(e) => onChange(e.target.value)} />
      )}
      {help}
    </label>
  )
}

/**
 * The Report tab. Values live only in component state: nothing typed here is stored or
 * sent anywhere, so no patient detail outlives the page.
 */
export function ReportBuilder({ study, onOpenLearn }: { study: StudyDefinition; onOpenLearn: (id: string) => void }) {
  const initial = study.report.initial ?? {}
  const [values, setValues] = useState<Values>(initial)

  function update(id: string, next: Value) {
    setValues((current) => ({ ...current, [id]: next }))
  }

  // Rules and the report only ever see answers to fields that are currently shown.
  const shown = useMemo(() => visibleValues(study, values), [study, values])
  const output = useMemo(() => computeReport(study, values), [study, values])

  return (
    <section className="calculator-grid study-report">
      <div className="study-steps">
        {study.report.steps.map((step) => {
          const derived = step.derive?.(shown) ?? []
          return (
            <article key={step.id} className="info-card form-card study-step">
              <h3>{step.title}</h3>
              {step.teach && (
                <details className="study-teach">
                  <summary>Why and how</summary>
                  <div className="lesson-body">{step.teach}</div>
                  {step.learn && (
                    <button type="button" className="link-button" onClick={() => onOpenLearn(step.learn as string)}>
                      Read the full section
                    </button>
                  )}
                </details>
              )}
              <div className="study-fields">
                {step.fields
                  .filter((field) => field.showIf?.(shown) ?? true)
                  .map((field) => (
                    <FieldInput key={field.id} field={field} value={values[field.id]} onChange={(next) => update(field.id, next)} />
                  ))}
              </div>
              {derived.length > 0 && (
                <div className="derived-row" aria-live="polite">
                  {derived.map((item) => (
                    <span key={item.label} className="derived-item">
                      <span className="metric-label">{item.label}</span>
                      <Badge label={item.value} tone={item.tone ?? 'neutral'} />
                    </span>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>

      <article className="info-card result-card sticky-card">
        <CopyBlock label="Report" text={output.text} />
        {output.warnings.length > 0 && (
          <div className="study-warnings">
            <p className="metric-label">Check before signing</p>
            <ul className="plain-list">
              {output.warnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="button" className="reset-button" onClick={() => setValues(initial)}>Clear the form</button>
      </article>
    </section>
  )
}
