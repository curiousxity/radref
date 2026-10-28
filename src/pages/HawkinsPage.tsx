import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { hawkinsScans } from '../data/scans/hawkins'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { hawkins, hawkinsDescriptions, hawkinsGaps, hawkinsSentence, hawkinsTypes } from '../logic/hawkins'
import type { HawkinsInput } from '../logic/hawkins'

type YesNo = 'no' | 'yes'
type Form = Record<keyof HawkinsInput, YesNo>

const initialForm: Form = { displaced: 'no', subtalar: 'no', ankle: 'no', talonavicular: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const jointQuestions: [keyof HawkinsInput, string][] = [
  ['subtalar', 'Subtalar joint subluxed or dislocated?'],
  ['ankle', 'Talar body dislocated from the ankle joint?'],
  ['talonavicular', 'Talar head subluxed or dislocated at the talonavicular joint?'],
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Hawkins LG. Fractures of the neck of the talus. J Bone Joint Surg Am. 1970;52(5):991-1002.', doi: '10.2106/00004623-197052050-00013' },
  { citation: 'Canale ST, Kelly FB Jr. Fractures of the neck of the talus. Long-term evaluation of seventy-one cases. J Bone Joint Surg Am. 1978;60(2):143-156.', doi: '10.2106/00004623-197860020-00001' },
  { citation: 'Alton T, Patton DJ, Gee AO. Classifications in brief: the Hawkins classification for talus fractures. Clin Orthop Relat Res. 2015;473(9):3046-3049.', doi: '10.1007/s11999-015-4136-x' },
]

export function HawkinsPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const input: HawkinsInput = useMemo(() => ({
    displaced: form.displaced === 'yes',
    subtalar: form.subtalar === 'yes',
    ankle: form.ankle === 'yes',
    talonavicular: form.talonavicular === 'yes',
  }), [form])
  const type = hawkins(input)
  const gaps = hawkinsGaps(input)
  const displaced = form.displaced === 'yes'

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Hawkins classification</h2>
          <span className="calc-tag">Talar neck</span>
        </div>
        <p>Type a talar neck fracture from its displacement and the joints around the talus, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the papers are paywalled, so the four types, the joints and the Hawkins sign are checked against a review of both (<Cite doi="10.1007/s11999-015-4136-x">Alton et al., Clin Orthop Relat Res 2015</Cite>). Not yet reviewed by the site author. Source: <Cite doi="10.2106/00004623-197052050-00013">Hawkins, J Bone Joint Surg Am 1970</Cite>; type IV from <Cite doi="10.2106/00004623-197860020-00001">Canale and Kelly, J Bone Joint Surg Am 1978</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Talar neck fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Fracture displaced?" layout="row" value={form.displaced} options={yesNo} onChange={(value) => setForm((current) => ({ ...current, displaced: value }))} />
            {displaced && jointQuestions.map(([key, label]) => (
              <ChoiceGroup key={key} label={label} layout="row" value={form[key]} options={yesNo} onChange={(value) => setForm((current) => ({ ...current, [key]: value }))} />
            ))}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${type === 'I' ? 'good' : type ? 'warn' : 'neutral'}`}>{type ? `Type ${type}` : 'No type'}</p>
            </div>
            <p className="result-strip-summary">{type ? `${capitalise(hawkinsDescriptions[type])}.` : 'A displaced fracture with every joint in place has no type in Hawkins\' scheme. Mark the joints that are out of place.'}</p>
            {type && gaps.length > 0 && (
              <p className="result-strip-summary">Each type includes the joint injuries of the types before it, so type {type} normally includes those of type {gaps.join(' and ')}, which are not marked. Check the images.</p>
            )}
          </div>
          {type && <CopyBlock label="Impression" text={hawkinsSentence(type)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The four types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Type</th><th>Fracture</th></tr>
            </thead>
            <tbody>
              {hawkinsTypes.map((t) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{capitalise(hawkinsDescriptions[t])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Hawkins described types I to III; Canale and Kelly added type IV. The risk of osteonecrosis of the talar body rises with the type.</p>
        <p>The Hawkins sign is a band of subchondral lucency (atrophy) under the talar dome on the AP radiograph 6 to 8 weeks after the injury. It shows that the body still has a blood supply, so osteonecrosis is unlikely; Canale and Kelly found that its absence does not reliably predict osteonecrosis. A later split of type II into IIA (subtalar joint subluxed) and IIB (dislocated) tracks the osteonecrosis risk more closely.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[hawkinsScans.type2b, hawkinsScans.type3]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Both papers are paywalled; the type wording is checked against Alton et al.'s 2015 review." />
    </div>
  )
}
