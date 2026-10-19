import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { InstallButton } from '../components/InstallButton'
import { calculators, groupItems, matchesQuery } from '../data/calculators'
import type { CalculatorCategory } from '../data/calculators'
import { readRecent, recentItems } from '../lib/recent'
import { HOME_TABS, categoriesForTab, homePanel, isSearchShortcut, parseHomeTab, queryAfterTabSelect, tabIndexForKey } from './homeTabs'
import type { HomeTab } from './homeTabs'

/** "3 calculators", or "2 references" for a category that names its items differently. */
function countLabel(category: CalculatorCategory) {
  const noun = category.itemLabel ?? 'calculator'
  if (category.items.length === 1) return `1 ${noun}`
  return `${category.items.length} ${noun.endsWith('y') ? `${noun.slice(0, -1)}ies` : `${noun}s`}`
}

type Row = { path: string; name: string; tag?: string }

/** Hairline index rows: name on the left, a short mono tag on the right. */
function IndexRows({ rows }: { rows: Row[] }) {
  return (
    <ul className="index-rows">
      {rows.map((row) => (
        <li key={row.path}>
          <Link to={row.path} className="index-row">
            <span className="index-name">{row.name}</span>
            {row.tag && <span className="index-tag">{row.tag}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * Calculators lists each category under its name; Studies and Anatomy are one category
 * each, so their items sit under the category's own `group` subheadings instead.
 */
function CategoryList({ category, byGroup }: { category: CalculatorCategory; byGroup: boolean }) {
  const headingId = `home-${category.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
  return (
    <section className="index-section" aria-labelledby={headingId}>
      <div className="index-label-row">
        <h2 className="index-label" id={headingId}>{category.name}</h2>
        <span className="index-count">{countLabel(category)}</span>
      </div>
      {category.blurb && <p className="section-blurb">{category.blurb}</p>}
      {byGroup ? (
        groupItems(category.items).map((group) => (
          <div key={group.name ?? ''} className="index-group">
            {group.name && <h3 className="index-label">{group.name}</h3>}
            <IndexRows rows={group.items} />
          </div>
        ))
      ) : (
        <IndexRows rows={category.items} />
      )}
    </section>
  )
}

/** The last few pages this viewer opened, newest first; read from storage only while shown. */
function RecentList() {
  const items = recentItems(readRecent())
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>Pages you open appear here.</p>
      </div>
    )
  }
  return (
    <section className="index-section" aria-labelledby="home-recent">
      <h2 className="index-label" id="home-recent">Recently opened</h2>
      <IndexRows rows={items} />
    </section>
  )
}

export function HomePage({ categories }: { categories: CalculatorCategory[] }) {
  const [params, setParams] = useSearchParams()
  const tab = parseHomeTab(params.get('tab'))
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const trimmedQuery = query.trim()
  const panel = homePanel(tab, query)
  const isSearching = panel === 'search'
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const results = useMemo(
    () => (isSearching ? calculators.filter((item) => matchesQuery(item, trimmedQuery)) : []),
    [isSearching, trimmedQuery],
  )

  const totalCalculators = categories.reduce((count, category) => count + category.items.length, 0)

  // `/` jumps to the search field, unless the viewer is already typing somewhere.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!isSearchShortcut(event)) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function selectTab(next: HomeTab) {
    setQuery(queryAfterTabSelect())
    setParams(next === 'calculators' ? {} : { tab: next })
  }

  /** Arrows, Home and End move focus and selection along the tab row. */
  function onTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    const next = tabIndexForKey(event.key, index, HOME_TABS.length)
    if (next === null) return
    event.preventDefault()
    selectTab(HOME_TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="page home-page">
      <h1 className="home-headline">Radiology calculators, studies and 3D anatomy</h1>

      <search className="home-search">
        <label className="search-field">
          <span className="sr-only">Search</span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try thyroid, adrenal, rectal MRI, knee"
            autoComplete="off"
            aria-describedby="search-count"
            aria-keyshortcuts="/"
          />
          <kbd className="search-hint" aria-hidden="true">/</kbd>
        </label>
        <p className="search-status" id="search-count" aria-live="polite">
          {isSearching
            ? `${results.length} of ${totalCalculators} ${results.length === 1 ? 'match' : 'matches'}`
            : `Search all ${totalCalculators} by name, organ, or criteria`}
        </p>
      </search>

      <div className="home-index">
        <div className="home-tabs" role="tablist" aria-label="Home sections">
          {HOME_TABS.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[index] = el }}
              type="button"
              role="tab"
              id={`home-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls="home-panel"
              tabIndex={tab === item.id ? 0 : -1}
              className={tab === item.id ? 'home-tab active' : 'home-tab'}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="home-panel"
          aria-labelledby={isSearching ? 'home-results' : `home-tab-${tab}`}
          className="home-panel"
        >
          {panel === 'search' ? (
            <section className="index-section" aria-labelledby="home-results">
              <h2 className="index-label" id="home-results">Results for "{trimmedQuery}"</h2>
              {results.length > 0 ? (
                <IndexRows rows={results.map((item) => ({ path: item.path, name: item.name, tag: item.category }))} />
              ) : (
                <div className="empty-state">
                  <p>Nothing matches that search yet.</p>
                  <button type="button" className="secondary-button" onClick={() => setQuery('')}>
                    Clear search
                  </button>
                </div>
              )}
            </section>
          ) : panel === 'recent' ? (
            <RecentList />
          ) : (
            categoriesForTab(panel, categories).map((category) => (
              <CategoryList key={category.name} category={category} byGroup={panel !== 'calculators'} />
            ))
          )}
        </div>
      </div>

      <section className="home-install" aria-label="Install">
        <InstallButton />
      </section>
    </div>
  )
}
