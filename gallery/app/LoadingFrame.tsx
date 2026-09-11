import {useEffect,useRef,useState,type RefObject,type IframeHTMLAttributes} from 'react';

export function useNearViewport(ref:RefObject<Element|null>){
 const [near,setNear]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setNear(true);observer.disconnect();}});observer.observe(node);return()=>observer.disconnect();},[ref]);
 return near;
}

export function LoadingFrame({src,frameRef,...props}:IframeHTMLAttributes<HTMLIFrameElement>&{frameRef?:RefObject<HTMLIFrameElement|null>}){
 const host=useRef<HTMLDivElement>(null),ownRef=useRef<HTMLIFrameElement>(null),ref=frameRef||ownRef;
 const near=useNearViewport(host),[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  setReady(false);setFailed(false);if(!near)return;
  const start=Date.now(),timer=setInterval(()=>{
   if(ref.current?.contentDocument?.documentElement.dataset.galleryReady==='true'){setReady(true);clearInterval(timer);}
   else if(Date.now()-start>45000){setFailed(true);clearInterval(timer);}
  },100);
  return()=>clearInterval(timer);
 },[near,src,attempt,ref]);
 return <div ref={host} className={`loading-frame frame-${props.className}`} aria-busy={!ready}>
  {!ready&&<div className="gallery-loading" role="status">{failed?<button onClick={()=>setAttempt(value=>value+1)} aria-label="Retry loading">↻</button>:<span className="gallery-spinner" aria-label="Loading"/>}</div>}
  <iframe {...props} key={attempt} ref={ref} src={near?src:undefined} loading="eager" style={{...props.style,opacity:ready?1:0,pointerEvents:ready?undefined:'none'}}/>
 </div>;
}
