import { createHash } from 'node:crypto'
import { consentVersion, eventNames, eventSources, validateInquiry } from '../src/utils/inquiry.js'

function handler(kind, { env = process.env, fetchImpl = fetch } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Método no permitido.' })
    }
    const origin = req.headers.origin
    const allowed = env.ALLOWED_ORIGIN ? env.ALLOWED_ORIGIN.replace(/\/$/, '') : null
    try {
      if (!origin || (allowed ? origin !== allowed : new URL(origin).host !== req.headers.host)) return res.status(403).json({ error: 'Origen no permitido.' })
    } catch { return res.status(403).json({ error: 'Origen no permitido.' }) }
    if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({ error: 'Se requiere JSON.' })
    let data
    try {
      if (Number(req.headers['content-length'] || 0) > 8192) throw new Error('Large body')
      data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (Buffer.byteLength(JSON.stringify(data || {})) > 8192) throw new Error('Large body')
    } catch { return res.status(400).json({ error: 'Solicitud inválida.' }) }
    let payload
    if (kind === 'contact') {
      if (!validateInquiry(data) || !/^[a-f0-9-]{36}$/i.test(data.id || '') || data.website) return res.status(400).json({ error: 'Revisá tus datos y el consentimiento.' })
      payload = { kind, id: data.id, name: data.name.trim(), business: data.business.trim(), contact: data.contact.trim(), project: data.project.trim(), consentVersion, createdAt: new Date().toISOString() }
    } else {
      if (!data || data.consent !== true || !eventNames.includes(data.event) || !eventSources.includes(data.source)) return res.status(400).json({ error: 'Evento inválido.' })
      payload = { kind, event: data.event, source: data.source }
    }
    if (!env.GOOGLE_SCRIPT_URL || !env.GOOGLE_SCRIPT_SECRET) return res.status(503).json({ error: 'El guardado no está disponible. Podés continuar por WhatsApp.' })
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(env.GOOGLE_SCRIPT_URL)) return res.status(503).json({ error: 'Servicio no disponible.' })
    const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0]
    payload.rateKey = createHash('sha256').update(`${ip}|${new Date().toISOString().slice(0, 10)}|${env.GOOGLE_SCRIPT_SECRET}`).digest('hex')
    try {
      const upstream = await fetchImpl(env.GOOGLE_SCRIPT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, secret: env.GOOGLE_SCRIPT_SECRET }), signal: AbortSignal.timeout(12000), redirect: 'follow' })
      if (!upstream.ok) throw new Error('Provider unavailable')
      const result = await upstream.json()
      if (result.status === 429) {
        res.setHeader('Retry-After', '600')
        return res.status(429).json({ error: 'Demasiadas solicitudes. Esperá unos minutos o escribinos por WhatsApp.' })
      }
      if (result.ok !== true || (kind === 'contact' && result.saved !== true)) throw new Error('Not confirmed')
      return res.status(kind === 'contact' ? 201 : 202).json(kind === 'contact' ? { saved: true, emailSent: result.emailSent === true } : { counted: true })
    } catch { return res.status(503).json({ error: 'No pudimos confirmar el guardado. Podés reintentar o seguir por WhatsApp.' }) }
  }
}

export const createContactHandler = options => handler('contact', options)
export const createEventsHandler = options => handler('event', options)
