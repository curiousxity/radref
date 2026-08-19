import { Link, Route, Routes } from 'react-router-dom'
import { CategoryNav } from './components/CategoryNav'
import { ScrollToTop } from './components/ScrollToTop'
import { categories } from './data/calculators'
import { HomePage } from './pages/HomePage'
import { TiradsPage } from './pages/TiradsPage'
import { LiradsPage } from './pages/LiradsPage'
import { OradsPage } from './pages/OradsPage'
import { IncidentalPage } from './pages/IncidentalPage'
import { LungRadsPage } from './pages/LungRadsPage'
import { BosniakPage } from './pages/BosniakPage'
import { PancreaticCystPage } from './pages/PancreaticCystPage'
import { MeldPage } from './pages/MeldPage'
import { VascularDiameterPage } from './pages/VascularDiameterPage'
import { AdrenalWashoutPage } from './pages/AdrenalWashoutPage'
import { PERadsPage } from './pages/PERadsPage'
import { AastOrganInjuryPage } from './pages/AastOrganInjuryPage'
import { EarlyPregnancyLossPage } from './pages/EarlyPregnancyLossPage'
import { PiRadsPage } from './pages/PiRadsPage'
import { ContrastReactionsPage } from './pages/ContrastReactionsPage'
import { ContrastPremedicationPage } from './pages/ContrastPremedicationPage'
import { ContrastExtravasationPage } from './pages/ContrastExtravasationPage'
import { EllipsoidVolumePage } from './pages/EllipsoidVolumePage'
import { CarotidStenosisPage } from './pages/CarotidStenosisPage'
import { AdrenalChemicalShiftPage } from './pages/AdrenalChemicalShiftPage'
import { DopplerIndicesPage } from './pages/DopplerIndicesPage'
import { IrAnticoagulationPage } from './pages/IrAnticoagulationPage'

export default function App() {
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
          <CategoryNav categories={categories} />
        </div>
      </header>

      <main id="main-content" className="container main-content">
        <Routes>
          <Route path="/" element={<HomePage categories={categories} />} />
          <Route path="/tirads" element={<TiradsPage />} />
          <Route path="/lirads" element={<LiradsPage />} />
          <Route path="/orads" element={<OradsPage />} />
          <Route path="/incidental" element={<IncidentalPage />} />
          <Route path="/lungrads" element={<LungRadsPage />} />
          <Route path="/bosniak" element={<BosniakPage />} />
          <Route path="/pancreatic-cyst" element={<PancreaticCystPage />} />
          <Route path="/meld" element={<MeldPage />} />
          <Route path="/vascular-diameters" element={<VascularDiameterPage />} />
          <Route path="/adrenal-washout" element={<AdrenalWashoutPage />} />
          <Route path="/pe-rads" element={<PERadsPage />} />
          <Route path="/aast-organ-injury" element={<AastOrganInjuryPage />} />
          <Route path="/early-pregnancy-loss" element={<EarlyPregnancyLossPage />} />
          <Route path="/pi-rads" element={<PiRadsPage />} />
          <Route path="/contrast-reactions" element={<ContrastReactionsPage />} />
          <Route path="/contrast-premedication" element={<ContrastPremedicationPage />} />
          <Route path="/contrast-extravasation" element={<ContrastExtravasationPage />} />
          <Route path="/ellipsoid-volume" element={<EllipsoidVolumePage />} />
          <Route path="/carotid-stenosis" element={<CarotidStenosisPage />} />
          <Route path="/adrenal-chemical-shift" element={<AdrenalChemicalShiftPage />} />
          <Route path="/doppler-indices" element={<DopplerIndicesPage />} />
          <Route path="/ir-anticoagulation" element={<IrAnticoagulationPage />} />
        </Routes>
      </main>
    </div>
  )
}
