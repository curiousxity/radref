import { useMemo, useState } from 'react'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { CopyBlock } from '../components/CopyBlock'

type MeldMode = 'meld3' | 'meldna'
type Sex = 'male' | 'female'

type Form = {
  mode: MeldMode
  bilirubin: string
  inr: string
  creatinine: string
  sodium: string
  albumin: string
  sex: Sex
  dialysisTwiceInPastWeek: boolean
}

const initialForm: Form = {
  mode: 'meld3',
  bilirubin: '',
  inr: '',
  creatinine: '',
  sodium: '',
  albumin: '',
  sex: 'male',
  dialysisTwiceInPastWeek: false,
}

function toNum(value: string) {
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function rawMeld(bilirubin: number, inr: number, creatinine: number, dialysis: boolean) {
  const bili = Math.max(bilirubin, 1)
  const coag = Math.max(inr, 1)
  const creat = dialysis ? 4 : clamp(Math.max(creatinine, 1), 1, 4)
  return 3.78 * Math.log(bili) + 11.2 * Math.log(coag) + 9.57 * Math.log(creat) + 6.43
}

function calcMeldNa(bilirubin: number, inr: number, creatinine: number, sodium: number, dialysis: boolean) {
  const meld = rawMeld(bilirubin, inr, creatinine, dialysis)
  const na = clamp(sodium, 125, 137)
  const score = meld + 1.32 * (137 - na) - 0.033 * meld * (137 - na)
  return Math.round(score)
}

function calcMeld3(
  bilirubin: number,
  inr: number,
  creatinine: number,
  sodium: number,
  albumin: number,
  sex: Sex,
  dialysis: boolean,
) {
  const bili = Math.max(bilirubin, 1)
  const coag = Math.max(inr, 1)
  const creat = dialysis ? 3 : clamp(Math.max(creatinine, 1), 1, 3)
  const na = clamp(sodium, 125, 137)
  const alb = clamp(albumin, 1.5, 3.5)
  const female = sex === 'female' ? 1 : 0

  const score =
    1.33 * female +
    4.56 * Math.log(bili) +
    0.82 * (137 - na) -
    0.24 * (137 - na) * Math.log(bili) +
    9.09 * Math.log(coag) +
    11.14 * Math.log(creat) +
    1.85 * (3.5 - alb) -
    1.83 * (3.5 - alb) * Math.log(creat) +
    6

  return Math.round(score)
}

function buildSummary(score: number) {
  if (score >= 40) return 'Very high short-term mortality risk.'
  if (score >= 30) return 'High short-term mortality risk.'
  if (score >= 20) return 'Moderate to high short-term mortality risk.'
  if (score >= 10) return 'Moderate short-term mortality risk.'
  return 'Lower short-term mortality risk relative to higher MELD strata.'
}

function toneForScore(score: number): 'good' | 'warn' | 'accent' {
  if (score >= 30) return 'warn'
  if (score < 10) return 'good'
  return 'accent'
}

const sourceLinks: Record<MeldMode, { href: string; label: string }> = {
  meld3: {
    href: 'https://pubmed.ncbi.nlm.nih.gov/34481845/',
    label: 'Kim et al., "MELD 3.0: The Model for End-Stage Liver Disease Updated for the Modern Era," Gastroenterology 2021',
  },
  meldna: {
    href: 'https://hrsa.unos.org/data/allocation-calculators/meld-calculator/',
    label: 'OPTN/HRSA official MELD calculator and liver allocation policy',
  },
}

const modeOptions: { value: MeldMode; label: string }[] = [
  { value: 'meld3', label: 'MELD 3.0 (default)' },
  { value: 'meldna', label: 'MELD-Na' },
]

const sexOptions: { value: Sex; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export function MeldPage() {
  const [form, setForm] = useState<Form>(initialForm)

  function update<K extends keyof Form>(field: K, value: Form[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleReset() {
    setForm(initialForm)
  }

  const result = useMemo(() => {
    const bilirubin = toNum(form.bilirubin)
    const inr = toNum(form.inr)
    const creatinine = toNum(form.creatinine)
    const sodium = toNum(form.sodium)
    const albumin = toNum(form.albumin)

    if (!Number.isFinite(bilirubin) || !Number.isFinite(inr) || !Number.isFinite(creatinine)) {
      return null
    }

    if (form.mode === 'meldna') {
      if (!Number.isFinite(sodium)) return null
      const score = calcMeldNa(bilirubin, inr, creatinine, sodium, form.dialysisTwiceInPastWeek)
      return {
        modeLabel: 'MELD-Na',
        score,
        summary: buildSummary(score),
        impression: `MELD-Na score is ${score}. ${buildSummary(score)} This remains the allocation-oriented comparison score for current U.S. liver allocation workflows.`,
        disclaimer:
          'For current U.S. liver allocation policy: MELD-Na has been the operational allocation score, and OPTN/HRSA still provides the MELD calculator and allocation tooling.',
      }
    }

    if (!Number.isFinite(sodium) || !Number.isFinite(albumin)) return null
    const score = calcMeld3(bilirubin, inr, creatinine, sodium, albumin, form.sex, form.dialysisTwiceInPastWeek)

    return {
      modeLabel: 'MELD 3.0',
      score,
      summary: buildSummary(score),
      impression: `MELD 3.0 score is ${score}. ${buildSummary(score)} This is the most up-to-date MELD model and includes albumin plus a sex adjustment.`,
      disclaimer:
        'For the most up-to-date score: use MELD 3.0. It adds albumin and a sex adjustment to address prior inequities and improves prediction.',
    }
  }, [form])

  return (
    <div className="page page-calculator">
      <section className="section-block calc-title">
        <div className="calc-title-row">
          <h2>MELD calculator</h2>
          <span className="calc-tag">Hepatology</span>
        </div>
        <p>MELD 3.0 is the default, with a built-in MELD-Na option for allocation-oriented comparison.</p>
        <p className="source-note">Source: <a href={sourceLinks[form.mode].href} target="_blank" rel="noopener noreferrer">{sourceLinks[form.mode].label}</a>.</p>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Inputs</h3>
          <div className="form-grid">
            <ChoiceGroup label="Score type" layout="stack" value={form.mode} options={modeOptions} onChange={(value) => update('mode', value)} />

            <label>
              <span>Total bilirubin (mg/dL)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.bilirubin} onChange={(e) => update('bilirubin', e.target.value)} />
            </label>

            <label>
              <span>INR</span>
              <input type="number" step="0.01" min="0" inputMode="decimal" value={form.inr} onChange={(e) => update('inr', e.target.value)} />
            </label>

            <label>
              <span>Creatinine (mg/dL)</span>
              <input type="number" step="0.1" min="0" inputMode="decimal" value={form.creatinine} onChange={(e) => update('creatinine', e.target.value)} />
            </label>

            <label>
              <span>Sodium (mmol/L)</span>
              <input type="number" step="1" min="100" max="180" inputMode="decimal" value={form.sodium} onChange={(e) => update('sodium', e.target.value)} />
            </label>

            {form.mode === 'meld3' && (
              <>
                <label>
                  <span>Albumin (g/dL)</span>
                  <input type="number" step="0.1" min="0" inputMode="decimal" value={form.albumin} onChange={(e) => update('albumin', e.target.value)} />
                </label>

                <ChoiceGroup label="Sex" layout="row" value={form.sex} options={sexOptions} onChange={(value) => update('sex', value)} />
              </>
            )}

            <label className="check-row">
              <input
                type="checkbox"
                checked={form.dialysisTwiceInPastWeek}
                onChange={(e) => update('dialysisTwiceInPastWeek', e.target.checked)}
              />
              Dialysis at least twice in the past week
            </label>
          </div>
        </article>

        <article className="info-card result-card sticky-card">
          <h3 className="sr-only">Result</h3>

          {result ? (
            <>
              <div className="result-strip">
                <div className="result-strip-head">
                  <p className={`result-strip-value tone-${toneForScore(result.score)}`}><span className="sr-only">Score </span>{result.score}</p>
                  <p className="result-strip-meta"><span className="metric-label">Score type</span> <span className="result-strip-points">{result.modeLabel}</span></p>
                </div>
                <p className="result-strip-summary">{result.summary}</p>
              </div>
              <CopyBlock label="Impression" text={result.impression} />
              <p className="copy-status">{result.disclaimer}</p>
            </>
          ) : (
            <p className="result-summary">Enter total bilirubin, INR, creatinine, and sodium (plus albumin and sex for MELD 3.0) to calculate a score.</p>
          )}
          <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
        </article>
      </section>
    </div>
  )
}
