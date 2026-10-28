import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { CategoryNav } from './components/CategoryNav'
import { ThemeToggle } from './components/ThemeToggle'
import { RelatedLinks } from './components/RelatedLinks'
import { ScrollToTop } from './components/ScrollToTop'
import { calculators, categories, movedPaths } from './data/calculators'
import { pushRecent, readRecent, writeRecent } from './lib/recent'
import { versionLine } from './lib/version'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

/** The studies were briefly published as lessons under /lessons/; keep those links working. */
function LessonRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/studies/${slug}`} replace />
}

export default function App() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Above phone width the category links wrap onto two or three rows, so the header is taller
  // than the 57px default in styles.css. Sticky panels and tabs sit below it via --header-h.
  useEffect(() => {
    const header = headerRef.current
    if (!header || typeof ResizeObserver === 'undefined') return
    const root = document.documentElement
    const observer = new ResizeObserver(() => {
      root.style.setProperty('--header-h', `${Math.ceil(header.getBoundingClientRect().height)}px`)
    })
    observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-h')
    }
  }, [])

  useEffect(() => {
    const path = location.pathname
    if (calculators.some((item) => item.path === path)) writeRecent(pushRecent(readRecent(), path))
  }, [location.pathname])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <Link to="/" className="brand-mark" aria-label="Rad Ref home">
            <span className="brand-logo" aria-hidden="true">RR</span>
            <span className="brand-title">Rad Ref</span>
          </Link>
          <CategoryNav categories={categories} isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
          <div className="header-actions">
            <ThemeToggle />
            <button
              type="button"
              className="nav-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false">
                {menuOpen ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M3 5h12M3 9h12M3 13h12" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container main-content">
        <Suspense fallback={<p className="route-loading">Loading…</p>}>
          <Routes>
            <Route path="/" element={<HomePage categories={categories} />} />
            {calculators.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <>
                    <item.component />
                    <RelatedLinks path={item.path} />
                  </>
                }
              />
            ))}
            <Route path="/lessons/:slug" element={<LessonRedirect />} />
            {Object.entries(movedPaths).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="site-footer">
        <p className="container site-version">
          {versionLine({ version: __APP_VERSION__, date: __BUILD_DATE__, commit: __BUILD_COMMIT__ })}
        </p>
      </footer>
    </div>
  )
}
