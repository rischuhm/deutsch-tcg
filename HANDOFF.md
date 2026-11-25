# SatzMeister — Projekt-Übergabe (Handoff)

> Stand: 2026-11-25. Diese Datei richtet sich an einen anderen Agenten/eine andere Person,
> die das Projekt ohne Vorwissen weiterentwickeln soll.

## Was ist das?

**SatzMeister** ist ein Prototyp für ein Deutsch-Lernspiel (Niveau A1) im Stil eines
Trading-Card-Games (TCG). Lernende sammeln Karten (Nomen, Verben, Pronomen, Fragewörter,
Präpositionen, Adjektive, Modalverben), erhalten täglich ein Booster-Pack mit 5 Karten
und bauen auf einer „Satzleiste" deutsche Sätze. Komplexere Sätze (Fragen, Perfekt,
Präpositionen, Plural, Adjektive) geben mehr Punkte. Korrekt platzierte **Steinchen**
(Person am Verb, Kasus am Nomen) geben Bonuspunkte. Ein **Story-Modus** führt auf
Englisch durch 10 A1-Lektionen.

- **Live:** https://rischuhm.github.io/deutsch-tcg/
- **Repo:** github.com/rischuhm/deutsch-tcg (Branch `main`, Push löst GitHub-Actions-Deploy aus, `.github/workflows/deploy.yml`)

## Tech-Stack

- **Vite 6 + React 19 + TypeScript (strict)**, PWA via `vite-plugin-pwa` (`registerType: 'autoUpdate'` — nach einem Deploy kann 1× Reload nötig sein, weil der Service Worker cached)
- **3D:** three.js mit `@react-three/fiber` + `@react-three/drei` (Spieltisch, Karten als 3D-Objekte mit PNG-Texturen, 3D-Steinchen)
- **Tests:** vitest, **76 Tests grün** (`npm test`)
- **Kein Backend** — Persistenz komplett über `localStorage` (siehe `src/lib/ui.ts` → `STORAGE_KEYS`). Accounts/DB sind für später geplant.
- Ursprünglich als React-Native-fähiger Prototyp gedacht; aktuell eine Web-App (PWA, mobil installierbar). Eine RN/Expo-Portierung ist noch NICHT erfolgt.

## Befehle

```bash
npm install
npm run dev      # Dev-Server auf Port 7300 (strictPort — Port absichtlich nicht 5173, dort läuft beim Owner eine andere App)
npm test         # vitest
npm run build    # tsc --noEmit + vite build + PWA
```

Vite-Config: `base: '/deutsch-tcg/'`, `publicDir: 'assets'` → Kartenbilder werden unter
`<base>cards/png/<defId>.png` ausgeliefert (z. B. `/deutsch-tcg/cards/png/noun.tisch.png`).

## Architektur

### Engine — `src/game/` (reines TypeScript, KEINE DOM-/React-Abhängigkeiten)

| Datei | Zweck |
|---|---|
| `types.ts` | Zentrale Typen: `CardDef`, `CardInstance` (mit `chosenPerson`, `chosenCase`, `isPlural`), `ValidationResult`, `Person`, `GermanCase` … |
| `cards.ts` | Lädt `data/cards.json`, stellt `POOL_BY_ID` bereit |
| `collection.ts` | Sammlung/Deck-Verwaltung, Plural-Schmiede |
| `booster.ts` | Tägliches Booster-Pack (5 Karten, seeded RNG) |
| `validator.ts` | A1-lenienter Satz-Validator (Regeln 1–8): Verbposition, Modalverb+Infinitiv, Perfekt (haben/sein + Partizip II), Präposition→Nomen, Subjekt, **Regel 8 = Steinchen-Check** (Person am finiten Verb passend zum Subjekt; Kasus am Nomen: Subjekt→Nominativ, nach Präposition→deren Kasus, Wechselpräposition→Akkusativ bei Bewegungsverben gehen/kommen sonst Dativ, sonst Akkusativ). Liefert `correctChips`. |
| `scoring.ts` | Punkte inkl. Steinchen-Bonus (+3 pro korrektem Chip) |
| `suggest.ts` | `suggestNext(played)` → Hinweis, welcher Kartentyp als Nächstes passt (UI-Hinweisleiste + Glow) |
| `story.ts` + `data/story.json` | Story-Modus: 10 Lektionen in 3 Kapiteln (englische Erklärungen). `checkLesson(lesson, played)` prüft exakte Zielreihenfolge + Steinchen + ggf. vollen Validator. `isLessonUnlocked` / `nextLesson` für sequentielle Freischaltung. |
| `index.ts` | Barrel-Export (`export * from ...`) |
| `__tests__/` | engine.test.ts (41), suggest.test.ts (7), story.test.ts (28) — die Story-Tests spielen **jede Lektion automatisch durch** und prüfen Lösbarkeit |

### Kartendaten — `src/game/data/`

- `cards.json`: 47 Karten (12 Nomen mit voller Deklination, 10 Verben + 3 Modalverben mit
  Präsens-Konjugation/Partizip I/II/Hilfsverb, 5 Pronomen, 5 Fragewörter mit Erklärung,
  6 Präpositionen mit Kasus-Angabe, 6 Adjektive). ID-Schema: `noun.tisch`, `verb.sein`,
  `pron.ich`, `question.wie`, `prep.in`, `adj.hoch`, `modal.koennen`.
