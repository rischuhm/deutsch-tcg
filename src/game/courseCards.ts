import { getCard } from './cards';
import { ADJECTIVE_DEGREES, cardWord, PERSON_LABELS, VERB_FORMS } from './forms';
import type { CardDef, CardInstance } from './types';

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

export function pool(id: string, chip: Chip, { plural, punctuation }: { plural?: boolean; punctuation?: string } = {}): CoursePiece {
  const definition = getCard(id);
  if (!definition) throw new Error(`Unbekannte Lektionskarte: ${id}`);
  return { definition, chip, plural, punctuation };
}

export function form(word: string, type: CardDef['type'], selected: string, forms: Record<string, string>, punctuation?: string): CoursePiece {
  return {
    definition: { id: `lesson.form.${word}`, word, type, lessonForms: forms, rarity: 'common' },
    chip: { chosenLessonForm: selected },
    punctuation,
  };
}

export function cards(question: string, model: string, feedback: string, pieces: (string | CoursePiece)[]): CardExercise {
  return {
    kind: 'cards', question, model, feedback, endMark: model.slice(-1),
    pieces: pieces.map((piece) => typeof piece === 'string' ? {
      definition: { id: `lesson.phrase.${piece}`, word: piece, type: 'phrase', rarity: 'common' },
    } : piece),
  };
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
  return `Prüfe das Steinchen auf Karte ${index + 1} („${definition.word}“). Hier passt ${label ? `„${label}“ mit „${cardWord(definition, expected)}“` : 'die Grundform ohne Steinchen'}.`;
}
