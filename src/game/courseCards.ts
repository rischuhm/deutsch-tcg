import { getCard } from './cards';
import { lexicalCard } from './courseLexicon';
import { ADJECTIVE_DEGREES, cardWord, nounForm, PERSON_LABELS, VERB_FORMS } from './forms';
import type { AdjectiveDegree, CardDef, CardInstance, CardType, GermanCase, Person, VerbForm } from './types';

type Chip = Partial<Pick<CardInstance, 'chosenPerson' | 'chosenCase' | 'chosenPronoun'
  | 'chosenVerbForm' | 'chosenAdjectiveDegree' | 'chosenLessonForm'>>;

export interface CoursePiece {
  definition: CardDef;
  chip?: Chip;
  plural?: boolean;
  punctuation?: string;
}

export interface CardExercise {
  kind: 'cards';
  question: string;
  feedback: string;
  pieces: CoursePiece[];
  endMark: string;
  model: string;
}

const CASES: Record<string, GermanCase | undefined> = {
  N: 'Nominativ', A: 'Akkusativ', D: 'Dativ', G: 'Genitiv',
};
const personalPronouns: Record<string, [string, string, GermanCase] | undefined> = {
  ich: ['pron.ich', 'ich', 'Nominativ'],
  mich: ['pron.ich', 'ich', 'Akkusativ'],
  mir: ['pron.ich', 'ich', 'Dativ'],
  du: ['pron.du', 'du', 'Nominativ'],
  wir: ['pron.wir', 'wir', 'Nominativ'],
  uns: ['pron.wir', 'wir', 'Akkusativ'],
  er: ['pron.er_sie_es', 'er', 'Nominativ'],
  es: ['pron.er_sie_es', 'es', 'Nominativ'],
  Sie: ['pron.sie_formal', 'Sie', 'Nominativ'],
};

function pronounPiece(surface: string, selection?: string): CoursePiece {
  const person = personalPronouns[surface];
  if (person) {
    const [id, variant, defaultCase] = person;
    return {
      definition: getCard(id)!,
      chip: { chosenPronoun: variant, chosenCase: CASES[selection ?? ''] ?? defaultCase },
    };
  }

  const base = lexicalCard('pronoun', surface);
  if (surface === 'sich') {
    return { definition: { ...base, explanation: 'Reflexivpronomen der dritten Person. Dativ und Akkusativ lauten „sich“.' } };
  }
  if (surface === 'alle') {
    return { definition: { ...base, pronouns: { alle: {
      Nominativ: 'alle', Akkusativ: 'alle', Dativ: 'allen', Genitiv: 'aller',
    } } }, chip: { chosenPronoun: 'alle', chosenCase: 'Nominativ' } };
  }
  if (surface === 'etwas') {
    return { definition: { ...base, explanation: 'Unveränderliches Indefinitpronomen.' } };
  }

  const gender = surface === 'die' ? selection === 'pl' ? 'Plural' : 'Femininum'
    : surface === 'das' ? 'Neutrum' : 'Maskulinum';
  const forms = {
    Maskulinum: { Nominativ: 'der', Akkusativ: 'den', Dativ: 'dem', Genitiv: 'dessen' },
    Femininum: { Nominativ: 'die', Akkusativ: 'die', Dativ: 'der', Genitiv: 'deren' },
    Neutrum: { Nominativ: 'das', Akkusativ: 'das', Dativ: 'dem', Genitiv: 'dessen' },
    Plural: { Nominativ: 'die', Akkusativ: 'die', Dativ: 'denen', Genitiv: 'deren' },
  }[gender];
  const chosenCase = surface === 'den' ? 'Akkusativ' : surface === 'dem' ? 'Dativ' : 'Nominativ';
  const variant = forms.Nominativ;
  return {
    definition: { ...base, word: variant, id: `lesson.pronoun.${variant}.${gender}`, pronouns: { [variant]: forms },
      translation: undefined },
    chip: { chosenPronoun: variant, chosenCase },
  };
}

