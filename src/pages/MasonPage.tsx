import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { brobergMorrey, mason, masonDescriptions, masonSentence } from '../logic/mason'
import type { MasonPattern, MasonType } from '../logic/mason'
import { ScanFigures } from '../components/ScanFigures'
import { masonScans } from '../data/scans/mason'

type Form = {
  dislocation: 'no' | 'yes'
  pattern: MasonPattern
  displacement: string
  headPercent: string
}

const initialForm: Form = { dislocation: 'no', pattern: 'undisplaced', displacement: '', headPercent: '' }

const dislocationOptions: { value: Form['dislocation']; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const patternOptions: { value: MasonPattern; label: string }[] = [
  { value: 'undisplaced', label: 'Fissure or marginal fracture, not displaced' },
  { value: 'displaced', label: 'Marginal sector fracture, displaced' },
  { value: 'comminuted', label: 'Comminuted, whole head' },
]

const types: MasonType[] = ['I', 'II', 'III', 'IV']

/** Matched on PubMed and Crossref (2026-10-23). Johnston 1962 has no DOI; it is in PMC only. */
const references: LessonReference[] = [
  { citation: 'Mason ML. Some observations on fractures of the head of the radius with a review of one hundred cases. Br J Surg. 1954;42(172):123-132.', doi: '10.1002/bjs.18004217203' },
  { citation: 'Johnston GW. A follow-up of one hundred cases of fracture of the head of the radius with a review of the literature. Ulster Med J. 1962;31(1):51-56.' },
  { citation: 'Broberg MA, Morrey BF. Results of treatment of fracture-dislocations of the elbow. Clin Orthop Relat Res. 1987;(216):109-119.', doi: '10.1097/00003086-198703000-00017' },
  { citation: 'Iannuzzi NP, Leopold SS. In brief: the Mason classification of radial head fractures. Clin Orthop Relat Res. 2012;470(6):1799-1802.', doi: '10.1007/s11999-012-2319-2' },
]

/** The value as a number, or undefined if empty or not a number. */
function toNumber(raw: string): number | undefined {
  return raw.trim() === '' || !Number.isFinite(Number(raw)) ? undefined : Number(raw)
}

export function MasonPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const result = useMemo(() => mason({ pattern: form.pattern, dislocation: form.dislocation === 'yes' }), [form.pattern, form.dislocation])
  const displacement = toNumber(form.displacement)
  const headPercent = toNumber(form.headPercent)
  const quantitative = brobergMorrey(displacement, headPercent)

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Mason classification</h2>
          <span className="calc-tag">Radial head</span>
        </div>
        <p>Type a radial head fracture from two questions, with copyable report text. Types I to III are Mason's own; type IV is Johnston's later addition.</p>
        <p className="source-note">Unchecked draft: types I to III are checked against Mason's table as a review reproduces it (<Cite doi="10.1007/s11999-012-2319-2">Iannuzzi and Leopold, Clin Orthop Relat Res 2012</Cite>) and type IV against Johnston's own paper. The 2 mm and 30% thresholds are not yet checked: they are not in Broberg and Morrey's 1986 paper, and the review credits their 1987 paper, which is paywalled. Sources: <Cite doi="10.1002/bjs.18004217203">Mason, Br J Surg 1954</Cite>; Johnston, Ulster Med J 1962.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Was the elbow dislocated with this fracture?" layout="row" value={form.dislocation} options={dislocationOptions} onChange={(value) => update('dislocation', value)} />
            <ChoiceGroup label="Radial head fracture pattern" layout="stack" value={form.pattern} options={patternOptions} onChange={(value) => update('pattern', value)} />
            <label>
              <span>Displacement (optional, mm)</span>
              <input type="number" step="0.5" min="0" inputMode="decimal" value={form.displacement} onChange={(e) => update('displacement', e.target.value)} placeholder="e.g. 3" />
            </label>
            <label>
              <span>Share of the head involved (optional, %)</span>
              <input type="number" step="5" min="0" max="100" inputMode="decimal" value={form.headPercent} onChange={(e) => update('headPercent', e.target.value)} placeholder="e.g. 40" />
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          {result && (
            <>
              <div className="result-strip">
                <div className="result-strip-head">
                  <p className="result-strip-value tone-warn">Mason {result.type}</p>
                </div>
                <p className="result-strip-summary">
                  {result.description.charAt(0).toUpperCase() + result.description.slice(1)}.
                  {result.modified && ' Type IV is the Johnston modification, not part of Mason\'s original three types.'}
                </p>
              </div>
              {displacement !== undefined && (
                <p className="result-strip-summary">
                  {quantitative
                    ? `Broberg-Morrey thresholds: type ${quantitative}.`
                    : 'Broberg-Morrey thresholds: not decided (2 mm or more of displacement needs 30% or more of the head for type II).'}
                </p>
              )}
              <CopyBlock label="Impression" text={masonSentence(result)} />
            </>
          )}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Fracture</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type}>
                  <td className="vessel-name">{type}</td>
                  <td>{masonDescriptions[type].charAt(0).toUpperCase() + masonDescriptions[type].slice(1)}</td>
                  <td>{type === 'IV' ? 'Johnston 1962' : 'Mason 1954'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>A dislocation makes the fracture type IV, whatever the pattern. Broberg and Morrey later put numbers on types I and II: type I displaced less than 2 mm, type II displaced 2 mm or more and involving 30% or more of the head (<Cite doi="10.1097/00003086-198703000-00017">Broberg and Morrey, Clin Orthop Relat Res 1987</Cite>; unchecked). A fragment displaced 2 mm or more but smaller than 30% of the head falls outside those numbers.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[masonScans.type1, masonScans.type2, masonScans.type2Ct, masonScans.type3, masonScans.type4]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Johnston is read in full and Mason's types in the 2012 review's reproduction of his table; Broberg and Morrey 1987 is paywalled." />
    </div>
  )
}
