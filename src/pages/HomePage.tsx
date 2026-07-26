import { Link } from 'react-router-dom'

type CalculatorItem = {
  path: string
  name: string
  description: string
}

export function HomePage({ calculators }: { calculators: CalculatorItem[] }) {
  return (
    <div className="page home-page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Radiology reference workspace</p>
          <h1>Fast, phone-friendly calculator access for daily reads.</h1>
          <p className="hero-copy">
            Open a calculator, enter features, and copy a report-ready impression without digging through PDFs or scattered notes.
          </p>
          <div className="hero-actions">
            <Link to="/tirads" className="primary-button">Open calculators</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <span>{calculators.length}</span>
            <p>Core calculators live</p>
          </div>
          <div className="hero-stat">
            <span>Offline</span>
            <p>Installs to your phone and works with no signal</p>
          </div>
          <div className="hero-stat">
            <span>Mobile</span>
            <p>Optimized for quick use on a phone</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Available tools</p>
            <h2>Calculator library</h2>
          </div>
        </div>
        <div className="card-grid">
          {calculators.map((calculator) => (
            <Link key={calculator.path} to={calculator.path} className="tool-card">
              <div>
                <p className="tool-kicker">Calculator</p>
                <h3>{calculator.name}</h3>
                <p>{calculator.description}</p>
              </div>
              <span className="tool-arrow">Open</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
