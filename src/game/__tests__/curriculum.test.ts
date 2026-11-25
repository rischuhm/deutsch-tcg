import { describe, expect, it } from 'vitest';
import { ADVANCED_LEVELS, CURRICULUM, isCourseLessonUnlocked } from '../curriculum';
import { matchesExercise, orderedOptions } from '../exercises';
import { checkCourseCards, prepareCourseCards } from '../courseCards';
import { hasFormChip } from '../forms';
import { MAX_SENTENCE, sentenceText } from '../../lib/ui';
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
        formats.add(exercise.kind === 'practice' ? exercise.mode : exercise.kind === 'cards' ? 'cards' : exercise.listen ? 'listen' : 'choice');
        if (exercise.kind === 'practice') {
          expect(new Set(exercise.criteria).size).toBe(exercise.criteria.length);
          expect(exercise.model).not.toBe('');
          return;
        }

        if (exercise.kind === 'cards') {
          const { solution, hand, definitions } = prepareCourseCards(exercise);
          expect(solution.length, lesson.id).toBeLessThanOrEqual(MAX_SENTENCE);
          expect(solution.some(hasFormChip), lesson.id).toBe(true);
          expect(hand.some(hasFormChip), lesson.id).toBe(false);
          expect(sentenceText(solution, true, definitions, exercise.endMark), lesson.id).toBe(exercise.model);
          expect(checkCourseCards(solution, solution, definitions), lesson.id).toBe('');
          expect(checkCourseCards(hand, solution, definitions), lesson.id).toContain('Steinchen');
          const reversed = [...solution].reverse();
          expect(checkCourseCards(reversed, solution, definitions), lesson.id).toContain('Reihenfolge');
          return;
        }

        const values = [exercise.answer, ...exercise.alternatives];
        const options = orderedOptions(values, exercise.question);
        expect([...options].sort()).toEqual([...values].sort());
        expect(options).not.toEqual(values);
        expect(matchesExercise(exercise, exercise.answer)).toBe(true);
        expect(matchesExercise(exercise, null)).toBe(false);
        expect(new Set(values).size).toBe(values.length);
        exercise.alternatives.forEach((wrong) => expect(matchesExercise(exercise, wrong)).toBe(false));
      });
      completed.add(lesson.id);
    });
    expect(formats).toEqual(new Set(['choice', 'listen', 'cards', 'write', 'speak']));
  });
});
