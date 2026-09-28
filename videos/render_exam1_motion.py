#!/usr/bin/env python3
"""Render the 15 companion Exam 1 motion studies. T3 uses the existing ridge film.

Each scene is original schematic art based on the cited GEOL 1001 course figure
and the Sep 24 review topic text. No network calls or saved study data are used.
"""
from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw
import render_seafloor_spreading as base

W, H, FPS, SECONDS = 1280, 720, 24, 12
OUT = Path(__file__).resolve().parent / "exam1"
WHITE, MUTED, CYAN, GOLD = base.WHITE, base.MUTED, base.CYAN, base.GOLD
RED, CREAM = base.NORMAL, base.REVERSED
REG, BOLD = base.font(22), base.font(23, True)
SMALL, TINY = base.font(17), base.font(15)
COLS = [(86, 203, 219), (242, 184, 100), (203, 101, 102), (177, 156, 221)]


def xy(x, y): return (round(x), round(y))
def lerp(a, b, p): return a + (b-a)*p
def ease(p): return base.smooth(p)
def rgba(c, a=255): return (*c, a)
def label(d, x, y, s, color=WHITE, f=REG, anchor="mm"):
    d.text((x, y), s, font=f, fill=rgba(color), anchor=anchor)
def rect(d, box, color, radius=10, outline=None, width=2):
    d.rounded_rectangle(tuple(map(round, box)), radius=radius, fill=rgba(color), outline=rgba(outline) if outline else None, width=width)
def line(d, points, color=CYAN, width=5): d.line([xy(*v) for v in points], fill=rgba(color), width=width, joint="curve")
def circ(d, x, y, r, color, outline=None, width=2):
    d.ellipse((x-r, y-r, x+r, y+r), fill=rgba(color), outline=rgba(outline) if outline else None, width=width)
def poly(d, points, color, outline=None):
    d.polygon([xy(*v) for v in points], fill=rgba(color), outline=rgba(outline) if outline else None)
def arrow(d, a, b, color=CYAN, width=5):
    base.arrow(d, *a, *b, rgba(color), width=width, head=14)
def dot_on(points, p):
    q = base.clamp(p)*(len(points)-1); i = min(len(points)-2, int(q))
    return (lerp(points[i][0], points[i+1][0], q-i),
            lerp(points[i][1], points[i+1][1], q-i))
def panel(d, x, y, w, h, title):
    rect(d, (x, y, x+w, y+h), (21, 47, 65), 12, (52, 107, 123))
    label(d, x+14, y+20, title, CYAN, SMALL, "lm")


def scene_t1(d, p):
    nodes = [(155, 440, "MAGMA"), (360, 440, "IGNEOUS"), (570, 440, "SEDIMENT"),
             (810, 440, "SEDIMENTARY"), (1085, 440, "METAMORPHIC")]
    verbs = ["cool", "weather / erode", "deposit / lithify", "heat / pressure"]
    for i, (x, y, title) in enumerate(nodes):
        rect(d, (x-72, y-38, x+72, y+38), (35, 74, 91), 14, COLS[i%4])
        label(d, x, y, title, WHITE, SMALL)
        if i < 4:
            arrow(d, (x+78, y), (nodes[i+1][0]-80, y), GOLD, 4)
            label(d, (x+nodes[i+1][0])/2, 390, verbs[i], MUTED, TINY)
    line(d, [(1080, 490), (1030, 545), (200, 545), (155, 490)], RED, 3)
    label(d, 630, 566, "melting returns solid rock to magma", MUTED, TINY)
    x, y = dot_on([(155,440),(360,440),(570,440),(810,440),(1085,440),(1030,545),(200,545),(155,440)],p)
    circ(d,x,y,13,GOLD,(255,241,196),3)
    line(d, [(360,478),(500,508),(850,508),(1085,478)], (91,137,155), 2)
    label(d, 710, 520, "other pathways are possible", MUTED, TINY)


