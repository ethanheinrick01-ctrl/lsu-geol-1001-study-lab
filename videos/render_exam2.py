#!/usr/bin/env python3
"""Source-grounded Exam 2 process films. Offline Pillow/FFmpeg, accepted texture atlas.

Independent geometric reconstructions, never motion pasted over unchanging labels.
Original course figures stay beside the film. No study-state access or network calls.
"""
from pathlib import Path
import argparse, concurrent.futures, json, math, subprocess, textwrap
import numpy as np
from PIL import Image, ImageDraw, ImageChops
import render_process_films as P
W,H,FPS=P.W,P.H,P.FPS
HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
OUT=HERE/'exam2'; OUT.mkdir(exist_ok=True)
QA=HERE/'qa-exam2'; QA.mkdir(exist_ok=True)
CFG=json.loads((HERE/'exam2-narration.json').read_text())['topics']
GOLD=P.GOLD;CYAN=P.CYAN;WHITE=P.WHITE;MUTED=P.MUTED
RNG=np.random.default_rng(807)
POINTS=RNG.random((90,4))
COLS=[(190,158,108),(102,143,164),(213,196,158),(136,163,144)]
clamp=P.clamp
def tex(im,pts,k=0):P.texture(im,pts,k,edge=(147,160,170))
def label(im,x,y,s,size=23,color=WHITE):P.text(im,x,y,s,size,color)
def box(im,x,y,w,h,k=0):P.textured_rect(im,x,y,w,h,k)
def grains(im,x,y,w,h,r=5,rounding=1,count=40):
    for i,a in enumerate(POINTS[:count]):
        xx=x+a[0]*w; yy=y+a[1]*h;rr=r*(.75+a[2]*.5)
        if rounding>.6:P.circle(im,xx,yy,rr,(225,194,130),outline=(124,96,62))
        else:P.poly(im,[(xx-rr,yy-rr),(xx+rr*.9,yy-rr*.4),(xx+rr*.5,yy+rr),(xx-rr*.8,yy+rr*.5)],(220,185,122))
def water(im,points):P.poly(im,points,(30,99,140))
def moving_grains(im,path,t,count=24):P.particles(im,path,t,.20,4,GOLD,count)
def mountain(im,x=160,y=190):tex(im,[(x-100,430),(x, y),(x+140,430)],0)

def environments(im,s,p,t):
    mountain(im)
    tex(im,[(30,430),(330,390),(645,390),(720,435),(1200,510),(1200,560),(30,560)],5)
    water(im,[(670,400),(1200,400),(1200,550),(720,480)])
    P.line(im,[(195,310),(320,368),(460,420),(660,435)],CYAN,13)
    grains(im,90,420,210,85,11,.1,30)
    if s==0:
        moving_grains(im,[(190,300),(300,367),(390,405),(620,435)],t)
        P.line(im,[(345,397),(520,401),(660,431)],(78,167,192),5)
        label(im,170,150,'Mountain slope');label(im,460,337,'Floodplain')
        P.arrow(im,(385,366),(400,395));P.arrow(im,(595,395),(565,410))
    if s>=1:
        delta=120+150*p if s==1 else 270
        tex(im,[(625,420),(625+delta,445),(655,475)],1)
        moving_grains(im,[(410,404),(615,433),(750,453)],t,16)
        for a in POINTS[:40]:
            x=770+a[0]*340;y=410+((t*13+a[1]*100)%140);P.circle(im,x,y,2+(1-a[0])*3,(204,201,169))
        label(im,660,335,'Delta grows at the river mouth')
    if s==2:
        tex(im,[(860,420),(1040,414),(1080,430),(860,443)],1)
        label(im,960,390,'Barrier');label(im,890,480,'Lagoon',20)
        moving_grains(im,[(1000,460),(1120,510),(1180,550)],t,18)
        label(im,1070,305,'Fine settling + downslope currents',19)
        for i in range(5):
            yy=420+i*22;P.line(im,[(1090,yy),(1120,yy-4*math.sin(t*2+i)),(1160,yy)],CYAN,2)

