# Reforma UI/UX de ClientesYa

## Implementación

- La página activa sigue siendo `src/App.jsx`. Los componentes históricos modificados previamente por el usuario se conservaron.
- Nuevo símbolo SVG trazado desde `logo-nuevo.png`, sin fondo y adaptado por tema. Header, footer y favicon actualizados.
- Claro: marfil `#F7F8F2`, blanco, texto `#182016`, verde `#426523`, lima `#C6FA5F`. Oscuro: negro `#090B09`, paneles `#121510`, texto `#F2F3ED` y lima.
- Selector Sistema/Claro/Oscuro en el header, también en móvil. Inicialización antes del primer pintado y preferencia persistente. El modo Sistema responde mediante CSS a cambios del dispositivo.
- Hero con composición de escritorio y móvil por capas ligadas al scroll. ZonaMuebles tiene una escena HTML que recorre portada y catálogo durante un capítulo con posición sticky en escritorio.
- Canaritas, Renis Burger y Martinos tienen composiciones HTML propias y fotografías locales. Se presentan como demos. ZonaMuebles es el único caso real.
- Galería secundaria con las ocho demos existentes. Enlaces independientes para abrir las experiencias completas.
- Fotos optimizadas: seis archivos, 291.936 bytes en total. El build copia solo esos recursos, el símbolo y la imagen social; no incluye videos ni la antigua captura larga.
- Contenido orientado a desarrollo a medida, con planes destacados y las condiciones originales de USD 149 iniciales + USD 15/mes. Menús e integraciones a cotizar.
- Contacto, consentimiento y backend existentes conservados. La política informa que se guardan las preferencias de medición y de tema.

## Verificaciones

- Build cliente, SSR y prerenderizado completados; lint sin errores.
- Trece pruebas automatizadas: validación y backend existentes, recursos de producción, enlaces internos, IDs únicos, demos y controles de tema presentes sin ejecutar JavaScript.
- Navegador: tema oscuro persistente al recargar; Sistema cambia entre fondos claro y oscuro al emular la preferencia del dispositivo; la elección manual prevalece.
- Anchos de 360, 390, 768, 1024 y 1440 px: sin desborde horizontal.
- Menú móvil abre, navega a menús QR y se cierra.
- Transformación del hero cambia al hacer scroll. ZonaMuebles usa sticky en escritorio y flujo normal con movimiento reducido.
- Formulario: rechaza contacto inválido; una respuesta de error simulada muestra guardado no confirmado y un enlace de WhatsApp con contexto. No se enviaron consultas reales.
- Versión compilada en navegador: cero errores de JavaScript, nueve imágenes cargadas, enlaces comerciales al número correcto y contenido prerenderizado visible sin JavaScript. El selector también funciona con almacenamiento bloqueado.

## Herramientas y límites

El instalador de 12ui falló en Windows con `spawn EINVAL`. La implementación se realizó directamente sobre la dirección acordada y se revisó visualmente con Playwright. Las capturas de verificación están en `output/playwright/`, excluidas de Git.

No se publicó una nueva versión. El dominio y la conexión del backend con Google mantienen sus pendientes documentados en `google-setup.md`.
