# AddRolesRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`UserRoleWorkspaceId`](./userroleworkspaceid.md) | Yes | List of roles to add |  |

## Generated example

```json
{
  "input": [
    {
      "accessRoleId": 123,
      "workspaceId": 123
    }
  ]
}
```

## Referenced models

- [`UserRoleWorkspaceId`](./userroleworkspaceid.md)

## Source

Generated from [`swagger-user.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-user.json).
