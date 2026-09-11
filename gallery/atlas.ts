import {galleryReady} from './ready';
import { setLanguage } from '../app/desktop/src/shared/locale';
import { mountResearchMap } from '../app/desktop/src/features/outputs/researchMapCanvas';
import { graphView, mapClusters, type MapMode, type MapNode } from '../app/desktop/src/features/outputs/researchMapModel';
import { relationAppearance } from '../app/desktop/src/features/outputs/researchMapRelations';
import { renderMarkdown } from '../app/desktop/src/components/MessageMarkdown';

setLanguage(new URLSearchParams(location.search).get('lang')==='zh'?'zh-CN':'en-US');
const host=document.querySelector<HTMLElement>('#graph')!, note=document.querySelector<HTMLElement>('#note')!;
const query=new URLSearchParams(location.search),noteOnly=query.has('note'),graphOnly=query.has('graph');
document.body.classList.toggle('note-only',noteOnly);document.body.classList.toggle('graph-only',graphOnly);
const name=document.body.dataset.atlas!, response=await fetch(`${name}.json`);
if(!response.ok)throw Error('Research atlas is unavailable');
const {graph,notes}=await response.json();
let mode:MapMode='default', currentPath='', map:ReturnType<typeof mountResearchMap>;
let limit=3, frame=0;
function drawClusters(){
 if(!map)return;
 const svg=document.querySelector('#hulls')!;svg.replaceChildren();
 for(const group of map.setClusters(mapClusters(graphView(graph,mode),mode,limit))){
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d',group.path);path.setAttribute('fill',group.color);path.setAttribute('stroke',group.color);path.dataset.cluster=group.id;svg.append(path);
 }
}
const zh=new URLSearchParams(location.search).get('lang')==='zh';
const labels:Record<string,string>={default:'Overview',technical:'Methods',concept:'Concepts',group:'Groups',result:'Results'};
const relations:Record<string,string>={review:'Review',opens:'Open question',addresses:'Address', 'further-work':'Further work', uses:'Uses method', 'belongs-to':'Belongs to concept', 'uses-method':'Uses', 'uses-technique':'Uses', 'uses-concept':'Uses', 'from-group':'Affiliation', 'evaluated-on':'Evaluated on', 'reports-result':'Reports', 'related-to':'Related'};
function openPath(path:string){
 if(!(path in notes))return;
 currentPath=path;note.innerHTML=renderMarkdown(notes[path]);note.scrollTop=0;
 if(graphOnly)parent.postMessage({type:'atlas-note',atlas:name,path},location.origin);
}
function normalizeLabels(){if(!map||mode!=='default')return;const scale=11/map.cy.zoom(),base=parseFloat(getComputedStyle(host).fontSize);map.cy.nodes().forEach(node=>node.style({'font-size':scale,width:Number(node.data('size'))/base*scale,height:Number(node.data('size'))/base*scale}));}
function fitOverview(){if(!map)return;map.fit();if(name==='photonic'&&mode==='default'){map.cy.zoom(map.cy.zoom()*.88);map.cy.center();}normalizeLabels();}
new ResizeObserver(()=>requestAnimationFrame(fitOverview)).observe(host);
function mount(){
 map?.dispose();map=mountResearchMap(host,graph,mode,(node:MapNode)=>openPath(node.path),()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(drawClusters)},()=>{});
 fitOverview();
 const kinds=[...new Set(graphView(graph,mode).edges.map(edge=>edge.kind.startsWith('uses-')?'uses':edge.kind))];
 const legend=document.querySelector('#legend')!;legend.replaceChildren();
 for(const kind of kinds){const item=document.createElement('span'),line=document.createElement('i');line.style.borderTop=`1px ${relationAppearance(kind).line} var(${relationAppearance(kind).color})`;item.append(line,(zh?({review:'综述收录',opens:'开创性问题',addresses:'着手解决','further-work':'后续工作',uses:'使用方法','belongs-to':'属于概念','from-group':'课题组','evaluated-on':'测试于','reports-result':'结果'} as Record<string,string>)[kind]:relations[kind])||kind);legend.append(item);}
}
for(const [value,label] of Object.entries(labels)){
 const button=document.createElement('button');button.textContent=zh?({default:'总览',technical:'方法',concept:'概念',group:'课题组',result:'结果'} as Record<string,string>)[value]:label;button.dataset.mode=value;button.setAttribute('aria-pressed',String(value===mode));
 button.onclick=()=>{mode=value as MapMode;for(const other of document.querySelectorAll('[data-mode]'))other.setAttribute('aria-pressed',String(other===button));mount();};
 document.querySelector('#modes')!.append(button);
}
document.querySelector<HTMLButtonElement>('#fit')!.onclick=()=>map.fit();
document.querySelector<HTMLButtonElement>('#arrange')!.onclick=()=>map.arrange();
document.querySelector<HTMLInputElement>('#clusters')!.oninput=event=>{limit=Number((event.target as HTMLInputElement).value);document.querySelector('#cluster-count')!.textContent=String(limit);drawClusters();};
document.querySelector<HTMLButtonElement>('#expand')!.onclick=()=>{if(document.fullscreenElement)void document.exitFullscreen();else void document.documentElement.requestFullscreen();};
note.onclick=event=>{
 const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');if(!link)return;
 const href=link.getAttribute('href')!;
 if(/^(https?:|mailto:|thinkreader:)/i.test(href)){event.preventDefault();link.animate([{background:'#a98bf155'},{background:'transparent'}],{duration:650});return;}
 const path=decodeURIComponent(new URL(href,`https://atlas.invalid/${currentPath}`).pathname.slice(1));
 event.preventDefault();
 if(path in notes)openPath(path);
 else link.animate([{background:'#a98bf155'},{background:'transparent'}],{duration:650});
};
if(zh){document.documentElement.lang='zh-CN';document.querySelector('#fit')!.textContent='适应';document.querySelector('#arrange')!.textContent='布局';document.querySelector('.clusters')!.firstChild!.textContent='聚类 ';}
if(!noteOnly)mount();openPath(graph.nodes.find((node:MapNode)=>node.node_type==='paper').path);
if(noteOnly)window.addEventListener('message',event=>{
 if(event.origin===location.origin&&event.source===parent&&event.data?.type==='atlas-note'&&event.data.atlas===name&&typeof event.data.path==='string')openPath(event.data.path);
});

if(new URLSearchParams(location.search).has('demo')){
 let visible=false,hovered=false,elapsed=0,previous=0,index=0;
 const nodes=graph.nodes.filter((node:MapNode)=>node.node_type==='paper'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(host);
 document.body.onpointerenter=()=>hovered=true;document.body.onpointerleave=()=>hovered=false;
 function demonstrate(time:number){
  const delta=previous?Math.min(50,time-previous):0;previous=time;
  if(visible&&!hovered&&!document.hidden&&!reduced.matches){
   elapsed+=delta;note.scrollTop+=delta*.016;
   if(elapsed>5500){const node=nodes[index++%nodes.length];openPath(node.path);map.focus(map.cy.getElementById(node.id));elapsed=0;}
  }
  requestAnimationFrame(demonstrate);
 }
 requestAnimationFrame(demonstrate);
}

void galleryReady();
