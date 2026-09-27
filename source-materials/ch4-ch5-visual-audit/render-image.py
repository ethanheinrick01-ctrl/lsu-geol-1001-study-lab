"""Render a PDF embedded image with its original soft mask onto white."""
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB')
if sys.argv[2]!='none':
    mask=Image.open(sys.argv[2]).convert('L')
    bg=Image.new('RGB',im.size,'white');bg.paste(im,(0,0),mask);im=bg
im.save(sys.argv[3])
