export const consentVersion = '2026-10-19'
export const eventNames = ['page_view', 'whatsapp_click', 'demo_click', 'form_saved']
export const eventSources = ['page', 'hero', 'navigation', 'landing', 'catalog', 'menu', 'menu-managed', 'menu-self', 'custom', 'contact', 'floating', 'other', ...Array.from({ length: 8 }, (_, i) => `demo-${i + 1}`), 'canaritas', 'renis', 'martinos']

export function validContact(value) {
  return typeof value === 'string' && value.length <= 160 && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || (/^[+()\d\s.-]+$/.test(value.trim()) && value.replace(/\D/g, '').length >= 8 && value.replace(/\D/g, '').length <= 15))
}

export function validateInquiry(data) {
  if (!data || data.consent !== true || !validContact(data.contact)) return false
  return [['name', 2, 100], ['business', 2, 160], ['project', 10, 2000]].every(([key, min, max]) => typeof data[key] === 'string' && data[key].trim().length >= min && data[key].trim().length <= max && !Array.from(data[key]).some(char => char.charCodeAt(0) < 9))
}

export function inquiryMessage(data) {
  return `Hola ClientesYa, quiero un presupuesto personalizado.\nMi nombre: ${data.name.trim()}\nMi negocio: ${data.business.trim()}\nMi contacto: ${data.contact.trim()}\nMi proyecto: ${data.project.trim()}`
}
