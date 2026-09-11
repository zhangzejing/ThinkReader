# 批注线索库

`skills/annotation-skill/data/cues.json` 是 ThinkReader 的累积阅读线索库。
App 的 `evidence.search` 会读取它，用来辅助快速/精读命令发现可能值得
标记的贡献、结果、方法、局限、前提和 Wiki 线索。

线索库只提供候选信号，不能替代模型精读。

## 何时添加线索

适合添加：

- 某类论文反复出现的短语，能可靠提示贡献、结果、方法或局限。
- 用户指出 ThinkReader 下次应该捕捉的术语。
- 同领域多篇论文共用的基线、数据集、方法名或证据类型。

不适合添加：

- 只对单篇论文有效的句子。
- 过于泛化的词，如 `method`、`result`、`important`。
- 容易误伤参考文献、作者单位、资助信息的短语。

## 维护规则

- 以下规则只适用于 App/Skill 维护者；论文任务中的 Agent 只能读取，不能修改随 App 发布的线索库。
- 优先向 `skills/annotation-skill/data/cues.json` 追加短语。
- 不要为了单篇论文硬编码搜索规则。
- 添加后用至少一篇论文的候选搜索结果检查是否误伤。
- 如果线索需要复杂上下文判断，应写入 prompt/rules，而不是 cue JSON。

## Output language and document type

Use the language selected for the current task for ALL titles, headings, labels and prose. Chinese examples below illustrate semantics only; translate them for English output. For paper_type=other (fixtures, test pages and non-research material), choose a useful concise structure from the actual evidence instead of forcing a research/survey template. Never invent results to fill a template.
