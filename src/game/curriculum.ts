import { a2 } from './data/curriculum/a2';
import { b1 } from './data/curriculum/b1';
import { b2 } from './data/curriculum/b2';
import { c1 } from './data/curriculum/c1';
import type { Exercise, Level } from './exercises';

export const ADVANCED_LEVELS = ['A2', 'B1', 'B2', 'C1'] as const;
export type AdvancedLevel = (typeof ADVANCED_LEVELS)[number];

export interface CourseLesson {
  id: string;
  chapter: string;
  title: string;
  scene: string;
  rule: string;
  exercises: Exercise[];
}

export const CURRICULUM: Record<AdvancedLevel, Level> = { A2: a2, B1: b1, B2: b2, C1: c1 };

export function isCourseLessonUnlocked(lessons: readonly CourseLesson[], index: number, completed: ReadonlySet<string>) {
  const lesson = lessons[index];
  return !!lesson && (completed.has(lesson.id) || lessons.slice(0, index).every(({ id }) => completed.has(id)));
}
