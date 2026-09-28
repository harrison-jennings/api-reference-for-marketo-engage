# DeleteProgramMembersRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `programs` | array of [`DeleteProgramOperation`](./deleteprogramoperation.md) | Yes | List of program delete operations. |  |

## Generated example

```json
{
  "programs": [
    {
      "programId": 1001,
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

- [`DeleteProgramOperation`](./deleteprogramoperation.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
