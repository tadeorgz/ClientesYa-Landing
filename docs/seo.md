# SEO, Google y vista previa

## Qué está preparado

- Dominio principal confirmado: `https://clientesya.uy/`. Canonical, Open Graph, sitemap y datos estructurados usan ese mismo origen; `VITE_PUBLIC_SITE_URL` permite cambiarlo explícitamente. No se usa una dirección temporal de Vercel como identidad principal.
- Título y descripción describen diseño web en Uruguay, landings, catálogos y menús digitales QR. El contenido principal está prerenderizado para leerlo sin ejecutar React.
- Datos estructurados de `Organization`, `WebSite` y `WebPage`: nombre, logo, contacto, redes reales, idioma y servicios. Sin direcciones, opiniones ni cifras de resultados inventadas.
- Iconos PNG de 96, 180 y 512 px, además del símbolo SVG.
- `robots.txt` permite rastrear el sitio y referencia `https://clientesya.uy/sitemap.xml`. El sitemap contiene únicamente la página real; las anclas de sección no son páginas independientes.
- Tarjeta social: `public/clientesya-social.png`, 1200 × 630. Incluye el nuevo logo, mensaje y dominio, y se comparte por Open Graph y Twitter Cards. Fuente editable: `scripts/social-card.html`, renderizada a esas dimensiones.
- El script que aplica el tema antes de mostrar la página es externo, compatible con la política de seguridad de Vercel.

## Después de publicar

1. Comprobar que `https://clientesya.uy/` responde con la landing y certificado HTTPS válido. Si se usa `www`, configurar su redirección permanente al dominio principal en Vercel y comprobar la configuración DNS.
2. Abrir [Google Search Console](https://search.google.com/search-console), agregar la propiedad de dominio `clientesya.uy` y verificarla con el registro TXT que indique Google. El registro debe configurarse en el proveedor DNS; no se inventa un token de verificación en el HTML.
3. En **Sitemaps**, enviar `https://clientesya.uy/sitemap.xml`. En **Inspección de URLs**, inspeccionar `https://clientesya.uy/`, ejecutar la prueba publicada y solicitar indexación.
4. Comprobar los datos estructurados con [Schema Markup Validator](https://validator.schema.org/) y las funciones compatibles con la [prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results). Estos datos no garantizan un resultado enriquecido.
5. Para refrescar una vista previa antigua, volver a rastrear la URL en [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/). WhatsApp y otras plataformas mantienen cachés propias y pueden demorar en reflejar un cambio.
6. Revisar **Indexación**, **Rendimiento** y **Métricas web principales** en Search Console cuando haya datos. Un mejor marcado facilita la interpretación del sitio; no garantiza una posición específica.

No se enviaron solicitudes de indexación ni se modificaron cuentas, DNS o configuración de producción en esta tarea.

## Verificación local

`npm run build`, `npm run lint` y `npm test`: 17 pruebas. Las comprobaciones nuevas cubren sitemap y canonical coherentes, recursos sociales reales con tamaño correcto, datos estructurados enlazados y ausencia de scripts ejecutables inline bloqueados por CSP.

La versión compilada se comprobó en navegador con `script-src 'self'`: tema persistido aplicado, cero errores de seguridad o JavaScript, y los siete recursos de SEO accesibles. El servidor temporal de prueba se cierra al terminar; el puerto 4173 permanece cerrado.

## Referencias

- [Títulos en Google](https://developers.google.com/search/docs/appearance/title-link)
- [Descripciones de resultados](https://developers.google.com/search/docs/appearance/snippet)
- [Nombre del sitio](https://developers.google.com/search/docs/appearance/site-names)
- [Datos de organizaciones](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Iconos en Google](https://developers.google.com/search/docs/appearance/favicon-in-search/)
- [Open Graph](https://ogp.me/)
