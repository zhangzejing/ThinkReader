// Real-browser acceptance: node test-gallery.mjs [CDP port] [gallery URL]
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const host=`http://127.0.0.1:${process.argv[2]||8872}`;
const url=process.argv[3]||'http://127.0.0.1:3000/';
const target=await(await fetch(`${host}/json/new?${encodeURIComponent(url)}`,{method:'PUT'})).json();
const socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map(),errors=[];let id=0;
await new Promise(resolve=>socket.onopen=resolve);
socket.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);};
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,r=>r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result));socket.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(expression){for(let n=0;n<100;n++){if(await evaluate(`Boolean(${expression})`))return;await wait(150);}throw Error(`Timed out: ${expression}`);}
try{
 await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await until('document.querySelector("#attention")');
 await evaluate('document.querySelector("#attention").scrollIntoView()');
 await until('document.querySelector("#attention .command-preview[data-active] .live-preview iframe")?.contentWindow?.galleryApply');
 await evaluate(`window.master=()=>document.querySelector('#attention .workflow-large:not([hidden]) iframe');window.mirror=()=>document.querySelector('#attention .command-preview[data-active] .live-preview iframe')`);
 await until('master()?.contentWindow?.galleryRead');
 await wait(1200);
 assert(await evaluate('Math.abs(master().contentWindow.galleryRead().note-mirror().contentWindow.galleryRead().note)<4'),'Summary scrolling is synchronized');
 await evaluate('document.querySelector("#attention .command-preview:nth-child(2)").click()');
 await until('mirror()?.contentWindow?.galleryApply&&master()?.contentWindow?.galleryRead');await wait(600);
 assert(await evaluate('Math.abs(master().contentWindow.galleryRead().x-mirror().contentWindow.galleryRead().x)<3'),'Mindmap view is synchronized');
 await evaluate('window.savedMap=master();window.savedPreview=mirror();window.savedView=mirror().contentWindow.galleryRead().x');
 await evaluate('document.querySelector("#attention .command-preview:nth-child(3)").click()');
 await wait(500);
 assert(await evaluate('savedPreview.isConnected&&savedPreview.contentWindow.galleryRead().x===savedView'),'Inactive preview keeps its last frame');
 await until('mirror()?.contentWindow?.galleryApply&&master()?.contentWindow?.galleryRead');
 await until('master().contentWindow.galleryRead().draft.startsWith("@Coder")');await wait(300);
 assert(await evaluate('Math.abs(master().contentWindow.galleryRead().draft.length-mirror().contentWindow.galleryRead().draft.length)<=1'),'Agent typing is synchronized');
 await until('master().contentWindow.galleryRead().messages.length===2');await wait(300);
 assert(await evaluate('JSON.stringify(master().contentWindow.galleryRead().messages)===JSON.stringify(mirror().contentWindow.galleryRead().messages)'),'Agent execution is synchronized');
 await evaluate('document.querySelector("#attention .command-preview:nth-child(4)").click()');await wait(500);
 assert(await evaluate('document.querySelector("#attention .command-preview[data-active] .live-preview").style.backgroundImage.includes("continuous.webp")'),'Slides use the same moving canvas');
 await evaluate('document.querySelector("#attention .command-preview:nth-child(2)").click()');
 await wait(300);assert(await evaluate('master()===savedMap&&mirror()===savedPreview'),'Re-selection reuses the same reader and preview');
 await evaluate('document.querySelector("#attention .command-preview:nth-child(4)").click()');
 await wait(300);
 assert(await evaluate('!document.querySelector("#attention .workflow-large:not([hidden]) .slide-overview").style.backgroundPosition.includes("NaN")'),'Slides retain valid coordinates when reopened');
 await wait(26000);
 assert.equal(await evaluate('document.querySelector("#attention .command-preview[data-active] strong").textContent'),'/summary','The previews automatically cycle');
 const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile('../build/gallery-live-preview.png',Buffer.from(shot.data,'base64'));
 assert.deepEqual(errors,[]);console.log('PASS: synchronized summary, mindmap, codebase and slides; automatic command rotation');
}finally{socket.close();await fetch(`${host}/json/close/${target.id}`);}
