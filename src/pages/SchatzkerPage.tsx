import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { schatzker, schatzkerDescriptions, schatzkerSentence } from '../logic/schatzker'
import type { LateralPattern, Plateau, SchatzkerType } from '../logic/schatzker'

type Form = {
  dissociation: 'no' | 'yes'
  plateau: Plateau
  pattern: LateralPattern
  depression: string
}

const initialForm: Form = { dissociation: 'no', plateau: 'lateral', pattern: 'split', depression: '' }

const dissociationOptions: { value: Form['dissociation']; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const plateauOptions: { value: Plateau; label: string }[] = [
  { value: 'lateral', label: 'Lateral only' },
  { value: 'medial', label: 'Medial only' },
  { value: 'both', label: 'Both (bicondylar)' },
]

const patternOptions: { value: LateralPattern; label: string }[] = [
  { value: 'split', label: 'Split only' },
  { value: 'split-depression', label: 'Split with depression' },
  { value: 'depression', label: 'Depression only' },
]

const types: SchatzkerType[] = ['I', 'II', 'III', 'IV', 'V', 'VI']

/** Unchecked draft: these citations are from memory and have not been matched on PubMed. */
const references: LessonReference[] = [
  { citation: 'Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104.' },
  { citation: 'Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597.' },
]

export function SchatzkerPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const depressionMm = form.depression.trim() === '' || !Number.isFinite(Number(form.depression)) ? undefined : Number(form.depression)
  const result = useMemo(
    () => schatzker({ plateau: form.plateau, pattern: form.pattern, dissociation: form.dissociation === 'yes' }),
    [form.plateau, form.pattern, form.dissociation],
  )

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Schatzker classification</h2>
          <span className="calc-tag">Tibial plateau</span>
        </div>
        <p>Type a tibial plateau fracture from three questions, with copyable report text.</p>
        <p className="source-note">Unchecked draft: written while PubMed could not be reached, so the type wording has not yet been checked against Schatzker's paper. Not yet reviewed by the site author. Source: Schatzker et al., Clin Orthop Relat Res 1979.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Does the fracture separate the metaphysis from the diaphysis?" layout="row" value={form.dissociation} options={dissociationOptions} onChange={(value) => update('dissociation', value)} />
            <ChoiceGroup label="Which plateau is broken?" layout="stack" value={form.plateau} options={plateauOptions} onChange={(value) => update('plateau', value)} />
            {form.plateau === 'lateral' && (
              <ChoiceGroup label="Lateral plateau pattern" layout="stack" value={form.pattern} options={patternOptions} onChange={(value) => update('pattern', value)} />
            )}
            <label>
              <span>Articular depression (optional, mm)</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.depression} onChange={(e) => update('depression', e.target.value)} placeholder="e.g. 6" />
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          {result && (
            <>
              <div className="result-strip">
                <div className="result-strip-head">
                  <p className="result-strip-value tone-warn">Schatzker {result.type}</p>
                </div>
                <p className="result-strip-summary">{result.description.charAt(0).toUpperCase() + result.description.slice(1)}.</p>
              </div>
              <CopyBlock label="Report text" text={schatzkerSentence(result, depressionMm)} />
            </>
          )}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The six types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Fracture</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type}>
                  <td className="vessel-name">{type}</td>
                  <td>{schatzkerDescriptions[type].charAt(0).toUpperCase() + schatzkerDescriptions[type].slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Dissociation of the metaphysis from the diaphysis makes a fracture type VI, whichever plateaus are broken. Sources word type IV differently (a medial split, a medial depression, or either), so this page uses only "fracture of the medial plateau" until the original wording is checked.</p>
        <p>CT and MRI are reported to be more accurate than radiographs for Schatzker typing, and to change surgical plans made from radiographs (Markhardt et al., Radiographics 2009; unchecked).</p>
      </section>

      <LessonReferences references={references} note="These citations are from memory and have not yet been matched on PubMed." />
    </div>
  )
}
