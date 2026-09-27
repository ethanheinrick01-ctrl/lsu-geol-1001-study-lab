/* Regression: saved work must reach mastery, and every drill must offer a way forward. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict'),cp=require('child_process');
const root=path.resolve(__dirname,'..');let clock=1800000000000,checks=0;
class Clock extends Date{constructor(...a){super(...(a.length?a:[clock]));}static now(){return ++clock;}}
function load(disk={},backup){
 const c={console,Math,Date:Clock,JSON,setTimeout(){},document:{readyState:'loading',addEventListener(){}},localStorage:{getItem(k){return disk[k]||null;},setItem(k,v){disk[k]=v;}}};c.window=c;vm.createContext(c);
 const read=f=>backup?cp.execFileSync('tar',['-xOf',backup,f],{encoding:'utf8'}):fs.readFileSync(path.join(root,f),'utf8');
 for(const [,url]of read('index.html').matchAll(/<script src="([^"]+)"/g)){const f=url.split('?')[0];if(f!=='js/app.js')vm.runInContext(read(f),c,{filename:f});}
 c.L.engine.build();return c.L;
}
function test(name,fn){fn();checks++;console.log('PASS '+name);}
const disk={},L=load(disk),E=L.engine,S=L.store,X=L.exam1;
function blank(){S._setMem(S._blank());E.build();S.save();}
const key=it=>it.t==='mc'||it.t==='tf'?it.o.findIndex(o=>o.ok):it.t==='ms'?it.o.flatMap((o,i)=>o.ok?[i]:[]):it.t==='fill'?it.acc[0]:it.t==='num'?it.a:it.t==='match'?it.pairs.map(p=>p[1]):it.t==='parts'?it.parts.map(p=>p.a):it.t==='order'?it.seq:it.model;
function checkRun(r){for(const id of X.allIds(r)){const it=E.resolve({id});X.answer(r,id).draft=key(it);assert.ok(X.check(r,id,'m'),id);if(it.t==='teach')X.selfMark(r,id,it.rubric.map(()=>true));}}
function twice(id){for(let n=0;n<2;n++){const r=X.start([{n:1,section:'drill',ids:[id]}],'Saved topic practice',{mode:'drill'});checkRun(r);}}
if(process.env.GEOL_MASTERY_BASELINE)test('Every existing question, answer key, concept and storage key is preserved',()=>{
 const old=load({},process.env.GEOL_MASTERY_BASELINE);for(const [id,it]of Object.entries(old.engine.REG()))assert.equal(JSON.stringify(E.REG()[id]),JSON.stringify(it),id);
 assert.equal(JSON.stringify(L.CONCEPTS),JSON.stringify(old.CONCEPTS));assert.equal(S.KEY,old.store.KEY);
});
test('Repeated correct igneous question stays saved; a new drill immediately offers the missing independent question',()=>{
 blank();const id='e1v1-B-T1-mc1',c='c1-igintro';S.load().masteryCredits={'c1-cycle':'earned','c1-sedenv':'earned'};twice(id);
 const before=JSON.stringify(S.load().examRuns),st=E.conceptStats()[c];assert.equal(st.att,2);assert.equal(st.independentCorrect,1);assert.equal(X.topicMetrics(X.topic('T1')).mastered,2);
 for(const diagram of [false,true]){const next=X.selectDrill('T1',diagram)[0];assert.equal(E.resolve({id:next}).c,c);assert.notEqual(next,id);}
 const run=X.drill('T1',false,c),next=run.groups[0].ids[0];X.answer(run,next).draft=key(E.resolve({id:next}));X.check(run,next,'m');
 assert.equal(X.topicMetrics(X.topic('T1')).mastered,3);assert.equal(E.conceptStats()[c].att,3);assert.equal(JSON.stringify(S.load().examRuns.slice(0,2)),before);
 const fresh=load(disk);assert.equal(fresh.engine.conceptStats()[c].status,'mastered');assert.equal(fresh.engine.allAttempts().length,3);
});
test('All 16 topic and figure pools have two independent automatic questions for every displayed concept',()=>{
 blank();for(const t of L.EXAM1.topics)for(const diagram of [false,true]){
  const pool=X.drillPool(t.id,diagram);for(const c of t.concepts){const roots=new Set(pool.filter(it=>it.c===c).map(it=>it.masteryRoot||it.id));assert.ok(roots.size>=2,t.id+' '+c+' diagram='+diagram+' roots='+roots.size);}
  assert.ok(!pool.some(it=>it.t==='teach'));
  for(const it of pool){assert.ok(it.pool==='exam1'||L.EXAM1.foundationIds.includes(it.id));assert.ok(it.s.length);if(it.media)for(const m of [].concat(it.media))assert.equal(m.kind,'img');}
 }
});
test('Every topic reaches full mastery within three successful topic or figure drills, without another mode',()=>{
 for(const t of L.EXAM1.topics)for(const diagram of [false,true]){
  blank();for(let n=0;n<3&&X.topicMetrics(t).mastered<t.concepts.length;n++){const r=X.drill(t.id,diagram);if(diagram)for(const g of r.groups)assert.equal((g.media||E.resolve({id:g.ids[0]}).media).kind,'img');checkRun(r);}
  assert.equal(X.topicMetrics(t).mastered,t.concepts.length,t.id+' diagram='+diagram);
 }
});
test('Targeted concept buttons always provide two different questions in the chosen topic',()=>{
 blank();for(const t of L.EXAM1.topics)for(const c of t.concepts){const ids=X.selectDrill(t.id,false,c);assert.equal(ids.length,2,t.id+' '+c);assert.equal(new Set(ids).size,2);for(const id of ids)assert.equal(E.resolve({id}).c,c);}
});
test('All 102 broader-course concepts can earn mastery from two ordinary practice questions',()=>{
 for(const c of Object.keys(L.CONCEPTS)){
  blank();const refs=E.practiceRefs({concepts:[c],n:2});assert.equal(refs.length,2,c);const sess=E.newSession('practice','Coverage check',refs,{noRetry:true});
  for(const ref of refs){const it=E.resolve(ref);assert.equal(it.c,c);E.answerInSession(key(it),'m',false);E.advance();}
  assert.equal(E.conceptStats()[c].status,'mastered',c);assert.equal(sess.results.length,2);
 }
});
test('Ordinary practice and review prioritize unfinished mastery and offer a different question',()=>{
 blank();const c='c1-igintro',one='c1-igintro-f1';for(const id of Object.keys(L.CONCEPTS))if(id!==c)S.load().masteryCredits[id]='earned';
 E.record(E.resolve({id:one}),{id:one},'igneous','m','practice');
 for(const refs of [E.practiceRefs({n:1}),E.reviewRefs(1)]){assert.equal(E.resolve(refs[0]).c,c);assert.notEqual(refs[0].id,one);}
});
test('Topic totals include repeats and every mode, while corrections and rubric checks stay separate',()=>{
 blank();const c='c1-igintro',id='e1v1-B-T1-mc1';twice(id);
 const other=E.resolve({id:'c1-igintro-f1'});for(const mode of ['practice','review','case','boss','mock'])E.record(other,{id:other.id},'igneous','m',mode);
 const run=X.start([{n:1,section:'drill',ids:[id]}],'Correction check',{}),it=E.resolve({id}),a=X.answer(run,id);a.draft=it.o.findIndex(o=>!o.ok);X.check(run,id,'h');X.retry(run,id);a.draft=key(it);X.check(run,id,'m');
 let m=X.topicMetrics(X.topic('T1'));assert.equal(m.total,9);assert.equal(m.auto,8);assert.equal(m.correct,7);assert.equal(m.corrected,1);assert.ok(m.needs.includes(c));
 const teach=E.itemsFor(it=>it.t==='teach'&&X.topic('T1').concepts.includes(it.c))[0];E.record(teach,{id:teach.id},{self:'got',response:teach.model,rubric:teach.rubric.map(()=>true)},'m','case');
 m=X.topicMetrics(X.topic('T1'));assert.equal(m.total,10);assert.equal(m.auto,8);assert.equal(m.self,1);assert.equal(m.selfGood,1);
 const exported=S.exportJSON(),reloaded=load(disk),imported=load();assert.ok(imported.store.importText(exported).ok);assert.ok(imported.store.importText(exported).ok);
 for(const lab of [reloaded,imported])assert.equal(JSON.stringify(lab.exam1.topicMetrics(lab.exam1.topic('T1'))),JSON.stringify(m));
});
test('Mastery explanations distinguish repeats, hints, low confidence and earned mastery',()=>{
 blank();const c='c1-igintro',s=S.load();s.attempts=[{i:'a',c,ok:true,cf:'m',t:1},{i:'a',c,ok:true,cf:'m',t:2},{i:'b',c,ok:true,cf:'m',h:1,t:3}];
 let st=E.conceptStats()[c];assert.equal(st.independentCorrect,1);assert.match(E.masteryNote(st),/1\/2/);
 s.attempts.push({i:'b',c,ok:true,cf:'l',t:4});st=E.conceptStats()[c];assert.notEqual(st.status,'mastered');assert.match(E.masteryNote(st),/confidence/);
 s.attempts.push({i:'b',c,ok:true,cf:'m',t:5});st=E.conceptStats()[c];assert.equal(st.status,'mastered');assert.match(E.masteryNote(st),/earned/);
});
test('Every actual case and Boss exercise records all answer parts in shared history',()=>{
 const modes=[...L.CASES.filter(c=>c.exam1).map(c=>({mode:'case',id:c.id,refs:()=>E.caseRefs(c.id)})),...L.BOSSES.map(b=>({mode:'boss',id:b.id,refs:()=>E.bossRefs(b.id)}))];
 for(const exercise of modes){blank();const refs=exercise.refs(),sess=E.newSession(exercise.mode,exercise.id,refs,{noRetry:true});
  for(const ref of refs){const it=E.resolve(ref);E.answerInSession(it.t==='teach'?{self:'got',response:it.model,rubric:it.rubric.map(()=>true)}:key(it),'m',false);E.advance();}
  assert.equal(E.allAttempts().length,refs.length,exercise.id);assert.equal(Object.values(E.conceptStats()).reduce((n,s)=>n+s.att,0),refs.length);assert.equal(sess.results.length,refs.length);
 }
});
test('Every short-answer workshop item joins shared history after checking or rubric assessment',()=>{
 for(const it of E.itemsFor(it=>it.pool==='exam1'&&!it.caseId&&(it.t==='teach'||it.t==='fill'))){blank();const r=X.start([{n:1,section:'sa',ids:[it.id]}],'Writing',{});checkRun(r);assert.equal(E.allAttempts().length,1,it.id);assert.equal(E.conceptStats()[it.c].att,1);}
});
console.log('TOTAL',checks,'mastery coverage checks passed');
