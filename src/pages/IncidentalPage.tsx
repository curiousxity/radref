import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Tool = 'adrenal' | 'pancreas' | 'renal'

type AdrenalForm = {
  sizeCm: string
  densityHu: string
  benignFeatures: boolean
  priorStable: boolean
  cancerHistory: boolean
}

type PancreasForm = {
  sizeCm: string
  highRisk: boolean
  worrisome: boolean
  growth: boolean
}

type RenalForm = {
  sizeCm: string
  simpleCyst: boolean
  macroscopicFat: boolean
  enhancement: boolean
  homogeneousHyperdense: boolean
}

const initialAdrenal: AdrenalForm = { sizeCm: '', densityHu: '', benignFeatures: false, priorStable: false, cancerHistory: false }
const initialPancreas: PancreasForm = { sizeCm: '', highRisk: false, worrisome: false, growth: false }
const initialRenal: RenalForm = { sizeCm: '', simpleCyst: false, macroscopicFat: false, enhancement: false, homogeneousHyperdense: false }

function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function adrenalLogic(form: AdrenalForm) {
  const size = num(form.sizeCm)
  const hu = num(form.densityHu)

  if (size < 1) {
    return {
      category: 'Benign',
      reason: 'Adrenal masses smaller than 1 cm generally do not require further evaluation.',
      rec: 'No additional imaging is usually required.',
      impression: 'Subcentimeter incidental adrenal nodule without specific suspicious features. No additional imaging follow-up is usually required.',
    }
  }

  if (form.benignFeatures || form.priorStable) {
    return {
      category: 'Benign',
      reason: 'Diagnostic benign imaging features or prior stability support benignity.',
      rec: 'No additional imaging follow-up is usually required.',
      impression: 'Incidental adrenal lesion with benign imaging features or documented stability. No additional imaging follow-up is usually required.',
    }
  }

  if (!form.cancerHistory && size <= 4 && hu <= 10) {
    return {
      category: 'Likely adenoma',
      reason: 'Small lesion with low attenuation is compatible with a lipid-rich adenoma.',
      rec: 'No additional imaging follow-up is usually required.',
      impression: 'Incidental adrenal lesion is low attenuation and compatible with benign adenoma. No additional imaging follow-up is usually required.',
    }
  }

  if (size > 4) {
    return {
      category: 'Concerning',
      reason: 'Lesions larger than 4 cm are more concerning and often need dedicated evaluation or resection consideration.',
      rec: 'Dedicated adrenal protocol imaging and surgical or endocrine evaluation should be considered.',
      impression: 'Incidental adrenal mass larger than 4 cm. Dedicated adrenal evaluation and surgical or endocrine consultation should be considered.',
    }
  }

  return {
    category: 'Indeterminate',
    reason: 'Indeterminate adrenal lesion based on size, attenuation, or clinical history.',
    rec: form.cancerHistory
      ? 'Dedicated adrenal imaging, PET-CT, or biopsy may be appropriate depending on the clinical setting.'
      : 'Dedicated adrenal CT or MRI should be considered for further characterization.',
    impression: 'Indeterminate incidental adrenal lesion. Further characterization with dedicated adrenal imaging should be considered.',
  }
}

function pancreasLogic(form: PancreasForm) {
  const size = num(form.sizeCm)

  if (form.highRisk) {
    return {
      category: 'High risk',
      reason: 'High-risk stigmata warrant more aggressive evaluation.',
      rec: 'EUS/FNA and surgical consultation should be considered.',
      impression: 'Incidental pancreatic cyst with high-risk features. EUS/FNA and surgical consultation should be considered.',
    }
  }

  if (form.worrisome || form.growth) {
    return {
      category: 'Worrisome',
      reason: 'Growth or worrisome features increase concern.',
      rec: 'Closer imaging follow-up and consideration of EUS/FNA are appropriate.',
      impression: 'Incidental pancreatic cyst with growth or worrisome features. Closer follow-up and consideration of EUS/FNA are appropriate.',
    }
  }

  if (size < 0.5) {
    return {
      category: 'Tiny cyst',
      reason: 'Very small cysts may only need limited follow-up.',
      rec: 'Single follow-up at about 2 years may be sufficient in many patients.',
      impression: 'Tiny incidental pancreatic cyst without worrisome features. Limited interval follow-up may be sufficient.',
    }
  }

  if (size < 1.5) {
    return {
      category: 'Small cyst',
      reason: 'Small presumed mucinous cysts are typically followed over time.',
      rec: 'Periodic MRI or CT surveillance is recommended.',
      impression: 'Small incidental pancreatic cyst without high-risk features. Imaging surveillance is recommended.',
    }
  }

  if (size <= 2.5) {
    return {
      category: 'Intermediate cyst',
      reason: 'Intermediate-size cysts generally need closer surveillance.',
      rec: 'More frequent imaging follow-up and possible EUS depending on interval change should be considered.',
      impression: 'Intermediate-size incidental pancreatic cyst. Closer imaging surveillance should be considered.',
    }
  }

  return {
    category: 'Large cyst',
    reason: 'Larger cysts are more likely to need EUS-based evaluation.',
    rec: 'EUS/FNA and specialist evaluation should be considered.',
    impression: 'Larger incidental pancreatic cyst. EUS/FNA and specialist evaluation should be considered.',
  }
}

function renalLogic(form: RenalForm) {
  const size = num(form.sizeCm)

  if (form.simpleCyst) {
    return {
      category: 'Benign cyst',
      reason: 'Simple cystic features are benign.',
      rec: 'No additional imaging follow-up is usually required.',
      impression: 'Incidental renal lesion has simple cyst features. No additional imaging follow-up is usually required.',
    }
  }

  if (form.macroscopicFat) {
    return {
      category: 'AML pattern',
      reason: 'Macroscopic fat strongly suggests angiomyolipoma.',
      rec: 'Management depends on size and symptoms, but malignancy is unlikely.',
      impression: 'Incidental renal lesion contains macroscopic fat, compatible with angiomyolipoma.',
    }
  }

  if (!form.enhancement && form.homogeneousHyperdense) {
    return {
      category: 'Likely benign',
      reason: 'Nonenhancing homogeneous hyperdense lesion may be a benign hyperdense cyst.',
      rec: 'Further characterization may be unnecessary if fully characterized; otherwise consider protocol imaging.',
      impression: 'Incidental renal lesion is nonenhancing and homogeneous, favoring a benign hyperdense cyst if adequately characterized.',
    }
  }

  if (form.enhancement) {
    return {
      category: 'Enhancing mass',
      reason: 'Enhancement raises concern for neoplasm.',
      rec: 'Dedicated renal mass protocol CT or MRI and urologic evaluation should be considered.',
      impression: 'Enhancing incidental renal mass. Dedicated renal mass evaluation and urologic referral should be considered.',
    }
  }

  return {
    category: 'Indeterminate',
    reason: 'Lesion is not fully characterized.',
    rec: size < 1.5
      ? 'MRI is often preferred for smaller indeterminate renal masses.'
      : 'Dedicated renal mass protocol CT or MRI should be considered.',
    impression: 'Indeterminate incidental renal lesion. Further dedicated renal mass imaging should be considered.',
  }
}

function toneForCategory(category: string): 'good' | 'warn' | 'accent' {
  const lower = category.toLowerCase()
  if (lower.includes('benign') || lower.includes('adenoma') || lower.includes('aml')) return 'good'
  if (lower.includes('concerning') || lower.includes('high') || lower.includes('enhancing')) return 'warn'
  return 'accent'
}

export function IncidentalPage() {
  const [tool, setTool] = useState<Tool>('adrenal')
  const [adrenal, setAdrenal] = useState(initialAdrenal)
  const [pancreas, setPancreas] = useState(initialPancreas)
  const [renal, setRenal] = useState(initialRenal)

  const result = useMemo(() => {
    if (tool === 'adrenal') return adrenalLogic(adrenal)
    if (tool === 'pancreas') return pancreasLogic(pancreas)
    return renalLogic(renal)
  }, [tool, adrenal, pancreas, renal])

  function handleReset() {
    setAdrenal(initialAdrenal)
    setPancreas(initialPancreas)
    setRenal(initialRenal)
  }

  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">ACR incidental findings</p>
          <h2>Incidental findings tools</h2>
          <p>Quick management helpers for adrenal lesions, pancreatic cysts, and incidental renal masses.</p>
        </div>
        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Choose tool</h3>
          <div className="form-grid">
            <label>
              <span>Tool</span>
              <select value={tool} onChange={(e) => setTool(e.target.value as Tool)}>
                <option value="adrenal">Adrenal incidentaloma</option>
                <option value="pancreas">Pancreatic cyst</option>
                <option value="renal">Renal mass</option>
              </select>
            </label>

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
                  Diagnostic benign features
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={adrenal.priorStable} onChange={(e) => setAdrenal({ ...adrenal, priorStable: e.target.checked })} />
                  Prior stability
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={adrenal.cancerHistory} onChange={(e) => setAdrenal({ ...adrenal, cancerHistory: e.target.checked })} />
                  History of extra-adrenal malignancy
                </label>
              </>
            )}

            {tool === 'pancreas' && (
              <>
                <label>
                  <span>Cyst size (cm)</span>
                  <input type="number" step="0.1" inputMode="decimal" value={pancreas.sizeCm} onChange={(e) => setPancreas({ ...pancreas, sizeCm: e.target.value })} />
                </label>
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
                  <span>Lesion size (cm)</span>
                  <input type="number" step="0.1" inputMode="decimal" value={renal.sizeCm} onChange={(e) => setRenal({ ...renal, sizeCm: e.target.value })} />
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={renal.simpleCyst} onChange={(e) => setRenal({ ...renal, simpleCyst: e.target.checked })} />
                  Simple cyst features
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={renal.macroscopicFat} onChange={(e) => setRenal({ ...renal, macroscopicFat: e.target.checked })} />
                  Macroscopic fat
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={renal.enhancement} onChange={(e) => setRenal({ ...renal, enhancement: e.target.checked })} />
                  Enhancement present
                </label>
                <label className="check-row">
                  <input type="checkbox" checked={renal.homogeneousHyperdense} onChange={(e) => setRenal({ ...renal, homogeneousHyperdense: e.target.checked })} />
                  Homogeneous hyperdense nonenhancing lesion
                </label>
              </>
            )}
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge label={result.category} tone={toneForCategory(result.category)} />
          </div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Recommendation" text={result.rec} />
        </article>
      </section>
    </div>
  )
}
