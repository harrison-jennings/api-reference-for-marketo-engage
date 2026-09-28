# Get Users

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/allusers.json`  
**Tag:** User Management  
**Operation ID:** `getUsersUsingGET`  

Retrieve a list of all user records.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

### Query parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `pageOffset` | integer (int32) | No | Integer offset for paging.  Default is 0 | default: 0 |
| `pageSize` | integer (int32) | No | Maximum number of users to return.  Max 200, default 20 | default: 20 |
| `includeRoleWorkspace` | boolean | No | When true, adds the userRoleWorkspaces field to the results for each user.  Requires the Access Roles permission.  Default is false | default: False |

### Example request

```http
GET {{base_url}}/userservice/management/v1/users/allusers.json?pageOffset=0&pageSize=20&includeRoleWorkspace=False
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** array of [`ResponseOfAllUsers`](../models/responseofallusers.md)

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
    "apiOnly": true,
    "emailAddress": "person@example.com",
    "firstName": "Example name",
    "id": 123,
    "lastName": "Example name",
    "userid": "person@example.com",
    "userRoleWorkspaces": [
      {
        "accessRoleId": 123,
        "accessRoleName": "Example name",
        "workspaceId": 123,
        "workspaceName": "Example name"
      }
    ]
  }
]
```

### Referenced models

- [`ResponseOfAllUsers`](../models/responseofallusers.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
