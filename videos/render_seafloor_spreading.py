#!/usr/bin/env python3
"""Render a source-grounded GEOL 1001 motion sample with no online services.

Science reference: Lecture 3 slides 40 and 42, as used on the Exam 1 T3 Learn page.
The drawing is original and schematic; time, distance, and layer thickness are not to scale.
"""

from __future__ import annotations

import argparse
import math
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS, DURATION = 1280, 720, 24, 24
HERE = Path(__file__).resolve().parent
FONT_DIR = Path('/System/Library/Fonts/Supplemental')
FONT_REG = FONT_DIR / 'Arial.ttf'
FONT_BOLD = FONT_DIR / 'Arial Bold.ttf'
NAVY = (5, 13, 34)
INK = (12, 24, 46)
WHITE = (238, 246, 246)
MUTED = (157, 185, 199)
NORMAL = (202, 99, 96)
REVERSED = (230, 224, 205)
CYAN = (85, 212, 225)
GOLD = (242, 184, 100)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REG), size)


FONTS = {
    'title': font(53, True), 'deck': font(26), 'eyebrow': font(19, True),
    'body': font(26), 'label': font(18, True), 'small': font(15),
    'number': font(18, True), 'end': font(66, True),
}


def clamp(x: float, a: float = 0, b: float = 1) -> float:
    return max(a, min(b, x))


def smooth(x: float) -> float:
    x = clamp(x)
    return x * x * (3 - 2 * x)


def mix(a, b, f: float):
    return tuple(round(x + (y - x) * f) for x, y in zip(a, b))


