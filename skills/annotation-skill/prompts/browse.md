# Browse: a connected guide beside the paper

Help a reader understand how the paper's argument develops. Read the App-supplied
full context once, then follow the paragraph queue in source order. Every target
in the user's scope needs a saved explanation or an explicitly reused equivalent
card. Coverage counts paragraphs, not headers, page numbers or reference entries.
Group adjacent paragraphs only when they express one move; do not silently omit
body paragraphs to produce a small highlights list.

Start with one brief visible acknowledgment before tools or planning. Save the
first supported text card promptly, before unrelated image inspection. Give useful
progress about every 20–30 seconds. Aim for about three minutes for an ordinary
browse; preserve scope and evidence when a long paper needs more time. Never claim
completion early to meet a timing target.

## Connected titles

An ordinary card body is exactly one `###` heading: a complete, plain sentence
stating what this paragraph adds. No prose below it. Prefer roughly 14–32 Chinese
characters or a compact sentence in the selected language; named subjects and
meaningful conditions take precedence over length.
Apply the ASD-STE100-inspired title and body language in `presentation.md` to
ordinary titles and all special-card prose. State one point directly; remove
filler and repetition without losing conditions or mathematical meaning.

- Maintain the referent across titles: the authors, the named method/model, then
  its introduced components. Reintroduce the name after a section break. Avoid
  switching from Dreamer to an isolated loss name or unexplained acronym.
- State who does what, to address which problem, or with what measured result.
  “三项损失与 free bits” names ingredients but explains neither their role nor
  their connection to the world model. “本段介绍” alone is not an explanation.
- Use the actual relation: motivation → gap → proposal; component → mechanism →
  training; question → experiment → result → qualification. These are reading
  relations, not compulsory headings for every paper.
- Preserve source order. A connective must be supported: sequence or correlation
  does not establish causality. Sparse rewards explain why Minecraft is difficult,
  not why Dreamer succeeds. Do not invent a causal bridge to improve fluency.
- Distinguish the author's claim, experimental observation and reader's inference.
  Keep the task, metric, baseline and condition that make a result meaningful.
- Each paragraph adds a distinct point. Supporting paragraphs should expose the
  new evidence or qualification, rather than repeat the previous conclusion.
- Introduce terms through their role before relying on shorthand. Familiarity
  with a label does not explain why the paper needs the component.
- Check preceding saved titles while writing the next group. Titles alone should
  read as connected prose, while each card remains understandable independently.
  Do not postpone saving for a final global rewrite.

Illustrative contrast, only when supported by the current paper:
“带下限的回报归一化” → “Dreamer 归一化回报，使同一策略设置适用于不同奖励尺度”。
Do not copy the example's factual claim to another source.

## Card scope and presentation

Use `paragraph_ids` and `body_md`; App binds PDF areas. Group only consecutive
same-page, same-section targets expressing one move. Cross-page continuations
keep separate anchors. Use `color="theme"`; pin useful storyline area cards with
`pin=true`. Pinning is presentation, not a limit on total cards or coverage.

Use 0–5 Hints as a paragraph's supporting explanation. Zero is appropriate when
the title already explains a single simple point. Otherwise partition all supplied
sentence numbers into 1–5 ordered, non-overlapping groups of adjacent App sentences,
using `sentence_end: last` (numbered from 1) and `body_md`. For example, ends
`1, 4, 6` mean groups `1`, `2–4`, `5–6`. The App derives each group's start.
In continuous card delivery, use the single supplied `sentences` table and
`sentence_end`; `sentence_basis: pdf-text` marks original PDF numbering. Do not
use `sentence_range` in that transport. Do not explain facts beyond a target's
`hint_scope`: an unnumbered page-end fragment
is not a complete source sentence. Explain a supplied PDF continuation on its
own page, using its target text.
In context tools, use the App's
`pdf_sentences` when present: its numbers refer to the original PDF
and need no copied formulas. Use its count even if extraction produced a different
`sentences` count; its `starts_with` and `ends_with` identify each PDF span.
Otherwise use the supplied `sentences` numbers. The final end must equal the last
number in the chosen list. Existing
`sentence_range: [first, last]` requests remain supported.
App supplies the boundaries and resolves the PDF targets; do not copy quotes or
invent coordinates. Group by meaning: problem/qualification, proposal/mechanism,
observation/interpretation, condition/limit. Do not split a premise from its
necessary qualification, distribute sentences evenly, or repeat the title.
Apply the ASD-STE100-inspired Hint language in `presentation.md`: explain what
each group adds with one direct sentence, usually 15–35 Chinese characters or
at most 25 English words. Add only an indispensable condition or contrast;
remove filler, title repetition and clause-by-clause paraphrases. An important
condition takes precedence over brevity. A point may
cover one or several sentences. All sentences must be covered exactly once when
Hints are present. For a grouped card, each Hint also supplies `paragraph_id`.
Write the title and Hints together in one continuous card; no separate planning
pass, per-sentence tools or end-of-paper polishing pass.

Include the abstract as a paragraph card titled `### 摘要：〈主要内容概括〉`
(or `### Abstract: <main point>` in English). Its Hints carry the explanations
previously expressed by separate inline abstract facets, anchored to their exact
sentence groups. Follow the abstract's own order and include only supported
facets; do not force six labels into five Hints. Read existing inline notes for
useful explanations but preserve them as user data; do not delete or restyle them.
Reuse an existing abstract card only if it already provides this overall title
and sentence-linked breakdown; separate inline facets are context for that card,
not a substitute for it.

Figures/tables, algorithms, continuous derivations and key
formulas retain `templates.md`: concise Markdown bodies, no hints. A derivation
is one walkthrough, not one card per equation. Ordinary method prose follows
the ordinary paragraph-card rule. Special cards replace generic explanations:
bind their saved IDs to the paragraph with `reuse`. The abstract uses the
paragraph title-and-Hints rule above, which takes precedence over the shared
facet template for browse. Figure cards anchor to the complete App-grouped image
panels rather than the caption; inspect the supplied complete image and caption.

Inspect existing previews in each group; retrieve full cards only when necessary.
Reuse equivalent claims without changing human edits, authorship or presentation.
Save every ready card/small group immediately. The response includes the next
pending targets when using MCP. With continuous output, all pending targets are
already supplied: keep emitting cards in the same turn, including after image
calls, without waiting for another group. Continue until `remaining=0`. Appendix paragraphs use the same
standard. Explicit user scope overrides whole-paper coverage.

## Reading-order return

The App appends all saved/reused cards grouped by source section and PDF reading
order, using real annotation URLs and consecutive numbering. This includes every
card, not just pinned cards or a selected 5–15-item list. Final model prose need
only state results and actual gaps; do not repeat the full itinerary. Generated
prose uses the selected language; non-research texts retain their own structure.

Method reference: [UNC Skimming](https://learningcenter.unc.edu/tips-and-tools/skimming/)
informs previewing, paragraph main ideas and rhetorical transitions. Paragraph
coverage and live saves are ThinkReader requirements, not claims from that guide.
