// Rebuild the demo from real cards and the original PDF text geometry.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const root='../library/Release Showcase/Explainable ENSO';
const paper='paper-c28b83a93504457a';
const bundle=JSON.parse(await readFile(`${root}/.thinkreader/annotations/${paper}.json`,'utf8'));
const page=JSON.parse(await readFile(`${root}/workspace/${paper}/intelligence/source_geometry.json`,'utf8')).pages[0];
const normalize=s=>s.normalize('NFKC').replace(/\s+/g,' ').trim();
let text='';
const items=page.items.map(item=>{const value=normalize(item.text),start=text.length;text+=value+' ';return {...item,start,end:start+value.length,value};});
const selections=[
 ['Background','blue','The El Niño','long-standing challenge'],
 ['Problem','blue','Artificial intelligence forecasts','the advancements.'],
 ['Results','orange','Here we show','artificial intelligence forecasts.'],
 ['Method','green','The XRO parsimoniously','global oceans.'],
 ['Contribution','orange','The intrinsic enhancement','ENSO amplitude.'],
];
const annotations=selections.map(([title,color,begin,finish])=>{
 const original=bundle.annotations.find(a=>a.body_md.startsWith(`### ${title}\n`)&&a.anchor.page_index===0);
 assert(original,`Missing original ${title} card`);
 const start=text.indexOf(begin),endStart=text.indexOf(finish,start),end=endStart+finish.length;
 assert(start>=0&&endStart>start,`Cannot resolve ${title} in the PDF text`);
 const rects=items.filter(i=>i.end>start&&i.start<end&&i.value).map(i=>{
  const [x1,y1,x2,y2]=i.rect_pdf,width=x2-x1;
  return [(x1+width*Math.max(0,start-i.start)/i.value.length)/page.page_box[2],1-y2/page.page_box[3],(x1+width*Math.min(i.value.length,end-i.start)/i.value.length)/page.page_box[2],1-y1/page.page_box[3]];
 });
 return {id:original.annotation_id,title,body:original.body_md.split('\n\n').slice(1).join('\n\n'),rects,color,source_excerpt:text.slice(start,end),source_paper:paper};
});
assert.equal(new Set(annotations.map(a=>a.id)).size,5);
await writeFile('public/documents/feature-annotations.json',JSON.stringify(annotations,null,2));
console.log('Exported five original cards with complete, source-resolved excerpts.');
