import type { CardDef, CardInstance, Feature, GermanCase, ValidationResult } from './types';
import { POOL_BY_ID } from './cards';
import { cardWord, nounForm, pronounForm, verbWord } from './forms';

const FEATURE_ORDER: Feature[] = [
  'aussagesatz', 'frage', 'modal', 'perfekt', 'praeposition', 'plural', 'adjektiv', 'pronomen',
];
const isVerb = (def: CardDef) => def.type === 'verb' || def.type === 'modal';
const isNominal = (def: CardDef) => def.type === 'noun' || def.type === 'pronoun';

/** Prüft die Satzmuster, die mit den Karten im Spiel gebaut werden können. */
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
    features: FEATURE_ORDER.filter((feature) => features.has(feature)),
    correctChips,
  });

  if (!played.length) {
    errors.push('Lege zuerst Karten auf die Satzleiste.');
    return finish();
  }

  const cards = played.flatMap((instance) => {
    const def = pool.get(instance.defId);
    return def ? [{ def, instance }] : [];
  });
  if (cards.length !== played.length) {
    errors.push('Eine dieser Karten kenne ich noch nicht.');
    return finish();
  }

  const first = cards[0]!;
  const last = cards.at(-1)!;
  const question = first.def.type === 'question' || isVerb(first.def);
  features.add(question ? 'frage' : 'aussagesatz');
  if (cards.slice(1).some(({ def }) => def.type === 'question')) {
    errors.push('Lege das Fragewort an den Satzanfang.');
  }

  const finiteIndex = isVerb(first.def) ? 0 : 1;
  const finite = cards[finiteIndex];
  if (!finite || !isVerb(finite.def) || finite.instance.chosenVerbForm) {
    errors.push(question && first.def.type === 'question'
      ? 'Direkt nach dem Fragewort brauchst du ein konjugiertes Verb.'
      : 'Die konjugierte Verbform steht an erster Stelle in Ja/Nein-Fragen und sonst an zweiter Stelle.');
    return finish();
  }

  const tail = cards.slice(finiteIndex + 1).filter(({ def }) => isVerb(def));
  const end = tail[0];
  const prefix = finite.def.conjugation?.prefix;
  const particles = cards.filter(({ def }) => def.type === 'particle');
  if (prefix && (last.def.word !== prefix || last.def.type !== 'particle' || particles.length !== 1)) {
    errors.push(`Lege den Verbzusatz „${prefix}“ ans Satzende.`);
  } else if (!prefix && particles.length) {
    errors.push('Der Verbzusatz braucht ein passendes trennbares Verb.');
  }

  if (tail.length > 1 || (end && end !== last)) {
    errors.push('Lege höchstens eine zweite Verbkarte und setze sie ans Satzende.');
  } else if (finite.def.type === 'modal') {
    if (end?.def.type !== 'verb' || end.instance.chosenVerbForm !== 'infinitive') {
      errors.push('Wähle am Satzende das Infinitiv-Steinchen zum Modalverb.');
    } else {
      features.add('modal');
      correctChips++;
    }
  } else if (end) {
    if (end.instance.chosenVerbForm !== 'participle2') {
      errors.push('Wähle für das Perfekt das Partizip-II-Steinchen am Satzende.');
    } else if (!finite.def.canBeAuxiliary || end.def.conjugation?.aux !== finite.def.word) {
      const aux = end.def.conjugation?.aux;
      errors.push(`„${verbWord(end.def, 'participle2')}“ braucht im Perfekt das Hilfsverb „${aux ?? 'haben oder sein'}“.`);
    } else {
      features.add('perfekt');
      correctChips++;
    }
  }

  const subjectIndex = isNominal(first.def) ? 0 : finiteIndex + 1;
  const subject = cards[subjectIndex];
  const hasSubject = subject !== undefined && isNominal(subject.def);
  const subjectQuestion = !hasSubject && first.def.type === 'question' && ['wer', 'was'].includes(first.def.word);
  if (subjectQuestion || hasSubject) {
    const legacyPerson = subject?.def.forms?.length === 1 ? subject.def.forms[0] : undefined;
    const required = subjectQuestion ? 'er' : subject.def.person
      ?? (legacyPerson === 'ich' || legacyPerson === 'du' || legacyPerson === 'wir' ? legacyPerson : undefined)
      ?? (subject.instance.isPlural ? 'sie' : 'er');
    const form = finite.def.conjugation?.praesens[required] ?? finite.def.word;
    if (!finite.instance.chosenPerson) {
      errors.push(`Lege ein Person-Steinchen auf „${finite.def.word}“. Welche Präsensform passt zum Subjekt?`);
    } else if (finite.instance.chosenPerson !== required) {
      errors.push(`Zum Subjekt passt die Präsensform „${form}“. Verschiebe das Steinchen auf „${finite.def.word}“.`);
    } else {
      correctChips++;
    }
  } else {
    errors.push('Ergänze ein Subjekt direkt vor oder direkt nach dem konjugierten Verb.');
  }

  if (cards.some(({ def }, index) => def.type === 'preposition' && !isNominal(cards[index + 1]?.def ?? def))) {
    errors.push('Lege nach der Präposition direkt ein Nomen oder Pronomen.');
  }

  cards.forEach(({ def, instance }, index) => {
    if (def.type === 'adjective') {
      features.add('adjektiv');
      if (isNominal(cards[index + 1]?.def ?? def)) {
        errors.push('Spiele Adjektive hier als Beschreibung nach „sein“, zum Beispiel „Der Tisch ist hoch“.');
      }
    }
    if (def.type === 'preposition') features.add('praeposition');
    if (!isNominal(def)) return;
    if (def.type === 'pronoun') features.add('pronomen');
    if (instance.isPlural) features.add('plural');

    const prep = cards[index - 1]?.def;
    const mainVerb = end?.def ?? finite.def;
    const subjectOrPredicate = (index === subjectIndex && !subjectQuestion) || mainVerb.word === 'sein';
    const expected: GermanCase = prep?.type === 'preposition'
      ? prep.case === 'Wechselpräposition'
        ? mainVerb.direction || ['gehen', 'kommen'].includes(mainVerb.word)
          ? instance.chosenCase === 'Dativ' ? 'Dativ' : 'Akkusativ'
          : 'Dativ'
        : prep.case ?? 'Akkusativ'
      : subjectOrPredicate
        ? 'Nominativ'
        : mainVerb.objectCase ?? 'Akkusativ';

    // Alte Kartendefinitionen ohne Pronomenparadigma bleiben lesbar.
    if (def.type === 'pronoun' && !def.pronouns && !instance.chosenCase) return;

    const variants = Object.keys(def.pronouns ?? {});
    const variant = instance.chosenPronoun ?? (variants.length === 1 ? variants[0] : undefined);
    if (variants.length && (!variant || !variants.includes(variant))) {
      errors.push(`Wähle auf „${def.word}“ ein Steinchen für das passende Pronomen.`);
      return;
    }
    const form = def.type === 'pronoun'
      ? pronounForm(def, expected, variant)
      : nounForm(def, expected, !!instance.isPlural);
    if (!instance.chosenCase) {
      errors.push(`Lege ein Kasus-Steinchen auf „${def.word}“. Welcher Fall passt hier?`);
    } else if (instance.chosenCase !== expected) {
      errors.push(`Wähle auf „${cardWord(def, instance)}“ den Fall ${expected} („${form}“).`);
    } else {
      correctChips++;
    }
  });

  return finish();
}
