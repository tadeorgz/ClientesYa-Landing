import { useRef, useState } from 'react'
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { createWhatsAppLink } from '../utils/whatsapp'
import { inquiryMessage, validContact, validateInquiry } from '../utils/inquiry'
import { recordEvent } from '../utils/analytics'

export default function ContactForm() {
  const formRef = useRef(null)
  const requestId = useRef(null)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const busy = status === 'saving'

  const changed = () => {
    if (busy) return
    requestId.current = null
    setWhatsapp('')
    setStatus('idle')
    setMessage('')
  }

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    const form = formRef.current
    form.elements.contact.setCustomValidity('')
    if (!validContact(form.elements.contact.value)) {
      form.elements.contact.setCustomValidity('Ingresá un email o teléfono válido.')
      form.reportValidity()
      return
    }
    const data = Object.fromEntries(new FormData(form))
    data.consent = form.elements.consent.checked
    if (!validateInquiry(data)) { setMessage('Revisá los campos y aceptá el uso de tus datos para esta consulta.'); return }
    if (!requestId.current) requestId.current = crypto.randomUUID()
    data.id = requestId.current
    const href = createWhatsAppLink(siteConfig.whatsappNumber, inquiryMessage(data))
    setStatus('saving')
    setMessage('Preparando tu consulta…')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: AbortSignal.timeout(15000) })
      const result = await response.json()
      if (!response.ok || result.saved !== true) throw new Error('Not saved')
      setStatus('saved')
      setMessage(result.emailSent ? 'Guardamos tu consulta y enviamos el aviso a nuestro correo. Si preferís, seguí por WhatsApp.' : 'Tu consulta quedó guardada. También podés seguir por WhatsApp.')
      recordEvent('form_saved', 'custom')
    } catch {
      setStatus('error')
      setMessage('No pudimos confirmar el guardado. Tu mensaje está preparado: podés continuar por WhatsApp o reintentar.')
    }
    setWhatsapp(href)
  }

  return <form ref={formRef} onSubmit={submit} onChange={changed} className="inquiry-form" aria-busy={busy}>
    <p className="eyebrow">TU PROYECTO, A MEDIDA</p>
    <div className="grid gap-5 sm:grid-cols-2"><label htmlFor="inquiry-name">Tu nombre<input id="inquiry-name" name="name" autoComplete="name" required minLength={2} maxLength={100} disabled={busy} placeholder="¿Cómo te llamás?" /></label><label htmlFor="inquiry-business">Tu negocio<input id="inquiry-business" name="business" autoComplete="organization" required minLength={2} maxLength={160} disabled={busy} placeholder="Nombre de tu negocio" /></label></div>
    <label htmlFor="inquiry-contact">Email o teléfono<input id="inquiry-contact" name="contact" required maxLength={160} disabled={busy} placeholder="¿Dónde te podemos responder?" onInput={event => event.target.setCustomValidity('')} /></label>
    <label htmlFor="inquiry-project">Contanos tu idea<textarea id="inquiry-project" name="project" rows={4} required minLength={10} maxLength={2000} disabled={busy} placeholder="¿Qué ofrecés y qué te gustaría lograr con tu web?" /></label>
    <div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Dejá este campo vacío<input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="consent-label" htmlFor="inquiry-consent"><input id="inquiry-consent" name="consent" type="checkbox" required disabled={busy} /><span>Acepto que ClientesYa use estos datos para responder a mi consulta. <a href="#privacidad" className="underline">Ver privacidad</a>.</span></label>
    <button type="submit" className="primary-button w-full" disabled={busy || status === 'saved'}>{busy ? <LoaderCircle className="animate-spin" size={18} /> : <Send size={18} />}{busy ? 'Preparando…' : status === 'saved' ? 'Consulta guardada' : status === 'error' ? 'Reintentar guardado' : 'Preparar mi consulta'}</button>
    <p role="status" aria-live="polite" className={`form-status ${status === 'error' ? 'form-status-error' : ''}`}>{message}</p>
    {whatsapp && <a id="form-whatsapp" href={whatsapp} data-source="custom" target="_blank" rel="noopener noreferrer" className="primary-button w-full">Continuar por WhatsApp <ArrowUpRight size={18} /></a>}
    <p className="text-xs text-cy-text-sec leading-relaxed">Vos elegís cuándo enviar el mensaje desde WhatsApp. ¿Preferís ir directo? <a className="text-cy-lime underline" id="form-direct-whatsapp" href={createWhatsAppLink(siteConfig.whatsappNumber, siteConfig.defaultWhatsAppMessage)} target="_blank" rel="noopener noreferrer">Abrí el chat sin completar el formulario.</a></p>
  </form>
}
