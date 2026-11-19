/**
 * SatzMeister — Satz-Validator (A1-lenient).
 * Prüft die Validierungsregeln 1–7 aus der SPEC und sammelt Features
 * für das Scoring. Fehlermeldungen sind auf Deutsch und freundlich
 * formuliert (Lernkontext).
 */

import type { CardDef, CardInstance, Feature, ValidationResult } from './types';
import { POOL_BY_ID } from './cards';

interface PlayedCard {
  def: CardDef;
  isPlural: boolean;
}

/** Kanonische Reihenfolge der Features im Ergebnis. */
const FEATURE_ORDER: Feature[] = [
  'aussagesatz',
  'frage',
  'modal',
  'perfekt',
  'praeposition',
  'plural',
  'adjektiv',
  'pronomen',
];

function isVerbLike(def: CardDef): boolean {
  return def.type === 'verb' || def.type === 'modal';
}

/**
 * Validiert die auf der Satzleiste liegenden Karten.
 * @param played Karten in Spielreihenfolge.
 * @param pool   Kartenpool zum Auflösen der defIds (Standard: echter Pool).
 */
export function validateSentence(
  played: CardInstance[],
  pool: ReadonlyMap<string, CardDef> = POOL_BY_ID,
): ValidationResult {
  const errors: string[] = [];
  const features = new Set<Feature>();

  const finish = (): ValidationResult => ({
    valid: errors.length === 0,
    errors,
    features: FEATURE_ORDER.filter((f) => features.has(f)),
  });

  if (played.length === 0) {
    errors.push('Lege zuerst Karten auf die Satzleiste.');
    return finish();
  }

  // defIds auflösen
  const cards: PlayedCard[] = [];
  for (const instance of played) {
    const def = pool.get(instance.defId);
    if (!def) {
      errors.push('Eine dieser Karten kenne ich noch nicht.');
      return finish();
    }
    cards.push({ def, isPlural: instance.isPlural === true });
  }

  const lastIndex = cards.length - 1;
  const hasQuestionAtStart = cards[0]?.def.type === 'question';
  if (hasQuestionAtStart) {
    features.add('frage');
  }

  // Regel 1: Fragewort nur an Position 0
  for (let i = 1; i < cards.length; i++) {
    if (cards[i]?.def.type === 'question') {
      errors.push('Das Fragewort steht nur ganz am Anfang des Satzes.');
      break;
    }
  }

  // Verbpositionen bestimmen: ein Verb am Satzende wird als
  // Infinitiv bzw. Partizip II gewertet, wenn es ein weiteres Verb gibt.
  const verbIndices: number[] = [];
  cards.forEach((card, index) => {
    if (isVerbLike(card.def)) {
      verbIndices.push(index);
    }
  });

  let endVerbIndex = -1;
  if (verbIndices.length >= 2 && cards[lastIndex]?.def.type === 'verb') {
    endVerbIndex = lastIndex;
  }
  const finiteCandidates = verbIndices.filter((i) => i !== endVerbIndex);
  const finiteIndex = finiteCandidates.length > 0 ? (finiteCandidates[0] as number) : -1;

  // Regel 2/6: finites Verb vorhanden und an der richtigen Position
  if (finiteIndex === -1) {
    errors.push('Dem Satz fehlt ein finites Verb (z. B. „ist“ oder „komme“).');
  } else {
    if (hasQuestionAtStart && finiteIndex !== 1) {
      errors.push('Nach dem Fragewort muss das Verb an zweiter Stelle stehen.');
    } else if (!hasQuestionAtStart && finiteIndex !== 0 && finiteIndex !== 1) {
      errors.push('Das Verb muss an zweiter Stelle stehen.');
    }
    if (!hasQuestionAtStart && finiteIndex === 0) {
      // Ja/Nein-Frage: finites Verb ganz vorne erlaubt
      features.add('frage');
    } else if (!hasQuestionAtStart) {
      features.add('aussagesatz');
    }
  }

  // Regel 3: Modalverb ⇒ genau ein weiteres Verb als Infinitiv am Satzende
  const hasModal = cards.some((card) => card.def.type === 'modal');
  if (hasModal) {
    const nonModalVerbIndices = verbIndices.filter(
      (i) => cards[i]?.def.type === 'verb',
    );
    if (nonModalVerbIndices.length === 1 && nonModalVerbIndices[0] === lastIndex) {
      features.add('modal');
    } else {
      errors.push(
        'Nach dem Modalverb brauchst du genau ein Verb im Infinitiv am Satzende.',
      );
    }
  }

  // Regel 4: Hilfsverb (haben/sein) + Partizip II am Satzende ⇒ perfekt
  if (finiteIndex >= 0 && endVerbIndex >= 0) {
    const finiteDef = cards[finiteIndex]?.def;
    const endDef = cards[endVerbIndex]?.def;
    if (
      finiteDef &&
      endDef &&
      finiteDef.canBeAuxiliary === true &&
      endDef.conjugation?.aux !== undefined &&
      endDef.conjugation.aux === finiteDef.word
    ) {
      features.add('perfekt');
    }
  }

  // Regel 5: Präposition muss direkt von Nomen oder Pronomen gefolgt werden
  let prepositionOk = false;
  let prepositionFailed = false;
  cards.forEach((card, index) => {
    if (card.def.type !== 'preposition') {
      return;
    }
    const next = cards[index + 1];
    if (next && (next.def.type === 'noun' || next.def.type === 'pronoun')) {
      prepositionOk = true;
    } else {
      prepositionFailed = true;
    }
  });
  if (prepositionFailed) {
    errors.push(
      'Nach einer Präposition muss direkt ein Nomen oder Pronomen stehen (z. B. „in der Schule“).',
    );
  } else if (prepositionOk) {
    features.add('praeposition');
  }

  // Regel 6: Subjekt vorhanden (vor dem finiten Verb; bei Fragen auch dahinter)
  if (finiteIndex >= 0) {
    const isQuestion = hasQuestionAtStart || finiteIndex === 0;
    const subjectIndex = cards.findIndex(
      (card) => card.def.type === 'pronoun' || card.def.type === 'noun',
    );
    const hasSubject =
      subjectIndex >= 0 && (subjectIndex < finiteIndex || isQuestion);
    if (!hasSubject) {
      errors.push(
        'Dem Satz fehlt ein Subjekt (z. B. „ich“, „du“ oder ein Nomen).',
      );
    }
  }

  // Regel 7 + weitere Features
  if (cards.some((card) => card.def.type === 'adjective')) {
    features.add('adjektiv');
  }
  if (cards.some((card) => card.def.type === 'pronoun')) {
    features.add('pronomen');
  }
  if (cards.some((card) => card.def.type === 'noun' && card.isPlural)) {
    features.add('plural');
  }

  return finish();
}
