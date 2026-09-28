# CreateEmailRequest

**Type:** `object`

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `description` | string | No | Description of the asset |  |
| `folder` | [`Folder`](./folder.md) | Yes | JSON representation of parent folder, with members 'id', and 'type' which may be 'Folder' or 'Program' |  |
| `fromEmail` | string | Yes | From-address of the Email |  |
| `fromName` | string | Yes | From-name of the Email |  |
| `name` | string | Yes | Name of the email |  |
| `operational` | boolean | No | Whether the email is operational. Operational emails bypass unsubscribe status. Defaults to false |  |
| `replyEmail` | string | Yes | Reply-To address of the Email |  |
| `subject` | string | Yes | Subject Line of the Email |  |
| `template` | integer (int32) | Yes | Id of the parent template |  |
| `textOnly` | boolean | No | Setting to include text-only version of email when sent |  |
| `autoCopyToText` | boolean | No | Setting to automatically copy HTML version to Text version |  |

## Generated example

```json
{
  "description": "string",
  "folder": {
    "id": 123,
    "type": "Folder"
  },
  "fromEmail": "person@example.com",
  "fromName": "Example name",
  "name": "Example name",
  "operational": true,
  "replyEmail": "person@example.com",
  "subject": "string",
  "template": 123,
  "textOnly": true,
  "autoCopyToText": true
}
```

## Referenced models

- [`Folder`](./folder.md)

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
