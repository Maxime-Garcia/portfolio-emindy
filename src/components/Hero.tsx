import { useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useSpring,
  useScroll,
  useInView,
  type Variants,
} from 'framer-motion'

// ─── Split text into char spans ──────────────────────────────────────────────
function SplitChars({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  once = true,
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once })

  const charVariants: Variants = {
    hidden: { y: '110%', opacity: 0, rotateX: -30 },
    visible: (i: number) => ({
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.65,
        delay: delay + i * stagger,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char-wrap"
          aria-hidden="true"
          style={{ perspective: '600px' }}
        >
          <motion.span
            className="char-inner inline-block"
            custom={i}
            variants={charVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'

// ─── Scramble text on hover ───────────────────────────────────────────────────
function ScrambleText({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)
  const prefersReducedMotion = useReducedMotion()

  const scramble = useCallback(() => {
    // Skip scramble effect for users who prefer reduced motion
    if (prefersReducedMotion) return
    if (!ref.current) return
    let iter = 0
    const total = text.length * 3

    cancelAnimationFrame(rafRef.current)

    const tick = () => {
      if (!ref.current) return
      ref.current.innerText = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' '
          if (idx < iter / 3) return text[idx]
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')

      iter++
      if (iter < total) rafRef.current = requestAnimationFrame(tick)
    }
    tick()
  }, [text, prefersReducedMotion])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (ref.current) ref.current.innerText = text
  }, [text])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      {text}
    </span>
  )
}

// ─── Floating organic petal ───────────────────────────────────────────────────
function FloatingPetal({
  x,
  y,
  size,
  color,
  delay,
  motionX,
  motionY,
}: {
  x: string
  y: string
  size: string
  color: string
  delay: number
  motionX: ReturnType<typeof useSpring>
  motionY: ReturnType<typeof useSpring>
}) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        left: x,
        top: y,
        fontSize: size,
        color,
        x: motionX,
        y: motionY,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay, ease: [0.34, 1.56, 0.64, 1] }}
      aria-hidden="true"
    >
      ✿
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Scroll parallax for hero content
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Mouse parallax spring configs
  const fast = { damping: 30, stiffness: 120 }
  const mid  = { damping: 40, stiffness: 80 }
  const slow = { damping: 50, stiffness: 50 }

  const smoothX = useSpring(mouseX, fast)
  const smoothY = useSpring(mouseY, fast)

  // Petal parallax layers
  const p1X = useTransform(smoothX, [-1, 1], [-22, 22])
  const p1Y = useTransform(smoothY, [-1, 1], [-15, 15])
  const midX = useSpring(mouseX, mid)
  const midY = useSpring(mouseY, mid)
  const p2X = useTransform(midX, [-1, 1], [16, -16])
  const p2Y = useTransform(midY, [-1, 1], [12, -12])
  const slowX = useSpring(mouseX, slow)
  const slowY = useSpring(mouseY, slow)
  const p3X = useTransform(slowX, [-1, 1], [-10, 10])
  const p3Y = useTransform(slowY, [-1, 1], [-18, 18])
  const p4X = useTransform(slowX, [-1, 1], [8, -8])
  const p4Y = useTransform(slowY, [-1, 1], [-8, 8])

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
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient"
      aria-label="Introduction"
    >
      {/* ── Petals parallax ── */}
      <FloatingPetal x="88%" y="12%" size="clamp(70px,9vw,120px)" color="rgba(212,165,165,0.22)" delay={0.2} motionX={p1X} motionY={p1Y} />
      <FloatingPetal x="4%"  y="70%" size="clamp(50px,7vw,90px)"  color="rgba(157,191,143,0.18)" delay={0.35} motionX={p2X} motionY={p2Y} />
      <FloatingPetal x="45%" y="5%"  size="clamp(30px,4vw,55px)"  color="rgba(245,230,224,0.7)"  delay={0.5}  motionX={p3X} motionY={p3Y} />
      <FloatingPetal x="75%" y="80%" size="clamp(40px,5vw,70px)"  color="rgba(212,165,165,0.13)" delay={0.6}  motionX={p4X} motionY={p4Y} />
      <FloatingPetal x="15%" y="20%" size="clamp(20px,3vw,40px)"  color="rgba(157,191,143,0.25)" delay={0.7}  motionX={p2X} motionY={p1Y} />

      {/* ── Morphing blob background accent ── */}
      <div
        className="absolute w-[min(70vw,600px)] h-[min(70vw,600px)] rounded-full pointer-events-none blob-shape"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,165,165,0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-32 pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="text-xs text-stone/50 uppercase mb-8 font-medium tracking-[0.35em]"
        >
          Graphiste · Designer Créatif
        </motion.p>

        {/* Main title — character split */}
        <h1 className="text-[clamp(56px,10vw,120px)] font-serif font-bold text-stone leading-[0.9] mb-8 tracking-tight">
          <span className="block overflow-hidden">
            <SplitChars text="Alicia" delay={0.15} stagger={0.05} />
          </span>
          <span className="block overflow-hidden italic text-rose/80 mt-1">
            <SplitChars text="Henneton" delay={0.35} stagger={0.05} />
          </span>
        </h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-stone/60 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Chaque projet est une histoire, une palette de couleurs,
          une harmonie visuelle pensée avec soin.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#portfolio"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-stone text-cream rounded-full font-medium overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
          >
            <span className="relative z-10">
              <ScrambleText text="Voir mes projets" />
            </span>
            {/* sliding bg on hover */}
            <motion.span
              className="absolute inset-0 bg-rose rounded-full"
              initial={{ x: '-101%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-stone/60 hover:text-rose transition-colors group font-medium"
          >
            Me contacter
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              →
            </motion.span>
          </a>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 mx-auto w-px h-16 origin-top"
          style={{
            background: 'linear-gradient(to bottom, rgba(139,134,128,0.3), transparent)',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label="Défiler vers le bas"
      >
        <motion.span
          className="text-[10px] text-stone/35 tracking-[0.3em] uppercase font-medium"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
        <div className="w-[1px] h-10 overflow-hidden" aria-hidden="true">
          <motion.div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, #D4A5A5, transparent)',
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
