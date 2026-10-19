import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { analyticsAllowed, getAnalyticsChoice, recordEvent, setAnalyticsChoice } from '../utils/analytics'
export default function ConsentControls() {
  const choice = useSyncExternalStore(subscribeChoice, getAnalyticsChoice, () => null)
  const [open, setOpen] = useState(false)
  const counted = useRef(false)
  const allowed = choice === 'accepted' && analyticsAllowed()
  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener('cy-open-consent', reopen)
    return () => window.removeEventListener('cy-open-consent', reopen)
  }, [])
  useEffect(() => {
    if (allowed && !counted.current) { counted.current = true; recordEvent('page_view', 'page') }
  }, [allowed])
  const choose = value => {
    setAnalyticsChoice(value)
    setOpen(false)
  }
  return <>
    {allowed && <Analytics debug={false} beforeSend={event => { const url = new URL(event.url); url.search = ''; url.hash = ''; return { ...event, url: url.toString() } }} />}
    {(!choice || open) && <aside className="consent-panel" aria-label="Preferencias de medición"><p className="font-bold">Una web que mejora con vos.</p><p className="text-sm text-cy-text-sec leading-relaxed">Con tu permiso medimos visitas y clics para mejorar esta página. Podés rechazarlo y navegar igual. <a href="#privacidad" className="underline">Más información</a>.</p><div className="flex flex-wrap gap-2 mt-4"><button type="button" onClick={() => choose('rejected')} className="secondary-button">Rechazar</button><button type="button" onClick={() => choose('accepted')} className="primary-button">Aceptar medición</button></div></aside>}
  </>
}

function subscribeChoice(callback) {
  window.addEventListener('storage', callback)
  window.addEventListener('cy-consent-update', callback)
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('cy-consent-update', callback) }
}
