// Reveal an embedded workspace only after its content and fonts have rendered.
export async function galleryReady(){
 await document.fonts.ready;
 await Promise.all([...document.images].map(image=>image.decode().catch(()=>undefined)));
 requestAnimationFrame(()=>document.documentElement.dataset.galleryReady='true');
}
