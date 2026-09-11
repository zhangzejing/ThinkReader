# Report rules

## What a report is

`/report` is a compact reading synthesis, not a section-by-section paraphrase, slide outline or fixed template. It should make the paper's problem, mechanism, strongest evidence and limits intelligible in a few minutes.

Use concrete headings that name what this paper did, or use flowing prose. Headings listed in `data/quality.json -> hollow_headings` are forbidden because they expose scaffold rather than thought.

## Evidence, figures and numbers

- Every central claim, result number and limitation must resolve to current EvidenceRefs.
- Cite figures/tables only by labels returned by the context tool.
- The LLM decides which figures are key after reading their full section context; metadata such as order, citation count or `is_key` is only navigation help.
- Embed each chosen figure/table as one complete image plus its original caption. The App must stitch all fragments belonging to that figure before inserting it; never display its fragments as separate report images. Preserve source page positions and subfigure labels; record composition provenance without adding invented labels or results. A single complete source image is copied unchanged.
- State metric name, value and experimental condition together. Do not detach a number from its dataset, split, baseline or model configuration.
- Check directional language against the evidence: improvement versus deterioration, maximization versus minimization, and overestimation versus underestimation. A heading must agree with its paragraph; metrics that make model performance look closer to human performance underestimate the remaining gap, not overestimate it.

## Language and math

Regression examples: the XRO report/slide figure once kept panels a–l but lost the right-hand forecast-skill
panels because the article used two text columns. Check the full original figure and both caption columns
against the reconstructed asset; a successful image composition is not a completeness check. Keep the
decisive all-month skill comparison, its validation period and baselines, not only supporting statistics.
When using `L_M`, `C_1` or `C_2`, first show and cite the source block matrix that defines them. Apply the
same rule to every introduced variable: source equation, meaning, then interpretation. Never infer a
missing definition or use a generic abbreviated equation as a substitute for the mechanism.

Write in the requested language while preserving established technical terms and paper symbols. Use `$...$` and `$$...$$` for mathematics; backticks are for identifiers, not formulas.

Distinguish facts stated by the paper from interpretation. Missing support becomes an explicit uncertainty, not confident prose. Do not browse for replacement evidence unless the user explicitly expands scope.

## Safety

Output is `output/report/<paper_id>/report.md` plus controlled `assets/`. Read sources and annotations; never write Reader truth. All output paths must stay within the selected repository and pass `report.validate`.
