// Cold-load acceptance: node test-loading.mjs [CDP port] [URL] [baseline]
import assert from 'node:assert/strict';
const host=`http://127.0.0.1:${process.argv[2]||8873}`,url=process.argv[3]||'http://127.0.0.1:3001/ThinkReader/';
const baseline=process.argv[4]==='baseline';
const target=await(await fetch(`${host}/json/new?about:blank`,{method:'PUT'})).json();
const socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map(),requests=new Map();let id=0;
await new Promise(resolve=>socket.onopen=resolve);
socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Network.responseReceived')requests.set(m.params.requestId,{url:m.params.response.url,bytes:0});if(m.method==='Network.loadingFinished'){const request=requests.get(m.params.requestId);if(request)request.bytes=m.params.encodedDataLength;}};
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,r=>r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result));socket.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(expression){for(let n=0;n<200;n++){if(await evaluate(`Boolean(${expression})`))return;await wait(150);}throw Error(`Timed out: ${expression}`);}
try{
 await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url});
 await until('document.querySelector("#stream iframe")?.contentDocument?.querySelector(".real-agents")?.contentDocument?.querySelector("textarea")');
 await wait(8000);
 const resources=[...requests.values()];
 console.log(JSON.stringify({mode:baseline?'baseline':'optimized',requests:resources.length,bytes:resources.reduce((n,r)=>n+r.bytes,0),largest:resources.sort((a,b)=>b.bytes-a.bytes).slice(0,8)},null,2));
 if(!baseline){
  assert(!resources.some(r=>/SourceHanSansCN-VF/.test(r.url)),'Full CJK font must not load in the English demos');
  assert(!resources.some(r=>/\/atlases\/|\/mindmaps\/|attention-summary\.html|xro-summary\.html|mode=multi-agent|mode=card-conversation/.test(r.url)),'Offscreen readers must not compete with the first demo');
  await until('document.querySelector("#stream .loading-frame")?.getAttribute("aria-busy")==="false"');
  assert.equal(await evaluate('document.querySelector("#stream iframe").style.opacity'),'1');
  await evaluate('document.querySelector("#attention").scrollIntoView()');
  await until('document.querySelector("#attention .workflow-large iframe")?.contentWindow?.galleryRead');
  await until('document.querySelector("#attention .live-preview iframe")?.contentWindow?.galleryApply');
  await evaluate('document.querySelector(".atlas-separated").scrollIntoView()');
  await until('document.querySelector(".atlas-graph").contentDocument?.querySelector("#graph")?._cyreg?.cy?.nodes().length>0');
  await until('document.querySelector(".atlas-note").contentDocument?.querySelector("#note h1")');
  console.log('PASS: deferred readers load on approach; preview synchronization and Wiki note load remain available');
 }
}finally{socket.close();await fetch(`${host}/json/close/${target.id}`);}
