#!/usr/bin/env python3
"""
Build a Markdown reference for the Adobe Marketo Engage APIs from Swagger 2.0
and OpenAPI 3 specifications.

Designed for the current Adobe Marketo Engage API specifications:
- swagger-asset.json
- swagger-identity.json
- swagger-mapi.json
- swagger-user.json
- swagger-data-ingestion.json

The script is intentionally generic: it can process local Swagger 2.0 or
OpenAPI 3.x JSON files, individual files or complete directories. It can also
download the current Adobe specifications, including Data Ingestion.

Output per specification:
- one Markdown file per API operation, grouped by primary tag, linking to the
  models it uses;
- one Markdown file per shared definition/model;
- README indexes at specification, tag, model, and global levels;
- with --json-fragments, a JSON file per operation containing the operation and
  the schemas it references, which the site's Request Builder reads;
- a global manifest.json, and validation-report.md, a local log of warnings
  that is not committed.

No third-party Python packages are required.
"""

from __future__ import annotations

import argparse
import copy
import html
import json
import re
import shutil
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable, Iterator
from urllib.parse import quote, urlsplit

VERSION = "3.0.0"
HTTP_METHODS = {"get", "post", "put", "patch", "delete", "options", "head", "trace"}
ADOBE_RAW_ROOT = "https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static"
ADOBE_SPEC_SOURCES = {
    "swagger-asset.json": f"{ADOBE_RAW_ROOT}/swagger-asset.json",
    "swagger-identity.json": f"{ADOBE_RAW_ROOT}/swagger-identity.json",
    "swagger-mapi.json": f"{ADOBE_RAW_ROOT}/swagger-mapi.json",
    "swagger-user.json": f"{ADOBE_RAW_ROOT}/swagger-user.json",
    # Previously served from developer.adobe.com/marketo-apis/, which now
    # returns 404; Adobe publishes it in the repository's static directory.
    "swagger-data-ingestion.json": f"{ADOBE_RAW_ROOT}/swagger-data-ingestion.json",
}
DEFAULT_SECTION_NAMES = {
    "swagger-asset": "asset",
    "swagger-identity": "identity",
    "swagger-mapi": "core",
    "swagger-user": "user-management",
    "swagger-data-ingestion": "data-ingestion",
}


@dataclass
class WarningRecord:
    source: str
    location: str
    message: str


@dataclass
class OperationRecord:
    source: str
    section: str
    tag: str
    method: str
    path: str
    title: str
    operation_id: str
    markdown_path: str
    json_path: str | None = None


@dataclass
class BuildResult:
    source_path: Path
    source_name: str
    source_url: str | None
    section: str
    title: str
    version: str
    specification_format: str = ""
    operations: list[OperationRecord] = field(default_factory=list)
    model_count: int = 0
    tag_count: int = 0
    warnings: list[WarningRecord] = field(default_factory=list)


class BuildFailure(RuntimeError):
    pass


def slugify(value: str, fallback: str = "item") -> str:
    value = value.strip().lower()
    value = value.replace("&", " and ")
    value = re.sub(r"['’]", "", value)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or fallback


def md_escape(value: Any) -> str:
    text = "" if value is None else str(value)
    return text.replace("|", r"\|").replace("\n", "<br>")


def clean_description(value: Any) -> str:
    """Preserve useful inline HTML while normalising line endings."""
    if not isinstance(value, str):
        return ""
    return value.replace("\r\n", "\n").replace("\r", "\n").strip()


def source_url_for(filename: str) -> str | None:
    return ADOBE_SPEC_SOURCES.get(filename)


def section_name_for(path: Path) -> str:
    stem = path.stem
    return DEFAULT_SECTION_NAMES.get(stem, slugify(stem.removeprefix("swagger-"), "api"))


def ref_name(ref: str) -> str:
    return ref.rsplit("/", 1)[-1]


def decode_json_pointer_token(token: str) -> str:
    return token.replace("~1", "/").replace("~0", "~")


def resolve_local_ref(spec: dict[str, Any], ref: str) -> Any:
    if not ref.startswith("#/"):
        return None
    current: Any = spec
    for token in ref[2:].split("/"):
        token = decode_json_pointer_token(token)
        if not isinstance(current, dict) or token not in current:
            return None
        current = current[token]
    return current


def dereference_component(
    spec: dict[str, Any],
    value: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
    seen: tuple[str, ...] = (),
) -> Any:
    if not isinstance(value, dict) or "$ref" not in value:
        return value

    ref = str(value["$ref"])
    if not ref.startswith("#/"):
        warnings.append(WarningRecord(source_name, location, f"External reference not resolved: {ref}"))
        return value
    if ref in seen:
        warnings.append(WarningRecord(source_name, location, f"Circular component reference: {ref}"))
        return value

    target = resolve_local_ref(spec, ref)
    if target is None:
        warnings.append(WarningRecord(source_name, location, f"Unresolved local reference: {ref}"))
        return value

    resolved = dereference_component(
        spec,
        target,
        warnings,
        source_name,
        location,
        seen + (ref,),
    )
    if isinstance(resolved, dict):
        merged = copy.deepcopy(resolved)
        merged.update({key: copy.deepcopy(child) for key, child in value.items() if key != "$ref"})
        return merged
    return resolved



OAS3_REF_PREFIXES = {
    "#/components/schemas/": "#/definitions/",
    "#/components/parameters/": "#/parameters/",
    "#/components/responses/": "#/responses/",
    "#/components/securitySchemes/": "#/securityDefinitions/",
}

PARAMETER_SCHEMA_KEYS = {
    "type", "format", "items", "enum", "default", "minimum", "maximum",
    "exclusiveMinimum", "exclusiveMaximum", "minLength", "maxLength",
    "minItems", "maxItems", "pattern", "multipleOf", "uniqueItems",
    "nullable", "readOnly", "writeOnly", "example",
}


def rewrite_oas3_refs(value: Any) -> Any:
    """Rewrite OpenAPI 3 component references to the internal Swagger 2 layout."""
    if isinstance(value, dict):
        output: dict[str, Any] = {}
        for key, child in value.items():
            if key == "$ref" and isinstance(child, str):
                rewritten = child
                for old_prefix, new_prefix in OAS3_REF_PREFIXES.items():
                    if child.startswith(old_prefix):
                        rewritten = new_prefix + child[len(old_prefix):]
                        break
                output[key] = rewritten
            else:
                output[key] = rewrite_oas3_refs(child)
        return output
    if isinstance(value, list):
        return [rewrite_oas3_refs(child) for child in value]
    return copy.deepcopy(value)


def choose_media_type(content: Any) -> tuple[str | None, dict[str, Any]]:
    """Choose the most useful representation while retaining all media types."""
    if not isinstance(content, dict) or not content:
        return None, {}
    keys = [str(key) for key in content]
    preferences = (
        "application/json",
        "application/problem+json",
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/json",
        "text/plain",
    )
    selected: str | None = None
    for preferred in preferences:
        if preferred in content:
            selected = preferred
            break
    if selected is None:
        selected = next((key for key in keys if "+json" in key.lower()), keys[0])
    media = content.get(selected)
    return selected, media if isinstance(media, dict) else {}


def resolve_server_url(server: Any) -> str:
    if not isinstance(server, dict):
        return ""
    url = str(server.get("url", ""))
    variables = server.get("variables", {})
    if isinstance(variables, dict):
        for name, definition in variables.items():
            default = definition.get("default", name) if isinstance(definition, dict) else name
            url = url.replace("{" + str(name) + "}", str(default))
    return url


