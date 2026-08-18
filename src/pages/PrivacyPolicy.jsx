import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />

      {/* Simple header */}
      <header className="relative border-b border-divider">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
          <Link to="/" className="font-serif italic text-xl sm:text-2xl tracking-tight text-ink">
            Ground Up Landscaping
          </Link>
          <Link
            to="/"
            className="lift-on-hover inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
          ╱ Legal
        </span>
        <h1 className="font-display font-semibold text-4xl sm:text-5xl text-ink mt-4 leading-[1.05] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted text-sm mt-4 font-mono uppercase tracking-widest">
          Last updated: August 2026
        </p>

        <div className="mt-12 space-y-10 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Overview</h2>
            <p>
              Ground Up Landscaping ("we", "us", "our") respects your privacy and is committed to
              protecting the personal information you share with us. This policy explains what we
              collect, how we use it, and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Information We Collect</h2>
            <p>
              When you contact us through our enquiry form, we may collect your name, email
              address, phone number, suburb or postcode, project details and any photos you choose
              to attach. We do not knowingly collect information from anyone under 16.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">3. How We Use Your Information</h2>
            <p>
              We use the information you provide solely to respond to your enquiry, arrange site
              visits and consultations, and provide quotes for landscape construction and design
              services. We do not sell, rent or share your details with third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Data Security</h2>
            <p>
              We take reasonable technical and organisational measures to keep your information
              secure and protect it against unauthorised access, loss or misuse.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information
              at any time by contacting us at{' '}
              <a href="mailto:hello@groundup-landscaping.com.au" className="text-primary hover:text-primary-dark transition-colors">
                hello@groundup-landscaping.com.au
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">6. Contact</h2>
            <p>
              If you have any questions about this policy, please reach out to us on{' '}
              <a href="tel:+61428978887" className="text-primary hover:text-primary-dark transition-colors">
                +61 428 978 887
              </a>{' '}
              or by email above.
            </p>
          </section>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="relative border-t border-divider">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted font-mono">
          <span>© 2026 Ground Up Landscaping</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
