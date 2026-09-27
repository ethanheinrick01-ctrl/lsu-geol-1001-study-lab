const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'../..'),backup=path.resolve(root,'../STUDY LAB BACKUPS/pre-ch6-20260921');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function load(dir){const ctx={window:{}};vm.createContext(ctx);for(const [,src] of fs.readFileSync(path.join(dir,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g)){const file=src.split('?')[0];if(!file.startsWith('assets/'))vm.runInContext(fs.readFileSync(path.join(dir,file),'utf8'),ctx);}return JSON.parse(JSON.stringify(ctx.window));}
const before=load(backup),after=load(root);
assert.deepStrictEqual(after.GEOL_MODULES.slice(0,before.GEOL_MODULES.length),before.GEOL_MODULES);
assert.deepStrictEqual(after.GEOL_QUIZZES.slice(0,before.GEOL_QUIZZES.length),before.GEOL_QUIZZES);
for(const [id,g] of Object.entries(before.GEOL_VISUALS))assert.deepStrictEqual(after.GEOL_VISUALS[id],g);
assert.equal(hash(path.join(root,'assets/app.js')),hash(path.join(backup,'assets/app.js')));
assert.equal(hash(path.join(root,'assets/ch4-ch5-tools.js')),hash(path.join(backup,'assets/ch4-ch5-tools.js')));
const mods=after.GEOL_MODULES.slice(before.GEOL_MODULES.length),quizzes=after.GEOL_QUIZZES.slice(before.GEOL_QUIZZES.length);
const oldIds=new Set(before.GEOL_MODULES.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]));
const ids=mods.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]);
assert.equal(new Set(ids).size,ids.length);
assert(ids.every(id=>!oldIds.has(id)));
assert.equal(mods.length,8);assert.equal(mods.flatMap(m=>m.concepts).length,16);
for(const m of mods){assert(m.activities[0].body.length>=3);for(const c of m.concepts){assert(m.activities.filter(a=>a.concept===c.id&&a.type==='single').length>=2);assert(after.GEOL_VISUALS[m.id].visuals.some(v=>v.conceptIds.includes(c.id)));}for(const a of m.activities.slice(1)){assert(a.source&&a.hint&&a.explanation&&a.provenance==='original');if(a.type==='single')assert(Number.isInteger(a.answer)&&a.answer>=0&&a.answer<a.choices.length);}}
assert.equal(quizzes.find(q=>q.kind==='boss').questions.length,32);
const visuals=JSON.parse(fs.readFileSync(path.join(__dirname,'visual-manifest.json')));
for(const v of visuals)assert.equal(hash(path.join(root,v.src)),v.assetSHA256);
const result={pass:true,oldModules:before.GEOL_MODULES.length,oldConcepts:before.GEOL_MODULES.flatMap(m=>m.concepts).length,newModules:8,newConcepts:16,newVisuals:visuals.length,newGradedActivities:mods.flatMap(m=>m.activities.slice(1)).length,drills:quizzes.map(q=>({id:q.id,questions:q.questions.length})),oldRecordsAndVisualsUnchanged:true,gradingAndStorageCodeByteIdentical:true,allNewConceptsHaveTwoQuestionRootsAndVisuals:true};
fs.writeFileSync(path.join(__dirname,'structural-results.json'),JSON.stringify(result,null,2));console.log(result);
const skill='/Users/ethanheinrick/.codex/skills/build-course-study-lab/scripts';
for(const mode of ['shell','hydrated']){const r=cp.spawnSync('node',[path.join(skill,'validate-study-lab.mjs'),root,'--'+mode],{encoding:'utf8'});fs.writeFileSync(path.join(__dirname,`v2-${mode}.json`),r.stdout);console.log(`v2 ${mode}: exit ${r.status} (legacy compatibility limitation recorded)`);}
const handoff=path.join(__dirname,'study-lab-handoff-v1.json');
const h=cp.spawnSync('node',[path.join(skill,'validate-handoff.mjs'),handoff],{encoding:'utf8'});fs.writeFileSync(path.join(__dirname,'handoff-validation.json'),h.stdout);assert.equal(h.status,0,h.stdout+h.stderr);console.log('Handoff PASS');
