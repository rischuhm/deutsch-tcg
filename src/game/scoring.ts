/**
 * SatzMeister — Scoring.
 * Basis 10 Punkte, +2 pro Karte ab der 3. Karte, plus Feature-Boni.
 * Ungültige Sätze geben 0 Punkte mit Hinweis.
 */

import type { Feature, ValidationResult } from './types';

export interface ScoreBreakdownEntry {
  label: string;
  points: number;
}

export interface ScoreResult {
  total: number;
  breakdown: ScoreBreakdownEntry[];
  /** Hinweis für den Spieler, wenn der Satz nicht gültig ist. */
  hint?: string;
}

const BASE_POINTS = 10;
const LENGTH_BONUS_PER_CARD = 2;
const LENGTH_BONUS_FROM_CARD = 3;
/** Bonus pro korrekt platziertem Steinchen (Person am Verb, Kasus am Nomen). */
const CHIP_BONUS = 3;

const FEATURE_BONUS: Record<Feature, { label: string; points: number }> = {
  aussagesatz: { label: 'Aussagesatz', points: 0 },
  frage: { label: 'Fragesatz', points: 5 },
  modal: { label: 'Modalverb', points: 8 },
  perfekt: { label: 'Perfekt', points: 10 },
  praeposition: { label: 'Präposition', points: 6 },
  plural: { label: 'Plural', points: 4 },
  adjektiv: { label: 'Adjektiv', points: 3 },
  pronomen: { label: 'Pronomen', points: 2 },
};

export function scoreSentence(
  validation: ValidationResult,
  cardCount: number,
): ScoreResult {
  if (!validation.valid) {
    return {
      total: 0,
      breakdown: [{ label: 'Satz ist noch nicht gültig', points: 0 }],
      hint: validation.errors[0] ?? 'Der Satz ist noch nicht gültig.',
    };
  }

  const breakdown: ScoreBreakdownEntry[] = [
    { label: 'Basis', points: BASE_POINTS },
  ];
  let total = BASE_POINTS;

  if (cardCount >= LENGTH_BONUS_FROM_CARD) {
    const lengthPoints =
      LENGTH_BONUS_PER_CARD * (cardCount - (LENGTH_BONUS_FROM_CARD - 1));
    breakdown.push({
      label: `Satzlänge (${cardCount} Karten)`,
      points: lengthPoints,
    });
    total += lengthPoints;
  }

  for (const feature of validation.features) {
    const bonus = FEATURE_BONUS[feature];
    if (bonus.points > 0) {
      breakdown.push({ label: bonus.label, points: bonus.points });
      total += bonus.points;
    }
  }

  if (validation.correctChips > 0) {
    const chipPoints = CHIP_BONUS * validation.correctChips;
    breakdown.push({
      label: `Steinchen (${validation.correctChips}× richtige Form)`,
      points: chipPoints,
    });
    total += chipPoints;
  }

  return { total, breakdown };
}
