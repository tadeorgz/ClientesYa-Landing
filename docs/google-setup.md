# Guardado de consultas y clics sin suscripción paga

La landing utiliza Vercel Analytics para visitas. Los clics personalizados se cuentan en una Google Sheet privada mediante Apps Script; los eventos personalizados de Vercel requieren Pro o Enterprise, por lo que esta implementación no los utiliza. Los eventos adicionales y Vercel Analytics se activan solamente cuando el visitante acepta la medición.

El formulario guarda nombre, negocio, email o teléfono, proyecto, fecha y versión de consentimiento. Luego intenta enviar un aviso a `clientesya.uy@gmail.com`. Si el email falla o se agota la cuota, la consulta permanece en la planilla.

Esta integración no exige contratar Redis, Resend ni otros servicios. Google aplica cuotas de ejecución y envío: en cuentas personales, la documentación publica 100 destinatarios de email por día. No se promete capacidad ilimitada. Consultar [cuotas actuales de Google](https://developers.google.com/apps-script/guides/services/quotas) y [eventos personalizados de Vercel](https://vercel.com/docs/analytics/quickstart).

## Conectar tu cuenta de Google

1. Desde la cuenta que administrará las consultas, creá una planilla privada llamada `ClientesYa — Consultas y métricas`.
2. Abrí **Extensiones → Apps Script**.
3. Reemplazá el código inicial por el contenido completo de [Code.gs](../integrations/google/Code.gs).
4. Guardá y ejecutá `setup` una sola vez. Google te solicitará autorizar acceso a tu planilla y envío de email. Estas autorizaciones se realizan en tu cuenta; el repositorio no tiene acceso a tu Gmail.
5. En **Configuración del proyecto → Propiedades de la secuencia de comandos**, comprobá `SPREADSHEET_ID`, `NOTIFY_EMAIL` y `API_SECRET`. `setup` los crea automáticamente. Copiá el valor de `API_SECRET` únicamente a la configuración privada de Vercel.
6. Elegí **Implementar → Nueva implementación → Aplicación web**. Ejecutar como: **tu cuenta**. Acceso: **Cualquier usuario**. La URL será pública pero el código rechaza peticiones sin el secreto compartido. La planilla sigue privada: no la publiques ni compartas el secreto con visitantes.
7. Copiá la URL terminada en `/exec`.
8. En Vercel → proyecto → Settings → Environment Variables, agregá:

| Variable | Valor |
| --- | --- |
| `GOOGLE_SCRIPT_URL` | URL completa de la implementación `/exec` |
| `GOOGLE_SCRIPT_SECRET` | Valor de `API_SECRET` |
| `ALLOWED_ORIGIN` | Origen público exacto, por ejemplo `https://tu-proyecto.vercel.app`; sin barra final |
| `VITE_PUBLIC_SITE_URL` | La misma dirección pública; luego cambiarla por el dominio definitivo |

9. Volvé a desplegar la landing para aplicar las variables.

Los valores `GOOGLE_SCRIPT_*` nunca llevan el prefijo `VITE_`. El navegador solo se comunica con `/api/contact` y `/api/events`; el backend agrega el secreto al hablar con Google.

## Verificar la conexión

En la web desplegada, completá una consulta real de prueba y aceptá el uso de datos. Debe aparecer **Consulta guardada**, una fila en `Contactos` y, si Google admite el envío, un aviso en Gmail. El enlace de WhatsApp incluye el nombre, negocio, contacto y proyecto; abrirlo no envía el mensaje por sí solo.

Aceptá la medición y hacé clic una vez en un CTA. En `Metricas` aparecerán fecha, evento, origen y cantidad. Por ejemplo: `whatsapp_click`, `hero`, `1`. No se guarda el contenido del formulario en los contadores.

Si aparece **No pudimos confirmar el guardado**, no se afirma que los datos estén guardados. Podés reintentar con el mismo ID o continuar por WhatsApp. Comprobá las variables de Vercel, la implementación de Apps Script y sus permisos. Al modificar Apps Script, actualizá la implementación existente para publicar la nueva versión.

## Consulta y eliminación

- `Contactos`: consultas recibidas y estado del aviso por email. Los IDs previenen filas y correos duplicados al reintentar.
- `Metricas`: contadores diarios por evento y origen; no son usuarios únicos ni ventas.
- `cleanup`: un disparador diario creado por `setup` elimina contactos después de 90 días y contadores después de 180 días. La retención aplica a la planilla; los avisos que llegan a Gmail se administran desde esa cuenta.
- Podés borrar manualmente una fila al atender una solicitud de eliminación. No compartas la planilla públicamente.
- El límite por origen de red reduce spam; no equivale a identificación exacta de una persona. Apps Script utiliza CacheService como límite aproximado; las cuotas de Google siguen aplicando.

## Estado al entregar el código

El código y las pruebas están preparados. El guardado y el envío real no están activados hasta completar la conexión de tu cuenta. No se crearon cuentas ni se contrataron servicios. No se enviaron correos de prueba desde esta sesión.
