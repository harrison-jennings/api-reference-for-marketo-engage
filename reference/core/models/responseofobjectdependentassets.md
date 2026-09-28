# ResponseOfObjectDependentAssets

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `errors` | array of [`Error`](./error.md) | Yes | Array of errors that occurred if the request was unsuccessful |  |
| `requestId` | string | Yes | Id of the request made |  |
| `result` | array of [`ObjectDependentAsset`](./objectdependentasset.md) | Yes | List of dependent assets for a custom object type |  |
| `success` | boolean | Yes | Whether the request succeeded |  |
| `warnings` | array of [`Warning`](./warning.md) | Yes | Array of warnings given for the operation |  |

## Generated example

```json
{
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "requestId": "123",
  "result": [
    {
      "assetType": "string",
      "assetId": 123,
      "assetName": "Example name",
      "usedFields": [
        "string"
      ]
    }
  ],
  "success": false,
  "warnings": [
    {
      "code": 123,
      "message": "string"
    }
  ]
}
```

## Referenced models

- [`Error`](./error.md)
- [`ObjectDependentAsset`](./objectdependentasset.md)
- [`Warning`](./warning.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
