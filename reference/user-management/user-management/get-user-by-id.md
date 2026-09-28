# Get User by Id

**Method:** `GET`  
**Path:** `/userservice/management/v1/users/{userid}/user.json`  
**Tag:** User Management  
**Operation ID:** `getUserUsingGET`  

Retrieve a single user record through its Id.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** Not specified
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `userid` | string | Yes | User id in the form of an email address |  |

### Example request

```http
GET {{base_url}}/userservice/management/v1/users/{{userid}}/user.json
Accept: application/json
```

## Responses

### 200 — OK

**Schema:** [`ResponseOfUser`](../models/responseofuser.md)

#### Generated example

```json
{
  "errors": [
    {
      "code": 123,
      "message": "string"
    }
  ],
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "lastLoginAt": "yyyy-MM-dd'T'HH:mm:ss.SSS't'Z",
  "failedDeviceCode": 123,
  "failedLogins": 123,
  "firstName": "Example name",
  "id": 123,
  "isLocked": true,
  "lastName": "Example name",
  "lockedReason": "string",
  "optedIn": true,
  "userRoleWorkspaces": [
    {
      "accessRoleId": 123,
      "accessRoleName": "Example name",
      "workspaceId": 123,
      "workspaceName": "Example name"
    }
  ],
  "userid": "person@example.com"
}
```

### Referenced models

- [`ResponseOfUser`](../models/responseofuser.md)

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
