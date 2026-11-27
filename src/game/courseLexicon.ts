import { CARD_POOL } from './cards';
import type { CardDeclension, CardDef, CardType, Gender, PrepositionCase } from './types';
import { nouns } from './data/courseNouns';
import { verbs } from './data/courseVerbs';
import verbExtras from './data/courseVerbExtras.json';
import { comparisons } from './data/courseAdjectives';

const extraVerbForms: Record<string, Record<string, string> | undefined> = verbExtras;
const baseCards = new Map(CARD_POOL.map((card) => [`${card.type}:${card.word}`, card]));

const prepositions: Record<string, [PrepositionCase | undefined, string?]> = {
  ab: ['Dativ', 'Gibt den zeitlichen oder räumlichen Ausgangspunkt an.'],
  am: ['Dativ', 'Kurzform von „an dem“.'],
  an: ['Wechselpräposition', 'In festen Verbindungen entscheidet das Verb mit. „An etwas scheitern“ fordert den Dativ.'],
  auf: ['Wechselpräposition', 'In festen Verbindungen entscheidet das Verb mit. „Auf etwas warten“ fordert den Akkusativ.'],
  aufgrund: ['Genitiv', 'Nennt den Grund.'],
  aus: ['Dativ'],
  bis: [undefined, 'Gibt eine Grenze an. Vor „zur“ bestimmt „zu“ den Dativ. Ohne weitere Präposition steht häufig der Akkusativ.'],
  durch: ['Akkusativ'],
  für: ['Akkusativ'],
  gegen: ['Akkusativ'],
  im: ['Dativ', 'Kurzform von „in dem“.'],
  in: ['Wechselpräposition'],
  ins: ['Akkusativ', 'Kurzform von „in das“.'],
  laut: [undefined, 'Nennt die Quelle. Es sind Dativ und Genitiv möglich.'],
  mangels: ['Genitiv', 'Nennt den Grund, vor allem in formellen Texten.'],
  mit: ['Dativ'],
  nach: ['Dativ'],
  neben: ['Wechselpräposition'],
  ohne: ['Akkusativ'],
  seit: ['Dativ'],
  trotz: [undefined, 'Räumt einen Gegengrund ein. In formellen Texten steht meist der Genitiv.'],
  um: ['Akkusativ'],
  unter: ['Wechselpräposition'],
  vom: ['Dativ', 'Kurzform von „von dem“.'],
  vor: ['Wechselpräposition'],
  zum: ['Dativ', 'Kurzform von „zu dem“.'],
  zur: ['Dativ', 'Kurzform von „zu der“.'],
};

const singularArticles = {
  m: ['der', 'den', 'dem', 'des'],
  f: ['die', 'die', 'der', 'der'],
  n: ['das', 'das', 'dem', 'des'],
} as const;
const pluralArticles = ['die', 'die', 'den', 'der'] as const;
const endings = ['e', 'en', 'em', 'er', 'es'];

function nounCard(base: CardDef): CardDef {
  const entry = nouns[base.word];
  if (!entry) throw new Error(`Deklination fehlt für „${base.word}“.`);
  const [gender, plural, genitive, special] = entry;
  const declension: Partial<CardDeclension> = {};

  if (gender !== 'p') {
    const [nom, akk, dat, gen] = singularArticles[gender];
    const oblique = special ?? base.word;
    declension.nom_sg = `${nom} ${base.word}`;
    declension.akk_sg = `${akk} ${oblique}`;
    declension.dat_sg = `${dat} ${oblique}`;
    declension.gen_sg = `${gen} ${genitive ?? (gender === 'f' ? base.word : `${base.word}s`)}`;
  }
  if (plural !== '-') {
    const [nom, akk, dat, gen] = pluralArticles;
    const datPlural = gender === 'p' && special ? special : /[ns]$/i.test(plural) ? plural : `${plural}n`;
    // Substantivierte Adjektive flektieren nach dem bestimmten Artikel schwach.
    const afterDefinite = base.word === 'Berufstätige' ? 'Berufstätigen' : plural;
    declension.nom_pl = `${nom} ${afterDefinite}`;
    declension.akk_pl = `${akk} ${afterDefinite}`;
    declension.dat_pl = `${dat} ${datPlural}`;
    declension.gen_pl = `${gen} ${afterDefinite}`;
  }
  const bareDeclension: Partial<CardDeclension> | undefined = base.word === 'Berufstätige'
    ? { nom_pl: 'Berufstätige', akk_pl: 'Berufstätige', dat_pl: 'Berufstätigen', gen_pl: 'Berufstätiger' }
    : base.word === 'Prozent' ? { nom_pl: 'Prozent', akk_pl: 'Prozent', dat_pl: 'Prozent', gen_pl: 'Prozent' }
    : undefined;
  const explanation = base.word === 'Berufstätige'
    ? 'Die Tabelle zeigt die Formen mit dem bestimmten Artikel. Ohne Artikel lautet der Nominativ Plural „Berufstätige“.'
    : base.word === 'Prozent'
      ? 'Nach einer Zahl bleibt „Prozent“ unverändert, zum Beispiel „siebzig Prozent“.'
      : gender === 'p' ? 'In dieser Bedeutung wird das Nomen nur im Plural verwendet.'
      : plural === '-' ? 'In dieser Bedeutung wird das Nomen ohne Plural verwendet.'
      : undefined;
  return {
    ...base, detachedArticle: true, declension, bareDeclension, explanation,
    gender: gender === 'p' ? undefined : singularArticles[gender][0] as Gender,
    plural: plural === '-' ? undefined : plural,
  };
}

function verbCard(base: CardDef): CardDef {
  let conjugation = base.conjugation;
  if (!conjugation) {
    const entry = verbs[base.word];
    if (!entry) throw new Error(`Konjugation fehlt für „${base.word}“.`);
    const [present, partizip1, partizip2, aux, prefix] = entry;
    const [ich, du, er, wir, ihr, sie] = present;
    conjugation = { praesens: { ich, du, er, wir, ihr, sie }, partizip1, partizip2, aux, prefix };
  }
  return { ...base, conjugation, lessonForms: extraVerbForms[base.word] };
}

function adjectiveCard(base: CardDef): CardDef {
  const comparison = comparisons[base.word] ?? base.comparison;
  const forms = endings.map((ending) => [`Endung -${ending}`, base.word + ending]);
  if (comparison) {
    forms.push(...endings.map((ending) => [`Komparativ · Endung -${ending}`, comparison[0] + ending]));
  }
  // Auch nicht steigerbare Adjektive lassen sich deklinieren.
  return {
    ...base, comparison,
    lessonForms: comparison ? Object.fromEntries(forms) : Object.fromEntries([['Grundform', base.word], ...forms]),
  };
}

export function lexicalCard(type: CardType, word: string): CardDef {
  const existing = baseCards.get(`${type}:${word}`);
  const base: CardDef = { ...existing, id: `lesson.${type}.${word}`, word, type, rarity: existing?.rarity ?? 'common' };
  if (type === 'noun') return nounCard(base);
  if (type === 'verb' || type === 'modal') return verbCard(base);
  if (type === 'adjective') return adjectiveCard(base);
  if (type === 'article') return { ...base, explanation: 'Der Artikel steht vor dem Nomen oder vor dem dazugehörigen Adjektiv.' };
  if (type === 'preposition') {
    const rule = prepositions[word];
    if (!rule) throw new Error(`Kasusregel fehlt für „${word}“.`);
    return { ...base, case: rule[0], explanation: rule[1] };
  }
  return base;
}
