'use client'

import { useState, useEffect } from 'react'

// ============================================
// CONFIGURACIÓN - EDITAR AQUÍ PARA PERSONALIZAR
// ============================================
const CONFIG = {
  nombre: '[NOMBRE DE LA NOTARÍA]',
  numero: '[NÚMERO]',
  titular: 'Lic. [NOMBRE DEL NOTARIO]',
  telefono: '+52 XXX XXX XXXX',
  whatsapp: '52XXXXXXXXXX',
  email: 'contacto@notaria.com',
  direccion: '[DIRECCIÓN COMPLETA]',
  ciudad: '[CIUDAD, ESTADO]',
  horario: 'Lunes a Viernes: 9:00 - 18:00',
  mapsUrl: 'https://maps.google.com/?q=...',
}

const SERVICIOS = [
  { id: 'escrituras', icon: '📜', nombre: { es: 'Escrituras', en: 'Deeds' }, desc: { es: 'Compraventa, donación y permuta de bienes inmuebles', en: 'Purchase, donation and exchange of real estate' }},
  { id: 'poderes', icon: '✍️', nombre: { es: 'Poderes', en: 'Powers of Attorney' }, desc: { es: 'Generales, especiales, para pleitos y cobranzas', en: 'General, special, for lawsuits and collections' }},
  { id: 'testamentos', icon: '📋', nombre: { es: 'Testamentos', en: 'Wills' }, desc: { es: 'Públicos abiertos, cerrados y ológrafos', en: 'Open public, closed and holographic wills' }},
  { id: 'constitutivas', icon: '🏢', nombre: { es: 'Actas Constitutivas', en: 'Articles of Incorporation' }, desc: { es: 'Creación de sociedades y empresas', en: 'Creation of companies and corporations' }},
  { id: 'matrimonios', icon: '💍', nombre: { es: 'Matrimonios', en: 'Marriages' }, desc: { es: 'Celebración de matrimonios civiles', en: 'Civil marriage ceremonies' }},
  { id: 'fe', icon: '✅', nombre: { es: 'Fe de Hechos', en: 'Certification of Facts' }, desc: { es: 'Certificación de hechos y notificaciones', en: 'Certification of facts and notifications' }},
  { id: 'apostillas', icon: '🌍', nombre: { es: 'Apostillas', en: 'Apostilles' }, desc: { es: 'Legalización de documentos para uso internacional', en: 'Document legalization for international use' }},
  { id: 'otros', icon: '📁', nombre: { es: 'Otros Servicios', en: 'Other Services' }, desc: { es: 'Ratificaciones, protocolizaciones y más', en: 'Ratifications, protocolizations and more' }},
]

const TEXTS = {
  es: {
    nav: 'Inicio',
    hero: 'Servicios Notariales de Confianza',
    heroSub: 'Más de [X] años brindando certeza jurídica a nuestros clientes',
    servicios: 'Nuestros Servicios',
    cita: 'Agendar Cita',
    citaSub: '¿Necesita asesoría? Programe su cita con nosotros',
    citaBtn: 'Solicitar Cita',
    documentos: 'Documentos Requeridos',
    docSub: 'Prepare su trámite con anticipación',
    contacto: 'Contacto',
    nombre: 'Nombre completo',
    tel: 'Teléfono',
    email: 'Correo electrónico',
    servicio: 'Servicio de interés',
    mensaje: 'Mensaje o consulta',
    enviar: 'Enviar Solicitud',
    enviando: 'Enviando...',
    gracias: '¡Gracias!',
    graciasSub: 'Hemos recibido su solicitud. Le contactaremos a la brevedad.',
    horario: 'Horario de Atención',
    ubicacion: 'Ubicación',
    install: 'Instalar App',
    footer: 'Todos los derechos reservados',
    madeWith: 'Hecho con',
    by: 'por',
  },
  en: {
    nav: 'Home',
    hero: 'Trusted Notarial Services',
    heroSub: 'Over [X] years providing legal certainty to our clients',
    servicios: 'Our Services',
    cita: 'Schedule Appointment',
    citaSub: 'Need advice? Schedule your appointment with us',
    citaBtn: 'Request Appointment',
    documentos: 'Required Documents',
    docSub: 'Prepare your paperwork in advance',
    contacto: 'Contact',
    nombre: 'Full name',
    tel: 'Phone',
    email: 'Email',
    servicio: 'Service of interest',
    mensaje: 'Message or inquiry',
    enviar: 'Send Request',
    enviando: 'Sending...',
    gracias: 'Thank you!',
    graciasSub: 'We have received your request. We will contact you shortly.',
    horario: 'Business Hours',
    ubicacion: 'Location',
    install: 'Install App',
    footer: 'All rights reserved',
    madeWith: 'Made with',
    by: 'by',
  }
}

