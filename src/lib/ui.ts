import type {
  CardDef,
  CardInstance,
  CardType,
  Collection,
  Rarity,
} from '../game';
import { cardWord, getCard } from '../game';

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
  adverb: 'Adverb',
  particle: 'Verbzusatz',
  phrase: 'Satzbaustein',
};

export const TYPE_COLORS: Record<CardType, string> = {
  noun: '#3b82f6',
  verb: '#ef4444',
  modal: '#a855f7',
  pronoun: '#14b8a6',
  question: '#f59e0b',
  preposition: '#84cc16',
  adjective: '#ec4899',
  adverb: '#818cf8',
  particle: '#f97316',
  phrase: '#8795ac',
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

/** Aktuell gewählte Wortform einer Karteninstanz. */
export function displayWord(instance: CardInstance, definitions?: ReadonlyMap<string, CardDef>): string {
  const def = definitions?.get(instance.defId) ?? getCard(instance.defId);
  if (!def) {
    return instance.defId;
  }
  return cardWord(def, instance) + (def.punctuation ?? '');
}

/** Textur-URL für ein Kartenface. */
export function cardFaceUrl(defId: string): string {
  return `${import.meta.env.BASE_URL}cards/png/${defId}.png`;
}


export function sentenceText(played: CardInstance[], isSentence = true, definitions?: ReadonlyMap<string, CardDef>, endMark?: string): string {
  const words = played.map((instance) => displayWord(instance, definitions));
  const text = words.join(' ');
  if (!isSentence || !text) return text;
  const firstType = getCard(played[0]!.defId)?.type;
  const question = firstType === 'question' || firstType === 'verb' || firstType === 'modal';
  return text[0]!.toLocaleUpperCase('de') + text.slice(1) + (endMark ?? (question ? '?' : '.'));
}

export function iconUrl(icon: string): string {
  return `${import.meta.env.BASE_URL}icons/${icon}`;
}
