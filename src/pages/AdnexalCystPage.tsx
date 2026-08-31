import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import { Definition } from '../components/Definition'

type MenopausalStatus = 'pre' | 'post'
type Origin = 'ovarian' | 'paraovarian'
type Morphology = 'simple' | 'indeterminate' | 'notSimple'
type Change = 'decreased' | 'similar' | 'increased' | 'newSolidElements'
type Tone = 'neutral' | 'good' | 'warn' | 'accent'

type Form = {
  menopausalStatus: MenopausalStatus
  origin: Origin
  morphology: Morphology
  sizeCm: string
  isFollowUp: boolean
  change: Change
  highConfidence: boolean
  symptomsAttributable: boolean
  elevatedRisk: boolean
}

const initialForm: Form = {
  menopausalStatus: 'post',
  origin: 'ovarian',
  morphology: 'simple',
  sizeCm: '',
  isFollowUp: false,
  change: 'similar',
  highConfidence: false,
  symptomsAttributable: false,
  elevatedRisk: false,
}

type Result = {
  category: string
  tone: Tone
  summary: string
  report: string | null
  impression: string | null
  recommendation: string | null
  consensus: string | null
  conditionalBand: boolean
  outsideScope: boolean
  applicabilityNote: string | null
}

type SizeRow = {
  key: string
  status: MenopausalStatus
  sizeBand: string
  report: string
  impression: string
  recommendation: string
  consensus: string
  /**
   * Report-ready wording for the bands where the table's own recommendation is a
   * discussion of when follow-up may be omitted rather than text a radiologist
   * would dictate. The full table text still shows in the reference table below.
   */
  conditionalFollowUp?: string
}

type ScenarioRow = {
  key: string
  status: MenopausalStatus
  scenario: string
  report: string
  impression: string
  recommendation: string
  consensus: string
}

const postmenopausalSizeRows: SizeRow[] = [
  {
    key: 'post-le1',
    status: 'post',
    sizeBand: '1 cm or smaller (largest cyst diameter)',
    report: 'Description not needed',
    impression: 'Normal ovaries/adnexa',
    recommendation: 'Normal, no follow-up',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'post-1to3',
    status: 'post',
    sizeBand: '>1 cm to 3 cm',
    report: 'Describe in report, giving largest simple cyst diameter.',
    impression: 'Benign inconsequential finding',
    recommendation: 'Clinically inconsequential finding. No follow-up needed.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'post-3to5',
    status: 'post',
    sizeBand: '>3 to 5 cm',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter and quality of visualization and documentation.',
    impression: 'Benign simple cyst. Clinically inconsequential finding',
    recommendation: 'Generally will require follow-up examination. However, if exceptionally well-visualized and characterized, with excellent documentation, and imager confidence by an experienced US practitioner, no follow-up imaging is needed. If any concern, or if imager is less confident in diagnosis, then follow-up is recommended. Follow up in 3-6 months for characterization or 6-12 months for growth assessment.',
    conditionalFollowUp: 'Follow up in 3-6 months for characterization or 6-12 months for growth assessment.',
    consensus: 'Majority opinion (evidence A if no follow-up, C if follow-up; clinical-experience support C - disagreement was whether a tiered system was beneficial or whether a single threshold of 3 cm should be used)',
  },
  {
    key: 'post-gt5',
    status: 'post',
    sizeBand: '>5 cm',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter.',
    impression: 'Benign simple cyst',
    recommendation: 'Follow up in 3-6 months for characterization or 6-12 months for growth assessment.',
    consensus: 'Strong consensus (evidence C; clinical-experience support B)',
  },
]

