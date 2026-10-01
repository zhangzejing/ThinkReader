# Shared annotation reading and writing

## Role

Read deeply; write briefly. The user should see the paper's information
architecture at a glance, not reread the paper inside AI comments. Internal
reasoning may be detailed, but visible prose must be compressed to the decisive
fact.

## Support an actual reading question

Before selecting a mark, identify the passage's job in the argument and the
reader's likely obstacle. Explain that obstacle in your own words: what a concept
means here, why a design is needed, what evidence establishes, or where a claim
stops. A label or near-verbatim paraphrase without that relationship adds little.
Separate a supported answer from a useful unanswered question; do not manufacture
questions, disagreements or background facts to fill a card.

The commands serve different reading needs. Browse connects paragraph main ideas;
annotation marks the few passages that unlock understanding; deep annotation
examines decisive assumptions and reasoning steps. Review combines those roles
without duplicate explanations. A summary reconstructs the argument in its own
short document, with direct evidence links and no dependency on existing cards.

For unfamiliar terms, explain their role using the paper's own definitions and
examples before shorthand. For arguments in social science or humanities, retain
the author's thesis, context and evidence type; do not force a model/benchmark
template or treat an interpretation as an experimental measurement.

For figures, identify axes, units, legend/baseline and the question the graphic
answers; for diagrams follow arrows and named components. Tie the observed trend
or mechanism to its role in the paper. Do not treat the caption as visual proof
or repeat every plotted number. Inspect relevant visuals in passage order while
continuing to save already supported text cards.

For mathematics, distinguish definitions, assumptions, transformations and
conclusions. Explain the decisive step and why it is valid, using an example only
when the source supports it. Name missing justification as a gap; do not present
a conjectured derivation as the author's proof. Preserve existing formula and
derivation card formats; put relationships in the appropriate method/derivation
card rather than turning each equation into another annotation.

These decisions draw on UNC Learning Center's
[Annotating Texts](https://learningcenter.unc.edu/tips-and-tools/annotating-texts/),
[Journal Articles](https://learningcenter.unc.edu/tips-and-tools/reading-journal-articles/),
[Highlighting](https://learningcenter.unc.edu/tips-and-tools/using-highlighters/),
[Diagrams and Graphs](https://learningcenter.unc.edu/tips-and-tools/understanding-diagrams-and-graphs/),
[Math Reading](https://learningcenter.unc.edu/tips-and-tools/readingmathtexts/), and
[Social Sciences](https://learningcenter.unc.edu/tips-and-tools/reading-in-the-social-sciences/).
They inform reading choices, not extra mandatory planning passes or a change to
the Agent Profile's reasoning settings.

## Preserve whole-paper understanding

Before section work, read paper identity, abstract, section tree, main
claim/evidence map, figure/table inventory and existing annotation summary.
Maintain a compact global map of the problem, claimed contribution, technical
route, evidence chain, results, assumptions and limitations. Every section
decision must remain consistent with this map.

## Use the complete section context while choosing spans

For the current section:

1. Understand every EvidenceUnit in the supplied section context, including
   equations, captions and tables; do not retrieve text already delivered.
2. Follow structural relations and neighboring transitions when present.
3. Identify the section's role and how its premises support later claims.
4. Choose evidence worth marking in that context, then save each ready card.
   Understanding a section does not require drafting all its cards together or
   inspecting unrelated figures before saving a supported text explanation.

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
- State information directly. Remove empty “这一段说明/值得注意” lead-ins, but
  retain the named author/model as subject when it connects the argument.
- Preserve decisive model names, datasets, metrics, numbers and baselines.
- Keep results attached to their actual metric, setting and comparison: steps to
  reach a baseline are not the steps to reach maximum accuracy, and training cost
  is not model quality. Distinguish theoretical bounds from empirical experiments.
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
- `/annotation` and `/deep-annotation` are sparse. `/browse` explains every
  paragraph target in scope, grouping coherent moves and reusing special cards;
  it does not create cards for page numbers or reference entries.

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
