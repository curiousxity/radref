import { Link } from 'react-router-dom'
import { InstallButton } from '../components/InstallButton'
import type { CalculatorCategory } from '../data/calculators'

export function HomePage({ categories }: { categories: CalculatorCategory[] }) {
  const totalCalculators = categories.reduce((count, category) => count + category.items.length, 0)

  return (
    <div className="page home-page">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Radiology reference</p>
          <h1>Radiology calculators, ready at the scanner.</h1>
          <p className="hero-copy">
            Enter the findings, get the category, copy a report-ready impression. No PDFs, no logins.
          </p>
          <div className="hero-actions">
            <Link to="/tirads" className="primary-button">Open calculators</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <span>{totalCalculators}</span>
            <p>Calculators and quick references</p>
          </div>
          <InstallButton />
          <div className="hero-stat">
            <span>Mobile</span>
            <p>Large touch targets, results stay in view</p>
          </div>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category.name} className="section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{category.items.length === 1 ? '1 calculator' : `${category.items.length} calculators`}</p>
              <h2>{category.name}</h2>
            </div>
          </div>
          <div className="card-grid">
            {category.items.map((calculator) => (
              <Link key={calculator.path} to={calculator.path} className="tool-card">
                <div>
                  <h3>{calculator.name}</h3>
                  <p>{calculator.description}</p>
                </div>
                <span className="tool-arrow">Open</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
