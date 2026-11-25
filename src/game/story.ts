import type { AdjectiveDegree, CardInstance, GermanCase, Person, VerbForm } from './types';
import { POOL_BY_ID } from './cards';
import { ADJECTIVE_DEGREES, PERSON_LABELS, VERB_FORMS } from './forms';
import { validateSentence } from './validator';
import storyData from './data/story.json';

export interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
}

export interface StoryChipRequirement {
  person?: Person;
  case?: GermanCase;
  pronoun?: string;
  verbForm?: VerbForm;
  adjectiveDegree?: AdjectiveDegree;
}

export interface StoryLesson {
  id: string;
  chapter: number;
  title: string;
  goal: string;
  explanation: string[];
  handCards: string[];
  pluralCards?: string[];
  target: string[];
  chips: Record<string, StoryChipRequirement | undefined>;
  requireValidSentence: boolean;
  targetSentence: string;
}

export interface StoryCheckResult {
  complete: boolean;
  problems: string[];
}

export const STORY_CHAPTERS: StoryChapter[] = storyData.chapters;
export const STORY_LESSONS: StoryLesson[] = storyData.lessons as unknown as StoryLesson[];

export function getLesson(id: string): StoryLesson | undefined {
  return STORY_LESSONS.find((lesson) => lesson.id === id);
}

export function isLessonUnlocked(lessonId: string, completedIds: ReadonlySet<string>): boolean {
  const index = STORY_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return false;
  return completedIds.has(lessonId) || STORY_LESSONS.slice(0, index).every(({ id }) => completedIds.has(id));
}

export function nextLesson(completedIds: ReadonlySet<string>): StoryLesson | undefined {
  return STORY_LESSONS.find(
    (lesson) => !completedIds.has(lesson.id) && isLessonUnlocked(lesson.id, completedIds),
  );
}

export function checkLesson(lesson: StoryLesson, played: CardInstance[]): StoryCheckResult {
  if (played.length !== lesson.target.length) {
    return { complete: false, problems: [`Du brauchst hier ${lesson.target.length} Karten.`] };
  }

  const problems: string[] = [];
  for (const [index, card] of played.entries()) {
    const expectedId = lesson.target[index]!;
    const word = POOL_BY_ID.get(expectedId)?.word ?? expectedId;
    const isPlural = lesson.pluralCards?.includes(expectedId) ?? false;
    if (card.defId !== expectedId || !!card.isPlural !== isPlural) {
      return { complete: false, problems: [`Prüfe Karte ${index + 1}. Hier brauchst du „${word}“${isPlural ? ' im Plural' : ''}.`] };
    }

    const chip = lesson.chips[index];
    if (!chip) continue;
    if (chip.person && chip.person !== card.chosenPerson) {
      problems.push(`Setze das Person-Steinchen auf „${word}“ bei „${PERSON_LABELS[chip.person]}“.`);
    }
    if (chip.case && chip.case !== card.chosenCase) {
      problems.push(`Wähle auf „${word}“ das Kasus-Steinchen „${chip.case}“.`);
    }
    if (chip.pronoun && chip.pronoun !== card.chosenPronoun) {
      problems.push(`Wähle auf „${word}“ die Zeile für „${chip.pronoun}“.`);
    }
    if (chip.verbForm && chip.verbForm !== card.chosenVerbForm) {
      problems.push(`Setze das Steinchen auf „${word}“ bei „${VERB_FORMS[chip.verbForm]}“.`);
    }
    if (chip.adjectiveDegree && chip.adjectiveDegree !== card.chosenAdjectiveDegree) {
      problems.push(`Setze das Steinchen auf „${word}“ bei „${ADJECTIVE_DEGREES[chip.adjectiveDegree]}“.`);
    }
  }

  if (!problems.length && lesson.requireValidSentence) {
    problems.push(...validateSentence(played).errors);
  }
  return { complete: problems.length === 0, problems };
}
