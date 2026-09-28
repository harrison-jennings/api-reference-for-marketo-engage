# SyncProgramMemberDataRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`ProgramMemberData`](./programmemberdata.md) | Yes | List of input records |  |

## Generated example

```json
{
  "input": [
    {
      "leadId": 123,
      "{fieldApiName}": "Example name",
      "{fieldApiName2}": "Example name"
    }
  ]
}
```

## Referenced models

- [`ProgramMemberData`](./programmemberdata.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
