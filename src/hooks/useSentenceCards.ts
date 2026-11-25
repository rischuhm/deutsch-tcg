import { useState } from 'react';
import type { CardInstance } from '../game';
import { MAX_SENTENCE } from '../lib/ui';

export function useSentenceCards(initialHand: CardInstance[]) {
  const [hand, setHand] = useState(initialHand);
  const [played, setPlayed] = useState<CardInstance[]>([]);
  const [inspect, setInspect] = useState<{ instance: CardInstance; source: 'hand' | 'played' } | null>(null);

  const play = (instance: CardInstance) => {
    if (played.length >= MAX_SENTENCE) return;
    setHand((cards) => cards.filter((card) => card.instanceId !== instance.instanceId));
    setPlayed((cards) => [...cards, instance]);
    setInspect(null);
  };
  const returnToHand = ({ instanceId, defId, isPlural }: CardInstance) => {
    setPlayed((cards) => cards.filter((card) => card.instanceId !== instanceId));
    setHand((cards) => [...cards, { instanceId, defId, isPlural }]);
    setInspect(null);
  };
  const update = (instance: CardInstance) => {
    setPlayed((cards) => cards.map((card) => card.instanceId === instance.instanceId ? instance : card));
  };
  const movePlayed = (instanceId: string, targetId: string) => {
    if (instanceId === targetId) return;
    setPlayed((cards) => {
      const from = cards.findIndex((card) => card.instanceId === instanceId);
      const to = cards.findIndex((card) => card.instanceId === targetId);
      if (from < 0 || to < 0) return cards;

      const reordered = [...cards];
      const [card] = reordered.splice(from, 1);
      reordered.splice(to, 0, card!);
      return reordered;
    });
  };
  const reset = (nextHand = initialHand) => {
    setHand(nextHand);
    setPlayed([]);
    setInspect(null);
  };

  return { hand, played, inspect, setInspect, play, returnToHand, update, movePlayed, reset };
}
