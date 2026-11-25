"""Füllt das Kartenlayout mit Wortformen und Motiven aus dem Kartenpool."""
import json
from html import escape
from pathlib import Path
from string import Template
from textwrap import wrap
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
DATA = ROOT / "src" / "game" / "data"
SVG_OUT = ASSETS / "cards" / "svg"
TEMPLATE = Template((ASSETS / "layout" / "card-template.svg").read_text(encoding="utf-8"))

TYPE_STYLE = {
    "noun": ("Nomen", "#3b82f6"),
    "verb": ("Verb", "#ef4444"),
    "modal": ("Modalverb", "#a855f7"),
    "pronoun": ("Pronomen", "#14b8a6"),
    "question": ("Fragewort", "#f59e0b"),
    "preposition": ("Präposition", "#84cc16"),
    "adjective": ("Adjektiv", "#ec4899"),
    "adverb": ("Adverb", "#818cf8"),
    "particle": ("Verbzusatz", "#f97316"),
}
RARITY = {"common": "#8796a7", "uncommon": "#2385bd", "rare": "#bd820f"}
CASES = ("Nominativ", "Akkusativ", "Dativ", "Genitiv")


def grammar(card):
    kind = card["type"]
    if kind == "noun":
        forms = card["declension"]
        rows = [("Kasus", "Singular", "Plural")]
        for name, key in zip(CASES, ("nom", "akk", "dat", "gen")):
            rows.append((name, forms[key + "_sg"], forms[key + "_pl"]))
        return "Deklination", (52, 227, 467), rows
    if kind in ("verb", "modal"):
        c = card["conjugation"]
        p = c["praesens"]
        rows = [
            (f"ich  {p['ich']}", f"wir  {p['wir']}"),
            (f"du  {p['du']}", f"ihr  {p['ihr']}"),
            (f"er/sie/es  {p['er']}", f"sie/Sie  {p['sie']}"),
            ("Infinitiv", card["word"]),
            ("Partizip I", c["partizip1"]),
            ("Partizip II", c["partizip2"]),
        ]
        if c.get("aux"):
            rows.append(("Perfekt mit", c["aux"]))
        if c.get("prefix"):
            rows.append(("Verbzusatz", c["prefix"]))
        return "Konjugation · Präsens", (52, 408), rows
    if kind == "pronoun":
        rows = [("Nominativ", "Akkusativ", "Dativ")]
        for forms in card["pronouns"].values():
            rows.append(tuple(forms.get(case, "–") for case in CASES[:3]))
        return "Personalpronomen", (52, 270, 495), rows
    if kind == "adjective":
        comparison = card["comparison"]
        return "Steigerung", (52, 350), [
            ("Grundform", card["word"]),
            ("Komparativ", comparison[0]),
            ("Superlativ", comparison[1]),
        ]
    if kind == "preposition":
        case = card["case"]
        if case == "Wechselpräposition":
            return case, (52, 350), [("Wo?", "Dativ"), ("Wohin?", "Akkusativ")]
        return "Kasus", (52,), [(case,)]
    return "Gebrauch", (52,), [(line,) for line in wrap(card["explanation"], 36)]


def render_rows(kind, columns, rows):
    table = kind in ("noun", "pronoun")
    out = []
    for i, row in enumerate(rows):
        y = 438 + i * 66
        if i % 2 == 0:
            out.append(f'<rect x="38" y="{y - 39}" width="674" height="58" rx="11" fill="#e9ede9"/>')
        for col, word in zip(columns, row):
            header = table and i == 0
            size = 25 if header else 30
            weight = "bold" if header else "normal"
            out.append(
                f'<text x="{col}" y="{y}" font-size="{size}" font-weight="{weight}" '
                f'fill="#26354b">{escape(word)}</text>'
            )
    return "".join(out)


def render_card(card):
    kind = card["type"]
    label, accent = TYPE_STYLE[kind]
    title = f'{card["gender"]} {card["word"]}' if kind == "noun" else card["word"]
    icon = (ASSETS / "icons" / card["icon"]).read_text(encoding="utf-8")
    root = ElementTree.fromstring(icon)
    icon_attrs = " ".join(
        f'{key}="{escape(value)}"' for key, value in root.attrib.items()
        if key in ("fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin")
    )
    heading, columns, rows = grammar(card)
    return TEMPLATE.substitute(
        accent=accent, kind=escape(label), title=escape(title),
        gloss=escape(card.get("translation", "")), rarity=RARITY[card["rarity"]],
        icon_attributes=icon_attrs, icon=icon[icon.index(">") + 1:icon.rindex("</svg>")],
        heading=escape(heading), rows=render_rows(kind, columns, rows),
    )


def main():
    cards = json.loads((DATA / "cards.json").read_text(encoding="utf-8"))
    ids = {card["id"] for card in cards}
    starter = json.loads((DATA / "starter_deck.json").read_text(encoding="utf-8"))
    if len(ids) != len(cards) or not ids.issuperset(starter):
        raise SystemExit("Kartendaten enthalten doppelte IDs oder unbekannte Starter-Karten.")
    SVG_OUT.mkdir(parents=True, exist_ok=True)
    for card in cards:
        (SVG_OUT / f'{card["id"]}.svg').write_text(render_card(card), encoding="utf-8")
    print(f"{len(cards)} SVG-Karten gerendert.")


if __name__ == "__main__":
    main()
