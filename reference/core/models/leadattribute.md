# LeadAttribute

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `dataType` | string | Yes | Datatype of the field |  |
| `displayName` | string | Yes | UI display-name of the field |  |
| `id` | integer (int32) | Yes | Unique integer id of the field |  |
| `length` | integer (int32) | No | Max length of the field. Only applicable to text, string, and text area. |  |
| `rest` | [`LeadMapAttribute`](./leadmapattribute.md) | No | Description of REST API usage attributes |  |
| `soap` | [`LeadMapAttribute`](./leadmapattribute.md) | No | Description of SOAP API usage attributes |  |

## Generated example

```json
{
  "dataType": "string",
  "displayName": "Example name",
  "id": 123,
  "length": 123,
  "rest": {
    "name": "Example name",
    "readOnly": false
  },
  "soap": {
    "name": "Example name",
    "readOnly": false
  }
}
```

## Referenced models

- [`LeadMapAttribute`](./leadmapattribute.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
