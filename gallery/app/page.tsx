"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {LoadingFrame} from "./LoadingFrame";
import { Workflow, Atlas } from "./Workflows";
function Github({size=22}:{size?:number}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.49-.29-5.11-1.25-5.11-5.54 0-1.23.44-2.23 1.15-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.15 1.79 1.15 3.02 0 4.3-2.63 5.25-5.13 5.53.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>; }
export default function Home() {
 const [zh, setZh] = useState(false);
 useEffect(()=>{document.documentElement.dataset.palette='afterglow';},[]);
 return <main>
  <header className="site-header"><a href="#" className="wordmark"><img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width="38" height="38"/>ThinkReader</a><nav className="header-actions"><a className="download-link" href="https://github.com/zhangzejing/ThinkReader/releases/latest">{zh?"下载":"Download"}</a><a className="github-link" href="https://github.com/zhangzejing/ThinkReader" aria-label="GitHub"><Github size={22}/></a><Button variant="ghost" onClick={() => { setZh(!zh); document.documentElement.lang = zh ? "en" : "zh-CN"; }}>{zh ? "English" : "中文"}</Button></nav></header>
  <section className="hero"><h1>{zh ? "让阅读器会思考" : "A reader that thinks."}</h1><p className="hero-subtitle">{zh ? <><span>让 Agent 伴你流畅阅读，</span><span>从阅读走向更多可能的免费应用。</span></> : <><span>The free app for smooth</span><span>agentic reading and beyond.</span></>}</p><a className="gallery-link" href="https://github.com/zhangzejing/ThinkReader/releases/latest">{zh ? "下载 ThinkReader" : "Download ThinkReader"}</a></section>
  {[
   {id:'stream', film:'annotation-stream', title:zh?'流畅阅读。':'Read in flow.', text:zh?'阅读原始论文，让 Agent 同步添加批注、解释与证据。':'Read the original paper as your Agent adds annotations, explanations and evidence.'},
   {id:'reading', film:'multi-agent', title:zh?'多 Agent，多种 Skills。':'Multi agents and skills.', text:zh?'让不同 Agent 与 Skills 协作，审读论文、发展想法，把发现变成成果。':'Bring Agents and Skills together to review papers, develop ideas and build on the findings.'},
   {id:'conversation', film:'card-conversation', title:zh?'智能布局。':'Intelligent layout.', text:zh?'并排阅读论文、笔记与对话，把证据拖入聊天，把回答留在纸面。':'Read papers, notes and conversations side by side. Drag evidence into chat and answers onto the paper.'},
  ].map((feature,i)=><section id={feature.id} className={`feature feature-pair ${i%2?'reverse':''}`} key={feature.id}><div className="feature-copy"><h2>{feature.title}</h2><p>{feature.text}</p></div><div className={`feature-stage stage-${i}`}><LoadingFrame className="feature-demo" src={`${import.meta.env.BASE_URL}documents/feature-demo.html?mode=${feature.film}`} title={feature.title} loading="lazy"/></div></section>)}
  <section className="explore-heading"><h2>{zh?'找到下一个问题。':'Find what’s next.'}</h2><p>{zh?'把阅读积累变成总结、报告、思维导图、幻灯片与复现项目。在相连的论文与证据之间，找到值得继续探索的问题。':'Turn your reading into summaries, reports, mindmaps, slides and reproduction projects. Follow the connections between papers and evidence to find a question worth pursuing.'}</p><nav><a href="#attention">Attention Is All You Need</a><a href="#xro">Explainable El Niño</a><a href="#atlases">{zh?'研究图谱':'Research atlases'}</a></nav></section>
  <Workflow name="attention" title="Attention Is All You Need" count={19} zh={zh}/>
  <Workflow name="xro" title="Explainable El Niño predictability" count={10} zh={zh}/>
  <section id="atlases" className="atlases"><Atlas name="photonic" title={zh?'光计算 wiki':'Photonic computing wiki'} zh={zh}/><Atlas name="enso" title={zh?'ENSO 预测 wiki':'ENSO prediction wiki'} zh={zh}/></section>
  <footer><a className="wordmark" href="#"><img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width="38" height="38"/>ThinkReader</a><p>{zh?'为人与 Agent 共同研究而造。':'Built for humans and agents to research together.'}</p><a className="download-link" href="https://github.com/zhangzejing/ThinkReader/releases/latest">{zh?"下载":"Download"}</a><a className="github-link" href="https://github.com/zhangzejing/ThinkReader" aria-label="GitHub"><Github size={22}/></a></footer>
 </main>;
}
