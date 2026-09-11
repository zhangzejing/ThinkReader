# Browse card command

Use for `/browse`. Build the smallest ordered set of cards that lets a reader
follow the paper's problem, argument, method, evidence and conclusion without
reading every paragraph. This is sequential browsing, not source-coverage
accounting and not a keyword index.

- Partition only after reading a complete section.
- Group by semantic move rather than raw paragraph count. Merge adjacent
  paragraphs or list items when they express one taxonomy, premise, procedure,
  comparison or conclusion; keep unrelated moves separate.
- Keep a complete algorithm or continuous
  formula derivation in one card when splitting it would destroy the reasoning.
  Do not emit several adjacent cards for the steps of one derivation; use one
  `理论推导` walk-through card with short numbered steps in its Markdown body,
  not hints. A computational formula or method mechanism alone is not a
  derivation. Treat a non-derivation `主要方法` as an ordinary browse card.
- Use the shared special-card template for an abstract facet, Figure/table,
  algorithm, theory derivation or key formula. It replaces the generic browse card
  for that content. Special cards use no hints and follow their own heading/body
  format; the heading-only and hint rules below apply only to ordinary browse
  paragraph cards.
- Apply the same rule to appendices; position is not a reason to omit content.
- Each ordinary browse card body is exactly one `###` heading that states the
  whole semantic block as one complete, plain sentence. Include a subject and
  a decisive predicate; a short noun phrase such as “推断不可解性” is invalid.
  Prefer roughly 14–32 Chinese characters or a similarly compact sentence in the selected language, but preserve essential names,
  conditions and relations. Read headings in order before applying: by
  themselves they must tell the paper's continuous story. Do not add prose
  below the heading.
- Use `theme` for browse cards. This is a presentation convention owned by the
  Skill, not a service rule.
- For ordinary browse paragraph cards, add only the ordered hints needed to
  expose internal structure: 0–3. Use zero hints when the sentence-title already
  states the whole semantic move and no internal list, contrast, variable role
  or sequence needs exposure. Prefer roughly 8–18
  Chinese characters or a short phrase in the selected language. A hint names one list item, step, variable role,
  comparison or consequence; it does not paraphrase the whole source or repeat
  the title. Avoid lead-ins such as “本段介绍了”.
- A hint may return consecutive selector refs spanning adjacent EvidenceUnits.
  The App copies the selected source and creates local anchors; the LLM must not
  copy or concatenate source text. Unselected connective text need not be
  absorbed into a hint.
- `covered_evidence_ids`, when present, names the contiguous same-section, same-page units
  intentionally grouped into this semantic block. It is not a whole-paper
  coverage ledger, and units may be omitted when they add no new step to the
  browsing story.
- Review `preceding_card_titles` to connect the new section to the story so far.
  Inspect ALL existing cards, including ordinary phrase/area cards from earlier
  commands. Return `reuse_annotation_ids` when a card already states the same
  claim; a different heading, color or browse/annotation presentation is not new
  information. Reuse takes priority over restyling an existing card to this
  command's template. Add a card only for an additional supported fact, relation,
  condition or explanation; do not repeat the old claim in new words.
- Prefer area cards for natural blocks. Phrase cards are allowed for precise
  abstract claims, terms, numbers and other short evidence where a block card
  would be less truthful. After understanding the full storyline, select 5–15 evenly distributed
  storyline area cards and submit those new cards with pin=true. The App owns
  their layout; no model-authored coordinates.

For an introduction followed by two numbered obstacles, create one card such
as `### 两类障碍使一般变分推断难以高效计算`, with two short hints bound to
the two numbered items. If the next list states three tasks solved by the paper,
make that a second card. Do not create separate “不可解性”“大数据约束” cards
whose headings fragment one argument.

Example for the two successive lists in the VAE problem statement (only if
supported by the actual section being read):

```text
### 后验难解与大数据要求可扩展的近似推断
1. 边缘似然与后验积分难解
2. 大数据需小批量或单样本更新

### 统一框架近似求解参数学习与两类概率推断
1. 近似ML/MAP参数估计
2. 给定观测的潜变量后验推断
3. 边缘推断支持去噪与修复
```

These are two cards, not five cards: the first two hints map to the two
obstacles and the next three map to the three proposed tasks. Do not force the
second list into two hints and lose its distinction between posterior and
marginal inference. Each card groups its introduction with its own list.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
