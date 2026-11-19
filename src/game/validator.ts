/**
 * SatzMeister — Satz-Validator (A1-lenient).
 * Prüft die Validierungsregeln 1–7 aus der SPEC und sammelt Features
 * für das Scoring. Fehlermeldungen sind auf Deutsch und freundlich
 * formuliert (Lernkontext).
 */

import type { CardDef, CardInstance, Feature, GermanCase, Person, ValidationResult } from './types';
import { POOL_BY_ID } from './cards';

interface PlayedCard {
  def: CardDef;
  instance: CardInstance;
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

/** Bewegungsverben im A1-Pool: steuern bei Wechselpräpositionen den Akkusativ. */
const MOVEMENT_VERBS = new Set(['gehen', 'kommen']);

/** Welche Person verlangt ein Subjekt am Verb? */
function subjectPerson(subject: PlayedCard): Person {
  if (subject.def.type === 'pronoun') {
    const id = subject.def.id;
    if (id.endsWith('ich')) return 'ich';
    if (id.endsWith('du')) return 'du';
    if (id.endsWith('wir')) return 'wir';
    if (id.endsWith('sie_pl')) return 'sie';
    return 'er'; // er/sie/es
  }
  // Nomen als Subjekt: 3. Person, Plural ⇒ 'sie'
  return subject.isPlural ? 'sie' : 'er';
}

const CASE_KEY: Record<GermanCase, 'nom' | 'akk' | 'dat' | 'gen'> = {
  Nominativ: 'nom',
  Akkusativ: 'akk',
  Dativ: 'dat',
  Genitiv: 'gen',
};

/** Deklinierte Form für Fehlermeldungen, z. B. „den Tisch“. */
function declinedForm(card: PlayedCard, germanCase: GermanCase): string {
  const decl = card.def.declension;
  if (!decl) return card.def.word;
  const key = `${CASE_KEY[germanCase]}_${card.isPlural ? 'pl' : 'sg'}` as const;
  return decl[key] ?? card.def.word;
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
  let correctChips = 0;

  const finish = (): ValidationResult => ({
    valid: errors.length === 0,
    errors,
    features: FEATURE_ORDER.filter((f) => features.has(f)),
    correctChips,
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
    cards.push({ def, instance, isPlural: instance.isPlural === true });
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
  const subjectIndex = cards.findIndex(
    (card) => card.def.type === 'pronoun' || card.def.type === 'noun',
  );
  if (finiteIndex >= 0) {
    const isQuestion = hasQuestionAtStart || finiteIndex === 0;
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

  // Regel 8: Steinchen — richtige Formen wählen
  // 8a) Person-Steinchen am finiten Verb (nur wenn ein Subjekt im Satz liegt)
  const subject = subjectIndex >= 0 ? cards[subjectIndex] : undefined;
  if (finiteIndex >= 0 && subject !== undefined) {
    const finiteCard = cards[finiteIndex] as PlayedCard;
    const required = subjectPerson(subject);
    const chosen = finiteCard.instance.chosenPerson;
    const forms = finiteCard.def.conjugation?.praesens;
    const subjectWord = subject.def.word;
    if (chosen === undefined) {
      errors.push(
        `Lege ein Person-Steinchen auf das Verb „${finiteCard.def.word}“: Welche Form passt zu „${subjectWord}“?`,
      );
    } else if (chosen !== required) {
      const expected = forms?.[required] ?? required;
      const chosenForm = forms?.[chosen] ?? chosen;
      errors.push(
        `Zu „${subjectWord}“ passt die Form „${expected}“ – nicht „${chosenForm}“. Verschiebe das Steinchen!`,
      );
    } else {
      correctChips += 1;
    }
  }

  // 8b) Kasus-Steinchen an Nomen
  cards.forEach((card, index) => {
    if (card.def.type !== 'noun') {
      return;
    }
    let expected: GermanCase;
    if (index === subjectIndex && finiteIndex >= 0) {
      expected = 'Nominativ';
    } else {
      // Steht das Nomen (ggf. nach Adjektiven) hinter einer Präposition?
      let prep: CardDef | undefined;
      for (let j = index - 1; j >= 0; j--) {
        const t = cards[j]?.def.type;
        if (t === 'preposition') {
          prep = cards[j]?.def;
          break;
        }
        if (t !== 'adjective') {
          break;
        }
      }
      if (prep !== undefined) {
        if (prep.case === 'Wechselpräposition') {
          const movement = cards.some(
            (c) => isVerbLike(c.def) && MOVEMENT_VERBS.has(c.def.word),
          );
          expected = movement ? 'Akkusativ' : 'Dativ';
        } else {
          expected = prep.case ?? 'Akkusativ';
        }
      } else {
        // Objekt hinter dem Verb: A1-lenient Akkusativ
        expected = 'Akkusativ';
      }
    }
    const chosen = card.instance.chosenCase;
    if (chosen === undefined) {
      errors.push(
        `Lege ein Kasus-Steinchen auf „${card.def.word}“: Welcher Fall passt hier (z. B. Nominativ „${declinedForm(card, 'Nominativ')}“ oder Akkusativ „${declinedForm(card, 'Akkusativ')}“)?`,
      );
    } else if (chosen !== expected) {
      errors.push(
        `„${card.def.word}“ braucht hier den ${expected} (z. B. „${declinedForm(card, expected)}“) – nicht den ${chosen}. Verschiebe das Steinchen!`,
      );
    } else {
      correctChips += 1;
    }
  });

  return finish();
}
