import { useId, useRef, type KeyboardEvent } from 'react'
import { nextChoiceIndex } from './choiceKeys'

export type ChoiceOption<T extends string> = {
  value: T
  label: string
  /** Shown right-aligned in mono beside the label, e.g. a feature's points ("+2"). */
  detail?: string
}

type ChoiceGroupProps<T extends string> = {
  label: string
  value: T
  options: ChoiceOption<T>[]
  onChange: (value: T) => void
  /** `stack`: full-width buttons in a one- or two-column grid, for long labels.
   *  `row`: one joined segmented row, for a few short labels. */
  layout?: 'row' | 'stack'
}

/** A single-choice input drawn as buttons: a WAI-ARIA radio group with a roving tabIndex
 *  (only the checked option is in the tab order) and arrow, Home and End keys that move
 *  focus and selection together. It sets exactly the values it is given, so swapping a
 *  `<select>` for it changes no state or logic. */
export function ChoiceGroup<T extends string>({ label, value, options, onChange, layout = 'stack' }: ChoiceGroupProps<T>) {
  const labelId = useId()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const checkedIndex = options.findIndex((option) => option.value === value)
  // If the value matches no option, the first one takes the tab stop so the group stays reachable.
  const tabStop = checkedIndex === -1 ? 0 : checkedIndex

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = nextChoiceIndex(index, event.key, options.length)
    if (next === null) return
    event.preventDefault()
    onChange(options[next].value)
    buttons.current[next]?.focus()
  }

  return (
    <div className="choice-field">
      <div className="choice-label" id={labelId}>{label}</div>
      <div role="radiogroup" aria-labelledby={labelId} className={`choice-group choice-group--${layout}`}>
        {options.map((option, index) => {
          const checked = index === checkedIndex
          return (
            <button
              key={option.value}
              ref={(node) => { buttons.current[index] = node }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={index === tabStop ? 0 : -1}
              className="choice-option"
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="choice-option-label">{option.label}</span>
              {option.detail ? <span className="choice-option-detail">{option.detail}</span> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
