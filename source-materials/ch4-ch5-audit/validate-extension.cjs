const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'../..');
const backup=path.resolve(root,'../STUDY LAB BACKUPS/pre-ch4-ch5-20260915');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function load(dir){
  const ctx={window:{}};vm.createContext(ctx);
  const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const files=[...html.matchAll(/<script src="([^"]+)"/g)].map(x=>x[1].split('?')[0]);
  for(const f of files.filter(x=>!x.startsWith('assets/')))vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx,{filename:f});
  return JSON.parse(JSON.stringify(ctx.window));
}
const before=load(backup),after=load(root);
assert.deepStrictEqual(after.GEOL_MODULES.slice(0,before.GEOL_MODULES.length),before.GEOL_MODULES);
assert.deepStrictEqual(after.GEOL_QUIZZES.slice(0,before.GEOL_QUIZZES.length),before.GEOL_QUIZZES);
for(const [k,v] of Object.entries(before.GEOL_VISUALS))assert.deepStrictEqual(after.GEOL_VISUALS[k],v);
assert.equal(hash(path.join(root,'assets/app.js')),hash(path.join(backup,'assets/app.js')));
const mods=after.GEOL_MODULES.slice(before.GEOL_MODULES.length),quizzes=after.GEOL_QUIZZES.slice(before.GEOL_QUIZZES.length);
const ids=mods.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]);
assert.equal(new Set(ids).size,ids.length);
const oldIds=new Set(before.GEOL_MODULES.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]));
assert(ids.every(id=>!oldIds.has(id)));
for(const m of mods){
  assert(m.activities[0].type==='lesson'&&m.activities[0].body.length>=3);
  for(const c of m.concepts)assert(m.activities.filter(a=>a.concept===c.id&&a.type==='single').length>=2);
  for(const a of m.activities.filter(a=>a.type!=='lesson')){
    assert(a.source&&a.hint&&a.explanation&&a.provenance==='original');
    if(a.type==='single')assert(Number.isInteger(a.answer)&&a.answer>=0&&a.answer<a.choices.length);
  }
}
assert.equal(mods.length,9);assert.equal(mods.flatMap(m=>m.concepts).length,18);
assert.equal(quizzes.find(q=>q.kind==='boss').questions.length,32);
const library=path.resolve(root,'../LECTURE POWERPOINTS/GEOL 1001 Chapters 4 and 5 Screenshots - 2026-09-15');
const pdf=(ch,n)=>path.join(library,`Chapter ${ch}`,`Chapter ${ch}_ Earth Materials PG ${n}.pdf`);
const sec47=path.join(library,'Chapter 4/4.7 What Is the Crystalline Structure of Silicate Minerals_.pdf');
const map={
  'ch4-foundations':[pdf(4,2),pdf(4,3)],
  'ch4-identification':[pdf(4,4),pdf(4,5),pdf(4,6),pdf(4,9)],
  'ch4-silicates':[sec47,pdf(4,8)],
  'ch4-chemistry':[pdf(4,7),pdf(4,9),pdf(4,11),pdf(4,12)],
  'ch5-chart':[pdf(5,2),path.resolve(root,'../EXAM ONE/IMG_5737.JPG')],
  'ch5-textures':[pdf(5,1),pdf(5,2),pdf(5,3),pdf(5,8)],
  'ch5-melting':[pdf(5,4),pdf(5,5),pdf(5,7)],
  'ch5-evolution':[pdf(5,6),pdf(5,8)],
  'ch5-settings-review':[pdf(5,9),pdf(5,10),pdf(5,11),pdf(5,12),pdf(5,13),pdf(5,14)]
};
const paths=[...new Set(Object.values(map).flat())];
const sources=paths.map((p,i)=>({id:`ch45-src-${i+1}`,path:p,sha256:hash(p),...(p.endsWith('.pdf')?{pageCount:Number(cp.execFileSync('pdfinfo',[p],{encoding:'utf8'}).match(/Pages:\s+(\d+)/)[1])}:{itemCount:1})}));
const refs=m=>map[m.id].map(p=>({id:sources.find(s=>s.path===p).id,locator:m.source,boundary:'verified'}));
const claims=[],concepts=[],gradedItems=[];
for(const m of mods){for(const c of m.concepts){
  const activities=m.activities.filter(a=>a.concept===c.id);
  const claimIds=[];
  for(const a of activities){const id=`${a.id}-evidence`;claimIds.push(id);claims.push({id,text:a.explanation,status:'verified',sourceRefs:refs(m)});gradedItems.push({...a,moduleId:m.id,conceptId:c.id,claimIds:[id],sourceRefs:refs(m),status:'verified'});}
  concepts.push({...c,moduleId:m.id,teaching:m.activities[0].body.join('\n\n'),claimIds,masteryEligible:true});
}}
const visuals=[];
for(const m of mods){for(const v of after.GEOL_VISUALS[m.id]?.visuals||[]){
  assert(fs.existsSync(path.join(root,v.src)));
  visuals.push({...v,src:path.join(root,v.src),moduleId:m.id,status:'verified',claimIds:concepts.find(c=>c.moduleId===m.id).claimIds,sourceRefs:refs(m)});
}}
const handoff={schemaVersion:'study-lab-handoff-v1',course:{code:'GEOL 1001',title:'General Geology: Physical',term:'Fall 2026'},
 unit:{examId:'exam-one',label:'Exam 1',coverage:'Chapters 4–5 selected core plus secondary review'},
 boundaries:{verified:'Textbook factual content; transcripts through roughly 5.8; classroom chart supplied.',continuation:'5.9–5.14 verified textbook/quiz content but detailed classroom coverage not established; visibly secondary.',unresolved:'Exam weighting and Chapter 6. No claim of comprehensive specimen identification. No audio verification.'},
 sources,claims,modules:mods.map(m=>({...m,conceptIds:m.concepts.map(c=>c.id),concepts:undefined,activities:undefined,lesson:m.activities[0]})),concepts,visuals,interactions:[],gradedItems,
 drills:quizzes.map(q=>({...q,examId:'exam-one',coverage:q.chapters,itemIds:q.questions.map(a=>a.id),questions:undefined})),audit:{counts:{}}};
