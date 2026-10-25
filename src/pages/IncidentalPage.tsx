import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'
import { classifyAdrenal, initialAdrenalForm } from '../logic/incidentalAdrenal'
import type { AdrenalPrior, IncidentalResult } from '../logic/incidentalAdrenal'
import { classifyPancreaticCyst } from '../logic/pancreaticCyst'
import type { AgeBand, DuctCommunication } from '../logic/pancreaticCyst'
import { classifyRenal, initialRenalForm } from '../logic/incidentalRenal'
import type { RenalAppearance, RenalCharacterized, RenalExam } from '../logic/incidentalRenal'

type Tool = 'adrenal' | 'pancreas' | 'renal'

type PancreasForm = {
  sizeCm: string
  ageBand: AgeBand
  ductCommunication: DuctCommunication
  highRisk: boolean
  worrisome: boolean
  growth: boolean
}

const initialPancreas: PancreasForm = { sizeCm: '', ageBand: '65-79', ductCommunication: 'indeterminate', highRisk: false, worrisome: false, growth: false }

/** The pancreatic cyst tool is the pancreatic cyst calculator's logic, with its ACR intervals. */
function pancreasLogic(form: PancreasForm): IncidentalResult {
  const result = classifyPancreaticCyst({
    sizeCm: form.sizeCm,
    ageBand: form.ageBand,
    ductCommunication: form.ductCommunication,
    growth: form.growth,
    worrisomeFeatures: form.worrisome,
    highRiskStigmata: form.highRisk,
    alternativeDiagnosis: 'none',
    symptomsOrPancreatitis: false,
  })
  const tone = result.category === 'High risk' || result.category === 'Worrisome' ? 'warn' : result.category === 'Awaiting size' ? 'neutral' : 'accent'
  return { category: result.category, tone, reason: result.reason, recommendation: result.management, impression: result.impression }
}

const sourceLinks: Record<Tool, { href: string; label: string }> = {
  adrenal: {
    href: 'https://pubmed.ncbi.nlm.nih.gov/28651988/',
    label: 'Mayo-Smith et al., "Management of Incidental Adrenal Masses: A White Paper of the ACR Incidental Findings Committee," JACR 2017',
  },
  pancreas: {
    href: 'https://pubmed.ncbi.nlm.nih.gov/28533111/',
    label: 'Megibow et al., "Management of Incidental Pancreatic Cysts: A White Paper of the ACR Incidental Findings Committee," JACR 2017',
  },
  renal: {
    href: 'https://pubmed.ncbi.nlm.nih.gov/28651987/',
    label: 'Management of the Incidental Renal Mass on CT: A White Paper of the ACR Incidental Findings Committee, JACR 2018',
  },
}

const ageBandOptions: { value: AgeBand; label: string }[] = [
  { value: '<65', label: '<65' },
  { value: '65-79', label: '65-79' },
  { value: '80+', label: '80+' },
]

const ductCommunicationOptions: { value: DuctCommunication; label: string }[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'indeterminate', label: 'Indeterminate' },
]

const priorOptions: { value: AdrenalPrior; label: string }[] = [
  { value: 'none', label: 'No prior imaging' },
  { value: 'stable', label: 'Stable 1 year or more' },
  { value: 'growing', label: 'New or enlarging' },
]

const examOptions: { value: RenalExam; label: string }[] = [
  { value: 'unenhanced', label: 'Unenhanced CT only' },
  { value: 'enhanced', label: 'Contrast-enhanced CT only' },
  { value: 'protocol', label: 'CT or MRI without and with contrast' },
]

const appearanceOptions: { value: RenalAppearance; label: string }[] = [
  { value: 'homogeneous', label: 'Homogeneous' },
  { value: 'heterogeneous', label: 'Heterogeneous' },
  { value: 'tstc', label: 'Too small to characterize' },
]

const characterizedOptions: { value: RenalCharacterized; label: string }[] = [
  { value: 'solid', label: 'Solid' },
  { value: 'bosniakI-II', label: 'Bosniak I or II' },
  { value: 'bosniakIIF', label: 'Bosniak IIF' },
  { value: 'bosniakIII-IV', label: 'Bosniak III or IV' },
  { value: 'tstc', label: 'Too small to characterize' },
]

const toolOptions: { value: Tool; label: string }[] = [
  { value: 'adrenal', label: 'Adrenal incidentaloma' },
  { value: 'pancreas', label: 'Pancreatic cyst' },
  { value: 'renal', label: 'Renal mass' },
]

