import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { TiradsPage } from './pages/TiradsPage'
import { LiradsPage } from './pages/LiradsPage'
import { OradsPage } from './pages/OradsPage'
import { IncidentalPage } from './pages/IncidentalPage'
import { LungRadsPage } from './pages/LungRadsPage'
import { BosniakPage } from './pages/BosniakPage'
import { PancreaticCystPage } from './pages/PancreaticCystPage'

const calculators = [
  { path: '/tirads', name: 'TI-RADS', description: 'Thyroid nodule scoring, description, and report-ready impression.' },
  { path: '/lirads', name: 'LI-RADS', description: 'CT/MRI liver lesion categorization with copyable impression text.' },
  { path: '/orads', name: 'O-RADS', description: 'US and MRI adnexal lesion stratification with modality-aware inputs.' },
  { path: '/incidental', name: 'Incidental', description: 'ACR-style helpers for adrenal incidentalomas, pancreatic cysts, and renal masses.' },
  { path: '/lungrads', name: 'Lung-RADS', description: 'Screening LDCT nodule categorization with management and impression text.' },
  { path: '/bosniak', name: 'Bosniak 2019', description: 'Cystic renal mass classification with management and impression text.' },
  { path: '/pancreatic-cyst', name: 'Pancreatic cyst', description: 'Dedicated incidental pancreatic cyst surveillance and escalation logic.' },
]

export default function App() {
  return (
    <div className="app-shell">
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
          <nav className="top-nav" aria-label="Primary">
            {calculators.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="container main-content">
        <Routes>
          <Route path="/" element={<HomePage calculators={calculators} />} />
          <Route path="/tirads" element={<TiradsPage />} />
          <Route path="/lirads" element={<LiradsPage />} />
          <Route path="/orads" element={<OradsPage />} />
          <Route path="/incidental" element={<IncidentalPage />} />
          <Route path="/lungrads" element={<LungRadsPage />} />
          <Route path="/bosniak" element={<BosniakPage />} />
          <Route path="/pancreatic-cyst" element={<PancreaticCystPage />} />
        </Routes>
      </main>
    </div>
  )
}
