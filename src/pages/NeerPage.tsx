import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { classifyNeer, emptyNeerInput, isDisplaced, lineNames, NEER_LINES } from '../logic/neer'
import type { LineStatus, NeerInput, NeerLine } from '../logic/neer'

type LineForm = { present: 'no' | 'yes'; cm: string; deg: string }
type Form = { lines: Record<NeerLine, LineForm>; dislocation: NeerInput['dislocation']; articular: NeerInput['articular'] }

const emptyLine: LineForm = { present: 'no', cm: '', deg: '' }
const initialForm: Form = {
  lines: { anatomicalNeck: emptyLine, surgicalNeck: emptyLine, greaterTuberosity: emptyLine, lesserTuberosity: emptyLine },
  dislocation: 'none',
  articular: 'none',
}

const lineLabels: Record<NeerLine, string> = {
  anatomicalNeck: 'Anatomical neck (articular segment)',
  surgicalNeck: 'Surgical neck (shaft)',
  greaterTuberosity: 'Greater tuberosity',
  lesserTuberosity: 'Lesser tuberosity',
}

const presentOptions: { value: LineForm['present']; label: string }[] = [
  { value: 'no', label: 'No fracture line' },
  { value: 'yes', label: 'Fracture line' },
]

const dislocationOptions: { value: Form['dislocation']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'anterior', label: 'Anterior' },
  { value: 'posterior', label: 'Posterior' },
]

const articularOptions: { value: Form['articular']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'head-split', label: 'Head-splitting' },
  { value: 'impression', label: 'Impression' },
]

function toNumber(raw: string): number | undefined {
  if (raw.trim() === '') return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n : undefined
}

function lineStatus(line: LineForm): LineStatus {
  if (line.present === 'no') return 'none'
  return isDisplaced(toNumber(line.cm), toNumber(line.deg)) ? 'displaced' : 'undisplaced'
}

export function NeerPage() {
  const [form, setForm] = useState<Form>(initialForm)

  const input: NeerInput = useMemo(() => ({
    ...emptyNeerInput,
    dislocation: form.dislocation,
    articular: form.articular,
    lines: Object.fromEntries(NEER_LINES.map((line) => [line, lineStatus(form.lines[line])])) as Record<NeerLine, LineStatus>,
  }), [form])
  const result = useMemo(() => classifyNeer(input), [input])
  const unmeasured = NEER_LINES.filter((line) => form.lines[line].present === 'yes' && form.lines[line].cm.trim() === '' && form.lines[line].deg.trim() === '')
  const tone = result.parts === 0 ? 'neutral' : result.parts === undefined || result.parts >= 3 || form.dislocation !== 'none' || form.articular !== 'none' ? 'warn' : 'accent'

  function updateLine(line: NeerLine, patch: Partial<LineForm>) {
    setForm((current) => ({ ...current, lines: { ...current.lines, [line]: { ...current.lines[line], ...patch } } }))
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Neer classification</h2>
          <span className="calc-tag">Proximal humerus</span>
        </div>
        <p>Counts the displaced segments of a proximal humerus fracture and gives the Neer type with copyable report text. Usually applied on radiographs and CT.</p>
        <p className="source-note">Unchecked draft: written while PubMed could not be reached, so no citation or claim on this page has been checked against its paper yet. Not yet reviewed by the site author. Source: Neer CS 2nd, Displaced proximal humeral fractures. Part I. Classification and evaluation. J Bone Joint Surg Am 1970.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture lines</h3>
          <p>A segment counts as a part only when it is displaced more than 1 cm or angulated more than 45°. Exactly 1 cm or 45° is not displaced.</p>
          <div className="form-grid">
            {NEER_LINES.map((line) => (
              <div key={line} className="form-grid">
                <ChoiceGroup label={lineLabels[line]} layout="row" value={form.lines[line].present} options={presentOptions} onChange={(value) => updateLine(line, { present: value })} />
                {form.lines[line].present === 'yes' && (
                  <>
                    <label>
                      <span>Displacement (cm)</span>
                      <input type="number" step="0.1" min="0" inputMode="decimal" value={form.lines[line].cm} onChange={(e) => updateLine(line, { cm: e.target.value })} placeholder="e.g. 1.5" />
                    </label>
                    <label>
                      <span>Angulation (degrees)</span>
                      <input type="number" step="1" min="0" inputMode="decimal" value={form.lines[line].deg} onChange={(e) => updateLine(line, { deg: e.target.value })} placeholder="e.g. 30" />
                    </label>
                  </>
                )}
              </div>
            ))}
          </div>

          <h3>Dislocation and articular surface</h3>
          <div className="form-grid">
            <ChoiceGroup label="Fracture-dislocation" layout="row" value={form.dislocation} options={dislocationOptions} onChange={(value) => setForm((current) => ({ ...current, dislocation: value }))} />
            <ChoiceGroup label="Articular surface fracture" layout="row" value={form.articular} options={articularOptions} onChange={(value) => setForm((current) => ({ ...current, articular: value }))} />
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value result-strip-value--phrase tone-${tone}`}>{result.label}</p>
            </div>
            <p className="result-strip-summary">{result.description}</p>
            {unmeasured.length > 0 && (
              <p className="result-strip-summary">No measurement entered for the {unmeasured.map((line) => lineNames[line]).join(', ')}, so {unmeasured.length === 1 ? 'it is' : 'they are'} counted as not displaced.</p>
            )}
          </div>
          {result.report && <CopyBlock label="Report text" text={result.report} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>
    </div>
  )
}
