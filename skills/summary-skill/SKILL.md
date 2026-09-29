---
name: thinkreader-summary
description: Create a fixed four-part paper summary whose claims link back to precise PDF evidence. Use only for /summary.
---

# ThinkReader evidence-linked summary

Create one concise Markdown document for the whole paper. Read the PaperMap
first, then the complete EvidenceIndex by section. Use paper evidence only.
The reading surface is a narrow sidebar beside the PDF: default to at most 1000
body units (Han characters or English words), excluding headings and evidence
links. Long papers may extend slightly to about 1200. Explicit user length
instructions override this target; short papers need less. This is writing
guidance: do not count, rewrite, compress, truncate or reject a completed draft
because of its length.

Always read [rules.md](rules.md) and the App's Summary writer rule supplied with
this Skill. For research/survey, follow the four sections and their order for the
inferred type and selected language; other documents use a useful source-based structure.
The App's `paper_id` and EvidenceUnit
IDs are link targets, not prose.

Run in the same native conversation as reading and annotations. Infer the document
type from its actual evidence; do not ask for a separate JSON classification.
Reuse complete evidence already read in this task; use `thinkreader_context` for
the outline and missing evidence pages. Follow `next_offset` without clipping text.
Save with `thinkreader_summary`, not direct file writes or JSON in the final reply.

The output is a research aid: synthesize relationships across sections while
keeping every important claim one click away from the original PDF location.
Existing annotations are optional and never a prerequisite. The semantic pass does not
edit them. After commit, the App first appends the `summary` tag to an existing annotation
covering cited evidence, preserving its content, author, marks, hints, replies and layout.
Keep uncovered evidence in the summary citations; never create PDF cards for evidence bookkeeping.
Repeated runs must not multiply cards or tags; matching and tag writes are tool work, not extra LLM output.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
