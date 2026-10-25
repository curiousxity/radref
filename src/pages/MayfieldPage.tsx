import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { mayfield, mayfieldDescriptions, mayfieldGaps, mayfieldSentence, mayfieldStages } from '../logic/mayfield'
import type { MayfieldInput } from '../logic/mayfield'

type YesNo = 'no' | 'yes'
type Form = Record<keyof MayfieldInput, YesNo>

const initialForm: Form = { scapholunate: 'no', capitolunate: 'no', lunotriquetral: 'no', lunateDislocated: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const questions: [keyof MayfieldInput, string][] = [
  ['scapholunate', 'Scapholunate ligament disrupted (or a scaphoid fracture in its place)?'],
  ['capitolunate', 'Capitate dislocated from the lunate?'],
  ['lunotriquetral', 'Lunotriquetral ligament disrupted?'],
  ['lunateDislocated', 'Lunate dislocated from the radius?'],
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241.', doi: '10.1016/s0363-5023(80)80007-4' },
]

export function MayfieldPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const input: MayfieldInput = useMemo(() => ({
    scapholunate: form.scapholunate === 'yes',
    capitolunate: form.capitolunate === 'yes',
    lunotriquetral: form.lunotriquetral === 'yes',
    lunateDislocated: form.lunateDislocated === 'yes',
  }), [form])
  const result = mayfield(input)
  const gaps = mayfieldGaps(input)

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Mayfield classification</h2>
          <span className="calc-tag">Perilunate injury</span>
        </div>
        <p>Stage a perilunate injury, from scapholunate disruption to lunate dislocation, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the reference is matched on PubMed, and stages I (scapholunate diastasis) and IV (lunate dislocation) and the sequential progression are checked against its abstract, but the paper is paywalled, so stages II and III and the greater-arc sentence have not yet been checked. Not yet reviewed by the site author. Source: <Cite doi="10.1016/s0363-5023(80)80007-4">Mayfield et al., J Hand Surg Am 1980</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Injury around the lunate</h3>
          <div className="form-grid">
            {questions.map(([key, label]) => (
              <ChoiceGroup key={key} label={label} layout="row" value={form[key]} options={yesNo} onChange={(value) => setForm((current) => ({ ...current, [key]: value }))} />
            ))}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${result ? 'warn' : 'neutral'}`}>{result ? `Stage ${result.stage}` : 'No stage'}</p>
            </div>
            <p className="result-strip-summary">{result ? `${capitalise(result.description)}.` : 'Mark the disrupted structures.'}</p>
            {gaps.length > 0 && (
              <p className="result-strip-summary">The stages are progressive, so stage {result?.stage} normally includes the injuries of stage {gaps.join(' and ')}, which are not marked. Check the images.</p>
            )}
          </div>
          {result && <CopyBlock label="Impression" text={mayfieldSentence(result)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The four stages</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Stage</th><th>Injury</th></tr>
            </thead>
            <tbody>
              {mayfieldStages.map((stage) => (
                <tr key={stage}><td className="vessel-name">{stage}</td><td>{capitalise(mayfieldDescriptions[stage])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The injury travels around the lunate: from the scapholunate joint, through the capitolunate and lunotriquetral joints, to dislocation of the lunate itself. When the scaphoid breaks instead of the scapholunate ligament tearing, the path runs through the bone (a greater arc injury).</p>
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The paper is paywalled, so the stage wording has been checked only where the abstract states it." />
    </div>
  )
}
