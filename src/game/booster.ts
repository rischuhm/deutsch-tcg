/**
 * SatzMeister — Täglicher Booster.
 * Deterministisch aus dem Datums-Seed (mulberry32 über String-Hash):
 * gleiches Datum ⇒ gleiche Karten.
 *
 * Regeln:
 * - 5 Karten pro Booster.
 * - Gewichtung pro Karte: common 70 %, uncommon 20 %, rare 10 %.
 * - Garantie: mindestens 1 Karte uncommon oder besser.
 * - Typ-Mischung: maximal 2 Karten desselben Typs, sonst wird der
 *   komplette Booster neu gewürfelt (max. 10 Versuche, deterministisch).
 */

import type { CardDef, CardType, Rarity } from './types';
import { CARD_POOL } from './cards';

export const BOOSTER_SIZE = 5;
const MAX_ATTEMPTS = 10;
const MAX_SAME_TYPE = 2;

/** String-Hash (ähnlich Murmur3-Finale-Schritten) → 32-bit Seed. */
function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

/** mulberry32 — kleiner, schneller PRNG, liefert Werte in [0, 1). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rollRarity(rng: () => number): Rarity {
  const r = rng();
  if (r < 0.7) return 'common';
  if (r < 0.9) return 'uncommon';
  return 'rare';
}

function pickRandom<T>(rng: () => number, items: T[]): T {
  const index = Math.min(items.length - 1, Math.floor(rng() * items.length));
  return items[index] as T;
}

function drawCard(rng: () => number, pool: CardDef[]): CardDef {
  const rarity = rollRarity(rng);
  let candidates = pool.filter((card) => card.rarity === rarity);
  if (candidates.length === 0) {
    // Seltenheit im Pool nicht vorhanden → auf andere Seltenheiten ausweichen.
    candidates = pool.filter((card) => card.rarity !== 'common');
  }
  if (candidates.length === 0) {
    candidates = pool;
  }
  return pickRandom(rng, candidates);
}

/** Ersetzt deterministisch eine Karte, falls der Booster komplett common ist. */
function ensureUncommonOrBetter(
  rng: () => number,
  pool: CardDef[],
  cards: CardDef[],
): void {
  if (cards.some((card) => card.rarity !== 'common')) {
    return;
  }
  const upgrades = pool.filter((card) => card.rarity !== 'common');
  if (upgrades.length === 0) {
    return;
  }
  const replaceIndex = Math.min(
    cards.length - 1,
    Math.floor(rng() * cards.length),
  );
  cards[replaceIndex] = pickRandom(rng, upgrades);
}

/** Prüft die Typ-Mischung: höchstens MAX_SAME_TYPE Karten pro Typ. */
function hasTypeMix(cards: CardDef[]): boolean {
  const counts = new Map<CardType, number>();
  for (const card of cards) {
    const count = (counts.get(card.type) ?? 0) + 1;
    if (count > MAX_SAME_TYPE) {
      return false;
    }
    counts.set(card.type, count);
  }
  return true;
}

/**
 * Zieht den Tages-Booster (5 Karten) deterministisch aus dem Datum.
 * dateISO: Datum im ISO-Format, z. B. "2026-11-19".
 */
export function dailyBooster(dateISO: string, pool: CardDef[] = CARD_POOL): CardDef[] {
  if (pool.length === 0) {
    return [];
  }
  const rng = mulberry32(hashSeed(`satzmeister:${dateISO}`));
  let lastAttempt: CardDef[] = [];
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const cards: CardDef[] = [];
    for (let i = 0; i < BOOSTER_SIZE; i++) {
      cards.push(drawCard(rng, pool));
    }
    ensureUncommonOrBetter(rng, pool, cards);
    lastAttempt = cards;
    if (hasTypeMix(cards)) {
      return cards;
    }
  }
  return lastAttempt;
}

/**
 * Darf heute ein Booster geöffnet werden?
 * Vergleicht nur die Datumsanteile (erste 10 Zeichen, "YYYY-MM-DD").
 */
export function canOpenBoosterToday(
  lastOpenedISO: string | null,
  todayISO: string,
): boolean {
  if (lastOpenedISO === null) {
    return true;
  }
  return lastOpenedISO.slice(0, 10) !== todayISO.slice(0, 10);
}
