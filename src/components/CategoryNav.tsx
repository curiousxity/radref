import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { calculators, groupItems, matchesQuery } from '../data/calculators'
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
  const navRef = useRef<HTMLElement>(null)
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

  // The nav sits before the menu button in the DOM (desktop order), so on phones the opened
  // drawer would come before the button in tab order. Move focus into it instead (WCAG 2.4.3).
  // The nav itself takes focus, not the search box, so the phone keyboard stays closed.
  useEffect(() => {
    if (isOpen) navRef.current?.focus()
  }, [isOpen])

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
    <nav
      id="primary-nav"
      ref={navRef}
      tabIndex={-1}
      className={isOpen ? 'top-nav is-open' : 'top-nav'}
      aria-label="Primary"
    >
      <div className="nav-search">
        <label className="search-field">
          <span className="metric-label">Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try thyroid, rectal MRI, knee"
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
                {groupItems(category.items).map((group) => (
                  <Fragment key={group.name ?? ''}>
                    {group.name && <p className="nav-group-label">{group.name}</p>}
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => (isActive ? 'nav-dropdown-link active' : 'nav-dropdown-link')}
                        onClick={onNavigate}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </Fragment>
                ))}
              </div>
            </details>
          )
        })
      )}
    </nav>
  )
}
