import { createContactHandler, createEventsHandler } from './handlers.mjs'

export function devApi(env) {
  return {
    name: 'clientesya-local-api',
    apply: 'serve',
    configureServer(server) {
      const handlers = { '/api/contact': createContactHandler({ env }), '/api/events': createEventsHandler({ env }) }
      server.middlewares.use(async (req, res, next) => {
        const route = handlers[req.url.split('?')[0]]
        if (!route) return next()
        res.status = code => { res.statusCode = code; return res }
        res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); return res }
        try {
          const chunks = []; let size = 0
          for await (const chunk of req) {
            size += chunk.length
            if (size > 8192) return res.status(413).json({ error: 'Solicitud demasiado grande.' })
            chunks.push(chunk)
          }
          req.body = Buffer.concat(chunks).toString('utf8')
          await route(req, res)
        } catch { if (!res.writableEnded) res.status(400).json({ error: 'Solicitud inválida.' }) }
      })
    },
  }
}
