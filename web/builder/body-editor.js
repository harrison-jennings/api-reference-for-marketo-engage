/**
 * The Request Builder's body editor: a Fields view drawn from the schema, and a
 * JSON view of the same value. The JSON text is what the request is built from,
 * so either view produces the same request. Nothing is sent anywhere.
 */

import { addItem, buildNode, isSet, nodeForMessage, readNode, removeItem, setNodeText, supportsFields } from "./body-fields.js";
import { describeType, isPlainObject } from "./schema.js";
import { el, plainText } from "./dom.js";

export { supportsFields };

const VIEW_STORAGE_KEY = "api-reference-for-marketo-engage.request-builder.body-view";
const FILTER_FROM = 7;

function storedView() {
  try {
    return window.localStorage.getItem(VIEW_STORAGE_KEY) === "json" ? "json" : "fields";
  } catch {
    return "fields";
  }
}

function storeView(view) {
  try {
    window.localStorage.setItem(VIEW_STORAGE_KEY, view);
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
}

function formatHint(schema) {
  if (schema.format === "date-time") return "Format: 2026-01-15T10:30:00Z.";
  if (schema.format === "date") return "Format: 2026-01-15.";
  return "";
}

/**
 * @param options { id, schema, resolver, text, required, rootLabel, placeholder, onChange(text) }
 * @returns { element, toggle, showErrors, focusInvalid, reset, controlInvalid }
 */
export function createBodyEditor(options) {
  const { id, schema, resolver, rootLabel, onChange } = options;
  let view = storedView();
  let tree = null;
  let slots = new Map(); // node id → { error, control, details }
  let refreshers = [];

  const parseText = (text) => {
    if (text.trim() === "") return { value: undefined };
    try {
      return { value: JSON.parse(text) };
    } catch (error) {
      return { error: `The JSON isn't valid yet: ${error.message}` };
    }
  };

  const fieldsHost = el("div", { className: "rb-fields" });
  const textarea = el("textarea", {
    id: `${id}-json`,
    className: "rb-input rb-input--code rb-input--body",
    spellcheck: "false",
    autocomplete: "off",
    "aria-label": `${options.name || "Body"} as JSON`,
    "aria-describedby": `${id}-help ${id}-error`,
    placeholder: options.placeholder || null,
  });
  const notice = el("p", { className: "rb-field__error", role: "status", hidden: true });

  function serialise() {
    const value = readNode(tree);
    const empty = value === undefined || (isPlainObject(value) && !Object.keys(value).length) || (Array.isArray(value) && !value.length);
    return empty && !options.required ? "" : JSON.stringify(value ?? {}, null, 2);
  }

  function changed() {
    refreshers.forEach((refresh) => refresh());
    const text = serialise();
    textarea.value = text;
    onChange(text);
  }

  // --- drawing ---------------------------------------------------------------

  function typeLabel(node) {
    return describeType(node.source, resolver);
  }

  function badge(node) {
    return el("span", { className: `rb-badge ${node.required ? "rb-badge--required" : "rb-badge--optional"}`, text: node.required ? "required" : "optional" });
  }

  function controlFor(node, controlId, describedBy) {
    const common = { id: controlId, "aria-describedby": describedBy, "aria-required": node.required ? "true" : null };
    const onInput = (event) => {
      setNodeText(node, event.target.value);
      changed();
    };
    if (node.kind === "raw") {
      const textarea = el("textarea", { ...common, className: "rb-input rb-input--code", rows: 4, spellcheck: "false", autocomplete: "off", placeholder: "JSON value" });
      textarea.value = node.text;
      textarea.addEventListener("input", onInput);
      return textarea;
    }
    if (node.control === "enum" || node.control === "boolean") {
      const options = node.control === "enum" ? node.schema.enum.map(String) : ["true", "false"];
      const select = el("select", { ...common, className: "rb-input" },
        el("option", { value: "", text: node.required ? "Select a value" : "Not set" }),
        options.map((option) => el("option", { value: option, text: option })));
      select.value = node.text;
      select.addEventListener("change", onInput);
      return select;
    }
    const input = el("input", {
      ...common,
      className: "rb-input",
      type: "text",
      autocomplete: "off",
      spellcheck: "false",
      inputmode: node.control === "integer" ? "numeric" : node.control === "number" ? "decimal" : null,
      placeholder: node.schema.example !== undefined ? String(node.schema.example) : null,
    });
    input.value = node.text;
    input.addEventListener("input", onInput);
    return input;
  }

  function leaf(node, details, itemLabel, remove) {
    const controlId = `${id}-n${node.id}`;
    const helpId = `${controlId}-help`;
    const errorId = `${controlId}-error`;
    const control = controlFor(node, controlId, `${helpId} ${errorId}`);
    const error = el("p", { className: "rb-field__error", id: errorId, hidden: true });
    const help = [plainText(node.schema.description), formatHint(node.schema), node.kind === "raw" ? "JSON value." : ""].filter(Boolean).join(" ");
    const row = el("div", { className: `rb-field ${node.required ? "rb-field--required" : "rb-field--optional"}` });
    slots.set(node.id, { error, control, row, details });
    const label = el("label", { for: controlId, className: "rb-field__label" },
      itemLabel
        ? el("span", { className: "rb-field__name", text: itemLabel })
        : [el("code", { className: "rb-field__name", text: node.name }), el("span", { className: "rb-field__type", text: typeLabel(node) }), badge(node)]);
    row.append(label);
    row.append(remove ? el("div", { className: "rb-item__row" }, control, remove) : control);
    if (help && !itemLabel) row.append(el("p", { className: "rb-field__help", id: helpId, text: help }));
    row.append(error);
    return row;
  }

  function objectRows(node, details) {
    const required = node.children.filter((child) => child.required);
    const optional = node.children.filter((child) => !child.required);
    const rows = required.map((child) => draw(child, details));
    if (node.extras && Object.keys(node.extras).length) {
      rows.push(el("p", { className: "rb-note", text: `Also in this body, not in the schema: ${Object.keys(node.extras).join(", ")}. Edit in JSON.` }));
    }
    if (!optional.length) return rows;
    // A short list of optional fields with nothing required beside it needs no extra click.
    if (!required.length && optional.length < FILTER_FROM) return [...rows, ...optional.map((child) => draw(child, details))];
    const set = el("span", { className: "rb-optional__set" });
    const refresh = () => {
      set.textContent = `${optional.filter(isSet).length} set`;
    };
    refreshers.push(refresh);
    refresh();
    const disclosure = el("details", { className: "rb-optional", open: optional.some(isSet) });
    disclosure.append(el("summary", { className: "rb-optional__summary" }, "Optional ", el("span", { className: "rb-optional__count", text: String(optional.length) }), set));
    const optionalRows = optional.map((child) => draw(child, [...details, disclosure]));
    const filter = optional.length >= FILTER_FROM ? el("input", {
      className: "rb-input rb-optional__filter",
      type: "search",
      autocomplete: "off",
      placeholder: `Filter ${optional.length} optional fields`,
      "aria-label": `Filter optional fields${node.name ? ` in ${node.name}` : ""}`,
    }) : null;
    filter?.addEventListener("input", (event) => {
      const terms = event.target.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
      optionalRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.hidden = !terms.every((term) => text.includes(term));
      });
    });
    disclosure.append(el("div", { className: "rb-optional__body" }, filter, optionalRows));
    return [...rows, disclosure];
  }

  function arrayBody(node, details) {
    const list = el("div", { className: "rb-items" });
    const add = el("button", { type: "button", className: "rb-button rb-button--small", text: node.name ? `Add item to ${node.name}` : "Add item" });
    function drawItems(focusItem) {
      list.replaceChildren(...node.items.map((item, index) => {
        const label = `Item ${index + 1}`;
        const remove = el("button", { type: "button", className: "rb-button rb-button--small", text: "Remove", "aria-label": `Remove ${label.toLowerCase()}${node.name ? ` from ${node.name}` : ""}` });
        remove.addEventListener("click", () => {
          removeItem(node, item);
          drawItems();
          changed();
          (list.querySelector("button[aria-label^='Remove']") || add).focus();
        });
        if (item.kind === "object") {
          return el("div", { className: "rb-item" },
            el("div", { className: "rb-item__head" }, el("span", { className: "rb-field__name", text: label }), remove),
            objectRows(item, details));
        }
        if (item.kind === "array") {
          return el("div", { className: "rb-item" },
            el("div", { className: "rb-item__head" }, el("span", { className: "rb-field__name", text: label }), remove),
            arrayBody(item, details));
        }
        return el("div", { className: "rb-item rb-item--scalar" }, leaf(item, details, label, remove));
      }));
      if (focusItem) slotFirstControl(focusItem)?.focus();
    }
    add.addEventListener("click", () => {
      const item = addItem(node, resolver);
      drawItems(item);
      changed();
    });
    drawItems();
    return [list, add];
  }

  function slotFirstControl(node) {
    if (node.kind === "scalar" || node.kind === "raw") return slots.get(node.id)?.control;
    const children = node.kind === "object" ? node.children.filter((child) => child.required).concat(node.children.filter((child) => !child.required)) : node.items;
    for (const child of children) {
      const control = slotFirstControl(child);
      if (control?.isConnected) return control;
    }
    return null;
  }

  function draw(node, details = []) {
    if (node.kind === "scalar" || node.kind === "raw") return leaf(node, details);
    const disclosure = el("details", { className: "rb-nest", open: node.required || isSet(node) });
    const count = el("span", { className: "rb-optional__set" });
    const total = node.kind === "object" ? node.children.length : null;
    const refresh = () => {
      count.textContent = node.kind === "object"
        ? `${node.children.filter(isSet).length} of ${total} set`
        : `${node.items.length} ${node.items.length === 1 ? "item" : "items"}`;
    };
    refreshers.push(refresh);
    refresh();
    const error = el("p", { className: "rb-field__error", hidden: true });
    disclosure.append(el("summary", { className: "rb-nest__summary" },
      el("code", { className: "rb-field__name", text: node.name }),
      el("span", { className: "rb-field__type", text: typeLabel(node) }),
      badge(node),
      count));
    const help = plainText(node.schema.description);
    const nested = [...details, disclosure];
    const add = () => (node.kind === "object" ? objectRows(node, nested) : arrayBody(node, nested));
    disclosure.append(el("div", { className: "rb-nest__body" }, help ? el("p", { className: "rb-field__help", text: help }) : null, error, add()));
    slots.set(node.id, { error, control: disclosure.querySelector("summary"), row: disclosure, details });
    return disclosure;
  }

  function drawTree(value) {
    slots = new Map();
    refreshers = [];
    tree = buildNode(schema, resolver, { root: true, required: options.required }, value);
    const rows = tree.kind === "object" ? objectRows(tree, []) : tree.kind === "array" ? arrayBody(tree, []) : [leaf(tree, [])];
    if (tree.kind !== "scalar" && tree.kind !== "raw") {
      const error = el("p", { className: "rb-field__error", hidden: true });
      slots.set(tree.id, { error, control: null, row: null, details: [] });
      fieldsHost.replaceChildren(error, ...rows);
    } else {
      fieldsHost.replaceChildren(...rows);
    }
  }

  // --- switching views -------------------------------------------------------

  const fieldsButton = el("button", { type: "button", className: "rb-seg__button", text: "Fields" });
  const jsonButton = el("button", { type: "button", className: "rb-seg__button", text: "JSON" });
  const toggle = el("div", { className: "rb-seg", role: "group", "aria-label": `${options.name || "Body"} editor` }, fieldsButton, jsonButton);

  function fits(value) {
    const type = schema && resolver.flatten(schema);
    if (value === undefined) return true;
    if (type.type === "array") return Array.isArray(value);
    return isPlainObject(value);
  }

  function show(next) {
    view = next;
    fieldsButton.setAttribute("aria-pressed", String(view === "fields"));
    jsonButton.setAttribute("aria-pressed", String(view === "json"));
    fieldsHost.hidden = view !== "fields";
    textarea.hidden = view !== "json";
  }

  jsonButton.addEventListener("click", () => {
    notice.hidden = true;
    storeView("json");
    show("json");
    textarea.rows = Math.min(18, Math.max(6, textarea.value.split("\n").length));
  });
  fieldsButton.addEventListener("click", () => {
    const parsed = parseText(textarea.value);
    const problem = parsed.error || (!fits(parsed.value) ? "Fields can only show this body once it's the right shape." : "");
    notice.hidden = !problem;
    notice.textContent = problem;
    if (problem) return;
    drawTree(parsed.value);
    storeView("fields");
    show("fields");
  });
  textarea.addEventListener("input", () => {
    notice.hidden = true;
    onChange(textarea.value);
  });

  function load(text) {
    const parsed = parseText(text);
    textarea.value = text;
    textarea.rows = Math.min(18, Math.max(6, text.split("\n").length));
    notice.hidden = true;
    drawTree(parsed.error || !fits(parsed.value) ? undefined : parsed.value);
  }

  load(options.text || "");
  show(view);

  return {
    element: el("div", { className: "rb-editor" }, notice, fieldsHost, textarea),
    toggle,
    control: textarea,
    reset(text) {
      load(text);
      onChange(text);
    },
    /** Show messages against their fields. Returns the ones that belong to no field. */
    showErrors(messages, reveal) {
      for (const slot of slots.values()) {
        slot.error.hidden = true;
        slot.error.textContent = "";
        slot.control?.setAttribute?.("aria-invalid", "false");
        slot.row?.classList.remove("rb-field--invalid");
      }
      if (view !== "fields") {
        textarea.setAttribute("aria-invalid", messages.length ? "true" : "false");
        return messages;
      }
      const left = [];
      for (const message of messages) {
        const node = nodeForMessage(tree, message, rootLabel);
        const slot = node && slots.get(node.id);
        if (!slot) {
          left.push(message);
          continue;
        }
        slot.error.hidden = false;
        slot.error.textContent = [slot.error.textContent, message].filter(Boolean).join(" ");
        slot.control?.setAttribute?.("aria-invalid", "true");
        slot.row?.classList.add("rb-field--invalid");
        if (reveal) slot.details.forEach((details) => { details.open = true; });
      }
      return left;
    },
    focusInvalid() {
      if (view !== "fields") {
        textarea.focus();
        return true;
      }
      for (const slot of slots.values()) {
        if (!slot.error.hidden && slot.control?.isConnected) {
          slot.control.focus();
          return true;
        }
      }
      return false;
    },
  };
}