def scene_t2(d, p):
    blocks = [("PRECAMBRIAN", 90, 565, (41, 107, 121)),
              ("PALEOZOIC", 575, 790, (64, 128, 120)),
              ("MESOZOIC", 800, 1000, (164, 112, 84)),
              ("CENOZOIC", 1010, 1190, (178, 96, 101))]
    for name, x0, x1, c in blocks:
        rect(d, (x0, 390, x1, 485), c, 8)
        label(d, (x0+x1)/2, 429, name, WHITE, SMALL)
    label(d, 90, 350, "older", GOLD, SMALL, "lm")
    label(d, 1190, 350, "younger", GOLD, SMALL, "rm")
    arrow(d, (108, 515), (1170, 515), MUTED, 3)
    x = lerp(110, 1170, ease(p))
    line(d, [(x,375),(x,505)], GOLD, 4)
    circ(d,x,375,9,GOLD)
    label(d, 640, 555, "four broad course blocks • widths are schematic", MUTED, SMALL)


def scene_t4(d, p):
    k = ease(p)
    for x, title in [(80,"DIVERGENT"),(470,"CONVERGENT"),(860,"TRANSFORM")]:
        panel(d,x,310,340,250,title)
    # Divergent: new center rock and outward motion.
    rect(d,(110-18*k,420,229-18*k,464),(71,124,145))
    rect(d,(271+18*k,420,390+18*k,464),(71,124,145))
    poly(d,[(225,465),(250,405-15*k),(275,465)],(228,119,73))
    arrow(d,(240,385),(176-16*k,385),CYAN,4); arrow(d,(260,385),(324+16*k,385),CYAN,4)
    # Convergent: one oceanic plate bends into mantle.
    poly(d,[(500,420),(624,420),(695,493+20*k),(695,515+20*k),(590,461),(500,461)],(70,133,151))
    rect(d,(650,420,785,464),(129,117,104))
    arrow(d,(534,387),(585+10*k,387),CYAN,4); arrow(d,(754,387),(710-10*k,387),CYAN,4)
    # Transform: blocks pass laterally.
    rect(d,(890,400-22*k,1006,449-22*k),(67,130,149))
    rect(d,(1064,431+22*k,1180,480+22*k),(67,130,149))
    line(d,[(1035,393),(1035,497)],GOLD,3)
    arrow(d,(900,487),(980,487),CYAN,4); arrow(d,(1170,393),(1090,393),CYAN,4)


def scene_t5(d, p):
    k = ease(p)
    panel(d,80,305,530,275,"LAYERS: COMPOSITION / BEHAVIOR")
    rect(d,(110,364,274,390),(121,151,160),4)
    rect(d,(110,392,274,487),(74,126,141),4)
    rect(d,(110,489,274,545),(197,142,91),4)
    label(d,192,376,"crust",WHITE,TINY)
    label(d,192,439,"mantle",WHITE,SMALL)
    label(d,192,516,"core",WHITE,SMALL)
    label(d,192,560,"composition",MUTED,TINY)
    rect(d,(317,364,570,423),(80,131,146),4)
    rect(d,(317,429,570,545),(125,105,127),4)
    label(d,443,386,"lithosphere",WHITE,SMALL)
    label(d,443,408,"crust + uppermost mantle",WHITE,TINY)
    line(d,[(317,426),(570,426)],GOLD,3)
    label(d,443,442,"LAB",GOLD,TINY)
    label(d,443,494,"asthenosphere",WHITE,SMALL)
    label(d,443,560,"mechanical behavior",MUTED,TINY)
    panel(d,670,305,530,275,"ISOSTASY")
    line(d,[(700,440),(1170,440)],CYAN,4)
    rect(d,(760,385+4*math.sin(p*7),890,520+4*math.sin(p*7)),(175,153,118))
    rect(d,(985,407+3*math.sin(p*7+1),1115,481+3*math.sin(p*7+1)),(175,153,118))
    label(d,825,365,"thicker block",WHITE,SMALL)
    label(d,1050,365,"thinner block",WHITE,SMALL)
    label(d,935,548,"thicker equal-density block rides higher and roots deeper",MUTED,TINY)


def scene_t6(d, p):
    shift = 55*ease(p)
    panel(d,80,305,1120,275,"PLATE MOVES OVER A RELATIVELY FIXED HOT SPOT")
    line(d,[(100,425),(1180,425)],CYAN,6)
    for i in range(5):
        x = 650 if i == 0 else 650 - i*115 - shift
        if 120<x<1150:
            h = 38 + 7*i
            poly(d,[(x-46,425),(x,425-h),(x+46,425)],(76,143,136))
            label(d,x,470,("ACTIVE" if i==0 else "older"),GOLD if i==0 else MUTED,TINY)
    poly(d,[(590,555),(650,403),(710,555)],(222,117,75))
    circ(d,650,411,11,GOLD)
    arrow(d,(650,542),(650,449),GOLD,5)
    arrow(d,(485,365),(315,365),CYAN,4)
    label(d,650,570,"hot spot stays approximately fixed while the plate moves",MUTED,SMALL)


