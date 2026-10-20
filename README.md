# ClientesYa

Landing React + Vite para empresas uruguayas: diseño a medida, catálogos con WhatsApp y menús digitales QR. Identidad negro y lima con tema claro marfil, selector Sistema/Claro/Oscuro y composiciones HTML animadas con Framer Motion.

## Desarrollo

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Los enlaces de WhatsApp funcionan sin configuración adicional. Las rutas de contacto y eventos se sirven tanto en desarrollo como mediante funciones de Vercel. Sin conectar Google, el formulario informa que no pudo confirmar el guardado y permite continuar por WhatsApp.

## Comprobar y compilar

```powershell
npm test
npm run lint
npm run build
npm run preview
```

El build prerenderiza el contenido en `dist/index.html` y genera datos estructurados, `robots.txt`, canonical y `sitemap.xml` para `https://clientesya.uy/`. `VITE_PUBLIC_SITE_URL` permite cambiar el dominio principal. La tarjeta social PNG y los metadatos para compartir están disponibles sin ejecutar JavaScript.

Vercel: framework Vite, comando `npm run build`, carpeta `dist`. Las funciones de `api/` procesan consultas y eventos. El build copia solo los recursos que utiliza la nueva landing; los videos originales siguen en `public/` y no se incluyen en el sitio compilado.

## Medición y contactos sin servicios pagos

Se conserva Vercel Analytics para visitas con consentimiento. Los contadores de clics y las consultas pueden guardarse en una Google Sheet privada y generar un aviso a Gmail mediante Apps Script. No requiere Redis ni Resend. La cuenta Google necesita completar la autorización y publicación del script.

Seguí [la configuración de Google y Vercel](docs/google-setup.md). Los límites gratuitos de cada servicio aplican. El código no afirma guardado ni envío si el backend no confirma la recepción.

## Contenido y marca

- App principal: `src/App.jsx`; estilos semánticos para ambos temas: `src/index.css` y `tailwind.config.js`.
- Escenas HTML: `src/components/ShowcaseScenes.jsx`. Hero por capas y capítulo de ZonaMuebles ligado al scroll; móvil con flujo vertical y soporte de movimiento reducido.
- Logo vectorial trazado desde `logo-nuevo.png`: `public/clientesya-symbol.svg`. Fotos de los proyectos originales optimizadas en `public/showcase/`.
- Selector de tema: `src/components/ThemeSwitch.jsx`. Sistema por defecto y elección persistida en `cy-theme`; funciona durante la sesión si el navegador bloquea el almacenamiento.
- WhatsApp y redes: `src/config/siteConfig.js`.
- Demos de menús: `src/data/menuDemos.js`. Canaritas, Renis Burger y Martinos se presentan como muestras, no como clientes.
- Formulario: `src/components/ContactForm.jsx`; validación compartida: `src/utils/inquiry.js`.
- Funciones backend: `server/handlers.mjs` y `api/`.
- Código Google: `integrations/google/Code.gs`.

Landing desde USD 149 iniciales + USD 15/mes; dominio por un año e impuestos no incluidos. Menú con actualizaciones a pedido y menú autogestionable se cotizan por separado. Pagos online e integraciones se presupuestan como desarrollo personalizado.

## Configuración

`.env.example` enumera las variables. Las variables `VITE_` son públicas. `GOOGLE_SCRIPT_SECRET` y `GOOGLE_SCRIPT_URL` se configuran solo en el backend y nunca se agregan a archivos versionados. En producción, el origen de contacto `ALLOWED_ORIGIN` debe corresponder a `https://clientesya.uy`. Seguí [los pasos de SEO, Google y vista previa](docs/seo.md) después del despliegue.
