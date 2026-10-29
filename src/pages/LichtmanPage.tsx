import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { lichtmanScans } from '../data/scans/lichtman'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { lichtman, lichtmanDescriptions, lichtmanSentence, lichtmanStages } from '../logic/lichtman'

type YesNo = 'no' | 'yes'
type Form = { abnormal: YesNo; sclerosis: YesNo; collapse: YesNo; carpalCollapse: YesNo; coronalFracture: YesNo; arthritis: YesNo }

const initialForm: Form = { abnormal: 'no', sclerosis: 'no', collapse: 'no', carpalCollapse: 'no', coronalFracture: 'no', arthritis: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Kennedy C, Abrams R. In brief: the Lichtman classification for Kienböck disease. Clin Orthop Relat Res. 2019;477(6):1516-1520.', doi: '10.1097/CORR.0000000000000595' },
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
    coronalFracture: form.coronalFracture === 'yes',
    arthritis: form.arthritis === 'yes',
  })

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Kienböck disease (Lichtman)</h2>
          <span className="calc-tag">Lunate</span>
        </div>
        <p>Stage lunate osteonecrosis from the imaging findings, with copyable report text. Stage I has normal radiographs; MRI shows decreased T1 signal in the lunate.</p>
        <p className="source-note">The 1977 paper is paywalled, so the stage wording, the IIIA and IIIB split and stage IIIC are checked against a review of the classification and its later changes (<Cite doi="10.1097/CORR.0000000000000595">Kennedy and Abrams, Clin Orthop Relat Res 2019</Cite>). Source: <Cite doi="10.2106/00004623-197759070-00011">Lichtman et al., J Bone Joint Surg Am 1977</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Findings</h3>
          <div className="form-grid">
            <ChoiceGroup label="Lunate abnormal on imaging?" layout="row" value={form.abnormal} options={yesNo} onChange={update('abnormal')} />
            <ChoiceGroup label="Increased lunate density (sclerosis) on radiographs?" layout="row" value={form.sclerosis} options={yesNo} onChange={update('sclerosis')} />
            <ChoiceGroup label="Lunate collapse?" layout="row" value={form.collapse} options={yesNo} onChange={update('collapse')} />
            {form.collapse === 'yes' && (
              <ChoiceGroup label="Fixed scaphoid rotation (radioscaphoid angle over 60°)?" layout="row" value={form.carpalCollapse} options={yesNo} onChange={update('carpalCollapse')} />
            )}
            {form.collapse === 'yes' && (
              <ChoiceGroup label="Coronal fracture of the lunate?" layout="row" value={form.coronalFracture} options={yesNo} onChange={update('coronalFracture')} />
            )}
            <ChoiceGroup label="Pancarpal arthritis, including the radiocarpal joint?" layout="row" value={form.arthritis} options={yesNo} onChange={update('arthritis')} />
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
        <p>The 1977 paper had stages I to IV. In 1993 stage III was split into IIIA and IIIB by fixed scaphoid rotation, measured as a radioscaphoid angle under or over 60° on a true lateral radiograph; stage I then gained decreased T1 signal on MRI. Stage IIIC, a coronal fracture of the lunate, was added later, because Lichtman found these patients had a poorer prognosis. In 2010 Lichtman also proposed a stage 0: pain on exertion with normal radiographs and MRI. Stage IV is Kienböck disease advanced collapse (KDAC).</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[lichtmanScans.stage1, lichtmanScans.stage2, lichtmanScans.stage3a, lichtmanScans.stage3b, lichtmanScans.stage4]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The 1977 paper is paywalled; the stage wording follows Kennedy and Abrams's 2019 review." />
    </div>
  )
}
