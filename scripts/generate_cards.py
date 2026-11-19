#!/usr/bin/env python3
"""SatzMeister Karten-Generator.

Liest src/game/data/cards.json und rendert pro Karte:
  - assets/cards/svg/<id>.svg   (750x1050, Layout nach assets/layout/card-template.svg)
  - assets/cards/png/<id>.png   (750x1050, via Pillow)

cairosvg ist in dieser Umgebung NICHT verfuegbar — die PNGs bekommen daher
statt des gerasterten SVG-Icons einen Icon-Platzhalter (Typ-Farbkreis mit
Wort-Initial). Die SVG-Karten enthalten das echte Icon inline.

Aufruf:  python3 scripts/generate_cards.py
"""
import json
import math
import os
import re
import textwrap

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
CARDS_JSON = os.path.join(ROOT, "src", "game", "data", "cards.json")
ICON_DIR = os.path.join(ROOT, "assets", "icons")
SVG_OUT = os.path.join(ROOT, "assets", "cards", "svg")
PNG_OUT = os.path.join(ROOT, "assets", "cards", "png")

W, H = 750, 1050
DARK = "#1f2937"
WHITE = "#ffffff"

GENDER_COLORS = {"der": "#3b82f6", "die": "#ef4444", "das": "#10b981"}
TYPE_COLORS = {
    "verb": "#8b5cf6",
    "modal": "#f59e0b",
    "pronoun": "#06b6d4",
    "question": "#ec4899",
    "preposition": "#84cc16",
    "adjective": "#f97316",
}
TYPE_LABELS = {
    "noun": "Nomen",
    "verb": "Verb",
    "modal": "Modalverb",
    "pronoun": "Pronomen",
    "question": "Fragewort",
    "preposition": "Präposition",
    "adjective": "Adjektiv",
}
RARITY_COLORS = {"common": "#9ca3af", "uncommon": "#c0c0c0", "rare": "#ffd700"}

# Steigerungsformen der A1-Adjektive (Lernmaterial, daher explizit gepflegt)
COMPARISON = {
    "hoch": ("höher", "am höchsten"),
    "groß": ("größer", "am größten"),
    "klein": ("kleiner", "am kleinsten"),
    "schön": ("schöner", "am schönsten"),
    "neu": ("neuer", "am neuesten"),
    "alt": ("älter", "am ältesten"),
}

PERSON_ORDER = ["ich", "du", "er", "wir", "ihr", "sie"]
CASE_ROWS = [("Nom.", "nom_sg", "nom_pl"), ("Akk.", "akk_sg", "akk_pl"),
             ("Dat.", "dat_sg", "dat_pl"), ("Gen.", "gen_sg", "gen_pl")]

FONT_CANDIDATES = [
    ("/Users/richard/Library/Application Support/kimi-desktop/daimon-share/"
     "daimon/runtime/python/.venv/lib/python3.12/site-packages/matplotlib/"
     "mpl-data/fonts/ttf/DejaVuSans.ttf"),
    ("/Users/richard/Library/Application Support/kimi-desktop/daimon-share/"
     "daimon/runtime/python/.venv/lib/python3.12/site-packages/matplotlib/"
     "mpl-data/fonts/ttf/DejaVuSans-Bold.ttf"),
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
]


def find_font(bold: bool) -> str:
    names = []
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            names.append(p)
    for p in names:
        base = os.path.basename(p).lower()
        if bold and ("bold" in base):
            return p
        if not bold and ("bold" not in base) and base.endswith(".ttf"):
            return p
    return names[0]


FONT_REG = find_font(bold=False)
FONT_BOLD = find_font(bold=True)


def card_color(card: dict) -> str:
    if card["type"] == "noun":
        return GENDER_COLORS[card["gender"]]
    return TYPE_COLORS[card["type"]]


def display_word(card: dict) -> str:
    if card["type"] == "noun":
        return f'{card["gender"]} {card["word"]}'
    return card["word"]