def sediment(im,s,p,t):
    if s==0:
        box(im,190,205,270,290,0)
        P.line(im,[(320,205),(300,285),(338,335),(300,420),(320,495)],(12,25,40),max(2,round(14*p)))
        for i in range(12):
            xx=480+i%4*40+90*p; yy=300+i//4*60+80*p
            P.crystal(im,xx,yy,12+(i%3)*4,(194,153,111),.4)
        P.arrow(im,(825,270),(960,360));label(im,890,215,'Minerals react with water')
        for i in range(30):P.circle(im,880+(i%6)*25,400+i//6*12,2,CYAN)
        label(im,305,160,'Physical breakup');label(im,925,510,'Clay + dissolved products',21)
    elif s==1:
        water(im,[(90,300),(1180,300),(1180,535),(90,535)])
        bed=65*clamp((p-.25)/.75)
        if bed:tex(im,[(90,535-bed),(1180,535-bed),(1180,570),(90,570)],1)
        P.arrow(im,(130,245),(1000-450*p,245));label(im,650,190,'Flow weakens → grains settle')
        for i,a in enumerate(POINTS[:60]):
            r=5+a[2]*10;progress=clamp(p*(.8+r/12));xx=130+a[0]*980
            floor=525-(15-r)*5
            yy=310+(floor-310)*progress;P.circle(im,xx,yy,r,(215,181,127))
        tex(im,[(90,535),(1180,535),(1180,570),(90,570)],1)
    else:
        height=220-90*clamp(p*2); y=445-height/2
        tex(im,[(200,y),(1050,y),(1050,445+height/2),(200,445+height/2)],1)
        for i,a in enumerate(POINTS[:65]):
            xx=230+a[0]*785; yy=y+20+a[1]*(height-40)
            P.circle(im,xx,yy,12,(203,168,113),outline=(77,74,65))
            if p>.45:P.circle(im,xx+14,yy+12,3+9*clamp((p-.45)*2),(226,220,197))
        P.arrow(im,(650,205),(650,y-7));P.arrow(im,(650,615),(650,445+height/2+10))
        label(im,350,170,'Compaction packs');label(im,920,170,'Cementation binds')

def clastic(im,s,p,t):
    if s==0:
        box(im,120,220,430,280,0);box(im,730,220,430,280,0)
        grains(im,145,244,370,224,23,.1,25)
        for i,a in enumerate(POINTS[:25]):
            x=760+a[0]*355;y=245+a[1]*230;r=23
            n=4+round(16*p);P.poly(im,[(x+math.cos(k*2*math.pi/n)*r,y+math.sin(k*2*math.pi/n)*r) for k in range(n)],(220,185,122))
        label(im,330,175,'Angular gravel → breccia');label(im,945,175,'Rounded gravel → conglomerate')
        P.arrow(im,(580,350),(700,350))
    elif s==1:
        box(im,185,230,900,280,1);grains(im,215,250,840,235,9,1,85)
        for i,a in enumerate(POINTS[:25]):
            P.crystal(im,225+a[0]*850,253+a[1]*230,8+5*p,(206,160,141),.3)
        label(im,400,170,'Sand-sized grains');label(im,910,170,'Composition refines the name')
        label(im,670,565,'Quartz sand + feldspar-rich alternatives')
    else:
        box(im,200,205,880,325,6)
        for i in range(12):
            y=230+i*23;P.line(im,[(200,y),(1080,y)],(115,126,135),3)
            for a in POINTS[:20]:P.circle(im,215+a[0]*830,y-5,1.5,(178,183,179))
        # Separation along bedding illustrates fissility rather than simply adding a text label.
        gap=40*p
        tex(im,[(700,250-gap),(1050,250-gap),(1050,270-gap),(700,270-gap)],6)
        label(im,635,170,'Fine mud → mudrock; thin splitting layers → shale')

def nonclastic(im,s,p,t):
    if s==0:
        water(im,[(120,200),(1150,200),(1150,540),(120,540)])
        tex(im,[(120,525),(1150,525),(1150,580),(120,580)],3)
        for i,a in enumerate(POINTS[:28]):
            xx=160+a[0]*920;yy=235+clamp(p*1.4+a[1])*(260-a[2]*30)
            P.crystal(im,xx,yy,8,(233,231,216),a[3]*6)
        for i in range(12):
            x=180+i*48;ht=(50+(i%4)*20)*p
            P.line(im,[(x,522),(x,522-ht)],(225,193,145),8)
            P.line(im,[(x,522-ht*.5),(x+20,522-ht*.8)],(225,193,145),6)
        label(im,660,170,'Biological carbonate accumulates')
    elif s==1:
        for i in range(5):
            x=225+i*205;y=370+math.sin(t+i)*40
            P.circle(im,x,y,12,(141,119,88))
            for ring in range(1,1+round(p*7)):
                ImageDraw.Draw(im).ellipse((x-12-ring*6,y-12-ring*6,x+12+ring*6,y+12+ring*6),outline=(229-ring*6,208-ring*5,166),width=4)
            P.arrow(im,(x-60,y-70),(x+40,y-65))
        label(im,650,170,'Moving grains acquire carbonate coatings');label(im,650,545,'Ooids grow in agitated shallow water')
    else:
        y=240+160*p;water(im,[(130,y),(580,y),(580,530),(130,530)])
        P.line(im,[(130,530),(580,530)],WHITE,4)
        for i,a in enumerate(POINTS[:28]):
            x=150+a[0]*405;yy=490-a[1]*65*p;size=9*p
            P.rect(im,(x-size,yy-size,x+size,yy+size),(227,235,235))
        for j in range(4):P.arrow(im,(200+j*90,y-10),(200+j*90,y-75))
        box(im,760,230,360,305,5);P.rect(im,(760,410+40*p,1120,445+35*p),(40,38,33))
        for k in range(15):P.line(im,[(780+k*21,455),(790+k*21,385+60*p)],(110,156,81),5)
        label(im,345,180,'Evaporation → salt crystals');label(im,945,180,'Plant preservation → coal')

def layers(im,s,p,t):
    if s==0:
        for k in range(6):
            amt=clamp(p*6-k);h=36*amt
            if h:tex(im,[(180,520-k*40),(1090,520-k*40),(1090,520-k*40-h),(180,520-k*40-h)],k%4)
        label(im,660,180,'Different deposition conditions → distinct beds')
    elif s==1:
        water(im,[(170,205),(1090,205),(1090,545),(170,545)])
        bed=96*clamp((p-.25)/.75)
        if bed:tex(im,[(170,545-bed),(1090,545-bed),(1090,570),(170,570)],1)
        for i,a in enumerate(POINTS[:80]):
            r=2+a[2]*12;speed=.5+r/11
            q=clamp(p*speed*1.7);x=200+a[0]*845;floor=535-(14-r)*7
            yy=220+(floor-220)*q;P.circle(im,x,yy,r,(220,181,124))
        label(im,650,170,'Large first; fine later → fining upward')
        P.arrow(im,(1140,520),(1140,380));label(im,1190,415,'fine',18);label(im,1190,520,'coarse',18)
    else:
        # Dune advances right; lee-side deposits slope down toward the right.
        x=350+470*p;base=520;peak=290
        outline=[(100,base),(x,peak),(x+270,base),(1160,base),(1160,575),(100,575)]
        tex(im,outline,1)
        laminae=Image.new('RGB',im.size,P.BG)
        for k in range(18):
            crest=150+k*45
            if crest<x:P.line(laminae,[(crest,290),(crest+270,520)],(137,104,66),3)
        body=Image.new('L',im.size,0);ImageDraw.Draw(body).polygon(outline,fill=255)
        ink=ImageChops.difference(laminae,Image.new('RGB',im.size,P.BG)).convert('L').point(lambda v:255 if v else 0)
        im.paste(laminae,(0,0),ImageChops.multiply(body,ink))
        moving_grains(im,[(x-280,460),(x-110,365),(x,peak),(x+170,440),(x+270,base)],t,32)
        P.arrow(im,(170,225),(500,225));label(im,850,195,'Migration + lee-side deposition')
        P.line(im,[(100,520),(1160,520)],(210,204,173),4)

def shoreline(im,s,p,t):
    if s<2:
        x=810-470*p if s==0 else 340+470*p
        tex(im,[(90,275),(1160,480),(1160,560),(90,560)],5)
        # Sea intersects the sloping surface at x; landward is left in this section.
        y=275+(x-90)/1070*205
        water(im,[(x,y),(1160,y),(1160,480)])
        P.line(im,[(x,y-8),(x,y+50)],GOLD,5)
        P.arrow(im,(x+130 if s==0 else x-130,y-80),(x,y-80))
        label(im,640,160,'Landward marine advance' if s==0 else 'Seaward coastal advance')
        label(im,210,265,'Land');label(im,1080,y-45,'Sea')
        # Facies travel with shoreline; stack a continuous upright section.
        for k in range(7):
            past=p*(1-k/6)
            dx=(810-470*past if s==0 else 340+470*past)+40;yy=505+k*7
            P.rect(im,(90,yy,dx,yy+5),(203,160,100));P.rect(im,(dx,yy,1160,yy+5),(105,136,151))
        P.line(im,[(600,497),(600,557)],WHITE,2)
        moving_grains(im,[(x-110,y-22),(x+20,y+20),(x+220,y+60)],t,16)
    else:
        for k in range(5):box(im,100,300+k*43,1090,40,k%4)
        erosion=[(x,287+math.sin(x/80)*18) for x in range(100,1191,10)]
        P.poly(im,[(100,230),(1190,230)]+list(reversed(erosion)),P.BG)
        P.line(im,erosion,GOLD,5);label(im,345,205,'An erosion surface removes part of the record',21)
        # Reservoir under a continuous arched seal; fluid rises into the trap.
        for k in range(3):
            pts=[(x,485+k*24-95*math.exp(-((x-825)/175)**2)) for x in range(590,1160,5)]
            P.line(im,pts,(81,143,165) if k==0 else (208,179,133),17)
        moving_grains(im,[(1120,544),(960,475),(825,408)],t,15)
        label(im,890,290,'Porous reservoir + seal',21)

def strength(im,s,p,t):
    # Source 08.01.b6: 0 at top, 30 km at bottom, strength rightward, maximum near transition.
    P.rect(im,(120,180,625,555),(90,159,177));P.rect(im,(120,415,625,555),(188,98,80))
    for yy in range(350,416):
        a=(yy-350)/65;c=tuple(round((1-a)*u+a*v) for u,v in zip((90,159,177),(188,98,80)))
        P.line(im,[(120,yy),(625,yy)],c,1)
    P.line(im,[(120,555),(120,180),(625,180)],WHITE,4)
    label(im,360,140,'Strength increases →',22);label(im,75,370,'Depth',20)
    label(im,93,181,'0',18);label(im,77,556,'30 km',18)
    pts=[]
    for z in np.linspace(0,30,120):
        x=120+28*z if z<=15 else 245+295*math.exp(-(z-15)/3.5)
        pts.append((x,180+z/30*375))
    P.line(im,pts,GOLD,5)
    z=3+11*p if s==1 else 15+15*p if s==2 else 3
    x=120+28*z if z<=15 else 245+295*math.exp(-(z-15)/3.5); y=180+z/30*375
    P.circle(im,x,y,10,CYAN)
    label(im,477,255,'Brittle',23);label(im,465,498,'Ductile',23)
    label(im,485,393,'Transition',17)
    if s==0:
        q=math.sin(p*math.pi);w=350-70*q;h=190+35*q
        tex(im,[(825-w/2,355-h/2),(825+w/2,355-h/2),(825+w/2,355+h/2),(825-w/2,355+h/2)],0)
        P.arrow(im,(665,350),(825-w/2-12,350));P.arrow(im,(1185,350),(825+w/2+12,350))
        label(im,925,185,'Load → recoverable strain',21);label(im,925,550,'Elastic response',22)
    elif s==1:
        box(im,780,250,335,245,0);P.line(im,[(840,250),(865,315),(890,370),(925,425),(965,495)],P.BG,max(2,round(p*18)))
        P.arrow(im,(740,370),(785,370));P.arrow(im,(1160,370),(1110,370));label(im,925,185,'Cold rock fractures',23)
    else:
        for k in range(6):
            pts=[(x,270+k*34-60*p*math.sin((x-760)/355*math.pi)) for x in range(760,1121,5)]
            P.line(im,pts,COLS[k%4],26)
        P.arrow(im,(700,370),(760,370));P.arrow(im,(1185,370),(1120,370))
        label(im,920,185,'Hot rock flows while solid',22)

def faults(im,s,p,t):
    if s==0:
        box(im,220,230,840,295,0)
        for x in [420,625,815]:P.line(im,[(x,230),(x+22,525)],P.BG,max(2,round(10*p)))
        P.line(im,[(220,370),(1060,370)],(110,161,177),18)
        label(im,640,180,'Joints: fracture without appreciable slip')
    elif s==1:
        # Plane descends right, hanging-wall block on the right; sign reverses mid-stage.
        slip=95*math.sin(p*math.pi*2)
        dx=slip*160/270
        tex(im,[(180,270),(660,270),(820,540),(180,540)],0)
        tex(im,[(660+dx,270+slip),(1120+dx,270+slip),(1120+dx,540+slip),(820+dx,540+slip)],0)
        P.line(im,[(180,380),(723,380)],(110,166,189),24)
        P.line(im,[(723+dx,380+slip),(1120+dx,380+slip)],(110,166,189),24)
        P.line(im,[(660,235),(840,570)],WHITE,4)
        P.arrow(im,(1065,235+slip),(1065,275+slip) if p<.5 else (1065,195+slip))
        label(im,365,200,'Footwall');label(im,925,200,'Hanging wall')
        label(im,650,605,'Normal: hanging wall down' if p<.5 else 'Reverse: hanging wall up',25)
    else:
        slip=100*p
        tex(im,[(170,200),(640,200),(640,525),(170,525)],5)
        tex(im,[(655,200),(1120,200),(1120,525),(655,525)],5)
        P.line(im,[(170,360-slip/2),(640,360-slip/2)],CYAN,17)
        P.line(im,[(655,360+slip/2),(1120,360+slip/2)],CYAN,17)
        P.arrow(im,(575,400),(575,275));P.arrow(im,(735,275),(735,400))
        label(im,645,155,'Map view · horizontal strike-slip offset')

def folds(im,s,p,t):
    amount=p if s==0 else 1
    for k in range(7):
        offset=70*p*(k-3)/3 if s==2 else 0
        pts=[(x,390+k*25-95*amount*math.cos((x-420-offset)/200)) for x in range(155,1120,4)]
        P.line(im,pts,COLS[k%4],21)
    P.arrow(im,(80,380),(145,380));P.arrow(im,(1200,380),(1130,380))
    if s>=1:
        hinge=420-70*p if s==2 else 420
        label(im,hinge,205,'Anticline: older core',22)
        label(im,1030,575 if s==2 else 245,'Syncline: younger core',22)
        P.arrow(im,(hinge,240),(hinge,300))
        if s==1:P.arrow(im,(1030,275),(1030,438))
    if s==2:
        P.line(im,[(420-117*p,245),(420+117*p,495)],GOLD,5)
        label(im,475,600,'Axial surface follows the shifted hinges',21)
        # An axis extends along a fold, out of the main cross section.
        # A separate side view shows plunge without drawing it inside that section.
        P.rect(im,(775,180,1180,365),(20,38,53))
        label(im,975,208,'Separate side view: fold axis',20)
        P.line(im,[(805,255),(1145,255)],MUTED,2)
        P.arrow(im,(805,255),(1145,255+75*p),CYAN,5)
        label(im,975,350,'Plunge = axis inclination',19)
    if s==0:label(im,645,170,'Shortening bends layers and their boundaries')

def fabric(im,s,p,t):
    if s<2:
        box(im,180,225,920,325,6)
        for i,a in enumerate(POINTS[:70]):
            angle=(a[3]*math.pi)*(1-p) if s==0 else 0
            x=210+a[0]*850;y=250+a[1]*265;size=10 if s==0 else 10+12*p
            P.crystal(im,x,y,size,(201,179,124),angle,.25)
        P.arrow(im,(645,195),(645,223));P.arrow(im,(645,610),(645,552))
        if s==1:
            for k in range(5):
                yy=265+k*55;P.line(im,[(185,yy),(1100,yy+10*math.sin(t+k))],(221,217,197) if k%2 else (46,52,61),round(5+20*p))
        label(im,645,170,'Rotate and grow aligned minerals' if s==0 else 'Coarse growth + compositional banding')
    else:
        box(im,150,225,440,320,1);box(im,720,225,440,320,3)
        # Expanding grains meet in a closed boundary network, rather than
        # suggesting a porous sandstone is the final quartzite or marble.
        for left,col in [(150,(211,209,190)),(720,(226,229,211))]:
            crystals=Image.new('RGB',im.size,P.BG)
            for column in range(13):
                for row in range(9):
                    x=left+column*37.5;y=225+row*43.3+(column%2)*21.65
                    r=11+14*p;shade=(column*7+row*11)%19
                    color=tuple(v-shade for v in col)
                    pts=[(x+r*math.cos(k*math.pi/3),y+r*math.sin(k*math.pi/3)) for k in range(6)]
                    ImageDraw.Draw(crystals).polygon(pts,fill=color,outline=(105,109,103),width=1)
            mask=Image.new('L',im.size,0)
            ImageDraw.Draw(mask).rectangle((left,225,left+440,545),fill=255)
            ink=ImageChops.difference(crystals,Image.new('RGB',im.size,P.BG)).convert('L').point(lambda v:255 if v else 0)
            im.paste(crystals,(0,0),ImageChops.multiply(mask,ink))
        label(im,370,170,'Quartz sandstone → quartzite',22);label(im,945,170,'Carbonate → marble',22)
        label(im,650,595,'Interlocking crystals; composition separates the two rocks')

def pt(im,s,p,t):
    if s==0:
        box(im,160,240,965,290,0)
        for i,a in enumerate(POINTS[:55]):
            x=190+a[0]*900;y=265+a[1]*235;P.crystal(im,x,y,7+13*p,COLS[2] if i%3 else (96,174,174),a[3]*6)
        label(im,650,185,'Mineral growth and reactions in a solid rock')
    elif s==1:
        P.rect(im,(180,215,1090,545),(31,60,77));P.arrow(im,(180,545),(1100,545));P.arrow(im,(180,215),(180,555))
        label(im,650,585,'Temperature →');label(im,95,375,'Pressure',21)
        paths=[[(320,310),(970,310)],[(430,330),(790,490)],[(290,285),(410,480)]]
        names=['Contact heating','Regional burial + heating','Cool subduction']
        for i,path in enumerate(paths):
            x=P.lerp(path[0][0],path[1][0],p);y=P.lerp(path[0][1],path[1][1],p)
            P.line(im,[path[0],(x,y)],[GOLD,CYAN,(180,151,215)][i],5);P.circle(im,x,y,9,[GOLD,CYAN,(180,151,215)][i])
            label(im,path[1][0],path[1][1]+(28 if i!=0 else -35),names[i],18)
        label(im,650,160,'Read pressure and temperature together')
    else:
        box(im,180,230,920,330,0)
        P.line(im,[(200,275),(480,370),(700,300),(1080,450)],(18,38,49),12)
        moving_grains(im,[(200,275),(480,370),(700,300),(1080,450)],t,40)
        for i,a in enumerate(POINTS[:60]):
            x=220+a[0]*840;y=270+a[1]*250
            P.crystal(im,x,y,10,(101,169,160) if a[0]<p else (199,179,139),a[3]*6)
        label(im,650,170,'Fluid flow adds or removes chemical components')

def history(im,s,p,t):
    if s==0:
        # Three simultaneous local tectonic processes, independent marker relations.
        for j,x in enumerate([80,495,910]):
            if j==0:
                # The hanging wall follows an inclined normal-fault plane.
                slip=45*p;dx=slip*.36
                tex(im,[(x,290),(x+125,290),(x+204,510),(x,510)],0)
                tex(im,[(x+125+dx,290+slip),(x+267+dx,290+slip),(x+267+dx,510+slip),(x+204+dx,510+slip)],0)
                P.line(im,[(x,382),(x+158,382)],CYAN,12)
                P.line(im,[(x+158+dx,382+slip),(x+267+dx,382+slip)],CYAN,12)
                P.line(im,[(x+115,262),(x+224,566)],(10,20,30),5)
                P.arrow(im,(x+80,230),(x+25,230));P.arrow(im,(x+205,230),(x+260,230))
            elif j==1:
                box(im,x,290,285,220,0)
                for k in range(5):P.line(im,[(xx,330+k*30-42*p*math.sin((xx-x)/285*math.pi)) for xx in range(x,x+286,4)],COLS[k%4],20)
                P.arrow(im,(x+15,230),(x+90,230));P.arrow(im,(x+270,230),(x+195,230))
            else:
                box(im,x,290,285,220,0)
                P.line(im,[(x+142,290),(x+142,510)],(10,20,30),7)
                P.line(im,[(x,390-40*p),(x+137,390-40*p)],CYAN,13);P.line(im,[(x+148,390+40*p),(x+285,390+40*p)],CYAN,13)
                P.arrow(im,(x+100,335),(x+100,290));P.arrow(im,(x+185,465),(x+185,510))
        label(im,230,190,'Extension');label(im,640,190,'Shortening');label(im,1060,190,'Sideways shear')
    elif s==1:
        for k in range(5):
            tex(im,[(100,275+k*40),(1170,385+k*40),(1170,422+k*40),(100,312+k*40)],k%4)
        top=[(x,260+110*(x-100)/1070+24*math.sin(x/140)*p) for x in range(100,1171,5)]
        P.poly(im,[(100,210),(1170,210)]+list(reversed(top)),P.BG);P.line(im,top,GOLD,4)
        label(im,650,170,'Erosion exposes inclined resistant beds → dip slopes')
        for a in POINTS[:35]:P.circle(im,120+a[0]*1000,240+150*a[0]+30*a[1]+35*p,3,COLS[0])
    else:
        slip=70*clamp(p*3)
        fx=lambda y:650+(y-300)*.7
        for k in range(5):
            y=300+k*42;tex(im,[(120,y),(fx(y),y),(fx(y+38),y+38),(120,y+38)],k%4)
            tex(im,[(fx(y+slip),y+slip),(1140,y+slip),(1140,y+slip+38),(fx(y+slip+38),y+slip+38)],k%4)
        P.line(im,[(fx(280),280),(fx(585),585)],(13,26,38),9)
        # Erosion truncates the offset beds before a continuous younger deposit.
        erosion=300+75*clamp((p-.35)/.18)
        if p>.35:P.rect(im,(118,260,1142,erosion),P.BG)
        h=95*clamp((p-.55)/.45)
        if h:box(im,120,375-h,1020,h,1)
        label(im,650,165,'Older beds → fault movement → younger sealing deposit')
        label(im,650,610,'Erosion truncates beds; younger sediment seals the fault',22)

SCENES=[environments,sediment,clastic,nonclastic,layers,shoreline,strength,faults,folds,fabric,pt,history]
SOURCES={
'E2T1':'Textbook 7.1–7.2 · environmental transport relationships',
'E2T2':'Textbook 7.3–7.5 · weathering, sorting, and lithification',
'E2T3':'Textbook 7.8–7.10 · gravel, sand, and mud textures',
'E2T4':'Textbook 7.6 and 7.11 · carbonate, evaporite, and organic origins',
'E2T5':'Textbook 7.7 · graded-bed settling and 07.07.b8 cross beds',
'E2T6':'Textbook 7.12–7.16 · migration, sequences, and reservoir/seal',
'E2T7':'Textbook 8.1 PDF p7 · 08.01.b6; classroom strength photograph',
'E2T8':'Textbook 8.3–8.4 · inclined wall geometry and relative motion',
'E2T9':'Textbook 8.5 · layers, limbs, hinges, and axial orientation',
'E2T10':'Textbook 8.6–8.7 · fabric, mineral growth, and protoliths',
'E2T11':'Textbook 8.8–8.9 · solid-state changes and pressure–temperature',
'E2T12':'Textbook 8.10–8.15 · tectonic motion and structural timing'}
def stamp(t):
    ms=round(t*1000);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}'
