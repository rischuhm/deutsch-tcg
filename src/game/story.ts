/**
 * SatzMeister — Story-Modus (Engine-Seite).
 *
 * Der Story-Modus führt Lernende auf Englisch durch die A1-Grundlagen:
 * erst die Kartentypen (Nomen, Verben, Pronomen), dann einfache Sätze
 * (Subjekt + Verb + Objekt) und die Fälle Nominativ/Akkusativ/Dativ.
 * Jede Lektion wird gelöst, indem die Zielkarten in der richtigen
 * Reihenfolge ausgelegt und die Steinchen (Person/Kasus) korrekt
 * platziert werden.
 */

import type { CardInstance, GermanCase, Person } from './types';
import { POOL_BY_ID } from './cards';
import { validateSentence } from './validator';
import storyData from './data/story.json';

export interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
}

/** Ein benötigtes Steinchen auf einer Zielkarte. */
export interface StoryChipRequirement {
  person?: Person;
  case?: GermanCase;
}

export interface StoryLesson {
  id: string;
  chapter: number;
  /** Englischer Titel. */
  title: string;
  /** Englische Kurzbeschreibung der Aufgabe. */
  goal: string;
  /** Englische Erklärungsabsätze (deutsche Beispiele in «»). */
  explanation: string[];
  /** defIds der Karten, die in dieser Lektion in der Hand liegen. */
  handCards: string[];
  /** defIds der Zielkarten in exakter Reihenfolge. */
  target: string[];
  /** Index in `target` → benötigtes Steinchen. */
  chips: Record<string, StoryChipRequirement>;
  /** true: der gebaute Satz muss zusätzlich den Validator bestehen. */
  requireValidSentence: boolean;
  /** Angezeigter Zielsatz, z. B. „Ich komme.“ */
  targetSentence: string;
}

export interface StoryCheckResult {
  complete: boolean;
  /** Freundliche, englische Hinweise, was noch fehlt/falsch ist. */
  problems: string[];
}

export const STORY_CHAPTERS: StoryChapter[] = storyData.chapters;
export const STORY_LESSONS: StoryLesson[] = storyData.lessons as StoryLesson[];

export function getLesson(id: string): StoryLesson | undefined {
  return STORY_LESSONS.find((lesson) => lesson.id === id);
}

/**
 * Eine Lektion ist freigeschaltet, wenn sie die erste ist oder die
 * direkt vorhergehende Lektion abgeschlossen wurde.
 */
export function isLessonUnlocked(
  lessonId: string,
  completedIds: ReadonlySet<string>,
): boolean {
  const index = STORY_LESSONS.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return false;
  if (index === 0) return true;
  return completedIds.has(STORY_LESSONS[index - 1]!.id);
}

/** Nächste ungelöste, freigeschaltete Lektion (für „Weiter spielen“). */
export function nextLesson(completedIds: ReadonlySet<string>): StoryLesson | undefined {
  return STORY_LESSONS.find(
    (lesson) => !completedIds.has(lesson.id) && isLessonUnlocked(lesson.id, completedIds),
  );
}

const CHIP_LABEL: Record<string, string> = {
  ich: 'ich-form',
  du: 'du-form',
  er: 'er/sie/es-form',
  wir: 'wir-form',
  ihr: 'ihr-form',
  sie: 'sie-form',
};

/**
 * Prüft, ob die ausgelegten Karten die Lektion erfüllen:
 * 1. exakte Zielreihenfolge der Karten,
 * 2. alle benötigten Steinchen korrekt platziert,
 * 3. falls gefordert: der Satz besteht den allgemeinen Validator.
 */
export function checkLesson(
  lesson: StoryLesson,
  played: CardInstance[],
): StoryCheckResult {
  const problems: string[] = [];

  // 1. Reihenfolge der Karten
  const playedIds = played.map((card) => card.defId);
  if (playedIds.length !== lesson.target.length) {
    problems.push(
      `This lesson needs exactly ${lesson.target.length} card(s): «${lesson.targetSentence}».`,
    );
  }
  const compareLength = Math.min(playedIds.length, lesson.target.length);
  let orderOk = playedIds.length === lesson.target.length;
  for (let i = 0; i < compareLength; i++) {
    if (playedIds[i] !== lesson.target[i]) {
      orderOk = false;
      const expectedWord = POOL_BY_ID.get(lesson.target[i]!)?.word ?? lesson.target[i];
      problems.push(
        `Card ${i + 1} should be «${expectedWord}» — check the goal: «${lesson.targetSentence}».`,
      );
      break;
    }
  }

  // 2. Steinchen prüfen (nur sinnvoll, wenn die Karten stimmen)
  if (orderOk) {
    for (const [indexKey, chip] of Object.entries(lesson.chips)) {
      const index = Number(indexKey);
      const card = played[index];
      if (!card) continue;
      const word = POOL_BY_ID.get(card.defId)?.word ?? card.defId;
      if (chip.person !== undefined && card.chosenPerson !== chip.person) {
        problems.push(
          `Put the person chip on «${word}» on the ${CHIP_LABEL[chip.person] ?? chip.person}.`,
        );
      }
      if (chip.case !== undefined && card.chosenCase !== chip.case) {
        problems.push(`Put the case chip on «${word}» on ${chip.case}.`);
      }
    }
  }

  // 3. Volle Satzvalidierung für echte Sätze
  if (orderOk && lesson.requireValidSentence) {
    const result = validateSentence(played);
    if (!result.valid) {
      problems.push(...result.errors);
    }
  }

  return { complete: problems.length === 0, problems };
}
