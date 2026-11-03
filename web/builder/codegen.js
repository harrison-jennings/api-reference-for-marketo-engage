/**
 * Code samples generated from a built request (see request.js). Credentials
 * only ever appear as placeholders because the request itself only contains
 * placeholders.
 */

const INDENT = "  ";

// --- cURL -------------------------------------------------------------------

/** Quote for POSIX shells using double quotes. */
function shellDouble(value) {
  return `"${String(value).replace(/(["\\$`])/g, "\\$1")}"`;
}

/** Quote for POSIX shells using single quotes (used for JSON bodies). */
function shellSingle(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

export function generateCurl(request) {
  const lines = [`curl --request ${request.method}`, `${INDENT}${shellDouble(request.url)}`];
  for (const [name, value] of request.headers) {
    lines.push(`${INDENT}--header ${shellDouble(`${name}: ${value}`)}`);
  }
  const body = request.body;
  if (body) {
    if (body.kind === "form") {
      for (const field of body.fields) {
        lines.push(`${INDENT}--data-urlencode ${shellDouble(`${field.name}=${field.value}`)}`);
      }
    } else if (body.kind === "multipart") {
      for (const field of body.fields) {
        const value = field.file ? `${field.name}=@${field.value}` : `${field.name}=${field.value}`;
        lines.push(`${INDENT}--form ${shellDouble(value)}`);
      }
    } else if (body.text) {
      const text = body.kind === "json" && body.value !== undefined ? JSON.stringify(body.value, null, 2) : body.text;
      lines.push(`${INDENT}--data ${shellSingle(text)}`);
    }
  }
  return lines.join(" \\\n");
}

// --- JavaScript -------------------------------------------------------------

const JS_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function jsKey(name) {
  return JS_IDENTIFIER.test(name) ? name : JSON.stringify(name);
}

/** Render a JSON value as a JavaScript literal with stable indentation. */
export function jsLiteral(value, depth = 0) {
  const pad = INDENT.repeat(depth + 1);
  const close = INDENT.repeat(depth);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((item) => `${pad}${jsLiteral(item, depth + 1)}`).join(",\n")}\n${close}]`;
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "{}";
    return `{\n${entries.map(([key, item]) => `${pad}${jsKey(key)}: ${jsLiteral(item, depth + 1)}`).join(",\n")}\n${close}}`;
  }
  return JSON.stringify(value);
}

export function generateJavaScript(request) {
  const body = request.body;
  const lines = [];
  const options = [];

  if (body?.kind === "multipart") {
    lines.push("const formData = new FormData();");
    for (const field of body.fields) {
      if (field.file) {
        lines.push(`// Replace with a File or Blob, e.g. from an <input type="file"> (${field.value})`);
        lines.push(`formData.append(${JSON.stringify(field.name)}, file);`);
      } else {
        lines.push(`formData.append(${JSON.stringify(field.name)}, ${JSON.stringify(field.value)});`);
      }
    }
    lines.push("");
  }

  if (request.method !== "GET") options.push(`method: ${JSON.stringify(request.method)}`);
  if (request.headers.length) {
    const headers = Object.fromEntries(request.headers);
    options.push(`headers: ${jsLiteral(headers, 1)}`);
  }
  if (body?.kind === "form" && body.fields.length) {
    const fields = Object.fromEntries(body.fields.map((field) => [field.name, field.value]));
    options.push(`body: new URLSearchParams(${jsLiteral(fields, 1)})`);
  } else if (body?.kind === "multipart") {
    options.push("body: formData");
  } else if (body?.kind === "json" && body.value !== undefined) {
    options.push(`body: JSON.stringify(${jsLiteral(body.value, 1)})`);
  } else if (body?.text) {
    options.push(`body: ${JSON.stringify(body.text)}`);
  }

  const url = JSON.stringify(request.url);
  if (options.length) {
    lines.push("const response = await fetch(", `${INDENT}${url},`, `${INDENT}{`);
    lines.push(options.map((option) => `${INDENT}${INDENT}${option.replace(/\n/g, `\n${INDENT}`)}`).join(",\n"));
    lines.push(`${INDENT}}`, ");");
  } else {
    lines.push(`const response = await fetch(${url});`);
  }
  lines.push("", "const data = await response.json();");
  return lines.join("\n");
}

// --- Python -----------------------------------------------------------------

/** Render a JSON value as a Python literal. JSON string escapes are valid Python. */
export function pyLiteral(value, depth = 0) {
  const pad = "    ".repeat(depth + 1);
  const close = "    ".repeat(depth);
  if (value === null) return "None";
  if (value === true) return "True";
  if (value === false) return "False";
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return `[\n${value.map((item) => `${pad}${pyLiteral(item, depth + 1)},`).join("\n")}\n${close}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (!entries.length) return "{}";
    return `{\n${entries.map(([key, item]) => `${pad}${JSON.stringify(key)}: ${pyLiteral(item, depth + 1)},`).join("\n")}\n${close}}`;
  }
  return JSON.stringify(value);
}

const REQUESTS_SHORTCUTS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]);

export function generatePython(request) {
  const args = [JSON.stringify(request.urlWithoutQuery)];

  if (request.query.length) {
    const params = {};
    for (const [name, value] of request.query) {
      if (name in params) {
        params[name] = Array.isArray(params[name]) ? [...params[name], value] : [params[name], value];
      } else {
        params[name] = value;
      }
    }
    args.push(`params=${pyLiteral(params, 1)}`);
  }

  const body = request.body;
  const headers = request.headers.filter(([name]) => !(body?.kind === "json" && /^content-type$/i.test(name)));
  if (headers.length) args.push(`headers=${pyLiteral(Object.fromEntries(headers), 1)}`);

  if (body?.kind === "json" && body.value !== undefined) {
    args.push(`json=${pyLiteral(body.value, 1)}`);
  } else if ((body?.kind === "form" || body?.kind === "multipart") && body.fields.length) {
    const data = Object.fromEntries(body.fields.filter((field) => !field.file).map((field) => [field.name, field.value]));
    const files = body.fields.filter((field) => field.file);
    if (Object.keys(data).length) args.push(`data=${pyLiteral(data, 1)}`);
    if (files.length) {
      const entries = files.map((field) => `        ${JSON.stringify(field.name)}: open(${JSON.stringify(field.value)}, "rb"),`);
      args.push(`files={\n${entries.join("\n")}\n    }`);
    }
  } else if (body?.text) {
    args.push(`data=${JSON.stringify(body.text)}`);
  }

  const call = REQUESTS_SHORTCUTS.has(request.method)
    ? `requests.${request.method.toLowerCase()}(`
    : `requests.request(\n    ${JSON.stringify(request.method)},`;
  return [
    "import requests",
    "",
    `response = ${call}`,
    ...args.map((arg) => `    ${arg},`),
    ")",
    "",
    "data = response.json()",
  ].join("\n");
}

export const GENERATORS = [
  { id: "curl", label: "cURL", language: "bash", generate: generateCurl },
  { id: "javascript", label: "JavaScript", language: "javascript", generate: generateJavaScript },
  { id: "python", label: "Python", language: "python", generate: generatePython },
];
