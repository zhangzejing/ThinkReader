---
name: abzu-slides
description: Build a concise, audience-ready Beamer deck from one paper.
---

# Slides proposal

Write all newly authored slide titles, prose and visual notes in the task's selected output language.
The App configures XeLaTeX and portable Chinese fonts when CJK text is present. Keep source quotations,
formulas, names and text inside original figures intact. Identify each source passage's language before
translation; if it already matches the target language, skip translation and duplicate paraphrases.

The audience is researchers. They should leave able to assess the problem, contribution, mechanism, evidence,
assumptions, boundary, and relation to prior work without first reading the paper. Analyze the argument before
selecting frames. Do not mechanically copy the paper's headings or abstract, and do not use classroom language
such as “lesson”.

Use five audience jobs as the default structure: (1) problem/background, (2) core claim, method or innovation,
(3) experimental results, (4) boundaries, discussion or future work, and (5) summary/takeaway. Rename, split,
or merge these jobs only when the paper's argument is genuinely clearer that way; never omit a job silently.
Use concise, phrase-like declarative frame titles. Aim to keep each title on one line in the selected template;
shorten the claim when it wraps rather than relying on a fixed character count. Keep standalone section-divider
frames and a clickable Overview when the planned length affords navigation pages; omit them when they crowd out
substantive content. Logical sections remain even without divider pages. Never repeat or prefix section names in ordinary frame titles. Within
each section, frame titles must form a connected progression rather than unrelated labels. Do not prefix
section titles with numbers; Overview adds numbering itself.

Each frame has one narrative job and one claim the audience can retain. Let figures, tables, equations,
comparisons, and measured results carry the argument whenever the evidence supports them. Lists are appropriate
for categories, procedures, table reading, or synthesis, but every list frame also needs a prominent `body`
claim, an `equation`, or a source figure; a title followed only by bullets has no visual focus. A dense evidence frame may combine a
short claim with a source visual or display equation; a sparse frame is useful only when the argument genuinely
needs a transition or emphasis. Variation in density is a secondary presentation benefit, not the outline logic.

The App offers these low-token deterministic layouts when they fit:

- `single`: one titleless sentence in `body`, centered at the standard sparse-page size. Use it for a claim
  that genuinely deserves an isolated beat; do not simulate it with an empty titled frame.
- `question-list`: one key question in `body` plus 2–6 concise answers in `bullets`; keep `title` empty.
- Formula explainer: a one-line `title`, one `equation`, and a short `body` or useful list.
- Figure explainer: a one-line `title`, `visual_note`, source figure, and a short `body` or useful list for a
  single figure; multi-figure comparisons reserve the page for figures and the note.
- Focus sequence: use two or more consecutive `focus` frames with empty titles and body only. Each frame adds
  one new sentence; the App carries all earlier sentences forward in gray and renders only the new sentence in
  black. All lines use the same size. A non-focus frame or a new section ends the sequence, so each sequence
  remains one coherent line of thought. Write only the new sentence in each proposal frame.

These layouts are options, not a complete design system. Keep freely composed statement, figure-plus-text,
and multi-figure comparison frames when they communicate the evidence better; vary silhouettes deliberately.

Questions are optional. Use one only when it exposes a real unresolved tension; never repeat what the section
or frame title already says and never ask merely to create a sparse page. For a motivation, conceptual buildup,
or forward-looking discussion with no useful figure, table, or equation, prefer a short consecutive focus
sequence over disconnected questions or repetitive lists. `question` followed by `answer` remains a two-step
focus sequence for compatibility; use `focus` when the thought needs more than two steps. Never add “Guiding
question:” or put a question in a bullet. Use `equation` for one important
display formula, writing only the LaTeX math body without `$`, `\[` or `\]`; inline math in prose must use
`$...$`. Other body styles are `statement` and `takeaway`. Every figure frame uses the separate
`visual_note` field for one short italic sentence that tells the audience why to inspect the figure. List styles
are only `bullets` and `steps`. Avoid cards, pills, badges, dashboard
panels, ornamental quote treatments, and repeated color boxes.

Use one sans-serif family throughout. Express hierarchy only with size, weight, alignment, spacing, and
restrained sans-serif italic for the figure note. Keep established technical terms such as token,
Self-Attention, BLEU, Query/Key/Value and LayerNorm unchanged. Do not paste long source paragraphs or expose
planning notes.

