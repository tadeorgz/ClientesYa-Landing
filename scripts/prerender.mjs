import fs from 'node:fs'
import { loadEnv } from 'vite'
import { render } from '../.ssr/entry-server.js'

const settings = loadEnv('production', process.cwd(), 'VITE_')
let siteUrl = settings.VITE_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
if (siteUrl && !siteUrl.startsWith('https://')) siteUrl = `https://${siteUrl}`
if (siteUrl) siteUrl = new URL(siteUrl).origin
let html = fs.readFileSync('dist/index.html', 'utf8')
for (const asset of ['clientesya-symbol.svg', 'image.png']) fs.copyFileSync(`public/${asset}`, `dist/${asset}`)
fs.cpSync('public/showcase', 'dist/showcase', { recursive: true })
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
if (siteUrl) {
  const metadata = `<link rel="canonical" href="${siteUrl}/" /><meta property="og:url" content="${siteUrl}/" /><meta property="og:image" content="${siteUrl}/image.png" /><meta name="twitter:image" content="${siteUrl}/image.png" />`
  html = html.replace('</head>', `${metadata}</head>`)
  fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}/</loc></url></urlset>`)
}
const schema = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'ClientesYa', description: 'Diseño web a medida y menús digitales QR para empresas en Uruguay. Consultas por WhatsApp.', areaServed: { '@type': 'Country', name: 'Uruguay' }, email: 'clientesya.uy@gmail.com', telephone: '+59894984842', ...(siteUrl ? { url: siteUrl } : {}) }
html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script></head>`)
fs.writeFileSync('dist/index.html', html)
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`)
console.log('Prerendered landing content, structured data and robots.txt.' + (siteUrl ? ' Canonical and sitemap generated.' : ' Set VITE_PUBLIC_SITE_URL when the domain is ready.'))
