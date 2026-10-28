import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { sandersScans } from '../data/scans/sanders'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { sanders, sandersDescription, sandersGroupDescriptions, sandersLineDescriptions, sandersLines, sandersSentence } from '../logic/sanders'
import type { SandersInput, SandersLine } from '../logic/sanders'

type YesNo = 'no' | 'yes'
type Form = { displaced: YesNo; comminuted: YesNo } & Record<SandersLine, YesNo>

const initialForm: Form = { displaced: 'no', comminuted: 'no', A: 'no', B: 'no', C: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const tableRows: [string, string][] = [
  ['I', capitalise(sandersGroupDescriptions.I)],
  ['II (IIA, IIB, IIC)', `${capitalise(sandersGroupDescriptions.II)}; the letter names the line`],
  ['III (IIIAB, IIIAC, IIIBC)', `${capitalise(sandersGroupDescriptions.III)}; the letters name the two lines`],
  ['IV', capitalise(sandersGroupDescriptions.IV)],
]

const references: LessonReference[] = [
  { citation: 'Sanders R, Fortin P, DiPasquale T, Walling A. Operative treatment in 120 displaced intraarticular calcaneal fractures. Results using a prognostic computed tomography scan classification. Clin Orthop Relat Res. 1993;(290):87-95.', doi: '10.1097/00003086-199305000-00012' },
  { citation: 'Jiménez-Almonte JH, King JD, Luo TD, Aneja A, Moghadamian E. Classifications in brief: Sanders classification of intraarticular fractures of the calcaneus. Clin Orthop Relat Res. 2019;477(2):467-471.', doi: '10.1097/CORR.0000000000000539' },
]

export function SandersPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const input: SandersInput = useMemo(() => ({
    displaced: form.displaced === 'yes',
    comminuted: form.comminuted === 'yes',
    lines: sandersLines.filter((line) => form[line] === 'yes'),
  }), [form])
  const type = sanders(input)
  const set = (key: keyof Form) => (value: YesNo) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Sanders classification</h2>
          <span className="calc-tag">Calcaneus</span>
        </div>
        <p>Type an intra-articular calcaneal fracture from the fracture lines through the posterior facet on coronal CT, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the paper is paywalled, so the four types are worded as in its abstract, and the widest-facet image, the A, B and C lines, the subtype letters and the 2 mm are checked against a later review (<Cite doi="10.1097/CORR.0000000000000539">Jiménez-Almonte et al., Clin Orthop Relat Res 2019</Cite>). Not yet reviewed by the site author. Source: <Cite doi="10.1097/00003086-199305000-00012">Sanders et al., Clin Orthop Relat Res 1993</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Posterior facet, on the coronal CT image where it is widest</h3>
          <div className="form-grid">
            {sandersLines.map((line) => (
              <ChoiceGroup key={line} label={`Fracture line ${line} (${sandersLineDescriptions[line]})?`} layout="row" value={form[line]} options={yesNo} onChange={set(line)} />
            ))}
            <ChoiceGroup label="Comminuted, four or more articular fragments?" layout="row" value={form.comminuted} options={yesNo} onChange={set('comminuted')} />
            <ChoiceGroup label="Any articular fragment displaced more than 2 mm?" layout="row" value={form.displaced} options={yesNo} onChange={set('displaced')} />
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${type === 'I' ? 'good' : type ? 'warn' : 'neutral'}`}>{type ? `Type ${type}` : 'No type'}</p>
            </div>
            <p className="result-strip-summary">{type ? `${capitalise(sandersDescription(type))}.` : 'Mark the fracture lines through the posterior facet.'}</p>
          </div>
          {type && <CopyBlock label="Impression" text={sandersSentence(type)} />}
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
              {tableRows.map(([t, text]) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{text}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Sanders read the coronal CT image where the undersurface of the posterior facet is widest. Three lines, A, B and C from lateral to medial, split the facet into lateral, central and medial columns, with the sustentaculum medial to line C. The type counts the parts; the letters say where the lines run.</p>
        <p>The 1993 paper gave no displacement figure for type I; it advised surgery from 3 mm of articular displacement. The 2 mm used here is the later review's: type I is displaced 2 mm or less.</p>
        <p>Sanders found that the outcome after surgery worsened as the type rose: excellent or good results in 73% of type II, 70% of type III and 9% of type IV fractures.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[sandersScans.type2, sandersScans.type3, sandersScans.type4]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The 1993 paper is paywalled; what its abstract does not state is checked against the 2019 review." />
    </div>
  )
}
