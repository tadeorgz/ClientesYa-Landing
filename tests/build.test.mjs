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

test('search crawlers receive a canonical URL and a real sitemap reference', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  const robots = fs.readFileSync('dist/robots.txt', 'utf8')
  assert(!robots.includes('\\n'), 'robots.txt must contain real line breaks')
  assert.match(robots, /^User-agent: \*\nAllow: \/\nDisallow: \/api\/\nSitemap: https:\/\/.+\/sitemap\.xml\n$/)
  const canonical = html.match(/rel="canonical" href="([^\"]+)"/)[1]
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
  assert(sitemap.includes(`<loc>${canonical}</loc>`))
  assert(html.includes(`property="og:url" content="${canonical}"`))
})

test('sharing previews have complete image metadata and deployable image files', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  const image = html.match(/property="og:image" content="([^\"]+)"/)
  assert(image, 'Open Graph must have an image even without environment overrides')
  assert(image[1].startsWith('https://'))
  assert(html.includes(`name="twitter:image" content="${image[1]}"`))
  for (const [property, value] of [['og:image:width', '1200'], ['og:image:height', '630'], ['og:image:type', 'image/png']]) assert(html.includes(`property="${property}" content="${value}"`))
  assert.match(html, /property="og:image:alt" content="[^\"]+"/)
  const png = fs.readFileSync(`dist${new URL(image[1]).pathname}`)
  assert.equal(png.readUInt32BE(16), 1200)
  assert.equal(png.readUInt32BE(20), 630)
  assert(fs.existsSync('dist/favicon-96.png'))
  assert(fs.existsSync('dist/apple-touch-icon.png'))
})

test('structured data identifies the business, website and page consistently', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
  assert(Array.isArray(schema['@graph']))
  const organization = schema['@graph'].find(node => node['@type'] === 'Organization')
  const website = schema['@graph'].find(node => node['@type'] === 'WebSite')
  const webpage = schema['@graph'].find(node => node['@type'] === 'WebPage')
  assert.equal(organization.name, 'ClientesYa')
  assert.equal(website.publisher['@id'], organization['@id'])
  assert.equal(webpage.isPartOf['@id'], website['@id'])
  assert.equal(webpage.inLanguage, 'es-UY')
  assert.equal(organization.sameAs.length, 2)
})

test('early theme initialization is compatible with production script policy', () => {
  const html = fs.readFileSync('dist/index.html', 'utf8')
  assert(!/<script(?![^>]*type="application\/ld\+json")(?![^>]*src=)[^>]*>/.test(html), 'Executable inline scripts are blocked by production CSP')
  assert(html.includes('src="/theme-init.js"'))
  assert(fs.existsSync('dist/theme-init.js'))
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