const premenopausalSizeRows: SizeRow[] = [
  {
    key: 'pre-le3',
    status: 'pre',
    sizeBand: '3 cm or smaller (largest cyst diameter)',
    report: 'Description not needed. If described, consider use of word follicle rather than cyst.',
    impression: 'Normal ovaries/adnexa',
    recommendation: 'Normal, no follow-up',
    consensus: 'Strong consensus (evidence A for malignant outcomes; A for other clinical outcomes)',
  },
  {
    key: 'pre-3to5',
    status: 'pre',
    sizeBand: '>3 cm to 5 cm',
    report: 'Indicate presence of simple cyst(s), and largest cyst diameter.',
    impression: 'Benign finding in the physiologic size range',
    recommendation: 'No follow-up needed',
    consensus: 'Strong (evidence A; clinical-experience support A)',
  },
  {
    key: 'pre-5to7',
    status: 'pre',
    sizeBand: '>5 to 7 cm',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter and quality of visualization and documentation.',
    impression: 'Benign simple cyst. Clinically inconsequential finding',
    recommendation: 'Generally will require follow-up examination. However, if exceptionally well-visualized and characterized, with excellent documentation, and imager confidence by an experienced US practitioner, then no follow up imaging is needed. If any concern, or if imager is less confident in diagnosis, then follow-up is recommended. Follow up in 2-6 months for resolution/characterization or 6-12 months for growth rate assessment.',
    conditionalFollowUp: 'Follow up in 2-6 months for resolution/characterization or 6-12 months for growth rate assessment.',
    consensus: 'Majority opinion (evidence A if no follow-up, C if follow-up; clinical-experience support C - disagreement was whether a tiered system was beneficial or whether a single threshold of 5 cm should be used)',
  },
  {
    key: 'pre-gt7',
    status: 'pre',
    sizeBand: '>7 cm',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter.',
    impression: 'Benign simple cyst',
    recommendation: 'Follow up in 2-6 months for resolution/characterization or 6-12 months for growth rate assessment.',
    consensus: 'Strong consensus (evidence C; clinical-experience support A)',
  },
]

const followUpRows: ScenarioRow[] = [
  {
    key: 'decreased',
    status: 'post',
    scenario: 'Follow-up evaluation, decreased in size',
    report: 'Describe in report, giving largest simple cyst diameter, and indicate cyst is smaller.',
    impression: 'Benign simple cyst; decrease in size excludes neoplasm.',
    recommendation: 'No further follow-up is needed.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'similar',
    status: 'post',
    scenario: 'Follow-up evaluation, similar in size',
    report: 'Describe in report, giving largest simple cyst diameter, and indicate similar size.',
    impression: 'Benign simple cyst',
    recommendation: 'Follow-up at 2 years since initial study to assess if slowly growing. If still stable, then no further imaging will be needed unless clinically indicated.',
    consensus: 'Moderate consensus (evidence C; clinical-experience support B)',
  },
  {
    key: 'increased',
    status: 'post',
    scenario: 'Follow-up evaluation, increased in size',
    report: 'Describe in report, giving largest simple cyst diameter, and indicate change in size.',
    impression: 'An enlarging simple cyst is most likely a benign neoplasm.',
    recommendation: 'Suggest one further follow-up in 1 year to assess any further changes in size. After that, follow-up will be clinically managed.',
    consensus: 'Strong consensus (evidence C; clinical-experience support A)',
  },
  {
    key: 'decreased',
    status: 'pre',
    scenario: 'Follow-up evaluation (simple cyst initially >5 cm), decreased in size',
    report: 'Describe in report if cyst not resolved, giving all simple cyst diameters, but making recommendation from largest cyst diameter.',
    impression: 'Benign inconsequential finding; decrease in size excludes neoplasm.',
    recommendation: 'No further follow-up is needed',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'similar',
    status: 'pre',
    scenario: 'Follow-up evaluation (simple cyst initially >5 cm), similar in size',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter, and indicate similar size.',
    impression: 'Benign simple cyst. A simple cyst with stability over 12 or more months is most likely nonneoplastic or a very slow growing benign neoplasm; one further imaging test to document stability may be helpful. If no growth, then no further follow-up will be needed.',
    recommendation: 'Follow up at 2 years after initial study to understand growth rate.',
    consensus: 'Moderate consensus (evidence C; clinical-experience support B)',
  },
  {
    key: 'increased',
    status: 'pre',
    scenario: 'Follow-up evaluation (simple cyst initially >5 cm), increased in size',
    report: 'Describe in report, giving all simple cyst diameters, but making recommendation from largest cyst diameter.',
    impression: 'An enlarging simple cyst is most likely a benign neoplasm; follow-up imaging strategy is based on clinical management.',
    recommendation: 'Suggest one further follow-up in 1 year to assess any further changes in size.',
    consensus: 'Strong consensus (evidence C; clinical-experience support A)',
  },
]