def scene_t7(d, p):
    panel(d,80,305,1120,275,"READ AXES → SOLIDUS → PATH")
    ox,oy=220,335
    arrow(d,(ox,535),(1110,535),WHITE,3); arrow(d,(ox,oy),(ox,535),WHITE,3)
    label(d,665,559,"temperature increases →",WHITE,SMALL)
    label(d,145,432,"pressure / depth ↓",WHITE,TINY)
    path=[(575,338),(600,385),(635,435),(670,490),(705,530)]
    line(d,path,GOLD,5)
    label(d,745,385,"solidus",GOLD,SMALL)
    label(d,465,365,"solid rock",MUTED,SMALL)
    label(d,940,365,"melt present",CYAN,SMALL)
    start,end=(450,450),(850,450)
    x=lerp(start[0],end[0],ease(p))
    arrow(d,start,(x,450),CYAN,5)
    circ(d,x,450,11,CYAN,(218,252,249),2)


def scene_t8(d, p):
    for x,title,color in [(80,"SLOW COOLING",(64,112,127)),(470,"FAST COOLING",(64,112,127)),(860,"TWO STAGES",(64,112,127))]:
        panel(d,x,305,340,275,title)
        rect(d,(x+20,360,x+320,542),color,10)
    big=ease(p)*24+3
    for x,y in [(170,410),(315,485),(243,460)]:
        circ(d,x,y,big,(199,185,153),(232,219,193),3)
    for i in range(42):
        x=500+(i*47)%275;y=377+(i*83)%148
        circ(d,x,y,2+3*ease(p),(194,191,166))
    for x,y in [(940,425),(1075,482)]:
        circ(d,x,y,21*ease(min(1,p*2))+4,(202,191,163),(237,226,197),2)
    for i in range(23):
        x=891+(i*61)%276;y=375+(i*47)%146
        circ(d,x,y,1+2*ease(max(0,p-.38)*1.6),(206,200,178))
    label(d,250,560,"coarse",WHITE,SMALL)
    label(d,640,560,"fine",WHITE,SMALL)
    label(d,1030,560,"porphyritic",WHITE,SMALL)


def scene_t9(d, p):
    for x,title,c in [(80,"PUMICE",(195,184,154)),(670,"SCORIA",(116,70,66))]:
        panel(d,x,305,530,275,title)
        rect(d,(x+28,355,x+500,545),c,16)
    for side in range(2):
        x0=80 if side==0 else 670
        count=22 if side==0 else 12
        for i in range(count):
            x=x0+60+(i*79)%(405)
            y=375+(i*53)%146-24*ease(p)*((i%3)/3)
            r=(9 if side==0 else 13)+7*ease(p)
            circ(d,x,y,r,(42,77,90) if side==0 else (44,34,41))
    label(d,345,566,"many thin-walled gas cavities",WHITE,SMALL)
    label(d,930,566,"fewer, thicker-walled cavities",WHITE,SMALL)


def scene_t10(d, p):
    panel(d,80,305,1120,275,"COMPOSITION COLUMN × TEXTURE ROW")
    cols=["FELSIC","INTERMEDIATE","MAFIC","ULTRAMAFIC"]
    coarse=["granite","diorite","gabbro","peridotite"]
    fine=["rhyolite","andesite","basalt","—"]
    for i,c in enumerate(cols):
        x=286+i*214; label(d,x,354,c,WHITE,TINY)
        for j,word in enumerate((coarse[i],fine[i])):
            y=419+j*78
            rect(d,(x-96,y-32,x+96,y+32),(40,76,94),8,(78,137,153))
            label(d,x,y,word,WHITE,SMALL)
    label(d,151,418,"COARSE",GOLD,SMALL);label(d,151,497,"FINE",GOLD,SMALL)
    step=min(5,int(p*6)); i=step//2; j=step%2
    x=286+i*214;y=419+j*78
    d.rounded_rectangle((x-101,y-37,x+101,y+37),radius=11,outline=rgba(GOLD),width=5)
    label(d,640,567,"same composition can yield different textures",MUTED,SMALL)


