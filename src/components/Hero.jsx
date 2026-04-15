import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Gauge, MessageSquareMore, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from './WhatsAppButton'

function Hero({
  title,
  titleAccent,
  description,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  tagline,
  highlights = [],
  stats = [],
}) {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const introY = useSpring(useTransform(scrollYProgress, [0, 1], [22, -12]), {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })
  const topGlowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [32, -24]), {
    stiffness: 75,
    damping: 22,
    mass: 0.45,
  })
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -70]), {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })

  return (
    <section ref={sectionRef} id="inicio" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_30%),linear-gradient(180deg,#fbf8f3_0%,#f7f3ed_48%,#f4efe7_100%)]"
        style={prefersReducedMotion ? undefined : { y: glowY }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]"
        style={prefersReducedMotion ? undefined : { y: topGlowY }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-28 -z-10 h-[26rem] bg-[radial-gradient(circle_at_center,rgba(17,94,89,0.08),transparent_62%)] blur-3xl"
        style={prefersReducedMotion ? undefined : { y: glowY }}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24 lg:gap-16">
        <div
          className="w-full text-center items-center justify-center"
          style={prefersReducedMotion ? undefined : { y: introY }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
            <Sparkles size={11} className="text-[var(--brand-color)]" />
            {tagline}
          </div>

          <h1 className="mt-6 text-balance text-5xl font-black leading-[0.94] tracking-tight text-slate-950 sm:text-6xl lg:text-[5.4rem]">
            {title}{' '}
            <span className="bg-[linear-gradient(90deg,var(--brand-color),#0f9b8e,#f59e0b)] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">            {description}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <WhatsAppButton href={ctaHref} label={ctaLabel} size="lg" />
            <a
              href={secondaryHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-color)]/25 hover:text-slate-950"
            >
              {secondaryLabel}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-4xl mx-auto">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                  <item.icon size={18} />
                </div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            {stats.map((stat) => (
              <div key={stat.label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 shadow-sm">
                <span className="font-extrabold text-slate-950">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="w-full rounded-[32px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5"
          style={prefersReducedMotion ? undefined : { y: cardY }}
        >
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f6f7f8)]">
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 sm:px-5">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="ml-3 h-7 flex-1 rounded-full bg-slate-100 px-4 py-1 text-xs font-medium text-slate-400">
                clientesya.com/landing
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="bg-[linear-gradient(135deg,#0f766e,#115e59)] p-5 text-white sm:p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Centralizá todo</p>
                <h2 className="mt-3 max-w-xl text-2xl font-black leading-tight sm:text-3xl">
                  Mensajes, servicios y ventas en un solo lugar.
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/12 bg-white/10 p-3 backdrop-blur">
                      <p className="text-xl font-black">{stat.value}</p>
                      <p className="mt-1 text-xs text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] bg-white p-4 text-slate-900 shadow-xl sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Lo que hacemos</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                        <Gauge size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Ordenamos la información</p>
                        <p className="text-xs text-slate-500">Para que tu cliente entienda rápido.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--brand-color)]/10 text-[var(--brand-color)]">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Destacamos tu propuesta</p>
                        <p className="text-xs text-slate-500">Diseño limpio, claro y confiable.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 bg-white p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Respuesta rápida</p>
                <h3 className="mt-3 text-xl font-black text-slate-950 sm:text-2xl">WhatsApp directo y sin vueltas</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                  Mantenemos el foco en una sola acción: que te escriban. El diseño acompaña, no distrae.
                </p>

                <div className="mt-6 space-y-3">
                  {highlights.map((item) => (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--brand-color)] shadow-sm">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero