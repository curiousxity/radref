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
  { value: 'none', label: 'Aligned with the medial cuneiform' },
  { value: 'medial', label: 'Displaced medially' },
  { value: 'with-lesser', label: 'Displaced with the lesser metatarsals, in the same direction' },
]

const lesserOptions: { value: LesserRays; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'some', label: 'Some, not all four' },
  { value: 'all', label: 'All four' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const MORACIA_DOI = '10.1302/2058-5241.4.180076'
const HAMMAD_DOI = '10.1155/tsm2/3933956'
const GUPTA_DOI = '10.1067/j.cpradiol.2007.08.012'

const references: LessonReference[] = [
  { citation: 'Myerson MS, Fisher RT, Burgess AR, Kenzora JE. Fracture dislocations of the tarsometatarsal joints: end results correlated with pathology and treatment. Foot Ankle. 1986;6(5):225-242.', doi: '10.1177/107110078600600504' },
  { citation: 'Diebal AR, Westrick RB, Alitz C, Gerber JP. Lisfranc injury in a West Point cadet. Sports Health. 2013;5(3):281-285.', doi: '10.1177/1941738113477991' },
  { citation: 'Tzatzairis T, Firth G, Parker L. Adolescent Lisfranc injury treated with TightRope™: a case report and review of literature. World J Orthop. 2019;10(2):115-122.', doi: '10.5312/wjo.v10.i2.115' },
  { citation: 'Gupta RT, Wadhwa RP, Learch TJ, Herwick SM. Lisfranc injury: imaging findings for this important but often-missed diagnosis. Curr Probl Diagn Radiol. 2008;37(3):115-126.', doi: GUPTA_DOI },
  { citation: 'Moracia-Ochagavía I, Rodríguez-Merchán EC. Lisfranc fracture-dislocations: current management. EFORT Open Rev. 2019;4(7):430-444.', doi: MORACIA_DOI },
  { citation: 'Hammad A, Ahmad Y, Abdelnour J, Tscholl P. Lisfranc injuries: latest updates on diagnostics and management. Transl Sports Med. 2026;2026:3933956.', doi: HAMMAD_DOI },
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
        <p className="source-note">The paper is paywalled and its abstract does not give the types, so the types are checked against two later papers that tabulate them (<Cite doi="10.1177/1941738113477991">Diebal et al., Sports Health 2013</Cite>; <Cite doi="10.5312/wjo.v10.i2.115">Tzatzairis et al., World J Orthop 2019</Cite>); type B2 is worded by the alignment of the first metatarsal with the medial cuneiform, as a radiology review describes it (<Cite doi={GUPTA_DOI}>Gupta et al., Curr Probl Diagn Radiol 2008</Cite>). Still unchecked: whether Myerson named any displacement pattern beyond types A to C2. Type D, a later proposal, is described from two reviews. Source: <Cite doi="10.1177/107110078600600504">Myerson et al., Foot Ankle 1986</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Displacement at the tarsometatarsal joints</h3>
          <div className="form-grid">
            <ChoiceGroup label="First metatarsal" layout="stack" value={first} options={firstOptions} onChange={setFirst} />
            <ChoiceGroup label="Second to fifth metatarsals displaced (laterally, or with the first metatarsal)" layout="stack" value={lesser} options={lesserOptions} onChange={setLesser} />
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
        <p>The types describe fracture-dislocations. A subtle ligament injury has no type among Myerson's 1986 types; describe the ligaments and the alignment.</p>
        <p>A later proposed extension, not part of the original types A to C, adds type D for subtle Lisfranc injuries: D1, a distance of 2 mm or less between the medial (first) cuneiform and the base of the second metatarsal; D2, more than 2 mm, either purely ligamentous (D2L) or with a bony avulsion (D2B) (<Cite doi={MORACIA_DOI}>Moracia-Ochagavía and Rodríguez-Merchán, EFORT Open Rev 2019</Cite>). The distance is the medial cuneiform–second metatarsal interval, not the gap between the first and second metatarsals. It does not replace weight-bearing assessment of stability: these injuries rely on it, as subtle displacement may only become evident under physiological load (<Cite doi={HAMMAD_DOI}>Hammad et al., Transl Sports Med 2026</Cite>). This calculator gives types A to C2 only.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[lisfrancScans.fleck, lisfrancScans.diastasis]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled, and its abstract does not give the types; the two later papers give them in tables, and the radiology review describes type B2 by the alignment of the first metatarsal. The two reviews describe the later proposed type D." />
    </div>
  )
}
