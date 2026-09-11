# Shared special-card templates

Use these same templates for `/annotation`, `/deep-annotation`, and `/browse`.
They replace, rather than accompany, an ordinary browse card for the same
abstract claim, figure/table, algorithm, theory derivation, or key equation.

## Shared presentation

Choose every visible label from the current output language, including headings inside the examples:

| 简体中文 | English |
| --- | --- |
| 背景 / 已有问题 | Background / Problem |
| 贡献 | Contribution |
| 主要方法 | Method |
| 实验结果 | Results |
| 局限性 | Limitations |
| 图 / 表 / 算法 | Figure / Table / Algorithm |
| 理论推导 | Derivation |
| 关键公式 | Key formula |

Translate the example scaffolding into the selected language; do not leave Chinese placeholders in
English cards or English boilerplate in Chinese cards. Source names, equations and attributed quotes
remain unchanged.

- All five templates use ordinary annotation Markdown: one `###` heading and
  a short paragraph or list inside `body_md`. Do not emit `hints` for these
  special cards. Bullets and numbered steps are Markdown prose, not hint items.
- Ordinary browse paragraph cards keep their separate hint convention. Their
  heading-only constraint does not apply to these special cards.
- Keep a complete visual, algorithm, or coherent derivation together. Use its
  area anchor, not its caption as a substitute. Abstract facets keep distinct
  local phrase or sentence-area anchors.
- Use short, plain, natural language matching the task preference. Let the reader understand the object, not
  reread a compressed textbook. Preserve names, numbers, conditions, negation,
  and mathematical relations that change the meaning; no hard word quota.
- Reuse an existing card only if it satisfies this template and its evidence
  is sound. Do not create another generic card to satisfy source coverage.

## Abstract — semantic label as a standalone heading

Keep the current abstract selection: 3–6 separate local cards when supported,
covering background/prior problem, contribution, method, result, and
outlook/influence/limitation. Do not invent missing facets or stack the cards
on a whole-abstract anchor.

The heading is only the semantic label; put the concise factual sentence below
it. Do not append the conclusion to the heading after a colon.

```markdown
### 主要方法

最大化给定图像时目标描述的条件似然。
```

This is a format example, not a claim to copy into unrelated papers. Other
headings include `### 背景`, `### 已有问题`, `### 贡献`, `### 实验结果`, and
`### 局限性`. Keep the operator, condition, metric, and baseline when material.

## Figure or table — read it, extract its message, connect to the text

Read the actual figure/table, full caption, and interpreting prose before
writing. Use the real figure/table number. The heading briefly identifies what
the visual shows; the body normally follows these three moves:

```markdown
### 图一：<对象及其结构、比较或现象的一句话说明>

- <关键术语、模块、箭头、图例、坐标或行列各表示什么；必要时说明子图及结果。>
- <核心子图或比较传达的主要信息；保留必要的数值、基线与条件。>
- 支撑第<真实章节编号或标题>节中“<具体论点>”的描述。
```

- Reading a visual is not just naming axes. For architecture diagrams explain
  important component names, connections, and information flow; for multi-panel
  figures identify the decisive panels and their relation; for tables explain
  relevant rows, columns, metrics, and comparisons. Do not inventory every label.
- State a result only if the visual or interpreting text supports it. An
  architecture diagram is not evidence of measured accuracy or throughput.
- Identify the concrete textual claim and its real section, not the generic
  phrase “supports the paper's contribution”. Say “illustrates” for a design
  diagram when it is not experimental proof. Do not invent a section or link.
- Normally use one short bullet per move. Split a dense first bullet when
  needed for legibility; omit unavailable information rather than padding.
- Only when its source language differs from the target language, translate the complete caption
  into a separate clue bound to the caption, following the shared caption rule below.

## Algorithm — explain how the procedure runs

Select the complete pseudocode/algorithm region. The heading identifies its
task. Use a few short Markdown bullets to explain its operational flow, not
translate the pseudocode line by line.

```markdown
### 算法一：<用什么过程完成什么任务>

- 输入<必要输入>，先初始化<关键状态>。
- 每轮先<关键计算>，再<关键更新>。
- 当<原文停止条件>时，输出<结果>。
```

Keep only necessary inputs and steps. Preserve sampling, dependencies, update
order, and stated stopping conditions; do not invent convergence guarantees or
add a complexity discussion unless essential to understanding the procedure.
Translate the full algorithm caption into a clue only when its language differs from the target. If no caption
exists, do not manufacture one or treat the whole pseudocode as its caption.

## Theory derivation — walk through A → B → C → D

Group the adjacent prose and equations forming one derivation or mechanism.
Walk the reader through the decisive transformations in their source order,
using short, everyday explanatory language and actual equation labels.

```markdown
### 理论推导：<从什么出发得到什么>

1. 从式(A)出发，用<关键关系或假设>把<对象>改写为式(B)。
2. 将<哪一项>代入式(B)，得到式(C)，使<这一步的直接作用>。
3. 再用<关键变换或近似>得到式(D)，完成<当前推导的目标>。
```

The letters illustrate the pattern: use the paper's real labels or short names
and only the steps that actually exist. Do not force four formulas or invent a
derivation. Explain what changed and the necessary reason at each transition;
retain a condition or approximation when omitting it would make the step false.
Do not copy all algebra, repeat a variable glossary, or use empty transitions
such as “after derivation we obtain”. Reserve `理论推导` for mathematical
transformations, identities, bounds, approximations, and their necessary
assumptions; do not rename every method card to this label. For a non-derivation
mechanism is an ordinary `主要方法` semantic annotation governed by the active
command: one title plus one conclusion for annotation/deep-annotation, or an
ordinary browse sentence-title with optional hints. Do not impose a generic
input/design/output checklist when the real content is a derivation.

## Key formula — variables only

Anchor the complete equation. Use a short identifying heading, followed only
by the meanings of its symbols. Read surrounding definitions to disambiguate
notation, but do not add the formula's purpose, derivation, contribution, or
downstream conclusion; those belong in the method walk-through if needed.

```markdown
### 关键公式

- $<变量一>$：<在本文中的含义>。
- $<变量二>$：<在本文中的含义；必要的维度或取值范围>。
- $<下标或参数>$：<所指对象>。
```

Explain variables, parameters, distributions, and ambiguous indices needed to
read the equation; group synonymous roles where concise. Do not explain every
ordinary arithmetic operator. Use paper-specific meanings, preserve distinct
roles, and state “原文未定义” when a necessary symbol really lacks a definition
rather than guessing. Avoid duplicating a full glossary in nearby cards.

## Full caption translation → clue (figures/tables and algorithms)

First compare the caption's language with the current target language. If they match, skip translation
and omit the translation clue; still write any useful analytical figure/algorithm card. For mixed-language
captions, translate only the parts that need it. Otherwise translate the whole caption faithfully, including its number, panel labels,
qualifications, baselines, units, and reported values. Keep official names and
symbols recognizable. Do not compress it into the card's title or mix your
interpretation into the translation. The card explains; the clue translates.

Short panel labels such as “(a) MNIST” or “(b) 5-D latent space” do not need
separate clues merely because the index classifies them as captions. Explain
their correspondence in the figure card; keep one full-caption clue per figure.
An independently informative subfigure caption may have its own clue when needed.

Bind the clue to the caption text, separately from the card on the visual or
algorithm. Do not create another annotation or hint as a replacement. Follow
tools.md and writer.md to request the controlled clue write; only claim success
after the App confirms it. Translate from the PDF-backed caption_segments.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