def text_rows(card: dict):
    """Liefert (headline, zeilen) fuer den Textbereich.

    Zeilen sind entweder Strings (eine Spalte) oder Tupel (zwei Spalten).
    """
    t = card["type"]
    if t == "noun":
        d = card["declension"]
        rows = [("Singular", "Plural")]
        for label, sg, pl in CASE_ROWS:
            rows.append((f"{label}  {d[sg]}", d[pl]))
        return "Deklination (bestimmter Artikel)", rows
    if t in ("verb", "modal"):
        c = card["conjugation"]
        p = c["praesens"]
        rows = [(f"ich {p['ich']}", f"wir {p['wir']}"),
                (f"du {p['du']}", f"ihr {p['ihr']}"),
                (f"er/sie/es {p['er']}", f"sie {p['sie']}"),
                "",
                f"Partizip I:  {c['partizip1']}",
                f"Partizip II:  {c['partizip2']}   ·   Perfekt mit:  {c.get('aux', 'haben')}"]
        if card.get("canBeAuxiliary"):
            rows.append("kann Hilfsverb sein")
        return "Konjugation (Präsens)", rows
    if t == "question":
        lines = textwrap.wrap(card["explanation"], width=44)
        return "Bedeutung", lines
    if t == "preposition":
        if card["case"] == "Wechselpräposition":
            rows = ["Wechselpräposition", "",
                    "Wo?    → Dativ",
                    "Wohin? → Akkusativ"]
        else:
            rows = [f"Kasus: {card['case']}", "",
                    f"immer mit {card['case']}"]
        return "Kasus", rows
    if t == "adjective":
        comp = COMPARISON.get(card["word"])
        rows = []
        if comp:
            rows = [f"Positiv:      {card['word']}",
                    f"Komparativ:   {comp[0]}",
                    f"Superlativ:   {comp[1]}"]
        return "Steigerung", rows
    if t == "pronoun":
        return "Formen", [" · ".join(card["forms"])]
    return "", []


def load_icon_inner(icon_name: str) -> str:
    """Extrahiert Inhalt und Root-Attribute einer Icon-SVG.

    Die Praesentations-Attribute des aeusseren <svg>-Tags (fill, stroke,
    stroke-width, stroke-linecap, stroke-linejoin) muessen erhalten bleiben,
    sonst rendern <line>/<path>-Elemente ohne eigenen stroke nicht."""
    path = os.path.join(ICON_DIR, icon_name)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.index(">") + 1
    end = content.rindex("</svg>")
    inner = content[start:end]
    root_tag = content[:start]
    attrs = []
    for attr in ("fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"):
        m = re.search(rf'{attr}="([^"]*)"', root_tag)
        if m:
            attrs.append(f'{attr}="{m.group(1)}"')
    return inner, " ".join(attrs)


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


FONT_STACK = "DejaVu Sans, Helvetica, Arial, sans-serif"


