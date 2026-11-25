import type {
  CardDeclension,
  CardDef,
  CardInstance,
  CardType,
  Collection,
  GermanCase,
  Person,
  Rarity,
} from '../game';
import { getCard } from '../game';

/** 3D-Kartenmaße (Seitenverhältnis 750×1050). */
export const CARD_W = 0.75;
export const CARD_H = 1.05;

export const MAX_HAND = 10;
export const MAX_SENTENCE = 8;

export const STORAGE_KEYS = {
  collection: 'satzmeister.collection',
  plurals: 'satzmeister.plurals',
  points: 'satzmeister.points',
  lastBooster: 'satzmeister.lastBooster',
  onboarded: 'satzmeister.onboarded',
  storyCompleted: 'satzmeister.story.completed',
} as const;

export const TYPE_LABELS: Record<CardType, string> = {
  noun: 'Nomen',
  verb: 'Verb',
  modal: 'Modalverb',
  pronoun: 'Pronomen',
  question: 'Fragewort',
  preposition: 'Präposition',
  adjective: 'Adjektiv',
};

export const TYPE_COLORS: Record<CardType, string> = {
  noun: '#3b82f6',
  verb: '#ef4444',
  modal: '#a855f7',
  pronoun: '#14b8a6',
  question: '#f59e0b',
  preposition: '#84cc16',
  adjective: '#ec4899',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Häufig',
  uncommon: 'Ungewöhnlich',
  rare: 'Selten',
};

/** Glanzfarbe beim Booster-Reveal (common = kein Glanz). */
export const RARITY_GLOW: Record<Rarity, string | null> = {
  common: null,
  uncommon: '#38bdf8',
  rare: '#fbbf24',
};

/** Heutiges Datum als lokale ISO-Datumsangabe ("YYYY-MM-DD"). */
export function todayLocalISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Millisekunden bis zur nächsten Mitternacht (lokale Zeit). */
export function msUntilMidnight(): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

export function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = `${Math.floor(totalSeconds / 3600)}`.padStart(2, '0');
  const m = `${Math.floor((totalSeconds % 3600) / 60)}`.padStart(2, '0');
  const s = `${totalSeconds % 60}`.padStart(2, '0');
  return `${h}:${m}:${s}`;
}

/** Baut aus Sammlung + Plural-Schmiede die spielbaren Karteninstanzen. */
export function buildInstances(
  collection: Collection,
  plurals: Record<string, number>,
): CardInstance[] {
  const out: CardInstance[] = [];
  for (const [defId, count] of Object.entries(collection)) {
    for (let i = 0; i < count; i++) {
      out.push({ instanceId: `${defId}#${i}`, defId });
    }
  }
  for (const [defId, count] of Object.entries(plurals)) {
    for (let i = 0; i < count; i++) {
      out.push({ instanceId: `${defId}#plural#${i}`, defId, isPlural: true });
    }
  }
  return out;
}

/**
 * Wählt bis zu `max` Karten für die Hand aus.
 * Bei mehr Karten als `max` wird deterministisch gemischt (Seed).
 */
export function selectHand(
  instances: CardInstance[],
  max: number,
  seed: number,
): CardInstance[] {
  if (instances.length <= max) {
    return instances;
  }
  let a = seed >>> 0;
  const rng = (): number => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const copy = [...instances];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i] as CardInstance;
    copy[i] = copy[j] as CardInstance;
    copy[j] = tmp;
  }
  return copy.slice(0, max);
}

/** Angezeigtes Wort einer Instanz (Pluralform, falls geschmiedet). */
export function displayWord(instance: CardInstance): string {
  const def = getCard(instance.defId);
  if (!def) {
    return instance.defId;
  }
  return instance.isPlural === true && def.plural ? def.plural : def.word;
}

/** Textur-URL für ein Kartenface. */
export function cardFaceUrl(defId: string): string {
  return `${import.meta.env.BASE_URL}cards/png/${defId}.png`;
}

/* ---------- Steinchen (Person am Verb, Kasus am Nomen) ---------- */

/** Reihenfolge der Person-Steinchen im Auswahl-Grid (2×3). */
export const PERSON_ORDER: Person[] = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];

/** Anzeigename der Person auf dem Chip. */
export const PERSON_LABELS: Record<Person, string> = {
  ich: 'ich',
  du: 'du',
  er: 'er/sie/es',
  wir: 'wir',
  ihr: 'ihr',
  sie: 'sie',
};

/** Reihenfolge der Kasus-Steinchen im Auswahl-Grid. */
export const CASE_ORDER: GermanCase[] = [
  'Nominativ',
  'Akkusativ',
  'Dativ',
  'Genitiv',
];

const CASE_PREFIX: Record<GermanCase, 'nom' | 'akk' | 'dat' | 'gen'> = {
  Nominativ: 'nom',
  Akkusativ: 'akk',
  Dativ: 'dat',
  Genitiv: 'gen',
};

/** Konjugierte Präsens-Form für ein Person-Steinchen, z. B. „kommst“. */
export function personFormLabel(def: CardDef, person: Person): string {
  return def.conjugation?.praesens[person] ?? def.word;
}

/**
 * Deklinierte Form für ein Kasus-Steinchen, z. B. „den Tisch“.
 * Nutzt bei Plural-Karten die _pl-Varianten der Deklination.
 */
export function declinedFormLabel(
  def: CardDef,
  germanCase: GermanCase,
  isPlural: boolean,
): string {
  const decl = def.declension;
  if (!decl) {
    return def.word;
  }
  const key =
    `${CASE_PREFIX[germanCase]}_${isPlural ? 'pl' : 'sg'}` as keyof CardDeclension;
  return decl[key] ?? def.word;
}
