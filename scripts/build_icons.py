#!/usr/bin/env python3
"""Erzeugt alle Karten-Icons als handgeschriebene, flache SVGs in assets/icons/.

Stil: viewBox 0 0 200 200, dunkler Strich #1f2937, runde Strich-Enden,
2-3 Farben pro Icon. Keine externen Bilder, keine Emojis.
"""
import os

STROKE = "#1f2937"

HEADER = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" '
    'fill="none" stroke="{s}" stroke-width="8" stroke-linecap="round" '
    'stroke-linejoin="round">'
).format(s=STROKE)
FOOTER = "</svg>"

ICONS = {
    # ---------------- Nomen ----------------
    "tisch": """
<rect x="28" y="66" width="144" height="18" rx="6" fill="#d97706"/>
<line x1="48" y1="84" x2="48" y2="162"/>
<line x1="152" y1="84" x2="152" y2="162"/>
<line x1="48" y1="130" x2="152" y2="130" stroke-width="6"/>
""",
    "stuhl": """
<line x1="58" y1="38" x2="58" y2="104"/>
<rect x="58" y="96" width="84" height="16" rx="6" fill="#d97706"/>
<line x1="68" y1="112" x2="68" y2="166"/>
<line x1="132" y1="112" x2="132" y2="166"/>
<line x1="58" y1="58" x2="86" y2="58" stroke-width="6"/>
<line x1="58" y1="78" x2="86" y2="78" stroke-width="6"/>
""",
    "buch": """
<path d="M100 62 C82 48 52 46 36 56 L36 146 C52 136 82 138 100 152 C118 138 148 136 164 146 L164 56 C148 46 118 48 100 62 Z" fill="#ffffff"/>
<line x1="100" y1="62" x2="100" y2="152"/>
<line x1="50" y1="76" x2="86" y2="82" stroke-width="5"/>
<line x1="50" y1="96" x2="86" y2="102" stroke-width="5"/>
<line x1="114" y1="82" x2="150" y2="76" stroke-width="5"/>
<line x1="114" y1="102" x2="150" y2="96" stroke-width="5"/>
""",
    "haus": """
<path d="M36 104 L100 44 L164 104 Z" fill="#ef4444"/>
<rect x="54" y="104" width="92" height="62" fill="#fde68a"/>
<rect x="88" y="126" width="24" height="40" fill="#b45309"/>
""",
    "frau": """
<circle cx="100" cy="52" r="22" fill="#fcd34d"/>
<path d="M100 80 L68 166 L132 166 Z" fill="#ef4444"/>
<line x1="100" y1="80" x2="100" y2="104" stroke-width="6"/>
""",
    "mann": """
<circle cx="100" cy="52" r="22" fill="#fcd34d"/>
<rect x="72" y="82" width="56" height="84" rx="14" fill="#3b82f6"/>
""",
    "kind": """
<circle cx="100" cy="72" r="18" fill="#fcd34d"/>
<rect x="78" y="96" width="44" height="64" rx="12" fill="#10b981"/>
""",
    "wasser": """
<path d="M100 28 C100 28 54 94 54 126 A46 46 0 0 0 146 126 C146 94 100 28 100 28 Z" fill="#60a5fa"/>
<path d="M78 130 A26 26 0 0 0 100 150" stroke="#ffffff" stroke-width="7"/>
""",
    "apfel": """
<path d="M100 72 C80 52 46 64 46 106 C46 146 76 172 100 162 C124 172 154 146 154 106 C154 64 120 52 100 72 Z" fill="#ef4444"/>
<line x1="100" y1="72" x2="102" y2="46"/>
<path d="M102 52 C112 36 132 34 142 40 C136 56 116 62 102 52 Z" fill="#10b981"/>
""",
    "lampe": """
<line x1="100" y1="24" x2="100" y2="58"/>
<path d="M68 112 L100 58 L132 112 Z" fill="#f59e0b"/>
<circle cx="100" cy="128" r="13" fill="#fde047"/>
<line x1="60" y1="152" x2="52" y2="164" stroke-width="6"/>
<line x1="100" y1="156" x2="100" y2="170" stroke-width="6"/>
<line x1="140" y1="152" x2="148" y2="164" stroke-width="6"/>
""",
    "schule": """
<rect x="42" y="84" width="116" height="82" fill="#fbbf24"/>
<path d="M42 84 L100 44 L158 84 Z" fill="#ef4444"/>
<line x1="100" y1="44" x2="100" y2="26"/>
<path d="M100 26 L124 33 L100 40 Z" fill="#ef4444"/>
<rect x="60" y="100" width="18" height="18" fill="#ffffff" stroke-width="5"/>
<rect x="122" y="100" width="18" height="18" fill="#ffffff" stroke-width="5"/>
<rect x="88" y="128" width="24" height="38" fill="#b45309"/>
""",
    "freund": """
<circle cx="68" cy="60" r="17" fill="#fcd34d"/>
<circle cx="132" cy="60" r="17" fill="#fcd34d"/>
<rect x="44" y="84" width="48" height="72" rx="12" fill="#3b82f6"/>
<rect x="108" y="84" width="48" height="72" rx="12" fill="#10b981"/>
""",
    # ---------------- Verben ----------------
    "sein": """
<circle cx="100" cy="100" r="66" fill="#dcfce7"/>
<path d="M68 102 L92 128 L136 76" stroke="#10b981" stroke-width="14"/>
""",
    "haben": """
<circle cx="100" cy="78" r="24" fill="#ef4444"/>
<path d="M58 96 L58 122 A42 42 0 0 0 142 122 L142 96" fill="#fcd34d"/>
<line x1="58" y1="96" x2="58" y2="80"/>
<line x1="142" y1="96" x2="142" y2="80"/>
""",
    "heissen": """
<rect x="44" y="62" width="112" height="80" rx="14" fill="#ffffff"/>
<circle cx="100" cy="90" r="13" fill="#3b82f6"/>
<line x1="66" y1="120" x2="134" y2="120"/>
<line x1="44" y1="62" x2="30" y2="46" stroke-width="6"/>
<circle cx="28" cy="44" r="5" fill="#1f2937"/>
""",
    "kommen": """
<circle cx="142" cy="100" r="16" fill="#10b981"/>
<line x1="32" y1="100" x2="112" y2="100"/>
<polyline points="88,76 114,100 88,124"/>
""",
    "gehen": """
<line x1="40" y1="100" x2="150" y2="100"/>
<polyline points="122,74 152,100 122,126"/>
<line x1="52" y1="150" x2="78" y2="150" stroke-width="6"/>
<line x1="98" y1="150" x2="124" y2="150" stroke-width="6"/>
""",
    "machen": """
<rect x="64" y="42" width="80" height="34" rx="8" fill="#9ca3af"/>
<line x1="104" y1="76" x2="104" y2="164" stroke="#b45309" stroke-width="12"/>
""",
    "spielen": """
<circle cx="100" cy="100" r="64" fill="#ffffff"/>
<path d="M86 74 L132 100 L86 126 Z" fill="#ef4444"/>
""",
    "lernen": """
<path d="M92 76 C78 64 54 62 42 70 L42 134 C54 126 78 128 92 140 C106 128 130 126 142 134 L142 70 C130 62 106 64 92 76 Z" fill="#ffffff"/>
<line x1="92" y1="76" x2="92" y2="140"/>
<line x1="128" y1="52" x2="164" y2="88" stroke="#f59e0b" stroke-width="12"/>
<path d="M164 88 L170 100 L156 96 Z" fill="#1f2937" stroke-width="4"/>
""",
    "wohnen": """
<path d="M36 104 L100 44 L164 104 Z" fill="#8b5cf6"/>
<rect x="54" y="104" width="92" height="62" fill="#ede9fe"/>
<path d="M100 152 C78 134 78 114 92 112 C97 111 100 116 100 120 C100 116 103 111 108 112 C122 114 122 134 100 152 Z" fill="#ef4444" stroke-width="5"/>
""",
    "essen": """
<path d="M100 70 C80 52 46 64 46 106 C46 146 76 172 100 162 C124 172 154 146 154 106 C154 64 120 52 100 70 Z" fill="#ef4444"/>
<circle cx="146" cy="76" r="17" fill="#ffffff"/>
<line x1="100" y1="70" x2="102" y2="48"/>
""",
    # ---------------- Modalverben ----------------
    "koennen": """
<path d="M114 26 L62 108 L98 108 L84 174 L140 88 L104 88 Z" fill="#f59e0b"/>
""",
    "muessen": """
<circle cx="100" cy="100" r="68" fill="#fef3c7"/>
<line x1="100" y1="52" x2="100" y2="116" stroke="#ef4444" stroke-width="16"/>
<circle cx="100" cy="146" r="10" fill="#ef4444" stroke="none"/>
""",
    "wollen": """
<path d="M100 162 C42 112 40 58 76 50 C91 47 100 59 100 72 C100 59 109 47 124 50 C160 58 158 112 100 162 Z" fill="#ef4444"/>
""",
    # ---------------- Pronomen ----------------
    "ich": """
<circle cx="100" cy="62" r="24" fill="#fcd34d"/>
<path d="M100 92 C70 92 56 116 56 150 L144 150 C144 116 130 92 100 92 Z" fill="#06b6d4"/>
""",
    "du": """
<circle cx="120" cy="62" r="24" fill="#fcd34d"/>
<path d="M120 92 C90 92 76 116 76 150 L164 150 C164 116 150 92 120 92 Z" fill="#06b6d4"/>
<line x1="24" y1="120" x2="60" y2="120"/>
<polyline points="48,106 64,120 48,134"/>
""",
    "er_sie_es": """
<circle cx="52" cy="74" r="16" fill="#3b82f6"/>
<circle cx="100" cy="74" r="16" fill="#ef4444"/>
<circle cx="148" cy="74" r="16" fill="#10b981"/>
<path d="M40 150 C40 120 60 106 100 106 C140 106 160 120 160 150 Z" fill="#06b6d4"/>
""",
    "wir": """
<circle cx="70" cy="66" r="20" fill="#fcd34d"/>
<circle cx="130" cy="66" r="20" fill="#fcd34d"/>
<path d="M70 94 C46 94 36 114 36 146 L164 146 C164 114 154 94 130 94 Z" fill="#06b6d4"/>
""",
    "sie_pl": """
<circle cx="50" cy="70" r="15" fill="#fcd34d"/>
<circle cx="100" cy="60" r="15" fill="#fcd34d"/>
<circle cx="150" cy="70" r="15" fill="#fcd34d"/>
<rect x="30" y="92" width="38" height="56" rx="10" fill="#0891b2"/>
<rect x="81" y="82" width="38" height="66" rx="10" fill="#0891b2"/>
<rect x="132" y="92" width="38" height="56" rx="10" fill="#0891b2"/>
""",
    # ---------------- Fragewörter ----------------
    "wie": """
<path d="M74 72 C74 50 92 40 104 40 C124 40 134 54 134 68 C134 88 104 92 104 112" stroke="#ec4899" stroke-width="14" fill="none"/>
<circle cx="104" cy="146" r="10" fill="#ec4899" stroke="none"/>
""",
    "woher": """
<circle cx="52" cy="140" r="14" fill="#10b981"/>
<line x1="66" y1="128" x2="96" y2="104"/>
<polyline points="78,100 98,102 94,122"/>
<path d="M120 66 C120 48 134 40 144 40 C160 40 168 52 168 64 C168 80 146 84 146 100" stroke="#ec4899" stroke-width="12" fill="none"/>
<circle cx="146" cy="126" r="8" fill="#ec4899" stroke="none"/>
""",
    "wo": """
<path d="M100 30 C70 30 52 52 52 80 C52 116 100 168 100 168 C100 168 148 116 148 80 C148 52 130 30 100 30 Z" fill="#ec4899"/>
<circle cx="100" cy="78" r="22" fill="#ffffff"/>
<circle cx="100" cy="78" r="8" fill="#1f2937" stroke="none"/>
""",
    "was": """
<rect x="48" y="66" width="104" height="88" rx="12" fill="#ffffff"/>
<line x1="48" y1="92" x2="152" y2="92" stroke-width="6"/>
<path d="M84 122 C84 110 94 104 102 104 C114 104 120 112 120 120 C120 132 104 134 104 144" stroke="#ec4899" stroke-width="10" fill="none"/>
<circle cx="104" cy="30" r="0" stroke="none"/>
<circle cx="100" cy="46" r="8" fill="#ec4899" stroke="none"/>
""",
    "wer": """
<circle cx="100" cy="92" r="22" fill="#fcd34d"/>
<path d="M100 118 C74 118 62 138 62 164 L138 164 C138 138 126 118 100 118 Z" fill="#ec4899"/>
<path d="M84 38 C84 28 92 24 98 24 C108 24 112 30 112 37 C112 46 100 47 100 55" stroke="#ec4899" stroke-width="8" fill="none"/>
""",
    # ---------------- Präpositionen ----------------
    "in": """
<path d="M52 70 L52 158 L148 158 L148 70" fill="#d9f99d"/>
<line x1="52" y1="70" x2="30" y2="52" stroke-width="6"/>
<line x1="148" y1="70" x2="170" y2="52" stroke-width="6"/>
<circle cx="100" cy="126" r="22" fill="#ef4444"/>
""",
    "auf": """
<rect x="52" y="96" width="96" height="64" rx="6" fill="#d9f99d"/>
<circle cx="100" cy="66" r="22" fill="#ef4444"/>
""",
    "unter": """
<rect x="52" y="44" width="96" height="64" rx="6" fill="#d9f99d"/>
<circle cx="100" cy="142" r="22" fill="#ef4444"/>
""",
    "neben": """
<rect x="40" y="80" width="76" height="76" rx="6" fill="#d9f99d"/>
<circle cx="152" cy="118" r="22" fill="#ef4444"/>
""",
    "aus": """
<path d="M52 80 L52 160 L148 160 L148 80" fill="#d9f99d"/>
<line x1="100" y1="132" x2="100" y2="48"/>
<polyline points="76,74 100,48 124,74"/>
""",
    "mit": """
<circle cx="74" cy="100" r="34" fill="#ef4444"/>
<circle cx="126" cy="100" r="34" fill="#3b82f6"/>
<line x1="100" y1="150" x2="100" y2="170" stroke-width="6"/>
<line x1="90" y1="160" x2="110" y2="160" stroke-width="6"/>
""",
    # ---------------- Adjektive ----------------
    "hoch": """
<rect x="44" y="120" width="32" height="44" fill="#fdba74"/>
<rect x="92" y="56" width="32" height="108" fill="#f97316"/>
<line x1="150" y1="164" x2="150" y2="56"/>
<polyline points="136,76 150,56 164,76"/>
""",
    "gross": """
<rect x="36" y="36" width="128" height="128" rx="10" fill="#f97316"/>
<rect x="140" y="140" width="26" height="26" rx="4" fill="#fdba74"/>
""",
    "klein": """
<rect x="36" y="36" width="128" height="128" rx="10" stroke-dasharray="14 12" fill="none"/>
<rect x="82" y="82" width="36" height="36" rx="6" fill="#f97316"/>
""",
    "schoen": """
<circle cx="100" cy="62" r="20" fill="#fbbf24"/>
<circle cx="136" cy="88" r="20" fill="#fbbf24"/>
<circle cx="124" cy="130" r="20" fill="#fbbf24"/>
<circle cx="76" cy="130" r="20" fill="#fbbf24"/>
<circle cx="64" cy="88" r="20" fill="#fbbf24"/>
<circle cx="100" cy="98" r="16" fill="#f97316"/>
""",
    "neu": """
<path d="M100 34 L112 82 L162 82 L122 110 L136 160 L100 130 L64 160 L78 110 L38 82 L88 82 Z" fill="#fde047"/>
<line x1="164" y1="40" x2="172" y2="28" stroke-width="6"/>
<line x1="176" y1="60" x2="188" y2="56" stroke-width="6"/>
""",
    "alt": """
<path d="M64 40 L136 40 L108 100 L136 160 L64 160 L92 100 Z" fill="#fdba74"/>
<line x1="56" y1="40" x2="144" y2="40"/>
<line x1="56" y1="160" x2="144" y2="160"/>
""",
}


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out_dir = os.path.join(here, "..", "assets", "icons")
    os.makedirs(out_dir, exist_ok=True)
    for name, body in ICONS.items():
        svg = HEADER + body + FOOTER + "\n"
        path = os.path.join(out_dir, name + ".svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(svg)
    print(f"{len(ICONS)} Icons geschrieben nach {os.path.normpath(out_dir)}")


if __name__ == "__main__":
    main()
