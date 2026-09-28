# CustomActivityRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `input` | array of [`CustomActivity`](./customactivity.md) | Yes | List of custom activities to insert |  |

## Generated example

```json
{
  "input": [
    {
      "activityDate": "string",
      "activityTypeId": 123,
      "apiName": "Example name",
      "attributes": [
        {
          "apiName": "Example name",
          "name": "Example name",
          "value": {}
        }
      ],
      "errors": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "id": 123,
      "leadId": 123,
      "marketoGUID": "123",
      "primaryAttributeValue": "string",
      "status": "created"
    }
  ]
}
```

## Referenced models

- [`CustomActivity`](./customactivity.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
