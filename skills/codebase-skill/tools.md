# Codebase tools

The App injects complete paper sections and metadata. Request additional read/validation tools
using `{"tool_calls":[{"name":"evidence.cite","arguments":{"evidence_refs":["ev-..."]}}]}`.
HTTP transport is `POST /api/outputs/tool` with `kind`, `paper_id`, `name`, `arguments`.
Return the final proposal for runner-owned validate/apply, never shell writes.

| Tool | Contract |
| --- | --- |
| `codebase.context.read` | Return PaperItem, PaperMap, complete method/experiment sections, equations, figures/tables, annotations, provenance and output ownership. |
| `evidence.search` | Find exact method, hyperparameter, dataset, metric and limitation evidence with section/page context. Read-only. |
| `evidence.cite` | Produce stable EvidenceRef deep links and copied metadata. |
| `resource.inspect` | Extract declared code/data/weight URLs and paper-stated availability; label them unverified, without network fetch, cloning or executing them. |
| `codebase.validate` | Validate file set, JSON schema, placeholders, EvidenceRefs, labels, targets, and cross-file metric/experiment consistency without writing. |
| `output.apply` | Runner-owned validated directory transaction inside `output/codebase/<paper_id>/`, with revision checks, rollback and a retained backup. Not available through model tool calls. |

The LLM determines architecture, interfaces, risks and prose. Tools retrieve exact source facts, copy values, assemble JSON/files and enforce consistency.
