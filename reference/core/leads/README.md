# Leads

Leads Controller

## Operations

| Method | Path | Operation |
|---|---|---|
| `GET` | `/rest/v1/lead/{leadId}.json` | [Get Lead by Id](get-lead-by-id.md) |
| `GET` | `/rest/v1/leads.json` | [Get Leads by Filter Type](get-leads-by-filter-type.md) |
| `POST` | `/rest/v1/leads.json` | [Sync Leads](sync-leads.md) |
| `POST` | `/rest/v1/leads/delete.json` | [Delete Leads](delete-leads.md) |
| `GET` | `/rest/v1/leads/describe.json` | [Describe Lead](describe-lead.md) |
| `GET` | `/rest/v1/leads/describe2.json` | [Describe Lead2](describe-lead2.md) |
| `GET` | `/rest/v1/leads/partitions.json` | [Get Lead Partitions](get-lead-partitions.md) |
| `POST` | `/rest/v1/leads/partitions.json` | [Update Lead Partition](update-lead-partition.md) |
| `GET` | `/rest/v1/leads/programs/{programId}.json` | [Get Leads by Program Id](get-leads-by-program-id.md) |
| `POST` | `/rest/v1/leads/programs/{programId}/status.json` | [Change Lead Program Status](change-lead-program-status.md) |
| `POST` | `/rest/v1/leads/push.json` | [Push Lead to Marketo](push-lead-to-marketo.md) |
| `GET` | `/rest/v1/leads/schema/fields.json` | [Get Lead Fields](get-lead-fields.md) |
| `POST` | `/rest/v1/leads/schema/fields.json` | [Create Lead Fields](create-lead-fields.md) |
| `GET` | `/rest/v1/leads/schema/fields/{fieldApiName}.json` | [Get Lead Field by Name](get-lead-field-by-name.md) |
| `POST` | `/rest/v1/leads/schema/fields/{fieldApiName}.json` | [Update Lead Field](update-lead-field.md) |
| `POST` | `/rest/v1/leads/submitForm.json` | [Submit Form](submit-form.md) |
| `POST` | `/rest/v1/leads/{leadId}/associate.json` | [Associate Lead](associate-lead.md) |
| `GET` | `/rest/v1/leads/{leadId}/listMembership.json` | [Get Lists by Lead Id](get-lists-by-lead-id.md) |
| `POST` | `/rest/v1/leads/{leadId}/merge.json` | [Merge Leads](merge-leads.md) |
| `GET` | `/rest/v1/leads/{leadId}/programMembership.json` | [Get Programs by Lead Id](get-programs-by-lead-id.md) |
| `GET` | `/rest/v1/leads/{leadId}/smartCampaignMembership.json` | [Get Smart Campaigns by Lead Id](get-smart-campaigns-by-lead-id.md) |
| `GET` | `/rest/v1/program/members/describe.json` | [Describe Program Member](describe-program-member.md) |
