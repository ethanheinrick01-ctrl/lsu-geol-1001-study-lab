const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),crypto=require('crypto');
const root=path.resolve(__dirname,'../..'),backup=path.resolve(root,'../STUDY LAB BACKUPS/pre-visuals-20260917');
function load(dir){const ctx={window:{}};vm.createContext(ctx);for(const [,src] of fs.readFileSync(path.join(dir,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g)){const f=src.split('?')[0];if(!f.startsWith('assets/'))vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx);}return JSON.parse(JSON.stringify(ctx.window));}
const a=load(backup),b=load(root);
assert.deepStrictEqual(b.GEOL_MODULES,a.GEOL_MODULES);
assert.deepStrictEqual(b.GEOL_QUIZZES,a.GEOL_QUIZZES);
for(const [id,g] of Object.entries(a.GEOL_VISUALS))assert.deepStrictEqual(b.GEOL_VISUALS[id].visuals.slice(0,g.visuals.length),g.visuals);
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'visual-manifest.json')));
assert.equal(manifest.length,50);
assert.equal(new Set(manifest.map(x=>x.id)).size,50);
for(const v of manifest){assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,v.src))).digest('hex'),v.assetSHA256);assert(v.sourcePath&&v.page&&v.alt&&v.notice);}
const concepts=b.GEOL_MODULES.filter(m=>/^ch[45]-/.test(m.id)).flatMap(m=>m.concepts.map(c=>c.id));
assert.equal(concepts.length,18);
for(const c of concepts)assert(manifest.some(v=>v.conceptIds.includes(c)),c);
const before=fs.readFileSync(path.join(backup,'assets/app.js'),'utf8'),after=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
// All executable engine code outside the three presentation-only changes must match.
function strip(s){return s.replace(/  const visualStatus = [\s\S]*?(?=\n\n)/,'').replace(/          \$\{renderReferenceFigures\(activity\)\}\n/,'').replace(/  \/\/ Images stay inside Study Guide notes[\s\S]*?(?=  const sourceAndHint)/,'').replace(/^.*host\.querySelectorAll\("\[data-reference-visual\]"\).*\n/m,'');}
assert.equal(strip(after),strip(before));
const result={pass:true,newVisuals:50,conceptsWithMatchedFigures:18,existingModulesAndQuestionsIdentical:true,existingVisualsPreserved:true,gradingAndStorageCodeUnchanged:true,assetHashesVerified:true};
fs.writeFileSync(path.join(__dirname,'structural-results.json'),JSON.stringify(result,null,2));console.log(result);
