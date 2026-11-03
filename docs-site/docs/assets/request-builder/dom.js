/** DOM helpers shared by the Request Builder's views. */

export function el(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attributes)) {
    if (value === undefined || value === null || value === false) continue;
    if (name === "className") node.className = value;
    else if (name === "text") node.textContent = value;
    else if (name.startsWith("on")) node.addEventListener(name.slice(2).toLowerCase(), value);
    else node.setAttribute(name, value === true ? "" : String(value));
  }
  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

/** Specification descriptions may contain HTML; render them as plain text. */
export function plainText(html) {
  if (!html) return "";
  const parsed = new DOMParser().parseFromString(String(html).replace(/<br\s*\/?>/gi, " "), "text/html");
  return (parsed.body.textContent || "").replace(/\s+/g, " ").trim();
}
