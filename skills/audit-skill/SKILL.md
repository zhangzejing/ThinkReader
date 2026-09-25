---
name: audit-skill
description: Contribute an independent researcher's perspective in annotation replies, and check and refine existing ThinkReader outputs.
---

# Audit saved work

Build on existing annotations as a second researcher; check and refine existing outputs.
Do not restart a full paper review or treat all work as an error-hunting exercise.
Resolve the target from the quoted annotation, output path, named author, current paper
and authorized shared conversation. Use `thinkreader_chat` when the request refers to
another Agent's work. Agents share saved content and authorized channel history, not
private runtime reasoning. Ask only if multiple plausible targets remain.

Use `thinkreader_context` overview for the paper, original PDF, visual sources and
resource paths. Read annotations with mode `annotations`, including replies, author
and current revision; follow every `next_offset` needed for the requested target.
Read output content with `thinkreader_output` at its resource path, following next_offset
until the full target is available. A completion
message or reviewed count is not evidence of what was saved or correctly understood.

Check each material claim against the relevant complete passage. Widen reading only
as needed to resolve the claim. Keep each fetched page separate; never concatenate
many results under one tool-output budget, clip paragraphs or filter away nonmatching
text. Recover truncated output before using it. View the actual image/PDF before
claiming a plot or table has been checked; keep the source label attached to each image.

Prioritize factual errors: numerical values, experimental conditions, comparison
baselines, parameter direction, figure/table identity, citation targets and omissions
that change the meaning. Distinguish experiments performed here from work cited by a
survey, measured results from theory, and the paper's claims from interpretation.
Read the whole saved card and its replies before claiming it omitted a qualification.
For disputed numbers or parameter directions, cross-check the relevant method and
experiment/discussion passages; one matching sentence does not settle the claim.
Treat contradictions in the source as source uncertainty, not permission to invent a fix.

For annotations, contribute your own substantive perspective: an alternative explanation,
a missing connection or boundary, a counterargument, or a concrete experiment that could
distinguish hypotheses. Explain what the first researcher established and what your point
adds. Label inference and untested hypotheses; source support for a fact does not prove
your interpretation. A correct card can still invite a useful new idea. Do not paraphrase
the original, mechanically agree, or force a quota of criticisms or replies.

Reply to the relevant original card with `thinkreader_annotation(operation="reply")`,
using its current revision as expected_annotation_revision. This is the normal output of
annotation discussion. Use operation="update" for an unambiguous factual correction or
a requested edit; preserve the original viewpoint, anchor and existing discussion.
Do not edit unnecessarily. Changed bodies display the editing Agent as the latest author. Put
disagreements and new interpretations in replies instead of replacing another researcher's
voice. Use `thinkreader_annotate` for a useful new independent source-linked card.

For outputs, prioritize source checks, concrete revision suggestions and small supported
corrections. Use `thinkreader_output(content=..., expected_revision=...)` to save warranted
minor edits. Preserve the document's structure, authorial intent and all unaffected text
and links. Propose substantial restructuring or speculative additions instead of silently
rewriting them. Never compress, truncate or reject an output because of length.

Explicit read-only/no-change requests override these write defaults. On a revision conflict,
reread the current card/file and reconcile; never blindly retry or overwrite concurrent work.
Report what was actually replied to, changed or left as a suggestion, with source locations
and any unverified material. Link every discussed annotation using its returned `url` as
ordinary Markdown `[short card title](url)`, including each row in a review table.
`thinkreader_context(mode="annotations")` and successful `thinkreader_annotation` writes
return these URLs; replies link to their parent card. Use the exact returned URL, never
invent an ID or replace the link with a bare title, ID, or instructions to find the card.
Keep progress and the final conversation concise; the substantive
discussion belongs beside the relevant card or output. Never edit annotation JSON directly.
