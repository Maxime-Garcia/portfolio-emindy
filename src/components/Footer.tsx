export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone text-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Alicia Henneton</h3>
            <p className="text-cream text-opacity-70 text-sm">
              Graphiste et designer créatif spécialisée en identité visuelle et design print.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-cream text-opacity-70">
              <li>
                <a href="#portfolio" className="hover:text-cream transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cream transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cream transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suivez-moi</h4>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-cream transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-cream transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-cream transition-colors">
                Dribbble
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream border-opacity-20 pt-8">
          <p className="text-center text-cream text-opacity-60 text-sm">
            © {currentYear} Alicia Henneton. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
