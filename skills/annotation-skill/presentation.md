# Annotation presentation rules

## Proposal types

- `phrase`: an exact source phrase with reliable PDF text geometry. Prefer
  highlight or underline.
- `area`: a paragraph, method, equation, complete figure/table, algorithm or OCR
  region. It must not pretend to be word-precise. Only hint-bearing area cards
  are pinned by default; do not add hints merely to force a card to be pinned.

## Semantic title and prose

For ordinary `/annotation` and `/deep-annotation` phrase cards, `body_md` has
exactly two visible parts: one title and one conclusion line. Use the narrowest
truthful title:

- `### 贡献`: newly proposed method, model, technique or demonstrated ability
- `### 实验结果`: metric, accuracy, gain, speed or controlled comparison
- `### 背景`: established context or the problem being addressed
- `### 已有问题`: the specific bottleneck or failure in prior work
- `### 技术路线`: main lineage or route, such as building on an RNN
- `### 主要方法`: the mechanism or technology used to realize the proposal
- `### 改进`: a concrete change to a mature technique
- `### 关键设计`: an architectural or procedural choice that makes it work
- `### 关键公式`: a decisive relation, objective or update rule
- `### 局限性`: explicit or evidence-backed boundary, missing experiment/control
- `### 展望`: an explicit future direction stated by the paper
- `### 影响`: an evidenced capability or downstream consequence
- `### 假设`: a condition the method or derivation relies on
- `### 主要结论`: the paper-level conclusion supported by evidence

The conclusion is preferably compact (often 15–24 Chinese characters), but
length is never a validation gate. It contains one fact and keeps decisive
operators, conditions, numbers and technical names. Do not add
a source paraphrase, advice, definition, or second claim. Use `question` only
for a real unresolved issue; otherwise use `evidence`.

Abstract facets, figures/tables, algorithms, theory derivations and decisive
formulas use `templates.md` in every command, without hints. Abstract semantic
labels remain standalone headings. The other special cards use a heading and
ordinary Markdown prose/lists; they are not limited to one conclusion line.
Those cards replace any generic browse card for the same logical content.
`### 主要方法` outside the abstract is an ordinary semantic annotation, not a
special template. It follows the active command's normal body and hint rules.

## Color semantics

- evidence bookkeeping: `gray`
- background and sequential reading storyline (including `/browse`): `theme`
- methods, mechanisms and mature technology: `green`
- contributions, improvements and results: `orange`
- assumptions, applicability conditions, limitations and risks: `cyan`

Choose by the statement's meaning, not its formatting. A formula explaining a
mechanism is green; a formula expressing an assumption is cyan. Reserve gray for
evidence records, so readers can hide bookkeeping hover cards independently.

This mapping is a Skill convention. The service only validates generic color
values. Formulas use math syntax; backticks are for literal identifiers,
equation labels and key numeric values.

## Semantic signal vocabulary

Signals propose candidates; they never replace whole-section reading:

- contribution: `we propose`, `we present`, `we introduce`, `we develop`
- method/technology: `using`, `based on`, `via`, `employ`, `consists of`
- result: `results show`, `achieves`, `outperforms`, `improves by`, metric or `%`
- prior problem: `however`, `limited by`, `bottleneck`, `fails to`, `remains`
- outlook/influence: `future work`, `may enable`, `can be applied`, `potential`
- limitation: `only`, `requires`, `assumes`, `not evaluated`, `trade-off`

Read the complete sentence and section before assigning a title. For example,
the object governed by “we propose” is usually a contribution candidate, while
the construction following “using” is usually a method candidate.

Compression must preserve technical predicates and relations. Treat
`maximize/minimize`, objective/loss/likelihood/bound, `given/conditioned on`,
negation, inequalities, units and comparison baselines as protected meaning.
When restating a source claim, retain its decisive meaning even when the result
exceeds the usual compact length. A variable-only formula card does not restate
the claim: keep it a glossary rather than adding a second method explanation.

## Safety

- A multi-panel figure is one source object when its printed caption identifies
  the panels as one figure, including figures spanning both columns. Reuse one
  evidence-record card and retain all panel EvidenceRefs through the App's group
  resolver. Do not create a gray card for each extracted image fragment or merely
  collapse their Markdown links. XRO Figure 2 includes the right-hand all-month
  correlation skill as well as the left panels; inspect the original full page
  before accepting the group. Keep substantive panel-specific explanations,
  different claims and user edits separate; adjacency alone is not equivalence.
- Before proposing a new card, compare its complete claim with existing cards
  and hints. Equivalent meaning must use `reuse_annotation_ids`, including across
  browse/annotation stages and runs. A changed title, synonym, color or card type
  does not justify a duplicate. Keep genuinely different conditions, conflicts
  and complementary explanations; do not merge just because anchors overlap.
- `/annotation` and `/deep-annotation` must still provide precise inline reading
  where reliable source text is available. A section containing only reused browse
  area cards is insufficient: select a useful technical detail, condition or result
  beyond the existing overview, and anchor it with precise phrase selectors.
- Never supply coordinates.
- Never convert block-only evidence into a phrase mark.
- Never edit `.thinkreader/annotations/`.
- Preserve user-authored annotations and replies.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
