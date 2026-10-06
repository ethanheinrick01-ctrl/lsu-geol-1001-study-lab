"""Correct ASR spelling to reviewed original text, retaining local word timing.
Raw Whisper output is kept separately; no remote service or new voice generation.
"""
from pathlib import Path
import json,re,difflib
ROOT=Path(__file__).resolve().parents[1]
CFG=json.loads((ROOT/'videos/exam2-narration.json').read_text())['topics']
def norm(w):return re.sub(r'[^a-z0-9]','',w.lower())
def stamp(t):
 ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}'
receipt={}
for topic,cfg in CFG.items():
 path=ROOT/f'videos/exam2-clear/align/{topic}.json'
 if not path.exists():continue
 raw=json.loads(path.read_text());observed=[w for s in raw['segments'] for w in s['words']]
 authored=' '.join(s[1] for s in cfg['stages']).split();aligned=[None]*len(authored)
 matcher=difflib.SequenceMatcher(None,list(map(norm,authored)),[norm(w['word']) for w in observed],autojunk=False)
 for op,a,b,c,d in matcher.get_opcodes():
  if op=='equal':
   for i in range(b-a):aligned[a+i]={'word':authored[a+i],'start':observed[c+i]['start'],'end':observed[c+i]['end']}
  elif b>a:
   start=observed[c]['start'] if d>c else (observed[c-1]['end'] if c else 0)
   end=observed[d-1]['end'] if d>c else (observed[c]['start'] if c<len(observed) else start+.1)
   end=max(start+.02,end)
   for i in range(b-a):aligned[a+i]={'word':authored[a+i],'start':round(start+(end-start)*i/(b-a),3),'end':round(start+(end-start)*(i+1)/(b-a),3)}
 assert all(aligned)
 (ROOT/f'videos/exam2-clear/{topic}-words.json').write_text(json.dumps(aligned,indent=2)+'\n')
 cues=[]
 for i in range(0,len(aligned),9):
  chunk=aligned[i:i+9];cues.append(f"{stamp(chunk[0]['start'])} --> {stamp(chunk[-1]['end'])}\n"+' '.join(w['word'] for w in chunk))
 (ROOT/f'videos/exam2/{topic}.vtt').write_text('WEBVTT\n\n'+'\n\n'.join(cues)+'\n')
 receipt[topic]={'authoredWords':len(authored),'asrWords':len(observed),'alignmentRatio':round(matcher.ratio(),4),'captionText':'Exact reviewed original script; ASR timing with aligned spelling corrections.'}
(ROOT/'source-materials/exam2-audit/caption-alignment.json').write_text(json.dumps(receipt,indent=2)+'\n')
print('Corrected and aligned captions for',len(receipt),'films')
