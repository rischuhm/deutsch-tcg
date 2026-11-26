import { a2 } from './data/curriculum/a2';
import { b1 } from './data/curriculum/b1';
import { b2 } from './data/curriculum/b2';
import { c1 } from './data/curriculum/c1';
import type { Level } from './exercises';
import type { CardExercise } from './courseCards';
import { STORY_LESSONS } from './story';
import type { StoryLesson } from './story';

export const ADVANCED_LEVELS = ['A2', 'B1', 'B2', 'C1'] as const;
export type AdvancedLevel = (typeof ADVANCED_LEVELS)[number];

export interface CourseLesson {
  id: string;
  chapter: string;
  title: string;
  scene: string;
  rule: string;
  exercises: CardExercise[];
}

export const CURRICULUM: Record<AdvancedLevel, Level> = { A2: a2, B1: b1, B2: b2, C1: c1 };

export function isCourseLessonUnlocked(lessons: readonly CourseLesson[], index: number, completed: ReadonlySet<string>) {
  const lesson = lessons[index];
  return !!lesson && (completed.has(lesson.id) || lessons.slice(0, index).every(({ id }) => completed.has(id)));
}

export type LessonDeck = { level: 'A1'; lesson: StoryLesson }
  | { level: AdvancedLevel; lesson: CourseLesson };

/** Ein abgeschlossenes Lektion schaltet seine Karten unabhängig vom Booster frei. */
export function earnedLessonDecks(completed: ReadonlySet<string>): LessonDeck[] {
  const decks: LessonDeck[] = STORY_LESSONS.map((lesson) => ({ level: 'A1', lesson }));
  for (const level of ADVANCED_LEVELS) {
    decks.push(...CURRICULUM[level].lessons.map((lesson) => ({ level, lesson })));
  }
  return decks.filter(({ lesson }) => completed.has(lesson.id));
}
