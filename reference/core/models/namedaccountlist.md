# NamedAccountList

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `createdAt` | string | No | Datetime when the named account list was created |  |
| `marketoGUID` | string | Yes | Unique GUID of the custom object records |  |
| `name` | string | No | Name of named account list |  |
| `reasons` | array of [`Reason`](./reason.md) | No | List of reasons why an operation did not succeed. Reasons are only present in API responses and should not be submitted |  |
| `seq` | integer (int32) | Yes | Integer indicating the sequence of the record in response. This value is correlated to the order of the records included in the request input. Seq should only be part of responses and should not be submitted. |  |
| `status` | string | No |  | enum: created, updated, deleted, skipped, added, removed |
| `type` | string | No | Type of named account list ("default" if created by user or API, "external" if managed by CRM-View) |  |
| `updateable` | boolean | No | Whether the list is updateable (true if created by user or API, false if managed by CRM-View) |  |
| `updatedAt` | string | No | Datetime when the named account list was most recently updated |  |

## Generated example

```json
{
  "createdAt": "string",
  "marketoGUID": "123",
  "name": "Example name",
  "reasons": [
    {
      "code": "string",
      "message": "string"
    }
  ],
  "seq": 123,
  "status": "created",
  "type": "string",
  "updateable": false,
  "updatedAt": "string"
}
```

## Referenced models

- [`Reason`](./reason.md)

## Source

Generated from [`swagger-mapi.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-mapi.json).
