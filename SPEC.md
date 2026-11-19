# SatzMeister — Deutsch-Lern-TCG (Prototyp)

## Spielkonzept

Ein Trading-Card-Game zum Deutschlernen (Level A1 aufwärts).

- **Täglicher Booster:** 1 Booster-Pack pro Tag mit 5 Karten (seltenheitsgestaffelt: common / uncommon / rare).
- **Kartentypen:** Nomen, Verb, Modalverb (Spezial), Pronomen, Fragewort, Präposition, Adjektiv.
- **Sätze bauen:** Karten werden auf eine Satzleiste gelegt; ein Validator prüft Grammatikregeln, ein Scorer vergibt Punkte. Komplexe Sätze (Fragen, Modalverben, Perfekt, Präpositionalphrasen) geben mehr Punkte.
- **Plural-Schmiede:** 2 gleiche Nomenkarten → 1 Pluralkarte.
- **Genus-Farbcode:** der = blau, die = rot, das = grün.

## Technik

- **App:** Vite + React + TypeScript, 3D-Look mit three.js (@react-three/fiber + drei). PWA-installierbar (Handy-Homescreen). Reines-TS-Spielkern (`src/game`) ist plattformunabhängig und später direkt in einer React-Native/Expo-Hülle wiederverwendbar.
- **Deploy:** GitHub Pages (Repo `deutsch-tcg`, User `rischuhm`), Vite `base: '/deutsch-tcg/'`, Deploy via GitHub Actions Workflow.
- **Assets:** Alle Karten als PNG (750×1050) + SVG in `assets/cards/`, Icons als SVG in `assets/icons/`, Masterlayout in `assets/layout/card-template.svg`. Generator: `scripts/generate_cards.py` (Pillow) liest `src/game/data/cards.json`. PNGs sind in PhotoCraft nachbearbeitbar.

## Datenmodell (Source of Truth: `src/game/data/cards.json`)

```ts
type CardType = 'noun' | 'verb' | 'modal' | 'pronoun' | 'question' | 'preposition' | 'adjective';
type Rarity = 'common' | 'uncommon' | 'rare';

interface CardDef {
  id: string;                 // z. B. "noun.tisch"
  type: CardType;
  rarity: Rarity;
  word: string;               // Lemma, z. B. "Tisch"
  icon: string;               // Dateiname in assets/icons/, z. B. "tisch.svg"
  gender?: 'der' | 'die' | 'das';          // noun
  plural?: string;                         // noun, z. B. "Tische"
  declension?: {                           // noun: bestimmter Artikel
    nom_sg: string; akk_sg: string; dat_sg: string; gen_sg: string;
    nom_pl: string; akk_pl: string; dat_pl: string; gen_pl: string;
  };
  conjugation?: {                          // verb + modal
    praesens: { ich: string; du: string; er: string; wir: string; ihr: string; sie: string; };
    partizip1: string;
    partizip2: string;
    aux?: 'haben' | 'sein';                // Perfekt-Hilfsverb
    separable?: boolean;
  };
  canBeAuxiliary?: boolean;                // haben/sein: Vollverb ODER Hilfsverb
  case?: 'Akkusativ' | 'Dativ' | 'Wechselpräposition';  // preposition
  explanation?: string;                    // Fragewort: kurze Erklärung
  forms?: string[];                        // pronoun: z. B. ["er","sie","es"]
}
```

## A1-Kartenpool (mind. 40 Karten)

- **Nomen (12):** Tisch(der), Stuhl(der), Buch(das), Haus(das), Frau(die), Mann(der), Kind(das), Wasser(das), Apfel(der), Lampe(die), Schule(die), Freund(der)
- **Verben (10):** sein, haben, heißen, kommen, gehen, machen, spielen, lernen, wohnen, essen — jeweils mit Präsens-Konjugation, Partizip I, Partizip II, Aux
- **Modalverben (3):** können, müssen, wollen
- **Pronomen (5):** ich, du, er/sie/es, wir, sie(Plural)
- **Fragewörter (5):** wie, woher, wo, was, wer (mit explanation)
- **Präpositionen (6):** in, auf, unter, neben (Wechsel), aus, mit (Dativ) — Bild erklärt die Präposition
- **Adjektive (6):** hoch, groß, klein, schön, neu, alt

## Starter-Deck (A1, 20 Karten)

Muss u. a. ermöglichen: „Der Tisch ist hoch.", „Wie heißt du?", „Woher kommst du?"
→ sein, haben, heißen, kommen, gehen, machen, können; ich, du, er/sie/es; wie, woher, was; Tisch, Buch, Haus, Frau, Mann; hoch, groß, klein, schön.

## Engine-API (`src/game/`, reines TypeScript, keine DOM-Abhängigkeiten)

```ts
// types.ts      — CardType, Rarity, CardDef, CardInstance { instanceId, defId }
// cards.ts      — lädt cards.json: CARD_POOL: CardDef[], getCard(id), STARTER_DECK: string[]
// collection.ts — Collection = Map<defId, count>; addCards, canCraftPlural(col, defId), craftPlural
// booster.ts    — dailyBooster(dateISO: string, pool): CardDef[5]
//                 deterministisch per Seed aus Datum; mind. 1 uncommon+, rare ~10%
// validator.ts  — validateSentence(played: CardInstance[]): ValidationResult
//                 ValidationResult { valid: boolean; errors: string[]; features: Feature[] }
//                 Feature = 'aussagesatz'|'frage'|'modal'|'perfekt'|'praeposition'|'plural'|'adjektiv'|'pronomen'
// scoring.ts    — scoreSentence(v: ValidationResult): { total: number; breakdown: {label, points}[] }
```

### Validierungsregeln (A1)

1. Fragewort nur an Position 0 (sonst Fehler).
2. Konjugiertes Verb an Position 2 (Aussage) bzw. Position 1 nach Fragewort; Ja/Nein-Frage: Verb an Position 0 erlaubt.
3. Modalverb ⇒ Infinitiv-Vollverb am Satzende.
4. haben/sein als Hilfsverb + Partizip II am Satzende ⇒ Feature `perfekt`.
5. Präposition muss von Nomen oder Pronomen gefolgt werden ⇒ Feature `praeposition`.
6. Satz braucht ein Subjekt (Pronomen oder Nomen) und ein finites Verb.
7. Adjektiv vor oder nach Nomen erlaubt (A1-lenient) ⇒ Feature `adjektiv`.

### Scoring

Basis 10 + Länge (2/Karte ab 3 Karten) + Boni: frage +5, modal +8, perfekt +10, praeposition +6, plural +4, adjektiv +3, pronomen +2.

## UI (React)

- **3D-Tisch** (three.js): Karten als leicht gewölbte 3D-Planes mit Kartenface-Textur aus `assets/cards/`, Hover-Tilt, Drag auf Satzleiste.
- **Screens:** Sammlung, Booster-Öffnen (täglich, localStorage-Zeitstempel), Spieltisch (Satz bauen + validieren + Punkte), Deck-Übersicht.
- **Persistenz:** localStorage (Sammlung, letzter Booster, Punkte) — später Accounts/DB.
