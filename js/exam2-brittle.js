/* Source-figure lesson. Publish only selected textbook crops; retain existing records. */
(function (L) {
  'use strict';
  var local = typeof location !== 'undefined' && (location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].indexOf(location.hostname) >= 0);
  var U=L.util, E=L.engine, S=L.store, I=L.itemUI, esc=U.esc;
  var ROOT=local?'assets/img/exam2/brittle-ductile/':'assets/figures/exam2/brittle-ductile/', FILM=local?'videos/exam2-brittle-sample/brittle-ductile':'videos/exam2/brittle-ductile/brittle-ductile';
  var SOURCES=local?['TB8:8.1','TB8:8.2','E2PHOTO','E2T1001']:['TB8:8.1','TB8:8.2'];
  var PREFIX='e2-bd-', LABELS=[PREFIX+'labels',PREFIX+'outcomes'];
  var READS=[PREFIX+'shallow',PREFIX+'deep',PREFIX+'peak'];

  // Labels are covered for practice. The separate curve layer is extracted
  // from the original pixels, so its geometry is never approximated or redrawn.
  function graph(spec, opts) {
    spec=spec||{};opts=opts||{};
    var kind=spec.kind||'labels', id='bd-'+kind, reveal=!!opts.reveal;
    var alt=kind==='labels'?'Course strength graph with five numbered blanks for its axes and regions.':kind==='outcomes'?'Course strength graph with four numbered locations on either side of the curve.':kind==='shallow'?'A and B at the same depth in the upper part of the source strength graph.':kind==='deep'?'A and B at the same depth in the lower part of the source strength graph.':'Three positions P, Q, and R along the source strength curve.';
    if(reveal)alt='Original labeled source strength–depth figure, revealed for feedback.';
    var h='<svg class="dg bd-graph" viewBox="0 0 699 683" role="img" aria-label="'+esc(alt)+'" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="'+id+'-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#94c6d1"/><stop offset=".40" stop-color="#94c6d1"/><stop offset=".59" stop-color="#e47e6c"/><stop offset="1" stop-color="#e47e6c"/></linearGradient></defs><rect width="699" height="683" fill="#f7f7f4"/><image href="'+ROOT+'strength-source.png" width="699" height="683"/>';
    function marker(x,y,label){return '<circle cx="'+x+'" cy="'+y+'" r="20" fill="#111820" stroke="#ffffff" stroke-width="3"/><text x="'+x+'" y="'+(y+7)+'" text-anchor="middle" fill="white" font-family="system-ui,sans-serif" font-size="21" font-weight="700">'+label+'</text>';}
    if (!reveal) {
      h+='<rect x="50" y="51" width="579" height="578" fill="url(#'+id+'-bg)"/><image href="'+ROOT+'strength-curve.png" width="699" height="683"/>';
      // Hide the printed paragraph callout, which is not an exercise marker.
      h+='<rect x="629" y="277" width="70" height="85" fill="#f7f7f4"/>';
      if(kind==='labels'){
        h+='<rect x="89" y="0" width="423" height="43" fill="#f7f7f4"/><rect x="0" y="217" width="42" height="301" fill="#f7f7f4"/>';
        h+=marker(302,23,'1')+marker(24,368,'2')+marker(524,138,'3')+marker(270,340,'4')+marker(521,547,'5');
      }else if(kind==='outcomes'){
        h+=marker(133,207,'1')+marker(426,167,'2')+marker(89,524,'3')+marker(415,512,'4');
      }else if(kind==='shallow'||kind==='deep'){
        var y=kind==='shallow'?181:525;
        h+='<path d="M52 '+y+' H605" stroke="#2f4c59" stroke-width="2" stroke-dasharray="7 6"/>';
        h+=marker(kind==='shallow'?137:89,y,'A')+marker(kind==='shallow'?371:361,y,'B');
      }else h+=marker(193,137,'P')+marker(460,345,'Q')+marker(177,532,'R');
    }
    return h+'</svg>';
  }
  L.MEDIA['e2-bd-graph']=graph;
  function media(kind){return {kind:'svg',name:'e2-bd-graph',spec:{kind:kind},zoom:ROOT+'practice-'+kind+'.svg',zoomReveal:ROOT+'strength-source.png',cap:'Supplied textbook figure 08.01.b6 · labels covered for practice; original revealed after checking'};}
  function options(rows){return rows.map(function(r,i){return {t:r[0],ok:i===0,w:r[1]};});}
  function add(it){
    it=Object.assign({c:'c8-1-core',examId:'exam2',ch:8,sec:'c8s1',topics:['E2T7'],mock:false,pool:'core',practiceTrack:'e2-brittle',tier:2,s:SOURCES.slice()},it);
    L.ITEMS.push(it);
  }
  add({id:LABELS[0],t:'match',figureRole:'label',masteryRoot:'e2-bd-map',
    q:'Use the word bank to label positions 1–5 on the supplied figure. Each term is used once.',
    media:media('labels'),revealMedia:true,
    pairs:[['1','Increasing strength'],['2','Depth (km)'],['3','Brittle'],['4','Brittle–ductile transition'],['5','Ductile']],retryIds:[LABELS[1]],
    hint:'Start with the two axes. Then use the curve’s maximum and the upper/lower regions to locate the three deformation terms.',
    x:'Strength increases to the right; depth increases downward. The upper region is brittle, the broad region near the maximum marks the transition, and the deeper region is ductile. The graph describes changing conditions with depth; ductile rock is still solid.'});
  add({id:LABELS[1],t:'match',figureRole:'label',masteryRoot:'e2-bd-threshold-regions',
    q:'Match each numbered location to its rock response in the supplied graph. Compare positions at the same depth. Use each phrase once.',
    media:media('outcomes'),revealMedia:true,
    pairs:[['1','Rock remains intact'],['2','Rock fractures'],['3','Rock resists ductile deformation'],['4','Rock flows in the solid state']],retryIds:[LABELS[0]],
    hint:'At a fixed depth, moving right increases the imposed stress. First locate the strength curve; then distinguish the upper and lower regions.',
    x:'At 1 and 3, imposed stress is left of the strength curve and below the failure threshold in this simplified model. At 2 it exceeds brittle strength, so rock fractures. At 4 it exceeds the lower, ductile strength, so rock flows while remaining solid. Crossing the curve changes the response; crossing into the red region does not mean melting.'});
  add({id:READS[0],t:'mc',figureRole:'read',media:media('shallow'),revealMedia:true,retryIds:[READS[1]],
    q:'Samples A and B are at the same shallow depth. Which sample has imposed stress greater than the rock’s strength?',
    o:options([['B only','B lies to the right of the strength curve at this depth.'],['A only','A lies to the left, below the failure strength.'],['Both A and B','Only B is on the higher-stress side of the curve.'],['Neither A nor B','B has crossed the curve into the fracture region.']]),
    hint:'Stay on the dashed horizontal line. Compare each point’s horizontal position with the curve.',
    x:'B is to the right of the curve and exceeds the failure strength. A is to the left and remains below it. Because both points are in the upper brittle region, the expected failure at B is fracturing or slip, not melting.'});
  add({id:READS[1],t:'mc',figureRole:'read',media:media('deep'),revealMedia:true,retryIds:[READS[0]],
    q:'In the lower part of this graph, stress increases from A to B. What response does the source model predict once the curve is crossed?',
    o:options([['Flow while remaining solid','B is on the failure side of the lower, ductile branch.'],['Fracture as the dominant response','That is the upper branch’s behavior in this simplified source model.'],['Melt into liquid magma','The lower branch describes solid-state flow, not melting.'],['Remain below the failure threshold','B lies to the right of the curve and exceeds that threshold.']]),
    hint:'Read both the side of the curve and the depth. The lower branch describes a different failure mechanism from the upper branch.',
    x:'B exceeds the strength of deeper, hotter rock. In this model the rock deforms ductilely in the solid state. Pressure is still high; increasing temperature makes ductile deformation easier. The color change is not a solid–liquid boundary.'});
  add({id:READS[2],t:'mc',figureRole:'read',media:media('peak'),revealMedia:true,retryIds:[READS[0]],
    q:'P, Q, and R lie along the strength curve at increasing depths. Which change is represented from P through Q to R?',
    o:options([['Strength increases, then decreases','Q lies farther right than P or R. Its maximum is near the transition.'],['Strength decreases, then increases','This reverses the curve’s horizontal changes.'],['Strength increases throughout','The lower branch returns left toward less strength.'],['Strength decreases throughout','The upper branch first moves right toward greater strength.']]),
    hint:'Strength is horizontal, so compare how far right each position is. Depth alone does not give the strength.',
    x:'The curve moves right from P to Q, then left toward R. Confinement strengthens the brittle upper crust; deeper thermal effects promote ductile flow and reduce the stress needed for deformation. Q is a broad transition region, not a sharp melting boundary.'});
  add({id:PREFIX+'stress',t:'mc',
    q:'The same force acts on two samples. One has half the loaded surface area of the other. How does the stress on the smaller surface compare?',
    o:options([['Twice as great','Stress is force divided by area; halving the area doubles stress.'],['Half as great','This reverses the force-per-area relationship.'],['The same','Equal force does not imply equal stress when area differs.'],['Four times as great','The area is halved, so the factor is two.']]),
    hint:'Use stress = force / area.',x:'Concentrating a fixed force onto half the area doubles stress. Stress is the applied loading per area; strain is the resulting change of size or shape.'});
  add({id:PREFIX+'elastic',t:'mc',
    q:'A small load changes a rock sample’s shape. After the load is removed, the original shape returns. Which behavior was observed?',
    o:options([['Elastic strain','The deformation was recoverable.'],['Ductile strain','The permanent deformation described here would remain after unloading.'],['Brittle failure','A fracture or slip would leave a permanent change.'],['Rigid rotation','The sample’s shape changed, rather than just its orientation.']]),
    hint:'Focus on what happens after the load is removed.',x:'Recovering the original shape identifies elastic strain. Brittle fracture and permanent ductile deformation leave changes after unloading.'});
  add({id:PREFIX+'explain',t:'teach',figureRole:'explain',
    q:'In 3–4 sentences, distinguish brittle from ductile deformation. Give one geological example of each, then explain why ductile deformation does not require melting.',
    model:'Brittle deformation breaks rock or permits slip along a fracture, as in shallow faulting. Ductile deformation changes shape while rock remains solid, as in folding of deeper, hotter layers. Higher temperature permits solid-state deformation more readily, so ductile flow does not require liquid magma.',
    rubric:['Defines brittle behavior as fracture or slip along a fracture.','Defines ductile behavior as permanent shape change while solid.','Gives two matching geological examples: shallow faulting and deeper folding or a ductile shear zone.','Explicitly distinguishes ductile flow from melting.'],
    hint:'Give the difference, the two requested examples, and the solid-state clarification. Additional rock names are unnecessary.',
    x:'Judge only what was in your original answer. This is rubric-based self-assessment, not automatic grading of prose.'});
  add({id:PREFIX+'explain-curve',t:'teach',figureRole:'explain',media:media('peak'),
    q:'Explain the change in rock strength from P through Q to R. Include both axes, the dominant upper-crust control, the deeper control, and one limit of the simplified graph.',
    model:'Strength increases to the right and depth increases downward. Upper-crust strength increases as confinement holds fractures together and resists slip, reaching a maximum near Q. At greater depth, higher temperature makes solid-state ductile flow easier, so the curve turns left toward lower strength. The transition is gradual and varies with conditions; the graph does not identify a universal boundary or imply melting.',
    rubric:['Reads both axes correctly.','Explains upper-crust strengthening by increasing confinement.','Explains deeper weakening by temperature-assisted solid-state flow.','States a valid limit: gradual/variable transition or no implication of melting.'],
    hint:'Separate what the line shows from why its direction changes.',
    x:'A concise answer needs the two controls and the changing horizontal position, not unrelated information about the entire crust.'});

  function sessions(state){
    var out={};
    (state.sessionHistory||[]).concat(Object.keys(state.sessionsByExam||{}).map(function(k){return state.sessionsByExam[k];}),state.session?[state.session]:[]).forEach(function(s){
      if(!s||s.importConflict)return;
      var old=out[s.id];if(!old||(s.results||[]).length>(old.results||[]).length||(s.updated||0)>(old.updated||0))out[s.id]=s;
    });
    return Object.keys(out).map(function(k){return out[k];});
  }
  function day(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ms));}
  function addDays(date,n){var d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);}
  function stats(state,now){
    state=state||S.load();now=now===undefined?Date.now():now;
    var events=[],seen={};
    sessions(state).forEach(function(s){(s.results||[]).forEach(function(r,i){
      var ref=s.queue&&s.queue[i]&&s.queue[i].ref,it=ref&&E.resolve(ref);
      if(!it||it.practiceTrack!=='e2-brittle'||r.retry||r.t==='teach'||['label','read'].indexOf(it.figureRole)<0)return;
      var at=r.at||s.started, key=s.id+'|'+i;
      if(seen[key])return;seen[key]=1;
      events.push({id:r.key,root:it.masteryRoot||r.key,role:it.figureRole,ok:!!r.ok&&r.cf!=='l'&&!r.h,correct:!!r.ok,at:at,day:day(at),session:s.id});
    });});
    events.sort(function(a,b){return a.at-b.at;});
    var labelDays={},labelRoots={},readRoots={},labelSessions={},lastMiss=-1,earned=false;
    events.forEach(function(a,i){
      if(!a.ok)lastMiss=i;
      else if(a.role==='label'){labelDays[a.day]=1;labelRoots[a.root]=1;labelSessions[a.session]=1;}
      else readRoots[a.root]=1;
      if(Object.keys(labelDays).length>=2&&Object.keys(labelRoots).length>=2&&Object.keys(labelSessions).length>=2&&Object.keys(readRoots).length>=2)earned=true;
    });
    var after=events.slice(lastMiss+1).filter(function(a){return a.ok;}),cleared=after.some(function(a){return a.role==='label';})&&after.some(function(a){return a.role==='read';});
    var review=lastMiss>=0&&!cleared,days=Object.keys(labelDays).sort(),last=events[events.length-1],today=day(now);
    var due=review||!days.length?today:addDays(days[days.length-1],earned?3:1);
    var label=!events.length?'Not practiced':review?'Needs another check':earned?'Recalled across study days':days.length>1?'More independent practice needed':days.length?'First study day recorded':'Practice in progress';
    return {label:label,earned:earned,review:review,days:days.length,labelRoots:Object.keys(labelRoots).length,readRoots:Object.keys(readRoots).length,due:due,isDue:due<=today,events:events,last:last,today:today};
  }
  function nextId(ids){var a=E.allAttempts(),last={};a.forEach(function(x){last[x.i]=x.t;});return ids.slice().sort(function(x,y){return (last[x]||0)-(last[y]||0);})[0];}
  function refs(kind){
    if(kind==='writing')return [{id:nextId([PREFIX+'explain',PREFIX+'explain-curve'])}];
    var label=nextId(LABELS),read=nextId(READS);
    if(kind==='labels')return [label,PREFIX+'stress',read,PREFIX+'elastic',READS[2],PREFIX+'explain'].map(function(id){return {id:id};}).filter(function(r,i,a){return a.findIndex(function(x){return x.id===r.id;})===i;});
    return [label,PREFIX+'stress',READS[0],PREFIX+'elastic',READS[1],PREFIX+'explain-curve'].map(function(id){return {id:id};});
  }
  function start(kind){
    E.newSession('practice','Brittle–ductile · '+(kind==='writing'?'short answer':'figure practice'),refs(kind),{examId:'exam2',back:'exam2/topic/E2T7'});
    L.app.go('session');
  }
  function recordHTML(compact){
    var s=stats(),message=!s.events.length?'Label the source figure, then apply its curve. Return on a later study day to check recall.':s.review?'A miss, hint, or low-confidence answer needs another independent label and graph-reading check.':s.earned?'You have successful figure work across separate study days. The next review is '+s.due+'.':'Your next later-day check is '+s.due+'. More practice today is useful; it does not count as a second study day.';
    return '<section class="card bd-record'+(compact?' bd-record-compact':'')+'" aria-labelledby="bd-record-heading"><div class="spread"><h2 id="bd-record-heading">Figure practice</h2><span class="badge '+(s.review?'st-shaky':s.earned?'st-mastered':'st-learning')+'">'+esc(s.label)+'</span></div><p>'+esc(message)+'</p><div class="bd-record-counts"><span><b>'+Math.min(2,s.days)+'/2</b> study days</span><span><b>'+Math.min(2,s.labelRoots)+'/2</b> labeling tasks</span><span><b>'+Math.min(2,s.readRoots)+'/2</b> graph-reading tasks</span></div><div class="row"><button class="btn pri" data-bd-practice="labels">'+(s.isDue?'Practice the figure':'Practice again')+'</button><a class="btn" href="#exam2/history">Saved sessions</a></div>'+(compact?'':'<details><summary>What this record counts</summary><p>Correct first responses without hints, at medium or high confidence. The label checks must include two different tasks in separate sessions on different study days (America/Chicago). Two different graph-reading questions are also required. Reading, watching, and immediate retries do not count as later recall. This is a lab practice rule, not a professor’s grading rule.</p><p>Existing concept mastery stays saved. A later miss keeps the earned figure record and brings this figure back for review. After the first successful day, return the following day; after recall across days, revisit in three days.</p></details>')+'</section>';
  }
  function reminderHTML(){var s=stats();return s.isDue?'<aside class="card bd-reminder"><b>Brittle–ductile figure · '+esc(s.events.length?'ready for review':'new source-figure practice')+'</b><p>'+esc(s.review?'Revisit the graph after a miss or uncertain answer.':s.days?'Check whether the labels and curve still make sense on a later study day.':'The new figure practice has its own record, even if the section’s concepts are already mastered.')+'</p><a class="btn" href="#exam2/topic/E2T7">Open the lesson</a><button class="btn pri" data-bd-practice="labels">Practice the figure</button></aside>':'';}
  function originalHTML(){return I.mediaHTML({kind:'img',localSource:true,src:ROOT+'strength-source.png',alt:'Original source graph: increasing strength to the right, depth downward, brittle upper crust, maximum near the transition, and ductile weakening below.',cap:'Exploring Geology, 2025 · §8.1, printed p. 211, figure 08.01.b6 · extracted source image'});}
  function sourceHTML(it){
    if(!it||it.practiceTrack!=='e2-brittle')return '';
    var passage=it.id===PREFIX+'stress'?'Textbook §8.1, PDF pp. 1–3: stress is force divided by the area receiving the force. Concentrating the same force onto less area increases stress.':it.id===PREFIX+'elastic'?'Textbook §8.1, PDF p. 6: small stress can cause slight elastic contraction; when stress exceeds strength, rock can fracture, fold, or flow as a weak solid.':it.id===PREFIX+'explain'?'Textbook §8.2, PDF p. 3: shallow compression can cause fracture and slip; deeper compression can squeeze hot rock into folds. These are different responses to the same type of differential stress.':'Textbook §8.1, PDF p. 7: increasing confinement holds fractures together in the upper crust. Deeper, increasing temperature permits solid-state flow. The transition is gradual; the text gives an approximate 15 km example and notes shallower transitions in unusually hot regions.';
    return '<details class="e2-source"><summary>Direct source material</summary><p>'+esc(passage)+'</p>'+originalHTML()+'<p class="small muted">Source summary in original wording; graph reproduced from the supplied textbook. The classroom photograph shows the same figure.</p>'+(local?'<a class="btn small" href="'+ROOT+'classroom-display.jpg" target="_blank" rel="noopener">Open classroom photograph</a> ':'')+'<a class="btn small" href="#exam2/topic/E2T7">Return to the complete lesson</a></details>';
  }
  function filmHTML(){
    var f=L.EXAM2_FILMS.E2T7;
    return '<section class="card ad-video bd-film" data-process-film="E2T7"><p class="eyebrow">Narrated process film · Clear voice</p><h2>Watch the graph and the rock together</h2><p>The original figure stays in view as the sample compresses, recovers, fractures, and folds.</p><video controls playsinline preload="metadata" poster="'+FILM+'.png" aria-label="Brittle–ductile source-figure animation"><source src="'+FILM+'.mp4" type="video/mp4"><track kind="captions" src="'+FILM+'.vtt" srclang="en" label="English narration" default></video><div class="ad-film-controls"><button class="btn small" data-bd-captions aria-pressed="true">Captions: on</button><div class="ad-chapters">'+f.stages.map(function(s){return '<button class="btn small" data-film-seek="'+s.start+'">'+esc(s.label)+'</button>';}).join('')+'</div><label>Speed <select data-film-speed aria-label="Playback speed"><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option></select></label></div><details class="ad-narration"><summary>Narration transcript</summary>'+f.stages.map(function(s){return '<p><strong>'+esc(s.label)+'.</strong> '+esc(s.text)+'</p>';}).join('')+'</details><a class="btn small" href="'+FILM+'.mp4" download>Save MP4</a> <a class="btn small" href="'+FILM+'.vtt">Captions file</a><p class="small muted">Synthetic Clear narration. Source graph: §8.1, figure 08.01.b6. Animated rock response is schematic; the rock remains solid. Watching supports study and does not award mastery.</p></section>';
  }
  function view(nav){
    var t=L.exam2.topic('E2T7'),st=E.conceptStats(),s=S.load().session;
    var resume=s&&s.examId==='exam2'&&s.queue.some(function(q){return q.ref.id.indexOf(PREFIX)===0;})&&s.idx<s.queue.length?'<a class="btn good" href="#session">Resume saved figure session</a>':'';
    return '<div class="bd-lesson"><p class="eyebrow">Chapter 8 · 8.1–8.2 · Source-figure lesson</p><h1>Brittle or ductile? Read the strength curve.</h1><p class="lede">Read the axes. Compare stress with strength. Explain why rock fractures here and flows there.</p>'+nav+'<div class="row bd-actions"><button class="btn pri" data-bd-practice="labels">Practice the figure</button><button class="btn" data-bd-practice="writing">Write a short answer</button>'+resume+'</div>'+filmHTML()+'<section class="card bd-source-study"><h2>The course figure</h2><p>This is the textbook version of the graph in your classroom photograph. Start with the axes before interpreting a color or a curve.</p><div class="bd-source-grid">'+originalHTML()+'<div class="bd-reading"><h3>Read it in three moves</h3><ol><li><b>Axes.</b> Right means greater strength or imposed stress; down means greater depth.</li><li><b>At one depth.</b> Left of the curve is below failure strength. Right of it exceeds the strength: fracture in the upper region, solid-state flow in the lower region.</li><li><b>Down the curve.</b> Confinement first strengthens the brittle crust. At greater depth, thermal effects dominate and make ductile flow easier.</li></ol><div class="traps"><b>The critical distinction.</b> Strength is the stress needed for failure. Stress is the applied loading. The curve is not a temperature line, and the red region is not liquid magma.</div><p class="small muted">The text gives roughly 15 km as an example transition depth. It is gradual and shallower in unusually hot regions; it is not a universal boundary.</p></div></div>'+(local?'<details><summary>Your supplied classroom photograph</summary>'+I.mediaHTML({kind:'img',localSource:true,src:ROOT+'classroom-display.jpg',alt:'Supplied classroom photograph showing the same strength–depth graph.',cap:'Supplied classroom photograph · displayed upright; original preserved'})+'<a href="'+ROOT+'classroom-original.JPG" download>Save original photograph</a></details>':'')+'<p class="small muted">Source: §8.1, PDF p. 7 / printed p. 211, figure 08.01.b6. The Chapter 8 Connect screenshots are still missing; this is original practice built from your supplied classroom/textbook figure.</p></section><section class="card"><h2>Same compression, different response</h2><div class="bd-example-grid"><div>'+I.mediaHTML({kind:'img',localSource:true,src:ROOT+'brittle-compression.png',alt:'Source illustration of compression causing brittle reverse slip, with displaced layers across an inclined fracture.',cap:'§8.2, PDF p. 3 · figure 08.02.a2'})+'<h3>Brittle: fracture and slip</h3><p>Cool, shallow rock breaks. Matching layers become offset across a fault. The break is the useful observation.</p></div><div>'+I.mediaHTML({kind:'img',localSource:true,src:ROOT+'ductile-compression.png',alt:'Source illustration of deeply buried rock compressed into a tight fold while remaining solid.',cap:'§8.2, PDF p. 3 · figure 08.02.a3'})+'<h3>Ductile: permanent bending or flow</h3><p>Deeper, hotter rock changes shape while solid. Continuous bent layers provide a geological example.</p></div></div><div class="e2-table"><table class="t"><thead><tr><th>Term</th><th>What it describes</th><th>Check yourself</th></tr></thead><tbody><tr><td>Stress</td><td>Force per unit area</td><td>The loading applied to rock</td></tr><tr><td>Strain</td><td>A change in size or shape</td><td>The response to loading</td></tr><tr><td>Elastic strain</td><td>Recoverable change</td><td>Original shape returns after unloading</td></tr><tr><td>Brittle / ductile</td><td>Permanent failure mechanisms</td><td>Break or slip / change shape while solid</td></tr></tbody></table></div><p>Compression, tension, and shear describe <b>stress direction</b>. Brittle and ductile describe <b>how rock responds</b>. They are different classifications.</p></section><section class="card bd-workshop"><h2>Figure workshop · word bank included</h2><p>Two tasks use this exact graph: label its axes and regions, then label rock responses on each side of the curve. Numbered locations carry no verbal answer clues. Answers and the original figure appear after you choose your confidence.</p><div class="row"><button class="btn pri" data-bd-practice="labels">Start figure practice</button><button class="btn" data-bd-practice="mixed">Practice the whole lesson</button></div><p class="small muted">Each short session includes graph interpretation and intervening questions. A missed figure returns after two other activities; low-confidence correct work returns after four when space is available. Immediate retries stay separate from later-day recall.</p></section>'+recordHTML(false)+'<section class="card"><h2>Write a complete, concise answer</h2><p>A complete answer needs the difference, the requested examples, and the relevant mechanism. Practice writing before revealing the model.</p><button class="btn pri" data-bd-practice="writing">Write and self-check</button><details class="bd-model"><summary>See a concise comparison</summary><p>Brittle deformation breaks rock or permits slip along a fracture, as in shallow faulting. Ductile deformation changes shape while rock remains solid, as in folding of deeper, hotter layers. Higher temperature makes solid-state deformation easier; flow does not require melting.</p></details></section><section class="card"><h2>Saved concept progress</h2>'+t.concepts.map(function(c){return '<p><b>'+esc(L.CONCEPTS[c].name)+'</b> <span class="badge st-'+st[c].status+'">'+esc(st[c].status)+'</span><br>'+esc(E.masteryNote(st[c]))+'</p>';}).join('')+'<p class="small muted">This concept record includes your earlier work. The separate figure record above shows whether you have practiced the actual visual across study days.</p><div class="row"><a class="btn" href="#guide/c8s2">Full section 8.2 notes</a><a class="btn" href="#exam2/review">Review misses</a><a class="btn" href="#exam2/history">My history</a><a class="btn" href="#data">Backup / restore</a></div></section>'+sourceHTML({id:PREFIX+'labels',practiceTrack:'e2-brittle'})+'</div>';
  }
  function wire(main){
    main.querySelectorAll('[data-bd-practice]').forEach(function(b){b.onclick=function(){start(b.dataset.bdPractice);};});
    main.querySelectorAll('[data-bd-captions]').forEach(function(b){
      var v=b.closest('[data-process-film]').querySelector('video'),f=L.EXAM2_FILMS.E2T7,track;
      // Inline cues also work for the supported file:// edition.
      if(typeof window.VTTCue==='function'&&v.addTextTrack){
        var external=v.querySelector('track');if(external)external.remove();
        track=v.addTextTrack('captions','English narration','en');f.cues.forEach(function(c){track.addCue(new window.VTTCue(c.start,c.end,c.text));});track.mode='showing';
      }else track=v.textTracks[0];
      b.onclick=function(){if(!track)return;track.mode=track.mode==='showing'?'hidden':'showing';b.setAttribute('aria-pressed',String(track.mode==='showing'));b.textContent='Captions: '+(track.mode==='showing'?'on':'off');};
    });
  }
  L.brittleDuctile={view:view,wire:wire,start:start,refs:refs,stats:stats,sourceHTML:sourceHTML,filmHTML:filmHTML,recordHTML:recordHTML,reminderHTML:reminderHTML,poster:FILM+'.png'};
})(window.L);
