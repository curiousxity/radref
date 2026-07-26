import { useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CopyBlock } from '../components/CopyBlock'

type NoduleType = 'solid' | 'partSolid' | 'groundGlass' | 'airway' | 'infectious'
type Timepoint = 'baseline' | 'new' | 'growing' | 'stable'

type Form = {
  noduleType: NoduleType
  timepoint: Timepoint
  meanDiameterMm: string
  solidComponentMm: string
  airwaySegment: 'subsegmental' | 'segmentalOrMoreProximal'
  airwayBenignFeatures: boolean
  inflammatoryPattern: boolean
  verySuspicious: boolean
}

const initialForm: Form = {
  noduleType: 'solid',
  timepoint: 'baseline',
  meanDiameterMm: '',
  solidComponentMm: '',
  airwaySegment: 'subsegmental',
  airwayBenignFeatures: false,
  inflammatoryPattern: false,
  verySuspicious: false,
}

function num(v: string) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function calc(form: Form) {
  const size = num(form.meanDiameterMm)
  const solid = num(form.solidComponentMm)

  if (form.noduleType === 'infectious' || form.inflammatoryPattern) {
    return {
      category: 'Lung-RADS 0',
      reason: 'Potentially infectious or inflammatory findings may warrant short interval follow-up rather than standard category assignment.',
      management: '1-3 month LDCT may be appropriate depending on the pattern and clinical context.',
      impression: 'Potentially infectious or inflammatory pulmonary findings. Lung-RADS 0 with short-interval low-dose chest CT follow-up as clinically appropriate.',
    }
  }

  if (form.noduleType === 'airway') {
    if (form.airwaySegment === 'subsegmental' && form.airwayBenignFeatures) {
      return {
        category: 'Lung-RADS 2',
        reason: 'Subsegmental airway nodule with benign features is considered likely benign.',
        management: 'Continue annual LDCT screening in 12 months.',
        impression: 'Likely benign airway nodule. Lung-RADS 2. Continue annual screening LDCT in 12 months.',
      }
    }

    return {
      category: 'Lung-RADS 4A',
      reason: 'Segmental or more proximal airway nodules, or airway nodules without benign features, are suspicious.',
      management: '3-month LDCT is recommended; PET/CT may be considered if there is a solid component of at least 8 mm.',
      impression: 'Suspicious airway nodule. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
    }
  }

  if (form.noduleType === 'groundGlass') {
    if (size < 30) {
      return {
        category: 'Lung-RADS 2',
        reason: 'Baseline nonsolid nodule smaller than 30 mm is category 2.',
        management: 'Continue annual LDCT screening in 12 months.',
        impression: 'Nonsolid pulmonary nodule is compatible with Lung-RADS 2. Continue annual screening LDCT in 12 months.',
      }
    }

    if (form.timepoint === 'growing') {
      return {
        category: 'Lung-RADS 3',
        reason: 'Growing nonsolid nodules remain category 3 unless another more suspicious feature is present.',
        management: '6-month LDCT is recommended.',
        impression: 'Growing nonsolid pulmonary nodule. Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.',
      }
    }

    return {
      category: 'Lung-RADS 3',
      reason: 'Large nonsolid nodule is category 3.',
      management: '6-month LDCT is recommended.',
      impression: 'Large nonsolid pulmonary nodule. Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.',
    }
  }

  if (form.noduleType === 'solid') {
    if (form.timepoint === 'baseline') {
      if (size < 6) {
        return {
          category: 'Lung-RADS 2',
          reason: 'Baseline solid nodule smaller than 6 mm is category 2.',
          management: 'Continue annual LDCT screening in 12 months.',
          impression: 'Small solid pulmonary nodule. Lung-RADS 2. Continue annual screening LDCT in 12 months.',
        }
      }

      if (size < 8) {
        return {
          category: 'Lung-RADS 3',
          reason: 'Baseline solid nodule 6 to <8 mm is category 3.',
          management: '6-month LDCT is recommended.',
          impression: 'Solid pulmonary nodule measuring 6 to less than 8 mm. Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.',
        }
      }

      if (size < 15) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'Baseline solid nodule 8 to <15 mm is category 4A.',
          management: '3-month LDCT is recommended; PET/CT may be considered.',
          impression: 'Solid pulmonary nodule measuring 8 to less than 15 mm. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'Large solid nodule is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `Very suspicious solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    if (form.timepoint === 'new') {
      if (size < 4) {
        return {
          category: 'Lung-RADS 2',
          reason: 'New solid nodule smaller than 4 mm is category 2.',
          management: 'Continue annual LDCT screening in 12 months.',
          impression: 'New very small solid pulmonary nodule. Lung-RADS 2. Continue annual screening LDCT in 12 months.',
        }
      }

      if (size < 6) {
        return {
          category: 'Lung-RADS 3',
          reason: 'New solid nodule 4 to <6 mm is category 3.',
          management: '6-month LDCT is recommended.',
          impression: 'New solid pulmonary nodule measuring 4 to less than 6 mm. Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.',
        }
      }

      if (size < 8) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'New solid nodule 6 to <8 mm is category 4A.',
          management: '3-month LDCT is recommended; PET/CT may be considered.',
          impression: 'New solid pulmonary nodule measuring 6 to less than 8 mm. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'New solid nodule 8 mm or larger is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `New large solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    if (form.timepoint === 'growing') {
      if (size < 8) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'Growing solid nodule smaller than 8 mm is category 4A.',
          management: '3-month LDCT is recommended.',
          impression: 'Growing solid pulmonary nodule. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'Growing solid nodule 8 mm or larger is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `Growing solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    return {
      category: 'Lung-RADS 2',
      reason: 'Stable or decreased category 3/4A lesions may be stepped down after appropriate follow-up.',
      management: 'Return to annual LDCT screening if stability criteria are met.',
      impression: 'Stable pulmonary nodule with stepped management to annual screening as appropriate.',
    }
  }

  if (form.noduleType === 'partSolid') {
    if (form.timepoint === 'baseline') {
      if (size < 6) {
        return {
          category: 'Lung-RADS 2',
          reason: 'Baseline part-solid nodule smaller than 6 mm is category 2.',
          management: 'Continue annual LDCT screening in 12 months.',
          impression: 'Small part-solid pulmonary nodule. Lung-RADS 2. Continue annual screening LDCT in 12 months.',
        }
      }

      if (solid < 6) {
        return {
          category: 'Lung-RADS 3',
          reason: 'Part-solid nodule with solid component smaller than 6 mm is category 3.',
          management: '6-month LDCT is recommended.',
          impression: 'Part-solid pulmonary nodule with small solid component. Lung-RADS 3. Recommend 6-month low-dose chest CT follow-up.',
        }
      }

      if (solid < 8) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'Part-solid nodule with 6 to <8 mm solid component is category 4A.',
          management: '3-month LDCT is recommended; PET/CT may be considered.',
          impression: 'Part-solid pulmonary nodule with intermediate solid component. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'Part-solid nodule with solid component at least 8 mm is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `Highly suspicious part-solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    if (form.timepoint === 'new') {
      if (size < 6) {
        return {
          category: 'Lung-RADS 2',
          reason: 'New part-solid nodule smaller than 6 mm is category 2.',
          management: 'Continue annual LDCT screening in 12 months.',
          impression: 'New very small part-solid pulmonary nodule. Lung-RADS 2. Continue annual screening LDCT in 12 months.',
        }
      }

      if (solid < 4) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'New part-solid nodule 6 mm or larger with solid component smaller than 4 mm is category 4A.',
          management: '3-month LDCT is recommended.',
          impression: 'New part-solid pulmonary nodule. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'New part-solid nodule with significant solid component is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `New suspicious part-solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    if (form.timepoint === 'growing') {
      if (solid < 8) {
        return {
          category: 'Lung-RADS 4A',
          reason: 'Growing part-solid nodule with solid component smaller than 8 mm is category 4A.',
          management: '3-month LDCT is recommended.',
          impression: 'Growing part-solid pulmonary nodule. Lung-RADS 4A. Recommend 3-month low-dose chest CT follow-up.',
        }
      }

      return {
        category: form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B',
        reason: 'Growing part-solid nodule with solid component at least 8 mm is very suspicious.',
        management: 'Diagnostic chest CT with or without contrast, PET/CT, tissue sampling, and/or specialist referral should be considered.',
        impression: `Growing suspicious part-solid pulmonary nodule. ${form.verySuspicious ? 'Lung-RADS 4X' : 'Lung-RADS 4B'}. Recommend diagnostic evaluation.`,
      }
    }

    return {
      category: 'Lung-RADS 2',
      reason: 'Stable or decreased part-solid lesions may be stepped down after appropriate follow-up.',
      management: 'Return to annual LDCT screening if stability criteria are met.',
      impression: 'Stable part-solid pulmonary nodule with stepped management to annual screening as appropriate.',
    }
  }

  return {
    category: 'Lung-RADS 0',
    reason: 'Incomplete classification.',
    management: 'Review inputs and correlate with the official Lung-RADS table.',
    impression: 'Incomplete Lung-RADS assessment.',
  }
}

export function LungRadsPage() {
  const [form, setForm] = useState<Form>(initialForm)
  const result = useMemo(() => calc(form), [form])
  const showSolid = form.noduleType === 'partSolid'
  const showAirway = form.noduleType === 'airway'

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
          <p className="eyebrow">Lung-RADS v2022</p>
          <h2>Lung-RADS calculator</h2>
          <p>Screening LDCT helper for dominant pulmonary nodules with category assignment, management text, and copyable impression output.</p>
          <p className="source-note">Source: <a href="https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/Lung-RADS" target="_blank" rel="noopener noreferrer">ACR Lung-RADS v2022 update and companion assessment category summaries</a>.</p>
        </div>
        <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
      </section>
      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Dominant finding</h3>
          <div className="form-grid">
            <label>
              <span>Nodule type</span>
              <select value={form.noduleType} onChange={(e) => update('noduleType', e.target.value as NoduleType)}>
                <option value="solid">Solid</option>
                <option value="partSolid">Part-solid</option>
                <option value="groundGlass">Ground-glass / nonsolid</option>
                <option value="airway">Airway nodule</option>
                <option value="infectious">Potentially infectious / inflammatory</option>
              </select>
            </label>

            <label>
              <span>Comparison status</span>
              <select value={form.timepoint} onChange={(e) => update('timepoint', e.target.value as Timepoint)}>
                <option value="baseline">Baseline</option>
                <option value="new">New</option>
                <option value="growing">Growing</option>
                <option value="stable">Stable / decreased</option>
              </select>
            </label>

            <label>
              <span>Mean diameter (mm)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={form.meanDiameterMm}
                onChange={(e) => update('meanDiameterMm', e.target.value)}
                placeholder="e.g. 7.4"
              />
            </label>

            {showSolid && (
              <label>
                <span>Solid component (mm)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  inputMode="decimal"
                  value={form.solidComponentMm}
                  onChange={(e) => update('solidComponentMm', e.target.value)}
                  placeholder="e.g. 3.5"
                />
              </label>
            )}

            {showAirway && (
              <label>
                <span>Airway level</span>
                <select value={form.airwaySegment} onChange={(e) => update('airwaySegment', e.target.value as Form['airwaySegment'])}>
                  <option value="subsegmental">Subsegmental</option>
                  <option value="segmentalOrMoreProximal">Segmental or more proximal</option>
                </select>
              </label>
            )}

            {showAirway && (
              <label className="check-row">
                <input type="checkbox" checked={form.airwayBenignFeatures} onChange={(e) => update('airwayBenignFeatures', e.target.checked)} />
                Benign airway features, such as internal air or dependent secretions
              </label>
            )}

            <label className="check-row">
              <input type="checkbox" checked={form.inflammatoryPattern} onChange={(e) => update('inflammatoryPattern', e.target.checked)} />
              Infectious or inflammatory pattern
            </label>

            <label className="check-row">
              <input type="checkbox" checked={form.verySuspicious} onChange={(e) => update('verySuspicious', e.target.checked)} />
              Additional imaging features increase suspicion (4X)
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <div className="result-head">
            <h3>Result</h3>
            <Badge
              label={result.category}
              tone={result.category.includes('4') ? 'warn' : result.category.includes('2') || result.category.includes('1') ? 'good' : 'accent'}
            />
          </div>
          <p className="result-summary">{result.reason}</p>
          <CopyBlock label="Impression" text={result.impression} />
          <CopyBlock label="Management" text={result.management} />
        </article>
      </section>
    </div>
  )
}
