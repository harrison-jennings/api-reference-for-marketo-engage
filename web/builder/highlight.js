/**
 * Minimal JSON syntax highlighting. Produces escaped HTML using the token
 * classes Pygments emits, so Material's light and dark code colours apply.
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
        ? `<span class="nt">${escapeHtml(string)}</span><span class="p">${escapeHtml(colon)}</span>`
        : `<span class="s2">${escapeHtml(string)}</span>`;
    } else if (boolean !== undefined || nullValue !== undefined) {
      html += `<span class="kc">${token}</span>`;
    } else if (number !== undefined) {
      html += `<span class="mi">${token}</span>`;
    } else if (punctuation !== undefined) {
      html += `<span class="p">${escapeHtml(token)}</span>`;
    }
    last = match.index + token.length;
  }
  return html + escapeHtml(text.slice(last));
}
