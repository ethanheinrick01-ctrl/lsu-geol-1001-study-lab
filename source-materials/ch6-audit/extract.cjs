const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto');
const root=path.resolve(__dirname,'../..'),sourceRoot=path.resolve(root,'../LECTURE POWERPOINTS/GEOL CH 6 SS ');
const out=path.join(root,'assets/visuals/ch6');fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync(path.join(__dirname,'extract-'));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const sources=fs.readdirSync(sourceRoot).filter(f=>f.endsWith('.pdf')).map(f=>{const p=path.join(sourceRoot,f),text=cp.execFileSync('pdftotext',[p,'-'],{encoding:'utf8'});return {id:'ch6-source-'+(f.match(/^6\.(\d+)/)?.[1]||'intro'),path:p,sha256:hash(p),pageCount:Number(cp.execFileSync('pdfinfo',[p],{encoding:'utf8'}).match(/Pages:\s+(\d+)/)[1]),text};});
fs.writeFileSync(path.join(__dirname,'source-inventory.json'),JSON.stringify(sources,null,2));
const rows=JSON.parse(fs.readFileSync(path.join(__dirname,'figures.json')));
const result=rows.map(([module,section,page,title,notice,concept,mode],i)=>{
 const source=sources.find(s=>s.id===`ch6-source-${section}`),asset=`figure-${String(i+1).padStart(2,'0')}.png`,dest=path.join(out,asset);
 const list=cp.execFileSync('pdfimages',['-f',String(page),'-l',String(page),'-list',source.path],{encoding:'utf8'}).split('\n').map(l=>l.trim().split(/\s+/));
 const candidates=list.filter(v=>v[2]==='image'&&Number(v[3])>200&&Number(v[4])>150).sort((a,b)=>b[3]*b[4]-a[3]*a[4]);
 const overrides={2:4,11:0};
 const chosen=overrides[i+1]===undefined?candidates[0]:candidates.find(v=>Number(v[1])===overrides[i+1]);
 if(mode==='page'||!chosen)cp.execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-singlefile','-scale-to','2200','-png',source.path,dest.replace('.png','')]);
 else {const prefix=path.join(tmp,`fig-${i}`);cp.execFileSync('pdfimages',['-f',String(page),'-l',String(page),'-png',source.path,prefix]);const mask=list.find(v=>v[2]==='smask'&&Number(v[1])===Number(chosen[1])+1);cp.execFileSync('/Users/ethanheinrick/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',[path.resolve(__dirname,'../ch4-ch5-visual-audit/render-image.py'),`${prefix}-${String(chosen[1]).padStart(3,'0')}.png`,mask?`${prefix}-${String(mask[1]).padStart(3,'0')}.png`:'none',dest]);}
 return {id:`ch6-visual-${i+1}`,module,title,notice,caption:notice,alt:`Textbook figure: ${title}. ${notice}`,conceptIds:[concept],src:`assets/visuals/ch6/${asset}`,source:`Exploring Geology 6.${section}, supplied PDF page ${page}; textbook evidence, lecture emphasis unconfirmed`,status:'textbook',sourceId:source.id,page,imageIndex:mode==='page'?'full page':Number(chosen?.[1]),assetSHA256:hash(dest)};
});
fs.writeFileSync(path.join(__dirname,'visual-manifest.json'),JSON.stringify(result,null,2));console.log({sources:sources.length,visuals:result.length});
