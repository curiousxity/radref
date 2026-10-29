import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { Cite, LessonReferences } from '../components/LessonPage'
import type { LessonReference } from '../components/LessonPage'
import { mayfield, mayfieldDescriptions, mayfieldGaps, mayfieldSentence, mayfieldStages } from '../logic/mayfield'
import type { MayfieldInput } from '../logic/mayfield'
import { ScanFigures } from '../components/ScanFigures'
import { mayfieldScans } from '../data/scans/mayfield'

type YesNo = 'no' | 'yes'
type Form = Record<keyof MayfieldInput, YesNo>

const initialForm: Form = { scapholunate: 'no', capitolunate: 'no', lunotriquetral: 'no', lunateDislocated: 'no' }

const yesNo: { value: YesNo; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
]

const questions: [keyof MayfieldInput, string][] = [
  ['scapholunate', 'Scapholunate ligament disrupted (or a scaphoid fracture in its place)?'],
  ['capitolunate', 'Capitolunate joint disrupted (capitate displaced or dislocated dorsally relative to the lunate)?'],
  ['lunotriquetral', 'Lunotriquetral ligament disrupted?'],
  ['lunateDislocated', 'Lunate dislocated from the lunate fossa of the radius?'],
]

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

const DVORSKY = <Cite doi="10.1016/j.jhsg.2025.100803">Dvorsky et al., J Hand Surg Glob Online 2025</Cite>
const SHARMA = <Cite doi="10.1055/s-0044-1801268">Sharma et al., Indian J Radiol Imaging 2025</Cite>
const KENNEDY_ALLAN = <Cite doi="10.1007/s11999-012-2275-x">Kennedy and Allan, Clin Orthop Relat Res 2012</Cite>

const references: LessonReference[] = [
  { citation: 'Mayfield JK, Johnson RP, Kilcoyne RK. Carpal dislocations: pathomechanics and progressive perilunar instability. J Hand Surg Am. 1980;5(3):226-241.', doi: '10.1016/s0363-5023(80)80007-4' },
  { citation: 'Kennedy SA, Allan CH. In brief: Mayfield et al. classification: carpal dislocations and progressive perilunar instability. Clin Orthop Relat Res. 2012;470(4):1243-1245.', doi: '10.1007/s11999-012-2275-x' },
  { citation: 'Chen NC, Jupiter JB, Jebson PJL. Sports-related wrist injuries in adults. Sports Health. 2009;1(6):469-477.', doi: '10.1177/1941738109347981' },
  { citation: 'Dvorsky JL, Rosenberry S, Da Costa A, Green A, Fowler J. A review of perilunate wrist dislocations. J Hand Surg Glob Online. 2025;7(5):100803.', doi: '10.1016/j.jhsg.2025.100803' },
  { citation: 'Sharma M, Choudhury SR, Sinha A, Prakash M. Multimodality imaging in wrist fractures and dislocations. Indian J Radiol Imaging. 2025;35(3):374-386.', doi: '10.1055/s-0044-1801268' },
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
        <p className="source-note">The original paper is paywalled, so the four stages are checked against its abstract and against a review that reproduces its table ({KENNEDY_ALLAN}) and two open reviews ({DVORSKY}; {SHARMA}). The reviews differ on which stage they call the perilunate dislocation, so each stage is named by the structures disrupted. The greater-arc sentence is checked against a review that describes the fracture through the scaphoid in place of the scapholunate injury (<Cite doi="10.1177/1941738109347981">Chen et al., Sports Health 2009</Cite>). Source: <Cite doi="10.1016/s0363-5023(80)80007-4">Mayfield et al., J Hand Surg Am 1980</Cite>.</p>
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
        <p>Reviews differ on which stage they call the perilunate dislocation. Some give the name to stage II, where the capitate dislocates dorsally while the lunate stays aligned with the radius ({DVORSKY}; {SHARMA}); others to stage III ({KENNEDY_ALLAN}). This page names the disrupted structures instead: stage III specifically adds lunotriquetral disruption.</p>
        <p>The injury travels around the lunate: from the scapholunate joint, through the capitolunate and lunotriquetral joints, to dislocation of the lunate itself. When the scaphoid breaks instead of the scapholunate ligament tearing, the path runs through the bone (a greater arc injury) (<Cite doi="10.1016/s0363-5023(80)80007-4">Mayfield et al., J Hand Surg Am 1980</Cite>; <Cite doi="10.1177/1941738109347981">Chen et al., Sports Health 2009</Cite>).</p>
      </section>

      <section className="info-card">
        <h3>Examples</h3>
        <ScanFigures images={[mayfieldScans.stage1, mayfieldScans.stage1Mri, mayfieldScans.stage2, mayfieldScans.stage3, mayfieldScans.stage4, mayfieldScans.greaterArc]} />
      </section>

      <LessonReferences references={references} note="Matched on PubMed and Crossref. The 1980 paper is paywalled; the stage wording follows Kennedy and Allan's reproduction of its table, with the dorsal capitate in stage II from Dvorsky and colleagues and Sharma and colleagues." />
    </div>
  )
}
