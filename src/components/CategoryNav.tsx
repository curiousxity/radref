import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { calculators, matchesQuery } from '../data/calculators'
import type { CalculatorCategory } from '../data/calculators'

function closeAllDropdowns() {
  document.querySelectorAll('details.nav-dropdown[open]').forEach((el) => el.removeAttribute('open'))
}

export function CategoryNav({
  categories,
  isOpen,
  onNavigate,
}: {
  categories: CalculatorCategory[]
  isOpen: boolean
  onNavigate: () => void
}) {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()

  const results = useMemo(
    () => (trimmedQuery ? calculators.filter((item) => matchesQuery(item, trimmedQuery)) : []),
    [trimmedQuery],
  )

  useEffect(() => {
    closeAllDropdowns()
    setQuery('')
  }, [location.pathname])

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      document.querySelectorAll('details.nav-dropdown[open]').forEach((el) => {
        if (!el.contains(event.target as Node)) el.removeAttribute('open')
      })
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  return (
    <nav id="primary-nav" className={isOpen ? 'top-nav is-open' : 'top-nav'} aria-label="Primary">
      <div className="nav-search">
        <label className="search-field">
          <span className="metric-label">Find a calculator</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try thyroid, adrenal, MELD"
            autoComplete="off"
          />
        </label>
      </div>

      {trimmedQuery ? (
        <div className="nav-results">
          {results.length > 0 ? (
            results.map((item) => (
              <NavLink key={item.path} to={item.path} className="nav-dropdown-link" onClick={onNavigate}>
                {item.name}
              </NavLink>
            ))
          ) : (
            <p className="nav-empty">Nothing matches that search yet.</p>
          )}
        </div>
      ) : (
        categories.map((category) => {
          const isActiveCategory = category.items.some((item) => item.path === location.pathname)
          return (
            <details key={category.name} className="nav-dropdown" name="primary-nav">
              <summary className={isActiveCategory ? 'nav-link active' : 'nav-link'}>{category.name}</summary>
              <div className="nav-dropdown-menu">
                {category.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'nav-dropdown-link active' : 'nav-dropdown-link')}
                    onClick={onNavigate}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </details>
          )
        })
      )}
    </nav>
  )
}
