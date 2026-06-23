import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'

const skills = [
  { label: 'Brand Identity', level: 95 },
  { label: 'UI/UX Design', level: 88 },
  { label: 'Graphic Design', level: 97 },
  { label: 'Illustration', level: 82 },
  { label: 'Web Design', level: 85 },
  { label: 'Packaging', level: 90 },
  { label: 'Print Design', level: 93 },
  { label: 'Photography', level: 78 },
  { label: 'Art Direction', level: 91 },
]

const stats = [
  { value: 8, suffix: '+', label: "ans d'expérience" },
  { value: 50, suffix: '+', label: 'projets réalisés' },
  { value: 30, suffix: '+', label: 'clients satisfaits' },
]

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    // Skip RAF animation for users who prefer reduced motion
    if (prefersReducedMotion) {
      setCount(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1600

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // Ease-out quart
      const eased = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, prefersReducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ label, level, index }: { label: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="mb-4"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm font-medium text-stone flex items-center gap-2">
          <motion.span
            className="text-rose text-xs"
            animate={inView ? { rotate: [0, 15, -10, 0] } : {}}
            transition={{ duration: 0.6, delay: index * 0.07 + 0.4 }}
            aria-hidden="true"
          >
            ✿
          </motion.span>
          {label}
        </span>
        <motion.span
          className="text-xs text-stone/40 tabular-nums font-medium"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.07 + 0.8 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[2px] bg-stone/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #9DBF8F, #D4A5A5)',
            originX: 0,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : {}}
          transition={{
            duration: 1,
            delay: index * 0.07 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Animated paragraph line reveal ──────────────────────────────────────────
function RevealLines({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <p ref={ref} className="text-stone/65 leading-relaxed text-[15px] overflow-hidden" aria-label={text}>
      <motion.span
        className="block"
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </p>
  )
}

// ─── Portrait placeholder with morph ─────────────────────────────────────────
function PortraitPlaceholder() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const smoothY = useSpring(y, { damping: 35, stiffness: 80 })

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-3xl">
      {/* Morphing background */}
      <motion.div
        className="absolute inset-0 blob-shape"
        style={{ y: smoothY }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #F5E6E0 0%, #D4A5A5 40%, #9DBF8F 100%)',
          }}
        />
      </motion.div>

      {/* Decorative content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <motion.div
          className="text-[80px] text-cream/60 font-serif"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          ✿
        </motion.div>
        <p className="text-cream/70 font-serif text-lg font-bold tracking-wide">
          Alicia H.
        </p>
        <p className="text-cream/50 text-xs uppercase tracking-[0.2em] font-medium">
          Graphiste · Créatrice
        </p>
      </div>

      {/* Subtle texture lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[1px] bg-cream/10"
          style={{ top: `${(i + 1) * 14}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.08 }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
function AboutHeading() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
        transition={{ duration: 0.8 }}
        className="text-xs text-stone/40 uppercase tracking-[0.3em] mb-4 font-medium"
      >
        Sur moi
      </motion.p>
      <div className="overflow-hidden mb-6">
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-stone"
          initial={{ y: '105%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          À propos d'Alicia
        </motion.h2>
      </div>
    </div>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <PortraitPlaceholder />
          </motion.div>

          {/* ── Right: Text + Skills ── */}
          <div>
            <AboutHeading />

            <div className="space-y-5 mb-10">
              <RevealLines
                text="Graphiste passionnée depuis plus de 8 ans, je crée des univers visuels qui racontent une histoire. Mon approche combine sensibilité artistique et stratégie de communication."
                delay={0.15}
              />
              <RevealLines
                text="Chaque projet est une opportunité de transformer une idée en création mémorable. Je travaille en étroite collaboration avec mes clients pour concrétiser leur vision en designs innovants et impactants."
                delay={0.25}
              />
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center p-4 bg-blush rounded-2xl border border-rose/10"
                >
                  <p className="text-3xl md:text-4xl font-serif font-bold text-stone mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[11px] text-stone/50 leading-tight tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* ── Skills bars ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-serif font-bold text-stone mb-6 flex items-center gap-3">
                Compétences
                <span className="h-[1px] flex-1 bg-stone/10" aria-hidden="true" />
              </h3>
              {skills.map((skill, i) => (
                <SkillBar key={skill.label} label={skill.label} level={skill.level} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
