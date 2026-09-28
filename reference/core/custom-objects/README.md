# Custom Objects

Custom Objects Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/v1/customobjects.json` | [List Custom Objects](list-custom-objects.md) |
| `GET` | `/rest/v1/customobjects/schema.json` | [List Custom Object Types](list-custom-object-types.md) |
| `POST` | `/rest/v1/customobjects/schema.json` | [Sync Custom Object Type](sync-custom-object-type.md) |
| `GET` | `/rest/v1/customobjects/schema/fieldDataTypes.json` | [Get Custom Object Type Field Data Types](get-custom-object-type-field-data-types.md) |
| `GET` | `/rest/v1/customobjects/schema/linkableObjects.json` | [Get Custom Object Linkable Objects](get-custom-object-linkable-objects.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/addField.json` | [Add Custom Object Type Fields](add-custom-object-type-fields.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/approve.json` | [Approve Custom Object Type](approve-custom-object-type.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/delete.json` | [Delete Custom Object Type](delete-custom-object-type.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/deleteField.json` | [Delete Custom Object Type Fields](delete-custom-object-type-fields.md) |
| `GET` | `/rest/v1/customobjects/schema/{apiName}/dependentAssets.json` | [Get Custom Object Dependent Assets](get-custom-object-dependent-assets.md) |
| `GET` | `/rest/v1/customobjects/schema/{apiName}/describe.json` | [Describe Custom Object Type](describe-custom-object-type.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/discardDraft.json` | [Discard Custom Object Type Draft](discard-custom-object-type-draft.md) |
| `POST` | `/rest/v1/customobjects/schema/{apiName}/{fieldApiName}/updateField.json` | [Update Custom Object Type Field](update-custom-object-type-field.md) |
| `GET` | `/rest/v1/customobjects/{customObjectName}.json` | [Get Custom Objects](get-custom-objects.md) |
| `POST` | `/rest/v1/customobjects/{customObjectName}.json` | [Sync Custom Objects](sync-custom-objects.md) |
| `POST` | `/rest/v1/customobjects/{customObjectName}/delete.json` | [Delete Custom Objects](delete-custom-objects.md) |
| `GET` | `/rest/v1/customobjects/{customObjectName}/describe.json` | [Describe Custom Objects](describe-custom-objects.md) |
