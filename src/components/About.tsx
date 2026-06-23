import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function About() {
  const skills = [
    'Brand Identity',
    'UI/UX Design',
    'Graphic Design',
    'Illustration',
    'Web Design',
    'Packaging',
    'Print Design',
    'Photography',
    'Art Direction',
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-stone mb-6">
              À propos d'Alicia
            </h2>
            <p className="text-stone text-opacity-70 mb-4 leading-relaxed">
              Graphiste passionnée depuis plus de 8 ans, j'aime créer des univers visuels
              qui racontent une histoire. Mon approche combine sensibilité artistique et
              stratégie de communication.
            </p>
            <p className="text-stone text-opacity-70 mb-6 leading-relaxed">
              Chaque projet est une opportunité de transformer une idée en création
              mémorable. Je travaille en étroite collaboration avec mes clients pour
              comprendre leur vision et la concrétiser en designs innovants et impactants.
            </p>
            <div className="flex items-center gap-2 text-sage mb-8">
              <Heart size={20} className="text-rose" />
              <span className="font-medium">Passion pour la créativité & l'innovation</span>
            </div>
          </motion.div>

          {/* Right side - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blush rounded-lg p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-stone mb-6">
              Compétences
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 p-3 bg-cream rounded-lg hover:bg-sage hover:bg-opacity-20 transition-all cursor-pointer"
                >
                  <span className="text-rose">✿</span>
                  <span className="text-stone font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
