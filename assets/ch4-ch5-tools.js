/* UI-only extension. No progress writes, migrations, or clearing. */
(() => {
  'use strict';
  const keys = ['geol1001-study-lab-progress-v1','geol1001-guided-progress-v1'];
  const exportButton = document.getElementById('download-progress');
  exportButton.addEventListener('click', () => {
    const backup = {format:'geol1001-progress-backup-v1',exportedAt:new Date().toISOString(),origin:location.href,storage:{}};
    for (const key of keys) backup.storage[key] = localStorage.getItem(key);
    const blob = new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download=`GEOL-progress-${new Date().toISOString().replaceAll(':','-')}.json`;
    a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    document.getElementById('progress-backup-status').textContent='Progress export requested. Keep the downloaded JSON as your recovery copy; no progress was changed.';
  });
  // Guard the old one-click score reset; the existing mastery reset already confirms.
  document.getElementById('clear-progress').addEventListener('click', event => {
    if (!confirm('Clear all saved shuffled-drill scores? Download a progress backup first if you want to keep them.')) {
      event.preventDefault(); event.stopImmediatePropagation();
    }
  }, true);
  const rows = [
    ['Felsic','Granite','Rhyolite','Quartz, potassium feldspar; Na-rich plagioclase','Higher silica; generally lighter'],
    ['Intermediate','Diorite','Andesite','Plagioclase, amphibole; proportions vary','Between felsic and mafic'],
    ['Mafic','Gabbro','Basalt','Ca-rich plagioclase, pyroxene; olivine may occur','Lower silica; generally darker'],
    ['Ultramafic','Peridotite','Komatiite','Mostly olivine and pyroxene','Lowest silica of these groups']
  ];
  const host = document.getElementById('guide-detail-content');
  const showChart = () => {
    if (document.getElementById('guide-detail-title').textContent !== 'The Classification Chart: Read It Both Ways' || host.querySelector('#ch45-chart-workbench')) return;
    const section = document.createElement('section');
    section.id='ch45-chart-workbench'; section.className='guide-overview';
    section.innerHTML = `<h2>Read the two axes</h2><p>Study mode: select composition and texture, then explain the result. This is an ungraded reference tool; the topic Lab tests retrieval.</p><div class="ch45-controls"><label>Composition <select id="ch45-composition">${rows.map((r,i)=>`<option value="${i}">${r[0]}</option>`).join('')}</select></label><label>Texture <select id="ch45-texture"><option value="1">Coarse-grained</option><option value="2">Fine-grained</option></select></label></div><p id="ch45-chart-result" aria-live="polite"></p><div class="ch45-table-wrap"><table class="ch45-table"><caption>Same composition column, different texture row</caption><thead><tr><th>Composition</th><th>Coarse</th><th>Fine</th><th>Mineral associations</th></tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div><p><strong>Reason it out:</strong> moving down changes texture; moving across changes composition. Obsidian, pumice, scoria, tuff, and breccia require additional textural descriptions.</p><p class="source-strip">Original instructional table based on your classroom chart and textbook 5.2–5.3. Not a replacement for the source mineral-proportion bands.</p>`;
    const update = () => {
      const r=rows[Number(section.querySelector('#ch45-composition').value)];
      const t=Number(section.querySelector('#ch45-texture').value);
      section.querySelector('#ch45-chart-result').textContent=`${r[t]}: ${r[0].toLowerCase()}, ${t===1?'coarse-grained; typically slower cooling at depth':'fine-grained; typically faster cooling near the surface'}. ${r[4]}.`;
    };
    section.querySelectorAll('select').forEach(s=>s.addEventListener('change',update));
    update(); host.querySelector('.guide-overview').after(section);
  };
  new MutationObserver(showChart).observe(host,{childList:true});
  showChart();
})();
