"""Builds public/images/products/wallpapers-all-agents.webp (4:5) and its thumbnail from the agent portraits in Images/agents.

Run from the repo root:  python scripts/make-agents-image.py
Needs Pillow (pip install pillow). The portraits are the official full-body agent art for all 29 playable agents (see Images/agents/README.txt).

Layout: four rows, back to front, each agent cut to head and torso with the lower edge faded out, heads lined up in each row and
the middle agents drawn last so they sit on top. It tries 40 arrangements and keeps the one where the least-covered face is the most visible,
so every agent stays recognisable.
"""
import glob, os, random
from PIL import Image, ImageEnhance, ImageDraw, ImageFilter, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "Images", "agents")
OUT = os.path.join(ROOT, "public", "images", "products")
W, H = 1280, 1600
# (agents in the row, bust height, brightness, top edge)
ROWS = [(7, 430, 0.55, 40), (7, 500, 0.70, 380), (7, 580, 0.86, 740), (8, 680, 1.0, 1120)]
ALL = sorted(glob.glob(os.path.join(SRC, "*.png")))
assert len(ALL) == 29, "expected 29 portraits in Images/agents, found %d" % len(ALL)
CACHE = {}


def raw_bust(f, share=0.62):
    if f in CACHE:
        return CACHE[f]
    im = Image.open(f).convert("RGBA")
    im = im.crop(im.getchannel("A").getbbox())
    im = im.crop((0, 0, im.width, int(im.height * share)))
    al = im.getchannel("A")
    strip = al.crop((0, 0, al.width, max(8, int(al.height * 0.22)))).resize((al.width, 1), Image.BOX)
    cols = list(strip.getdata())
    tot = sum(cols)
    hx = sum(i * c for i, c in enumerate(cols)) / tot if tot else im.width / 2   # x of the head
    k = int(al.height * 0.30)
    grad = Image.new("L", (1, al.height), 255)
    for y in range(al.height - k, al.height):
        grad.putpixel((0, y), int(255 * ((1 - (y - (al.height - k)) / k) ** 1.4)))
    CACHE[f] = (im, ImageChops.multiply(al, grad.resize((al.width, al.height))), hx)
    return CACHE[f]


def plan(seed):
    rnd = random.Random(seed)
    files = ALL[:]
    rnd.shuffle(files)
    items, idx = [], 0
    for ri, (n, bh, dim, top) in enumerate(ROWS):
        row = []
        for i, f in enumerate(files[idx: idx + n]):
            im, _, hx = raw_bust(f)
            s = bh / im.height
            slot = W * (i + 0.5) / n + rnd.randint(-12, 12)
            row.append(dict(f=f, s=s, w=max(1, round(im.width * s)), bh=bh, dim=dim, top=top, x=int(slot - hx * s), slot=slot))
        idx += n
        row.sort(key=lambda d: -abs(d["slot"] - W / 2))       # centre agents last, so they sit on top
        items += row
    return items


def alpha_of(d):
    a = raw_bust(d["f"])[1].resize((d["w"], d["bh"]), Image.LANCZOS)
    full = Image.new("L", (W, H), 0)
    full.paste(a, (d["x"], d["top"]))
    return full


def head_visibility(items):
    """Share of each agent's head (top 24% of the bust) that no agent drawn later covers."""
    cover = Image.new("L", (W, H), 0)
    vis = {}
    for d in reversed(items):
        full = alpha_of(d)
        box = (0, d["top"], W, min(H, d["top"] + int(d["bh"] * 0.24)))
        head, hc = full.crop(box), cover.crop(box)
        hsum = sum(head.getdata())
        free = ImageChops.multiply(head, ImageChops.invert(hc))
        vis[os.path.basename(d["f"])[:-4]] = (sum(free.getdata()) / hsum) if hsum else 0
        cover = ImageChops.lighter(cover, full)
    return vis


def main():
    best = None
    for seed in range(1, 41):
        v = head_visibility(plan(seed))
        score = (min(v.values()), sum(v.values()) / len(v))
        if best is None or score > best[0]:
            best = (score, seed)
    items = plan(best[1])
    # near-black page colour with a soft red glow behind the crowd, to match the Path to Immortal poster
    base = Image.new("RGB", (W, H), (9, 9, 12))
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(glow).ellipse((60, 300, W - 60, H + 300), fill=(165, 22, 38))
    canvas = Image.blend(base, glow.filter(ImageFilter.GaussianBlur(210)), 0.55).convert("RGBA")
    for d in items:
        im, faded, _ = raw_bust(d["f"])
        r = im.resize((d["w"], d["bh"]), Image.LANCZOS)
        rgb = ImageEnhance.Brightness(r.convert("RGB")).enhance(d["dim"])
        r = Image.merge("RGBA", (*rgb.split(), faded.resize((d["w"], d["bh"]), Image.LANCZOS)))
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        layer.paste(r, (d["x"], d["top"]), r)
        canvas = Image.alpha_composite(canvas, layer)
    vg = Image.new("L", (W, H), 0)
    ImageDraw.Draw(vg).ellipse((-200, -220, W + 200, H + 220), fill=255)
    out = Image.composite(canvas.convert("RGB"), Image.new("RGB", (W, H), (6, 6, 8)), vg.filter(ImageFilter.GaussianBlur(140)))
    out.save(os.path.join(OUT, "wallpapers-all-agents.webp"), "WEBP", quality=88, method=6)
    out.resize((W // 2, H // 2), Image.LANCZOS).save(os.path.join(OUT, "wallpapers-all-agents-thumb.webp"), "WEBP", quality=85, method=6)
    v = head_visibility(items)
    low = sorted(v.items(), key=lambda x: x[1])[:5]
    print("arrangement %d: %d agents, worst face %.0f%% visible, average %.0f%%" % (best[1], len(v), min(v.values()) * 100, sum(v.values()) / len(v) * 100))
    print("least visible:", ", ".join("%s %.0f%%" % (k, x * 100) for k, x in low))


if __name__ == "__main__":
    main()
