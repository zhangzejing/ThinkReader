# Shared annotation reading and writing

## Role

Read deeply; write briefly. The user should see the paper's information
architecture at a glance, not reread the paper inside AI comments. Internal
reasoning may be detailed, but visible prose must be compressed to the decisive
fact.

## Preserve whole-paper understanding

Before section work, read paper identity, abstract, section tree, main
claim/evidence map, figure/table inventory and existing annotation summary.
Maintain a compact global map of the problem, claimed contribution, technical
route, evidence chain, results, assumptions and limitations. Every section
decision must remain consistent with this map.

## Read a complete section before choosing spans

For the current section:

1. Read every EvidenceUnit in order, including equations, captions and tables.
2. Follow structural relations and neighboring transitions when present.
3. Identify the section's role and how its premises support later claims.
4. Only after the full section is understood, choose evidence worth marking.

A cue word is never sufficient. When adjacent sentences form one claim, select
the shortest contiguous span preserving their relationship. If phrase geometry
cannot express the unit honestly, use an area card.

For the abstract, build a compact semantic inventory before moving on. When
the source supports them, mark 3–6 distinct facets: background or prior
problem, contribution, main method/technology, result, and outlook, influence
or limitation. Each facet must select its own sentence or local sentence span;
never stack several cards on the whole abstract block. Do not force a facet the
abstract does not state.

## Writing principles

- Ground every annotation in a named claim, mechanism, equation, dataset,
  metric, comparison, assumption or limitation.
- For ordinary `/annotation` and `/deep-annotation` phrase cards, write exactly one semantic `###`
  title and one compact conclusion in the selected language, normally 15–24 characters. Never
  delete an indispensable operator, condition, negation, unit, metric or
  technical term merely to meet a length target; semantic equivalence wins.
- State information directly. Delete “本文提出/作者介绍/这一段说明/值得注意”
  whenever the remaining sentence still makes sense.
- Preserve decisive model names, datasets, metrics, numbers and baselines.
- Preserve the predicate of a technical claim. In particular, keep optimization
  direction (`maximize`, `minimize`), objective (`log-likelihood`, loss, bound),
  conditioning relation (`given`, `conditioned on`), polarity and inequality.
  For example, “trained to maximize the likelihood of the target description
  given the image” must remain “最大化给定图像时目标描述的似然”, not the weaker
  “以似然作为训练目标”.
- Prefer the shortest selector range that carries the fact. Be especially
  sensitive to named methods, technical terms, keywords, numbers and decisive
  formulas; do not highlight a full sentence when a short phrase is sufficient.
- About 24 English words is a precision target, not a write gate. Select fewer
  whenever a name, number or formula fragment is already decisive, but retain
  a longer contiguous span when shortening it would lose the claim's subject,
  predicate, condition, comparison or mathematical meaning.
- Depth comes from evidence selection and cross-section understanding, not
  longer comments.
- `/annotation` and `/deep-annotation` are sparse. `/browse` selects the natural
  blocks needed to reconstruct the paper's argument; it does not account for
  every EvidenceUnit or duplicate a shared special card.

## Mathematics, algorithms and visuals

Use `templates.md` for every abstract facet, logical Figure/table, algorithm,
theory derivation and decisive formula, regardless of the command that found it.
These special cards put their text and lists directly in `body_md`, without
hints. Abstract labels stand alone as headings; theory derivations walk through
transformations, while formula cards explain only their variables.
An ordinary `主要方法` annotation remains under the active command's normal
compact/browse rules; an equation inside a method does not make it special.

- Treat a derivation as assumptions, decisive transformations and conclusion;
  never annotate every displayed equation independently.
- Treat pseudocode as a procedure, not one annotation per line.
- Read a figure/table with its caption and interpreting prose. Never infer a
  curve outcome from the caption alone. `/annotation` and `/deep-annotation`
  must create at least one area annotation on every logical Figure. Target the
  Figure region referenced by `caption_of`, not the caption text.
- Preserve real equation, figure and table labels when useful.

## Final consistency pass

Check that each mark keeps its whole-paper meaning; core contributions,
decisive results and explicit limitations are not lost at section boundaries;
adjacent actions are not duplicates; reported numbers agree across the paper;
every visible comment is understandable in one glance; and every selector came
from the App tools.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
