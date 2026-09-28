# Sync Persons

**Method:** `POST`  
**Path:** `/subscriptions/{munchkinId}/persons`  
**Tag:** Persons  
**Operation ID:** `syncPersons`  

Upsert (insert or update) a list of person/lead records. Required permission: `Read-Write Lead`.

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
**Schema:** [`SyncPersonsRequest`](../models/syncpersonsrequest.md)

#### Generated example

```json
{
  "priority": "high",
  "partitionName": "EMEA",
  "dedupeFields": {
    "field1": "email",
    "field2": "firstName"
  },
  "persons": [
    {
      "email": "brooklyn.parker@karnv.com",
      "firstName": "Brooklyn",
      "lastName": "Parker",
      "company": "Karnv"
    },
    {
      "email": "johnny.neal@yvu30.com",
      "firstName": "Johnny",
      "lastName": "Neal",
      "company": "Acme Inc"
    }
  ]
}
```

### Referenced models

- [`SyncPersonsRequest`](../models/syncpersonsrequest.md)

### Example request

```http
POST https://mkto-ingestion-api.adobe.io/subscriptions/{{munchkinId}}/persons
X-Mkto-User-Token: {{X-Mkto-User-Token}}
X-Correlation-Id: {{X-Correlation-Id}}
X-Request-Source: {{X-Request-Source}}
Content-Type: application/json
Accept: application/json

{
  "priority": "high",
  "partitionName": "EMEA",
  "dedupeFields": {
    "field1": "email",
    "field2": "firstName"
  },
  "persons": [
    {
      "email": "brooklyn.parker@karnv.com",
      "firstName": "Brooklyn",
      "lastName": "Parker",
      "company": "Karnv"
    },
    {
      "email": "johnny.neal@yvu30.com",
      "firstName": "Johnny",
      "lastName": "Neal",
      "company": "Acme Inc"
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
