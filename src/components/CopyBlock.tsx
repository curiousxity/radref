import { useState } from 'react'
import { formatReportText } from './reportText'
import type { ReportSection } from './reportText'

export function CopyBlock({
  label,
  text,
  disabledReason,
}: {
  /** The report section this box holds; see `ReportSection`. */
  label: ReportSection
  text: string
  /** When set, copying is blocked and this explains what is still needed. */
  disabledReason?: string
}) {
  const [status, setStatus] = useState('')
  const isDisabled = Boolean(disabledReason)
  // A study's report and template keep their own layout and placeholders; every calculator
  // section is tidied.
  const shown = label === 'Report' || label === 'Report template' ? text : formatReportText(text)

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shown)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = shown
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
      setStatus('Copied')
      window.setTimeout(() => setStatus(''), 1500)
    } catch {
      setStatus('Copy failed')
    }
  }

  return (
    <div className="copy-block">
      <div className="copy-header">
        <p className="metric-label">{label}</p>
        <button type="button" className="copy-button" onClick={handleCopy} disabled={isDisabled}>
          Copy
        </button>
      </div>
      <div className="copy-text" role="textbox" aria-label={label}>
        {shown}
      </div>
      <p className="copy-status" aria-live="polite">{disabledReason ?? status}</p>
    </div>
  )
}
