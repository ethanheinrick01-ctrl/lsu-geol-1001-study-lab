const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'../..');
const rows=JSON.parse(fs.readFileSync(path.join(__dirname,'extracted.json')));
const conceptGroups={
 'ch4-mineral-definition':[1], 'ch4-clastic-crystalline':[2,3],
 'ch4-properties':[4], 'ch4-cleavage':[5,6,7,8],
 'ch4-tetrahedra':[9,10,11], 'ch4-structure-cleavage':[5,7,8,11],
 'ch4-bonding':[12,13,14,44,45], 'ch4-families':[15],
 'ch5-rock-pairs':[16,17,18,19,20,46,47], 'ch5-mineral-associations':[16,17,20],
 'ch5-cooling-texture':[21,22,23], 'ch5-special-textures':[24,25,48,49],
 'ch5-melting-mechanisms':[26,27,28,29,30], 'ch5-viscosity':[31,32,33],
 'ch5-bowen':[34], 'ch5-magma-evolution':[35,36,37,50],
 'ch5-settings':[38,39], 'ch5-intrusions':[40,41,42,43]
};
const catalog=rows.map((r,i)=>({...r,conceptIds:Object.entries(conceptGroups).filter(([,nums])=>nums.includes(i+1)).map(([id])=>id),alt:`Textbook source image: ${r.title}. ${r.notice}`,caption:r.notice,assetSHA256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,r.src))).digest('hex')}));
fs.writeFileSync(path.join(__dirname,'visual-manifest.json'),JSON.stringify(catalog,null,2));
const runtime=catalog.map(({id,module,title,notice,caption,alt,src,source,status,conceptIds})=>({id,module,title,notice,caption,alt,src,source,status,conceptIds}));
const js=`/* Generated from source-materials/ch4-ch5-visual-audit; additive visuals only. */\n(()=>{\nconst additions=${JSON.stringify(runtime,null,2)};\nfor(const item of additions){\n const key=item.module;\n const group=window.GEOL_VISUALS[key] ||= {label:'Textbook visual field guide',intro:'Source figures matched to this topic. Select a thumbnail, enlarge the image, then explain the relationship before opening the what-to-notice cue.',visuals:[]};\n if(group.visuals.some(v=>v.id===item.id))throw Error('Duplicate visual '+item.id);\n group.visuals.push(item);\n}\n})();\n`;
fs.writeFileSync(path.join(root,'study-guides/chapter-04-05-expanded-visuals.js'),js);
const handoff=JSON.parse(fs.readFileSync(path.join(root,'source-materials/ch4-ch5-audit/study-lab-handoff-v1.json')));
for(const r of catalog){
 let source=handoff.sources.find(s=>s.path===r.sourcePath);
 if(!source){source={id:`visual-source-${handoff.sources.length+1}`,path:r.sourcePath,sha256:r.sourceSHA256,pageCount:Number(cp.execFileSync('pdfinfo',[r.sourcePath],{encoding:'utf8'}).match(/Pages:\s+(\d+)/)[1])};handoff.sources.push(source);}
 const boundary=r.module==='ch5-settings-review'?'continuation':'verified';
 const refs=[{id:source.id,locator:`PDF page ${r.page}; embedded image index ${r.imageIndex??'page render'}`,boundary}];
 const claimId=`${r.id}-claim`;
 handoff.claims.push({id:claimId,text:r.notice,sourceRefs:refs,status:boundary});
 handoff.visuals.push({id:r.id,title:r.title,moduleId:r.module,claimIds:[claimId],sourceRefs:refs,src:path.join(root,r.src),alt:r.alt,caption:r.caption,notice:r.notice,status:boundary});
}
for(const key of ['sources','claims','modules','concepts','visuals','interactions','gradedItems','drills'])handoff.audit.counts[key]=handoff[key].length;
fs.writeFileSync(path.join(__dirname,'study-lab-handoff-v1.json'),JSON.stringify(handoff,null,2));
console.log(JSON.stringify({newVisuals:catalog.length,byModule:catalog.reduce((a,r)=>(a[r.module]=(a[r.module]||0)+1,a),{})},null,2));
