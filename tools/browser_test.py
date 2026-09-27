"""End-to-end browser tests for the lab (Playwright, Chromium). Usage: python3 tools/browser_test.py [base_url]
Each check prints PASS/FAIL. Exit code 1 if any fail."""
import asyncio, sys, json, os, re
from playwright.async_api import async_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8811/index.html'
LEGACY = '/mnt/user-data/uploads/GEOLOGY/GEOL1001_STUDY_LAB_V3_BUILD/_review/migration/GEOL-progress-2026-09-17T19-18-14.029Z.json'
results = []
def check(name, ok, detail=''):
    results.append((name, bool(ok), detail)); print(('PASS ' if ok else 'FAIL ') + name + (' :: ' + str(detail) if detail else ''))

ANSWER_JS = """(sel) => { // answer current session/mock item correctly or wrongly via the UI
  const host = document.querySelector('#host'); const L = window.L, E = L.engine;
  return true; }"""

async def answer_current(pg, correct=True):
    """Answer the item shown in #host using the engine's key. Returns item type."""
    info = await pg.evaluate("""() => { const L=window.L,E=L.engine,S=L.store.load();
      let ref=null; if (S.session && location.hash.startsWith('#session')) { const q=S.session.queue[S.session.idx]; ref=q.ref; }
      else if (S.mockActive) { ref=S.mockActive.refs[S.mockActive.cur||0]; }
      const it=E.resolve(ref); return {t:it.t, id:it.id, o:it.o?it.o.map(o=>o.ok):null, acc:it.acc||null, a:it.a, pairs:it.pairs||null, parts:it.parts?it.parts.map(p=>[p.a,p.options]):null, seq:it.seq||null}; }""")
    t = info['t']
    if t in ('mc', 'tf'):
        idx = [i for i, ok in enumerate(info['o']) if ok == correct][0]
        await pg.click(f'#host .opt[data-oi="{idx}"]')
    elif t == 'ms':
        want = [i for i, ok in enumerate(info['o']) if ok] if correct else [[i for i, ok in enumerate(info['o']) if not ok][0]]
        for i in want: await pg.click(f'#host .opt[data-oi="{i}"]')
    elif t in ('fill', 'num'):
        val = (info['acc'][0] if t == 'fill' else str(info['a'])) if correct else 'zzzz wrong'
        if not correct and t == 'num': val = '-99999'
        await pg.fill('#host input', val)
    elif t == 'match':
        sels = await pg.query_selector_all('#host select')
        for i, p in enumerate(info['pairs']):
            v = p[1] if (correct or i > 0) else None
            if v is None:
                opts = await sels[i].eval_on_selector_all('option', 'os=>os.map(o=>o.value).filter(Boolean)')
                v = [o for o in opts if o != p[1]][0]
            await sels[i].select_option(value=v)
    elif t == 'parts':
        sels = await pg.query_selector_all('#host select')
        for i, (a, opts) in enumerate(info['parts']):
            v = a if (correct or i > 0) else [o for o in opts if o != a][0]
            await sels[i].select_option(value=v)
    elif t == 'order':
        target = info['seq'] if correct else list(reversed(info['seq']))
        for _ in range(40):
            cur = await pg.eval_on_selector_all('#host .orderlist .ot', 'els=>els.map(e=>e.textContent)')
            if cur == target: break
            # bubble: find first mismatch and move the right item up
            k = next(i for i in range(len(cur)) if cur[i] != target[i]); j = cur.index(target[k])
            await pg.click(f'#host .orderlist li:nth-child({j+1}) button[aria-label^="Move"]')
    elif t == 'teach':
        pass
    return info

async def nav(pg, h):
    await pg.evaluate("location.hash='#home'"); await pg.wait_for_timeout(60)
    await pg.evaluate("(h)=>{location.hash='#'+h}", h); await pg.wait_for_timeout(200)

