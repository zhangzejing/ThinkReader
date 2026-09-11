---
name: abzu-summary
description: Create a fixed four-part paper summary whose claims link back to precise PDF evidence. Use only for /summary.
---

# ThinkReader evidence-linked summary

Create one concise Markdown document for the whole paper. Read the PaperMap
first, then the complete EvidenceIndex by section. Use paper evidence only.

Always read [rules.md](rules.md) and [writer.md](writer.md). The four required
sections and their order are immutable. The App's `paper_id` and EvidenceUnit
IDs are link targets, not prose.

The output is a research aid: synthesize relationships across sections while
keeping every important claim one click away from the original PDF location.
Existing annotations are optional and never a prerequisite. The semantic pass does not
edit them. After commit, the App first appends the `summary` tag to an existing annotation
covering cited evidence, preserving its content, author, marks, hints, replies and layout.
Only uncovered evidence gets a tiny `### summary` work-trace card. Repeated runs must not
multiply cards or tags; matching and tag writes are tool work, not extra LLM output.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
