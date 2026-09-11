"use client";
import { useEffect, useRef, useState } from "react";
import {LoadingFrame} from "./LoadingFrame";

export function Mindmap({name,zh}:{name:string;zh:boolean}) {
 return <LoadingFrame className="mindmap-embed" title={zh?'交互式思维导图':'Interactive mindmap'} src={`${import.meta.env.BASE_URL}mindmaps/${name}.html?v=5&lang=${zh?'zh':'en'}`} loading="lazy" allow="fullscreen" />;
}

export function Summary({name,zh,command='summary'}:{name:string;zh:boolean;command?:string}) {
 return <LoadingFrame className="mindmap-embed" title={zh?'笔记与原始 PDF':'Note and source PDF'} src={`${import.meta.env.BASE_URL}documents/${name}-${command}.html?v=5&lang=${zh?'zh':'en'}`} loading="lazy" />;
}

export function Codebase({zh}:{zh:boolean}) {
 return <LoadingFrame className="mindmap-embed" title={zh?'复现项目与 Agent 演示':'Reproduction project and Agent demo'} src={`${import.meta.env.BASE_URL}documents/attention-codebase.html?lang=${zh?'zh':'en'}`} loading="lazy" />;
}

export function Slides({ name, count, zh }: { name: string; count: number; zh: boolean }) {
 const [loaded,setLoaded]=useState(false);
 useEffect(()=>{setLoaded(false);const image=new Image();image.src=`${import.meta.env.BASE_URL}slides/${name}-continuous.webp`;void image.decode().then(()=>setLoaded(true));},[name]);
 const host = useRef<HTMLDivElement>(null);
 const view = useRef({scale:1,x:0,y:0});
 const paused = useRef(false), drag = useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const rows = Math.ceil(count / 4);
 const paint = () => {
  const element=host.current;if(!element?.clientWidth)return;
  const pageWidth=element.clientWidth/2*view.current.scale;
  const width=pageWidth*4,height=pageWidth/ (16/9)*rows;
  view.current.x=((view.current.x%width)-width)%width;view.current.y=((view.current.y%height)-height)%height;
  element.style.backgroundSize=`${width}px ${height}px`;
  element.style.backgroundPosition=`${view.current.x}px ${view.current.y}px`;
 };
 const zoom = (factor:number,x:number,y:number) => {
  const v=view.current,scale=Math.max(.5,Math.min(4,v.scale*factor)),ratio=scale/v.scale;
  view.current={scale,x:x-(x-v.x)*ratio,y:y-(y-v.y)*ratio};paint();
 };
 useEffect(()=>{
  const element=host.current;if(!element)return;
  let visible=false,frame=0,previous=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const tick=(time:number)=>{
   const elapsed=previous?Math.min(50,time-previous):0;previous=time;
   if(visible&&!paused.current&&!drag.current&&!reduced.matches){
    const pageWidth=element.clientWidth/2*view.current.scale;
    view.current.x-=elapsed*pageWidth*4/80000;view.current.y-=elapsed*pageWidth/(16/9)*rows/80000;paint();
   }
   frame=requestAnimationFrame(tick);
  };
  const wheel=(event:WheelEvent)=>{event.preventDefault();const r=element.getBoundingClientRect();zoom(Math.exp(-event.deltaY*.002),event.clientX-r.left,event.clientY-r.top);};
  element.addEventListener('wheel',wheel,{passive:false});
  const observer=new IntersectionObserver(([entry])=>visible=entry.isIntersecting);observer.observe(element);
  const resize=new ResizeObserver(paint);resize.observe(element);paint();frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);element.removeEventListener('wheel',wheel);observer.disconnect();resize.disconnect();};
 },[rows]);
 return <section className="slide-section">
  {!loaded&&<div className="gallery-loading" role="status"><span className="gallery-spinner" aria-label="Loading"/></div>}
  <div className="slide-overview" ref={host} tabIndex={0} role="region" aria-label={zh?`${count} 页幻灯片，移入暂停，滚轮缩放`:`${count} slides. Hover to pause; scroll to zoom.`} style={{opacity:loaded?1:0,backgroundImage:`url(${import.meta.env.BASE_URL}slides/${name}-continuous.webp)`}}
   onPointerEnter={()=>paused.current=true} onPointerLeave={()=>{paused.current=false;}}
   onFocus={()=>paused.current=true} onBlur={()=>{paused.current=host.current?.matches(':hover')||false;}}
   onKeyDown={event=>{const r=host.current!.getBoundingClientRect();if(['+','=','-','0','Escape'].includes(event.key)){event.preventDefault();if(['0','Escape'].includes(event.key)){view.current={scale:1,x:0,y:0};paint();}else zoom(event.key==='-'?.8:1.25,r.width/2,r.height/2);}}}
   onPointerDown={event=>{if(event.button!==0)return;event.currentTarget.setPointerCapture(event.pointerId);drag.current={x:event.clientX,y:event.clientY,left:view.current.x,top:view.current.y};}}
   onPointerMove={event=>{const d=drag.current;if(d){view.current.x=d.left+event.clientX-d.x;view.current.y=d.top+event.clientY-d.y;paint();}}}
   onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onLostPointerCapture={()=>drag.current=null} />
  <div className="command-caption"><h3>/slides</h3></div>
 </section>;
}