async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch()
        ctx = await br.new_context(viewport={'width': 1200, 'height': 900})
        pg = await ctx.new_page()
        errs, ext = [], []
        pg.on('console', lambda m: errs.append(m.type + ': ' + m.text) if m.type in ('error',) else None)
        pg.on('pageerror', lambda e: errs.append('PAGEERR ' + str(e)))
        pg.on('dialog', lambda d: asyncio.ensure_future(d.accept()))
        def onreq(r):
            u = r.url
            if not (u.startswith('http://localhost') or u.startswith('file:') or u.startswith('data:') or u.startswith('blob:')): ext.append(u)
        pg.on('request', onreq)
        await pg.goto(BASE + '#home'); await pg.wait_for_timeout(500)
        await pg.evaluate('localStorage.clear()'); await pg.reload(); await pg.wait_for_timeout(400)
        # 1. every view and every guide section renders
        views = ['home', 'guide', 'practice', 'review', 'boss', 'mock', 'progress', 'evidence', 'data']
        secs = await pg.evaluate('L.SECTIONS.map(s=>s.id)')
        bad = []
        for v in views + ['guide/' + s for s in secs] + ['guide/ch%d' % c for c in range(1, 7)]:
            await pg.goto(BASE + '#' + v); await pg.wait_for_timeout(120)
            txt = await pg.inner_text('main')
            if len(txt.strip()) < 40 or 'Unknown section' in txt: bad.append(v)
        check('all %d views and guide sections render' % (len(views) + len(secs) + 6), not bad, bad)
        # broken images across guide
        await pg.goto(BASE + '#guide/c5s2'); await pg.wait_for_timeout(300)
        broken = []
        for s in secs:
            await pg.goto(BASE + '#guide/' + s); await pg.wait_for_timeout(150)
            await pg.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)")
            await pg.wait_for_timeout(150)
            b = await pg.evaluate("Promise.all([...document.images].map(i=>i.complete?Promise.resolve(i):new Promise(r=>{i.onload=i.onerror=()=>r(i)}))).then(ims=>ims.filter(i=>i.getAttribute('src')&&!i.naturalWidth).map(i=>i.getAttribute('src')))")
            broken += b
        check('no broken images in guide (incl. source-slide strips)', not broken, broken[:5])
        # 2. interactive classification widget
        await pg.goto(BASE + '#guide/c5s2'); await pg.wait_for_timeout(200)
        await pg.select_option('[data-k="comp"]', 'mafic'); await pg.select_option('[data-k="grain"]', 'fine')
        out = await pg.inner_text('.widget .out')
        check('classification widget: mafic + fine = Basalt', 'Basalt' in out, out[:40])
        # 3. practice: confidence before feedback, feedback after
        await pg.goto(BASE + '#practice'); await pg.click('#mix15'); await pg.wait_for_timeout(300)
        fb0 = await pg.inner_text('#host .feedback')
        btns = await pg.query_selector_all('#host [data-conf]')
        dis = [await b.is_disabled() for b in btns]
        check('confidence buttons disabled until an answer is chosen; no feedback before submit', all(dis) and not fb0.strip(), dis)
        info = await answer_current(pg, True)
        await pg.click('#host [data-conf="h"]'); await pg.wait_for_timeout(150)
        fb = await pg.inner_text('#host .feedback')
        check('feedback appears only after confidence submit, with explanation', len(fb) > 20, fb[:60])
        # tempting-wrong rationales shown for mc
        # 4. mastery on distinct items & misconception on high-confidence miss
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        await pg.evaluate("""()=>{const E=L.engine; const ids=E.BY_CONCEPT()['c5-visc'].filter(id=>!E.CASE_OF()[id]&&E.REG()[id].pool!=='boss'&&E.REG()[id].t!=='teach').slice(0,3); E.newSession('practice','T',ids.map(id=>({id})),{back:'practice'});}""")
        await nav(pg, 'session')
        await answer_current(pg, False); await pg.click('#host [data-conf="h"]'); await pg.wait_for_timeout(100)
        st = await pg.evaluate("L.engine.conceptStats()['c5-visc'].status")
        check('high-confidence miss marks a misconception', st == 'misconception', st)
        plan0 = await pg.evaluate("L.engine.reviewPlan()[0]")
        check('misconception is first in the review queue', plan0['c'] == 'c5-visc' and plan0['why'] == 'misconception', plan0.get('why'))
        for _ in range(2):
            await pg.click('#nextBtn'); await pg.wait_for_timeout(150)
            await answer_current(pg, True); await pg.click('#host [data-conf="m"]'); await pg.wait_for_timeout(100)
        st = await pg.evaluate("L.engine.conceptStats()['c5-visc'].status")
        check('two correct answers on different items (medium) -> mastered', st == 'mastered', st)
        # same item twice does not master
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        await pg.evaluate("""()=>{const id='c5-visc-m2'; L.engine.newSession('practice','T',[{id},{id}],{back:'practice'});}""")
        await nav(pg, 'session')
        await answer_current(pg, True); await pg.click('#host [data-conf="h"]'); await pg.click('#nextBtn'); await pg.wait_for_timeout(150)
        await answer_current(pg, True); await pg.click('#host [data-conf="h"]'); await pg.wait_for_timeout(100)
        st = await pg.evaluate("L.engine.conceptStats()['c5-visc'].status")
        check('repeating the same item twice does NOT master a concept', st == 'learning', st)
        # hint-assisted attempt does not count
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        # 5. generated items render (each generator)
        gens = await pg.evaluate("Object.keys(L.GEN)")
        gbad = []
        for g in gens:
            await pg.evaluate("(g)=>L.engine.newSession('practice','G',[{gen:g,seed:12345},{gen:g,seed:999}],{back:'practice'})", g)
            await nav(pg, 'session')
            ok1 = await pg.query_selector('#host .prompt')
            await answer_current(pg, True); await pg.click('#host [data-conf="m"]'); await pg.wait_for_timeout(80)
            v = await pg.inner_text('#host .feedback')
            if not ok1 or 'Correct' not in v: gbad.append((g, v[:40]))
        check('all %d generators render and grade a correct answer as correct' % len(gens), not gbad, gbad)
        # 6. mock: feedback withheld, submit, results, shared mastery signal, review signal
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        await pg.goto(BASE + '#mock'); await pg.click('[data-mock="short"]'); await pg.wait_for_timeout(300)
        n = await pg.evaluate("L.store.load().mockActive.refs.length")
        leak = []
        for k in range(n):
            await answer_current(pg, k % 3 != 0)
            await pg.wait_for_timeout(40)
            fbt = (await pg.inner_text('#host .feedback')).strip(); conf = await pg.query_selector('#host [data-conf]')
            fbel = await pg.query_selector('#host .fb, #host .verdict, #host .opt.ok, #host .opt.no')
            txt = await pg.inner_text('#host .answer')
            if fbt or conf or fbel or re.search(r'Correct answer|Incorrect', txt): leak.append(k)
            if k < n - 1: await pg.click('#next'); await pg.wait_for_timeout(60)
        check('mock (%d parts): no feedback or confidence prompt shown during the exam' % n, not leak, leak[:5])
        sub = await pg.inner_text('#submit')
        check('mock tracks answered count', ('%d/%d' % (n, n)) in sub, sub)
        await pg.click('#submit'); await pg.wait_for_timeout(400)
        res = await pg.inner_text('main')
        check('mock submit shows results with sections and remediation', 'results' in res and 'Remediation' in res and 'By chapter' in res, res[:80])
        mst = await pg.evaluate("Object.values(L.engine.conceptStats()).filter(s=>s.status!=='new').length")
        check('mock answers feed the shared mastery record', mst > 0, mst)
        why = await pg.evaluate("L.engine.reviewPlan().filter(p=>p.why==='mock').length")
        check('mock misses feed the review queue', why > 0, why)
        # reload persistence
        await pg.reload(); await pg.wait_for_timeout(300)
        cnt = await pg.evaluate("L.store.load().mocks.length")
        check('mock history persists across reload', cnt == 1, cnt)
        # full mock builds
        await pg.goto(BASE + '#mock'); await pg.click('[data-mock="full"]'); await pg.wait_for_timeout(300)
        fulln = await pg.evaluate("L.store.load().mockActive.refs.length")
        check('full mock builds', fulln >= 55, fulln)
        await pg.evaluate("()=>{const s=L.store.load(); s.mockActive=null; L.store.save();}")
        # 7. boss: complete run sets best; incomplete run does not; retry practice leaves best
        await pg.goto(BASE + '#boss'); await pg.click('[data-boss="boss4"]'); await pg.wait_for_timeout(300)
        total = await pg.evaluate("L.store.load().session.queue.length")
        hints = 0
        for k in range(total):
            h = await pg.query_selector('#host button:has-text("Show hint")')
            if h: hints += 1
            await answer_current(pg, k % 4 != 0)
            if await pg.query_selector('#host [data-conf]'):
                await pg.click('#host [data-conf="m"]')
            await pg.wait_for_timeout(50)
            await pg.click('#nextBtn'); await pg.wait_for_timeout(60)
        body = await pg.inner_text('main')
        best = await pg.evaluate("L.store.load().boss.boss4")
        check('boss complete run (%d q) records a best score' % total, best and best['best'] is not None and best['runs'][-1]['complete'], best)
        check('boss drills show no hints', hints == 0, hints)
        b1 = best['best']
        if await pg.query_selector('#drillMiss'):
            await pg.click('#drillMiss'); await pg.wait_for_timeout(200)
            for k in range(3):
                await answer_current(pg, True); await pg.click('#host [data-conf="m"]'); await pg.click('#nextBtn'); await pg.wait_for_timeout(60)
            await pg.click('#endS'); await pg.wait_for_timeout(200)
        b2 = await pg.evaluate("L.store.load().boss.boss4.best")
        check('retrying missed boss concepts as practice leaves the best unchanged', b1 == b2, (b1, b2))
        await pg.goto(BASE + '#boss'); await pg.click('[data-boss="boss2"]'); await pg.wait_for_timeout(200)
        for k in range(3):
            await answer_current(pg, True)
            if await pg.query_selector('#host [data-conf]'): await pg.click('#host [data-conf="h"]')
            await pg.click('#nextBtn'); await pg.wait_for_timeout(60)
        await pg.click('#endS'); await pg.wait_for_timeout(200)
        r2 = await pg.evaluate("L.store.load().boss.boss2")
        check('ending a boss early records an incomplete run with no best', r2 and r2['best'] is None and not r2['runs'][-1]['complete'], r2)
        # 8. export / import round trip
        exp = await pg.evaluate("L.store.exportJSON()")
        d = json.loads(exp)
        check('export has format + schema', d.get('format') == 'geol1001-lab-v3-export' and d.get('schema') == 3, (d.get('format'), d.get('schema')))
        natt = len(d['state']['attempts'])
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        r = await pg.evaluate("(t)=>L.store.importText(t)", exp)
        n2 = await pg.evaluate("L.store.load().attempts.length")
        check('import restores attempts after clearing', r['ok'] and n2 == natt, (r['message'], n2, natt))
        r = await pg.evaluate("(t)=>L.store.importText(t)", exp)
        n3 = await pg.evaluate("L.store.load().attempts.length")
        check('re-importing the same export does not duplicate', n3 == natt, n3)
        r = await pg.evaluate("(t)=>L.store.importText(t)", '{not json')
        check('bad file is rejected without changes', not r['ok'], r['message'])
        # via the Data page file input
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        await pg.goto(BASE + '#data'); await pg.wait_for_timeout(200)
        inp = await pg.query_selector('main input[type=file]')
        if inp and os.path.exists(LEGACY):
            await inp.set_input_files(LEGACY); await pg.wait_for_timeout(500)
            lg = await pg.evaluate("L.store.load().legacy")
            check('real old-lab backup file imports via Data page', lg and lg['mapped'] >= 4 and 'c1-method' in lg['signal'], lg and {k: lg[k] for k in ('mapped', 'oldConcepts', 'unmapped')})
            pr = await pg.evaluate("L.engine.conceptStats()['c1-cycle']")
            check('old-lab miss becomes a review signal but not v3 mastery', pr['prior'] and pr['prior']['flagged'] and pr['status'] == 'new', pr['prior'])
        else:
            check('real old-lab backup file available for import test', False, LEGACY)
        # legacy keys present in the same browser
        await pg.evaluate("localStorage.clear()"); await pg.reload()
        raw = json.load(open(LEGACY))['storage']['geol1001-guided-progress-v1']
        await pg.evaluate("(r)=>localStorage.setItem('geol1001-guided-progress-v1', r)", raw)
        await pg.goto(BASE + '#home'); await pg.reload(); await pg.wait_for_timeout(300)
        has = await pg.query_selector('#impLeg')
        check('home offers import when old-lab keys are in this browser', has is not None)
        if has:
            await pg.click('#impLeg'); await pg.wait_for_timeout(300)
            old = await pg.evaluate("localStorage.getItem('geol1001-guided-progress-v1')")
            check('legacy import leaves old keys untouched', old == raw)
        # 8b. spaced retry after a miss uses a different question on the same concept, 2+ questions later
        await pg.evaluate("localStorage.clear()"); await pg.reload(); await pg.wait_for_timeout(300)
        await pg.evaluate("""()=>{const ids=['c5-visc-m1','c1-method-m1','c2-relief-m1','c3-belts-m1','c4-tests-m1','c6-types-m1']; L.engine.newSession('practice','R',ids.map(id=>({id})),{back:'practice'});}""")
        await nav(pg, 'session')
        await answer_current(pg, False); await pg.click('#host [data-conf="m"]'); await pg.wait_for_timeout(100)
        q = await pg.evaluate("L.store.load().session.queue.map(x=>({id:x.ref.id,retry:x.retry,c:x.c}))")
        ri = [i for i, x in enumerate(q) if x['retry']]
        check('a miss schedules a spaced retry: same concept, different question, at least 2 questions later', ri and ri[0] >= 3 and q[ri[0]]['id'] != 'c5-visc-m1' and q[ri[0]]['c'] == 'c5-visc', q[:5])
        # keyboard: letter selects an option; Enter advances after feedback
        await pg.click('#nextBtn'); await pg.wait_for_timeout(150)
        await pg.keyboard.press('b'); await pg.wait_for_timeout(80)
        sel = await pg.evaluate("[...document.querySelectorAll('#host .opt')].findIndex(b=>b.classList.contains('sel'))")
        await pg.click('#host [data-conf="m"]'); await pg.wait_for_timeout(80)
        before = await pg.evaluate("L.store.load().session.idx")
        await pg.keyboard.press('Enter'); await pg.wait_for_timeout(150)
        after = await pg.evaluate("L.store.load().session.idx")
        check('keyboard: letter keys choose options and Enter advances', sel == 1 and after == before + 1, (sel, before, after))
        # reset progress (double confirm) clears v3 key only
        await pg.evaluate("localStorage.setItem('geol1001-guided-progress-v1','{\"concepts\":{}}')")
        await pg.goto(BASE + '#data'); await pg.wait_for_timeout(150)
        await pg.click('#reset'); await pg.wait_for_timeout(200)
        n0 = await pg.evaluate("L.store.load().attempts.length")
        oldk = await pg.evaluate("localStorage.getItem('geol1001-guided-progress-v1')")
        check('reset clears v3 progress and leaves old-lab keys', n0 == 0 and oldk is not None, (n0, oldk))
        # option order is shuffled on screen (keyed option not always first)
        pos = []
        for k in range(8):
            await pg.evaluate("L.engine.newSession('practice','S',[{id:'c4-tests-m2'}],{back:'practice'})")
            await nav(pg, 'session')
            pos.append(await pg.evaluate("[...document.querySelectorAll('#host .opt')].findIndex(b=>L.engine.REG()['c4-tests-m2'].o[+b.dataset.oi].ok)"))
        await pg.evaluate("L.engine.buildMock('short')")
        mo = await pg.evaluate("(()=>{const m=L.store.load().mockActive; return m.refs.length})()")
        check('answer options are shuffled on screen (keyed position varies across renders)', len(set(pos)) > 1, pos)
        await pg.evaluate("()=>{const s=L.store.load(); s.mockActive=null; L.store.save();}")
        # 9. zoom dialog
        await pg.goto(BASE + '#guide/c4s3'); await pg.wait_for_timeout(200)
        z = await pg.query_selector('[data-zoom]')
        if z:
            await z.click(); await pg.wait_for_timeout(150)
            op = await pg.evaluate("document.querySelector('#zoomdlg').open")
            check('image zoom dialog opens', op)
            await pg.keyboard.press('Escape')
        # 10. responsive: no horizontal scroll at 390 px
        pg2 = await ctx.new_page(); await pg2.set_viewport_size({'width': 390, 'height': 800})
        over = []
        for v in ['home', 'guide/c5s2', 'guide/c3s5', 'practice', 'boss', 'mock', 'progress', 'evidence', 'data']:
            await pg2.goto(BASE + '#' + v); await pg2.wait_for_timeout(200)
            w = await pg2.evaluate("document.documentElement.scrollWidth")
            if w > 392: over.append((v, w))
        await pg2.evaluate("L.engine.newSession('practice','R',[{id:'c5-classify-p1'},{id:'c3-boundtypes-m1'}],{back:'practice'})")
        await pg2.goto(BASE + '#session'); await pg2.wait_for_timeout(200)
        w = await pg2.evaluate("document.documentElement.scrollWidth")
        if w > 392: over.append(('session', w))
        check('no horizontal scrolling at 390 px width', not over, over)
        await pg2.screenshot(path='/tmp/mobile_session.png', full_page=True)
        await pg2.close()
        check('no console errors or page exceptions', not errs, errs[:5])
        check('no external network requests', not ext, ext[:5])
        await br.close()
    fails = [r for r in results if not r[1]]
    print('\n%d checks, %d failed' % (len(results), len(fails)))
    json.dump([{'check': a, 'pass': b, 'detail': str(c)[:300]} for a, b, c in results], open('/tmp/browser_results.json', 'w'), indent=1)
    sys.exit(1 if fails else 0)
asyncio.run(main())
