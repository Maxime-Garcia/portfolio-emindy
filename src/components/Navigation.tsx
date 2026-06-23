import { Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const navItems = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

// ─── Magnetic nav link ────────────────────────────────────────────────────────
function MagneticLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.3 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.3 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set((e.clientX - cx) * 0.25)
    mouseY.set((e.clientY - cy) * 0.25)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative text-stone hover:text-rose transition-colors text-sm font-medium group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm"
    >
      {label}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-rose origin-left block"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </motion.a>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/92 backdrop-blur-lg border-b border-stone/8 shadow-[0_1px_20px_rgba(139,134,128,0.06)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      aria-label="Navigation principale"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-serif text-stone font-bold tracking-tight hover:text-rose transition-colors text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Alicia{' '}
            <span className="italic text-rose/70 font-normal">H.</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <MagneticLink label={item.label} href={item.href} />
                {/* Active dot */}
                <AnimatePresence>
                  {activeSection === item.href.replace('#', '') && (
                    <motion.span
                      key="dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose"
                      layoutId="nav-dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.25 }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}

            <motion.a
              href="#contact"
              className="relative px-5 py-2 bg-stone text-cream rounded-full text-sm font-medium overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">Me contacter</span>
              <motion.span
                className="absolute inset-0 bg-rose rounded-full"
                initial={{ x: '-101%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            whileTap={{ scale: 0.93 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} className="text-stone" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} className="text-stone" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-cream/96 backdrop-blur-lg border-t border-stone/8"
          >
            <div className="max-w-6xl mx-auto px-4 pb-6 pt-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-stone hover:text-rose transition-colors py-3.5 text-base font-medium border-b border-stone/8 last:border-0 flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.label}</span>
                  <motion.span
                    className="text-stone/20 group-hover:text-rose transition-colors"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.07, duration: 0.3 }}
                className="mt-4 px-5 py-3.5 bg-stone text-cream rounded-full text-sm font-medium text-center hover:bg-rose transition-colors btn-shimmer"
                onClick={() => setIsOpen(false)}
              >
                Me contacter
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
