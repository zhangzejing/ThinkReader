---
name: abzu-codebase
description: Project an ThinkReader paper into an auditable reproduction specification and acceptance target. Use for /codebase only.
---

# ThinkReader Codebase Skill

`/codebase` turns a paper into a clean reproduction workspace: enough grounded detail for an engineer to implement the method and verify it against the paper without pretending that missing details are known.

## Required reading order

1. Read `prompts/base.md` and add `prompts/pro.md` for deep mode.
2. Read `rules.md`, `tools.md`, `writer.md` and `data/quality.json`.
3. Read the App-provided codebase context, PaperMap, relevant full sections, equations, figures/tables and declared resources.
4. Existing annotations are optional context, never a prerequisite. If the user separately requests a reproduction-focused annotation pass, use `/annotation` or `/deep-annotation`; do not make it a hidden dependency.

## File ownership

- `prompts/base.md` owns implementation judgment and SPEC quality.
- `prompts/pro.md` owns the deep-mode delta.
- `rules.md` owns file layout, evidence and acceptance-target consistency.
- `tools.md` owns assumed context, resource, evidence, validation and output capabilities.
- `data/quality.json` owns deterministic quality floors.
- `writer.md` owns proposal, validation and commit flow.

## Non-negotiable method

- Separate paper-stated facts, evidence-backed inferences, implementation decisions and unknowns.
- Preserve equations, symbol names, shapes, hyperparameters, datasets, metrics and conditions exactly where stated.
- Make `SPEC.md` and `results.target.json` agree on every target value and acceptance condition.
- Let the LLM infer the architecture and write the specification; use tools for exact evidence copying, resource inspection, JSON assembly, cross-file consistency checks and output writes.
- Never invent an omitted implementation detail; record it as a reproducibility risk or explicit decision.

## Boundaries

Outputs live only under `output/codebase/<paper_id>/`. The semantic proposal never mutates PDF or Intelligence. After commit the App first appends the `codebase` tag to an existing annotation covering the cited evidence, including source URLs; preserve its content, author, marks, hints, replies and layout. Only uncovered evidence gets a compact `### codebase` trace (source URLs: “已记录网址”). Repeated runs must not multiply cards or tags; matching and tag writes are tool work, not extra LLM output. Legacy cleaner/HTML Reader outputs, public CLI commands and old schemas are not inputs.
