import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { aoCode, aoDescriptions, aoFacetCode, aoFacetDescriptions, aoFacets, aoGroup, aoModifiers, aoNeuroDescription, aoNeuros, aoSentence, aoSpine, aoTypes } from '../logic/aospine'
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
  { value: 'bony', label: 'Disrupted through bone only' },
  { value: 'ligamentous', label: 'Disrupted through the ligaments (with or without bone)' },
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
  { citation: 'Vaccaro AR, Oner C, Kepler CK, Dvorak M, Schnake K, Bellabarba C, Reinhold M, Aarabi B, Kandziora F, Chapman J, Shanmuganathan R, Fehlings M, Vialle L. AOSpine thoracolumbar spine injury classification system: fracture description, neurological status, and key modifiers. Spine (Phila Pa 1976). 2013;38(23):2028-2037.' },
  { citation: 'Vaccaro AR, Koerner JD, Radcliff KE, Oner FC, Reinhold M, Schnake KJ, Kandziora F, Fehlings MG, Dvorak MF, Aarabi B, Rajasekaran S, Schroeder GD, Kepler CK, Vialle LR. AOSpine subaxial cervical spine injury classification system. Eur Spine J. 2016;25(7):2173-2184.' },
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
  })
  const facet = subaxial ? aoFacetCode(form.right === 'none' ? undefined : form.right, form.left === 'none' ? undefined : form.left) : ''
  const modifiers = Object.keys(aoModifiers[form.region]).filter((m) => form.modifiers.includes(m))
  const neuro = form.neuro === 'unknown' ? undefined : form.neuro
  const full = morphology && {
    region: form.region,
    morphology,
    ...(facet ? { facet } : {}),
    ...(neuro ? { neuro } : {}),
    compression: form.compression === 'yes',
    modifiers,
  }

  const neuroOptions: { value: AoNeuro | 'unknown'; label: string }[] = [
    { value: 'unknown', label: 'Not given' },
    ...aoNeuros.map((n) => ({ value: n, label: `${n}: ${aoNeuroDescription(n, form.region)}` })),
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
        <p className="source-note">Unchecked draft: written while PubMed could not be reached, so the wording has not yet been checked against the AO Spine papers. Not yet reviewed by the site author. Source: Vaccaro et al., Spine 2013 (thoracolumbar) and Eur Spine J 2016 (subaxial cervical).</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Injury</h3>
          <div className="form-grid">
            <ChoiceGroup label="Region" layout="stack" value={form.region} options={regionOptions} onChange={(value) => setForm((current) => ({ ...current, region: value, modifiers: [] }))} />
            <ChoiceGroup label="Translation or displacement in any plane?" layout="row" value={form.translation} options={yesNo} onChange={set('translation')} />
            <ChoiceGroup label="Anterior tension band disrupted (hyperextension)?" layout="row" value={form.anterior} options={yesNo} onChange={set('anterior')} />
            <ChoiceGroup label="Posterior tension band" layout="stack" value={form.posterior} options={posteriorOptions} onChange={set('posterior')} />
            <ChoiceGroup label="Vertebral body endplates fractured" layout="row" value={form.endplates} options={endplateOptions} onChange={set('endplates')} />
            {form.endplates !== '0' && <ChoiceGroup label="Posterior wall fractured?" layout="row" value={form.wall} options={yesNo} onChange={set('wall')} />}
            {subaxial && <ChoiceGroup label="Right facet" layout="stack" value={form.right} options={facetOptions} onChange={set('right')} />}
            {subaxial && <ChoiceGroup label="Left facet" layout="stack" value={form.left} options={facetOptions} onChange={set('left')} />}
            <ChoiceGroup label="Neurology (from the examination)" layout="stack" value={form.neuro} options={neuroOptions} onChange={set('neuro')} />
            {form.neuro === 'N3' && <ChoiceGroup label="Ongoing cord compression?" layout="row" value={form.compression} options={yesNo} onChange={set('compression')} />}
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
              {morphology ? `${capitalise(aoGroup(morphology.type))}: ${aoDescriptions[morphology.type]}${morphology.body ? `, with a type ${morphology.body} vertebral body fracture` : ''}.` : 'A posterior wall fracture needs at least one endplate fractured to have a type.'}
            </p>
          </div>
          {full && <CopyBlock label="Report text" text={aoSentence(full)} />}
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
        <p>The most severe injury names the type: C over B over A. A B or C injury also carries the type of its vertebral body fracture; this page writes it in brackets, as in B2 (A3). Neurology comes from the examination, not the images.</p>
      </section>

      <LessonReferences references={references} note="These citations are from memory and have not yet been matched on PubMed." />
    </div>
  )
}
