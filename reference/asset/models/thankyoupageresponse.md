# ThankYouPageResponse

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `id` | integer (int32) | No |  |  |
| `thankYouList` | array of [`FormThankYouPageDTO`](./formthankyoupagedto.md) | No |  |  |

## Generated example

```json
{
  "id": 123,
  "thankYouList": [
    {
      "default": true,
      "followupType": "string",
      "followupValue": {},
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

- [`FormThankYouPageDTO`](./formthankyoupagedto.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
