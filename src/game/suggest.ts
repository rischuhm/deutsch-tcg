/**
 * SatzMeister — Hinweis-Engine: Welcher Kartentyp passt als Nächstes?
 *
 * Leitet aus dem aktuellen Satzstand ab, welche Kartentypen sinnvoll
 * gespielt werden können (A1-Niveau, bewusst lenient wie der Validator).
 * Dient als Lernhilfe — erzwingt nichts, sondern schlägt vor.
 */

import { POOL_BY_ID } from './cards';
import type { CardDef, CardInstance, CardType } from './types';

export interface NextHint {
  /** Kartentypen, die aktuell sinnvoll spielbar sind. */
  types: CardType[];
  /** Lernfreundlicher Hinweistext (Deutsch). */
  text: string;
}

function defOf(instance: CardInstance): CardDef | undefined {
  return POOL_BY_ID.get(instance.defId);
}

/**
 * Schlägt vor, welche Kartentypen als Nächstes gelegt werden können.
 *
 * Regeln (vereinfachte deutsche Satzstruktur, A1):
 * - Satzanfang: Fragewort, Subjekt (Nomen/Pronomen) oder Verb (Ja/Nein-Frage)
 * - Nach Fragewort: nur Verb
 * - Nach Subjekt ohne finites Verb: Verb (Position 2)
 * - Nach Modalverb: Objekt möglich, am Ende Infinitiv nötig
 * - Nach finitem Verb: Objekt/Präposition/Adjektiv
 * - Nach Präposition: Adjektiv, Nomen oder Pronomen
 * - Nach Adjektiv: Adjektiv oder Nomen
 */
export function suggestNext(played: CardInstance[]): NextHint {
  const defs = played
    .map(defOf)
    .filter((d): d is CardDef => d !== undefined);

  if (defs.length === 0) {
    return {
      types: ['question', 'noun', 'pronoun', 'verb', 'modal'],
      text: 'Beginne mit einem Fragewort, einem Subjekt (Nomen/Pronomen) – oder einem Verb für eine Ja/Nein-Frage.',
    };
  }

  const last = defs[defs.length - 1];
  const first = defs[0];
  const hasQuestion = first.type === 'question';
  const finiteIndex = defs.findIndex(
    (d) => d.type === 'verb' || d.type === 'modal',
  );
  const hasFinite = finiteIndex !== -1;
  const hasModal = defs.some((d) => d.type === 'modal');
  const modalIndex = defs.findIndex((d) => d.type === 'modal');

  // Nach Fragewort: nur das Verb.
  if (last.type === 'question') {
    return {
      types: ['verb', 'modal'],
      text: 'Nach dem Fragewort folgt das konjugierte Verb.',
    };
  }

  // Nach Präposition: Adjektiv, Nomen oder Pronomen.
  if (last.type === 'preposition') {
    return {
      types: ['adjective', 'noun', 'pronoun'],
      text: 'Nach der Präposition folgt ein Nomen oder Pronomen – gern auch mit Adjektiv davor.',
    };
  }

  // Nach Adjektiv: weiteres Adjektiv oder Nomen.
  if (last.type === 'adjective') {
    return {
      types: ['adjective', 'noun'],
      text: 'Nach dem Adjektiv folgt ein Nomen (oder ein weiteres Adjektiv).',
    };
  }

  // Fragewort vorhanden, aber noch kein Verb: jetzt muss das Verb kommen.
  if (hasQuestion && !hasFinite) {
    return {
      types: ['verb', 'modal'],
      text: 'Nach dem Fragewort folgt das konjugierte Verb.',
    };
  }

  // Noch kein finites Verb: Subjekt liegt (oder Verb fehlt an Position 1/2).
  if (!hasFinite) {
    return {
      types: ['verb', 'modal'],
      text: 'Jetzt brauchst du ein Verb an zweiter Stelle.',
    };
  }

  // Modalverb gespielt, aber noch kein Infinitiv danach.
  if (hasModal && !defs.slice(modalIndex + 1).some((d) => d.type === 'verb')) {
    return {
      types: ['noun', 'pronoun', 'preposition', 'verb'],
      text: 'Nach dem Modalverb kann noch ein Objekt folgen – am Ende brauchst du einen Infinitiv.',
    };
  }

  // Finites Verb liegt: Objekt, Präpositionalphrase oder Abschluss.
  return {
    types: ['noun', 'pronoun', 'preposition', 'adjective'],
    text: 'Ergänze ein Objekt (Nomen/Pronomen), eine Präposition oder ein Adjektiv – oder prüfe deinen Satz.',
  };
}
