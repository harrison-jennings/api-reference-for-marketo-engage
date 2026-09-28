/**
 * Request Builder user interface. All request construction, validation, code
 * generation and mocking is delegated to the pure modules; this file only
 * renders controls and output. Nothing here performs network requests.
 */

import { normaliseOperation, PLACEHOLDERS } from "./operation.js";
import { describeType } from "./schema.js";
import { controlFor } from "./validate.js";
import { buildRequest, initialBodyValue } from "./request.js";
import { GENERATORS } from "./codegen.js";
import { defaultResponseCode, generateMock } from "./mock.js";
import { generateRealisticResponse } from "./behaviour.js";
import { highlightJson } from "./highlight.js";

const LANGUAGE_STORAGE_KEY = "api-reference-for-marketo-engage.request-builder.language";
let instanceCounter = 0;

// --- small DOM helpers ------------------------------------------------------

function el(tag, attributes = {}, ...children) {
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
function plainText(html) {
  if (!html) return "";
  const parsed = new DOMParser().parseFromString(String(html).replace(/<br\s*\/?>/gi, " "), "text/html");
  return (parsed.body.textContent || "").replace(/\s+/g, " ").trim();
}

function readStoredLanguage() {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLanguage(id) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, id);
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}

async function copyText(text, button) {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
  } catch {
    button.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    button.textContent = original;
  }, 1500);
}

function copyButton(getText, label) {
  const button = el("button", { type: "button", className: "rb-button rb-button--small", "aria-label": label, text: "Copy" });
  button.addEventListener("click", () => copyText(getText(), button));
  return button;
}

function methodBadge(method) {
  return el("span", { className: `http-method http-method--${method.toLowerCase()}`, text: method });
}

// --- field rendering --------------------------------------------------------

function initialFieldValue(field) {
  const control = controlFor(field);
  if (control === "file") return PLACEHOLDERS.filePath;
  if (!field.required) return "";
  if (field.schema.default !== undefined && control !== "json") return String(field.schema.default);
  if (control === "enum" && field.schema.enum.length === 1) return String(field.schema.enum[0]);
  return "";
}

function fieldHint(field, control) {
  const schema = field.schema;
  const hints = [];
  if (control === "list") hints.push("One value per line.");
  if (control === "json") hints.push(field.in === "form" ? "JSON value, sent as JSON text in this form field." : "JSON value.");
  if (control === "file") hints.push("Local file path used in code samples only; nothing is uploaded.");
  if (control === "list" && Array.isArray(schema.items?.enum)) hints.push(`Allowed: ${schema.items.enum.join(", ")}.`);
  if (schema.format === "date-time") hints.push("Format: 2026-01-15T10:30:00Z.");
  if (schema.format === "date") hints.push("Format: 2026-01-15.");
  if (schema.default !== undefined && control !== "enum") hints.push(`Default: ${JSON.stringify(schema.default)}.`);
  return hints.join(" ");
}

function createControl(field, id, describedBy, value, onInput, resolver) {
  const control = controlFor(field);
  const common = { id, name: field.key, "aria-describedby": describedBy, "aria-required": field.required ? "true" : null };

  if (control === "enum" || control === "boolean") {
    const options = control === "enum" ? field.schema.enum.map(String) : ["true", "false"];
    const select = el(
      "select",
      { ...common, className: "rb-input" },
      el("option", { value: "", text: field.required ? "Select a value" : "Not set" }),
      options.map((option) => el("option", { value: option, text: option })),
    );
    select.value = value;
    select.addEventListener("change", onInput);
    return select;
  }

  if (control === "list" || control === "json") {
    const placeholder = control === "json"
      ? JSON.stringify(generateMock(field.schema, resolver, { name: field.name }))
      : "value 1\nvalue 2";
    const textarea = el("textarea", {
      ...common,
      className: `rb-input rb-input--code`,
      rows: control === "json" ? 4 : 3,
      spellcheck: "false",
      autocomplete: "off",
      placeholder,
    });
    textarea.value = value;
    textarea.addEventListener("input", onInput);
    return textarea;
  }

  const input = el("input", {
    ...common,
    className: "rb-input",
    type: "text",
    autocomplete: "off",
    spellcheck: "false",
    inputmode: control === "integer" ? "numeric" : control === "number" ? "decimal" : null,
    placeholder: field.example !== undefined ? String(field.example) : null,
  });
  input.value = value;
  input.addEventListener("input", onInput);
  return input;
}

// --- the builder ------------------------------------------------------------

