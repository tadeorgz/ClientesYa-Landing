import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('production HTML includes readable Spanish and all menu demos without running JavaScript', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  assert(html.includes('Tu próximo cliente está a un'), 'Hero must preserve UTF-8 accents in prerendered HTML')
  for (const url of ['https://canaritas.vercel.app/', 'https://renis-burger.vercel.app/', 'https://martinos-uy.vercel.app/']) assert(html.includes(url), `Missing menu demo: ${url}`)
  assert(html.includes('application/ld+json'))
  assert(!html.includes('cdn.tailwindcss.com'), 'Production must use compiled styles')
  assert(!fs.readdirSync('dist').some(file => file.endsWith('.mp4')), 'Unused videos must stay out of build')
})
