/* Item renderer shared by practice, review, Boss, cases, and mock. Pure DOM. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {}, U = L.util, esc = U.esc;

  function srcChips(list) {
    return (list || []).map(function (c) {
      var p = L.srcParse(c), s = p.src || {};
      return '<span class="src t' + (s.tier || 2) + '" title="' + esc((s.t || c) + (s.note ? ': ' + s.note : '')) + '">' + esc(L.srcLabel(c)) + '</span>';
    }).join('');
  }
  function tierBadge(t) { var T = L.TIERS[t]; return T ? '<span class="tier tier' + t + '" title="' + esc(T.desc) + '">' + esc(T.short) + '</span>' : ''; }
  function mediaHTML(m, opts) {
    if (!m) return '';
    opts = opts || {};
    if (Array.isArray(m)) return '<div class="media-row">' + m.map(function (x) { return mediaHTML(x, opts); }).join('') + '</div>';
    if (m.kind === 'img') return '<figure class="media"><button type="button" class="zoom" data-zoom="' + esc(m.src) + '" data-cap="' + esc(m.cap || m.alt || '') + '" aria-label="Enlarge image"><img src="' + esc(m.src) + '" alt="' + esc(m.alt || '') + '" loading="lazy"></button>' + (m.cap ? '<figcaption>' + esc(m.cap) + '</figcaption>' : '') + '</figure>';
    if (m.kind === 'svg' && L.MEDIA[m.name]) return '<figure class="media svgm">' + L.MEDIA[m.name](m.spec || {}, opts) + (m.cap ? '<figcaption>' + esc(m.cap) + '</figcaption>' : '') + '</figure>';
    if (m.kind === 'missing') return '<div class="missing"><b>Source figure unavailable.</b> ' + esc(m.note || '') + '</div>';
    return '';
  }
  function caseHeader(it, opts) {
    if (!it.caseId) return '';
    var cs = L.engine.caseById(it.caseId); if (!cs) return '';
    return '<div class="casebox"><div class="spread"><b>Investigation: ' + esc(cs.title) + '</b><span class="tiny muted">part ' + (it.caseIdx + 1) + ' of ' + cs.items.length + '</span></div><div class="stem">' + cs.stem + '</div>' + mediaHTML(cs.media, opts) + '</div>';
  }
  function makeOrder(it) {
    if (!it.o) return null;
    var idx = it.o.map(function (_, i) { return i; });
    return it.fixedOrder ? idx : U.shuffleNotIdentity(idx);
  }
  /* cfg: {mode:'practice'|'boss'|'mock'|'review-locked', order, response, onChange, onSubmit(resp, conf, assisted), graded, locked, header, allowHint} */
  function render(host, it, cfg) {
    cfg = cfg || {};
    var order = cfg.order || makeOrder(it);
    var state = { resp: cfg.response !== undefined ? U.clone(cfg.response) : undefined, assisted: !!cfg.assisted };
    var locked = !!cfg.locked, isMock = cfg.mode === 'mock';
    if ((it.t === 'match') && !cfg.rights) cfg.rights = U.shuffleNotIdentity(U.uniq(it.pairs.map(function (p) { return p[1]; }).concat(it.extra || [])));
    if (it.t === 'order' && state.resp === undefined) state.resp = cfg.orderStart || U.shuffleNotIdentity(it.seq);
    var h = [];
    h.push('<div class="item">');
    h.push('<div class="qhead"><span class="muted small">' + (cfg.header || '') + '</span><span>' + (!isMock || locked ? tierBadge(it.tier) : '') + '</span></div>');
    h.push(caseHeader(it, cfg));
    h.push('<div class="prompt">' + it.q + '</div>');
    if (it.media) h.push(mediaHTML(it.media, { reveal: locked }));
    h.push('<div class="answer"></div><div class="actions"></div><div class="feedback" aria-live="polite"></div></div>');
    host.innerHTML = h.join('');
    var ans = host.querySelector('.answer'), act = host.querySelector('.actions'), fbEl = host.querySelector('.feedback');
    function changed() { if (cfg.onChange) cfg.onChange(state.resp); updateActions(); }
    function hasResp() { return L.engine.hasResponse(it, state.resp); }

    if (it.t === 'mc' || it.t === 'tf' || it.t === 'ms') {
      var multi = it.t === 'ms';
      if (multi) ans.insertAdjacentHTML('beforeend', '<p class="small muted">Select all that apply.</p>');
      var wrap = U.el('div', { class: 'opts', role: multi ? 'group' : 'radiogroup', 'aria-label': 'Answer choices' });
      order.forEach(function (oi, pos) {
        var o = it.o[oi];
        var b = U.el('button', { class: 'opt', type: 'button', 'data-oi': oi, role: multi ? 'checkbox' : 'radio', 'aria-checked': 'false' }, '<span class="k">' + (multi ? '' : String.fromCharCode(65 + pos)) + '</span><span class="tx">' + esc(o.t) + '</span>');
        if (locked) b.disabled = true;
        b.addEventListener('click', function () {
          if (locked) return;
          if (multi) { var arr = (state.resp || []).slice(), at = arr.indexOf(oi); if (at >= 0) arr.splice(at, 1); else arr.push(oi); state.resp = arr.length ? arr : undefined; }
          else state.resp = oi;
          paint(); changed();
        });
        wrap.appendChild(b);
      });
      ans.appendChild(wrap);
      var paint = function () {
        wrap.querySelectorAll('.opt').forEach(function (b) {
          var oi = +b.getAttribute('data-oi'), on = multi ? (state.resp || []).indexOf(oi) >= 0 : state.resp === oi;
          b.classList.toggle('sel', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
          if (multi) b.querySelector('.k').textContent = on ? '✓' : '';
        });
      };
      paint();
    } else if (it.t === 'fill' || it.t === 'num') {
      var inp = U.el('input', { type: 'text', inputmode: it.t === 'num' ? 'decimal' : 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': it.t === 'num' ? 'Numeric answer' : 'Type the term', placeholder: it.t === 'num' ? 'Number' : 'Type the term' });
      if (state.resp !== undefined) inp.value = state.resp;
      if (locked) inp.disabled = true;
      inp.addEventListener('input', function () { state.resp = inp.value === '' ? undefined : inp.value; changed(); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !isMock && hasResp() && !locked) { e.preventDefault(); var b = act.querySelector('[data-conf="m"]'); if (b) b.focus(); } });
      var fr = U.el('div', { class: 'formrow' }); fr.appendChild(inp); if (it.unit) fr.appendChild(U.el('span', { class: 'muted' }, esc(it.unit)));
      ans.appendChild(fr);
    } else if (it.t === 'match') {
      if (!state.resp) state.resp = it.pairs.map(function () { return ''; });
      it.pairs.forEach(function (p, i) {
        var row = U.el('div', { class: 'formrow match' }), id = 'm' + i + '-' + String(it.id).replace(/\W/g, '');
        row.appendChild(U.el('label', { for: id }, esc(p[0])));
        var sel = U.el('select', { id: id }); sel.appendChild(U.el('option', { value: '' }, 'Choose…'));
        cfg.rights.forEach(function (rt) { var op = U.el('option', { value: rt }, esc(rt)); if (state.resp[i] === rt) op.selected = true; sel.appendChild(op); });
        if (locked) sel.disabled = true;
        sel.addEventListener('change', function () { state.resp[i] = sel.value; changed(); });
        row.appendChild(sel); ans.appendChild(row);
      });
    } else if (it.t === 'parts') {
      if (!state.resp) state.resp = it.parts.map(function () { return ''; });
      it.parts.forEach(function (p, i) {
        var row = U.el('div', { class: 'formrow match' }), id = 'p' + i + '-' + String(it.id).replace(/\W/g, '');
        row.appendChild(U.el('label', { for: id }, esc(p.label)));
        var sel = U.el('select', { id: id }); sel.appendChild(U.el('option', { value: '' }, 'Choose…'));
        p.options.forEach(function (op) { var o = U.el('option', { value: op }, esc(op)); if (state.resp[i] === op) o.selected = true; sel.appendChild(o); });
        if (locked) sel.disabled = true;
        sel.addEventListener('change', function () { state.resp[i] = sel.value; changed(); });
        row.appendChild(sel); ans.appendChild(row);
      });
    } else if (it.t === 'order') {
      var ol = U.el('ol', { class: 'orderlist' });
      var draw = function () {
        ol.innerHTML = '';
        state.resp.forEach(function (txt, i) {
          var li = U.el('li'); li.appendChild(U.el('span', { class: 'ot' }, esc(txt)));
          if (!locked) {
            var up = U.el('button', { class: 'btn icon', type: 'button', 'aria-label': 'Move "' + txt + '" up' }, '▲');
            var dn = U.el('button', { class: 'btn icon', type: 'button', 'aria-label': 'Move "' + txt + '" down' }, '▼');
            up.disabled = i === 0; dn.disabled = i === state.resp.length - 1;
            up.onclick = function () { var a = state.resp, t = a[i - 1]; a[i - 1] = a[i]; a[i] = t; draw(); changed(); var b = ol.children[i - 1] && ol.children[i - 1].querySelector('button'); if (b) b.focus(); };
            dn.onclick = function () { var a = state.resp, t = a[i + 1]; a[i + 1] = a[i]; a[i] = t; draw(); changed(); var b = ol.children[i + 1] && ol.children[i + 1].querySelectorAll('button')[1]; if (b) b.focus(); };
            li.appendChild(up); li.appendChild(dn);
          }
          ol.appendChild(li);
        });
      };
      draw(); ans.appendChild(U.el('p', { class: 'small muted' }, esc(it.orderHint || 'Arrange from first (top) to last (bottom).')));
      ans.appendChild(ol);
      if (isMock && cfg.onChange) cfg.onChange(state.resp);
    } else if (it.t === 'teach') {
      var ta = U.el('textarea', { 'aria-label': 'Your answer', rows: '6', placeholder: 'Write (or sketch on paper) your answer first. Then reveal the model answer and rubric.' });
      if (state.resp !== undefined) ta.value = typeof state.resp === 'string' ? state.resp : state.resp.response || '';
      if(cfg.revealed)ta.disabled=true;
      ta.disabled = locked;
      ta.addEventListener('input', function () { state.resp = ta.value; changed(); });
      ans.appendChild(ta);
    }

    function updateActions() {
      if (cfg.externalActions) return;
      act.innerHTML = '';
      if (locked || isMock) return;
      if (it.t === 'teach') {
        var rv=U.el('button',{class:'btn pri',type:'button'},'Reveal model answer and rubric');
        rv.disabled=!hasResp();
        function reveal(){
          ans.querySelector('textarea').disabled=true;
          if(cfg.onReveal)cfg.onReveal(state.resp);
          fbEl.innerHTML='<div class="fb"><div class="verdict">Model answer · self-assessment</div><p>'+it.model+'</p><p class="small muted">Mark only points present in your original answer. This self-assessment feeds the same concept record and is labeled separately from automatic grading.</p><div class="exam-rubric">'+(it.rubric||[]).map(function(x,i){return '<label><input type="checkbox" data-teach-rubric="'+i+'"> '+esc(x)+'</label>';}).join('')+'</div>'+srcChips(it.s)+'</div>';
          var save=U.el('button',{class:'btn pri'},'Save rubric check');
          save.onclick=function(){var hits=Array.prototype.map.call(fbEl.querySelectorAll('[data-teach-rubric]'),function(x){return x.checked;}),n=hits.filter(Boolean).length;locked=true;
            if(cfg.onSubmit)cfg.onSubmit({self:n===hits.length?'got':n?'part':'miss',response:state.resp,rubric:hits},'m',state.assisted);
            save.disabled=true;fbEl.querySelectorAll('input').forEach(function(x){x.disabled=true;});};
          fbEl.appendChild(save);rv.remove();
        }
        rv.onclick=reveal;act.appendChild(rv);if(cfg.revealed)reveal();return;
      }
      var box = U.el('div', { class: 'confrow' });
      box.appendChild(U.el('div', { class: 'lbl' }, 'Lock in your answer. Pick your confidence <b>before</b> you see feedback:'));
      var r = U.el('div', { class: 'row' });
      [['l', 'Low · guessing'], ['m', 'Medium'], ['h', 'High · certain']].forEach(function (c) {
        var b = U.el('button', { class: 'btn conf c' + c[0], type: 'button', 'data-conf': c[0] }, 'Submit: ' + c[1]);
        b.disabled = !hasResp(); b.onclick = function () { submit(c[0]); }; r.appendChild(b);
      });
      box.appendChild(r);
      if (cfg.allowHint !== false && it.hint) {
        var hb = U.el('button', { class: 'btn ghost small', type: 'button' }, state.assisted ? 'Hint shown' : 'Show hint (this attempt will not count toward mastery)');
        hb.disabled = state.assisted;
        hb.onclick = function () { state.assisted = true; if(cfg.onAssist)cfg.onAssist(); box.appendChild(U.el('div', { class: 'hint' }, '<b>Hint:</b> ' + it.hint)); hb.textContent = 'Hint shown'; hb.disabled = true; };
        box.appendChild(hb);
      }
      act.appendChild(box);
    }
    function submit(conf) { if (!hasResp() || locked) return; locked = true; if (cfg.onSubmit) cfg.onSubmit(state.resp, conf, state.assisted); }
    updateActions();
    if (cfg.graded) showFeedback(host, it, state.resp, cfg.graded, cfg);
    host._keys = function (e) {
      if (locked || isMock) return;
      if ((it.t === 'mc' || it.t === 'tf') && /^[a-hA-H1-8]$/.test(e.key)) {
        var pos = /[1-8]/.test(e.key) ? +e.key - 1 : e.key.toUpperCase().charCodeAt(0) - 65;
        if (order[pos] !== undefined) { state.resp = order[pos]; if (typeof paint === 'function') paint(); changed(); }
      }
    };
    return { order: order, rights: cfg.rights, getResp: function () { return state.resp; }, lock: function () { locked = true; host.querySelectorAll('button.opt,select,input,textarea,.orderlist button').forEach(function (b) { b.disabled = true; }); act.innerHTML = ''; } };
  }

  function showFeedback(host, it, resp, g, cfg) {
    var fbEl = host.querySelector('.feedback'), h = [];
    host.querySelectorAll('button.opt,select,input,textarea,.orderlist button').forEach(function (b) { b.disabled = true; });
    var act = host.querySelector('.actions'); if (act) act.innerHTML = '';
    if (it.o) host.querySelectorAll('.opt').forEach(function (b) {
      var oi = +b.getAttribute('data-oi'), o = it.o[oi], chosen = Array.isArray(resp) ? resp.indexOf(oi) >= 0 : resp === oi;
      if (o.ok) b.classList.add('right'); else if (chosen) b.classList.add('wrong');
      var tag = o.ok ? (chosen ? '✓ Your answer: correct' : '✓ Correct answer') : (chosen ? '✗ Your answer' : '');
      var why = o.w && !(cfg && cfg.compactReasons) ? '<span class="why">' + (tag ? '<b>' + tag + '.</b> ' : '') + esc(o.w) + '</span>' : (tag ? '<span class="why"><b>' + tag + '.</b></span>' : '');
      b.querySelector('.tx').insertAdjacentHTML('beforeend', why);
    });
    var verdict = g.blank ? 'Not answered' : g.ok ? 'Correct' : (g.sc > 0 ? 'Partly correct (' + Math.round(g.sc * 100) + '%), scored as incorrect' : 'Incorrect');
    h.push('<div class="fb ' + (g.ok ? 'ok' : 'no') + '"><div class="verdict">' + verdict + '</div>');
    if (it.t === 'fill') {
      h.push('<p>Accepted: <b>' + esc(it.acc[0]) + '</b>' + (it.acc.length > 1 ? ' <span class="muted small">(also: ' + esc(it.acc.slice(1).join(', ')) + ')</span>' : '') + '. You wrote: <b>' + esc(resp == null ? 'n/a' : resp) + '</b>.</p>');
      if (g.spelling) h.push('<p class="small warn">Counted here, but check spelling: <b>' + esc(g.spelling) + '</b>. Paper-exam spelling tolerance is unknown.</p>');
      if (!g.ok && g.near) h.push('<p class="small warn">Close to <b>' + esc(g.near) + '</b>: spelling may be the issue, or you may be mixing up a related term.</p>');
    }
    if (it.t === 'num') h.push('<p>Key: <b>' + esc(it.a) + (it.unit ? ' ' + esc(it.unit) : '') + '</b>' + (it.tol ? ' (±' + it.tol + ' accepted)' : '') + '. You entered: ' + esc(resp == null ? 'n/a' : resp) + '.</p>');
    if (it.t === 'match') h.push('<table class="t small"><tr><th>Item</th><th>Your match</th><th>Correct</th></tr>' + it.pairs.map(function (p, i) { var r = resp && resp[i]; return '<tr><td>' + esc(p[0]) + '</td><td class="' + (r === p[1] ? 'okc' : 'noc') + '">' + (r === p[1] ? '✓ ' : '✗ ') + esc(r || 'n/a') + '</td><td>' + esc(p[1]) + '</td></tr>'; }).join('') + '</table>');
    if (it.t === 'order') h.push('<p>Correct sequence:</p><ol class="small">' + it.seq.map(function (s, i) { var ok = resp && resp[i] === s; return '<li class="' + (ok ? 'okc' : 'noc') + '">' + (ok ? '✓ ' : '✗ ') + esc(s) + (ok ? '' : ' <span class="muted">(you had: ' + esc(resp ? resp[i] : 'n/a') + ')</span>') + '</li>'; }).join('') + '</ol>');
    if (it.t === 'parts') h.push('<table class="t small"><tr><th>Part</th><th>You</th><th>Key</th><th>Why</th></tr>' + it.parts.map(function (p, i) { var r = resp && resp[i]; return '<tr><td>' + esc(p.label) + '</td><td class="' + (r === p.a ? 'okc' : 'noc') + '">' + (r === p.a ? '✓ ' : '✗ ') + esc(r || 'n/a') + '</td><td>' + esc(p.a) + '</td><td>' + esc(p.why || '') + '</td></tr>'; }).join('') + '</table>');
    if (it.x) h.push('<p class="expl">' + it.x + '</p>');
    if (it.media && it.media.kind === 'svg' && it.revealMedia) { var md = host.querySelector('.media.svgm'); if (md) md.outerHTML = mediaHTML(it.media, { reveal: true }); }
    h.push('<div class="srcline">' + srcChips(it.s) + ' ' + tierBadge(it.tier) + (it.sec ? ' <a class="small" href="#guide/' + it.sec + '">Open guide section</a>' : '') + '</div></div>');
    fbEl.innerHTML = h.join('');
  }
  L.itemUI = { render: render, showFeedback: showFeedback, mediaHTML: mediaHTML, srcChips: srcChips, tierBadge: tierBadge, makeOrder: makeOrder };
})(typeof window !== 'undefined' ? window : globalThis);
