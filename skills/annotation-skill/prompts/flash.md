# Flash annotation

Use a single-pass whole-paper skim. This order replaces native.md's separate
abstract/conclusion and early-section passes for this explicit lightweight mode:
read the overview once, then contiguous evidence pages through the end. Follow the
returned next_offset exactly: pages are bounded by response size, not a fixed item count.
In code-mode, parse the MCP text payload before displaying it; retain each item's
ID, kind, section, page, complete text, alignment, supported kinds and any captions.
Display each page unchanged, with complete text and an adequate output budget, not all pages combined
under a default budget. If output is truncated, show the missing portion from
stored results or reduce the page size; never count hidden text as read. Never use
slice/substring or a per-paragraph character limit on evidence text to make it fit.
Do not filter paragraphs by keywords, skip references/appendices, or replace the
returned next_offset with a chosen batch size. A whole-paper skim still reads the
complete text once; only the annotations are selective.
Select exact local
anchors and their brief semantic labels during that same pass; do not reread
sections to write each card. Whole-paper coverage means inspecting all available
evidence, not placing a mark in every paragraph. Never mark unseen evidence reviewed.

Give a brief user-facing update as work starts and meaningful updates as reading
and saving progress. Early visible feedback matters more than total completion time;
there is no fixed completion deadline. Keep useful notes concise and submit one batch when it fits the tool's limit; for longer
papers, submit coherent groups as evidence pages are read. Check the returned
committed/rejected items and repair only rejected useful marks. Do not fetch all
saved cards again after confirmed writes unless a specific discrepancy needs it.
Finish with confirmed counts and any unread or unverified evidence. Do not omit
whole sections, weaken quote validation or claim success to satisfy a deadline.
Visual-only evidence that cannot be checked in this skim remains a disclosed gap.

Prefer exact key phrases: contribution, mechanism, assumption, constraint,
decisive result or limitation. Retain the qualifiers, numbers and comparison
baseline needed to keep the meaning true. Use an area only for genuinely visual
evidence or a relationship that a phrase cannot represent.
Prefer a short, unbroken phrase copied from the evidence over a full sentence
crossing line wraps, split words or extracted math. Keep essential conditions in
the note when the compact anchor alone cannot express them; do not reconstruct
spelling or spacing and expect an exact quote match.

An ordinary semantic label may be the whole body, always as a level-3 heading:
“### 复杂度瓶颈”, “### 关键假设”, “### 实验结果”.
Add prose only when it provides an actual implication, causal explanation,
tradeoff or applicability condition beyond the highlighted words. For example,
quadratic attention cost may warrant “序列长度翻倍，注意力矩阵元素数约增至四倍。”
Do not translate or paraphrase just to fill a card. Distinguish interpretation
from the paper's claim. Use the user's language. No abstract/section/figure quotas,
mandatory caption translation, or special-card template for this mode.

The abstract is an exception to label-only notes: reconstruct its main storyline,
covering the distinct problem, contribution, method and result when supported.
Use separate local anchors and a factual sentence below each `###` semantic label.
Do not finish the abstract with one generic label or invent missing facets.
