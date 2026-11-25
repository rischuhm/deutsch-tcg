import { describe, expect, it } from 'vitest';
import type { CardInstance } from '../index';
import { validateSentence } from '../index';
import {
  STORY_CHAPTERS,
  STORY_LESSONS,
  checkLesson,
  getLesson,
  isLessonUnlocked,
  nextLesson,
} from '../story';
import { POOL_BY_ID } from '../cards';

/** Baut die perfekte Lösung einer Lektion als CardInstance-Liste. */
function solvedPlayed(lessonId: string): CardInstance[] {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error(`unknown lesson ${lessonId}`);
  return lesson.target.map((defId, i) => {
    const chip = lesson.chips[String(i)];
    return {
      instanceId: `t${i}`,
      defId,
      ...(chip?.person ? { chosenPerson: chip.person } : {}),
      ...(chip?.case ? { chosenCase: chip.case } : {}),
    };
  });
}

describe('story data', () => {
  it('enthält Lektionen in 3 Kapiteln', () => {
    expect(STORY_CHAPTERS).toHaveLength(3);
    expect(STORY_LESSONS.length).toBeGreaterThanOrEqual(8);
  });

  it('jede Lektion nutzt nur existierende Pool-Karten', () => {
    for (const lesson of STORY_LESSONS) {
      for (const defId of [...lesson.handCards, ...lesson.target]) {
        expect(POOL_BY_ID.has(defId), `${lesson.id}: ${defId}`).toBe(true);
      }
      // Zielkarten müssen in der Hand liegen
      for (const defId of lesson.target) {
        expect(lesson.handCards, `${lesson.id}: ${defId} fehlt in der Hand`).toContain(defId);
      }
    }
  });

  it('jede Lektion gehört zu einem existierenden Kapitel', () => {
    const chapterIds = new Set(STORY_CHAPTERS.map((c) => c.id));
    for (const lesson of STORY_LESSONS) {
      expect(chapterIds.has(lesson.chapter), lesson.id).toBe(true);
    }
  });
});

describe('checkLesson', () => {
  it.each(STORY_LESSONS.map((l) => [l.id] as const))(
    'Lektion %s ist mit ihrer Ziellösung lösbar',
    (lessonId) => {
      const lesson = getLesson(lessonId)!;
      const result = checkLesson(lesson, solvedPlayed(lessonId));
      expect(result.problems, result.problems.join(' | ')).toHaveLength(0);
      expect(result.complete).toBe(true);
    },
  );

  it.each(
    STORY_LESSONS.filter((l) => l.requireValidSentence).map((l) => [l.id] as const),
  )('Ziellösung von %s besteht auch den allgemeinen Validator', (lessonId) => {
    const result = validateSentence(solvedPlayed(lessonId));
    expect(result.errors, result.errors.join(' | ')).toHaveLength(0);
    expect(result.valid).toBe(true);
  });

  it('falsches Person-Steinchen → nicht komplett', () => {
    const lesson = getLesson('l04-subject-verb')!;
    const played = solvedPlayed('l04-subject-verb');
    played[1] = { ...played[1]!, chosenPerson: 'du' };
    const result = checkLesson(lesson, played);
    expect(result.complete).toBe(false);
    expect(result.problems.join(' ')).toMatch(/chip/i);
  });

  it('falscher Kasus → nicht komplett', () => {
    const lesson = getLesson('l05-cases')!;
    const played = solvedPlayed('l05-cases');
    played[2] = { ...played[2]!, chosenCase: 'Nominativ' };
    const result = checkLesson(lesson, played);
    expect(result.complete).toBe(false);
  });

  it('falsche Kartenreihenfolge → nicht komplett', () => {
    const lesson = getLesson('l04-subject-verb')!;
    const played: CardInstance[] = [
      { instanceId: 'a', defId: 'verb.kommen', chosenPerson: 'ich' },
      { instanceId: 'b', defId: 'pron.ich' },
    ];
    expect(checkLesson(lesson, played).complete).toBe(false);
  });

  it('fehlende Karten → nicht komplett', () => {
    const lesson = getLesson('l04-subject-verb')!;
    expect(checkLesson(lesson, []).complete).toBe(false);
  });

  it('zu viele Karten (Distraktor mitgespielt) → nicht komplett', () => {
    const lesson = getLesson('l04-subject-verb')!;
    const played = [
      ...solvedPlayed('l04-subject-verb'),
      { instanceId: 'x', defId: 'verb.gehen', chosenPerson: 'ich' as const },
    ];
    expect(checkLesson(lesson, played).complete).toBe(false);
  });
});

describe('Fortschritt', () => {
  const [first, second] = STORY_LESSONS;

  it('erste Lektion ist immer freigeschaltet', () => {
    expect(isLessonUnlocked(first!.id, new Set())).toBe(true);
  });

  it('zweite Lektion erst nach Abschluss der ersten', () => {
    expect(isLessonUnlocked(second!.id, new Set())).toBe(false);
    expect(isLessonUnlocked(second!.id, new Set([first!.id]))).toBe(true);
  });

  it('nextLesson gibt die älteste ungelöste Lektion', () => {
    expect(nextLesson(new Set())?.id).toBe(first!.id);
    expect(nextLesson(new Set([first!.id]))?.id).toBe(second!.id);
    expect(nextLesson(new Set(STORY_LESSONS.map((l) => l.id)))).toBeUndefined();
  });
});