def timing(topic):
    cfg=CFG[topic];audio=HERE/'exam2-clear'/f'{topic}.mp3'
    words_file=audio.with_name(f'{topic}-words.json')
    if audio.exists():duration=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(audio)]))
    else:duration=48.0
    stages=[];total=sum(len(x[1].split()) for x in cfg['stages']);cursor=0
    words=json.loads(words_file.read_text()) if words_file.exists() else []
    boundaries=[0]
    if words:
        # Whisper timestamps are matched to authored words by sequence alignment.
        import difflib,re
        expected=[];starts=[]
        for label_,script in cfg['stages']:
            starts.append(len(expected));expected.extend(re.sub(r'[^a-z0-9]','',w.lower()) for w in script.split())
        observed=[re.sub(r'[^a-z0-9]','',w['word'].lower()) for w in words]
        mapping={}
        for b in difflib.SequenceMatcher(None,expected,observed,autojunk=False).get_matching_blocks():
            for i in range(b.size):mapping[b.a+i]=b.b+i
        for start in starts[1:]:
            key=next((k for k in range(start,min(start+7,len(expected))) if k in mapping),None)
            if key is None:raise ValueError(f'{topic}: cannot align stage at word {start}')
            boundaries.append(max(boundaries[-1]+1,words[mapping[key]]['start']-.12))
    else:
        for _,script in cfg['stages'][:-1]:cursor+=len(script.split())/total*duration;boundaries.append(cursor)
    boundaries.append(duration)
    for i,(lbl,script) in enumerate(cfg['stages']):stages.append({'label':lbl,'text':script,'start':round(boundaries[i],3),'end':round(boundaries[i+1],3)})
    return duration,stages,words
