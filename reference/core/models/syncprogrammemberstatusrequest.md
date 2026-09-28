# SyncProgramMemberStatusRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `statusName` | string | Yes | Program member status |  |
| `input` | array of [`ProgramMemberStatus`](./programmemberstatus.md) | Yes | List of input records |  |

## Generated example

```json
{
  "statusName": "Example name",
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

## Referenced models

- [`ProgramMemberStatus`](./programmemberstatus.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
