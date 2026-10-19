// Paste into a Google Apps Script project bound to a private Google Sheet.
// Run setup() once. Then deploy as Web App, execute as yourself, access Anyone.
// Authentication is the shared API_SECRET, sent only from your Vercel backend.
function setup() {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('SPREADSHEET_ID', SpreadsheetApp.getActiveSpreadsheet().getId());
  if (!props.getProperty('API_SECRET')) props.setProperty('API_SECRET', Utilities.getUuid() + Utilities.getUuid());
  if (!props.getProperty('NOTIFY_EMAIL')) props.setProperty('NOTIFY_EMAIL', 'clientesya.uy@gmail.com');
  var book = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheet_(book, 'Contactos', ['ID', 'Fecha', 'Nombre', 'Negocio', 'Contacto', 'Proyecto', 'Consentimiento', 'Aviso por email']);
  ensureSheet_(book, 'Metricas', ['Clave', 'Fecha', 'Evento', 'Origen', 'Cantidad']);
  if (!ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'cleanup'; })) ScriptApp.newTrigger('cleanup').timeBased().everyDays(1).create();
}

function ensureSheet_(book, name, columns) {
  var sheet = book.getSheetByName(name);
  if (!sheet) { sheet = book.insertSheet(name); sheet.appendRow(columns); sheet.setFrozenRows(1); }
  return sheet;
}

function text_(value) {
  var valueString = String(value || '');
  return /^[\s]*[=+\-@]/.test(valueString) ? "'" + valueString : valueString;
}

function result_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  var props = PropertiesService.getScriptProperties();
  var data;
  try { data = JSON.parse(e.postData.contents); } catch (_) { return result_({ ok: false }); }
  if (!props.getProperty('API_SECRET') || data.secret !== props.getProperty('API_SECRET')) return result_({ ok: false });
  if (!/^[a-f0-9]{64}$/.test(data.rateKey || '')) return result_({ ok: false });
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return result_({ ok: false });
  try {
    var cache = CacheService.getScriptCache();
    var rateKey = 'rate:' + data.kind + ':' + data.rateKey;
    var count = Number(cache.get(rateKey) || 0);
    if (count >= (data.kind === 'contact' ? 5 : 120)) return result_({ ok: false, status: 429 });
    cache.put(rateKey, String(count + 1), 600);
    var book = SpreadsheetApp.openById(props.getProperty('SPREADSHEET_ID'));
    if (data.kind === 'contact') {
      if (!/^[a-f0-9-]{36}$/i.test(data.id || '') || data.consentVersion !== '2026-10-19') return result_({ ok: false });
      var sheet = book.getSheetByName('Contactos');
      var existing = sheet.getRange(1, 1, Math.max(1, sheet.getLastRow()), 1).createTextFinder(data.id).matchEntireCell(true).findNext();
      if (existing) return result_({ ok: true, saved: true, emailSent: sheet.getRange(existing.getRow(), 8).getValue() === 'Enviado' });
      sheet.appendRow([data.id, new Date().toISOString(), text_(data.name), text_(data.business), text_(data.contact), text_(data.project), data.consentVersion, 'Pendiente']);
      SpreadsheetApp.flush();
      var emailSent = false;
      try {
        if (MailApp.getRemainingDailyQuota() > 0) {
          MailApp.sendEmail({ to: props.getProperty('NOTIFY_EMAIL'), subject: 'Nueva consulta de ClientesYa', body: 'Nombre: ' + data.name + '\nNegocio: ' + data.business + '\nContacto: ' + data.contact + '\n\n' + data.project + '\n\nID: ' + data.id });
          sheet.getRange(sheet.getLastRow(), 8).setValue('Enviado');
          emailSent = true;
        }
      } catch (_) { /* Contact remains saved even when email quota is exhausted. */ }
      return result_({ ok: true, saved: true, emailSent: emailSent });
    }
    if (data.kind === 'event' && /^(page_view|whatsapp_click|demo_click|form_saved)$/.test(data.event) && /^[a-z0-9-]{1,30}$/.test(data.source)) {
      var metrics = book.getSheetByName('Metricas');
      var day = Utilities.formatDate(new Date(), 'America/Montevideo', 'yyyy-MM-dd');
      var key = day + ':' + data.event + ':' + data.source;
      var match = metrics.getRange(1, 1, Math.max(1, metrics.getLastRow()), 1).createTextFinder(key).matchEntireCell(true).findNext();
      if (match) { var cell = metrics.getRange(match.getRow(), 5); cell.setValue(Number(cell.getValue()) + 1); }
      else metrics.appendRow([key, day, data.event, data.source, 1]);
      return result_({ ok: true });
    }
    return result_({ ok: false });
  } catch (_) { return result_({ ok: false }); }
  finally { lock.releaseLock(); }
}

// Daily retention cleanup: contacts 90 days, aggregate metrics 180 days.
function cleanup() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  try {
    var book = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
    [['Contactos', 90], ['Metricas', 180]].forEach(function(config) {
      var sheet = book.getSheetByName(config[0]);
      if (!sheet || sheet.getLastRow() < 2) return;
      var rows = sheet.getDataRange().getValues();
      var cutoff = Date.now() - config[1] * 86400000;
      for (var row = rows.length - 1; row >= 1; row--) if (new Date(rows[row][1]).getTime() < cutoff) sheet.deleteRow(row + 1);
    });
  } finally { lock.releaseLock(); }
}
