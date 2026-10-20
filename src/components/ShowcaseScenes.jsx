import { useRef } from 'react'
import { motion as Motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Globe, Layers, MessageCircle, Smartphone } from 'lucide-react'

export function Reveal({ children, className = '' }) {
  const reduced = useReducedMotion()
  return <Motion.div className={className} initial={false} whileInView={reduced ? undefined : { opacity: [0.55, 1], y: [24, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</Motion.div>
}

export function BrowserBar({ address }) {
  return <div className="browser-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span><Globe size={10} /> {address}</span><ArrowUpRight size={12} /></div>
}

export function HeroScene() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const desktopY = useTransform(scrollYProgress, [0, 1], [65, -75])
  const phoneY = useTransform(scrollYProgress, [0, 1], [95, -120])
  const rotate = useTransform(scrollYProgress, [0, 1], [-11, 2])
  const contentY = useTransform(scrollYProgress, [0, .45, 1], [45, 0, -12])
  const contentOpacity = useTransform(scrollYProgress, [0, .3, 1], [.2, 1, 1])
  const photoScale = useTransform(scrollYProgress, [0, .5, 1], [.75, 1, 1.06])
  return <div ref={ref} className="hero-scene" aria-label="Composición de una web y su versión móvil">
    <div className="scene-orbit orbit-one" aria-hidden="true" /><div className="scene-orbit orbit-two" aria-hidden="true" />
    <div className="scene-coordinate coord-top">DISEÑADO PARA TU NEGOCIO</div>
    <Motion.div className="hero-browser" style={reduced ? undefined : { y: desktopY, rotate }}>
      <BrowserBar address="tu-negocio.uy" />
      <div className="sample-website">
        <div className="sample-nav"><span>habitar<span className="sample-dot">.</span></span><span>Espacios con identidad <ArrowUpRight size={12} /></span></div>
        <div className="sample-hero"><Motion.div style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}><span className="sample-eyebrow">OBJETOS QUE CUENTAN HISTORIAS</span><h3>Tu espacio.<br />Tu manera.</h3><p>Diseño que se siente como casa.</p><span className="sample-pill">Descubrí la colección <ArrowUpRight size={12} /></span></Motion.div><Motion.img style={reduced ? undefined : { scale: photoScale }} src="/showcase/zona-sofa.webp" alt="Sofá beige en una composición de catálogo" width="450" height="450" fetchPriority="high" /></div>
        <div className="sample-bottom"><span>Hecho para vos.</span><span>01 — COLECCIÓN HOGAR</span></div>
      </div>
    </Motion.div>
    <Motion.div className="hero-phone" style={reduced ? undefined : { y: phoneY }}>
      <div className="phone-island" /><div className="phone-top">habitar.</div><img src="/showcase/zona-blue.webp" alt="Sofá azul en la vista móvil del catálogo" width="250" height="250" /><div className="phone-content"><span>DISEÑO A TU MEDIDA</span><h4>Un lugar<br />para quedarte.</h4><div className="phone-message"><MessageCircle size={14} /> Hablemos de tu espacio</div></div>
    </Motion.div>
    <div className="scene-note note-design"><span className="note-icon"><Layers size={17} /></span><div><strong>Tu identidad, en cada píxel.</strong><span>Diseño + desarrollo a medida</span></div><Check size={15} /></div>
    <div className="scene-note note-mobile"><Smartphone size={16} /><span>Se ve bien. En todas partes.</span></div>
    <span className="scene-coordinate coord-bottom">IDEA → DISEÑO → TU WEB</span>
  </div>
}

export function ZonaScene() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [20, -270])
  const phoneY = useTransform(scrollYProgress, [0, 1], [65, -55])
  return <div ref={ref} className="zona-track"><div className="zona-stage">
    <div className="zona-stage-top"><span><i className="status-dot" /> CASO REAL</span><span>01 / ZONAMUEBLES</span></div>
    <div className="zona-desktop"><BrowserBar address="zonamueblesuy.com" /><div className="zona-canvas"><Motion.div style={reduced ? undefined : { y }}>
      <div className="zona-mini-nav"><strong>ZONA<span>MUEBLES</span></strong><span>Catálogo &nbsp; Nosotros &nbsp; Contacto</span></div>
      <div className="zona-mini-hero"><span>HECHO A TU MEDIDA</span><h3>Un hogar que<br />habla de vos.</h3><p>Sillones y muebles personalizados.</p><img loading="lazy" src="/showcase/zona-room.webp" width="720" height="360" alt="Ambiente de ZonaMuebles" /></div>
      <div className="zona-mini-products"><h4>Encontrá tu próximo favorito.</h4><div>{[['zona-sofa', 'Sofá Mónaco'], ['zona-blue', 'Tu color. Tu estilo.']].map(([photo, label]) => <div key={photo}><img loading="lazy" src={`/showcase/${photo}.webp`} width="240" height="180" alt={label} /><span>{label}</span></div>)}</div></div>
    </Motion.div></div></div>
    <Motion.div className="zona-phone" style={reduced ? undefined : { y: phoneY }}><div className="phone-island" /><strong>ZONA MUEBLES</strong><img loading="lazy" src="/showcase/zona-blue.webp" alt="Sofá de ZonaMuebles en formato móvil" width="220" height="210" /><span>Sillón Mónaco</span><p>El confort tiene tu estilo.</p><div className="zona-mobile-tag"><MessageCircle size={12} /> Consultas por WhatsApp</div></Motion.div>
    <div className="zona-stage-caption"><span>DEL ESCRITORIO AL BOLSILLO.</span><ArrowDown size={15} /></div>
  </div></div>
}

const food = {
  canaritas: { name: 'canaritas', kicker: 'EL SABOR DE LO ARTESANAL', headline: <>Un clásico.<br />Mil antojos.</>, image: 'canaritas', product: 'Empanadas artesanales', category: 'EMPANADAS · CANASTITAS · MÁS', line: 'Elegí tu próxima favorita.' },
  renis: { name: 'RENI’S', kicker: 'SMASH BURGERS · LAS PIEDRAS', headline: <>Sin vueltas.<br />Con todo.</>, image: 'renis', product: 'Americana', category: 'BURGERS / PAPAS / BEBIDAS', line: 'Doble carne. Doble felicidad.' },
  martinos: { name: 'martino’s', kicker: 'HECHO PARA TENTARTE', headline: <>Hoy se come<br />bien.</>, image: 'martinos', product: 'Big Burger', category: 'SMASH · CHIVITOS · MILANESAS', line: 'Tu próxima buena decisión.' },
}
export function FoodScene({ type }) {
  const data = food[type]
  return <div className={`food-scene food-${type}`} role="img" aria-label={`Composición HTML de la demo ${data.name}`}>
    <div className="food-mini-nav"><strong>{data.name}<span>✳</span></strong><span>LA CARTA <ArrowUpRight size={12} /></span></div>
    <div className="food-copy"><span>{data.kicker}</span><h4>{data.headline}</h4><p>{data.line}</p></div>
    <div className="food-photo-wrap"><span className="food-seal">HECHO<br />CON<br />GANAS ↗</span><img loading="lazy" src={`/showcase/${data.image}.webp`} alt="" width="460" height="400" /></div>
    <div className="food-category">{data.category}</div><div className="food-bottom"><span>{data.product}</span><span>CARTA DIGITAL ↗</span></div>
  </div>
}
