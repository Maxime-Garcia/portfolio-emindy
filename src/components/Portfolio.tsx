import { useState } from 'react'
import { motion } from 'framer-motion'

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
    description: 'Série d\'affiches pour une collection de printemps',
  },
  {
    id: 3,
    title: 'Packaging Produit Bio',
    category: 'Packaging',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf23ca6400?w=500&h=500&fit=crop',
    description: 'Design d\'emballage pour une marque de cosmétiques naturels',
  },
  {
    id: 4,
    title: 'Illustration Éditoriale',
    category: 'Illustration',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Illustrations pour magazine lifestyle',
  },
  {
    id: 5,
    title: 'Web Design - Site Portfolio',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
    description: 'Design et interface pour portfolio créatif',
  },
  {
    id: 6,
    title: 'Social Media Content',
    category: 'Digital',
    image: 'https://images.unsplash.com/photo-1586985289688-cacf23ca6400?w=500&h=500&fit=crop',
    description: 'Création de contenu visuel pour réseaux sociaux',
  },
]

const categories = ['Tous', ...new Set(projects.map((p) => p.category))]

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
          <p className="text-stone text-opacity-70">
            Découvrez une sélection de mes projets récents
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-sage text-cream'
                  : 'bg-cream text-stone border border-sage border-opacity-30 hover:border-sage hover:border-opacity-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-square bg-stone bg-opacity-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone from-0% to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-cream">
                    <p className="text-sm text-opacity-80">{project.category}</p>
                    <h3 className="font-serif text-lg font-bold">{project.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-stone text-opacity-70 text-sm">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
