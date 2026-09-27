const fs=require('fs'),path=require('path'),vm=require('vm');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const ctx={console,Math,Date,JSON,Object,Array,String,Number,parseFloat,parseInt,isNaN,Error,localStorage:{getItem(){return null},setItem(){}},document:{addEventListener(){}},location:{hash:''},addEventListener(){}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const s of scripts){if(s.endsWith('app.js'))continue;vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx);}
const L=ctx.L,E=L.engine;E.build();const R=E.REG();const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const blind=[],key={};
Object.keys(R).sort().forEach(id=>{const it=R[id];let ctxs='';if(it.caseId){const cs=E.caseById(it.caseId);ctxs=strip(cs.stem);}
 const med=it.media?JSON.stringify(it.media).slice(0,300):'';
 if(it.t==='mc'||it.t==='ms'||it.t==='tf'){const o=it.o.map(x=>x.t);blind.push({id,type:it.t,context:ctxs||undefined,q:strip(it.q),options:o.map((t,i)=>String.fromCharCode(65+i)+'. '+t),diagram:med?'(diagram spec) '+med:undefined});key[id]=it.o.map((x,i)=>x.ok?String.fromCharCode(65+i):null).filter(Boolean).join(',');}
 else if(it.t==='fill'){blind.push({id,type:'fill',context:ctxs||undefined,q:strip(it.q)});key[id]=it.acc.join(' / ');}
 else if(it.t==='parts'){blind.push({id,type:'parts',context:ctxs||undefined,q:strip(it.q),parts:it.parts.map(p=>p.label+': ['+p.options.join(' | ')+']'),diagram:med?'(diagram spec) '+med:undefined});key[id]=it.parts.map(p=>p.label+'='+p.a).join('; ');}
 else if(it.t==='match'){blind.push({id,type:'match',q:strip(it.q),left:it.pairs.map(p=>p[0]),right:[...new Set(it.pairs.map(p=>p[1]))].sort()});key[id]=it.pairs.map(p=>p[0]+'='+p[1]).join('; ');}
 else if(it.t==='order'){blind.push({id,type:'order',context:ctxs||undefined,q:strip(it.q),items:[...it.seq].sort()});key[id]=it.seq.join(' > ');}
 else if(it.t==='num'){blind.push({id,type:'num',context:ctxs||undefined,q:strip(it.q)});key[id]=String(it.a);}
});
fs.writeFileSync('/home/claude/w/blind.json',JSON.stringify(blind,null,0));fs.writeFileSync('/home/claude/w/key.json',JSON.stringify(key,null,1));console.log(blind.length);
