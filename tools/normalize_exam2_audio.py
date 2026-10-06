"""Remux final video with the original Clear narration at browser-friendly 48 kHz.
The animation stream is copied without re-encoding. No new voice generation.
"""
from pathlib import Path
import json,subprocess,concurrent.futures
ROOT=Path(__file__).resolve().parents[1]
meta=json.loads((ROOT/'videos/exam2-films.json').read_text())
def normalize(topic):
    mp4=ROOT/'videos/exam2'/f'{topic}.mp4';temp=mp4.with_suffix('.audio48.mp4')
    audio=ROOT/'videos/exam2-clear'/f'{topic}.mp3'
    subprocess.run(['ffmpeg','-y','-v','error','-i',str(mp4),'-i',str(audio),
       '-map','0:v:0','-map','1:a:0','-c:v','copy','-af','loudnorm=I=-18:TP=-1.5:LRA=7',
       '-c:a','aac','-ar','48000','-ac','1','-b:a','128k','-t',str(meta[topic]['seconds']),
       '-movflags','+faststart',str(temp)],check=True)
    temp.replace(mp4);print(topic+' · original Clear narration remuxed at 48 kHz',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(normalize,meta))