def render_svg(card: dict) -> str:
    color = card["color"]
    rarity = RARITY_COLORS[card["rarity"]]
    label = TYPE_LABELS[card["type"]]
    icon_inner, icon_attrs = load_icon_inner(card["icon"])
    headline, rows = text_rows(card)

    parts = []
    parts.append('<?xml version="1.0" encoding="UTF-8"?>')
    parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
                 f'width="{W}" height="{H}">')
    parts.append(f'<!-- SatzMeister-Karte: {esc(card["id"])} ({esc(card["word"])}) -->')
    # Rahmen + Hintergrund
    parts.append(f'<g id="card-frame"><rect x="5" y="5" width="740" height="1040" '
                 f'rx="36" ry="36" fill="{WHITE}" stroke="{DARK}" stroke-width="10"/></g>')
    parts.append(f'<g id="background"><rect x="22" y="22" width="706" height="1006" '
                 f'rx="26" ry="26" fill="{color}"/>'
                 f'<path d="M22 300 L728 22 L728 200 L22 480 Z" fill="#ffffff" opacity="0.08"/></g>')
    # Namensbanner
    parts.append(f'<g id="name-banner"><rect x="45" y="45" width="660" height="100" '
                 f'rx="20" ry="20" fill="{WHITE}" stroke="{DARK}" stroke-width="6"/>'
                 f'<text x="375" y="112" text-anchor="middle" font-family="{FONT_STACK}" '
                 f'font-size="52" font-weight="bold" fill="{DARK}">{esc(display_word(card))}</text></g>')
    # Seltenheits-Stern
    parts.append(f'<g id="rarity-star"><circle cx="672" cy="62" r="34" fill="{rarity}" '
                 f'stroke="{DARK}" stroke-width="5"/>'
                 f'<path d="M672 40 L679 55 L695 56 L682 66 L686 82 L672 73 L658 82 '
                 f'L662 66 L649 56 L665 55 Z" fill="#ffffff" stroke="{DARK}" '
                 f'stroke-width="3" stroke-linejoin="round"/></g>')
    # Typ-Badge
    bw = 40 + len(label) * 16
    parts.append(f'<g id="type-badge"><rect x="45" y="165" width="{bw}" height="46" '
                 f'rx="23" ry="23" fill="{DARK}"/>'
                 f'<text x="{45 + bw // 2}" y="196" text-anchor="middle" '
                 f'font-family="{FONT_STACK}" font-size="26" font-weight="bold" '
                 f'fill="#ffffff">{esc(label)}</text></g>')
    # Icon-Flaeche mit inline eingebettetem Icon
    parts.append(f'<g id="icon-area"><rect x="195" y="235" width="360" height="360" '
                 f'rx="28" ry="28" fill="{WHITE}" stroke="{DARK}" stroke-width="6"/>'
                 f'<g id="icon" transform="translate(225 265) scale(1.5)" {icon_attrs}>{icon_inner}</g></g>')
    # Textbereich
    lines = [f'<g id="text-area"><rect x="45" y="625" width="660" height="360" rx="24" '
             f'ry="24" fill="{WHITE}" stroke="{DARK}" stroke-width="6"/>']
    lines.append(f'<text x="75" y="678" font-family="{FONT_STACK}" font-size="24" '
                 f'font-weight="bold" fill="{color}">{esc(headline)}</text>')
    y = 725
    for row in rows:
        if row == "":
            y += 18
            continue
        if isinstance(row, tuple):
            left = row[0]
            right = row[1] if len(row) > 1 else ""
            lines.append(f'<text x="75" y="{y}" font-family="{FONT_STACK}" font-size="30" '
                         f'fill="{DARK}">{esc(left)}</text>')
            if right:
                lines.append(f'<text x="400" y="{y}" font-family="{FONT_STACK}" '
                             f'font-size="30" fill="{DARK}">{esc(right)}</text>')
        else:
            lines.append(f'<text x="75" y="{y}" font-family="{FONT_STACK}" font-size="28" '
                         f'fill="{DARK}">{esc(row)}</text>')
        y += 45
    lines.append('</g>')
    parts.append("".join(lines))
    # Fusszeile
    parts.append(f'<g id="footer-strip"><text x="375" y="1012" text-anchor="middle" '
                 f'font-family="{FONT_STACK}" font-size="20" fill="#ffffff" '
                 f'opacity="0.9">SatzMeister · {esc(card["id"])}</text></g>')
    parts.append('</svg>')
    return "\n".join(parts) + "\n"


def star_points(cx, cy, r_outer, r_inner, n=5):
    pts = []
    for i in range(2 * n):
        r = r_outer if i % 2 == 0 else r_inner
        a = math.pi / 2 + i * math.pi / n
        pts.append((cx + r * math.cos(a), cy - r * math.sin(a)))
    return pts


def hex_rgb(h: str):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lighten(h: str, factor=0.82):
    r, g, b = hex_rgb(h)
    return tuple(int(c + (255 - c) * factor) for c in (r, g, b))


