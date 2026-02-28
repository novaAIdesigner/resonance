import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import BenchmarkPage from './pages/BenchmarkPage'
import ConsumerAuthPage from './pages/ConsumerAuthPage'
import CreatorPartnershipPage from './pages/CreatorPartnershipPage'
import DeveloperPage from './pages/DeveloperPage'
import EnterprisePage from './pages/EnterprisePage'
import HomePage from './pages/HomePage'
import LanguagesPage from './pages/LanguagesPage'
import PricingPage from './pages/PricingPage'
import ProductPage from './pages/ProductPage'
import SecurityPage from './pages/SecurityPage'

export default function App() {
  return (
    <div className="app-shell relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-44 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      <Header />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/benchmark" element={<BenchmarkPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/developer" element={<DeveloperPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/consumer-auth" element={<ConsumerAuthPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/creator-partnership" element={<CreatorPartnershipPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}