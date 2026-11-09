import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App, { Layout, SERVICES_FULL } from './App.jsx'
import { AboutPage, ServicesPage, ServiceDetailPage, ProjectsPage, SustainabilityPage, ContactPage, NotFoundPage } from './pages/SitePages.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Terms from './pages/Terms.jsx'
import './index.css'

const withLayout = (page) => <Layout>{page}</Layout>

const SITE_URL = 'https://www.ground-up.com.au'
const PAGES = ['/', '/about', '/services', '/projects', '/sustainability', '/contact', '/privacy', '/terms']
  .concat(SERVICES_FULL.map((s) => `/services/${s.slug}`))

function setHeadTag(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

// Tell Google each page's one true address on the real domain, and keep
// unknown addresses (the 404 page) out of search results.
function SeoTags() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
    const known = PAGES.includes(path)
    const canonical = setHeadTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }))
    canonical.href = SITE_URL + path
    const robots = setHeadTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }))
    robots.content = known ? 'index, follow' : 'noindex'
  }, [pathname])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SeoTags />
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
        <Route path="*" element={withLayout(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
