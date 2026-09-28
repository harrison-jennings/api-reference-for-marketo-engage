# UpdateEmailComponentDataRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `fromEmail` | [`EmailHeaderField`](./emailheaderfield.md) | No | From-address of the Email |  |
| `fromName` | [`EmailHeaderField`](./emailheaderfield.md) | No | From-name of the Email |  |
| `replyTO` | [`EmailHeaderField`](./emailheaderfield.md) | No | Reply-To address of the Email |  |
| `subject` | [`EmailHeaderField`](./emailheaderfield.md) | No | Subject Line of the Email |  |

## Generated example

```json
{
  "fromEmail": {
    "type": "string",
    "value": "string"
  },
  "fromName": {
    "type": "string",
    "value": "string"
  },
  "replyTO": {
    "type": "string",
    "value": "string"
  },
  "subject": {
    "type": "string",
    "value": "string"
  }
}
```

## Referenced models

- [`EmailHeaderField`](./emailheaderfield.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
