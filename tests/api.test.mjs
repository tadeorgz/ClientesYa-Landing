import test from 'node:test'
import assert from 'node:assert/strict'
import { createContactHandler, createEventsHandler } from '../server/handlers.mjs'

const env = { ALLOWED_ORIGIN: 'https://clientes.example', GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec', GOOGLE_SCRIPT_SECRET: 'test-secret' }
const lead = { id: '61f82f81-a0d5-4e5b-b0ac-4d3b89e2ad49', name: 'Ana', business: 'Restaurante de prueba', contact: 'ana@example.com', project: 'Quiero una carta digital con mi identidad.', consent: true, website: '' }
function response() {
  return { statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k] = v }, status(code) { this.statusCode = code; return this }, json(body) { this.body = body; return this }, end() { return this } }
}
function request(body, overrides = {}) {
  return { method: 'POST', headers: { origin: 'https://clientes.example', host: 'clientes.example', 'content-type': 'application/json', 'x-forwarded-for': '127.0.0.1' }, body, ...overrides }
}
function redisFetch(records, rate = 1) {
  return async (url, options) => {
    assert.equal(new URL(url).host, 'script.google.com')
    const command = JSON.parse(options.body)
    records.push(command)
    const result = { ok: rate < 100, status: rate < 100 ? 201 : 429, saved: rate < 100, emailSent: false }
    return { ok: true, json: async () => result }
  }
}
test('a consented lead is persisted with retention and confirmed', async () => {
  const calls = []; const res = response()
  await createContactHandler({ env, fetchImpl: redisFetch(calls) })(request(lead), res)
  assert.equal(res.statusCode, 201)
  assert.equal(res.body.saved, true)
  const serialized = JSON.stringify(calls)
  assert(serialized.includes('ana@example.com'))
  assert(serialized.includes('consentVersion'))
  assert(!serialized.includes('127.0.0.1'), 'Do not store raw visitor IP in leads')
})
test('contact requires consent before any provider call', async () => {
  const calls = []; const res = response()
  await createContactHandler({ env, fetchImpl: redisFetch(calls) })(request({ ...lead, consent: false }), res)
  assert.equal(res.statusCode, 400); assert.equal(calls.length, 0)
})
test('an invalid contact is rejected', async () => {
  const res = response()
  await createContactHandler({ env })(request({ ...lead, contact: 'invalid' }), res)
  assert.equal(res.statusCode, 400)
})
test('foreign origin cannot submit leads', async () => {
  const res = response()
  await createContactHandler({ env })(request(lead, { headers: { origin: 'https://evil.example', host: 'clientes.example' } }), res)
  assert.equal(res.statusCode, 403)
})
test('missing storage never reports a saved lead', async () => {
  const res = response()
  await createContactHandler({ env: {} })(request(lead), res)
  assert.equal(res.statusCode, 503); assert.notEqual(res.body.saved, true)
})
test('storage failure never reports success', async () => {
  const res = response()
  await createContactHandler({ env, fetchImpl: async () => { throw new Error('Offline') } })(request(lead), res)
  assert.equal(res.statusCode, 503); assert.notEqual(res.body.saved, true)
})
test('rate limit rejects excess submissions before storing a lead', async () => {
  const calls = []; const res = response()
  await createContactHandler({ env, fetchImpl: redisFetch(calls, 100) })(request(lead), res)
  assert.equal(res.statusCode, 429)
  assert.equal(res.body.saved, undefined)
})
test('only POST accepts a lead', async () => {
  const res = response()
  await createContactHandler({ env })(request(lead, { method: 'GET' }), res)
  assert.equal(res.statusCode, 405)
})
test('analytics stores an aggregate count with no contact data', async () => {
  const calls = []; const res = response()
  await createEventsHandler({ env, fetchImpl: redisFetch(calls) })(request({ event: 'whatsapp_click', source: 'hero', consent: true, email: 'never-store@example.com' }), res)
  assert.equal(res.statusCode, 202)
  assert(JSON.stringify(calls).includes('whatsapp_click'))
  assert(!JSON.stringify(calls).includes('never-store@example.com'))
})
test('analytics requires explicit consent', async () => {
  const res = response()
  await createEventsHandler({ env })(request({ event: 'whatsapp_click', source: 'hero', consent: false }), res)
  assert.equal(res.statusCode, 400)
})
test('arbitrary event labels cannot inject private data into metrics', async () => {
  const res = response()
  await createEventsHandler({ env })(request({ event: 'whatsapp_click', source: 'person@example.com', consent: true }), res)
  assert.equal(res.statusCode, 400)
})
