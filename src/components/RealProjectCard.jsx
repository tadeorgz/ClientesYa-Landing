import { useRef } from 'react'
import { motion as Motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import WhatsAppButton from './WhatsAppButton'

const RealProjectCard = ({ whatsappHref, projectUrl = 'https://zonamueblesuy.com' }) => {
  const containerRef = useRef(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: false })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Parallax effects
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -40]), {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })

  const sectionItems = [
    { label: 'Introducción', color: 'from-blue-500/20 to-blue-400/10', icon: '🏢' },
    { label: 'Productos', color: 'from-emerald-500/20 to-emerald-400/10', icon: '📦' },
    { label: 'Qué Incluye', color: 'from-amber-500/20 to-amber-400/10', icon: '✨' },
    { label: 'Sobre Nosotros', color: 'from-rose-500/20 to-rose-400/10', icon: '👥' },
    { label: 'Contacto', color: 'from-purple-500/20 to-purple-400/10', icon: '📞' },
  ]

  const SectionBox = ({ item, index }) => {
    const boxRef = useRef(null)
    const mouseX = useRef(0)
    const mouseY = useRef(0)

    const handleMouseMove = (e) => {
      if (!boxRef.current) return

      const rect = boxRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      mouseX.current = ((e.clientX - rect.left - centerX) / centerX) * 100
      mouseY.current = ((e.clientY - rect.top - centerY) / centerY) * 100

      boxRef.current.style.setProperty('--mouse-x', `${mouseX.current + 50}%`)
      boxRef.current.style.setProperty('--mouse-y', `${mouseY.current + 50}%`)
    }

    const handleMouseLeave = () => {
      if (boxRef.current) {
        boxRef.current.style.setProperty('--mouse-x', '50%')
        boxRef.current.style.setProperty('--mouse-y', '50%')
      }
    }

    return (
      <Motion.div
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
        className="group relative h-24 sm:h-28 overflow-hidden rounded-lg sm:rounded-2xl border border-white/15 bg-gradient-to-br backdrop-blur-md cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(135deg, var(--gradient))`,
          '--gradient': item.color,
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "
          style={{
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent)',
          }}
        />

        <div className="relative h-full w-full flex flex-col items-center justify-center p-2 sm:p-4 text-center">
          <Motion.div
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
            className="text-3xl sm:text-4xl mb-1 sm:mb-2"
          >
            {item.icon}
          </Motion.div>

          <Motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
            className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors"
          >
            {item.label}
          </Motion.h3>

          <Motion.div
            className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
      </Motion.div>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div ref={inViewRef} className="space-y-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-sm backdrop-blur">
            <span className="text-lg">⭐</span>
            Caso de Éxito Real
          </p>
          <h2 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Mirá cómo transformamos ZonaMuebles
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Una tienda de muebles que necesitaba orden y claridad. Diseñamos una landing que centraliza sus productos, explica sus servicios y acelera la conversión.
          </p>
        </Motion.div>

        {/* Main Card */}
        <Motion.div
          ref={containerRef}
          style={prefersReducedMotion ? undefined : { y: cardY }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500/30 via-blue-500/30 to-purple-500/30 rounded-[40px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />

          <div className="relative rounded-[40px] border border-white/20 bg-white/80 backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Glassmorphic background effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'radial-gradient(circle at 20% 50%, rgba(15, 118, 110, 0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1), transparent 50%)',
              }}
            />

            {/* Content Grid */}
            <div className="relative p-5 sm:p-8 lg:p-12">
              <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">

                {/* Left: iPhone Mockup - FIXED PROPORTIONS */}
                <Motion.a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ y: -8 }}
                  className="group/phone relative cursor-pointer flex flex-col items-center justify-center w-full mt-4 lg:mt-0"
                >
                  {/* iPhone Frame - Explicit strict widths to force aspect ratio */}
                  <div className="relative w-[240px] sm:w-[280px] lg:w-[300px]">

                    {/* Outer casing */}
                    <div className="rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden relative">

                      {/* Screen bezel */}
                      <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-black relative">

                        {/* Notch/Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-32 h-5 sm:h-6 bg-black rounded-b-2xl sm:rounded-b-3xl flex items-center justify-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-slate-800/80" />
                          <div className="w-1 h-1 rounded-full bg-slate-700/80" />
                        </div>

                        {/* Screen content with scroll effect - FIXED HEIGHTS */}
                        <div className="relative h-[460px] sm:h-[550px] lg:h-[600px] bg-gradient-to-b from-slate-100 to-white overflow-hidden">
                          {/* Scroll container */}
                          <Motion.div
                            initial={{ y: 0 }}
                            whileHover={{ y: "-75%" }}
                            transition={{ duration: 10, ease: "linear" }}
                            className="w-full h-auto"
                          >
                            <img
                              src="/preview-zonamuebles.jpg"
                              alt="Preview de ZonaMuebles"
                              className="w-full h-auto object-cover pointer-events-none"
                            />
                          </Motion.div>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 bg-black/80 rounded-full" />
                      </div>
                    </div>

                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />

                    {/* Glow on hover */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-[3.5rem] opacity-0 group-hover/phone:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                    {/* Click hint text */}
                    <Motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="text-center mt-5 text-xs text-slate-500 font-medium tracking-wide"
                    >
                      ↻ Clickeá para ver la demo completa
                    </Motion.p>
                  </div>

                  {/* External Link Indicator */}
                  <Motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-0 right-0 sm:-right-4 lg:-right-6 bg-white border border-slate-200 rounded-full p-2.5 shadow-xl opacity-0 group-hover/phone:opacity-100 transition-opacity z-30"
                  >
                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Motion.div>
                </Motion.a>

                {/* Right: Bento Box Grid + Description */}
                <div className="space-y-5 lg:space-y-6">
                  {/* Description Section */}
                  <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-2 sm:space-y-3 rounded-2xl border border-slate-200/40 bg-slate-50/50 p-4 sm:p-5"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-slate-950">Estructura de ZonaMuebles</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Organizamos cada sección para que los clientes naveguen sin fricción y lleguen directo al mensaje.
                    </p>
                  </Motion.div>

                  {/* Bento Box Grid */}
                  <Motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-2 gap-2 sm:gap-3"
                  >
                    {sectionItems.map((item, index) => (
                      <SectionBox key={item.label} item={item} index={index} />
                    ))}
                  </Motion.div>
                </div>
              </div>

              {/* Bottom CTA Section */}
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 sm:mt-12 rounded-3xl border border-slate-200/60 bg-gradient-to-r from-slate-50 to-white p-5 sm:p-8 shadow-sm"
              >
                <div className="flex flex-col gap-5 lg:items-center lg:justify-between lg:flex-row">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--brand-color)] uppercase tracking-wide">
                      ¿Te copa este enfoque?
                    </p>
                    <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-slate-950">
                      Hagamos lo mismo para tu negocio
                    </h3>
                  </div>

                  <Motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
                  >
                    <WhatsAppButton href={whatsappHref} label="Quiero mi landing" size="lg" className="w-full sm:w-auto" />
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 focus:ring-2 focus:ring-slate-200"
                    >
                      Ver sitio en vivo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Motion.div>
                </div>
              </Motion.div>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Animated background decoration */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-b from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          animation: inView ? 'float 6s ease-in-out infinite' : 'none',
        }}
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </section>
  )
}

export default RealProjectCard