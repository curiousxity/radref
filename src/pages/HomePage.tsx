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
            <a className="secondary-button" href="https://pages.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare Pages</a>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <span>{calculators.length}</span>
            <p>Core calculators live</p>
          </div>
          <div className="hero-stat">
            <span>Free</span>
            <p>Static hosting on Cloudflare Pages</p>
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

      <section className="section-block setup-grid">
        <article className="info-card">
          <p className="eyebrow">Deployment</p>
          <h3>Cloudflare Pages settings</h3>
          <ul className="plain-list">
            <li>Production branch: main</li>
            <li>Build command: npm run build</li>
            <li>Build output directory: dist</li>
            <li>SPA rewrite: /* /index.html 200</li>
          </ul>
        </article>
        <article className="info-card">
          <p className="eyebrow">Workflow</p>
          <h3>Best next steps</h3>
          <ul className="plain-list">
            <li>Push this project to GitHub.</li>
            <li>Import the repo into Cloudflare Pages.</li>
            <li>Add your custom domain after the first successful deploy.</li>
            <li>Keep adding calculators into the same shared shell.</li>
            <li>Add incidental findings tools for common body CT references.</li>
            <li>Add Lung-RADS for screening LDCT nodule follow-up.</li>
            <li>Add Bosniak 2019 for cystic renal mass classification.</li>
            <li>Add a dedicated pancreatic cyst surveillance calculator.</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
