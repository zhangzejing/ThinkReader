// Run against the release preview: node test-feature-demos.mjs [CDP port]
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const host=`http://127.0.0.1:${process.argv[2]||8872}`,base='http://127.0.0.1:3001/ThinkReader/';
const target=await(await fetch(`${host}/json/new?${base}`,{method:'PUT'})).json();
const ws=new WebSocket(target.webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map(),errors=[];
ws.onmessage=event=>{const m=JSON.parse(event.data);if(m.id){pending.get(m.id)(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);};
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,r=>r.error?reject(Error(JSON.stringify(r.error))):resolve(r.result));ws.send(JSON.stringify({id:key,method,params}));});
const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(expression){for(let n=0;n<420;n++){if(await evaluate(`Boolean(${expression})`))return;await wait(150);}throw Error(`Timed out: ${expression}; ${JSON.stringify(errors)}; ${await evaluate('document.body.innerText')}`);}
try{
 await send('Runtime.enable');await send('Emulation.setDeviceMetricsOverride',{width:760,height:490,deviceScaleFactor:1,mobile:false});
 for(const mode of ['annotation-stream','multi-agent','card-conversation'].filter(mode=>!process.argv[3]||mode===process.argv[3])){
  await send('Page.navigate',{url:`${base}documents/feature-demo.html?mode=${mode}`});
  await until('document.querySelector(".real-agents")?.contentDocument?.querySelector("textarea")?.value.length>12');
  assert(await evaluate('document.querySelector("main").inert&&document.elementFromPoint(150,150).classList.contains("demo-interaction-shield")'),'Playback blocks real pointer input');
  await evaluate('document.querySelector("#pause").click()');
  assert(await evaluate('!document.querySelector("main").inert&&document.querySelector(".demo-interaction-shield").hidden'),'Pause restores pointer and keyboard interaction');
  const pausedDraft=await evaluate('document.querySelector(".real-agents").contentDocument.querySelector("textarea").value');await wait(400);assert.equal(await evaluate('document.querySelector(".real-agents").contentDocument.querySelector("textarea").value'),pausedDraft);
  await evaluate('document.querySelector("#pause").click()');
  await until('!!document.querySelector(".real-agents")?.contentDocument?.querySelector(".composer-operation-spinner")');
  if(mode==='card-conversation')await until('document.querySelector(".demo-cursor")&&document.querySelector(".real-agents").contentDocument.querySelector(".is-draggable-result.is-dragging")');
  if(mode==='card-conversation'){await until('document.querySelector(".message-card-drag-ghost .message-markdown")');assert(await evaluate('document.querySelector(".message-card-drag-ghost .message-markdown").textContent.trim()===[...document.querySelector(".real-agents").contentDocument.querySelectorAll(".is-draggable-result .message-markdown")].at(-1).textContent.trim()'),'Dragged preview contains the complete latest answer');}
  if(mode==='annotation-stream')await until('document.querySelector(".demo-cursor")&&!document.querySelector(".annotation-popover").hidden');
  await until('document.querySelector("#status")?.textContent==="Demo · complete"');
  assert(await evaluate('document.querySelector("main").inert'),'Resume restores the playback input lock');
  await evaluate('document.querySelector("#pause").click()');
  assert(await evaluate('!document.querySelector("body > header, .paper-title")'), 'No extra title or page row');
  if(mode==='annotation-stream'){
   const count=await evaluate('new Set([...document.querySelectorAll(".inline-mark.drawn")].map(m=>m.dataset.annotationId)).size');assert.equal(count,5,'Five distinct original annotation cards');
   await evaluate(`document.querySelector('.inline-mark').dispatchEvent(new PointerEvent('pointerenter'))`);
   assert(await evaluate('!document.querySelector(".annotation-popover").hidden&&document.querySelector(".annotation-popover").textContent.includes("ENSO")'));
   await evaluate(`document.querySelector('.inline-mark').dispatchEvent(new PointerEvent('pointerleave'))`);
  }
  if(mode==='multi-agent'){assert(await evaluate('!!document.querySelector(".real-agents").contentDocument.querySelector(".agents-page")'));assert.equal(await evaluate('document.querySelector(".real-agents").contentDocument.querySelectorAll(".conversation-message").length'),4);}
  if(mode==='card-conversation'){
   assert.equal(await evaluate('document.querySelectorAll(".fixed-card").length'),3,'The automatic round trip creates an anchored card');
   assert.equal(await evaluate('document.querySelectorAll(".figure-anchor").length'),1);
   assert(await evaluate('document.querySelector(".fixed-card.new .pdf-canvas-card-body").textContent.trim()===[...document.querySelector(".real-agents").contentDocument.querySelectorAll(".is-draggable-result .message-markdown")].at(-1).textContent.trim()'),'Dropped card exactly matches the latest answer');
   assert(await evaluate('document.querySelector(".fixed-card.new").getBoundingClientRect().bottom<=document.querySelector("#paper").getBoundingClientRect().bottom'),'Returned card stays inside the reader');
   assert(await evaluate('!document.querySelector(".real-agents").contentDocument.querySelector(".context-bubble")'),'Sending clears the composer citation');
   assert(await evaluate('!!document.querySelector(".real-agents").contentDocument.querySelector(".demo-figure-quote")'));
   await evaluate('document.querySelector(".fixed-card.new .pdf-mark-hover-pin").click()');
   assert(await evaluate('!document.querySelector(".fixed-card.new")&&!document.querySelector(".real-agents").contentDocument.querySelector(".demo-keep")'));
   await evaluate(`(()=>{const frame=document.querySelector('.real-agents'),data=new DataTransfer();document.querySelector('.fixed-card').dispatchEvent(new DragEvent('dragstart',{dataTransfer:data,bubbles:true}));frame.contentDocument.querySelector('.composer-wrap').dispatchEvent(new frame.contentWindow.DragEvent('drop',{dataTransfer:data,bubbles:true,cancelable:true}));})()`);
   await until('!!document.querySelector(".real-agents").contentDocument.querySelector(".context-bubble.is-comment")');
   await evaluate(`(()=>{const frame=document.querySelector('.real-agents'),data=new DataTransfer();frame.contentDocument.querySelector('.is-draggable-result').dispatchEvent(new frame.contentWindow.DragEvent('dragstart',{dataTransfer:data,bubbles:true}));document.querySelector('#paper').dispatchEvent(new DragEvent('drop',{dataTransfer:data,bubbles:true,cancelable:true,clientY:180}));})()`);
   assert(await evaluate('!!document.querySelector(".fixed-card.new .pdf-mark-hover-pin.is-pinned")'));
   assert(await evaluate('document.querySelector(".fixed-card.new .pdf-canvas-card-body").textContent.trim()===document.querySelector(".real-agents").contentDocument.querySelector(".is-draggable-result .message-markdown").textContent.trim()'),'Manual drag preserves the selected historical answer');
   await evaluate('document.querySelector(".fixed-card.new .pdf-mark-hover-pin").click()');
   assert(await evaluate('!document.querySelector(".fixed-card.new")'));
  }
  if(mode==='multi-agent')assert.equal(await evaluate('[...document.querySelector(".real-agents").contentDocument.querySelectorAll(".conversation-message")].filter(m=>m.textContent.includes("Completed —")).length'),3);


  assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'));
  if(mode==='multi-agent'){
   await evaluate(`document.querySelector('.real-agents').contentDocument.querySelector('.agents-navigation button[title="Agents"]').click()`);
   await until('document.querySelector(".real-agents").contentDocument.querySelectorAll(".agent-card-portrait i[data-ready=true]").length===3');
   await evaluate(`document.querySelector('.real-agents').contentDocument.querySelector('.agents-navigation button[title="Inbox"]').click()`);
   await until('document.querySelector(".real-agents").contentDocument.querySelectorAll(".agents-inbox-list > button").length===3');
   assert(await evaluate('[...document.querySelector(".real-agents").contentDocument.querySelectorAll(".agents-inbox-list > button")].every(b=>b.textContent.includes("Completed —"))'));
   await evaluate(`document.querySelector('.real-agents').contentDocument.querySelector('.agent-nav-conversation button').click()`);
  }
  const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`../build/demo-${mode}.png`,Buffer.from(shot.data,'base64'));
  await evaluate('document.querySelector("#replay").click()');
  await until('document.querySelector(".real-agents").contentDocument.querySelectorAll(".conversation-message").length<=2');
  assert(await evaluate('!document.querySelector(".fixed-card.new, .inline-mark.drawn")'));
 }
 if(!process.argv[3]){
 await send('Page.navigate',{url:`${base}documents/attention-codebase.html`});
 await until('document.querySelector(".real-agents")?.contentDocument?.querySelector("textarea")');await evaluate('document.body.dispatchEvent(new PointerEvent("pointerenter"))');
 await until('document.querySelector(".real-agents")?.contentDocument?.querySelector("textarea").value.startsWith("@Coder")');
 await until('document.querySelector(".real-agents").contentDocument.querySelector(".conversation-stream").textContent.includes("ready to explore")');
 await evaluate(`(()=>{const d=document.querySelector('.real-agents').contentDocument,i=d.querySelector('textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(i,'@Coder Explain the model');i.dispatchEvent(new Event('input',{bubbles:true}));d.querySelector('.composer-send').click();})()`);
 await until('document.querySelector(".real-agents").contentDocument.querySelector(".conversation-stream").textContent.includes("Demo complete")');
 }
 assert.deepEqual(errors,[]);console.log('PASS: three HTML demos, real PDF marks, agent collaboration, card round trip, codebase autoplay under hover and manual input');
}finally{ws.close();await fetch(`${host}/json/close/${target.id}`);}
