import * as THREE from './vendor/three.module.js';
import {spring,clamp} from './math.js';
import {buildScene} from './scene.js';

export const DURATION=25.88;
export const BEATS=[{"start": 0, "end": 3.96, "title": "Sediment becomes unstable", "subtitle": "A slope failure starts sediment moving."}, {"start": 3.96, "end": 9.1, "title": "A dense sediment–water flow", "subtitle": "Gravity drives the mixture downslope."}, {"start": 9.1, "end": 15.05, "title": "Transport through a canyon", "subtitle": "A current can erode and carry sediment into deep water."}, {"start": 15.05, "end": 19.65, "title": "The current spreads and slows", "subtitle": "Sediment accumulates in a submarine fan."}, {"start": 19.65, "end": 25.88, "title": "A bed fines upward", "subtitle": "Coarse grains settle first; finer material follows."}];
const params=new URLSearchParams(location.search),capture=params.get('capture')==='1';
if(capture)document.body.classList.add('capture');
const film=document.querySelector('#film');
const renderer=new THREE.WebGLRenderer({canvas:document.querySelector('#scene'),alpha:true,antialias:true,preserveDrawingBuffer:capture});
renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;
renderer.setPixelRatio(capture?1:Math.min(devicePixelRatio,2));
const model=buildScene(renderer);
const ns='http://www.w3.org/2000/svg';
const captions=BEATS.map(b=>{
  const group=document.createElementNS(ns,'g');document.querySelector('#captions').append(group);
  for(const [y,content,cls]of [[638,b.title,'beat-title'],[674,b.subtitle,'beat-subtitle']]){
    const n=document.createElementNS(ns,'text');n.setAttribute('x','640');n.setAttribute('y',y);n.setAttribute('text-anchor','middle');n.setAttribute('class',cls);n.textContent=content;group.append(n);
  }
  return group;
});
let t=0,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,inView=true,last=null,state;
const play=document.querySelector('#play'),scrub=document.querySelector('#scrub');
scrub.max=DURATION;
function controls(){play.textContent=playing?'Pause':'Play';play.setAttribute('aria-label',playing?'Pause animation':'Play animation');}
function seek(time){
  t=clamp(Number.isFinite(time)?time:0,0,DURATION);state=model.pose(t);
  captions.forEach((g,i)=>{
    const b=BEATS[i],enter=i===0?1:spring(t-b.start,{omega:19,zeta:.9}),leave=spring(t-b.end,{omega:19,zeta:.9});
    g.style.display=t<b.start||t>b.end+.8?'none':'';g.setAttribute('transform',`translate(${-1400*(1-enter)+1400*leave},0)`);
  });
  renderer.render(model.scene,model.camera);scrub.value=t;
  document.querySelector('#clock').textContent=`0:${String(Math.floor(t)).padStart(2,'0')} / 0:${String(Math.ceil(DURATION)).padStart(2,'0')}`;
  document.querySelector('#transcript').textContent=(BEATS.find(b=>t>=b.start&&t<b.end)||BEATS.at(-1)).subtitle;
  return t;
}
function resize(){
  const width=capture?Number(params.get('w')||1280):film.clientWidth,height=capture?Number(params.get('h')||720):film.clientHeight;
  if(capture){film.style.width=`${width}px`;film.style.height=`${height}px`;}
  renderer.setSize(width,height,false);
  const s=Math.min(width/1280,height/720);
  renderer.setViewport((width-1280*s)/2,(height-720*s)/2,1280*s,720*s);seek(t);
}
play.addEventListener('click',()=>{if(t>=DURATION)seek(0);playing=!playing;last=null;controls();});
document.querySelector('#replay').addEventListener('click',()=>{seek(0);playing=true;last=null;controls();});
scrub.addEventListener('input',()=>{playing=false;seek(Number(scrub.value));controls();});
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;last=null;},{threshold:.05}).observe(film);
addEventListener('resize',resize);
function frame(now){
  if(!capture&&playing&&inView){seek(t+(last===null?0:Math.min(.05,Math.max(0,(now-last)/1000))));if(t>=DURATION){playing=false;controls();}}
  last=now;requestAnimationFrame(frame);
}
resize();seek(0);controls();
window.wall={seek,duration:DURATION};window.motionQA={getTime:()=>t,beats:BEATS,modelAt:time=>{seek(time);return state;}};window.ready=true;
if(!capture)(window.requestIdleCallback||((fn)=>requestAnimationFrame(fn)))(()=>requestAnimationFrame(frame));
