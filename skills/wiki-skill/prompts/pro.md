# Wiki Pro Mode — Fuller Graph

`pro` mode delta. Read with `prompts/base.md`; everything in base still holds.
`pro` builds a fuller, more connected graph — still deduped, never padded.

Add, beyond `flash`:

- **Concept route.** Follow the Introduction-first field-positioning method in base;
  deepen the explanation for non-specialists, not the number of technical labels.
  Connect source-supported paradigms, architecture families and modeling tasks.
  Reuse canonical nodes; an existing
  technical node may add `map.views:["concept"]` without duplicating its page.
  Do not claim a paper evaluates language modeling merely because it discusses it
  as background, or create broad buzzwords from bibliography-only mentions.

- **Method decomposition (original research only).** Create `paper-method` nodes for the distinct methods
  and link them to the shared `technique`/`method`/`concept` nodes they build on.
  The combined `paper-method` + `technique` + `method` total remains 0–5.
- **Paper result pages (original research only).** Use `sub-result` only when a paper-specific result
  genuinely needs its own navigable page. It is not a primary Result-view node;
  place the decisive metric as a short edge label to a shared `result-topic` or
  `dataset` node instead.
- **Datasets.** Create or reuse `dataset` nodes for named evaluation datasets,
  consolidating abbreviations and naming variants through aliases. Link results
  from different papers to the same canonical dataset when the source supports it.
- **Public tasks/benchmarks.** Use `result-topic` for a public benchmark or
  difficult task shared across papers, never for a prose restatement of one
  paper's outcome.
- **Cross-paper organization.** Reconcile method/dataset aliases against the
  existing graph. Do not add generic similarity lines to make the graph more connected.
- **Problem framing.** Create/connect the specific `problem` node(s) the paper originates or
  addresses (`opened-by` / `addressed-by`). A survey restating a challenge does not originate it.
- **Richer cross-links.** Add `compared-with` / `extends` / `followed-by` links
  to the real neighboring works the paper positions against — only those grounded
  in the paper's references or the existing graph.
- **Private detail nodes.** Use `write-private` for paper-specific detail that
  doesn't belong in a shared common node.

Still deduped and grounded: every common node is checked with `wiki.alias.lookup`
first, and every cross-link names a real relationship to a real work. Coverage
serves navigability, not node count.