def scene_t11(d, p):
    panel(d,80,305,1120,275,"SILICON–OXYGEN TETRAHEDRA LINK")
    cx,cy=410,442
    corners=[(-95,-65),(95,-65),(-95,65),(95,65)]
    for dx,dy in corners:
        f=ease(min(1,p*2.2))
        x=cx+dx*(1.6-.6*f);y=cy+dy*(1.6-.6*f)
        line(d,[(cx,cy),(x,y)],(87,144,159),3)
        circ(d,x,y,23,(192,105,97));label(d,x,y,"O",WHITE,SMALL)
    circ(d,cx,cy,30,GOLD);label(d,cx,cy,"Si",(29,37,44),SMALL)
    label(d,cx,553,"one Si + four surrounding O",WHITE,SMALL)
    for i in range(4):
        x=735+i*110
        a=ease((p-.35)*2.1-i*.15)
        if a<=0:continue
        poly(d,[(x,410),(x+43,450),(x,490),(x-43,450)],(39+int(39*a),93+int(39*a),111+int(19*a)),(192,105,97))
        circ(d,x,450,14,GOLD)
    label(d,910,553,"links: chains → sheets → frameworks",WHITE,SMALL)


def scene_t12(d, p):
    panel(d,80,305,1120,275,"COOLING ORDER • SIMPLIFIED COURSE MODEL")
    names=["olivine","pyroxene","amphibole","biotite"]
    for i,name in enumerate(names):
        y=365+i*54
        rect(d,(220,y-22,560,y+22),(44,77,91),8,(71,127,141))
        label(d,390,y,name,WHITE,SMALL)
    arrow(d,(160,350),(160,552),GOLD,4)
    label(d,100,340,"HOT",GOLD,SMALL);label(d,100,550,"COOL",CYAN,SMALL)
    k=min(3,int(p*4)); yy=365+k*54
    d.rounded_rectangle((214,yy-28,566,yy+28),radius=10,outline=rgba(GOLD),width=5)
    rect(d,(700,364,1080,535),(36,71,86),10,(79,132,146))
    for i in range(9):
        x=730+i*37
        c=base.mix((211,165,107),(135,190,194),i/8)
        rect(d,(x,407,x+31,486),c,3)
    label(d,890,385,"PLAGIOCLASE",WHITE,SMALL)
    label(d,890,516,"Ca-rich → Na-rich",MUTED,SMALL)
    label(d,640,567,"partial melting starts with lower-melting components",MUTED,SMALL)


def scene_t13(d, p):
    titles=["ADD HEAT","LOWER PRESSURE","ADD WATER"]
    for i,x in enumerate((80,470,860)):
        panel(d,x,305,340,275,titles[i])
        ox=x+62;oy=518
        arrow(d,(ox,oy),(x+296,oy),MUTED,2)
        arrow(d,(ox,350),(ox,oy),MUTED,2)
        line(d,[(x+158,350),(x+183,420),(x+208,505)],GOLD,4)
        if i==2:line(d,[(x+114,350),(x+139,420),(x+164,505)],CYAN,3)
        if i==0:a,b=(x+112,430),(x+250,430)
        elif i==1:a,b=(x+183,484),(x+183,365)
        else:a,b=(x+178,430),(x+178,430)
        ex,ey=lerp(a[0],b[0],ease(p)),lerp(a[1],b[1],ease(p))
        arrow(d,a,(ex,ey),CYAN,4);circ(d,ex,ey,8,CYAN)
        if i==2:arrow(d,(x+208,467),(x+164,467),CYAN,3)
    label(d,640,568,"three ways to cross a melting boundary",MUTED,SMALL)


def scene_t14(d, p):
    panel(d,80,305,530,275,"LOW VISCOSITY • SHIELD")
    panel(d,670,305,530,275,"HIGHER VISCOSITY • COMPOSITE")
    line(d,[(100,513),(590,513)],MUTED,3)
    line(d,[(690,513),(1180,513)],MUTED,3)
    poly(d,[(165,513),(345,462),(525,513)],(112,118,113))
    poly(d,[(810,513),(935,357),(1060,513)],(135,107,105))
    f=ease(p)
    line(d,[(345,470),(345+200*f,480+15*f)],(241,124,75),11)
    line(d,[(935,370),(935+80*f,420+70*f)],(241,124,75),9)
    arrow(d,(330,421),(220,421),CYAN,3)
    arrow(d,(945,421),(1010,421),CYAN,3)
    label(d,345,555,"fluid basalt spreads broadly",WHITE,SMALL)
    label(d,935,555,"viscous material builds steeper slopes",WHITE,SMALL)


