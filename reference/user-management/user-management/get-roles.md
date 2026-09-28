# Get Roles

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/roles.json`  
**Tag:** User Management  
**Operation ID:** `getRolesUsingGET`  

Retrieve list of all role records.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

This operation does not define request parameters.

### Example request

```http
GET {{base_url}}/userservice/management/v1/users/roles.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** array of [`ResponseOfRole`](../models/responseofrole.md)

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
    "description": "string",
    "id": 123,
    "isHidden": true,
    "isOnlyAllZones": true,
    "name": "Example name",
    "createdAt": "string",
    "updatedAt": "string",
    "type": "string"
  }
]
```

### Referenced models

- [`ResponseOfRole`](../models/responseofrole.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
