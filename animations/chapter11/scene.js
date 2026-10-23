import * as T from './vendor/three.module.js';
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},G=x=>Math.exp(-x*x);
const palette={crust:'#b6b7b3',mantle:'#8f8954',asthen:'#c29c62',sand:'#cead80',green:'#91a491',mud:'#b4a49b',basalt:'#646c6b',water:'#497e9b',magma:'#d97451',caprock:'#9c7858'};
function grain(color,seed=19){let c=document.createElement('canvas');c.width=c.height=256;let x=c.getContext('2d');x.fillStyle=color;x.fillRect(0,0,256,256);let r=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};for(let i=0;i<7000;i++){x.fillStyle=r()>.5?'#ffffff25':'#18202026';let q=.4+r()*1.8;x.fillRect(r()*256,r()*256,q,q);}let t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
const mats={};Object.entries(palette).forEach(([k,c],i)=>mats[k]=new T.MeshStandardMaterial({map:grain(c,30+i),roughness:1,metalness:0}));
const bright=new T.MeshBasicMaterial({color:'#f3976c'}),water=new T.MeshStandardMaterial({color:palette.water,transparent:true,opacity:.58,roughness:.5,side:T.DoubleSide});
export function buildScene(renderer){
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-6.5,6.5,3.75,-3.75,.1,100);camera.position.set(5,5.6,17);camera.lookAt(0,-.1,0);scene.add(new T.AmbientLight(0xffffff,1.35));let light=new T.DirectionalLight(0xfff2dc,2);light.position.set(-6,10,12);scene.add(light);let fill=new T.DirectionalLight(0xc6e6ff,.6);fill.position.set(7,3,-2);scene.add(fill);
 const root=new T.Group();root.position.y=.25;scene.add(root);let objects=[],labels=[],lastMode='';const labelCache=new Map();
 function dispose(){for(let o of objects){root.remove(o);o.traverse(n=>{if(n.geometry&&!n.userData.cachedLabel)n.geometry.dispose();if(n.userData.label&&!n.userData.cachedLabel&&n.material){n.material.map.dispose();n.material.dispose();}});}objects=[];labels=[];}
 function add(o){root.add(o);objects.push(o);return o;}
 function ribbon(lo,hi,mat='crust',x0=-4.7,x1=4.7,z=1.25,N=64){let g=new T.BufferGeometry(),p=[],uv=[];let vertex=(v,top)=>{p.push(...v);uv.push(v[0]/2,(top?v[2]:v[1])/1.5)};let quad=(a,b,c,d,top=false)=>[a,b,c,a,c,d].forEach(v=>vertex(v,top));for(let i=0;i<N;i++){let a=x0+(x1-x0)*i/N,b=x0+(x1-x0)*(i+1)/N;if(Math.max(Math.abs(hi(a)-lo(a)),Math.abs(hi(b)-lo(b)))<1e-7)continue;quad([a,lo(a),z],[b,lo(b),z],[b,hi(b),z],[a,hi(a),z]);quad([b,lo(b),-z],[a,lo(a),-z],[a,hi(a),-z],[b,hi(b),-z]);quad([a,hi(a),z],[b,hi(b),z],[b,hi(b),-z],[a,hi(a),-z],true);quad([a,lo(a),-z],[b,lo(b),-z],[b,lo(b),z],[a,lo(a),z]);}quad([x0,lo(x0),-z],[x0,lo(x0),z],[x0,hi(x0),z],[x0,hi(x0),-z]);quad([x1,lo(x1),z],[x1,lo(x1),-z],[x1,hi(x1),-z],[x1,hi(x1),z]);g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.computeVertexNormals();let mesh=new T.Mesh(g,typeof mat==='string'?mats[mat]:mat);add(mesh);return mesh;}
 function label(text,x,y,width=2.5){if(y>2.0)return null;const key=text+'|'+width;let cached=labelCache.get(key);if(cached){let m=new T.Mesh(cached.geometry,cached.material);m.position.set(x,y,1.45);m.quaternion.copy(camera.quaternion);m.renderOrder=20;m.userData.cachedLabel=true;add(m);return m;}let c=document.createElement('canvas');c.width=768;c.height=128;let d=c.getContext('2d');let fs=92;d.font='600 '+fs+'px Arial';while(d.measureText(text).width>740&&fs>20){fs-=2;d.font='600 '+fs+'px Arial';}d.textAlign='center';d.textBaseline='middle';d.strokeStyle='#172023';d.lineWidth=6;d.strokeText(text,384,64);d.fillStyle='#f1f0e9';d.fillText(text,384,64);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;let m=new T.Mesh(new T.PlaneGeometry(width,width/6),new T.MeshBasicMaterial({map:tx,transparent:true,depthTest:false,depthWrite:false}));m.position.set(x,y,1.45);m.quaternion.copy(camera.quaternion);m.renderOrder=20;m.userData.cachedLabel=true;labelCache.set(key,{geometry:m.geometry,material:m.material});add(m);return m;}
 function path(points,color='#f0cf91',radius=.035){let curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return add(new T.Mesh(new T.TubeGeometry(curve,40,radius,6,false),new T.MeshBasicMaterial({color})));}
 function arrow(x,y,dx,dy,color='#70c8e4'){let len=Math.hypot(dx,dy);let a=new T.ArrowHelper(new T.Vector3(dx/len,dy/len,0),new T.Vector3(x,y,1.3),len,color,.28,.16);return add(a);}
 function rockBall(x,y,r=.15,mat='magma'){let m=new T.Mesh(new T.SphereGeometry(r,14,9),mats[mat]);m.position.set(x,y,1.3);return add(m);}
 function stack(x0,x1,offset=0,angle=0){let group=new T.Group();for(let i=0;i<4;i++){let m=ribbon(()=>-1.6+i*.55,()=>-1.05+i*.55,['crust','mud','green','sand'][i],x0,x1);root.remove(m);objects.splice(objects.indexOf(m),1);group.add(m);}group.position.y=offset;group.rotation.z=angle;return add(group);}
 function terrain(p,{rooted=false,erode=false,heat=false,cooling=false}={}){let a=rooted?(erode?1.5-.8*p:.25+1.25*p):heat?.2+.7*p:cooling?.9-.7*p:.5;let surf=x=>.45+a*G(x/2.1)+.065*Math.sin(x*7)*G(x/3);let base=x=>-.75-(rooted?1.25*a*G(x/2.1):0);ribbon(()=>-3.0,base,'mantle');ribbon(base,surf,'crust');ribbon(surf,x=>surf(x)+.06,'green');label('Continental crust',0,-.25,3.5);label('Mantle',-3.3,-2.1,1.8);if(rooted)label('Crustal root',0,-.75-.6*a,2.6);if(heat){for(let i=0;i<6;i++)arrow(-3.6+i*1.4,-1.9,0,.5+(.25*p),'#e58e69');label('Heating • expansion',0,2.2,4);}if(cooling)label('Cooling • subsidence',0,2.2,4);if(erode){for(let i=0;i<16;i++){let q=((i/16+p*.8)%1),sg=i%2?1:-1;rockBall(sg*(.3+q*3.8),1.7-q*1.25,.035,'sand');}arrow(0,-1.2,0,.5);}}
 function polygon(points,mat='crust',depth=2.5){let sh=new T.Shape();points.forEach(([x,y],i)=>i?sh.lineTo(x,y):sh.moveTo(x,y));sh.closePath();let g=new T.ExtrudeGeometry(sh,{depth,bevelEnabled:false,steps:1});g.translate(0,0,-depth/2);let po=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<po.count;i++){let n=g.attributes.normal;uv.setXY(i,Math.abs(n.getZ(i))>.5?po.getX(i)/2:po.getZ(i)/2,po.getY(i)/1.5);}return add(new T.Mesh(g,mats[mat]));}
 function faults(p,rotate=false,reverse=false){
  if(rotate){for(let i=0;i<4;i++){let center=-3.3+i*2.2;let group=new T.Group();for(let j=0;j<4;j++){let lo=-1.6+j*.55,hi=lo+.55;let m=polygon([[-1.1,lo],[1.1,lo],[1.1,hi],[-1.1,hi]],['crust','mud','green','sand'][j]);root.remove(m);objects.splice(objects.indexOf(m),1);group.add(m);}group.position.set(center*(1+.17*p),-.25*p,0);group.rotation.z=-.32*p;add(group);}label('Rotating normal-fault blocks',0,2.25,5.5);arrow(-3.6,1.4,-.7,0);arrow(3.6,1.4,.7,0);return;}
  let angle=reverse?.55:1.05,shift=(reverse?-1:1)*p*.9,cut=y=>-y/Math.tan(angle);
  for(let side of [-1,1]){let group=new T.Group();for(let j=0;j<4;j++){let lo=-1.6+j*.55,hi=lo+.55;let pts=side<0?[[-4.4,lo],[cut(lo)-.025,lo],[cut(hi)-.025,hi],[-4.4,hi]]:[[cut(lo)+.025,lo],[4.4,lo],[4.4,hi],[cut(hi)+.025,hi]];let m=polygon(pts,['crust','mud','green','sand'][j]);root.remove(m);objects.splice(objects.indexOf(m),1);group.add(m);}if(side>0)group.position.set(shift*Math.cos(angle),-shift*Math.sin(angle),0);add(group);}
  label('Footwall',-2.4,-.1,2.2);label('Hanging wall',2.1+shift*Math.cos(angle),-.1-shift*Math.sin(angle),2.7);label(reverse?'Shortening • hanging wall rises':'Extension • hanging wall descends',0,2.1,6.4);arrow(-3.5,1.2,reverse?.8:-.8,0);arrow(3.5,1.2,reverse?-.8:.8,0);
 }
 function subduction(p,rollback=false,flat=false){
 let hinge=rollback?-.65-1.0*p:-.8,slope=flat?.68-.48*p:.68;
 let slab=x=>-.38-slope*Math.max(0,x-hinge),end=Math.min(4.5,hinge+3.0/slope);
 ribbon(()=>-3.7,()=>-.75,'asthen',-4.7,4.7,1.18);
 ribbon(x=>slab(x)-.4,slab,'basalt',-4.8,end);
 let arc=flat?1.2+1.8*p:1.25,base=x=>Math.max(slab(x)+.4,-1.25);
 let top=x=>.3+(.35+.45*p)*G((x-arc)/.7)+.18*G((x-3.7)/.7);
 ribbon(base,top,'crust',hinge+.65,4.7);
 ribbon(()=>-.22,()=>-.11,water,-4.7,hinge-.1);
 // Scraped sediment accumulates at the trench instead of following the slab indefinitely.
 polygon([[hinge+.06,-.38],[hinge+.78,-.38],[hinge+.72,.18+.24*p]],'sand');
 for(let i=0;i<8;i++){let x=-4.5+((p*2+i*.53)%3.4);rockBall(x,slab(x)+.04,.045,'sand');}
 // A seam embedded in the descending plate is an explicit material-motion tracer.
 for(let i=0;i<8;i++){let x=-4.6+((p*2+i*1.02)%8);if(x<end)path([[x,slab(x)-.36,1.26],[x,slab(x)-.05,1.26]],'#a4aba3',.018);}
 let melt=rockBall(arc,-.5,.17+.11*p);path([[arc,-.5,1.27],[arc+.1,0,1.27],[arc,top(arc),1.27]],'#ee986d',.045);
 label('Oceanic plate',-3,-.85,2.7);label('Trench',hinge-.25,.65,1.35);label('Prism',hinge+.6,.85,1.3);label('Volcanic arc',arc,1.8,2.6);label('Mantle',-3,-2.5,2);
 arrow(-4,.35,.8,0);if(rollback){arrow(3.5,1.3,.7,0);arrow(.2,1.3,-.55,0);}else arrow(4,1.1,-.65,0);
 }
 function basin(p,growth=false){
 if(growth){
  const cut=y=>-1.5-.55*y,slope=.12*p,rightX=y=>(-1.5-.55*y)/(1+.55*slope),levels=['crust','mud','green','sand'];
  for(let i=0;i<4;i++){
   let lo=-1.65+i*.42,hi=lo+.42;
   polygon([[-4.4,lo],[cut(lo),lo],[cut(hi),hi],[-4.4,hi]],levels[i]);
   let low=lo-.8*p,high=hi-.8*p,xl=rightX(low),xh=rightX(high);
   polygon([[xl,low+slope*xl],[4.4,low+slope*4.4],[4.4,high+slope*4.4],[xh,high+slope*xh]],levels[i]);
  }
  let ca=.03-.8*p,cb=slope;
  for(let i=0;i<4;i++){let amount=ease(p*2-i*.2);if(amount<1e-7)continue;let na=ca+.175*p*amount*.75,nb=cb-.175*p*amount/6,xl=(-1.5-.55*ca)/(1+.55*cb),xh=(-1.5-.55*na)/(1+.55*nb);polygon([[xl,ca+cb*xl],[4.4,ca+cb*4.4],[4.4,na+nb*4.4],[xh,na+nb*xh]],['mud','sand','green','sand'][i]);ca=na;cb=nb;}let prev=x=>ca+cb*x;
  let bottom=-1.65-.8*p+slope*rightX(-1.65-.8*p);path([[cut(bottom),bottom,1.27],[cut(.03),.03,1.27]],'#463d31',.022);
  if(p>.84){let lo=x=>x<cut(.03)?.03:prev(x),q=ease((p-.84)/.16);ribbon(lo,x=>lo(x)+q*(.25-lo(x)),'sand',-4.4,4.4);}
  label('Older tilted beds',2.7,-.8,3.1);label(p>.84?'Younger cover overlaps the fault':'Growth fill thickens toward fault',.3,1.25,5.6);return;
 }
 let base=x=>-.55-.9*p*G(x/2.1);ribbon(()=>-2.1,base,'crust');let prev=base;for(let i=0;i<5;i++){let amount=ease(p*1.5-i*.13);let lo=prev;let hi=x=>lo(x)+amount*(.11+.15*G(x/2.1));ribbon(lo,hi,['sand','green','mud'][i%3]);prev=hi;}label('Sediment fill',0,.45,3);label('Subsiding crust',0,-1.4,3.6);arrow(-3.6,-.65,0,-.4);}
 function horst(p){for(let j=0;j<4;j++){let lo=-1.6+j*.55,hi=lo+.55;let c=y=>1.2+.42*y;let colors=['crust','mud','green','sand'];let left=polygon([[-4.5,lo],[-c(lo),lo],[-c(hi),hi],[-4.5,hi]],colors[j]);left.position.x=-.42*.85*p;let right=polygon([[c(lo),lo],[4.5,lo],[4.5,hi],[c(hi),hi]],colors[j]);right.position.x=.42*.85*p;let m=polygon([[-c(lo),lo],[c(lo),lo],[c(hi),hi],[-c(hi),hi]],colors[j]);m.position.y=-.85*p;}
 label('Horst',-3,.95,1.8);label('Graben',0,.8-.85*p,2);label('Horst',3,.95,1.8);arrow(-3.8,1.6,-.5,0);arrow(3.8,1.6,.5,0);}
 function differential(p){let pluton=x=>-.4+1.3*G(x/1.25);let sur=x=>1.1-1.25*p+.8*p*G(x/1.25);ribbon(()=>-1.8,x=>Math.min(pluton(x),sur(x)),'crust');ribbon(x=>Math.min(pluton(x),sur(x)),sur,'sand');label('Resistant rock',0,.1,3.7);label('Softer rock',-3,.2-.5*p,2.5);for(let i=0;i<10;i++){let q=(p+i/10)%1;rockBall(-1.2-3*q,1.1-1.25*p,.035,'sand');}}
 function mesa(p){
 let width=4.7-3.1*p,surface=x=>Math.abs(x)<width?.9:.9-1.35*p;
 ribbon(()=>-1.8,()=>-1.3,'crust');for(let i=0;i<4;i++){let a=-1.3+i*.55,b=a+.55;ribbon(x=>Math.min(a,surface(x)),x=>Math.min(b,surface(x)),['sand','mud','green','sand'][i]);}
 ribbon(()=>.9,()=>1.1,'caprock',-width,width);label('Resistant cap',0,1.6,3);label('Softer beds erode',0,-1.05,3.8);
 }
 function tiltRidge(p){
 let slope=.22,high=x=>.55+slope*x,level=1.45-1.8*p,surface=x=>Math.max(level,Math.min(1.45,high(x)));
 ribbon(()=>-3.0,x=>-1.65+slope*x,'crust');for(let i=0;i<6;i++){let a=-1.65+i*.55,b=a+.55;ribbon(x=>Math.min(a+slope*x,surface(x)),x=>Math.min(b+slope*x,surface(x)),['sand','mud','sand','crust','mud','sand'][i]);}
 label('Hard tilted bed',1.7,.77,3);label('Unequal erosion',-1.5,-1.9,3.2);
 }
 function lithosphere(p){let surface=x=>.45-.55*p;let boundary=x=>-.2-1.1*p;ribbon(()=>-2.3,boundary,'asthen');ribbon(boundary,x=>surface(x)-.32,'mantle');ribbon(x=>surface(x)-.32,surface,'basalt');ribbon(surface,()=>.65,water);label('Oceanic crust',0,.95,3.4);label('Mantle lithosphere',0,-.45,4);label('Asthenosphere',0,-1.9,3.5);}
 function foreland(p,loadOnLeft=false){
 let sign=loadOnLeft?-1:1;
 let bed=x=>.35+.95*p*G((sign*x-3)/1.1)-.7*p*G((sign*x+.5)/1.65),base=x=>-1.3-.4*p*G((sign*x-2)/2);
 ribbon(()=>-2.6,base,'mantle');ribbon(base,bed,'crust');let prev=bed;
 for(let i=0;i<4;i++){let lo=prev,hi=x=>lo(x)+.14*p*G((sign*x+.5)/1.65);ribbon(lo,hi,['sand','mud','green','sand'][i]);prev=hi;}
 // Thrusts dip back beneath the load, away from the foreland; both ends stay inside the cutaway.
 for(let i=0;i<2;i++){let x=sign*(1+i*.6);path([[x,bed(x),1.27],[sign*(3.6+i*.6),-.65,1.27]],'#463d31',.025);}
 for(let i=0;i<7;i++){let q=(p+i/7)%1;rockBall(sign*(2.4-q*3.7),.65+.35*(1-q),.035,'sand');}
 label('Thrust load',3*sign,1.8,2.5);label('Foreland basin',-.9*sign,.95,3.5);label('Flexed crust',-.7*sign,-1.0,3);arrow(-sign,-1.5,0,-.45);
 }
 function density(p){
 let high=.4+.7*p,low=.4;let lower=x=>x<0?high-1.5:low-1.5;
 ribbon(()=>-2.5,lower,'mantle');ribbon(()=>high-1.5,()=>high,'crust',-4.7,-.04);ribbon(()=>low-1.5,()=>low,'basalt',.04,4.7);
 label('Less dense',-2.4,high-.6,2.9);label('More dense',2.4,low-.6,2.9);label('Same crustal thickness',0,-2,4.4);
 }
 function load(p){
 let base=x=>-.75-.4*p*G(x/2),surface=x=>.3-.4*p*G(x/2);
 ribbon(()=>-2.5,base,'mantle');ribbon(base,surface,'crust');ribbon(surface,x=>surface(x)+1.4*p*G(x/1.5),'basalt');label('Volcanic load',0,1.8,3.4);label('Crust bends down',0,-.6,3.8);arrow(2.4,.7,0,-.5);
 }
 function plumb(p){
 let surf=x=>.45+1.25*G(x/2.1),base=x=>-.75-1.4*p*G(x/2.1);ribbon(()=>-3,base,'mantle');ribbon(base,surf,'crust');ribbon(surf,x=>surf(x)+.06,'green');
 let angle=.28-.18*p,x=-3,y=1.9;path([[x,y,1.3],[x+Math.sin(angle)*.8,y-Math.cos(angle)*.8,1.3]],'#e7ddc7',.023);rockBall(x+Math.sin(angle)*.8,y-Math.cos(angle)*.8,.1,'basalt');label(p>.5?'Lower-density crustal root':'No root in this comparison',0,-1.6,5);label('Compare gravitational deflection',0,1.9,5.5);
 }
 function fold(p){let w=x=>.55*p*Math.cos(x*.9);for(let i=0;i<5;i++)ribbon(x=>-1.6+i*.45+w(x),x=>-1.15+i*.45+w(x),['crust','sand','mud','green','sand'][i]);label('Folded layers',0,1.6,3.3);arrow(-4,1,-.1+.9*p,0);arrow(4,1,.1-.9*p,0);}
 function accrete(p,stitch=false,continental=false,east=false){let joined=stitch?ease(p/.5):p,gap=2.4*(1-joined);let left=stack(-4.3-gap/2,-gap/2),right=stack(gap/2,4.3+gap/2);(east?right:left).children.forEach((m,i)=>m.material=mats[(continental?['crust','mud','green','sand']:['basalt','mud','green','basalt'])[i]]);label(continental?'Continental fragment':'Incoming terrane',(east?1:-1)*(2.2+gap/2),1.5,3.5);label('Continental rocks',(east?-1:1)*(2.2+gap/2),1.5,3.2);if(joined>.98)label('Accretion boundary',0,-2.1,3.3);if(stitch&&p>.6){let q=ease((p-.6)/.4);let m=rockBall(0,-.3,.85*q);m.scale.set(1.4,1,.6);label('Younger intrusion crosses boundary',0,1.95,5.6);}else{arrow(-3,2.4,1,0);arrow(3,2.4,-1,0);}}
 function rift(p){
 let opening=ease((p-.25)/.75),gap=.04+3.0*opening;
 ribbon(()=>-2.1,()=>-1.7,'asthen');
 for(let side of [-1,1]){
  let inner=gap/2+.03,outer=4.7;
  let coast=x=>Math.max(0,Math.min(1,(Math.abs(x)-inner)/1.35));
  let bottom=x=>-1.0-.7*coast(x);
  let top=x=>-.42+.95*coast(x)-.12*opening;
  let x0=side<0?-outer:inner,x1=side<0?-inner:outer;
  ribbon(bottom,top,'crust',x0,x1);
  ribbon(()=>-1.7,bottom,'mantle',x0,x1);
  ribbon(top,x=>Math.max(top(x),-.16),water,x0,x1);
  if(opening>.5)ribbon(top,x=>top(x)+.13*(1-coast(x))*opening,'sand',x0,x1);
 }
 ribbon(()=>-1.7,()=>-.7,'mantle',-gap/2,gap/2);
 ribbon(()=>-.7,()=>-.47,'basalt',-gap/2,gap/2);
 ribbon(()=>-.47,()=>-.16,water,-gap/2,gap/2);
 if(opening>.02)path([[0,-1.6,1.3],[0,-.65,1.3]],'#e98b5d',.055);
 label('Continental crust',-3,.05,2.7);label('Continental crust',3,.05,2.7);
 if(opening>.35)label('New oceanic crust',0,-.95,3.8);else label('Thinning rift',0,1.3,3);
 arrow(-2,1.5,-.8,0);arrow(2,1.5,.8,0);
 }
 function plume(p,triple=false){ribbon(()=>-2,()=>.35,'mantle');ribbon(()=>.35,x=>.8+.6*p*G(x/2),'crust');let m=rockBall(0,-.7+.65*p,.75,'asthen');m.scale.set(1.4,.7,1);path([[0,-2,1.3],[0,-1,1.3],[0,-.2+.3*p,1.3]],'#c29c62',.22);label('Hot, mostly solid upwelling',0,-2.25,5.5);label('Doming and stretching',0,2.4,4.7);if(triple){for(let angle of [0,2.1,4.2]){let dx=Math.cos(angle)*2.9,dz=Math.sin(angle)*1.0;path([[0,1.05+.45*p,0],[dx/2,1.0+.4*p,dz/2],[dx,.9+.2*p,dz]],'#17242a',.025+.06*p);}label('Three rift arms',0,.35,3);}}
 function volcano(p){let s=x=>.25+1.75*p*Math.max(0,1-Math.abs(x)/2.2);ribbon(()=>-1.6,()=>.25,'crust');ribbon(()=>.25,s,'basalt');for(let i=0;i<4;i++){let q=ease(p*1.3-i*.13);path([[-2*q,.3,1.3],[0,.3+1.5*q,1.3],[2*q,.3,1.3]],'#a28e78',.025);}label('Lava • ash • scoria',0,2.5,4.1);label('Preexisting crust',0,-.7,3.3);}
 function arch(p){
 let curve=x=>.18*p*G((x+.8)/3.1)-.035*x;
 ribbon(()=>-1.9,x=>-.6+curve(x),'crust');
 for(let i=0;i<5;i++)ribbon(x=>-.6+i*.22+curve(x),x=>-.38+i*.22+curve(x),['sand','mud','green','sand','mud'][i]);
 label('Broad arch',-.7,1.3,2.6);label('Vertical scale exaggerated',0,-2.3,5.5);
 }
 function inundate(p){
 let land=x=>.6-.12*(x+4.7),thick=x=>.72*ease((x+2.2)/1.0),base=x=>land(x)-thick(x),level=-.25+.9*p;
 ribbon(()=>-1.9,base,'crust');
 for(let i=0;i<4;i++)ribbon(x=>base(x)+thick(x)*i/4,x=>base(x)+thick(x)*(i+1)/4,['sand','mud','green','sand'][i]);
 ribbon(x=>Math.min(land(x),level),()=>level,water);
 label('Shoreline moves inland',0,1.4,4.6);label('Older basement and cover',0,-1.3,4.7);
 }
 function remnant(p){
 let core=x=>.25+1.35*Math.exp(-Math.pow(x/.8,6)),outer=x=>.25+1.75*(1-p)*Math.max(0,1-Math.abs(x)/2.2);
 ribbon(()=>-1.6,()=>.25,'crust');ribbon(()=>.25,core,'basalt');ribbon(core,x=>Math.max(core(x),outer(x)),'mud');
 label('Resistant volcanic remnant',0,2,5.2);label('Surrounding rock erodes',0,-.7,4.6);
 }
 function cover(p,flood=false){let base=x=>-.4+.35*G((x+3)/1.3);ribbon(()=>-1.8,base,'crust');for(let i=0;i<4;i++)ribbon(x=>base(x)+i*.18*p,x=>base(x)+(i+1)*.18*p,['sand','mud','green','sand'][i],-1.7,4.6);label('Exposed shield',-3,1.1,2.7);label('Sedimentary platform',1.8,1.1,4);label('Crystalline basement',0,-1.2,4.1);if(flood)ribbon(x=>Math.min(.15+.65*p,base(x)+.72*p),()=>.15+.65*p,water,-1.5,4.7);}
 function pullapart(p){let left=stack(-4.4,-.5),right=stack(.5,4.4);left.position.z=-p*.9;right.position.z=p*.9;ribbon(()=>-1.5,()=>-.55*p,'mud',-.48,.48,1.25+p*.4);label('Releasing step',0,2.15,3.3);arrow(-2,1,0,-.65);arrow(2,1,0,.65);label('Pull-apart basin',0,-2.2,3.1);}
 function passive(p,east=false){let sign=east?-1:1;
 let floor=x=>-.5-.22*p,coast=x=>ease((sign*x+1.5)/2.0),surface=x=>floor(x)+1.1*coast(x),base=x=>-1.2-1.0*coast(x);
 ribbon(()=>-2.7,base,'mantle');ribbon(base,surface,'crust',east?-4.7:-2.8,east?2.8:4.7);ribbon(()=>-1.2,floor,'basalt',east?2.8:-4.7,east?4.7:-2.8);
 ribbon(x=>Math.min(surface(x),-.12),()=>-.12,water,east?-4.7:-2.8,east?2.8:4.7);ribbon(floor,()=>-.12,water,east?2.8:-4.7,east?4.7:-2.8);
 let lo=surface,hi=x=>lo(x)+.16*p*G((sign*x+1.3)/1.2);ribbon(lo,hi,'sand',east?-2.2:-2.8,east?2.8:2.2);
 label('Passive continental margin',.6*sign,1.5,5.3);label('Thinned continental edge',0,-1.0,4.7);
 }
 function transform(p){
 for(let side of [-1,1]){let x0=side<0?-4.3:.05,x1=side<0?-.05:4.3,g=stack(x0,x1);g.position.z=side*.95*p;
 let marker=new T.Mesh(new T.BoxGeometry(x1-x0,.035,.16),mats.basalt);marker.position.set((x0+x1)/2,.625,side*.95*p);add(marker);
 let ar=new T.ArrowHelper(new T.Vector3(0,0,side),new T.Vector3(side*2,.95,0),.9,0x70c8e4,.25,.15);add(ar);}
 label('Offset marker',0,1.8,3);label('Strike-slip motion',0,-2.1,3.7);
 }
 function drift(p,collision=false){let gap=collision?2.6*(1-p):.3+2.5*p;let sea=ribbon(()=>-1.2,()=>-.8,water);for(let side of [-1,1]){let x=side*(1.8+gap/2);let top=v=>.2+.45*G((v-x)/1.4)+.11*Math.cos(v*4);ribbon(()=>-.75,top,'crust',x-1.5,x+1.5,1.4);label(side<0?'Continental block A':'Continental block B',x,1.4,3.1);}label(collision?'Convergence • collision':'Breakup • ocean opening',0,-2.1,5.2);}
 function pose(mode,p){p=clamp(p);dispose();switch(mode){case'forelandWest':foreland(p,true);break;case'foreland':foreland(p);break;case'density':density(p);break;case'load':load(p);break;case'horst':horst(p);break;case'mesa':mesa(p);break;case'tiltRidge':tiltRidge(p);break;case'differential':differential(p);break;case'lithosphere':lithosphere(p);break;case'plumb':plumb(p);break;case'root':terrain(p,{rooted:true});break;case'heat':terrain(p,{heat:true});break;case'cool':terrain(p,{cooling:true});break;case'erosion':terrain(p,{rooted:true,erode:true});break;case'shorten':faults(p,false,true);break;case'fault':faults(p,false,false);break;case'rotate':faults(p,true);break;case'subduct':subduction(p);break;case'rollback':subduction(p,true);break;case'flatSlab':subduction(p,false,true);break;case'basin':basin(p);break;case'growth':basin(p,true);break;case'fold':fold(p);break;case'terrane':accrete(.25+.75*p);break;case'accrete':accrete(p);break;case'stitch':accrete(p,true);break;case'rift':rift(p);break;case'plume':plume(p);break;case'triple':plume(p,true);break;case'hotspot':plume(.5);for(let i=0;i<6;i++){let onset=i*.2;if(p<onset)continue;let q=p-onset,x=-q*4.2,ring=new T.Mesh(new T.TorusGeometry(.29,.035,8,32),mats.basalt);ring.rotation.x=Math.PI/2;ring.position.set(x,.82+.3*G(x/2),0);add(ring);let floor=new T.Mesh(new T.CircleGeometry(.27,24),mats.mud);floor.rotation.x=-Math.PI/2;floor.position.set(x,.805+.3*G(x/2),0);add(floor);}arrow(-2,1.7,-1,0);label('Calderas carried with the plate',0,1.95,5.4);break;case'remnant':remnant(p);break;case'volcano':volcano(p);break;case'arch':arch(p);break;case'cover':cover(p);break;case'flood':inundate(p);break;case'pullapart':pullapart(p);break;case'collision':terrain(p,{rooted:true});arrow(-4,1.8,.8,0);arrow(4,1.8,-.8,0);label('Continental collision • thickening',0,2.9,6.5);break;case'accreteEast':accrete(p,false,false,true);break;case'fragment':accrete(p,false,true);break;case'passiveEast':passive(p,true);break;case'passive':passive(p);break;case'transform':transform(p);break;case'drift':drift(p);break;case'investigate':subduction(p);break;default:throw new Error('Unknown geological model: '+mode);}if(mode!=='hotspot')root.position.x=0;lastMode=mode;return {mode,physicalProgress:p,objects:objects.length};}
 pose('root',0);renderer.compile(scene,camera);return {scene,camera,pose};
}
