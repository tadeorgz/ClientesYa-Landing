import { Award, Clock, Heart, MessageCircle, Users } from 'lucide-react'
import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import WhatsAppButton from './WhatsAppButton'
import { siteConfig } from '../config/siteConfig'
import { createWhatsAppLink } from '../utils/whatsapp'

const stats = [
  { value: '1 objetivo', label: 'Generarte consultas reales', icon: MessageCircle },
  { value: '24-48h', label: 'Web lista', icon: Clock },
  { value: '100%', label: 'Diseño enfocado en conversión', icon: Users },
  { value: '0 código innecesario', label: 'Simple y efectivo', icon: Heart },
]

function AboutUs() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const storyY = useSpring(useTransform(scrollYProgress, [0, 1], [18, -18]), {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  })
  const statsY = useSpring(useTransform(scrollYProgress, [0, 1], [28, -12]), {
    stiffness: 75,
    damping: 22,
    mass: 0.45,
  })

  const ctaHref = createWhatsAppLink(
    siteConfig.whatsappNumber,
    '¡Hola! Quiero agendar una evaluación dental y conocer sus tratamientos.',
  )

  return (
    <section ref={sectionRef} id="nosotros" className="relative overflow-hidden bg-slate-900 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_100%,rgba(15,118,110,0.2),transparent)]"
        style={prefersReducedMotion ? undefined : { y: storyY }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_100%_0%,rgba(245,158,11,0.08),transparent)]"
        style={prefersReducedMotion ? undefined : { y: statsY }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-color)]/30 bg-[var(--brand-color)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-color)]">
            <Award size={12} />
            Sobre mi
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Soy Tadeo y estoy detrás de{' '}
            <span className="bg-gradient-to-r from-[var(--brand-color)] to-emerald-400 bg-clip-text text-transparent">
              ClientesYa
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            Tengo 21 años, soy una persona común, cercana y con muchas ganas de crecer. Me gusta escuchar música, aprender cosas nuevas y seguir mejorando todos los días para llevar mi emprendimiento a lo más alto.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — story */}
          <div
            className="space-y-6"
            style={prefersReducedMotion ? undefined : { y: storyY }}
          >
            {[
              {
                icon: Heart,
                title: 'Una persona como vos, con ganas de crecer',
                text: 'No vengo a hablarte desde un lugar lejano o corporativo. Soy alguien que está construyendo su camino, aprendiendo en el proceso y apostando todo para hacer crecer ClientesYa con trabajo real y trato cercano.',
              },
              {
                icon: Users,
                title: 'Estudiante avanzado de Ingeniería en Informática',
                text: 'Hoy estoy en la etapa final de la carrera y eso me dio una base sólida para trabajar en desarrollo web con una mirada práctica: que la web no solo se vea bien, sino que ayude a generar consultas reales por WhatsApp.',
              },
              {
                icon: Clock,
                title: 'Proyectos reales y experiencia aplicada',
                text: 'Trabajé en proyectos académicos y personales, y también colaboré con el Hotel Puesta del Sol en Punta del Este, realizando mejoras web y optimizaciones para darle una presencia más clara, rápida y profesional.',
              },
              {
                icon: MessageCircle,
                title: 'Soluciones a medida, no plantillas genéricas',
                text: 'No uso WordPress ni Shopify para resolver todo igual. Desarrollo webs a medida con tecnologías modernas como React, lo que me permite adaptar cada proyecto a lo que realmente necesita el cliente, con buen rendimiento y foco en resultados.',
              },
            ].map(({ icon, title, text }) => {
              const SectionIcon = icon
              return (
                <div key={title} className="group flex gap-5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-color)]/15 ring-1 ring-[var(--brand-color)]/25 transition-all duration-300 group-hover:bg-[var(--brand-color)]/25">
                    <SectionIcon size={18} className="text-[var(--brand-color)]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div
              className="pt-4"
            >
              <WhatsAppButton
                href={ctaHref}
                label="Hablemos por WhatsApp"
                size="lg"
              />
            </div>
          </div>

          {/* Right — stats */}
          <div
            className="flex flex-col justify-center"
            style={prefersReducedMotion ? undefined : { y: statsY }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const StatIcon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--brand-color)]/30 hover:bg-[var(--brand-color)]/8"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-color)]/15">
                      <StatIcon size={18} className="text-[var(--brand-color)]" />
                    </div>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>

                    <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-[var(--brand-color)]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                )
              })}
            </div>

            {/* Testimonial */}
            <div
              className="mt-6 rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-300 italic">
                "Quiero que cada web que hago sume de verdad: que genere confianza, se vea profesional y ayude a que más personas te escriban."
              </p>
              <p className="mt-3 text-xs font-semibold text-[var(--brand-color)]">— Tadeo, ClientesYa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
