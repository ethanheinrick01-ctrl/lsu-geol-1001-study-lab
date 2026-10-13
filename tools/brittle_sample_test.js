/* Behavioral tests in disposable VM storage. Never reads a browser profile. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');let now=Date.parse('2026-10-08T18:00:00Z'),passed=0;
class Clock extends Date{constructor(...a){super(...(a.length?a:[now]));}static now(){return ++now;}}
function load(hostname='127.0.0.1',disk={}){
  const c={console,Math,Date:Clock,Intl,JSON,setTimeout(){},location:{protocol:'http:',hostname},document:{readyState:'loading',addEventListener(){}},localStorage:{getItem(k){return disk[k]||null;},setItem(k,v){disk[k]=String(v);}}};
  c.window=c;vm.createContext(c);
  for(const [,src] of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g)){
    const file=src.split('?')[0];if(file==='js/app.js')continue;vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});
  }
  c.L.engine.build();return c.L;
}
let disk={},L=load('127.0.0.1',disk),E=L.engine,S=L.store,B=L.brittleDuctile;
function test(name,fn){fn();passed++;console.log('PASS '+name);}
function fresh(){disk={};L=load('127.0.0.1',disk);E=L.engine;S=L.store;B=L.brittleDuctile;L.examScope.select('exam2');now=Date.parse('2026-10-08T18:00:00Z');}
function right(it){return it.pairs?it.pairs.map(x=>x[1]):it.o?it.o.findIndex(o=>o.ok):{response:'My own answer',self:'got',rubric:it.rubric.map(()=>true)};}
function session(ids,options={}){return E.newSession('practice','Figure test',ids.map(id=>({id:'e2-bd-'+id})),Object.assign({examId:'exam2',noRetry:true,back:'exam2/topic/E2T7'},options));}
function answer(ok=true,cf='m',hint=false){const q=S.load().session.queue[S.load().session.idx],it=E.resolve(q.ref);let r=right(it);if(!ok)r=it.pairs?it.pairs.map(()=> 'Wrong'):it.o?it.o.findIndex(o=>!o.ok):{response:'Incomplete',self:'miss',rubric:it.rubric.map(()=>false)};E.answerInSession(r,cf,hint);E.advance();return r;}
function practiceDay(ids){session(ids);ids.forEach(()=>answer());E.endSession();}
test('Published and local figure lessons share nine tasks and retain old item records',()=>{
  const pub=load('ethanheinrick01-ctrl.github.io');assert.ok(pub.brittleDuctile);assert.equal(E.itemsFor(x=>x.practiceTrack==='e2-brittle').length,9);
  assert.equal(pub.engine.itemsFor(x=>x.examId==='exam2').length,169);
  for(const [id,item] of Object.entries(pub.engine.REG()))if(item.practiceTrack!=='e2-brittle')assert.equal(JSON.stringify(E.REG()[id]),JSON.stringify(item),id);
  assert.ok(!pub.brittleDuctile.sourceHTML(pub.engine.resolve({id:'e2-bd-labels'})).includes('classroom-display'));
  assert.equal(S.KEY,pub.store.KEY);assert.equal(L.examScope.concepts('exam2').length,31);assert.equal(L.EXAMS.exam2.mocks,false);
});
test('All new answers, concepts, source references, and retry roots resolve',()=>{
  for(const it of E.itemsFor(x=>x.practiceTrack==='e2-brittle')){
    assert.ok(L.CONCEPTS[it.c]);assert.ok(L.SECTIONS.some(s=>s.id===it.sec));
    it.s.forEach(s=>assert.ok(L.srcParse(s).src,s));
    if(it.t!=='teach')assert.ok(E.grade(it,right(it)).ok,it.id);else assert.equal(it.rubric.length,4);
    (it.retryIds||[]).forEach(id=>assert.ok(E.resolve({id}).practiceTrack));
  }
});
test('Numbered word-bank rows do not reveal labels; source pixels stay in the exercise',()=>{
  for(const id of ['e2-bd-labels','e2-bd-outcomes']){
    const it=E.resolve({id});assert.ok(it.pairs.every(p=>/^\d$/.test(p[0])));
    const svg=L.MEDIA[it.media.name](it.media.spec);assert.match(svg,/strength-source\.png/);assert.match(svg,/strength-curve\.png/);
    const revealed=L.MEDIA[it.media.name](it.media.spec,{reveal:true});assert.ok(!revealed.includes('mask="url('));
  }
  assert.match(B.sourceHTML(E.resolve({id:'e2-bd-labels'})),/assets\/img\/exam2\/brittle-ductile\/strength-source.png/);
});
test('Generic concept mastery cannot substitute for the new figure record',()=>{
  fresh();['e2-8.1-m1','e2-8.1-m2'].forEach(id=>{const it=E.resolve({id});E.record(it,{id},right(it),'h','practice');});
  assert.equal(E.conceptStats()['c8-1-core'].status,'mastered');assert.equal(B.stats().days,0);assert.equal(B.stats().earned,false);
});
test('Reading the lesson and film creates no checked attempts or figure credit',()=>{
  const before=JSON.stringify(S.load().attempts);B.view('<nav>Exam 2</nav>');B.filmHTML();B.stats();assert.equal(JSON.stringify(S.load().attempts),before);assert.equal(B.stats().days,0);
});
test('One day and repeated same-day sessions cannot certify later recall',()=>{
  fresh();practiceDay(['labels','shallow','deep']);assert.equal(B.stats().days,1);assert.equal(B.stats().due,'2026-10-09');assert.equal(B.stats().earned,false);
  practiceDay(['outcomes','peak']);assert.equal(B.stats().labelRoots,2);assert.equal(B.stats().days,1);assert.equal(B.stats().earned,false);
});
test('Different labeling tasks on separate days plus graph interpretation earn the figure record',()=>{
  now+=86400000;practiceDay(['outcomes','peak']);const s=B.stats();assert.equal(s.days,2);assert.equal(s.earned,true);assert.equal(s.due,'2026-10-12');
});
test('A later miss is due now while earned figure and concept progress survive',()=>{
  const oldMastery=E.conceptStats()['c8-1-core'].status;now+=86400000;session(['labels']);answer(false,'h');E.endSession();
  assert.equal(B.stats().review,true);assert.equal(B.stats().earned,true);assert.equal(B.stats().due,'2026-10-10');assert.equal(E.conceptStats()['c8-1-core'].status,oldMastery);
  practiceDay(['outcomes']);assert.equal(B.stats().review,true);practiceDay(['deep']);assert.equal(B.stats().review,false);
});
test('Hints and low confidence remain recorded but cannot supply recall credit',()=>{
  fresh();session(['labels','shallow','deep']);answer(true,'h',true);answer(true,'m');answer(true,'l');E.endSession();
  assert.equal(B.stats().days,0);assert.equal(B.stats().readRoots,1);assert.equal(B.stats().review,true);
});
test('Missed labels return as a distinct figure after two intervening activities',()=>{
  fresh();const q=B.refs('labels'),s=E.newSession('practice','Spacing',q,{examId:'exam2'}),first=E.resolve(q[0]);
  E.answerInSession(first.pairs.map(()=> 'Wrong'),'h',false);
  assert.equal(s.queue[3].retry,true);assert.equal(E.resolve(s.queue[3].ref).figureRole,'label');assert.notEqual(s.queue[3].ref.id,q[0].id);assert.ok(s.queue[3].ref.snapshot);
  const firstSaved=JSON.stringify(s.results[0]);E.answerInSession(right(first),'h',false);assert.equal(JSON.stringify(s.results[0]),firstSaved);
});
test('Low-confidence correct labels return after four intervening activities',()=>{
  fresh();const q=B.refs('labels'),s=E.newSession('practice','Spacing',q,{examId:'exam2'});
  E.answerInSession(right(E.resolve(q[0])),'l');assert.equal(s.queue[5].retry,true);assert.equal(E.resolve(s.queue[5].ref).figureRole,'label');
});
test('Immediate retries cannot masquerade as independent later practice',()=>{
  fresh();const s=session(['labels','outcomes','shallow','deep']);s.queue[0].retry=true;s.queue[1].retry=true;
  ['labels','outcomes','shallow','deep'].forEach(()=>answer());E.endSession();assert.equal(B.stats().days,0);assert.equal(B.stats().earned,false);
});
test('Resumed sessions use actual answer dates, with one session still unable to supply two session credits',()=>{
  fresh();session(['labels','shallow','outcomes','deep']);answer();answer();now+=86400000;answer();answer();E.endSession();
  assert.equal(B.stats().days,2);assert.equal(B.stats().earned,false);assert.ok(S.load().sessionHistory[0].results.every(r=>r.at));
});
test('Distinct sessions and tasks are needed; the same label on two days is insufficient',()=>{
  fresh();practiceDay(['labels','shallow','deep']);now+=86400000;practiceDay(['labels']);assert.equal(B.stats().days,2);assert.equal(B.stats().labelRoots,1);assert.equal(B.stats().earned,false);
});
test('Drafts, immutable first scores, figure history, and old mastery survive reload and idempotent import',()=>{
  fresh();S.load().masteryCredits['c1-cycle']='earned';practiceDay(['labels','shallow','deep']);now+=86400000;
  const s=session(['outcomes','deep']);answer(false,'h');s.drafts[1]=2;s.confidence[1]='l';s.assisted[1]=true;S.save();
  const saved=S.exportJSON(),first=JSON.stringify(s.results),status=JSON.stringify(B.stats());const re=load('127.0.0.1',disk);
  assert.equal(JSON.stringify(re.store.load().session.results),first);assert.equal(re.store.load().session.drafts[1],2);assert.equal(re.store.load().session.assisted[1],true);
  re.store.importText(saved);re.store.importText(saved);assert.equal(JSON.stringify(re.brittleDuctile.stats()),status);assert.equal(re.store.load().masteryCredits['c1-cycle'],'earned');
  assert.equal(JSON.stringify(re.store.load().session.results),first);
});
test('Local view exposes the actual source, film, writing, figure record, and back paths',()=>{
  const html=B.view('<nav>Exam 2</nav>');for(const str of ['strength-source.png','classroom-display.jpg','brittle-compression.png','ductile-compression.png',L.TEXTBOOK_FILMS.E2T7.base+'.mp4','data-bd-practice="writing"','What this record counts','#data'])assert.ok(html.includes(str),str);
  const main={innerHTML:'',querySelectorAll(){return [];}};L.exam2.view(main,['topic','E2T7']);assert.match(main.innerHTML,/The course figure/);assert.match(main.innerHTML,/Captions: on/);
  L.exam2.view(main,['home']);assert.match(main.innerHTML,/Practice figure/);L.exam2.view(main,['review']);assert.match(main.innerHTML,/Brittle–ductile figure/);
});
console.log('TOTAL '+passed+' sample checks passed');
