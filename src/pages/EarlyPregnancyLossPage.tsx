import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type InitialFinding = 'noYolkSac' | 'yolkSacPresent' | 'msdUnder12' | 'msdOver12'

type Form = {
  embryoVisible: boolean
  crlMm: string
  heartbeatPresent: boolean
  cardiacActivityPreviouslyDocumented: boolean
  gestSacVisible: boolean
  msdMm: string
  lmpWeeks6OrMore: boolean
  isFollowUp: boolean
  daysSinceInitialScan: string
  initialFinding: InitialFinding
  sacFailedToDouble: boolean
  emptyAmnionSign: boolean
  expandedAmnionSign: boolean
  yolkStalkSign: boolean
  enlargedYolkSac: boolean
  smallSacRelativeToEmbryo: boolean
}

const initialForm: Form = {
  embryoVisible: true,
  crlMm: '',
  heartbeatPresent: true,
  cardiacActivityPreviouslyDocumented: false,
  gestSacVisible: true,
  msdMm: '',
  lmpWeeks6OrMore: false,
  isFollowUp: false,
  daysSinceInitialScan: '',
  initialFinding: 'noYolkSac',
  sacFailedToDouble: false,
  emptyAmnionSign: false,
  expandedAmnionSign: false,
  yolkStalkSign: false,
  enlargedYolkSac: false,
  smallSacRelativeToEmbryo: false,
}

function classify(form: Form) {
  const crl = form.crlMm === '' ? NaN : parseFloat(form.crlMm)
  const msd = form.msdMm === '' ? NaN : parseFloat(form.msdMm)
  const days = form.daysSinceInitialScan === '' ? NaN : parseFloat(form.daysSinceInitialScan)

  const diagnostic: string[] = []
  const suspicious: string[] = []

  if (form.embryoVisible) {
    if (!form.heartbeatPresent) {
      if (form.cardiacActivityPreviouslyDocumented) {
        diagnostic.push('Cessation of previously documented embryonic cardiac activity.')
      }
      if (form.isFollowUp && !Number.isNaN(days) && days >= 7) {
        diagnostic.push(`Embryo without cardiac activity on the initial scan and on repeat scan ${days} days later (≥7 days).`)
      }
      if (!Number.isNaN(crl)) {
        if (crl >= 7) {
          diagnostic.push(`Crown-rump length ${crl} mm (≥7 mm) with no cardiac activity.`)
        } else if (diagnostic.length === 0) {
          suspicious.push(`Crown-rump length ${crl} mm (<7 mm) with no cardiac activity.`)
        }
      }
      if (form.expandedAmnionSign) {
        suspicious.push('Expanded amnion sign: embryo present with visible amnion but no cardiac activity.')
      }
    }
  } else {
    if (!form.gestSacVisible) {
      if (form.lmpWeeks6OrMore) {
        suspicious.push('No embryo visualized at 6 weeks or more after the last menstrual period.')
      }
    } else if (!Number.isNaN(msd)) {
      if (msd >= 25) {
        diagnostic.push(`Mean sac diameter ${msd} mm (≥25 mm) with no embryo.`)
      } else if (msd >= 16) {
        suspicious.push(`Mean sac diameter ${msd} mm (16-24 mm) with no embryo.`)
      } else if (form.isFollowUp && !Number.isNaN(days)) {
        if (form.initialFinding === 'noYolkSac') {
          if (days >= 14) diagnostic.push(`No embryo with heartbeat ${days} days (≥14 days) after a scan showing a gestational sac without a yolk sac.`)
          else if (days >= 7) suspicious.push(`No embryo with heartbeat ${days} days (7-13 days) after a scan showing a gestational sac without a yolk sac.`)
        } else if (form.initialFinding === 'yolkSacPresent') {
          if (days >= 11) diagnostic.push(`No embryo with heartbeat ${days} days (≥11 days) after a scan showing a gestational sac with a yolk sac.`)
          else if (days >= 7) suspicious.push(`No embryo with heartbeat ${days} days (7-10 days) after a scan showing a gestational sac with a yolk sac.`)
        } else if (form.initialFinding === 'msdUnder12') {
          if (days >= 14 && form.sacFailedToDouble) {
            diagnostic.push(`Mean sac diameter <12 mm on the initial scan failed to double in size on a scan ${days} days later (≥14 days).`)
          }
        } else if (form.initialFinding === 'msdOver12') {
          if (days >= 7) diagnostic.push(`Mean sac diameter ≥12 mm on the initial scan with no embryo cardiac activity on a scan ${days} days later (≥7 days).`)
        }
      }
      if (diagnostic.length === 0 && suspicious.length === 0 && form.lmpWeeks6OrMore) {
        suspicious.push('No embryo visualized at 6 weeks or more after the last menstrual period.')
      }
    }
  }

  if (form.emptyAmnionSign) suspicious.push('Empty amnion sign: no embryo visualized when an amnion is seen adjacent to the yolk sac.')
  if (form.yolkStalkSign) suspicious.push('Yolk stalk sign: yolk sac separated from the embryo with crown-rump length ≤5 mm.')
  if (form.enlargedYolkSac) suspicious.push('Enlarged yolk sac, greater than 7 mm.')
  if (form.smallSacRelativeToEmbryo) suspicious.push('Small gestational sac relative to the embryo (mean sac diameter minus crown-rump length <5 mm).')

  let category: string
  let tone: 'good' | 'accent' | 'warn'
  let reportLine: string
  let management: string

  if (diagnostic.length > 0) {
    category = 'Diagnostic of early pregnancy loss'
    tone = 'warn'
    reportLine = 'Findings are diagnostic of early pregnancy loss.'
    management = 'Findings meet SRU consensus criteria for pregnancy loss; imaging follow-up is not required to establish nonviability. Correlate with clinical context before intervention.'
  } else if (suspicious.length > 0) {
    category = 'Suspicious for early pregnancy loss'
    tone = 'accent'
    reportLine = 'Findings are suspicious for early pregnancy loss; follow-up ultrasound in 7 to 14 days is recommended.'
    management = 'Follow-up transvaginal ultrasound in 7 to 14 days is recommended to reassess viability; avoid intervention based on suspicious findings alone.'
  } else {
    category = 'No diagnostic or suspicious findings'
    tone = 'good'
    reportLine = 'No sonographic findings diagnostic of or suspicious for early pregnancy loss at this time.'
    management = 'Continue routine early pregnancy dating and viability assessment as clinically indicated.'
  }

  const reasons = [...diagnostic, ...suspicious]
  const summary = reasons.length ? reasons.join(' ') : 'No criteria for early pregnancy loss are met based on the entered findings.'
  const impression = `${summary} ${reportLine}`

  return { category, tone, summary, reportLine, management, impression }
}

export function EarlyPregnancyLossPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => classify(form), [form])

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Early pregnancy</p>
          <h2>Early pregnancy loss criteria</h2>
          <p>SRU consensus helper for transvaginal ultrasound findings diagnostic of, or suspicious for, first-trimester pregnancy loss.</p>
          <p className="source-note">
            Source: <a href="https://pubmed.ncbi.nlm.nih.gov/24106937/" target="_blank" rel="noopener noreferrer">Doubilet et al., "Diagnostic Criteria for Nonviable Pregnancy Early in the First Trimester," N Engl J Med 2013</a>. Stringent, consensus-based thresholds intended to avoid harm to a potentially viable pregnancy.
          </p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.embryoVisible} onChange={(e) => update('embryoVisible', e.target.checked)} />
              Embryo visible
            </label>

            {form.embryoVisible ? (
              <>
                <label>
                  <span>Crown-rump length (mm)</span>
                  <input type="number" min="0" step="0.1" value={form.crlMm} onChange={(e) => update('crlMm', e.target.value)} />
                </label>

                <label className="check-row">
                  <input type="checkbox" checked={form.heartbeatPresent} onChange={(e) => update('heartbeatPresent', e.target.checked)} />
                  Cardiac activity present
                </label>

                {!form.heartbeatPresent && (
                  <>
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={form.cardiacActivityPreviouslyDocumented}
                        onChange={(e) => update('cardiacActivityPreviouslyDocumented', e.target.checked)}
                      />
                      Cardiac activity was previously documented in this pregnancy (cessation)
                    </label>

                    <label className="check-row">
                      <input type="checkbox" checked={form.expandedAmnionSign} onChange={(e) => update('expandedAmnionSign', e.target.checked)} />
                      Amnion visible around embryo, no cardiac activity (expanded amnion sign)
                    </label>
                  </>
                )}
              </>
            ) : (
              <>
                <label className="check-row">
                  <input type="checkbox" checked={form.gestSacVisible} onChange={(e) => update('gestSacVisible', e.target.checked)} />
                  Gestational sac visible
                </label>

                {form.gestSacVisible ? (
                  <label>
                    <span>Mean sac diameter (mm)</span>
                    <input type="number" min="0" step="0.1" value={form.msdMm} onChange={(e) => update('msdMm', e.target.value)} />
                  </label>
                ) : (
                  <label className="check-row">
                    <input type="checkbox" checked={form.lmpWeeks6OrMore} onChange={(e) => update('lmpWeeks6OrMore', e.target.checked)} />
                    6 weeks or more since last menstrual period
                  </label>
                )}
              </>
            )}
          </div>

          {(!form.embryoVisible || (form.embryoVisible && !form.heartbeatPresent)) && (
            <div className="form-grid" style={{ marginTop: '1rem' }}>
              <label className="check-row">
                <input type="checkbox" checked={form.isFollowUp} onChange={(e) => update('isFollowUp', e.target.checked)} />
                This is a follow-up scan after a prior nondiagnostic scan
              </label>

              {form.isFollowUp && (
                <>
                  <label>
                    <span>Days since initial scan</span>
                    <input type="number" min="0" step="1" value={form.daysSinceInitialScan} onChange={(e) => update('daysSinceInitialScan', e.target.value)} />
                  </label>

                  {!form.embryoVisible && form.gestSacVisible && (
                    <label>
                      <span>Initial scan finding</span>
                      <select value={form.initialFinding} onChange={(e) => update('initialFinding', e.target.value as InitialFinding)}>
                        <option value="noYolkSac">Gestational sac without a yolk sac</option>
                        <option value="yolkSacPresent">Gestational sac with a yolk sac</option>
                        <option value="msdUnder12">Mean sac diameter &lt;12 mm</option>
                        <option value="msdOver12">Mean sac diameter ≥12 mm</option>
                      </select>
                    </label>
                  )}

                  {!form.embryoVisible && form.gestSacVisible && form.initialFinding === 'msdUnder12' && (
                    <label className="check-row">
                      <input type="checkbox" checked={form.sacFailedToDouble} onChange={(e) => update('sacFailedToDouble', e.target.checked)} />
                      Sac failed to double in size on this follow-up scan
                    </label>
                  )}
                </>
              )}
            </div>
          )}

          <h3 style={{ marginTop: '1.5rem' }}>Additional suspicious signs</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.emptyAmnionSign} onChange={(e) => update('emptyAmnionSign', e.target.checked)} />
              Empty amnion sign
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.yolkStalkSign} onChange={(e) => update('yolkStalkSign', e.target.checked)} />
              Yolk stalk sign (yolk sac separated from embryo, CRL ≤5 mm)
            </label>
            <label className="check-row">
              <input type="checkbox" checked={form.enlargedYolkSac} onChange={(e) => update('enlargedYolkSac', e.target.checked)} />
              Enlarged yolk sac (&gt;7 mm)
            </label>
            <label className="check-row">
              <input
                type="checkbox"
                checked={form.smallSacRelativeToEmbryo}
                onChange={(e) => update('smallSacRelativeToEmbryo', e.target.checked)}
              />
              Small gestational sac relative to embryo (MSD − CRL &lt;5 mm)
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.category} tone={result.tone} />
          </div>
          <p className="result-summary">{result.summary}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Management" text={result.management} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>

      <section className="info-card">
        <h3>Diagnostic criteria (full reference)</h3>
        <ul className="plain-list">
          <li>Crown-rump length (CRL) of 7 mm or greater with no heartbeat.</li>
          <li>Mean sac diameter (MSD) of 25 mm or greater with no embryo.</li>
          <li>Absence of an embryo with heartbeat 14 days or more after a scan that showed a gestational sac without a yolk sac.</li>
          <li>Absence of an embryo with heartbeat 11 days or more after a scan that showed a gestational sac with a yolk sac.</li>
          <li>Sac with no embryo and an MSD less than 12 mm on the initial scan that fails to double in size on a scan performed 14 days or more later.</li>
          <li>Sac with no embryo and an MSD 12 mm or greater on the initial scan with no embryo heart activity on a scan performed 7 days or more later.</li>
          <li>Embryo without cardiac activity on the initial scan and on repeat scan 7 days or more later.</li>
          <li>Cessation of previously documented embryonic cardiac activity.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Suspicious but not diagnostic (full reference)</h3>
        <ul className="plain-list">
          <li>Crown-rump length less than 7 mm with no heartbeat.</li>
          <li>Mean sac diameter 16 to 24 mm with no embryo.</li>
          <li>Absence of embryo with heartbeat 7 to 13 days after a scan that showed a gestational sac without a yolk sac.</li>
          <li>Absence of embryo with heartbeat 7 to 10 days after a scan that showed a gestational sac with a yolk sac.</li>
          <li>Absence of embryo 6 weeks or more after the last menstrual period.</li>
          <li>Absence of embryo when an amnion is seen adjacent to the yolk sac (empty amnion sign).</li>
          <li>Embryo present with amnion visible around it but no heartbeat (expanded amnion sign).</li>
          <li>Yolk sac separated from an embryo when the CRL is 5 mm or less (yolk stalk sign).</li>
          <li>Small gestational sac relative to the embryo, defined as less than 5 mm difference between mean sac diameter and crown-rump length.</li>
          <li>Enlarged yolk sac greater than 7 mm.</li>
        </ul>
      </section>

      <section className="info-card">
        <h3>Follow-up</h3>
        <p className="result-summary">When findings are suspicious but not diagnostic, follow-up ultrasonography in 7 to 14 days is generally appropriate to assess viability.</p>
      </section>

      <section className="info-card">
        <h3>References</h3>
        <ol className="plain-list">
          <li>
            <a href="https://pubmed.ncbi.nlm.nih.gov/24106937/" target="_blank" rel="noopener noreferrer">
              Doubilet PM, Benson CB, Bourne T, Blaivas M, et al. Diagnostic Criteria for Nonviable Pregnancy Early in the First Trimester. N Engl J Med. 2013;369(15):1443-1451.
            </a>
          </li>
        </ol>
      </section>
    </div>
  )
}
