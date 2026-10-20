import fs from 'node:fs'
import { loadEnv } from 'vite'
import { render } from '../.ssr/entry-server.js'

const settings = loadEnv('production', process.cwd(), 'VITE_')
const defaultOrigin = 'https://clientesya.uy'
let siteUrl = settings.VITE_PUBLIC_SITE_URL || defaultOrigin
if (!siteUrl.includes('://')) siteUrl = `https://${siteUrl}`
const parsedUrl = new URL(siteUrl)
if (parsedUrl.protocol !== 'https:' || parsedUrl.username || parsedUrl.password) throw new Error('VITE_PUBLIC_SITE_URL must be a public HTTPS origin without credentials.')
siteUrl = parsedUrl.origin
let html = fs.readFileSync('dist/index.html', 'utf8')
for (const asset of ['clientesya-symbol.svg', 'clientesya-social.png', 'logo-512.png', 'favicon-96.png', 'apple-touch-icon.png', 'theme-init.js']) fs.copyFileSync(`public/${asset}`, `dist/${asset}`)
fs.cpSync('public/showcase', 'dist/showcase', { recursive: true })
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
html = html.replaceAll(defaultOrigin, siteUrl)
const organizationId = `${siteUrl}/#organization`
const websiteId = `${siteUrl}/#website`
const description = 'Diseño y desarrollo web a medida en Uruguay. Landings, catálogos con WhatsApp y menús digitales QR para negocios uruguayos.'
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': organizationId, name: 'ClientesYa', url: `${siteUrl}/`, description,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo-512.png`, width: 512, height: 512 },
      email: 'clientesya.uy@gmail.com', telephone: '+59894984842',
      areaServed: { '@type': 'Country', name: 'Uruguay' },
      sameAs: ['https://instagram.com/clientesya_', 'https://tiktok.com/@clientesya'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+59894984842', email: 'clientesya.uy@gmail.com', availableLanguage: ['es'], areaServed: 'UY' },
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Diseño y desarrollo web', itemListElement: ['Landing pages a medida', 'Catálogos con WhatsApp', 'Menús digitales QR'].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'Uruguay' } } })) },
    },
    { '@type': 'WebSite', '@id': websiteId, name: 'ClientesYa', alternateName: 'Clientes Ya', url: `${siteUrl}/`, inLanguage: 'es-UY', publisher: { '@id': organizationId } },
    { '@type': 'WebPage', '@id': `${siteUrl}/#webpage`, url: `${siteUrl}/`, name: 'Diseño web en Uruguay | Webs a medida · ClientesYa', description, inLanguage: 'es-UY', isPartOf: { '@id': websiteId }, about: { '@id': organizationId }, primaryImageOfPage: { '@type': 'ImageObject', url: `${siteUrl}/clientesya-social.png`, width: 1200, height: 630 } },
  ],
}
html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script></head>`)
fs.writeFileSync('dist/index.html', html)
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>\n`)
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`Prerendered landing, structured data, social metadata, canonical and sitemap for ${siteUrl}/`)
