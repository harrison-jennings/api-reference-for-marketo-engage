# ResponseOfRole

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | No | Array of errors that occurred if the request was unsuccessful |  |
| `description` | string | Yes | Role description |  |
| `id` | integer (int32) | Yes | Role id |  |
| `isHidden` | boolean | Yes | Whether role is hidden |  |
| `isOnlyAllZones` | boolean | Yes | Whether role is all zones |  |
| `name` | string | Yes | Role name |  |
| `createdAt` | string | Yes | Role creation time |  |
| `updatedAt` | string | Yes | Role update time |  |
| `type` | string | Yes | Role type |  |

## Generated example

```json
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
```

## Referenced models

- [`Error`](./error.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
