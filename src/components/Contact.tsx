import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData)
    alert('Message envoyé! (À implémenter)')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@aliciahenneton.com',
      href: 'mailto:contact@aliciahenneton.com',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 6 XX XX XX XX',
      href: 'tel:+33600000000',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'alicia-henneton',
      href: 'https://linkedin.com',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@alicia.designs',
      href: 'https://instagram.com',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 bg-blush">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone mb-4">
            Travaillons Ensemble
          </h2>
          <p className="text-stone text-opacity-70">
            Vous avez un projet en tête? Contactez-moi pour discuter de vos idées
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-cream transition-colors group cursor-pointer"
              >
                <div className="p-3 bg-sage bg-opacity-20 rounded-lg group-hover:bg-rose group-hover:bg-opacity-20 transition-all">
                  <info.icon className="text-sage group-hover:text-rose transition-colors" size={24} />
                </div>
                <div>
                  <p className="font-medium text-stone">{info.label}</p>
                  <p className="text-stone text-opacity-60">{info.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage border-opacity-30 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose focus:ring-opacity-20 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage border-opacity-30 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose focus:ring-opacity-20 transition-all"
            />
            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage border-opacity-30 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose focus:ring-opacity-20 transition-all"
            />
            <textarea
              name="message"
              placeholder="Votre message..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-sage border-opacity-30 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose focus:ring-opacity-20 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-sage text-cream rounded-lg font-medium hover:bg-rose transition-colors cursor-pointer"
            >
              Envoyer le message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
