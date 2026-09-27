from PIL import Image, ImageDraw
from pathlib import Path
import json
root=Path(__file__).resolve().parents[2]
rows=json.loads((Path(__file__).parent/'extracted.json').read_text())
for batch in range(0,len(rows),12):
    sheet=Image.new('RGB',(1440,1200),'#eeeeee')
    draw=ImageDraw.Draw(sheet)
    for j,r in enumerate(rows[batch:batch+12]):
        im=Image.open(root/r['src']).convert('RGB');im.thumbnail((345,255))
        x=(j%4)*360;y=(j//4)*400
        sheet.paste(im,(x+(350-im.width)//2,y+35))
        draw.text((x+8,y+8),f"{batch+j+1}: {r['title'][:42]}",fill='black')
    sheet.save(Path(__file__).parent/f'contact-{batch//12+1}.jpg')
