import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Link2, Share2 } from 'lucide-react'
import { useState } from 'react'

interface ContactInfoItem {
  icon: React.ElementType
  label: string
  value: string
  href: string
}

const contactInfo: ContactInfoItem[] = [
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
    icon: Link2,
    label: 'LinkedIn',
    value: 'alicia-henneton',
    href: 'https://linkedin.com',
  },
  {
    icon: Share2,
    label: 'Instagram',
    value: '@alicia.designs',
    href: 'https://instagram.com',
  },
]

interface FloatFieldProps {
  type?: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

function FloatField({ type = 'text', name, label, value, onChange, required }: FloatFieldProps) {
  return (
    <div className="float-label-wrap">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        aria-label={label}
        autoComplete={type === 'email' ? 'email' : 'off'}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

interface FloatTextAreaProps {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  required?: boolean
}

function FloatTextArea({ name, label, value, onChange, rows = 4, required }: FloatTextAreaProps) {
  return (
    <div className="float-label-wrap textarea-wrap">
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={rows}
        required={required}
        aria-label={label}
        className="resize-none"
        style={{ paddingTop: '1.6rem', paddingBottom: '0.5rem' }}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated submission — replace with real API call
    setSubmitted(true)
  }

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
          <p className="text-stone/70">
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
            className="space-y-4"
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-cream transition-colors group cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="p-3 bg-sage/20 rounded-xl group-hover:bg-rose/20 transition-colors shrink-0"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <info.icon
                    className="text-sage group-hover:text-rose transition-colors"
                    size={22}
                    aria-hidden="true"
                  />
                </motion.div>
                <div>
                  <p className="font-medium text-stone text-sm">{info.label}</p>
                  <p className="text-stone/60 text-sm">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form / Success */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center justify-center h-full min-h-[320px] text-center p-8 bg-cream rounded-2xl"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-6xl mb-4"
                    aria-hidden="true"
                  >
                    ✿
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-stone mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-stone/60 text-sm leading-relaxed mb-6">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="px-5 py-2 rounded-full border border-sage/40 text-stone text-sm hover:bg-sage hover:text-cream transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <FloatField
                    name="name"
                    label="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatField
                    type="email"
                    name="email"
                    label="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <FloatField
                    name="subject"
                    label="Sujet"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <FloatTextArea
                    name="message"
                    label="Votre message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 bg-sage text-cream rounded-xl font-medium hover:bg-rose transition-colors btn-shimmer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                  >
                    Envoyer le message
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
