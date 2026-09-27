/* Browser-only fresh mocks. A seed selects unused, validated observation combinations.
   Complete question snapshots travel with the saved run; original source figures are reused. */
(function(L){
'use strict';
var U=L.util, VERSION=1, cached;
var MC_COUNTS={T1:2,T2:1,T3:2,T4:2,T5:2,T6:1,T7:1,T8:2,T9:1,T10:2,T11:2,T12:2,T13:2,T14:1,T15:1,T16:1};
// 25 total: retain the review's broad coverage; quotas are practice design, not official weighting.
var PROFILES={A:['cycle','boundaries','ocean','floating','classification','pt','volcanoes'],B:['cycle','boundaries','ocean','structures','classification','melting','volcanoes'],C:['cycle','boundaries','floating','structures','classification','bowen','heat']};
function topic(id){return L.EXAM1.topics.find(function(t){return t.id===id;});}
function hash(s){var a=2166136261,b=5381;for(var i=0;i<s.length;i++){a=Math.imul(a^s.charCodeAt(i),16777619);b=Math.imul(b,33)^s.charCodeAt(i);}return (a>>>0).toString(36)+'-'+(b>>>0).toString(36);}
function text(s){return String(s||'').replace(/<[^>]*>/g,' ').replace(/&[^;]+;/g,' ').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function fingerprint(it,stem){return hash(text((stem||'')+' '+it.q)+'|'+(it.o?it.o.map(function(o){return text(o.t);}).sort().join('|'):'')+'|'+(it.pairs?it.pairs.map(function(p){return text(p[0]);}).sort().join('|'):''));}
function make(f,key,t,q,body){var item=Object.assign({id:'fresh1-'+hash(key),freshKey:key,family:f.id,variant:key.split(':')[1],c:f.c,t:t,q:q,pool:'exam1',mock:false,topics:[f.topic],s:U.uniq(topic(f.topic).sources.concat(f.sources||[])),tier:2,difficulty:'introductory',evidence:'docs/EXAM1_UPDATE.md#evidence-and-figure-matching'},body||{});if(f.inlineFigure)item.media=topic(f.figure[0]).media[f.figure[1]];return item;}
function mc(f,key,q,correct,wrong,why){var choices=[correct].concat(wrong);if(choices.length!==4||new Set(choices).size!==4)throw Error('Invalid choices: '+key);return make(f,key,'mc',q,{o:choices.map(function(s,i){return {t:s,ok:i===0,w:i===0?why:'Compare every observation with the interpretation; '+why};}),x:why});}
function pairStem(a,b){return '<p><b>Observation 1:</b> '+U.esc(a.observation)+'</p><p><b>Observation 2:</b> '+U.esc(b.observation)+'</p>';}
function catalog(){if(cached)return cached;var out={mc:[],fill:[],teach:[],cases:[]};
 L.FRESH_FACTS.forEach(function(f){
  var labels=U.uniq(f.rows.map(function(r){return r.label;}).concat(f.distractors||[]));
  f.rows.forEach(function(a,i){
   var stem='<p>'+U.esc(a.observation)+'</p>Which '+U.esc(f.target)+' best fits this observation?';
   var distractors=labels.filter(function(x){return x!==a.label;}).slice(0,3);
   if(f.direct!==false)out.mc.push(mc(f,f.id+':identify:'+i,stem,a.label,distractors,a.why));
   if(f.term!==false)out.fill.push(make(f,f.id+':recall:'+i,'fill','<p>'+U.esc(a.observation)+'</p>Name the '+U.esc(f.target)+'.',{acc:accepted(a.label),x:a.why}));
   for(var j=i+1;j<f.rows.length;j++){
    var originalB=f.rows[j];if(a.label===originalB.label)continue;
    var reverse=(i+j+f.id.length)%2===1,first=reverse?originalB:a,second=reverse?a:originalB;
    var rowOrder=reverse?[j,i]:[i,j],mcAt=out.mc.length,teachAt=out.teach.length;
    var context='<p>For each observation, determine the '+U.esc(f.target)+'.</p>'+pairStem(first,second),key=f.id+':compare:'+i+'-'+j;
    var answer='1: '+first.label+'; 2: '+second.label;
    out.mc.push(mc(f,key,context+'Which pairing correctly interprets <b>both</b> observations?',answer,['1: '+second.label+'; 2: '+first.label,'1: '+first.label+'; 2: '+first.label,'1: '+second.label+'; 2: '+second.label],first.why+' '+second.why));
    var rubric=['Observation 1: identifies '+first.label+' and connects it to the stated evidence.','Observation 2: identifies '+second.label+' and connects it to the stated evidence.'];
    out.teach.push(make(f,f.id+':explain:'+i+'-'+j,'teach',context+'Give the interpretation of each observation and one reason for each. Two or three sentences are enough.',{model:'1: '+first.label+'. '+first.why+' 2: '+second.label+'. '+second.why,rubric:rubric}));
    // Each investigation asks for identification, discrimination, and an explanation.
    if(PROFILES.A.concat(PROFILES.B,PROFILES.C).indexOf(f.id)>=0){
     var ck=f.id+':investigate:'+i+'-'+j;
     var third=labels.filter(function(v){return v!==first.label&&v!==second.label;});
     var parts=[
      make(f,ck+':a','fill','Use Observation 1. Name its '+U.esc(f.target)+'.',{acc:accepted(first.label),x:first.why}),
      make(f,ck+':b','match','Match each observation to its '+U.esc(f.target)+'.',{pairs:[['Observation 1',first.label],['Observation 2',second.label]],extra:third.slice(0,2),x:first.why+' '+second.why}),
      make(f,ck+':c','teach','What evidence distinguishes these two observations? Explain why they need different interpretations.',{model:'Observation 1 fits '+first.label+': '+first.why+' Observation 2 fits '+second.label+': '+second.why,rubric:rubric})
     ];
     parts.forEach(function(it){it.masteryRoot='fresh-case-'+hash(ck);it.observationRows=rowOrder.slice();});
     var figure=f.figure?topic(f.figure[0]).media[f.figure[1]]:null;
     if(!figure&&f.id==='volcanoes')figure=topic('T14').media;
     out.cases.push({key:ck,family:f.id,topic:f.topic,sourceCase:caseTitle(f.id),stem:'<p>Use the original course figure as a reference. Apply the concepts to these new observations; their labels refer to the text below.</p>'+context,media:figure,items:parts});
    }
    out.mc[mcAt].observationRows=rowOrder.slice();out.teach[teachAt].observationRows=rowOrder.slice();
   }
  });
 });
 cached=out;return out;
}
function accepted(v){var map={'Transport':['transport','transportation','erosion and transport','erosion'],'Solidification':['solidification','crystallization','cooling and crystallization'],'Lithification':['lithification','compaction and cementation'],'Porphyritic':['porphyritic','porphyritic texture','porphyry'],'Ocean–ocean':['ocean-ocean','oceanic-oceanic','ocean-ocean convergence','oceanic-oceanic convergence'],'Ocean–continent':['ocean-continent','oceanic-continental','ocean-continent convergence','oceanic-continental convergence'],'Continent–continent':['continent-continent','continental-continental','continental collision','continent-continent convergence'],'Paleozoic':['Paleozoic','Paleozoic era'],'Mesozoic':['Mesozoic','Mesozoic era'],'Cenozoic':['Cenozoic','Cenozoic era'],'Precambrian':['Precambrian','Precambrian time'],'Coarse-grained':['coarse-grained','coarse','phaneritic'],'Fine-grained':['fine-grained','fine','aphanitic'],'Glassy':['glassy','glass'],'Pegmatitic':['pegmatitic','pegmatite'],'Scoria cone':['scoria cone','cinder cone'],'Composite volcano':['composite volcano','composite','stratovolcano'],'Shield volcano':['shield volcano','shield'],'Divergent':['divergent','divergent boundary'],'Convergent':['convergent','convergent boundary'],'Transform':['transform','transform boundary'],'Higher surface':['higher','higher surface','rises'],'Lower surface':['lower','lower surface','sinks'],'Isolated tetrahedra':['isolated tetrahedra','isolated','independent tetrahedra'],'Single chains':['single chains','single chain'],'Double chains':['double chains','double chain'],'Sheets':['sheets','sheet'],'Framework':['framework','frameworks'],'Decrease pressure':['decrease pressure','lower pressure','decompression'],'Add water':['add water','water','flux melting'],'Add heat':['add heat','heating','increase temperature'],'Nearer the ridge':['nearer the ridge','nearer','closer to the ridge','closer'],'Farther from the ridge':['farther from the ridge','farther','further from the ridge','further'],'Rightward':['rightward','right','to the right'],'Leftward':['leftward','left','to the left'],'Upward':['upward','up','upwards'],'Downward':['downward','down','downwards'],'Up and right':['up and right','upward and rightward','right and up','up right'],'Down and right':['down and right','downward and rightward','right and down','down right'],'Up and left':['up and left','upward and leftward','left and up','up left'],'Down and left':['down and left','downward and leftward','left and down','down left']};return map[v]||[v];}
function caseTitle(id){return {cycle:'Trace two rock-cycle changes',boundaries:'Infer motion from boundary evidence',ocean:'Compare two ocean-floor observations',floating:'Apply the floating-block analogy',classification:'Read composition and texture together',pt:'Translate two physical changes onto the axes',volcanoes:'Connect volcanic construction with form',structures:'Interpret mineral architecture',melting:'Identify the change that permits melting',bowen:'Use the cooling sequence',heat:'Explain how energy is transferred'}[id];}
function novelty(key){return String(key).replace(/:(identify|recall):/,':single:').replace(/:(compare|explain|investigate):/,':pair:').replace(/:[abc]$/,'');}
function seen(state){var keys=new Set(),prints=new Set();
 // Exclude the entire older bank as well as generated snapshots, not merely graded answers.
 L.engine.itemsFor(function(){return true;}).forEach(function(it){prints.add(fingerprint(it));});
 (state.examRuns||[]).forEach(function(r){
  (r.freshKeys||[]).forEach(function(k){keys.add(novelty(k));});
  Object.keys(r.freshItems||{}).forEach(function(id){var it=r.freshItems[id];if(it.freshKey)keys.add(novelty(it.freshKey));prints.add(fingerprint(it,it.context));});
 });return {keys:keys,prints:prints};
}
function create(form,state,seed){if(!PROFILES[form])throw Error('Unknown fresh mock form.');state=state||L.store.load();seed=seed===undefined?U.newSeed():seed;var rng=U.rng(seed),pool=catalog(),used=seen(state),items={},groups=[],selectedKeys=[],families={};
 function eligible(it,context){return !used.keys.has(novelty(it.freshKey))&&!used.prints.has(fingerprint(it,context));}
 function reserve(it,context){var copy=U.clone(it);if(context)copy.context=context;var fp=fingerprint(copy,context);used.keys.add(novelty(copy.freshKey));used.prints.add(fp);selectedKeys.push(copy.freshKey);items[copy.id]=copy;return copy.id;}
 function pick(list,label){var options=U.shuffle(list.filter(function(it){return eligible(it);}),rng);if(!options.length)throw Error('No unused variants remain for '+label+'. Your saved mocks are available in My history.');
  // Prefer a different source model within a topic, then genuinely new combinations.
  options.sort(function(a,b){return (families[a.family]||0)-(families[b.family]||0);});var it=options[0];families[it.family]=(families[it.family]||0)+1;return it;}
 // Reserve the narrower investigation pools first, so MC selection cannot starve them.
 U.shuffle(PROFILES[form],rng).forEach(function(f,i){var candidates=pool.cases.filter(function(c){return c.family===f&&!used.keys.has(novelty(c.key))&&c.items.every(function(it){return eligible(it,c.stem);});});
  if(!candidates.length)throw Error('No unused investigations remain for '+caseTitle(f)+'. Your saved mocks are available in My history.');
  var c=U.pick(rng,candidates);used.keys.add(novelty(c.key));selectedKeys.push(c.key);var ids=c.items.map(function(it){return reserve(it,c.stem);});groups.push({n:i+34,section:'inv',ids:ids,media:U.clone(c.media),sourceCase:c.sourceCase,stem:c.stem,freshCase:c.key});
 });
 var pickedMC=[];Object.keys(MC_COUNTS).forEach(function(t){for(var n=0;n<MC_COUNTS[t];n++){var it=pick(pool.mc.filter(function(x){return x.topics[0]===t;}),topic(t).title);reserve(it);pickedMC.push(it);}});
 U.shuffle(pickedMC,rng).forEach(function(it,i){groups.push({n:i+1,section:'mc',ids:[it.id]});});
 var saTopics=new Set();['fill','fill','fill','fill','teach','teach','teach','teach'].forEach(function(type,i){var candidates=pool[type].filter(function(x){return !saTopics.has(x.topics[0]);});var it=pick(candidates,'short answers');saTopics.add(it.topics[0]);groups.push({n:i+26,section:'sa',ids:[reserve(it)]});});
 groups.sort(function(a,b){return a.n-b.n;});
 if(groups.length!==40||Object.keys(items).length!==54)throw Error('Incomplete fresh mock; no exam was saved.');
 return {groups:groups,items:items,keys:selectedKeys,seed:seed,version:VERSION};
}
L.freshMocks={create:create,catalog:catalog,fingerprint:fingerprint,seen:seen,MC_COUNTS:MC_COUNTS,PROFILES:PROFILES,novelty:novelty,version:VERSION};
L.CONFIG.version='3.2.0 · fresh mocks (2026-09-27)';
})(window.L);
