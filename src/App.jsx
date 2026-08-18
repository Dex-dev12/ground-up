import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Shovel,
  PencilRuler,
  Mountain,
  Building2,
  Sprout,
  Droplet,
  Users2,
  Images,
  Menu,
  X,
  Upload,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Constants / Content
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_FULL = [
  {
    icon: Shovel,
    title: 'Full Landscape Construction',
    text: 'End-to-end construction from groundwork to finished garden — earthworks, drainage, paving and planting delivered as one continuous build.',
    image: '/images/rooftop-turf-terrace.jpg',
  },
  {
    icon: PencilRuler,
    title: 'Landscape Design & Full Renovation',
    text: 'Concept through documentation. We refresh established gardens and reimagine tired outdoor spaces into something built for how you actually live.',
    image: '/images/entry-garden-native-grasses.jpg',
  },
  {
    icon: Mountain,
    title: 'Structural Stone Masonry',
    text: 'Retaining walls, steps, cladding and feature stonework — hand-built with locally sourced stone and real craftsmanship.',
    image: '/images/stone-retaining-wall-steps.jpg',
  },
  {
    icon: Building2,
    title: 'Architectural Design',
    text: 'We treat home and garden as a single composition, integrating structure, sightlines and material palette from the outset.',
    image: '/images/pool-glass-fence-paving.jpg',
  },
  {
    icon: Sprout,
    title: 'Horticulture & Planting',
    text: 'Species selection, soil health and seasonal planting plans — gardens chosen to thrive in their exact position, not just at handover.',
    image: '/images/pool-boulder-garden-bed.jpg',
  },
  {
    icon: Droplet,
    title: 'Sustainable Garden Design',
    text: 'Water-wise planting and climate-resilient materials, ethically sourced and built to perform through every Sydney season.',
    image: '/images/hero-pool-retaining-wall.jpg',
  },
]

