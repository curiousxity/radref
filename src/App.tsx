import { Suspense, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { CategoryNav } from './components/CategoryNav'
import { ThemeToggle } from './components/ThemeToggle'
import { RelatedLinks } from './components/RelatedLinks'
import { ScrollToTop } from './components/ScrollToTop'
import { calculators, categories } from './data/calculators'
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

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-mark" aria-label="Rad Ref home">
            <span className="brand-logo" aria-hidden="true">RR</span>
            <span className="brand-title">Rad Ref</span>
          </Link>
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
          <CategoryNav categories={categories} isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
