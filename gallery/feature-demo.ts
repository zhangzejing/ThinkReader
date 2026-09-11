import {galleryReady} from './ready';
import {mountCard,enableCardDrag,type DemoAnnotation} from './demo-annotation';
import {readAgentResultDrop} from '../app/desktop/src/features/collaboration/dragPayload';
import { getDocument, GlobalWorkerOptions } from '../app/desktop/node_modules/pdfjs-dist/build/pdf.mjs';
GlobalWorkerOptions.workerSrc=new URL('pdf.worker.min.mjs',location.href).href;
const requested=new URLSearchParams(location.search).get('mode');
const mode=requested==='card-conversation'?'conversation':requested==='multi-agent'?'multi-agent':'stream';
document.body.dataset.mode=mode;document.body.classList.add('pdf-reader');Object.assign(document.documentElement.dataset,{theme:'light',palette:'afterglow'});
const paper=document.querySelector<HTMLElement>('#paper')!,status=document.querySelector<HTMLElement>('#status')!;
const agent=document.createElement('iframe');agent.className='real-agents';agent.title='ThinkReader Agents';agent.src=`agents-demo.html?${mode==='multi-agent'?'':'pane=1&'}paper=${mode==='conversation'?'attention':'xro'}`;document.querySelector('#agent')!.replaceChildren(agent);
let agentReady=false,serial=0,draft='';
const send=(data:object)=>agent.contentWindow?.postMessage(data,location.origin);
const input={get value(){return draft;},set value(text:string){draft=text;send({type:'demo-draft',text});}};
const command=mode==='multi-agent'?'@Reviewer check the evidence; @Coder plan a reproduction; @Writer outline the findings.':mode==='conversation'?'@Reviewer Explain the masked attention block in Figure 1.':'@Reviewer /annotation';
const answer='Masked self-attention prevents the decoder from looking at future output tokens. The separate encoder–decoder attention block reads the encoder output.';
let visible=false,manual=false,busy=false,clock=0,previous=0,step=mode==='conversation'?-1:0,epoch=0,ready=false;let paused=false,autoDragging=false,figureImage='';
let marks:HTMLElement[]=[];let hidePreview=()=>{};const cardCleanup=new Map<HTMLElement,()=>void>();
const interactionShield=document.createElement('div');interactionShield.className='demo-interaction-shield';interactionShield.setAttribute('aria-hidden','true');document.body.append(interactionShield);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function message(actor:string,text:string,extra={}){const id=`message-${++serial}`;send({type:'demo-message',id,actor,text,...extra});return id;}
function update(id:string,text:string,extra={}){send({type:'demo-message',id,text,...extra});}
function history(){if(mode!=='conversation')return;message('Researcher','What connects the encoder and decoder in Figure 1?');message('Reviewer','The decoder’s middle attention block reads the encoder output. Masked self-attention controls which output positions the decoder may see.',{action:true});}
function reset(){setPaused(false);epoch++;busy=false;clock=0;step=mode==='conversation'?-1:0;autoDragging=false;document.querySelectorAll('.message-card-drag-ghost,.pdf-card-drag-ghost,.demo-cursor').forEach(node=>node.remove());send({type:'demo-reset'});input.value='';marks.forEach(m=>m.classList.remove('drawn','is-selected'));hidePreview();for(const card of paper.querySelectorAll<HTMLElement>('.fixed-card.new')){cardCleanup.get(card)?.();cardCleanup.delete(card);card.remove();}paper.scrollTop=0;status.textContent='Demo';history();}
window.addEventListener('message',event=>{if(event.source!==agent.contentWindow||event.origin!==location.origin)return;if(event.data?.type==='demo-agent-ready'){agentReady=true;history();}if(event.data?.type==='demo-submit'){manual=true;void run(event.data.text);}if(event.data?.type==='demo-interaction'&&!autoDragging)manual=true;if(event.data?.type==='demo-cancel'){epoch++;busy=false;manual=true;status.textContent='Demo · stopped';}});
const wait=(ms:number)=>new Promise<void>(resolve=>{let elapsed=0,last=performance.now();function tick(now:number){if(!paused&&!document.hidden)elapsed+=Math.min(50,now-last);last=now;if(elapsed>=ms*1.7)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);});
async function pause(ms:number,version:number){await wait(ms);return version===epoch;}
async function run(text:string){
 if(busy||!text.trim())return;busy=true;input.value='';const version=epoch;
 message('Researcher',text,mode==='conversation'?{image:figureImage}:{});status.textContent='Demo · working';
 if(mode==='multi-agent'){
  const tasks=[['Reviewer','Checking the abstract and forecast results','**Completed — evidence checked.** XRO forecasts extend to 16–18 months. Predictive skill and causal interpretation are distinguished in the review.'],['Coder','Mapping the XRO model and validation steps','**Completed — reproduction plan ready.** Model equations, climate-mode inputs and the hindcast evaluation protocol are organized into an implementation checklist.'],['Writer','Organizing the source-linked findings','**Completed — outline ready.** Background → mechanism → forecast evidence → limitations. The report structure is ready for your edits.']];
  const cards=tasks.map(([actor,title])=>message(actor,title+'…',{working:true}));
  for(let n=0;n<tasks.length;n++){if(!await pause(1600,version))return;update(cards[n],tasks[n][2],{working:false});}
 }else if(mode==='conversation'){
  if(!await pause(1000,version))return;
  const response=message('Reviewer','Reading the cited passage…',{working:true});
  if(!await pause(1500,version))return;update(response,answer,{working:false,action:true});
  if(!manual&&await pause(1400,version))await demonstrateDrag(false,version,response);
 }else{
  const response=message('Reviewer','Reading the source and annotating the argument…',{working:true});
  for(const id of new Set(marks.map(mark=>mark.dataset.annotationId))){if(!await pause(1100,version))return;marks.filter(mark=>mark.dataset.annotationId===id).forEach(mark=>mark.classList.add('drawn'));}
  update(response,'Completed — five annotations added to the abstract: background, problem, results, method and contribution. Hover a mark to read its card.',{working:false});
  if(!manual)await demonstrateHover(version);
 }
 if(version!==epoch)return;busy=false;clock=0;status.textContent='Demo · complete';
}
function addCard(annotation:DemoAnnotation,y:number,isNew=false){
 const existing=[...paper.querySelectorAll<HTMLElement>('.fixed-card')].find(card=>card.dataset.annotationId===annotation.id);if(existing)return existing;
 const card=document.createElement('div');card.dataset.annotationId=annotation.id;card.className=`fixed-card${isNew?' new':''}`;card.style.top=`${y}px`;paper.append(card);
 cardCleanup.set(card,mountCard(card,annotation,()=>{manual=true;cardCleanup.get(card)?.();cardCleanup.delete(card);card.remove();},true));card.style.top=`${Math.max(8,Math.min(y,paper.clientHeight-card.offsetHeight-12+paper.scrollTop))}px`;enableCardDrag(card,annotation,()=>{if(!autoDragging)manual=true;});if(isNew){const anchor=paper.querySelector<HTMLElement>('.figure-anchor:last-child');card.onpointerenter=()=>anchor?.classList.add('is-coupled');card.onpointerleave=()=>anchor?.classList.remove('is-coupled');}return card;
}
function setPaused(value:boolean){paused=value;interactionShield.hidden=paused;document.querySelector('main')!.inert=!paused;const button=document.querySelector<HTMLButtonElement>('#pause')!;button.setAttribute('aria-label',paused?'Resume demo':'Pause demo');button.innerHTML=paused?'<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7Z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>';document.getAnimations().forEach(animation=>paused?animation.pause():animation.play());send({type:'demo-playback',paused});}
document.querySelector<HTMLButtonElement>('#pause')!.onclick=()=>setPaused(!paused);
setPaused(false);
document.querySelector<HTMLButtonElement>('#replay')!.onclick=()=>{manual=false;reset();};
document.querySelector('#cite')?.remove();
paper.ondragover=event=>{if(event.dataTransfer?.types.includes('application/x-thinkreader-agent-result')){event.preventDefault();paper.classList.add('is-drop-target');}};
paper.ondragleave=()=>paper.classList.remove('is-drop-target');
paper.ondrop=event=>{paper.classList.remove('is-drop-target');const result=event.dataTransfer&&readAgentResultDrop(event.dataTransfer);if(!result)return;event.preventDefault();if(!autoDragging)manual=true;const box=paper.getBoundingClientRect();addCard({id:`answer-${++serial}`,title:'',body:result.body,rects:[[.320261,.088384,.676471,.497475]],color:'blue',page:3},Math.max(8,event.clientY-box.top+paper.scrollTop),true);};
new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(document.body);
async function loadPaper(){
 const attention=mode==='conversation';
 const pdf=await getDocument({url:`${attention?'attention/3':'xro/1'}.pdf`}).promise,page=await pdf.getPage(1),base=page.getViewport({scale:1});
 // Render the original PDF page, including its own title and page margins.
 const crop=[0,0,1,1],width=1200,scale=width/(base.width*(crop[2]-crop[0])),viewport=page.getViewport({scale});
 const canvas=document.querySelector<HTMLCanvasElement>('canvas')!,height=base.height*(crop[3]-crop[1])*scale;
 canvas.width=width;canvas.height=height;
 await page.render({canvasContext:canvas.getContext('2d')!,viewport,transform:[1,0,0,1,-crop[0]*viewport.width,-crop[1]*viewport.height]}).promise;
 if(attention){
  const region=[.320261,.088384,.676471,.497475];
  const figure=document.createElement('canvas');figure.width=(region[2]-region[0])*viewport.width;figure.height=(region[3]-region[1])*viewport.height;
  figure.getContext('2d')!.drawImage(canvas,(region[0]-crop[0])*viewport.width,(region[1]-crop[1])*viewport.height,figure.width,figure.height,0,0,figure.width,figure.height);figureImage=figure.toDataURL('image/png');
  [['Encoder','The encoder output supplies keys and values to the decoder’s cross-attention block.'],['Masked attention','The decoder must not attend to future output positions.']].forEach(([title,body],n)=>{
   const rect=[...region];
   const annotation={id:`attention-${n}`,title,body,rects:[rect],color:n?'cyan':'green',page:3};const card=addCard(annotation,8+n*145);
   const mark=(document.querySelector<HTMLButtonElement>('.figure-anchor')||document.createElement('button'));mark.className=`figure-anchor is-color-${annotation.color}`;mark.setAttribute('aria-label',`${title} · Figure 1`);Object.assign(mark.style,{left:`${(rect[0]-crop[0])/(crop[2]-crop[0])*100}%`,top:`${(rect[1]-crop[1])/(crop[3]-crop[1])*100}%`,width:`${(rect[2]-rect[0])/(crop[2]-crop[0])*100}%`,height:`${(rect[3]-rect[1])/(crop[3]-crop[1])*100}%`});
   mark.onclick=()=>{manual=true;card.classList.toggle('is-selected');mark.classList.toggle('is-selected');};card.onpointerenter=()=>mark.classList.add('is-coupled');card.onpointerleave=()=>mark.classList.remove('is-coupled');if(!mark.isConnected)document.querySelector('#excerpt')!.append(mark);
  });ready=true;return;
 }
 const annotations=await(await fetch('feature-annotations.json')).json() as DemoAnnotation[];
 const popover=document.createElement('aside');popover.className='annotation-popover';popover.hidden=true;popover.setAttribute('role','tooltip');document.body.append(popover);
 let disposePreview=()=>{},closeTimer=0;
 hidePreview=()=>{clearTimeout(closeTimer);popover.hidden=true;marks.forEach(mark=>mark.classList.remove('is-coupled'));};
 const scheduleClose=()=>{closeTimer=window.setTimeout(hidePreview,90);};
 popover.onpointerenter=()=>clearTimeout(closeTimer);popover.onpointerleave=scheduleClose;
 function preview(mark:HTMLElement,annotation:DemoAnnotation){
  clearTimeout(closeTimer);disposePreview();disposePreview=mountCard(popover,annotation,()=>{manual=true;addCard(annotation,Math.max(8,mark.getBoundingClientRect().top-paper.getBoundingClientRect().top+paper.scrollTop));hidePreview();});popover.hidden=false;
  marks.forEach(row=>row.classList.toggle('is-coupled',row.dataset.annotationId===annotation.id));
  const box=mark.getBoundingClientRect();Object.assign(popover.style,{left:`${Math.max(8,box.left-230)}px`,top:`${Math.max(8,Math.min(innerHeight-popover.offsetHeight-8,box.top))}px`});
 }
 marks=annotations.flatMap(annotation=>{
  const rows=annotation.rects;
  return rows.map(([x1,y1,x2,y2])=>{const mark=document.createElement('button');mark.className=`inline-mark pdf-mark is-highlight is-color-${annotation.color}`;mark.dataset.annotationId=annotation.id;mark.setAttribute('aria-label',annotation.title);Object.assign(mark.style,{left:`${(x1-crop[0])/(crop[2]-crop[0])*100}%`,top:`${(y1-crop[1])/(crop[3]-crop[1])*100}%`,width:`${(x2-x1)/(crop[2]-crop[0])*100}%`,height:`${(y2-y1)/(crop[3]-crop[1])*100}%`});mark.onpointerenter=()=>preview(mark,annotation);mark.onpointerleave=scheduleClose;mark.onfocus=()=>preview(mark,annotation);mark.onblur=scheduleClose;mark.onclick=()=>{manual=true;marks.forEach(m=>m.classList.toggle('is-selected',m.dataset.annotationId===annotation.id));preview(mark,annotation);};document.querySelector('#excerpt')!.append(mark);return mark;});
 });
 ready=true;
}
if(mode==='multi-agent')ready=true;else void loadPaper().catch(()=>{status.textContent='Source unavailable';const retry=document.createElement('button');retry.textContent='Reload source';retry.onclick=()=>location.reload();paper.append(retry);});
async function demonstrateHover(version:number){
 const cursor=document.createElement('div');cursor.className='demo-cursor';cursor.innerHTML='<svg viewBox="0 0 24 28"><path d="M2 2v22l6-6 5 8 4-2-5-8h9Z"/></svg>';document.body.append(cursor);let x=20,y=20;
 for(const id of new Set(marks.map(mark=>mark.dataset.annotationId))){
  if(version!==epoch||manual)break;
  const mark=marks.find(mark=>mark.dataset.annotationId===id)!,box=mark.getBoundingClientRect(),nextX=box.left+Math.min(30,box.width/2),nextY=box.top+box.height/2;
  const move=cursor.animate([{transform:`translate(${x}px,${y}px)`},{transform:`translate(${nextX}px,${nextY}px)`}],{duration:750,easing:'ease-in-out',fill:'forwards'});if(paused)move.pause();await move.finished.catch(()=>{});
  if(version!==epoch||manual)break;mark.dispatchEvent(new PointerEvent('pointerenter'));await wait(1800);mark.dispatchEvent(new PointerEvent('pointerleave'));x=nextX;y=nextY;
 }
 cursor.remove();hidePreview();
}
async function demonstrateDrag(toChat:boolean,version:number,messageId?:string){
 const doc=agent.contentDocument!;const source=toChat?paper.querySelector<HTMLElement>('.fixed-card')!:doc.querySelector<HTMLElement>(`.is-draggable-result[data-message-id="${CSS.escape(messageId||'')}"]`)!;if(!source)return;
 autoDragging=true;
 if(!toChat){const stream=doc.querySelector<HTMLElement>('.conversation-stream')!;stream.scrollTo({top:stream.scrollTop+source.getBoundingClientRect().top-stream.getBoundingClientRect().top-24});if(!await pause(400,version)){autoDragging=false;return;}}
 const frame=agent.getBoundingClientRect(),box=source.getBoundingClientRect(),target=toChat?doc.querySelector('.composer-wrap')!.getBoundingClientRect():paper.getBoundingClientRect();
 const from={x:box.left+(toChat?0:frame.left)+16,y:box.top+(toChat?0:frame.top)+16},to={x:toChat?frame.left+target.left+28:target.left+24,y:toChat?frame.top+target.top+31:target.top+298};
 const cursor=document.createElement('div');cursor.className='demo-cursor';cursor.innerHTML='<svg viewBox="0 0 24 28"><path d="M2 2v22l6-6 5 8 4-2-5-8h9Z"/></svg>';document.body.append(cursor);
 const transfer=new DataTransfer();let ghost:HTMLElement|null=null;
 const move=(start:{x:number;y:number},end:{x:number;y:number},duration:number)=>new Promise<void>(resolve=>{let elapsed=0,last=performance.now();function tick(now:number){if(version!==epoch){resolve();return;}if(!paused&&!document.hidden)elapsed+=Math.min(50,now-last);last=now;const t=Math.min(1,elapsed/duration),x=start.x+(end.x-start.x)*t,y=start.y+(end.y-start.y)*t;cursor.style.transform=`translate(${x}px,${y}px)`;if(ghost){ghost.style.left=`${x-16}px`;ghost.style.top=`${y-16}px`;}if(t===1)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);});
 try{
  await move({x:toChat?from.x+80:frame.right-35,y:toChat?from.y+70:frame.bottom-55},from,800);if(version!==epoch)return;
  source.dispatchEvent(new DragEvent('dragstart',{dataTransfer:transfer,bubbles:true,clientX:box.left+16,clientY:box.top+16}));
  if(toChat){ghost=source.querySelector<HTMLElement>('.pdf-mark-hover-card')!.cloneNode(true) as HTMLElement;ghost.classList.add('pdf-card-drag-ghost');ghost.style.width=`${box.width}px`;source.classList.add('has-drag-ghost');}
  else ghost=doc.querySelector<HTMLElement>('.message-card-drag-ghost');
  if(!ghost)return;
  // The App creates the preview; only the simulated pointer crosses the demo iframe.
  document.body.append(ghost);ghost.style.left=`${from.x-16}px`;ghost.style.top=`${from.y-16}px`;
  if(!await pause(300,version))return;
  await move(from,to,2200);if(version!==epoch)return;
  (toChat?doc.querySelector('.composer-wrap')!:paper).dispatchEvent(new DragEvent('drop',{dataTransfer:transfer,bubbles:true,cancelable:true,clientX:to.x-16,clientY:to.y-16}));await wait(150);
 }finally{source.dispatchEvent(new DragEvent('dragend',{dataTransfer:transfer,bubbles:true}));source.classList.remove('has-drag-ghost');ghost?.remove();cursor.remove();autoDragging=false;}
}
let revealed=false;
function animate(time:number){if(ready&&agentReady&&!revealed){revealed=true;void galleryReady();}const delta=previous?Math.min(50,time-previous):0;previous=time;
 if(visible&&ready&&agentReady&&!paused&&!manual&&!document.hidden&&!reduced.matches){clock+=delta;
  if(step===-1&&clock>1200){step=-2;void demonstrateDrag(true,epoch).then(()=>{if(step===-2){step=0;clock=0;}});}
  else if(step===0&&clock>900){input.value=command.slice(0,Math.floor((clock-900)/65));if(input.value===command){step=1;clock=0;}}
  else if(step===1&&clock>1200){step=2;clock=0;if(mode==='conversation'){marks.slice(0,3).forEach(m=>m.classList.add('drawn'));}void run(command);}
  else if(step===2&&!busy&&clock>30000)reset();
 }
 requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
