/**
 * SatzMeister — Kartenpool-Zugriff.
 * Lädt den echten Kartenpool und das Starter-Deck aus den JSON-Daten.
 * (Build: Vite + TypeScript mit resolveJsonModule.)
 */

import type { CardDef } from './types';
import cardsJson from './data/cards.json' with { type: 'json' };
import starterDeckJson from './data/starter_deck.json' with { type: 'json' };

export const CARD_POOL: CardDef[] = cardsJson as unknown as CardDef[];

export const STARTER_DECK: string[] = starterDeckJson as unknown as string[];

export const POOL_BY_ID: ReadonlyMap<string, CardDef> = new Map(
  CARD_POOL.map((card) => [card.id, card]),
);

export function getCard(id: string): CardDef | undefined {
  return POOL_BY_ID.get(id);
}
