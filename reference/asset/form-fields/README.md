# Form Fields

Form Field Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/asset/v1/form/fields.json` | [Get Available Form Fields](get-available-form-fields.md) |
| `GET` | `/rest/asset/v1/form/programMemberFields.json` | [Get Available Form Program Member Fields](get-available-form-program-member-fields.md) |
| `POST` | `/rest/asset/v1/form/{formId}/field/{fieldId}/visibility.json` | [Add Form Field Visibility Rules](add-form-field-visibility-rules.md) |
| `POST` | `/rest/asset/v1/form/{id}/field/{fieldId}.json` | [Update Form Field](update-form-field.md) |
| `POST` | `/rest/asset/v1/form/{id}/field/{fieldId}/delete.json` | [Delete Form Field](delete-form-field.md) |
| `POST` | `/rest/asset/v1/form/{id}/fieldSet.json` | [Add Fieldset to Form](add-fieldset-to-form.md) |
| `POST` | `/rest/asset/v1/form/{id}/fieldSet/{fieldSetId}/field/{fieldId}/delete.json` | [Delete Field from Fieldset](delete-field-from-fieldset.md) |
| `GET` | `/rest/asset/v1/form/{id}/fields.json` | [Get Fields for Form](get-fields-for-form.md) |
| `POST` | `/rest/asset/v1/form/{id}/fields.json` | [Add Field to Form](add-field-to-form.md) |
| `POST` | `/rest/asset/v1/form/{id}/reArrange.json` | [Update Field Positions](update-field-positions.md) |
| `POST` | `/rest/asset/v1/form/{id}/richText.json` | [Add Rich Text Field](add-rich-text-field.md) |
