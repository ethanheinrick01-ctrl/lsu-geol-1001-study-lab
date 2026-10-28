/* Blueprint transfer: direct section practice and an exam-scoped practice form.
   All selection, grading, mastery, retries and persistence use the existing GEOL engine. */
(function(L){
'use strict';
const E=L.engine,S=L.store,esc=L.util.esc,practiceRoute='exam2';
const chosen=new Set();let requested=20,customPlan=null,filter='';
function concepts(ids){
 const allowed=new Set(L.examScope.concepts('exam2'));
 return [...new Set(ids||[])].filter(c=>allowed.has(c)&&E.hasPracticeContent(c));
}
function inventory(ids){
 const selected=new Set(concepts(ids)),cases=E.CASE_OF();
 const items=E.itemsFor(it=>selected.has(it.c)&&it.examId==='exam2'&&it.t!=='teach'&&!cases[it.id]&&it.pool!=='boss'&&it.pool!=='exam1');
 return {authored:items.length,generated:[...selected].some(c=>(L.GEN_FOR[c]||[]).length>0)};
}
function plan(ids,n){
 const cs=concepts(ids),pool=inventory(cs);
 // An explicit empty selection must not fall back to mixed/all-concept practice.
 const refs=cs.length?E.practiceRefs({concepts:cs,n:n,examId:'exam2'}):[];
 return {concepts:cs,refs:refs,pool:pool,requested:n};
}
function countText(p){return p.pool.authored+' aligned questions available'+(p.pool.generated?' + generated variations':'')+' · '+p.refs.length+' in this set';}
function launch(p,title,back){
 if(!p||!p.refs.length)return false;
 // The same prepared references advertised in the UI launch the run.
 // newSession archives the previous session, retaining its drafts and first answers.
 L.examScope.select('exam2');E.newSession('practice',title,p.refs,{examId:'exam2',back:back});L.app.go('session');window.scrollTo(0,0);return true;
}
function sectionFooter(title,ids,context={}){
 const p=plan(ids,8),footer=document.createElement('footer');footer.className='pilot-section-practice';
 const section=context.section||ids.map(c=>L.SECTIONS.find(s=>s.id===L.CONCEPTS[c]?.sec)?.n).filter(Boolean).join(', '),back=context.back||practiceRoute;
 footer.innerHTML='<p class="pilot-pool-count">'+esc(countText(p))+'</p><button type="button" class="btn pri" '+(!p.refs.length?'disabled':'')+' aria-label="Practice textbook section '+esc(section)+' from '+esc(title)+'">Study this section · '+p.refs.length+' questions →</button><p class="pilot-practice-help">Practice covers textbook section '+esc(section)+', including its related teaching groups. Checked answers use your existing mastery record.</p>';
 footer.querySelector('button').onclick=()=>launch(p,section+' · '+title+' · section practice',back);return footer;
}
function resumeHTML(){const s=S.load().session;return s&&s.examId==='exam2'?'<section class="card pilot-resume"><h2>Continue studying</h2><p>Exam 2 · '+esc(s.title)+' · '+Math.min(s.idx+1,s.queue.length)+'/'+s.queue.length+'</p><div class="row"><a class="btn pri" href="#session">Resume saved session</a><a class="btn" href="#exam2/history">My study history</a></div></section>':'';}
function catalog(){
 const valid=new Set(concepts(L.examScope.concepts('exam2')));
 return L.EXAM2.topics.map(t=>({id:t.id,ch:t.ch,title:t.title,concepts:t.concepts.filter(c=>valid.has(c))})).filter(t=>t.concepts.length);
}
function render(main,chapter=0){
 const topics=catalog(),chapters=L.EXAMS.exam2.available,stats=E.conceptStats();
 main.innerHTML='<h1>Study · Exam 2</h1><p class="pilot-intro">Choose a mini-chapter to learn it or practice it. Use mixed practice to work across topics.</p>'+resumeHTML()+
 '<section class="card pilot-quick-practice"><h2>Quick start · Exam 2</h2><p>Practice the supplied chapters. Checked answers, confidence, and corrections use the same course record.</p><div class="row"><button type="button" class="btn pri" data-pilot-mixed>Start mixed practice</button>'+chapters.map(ch=>'<button type="button" class="btn" data-pilot-chapter="'+ch+'">Chapter '+ch+' practice</button>').join('')+'</div></section>'+
 '<details class="card pilot-builder"><summary>Build your own practice</summary><form id="pilot-practice-form"><div class="pilot-builder-options"><label for="pilot-set-length">Questions in this set</label><select id="pilot-set-length">'+[8,15,20].map(n=>'<option value="'+n+'"'+(n===requested?' selected':'')+'>'+n+' questions</option>').join('')+'</select><label for="pilot-topic-search">Find a section or concept</label><input id="pilot-topic-search" type="search" placeholder="For example: ocean, 10.11, stress" value="'+esc(filter)+'"></div><div class="row pilot-bulk"><button type="button" class="btn small" data-select-all>Select all</button><button type="button" class="btn small" data-clear-all>Clear selection</button></div><p class="pilot-builder-hint">Select one concept or combine sections across the supplied Exam 2 chapters.</p><div class="pilot-chapter-options">'+chapters.map(ch=>'<details class="pilot-chapter" '+(ch===10?'open':'')+' data-chapter="'+ch+'"><summary>'+esc(L.CHAPTERS[ch].name)+' <span class="pilot-chapter-count"></span></summary>'+topics.filter(t=>t.ch===ch).map(t=>'<fieldset class="pilot-topic" data-search="'+esc((t.title+' '+t.concepts.map(c=>L.CONCEPTS[c].name).join(' ')).toLowerCase())+'"><legend>'+esc(t.title)+'</legend>'+(t.concepts.length>1?'<button class="btn small" type="button" data-topic-all="'+esc(t.id)+'">All concepts in this topic</button>':'')+t.concepts.map(c=>'<label class="pilot-concept"><input type="checkbox" name="concept" value="'+esc(c)+'"'+(chosen.has(c)?' checked':'')+'><span>'+esc(L.CONCEPTS[c].name)+'<small>'+esc(stats[c].status==='mastered'?'Mastered':stats[c].reviewOpen?'Recent miss to review':'Available for practice')+'</small></span></label>').join('')+'</fieldset>').join('')+'</details>').join('')+'</div><p id="pilot-no-matches" hidden>No matching sections. Try a different term or clear the search.</p><div class="pilot-builder-launch"><p id="pilot-selection-count" role="status" aria-live="polite"></p><button class="btn pri" type="submit" aria-describedby="pilot-selection-count" disabled>Start selected practice</button><p class="pilot-practice-help">Misses and low-confidence answers may add spaced follow-up activities. Earlier runs stay available in <a href="#exam2/history">My history</a>.</p></div></form></details>'+
 '<details class="card pilot-other-practice"><summary>More practice formats</summary><div class="row"><a class="btn" href="#exam2/figures">Figure workshop</a><a class="btn" href="#exam2/writing">Short answers</a><a class="btn" href="#exam2/cases">Investigations</a><a class="btn" href="#exam2/boss">Challenges</a><a class="btn" href="#exam2/animations">Animated diagrams</a><a class="btn" href="#exam2/sets">Mock status</a></div><p class="pilot-practice-help">Full mocks remain deferred until the class review has been integrated.</p></details>'+
 '<nav class="pilot-chapter-nav" aria-label="Study chapters"><a class="btn" href="#exam2">All chapters</a>'+chapters.map(ch=>'<a class="btn" href="#exam2/chapter/'+ch+'"'+(chapter===ch?' aria-current="page"':'')+'>Chapter '+ch+'</a>').join('')+'</nav>'+
 chapters.filter(ch=>!chapter||ch===chapter).map(ch=>'<section class="pilot-topic-chapter"><h2>'+esc(L.CHAPTERS[ch].name)+'</h2><div class="exam-topics">'+L.EXAM2.topics.filter(t=>t.ch===ch).map(t=>L.exam1.ui.topicCard(t,'exam2')).join('')+'</div></section>').join('');
 main.querySelector('[data-pilot-mixed]').onclick=()=>{const p=plan(L.examScope.concepts('exam2'),20);launch(p,'Exam 2 · Mixed practice',practiceRoute);};
 main.querySelectorAll('[data-pilot-chapter]').forEach(b=>b.onclick=()=>{const ch=+b.dataset.pilotChapter,ids=topics.filter(t=>t.ch===ch).flatMap(t=>t.concepts);launch(plan(ids,15),'Exam 2 · Chapter '+ch+' practice',practiceRoute);});
 main.querySelectorAll('[data-e2-practice]').forEach(b=>b.onclick=()=>L.exam2.drill(b.dataset.e2Practice,null,b.dataset.concept));
 main.querySelectorAll('[data-e2-diagram]').forEach(b=>{const id=b.dataset.e2Diagram;if(!L.exam2.figureRefs(id).length)b.remove();else b.onclick=()=>L.exam2.drill(id,'figure');});
 main.querySelectorAll('.exam-topic>.eyebrow').forEach(p=>{p.textContent=p.textContent.replace(/^[^·]+ · /,'');});
 const form=main.querySelector('form');
 function update(){
  const ids=[...form.querySelectorAll('input[name="concept"]:checked')].map(x=>x.value);chosen.clear();ids.forEach(c=>chosen.add(c));customPlan=plan(ids,requested);
  form.querySelector('#pilot-selection-count').textContent=customPlan.concepts.length?customPlan.concepts.length+' concept'+(customPlan.concepts.length===1?'':'s')+' selected · '+countText(customPlan):'Select at least one concept to start a set.';
  form.querySelector('[type="submit"]').disabled=!customPlan.refs.length;
  form.querySelectorAll('.pilot-chapter').forEach(ch=>{const count=ch.querySelectorAll('input:checked').length;ch.querySelector('.pilot-chapter-count').textContent=count?'· '+count+' selected':'';});
 }
 form.addEventListener('change',e=>{if(e.target.id==='pilot-set-length')requested=+e.target.value;update();});
 form.querySelector('[data-select-all]').onclick=()=>{form.querySelectorAll('input[name="concept"]').forEach(x=>{if(!x.closest('fieldset').hidden)x.checked=true;});update();};
 form.querySelector('[data-clear-all]').onclick=()=>{form.querySelectorAll('input[name="concept"]').forEach(x=>x.checked=false);update();};
 form.querySelectorAll('[data-topic-all]').forEach(b=>b.onclick=()=>{b.closest('fieldset').querySelectorAll('input').forEach(x=>x.checked=true);update();});
 form.addEventListener('submit',e=>{e.preventDefault();if(customPlan&&customPlan.refs.length)launch(customPlan,'Exam 2 · Custom practice · '+customPlan.concepts.length+' concept'+(customPlan.concepts.length===1?'':'s'),practiceRoute);});
 const search=form.querySelector('#pilot-topic-search');
 function searchTopics(){filter=search.value;const q=filter.trim().toLowerCase();form.querySelector('[data-select-all]').textContent=q?'Select matching concepts':'Select all';let matches=0;form.querySelectorAll('.pilot-chapter').forEach(ch=>{let count=0;ch.querySelectorAll('fieldset').forEach(f=>{f.hidden=!!q&&!f.dataset.search.includes(q);if(!f.hidden)count++;});ch.hidden=!count;if(q&&count)ch.open=true;matches+=count;});form.querySelector('#pilot-no-matches').hidden=!!matches;}
 search.addEventListener('input',searchTopics);update();searchTopics();
}
L.pilotPractice={concepts:concepts,inventory:inventory,plan:plan,launch:launch,catalog:catalog,sectionFooter:sectionFooter,resumeHTML:resumeHTML,render:render};
const originalView=L.exam2.view;L.exam2.view=function(main,args){if(!args.length||['map','practice','chapter'].includes(args[0]))return render(main,args[0]==='chapter'?+args[1]:0);return originalView(main,args);};

})(window.L);
