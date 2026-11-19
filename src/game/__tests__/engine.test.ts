/**
 * Engine-Tests für den SatzMeister-Spielkern.
 * Nutzt einen eigenen Mini-Kartenpool als Fixture (unabhängig von den
 * echten JSON-Daten), damit die Tests isoliert laufen.
 */

import { describe, it, expect } from 'vitest';
import type { CardDef, CardInstance } from '../types';
import { validateSentence } from '../validator';
import { scoreSentence } from '../scoring';
import { dailyBooster, canOpenBoosterToday, BOOSTER_SIZE } from '../booster';
import {
  emptyCollection,
  addToCollection,
  addStarterDeck,
  canCraftPlural,
  craftPlural,
} from '../collection';

// ---------------------------------------------------------------------------
// Fixtures: Mini-Kartenpool
// ---------------------------------------------------------------------------

function praesens(ich: string, du: string, er: string) {
  return { ich, du, er, wir: ich, ihr: du, sie: er };
}

const FIXTURE_CARDS: CardDef[] = [
  {
    id: 'noun.tisch',
    type: 'noun',
    rarity: 'common',
    word: 'Tisch',
    icon: 'tisch.svg',
    gender: 'der',
    plural: 'Tische',
  },
  {
    id: 'noun.buch',
    type: 'noun',
    rarity: 'common',
    word: 'Buch',
    icon: 'buch.svg',
    gender: 'das',
    plural: 'Bücher',
  },
  {
    id: 'verb.sein',
    type: 'verb',
    rarity: 'common',
    word: 'sein',
    icon: 'sein.svg',
    canBeAuxiliary: true,
    conjugation: {
      praesens: praesens('bin', 'bist', 'ist'),
      partizip1: 'seiend',
      partizip2: 'gewesen',
      aux: 'sein',
    },
  },
  {
    id: 'verb.haben',
    type: 'verb',
    rarity: 'common',
    word: 'haben',
    icon: 'haben.svg',
    canBeAuxiliary: true,
    conjugation: {
      praesens: praesens('habe', 'hast', 'hat'),
      partizip1: 'habend',
      partizip2: 'gehabt',
      aux: 'haben',
    },
  },
  {
    id: 'verb.heissen',
    type: 'verb',
    rarity: 'common',
    word: 'heißen',
    icon: 'heissen.svg',
    conjugation: {
      praesens: praesens('heiße', 'heißt', 'heißt'),
      partizip1: 'heißend',
      partizip2: 'geheißen',
      aux: 'haben',
    },
  },
  {
    id: 'verb.kommen',
    type: 'verb',
    rarity: 'uncommon',
    word: 'kommen',
    icon: 'kommen.svg',
    conjugation: {
      praesens: praesens('komme', 'kommst', 'kommt'),
      partizip1: 'kommend',
      partizip2: 'gekommen',
      aux: 'sein',
    },
  },
  {
    id: 'modal.koennen',
    type: 'modal',
    rarity: 'uncommon',
    word: 'können',
    icon: 'koennen.svg',
    conjugation: {
      praesens: praesens('kann', 'kannst', 'kann'),
      partizip1: 'könnend',
      partizip2: 'gekonnt',
      aux: 'haben',
    },
  },
  {
    id: 'pron.ich',
    type: 'pronoun',
    rarity: 'common',
    word: 'ich',
    icon: 'ich.svg',
    forms: ['ich'],
  },
  {
    id: 'pron.du',
    type: 'pronoun',
    rarity: 'common',
    word: 'du',
    icon: 'du.svg',
    forms: ['du'],
  },
  {
    id: 'question.wie',
    type: 'question',
    rarity: 'common',
    word: 'wie',
    icon: 'wie.svg',
    explanation: 'fragt nach Art und Weise oder nach dem Namen',
  },
  {
    id: 'question.woher',
    type: 'question',
    rarity: 'uncommon',
    word: 'woher',
    icon: 'woher.svg',
    explanation: 'fragt nach der Herkunft',
  },
  {
    id: 'prep.in',
    type: 'preposition',
    rarity: 'common',
    word: 'in',
    icon: 'in.svg',
    case: 'Wechselpräposition',
  },
  {
    id: 'adj.hoch',
    type: 'adjective',
    rarity: 'rare',
    word: 'hoch',
    icon: 'hoch.svg',
  },
  {
    id: 'adj.neu',
    type: 'adjective',
    rarity: 'rare',
    word: 'neu',
    icon: 'neu.svg',
  },
];

