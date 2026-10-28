import { useEffect, useMemo, useRef, useState } from 'react'
import { IndexRows } from '../components/IndexRows'
import { InstallButton } from '../components/InstallButton'
import { calculators, kindLabel, matchesQuery, regionPath, regionSummary, regions } from '../data/calculators'
import { readRecent, recentItems } from '../lib/recent'
import { isSearchShortcut } from './homeSearch'

/** The last few pages this viewer opened, newest first; hidden until there is one. */
function RecentList() {
  const items = recentItems(readRecent())
  if (items.length === 0) return null
  return (
    <section className="index-section" aria-labelledby="home-recent">
      <h2 className="index-label" id="home-recent">Recently opened</h2>
      <IndexRows rows={items.map((item) => ({ path: item.path, name: item.name, tag: kindLabel(item.kind) }))} />
    </section>
  )
}

export function HomePage() {
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const trimmedQuery = query.trim()
  const isSearching = trimmedQuery !== ''

  const results = useMemo(
    () => (isSearching ? calculators.filter((item) => matchesQuery(item, trimmedQuery)) : []),
    [isSearching, trimmedQuery],
  )

  const totalCalculators = calculators.length

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
            : ''}
        </p>
      </search>

      <div className="home-panel">
        {isSearching ? (
          <section className="index-section" aria-labelledby="home-results">
            <h2 className="index-label" id="home-results">Results for "{trimmedQuery}"</h2>
            {results.length > 0 ? (
              <IndexRows rows={results.map((item) => ({ path: item.path, name: item.name, tag: kindLabel(item.kind) }))} />
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
          <>
            <RecentList />
            <section className="index-section" aria-labelledby="home-regions">
              <h2 className="index-label" id="home-regions">By region</h2>
              <IndexRows rows={regions.map((region) => ({ path: regionPath(region), name: region, note: regionSummary(region) }))} />
            </section>
          </>
        )}
      </div>

      <section className="home-install" aria-label="Install">
        <InstallButton />
      </section>
    </div>
  )
}
