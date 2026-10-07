import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="noise-overlay" />

      {/* Simple header */}
      <header className="relative border-b border-divider">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-8 flex items-center justify-between">
          <Link to="/" aria-label="Ground Up home">
            <img src="/brand/GroundUp_Logo_Spaced.png" alt="Ground Up" className="h-5 w-auto" />
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
          Terms &amp; Conditions
        </h1>
        <p className="text-muted text-sm mt-4 font-mono uppercase tracking-widest">
          Last updated: August 2026
        </p>

        <div className="mt-12 space-y-10 text-ink/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">1. Agreement</h2>
            <p>
              By engaging Ground Up Landscaping for any landscape construction, design or
              renovation services, you agree to the terms outlined below. Specific project terms,
              scope, pricing and timelines will be set out in a separate written quote or
              contract for each engagement.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">2. Quotes &amp; Consultations</h2>
            <p>
              Initial site consultations and concept discussions are provided free of charge.
              Formal quotes are prepared following a site walk and are valid for 30 days unless
              otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">3. Project Scope &amp; Changes</h2>
            <p>
              Any changes to an agreed scope of works, materials or plans requested after
              approval may affect the project timeline and cost. We will always confirm any
              variation with you in writing before proceeding.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">4. Materials &amp; Warranty</h2>
            <p>
              We use ethically sourced, locally supplied materials wherever possible. Workmanship
              and materials are covered under standard statutory warranty periods applicable in
              New South Wales, in addition to any manufacturer warranties on supplied products.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">5. Cancellations</h2>
            <p>
              Site visits and consultations may be rescheduled or cancelled with reasonable
              notice. Cancellation terms for confirmed construction projects will be detailed in
              your individual contract.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">6. Contact</h2>
            <p>
              Questions about these terms can be directed to{' '}
              <a href="mailto:hello@groundup-landscaping.com.au" className="text-primary hover:text-primary-dark transition-colors">
                hello@groundup-landscaping.com.au
              </a>{' '}
              or{' '}
              <a href="tel:+61428978887" className="text-primary hover:text-primary-dark transition-colors">
                +61 428 978 887
              </a>.
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
