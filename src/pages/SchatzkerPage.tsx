import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { schatzker, schatzkerDescriptions, schatzkerSentence, schatzkerTypes } from '../logic/schatzker'
import type { DepressionSite, LateralPattern, Plateau } from '../logic/schatzker'

type Form = {
  dissociation: 'no' | 'yes'
  plateau: Plateau
  pattern: LateralPattern
  depressionSite: DepressionSite | 'unstated'
  depression: string
}

const initialForm: Form = { dissociation: 'no', plateau: 'lateral', pattern: 'split', depressionSite: 'unstated', depression: '' }

const dissociationOptions: { value: Form['dissociation']; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const plateauOptions: { value: Plateau; label: string }[] = [
  { value: 'lateral', label: 'Lateral only' },
  { value: 'medial', label: 'Medial only' },
  { value: 'both', label: 'Both (bicondylar)' },
]

const patternOptions: { value: LateralPattern; label: string }[] = [
  { value: 'split', label: 'Split only' },
  { value: 'split-depression', label: 'Split with depression' },
  { value: 'depression', label: 'Depression only' },
]

// SZ-3: Markhardt's IIIA (lateral) and IIIB (central).
const depressionSiteOptions: { value: Form['depressionSite']; label: string }[] = [
  { value: 'unstated', label: 'Not stated' },
  { value: 'lateral', label: 'Lateral (IIIA)' },
  { value: 'central', label: 'Central (IIIB)' },
]

const MARKHARDT_DOI = '10.1148/rg.292085078'

/** Matched on PubMed. Schatzker 1979 has no DOI on Crossref, so it has none here. */
const references: LessonReference[] = [
  { citation: 'Schatzker J, McBroom R, Bruce D. The tibial plateau fracture. The Toronto experience 1968-1975. Clin Orthop Relat Res. 1979;(138):94-104.' },
  { citation: 'Zeltser DW, Leopold SS. Classifications in brief: Schatzker classification of tibial plateau fractures. Clin Orthop Relat Res. 2013;471(2):371-374.', doi: '10.1007/s11999-012-2451-z' },
  { citation: 'Markhardt BK, Gross JM, Monu JU. Schatzker classification of tibial plateau fractures: use of CT and MR imaging improves assessment. Radiographics. 2009;29(2):585-597.', doi: MARKHARDT_DOI },
]

export function SchatzkerPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const depressionMm = form.depression.trim() === '' || !Number.isFinite(Number(form.depression)) ? undefined : Number(form.depression)
  const result = useMemo(
    () => schatzker({
      plateau: form.plateau,
      pattern: form.pattern,
      depressionSite: form.depressionSite === 'unstated' ? undefined : form.depressionSite,
      dissociation: form.dissociation === 'yes',
    }),
    [form.plateau, form.pattern, form.depressionSite, form.dissociation],
  )

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Schatzker classification</h2>
          <span className="calc-tag">Tibial plateau</span>
        </div>
        <p>Type a tibial plateau fracture from a few questions, with copyable report text.</p>
        <p className="source-note">Unchecked draft: Schatzker's 1979 paper has no abstract and is paywalled, so the types are checked against Markhardt 2009's abstract and a later review (<Cite doi="10.1007/s11999-012-2451-z">Zeltser and Leopold, Clin Orthop Relat Res 2013</Cite>). Not yet reviewed by the site author. Sources: Schatzker et al., Clin Orthop Relat Res 1979; <Cite doi={MARKHARDT_DOI}>Markhardt et al., Radiographics 2009</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Does the fracture separate the metaphysis from the diaphysis?" layout="row" value={form.dissociation} options={dissociationOptions} onChange={(value) => update('dissociation', value)} />
            <ChoiceGroup label="Which plateau is broken?" layout="stack" value={form.plateau} options={plateauOptions} onChange={(value) => update('plateau', value)} />
            {form.plateau === 'lateral' && (
              <ChoiceGroup label="Lateral plateau pattern" layout="stack" value={form.pattern} options={patternOptions} onChange={(value) => update('pattern', value)} />
            )}
            {form.plateau === 'lateral' && form.pattern === 'depression' && (
              <ChoiceGroup label="Where is the depression?" layout="stack" value={form.depressionSite} options={depressionSiteOptions} onChange={(value) => update('depressionSite', value)} />
            )}
            <label>
              <span>Articular depression (optional, mm)</span>
              <input type="number" step="1" min="0" inputMode="decimal" value={form.depression} onChange={(e) => update('depression', e.target.value)} placeholder="e.g. 6" />
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          {result && (
            <>
              <div className="result-strip">
                <div className="result-strip-head">
                  <p className="result-strip-value tone-warn">Schatzker {result.type}</p>
                </div>
                <p className="result-strip-summary">{result.description.charAt(0).toUpperCase() + result.description.slice(1)}.</p>
              </div>
              <CopyBlock label="Impression" text={schatzkerSentence(result, depressionMm)} />
            </>
          )}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The six types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Fracture</th>
              </tr>
            </thead>
            <tbody>
              {schatzkerTypes.map((type) => (
                <tr key={type}>
                  <td className="vessel-name">{type}</td>
                  <td>{schatzkerDescriptions[type].charAt(0).toUpperCase() + schatzkerDescriptions[type].slice(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Type III is split by where the depression sits: lateral (IIIA) or central (IIIB) (<Cite doi={MARKHARDT_DOI}>Markhardt et al., Radiographics 2009</Cite>). Dissociation of the metaphysis from the diaphysis makes a fracture type VI, whichever plateaus are broken. Zeltser and Leopold's review gives type IV as a split of the medial plateau; this page counts any medial plateau fracture as type IV, as Markhardt's "medial plateau fracture" does.</p>
        <p>CT and MRI are more accurate than radiographs for Schatzker typing, and surgical plans made from radiographs were changed after CT or MRI (<Cite doi={MARKHARDT_DOI}>Markhardt et al., Radiographics 2009</Cite>).</p>
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Schatzker's 1979 paper has no abstract or DOI, so the types are checked against Markhardt's abstract and Zeltser and Leopold's review." />
    </div>
  )
}
