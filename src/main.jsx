import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App, { Layout } from './App.jsx'
import { AboutPage, ServicesPage, ServiceDetailPage, ProjectsPage, SustainabilityPage, ContactPage } from './pages/SitePages.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import './index.css'

const withLayout = (page) => <Layout>{page}</Layout>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={withLayout(<App />)} />
        <Route path="/about" element={withLayout(<AboutPage />)} />
        <Route path="/services" element={withLayout(<ServicesPage />)} />
        <Route path="/services/:slug" element={withLayout(<ServiceDetailPage />)} />
        <Route path="/projects" element={withLayout(<ProjectsPage />)} />
        <Route path="/sustainability" element={withLayout(<SustainabilityPage />)} />
        <Route path="/contact" element={withLayout(<ContactPage />)} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