def scene_t15(d, p):
    for x,title in [(80,"CONDUCTION"),(470,"CONVECTION"),(860,"RADIATION")]:
        panel(d,x,305,340,275,title)
    rect(d,(132,413,360,474),(80,107,115),6)
    for i in range(5):
        x=150+i*47+20*math.sin(p*6+i)
        circ(d,x,440,9,GOLD)
    label(d,250,547,"through contact",WHITE,SMALL)
    d.ellipse((550,375,730,515),outline=rgba(CYAN),width=4)
    angle=p*math.tau
    for off in (0,math.pi/2,math.pi,3*math.pi/2):
        x=640+86*math.cos(angle+off);y=445+65*math.sin(angle+off)
        circ(d,x,y,11,GOLD)
    label(d,640,547,"moving material",WHITE,SMALL)
    circ(d,952,445,31,(239,137,75))
    for i in range(7):
        a=i*math.pi/4-math.pi/2
        length=45+75*ease(p)
        line(d,[(952+46*math.cos(a),445+46*math.sin(a)),
                (952+length*math.cos(a),445+length*math.sin(a))],GOLD,4)
    label(d,1030,547,"electromagnetic waves",WHITE,SMALL)


def scene_t16(d, p):
    for x,title in [(80,"OCEAN–OCEAN"),(470,"OCEAN–CONTINENT"),(860,"CONTINENT–CONTINENT")]:
        panel(d,x,305,340,275,title)
    f=ease(p)
    # Two subduction contexts; the denser oceanic plate descends.
    for x in (80,470):
        line(d,[(x+25,438),(x+180,438),(x+260,495+18*f)],CYAN,17)
        line(d,[(x+200,438),(x+315,438)],(170,153,116) if x==470 else CYAN,17)
        arrow(d,(x+90,391),(x+156,391),WHITE,3)
        arrow(d,(x+290,391),(x+230,391),WHITE,3)
        poly(d,[(x+230,420),(x+257,378-13*f),(x+285,420)],(184,109,91))
    line(d,[(885,450),(1000,450),(1030,425-36*f)],(177,154,117),20)
    line(d,[(1175,450),(1060,450),(1030,425-36*f)],(177,154,117),20)
    poly(d,[(1000,442),(1030,410-42*f),(1060,442)],(198,168,125))
    arrow(d,(920,391),(985,391),WHITE,3);arrow(d,(1140,391),(1075,391),WHITE,3)
    label(d,250,551,"one oceanic plate sinks",WHITE,TINY)
    label(d,640,551,"oceanic plate sinks",WHITE,TINY)
    label(d,1030,551,"crust thickens",WHITE,TINY)


