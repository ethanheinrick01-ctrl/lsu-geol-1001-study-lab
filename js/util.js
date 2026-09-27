/* GEOL 1001 Study Lab v3; utilities. No network, no build step. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {};

  function rng(seed) { // mulberry32
    var a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function newSeed() { return (Math.floor(Math.random() * 2147483646) + 1) >>> 0; }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
  function int(r, lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }
  function shuffle(arr, r) {
    r = r || Math.random; var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function shuffleNotIdentity(arr, r) {
    if (arr.length < 2) return arr.slice();
    var s, n = 0;
    do { s = shuffle(arr, r); n++; } while (n < 12 && s.join('\u0001') === arr.join('\u0001'));
    return s;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) e.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function pct(n, d) { return d ? Math.round(100 * n / d) : 0; }
  function clone(o) { return o === undefined ? undefined : JSON.parse(JSON.stringify(o)); }
  function uniq(a) { var s = {}, out = []; a.forEach(function (x) { if (!s[x]) { s[x] = 1; out.push(x); } }); return out; }
  function todayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function daysBetween(a, b) { return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000); }
  function addDays(key, n) { var d = new Date(key + 'T12:00:00'); d.setDate(d.getDate() + n); return todayKey(d); }
  // Term normalization for fill-in answers: case, punctuation, hyphens, plural -s, leading articles.
  function normTerm(s) {
    return String(s == null ? '' : s).toLowerCase()
      .replace(/[‐-―]/g, '-')
      .replace(/[^a-z0-9\- ]+/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\b(the|a|an)\b/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function stemPlural(s) { return s.split(' ').map(function (w) { return w.length > 3 && /s$/.test(w) && !/(ss|is|us)$/.test(w) ? w.slice(0, -1) : w; }).join(' '); }
  function lev(a, b) {
    if (a === b) return 0; var m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    var prev = [], cur = []; for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) { cur = [i]; for (var k = 1; k <= n; k++) cur[k] = Math.min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  function fmtDate(ts) { var d = new Date(ts); return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type || 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }
  L.util = { rng: rng, newSeed: newSeed, pick: pick, int: int, shuffle: shuffle, shuffleNotIdentity: shuffleNotIdentity, esc: esc, el: el,
    pct: pct, clone: clone, uniq: uniq, todayKey: todayKey, daysBetween: daysBetween, addDays: addDays, normTerm: normTerm, stemPlural: stemPlural, lev: lev, fmtDate: fmtDate, download: download };
})(typeof window !== 'undefined' ? window : globalThis);
