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
  const reset = (nextHand = initialHand) => {
    setHand(nextHand);
    setPlayed([]);
    setInspect(null);
  };

  return { hand, played, inspect, setInspect, play, returnToHand, update, reset };
}