SCENES = {
    "T1": ("Rock cycle: many valid paths", ["Rock can follow several routes.", "Processes move material between states.", "Melting and metamorphism are different."], "L1B slide 29", scene_t1),
    "T2": ("The four broad time blocks", ["Start with Precambrian.", "Then Paleozoic and Mesozoic.", "Cenozoic is youngest."], "L2 slide 24", scene_t2),
    "T4": ("Three boundary motions", ["Divergent plates move apart.", "Convergence brings plates together.", "Transform plates slide past."], "L3 slides 20 and 37", scene_t4),
    "T5": ("Earth layers and isostasy", ["Composition and mechanical layers differ.", "The LAB is not the crust–mantle boundary.", "Thickness and density affect elevation."], "L1B slides 12, 14, 16", scene_t5),
    "T6": ("Plate motion over a hot spot", ["Hot mantle rises beneath a plate.", "The plate moves across the hot spot.", "The volcanic chain ages away from activity."], "L3 slide 43; TB5 5.11", scene_t6),
    "T7": ("Read a pressure–temperature graph", ["Read temperature and pressure axes.", "Locate the solidus.", "Crossing it starts partial melting."], "TB5 section 5.5", scene_t7),
    "T8": ("Cooling leaves a texture", ["Slow cooling allows larger crystals.", "Fast cooling leaves smaller crystals.", "Two stages can make porphyritic texture."], "TB5 sections 5.1, 5.8", scene_t8),
    "T9": ("Gas bubbles become vesicles", ["Gas bubbles form as pressure falls.", "Cooling freezes cavities into lava.", "Pumice and scoria have different textures."], "TB5 sections 5.1, 5.3", scene_t9),
    "T10": ("Composition crossed with texture", ["Choose a composition column.", "Choose the cooling-texture row.", "Read the rock name at their intersection."], "TB5 sections 5.2–5.3; class chart", scene_t10),
    "T11": ("Build a silicate structure", ["One Si sits among four O.", "Tetrahedra can link together.", "Chains, sheets and frameworks differ."], "TB4 sections 4.6–4.12", scene_t11),
    "T12": ("Bowen's cooling sequence", ["High-temperature minerals form first.", "Minerals change as cooling continues.", "Partial melting begins at the low-melting end."], "TB5 sections 5.5, 5.8", scene_t12),
    "T13": ("Three ways to start melting", ["Adding heat moves toward the solidus.", "Rising mantle lowers pressure.", "Water lowers the melting boundary."], "TB5 sections 5.5, 5.9–5.11; L3 slide 26", scene_t13),
    "T14": ("Viscosity shapes volcanoes", ["Low-viscosity basalt spreads.", "More viscous material piles up.", "Shape records eruption behavior."], "TB5 5.7; TB6 6.1–6.8", scene_t14),
    "T15": ("Three routes for heat", ["Conduction passes heat through contact.", "Convection moves warm material.", "Radiation travels as waves."], "TB5 sections 5.4, 5.8", scene_t15),
    "T16": ("Density at convergence", ["One oceanic plate can sink.", "Oceanic lithosphere sinks below continent.", "Continental collision thickens crust."], "L3 slides 25–30", scene_t16),
}


def frame(topic, t):
    title, beats, source, scene = SCENES[topic]
    p = base.clamp(t / SECONDS)
    im = base.BASE.copy()
    d = ImageDraw.Draw(im, "RGBA")
    rect(d,(48,38,304,77),(29,67,88),18,(85,212,225))
    label(d,65,58,"GEOL 1001 / STUDY LAB",CYAN,base.FONTS["eyebrow"],"lm")
    label(d,1204,58,topic+"  •  EXAM 1",MUTED,base.FONTS["eyebrow"],"rm")
    line(d,[(48,91),(1232,91)],(73,128,149),2)
    label(d,49,159,title,WHITE,base.font(49,True),"lm")
    beat=min(2,int(p*3))
    label(d,51,218,beats[beat],MUTED,base.font(26),"lm")
    rect(d,(48,638,1232,689),(10,27,46),12,(62,109,129))
    label(d,67,663,"SCHEMATIC • NOT TO SCALE",MUTED,TINY,"lm")
    label(d,1212,663,source,MUTED,TINY,"rm")
    rect(d,(372,659,910,665),(66,104,122),3)
    rect(d,(372,659,372+538*p,665),CYAN,3)
    scene(d,p)
    return im.convert("RGB")


def render_video(topic):
    OUT.mkdir(parents=True, exist_ok=True)
    poster = OUT / (topic + ".png")
    frame(topic, 6.0).save(poster)
    dest = OUT / (topic + ".mp4")
    cmd = ["ffmpeg","-y","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24",
           "-s",f"{W}x{H}","-r",str(FPS),"-i","-","-c:v","libx264",
           "-preset","medium","-crf","20","-pix_fmt","yuv420p",
           "-movflags","+faststart",str(dest)]
    with subprocess.Popen(cmd, stdin=subprocess.PIPE) as proc:
        assert proc.stdin is not None
        for n in range(FPS*SECONDS):
            proc.stdin.write(frame(topic,n/FPS).tobytes())
        proc.stdin.close()
        if proc.wait(): raise RuntimeError("ffmpeg failed for "+topic)
    print(topic, dest, flush=True)


if __name__ == "__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--topic",choices=list(SCENES))
    parser.add_argument("--poster-only",action="store_true")
    args=parser.parse_args()
    wanted=[args.topic] if args.topic else list(SCENES)
    for topic in wanted:
        if args.poster_only:
            OUT.mkdir(parents=True,exist_ok=True)
            frame(topic,6).save(OUT/(topic+".png"))
        else: render_video(topic)
