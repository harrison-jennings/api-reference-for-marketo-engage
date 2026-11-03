/**
 * Minimal JSON syntax highlighting. Produces escaped HTML with token classes
 * prefixed so they can't collide with the site's own.
 */

const TOKEN = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false)\b|\b(null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],:])/g;

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function highlightJson(text) {
  let html = "";
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    html += escapeHtml(text.slice(last, match.index));
    const [token, string, colon, boolean, nullValue, number, punctuation] = match;
    if (string !== undefined) {
      html += colon
        ? `<span class="rb-t-key">${escapeHtml(string)}</span><span class="rb-t-mark">${escapeHtml(colon)}</span>`
        : `<span class="rb-t-string">${escapeHtml(string)}</span>`;
    } else if (boolean !== undefined || nullValue !== undefined) {
      html += `<span class="rb-t-literal">${token}</span>`;
    } else if (number !== undefined) {
      html += `<span class="rb-t-literal">${token}</span>`;
    } else if (punctuation !== undefined) {
      html += `<span class="rb-t-mark">${escapeHtml(token)}</span>`;
    }
    last = match.index + token.length;
  }
  return html + escapeHtml(text.slice(last));
}
