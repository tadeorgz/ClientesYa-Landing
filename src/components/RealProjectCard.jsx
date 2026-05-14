import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import WhatsAppButton from './WhatsAppButton'

const RealProjectCard = ({ whatsappHref }) => {
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

            {/* Content Grid */}
            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Left: Preview & Description */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100/50 p-6 overflow-hidden group/preview"
                  >
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-rose-400" />
                        <div className="h-3 w-3 rounded-full bg-amber-400" />
                        <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <div className="h-8 w-full max-w-xs rounded-full bg-slate-200/60 group-hover/preview:bg-slate-300/60 transition-colors" />
                    </div>

                    <div className="space-y-3">
                      <motion.div
                        animate={inView ? { x: [0, 4, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                        className="h-4 w-3/4 rounded-lg bg-slate-300/70"
                      />
                      <motion.div
                        animate={inView ? { x: [0, 4, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
                        className="h-4 w-5/6 rounded-lg bg-slate-300/50"
                      />
                      <motion.div
                        animate={inView ? { x: [0, 4, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                        className="h-4 w-4/5 rounded-lg bg-slate-300/60"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h3 className="text-lg font-bold text-slate-950">Estructura de ZonaMuebles</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Organizamos todos los elementos en secciones claras para que el cliente navigate sin fricción. Cada sección cumple un propósito específico en el customer journey.
                    </p>
                  </motion.div>
                </div>

                {/* Right: Bento Box Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="grid grid-cols-2 gap-3 lg:grid-cols-2 lg:gap-3 auto-rows-max"
                >
                  {sectionItems.map((item, index) => (
                    <SectionBox key={item.label} item={item} index={index} />
                  ))}
                </motion.div>
              </div>

              {/* Bottom CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-10 rounded-3xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-white p-6 sm:p-8"
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
                    className="flex gap-3"
                  >
                    <WhatsAppButton href={whatsappHref} label="Ver mi landing" size="lg" />
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
