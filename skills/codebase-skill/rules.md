# Codebase rules

## Output shape

Write a single workspace under `output/codebase/<paper_id>/`:

| File | Role |
| --- | --- |
| `README.md` | Scope, evidence basis, workspace navigation and expected implementation route. |
| `SPEC.md` | Technical core: modules, equations, data flow, shapes/interfaces, hyperparameters, experiments and risks. |
| `TODO.md` | Ordered path from setup to runnable verification, with dependencies and tests. |
| `results.target.json` | Machine-checkable datasets, metrics, conditions, minimum experiment and acceptance criteria. |

## Faithfulness

- Cover the full paper even when focus emphasizes one subsystem.
- Label statements as paper-stated fact, evidence-backed inference, implementation decision or unknown whenever confusion is possible.
- Preserve symbol names, equation semantics, tensor/data shapes, units, hyperparameters, datasets, splits, metrics and conditions exactly.
- Cite only real figure/table labels and current EvidenceRefs.
- Never invent a missing detail. Put it in reproducibility risks and, if implementation must choose, describe the decision and how to test sensitivity.

## Cross-file consistency

Every metric in `results.target.json` includes name, value and condition. The same target values and experiments must appear in `SPEC.md`. `TODO.md` must contain the steps and tests needed to reach them. No placeholder from `data/quality.json` may remain.

The minimum reproducible experiment should isolate the core claim, not merely prove that code runs. Acceptance criteria must be measurable and tied to the paper's reported evidence; distinguish exact-match expectations from tolerated reproduction variance.

## Safety

The workspace is a specification, not permission to clone, install or execute external code. Resource inspection is read-only unless the user separately requests implementation. Write only through the controlled output gateway.
