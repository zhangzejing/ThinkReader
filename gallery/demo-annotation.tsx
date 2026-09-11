import React from '../app/desktop/node_modules/react';
import {createRoot} from '../app/desktop/node_modules/react-dom/client';
import {flushSync} from '../app/desktop/node_modules/react-dom';
import {AgentAvatar} from '../app/desktop/src/components/AgentBrandIcon';
import {renderMarkdown} from '../app/desktop/src/components/MessageMarkdown';
import {Icons} from '../app/desktop/src/icons';
import {writeQuoteDrag} from '../app/desktop/src/features/collaboration/dragPayload';
import '../app/desktop/src/styles/app.css';
import '../app/desktop/src/shared/theme/index.css';
import '../app/desktop/src/features/pdf-reader/pdf-reader.css';
import '../app/desktop/src/shared/theme/annotations.css';

export type DemoAnnotation={id:string;title:string;body:string;rects:number[][];color:string;page?:number};
// Use the reader's classes, Markdown renderer, avatar and pin icon unchanged.
export function mountCard(host:HTMLElement,annotation:DemoAnnotation,onPin:()=>void,pinned=false){
 const root=createRoot(host);
 flushSync(()=>root.render(<aside className={`pdf-mark-hover-card is-color-${annotation.color}`}>
  <header><span className="pdf-card-meta pdf-card-author"><AgentAvatar harness="cursor" interactive={false}/><strong>Reviewer</strong><time>09:41</time></span><button className={`pdf-mark-hover-pin${pinned?' is-pinned':''}`} aria-label={pinned?'Unpin annotation':'Pin annotation'} aria-pressed={pinned} onClick={onPin}><Icons.Pin/></button></header>
  <div className="pdf-canvas-card-content"><div className="pdf-canvas-card-body pdf-annotation-markdown" dangerouslySetInnerHTML={{__html:renderMarkdown(annotation.title?`### ${annotation.title}\n\n${annotation.body}`:annotation.body)}}/></div>
 </aside>));
 return ()=>root.unmount();
}
export function enableCardDrag(card:HTMLElement,annotation:DemoAnnotation,onStart:()=>void){
 card.draggable=true;
 card.ondragstart=event=>{onStart();writeQuoteDrag(event.dataTransfer!,{kind:'annotation',source:`Page ${annotation.page||1}`,annotation_id:annotation.id,text:annotation.title?`${annotation.title}\n\n${annotation.body}`:annotation.body});};
}
