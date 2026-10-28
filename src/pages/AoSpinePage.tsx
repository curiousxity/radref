import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { spineTraumaScans } from '../data/scans/spineTrauma'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { aoCode, aoDescription, aoDescriptions, aoFacetCode, aoFacetDescriptions, aoFacets, aoGroup, aoModifiers, aoNeuroDescription, aoNeuros, aoSentence, aoSpine, aoTypes } from '../logic/aospine'
import type { AoFacet, AoNeuro, AoRegion, PosteriorTensionBand } from '../logic/aospine'

type YesNo = 'no' | 'yes'
type Endplates = '0' | '1' | '2'
type FacetChoice = 'none' | AoFacet

type Form = {
  region: AoRegion
  translation: YesNo
  anterior: YesNo
  posterior: PosteriorTensionBand
  endplates: Endplates
  wall: YesNo
  process: YesNo
  right: FacetChoice
  left: FacetChoice
  neuro: AoNeuro | 'unknown'
  compression: YesNo
  modifiers: string[]
}

const initialForm: Form = {
  region: 'thoracolumbar',
  translation: 'no',
  anterior: 'no',
  posterior: 'intact',
  endplates: '0',
  wall: 'no',
  process: 'no',
  right: 'none',
  left: 'none',
  neuro: 'unknown',
  compression: 'no',
  modifiers: [],
}

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const regionOptions: { value: AoRegion; label: string }[] = [
  { value: 'subaxial', label: 'Subaxial cervical (C3–C7)' },
  { value: 'thoracolumbar', label: 'Thoracolumbar' },
]

const posteriorOptions: { value: PosteriorTensionBand; label: string }[] = [
  { value: 'intact', label: 'Intact' },
  { value: 'bony', label: 'Disrupted through bone only, at one level (Chance)' },
  { value: 'ligamentous', label: 'Disrupted through the ligaments, or through bone and ligament' },
]

const endplateOptions: { value: Endplates; label: string }[] = [
  { value: '0', label: 'None' },
  { value: '1', label: 'One' },
  { value: '2', label: 'Both' },
]

const facetOptions: { value: FacetChoice; label: string }[] = [
  { value: 'none', label: 'No facet injury' },
  ...aoFacets.map((f) => ({ value: f, label: `${f}: ${aoFacetDescriptions[f]}` })),
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Vaccaro AR, Oner C, Kepler CK, Dvorak M, Schnake K, Bellabarba C, Reinhold M, Aarabi B, Kandziora F, Chapman J, Shanmuganathan R, Fehlings M, Vialle L. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037.', doi: '10.1097/BRS.0b013e3182a8a381' },
  { citation: 'Vaccaro AR, Koerner JD, Radcliff KE, Oner FC, Reinhold M, Schnake KJ, Kandziora F, Fehlings MG, Dvorak MF, Aarabi B, Rajasekaran S, Schroeder GD, Kepler CK, Vialle LR. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184.', doi: '10.1007/s00586-015-3831-3' },
]

