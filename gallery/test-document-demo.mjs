// Run with the gallery server and a Chromium debugging port: node test-document-demo.mjs 8873
import assert from 'node:assert/strict';
const host=`http://127.0.0.1:${process.argv[2]||8873}`;
const base=process.argv[3]||'http://127.0.0.1:3001/ThinkReader/';
const target=await(await fetch(`${host}/json/new?${encodeURIComponent(new URL('documents/xro-summary.html',base).href)}`,{method:'PUT'})).json();
const socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map();let id=0;
await new Promise(resolve=>socket.onopen=resolve);
socket.onmessage=event=>{const message=JSON.parse(event.data);if(message.id){pending.get(message.id)?.(message);pending.delete(message.id);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,result=>result.error?reject(Error(JSON.stringify(result.error))):resolve(result.result));socket.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 await send('Emulation.setDeviceMetricsOverride',{width:700,height:438,deviceScaleFactor:1,mobile:false});
 await send('Page.reload');
 for(let n=0;n<60&&!await evaluate('Boolean(document.querySelector("#note a.selected"))');n++)await wait(200);
 assert(await evaluate('Boolean(document.querySelector("#note a.selected"))'),'Initial source renders');
 assert.deepEqual(await evaluate('["note","source"].map(id=>getComputedStyle(document.getElementById(id)).scrollbarWidth)'),['none','none']);
 const width=await evaluate('document.querySelector("#source").clientWidth');
 assert.deepEqual(await evaluate('["source-wrap","source"].map(id=>getComputedStyle(document.getElementById(id)).backgroundColor)'),['rgb(255, 255, 255)','rgb(255, 255, 255)']);
 const initial=await evaluate('document.querySelector("#note a.selected").dataset.evidenceId');
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:-1,y:-1});
 let next='';
 for(let n=0;n<150;n++){await wait(200);next=await evaluate('document.querySelector("#note a.selected")?.dataset.evidenceId');if(next!==initial)break;}
 assert.notEqual(next,initial,'Demo advances to the next evidence link');
 assert(await evaluate('document.querySelector("#note").scrollTop>0'),'Note scrolls down');
 const jumpPosition=await evaluate('document.querySelector("#note").scrollTop');
 await wait(1000);
 assert(await evaluate('document.querySelector("#note").scrollTop')>jumpPosition+15,'Note keeps scrolling while the source changes');
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:200,y:200});
 await wait(150);
 const before=await evaluate('[document.querySelector("#note").scrollTop,document.querySelector("#note a.selected").dataset.evidenceId]');
 await wait(3500);
 assert.deepEqual(await evaluate('[document.querySelector("#note").scrollTop,document.querySelector("#note a.selected").dataset.evidenceId]'),before,'Hover pauses the demonstration');
 await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:200,y:200,deltaY:180,deltaX:0});await wait(200);
 assert(await evaluate('document.querySelector("#note").scrollTop')>before[0],'Hidden scrollbar still allows wheel scrolling');
 await evaluate('document.querySelectorAll("#note a[data-evidence-id]")[8].click()');await wait(1200);
 assert.equal(await evaluate('document.querySelector("#error")'),null,'Manual source jump succeeds');
 assert(Math.abs(await evaluate('document.querySelector("canvas").getBoundingClientRect().width')-width)<1,'Evidence jumps retain full-page width');
 assert.equal(await evaluate('document.querySelector("#source").scrollLeft'),0,'Evidence jumps do not shift the page horizontally');
 assert.notEqual(await evaluate('getComputedStyle(document.querySelector("#source-wrap")).boxShadow'),'none','Columns have a subtle shadow divider');
 const stopped=await evaluate('document.querySelector("#note").scrollTop');
 await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:-1,y:-1});await wait(800);
 assert(await evaluate('document.querySelector("#note").scrollTop')>stopped+10,'Pointer leave resumes immediately after clicking');
 console.log('PASS: full-page width, white background, shadow divider, hidden scrollbars, automatic scrolling/link sequence, hover pause, manual wheel and evidence jump');
}finally{socket.close();await fetch(`${host}/json/close/${target.id}`);}
