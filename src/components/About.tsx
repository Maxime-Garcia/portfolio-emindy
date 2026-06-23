import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'

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

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 8, suffix: '+', label: "ans d'expérience" },
  { value: 50, suffix: '+', label: 'projets réalisés' },
  { value: 30, suffix: '+', label: 'clients satisfaits' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const stepTime = 16
    const steps = Math.ceil(duration / stepTime)
    const increment = value / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepTime)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function About() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-stone mb-6">
              À propos d'Alicia
            </h2>
            <p className="text-stone/70 mb-4 leading-relaxed">
              Graphiste passionnée depuis plus de 8 ans, j'aime créer des univers visuels
              qui racontent une histoire. Mon approche combine sensibilité artistique et
              stratégie de communication.
            </p>
            <p className="text-stone/70 mb-6 leading-relaxed">
              Chaque projet est une opportunité de transformer une idée en création
              mémorable. Je travaille en étroite collaboration avec mes clients pour
              comprendre leur vision et la concrétiser en designs innovants et impactants.
            </p>
            <div className="flex items-center gap-2 text-sage mb-10">
              <Heart size={20} className="text-rose" />
              <span className="font-medium">Passion pour la créativité & l'innovation</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-4 bg-blush rounded-xl"
                >
                  <p className="text-3xl font-serif font-bold text-stone mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-stone/60 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blush rounded-xl p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-stone mb-6">
              Compétences
            </h3>
            <div ref={skillsRef} className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 12 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.055, ease: 'easeOut' }}
                  whileHover={{ scale: 1.04, rotate: 0.8 }}
                  className="flex items-center gap-2 p-3 bg-cream rounded-lg cursor-default will-change-transform"
                >
                  <span className="text-rose text-sm" aria-hidden="true">✿</span>
                  <span className="text-stone font-medium text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
