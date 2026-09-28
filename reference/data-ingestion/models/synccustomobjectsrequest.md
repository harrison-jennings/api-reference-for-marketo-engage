# SyncCustomObjectsRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `priority` | string | No | Priority of the request. | enum: normal, high; default: normal |
| `dedupeBy` | string | No | Attributes to deduplicate on. | enum: dedupeFields, marketoGUID; default: dedupeFields |
| `customObjects` | array of [`CustomObject`](./customobject.md) | Yes | List of attribute name-value pairs for the object. |  |

## Generated example

```json
{
  "priority": "normal",
  "dedupeBy": "dedupeFields",
  "customObjects": [
    {
      "email": "brooklyn.parker@karnv.com",
      "vin": "20UYA31581L000000",
      "make": "BMW",
      "model": "3-Series 330i",
      "year": 2003
    }
  ]
}
```

## Referenced models

- [`CustomObject`](./customobject.md)

## Source

Generated from [`swagger-data-ingestion.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-data-ingestion.json).
