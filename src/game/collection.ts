/**
 * SatzMeister — Sammlung (Collection) des Spielers.
 * Collection = Record<defId, Anzahl>.
 * Alle Funktionen arbeiten immutable und geben eine neue Collection zurück.
 */

import type { CardDef } from './types';
import { POOL_BY_ID, STARTER_DECK } from './cards';

export type Collection = Record<string, number>;

export interface PluralCraftResult {
  collection: Collection;
  defId: string;
  pluralWord: string;
}

export function emptyCollection(): Collection {
  return {};
}

/** Fügt Karten zur Sammlung hinzu (Duplikate erhöhen den Zähler). */
export function addToCollection(col: Collection, defIds: string[]): Collection {
  const next: Collection = { ...col };
  for (const id of defIds) {
    next[id] = (next[id] ?? 0) + 1;
  }
  return next;
}

/** Fügt das komplette Starter-Deck zur Sammlung hinzu. */
export function addStarterDeck(
  col: Collection,
  starterDeck: string[] = STARTER_DECK,
): Collection {
  return addToCollection(col, starterDeck);
}

/**
 * Plural-Schmiede: möglich, wenn die Karte ein Nomen mit plural-Feld ist
 * und mindestens 2 Exemplare in der Sammlung liegen.
 */
export function canCraftPlural(
  col: Collection,
  defId: string,
  pool: ReadonlyMap<string, CardDef> = POOL_BY_ID,
): boolean {
  const def = pool.get(defId);
  return (
    def !== undefined &&
    def.type === 'noun' &&
    typeof def.plural === 'string' &&
    def.plural.length > 0 &&
    (col[defId] ?? 0) >= 2
  );
}

/**
 * Verbraucht 2 Exemplare der Karte und gibt die Plural-Info zurück.
 * Gibt null zurück, wenn das Schmieden nicht möglich ist.
 */
export function craftPlural(
  col: Collection,
  defId: string,
  pool: ReadonlyMap<string, CardDef> = POOL_BY_ID,
): PluralCraftResult | null {
  if (!canCraftPlural(col, defId, pool)) {
    return null;
  }
  const def = pool.get(defId);
  if (!def || typeof def.plural !== 'string') {
    return null;
  }
  const next: Collection = { ...col };
  const remaining = (next[defId] ?? 0) - 2;
  if (remaining > 0) {
    next[defId] = remaining;
  } else {
    delete next[defId];
  }
  return { collection: next, defId, pluralWord: def.plural };
}