/** Eine Karte pro Wort. Bei Nomen bezeichnen N/A/D/G den Singular, n/a/d/g den Plural. */
export function word(type: CardType, lemma: string, selection?: string, punctuation?: string): CoursePiece {
  if (type === 'pronoun') return { ...pronounPiece(lemma, selection), punctuation };

  const definition = lexicalCard(type, lemma);
  if (type === 'noun' && selection) {
    const chosenCase = CASES[selection.toUpperCase()];
    if (!chosenCase) throw new Error(`Unbekannter Kasus für „${lemma}“: ${selection}.`);
    return { definition, plural: selection === selection.toLowerCase(), chip: { chosenCase }, punctuation };
  }
  if (definition.conjugation && selection) {
    const chip: Chip = selection in PERSON_LABELS ? { chosenPerson: selection as Person }
      : selection in VERB_FORMS ? { chosenVerbForm: selection as VerbForm }
      : { chosenLessonForm: selection };
    return { definition, chip, punctuation };
  }
  if (type === 'adjective' && selection) {
    const chip: Chip = definition.comparison && selection in ADJECTIVE_DEGREES
      ? { chosenAdjectiveDegree: selection as AdjectiveDegree }
      : { chosenLessonForm: selection === 'positive' ? 'Grundform' : selection };
    return { definition, chip, punctuation };
  }
  return { definition, punctuation };
}

export function cards(question: string, model: string, feedback: string, pieces: CoursePiece[]): CardExercise {
  return { kind: 'cards', question, model, feedback, endMark: model.slice(-1), pieces };
}

export function prepareCourseCards(exercise: CardExercise) {
  const definitions = new Map<string, CardDef>();
  const solution = exercise.pieces.map(({ definition, chip, plural, punctuation }, index): CardInstance => {
    const { id } = definition;
    const defId = punctuation ? `${id}:${punctuation}` : id;
    definitions.set(defId, { ...definition, id: defId, punctuation });
    return { instanceId: `course-${index}`, defId, isPlural: plural, ...chip };
  });
  const hand = solution.map(({ instanceId, defId, isPlural }) => ({ instanceId, defId, isPlural }));
  return { definitions, solution, hand };
}

export function checkCourseCards(played: CardInstance[], solution: CardInstance[], definitions: ReadonlyMap<string, CardDef>): string {
  if (played.length !== solution.length) return `Für den Mustersatz brauchst du ${solution.length} Karten.`;
  if (played.some((card, i) => card.defId !== solution[i]?.defId || !!card.isPlural !== !!solution[i]?.isPlural)) {
    return 'Die Reihenfolge weicht vom Mustersatz ab. Du kannst die Karten auf der Satzleiste verschieben.';
  }
  const index = played.findIndex((card, i) => {
    const expected = solution[i]!;
    return card.chosenPerson !== expected.chosenPerson || card.chosenCase !== expected.chosenCase
      || card.chosenPronoun !== expected.chosenPronoun || card.chosenVerbForm !== expected.chosenVerbForm
      || card.chosenAdjectiveDegree !== expected.chosenAdjectiveDegree || card.chosenLessonForm !== expected.chosenLessonForm;
  });
  if (index < 0) return '';
  const expected = solution[index]!;
  const definition = definitions.get(expected.defId)!;
  const label = expected.chosenLessonForm ?? expected.chosenCase
    ?? (expected.chosenPerson && PERSON_LABELS[expected.chosenPerson])
    ?? (expected.chosenVerbForm && VERB_FORMS[expected.chosenVerbForm])
    ?? (expected.chosenAdjectiveDegree && ADJECTIVE_DEGREES[expected.chosenAdjectiveDegree]);
  return `Prüfe das Steinchen auf Karte ${index + 1} („${definition.word}“). Hier passt ${label ? `„${label}“ mit „${definition.type === 'noun' ? nounForm(definition, expected.chosenCase ?? 'Nominativ', !!expected.isPlural) : cardWord(definition, expected)}“` : 'die Grundform ohne Steinchen'}.`;
}