export function IncidentalPage() {
  const [tool, setTool] = useState<Tool>('adrenal')
  const [adrenal, setAdrenal] = useState(initialAdrenalForm)
  const [pancreas, setPancreas] = useState(initialPancreas)
  const [renal, setRenal] = useState(initialRenalForm)

  const result = useMemo(() => {
    if (tool === 'adrenal') return classifyAdrenal(adrenal)
    if (tool === 'pancreas') return pancreasLogic(pancreas)
    return classifyRenal(renal)
  }, [tool, adrenal, pancreas, renal])

  function handleReset() {
    setAdrenal(initialAdrenalForm)
    setPancreas(initialPancreas)
    setRenal(initialRenalForm)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>Incidental findings tools</h2>
          <span className="calc-tag">ACR incidental findings</span>
        </div>
        <p>Quick management helpers for adrenal lesions, pancreatic cysts, and incidental renal masses.</p>
        <p className="source-note">Source: <a href={sourceLinks[tool].href} target="_blank" rel="noopener noreferrer">{sourceLinks[tool].label}</a>.</p>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Choose tool</h3>
          <div className="form-grid">
            <ChoiceGroup label="Tool" layout="stack" value={tool} options={toolOptions} onChange={(value) => setTool(value)} />

            {tool === 'adrenal' && (
              <>
                <label>
                  <span>Size (cm)</span>
                  <input type="number" step="0.1" inputMode="decimal" value={adrenal.sizeCm} onChange={(e) => setAdrenal({ ...adrenal, sizeCm: e.target.value })} />
                </label>
                <label>
                  <span>Unenhanced density (HU)</span>
                  <input type="number" step="1" inputMode="decimal" value={adrenal.densityHu} onChange={(e) => setAdrenal({ ...adrenal, densityHu: e.target.value })} />
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={adrenal.benignFeatures} onChange={(e) => setAdrenal({ ...adrenal, benignFeatures: e.target.checked })} />
                  Diagnostic benign features (myelolipoma, no enhancement, benign calcified mass)
                </label>
                <ChoiceGroup label="Prior imaging" layout="stack" value={adrenal.prior} options={priorOptions} onChange={(value) => setAdrenal({ ...adrenal, prior: value })} />
                <label className="check-row">
                  <input type="checkbox" checked={adrenal.cancerHistory} onChange={(e) => setAdrenal({ ...adrenal, cancerHistory: e.target.checked })} />
                  History of cancer, with no other metastatic disease
                </label>
              </>
            )}

            {tool === 'pancreas' && (
              <>
                <label>
                  <span>Cyst size (cm)</span>
                  <input type="number" step="0.1" inputMode="decimal" value={pancreas.sizeCm} onChange={(e) => setPancreas({ ...pancreas, sizeCm: e.target.value })} />
                </label>
                <ChoiceGroup label="Age band" layout="row" value={pancreas.ageBand} options={ageBandOptions} onChange={(value) => setPancreas({ ...pancreas, ageBand: value })} />
                <ChoiceGroup label="Main pancreatic duct communication" layout="row" value={pancreas.ductCommunication} options={ductCommunicationOptions} onChange={(value) => setPancreas({ ...pancreas, ductCommunication: value })} />
                <label className="check-row">
                  <input type="checkbox" checked={pancreas.highRisk} onChange={(e) => setPancreas({ ...pancreas, highRisk: e.target.checked })} />
                  High-risk stigmata
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={pancreas.worrisome} onChange={(e) => setPancreas({ ...pancreas, worrisome: e.target.checked })} />
                  Worrisome features
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={pancreas.growth} onChange={(e) => setPancreas({ ...pancreas, growth: e.target.checked })} />
                  Interval growth
                </label>
              </>
            )}

            {tool === 'renal' && (
              <>
                <label>
                  <span>Size, largest diameter (cm)</span>
                  <input type="number" step="0.1" inputMode="decimal" value={renal.sizeCm} onChange={(e) => setRenal({ ...renal, sizeCm: e.target.value })} />
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={renal.fat} onChange={(e) => setRenal({ ...renal, fat: e.target.checked })} />
                  Contains fat (a region of interest below -10 HU)
                </label>
                {renal.fat ? (
                  <>
                    <label className="check-row">
                      <input type="checkbox" checked={renal.fatCalcification} onChange={(e) => setRenal({ ...renal, fatCalcification: e.target.checked })} />
                      Also contains calcification
                    </label>
                    <label className="check-row">
                      <input type="checkbox" checked={renal.fatMultipleOrGrowing} onChange={(e) => setRenal({ ...renal, fatMultipleOrGrowing: e.target.checked })} />
                      Multiple, or growing on old studies
                    </label>
                    <label className="check-row">
                      <input type="checkbox" checked={renal.fatSymptoms} onChange={(e) => setRenal({ ...renal, fatSymptoms: e.target.checked })} />
                      Symptoms (hematuria, flank pain, spontaneous bleeding)
                    </label>
                  </>
                ) : (
                  <>
                    <ChoiceGroup label="Examination" layout="stack" value={renal.exam} options={examOptions} onChange={(value) => setRenal({ ...renal, exam: value })} />
                    {renal.exam === 'protocol'
                      ? <ChoiceGroup label="Mass" layout="stack" value={renal.characterized} options={characterizedOptions} onChange={(value) => setRenal({ ...renal, characterized: value })} />
                      : <ChoiceGroup label="Appearance" layout="stack" value={renal.appearance} options={appearanceOptions} onChange={(value) => setRenal({ ...renal, appearance: value })} />}
                    {renal.exam !== 'protocol' && renal.appearance === 'homogeneous' && (
                      <label>
                        <span>Density (HU)</span>
                        <input type="number" step="1" inputMode="decimal" value={renal.densityHu} onChange={(e) => setRenal({ ...renal, densityHu: e.target.value })} />
                      </label>
                    )}
                    {(renal.exam === 'protocol' ? renal.characterized === 'tstc' : renal.appearance === 'tstc') && (
                      <label className="check-row">
                        <input type="checkbox" checked={renal.tstcBenignLooking} onChange={(e) => setRenal({ ...renal, tstcBenignLooking: e.target.checked })} />
                        Well circumscribed, homogeneous, and visually much lower (or, unenhanced, much higher) than the renal parenchyma
                      </label>
                    )}
                    <label className="check-row">
                      <input type="checkbox" checked={renal.stableFiveYears} onChange={(e) => setRenal({ ...renal, stableFiveYears: e.target.checked })} />
                      Unchanged for 5 years or more, growing 3 mm a year or less
                    </label>
                  </>
                )}
              </>
            )}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>
          <div className="result-strip">
            <div className="result-strip-head">
              <p className={`result-strip-value result-strip-value--phrase tone-${result.tone}`}>{result.category}</p>
            </div>
            <p className="result-strip-summary">{result.reason}</p>
          </div>
          {result.impression && <CopyBlock label="Impression" text={result.impression} />}
          {result.recommendation && <CopyBlock label="Recommendation" text={result.recommendation} />}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
