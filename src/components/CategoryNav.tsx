import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { calculators, kindLabel, matchesQuery, regionGroups, regionPath, regions } from '../data/calculators'

function closeAllDropdowns() {
  document.querySelectorAll('details.nav-dropdown[open]').forEach((el) => el.removeAttribute('open'))
}

/** The header menu: one dropdown per body region, each opening with a link to the region's page. */
export function CategoryNav({
  isOpen,
  onNavigate,
}: {
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
        regions.map((region) => {
          const groups = regionGroups(region)
          const isActiveRegion =
            location.pathname === regionPath(region) || groups.some((group) => group.items.some((item) => item.path === location.pathname))
          return (
            <details key={region} className="nav-dropdown" name="primary-nav">
              <summary className={isActiveRegion ? 'nav-link active' : 'nav-link'}>{region}</summary>
              <div className="nav-dropdown-menu">
                <NavLink
                  to={regionPath(region)}
                  end
                  className={({ isActive }) => (isActive ? 'nav-dropdown-link nav-region-link active' : 'nav-dropdown-link nav-region-link')}
                  onClick={onNavigate}
                >
                  All of {region.toLowerCase()}
                </NavLink>
                {groups.map((group) => (
                  <Fragment key={group.kind}>
                    <p className="nav-group-label">{kindLabel(group.kind, true)}</p>
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
