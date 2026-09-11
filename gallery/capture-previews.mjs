// Capture the real interactive previews; a local Chromium debugging port is required.
import { mkdir, writeFile } from 'node:fs/promises';
const host=`http://127.0.0.1:${process.argv[2]||8872}`;
await mkdir('public/previews',{recursive:true});
for(const [paper,command] of [['attention','summary'],['attention','mindmap'],['attention','codebase'],['xro','summary'],['xro','report'],['xro','mindmap']]){
 const url=`http://127.0.0.1:3000/${command==='mindmap'?'mindmaps/'+paper:'documents/'+paper+'-'+command}.html`;
 const target=await(await fetch(`${host}/json/new?${encodeURIComponent(url)}`,{method:'PUT'})).json();
 const socket=new WebSocket(target.webSocketDebuggerUrl),pending=new Map();let id=0;
 await new Promise(resolve=>socket.onopen=resolve);
 socket.onmessage=event=>{const value=JSON.parse(event.data);if(value.id){pending.get(value.id)?.(value);pending.delete(value.id);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;pending.set(key,result=>result.error?reject(Error(JSON.stringify(result.error))):resolve(result.result));socket.send(JSON.stringify({id:key,method,params}));});
 try{
  await send('Emulation.setDeviceMetricsOverride',{width:700,height:438,deviceScaleFactor:1,mobile:false});await send('Page.reload');
  for(let n=0;n<50;n++){
   const result=await send('Runtime.evaluate',{expression:'Boolean(document.querySelector("#note h1,#world article")) && [...document.images].every(image=>image.complete)',returnByValue:true});
   if(result.result.value)break;await new Promise(resolve=>setTimeout(resolve,200));
  }
  await new Promise(resolve=>setTimeout(resolve,command==='codebase'?7000:1500));
  const result=await send('Page.captureScreenshot',{format:'png'});
  await writeFile(`../build/release-showcase/preview-${paper}-${command}.png`,Buffer.from(result.data,'base64'));
  console.log(`${paper}/${command}`);
 }finally{socket.close();await fetch(`${host}/json/close/${target.id}`);}
}
