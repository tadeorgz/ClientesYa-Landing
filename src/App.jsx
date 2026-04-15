import { ArrowRight, ChevronRight, CircleCheckBig, Layers3, MessageSquareMore, PenTool, Smartphone, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import WhatsAppButton from './components/WhatsAppButton'
import { siteConfig } from './config/siteConfig'
import { demos } from './data/products'
import { createLandingInquiryMessage, createProductInquiryMessage, createWhatsAppLink } from './utils/whatsapp'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Demos', href: '#demos' },
  { label: 'Qué incluye', href: '#incluye' },
  { label: 'Contacto', href: '#contacto' },
]

const heroHighlights = [
  {
    icon: MessageSquareMore,
    title: 'Todo en un solo lugar',
    description: 'Información, contacto y propuesta clara sin dispersión.',
  },
  {
    icon: Smartphone,
    title: 'Pensado para móvil',
    description: 'La experiencia prioriza pantallas chicas y decisiones rápidas.',
  },
  {
    icon: Sparkles,
    title: 'Listo para vender',
    description: 'Botones visibles, textos cortos y enfoque real en conversión.',
  },
]

const heroStats = [
  { value: '3', label: 'demos reales' },
  { value: '48h', label: 'arranque rápido' },
  { value: 'WA', label: 'contacto directo' },
]

const valuePillars = [
  {
    icon: Layers3,
    title: 'Ordenamos la información',
    text: 'Tu negocio se ve más claro desde el primer scroll.',
  },
  {
    icon: PenTool,
    title: 'Elevamos tu imagen',
    text: 'Diseño sobrio, con detalles que transmiten confianza.',
  },
  {
    icon: CircleCheckBig,
    title: 'Facilitamos la venta',
    text: 'Todo termina en una sola acción: escribirte.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Nos contás tu negocio',
    text: 'Entendemos qué vendés, qué querés priorizar y qué información ya tenés.',
  },
  {
    number: '02',
    title: 'Ordenamos y diseñamos',
    text: 'Convertimos eso en una landing clara, cálida y lista para WhatsApp.',
  },
  {
    number: '03',
    title: 'Lanzás y empezás a recibir',
    text: 'La web queda lista para compartir y empezar a centralizar consultas.',
  },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState(0)

  const ctaHref = createWhatsAppLink(siteConfig.whatsappNumber, siteConfig.defaultWhatsAppMessage)
  const mobileDemo = demos[activeDemo]

  const carouselDemos = useMemo(() => demos, [])

  const goNext = () => setActiveDemo((current) => (current + 1) % carouselDemos.length)

  return (
    <div
      style={{
        '--brand-color': siteConfig.colors.brand,
        '--brand-dark-color': siteConfig.colors.brandDark,
        '--accent-color': siteConfig.colors.accent,
        '--bg-soft-color': siteConfig.colors.bgSoft,
        '--text-color': siteConfig.colors.text,
      }}
      className="min-h-screen text-[var(--text-color)] antialiased"
    >
      <Navbar
        companyName={siteConfig.companyName}
        navLinks={navLinks}
        ctaHref={ctaHref}
        ctaLabel={siteConfig.ctaLabel}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <main>
        <Hero
          title={siteConfig.heroTitle}
          titleAccent={siteConfig.heroTitleAccent}
          description={siteConfig.heroDescription}
          ctaHref={ctaHref}
          ctaLabel={siteConfig.heroPrimaryCta}
          secondaryHref="#demos"
          secondaryLabel={siteConfig.heroSecondaryCta}
          tagline={siteConfig.tagline}
          highlights={heroHighlights}
          stats={heroStats}
        />

        <section id="demos" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
              <Sparkles size={11} className="text-[var(--brand-color)]" />
              Demos reales
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Tres landings, tres formas distintas de vender mejor.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Estas demos muestran cómo adaptamos la estructura, los mensajes y el foco visual según el tipo de negocio.
            </p>
          </div>

          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
            {carouselDemos.map((demo) => {
              const inquiryMessage = createProductInquiryMessage(siteConfig.companyName, demo.nombre)
              return (
                <ProductCard
                  key={demo.id}
                  demo={demo}
                  whatsappHref={createWhatsAppLink(siteConfig.whatsappNumber, inquiryMessage)}
                />
              )
            })}
          </div>

          <div className="mt-10 md:hidden">
            <div className="relative">
              <div key={mobileDemo.id} className="transition-all duration-300">
                <ProductCard
                  demo={mobileDemo}
                  featured
                  whatsappHref={createWhatsAppLink(
                    siteConfig.whatsappNumber,
                    createProductInquiryMessage(siteConfig.companyName, mobileDemo.nombre),
                  )}
                />
              </div>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-[52%] hover:bg-slate-50"
                aria-label="Siguiente demo"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {carouselDemos.map((demo, index) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setActiveDemo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === activeDemo ? 'w-8 bg-[var(--brand-color)]' : 'w-2 bg-slate-300'}`}
                  aria-label={`Ir a la demo ${demo.nombre}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="incluye" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {valuePillars.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                  <item.icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:p-10">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                <Layers3 size={11} className="text-[var(--brand-color)]" />
                Cómo trabajamos
              </p>
              <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
                Un proceso simple para que tu web salga rápido y con foco.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                No llenamos la pantalla de texto. Tomamos lo que ya tenés y lo transformamos en una experiencia más clara para tus clientes.
              </p>
            </div>

            <div className="grid gap-4">
              {processSteps.map((step) => (
                <div key={step.number} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-color)] text-sm font-black text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[34px] bg-[linear-gradient(135deg,var(--brand-color),var(--brand-dark-color))] px-6 py-14 text-center text-white shadow-[0_30px_110px_rgba(15,118,110,0.35)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Listo para empezar</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              Si querés una landing que venda más y ordene mejor tu negocio, escribinos hoy.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              Te respondemos por WhatsApp y vemos cuál es la mejor forma de presentar tu negocio.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton href={createWhatsAppLink(siteConfig.whatsappNumber, createLandingInquiryMessage(siteConfig.companyName))} label="Quiero hablar" size="lg" />
              <a
                href="#demos"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Ver las demos
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer
        companyName={siteConfig.companyName}
        socialLinks={siteConfig.socialLinks}
        whatsappNumber={siteConfig.whatsappNumber}
        ctaHref={ctaHref}
      />
    </div>
  )
}

export default App