def alpha_layer(base: Image.Image, draw_fn, opacity: int = 255) -> None:
    layer = Image.new('RGBA', base.size, (0, 0, 0, 0))
    draw_fn(ImageDraw.Draw(layer, 'RGBA'))
    if opacity < 255:
        layer.putalpha(layer.getchannel('A').point(lambda a: a * opacity // 255))
    base.alpha_composite(layer)


def base_background() -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    rng = np.random.default_rng(901)
    noise = rng.normal(0, 2.0, (H, W))
    glow = np.exp(-(((xx - 640) / 450) ** 2 + ((yy - 395) / 320) ** 2))
    data = np.empty((H, W, 3), dtype=np.uint8)
    for ch, (dark, light) in enumerate(zip(NAVY, (12, 46, 70))):
        data[:, :, ch] = np.clip(dark + (light-dark) * glow + noise, 0, 255)
    return Image.fromarray(data).convert('RGBA')


BASE = base_background()
PARTICLES = [(int(x), int(y), int(r), phase) for x, y, r, phase in
             zip(np.random.default_rng(17).integers(90, 1190, 75),
                 np.random.default_rng(18).integers(245, 540, 75),
                 np.random.default_rng(19).integers(1, 3, 75),
                 np.random.default_rng(20).random(75))]


def pill(d: ImageDraw.ImageDraw, box, text, fill, outline=None, text_fill=WHITE):
    d.rounded_rectangle(box, radius=16, fill=fill, outline=outline, width=2 if outline else 1)
    x0, y0, x1, y1 = box
    bb = d.textbbox((0, 0), text, font=FONTS['label'])
    d.text(((x0+x1-(bb[2]-bb[0]))/2, (y0+y1-(bb[3]-bb[1]))/2-2),
           text, font=FONTS['label'], fill=text_fill)


def arrow(d, x1, y1, x2, y2, color, width=5, head=12):
    d.line((x1, y1, x2, y2), fill=color, width=width, joint='curve')
    angle = math.atan2(y2-y1, x2-x1)
    for delta in (-0.55, 0.55):
        d.line((x2, y2, x2-head*math.cos(angle+delta), y2-head*math.sin(angle+delta)),
               fill=color, width=width)


def map_back(x: float) -> float:
    return 640 + (x - 640) * 0.78


def top_quad(a: float, b: float):
    return [(a, 420), (b, 420), (map_back(b), 340), (map_back(a), 340)]


def draw_terrain(im: Image.Image, t: float) -> None:
    p = clamp((t - 2.1) / 15.3)
    reach = 64 + 476 * smooth(p)
    left, right = 640-reach, 640+reach

    # Thin translucent water volume and moving light traces.
    def water(d):
        d.polygon([(map_back(left), 340), (map_back(right), 340), (right, 420), (left, 420)],
                  fill=(18, 84, 111, 46))
        for j in range(7):
            yy = 279 + j * 14
            wave = 8 * math.sin(t * 0.8 + j * 0.85)
            d.arc((130, yy+wave, 1150, yy+68+wave), 191, 347,
                  fill=(81, 175, 188, max(8, 30-j*3)), width=2)
    alpha_layer(im, water)

    def block(d):
        # Oceanic basalt slab; the front face makes the layer readable in perspective.
        d.polygon([(left, 420), (right, 420), (right, 501), (left, 501)],
                  fill=(39, 68, 84, 255))
        d.polygon(top_quad(left, right), fill=(40, 84, 98, 255))
        d.line((left, 501, right, 501), fill=(91, 146, 157, 160), width=3)
        d.line((map_back(left), 340, left, 420), fill=(117, 179, 178, 100), width=3)
        d.line((map_back(right), 340, right, 420), fill=(117, 179, 178, 100), width=3)
    alpha_layer(im, block)

    # A polarity interval becomes a pair of matching bands as newly cooled basalt
    # moves from the ridge. Color follows slide 40's red / white convention.
    elapsed = max(0, t - 3.6)
    v, interval = 32.0, 2.20
    def bands(d):
        for k in range(9):
            # k identifies the interval in which the rock formed. The same
            # band keeps its color as it travels away from the ridge.
            outer = min(reach, max(0, (elapsed - k*interval) * v))
            inner = min(reach, max(0, (elapsed - (k+1)*interval) * v))
            if outer <= inner + 0.5:
                continue
            c = NORMAL if k % 2 == 0 else REVERSED
            c_top = (*mix(c, (246, 250, 244), 0.10), 245)
            c_face = (*mix(c, INK, 0.18), 255)
            for sign in (-1, 1):
                a, b = sorted((640+sign*inner, 640+sign*outer))
                d.polygon(top_quad(a, b), fill=c_top)
                d.polygon([(a, 420), (b, 420), (b, 493), (a, 493)], fill=c_face)
                d.line((a, 420, a, 493), fill=(10, 24, 41, 145), width=2)
                d.line((b, 420, b, 493), fill=(10, 24, 41, 145), width=2)
    alpha_layer(im, bands)

    # Soft upwelling glow, then a sharp ridge axis that remains fixed while
    # the two sides separate.
    def magma_glow(d):
        pulse = 0.5 + 0.5 * math.sin(t * 4.2)
        for radius, a in ((110, 12), (73, 25), (47, 58)):
            d.ellipse((640-radius, 507-radius*0.65, 640+radius, 507+radius*0.85),
                      fill=(255, 115, 54, int(a*(0.8+0.2*pulse))))
        d.polygon([(601, 530), (640, 415), (679, 530)], fill=(252, 132, 62, 160))
        d.polygon([(625, 497), (640, 413), (655, 497)], fill=(255, 200, 102, 220))
    alpha_layer(im, magma_glow)
    d = ImageDraw.Draw(im, 'RGBA')
    d.line((640, 339, 640, 419), fill=(255, 189, 119, 230), width=5)
    d.line((640, 420, 640, 498), fill=(255, 210, 146, 240), width=4)
    for side in (-1, 1):
        bob = 3*math.sin(t*2.7+side)
        arrow(d, 640+side*46, 523+bob, 640+side*(82+11*p), 523+bob,
              (*CYAN, 220), width=4, head=13)
    for i in range(18):
        rise = (t*39 + i*24) % 155
        px = 640 + math.sin(i*3.1+t*0.7) * (10+rise*0.26)
        py = 542-rise
        rr = 1+(i % 3)
        d.ellipse((px-rr, py-rr, px+rr, py+rr), fill=(255, 173, 86, int(165*(1-rise/180))))

    # Sediment is added only in the final beat; its cover thickens away from
    # the ridge while the basalt slab itself remains roughly uniform.
    reveal = smooth((t-18.3)/2.4)
    if reveal:
        def sediment(d):
            max_thick = 24*reveal
            for side in (-1, 1):
                edge = 640+side*min(reach, 480)
                mid = 640+side*min(reach*0.58, 260)
                d.polygon([(640, 418), (mid, 418-8*reveal),
                           (edge, 418-max_thick), (edge, 418), (640, 418)],
                          fill=(232, 203, 150, int(226*reveal)))
                d.line((640, 418, mid, 418-8*reveal, edge, 418-max_thick),
                       fill=(255, 229, 180, int(205*reveal)), width=2)
        alpha_layer(im, sediment)


def title_for(t):
    if t < 3.7:
        return ('01', 'A ridge makes new seafloor',
                'Magma rises. Basalt cools at the ridge axis.')
    if t < 8.1:
        return ('02', 'Basalt records polarity',
                'Magnetic minerals align as the rock cools.')
    if t < 14.8:
        return ('03', 'The field reverses',
                'New basalt records the new direction.')
    if t < 19.2:
        return ('04', 'Stripes move outward',
                'Matching bands appear on both sides of the ridge.')
    return ('05', 'Distance holds another clue',
            'Older seafloor has had more time to collect sediment.')


def draw_overlay(im: Image.Image, t: float) -> None:
    d = ImageDraw.Draw(im, 'RGBA')
    # Course/subject framing, tied to the Lab's dark visual language.
    d.rounded_rectangle((48, 38, 313, 77), radius=18, fill=(29, 67, 88, 225),
                        outline=(85, 212, 225, 110), width=1)
    d.text((65, 48), 'GEOL 1001  /  STUDY LAB', font=FONTS['eyebrow'], fill=(*CYAN, 255))
    d.text((1050, 49), 'EXAM 1   •   T3', font=FONTS['eyebrow'], fill=(*MUTED, 255))
    d.line((48, 91, 1232, 91), fill=(93, 141, 162, 75), width=2)

    num, head, sub = title_for(t)
    d.text((49, 118), num, font=FONTS['number'], fill=(*GOLD, 255))
    d.text((49, 147), head, font=FONTS['title'], fill=(*WHITE, 255))
    d.text((51, 214), sub, font=FONTS['deck'], fill=(*MUTED, 255))

    # Right-side current field indicator, then synchronized mirror evidence.
    if 4.2 <= t < 18.9:
        phase = int(max(0, t-3.6) / 2.2) % 2
        label = 'NORMAL' if phase == 0 else 'REVERSED'
        col = NORMAL if phase == 0 else REVERSED
        pill(d, (1000, 265, 1190, 306), label, (*INK, 226), (*col, 210), (*col, 255))
        d.text((998, 317), 'field polarity', font=FONTS['small'], fill=(*MUTED, 240))
    if t >= 14.0:
        a = smooth((t-14.0)/1.2)
        d.text((500, 571), 'OLDER', font=FONTS['label'], fill=(*MUTED, int(220*a)), anchor='rm')
        d.text((640, 571), 'YOUNGEST', font=FONTS['label'], fill=(*GOLD, int(230*a)), anchor='mm')
        d.text((780, 571), 'OLDER', font=FONTS['label'], fill=(*MUTED, int(220*a)), anchor='lm')
        if t >= 19.3:
            d.text((640, 600), 'SEDIMENT COVER THICKENS OUTWARD',
                   font=FONTS['label'], fill=(*REVERSED, int(220*smooth((t-19.3)/1.1))), anchor='mm')

    # Bottom rail remains constant so the sequence is easy to scan.
    d.rounded_rectangle((48, 638, 1232, 689), radius=12, fill=(10, 27, 46, 235),
                        outline=(62, 109, 129, 145), width=1)
    d.text((67, 655), 'SCHEMATIC • NOT TO SCALE', font=FONTS['small'], fill=(*MUTED, 255))
    d.text((1003, 655), 'L3 SLIDES 40 + 42', font=FONTS['small'], fill=(*MUTED, 255))
    d.rounded_rectangle((341, 659, 971, 665), radius=3, fill=(66, 104, 122, 255))
    d.rounded_rectangle((341, 659, 341+630*clamp(t/DURATION), 665), radius=3,
                        fill=(*CYAN, 255))


def render_frame(t: float) -> Image.Image:
    im = BASE.copy()
    d = ImageDraw.Draw(im, 'RGBA')
    for x, y, r, phase in PARTICLES:
        yy = (y - t*(7+phase*9)) % 310 + 260
        a = int(18 + 27*(0.5+0.5*math.sin(t*1.5+phase*7)))
        d.ellipse((x-r, yy-r, x+r, yy+r), fill=(126, 218, 213, a))
    draw_terrain(im, t)
    draw_overlay(im, t)
    return im.convert('RGB')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--still', type=float, help='Render a single frame at this second')
    ap.add_argument('--out', type=Path, default=HERE/'seafloor-spreading-sample.mp4')
    args = ap.parse_args()
    if args.still is not None:
        render_frame(args.still).save(args.out)
        print(args.out)
        return
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
           '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-c:v', 'libx264',
           '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p',
           '-movflags', '+faststart', str(args.out)]
    with subprocess.Popen(cmd, stdin=subprocess.PIPE) as proc:
        assert proc.stdin is not None
        try:
            for frame in range(FPS*DURATION):
                proc.stdin.write(render_frame(frame/FPS).tobytes())
                if frame and frame % (FPS*4) == 0:
                    print(f'Rendered {frame/FPS:.0f}/{DURATION} s', flush=True)
        finally:
            proc.stdin.close()
        if proc.wait():
            raise RuntimeError('ffmpeg failed')
    print(args.out)


if __name__ == '__main__':
    main()