- `starter_deck.json`: 20 Karten (A1-Startdeck; „Der Tisch ist hoch.", „Wie heißt du?",
  „Woher kommst du?" sind damit baubar).
- `story.json`: Story-Lektionen (s. o.). `handCards` enthalten absichtlich Distraktoren.

### UI — `src/`

- `App.tsx`: Tabs + globaler State (Punkte, Sammlung, Story-Fortschritt) via `usePersistentState`
- `components/TabBar.tsx`: 4 Tabs — 🃏 Spieltisch, 📖 Story, 🎁 Booster, 🗂️ Sammlung
- `components/TableScreen.tsx`: freies Spiel — 3D-Tisch, Karte antippen → **Inspect-Overlay** (Detailansicht vor dem Spielen) → „Auf die Satzleiste legen"; gespielte Karten → Steinchen-Auswahl; „Satz prüfen" mit Breakdown; Hinweisleiste via `suggestNext`
- `components/StoryScreen.tsx` + `LessonRunner.tsx`: Story-Übersicht (Kapitel, 🔒/▶/✅) und Lektions-Runner (Erklärungspanel EN + fixe Lektions-Hand + Check ✓ → `checkLesson`, Erfolgs-Overlay mit Bonuspunkten)
- `components/BoosterScreen.tsx`: tägliches Pack (1× 5 Karten, localStorage-Datumscheck)
- `components/CollectionScreen.tsx`: Sammlung + Plural-Schmiede (2 gleiche Nomen → Pluralform)
- `components/InspectOverlay.tsx`: **wiederverwendbares** Karten-Detail-Overlay (von TableScreen und LessonRunner genutzt)
- `components/three/TableScene.tsx`, `PlayingCard.tsx`, `BoosterScene.tsx`: 3D-Szene
- `hooks/useCardTexture.ts`: lädt Karten-PNG als three.js-Textur
- `hooks/useChipTexture.ts`: generiert Steinchen-Textur per Canvas
- `hooks/usePersistentState.ts`: localStorage-State-Hook
- `lib/ui.ts`: `STORAGE_KEYS`, `displayWord`, `MAX_SENTENCE` etc.

### Assets — `assets/`

- `cards/png/<defId>.png` + `cards/svg/<defId>.svg`: je eine Karte (750×1050), mit echten Icons
- `layout/card-template.svg`: **Masterlayout**, von dem alle Karten abgeleitet sind
- `icons/*.svg`: Motiv-Icons (Tisch, Apfel, …)
- Generator: `scripts/generate_cards.py` (SVGs aus cards.json + Template), dann
  `node scripts/render_pngs.mjs` (PNG via `@resvg/resvg-js`).

  ⚠️ **PNG-Renderkette beachten:** Die von Pillow/Python erzeugten PNGs enthalten nur
  Buchstaben-Platzhalter. Nach Änderungen an SVGs IMMER `render_pngs.mjs` laufen lassen.
  Die PNGs sind in **PhotoCraft** (lokal beim Owner installiert) nachbearbeitbar.
- Neue Karte anlegen = Eintrag in `cards.json` + Icon + Generator laufen lassen.

## Bekannte Fallstricke

1. **Schwarze Karten in three.js:** Bei Texturwechsel müssen R3F-Materialien mit
   `key={texture.uuid}` remountet werden, sonst bleibt das Material schwarz
   (Shader-Rekompilierung). Bereits in `PlayingCard.tsx`/`BoosterScene.tsx` gefixt — Muster beibehalten!
2. **PWA-Cache:** Nach Deploy zeigt die Live-Seite evtl. erst nach 1× Reload den neuen Stand.
3. **Port 7300:** strictPort gesetzt; 5173 ist beim Owner belegt.
4. **Validator-Annahmen (bewusst A1-lenient):** Objekt hinter Verb = Akkusativ;
   Wechselpräpositionen: Akkusativ nur wenn gehen/kommen im Satz; Ja/Nein-Fragen erlauben
   das finite Verb an Position 0. Bei Engine-Änderungen Tests anpassen/erweitern.
5. **Story-Lektionen sind exakt:** `checkLesson` verlangt die Zielreihenfolge exakt
   (Distraktoren in der Hand sind gewollt; „falsche" aber grammatisch korrekte Sätze
   zählen in der Lektion nicht — im freien Spiel schon).

## Offene Baustellen / mögliche nächste Schritte

- **React-Native-/Expo-App** (ursprünglicher Wunsch: Handy-Installation; aktuell nur PWA)
- **Backend + Accounts** (localStorage → echte DB; Sammlung serverseitig)
- Story-Belohnungen (z. B. Bonus-Booster nach Kapitel-Abschluss) — vom Owner als Idee genannt, noch nicht umgesetzt
- Mehr Karten/Lektionen (A1-Rest: Perfekt, trennbare Verben, Dativ-Verben, Imperativ …)
- i18n der UI (derzeit Deutsch, Story-Erklärungen Englisch)
- `SPEC.md` im Repo-Root enthält die ursprüngliche Spielspezifikation

## Qualitäts-Gate vor jedem Commit

```bash
npm test && npm run build   # beides muss grün sein
git add -A && git commit && git push   # Deploy läuft automatisch
gh run list --repo rischuhm/deutsch-tcg --limit 1   # Deploy-Status prüfen
```