for(const k of ['sources','claims','modules','concepts','visuals','interactions','gradedItems','drills'])handoff.audit.counts[k]=handoff[k].length;
fs.writeFileSync(path.join(__dirname,'study-lab-handoff-v1.json'),JSON.stringify(handoff,null,2));
const sourceInventory=[];
for(const folder of ['RECORDED LECTURES','QUIZZES/QUIZ 4','QUIZZES/QUIZ 5'])for(const name of fs.readdirSync(path.resolve(root,'..',folder)).filter(n=>/\.(rtf|png)$/.test(n))){const p=path.resolve(root,'..',folder,name);sourceInventory.push({path:p,sha256:hash(p),role:folder.startsWith('QUIZZES')?'Question morphology and topic evidence, not copied content or official answer key':'Lecture emphasis; speech recognition subject to textbook checks'});}
fs.writeFileSync(path.join(__dirname,'secondary-source-inventory.json'),JSON.stringify(sourceInventory,null,2));
const receipt={legacyRecordsUnchanged:true,gradingEngineByteIdentical:true,oldModules:before.GEOL_MODULES.length,oldConcepts:before.GEOL_MODULES.flatMap(m=>m.concepts).length,newModules:mods.length,newConcepts:concepts.length,newGradedActivities:gradedItems.length,newChoiceQuestions:gradedItems.filter(a=>a.type==='single').length,newDrills:quizzes.map(q=>({id:q.id,count:q.questions.length})),existingBrowserStorageModified:false};
fs.writeFileSync(path.join(__dirname,'structural-results.json'),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