const HERO_IMAGES = [
  { src: '/images/hero-pool-retaining-wall.jpg', alt: 'Sandstone retaining wall, pergola and pool in a Ground Up project, Sydney North' },
  { src: '/images/entry-garden-native-grasses.jpg', alt: 'Architectural home entry with native grasses and stone edging, a Ground Up design' },
  { src: '/images/stone-retaining-wall-steps.jpg', alt: 'Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build' },
  { src: '/images/pool-boulder-garden-bed.jpg', alt: 'Finished pool and boulder retaining wall garden bed, a completed Ground Up project' },
  { src: '/images/pool-glass-fence-paving.jpg', alt: 'Pool with glass fencing and natural stone paving, a Ground Up build' },
  { src: '/images/rooftop-turf-terrace.jpg', alt: 'Rooftop turf terrace landscaping, a Ground Up project' },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-primary/10'
            : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-primary/25 group-hover:ring-accent/60 transition">
              <img src="/images/groundup-mark.jpg" alt="" className="h-full w-full object-cover" />
            </span>
            <span
              className={`font-serif italic text-xl sm:text-2xl tracking-tight ${
                scrolled ? 'text-ink' : 'text-white'
              } transition-colors`}
            >
              Ground Up
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium tracking-tight pb-1 ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-lg shadow-primary/30 hover:shadow-accent/25 transition-all duration-500"
          >
            Enquire
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-deep/90 backdrop-blur-2xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden ring-2 ring-primary/25">
                <img src="/images/groundup-mark.jpg" alt="" className="h-full w-full object-cover" />
              </span>
              <span className="font-serif italic text-xl text-ink">Ground Up</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full bg-divider/40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full border border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-500"
          >
            Enquire
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImg((i) => (i + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('.hero-line-2', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
    >
      {/* Background image carousel — real Ground Up project photos, slow zoom + crossfade */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="hero-kenburns absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out"
            style={{
              opacity: i === activeImg ? 1 : 0,
              animationDelay: `${i * -3}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/85 via-deep/45 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/30 to-transparent" />
      </div>

      {/* Decorative floating leaf particles (subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-2 w-2 rounded-full bg-accent/60 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1.5 w-1.5 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] right-[26%] h-1 w-1 rounded-full bg-primary-light/70 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-4xl">
          <p className="hero-meta font-mono text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
            Sydney North · Bespoke Landscape Construction &amp; Architectural Design
          </p>
          <h1 className="font-display font-semibold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-4xl sm:text-5xl md:text-6xl">
              We connect home to garden,
            </span>
            <span
              className="hero-line-2 block font-serif italic font-medium text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2"
              style={{ lineHeight: '0.95' }}
            >
              nature to family.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/75 text-base sm:text-lg mt-8 leading-relaxed">
            Ground Up creates sustainable, contemporary gardens and landscapes designed
            for use all year round and unique to our customers.
          </p>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-2xl shadow-primary/40 hover:shadow-accent/25 transition-all duration-500"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="tel:+61428978887"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-accent hover:-translate-y-0.5 font-medium px-7 py-4 rounded-full transition-all duration-500"
            >
              <Phone className="h-4 w-4" />
              +61 428 978 887
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Build Stage Shuffler (Construction)
---------------------------------------------------------------- */
function ConstructionShuffler() {
  const items = [
    { tag: 'Earthworks', label: 'Site prep, drainage & retaining', metric: '240m²' },
    { tag: 'Masonry', label: 'Stone walls, steps & cladding', metric: '85m²' },
    { tag: 'Planting', label: 'Softscape & seasonal planting', metric: '410m²' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-muted">{item.metric}</span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{
                    background: idx < 24 - offset * 6 ? '#2C4A3B' : '#E4E1D8',
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature Animation: Falling Leaves
   (Landscaping re-skin of the water-drop pattern)
---------------------------------------------------------------- */
function LeafFall() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(7)

  const statuses = [
    { text: 'Soil moisture holding steady', label: 'Tending', tone: 'primary' },
    { text: 'Selective pruning in progress', label: 'Pruning', tone: 'accent' },
    { text: 'New garden bed going in · zone 2', label: 'Planting', tone: 'primary' },
    { text: 'Canopy full · garden thriving', label: 'Thriving', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Thriving') {
          setCount((c) => c + 1)
        }
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  // Falling leaves, staggered
  const leaves = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 15, rot: -14 },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 12, rot: 10 },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 17, rot: -8 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 13, rot: 18 },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 16, rot: -18 },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 12, rot: 12 },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 15, rot: -10 },
  ]

  // Soil ripple positions
  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' :
    status.tone === 'accent' ? 'text-accent-dark' :
    'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' :
    status.tone === 'accent' ? 'bg-accent' :
    'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{
        background: 'linear-gradient(180deg, #F7F5F0 0%, #E4E1D8 60%, #C8A96E22 100%)',
      }}
    >
      {/* Soft atmosphere blobs */}
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/40 blur-xl" />

      {/* Header strip */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Leaf className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Seasonal Care
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
            this week
          </span>
        </div>
      </div>

      {/* Branch with leaf clusters at top */}
      <svg
        className="absolute left-3 right-3 top-9 h-5"
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
      >
        {/* Branch body */}
        <rect x="0" y="6" width="400" height="6" rx="3" fill="#2C4A3B" fillOpacity="0.25" />
        <rect x="0" y="7" width="400" height="1.5" fill="#1E332A" fillOpacity="0.4" />
        {/* Branch ends */}
        <rect x="0" y="4" width="6" height="10" rx="1.5" fill="#1E332A" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="10" rx="1.5" fill="#1E332A" fillOpacity="0.5" />
        {/* Leaf clusters at nodes */}
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <ellipse cx={x - 3} cy="4" rx="4" ry="2.5" fill="#4F7161" fillOpacity="0.8" transform={`rotate(-20 ${x - 3} 4)`} />
            <ellipse cx={x + 4} cy="15" rx="4" ry="2.5" fill="#C8A96E" fillOpacity="0.7" transform={`rotate(20 ${x + 4} 15)`} />
          </g>
        ))}
      </svg>

      {/* Falling leaf field */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {leaves.map((d, i) => (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: d.left,
              width: `${d.size}px`,
              height: `${Math.round(d.size * 1.5)}px`,
              animation: `rain-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(30,51,42,0.25))',
              transform: 'translateX(-50%)',
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 36"
              style={{ transform: `rotate(${d.rot}deg)` }}
            >
              <defs>
                <linearGradient id={`leaf-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4F7161" />
                  <stop offset="50%" stopColor="#2C4A3B" />
                  <stop offset="100%" stopColor="#1E332A" />
                </linearGradient>
              </defs>
              {/* Leaf: oval with a point at each end */}
              <path
                d="M12 2 C 19 8, 20 20, 12 34 C 4 20, 5 8, 12 2 Z"
                fill={`url(#leaf-${i})`}
              />
              {/* Central vein */}
              <line x1="12" y1="5" x2="12" y2="30" stroke="#F7F5F0" strokeOpacity="0.4" strokeWidth="0.8" />
              {/* Highlight */}
              <ellipse cx="9.5" cy="14" rx="1.6" ry="3" fill="white" fillOpacity="0.35" />
            </svg>
          </div>
        ))}
      </div>

      {/* Grass line (surface) */}
      <svg
        className="absolute bottom-9 left-3 right-3 h-3"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 26 }).map((_, i) => {
          const x = i * 8
          return (
            <path
              key={i}
              d={`M ${x},12 L ${x + 2.5},4 L ${x + 5},12 Z`}
              fill={i % 2 === 0 ? '#2C4A3B' : '#C8A96E'}
              fillOpacity={i % 2 === 0 ? 0.4 : 0.35}
            />
          )
        })}
      </svg>

      {/* Soil ripples */}
      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-dark/40"
            style={{
              left: r.left,
              width: '4px',
              height: '4px',
              animation: `rain-ripple 2.4s ease-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom status */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && (
              <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />
            )}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${toneText}`}
            style={{ animation: 'rain-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}
        >
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Cursor Scheduler (Site Visit Booking)
---------------------------------------------------------------- */
function SiteVisitScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [step, setStep] = useState(0) // 0..4
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0:
        return { x: 8, y: 110, opacity: 0 }
      case 1:
        return { x: 60, y: 60, opacity: 1 }
      case 2:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4:
        return { x: 130, y: 130, opacity: 1 }
      default:
        return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Week 34 · August
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Booking
        </span>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 17}</span>
          </div>
        ))}
      </div>

      {/* Confirm button */}
      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4
            ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30'
            : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Site visit confirmed' : 'Select a day'}
      </button>

      {/* Animated cursor */}
      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 3L19 12L12 13L9 20L5 3Z"
            fill="#1A1F1C"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: '01 / Construction',
      heading: 'Built From The Ground Up',
      sub: '12+ years of craft',
      text: 'From groundworks to finished garden, we stage every build — earthworks, masonry, hard landscaping and planting — so nothing is rushed and everything is engineered to last.',
      Component: ConstructionShuffler,
    },
    {
      eyebrow: '02 / Living Systems',
      heading: 'Gardens In Motion',
      sub: 'Grown, not just built',
      text: 'Every garden we deliver keeps growing after handover. We track seasonal care, soil health and canopy growth so your landscape only gets better with time.',
      Component: LeafFall,
    },
    {
      eyebrow: '03 / Process',
      heading: 'Site Visits',
      sub: 'Book a walkthrough',
      text: 'We walk every site in person before a single stone moves. Book a consultation and we will meet you on-site to talk through the brief.',
      Component: SiteVisitScheduler,
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Three Disciplines
          </span>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Three crafts.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">
              One garden.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {card.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              {/* Interactive artifact */}
              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">
                  {card.heading}
                </h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">
                  {card.sub}
                </p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp — animated counter (intersection observer)
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
              setCount(Math.floor(target * eased))
              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(target)
              }
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — Three core numbers
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      title: 'Gardens Delivered',
      target: 180,
      suffix: '+',
      label: 'gardens delivered',
      desc: 'Sydney North gardens built from the ground up — each one engineered, planted and finished to last for decades, not seasons.',
    },
    {
      n: '02',
      title: 'Years of Craft',
      target: 12,
      suffix: '+',
      label: 'years of craft',
      desc: 'More than a decade shaping architecture and garden as one composition, with the same hands-on attention to detail on every site.',
    },
    {
      n: '03',
      title: 'Sydney North Focus',
      target: 100,
      suffix: '%',
      label: 'Sydney North focus',
      desc: 'We work exclusively across Sydney North — one region, one crew, so quality never gets diluted by distance.',
    },
  ]

  return (
    <section id="sustainability" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Soft background atmosphere */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Intro */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ Sustainable By Design
            </span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              We prefer
              <span className="block font-serif italic font-medium text-primary-dark">&ldquo;abundance.&rdquo;</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            We are sustainable by design with a focus on creating exceptional, well-designed,
            unique spaces that blur the boundaries of the built and natural environment.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`pillar-card relative bg-surface p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Top meta */}
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              {/* Massive number with counter */}
              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-semibold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">
                {p.label}
              </p>

              {/* Description */}
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">
                {p.desc}
              </p>

              {/* Animated baseline */}
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{
                    animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Real sustainability philosophy, quoted from Ground Up */}
        <div
          className={`mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start transition-all duration-1000 ease-out delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <blockquote className="lg:col-span-3 border-l-2 border-accent pl-6 sm:pl-8">
            <p className="font-serif italic text-primary-dark text-xl sm:text-2xl leading-snug">
              &ldquo;The abundant garden is more about principles for intelligent design — centred on
              recycling and using renewable resources, accommodating biodiversity and conservation,
              and adopting an organic approach to gardening.&rdquo;
            </p>
          </blockquote>
          <div className="lg:col-span-2 space-y-4">
            <p className="text-muted text-[15px] leading-relaxed">
              We use a combination of local and exotic species, chosen to attract beneficial insects
              and wildlife. Timber comes from certified plantations, and local materials are used
              wherever possible to reduce every landscape's footprint.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
              Member — LNA Master Landscapers Association
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards (real Ground Up process)
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Design & Concept',
      tagline: 'We listen first.',
      text: 'We walk the site with you, understand your needs, and share initial solution ideas — no two gardens start from the same brief.',
      image: '/images/entry-garden-native-grasses.jpg',
      alt: 'Architectural home entry with native grasses and stone edging, a Ground Up design',
      meta: 'Step 1 / Consult',
    },
    {
      num: '02',
      title: 'Concept & Documentation',
      tagline: 'We draft the vision.',
      text: 'We draft a concept plan based on the ideas shared in our initial consult — layout, materials and plants, documented in detail before a single stone moves.',
      image: '/images/stone-retaining-wall-steps.jpg',
      alt: 'Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build',
      meta: 'Step 2 / Plan',
    },
    {
      num: '03',
      title: 'Refinement & Approval',
      tagline: 'We build it together.',
      text: 'We revise the draft with you and gather your feedback before progressing onto landscape plan approval and staged construction through to handover.',
      image: '/images/pool-boulder-garden-bed.jpg',
      alt: 'Finished pool and boulder retaining wall garden bed, a completed Ground Up project',
      meta: 'Step 3 / Approve',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
          ╱ How We Work
        </span>
        <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">
            No guesswork.
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              {/* Left content */}
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {step.meta}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Ground Up Protocol
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-semibold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">
                  {step.text}
                </p>
              </div>

              {/* Right visual — real Ground Up project photography */}
              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                    Step {step.num}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Ground Up
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   All Services Grid (6 services)
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-light">╱ Everything We Do</span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              One team,
              <span className="block font-serif italic font-medium text-primary-light">
                every discipline.
              </span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            With special attention to architecture, craftsmanship and detail, we endeavour to use
            local Australian materials that are ethically sourced and produced.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            // Match each corner tile's radius to the grid's own rounded-4xl corner
            // (1 col / 2 col / 3 col responsive layout) so the hover border and the
            // background photo clip cleanly instead of getting cut off mid-curve.
            const cornerRadius = [
              'rounded-t-4xl sm:rounded-tr-none',
              'sm:rounded-tr-4xl lg:rounded-tr-none',
              'lg:rounded-tr-4xl',
              'lg:rounded-bl-4xl',
              'sm:rounded-bl-4xl lg:rounded-bl-none',
              'rounded-b-4xl sm:rounded-bl-none',
            ][i]
            return (
              <div
                key={i}
                className={`svc-tile group bg-deep overflow-hidden border border-transparent hover:border-accent transition-colors duration-500 relative ${cornerRadius}`}
              >
                {/* Background photo, visible through the dark panel */}
                <div className="absolute inset-0">
                  <img
                    src={svc.image}
                    alt=""
                    className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-deep/35 via-deep/55 to-deep/92 group-hover:from-deep/20 group-hover:via-deep/40 group-hover:to-deep/85 transition-colors duration-700" />
                </div>

                <div className="relative p-7 sm:p-9">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                      <Icon className="h-5 w-5 text-primary-light group-hover:text-white" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">{svc.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{svc.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: Users2,
      title: 'One Multidisciplinary Team',
      text: 'Architects, designers, stonemasons and horticulturists working as one crew on every project — not a chain of subcontractors.',
    },
    {
      Icon: Leaf,
      title: 'Sustainability-Led Sourcing',
      text: 'Local, ethically sourced Australian materials and climate-resilient planting, chosen to perform through every Sydney season.',
    },
    {
      Icon: Images,
      title: 'A Portfolio On Request',
      text: 'A full portfolio of completed Sydney North residential projects is available on request — ask us during your consultation.',
    },
  ]

  const testimonials = [
    { quote: 'Angus and his team were wonderful to work with.', name: 'Sophia & Stephen', place: 'Paddington' },
    { quote: 'Ground Up has been servicing me for over 7 years.', name: 'James', place: 'Mosman' },
    { quote: 'Angus is the most courteous, reliable and professional landscaper.', name: 'Jenny', place: 'Neutral Bay' },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Why Ground Up
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            More than a build.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Full-bleed image moment — Ground Up + the 3 essentials */}
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen h-[70vh] min-h-[420px] max-h-[720px] mb-16 sm:mb-24 overflow-hidden">
          <img
            src="/images/pool-glass-fence-paving.jpg"
            alt="Completed pool and garden landscape, a Ground Up project"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/35 to-deep/75" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <span className="font-serif italic text-white text-4xl sm:text-6xl md:text-7xl tracking-tight">
              See The Work We Have Done
            </span>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-2xl shadow-primary/40 hover:shadow-accent/25 transition-all duration-500"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>

        {/* Real client testimonials */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Hear From Our Clients
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Relationships that last.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-background border border-divider rounded-3xl p-6 transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="font-serif italic text-ink text-base leading-snug">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark mt-4">
                {t.name} · {t.place}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-xl shadow-primary/30 hover:shadow-accent/25 transition-all duration-500"
          >
            Book a Consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Contact Form
---------------------------------------------------------------- */
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    projectType: '',
    message: '',
  })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simulated submission
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: heading + info */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              ╱ Contact
            </span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              How can
              <span className="block font-serif italic font-medium text-primary-dark">
                we help?
              </span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Tell us about your site and what you're picturing — we'll come back to you
              to arrange a walkthrough.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+61428978887"
                className="lift-on-hover flex items-center gap-4 group"
              >
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Call direct
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">
                    +61 428 978 887
                  </span>
                </span>
              </a>

              <a
                href="mailto:info@ground-up.com.au"
                className="lift-on-hover flex items-center gap-4 group"
              >
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Email us
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">
                    info@ground-up.com.au
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Home turf
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">
                    Mosman, Sydney
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                    Office hours
                  </span>
                  <span className="font-display font-semibold text-ink text-lg">
                    Mon–Fri, 7am–5pm
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">
                Your Privacy
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Your information is kept secure and used only to respond to your enquiry.
                We do not share your details with third parties for marketing.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5"
            >
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Name"
                      required
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <Field
                      label="Email address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                    <Field
                      label="Phone number"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                    />
                    <Field
                      label="Project location"
                      value={form.suburb}
                      onChange={(v) => setForm({ ...form, suburb: v })}
                    />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Project type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body appearance-none"
                    >
                      <option value="">Select a project type</option>
                      <option value="construction">Full Landscape Construction</option>
                      <option value="design">Landscape Design &amp; Full Renovation</option>
                      <option value="masonry">Structural Stone Masonry</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Your message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Tell us about your site, timeline and vision..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  {/* File upload zone */}
                  <div
                    ref={dropRef}
                    onDragOver={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.add('!border-primary', '!bg-primary/5')
                    }}
                    onDragLeave={() => {
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                      handleFiles(e.dataTransfer.files)
                    }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      id="file-up"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      accept="image/*"
                    />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">
                        Attach photos of your site
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Click or drag files here (max 5 images)
                      </p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                      We'll get back to you shortly. Fields marked * are required.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">
                    Thanks for reaching out
                  </h3>
                  <p className="text-muted max-w-md mx-auto">
                    We'll be in touch shortly to arrange your site visit.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        {/* Top: big tagline */}
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Home to garden.
            <span className="font-serif italic font-medium text-accent block">
              Nature to family.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Ground Up — bespoke landscape construction and architectural
              garden design across Sydney North.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto border border-transparent hover:border-accent hover:-translate-y-0.5 transition-all duration-500"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <span className="font-serif italic text-2xl tracking-tight block mb-4">
              Ground Up
            </span>
            <p className="font-serif italic text-white/70 text-lg max-w-xs">
              We connect home to garden, nature to family.
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mt-4">
              Bespoke landscape construction and architectural garden design for Sydney
              North's finest residential properties.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="text-white/65 hover:text-primary-light transition text-sm"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              <li><a href="#sustainability" className="text-white/65 hover:text-primary-light transition text-sm">Sustainability</a></li>
              <li><a href="#process" className="text-white/65 hover:text-primary-light transition text-sm">Process</a></li>
              <li><a href="#contact" className="text-white/65 hover:text-primary-light transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-light mb-4">
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+61428978887" className="text-white/65 hover:text-primary-light transition text-sm">
                  +61 428 978 887
                </a>
              </li>
              <li>
                <a href="mailto:info@ground-up.com.au" className="text-white/65 hover:text-primary-light transition text-sm">
                  info@ground-up.com.au
                </a>
              </li>
              <li className="text-white/65 text-sm">Mosman, Sydney</li>
              <li>
                <a
                  href="https://www.instagram.com/groundup"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/65 hover:text-primary-light transition text-sm"
                >
                  @GROUNDUP
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              Accepting New Projects · Sydney North
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary-light transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-light transition">
              Terms
            </Link>
            <span>© 2026 Ground Up</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts/images load to recalc positions
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