def render_png(card: dict, path: str):
    color = card["color"]
    img = Image.new("RGB", (W, H), WHITE)
    dr = ImageDraw.Draw(img)

    f_banner = ImageFont.truetype(FONT_BOLD, 52)
    f_badge = ImageFont.truetype(FONT_BOLD, 26)
    f_head = ImageFont.truetype(FONT_BOLD, 24)
    f_text = ImageFont.truetype(FONT_REG, 30)
    f_text_s = ImageFont.truetype(FONT_REG, 28)
    f_foot = ImageFont.truetype(FONT_REG, 20)
    f_init = ImageFont.truetype(FONT_BOLD, 150)

    # Rahmen + Hintergrund
    dr.rounded_rectangle([5, 5, 744, 1044], radius=36, fill=WHITE,
                         outline=hex_rgb(DARK), width=10)
    dr.rounded_rectangle([22, 22, 727, 1027], radius=26, fill=hex_rgb(color))

    # Namensbanner
    dr.rounded_rectangle([45, 45, 705, 145], radius=20, fill=WHITE,
                         outline=hex_rgb(DARK), width=6)
    word = display_word(card)
    tw = dr.textbbox((0, 0), word, font=f_banner)[2]
    dr.text(((W - tw) / 2, 78), word, font=f_banner, fill=hex_rgb(DARK))

    # Seltenheits-Stern
    dr.ellipse([638, 28, 706, 96], fill=hex_rgb(RARITY_COLORS[card["rarity"]]),
               outline=hex_rgb(DARK), width=5)
    dr.polygon(star_points(672, 62, 22, 9), fill=WHITE, outline=hex_rgb(DARK))

    # Typ-Badge
    label = TYPE_LABELS[card["type"]]
    bw = 40 + len(label) * 16
    dr.rounded_rectangle([45, 165, 45 + bw, 211], radius=23, fill=hex_rgb(DARK))
    lw = dr.textbbox((0, 0), label, font=f_badge)[2]
    dr.text((45 + (bw - lw) / 2, 173), label, font=f_badge, fill=WHITE)

    # Icon-Flaeche + Platzhalter (cairosvg nicht verfuegbar)
    dr.rounded_rectangle([195, 235, 555, 595], radius=28, fill=WHITE,
                         outline=hex_rgb(DARK), width=6)
    cx, cy, r = 375, 415, 118
    dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill=lighten(color),
               outline=hex_rgb(DARK), width=8)
    initial = card["word"][0].upper()
    bb = dr.textbbox((0, 0), initial, font=f_init)
    dr.text((cx - (bb[2] - bb[0]) / 2 - bb[0], cy - (bb[3] - bb[1]) / 2 - bb[1]),
            initial, font=f_init, fill=hex_rgb(DARK))

    # Textbereich
    dr.rounded_rectangle([45, 625, 705, 985], radius=24, fill=WHITE,
                         outline=hex_rgb(DARK), width=6)
    headline, rows = text_rows(card)
    dr.text((75, 648), headline, font=f_head, fill=hex_rgb(color))
    y = 695
    for row in rows:
        if row == "":
            y += 18
            continue
        if isinstance(row, tuple):
            dr.text((75, y), row[0], font=f_text, fill=hex_rgb(DARK))
            if len(row) > 1 and row[1]:
                dr.text((400, y), row[1], font=f_text, fill=hex_rgb(DARK))
        else:
            dr.text((75, y), row, font=f_text_s, fill=hex_rgb(DARK))
        y += 45

    # Fusszeile
    foot = f'SatzMeister · {card["id"]}'
    fw = dr.textbbox((0, 0), foot, font=f_foot)[2]
    dr.text(((W - fw) / 2, 995), foot, font=f_foot, fill=WHITE)

    img.save(path, "PNG")


def main():
    with open(CARDS_JSON, "r", encoding="utf-8") as f:
        cards = json.load(f)
    os.makedirs(SVG_OUT, exist_ok=True)
    os.makedirs(PNG_OUT, exist_ok=True)

    for card in cards:
        card["color"] = card_color(card)

    # Konsistenz-Checks
    missing_icons = [c["id"] for c in cards
                     if not os.path.exists(os.path.join(ICON_DIR, c["icon"]))]
    if missing_icons:
        raise SystemExit(f"Fehlende Icons: {missing_icons}")
    starter_path = os.path.join(ROOT, "src", "game", "data", "starter_deck.json")
    if os.path.exists(starter_path):
        with open(starter_path, "r", encoding="utf-8") as f:
            starter = json.load(f)
        pool_ids = {c["id"] for c in cards}
        unknown = [i for i in starter if i not in pool_ids]
        if unknown:
            raise SystemExit(f"Starter-Deck-IDs nicht im Pool: {unknown}")

    for card in cards:
        svg = render_svg(card)
        with open(os.path.join(SVG_OUT, f'{card["id"]}.svg'), "w", encoding="utf-8") as f:
            f.write(svg)
        render_png(card, os.path.join(PNG_OUT, f'{card["id"]}.png'))

    print(f"{len(cards)} Karten gerendert:")
    print(f"  SVG -> {SVG_OUT}")
    print(f"  PNG -> {PNG_OUT}")
    print(f"  Fonts: {os.path.basename(FONT_REG)} / {os.path.basename(FONT_BOLD)}")


if __name__ == "__main__":
    main()
