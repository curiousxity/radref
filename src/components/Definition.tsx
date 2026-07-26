import { useState } from 'react'

export function Definition({ text }: { text: string }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="definition">
      <button
        type="button"
        className="definition-trigger"
        aria-expanded={open}
        aria-label={open ? 'Hide definition' : 'What does this mean?'}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen((current) => !current)
        }}
      >
        ?
      </button>
      {open && (
        <span className="definition-text" onClick={(event) => event.stopPropagation()}>
          {text}
        </span>
      )}
    </span>
  )
}
