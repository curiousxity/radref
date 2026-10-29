import { useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { ScanFigures } from '../components/ScanFigures'
import { letournelScans } from '../data/scans/letournel'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { letournel, ltAssociated, ltDescriptions, ltElementary, ltExtraWall, ltIsAssociated, ltNames, ltSentence } from '../logic/letournel'
import type { LtLines, LtType } from '../logic/letournel'

type YesNo = 'no' | 'yes'
type Unset = ''

type Form = {
  side: 'Right' | 'Left'
  lines: LtLines
  wall: YesNo
  anteriorPart: 'wall' | 'column' | Unset
  posteriorColumn: YesNo | Unset
  obturator: YesNo | Unset
  onIlium: YesNo | Unset
  pattern: 'stem' | 'hemitransverse' | Unset
}

const initialForm: Form = {
  side: 'Right',
  lines: 'neither',
  wall: 'no',
  anteriorPart: '',
  posteriorColumn: '',
  obturator: '',
  onIlium: '',
  pattern: '',
}

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const sideOptions: { value: Form['side']; label: string }[] = [
  { value: 'Right', label: 'Right' },
  { value: 'Left', label: 'Left' },
]

const lineOptions: { value: LtLines; label: string }[] = [
  { value: 'neither', label: 'Neither' },
  { value: 'anterior', label: 'Iliopectineal only (anterior column)' },
  { value: 'posterior', label: 'Ilioischial only (posterior column)' },
  { value: 'both', label: 'Both' },
]

const anteriorOptions: { value: 'wall' | 'column'; label: string }[] = [
  { value: 'wall', label: 'Anterior rim only (wall)' },
  { value: 'column', label: 'Runs up into the ilium and down through the pubic ramus (column)' },
]

const patternOptions: { value: 'stem' | 'hemitransverse'; label: string }[] = [
  { value: 'stem', label: 'A transverse line with a vertical stem down through the ischiopubic part' },
  { value: 'hemitransverse', label: 'An anterior column or wall fracture with a transverse line through the posterior column only' },
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const references: LessonReference[] = [
  { citation: 'Judet R, Judet J, Letournel E. Fractures of the acetabulum: classification and surgical approaches for open reduction. Preliminary report. J Bone Joint Surg Am. 1964;46:1615-1646.', doi: '10.2106/00004623-196446080-00001' },
  { citation: 'Letournel E. Acetabulum fractures: classification and management. Clin Orthop Relat Res. 1980;(151):81-106.', doi: '10.1097/00003086-198009000-00012' },
  { citation: 'Durkee NJ, Jacobson J, Jamadar D, Karunakar MA, Morag Y, Hayes C. Classification of common acetabular fractures: radiographic and CT appearances. AJR Am J Roentgenol. 2006;187(4):915-925.', doi: '10.2214/AJR.05.1269' },
  { citation: 'Gänsslen A, Tonetti J, Pohlemann T. Algorithms in acetabular fracture classifications. Arch Orthop Trauma Surg. 2024;144(10):4655-4665.', doi: '10.1007/s00402-024-05599-6' },
  { citation: 'Scheinfeld MH, Dym AA, Spektor M, Avery LL, Dym RJ, Amanatullah DF. Acetabular fractures: what radiologists should know and how 3D CT can aid classification. RadioGraphics. 2015;35(2):555-577.', doi: '10.1148/rg.352140098' },
]

function TypeTable({ types }: { types: LtType[] }) {
  return (
    <div className="table-wrap">
      <table className="ref-table">
        <thead>
          <tr><th>Type</th><th>Fracture</th></tr>
        </thead>
        <tbody>
          {types.map((t) => (
            <tr key={t}><td className="vessel-name">{capitalise(ltNames[t])}</td><td>{capitalise(ltDescriptions[t])}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LetournelPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const set = <K extends keyof Form>(key: K) => (value: Form[K]) => setForm((current) => ({ ...current, [key]: value }))

  const both = form.lines === 'both'
  const wall = form.wall === 'yes'
  const type = letournel({
    lines: form.lines,
    posteriorWall: wall,
    ...(form.anteriorPart ? { anteriorPart: form.anteriorPart } : {}),
    ...(form.posteriorColumn ? { posteriorColumn: form.posteriorColumn === 'yes' } : {}),
    ...(form.obturator ? { obturatorBroken: form.obturator === 'yes' } : {}),
    ...(form.onIlium ? { articularOnIlium: form.onIlium === 'yes' } : {}),
    ...(form.pattern ? { pattern: form.pattern } : {}),
  })

  let pending = 'Nothing entered shows an acetabular fracture.'
  if (form.lines === 'anterior' && wall) pending = 'An anterior column or wall fracture with a posterior wall fragment is not one of the ten Letournel types: describe it.'
  else if (form.lines === 'anterior') pending = 'Say whether the anterior fracture is the wall or the whole column.'
  else if (form.lines === 'posterior' && wall) pending = 'Say whether the posterior column itself is separated, or the ilioischial line is broken only by the wall fragment.'
  else if (both && form.obturator === 'yes') pending = 'Answer the questions about the ilium to name the type. A both-column fracture leaves no joint surface attached to the intact ilium. A fracture into the iliac wing does not settle it: anterior column fractures (with or without a posterior hemitransverse) can reach the wing as well; a T-shaped fracture usually does not.'
  else if (both) pending = 'Answer the questions about the obturator ring and the ilium to name the type.'

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Letournel classification</h2>
          <span className="calc-tag">Acetabulum</span>
        </div>
        <p>Name an acetabular fracture from a few questions about the column lines, the posterior wall, the obturator ring and the ilium, with copyable report text.</p>
        <p className="source-note">The references are matched on PubMed, the ten type names are checked against Scheinfeld 2015, and the column lines, the obturator ring question, the isolated posterior wall and the spur sign against <Cite doi="10.2214/AJR.05.1269">Durkee et al., AJR 2006</Cite>, and the associated types, the questions that separate them, the iliac wing and the view that shows the spur sign against an open review (<Cite doi="10.1007/s00402-024-05599-6">Gänsslen et al., Arch Orthop Trauma Surg 2024</Cite>). Not yet checked: that a posterior column fracture runs through the greater sciatic notch, that an anterior wall fracture breaks the middle of the iliopectineal line, and where an anterior column fracture starts. Sources: <Cite doi="10.2106/00004623-196446080-00001">Judet et al., J Bone Joint Surg Am 1964</Cite>; <Cite doi="10.1097/00003086-198009000-00012">Letournel, Clin Orthop Relat Res 1980</Cite>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Fracture</h3>
          <div className="form-grid">
            <ChoiceGroup label="Side" layout="row" value={form.side} options={sideOptions} onChange={set('side')} />
            <ChoiceGroup label="Which column lines are broken?" layout="stack" value={form.lines} options={lineOptions} onChange={set('lines')} />
            <ChoiceGroup label="Separate posterior wall fragment?" layout="row" value={form.wall} options={yesNo} onChange={set('wall')} />
            {form.lines === 'posterior' && wall && <ChoiceGroup label="Is the posterior column itself separated (not just the line broken by the wall fragment)?" layout="row" value={form.posteriorColumn} options={yesNo} onChange={set('posteriorColumn')} />}
            {form.lines === 'anterior' && <ChoiceGroup label="The anterior fracture" layout="stack" value={form.anteriorPart} options={anteriorOptions} onChange={set('anteriorPart')} />}
            {both && <ChoiceGroup label="Is the obturator ring broken?" layout="row" value={form.obturator} options={yesNo} onChange={set('obturator')} />}
            {both && form.obturator === 'yes' && <ChoiceGroup label="Is any joint surface still attached to the intact ilium?" layout="row" value={form.onIlium} options={yesNo} onChange={set('onIlium')} />}
            {both && form.obturator === 'yes' && form.onIlium === 'yes' && <ChoiceGroup label="Which pattern?" layout="stack" value={form.pattern} options={patternOptions} onChange={set('pattern')} />}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value tone-${type ? 'warn' : 'neutral'}`}>{type ? capitalise(ltNames[type]) : 'No type'}</p>
            </div>
            <p className="result-strip-summary">
              {type
                ? `${ltIsAssociated(type) ? 'Associated' : 'Elementary'} type: ${ltDescriptions[type]}${ltExtraWall(type, wall) ? ', with a posterior wall fragment as well' : ''}.`
                : pending}
            </p>
          </div>
          {type && <CopyBlock label="Impression" text={ltSentence(type, wall, form.side)} />}
          <button type="button" className="reset-button" onClick={() => setForm(initialForm)}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Elementary types</h3>
        <TypeTable types={ltElementary} />
        <h3>Associated types</h3>
        <TypeTable types={ltAssociated} />
        <p>The iliopectineal line belongs to the anterior column and the ilioischial line to the posterior column. With both lines broken, an intact obturator ring means a transverse fracture. With the obturator ring broken as well, the fracture is T-shaped, anterior column with posterior hemitransverse, or both-column; what makes it both-column is that no articular fragment stays connected to the sacroiliac joint, not a fracture into the iliac wing. Iliac wing extension may occur in anterior column fractures, including the anterior column with posterior hemitransverse, and in both-column fractures; a T-shaped fracture usually does not reach the iliac wing. The spur sign of a both-column fracture is best seen on the obturator oblique view: it is the iliac fragment left attached to the sacroiliac joint with no joint surface on it, a shard of bone pointing backwards at the level of the acetabular roof on radiographs and CT. An isolated posterior wall fracture leaves the iliopectineal line intact, but its fragment can break the ilioischial line.</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[letournelScans.bothColumnSpur, letournelScans.posteriorWall]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. Durkee and Gänsslen are read in full; the other papers are paywalled, so their wording is checked only where an abstract states it." />
    </div>
  )
}
