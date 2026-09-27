from PIL import Image, ImageDraw
from pathlib import Path
import json
base=Path(__file__).parent
root=base.parents[1]
rows=json.loads((base/'visual-manifest.json').read_text())
for b in range(0,len(rows),8):
    sheet=Image.new('RGB',(1600,1100),'#eeeeee')
    d=ImageDraw.Draw(sheet)
    for j,r in enumerate(rows[b:b+8]):
        im=Image.open(root/r['src']).convert('RGB');im.thumbnail((390,460))
        x=(j%4)*400;y=(j//4)*550
        sheet.paste(im,(x+(400-im.width)//2,y+50))
        d.text((x+5,y+8),f"{b+j+1}: {r['title'][:47]}",fill='black')
    sheet.save(base/f'contact-{b//8+1}.jpg')
