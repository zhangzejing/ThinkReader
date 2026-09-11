# Wiki rules

## Shape and ownership

- The paper-owned hub lives under `output/wiki/<paper_id>/`.
- Reusable concepts live under `output/wiki/common/`; the first validated creation owns the body, later papers add relationships through the writer gateway.
- Alias indexes, backlink blocks and map/index files are derived or gateway-owned. Never edit them directly.
- Preserve user-authored material. Change only the proposal-owned region or operations returned by `wiki.context.read`.

## Dedup before creation

Before creating a common node, call `wiki.alias.lookup` with the standard field term and plausible aliases. Reuse the canonical node when one exists. Create a node only when the concept is materially distinct; spelling, translation, acronym and granularity variants are not sufficient reasons.

Titles should use the field's standard term. Store useful aliases so the next paper can resolve the same idea. A common node with no meaningful inbound or outbound relation is probably not worth creating.

Check both shared and paper-private nodes before introducing a method. Compare the
source definition, acronym and cited original work, not just spelling. For example,
Extended Recharge Oscillator and Extended nonlinear recharge oscillator refer to
the same XRO when the source identifies that model: reuse one identity and record
both names as aliases. RO, linear RO, nonlinear RO and XRO are not all synonyms;
broader families and materially different variants need relationships, not aliases.
Near-synonyms require source-supported equivalence; do not merge by word overlap.

`technique`, `method` and `paper-method` belong to one synonym family for lookup.
Named datasets use `dataset` and must consolidate abbreviations, punctuation and
release-name variants through aliases. Same meaning means reuse/merge; a
`strongly-related` edge can remain a sourced Wiki navigation link but is not projected
into the research map. Specialized views retain the entire main view and add only gray
paper→method, paper→concept, paper→group and paper→result links. Every kind has one
App-owned style: thin solid lines, except the blue dashed Review arrow. Main-view relations
are colored; extended relations are gray. Do not propose
colors, line styles or new relation kinds. Paper labels use map.short_name and year;
keep the full title in the underlying paper page and never invent a publication year.

## Controlled vocabulary

### Rejected output: fragmented citations and mixed UI language

An English Wiki previously showed dozens of consecutive `证据 · p. 1` links after one
affiliation. These were extraction fragments of the same author block, not dozens of
independent scientific claims. Do not reproduce this format:

- Use one author/affiliation action with its complete contiguous `author_evidence_refs`.
  Do not emit separate actions for every name, email, superscript or institution line.
- For one claim, select the smallest sufficient source passage(s), put their refs in one
  action, and write one concise source label. The gateway retains every accepted ref and
  groups derived references in one expandable entry; do not hand-write repeated backlink lists.
- Adjacent fragments of the same paragraph, figure/caption or author block may share an
  evidence presentation. Proximity alone is insufficient: never merge unrelated claims,
  different columns, different pages, separate figures or passages with different meanings.
- Reuse an existing annotation covering the evidence. Never duplicate or overwrite a
  person's interpretation, reply, color or pinned card just to tidy the output.
- Verify headings, captions, relation labels and default source labels against the current
  language before submission. `证据` / `关联` must not leak into newly generated English
  templates; `Evidence` / `Connections` are their English labels. Preserve scientific names.

Final audit: every map edge has evidence for that exact relation; no orphan problem is
created from a survey's broad outlook; no review inherits implementation or result claims;
no source passage is multiplied into redundant cards or a wall of repeated citation labels.

Rejected examples: separate "Extended RO" and "Extended nonlinear recharge oscillator (XRO)" nodes
duplicated the same source-defined model; merge their identity through canonical alias lookup, not a new
similarity edge. Conversely, RO and XRO are not interchangeable. Two "Addresses" legend entries and
per-view restyling made the same relationship look different: use the existing controlled relation kind
once and let the App assign its fixed appearance. Do not invent a second spelling, color or line style to
distinguish a view. Common use/group links remain gray; Addresses remains green across views.

