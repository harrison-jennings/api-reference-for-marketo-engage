# InputStreamRangeContent

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `contentType` | string | No |  |  |
| `fileRange` | [`FileRange`](./filerange.md) | No |  |  |
| `inputStream` | [`InputStream`](./inputstream.md) | No |  |  |
| `length` | integer (int64) | No |  |  |

## Generated example

```json
{
  "contentType": "string",
  "fileRange": {
    "end": 123,
    "start": 123
  },
  "inputStream": {},
  "length": 123
}
```

## Referenced models

- [`FileRange`](./filerange.md)
- [`InputStream`](./inputstream.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
