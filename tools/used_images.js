/* Lists every image path the app can display: item/card/case media, source-slide strips, and literal paths in code. */
const fs=require('fs'),path=require('path'),vm=require('vm');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const ctx={console,Math,Date,JSON,Object,Array,String,Number,parseFloat,parseInt,isNaN,Error,localStorage:{getItem(){return null},setItem(){}},document:{addEventListener(){}},location:{hash:''},addEventListener(){}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const s of scripts){if(s.endsWith('app.js'))continue;vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx);}
const L=ctx.L,E=L.engine;E.build();const used=new Set();
function walk(m){if(!m)return;if(Array.isArray(m))return m.forEach(walk);if(m.kind==='img')used.add(m.src);}
Object.values(E.REG()).forEach(it=>walk(it.media));Object.values(L.GUIDE).flat().forEach(c=>walk(c.media));L.CASES.forEach(c=>walk(c.media));
const D={'Lec 1b':['l1b',31],'Lec 2':['l2',32],'Lec 3':['l3',45]};
L.SECTIONS.forEach(sec=>String(sec.srcText||'').split('·').forEach(part=>{part=part.split('(')[0].trim();Object.keys(D).forEach(k=>{if(part.indexOf(k+' ')!==0)return;const re=/s(\d+)(?:–(\d+))?/g;let m;while((m=re.exec(part))){const a=+m[1],b=m[2]?+m[2]:a;for(let i=a;i<=b&&i<=D[k][1];i++)used.add('assets/img/slides/'+D[k][0]+'-slide-'+i+'.jpg');}});}));
scripts.concat(['index.html']).forEach(s=>{const t=fs.readFileSync(path.join(root,s),'utf8');for(const m of t.matchAll(/assets\/img\/[\w\/.-]+\.(?:jpg|png|svg)/g))used.add(m[0]);});
console.log([...used].sort().join('\n'));
