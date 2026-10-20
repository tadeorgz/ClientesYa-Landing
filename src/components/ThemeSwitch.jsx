import { createElement, useSyncExternalStore } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

const key = 'cy-theme'
let sessionTheme = 'system'
const options = [['system', 'Sistema', Monitor], ['light', 'Claro', Sun], ['dark', 'Oscuro', Moon]]
function getTheme() {
  try { const saved = localStorage.getItem(key); return ['light', 'dark', 'system'].includes(saved) ? saved : sessionTheme } catch { return sessionTheme }
}
function subscribe(callback) {
  const update = () => { document.documentElement.dataset.theme = getTheme(); callback() }
  window.addEventListener('storage', update)
  window.addEventListener('cy-theme-change', update)
  return () => { window.removeEventListener('storage', update); window.removeEventListener('cy-theme-change', update) }
}
function choose(value) {
  sessionTheme = value
  try { localStorage.setItem(key, value) } catch { /* Keep the choice for this session. */ }
  document.documentElement.dataset.theme = value
  window.dispatchEvent(new Event('cy-theme-change'))
}
export default function ThemeSwitch() {
  const choice = useSyncExternalStore(subscribe, getTheme, () => 'system')
  return <div className="theme-switch" role="group" aria-label="Tema de la página">{options.map(([value, label, icon]) => <button key={value} type="button" aria-label={`Tema ${label.toLowerCase()}`} title={label} aria-pressed={choice === value} onClick={() => choose(value)}>{createElement(icon, { size: 15 })}<span className="sr-only">{label}</span></button>)}</div>
}
