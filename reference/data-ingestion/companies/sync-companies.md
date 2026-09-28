# Sync Companies

**Method:** `POST`  
**Path:** `/subscriptions/{munchkinId}/companies`  
**Tag:** Companies  
**Operation ID:** `syncCompanies`  

Sync a list of company records. Supports create, update, and upsert operations with deduplication by external company ID or Marketo internal ID. Required permission: `Read-Write Company`.

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
**Schema:** [`SyncCompaniesRequest`](../models/synccompaniesrequest.md)

#### Generated example

```json
{
  "action": "createOrUpdate",
  "dedupeBy": "dedupeFields",
  "input": [
    {
      "externalCompanyId": "ext-company-001",
      "company": "Acme Corporation",
      "industry": "Technology",
      "numberOfEmployees": 5000,
      "annualRevenue": 100000000
    },
    {
      "externalCompanyId": "ext-company-002",
      "company": "Globex Industries",
      "industry": "Manufacturing",
      "numberOfEmployees": 1200
    }
  ]
}
```

### Referenced models

- [`SyncCompaniesRequest`](../models/synccompaniesrequest.md)

### Example request

```http
POST https://mkto-ingestion-api.adobe.io/subscriptions/{{munchkinId}}/companies
X-Mkto-User-Token: {{X-Mkto-User-Token}}
X-Correlation-Id: {{X-Correlation-Id}}
X-Request-Source: {{X-Request-Source}}
Content-Type: application/json
Accept: application/json

{
  "action": "createOrUpdate",
  "dedupeBy": "dedupeFields",
  "input": [
    {
      "externalCompanyId": "ext-company-001",
      "company": "Acme Corporation",
      "industry": "Technology",
      "numberOfEmployees": 5000,
      "annualRevenue": 100000000
    },
    {
      "externalCompanyId": "ext-company-002",
      "company": "Globex Industries",
      "industry": "Manufacturing",
      "numberOfEmployees": 1200
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

### 400 — Bad request – validation error (e.g. invalid dedupeBy, missing company id for updateOnly when dedupeBy is idField, empty input, invalid action)

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
