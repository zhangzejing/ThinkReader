---
name: abzu-report
description: Create a concise evidence-linked ThinkReader paper report with original figures and explicit boundaries. Use for /report only.
---

# ThinkReader Report Skill

`/report` produces the lightest research artifact: a short, continuous explanation that lets a peer understand the paper's idea, evidence and limits in a few minutes. It is derived output, never Reader truth.

## Required reading order

1. Read `prompts/base.md`.
2. Read `prompts/flash.md` for a fast report, `prompts/pro.md` for deep mechanism/evidence analysis, or both when mode is automatic.
3. Read `rules.md`, `tools.md`, `writer.md` and `data/quality.json`.
4. Read the App-provided report context, PaperMap and relevant full sections before writing.

## File ownership

- `prompts/base.md` owns synthesis and prose quality.
- mode prompts own only depth differences.
- `rules.md` owns report shape, evidence, figures, language and formulas.
- `tools.md` owns assumed context, evidence, figure, validation and output capabilities.
- `data/quality.json` owns deterministic quality floors.
- `writer.md` owns proposal, validation and commit flow.

## Non-negotiable method

- Explain the causal story, not the table of contents and not a rewritten abstract.
- Follow important methods, equations, figures and experiments through their complete section context.
- Cite only labels and numeric claims that resolve to current evidence.
- Let the LLM decide which evidence matters and write the report; use tools for exact extraction, figure staging, deep links, file assembly and validation.
- Make uncertainty and missing evidence visible rather than filling gaps.

## Boundaries

Write only through controlled output tools under `output/report/<paper_id>/`. Existing annotations are optional, not a prerequisite. After commit the App first appends the `report` tag to an existing annotation covering the cited evidence; preserve its content, author, marks, hints, replies and layout. Only uncovered evidence gets a compact `### report` trace. Repeated runs must not multiply cards or tags; matching and tag writes are tool work, not extra LLM output. Never modify `RAW/` or Intelligence. Do not restore legacy context JSON, cleaner output, HTML Reader or public CLI flows.
