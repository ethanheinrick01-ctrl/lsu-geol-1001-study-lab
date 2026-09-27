/* Generates docs/EVIDENCE_MAP.md from the live content: source → section → concept → practice. */
const fs=require('fs'),path=require('path'),vm=require('vm');const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
const ctx={console,Math,Date,JSON,Object,Array,String,Number,parseFloat,parseInt,isNaN,Error,localStorage:{getItem(){return null},setItem(){}},document:{addEventListener(){}},location:{hash:''},addEventListener(){}};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const s of scripts){if(s.endsWith('app.js'))continue;vm.runInContext(fs.readFileSync(path.join(root,s),'utf8'),ctx);}
const L=ctx.L,E=L.engine;E.build();const R=E.REG();
const T={mc:'MC',ms:'select-all',tf:'T/F',fill:'fill-in',match:'match',order:'order',parts:'diagram/parts',num:'numeric',teach:'teach-back'};
const out=[];const P=s=>out.push(s);
P('# Evidence map: source → teaching → practice');P('');
P('Generated from the lab\'s content files by `tools/report.js`. Every card and item cites source codes; the code table is in `SOURCE_LEDGER.md`. Tiers: 1 = instructor/official, 2 = course content (slides, recordings, textbook), 3 = your notes, 4 = lab design or inference.');P('');
const totals={};Object.values(R).forEach(it=>{const k=it.pool==='boss'?'boss':it.caseId?'case':'core';totals[k]=(totals[k]||0)+1;});
P('**Totals:** '+Object.keys(R).length+' graded or self-check items ('+totals.core+' core practice, '+(totals.case||0)+' investigation-case parts, '+(totals.boss||0)+' Boss-only integrative items), '+Object.keys(L.GEN).length+' seeded generators, '+Object.keys(L.CONCEPTS).length+' concepts, '+L.SECTIONS.length+' guide sections, '+Object.values(L.GUIDE).reduce((a,b)=>a+b.length,0)+' teaching cards.');P('');
const tierCount={};Object.values(R).forEach(it=>{tierCount[it.tier]=(tierCount[it.tier]||0)+1;});P('**Items by evidence tier:** '+Object.keys(tierCount).sort().map(t=>'tier '+t+': '+tierCount[t]).join(' · '));P('');
for(let ch=1;ch<=6;ch++){P('## '+L.CHAPTERS[ch].name);P('');P('_Evidence:_ '+L.CHAPTERS[ch].evidence);P('');
 L.SECTIONS.filter(s=>s.ch===ch).forEach(sec=>{P('### '+sec.n+' '+sec.title);P('Sources: '+sec.srcText);P('');
  P('| Concept | Teaching cards | Core items (types) | Case parts | Boss-only | Generator |');P('|---|---|---|---|---|---|');
  Object.keys(L.CONCEPTS).filter(c=>L.CONCEPTS[c].sec===sec.id).forEach(c=>{
   const cards=(L.GUIDE[sec.id]||[]).filter(cd=>(cd.c||[]).includes(c)).map(cd=>cd.h).join('; ');
   const its=Object.values(R).filter(it=>it.c===c);const core=its.filter(it=>!it.caseId&&it.pool!=='boss');const types={};core.forEach(it=>types[T[it.t]]=(types[T[it.t]]||0)+1);
   P('| '+L.CONCEPTS[c].name+' | '+cards.replace(/\|/g,'/')+' | '+core.length+' ('+Object.entries(types).map(([k,v])=>v+' '+k).join(', ')+') | '+its.filter(it=>it.caseId).length+' | '+its.filter(it=>it.pool==='boss').length+' | '+((L.GEN_FOR[c]||[]).join(', ')||'n/a')+' |');});
  P('');});}
P('## Investigation cases');P('');P('| Case | Chapter | Parts | Concepts |');P('|---|---|---|---|');
L.CASES.forEach(cs=>P('| '+cs.title+' | '+cs.ch+' | '+cs.items.length+' | '+[...new Set(cs.items.map(i=>L.CONCEPTS[i.c].name))].join('; ')+' |'));P('');
P('## Boss drills');P('');P('| Boss | Questions | Boss-only integrative | Core items | Case |');P('|---|---|---|---|---|');
L.BOSSES.forEach(b=>{const n=E.bossRefs(b.id).length;P('| '+b.title+' | '+n+' | '+b.bossOnly.length+' ('+Math.round(100*b.bossOnly.length/n)+'%) | '+(b.refs.length-b.bossOnly.length)+' | '+((b.cases||[]).map(c=>E.caseById(c).title).join(', ')||'none')+' |');});P('');
P('## Source usage (items citing each source)');P('');P('| Code | Source | Tier | Items | Cards |');P('|---|---|---|---|---|');
const byS={},byC={};Object.values(R).forEach(it=>new Set((it.s||[]).map(c=>L.srcParse(c).base)).forEach(b=>byS[b]=(byS[b]||0)+1));
Object.values(L.GUIDE).flat().forEach(cd=>new Set((cd.src||[]).map(c=>L.srcParse(c).base)).forEach(b=>byC[b]=(byC[b]||0)+1));
Object.keys(L.SOURCES).forEach(k=>P('| '+k+' | '+L.SOURCES[k].t+' | '+L.SOURCES[k].tier+' | '+(byS[k]||0)+' | '+(byC[k]||0)+' |'));
fs.writeFileSync(path.join(root,'docs/EVIDENCE_MAP.md'),out.join('\n')+'\n');console.log('ok',out.length,'lines',JSON.stringify(tierCount),JSON.stringify(byS));
