import { CopyBlock } from '../components/CopyBlock'

type CalculatorPageProps = {
  name: string
  description: string
}

export function CalculatorPage({ name, description }: CalculatorPageProps) {
  return (
    <div className="page page-calculator">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Calculator shell</p>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </section>

      <section className="calculator-grid">
        <article className="info-card form-card">
          <h3>Input panel</h3>
          <p>
            This area is ready for structured fields, option groups, measurements, and scoring inputs.
          </p>
          <div className="placeholder-stack" aria-hidden="true">
            <div className="placeholder-line short" />
            <div className="placeholder-line" />
            <div className="placeholder-line" />
            <div className="placeholder-line medium" />
          </div>
        </article>

        <article className="info-card result-card">
          <h3>Result panel</h3>
          <p>
            Use this section for category output, explanation, management guidance, and report-ready text.
          </p>
          <CopyBlock
            label="Sample impression"
            text={`${name} impression output will appear here once the calculator logic is connected.`}
          />
        </article>
      </section>
    </div>
  )
}
