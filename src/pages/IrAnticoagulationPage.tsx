import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'
import {
  agents,
  crclBands,
  highRiskProcedures,
  isRenallyAdjusted,
  labThresholds,
  liverDiseaseThresholds,
  lowRiskProcedures,
} from '../data/irAnticoagulation'
import type { Agent, BleedingRisk, CrClBand } from '../data/irAnticoagulation'

type Form = {
  risk: BleedingRisk
  agentKey: string
  crcl: CrClBand
}

const initialForm: Form = {
  risk: 'high',
  agentKey: '',
  crcl: 'ge50',
}

const groupOrder = [
  'Anticoagulants',
  'Antiplatelets: thienopyridines',
  'Antiplatelets: aspirin and NSAIDs',
  'Glycoprotein IIb/IIIa inhibitors',
  'Other',
] as const

function withholdFor(agent: Agent, risk: BleedingRisk, crcl: CrClBand) {
  if (risk === 'low') return agent.lowWithhold
  return typeof agent.highWithhold === 'string' ? agent.highWithhold : agent.highWithhold[crcl]
}

function restartFor(agent: Agent, risk: BleedingRisk) {
  return risk === 'low' ? agent.lowRestart : agent.highRestart
}

/** Flattens a renally-banded hold time into one cell for the summary table. */
function highWithholdText(agent: Agent) {
  const { highWithhold } = agent
  if (typeof highWithhold === 'string') return highWithhold
  return crclBands.map((band) => `CrCl ${band.label}: ${highWithhold[band.key]}`).join(' ')
}

/** Lowercases only the leading character, so units like 10⁹/L survive. */
function lcFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1)
}

/** Ensures exactly one trailing period when a fragment is spliced into a sentence. */
function sentence(text: string) {
  return text.endsWith('.') ? text : `${text}.`
}

/** Short form for the badge, so the hold reads at a glance. */
function badgeFor(withhold: string) {
  if (withhold.startsWith('Do not withhold')) return 'Do not withhold'
  if (withhold.startsWith('No recommendation')) return 'No recommendation'
  const match = withhold.match(/(\d+(?: to \d+)?)\s(days?|hours?|doses?)/)
  return match ? `Withhold ${match[1]} ${match[2]}` : 'See guidance'
}

type Result = {
  badge: string
  tone: 'good' | 'warn' | 'accent'
  withhold: string
  restart: string
  note?: string
  impression: string
}

function calc(form: Form): Result | null {
  const agent = agents.find((entry) => entry.key === form.agentKey)
  if (!agent) return null

  const withhold = withholdFor(agent, form.risk, form.crcl)
  const restart = restartFor(agent, form.risk)
  const badge = badgeFor(withhold)
  const labs = labThresholds[form.risk]
  const renal = isRenallyAdjusted(agent) && form.risk === 'high'
  const crclLabel = crclBands.find((band) => band.key === form.crcl)?.label ?? ''

  const riskWord = form.risk === 'low' ? 'low' : 'high'
  const renalSentence = renal ? ` Creatinine clearance ${crclLabel}.` : ''
  const noteSentence = agent.note ? ` ${sentence(agent.note)}` : ''
  const restartSentence = restart === 'Not applicable' ? '' : ` Reinitiation: ${sentence(restart)}`

  return {
    badge,
    tone: badge === 'Do not withhold' ? 'good' : badge === 'No recommendation' ? 'accent' : 'warn',
    withhold,
    restart,
    note: agent.note,
    impression: `Periprocedural anticoagulation plan, per SIR 2019 consensus guidelines. Procedure bleeding risk: ${riskWord}. Agent: ${agent.name}.${renalSentence} Before the procedure: ${sentence(withhold)}${restartSentence}${noteSentence} Laboratory thresholds for a ${riskWord} bleeding risk procedure: INR ${lcFirst(labs.inr)}; platelets ${lcFirst(labs.platelets)}. Guideline-based reference only; institutional protocol and the treating team govern management.`,
  }
}

const caveats = [
  'This page reproduces one consensus guideline. Institutional protocol, the proceduralist, and the team managing the patient anticoagulation govern the actual decision.',
  'The recommendations assume a single coagulation defect or drug at a time. A patient on more than one agent, or with an additional coagulation defect, falls outside the tabulated guidance.',
  'The recommendations may not apply to emergent or highly urgent procedures, where the risk of delay can outweigh the bleeding risk.',
  'Thrombotic risk sits on the other side of every one of these decisions. A patient at high risk of thromboembolism may warrant bridging, and multidisciplinary discussion is advised.',
  'Creatinine clearance bands below 15 mL/min, and patients on dialysis, are not covered by the tabulated DOAC hold times.',
  'Patients with chronic liver disease have separate laboratory thresholds, given below, because PT/INR does not reliably reflect bleeding risk in cirrhosis.',
]

const references: { label: string; href?: string }[] = [
  {
    label: 'Patel IJ, Rahim S, Davidson JC, et al. Society of Interventional Radiology Consensus Guidelines for the Periprocedural Management of Thrombotic and Bleeding Risk in Patients Undergoing Percutaneous Image-Guided Interventions, Part II: Recommendations. JVIR 2019;30(8):1168-1184',
    href: 'https://pubmed.ncbi.nlm.nih.gov/31229333/',
  },
  {
    label: 'Society of Interventional Radiology Consensus Guidelines, Part II: Recommendations, full text (JVIR)',
    href: 'https://www.jvir.org/article/S1051-0443(19)30407-5/fulltext',
  },
  {
    label: 'Davidson JC, Rahim S, Hanks SE, et al. Part I: Review of Anticoagulation Agents and Clinical Considerations. JVIR 2019;30(8):1155-1167',
  },
]

