---
name: abzu-mindmap
description: Build an evidence-linked reasoning map rather than a table-of-contents mind map.
---

# Mindmap proposal

Model the paper's structure and reasoning together. Start from its research question, then use the meaningful
section order as the backbone (for example Introduction → Background → Model Architecture and its components
→ Why Self-Attention → Training → Results → Conclusion). Create 5–10 section hub nodes, give them consecutive
`spine_order` values, and connect every adjacent pair with a `next` edge. These hubs are the visible main line;
attach details to the relevant hub instead of turning every detail into another step on the line. Do not copy
every heading, but preserve the paper's meaningful source order.

Keep every spine hub visually terse: `title` is only the short source-section label (for example
`Introduction`), and `body_md` is exactly one `##` line containing its guiding question or takeaway (for
example `## 我们究竟要解决什么？`). Put explanations, figures, and data in child nodes.
Every spine hub must have at least one direct child carrying its most important explanation, mechanism,
result, or limitation. Keep `evidence_refs` for internal grounding only; never put EvidenceRef tokens,
clickable evidence links, numbered evidence labels, or source-snippet lists in visible node Markdown.

Show the conceptual or causal mechanism, how experiments test it, what supports or qualifies the conclusion,
and real limitations. A node exists only when removing it would make the structure or reasoning harder to
follow. Prefer one to three direct detail children per hub and 12–24 nodes overall. Every detail node must state
one complete proposition: begin `body_md` with a concise `###` takeaway, followed by at most four short bullets
only when they add necessary mechanism, data, or qualification. Avoid paragraph dumps, duplicate summaries,
and generic nodes named “Evidence 1” or “证据 1”.

Keep the graph visually calm: the ordered hubs and their `next` edges are the horizontal backbone; details
branch from their owning hub. Give a detail node one parent unless a second relation is essential to understand
the argument. Do not add relation prose to visible content. Use a figure only in a detail node where it makes
architecture, mechanism, or results materially easier to understand. Keep short content inline in the Canvas;
the App creates a separate Markdown file for every node with a figure, and for genuinely long content.
These file-backed nodes retain the same Canvas dimensions and typography as inline cards.

Return only this complete proposal:

```json
{
  "schema_version": "abzu-mindmap-proposal/1.0",
  "paper_id": "paper-...",
  "expected_revision": 0,
  "title": "...",
  "nodes": [{
    "id": "root-question",
    "title": "...",
    "body_md": "...",
    "role": "question",
    "spine_order": 1,
    "evidence_refs": ["evidence-..."],
    "figure_source_refs": []
  }],
  "edges": [{"from": "root-question", "to": "background", "relation": "next"}]
}
```

Required roles: `question`, `mechanism`, `evidence`, `conclusion`; optional roles include `method`,
`result`, `limitation`, `context`. Relations are one of `motivates`, `defines`, `enables`, `supports`,
`next`, `tests`, `causes`, `qualifies`, `contradicts`, `limits`, `concludes`. `spine_order` is required only on
the 5–10 hub nodes; omit it from detail nodes. Produce one connected DAG whose first spine node is the only
root and 6–30 nodes total. Every node needs current EvidenceRefs for internal validation. Use at most two source figures on a node. Use
figures only when they materially clarify architecture, mechanism, or results. Existing `supporting_outputs`
from summary/report may guide emphasis, but paper evidence is authoritative. Keep top-level hub nodes in paper
order and attach mechanism, result, and evidence children to the relevant hub. The spine follows the paper;
unlike Slides, it does not rearrange sections into a generic presentation formula.
The App chooses layout, composes figures with report's existing figure tool, deep-links evidence, and writes
`output/mindmap/<paper-id>/mindmap.canvas` atomically.

Before accepting a figure node, inspect the complete original figure and both caption columns.
A spanning XRO Figure 2 once retained panels a–l but lost m–p, including the decisive all-month
forecast-skill comparison. A plausible left-hand montage is not a complete figure. Preserve the
panel inventory and complete legend; use the shared figure reconstruction tool. When a node uses
symbols such as L, LM, C1 or C2, link the defining source equation and explain the required blocks
before interpreting them. Never leave a variable disconnected from its definition.
