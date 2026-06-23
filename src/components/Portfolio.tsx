import { useState, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useInView,
  type Variants,
} from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
  year: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Identité Visuelle — Café Floral',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop&q=80',
    description: 'Logo, palette de couleurs et guidelines pour une marque de café artisanal',
    year: '2024',
  },
  {
    id: 2,
    title: 'Campagne Print — Printemps',
    category: 'Print',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d782b?w=800&h=800&fit=crop&q=80',
    description: "Série d'affiches pour une collection de printemps",
    year: '2024',
  },
  {
    id: 3,
    title: 'Packaging Produit Bio',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf23ca6400?w=800&h=800&fit=crop&q=80',
    description: "Design d'emballage pour une marque de cosmétiques naturels",
    year: '2023',
  },
  {
    id: 4,
    title: 'Illustration Éditoriale',
    category: 'Illustration',
    image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=800&h=800&fit=crop&q=80',
    description: 'Illustrations pour magazine lifestyle',
    year: '2023',
  },
  {
    id: 5,
    title: 'Web Design — Portfolio',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=800&fit=crop&q=80',
    description: 'Design et interface pour portfolio créatif',
    year: '2024',
  },
  {
    id: 6,
    title: 'Social Media Content',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=800&fit=crop&q=80',
    description: 'Création de contenu visuel pour réseaux sociaux',
    year: '2023',
  },
]

const categories = ['Tous', ...Array.from(new Set(projects.map((p) => p.category)))]

// ─── Marquee skills band ──────────────────────────────────────────────────────
const skillItems = ['Branding', 'Print', 'Packaging', 'Illustration', 'Web Design', 'Digital', 'Art Direction', 'UI/UX', 'Typographie', 'Photographie']

function MarqueeBand() {
  const doubled = [...skillItems, ...skillItems]
  return (
    <div className="overflow-hidden py-5 border-y border-stone/10 mb-16 -mx-4 px-0" aria-hidden="true">
      <div className="flex animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-medium text-stone/35 uppercase tracking-[0.18em] mx-6 flex items-center gap-6"
          >
            {item}
            <span className="text-rose/50 text-xs">✿</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-80px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 300 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 300 })
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.12) 0%, transparent 60%)`

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(4px)',
      transition: { duration: 0.3 },
    },
  }

  return (
    <div style={{ perspective: 800 }}>
    <motion.article
      ref={cardRef}
      layout
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      exit="exit"
      className="group cursor-pointer tilt-card"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square bg-stone/10">
        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Glare reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glareBackground }}
          aria-hidden="true"
        />

        {/* Overlay — cinematic slide up */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{
            background: 'linear-gradient(to top, rgba(139,134,128,0.92) 0%, rgba(139,134,128,0.5) 40%, transparent 80%)',
          }}
          initial={{ opacity: 0, y: '30%' }}
          whileHover={{ opacity: 1, y: '0%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-[10px] text-cream/60 uppercase tracking-[0.2em] font-medium mb-1.5"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {project.category} · {project.year}
          </motion.p>
          <motion.h3
            className="font-serif text-cream text-lg font-bold leading-tight mb-2"
            initial={{ opacity: 0, y: 12 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            {project.title}
          </motion.h3>
          <motion.div
            className="h-[1px] w-8 bg-rose"
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Category badge top-left */}
        <div className="absolute top-3 left-3">
          <motion.span
            className="px-2.5 py-1 bg-cream/90 backdrop-blur-sm text-stone text-[10px] font-semibold uppercase tracking-[0.12em] rounded-full"
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          >
            {project.category}
          </motion.span>
        </div>
      </div>

      {/* Description */}
      <motion.p
        className="text-stone/55 text-sm leading-relaxed px-0.5"
        style={{ transform: 'translateZ(8px)' }}
      >
        {project.description}
      </motion.p>
    </motion.article>
    </div>
  )
}

// ─── Section heading with line reveal ─────────────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="text-center mb-6">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-xs text-stone/40 uppercase tracking-[0.3em] mb-4 font-medium"
      >
        Sélection de travaux
      </motion.p>

      <div className="overflow-hidden mb-4">
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-bold text-stone"
          initial={{ y: '100%', opacity: 0 }}
          animate={inView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Portfolio Créatif
        </motion.h2>
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto h-[1px] w-16 bg-gradient-to-r from-transparent via-rose to-transparent"
        style={{ originX: 0.5 }}
        aria-hidden="true"
      />
    </div>
  )
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const filteredProjects =
    selectedCategory === 'Tous'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="portfolio" className="py-28 px-4 bg-blush relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(212,165,165,0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading />

        <MarqueeBand />

        {/* ── Category Filters ── */}
        <div
          className="flex flex-wrap justify-center gap-2.5 mb-14"
          role="group"
          aria-label="Filtres par catégorie"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose overflow-hidden ${
                selectedCategory === cat
                  ? 'bg-stone text-cream'
                  : 'bg-cream/80 text-stone/70 border border-stone/15 hover:border-stone/30'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-stone rounded-full -z-10"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* ── Project Grid ── */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <TiltCard key={project.id} project={project} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
