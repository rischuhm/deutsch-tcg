import { useState } from 'react';
import { checkCourseCards, prepareCourseCards } from '../game/courseCards';
import type { CardExercise } from '../game/courseCards';
import { orderedOptions } from '../game/exercises';
import { useSentenceCards } from '../hooks/useSentenceCards';
import { ResultDialog } from './ResultDialog';
import { SentenceBoard } from './SentenceBoard';

export function CourseCardStep({ exercise, onNext }: { exercise: CardExercise; onNext: () => void }) {
  const [{ definitions, solution, hand }] = useState(() => {
    const prepared = prepareCourseCards(exercise);
    const order = orderedOptions(prepared.hand.map(({ instanceId }) => instanceId), exercise.question);
    return { ...prepared, hand: order.map((id) => prepared.hand.find(({ instanceId }) => id === instanceId)!) };
  });
  const cards = useSentenceCards(hand);
  const [result, setResult] = useState<string | null>(null);
  const correct = result === '';

  return (
    <section className="course-panel course-card-step">
      <h2>{exercise.question}</h2>
      <p>Lege die Karten auf die Satzleiste und setze Steinchen auf die passenden Wortformen. Ziehe gelegte Karten, um die Reihenfolge zu ändern.</p>
      <details className="lesson-help">
        <summary>Grammatik-Hinweis</summary>
        <p>{exercise.feedback}</p>
      </details>
      <details className="lesson-help">
        <summary>Lösungshilfe</summary>
        <p>{exercise.model}</p>
      </details>
      <SentenceBoard cards={cards} definitions={definitions} endMark={exercise.endMark} actions={<>
        <button className="btn" disabled={!cards.played.length}
          onClick={() => setResult(checkCourseCards(cards.played, solution, definitions))}>Satz prüfen</button>
        <button className="btn btn-secondary" disabled={!cards.played.length}
          onClick={() => cards.reset()}>Neu legen</button>
      </>} />
      {result !== null && (
        <ResultDialog title={correct ? 'Satz geschafft!' : 'Prüfe deine Karten'}
          onDismiss={correct ? undefined : () => setResult(null)}>
          {correct && <p className="result-sentence">{exercise.model}</p>}
          <p>{correct ? exercise.feedback : result}</p>
          <button className="btn result-close" onClick={correct ? onNext : () => setResult(null)} autoFocus>
            {correct ? 'Weiter' : 'Weiter üben'}
          </button>
        </ResultDialog>
      )}
    </section>
  );
}