const specialRows: ScenarioRow[] = [
  {
    key: 'paraovarian',
    status: 'post',
    scenario: 'Simple paraovarian or paratubal cyst(s)',
    report: 'Describe in report, clearly indicating that the simple cyst does not arise from the ovary.',
    impression: 'Benign extraovarian simple cyst',
    recommendation: 'No further follow-up is needed.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'paraovarian',
    status: 'pre',
    scenario: 'Simple paraovarian or paratubal cysts',
    report: 'Describe in report giving maximal simple cyst diameter, clearly indicating that the cyst does not arise from the ovary.',
    impression: 'Benign extraovarian simple cyst',
    recommendation: 'No further follow-up is needed.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A). The text adds that if a simple cyst is clearly paraovarian, regardless of size, follow-up is not required but may be performed at the discretion of the referring clinician.',
  },
  {
    key: 'indeterminate',
    status: 'post',
    scenario: 'Adnexal cyst likely simple but not satisfactorily characterized with US',
    report: 'Describe in report, indicating any reasons limiting characterization.',
    impression: 'Probably simple cyst is not optimally characterized.',
    recommendation: 'Consider short-interval follow-up US, second-opinion US, or MRI (any of these in <3 months) to improve cyst characterization.',
    consensus: 'Strong consensus (evidence C; clinical-experience support A)',
  },
  {
    key: 'indeterminate',
    status: 'pre',
    scenario: 'Adnexal cyst likely simple but not satisfactorily characterized at US',
    report: 'Describe in report giving all cyst diameters, indicating any reasons limiting characterization.',
    impression: 'Probably simple cyst is not optimally characterized; short-interval follow-up US or second-opinion US, or MRI might improve cyst characterization.',
    recommendation: 'Consider short-interval follow-up US, second-opinion US, or MRI (any of these in <3 months).',
    consensus: 'Strong consensus (evidence C; clinical-experience support A)',
  },
  {
    key: 'newSolidElements',
    status: 'post',
    scenario: 'Previously simple cyst develops wall papillary projections or solid elements or irregular septation(s)',
    report: 'Describe in report, giving largest cyst diameter, and articulating all morphologic changes.',
    impression: 'The observed changes in the adnexal cyst increase concern for malignancy.',
    recommendation: 'If changes are unequivocally present and within original cyst, then recommend consultation with Gynecologic Oncology. If equivocal, then repeat short-interval US, second-opinion US, or MRI could be helpful.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
  {
    key: 'newSolidElements',
    status: 'pre',
    scenario: 'Previously simple cyst develops wall papillary projections or solid elements or irregular septation(s)',
    report: 'Describe in report, giving all cyst diameters, and articulating morphologic changes.',
    impression: 'The observed changes in the adnexal cyst increase concern for malignancy',
    recommendation: 'If changes are unequivocally present and within original cyst, recommend consultation with Gynecologic Oncology. If equivocal, then repeat short-interval US, second-opinion US, or MRI could be helpful.',
    consensus: 'Strong consensus (evidence A; clinical-experience support A)',
  },
]

function parseSize(value: string): number | 'empty' | 'invalid' {
  if (value.trim() === '') return 'empty'
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return 'invalid'
  return parsed
}

function fmt(value: number) {
  return String(Number(value.toFixed(1)))
}

function applicability(form: Form) {
  if (form.symptomsAttributable && form.elevatedRisk) {
    return 'The SRU recommendations assume an asymptomatic, average-risk patient. Symptoms are attributed to this cyst and the patient is at elevated risk, so the result below is not directly applicable and clinical management supersedes it.'
  }
  if (form.symptomsAttributable) {
    return 'The SRU recommendations assume an asymptomatic patient, or one whose symptoms are not attributable to the cyst. Where symptoms are attributed to this cyst, clinical management supersedes the table, so the result below is not directly applicable.'
  }
  if (form.elevatedRisk) {
    return 'The SRU recommendations do not apply to patients at elevated genetic risk of ovarian cancer, with substantial family history, or with other evidence of cancer such as an elevated CA-125. The result below is not directly applicable.'
  }
  return null
}

function findScenario(rows: ScenarioRow[], key: string, status: MenopausalStatus): ScenarioRow | undefined {
  return rows.find((row) => row.key === key && row.status === status)
}

function pending(summary: string, note: string | null): Result {
  return {
    category: 'Awaiting input',
    tone: 'neutral',
    summary,
    report: null,
    impression: null,
    recommendation: null,
    consensus: null,
    conditionalBand: false,
    outsideScope: false,
    applicabilityNote: note,
  }
}

function fromScenario(row: ScenarioRow | undefined, category: string, tone: Tone, summary: string, note: string | null): Result {
  if (!row) {
    return pending('No SRU row matches this combination of inputs. Adjust the selections above.', note)
  }
  return {
    category,
    tone,
    summary,
    report: row.report,
    impression: row.impression,
    recommendation: row.recommendation,
    consensus: row.consensus,
    conditionalBand: false,
    outsideScope: false,
    applicabilityNote: note,
  }
}

function sizeRowFor(status: MenopausalStatus, size: number) {
  if (status === 'post') {
    if (size <= 1) return postmenopausalSizeRows[0]
    if (size <= 3) return postmenopausalSizeRows[1]
    if (size <= 5) return postmenopausalSizeRows[2]
    return postmenopausalSizeRows[3]
  }
  if (size <= 3) return premenopausalSizeRows[0]
  if (size <= 5) return premenopausalSizeRows[1]
  if (size <= 7) return premenopausalSizeRows[2]
  return premenopausalSizeRows[3]
}

function classify(form: Form): Result {
  const note = applicability(form)
  const status = form.menopausalStatus
  const statusWord = status === 'post' ? 'Postmenopausal' : 'Premenopausal'

  if (form.morphology === 'notSimple') {
    return {
      category: 'Not a simple cyst',
      tone: 'warn',
      summary: 'Solid elements, papillary projections, irregular septations, or internal flow place this lesion outside the SRU simple-cyst guideline.',
      report: null,
      impression: null,
      recommendation: null,
      consensus: null,
      conditionalBand: false,
      outsideScope: true,
      applicabilityNote: note,
    }
  }

  if (form.isFollowUp && form.change === 'newSolidElements') {
    return fromScenario(
      findScenario(specialRows, 'newSolidElements', status),
      'Increased concern for malignancy',
      'warn',
      `${statusWord} patient: a previously simple cyst has developed wall papillary projections, solid elements, or irregular septation(s).`,
      note,
    )
  }

  if (form.morphology === 'indeterminate') {
    const changeNote = form.isFollowUp
      ? ` The cyst ${form.change === 'decreased' ? 'has decreased' : form.change === 'similar' ? 'is similar' : 'has increased'} in size since the prior study, but characterization takes precedence over the size-change rows until the cyst is confirmed simple.`
      : ''
    return fromScenario(
      findScenario(specialRows, 'indeterminate', status),
      'Follow-up recommended',
      'accent',
      `${statusWord} patient: adnexal cyst likely simple but not satisfactorily characterized at US.${changeNote}`,
      note,
    )
  }

  if (form.origin === 'paraovarian') {
    return fromScenario(
      findScenario(specialRows, 'paraovarian', status),
      'No follow-up needed',
      'good',
      `${statusWord} patient: simple paraovarian or paratubal cyst, which needs no follow-up regardless of size.`,
      note,
    )
  }

  if (form.isFollowUp) {
    const row = findScenario(followUpRows, form.change, status)
    const changeWord = form.change === 'decreased' ? 'decreased' : form.change === 'similar' ? 'similar' : 'increased'
    const scopeNote = status === 'pre' ? ' These premenopausal rows apply to a simple cyst that measured more than 5 cm on the initial study; a premenopausal cyst of 5 cm or smaller needs no follow-up.' : ''
    const followUpSummary = `${statusWord} patient: simple cyst ${changeWord} in size on follow-up.${scopeNote}`
    if (form.change === 'decreased') {
      return fromScenario(row, 'No follow-up needed', 'good', followUpSummary, note)
    }
    return fromScenario(row, 'Follow-up recommended', 'accent', followUpSummary, note)
  }

  const size = parseSize(form.sizeCm)
  if (size === 'empty') {
    return pending('Enter the largest simple cyst diameter in centimetres to get an SRU recommendation.', note)
  }
  if (size === 'invalid') {
    return pending('Enter a positive cyst diameter in centimetres.', note)
  }

  const row = sizeRowFor(status, size)
  const conditionalBand = row.key === 'post-3to5' || row.key === 'pre-5to7'
  const lead = `${statusWord} patient: simple ovarian cyst measuring ${fmt(size)} cm (${row.sizeBand}).`

  if (conditionalBand && form.highConfidence) {
    return {
      category: 'No follow-up needed',
      tone: 'good',
      summary: `${lead} Exceptionally well visualized and characterized, so no follow-up imaging is needed.`,
      report: row.report,
      impression: row.impression,
      recommendation: 'Exceptionally well-visualized and characterized, with excellent documentation, and imager confidence by an experienced US practitioner. No follow-up imaging is needed.',
      consensus: row.consensus,
      conditionalBand,
      outsideScope: false,
      applicabilityNote: note,
    }
  }

  let category: string
  let tone: Tone
  if (row.key === 'post-le1' || row.key === 'pre-le3') {
    category = 'Normal'
    tone = 'good'
  } else if (row.key === 'post-1to3' || row.key === 'pre-3to5') {
    category = 'No follow-up needed'
    tone = 'good'
  } else {
    category = 'Follow-up recommended'
    tone = 'accent'
  }

  return {
    category,
    tone,
    summary: lead,
    report: row.report,
    impression: row.impression,
    recommendation: conditionalBand ? row.conditionalFollowUp ?? row.recommendation : row.recommendation,
    consensus: row.consensus,
    conditionalBand,
    outsideScope: false,
    applicabilityNote: note,
  }
}

const applicabilityNotes = [
  'The tables are meant for asymptomatic patients, or patients whose symptoms are not attributable to the visualized cyst. Where the patient has symptoms attributable to the cyst, clinical management supersedes the recommendations in the table.',
  'Not applicable to patients at elevated genetic risk of ovarian cancer, or with substantial family history.',
  'Not applicable when there is other evidence of cancer, such as an elevated cancer antigen 125 (CA-125).',
  'Patients may develop symptoms if the cyst enlarges or undergoes torsion; the table assumes this has not occurred.',
  'The guidelines address simple cysts only. Recommendations for other benign cysts, probably benign cysts, and malignant cysts are in the original 2010 SRU consensus document.',
]

const references: { label: string; href?: string }[] = [
  {
    label: 'Levine D, Patel MD, Suh-Burgmann EJ, Andreotti RF, Benacerraf BR, Benson CB, Brewster WR, Coleman BG, Doubilet PM, Goldstein SR, Hamper UM, Hecht JL, Horrow MM, Hur HC, Marnach ML, Pavlik E, Platt LD, Puscheck E, Smith-Bindman R, Brown DL. Simple Adnexal Cysts: SRU Consensus Conference Update on Follow-up and Reporting. Radiology 2019;293(2):359-371.',
    href: 'https://pubs.rsna.org/doi/10.1148/radiol.2019191354',
  },
]

export function AdnexalCystPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])
  const showSize = form.morphology === 'simple' && form.origin === 'ovarian' && !form.isFollowUp

  // The high-confidence opt-out is asserted about one specific cyst in one specific
  // band, so any edit that can move the band must clear it rather than carry it over.
  const bandFields: (keyof Form)[] = ['menopausalStatus', 'origin', 'morphology', 'sizeCm', 'isFollowUp']

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(bandFields.includes(field) ? { highConfidence: false } : {}),
    }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">SRU 2019 consensus</p>
          <h2>Simple adnexal cyst follow-up</h2>
          <p>Follow-up intervals and report-ready wording for simple adnexal cysts in asymptomatic, average-risk patients.</p>
          <p className="source-note">Source: <a href="https://pubs.rsna.org/doi/10.1148/radiol.2019191354" target="_blank" rel="noopener noreferrer">Levine et al., "Simple Adnexal Cysts: SRU Consensus Conference Update on Follow-up and Reporting," Radiology 2019</a>. For a cyst with solid elements, papillary projections, irregular septations, or internal flow, use <Link to="/orads">O-RADS</Link> instead.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Cyst</h3>
          <div className="form-grid">
            <label>
              <span>Menopausal status</span>
              <select value={form.menopausalStatus} onChange={(e) => update('menopausalStatus', e.target.value as MenopausalStatus)}>
                <option value="post">Postmenopausal</option>
                <option value="pre">Premenopausal</option>
              </select>
            </label>

            <label>
              <span>Origin</span>
              <select value={form.origin} onChange={(e) => update('origin', e.target.value as Origin)}>
                <option value="ovarian">Ovarian</option>
                <option value="paraovarian">Paraovarian or paratubal</option>
              </select>
            </label>

            <label>
              <span className="term">
                Morphology
                <Definition text="A simple cyst is a round or oval anechoic fluid collection with smooth thin walls, no solid component or septation, and no internal flow by using color Doppler imaging." />
              </span>
              <select value={form.morphology} onChange={(e) => update('morphology', e.target.value as Morphology)}>
                <option value="simple">Simple cyst</option>
                <option value="indeterminate">Likely simple but not satisfactorily characterized</option>
                <option value="notSimple">Solid elements, papillary projections, irregular septations, or internal flow</option>
              </select>
            </label>

            {showSize && (
              <label>
                <span className="term">
                  Largest cyst diameter (cm)
                  <Definition text="Recommendations are made from the largest cyst diameter, even when all simple cyst diameters are described in the report." />
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={form.sizeCm}
                  onChange={(e) => update('sizeCm', e.target.value)}
                  placeholder="e.g. 4"
                />
              </label>
            )}
          </div>

          <h3>Follow-up study</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.isFollowUp} onChange={(e) => update('isFollowUp', e.target.checked)} />
              This is a follow-up study of a previously seen simple cyst
            </label>

            {form.isFollowUp && (
              <label>
                <span>Change since the initial study</span>
                <select value={form.change} onChange={(e) => update('change', e.target.value as Change)}>
                  <option value="decreased">Decreased in size</option>
                  <option value="similar">Similar in size</option>
                  <option value="increased">Increased in size</option>
                  <option value="newSolidElements">New wall papillary projections, solid elements, or irregular septation(s)</option>
                </select>
              </label>
            )}

            {result.conditionalBand && (
              <label className="check-row">
                <input type="checkbox" checked={form.highConfidence} onChange={(e) => update('highConfidence', e.target.checked)} />
                Exceptionally well visualized and characterized, with excellent documentation and high imager confidence
              </label>
            )}
          </div>

          <h3>Applicability</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.symptomsAttributable} onChange={(e) => update('symptomsAttributable', e.target.checked)} />
              Symptoms attributable to this cyst
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.elevatedRisk} onChange={(e) => update('elevatedRisk', e.target.checked)} />
              Elevated genetic risk, substantial family history, or other evidence of cancer
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.category} tone={result.tone} />
          </div>
          {result.applicabilityNote && <p className="result-summary"><strong>{result.applicabilityNote}</strong></p>}
          <p className="result-summary">{result.summary}</p>
          {result.outsideScope && (
            <p className="result-summary">This guideline covers simple cysts only. Assess this lesion with <Link to="/orads">O-RADS</Link> instead.</p>
          )}
          {result.report && result.impression && result.recommendation && (
            <>
              <CopyBlock label="Report" text={result.report} />
              <CopyBlock label="Impression" text={result.impression} />
              <CopyBlock label="Recommendation" text={result.recommendation} />
            </>
          )}
          {result.consensus && <p className="result-summary">{result.consensus}</p>}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Postmenopausal simple ovarian cysts</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Report</th>
                <th>Impression</th>
                <th>Recommendation</th>
                <th>Consensus</th>
              </tr>
            </thead>
            <tbody>
              {postmenopausalSizeRows.map((row) => (
                <tr key={row.key}>
                  <td className="vessel-name">{row.sizeBand}</td>
                  <td>{row.report}</td>
                  <td>{row.impression}</td>
                  <td>{row.recommendation}</td>
                  <td>{row.consensus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Premenopausal simple ovarian cysts</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Report</th>
                <th>Impression</th>
                <th>Recommendation</th>
                <th>Consensus</th>
              </tr>
            </thead>
            <tbody>
              {premenopausalSizeRows.map((row) => (
                <tr key={row.key}>
                  <td className="vessel-name">{row.sizeBand}</td>
                  <td>{row.report}</td>
                  <td>{row.impression}</td>
                  <td>{row.recommendation}</td>
                  <td>{row.consensus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Follow-up and special scenarios</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Status</th>
                <th>Report</th>
                <th>Impression</th>
                <th>Recommendation</th>
                <th>Consensus</th>
              </tr>
            </thead>
            <tbody>
              {[...followUpRows, ...specialRows].map((row) => (
                <tr key={`${row.key} ${row.status}`}>
                  <td className="vessel-name">{row.scenario}</td>
                  <td>{row.status === 'post' ? 'Postmenopausal' : 'Premenopausal'}</td>
                  <td>{row.report}</td>
                  <td>{row.impression}</td>
                  <td>{row.recommendation}</td>
                  <td>{row.consensus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="plain-list">
          <li>If the ovary and cyst are not seen on a follow-up study, it must be acknowledged that a small cyst could still be present but missed.</li>
          <li>The premenopausal follow-up rows apply to a simple cyst that measured more than 5 cm on the initial study.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Simple cyst definition</h3>
        <ul className="plain-list">
          <li>A simple cyst is a round or oval anechoic fluid collection with smooth thin walls, no solid component or septation, and no internal flow by using color Doppler imaging.</li>
          <li>The tables' own shorthand: well-visualized, thin-walled, anechoic, no solid elements, no internal vascular flow.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Applicability</h3>
        <ul className="plain-list">
          {applicabilityNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.href ? (
                <a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a>
              ) : (
                ref.label
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