export function IrAnticoagulationPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  const result = useMemo(() => calc(form), [form])
  const selectedAgent = agents.find((entry) => entry.key === form.agentKey)
  const showCrcl = selectedAgent ? isRenallyAdjusted(selectedAgent) && form.risk === 'high' : false
  const labs = labThresholds[form.risk]

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Safety</p>
          <h2>Periprocedural anticoagulation</h2>
          <p>Hold and restart guidance for anticoagulant and antiplatelet agents before image-guided procedures, by procedure bleeding risk.</p>
          <p className="source-note">Source: <a href="https://pubmed.ncbi.nlm.nih.gov/31229333/" target="_blank" rel="noopener noreferrer">SIR Consensus Guidelines, Part II: Recommendations, JVIR 2019</a>. Guideline-based reference only; institutional protocol governs management.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Procedure and agent</h3>
          <div className="form-grid">
            <label>
              <span>Procedure bleeding risk</span>
              <select value={form.risk} onChange={(e) => update('risk', e.target.value as BleedingRisk)}>
                <option value="low">Low bleeding risk</option>
                <option value="high">High bleeding risk</option>
              </select>
            </label>
            <label>
              <span>Agent</span>
              <select value={form.agentKey} onChange={(e) => update('agentKey', e.target.value)}>
                <option value="">Select an agent</option>
                {groupOrder.map((group) => (
                  <optgroup key={group} label={group}>
                    {agents.filter((agent) => agent.group === group).map((agent) => (
                      <option key={agent.key} value={agent.key}>{agent.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            {showCrcl ? (
              <label>
                <span>Creatinine clearance</span>
                <select value={form.crcl} onChange={(e) => update('crcl', e.target.value as CrClBand)}>
                  {crclBands.map((band) => (
                    <option key={band.key} value={band.key}>{band.label}</option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
          <p className="source-note">Unsure how to classify the procedure? The full category lists are below.</p>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result ? result.badge : 'Awaiting input'} tone={result ? result.tone : 'accent'} />
          </div>

          {result ? (
            <>
              <div className="result-panel">
                <div>
                  <p className="metric-label">INR target</p>
                  <p className="metric-value">{form.risk === 'low' ? '2.0–3.0' : '1.5–1.8'}</p>
                </div>
                <div>
                  <p className="metric-label">Platelets ×10⁹/L</p>
                  <p className="metric-value">{form.risk === 'low' ? '≥ 20' : '≥ 50'}</p>
                </div>
              </div>
              <p className="result-summary"><strong>Before the procedure.</strong> {result.withhold}</p>
              <p className="result-summary"><strong>Reinitiation.</strong> {result.restart}</p>
              {result.note ? <p className="result-summary">{result.note}</p> : null}
              <CopyBlock label="Pre-procedure note" text={result.impression} />
            </>
          ) : (
            <p className="result-summary">Select the procedure bleeding risk and the agent to see hold and restart guidance.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Laboratory thresholds</h3>
        <p className="source-note">Currently showing thresholds for a {form.risk} bleeding risk procedure: {labs.screening}</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Procedure risk</th>
                <th>Screening tests</th>
                <th>INR</th>
                <th>Platelets</th>
              </tr>
            </thead>
            <tbody>
              {(['low', 'high'] as BleedingRisk[]).map((risk) => (
                <tr key={risk}>
                  <td className="vessel-name">{risk === 'low' ? 'Low' : 'High'}</td>
                  <td>{labThresholds[risk].screening}</td>
                  <td>{labThresholds[risk].inr}</td>
                  <td>{labThresholds[risk].platelets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="source-note">For low bleeding risk procedures requiring arterial access, the recommended INR threshold is below 1.8 for femoral access and below 2.2 for radial access.</p>
      </section>

      <section className="info-card">
        <h3>Chronic liver disease thresholds</h3>
        <p className="source-note">PT/INR in cirrhosis does not reflect bleeding risk in the usual way, so the guideline gives separate thresholds and suggests adding a fibrinogen level.</p>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Procedure risk</th>
                <th>INR</th>
                <th>Platelets</th>
                <th>Fibrinogen</th>
              </tr>
            </thead>
            <tbody>
              {liverDiseaseThresholds.map((row) => (
                <tr key={row.risk}>
                  <td className="vessel-name">{row.risk}</td>
                  <td>{row.inr}</td>
                  <td>{row.platelets}</td>
                  <td>{row.fibrinogen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Procedure bleeding risk categories</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Low bleeding risk</th>
                <th>High bleeding risk</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul className="plain-list">
                    {lowRiskProcedures.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </td>
                <td>
                  <ul className="plain-list">
                    {highRiskProcedures.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>All agents</h3>
        <div className="table-wrap">
          <table className="ref-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Low bleeding risk</th>
                <th>High bleeding risk</th>
                <th>Reinitiation after high risk</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.key}>
                  <td className="vessel-name">{agent.name}</td>
                  <td>{agent.lowWithhold}</td>
                  <td>{highWithholdText(agent)}</td>
                  <td>{agent.highRestart}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="info-card">
        <h3>Caveats</h3>
        <ul className="plain-list">
          {caveats.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          {references.map((ref) => (
            <li key={ref.label}>
              {ref.href ? <a href={ref.href} target="_blank" rel="noopener noreferrer">{ref.label}</a> : ref.label}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
