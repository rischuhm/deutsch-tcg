import { describe, expect, it } from 'vitest';
import { ADVANCED_LEVELS, CURRICULUM, isCourseLessonUnlocked } from '../curriculum';
import { matchesExercise, orderedOptions } from '../exercises';
import { STORY_LESSONS } from '../story';

describe('A2–C1', () => {
  it('speichert Fortschritt mit eindeutigen IDs neben den bestehenden A1-Lektionen', () => {
    const ids = [...STORY_LESSONS, ...ADVANCED_LEVELS.flatMap((level) => CURRICULUM[level].lessons)].map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(ADVANCED_LEVELS)('%s hat eine vollständige Abfolge mit lösbaren Aufgaben', (level) => {
    const { lessons } = CURRICULUM[level];
    expect(lessons).toHaveLength(10);
    const completed = new Set(['l01-nouns']);
    const formats = new Set<string>();
    lessons.forEach((lesson, index) => {
      expect(isCourseLessonUnlocked(lessons, index, completed)).toBe(true);
      expect(isCourseLessonUnlocked(lessons, index + 1, completed)).toBe(false);
      expect(lesson.exercises).toHaveLength(3);
      lesson.exercises.forEach((exercise) => {
        formats.add(exercise.kind === 'practice' ? exercise.mode : exercise.kind === 'order' ? 'order' : exercise.listen ? 'listen' : 'choice');
        if (exercise.kind === 'practice') {
          expect(new Set(exercise.criteria).size).toBe(exercise.criteria.length);
          expect(exercise.model).not.toBe('');
          return;
        }

        const answer = exercise.kind === 'choice' ? [exercise.answer] : exercise.answer;
        const values = exercise.kind === 'choice' ? [...answer, ...exercise.alternatives] : answer;
        const options = orderedOptions(values, exercise.question);
        expect([...options].sort()).toEqual([...values].sort());
        expect(options).not.toEqual(values);
        expect(matchesExercise(exercise, answer)).toBe(true);
        expect(matchesExercise(exercise, [])).toBe(false);
        if (exercise.kind === 'choice') {
          expect(new Set(values).size).toBe(values.length);
          exercise.alternatives.forEach((wrong) => expect(matchesExercise(exercise, [wrong])).toBe(false));
        } else {
          expect(matchesExercise(exercise, options)).toBe(false);
        }
      });
      completed.add(lesson.id);
    });
    expect(formats).toEqual(new Set(['choice', 'listen', 'order', 'write', 'speak']));
  });
});
