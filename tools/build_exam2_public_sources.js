/* Publish only original study passages, section citations and authored diagrams.
   The full extracted textbook index remains in the private local-file edition. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
const ctx={console,Math,Date,JSON,setTimeout(){},location:{protocol:'https:'},document:{readyState:'loading',addEventListener(){}},localStorage:{getItem(){return null;},setItem(){}}};
ctx.window=ctx;vm.createContext(ctx);
for(const [,u]of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g)){
 let f=u.split('?')[0];if(f==='js/app.js')continue;
 if(f==='js/content/exam2-sources.js')f='js/content/exam2-sources.private.js';
 vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
}
const L=ctx.L,notes={},dir=path.join(root,'assets/diagrams/exam2');fs.mkdirSync(dir,{recursive:true});
for(const t of L.EXAM2.topics)fs.writeFileSync(path.join(dir,t.id+'.svg'),L.MEDIA['e2-'+t.id]());
function plain(html){return html.replace(/<\/p>/g,'\n\n').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').trim();}
for(const [n,b]of Object.entries(L.EXAM2_SOURCES)){
 const intro=n.endsWith('.intro'),t=intro?L.EXAM2.topics.find(t=>t.id===(n[0]==='7'?'E2T1':'E2T12')):L.EXAM2.topics.find(t=>t.sections.includes(n));
 const cd=intro?Object.values(L.GUIDE).flat().find(c=>c.id===('g'+n[0]+'-intro')):L.GUIDE['c'+n.replace('.','s')][0];
 const image='assets/diagrams/exam2/'+t.id+'.svg';
 notes[n]={title:b.title,citation:'Exploring Geology (Reynolds and Johnson), supplied '+(intro?'Chapter '+n[0]+' introduction':'section '+n),pages:[{n:2,text:plain(cd.html),image,display:image,authored:true,blank:false}]};
}
fs.writeFileSync(path.join(root,'js/content/exam2-sources.js'),'/* Original study passages; full supplied pages are local-only. */\n(function(L){L.EXAM2_SOURCE_MODE="study-notes";L.EXAM2_SOURCES='+JSON.stringify(notes)+';})(window.L);\n');
const figdir=path.join(root,'assets/figures/exam2');fs.mkdirSync(figdir,{recursive:true});
for(const name of ['cross-beds','normal-fault','reverse-fault','fold-pair'])fs.copyFileSync(path.join(root,'assets/img/exam2/figures',name+'.png'),path.join(figdir,name+'.png'));
console.log('Prepared 33 original study passages, 12 authored diagrams, and four selected figure crops. Full packet stays local.');
