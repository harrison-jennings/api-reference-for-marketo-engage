# LookupCustomObjectRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `batchSize` | integer (int32) | No | Maximum number of records to return in the response. Max and default is 300 |  |
| `fields` | array of string | No | List of fields to return. If not specified, will return the following fields: marketoGuid, dedupeFields, updatedAt, createdAt, filterType |  |
| `filterType` | string | No | Field to search on. Valid values are: dedupeFields, idFields, and any field defined in searchableFields attribute of Describe endpoint. Default is dedupeFields |  |
| `input` | array of [`CustomObject`](./customobject.md) | Yes | Search values when using a compound key. Each element must include each of the fields in the compound key. Compound keys are determined by the contents of "dedupeFields" in the Describe result for the object |  |
| `nextPageToken` | string | No | Paging token returned from a previous response |  |

## Generated example

```json
{
  "batchSize": 123,
  "fields": [
    "string"
  ],
  "filterType": "string",
  "input": [
    {
      "marketoGUID": "123",
      "reasons": [
        {
          "code": "string",
          "message": "string"
        }
      ],
      "seq": 123
    }
  ],
  "nextPageToken": "example-token"
}
```

## Referenced models

- [`CustomObject`](./customobject.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
