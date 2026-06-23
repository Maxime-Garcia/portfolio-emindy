import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, type Variants } from 'framer-motion'

const titleWords = ['Alicia', 'Henneton']

// Framer Motion v12: ease arrays inside variants must be typed as [number,number,number,number]
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.15,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.55,
      ease: 'easeOut' as const,
    },
  },
}

const bodyVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.72,
      ease: 'easeOut' as const,
    },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.92,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  },
}

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 35, stiffness: 80 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Parallax layers
  const flower1X = useTransform(smoothX, [-1, 1], [-18, 18])
  const flower1Y = useTransform(smoothY, [-1, 1], [-12, 12])
  const flower2X = useTransform(smoothX, [-1, 1], [12, -12])
  const flower2Y = useTransform(smoothY, [-1, 1], [8, -8])
  const flower3X = useTransform(smoothX, [-1, 1], [-8, 8])
  const flower3Y = useTransform(smoothY, [-1, 1], [-15, 15])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section
      className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Introduction"
    >
      {/* Parallax floral background */}
      <motion.div
        className="absolute top-20 right-10 text-rose/25 text-9xl select-none pointer-events-none will-change-transform"
        style={{ x: flower1X, y: flower1Y }}
        aria-hidden="true"
      >
        ✿
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-5 text-sage/20 text-8xl select-none pointer-events-none will-change-transform"
        style={{ x: flower2X, y: flower2Y }}
        aria-hidden="true"
      >
        ✿
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 text-blush text-5xl select-none pointer-events-none will-change-transform opacity-50"
        style={{ x: flower3X, y: flower3Y }}
        aria-hidden="true"
      >
        ✿
      </motion.div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Word-by-word title reveal */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone mb-6 flex flex-wrap justify-center gap-x-5">
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-sage mb-4 font-medium"
        >
          Graphiste &amp; Designer Créatif
        </motion.p>

        <motion.p
          variants={bodyVariants}
          initial="hidden"
          animate="visible"
          className="text-lg text-stone/70 max-w-2xl mx-auto leading-relaxed"
        >
          Bienvenue dans mon univers créatif. Chaque projet est une histoire,
          une palette de couleurs, une harmonie visuelle pensée avec soin.
        </motion.p>

        {/* CTA with shimmer */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <a
            href="#portfolio"
            className="inline-block px-8 py-3.5 bg-sage text-cream rounded-full font-medium hover:bg-rose transition-colors btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
          >
            Découvrez mes projets
          </a>
        </motion.div>

        {/* Floating decorative flower */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16"
        >
          <div className="text-5xl text-rose/40 animate-float" aria-hidden="true">✿</div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs text-stone/40 tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-stone/20 flex justify-center pt-1.5">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-rose/60"
          />
        </div>
      </motion.div>
    </section>
  )
}
