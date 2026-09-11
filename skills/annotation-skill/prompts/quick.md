# Quick annotation command

Use for `/annotation`. Produce a fast, selective annotation layer after reading
the whole-paper map and each complete section.

## Selection policy

- Prefer the few passages that unlock the section: its main move, strongest
  evidence, explicit assumption, important qualification or stated limit.
- Use deterministic cue/search results to find candidates, but accept a
  candidate only after reading its full section.
- Use phrase marks by default. Area cards are reserved for method blocks,
  derivations, algorithms, figures, tables or visual regions whose meaning
  cannot be expressed by one honest phrase anchor.
- Avoid several annotations that say the same thing about adjacent paragraphs.
- Keep the layer deliberately sparse: normally choose 1–3 decisive actions per
  major section and skip routine restatement. The abstract's separate facet rule
  and complete-Figure coverage are the explicit exceptions.
- Capture the paper's highest-value contribution, result, route, design,
  improvement, formula, assumption or limitation. Do not annotate routine text.
- In the abstract, aim for 3–6 non-duplicate facets when supported: background
  or existing problem, contribution, main method, result, and outlook,
  influence or limitation. Bind every facet to its own local sentence selection.
- Write ordinary phrase cards in the compact labelled form defined by `presentation.md`; the
  user must grasp it at a glance without rereading the source in the comment.
- Use the shared special-card templates instead of adding a second generic card
  for an abstract facet, Figure/table, algorithm, theory derivation or key formula.
  Their lists are ordinary Markdown in `body_md`, never hints.

Quick means fewer model-selected actions, not fragmentary reading. Every
section remains in scope.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
