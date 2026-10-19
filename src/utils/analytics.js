import { eventSources } from './inquiry'

let sessionChoice = null
export function getAnalyticsChoice() {
  try { return localStorage.getItem('cy-analytics-consent') || sessionChoice } catch { return sessionChoice }
}
export function setAnalyticsChoice(value) {
  sessionChoice = value
  try { localStorage.setItem('cy-analytics-consent', value) } catch { /* Session preference works without storage. */ }
  window.dispatchEvent(new Event('cy-consent-update'))
}

export function analyticsAllowed() {
  if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) return false
  return getAnalyticsChoice() === 'accepted'
}

export function recordEvent(event, source) {
  if (!analyticsAllowed() || !eventSources.includes(source)) return
  const body = JSON.stringify({ event, source, consent: true })
  void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
}

const sourceById = {
  'hero-cta-primary': 'hero', 'nav-whatsapp': 'navigation', 'mobile-whatsapp': 'navigation',
  'cta-service-landing': 'landing', 'cta-service-catalog': 'catalog', 'cta-service-menu': 'menu',
  'cta-menu-demanda': 'menu-managed', 'cta-menu-auto': 'menu-self', 'btn-pricing-custom': 'custom',
  'contact-direct-wa': 'contact', 'floating-whatsapp': 'floating',
  'form-direct-whatsapp': 'contact', 'form-whatsapp': 'custom',
  'pricing-landing-whatsapp': 'landing',
}

export function handleTrackedClick(event) {
  const anchor = event.target.closest?.('a')
  if (!anchor) return
  const source = anchor.dataset.source || sourceById[anchor.id] || (anchor.id.startsWith('demo-link-') ? anchor.id.replace('demo-link-', 'demo-') : anchor.id.startsWith('demo-inquiry-') ? anchor.id.replace('demo-inquiry-', 'demo-') : anchor.id.startsWith('demo-') ? anchor.id.replace('demo-', '') : 'other')
  if (anchor.href.startsWith('https://wa.me/')) recordEvent('whatsapp_click', source)
  else if (anchor.id.startsWith('demo-') || anchor.dataset.source) recordEvent('demo_click', source)
}
