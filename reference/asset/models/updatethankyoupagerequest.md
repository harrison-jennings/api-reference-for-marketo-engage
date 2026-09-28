# UpdateThankYouPageRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `thankyou` | array of [`ThankYouPageRequest`](./thankyoupagerequest.md) | No | JSON array of followup rules |  |

## Generated example

```json
{
  "thankyou": [
    {
      "default": true,
      "followupType": "string",
      "followupValue": "string",
      "operator": "string",
      "subjectField": "string",
      "values": [
        "string"
      ]
    }
  ]
}
```

## Referenced models

- [`ThankYouPageRequest`](./thankyoupagerequest.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
