import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, type Variants } from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Identité Visuelle - Café Floral',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Logo, palette de couleurs et guidelines pour une marque de café artisanal',
  },
  {
    id: 2,
    title: 'Campagne Print - Printemps',
    category: 'Print',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d782b?w=500&h=500&fit=crop',
    description: "Série d'affiches pour une collection de printemps",
  },
  {
    id: 3,
    title: 'Packaging Produit Bio',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf23ca6400?w=500&h=500&fit=crop',
    description: "Design d'emballage pour une marque de cosmétiques naturels",
  },
  {
    id: 4,
    title: 'Illustration Éditoriale',
    category: 'Illustration',
    image: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=500&h=500&fit=crop',
    description: 'Illustrations pour magazine lifestyle',
  },
  {
    id: 5,
    title: 'Web Design - Site Portfolio',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=500&fit=crop',
    description: 'Design et interface pour portfolio créatif',
  },
  {
    id: 6,
    title: 'Social Media Content',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=500&h=500&fit=crop',
    description: 'Création de contenu visuel pour réseaux sociaux',
  },
]

const categories = ['Tous', ...new Set(projects.map((p) => p.category))]

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, scale: 0.88, y: -12, transition: { duration: 0.25 } },
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const filteredProjects =
    selectedCategory === 'Tous'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="portfolio" className="py-20 px-4 bg-blush">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone mb-4">
            Portfolio Créatif
          </h2>
          <p className="text-stone/70">
            Découvrez une sélection de mes projets récents
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="group" aria-label="Filtres par catégorie">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`px-4 py-2 rounded-full transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                selectedCategory === category
                  ? 'bg-sage text-cream shadow-sm'
                  : 'bg-cream text-stone border border-sage/30 hover:border-sage hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid with AnimatePresence */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.article
                  key={project.id}
                  layout
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(139,134,128,0.15)' }}
                  transition={{ layout: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
                  className="group cursor-pointer rounded-lg will-change-transform"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-stone/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                    />
                    {/* Slide-up overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-stone/80 via-stone/40 to-transparent flex items-end p-4"
                      initial={{ y: '100%' }}
                      whileHover={{ y: '0%' }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="text-cream">
                        <p className="text-xs text-cream/75 uppercase tracking-wider font-medium mb-1">
                          {project.category}
                        </p>
                        <h3 className="font-serif text-lg font-bold leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                  <p className="text-stone/70 text-sm leading-relaxed px-0.5">
                    {project.description}
                  </p>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
