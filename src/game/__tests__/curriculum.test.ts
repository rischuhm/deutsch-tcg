import { describe, expect, it } from 'vitest';
import { ADVANCED_LEVELS, CURRICULUM, earnedLessonDecks, isCourseLessonUnlocked } from '../curriculum';
import { checkCourseCards, prepareCourseCards, word } from '../courseCards';
import { CASE_ORDER, cardWord, hasFormChip, nounForm, PERSON_ORDER } from '../forms';
import { sentenceText } from '../../lib/ui';
import { STORY_LESSONS } from '../story';

describe('A2–C1', () => {
  it('speichert Fortschritt mit eindeutigen IDs neben den bestehenden A1-Lektionen', () => {
    const ids = [...STORY_LESSONS, ...ADVANCED_LEVELS.flatMap((level) => CURRICULUM[level].lessons)].map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('schaltet nur abgeschlossene Lektionsdecks frei und erhält vorhandenen Fortschritt', () => {
    const ids = new Set(['l01-nouns', 'a2-termin', 'c1-abschluss', 'unbekannt']);
    expect(earnedLessonDecks(ids).map(({ level, lesson }) => [level, lesson.id])).toEqual([
      ['A1', 'l01-nouns'], ['A2', 'a2-termin'], ['C1', 'c1-abschluss'],
    ]);
  });

  it('zeigt die volle Deklination und legt trotzdem nur das einzelne Nomen', () => {
    const { definition, chip } = word('noun', 'Bahnhof', 'D');
    expect(CASE_ORDER.map((germanCase) => nounForm(definition, germanCase, false))).toEqual([
      'der Bahnhof', 'den Bahnhof', 'dem Bahnhof', 'des Bahnhofs',
    ]);
    expect(CASE_ORDER.map((germanCase) => nounForm(definition, germanCase, true))).toEqual([
      'die Bahnhöfe', 'die Bahnhöfe', 'den Bahnhöfen', 'der Bahnhöfe',
    ]);
    expect(cardWord(definition, { instanceId: 'test', defId: definition.id, ...chip })).toBe('Bahnhof');
  });

  it.each(ADVANCED_LEVELS)('%s hat eine vollständige Abfolge mit lösbaren Aufgaben', (level) => {
    const { lessons } = CURRICULUM[level];
    expect(lessons).toHaveLength(10);
    const completed = new Set(['l01-nouns']);
    lessons.forEach((lesson, index) => {
      expect(isCourseLessonUnlocked(lessons, index, completed)).toBe(true);
      expect(isCourseLessonUnlocked(lessons, index + 1, completed)).toBe(false);
      expect(lesson.exercises).toHaveLength(3);
      expect(lesson.rule.trim(), lesson.id).not.toBe('');
      lesson.exercises.forEach((exercise) => {
        expect(exercise.kind, lesson.id).toBe('cards');
        expect(exercise.feedback.trim(), lesson.id).not.toBe('');
        const { solution, hand, definitions } = prepareCourseCards(exercise);
        expect(solution.length, lesson.id).toBeGreaterThanOrEqual(3);
        expect(solution.some(hasFormChip), lesson.id).toBe(true);
        expect(hand.some(hasFormChip), lesson.id).toBe(false);
        expect(sentenceText(solution, true, definitions, exercise.endMark), lesson.id).toBe(exercise.model);
        expect(solution, lesson.id).toHaveLength(exercise.model.trim().split(/\s+/).length);
        for (const card of solution) {
          const def = definitions.get(card.defId)!;
          expect(cardWord(def, card), lesson.id).toMatch(/^\S+$/);
          if (def.type === 'noun') {
            expect(card.chosenCase, lesson.id).toBeDefined();
            for (const plural of [false, true]) {
              if (!def.declension?.[plural ? 'nom_pl' : 'nom_sg']) continue;
              for (const germanCase of CASE_ORDER) {
                expect(nounForm(def, germanCase, plural), lesson.id).toMatch(/^(der|die|das|den|dem|des) \S+$/);
              }
            }
          }
          if (def.type === 'preposition') expect(def.case || def.explanation, def.word).toBeTruthy();
          if (def.type === 'adjective') expect(def.lessonForms?.['Endung -en'], def.word).toBeTruthy();
          if (def.type === 'verb' || def.type === 'modal') {
            expect(def.conjugation?.partizip1, def.word).toBeTruthy();
            expect(def.conjugation?.partizip2, def.word).toBeTruthy();
            for (const person of PERSON_ORDER) expect(def.conjugation?.praesens[person], def.word).toBeTruthy();
          }
        }

        expect(checkCourseCards(solution, solution, definitions), lesson.id).toBe('');
        expect(checkCourseCards(hand, solution, definitions), lesson.id).toContain('Steinchen');
        const reversed = [...solution].reverse();
        expect(checkCourseCards(reversed, solution, definitions), lesson.id).toContain('Reihenfolge');
      });
      completed.add(lesson.id);
    });
  });
});
