import { useRef } from 'react'
import { ArrowDown, ArrowUp, Expand, LockKeyhole, X } from 'lucide-react'

export default function ZonaMueblesShowcase() {
  const preview = useRef(null)
  const modal = useRef(null)
  const opener = useRef(null)
  const move = (top) => preview.current?.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })

  return <div className="zona-showcase order-2 lg:order-1">
    <div className="zona-showcase-label"><span className="zona-status-dot" /> PROYECTO EN VIVO <span>01 / ZONAMUEBLES</span></div>
    <div className="zona-browser">
      <div className="zona-browser-toolbar">
        <div className="zona-window-dots" aria-hidden="true"><i /><i /><i /></div>
        <span className="zona-address"><LockKeyhole size={12} aria-hidden="true" /> zonamueblesuy.com</span>
        <button ref={opener} type="button" className="zona-icon-button" aria-label="Ampliar vista previa de ZonaMuebles" onClick={() => modal.current.showModal()}><Expand size={17} /></button>
      </div>
      <div ref={preview} className="zona-preview-scroll" tabIndex={0} role="region" aria-label="Captura de ZonaMuebles. Desplazate para explorar el sitio">
        <img src="/zonamuebles-preview.webp" width="960" height="10908" loading="lazy" decoding="async" alt="Sitio real de ZonaMuebles: presentación, catálogo de muebles y consultas por WhatsApp" />
      </div>
      <div className="zona-preview-controls">
        <button type="button" onClick={() => move(0)} aria-label="Volver al inicio de la captura"><ArrowUp size={15} aria-hidden="true" /> Inicio</button>
        <span>Vista previa del sitio</span>
        <button type="button" onClick={() => move(preview.current.scrollTop + preview.current.clientHeight * .85)}>Explorar <ArrowDown size={15} aria-hidden="true" /></button>
      </div>
    </div>
    <div className="zona-showcase-caption"><span>Diseño a medida. Consultas directas.</span><span>DESLIZÁ PARA EXPLORAR ↓</span></div>
    <dialog ref={modal} className="zona-preview-dialog" aria-labelledby="zona-dialog-title" onClose={() => opener.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) modal.current.close() }}>
      <div className="zona-dialog-header">
        <div><h3 id="zona-dialog-title">ZonaMuebles</h3><p>Recorré la captura completa del proyecto.</p></div>
        <button type="button" className="zona-icon-button" aria-label="Cerrar vista previa" onClick={() => modal.current.close()} autoFocus><X size={22} /></button>
      </div>
      <div className="zona-dialog-content" tabIndex={0} role="region" aria-label="Captura ampliada de ZonaMuebles"><img src="/zonamuebles-preview.webp" width="960" height="10908" loading="lazy" alt="Captura completa del sitio de ZonaMuebles" /></div>
      <a id="zona-preview-live" data-source="catalog" className="zona-dialog-link" href="https://zonamueblesuy.com" target="_blank" rel="noopener noreferrer">Abrir el sitio interactivo ↗</a>
    </dialog>
  </div>
}