export function AoSpinePage() {
  const [form, setForm] = useState<Form>(initialForm)
  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => setForm((current) => ({ ...current, [key]: value }))

  const subaxial = form.region === 'subaxial'
  const morphology = aoSpine({
    translation: form.translation === 'yes',
    anteriorTensionBand: form.anterior === 'yes',
    posteriorTensionBand: form.posterior,
    endplates: Number(form.endplates) as 0 | 1 | 2,
    posteriorWall: form.endplates !== '0' && form.wall === 'yes',
    processFracture: form.process === 'yes',
  })
  const facet = subaxial ? aoFacetCode(form.right === 'none' ? undefined : form.right, form.left === 'none' ? undefined : form.left) : ''
  const modifiers = Object.keys(aoModifiers[form.region]).filter((m) => form.modifiers.includes(m))
  const neuro = form.neuro === 'unknown' ? undefined : form.neuro
  const full = (morphology || facet) ? {
    region: form.region,
    morphology,
    ...(facet ? { facet } : {}),
    ...(neuro ? { neuro } : {}),
    compression: form.compression === 'yes',
    modifiers,
  } : undefined

  const neuroOptions: { value: AoNeuro | 'unknown'; label: string }[] = [
    { value: 'unknown', label: 'Not given' },
    ...aoNeuros.map((n) => ({ value: n, label: `${n}: ${aoNeuroDescription(n)}` })),
  ]
  const modifierOptions = Object.entries(aoModifiers[form.region])
  const toggleModifier = (m: string) => (value: YesNo) =>
    setForm((current) => ({ ...current, modifiers: value === 'yes' ? [...current.modifiers.filter((x) => x !== m), m] : current.modifiers.filter((x) => x !== m) }))

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>AO Spine classification</h2>
          <span className="calc-tag">Spine trauma</span>
        </div>
        <p>Classify a subaxial cervical or thoracolumbar injury by morphology, with facet injuries in the neck, neurology and modifiers, and copyable report text.</p>
        <p className="source-note">Unchecked draft: the papers are paywalled. The types, facet grades, neurology grades, modifiers and notation are checked against AO Spine's own posters for both systems (below). Not yet reviewed by the site author. Sources: <Cite doi="10.1097/BRS.0b013e3182a8a381">Vaccaro et al., Spine 2013</Cite> (thoracolumbar); <Cite doi="10.1007/s00586-015-3831-3">Vaccaro et al., Eur Spine J 2016</Cite> (subaxial cervical).</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Injury</h3>
          <div className="form-grid">
            <ChoiceGroup label="Region" layout="stack" value={form.region} options={regionOptions} onChange={(value) => setForm((current) => ({ ...current, region: value, modifiers: [] }))} />
            <ChoiceGroup label="Displacement or dislocation (translation)?" layout="row" value={form.translation} options={yesNo} onChange={set('translation')} />
            <ChoiceGroup label="Anterior tension band disrupted (hyperextension)?" layout="row" value={form.anterior} options={yesNo} onChange={set('anterior')} />
            <ChoiceGroup label="Posterior tension band" layout="stack" value={form.posterior} options={posteriorOptions} onChange={set('posterior')} />
            <ChoiceGroup label="Vertebral body endplates fractured" layout="row" value={form.endplates} options={endplateOptions} onChange={set('endplates')} />
            {form.endplates !== '0' && <ChoiceGroup label="Posterior wall fractured?" layout="row" value={form.wall} options={yesNo} onChange={set('wall')} />}
            {form.endplates === '0' && <ChoiceGroup label={subaxial ? 'Isolated lamina or spinous process fractured?' : 'Transverse or spinous process fractured?'} layout="row" value={form.process} options={yesNo} onChange={set('process')} />}
            {subaxial && <ChoiceGroup label="Right facet" layout="stack" value={form.right} options={facetOptions} onChange={set('right')} />}
            {subaxial && <ChoiceGroup label="Left facet" layout="stack" value={form.left} options={facetOptions} onChange={set('left')} />}
            <ChoiceGroup label="Neurology (from the examination)" layout="stack" value={form.neuro} options={neuroOptions} onChange={set('neuro')} />
            {form.neuro !== 'unknown' && <ChoiceGroup label="Continued spinal cord compression?" layout="row" value={form.compression} options={yesNo} onChange={set('compression')} />}
            {modifierOptions.map(([m, text]) => (
              <ChoiceGroup key={`${form.region}-${m}`} label={`${m}: ${text}?`} layout="row" value={form.modifiers.includes(m) ? 'yes' : 'no'} options={yesNo} onChange={toggleModifier(m)} />
            ))}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${morphology ? (morphology.type === 'A0' ? 'good' : 'warn') : 'neutral'}`}>{full ? aoCode(full) : 'No type'}</p>
            </div>
            <p className="result-strip-summary">
              {full && morphology ? `${capitalise(aoGroup(morphology.type))}: ${aoDescription(full)}.` : (facet ? 'Facet injury only, with no type A, B or C injury: written facets first.' : 'No injury entered: mark a fracture or a tension band injury.')}
            </p>
          </div>
          {full && <CopyBlock label="Impression" text={aoSentence(full)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Morphology</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Type</th><th>Injury</th></tr>
            </thead>
            <tbody>
              {aoTypes.map((t) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{capitalise(aoDescriptions[t])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>The most severe injury names the type: C over B3 over B2 over B1 over A. A B or C injury also carries its type A fracture, classified separately. This page writes the code as the AO Spine posters do: the main type, then the secondary injury, neurology and modifiers in brackets. The thoracolumbar poster separates them with semicolons, C (A3; N3; M2); the subaxial poster with commas, with the facets after the type A injury, B2 (A1, F4 BL, N2, M3). A subaxial injury with only facet injuries is written facets first. If one facet has more than one injury, only the highest is classified. In A3 and A4 a vertical fracture of the lamina is usually present and is not a tension band failure. Neurology comes from the examination, not the images.</p>
      </section>

      <section className="info-card">
        <h3>AO Spine posters</h3>
        <p>AO Spine's one-page summaries of each system: the types with drawings, the decision algorithm, facet injuries (neck), neurology, modifiers and how to write the code.</p>
        <p><a href="/references/aospine-subaxial-poster.pdf" target="_blank" rel="noopener">Subaxial cervical poster (PDF, 2.5 MB)</a> · <a href="/references/aospine-thoracolumbar-poster.pdf" target="_blank" rel="noopener">Thoracolumbar poster (PDF, 3 MB)</a>. Need an internet connection.</p>
        <p className="source-note">AO Spine Subaxial Injury Classification System and AO Spine Thoracolumbar Injury Classification System. © 2020 AO Foundation, AO Spine. Shared unchanged under the <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 licence</a>. Further information: <a href="https://www.aospine.org/classification" target="_blank" rel="noopener">aospine.org/classification</a>.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[spineTraumaScans.a1, spineTraumaScans.a4, spineTraumaScans.chance, spineTraumaScans.dishExtension, spineTraumaScans.translation, spineTraumaScans.jumpedFacet]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Both papers are paywalled; the wording is checked against AO Spine's posters for both systems." />
    </div>
  )
}
