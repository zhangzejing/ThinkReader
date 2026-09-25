# Summary rules

## Evidence reading

1. Read the whole-paper outline and abstract.
2. Read every complete section in order, including linked equations, captions,
   tables and reported comparisons.
3. Record candidate evidence for background, innovations, results and final
   conclusions; then remove duplicates and unsupported interpretation.

## Content

For a survey, map the four memo arrays to scope/background, taxonomy/research
questions/routes, representative studies/comparisons, and consensus/disputes/gaps.
Use the survey headings in writer.md. Do not force original experiments or claim
that a surveyed method was invented by this survey. Neither review depth changes
the summary's scope, quality or length target.

- 研究背景: one short synthesis paragraph or a compact list defining the
  problem, prior route and unresolved bottleneck.
- 核心创新点: numbered innovations. For each, state what it is, what it builds
  on, and the decisive idea/formula when supported.
- 实验结果: group by the actual experiments performed, then give each experiment's
  setting and findings together. Use the paper's groups (e.g. main comparison,
  ablation, robustness, efficiency) only when those experiments actually exist.
  Preserve dataset, metric, number, units, baseline and comparison conditions.
  Never turn qualitative evidence into an invented number.
- 主要结论: one compact synthesis, followed by the strongest original evidence.

Across these fixed four sections, preserve 3–6 supported semantic facets when
available: background, existing problem, contribution, main method/technology,
result, and outlook/influence/limitation. Put prior problems in 研究背景,
contributions and methods in 核心创新点, measurements in 实验结果, and outlook,
impact or limitations in 主要结论. Signal phrases such as `we propose`,
`using`, `results show`, `outperforms`, `future work` and `limited by` identify
candidates only; verify them against the complete section.

Technical compression must preserve decisive predicates and relations:
optimization direction, objective function, conditioning relation, negation,
inequality, units and comparison baselines. “Maximize likelihood” may not be
weakened to “use likelihood as the objective”.

Every substantive bullet or paragraph contains at least one inline evidence
link. Prefer several precise links over one broad link when claims rely on
different sections. Do not expose internal workspace paths or raw IDs as
visible labels.

## Narrow-pane reading budget

Aim for at most 1000 body units: one Han character or one English word,
excluding headings and evidence links. Long papers may extend slightly to about
1200; shorter papers should be much shorter. Explicit user length/detail
requirements take priority. Both review depths use this same writing target.
Do not count or compress a completed draft, request a rewrite, truncate content
or report an error because of length. Preserve the full evidence-validated draft.

Use short paragraphs and compact lists; several background points should be
separate bullets. Fit approximately 360px beside the PDF. For several comparable
experimental results, use a 2–3-column table with short cells and a precise
evidence link in each row. Keep setup, metric/unit and baseline attached to the
number. Split by experiment or use bullets when a table would become wide.
Do not repeat table values in prose or add an exhaustive link appendix.

## Output language and document type

Regression check: a short XRO explanation used `L_M`, `C_1` and `C_2` without the source block matrix `L`
that defines them. Before referencing a variable, introduce its source equation and meaning with an evidence
link. If the symbol is unnecessary, explain the mechanism in plain language instead of dropping undefined
notation into a compressed summary. Preserve the decisive forecast-skill result and its validation setting;
supporting statistics cannot replace the result that tests the central claim.

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
