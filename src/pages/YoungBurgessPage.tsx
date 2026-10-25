import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { diastasisOver, ybDescriptions, ybGroup, ybSentence, ybStability, ybTypes, youngBurgess } from '../logic/youngburgess'
import type { YbLateral, YbSacroiliac } from '../logic/youngburgess'

type YesNo = 'no' | 'yes'

type Form = {
  vertical: YesNo
  lateral: YbLateral
  otherSideOpen: YesNo
  symphysis: 'normal' | 'widened'
  diastasis: string
  sacroiliac: YbSacroiliac
}

const initialForm: Form = {
  vertical: 'no',
  lateral: 'none',
  otherSideOpen: 'no',
  symphysis: 'normal',
  diastasis: '',
  sacroiliac: 'intact',
}

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const lateralOptions: { value: YbLateral; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'sacral', label: 'Sacral compression or horizontal pubic rami fractures' },
  { value: 'crescent', label: 'As above, with an iliac wing (crescent) fracture' },
]

const symphysisOptions: { value: Form['symphysis']; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'widened', label: 'Widened' },
]

const sacroiliacOptions: { value: YbSacroiliac; label: string }[] = [
  { value: 'intact', label: 'Normal' },
  { value: 'anterior', label: 'Widened in front only' },
  { value: 'complete', label: 'Widened in front and behind (complete disruption)' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Young JW, Burgess AR, Brumback RJ, Poka A. Pelvic fractures: value of plain radiography in early assessment and management. Radiology. 1986;160(2):445-451.', doi: '10.1148/radiology.160.2.3726125' },
  { citation: 'Burgess AR, Eastridge BJ, Young JW, Ellison TS, Ellison PS Jr, Poka A, Bathon GH, Brumback RJ. Pelvic ring disruptions: effective classification system and treatment protocols. J Trauma. 1990;30(7):848-856.', doi: '10.1097/00005373-199007000-00015' },
  { citation: 'Khurana B, Sheehan SE, Sodickson AD, Weaver MJ. Pelvic ring fractures: what the orthopedic surgeon wants to know. RadioGraphics. 2014;34(5):1317-1333.', doi: '10.1148/rg.345135113' },
]

export function YoungBurgessPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => setForm((current) => ({ ...current, [key]: value }))

  const lateral = form.lateral !== 'none'
  const type = youngBurgess({
    vertical: form.vertical === 'yes',
    lateral: form.lateral,
    otherSideOpen: lateral && form.otherSideOpen === 'yes',
    symphysisWidened: !lateral && form.symphysis === 'widened',
    sacroiliac: lateral ? 'intact' : form.sacroiliac,
  })
  const diastasis = form.diastasis.trim() === '' ? undefined : Number(form.diastasis)
  const wideGap = !lateral && form.symphysis === 'widened' && diastasis !== undefined && Number.isFinite(diastasis) && diastasisOver(diastasis)

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Young-Burgess classification</h2>
          <span className="calc-tag">Pelvic ring</span>
        </div>
        <p>Type a pelvic ring injury by the force that caused it, from what CT shows at the sacrum, the sacroiliac joints and the symphysis, with copyable report text.</p>
        <p className="source-note">Unchecked draft: the references are matched on PubMed, but the papers are paywalled and their abstracts name only the four force patterns and the three grades, so the wording of each type, the 2.5 cm diastasis and the stability column have not yet been checked against them. Not yet reviewed by the site author. Sources: <Cite doi="10.1148/radiology.160.2.3726125">Young et al., Radiology 1986</Cite>; <Cite doi="10.1097/00005373-199007000-00015">Burgess et al., J Trauma 1990</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Injury</h3>
          <div className="form-grid">
            <ChoiceGroup label="Is one hemipelvis displaced upwards (vertically)?" layout="row" value={form.vertical} options={yesNo} onChange={set('vertical')} />
            <ChoiceGroup label="Lateral compression on the side of impact" layout="stack" value={form.lateral} options={lateralOptions} onChange={set('lateral')} />
            {lateral && <ChoiceGroup label="Is the other hemipelvis opened (open book)?" layout="row" value={form.otherSideOpen} options={yesNo} onChange={set('otherSideOpen')} />}
            {!lateral && <ChoiceGroup label="Pubic symphysis" layout="row" value={form.symphysis} options={symphysisOptions} onChange={set('symphysis')} />}
            {!lateral && form.symphysis === 'widened' && (
              <label>
                <span>Symphyseal diastasis (optional, mm)</span>
                <input type="number" step="1" min="0" inputMode="decimal" value={form.diastasis} onChange={(e) => set('diastasis')(e.target.value)} placeholder="e.g. 30" />
              </label>
            )}
            {!lateral && <ChoiceGroup label="Worse sacroiliac joint" layout="stack" value={form.sacroiliac} options={sacroiliacOptions} onChange={set('sacroiliac')} />}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${type ? (ybStability[type] === 'stable' ? 'good' : 'warn') : 'neutral'}`}>{type ?? 'No type'}</p>
            </div>
            <p className="result-strip-summary">
              {type ? `${capitalise(ybGroup(type))}: ${ybDescriptions[type]}. Usually ${ybStability[type]}.` : 'Nothing entered shows a pelvic ring disruption.'}
            </p>
            {wideGap && form.sacroiliac === 'intact' && (
              <p className="result-strip-summary">A diastasis over 2.5 cm usually means APC II or worse: look again at the front of the sacroiliac joints.</p>
            )}
          </div>
          {type && <CopyBlock label="Impression" text={ybSentence(type)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>The types</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr><th>Type</th><th>Injury</th><th>Usually</th></tr>
            </thead>
            <tbody>
              {ybTypes.map((t) => (
                <tr key={t}><td className="vessel-name">{t}</td><td>{capitalise(ybDescriptions[t])}</td><td>{ybStability[t]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Vertical displacement names the type first: with lateral compression it is a combined mechanical injury, otherwise vertical shear. A symphyseal diastasis over 2.5 cm usually goes with torn pelvic floor ligaments, APC II or worse. The stability column is as usually taught with the classification; the posterior ring decides it.</p>
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Most of these papers are paywalled, so the type wording has been checked only where an abstract states it." />
    </div>
  )
}
