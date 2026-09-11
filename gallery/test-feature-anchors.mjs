import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getDocument} from '../app/desktop/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
const annotations=JSON.parse(readFileSync('public/documents/feature-annotations.json','utf8'));
const page=await(await getDocument({data:new Uint8Array(readFileSync('public/documents/xro/1.pdf'))}).promise).getPage(1);
const viewport=page.getViewport({scale:1}),content=await page.getTextContent();
const claims={Background:'global seasonal',Problem:'physical processes',Results:'16–18',Method:'core ENSO dynamics',Contribution:'initial conditions'};
assert.equal(annotations.length,5);
for(const annotation of annotations){
 const selected=content.items.filter(item=>{
  const x=item.transform[4]/viewport.width,y=(viewport.height-item.transform[5]-item.height/2)/viewport.height;
  return annotation.rects.some(r=>y>=r[1]-.003&&y<=r[3]+.003&&x+item.width/viewport.width>r[0]&&x<r[2]);
 }).map(item=>item.str).join(' ').normalize('NFKC').replace(/\s+/g,' ');
 assert(selected.includes(claims[annotation.title]),`${annotation.title} is not anchored to its source claim: ${selected}`);
 assert(annotation.source_excerpt.includes(claims[annotation.title]));
}
console.log('PASS: five card claims match text inside their original PDF anchors.');
