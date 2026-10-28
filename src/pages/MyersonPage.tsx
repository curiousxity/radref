import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { lisfrancScans } from '../data/scans/lisfranc'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { myerson, myersonDescriptions, myersonGroup, myersonSentence, myersonTypes } from '../logic/myerson'
import type { FirstRay, LesserRays } from '../logic/myerson'

const firstOptions: { value: FirstRay; label: string }[] = [
  { value: 'none', label: 'In place' },
  { value: 'medial', label: 'Displaced medially' },
  { value: 'with-lesser', label: 'Displaced with the lesser metatarsals, in the same direction' },
]

const lesserOptions: { value: LesserRays; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'some', label: 'Some of them' },
  { value: 'all', label: 'All four' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242.', doi: '10.1177/107110078600600504' },
]

export function MyersonPage() {
  const [first, setFirst] = useState<FirstRay>('none')
  const [lesser, setLesser] = useState<LesserRays>('none')
  const type = myerson({ first, lesser })

  function reset() {
    setFirst('none')
    setLesser('none')
  }

  const empty = first === 'none' && lesser === 'none'

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Myerson classification</h2>
          <span className="calc-tag">Lisfranc</span>
        </div>
        <p>Type a tarsometatarsal (Lisfranc) fracture-dislocation from which metatarsals are displaced and which way, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the reference is matched on PubMed, but the paper is paywalled and its abstract does not give the types, so the wording of every type has not yet been checked against it. Not yet reviewed by the site author. Source: <Cite doi="10.1177/107110078600600504">Myerson et al., Foot Ankle 1986</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Displacement at the tarsometatarsal joints</h3>
          <div className="form-grid">
            <ChoiceGroup label="First metatarsal" layout="stack" value={first} options={firstOptions} onChange={setFirst} />
            <ChoiceGroup label="Second to fifth metatarsals displaced (laterally or dorsoplantar)" layout="stack" value={lesser} options={lesserOptions} onChange={setLesser} />
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${type ? 'warn' : 'neutral'}`}>{type ? `Type ${type}` : 'No type'}</p>
            </div>
            <p className="result-strip-summary">
              {type ? `${capitalise(myersonGroup(type))}: ${myersonDescriptions[type]}.` : empty ? 'Mark the displaced metatarsals.' : 'Myerson named no type for this pattern. Check the images and describe the displacement.'}
            </p>
          </div>
          {type && <CopyBlock label="Impression" text={myersonSentence(type)} />}
          <button type="button" className="reset-button" onClick={reset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Type</th><th>Group</th><th>Displacement</th></tr>
            </thead>
            <tbody>
              {myersonTypes.map((t) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{capitalise(myersonGroup(t))}</td><td>{capitalise(myersonDescriptions[t])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The types describe fracture-dislocations. A subtle ligament injury without displacement has no Myerson type; describe the ligaments and the alignment instead.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[lisfrancScans.fleck, lisfrancScans.diastasis]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled, and its abstract does not give the types." />
    </div>
  )
}
