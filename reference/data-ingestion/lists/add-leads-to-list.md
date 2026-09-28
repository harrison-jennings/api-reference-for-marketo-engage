# Add Leads to List

**Method:** `POST`  
**Path:** `/subscriptions/{munchkinId}/lists`  
**Tag:** Lists  
**Operation ID:** `addToList`  

Add leads to a static list. Required permission: `Read-Write Lead`.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `munchkinId` | string | Yes | Marketo subscription Munchkin ID |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `X-Mkto-User-Token` | string | Yes | Marketo API access token |  |
| `X-Correlation-Id` | string | No | Arbitrary string (max 255 characters). Used to trace requests through the system via Marketo Observability Data Stream. |  |
| `X-Request-Source` | string | No | Arbitrary string (max 50 characters). Used to trace the source of requests. |  |

### Request body

**Name:** `requestBody`  
**Required:** Yes  
**Schema:** [`ListOperationRequest`](../models/listoperationrequest.md)

#### Generated example

```json
{
  "listId": 1064,
  "input": [
    {
      "leadId": 10001
    },
    {
      "leadId": 10002
    },
    {
      "leadId": 10003
    }
  ]
}
```

### Referenced models

- [`ListOperationRequest`](../models/listoperationrequest.md)

### Example request

```http
POST https://mkto-ingestion-api.adobe.io/subscriptions/{{munchkinId}}/lists
X-Mkto-User-Token: {{X-Mkto-User-Token}}
X-Correlation-Id: {{X-Correlation-Id}}
X-Request-Source: {{X-Request-Source}}
Content-Type: application/json
Accept: application/json

{
  "listId": 1064,
  "input": [
    {
      "leadId": 10001
    },
    {
      "leadId": 10002
    },
    {
      "leadId": 10003
    }
  ]
}
```

## Responses

### 202 — Accepted – request accepted for async processing

No response schema is defined.

#### Response headers

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `X-Request-Id` | string | No | Unique request ID |  |

### 400 — Bad request – validation error (e.g. leads not specified, number of leads exceeded max size, invalid listId)

**Schema:** [`ErrorResponse`](../models/errorresponse.md)

#### Generated example

```json
{
  "error_code": "4000801",
  "message": "Bad request"
}
```

### Referenced models

- [`ErrorResponse`](../models/errorresponse.md)

### 401 — Unauthorized – OAuth token is invalid

**Schema:** [`ErrorResponse`](../models/errorresponse.md)

#### Generated example

```json
{
  "error_code": "4000801",
  "message": "Bad request"
}
```

### Referenced models

- [`ErrorResponse`](../models/errorresponse.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
