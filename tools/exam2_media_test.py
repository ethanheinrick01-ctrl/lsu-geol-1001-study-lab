"""Decode the final local media, verify authored captions and embedded offline cues.
No browser, network, or learner storage is used. Browser playback is a separate check.
"""
from pathlib import Path
import json, subprocess, hashlib, re
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
cfg=json.loads((ROOT/'videos/exam2-narration.json').read_text())['topics']
meta=json.loads((ROOT/'videos/exam2-films.json').read_text())
assert set(cfg)==set(meta) and len(meta)==12
receipt=[]
for topic,c in cfg.items():
    base=ROOT/'videos/exam2'/topic
    for ext in ['.mp4','.png','.vtt','.txt']:assert base.with_suffix(ext).stat().st_size>100
    audio=ROOT/'videos/exam2-clear'/f'{topic}.mp3';assert audio.stat().st_size>1000
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(base.with_suffix('.mp4'))]))
    v=next(s for s in info['streams'] if s['codec_type']=='video')
    a=next(s for s in info['streams'] if s['codec_type']=='audio')
    assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'])==('h264',1280,720,'24/1')
    assert a['codec_name']=='aac' and int(a['sample_rate'])==48000
    duration=float(info['format']['duration']);f=meta[topic]
    assert abs(duration-f['seconds'])<.1
    assert len(f['stages'])==3 and f['stages'][0]['start']==0
    for i,s in enumerate(f['stages']):
        assert s['end']>s['start'] and s['end']<=duration+.1
        assert s['text']==c['stages'][i][1]
        if i:assert s['start']==f['stages'][i-1]['end']
    cues=f['cues'];assert len(cues)>=8
    expected=' '.join(s[1] for s in c['stages'])
    assert ' '.join(q['text'] for q in cues)==expected
    previous=0
    for q in cues:
        assert 0<=q['start']<=q['end']<=duration+.1 and q['start']>=previous-.02
        previous=q['end']
    vtt=base.with_suffix('.vtt').read_text()
    text=' '.join(line for line in vtt.splitlines() if line and line!='WEBVTT' and '-->' not in line)
    assert text==expected
    transcript=base.with_suffix('.txt').read_text()
    for stage in c['stages']:assert stage[1] in transcript
    # A full decode detects corrupt streams; PCM checks speech is not silent/clipped.
    subprocess.run(['ffmpeg','-v','error','-i',str(base.with_suffix('.mp4')),'-f','null','-'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
    pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(base.with_suffix('.mp4')),'-vn','-ac','1','-ar','16000','-f','f32le','-'])
    samples=np.frombuffer(pcm,dtype='<f4');rms=float(np.sqrt(np.mean(samples**2)));peak=float(np.abs(samples).max())
    assert .004<rms<.4 and 0<peak<.999
    receipt.append({'id':topic,'duration':duration,'video':'H.264 1280×720 24fps','audio':'AAC 48kHz',
      'captionCues':len(cues),'captionText':'Exact reviewed original script','threeStageSeeks':True,
      'rms':round(rms,5),'peak':round(peak,5),'mp4Sha256':hashlib.sha256(base.with_suffix('.mp4').read_bytes()).hexdigest(),
      'narrationSha256':hashlib.sha256(audio.read_bytes()).hexdigest(),'fullDecode':'pass'})
    print(f'PASS {topic}: {duration:.2f}s, Clear audio, {len(cues)} exact-text timed captions, 3 stages, full decode')
script=(ROOT/'js/content/exam2-films.js').read_text()
embedded=json.loads(script.split('L.EXAM2_FILMS=',1)[1].rsplit(';}',1)[0]);assert embedded==meta
out=ROOT/'source-materials/exam2-audit/media-verification.json'
out.write_text(json.dumps({'films':receipt,'browserPlayback':'Pending isolated browser verification'},indent=2)+'\n')
print('TOTAL 12 narrated film packages passed. Browser playback is not claimed by this test.')
