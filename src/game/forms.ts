import type { AdjectiveDegree, CardDef, CardInstance, GermanCase, Person, VerbForm } from './types';

export const PERSON_ORDER: Person[] = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
export const PERSON_LABELS: Record<Person, string> = {
  ich: 'ich', du: 'du', er: 'er / sie / es', wir: 'wir', ihr: 'ihr', sie: 'sie / Sie',
};
export const CASE_ORDER: GermanCase[] = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'];
export const VERB_FORMS: Record<VerbForm, string> = {
  infinitive: 'Infinitiv', participle1: 'Partizip I', participle2: 'Partizip II',
};
export const ADJECTIVE_DEGREES: Record<AdjectiveDegree, string> = {
  positive: 'Grundform', comparative: 'Komparativ', superlative: 'Superlativ',
};
const CASE_PREFIX = { Nominativ: 'nom', Akkusativ: 'akk', Dativ: 'dat', Genitiv: 'gen' } as const;

export function nounForm(def: CardDef, germanCase: GermanCase, plural: boolean): string {
  const key = `${CASE_PREFIX[germanCase]}_${plural ? 'pl' : 'sg'}` as const;
  return def.declension?.[key] ?? (plural ? def.plural : def.word) ?? def.word;
}

export function pronounForm(def: CardDef, germanCase: GermanCase, variant?: string) {
  return def.pronouns?.[variant ?? Object.keys(def.pronouns)[0]!]?.[germanCase] ?? def.word;
}

export function verbWord(def: CardDef, form: VerbForm): string {
  if (form === 'participle1') return def.conjugation?.partizip1 ?? def.word;
  if (form === 'participle2') return def.conjugation?.partizip2 ?? def.word;
  return def.word;
}

export function adjectiveWord(def: CardDef, degree: AdjectiveDegree): string {
  if (degree === 'comparative') return def.comparison?.[0] ?? def.word;
  if (degree === 'superlative') return def.comparison?.[1] ?? def.word;
  return def.word;
}

/** Die tatsächlich gelegte Form, für Satzleiste, Steinchen und Rückmeldung. */
export function cardWord(def: CardDef, instance: CardInstance): string {
  if (instance.chosenLessonForm && def.lessonForms) return def.lessonForms[instance.chosenLessonForm] ?? def.word;
  if (def.type === 'noun') return nounForm(def, instance.chosenCase ?? 'Nominativ', !!instance.isPlural);
  if (def.type === 'pronoun' && instance.chosenCase) {
    return pronounForm(def, instance.chosenCase, instance.chosenPronoun);
  }
  if (instance.chosenPerson && def.conjugation) return def.conjugation.praesens[instance.chosenPerson];
  if (def.type === 'adjective' && instance.chosenAdjectiveDegree) {
    return adjectiveWord(def, instance.chosenAdjectiveDegree);
  }
  if (instance.chosenVerbForm) return verbWord(def, instance.chosenVerbForm);
  return def.word;
}

export function hasFormChip(instance: CardInstance): boolean {
  return !!(instance.chosenCase || instance.chosenPerson || instance.chosenVerbForm || instance.chosenAdjectiveDegree
    || instance.chosenLessonForm);
}
