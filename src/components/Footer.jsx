import { ArrowUpRight, Globe, MessageCircle } from 'lucide-react'
import { useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import WhatsAppButton from './WhatsAppButton'

const iconByName = {
  Instagram: Globe,
  Facebook: Globe,
  TikTok: Globe,
}

function Footer({ companyName, socialLinks = [], whatsappNumber, ctaHref }) {
  const footerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  const panelY = useSpring(useTransform(scrollYProgress, [0, 1], [24, -14]), {
    stiffness: 80,
    damping: 24,
    mass: 0.45,
  })
  const accentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), {
    stiffness: 60,
    damping: 20,
    mass: 0.55,
  })

  return (
    <footer ref={footerRef} id="contacto" className="mt-0 border-t border-slate-200 bg-[#0f172a] text-white">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
          <div
            className="grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.35)] backdrop-blur lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.7fr)] lg:p-10"
            style={prefersReducedMotion ? undefined : { y: panelY }}
          >
            <div className="relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18),transparent_68%)] blur-2xl"
                style={prefersReducedMotion ? undefined : { y: accentY }}
              />
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <MessageCircle size={11} />
                Contacto rápido
              </p>
              <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
                Si querés una landing que ordene tu negocio y venda más, escribinos.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                Armamos landings claras, con foco en conversión, navegación simple y un camino directo al WhatsApp de tu negocio.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppButton href={ctaHref} label="Hablar ahora" size="lg" />
                <a
                  href="#demos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Ver demos
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Lo que queda listo</p>
              <div className="mt-4 space-y-3">
                {['Texto claro', 'Diseño mobile first', 'CTA a WhatsApp', 'Entrega simple'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-black text-white">{companyName}</p>
              <p className="mt-1">Landings pensadas para vender con menos fricción y más claridad.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const SocialIcon = iconByName[social.name] || Globe
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                  >
                    <SocialIcon size={14} />
                    {social.name}
                  </a>
                )
              })}
            </div>

            <a
              href={`https://wa.me/${String(whatsappNumber || '').replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              +{whatsappNumber}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer