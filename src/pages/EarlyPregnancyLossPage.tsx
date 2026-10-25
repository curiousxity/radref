import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { classifyEarlyPregnancyLoss, initialEarlyPregnancyForm } from '../logic/earlyPregnancyLoss'
import type { EarlyPregnancyForm as Form, InitialFinding } from '../logic/earlyPregnancyLoss'

const initialFindingOptions: { value: InitialFinding; label: string }[] = [
  { value: 'noYolkSac', label: 'Gestational sac without a yolk sac' },
  { value: 'yolkSacPresent', label: 'Gestational sac with a yolk sac' },
  { value: 'msdUnder12', label: 'Mean sac diameter <12 mm' },
  { value: 'msdOver12', label: 'Mean sac diameter ≥12 mm' },
]

export function EarlyPregnancyLossPage() {
  const [form, setForm] = useState<Form>(initialEarlyPregnancyForm)
  const result = useMemo(() => classifyEarlyPregnancyLoss(form), [form])

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialEarlyPregnancyForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Early pregnancy loss criteria</h2>
          <span className="calc-tag">Early pregnancy</span>
        </div>
        <p>SRU consensus helper for transvaginal ultrasound findings diagnostic of, or suspicious for, first-trimester pregnancy loss.</p>
        <p className="source-note">
          Source: <a href="https://pubmed.ncbi.nlm.nih.gov/24106937/" target="_blank" rel="noopener noreferrer">Doubilet et al., "Diagnostic Criteria for Nonviable Pregnancy Early in the First Trimester," N Engl J Med 2013</a>. Stringent, consensus-based thresholds intended to avoid harm to a potentially viable pregnancy.
        </p>
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
                    <ChoiceGroup label="Initial scan finding" layout="stack" value={form.initialFinding} options={initialFindingOptions} onChange={(value) => update('initialFinding', value)} />
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
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value result-strip-value--phrase tone-${result.tone}`}>{result.category}</p>
            </div>
            <p className="result-strip-summary">{result.summary}</p>
          </div>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Recommendation" text={result.management} />
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
        <p className="result-summary">When findings are suspicious but not diagnostic, follow-up ultrasonography at 7 to 10 days is generally appropriate to assess viability.</p>
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
