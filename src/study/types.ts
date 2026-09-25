import type { ReactNode } from 'react'
import type { LessonReference } from '../components/LessonPage'

/**
 * A study is one page per exam type with three tabs:
 * - Report: a form that walks the lesson's search pattern and writes the report as you go,
 * - Learn: the lesson itself, section by section,
 * - Quiz: a few self-check questions drawn from the lesson.
 *
 * Studies are declared as data (`StudyDefinition`) and rendered by `StudyPage`, so every
 * study looks and behaves the same. The Report tab's teaching panels and the Learn tab
 * come from the same lesson content, so they cannot drift apart.
 */

/** One form value. Numbers stay as strings while typed; read them with `num()`. */
export type Value = string | string[] | undefined
export type Values = Record<string, Value>

export type Option = { value: string; label: string }

type FieldBase = {
  /** Unique across the whole study, not just the step. */
  id: string
  label: string
  /** One short line under the field, e.g. the threshold that applies. */
  help?: string
  /** Hide the field unless this returns true. Hidden fields are ignored by `required`. */
  showIf?: (values: Values) => boolean
  /**
   * Listed as "not stated" in the report warnings while empty, e.g. EMVI on a rectal MRI.
   * Use it for what the lesson says the report must always contain.
   */
  required?: boolean
}

export type Field =
  /** A measurement. `unit` is shown beside the input and is not part of the value. */
  | (FieldBase & { kind: 'number'; unit?: string; min?: number; max?: number; step?: number })
  /** Pick one. Up to four short options render as buttons, more as a select. */
  | (FieldBase & { kind: 'choice'; options: Option[] })
  /** Pick any number. The value is the list of chosen option values. */
  | (FieldBase & { kind: 'multi'; options: Option[] })
  /** Free text, e.g. a location or "other findings". */
  | (FieldBase & { kind: 'text'; placeholder?: string; multiline?: boolean })

/** A rule applied to the inputs so far, shown as a chip under the step, e.g. "T3c". */
export type Derived = { label: string; value: string; tone?: 'good' | 'warn' | 'neutral' }

export type ReportStep = {
  id: string
  /** Matches the lesson's step heading, e.g. "Step 2. T stage (angled axial T2)". */
  title: string
  /**
   * The rule and the paper behind it, in a few sentences with <Cite> links: the part of the
   * lesson you need while filling in this step. Shown in a collapsible "Why and how" panel.
   */
  teach?: ReactNode
  /** Id of the Learn section to open from this step ("Read the full section"). */
  learn?: string
  fields: Field[]
  /** Rules the lesson states, applied to this step's inputs. */
  derive?: (values: Values) => Derived[]
}

export type ReportOutput = {
  /** The report, ready to paste. Omit lines for findings that were not entered. */
  text: string
  /**
   * Problems the rules can see beyond missing required fields, e.g. inputs that
   * contradict each other. Missing required fields are added by `StudyPage`.
   */
  warnings: string[]
}

export type LearnSection = {
  /** Anchor id, unique within the study. */
  id: string
  title: string
  body: ReactNode
}

export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  /** Index into `options`. */
  answer: number
  /** Why the answer is right, from the lesson, with a <Cite> where the lesson has one. */
  explanation: ReactNode
}

export type StudyDefinition = {
  /** Used for the quiz-progress storage key; the route slug, e.g. 'rectal-mri'. */
  slug: string
  name: string
  lede: string
  sourceNote: string
  references: LessonReference[]
  referencesNote?: string
  report: {
    steps: ReportStep[]
    build: (values: Values) => ReportOutput
    /** Starting values, e.g. "none" defaults on a danger-zone checklist. */
    initial?: Values
  }
  learn: LearnSection[]
  quiz: QuizQuestion[]
}

/* Helpers for `build` and `derive`. */

/** The value as a number, or undefined if empty or not a number. */
export function num(values: Values, id: string): number | undefined {
  const raw = values[id]
  if (typeof raw !== 'string' || raw.trim() === '') return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

/** The value as trimmed text, or '' if empty. For a choice field this is the option value. */
export function str(values: Values, id: string): string {
  const raw = values[id]
  return typeof raw === 'string' ? raw.trim() : ''
}

/** The chosen option values of a multi field. */
export function list(values: Values, id: string): string[] {
  const raw = values[id]
  return Array.isArray(raw) ? raw : []
}

/** The display label of the chosen option, for writing it into the report. */
export function optionLabel(field: { options: Option[] }, value: string): string {
  return field.options.find((option) => option.value === value)?.label ?? value
}

/** Joins report lines, dropping empty ones. */
export function lines(...parts: (string | false | null | undefined)[]): string {
  return parts.filter((part): part is string => Boolean(part)).join('\n')
}
