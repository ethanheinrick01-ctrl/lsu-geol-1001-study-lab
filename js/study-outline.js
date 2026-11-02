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
function focusHTML(unit){
 const groups=focusGroups(unit),esc=L.util.esc;
 if(!groups)return '<p>'+esc(unit.explain)+'</p>';
 const sources=unit.sections.map(s=>'TB'+s.split('.')[0]+':'+s).concat(unit.extraSources||[]);
 return '<div class="pilot-reading-stack">'+groups.map(group=>'<section class="card pilot-section-card e2-focus-lesson" data-focus-reading="'+unit.n+'">'+group.html+'<div class="pilot-card-source">'+L.exam2.sourceHTML({examId:'exam2',src:sources,q:group.heading})+'</div><footer class="pilot-section-practice"><button class="btn pri" data-focus-practice="'+unit.id+'">Check this Focus section</button><p class="pilot-practice-help">These teaching groups share the same section checks and saved progress.</p></footer></section>').join('')+'</div>';
}
function focusLimit(unit){
 const plan=L.studyOutlineData.focus[unit.n];
 return plan&&plan.trapSource===unit.trap?plan.trapHTML:'<p>'+L.util.esc(unit.trap)+'</p>';
}
function keyHTML(hasLecture){
 return '<aside class="pilot-key" aria-label="Reading color key"><span><b class="pilot-key-term">Magenta</b> · terms &amp; names</span>'+(hasLecture?'<span><mark class="e2-study-emphasis">Yellow highlight</mark> · lecture emphasis</span>':'')+'<span><b class="pilot-key-checkpoint">Peach + label</b> · understanding checkpoint</span><small>Color guides reading; it does not predict exam questions.</small></aside>';
}
L.studyOutline={format:format,focusGroups:focusGroups,focusHTML:focusHTML,focusLimit:focusLimit,keyHTML:keyHTML};
})(window.L);
