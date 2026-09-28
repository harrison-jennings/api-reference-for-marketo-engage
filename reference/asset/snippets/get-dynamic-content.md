# Get Dynamic Content

**Method:** `GET`  
**Path:** `/rest/asset/v1/snippet/{id}/dynamicContent.json`  
**Tag:** Snippets  
**Operation ID:** `getDynamicContentUsingGET`  

Gets the list of dynamic content sections for the snippet. Required Permissions: Read-Only Assets, Read-Write Assets

## Formats

- **Request:** `application/x-www-form-urlencoded`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | Yes | id |  |

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `status` | string | No | Status filter for draft or approved versions | enum: approved, draft |

### Example request

```http
GET {{base_url}}/rest/asset/v1/snippet/{{id}}/dynamicContent.json?status=approved
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ModelResponse`](../models/modelresponse.md)

#### Generated example

```json
{}
```

### Referenced models

- [`ModelResponse`](../models/modelresponse.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
