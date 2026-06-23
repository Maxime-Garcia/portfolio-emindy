import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Mail, Phone, Link2, Share2 } from 'lucide-react'
import { useState, useRef } from 'react'

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

// ─── Float field ───────────────────────────────────────────────────────────────
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

// ─── Contact info card ────────────────────────────────────────────────────────
function ContactCard({ info, index }: { info: ContactInfoItem; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={info.href}
      target={info.href.startsWith('http') ? '_blank' : undefined}
      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-cream transition-all duration-200"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
    >
      <motion.div
        className="relative p-3.5 rounded-2xl overflow-hidden shrink-0"
        style={{ background: 'rgba(157,191,143,0.12)' }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <info.icon
          className="text-sage group-hover:text-rose transition-colors duration-200 relative z-10"
          size={20}
          aria-hidden="true"
        />
        {/* Hover fill */}
        <motion.div
          className="absolute inset-0 bg-rose/15 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      </motion.div>

      <div className="min-w-0">
        <p className="text-xs text-stone/40 uppercase tracking-[0.1em] font-medium mb-0.5">
          {info.label}
        </p>
        <p className="text-stone font-medium text-sm truncate group-hover:text-rose transition-colors duration-200">
          {info.value}
        </p>
      </div>

      <motion.span
        className="ml-auto text-stone/20 group-hover:text-rose/60 transition-colors text-lg"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        aria-hidden="true"
      >
        →
      </motion.span>
    </motion.a>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
function ContactHeading() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.5em' }}
        animate={inView ? { opacity: 1, letterSpacing: '0.3em' } : {}}
        transition={{ duration: 0.8 }}
        className="text-xs text-stone/40 uppercase tracking-[0.3em] mb-4 font-medium"
      >
        Commençons
      </motion.p>

      <div className="overflow-hidden mb-4">
        <motion.h2
          className="text-4xl md:text-6xl font-serif font-bold text-stone"
          initial={{ y: '105%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Travaillons{' '}
          <span className="italic text-rose/80">Ensemble</span>
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-stone/50 text-sm md:text-base max-w-md mx-auto"
      >
        Un projet en tête ? Parlons-en, je suis à l'écoute.
      </motion.p>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof typeof formData, string>> = {}
    if (!formData.name.trim()) newErrors.name = 'Veuillez indiquer votre nom.'
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez indiquer votre email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide.'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Veuillez indiquer un sujet.'
    if (!formData.message.trim()) newErrors.message = 'Veuillez saisir votre message.'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-28 px-4 bg-blush relative overflow-hidden">
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(157,191,143,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 90% 20%, rgba(212,165,165,0.1) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative">
        <ContactHeading />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* ── Contact info ── */}
          <div>
            <motion.h3
              className="text-sm font-semibold text-stone/50 uppercase tracking-[0.2em] mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mes coordonnées
            </motion.h3>
            <div className="space-y-1">
              {contactInfo.map((info, i) => (
                <ContactCard key={i} info={info} index={i} />
              ))}
            </div>

            {/* Decorative quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 pl-4 border-l-2 border-rose/40"
            >
              <p className="font-serif italic text-stone/50 text-sm leading-relaxed">
                "Le design est l'ambassadeur silencieux de votre marque."
              </p>
              <footer className="mt-2 text-xs text-stone/35 font-medium uppercase tracking-wide">
                — Paul Rand
              </footer>
            </motion.blockquote>
          </div>

          {/* ── Form / Success ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center justify-center min-h-[360px] text-center p-10 bg-cream rounded-3xl border border-sage/15"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-6xl mb-6 font-serif"
                    aria-hidden="true"
                  >
                    ✿
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-serif font-bold text-stone mb-3"
                  >
                    Message envoyé !
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-stone/50 text-sm leading-relaxed mb-8 max-w-xs"
                  >
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="px-6 py-2.5 rounded-full border border-stone/20 text-stone text-sm hover:bg-stone hover:text-cream transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                  >
                    Envoyer un autre message
                  </motion.button>
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
                  <div>
                    <FloatField
                      name="name"
                      label="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <FloatField
                      type="email"
                      name="email"
                      label="Votre email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose" role="alert">{errors.email}</p>}
                  </div>
                  <div>
                    <FloatField
                      name="subject"
                      label="Sujet"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    {errors.subject && <p className="mt-1 text-xs text-rose" role="alert">{errors.subject}</p>}
                  </div>
                  <div>
                    <FloatTextArea
                      name="message"
                      label="Votre message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                    {errors.message && <p className="mt-1 text-xs text-rose" role="alert">{errors.message}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    className="relative w-full px-6 py-4 bg-stone text-cream rounded-xl font-medium overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Envoyer le message
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                      >
                        →
                      </motion.span>
                    </span>
                    {/* Hover fill */}
                    <motion.span
                      className="absolute inset-0 bg-rose rounded-xl"
                      initial={{ x: '-101%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
