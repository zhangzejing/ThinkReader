// The selected thumbnail follows the live reader; it never runs a second demo.
export const isPreview = new URLSearchParams(location.search).has('mirror');
export function syncPreview<T>(read:()=>T, apply:(state:T)=>void) {
 const current=window as Window & {galleryRead?:()=>T;galleryApply?:(state:T)=>void};
 current.galleryRead=read;current.galleryApply=apply;
}
