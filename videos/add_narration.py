#!/usr/bin/env python3
"""Embed approved AI Voice Generator narration and retime matching video stages.
Source narration.json is paraphrased from the Sep 24 review and course lessons.
Requires FFmpeg and the bundled Clear voice assets. No API or study-state access during build or playback.
"""
import argparse, json, math, subprocess, tempfile
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parent;FPS=24

def probe(path):
    return json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(path)]))

def stamp(t):
    ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}'

def build(topic,config,work):
    info=config['topics'][topic];segments=info['segments'];out=HERE/'exam1'/f'{topic}.mp4'
    silent=work/f'{topic}-silent.mp4'
    # Always use the explicitly pinned silent revision, including on a second run.
    silent.write_bytes(subprocess.check_output(['git','show',f"{config['silentRevision']}:videos/exam1/{topic}.mp4"],cwd=ROOT))
    inputs=['-i',str(silent)];filters=[];timings=[];cursor=0;vtt=[]
    for i,segment in enumerate(segments):
        speech=work/f'{topic}-{i}.wav'
        source=HERE/config['audioDirectory']/f'{topic}.mp3'
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(source),'-ss',str(segment['audioStart']),'-t',str(segment['audioEnd']-segment['audioStart']),'-ar','48000','-ac','1',str(speech)],check=True)
        audio_duration=float(probe(speech)['format']['duration']);original=segment['end']-segment['start']
        duration=math.ceil(max(original,audio_duration+.8)*FPS)/FPS
        inputs+=['-i',str(speech)]
        filters.append(f"[0:v]trim=start={segment['start']}:end={segment['end']},setpts=(PTS-STARTPTS)*{duration/original:.9f},fps={FPS},tpad=stop_mode=clone:stop_duration=0.1,trim=duration={duration:.6f}[v{i}]")
        filters.append(f'[{i+1}:a]aresample=48000,asetpts=PTS-STARTPTS,adelay=350,apad,atrim=duration={duration:.6f}[a{i}]')
        timings.append({'start':round(cursor,3),'end':round(cursor+duration,3),'label':segment['label'],'speechSeconds':round(audio_duration,3),'text':segment['text']})
        # Short readable caption cues approximate phrase timing across the speech.
        words=segment['text'].split();chunks=[words[j:j+11] for j in range(0,len(words),11)];offset=0
        for chunk in chunks:
            a=cursor+.35+audio_duration*offset/len(words);offset+=len(chunk);b=cursor+.35+audio_duration*offset/len(words)
            vtt.append(f'{stamp(a)} --> {stamp(b)}\n'+ ' '.join(chunk))
        cursor+=duration
    filters.append(''.join(f'[v{i}][a{i}]' for i in range(len(segments)))+f'concat=n={len(segments)}:v=1:a=1[video][speech]')
    filters.append('[speech]loudnorm=I=-18:TP=-1.5:LRA=7,aformat=sample_rates=48000:channel_layouts=mono[audio]')
    temp=work/f'{topic}-narrated.mp4'
    cmd=['ffmpeg','-y','-v','error']+inputs+['-filter_complex',';'.join(filters),'-map','[video]','-map','[audio]','-c:v','libx264','-preset','fast','-crf','20','-threads','3','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-ar','48000','-ac','1','-movflags','+faststart',str(temp)]
    subprocess.run(cmd,check=True)
    info_out=probe(temp);v=next(s for s in info_out['streams'] if s['codec_type']=='video');a=next(s for s in info_out['streams'] if s['codec_type']=='audio')
    assert a['codec_name']=='aac' and int(a['sample_rate'])==48000
    assert abs(float(info_out['format']['duration'])-cursor)<.15,(topic,info_out['format']['duration'],cursor)
    # Atomic replacement keeps a failed build from leaving a broken published file.
    import shutil
    dest=out.with_suffix('.new.mp4');shutil.copyfile(temp,dest);dest.replace(out)
    (HERE/'exam1'/f'{topic}.vtt').write_text('WEBVTT\n\n'+'\n\n'.join(vtt)+'\n')
    print(f'{topic}: {cursor:.2f}s, {len(segments)} synchronized narration stages',flush=True)
    return {'seconds':round(cursor,3),'chapters':[[x['start'],x['label']] for x in timings],'narration':timings,'reviewLines':info['reviewLines']}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--topic',nargs='+');args=parser.parse_args()
    config=json.loads((HERE/'narration.json').read_text());meta=json.loads((HERE/'process-films.json').read_text());chosen=args.topic or list(config['topics'])
    with tempfile.TemporaryDirectory(prefix='geol-narration-') as temp:
        work=Path(temp)
        for topic in chosen:
            result=build(topic,config,work);meta[topic].update(result)
            (HERE/'process-films.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
    # Embedded metadata keeps the site offline-compatible (no fetch needed).
    js=ROOT/'js/animated-diagrams.js';s=js.read_text();start=s.index('  var films = ');end=s.index(';\n',start)+1
    s=s[:start]+'  var films = '+json.dumps(meta,ensure_ascii=False)+';'+s[end:];js.write_text(s)
