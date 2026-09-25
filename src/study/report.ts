import type { Derived, ReportOutput, StudyDefinition, Value, Values } from './types'

export function isEmpty(value: Value) {
  return value === undefined || (Array.isArray(value) ? value.length === 0 : value.trim() === '')
}

/**
 * The values with every hidden field's answer removed. Without this, an answer typed and
 * then hidden (by changing the choice that revealed it) would still reach the report.
 * Hiding one field can hide another that depended on it, so it repeats until stable.
 */
export function visibleValues(study: StudyDefinition, values: Values): Values {
  const fields = study.report.steps.flatMap((step) => step.fields)
  let current = values
  for (let pass = 0; pass < fields.length; pass += 1) {
    const hidden = fields.filter((field) => field.showIf && !field.showIf(current) && current[field.id] !== undefined)
    if (hidden.length === 0) break
    current = { ...current }
    for (const field of hidden) delete current[field.id]
  }
  return current
}

/**
 * What the Report tab shows for a set of answers: the report text, and the warnings, with
 * every visible required field left empty listed first as "<label> not stated".
 * `ReportBuilder` renders exactly this, and the tests call it directly.
 */
export function computeReport(study: StudyDefinition, values: Values): ReportOutput {
  const shown = visibleValues(study, values)
  const built = study.report.build(shown)
  const missing = study.report.steps.flatMap((step) =>
    step.fields
      .filter((field) => field.required && (field.showIf?.(shown) ?? true) && isEmpty(shown[field.id]))
      .map((field) => `${field.label} not stated`),
  )
  return { text: built.text, warnings: [...missing, ...built.warnings] }
}

/** The rule chips for one step, as the Report tab shows them. */
export function computeDerived(study: StudyDefinition, stepId: string, values: Values): Derived[] {
  const step = study.report.steps.find((s) => s.id === stepId)
  if (!step) throw new Error(`No step "${stepId}" in ${study.slug}`)
  return step.derive?.(visibleValues(study, values)) ?? []
}
