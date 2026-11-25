import { useMemo, useState } from 'react';
import type { Collection, ScoreResult, ValidationResult } from '../game';
import { scoreSentence, suggestNext, validateSentence } from '../game';
import { useSentenceCards } from '../hooks/useSentenceCards';
import { MAX_HAND, buildInstances, selectHand, sentenceText } from '../lib/ui';
import { SentenceBoard } from './SentenceBoard';
import { ResultDialog } from './ResultDialog';

interface TableScreenProps {
  collection: Collection;
  plurals: Record<string, number>;
  onAddPoints: (points: number) => void;
}

interface CheckResult {
  validation: ValidationResult;
  score: ScoreResult;
  awarded: boolean;
}

export function TableScreen({ collection, plurals, onAddPoints }: TableScreenProps) {
  const allInstances = useMemo(() => buildInstances(collection, plurals), [collection, plurals]);
  const [shuffleSeed, setShuffleSeed] = useState(7);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [scoredSentences] = useState(() => new Set<string>());
  const hand = useMemo(() => selectHand(allInstances, MAX_HAND, shuffleSeed), [allInstances, shuffleSeed]);
  const cards = useSentenceCards(hand);

  const checkSentence = () => {
    const validation = validateSentence(cards.played);
    const score = scoreSentence(validation, cards.played.length);
    const text = sentenceText(cards.played);
    const awarded = validation.valid && !scoredSentences.has(text);
    if (awarded) {
      scoredSentences.add(text);
      onAddPoints(score.total);
    }
    setResult({ validation, score, awarded });
  };

  return (
    <div className="table-screen practice-table">
      <SentenceBoard cards={cards} hint={suggestNext(cards.played)} enable3D actions={<>
        <button className="btn" onClick={checkSentence} disabled={!cards.played.length}>Satz prüfen</button>
        <button className="btn btn-secondary" onClick={() => cards.reset()} disabled={!cards.played.length}>Aufräumen</button>
        <button className="btn btn-secondary" onClick={() => {
          const nextSeed = shuffleSeed + 1;
          setShuffleSeed(nextSeed);
          cards.reset(selectHand(allInstances, MAX_HAND, nextSeed));
        }}>Mischen</button>
      </>} />

      {result && (
        <ResultDialog title={result.validation.valid ? 'Der Satz passt!' : 'Prüfe deinen Satz'}
          onDismiss={() => setResult(null)}>
          {result.validation.valid ? (
            <>
              <p className="result-sentence">{sentenceText(cards.played)}</p>
              {result.awarded
                ? <>
                    {result.score.breakdown.map(({ label, points }) => (
                      <div className="breakdown-row" key={label}><span>{label}</span><span>+{points}</span></div>
                    ))}
                    <div className="breakdown-total"><span>Gesamt</span><span>+{result.score.total}</span></div>
                  </>
                : <p>Für diesen Satz hast du an diesem Tisch schon Punkte erhalten.</p>}
            </>
          ) : (
            <ul className="error-list">
              {[...new Set(result.validation.errors)].map((error) => <li key={error}>{error}</li>)}
            </ul>
          )}
          <button className="btn result-close" onClick={() => setResult(null)} autoFocus>Weiter</button>
        </ResultDialog>
      )}
    </div>
  );
}
