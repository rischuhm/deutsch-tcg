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

  it('nach Präposition: Adjektiv, Nomen oder Pronomen', () => {
    const hint = suggestNext(played(['pron.ich', 'verb.wohnen', 'prep.in']));
    expect(hint.types).toEqual(['adjective', 'noun', 'pronoun']);
  });

  it('nach Adjektiv: Adjektiv oder Nomen', () => {
    const hint = suggestNext(
      played(['noun.tisch', 'verb.sein', 'adj.hoch']),
    );
    // finites Verb liegt bereits → Objekt-Phase; direkt nach Adjektiv-Ende testen:
    const hint2 = suggestNext(played(['prep.in', 'adj.hoch']));
    expect(hint2.types).toEqual(['adjective', 'noun']);
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
