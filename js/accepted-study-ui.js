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
function jump(id){document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
function active(){const hash=location.hash;return L.examScope?.current()==='exam2'&&!hash.startsWith('#exam1')&&hash!=='#exams'&&(hash!=='#session'||L.engine.currentSession()?.examId==='exam2');}
function shell(){
 const hash=location.hash,kind=/review/.test(hash)?'review':/progress|history/.test(hash)?'progress':'study';
 if(header.dataset.pilot===kind)return;header.dataset.pilot=kind;
 const nav=(name,href,id)=>'<a href="'+href+'"'+(kind===id?' class="selected" aria-current="page"':'')+'>'+name+'</a>';
 header.innerHTML='<div class="pilot-header"><div class="pilot-identity"><a class="pilot-brand" href="#exam2">GEOL 1001 Lab<span>Physical Geology · Study &amp; Practice</span></a><div class="pilot-tools"><span>Exam 2</span><details><summary>Tools</summary><div class="pilot-tools-menu"><a href="#exam2/focus">Exam 2 focus</a><a href="#exam2/sets">Final mocks · 35 + 9</a><a href="#exam2/sources">Coverage and sources</a><a href="#data">Backup / restore · all exams</a><a href="#exam2/zhuang">Instructor study guidance</a><a href="#exams">Switch exams</a><a href="#exam1">Open Exam 1</a></div></details></div></div><nav aria-label="Main">'+nav('Study','#exam2','study')+nav('Review','#review','review')+nav('My progress','#exam2/progress','progress')+'</nav></div>';
}
function decorateLesson(){
 if(main.querySelector('.pilot-reading-stack'))return;
 const route=location.hash.slice(1).split('/'),section=route[0]==='guide'?L.SECTIONS.find(s=>s.id===route[1]):null;
 const topic=route[1]==='topic'?L.exam2.topic(route[2]):section?L.EXAM2.topics.find(t=>t.sections.includes(section.n)):null;
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
   if(plan)L.studyOutline.annotate(group,plan);
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
 stack.insertAdjacentHTML('beforebegin',L.studyOutline.keyHTML(!!stack.querySelector('mark.e2-study-emphasis'),!!stack.querySelector('.study-definition,[data-study-source]')));
 const order=L.EXAM2.topics,at=order.findIndex(t=>t.id===topic.id),prev=order[at-1],next=order[at+1];
 main.insertAdjacentHTML('beforeend','<nav class="pilot-bottom" aria-label="Adjacent mini-chapters">'+(prev?'<a href="#exam2/topic/'+esc(prev.id)+'">← '+esc(prev.title)+'</a>':'')+'<a href="#exam2">Return to Study</a>'+(next?'<a href="#exam2/topic/'+esc(next.id)+'">'+esc(next.title)+' →</a>':'')+'</nav>');
}
function augmentProgress(){
 if(!/progress/.test(location.hash)||main.querySelector('.pilot-history-access'))return;
 const box=document.createElement('section');box.className='card pilot-history-access';box.innerHTML='<h2>My study history</h2><p>Resume saved sessions or inspect your original answers and corrections.</p><a class="btn" href="#exam2/history">Open saved sessions and history</a>';
 main.querySelector('h1')?.after(box);box.insertAdjacentHTML('beforebegin',L.pilotPractice.resumeHTML());
}
function decorateLegacyLesson(){
 const topicId=location.hash.startsWith('#exam1/topic/')?location.hash.split('/')[2]:null;
 const practice=topicId?main.querySelector('[data-topic="'+topicId+'"]'):main.querySelector('#pracSec');
 main.querySelectorAll('.gcard:not([data-study-decorated])').forEach(owner=>{
  const groups=[...owner.querySelectorAll('.e2-note-group')].filter(g=>!g.closest('details'));
  if(!groups.length)return;
  owner.dataset.studyDecorated='true';
  const source=owner.querySelector('.srcline')||[...owner.querySelectorAll(':scope > p')].find(p=>p.textContent.startsWith('Answer sources'));
  const stack=document.createElement('div');stack.className='pilot-reading-stack';owner.before(stack);
  const oldHeading=owner.querySelector(':scope > h2');if(oldHeading&&oldHeading.textContent===groups[0].querySelector('.e2-note-heading')?.textContent)oldHeading.remove();
  groups.forEach(group=>{
   const old=group.querySelector('.e2-note-heading'),heading=document.createElement('h2');heading.className='e2-note-heading';heading.textContent=old.textContent;old.replaceWith(heading);
   const card=document.createElement('section');card.className='card pilot-section-card';card.append(group);
   if(source){const details=document.createElement('details');details.className='pilot-card-source';const summary=document.createElement('summary');summary.textContent='Sources for this section';details.append(summary,source.cloneNode(true));card.append(details);}
   if(practice){const footer=document.createElement('footer');footer.className='pilot-section-practice';const button=document.createElement('button');button.className='btn pri';button.textContent=topicId?'Practice this topic':'Practice this section';button.onclick=()=>practice.click();const help=document.createElement('p');help.className='pilot-practice-help';help.textContent='These teaching groups share the existing '+(topicId?'topic':'section')+' practice and saved progress.';footer.append(button,help);card.append(footer);}
   stack.append(card);
  });
  owner.classList.add('pilot-reference-card');
 });
 const stack=main.querySelector('.pilot-reading-stack');
 if(stack&&!main.querySelector('.pilot-key'))stack.insertAdjacentHTML('beforebegin',L.studyOutline.keyHTML(!!main.querySelector('.pilot-section-card mark.e2-study-emphasis')));
}
function apply(){
 const legacy=/^#exam1\/topic\//.test(location.hash)||/^#guide\/c[1-6]s/.test(location.hash);
 if(!active()&&!legacy){document.body.classList.remove('pilot-active','pilot-hub');if(header.dataset.pilot){header.innerHTML=originalHeader;delete header.dataset.pilot;}return;}
 if(!main.children.length)return;
 if(['#practice','#home'].includes(location.hash)){L.app.go('exam2');return;}
 document.title=(main.querySelector('h1')?.textContent||'Study')+' · GEOL 1001';
 document.body.classList.add('pilot-active');document.body.classList.toggle('pilot-hub',/^#exam2(?:\/(?:practice|chapter\/\d+))?\/?$/.test(location.hash));
 if(legacy){if(header.dataset.pilot){header.innerHTML=originalHeader;delete header.dataset.pilot;}decorateLegacyLesson();return;}shell();
 main.querySelectorAll('.exam-tools').forEach(el=>el.hidden=true);
 main.querySelectorAll('a[href="#practice"]').forEach(a=>a.href='#exam2');
 if(/^#exam2\/topic\//.test(location.hash)||/^#guide\/c/.test(location.hash))decorateLesson();augmentProgress();
 main.querySelectorAll('[data-focus-reading]').forEach(card=>{
  const plan=L.studyOutlineData.focus[card.dataset.focusReading];
  if(plan)L.studyOutline.annotate(card.querySelector('.e2-note-group'),plan.groups[card.dataset.focusGroup]||plan);
 });
 main.querySelectorAll('[data-focus-summary]').forEach(card=>{
  const plan=L.studyOutlineData.focus[card.dataset.focusSummary];
  if(plan?.summary)L.studyOutline.annotate(card.querySelector('.e2-focus-skills'),plan.summary);
 });
 L.exam2Notes.apply(main);
 main.querySelectorAll('[data-study-source]').forEach(source=>{
  const plan=L.studySourceReading?.[source.dataset.studySource];
  if(plan&&plan.source===L.EXAM2_SOURCES[source.dataset.studySource]?.pages[0].text)L.studyOutline.annotate(source,plan);
 });
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
