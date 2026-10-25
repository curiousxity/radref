import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { lichtman, lichtmanDescriptions, lichtmanSentence, lichtmanStages } from '../logic/lichtman'

type YesNo = 'no' | 'yes'
type Form = { abnormal: YesNo; sclerosis: YesNo; collapse: YesNo; carpalCollapse: YesNo; arthritis: YesNo }

const initialForm: Form = { abnormal: 'no', sclerosis: 'no', collapse: 'no', carpalCollapse: 'no', arthritis: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Lichtman DM, Mack GR, MacDonald RI, Gunther SF, Wilson JN. Kienböck\'s disease: the role of silicone replacement arthroplasty. J Bone Joint Surg Am. 1977;59(7):899-908.', doi: '10.2106/00004623-197759070-00011' },
]

export function LichtmanPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const update = (key: keyof Form) => (value: YesNo) => setForm((current) => ({ ...current, [key]: value }))
  const stage = lichtman({
    abnormal: form.abnormal === 'yes',
    sclerosis: form.sclerosis === 'yes',
    collapse: form.collapse === 'yes',
    carpalCollapse: form.collapse === 'yes' ? form.carpalCollapse === 'yes' : undefined,
    arthritis: form.arthritis === 'yes',
  })

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Kienböck disease (Lichtman)</h2>
          <span className="calc-tag">Lunate</span>
        </div>
        <p>Stage lunate osteonecrosis from the imaging findings, with copyable report text. The stages are clinical and radiographic; stage I has normal radiographs.</p>
        <p className="source-note">Unchecked draft: the reference is matched on PubMed, but the paper is paywalled and its abstract says only that four clinical and radiographic stages were identified, so the stage wording, and who split stage III into IIIA and IIIB, have not yet been checked. Not yet reviewed by the site author. Source: <Cite doi="10.2106/00004623-197759070-00011">Lichtman et al., J Bone Joint Surg Am 1977</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Findings</h3>
          <div className="form-grid">
            <ChoiceGroup label="Lunate abnormal on imaging?" layout="row" value={form.abnormal} options={yesNo} onChange={update('abnormal')} />
            <ChoiceGroup label="Lunate sclerosis on radiographs?" layout="row" value={form.sclerosis} options={yesNo} onChange={update('sclerosis')} />
            <ChoiceGroup label="Lunate collapse?" layout="row" value={form.collapse} options={yesNo} onChange={update('collapse')} />
            {form.collapse === 'yes' && (
              <ChoiceGroup label="Carpal collapse (fixed scaphoid rotation, loss of carpal height)?" layout="row" value={form.carpalCollapse} options={yesNo} onChange={update('carpalCollapse')} />
            )}
            <ChoiceGroup label="Radiocarpal or midcarpal degenerative changes?" layout="row" value={form.arthritis} options={yesNo} onChange={update('arthritis')} />
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${stage ? 'warn' : 'neutral'}`}>{stage ? `Stage ${stage}` : 'No stage'}</p>
            </div>
            <p className="result-strip-summary">{stage ? `${capitalise(lichtmanDescriptions[stage])}.` : 'Mark the lunate findings.'}</p>
          </div>
          {stage && <CopyBlock label="Impression" text={lichtmanSentence(stage)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The stages</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Stage</th><th>Findings</th></tr>
            </thead>
            <tbody>
              {lichtmanStages.map((s) => (
                <tr key={s}><td className="vessel-name">{s}</td><td>{capitalise(lichtmanDescriptions[s])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The 1977 paper had stages I to IV; stage III was later split into IIIA and IIIB by whether the carpus has collapsed. Some later versions add a IIIC (a coronal fracture of the lunate), which this page leaves out until the sources are checked.</p>
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled, so the stage wording has been checked only where the abstract states it." />
    </div>
  )
}
