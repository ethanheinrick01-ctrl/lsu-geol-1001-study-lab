/* Exam ownership is additive. Records without ownership belong to Exam 1. */
(function(L){
'use strict';
function current(){return L.store.load().settings.activeExam==='exam2'?'exam2':'exam1';}
function owner(x){if(!x)return 'exam1';if(x.examId)return x.examId;return x.ch>=7?'exam2':'exam1';}
function conceptOwner(c){var x=L.CONCEPTS[c],s=x&&L.SECTIONS.find(function(s){return s.id===x.sec;});return owner(s);}
function concepts(id){id=id||current();var av=available(id);return Object.keys(L.CONCEPTS).filter(function(c){var s=L.SECTIONS.find(function(s){return s.id===L.CONCEPTS[c].sec;});return conceptOwner(c)===id&&s&&av.indexOf(s.ch)>=0;});}
function available(id){return L.EXAMS[id||current()].available;}
function accepts(x,id){id=id||current();if(owner(x)!==id)return false;var av=available(id);return x&&x.ch?av.indexOf(x.ch)>=0:!x||!x.chs||x.chs.every(function(ch){return av.indexOf(ch)>=0;});}
function select(id){
 id=id==='exam2'?'exam2':'exam1';var s=L.store.load(),old=current();
 s.sessionsByExam=s.sessionsByExam||{};
 if(s.session){var own=s.session.examId||'exam1';s.sessionsByExam[own]=s.session;}
 if(old!==id){s.session=s.sessionsByExam[id]||null;s.settings.activeExam=id;L.store.save();}
 return id;
}
L.examScope={current:current,owner:owner,conceptOwner:conceptOwner,concepts:concepts,select:select,accepts:accepts,available:available};
})(window.L);
