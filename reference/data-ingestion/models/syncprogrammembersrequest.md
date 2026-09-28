# SyncProgramMembersRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programs` | array of [`ProgramOperation`](./programoperation.md) | Yes | List of program operations. Each specifies a program, a target status, and the leads to sync. |  |

## Generated example

```json
{
  "programs": [
    {
      "programId": 1001,
      "status": "Member",
      "members": [
        {
          "leadId": 10001
        }
      ]
    }
  ]
}
```

## Referenced models

- [`ProgramOperation`](./programoperation.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
