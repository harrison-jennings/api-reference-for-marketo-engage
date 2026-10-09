/**
 * Convert Adobe's specification descriptions to Markdown for Postman.
 *
 * Descriptions mix plain text with a little inline HTML (<a>, <br>, <code>,
 * <b>) and literal angle brackets such as "the <head> tag". Supported tags are
 * converted to Markdown; any other angle bracket is escaped so that Postman
 * shows it as text instead of treating it as HTML.
 */

// Some upstream descriptions link to Adobe's legacy developer site with
// root-relative URLs; the documentation site hook resolves them the same way.
export const UPSTREAM_DOCS_ORIGIN = "https://developers.marketo.com";

const TAG = /<(\/?)(a|b|strong|i|em|code|br|p|ul|ol|li)\b([^>]*)>/gi;
const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };

export function decodeEntities(text) {
  return text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (entity) => ENTITIES[entity]);
}

function escapeText(text) {
  return decodeEntities(text).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function absoluteHref(href) {
  const value = decodeEntities(href.trim());
  return value.startsWith("/") && !value.startsWith("//") ? `${UPSTREAM_DOCS_ORIGIN}${value}` : value;
}

function codeMarkdown(raw) {
  const code = decodeEntities(raw.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, ""));
  if (code.includes("\n")) return `\n\n\`\`\`\n${code.trim()}\n\`\`\`\n\n`;
  const fence = code.includes("`") ? "``" : "`";
  return `${fence}${code}${fence}`;
}

/** Convert one source description to Markdown, preserving all visible text. */
export function htmlToMarkdown(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  let text = value.replace(/\r\n?/g, "\n");

  // Code first, so its contents are not escaped or reformatted.
  const codes = [];
  text = text.replace(/<code\b[^>]*>([\s\S]*?)<\/code\s*>/gi, (match, inner) => {
    codes.push(codeMarkdown(inner));
    return `\u0000${codes.length - 1}\u0000`;
  });

  let output = "";
  let last = 0;
  const links = [];
  for (const match of text.matchAll(TAG)) {
    output += escapeText(text.slice(last, match.index));
    last = match.index + match[0].length;
    const [, closing, name, attributes] = match;
    switch (name.toLowerCase()) {
      case "br":
        output += "\n";
        break;
      case "p":
        output += "\n\n";
        break;
      case "b":
      case "strong":
        output += "**";
        break;
      case "i":
      case "em":
        output += "_";
        break;
      case "ul":
      case "ol":
        output += "\n";
        break;
      case "li":
        output += closing ? "" : "\n- ";
        break;
      case "a":
        if (closing) {
          output += links.length ? `](${links.pop()})` : "";
        } else {
          const href = /href\s*=\s*"([^"]*)"|href\s*=\s*'([^']*)'/i.exec(attributes);
          if (href) {
            links.push(absoluteHref(href[1] ?? href[2]));
            output += "[";
          }
        }
        break;
      default:
        break;
    }
  }
  output += escapeText(text.slice(last));
  output = output.replace(/\u0000(\d+)\u0000/g, (match, index) => codes[Number(index)]);
  return output
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Single-line form for list items and table cells. */
export function inlineMarkdown(value) {
  return htmlToMarkdown(value)
    .replace(/\n```\n([\s\S]*?)\n```\n/g, (match, code) => ` \`${code.replace(/\s*\n\s*/g, " ")}\` `)
    .replace(/\s*\n+\s*/g, " ")
    .trim();
}

/** Visible words of an HTML or Markdown string, for content-preservation checks. */
export function visibleWords(text, { markdown = false } = {}) {
  let plain = String(text || "");
  if (markdown) {
    plain = plain.replace(/\]\([^)]*\)/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  } else {
    plain = decodeEntities(plain.replace(/<\/?(a|b|strong|i|em|code|br|p|ul|ol|li)\b[^>]*>/gi, " "));
  }
  return plain.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}

export function code(value) {
  const text = String(value);
  return text.includes("`") ? `\`\` ${text} \`\`` : `\`${text}\``;
}
