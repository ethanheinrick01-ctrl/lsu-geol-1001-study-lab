/* Hosted selected-payload parity and private-packet boundary. Isolated VM only. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict'),root=path.resolve(__dirname,'..');
function load(local){const disk={},c={console,Math,Date,JSON,setTimeout(){},location:{protocol:local?'http:':'https:',hostname:local?'127.0.0.1':'example.test'},document:{readyState:'loading',addEventListener(){}},localStorage:{getItem:k=>disk[k]||null,setItem:(k,v)=>disk[k]=String(v)}};c.window=c;vm.createContext(c);const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});c.document.write=h=>run(h.match(/src="([^"]+)"/)[1].split('?')[0]);for(const[,u]of fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<script src="([^"]+)"/g))if(!u.startsWith('js/app.js'))run(u.split('?')[0]);c.L.engine.build();return c.L;}
const pub=load(false);

const refs=new Set();function walk(o){if(!o||typeof o!=='object')return;for(const[k,v]of Object.entries(o)){if(typeof v==='string'&&/^(assets|videos)\//.test(v)&&/\.(png|jpg|jpeg|svg|webp|mp4|vtt|txt)$/.test(v))refs.add(v);else if(v&&typeof v==='object')walk(v);}}
walk(pub.GUIDE);walk(pub.engine.REG());walk(pub.EXAM2.topics);walk(pub.EXAM2_SOURCES);walk(pub.MEDIA);walk(pub.CASES);walk(pub.BOSS);
const cp=require('child_process');const tracked=new Set(cp.execFileSync('git',['ls-files'],{cwd:root,encoding:'utf8'}).trim().split('\n'));
const missing=[...refs].filter(f=>!tracked.has(f));assert.deepEqual(missing,[],'Runtime media missing from published Git files');console.log('PASS '+refs.size+' resolved runtime media paths tracked');
