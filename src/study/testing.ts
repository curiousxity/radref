import type { ReactElement } from 'react'
import { computeDerived, computeReport } from './report'
import type { StudyDefinition, Values } from './types'

/**
 * The definition behind a study page. The page components only render
 * `<StudyPage study={...} />`, so calling one returns that element without rendering.
 */
export function studyOf(Page: () => ReactElement): StudyDefinition {
  return (Page() as ReactElement<{ study: StudyDefinition }>).props.study
}

/** The report for these answers, on top of the study's starting values, as the page shows it. */
export function report(study: StudyDefinition, values: Values = {}) {
  return computeReport(study, { ...study.report.initial, ...values })
}

/** One step's rule chips as { label: value }, for compact assertions. */
export function chips(study: StudyDefinition, stepId: string, values: Values = {}) {
  return Object.fromEntries(
    computeDerived(study, stepId, { ...study.report.initial, ...values }).map((chip) => [chip.label, chip.value]),
  )
}
