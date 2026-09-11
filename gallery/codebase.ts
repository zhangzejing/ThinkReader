import {galleryReady} from './ready';
import { setLanguage } from '../app/desktop/src/shared/locale';
import {isPreview,syncPreview} from './preview-sync';
import { renderMarkdown } from '../app/desktop/src/components/MessageMarkdown';

setLanguage(new URLSearchParams(location.search).get('lang')==='zh'?'zh-CN':'en-US');
const files:Record<string,string>=await(await fetch('attention-codebase.json')).json();
const note=document.querySelector<HTMLElement>('#note')!,agent=document.querySelector<HTMLIFrameElement>('.real-agents')!;
let running=false,manual=false,visible=false,hovered=false,agentReady=false,serial=0,epoch=0,draft='';
const messages=new Map<string,object>();let currentFile='README.md';
const post=(data:{type:string;id?:string;[key:string]:unknown})=>{if(data.type==='demo-reset')messages.clear();if(data.type==='demo-message'&&data.id)messages.set(data.id,{...messages.get(data.id),...data});agent.contentWindow?.postMessage(data,location.origin);};
const input={get value(){return draft;},set value(text:string){draft=text;post({type:'demo-draft',text});}};
window.addEventListener('message',event=>{if(event.source!==agent.contentWindow||event.origin!==location.origin)return;const data=event.data;
 if(data?.type==='demo-agent-ready'){agentReady=true;void galleryReady();}
 if(data?.type==='demo-interaction')manual=true;
 if(data?.type==='demo-submit'){manual=true;void run(data.text);}
 if(data?.type==='demo-cancel'){epoch++;running=false;manual=true;}
});
agent.onload=()=>post({type:'demo-handshake'});post({type:'demo-handshake'});
function openFile(name:string){
 currentFile=name;
 note.innerHTML=renderMarkdown(name.endsWith('.json')?'```json\n'+files[name]+'\n```':files[name]);note.scrollTop=0;
 document.querySelectorAll<HTMLButtonElement>('[data-file]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.file===name)));
}
for(const name of Object.keys(files)){
 const button=document.createElement('button');button.textContent=name;button.dataset.file=name;
 button.onclick=()=>{manual=true;openFile(name);};document.querySelector('#files')!.append(button);
}
function message(actor:string,text:string,working=false){const id=`codebase-${++serial}`;post({type:'demo-message',id,actor,text,working});return id;}
const wait=(ms:number)=>new Promise<void>(resolve=>{let elapsed=0,last=performance.now();function tick(now:number){if(visible&&!document.hidden)elapsed+=Math.min(50,now-last);last=now;if(elapsed>=ms)resolve();else requestAnimationFrame(tick);}requestAnimationFrame(tick);});
async function run(text:string,automatic=false){
 if(running||!text.trim())return;
 running=true;input.value='';const version=epoch;
 message('Researcher',text);
 const response=message('Coder','',true);
 const stages=['Reading the reproduction specification…','Checking the model, training recipe and acceptance targets…','Organizing the implementation steps…'];
 for(const stage of stages){
  post({type:'demo-message',id:response,text:stage,working:true});
  await wait(2300);if(version!==epoch)return;
 }
 const result=automatic
  ? 'Completed — the reproduction workspace is ready to explore. Start with the model specification, then follow the implementation checklist.'
  : 'Demo complete. In ThinkReader, Coder would continue this request with your configured runtime. Explore the existing specification and checklist on the left.';
 post({type:'demo-message',id:response,text:result,working:false});running=false;
}
note.onclick=event=>{const link=(event.target as Element).closest('a');if(link){event.preventDefault();link.animate([{background:'#cdb9eb80'},{background:'transparent'}],{duration:650});}};
new IntersectionObserver(([entry])=>visible=entry.isIntersecting).observe(document.body);
document.body.onpointerenter=()=>hovered=true;document.body.onpointerleave=()=>hovered=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let elapsed=0,previous=0,stage=0;
const command='@Coder /codebase Attention Is All You Need';
function animate(time:number){
 const delta=previous?Math.min(50,time-previous):0;previous=time;
 if(!isPreview&&visible&&agentReady&&!document.hidden&&(!hovered||stage<3)&&!manual&&!reduced.matches){
  elapsed+=delta;
  if(stage===0&&elapsed>1000){input.value=command.slice(0,Math.floor((elapsed-1000)/65));if(input.value===command){stage=1;elapsed=0;}}
  else if(stage===1&&elapsed>700){stage=2;elapsed=0;void run(command,true);}
  else if(stage===2&&!running&&elapsed>7500){openFile('SPEC.md');stage=3;elapsed=0;}
  else if(stage===3||stage===4){note.scrollTop+=delta*.025;if(elapsed>12500){if(stage===3){openFile('TODO.md');stage=4;}else{post({type:'demo-reset'});openFile('README.md');stage=0;}elapsed=0;}}
 }
 requestAnimationFrame(animate);
}
openFile('README.md');requestAnimationFrame(animate);
let mirrored='';
syncPreview(()=>({file:currentFile,scroll:note.scrollTop,draft,messages:[...messages.values()],chat:agent.contentDocument?.querySelector('.conversation-stream')?.scrollTop||0}),state=>{
 if(!agentReady)return;if(currentFile!==state.file)openFile(state.file);note.scrollTop=state.scroll;
 if(draft!==state.draft)input.value=state.draft;
 const next=JSON.stringify(state.messages);if(next!==mirrored){post({type:'demo-reset'});state.messages.forEach(message=>post(message as Parameters<typeof post>[0]));mirrored=next;}
 const stream=agent.contentDocument?.querySelector('.conversation-stream');if(stream)stream.scrollTop=state.chat;
});
