"""Renders the raster brand images into site/static/assets/img/ (run after editing the design).

    uv run --with playwright python site/tools/render-images.py

Outputs og-tridan.png (1200x630), logo-512.png (512x512) and apple-touch-icon.png (180x180).
Fonts come from site/static/assets/fonts so the images match the site.
"""
import pathlib
import tempfile
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "static" / "assets" / "img"
FONTS = (ROOT / "static" / "assets" / "fonts").as_uri()

MARK = """<svg viewBox="0 0 32 32" width="{s}" height="{s}"><rect x="1.5" y="1.5" width="29" height="29" rx="8" fill="#0b1220" stroke="#22d3ee" stroke-width="2"/><path d="M9 10.5h14M16 10.5V23" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round"/><path d="M18 22l3.5-5 3.5 5z" fill="#22d3ee"/></svg>"""

BASE = f"""<style>
@font-face{{font-family:SG;src:url({FONTS}/space-grotesk-latin-wght-normal.woff2)}}
@font-face{{font-family:SG;src:url({FONTS}/space-grotesk-latin-ext-wght-normal.woff2);unicode-range:U+0100-02AF}}
@font-face{{font-family:DM;src:url({FONTS}/dm-sans-latin-wght-normal.woff2)}}
@font-face{{font-family:DM;src:url({FONTS}/dm-sans-latin-ext-wght-normal.woff2);unicode-range:U+0100-02AF}}
html,body{{margin:0}}</style>"""

OG = BASE + f"""<div style="width:1200px;height:630px;box-sizing:border-box;padding:72px 80px;color:#f1f5f9;
background:radial-gradient(900px 500px at 95% -10%,rgba(34,211,238,.28),transparent 60%),#070b14;font-family:DM;display:flex;flex-direction:column;justify-content:space-between">
<div style="display:flex;align-items:center;gap:18px;font:800 34px SG;letter-spacing:.16em">{MARK.format(s=64)}TRIDAN</div>
<div><div style="font:700 66px/1.08 SG;letter-spacing:-.01em;max-width:1060px">Razvoj softvera po meri<br><span style="color:#22d3ee">Custom software development</span></div>
<div style="margin-top:26px;font-size:28px;color:#cbd5e1">Web aplikacije · Integracije i API · DevOps i cloud · AI integracije</div></div>
<div style="font-size:24px;color:#94a3b8">tridan.rs · Beograd, Srbija</div></div>"""

LOGO = BASE + f"""<div style="width:512px;height:512px;display:grid;place-items:center;background:#0b1220">{MARK.format(s=420)}</div>"""
TOUCH = BASE + f"""<div style="width:180px;height:180px;display:grid;place-items:center;background:#0b1220">{MARK.format(s=150)}</div>"""

with sync_playwright() as p:
    b = p.chromium.launch()
    for name, html, w, h in [("og-tridan.png", OG, 1200, 630), ("logo-512.png", LOGO, 512, 512), ("apple-touch-icon.png", TOUCH, 180, 180)]:
        pg = b.new_page(viewport={"width": w, "height": h})
        # file:// page so the file:// fonts are allowed to load
        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as tmp:
            tmp.write("<meta charset=utf-8>" + html)
        pg.goto(pathlib.Path(tmp.name).as_uri())
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(300)
        pg.screenshot(path=str(OUT / name))
        print("wrote", OUT / name)
    b.close()
