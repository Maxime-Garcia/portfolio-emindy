import { useCallback, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FlowerIntro from './components/FlowerIntro'

// ─── Noise Overlay ───────────────────────────────────────────────────────────
// animate-noise is needed to make Tailwind emit the @keyframes noise block
// that index.css's .noise-overlay animation references
function NoiseOverlay() {
  return <div className="noise-overlay animate-noise" aria-hidden="true" />
}


// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isPointerFine] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)').matches : false
  )

  // Main ring — smooth spring
  const springX = useSpring(cursorX, { damping: 22, stiffness: 320, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 22, stiffness: 320, mass: 0.4 })

  // Trailing dot — laggier
  const trailX = useSpring(cursorX, { damping: 40, stiffness: 140, mass: 0.8 })
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 140, mass: 0.8 })

  useEffect(() => {
    if (!isPointerFine) return

    document.body.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    const checkHover = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, label')
      setHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mousemove', checkHover, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY, isPointerFine])

  if (!isPointerFine || prefersReducedMotion) return null

  return (
    <>
      {/* Trailing large ring */}
      <motion.div
        className="cursor-dot"
        aria-hidden="true"
        animate={{
          width: hovered ? 48 : clicked ? 16 : 36,
          height: hovered ? 48 : clicked ? 16 : 36,
          backgroundColor: hovered ? 'rgba(212,165,165,0.15)' : 'transparent',
          borderColor: hovered ? '#D4A5A5' : 'rgba(139,134,128,0.35)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(139,134,128,0.35)',
          borderRadius: '50%',
        }}
      />
      {/* Sharp center dot */}
      <motion.div
        className="cursor-dot"
        aria-hidden="true"
        animate={{
          width: clicked ? 3 : 6,
          height: clicked ? 3 : 6,
          backgroundColor: hovered ? '#D4A5A5' : '#9DBF8F',
          opacity: hovered ? 0.9 : 0.7,
        }}
        transition={{ duration: 0.15 }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
        }}
      />
    </>
  )
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]"
      style={{
        scaleX,
        opacity,
        background: 'linear-gradient(90deg, #9DBF8F, #D4A5A5)',
      }}
      aria-hidden="true"
    />
  )
}

// ─── hasSeenIntro guard ───────────────────────────────────────────────────────
const INTRO_KEY = 'hasSeenIntro'

function getShouldShowIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_KEY) !== 'true'
  } catch {
    // localStorage unavailable (SSR / private browsing restriction)
    return true
  }
}

function markIntroSeen(): void {
  try {
    localStorage.setItem(INTRO_KEY, 'true')
  } catch {
    // silently ignore
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // Initialise synchronously — avoids a flash of the intro on revisit
  const [introComplete, setIntroComplete] = useState<boolean>(() => !getShouldShowIntro())

  const handleIntroDone = useCallback(() => {
    markIntroSeen()
    setIntroComplete(true)
  }, [])

  return (
    <div className="bg-cream">
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>
        {!introComplete && (
          <FlowerIntro key="flower-intro" onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Navigation />
        <main>
          <Hero />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
