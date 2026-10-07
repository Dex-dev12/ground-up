import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { EnquiryForm, Protocol, ScrollCue, ServicesGrid, SERVICES_FULL } from '../App.jsx'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Page building blocks
   Layout follows the 2018 Ground Up website mockups: alternating
   Earth Green and light bands, image beside text, underlined labels.
   Copy is taken from ground-up.com.au unless marked as a placeholder.
---------------------------------------------------------------- */

function Page({ title, children }) {
  const ref = useRef(null)

  useEffect(() => {
    document.title = `${title} | Ground Up`
  }, [title])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}

function Label({ children, light }) {
  return (
    <span
      className={`inline-block font-mono text-xs uppercase tracking-[0.25em] underline underline-offset-[6px] decoration-1 ${
        light ? 'text-white/85 decoration-white/50' : 'text-primary-dark decoration-primary-dark/40'
      }`}
    >
      {children}
    </span>
  )
}

function Photo({ src, alt, className = 'aspect-[4/5]' }) {
  return (
    <div className={`reveal relative overflow-hidden rounded-5xl shadow-xl shadow-black/10 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

/** Full-width band. tone: 'earth' (brand green) | 'light' (page grey) | 'white' */
function Band({ tone = 'light', className = '', pad = 'py-24 sm:py-32', children }) {
  const bg = { earth: 'bg-earth text-white', light: 'bg-background', white: 'bg-surface' }[tone]
  return (
    <section className={`relative px-6 sm:px-10 lg:px-16 ${pad} ${bg} ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}

/** Image on one side, content on the other. */
function Split({ image, alt, reverse, compact, children }) {
  return (
    <div
      className={`grid grid-cols-1 items-center ${
        !compact
          ? 'lg:grid-cols-2 gap-12 lg:gap-20'
          : `gap-8 lg:gap-16 ${reverse ? 'lg:grid-cols-[7fr_5fr]' : 'lg:grid-cols-[5fr_7fr]'}`
      }`}
    >
      <div className={reverse ? 'lg:order-2' : ''}>
        <Photo src={image} alt={alt} className={compact ? 'aspect-[4/3]' : 'aspect-[4/5]'} />
      </div>
      <div className={`reveal ${reverse ? 'lg:order-1' : ''}`}>{children}</div>
    </div>
  )
}

/** Top of every inner page: tells visitors which section they are in. */
function PageHeader({ eyebrow, title, image, alt, children }) {
  return (
    <section className="relative overflow-hidden bg-deep text-white px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-10 sm:pb-12 min-h-[300px] sm:min-h-[330px] flex items-end">
      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-tr from-deep/90 via-deep/70 to-deep/40" />
      <div className="reveal relative w-full max-w-7xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
        <h1 className="mt-3 font-display font-semibold text-3xl sm:text-4xl leading-[1.1] tracking-[0.2em]">
          {title}
        </h1>
        <div className="mt-4 max-w-3xl space-y-3 text-white/80 text-[15px] sm:text-base leading-relaxed">{children}</div>
      </div>
      <ScrollCue className="absolute bottom-6 right-6 sm:right-10 lg:right-16 hidden sm:flex" />
    </section>
  )
}

/** Earth Green band: photo beside a feature statement. */
function PageHero({ label, image, alt, children }) {
  return (
    <section className="relative bg-earth text-white px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Photo src={image} alt={alt} className="aspect-square" />
        <div className="reveal">
          <Label light>{label}</Label>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  )
}

function ServiceList({ items, light }) {
  return (
    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      {items.map((item) => (
        <li
          key={item}
          className={`py-3 border-b text-[15px] ${light ? 'border-white/25 text-white/90' : 'border-divider text-ink/80'}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function CTABand() {
  return (
    <Band tone="light" className="text-center">
      <div className="reveal max-w-2xl mx-auto">
        <h2 className="font-body font-semibold text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight">
          Let&rsquo;s talk about
          <span className="block font-light italic text-primary-dark">your outdoor space.</span>
        </h2>
        <p className="mt-6 text-muted text-lg leading-relaxed">
          Don&rsquo;t hesitate to reach out to our lovely team.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-xl shadow-primary/30 transition-all duration-500"
        >
          Book Your Consultation
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Band>
  )
}

const bodyText = 'space-y-5 text-base sm:text-lg leading-relaxed'

/* ----------------------------------------------------------------
   About
---------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    headline: '“Angus and his team were wonderful to work with.”',
    body: 'Their advice, commitment to their work, and attention to detail was impressive. We love the simple but stylish garden they helped us to create!',
    name: 'Sophia and Stephen',
    place: 'Paddington',
    image: '/images/pool-boulder-garden-bed.jpg',
    alt: 'Finished pool and boulder retaining wall garden bed, a completed Ground Up project',
  },
  {
    headline:
      '“Angus and the Ground Up team delivered beautifully on a complex landscaping and garden restoration project for our property in Neutral Bay.”',
    body: 'The project involved material construction, structural demolition and garden restoration components with all challenges expertly overcome.',
    name: 'Ray',
    place: 'Neutral Bay',
    image: '/images/pool-glass-fence-paving.jpg',
    alt: 'Pool with glass fencing and natural stone paving, a Ground Up build',
  },
]

const SHORT_TESTIMONIALS = [
  {
    quote:
      'Ground Up has been servicing me for over 7 years, has included landscaping the property and sandstone block work, paving and designing our living courtyard, problem-solving, troubleshooting, and always reliable, well and top-notch service.',
    name: 'James',
    place: 'Mosman',
  },
  {
    quote:
      'Angus is the most courteous, reliable and professional landscaper I have ever dealt with. Angus’s extensive horticultural knowledge has been invaluable.',
    name: 'Jenny',
    place: 'Neutral Bay',
  },
]

export function AboutPage() {
  return (
    <Page title="About">
      <PageHeader eyebrow="Who we are" title="About" image="/images/texture-sage.jpg" alt="Silvery sage leaves">
        <p>Contemporary landscaping and garden design, Sydney North.</p>
      </PageHeader>

      <PageHero label="From the Owner" image="/images/texture-wall-planter.jpg" alt="Plants growing from a recessed planter in a white rendered wall">
        <h2 className="font-body font-light text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug">
          &lsquo;Gardens and landscapes are no longer adjuncts to homes. These outdoor living spaces are
          priorities finding roots in workplaces, train stations, rooftops, restaurants, hotels, hospitals,
          bars, shopping centres, airports and homes &ndash; giving us living green spaces to connect and
          relax&rsquo;
        </h2>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-white/75">
          Angus Drover &middot; Owner, Ground Up
        </p>
      </PageHero>

      <Band tone="white">
        <Split reverse image="/images/stone-retaining-wall-steps.jpg" alt="Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build">
          <Label>The Story</Label>
          <p className="mt-8 font-body text-2xl sm:text-3xl text-ink leading-snug">
            Ground Up is a sustainable landscape design business that specialises in contemporary
            landscaping architecture, construction, project management, bespoke gardens, horticultural
            services, and indoor/ outdoors spaces.
          </p>
          <div className={`mt-8 text-muted ${bodyText}`}>
            <p>
              We are sustainable by design with a focus on creating exceptional well-designed, unique spaces
              that blur the boundaries of the built and natural environment. We create places for people to
              connect and commune. With the shifting nature of our climate it is important to use plants that
              are resilient to change.
            </p>
            <p>We encourage our clients to work with their architectural form and use it as a basis for design.</p>
            <p>
              Ground Up cultivates a biodiverse team of horticultural designers, landscape architects,
              builders, stone masons, garden designers and artisans.
            </p>
            <p className="text-ink font-medium">Ground Up is a member of the LNA Master Landscapers association.</p>
          </div>
        </Split>
      </Band>

      {TESTIMONIALS.map((t, i) => (
        <Band key={t.name} tone={i % 2 === 0 ? 'earth' : 'white'}>
          <Split reverse={i % 2 === 1} image={t.image} alt={t.alt}>
            <Label light={i % 2 === 0}>Hear From Our Clients</Label>
            <h2
              className={`mt-8 font-body text-2xl sm:text-3xl lg:text-4xl leading-snug ${
                i % 2 === 0 ? 'text-white' : 'text-ink'
              }`}
            >
              {t.headline}
            </h2>
            <p className={`mt-6 ${bodyText} ${i % 2 === 0 ? 'text-white/85' : 'text-muted'}`}>{t.body}</p>
            <p
              className={`mt-8 font-mono text-xs uppercase tracking-[0.25em] ${
                i % 2 === 0 ? 'text-white/75' : 'text-primary-dark'
              }`}
            >
              {t.name} &middot; {t.place}
            </p>
          </Split>
        </Band>
      ))}

      <Band tone="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SHORT_TESTIMONIALS.map((t) => (
            <figure key={t.name} className="reveal bg-surface border border-divider rounded-5xl p-8 sm:p-10">
              <blockquote className="font-body text-lg sm:text-xl text-ink leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
                {t.name} &middot; {t.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </Band>

      <Protocol />
    </Page>
  )
}

/* ----------------------------------------------------------------
   Services
---------------------------------------------------------------- */
const GARDEN_SERVICES = [
  'Plant design and horticultural services',
  'Irrigation and water features',
  'Outdoor design includes BBQs and furnishings',
  'Carpentry',
  'Gates and fencing',
  'Concrete services',
  'Landscape and garden design commercial and residential',
  'Retaining walls, and outdoor construction and design',
  'Paving',
  'Pool and water features',
  'Outdoor living, seating, and customized construction',
  'Stonemasonry',
  'Garden lighting space',
  'Events and outdoor landscape installations',
  'Vegetable Gardens',
  'Green Walls',
  'Sensory Gardens',
  'Corporate workplace gardens and green spaces',
  'Tree and arborist services',
  'Pools',
]

const PM_SERVICES = ['Site evaluation', 'Project management', 'Residential and Commercial project scoping', 'Council liaison']

const MAINTENANCE_SERVICES = [
  'High end Commercial and Residential management and consultation',
  'Irrigation systems',
  'Solar lighting',
  'Planting',
  'Maintenance',
]

export function ServicesPage() {
  return (
    <Page title="Services">
      <PageHeader eyebrow="What we do" title="Services" image="/images/texture-wet-leaves.jpg" alt="Green leaves covered in raindrops">
        <p>
          Ground Up is a fully integrated business providing end-to-end project management and landscaping
          design, construction and maintenance. We also provide project management consultancy services to
          landscape designers and architects and commercial developers.
        </p>
      </PageHeader>

      {SERVICES_FULL.map((svc, i) => (
        <Band key={svc.slug} tone={i % 2 === 0 ? 'white' : 'light'} pad="py-14 sm:py-20">
          <Split compact reverse={i % 2 === 1} image={svc.image} alt={`${svc.title}, a Ground Up project`}>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="mt-4 font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-ink leading-[1.1] tracking-[0.2em]">
              {svc.title}
            </h2>
            <p className="mt-6 text-ink/80 text-lg leading-relaxed">{svc.text}</p>
            <p className="mt-4 text-muted leading-relaxed">{svc.includes.join(' \u00b7 ')}</p>
            <a
              href={`/services/${svc.slug}`}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary"
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Split>
        </Band>
      ))}

      <Band tone="white">
        <Split image="/images/rooftop-turf-terrace.jpg" alt="Rooftop turf terrace landscaping, a Ground Up project">
          <Label>Gardens + Landscaping</Label>
          <ServiceList items={GARDEN_SERVICES} />
        </Split>
      </Band>

      <Band tone="earth">
        <Split reverse image="/images/stone-retaining-wall-steps.jpg" alt="Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build">
          <Label light>Project Management + Site Consultation</Label>
          <ServiceList items={PM_SERVICES} light />
        </Split>
      </Band>

      <Band tone="white">
        <Split image="/images/entry-garden-native-grasses.jpg" alt="Architectural home entry with native grasses and stone edging, a Ground Up design">
          <Label>Maintenance Management</Label>
          {/* Wording copied as-is from the old site; it reads awkwardly and should be reviewed with Angus */}
          <p className="mt-8 font-body text-xl sm:text-2xl text-ink leading-snug">
            Ground Up&rsquo;s projects are renowned for being low maintenance and energy efficient as possible.
            Whist not a priority for all of our clients this will inevitably both residential and commercial
            landscaping design in light of more dynamic climatic influences.
          </p>
          <ServiceList items={MAINTENANCE_SERVICES} />
        </Split>
      </Band>

      <CTABand />
    </Page>
  )
}

/* ----------------------------------------------------------------
   Individual service page
   SKELETON: description is the homepage tile text; "What's included"
   items are drawn from the old site's services list. Swap in full
   copy and dedicated photos per service when available.
---------------------------------------------------------------- */
const DETAIL_IMAGES = [
  '/images/texture-concrete-plant.jpg',
  '/images/texture-wall-planter.jpg',
  '/images/texture-dark-leaves.jpg',
  '/images/texture-succulents.jpg',
  '/images/texture-bamboo-leaves.jpg',
  '/images/texture-ferns.jpg',
]

export function ServiceDetailPage() {
  const { slug } = useParams()
  const index = SERVICES_FULL.findIndex((svc) => svc.slug === slug)
  if (index === -1) return <Navigate to="/services" replace />
  const svc = SERVICES_FULL[index]

  return (
    <Page key={slug} title={svc.title}>
      <PageHeader eyebrow="Services" title={svc.title} image={DETAIL_IMAGES[index]} alt="Plant texture">
        <p>{svc.text}</p>
        <a
          href="/contact"
          className="!mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-full border border-transparent hover:border-accent hover:-translate-y-0.5 shadow-xl shadow-black/20 transition-all duration-500"
        >
          Book Your Consultation
          <ArrowRight className="h-4 w-4" />
        </a>
      </PageHeader>

      <Band tone="white">
        <Split reverse image={svc.image} alt={`${svc.title}, a Ground Up project`}>
          <Label>What&rsquo;s Included</Label>
          <ServiceList items={svc.includes} />
          <p className={`mt-8 text-muted ${bodyText}`}>
            Ground Up is a fully integrated business providing end-to-end project management and landscaping
            design, construction and maintenance.
          </p>
        </Split>
      </Band>

      <ServicesGrid
        exclude={svc.slug}
        eyebrow="Other Services"
        title="Explore our"
        accentTitle="other services."
        intro="Ground Up is a fully integrated business providing end-to-end project management and landscaping design, construction and maintenance."
      />
    </Page>
  )
}

/* ----------------------------------------------------------------
   Projects
   PLACEHOLDER: project names and descriptions are skeleton content
   until Angus supplies real project details and photos.
---------------------------------------------------------------- */
const INSTAGRAM_URL = 'https://www.instagram.com/groundup.com.co/'

// Titles describe what is in each photo and locations are EXAMPLES only;
// swap both for the real project names and suburbs when Angus supplies them
const PROJECTS = [
  { image: '/images/hero-pool-retaining-wall.jpg', title: 'Sandstone Walls & Pool', location: 'Mosman', alt: 'Sandstone retaining wall, pergola and pool in a Ground Up project, Sydney North', span: 'lg:col-span-2 lg:row-span-2' },
  { image: '/images/entry-garden-native-grasses.jpg', title: 'Native Grass Entry', location: 'Cremorne', alt: 'Architectural home entry with native grasses and stone edging, a Ground Up design' },
  { image: '/images/stone-retaining-wall-steps.jpg', title: 'Stone Steps & Bench Seat', location: 'Neutral Bay', alt: 'Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build' },
  { image: '/images/pool-boulder-garden-bed.jpg', title: 'Boulder Garden Bed', location: 'Lane Cove', alt: 'Finished pool and boulder retaining wall garden bed, a completed Ground Up project' },
  { image: '/images/rooftop-turf-terrace.jpg', title: 'Rooftop Terrace', location: 'Kirribilli', alt: 'Rooftop turf terrace landscaping, a Ground Up project' },
  { image: '/images/pool-glass-fence-paving.jpg', title: 'Pool & Stone Paving', location: 'Northbridge', alt: 'Pool with glass fencing and natural stone paving, a Ground Up build' },
]

export function ProjectsPage() {
  return (
    <Page title="Projects">
      <PageHeader eyebrow="Our work" title="Projects" image="/images/texture-palms.jpg" alt="Palm fronds">
        <p>
          We specialise in creating quality landscape design that maximises your outdoor space. Our goal is to
          connect your internal world with the surrounding nature of your home or office. Browse our portfolio to
          see some of our recent projects in Sydney&rsquo;s lower North Shore.
        </p>
      </PageHeader>

      <Band tone="earth">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[320px] sm:auto-rows-[360px] gap-4 sm:gap-5">
          {PROJECTS.map((proj) => (
            <a
              key={proj.image}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className={`reveal group relative overflow-hidden rounded-4xl bg-deep ${proj.span || ''}`}
            >
              <img
                src={proj.image}
                alt={proj.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-1.5 text-white/75 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {proj.location}
                  </p>
                  <h2 className="mt-2 font-display font-semibold text-white text-lg sm:text-xl leading-snug tracking-[0.12em]">
                    {proj.title}
                  </h2>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 px-4 py-2 text-white text-sm font-semibold transition-colors group-hover:bg-white group-hover:text-ink">
                  View project
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Band>

      <Band tone="light">
        <Split image="/images/stone-retaining-wall-steps.jpg" alt="Sandstone retaining wall with built-in bench seat and stone steps, a Ground Up build">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink leading-[1.1] tracking-[0.2em]">
            Landscape gardens in Sydney
          </h2>
          <div className={`mt-8 text-muted ${bodyText}`}>
            <p>
              Creating your vision is no easy feat and we offer inspiration and expertise to our clients, whilst
              also comfortably taking a backseat in the design process if you have it under control. We select
              our plants and materials from both local and international sources, intentionally curating the best
              combination for your needs. We consider fragrances, textures and your aesthetic preferences in our
              specialist horticulture landscapes. Sources of shelter, sunlight and shade are also crucial to our
              process as we want to ensure you can enjoy your revitalised space at all times of day.
            </p>
            <p>
              Our work includes residential, commercial and corporate workplace green spaces. We collaborate
              closely with our clients to understand their needs and create a design exclusive to their personal
              style. Our team of designers and horticulturists manage every aspect of the project, from design, to
              construction, to maintenance, ensuring a seamless and easy experience. Trust Ground Up to create
              another beautiful outdoor space tailored to you.
            </p>
            <p>
              We pride ourselves on our craftsmanship and attention to detail. Ground Up has been successfully
              operating in Sydney and the Lower North Shore for 14 years. You can trust us to bring serenity to
              your home.
            </p>
          </div>
        </Split>
      </Band>

      <CTABand />
    </Page>
  )
}

/* ----------------------------------------------------------------
   Sustainability
---------------------------------------------------------------- */
export function SustainabilityPage() {
  return (
    <Page title="Sustainability">
      <PageHeader eyebrow="Sustainable design" title="Sustainability" image="/images/texture-ferns.jpg" alt="Dense green fern fronds">
        <p>
          We ensure that our gardens belong in a larger ecosystem, they are kind to existing flora and fauna.
        </p>
      </PageHeader>

      <PageHero label="From the Owner" image="/images/rooftop-turf-terrace.jpg" alt="Rooftop turf terrace landscaping, a Ground Up project">
        <h2 className="font-body font-light text-2xl sm:text-3xl lg:text-[2.1rem] leading-snug">
          &lsquo;Sustainability is a fundamental of intelligent design and provides wellbeing for people and
          planet. Our clients are demanding we go to find this balance whilst meeting their brief&rsquo;
        </h2>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-white/75">
          Angus Drover &middot; Owner, Director of Ground Up
        </p>
      </PageHero>

      <Band tone="white">
        <Split reverse image="/images/pool-boulder-garden-bed.jpg" alt="Finished pool and boulder retaining wall garden bed, a completed Ground Up project">
          <h2 className="font-body font-semibold text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight">
            We prefer
            <span className="block font-light italic text-primary-dark">&lsquo;abundance&rsquo;.</span>
          </h2>
          <div className={`mt-8 text-muted ${bodyText}`}>
            <p>
              At Ground Up we prefer to use &lsquo;abundance&rsquo; over sustainability. Our landscapes design is to
              increase the vitality of environments and contribute to creating more &ldquo;green&rdquo; spaces and
              species habitats in city areas.
            </p>
            <p>
              The &lsquo;abundant&rsquo; garden is more about principles for intelligent design &ndash; centred on
              recycling and using renewable resources, accommodating biodiversity and conservation, and adopting
              an organic approach to gardening. This does not translate to rustic or compromised landscape design.
              Sharp and elegant designs translate into renewable material such as timber from certified plantation
              and sophisticated planting schemes. Ground Up provides clients with the option of using local
              materials are used wherever possible reducing the landscapes footprint and giving a local identity.
            </p>
            <p>
              Our clients&rsquo; are offered alternatives for pest management and fertilisers to support local
              species increase biodiversity and provide safe living spaces for people and pets. Ground Up uses a
              combination of local and exotic species as these help to attract beneficial insects and wildlife as
              long as they are not invasive.
            </p>
            <p>
              With the shifting nature of our climate, it is important to use plants that are resilient to change.
              Luxury landscapes are being redefined. Swimming pools are being made low chemical and the latest in
              luxe living is your very own frog habitat or your vertical organic garden.
            </p>
          </div>
        </Split>
      </Band>

      <Band tone="earth">
        <Split image="/images/texture-bamboo-leaves.jpg" alt="Sunlit bamboo leaves">
          <Label light>Inspiration</Label>
          <h2 className="mt-8 font-body text-2xl sm:text-3xl lg:text-4xl leading-snug text-white">
            Whether at work or play, humans experience a profound shift in wellbeing simply from the presence of
            plants.
          </h2>
          <p className={`mt-8 text-white/85 ${bodyText}`}>
            Biophilic design responds to this innate need to connect with nature by integrating greenery into
            built environments. Medibank Place, a corporate headquarters in Melbourne&rsquo;s Docklands is an
            example of a employer that has chosen nature to be is included to improve employee wellbeing. Some 70%
            of employees reported that they felt healthier and 66% felt more productive. The plants, both inside
            the building and in the courtyard areas, provide a positive connection to nature and this is the key
            to our sense of wellbeing.
          </p>
        </Split>
      </Band>

      <Band tone="white">
        <Split image="/images/hero-pool-retaining-wall.jpg" alt="Sandstone retaining wall, pergola and pool in a Ground Up project, Sydney North">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink leading-[1.1] tracking-[0.2em]">
            Hospitals that heal
          </h2>
          <div className={`mt-8 text-muted ${bodyText}`}>
            <p>
              The world over hospitals are realising the benefits of nature to heal. Renowned public health
              researcher and Australian of the Year (2003) Professor Fiona Stanley from the Fiona Stanley Hospital
              in Murdoch Western Australia believes the natural environment promotes healing. It was with this in
              mind that AU$21 million was invested in the gardens&rsquo; landscape design. The 2014 large
              construction project incorporates buildings, bushland, a rooftop garden and courtyard gardens into a
              unified complex, with 2100 trees and 160,000 shrubs planted in the 32 hectare site.
            </p>
            <p>
              Natalie Bush was the landscape architect who helped design the gardens. Her design factored in key
              aspects, such as access to outdoor spaces and views of green and living things from all the wards.
              She was also mindful of planting a biodiverse landscape and creating a civic place. The results speak
              for themselves with people using the space like their local park, and rehabilitation often happening
              outside, getting &lsquo;sunshine therapy&rsquo;.
            </p>
            <p>
              The spaces are often contemplative and alive with birds as well as flowers, and every window can see
              out into the garden, which is important for those that are not able to go outside themselves. Even
              the Intensive Care Unit has an outdoor experience for the very sick patients, so they can come out
              and get some sun. Here privacy is paramount so that patients feel protected in their vulnerable
              state. Masses of rocks have been craned up to the rooftop garden and mounds of different coloured
              gravels and foliage plants are used to create interest. The ward towers look down onto this site
              creating a visually exciting garden to be explored from the windows and helping reduce their stress.
            </p>
          </div>
        </Split>
      </Band>

      <CTABand />
    </Page>
  )
}

/* ----------------------------------------------------------------
   Contact
---------------------------------------------------------------- */
const CONTACT_ROWS = [
  { label: 'Address', value: 'Mosman Sydney, Australia' },
  { label: 'Email', value: 'info@ground-up.com.au', href: 'mailto:info@ground-up.com.au' },
  { label: 'Phone', value: '0428 978 887', href: 'tel:+61428978887' },
  { label: 'Social', value: '@GROUNDUP', href: INSTAGRAM_URL, external: true },
]

export function ContactPage() {
  return (
    <Page title="Contact">
      <section className="relative overflow-hidden bg-deep text-white px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-36 sm:pb-40 -mb-24 lg:min-h-[100dvh] lg:flex lg:items-center">
        <img src="/images/texture-dark-leaves.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-deep/95 via-deep/85 to-deep/65" />

        <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: heading + contact details (below the form on phones) */}
          <div className="reveal order-2 lg:order-1 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Get in touch</span>
            <h1 className="mt-3 font-display font-semibold text-3xl sm:text-4xl leading-[1.1] tracking-[0.2em]">
              Contact
            </h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg leading-relaxed max-w-md">
              We look forward to discussing your project or landscapes with you.
            </p>

            <dl className="mt-7 border-t border-white/20">
              {CONTACT_ROWS.map((row) => (
                <div key={row.label} className="py-3.5 border-b border-white/20">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">{row.label}</dt>
                  <dd className="mt-1 text-base sm:text-lg">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="text-white hover:text-accent transition-colors"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-white">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-md">
              Your information is kept secure and used only to respond to your enquiry. We do not share your
              details with third parties for marketing.
            </p>
          </div>

          {/* Right: enquiry form (first on phones) */}
          <div className="reveal order-1 lg:order-2 lg:col-span-7">
            <EnquiryForm compact />
          </div>
        </div>
      </section>
    </Page>
  )
}
