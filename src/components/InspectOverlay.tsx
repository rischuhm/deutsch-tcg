import type { CardInstance, GermanCase, Person } from '../game';
import { getCard } from '../game';
import {
  CASE_ORDER,
  PERSON_LABELS,
  PERSON_ORDER,
  TYPE_LABELS,
  declinedFormLabel,
  displayWord,
  personFormLabel,
} from '../lib/ui';
import { CardImage } from './CardImage';

interface InspectOverlayProps {
  instance: CardInstance;
  source: 'hand' | 'played';
  /** true, wenn die Satzleiste voll ist (Play-Button deaktiviert). */
  playedFull: boolean;
  onPlay: (instance: CardInstance) => void;
  onReturn: (instance: CardInstance) => void;
  onTogglePerson: (person: Person) => void;
  onToggleCase: (germanCase: GermanCase) => void;
  onClose: () => void;
}

/**
 * Karten-Detail-Overlay: großes Kartenbild, Steinchen-Auswahl
 * (Person/Kasus, nur für gespielte Karten) und Play/Zurück-Aktionen.
 * Wird im freien Spiel und im Story-Modus verwendet.
 */
export function InspectOverlay({
  instance,
  source,
  playedFull,
  onPlay,
  onReturn,
  onTogglePerson,
  onToggleCase,
  onClose,
}: InspectOverlayProps) {
  const def = getCard(instance.defId);
  const showPersonChips =
    source === 'played' &&
    (def?.type === 'verb' || def?.type === 'modal') &&
    def.conjugation !== undefined;
  const showCaseChips = source === 'played' && def?.type === 'noun';

  return (
    <div className="result-overlay" onClick={onClose}>
      <div
        className="inspect-card"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="inspect-image">
          <CardImage defId={instance.defId} />
        </div>
        <div className="inspect-title">
          {displayWord(instance)}
          <span className="inspect-type">
            {TYPE_LABELS[def?.type ?? 'noun']}
            {instance.isPlural === true ? ' · Plural' : ''}
          </span>
        </div>
        {showPersonChips && def && (
          <div className="chip-section">
            <p className="chip-title">
              Person-Steinchen: Welche Form passt zum Subjekt?
            </p>
            <div className="chip-grid">
              {PERSON_ORDER.map((person) => (
                <button
                  key={person}
                  className={`chip-btn ${
                    instance.chosenPerson === person ? 'chip-active' : ''
                  }`}
                  onClick={() => onTogglePerson(person)}
                >
                  <span className="chip-btn-label">{PERSON_LABELS[person]}</span>
                  <span className="chip-btn-sub">
                    {personFormLabel(def, person)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {showCaseChips && def && (
          <div className="chip-section">
            <p className="chip-title">
              Kasus-Steinchen: Welcher Fall passt hier?
            </p>
            <div className="chip-grid chip-grid-cases">
              {CASE_ORDER.map((germanCase) => (
                <button
                  key={germanCase}
                  className={`chip-btn ${
                    instance.chosenCase === germanCase ? 'chip-active' : ''
                  }`}
                  onClick={() => onToggleCase(germanCase)}
                >
                  <span className="chip-btn-label">{germanCase}</span>
                  <span className="chip-btn-sub">
                    {declinedFormLabel(
                      def,
                      germanCase,
                      instance.isPlural === true,
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {source === 'hand' ? (
          <button
            className="btn"
            onClick={() => onPlay(instance)}
            disabled={playedFull}
          >
            Auf die Satzleiste legen
          </button>
        ) : (
          <button className="btn" onClick={() => onReturn(instance)}>
            Zurück auf die Hand
          </button>
        )}
        <button className="btn btn-secondary" onClick={onClose}>
          Zurück
        </button>
      </div>
    </div>
  );
}
