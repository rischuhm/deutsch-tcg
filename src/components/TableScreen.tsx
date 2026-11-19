import { useEffect, useMemo, useState } from 'react';
import type { Collection } from '../game';
import type { CardInstance, ScoreResult, ValidationResult } from '../game';
import { scoreSentence, validateSentence } from '../game';
import {
  MAX_HAND,
  MAX_SENTENCE,
  buildInstances,
  displayWord,
  selectHand,
} from '../lib/ui';
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

  // Hand neu aufbauen, wenn sich die Sammlung ändert oder gemischt wird.
  useEffect(() => {
    setHand(selectHand(allInstances, MAX_HAND, shuffleSeed));
    setPlayed([]);
    setResult(null);
  }, [allInstances, shuffleSeed]);

  const playCard = (instance: CardInstance) => {
    if (played.length >= MAX_SENTENCE) {
      return;
    }
    setHand((h) => h.filter((c) => c.instanceId !== instance.instanceId));
    setPlayed((p) => [...p, instance]);
    setResult(null);
  };

  const returnCard = (instance: CardInstance) => {
    setPlayed((p) => p.filter((c) => c.instanceId !== instance.instanceId));
    setHand((h) => [...h, instance]);
    setResult(null);
  };

  const clearSentence = () => {
    setHand((h) => [...h, ...played]);
    setPlayed([]);
    setResult(null);
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

  return (
    <div className="table-screen">
      <div className="table-canvas">
        <TableScene
          hand={hand}
          played={played}
          onPlayCard={playCard}
          onReturnCard={returnCard}
        />
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
