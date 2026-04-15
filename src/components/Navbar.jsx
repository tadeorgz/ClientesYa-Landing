import { useEffect, useState } from 'react'
import { Menu, Sparkles, X } from 'lucide-react'
import WhatsAppButton from './WhatsAppButton'

function Navbar({ companyName, navLinks, ctaHref, ctaLabel, isMenuOpen, onToggleMenu }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-[28px] border px-4 py-3 shadow-[0_18px_60px_rgba(17,24,39,0.10)] backdrop-blur-2xl transition-all duration-500 sm:px-5 ${scrolled ? 'border-slate-200/70 bg-white/85' : 'border-white/40 bg-white/55'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#inicio" className="group inline-flex items-center gap-3">
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,var(--brand-color),var(--brand-dark-color))] text-white shadow-lg shadow-[var(--brand-color)]/25 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Sparkles size={17} />
              <span className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-black tracking-tight text-slate-900 sm:text-base">{companyName}</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Webs que venden</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900/5 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <WhatsAppButton href={ctaHref} label={ctaLabel} className="ml-3" />
          </nav>

          <button
            type="button"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 md:hidden"
            onClick={onToggleMenu}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'mt-3 max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-xl shadow-black/5">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onToggleMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <WhatsAppButton href={ctaHref} label={ctaLabel} className="w-full" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
