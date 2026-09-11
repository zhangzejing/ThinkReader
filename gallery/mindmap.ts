import {galleryReady} from './ready';
import { setLanguage } from '../app/desktop/src/shared/locale';
import {isPreview,syncPreview} from './preview-sync';
import { normalizeCanvas, edgePath, portPoint } from '../app/desktop/src/components/canvasGeometry';
import { renderMarkdown } from '../app/desktop/src/components/MessageMarkdown';

setLanguage(new URLSearchParams(location.search).get('lang')==='zh'?'zh-CN':'en-US');
const host = document.querySelector<HTMLElement>('#viewport')!, world = document.querySelector<HTMLElement>('#world')!;
const name = document.body.dataset.mindmap!, response = await fetch(`${name}.json`);
if (!response.ok) throw Error('Mindmap is unavailable');
const { canvas, notes } = await response.json(), { data } = normalizeCanvas(canvas);
const byId = new Map(data.nodes.map(node => [node.id, node]));
const svg = document.querySelector<SVGSVGElement>('#edges')!;
const edges = data.edges.map(edge => {
 const path = document.createElementNS(svg.namespaceURI, 'path') as SVGPathElement;
 path.setAttribute('marker-end', 'url(#arrow)'); path.dataset.edge=edge.id; svg.append(path); return { edge, path };
});
function drawEdges() {
 for (const {edge} of edges) for(const path of world.querySelectorAll(`[data-edge="${CSS.escape(edge.id)}"]`)) path.setAttribute('d', edgePath(portPoint(byId.get(edge.from.node_id)!, edge.from.port), portPoint(byId.get(edge.to.node_id)!, edge.to.port), edge.from.port));
}
let view = {x:0,y:0,zoom:1};
let period=0, minimumX=0, paused=false, visible=false;
function repeatCanvas() {
 world.querySelectorAll('.mirror').forEach(copy=>copy.remove());
 if(!period)return;
 const originals=[...world.children];
 const count=Math.ceil(host.clientWidth/(period*view.zoom))+1;
 for(let i=-1;i<=count;i++){
  if(i===0)continue;
  const copy=document.createElement('div');copy.className='mirror';copy.style.transform=`translateX(${i*period}px)`;copy.setAttribute('aria-hidden','true');
  for(const element of originals){const clone=element.cloneNode(true) as HTMLElement;clone.removeAttribute('id');if(clone.tagName.toLowerCase()==='svg'){clone.classList.add('edge-copy');clone.querySelector('defs')?.remove();}copy.append(clone);}
  world.append(copy);
 }
}
function apply() { world.style.transform = `translate(${view.x}px,${view.y}px) scale(${view.zoom})`; host.dataset.zoom = String(view.zoom); }
function zoomAt(zoom: number, x: number, y: number) {
 zoom = Math.max(.07, Math.min(2.5, zoom)); const ratio = zoom / view.zoom;
 view = {zoom, x:x-(x-view.x)*ratio, y:y-(y-view.y)*ratio}; apply();repeatCanvas();
}
function fit(complete = false) {
 const x = Math.min(...data.nodes.map(n=>n.x))-40, y = Math.min(...data.nodes.map(n=>n.y))-40;
 const width = Math.max(...data.nodes.map(n=>n.x+n.width))-x+40, height = Math.max(...data.nodes.map(n=>n.y+n.height))-y+40;
 const zoom = complete ? Math.min(1, host.clientWidth/width, host.clientHeight/height) : .55;
 const start = data.nodes.find(node=>node.kind==='card') || data.nodes[0];
 view = complete ? {zoom, x:(host.clientWidth-width*zoom)/2-x*zoom, y:(host.clientHeight-height*zoom)/2-y*zoom}
  : {zoom, x:24-start.x*zoom, y:host.clientHeight/2-(start.y+start.height/2)*zoom}; apply();repeatCanvas();
}
for (const node of data.nodes) {
 const article = document.createElement('article'); article.dataset.node = node.id;
 article.className = `node color-${node.color || 'default'}`;
 Object.assign(article.style, {left:`${node.x}px`,top:`${node.y}px`,width:`${node.width}px`,height:`${node.height}px`});
 article.innerHTML = renderMarkdown(node.kind === 'note' ? notes[node.path!] || '' : node.body_md || '');
 world.append(article);
}
async function showCompleteNodes() {
 await document.fonts.ready;
 await Promise.all([...world.querySelectorAll('img')].map(image => image.complete ? Promise.resolve() : new Promise<void>(resolve => {image.onload=image.onerror=()=>resolve();})));
 const rows = new Map<number, typeof data.nodes>();
 for (const node of [...data.nodes].sort((a,b)=>a.y-b.y)) {
  const article=world.querySelector<HTMLElement>(`[data-node="${CSS.escape(node.id)}"]`)!;
  article.style.minHeight=`${node.height}px`; article.style.height='auto'; node.height=article.offsetHeight;
  rows.set(node.y,[...(rows.get(node.y)||[]),node]);
 }
 let bottom=-Infinity,shift=0;
 for(const [originalY,nodes] of rows){
  const y=Math.max(originalY+shift,bottom+60);shift=y-originalY;
  for(const node of nodes){node.y=y;world.querySelector<HTMLElement>(`[data-node="${CSS.escape(node.id)}"]`)!.style.top=`${y}px`;}
  bottom=y+Math.max(...nodes.map(node=>node.height));
 }
 minimumX=Math.min(...data.nodes.map(node=>node.x))-60;
 period=Math.max(...data.nodes.map(node=>node.x+node.width))-minimumX+60;
 drawEdges(); fit();
}
drawEdges(); fit(); void showCompleteNodes().then(galleryReady);
host.addEventListener('wheel', event => {event.preventDefault();const box=host.getBoundingClientRect();zoomAt(view.zoom*Math.exp(-event.deltaY*.002),event.clientX-box.left,event.clientY-box.top);},{passive:false});
let drag: {id?:string;left:number;top:number;x:number;y:number} | null = null;
host.onpointerdown = event => {
 if (event.button !== 0 || (event.target as Element).closest('a,button')) return;
 const article=(event.target as Element).closest<HTMLElement>('[data-node]'),node=byId.get(article?.dataset.node || '');
 drag={id:node?.id,left:node?.x??view.x,top:node?.y??view.y,x:event.clientX,y:event.clientY};host.setPointerCapture(event.pointerId);
};
host.onpointermove = event => {
 if(!drag)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
 if(drag.id){const node=byId.get(drag.id)!;node.x=drag.left+dx/view.zoom;node.y=drag.top+dy/view.zoom;for(const article of world.querySelectorAll<HTMLElement>(`[data-node="${CSS.escape(node.id)}"]`)){article.style.left=`${node.x}px`;article.style.top=`${node.y}px`;}drawEdges();}
 else{view.x=drag.left+dx;view.y=drag.top+dy;apply();}
};
host.onpointerup=host.onpointercancel=host.onlostpointercapture=()=>{drag=null;};
host.onclick = event => {const link=(event.target as Element).closest('a');if(link){event.preventDefault();link.animate([{background:'#a98bf155'},{background:'transparent'}],{duration:650});}};
host.ondblclick=event=>{const id=(event.target as Element).closest<HTMLElement>('[data-node]')?.dataset.node,node=byId.get(id||'');if(!node)return;event.preventDefault();const zoom=Math.min(1.3,host.clientWidth/(node.width+60),host.clientHeight/(node.height+60));view={zoom,x:host.clientWidth/2-(node.x+node.width/2)*zoom,y:host.clientHeight/2-(node.y+node.height/2)*zoom};apply();repeatCanvas();};
host.onkeydown = event => {if(['+','=','-','0','Escape'].includes(event.key)){event.preventDefault();if(['0','Escape'].includes(event.key))fit(true);else zoomAt(view.zoom*(event.key==='-'?.8:1.25),host.clientWidth/2,host.clientHeight/2);}};
let viewportWidth=host.clientWidth,viewportHeight=host.clientHeight;new ResizeObserver(()=>{if(host.clientWidth&&(host.clientWidth!==viewportWidth||host.clientHeight!==viewportHeight)){viewportWidth=host.clientWidth;viewportHeight=host.clientHeight;fit();}}).observe(host);
new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(host);
host.onpointerenter=()=>paused=true;host.onpointerleave=()=>paused=false;
host.onfocus=()=>paused=true;host.onblur=()=>paused=host.matches(':hover');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let previous=0;
function drift(time:number){const elapsed=previous?Math.min(50,time-previous):0;previous=time;if(!isPreview&&period&&visible&&!paused&&!drag&&!reduced.matches){const span=period*view.zoom;view.x-=elapsed*span/90000;view.x=((view.x+minimumX*view.zoom)%span+span)%span-span-minimumX*view.zoom;apply();}requestAnimationFrame(drift);}
syncPreview(()=>({...view,nodes:data.nodes.map(({id,x,y})=>({id,x,y}))}),state=>{
 view={x:state.x,y:state.y,zoom:state.zoom};apply();let changed=false;
 for(const position of state.nodes){const node=byId.get(position.id);if(!node||(node.x===position.x&&node.y===position.y))continue;Object.assign(node,position);changed=true;for(const article of world.querySelectorAll<HTMLElement>(`[data-node="${CSS.escape(node.id)}"]`)){article.style.left=`${node.x}px`;article.style.top=`${node.y}px`;}}
 if(changed)drawEdges();
});
requestAnimationFrame(drift);
const zh=new URLSearchParams(location.search).get('lang')==='zh';
if(zh){document.documentElement.lang='zh-CN';host.setAttribute('aria-label','交互式思维导图');}
