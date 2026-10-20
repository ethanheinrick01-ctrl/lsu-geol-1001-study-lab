import * as THREE from './vendor/three.module.js';
import {seeded} from './math.js';
export const textures=[];
export function texture(kind,seed,{top=false,side=false}={}) {
  const canvas=document.createElement('canvas');canvas.width=side?384:1536;
  canvas.height=top?384:({cap:100,sand:280,marker:60,lime:185}[kind]);
  const {width:w,height:h}=canvas,c=canvas.getContext('2d'),r=seeded(seed);
  const colors={cap:'#d6d3bf',sand:'#b87c60',marker:'#a4b197',lime:'#a2b2b6'};
  c.fillStyle=colors[kind];c.fillRect(0,0,w,h);
  for(let i=0;i<(side?2500:10000);i++){
    c.fillStyle=r()>.5?'rgba(255,244,216,.12)':'rgba(36,39,31,.08)';
    const d=.45+r()*1.25;c.fillRect(r()*w,r()*h,d,d);
  }
  if(kind==='cap'){
    const count=top?180:side?24:75;
    for(let i=0;i<count;i++){
      const x=r()*w,y=top?r()*h:15+r()*(h-30),a=5+r()*12,b=4+r()*9;
      c.save();c.translate(x,y);c.rotate(r()*1.8-.9);
      c.beginPath();c.ellipse(0,0,a,b,0,0,Math.PI*2);
      c.fillStyle=['#a6a994','#b9af99','#a4a394','#c3b7a0','#92998e'][i%5];c.fill();
      c.strokeStyle='#6d7466';c.lineWidth=1.8;c.stroke();
      c.beginPath();c.ellipse(-a*.22,-b*.23,a*.55,b*.5,0,Math.PI,1.85*Math.PI);c.strokeStyle='#e0d9c3';c.lineWidth=1.3;c.stroke();c.restore();
    }
  }
  if(kind==='sand'){
    for(let i=0;i<(side?650:2500);i++){
      c.fillStyle=['#53695f','#6a735f','#80775f','#9b956f'][i%4];const d=.7+r()*1.5;
      c.fillRect(r()*w,r()*h,d,d*(1.1+r()));
    }
  }
  if(kind==='marker'){
    c.strokeStyle='#758971';c.lineWidth=1.6;
    for(let i=0;i<85;i++){let x=r()*w,y=r()*h;c.beginPath();c.moveTo(x,y);c.lineTo(x+10+r()*35,y);c.stroke();}
  }
  if(kind==='lime'){
    const rh=h/3,cw=145;c.lineWidth=2.5;
    for(let row=0;row<3;row++){
      const y=row*rh;c.fillStyle=row%2?'rgba(216,225,219,.085)':'rgba(39,64,71,.02)';c.fillRect(0,y,w,rh);
      c.strokeStyle='#738a91';c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();
      c.strokeStyle='rgba(235,236,219,.65)';c.beginPath();c.moveTo(0,y+3);c.lineTo(w,y+3);c.stroke();
      for(let x=(row%2)*cw/2;x<w;x+=cw){
        c.strokeStyle='#72888e';c.beginPath();c.moveTo(x,y+1);c.lineTo(x,y+rh);c.stroke();
        c.strokeStyle='rgba(226,233,221,.55)';c.beginPath();c.moveTo(x+3,y+4);c.lineTo(x+3,y+rh-3);c.stroke();
      }
    }
  }
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;
  if(side)t.wrapT=THREE.RepeatWrapping;
  textures.push(t);return t;
}
export function material(map,{color=0xffffff}={}) {
  const m=new THREE.MeshStandardMaterial({map,color,roughness:1,metalness:0,alphaTest:.01,alphaToCoverage:true});
  m.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>',`
    outgoingLight=mix(outgoingLight,diffuseColor.rgb,0.85*pow(clamp(normal.z,0.0,1.0),8.0));
    #include <opaque_fragment>
  `);};
  return m;
}
export function faceLabel(word,width) {
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=192;
  const c=canvas.getContext('2d');c.clearRect(0,0,1024,192);
  c.textAlign='center';c.textBaseline='middle';c.font='600 126px Arial';
  // Opposing pale keyline is subtle; the dark ink stays faithful to the textbook.
  c.strokeStyle='rgba(219,195,155,.35)';c.lineWidth=2;c.strokeText(word,512,100);
  c.fillStyle='#241c14';c.fillText(word,512,100);
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace; textures.push(map);
  const reveal={value:0};
  const m=new THREE.MeshBasicMaterial({map,transparent:true,alphaTest:.06,alphaToCoverage:true,depthWrite:false});
  m.onBeforeCompile=s=>{s.uniforms.reveal=reveal;s.fragmentShader='uniform float reveal;\n'+s.fragmentShader;
    s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\nif(vMapUv.x>reveal) discard;');};
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width*192/1024),m);
  mesh.userData.reveal=reveal;mesh.renderOrder=3;return mesh;
}
