import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-400 border-b ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-sage/20 shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="#"
            className="text-2xl font-serif text-stone font-bold tracking-tight hover:text-rose transition-colors"
          >
            Alicia H.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-stone hover:text-rose transition-colors text-sm font-medium group"
              >
                {item.label}
                <motion.span
                  className="absolute left-0 -bottom-0.5 h-[1.5px] w-full bg-rose origin-left block"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 bg-sage text-cream rounded-full text-sm font-medium hover:bg-rose transition-colors btn-shimmer"
            >
              Me contacter
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-sage/20 rounded-lg transition-colors"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={24} className="text-stone" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={24} className="text-stone" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden bg-cream/98 backdrop-blur-md border-t border-sage/10"
          >
            <div className="max-w-6xl mx-auto px-4 pb-6 pt-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  className="text-stone hover:text-rose transition-colors py-3 text-base font-medium border-b border-sage/10 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.06, duration: 0.22 }}
                className="mt-3 px-5 py-3 bg-sage text-cream rounded-full text-sm font-medium text-center hover:bg-rose transition-colors btn-shimmer"
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
