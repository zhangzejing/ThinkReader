"use client";
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Summary, Mindmap, Slides, Codebase } from './Media';
import {LoadingFrame,useNearViewport} from './LoadingFrame';
import {LivePreview} from './LivePreview';

export function Workflow({name,title,count,zh}:{name:string;title:string;count:number;zh:boolean}){
 const commands=name==='attention'?['summary','mindmap','codebase','slides']:['summary','report','mindmap','slides'];
 const [active,setActive]=useState('summary'),[visited,setVisited]=useState(['summary']);
 useEffect(()=>setVisited(current=>current.includes(active)?current:[...current,active]),[active]);
 const root=useRef<HTMLElement>(null),near=useNearViewport(root);
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const timer=window.setInterval(()=>{const element=root.current,box=element?.getBoundingClientRect();if(!document.hidden&&box&&box.bottom>0&&box.top<innerHeight&&!element?.querySelector('.workflow-large:hover'))setActive(commands[(commands.indexOf(active)+1)%commands.length]);},25000);
  return()=>clearInterval(timer);
 },[active,name]);
 const descriptions:Record<string,string>=zh?{summary:'抓住论点，回到证据',report:'串联机制、证据与边界',mindmap:'展开思路，看见结构',codebase:'把理解变成复现起点',slides:'把研究讲清楚'}:{summary:'Understand the claims. Follow the evidence.',report:'Connect mechanisms, evidence and limits.',mindmap:'See how the ideas fit together.',codebase:'Build a starting point for reproduction.',slides:'Make the research ready to share.'};
 return <section ref={root} className="example" id={name}><header className="example-heading"><h2>{zh?'示例：':'Example: '}{title}</h2></header>
  <Tabs value={active} onValueChange={value=>setActive(String(value))} className="workflow-tabs" style={{'--active-x':`${12.5+25*commands.indexOf(active)}%`} as CSSProperties}>
   <TabsList className="command-previews" aria-label={zh?'研究输出':'Research outputs'}>{commands.map(command=><TabsTrigger key={command} value={command} onPointerEnter={()=>setActive(command)} className="command-preview">
    <span className="preview-picture"><img src={`${import.meta.env.BASE_URL}previews/${name}-${command}.webp`} alt="" loading="lazy"/>{(near&&(visited.includes(command)||active===command))?<LivePreview workflow={root} command={command} active={active===command}/>:null}</span>
    <strong>/{command}</strong><small>{descriptions[command]}</small>
   </TabsTrigger>)}</TabsList><div className="workflow-bridge" aria-hidden="true"><i/><span/></div>
   {commands.map(command=><TabsContent keepMounted value={command} key={command} data-command={command} className="workflow-large"><div className="workflow-window-label" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg>/{command}</div>
    {(near&&(visited.includes(command)||active===command))&&(command==='mindmap'?<Mindmap name={name} zh={zh}/>:command==='slides'?<Slides name={name} count={count} zh={zh}/>:command==='codebase'?<Codebase zh={zh}/>:<Summary name={name} command={command} zh={zh}/>)}
   </TabsContent>)}
  </Tabs>
 </section>;
}

export function Atlas({name,title,zh}:{name:string;title:string;zh:boolean}){
 const graph=useRef<HTMLIFrameElement>(null),note=useRef<HTMLIFrameElement>(null);
 const [path,setPath]=useState('');
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==graph.current?.contentWindow||event.data?.type!=='atlas-note'||event.data.atlas!==name||typeof event.data.path!=='string')return;setPath(event.data.path);note.current?.contentWindow?.postMessage(event.data,location.origin);};
  window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
 },[name]);
 return <article className={`atlas-separated ${name==='photonic'?'note-left':''}`}><h3>{zh?'示例：':'Example: '}{title}</h3><div className="atlas-windows">
  <LoadingFrame frameRef={graph} className="atlas-graph" title={`${title} graph`} src={`${import.meta.env.BASE_URL}atlases/${name}.html?graph=1&v=6&lang=${zh?'zh':'en'}`} loading="lazy"/>
  <LoadingFrame frameRef={note} className="atlas-note" title={`${title} notes`} src={`${import.meta.env.BASE_URL}atlases/${name}.html?note=1&v=6&lang=${zh?'zh':'en'}`} loading="lazy" onLoad={()=>{if(path)note.current?.contentWindow?.postMessage({type:'atlas-note',atlas:name,path},location.origin);}}/>
 </div></article>;
}
