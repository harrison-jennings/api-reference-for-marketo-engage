# Marketo Data Ingestion API

High volume, low latency, highly available service designed to handle ingestion of large amounts of person and person-related data efficiently and with minimal delays. Data is ingested by submitting requests that execute asynchronously. Request status can be retrieved by subscribing to events from the Marketo Observability Data Stream.

**API version:** `v1`  

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).

- Operations: **7**
- Models: **15**

## Endpoint groups

| Group | Operations |
|---|---:|
| [Companies](companies/README.md) | 1 |
| [Custom Objects](custom-objects/README.md) | 1 |
| [Lists](lists/README.md) | 2 |
| [Persons](persons/README.md) | 1 |
| [Program Members](program-members/README.md) | 2 |

## Models

Shared request and response schemas are documented in [`models/`](models/README.md).

## Generation notes

- Each HTTP operation is stored in a separate Markdown file.
- Request and response examples are generated from the source schema unless the specification supplies examples.
- Keep the original Swagger files and applicable Adobe licence and copyright notices in the repository.
