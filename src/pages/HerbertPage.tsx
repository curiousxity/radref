import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { herbertDescriptions, herbertGroup, herbertSentence, herbertTypes } from '../logic/herbert'
import type { HerbertType } from '../logic/herbert'

type Timing = 'acute' | 'delayed' | 'nonunion'

const timingOptions: { value: Timing; label: string }[] = [
  { value: 'acute', label: 'Acute fracture' },
  { value: 'delayed', label: 'Delayed union' },
  { value: 'nonunion', label: 'Established non-union' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const typeOption = (type: HerbertType) => ({ value: type, label: `${type}: ${herbertDescriptions[type]}` })

const acuteOptions = (['A1', 'A2', 'B1', 'B2', 'B3', 'B4'] as HerbertType[]).map(typeOption)
const nonunionOptions = (['D1', 'D2'] as HerbertType[]).map(typeOption)

const references: LessonReference[] = [
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
        <p className="source-note">Unchecked draft: the reference is matched on PubMed, but the paper is paywalled and its abstract names only acute unstable fractures, delayed healing and established non-union, so the wording of each type has not yet been checked. Not yet reviewed by the site author. Source: <Cite doi="10.1302/0301-620X.66B1.6693468">Herbert and Fisher, J Bone Joint Surg Br 1984</Cite>.</p>
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
          <CopyBlock label="Report text" text={herbertSentence(type)} />
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
        <p>Later versions add a comminuted type (B5); this page keeps to the original types until the paper is checked.</p>
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled, so the type wording has been checked only where the abstract states it." />
    </div>
  )
}
