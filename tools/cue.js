const fs=require('fs'),path=require('path'),vm=require('vm');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const ctx={console,Math,Date,JSON,Object,Array,String,Number,parseFloat,parseInt,isNaN,Error,localStorage:{getItem(){return null},setItem(){}},document:{addEventListener(){}},location:{hash:''},addEventListener(){}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const s of scripts){if(s.endsWith('app.js'))continue;vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx);}
const L=ctx.L;L.engine.build();const R=L.engine.REG();const ch=process.argv[2];
Object.keys(R).forEach(id=>{const it=R[id];if(it.t!=='mc')return;if(ch&&!id.startsWith(ch))return;const lens=it.o.map(o=>o.t.length),mx=Math.max(...lens),k=it.o.findIndex(o=>o.ok);
if(lens[k]===mx&&lens.filter(x=>x===mx).length===1){console.log('## '+id);it.o.forEach(o=>console.log((o.ok?'* ':'- ')+o.t));}});
if(process.argv[2]==='--margin'){let n=0,t=0;Object.keys(R).forEach(id=>{const it=R[id];if(it.t!=='mc')return;t++;const l=it.o.map(o=>o.t.length),k=it.o.findIndex(o=>o.ok);const others=l.filter((_,i)=>i!==k);const m=Math.max(...others);if(l[k]>m*1.25){n++;console.log('>> '+id+' key '+l[k]+' vs '+m+' :: '+it.o[k].t+' || '+it.o.filter(o=>!o.ok).map(o=>o.t).join(' | '));}});console.log('clear-margin longest keyed:',n+'/'+t);}
if(process.argv[2]==='--short'){let n=0,t=0;Object.keys(R).forEach(id=>{const it=R[id];if(it.t!=='mc')return;t++;const l=it.o.map(o=>o.t.length),k=it.o.findIndex(o=>o.ok),mn=Math.min(...l);if(l[k]===mn&&l.filter(x=>x===mn).length===1)n++;});console.log('key uniquely shortest:',n+'/'+t);}
