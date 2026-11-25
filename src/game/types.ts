/**
 * SatzMeister — zentrale Typen des Spielkerns.
 * Kartendaten: src/game/data/cards.json
 */

export type CardType =
  | 'noun'
  | 'verb'
  | 'modal'
  | 'pronoun'
  | 'question'
  | 'preposition'
  | 'adjective'
  | 'adverb'
  | 'particle';

export type Rarity = 'common' | 'uncommon' | 'rare';

export type Gender = 'der' | 'die' | 'das';

export type Auxiliary = 'haben' | 'sein';

export interface CardDeclension {
  nom_sg: string;
  akk_sg: string;
  dat_sg: string;
  gen_sg: string;
  nom_pl: string;
  akk_pl: string;
  dat_pl: string;
  gen_pl: string;
}

export interface CardPraesens {
  ich: string;
  du: string;
  er: string;
  wir: string;
  ihr: string;
  sie: string;
}

export interface CardConjugation {
  praesens: CardPraesens;
  partizip1: string;
  partizip2: string;
  aux?: Auxiliary;
  prefix?: string;
}

export type PrepositionCase = 'Akkusativ' | 'Dativ' | 'Wechselpräposition';

export interface CardDef {
  id: string; // z. B. "noun.tisch"
  type: CardType;
  rarity: Rarity;
  word: string; // Lemma, z. B. "Tisch"
  icon: string; // Dateiname in assets/icons/, z. B. "tisch.svg"
  gender?: Gender; // noun
  plural?: string; // noun, z. B. "Tische"
  declension?: CardDeclension; // noun: bestimmter Artikel
  conjugation?: CardConjugation; // verb + modal
  canBeAuxiliary?: boolean; // haben/sein: Vollverb ODER Hilfsverb
  case?: PrepositionCase; // preposition
  explanation?: string; // Gebrauchshinweis
  forms?: string[]; // ältere Kartendefinitionen
  person?: Person;
  pronouns?: Record<string, Partial<Record<GermanCase, string>>>;
  translation?: string;
  comparison?: [string, string];
  objectCase?: 'Akkusativ' | 'Dativ';
  direction?: boolean;
}

export interface CardInstance {
  instanceId: string;
  defId: string;
  /** Pluralform aus der Sammlung oder aus einer Lektionshand. */
  isPlural?: boolean;
  /**
   * Person-Steinchen auf einer Verb-/Modalverbkarte: die gewählte
   * konjugierte Form (z. B. 'ich' ⇒ „komme“). Pflicht für das finite
   * Verb, wenn ein Subjekt im Satz liegt.
   */
  chosenPerson?: Person;
  /**
   * Kasus-Steinchen auf einem Nomen oder Pronomen: der gewählte Fall
   * (z. B. Akkusativ ⇒ „den Tisch“).
   */
  chosenCase?: GermanCase;
  chosenPronoun?: string;
  chosenVerbForm?: VerbForm;
}

export type VerbForm = 'infinitive' | 'participle1' | 'participle2';

/** Personen für das Person-Steinchen (Verbkonjugation). */
export type Person = 'ich' | 'du' | 'er' | 'wir' | 'ihr' | 'sie';

/** Fälle für das Kasus-Steinchen (Nomendeklination). */
export type GermanCase = 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv';

export type Feature =
  | 'aussagesatz'
  | 'frage'
  | 'modal'
  | 'perfekt'
  | 'praeposition'
  | 'plural'
  | 'adjektiv'
  | 'pronomen';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  features: Feature[];
  /**
   * Anzahl korrekt platzierter Form-Steinchen. Grundlage für den Bonus.
   */
  correctChips: number;
}
