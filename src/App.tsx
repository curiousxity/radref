import { Suspense, useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { CategoryNav } from './components/CategoryNav'
import { ScrollToTop } from './components/ScrollToTop'
import { calculators, categories } from './data/calculators'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

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
          <Link to="/" className="brand-mark">
            <img src="/logo-mark-header.png" alt="" className="brand-logo" width="42" height="40" />
            <div>
              <p className="brand-title">Rad Refcalculators</p>
              <p className="brand-subtitle">Mobile-friendly radiology tools</p>
            </div>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <CategoryNav categories={categories} isOpen={menuOpen} onNavigate={() => setMenuOpen(false)} />
        </div>
      </header>

      <main id="main-content" className="container main-content">
        <Suspense fallback={<p className="route-loading">Loading…</p>}>
          <Routes>
            <Route path="/" element={<HomePage categories={categories} />} />
            {calculators.map((item) => (
              <Route key={item.path} path={item.path} element={<item.component />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
