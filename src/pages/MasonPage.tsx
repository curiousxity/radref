import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { brobergMorrey, brobergMorreySentence, mason, masonDescriptions, masonFindings, masonSentence } from '../logic/mason'
import type { MasonPattern, MasonType } from '../logic/mason'
import { ScanFigures } from '../components/ScanFigures'
import { masonScans } from '../data/scans/mason'

type Form = {
  dislocation: 'no' | 'yes'
  pattern: MasonPattern
  displacement: string
  surfacePercent: string
  block: 'untested' | 'no' | 'yes'
}

const initialForm: Form = { dislocation: 'no', pattern: 'undisplaced', displacement: '', surfacePercent: '', block: 'untested' }

const dislocationOptions: { value: Form['dislocation']; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const blockOptions: { value: Form['block']; label: string }[] = [
  { value: 'untested', label: 'Not recorded' },
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
  { citation: 'van der Windt AE, Langenberg LC, Colaris JW, Eygendaal D. Which radial head fractures are best treated surgically? EFORT Open Rev. 2024;9(5):413-421.', doi: '10.1530/EOR-24-0035' },
  { citation: 'Swensen SJ, Tyagi V, Uquillas C, Shakked RJ, Yoon RS, Liporace FA. Maximizing outcomes in the treatment of radial head fractures. J Orthop Traumatol. 2019;20(1):15.', doi: '10.1186/s10195-019-0523-5' },
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
  const surfacePercent = toNumber(form.surfacePercent)
  const quantitative = brobergMorrey(displacement, surfacePercent)
  const findings = masonFindings({ displacementMm: displacement, surfacePercent, mechanicalBlock: form.block === 'untested' ? undefined : form.block === 'yes' })

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Mason classification</h2>
          <span className="calc-tag">Radial head</span>
        </div>
        <p>Type a radial head fracture from two questions, with copyable report text. Types I to III are Mason's own; type IV is Johnston's later addition.</p>
        <p className="source-note">Types I to III are checked against Mason's table as a review reproduces it (<Cite doi="10.1007/s11999-012-2319-2">Iannuzzi and Leopold, Clin Orthop Relat Res 2012</Cite>) and type IV against Johnston's own paper. The 2 mm and 30% thresholds are not in Broberg and Morrey's 1986 paper; the reviews credit their 1987 paper, which is paywalled, so they are checked against a review that states them (<Cite doi="10.1530/EOR-24-0035">van der Windt et al., EFORT Open Rev 2024</Cite>), and the result names that modification, since other versions word type II differently (<Cite doi="10.1186/s10195-019-0523-5">Swensen et al., J Orthop Traumatol 2019</Cite>). Sources: <Cite doi="10.1002/bjs.18004217203">Mason, Br J Surg 1954</Cite>; Johnston, Ulster Med J 1962.</p>
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
              <span>Share of the articular surface involved (optional, %)</span>
              <input type="number" step="5" min="0" max="100" inputMode="decimal" value={form.surfacePercent} onChange={(e) => update('surfacePercent', e.target.value)} placeholder="e.g. 40" />
            </label>
            <ChoiceGroup label="Mechanical block to forearm rotation (recorded; does not change the type)" layout="row" value={form.block} options={blockOptions} onChange={(value) => update('block', value)} />
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          {result && (
            <>
              <div className="result-strip">
                <div className="result-strip-head">
                  <p className="result-strip-value tone-warn">Mason {result.type}{result.modified && ' (Johnston)'}</p>
                </div>
                <p className="result-strip-summary">
                  {result.description.charAt(0).toUpperCase() + result.description.slice(1)}.
                  {result.modified && ' Type IV is the Johnston modification, not part of Mason\'s original three types.'}
                </p>
              </div>
              {displacement !== undefined && (
                <p className="result-strip-summary">
                  {quantitative
                    ? `${brobergMorreySentence(quantitative)}${quantitative === 'I' && displacement >= 2 ? ' Displaced 2 mm or more, but under 30% of the articular surface, so type I under this modification.' : ''}`
                    : 'Broberg-Morrey modification: not decided until the share of the articular surface is entered (2 mm or more of displacement with 30% or more is type II; under 30% is type I).'}
                </p>
              )}
              {findings.length > 0 && <CopyBlock label="Findings" text={findings.join('\n')} />}
              <CopyBlock label="Impression" text={[masonSentence(result), quantitative && brobergMorreySentence(quantitative)].filter(Boolean).join('\n')} />
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
        <p>A dislocation makes the fracture type IV, whatever the pattern. Under the Broberg-Morrey modification, a partial fracture counts as displaced, type II, only when it is displaced at least 2 mm and involves at least 30% of the articular surface; anything less is type I, so a smaller fragment is type I under this scheme even when it is displaced 2 mm or more (<Cite doi="10.1097/00003086-198703000-00017">Broberg and Morrey, Clin Orthop Relat Res 1987</Cite>; <Cite doi="10.1530/EOR-24-0035">van der Windt et al., EFORT Open Rev 2024</Cite>). Not every version of Mason has the size requirement: in the Hotchkiss modification, type II is displaced 2 mm or more or blocks forearm rotation (<Cite doi="10.1186/s10195-019-0523-5">Swensen et al., J Orthop Traumatol 2019</Cite>).</p>
        <p>The type is not the treatment. Displacement of more than 2 mm without a mechanical block to pronation and supination is not a clear indication for surgery, while a mechanical block to rotation is, so record the block on its own (<Cite doi="10.1530/EOR-24-0035">van der Windt et al., EFORT Open Rev 2024</Cite>).</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[masonScans.type1, masonScans.type2, masonScans.type2Ct, masonScans.type3, masonScans.type4]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Johnston is read in full and Mason's types in the 2012 review's reproduction of his table; Broberg and Morrey 1987 is paywalled, and its thresholds are read in the 2024 review; the Hotchkiss wording is read in the 2019 review." />
    </div>
  )
}
