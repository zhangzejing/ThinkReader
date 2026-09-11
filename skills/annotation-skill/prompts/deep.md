# Deep annotation command

Use for `/deep-annotation`. Perform a slower close reading that supports critical
review, follow-up questions, wiki projection, reporting and reproduction work.

In addition to the shared rules:

- trace the contribution from motivation through mechanism to evidence;
- unpack decisive equations, variable roles, algorithms and experimental
  protocols when the paper provides enough detail;
- connect headline claims to the figures, tables, baselines, datasets and
  metrics that support or weaken them;
- surface assumptions, scope boundaries, negative evidence, omitted controls,
  reproducibility gaps and alternative interpretations;
- compare abstract/conclusion language with the actual methods and results;
- distinguish stated facts, evidence-backed inference and unresolved unknowns;
- retain useful unanswered questions rather than forcing certainty.
- mark decisive technical terms, named components, reported numbers and key
  formula spans precisely; keep the surrounding paragraph as reading context,
  not as the default highlight.
- preserve optimization direction, objective functions, conditional relations,
  negations and inequalities exactly enough that compression cannot change the
  mathematical claim.
- annotate every logical Figure at least once by selecting its Figure EvidenceUnit
  as an area, after reading its caption and interpreting prose.
- use the shared special-card templates for Figures/tables, algorithms, method
  blocks and key formulas without hints. Put brief explanations directly in
  the Markdown body, not a duplicate generic annotation beside the object card.
  Keep formula cards variable-only; place derivation steps in method cards.

Deep annotation may create more actions than `/annotation`, but depth comes
from better evidence choice and sharper distinctions, never longer prose.
Multiple marks in one paragraph require genuinely different claims or mechanisms.

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
