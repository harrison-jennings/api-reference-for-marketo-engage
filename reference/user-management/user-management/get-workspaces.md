# Get Workspaces

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/workspaces.json`  
**Tag:** User Management  
**Operation ID:** `getWorkspacesUsingGET`  

Retrieve list of workspace records.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/userservice/management/v1/users/workspaces.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** array of [`ResponseOfWorkspace`](../models/responseofworkspace.md)

#### Generated example

```json
[
  {
    "errors": [
      {
        "code": 123,
        "message": "string"
      }
    ],
    "currencyInfo": "string",
    "description": "string",
    "globalViz": 123,
    "id": 123,
    "name": "Example name",
    "createdAt": "string",
    "updatedAt": "string",
    "status": "string"
  }
]
```

### Referenced models

- [`ResponseOfWorkspace`](../models/responseofworkspace.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
