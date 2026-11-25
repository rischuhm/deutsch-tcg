import { describe, expect, it } from 'vitest';
import type { CardInstance } from '../index';
import { hasFormChip, validateSentence } from '../index';
import {
  STORY_CHAPTERS,
  STORY_LESSONS,
  checkLesson,
  getLesson,
  isLessonUnlocked,
  nextLesson,
} from '../story';
import { POOL_BY_ID } from '../cards';
import { sentenceText } from '../../lib/ui';

/** Baut die perfekte Lösung einer Lektion als CardInstance-Liste. */
function solvedPlayed(lessonId: string): CardInstance[] {
  const lesson = getLesson(lessonId);
  if (!lesson) throw new Error(`unknown lesson ${lessonId}`);
  return lesson.target.map((defId, i) => {
    const chip = lesson.chips[String(i)];
    return {
      instanceId: `t${i}`,
      defId,
      isPlural: lesson.pluralCards?.includes(defId),
      chosenPronoun: chip?.pronoun,
      chosenVerbForm: chip?.verbForm,
      chosenAdjectiveDegree: chip?.adjectiveDegree,
      ...(chip?.person ? { chosenPerson: chip.person } : {}),
      ...(chip?.case ? { chosenCase: chip.case } : {}),
    };
  });
}

describe('story data', () => {
  it('enthält Lektionen in 5 Kapiteln', () => {
    expect(STORY_CHAPTERS).toHaveLength(5);
    expect(STORY_LESSONS).toHaveLength(23);
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
      expect(sentenceText(solvedPlayed(lessonId), lesson.requireValidSentence)).toBe(lesson.targetSentence);
    },
  );

  it.each(
    STORY_LESSONS.filter((l) => l.requireValidSentence).map((l) => [l.id] as const),
  )('Ziellösung von %s besteht auch den allgemeinen Validator', (lessonId) => {
    const result = validateSentence(solvedPlayed(lessonId));
    expect(result.errors, result.errors.join(' | ')).toHaveLength(0);
    expect(result.valid).toBe(true);
  });

  it.each([
    ['comparative', 'Der Tisch ist höher.'],
    ['superlative', 'Der Tisch ist am höchsten.'],
  ] as const)('zeigt %s im Satz, zählt den Chip und prüft die geforderte Steigerungsform', (degree, sentence) => {
    const lesson = getLesson('l09-adjectives')!;
    const played = solvedPlayed(lesson.id);
    played[2] = { ...played[2]!, chosenAdjectiveDegree: degree };
    expect(hasFormChip(played[2])).toBe(true);
    expect(sentenceText(played)).toBe(sentence);
    expect(validateSentence(played)).toMatchObject({ valid: true, correctChips: 3 });
    expect(checkLesson(lesson, played)).toEqual({
      complete: false,
      problems: ['Setze das Steinchen auf „hoch“ bei „Grundform“.'],
    });
  });

  it('falsches Person-Steinchen → nicht komplett', () => {
    const lesson = getLesson('l04-subject-verb')!;
    const played = solvedPlayed('l04-subject-verb');
    played[1] = { ...played[1]!, chosenPerson: 'du' };
    const result = checkLesson(lesson, played);
    expect(result.complete).toBe(false);
    expect(result.problems.join(' ')).toMatch(/Person-Steinchen/i);
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

  it('erhält vorhandenen Fortschritt und führt durch neu eingefügte Lektionen', () => {
    const completed = new Set([
      'l01-nouns', 'l02-verbs', 'l03-pronouns', 'l04-subject-verb', 'l05-cases',
      'l06-questions', 'l07-prepositions', 'l08-wechselpraepositionen', 'l09-adjectives', 'l10-modals',
    ]);
    expect(isLessonUnlocked('l09-adjectives', completed)).toBe(true);
    expect(isLessonUnlocked('l12-plural', completed)).toBe(false);
    expect(nextLesson(completed)?.id).toBe('l11-location');
  });

  it('nextLesson gibt die älteste ungelöste Lektion', () => {
    expect(nextLesson(new Set())?.id).toBe(first!.id);
    expect(nextLesson(new Set([first!.id]))?.id).toBe(second!.id);
    expect(nextLesson(new Set(STORY_LESSONS.map((l) => l.id)))).toBeUndefined();
  });
});
