import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from '../logic/herbert'
import type { HerbertType } from '../logic/herbert'
import { ScanFigures } from '../components/ScanFigures'
import { herbertScans } from '../data/scans/herbert'

type Timing = 'acute' | 'delayed' | 'nonunion'

const timingOptions: { value: Timing; label: string }[] = [
  { value: 'acute', label: 'Acute fracture' },
  { value: 'delayed', label: 'Delayed union' },
  { value: 'nonunion', label: 'Established non-union' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const typeOption = (type: HerbertType) => ({ value: type, label: `${type}: ${herbertDescriptions[type]}` })

const acuteOptions = herbertTypes.filter((type) => /^[AB]/.test(type)).map(typeOption)
const nonunionOptions = herbertTypes.filter((type) => type.startsWith('D')).map(typeOption)

const references: LessonReference[] = [
  { citation: 'Dráč P, Kastelec M, Suarez FA. Classifications for fractures of carpal bones: Herbert classification for scaphoid fractures. AO Surgery Reference (surgeryreference.aofoundation.org), AO Foundation; accessed 2026-10-25.' },
  { citation: 'Herbert TJ, Fisher WE. Management of the fractured scaphoid using a new bone screw. J Bone Joint Surg Br. 1984;66(1):114-123.', doi: '10.1302/0301-620X.66B1.6693468' },
]

export function HerbertPage() {
  const [timing, setTiming] = useState<Timing>('acute')
  const [acute, setAcute] = useState<HerbertType>('B2')
  const [nonunion, setNonunion] = useState<HerbertType>('D1')
  const type: HerbertType = timing === 'acute' ? acute : timing === 'delayed' ? 'C' : nonunion
  const group = herbertGroup(type)

  function reset() {
    setTiming('acute')
    setAcute('B2')
    setNonunion('D1')
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Scaphoid fracture (Herbert)</h2>
          <span className="calc-tag">Scaphoid</span>
        </div>
        <p>Type a scaphoid fracture as stable, unstable, delayed union or non-union, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the 1984 paper is paywalled, so the types are checked against AO Surgery Reference's Herbert classification page, which follows Herbert's 1990 book and includes B5, a comminuted fracture. Source: <Cite doi="10.1302/0301-620X.66B1.6693468">Herbert and Fisher, J Bone Joint Surg Br 1984</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Stage" layout="stack" value={timing} options={timingOptions} onChange={setTiming} />
            {timing === 'acute' && <ChoiceGroup label="Acute fracture pattern" layout="stack" value={acute} options={acuteOptions} onChange={setAcute} />}
            {timing === 'nonunion' && <ChoiceGroup label="Non-union" layout="stack" value={nonunion} options={nonunionOptions} onChange={setNonunion} />}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${group === 'acute stable' ? 'good' : 'warn'}`}>Type {type}</p>
            </div>
            <p className="result-strip-summary">{capitalise(group)}: {herbertDescriptions[type]}.</p>
          </div>
          <CopyBlock label="Impression" text={herbertSentence(type)} />
          <button type="button" className="reset-button" onClick={reset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Type</th><th>Group</th><th>Fracture</th></tr>
            </thead>
            <tbody>
              {herbertTypes.map((t) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{capitalise(herbertGroup(t))}</td><td>{capitalise(herbertDescriptions[t])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[herbertScans.typeA1, herbertScans.typeA2, herbertScans.typeB1, herbertScans.typeB2, herbertScans.typeB3, herbertScans.typeB4, herbertScans.typeD2]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The 1984 paper is paywalled; the types follow AO Surgery Reference's Herbert page." />
    </div>
  )
}