Inventory all available source figures, architecture diagrams, result plots and tables before outlining.
When the user's page budget permits, use every figure that contributes to the argument; omit only duplicates,
decorative material, or figures that cannot be explained. Prefer one dominant source figure per frame. Put
two or three figures on one frame only when they are variants, comparisons, or parts of the same reading task.
The App supplies a compact source caption under every figure and shortens overly long captions to protect the
layout. For every figure frame, write one short
`visual_note` above it that says what the figure helps the audience see; do not restate the caption. Existing
supporting_outputs from summary/report may guide emphasis, but the paper evidence remains authoritative.

Every frame must cite one or more current-paper `evidence_refs`; include their union in the top-level
`evidence_refs`. The App uses these internally for verification and does not render a citation footer. When
visible attribution matters, write a concise human-readable author/year citation in the frame itself. Never
show raw EvidenceRef strings or transport tokens.

## Plan before drafting frames

The user-approved short-deck benchmark below is the reference for compact research presentations. Apply its
prioritization and visual clarity, not its paper-specific content or a mandatory ten-page structure.

After reading the paper and inventorying visuals, make a compact page-by-page plan before drafting prose:

1. Identify the paper's central contribution and what researchers must understand to evaluate it. Rank supporting
   material as essential, useful, or expendable; do not allocate equal space to every topic.
2. Reserve room for the central contribution first. For an architecture paper such as Attention Is All You Need,
   the model architecture and its working mechanism deserve multiple explanatory frames, not one squeezed diagram
   after several motivation pages. Other papers may instead center a result, dataset, or theoretical argument.
3. Set the total budget and decide whether Overview and section-divider pages earn their space. Under a tight
   budget (commonly ten pages or fewer), normally omit both and fold motivating questions into content frames.
   Retain direct, concise content titles on these frames; avoid spending two pages on a question and its answer.
4. Assign each planned page a content title, takeaway, source visual/equation/evidence, and narrative job. Cover
   the five audience jobs through content, not necessarily five sections. Record what is cut or merged and why.
5. Check the physical page total and whether the core contribution is actually explained. If it does not fit,
   remove navigation and repeated setup before cutting the mechanism or decisive evidence. Then draft the proposal.

Planning is a composition step, not another model/tool round trip or a new approval gate. Do not render the plan
in the deck or add unsupported planning fields to the proposal. Return only this complete proposal:

```json
{
  "schema_version": "abzu-slides-proposal/1.0",
  "paper_id": "paper-...",
  "expected_revision": 0,
  "title": "...",
  "subtitle": "...",
  "author": "...",
  "institute": "...",
  "max_pages": null,
  "include_overview": true,
  "section_dividers": true,
  "evidence_refs": ["evidence-..."],
  "references": [{"authors": "...", "title": "...", "venue": "...", "year": "...."}],
  "sections": [{
    "title": "...",
    "frames": [{"title": "...", "body": "...", "body_style": "statement", "bullets": ["..."], "list_style": "bullets", "equation": "", "visual_note": "...", "figure_source_refs": [], "evidence_refs": ["evidence-..."]}]
  }]
}
```

When the user gives no page limit, omit `max_pages` and use 4–40 content frames and 4–8 sections. When the user
specifies a limit, set `max_pages` to that integer; it is a hard cap over the title, Overview, every section
divider actually enabled, every content frame, and References. The App validates the final physical page count.
Set `include_overview` and `section_dividers` to false when space is tight (both default to true for existing
proposals). Short decks may use 1–3 logical sections and combine the five audience jobs without divider pages.

Budget before writing: `content frames = max_pages - 2 - int(include_overview) - section_count * int(section_dividers)`.
The fixed two pages are title and References. With both navigation options off, a ten-page deck has room for
eight content frames; it need not fill the cap. Rank material by whether removing it
would stop the audience from understanding or judging the paper. Keep the motivation, core mechanism,
decisive evidence, one meaningful boundary, and final synthesis. Cut repeated explanations, secondary ablations,
implementation trivia, peripheral benchmarks, redundant figures, and exhaustive literature context first.
Do not shrink every topic equally. Use at most six short bullets per frame. Prefer evidence-rich figure, table, comparison, result, or
equation frames when the paper provides them. There is no global ten-page limit when the user did not request one.

