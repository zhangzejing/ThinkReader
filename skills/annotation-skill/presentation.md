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
formulas use `templates.md`, without hints. Browse (including its review stage)
instead presents the abstract as one paragraph card with sentence-linked Hints,
as defined in `prompts/browse.md`. In standalone annotation, abstract semantic
labels remain standalone headings. The other special cards use a heading and
ordinary Markdown prose/lists; they are not limited to one conclusion line.
Those cards replace any generic browse card for the same logical content.
`### 主要方法` outside the abstract is an ordinary semantic annotation, not a
special template. It follows the active command's normal body and hint rules.

## Concise annotation language

Use ASD-STE100-inspired controlled language for newly written explanations.
This adapts its clarity principles to research notes and Chinese; it does not
claim compliance with the complete English specification or its dictionary.

Apply this language to ALL newly authored card titles, body prose, list items and
Hints, including figure, table, algorithm and derivation explanations. Retain
each template's structure and the fixed semantic headings used by phrase cards.
Ordinary browse titles state one concrete claim. Prefer 14–28 Chinese characters
or a short English sentence; remove labels such as “本段介绍” and repeated context.
Body sentences and list items each express one point. Prefer active voice,
stable technical terms and at most 25 English words per sentence. In Chinese,
use a short direct sentence and split independent claims. Keep essential
conditions, evidence, numbers, uncertainty and mathematical meaning. These rules
guide drafting; never count, truncate or rewrite completed/user-authored cards.

- One Hint explains one contribution from its selected sentences in ONE short,
  complete sentence. Draft toward 15–35 Chinese characters (roughly 2–3 short
  lines in a normal card), or 12–20 English words; descriptive English sentences
  should stay within 25 words. Before saving, reread any Hint longer than about
  45 Chinese characters or 25 English words and remove secondary details. These
  are flexible drafting limits: keep an essential condition, decisive number,
  uncertainty or technical name even when it requires more space. They are not
  character-count validation, and the App must never truncate a saved Hint.
- A source range can contain several sentences without requiring a clause for
  each sentence. State the single result, mechanism or limitation that helps
  the reader understand this range. Omit citation lists, panel identifiers,
  repeated variable definitions and background already given in the title.
  Mention a figure/panel only when it disambiguates the finding. Add a second
  short sentence only when a necessary condition would otherwise be lost.
- Name the actor, model or variable and its action. Prefer active voice and
  familiar, concrete words. Use the same technical name for the same concept;
  retain necessary proper names, mathematical symbols and units.
- Review every draft before emitting it. For a numeric time series, give the
  main trend and the decisive endpoints rather than every intermediate year
  and value. For a comparison, keep the key effect and its uncertainty; sample
  sizes, test statistics and citations can remain in the highlighted source.
  Do not treat every source number as a required number in the Hint. A long
  compound result should become one focused finding, not a compressed list.
- Start with the fact. Remove lead-ins such as “这说明”, “值得注意的是” and
  “the authors go on to explain that”. Do not repeat the card title, translate
  every source clause, give generic reading advice or restate a glossary.
- Group adjacent source sentences by one semantic move, not equal length.
  Split independent points within the existing 0–5 Hint partition; retain
  complete sentence coverage. Do not add redundant Hints to meet a quota.
- Preserve numbers, comparison baselines, uncertainty, negation, causes and
  applicability conditions when they determine the Hint's claim. Prefer a necessary extra short clause to a false
  simplification. Do not count, truncate or rewrite saved/user-authored Hints.

For example, “研究结果表明，该模型只有在数据充足的情况下才可能提升预测精度”
becomes “数据充足时，该模型可能提高预测精度。” Keep “可能” and the data condition.
“图 3C 的紫线是 Wyrtki 周期，充放电效率 F1 和 F2 的变化主导了这一周期，
这与已有研究相一致” becomes “充放电效率 F1、F2 主导 Wyrtki 周期。”
“实际 ENSO 不是单频，2005 年后 Niño-3 分成约 1.5 年和 3 年两个主调，Wyrtki
周期只抓住较长的分量” becomes “2005 年后出现双主频，单频近似漏掉短周期。”
“The authors go on to explain that the model does not use future observations
when it predicts the next state” becomes “The model predicts the next state
without future observations.” Keep the original technical meaning.
“1960–1970 年代约 6 个月、1980 年代约 9 个月、1990 年代末约 6 个月、2000 年代
约 3 个月” becomes “观测超前先延长，随后从约 9 个月降至 3 个月。”

Reference: [ASD-STE100 Issue 9](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf),
descriptive-writing rules 6.1, 6.3 and 6.5, and the
[official explanation of consistent technical vocabulary](https://www.asd-ste100.org/about_STE.html).

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