Allowed operations, node types and backlink kinds come from `data/quality.json`; do not memorize or extend them in a proposal. Unknown values must fail validation rather than being silently normalized.

Choose the relationship that the evidence actually supports. `extends` requires a real extension claim; `compared-with` requires a direct comparison; a citation without a stronger relation is only `referenced-by`. Do not infer chronology or influence merely from topical similarity.

`uses` means the current paper actually implements or adopts the target method/technique.
Attach the specific method/experiment EvidenceRefs, not the whole paper's reference list.
A review discussing SLM/PIC/metasurface alternatives has not implemented all of them. A paper
contrasting on-chip photonics with an SLM does not thereby use an SLM. Keep such navigational
links in prose and use `referenced-by`; they do not create an adoption edge. `opened-by` and
`addressed-by` target an explicit research problem, never a method name. Do not force every
paper onto one broad problem merely to connect the graph. A sparse graph is valid. Organization
names sharing words do not prove organizational relationships. Technical-node count may be zero.

## Main-view directions and precedence

The display contains exactly these directed relations:

- Paper → **Open question** → Problem: a field-opening paper originates the research
  question. Merely restating a known challenge or reviewing the field is insufficient.
- Paper → **Address** → Problem: the paper undertakes to solve that specific problem.
  Scope the problem to what its methods/results establish, not a broader field-wide claim.
- Paper → **Further work** → Paper: the target work explicitly extends or strengthens the source.
- Problem → **Further work** → Paper: the target investigates, questions, explains or strengthens
  understanding of the problem without claiming to solve it.

Proposals are owned by the current paper: `opened-by`/`addressed-by` point from its hub to
its problem; `extends`/`followed-by` point from its hub to the prior paper or problem.
The map reverses only the latter two so Further work ALWAYS ends at the later/current paper.
Do not reverse proposal ownership to manufacture this visual direction. A prior-paper claim
requires the source work to be explicitly identified, not simply older or topically similar.

One unordered node pair has one displayed edge. Address overrides Further work regardless
of input order or opposite directions; preserve the winning edge's own direction and evidence.
Reference/comparison links remain in Wiki prose/backlinks, not as extra main-view edges.

For extended views, `uses` requires actual method adoption; `belongs-to` requires a supported
concept classification; `map.groups` uses source affiliations; `map.results` uses target-specific
result evidence. All these edges are gray, including when a view reuses an existing node.

## Evidence and language

- Every substantive paper claim and nontrivial edge carries one or more current EvidenceRefs.
- Evidence must support the exact claim, not merely mention the same topic.
- Use original figure/table labels and standard technical terms.
- Write in the user's requested language while retaining canonical English terminology where it aids deduplication.
- Unknown EvidenceRefs, unresolved aliases, broken links and cycles caused only by reciprocal metadata are validation errors.
- Annotations are optional context, never a prerequisite. A paper with no annotations must still be read from its full EvidenceIndex.
- Inspect `front_matter` before proposing the hub. Source-stated affiliations/labs belong in `map.groups` using the organization's printed name; inferred organizations are forbidden.
- Ground the concept route primarily in the full Introduction and explain field/research-route/task positioning for non-specialists. Shared concepts require a direct link with each applicable paper's own evidence. Any broader classification must be explicitly scoped and labeled; do not equate background, general mathematical methods and evaluated neural implementations.
- `map.groups` is deduplicated and non-empty. Use corresponding-author affiliations only, cap its length at `map.corresponding_author_count`, and use the configured fallback count when the paper does not mark correspondence.
- The combined technical-method family (`paper-method`, `technique`, `method`) follows the configured 0–5-node budget. Result edges use target-specific `map.results` with exact evidence and a complete short number/metric/necessary-condition label. Never truncate prose or reuse one task's score on another task; `writer.md` owns the field contract.

## Survey identity, reuse and attribution

