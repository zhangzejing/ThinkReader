# Native annotation tool reference

This file changes tool use only, never the selected command's content, depth,
coverage or presentation standards. Load the selected Skill's required method
and applicable references before composing annotations. Do not substitute the
flash method for annotation, browse or deep reading.

Use `thinkreader_context` mode `overview` for the outline, existing-work counts
and source version. Read relevant evidence with mode `evidence`, paging with
offset/limit and optionally section_id/query. Choose scope from the user's actual
request; submit `scope` as full or selected references before writes. Inspect mode
`annotations` and `progress` when continuing; prior reviewed IDs are hints, not an
instruction to ignore changed scope or blindly skip necessary reading.

Default to reading the full paper before submitting annotations, then batch
writes by section or coherent groups of paragraphs. An overview or search hit
is not full-text reading: page through the evidence, including relevant figures,
tables and captions, to understand the argument before selecting marks. Separate
reading from writing: even when asked to annotate only the abstract or a section,
read the full paper for context, then annotate only the requested scope and use
the user's emphasis to choose marks. `scope` limits writes, not context reads.
Reuse evidence already read in the current native context; reread only missing
or changed material, not the full paper again for each batch or continuation.

Call `thinkreader_annotate` with the prepared actions for each group in one batch
rather than one call per mark: evidence_id,
kind=phrase, an exact contiguous quote, body_md and optional color. Use known
evidence IDs and the actual schema. The tool returns committed and rejected
items; repair only rejected items. `reviewed_evidence_ids` records passages you
have judged, including those needing no mark. Do not mark unseen text reviewed.
Saved annotations are authoritative; a checkpoint alone never proves a write.

Choose group boundaries and batch size within the actual schema's limits;
split large groups without reducing annotation quality or merging distinct
phrase targets. Do not add marks to fill a batch. Single-item edits and replies
need no batching delay. On interruption, use
native conversation plus saved work to continue, not a compulsory restart from
section one. Conclude in natural language with confirmed results and any gaps.

Before composing marks, inspect each evidence item's `supported_annotation_kinds`
and `alignment_status`. Block alignment is not phrase alignment: area-only blocks
may support independently validated phrases. If phrase is unavailable because
PDF text geometry is missing, use a useful area note or skip. Never
invent coordinates or claim a phrase highlight was saved when only an area was.
On `retryable=false`, do not repeat the same unsupported operation. Repair an exact
quote only when phrase is supported. A batch with `accepted=0` wrote nothing.
For `phrase_ambiguous`, choose a returned candidate's `quote_start`, or supply
`quote_prefix`/`quote_suffix` from source context. Retry only rejected items;
never guess a location or repeat accepted writes. A support count is not a match rate.
Write scope may be narrowed to the requested passage; omit scope to keep it.
Do not broaden an already selected scope beyond the current user's request.

## Mapping presentation standards to native tools

`thinkreader_skill(name, resource)` loads the selected task's snapshotted reference,
not a different mode. Load `templates.md` for special cards before writing them.
`thinkreader_annotate.actions` also supports source-linked `hints` (body_md and
local quote), and `pin=true` for selected new area storyline cards. Preserve browse's
heading/hint format and 5–15 main-thread cards where evidence supports them;
choose those cards with the whole argument in view, not a per-section pin quota.
Reuse means inspect existing annotations and omit equivalent new actions; do not
resubmit them merely to change style. Saved user cards and replies remain intact.

For caption translations, read the verified `caption_segments` in evidence and
submit `clues` (evidence_id, body_md, optional color) in thinkreader_annotate with
an independent idempotency key and `actions=[]`. This uses the existing caption
clue service, not a substitute annotation. No caption_segments means this source
cannot currently support a verified caption clue; disclose the gap, not success.
These tool mappings replace old selector/proposal protocol details only.
