import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches
    if (!isPointerFine) return

    document.body.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-rose pointer-events-none z-[9999] mix-blend-multiply"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 30, stiffness: 200 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-rose origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

export default function App() {
  return (
    <div className="bg-cream">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
