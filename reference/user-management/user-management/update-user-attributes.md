# Update User Attributes

**Method:** `POST`  
**Path:** `/userservice/management/v1/users/{userid}/update.json`  
**Tag:** User Management  
**Operation ID:** `updateUserAttributeUsingPOST`  

Update one or more user attributes.  Required Permissions: Access User Management Api and Access Users

## Formats

- **Request:** `application/json`
- **Response:** `application/json`

## Request

### Path parameters

| Name | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `userid` | string | Yes | User id in the form of an email address |  |

### Request body

**Name:** `updateUserAttributesRequest`  
**Required:** Yes  
**Schema:** [`UpdateUserAttributesRequest`](../models/updateuserattributesrequest.md)

updateUserAttributesRequest

#### Generated example

```json
{
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "yyyyMMdd'T'HH:mm:ss'.'S't'Z",
  "firstName": "Example name",
  "lastName": "Example name"
}
```

### Referenced models

- [`UpdateUserAttributesRequest`](../models/updateuserattributesrequest.md)

### Example request

```http
POST {{base_url}}/userservice/management/v1/users/{{userid}}/update.json
Content-Type: application/json
Accept: application/json

{
  "apiOnly": true,
  "emailAddress": "person@example.com",
  "expiresAt": "yyyyMMdd'T'HH:mm:ss'.'S't'Z",
  "firstName": "Example name",
  "lastName": "Example name"
}
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

### 201 — Created

No response schema is defined.

### 401 — Unauthorized

No response schema is defined.

### 403 — Forbidden

No response schema is defined.

### 404 — Not Found

No response schema is defined.

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).

> Generated examples are inferred from the schema. They are illustrative and may not be valid production payloads.
