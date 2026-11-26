import type { CourseLesson } from './curriculum';

export interface Level {
  title: string;
  description: string;
  lessons: CourseLesson[];
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
