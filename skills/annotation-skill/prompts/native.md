# Native annotation tool reference

This file changes tool use only, never the selected command's content, depth,
coverage or presentation standards. Load the selected Skill's required method
and applicable references before composing annotations. Do not substitute the
flash method for annotation, browse or deep reading.

When the App supplies evidence directly in conversation input, read those complete
pages and let subsequent pages arrive automatically. Do not fetch or print the whole
paper again. Native tools remain available for targeted verification and image viewing.

Use `thinkreader_context` mode `overview` for the outline, existing-work counts
and source version. Read relevant evidence with mode `evidence`, paging with
offset/limit and optionally section_id/query. Evidence reads return at most 100 units,
bounded by response size without shortening any text. Always follow next_offset until
complete; do not calculate offset+limit, which can skip units in size-bounded pages.
Read contiguous batches rather than making one call for every paragraph or short section.
In code-mode, parse the MCP text payload and display ONE evidence page per tool
response. Do not wrap the whole MCP envelope in JSON again, combine several pages
or sections under one output budget, or filter evidence by keywords. Fetching data
into a variable is not reading it. Display every item's complete text, including
nonmatching passages, and recover truncated output before continuing. Follow each
section's next_offset as well as whole-paper pagination; never guess the next offset.
Choose scope from the user's actual
request; submit `scope` as full or selected references before writes. Inspect mode
`annotations` and `progress` when continuing; prior reviewed IDs are hints, not an
instruction to ignore changed scope or blindly skip necessary reading.

For explicit flash annotation, use flash.md's single-pass reading and batching
order; the validation and write protocol below still apply. For other modes,
start with the outline, abstract and conclusion to establish the global argument,
then read the first complete in-scope section (the abstract can be this section).
Submit a small first batch of 1–3 useful, source-supported annotations immediately,
before reading all remaining sections or composing the rest of the annotations.
Aim to save this first batch within a minute when the paper is already indexed;
do not invent marks or weaken validation to meet the timing target. Use section_id
to read a complete section and follow next_offset if that section spans pages.

Continue reading the entire paper, including figures, tables and captions, and
submit each coherent group as soon as it is ready. The overview is not a substitute
for full-paper reading. Early marks must stay within what the passages establish;
defer claims requiring unread experiments or cross-paper synthesis. At the end,
check the whole argument. Report any contradiction or necessary correction with
the affected saved annotation IDs; never claim a correction was persisted without
a confirmed service write. Preserve human edits and avoid duplicate cards.
For selected scope, still finish reading the full paper for context while writing
only within the requested scope. `scope` limits writes, not context reads.
Do not hold already supported text annotations while resolving an unrelated figure
or external page. Inspect the local original PDF with available tools; if required
visual evidence is unavailable, disclose that gap and never claim it was checked.
The overview provides read-only source_pdf and visual_sources image paths. Open
the relevant images with the runtime's image-viewing tool, or render the original
PDF page, before writing visual interpretations. Image paths and captions are not
images seen. For text-supported notes about an unchecked figure, explicitly say
they rely on the paper's description and disclose the unchecked figure at the end.
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
phrase targets. Do not add marks to fill a batch. A single useful mark needs no
batching delay. thinkreader_annotate appends marks. For saved cards, read their current
revision and use thinkreader_annotation to reply or update supplied fields. It supports
body edits/clearing, color changes and relocation by evidence_id plus exact quote;
omitted fields and existing discussion remain intact. Pure phrase highlights use an
empty or omitted body_md. A stale card revision is rejected. Report only confirmed writes.
For a researcher's second perspective on existing work, use the audit Skill. On interruption, use
native conversation plus saved work to continue, not a compulsory restart from
section one. Conclude in natural language with confirmed results and any gaps.

Before composing marks, inspect each evidence item's `supported_annotation_kinds`
and `alignment_status`. Block alignment is not phrase alignment: area-only blocks
may support independently validated phrases. If phrase is unavailable because
PDF text geometry is missing, use a useful area note or skip. Never
invent coordinates or claim a phrase highlight was saved when only an area was.
When phrase is supported, use distinct local quotes for abstract facets; do not
stack multiple area cards on the same abstract merely because alignment_status
says area-only. A missing visual quote is not a reason to skip viewing the image.
On `retryable=false`, do not repeat the same unsupported operation. For `phrase_not_found`,
choose a short exact phrase from the returned PDF `quote_sources`; do not join separate
fragments or resubmit the same quote. Repair only rejected useful marks, without changing
accepted marks or abandoning a supported key result. A batch with `accepted=0` wrote nothing.
For `phrase_ambiguous`, choose a returned candidate's `quote_start`, or supply
`quote_prefix`/`quote_suffix` from source context. Retry only rejected items;
never guess a location or repeat accepted writes. A support count is not a match rate.
Write scope may be narrowed to the requested passage; omit scope to keep it.
Do not broaden an already selected scope beyond the current user's request.

## Mapping presentation standards to native tools

`thinkreader_skill(name, resource)` loads the selected task's snapshotted reference,
not a different mode. Load `templates.md` for special cards before writing them.
`thinkreader_annotate.actions` also supports source-linked `hints` (body_md and
local quote), and `pin=true` for selected new area storyline cards. For grouped cards,
each Hint may name a different `evidence_id` from `covered_evidence_ids`. Select
distinct local passages where useful. A Hint may omit its quote; an omitted or
unmatched quote saves its text without a source highlight. Do not force a link or
substitute the whole block. The parent area must cover what the card describes:
use `covered_evidence_ids` for a card summarizing several neighboring blocks,
or keep the card local and leave broader context in an unlinked Hint.
Preserve browse's
heading/hint format and 5–15 main-thread cards where evidence supports them;
choose those cards with the whole argument in view, not a per-section pin quota.
Reuse means inspect existing annotations and omit equivalent new actions; do not
resubmit them merely to change style. Saved user cards and replies remain intact.

Context `mode=annotations` returns each saved annotation's `url`. Use ordinary
Markdown `[short title](url)` when referring to saved cards, including a storyline
reading list. ThinkReader displays these as compact cards and selects the annotation
in its original PDF on click. Use returned URLs; do not invent annotation IDs.

Captions do not require translation. Only when the user asks for it, read the verified `caption_segments` in evidence and
submit `clues` (evidence_id, body_md, optional color) in thinkreader_annotate with
an independent idempotency key and `actions=[]`. This uses the existing caption
clue service, not a substitute annotation. No caption_segments means this source
cannot currently support a verified caption clue; disclose the gap, not success.
These tool mappings replace old selector/proposal protocol details only.