For surveys, build the hub around research questions, taxonomy, routes and comparisons.
In the main view, use only **Survey → Review → Included paper**, a blue dashed arrow.
`review` requires a real included paper, resolved by title/DOI and the survey's exact citation
or discussion EvidenceRefs. It is not a similarity edge. Never fabricate a missing paper hub.
Surveys do not emit Open question, Address or Further work edges merely because they discuss
problems or organize others' findings. They retain gray concept membership (`belongs-to`)
and source affiliation relations. Described methods and reported third-party results belong
to the original papers, not to survey Uses/Results edges. The App keeps surveys peripheral
and excludes Review edges from core-network layout forces and node-degree emphasis.
The taxonomy itself belongs to this survey's page: another survey's differently scoped
classification must not overwrite it or become an asserted universal hierarchy.

Before citing a representative work, call library.paper.lookup with its DOI or full
title and compare authors/year. Reuse its returned paper identity and wiki_node_id
when available; do not create a common concept node as a substitute for that paper.
An ambiguous match stays unresolved until clarified. Bibliography mention alone
supports a reference, not an extension, comparison or adoption claim.

Resolve every concept/method with wiki.alias.lookup, including acronyms, translations
and aliases. Prefer existing common nodes and links to an original paper's private
method/result page over copying that content into the survey. Reuse does not transfer
ownership: preserve prior bodies and original sources. Different methods with similar
names, task-specific variants and different comparison settings are not synonyms.

Every survey relationship uses this survey's own EvidenceRefs and says what this
survey states. An original paper's numerical result remains attributed to that paper;
the survey is a secondary source unless the original evidence has separately been read.
Link to the existing original paper/result node for that primary context. Never place
another paper's bare EvidenceRef under the survey's paper_id. Do not replace original
results, add surveyed scores to map.results as the survey's experiments, or infer a
universal ranking from incomparable datasets/metrics/conditions.

Across surveys, reuse canonical concepts/methods and source papers, but keep each
survey's coverage dates, taxonomy, synthesis and disputed claims on its own hub/pages.
Use only the current vocabulary; prefer referenced-by when the evidence supports no
stronger relation. Other papers' hub bodies are read-only. Missing wiki hubs must not
be fabricated; record the library paper identity in prose until its own /wiki is run.

The current graph's 0–5 technical-node projection is not a completeness quota for a
survey bibliography. Keep the full representative-work table in the hub; choose only
the strongest route anchors for the graph. Do not delete links or collapse distinct
methods merely to satisfy a visual budget.

## Safety

Evidence grouping means one PDF annotation card for one source fact, not merely a
collapsed list of Markdown links. For a contiguous author/affiliation block, supply
all its exact refs in `map.author_evidence_refs`; group actions cite only the actual
affiliation text, never every citation in the paper hub. Preserve every fragment's
provenance in the grouped card. Nearby evidence of different claims stays separate.
For example, 22 author fragments should yield one author card on that page, not 22
cards hidden behind an `Evidence (22)` disclosure. Reuse existing cards and preserve
user edits, replies and pinned layouts.

When a survey looks isolated in Overview, inspect its bibliography against Library
paper identities before adding `review`. Shared subject matter is insufficient.
Check Concepts/Groups separately: their gray links can be valid while Overview has
no supported link. Do not invent a citation or a main-view problem relation to make
the layout connected.

Do not conflate a Perspective with a survey. A source-stated Perspective proposing
a route can use `addressed-by` for the problem it explicitly tackles (paper type
`other`); explain that the route is proposed rather than experimentally solved.
Example: *Programmable metasurfaces for future photonic artificial intelligence*
targets scalable programmable photonic AI. Do not suppress that grounded Address
edge by classifying all non-experimental papers as surveys.

The wiki reads PDF/Intelligence/optional annotations and existing outputs but writes only through the wiki gateway. After a successful commit the App adds `wiki` to an existing annotation covering the cited evidence, without changing its content or appearance. Only uncovered evidence receives a tiny `### wiki` work-trace card. Do not create duplicate cards for output bookkeeping. It never modifies `RAW/`, Intelligence or another paper's owned body.
