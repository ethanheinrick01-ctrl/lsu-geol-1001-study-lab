/* Blueprint-aligned local UI. Existing course content and engine remain authoritative. */
(function(L){
'use strict';
if(!document.querySelector)return;
const main=document.querySelector('#main'),header=document.querySelector('header.top');if(!main||!header)return;const originalHeader=header.innerHTML;
const lessonRoute='#exam2/topic/E2C10S11';
const vocabulary=[
 ['Pangaea','Rift systems','oceanic crust','supercontinent','Central Atlantic','South Atlantic','North Atlantic'],
 ['Indian Ocean','India–Asia convergence','Tethyan closure','Spreading','oceanic lithosphere','subduction','Atlantic','Pacific'],
 ['Pangaea','rifting','Central Atlantic','South Atlantic','northern Atlantic','Gondwana','Indian Ocean','India–Asia collision','Tethys'],
 ['Central Atlantic','South Atlantic','northern Atlantic','Continental rifting','seafloor spreading','Gondwana','Tethys','convergence'],
 ['Spreading','lithosphere','subduction','Atlantic–Pacific contrast','reconstruction','forecasts']
];
const checkpoints=[
 ['the Central Atlantic opened before','Opening sequence'],
 ['Spreading creates oceanic lithosphere','Creation and consumption'],
 ['A future map is a conditional scenario','A forecast has conditions'],
 ['An expanding ocean does not imply','Keep the distinction'],
 ['Do not turn it into a claim that no subduction','Keep the limit']
];
function markTerms(el,terms){
 const used=new Set(),walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];let n;
 while(n=walker.nextNode())if(!n.parentElement.closest('button,a,mark,h2,h3,h4,summary,.pilot-check-label'))nodes.push(n);
 const pattern=terms.slice().sort((a,b)=>b.length-a.length).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');if(!pattern)return;
 const re=new RegExp('\\b('+pattern+')\\b','gi');
 nodes.forEach(node=>{let match,last=0,frag=document.createDocumentFragment(),changed=false;re.lastIndex=0;
  while(match=re.exec(node.textContent)){const key=match[0].toLowerCase();if(used.has(key))continue;used.add(key);frag.append(node.textContent.slice(last,match.index));const m=document.createElement('mark');m.className='pilot-term';m.textContent=match[0];frag.append(m);last=match.index+match[0].length;changed=true;}
  if(changed){frag.append(node.textContent.slice(last));node.replaceWith(frag);}
 });
}
function jump(id){document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
function active(){const hash=location.hash;return L.examScope?.current()==='exam2'&&!hash.startsWith('#exam1')&&hash!=='#exams'&&(hash!=='#session'||L.engine.currentSession()?.examId==='exam2');}
function shell(){
 const hash=location.hash,kind=/review/.test(hash)?'review':/progress|history/.test(hash)?'progress':'study';
 if(header.dataset.pilot===kind)return;header.dataset.pilot=kind;
 const nav=(name,href,id)=>'<a href="'+href+'"'+(kind===id?' class="selected" aria-current="page"':'')+'>'+name+'</a>';
 header.innerHTML='<div class="pilot-header"><div class="pilot-identity"><a class="pilot-brand" href="#exam2">GEOL 1001 Lab<span>Physical Geology · Study &amp; Practice</span></a><div class="pilot-tools"><span>Exam 2</span><details><summary>Tools</summary><div class="pilot-tools-menu"><a href="#exam2/sources">Coverage and sources</a><a href="#data">Backup / restore · all exams</a><a href="#exam2/zhuang">Instructor study guidance</a><a href="#exams">Switch exams</a><a href="#exam1">Open Exam 1</a></div></details></div></div><nav aria-label="Main">'+nav('Study','#exam2','study')+nav('Review','#review','review')+nav('My progress','#exam2/progress','progress')+'</nav></div>';
}
function decorateLesson(){
 if(main.querySelector('.pilot-reading-stack'))return;
 const route=location.hash.slice(1).split('/'),topic=route[1]==='topic'?L.exam2.topic(route[2]):null;
 if(!topic||!L.pilotPractice)return;
 const title=main.querySelector('h1'),roots=[...main.querySelectorAll('[data-e2-reading]')].filter(el=>!el.closest('.item,.feedback,.opts,.casebox,details'));
 if(!title||!roots.length)return;
 const esc=L.util.esc,sectionNames=topic.sections.join(', '),firstCard=roots[0].closest('.card');
 const crumb=title.previousElementSibling;if(crumb?.tagName==='P')crumb.innerHTML='<a href="#exam2">Study</a> / <a href="#exam2/chapter/'+topic.ch+'">Chapter '+topic.ch+'</a> / '+esc(sectionNames);
 const intro=document.createElement('p');intro.className='pilot-intro';intro.textContent=topic.sections.length===1?'Read the evidence, connect the processes, then practice textbook section '+sectionNames+'.':'Connect the evidence across textbook sections '+sectionNames+'.';title.after(intro);
 const actions=document.createElement('div');actions.className='row pilot-lesson-actions';
 const practice=[...main.querySelectorAll('[data-e2-practice]')].find(b=>b.dataset.e2Practice===topic.id&&!b.dataset.concept);
 const figurePractice=[...main.querySelectorAll('[data-e2-diagram]')].find(b=>b.dataset.e2Diagram===topic.id);
 if(practice){practice.textContent='Practice this mini-chapter';practice.id='pilot-practice';practice.classList.add('pri');actions.append(practice);}
 if(figurePractice&&L.exam2.figureRefs(topic.id).length){figurePractice.textContent='Practice its figures';actions.append(figurePractice);}intro.after(actions);
 const video=main.querySelector('video'),watch=video?.closest('section')||video?.closest('.card');if(watch)watch.id='pilot-watch';
 const figureHeading=[...main.querySelectorAll('h2')].find(h=>h.textContent==='The course figures'),figures=figureHeading?.closest('section')||figureHeading?.parentElement;if(figures)figures.id='pilot-figures';
 const stack=document.createElement('div');stack.id='pilot-read';stack.className='pilot-reading-stack';(firstCard||roots[0]).before(stack);
 const cards=topic.sections.flatMap(n=>{const sec=L.SECTIONS.find(s=>s.n===n&&s.examId==='exam2');return sec?L.GUIDE[sec.id]||[]:[];});
 roots.forEach(root=>{
  const cd=cards.find(c=>c.id===root.dataset.e2Reading);if(!cd)return;
  const owner=root.closest('.card'),oldTopic=root.closest('.e2-note-topic');
  const groups=[...root.querySelectorAll('.e2-note-group')].filter(g=>!g.closest('details'));
  if(!groups.length){const group=document.createElement('div');group.className='pilot-prose';while(root.firstChild)group.append(root.firstChild);root.append(group);groups.push(group);}
  const section=[...new Set(cd.c.map(c=>L.SECTIONS.find(s=>s.id===L.CONCEPTS[c]?.sec)?.n).filter(Boolean))].join(', ');
  groups.forEach((group,index)=>{
   const card=document.createElement('section');card.className='card pilot-section-card';card.dataset.sourceCard=cd.id;card.dataset.concepts=cd.c.join(' ');
   let heading=group.querySelector('.e2-note-heading');if(heading){const h=document.createElement('h2');h.className='e2-note-heading';h.textContent=heading.textContent;heading.replaceWith(h);heading=h;}else{heading=document.createElement('h2');heading.className='e2-note-heading';heading.textContent=cd.h;group.prepend(heading);}
   const plan=L.studyReading?.[cd.id]?.[index];
   if(plan){group.querySelectorAll('mark.e2-study-term').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));markTerms(group,plan.terms||[]);
    (plan.checkpoints||[]).forEach(rule=>{const line=[...group.querySelectorAll('li,p')].find(el=>el.textContent.includes(rule.phrase));if(line&&!line.classList.contains('pilot-checkpoint')){line.classList.add('pilot-checkpoint');const label=document.createElement('b');label.className='pilot-check-label';label.textContent=rule.label;line.prepend(label);}});
   }
   card.append(group);
   const gallery=figures?[...figures.querySelectorAll('figure')]:[];
   const matched=gallery.find(f=>f.querySelector('img')?.alt.startsWith(heading.textContent+' ·'));
   const approved=topic.id==='E2C10S11'&&cd.id==='g10-11-a'?(index===0?gallery[0]:index===2?gallery[1]:null):null;
   const inline=matched||approved;if(inline){const copy=inline.cloneNode(true);copy.classList.add('pilot-inline-figure');card.append(copy);}
   const source=document.createElement('div');source.innerHTML=L.exam2.sourceHTML({examId:'exam2',src:cd.src,q:cd.h});source.className='pilot-card-source';card.append(source);
   card.append(L.pilotPractice.sectionFooter(heading.textContent,cd.c,{section:section,back:'exam2/topic/'+topic.id}));stack.append(card);
  });
  if(oldTopic){oldTopic.classList.add('pilot-source-group');if(!oldTopic.querySelector('figure,details,button,input,a,table,p,li'))oldTopic.remove();}
  if(owner){owner.classList.add('pilot-reference-card');owner.id='pilot-sources';}
 });
 const toolbar=document.createElement('nav');toolbar.className='pilot-toolbar';toolbar.innerHTML='<button type="button" data-pilot-jump="pilot-read">Read</button>'+(watch?'<button type="button" data-pilot-jump="pilot-watch">Watch / listen</button>':'')+(figures?'<button type="button" data-pilot-jump="pilot-figures">Figures</button>':'');stack.before(toolbar);
 const key=document.createElement('aside');key.className='pilot-key';key.setAttribute('aria-label','Reading color key');key.innerHTML='<span><b class="pilot-key-term">Magenta:</b> terms &amp; names</span><span><b class="pilot-key-gold">Gold:</b> lecture emphasis</span><span><b class="pilot-key-checkpoint">Peach + label:</b> understanding checkpoint</span><small>Color guides reading; it does not predict exam questions.</small>';stack.before(key);
 const order=L.EXAM2.topics,at=order.findIndex(t=>t.id===topic.id),prev=order[at-1],next=order[at+1];
 main.insertAdjacentHTML('beforeend','<nav class="pilot-bottom" aria-label="Adjacent mini-chapters">'+(prev?'<a href="#exam2/topic/'+esc(prev.id)+'">← '+esc(prev.title)+'</a>':'')+'<a href="#exam2">Return to Study</a>'+(next?'<a href="#exam2/topic/'+esc(next.id)+'">'+esc(next.title)+' →</a>':'')+'</nav>');
}
function augmentProgress(){
 if(!/progress/.test(location.hash)||main.querySelector('.pilot-history-access'))return;
 const box=document.createElement('section');box.className='card pilot-history-access';box.innerHTML='<h2>My study history</h2><p>Resume saved sessions or inspect your original answers and corrections.</p><a class="btn" href="#exam2/history">Open saved sessions and history</a>';
 main.querySelector('h1')?.after(box);box.insertAdjacentHTML('beforebegin',L.pilotPractice.resumeHTML());
}
function apply(){
 if(!active()){document.body.classList.remove('pilot-active','pilot-hub');if(header.dataset.pilot){header.innerHTML=originalHeader;delete header.dataset.pilot;}return;}
 if(!main.children.length)return;
 if(['#practice','#home'].includes(location.hash)){L.app.go('exam2');return;}
 document.title=(main.querySelector('h1')?.textContent||'Study')+' · GEOL 1001';
 document.body.classList.add('pilot-active');document.body.classList.toggle('pilot-hub',/^#exam2(?:\/(?:practice|chapter\/\d+))?\/?$/.test(location.hash));shell();
 main.querySelectorAll('.exam-tools').forEach(el=>el.hidden=true);
 main.querySelectorAll('a[href="#practice"]').forEach(a=>a.href='#exam2');
 if(/^#exam2\/topic\//.test(location.hash))decorateLesson();augmentProgress();
 main.querySelectorAll('table').forEach(table=>{if(!table.closest('.card')){const frame=document.createElement('div');frame.className='card pilot-table-frame';table.before(frame);frame.append(table);}});
 const foot=document.querySelector('.foot');if(foot)foot.textContent='Progress saves in this browser. Tools includes backup for all exams. Course figures © their owners.';
}
main.addEventListener('click',e=>{
 const target=e.target.closest('[data-pilot-jump]');if(target)jump(target.dataset.pilotJump);
 const zoom=e.target.closest('[data-zoom]');if(zoom&&!zoom._z){const d=document.getElementById('zoomdlg');document.getElementById('zoomimg').src=zoom.dataset.zoom;document.getElementById('zoomimg').alt=zoom.dataset.cap||'';document.getElementById('zoomcap').textContent=zoom.dataset.cap||'';d.showModal();}
});
header.addEventListener('keydown',e=>{if(e.key==='Escape'){const d=header.querySelector('details[open]');if(d){d.open=false;d.querySelector('summary').focus();}}});
new MutationObserver(apply).observe(main,{childList:true});window.addEventListener('hashchange',()=>requestAnimationFrame(apply));
if(!location.hash)location.hash='#exam2';else apply();
})(window.L);
