import { useEffect, useMemo, useState } from 'react';
import type { Collection } from '../game';
import type {
  CardInstance,
  GermanCase,
  Person,
  ScoreResult,
  ValidationResult,
} from '../game';
import { scoreSentence, suggestNext, validateSentence } from '../game';
import {
  MAX_HAND,
  MAX_SENTENCE,
  buildInstances,
  displayWord,
  selectHand,
} from '../lib/ui';
import { InspectOverlay } from './InspectOverlay';
import { TableScene } from './three/TableScene';

interface TableScreenProps {
  collection: Collection;
  plurals: Record<string, number>;
  onAddPoints: (points: number) => void;
}

interface CheckResult {
  validation: ValidationResult;
  score: ScoreResult;
}

export function TableScreen({
  collection,
  plurals,
  onAddPoints,
}: TableScreenProps) {
  const allInstances = useMemo(
    () => buildInstances(collection, plurals),
    [collection, plurals],
  );
  const [shuffleSeed, setShuffleSeed] = useState(7);
  const [hand, setHand] = useState<CardInstance[]>([]);
  const [played, setPlayed] = useState<CardInstance[]>([]);
  const [result, setResult] = useState<CheckResult | null>(null);
  /** Karte, die gerade groß angeschaut wird (vor dem Spielen/Zurücknehmen). */
  const [inspect, setInspect] = useState<{
    instance: CardInstance;
    source: 'hand' | 'played';
  } | null>(null);

  // Hand neu aufbauen, wenn sich die Sammlung ändert oder gemischt wird.
  useEffect(() => {
    setHand(selectHand(allInstances, MAX_HAND, shuffleSeed));
    setPlayed([]);
    setResult(null);
    setInspect(null);
  }, [allInstances, shuffleSeed]);

  const playCard = (instance: CardInstance) => {
    if (played.length >= MAX_SENTENCE) {
      return;
    }
    setHand((h) => h.filter((c) => c.instanceId !== instance.instanceId));
    setPlayed((p) => [...p, instance]);
    setResult(null);
    setInspect(null);
  };

  const returnCard = (instance: CardInstance) => {
    setPlayed((p) => p.filter((c) => c.instanceId !== instance.instanceId));
    setHand((h) => [...h, instance]);
    setResult(null);
    setInspect(null);
  };

  const clearSentence = () => {
    setHand((h) => [...h, ...played]);
    setPlayed([]);
    setResult(null);
  };

  /**
   * Steinchen setzen/entfernen: aktualisiert die Instanz in `played`
   * immutable (gleiche instanceId) und spiegelt sie ins Inspect-Overlay.
   */
  const updatePlayedInstance = (updated: CardInstance) => {
    setPlayed((p) =>
      p.map((c) => (c.instanceId === updated.instanceId ? updated : c)),
    );
    setInspect((current) =>
      current && current.instance.instanceId === updated.instanceId
        ? { ...current, instance: updated }
        : current,
    );
    setResult(null);
  };

  const togglePersonChip = (person: Person) => {
    if (!inspect || inspect.source !== 'played') {
      return;
    }
    const instance = inspect.instance;
    const updated: CardInstance = { ...instance };
    if (instance.chosenPerson === person) {
      delete updated.chosenPerson;
    } else {
      updated.chosenPerson = person;
    }
    updatePlayedInstance(updated);
  };

  const toggleCaseChip = (germanCase: GermanCase) => {
    if (!inspect || inspect.source !== 'played') {
      return;
    }
    const instance = inspect.instance;
    const updated: CardInstance = { ...instance };
    if (instance.chosenCase === germanCase) {
      delete updated.chosenCase;
    } else {
      updated.chosenCase = germanCase;
    }
    updatePlayedInstance(updated);
  };

  const checkSentence = () => {
    const validation = validateSentence(played);
    const score = scoreSentence(validation, played.length);
    setResult({ validation, score });
    if (validation.valid) {
      onAddPoints(score.total);
    }
  };

  const sentencePreview = played.map(displayWord).join(' ');
  const hint = suggestNext(played);

  return (
    <div className="table-screen">
      <div className="table-canvas">
        <TableScene
          hand={hand}
          played={played}
          suggestedTypes={hint.types}
          onPlayCard={(instance) => setInspect({ instance, source: 'hand' })}
          onReturnCard={(instance) => setInspect({ instance, source: 'played' })}
        />
      </div>

      <div className="hint-bar" title="Lernhilfe: Diese Kartentypen passen als Nächstes">
        💡 {hint.text}
      </div>

      {played.length > 0 && (
        <div className="played-words">{sentencePreview}</div>
      )}

      {hand.length === 0 && played.length === 0 && (
        <div className="played-words">
          Keine Karten auf der Hand — öffne deinen täglichen Booster!
        </div>
      )}

      <div className="table-controls">
        <button
          className="btn"
          onClick={checkSentence}
          disabled={played.length === 0}
        >
          Satz prüfen
        </button>
        <button
          className="btn btn-secondary"
          onClick={clearSentence}
          disabled={played.length === 0}
        >
          Aufräumen
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setShuffleSeed((s) => s + 1)}
        >
          Mischen
        </button>
      </div>

      {inspect && (
        <InspectOverlay
          instance={inspect.instance}
          source={inspect.source}
          playedFull={played.length >= MAX_SENTENCE}
          onPlay={playCard}
          onReturn={returnCard}
          onTogglePerson={togglePersonChip}
          onToggleCase={toggleCaseChip}
          onClose={() => setInspect(null)}
        />
      )}

      {result && (
        <div className="result-overlay" onClick={() => setResult(null)}>
          <div
            className="result-card"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {result.validation.valid ? (
              <>
                <h2>Super, der Satz ist gültig! 🎉</h2>
                {result.score.breakdown.map((entry) => (
                  <div className="breakdown-row" key={entry.label}>
                    <span>{entry.label}</span>
                    <span>+{entry.points}</span>
                  </div>
                ))}
                <div className="breakdown-total">
                  <span>Gesamt</span>
                  <span>+{result.score.total}</span>
                </div>
              </>
            ) : (
              <>
                <h2>Noch nicht ganz richtig 🤔</h2>
                <ul className="error-list">
                  {result.validation.errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </>
            )}
            <button
              className="btn result-close"
              onClick={() => setResult(null)}
            >
              Weiter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