const FIXTURE_POOL: ReadonlyMap<string, CardDef> = new Map(
  FIXTURE_CARDS.map((card) => [card.id, card]),
);

let instanceCounter = 0;
function inst(defId: string, isPlural = false): CardInstance {
  instanceCounter += 1;
  return { instanceId: `test-${instanceCounter}`, defId, isPlural };
}

function sentence(...defIds: string[]): CardInstance[] {
  return defIds.map((id) => inst(id));
}

// ---------------------------------------------------------------------------
// Validator
// ---------------------------------------------------------------------------

describe('validateSentence', () => {
  it('akzeptiert „Tisch ist hoch“ (Nomen ohne Artikel, A1-lenient)', () => {
    const result = validateSentence(
      sentence('noun.tisch', 'verb.sein', 'adj.hoch'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.features).toContain('aussagesatz');
    expect(result.features).toContain('adjektiv');
  });

  it('akzeptiert „Wie heißt du“ mit Features frage + pronomen', () => {
    const result = validateSentence(
      sentence('question.wie', 'verb.heissen', 'pron.du'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('frage');
    expect(result.features).toContain('pronomen');
  });

  it('akzeptiert „Woher kommst du“', () => {
    const result = validateSentence(
      sentence('question.woher', 'verb.kommen', 'pron.du'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('frage');
    expect(result.features).toContain('pronomen');
  });

  it('lehnt Fragewort mitten im Satz ab', () => {
    const result = validateSentence(
      sentence('pron.ich', 'question.wie', 'verb.heissen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Fragewort'))).toBe(true);
  });

  it('lehnt Modalverb ohne Infinitiv ab', () => {
    const result = validateSentence(
      sentence('pron.ich', 'modal.koennen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Modalverb'))).toBe(true);
  });

  it('akzeptiert „Ich kann kommen“ mit Feature modal', () => {
    const result = validateSentence(
      sentence('pron.ich', 'modal.koennen', 'verb.kommen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('modal');
    expect(result.features).toContain('aussagesatz');
  });

  it('akzeptiert „Ich bin gekommen“ mit Feature perfekt (sein + Partizip II)', () => {
    const result = validateSentence(
      sentence('pron.ich', 'verb.sein', 'verb.kommen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('perfekt');
  });

  it('gibt kein perfekt, wenn das Hilfsverb nicht zum Partizip passt', () => {
    // „Ich habe gekommen“ — kommen braucht sein, nicht haben
    const result = validateSentence(
      sentence('pron.ich', 'verb.haben', 'verb.kommen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).not.toContain('perfekt');
  });

  it('lehnt Präposition ohne folgendes Nomen/Pronomen ab', () => {
    const result = validateSentence(
      sentence('pron.ich', 'verb.kommen', 'prep.in'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Präposition'))).toBe(true);
  });

  it('akzeptiert Präposition mit Nomen und setzt Feature praeposition', () => {
    const result = validateSentence(
      sentence('pron.ich', 'verb.sein', 'prep.in', 'noun.buch'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('praeposition');
  });

  it('setzt Feature plural bei gecrafteter Pluralkarte', () => {
    const result = validateSentence(
      [inst('noun.tisch', true), inst('verb.sein'), inst('adj.hoch')],
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(true);
    expect(result.features).toContain('plural');
  });

  it('lehnt Satz ohne Subjekt ab', () => {
    const result = validateSentence(
      sentence('adj.hoch', 'verb.kommen'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Subjekt'))).toBe(true);
  });

  it('lehnt Satz ohne finites Verb ab', () => {
    const result = validateSentence(
      sentence('pron.ich', 'noun.tisch'),
      FIXTURE_POOL,
    );
    expect(result.valid).toBe(false);
  });

  it('lehnt leere Satzleiste ab', () => {
    const result = validateSentence([], FIXTURE_POOL);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Booster
// ---------------------------------------------------------------------------

describe('dailyBooster', () => {
  it('ist deterministisch: gleiches Datum ⇒ gleiche Karten', () => {
    const a = dailyBooster('2026-11-19', FIXTURE_CARDS).map((c) => c.id);
    const b = dailyBooster('2026-11-19', FIXTURE_CARDS).map((c) => c.id);
    expect(a).toEqual(b);
  });

  it('liefert genau 5 Karten aus dem Pool', () => {
    const booster = dailyBooster('2026-11-19', FIXTURE_CARDS);
    expect(booster).toHaveLength(BOOSTER_SIZE);
    for (const card of booster) {
      expect(FIXTURE_POOL.has(card.id)).toBe(true);
    }
  });

  it('garantiert mindestens 1 Karte uncommon oder besser', () => {
    // Viele Tage prüfen — die Garantie muss immer greifen.
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= 28; day += 3) {
        const date = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const booster = dailyBooster(date, FIXTURE_CARDS);
        expect(booster).toHaveLength(BOOSTER_SIZE);
        expect(
          booster.some((card) => card.rarity !== 'common'),
          `Booster am ${date} ohne uncommon+`,
        ).toBe(true);
      }
    }
  });

  it('mischt die Kartentypen (max. 2 gleiche Typen), wenn der Pool es erlaubt', () => {
    const booster = dailyBooster('2026-11-19', FIXTURE_CARDS);
    const counts = new Map<string, number>();
    for (const card of booster) {
      counts.set(card.type, (counts.get(card.type) ?? 0) + 1);
    }
    for (const count of counts.values()) {
      expect(count).toBeLessThanOrEqual(2);
    }
  });

  it('liefert leeres Array bei leerem Pool', () => {
    expect(dailyBooster('2026-11-19', [])).toEqual([]);
  });
});

describe('canOpenBoosterToday', () => {
  it('erlaubt den ersten Booster (noch nie geöffnet)', () => {
    expect(canOpenBoosterToday(null, '2026-11-19')).toBe(true);
  });

  it('verbietet zweiten Booster am selben Tag', () => {
    expect(canOpenBoosterToday('2026-11-19', '2026-11-19')).toBe(false);
  });

  it('erlaubt Booster am nächsten Tag', () => {
    expect(canOpenBoosterToday('2026-11-18', '2026-11-19')).toBe(true);
  });

  it('ignoriert Uhrzeit-Anteile im ISO-String', () => {
    expect(canOpenBoosterToday('2026-11-19T07:30:00', '2026-11-19T18:45:00')).toBe(false);
    expect(canOpenBoosterToday('2026-11-18T23:59:00', '2026-11-19T00:01:00')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Collection / Plural-Schmiede
// ---------------------------------------------------------------------------

describe('collection', () => {
  it('emptyCollection ist leer', () => {
    expect(emptyCollection()).toEqual({});
  });

  it('addToCollection zählt Duplikate hoch', () => {
    let col = emptyCollection();
    col = addToCollection(col, ['noun.tisch']);
    col = addToCollection(col, ['noun.tisch', 'verb.sein']);
    expect(col['noun.tisch']).toBe(2);
    expect(col['verb.sein']).toBe(1);
  });

  it('addStarterDeck fügt alle Starter-IDs hinzu', () => {
    const starter = ['noun.tisch', 'verb.sein', 'pron.ich'];
    const col = addStarterDeck(emptyCollection(), starter);
    expect(col['noun.tisch']).toBe(1);
    expect(col['verb.sein']).toBe(1);
    expect(col['pron.ich']).toBe(1);
  });

  it('canCraftPlural nur bei Nomen mit plural-Feld und 2 Exemplaren', () => {
    const col = addToCollection(emptyCollection(), ['noun.tisch', 'noun.tisch', 'verb.sein', 'verb.sein']);
    expect(canCraftPlural(col, 'noun.tisch', FIXTURE_POOL)).toBe(true);
    // Verb ist kein Nomen:
    expect(canCraftPlural(col, 'verb.sein', FIXTURE_POOL)).toBe(false);
    // Nur 1 Exemplar:
    const single = addToCollection(emptyCollection(), ['noun.tisch']);
    expect(canCraftPlural(single, 'noun.tisch', FIXTURE_POOL)).toBe(false);
  });

  it('craftPlural verbraucht genau 2 Karten und gibt Plural-Info zurück', () => {
    const col = addToCollection(emptyCollection(), [
      'noun.tisch',
      'noun.tisch',
      'noun.tisch',
    ]);
    const result = craftPlural(col, 'noun.tisch', FIXTURE_POOL);
    expect(result).not.toBeNull();
    expect(result?.pluralWord).toBe('Tische');
    expect(result?.defId).toBe('noun.tisch');
    expect(result?.collection['noun.tisch']).toBe(1);
    // Original bleibt unverändert (immutable):
    expect(col['noun.tisch']).toBe(3);
  });

  it('craftPlural entfernt den Eintrag, wenn keine Karten übrig bleiben', () => {
    const col = addToCollection(emptyCollection(), ['noun.tisch', 'noun.tisch']);
    const result = craftPlural(col, 'noun.tisch', FIXTURE_POOL);
    expect(result?.collection['noun.tisch']).toBeUndefined();
  });

  it('craftPlural schlägt fehl, wenn nicht genug Karten da sind', () => {
    const col = addToCollection(emptyCollection(), ['noun.tisch']);
    expect(craftPlural(col, 'noun.tisch', FIXTURE_POOL)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

describe('scoreSentence', () => {
  it('gibt 0 Punkte mit Hinweis bei ungültigem Satz', () => {
    const invalid = validateSentence(sentence('pron.ich', 'modal.koennen'), FIXTURE_POOL);
    const score = scoreSentence(invalid, 2);
    expect(score.total).toBe(0);
    expect(score.hint).toBeDefined();
  });

  it('bewertet einfachen Satz: Basis + Länge + Adjektiv', () => {
    // „Tisch ist hoch“: Basis 10 + Länge 2 + adjektiv 3 = 15
    const result = validateSentence(
      sentence('noun.tisch', 'verb.sein', 'adj.hoch'),
      FIXTURE_POOL,
    );
    const score = scoreSentence(result, 3);
    expect(score.total).toBe(15);
    expect(score.breakdown.map((b) => b.label)).toContain('Basis');
  });

  it('komplexer Satz gibt mehr Punkte als einfacher Satz', () => {
    const simple = validateSentence(
      sentence('noun.tisch', 'verb.sein', 'adj.hoch'),
      FIXTURE_POOL,
    );
    const modalSentence = validateSentence(
      sentence('pron.ich', 'modal.koennen', 'verb.kommen'),
      FIXTURE_POOL,
    );
    const question = validateSentence(
      sentence('question.wie', 'verb.heissen', 'pron.du'),
      FIXTURE_POOL,
    );
    const simpleScore = scoreSentence(simple, 3).total;
    expect(scoreSentence(modalSentence, 3).total).toBeGreaterThan(simpleScore);
    expect(scoreSentence(question, 3).total).toBeGreaterThan(simpleScore);
  });

  it('belohnt Perfekt am stärksten', () => {
    const perfekt = validateSentence(
      sentence('pron.ich', 'verb.sein', 'verb.kommen'),
      FIXTURE_POOL,
    );
    // Basis 10 + Länge 2 + perfekt 10 + pronomen 2 = 24
    expect(scoreSentence(perfekt, 3).total).toBe(24);
  });

  it('Längenbonus wächst ab der 3. Karte um 2 pro Karte', () => {
    const result = validateSentence(
      sentence('pron.ich', 'verb.sein', 'prep.in', 'noun.buch'),
      FIXTURE_POOL,
    );
    // Basis 10 + Länge 4 (2 Karten × 2) + praeposition 6 + pronomen 2 = 22
    expect(scoreSentence(result, 4).total).toBe(22);
  });
});