export default function HomePage() {
  const [lang, setLang] = useState('es')
  const [status, setStatus] = useState('idle')
  const [showInstall, setShowInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '', telefono: '', email: '', servicio: '', mensaje: ''
  })

  const t = TEXTS[lang]

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); setShowInstall(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setShowInstall(false)
    setDeferredPrompt(null)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang, timestamp: new Date().toISOString() })
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-notaria-cream">
        <div className="text-center fade-in">
          <div className="text-6xl mb-6 text-green-500">✓</div>
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t.gracias}</h1>
          <p className="text-gray-600 mb-8">{t.graciasSub}</p>
          <button onClick={() => setStatus('idle')} className="btn-primary">← {t.nav}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-notaria-navy/95 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-white font-bold">{CONFIG.nombre}</div>
          <div className="flex items-center gap-3">
            {showInstall && <button onClick={handleInstall} className="install-btn">📲 {t.install}</button>}
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>🇲🇽</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>🇺🇸</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient text-white pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-notaria-gold font-semibold mb-2">{CONFIG.nombre} {CONFIG.numero}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in" style={{ fontFamily: 'Playfair Display, serif' }}>{t.hero}</h1>
          <p className="text-xl text-gray-300 mb-2">{CONFIG.titular}</p>
          <p className="text-gray-400 mb-8">{t.heroSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contacto" className="btn-primary">{t.citaBtn}</a>
            <a href="#servicios" className="btn-secondary">{t.servicios}</a>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 px-4 bg-notaria-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>{t.servicios}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICIOS.map((s, i) => (
              <div key={s.id} className="service-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{s.nombre[lang]}</h3>
                <p className="text-gray-600 text-sm">{s.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t.cita}</h2>
          <p className="text-gray-600 text-center mb-12">{t.citaSub}</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="form-label">{t.nombre} *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{t.tel} *</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required className="form-input" />
                </div>
                <div>
                  <label className="form-label">{t.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">{t.servicio} *</label>
                <select name="servicio" value={formData.servicio} onChange={handleChange} required className="form-input">
                  <option value="">--</option>
                  {SERVICIOS.map(s => <option key={s.id} value={s.nombre.es}>{s.nombre[lang]}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">{t.mensaje}</label>
                <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} rows="3" className="form-input" />
              </div>
              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
                {status === 'submitting' ? t.enviando : t.enviar}
              </button>
            </form>

            {/* Info */}
            <div className="space-y-6">
              <div className="contact-card">
                <div className="text-3xl">📍</div>
                <div>
                  <p className="font-bold">{t.ubicacion}</p>
                  <p className="text-gray-600 text-sm">{CONFIG.direccion}</p>
                  <p className="text-gray-600 text-sm">{CONFIG.ciudad}</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="text-3xl">🕐</div>
                <div>
                  <p className="font-bold">{t.horario}</p>
                  <p className="text-gray-600 text-sm">{CONFIG.horario}</p>
                </div>
              </div>
              <div className="contact-card">
                <div className="text-3xl">📞</div>
                <div>
                  <p className="font-bold">{t.tel}</p>
                  <p className="text-gray-600 text-sm">{CONFIG.telefono}</p>
                </div>
              </div>
              <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noopener" className="contact-card hover:border-green-500 border-2 border-transparent">
                <div className="text-3xl">💬</div>
                <div>
                  <p className="font-bold text-green-600">WhatsApp</p>
                  <p className="text-gray-600 text-sm">Enviar mensaje directo</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-notaria-navy text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-bold mb-2">{CONFIG.nombre} {CONFIG.numero}</p>
          <p className="text-gray-400 text-sm mb-2">{CONFIG.titular}</p>
          <p className="text-gray-500 text-xs mb-4">© {new Date().getFullYear()} {t.footer}</p>
          <p className="text-gray-600 text-xs">{t.madeWith} ❤️ {t.by} <span className="text-notaria-gold">C0</span> — Colmena 2026</p>
        </div>
      </footer>
    </div>
  )
}