def normalise_oas3_header(header: Any) -> dict[str, Any]:
    if not isinstance(header, dict):
        return {}
    schema = header.get("schema", {})
    result = {
        key: copy.deepcopy(value)
        for key, value in header.items()
        if key not in {"schema", "content"}
    }
    if isinstance(schema, dict):
        result.update({key: rewrite_oas3_refs(value) for key, value in schema.items()})
    if isinstance(header.get("content"), dict):
        _, media = choose_media_type(header["content"])
        media_schema = media.get("schema", {}) if isinstance(media, dict) else {}
        if isinstance(media_schema, dict):
            result.update(rewrite_oas3_refs(media_schema))
    return result


def normalise_oas3_parameter(
    raw_spec: dict[str, Any],
    parameter: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> dict[str, Any] | None:
    if not isinstance(parameter, dict):
        warnings.append(WarningRecord(source_name, location, "Ignored non-object OpenAPI parameter."))
        return None
    resolved = dereference_component(raw_spec, parameter, warnings, source_name, location)
    if not isinstance(resolved, dict):
        return None

    result = {
        key: copy.deepcopy(value)
        for key, value in resolved.items()
        if key not in {"schema", "content", "style", "explode", "allowReserved", "examples"}
    }
    schema = resolved.get("schema")
    if not isinstance(schema, dict) and isinstance(resolved.get("content"), dict):
        _, media = choose_media_type(resolved["content"])
        schema = media.get("schema", {}) if isinstance(media, dict) else {}
    if isinstance(schema, dict):
        rewritten_schema = rewrite_oas3_refs(schema)
        result.update({key: copy.deepcopy(value) for key, value in rewritten_schema.items()})
    if "example" in resolved:
        result["example"] = copy.deepcopy(resolved["example"])
    if "style" in resolved:
        result["x-oas3-style"] = resolved["style"]
    if "explode" in resolved:
        result["x-oas3-explode"] = resolved["explode"]
    if resolved.get("allowReserved"):
        result["x-oas3-allowReserved"] = True
    return rewrite_oas3_refs(result)


def normalise_oas3_request_body(
    raw_spec: dict[str, Any],
    request_body: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> tuple[dict[str, Any] | None, list[str]]:
    if not isinstance(request_body, dict):
        return None, []
    resolved = dereference_component(raw_spec, request_body, warnings, source_name, location)
    if not isinstance(resolved, dict):
        return None, []
    content = resolved.get("content", {})
    if not isinstance(content, dict) or not content:
        warnings.append(WarningRecord(source_name, location, "Request body did not contain any media types."))
        return None, []

    selected_type, media = choose_media_type(content)
    schema = media.get("schema", {}) if isinstance(media, dict) else {}
    schema = rewrite_oas3_refs(schema) if isinstance(schema, dict) else {}

    example = None
    if isinstance(media, dict):
        if "example" in media:
            example = media["example"]
        elif isinstance(media.get("examples"), dict):
            for entry in media["examples"].values():
                if isinstance(entry, dict) and "value" in entry:
                    example = entry["value"]
                    break
                if not isinstance(entry, dict):
                    example = entry
                    break
    if example is not None and isinstance(schema, dict):
        schema = copy.deepcopy(schema)
        schema.setdefault("example", copy.deepcopy(example))

    parameter = {
        "name": "requestBody",
        "in": "body",
        "description": resolved.get("description", ""),
        "required": bool(resolved.get("required", False)),
        "schema": schema,
    }
    if selected_type:
        parameter["x-selected-content-type"] = selected_type
    return parameter, [str(key) for key in content]


def normalise_oas3_response(
    raw_spec: dict[str, Any],
    response: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> tuple[dict[str, Any], list[str]]:
    if not isinstance(response, dict):
        return {}, []
    resolved = dereference_component(raw_spec, response, warnings, source_name, location)
    if not isinstance(resolved, dict):
        return {}, []

    output: dict[str, Any] = {"description": resolved.get("description", "")}
    headers = resolved.get("headers")
    if isinstance(headers, dict):
        output["headers"] = {
            str(name): normalise_oas3_header(value)
            for name, value in headers.items()
            if isinstance(value, dict)
        }

    content = resolved.get("content", {})
    media_types = [str(key) for key in content] if isinstance(content, dict) else []
    selected_type, media = choose_media_type(content)
    if selected_type and isinstance(media, dict):
        schema = media.get("schema")
        if isinstance(schema, dict):
            output["schema"] = rewrite_oas3_refs(schema)

        example_value = None
        if "example" in media:
            example_value = media["example"]
        elif isinstance(media.get("examples"), dict):
            named_examples: dict[str, Any] = {}
            for name, entry in media["examples"].items():
                if isinstance(entry, dict) and "value" in entry:
                    named_examples[str(name)] = entry["value"]
                elif not isinstance(entry, dict):
                    named_examples[str(name)] = entry
            if named_examples:
                example_value = named_examples
        if example_value is not None:
            output["examples"] = {selected_type: copy.deepcopy(example_value)}

    if "links" in resolved:
        output["x-oas3-links"] = rewrite_oas3_refs(resolved["links"])
    return output, media_types


def normalise_openapi3(
    raw_spec: dict[str, Any],
    warnings: list[WarningRecord],
    source_name: str,
) -> dict[str, Any]:
    """Convert OpenAPI 3.x into the internal Swagger-2-like representation."""
    output: dict[str, Any] = {
        "swagger": "2.0",
        "x-original-openapi": raw_spec.get("openapi"),
        "info": copy.deepcopy(raw_spec.get("info", {})),
        "tags": copy.deepcopy(raw_spec.get("tags", [])),
        "paths": {},
    }
    for key in ("externalDocs", "security"):
        if key in raw_spec:
            output[key] = rewrite_oas3_refs(raw_spec[key])

    servers = raw_spec.get("servers", [])
    if isinstance(servers, list) and servers:
        output["x-servers"] = copy.deepcopy(servers)
        server_url = resolve_server_url(servers[0])
        if server_url:
            parsed = urlsplit(server_url)
            if parsed.scheme and parsed.netloc:
                output["schemes"] = [parsed.scheme]
                output["host"] = parsed.netloc
                output["basePath"] = parsed.path or "/"
            elif server_url.startswith("/"):
                output["basePath"] = server_url.rstrip("/") or "/"

    components = raw_spec.get("components", {})
    if not isinstance(components, dict):
        components = {}
    schemas = components.get("schemas", {})
    output["definitions"] = rewrite_oas3_refs(schemas) if isinstance(schemas, dict) else {}

    security_schemes = components.get("securitySchemes", {})
    if isinstance(security_schemes, dict):
        output["securityDefinitions"] = rewrite_oas3_refs(security_schemes)

    component_parameters = components.get("parameters", {})
    if isinstance(component_parameters, dict):
        output["parameters"] = {}
        for name, value in component_parameters.items():
            normalised = normalise_oas3_parameter(
                raw_spec, value, warnings, source_name, f"components/parameters/{name}"
            )
            if normalised is not None:
                output["parameters"][str(name)] = normalised

    component_responses = components.get("responses", {})
    if isinstance(component_responses, dict):
        output["responses"] = {}
        for name, value in component_responses.items():
            normalised, _ = normalise_oas3_response(
                raw_spec, value, warnings, source_name, f"components/responses/{name}"
            )
            output["responses"][str(name)] = normalised

    paths = raw_spec.get("paths", {})
    if not isinstance(paths, dict):
        return output

    for path, raw_path_item in paths.items():
        if not isinstance(raw_path_item, dict):
            warnings.append(WarningRecord(source_name, f"paths/{path}", "Ignored non-object path item."))
            continue
        path_item = dereference_component(
            raw_spec, raw_path_item, warnings, source_name, f"paths/{path}"
        )
        if not isinstance(path_item, dict):
            continue
        converted_path: dict[str, Any] = {}

        path_parameters: list[dict[str, Any]] = []
        for index, parameter in enumerate(path_item.get("parameters", []) or []):
            normalised = normalise_oas3_parameter(
                raw_spec,
                parameter,
                warnings,
                source_name,
                f"paths/{path}/parameters/{index}",
            )
            if normalised is not None:
                path_parameters.append(normalised)
        if path_parameters:
            converted_path["parameters"] = path_parameters

        for method, raw_operation in path_item.items():
            method_lower = str(method).lower()
            if method_lower not in HTTP_METHODS:
                continue
            if not isinstance(raw_operation, dict):
                continue

            operation = {
                key: rewrite_oas3_refs(value)
                for key, value in raw_operation.items()
                if key not in {"parameters", "requestBody", "responses", "callbacks", "servers"}
            }
            operation_parameters: list[dict[str, Any]] = []
            for index, parameter in enumerate(raw_operation.get("parameters", []) or []):
                normalised = normalise_oas3_parameter(
                    raw_spec,
                    parameter,
                    warnings,
                    source_name,
                    f"paths/{path}/{method_lower}/parameters/{index}",
                )
                if normalised is not None:
                    operation_parameters.append(normalised)

            consumes: list[str] = []
            request_body, request_media_types = normalise_oas3_request_body(
                raw_spec,
                raw_operation.get("requestBody"),
                warnings,
                source_name,
                f"paths/{path}/{method_lower}/requestBody",
            )
            if request_body is not None:
                operation_parameters.append(request_body)
                consumes.extend(request_media_types)
            if operation_parameters:
                operation["parameters"] = operation_parameters
            if consumes:
                operation["consumes"] = list(dict.fromkeys(consumes))

            raw_responses = raw_operation.get("responses", {})
            converted_responses: dict[str, Any] = {}
            produces: list[str] = []
            if isinstance(raw_responses, dict):
                for status, response in raw_responses.items():
                    normalised_response, response_media_types = normalise_oas3_response(
                        raw_spec,
                        response,
                        warnings,
                        source_name,
                        f"paths/{path}/{method_lower}/responses/{status}",
                    )
                    converted_responses[str(status)] = normalised_response
                    produces.extend(response_media_types)
            operation["responses"] = converted_responses
            if produces:
                operation["produces"] = list(dict.fromkeys(produces))

            if raw_operation.get("callbacks"):
                warnings.append(
                    WarningRecord(
                        source_name,
                        f"paths/{path}/{method_lower}/callbacks",
                        "OpenAPI callbacks are retained only in the source specification and were not expanded.",
                    )
                )
            if raw_operation.get("servers"):
                operation["x-oas3-servers"] = copy.deepcopy(raw_operation["servers"])
            converted_path[method_lower] = operation

        output["paths"][str(path)] = converted_path

    return output


def normalise_specification(
    raw_spec: dict[str, Any],
    warnings: list[WarningRecord],
    source_name: str,
) -> tuple[dict[str, Any], str]:
    swagger_version = raw_spec.get("swagger")
    if swagger_version == "2.0":
        return copy.deepcopy(raw_spec), "Swagger 2.0"
    openapi_version = raw_spec.get("openapi")
    if isinstance(openapi_version, str) and openapi_version.startswith("3."):
        return normalise_openapi3(raw_spec, warnings, source_name), f"OpenAPI {openapi_version}"
    version = openapi_version or swagger_version or "unknown"
    raise BuildFailure(
        f"{source_name}: unsupported specification version {version!r}; "
        "Swagger 2.0 and OpenAPI 3.x are supported."
    )

def merge_schema(
    spec: dict[str, Any],
    schema: Any,
    seen: tuple[str, ...] = (),
) -> dict[str, Any]:
    """Resolve local model refs and flatten common allOf composition."""
    if not isinstance(schema, dict):
        return {}

    if "$ref" in schema:
        ref = str(schema["$ref"])
        if ref in seen:
            return {"$ref": ref}
        target = resolve_local_ref(spec, ref)
        if target is None:
            return copy.deepcopy(schema)
        merged = merge_schema(spec, target, seen + (ref,))
        merged.update({key: copy.deepcopy(value) for key, value in schema.items() if key != "$ref"})
        return merged

    all_of = schema.get("allOf")
    if isinstance(all_of, list):
        result: dict[str, Any] = {}
        properties: dict[str, Any] = {}
        required: list[str] = []

        for part in all_of:
            flattened = merge_schema(spec, part, seen)
            for key, value in flattened.items():
                if key == "properties" and isinstance(value, dict):
                    properties.update(value)
                elif key == "required" and isinstance(value, list):
                    for item in value:
                        if item not in required:
                            required.append(item)
                elif key != "allOf":
                    result[key] = value

        for key, value in schema.items():
            if key == "allOf":
                continue
            if key == "properties" and isinstance(value, dict):
                properties.update(value)
            elif key == "required" and isinstance(value, list):
                for item in value:
                    if item not in required:
                        required.append(item)
            else:
                result[key] = copy.deepcopy(value)

        if properties:
            result["properties"] = properties
        if required:
            result["required"] = required
        return result

    return copy.deepcopy(schema)


def schema_type(schema: Any) -> str:
    if not isinstance(schema, dict):
        return "unknown"
    if "$ref" in schema:
        return ref_name(str(schema["$ref"]))
    if "allOf" in schema:
        refs = [
            ref_name(str(part["$ref"]))
            for part in schema.get("allOf", [])
            if isinstance(part, dict) and "$ref" in part
        ]
        return " + ".join(refs) if refs else "object"
    value = str(schema.get("type", "object"))
    if value == "array":
        # "array of X", not "array<X>": Markdown passes <X> through as an HTML tag.
        return f"array of {schema_type(schema.get('items', {}))}"
    fmt = schema.get("format")
    return f"{value} ({fmt})" if fmt else value


def schema_constraints(schema: Any) -> str:
    if not isinstance(schema, dict):
        return ""
    parts: list[str] = []
    if "enum" in schema and isinstance(schema["enum"], list):
        parts.append("enum: " + ", ".join(map(str, schema["enum"])))
    if "default" in schema:
        parts.append(f"default: {schema['default']}")
    if "minimum" in schema:
        parts.append(f"minimum: {schema['minimum']}")
    if "maximum" in schema:
        parts.append(f"maximum: {schema['maximum']}")
    if "minLength" in schema:
        parts.append(f"min length: {schema['minLength']}")
    if "maxLength" in schema:
        parts.append(f"max length: {schema['maxLength']}")
    if "minItems" in schema:
        parts.append(f"min items: {schema['minItems']}")
    if "maxItems" in schema:
        parts.append(f"max items: {schema['maxItems']}")
    if "pattern" in schema:
        parts.append(f"pattern: `{schema['pattern']}`")
    if "collectionFormat" in schema:
        parts.append(f"collection format: {schema['collectionFormat']}")
    if schema.get("uniqueItems"):
        parts.append("unique items")
    return "; ".join(parts)


def parameter_schema(parameter: dict[str, Any]) -> dict[str, Any]:
    if parameter.get("in") == "body":
        return parameter.get("schema", {}) if isinstance(parameter.get("schema"), dict) else {}
    keys = {
        "type", "format", "items", "enum", "default", "minimum", "maximum",
        "minLength", "maxLength", "minItems", "maxItems", "pattern",
        "collectionFormat", "example", "uniqueItems",
    }
    return {key: parameter[key] for key in keys if key in parameter}


def collect_refs(value: Any, found: set[str] | None = None) -> set[str]:
    found = found if found is not None else set()
    if isinstance(value, dict):
        ref = value.get("$ref")
        if isinstance(ref, str) and ref.startswith("#/definitions/"):
            found.add(ref_name(ref))
        for child in value.values():
            collect_refs(child, found)
    elif isinstance(value, list):
        for child in value:
            collect_refs(child, found)
    return found


def collect_external_refs(value: Any, found: set[str] | None = None) -> set[str]:
    found = found if found is not None else set()
    if isinstance(value, dict):
        ref = value.get("$ref")
        if isinstance(ref, str) and not ref.startswith("#/"):
            found.add(ref)
        for child in value.values():
            collect_external_refs(child, found)
    elif isinstance(value, list):
        for child in value:
            collect_external_refs(child, found)
    return found


def collect_definition_closure(spec: dict[str, Any], initial: Iterable[str]) -> set[str]:
    definitions = spec.get("definitions", {})
    if not isinstance(definitions, dict):
        return set()
    pending = list(initial)
    found: set[str] = set()
    while pending:
        name = pending.pop()
        if name in found:
            continue
        if name not in definitions:
            continue
        found.add(name)
        for child in collect_refs(definitions[name]):
            if child not in found:
                pending.append(child)
    return found


def sample_string(schema: dict[str, Any], property_name: str = "") -> str:
    fmt = str(schema.get("format", "")).lower()
    lower = property_name.lower()
    if fmt == "date-time":
        return "2026-01-15T10:30:00Z"
    if fmt == "date":
        return "2026-01-15"
    if fmt in {"byte", "binary"}:
        return "<binary data>"
    if fmt == "email" or "email" in lower or "userid" == lower:
        return "person@example.com"
    if fmt in {"uri", "url"} or "url" in lower:
        return "https://example.com"
    if lower == "id" or lower.endswith("id"):
        return "123"
    if "token" in lower:
        return "example-token"
    if "name" in lower:
        return "Example name"
    return "string"


def sample_from_schema(
    spec: dict[str, Any],
    schema: Any,
    *,
    property_name: str = "",
    depth: int = 0,
    seen_refs: tuple[str, ...] = (),
) -> Any:
    if depth > 10 or not isinstance(schema, dict):
        return None

    if "example" in schema:
        return schema["example"]
    if "default" in schema:
        return schema["default"]
    enum = schema.get("enum")
    if isinstance(enum, list) and enum:
        return enum[0]

    if "$ref" in schema:
        ref = str(schema["$ref"])
        if not ref.startswith("#/"):
            return f"<external:{ref}>"
        if ref in seen_refs:
            return f"<circular:{ref_name(ref)}>"
        target = resolve_local_ref(spec, ref)
        if target is None:
            return f"<unresolved:{ref_name(ref)}>"
        return sample_from_schema(
            spec,
            target,
            property_name=property_name,
            depth=depth + 1,
            seen_refs=seen_refs + (ref,),
        )

    if isinstance(schema.get("allOf"), list):
        combined: dict[str, Any] = {}
        for part in schema["allOf"]:
            sample = sample_from_schema(
                spec,
                part,
                property_name=property_name,
                depth=depth + 1,
                seen_refs=seen_refs,
            )
            if isinstance(sample, dict):
                combined.update(sample)
        own = {key: value for key, value in schema.items() if key != "allOf"}
        if own:
            sample = sample_from_schema(
                spec,
                own,
                property_name=property_name,
                depth=depth + 1,
                seen_refs=seen_refs,
            )
            if isinstance(sample, dict):
                combined.update(sample)
        return combined

    value_type = schema.get("type")
    if value_type is None and ("properties" in schema or "additionalProperties" in schema):
        value_type = "object"

    if value_type == "object" or "properties" in schema:
        properties = schema.get("properties", {})
        result: dict[str, Any] = {}
        if isinstance(properties, dict):
            for name, child in properties.items():
                result[name] = sample_from_schema(
                    spec,
                    child,
                    property_name=name,
                    depth=depth + 1,
                    seen_refs=seen_refs,
                )
        additional = schema.get("additionalProperties")
        if not result and isinstance(additional, dict):
            result["key"] = sample_from_schema(
                spec,
                additional,
                property_name="value",
                depth=depth + 1,
                seen_refs=seen_refs,
            )
        return result

    if value_type == "array":
        return [
            sample_from_schema(
                spec,
                schema.get("items", {}),
                property_name=property_name,
                depth=depth + 1,
                seen_refs=seen_refs,
            )
        ]
    if value_type == "file":
        return "<file>"
    if value_type in {"integer", "number"}:
        return 123
    if value_type == "boolean":
        return True
    if value_type == "string" or value_type is None:
        return sample_string(schema, property_name)
    return None


def json_block(value: Any) -> list[str]:
    return ["```json", json.dumps(value, indent=2, ensure_ascii=False), "```"]


def model_link(name: str, from_operation: bool = True) -> str:
    prefix = "../models" if from_operation else "."
    return f"[`{name}`]({prefix}/{slugify(name)}.md)"


def linked_schema_type(schema: Any, from_operation: bool = True) -> str:
    """schema_type as Markdown, with referenced models linked to their pages."""
    if isinstance(schema, dict) and "$ref" in schema:
        return model_link(ref_name(str(schema["$ref"])), from_operation)
    if isinstance(schema, dict) and "allOf" in schema:
        refs = [
            ref_name(str(part["$ref"]))
            for part in schema.get("allOf", [])
            if isinstance(part, dict) and "$ref" in part
        ]
        if refs:
            return " + ".join(model_link(ref, from_operation) for ref in refs)
    if isinstance(schema, dict) and schema.get("type") == "array":
        return f"array of {linked_schema_type(schema.get('items', {}), from_operation)}"
    return schema_type(schema)


def render_model_references(names: Iterable[str], from_operation: bool = True) -> list[str]:
    values = sorted(set(names), key=str.casefold)
    if not values:
        return []
    return [
        "### Referenced models",
        "",
        *[f"- {model_link(name, from_operation)}" for name in values],
        "",
    ]


def resolve_parameter(
    spec: dict[str, Any],
    parameter: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> dict[str, Any] | None:
    if not isinstance(parameter, dict):
        warnings.append(WarningRecord(source_name, location, "Ignored non-object parameter."))
        return None
    resolved = dereference_component(spec, parameter, warnings, source_name, location)
    return resolved if isinstance(resolved, dict) else None


def combine_parameters(
    spec: dict[str, Any],
    path_item: dict[str, Any],
    operation: dict[str, Any],
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> list[dict[str, Any]]:
    combined: dict[tuple[str, str], dict[str, Any]] = {}
    order: list[tuple[str, str]] = []
    raw_parameters = list(path_item.get("parameters", []) or []) + list(operation.get("parameters", []) or [])

    for index, raw_parameter in enumerate(raw_parameters):
        parameter = resolve_parameter(
            spec,
            raw_parameter,
            warnings,
            source_name,
            f"{location}/parameters/{index}",
        )
        if parameter is None:
            continue
        key = (str(parameter.get("in", "")), str(parameter.get("name", "")))
        if key not in combined:
            order.append(key)
        combined[key] = parameter
    return [combined[key] for key in order]


def resolve_response(
    spec: dict[str, Any],
    response: Any,
    warnings: list[WarningRecord],
    source_name: str,
    location: str,
) -> dict[str, Any]:
    if not isinstance(response, dict):
        return {}
    resolved = dereference_component(spec, response, warnings, source_name, location)
    return resolved if isinstance(resolved, dict) else {}


def render_parameter_table(parameters: list[dict[str, Any]]) -> list[str]:
    lines = [
        "| Name | Type | Required | Description | Constraints |",
        "|---|---|:---:|---|---|",
    ]
    for parameter in parameters:
        schema = parameter_schema(parameter)
        lines.append(
            "| `{name}` | {type_} | {required} | {description} | {constraints} |".format(
                name=md_escape(parameter.get("name", "")),
                type_=md_escape(linked_schema_type(schema)),
                required="Yes" if parameter.get("required") else "No",
                description=md_escape(parameter.get("description", "")),
                constraints=md_escape(schema_constraints(schema)),
            )
        )
    return lines


def placeholder_for_parameter(parameter: dict[str, Any]) -> str:
    schema = parameter_schema(parameter)
    if "default" in schema:
        return str(schema["default"])
    enum = schema.get("enum")
    if isinstance(enum, list) and enum:
        return str(enum[0])
    name = str(parameter.get("name", "value"))
    return f"{{{{{name}}}}}"



def template_variable(value: str, fallback: str = "value") -> str:
    cleaned = re.sub(r"[^A-Za-z0-9]+", "_", value).strip("_").lower()
    return cleaned or fallback


def security_example_parts(
    spec: dict[str, Any],
    operation: dict[str, Any],
) -> tuple[list[str], list[tuple[str, str]]]:
    """Return example authentication headers and query parameters."""
    security = operation.get("security", spec.get("security"))
    definitions = spec.get("securityDefinitions", {})
    if not isinstance(security, list) or not security or not isinstance(definitions, dict):
        return [], []

    requirement = security[0]
    if not isinstance(requirement, dict):
        return [], []

    headers: list[str] = []
    query: list[tuple[str, str]] = []
    for scheme_name in requirement:
        scheme = definitions.get(scheme_name, {})
        if not isinstance(scheme, dict):
            continue
        scheme_type = str(scheme.get("type", "")).lower()
        variable = template_variable(str(scheme.get("name") or scheme_name), "access_token")

        if scheme_type == "apikey":
            parameter_name = str(scheme.get("name") or scheme_name)
            location = str(scheme.get("in", "header")).lower()
            value = f"{{{{{variable}}}}}"
            if location == "query":
                query.append((parameter_name, value))
            else:
                headers.append(f"{parameter_name}: {value}")
        elif scheme_type == "oauth2":
            headers.append("Authorization: Bearer {{access_token}}")
        elif scheme_type == "basic":
            headers.append("Authorization: Basic {{basic_credentials}}")
        elif scheme_type == "http":
            http_scheme = str(scheme.get("scheme", "")).lower()
            if http_scheme == "bearer":
                headers.append("Authorization: Bearer {{access_token}}")
            elif http_scheme == "basic":
                headers.append("Authorization: Basic {{basic_credentials}}")
            else:
                headers.append(f"Authorization: {{{{{variable}}}}}")
        elif scheme_type in {"openidconnect", "mutualtls"}:
            headers.append("Authorization: Bearer {{access_token}}")

    return list(dict.fromkeys(headers)), list(dict.fromkeys(query))

def request_example(
    spec: dict[str, Any],
    operation: dict[str, Any],
    path: str,
    method: str,
    parameters: list[dict[str, Any]],
    consumes: list[str],
    produces: list[str],
) -> list[str]:
    rendered_path = re.sub(r"\{([^{}]+)\}", r"{{\1}}", path)
    security_headers, security_query = security_example_parts(spec, operation)
    query_parameters = [parameter for parameter in parameters if parameter.get("in") == "query"]
    query_parts: list[str] = []
    for name, value in security_query:
        query_parts.append(f"{quote(name)}={value}")
    for parameter in query_parameters:
        name = quote(str(parameter.get("name", "parameter")))
        query_parts.append(f"{name}={placeholder_for_parameter(parameter)}")
    if query_parts:
        rendered_path += "?" + "&".join(query_parts)

    host = str(spec.get("host", ""))
    base_path = str(spec.get("basePath", "")).rstrip("/")
    if host and host != "localhost:8080":
        schemes = spec.get("schemes") or ["https"]
        scheme = str(schemes[0])
        url = f"{scheme}://{host}{base_path}{rendered_path}"
    else:
        url = f"{{{{base_url}}}}{base_path}{rendered_path}"

    lines = ["```http", f"{method.upper()} {url}"]

    explicit_header_names = {
        str(parameter.get("name", "")).lower()
        for parameter in parameters
        if parameter.get("in") == "header"
    }
    for header in security_headers:
        header_name = header.split(":", 1)[0].strip().lower()
        if header_name not in explicit_header_names:
            lines.append(header)

    for parameter in parameters:
        if parameter.get("in") == "header":
            name = str(parameter.get("name", "Header"))
            lines.append(f"{name}: {placeholder_for_parameter(parameter)}")

    cookie_parameters = [parameter for parameter in parameters if parameter.get("in") == "cookie"]
    if cookie_parameters:
        cookie_value = "; ".join(
            f"{parameter.get('name', 'cookie')}={placeholder_for_parameter(parameter)}"
            for parameter in cookie_parameters
        )
        lines.append(f"Cookie: {cookie_value}")

    body_parameter = next((parameter for parameter in parameters if parameter.get("in") == "body"), None)
    form_parameters = [parameter for parameter in parameters if parameter.get("in") == "formData"]

    if body_parameter or form_parameters:
        if consumes:
            lines.append(f"Content-Type: {consumes[0]}")
    if produces:
        lines.append(f"Accept: {produces[0]}")

    if body_parameter:
        lines.append("")
        sample = sample_from_schema(spec, body_parameter.get("schema", {}))
        if consumes and "json" not in consumes[0].lower() and isinstance(sample, str):
            lines.append(sample)
        else:
            lines.append(json.dumps(sample, indent=2, ensure_ascii=False))
    elif form_parameters:
        lines.append("")
        for parameter in form_parameters:
            name = str(parameter.get("name", "field"))
            if parameter.get("type") == "file":
                lines.append(f"{name}=@./path/to/file")
            else:
                lines.append(f"{name}={placeholder_for_parameter(parameter)}")

    lines.append("```")
    return lines


def operation_filename(
    operation: dict[str, Any],
    method: str,
    path: str,
    used: set[str],
) -> str:
    base = operation.get("summary") or operation.get("operationId") or f"{method}-{path}"
    stem = slugify(str(base), f"{method}-operation")
    candidate = stem
    counter = 2
    while candidate in used:
        candidate = f"{stem}-{counter}"
        counter += 1
    used.add(candidate)
    return candidate + ".md"


def render_badges(operation: dict[str, Any]) -> list[str]:
    badges = operation.get("x-badges")
    if not isinstance(badges, list) or not badges:
        return []
    names = [str(item.get("name")) for item in badges if isinstance(item, dict) and item.get("name")]
    if not names:
        return []
    return [f"**Badges:** {', '.join(f'`{name}`' for name in names)}  "]


def render_actual_response_examples(response: dict[str, Any]) -> list[str]:
    examples = response.get("examples")
    if not isinstance(examples, dict) or not examples:
        return []
    lines = ["#### Source examples", ""]
    for content_type, value in examples.items():
        lines.append(f"**{content_type}**")
        lines.append("")
        if isinstance(value, (dict, list)):
            lines.extend(json_block(value))
        else:
            language = "json" if "json" in str(content_type).lower() else "text"
            lines.extend([f"```{language}", str(value), "```"])
        lines.append("")
    return lines


def render_operation(
    spec: dict[str, Any],
    path: str,
    method: str,
    path_item: dict[str, Any],
    operation: dict[str, Any],
    source_name: str,
    source_url: str | None,
    warnings: list[WarningRecord],
) -> tuple[str, set[str]]:
    title = str(operation.get("summary") or operation.get("operationId") or f"{method.upper()} {path}")
    description = clean_description(operation.get("description", ""))
    operation_id = str(operation.get("operationId", ""))
    tags = operation.get("tags") or ["Untagged"]
    consumes = [str(item) for item in (operation.get("consumes") or spec.get("consumes") or [])]
    produces = [str(item) for item in (operation.get("produces") or spec.get("produces") or [])]
    location = f"paths/{path}/{method}"
    parameters = combine_parameters(spec, path_item, operation, warnings, source_name, location)
    all_refs: set[str] = set()

    lines: list[str] = [
        f"# {title}",
        "",
        f"**Method:** `{method.upper()}`  ",
        f"**Path:** `{path}`  ",
        f"**Tag:** {', '.join(map(str, tags))}  ",
    ]
    if operation_id:
        lines.append(f"**Operation ID:** `{operation_id}`  ")
    if operation.get("deprecated"):
        lines.append("**Deprecated:** Yes  ")
    lines.extend(render_badges(operation))
    lines.append("")

    if description:
        lines.extend([description, ""])

    external_refs = collect_external_refs(operation)
    for ref in sorted(external_refs):
        warnings.append(WarningRecord(source_name, location, f"External reference not resolved: {ref}"))

    lines.extend(["## Formats", ""])
    lines.append(f"- **Request:** {', '.join(f'`{item}`' for item in consumes) if consumes else 'Not specified'}")
    lines.append(f"- **Response:** {', '.join(f'`{item}`' for item in produces) if produces else 'Not specified'}")
    lines.append("")

    security = operation.get("security", spec.get("security"))
    if security is not None:
        lines.extend(["## Security", "", "```json", json.dumps(security, indent=2), "```", ""])

    lines.extend(["## Request", ""])
    non_body_groups = [
        ("Path parameters", "path"),
        ("Query parameters", "query"),
        ("Header parameters", "header"),
        ("Cookie parameters", "cookie"),
        ("Form-data parameters", "formData"),
    ]
    any_parameters = False
    for heading, parameter_location in non_body_groups:
        group = [parameter for parameter in parameters if parameter.get("in") == parameter_location]
        if group:
            any_parameters = True
            lines.extend([f"### {heading}", "", *render_parameter_table(group), ""])

    body_parameters = [parameter for parameter in parameters if parameter.get("in") == "body"]
    if body_parameters:
        any_parameters = True
        for body_parameter in body_parameters:
            schema = body_parameter.get("schema", {})
            refs = collect_refs(schema)
            all_refs.update(refs)
            lines.extend([
                "### Request body",
                "",
                f"**Name:** `{body_parameter.get('name', 'body')}`  ",
                f"**Required:** {'Yes' if body_parameter.get('required') else 'No'}  ",
                f"**Schema:** {linked_schema_type(schema)}",
                "",
            ])
            if body_parameter.get("description"):
                lines.extend([clean_description(body_parameter["description"]), ""])
            lines.extend(["#### Generated example", "", *json_block(sample_from_schema(spec, schema)), ""])
            lines.extend(render_model_references(refs))

    if not any_parameters:
        lines.extend(["This operation does not define request parameters.", ""])

    lines.extend(["### Example request", "", *request_example(spec, operation, path, method, parameters, consumes, produces), ""])

    lines.extend(["## Responses", ""])
    raw_responses = operation.get("responses", {})
    if not isinstance(raw_responses, dict) or not raw_responses:
        lines.extend(["No responses are defined in the source specification.", ""])
    else:
        def response_sort(item: tuple[str, Any]) -> tuple[int, str]:
            code = str(item[0])
            return (0, f"{int(code):03d}") if code.isdigit() else (1, code)

        for status, raw_response in sorted(raw_responses.items(), key=response_sort):
            response = resolve_response(
                spec,
                raw_response,
                warnings,
                source_name,
                f"{location}/responses/{status}",
            )
            description_text = clean_description(response.get("description", ""))
            schema = response.get("schema")
            lines.extend([f"### {status} — {description_text or 'Response'}", ""])
            lines.extend(render_actual_response_examples(response))

            if isinstance(schema, dict):
                refs = collect_refs(schema)
                all_refs.update(refs)
                sample = sample_from_schema(spec, schema)
                lines.extend([f"**Schema:** {linked_schema_type(schema)}", ""])
                if not response.get("examples"):
                    lines.extend(["#### Generated example", "", *json_block(sample), ""])
                lines.extend(render_model_references(refs))
            else:
                lines.extend(["No response schema is defined.", ""])

            headers = response.get("headers")
            if isinstance(headers, dict) and headers:
                lines.extend(["#### Response headers", ""])
                table_parameters = [
                    {"name": name, "in": "header", **value}
                    for name, value in headers.items()
                    if isinstance(value, dict)
                ]
                lines.extend([*render_parameter_table(table_parameters), ""])

    all_refs = collect_definition_closure(spec, all_refs)
    lines.extend(["## Source", ""])
    source_label = f"`{source_name}`"
    if source_url:
        source_label = f"[`{source_name}`]({source_url})"
    lines.append(f"Generated from {source_label}.")
    lines.append("")
    lines.append("> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.")
    lines.append("")
    return "\n".join(lines), all_refs


def render_model(spec: dict[str, Any], name: str, schema: dict[str, Any], source_name: str, source_url: str | None) -> str:
    flattened = merge_schema(spec, schema)
    description = clean_description(flattened.get("description", schema.get("description", "")))
    properties = flattened.get("properties", {})
    required = set(flattened.get("required", []))
    refs = collect_refs(schema)
    refs.discard(name)

    linked_type = linked_schema_type(schema, from_operation=False)
    type_text = linked_type if linked_type != schema_type(schema) else f"`{linked_type}`"
    lines = [f"# {name}", "", f"**Type:** {type_text}", ""]
    if description:
        lines.extend([description, ""])

    if isinstance(properties, dict) and properties:
        lines.extend([
            "## Properties",
            "",
            "| Property | Type | Required | Description | Constraints |",
            "|---|---|:---:|---|---|",
        ])
        for property_name, property_schema in properties.items():
            child = property_schema if isinstance(property_schema, dict) else {}
            lines.append(
                "| `{name}` | {type_} | {required} | {description} | {constraints} |".format(
                    name=md_escape(property_name),
                    type_=md_escape(linked_schema_type(child, from_operation=False)),
                    required="Yes" if property_name in required else "No",
                    description=md_escape(child.get("description", "")),
                    constraints=md_escape(schema_constraints(child)),
                )
            )
        lines.append("")
    else:
        lines.extend(["This model does not define object properties.", ""])

    lines.extend(["## Generated example", "", *json_block(sample_from_schema(spec, schema)), ""])
    if refs:
        lines.extend(["## Referenced models", ""])
        for ref in sorted(refs, key=str.casefold):
            lines.append(f"- {model_link(ref, from_operation=False)}")
        lines.append("")

    source_label = f"`{source_name}`" if not source_url else f"[`{source_name}`]({source_url})"
    lines.extend(["## Source", "", f"Generated from {source_label}.", ""])
    return "\n".join(lines)


def operation_fragment(
    spec: dict[str, Any],
    path: str,
    method: str,
    path_item: dict[str, Any],
    operation: dict[str, Any],
    definitions: set[str],
) -> dict[str, Any]:
    fragment: dict[str, Any] = {
        "swagger": spec.get("swagger", "2.0"),
        "info": spec.get("info", {}),
        "host": spec.get("host"),
        "basePath": spec.get("basePath"),
        "schemes": spec.get("schemes", []),
        "consumes": operation.get("consumes", spec.get("consumes", [])),
        "produces": operation.get("produces", spec.get("produces", [])),
        "paths": {path: {method: operation}},
        "definitions": {
            name: spec.get("definitions", {}).get(name)
            for name in sorted(definitions)
            if name in spec.get("definitions", {})
        },
    }
    if path_item.get("parameters"):
        fragment["paths"][path]["parameters"] = path_item["parameters"]
    for component_name in ("securityDefinitions", "security", "parameters", "responses", "externalDocs"):
        if component_name in spec:
            fragment[component_name] = spec[component_name]
    return {key: value for key, value in fragment.items() if value is not None}


def write_tag_readme(
    tag_directory: Path,
    tag_name: str,
    tag_description: str,
    operations: list[OperationRecord],
) -> None:
    lines = [f"# {tag_name}", ""]
    if tag_description:
        lines.extend([tag_description, ""])
    lines.extend(["## Operations", "", "| Method | Path | Operation |", "|---|---|---|"])
    for operation in sorted(operations, key=lambda item: (item.path, item.method, item.title.casefold())):
        filename = Path(operation.markdown_path).name
        lines.append(f"| `{operation.method}` | `{operation.path}` | [{operation.title}]({filename}) |")
    lines.append("")
    (tag_directory / "README.md").write_text("\n".join(lines), encoding="utf-8")


def write_spec_readme(
    output: Path,
    spec: dict[str, Any],
    source_name: str,
    source_url: str | None,
    tag_operations: dict[str, list[OperationRecord]],
    model_count: int,
) -> None:
    info = spec.get("info", {}) if isinstance(spec.get("info"), dict) else {}
    title = str(info.get("title", "API Reference"))
    version = str(info.get("version", ""))
    description = clean_description(info.get("description", ""))
    source_label = f"`{source_name}`" if not source_url else f"[`{source_name}`]({source_url})"
    operation_count = sum(len(items) for items in tag_operations.values())

    lines = [f"# {title}", ""]
    if description:
        lines.extend([description, ""])
    if version:
        lines.extend([f"**API version:** `{version}`  ", ""])
    lines.extend([
        f"Generated from {source_label}.",
        "",
        f"- Operations: **{operation_count}**",
        f"- Models: **{model_count}**",
        "",
        "## Endpoint groups",
        "",
        "| Group | Operations |",
        "|---|---:|",
    ])
    for tag_name, operations in sorted(tag_operations.items(), key=lambda item: item[0].casefold()):
        folder = slugify(tag_name, "untagged")
        lines.append(f"| [{tag_name}]({folder}/README.md) | {len(operations)} |")
    lines.extend([
        "",
        "## Models",
        "",
        "Shared request and response schemas are documented in [`models/`](models/README.md).",
        "",
        "## Generation notes",
        "",
        "- Each HTTP operation is stored in a separate Markdown file.",
        "- Request and response examples are generated from the source schema unless the specification supplies examples.",
        "- Keep the original Swagger files and applicable Adobe licence and copyright notices in the repository.",
        "",
    ])
    (output / "README.md").write_text("\n".join(lines), encoding="utf-8")


def build_one_spec(
    source: Path,
    output_root: Path,
    *,
    clean_section: bool,
    json_fragments: bool,
) -> BuildResult:
    source_name = source.name
    source_url = source_url_for(source_name)
    section = section_name_for(source)
    section_output = output_root / section

    try:
        raw_spec = json.loads(source.read_text(encoding="utf-8-sig"))
    except json.JSONDecodeError as error:
        raise BuildFailure(f"{source_name}: invalid JSON: {error}") from error

    if not isinstance(raw_spec, dict):
        raise BuildFailure(f"{source_name}: the JSON root must be an object.")

    warnings: list[WarningRecord] = []
    spec, specification_format = normalise_specification(raw_spec, warnings, source_name)
    if not isinstance(spec.get("paths"), dict):
        raise BuildFailure(f"{source_name}: no valid 'paths' object was found.")

    if clean_section and section_output.exists():
        shutil.rmtree(section_output)
    section_output.mkdir(parents=True, exist_ok=True)

    for ref in sorted(collect_external_refs(spec)):
        warnings.append(WarningRecord(source_name, "specification", f"External reference not resolved: {ref}"))

    info = spec.get("info", {}) if isinstance(spec.get("info"), dict) else {}
    result = BuildResult(
        source_path=source,
        source_name=source_name,
        source_url=source_url,
        section=section,
        title=str(info.get("title", source.stem)),
        version=str(info.get("version", "")),
        specification_format=specification_format,
        warnings=warnings,
    )

    tag_descriptions = {
        str(tag.get("name")): clean_description(tag.get("description", ""))
        for tag in spec.get("tags", [])
        if isinstance(tag, dict) and tag.get("name")
    }
    tag_operations: dict[str, list[OperationRecord]] = defaultdict(list)
    used_filenames: dict[str, set[str]] = defaultdict(set)

    for path, path_item in spec["paths"].items():
        if not isinstance(path_item, dict):
            warnings.append(WarningRecord(source_name, f"paths/{path}", "Ignored non-object path item."))
            continue
        for method, operation in path_item.items():
            method_lower = str(method).lower()
            if method_lower not in HTTP_METHODS:
                continue
            if not isinstance(operation, dict):
                warnings.append(WarningRecord(source_name, f"paths/{path}/{method}", "Ignored non-object operation."))
                continue

            tags = operation.get("tags") or ["Untagged"]
            primary_tag = str(tags[0])
            tag_folder = slugify(primary_tag, "untagged")
            tag_directory = section_output / tag_folder
            tag_directory.mkdir(parents=True, exist_ok=True)

            filename = operation_filename(operation, method_lower, path, used_filenames[tag_folder])
            markdown, refs = render_operation(
                spec,
                str(path),
                method_lower,
                path_item,
                operation,
                source_name,
                source_url,
                warnings,
            )
            markdown_path = tag_directory / filename
            markdown_path.write_text(markdown, encoding="utf-8")

            json_relative: str | None = None
            if json_fragments:
                fragment = operation_fragment(spec, str(path), method_lower, path_item, operation, refs)
                json_path = tag_directory / filename.replace(".md", ".operation.json")
                json_path.write_text(json.dumps(fragment, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
                json_relative = json_path.relative_to(output_root).as_posix()

            record = OperationRecord(
                source=source_name,
                section=section,
                tag=primary_tag,
                method=method_lower.upper(),
                path=str(path),
                title=str(operation.get("summary") or operation.get("operationId") or path),
                operation_id=str(operation.get("operationId", "")),
                markdown_path=markdown_path.relative_to(output_root).as_posix(),
                json_path=json_relative,
            )
            tag_operations[primary_tag].append(record)
            result.operations.append(record)
            print(f"Created: {record.markdown_path}")

    for tag_name, operations in tag_operations.items():
        write_tag_readme(
            section_output / slugify(tag_name, "untagged"),
            tag_name,
            tag_descriptions.get(tag_name, ""),
            operations,
        )

    definitions = spec.get("definitions", {})
    if not isinstance(definitions, dict):
        warnings.append(WarningRecord(source_name, "definitions", "Definitions was not an object; no models generated."))
        definitions = {}

    models_directory = section_output / "models"
    models_directory.mkdir(parents=True, exist_ok=True)
    model_index = ["# Models", "", "| Model | Type |", "|---|---|"]
    generated_models = 0
    for name in sorted(definitions, key=str.casefold):
        schema = definitions[name]
        if not isinstance(schema, dict):
            warnings.append(WarningRecord(source_name, f"definitions/{name}", "Ignored non-object model definition."))
            continue
        filename = f"{slugify(name)}.md"
        (models_directory / filename).write_text(
            render_model(spec, name, schema, source_name, source_url),
            encoding="utf-8",
        )
        model_index.append(f"| [{name}]({filename}) | `{schema_type(schema)}` |")
        generated_models += 1
    model_index.append("")
    (models_directory / "README.md").write_text("\n".join(model_index), encoding="utf-8")

    write_spec_readme(section_output, spec, source_name, source_url, tag_operations, generated_models)
    result.model_count = generated_models
    result.tag_count = len(tag_operations)
    return result


def discover_specs(inputs: list[Path], pattern: str) -> list[Path]:
    found: dict[str, Path] = {}
    for raw_path in inputs:
        path = raw_path.resolve()
        if path.is_file():
            found[str(path)] = path
        elif path.is_dir():
            for candidate in sorted(path.rglob(pattern)):
                if candidate.is_file():
                    found[str(candidate.resolve())] = candidate.resolve()
        else:
            raise BuildFailure(f"Input does not exist: {path}")
    return sorted(found.values(), key=lambda item: item.name.casefold())


def download_adobe_specs(destination: Path, *, overwrite: bool) -> list[Path]:
    """Download the Adobe specifications.

    Every file is downloaded and parsed before any is written, so a failed or
    invalid download leaves the existing specifications untouched instead of
    replacing only some of them.
    """
    destination.mkdir(parents=True, exist_ok=True)
    headers = {"User-Agent": f"marketo-api-reference-builder/{VERSION}"}
    pending: dict[Path, bytes] = {}
    for filename, url in ADOBE_SPEC_SOURCES.items():
        target = destination / filename
        if target.exists() and not overwrite:
            continue
        request = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                data = response.read()
        except (urllib.error.URLError, TimeoutError) as error:
            raise BuildFailure(f"Could not download {url}: {error}. No specifications were changed.") from error
        try:
            json.loads(data)
        except ValueError as error:
            raise BuildFailure(f"{url} did not return valid JSON: {error}. No specifications were changed.") from error
        pending[target] = data

    downloaded: list[Path] = []
    for filename in ADOBE_SPEC_SOURCES:
        target = destination / filename
        if target in pending:
            target.write_bytes(pending[target])
            print(f"Downloaded: {target}")
        else:
            print(f"Using existing: {target}")
        downloaded.append(target.resolve())
    return downloaded


def write_global_readme(output: Path, results: list[BuildResult]) -> None:
    total_operations = sum(len(result.operations) for result in results)
    total_models = sum(result.model_count for result in results)
    lines = [
        "# API Reference",
        "",
        "Generated from Adobe's Marketo Engage API specifications (Swagger 2.0 and OpenAPI 3).",
        "",
        f"- Specifications: **{len(results)}**",
        f"- Operations: **{total_operations}**",
        f"- Models: **{total_models}**",
        "",
        "## Specifications",
        "",
        "| Section | Source | Endpoint groups | Operations | Models |",
        "|---|---|---:|---:|---:|",
    ]
    for result in sorted(results, key=lambda item: item.section):
        source = f"`{result.source_name}`"
        if result.source_url:
            source = f"[`{result.source_name}`]({result.source_url})"
        lines.append(
            f"| [{result.section}]({result.section}/README.md) | {source} | "
            f"{result.tag_count} | {len(result.operations)} | {result.model_count} |"
        )
    lines.extend([
        "",
        "## Machine-readable index",
        "",
        "[`manifest.json`](manifest.json) lists every operation with its method, path, operation ID and"
        " documentation files.",
        "",
    ])
    (output / "README.md").write_text("\n".join(lines), encoding="utf-8")


def write_manifest(output: Path, results: list[BuildResult]) -> None:
    payload = {
        "generator": {"name": "build_marketo_api_reference.py", "version": VERSION},
        "summary": {
            "specifications": len(results),
            "operations": sum(len(result.operations) for result in results),
            "models": sum(result.model_count for result in results),
            "warnings": sum(len(result.warnings) for result in results),
        },
        "specifications": [
            {
                "source": result.source_name,
                "sourceUrl": result.source_url,
                "section": result.section,
                "title": result.title,
                "version": result.version,
                "format": result.specification_format,
                "groups": result.tag_count,
                "operations": len(result.operations),
                "models": result.model_count,
                "warnings": len(result.warnings),
            }
            for result in results
        ],
        "operations": [
            {
                "source": operation.source,
                "section": operation.section,
                "tag": operation.tag,
                "method": operation.method,
                "path": operation.path,
                "title": operation.title,
                "operationId": operation.operation_id,
                "markdown": operation.markdown_path,
                "json": operation.json_path,
            }
            for result in results
            for operation in result.operations
        ],
    }
    (output / "manifest.json").write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def write_validation_report(output: Path, results: list[BuildResult]) -> None:
    warnings = [warning for result in results for warning in result.warnings]
    lines = ["# Validation report", ""]
    if not warnings:
        lines.extend(["No validation warnings were recorded.", ""])
    else:
        lines.extend([
            f"Recorded **{len(warnings)}** warning(s). Generated files may still be usable, but these items should be reviewed.",
            "",
            "| Source | Location | Warning |",
            "|---|---|---|",
        ])
        for warning in warnings:
            lines.append(
                f"| `{md_escape(warning.source)}` | `{md_escape(warning.location)}` | {md_escape(warning.message)} |"
            )
        lines.append("")
    (output / "validation-report.md").write_text("\n".join(lines), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build one combined Markdown reference from Swagger 2.0 and OpenAPI 3.x files."
    )
    parser.add_argument(
        "inputs",
        nargs="*",
        type=Path,
        help="Swagger/OpenAPI JSON files or directories. Directories are searched recursively.",
    )
    parser.add_argument("--output", type=Path, default=Path("reference"), help="Output directory.")
    parser.add_argument("--pattern", default="swagger*.json", help="Filename pattern used for directory discovery.")
    parser.add_argument("--clean", action="store_true", help="Delete the complete output directory before building.")
    parser.add_argument(
        "--json-fragments",
        action="store_true",
        help="Write a Swagger JSON fragment beside every Markdown operation.",
    )
    parser.add_argument(
        "--download-adobe",
        action="store_true",
        help="Download the five current Adobe Marketo API specifications before building.",
    )
    parser.add_argument(
        "--specs-dir",
        type=Path,
        default=Path("specs"),
        help="Destination for --download-adobe. Default: specs",
    )
    parser.add_argument(
        "--overwrite-specs",
        action="store_true",
        help="Replace existing local Swagger files when using --download-adobe.",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Return a non-zero exit code when validation warnings are recorded.",
    )
    parser.add_argument("--version", action="version", version=f"%(prog)s {VERSION}")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    output = args.output.resolve()

    try:
        sources: list[Path] = []
        if args.download_adobe:
            sources.extend(download_adobe_specs(args.specs_dir.resolve(), overwrite=args.overwrite_specs))
        if args.inputs:
            sources.extend(discover_specs(args.inputs, args.pattern))
        elif not args.download_adobe:
            default_specs = args.specs_dir.resolve()
            if default_specs.is_dir():
                sources.extend(discover_specs([default_specs], args.pattern))
            else:
                raise BuildFailure("Provide Swagger files/directories, use --download-adobe, or create a specs directory.")

        deduplicated = {str(path.resolve()): path.resolve() for path in sources}
        sources = sorted(deduplicated.values(), key=lambda item: item.name.casefold())
        if not sources:
            raise BuildFailure("No matching Swagger files were found.")

        sections: dict[str, Path] = {}
        for source in sources:
            section = section_name_for(source)
            if section in sections and sections[section] != source:
                raise BuildFailure(
                    f"Output section collision: {source} and {sections[section]} both map to '{section}'. "
                    "Rename one input file."
                )
            sections[section] = source

        if args.clean and output.exists():
            shutil.rmtree(output)
        output.mkdir(parents=True, exist_ok=True)

        results: list[BuildResult] = []
        failures: list[str] = []
        for source in sources:
            print()
            print(f"Processing: {source}")
            try:
                result = build_one_spec(
                    source,
                    output,
                    clean_section=not args.clean,
                    json_fragments=args.json_fragments,
                )
                results.append(result)
                print(
                    f"Completed {result.section}: {len(result.operations)} operations, "
                    f"{result.model_count} models, {len(result.warnings)} warnings."
                )
            except BuildFailure as error:
                failures.append(str(error))
                print(f"Error: {error}", file=sys.stderr)

        if not results:
            raise BuildFailure("No specifications were built successfully.")

        write_global_readme(output, results)
        write_manifest(output, results)
        write_validation_report(output, results)

        total_operations = sum(len(result.operations) for result in results)
        total_models = sum(result.model_count for result in results)
        total_warnings = sum(len(result.warnings) for result in results)
        print()
        print(
            f"Finished: {len(results)} specifications, {total_operations} operations, "
            f"{total_models} models, {total_warnings} warnings."
        )
        print(f"Output: {output}")

        if failures:
            print("\nFailed specifications:", file=sys.stderr)
            for failure in failures:
                print(f"- {failure}", file=sys.stderr)
            return 1
        if args.strict and total_warnings:
            return 2
        return 0

    except BuildFailure as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
