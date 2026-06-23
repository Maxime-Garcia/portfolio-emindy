import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floral background elements */}
      <div className="absolute top-20 right-10 text-rose text-opacity-30 text-9xl select-none pointer-events-none">✿</div>
      <div className="absolute bottom-32 left-5 text-sage text-opacity-20 text-8xl select-none pointer-events-none">✿</div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone mb-6">
            Alicia Henneton
          </h1>
          <p className="text-xl md:text-2xl text-sage mb-4">
            Graphiste & Designer Créatif
          </p>
          <p className="text-lg text-stone text-opacity-70 max-w-2xl mx-auto leading-relaxed">
            Bienvenue dans mon univers créatif. Chaque projet est une histoire,
            une palette de couleurs, une harmonie visuelle pensée avec soin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12"
        >
          <a
            href="#portfolio"
            className="inline-block px-8 py-3 bg-sage text-cream rounded-full font-medium hover:bg-rose transition-all hover:scale-105 cursor-pointer"
          >
            Découvrez mes projets
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-5xl text-rose text-opacity-40 animate-float">✿</div>
        </motion.div>
      </div>
    </section>
  )
}
