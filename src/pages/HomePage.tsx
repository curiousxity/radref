import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InstallButton } from '../components/InstallButton'
import { calculators, matchesQuery } from '../data/calculators'
import type { CalculatorCategory } from '../data/calculators'

export function HomePage({ categories }: { categories: CalculatorCategory[] }) {
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()
  const isSearching = trimmedQuery !== ''

  const results = useMemo(
    () => (isSearching ? calculators.filter((item) => matchesQuery(item, trimmedQuery)) : []),
    [isSearching, trimmedQuery],
  )

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

      <search className="search-panel">
        <label className="search-field">
          <span className="metric-label">Find a calculator</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try thyroid, nodule, adrenal, contrast, MELD"
            autoComplete="off"
            aria-describedby="search-count"
          />
        </label>
        <p className="search-status" id="search-count" aria-live="polite">
          {isSearching
            ? `${results.length} of ${totalCalculators} ${results.length === 1 ? 'match' : 'matches'}`
            : `Search all ${totalCalculators} by name, organ, or criteria`}
        </p>
      </search>

      {isSearching ? (
        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Search</p>
              <h2>Results for "{trimmedQuery}"</h2>
            </div>
          </div>
          {results.length > 0 ? (
            <div className="card-grid">
              {results.map((calculator) => (
                <Link key={calculator.path} to={calculator.path} className="tool-card">
                  <div>
                    <p className="tool-category">{calculator.category}</p>
                    <h3>{calculator.name}</h3>
                    <p>{calculator.description}</p>
                  </div>
                  <span className="tool-arrow">Open</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Nothing matches that search yet.</p>
              <button type="button" className="secondary-button" onClick={() => setQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : (
        categories.map((category) => (
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
        ))
      )}
    </div>
  )
}
