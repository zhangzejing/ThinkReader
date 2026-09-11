# Annotation tools

These are controlled App tools. The Agent consumes their returned context and
selector references through proposal JSON; it never invokes a public CLI or
edits annotation truth.

## `paper-map.read`

Returns paper identity, abstract, ordered section tree, global claim/evidence
summary, visual inventory and annotation coverage summary.

## `section.read`

Returns one complete ordered section pack: EvidenceUnits, structure, relations,
linked equations/visuals, short bridges and existing annotations.

## `evidence.search`

Finds candidates by text, kind, relation or cue. A hit is not an annotation
decision until the whole section has been read.

## `quote.select`

Each EvidenceUnit exposes ordered `source_segments` whose short keys are
task-local selector refs and whose values are exact source text. Return
`selector_ref` or ordered contiguous `selector_refs`. The tool checks scope and
contiguity, copies exact text, and builds the final selector. Never return a
manually copied `quote`.

For `/annotation` and `/deep-annotation`, the App exposes short precision
segments so the Agent can select a technical term, key phrase, number or local
formula span. When an EvidenceUnit is block-only, it exposes sentence segments
instead: an area proposal must return local selector refs so the App can resolve
a sentence-sized area without pretending it is a phrase mark. For `/browse`, it
exposes coarser ordered reading segments but retains only the refs selected for
the card or hint; connective gaps are not expanded merely for coverage. In both
cases the App, not the Agent, copies and concatenates the exact PDF text.

Precision selectors are deliberately short, but their count is not a hard
content limit. Join only the contiguous segments needed to preserve the exact
claim. An equation or technical relation remains whole when splitting it would
destroy its meaning.

## `evidence.group`

For `/browse` and shared special cards, group contiguous same-section
EvidenceUnits into one semantic block. Shared special cards use plain Markdown
and no hints. Only ordinary browse paragraph cards may bind hints to ordered
selector refs. The tool creates the group anchor and copies selected hint text
without expanding selections merely to cover connective text.

## `clue.create-from-evidence`

For figures/tables and algorithms, return a `clues` request with the caption's
`evidence_id`, faithful full translation in `body_md`, and optional color.
The App exposes `caption_segments` copied from actual PDF text items; use these
as the translation source. With no `selector_refs`, it selects all of them.
When a unit mixes an algorithm caption with pseudocode, select only the complete
caption using the ordered `c...` refs in `caption_segments` (not the ordinary
`s...` or `p...` annotation refs). Do not translate Require/Ensure as caption.

The App builds the text anchor, validates the requests before section writes,
and writes via AppControl → ClueService in one atomic clue revision. Actor,
task, command, evidence and source identity are preserved. A retry of the same
task/selection cannot append another copy or overwrite different saved text.
No caption_segments means a verified text clue cannot be written; report that
limitation instead of inventing geometry or silently replacing it with a hint.

## `annotations.inspect`

Returns existing summaries and unanswered user reply targets without exposing
or allowing direct sidecar edits.

## `proposal.validate`

Validates one complete-section proposal: schema, scope, selectors, duplicate
targets, content limits and anchor capability. It returns actionable errors and
does not write.

## `proposal.reconcile`

Checks validated section proposals against the paper map. It rejects duplicate
targets, stacked abstract area spans, missing logical Figure area annotations,
and overlapping `/browse` semantic groups.
Semantic duplication and contradiction remain LLM judgments.

## `proposal.apply`

Uses AppControl → AnchorResolver → AnnotationService. After a complete section
passes validation it copies selectors, checks revision and atomically appends
that section, making the new revision visible to the Reader. It is not callable
outside the controlled runner.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
