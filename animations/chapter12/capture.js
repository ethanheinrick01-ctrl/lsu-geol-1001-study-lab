// Deterministic rasterization of the same scene and layout for offline frame export.
// No source image edits; panel crops and comparison thumbnails follow the live stage.
export function installCapture({seek,film,imgs,renderer}){
const out=document.createElement('canvas');out.width=1280;out.height=720;let c=out.getContext('2d',{alpha:false});
const el=id=>document.getElementById(id),box=id=>el(id).getBoundingClientRect();
function text(id,x,y,font,color,max=1190){let e=el(id);c.font=font;c.fillStyle=color;c.textBaseline='top';let lines=[''];for(let w of e.textContent.split(' ')){let k=lines.length-1,tryline=lines[k]?lines[k]+' '+w:w;if(c.measureText(tryline).width>max){lines.push(w)}else lines[k]=tryline;}let size=parseFloat(font.match(/([\d.]+)px/)[1]);lines.forEach((v,i)=>c.fillText(v,x,y+i*size*1.45));}
function imageIn(im,r){let k=Math.min(r.width/im.naturalWidth,r.height/im.naturalHeight),w=im.naturalWidth*k,h=im.naturalHeight*k;c.drawImage(im,r.x+(r.width-w)/2,r.y+(r.height-h)/2,w,h);}
window.captureFrame=time=>{
 let state=seek(time),b=film.beats[state.beat],u=(time-b[5].start)/(b[5].end-b[5].start),dir=b[6]||{},j=Math.max(0,(dir.cueTimes||b[4].map((_,k)=>b[5].start+(b[5].end-b[5].start)*k/b[4].length)).findLastIndex(q=>time>=q)),im=imgs[b[4][j]],focus=dir.figures?.[j]?.focus;
 c.fillStyle='#101619';c.fillRect(0,0,1280,720);let g=c.createRadialGradient(380,320,40,380,320,750);g.addColorStop(0,'#263237');g.addColorStop(.65,'#151e23');g.addColorStop(1,'#0f1316');c.fillStyle=g;c.fillRect(0,0,1280,720);
 renderer.getContext().finish();let r=box('scene');c.drawImage(renderer.domElement,r.x,r.y,r.width,r.height);
 let ar=document.querySelector('aside').getBoundingClientRect();c.fillStyle='#ffffff';c.beginPath();c.roundRect(ar.x,ar.y,ar.width,ar.height,8);c.fill();c.save();c.beginPath();c.roundRect(ar.x,ar.y,ar.width,ar.height,8);c.clip();c.fillStyle='#e8edeb';c.fillRect(ar.x,ar.y,ar.width,42);
 c.font='11px Arial';c.fillStyle='#35464c';c.fillText(/-p\d+/.test(b[4][j])?'FROM THE TEXTBOOK':'SUPPLIED CONNECT FIGURE',ar.x+18,ar.y+25);c.textAlign='right';c.fillText(el('sourcecount').textContent,ar.right-18,ar.y+25);c.textAlign='left';
 let crop=box('crop');if(focus){let [cx,cy,w,h]=focus;let scale=Math.min((ar.width-32)/(im.naturalWidth*w),((dir.sourceLed?323:298)-55)/(im.naturalHeight*h));let iw=im.naturalWidth*scale,ih=im.naturalHeight*scale;c.save();c.beginPath();c.rect(crop.x,crop.y,crop.width,crop.height);c.clip();c.drawImage(im,crop.x+iw*w/2-cx*iw,crop.y+ih*h/2-cy*ih,iw,ih);c.restore();let cmp=box('comparison');c.fillStyle='#fff';c.fillRect(cmp.x,cmp.y,cmp.width,cmp.height);c.strokeStyle='#a4b4b9';c.strokeRect(cmp.x,cmp.y,cmp.width,cmp.height);imageIn(im,{x:cmp.x+3,y:cmp.y+3,width:cmp.width-6,height:cmp.height-6});let lab=box('detail-label');c.font='10px Arial';c.fillStyle='#36545c';c.fillText('ENLARGED PANEL · whole figure below',lab.x+4,lab.y+10);}else imageIn(im,crop);
 let cit=box('citation');text('citation',ar.x+14,ar.bottom-29,'12px Arial','#46585e',ar.width-28);c.restore();
 let title=box('title'),sec=box('section'),count=box('count');text('section',42,45,'15px Arial','#82c7e0');text('title',title.x,title.y,'500 28px Arial','#edece5');text('count',count.x,count.y,'13px Arial','#b5c0c4');
 let dis=document.querySelector('.disclosure').getBoundingClientRect();c.font='11px Arial';c.fillStyle='#a6b8be';c.textAlign='center';c.fillText('Original teaching reconstruction · schematic scale and time',dis.x+dis.width/2,dis.y+12);c.textAlign='left';
 let beat=box('beat'),cap=box('caption');text('beat',beat.x,beat.y,'bold 26px Arial','#f2e5c7');text('caption',cap.x,cap.y,'17px Arial','#c8d7dc',1100);c.fillStyle='#74b9cc';let line=box('timeline');c.fillRect(line.x,line.y,1192*Math.max(0,Math.min(1,time/film.duration)),3);
 return out.toDataURL('image/jpeg',.96).split(',')[1];
};
}
