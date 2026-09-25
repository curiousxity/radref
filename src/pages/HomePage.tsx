import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { InstallButton } from '../components/InstallButton'
import { calculators, groupItems, matchesQuery } from '../data/calculators'
import type { CalculatorCategory } from '../data/calculators'

/** "3 calculators", or "2 references" for a category that names its items differently. */
function countLabel(category: CalculatorCategory) {
  const noun = category.itemLabel ?? 'calculator'
  return `${category.items.length} ${noun}${category.items.length === 1 ? '' : 's'}`
}

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
          <h1>Radiology reference, ready at the scanner.</h1>
          <p className="hero-copy">
            Calculators that turn findings into a report-ready impression, step-by-step reading lessons, and 3D anatomy you can turn in the hand. No PDFs, no logins.
          </p>
          <search className="search-panel hero-search">
            <label className="search-field">
              <span className="metric-label">Search</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try thyroid, adrenal, rectal MRI, knee"
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
        </div>
        <div className="hero-panel">
          <InstallButton />
        </div>
      </section>

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
                <p className="eyebrow">{countLabel(category)}</p>
                <h2>{category.name}</h2>
                {category.blurb && <p className="section-blurb">{category.blurb}</p>}
              </div>
            </div>
            {groupItems(category.items).map((group) => (
              <div key={group.name ?? ''} className="item-group">
                {group.name && <h3 className="group-heading">{group.name}</h3>}
                <div className="card-grid">
                  {group.items.map((calculator) => (
                    <Link key={calculator.path} to={calculator.path} className="tool-card">
                      <div>
                        <h3>{calculator.name}</h3>
                        <p>{calculator.description}</p>
                      </div>
                      <span className="tool-arrow">Open</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  )
}
