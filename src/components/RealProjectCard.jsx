import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
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
      <motion.div
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className="group relative h-28 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br backdrop-blur-md cursor-pointer"
        style={{
          backgroundImage: `linear-gradient(135deg, var(--gradient))`,
          '--gradient': item.color,
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent)',
          }}
        />

        <div className="relative h-full w-full flex flex-col items-center justify-center p-4 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
            className="text-4xl mb-2"
          >
            {item.icon}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
            className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors"
          >
            {item.label}
          </motion.h3>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
      </motion.div>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div ref={inViewRef} className="space-y-8">
        {/* Header */}
        <motion.div
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
        </motion.div>

        {/* Main Card */}
        <motion.div
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

            {/* Content Grid - Adjusted for iPhone prominence */}
            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center">
                {/* Left: iPhone Mockup */}
                <motion.a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ y: -12 }}
                  className="group/phone relative cursor-pointer"
                >
                  {/* iPhone Frame */}
                  <div className="relative mx-auto max-w-sm">
                    {/* Outer casing */}
                    <div className="rounded-[3rem] border-8 border-slate-900/80 bg-slate-950 shadow-2xl overflow-hidden">
                      {/* Screen bezel */}
                      <div className="rounded-[2.5rem] overflow-hidden bg-black relative">
                        {/* Notch/Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-40 h-7 bg-black rounded-b-3xl flex items-center justify-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-slate-600" />
                          <div className="w-1 h-1 rounded-full bg-slate-600" />
                        </div>

                        {/* Screen content with scroll effect */}
                        <div className="relative h-[550px] bg-gradient-to-b from-slate-100 to-white pt-8 overflow-hidden group-hover/phone:overflow-y-auto">
                          {/* Scroll container */}
                          <motion.div
                            initial={{ y: 0 }}
                            whileHover={{ y: "-70%" }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="w-full h-auto"
                          >
                            <img
                              src="/preview-zonamuebles.jpg"
                              alt="Preview de ZonaMuebles"
                              className="w-full h-auto object-cover"
                            />
                          </motion.div>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
                      </div>
                    </div>

                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />

                    {/* Glow on hover */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3.5rem] opacity-0 group-hover/phone:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                  </div>

                  {/* External Link Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -top-3 -right-3 bg-white border border-slate-200 rounded-full p-2 shadow-lg opacity-0 group-hover/phone:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.div>
                </motion.a>

                {/* Right: Bento Box Grid + Description */}
                <div className="space-y-6">
                  {/* Description Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-3 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-4"
                  >
                    <h3 className="text-base font-bold text-slate-950">Estructura de ZonaMuebles</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Organizamos cada sección para que los clientes naveguen sin fricción. Desde el primero impacto hasta la conversión.
                    </p>
                  </motion.div>

                  {/* Bento Box Grid */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    {sectionItems.map((item, index) => (
                      <SectionBox key={item.label} item={item} index={index} />
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Bottom CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 rounded-3xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      ¿Te late este enfoque?
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-950">
                      Hagamos lo mismo para tu negocio
                    </h3>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <WhatsAppButton href={whatsappHref} label="Quiero mi landing" size="lg" />
                    <motion.a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/50 px-6 py-4 text-sm font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:border-slate-400 hover:bg-white/80"
                    >
                      Ver sitio en vivo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
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
