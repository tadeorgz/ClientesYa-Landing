import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('production HTML includes readable Spanish and all menu demos without running JavaScript', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  assert(html.replaceAll(/<[^>]+>/g, ' ').replaceAll(/\s+/g, ' ').includes('Tu próximo cliente está a un'), 'Hero must preserve UTF-8 accents in prerendered HTML')
  for (const url of ['https://canaritas.vercel.app/', 'https://renis-burger.vercel.app/', 'https://martinos-uy.vercel.app/']) assert(html.includes(url), `Missing menu demo: ${url}`)
  assert(html.includes('application/ld+json'))
  assert(!html.includes('cdn.tailwindcss.com'), 'Production must use compiled styles')
  assert(!fs.readdirSync('dist').some(file => file.endsWith('.mp4')), 'Unused videos must stay out of build')
})

test('prerendered page has working local images, complete navigation and the theme controls', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  for (const [, src] of html.matchAll(/<img[^>]+src="([^\"]+)"/g)) {
    assert(src.startsWith('/'), `Showcase assets must be local: ${src}`)
    assert(fs.existsSync(`dist${src}`), `Missing production image: ${src}`)
  }
  const ids = [...html.matchAll(/\sid="([^\"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, ids.length, 'IDs must be unique')
  for (const [, target] of html.matchAll(/href="#([^\"]+)"/g)) assert(ids.includes(target), `Broken section link: ${target}`)
  for (const label of ['Tema sistema', 'Tema claro', 'Tema oscuro']) assert(html.includes(label), `Missing accessible control: ${label}`)
  assert(fs.existsSync('dist/clientesya-symbol.svg'))
  assert(!html.includes('zonamuebles-preview.webp'), 'The real project must render as HTML, not a screenshot')
})
