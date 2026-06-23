import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const navLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Dribbble', href: '#' },
]

// ─── Animated link with underline slide ──────────────────────────────────────
function FooterLink({ href, label, index }: { href: string; label: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      <motion.a
        href={href}
        className="relative text-cream/50 hover:text-cream text-sm transition-colors duration-200 inline-block"
        whileHover="hovered"
      >
        {label}
        <motion.span
          className="absolute left-0 -bottom-0.5 h-px bg-rose origin-left block w-full"
          variants={{ hovered: { scaleX: 1 }, initial: { scaleX: 0 } }}
          initial="initial"
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </motion.a>
    </motion.li>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer ref={ref} className="bg-stone text-cream py-16 px-4 relative overflow-hidden">
      {/* Background decorative petals */}
      {[
        { top: '10%', right: '5%', size: '120px', opacity: 0.04, rotate: 15 },
        { top: '60%', left: '2%', size: '80px', opacity: 0.05, rotate: -20 },
        { bottom: '10%', right: '20%', size: '60px', opacity: 0.04, rotate: 45 },
      ].map((petal, i) => (
        <div
          key={i}
          className="absolute font-serif select-none pointer-events-none"
          style={{
            top: petal.top,
            right: petal.right,
            left: petal.left,
            bottom: petal.bottom,
            fontSize: petal.size,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotate}deg)`,
            color: '#FFF8F3',
          }}
          aria-hidden="true"
        >
          ✿
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative">
        {/* ── Top: Logo + tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl font-bold mb-2">
            Alicia <span className="italic text-rose/70">Henneton</span>
          </h2>
          <p className="text-cream/35 text-sm max-w-xs leading-relaxed">
            Graphiste et designer créatif spécialisée en identité visuelle et design print.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Spacer on desktop */}
          <div className="hidden md:block" />

          {/* Navigation */}
          <div>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40 mb-5"
            >
              Navigation
            </motion.h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <FooterLink key={link.label} href={link.href} label={link.label} index={i} />
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <motion.h4
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/40 mb-5"
            >
              Suivez-moi
            </motion.h4>
            <ul className="space-y-3">
              {socialLinks.map((link, i) => (
                <FooterLink key={link.label} href={link.href} label={link.label} index={i + 3} />
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-cream/15 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5 }}
          aria-hidden="true"
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-cream/30 text-xs"
          >
            © {currentYear} Alicia Henneton. Tous droits réservés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2 text-cream/20 text-xs"
          >
            <span>Conçu avec</span>
            <span className="text-rose/50" aria-label="amour">✿</span>
            <span>& React</span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
