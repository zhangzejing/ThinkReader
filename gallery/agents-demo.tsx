import React, {useEffect,useState} from '../app/desktop/node_modules/react';
import {createRoot} from '../app/desktop/node_modules/react-dom/client';
import {flushSync} from '../app/desktop/node_modules/react-dom';
import {AgentsPage} from '../app/desktop/src/features/collaboration/AgentsPage';
import {ConversationStream,ConversationActivity} from '../app/desktop/src/features/collaboration/ConversationStream';
import {InstructionComposer} from '../app/desktop/src/components/InstructionComposer';
import {MessageMarkdown} from '../app/desktop/src/components/MessageMarkdown';
import {AgentAvatar,UserAvatar} from '../app/desktop/src/components/AgentBrandIcon';
import {useMessageDrag} from '../app/desktop/src/features/collaboration/useMessageDrag';
import {api} from '../app/desktop/src/api';
import {setLanguage} from '../app/desktop/src/shared/locale';
import type {Actor,Project,Quote,Task,HarnessStatus} from '../app/desktop/src/types';
import '../app/desktop/src/shared/theme/index.css';
import '../app/desktop/src/styles/app.css';
import '../app/desktop/src/shared/theme/collaboration.css';
setLanguage('en-US');
const query=new URLSearchParams(location.search),pane=query.has('pane'),attention=query.get('paper')==='attention';
Object.assign(document.documentElement.dataset,{theme:'light',palette:'afterglow'});
const channel:Project={id:'gallery-demo',hash_id:'demo',name:attention?'Attention Is All You Need':'Explainable ENSO',description:'Read the source. Compare the evidence.',visibility:'library',papers:[],kind:'channel'};
const actors:Actor[]=['Researcher','Reviewer','Coder','Writer'].map((name,n)=>({id:name,hash_id:name,kind:n?'agent':'user',name,instruction:'',harness:n===1?'cursor':n===3?'claude':'codex',model:'',description:'',avatar:'',projects:[channel.id]}));
const runtimes:HarnessStatus[]=actors.filter(a=>a.kind==='agent').map(a=>({name:a.harness,harness:a.harness,ready:true,available:true} as HarnessStatus));
const post=(data:object)=>parent.postMessage(data,location.origin);
// This isolated iframe never sends an instruction or configuration write to a backend.
const fetchAsset=window.fetch.bind(window);
window.fetch=(input,init)=>{const url=new URL(typeof input==='string'?input:input instanceof Request?input.url:input.href,location.href);return url.pathname.startsWith('/api/')?Promise.resolve(new Response(JSON.stringify({error:'This control is not connected in the gallery demo.'}),{status:403,headers:{'content-type':'application/json'}})):fetchAsset(input,init);};
api.agentGroups=async()=>({groups:[]});
api.instructions=async(text)=>{post({type:'demo-submit',text});return {warnings:[],tasks:[]} as Awaited<ReturnType<typeof api.instructions>>;};
type Entry={id:string;actor:string;text:string;action?:boolean;working?:boolean;image?:string};
function App(){
 const startMessageDrag=useMessageDrag();
 const [messages,setMessages]=useState<Entry[]>([]),[project,setProject]=useState(channel.id),[notice,setNotice]=useState(''),[quotes,setQuotes]=useState<Quote[]>([]);
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==parent)return;const data=event.data;
   if(data?.type==='demo-handshake')post({type:'demo-agent-ready'});
   if(data?.type==='demo-playback')document.getAnimations().forEach(animation=>data.paused?animation.pause():animation.play());
   if(data?.type==='demo-reset'){setMessages([]);setNotice('');setQuotes([]);}
   if(data?.type==='demo-message'&&data.actor==='Researcher'&&data.image)setQuotes([]);
   if(data?.type==='demo-message')setMessages(current=>{const found=current.some(m=>m.id===data.id);return found?current.map(m=>m.id===data.id?{...m,...data}:m):[...current,data];});
   if(data?.type==='demo-draft'){const input=document.querySelector<HTMLTextAreaElement>('.composer-text-field textarea');if(input){Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')!.set!.call(input,data.text);input.dispatchEvent(new Event('input',{bubbles:true}));}}
  };window.addEventListener('message',receive);post({type:'demo-agent-ready'});return()=>window.removeEventListener('message',receive);
 },[]);
 api.inbox=async()=>({events:messages.filter(m=>!m.working).map((m,n)=>({id:m.id,kind:m.actor==='Researcher'?'instruction':'task_result',actor_id:m.actor,project:channel.id,paper_id:'',created_at:Math.floor(Date.now()/1000)+n,payload:m.actor==='Researcher'?{text:m.text}:{result:m.text,status:'done',task_id:m.id}}))});
 const tasks=messages.filter(m=>m.actor!=='Researcher').map(m=>({id:m.id,assignee:m.actor,project:channel.id,status:m.working?'running':'done',result:m.text,command:'',created_at:Math.floor(Date.now()/1000),streaming_text:m.text,operations:[],requests:[]} as unknown as Task));
 const conversation=(intro:React.ReactNode)=><section className="conversation-panel" onPointerDown={()=>post({type:'demo-interaction'})}>
  <ConversationStream scope="gallery-demo">{!messages.length?intro:null}{messages.map(message=>{const actor=actors.find(a=>a.name===message.actor)||actors[1];return message.working?<ConversationActivity key={message.id} tasks={tasks.filter(t=>t.id===message.id)} events={[]} actors={actors} onCancel={()=>{setMessages(current=>current.map(m=>m.working?{...m,working:false,text:'Stopped.'}:m));post({type:'demo-cancel'});}} onRetry={()=>{}} onNotice={setNotice}/>:<article key={message.id} data-message-id={message.id} className={`conversation-message is-${actor.kind==='user'?'instruction':'task_result'}${message.action?' is-draggable-result':''}`} draggable={message.action} onDragStart={event=>{post({type:'demo-interaction'});startMessageDrag(event,{taskId:message.id,actorId:actor.id,body:message.text});}}>
   <div className="conversation-avatar">{actor.kind==='agent'?<AgentAvatar harness={actor.harness} interactive={false}/>:<UserAvatar name={actor.name}/>}</div><div className="conversation-message-body"><header><strong>{actor.name}</strong><time>09:41</time>{message.working?<small>Working…</small>:null}</header><MessageMarkdown body={message.text}/>{message.image?<img className="demo-figure-quote" src={message.image} alt="Figure 1 · Transformer architecture, page 3"/>:null}</div>
  </article>;})}</ConversationStream>
  {notice?<small className="demo-notice" role="status">{notice}</small>:null}
  <InstructionComposer activeAgentName={query.get('agent')||'Reviewer'} commands={[{id:query.get('command')||'annotation',name:query.get('command')||'annotation',description:query.has('command')?'Build a reproduction starter project':'Annotate the paper',source:'system'}]} agents={actors.filter(a=>a.kind==='agent')} projectId={project} paperId="" draftScope="gallery" quotes={quotes} editMessage={null} onAddQuote={quote=>{post({type:'demo-interaction'});setQuotes(current=>[...current,{...quote,id:`quote-${Date.now()}`}]);}} onRemoveQuote={id=>setQuotes(current=>current.filter(q=>q.id!==id))} onSaveEdit={async()=>{}} onCancelEdit={()=>{}} onSubmitted={()=>setQuotes([])} onNotice={setNotice}/>
 </section>;
 return pane?<div className="demo-pane"><div className="demo-pane-title">Agents</div>{conversation(null)}</div>:<AgentsPage library={channel.name} libraryRoot="" paneId="primary" conversation={conversation} actors={actors} projects={[channel]} tasks={tasks} harnesses={runtimes} projectId={project} requestedProfile="" onProfileHandled={()=>{}} onConversation={setProject} onReload={async()=>{}} onNotice={setNotice} onSettings={()=>setNotice('Settings are available in ThinkReader.')}/>;
}
document.querySelector('#root')!.classList.add('app-shell');
flushSync(()=>createRoot(document.querySelector('#root')!).render(<App/>));
