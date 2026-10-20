// Runs before the page is painted; external so it respects script-src 'self'.
try {
  const theme = localStorage.getItem('cy-theme')
  if (['light', 'dark', 'system'].includes(theme)) document.documentElement.dataset.theme = theme
} catch { /* CSS follows the system when storage is unavailable. */ }
