# Sync Program Member Status

**Method:** `POST`  
**Path:** `/subscriptions/{munchkinId}/programmembers`  
**Tag:** Program Members  
**Operation ID:** `syncProgramMembers`  

Sync (upsert) program member status. Adds leads to programs or updates their program status. Required permission: `Read-Write Lead`.

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
**Schema:** [`SyncProgramMembersRequest`](../models/syncprogrammembersrequest.md)

#### Generated example

```json
{
  "programs": [
    {
      "programId": 1001,
      "status": "Member",
      "members": [
        {
          "leadId": 10001
        },
        {
          "leadId": 10002
        }
      ]
    },
    {
      "programId": 1002,
      "status": "Influenced",
      "members": [
        {
          "leadId": 10003
        }
      ]
    }
  ]
}
```

### Referenced models

- [`SyncProgramMembersRequest`](../models/syncprogrammembersrequest.md)

### Example request

```http
POST https://mkto-ingestion-api.adobe.io/subscriptions/{{munchkinId}}/programmembers
X-Mkto-User-Token: {{X-Mkto-User-Token}}
X-Correlation-Id: {{X-Correlation-Id}}
X-Request-Source: {{X-Request-Source}}
Content-Type: application/json
Accept: application/json

{
  "programs": [
    {
      "programId": 1001,
      "status": "Member",
      "members": [
        {
          "leadId": 10001
        },
        {
          "leadId": 10002
        }
      ]
    },
    {
      "programId": 1002,
      "status": "Influenced",
      "members": [
        {
          "leadId": 10003
        }
      ]
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

### 400 — Bad request – validation error (e.g. status not specified, lead ids not specified, number of leads exceeded max size, status 'Not in Program' not allowed, invalid programId)

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
