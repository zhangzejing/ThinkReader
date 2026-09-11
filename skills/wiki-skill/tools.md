# Wiki tools

These capabilities run inside the App output runner. Request read/validation tools with
`{"tool_calls":[{"name":"wiki.alias.lookup","arguments":{"title":"...","aliases":[]}}]}`.
The App returns results; then return the complete proposal. The runner validates and applies it,
never the model's shell. HTTP read/validation transport is `POST /api/outputs/tool` with
`kind`, `paper_id`, `name`, `arguments`. Apply is runner-owned.

| Tool | Contract |
| --- | --- |
| `wiki.context.read` | Return PaperItem, PaperMap, current EvidenceRefs, annotations, existing paper output, candidate graph neighbors and ownership metadata. |
| `wiki.alias.lookup` | Resolve a title or alias to canonical common nodes and return ambiguity candidates. Read-only. |
| `library.paper.lookup` | Resolve DOI or full title against registered library papers; return authors/year and an existing wiki_node_id when available. Empty/ambiguous results never authorize inventing a hub. |
| `evidence.search` | Search the current paper and return exact evidence IDs with section/page context. Read-only. |
| `wiki.proposal.validate` | Validate operations, vocabulary, ownership, EvidenceRefs, paths, links, aliases and duplicate nodes without writing. |
| `wiki.proposal.apply` | Runner-owned validated directory transaction with rollback, revision check and retained backup; render reciprocal navigation without inventing inverse semantic edges and refresh the derived map. |

The LLM supplies node semantics, prose and relationships. Tools supply existing text, canonical identities, stable paths, copied evidence metadata, deterministic link expansion and writes.
