import type { CourseLesson } from './curriculum';

interface Prompt {
  question: string;
  feedback: string;
}

export type Exercise =
  | (Prompt & { kind: 'choice'; answer: string; alternatives: string[]; source?: string; listen?: boolean })
  | (Prompt & { kind: 'order'; answer: string[] })
  | (Prompt & { kind: 'practice'; model: string; criteria: string[]; mode: 'write' | 'speak' });

export interface Level {
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export function choice(question: string, answer: string, alternatives: string[], feedback: string, source?: string): Exercise {
  return { kind: 'choice', question, answer, alternatives, feedback, source };
}

export function listen(question: string, source: string, answer: string, alternatives: string[], feedback: string): Exercise {
  return { kind: 'choice', question, source, answer, alternatives, feedback, listen: true };
}

export function order(question: string, answer: string, feedback: string): Exercise {
  return { kind: 'order', question, answer: answer.split(' | '), feedback };
}

export function practice(mode: 'write' | 'speak', question: string, model: string, criteria: string[], feedback: string): Exercise {
  return { kind: 'practice', mode, question, model, criteria, feedback };
}

export function orderedOptions(values: string[], seed: string): string[] {
  const options = [...values];
  let state = Array.from(seed).reduce((sum, char) => (Math.imul(sum, 31) + char.charCodeAt(0)) >>> 0, 1237);
  for (let i = options.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [options[i], options[j]] = [options[j]!, options[i]!];
  }
  if (options.length > 1 && options.every((word, index) => word === values[index])) {
    options.push(options.shift()!);
  }
  return options;
}

export function matchesExercise(exercise: Exclude<Exercise, { kind: 'practice' }>, response: readonly string[]): boolean {
  if (exercise.kind === 'choice') return response.length === 1 && response[0] === exercise.answer;
  return response.length === exercise.answer.length
    && response.every((part, index) => part === exercise.answer[index]);
}
