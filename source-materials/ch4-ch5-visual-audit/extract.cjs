const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto');
const root=path.resolve(__dirname,'../..');
const srcRoot=path.resolve(root,'../LECTURE POWERPOINTS/GEOL 1001 Chapters 4 and 5 Screenshots - 2026-09-15');
const out=path.join(root,'assets/visuals/ch4-ch5-expanded');fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync(path.join(__dirname,'extract-'));
const records=JSON.parse(fs.readFileSync(path.join(__dirname,'figures.json'))).map(([module,ch,file,page,title,notice],i)=>{
 const source=path.join(srcRoot,`Chapter ${ch}`,file==='silicates'?'4.7 What Is the Crystalline Structure of Silicate Minerals_.pdf':`Chapter ${ch}_ Earth Materials PG ${file}.pdf`);
 const list=cp.execFileSync('pdfimages',['-f',String(page),'-l',String(page),'-list',source],{encoding:'utf8'});
 const images=list.split('\n').map(l=>l.trim().split(/\s+/)).filter(v=>v[2]==='image'&&Number(v[3])>200&&Number(v[4])>150).sort((a,b)=>Number(b[3])*Number(b[4])-Number(a[3])*Number(a[4]));
 const prefix=path.join(tmp,`item-${i}`);cp.execFileSync('pdfimages',['-f',String(page),'-l',String(page),'-png',source,prefix]);
 const overrides={6:2,20:0,32:0,36:1,37:1,40:1,41:1,42:1,44:1,45:4,46:2,47:0,48:0,49:0};
 const image=(overrides[i+1]===undefined?images[0]:images.find(v=>Number(v[1])===overrides[i+1]))||[],asset=`figure-${String(i+1).padStart(2,'0')}.png`;
 if(images.length){
   if(!image.length)throw Error(`Invalid selected image for figure ${i+1}`);
   const all=list.split('\n').map(l=>l.trim().split(/\s+/));
   const mask=all.find(v=>v[2]==='smask'&&Number(v[1])===Number(image[1])+1);
   cp.execFileSync('/Users/ethanheinrick/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',[path.join(__dirname,'render-image.py'),`${prefix}-${String(image[1]).padStart(3,'0')}.png`,mask?`${prefix}-${String(mask[1]).padStart(3,'0')}.png`:'none',path.join(out,asset)]);
 }
 else cp.execFileSync('pdftoppm',['-f',String(page),'-l',String(page),'-singlefile','-scale-to','1800','-png',source,path.join(out,asset.replace('.png',''))]);
 const text=cp.execFileSync('pdftotext',['-f',String(page),'-l',String(page),'-layout',source,'-'],{encoding:'utf8'});
 const section=file==='silicates'?'4.7':ch===4&&file<=7?`4.${file-1}`:`${ch}.${file}`;
 return {id:`ch45-expanded-${i+1}`,module,title,notice,caption:title,alt:title,src:`assets/visuals/ch4-ch5-expanded/${asset}`,source:`Exploring Geology, section ${section}; supplied PDF page ${page}`,sourcePath:source,sourceSHA256:crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'),page,imageIndex:Number(image[1]),width:Number(image[3]),height:Number(image[4]),pageText:text,status:module==='ch5-settings-review'?'continuation':'textbook'};
});
fs.writeFileSync(path.join(__dirname,'extracted.json'),JSON.stringify(records,null,2));
console.log(`Extracted ${records.length} unmodified embedded textbook figures. Intermediate files: ${tmp}`);
