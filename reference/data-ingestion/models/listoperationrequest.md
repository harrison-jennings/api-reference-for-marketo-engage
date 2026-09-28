# ListOperationRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `listId` | integer (int64) | Yes | The Marketo static list ID. Must be a positive integer. |  |
| `input` | array of [`Lead`](./lead.md) | Yes | List of lead references to add to or remove from the list. |  |

## Generated example

```json
{
  "listId": 1064,
  "input": [
    {
      "leadId": 10001
    }
  ]
}
```

## Referenced models

- [`Lead`](./lead.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
