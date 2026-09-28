# UpdateLeadPartitionRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`UpdateLeadPartition`](./updateleadpartition.md) | Yes | List of leads for input |  |

## Generated example

```json
{
  "input": [
    {
      "id": 123,
      "partitionName": "Example name"
    }
  ]
}
```

## Referenced models

- [`UpdateLeadPartition`](./updateleadpartition.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
