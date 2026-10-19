import { ArrowUpRight, MessageCircle, QrCode } from 'lucide-react'
import { menuDemos } from '../data/menuDemos'
import { createWhatsAppLink } from '../utils/whatsapp'
import { siteConfig } from '../config/siteConfig'

export default function MenuDemos() {
  return <div className="mx-auto mt-20 max-w-[1280px] px-5 sm:px-10">
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8"><div><p className="eyebrow mb-3">EXPLORÁ EL MENÚ</p><h3 className="text-3xl font-extrabold tracking-tight">Tres locales. Tres identidades.</h3></div><p className="text-sm max-w-md text-cy-text-sec">Demos desarrolladas como muestra. Abrilas, explorá sus cartas e imaginá la de tu negocio.</p></div>
    <div className="grid gap-5 md:grid-cols-3">{menuDemos.map(demo => <article key={demo.id} className="menu-demo-card">
      <a id={`demo-${demo.id}`} href={demo.url} target="_blank" rel="noopener noreferrer" className={`menu-demo-preview ${demo.style}`} aria-label={`Explorar demo de ${demo.name}`}><span className="menu-demo-badge">PROYECTO DE MUESTRA</span><QrCode size={27} /><strong>{demo.mark}</strong><span>LA CARTA <ArrowUpRight size={18} /></span></a>
      <div className="p-6"><p className="text-xs text-cy-text-sec mb-2">{demo.detail}</p><h4 className="font-bold text-xl">{demo.name}</h4><p className="mt-2 text-sm text-cy-text-sec">{demo.label}</p><div className="mt-6 flex flex-wrap gap-4"><a href={demo.url} data-source={demo.id} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cy-lime text-sm font-bold">Ver demo <ArrowUpRight size={16} /></a><a href={createWhatsAppLink(siteConfig.whatsappNumber, `Hola ClientesYa, vi la demo de ${demo.name} y quiero un menú digital a medida para mi negocio.`)} data-source={demo.id} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm"><MessageCircle size={16} />Quiero uno así</a></div></div>
    </article>)}</div>
  </div>
}
