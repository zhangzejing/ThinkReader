---
name: abzu-wiki
description: Build or update an evidence-grounded ThinkReader paper page and deduplicated shared knowledge graph. Use for /wiki only.
---

# ThinkReader Wiki Skill

`/wiki` projects one paper into a durable research graph. It reads the current PaperItem, PDF front matter, EvidenceIndex, PaperMap, optional annotations and existing wiki graph. The semantic proposal never edits Reader data. After commit, the App first reuses annotations covering cited evidence by appending the `wiki` tag, preserving their content, author, marks, hints, replies and layout. Only evidence not already annotated gets a compact work-trace card. Repeated runs must not multiply cards or tags; matching and tag writes are tool work, not extra LLM output.

## Required reading order

1. Read `prompts/base.md`.
2. Read the requested mode file: `prompts/flash.md` for a compact projection or `prompts/pro.md` for a fuller graph delta.
3. Read `rules.md`, `tools.md`, `writer.md` and `data/quality.json`.
4. Read the App-provided wiki context and existing candidate neighbors before proposing writes.

## File ownership

- `prompts/base.md` owns content judgment and writing quality.
- mode prompts own only the depth delta.
- `rules.md` owns graph vocabulary, paths, dedup and ownership rules.
- `tools.md` owns assumed read, lookup, validation and apply capabilities.
- `data/quality.json` owns the controlled vocabulary.
- `writer.md` owns the proposal and commit flow.

## Non-negotiable method

- The paper page is the hub: state the problem, core idea, key evidence, limits and real neighbors.
- Every research-group, technical-method, concept and result node introduced for this paper must remain directly connected to the paper hub; never leave a free node or a method that hangs only from a problem node.
- Prefer a few reusable, well-linked nodes over many shallow stubs.
- Read the source in semantic blocks, not as a checklist of extraction fragments. Select the
  smallest sufficient evidence set per claim; keep related refs in one action. Do not repeat
  an Evidence link for each author line or fragment in prose. The writer groups derived
  citations, and the trace service reuses existing cards. See the rejected examples in `rules.md`.
- Follow the current output language for all newly written headings, link labels, relation
  descriptions and generic evidence captions. Chinese may retain English proper names and
  technical terms. Never copy the template's Chinese into an English output or translate text
  already in the target language. Do not rewrite user-authored text merely to change its language.
- Resolve titles and aliases before creating any shared node.
- Ground substantive claims and relationships in current EvidenceRefs; never invent graph neighbors.
- Inspect `front_matter` for the complete author and affiliation lines. When the paper states an affiliation or lab, put the source-supported organization names in the paper hub's `map.groups`; do not omit them merely because PaperItem metadata is incomplete.
- Put the complete contiguous author/affiliation/email block's EvidenceRefs in `map.author_evidence_refs`. The tool tags existing annotations first; only still-unannotated author information gets one enclosing area trace, not separate cards on names and institutions. Keep abstract/body/footnotes outside this block.
- Build the concept route primarily from the complete Introduction for researchers outside the field: identify the broader field/paradigm, established research route and task that locate this paper. Use later sections only to confirm scope. Shared anchors such as Deep Learning must connect every applicable paper, not just the paper that first created the node. Distinguish source-stated positioning from an explicitly labeled broader classification (for example, VAE's neural-network instance, not all variational inference). Bibliography-only mentions and arbitrary buzzwords are insufficient. Reuse a technical node with `map.views:["concept"]` when it also serves as a conceptual entry point; never duplicate a node to fill a view. See the Introduction-first procedure in `prompts/base.md`.
- Keep research groups sparse: deduplicate organization names, use only the corresponding author's source-stated affiliation(s), and never exceed the number of clearly identified corresponding authors. If correspondence is not marked, keep exactly one primary source-stated organization. Record the grounded count in `map.corresponding_author_count` (fallback `1`).
- Treat `technique`, `method` and `paper-method` as one “technical method” family and select 0–5 in total; never invent method adoption to fill a quota.
- Compile across papers by reusing source-supported aliases. Similarity alone creates no relation. A link in prose or ownership of a common page does not establish adoption: use explicit `uses` for methods and `belongs-to` for conceptual classification, each with exact evidence.
- The primary-research main view contains Paper → Open question → Problem, Paper → Address → Problem, and Paper/Problem → Further work → Paper. Open question is reserved for field-opening work. Further work always ends at a paper; Address wins when the same problem/paper pair also has Further work. See `rules.md` for proposal direction versus display direction.
- Specialized views preserve the whole main view and add only gray method-use, concept-membership, affiliation and result edges. Comparison/reference/similarity links remain navigational Wiki links, not additional map relations.
- Surveys add only blue dashed `review` arrows to the actual papers they include in the main view, plus gray concept/affiliation links in extended views. They do not inherit the methods/results of the papers they survey or dominate the core research network.
- Represent named evaluation datasets as reusable `dataset` nodes. Resolve spelling, abbreviation and release-name variants through aliases so results from different papers meet at the same dataset node.
- Use target-specific `map.results` entries for graph metrics (see `writer.md`): each entry names one public task/dataset, one complete short label and its exact evidence. Never broadcast a paper-level result summary onto every result edge. Prefer a number plus metric; retain the minimal language direction, split or training condition needed to avoid ambiguity. Long explanations and conflicting source values belong on the page, never a truncated edge label.
- Generate the semantic proposal with the LLM, but delegate graph lookup, stable path construction, backlink expansion, link validation and batch application to tools.

## Boundaries

Outputs live under `output/wiki/<paper_id>/` and `output/wiki/common/`. The map/index is derived. The Agent does not hand-edit shared backlink blocks, alias indexes or App control files. Legacy `review_source.json`, HTML Reader, public Python CLI and historical writer schemas are not valid inputs or execution paths.
