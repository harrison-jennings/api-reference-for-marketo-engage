# DeleteProgramMemberRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`ProgramMemberDelete`](./programmemberdelete.md) | Yes | List of input records |  |

## Generated example

```json
{
  "input": [
    {
      "leadId": 123
    }
  ]
}
```

## Referenced models

- [`ProgramMemberDelete`](./programmemberdelete.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
