import {galleryReady} from './ready';
import { setLanguage } from '../app/desktop/src/shared/locale';
import {isPreview,syncPreview} from './preview-sync';
import { getDocument, GlobalWorkerOptions, type RenderTask } from '../app/desktop/node_modules/pdfjs-dist/build/pdf.mjs';
import { renderMarkdown } from '../app/desktop/src/components/MessageMarkdown';
GlobalWorkerOptions.workerSrc=new URL('pdf.worker.min.mjs',location.href).href;
setLanguage(new URLSearchParams(location.search).get('lang')==='zh'?'zh-CN':'en-US');
const name=document.body.dataset.document!, note=document.querySelector<HTMLElement>('#note')!, source=document.querySelector<HTMLElement>('#source')!, pageBox=document.querySelector<HTMLElement>('#page')!, canvas=document.querySelector<HTMLCanvasElement>('canvas')!, mark=document.querySelector<HTMLElement>('#mark')!;
const payload=await (await fetch(`${name}.json`)).json();
const evidence=payload.evidence as Record<string,{page:number;bbox:number[]}>;
note.innerHTML=renderMarkdown(payload.content);
const paper=name.split('-')[0], cache=new Map<number,ReturnType<typeof getDocument>>();
let renderTask:RenderTask|undefined,sequence=0,selected='',scale=1,zoom=1;
const zh=new URLSearchParams(location.search).get('lang')==='zh';
async function show(ref:string,focus=true){
 const value=evidence[ref];if(!value)return;selected=ref;
 const version=++sequence, previous=renderTask;previous?.cancel();if(previous)await previous.promise.catch(()=>undefined);
 if(version!==sequence)return;
 note.querySelectorAll('a[data-evidence-id]').forEach(link=>link.classList.toggle('selected',link.getAttribute('data-evidence-id')===ref));
 document.querySelector('#page-number')!.textContent=`${value.page} / ${payload.pageCount}`;
 try {
  if(!cache.has(value.page))cache.set(value.page,getDocument({url:`${paper}/${value.page}.pdf`,disableAutoFetch:true,disableStream:true}));
  const pdf=await cache.get(value.page)!.promise,page=await pdf.getPage(1);
  if(version!==sequence)return;
  const base=page.getViewport({scale:1}),[x1,y1,x2,y2]=value.bbox;
  scale=source.clientWidth/base.width*zoom;
  const css=page.getViewport({scale}),pixel=page.getViewport({scale:scale*Math.min(devicePixelRatio,2)});
  canvas.width=pixel.width;canvas.height=pixel.height;canvas.style.width=`${css.width}px`;canvas.style.height=`${css.height}px`;
  pageBox.style.width=`${css.width}px`;pageBox.style.height=`${css.height}px`;
  renderTask=page.render({canvasContext:canvas.getContext('2d')!,viewport:pixel});await renderTask.promise;
  if(version!==sequence)return;
  Object.assign(mark.style,{left:`${x1*css.width}px`,top:`${y1*css.height}px`,width:`${(x2-x1)*css.width}px`,height:`${(y2-y1)*css.height}px`});
  document.querySelector('#error')?.remove();void galleryReady();
  if(focus){source.scrollTop=Math.max(0,y1*css.height-source.clientHeight*.25);}
 }catch(error){
  if(version!==sequence || (error as Error).name==='RenderingCancelledException')return;
  cache.delete(value.page);
  const message=window.document.createElement('button');message.id='error';message.textContent=zh?'重新加载此页':'Reload this page';message.onclick=()=>{message.remove();void show(ref);};source.append(message);
 }
}
note.onclick=event=>{
 const link=(event.target as Element).closest<HTMLAnchorElement>('a');if(!link)return;event.preventDefault();
 if(link.dataset.evidenceId)void show(link.dataset.evidenceId);
 else link.animate([{background:'#a98bf155'},{background:'transparent'}],{duration:650});
};
source.addEventListener('wheel',event=>{if(!event.ctrlKey)return;event.preventDefault();zoom=Math.max(.7,Math.min(4,zoom*Math.exp(-event.deltaY*.002)));void show(selected);},{passive:false});
source.ondblclick=()=>{zoom=zoom>1?1:2;void show(selected);};
let resized=0;new ResizeObserver(()=>{clearTimeout(resized);resized=window.setTimeout(()=>{if(selected&&source.clientWidth)void show(selected,false);},100);}).observe(source);
await show(note.querySelector<HTMLElement>('[data-evidence-id]')?.dataset.evidenceId || Object.keys(evidence)[0],false);
if(zh){document.documentElement.lang='zh-CN';note.setAttribute('aria-label',name.endsWith('report')?'研究报告':'总结笔记');source.setAttribute('aria-label','原始 PDF 页面');}

// Use the same evidence action for the unattended demonstration and manual reading.
const links=[...note.querySelectorAll<HTMLAnchorElement>('a[data-evidence-id]')].filter(link=>evidence[link.dataset.evidenceId!]);
const main=document.querySelector('main')!,reduced=matchMedia('(prefers-reduced-motion: reduce)');
let visible=false,hovered=false,busy=false,index=0,hold=2000,previousTime=0,scrollPosition=0;
new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(main);
main.onpointerenter=()=>hovered=true;
main.onpointerleave=()=>{hovered=false;scrollPosition=note.scrollTop;};
main.onkeydown=()=>hovered=true;
function demonstrate(time:number){
 const elapsed=previousTime?Math.min(50,time-previousTime):0;previousTime=time;
 if(!isPreview&&visible&&!hovered&&!document.hidden&&!reduced.matches&&links.length){
  const maximum=note.scrollHeight-note.clientHeight;
  scrollPosition=Math.min(maximum,Math.max(note.scrollTop,scrollPosition)+elapsed*.026);note.scrollTop=scrollPosition;
  hold-=elapsed;
  if(!busy&&hold<=0){
   const link=links[index];
   const target=link?Math.max(0,Math.min(maximum,link.getBoundingClientRect().top-note.getBoundingClientRect().top+note.scrollTop-note.clientHeight*.55)):maximum;
   if(link&&scrollPosition>=target-1){
    busy=true;index++;link.animate([{background:'#b89bdd88'},{background:'#eee6fc'}],{duration:650});
    void show(link.dataset.evidenceId!).finally(()=>{busy=false;hold=700;});
   }else if(!link&&scrollPosition>=maximum-1){note.scrollTop=scrollPosition=0;index=0;hold=2000;}
  }
 }
 requestAnimationFrame(demonstrate);
}
requestAnimationFrame(demonstrate);
syncPreview(()=>({selected,zoom,note:note.scrollTop,source:source.scrollTop}),state=>{
 if(selected!==state.selected||zoom!==state.zoom){zoom=state.zoom;void show(state.selected,false);}
 note.scrollTop=state.note;source.scrollTop=state.source;
});
