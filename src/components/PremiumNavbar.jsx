import { useEffect, useRef, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { createWhatsAppLink } from '../utils/whatsapp'
import ThemeSwitch from './ThemeSwitch'

const links = [['Servicios', '#servicios'], ['Proyectos', '#proyectos'], ['Menús QR', '#menu-digital'], ['Planes', '#planes'], ['Contacto', '#contacto']]
export default function PremiumNavbar() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() } }
    const resize = () => { if (window.innerWidth >= 900) setOpen(false) }
    document.addEventListener('keydown', escape)
    window.addEventListener('resize', resize)
    return () => { document.removeEventListener('keydown', escape); window.removeEventListener('resize', resize) }
  }, [open])
  return <header className="site-header">
    <div className="nav-shell">
      <a href="#inicio" className="brand" aria-label="ClientesYa, inicio" onClick={() => setOpen(false)}><span className="brand-symbol" aria-hidden="true" /><span>ClientesYa<span className="brand-period">.</span></span></a>
      <nav className="desktop-nav" aria-label="Navegación principal">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <ThemeSwitch />
      <a id="nav-whatsapp" href={createWhatsAppLink(siteConfig.whatsappNumber, siteConfig.defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" className="nav-cta"><MessageCircle size={18} />Hablemos</a>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Navegación móvil">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a id="mobile-whatsapp" href={createWhatsAppLink(siteConfig.whatsappNumber, siteConfig.defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Hablar por WhatsApp ↗</a></nav>}
  </header>
}
