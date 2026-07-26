import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type Form = {
  cysticRenalMass: boolean
  enhancingPresent: boolean
  wallThickness: 'none' | 'thin' | 'minimallyThick' | 'thick'
  wallIrregularity: boolean
  septaCount: 'none' | 'few' | 'many'
  septaThickness: 'thin' | 'minimallyThick' | 'thick'
  calcificationOnly: boolean
  enhancingNodule: 'none' | 'irregularity' | 'nodule'
  t1HyperintenseUnenhanced: boolean
}

const initialForm: Form = {
  cysticRenalMass: true,
  enhancingPresent: false,
  wallThickness: 'thin',
  wallIrregularity: false,
  septaCount: 'none',
  septaThickness: 'thin',
  calcificationOnly: false,
  enhancingNodule: 'none',
  t1HyperintenseUnenhanced: false,
}

function classify(form: Form) {
  if (!form.cysticRenalMass) {
    return {
      category: 'Not applicable',
      reason: 'Bosniak 2019 is intended for cystic renal masses with less than about 25% enhancing tissue.',
      management: 'Use a different renal mass pathway for predominantly solid or non-cystic lesions.',
      impression: 'Renal lesion is not suitable for Bosniak 2019 classification because it is not a cystic renal mass.',
    }
  }

  if (form.enhancingNodule === 'nodule') {
    return {
      category: 'Bosniak IV',
      reason: 'Enhancing nodules are Bosniak IV.',
      management: 'Urologic referral and definitive management should be considered.',
      impression: 'Cystic renal mass contains an enhancing nodule, compatible with Bosniak IV.',
    }
  }

  if (form.enhancingPresent && (form.wallThickness === 'thick' || form.septaThickness === 'thick' || form.wallIrregularity || form.enhancingNodule === 'irregularity')) {
    return {
      category: 'Bosniak III',
      reason: 'Enhancing thick wall/septa or enhancing irregularity corresponds to Bosniak III.',
      management: 'Urologic consultation and individualized management should be considered.',
      impression: 'Cystic renal mass demonstrates enhancing thickened and/or irregular wall or septa, compatible with Bosniak III.',
    }
  }

  if (
    (form.enhancingPresent && form.wallThickness === 'minimallyThick') ||
    (form.enhancingPresent && form.septaThickness === 'minimallyThick') ||
    (form.enhancingPresent && form.septaCount === 'many') ||
    (!form.enhancingPresent && form.t1HyperintenseUnenhanced)
  ) {
    return {
      category: 'Bosniak IIF',
      reason: 'Smooth minimal thickening, many thin enhancing septa, or heterogeneously hyperintense appearance on unenhanced fat-saturated T1 can qualify as IIF.',
      management: 'Follow-up imaging is generally recommended at 6 months, 12 months, then annually for 5 years.',
      impression: 'Cystic renal mass is compatible with Bosniak IIF. Imaging follow-up is recommended.',
    }
  }

  if (
    (form.septaCount === 'few' && (form.enhancingPresent || form.calcificationOnly)) ||
    (form.septaCount === 'none' && form.calcificationOnly) ||
    (!form.enhancingPresent && !form.t1HyperintenseUnenhanced)
  ) {
    if (form.septaCount === 'none' && !form.calcificationOnly && form.wallThickness === 'thin') {
      return {
        category: 'Bosniak I',
        reason: 'Simple cyst with thin smooth wall and no septa or suspicious features.',
        management: 'No routine follow-up is required.',
        impression: 'Simple cystic renal lesion compatible with Bosniak I.',
      }
    }

    return {
      category: 'Bosniak II',
      reason: 'Few thin septa, calcification, or other reliably benign features are compatible with Bosniak II.',
      management: 'No routine follow-up is required.',
      impression: 'Cystic renal mass is compatible with Bosniak II.',
    }
  }

  return {
    category: 'Indeterminate',
    reason: 'Inputs do not map cleanly to a single Bosniak 2019 branch.',
    management: 'Review enhancement, septal morphology, and wall irregularity against the official Bosniak 2019 criteria.',
    impression: 'Indeterminate cystic renal mass; correlate with official Bosniak 2019 criteria.',
  }
}

export function BosniakPage() {
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
          <p className="eyebrow">Bosniak 2019</p>
          <h2>Bosniak 2019 calculator</h2>
          <p>Cystic renal mass helper with category assignment, management text, and copyable impression output.</p>
          <p className="source-note">Source: <a href="https://pubs.rsna.org/doi/full/10.1148/radiol.2019182646" target="_blank" rel="noopener noreferrer">Silverman et al., "Bosniak Classification of Cystic Renal Masses, Version 2019," Radiology 2019</a>.</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Morphology</h3>
          <div className="form-grid">
            <label className="check-row">
              <input type="checkbox" checked={form.cysticRenalMass} onChange={(e) => update('cysticRenalMass', e.target.checked)} />
              Lesion is a cystic renal mass rather than a predominantly solid mass
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.enhancingPresent} onChange={(e) => update('enhancingPresent', e.target.checked)} />
              Enhancement is present
            </label>

            <label>
              <span>Wall thickness</span>
              <select value={form.wallThickness} onChange={(e) => update('wallThickness', e.target.value as Form['wallThickness'])}>
                <option value="none">No visible wall</option>
                <option value="thin">Thin (≤2 mm)</option>
                <option value="minimallyThick">Minimally thickened (3 mm)</option>
                <option value="thick">Thick (≥4 mm)</option>
              </select>
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.wallIrregularity} onChange={(e) => update('wallIrregularity', e.target.checked)} />
              Enhancing wall or septal irregularity is present
            </label>

            <label>
              <span>Septa count</span>
              <select value={form.septaCount} onChange={(e) => update('septaCount', e.target.value as Form['septaCount'])}>
                <option value="none">None</option>
                <option value="few">Few (1-3)</option>
                <option value="many">Many (≥4)</option>
              </select>
            </label>

            <label>
              <span>Septa thickness</span>
              <select value={form.septaThickness} onChange={(e) => update('septaThickness', e.target.value as Form['septaThickness'])}>
                <option value="thin">Thin (≤2 mm)</option>
                <option value="minimallyThick">Minimally thickened (3 mm)</option>
                <option value="thick">Thick (≥4 mm)</option>
              </select>
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.calcificationOnly} onChange={(e) => update('calcificationOnly', e.target.checked)} />
              Calcification without other suspicious enhancing features
            </label>

            <label>
              <span>Enhancing convex protrusion</span>
              <select value={form.enhancingNodule} onChange={(e) => update('enhancingNodule', e.target.value as Form['enhancingNodule'])}>
                <option value="none">None</option>
                <option value="irregularity">Irregularity only (obtuse convex protrusion ≤3 mm)</option>
                <option value="nodule">Enhancing nodule</option>
              </select>
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.t1HyperintenseUnenhanced} onChange={(e) => update('t1HyperintenseUnenhanced', e.target.checked)} />
              Heterogeneously hyperintense on unenhanced fat-suppressed T1 MRI
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge
              label={result.category}
              tone={
                result.category.includes('I ') || result.category === 'Bosniak I' || result.category === 'Bosniak II'
                  ? 'good'
                  : result.category === 'Bosniak III' || result.category === 'Bosniak IV'
                    ? 'warn'
                    : 'accent'
              }
            />
          </div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Management" text={result.management} />
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
