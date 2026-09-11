# Report tools

The App injects full-paper context and figure metadata. Request additional read/validation tools
using `{"tool_calls":[{"name":"evidence.search","arguments":{"query":"..."}}]}`.
HTTP transport is `POST /api/outputs/tool` with `kind`, `paper_id`, `name`, `arguments`.
Return the final proposal for runner-owned validation/apply; do not use shell writes.

| Tool | Contract |
| --- | --- |
| `report.context.read` | Return PaperItem, PaperMap, relevant complete sections, annotations, figure/table labels, source fragments, declared resources and output ownership. |
| `evidence.search` | Find exact EvidenceRefs and return section/page context. Read-only. |
| `evidence.cite` | Turn selected evidence IDs into stable ThinkReader deep links and copied citation metadata. |
| `figure.source.read` | Return an atomic original figure block: all required fragments, caption, label and provenance. |
| `figure.compose` | Stitch all fragments of a source figure in page-relative positions; return dimensions and provenance. Report assembly invokes it automatically before importing each multi-fragment figure. |
| `report.validate` | Check paths, EvidenceRefs, labels, images, hollow headings and thresholds without writing. Claim entailment and numeric conditions still require Agent review, not a falsely advertised automatic proof. |
| `output.apply` | Runner-owned directory transaction within `output/report/<paper_id>/`, including pre-import figure stitching, revision checks, rollback and retained backup. |

The LLM selects evidence and authors prose. Tools copy source material, build links and figures, assemble files and perform deterministic checks.