def frame(topic,t,duration,stages):
    im=Image.new('RGB',(W,H),P.BG)
    s=next((i for i,q in enumerate(stages) if t<q['end']),len(stages)-1);q=stages[s];p=clamp((t-q['start'])/(q['end']-q['start']))
    SCENES[int(topic[3:])-1](im,s,p,t)
    P.rect(im,(0,0,W,115),(7,15,28));P.text(im,40,25,f'GEOL 1001 · EXAM 2 · {topic}',17,MUTED,anchor='lm')
    P.text(im,40,62,q['label'],34,WHITE,anchor='lm',bold=True)
    P.text(im,40,93,CFG[topic]['description'],17,MUTED,anchor='lm')
    P.rect(im,(0,645,W,H),(7,15,28))
    P.text(im,36,671,SOURCES[topic],17,MUTED,anchor='lm')
    P.text(im,36,697,'Teaching reconstruction · not to scale · compare the original figures in the lesson',15,MUTED,anchor='lm')
    P.rect(im,(0,716,W*clamp(t/duration),720),CYAN)
    return im
def metadata(topic,duration,stages,words):
    # Embed timing and caption text so file:// playback does not fetch a VTT track.
    cues=[]
    for i in range(0,len(words),9):
        chunk=words[i:i+9]
        cues.append({'start':chunk[0]['start'],'end':chunk[-1]['end'],
                     'text':' '.join(w['word'].strip() for w in chunk)})
    return {'seconds':round(duration,3),'stages':stages,
            'description':CFG[topic]['description'],'source':SOURCES[topic],
            'captionTiming':'word-aligned' if words else 'estimated','cues':cues}