/**
 * Mount a Request Builder.
 * @param container element to render into
 * @param operationDocument parsed *.operation.json
 * @param options { modelUrl(name) → href|null, title }
 */
export function mountRequestBuilder(container, operationDocument, options = {}) {
  const operation = normaliseOperation(operationDocument);
  const prefix = `rb${(instanceCounter += 1)}`;
  const modelUrl = options.modelUrl || (() => null);

  const state = { baseUrl: "", values: {}, bodyText: undefined };
  const touched = new Set();
  let showAllErrors = false;
  let mockCode = defaultResponseCode(operation);
  let mockVisible = false;
  let language = GENERATORS.some((generator) => generator.id === readStoredLanguage()) ? readStoredLanguage() : GENERATORS[0].id;

  const errorNodes = new Map(); // key → { node, control }

  function modelLink(name) {
    if (!name) return null;
    const href = modelUrl(name);
    return href ? el("a", { href, className: "rb-model-link" }, el("code", { text: name })) : el("code", { text: name });
  }

  function onFieldInput(key) {
    return (event) => {
      state.values[key] = event.target.value;
      touched.add(key);
      update();
    };
  }

  function fieldRow(field) {
    const id = `${prefix}-${field.key.replace(/[^A-Za-z0-9_-]/g, "_")}`;
    const control = controlFor(field);
    const helpId = `${id}-help`;
    const errorId = `${id}-error`;
    const initial = initialFieldValue(field);
    if (initial !== "") state.values[field.key] = initial;

    const description = plainText(field.description);
    const hint = fieldHint(field, control);
    const input = createControl(field, id, `${helpId} ${errorId}`, initial, onFieldInput(field.key), operation.resolver);
    const error = el("p", { className: "rb-field__error", id: errorId, hidden: true });
    errorNodes.set(field.key, { node: error, control: input });

    return el(
      "div",
      { className: `rb-field ${field.required ? "rb-field--required" : "rb-field--optional"}` },
      el(
        "label",
        { for: id, className: "rb-field__label" },
        el("code", { className: "rb-field__name", text: field.name }),
        el("span", { className: "rb-field__type", text: describeType(field.schema, operation.resolver) }),
        el("span", {
          className: `rb-badge ${field.required ? "rb-badge--required" : "rb-badge--optional"}`,
          text: field.required ? "required" : "optional",
        }),
      ),
      input,
      description || hint ? el("p", { className: "rb-field__help", id: helpId }, [description, hint].filter(Boolean).join(" ")) : null,
      error,
    );
  }

  function group(title, rows, extra = null) {
    if (!rows.length && !extra) return null;
    return el("fieldset", { className: "rb-group" }, el("legend", { className: "rb-group__title", text: title }), extra, rows);
  }

  // Instance
  const baseUrlId = `${prefix}-base-url`;
  const baseUrlError = el("p", { className: "rb-field__error", id: `${baseUrlId}-error`, hidden: true });
  const baseUrlNote = el("p", { className: "rb-field__help rb-field__note", hidden: true });
  const baseUrlInput = el("input", {
    id: baseUrlId,
    className: "rb-input",
    type: "url",
    inputmode: "url",
    autocomplete: "off",
    spellcheck: "false",
    placeholder: operation.defaultBaseUrl || "https://123-ABC-456.mktorest.com",
    "aria-describedby": `${baseUrlId}-help ${baseUrlId}-error`,
  });
  baseUrlInput.addEventListener("input", (event) => {
    state.baseUrl = event.target.value;
    touched.add("baseUrl");
    update();
  });
  errorNodes.set("baseUrl", { node: baseUrlError, control: baseUrlInput });
  const instanceGroup = group("Instance", [
    el(
      "div",
      { className: "rb-field rb-field--optional" },
      el("label", { for: baseUrlId, className: "rb-field__label" }, "Base URL", el("span", { className: "rb-badge rb-badge--optional", text: "optional" })),
      baseUrlInput,
      el("p", { className: "rb-field__help", id: `${baseUrlId}-help` },
        operation.defaultBaseUrl
          ? `Defaults to ${operation.defaultBaseUrl} from the specification. Not saved.`
          : `Your REST endpoint from Admin > Web Services, e.g. https://123-ABC-456.mktorest.com/rest. Leave blank to use ${PLACEHOLDERS.baseUrl}. Not saved.`),
      baseUrlNote,
      baseUrlError,
    ),
  ]);

  // Authentication (read-only)
  const auth = operation.authentication;
  const authLines = [];
  if (auth.type === "client-credentials") {
    const names = operation.fields.filter((field) => field.credential).map((field) => `${field.name}=${field.credential}`);
    authLines.push(el("p", {}, "Credentials are sent as query parameters: ", el("code", { text: names.join("&") })));
    authLines.push(el("p", { className: "rb-note" }, "This page never asks for a Client ID or Client Secret. Replace the placeholders in your own secure environment."));
  } else {
    authLines.push(el("p", {}, el("code", { text: `${auth.header[0]}: ${auth.header[1]}` })));
    if (operation.fields.some((field) => field.credential && field.in === "query")) {
      authLines.push(el("p", { className: "rb-note" }, "The specification also lists an access_token query parameter. The builder sends the token in the Authorization header instead, so it never appears in URLs."));
    }
    authLines.push(el("p", { className: "rb-note" }, "Tokens are never requested or stored. Replace the placeholder in your own environment."));
  }
  const authGroup = group("Authentication", [], el("div", { className: "rb-auth" }, authLines));

  const editable = (location) => operation.fields.filter((field) => field.in === location && !field.credential);
  const pathGroup = group("Path parameters", editable("path").map(fieldRow));
  const queryGroup = group("Query parameters", editable("query").map(fieldRow));
  const headerGroup = group("Headers", editable("header").map(fieldRow));

  // Body
  let bodyGroup = null;
  let bodyTextarea = null;
  let starterBody = "";
  const body = operation.body;
  if (body) {
    const meta = el(
      "p",
      { className: "rb-field__help" },
      "Content type: ",
      el("code", { text: body.contentType }),
      body.refName ? [" · Schema: ", modelLink(body.refName)] : null,
    );
    if (body.kind === "json" || body.kind === "raw") {
      const id = `${prefix}-body`;
      const initial = initialBodyValue(operation, generateMock);
      starterBody = initial === undefined ? "" : JSON.stringify(initial, null, 2);
      state.bodyText = starterBody;
      bodyTextarea = el("textarea", {
        id,
        className: "rb-input rb-input--code rb-input--body",
        rows: Math.min(18, Math.max(6, starterBody.split("\n").length)),
        spellcheck: "false",
        autocomplete: "off",
        "aria-describedby": `${id}-help ${id}-error`,
      });
      bodyTextarea.value = starterBody;
      bodyTextarea.addEventListener("input", (event) => {
        state.bodyText = event.target.value;
        touched.add("body");
        update();
      });
      const bodyError = el("p", { className: "rb-field__error", id: `${id}-error`, hidden: true });
      errorNodes.set("body", { node: bodyError, control: bodyTextarea });
      const reset = el("button", { type: "button", className: "rb-button rb-button--small", text: "Reset body" });
      reset.addEventListener("click", () => {
        bodyTextarea.value = starterBody;
        state.bodyText = starterBody;
        update();
      });
      bodyGroup = group("Request body", [
        el(
          "div",
          { className: `rb-field ${body.required ? "rb-field--required" : "rb-field--optional"}` },
          el("div", { className: "rb-field__label rb-field__label--split" },
            el("label", { for: id }, body.kind === "json" ? "JSON body" : "Body",
              el("span", { className: `rb-badge ${body.required ? "rb-badge--required" : "rb-badge--optional"}`, text: body.required ? "required" : "optional" })),
            reset),
          bodyTextarea,
          el("p", { className: "rb-field__help", id: `${id}-help` },
            body.example !== undefined ? "Starter content is the documented example." : "Starter content is generated from the schema."),
          bodyError,
        ),
      ], meta);
    } else {
      bodyGroup = group(body.kind === "multipart" ? "Multipart form fields" : "Form fields", (body.fields || []).map(fieldRow), meta);
    }
  }

  const form = el(
    "form",
    { className: "rb-form", novalidate: true, onSubmit: (event) => event.preventDefault() },
    instanceGroup, authGroup, pathGroup, queryGroup, headerGroup, bodyGroup,
  );

  // Request output
  const summary = el("p", { className: "rb-summary", role: "status", "aria-live": "polite" });
  const generateButton = el("button", { type: "button", className: "rb-button rb-button--primary", text: "Generate Request" });
  generateButton.addEventListener("click", () => {
    showAllErrors = true;
    const request = update();
    if (!request.valid) {
      const first = request.errors.map((error) => errorNodes.get(error.key)).find(Boolean);
      first?.control.focus();
    } else {
      urlCode.closest(".rb-output")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });

  const urlCode = el("code", { className: "rb-url__text" });
  let currentRequest = null;
  const requestSection = el(
    "section",
    { className: "rb-output", "aria-label": "Request preview" },
    el("div", { className: "rb-output__header" }, el("h3", { className: "rb-output__title", text: "Request" }), copyButton(() => currentRequest.url, "Copy request URL")),
    el("div", { className: "rb-url" }, methodBadge(operation.method), urlCode),
  );

  // Code samples
  const tabList = el("div", { className: "rb-tabs", role: "tablist", "aria-label": "Code sample language" });
  const codePanel = el("div", { className: "rb-code", role: "tabpanel", id: `${prefix}-code`, tabindex: "0" });
  const codeBlock = el("code");
  codePanel.append(el("pre", {}, codeBlock));
  const tabs = GENERATORS.map((generator) => {
    const tab = el("button", {
      type: "button",
      role: "tab",
      className: "rb-tab",
      id: `${prefix}-tab-${generator.id}`,
      "aria-controls": `${prefix}-code`,
      text: generator.label,
    });
    tab.addEventListener("click", () => selectLanguage(generator.id));
    tab.addEventListener("keydown", (event) => {
      const index = GENERATORS.indexOf(generator);
      const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!offset) return;
      event.preventDefault();
      const next = GENERATORS[(index + offset + GENERATORS.length) % GENERATORS.length];
      selectLanguage(next.id);
      tabs[GENERATORS.indexOf(next)].focus();
    });
    tabList.append(tab);
    return tab;
  });
  const codeWarning = el("p", { className: "rb-code__warning", hidden: true });
  const codeSection = el(
    "section",
    { className: "rb-output", "aria-label": "Code samples" },
    el("div", { className: "rb-output__header" }, tabList, copyButton(() => codeBlock.textContent, "Copy code sample")),
    codeWarning,
    codePanel,
  );

  function selectLanguage(id) {
    language = id;
    storeLanguage(id);
    renderCode();
  }

  function renderCode() {
    GENERATORS.forEach((generator, index) => {
      const selected = generator.id === language;
      tabs[index].setAttribute("aria-selected", String(selected));
      tabs[index].tabIndex = selected ? 0 : -1;
      if (selected) {
        codePanel.setAttribute("aria-labelledby", tabs[index].id);
        codeBlock.textContent = generator.generate(currentRequest);
        codeBlock.className = `language-${generator.language}`;
      }
    });
  }

  // Mock response
  const mockSelectId = `${prefix}-mock-status`;
  const statusLabel = (response) => `${response.code} ${plainText(response.description)}`.slice(0, 80);
  const mockSelect = el(
    "select",
    { id: mockSelectId, className: "rb-input rb-input--inline" },
    operation.responses.map((response) => el("option", { value: response.code, text: statusLabel(response) })),
  );
  if (mockCode) mockSelect.value = mockCode;
  mockSelect.addEventListener("change", (event) => {
    mockCode = event.target.value;
    if (mockVisible) renderMock();
  });

  const mockButton = el("button", { type: "button", className: "rb-button rb-button--primary", text: "Generate Mock Response", disabled: !operation.responses.length });
  const mockResetButton = el("button", { type: "button", className: "rb-button rb-button--small", text: "Reset", hidden: true });
  const mockCopy = copyButton(() => mockPre.textContent, "Copy mock response");
  mockCopy.hidden = true;
  const mockMeta = el("p", { className: "rb-mock__meta" });
  const mockPre = el("pre", { className: "rb-mock__body highlight" });
  const mockOutput = el(
    "div",
    { className: "rb-mock__output", hidden: true, role: "region", "aria-label": "Mock response output" },
    el("p", { className: "rb-mock__label" }, el("strong", { text: "Mock response" }), " — No request was sent to Marketo."),
    mockMeta,
    mockPre,
  );
  // Announce explicit generation only: the output itself refreshes as the
  // request changes and would otherwise be re-read on every keystroke.
  const mockAnnouncement = el("p", { className: "rb-visually-hidden", role: "status", "aria-live": "polite" });
  mockButton.addEventListener("click", () => {
    mockVisible = true;
    renderMock();
    mockAnnouncement.textContent = `Mock ${mockCode} response generated.`;
  });
  mockResetButton.addEventListener("click", () => {
    mockVisible = false;
    mockOutput.hidden = true;
    mockResetButton.hidden = true;
    mockCopy.hidden = true;
    mockButton.textContent = "Generate Mock Response";
    mockButton.focus();
  });

  function renderMock() {
    const mock = generateRealisticResponse(operation, mockCode, currentRequest);
    const response = operation.responses.find((candidate) => candidate.code === mockCode);
    mockMeta.replaceChildren(el(
      "span",
      {},
      el("span", { className: `rb-status rb-status--${mockCode.charAt(0)}`, text: mockCode }),
      " ",
      plainText(mock.description),
      mock.source === "example" ? " · Documented example" : null,
      mock.source === "schema" ? [" · Generated from ", response.refName ? modelLink(response.refName) : "the response schema"] : null,
      mock.notes.requested.length ? ` · Includes requested fields: ${mock.notes.requested.join(", ")}` : null,
      mock.notes.defaults.length ? ` · Default fields: ${mock.notes.defaults.join(", ")}` : null,
    ));
    if (mock.body === undefined) {
      mockPre.textContent = "No response body is documented for this status.";
      mockPre.classList.add("rb-mock__body--empty");
      mockCopy.hidden = true;
    } else {
      const text = typeof mock.body === "string" ? mock.body : JSON.stringify(mock.body, null, 2);
      mockPre.classList.remove("rb-mock__body--empty");
      const code = document.createElement("code");
      code.innerHTML = highlightJson(text); // highlightJson escapes all content
      mockPre.replaceChildren(code);
      mockCopy.hidden = false;
    }
    mockOutput.hidden = false;
    mockResetButton.hidden = false;
    mockButton.textContent = "Regenerate";
  }

  const mockSection = el(
    "section",
    { className: "rb-output rb-mock", "aria-label": "Mock response" },
    el("div", { className: "rb-output__header" }, el("h3", { className: "rb-output__title", text: "Mock response" }), el("div", { className: "rb-output__tools" }, mockCopy, mockResetButton)),
    operation.responses.length
      ? el("div", { className: "rb-mock__controls" },
        // Offer a choice only when the specification documents more than one response.
        operation.responses.length > 1
          ? [el("label", { for: mockSelectId, className: "rb-mock__select-label", text: "Status" }), mockSelect]
          : el("p", { className: "rb-mock__single-status" },
            el("span", { className: "rb-mock__select-label", text: "Status" }), " ",
            el("span", { text: statusLabel(operation.responses[0]) }), " ",
            el("span", { className: "rb-note", text: "(only documented response)" })),
        mockButton)
      : el("p", { className: "rb-note", text: "No responses are documented for this operation." }),
    mockAnnouncement,
    mockOutput,
  );

  function update() {
    const request = buildRequest(operation, state);
    currentRequest = request;
    const byKey = new Map();
    for (const error of request.errors) {
      if (!byKey.has(error.key)) byKey.set(error.key, []);
      byKey.get(error.key).push(error.message);
    }
    for (const [key, { node, control }] of errorNodes) {
      const messages = byKey.get(key) || [];
      const visible = messages.length > 0 && (showAllErrors || touched.has(key));
      node.hidden = !visible;
      node.textContent = visible ? messages.join(" ") : "";
      control.setAttribute("aria-invalid", visible ? "true" : "false");
      control.closest(".rb-field")?.classList.toggle("rb-field--invalid", visible);
    }

    urlCode.textContent = request.url;
    const count = request.errors.length;
    summary.className = `rb-summary ${count ? "rb-summary--invalid" : "rb-summary--valid"}`;
    summary.textContent = count
      ? `${count} ${count === 1 ? "issue" : "issues"} to resolve${showAllErrors ? "" : " — select Generate Request to review"}.`
      : "Request is valid.";
    codeWarning.hidden = count === 0;
    codeWarning.textContent = "Incomplete: missing or invalid values are omitted from these samples.";
    renderCode();
    baseUrlNote.hidden = !request.baseUrlNotes.length;
    baseUrlNote.textContent = request.baseUrlNotes.join(" ");
    // The mock reflects the request (IDs, fields, filters, input records).
    if (mockVisible) renderMock();
    return request;
  }

  const root = el(
    "section",
    { className: "rb", "aria-labelledby": `${prefix}-title` },
    el(
      "header",
      { className: "rb__header" },
      el("h2", { className: "rb__title", id: `${prefix}-title`, text: options.title || "Request Builder" }),
      el("span", { className: "rb__mode", title: "Requests are constructed locally and never sent", text: "Mock mode" }),
    ),
    el("p", { className: "rb__notice" }, "Builds requests in your browser. Nothing is sent to Marketo and no credentials are requested."),
    operation.deprecated ? el("p", { className: "rb__deprecated", text: "This operation is marked deprecated in the specification." }) : null,
    form,
    el("div", { className: "rb-actions" }, generateButton, summary),
    requestSection,
    codeSection,
    mockSection,
  );

  container.replaceChildren(root);
  update();
  return { operation, update, root };
}
