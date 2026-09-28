# DeleteProgramOperation

**Type:** `object`

A program delete operation.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programId` | integer (int64) | Yes | The Marketo program ID. Must be a positive integer. |  |
| `members` | array of [`ProgramMember`](./programmember.md) | Yes | List of lead references to remove from the program. |  |

## Generated example

```json
{
  "programId": 1001,
  "members": [
    {
      "leadId": 10001
    }
  ]
}
```

## Referenced models

- [`ProgramMember`](./programmember.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