Use questions as structural guides, not decorations. Most research decks benefit from one genuine opening
question that creates the need for the method, and sometimes one later question that opens the boundary or
implication. When space permits, a focus sequence can answer or complicate it. Under a tight page budget, place
the question in a titled content frame's body and answer it with the same page's explanation, diagram, or formula;
do not use titleless question-list/focus pages merely to preserve a question. Frame titles directly identify the content.
Otherwise choose the length required by the audience and argument. Use only source refs listed in the figures
context. Include 1–6 complete external references that the current paper actually cites and that support the
deck's argument; the App adds the current paper separately. The App copies the template selected in Settings,
composes figures, copies their captions, escapes LaTeX, validates the full proposal, and atomically writes
`output/slides/<paper-id>/slides.tex` plus assets.

## Rejected examples and release checks

- **Incomplete spanning figure:** the XRO Figure 2 draft included only left-hand panels a–l and omitted
  the right-hand all-month correlation skill and seasonal panels. In a two-column article, a figure and
  its caption can span both columns. Compare the composed asset with the original PDF, inventory every
  panel named in the complete caption (including its continuation), and verify axes, legends and panel
  coverage. Successful stitching or a valid image file is not proof of completeness. Repair reconstruction
  through the App when source crops are missing from a group; never redraw or invent the missing evidence.
- **Undefined matrix blocks:** mentioning `L_M`, `C_1` or `C_2` without first displaying the source block
  matrix `L = [[L_ENSO, C_1], [C_2, L_M]]` left the XRO mechanism unexplained. Introduce each variable in
  its source equation before using it, define states, block directions and dimensions when stated, and cite
  that equation's evidence. Preserve the paper's notation and distinguish linear terms, nonlinear terms
  and noise. A generic `dX/dt = LX + N + noise` is insufficient to explain the coupling blocks.
- **Compiled but clipped:** a generated PDF still cut off text below figure-plus-text frames. Compilation
  success and page count are not visual acceptance. Render every page, inspect all four edges and narrow
  columns, and resolve visible overflow and relevant Overfull warnings. Shorten repeated prose or change
  the layout before shrinking all type. Re-render after the correction; an earlier preview cannot verify it.
- **Missing decisive evidence:** keep the result that tests the central claim, not merely the first panels
  in figure order. For XRO, source statistics alone do not demonstrate forecast skill: retain the all-month
  correlation comparison with its lead time, validation period and baselines. If a full figure is unreadable
  at slide scale, allocate a focused evidence frame without silently losing other necessary panels.

Apply these checks before reporting completion. If source access, reconstruction or rendering is unavailable,
state the specific unverified part rather than claiming the deck is checked.

## Approved short-deck benchmark

The 2026-09-04 ten-page Attention Is All You Need deck is an accepted example, after local compilation and
copy-fit corrections.

| Pages | Communication job | Accepted treatment |
|---|---|---|
| 1 | Identify the research | Minimal title page |
| 2 | Establish the problem | One motivating question, answer and context on the same titled page |
| 3–6 | Explain the core contribution | Architecture figure; Q/K/V formula; multi-head diagram; position and masking |
| 7–8 | Let researchers judge the evidence | Complexity table and translation results, with concise interpretation |
| 9 | Resolve the argument | Takeaway with limitations and future direction |
| 10 | Attribute prior work | Current paper plus relevant external references |

Use this as a production standard: plan first; remove navigation overhead when space is tight; give the central
contribution enough explanatory room; preserve questions without buying extra pages; combine diagrams, formulas
and focused lists instead of copying paragraphs. Keep direct one-line content titles, one sans-serif family,
source captions and brief italic visual notes. Choose layouts freely when they serve the evidence better.

For figure-plus-text frames, shorten the lead and supporting points to fit the narrow text column; the accepted
architecture and results pages required this correction. Do not solve overflow by shrinking all type. Verify the
actual compiled page count, equations, titles, captions and lower edges when compilation is available; otherwise
report visual verification as pending, not passed. No blank content frames or clipped text are acceptable.
The four mechanism pages are appropriate to this architecture paper, not a fixed quota for other research.
