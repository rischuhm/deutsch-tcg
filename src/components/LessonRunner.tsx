import { useState } from 'react';
import type { StoryLesson, StoryCheckResult } from '../game';
import { checkLesson, scoreSentence, validateSentence } from '../game';
import { useSentenceCards } from '../hooks/useSentenceCards';
import { SentenceBoard } from './SentenceBoard';
import { ResultDialog } from './ResultDialog';

function renderWithExamples(text: string) {
  return text.split(/(«[^»]*»)/g).map((part, index) =>
    part.startsWith('«') ? <em key={index} lang="de" className="de-example">{part}</em> : part,
  );
}

interface LessonRunnerProps {
  lesson: StoryLesson;
  onComplete: (lessonId: string) => void;
  onExit: () => void;
  onNext: (() => void) | null;
  onAddPoints: (points: number) => void;
  completed: boolean;
  completesLevel: boolean;
}

export function LessonRunner({ lesson, onComplete, onExit, onNext, onAddPoints, completed, completesLevel }: LessonRunnerProps) {
  const cards = useSentenceCards(lesson.handCards.map((defId, index) => ({
    instanceId: `${lesson.id}#${index}`,
    defId,
    isPlural: lesson.pluralCards?.includes(defId),
  })));
  const [result, setResult] = useState<StoryCheckResult | null>(null);
  const [points, setPoints] = useState(0);

  const check = () => {
    const checked = checkLesson(lesson, cards.played);
    setResult(checked);
    if (checked.complete && !completed) {
      const validation = validateSentence(cards.played);
      const reward = validation.valid ? scoreSentence(validation, cards.played.length).total : 0;
      onAddPoints(reward);
      setPoints(reward);
      onComplete(lesson.id);
    }
  };

  return (
    <div className="lesson-runner">
      <header className="lesson-header">
        <button className="btn btn-secondary lesson-back" onClick={onExit}>← Lektionen</button>
        <h1 className="lesson-header-title" lang="en">{lesson.title}</h1>
      </header>
      <section className="lesson-panel">
        <p className="lesson-goal" lang="en">{lesson.goal}</p>
        <details className="lesson-help" open>
          <summary>Erklärung · English</summary>
          <div className="lesson-explanation" lang="en">
            {lesson.explanation.map((paragraph) => <p key={paragraph}>{renderWithExamples(paragraph)}</p>)}
          </div>
        </details>
        <details className="lesson-help">
          <summary>Lösungshilfe</summary>
          <p className="lesson-target de-example" lang="de">{lesson.targetSentence}</p>
        </details>
      </section>

      <SentenceBoard cards={cards} isSentence={lesson.requireValidSentence} enable3D actions={<>
        <button className="btn" onClick={check} disabled={!cards.played.length}>Prüfen</button>
        <button className="btn btn-secondary" onClick={() => cards.reset()} disabled={!cards.played.length}>Neu legen</button>
      </>} />

      {result && (
        <ResultDialog title={result.complete ? 'Lektion geschafft!' : 'Prüfe deine Karten'}
          onDismiss={result.complete ? undefined : () => setResult(null)}>
          {result.complete ? (
            <>
              <p className="result-sentence" lang="de">{lesson.targetSentence}</p>
              <p>Das Lektionsdeck ist in deiner Sammlung spielbar.</p>
              {points > 0 && <p className="breakdown-total">+{points} Punkte</p>}
              {onNext
                ? <button className="btn result-close" onClick={onNext} autoFocus>Nächste Lektion</button>
                : completesLevel && <p className="lesson-done-note">Du hast den A1-Lernpfad geschafft!</p>}
              <button className="btn btn-secondary result-close" onClick={onExit} autoFocus={!onNext}>Zur Übersicht</button>
            </>
          ) : (
            <>
              <ul className="error-list">
                {[...new Set(result.problems)].map((problem) => <li key={problem}>{problem}</li>)}
              </ul>
              <button className="btn result-close" onClick={() => setResult(null)} autoFocus>Weiter üben</button>
            </>
          )}
        </ResultDialog>
      )}
    </div>
  );
}
