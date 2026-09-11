# Codebase Pro Mode — Deeper Reproduction Spec

`pro` mode delta. Read this together with `prompts/base.md`; everything in base
still holds. `pro` makes the spec more *implementable and more verifiable*, not
just longer.

Add, beyond `auto`:

- **Algorithm-level method.** For each core module, give pseudocode or a precise
  step list, not just prose — including the loss/objective, the optimization
  loop, and update rules. Tie each step to the paper's equation.
- **Exact hyperparameters.** Collect every stated hyperparameter (lr, batch,
  warmup, dropout, layers, dims, schedule) into a table with the paper's values
  and where they are stated. Flag any the paper omits as a risk.
- **Ablation / control coverage.** Identify the ablations that isolate the
  contribution and add them as separate acceptance criteria where they matter
  for verification.
- **Tighter acceptance criteria.** Make `results.target.json` criteria
  quantitative and per-experiment (metric, value, tolerance, dataset/config),
  not a single vague target.
- **Risk mitigation.** For each reproducibility risk, suggest the most likely
  resolution from the paper's conventions — clearly marked as inference, never
  presented as a stated fact.

Still grounded: every added detail traces to the paper. Inference is labeled as
inference and lands in the risks section, never silently in the spec.
