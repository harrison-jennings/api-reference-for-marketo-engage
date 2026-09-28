# EmailAppDataResponseDTO

**Type:** `object`

Location and program context of the email. Program fields are only present when the email lives under a program.

## Properties

| Property | Type | Required | Description | Constraints |
|---|---|:---:|---|---|
| `editorType` | string | No |  |  |
| `workspaceId` | string | No |  |  |
| `folderId` | string | No |  |  |
| `programId` | string | No |  |  |
| `programName` | string | No |  |  |
| `programType` | string | No |  |  |

## Generated example

```json
{
  "editorType": "string",
  "workspaceId": "123",
  "folderId": "123",
  "programId": "123",
  "programName": "Example name",
  "programType": "string"
}
```

## Source

Generated from [`swagger-asset.json`](https://raw.githubusercontent.com/AdobeDocs/marketo-apis/main/static/swagger-asset.json).
