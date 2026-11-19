# SatzMeister — Assets

Dieser Ordner enthält alle grafischen Assets des Spiels. Quelle der Wahrheit
für die Kartendaten ist `src/game/data/cards.json` (Schema siehe `SPEC.md`).

## Verzeichnisstruktur

```
assets/
├── icons/            47 handgezeichnete SVG-Icons (200×200 viewBox, flacher Stil,
│                     Strich #1f2937, runde Enden, 2–3 Farben)
├── layout/
│   └── card-template.svg   Masterlayout 750×1050 mit benannten Gruppen
├── cards/
│   ├── svg/          fertige Karten als SVG (750×1050), Icon inline eingebettet
│   └── png/          fertige Karten als PNG (750×1050), per Pillow gerendert
└── README.md
```

## Aufbau des Kartenlayouts (750×1050)

Das Layout ist in `layout/card-template.svg` dokumentiert; die Gruppen heißen:

| Gruppe         | Inhalt                                                        |
|----------------|---------------------------------------------------------------|
| `card-frame`   | äußerer Rahmen (weiß, dunkle Kontur, abgerundet)              |
| `background`   | farbiger Hintergrund = Typ-Farbe (bei Nomen: Genus-Farbe)     |
| `name-banner`  | Namensbanner oben (Nomen mit Artikel, z. B. „der Tisch“)      |
| `rarity-star`  | Seltenheits-Stern oben rechts (common grau, uncommon silber, rare gold) |
| `type-badge`   | Typ-Badge links unter dem Banner („Nomen“, „Verb“, …)         |
| `icon-area`    | mittige Icon-Fläche (weißes Panel, 360×360)                   |
| `text-area`    | großer Textbereich unten (Tabellen/Erklärungen)               |
| `footer-strip` | Fußzeile mit Karten-ID                                        |

Typ-Farben: Nomen der `#3b82f6` / die `#ef4444` / das `#10b981`,
Verb `#8b5cf6`, Modalverb `#f59e0b`, Pronomen `#06b6d4`,
Fragewort `#ec4899`, Präposition `#84cc16`, Adjektiv `#f97316`.

Textbereich-Inhalte je Typ:

- **Nomen:** Deklinationstabelle (Singular/Plural × Nom./Akk./Dat./Gen., bestimmter Artikel)
- **Verb / Modalverb:** Präsens-Konjugation (ich/du/er·sie·es | wir/ihr/sie), Partizip I, Partizip II, Perfekt-Hilfsverb, ggf. „kann Hilfsverb sein“
- **Fragewort:** Erklärung mit Beispielsatz
- **Präposition:** Kasus (Wechselpräposition: „Wo? → Dativ / Wohin? → Akkusativ“)
- **Adjektiv:** Steigerung (Positiv/Komparativ/Superlativ)
- **Pronomen:** enthaltene Formen

## Karten neu rendern

```bash
python3 scripts/generate_cards.py
```

Das Skript liest `src/game/data/cards.json` und `assets/icons/`, schreibt
`assets/cards/svg/<id>.svg` und `assets/cards/png/<id>.png` und prüft dabei,
dass alle referenzierten Icons existieren und alle Starter-Deck-IDs
(`src/game/data/starter_deck.json`) im Pool enthalten sind.

Fonts: DejaVu Sans / DejaVu Sans Bold (volle Umlaut-Unterstützung);
Fallbacks: Helvetica bzw. Arial Unicode.

Icons neu erzeugen (z. B. nach Änderungen in `scripts/build_icons.py`):

```bash
python3 scripts/build_icons.py
```

## Hinweise zur Nachbearbeitung

- Die **PNGs** lassen sich in **PhotoCraft** (`/Applications/PhotoCraft.app`,
  kann PNG/PSD) direkt öffnen und nachbearbeiten.
- Die **SVG-Karten** und das **Template** enthalten benannte Gruppen
  (`<g id="...">`) und Kommentare, damit sie in Grafikprogrammen
  (PhotoCraft, Inkscape, Figma) gezielt editierbar sind.
- **Bekannte Einschränkung:** `cairosvg` ist in der Laufzeit nicht verfügbar,
  daher zeigen die PNGs in der Icon-Fläche einen Platzhalter (Typ-Farbkreis
  mit Wort-Initial). Die echten Icons stecken in den SVG-Karten (inline) und
  einzeln in `assets/icons/`. Wer echte Icon-Rasterung in den PNGs will, kann
  `cairosvg` installieren und das Skript entsprechend erweitern.
