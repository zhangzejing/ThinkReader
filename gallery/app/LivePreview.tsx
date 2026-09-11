import {useEffect,useRef,type RefObject} from 'react';

export function LivePreview({workflow,command,active}:{workflow:RefObject<HTMLElement|null>;command:string;active:boolean}){
 const host=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const copy=host.current?.querySelector('iframe');
  const playback=(doc:Document|null|undefined)=>{doc?.getAnimations().forEach(animation=>active?animation.play():animation.pause());doc?.querySelectorAll('iframe').forEach(frame=>playback(frame.contentDocument));};playback(copy?.contentDocument);
  if(!active)return;
  let frame=0;
  const tick=()=>{
   const target=host.current,large=workflow.current?.querySelector<HTMLElement>(`.workflow-large[data-command="${command}"]`);
   if(target&&large){
    const live=large.querySelector<HTMLIFrameElement>('iframe');
    if(live?.getAttribute('src')){
     let copy=target.querySelector('iframe');
     if(!copy){copy=document.createElement('iframe');copy.src=live.src+'&mirror=1';copy.tabIndex=-1;copy.title='';copy.setAttribute('aria-hidden','true');target.replaceChildren(copy);}
     if(copy){
      const ratio=Math.max(target.clientWidth/live.clientWidth,target.clientHeight/live.clientHeight);
      Object.assign(copy.style,{width:`${live.clientWidth}px`,height:`${live.clientHeight}px`,transform:`translate(-50%,-50%) scale(${ratio})`});
      const master=live.contentWindow as Window & {galleryRead?:()=>unknown},slave=copy.contentWindow as Window & {galleryApply?:(state:unknown)=>void};
      if(master?.galleryRead&&slave?.galleryApply){slave.galleryApply(master.galleryRead());target.style.opacity='1';}
     }
    }else{
     const slides=large.querySelector<HTMLElement>('.slide-overview');
     if(slides){target.style.opacity='1';const ratio=target.clientWidth/slides.clientWidth;target.style.backgroundImage=slides.style.backgroundImage;target.style.backgroundSize=slides.style.backgroundSize.replace(/[\d.]+px/g,n=>`${parseFloat(n)*ratio}px`);target.style.backgroundPosition=slides.style.backgroundPosition.replace(/-?[\d.]+px/g,n=>`${parseFloat(n)*ratio}px`);}
    }
   }
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(frame);};
 },[command,workflow,active]);
 return <span ref={host} className="live-preview" aria-hidden="true"/>;
}
