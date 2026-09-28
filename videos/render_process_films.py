#!/usr/bin/env python3
"""Deterministic, textured geological process films; no network or study-state access.

Art direction derives from the course figures listed in process-films.json.
The image-generated material atlas supplies surface texture, not scientific geometry.
Geometry, process timing and every material trajectory are explicitly authored here.
Run: python3 videos/render_process_films.py --all (or --topic T4 --stills).
"""
from pathlib import Path
import argparse, json, math, subprocess, concurrent.futures
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance
import render_seafloor_spreading as B

W,H,FPS=1280,720,24
HERE=Path(__file__).resolve().parent
OUT=HERE/'exam1'
BG=(7,17,35); WHITE=(240,244,244); MUTED=(160,185,202); GOLD=(255,184,75); CYAN=(95,214,230)
FONT={s:B.font(s) for s in (15,17,19,21,24,27,30)}
BOLD={s:B.font(s,True) for s in (17,19,22,26,34,40)}
ATLAS=Image.open(HERE/'artwork/textbook-materials.png').convert('RGB')
aw,ah=ATLAS.size
TEXTURES=[ATLAS.crop((i%4*aw//4,i//4*ah//2,(i%4+1)*aw//4,(i//4+1)*ah//2)).resize((W,H)) for i in range(8)]
TEXTURES_DARK=[ImageEnhance.Brightness(a).enhance(.60) for a in TEXTURES]
TEXTURES_LIGHT=[ImageEnhance.Brightness(a).enhance(1.18) for a in TEXTURES]
clamp=B.clamp
smooth=B.smooth
mix=B.mix

def lerp(a,b,p):return a+(b-a)*p

def interval(t,a,b):return clamp((t-a)/(b-a))

def xy(p):return tuple(round(q) for q in p)

def text(im,x,y,s,size=21,color=WHITE,anchor='mm',bold=False):
    d=ImageDraw.Draw(im);f=(BOLD if bold else FONT).get(size) or B.font(size,bold)
    d.text((x,y),s,font=f,fill=color,anchor=anchor,stroke_width=0)

def line(im,pts,c=GOLD,w=3):ImageDraw.Draw(im).line([xy(p) for p in pts],fill=c,width=w,joint='curve')

def poly(im,pts,c):ImageDraw.Draw(im).polygon([xy(p) for p in pts],fill=c)

def rect(im,box,c,r=0):ImageDraw.Draw(im).rounded_rectangle(tuple(map(round,box)),r,fill=c)

def circle(im,x,y,r,c,outline=None):
    if r<=0:return
    ImageDraw.Draw(im).ellipse((x-r,y-r,x+r,y+r),fill=c,outline=outline,width=2)

def arrow(im,a,b,c=GOLD,w=5):B.arrow(ImageDraw.Draw(im),*a,*b,c,width=w,head=14)

def texture(im,pts,kind=0,shade=0,edge=None):
    # Texture mapping is part of frame rendering; the original source images stay intact.
    mask=Image.new('L',(W,H));ImageDraw.Draw(mask).polygon([xy(p) for p in pts],fill=255)
    tex=(TEXTURES_DARK if shade<0 else TEXTURES_LIGHT if shade>0 else TEXTURES)[kind]
    box=mask.getbbox()
    if box:im.paste(tex.crop(box),box,mask.crop(box))
    if edge:line(im,pts+[pts[0]],edge,2)

def textured_rect(im,x,y,w,h,kind=0,shade=0):texture(im,[(x,y),(x+w,y),(x+w,y+h),(x,y+h)],kind,shade)

def blend_texture(im,pts,a,b,amount):
    mask=Image.new('L',(W,H));ImageDraw.Draw(mask).polygon([xy(p) for p in pts],fill=255)
    box=mask.getbbox()
    if box:
        tex=Image.blend(TEXTURES[a].crop(box),TEXTURES[b].crop(box),clamp(amount))
        im.paste(tex,box,mask.crop(box))

def sphere(im,x,y,r,c):
    for k in range(15,0,-1):
        f=k/15;cc=mix(c,(255,245,225),(1-f)*.5)
        circle(im,x-r*(1-f)*.2,y-r*(1-f)*.25,r*f,cc)

def crystal(im,x,y,r,c=(223,205,170),angle=0,elong=1):
    if r<.3:return
    pts=[(x+math.cos(angle+i*math.pi/3)*r,y+math.sin(angle+i*math.pi/3)*r*elong) for i in range(6)]
    poly(im,pts,c);poly(im,[pts[0],pts[1],pts[2],(x,y)],mix(c,WHITE,.25));poly(im,[(x,y),pts[3],pts[4],pts[5]],mix(c,BG,.22));line(im,pts+[pts[0]],mix(c,BG,.36),1)

def block(im,x0,x1,y,depth=125,kind=0,top=4,dx=100,dy=-78):
    texture(im,[(x0,y),(x1,y),(x1+dx,y+dy),(x0+dx,y+dy)],top,0,(104,166,181))
    texture(im,[(x0,y),(x1,y),(x1,y+depth),(x0,y+depth)],kind)
    texture(im,[(x1,y),(x1+dx,y+dy),(x1+dx,y+depth+dy),(x1,y+depth)],kind,-1)
    line(im,[(x0,y),(x1,y),(x1,y+depth),(x0,y+depth),(x0,y)],(163,166,149),1)

def particles(im,points,t,speed=1,r=4,c=GOLD,count=12):
    for i in range(count):
        q=((t*speed+i/count)%1)*(len(points)-1);j=min(len(points)-2,int(q));f=q-j
        x=lerp(points[j][0],points[j+1][0],f);y=lerp(points[j][1],points[j+1][1],f)
        circle(im,x,y,r+(i%2),c)

def graph(im,x,y,w,h,temp,pressure,wet=0,trail=None):
    # Pressure/depth increases down. Solidus rises in temperature with pressure.
    rect(im,(x,y,x+w,y+h),(218,209,192))
    a=.40-.18*wet;b=.74-.18*wet
    poly(im,[(x+w*a,y),(x+w,y),(x+w,y+h),(x+w*b,y+h)],(237,179,117))
    line(im,[(x+w*a,y),(x+w*b,y+h)],(60,58,53),3)
    if wet:line(im,[(x+w*.4,y),(x+w*.74,y+h)],(134,116,92),2)
    arrow(im,(x,y-18),(x+w,y-18),WHITE,2);arrow(im,(x-18,y),(x-18,y+h),WHITE,2)
    text(im,x+w/2,y-40,'Temperature →',19)
    text(im,x-24,y+h+22,'Pressure / depth ↓',17,anchor='lm')
    text(im,x+w*.19,y+25,'SOLID',17,(40,40,40),bold=True)
    text(im,x+w*.82,y+h-24,'MELT',17,(40,40,40),bold=True)
    if trail:
        (a1,b1),(a2,b2)=trail;arrow(im,(x+w*a1,y+h*b1),(x+w*a2,y+h*b2),(31,84,97),3)
    circle(im,x+temp*w,y+pressure*h,9,(180,42,34),WHITE)

def rock_sample(im,x,y,w,h,melt,cryst=True):
    textured_rect(im,x,y,w,h,7 if melt>.02 else 0)
    for row in range(4):
        for col in range(6):
            cx=x+20+col*(w-35)/5;cy=y+19+row*(h-35)/3
            r=min(w/11,h/7)*(1-.38*melt)
            crystal(im,cx,cy,r,mix((188,185,155),(153,126,90),melt),.25+(col%3)*.4)
    if melt>.02:
        for i in range(6):
            px=x+10+i*(w-20)/6
            line(im,[(px,y+10),(px+11,y+h*.45),(px-3,y+h-10)],(255,164,43),max(1,int(melt*7)))

def ridge(im,t,magnetic=False):
    p=clamp(t/8);reach=100+340*p;cx=610;y=340
    block(im,150,1070,y,210,3,4,85,-92)
    textured_rect(im,150,y,920,155,2)
    texture(im,[(150,y+140),(cx-60,y+180),(cx,y+200),(cx+60,y+180),(1070,y+140),(1070,y+210),(150,y+210)],3)
    # Upwelling mantle is solid except the shallow melting region.
    texture(im,[(cx-120,y+190),(cx-38,y+80),(cx,y+32),(cx+38,y+80),(cx+120,y+190)],2,1)
    particles(im,[(cx-40,y+190),(cx-15,y+100),(cx,y+12)],t,.13,4,(241,177,65),14)
    for side in (-1,1):
        for k in range(16):
            birth=k*.74;outer=max(0,(t-birth)*46);inner=max(0,(t-birth-.74)*46)
            if outer<=inner or inner>460:continue
            outer=min(460,outer)
            a,b=sorted((cx+side*inner,cx+side*outer))
            c=(190,72,66) if k%2==0 else (229,218,191)
            top=[(a,y),(b,y),(b+85,y-92),(a+85,y-92)]
            face=[(a,y),(b,y),(b,y+25),(a,y+25)]
            if magnetic:poly(im,top,c);poly(im,face,mix(c,BG,.2));line(im,[top[0],top[3]],BG,1)
            else:
                texture(im,top,0,1 if k%2 else 0);texture(im,face,0)
                line(im,[top[0],top[3]],(151,163,156),2)
    line(im,[(cx+85,y-92),(cx,y),(cx,y+70)],(255,174,47),7)
    arrow(im,(cx-60,y-130),(cx-200,y-130));arrow(im,(cx+140,y-130),(cx+280,y-130))
    text(im,cx+5,y+228,'Solid mantle rises • a small fraction melts',19,MUTED)
    if magnetic:
        polarity='NORMAL' if int(t/.74)%2==0 else 'REVERSED'
        text(im,1020,171,'Field: '+polarity,19,GOLD)
        text(im,260,195,'Older ←',19);text(im,975,195,'→ Older',19)
    else:
        text(im,cx+55,y-65,'RIDGE',17,WHITE,bold=True)
        text(im,324,y+62,'New basalt travels outward',19)

def subduction(im,t,continent=True):
    p=clamp(t/8);y=335;trench=565;dx=80
    block(im,130,1080,y,220,3,4,dx,-90)
    textured_rect(im,130,y,950,170,2)
    # The same continuous lithosphere bends; tracers retain position along its path.
    bend=50+150*p
    slab=[(130,y),(trench-45,y),(trench+15,y+25),(trench+35+220*p,y+bend)]
    bottom=[(x-10,yy+30) for x,yy in slab]
    texture(im,slab+bottom[::-1],0,0,(185,183,151))
    for i in range(17):
        q=(i*52+t*23)%770
        if q<405:x,yy=130+q,y+13
        else:x=535+(q-405)*.71;yy=y+13+(q-405)*.65
        if yy<y+bend+20:line(im,[(x-8,yy-7),(x+8,yy+7)],(192,179,154),3)
    topkind=5 if continent else 4
    texture(im,[(trench+35,y),(1080,y),(1160,y-90),(trench+115,y-90)],topkind)
    texture(im,[(trench+35,y),(1080,y),(1080,y+(76 if continent else 25)),(trench+155,y+45)],1 if continent else 0)
    line(im,[(trench+35,y),(trench+115,y-90)],(18,52,73),7)
    # Fluids leave minerals in the slab; mantle wedge melts, then magma rises.
    if t>5.2:
        particles(im,[(720,460),(750,414),(785,382)],t,.2,4,CYAN,9)
        texture(im,[(760,410),(780,360),(810,375),(826,425)],7)
        particles(im,[(794,407),(811,351),(822,283)],t,.25,4,GOLD,10)
    v=interval(t,5.8,9.6);h=70*v
    if v>0:
        texture(im,[(760,295),(820,295-h),(884,295)],6)
        line(im,[(817,343),(820,295-h)],(194,66,34),5)
        if t>7:particles(im,[(820,295-h),(815,269-h),(831,285-h)],t,.4,3,GOLD,6)
    arrow(im,(215,205),(360,205));arrow(im,(1050,200),(917,200))
    text(im,284,259,'Oceanic plate',22)
    text(im,975,263,'Continent' if continent else 'Oceanic plate',22)
    text(im,530,288,'Trench',17,CYAN)
    text(im,490,490,'Descending slab',19)
    text(im,947,451,'Water → mantle melting',19,CYAN)
    text(im,832,175,'Volcanic arc grows',19,GOLD)

def transform(im,t):
    shift=110*smooth(t/8);y=355
    # Same blocks translate parallel to fault. A once-straight river becomes offset.
    for side in (0,1):
        x0,x1=(210,605) if side==0 else (615,1010)
        off=(-shift/2 if side==0 else shift/2)
        block(im,x0,x1,y+off,130,1,5,100,-120)
        # River fixed to each piece, mapped across the top surface.
        line(im,[(x0+46,y+off-54),(x1+46,y+off-54)],(63,158,215),9)
        line(im,[(x0+46,y+off-54),(x1+46,y+off-54)],(147,220,240),3)
    line(im,[(610,y+80),(710,y-190)],GOLD,3)
    arrow(im,(422,218),(472,158));arrow(im,(859,185),(809,245))
    text(im,355,536,'One bank travels this way',19)
    text(im,905,565,'The other travels the opposite way',19)
    text(im,643,120,'Follow the blue river: its two halves become offset',24,CYAN)

def volcano(im,cx,base_y,width,height,p,kind='shield',scale=1):
    # Every completed flow remains in the edifice. The new deposit propagates
    # outward from the crater before it cools; the summit rises layer by layer.
    layers=9;u=p*layers;completed=int(u);part=u-completed
    dx=55*scale;dy=-40*scale
    block(im,cx-width*.56,cx+width*.56,base_y,65*scale,0,6,dx,dy)
    for n in range(min(layers,completed+1)):
        frac=min(1,max(0,u-n));grow=1 if n<completed else smooth(frac)
        if grow<=0:continue
        level=(n+1)/layers
        spread=width*(.3+.7*level)*.5
        h=height*level
        # Gentle convex shield versus steep concave composite profiles.
        def profile(s):
            return h*((1-abs(s))**(1.6 if kind=='composite' else .7))
        xs=np.linspace(-1,1,61)
        face=[(cx+spread*s,base_y-profile(s)) for s in xs]
        if n==completed:
            edge=min(1,grow*1.55);xs=np.linspace(-edge,edge,51)
            face=[(cx+spread*s,base_y-profile(s)) for s in xs]
        back=[(x+dx,y+dy) for x,y in face]
        texture(im,face+back[::-1],6 if n%2 else 0,0)
        bottom=[(x,y+height/layers*.9) for x,y in reversed(face)]
        texture(im,face+bottom,1 if kind=='composite' and n%2 else 0)
        line(im,face,(223,207,177),1)
        if n==completed and frac<.8:
            line(im,face,mix((255,154,28),(173,56,24),frac),max(2,round(4*scale)))
    summit=base_y-height*min(1,u/layers)
    line(im,[(cx,base_y+60*scale),(cx,summit)],(89,44,35),max(5,round(13*scale)))
    if p<.995:
        particles(im,[(cx,base_y+50*scale),(cx,summit)],p*30,.35,3*scale,(255,155,37),7)
        if kind=='composite':
            for i in range(20):
                age=(p*10+i/20)%1
                x=cx+(i%2*2-1)*age*70*scale;y=summit-100*scale*math.sin(age*math.pi)
                circle(im,x,y,(2+age*6)*scale,(166,155,139))
    return summit

# Each function returns its current explanatory caption and named phase.
def t4(im,t):
    phase=min(2,int(t/10));q=(t-phase*10)
    if phase==0:ridge(im,q);return 'Magma fills the opening, freezes into basalt, and travels away with both plates.','Divergent • crust is created'
    if phase==1:subduction(im,q);return 'Oceanic lithosphere bends into the mantle as the plates converge.','Convergent • lithosphere is consumed'
    transform(im,q);return 'The river moves with each block. Sliding offsets it without making or destroying crust.','Transform • crust is conserved'

def t16(im,t):
    phase=min(2,int(t/10));q=t-phase*10
    if phase<2:
        subduction(im,q,phase==1)
        return ('The older, colder oceanic plate descends; an island arc grows above mantle melting.' if phase==0 else 'Dense oceanic lithosphere descends beneath buoyant continental crust.'),('Ocean–ocean convergence' if phase==0 else 'Ocean–continent convergence')
    p=smooth(q/9);cx=640;y=405
    block(im,180,1060,y,145,2,5,80,-85)
    # Two thick crustal wedges converge, fold and develop a deep root.
    for side in (-1,1):
        xs=np.linspace(0,410,80)
        top=[];bot=[]
        for dist in xs:
            x=cx+side*dist;env=math.exp(-(dist/135)**2)
            fold=env*(20+80*p)*(1+.23*math.sin(dist*.065))
            top.append((x,y-20-fold));bot.append((x,y+55+100*p*env))
        texture(im,top+bot[::-1],1)
        for k in range(5):
            pts=[(x,yy+14+k*12*(1+p*.5)) for x,yy in top]
            line(im,pts,(109,91,72) if k%2 else (224,196,143),3)
        # Grain markers advect toward the collision.
        for i in range(7):
            x=cx+side*(90+(i*54-q*9)%320)
            yy=y-20-math.exp(-((x-cx)/135)**2)*(30+60*p)
            circle(im,x,yy,3,(227,218,164))
    arrow(im,(265,220),(450,220));arrow(im,(1015,220),(830,220))
    text(im,cx,198,'HIMALAYA-STYLE COLLISION',22,GOLD,bold=True)
    text(im,cx,575,'A deeper crustal root grows beneath the mountain belt',21,MUTED)
    return 'Buoyant continental crust resists deep subduction. Continued shortening folds and thickens it.','Continent–continent collision'

def t14(im,t):
    p=clamp(t/26)
    volcano(im,333,490,500,112,p,'shield',.95)
    volcano(im,927,490,410,258,p,'composite',.95)
    text(im,340,173,'SHIELD',26,CYAN,bold=True);text(im,950,173,'COMPOSITE',26,GOLD,bold=True)
    text(im,331,571,'Fluid basalt spreads far',21)
    text(im,931,571,'Lava + fragmental deposits accumulate',19)
    phase=min(2,int(t/10))
    return ['Watch magma rise through each central conduit.','Each eruption leaves a layer. Fresh orange lava cools to dark rock.','Repeated wide flows build a shield; steeper deposits build a composite cone.'][phase],['1 / Magma rises','2 / Erupt, spread, cool','3 / Shape records accumulated deposits'][phase]

def t6(im,t):
    p=t/30;y=377;hot=900
    block(im,130,1100,y,166,2,4,80,-85)
    textured_rect(im,130,y,970,32,0)
    texture(im,[(hot-86,555),(hot-40,430),(hot-25,390),(hot+25,390),(hot+45,435),(hot+86,555)],2,1)
    particles(im,[(hot,555),(hot,482),(hot,405)],t,.10,7,(230,154,66),13)
    # Birth at fixed hot spot; once established each volcano remains attached to the plate.
    for i in range(5):
        age=t-i*6
        if age<0:continue
        x=hot-age*24;h=65*smooth(age/2);sink=max(0,age-7)*1.0
        if x<150:continue
        active=age<4
        texture(im,[(x-56,y-36+sink),(x,y-36-h+sink),(x+62,y-36+sink)],6 if active else 0)
        line(im,[(x,y-36+sink),(x,y-36-h+sink)],(199,83,37) if active else (71,77,77),4)
        if active:particles(im,[(hot,420),(hot,y-20),(x,y-36-h)],t,.35,4,GOLD,7)
        text(im,x,y-56-h+sink,('Active' if active else f'{int(age)} units old'),17,GOLD if active else WHITE)
    arrow(im,(800,183),(540,183))
    text(im,671,157,'Plate moves left',22)
    text(im,911,578,'Plume stays approximately fixed',21,GOLD)
    return 'A volcano grows above the hot spot, rides away, cools and subsides. A new one grows over the same plume.','Hot-spot track • age increases away from activity'

def t3(im,t):
    if t<20:
        ridge(im,t*.49,True)
        return 'Every new pair records the field when basalt cools. Existing bands keep that polarity as they move apart.','Magnetic stripes • a record carried by the rock'
    q=interval(t,20,32);cx=610;y=336
    block(im,150,1080,y,215,3,4,85,-90)
    for side in (-1,1):
        xs=np.linspace(0,455,70);top=[];crustbot=[];lab=[];sed=[]
        for dist in xs:
            x=cx+side*dist;age=dist/455
            yy=y+age*45*q
            top.append((x,yy));crustbot.append((x,yy+24));lab.append((x,yy+36+age*130*q));sed.append((x,yy-age*21*q))
        texture(im,crustbot+lab[::-1],2)
        texture(im,top+crustbot[::-1],0)
        texture(im,sed+top[::-1],1)
        line(im,lab,(255,191,87),3)
        arrow(im,(cx+side*90,210),(cx+side*350,210))
    text(im,650,181,'Older, cooler and deeper away from the ridge',24)
    text(im,337,437,'Crust stays about the same thickness',19)
    text(im,726,513,'Cooling mantle lithosphere thickens',21,GOLD)
    text(im,1005,306,'Sediment accumulates',17)
    return 'Three separate layers: sediment builds on top; crust stays roughly similar; mantle lithosphere thickens as it cools.','Oceanic plate aging • keep the three thicknesses separate'

def t7(im,t):
    phase=min(2,int(t/10));u=interval(t-phase*10,0,9)
    if phase==0:temp=lerp(.20,.80,u);pres=.40;wet=0;start=(.20,.40);m=clamp((temp-.536)*2.2)
    elif phase==1:temp=.57;pres=lerp(.9,.12,u);wet=0;start=(.57,.9);m=clamp((temp-(.4+.34*pres))*3)
    else:temp=.48;pres=.55;wet=u;start=(.48,.55);m=clamp((temp-(.4+.34*pres-.18*wet))*5)
    graph(im,126,235,450,275,temp,pres,wet,(start,(temp,pres)))
    rock_sample(im,760,277,365,235,m)
    text(im,940,238,'The same rock sample',22)
    text(im,940,551,'Solid grains remain as melt appears between them',19)
    return ['Heating moves the rock rightward. Intergranular melt appears only after the solidus is crossed.','Rising rock moves upward on the pressure axis. Its temperature can stay nearly constant as melting begins.','Adding water shifts the solidus left. The sample can begin melting without getting hotter.'][phase],['Add heat →','Reduce pressure ↑','Add water → lower the solidus'][phase]

def t13(im,t):
    phase=min(2,int(t/10));q=t-phase*10;p=clamp(q/9)
    if phase==2:
        subduction(im,q)
        return 'Water leaves the descending slab and lowers the melting temperature of the mantle wedge. Magma then rises.','3 / Add water • subduction-zone mantle wedge'
    block(im,160,1080,335,210,2,5,80,-90)
    if phase==0:
        # Intrusion grows into crust; heating and partial melt spread into wall rock.
        texture(im,[(360,548),(342,445),(390,377),(435,426),(438,548)],7)
        particles(im,[(400,550),(389,436),(399,386)],q,.18,5,GOLD,10)
        for i in range(12):
            x=464+(i%4)*49;y=381+(i//4)*58
            crystal(im,x,y,24,(186,175,153),i*.3)
            heat=clamp((p-i%4*.18)*1.8)
            if heat:line(im,[(x-24,y-20),(x-4,y),(x+23,y+15)],mix((167,131,86),GOLD,heat),1+int(heat*8))
        text(im,396,286,'Hot intrusion',21,GOLD);text(im,736,285,'Surrounding cooler rock',21)
        return 'New magma carries heat into cooler crust. Heat flows through the wall rock; a portion can melt.','1 / Add heat • an intrusion heats its wall rock'
    x=625;y=520-160*p
    # Mantle parcel is mostly solid; melt fraction increases while rising.
    rock_sample(im,x-75,y-58,150,116,clamp((p-.4)*1.4))
    arrow(im,(850,501),(850,345),CYAN,6)
    text(im,900,417,'Pressure falls',21,CYAN)
    text(im,455,205,'Rising mantle parcel',24)
    text(im,630,579,'Mostly solid mantle → small fraction of melt',21)
    return 'The mantle parcel rises into lower pressure. Partial melt appears between solid grains without adding heat.','2 / Decompression • ridges and mantle plumes'

def t8(im,t):
    # Three equal compositions begin molten. Different growth histories produce different textures.
    for j,(x,name) in enumerate([(90,'SLOW'),(475,'FAST'),(860,'TWO STAGES')]):
        u=interval(t,0,24);text(im,x+160,178,name,26,CYAN,bold=True)
        freeze=interval(t,17,24) if j==0 else interval(t,4,8) if j==1 else interval(t,14,19)
        blend_texture(im,[(x,228),(x+330,228),(x+330,503),(x,503)],7,0,freeze)
        if j==0:
            frac=smooth(u);rows,cols=4,5;rmax=39
        elif j==1:
            frac=smooth(clamp(u*4));rows,cols=15,18;rmax=10
        else:
            frac=smooth(clamp(u*1.8));rows,cols=3,3;rmax=38
        for row in range(rows):
            for col in range(cols):
                cx=x+(col+.5)*330/cols;cy=228+(row+.5)*275/rows
                crystal(im,cx,cy,rmax*frac,(226,217,190) if (row+col)%3 else (78,87,77),.2+row*.25)
        if j==2 and t>11:
            f=smooth(interval(t,11,17))
            for row in range(17):
                for col in range(21):
                    cx=x+(col+.5)*330/21;cy=228+(row+.5)*275/17
                    if min(math.hypot(cx-(x+(a+.5)*110),cy-(228+(b+.5)*275/3)) for a in range(3) for b in range(3))>39:
                        crystal(im,cx,cy,8*f,(146,145,128),row*.4)
        text(im,x+160,541,['Large interlocking crystals','Many tiny crystals','Large crystals in a fine groundmass'][j],19)
    phase=min(2,int(t/10))
    return ['All three start with similar molten material. Crystal nuclei begin growing.','Slow cooling allows large crystals; rapid cooling leaves little growth time.','A slow first stage grows phenocrysts. Faster cooling then fills the spaces with small crystals.'][phase],['1 / Nucleation','2 / Crystal growth','3 / Texture preserves the cooling history'][phase]

def t9(im,t):
    p=clamp(t/23);frozen=t>=24
    for side in range(2):
        x=145+side*570;y=238;w=420;h=300
        pts=[(x,y+25),(x+90,y-15),(x+w-45,y),(x+w,y+80),(x+w-10,y+h-25),(x+80,y+h),(x-15,y+h-65)]
        blend_texture(im,pts,7,6 if side==0 else 3,interval(t,19,24))
        rng=np.random.default_rng(71+side)
        rows,cols=(8,12) if side==0 else (5,8)
        for row in range(rows):
            for col in range(cols):
                cx=x+23+(col+.5)*(w-47)/cols+rng.uniform(-7,7)
                cy=y+16+(row+.5)*(h-39)/rows+rng.uniform(-8,8)
                r=(1+(12 if side==0 else 14)*smooth(p))*rng.uniform(.72,1.28)
                cy-=6*math.sin(row*2+col+p*2)*p
                ry=r*(1.25 if side==0 else .9)
                ImageDraw.Draw(im).ellipse((cx-r,cy-ry,cx+r,cy+ry),fill=(44,36,32),outline=mix((255,198,105),(146,126,105),interval(t,17,25)),width=2)
        text(im,x+w/2,173,'PUMICE' if side==0 else 'SCORIA',26,CYAN if side==0 else GOLD,bold=True)
        text(im,x+w/2,573,'Many thin walls; commonly silicic' if side==0 else 'Thicker walls; commonly mafic',19)
    return ('The gas cavities stay behind after the surrounding lava freezes.' if frozen else 'As pressure drops, dissolved gas forms bubbles. Bubbles expand while lava is still mobile.'),('3 / Vesicles preserved in solid rock' if frozen else '1 / Decompress   →   2 / Bubbles expand')

def t10(im,t):
    names=[('Felsic','Granite','Rhyolite'),('Intermediate','Diorite','Andesite'),('Mafic','Gabbro','Basalt')]
    p=interval(t,0,20)
    for j,(name,coarse,fine) in enumerate(names):
        x=140+j*345
        text(im,x+135,166,name.upper(),22,CYAN,bold=True)
        for row in (0,1):
            y=225+row*175;w=275;h=120
            textured_rect(im,x,y,w,h,7 if p<.2 else 0)
            cols,rows,rmax=(7,3,20) if row==0 else (23,9,6)
            growth=smooth(clamp(p*(1 if row==0 else 3)))
            for a in range(rows):
                for b in range(cols):
                    light=((a*13+b*7)%10)>j*3
                    c=([(229,192,162),(215,217,198),(167,170,149)][j] if light else (49,65,54))
                    crystal(im,x+(b+.5)*w/cols,y+(a+.5)*h/rows,rmax*growth,c,.4+(a%3)*.2)
            text(im,x+137,y+h+24,coarse if row==0 else fine,22,WHITE,bold=True)
    text(im,79,287,'Slow',17,GOLD);text(im,79,462,'Fast',17,GOLD)
    return 'Across a column, composition stays similar. Changing the cooling rate changes crystal size and the rock name.','Two decisions • composition column × cooling-texture row'

def tetra(im,x,y,r,spread=1):
    corners=[(x,y-r),(x-r*.85,y+r*.25),(x+r*.85,y+r*.25),(x-r*.3,y+r*.96)]
    corners=[(x+(a-x)*spread,y+(b-y)*spread) for a,b in corners]
    # Rear oxygen, transparent-looking triangular faces, Si, then front oxygen.
    sphere(im,*corners[0],r*.24,(168,64,65))
    poly(im,[corners[0],corners[1],corners[2]],(162,103,68));poly(im,[corners[0],corners[2],corners[3]],(188,137,88))
    for a,b in corners:line(im,[(x,y),(a,b)],(229,192,142),4)
    text(im,*corners[0],'O',max(15,int(r*.17)))
    sphere(im,x,y,r*.19,(223,139,74))
    text(im,x,y,'Si',max(15,int(r*.19)),WHITE)
    for i in (1,2,3):sphere(im,*corners[i],r*.24,(180,54,68));text(im,*corners[i],'O',max(15,int(r*.17)))

def t11(im,t):
    if t<10:
        p=smooth(t/8)
        tetra(im,635,348,134,lerp(1.4,1,p))
        text(im,302,219,'Four oxygen atoms',24)
        text(im,932,460,'One silicon atom',24)
        return 'Four oxygen atoms surround one silicon. The 3D arrangement is a tetrahedron.','1 / Assemble the silicon–oxygen tetrahedron'
    # Linked tetrahedra share vertices; animation assembles an actual corner-sharing chain.
    q=t-10;n=6;step=153;r=90
    for i in range(n):
        arrival=smooth(interval(q,i*1.8,i*1.8+2.4))
        x=247+i*step;y=335+(1-arrival)*(90 if i%2 else -90)
        tetra(im,x,y,r)
        if i and arrival>.9:
            # One shared oxygen at the coincident adjoining corner (not two touching atoms).
            sphere(im,x-r*.85,y+r*.25,r*.24,(180,54,68))
    text(im,643,533,'Shared corner oxygen links neighboring tetrahedra',24,CYAN)
    text(im,642,568,'Chains → pyroxene   •   sheets → mica   •   frameworks → quartz / feldspar',19)
    return 'Tetrahedra link by sharing corner oxygen atoms. Changing connectivity builds chains, sheets and frameworks.','2 / Build a single chain by sharing oxygen'

def t12(im,t):
    minerals=[('Olivine',(135,163,67)),('Pyroxene',(115,137,84)),('Amphibole',(77,96,65)),('Biotite',(120,91,56))]
    cooling=t<21;u=clamp(t/21) if cooling else 1-.36*interval(t,21,30)
    # Molten chamber grows crystal populations; reverse segment explicitly demonstrates partial melting.
    solid=interval(t,16,21) if cooling else 1-.65*interval(t,21,30)
    blend_texture(im,[(120,216),(645,216),(645,536),(120,536)],7,0,solid)
    for j,(name,c) in enumerate(minerals):
        amount=clamp((u-j*.18)*4)
        # Earlier minerals can react with melt as later ones form: schematic population, not settling claim.
        for i in range(6):
            x=163+i*85;y=251+j*65
            crystal(im,x,y,21*amount,c,.4+j*.3,1.25)
        text(im,765,226+j*60,name,22,c,anchor='lm',bold=True)
        if j<3:arrow(im,(799,246+j*60),(799,263+j*60),GOLD,2)
    low=clamp((u-.72)*4)
    for i in range(11):crystal(im,155+i*44,514,15*low,(232,218,198),i*.2)
    # Continuous compositional change is represented by color zoning of growing plagioclase.
    crystal(im,1080,339,58*clamp(u*2),mix((167,171,156),(230,226,215),u),.3,1.4)
    text(im,1090,220,'Plagioclase',22);text(im,1090,252,'Ca-rich → Na-rich',19)
    text(im,950,496,'K-feldspar • muscovite • quartz',19)
    text(im,950,527,'Lower-temperature end',19,MUTED)
    text(im,380,177,'Cooling melt' if cooling else 'Heating a mixed rock',24,GOLD)
    return ('Cooling forms high-temperature minerals first, then lower-temperature minerals and more Na-rich plagioclase.' if cooling else 'On heating, lower-melting components enter liquid first. The remaining rock is still partly solid.'),('Crystallization • high → low temperature' if cooling else 'Partial melting • the general order reverses')

def t15(im,t):
    phase=min(2,int(t/10));q=t-phase*10
    if phase==0:
        # Pot, handle, glowing burner. Contact front advances without bulk translation.
        rect(im,(240,305,767,481),(131,148,157),30)
        rect(im,(757,324,1120,366),(66,75,82),16)
        ImageDraw.Draw(im).ellipse((241,277,766,342),fill=(77,151,185),outline=(196,215,219),width=6)
        for j in range(3):ImageDraw.Draw(im).ellipse((260+j*23,467+j*6,742-j*23,517-j*3),outline=(255,120+30*j,27),width=5)
        heat=interval(q,0,9)
        for i in range(17):
            x=778+i*19;f=clamp(heat*1.6-i*.06)
            circle(im,x,345,8,mix((76,113,155),(255,138,52),f))
        for i in range(15):
            x=266+i*33;y=456
            circle(im,x,y,5,mix((95,163,191),GOLD,heat))
        text(im,946,410,'Same matter; energy travels',24)
        return 'Heat passes from burner to pot and along its handle through contact. The handle does not flow.','Conduction • heat without bulk movement'
    if phase==1:
        rect(im,(267,209,1018,516),(145,161,166),14)
        rect(im,(280,222,1005,500),(38,104,148),7)
        for cx,direction in ((463,1),(820,-1)):
            for i in range(25):
                a=(q*.55+i/25*math.tau)*direction
                x=cx+141*math.cos(a);y=365+114*math.sin(a)
                c=mix((68,164,224),(255,161,69),(math.sin(a)+1)/2)
                circle(im,x,y,7,c)
        line(im,[(300,530),(985,530)],(255,121,36),13)
        text(im,643,565,'Warm material rises; cooler material returns downward',24)
        return 'Follow individual parcels around the cells. Moving water carries heat away from the hot base.','Convection • moving material carries heat'
    texture(im,[(240,450),(460,319),(665,440),(965,461),(995,545),(205,545)],7)
    for i in range(14):
        f=(q*.12+i/14)%1
        x=580+(i%5-2)*35;y=420-265*f
        pts=[(x+9*math.sin(j*.6-f*9),y-j*3) for j in range(12)]
        line(im,pts,mix(GOLD,BG,f*.5),3)
    text(im,1020,268,'Thermal radiation',24,GOLD)
    text(im,641,577,'Electromagnetic waves leave the hot surface',24)
    return 'Hot lava emits electromagnetic radiation. Energy crosses the space above the lava without carrying rock with it.','Radiation • energy travels as waves'

def t5(im,t):
    if t<10:
        p=smooth(t/8);cx=442;cy=363
        # Nested compositional shells exposed by a widening cutaway wedge.
        sphere(im,cx,cy,210,(85,133,153))
        # Reveal nested shells through a widening cross-sectional wedge.
        for r,c in [(208,(174,159,118)),(202,(148,99,57)),(113,(219,155,68)),(60,(242,211,136))]:
            ImageDraw.Draw(im).pieslice((cx-r,cy-r,cx+r,cy+r),-45,lerp(-35,285,p),fill=c)
        # Simple front cutaway, with lithosphere overlay separate from full mantle.
        text(im,430,151,'Earth cutaway',24)
        text(im,745,226,'Crust',22,anchor='lm');text(im,745,298,'Mantle',22,anchor='lm');text(im,745,366,'Liquid outer core',22,anchor='lm');text(im,745,424,'Solid inner core',22,anchor='lm')
        for r,yy in [(207,226),(156,298),(90,366),(25,424)]:line(im,[(cx+r,cy),(704,yy),(728,yy)],(208,198,161),2)
        # Pull shallow shell out over time; shows mechanical distinction at a readable scale.
        x=965;y=228
        for h,thick,kind in [(0,21,1),(21,70,2),(91,161,3)]:textured_rect(im,x,y+h,175,thick,kind)
        sep=0
        line(im,[(x-14,y+21),(x+188,y+21)],WHITE,2)
        line(im,[(x-14,y+91+sep),(x+188,y+91+sep)],GOLD,4)
        text(im,1054,196,'Shallow zoom',19)
        text(im,1156,y+91,'LAB',17,GOLD,anchor='lm')
        text(im,1050,536,'Lithosphere = crust + mantle lid',17)
        text(im,1050,563,'Asthenosphere is mostly solid',17)
        # Energy/material deformation in weak solid below LAB.
        for i in range(8):
            yy=y+129+i*14
            pts=[(x+j*7,yy+7*math.sin(j*.24-t*.4)) for j in range(26)]
            line(im,pts,(170,126,80),2)
        return 'Composition and mechanical behavior describe different boundaries. The lithosphere includes crust and uppermost mantle.','Earth layers • composition versus behavior'
    phase=0 if t<20 else 1;q=t-10 if phase==0 else t-20;p=smooth(q/8)
    rect(im,(205,298,1080,558),(27,91,126),6)
    line(im,[(205,298),(1080,298)],CYAN,3)
    for j,x in enumerate((374,772)):
        thickness=155 if j==0 else (155+120*p if phase==0 else 155)
        density=.65 if j==0 or phase==0 else lerp(.65,.90,p)
        y=298-thickness*(1-density)
        block(im,x,x+150,y,thickness,1 if j==0 or phase==0 else 0,1,45,-25)
        text(im,x+95,210,('Reference block' if j==0 else 'Add thickness' if phase==0 else 'Increase density'),22)
    text(im,643,588,'Floating-block analogy; Earth’s mantle is not a water ocean',19,MUTED)
    return ('Adding thickness at equal density raises the top and deepens the root.' if phase==0 else 'At equal thickness, the denser block sinks farther and its top sits lower.'),('Isostasy • thicker crust rides higher' if phase==0 else 'Isostasy • denser material rides lower')

def t1(im,t):
    phase=min(3,int(t/8));q=t-phase*8;p=smooth(q/7)
    if phase==0:
        # Landscape matches the lecture block: mountains at left, drainage toward right-hand basin.
        block(im,180,1060,415,133,1,5,85,-90)
        mountain=[(205,345),(322,199+45*p),(439,350),(572,396)]
        texture(im,mountain,6)
        line(im,[(332,267),(467,338),(623,354),(793,385),(980,388)],(61,151,199),8)
        for i in range(35):
            age=(q*.13+i/35)%1;x=lerp(330,995,age);y=lerp(278,404,age)+13*math.sin(age*11)
            crystal(im,x,y,4+(i%3),(195,164,116),i)
        for i in range(int(40*p)):
            x=827+(i*37)%182;y=406+(i//13)*6
            crystal(im,x,y,5,(215,192,141))
        return 'Weathering loosens rock. Water transports grains downslope; they settle in the basin.','1 / Weather → erode → transport → deposit'
    if phase==1:
        # Sedimentary grains lose pore space during burial and cement fills boundaries.
        block(im,238,984,284,270,1,4,70,-55)
        for row in range(7):
            yy=312+row*lerp(31,22,p)+p*45
            for col in range(22):
                xx=250+col*33+(row%2)*12
                crystal(im,xx,yy,12,(192+row*5,166+row*4,121+row*5),row*.3)
        for k in range(3):arrow(im,(430+k*190,206),(430+k*190,261),GOLD,4)
        line(im,[(241,490),(981,490)],(234,212,171),4)
        return 'Burial packs grains more tightly. Compaction and mineral cement turn sediment into sedimentary rock.','2 / Bury → compact → cement'
    if phase==2:
        for j in range(9):
            top=[];bottom=[]
            for x in range(240,1030,7):
                fold=44*p*math.sin((x-240)*.014)
                top.append((x,237+j*30+fold));bottom.append((x,263+j*30+fold))
            texture(im,top+bottom[::-1],1 if j%2 else 6)
        arrow(im,(113,364),(221,364));arrow(im,(1169,364),(1055,364))
        for i in range(35):
            x=270+(i*107)%724;y=290+(i*61)%182
            crystal(im,x,y,9,(204,185,154),lerp(i,0,p),lerp(1,.40,p))
        return 'Heat and directed pressure deform and recrystallize the rock. It remains solid during metamorphism.','3 / Metamorphism • change without melting'
    p=interval(q,0,4)
    rock_sample(im,224,234,370,293,p)
    text(im,412,189,'Melting',24,GOLD)
    texture(im,[(594,427),(730,427),(730,457),(594,457)],7)
    particles(im,[(598,439),(697,439),(775,409)],q,.16,5,GOLD,7)
    freeze=interval(q,3,7)
    blend_texture(im,[(759,234),(1109,234),(1109,527),(759,527)],7,0,freeze)
    for a in range(5):
        for b in range(6):crystal(im,786+b*57,263+a*54,28*smooth(freeze),(184,178,159),a*.2)
    text(im,935,190,'Cooling + crystallization',24,CYAN)
    return 'Melting produces magma; cooling grows interlocking crystals. This is one possible route, not a required rock-cycle loop.','4 / Melt → cool → igneous rock'

def t2(im,t):
    # Animated depositional stack and a correctly proportioned whole-history bar.
    eras=[('Precambrian',4059,(118,148,148)),('Paleozoic',287,(139,168,117)),('Mesozoic',186,(196,160,100)),('Cenozoic',66,(210,185,127))]
    phase=min(3,int(t/7.5));q=interval(t-phase*7.5,0,7)
    total=4598;x=160
    for i,(name,span,c) in enumerate(eras):
        width=950*span/total
        rect(im,(x,532,x+width,565),c)
        if i==0:text(im,x+width/2,587,'Precambrian: most of Earth history',19)
        x+=width
    text(im,160,511,'~4.6 billion years ago',17,anchor='lm');text(im,1110,510,'Today',17,anchor='rm')
    # Teaching stack is schematic, not a literal one-outcrop age scale.
    for i in range(phase+1):
        grow=1 if i<phase else smooth(q)
        y=463-i*57;h=48*grow
        block(im,277,983,y-h,h,1 if i%2 else 6,5,70,-40)
        text(im,184,y-h/2,eras[i][0],19,eras[i][2],anchor='rm')
        # Fossil silhouettes emerge inside deposited rock; no invented taxonomic sequence.
        if i and grow>.4:
            for j in range(6):
                xx=330+j*113;yy=y-h/2
                ImageDraw.Draw(im).arc((xx-12,yy-12,xx+12,yy+12),20,320,fill=(80,69,53),width=3)
                for k in range(4):line(im,[(xx-9+k*5,yy-8),(xx-9+k*5,yy+8)],(104,91,71),1)
    text(im,646,158,eras[phase][0].upper(),34,GOLD,bold=True)
    labels=['Most of Earth history; early life appears','Diverse life expands in sea and on land','The era that includes the dinosaurs','Recent mammal-rich history']
    text(im,646,204,labels[phase],24)
    return 'Read the changing stack from older below to younger above. The bottom bar shows how unequal the time spans are.','Geologic time • major course blocks in order'

SCENES={
'T1':('The rock cycle, in motion',32,t1,'L1b slide 29'),
'T2':('Build a timeline of Earth history',30,t2,'L2 slide 24'),
'T3':('Seafloor spreading and plate aging',32,t3,'L3 slides 23, 40, 42'),
'T4':('Three boundaries. Three motions.',30,t4,'L3 slides 20, 24, 37'),
'T5':('Earth layers and floating balance',30,t5,'L1b slides 12, 14, 16'),
'T6':('How a hot spot builds a chain',30,t6,'L3 slide 43; textbook 5.11'),
'T7':('A graph describes a changing rock',30,t7,'Textbook 5.5, figures 28–30'),
'T8':('Watch crystals grow as magma cools',30,t8,'Textbook 5.1 and 5.8'),
'T9':('From dissolved gas to holes in rock',28,t9,'Textbook 5.1 and 5.3'),
'T10':('One composition, two cooling histories',26,t10,'Class chart; textbook 5.2–5.3'),
'T11':('Atoms assemble a silicate structure',26,t11,'Textbook 4.7, figures 09–10'),
'T12':('Crystals form. Partial melt returns.',30,t12,'Textbook 5.5 and 5.8'),
'T13':('Three ways to make rock start melting',30,t13,'Textbook 5.5; L3 slide 26'),
'T14':('Eruption by eruption, a volcano grows',30,t14,'Textbook 6.1, 6.3, 6.7'),
'T15':('Follow the heat. Follow the material.',30,t15,'Textbook 5.4, figure 05.04.b4'),
'T16':('What happens when plates converge?',30,t16,'L3 slides 25–30')}


def frame(topic,t):
    title,duration,fn,source=SCENES[topic]
    im=Image.new('RGB',(W,H),BG)
    # Subtle studio floor keeps textured blocks legible without busy decorations.
    d=ImageDraw.Draw(im)
    for y in range(130,603):
        v=int(7*math.sin((y-130)/473*math.pi));d.line((0,y,W,y),fill=(7+v,17+v,35+v))
    text(im,48,34,'GEOL 1001  /  FIGURES IN MOTION',17,CYAN,anchor='lm',bold=True)
    text(im,1231,34,topic+'  •  EXAM 1',17,MUTED,anchor='rm')
    text(im,48,84,title,40,WHITE,anchor='lm',bold=True)
    line(im,[(48,116),(1232,116)],(56,88,108),1)
    caption,phase=fn(im,t)
    rect(im,(31,607,1249,704),(15,32,49),12)
    text(im,50,630,phase,22,GOLD,anchor='lm',bold=True)
    # Deliberate line wrap for legibility at laptop and phone sizes.
    words=caption.split();lines=['']
    for word in words:
        trial=(lines[-1]+' '+word).strip()
        if ImageDraw.Draw(im).textlength(trial,font=FONT[21])>1170:lines.append(word)
        else:lines[-1]=trial
    for i,l in enumerate(lines):text(im,50,659+i*25,l,21,WHITE,anchor='lm')
    line(im,[(32,713),(1248,713)],(39,60,73),4)
    line(im,[(32,713),(32+1216*clamp(t/duration),713)],CYAN,4)
    # Cite the original inside each video, including an explicit schematic scale statement.
    text(im,1225,598,source+'  •  time / scale schematic',15,MUTED,anchor='rm')
    return im


def write_captions(topic):
    duration=SCENES[topic][1];fn=SCENES[topic][2];cues=[];last=None;begin=0
    for second in range(duration):
        caption,phase=fn(Image.new('RGB',(W,H),BG),second)
        now=phase+'\n'+caption
        if last is not None and now!=last:cues.append((begin,second,last));begin=second
        last=now
    cues.append((begin,duration,last))
    def stamp(t):return f'00:{int(t)//60:02d}:{int(t)%60:02d}.000'
    vtt='WEBVTT\n\n'+'\n\n'.join(f'{stamp(a)} --> {stamp(b)}\n{line}' for a,b,line in cues)+'\n'
    (OUT/(topic+'.vtt')).write_text(vtt)


def render(topic):
    OUT.mkdir(exist_ok=True)
    duration=SCENES[topic][1]
    poster_time={'T3':12,'T4':6,'T14':22,'T16':25,'T1':20}.get(topic,duration*.63)
    frame(topic,poster_time).save(OUT/(topic+'.png'),optimize=True)
    write_captions(topic)
    dest=OUT/(topic+'.rendering.mp4')
    cmd=['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-threads','2','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)]
    with subprocess.Popen(cmd,stdin=subprocess.PIPE) as proc:
        for n in range(duration*FPS):proc.stdin.write(frame(topic,n/FPS).tobytes())
        proc.stdin.close()
        if proc.wait():raise RuntimeError(topic+' encode failed')
    dest.replace(OUT/(topic+'.mp4'))
    print(topic+' rendered '+str(duration)+'s',flush=True)


def stills(topics):
    dest=HERE/'qa-process';dest.mkdir(exist_ok=True)
    for topic in topics:
        dur=SCENES[topic][1]
        for f in [.07,.25,.47,.66,.88]:frame(topic,dur*f).save(dest/(topic+'-'+str(round(f*100))+'.jpg'),quality=88)
    # Contact sheet is a QA artifact, not part of the video.
    sheet=Image.new('RGB',(1280,360*len(topics)),BG)
    for i,topic in enumerate(topics):
        for j,f in enumerate([.16,.48,.87]):
            thumb=frame(topic,SCENES[topic][1]*f).resize((426,240))
            sheet.paste(thumb,(j*426,i*360));text(sheet,j*426+12,i*360+264,topic+' / '+str(round(f*100))+'%',21)
    sheet.save(dest/('contact-'+ '-'.join(topics)+'.jpg'),quality=90)

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--topic',nargs='+',choices=SCENES);parser.add_argument('--all',action='store_true');parser.add_argument('--stills',action='store_true');parser.add_argument('--workers',type=int,default=2)
    args=parser.parse_args();topics=args.topic or list(SCENES)
    if args.stills:stills(topics)
    elif args.workers>1:
        with concurrent.futures.ProcessPoolExecutor(max_workers=args.workers) as ex:list(ex.map(render,topics))
    else:
        for topic in topics:render(topic)
