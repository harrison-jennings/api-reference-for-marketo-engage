# Sync Custom Objects

**Method:** `POST`  
**Path:** `/subscriptions/{munchkinId}/customobjects/{customObjectAPIName}`  
**Tag:** Custom Objects  
**Operation ID:** `syncCustomObjects`  

Upsert (insert or update) a list of custom object records. If a link field to a Person is specified in the request and that Person does not exist, several retries occur. If that Person is added during the retry window (65 minutes), then the update is successful. Required permission: `Read-Write Custom Object`.

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `munchkinId` | string | Yes | Marketo subscription Munchkin ID |  |
| `customObjectAPIName` | string | Yes | The API name of the custom object type |  |

### Header parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `X-Mkto-User-Token` | string | Yes | Marketo API access token |  |
| `X-Correlation-Id` | string | No | Arbitrary string (max 255 characters). Used to trace requests through the system via Marketo Observability Data Stream. |  |
| `X-Request-Source` | string | No | Arbitrary string (max 50 characters). Used to trace the source of requests. |  |

### Request body

**Name:** `requestBody`  
**Required:** Yes  
**Schema:** [`SyncCustomObjectsRequest`](../models/synccustomobjectsrequest.md)

#### Generated example

```json
{
  "dedupeBy": "dedupeFields",
  "priority": "high",
  "customObjects": [
    {
      "email": "brooklyn.parker@karnv.com",
      "vin": "20UYA31581L000000",
      "make": "BMW",
      "model": "3-Series 330i",
      "year": 2003
    },
    {
      "email": "johnny.neal@yvu30.com",
      "vin": "19UYA31581L000000",
      "make": "BMW",
      "model": "3-Series 325i",
      "year": 1989
    }
  ]
}
```

### Referenced models

- [`SyncCustomObjectsRequest`](../models/synccustomobjectsrequest.md)

### Example request

```http
POST https://mkto-ingestion-api.adobe.io/subscriptions/{{munchkinId}}/customobjects/{{customObjectAPIName}}
X-Mkto-User-Token: {{X-Mkto-User-Token}}
X-Correlation-Id: {{X-Correlation-Id}}
X-Request-Source: {{X-Request-Source}}
Content-Type: application/json
Accept: application/json

{
  "dedupeBy": "dedupeFields",
  "priority": "high",
  "customObjects": [
    {
      "email": "brooklyn.parker@karnv.com",
      "vin": "20UYA31581L000000",
      "make": "BMW",
      "model": "3-Series 330i",
      "year": 2003
    },
    {
      "email": "johnny.neal@yvu30.com",
      "vin": "19UYA31581L000000",
      "make": "BMW",
      "model": "3-Series 325i",
      "year": 1989
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

### 400 — Bad request

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
