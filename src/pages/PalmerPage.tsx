import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { palmerClasses, palmerDescriptions, palmerKind, palmerSentence } from '../logic/palmer'
import type { PalmerClass } from '../logic/palmer'
import { ScanFigures } from '../components/ScanFigures'
import { palmerScans } from '../data/scans/palmer'

type Kind = 'traumatic' | 'degenerative'

const kindOptions: { value: Kind; label: string }[] = [
  { value: 'traumatic', label: 'Traumatic (class 1)' },
  { value: 'degenerative', label: 'Degenerative (class 2)' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const classOption = (c: PalmerClass) => ({ value: c, label: `${c}: ${palmerDescriptions[c]}` })

const traumaticOptions = palmerClasses.filter((c) => palmerKind(c) === 'traumatic').map(classOption)
const degenerativeOptions = palmerClasses.filter((c) => palmerKind(c) === 'degenerative').map(classOption)

const references: LessonReference[] = [
  { citation: 'Palmer AK. Triangular fibrocartilage complex lesions: a classification. J Hand Surg Am. 1989;14(4):594-606.', doi: '10.1016/0363-5023(89)90174-3' },
  { citation: 'von Borstel D, Wang M, Small K, Nozaki T, Yoshioka H. High-resolution 3T MR imaging of the triangular fibrocartilage complex. Magn Reson Med Sci. 2017;16(1):3-15.', doi: '10.2463/mrms.rev.2016-0011' },
  { citation: 'Vassa R, Garg A, Omar IM. Magnetic resonance imaging of the wrist and hand. Pol J Radiol. 2020;85:e461-e488.', doi: '10.5114/pjr.2020.99034' },
  { citation: 'McNamara CT, Colakoglu S, Iorio ML. A systematic review and analysis of Palmer type I triangular fibrocartilage complex injuries: outcomes of treatment. J Hand Microsurg. 2020;12(2):116-122.', doi: '10.1055/s-0040-1713580' },
]

export function PalmerPage() {
  const [kind, setKind] = useState<Kind>('traumatic')
  const [traumatic, setTraumatic] = useState<PalmerClass>('1A')
  const [degenerative, setDegenerative] = useState<PalmerClass>('2A')
  const selected = kind === 'traumatic' ? traumatic : degenerative

  function reset() {
    setKind('traumatic')
    setTraumatic('1A')
    setDegenerative('2A')
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Palmer TFCC classification</h2>
          <span className="calc-tag">TFCC</span>
        </div>
        <p>Class a triangular fibrocartilage complex lesion as traumatic or degenerative, with copyable report text.</p>
        <p className="source-note">The paper is paywalled, so the classes are checked against a review that reproduces Palmer's table (<Cite doi="10.2463/mrms.rev.2016-0011">von Borstel et al., Magn Reson Med Sci 2017</Cite>), and 1B and 1C use the table's labels. Source: <Cite doi="10.1016/0363-5023(89)90174-3">Palmer, J Hand Surg Am 1989</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Lesion</h3>
          <div className="form-grid">
            <ChoiceGroup label="Cause" layout="row" value={kind} options={kindOptions} onChange={setKind} />
            {kind === 'traumatic'
              ? <ChoiceGroup label="Traumatic lesion" layout="stack" value={traumatic} options={traumaticOptions} onChange={setTraumatic} />
              : <ChoiceGroup label="Degenerative stage" layout="stack" value={degenerative} options={degenerativeOptions} onChange={setDegenerative} />}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className="result-strip-value tone-warn">Palmer {selected}</p>
            </div>
            <p className="result-strip-summary">{capitalise(palmerKind(selected))}: {palmerDescriptions[selected]}.</p>
          </div>
          <CopyBlock label="Impression" text={palmerSentence(selected)} />
          <button type="button" className="reset-button" onClick={reset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The classes</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Class</th><th>Lesion</th></tr>
            </thead>
            <tbody>
              {palmerClasses.map((c) => (
                <tr key={c}><td className="vessel-name">{c}</td><td>{capitalise(palmerDescriptions[c])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>1B and 1C carry the labels of Palmer's table: 1B ulnar avulsion, with or without a distal ulnar fracture, and 1C distal avulsion (<Cite doi="10.2463/mrms.rev.2016-0011">von Borstel et al., Magn Reson Med Sci 2017</Cite>). The carpal attachments torn in 1C are those at the lunate and triquetrum, through the ulnolunate and ulnotriquetral ligaments (<Cite doi="10.5114/pjr.2020.99034">Vassa et al., Pol J Radiol 2020</Cite>). A systematic review words 1B more narrowly, as ulnar avulsion with or without an ulnar styloid fracture (<Cite doi="10.1055/s-0040-1713580">McNamara et al., J Hand Microsurg 2020</Cite>); this page keeps the table's distal ulnar fracture.</p>
        <p>Class 2 lesions are stages of ulnocarpal abutment, each including the one before it (<Cite doi="10.1016/0363-5023(89)90174-3">Palmer, J Hand Surg Am 1989</Cite>; <Cite doi="10.2463/mrms.rev.2016-0011">von Borstel et al., Magn Reson Med Sci 2017</Cite>).</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[palmerScans.class1a, palmerScans.class1b, palmerScans.class1c, palmerScans.class1d, palmerScans.class2d]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled; the class wording is checked against von Borstel and colleagues' reproduction of its table." />
    </div>
  )
}
