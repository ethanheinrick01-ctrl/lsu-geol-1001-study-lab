/* Exact-text reading layouts; never rewrite a changed source or an assessment. */
(function(L){
'use strict';
function format(id,source){
 const plan=L.studyOutlineData.cards[id];
 return plan&&plan.source===source?plan.html:source;
}
function focusGroups(unit){
 const plan=L.studyOutlineData.focus[unit.n];
 if(!plan||plan.source!==unit.explain)return null;
 return plan.groups;
}
function markPhrases(root,phrases,className){
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const pattern=[...new Set(phrases||[])].filter(Boolean).sort((a,b)=>b.length-a.length).map(escape).join('|');
 if(!pattern)return;
 const re=new RegExp('(?<![A-Za-z0-9])('+pattern+')(?![A-Za-z0-9])','gi');
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];let node;
 while(node=walker.nextNode())if(!node.parentElement.closest('button,a,mark:not(.study-definition),h2,h3,h4,summary,.pilot-check-label'))nodes.push(node);
 nodes.forEach(node=>{
  let match,last=0,fragment=document.createDocumentFragment();re.lastIndex=0;
  while(match=re.exec(node.textContent)){
   fragment.append(node.textContent.slice(last,match.index));
   const mark=document.createElement('mark');mark.className=className;mark.textContent=match[0];fragment.append(mark);last=match.index+match[0].length;
  }
  if(last){fragment.append(node.textContent.slice(last));node.replaceWith(fragment);}
 });
}
function annotate(root,plan){
 if(!root||!plan||root.dataset.studyAnnotated||root.closest('.item,.feedback,.opts,.casebox'))return;
 root.querySelectorAll('mark.e2-study-term').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));
 root.normalize();
 markPhrases(root,plan.definitions,'study-definition');
 markPhrases(root,plan.terms,'pilot-term');
 (plan.checkpoints||[]).forEach(rule=>{
  const line=[...root.querySelectorAll('li,p')].reverse().find(el=>el.textContent.includes(rule.phrase));
  if(!line||line.classList.contains('pilot-checkpoint'))return;
  line.classList.add('pilot-checkpoint');
  const label=document.createElement('b');label.className='pilot-check-label';label.textContent=rule.label;line.prepend(label);
 });
 root.dataset.studyAnnotated='true';
}
function localLimits(group){
 const points=group.limitPoints||[];
 return points.length?'<ul class="e2-note-points study-local-limits">'+points.map(text=>'<li class="pilot-checkpoint"><b class="pilot-check-label">Evidence limit or distinction</b>'+L.util.esc(text)+'</li>').join('')+'</ul>':'';
}
function remainingFocusLimit(unit){
 const plan=L.studyOutlineData.focus[unit.n],groups=focusGroups(unit);
 if(groups&&plan.trapSource===unit.trap&&groups.some(g=>g.limitPoints?.length))return '';
 return '<div class="pilot-checkpoint"><b class="pilot-check-label">Evidence limit or distinction</b>'+focusLimit(unit)+'</div>';
}
function focusHTML(unit){
 const groups=focusGroups(unit),esc=L.util.esc;
 if(!groups)return '<p>'+esc(unit.explain)+'</p>';
 const limitsMatch=L.studyOutlineData.focus[unit.n].trapSource===unit.trap;
 const sources=unit.sections.map(s=>'TB'+s.split('.')[0]+':'+s).concat(unit.extraSources||[]);
 return '<div class="pilot-reading-stack">'+groups.map((group,index)=>'<section class="card pilot-section-card e2-focus-lesson" data-focus-reading="'+unit.n+'" data-focus-group="'+index+'">'+group.html.replace('</section>',(limitsMatch?localLimits(group):'')+'</section>')+'<div class="pilot-card-source">'+L.exam2.sourceHTML({examId:'exam2',src:sources,q:group.heading})+'</div><footer class="pilot-section-practice"><button class="btn pri" data-focus-practice="'+unit.id+'">Check this Focus section</button><p class="pilot-practice-help">These teaching groups share the same section checks and saved progress.</p></footer></section>').join('')+'</div>';
}
function focusLimit(unit){
 const plan=L.studyOutlineData.focus[unit.n];
 return plan&&plan.trapSource===unit.trap?plan.trapHTML:'<p>'+L.util.esc(unit.trap)+'</p>';
}
function keyHTML(hasLecture,hasDefinitions=false){
 return '<aside class="pilot-key" aria-label="Reading color key"><span><b class="pilot-key-term">Magenta</b> · terms &amp; names</span>'+(hasLecture?'<span><mark class="e2-study-emphasis">Yellow highlight</mark> · lecture emphasis</span>':'')+(hasDefinitions?'<span><b class="study-key-definition">Lime</b> · meaning &amp; sequence</span>':'')+'<span><b class="pilot-key-checkpoint">Peach + label</b> · understanding checkpoint</span></aside>';
}
L.studyOutline={format:format,focusGroups:focusGroups,focusHTML:focusHTML,focusLimit:focusLimit,remainingFocusLimit:remainingFocusLimit,keyHTML:keyHTML,annotate:annotate};
})(window.L);
