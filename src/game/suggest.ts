import { POOL_BY_ID } from './cards';
import type { CardInstance, CardType } from './types';

export interface NextHint {
  types: CardType[];
  text: string;
}

export function suggestNext(played: CardInstance[]): NextHint {
  const defs = played.flatMap(({ defId }) => {
    const def = POOL_BY_ID.get(defId);
    return def ? [def] : [];
  });
  const first = defs[0];
  const last = defs.at(-1);
  if (!first || !last) return {
    types: ['question', 'noun', 'pronoun', 'verb', 'modal', 'adverb'],
    text: 'Beginne mit dem Subjekt, einer Zeitangabe, einem Fragewort oder einem Verb für eine Ja/Nein-Frage.',
  };
  if (last.type === 'preposition') return {
    types: ['noun', 'pronoun'],
    text: 'Lege ein Nomen oder Pronomen nach der Präposition und wähle seinen Fall.',
  };
  if (last.type === 'question') return {
    types: ['verb', 'modal'],
    text: 'Nach dem Fragewort folgt das konjugierte Verb.',
  };

  const finiteIndex = defs.findIndex((def) => def.type === 'verb' || def.type === 'modal');
  if (finiteIndex < 0) return {
    types: ['verb', 'modal'],
    text: 'Lege das konjugierte Verb an zweiter Stelle.',
  };
  const subjectAfterVerb = first.type !== 'noun' && first.type !== 'pronoun';
  if (subjectAfterVerb && defs.length === finiteIndex + 1) return {
    types: ['noun', 'pronoun'],
    text: 'Ergänze das Subjekt oder prüfe den Satz, falls das Fragewort schon das Subjekt ist.',
  };

  const finite = defs[finiteIndex]!;
  const complement: CardType[] = ['noun', 'pronoun', 'preposition', 'adjective', 'adverb'];
  if (defs.slice(finiteIndex + 1).some((def) => def.type === 'verb' || def.type === 'particle')) return {
    types: [],
    text: 'Prüfe deinen Satz und die gewählten Steinchen.',
  };
  if (finite.type === 'modal') return {
    types: [...complement, 'verb'],
    text: 'Zum Modalverb gehört am Satzende ein Verb mit Infinitiv-Steinchen.',
  };
  if (finite.conjugation?.prefix) return {
    types: [...complement, 'particle'],
    text: `Lege den Verbzusatz „${finite.conjugation.prefix}“ an das Satzende.`,
  };
  if (finite.canBeAuxiliary) return {
    types: [...complement, 'verb'],
    text: 'Ergänze den Satz. Für das Perfekt kommt das Partizip II ans Ende.',
  };
  return {
    types: complement,
    text: 'Ergänze deinen Satz oder prüfe die gelegten Karten.',
  };
}
