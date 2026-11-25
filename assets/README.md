# SatzMeister-Karten

Die Kartendaten liegen in `src/game/data/cards.json`. Das Layout in
`layout/card-template.svg` verbindet Wortart, Grundform mit Artikel,
englische Übersetzung und Motiv mit den Formen oder einer Gebrauchshilfe.
Die Sammlung und der 3D-Tisch verwenden die exportierten PNGs. Im Spiel
gibt es außerdem eine interaktive Kartenansicht mit denselben Wortformen.

## Export aktualisieren

```bash
python3 scripts/generate_cards.py
node scripts/render_pngs.mjs
```

Das erste Skript füllt das Template mit Kartendaten und Motiven aus `icons/`.
Es schreibt die bearbeitbaren Karten nach `cards/svg/`. Das zweite Skript
rendert daraus die PNGs in `cards/png/`.
