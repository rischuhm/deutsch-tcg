import { describe, expect, it } from 'vitest';
import type { CardInstance } from '../index';
import { suggestNext } from '../index';

const played = (ids: string[]): CardInstance[] =>
  ids.map((id, i) => ({ instanceId: `s${i}`, defId: id }));

describe('suggestNext', () => {
  it('leerer Satz: Fragewort, Subjekt oder Verb', () => {
    const hint = suggestNext([]);
    expect(hint.types).toContain('question');
    expect(hint.types).toContain('noun');
    expect(hint.types).toContain('pronoun');
  });

  it('nach Fragewort: nur Verb/Modalverb', () => {
    const hint = suggestNext(played(['question.wie']));
    expect(hint.types).toEqual(['verb', 'modal']);
  });

  it('nach Subjekt: Verb an zweiter Stelle', () => {
    const hint = suggestNext(played(['pron.ich']));
    expect(hint.types).toContain('verb');
    expect(hint.types).not.toContain('question');
  });

  it('nach Präposition: Nomen oder Pronomen', () => {
    const hint = suggestNext(played(['pron.ich', 'verb.wohnen', 'prep.in']));
    expect(hint.types).toEqual(['noun', 'pronoun']);
  });

  it('nach prädikativem Adjektiv kann der Satz geprüft werden', () => {
    const hint = suggestNext(played(['noun.tisch', 'verb.sein', 'adj.hoch']));
    expect(hint.types).toContain('adjective');
  });

  it('nach Modalverb ohne Infinitiv: Infinitiv-Hinweis', () => {
    const hint = suggestNext(played(['pron.ich', 'modal.koennen']));
    expect(hint.types).toContain('verb');
    expect(hint.text).toMatch(/Infinitiv/);
  });

  it('vollständiger Satz: Abschluss-Optionen', () => {
    const hint = suggestNext(played(['question.wie', 'verb.heissen']));
    expect(hint.types).toContain('pronoun');
    expect(hint.text).toMatch(/prüfe/i);
  });
});