def build(topic,stills=False):
    duration,stages,words=timing(topic)
    # Early, middle, final and stage transitions are kept for scientific review.
    ts=sorted(set([.25,duration*.5,duration-.3]+[q['start']+.35 for q in stages]+[q['end']-.15 for q in stages]+[(q['start']+q['end'])/2 for q in stages]))
    if topic=='E2T8':ts=sorted(set(ts+[stages[1]['start']+(stages[1]['end']-stages[1]['start'])*p for p in [.25,.75]]))
    if topic=='E2T12':ts=sorted(set(ts+[stages[2]['start']+(stages[2]['end']-stages[2]['start'])*p for p in [.33,.53,.7]]))
    thumbs=[]
    for i,t in enumerate(ts):
        im=frame(topic,t,duration,stages);im.save(QA/f'{topic}-{i:02d}.png');thumb=im.resize((512,288));thumbs.append(thumb)
    contact=Image.new('RGB',(512*3,318*math.ceil(len(thumbs)/3)),(20,28,40))
    for i,im in enumerate(thumbs):contact.paste(im,(i%3*512,i//3*318));ImageDraw.Draw(contact).text((i%3*512+10,i//3*318+291),f'{topic} · {ts[i]:.2f}s',font=P.B.font(18),fill=WHITE)
    contact.save(QA/f'{topic}-contact.jpg',quality=92)
    frame(topic,duration*.36,duration,stages).save(OUT/f'{topic}.png')
    if stills:return
    audio=HERE/'exam2-clear'/f'{topic}.mp3'
    if not audio.exists():raise FileNotFoundError(f'{topic}: approved narration missing; no silent completion substitute')
    cmd=['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-i',str(audio),'-map','0:v','-map','1:a','-af','loudnorm=I=-18:TP=-1.5:LRA=7','-c:v','libx264','-preset','fast','-crf','21','-threads','2','-pix_fmt','yuv420p','-c:a','aac','-b:a','128k','-ar','48000','-ac','1','-movflags','+faststart','-t',str(duration),str(OUT/f'{topic}.new.mp4')]
    process=subprocess.Popen(cmd,stdin=subprocess.PIPE)
    for i in range(math.ceil(duration*FPS)):process.stdin.write(frame(topic,i/FPS,duration,stages).tobytes())
    process.stdin.close();result=process.wait()
    if result:raise RuntimeError(f'{topic}: FFmpeg failed {result}')
    (OUT/f'{topic}.new.mp4').replace(OUT/f'{topic}.mp4')
    cues=[]
    if words:
        for i in range(0,len(words),9):
            chunk=words[i:i+9];cues.append(f"{stamp(chunk[0]['start'])} --> {stamp(chunk[-1]['end'])}\n"+' '.join(w['word'].strip() for w in chunk))
    else:
        for s in stages:
            ws=s['text'].split()
            for i in range(0,len(ws),9):cues.append(f"{stamp(s['start']+(s['end']-s['start'])*i/len(ws))} --> {stamp(s['start']+(s['end']-s['start'])*min(i+9,len(ws))/len(ws))}\n"+' '.join(ws[i:i+9]))
    (OUT/f'{topic}.vtt').write_text('WEBVTT\n\n'+'\n\n'.join(cues)+'\n')
    (OUT/f'{topic}.txt').write_text('\n\n'.join(s['label']+'\n'+s['text'] for s in stages)+'\n')
    print(f'{topic}: {duration:.2f}s, 3 narration stages, caption timing '+('word-aligned' if words else 'estimated'),flush=True)
    return metadata(topic,duration,stages,words)
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--topic',nargs='+');ap.add_argument('--stills',action='store_true');ap.add_argument('--metadata-only',action='store_true');ap.add_argument('--workers',type=int,default=2);args=ap.parse_args();topics=args.topic or list(CFG)
    if args.metadata_only:results=[metadata(t,*timing(t)) for t in topics]
    else:
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:results=list(pool.map(lambda t:build(t,args.stills),topics))
    if not args.stills:
        f=HERE/'exam2-films.json';meta=json.loads(f.read_text()) if f.exists() else {};meta.update(dict(zip(topics,results)));f.write_text(json.dumps(meta,indent=2,ensure_ascii=False)+'\n')
        (ROOT/'js/content/exam2-films.js').write_text('(function(L){L.EXAM2_FILMS='+json.dumps(meta,ensure_ascii=False)+';})(window.L);\n')
